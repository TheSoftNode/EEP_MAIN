"use client"

import CombinedBenefitsSection from '@/components/Landing/CombinedBenefitsSection';
import { CTASection } from '@/components/Landing/CTASection';
import DualAudienceSection from '@/components/Landing/DualAudienceSection';
import { FeaturesSection } from '@/components/Landing/FeaturesSection';
import { HeroSection } from '@/components/Landing/HeroSection';
import { HowItWorksSection } from '@/components/Landing/HowItWorksSection';
import MasterySection from '@/components/Landing/MasterySection';
import { PricingSectionNew } from '@/components/Landing/PricingSectionNew';
import { TestimonialsSection } from '@/components/Landing/TestimonialsSection';
import React from 'react';



export default function HomePage() {
    return (
        <>

            <main className='min-h-screen'>
                <HeroSection />
                <DualAudienceSection />
                <FeaturesSection />
                <HowItWorksSection />
                <MasterySection />
                <CombinedBenefitsSection />
                <TestimonialsSection />
                <PricingSectionNew />
                <CTASection />
            </main>

        </>
    );
}