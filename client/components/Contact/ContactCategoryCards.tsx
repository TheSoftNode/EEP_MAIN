import React from 'react';
import { GraduationCap, Compass } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export const ContactCategoryCards: React.FC = () => {
    return (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-indigo-100 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-indigo-600" />
                        For Learners
                    </CardTitle>
                    <CardDescription>Questions about our programs</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="text-sm space-y-2 text-gray-600">
                        <li>• Application process and deadlines</li>
                        <li>• Program curriculum and offerings</li>
                        <li>• Payment options and financial assistance</li>
                        <li>• Career placement opportunities</li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="border border-indigo-100 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Compass className="w-5 h-5 text-indigo-600" />
                        Business Partnership
                    </CardTitle>
                    <CardDescription>Expert project guidance</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="text-sm space-y-2 text-gray-600">
                        <li>• AI project development and implementation</li>
                        <li>• Technical advisory and solution architecture</li>
                        <li>• Project assessment and optimization</li>
                        <li>• Team mentoring and skill development</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default ContactCategoryCards;