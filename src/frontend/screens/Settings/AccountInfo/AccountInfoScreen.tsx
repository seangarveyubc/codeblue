import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colours from '../../../../utilities/Colours';
import { SettingsScreenHeader } from '../../../components/SettingsScreenHeader';
import { UserInformation } from './UserAccountInfo';

interface Props {
    navigation: any;
}

export const AccountInfoScreen = ({ navigation }: Props) => {
    const [edit, setEdit] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [birthday, setBirthday] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [bloodType, setBloodType] = React.useState('');
    const [sex, setSex] = React.useState('');
    const onPress = () => {
        setEdit(!edit);
    };
    return (
        <View style={styles.container}>
            <SettingsScreenHeader title="Account Information" />
            <View style={styles.subHeading}>
                <Text style={styles.subHeadingText}>{'Basic Information'}</Text>
                <Text style={styles.edit} onPress={onPress}>
                    {edit ? 'Save' : 'Edit'}
                </Text>
            </View>

            <UserInformation
                edit={edit}
                firstName={firstName}
                lastName={lastName}
                birthday={birthday}
                height={height}
                weight={weight}
                bloodType={bloodType}
                sex={sex}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setBirthday={setBirthday}
                setHeight={setHeight}
                setWeight={setWeight}
                setBloodType={setBloodType}
                setSex={setSex}
            ></UserInformation>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: '100%', backgroundColor: Colours.WHITE },
    title: {
        fontSize: 28,
        fontFamily: 'DMSans-Bold',
        alignSelf: 'center',
        color: Colours.WHITE
    },
    subHeading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5%',
        marginHorizontal: '3%'
    },
    subHeadingText: {
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
        color: Colours.BLACK
    },
    edit: {
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
        color: Colours.BLUE
    }
});
