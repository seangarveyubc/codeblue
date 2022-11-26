import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colours from '../../../../utilities/Colours';
import { SettingsScreenHeader } from '../../../components/SettingsScreenHeader';
import { UserMedicalInfo } from './UserMedicalInfo';

interface Props {
    navigation: any;
}

export const MedicalInfoScreen = ({ navigation }: Props) => {
    const [edit, setEdit] = React.useState(false);
    const [personalHistory, setPersonalHistory] = React.useState('');
    const [familyHistory, setFamilyHistory] = React.useState('');
    const onPress = () => {
        setEdit(!edit);
    };
    return (
        <View style={styles.container}>
            <SettingsScreenHeader
                navigation={navigation}
                title="Medical Information"
            />
            <View style={styles.subHeading}>
                <Text style={styles.subHeadingText}>{'Medical History'}</Text>
                <Text style={styles.edit} onPress={onPress}>
                    {edit ? 'Save' : 'Edit'}
                </Text>
            </View>

            <UserMedicalInfo
                edit={edit}
                personalHistory={personalHistory}
                familyHistory={familyHistory}
                setPersonalHistory={setPersonalHistory}
                setFamilyHistory={setFamilyHistory}
            />

            <View style={styles.subHeading}>
                <Text style={styles.subHeadingText}>{'Medication'}</Text>
            </View>
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
