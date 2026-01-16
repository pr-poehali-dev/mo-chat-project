import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { ChatList } from '@/components/ChatList';
import { ChatWindow } from '@/components/ChatWindow';
import { ContactsList } from '@/components/ContactsList';
import { ProfileScreen } from '@/components/ProfileScreen';
import { SettingsScreen } from '@/components/SettingsScreen';
import { mockChats, mockMessages, mockContacts, currentUser, mockUsers } from '@/data/mockData';
import { Message, User } from '@/types/chat';

export default function Index() {
  const navigate = useNavigate();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('chats');
  const [messages, setMessages] = useState(mockMessages);
  const [user, setUser] = useState(currentUser);

  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);
  const chatMessages = messages.filter(msg => msg.chatId === selectedChatId);
  const otherUser = selectedChat?.participants[0] || mockUsers[0];

  const handleSendMessage = (content: string, type: Message['type']) => {
    if (!selectedChatId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      chatId: selectedChatId,
      senderId: currentUser.id,
      content,
      timestamp: new Date(),
      type,
      read: false
    };

    setMessages([...messages, newMessage]);
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    setUser({ ...user, ...updates });
  };

  const filteredChats = mockChats.filter(chat =>
    chat.participants.some(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-[1400px] mx-auto flex shadow-2xl">
        <div className="w-80 border-r border-border bg-card/50 backdrop-blur-sm flex flex-col">
          <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                МО
              </h1>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-primary/10"
                  onClick={() => navigate('/auth')}
                >
                  <Icon name="LogIn" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Icon name="Plus" size={20} />
                </Button>
              </div>
            </div>

            <div className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
                className="pl-10 rounded-full bg-background/50"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4 rounded-none border-b border-border bg-transparent p-0">
              <TabsTrigger 
                value="chats" 
                className="rounded-none data-[state=active]:bg-primary/10 data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <Icon name="MessageCircle" size={18} />
              </TabsTrigger>
              <TabsTrigger 
                value="contacts"
                className="rounded-none data-[state=active]:bg-primary/10 data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <Icon name="Users" size={18} />
              </TabsTrigger>
              <TabsTrigger 
                value="profile"
                className="rounded-none data-[state=active]:bg-primary/10 data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <Icon name="User" size={18} />
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="rounded-none data-[state=active]:bg-primary/10 data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <Icon name="Settings" size={18} />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chats" className="flex-1 overflow-hidden m-0">
              <ChatList
                chats={filteredChats}
                selectedChatId={selectedChatId || undefined}
                onSelectChat={setSelectedChatId}
              />
            </TabsContent>

            <TabsContent value="contacts" className="flex-1 overflow-hidden m-0">
              <ContactsList
                contacts={filteredContacts}
                onSelectContact={(id) => {
                  const chat = mockChats.find(c => c.participants.some(p => p.id === id));
                  if (chat) {
                    setSelectedChatId(chat.id);
                    setActiveTab('chats');
                  }
                }}
              />
            </TabsContent>

            <TabsContent value="profile" className="flex-1 overflow-hidden m-0">
              <ProfileScreen user={user} onUpdateProfile={handleUpdateProfile} />
            </TabsContent>

            <TabsContent value="settings" className="flex-1 overflow-hidden m-0">
              <SettingsScreen />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex-1 bg-background">
          {selectedChatId ? (
            <ChatWindow
              messages={chatMessages}
              currentUser={currentUser}
              otherUser={otherUser}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="text-center space-y-4 animate-fade-in">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
                  <Icon name="MessageCircle" size={64} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Добро пожаловать в МО</h2>
                <p className="text-muted-foreground max-w-md">
                  Выберите чат, чтобы начать общение, или создайте новый диалог
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}