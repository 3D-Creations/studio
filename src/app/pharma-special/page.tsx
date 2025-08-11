import Image from 'next/image';
import { CheckCircle, Syringe, Pill, Stethoscope } from 'lucide-react';
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

const caseStudies = [
  {
    title: 'New Drug Launch Campaign',
    client: 'CardioLife Pharmaceuticals',
    challenge: 'To create a memorable launch kit for a new cardiovascular drug that would engage busy cardiologists.',
    solution: 'We designed a 3D lenticular visual aid demonstrating the drug\'s mechanism of action, paired with a high-quality, branded desk set. The kit was both educational and practical.',
    result: 'The campaign saw a 40% increase in doctor engagement compared to previous launches and received overwhelmingly positive feedback.',
    image: 'https://placehold.co/500x350.png',
    hint: 'medical presentation',
  },
  {
    title: 'National Doctors\' Day Gifting',
    client: 'NeuroCare Inc.',
    challenge: 'To appreciate their network of neurologists with a unique gift that was both premium and relevant.',
    solution: 'A custom-designed 3D paperweight showing the human brain, along with a personalized leather-bound notebook and a premium pen.',
    result: 'The gift was highly appreciated, strengthening relationships and reinforcing NeuroCare\'s commitment to the medical community.',
    image: 'https://placehold.co/500x350.png',
    hint: 'corporate gift set',
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
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Case Studies</h2>
            <p className="text-lg text-muted-foreground mt-2">Real-world examples of our impact.</p>
          </div>
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
                <div className={`md:order-${index % 2 === 0 ? '1' : '2'}`}>
                  <Image
                    src={study.image}
                    alt={study.title}
                    width={500}
                    height={350}
                    className="rounded-lg shadow-lg w-full h-auto"
                    data-ai-hint={study.hint}
                  />
                </div>
                <div className={`space-y-4 md:order-${index % 2 === 0 ? '2' : '1'}`}>
                  <h3 className="text-2xl font-bold font-headline text-primary">{study.client}</h3>
                  <h4 className="text-xl font-semibold font-headline">{study.title}</h4>
                  <p><strong className="text-foreground">Challenge:</strong> <span className="text-muted-foreground">{study.challenge}</span></p>
                  <p><strong className="text-foreground">Solution:</strong> <span className="text-muted-foreground">{study.solution}</span></p>
                  <p className="border-l-4 border-accent pl-4 italic"><strong className="text-foreground">Result:</strong> <span className="text-muted-foreground">{study.result}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
