import React from 'react'
import { View, Text } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigatorCard from '../components/NavigatorCard'
import RideOptionCard from '../components/RideOptionCard'



export default function MapScreen() {
    const Stack = createNativeStackNavigator();
    return (
        <View>
            <View style={tw`h-1/2`}>
                <Map />
            </View>    
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="NavigatorCard"
                        component={NavigatorCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="RideOptionCard"
                        component={RideOptionCard}
                        options={{
                            headerShown: false,
                        }}
                    />                            
                </Stack.Navigator>
            
            </View>
        </View>
    )
}
