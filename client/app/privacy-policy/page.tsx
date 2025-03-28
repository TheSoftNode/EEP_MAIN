"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Lock, Eye, AlertCircle } from 'lucide-react';

// Define proper type for expanded sections
interface ExpandedSections {
    [key: string]: boolean;
}

const PrivacyPolicyPage = () => {
    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({});

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const sections = [
        {
            id: 'introduction',
            title: 'Introduction',
            content: (
                <div className="space-y-4">
                    <p>At HitoAI Limited, we respect your privacy and are committed to protecting it through our compliance with this privacy policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website at https://hitoai.ai/ (our "Site") and use our AI-powered solutions such as Susnet, Selwel, and Secuell ("Services"), and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>
                    <p>Given the nature of AI solutions, we prioritize data privacy. All data processed by our AI models complies with GDPR regulations applicable in the EU and UK.</p>
                    <p>Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use our Site and Services. By accessing or using the Site and Services, you agree to this privacy policy.</p>
                </div>
            )
        },
        {
            id: 'information-collection',
            title: 'Information We Collect',
            content: (
                <div className="space-y-4">
                    <p>We collect several types of information from and about users of our Site and Services, including:</p>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                        <li>Personal information that you provide to us, such as your name, email address, and company name when you register for an account, subscribe to our Services, or contact us.</li>
                        <li>Information about your internet connection, the equipment you use to access our Site, and usage details.</li>
                        <li>Information provided when you use our Services, including data inputs and outputs related to our AI solutions.</li>
                        <li>Any information you provide when communicating with us, such as through email, phone, or mail correspondence.</li>
                    </ul>
                    <p>We may also collect information automatically as you navigate through the Site, including usage details, IP addresses, browser types, and information collected through cookies and other tracking technologies.</p>
                </div>
            )
        },
        {
            id: 'information-use',
            title: 'How We Use Your Information',
            content: (
                <div className="space-y-4">
                    <p>We use information that we collect about you or that you provide to us, including any personal information:</p>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                        <li>To present our Site and Services and their contents to you.</li>
                        <li>To provide you with information, products, or services that you request from us.</li>
                        <li>To fulfill any other purpose for which you provide it.</li>
                        <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
                        <li>To notify you about changes to our Site or Services.</li>
                        <li>To improve our Site and Services, including enhancing our AI models and solutions.</li>
                        <li>In any other way we may describe when you provide the information.</li>
                        <li>For any other purpose with your consent.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'information-sharing',
            title: 'Information Sharing and Disclosure',
            content: (
                <div className="space-y-4">
                    <p>We may disclose aggregated information about our users, and information that does not identify any individual, without restriction.</p>
                    <p>We may disclose personal information that we collect or you provide as described in this privacy policy:</p>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                        <li>To our subsidiaries and affiliates.</li>
                        <li>To contractors, service providers, and other third parties we use to support our business.</li>
                        <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of HitoAI Limited's assets.</li>
                        <li>To fulfill the purpose for which you provide it.</li>
                        <li>For any other purpose disclosed by us when you provide the information.</li>
                        <li>With your consent.</li>
                    </ul>
                    <p>We may also disclose your personal information:</p>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                        <li>To comply with any court order, law, or legal process, including to respond to any government or regulatory request.</li>
                        <li>To enforce or apply our terms of use and other agreements.</li>
                        <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of HitoAI Limited, our customers, or others.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'data-security',
            title: 'Data Security',
            content: (
                <div className="space-y-4">
                    <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls. Any payment transactions will be encrypted using SSL technology.</p>
                    <p>The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our Site, you are responsible for keeping this password confidential. We ask you not to share your password with anyone.</p>
                    <p>Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Site. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the Site.</p>
                </div>
            )
        },
        {
            id: 'data-retention',
            title: 'Data Retention',
            content: (
                <div className="space-y-4">
                    <p>We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services.</p>
                    <p>We will only retain your personal information for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
                    <p>Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data.</p>
                </div>
            )
        },
        {
            id: 'gdpr-compliance',
            title: 'GDPR Compliance',
            content: (
                <div className="space-y-4">
                    <p>For users in the European Economic Area (EEA), we process your personal data in accordance with the General Data Protection Regulation (GDPR). This means you have certain rights regarding your personal data, including:</p>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                        <li>The right to access, update or delete your personal information.</li>
                        <li>The right of rectification - to have your information altered if it is inaccurate or incomplete.</li>
                        <li>The right to object to our processing of your personal data.</li>
                        <li>The right of restriction - to request that we restrict the processing of your personal information.</li>
                        <li>The right to data portability - to receive a copy of your personal data in a structured, machine-readable format.</li>
                        <li>The right to withdraw consent - to withdraw your consent at any time where we relied on your consent to process your personal information.</li>
                    </ul>
                    <p>Please note that we may ask you to verify your identity before responding to such requests. You have the right to complain to a Data Protection Authority about our collection and use of your personal data.</p>
                </div>
            )
        },
        {
            id: 'children-privacy',
            title: 'Children\'s Privacy',
            content: (
                <div className="space-y-4">
                    <p>Our Services are not intended for children under 18 years of age. No one under age 18 may provide any information to or on the Site. We do not knowingly collect personal information from children under 18. If you are under 18, do not use or provide any information on this Site or through any of its features, register on the Site, or provide any information about yourself to us. If we learn we have collected or received personal information from a child under 18 without verification of parental consent, we will delete that information.</p>
                </div>
            )
        },
        {
            id: 'cookies',
            title: 'Cookies and Tracking Technologies',
            content: (
                <div className="space-y-4">
                    <p>We use cookies and similar tracking technologies to track activity on our Site and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.</p>
                    <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.</p>
                    <p>We use cookies for the following purposes:</p>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                        <li>To enable certain functions of the Service.</li>
                        <li>To provide analytics and understand how you use our Service.</li>
                        <li>To store your preferences.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'third-party-links',
            title: 'Links to Third-Party Sites',
            content: (
                <div className="space-y-4">
                    <p>Our Site may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
                    <p>We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
                </div>
            )
        },
        {
            id: 'changes',
            title: 'Changes to Our Privacy Policy',
            content: (
                <div className="space-y-4">
                    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.</p>
                    <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                </div>
            )
        },
        {
            id: 'contact',
            title: 'Contact Us',
            content: (
                <div className="space-y-4">
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <ul className="list-none space-y-1">
                        <li>By email: info@hitoai.ai</li>
                        <li>By phone: +353 899832147</li>
                        <li>By mail: Sandyford, Dublin 18, Dublin, Dublin County, Iceland</li>
                    </ul>
                </div>
            )
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-indigo-600 text-white p-6">
                            <h1 className="text-2xl md:text-3xl font-bold">Privacy Policy</h1>
                            <p className="mt-2 text-indigo-100">Last updated November 29, 2024</p>
                            <div className="flex items-center mt-4 text-indigo-100">
                                <Shield className="w-5 h-5 mr-2" />
                                <span>Your privacy is important to us</span>
                            </div>
                        </div>

                        {/* Key Points Summary */}
                        <div className="p-6 border-b bg-indigo-50">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Key Privacy Points</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                                    <div className="flex items-center text-indigo-600 mb-2">
                                        <Lock className="w-5 h-5 mr-2" />
                                        <h3 className="font-medium">Data Security</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">All data processed by our AI models complies with GDPR regulations applicable in the EU and UK.</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                                    <div className="flex items-center text-indigo-600 mb-2">
                                        <Eye className="w-5 h-5 mr-2" />
                                        <h3 className="font-medium">Your Control</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">You have the right to access, update, or delete your personal information at any time.</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                                    <div className="flex items-center text-indigo-600 mb-2">
                                        <AlertCircle className="w-5 h-5 mr-2" />
                                        <h3 className="font-medium">Limited Sharing</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">We only share your data with third parties when necessary and with your consent.</p>
                                </div>
                            </div>
                        </div>

                        {/* Policy Sections */}
                        <div className="divide-y">
                            {sections.map((section) => (
                                <div
                                    key={section.id}
                                    id={section.id}
                                    className="p-6"
                                >
                                    <button
                                        className="flex justify-between items-center w-full text-left"
                                        onClick={() => toggleSection(section.id)}
                                    >
                                        <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                                        {expandedSections[section.id] ?
                                            <ChevronUp className="h-5 w-5 text-indigo-600" /> :
                                            <ChevronDown className="h-5 w-5 text-indigo-600" />
                                        }
                                    </button>

                                    {expandedSections[section.id] && (
                                        <div className="mt-4 text-gray-700 text-sm">
                                            {section.content}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Final Notice */}
                        <div className="p-6 bg-gray-50 text-center">
                            <p className="text-sm text-gray-600">By using our Site and Services, you acknowledge that you have read and understand this Privacy Policy.</p>
                            <p className="text-sm text-gray-600 mt-2">© 2024 HitoAI Limited. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;