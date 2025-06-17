import { router, Stack } from 'expo-router';
import { Box, DefaultButton, ListView, Text } from '~/src/library';
import { makeStyles } from '~/src/theme';

const DATA = ['Core', 'Auth', 'Activity', 'Profile', 'Message', 'Device', 'Chart'];

export default function Home() {
  const styles = styleSheet();

  const keyExtractor = (_: string, index: number) => index.toString();

  const renderItem = ({ item }: { item: string }) => {
    const handleNavigate = () => {
      switch (item) {
        case 'Core':
          router.navigate('/(story-book)/core');
          break;
        default:
          router.navigate('/(story-book)/core');
      }
    };

    return (
      <DefaultButton style={styles.flex} onPress={handleNavigate}>
        <Box style={styles.itemContainer}>
          <Text variant="subtitle2">{item}</Text>
        </Box>
      </DefaultButton>
    );
  };
  return (
    <>
      <Stack.Screen options={{ title: 'StoryBook', headerTitleAlign: 'center' }} />
      <Box flex={1} padding={'s_8'}>
        <ListView
          data={DATA}
          estimatedItemSize={50}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={3}
        />
      </Box>
    </>
  );
}

const styleSheet = makeStyles((theme) => ({
  flex: {
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 150,
    borderWidth: 1,

    borderColor: theme.colors.inputBackgroundColor,
    margin: theme.spacing.s_8,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadii.l_12,
  },
}));
