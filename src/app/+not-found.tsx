import { Link, Stack } from 'expo-router';

import { Box, Text } from '~/src/library';
import { makeStyles } from '~/src/theme';

export default function NotFoundScreen() {
  const styles = useStyles();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Box flex={1} justifyContent="center" alignItems="center" padding="ml_24">
        <Text variant="paragraph1">This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text variant="paragraph1" color="info500">
            Go to home screen!
          </Text>
        </Link>
      </Box>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  link: {
    marginTop: theme.spacing.m_16,
    paddingVertical: theme.spacing.m_16,
  },
}));
