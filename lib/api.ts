import api from './axios';
import { getServerPosts, getServerPost, getServerUsers } from './server-api';

// Server-side data fetching functions (with cookie support)
export const getPosts = async ({ page = 1, limit = 10 }) => {
  return getServerPosts({ page, limit });
};

export const getPost = async (id: number) => {
  return getServerPost(id);
};

export const getUsers = async () => {
  return getServerUsers();
};

// Client-side functions (for use in components)
export const getClientPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const getClientPost = async (id: number) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const getClientUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// You can also create server-only functions that don't use axios
export const getServerData = async () => {
  // This could be a database query, file system read, etc.
  return {
    message: 'This data was fetched on the server',
    timestamp: new Date().toISOString(),
  };
};
