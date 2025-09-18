
import React, { useState } from 'react';
import Modal from '../common/Modal';
import { BlogPost } from './BlogView';

interface AddBlogPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddPost: (post: Omit<BlogPost, 'id'>) => void;
}

const AddBlogPostModal: React.FC<AddBlogPostModalProps> = ({ isOpen, onClose, onAddPost }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
    const [status, setStatus] = useState<'Draft' | 'Published'>('Draft');
    const [imageUrl, setImageUrl] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const maxContentLength = 7500;

    const handleSubmit = () => {
        if (!title) {
            alert('Title is required.');
            return;
        }
        onAddPost({
            title,
            author,
            publishDate,
            status,
            imageUrl,
            excerpt,
            content,
        });
        // Reset form and close modal
        setTitle('');
        setAuthor('');
        setPublishDate(new Date().toISOString().split('T')[0]);
        setStatus('Draft');
        setImageUrl('');
        setExcerpt('');
        setContent('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create Blog Post" size="2xl">
            <div className="space-y-4 text-sm">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Author</label>
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Publish Date</label>
                        <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value as 'Draft' | 'Published')} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-primary focus:border-primary text-gray-900">
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Image URL</label>
                    <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900" />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Excerpt</label>
                    <textarea rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900"></textarea>
                </div>
                
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block font-medium text-gray-700">Content</label>
                        <span className="text-gray-500">{content.length} / {maxContentLength}</span>
                    </div>
                    <textarea rows={8} value={content} onChange={(e) => setContent(e.target.value)} maxLength={maxContentLength} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-gray-900"></textarea>
                </div>

                <div className="flex justify-end items-center space-x-3 pt-4 border-t mt-6">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSubmit} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover">Create Post</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddBlogPostModal;