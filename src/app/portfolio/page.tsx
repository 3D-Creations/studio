import { PortfolioGallery } from '@/components/portfolio-gallery';
import { SplinePlaceholder } from '@/components/spline-placeholder';

export const metadata = {
  title: 'Portfolio',
  description: 'Browse our gallery of high-resolution images and videos showcasing our past work in lenticular printing and custom gifting.',
};

const portfolioItems = [
  { src: 'https://placehold.co/600x800.png', alt: '3D Lenticular Art', hint: 'lenticular poster' },
  { src: 'https://placehold.co/800x600.png', alt: 'Corporate Gift Set', hint: 'corporate gift' },
  { src: 'https://placehold.co/600x800.png', alt: 'Custom Pharma Model', hint: 'medical diagram' },
  { src: 'https://placehold.co/800x600.png', alt: 'Branded Diary Collection', hint: 'custom stationery' },
  { src: 'https://placehold.co/800x600.png', alt: 'Promotional Coasters', hint: 'promotional item' },
  { src: 'https://placehold.co/600x800.png', alt: 'Event Backdrop', hint: 'event display' },
  { src: 'https://placehold.co/600x800.png', alt: 'Retail Packaging', hint: 'product packaging' },
  { src: 'https://placehold.co/800x600.png', alt: 'Executive Desk Items', hint: 'desk accessory' },
];

export default function PortfolioPage() {
  return (
    <div className="relative overflow-hidden">
      <SplinePlaceholder />
      <section className="py-24 md:py-32 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-balance">
            Our Gallery of Excellence
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground text-balance">
            Explore a curated selection of our finest projects, showcasing our commitment to quality, creativity, and innovation.
          </p>
        </div>
      </section>

      <section className="container pb-16 md:pb-24">
        <PortfolioGallery items={portfolioItems} />
      </section>
    </div>
  );
}
