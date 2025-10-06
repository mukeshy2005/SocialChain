import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { motion, AnimatePresence } from "framer-motion";
import { abi as SocialFeedABI } from "./contract/SocialFeed.json";

import PostCard from "./components/PostCard";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import NotificationPanel from "./components/NotificationPanel";
import ExploreSection from "./components/ExploreSection";

const CONTRACT_ADDRESS = "0xf5bCE012Ef9Bf6f3fE23cDdC58b14acA3f70729E"; 
const PINATA_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1ZmVkOTYyNC0zYjgyLTQyNzItOTVmZC03MWFmNGNlNmI5YTUiLCJlbWFpbCI6Im15NjUzMTk3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3NDM4M2U0YmVmMzk5NmU0ODk4OSIsInNjb3BlZEtleVNlY3JldCI6IjBkNmY3NmU3OTk0ODg2ZmFkZWVhY2E4YzAwMTllYmFkYWNlOTY1YmU5MDUzN2MyMWY5NWRiYzZlZTFhMGFlZWUiLCJleHAiOjE3OTExNTIwNDB9._3cJ60o-2odGatDCtEDvaai1gOpALflECX42YJfy6tE";

export default function App() {
  // ===== STATE =====
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // ===== WALLET CONNECTION =====
  const connectWallet = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const _provider = new ethers.BrowserProvider(window.ethereum);
  await _provider.send("eth_requestAccounts", []);
  const _signer = await _provider.getSigner();
  const address = await _signer.getAddress();

  const network = await _provider.getNetwork();
  console.log("✅ Connected to network:", network.name, network.chainId);

  if (network.chainId !== 11155111n) { // 11155111 is Sepolia
    alert("Please switch your MetaMask network to Sepolia!");
    return;
  }

  const _contract = new ethers.Contract(CONTRACT_ADDRESS, SocialFeedABI, _signer);

  setProvider(_provider);
  setSigner(_signer);
  setContract(_contract);
  setAccount(address);

  window.ethereum.on("accountsChanged", () => window.location.reload());
  window.ethereum.on("chainChanged", () => window.location.reload());
};
  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setContract(null);
    setAccount(null);
    setPosts([]);
  };

  // ===== PINATA UPLOAD =====
  const uploadToPinata = async (file) => {
    if (!file) return "";
    try {
      const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${PINATA_JWT}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Pinata upload failed");
      const data = await res.json();
      return data.IpfsHash || "";
    } catch (err) {
      console.error("Pinata upload error:", err);
      return "";
    }
  };

  // ===== LOAD POSTS =====
  const loadPosts = async () => {
    if (!contract) return;
    try {
      setLoading(true);
      const count = await contract.postCount();
      const loaded = [];

      for (let i = 1; i <= count; i++) {
        const p = await contract.posts(i);
        loaded.push({
          id: Number(i),
          author: p.author,
          content: p.content,
          imageHash: p.imageHash || "",
          likeCount: Number(p.likeCount || 0),
          commentCount: Number(p.commentCount || 0),
          tipAmount: p.tipAmount || 0n,
          boostAmount: p.boostAmount || 0n,
          timestamp: Number(p.timestamp || 0),
        });
      }

      setPosts(loaded.reverse());
    } catch (err) {
      console.error("loadPosts error", err);
    } finally {
      setLoading(false);
    }
  };

  // ===== CREATE POST =====
  const handleCreatePost = async () => {
    if (!newPost.trim() && !imageFile) return;

    try {
      setLoading(true);
      const ipfsHash = imageFile ? await uploadToPinata(imageFile) : "";
      const tx = await contract.createPost(newPost, ipfsHash);
      await tx.wait();

      setNewPost("");
      setImageFile(null);
      setPreviewUrl(null);
      await loadPosts();
    } catch (err) {
      console.error("createPost error:", err);
      alert("Failed to create post: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setImageFile(f || null);
    setPreviewUrl(f ? URL.createObjectURL(f) : null);
  };

  // ===== AUTO-REFRESH ON CONTRACT EVENTS =====
  useEffect(() => {
    if (!contract) return;

    loadPosts();

    const events = ["PostCreated", "PostLiked", "CommentAdded", "TipSent", "PostBoosted"];
    events.forEach((event) => contract.on(event, loadPosts));

    return () => events.forEach((event) => contract.off(event, loadPosts));
  }, [contract, activeTab]);

  // ===== RENDER =====
  if (!signer) return <Dashboard onConnectWallet={connectWallet} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0d1117] to-gray-900 text-white font-poppins">
      <Sidebar account={account} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Header account={account} onDisconnect={disconnectWallet} />

      <div className="ml-20 lg:ml-64 pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto py-8 px-4"
            >
              {/* Composer */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg mb-8">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center text-white font-medium">
                    {account ? account.slice(2, 4).toUpperCase() : "?"}
                  </div>
                  <div className="flex-grow">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="What's on your mind?"
                      className="w-full bg-gray-700/30 text-white rounded-lg p-3 outline-none focus:ring-1 focus:ring-cyan-500 min-h-[80px] resize-none"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-3">
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {previewUrl && (
                          <img
                            src={previewUrl}
                            alt="preview"
                            className="h-12 rounded-md object-cover"
                          />
                        )}
                      </div>
                      <button
                        onClick={handleCreatePost}
                        disabled={loading || (!newPost.trim() && !imageFile)}
                        className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        {loading ? "Posting..." : "Post"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts */}
              <div className="space-y-6">
                {loading && posts.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="animate-spin mx-auto h-8 w-8 border-t-2 border-b-2 border-cyan-500 rounded-full" />
                    <p className="mt-3 text-gray-400">Loading posts...</p>
                  </div>
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <PostCard
                        post={post}
                        contract={contract}
                        signer={signer}
                        contractAddress={CONTRACT_ADDRESS}
                        reload={loadPosts}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-700/50">
                    <p className="text-gray-400 mb-4">
                      No posts yet — be the first to share something!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "explore" && <ExploreSection />}
          {activeTab === "profile" && (
            <UserProfile account={account} contract={contract} posts={posts} />
          )}
          {activeTab === "notifications" && <NotificationPanel />}
        </AnimatePresence>
      </div>
    </div>
  );
}
