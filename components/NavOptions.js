import React from 'react'
import { StyleSheet, Text, View,FlatList, TouchableOpacity,Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import {Icon} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
    {
        id:"123",
        title:"Get a ride",
        image:"https://links.papareact.com/3pn",
        screen:"MapScreen",
    },
    {
        id:"456",
        title:"Order food",
        image:"https://links.papareact.com/28w",
        screen:"EatsScreen",
    }
];

export default function NavOptions() {

    const navigation = useNavigation();
    const origin = useSelector(selectOrigin)

    return (
        <FlatList
        horizontal
        data={data}
        keyExtractor={(item)=>item.id}
        renderItem={({ item })=>(
            <TouchableOpacity
                onPress={() => navigation.navigate(item.screen)} 
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2`}
                disabled={!origin}    
            >
                <View style={!origin && {opacity:0.5}}>
                    <Image 
                        source={{uri: item.image}} 
                        style={{width:100,height:100,resizeMode:"contain"}}
                    />
                <Text style={tw`mt-2 text-lg font-semibold text-black`}>{item.title}</Text>
                <Icon
                    style={tw`p-2 bg-black rounded-full w-10 mt-4`} 
                    name="arrowright"
                    color="white"
                    type = "antdesign"
                    />
                </View>
            </TouchableOpacity>
        )}
        />
    )
}

const styles = StyleSheet.create({})
