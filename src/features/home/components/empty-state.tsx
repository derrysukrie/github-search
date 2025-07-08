import { Github } from "lucide-react";

type EmptyStateProps = {
  user: boolean;
  loading: boolean;
  error: boolean;
};

export const EmptyState = ({ user, loading, error }: EmptyStateProps) => {
  return (
    <div>
      {!user && !loading && !error && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 text-center py-8 sm:py-12 overflow-hidden">
          <div className="p-6">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <Github className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-slate-900">
              Ready to explore GitHub?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
              Enter a GitHub username above to discover their profile,
              repositories, and contributions to the open source community.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
