import { Contact } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface ContactsListProps {
  contacts: Contact[];
  onSelectContact: (contactId: string) => void;
}

export function ContactsList({ contacts, onSelectContact }: ContactsListProps) {
  return (
    <div className="flex flex-col h-full">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          onClick={() => onSelectContact(contact.id)}
          className="flex items-center gap-3 p-4 hover:bg-accent/50 cursor-pointer transition-all duration-200 border-b border-border/50 animate-fade-in"
        >
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                {contact.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {contact.status === 'online' && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{contact.name}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {contact.statusText || contact.bio || 'Пользователь МО'}
            </p>
          </div>

          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Icon name="MessageCircle" size={18} />
          </Button>
        </div>
      ))}
    </div>
  );
}
