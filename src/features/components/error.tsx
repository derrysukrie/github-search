import { AlertCircle } from "lucide-react";

type ErrorProps = {
  error: Error | null;
};

export const Error = ({ error }: ErrorProps) => {
  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg mb-6 sm:mb-8 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="text-sm sm:text-base font-medium">
                {error instanceof Error ? error.message : "An error occurred"}
              </span>
            </div>
          </div>
        </div>
      )}    
    </>
  );
};
