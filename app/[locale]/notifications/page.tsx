'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { notificationApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Home } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language || 'en';
  const router = useRouter();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await notificationApi.getAll();
      return response.data as Notification[];
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/${locale}`)}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">{t('notifications.title')}</h1>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : notifications && notifications.length > 0 ? (
        <div className="grid gap-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/${locale}/notifications/${notification.id}`)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{notification.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">
                  {notification.description.replace(/<[^>]*>/g, '')}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {t('notifications.noNotificationsYet')}
          </p>
        </div>
      )}
    </div>
  );
}
