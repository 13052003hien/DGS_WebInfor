import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Oops!</h1>
                <p className="text-xl text-gray-700 mb-4">Something went wrong</p>
                <p className="text-gray-500">
                    {error.status === 404 ? 'Page not found' : error.message || 'An unexpected error occurred'}
                </p>
            </div>
        </div>
    );
};

export default ErrorBoundary;
