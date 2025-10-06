import React, { useEffect, useState } from "react";

export default function CommentList({ postId, contract }) {
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    try {
      if (!contract) return;
      const c = await contract.getComments(postId);
      // c is array of structs { commenter, content, timestamp }
      setComments(c.map(x => ({
        commenter: x.commenter,
        content: x.content,
        timestamp: Number(x.timestamp || 0)
      })));
    } catch (err) {
      console.error("load comments error", err);
    }
  };

  useEffect(() => {
    loadComments();
    // subscribe to event if you want (CommentAdded -> reload)
    const onComment = (pId) => {
      if (Number(pId) === Number(postId)) loadComments();
    };
    try {
      contract?.on("CommentAdded", onComment);
    } catch (e) {}
    return () => {
      try {
        contract?.off("CommentAdded", onComment);
      } catch (e) {}
    };
  }, [postId, contract]);

  return (
    <div>
      {comments.length === 0 ? <div className="text-sm text-gray-500">No comments yet</div> :
        comments.map((c, i) => (
          <div key={i} className="mb-2 text-sm">
            <span className="text-accent font-semibold">{c.commenter.slice(0,6)}...:</span> {c.content}
          </div>
        ))
      }
    </div>
  );
}
