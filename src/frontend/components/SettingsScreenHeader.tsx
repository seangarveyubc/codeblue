import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Colours from '../../utilities/Colours';
import { BackArrow } from './utils/BackArrow';

interface Props {
    title: string;
    navigation: any;
}

export const SettingsScreenHeader = ({ navigation, title }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.semicircle}>
                <View style={styles.header}>
                    <BackArrow
                        onPress={() => navigation.goBack()}
                        label={'Back'}
                        colour={Colours.WHITE}
                    />
                    <Text style={styles.text}>{title}</Text>
                </View>
            </View>
        </View>
    );
};
const window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: window.width,
        overflow: 'hidden',
        height: window.width / 3
    },
    semicircle: {
        borderRadius: window.width,
        width: window.width * 2.2,
        height: window.width * 2,
        marginLeft: -(window.width / 1.66),
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colours.DARKBLUE
    },
    header: {
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: window.width / 3,
        width: window.width / 1.1,
        position: 'absolute',
        bottom: 0,
        paddingTop: '5%',
        paddingBottom: '10%',
        flexDirection: 'column'
    },
    text: {
        fontSize: 28,
        fontFamily: 'DMSans-Bold',
        alignSelf: 'center',
        color: Colours.WHITE
    }
});
