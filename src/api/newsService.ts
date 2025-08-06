export interface NewsArticle {
  title: string;
  link: string;
  pubDate: string;
  source_id: string;
}

export const fetchTopHeadlines = async (): Promise<NewsArticle[]> => {
  const res = await fetch(
    `https://newsdata.io/api/1/latest?apikey=${
      import.meta.env.VITE_NEWS_API_KEY
    }&q=tech&country=us`
  );

  const data = await res.json();

  if (!data.results) {
    throw new Error("No news data available");
  }

  return data.results.slice(0, 10); //top 10
};
