import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { AddDeviceScreen } from '../screens/AddDevice/AddDeviceScreen';
import { SettingsStack } from './SettingsStack';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colours from '../../utilities/Colours';

const NavBar = createBottomTabNavigator();

interface Props {
    navigation: any;
}

export const MainNavigator = ({ navigation }: Props) => {
    return (
        <NavBar.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colours.BLUE,
                tabBarInactiveTintColor: Colours.GREY,
                tabBarStyle: {
                    backgroundColor: Colours.WHITE,
                    height: 65,
                    justifyContent: 'center'
                },
                tabBarIconStyle: {
                    marginTop: 10
                },
                tabBarLabelStyle: {
                    marginBottom: 10
                },
                tabBarLabelPosition: 'below-icon'
            }}
        >
            <NavBar.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcon
                            name="home"
                            color={color}
                            size={28}
                        />
                    )
                }}
            />
            <NavBar.Screen
                name="Add Device"
                component={AddDeviceScreen}
                options={{
                    tabBarIcon: () => (
                        <AntDesign
                            name="pluscircle"
                            color={Colours.DARKBLUE}
                            size={65}
                        />
                    ),
                    tabBarIconStyle: {
                        marginTop: -33
                    }
                }}
            />
            <NavBar.Screen
                name="Settings"
                component={SettingsStack}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcon name="settings" color={color} size={28} />
                    )
                }}
            />
        </NavBar.Navigator>
    );
};
