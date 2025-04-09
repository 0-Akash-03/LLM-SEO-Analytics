'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface Mention {
  id: string;
  source: string;
  keyword: string;
  context: string;
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface TrackedKeyword {
  keyword: string;
  dateAdded: string;
  mentions: number;
  lastMention: string;
}

export default function VisibilityTracker() {
  const searchParams = useSearchParams();
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackedKeywords, setTrackedKeywords] = useState<TrackedKeyword[]>([]);
  const [mentions, setMentions] = useState<Mention[]>([]);

  useEffect(() => {
    const keywordFromSearch = searchParams.get('keyword');
    if (keywordFromSearch && !trackedKeywords.find(tk => tk.keyword === keywordFromSearch)) {
      setTrackedKeywords(prev => [...prev, {
        keyword: keywordFromSearch,
        dateAdded: new Date().toISOString(),
        mentions: 0,
        lastMention: '-'
      }]);
    }
  }, [searchParams]);

  const handleStartTracking = () => {
    setIsTracking(true);
    // TODO: Implement actual tracking logic
  };

  const handleRemoveKeyword = (keyword: string) => {
    setTrackedKeywords(prev => prev.filter(tk => tk.keyword !== keyword));
  };

  const getSentimentColor = (sentiment: Mention['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Visibility Tracker</h1>
        <p className="text-gray-600 mt-2">Monitor your website mentions across LLM platforms</p>
      </header>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter your website URL..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
          <button
            onClick={handleStartTracking}
            disabled={isTracking || !websiteUrl}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isTracking ? 'Tracking Active' : 'Start Tracking'}
          </button>
        </div>

        {/* Tracked Keywords Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Tracked Keywords</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            {trackedKeywords.length === 0 ? (
              <p className="text-gray-500">No keywords being tracked. Add keywords from the Keyword Research page.</p>
            ) : (
              <div className="grid gap-4">
                {trackedKeywords.map((tk) => (
                  <div key={tk.keyword} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                    <div>
                      <h3 className="font-medium">{tk.keyword}</h3>
                      <p className="text-sm text-gray-500">Added: {new Date(tk.dateAdded).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{tk.mentions} mentions</p>
                        <p className="text-xs text-gray-500">Last: {tk.lastMention}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveKeyword(tk.keyword)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <span className="sr-only">Remove</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Total Mentions</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{mentions.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Positive Mentions</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {mentions.filter(m => m.sentiment === 'positive').length}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Sources</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {new Set(mentions.map(m => m.source)).size}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Mentions</h2>
          <div className="space-y-4">
            {mentions.map((mention) => (
              <div key={mention.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{mention.source}</h3>
                  <span className={`${getSentimentColor(mention.sentiment)} text-sm`}>
                    {mention.sentiment.charAt(0).toUpperCase() + mention.sentiment.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Keyword:</span> {mention.keyword}
                </p>
                <p className="text-sm text-gray-700">{mention.context}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(mention.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 