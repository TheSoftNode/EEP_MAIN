"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, FileText } from 'lucide-react';

const TermsAndConditionsPage: React.FC = () => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    const toggleSection = (sectionId: string): void => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const sections = [
        {
            id: 'agreement',
            title: 'AGREEMENT TO OUR LEGAL TERMS',
            content: (
                <div className="space-y-4">
                    <p>We are HitoAI Limited ('Company', 'we', 'us', or 'our'), a company registered in Iceland at Sandyford, Dublin 18, Dublin, Dublin County.</p>
                    <p>We operate the website https:/hitoai.ai/ (the 'Site'), as well as any other related products and services that refer or link to these legal terms (the 'Legal Terms') (collectively, the 'Services').</p>
                    <p>You can contact us by phone at +353 899832147, email at info@hitoai.com, or by mail to Sandyford, Dublin 18, Dublin, Dublin County, Iceland.</p>
                    <p>These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ('you'), and HitoAI Limited, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>
                    <p>We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you by info@hitoai.com, as stated in the email message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.</p>
                    <p>The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.</p>
                    <p>We recommend that you print a copy of these Legal Terms for your records.</p>
                </div>
            )
        },
        {
            id: 'services',
            title: '1. OUR SERVICES',
            content: (
                <div className="space-y-4">
                    <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</p>
                    <p>Tech industry</p>
                </div>
            )
        },
        {
            id: 'ip',
            title: '2. INTELLECTUAL PROPERTY RIGHTS',
            content: (
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Our intellectual property</h4>
                    <p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the 'Content'), as well as the trademarks, service marks, and logos contained therein (the 'Marks').</p>
                    <p>Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.</p>
                    <p>The Content and Marks are provided in or through the Services 'AS IS' for your personal, non-commercial use or internal business purpose only.</p>

                    <h4 className="font-semibold text-gray-800 mt-4">Your use of our Services</h4>
                    <p>Subject to your compliance with these Legal Terms, including the 'PROHIBITED ACTIVITIES' section below, we grant you a non-exclusive, non-transferable, revocable licence to:</p>
                    <ul className="list-disc list-inside pl-4">
                        <li>Access the Services; and</li>
                        <li>Download or print a copy of any portion of the Content to which you have properly gained access</li>
                    </ul>
                    <p>Solely for your personal, non-commercial use or internal business purpose.</p>
                    <p>Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>
                    <p>If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: info@hitoai.com. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.</p>
                    <p>We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.</p>
                    <p>Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.</p>

                    <h4 className="font-semibold text-gray-800 mt-4">Your submissions and contributions</h4>
                    <p>Please review this section and the 'PROHIBITED ACTIVITIES' section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.</p>
                    <p>Submissions: By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ('Submissions'), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.</p>
                    <p>Contributions: The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality during which you may create, submit, post, display, transmit, publish, distribute, or broadcast content and materials to us or through the Services, including but not limited to text, writings, video, audio, photographs, music, graphics, comments, reviews, rating suggestions, personal information, or other material ('Contributions'). Any Submission that is publicly posted shall also be treated as a Contribution.</p>
                    <p>You understand that Contributions may be viewable by other users of the Services and possibly through third-party websites.</p>
                    <p>When you post Contributions, you grant us a licence (Including use of your name, trademarks, and logos): By posting any Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and licence to: use, copy, reproduce, distribute, sell, resell, publish, broadcast, retitle, store, publicly perform, publicly display, reformat, translate, excerpt (in whole or in part), and exploit your Contributions (including, without limitation, your image, name, and voice) for any purpose, commercial, advertising, or otherwise, to prepare derivative works of, or incorporate into other works, your Contributions, and to sublicence the licences granted in this section.</p>
                    <p>Our use and distribution may occur in any media formats and through any media channels.</p>
                    <p>This licence includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide.</p>
                    <p>You are responsible for what you post or upload: By sending us Submissions and/or posting Contributions through any part of the Services or making Contributions accessible through the Services by linking your account through the Services to any of your social networking accounts, you:</p>
                    <ul className="list-disc list-inside pl-4">
                        <li>Confirm that you have read and agree with our 'PROHIBITED ACTIVITIES' and will not post, send, publish, upload, or transmit through the Services any Submission nor post any Contribution that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;</li>
                        <li>To the extent permissible by applicable law, waive any and all moral rights to any such Submission and/or Contribution;</li>
                        <li>warrant that any such Submission and/or Contributions are original to you or that you have the necessary rights and licences to submit such Submissions and/or Contributions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions and/or Contributions; and</li>
                        <li>warrant and represent that your Submissions and/or Contributions do not constitute confidential information.</li>
                    </ul>
                    <p>You are solely responsible for your Submissions and/or Contributions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party's intellectual property rights, or (c) applicable law.</p>
                    <p>We may remove or edit your Content: Although we have no obligation to monitor any Contributions, we shall have the right to remove or edit any Contributions at any time without notice if in our reasonable opinion we consider such Contributions harmful or in breach of these Legal Terms. If we remove or edit any such Contributions, we may also suspend or disable your account and report you to the authorities.</p>
                </div>
            )
        },
        {
            id: 'user-representations',
            title: '3. USER REPRESENTATIONS',
            content: (
                <div className="space-y-4">
                    <p>By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorised purpose: and (7) your use of the Services will not violate any applicable law or regulation.</p>
                    <p>If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).</p>
                </div>
            )
        },
        {
            id: 'user-registration',
            title: '4. USER REGISTRATION',
            content: (
                <div className="space-y-4">
                    <p>You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>
                </div>
            )
        },
        {
            id: 'products',
            title: '5. PRODUCTS',
            content: (
                <div className="space-y-4">
                    <p>We make every effort to display as accurately as possible the colours, features, specifications, and details of the products available on the Services. However, we do not guarantee that the colours, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colours and details of the products. All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.</p>
                </div>
            )
        },
        {
            id: 'purchases',
            title: '6. PURCHASES AND PAYMENT',
            content: (
                <div className="space-y-4">
                    <p>We accept the following forms of payment:</p>
                    <ul className="list-disc list-inside pl-4">
                        <li>Visa</li>
                        <li>Mastercard</li>
                        <li>American Express Discover</li>
                        <li>PayPal</li>
                    </ul>
                    <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in Euros.</p>
                    <p>You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorise us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.</p>
                    <p>We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgement, appear to be placed by dealers, resellers, or distributors.</p>
                </div>
            )
        },
        {
            id: 'subscriptions',
            title: '7. SUBSCRIPTIONS',
            content: (
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Billing and Renewal</h4>
                    <p>Your subscription will continue and automatically renew unless cancelled. You consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you cancel the applicable order. The length of your billing cycle will depend on the type of subscription plan you choose when you subscribed to the Services.</p>

                    <h4 className="font-semibold text-gray-800 mt-4">Free Trial</h4>
                    <p>We offer a 30-day free trial to new users who register with the Services. The account will not be charged and the subscription will be suspended until upgraded to a paid version at the end of the free trial.</p>

                    <h4 className="font-semibold text-gray-800 mt-4">Cancellation</h4>
                    <p>You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services, please email us at info@hitoai.com.</p>

                    <h4 className="font-semibold text-gray-800 mt-4">Fee Changes</h4>
                    <p>We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.</p>
                </div>
            )
        },
        {
            id: 'refunds',
            title: '8. RETURN/REFUNDS POLICY',
            content: (
                <div className="space-y-4">
                    <p>All sales are final and no refund will be issued.</p>
                </div>
            )
        },
        {
            id: 'prohibited',
            title: '9. PROHIBITED ACTIVITIES',
            content: (
                <div className="space-y-4">
                    <p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavours except those that are specifically endorsed or approved by us.</p>
                    <p>As a user of the Services, you agree not to:</p>
                    <ul className="list-disc list-inside pl-4">
                        <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                        <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                        <li>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
                        <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                        <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                        <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                        <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                        <li>Engage in unauthorised framing of or linking to the Services.</li>
                        <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.</li>
                        <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                        <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                        <li>Attempt to impersonate another user or person or use the username of another user.</li>
                        <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ('gifs'), 1 x 1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as 'spyware' or 'passive collection mechanisms' or 'pcms').</li>
                        <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
                        <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
                        <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</li>
                        <li>Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                        <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
                        <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system including without limitation any spider robot, cheat utility scraper, or offline reader that accesses the Services, or use or launch any unauthorised script or other software.</li>
                        <li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
                        <li>Make any unauthorised use of the Services including collecting usernames and/or email addresses of users by electronic or other means. for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretences.</li>
                        <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue­generating endeavour or commercial enterprise.</li>
                        <li>Use the Services to advertise or offer to sell goods and services.</li>
                        <li>Sell or otherwise transfer your profile.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'user-contributions',
            title: '10. USER GENERATED CONTRIBUTIONS',
            content: (
                <div className="space-y-4">
                    <p>The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, 'Contributions'). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contribution, you thereby represent and warrant that:</p>
                    <ul className="list-disc list-inside pl-4">
                        <li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</li>
                        <li>You are the creator and owner of or have the necessary licences, rights, consents, releases, and permissions to use and to authorise us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
                        <li>You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
                        <li>Your Contributions are not false, inaccurate, or misleading.</li>
                        <li>Your Contributions are not unsolicited or unauthorised advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
                        <li>Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libellous, slanderous, or otherwise objectionable (as determined by us).</li>
                        <li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
                        <li>Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.</li>
                        <li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
                        <li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
                        <li>Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well­being of minors.</li>
                        <li>Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.</li>
                        <li>Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.</li>
                    </ul>
                    <p>Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.</p>
                </div>
            )
        },
        {
            id: 'contribution-licence',
            title: '11. CONTRIBUTION LICENCE',
            content: (
                <div className="space-y-4">
                    <p>By posting your Contributions to any part of the Services or making Contributions accessible to the Services by linking your account from the Services to any of your social networking accounts, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and licence to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorise sublicences of the foregoing.</p>
                    <p>This licence will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.</p>
                    <p>We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.</p>
                    <p>We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions: (2) to re-categorise any Contributions to place them in more appropriate locations on the Services; and (3) to pre­screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.</p>
                </div>
            )
        },
        {
            id: 'social-media',
            title: '12. SOCIAL MEDIA',
            content: (
                <div className="space-y-4">
                    <p>As part of the functionality of the Services, you may link your account with online accounts you have with third-party service providers (each such account, a 'Third-Party Account') by either: (1) providing your Third-Party Account login information through the Services: or (2) allowing us to access your Third-Party Account, as is permitted under the applicable terms and conditions that govern your use of each Third-Party Account.</p>
                    <p>You represent and warrant that you are entitled to disclose your Third-Party Account login information to us and/or grant us access to your Third-Party Account, without breach by you of any of the terms and conditions that govern your use of the applicable Third-Party Account, and without obligating us to pay any fees or making us subject to any usage limitations imposed by the third-party service provider of the Third-Party Account.</p>
                    <p>By granting us access to any Third-Party Accounts, you understand that (1) we may access, make available, and store (if applicable) any content that you have provided to and stored in your Third-Party Account (the 'Social Network Content') so that it is available on and through the Services via your account, including without limitation any friend lists and (2) we may submit to and receive from your Third-Party Account additional information to the extent you are notified when you link your account with the Third-Party Account.</p>
                    <p>Depending on the Third-Party Accounts you choose and subject to the privacy settings that you have set in such Third-Party Accounts, personally identifiable information that you post to your Third-Party Accounts may be available on and through your account on the Services. Please note that if a Third-Party Account or associated service becomes unavailable or our access to such Third-Party Account is terminated by the third-party service provider, then Social Network Content may no longer be available on and through the Services.</p>
                    <p>You will have the ability to disable the connection between your account on the Services and your Third-Party Accounts at any time. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS.</p>
                    <p>We make no effort to review any Social Network Content for any purpose, including but not limited to, for accuracy, legality, or non-infringement, and we are not responsible for any Social Network Content. You acknowledge and agree that we may access your email address book associated with a Third-Party Account and your contacts list stored on your mobile device or tablet computer solely for purposes of identifying and informing you of those contacts who have also registered to use the Services.</p>
                    <p>You can deactivate the connection between the Services and your Third-Party Account by contacting us using the contact information below or through your account settings (if applicable). We will attempt to delete any information stored on our servers that was obtained through such Third­Party Account, except the username and profile picture that become associated with your account.</p>
                </div>
            )
        },
        {
            id: 'third-party-websites',
            title: '13. THIRD-PARTY WEBSITES AND CONTENT',
            content: (
                <div className="space-y-4">
                    <p>The Services may contain (or you may be sent via the Site) links to other websites ('Third-Party Websites') as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ('Third-Party Content').</p>
                    <p>Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third­Party Content posted on, available through, or installed from the Services, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content.</p>
                    <p>Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Services and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer govern.</p>
                    <p>You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Services or relating to any applications you use or install from the Services. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party.</p>
                    <p>You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us blameless from any harm caused by your purchase of such products or services. Additionally, you shall hold us blameless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.</p>
                </div>
            )
        },
        {
            id: 'advertisers',
            title: '14. ADVERTISERS',
            content: (
                <div className="space-y-4">
                    <p>We allow advertisers to display their advertisements and other information in certain areas of the Services, such as sidebar advertisements or banner advertisements. We simply provide the space to place such advertisements, and we have no other relationship with advertisers.</p>
                </div>
            )
        },
        {
            id: 'services-management',
            title: '15. SERVICES MANAGEMENT',
            content: (
                <div className="space-y-4">
                    <p>We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</p>
                </div>)
        },
        {
            id: 'privacy-policy',
            title: '16. PRIVACY POLICY',
            content: (
                <div className="space-y-4">
                    <p>Given the nature of AI solutions, we prioritize data privacy. All data processed by our AI models complies with GDPR regulations applicable in the EU and UK. For further details, please review our comprehensive Privacy Policy.</p>
                    <p>We care about data privacy and security. By using the Services, you agree to be bound by our Privacy Policy posted on the Services, which is incorporated into these Legal Terms. Please be advised the Services are hosted in Ireland and UK. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in Ireland and UK, then through your continued use of the Services, you are transferring your data to Ireland and UK, and you expressly consent to have your data transferred to and processed in Ireland and UK.</p>
                </div>
            )
        },
        {
            id: 'term-termination',
            title: '17. TERM AND TERMINATION',
            content: (
                <div className="space-y-4">
                    <p>These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME WITHOUT WARNING, IN OUR SOLE DISCRETION.</p>
                    <p>If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.</p>
                </div>
            )
        },
        {
            id: 'modifications-interruptions',
            title: '18. MODIFICATIONS AND INTERRUPTIONS',
            content: (
                <div className="space-y-4">
                    <p>We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We also reserve the right to modify or discontinue all or part of the Services without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.</p>
                    <p>We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.</p>
                </div>
            )
        },
        {
            id: 'governing-law',
            title: '19. GOVERNING LAW',
            content: (
                <div className="space-y-4">
                    <p>These Legal Terms are governed by and interpreted following the laws of Ireland, and use of the United Nations Convention of Contracts for the International Sales of Goods is expressly excluded. If your habitual residence is in the EU, and you are a consumer, you additionally possess the protection provided to you by obligatory provisions of the law in your country to residence. HitoAI Limited and yourself both agree to submit to the non-exclusive jurisdiction of the courts of Dublin, which means that you may make a claim to defend your consumer protection rights in regards to these Legal Terms in Ireland, or in the EU country in which you reside.</p>
                </div>
            )
        },
        {
            id: 'dispute-resolution',
            title: '20. DISPUTE RESOLUTION',
            content: (
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Informal Negotiations</h4>
                    <p>To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a 'Dispute' and collectively, the 'Disputes') brought by either you or us (individually, a 'Party' and collectively, the 'Parties'), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.</p>

                    <h4 className="font-semibold text-gray-800 mt-4">Binding Arbitration</h4>
                    <p>Any dispute arising from the relationships between the Parties to these Legal Terms shall be determined by one arbitrator who will be chosen in accordance with the Arbitration and Internal Rules of the European Court of Arbitration being part of the European Centre of Arbitration having its seat in Strasbourg, and which are in force at the time the application for arbitration is filed, and of which adoption of this clause constitutes acceptance. The seat of arbitration shall be Dublin, Ireland. The language of the proceedings shall be English. Applicable rules of substantive law shall be the law of Ireland.</p>

                    <h4 className="font-semibold text-gray-800 mt-4">Restrictions</h4>
                    <p>The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.</p>

                    <h4 className="font-semibold text-gray-800 mt-4">Exceptions to Informal Negotiations and Arbitration</h4>
                    <p>The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations and binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.</p>
                </div>
            )
        },
        {
            id: 'corrections',
            title: '21. CORRECTIONS',
            content: (
                <div className="space-y-4">
                    <p>There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.</p>
                </div>
            )
        },
        {
            id: 'disclaimer',
            title: '22. DISCLAIMER',
            content: (
                <div className="space-y-4">
                    <p>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGEMENT AND EXERCISE CAUTION WHERE APPROPRIATE.</p>
                </div>
            )
        },
        {
            id: 'limitations-liability',
            title: '23. LIMITATIONS OF LIABILITY',
            content: (
                <div className="space-y-4">
                    <p>For AI-based services, HitoAI makes every effort to provide accurate and reliable outputs. However, results may vary depending on individual use cases. Users are encouraged to validate outputs with appropriate professional advice.</p>
                    <p>In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the services, even if we have been advised of the possibility of such damages. Notwithstanding anything to the contrary contained herein, our liability to you for any cause whatsoever and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to us during the six (6) month period prior to any cause of action arising. Certain US state laws and international laws do not allow limitations on implied warranties or the exclusion or limitation of certain damages. If these laws apply to you, some or all of the above disclaimers or limitations may not apply to you, and you may have additional rights.</p>
                </div>
            )
        },
        {
            id: 'indemnification',
            title: '24. INDEMNIFICATION',
            content: (
                <div className="space-y-4">
                    <p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorney's fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.</p>
                </div>
            )
        },
        {
            id: 'user-data',
            title: '25. USER DATA',
            content: (
                <div className="space-y-4">
                    <p>We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data.</p>
                </div>
            )
        },
        {
            id: 'electronic-communications',
            title: '26. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES',
            content: (
                <div className="space-y-4">
                    <p>Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.</p>
                </div>
            )
        },
        {
            id: 'california-users',
            title: '27. CALIFORNIA USERS AND RESIDENTS',
            content: (
                <div className="space-y-4">
                    <p>If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.</p>
                </div>
            )
        },
        {
            id: 'miscellaneous',
            title: '28. MISCELLANEOUS',
            content: (
                <div className="space-y-4">
                    <p>These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.</p>
                </div>
            )
        },
        {
            id: 'contact-us',
            title: '29. CONTACT US',
            content: (
                <div className="space-y-4">
                    <p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>
                    <p className="mt-2">
                        <strong>HitoAI Limited</strong><br />
                        Sandyford, Dublin 18<br />
                        Dublin, Dublin County<br />
                        Iceland<br />
                        info@hitoai.ai
                    </p>
                </div>
            )
        },
        {
            id: 'nda',
            title: 'NON-DISCLOSURE AGREEMENT (NDA)',
            content: (
                <div className="space-y-4">
                    <p>This Non-Disclosure Agreement ("Agreement") is entered into for the purpose of preventing unauthorized disclosure of confidential and proprietary information, as defined below. The parties agree to establish a confidential relationship concerning the disclosure of certain proprietary and confidential information ("Confidential Information").</p>

                    <ol className="list-decimal list-inside pl-4 space-y-2">
                        <li><strong>Definition of Confidential Information:</strong> For the purposes of this Agreement, "Confidential Information" includes all information or material that has or could have commercial value or other utility in the business operations of HitoAI Limited. If Confidential Information is in written form, the disclosing party shall label or stamp it as "Confidential." If transmitted orally, the disclosing party shall promptly provide a written confirmation designating the information as confidential.</li>
                        <li><strong>Exclusions from Confidential Information:</strong> Receiving Party's obligations under this Agreement do not apply to information that: (a) Is publicly available at the time of disclosure or becomes publicly available through no fault of the Receiving Party; (b) Was independently developed or discovered by the Receiving Party before disclosure; (c) Is lawfully obtained from a third party without breach of confidentiality; (d) Is disclosed with the prior written approval of the Disclosing Party.</li>
                        <li><strong>Obligations of the Receiving Party:</strong> The Receiving Party agrees to: (a) Maintain the Confidential Information in strict confidence for the sole benefit of the Disclosing Party; (b) Restrict access to Confidential Information to employees, contractors, and third parties who require it, ensuring they sign non-disclosure agreements as protective as this Agreement; (c) Not disclose, publish, copy, or use Confidential Information for any unauthorized purposes; (d) Return all Confidential Information upon request by the Disclosing Party.</li>
                        <li><strong>Duration of Confidentiality Obligations:</strong> The confidentiality obligations of the Receiving Party shall survive the termination of this Agreement until the Confidential Information no longer qualifies as a trade secret or until the Disclosing Party releases the Receiving Party from its obligations in writing.</li>
                        <li><strong>Relationship of the Parties:</strong> Nothing in this Agreement shall create a partnership, joint venture, or employment relationship between the parties.</li>
                        <li><strong>Severability:</strong> If any provision of this Agreement is found to be invalid or unenforceable, the remainder shall be interpreted to best reflect the intent of the parties.</li>
                        <li><strong>Integration Clause:</strong> This Agreement constitutes the complete understanding between the parties and supersedes all prior agreements. Amendments must be in writing and signed by both parties.</li>
                        <li><strong>Waiver:</strong> Failure to enforce any provision of this Agreement shall not constitute a waiver of rights under this Agreement.</li>
                        <li><strong>Intellectual Property Rights:</strong> The Receiving Party agrees not to use, exploit, or disclose any intellectual property related to HitoAI Limited or the SusNet project. All intellectual property developed or disclosed in relation to HitoAI, including but not limited to research findings, algorithms, models, and data, shall remain the sole property of HitoAI Limited. No independent use, transfer, or distribution of intellectual property is permitted without prior written consent.</li>
                        <li><strong>Non-Disclosure Obligation:</strong> The Receiving Party remains bound by the NDA indefinitely, even after their involvement in the project ends. Disclosure or utilization of any project-related information is strictly prohibited without prior written consent.</li>
                        <li><strong>Confidentiality and Use of Information Agreement:</strong> The Receiving Party agrees to maintain strict confidentiality regarding all proprietary and confidential information, including trade secrets, business strategies, and technical innovations. Unauthorized disclosure to third parties, including social media and public forums, is strictly prohibited. The Company reserves the right to use the Receiving Party's name, likeness, and contributions for marketing, funding, and promotional purposes.</li>
                        <li><strong>Intellectual Property Ownership:</strong> All intellectual property created by the Receiving Party during their engagement with HitoAI Limited remains the sole property of HitoAI. The Receiving Party agrees to disclose and assign ownership of such intellectual property to HitoAI and assist in securing legal protections.</li>
                        <li><strong>No Employment Relationship:</strong> This Agreement does not establish an employment relationship between the Receiving Party and HitoAI Limited.</li>
                        <li><strong>Governing Law:</strong> This Agreement shall be governed by the laws of the Republic of Ireland, without regard to conflict of law principles.</li>
                        <li><strong>Entire Agreement:</strong> This Agreement constitutes the entire understanding between the parties regarding confidentiality and intellectual property and applies to all projects, products, and services at HitoAI Limited.</li>
                    </ol>
                    <p>This Agreement is binding upon the representatives, assigns, and successors of both parties. Each party acknowledges their obligations by signing this Agreement.</p>
                </div>
            )
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-indigo-600 text-white p-6">
                            <h1 className="text-2xl md:text-3xl font-bold">Terms and Conditions</h1>
                            <p className="mt-2 text-indigo-100">Last updated November 29, 2024</p>
                            <div className="flex items-center mt-4 text-indigo-100">
                                <FileText className="w-5 h-5 mr-2" />
                                <span>Please read these terms carefully</span>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="p-6 border-b">
                            <p className="text-gray-700">
                                Welcome to HitoAI! These Terms and Conditions ("Terms") govern your access to and use of HitoAI Limited's services, including our website and AI-powered solutions such as Susnet, Selwel, and Secuell ("Services"). By accessing the Services, you agree to these Terms. If you do not agree, please discontinue use immediately.
                            </p>
                        </div>

                        {/* Table of Contents */}
                        <div className="p-6 border-b bg-gray-50">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">TABLE OF CONTENTS</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="text-indigo-600 hover:text-indigo-800 hover:underline"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const element = document.getElementById(section.id);
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth' });
                                                toggleSection(section.id);
                                            }
                                        }}
                                    >
                                        {section.title}
                                    </a>
                                ))}
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
                            <p className="text-sm text-gray-600">By using our Site and Services, you acknowledge that you have read and understand these Terms and Conditions.</p>
                            <p className="text-sm text-gray-600 mt-2">© 2024 HitoAI Limited. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditionsPage;