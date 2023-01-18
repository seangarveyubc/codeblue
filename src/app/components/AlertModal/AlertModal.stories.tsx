import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import {
  AlertModal,
  ModalType
} from './AlertModal';

const AlertModalStateful = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const onExit = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <AlertModal
    modalVisible={modalVisible}
    setModalVisible={onExit}
    modalType={ModalType.CallAlert}
    confirmAction={action("AlertModal confirm pressed")}
  />
  );
};

storiesOf('Components', module)
  .add('AlertModal', () => (
    <AlertModalStateful />
  ))