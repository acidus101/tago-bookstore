import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// importing screens 
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import DescriptionScreen from "./screens/DescriptionScreen";
import OrderScreen from "./screens/OrderScreen";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const HomeTabScreen = () => (
    <Tabs.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home-outline';
                } else if (route.name === 'Order') {
                    iconName = focused ? 'cart' : 'cart-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
        })}>
        <Tabs.Screen name="Home" component={HomeScreen} />
        <Tabs.Screen name="Order" component={OrderScreen} />
    </Tabs.Navigator>
)

export default function navigation() {

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Homet" component={HomeTabScreen} />
            <Stack.Screen name="Desc" component={DescriptionScreen} />
        </Stack.Navigator>
    )
}
