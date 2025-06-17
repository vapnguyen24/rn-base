import { useIsFocused } from '@react-navigation/native';
import { StatusBar, StatusBarProps } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import { Box } from '~/src/library/components/core/Box';

export const FocusAwareStatusBar = ({ style = 'dark', ...props }: StatusBarProps) => {
  // state
  const isFocused = useIsFocused();

  // render
  return isFocused ? (
    <Box style={styles.container}>
      <StatusBar style={style} {...props} />
    </Box>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    opacity: 0,
    position: 'absolute',
  },
});
