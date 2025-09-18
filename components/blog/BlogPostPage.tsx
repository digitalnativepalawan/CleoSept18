import React from 'react';
import { BlogPost } from '../dashboard/BlogView';

interface BlogPostPageProps {
    post: BlogPost;
    onBack: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack }) => {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button 
                    onClick={onBack} 
                    className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors mb-8 group"
                >
                    <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Blog
                </button>
                
                <article>
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{post.title}</h1>
                        <p className="text-gray-500">
                            By <span className="font-semibold text-gray-700">{post.author}</span> on {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </header>
                    
                    {post.imageUrl && (
                        <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="my-8 rounded-lg shadow-lg w-full aspect-video object-cover" 
                        />
                    )}
                    
                    <div className="prose lg:prose-lg max-w-none text-gray-700 leading-relaxed space-y-6" style={{whiteSpace: 'pre-wrap'}}>
                        {post.content}
                    </div>
                </article>
            </div>
        </section>
    );
};

export default BlogPostPage;
