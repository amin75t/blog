import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from './axios';
import { usePostStore } from './store';

// Define Post type
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// Generic GET hook
export const useGet = <T>(
  key: string[],
  url: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) => {
  return useQuery<T, Error>({
    queryKey: key,
    queryFn: async (): Promise<T> => {
      const response = await api.get<T>(url);
      return response.data;
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
    gcTime: options?.gcTime,
  });
};

// Generic POST hook
export const usePost = <T, V>(
  key: string[],
  url: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  }
) => {
  const queryClient = useQueryClient();

  return useMutation<T, Error, V>({
    mutationFn: async (data: V): Promise<T> => {
      const response = await api.post<T>(url, data);
      return response.data;
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: key });
      options?.onSuccess?.(data);
    },
    onError: error => {
      options?.onError?.(error);
    },
  });
};

// Specific hooks for posts
export const useGetPosts = () => {
  return useGet<Post[]>(['posts'], '/posts', {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetPost = (id: number) => {
  return useGet<Post>(['post', id.toString()], `/posts/${id}`, {
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const { addPost } = usePostStore();

  return usePost<Post, Omit<Post, 'id'>>(['posts'], '/posts', {
    onSuccess: data => {
      addPost(data);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, { id: number; data: Partial<Post> }>({
    mutationFn: async ({ id, data }) => {
      const response = await api.put<Post>(`/posts/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const response = await api.delete<void>(`/posts/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
