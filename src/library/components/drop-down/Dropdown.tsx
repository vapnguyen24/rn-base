import React, { memo, useEffect, useMemo } from 'react';
import type { ListRenderItem } from 'react-native';
import { StyleSheet, FlatList, View, useColorScheme } from 'react-native';
import { theme } from './theme';
import type { AutocompleteDropdownItem, IAutocompleteDropdownProps } from './types';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
interface DropdownProps extends Omit<IAutocompleteDropdownProps, 'renderItem' | 'ref'> {
  ListEmptyComponent: React.ReactElement;
  renderItem: ListRenderItem<AutocompleteDropdownItem>;
}

export const Dropdown = memo((props: DropdownProps) => {
  const {
    dataSet,
    suggestionsListMaxHeight,
    renderItem,
    ListEmptyComponent,
    ItemSeparatorComponent,
    direction,
    theme,
    ...rest
  } = props;
  const themeName = theme || useColorScheme();
  const styles = useMemo(() => getStyles(themeName || 'light'), [themeName]);

  const defaultItemSeparator = useMemo(() => {
    return () => <View style={styles.itemSeparator} />;
  }, [styles.itemSeparator]);

  const translateY = useSharedValue(direction === 'up' ? 10 : -10);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const delay = direction === 'up' ? 150 : 0;
    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: 150,
        easing: Easing.out(Easing.quad),
      })
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 150,
        easing: Easing.out(Easing.quad),
      })
    );
  }, [direction]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[styles.listContainer, rest.suggestionsListContainerStyle, animatedStyle]}>
      <FlatList
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        data={dataSet}
        style={{ maxHeight: suggestionsListMaxHeight }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparatorComponent ?? defaultItemSeparator}
        {...rest.flatListProps}
      />
    </Animated.View>
  );
});

const getStyles = (themeName: 'light' | 'dark' = 'light') =>
  StyleSheet.create({
    container: {},
    listContainer: {
      backgroundColor: theme[themeName].suggestionsListBackgroundColor,
      width: '100%',
      zIndex: 9,
      borderRadius: 5,
      shadowColor: theme[themeName || 'light'].shadowColor,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.3,
      shadowRadius: 15.46,

      elevation: 20,
    },
    itemSeparator: {
      height: 1,
      width: '100%',
      backgroundColor: theme[themeName || 'light'].itemSeparatorColor,
    },
  });
