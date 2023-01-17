import { storiesOf } from '@storybook/react-native'
// import { withKnobs, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import {
  AlertModal,
  ModalType
} from './AlertModal';

// const options = [ModalType.CallAlert, ModalType.CancelAlert, ModalType.ResetAlert];
// const defaultValue = ModalType.CallAlert;
// const groupId = 'GROUP-ID2';
// const modalTypes = select("Modal types", options, defaultValue, groupId);

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
  // .addDecorator(withKnobs)
  .add('AlertModal', () => (
    <AlertModalStateful />
  ))