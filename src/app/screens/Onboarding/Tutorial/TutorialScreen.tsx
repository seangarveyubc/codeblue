import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colours from '../../../constants/Colours';
import { CentredContent } from '../../../components/CentredContent/CentredContent';
import Video from 'react-native-video';
import { normalize } from '../../../utils/normalizer/normalizer';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/constants';

interface Props {
    navigation: any;
}

const video = require('../../../assets/JY041_CanSAVE_Video_V1.mp4');
const VERTICAL_SPACE = normalize(40);

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
                        size={normalize(40)}
                    />
                    <Text style={styles.titleText}>
                        <Text style={{ color: Colours.BLUE }}>CodeBlue</Text>{' '}
                        Tutorial
                    </Text>
                </View>
                <Video
                    source={video}
                    style={styles.video}
                    resizeMode="contain"
                />
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
        paddingHorizontal: SCREEN_WIDTH * 0.05
    },
    skipText: {
        fontFamily: 'DMSans-Regular',
        fontSize: normalize(18),
        color: Colours.BLUE,
        marginTop: normalize(16),
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
        fontSize: normalize(24),
        color: Colours.BLACK
    },
    video: {
        height: SCREEN_HEIGHT * 0.5,
        width: SCREEN_WIDTH * 0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    videoDescription: {
        fontFamily: 'DMSans-Regular',
        fontSize: normalize(18),
        color: Colours.BLACK,
        textAlign: 'center',
        marginTop: VERTICAL_SPACE
    }
});
