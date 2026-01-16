import { User } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface ProfileScreenProps {
  user: User;
  onUpdateProfile: (user: Partial<User>) => void;
}

export function ProfileScreen({ user, onUpdateProfile }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [statusText, setStatusText] = useState(user.statusText || '');

  const handleSave = () => {
    onUpdateProfile({ name, statusText });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-b border-border">
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="Camera" size={18} />
            </Button>
          </div>

          {isEditing ? (
            <div className="w-full max-w-sm space-y-3">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center font-semibold text-lg"
              />
              <Input
                value={statusText}
                onChange={(e) => setStatusText(e.target.value)}
                placeholder="Статус"
                className="text-center text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  Сохранить
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.statusText || 'Без статуса'}</p>
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Icon name="Pencil" size={14} className="mr-2" />
                Редактировать профиль
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div>
          <Label className="text-sm font-semibold mb-3 block">Информация</Label>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-card border border-border">
              <Icon name="Phone" size={20} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Телефон</p>
                <p className="text-sm font-medium">+7 900 123 45 67</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-card border border-border">
              <Icon name="Mail" size={20} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">user@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-card border border-border">
              <Icon name="AtSign" size={20} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Имя пользователя</p>
                <p className="text-sm font-medium">@{user.name.toLowerCase().replace(' ', '_')}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-semibold mb-3 block">О приложении</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <Icon name="Info" size={20} className="text-primary" />
                <span className="text-sm">О приложении МО</span>
              </div>
              <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <Icon name="HelpCircle" size={20} className="text-primary" />
                <span className="text-sm">Помощь</span>
              </div>
              <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
