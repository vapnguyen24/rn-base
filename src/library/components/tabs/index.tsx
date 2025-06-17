import { useSharedValue } from 'react-native-reanimated';

import { TabItem } from './tab-item';
import { Tab, TabsProps } from './type';

import { Box } from '~/src/library/components/core/Box';
import { makeStyles } from '~/src/theme';
import { useEffect } from 'react';

export const Tabs = ({ tabs, initialIndex = 0, onChangeTab }: TabsProps) => {
  // state
  const styles = styleSheet();

  const selectedIndex = useSharedValue(initialIndex);

  // func
  const renderTab = (item: Tab, index: number) => {
    return (
      <TabItem
        index={index}
        selectedIndex={selectedIndex}
        tab={item}
        key={item.key}
        onChangeTab={onChangeTab}
      />
    );
  };

  // render
  return <Box style={styles.container}>{tabs.map(renderTab)}</Box>;
};

const styleSheet = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.neutral50,
    flexDirection: 'row',
  },
}));
