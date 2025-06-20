import React, { createRef, forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';

import { DURATION_HIDE } from './constants';
import { SnackItem } from './snack-bar-item';
import { styles } from './styles';
import { Item, SnackBarOptions, TypeMessage } from './type';

import { Box } from '~/src/library/components/core/Box';

const SnackBarComponent = forwardRef((_, ref) => {
  // state
  const [data, setData] = useState<Item[]>([]);

  // function
  const onPop = useCallback((item: Item) => {
    setData((d) => d.filter((x) => x.id !== item.id));
  }, []);

  const _renderItem = (item: Item, index: number) => (
    <SnackItem index={index} key={item.id} {...{ item, onPop }} />
  );

  // effect
  useImperativeHandle(
    ref,
    () => ({
      show: ({
        interval = DURATION_HIDE,
        msg,
        type = 'success',
        options,
      }: {
        msg: string;
        interval: number;
        type: TypeMessage;
        options: SnackBarOptions;
      }) => {
        setData((d) =>
          d.concat([
            {
              id: randomUniqueId(),
              interval,
              msg,
              type,
              options,
            },
          ])
        );
      },
    }),
    []
  );

  // render
  return (
    <Box pointerEvents="box-none" style={[StyleSheet.absoluteFillObject, styles.container]}>
      {data.map(_renderItem)}
    </Box>
  );
});

type SnackBar = {
  show: (data: {
    msg: string;
    interval?: number;
    type?: TypeMessage;
    options?: SnackBarOptions;
  }) => void;
};

export const snackBarRef = createRef<SnackBar>();

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SnackBar = () => <SnackBarComponent ref={snackBarRef} />;

export const showSnack = ({
  msg,
  interval,
  type,
  options,
}: {
  msg: string;
  interval?: number;
  type?: TypeMessage;
  options?: SnackBarOptions;
}) => {
  snackBarRef.current?.show({ interval, msg, type, options });
};
