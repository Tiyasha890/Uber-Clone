import React from 'react'
import { View, Text,SafeAreaView,StyleSheet,ScrollView, TouchableOpacity } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import tw from "tailwind-react-native-classnames"
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import {setDestination} from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native';
import NavFavourites from '../components/NavFavourites'
import { Icon } from 'react-native-elements';



export default function NavigatorCard() {
    
    const dispatch = useDispatch()
    const navigation = useNavigation()

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl text-black font-bold`}>Good Morning, Binit</Text>
            <View style={tw`border-t border-gray-100 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder='Where to?'
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
                        minLength={2}
                        textInputProps = {{ placeholderTextColor: '#c5cfd1' }}
                        renderRow={(rowData) => {
                            const title = rowData.structured_formatting.main_text;
                            const address = rowData.structured_formatting.secondary_text;
                            return (
                             <View style={{width: '90%'}}>
                              <Text style={{ fontSize: 14 ,color:"#000",fontWeight:"bold" }}>{title}</Text>
                              <Text style={{ fontSize: 14 ,color:"#000",fontWeight:"bold"}}>{address}</Text>
                             </View>
                             );
                        }}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                    location: details.geometry.location,
                                    description: data.description,
                                })
                            )
                            
                            navigation.navigate("RideOptionCard")
                        }}
                        enablePoweredByContainer={false}
                        styles={toInputBoxStyles}
                        query ={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en',
                        }}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        
                    />
                </View>
                <NavFavourites/>
            </View>
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                    onPress={()=>{
                        navigation.navigate("RideOptionCard")
                    }}
                >
                    <Icon name="car" type="font-awesome" color="white" size={16}/>
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon name="car" type="font-awesome" color="black" size={16}/>
                    <Text style={tw`text-black text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const toInputBoxStyles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 10,
        fontSize: 16,
        color:'black',
        fontWeight: 'bold'
    },
    textInputContainer:{
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})