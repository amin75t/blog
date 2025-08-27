import api from './axios';
import {
  getServerPosts,
  getServerPost,
  getServerUsers,
  getServerComments,
} from './server-api';

// Server-side data fetching functions (with cookie support)
export const getPosts = async ({ page = 1, limit = 10 }) => {
  return getServerPosts({ page, limit });
};

export const getPost = async (id: number) => {
  return getServerPost(id);
};
export const getCommants = async (id: number) => {
  return getServerComments(id);
};

export const getUsers = async () => {
  return getServerUsers();
};
