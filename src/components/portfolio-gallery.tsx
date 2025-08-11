"use client"

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Card, CardContent } from './ui/card';

interface PortfolioItem {
  src: string;
  alt: string;
  hint: string;
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {items.map((item, index) => (
          <div key={index} className="break-inside-avoid" onClick={() => setSelectedImage(item)}>
            <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105">
              <CardContent className="p-0">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  data-ai-hint={item.hint}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 border-0">
          {selectedImage && (
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1600}
              height={1200}
              className="w-full h-auto object-contain rounded-lg"
              data-ai-hint={selectedImage.hint}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
