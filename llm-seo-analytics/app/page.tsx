import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your LLM SEO performance and insights</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Key Metrics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Total Mentions</h3>
          <p className="text-4xl font-bold text-indigo-600">1,234</p>
          <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Tracked Keywords</h3>
          <p className="text-4xl font-bold text-indigo-600">56</p>
          <p className="text-sm text-gray-500 mt-2">Active tracking</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Average Position</h3>
          <p className="text-4xl font-bold text-indigo-600">#3</p>
          <p className="text-sm text-gray-500 mt-2">Across all keywords</p>
        </div>
      </div>

      {/* Recent Activity */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="font-medium">New mention detected</p>
            <p className="text-sm text-gray-600">Your website was mentioned in response to "best AI development tools"</p>
            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
          </div>
          <div className="border-b pb-4">
            <p className="font-medium">Keyword ranking improved</p>
            <p className="text-sm text-gray-600">"LLM integration" moved from position 5 to position 2</p>
            <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
          </div>
          <div className="pb-4">
            <p className="font-medium">New competitor detected</p>
            <p className="text-sm text-gray-600">New competitor found for keyword "AI analytics platform"</p>
            <p className="text-xs text-gray-500 mt-1">1 day ago</p>
          </div>
        </div>
      </section>
    </div>
  );
}
