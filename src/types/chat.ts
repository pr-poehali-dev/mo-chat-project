export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  statusText?: string;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'voice' | 'video' | 'sticker' | 'image';
  duration?: number;
  read: boolean;
  replyTo?: string;
}

export interface Chat {
  id: string;
  type: 'private' | 'group';
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  pinned: boolean;
  muted: boolean;
}

export interface Contact extends User {
  phone?: string;
  bio?: string;
}
