export interface Product {
  name: string;
  image: string;
  hint: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

export const productCategories: ProductCategory[] = [
  {
    id: 'lenticular-prints',
    name: '3D Lenticular Prints',
    description: 'Captivating prints with unparalleled depth and motion effects. Perfect for posters, packaging, and promotional materials.',
    products: [
      { name: 'Custom Posters', image: 'https://placehold.co/400x300.png', hint: 'lenticular poster' },
      { name: 'Business Cards', image: 'https://placehold.co/400x300.png', hint: 'business cards' },
      { name: 'Product Labels', image: 'https://placehold.co/400x300.png', hint: 'product label' },
      { name: 'Large Format Displays', image: 'https://placehold.co/400x300.png', hint: 'large display' },
      { name: '3D Bookmarks', image: 'https://placehold.co/400x300.png', hint: 'bookmark' },
      { name: 'Greeting Cards', image: 'https://placehold.co/400x300.png', hint: 'greeting card' },
      { name: 'Stickers & Decals', image: 'https://placehold.co/400x300.png', hint: 'sticker sheet' },
      { name: 'Magazine Inserts', image: 'https://placehold.co/400x300.png', hint: 'magazine page' },
      { name: 'Retail Signage', image: 'https://placehold.co/400x300.png', hint: 'retail sign' },
      { name: 'Event Passes', image: 'https://placehold.co/400x300.png', hint: 'VIP pass' },
    ],
  },
  {
    id: 'pharma-corporate-gifts',
    name: 'Pharma & Corporate Gifts',
    description: 'High-impact, memorable gifts designed to strengthen your brand presence in the pharmaceutical and corporate sectors.',
    products: [
      { name: '3D Paperweights', image: 'https://placehold.co/400x300.png', hint: 'crystal paperweight' },
      { name: 'Anatomical Models', image: 'https://placehold.co/400x300.png', hint: 'anatomical model' },
      { name: 'Custom Pen Stands', image: 'https://placehold.co/400x300.png', hint: 'desk organizer' },
      { name: 'Executive Gift Sets', image: 'https://placehold.co/400x300.png', hint: 'luxury gift' },
      { name: 'Molecule Models', image: 'https://placehold.co/400x300.png', hint: 'molecule model' },
      { name: 'Branded Mugs', image: 'https://placehold.co/400x300.png', hint: 'coffee mug' },
      { name: 'Tech Gadgets', image: 'https://placehold.co/400x300.png', hint: 'tech gadget' },
      { name: 'Tote Bags', image: 'https://placehold.co/400x300.png', hint: 'canvas tote' },
    ],
  },
  {
    id: 'custom-stationery',
    name: 'Customized Stationery',
    description: 'Elevate your brand with our premium range of fully customizable stationery items.',
    products: [
      { name: 'Diaries & Notebooks', image: 'https://placehold.co/400x300.png', hint: 'leather notebook' },
      { name: 'Chit Pads & Memo Blocks', image: 'https://placehold.co/400x300.png', hint: 'memo pads' },
      { name: 'Letterheads & Envelopes', image: 'https://placehold.co/400x300.png', hint: 'stationery set' },
      { name: 'Presentation Folders', image: 'https://placehold.co/400x300.png', hint: 'document folder' },
      { name: 'Planners', image: 'https://placehold.co/400x300.png', hint: 'daily planner' },
      { name: 'Calendars', image: 'https://placehold.co/400x300.png', hint: 'desk calendar' },
      { name: 'Luxury Pens', image: 'https://placehold.co/400x300.png', hint: 'fountain pen' },
      { name: 'Portfolios', image: 'https://placehold.co/400x300.png', hint: 'leather portfolio' },
    ],
  },
];
