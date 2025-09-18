import React from 'react';
import BlogPage from './BlogPage';
import BlogPostPage from './BlogPostPage';
import { BlogPost } from '../dashboard/BlogView';

// FIX: Removed unused props to resolve a TypeScript error in App.tsx.
// The component's responsibility is to display blog content, not the main site header/navigation,
// so props like onLogin, onSignUp, etc., were extraneous. Also removed unused imports.
interface BlogLayoutProps {
    posts: BlogPost[];
    selectedPost: BlogPost | null;
    onSelectPost: (post: BlogPost) => void;
    onBackToBlogList: () => void;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({
    posts,
    selectedPost,
    onSelectPost,
    onBackToBlogList,
}) => {
    return (
        <>
            {selectedPost ? (
                <BlogPostPage post={selectedPost} onBack={onBackToBlogList} />
            ) : (
                <BlogPage posts={posts} onSelectPost={onSelectPost} />
            )}
       </>
    );
};

export default BlogLayout;