'use client';

import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getYouTubeVideoId } from '@/lib/utils';
import { useVideoPlayer } from '@/contexts/video-player-context';
import { Video } from '@/lib/api';
import { useTranslation } from 'react-i18next';

interface VideoCardProps extends Video {}

export default function VideoCard({ 
  id, 
  title, 
  video_link, 
  categories = [] 
}: VideoCardProps) {
  const { t } = useTranslation();
  const videoId = getYouTubeVideoId(video_link);
  const playerRef = useRef<any>(null);
  const containerId = `youtube-player-${id}`;
  const { registerPlayer, unregisterPlayer, pauseAllExcept, isYouTubeReady } = useVideoPlayer();
  const [isPlayerLoading, setIsPlayerLoading] = useState(true);

  // Generate a random color for the border
  const borderColor = useMemo(() => {
    const colors = [
      '#F56247',
      '#534444',
      '#f84e2e',
      '#313131',
      '#707174',
      '#f65b14',
      '#de7962',
      '#AD3928',
      '#e19181',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  useEffect(() => {
    if (!videoId || !isYouTubeReady || !window.YT || !window.YT.Player) {
      return;
    }

    // Reset loading state when initializing a new player
    setIsPlayerLoading(true);

    // Initialize player
    try {
      playerRef.current = new window.YT.Player(containerId, {
        videoId: videoId,
        playerVars: {
          enablejsapi: 1,
          origin: window.location.origin,
          controls: 1,        // Always show controls
          modestbranding: 1,  // Minimal YouTube branding
          fs: 1,              // Enable fullscreen button
          rel: 0,             // Don't show related videos from other channels
        },
        events: {
          onReady: (event: any) => {
            console.log('Player ready:', id);
            registerPlayer(id, event.target);
            setIsPlayerLoading(false);
          },
          onStateChange: (event: any) => {
            if (event.data === 1) {
              console.log('Video started playing:', id);
              pauseAllExcept(id);
            }
          },
        },
      });
    } catch (error) {
      console.error('Error creating YouTube player:', error);
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Error destroying player:', error);
        }
      }
      unregisterPlayer(id);
    };
  }, [videoId, id, containerId, isYouTubeReady, registerPlayer, unregisterPlayer, pauseAllExcept]);

  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-300 shadow-lg min-w-[280px]"
      // style={{ borderColor: borderColor, borderRadius: '1rem', borderWidth: '4px' }}
    >
      <CardHeader className="p-0 overflow-hidden rounded-t-lg">
        {videoId ? (
          <div className="relative w-full aspect-video min-w-[200px]">
            {/* Skeleton loader */}
            {isPlayerLoading && (
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-300 to-gray-100 animate-pulse">
              </div>
            )}
            {/* YouTube Player */}
            <div id={containerId} className="w-full h-full min-h-[150px]" />
          </div>
        ) : (
          <div className="w-full aspect-video bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">{t('video.invalidUrl')}</p>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-2">
        <CardTitle 
          className="text-sm line-clamp-2 mb-1 font-weight-700 text-gray-500"
          style={{fontWeight:500}}
        >
          {title}
        </CardTitle>
      </CardContent>
    </Card>
  );
}
