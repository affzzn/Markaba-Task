import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { fetchTopHeadlines, type NewsArticle } from "../api/newsService";
import UserCard from "../components/UserCard";
import NewsFeed from "../components/NewsFeed";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    fetchTopHeadlines()
      .then(setNews)
      .catch((err) => {
        console.error("News fetch failed:", err);
        setError("Failed to load news. You may have hit the rate limit.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 space-y-10">
      <UserCard user={user} onLogout={handleLogout} />
      {error ? (
        <div className="bg-gray-500 text-white p-4 rounded max-w-3xl mx-auto text-center">
          {error}
        </div>
      ) : (
        <NewsFeed articles={news} loading={loading} />
      )}
      <p className="text-center text-sm text-gray-400 mt-4">
        News powered by{" "}
        <a
          href="https://newsdata.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          NewsData.io
        </a>
      </p>
    </div>
  );
};

export default DashboardPage;
