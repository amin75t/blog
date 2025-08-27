import { getCommants, getPost } from '@/lib/api';
import React from 'react';
import CommentsUI from './(components)/commentSection';
import { Comment } from '@/lib/types';

const PostDetails = async ({ params }: { params: { postId: string } }) => {
  const { postId } = params;
  const post = await getPost(parseInt(postId));
  const comments: Comment[] = await getCommants(parseInt(postId));
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Featured Article Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-2">
                Article & Discussion
              </h1>
              <p className="text-slate-600">
                Read the full article and join the conversation below
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
            </div>

            {/* Main Article Card */}
            <article className="bg-white rounded-xl shadow-lg border border-slate-200/60 overflow-hidden mb-8">
              {/* Article Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {post.userId}
                    </div>
                    <div>
                      <div className="font-medium">User {post.userId}</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    Article #{post.id}
                  </div>
                </div>

                <h1 className="text-2xl font-bold leading-tight mb-2">
                  {post.title}
                </h1>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line mb-6">
                    {post.body}
                  </p>
                </div>

                {/* Article Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-200">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      <span className="font-medium">Like</span>
                    </button>
                    <button className="flex items-center space-x-2 text-slate-600 hover:text-purple-600 transition-colors duration-200">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                      <span className="font-medium">Share</span>
                    </button>
                    <button className="flex items-center space-x-2 text-slate-600 hover:text-green-600 transition-colors duration-200">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      <span className="font-medium">Save</span>
                    </button>
                  </div>
                  <div className="text-sm text-slate-500">
                    {comments.length} comments • 42 views
                  </div>
                </div>
              </div>
            </article>
          </div>
          <CommentsUI postId={Number(postId)} />
        </div>
      </div>
    </>
  );
};

export default PostDetails;
