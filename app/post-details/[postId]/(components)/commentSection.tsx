'use client';
import { useState } from 'react';
import { useDeletePost, usePost, useGet } from '@/lib/hooks';
import { Comment } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const getInitials = (email: string) => {
  const name = email.split('@')[0];
  return name.charAt(0).toUpperCase() + (name.charAt(1) || '').toUpperCase();
};

const formatDate = () => {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const CommentsUI = ({ postId }: { postId: number }) => {
  const { data: comments = [], isLoading } = useGet<Comment[]>(
    ['comments', postId.toString()],
    `/comments?postId=${postId}`
  );

  const { mutate: addComment, isPending } = usePost<
    Comment,
    Omit<Comment, 'id'>
  >(['comments', postId.toString()], '/comments');

  const { mutate: deleteComment } = useDeletePost();

  const [likedComments, setLikedComments] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    name: string;
    email: string;
    body: string;
  }>({
    defaultValues: { name: '', email: '', body: '' },
  });

  const toggleLike = (id: number) => {
    setLikedComments(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const onSubmit = (data: { name: string; email: string; body: string }) => {
    addComment({ ...data, postId });
    reset();
  };

  if (isLoading)
    return <p className="p-4 text-foreground">Loading comments...</p>;

  return (
    <div className="bg-background">
      <div className=" mx-auto py-6">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-3">
          <div>
            <Input
              placeholder="Name"
              {...register('name', { required: 'Name is required' })}
              className="border-border"
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className="border-border"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Textarea
              placeholder="Comment"
              {...register('body', { required: 'Comment is required' })}
              className="border-border"
            />
            {errors.body && (
              <p className="text-sm text-destructive mt-1">
                {errors.body.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Posting...' : 'Add Comment'}
          </Button>
        </form>

        <ul className="space-y-4">
          {comments.map(comment => (
            <li key={comment.id} className="border-b border-border pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-foreground text-sm font-medium">
                    {getInitials(comment.email)}
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-foreground">
                      {comment.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{comment.email}</span>
                      <span>{formatDate()}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteComment(comment.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  🗑
                </Button>
              </div>
              <p className="text-sm text-foreground mt-2 ml-11">
                {comment.body}
              </p>
              <div className="flex items-center justify-between mt-2 ml-11">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleLike(comment.id)}
                  className={
                    likedComments.includes(comment.id)
                      ? 'text-green-600'
                      : 'text-muted-foreground'
                  }
                >
                  👍 Like
                </Button>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="bg-muted px-2 py-1 rounded-full">
                    Comment #{comment.id}
                  </span>
                  <span className="bg-muted px-2 py-1 rounded-full">
                    Post #{comment.postId}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentsUI;
