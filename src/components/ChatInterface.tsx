import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  status?: string;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  type: 'text' | 'voice' | 'sticker';
  duration?: string;
}

const ChatInterface = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'profile' | 'settings'>('chats');
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const chats: Chat[] = [
    { id: 1, name: 'Анна Петрова', avatar: '👩‍💼', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 2, online: true, status: '🎨 В творческом процессе' },
    { id: 2, name: 'Дизайн Тим', avatar: '🎨', lastMessage: 'Отправил макеты', time: '13:15', unread: 5, online: true },
    { id: 3, name: 'Максим', avatar: '👨‍💻', lastMessage: 'Созвон в 15:00', time: '12:48', unread: 0, online: false },
    { id: 4, name: 'Мария Светлова', avatar: '🌟', lastMessage: 'Спасибо большое!', time: 'вчера', unread: 0, online: true, status: '☕ На кофе-брейке' },
    { id: 5, name: 'Проект МО', avatar: '🚀', lastMessage: 'Обновление готово', time: 'вчера', unread: 1, online: false },
  ];

  const messages: Message[] = [
    { id: 1, text: 'Привет! Как продвигается проект?', time: '14:28', isMine: false, type: 'text' },
    { id: 2, text: 'Отлично! Сегодня закончил основной функционал', time: '14:30', isMine: true, type: 'text' },
    { id: 3, text: '', time: '14:31', isMine: false, type: 'sticker' },
    { id: 4, text: 'Голосовое сообщение', time: '14:32', isMine: false, type: 'voice', duration: '0:23' },
    { id: 5, text: 'Супер! Жду результаты 🎉', time: '14:32', isMine: false, type: 'text' },
  ];

  const contacts = [
    { id: 1, name: 'Анна Петрова', avatar: '👩‍💼', status: 'онлайн', online: true },
    { id: 2, name: 'Максим Иванов', avatar: '👨‍💻', status: 'был 2 часа назад', online: false },
    { id: 3, name: 'Мария Светлова', avatar: '🌟', status: 'онлайн', online: true },
    { id: 4, name: 'Дмитрий Козлов', avatar: '🎯', status: 'был вчера', online: false },
  ];

  const selectedChatData = chats.find(c => c.id === selectedChat);

  const renderContent = () => {
    if (activeTab === 'chats') {
      return (
        <div className="flex h-full">
          {/* Список чатов */}
          <div className="w-96 border-r border-gray-200 bg-white/80 backdrop-blur-xl">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Поиск чатов..." 
                    className="pl-10 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-400 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button size="icon" variant="ghost" className="hover:bg-purple-100 hover:scale-110 transition-all">
                  <Icon name="Plus" size={20} />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-180px)]">
              <div className="space-y-1 px-2">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full p-3 rounded-xl flex items-start gap-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:scale-[1.02] ${
                      selectedChat === chat.id ? 'bg-gradient-to-r from-purple-100 to-pink-100 shadow-md' : ''
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="text-2xl">{chat.avatar}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900 truncate">{chat.name}</span>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      {chat.status && (
                        <p className="text-xs text-purple-600 mt-1">{chat.status}</p>
                      )}
                    </div>
                    
                    {chat.unread > 0 && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 animate-scale-in">
                        {chat.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Окно чата */}
          {selectedChatData ? (
            <div className="flex-1 flex flex-col bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-xl">
              {/* Шапка чата */}
              <div className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="text-xl">{selectedChatData.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedChatData.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedChatData.online ? 'онлайн' : 'был(а) недавно'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="hover:bg-blue-100 hover:scale-110 transition-all">
                      <Icon name="Phone" size={20} className="text-blue-600" />
                    </Button>
                    <Button size="icon" variant="ghost" className="hover:bg-purple-100 hover:scale-110 transition-all">
                      <Icon name="Video" size={20} className="text-purple-600" />
                    </Button>
                    <Button size="icon" variant="ghost" className="hover:bg-gray-100 hover:scale-110 transition-all">
                      <Icon name="MoreVertical" size={20} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Сообщения */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-4xl mx-auto">
                  {messages.map((msg, index) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2 animate-fade-in ${msg.isMine ? 'justify-end' : 'justify-start'}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {!msg.isMine && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-sm">{selectedChatData.avatar}</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`max-w-md ${msg.isMine ? 'order-first' : ''}`}>
                        {msg.type === 'text' && (
                          <div className={`px-4 py-2 rounded-2xl shadow-sm hover:shadow-md transition-all ${
                            msg.isMine 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-sm' 
                              : 'bg-white rounded-bl-sm'
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        )}
                        
                        {msg.type === 'voice' && (
                          <div className={`px-4 py-3 rounded-2xl shadow-sm flex items-center gap-3 ${
                            msg.isMine ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white'
                          }`}>
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:scale-110 transition-all">
                              <Icon name="Play" size={16} />
                            </Button>
                            <div className="flex-1 h-8 bg-gray-200/50 rounded-full flex items-center px-2">
                              <div className="h-1 bg-purple-400 rounded-full w-1/3"></div>
                            </div>
                            <span className="text-xs">{msg.duration}</span>
                          </div>
                        )}
                        
                        {msg.type === 'sticker' && (
                          <div className="text-6xl animate-scale-in hover:scale-110 transition-all">👍</div>
                        )}
                        
                        <span className={`text-xs text-gray-400 mt-1 block ${msg.isMine ? 'text-right' : ''}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Поле ввода */}
              <div className="p-4 border-t border-gray-200 bg-white/80 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="hover:bg-gray-100 hover:scale-110 transition-all">
                    <Icon name="Paperclip" size={20} className="text-gray-600" />
                  </Button>
                  <Button size="icon" variant="ghost" className="hover:bg-orange-100 hover:scale-110 transition-all">
                    <Icon name="Smile" size={20} className="text-orange-500" />
                  </Button>
                  
                  <Input 
                    placeholder="Введите сообщение..." 
                    className="flex-1 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-400 transition-all"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  
                  <Button size="icon" variant="ghost" className="hover:bg-blue-100 hover:scale-110 transition-all">
                    <Icon name="Mic" size={20} className="text-blue-600" />
                  </Button>
                  <Button size="icon" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:scale-110 transition-all">
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white/90 to-purple-50/50">
              <div className="text-center">
                <div className="text-8xl mb-4 animate-scale-in">💬</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Выберите чат</h3>
                <p className="text-gray-500">Начните общение с друзьями</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === 'contacts') {
      return (
        <div className="p-6 max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Контакты
          </h2>
          <div className="grid gap-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all">
                <div className="relative">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="text-2xl">{contact.avatar}</AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.status}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="hover:bg-blue-100 hover:scale-110 transition-all">
                    <Icon name="MessageCircle" size={18} className="text-blue-600" />
                  </Button>
                  <Button size="icon" variant="outline" className="hover:bg-green-100 hover:scale-110 transition-all">
                    <Icon name="Phone" size={18} className="text-green-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'profile') {
      return (
        <div className="p-6 max-w-2xl mx-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center mb-8">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarFallback className="text-6xl">🚀</AvatarFallback>
              </Avatar>
              <h2 className="text-3xl font-bold mb-2">Максим Орлов</h2>
              <p className="text-gray-500 mb-4">@maxorlov</p>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                ✨ Premium аккаунт
              </Badge>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all">
                <Icon name="Phone" className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Телефон</p>
                  <p className="font-medium">+7 (999) 123-45-67</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all">
                <Icon name="Mail" className="text-pink-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">max@example.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all">
                <Icon name="MapPin" className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Город</p>
                  <p className="font-medium">Москва, Россия</p>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:scale-[1.02] transition-all">
              Редактировать профиль
            </Button>
          </div>
        </div>
      );
    }

    if (activeTab === 'settings') {
      return (
        <div className="p-6 max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Настройки
          </h2>
          
          <div className="space-y-4">
            {[
              { icon: 'Bell', title: 'Уведомления', desc: 'Настройка звуков и оповещений' },
              { icon: 'Lock', title: 'Приватность', desc: 'Кто может видеть ваш статус' },
              { icon: 'Palette', title: 'Внешний вид', desc: 'Темы и цветовые схемы' },
              { icon: 'Database', title: 'Хранилище', desc: 'Управление файлами и медиа' },
              { icon: 'Shield', title: 'Безопасность', desc: 'Двухфакторная аутентификация' },
              { icon: 'Globe', title: 'Язык', desc: 'Русский' },
            ].map((setting, index) => (
              <div
                key={setting.title}
                className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <Icon name={setting.icon as any} className="text-purple-600" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{setting.title}</h3>
                  <p className="text-sm text-gray-500">{setting.desc}</p>
                </div>
                <Icon name="ChevronRight" className="text-gray-400" size={20} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Верхняя панель */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">💬</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              МО
            </h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'chats' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('chats')}
              className={`hover:scale-110 transition-all ${
                activeTab === 'chats' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''
              }`}
            >
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Чаты
            </Button>
            
            <Button
              variant={activeTab === 'contacts' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('contacts')}
              className={`hover:scale-110 transition-all ${
                activeTab === 'contacts' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''
              }`}
            >
              <Icon name="Users" size={18} className="mr-2" />
              Контакты
            </Button>
            
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('profile')}
              className={`hover:scale-110 transition-all ${
                activeTab === 'profile' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''
              }`}
            >
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
            
            <Button
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('settings')}
              className={`hover:scale-110 transition-all ${
                activeTab === 'settings' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''
              }`}
            >
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </Button>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default ChatInterface;
