import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import Colours from '../../../../utilities/Colours';
import { ForwardArrow } from '../../../components/utils/ForwardArrow';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
    onPress: any;
    title: string;
    iconName: string;
}

export const SettingsOption = ({ onPress, title, iconName }: Props) => {
    var displayIcon: boolean = true;
    if (iconName) displayIcon = true;
    else displayIcon = false;

    return (
        <TouchableRipple
            style={styles.container}
            onPress={onPress}
            rippleColor="rgba(0, 0, 0, .32)"
        >
            <View style={styles.row}>
                <Icon
                    style={displayIcon ? styles.icon : { width: 0 }}
                    size={25}
                    name={iconName}
                    solid={true}
                />
                <Text style={styles.text}>{title}</Text>
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
        width: 25,
        color: Colours.DARKBLUE,
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
