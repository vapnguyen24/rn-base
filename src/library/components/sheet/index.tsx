import { StyleSheet } from 'react-native';
import { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '~/src/library/components/core/Box';
import { Modal } from '~/src/library/components/modal';
import { SheetProps } from '~/src/library/components/sheet/type';
import { Spacer } from '~/src/library/components/spacer';

export const Sheet = ({ children, hideIndicator, ...rest }: SheetProps) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Modal style={styles.container} entering={SlideInDown} exiting={SlideOutDown} {...rest}>
      <Box backgroundColor="white" borderTopLeftRadius="xl_24" borderTopRightRadius="xl_24">
        {!hideIndicator && (
          <Box
            height={4}
            width={50}
            backgroundColor="neutral200"
            marginTop="m_16"
            alignSelf="center"
            borderRadius="l_12"
          />
        )}
        {children}
        <Spacer height={bottom} />
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
});
