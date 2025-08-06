import React from "react";
import { type NewsArticle } from "../api/newsService";

interface Props {
  articles: NewsArticle[];
  loading: boolean;
}

const NewsFeed: React.FC<Props> = ({ articles, loading }) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded shadow-md max-w-3xl mx-auto h-[520px] overflow-y-auto">
      <h3 className="text-xl font-semibold mb-4">Top Tech News</h3>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article, idx) => (
            <li key={idx} className="border-b border-gray-700 pb-2">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {article.title}
              </a>
              <p className="text-sm text-gray-400 mt-1">
                {article.pubDate} — {article.source_id}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsFeed;
