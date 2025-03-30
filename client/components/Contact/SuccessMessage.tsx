import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
    onReset: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ onReset }) => {
    return (
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-4">Thank you for reaching out. Our team will get back to you shortly.</p>
            <button
                onClick={onReset}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm transition-colors"
            >
                Send Another Message
            </button>
        </div>
    );
};

export default SuccessMessage;