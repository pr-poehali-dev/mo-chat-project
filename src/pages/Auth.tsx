import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { YandexLoginButton } from '@/components/extensions/yandex-auth/YandexLoginButton';
import { useYandexAuth } from '@/components/extensions/yandex-auth/useYandexAuth';

const AUTH_URL = 'https://functions.poehali.dev/5aa101ff-6d65-4d8f-82ff-beedde7db057';

export default function Auth() {
  const navigate = useNavigate();
  const [isCallback, setIsCallback] = useState(false);

  const yandexAuth = useYandexAuth({
    apiUrls: {
      authUrl: `${AUTH_URL}?action=auth-url`,
      callback: `${AUTH_URL}?action=callback`,
      refresh: `${AUTH_URL}?action=refresh`,
      logout: `${AUTH_URL}?action=logout`,
    },
    onAuthChange: (user) => {
      if (user) {
        navigate('/');
      }
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('code')) {
      setIsCallback(true);
      yandexAuth.handleCallback(params).then((success) => {
        if (success) {
          window.history.replaceState({}, '', '/auth');
          navigate('/');
        }
      });
    }
  }, []);

  if (isCallback) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Card className="w-full max-w-md mx-4 shadow-2xl border-2">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground">Авторизация...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary shadow-2xl mb-4 animate-pulse-glow">
            <Icon name="MessageCircle" size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            МО
          </h1>
          <p className="text-muted-foreground">
            Войдите, чтобы начать общение
          </p>
        </div>

        <Card className="shadow-2xl border-2 border-border/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Вход в аккаунт</CardTitle>
            <CardDescription className="text-center">
              Выберите способ авторизации
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <YandexLoginButton
              onClick={yandexAuth.login}
              isLoading={yandexAuth.isLoading}
              className="w-full h-12"
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Или войти через
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12"
              disabled
            >
              <Icon name="Mail" size={20} className="mr-2" />
              Google (скоро)
            </Button>

            <Button
              variant="outline"
              className="w-full h-12"
              disabled
            >
              <Icon name="Github" size={20} className="mr-2" />
              GitHub (скоро)
            </Button>

            {yandexAuth.error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm flex items-start gap-2">
                <Icon name="AlertCircle" size={16} className="mt-0.5 flex-shrink-0" />
                <span>{yandexAuth.error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            ⚠️ Авторизация через Яндекс не работает в редакторе
          </p>
          <p className="mt-1">
            Откройте сайт в отдельной вкладке для проверки
          </p>
        </div>

        <div className="text-center space-y-2">
          <Button
            variant="link"
            onClick={() => navigate('/')}
            className="text-muted-foreground"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
}
