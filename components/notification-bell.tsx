'use client';

import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { notificationApi } from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface Notification {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export default function NotificationBell() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language || 'en';
  const router = useRouter();
  const [lastSeenCount, setLastSeenCount] = useState<number>(0);
  const [hasNewNotifications, setHasNewNotifications] = useState<boolean>(false);
  
  // Fetch notifications with auto-refresh every 30 seconds
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await notificationApi.getAll();
      return response.data as Notification[];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: true, // Continue refetching even when tab is not focused
  });

  const recentNotifications = notifications?.slice(0, 5) || [];

  // Check for new notifications
  useEffect(() => {
    if (notifications && notifications.length > 0) {
      // If we have more notifications than last time we checked, show the indicator
      if (lastSeenCount > 0 && notifications.length > lastSeenCount) {
        setHasNewNotifications(true);
      }
      // Initialize lastSeenCount on first load
      if (lastSeenCount === 0) {
        setLastSeenCount(notifications.length);
      }
    }
  }, [notifications, lastSeenCount]);

  // Handle when user opens the notification dropdown
  const handleOpenChange = (open: boolean) => {
    if (open && notifications) {
      // Mark notifications as seen
      setHasNewNotifications(false);
      setLastSeenCount(notifications.length);
    }
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-7 w-7" />
          {recentNotifications.length > 0 && hasNewNotifications && (
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>{t('notifications.title')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoading ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            {t('common.loading')}
          </div>
        ) : recentNotifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            {t('notifications.noNotifications')}
          </div>
        ) : (
          recentNotifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="cursor-pointer"
              onClick={() => router.push(`/${locale}/notifications/${notification.id}`)}
            >
              <div className="flex flex-col gap-1">
                <p className="font-medium text-sm line-clamp-2">
                  {notification.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </p>
              </div>
            </DropdownMenuItem>
          ))
        )}
        {recentNotifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-center justify-center"
              onClick={() => router.push(`/${locale}/notifications`)}
            >
              {t('notifications.viewAll')}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
