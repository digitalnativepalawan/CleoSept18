import React from 'react';

export interface BlogPost {
    id: number;
    title: string;
    author: string;
    publishDate: string;
    status: 'Draft' | 'Published';
    imageUrl: string;
    excerpt: string;
    content: string;
}

interface BlogPostCardProps {
    post: BlogPost;
    onSelectPost: (post: BlogPost) => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onSelectPost }) => (
    <div className="flex flex-col bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <button onClick={() => onSelectPost(post)} className="block w-full text-left group">
            <div className="overflow-hidden">
                <img 
                    src={post.imageUrl || `https://via.placeholder.com/600x400.png/007aff/ffffff?text=Binga+Beach`} 
                    alt={post.title} 
                    className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-serif font-bold text-xl text-gray-800 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{post.author} &bull; {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-gray-600 text-base mb-4 flex-grow">{post.excerpt}</p>
                <span className="font-semibold text-primary group-hover:underline mt-auto">
                    Read More &rarr;
                </span>
            </div>
        </button>
    </div>
);


interface BlogPageProps {
    posts: BlogPost[];
    onSelectPost: (post: BlogPost) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ posts, onSelectPost }) => {
    return (
        <section className="py-16 md:py-24 bg-gray-50/50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">The Binga Beach Blog</h1>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Updates, insights, and stories from our sustainable paradise in Palawan.</p>
                </div>
                {posts && posts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <BlogPostCard key={post.id} post={post} onSelectPost={onSelectPost} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No posts yet</h3>
                        <p className="mt-1 text-sm text-gray-500">No blog posts have been published. Please check back soon!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogPage;
