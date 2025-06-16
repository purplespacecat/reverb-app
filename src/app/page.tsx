export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to Hello Next</h1>
      <p className="text-xl text-gray-700">
        A simple application to manage your favorite words.
      </p>
      <div className="bg-white shadow rounded-lg p-6 border border-emerald-100">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Getting Started</h2>
        <p className="text-gray-700 mb-4">
          Click on the "Words" link in the navigation bar to start managing your word list.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Add new words to your collection</li>
          <li>View all your saved words</li>
          <li>Keep track of your favorite vocabulary</li>
        </ul>
      </div>
    </div>
  );
}
