
export const CenteredLoadingComponent = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="flex flex-col items-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-400 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-4 text-lg text-center text-white">Loading...</p>
        </div>
    </div>
);
