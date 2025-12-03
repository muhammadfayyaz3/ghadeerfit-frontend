'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { notificationApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface Notification {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export default function NotificationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language || 'en';
  const router = useRouter();
  const { data: notification, isLoading } = useQuery({
    queryKey: ['notification', params.id],
    queryFn: async () => {
      const response = await notificationApi.getById(Number(params.id));
      return response.data as Notification;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-64 bg-muted rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">{t('notifications.notFound')}</p>
            <Button className="mt-4" onClick={() => router.push(`/${locale}/notifications`)}>
              {t('common.goBack')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.push(`/${locale}/notifications`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('notifications.backToNotifications')}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{notification.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {new Date(notification.createdAt).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: notification.description }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
