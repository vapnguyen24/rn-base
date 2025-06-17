import React, { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { ModalProps } from './type';

import { sharedTiming } from '~/src/common/animated';
import { useDisableBackHandler } from '~/src/common/hooks';
import { AnimatedBox } from '~/src/library/components/core';

export const ModalContent = forwardRef(
  (
    {
      style,
      children,
      customBackDrop,
      entering,
      exiting,
      backdropColor = 'black',
      backdropOpacity = 0.3,
      onSetClose,
      onModalHide,
      onModalShow,
      onBackdropPress,
      onModalWillHide,
      onModalWillShow,
      onBackButtonPress: onBackAndroidPress,
    }: ReOmit<ModalProps, 'isVisible'> & { onSetClose: () => void },
    ref
  ) => {
    // reanimated state

    const reBackdropOpacity = useSharedValue(0);

    // style
    const backDropStyle = useMemo<StyleProp<ViewStyle>>(
      () => [
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: backdropColor,
          height: '100%',
          width: '100%',
        },
      ],
      [backdropColor]
    );

    const reBackdropStyle = useAnimatedStyle(
      () => ({
        opacity: reBackdropOpacity.value,
      }),
      []
    );

    // function
    const openEnd = () => {
      execFunc(onModalShow);
    };

    const closeEnd = () => {
      execFunc(onSetClose);

      execFunc(onModalHide);
    };

    const onEndAnimatedClose = (isFinished?: boolean) => {
      'worklet';
      if (isFinished) {
        runOnJS(closeEnd)();
      }
    };

    const onEndAnimatedOpen = (isFinished?: boolean) => {
      'worklet';

      if (isFinished) {
        runOnJS(openEnd)();
      }
    };

    const openModal = () => {
      execFunc(onModalWillShow);

      reBackdropOpacity.value = sharedTiming(backdropOpacity, undefined, (isFinished) => {
        'worklet';
        if (isFinished) {
          if (!entering) {
            onEndAnimatedOpen(isFinished);
          }
        }
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const closeModal = () => {
      execFunc(onModalWillHide);

      if (exiting) {
        execFunc(onSetClose);
      }

      reBackdropOpacity.value = sharedTiming(0, { duration: exiting ? 300 : 0 }, (isFinished) => {
        'worklet';
        if (isFinished) {
          if (!exiting) {
            onEndAnimatedClose(isFinished);
          }
        }
      });
    };

    const renderBackdrop = () => {
      return (
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <AnimatedBox style={[backDropStyle, reBackdropStyle]}>{customBackDrop}</AnimatedBox>
        </TouchableWithoutFeedback>
      );
    };

    const onBackButtonPress = () => {
      execFunc(onBackAndroidPress);

      return true;
    };

    const contentView = () => {
      return (
        <AnimatedBox pointerEvents="box-none" style={[styles.content, style]}>
          <AnimatedBox
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            entering={(entering as any)?.withCallback(onEndAnimatedOpen)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            exiting={(exiting as any)?.withCallback(onEndAnimatedClose)}>
            {children}
          </AnimatedBox>
        </AnimatedBox>
      );
    };

    // effect
    useImperativeHandle(
      ref,
      () => ({
        dismiss: () => {
          closeModal();

          Keyboard.dismiss();
        },
      }),
      [closeModal]
    );

    useDisableBackHandler(true, onBackButtonPress);

    useEffect(() => {
      openModal();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // props
    const modalViewProps = useAnimatedProps<ReOmit<ViewProps, 'style'>>(() => ({
      pointerEvents: reBackdropOpacity.value === backdropOpacity ? 'auto' : 'none',
    }));

    // render
    return (
      <AnimatedBox animatedProps={modalViewProps} style={styles.modal}>
        {renderBackdrop()}
        {contentView()}
      </AnimatedBox>
    );
  }
);

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ModalContent = {
  dismiss: () => void;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
});
