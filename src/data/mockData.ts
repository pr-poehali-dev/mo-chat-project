import { Chat, User, Message, Contact } from '@/types/chat';

export const currentUser: User = {
  id: 'user-0',
  name: 'Ты',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
  status: 'online',
  statusText: 'Активен в МО'
};

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Анна Смирнова',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    status: 'online',
    statusText: 'Работаю над проектом 🚀',
    lastSeen: new Date()
  },
  {
    id: 'user-2',
    name: 'Дмитрий Иванов',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
    status: 'away',
    lastSeen: new Date(Date.now() - 600000)
  },
  {
    id: 'user-3',
    name: 'Елена Петрова',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    status: 'offline',
    lastSeen: new Date(Date.now() - 3600000)
  },
  {
    id: 'user-4',
    name: 'Михаил Козлов',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail',
    status: 'online',
    statusText: 'На встрече',
    lastSeen: new Date()
  },
  {
    id: 'user-5',
    name: 'Ольга Соколова',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga',
    status: 'online',
    lastSeen: new Date()
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    chatId: 'chat-1',
    senderId: 'user-1',
    content: 'Привет! Как дела с новым дизайном?',
    timestamp: new Date(Date.now() - 7200000),
    type: 'text',
    read: true
  },
  {
    id: 'msg-2',
    chatId: 'chat-1',
    senderId: 'user-0',
    content: 'Отлично! Скоро покажу результат',
    timestamp: new Date(Date.now() - 7000000),
    type: 'text',
    read: true
  },
  {
    id: 'msg-3',
    chatId: 'chat-1',
    senderId: 'user-1',
    content: 'Супер, жду!',
    timestamp: new Date(Date.now() - 300000),
    type: 'text',
    read: false
  },
  {
    id: 'msg-4',
    chatId: 'chat-2',
    senderId: 'user-2',
    content: 'Созвонимся сегодня вечером?',
    timestamp: new Date(Date.now() - 1800000),
    type: 'text',
    read: true
  },
  {
    id: 'msg-5',
    chatId: 'chat-3',
    senderId: 'user-3',
    content: 'Отправила файлы по проекту',
    timestamp: new Date(Date.now() - 10800000),
    type: 'text',
    read: true
  }
];

export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    type: 'private',
    participants: [mockUsers[0]],
    lastMessage: mockMessages[2],
    unreadCount: 1,
    pinned: true,
    muted: false
  },
  {
    id: 'chat-2',
    type: 'private',
    participants: [mockUsers[1]],
    lastMessage: mockMessages[3],
    unreadCount: 0,
    pinned: false,
    muted: false
  },
  {
    id: 'chat-3',
    type: 'private',
    participants: [mockUsers[2]],
    lastMessage: mockMessages[4],
    unreadCount: 0,
    pinned: false,
    muted: true
  },
  {
    id: 'chat-4',
    type: 'private',
    participants: [mockUsers[3]],
    lastMessage: undefined,
    unreadCount: 3,
    pinned: false,
    muted: false
  },
  {
    id: 'chat-5',
    type: 'group',
    participants: [mockUsers[0], mockUsers[1], mockUsers[4]],
    lastMessage: {
      id: 'msg-6',
      chatId: 'chat-5',
      senderId: 'user-5',
      content: 'Всем привет! Как успехи?',
      timestamp: new Date(Date.now() - 600000),
      type: 'text',
      read: false
    },
    unreadCount: 2,
    pinned: true,
    muted: false
  }
];

export const mockContacts: Contact[] = mockUsers.map(user => ({
  ...user,
  phone: `+7 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)}`,
  bio: 'Пользователь МО'
}));
