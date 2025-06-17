import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import { useAnimatedStyle } from 'react-native-reanimated';

import { TabItemProps } from './type';

import { DefaultButton } from '~/src/library/components/button/default-button';
import { AnimatedBox, AnimatedText } from '~/src/library/components/core';
import { Box } from '~/src/library/components/core/Box';
import { makeStyles, Theme } from '~/src/theme';

export const TabItem = ({ tab, index, selectedIndex, onChangeTab }: TabItemProps) => {
  // state
  const styles = styleSheet();
  const theme = useTheme<Theme>();

  const [t] = useTranslation();

  // func
  const handlePress = () => {
    if (selectedIndex.value === index) {
      return;
    }

    selectedIndex.value = index;
    onChangeTab?.(index);
  };

  // style
  const underlineStyle = useAnimatedStyle(() => ({
    opacity: selectedIndex.value === index ? 1 : 0,
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: selectedIndex.value === index ? theme.colors.neutral500 : theme.colors.neutral300,
  }));

  // render
  return (
    <Box style={styles.container}>
      <DefaultButton onPress={handlePress}>
        <Box style={styles.button}>
          <AnimatedText style={[theme.textVariants.CTAs, textStyle]}>{t(tab.title)}</AnimatedText>
        </Box>
      </DefaultButton>
      <AnimatedBox pointerEvents="none" style={styles.underlineOverlay} />
      <AnimatedBox pointerEvents="none" style={[styles.underline, underlineStyle]} />
    </Box>
  );
};

const styleSheet = makeStyles((theme) => ({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  container: {
    flex: 1,
  },
  underline: {
    backgroundColor: theme.colors.primary500,
    bottom: 0,
    height: 2,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 99,
  },
  underlineOverlay: {
    backgroundColor: theme.colors.primary50,
    bottom: 0,
    height: 2,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 9,
  },
}));
