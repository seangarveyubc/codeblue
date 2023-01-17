import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Colours from '../../../constants/Colours';
import UnderlineDDSelect from '../../../components/UnderlineDDSelect';
import UnderlineTextInput from '../../../components/UnderLineTextInput';

interface Props {
    edit: boolean;
    firstName: string;
    lastName: string;
    birthday: string;
    height: string;
    weight: string;
    bloodType: string;
    sex: string;
    setFirstName: any;
    setLastName: any;
    setBirthday: any;
    setHeight: any;
    setWeight: any;
    setBloodType: any;
    setSex: any;
}
export const UserInformation = ({
    edit,
    firstName,
    lastName,
    birthday,
    height,
    weight,
    bloodType,
    sex,
    setFirstName,
    setLastName,
    setBirthday,
    setHeight,
    setWeight,
    setBloodType,
    setSex
}: Props) => {
    // Based on the edit flag, return the corresponding view
    return edit ? (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.item}>
                    <UnderlineTextInput
                        text={firstName}
                        onChangeText={setFirstName}
                        title={'First Name'}
                        placeholder={''}
                    />
                </View>
                <View style={styles.item}>
                    <UnderlineTextInput
                        text={lastName}
                        onChangeText={setLastName}
                        title={'Last Name'}
                        placeholder={''}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={{ ...styles.item, ...{ width: '100%' } }}>
                    <UnderlineTextInput
                        text={birthday}
                        onChangeText={setBirthday}
                        title={'Birthday'}
                        placeholder={'DD/MM/YYYY'}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.item}>
                    <UnderlineTextInput
                        text={height}
                        onChangeText={setHeight}
                        title={'Height'}
                        placeholder={''}
                    />
                </View>
                <View style={styles.item}>
                    <UnderlineTextInput
                        text={weight}
                        onChangeText={setWeight}
                        title={'Weight'}
                        placeholder={''}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.item}>
                    <UnderlineDDSelect
                        selectedValue={bloodType}
                        onValueChange={setBloodType}
                    />
                </View>
                <View style={styles.item}>
                    <UnderlineDDSelect
                        selectedValue={sex}
                        onValueChange={setSex}
                    />
                </View>
            </View>
        </View>
    ) : (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.item}>
                    <Text style={styles.title}>{'First Name'}</Text>
                    <Text style={styles.input}>{firstName}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>{'Last Name'}</Text>
                    <Text style={styles.input}>{lastName}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={{ ...styles.item, ...{ width: '100%' } }}>
                    <Text style={styles.title}>{'Birthday'}</Text>
                    <Text style={styles.input}>{birthday}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.item}>
                    <Text style={styles.title}>{'Height'}</Text>
                    <Text style={styles.input}>{height}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>{'Weight'}</Text>
                    <Text style={styles.input}>{weight}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.item}>
                    <Text style={styles.title}>{'Blood Type'}</Text>
                    <Text style={styles.input}>{bloodType}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>{'Blood Type'}</Text>
                    <Text style={styles.input}>{bloodType}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: '5%'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 10
    },
    item: {
        width: '50%',
        paddingHorizontal: '3%'
    },
    input: {
        paddingLeft: 4,
        fontFamily: 'DMSans-Regular',
        color: Colours.BLACK,
        fontSize: 18,
        width: '100%',
        paddingTop: 4
    },
    title: {
        fontFamily: 'DMSans-Regular',
        paddingLeft: 4,
        color: Colours.BLUE,
        fontSize: 15
    }
});
