import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

export function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 border-b border-border bg-card">
        <h1 className="text-2xl font-bold">Настройки</h1>
        <p className="text-sm text-muted-foreground mt-1">Управление приложением МО</p>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div>
          <Label className="text-sm font-semibold mb-3 block">Уведомления</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-3">
                <Icon name="Bell" size={20} className="text-primary" />
                <div>
                  <p className="text-sm font-medium">Уведомления</p>
                  <p className="text-xs text-muted-foreground">Включить push-уведомления</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-3">
                <Icon name="Volume2" size={20} className="text-primary" />
                <div>
                  <p className="text-sm font-medium">Звук</p>
                  <p className="text-xs text-muted-foreground">Звук входящих сообщений</p>
                </div>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-semibold mb-3 block">Внешний вид</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-3">
                <Icon name="Moon" size={20} className="text-primary" />
                <div>
                  <p className="text-sm font-medium">Темная тема</p>
                  <p className="text-xs text-muted-foreground">Переключить на темный режим</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors border border-border">
              <div className="flex items-center gap-3">
                <Icon name="Palette" size={20} className="text-primary" />
                <span className="text-sm">Цветовая схема</span>
              </div>
              <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-semibold mb-3 block">Конфиденциальность</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors border border-border">
              <div className="flex items-center gap-3">
                <Icon name="Lock" size={20} className="text-primary" />
                <span className="text-sm">Безопасность</span>
              </div>
              <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors border border-border">
              <div className="flex items-center gap-3">
                <Icon name="Eye" size={20} className="text-primary" />
                <span className="text-sm">Приватность</span>
              </div>
              <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors border border-border">
              <div className="flex items-center gap-3">
                <Icon name="Shield" size={20} className="text-primary" />
                <span className="text-sm">Блокировка</span>
              </div>
              <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-semibold mb-3 block">Хранилище</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors border border-border">
              <div className="flex items-center gap-3">
                <Icon name="Database" size={20} className="text-primary" />
                <span className="text-sm">Управление данными</span>
              </div>
              <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Icon name="LogOut" size={20} className="mr-3" />
            Выйти из аккаунта
          </Button>

          <Button variant="destructive" className="w-full justify-start" size="lg">
            <Icon name="Trash2" size={20} className="mr-3" />
            Удалить аккаунт
          </Button>
        </div>
      </div>
    </div>
  );
}
