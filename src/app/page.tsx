export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tsuyaku Backend
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Translation API Backend for Japanese Railway Announcements
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">API Endpoint</h2>
          <code className="bg-gray-100 p-2 rounded text-sm">
            POST /api/translate
          </code>
          <p className="text-sm text-gray-500 mt-2">
            Send JSON with `text` field containing Japanese text to translate
          </p>
        </div>
      </div>
    </div>
  )
} 