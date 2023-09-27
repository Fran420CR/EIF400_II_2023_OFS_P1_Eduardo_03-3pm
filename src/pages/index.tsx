import TextEditor from "@/components/TextEditor";
import { API_SERVER_URL } from "@/components/Url";
import { useEffect, useState } from "react";

interface HomeProps {
  keywordsList: string[];
}

const fetchKeywords = async (): Promise<string[]> => {
  try {
    const res = await fetch(`${API_SERVER_URL}/keywords`);
    if (!res.ok) {
      throw new Error('La solicitud no tuvo éxito.');
    }
    const data = await res.json();
    return data.keywords || [];
  } catch (error) {
    console.error('Error fetching keywords:', error);
    return [];
  }
};

const Home: React.FC<HomeProps> = ({ keywordsList }) => {
  const [fetchedKeywordsList, setFetchedKeywordsList] = useState<string[]>([]);

  useEffect(() => {
    fetchKeywords()
      .then((keywords) => setFetchedKeywordsList(keywords))
      .catch((error) => console.error('Error fetching keywords:', error));
  }, []);

  return (
    <div className="Home">
      <h1 style={{ textAlign: 'center' }}>One Flow Stream</h1>
      <TextEditor keywordsList={fetchedKeywordsList} />
    </div>
  );
};

export default Home;
