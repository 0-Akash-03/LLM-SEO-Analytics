'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface KeywordResult {
  keyword: string;
  searchVolume: number;
  difficulty: string;
  competition: number;
  trend: string;
  isTracking?: boolean;
}

export default function KeywordResearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<KeywordResult[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    // TODO: Implement actual API call to LLM service
    setTimeout(() => {
      setResults([
        {
          keyword: "AI chatbot development",
          searchVolume: 12500,
          difficulty: "Medium",
          competition: 0.65,
          trend: "Increasing",
          isTracking: false
        },
        {
          keyword: "LLM integration services",
          searchVolume: 8200,
          difficulty: "High",
          competition: 0.82,
          trend: "Stable",
          isTracking: false
        },
        {
          keyword: "chatbot API providers",
          searchVolume: 6100,
          difficulty: "Low",
          competition: 0.45,
          trend: "Increasing",
          isTracking: false
        }
      ]);
      setLoading(false);
    }, 1500);
  };

  const handleTrackKeyword = (keyword: string, index: number) => {
    // Update the tracking status in the results
    const updatedResults = [...results];
    updatedResults[index] = {
      ...updatedResults[index],
      isTracking: true
    };
    setResults(updatedResults);

    // Navigate to visibility tracker with the keyword
    router.push(`/visibility-tracker?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Keyword Research</h1>
        <p className="text-gray-600 mt-2">Discover high-potential keywords for LLM visibility</p>
      </header>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter a topic or keyword..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Search Volume</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competition</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{result.keyword}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{result.searchVolume.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{result.difficulty}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{(result.competition * 100).toFixed(1)}%</td>
                      <td className="px-6 py-4 whitespace-nowrap">{result.trend}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleTrackKeyword(result.keyword, index)}
                          disabled={result.isTracking}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            result.isTracking
                              ? 'bg-green-100 text-green-800 cursor-not-allowed'
                              : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                          }`}
                        >
                          {result.isTracking ? 'Tracking' : 'Track Keyword'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 