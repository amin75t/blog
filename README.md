# Test Blog with Axios, React Query, and Zustand

This project demonstrates the integration of:
- **Axios** for HTTP requests
- **React Query (@tanstack/react-query)** for server state management
- **Zustand** for client state management

## Features

- ✅ Axios configuration with interceptors
- ✅ React Query setup with QueryClient
- ✅ Zustand store with persistence
- ✅ Custom hooks: `useGet` and `usePost`
- ✅ Sample Post management with CRUD operations
- ✅ TypeScript support

## Project Structure

```
lib/
├── axios.ts          # Axios configuration with interceptors
├── react-query.ts    # React Query client configuration
├── store.ts          # Zustand store for posts
└── hooks.ts          # Custom hooks (useGet, usePost, etc.)

app/
├── components/
│   └── PostList.tsx  # Sample component using all features
├── layout.tsx        # Root layout with React Query provider
└── page.tsx          # Main page
```

## Custom Hooks

### useGet
Generic hook for GET requests:
```typescript
const { data, isLoading, error } = useGet<Post[]>(
  ['posts'],
  '/posts',
  { staleTime: 5 * 60 * 1000 }
);
```

### usePost
Generic hook for POST requests:
```typescript
const createPost = usePost<Post, CreatePostData>(
  ['posts'],
  '/posts',
  {
    onSuccess: (data) => console.log('Post created:', data),
    onError: (error) => console.error('Error:', error)
  }
);
```

## Zustand Store

The store provides:
- Posts state management
- Loading and error states
- Persistence to localStorage
- Actions: `addPost`, `setPosts`, `setLoading`, `setError`, `clearPosts`

```typescript
const { posts, addPost, setPosts } = usePostStore();
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Configuration

The project uses JSONPlaceholder API by default. You can change the base URL by setting the `NEXT_PUBLIC_API_URL` environment variable.

## Features Demonstrated

- **Fetch Posts**: Load posts from API using `useGetPosts`
- **Create Post**: Add new posts using `useCreatePost`
- **Delete Post**: Remove posts using `useDeletePost`
- **State Persistence**: Posts are stored in Zustand with localStorage persistence
- **Error Handling**: Proper error handling and loading states
- **TypeScript**: Full TypeScript support with proper typing

## Development Tools

- React Query DevTools are included for debugging
- Zustand DevTools can be added for state debugging
- TypeScript for type safety
- Tailwind CSS for styling
