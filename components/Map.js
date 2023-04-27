import React,{useState,useRef, useEffect} from 'react'
import { View, Text } from 'react-native'
import MapView,{ Marker ,Polyline} from 'react-native-maps'
import { useSelector } from 'react-redux';
import { selectOrigin,selectDestination } from '../slices/navSlice';
import {MapViewDirections} from 'react-native-maps-directions';
import tw from "tailwind-react-native-classnames";
import { GOOGLE_MAPS_APIKEY } from '@env';
import getDirections from '../utils/getDirections'



export default function Map() {

    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    console.log('origin',origin)
    console.log('description',destination)
    const mapRef = useRef(null)
    const [latitudeDelta, setLatitudeDelta] = useState(0.005)
    const [longitudeDelta, setLongitudeDelta] = useState(0.005)
    const [coords, setCoords] = useState([]);

    useEffect(()=>{
        mapRef.current.fitToElements(true)
        if(!origin || !destination) return;
        
        getDirections(`${origin.location.lat},${origin.location.lng}`, `${destination.location.lat},${destination.location.lng}`)
        .then(coords => {
            setCoords(coords)
            setLatitudeDelta(1)
            setLongitudeDelta(1)
        })
        .catch(err => console.log("Something went wrong"));
        
        mapRef.current.fitToSuppliedMarkers(["origin","destination"],{
            edgePadding: {
                right: 50,
                bottom: 50,
                left: 50,
                top: 50,
            },
            animated: true,
        })

    },[origin,destination])
    
    return (
        <MapView
            ref={mapRef}
            style={{ 
                flex: 1,
            }}
            mapType="standard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
            }}
        >   
            {origin && destination && (
                <Marker
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
                title="Destination"
                description={destination.description}
                indentifier="destination"
            />
            )}
            {coords.length > 0 && (
              <Polyline 
                coordinates={coords} 
                strokeColor={"#000"}
                strokeWidth={3} 
                />  
            )} 
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    indentifier="origin"
                />
            )}
            
        </MapView>

    )
}
