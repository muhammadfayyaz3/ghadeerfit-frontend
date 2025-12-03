import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    videos: number;
  };
}

export interface Video {
  id: number;
  title: string;
  video_link: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  categories?: {
    id: number;
    videoId: number;
    categoryId: string;
    category: Category;
  }[];
}

export interface BannerImage {
  id: number;
  title: string;
  image_url: string;
  link_url?: string;
  is_active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface VideosResponse {
  videos: Video[];
  nextCursor: string | null;
  hasMore: boolean;
}

// Video API
export const videoApi = {
  getAll: (params?: {
    search?: string;
    category_ids?: string;
    cursor?: string;
    limit?: number;
  }) => api.get<VideosResponse>('/videos', { params }),
  getById: (id: number) => api.get<Video>(`/videos/${id}`),
  create: (formData: FormData) => {
    return axios.post(`${API_URL}/videos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  update: (id: number, formData: FormData) => {
    return axios.put(`${API_URL}/videos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (id: number) => api.delete(`/videos/${id}`),
};

// Category API
export const categoryApi = {
  getAll: () => api.get<Category[]>('/categories'),
  getById: (id: string) => api.get<Category>(`/categories/${id}`),
  create: (data: { name: string; description?: string }) => api.post<Category>('/categories', data),
  update: (id: string, data: { name: string; description?: string }) => api.put<Category>(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

// Banner API
export const bannerApi = {
  getAll: (activeOnly?: boolean) => api.get<BannerImage[]>('/banners', { params: { active_only: activeOnly } }),
  getById: (id: number) => api.get<BannerImage>(`/banners/${id}`),
};

// Notification API
export const notificationApi = {
  getAll: () => api.get('/notifications'),
  getById: (id: number) => api.get(`/notifications/${id}`),
  create: (data: { title: string; description: string }) => api.post('/notifications', data),
  update: (id: number, data: { title: string; description: string }) => api.put(`/notifications/${id}`, data),
  delete: (id: number) => api.delete(`/notifications/${id}`),
};

