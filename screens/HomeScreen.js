import React from 'react'
import { View, Text ,StyleSheet ,SafeAreaView,Image,Button} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import {setDestination, setOrigin} from '../slices/navSlice'
import { LocalNotification } from '../services/LocalPushController'
import RemotePushController from '../services/RemotePushController'
import NavFavourites from '../components/NavFavourites';


export default function HomeScreen(){

    const dispatch = useDispatch()
    const handleButtonPress = () => {
        LocalNotification()
    }

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image 
                style={{
                    width:100,
                    height:100,
                    resizeMode:'contain',
                }}
                source={{
                    uri:"https://links.papareact.com/gzs",
                }}
                />

                <GooglePlacesAutocomplete
                    placeholder="Where From?"
                    textInputProps = {{ placeholderTextColor: '#c5cfd1' }}
                    renderRow={(rowData) => {
                        const title = rowData.structured_formatting.main_text;
                        const address = rowData.structured_formatting.secondary_text;
                        return (
                         <View>
                          <Text style={{ fontSize: 14 ,color:"#000",fontWeight:"bold" }}>{title}</Text>
                          <Text style={{ fontSize: 14 ,color:"#000",fontWeight:"bold"}}>{address}</Text>
                         </View>
                         );
                    }}
                    styles={{
                        container:{
                            flex:0,
                        },
                        textInput: {
                            fontSize:18,
                            color: '#000', 
                        },
                    }}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                        }))

                        dispatch(setDestination(null))
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query ={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    />

            <NavOptions />
            {/* <View>
                <Text>Press a button to trigger the notification</Text>
                <View style={{ marginTop: 20 }}>
                    <Button title={'Local Push Notification'} onPress={handleButtonPress} />
                </View>
                <RemotePushController />
            </View> */}
            <NavFavourites/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonContainer: {
        marginTop: 20
    }
})
