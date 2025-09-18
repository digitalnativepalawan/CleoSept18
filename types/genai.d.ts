declare module "@google/genai" {
  export interface ChatConfig {
    systemInstruction?: string;
  }
  
  export interface MessageRequest {
    message: string;
  }
  
  export interface ResponseChunk {
    text: string;
  }
  
  export interface Chat {
    sendMessageStream(request: MessageRequest): AsyncIterable<ResponseChunk>;
  }
  
  export interface GoogleGenAIOptions {
    apiKey: string;
  }
  
  export class GoogleGenAI {
    constructor(options: GoogleGenAIOptions);
    chats: {
      create(options: { model: string; config?: ChatConfig }): Chat;
    };
  }
}