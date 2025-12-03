'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { videoApi, categoryApi, bannerApi } from '@/lib/api';
import VideoCard from '@/components/video-card';
import SearchBar from '@/components/search-bar';
import CategoryFilter from '@/components/category-filter';
import BannerCarousel from '@/components/banner-carousel';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await categoryApi.getAll();
      return response.data;
    },
  });

  // Fetch active banners
  const { data: banners = [] } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const response = await bannerApi.getAll(true);
      return response.data;
    },
  });

  // Fetch videos with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['videos', debouncedSearch, selectedCategories],
    queryFn: async ({ pageParam = undefined }: { pageParam: string | undefined }) => {
      const response = await videoApi.getAll({
        search: debouncedSearch || undefined,
        category_ids: selectedCategories.length > 0 ? selectedCategories.join(',') : undefined,
        cursor: pageParam,
        limit: 20,
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  });

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 500 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Category toggle handler
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Flatten all videos from pages
  const allVideos = data?.pages.flatMap((page: any) => page.videos) || [];

  return (
    <div className="bg-gradient-to-b from-[#fbedea] to-white">
      {/* Banner Carousel or Default Hero */}
      {banners.length > 0 ? (
        <BannerCarousel banners={banners} />
      ) : (
        <></>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t('home.searchPlaceholder')}
        />

        {/* Category Filter */}
        {categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
          />
        )}

        {/* Videos Grid - Mobile: 2 columns, Desktop: 4 columns */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-48 md:h-64 bg-muted rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">
              {t('home.loadError')}
            </p>
          </div>
        ) : allVideos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 overflow-x-auto">
              {allVideos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>

            {/* Loading indicator for infinite scroll */}
            {isFetchingNextPage && (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {/* End of list indicator */}
            {!hasNextPage && allVideos.length > 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {t('home.endOfList')}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📹</div>
              <p className="text-muted-foreground text-lg mb-2">
                {t('home.noVideosFound')}
              </p>
              <p className="text-muted-foreground text-sm">
                {searchQuery || selectedCategories.length > 0
                  ? t('home.tryAdjusting')
                  : t('home.checkBackLater')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
