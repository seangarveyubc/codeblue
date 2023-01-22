import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colours from '../../constants/Colours';
import { ForwardArrow } from '../ForwardArrow/ForwardArrow';

export enum OptionType {
    AccountInfo,
    MedicalInfo,
    Tutorial,
    Legal
}

const OPTION_TYPE = [
    // AccountInfo
    {
        icon: <Ionicons name="person" size={25} color={Colours.DARKBLUE} />,
        title: 'Account Information'
    },
    // MedicalInfo
    {
        icon: (
            <FontAwesome5
                name="briefcase-medical"
                size={25}
                color={Colours.DARKBLUE}
            />
        ),
        title: 'Medical Information'
    },
    // Tutorial
    {
        icon: <FontAwesome5 name="play" size={25} color={Colours.DARKBLUE} />,
        title: 'CodeBlue Tutorial Video'
    },
    // Legal
    {
        icon: (
            <FontAwesome5 name="paperclip" size={25} color={Colours.DARKBLUE} />
        ),
        title: 'Legal'
    }
];

interface Props {
    optionType: OptionType;
    onPress: any;
}

export const SettingsOption = ({ optionType, onPress }: Props) => {
    return (
        <TouchableRipple
            style={styles.container}
            onPress={onPress}
            rippleColor="rgba(0, 0, 0, .32)"
        >
            <View style={styles.row}>
                <View style={styles.icon}>{OPTION_TYPE[optionType].icon}</View>
                <Text style={styles.text}>{OPTION_TYPE[optionType].title}</Text>
                <View style={styles.arrow}>
                    <ForwardArrow label={''} />
                </View>
            </View>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        borderColor: Colours.LIGHTGREY
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 12
    },
    icon: {
        margin: 5,
        marginHorizontal: 10
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: Colours.BLACK,
        alignItems: 'center',
        fontFamily: 'DMSans-Regular'
    },
    arrow: {
        alignSelf: 'flex-end'
    }
});
