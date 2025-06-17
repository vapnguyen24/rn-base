import { useTheme } from '@shopify/restyle';
import React, { useMemo } from 'react';
import { StyleSheet, useWindowDimensions, ViewProps, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  Edge,
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { InsetComponentProps, InsetProps, ScreenComponentProps, ScreenProps } from './type';

import { Box } from '~/src/library/components/core/Box';
import { FocusAwareStatusBar } from '~/src/library/components/focus-aware-status-bar';
import { Theme } from '~/src/theme';

const INSETS: Edge[] = ['top', 'bottom', 'left', 'right'];

const getEdges = (excludeEdges: ScreenProps['excludeEdges'], hiddenStatusBar: boolean) => {
  if (excludeEdges === 'all') {
    return [];
  }

  const actualEdges = INSETS.filter((x) => !(excludeEdges ?? []).includes(x));

  if (hiddenStatusBar) {
    return actualEdges.filter((x) => x !== 'top');
  }

  return actualEdges;
};

const Inset = ({ color, height, width, bottom, left, right, top }: InsetProps) => {
  // state
  const style = useMemo<ViewStyle>(
    () => ({
      backgroundColor: color,
      bottom,
      height,
      left,
      right,
      top,
      width,
    }),
    [bottom, color, height, left, right, top, width]
  );

  // render
  return <Box style={[styles.insets, style]} />;
};

const InsetComponent = ({
  edges,
  bottomInsetColor,
  hiddenStatusBar,
  leftInsetColor,
  rightInsetColor,
  statusColor,
  unsafe,
  statusBarStyle,
}: InsetComponentProps) => {
  // state
  const inset = useSafeAreaInsets();

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // render
  return (
    <>
      <FocusAwareStatusBar
        hidden={hiddenStatusBar}
        backgroundColor="transparent"
        translucent
        style={statusBarStyle ?? 'light'}
      />
      {!unsafe && edges.includes('top') && (
        <Inset color={statusColor} top={0} height={inset.top} width={screenWidth} />
      )}
      {!unsafe && edges.includes('left') && (
        <Inset color={leftInsetColor} left={0} height={screenHeight} width={inset.left} />
      )}
      {!unsafe && edges.includes('right') && (
        <Inset color={rightInsetColor} right={0} height={screenHeight} width={inset.right} />
      )}
      {!unsafe && edges.includes('bottom') && (
        <Inset color={bottomInsetColor} bottom={0} height={inset.bottom} width={screenWidth} />
      )}
    </>
  );
};

function ScreenWithoutScrolling(
  Wrapper: React.ComponentType<ViewProps | SafeAreaViewProps>,
  props: ScreenComponentProps
) {
  // state
  const theme = useTheme<Theme>();

  const {
    statusBarStyle,
    backgroundColor,
    actualUnsafe,
    children,
    edges,
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = theme.colors.background,
    style = {},
    rightInsetColor = theme.colors.background,
    leftInsetColor = theme.colors.background,
  } = props;

  // render
  return (
    <>
      <Wrapper
        edges={edges}
        style={[styles.inner, style, backgroundColor ? { backgroundColor } : {}]}>
        <Box style={styles.fill}>{children}</Box>
      </Wrapper>
      <InsetComponent
        edges={edges}
        bottomInsetColor={bottomInsetColor}
        statusColor={statusColor}
        statusBarStyle={statusBarStyle}
        hiddenStatusBar={hiddenStatusBar}
        leftInsetColor={leftInsetColor}
        rightInsetColor={rightInsetColor}
        unsafe={actualUnsafe}
      />
    </>
  );
}

function ScreenWithScrolling(
  Wrapper: React.ComponentType<ViewProps | SafeAreaViewProps>,
  props: ScreenComponentProps
) {
  // state
  const theme = useTheme<Theme>();

  const {
    statusBarStyle,
    backgroundColor,
    actualUnsafe,
    children,
    onScroll,
    edges,
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = theme.colors.background,
    style = {},
    leftInsetColor = theme.colors.background,
    rightInsetColor = theme.colors.background,
  } = props;

  // render
  return (
    <>
      <Wrapper edges={edges} style={[styles.outer]}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          overScrollMode="never"
          style={[styles.inner, backgroundColor ? { backgroundColor } : {}]}
          contentContainerStyle={[style]}>
          {children}
        </Animated.ScrollView>
      </Wrapper>
      <InsetComponent
        edges={edges}
        bottomInsetColor={bottomInsetColor}
        statusColor={statusColor}
        statusBarStyle={statusBarStyle}
        hiddenStatusBar={hiddenStatusBar}
        leftInsetColor={leftInsetColor}
        rightInsetColor={rightInsetColor}
        unsafe={actualUnsafe}
      />
    </>
  );
}

export const Screen = (props: ScreenProps) => {
  // state
  const edges = useMemo<Edge[]>(
    () => getEdges(props.excludeEdges, props?.hiddenStatusBar ?? false),
    [props.excludeEdges, props.hiddenStatusBar]
  );

  const actualUnsafe = props.unsafe || edges.length <= 0;

  const Wrapper = actualUnsafe ? Box : SafeAreaView;

  // render
  if (props.scroll) {
    return ScreenWithScrolling(Wrapper, { ...props, actualUnsafe, edges });
  } else {
    return ScreenWithoutScrolling(Wrapper, { ...props, actualUnsafe, edges });
  }
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  inner: {
    flex: 1,
    overflow: 'hidden',
    width: '100%',
  },
  insets: {
    position: 'absolute',
  },
  outer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
});
