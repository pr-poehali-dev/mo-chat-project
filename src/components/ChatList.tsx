import { Chat, User } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ChatListProps {
  chats: Chat[];
  selectedChatId?: string;
  onSelectChat: (chatId: string) => void;
}

export function ChatList({ chats, selectedChatId, onSelectChat }: ChatListProps) {
  const getChatName = (chat: Chat) => {
    if (chat.type === 'group') {
      return chat.participants.map(p => p.name.split(' ')[0]).join(', ');
    }
    return chat.participants[0]?.name || 'Неизвестный';
  };

  const getChatAvatar = (chat: Chat) => {
    if (chat.type === 'group') {
      return chat.participants[0]?.avatar;
    }
    return chat.participants[0]?.avatar;
  };

  const getLastMessageTime = (chat: Chat) => {
    if (!chat.lastMessage) return '';
    return formatDistanceToNow(chat.lastMessage.timestamp, { 
      addSuffix: false, 
      locale: ru 
    });
  };

  return (
    <div className="flex flex-col h-full">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={cn(
            "flex items-center gap-3 p-4 hover:bg-accent/50 cursor-pointer transition-all duration-200",
            "border-b border-border/50 animate-fade-in",
            selectedChatId === chat.id && "bg-accent/30"
          )}
        >
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={getChatAvatar(chat)} alt={getChatName(chat)} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                {getChatName(chat).charAt(0)}
              </AvatarFallback>
            </Avatar>
            {chat.participants[0]?.status === 'online' && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse-glow" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {chat.pinned && (
                  <Icon name="Pin" size={14} className="text-primary" />
                )}
                <h3 className="font-semibold text-sm truncate">
                  {getChatName(chat)}
                </h3>
              </div>
              <span className="text-xs text-muted-foreground">
                {getLastMessageTime(chat)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                {chat.muted && (
                  <Icon name="VolumeX" size={14} className="text-muted-foreground" />
                )}
                {chat.lastMessage?.content || 'Нет сообщений'}
              </p>
              {chat.unreadCount > 0 && (
                <Badge 
                  variant="default" 
                  className="ml-2 h-5 min-w-5 px-1.5 rounded-full bg-primary text-xs animate-bounce-in"
                >
                  {chat.unreadCount}
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
