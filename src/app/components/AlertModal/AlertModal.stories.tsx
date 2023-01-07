import { storiesOf } from '@storybook/react-native'
import { CentredContent } from '../CentredContent/CentredContent';
import {
  AlertModal,
  ModalType
} from './AlertModal';

storiesOf('Components', module)
.addDecorator((getStory) => <CentredContent>{ getStory() }</CentredContent>)
  .add('AlertModal', () => (
    <AlertModal
      modalVisible={true}
      setModalVisible={null}
      modalType={ModalType.CallAlert}
      confirmAction={() => {}}
    />
  ))