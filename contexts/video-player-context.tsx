'use client';

import React, { createContext, useContext, useRef, useCallback, useEffect, useState } from 'react';

interface VideoPlayerContextType {
  registerPlayer: (id: number, player: any) => void;
  unregisterPlayer: (id: number) => void;
  pauseAllExcept: (currentId: number) => void;
  isYouTubeReady: boolean;
}

const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(undefined);

// Extend Window interface to include YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
    youtubeAPIReady?: boolean;
  }
}

export function VideoPlayerProvider({ children }: { children: React.ReactNode }) {
  const playersRef = useRef<Map<number, any>>(new Map());
  const [isYouTubeReady, setIsYouTubeReady] = useState(false);

  useEffect(() => {
    // Check if YouTube API is already loaded
    if (window.YT && window.YT.Player) {
      setIsYouTubeReady(true);
      window.youtubeAPIReady = true;
      return;
    }

    // Check if script is already loading
    if (window.youtubeAPIReady) {
      return;
    }

    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    
    // Set up callback for when API is ready
    window.onYouTubeIframeAPIReady = () => {
      setIsYouTubeReady(true);
      window.youtubeAPIReady = true;
    };

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  const registerPlayer = useCallback((id: number, player: any) => {
    console.log('Registering player:', id);
    playersRef.current.set(id, player);
  }, []);

  const unregisterPlayer = useCallback((id: number) => {
    console.log('Unregistering player:', id);
    playersRef.current.delete(id);
  }, []);

  const pauseAllExcept = useCallback((currentId: number) => {
    console.log('Pausing all except:', currentId, 'Total players:', playersRef.current.size);
    playersRef.current.forEach((player, id) => {
      if (id !== currentId && player && typeof player.pauseVideo === 'function') {
        try {
          console.log('Pausing video:', id);
          player.pauseVideo();
        } catch (error) {
          console.error('Error pausing video:', id, error);
        }
      }
    });
  }, []);

  return (
    <VideoPlayerContext.Provider value={{ registerPlayer, unregisterPlayer, pauseAllExcept, isYouTubeReady }}>
      {children}
    </VideoPlayerContext.Provider>
  );
}

export function useVideoPlayer() {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('useVideoPlayer must be used within VideoPlayerProvider');
  }
  return context;
}
