import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TipModal from "./TipModal";
import CommentList from "./CommentList";
import LoadingSpinner from "./LoadingSpinner";

const PostCard = ({ post, contract, signer, contractAddress, reload }) => {
  const [showComments, setShowComments] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);

  useEffect(() => {
    setLikeCount(post.likeCount || 0);
  }, [post.likeCount]);

  const formatEth = (v) => {
    try {
      if (!v) return "0.0";
      return ethers.formatEther(BigInt(v));
    } catch (e) {
      return "0.0";
    }
  };

  const handleLike = async () => {
    if (!contract) return;
    try {
      setIsLiking(true);
      const tx = await contract.likePost(post.id);
      await tx.wait();
      setLikeCount((p) => p + 1);
      reload && reload();
    } catch (err) {
      console.error("like error", err);
      alert(err?.reason || err?.message || "Like failed");
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim() || !contract) return;
    try {
      setIsCommenting(true);
      const tx = await contract.commentOnPost(post.id, commentText);
      await tx.wait();
      setCommentText("");
      setShowComments(true);
      reload && reload();
    } catch (err) {
      console.error("comment error", err);
      alert("Comment failed");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleTipNative = async () => {
    if (!contract) return;
    const eth = prompt("Tip amount in ETH:");
    if (!eth) return;
    try {
      const tx = await contract.tipPost(post.id, { value: ethers.parseEther(eth) });
      await tx.wait();
      alert("Tip sent");
      reload && reload();
    } catch (err) {
      console.error("tip error", err);
      alert("Tip failed");
    }
  };

  const handleBoost = async () => {
    if (!contract) return;
    const eth = prompt("Boost amount in ETH:");
    if (!eth) return;
    try {
      const tx = await contract.boostPost(post.id, { value: ethers.parseEther(eth) });
      await tx.wait();
      alert("Boost successful");
      reload && reload();
    } catch (err) {
      console.error("boost error", err);
      alert("Boost failed");
    }
  };

  const handleClaim = async () => {
    if (!contract) return;
    try {
      const tx = await contract.claimBoostProfit(post.id);
      await tx.wait();
      alert("Profit claimed (if eligible)");
      reload && reload();
    } catch (err) {
      console.error("claim error", err);
      alert("Claim failed or not eligible yet");
    }
  };

  const formattedDate = new Date(Number(post.timestamp) * 1000).toLocaleString();
  const shorten = (a) => (a ? `${a.slice(0, 6)}...${a.slice(-4)}` : "—");

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-purple-900/30 border border-gray-700">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
          {post.author?.slice(2, 4).toUpperCase()}
        </div>
        <div className="ml-3">
          <div className="text-white font-medium">{shorten(post.author)}</div>
          <div className="text-xs text-gray-400">{formattedDate}</div>
        </div>
      </div>

      {post.imageHash && (
        <div className="mb-3">
          <img src={`https://gateway.pinata.cloud/ipfs/${post.imageHash}`} alt="post" className="rounded-md w-full object-cover max-h-72 mb-3" />
        </div>
      )}

      <div className="mb-3 text-gray-100 whitespace-pre-wrap">{post.content}</div>

      <div className="flex justify-between items-center text-sm text-gray-400 mb-3 pt-2 border-t border-gray-700">
        <div>{likeCount} likes</div>
        <div>{post.commentCount} comments</div>
        <div>Tips: {formatEth(post.tipAmount || 0n)} ETH</div>
        <div>Boosted: {formatEth(post.boostAmount || 0n)} ETH</div>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={handleLike} disabled={isLiking || !contract} className="flex items-center text-gray-300 hover:text-purple-400 disabled:opacity-50">
          {isLiking ? <LoadingSpinner size="small" color="gray" /> : "Like"}
        </button>

        <button onClick={() => setShowComments((s) => !s)} className="text-gray-300 hover:text-blue-300">
          Comment
        </button>

        <button onClick={handleTipNative} disabled={!contract} className="text-gray-300 hover:text-green-300">
          Tip (ETH)
        </button>

        <button onClick={() => setShowTipModal(true)} disabled={!contract} className="text-gray-300 hover:text-blue-400">
          Tip (ERC20)
        </button>

        <button onClick={handleBoost} disabled={!contract} className="text-gray-300 hover:text-emerald-300">
          Boost 🚀
        </button>

        <button onClick={handleClaim} disabled={!contract} className="text-gray-300 hover:text-yellow-300">
          Claim 💰
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-3 border-t border-gray-700">
          <div className="mb-3">
            <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="w-full bg-gray-700 rounded-md p-2 text-sm text-white resize-none" rows={2} />
            <div className="flex justify-end mt-2">
              <button onClick={handleComment} disabled={isCommenting || !commentText.trim() || !contract} className="bg-purple-600 px-3 py-1 rounded-md disabled:opacity-50">
                {isCommenting ? <LoadingSpinner size="small" color="white" /> : "Submit"}
              </button>
            </div>
          </div>

          <CommentList postId={post.id} contract={contract} />
        </div>
      )}

      {showTipModal && (
        <TipModal postId={post.id} contract={contract} signer={signer} contractAddress={contractAddress} onClose={() => setShowTipModal(false)} onTipped={() => { reload && reload(); setShowTipModal(false); }} />
      )}
    </div>
  );
};

export default PostCard;
