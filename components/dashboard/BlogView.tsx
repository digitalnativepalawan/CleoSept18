
import React, { useState } from 'react';
import AddBlogPostModal from './AddBlogPostModal';

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

const StatusBadge: React.FC<{ status: 'Draft' | 'Published' }> = ({ status }) => {
    const statusClasses = {
        'Draft': 'bg-yellow-100 text-yellow-800',
        'Published': 'bg-green-100 text-green-800',
    };
    return (
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${statusClasses[status]}`}>
            {status}
        </span>
    );
};


interface BlogViewProps {
    posts: BlogPost[];
    onAddPost: (post: Omit<BlogPost, 'id'>) => void;
}

const BlogView: React.FC<BlogViewProps> = ({ posts, onAddPost }) => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    return (
        <main className="flex-1 overflow-y-auto bg-gray-100">
            <div className="p-4 sm:p-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border-b gap-4">
                        <h2 className="text-lg font-semibold text-gray-800">Blog Posts</h2>
                        <button onClick={() => setAddModalOpen(true)} className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300 text-sm flex items-center justify-center sm:w-auto w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            Create Blog Post
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        {posts.length > 0 ? (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-500">
                                        <th className="p-3 font-medium">Title</th>
                                        <th className="p-3 font-medium">Author</th>
                                        <th className="p-3 font-medium">Publish Date</th>
                                        <th className="p-3 font-medium">Status</th>
                                        <th className="p-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post) => (
                                        <tr key={post.id} className="border-b border-gray-200 bg-white">
                                            <td className="p-3 font-medium text-gray-800">{post.title}</td>
                                            <td className="p-3 text-gray-600">{post.author || '-'}</td>
                                            <td className="p-3 text-gray-600">{post.publishDate}</td>
                                            <td className="p-3"><StatusBadge status={post.status} /></td>
                                            <td className="p-3 text-right">
                                                 <div className="flex items-center justify-end space-x-1">
                                                    <button className="text-gray-400 hover:text-primary p-1 rounded-full transition-colors" aria-label="Edit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L13.196 5.196a2.5 2.5 0 012.036-.536z" /></svg>
                                                    </button>
                                                    <button className="text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors" aria-label="Delete">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center p-8 text-gray-500">
                                <p>No blog posts yet.</p>
                                <p className="text-sm mt-1">Click "Create Blog Post" to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <AddBlogPostModal 
                isOpen={isAddModalOpen} 
                onClose={() => setAddModalOpen(false)}
                onAddPost={onAddPost}
            />
        </main>
    );
};

export default BlogView;
