import { FlashList } from '@shopify/flash-list';
import { FlatList, RefreshControl } from 'react-native';

import { ListViewProps } from './type';

export const ListView = (props: ListViewProps) => {
  // state
  const {
    type = 'flashlist',
    onRefresh,
    onLoadMore,
    canRefresh = false,
    canLoadMore = false,
    refreshing = false,
  } = props;

  // function
  const loadMore = () => {
    if (canLoadMore) {
      execFunc(onLoadMore);
    }
  };

  const ListComponent = type === 'flashlist' ? FlashList : FlatList;

  // render
  return (
    <ListComponent
      refreshControl={
        canRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.001}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
      onRefresh={undefined}
      refreshing={undefined}
    />
  );
};
