import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Button,
  HeroUINativeProvider,
  Skeleton,
  Switch,
  useToast,
} from 'heroui-native';
import { Uniwind, useUniwind } from 'uniwind';
import { useEffect } from 'react';
import { StatusBar, Text, useColorScheme, View } from 'react-native';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const systemColorScheme = useColorScheme();

  // Sync Uniwind theme with system preference on first launch
  useEffect(() => {
    Uniwind.setTheme(systemColorScheme === 'dark' ? 'dark' : 'light');
  }, [systemColorScheme]);

  const { theme } = useUniwind();
  const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <HeroUINativeProvider>
          <StatusBar barStyle={barStyle} />
          <ChildApp />
        </HeroUINativeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;

const ChildApp = () => {
  const { theme } = useUniwind();
  const { toast } = useToast();

  const toggleTheme = () => {
    Uniwind.setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleToast = () => {
    toast.show({
      variant: 'danger',
      label: 'You have upgraded your plan',
      description: 'You can continue using HeroUI Chat',
      actionLabel: 'Close',
      onActionPress: ({ hide }) => hide(),
    });
  };

  return (
    <View className="flex-1 justify-center items-center bg-background gap-4">
      <Button variant="outline" onPress={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
      </Button>
      <Button onPress={handleToast}>Get Started</Button>
      <Skeleton isLoading={false} className="h-20 w-full rounded-lg">
        <View className="h-20 bg-accent rounded-lg justify-center items-center">
          <Text className="text-accent-foreground">Loaded Content</Text>
        </View>
      </Skeleton>
      <Switch
        animation={{
          scale: {
            value: [1, 0.9], // [unpressed, pressed]
          },
          backgroundColor: {
            value: ['#172554', '#eab308'], // [unselected, selected]
          },
        }}
      >
        <Switch.Thumb />
      </Switch>
    </View>
  );
};
