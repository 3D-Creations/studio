
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
      { name: 'Custom Posters', image: 'https://images.unsplash.com/photo-1557759677-209e5b9103c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxsZW50aWN1bGFyJTIwcG9zdGVyfGVufDB8fHx8MTc1NDkxNjUwOXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'lenticular poster' },
      { name: 'Business Cards', image: 'https://placehold.co/400x300.png', hint: 'business cards' },
      { name: 'Product Labels', image: 'https://images.unsplash.com/photo-1668090728011-dc9ffc555825?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwcm9kdWN0JTIwbGFiZWx8ZW58MHx8fHwxNzU0OTE4NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'product label' },
      { name: 'Large Format Displays', image: 'https://images.unsplash.com/photo-1627669077883-069f41a01501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxsYXJnZSUyMGRpc3BsYXl8ZW58MHx8fHwxNzU0OTE4NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'large display' },
      { name: '3D Bookmarks', image: 'https://placehold.co/400x300.png', hint: 'bookmark' },
      { name: 'Greeting Cards', image: 'https://images.unsplash.com/photo-1633008965536-4f0766340980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxncmVldGluZyUyMGNhcmR8ZW58MHx8fHwxNzU0OTE4NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'greeting card' },
      { name: 'Stickers & Decals', image: 'https://images.unsplash.com/photo-1527239441953-caffd968d952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzdGlja2VyJTIwc2hlZXR8ZW58MHx8fHwxNzU0OTE4NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'sticker sheet' },
      { name: 'Magazine Inserts', image: 'https://images.unsplash.com/photo-1553447977-6aee6ba02167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtYWdhemluZSUyMHBhZ2V8ZW58MHx8fHwxNzU0OTE4NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'magazine page' },
      { name: 'Retail Signage', image: 'https://images.unsplash.com/photo-1605136523077-8b6e1920ba5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxyZXRhaWwlMjBzaWdufGVufDB8fHx8MTc1NDkxODcxMnww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'retail sign' },
      { name: 'Event Passes', image: 'https://images.unsplash.com/photo-1579279263245-bbf82b50092f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxWSVAlMjBwYXNzfGVufDB8fHx8MTc1NDkxODcxMnww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'VIP pass' },
    ],
  },
  {
    id: 'pharma-corporate-gifts',
    name: 'Pharma & Corporate Gifts',
    description: 'High-impact, memorable gifts designed to strengthen your brand presence in the pharmaceutical and corporate sectors.',
    products: [
      { name: '3D Paperweights', image: 'https://images.unsplash.com/photo-1593259213062-57b0ce5906cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjcnlzdGFsJTIwcGFwZXJ3ZWlnaHR8ZW58MHx8fHwxNzU0OTE4NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'crystal paperweight' },
      { name: 'Anatomical Models', image: 'https://images.unsplash.com/photo-1729339983325-cc7fb91a9aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxhbmF0b21pY2FsJTIwbW9kZWx8ZW58MHx8fHwxNzU0OTE4NzcxfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'anatomical model' },
      { name: 'Custom Pen Stands', image: 'https://images.unsplash.com/photo-1639917290489-4a4eb2a6aa3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxkZXNrJTIwb3JnYW5pemVyfGVufDB8fHx8MTc1NDkxODc3MHww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'desk organizer' },
      { name: 'Executive Gift Sets', image: 'https://images.unsplash.com/photo-1729530140636-a137e341a895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxsdXh1cnklMjBnaWZ0fGVufDB8fHx8MTc1NDkxODc3Mnww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'luxury gift' },
      { name: 'Molecule Models', image: 'https://images.unsplash.com/photo-1707863080685-177f4f6e850d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb2xlY3VsZSUyMG1vZGVsfGVufDB8fHx8MTc1NDkxODc3MXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'molecule model' },
      { name: 'Branded Mugs', image: 'https://images.unsplash.com/photo-1520031473529-2c06dea61853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb2ZmZWUlMjBtdWd8ZW58MHx8fHwxNzU0OTE4NzcxfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'coffee mug' },
      { name: 'Tech Gadgets', image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0ZWNoJTIwZ2FkZ2V0fGVufDB8fHx8MTc1NDkxODc3MXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'tech gadget' },
      { name: 'Tote Bags', image: 'https://images.unsplash.com/photo-1721111260675-b0cf573ef81e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y2FudmFzJTIwdG90ZXxlbnwwfHx8fDE3NTQ5MTg3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'canvas tote' },
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
