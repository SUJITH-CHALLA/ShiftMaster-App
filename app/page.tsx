export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to ShiftMaster
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Your employee shift management solution
        </p>
        <div className="pt-4">
          <p className="text-sm text-gray-500">
            Application is ready for deployment
          </p>
        </div>
      </div>
    </main>
  );
}
