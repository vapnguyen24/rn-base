import { SharedValue } from 'react-native-reanimated';

export type Tab = {
  title: I18nKeys;
  key: string;
};

export type TabsProps = {
  /**
   * Start index
   * @default 0
   */
  initialIndex?: number;
  /**
   * data for tabs
   */
  tabs: Tab[];

  /**
   * handle event tab index changed
   */
  onChangeTab?: (index: number) => void
};

export type TabItemProps = {
  tab: Tab;
  index: number;
  selectedIndex: SharedValue<number>;
  onChangeTab?: (index: number) => void
};
