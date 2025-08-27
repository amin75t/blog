import { cookies } from 'next/headers';

// Server-side API functions that can access cookies
export async function getServerPosts({ page = 1, limit = 10 }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com'}/posts?_page=${page}&_limit=${limit}`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  const posts = await response.json();
  const total = parseInt(response.headers.get('X-Total-Count') || posts.length.toString());
  
  return { posts, total };
}


export async function getServerPost(id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com'}/posts/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  
  return response.json();
}

export async function getServerUsers() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com'}/users`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
}

// Helper function to get server-side cookie
export async function getServerCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}
