import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { fetchTopHeadlines, type NewsArticle } from "../api/newsService";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchTopHeadlines()
      .then(setNews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-gray-100 space-y-8">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto text-center">
        <img
          src={user.photoURL ?? ""}
          alt="Profile"
          referrerPolicy="no-referrer"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Top News Headlines</h3>
        {loading ? (
          <p>Loading news...</p>
        ) : (
          <ul className="space-y-4">
            {news.map((article, idx) => (
              <li key={idx} className="border-b pb-2">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {article.title}
                </a>
                <p className="text-sm text-gray-500">
                  {article.pubDate} — {article.source_id}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
