// src/components/Layout/AppLayout.jsx

import React, { useEffect, useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { ethers } from 'ethers';
import { abi as SocialFeedABI } from '../../contract/SocialFeed.json';

import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

const ConnectWalletScreen = ({ onConnectWallet }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0B0E11] text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to onsocial</h1>
        <p className="text-gray-400 mb-8">Connect your wallet to join the decentralized conversation.</p>
        <button
            onClick={onConnectWallet}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full"
        >
            Connect Wallet
        </button>
    </div>
);

const AppLayout = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [allPosts, setAllPosts] = useState([]);
    const [pfp, setPfp] = useState(null); // New state for PFP

    const CONTRACT_ADDRESS = "0xf5bCE012Ef9Bf6f3fE23cDdC58b14acA3f70729E";

    const topBoostedPosts = useMemo(() => {
        return [...allPosts]
            .sort((a, b) => BigInt(b.boostAmount || 0) > BigInt(a.boostAmount || 0) ? 1 : -1)
            .slice(0, 5);
    }, [allPosts]);

    const connectWallet = async () => {
        if (!window.ethereum) return alert("Please install MetaMask!");
        try {
            const _provider = new ethers.BrowserProvider(window.ethereum);
            const { chainId } = await _provider.getNetwork();
            const sepoliaChainId = 11155111;
            if (Number(chainId) !== sepoliaChainId) {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${sepoliaChainId.toString(16)}` }],
                });
            }
            const finalProvider = new ethers.BrowserProvider(window.ethereum);
            const _signer = await finalProvider.getSigner();
            const address = await _signer.getAddress();
            const _contract = new ethers.Contract(CONTRACT_ADDRESS, SocialFeedABI, _signer);
            setProvider(finalProvider);
            setSigner(_signer);
            setContract(_contract);
            setAccount(address);
            window.ethereum.on("accountsChanged", () => window.location.reload());
            window.ethereum.on("chainChanged", () => window.location.reload());
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            if (error.code === 4001) alert("You rejected the connection request.");
            else alert("Failed to connect wallet. See console for details.");
        }
    };

    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setContract(null);
        setAccount(null);
        setAllPosts([]);
        setPfp(null); // Reset PFP on disconnect
        console.log("Wallet disconnected");
    };

    const loadPosts = async (currentContract) => {
        if (!currentContract) return;
        const count = await currentContract.postCount();
        const loaded = [];
        for (let i = count; i >= 1; i--) {
            const p = await currentContract.posts(i);
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
        setAllPosts(loaded);
    };

    // Function to handle PFP selection
    const handlePfpSelect = (imageUrl) => {
        localStorage.setItem(`pfp_${account}`, imageUrl); // Save PFP per account
        setPfp(imageUrl);
    };

    // Effect to load PFP from localStorage when account changes
    useEffect(() => {
        if (account) {
            const savedPfp = localStorage.getItem(`pfp_${account}`);
            if (savedPfp) {
                setPfp(savedPfp);
            } else {
                setPfp(null); // Reset if new account has no saved PFP
            }
        }
    }, [account]);

    useEffect(() => {
        if (contract) {
            loadPosts(contract);
            const events = ["PostCreated", "PostLiked", "CommentAdded", "TipSent", "PostBoosted"];
            const handler = () => loadPosts(contract);
            events.forEach((event) => contract.on(event, handler));
            return () => events.forEach((event) => contract.off(event, handler));
        }
    }, [contract]);

    if (!signer) {
        return <ConnectWalletScreen onConnectWallet={connectWallet} />;
    }

    return (
        <div className="flex h-screen bg-[#0B0E11] overflow-hidden">
            <LeftSidebar 
                account={account} 
                onDisconnect={disconnectWallet} 
                pfp={pfp} 
                onPfpSelect={handlePfpSelect} 
            />
            <main className="flex-1 max-w-2xl mx-auto border-x border-gray-700/50 overflow-y-auto scrollbar-hide">
                <Outlet context={{ contract, account, posts: allPosts, reloadPosts: () => loadPosts(contract), signer, contractAddress: CONTRACT_ADDRESS, pfp }} />
            </main>
            <RightSidebar topBoostedPosts={topBoostedPosts} />
        </div>
    );
};

export default AppLayout;