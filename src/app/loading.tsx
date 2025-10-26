export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <div className="bg-gray-300 animate-pulse h-96" />
      
      {/* Stats Skeleton */}
      <div className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="h-12 bg-gray-800 rounded mx-auto w-32 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-800 rounded mx-auto w-40 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="h-8 bg-gray-300 rounded w-48 mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
