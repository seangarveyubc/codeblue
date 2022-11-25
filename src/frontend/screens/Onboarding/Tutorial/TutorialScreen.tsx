import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colours from '../../../../utilities/Colours';
import { CentredContent } from '../../../components/CentredContent';

interface Props {
    navigation: any;
}

const VERTICAL_SPACE = 40;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const TutorialScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.screenContainer}>
            <Text
                style={styles.skipText}
                onPress={() => navigation.navigate('MainNavigator')}
            >
                Skip
            </Text>
            <CentredContent>
                <View style={styles.screenTitleRow}>
                    <MaterialCommunityIcon
                        name="hand-wave-outline"
                        color={Colours.BLACK}
                        size={40}
                    />
                    <Text style={styles.titleText}>
                        <Text style={{ color: Colours.BLUE }}>CodeBlue</Text>{' '}
                        Tutorial
                    </Text>
                </View>
                <View style={styles.video}>
                    <MaterialCommunityIcon
                        name="play"
                        color={Colours.WHITE}
                        size={40}
                    />
                </View>
                <Text style={styles.videoDescription}>
                    Access this video any time in the app{' '}
                    <Text style={{ color: Colours.BLUE }}>Settings</Text>
                </Text>
            </CentredContent>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        paddingHorizontal: windowWidth * 0.05
    },
    skipText: {
        fontFamily: 'DMSans-Regular',
        fontSize: 18,
        color: Colours.BLUE,
        marginTop: 16,
        textAlign: 'right'
    },
    screenTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: VERTICAL_SPACE
    },
    titleText: {
        fontFamily: 'DMSans-Bold',
        fontSize: 24,
        color: Colours.BLACK
    },
    video: {
        height: windowHeight * 0.5,
        width: windowWidth * 0.8,
        backgroundColor: Colours.BLACK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    videoDescription: {
        fontFamily: 'DMSans-Regular',
        fontSize: 18,
        color: Colours.BLACK,
        textAlign: 'center',
        marginTop: VERTICAL_SPACE
    }
});
