import { Loader2, Search } from "lucide-react";
import { useState } from "react";

type SearchSectionProps = {
  initialQuery: string;
  onSearch: (query: string) => void;
  loading: boolean;
};

export const SearchSection = ({
  initialQuery,
  onSearch,
  loading,
}: SearchSectionProps) => {
  const [query, setQuery] = useState(initialQuery);

  const handleLocalSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLocalSearch();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-6 sm:mb-8 overflow-hidden">
      <div className="text-center px-4 sm:px-6 pt-8 pb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900">
          Find GitHub Users
        </h2>
        <p className="text-base sm:text-lg text-slate-600">
          Enter a GitHub username to explore their profile and repositories
        </p>
      </div>
      <div className="px-4 sm:px-6 pb-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Enter GitHub username..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 sm:py-4 text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                disabled={loading}
              />
            </div>
          </div>
          <button
            onClick={handleLocalSearch}
            disabled={loading || !query.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
