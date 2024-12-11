import React, { useEffect, useState } from "react";

export const useForm = (fetchComments: () => void) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // フォーム送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, comment }),
      });

      const result = await response.json();
      if (result.success) {
        setName("");
        setComment("");
        fetchComments(); // 更新されたコメント一覧を取得
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    comment,
    setName,
    setComment,
    loading,
    handleSubmit,
  };
};

export const useComments = () => {
  const [comments, setComments] = useState([]);
  // コメント一覧を取得
  const fetchComments = async () => {
    try {
      const response = await fetch("/api/fetch-data");
      const data = await response.json();
      if (data.success) {
        setComments(data.data || []);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return {
    comments,
    fetchComments,
  };
};
