import React from 'react'
import HomeScreen from '../views/HomeScreen'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import DetailsScreen from '../views/DetailsScreen'
import AddScreen from '../views/AddScreen'
import InfoScreen from '../views/InfoScreen'
import CameraRoll from '../views/CameraRoll'
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
    navigationOptions: {
          headerStyle: {
          },
          headerTitleStyle: {
              fontWeight: 'bold',
          }
    }
  })

const InfoStack = createStackNavigator(
    { 
        InfoScreen: { 
            screen: InfoScreen 
        }, 
        Details: {
            screen: DetailsScreen 
        },
    }, 
    { 
        navigationOptions: { 
            headerStyle: {
                }, 
                headerTitleStyle: { 
                    fontWeight: 'bold' 
                } 
            }
        }) 
const ModalsStack = createStackNavigator(
    {
        AddScreen: {
            screen: AddScreen
        },
        CameraRollPicker: {
            screen: CameraRoll
        }
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
)

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack
    },
    Info: {
        screen: InfoStack
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
                } else if (routeName === 'Info') {
                    iconName = "ios-information-circle-outline"
                    return <Ionicons name={iconName} size={25} color={tintColor} />
                }

            }

        }
    )
})

export const RootStack = createStackNavigator({
    Tabs: TabNavigator,
    MyModal: ModalsStack
}, 
{
    mode: 'modal',
    headerMode: 'none',
}
)

