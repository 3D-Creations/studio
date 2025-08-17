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
  { src: 'https://placehold.co/800x600.png', alt: 'Custom Keychain', hint: 'custom keychain' },
  { src: 'https://placehold.co/600x800.png', alt: 'Lenticular Business Card', hint: 'business card' },
  { src: 'https://placehold.co/800x600.png', alt: 'Pharma Visual Aid', hint: 'visual aid' },
  { src: 'https://placehold.co/600x800.png', alt: 'Branded Mug', hint: 'branded mug' },
  { src: 'https://placehold.co/600x800.png', alt: 'Custom Pen Stand', hint: 'pen stand' },
  { src: 'https://placehold.co/800x600.png', alt: '3D Poster', hint: '3d poster' },
  { src: 'https://placehold.co/600x800.png', alt: 'Product Label', hint: 'product label' },
  { src: 'https://placehold.co/800x600.png', alt: 'Conference Kit', hint: 'conference kit' },
  { src: 'https://placehold.co/600x800.png', alt: 'Anatomical Model', hint: 'anatomical model' },
  { src: 'https://placehold.co/800x600.png', alt: 'Welcome Kit', hint: 'welcome kit' },
  { src: 'https://placehold.co/600x800.png', alt: 'Large Format Display', hint: 'large display' },
  { src: 'https://placehold.co/800x600.png', alt: 'Greeting Card', hint: 'greeting card' },
  { src: 'https://placehold.co/800x600.png', alt: 'Custom Diary', hint: 'custom diary' },
  { src: 'https://placehold.co/600x800.png', alt: '3D Sticker', hint: '3d sticker' },
  { src: 'https://placehold.co/800x600.png', alt: 'Executive Gift Set', hint: 'gift set' },
  { src: 'https://placehold.co/600x800.png', alt: 'Memo Pad', hint: 'memo pad' },
  { src: 'https://placehold.co/800x600.png', alt: 'Branded Folder', hint: 'branded folder' },
  { src: 'https://placehold.co/600x800.png', alt: 'Desk Calendar', hint: 'desk calendar' },
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
