import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactInfoItem {
    icon: React.ReactNode | string;
    title: string;
    content: string;
}

interface ContactInfoCardsProps {
    contactInfo: ContactInfoItem[];
}

export const ContactInfoCards: React.FC<ContactInfoCardsProps> = ({ contactInfo }) => {
    const getIcon = (icon: React.ReactNode | string) => {
        if (typeof icon === 'string') {
            switch (icon) {
                case 'Phone':
                    return <Phone className="w-4 h-4" />;
                case 'MapPin':
                    return <MapPin className="w-4 h-4" />;
                default:
                    return <Mail className="w-4 h-4" />;
            }
        }
        return icon;
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
            {contactInfo.map((item, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center flex-1 min-w-[180px] max-w-[240px] transition-all hover:shadow-md hover:border-indigo-100"
                >
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 mb-2">
                        {getIcon(item.icon)}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{item.content}</p>
                </div>
            ))}
        </div>
    );
};

export default ContactInfoCards;