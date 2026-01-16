import { useState } from 'react';
import { Message, User } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ChatWindowProps {
  messages: Message[];
  currentUser: User;
  otherUser: User;
  onSendMessage: (content: string, type: Message['type']) => void;
}

export function ChatWindow({ messages, currentUser, otherUser, onSendMessage }: ChatWindowProps) {
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText, 'text');
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center gap-3 p-4 border-b border-border bg-card shadow-sm">
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
            {otherUser.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="font-semibold text-sm">{otherUser.name}</h2>
          <p className="text-xs text-muted-foreground">
            {otherUser.status === 'online' ? 'в сети' : otherUser.statusText || 'не в сети'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Icon name="Phone" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Icon name="Video" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId === currentUser.id;
            const showAvatar = index === 0 || messages[index - 1]?.senderId !== message.senderId;

            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 animate-slide-in",
                  isCurrentUser ? "flex-row-reverse" : "flex-row"
                )}
              >
                {showAvatar && !isCurrentUser && (
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src={otherUser.avatar} />
                    <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                {!showAvatar && !isCurrentUser && <div className="w-8" />}

                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-2 shadow-sm",
                    isCurrentUser
                      ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-sm"
                      : "bg-card border border-border rounded-bl-sm"
                  )}
                >
                  {message.type === 'voice' && (
                    <div className="flex items-center gap-3">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Icon name="Play" size={16} />
                      </Button>
                      <div className="h-1 w-32 bg-current/20 rounded-full">
                        <div className="h-full w-1/3 bg-current rounded-full" />
                      </div>
                      <span className="text-xs opacity-70">{message.duration}s</span>
                    </div>
                  )}
                  {message.type === 'text' && (
                    <p className="text-sm break-words">{message.content}</p>
                  )}
                  <span className={cn(
                    "text-xs mt-1 block opacity-70",
                    isCurrentUser ? "text-right" : "text-left"
                  )}>
                    {format(message.timestamp, 'HH:mm', { locale: ru })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="hover:bg-primary/10"
          >
            <Icon name="Smile" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Icon name="Paperclip" size={20} />
          </Button>
          
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишите сообщение..."
            className="flex-1 rounded-full"
          />

          {messageText.trim() ? (
            <Button
              onClick={handleSend}
              size="icon"
              className="rounded-full bg-gradient-to-br from-primary to-secondary hover:scale-105 transition-transform"
            >
              <Icon name="Send" size={20} />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10"
            >
              <Icon name="Mic" size={20} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
