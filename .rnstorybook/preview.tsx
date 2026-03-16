import '../global.css';
import { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import type { Preview } from '@storybook/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HeroUINativeProvider } from 'heroui-native';
import { Uniwind } from 'uniwind';

function StorybookWrapper({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  useEffect(() => {
    Uniwind.setTheme(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <View style={{ flex: 1, padding: 16 }}>
          {children}
        </View>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}

const preview: Preview = {
  decorators: [
    withBackgrounds,
    Story => (
      <StorybookWrapper>
        <Story />
      </StorybookWrapper>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f3f4f6' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
