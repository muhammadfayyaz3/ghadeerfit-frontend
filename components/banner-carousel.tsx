'use client';

import React, { useState, useEffect } from 'react';
import { BannerImage } from '@/lib/api';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerCarouselProps {
  banners: BannerImage[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  // Auto-advance carousel
  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handleBannerClick = (banner: BannerImage) => {
    if (banner.link_url) {
      window.open(banner.link_url, '_blank');
    }
  };

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative w-full h-48 md:h-64 lg:h-80 bg-gradient-to-r from-sky-400 to-blue-500 overflow-hidden">
      {/* Banner Image */}
      <div 
        className={`relative w-full h-full ${currentBanner.link_url ? 'cursor-pointer' : ''}`}
        onClick={() => handleBannerClick(currentBanner)}
      >
        <Image
          src={currentBanner.image_url}
          alt={currentBanner.title || 'Banner'}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          unoptimized
        />
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 text-center p-4 md:p-6">
          <h2 className="text-white text-xl md:text-3xl font-bold drop-shadow-lg">
            {currentBanner.title}
          </h2>
        </div>
      </div>
    </div>
  );
}

