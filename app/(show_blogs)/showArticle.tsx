import { getPosts } from '@/lib/api';
import { Post } from '@/lib/store';
import Link from 'next/link';
import React from 'react'

export const ShowArticle = async ({searchParams}:{searchParams: { page: string }}) => {
 const page = parseInt(searchParams.page) || 1;
  const limit = 10; // Number of posts per page
  const { posts, total } = await getPosts({ page, limit });
  const totalPages = Math.ceil(total / limit);
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-4">
            Latest Posts
          </h1>
          <p className="text-slate-600 text-lg">
            Discover amazing content from our community
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 mb-12">
          {posts.map((post: Post) => (
            <article 
              key={post.id} 
              className="group bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 hover:shadow-lg hover:shadow-slate-200/60 hover:border-slate-300/60 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {post.userId}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">User {post.userId}</div>
                    <div className="text-xs text-slate-500">Post #{post.id}</div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                  #{post.id}
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                {post.title}
              </h2>
              
              <p className="text-slate-600 leading-relaxed line-clamp-3">
                {post.body}
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Read more
                    </span>
                  </div>
                  <button className="text-slate-400 hover:text-blue-500 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-slate-200/60 p-6">
          <div className="flex items-center space-x-4">
            {prevPage ? (
              <Link 
                href={`?page=${prevPage}`} 
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Link>
            ) : (
              <div className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-400 font-medium rounded-lg cursor-not-allowed">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-4 py-2 bg-slate-100 rounded-lg">
              <span className="text-sm font-semibold text-slate-700">
                Page {page} of {totalPages}
              </span>
            </div>
            <div className="text-sm text-slate-500">
              ({total} total posts)
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {nextPage ? (
              <Link 
                href={`?page=${nextPage}`} 
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                Next
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-400 font-medium rounded-lg cursor-not-allowed">
                Next
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

