import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { View, Text ,SafeAreaView ,Image} from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'


const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image:"https://links.papareact.com/3pn",
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {   
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    }
];


export default function RideOptionCard() {

    const navigation = useNavigation()

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
                    onPress={() => navigation.navigate("NavigatorCard")}
                >
                    <Icon name="chevron-left" type="feather" color="black" size={30} />
                </TouchableOpacity>

                <Text style={tw`text-center py-5 text-xl text-black`}>Select a ride</Text>
            </View>
            <FlatList 
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={({ item:{id,title,multiplier,image} })=>(
                    <TouchableOpacity>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={{uri: image}}
                        />
                        <View>
                            <Text>{title}</Text>
                            <Text>Travel time..</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}
