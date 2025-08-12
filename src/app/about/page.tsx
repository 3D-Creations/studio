import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SplinePlaceholder } from '@/components/spline-placeholder';

export const metadata = {
  title: 'About Us',
  description: 'Learn about the history, vision, and expert team behind 3D Creations Private Limited.',
};

const teamMembers = [
  {
    name: 'Aarav Sharma',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1724414768978-21ee5420b925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtYWxlJTIwcHJvZmVzc2lvbmFsfGVufDB8fHx8MTc1NDk4MjgwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'male professional'
  },
  {
    name: 'Priya Singh',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1753164597332-cb53627871e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxmZW1hbGUlMjBkZXNpZ25lcnxlbnwwfHx8fDE3NTQ5ODI4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'female designer'
  },
  {
    name: 'Rohan Mehta',
    role: 'Production Lead',
    image: 'https://images.unsplash.com/photo-1581093809942-95dd1e9af628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZW5naW5lZXJ8ZW58MHx8fHwxNzU0OTgyODA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'male engineer'
  },
  {
    name: 'Anika Gupta',
    role: 'Pharma Accounts Manager',
    image: 'https://images.unsplash.com/photo-1642257834579-eee89ff3e9fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxmZW1hbGUlMjBtYW5hZ2VyfGVufDB8fHx8MTc1NDk4MjgwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'female manager'
  },
];

const values = [
  'Uncompromising Quality',
  'Client-Centric Approach',
  'Continuous Innovation',
  'Integrity and Transparency',
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <SplinePlaceholder />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-balance">
            Pioneering the Future of Print & Promotion
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground text-balance">
            We are a team of creators, innovators, and problem-solvers dedicated to transforming your brand's vision into tangible, dimensional reality.
          </p>
        </div>
      </section>

      {/* Company Story & Mission */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2010, 3D Creations Private Limited started with a simple yet ambitious goal: to bring the magic of 3D lenticular printing to the Indian market. Over the years, we've evolved, expanding our expertise into customized gifting solutions with a sharp focus on the unique needs of the pharmaceutical industry.
            </p>
            <p className="text-muted-foreground">
              Our journey has been one of constant learning and innovation, allowing us to become a trusted partner for leading brands across the country.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Vision & Mission</h2>
            <p className="text-muted-foreground">
              Our vision is to be the undisputed leader in dimensional branding solutions. Our mission is to empower businesses with visually stunning and highly effective marketing tools that captivate audiences and deliver measurable results. We strive to push the boundaries of creativity and technology in every project we undertake.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-10">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="font-semibold text-left">{value}</span>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Meet Our Experts</h2>
            <p className="text-lg text-muted-foreground mt-2">The creative minds behind our success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-0">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover"
                    data-ai-hint={member.hint}
                  />
                </CardContent>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary">{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
