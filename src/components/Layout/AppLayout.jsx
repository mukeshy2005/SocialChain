// // src/components/Layout/AppLayout.jsx

// import React, { useEffect, useState, useMemo } from 'react';
// import { Outlet } from 'react-router-dom';
// import { ethers } from 'ethers';
// import { abi as SocialFeedABI } from '../../contract/SocialFeed.json';
// import LeftSidebar from './LeftSidebar';
// import RightSidebar from './RightSidebar';
// import CreatePostModal from '../CreatePostModal';

// const ConnectWalletScreen = ({ onConnectWallet }) => (
//     <div className="flex flex-col items-center justify-center h-screen bg-[#0B0E11] text-white">
//         <h1 className="text-4xl font-bold mb-4">Welcome to onsocial</h1>
//         <p className="text-gray-400 mb-8">Connect your wallet to join the decentralized conversation.</p>
//         <button
//             onClick={onConnectWallet}
//             className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full"
//         >
//             Connect Wallet
//         </button>
//     </div>
// );

// const AppLayout = () => {
//     const [provider, setProvider] = useState(null);
//     const [signer, setSigner] = useState(null);
//     const [contract, setContract] = useState(null);
//     const [account, setAccount] = useState(null);
//     const [allPosts, setAllPosts] = useState([]);
//     const [pfp, setPfp] = useState(null);
//     const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
//     const [savedPosts, setSavedPosts] = useState([]); // State for saved posts

//     const CONTRACT_ADDRESS = "0xf5bCE012Ef9Bf6f3fE23cDdC58b14acA3f70729E";

//     const topBoostedPosts = useMemo(() => {
//         return [...allPosts]
//             .sort((a, b) => BigInt(b.boostAmount || 0) > BigInt(a.boostAmount || 0) ? 1 : -1)
//             .slice(0, 5);
//     }, [allPosts]);

//     // Function to save or unsave a post
//     const toggleSavePost = (postId) => {
//         setSavedPosts(currentSaved => {
//             const isSaved = currentSaved.includes(postId);
//             const newSaved = isSaved
//                 ? currentSaved.filter(id => id !== postId) // Unsave
//                 : [...currentSaved, postId]; // Save
            
//             localStorage.setItem('savedPosts', JSON.stringify(newSaved));
//             return newSaved;
//         });
//     };

//     const connectWallet = async () => {
//         if (!window.ethereum) return alert("Please install MetaMask!");
//         try {
//             const _provider = new ethers.BrowserProvider(window.ethereum);
//             const { chainId } = await _provider.getNetwork();
//             const sepoliaChainId = 11155111;
//             if (Number(chainId) !== sepoliaChainId) {
//                 await window.ethereum.request({
//                     method: 'wallet_switchEthereumChain',
//                     params: [{ chainId: `0x${sepoliaChainId.toString(16)}` }],
//                 });
//             }
//             const finalProvider = new ethers.BrowserProvider(window.ethereum);
//             const _signer = await finalProvider.getSigner();
//             const address = await _signer.getAddress();
//             const _contract = new ethers.Contract(CONTRACT_ADDRESS, SocialFeedABI, _signer);
//             setProvider(finalProvider);
//             setSigner(_signer);
//             setContract(_contract);
//             setAccount(address);
//             window.ethereum.on("accountsChanged", () => window.location.reload());
//             window.ethereum.on("chainChanged", () => window.location.reload());
//         } catch (error) {
//             console.error("Failed to connect wallet:", error);
//         }
//     };

//     const disconnectWallet = () => {
//         setProvider(null);
//         setSigner(null);
//         setContract(null);
//         setAccount(null);
//         setAllPosts([]);
//         setPfp(null);
//         console.log("Wallet disconnected");
//     };

//     const loadPosts = async (currentContract) => {
//         if (!currentContract) return;
//         const count = await currentContract.postCount();
//         const loaded = [];
//         for (let i = count; i >= 1; i--) {
//             const p = await currentContract.posts(i);
//             loaded.push({
//                 id: Number(i),
//                 author: p.author,
//                 content: p.content,
//                 imageHash: p.imageHash || "",
//                 likeCount: Number(p.likeCount || 0),
//                 commentCount: Number(p.commentCount || 0),
//                 tipAmount: p.tipAmount || 0n,
//                 boostAmount: p.boostAmount || 0n,
//                 timestamp: Number(p.timestamp || 0),
//             });
//         }
//         setAllPosts(loaded);
//     };

//     const handlePfpSelect = (imageUrl) => {
//         localStorage.setItem(`pfp_${account}`, imageUrl);
//         setPfp(imageUrl);
//     };

//     // Effect to load saved posts from localStorage on initial load
//     useEffect(() => {
//         const saved = localStorage.getItem('savedPosts');
//         if (saved) {
//             setSavedPosts(JSON.parse(saved));
//         }
//     }, []);

//     useEffect(() => {
//         if (account) {
//             const savedPfp = localStorage.getItem(`pfp_${account}`);
//             if (savedPfp) setPfp(savedPfp);
//             else setPfp(null);
//         }
//     }, [account]);

//     useEffect(() => {
//         if (contract) {
//             loadPosts(contract);
//             const events = ["PostCreated", "PostLiked", "CommentAdded", "TipSent", "PostBoosted"];
//             const handler = () => loadPosts(contract);
//             events.forEach((event) => contract.on(event, handler));
//             return () => events.forEach((event) => contract.off(event, handler));
//         }
//     }, [contract]);

//     if (!signer) {
//         return <ConnectWalletScreen onConnectWallet={connectWallet} />;
//     }

//     return (
//         <>
//             <div className="flex h-screen bg-[#0B0E11] overflow-hidden">
//                 <LeftSidebar 
//                     account={account} 
//                     onDisconnect={disconnectWallet} 
//                     pfp={pfp} 
//                     onPfpSelect={handlePfpSelect}
//                     onCreatePostClick={() => setIsCreatePostModalOpen(true)}
//                 />
//                 <main className="flex-1 max-w-2xl mx-auto border-x border-gray-700/50 overflow-y-auto scrollbar-hide">
//                     <Outlet context={{ 
//                         contract, 
//                         account, 
//                         posts: allPosts, 
//                         reloadPosts: () => loadPosts(contract), 
//                         signer, 
//                         contractAddress: CONTRACT_ADDRESS, 
//                         pfp,
//                         savedPosts,      // Pass saved posts list
//                         toggleSavePost   // Pass the save/unsave function
//                     }} />
//                 </main>
//                 <RightSidebar topBoostedPosts={topBoostedPosts} />
//             </div>

//             <CreatePostModal 
//                 isOpen={isCreatePostModalOpen}
//                 onClose={() => setIsCreatePostModalOpen(false)}
//                 contract={contract}
//                 reload={() => loadPosts(contract)}
//             />
//         </>
//     );
// };

// export default AppLayout;

// src/components/Layout/AppLayout.jsx

import React, { useEffect, useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { ethers } from 'ethers';
import { abi as SocialFeedABI } from '../../contract/SocialFeed.json';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import CreatePostModal from '../CreatePostModal';

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
    const [pfp, setPfp] = useState(null);
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
    const [savedPosts, setSavedPosts] = useState([]);
    const [notifications, setNotifications] = useState([]); // State for notifications

    const CONTRACT_ADDRESS = "0xf5bCE012Ef9Bf6f3fE23cDdC58b14acA3f70729E";

    const topBoostedPosts = useMemo(() => {
        return [...allPosts]
            .sort((a, b) => BigInt(b.boostAmount || 0) > BigInt(a.boostAmount || 0) ? 1 : -1)
            .slice(0, 5);
    }, [allPosts]);

    const toggleSavePost = (postId) => {
        setSavedPosts(currentSaved => {
            const isSaved = currentSaved.includes(postId);
            const newSaved = isSaved
                ? currentSaved.filter(id => id !== postId)
                : [...currentSaved, postId];
            localStorage.setItem('savedPosts', JSON.stringify(newSaved));
            return newSaved;
        });
    };

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
        }
    };

    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setContract(null);
        setAccount(null);
        setAllPosts([]);
        setPfp(null);
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

    const handlePfpSelect = (imageUrl) => {
        localStorage.setItem(`pfp_${account}`, imageUrl);
        setPfp(imageUrl);
    };

    useEffect(() => {
        const saved = localStorage.getItem('savedPosts');
        if (saved) {
            setSavedPosts(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (account) {
            const savedPfp = localStorage.getItem(`pfp_${account}`);
            if (savedPfp) setPfp(savedPfp);
            else setPfp(null);
        }
    }, [account]);

    useEffect(() => {
        if (contract) {
            const handler = () => loadPosts(contract);
            loadPosts(contract); // Initial load
            const events = ["PostCreated", "PostLiked", "CommentAdded", "TipSent", "PostBoosted"];
            events.forEach((event) => contract.on(event, handler));
            return () => events.forEach((event) => contract.off(event, handler));
        }
    }, [contract]);

    // Effect to fetch notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            if (!contract || !account || !allPosts.length) return;

            const myPostIds = allPosts
                .filter(p => p.author.toLowerCase() === account.toLowerCase())
                .map(p => p.id);

            if (myPostIds.length === 0) return;

            const commentFilter = contract.filters.CommentAdded(null, myPostIds);
            const likeFilter = contract.filters.PostLiked(null, myPostIds);
            const tipFilter = contract.filters.TipSent(null, myPostIds, null, null);

            const [commentEvents, likeEvents, tipEvents] = await Promise.all([
                contract.queryFilter(commentFilter, 0, 'latest'),
                contract.queryFilter(likeFilter, 0, 'latest'),
                contract.queryFilter(tipFilter, 0, 'latest'),
            ]);
            
            const formattedNotifications = [
                ...commentEvents.map(e => ({ type: 'comment', from: e.args.commenter, postId: Number(e.args.postId), blockNumber: e.blockNumber })),
                ...likeEvents.map(e => ({ type: 'like', from: e.args.liker, postId: Number(e.args.postId), blockNumber: e.blockNumber })),
                ...tipEvents.map(e => ({ type: 'tip', from: e.args.tipper, postId: Number(e.args.postId), amount: e.args.amount, blockNumber: e.blockNumber })),
            ]
            .filter(n => n.from.toLowerCase() !== account.toLowerCase())
            .sort((a, b) => b.blockNumber - a.blockNumber);
            
            setNotifications(formattedNotifications);
        };

        fetchNotifications();
    }, [contract, account, allPosts]);


    if (!signer) {
        return <ConnectWalletScreen onConnectWallet={connectWallet} />;
    }

    return (
        <>
            <div className="flex h-screen bg-[#0B0E11] overflow-hidden">
                <LeftSidebar 
                    account={account} 
                    onDisconnect={disconnectWallet} 
                    pfp={pfp} 
                    onPfpSelect={handlePfpSelect}
                    onCreatePostClick={() => setIsCreatePostModalOpen(true)}
                    notificationCount={notifications.length}
                />
                <main className="flex-1 max-w-2xl mx-auto border-x border-gray-700/50 overflow-y-auto scrollbar-hide">
                    <Outlet context={{ 
                        contract, 
                        account, 
                        posts: allPosts, 
                        reloadPosts: () => loadPosts(contract), 
                        signer, 
                        contractAddress: CONTRACT_ADDRESS, 
                        pfp,
                        savedPosts,      
                        toggleSavePost,
                        notifications
                    }} />
                </main>
                <RightSidebar topBoostedPosts={topBoostedPosts} />
            </div>

            <CreatePostModal 
                isOpen={isCreatePostModalOpen}
                onClose={() => setIsCreatePostModalOpen(false)}
                contract={contract}
                reload={() => loadPosts(contract)}
            />
        </>
    );
};

export default AppLayout;