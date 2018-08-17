import React from 'react';
import HomeScreen from '../views/HomeScreen'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import DetailsScreen from '../views/DetailsScreen'
import AddScreen from '../views/AddScreen'
import SettingsScreen from '../views/SettingsScreen'
import Ionicons from "react-native-vector-icons/Ionicons"

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
    Home: {
        screen: HomeStack
    },
    Settings: {
        screen: SettingsStack
    }
}, 
{ 
    initialRouteName: 'Home',
    navigationOptions: ({navigation}) => (
        { 
            tabBarVisible: navigation.state.index === 0,
            headerStyle: {
                backgroundColor: '#f4511e'
            },
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state
                let iconName
                if (routeName === 'Home') {
                    
                    iconName = "ios-home"
                    return <Ionicons name={iconName} size={25} color={tintColor} />
                } else if (routeName === 'Settings') {
                    iconName = "ios-settings"
                    return <Ionicons name={iconName} size={25} color={tintColor} />
                }

            }

        }
    )
})

export const RootStack = createStackNavigator({
    Tabs: TabNavigator,
    MyModal: AddScreen
}, 
{
    mode: 'modal',
    headerMode: 'none',
})

