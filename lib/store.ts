import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostStore {
  posts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (post: Post) => void;
  setPosts: (posts: Post[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearPosts: () => void;
}

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],
      loading: false,
      error: null,
      
      addPost: (post) => {
        set((state) => ({
          posts: [post, ...state.posts],
        }));
      },
      
      setPosts: (posts) => {
        set({ posts });
      },
      
      setLoading: (loading) => {
        set({ loading });
      },
      
      setError: (error) => {
        set({ error });
      },
      
      clearPosts: () => {
        set({ posts: [], error: null });
      },
    }),
    {
      name: 'post-storage', // unique name for localStorage key
      partialize: (state) => ({ posts: state.posts }), // only persist posts
    }
  )
);
