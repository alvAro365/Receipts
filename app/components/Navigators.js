import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import HomeScreen from '../views/HomeScreen'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import DetailsScreen from '../views/DetailsScreen'
import InfoScreen from '../views/InfoScreen'
import SettingsScreen from '../views/SettingsScreen'

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const HomeStack = createStackNavigator(
    {
        Cities: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    // initialRouteName:'Home',
    navigationOptions: {
          headerStyle: {
            //   backgroundColor: 'steelblue'
          },
        //   headerTintColor: '#fff',
          headerTitleStyle: {
              fontWeight: 'bold',
          }
    }
  })

const SettingsStack = createStackNavigator(
    { 
        Settings: { 
            screen: SettingsScreen 
        }, 
        Details: {
            screen: DetailsScreen 
        },
    }, 
    { 
        navigationOptions: { 
            headerStyle: {
                //  backgroundColor: "steelblue" 
                }, 
                // headerTintColor: '#fff',
                headerTitleStyle: { 
                    fontWeight: 'bold' 
                } 
            }
        }) 

const TabNavigator = createBottomTabNavigator({
    Cities: {
        screen: HomeStack
    },
    Settings: {
        screen: SettingsStack
    }
}, 
{ 
    initialRouteName: 'Cities',
    navigationOptions: ({navigation}) => (
        { 
            tabBarVisible: navigation.state.index === 0,
            headerStyle: {
                backgroundColor: '#f4511e'
            },
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state
                let iconName
                if (routeName === 'Cities') {
                    
                    // iconName = `ios-home${focused ? '' : '-outline'}`
                    iconName = "city"
                    return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />
                } else if (routeName === 'Settings') {
                    iconName = `ios-settings${focused ? '' : '-outline'}`
                    return <Ionicons name={iconName} size={25} color={tintColor} />
                }

            }

        }
    )
})

export const RootStack = createStackNavigator({
    Tabs: TabNavigator,
    MyModal: InfoScreen
}, 
{
    mode: 'modal',
    headerMode: 'none',
})

