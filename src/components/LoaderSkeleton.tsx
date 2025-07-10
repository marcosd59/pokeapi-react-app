export const LoaderSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[...Array(9)].map((_, i) => (
      <div
        key={i}
        className="
            rounded-xl shadow-lg p-6 flex flex-col items-center
            bg-gray-200 animate-pulse
          "
      >
        <div className="w-32 h-32 bg-gray-300 rounded mb-4" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
        <div className="h-3 bg-gray-300 rounded w-1/3 mb-4" />
        <div className="flex space-x-2 mb-4">
          <div className="h-4 w-10 bg-gray-300 rounded-full" />
          <div className="h-4 w-10 bg-gray-300 rounded-full" />
        </div>
        <div className="mt-auto h-8 w-24 bg-gray-300 rounded-full" />
      </div>
    ))}
  </div>
);
