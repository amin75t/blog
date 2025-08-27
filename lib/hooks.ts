import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from './axios';
import { usePostStore } from './store';

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
  return useQuery({
    queryKey: key,
    queryFn: async (): Promise<T> => {
      const response = await api.get(url);
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
    onError?: (error: any) => void;
  }
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: V): Promise<T> => {
      const response = await api.post(url, data);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: key });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};

// Specific hooks for posts
export const useGetPosts = () => {
  return useGet<any[]>(
    ['posts'],
    '/posts',
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

export const useGetPost = (id: number) => {
  return useGet<any>(
    ['post', id.toString()],
    `/posts/${id}`,
    {
      enabled: !!id,
    }
  );
};

export const useCreatePost = () => {
  const { addPost } = usePostStore();
  
  return usePost<any, any>(
    ['posts'],
    '/posts',
    {
      onSuccess: (data) => {
        addPost(data);
      },
    }
  );
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await api.put(`/posts/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate posts queries
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate posts queries
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};


