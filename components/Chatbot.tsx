
import React, { useState, useEffect, useRef } from 'react';

// Access GoogleGenAI from global window object (loaded via CDN)
declare global {
  interface Window {
    GoogleGenAI: any;
  }
}

// Define message type
interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const chatRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize the chat session
    useEffect(() => {
        if (!process.env.API_KEY) {
            console.error("API_KEY is not set.");
            setMessages([
                { sender: 'bot', text: 'Hello! I am currently offline as my API key is not configured. Please check the setup.' }
            ]);
            return;
        }

        // Check if GoogleGenAI is available globally (loaded via CDN)
        if (!window.GoogleGenAI) {
            console.error("GoogleGenAI is not available. Please ensure the CDN is loaded.");
            setMessages([
                { sender: 'bot', text: 'Hello! I am currently offline as the AI service is not available. Please check the setup.' }
            ]);
            return;
        }

        const ai = new window.GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are a friendly and professional AI assistant for Binga Beach, a real estate development project in Palawan, Philippines. Your goal is to answer user questions about investing in Binga Beach, the property details, Palawan tourism, and our commitment to sustainability (ESG). Be concise, helpful, and encourage users to schedule a call or download the investment deck for more detailed information. Your knowledge is based on the project's pitch deck.",
            },
        });
        
        // Initial bot message
        setMessages([
            { sender: 'bot', text: 'Hello! How can I help you with your interest in Binga Beach today?' }
        ]);

    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseStream = await chatRef.current.sendMessageStream({ message: input });

            let botResponse = '';
            setMessages(prev => [...prev, { sender: 'bot', text: '' }]);

            for await (const chunk of responseStream) {
                botResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = botResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Gemini API error:", error);
            setMessages(prev => {
                const newMessages = [...prev];
                // If the last message is an empty bot message, replace it with the error.
                if (newMessages.length > 0 && newMessages[newMessages.length - 1].sender === 'bot' && newMessages[newMessages.length - 1].text === '') {
                     newMessages[newMessages.length - 1].text = 'Sorry, I encountered an error. Please try again.';
                } else {
                    newMessages.push({ sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' });
                }
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    // FIX: A React functional component must return a ReactNode. Added JSX to render the chatbot UI.
    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 z-50 bg-primary hover:bg-primary-hover text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform transform hover:scale-110"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                )}
            </button>
            {isOpen && (
                <div className="fixed bottom-20 right-5 w-full max-w-sm h-[60vh] max-h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200">
                    <header className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-xl">
                        <h3 className="font-bold text-gray-800">Binga Beach Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                                    <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-none">
                                    <div className="flex items-center space-x-1">
                                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-xl">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                disabled={isLoading}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        handleSendMessage(e as any);
                                    }
                                }}
                            />
                            <button type="submit" disabled={isLoading || !input.trim()} className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-primary disabled:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;
