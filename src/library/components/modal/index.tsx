import { Portal } from '@gorhom/portal';
import { useEffect, useRef, useState } from 'react';

import { ModalContent } from './modal-content';
import { ModalProps } from './type';

import { useDismissKeyboard } from '~/src/common/hooks';

export const Modal = (props: ModalProps) => {
  // state
  const [visible, setVisible] = useState<boolean>(props.isVisible);

  const modalContent = useRef<ModalContent>(null);

  // function
  const closeModal = () => {
    setVisible(false);
  };

  // effect
  useDismissKeyboard(visible);

  useEffect(() => {
    if (props.isVisible) {
      setVisible(true);
    } else {
      modalContent.current?.dismiss();
    }
  }, [props.isVisible]);

  // render
  return (
    <Portal hostName="AppModal">
      {visible ? <ModalContent onSetClose={closeModal} ref={modalContent} {...props} /> : null}
    </Portal>
  );
};
