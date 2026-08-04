const WorkoutSkeleton = () => {
  return (
    <div className="animate-pulse bg-surface border border-border rounded-card p-6">
      <div className="h-6 w-40 rounded bg-gray-700 mb-6" />

      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="h-4 w-16 rounded bg-gray-700" />
          <div className="h-4 w-12 rounded bg-gray-700" />
        </div>

        <div className="flex justify-between">
          <div className="h-4 w-16 rounded bg-gray-700" />
          <div className="h-4 w-10 rounded bg-gray-700" />
        </div>
      </div>

      <div className="h-4 w-24 rounded bg-gray-700 mt-6" />
    </div>
  );
};

export default WorkoutSkeleton;