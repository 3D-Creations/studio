import Image from 'next/image';
import { CheckCircle, Syringe, Pill, Stethoscope, Gem, Cog, BadgeCheck, PackageCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SplinePlaceholder } from '@/components/spline-placeholder';

export const metadata = {
  title: 'Pharma Special',
  description: 'Discover our specialized gifting and printing solutions tailored for the pharmaceutical industry, designed for maximum impact and compliance.',
};

const advantages = [
    {
      icon: <Syringe className="h-8 w-8 text-primary" />,
      title: 'Brand Reinforcement',
      description: 'Customized gifts that keep your brand top-of-mind with healthcare professionals.',
    },
    {
      icon: <Pill className="h-8 w-8 text-primary" />,
      title: 'Educational Tools',
      description: 'Innovative visual aids and anatomical models that effectively communicate complex information.',
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
      title: 'Compliance Focused',
      description: 'We understand pharma marketing codes and create compliant, high-quality promotional materials.',
    },
  ];

const qualityCommitments = [
  {
    icon: <Gem className="h-8 w-8 text-primary" />,
    title: 'Material Excellence',
    description: 'We source only the highest-grade, non-toxic materials suitable for the healthcare environment.',
  },
  {
    icon: <Cog className="h-8 w-8 text-primary" />,
    title: 'Precision Manufacturing',
    description: 'Our state-of-the-art process ensures every detail is captured with accuracy and consistency.',
  },
  {
    icon: <BadgeCheck className="h-8 w-8 text-primary" />,
    title: 'Regulatory Adherence',
    description: 'We stay current with industry marketing codes to ensure our products are both beautiful and compliant.',
  },
   {
    icon: <PackageCheck className="h-8 w-8 text-primary" />,
    title: 'Secure Packaging',
    description: 'Every item is packaged securely to guarantee pristine condition upon arrival.',
  },
];


export default function PharmaSpecialPage() {
  return (
    <div className="relative overflow-hidden">
      <SplinePlaceholder />

      <section className="py-24 md:py-32 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-balance">
            Specialized Solutions for the Pharma Industry
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground text-balance">
            We combine deep industry knowledge with creative excellence to deliver promotional tools that resonate with healthcare professionals.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">The Pharma Advantage</h2>
            <p className="text-lg text-muted-foreground mt-2">Why leading pharmaceutical companies choose us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage) => (
              <Card key={advantage.title} className="text-center p-6 border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                 <div className="flex justify-center mb-4">{advantage.icon}</div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Commitment to Quality &amp; Compliance</h2>
            <p className="text-lg text-muted-foreground mt-2">Building trust through excellence in every step.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {qualityCommitments.map((commitment) => (
              <Card key={commitment.title} className="p-6 border-2 border-transparent hover:border-primary/50 transition-all duration-300 hover:shadow-lg bg-secondary/30">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-5">
                    {commitment.icon}
                </div>
                <CardHeader className="text-center p-0">
                  <CardTitle className="font-headline text-lg">{commitment.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-0 mt-2">
                  <p className="text-muted-foreground text-sm">{commitment.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
