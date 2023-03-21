import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Colours from '../../constants/Colours';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { SCREEN_WIDTH } from '../../constants/constants';
import SelectDropdown from 'react-native-select-dropdown';
import { SensorLocations } from '../../constants/SensorLocations';

interface Props {
    name: string;
    onUpdateName: () => void;
    location?: number;
    onUpdateLocationIndex: (index: number) => void;
    deleteDevice: () => void;
    isConnected: boolean;
}

export const EditDeviceWidget = ({
    name,
    onUpdateName,
    location,
    onUpdateLocationIndex,
    deleteDevice,
    isConnected
}: Props) => {
    const statusIcon = isConnected ? (
        <CommunityIcon name="broadcast" size={25} color={Colours.BLACK} />
    ) : (
        <CommunityIcon name="broadcast-off" size={25} color={Colours.GREY} />
    );

    const nameInput = (
        <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={onUpdateName}
            placeholder={'Device Name'}
            placeholderTextColor={Colours.BLACK}
            autoCorrect={false}
        />
    );

    const locationDropdownSelect = (
        <SelectDropdown
            defaultButtonText={SensorLocations[location ?? 0]}
            data={SensorLocations}
            onSelect={(selectedItem, index) => {
                onUpdateLocationIndex(index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
            }}
            renderDropdownIcon={(isOpened) => {
                return (
                    <AntDesignIcon
                        name={isOpened ? 'up' : 'down'}
                        color={Colours.BLACK}
                        size={20}
                    />
                );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdownOptions}
            rowTextStyle={styles.dropdownRowTxtStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            buttonStyle={styles.dropdownContainer}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                {statusIcon}
                <View style={styles.middleContentColumn}>
                    {nameInput}
                    <View style={styles.bottomRow}>
                        <Text style={{ fontFamily: 'DMSans-Bold' }}>
                            Location:{' '}
                        </Text>
                        {locationDropdownSelect}
                    </View>
                </View>
                <Octicons
                    name="trash"
                    size={25}
                    color={Colours.RED}
                    onPress={deleteDevice}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 105,
        width: SCREEN_WIDTH * 0.88,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colours.DARKBLUE,
        backgroundColor: Colours.WHITE,
        padding: 14
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%'
    },
    middleContentColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: SCREEN_WIDTH * 0.65
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH * 0.65,
        marginTop: 5
    },
    nameInput: {
        height: 40,
        width: '100%',
        backgroundColor: Colours.LIGHTGREY,
        borderRadius: 8,
        padding: 8,
        fontFamily: 'DMSans-Regular',
        fontSize: 15,
        color: Colours.BLACK
    },
    dropdownContainer: {
        backgroundColor: Colours.LIGHTGREY,
        borderRadius: 8,
        height: 25,
        width: '72%'
    },
    dropdownOptions: {
        backgroundColor: Colours.LIGHTGREY,
        borderRadius: 8
    },
    dropdownBtnTxtStyle: {
        color: Colours.GREY,
        textAlign: 'left',
        fontFamily: 'DMSans-Regular',
        fontSize: 15
    },
    dropdownRowTxtStyle: {
        fontFamily: 'DMSans-Regular',
        fontSize: 15
    }
});
