import { FileQuestion } from 'lucide-react';



export const NoFilesFoundComponent = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="flex flex-col items-center text-center text-white">
            <FileQuestion className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-lg mb-2">No Documents Found</p>
        </div>
    </div>
);