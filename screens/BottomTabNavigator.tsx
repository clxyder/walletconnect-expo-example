import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import ActiveChats from './ActiveChats';


const BottomTab = createBottomTabNavigator<RootTabParamList>();
export default function BottomTabNavigator({navigation}: any) {
    const colorScheme = useColorScheme();
  
    return (
      
      <BottomTab.Navigator
        initialRouteName="TabOne"
       >
        <BottomTab.Screen
          name="TabOne"
          component={ActiveChats}
          
        />
        <BottomTab.Screen
          name="TabTwo"
          component={TabTwoScreen}
          options={{
            title: 'Tab Two',
            tabBarIcon: ({ color }) => <TabBarIcon name="square" color={color} />,
          }}
        />
      </BottomTab.Navigator>
    );
  }

  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
  }