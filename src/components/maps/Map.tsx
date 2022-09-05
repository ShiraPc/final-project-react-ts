import { Circle, DirectionsRenderer, GoogleMap, Marker, MarkerClusterer, useLoadScript } from "@react-google-maps/api";
import cluster from "cluster";
import { useCallback, useMemo, useRef, useState } from "react";
import Grid from '@mui/material/Grid';
import MenuAppBar from "../BarInMapPage";
import AutoComplete from "./AutoComplete";
import Distance from "./Distance";
import axios from "axios";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectiosResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map() {
    const pinColor='#000000';
    const [office, setOffice] = useState<LatLngLiteral>();
    const [directions, setDirections] = useState<DirectiosResult>();
    const mapRef = useRef<GoogleMap>()
    const center = useMemo<LatLngLiteral>(() => ({ lat: 32, lng: 35 }), []);
    const JerusalemPosition = useMemo<LatLngLiteral>(() => ({ lat: 31.771959, lng: 35.217018 }), []);
    const options = useMemo<MapOptions>(() => ({
        disableDefaultUi: true,
        clickableIcons: true,
    }), []);
    const optionsMarker = {
        imagePath:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
    }

    const onLoad = useCallback((map: any) => (mapRef.current = map), []);

    const houses = useMemo(() => generateHouses(), [center]);
    console.log(houses.map(element => element.lat));
    

    const fetchDirections = (_houses: LatLngLiteral) => {
        if (!office) return;
        const service = new google.maps.DirectionsService();
        service.route(
            {
                origin: _houses,
                destination: office,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === "OK" && result) {
                    setDirections(result);
                }
            }
        )
    }

  return <div className="container">
    <Grid container spacing={2}>
    <Grid item xs={20} md={20}>
                <MenuAppBar/>
        </Grid>
      <Grid item xs={60} md={9}>
        <div className="map">
          <GoogleMap
            zoom={10} center={center}
            mapContainerClassName="mapContainer"
            options={options}
            onLoad={onLoad} >
             {directions&&(<DirectionsRenderer directions={directions}
                 options={{polylineOptions:{
                    zIndex:50,
                    strokeColor:"#1976D2",
                    strokeWeight:5,
                    },
                 }}/>)}

                {office && (
                    <>
                       <Marker position={office} />
                                     <MarkerClusterer>
              {(clusterer:any|MarkerClusterer | Readonly<MarkerClusterer>): any=>
               houses.map((h:LatLngLiteral) => (
              <Marker
                key={h.lat}
                icon={{path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  strokeColor: "black",
                  scale: 5}}
                position={h}
                clusterer={clusterer}
                onClick={()=>{
                  fetchDirections(h)
                }}
                />
                ))
                }
             </MarkerClusterer>
           
              <Marker position={office} />
              <Circle center={office} radius={15000} options={closeOptions} />
              <Circle center={office} radius={30000} options={middleOptions} />
              <Circle center={office} radius={45000} options={farOptions} />

            </>)}
          </GoogleMap>
      </div></Grid>
      <Grid item xs={60} md={3}>
      <div className="controls">
            <AutoComplete
                setOffice={(position: any) => {
                    setOffice(position);
                    mapRef.current?.panTo(position);
                }} />
                {!office && <p>Enter the address of you</p>}
                {directions&&<Distance leg={directions.routes[0].legs[0]}/>}
        </div></Grid>
    </Grid>

  </div>
}

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickAble: false,
    drageAble: false,
    editAble: false,
    visible: true
}

const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A"
};

const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D"
};

const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252"
};
const generateHouses= ()=>
{
  let data;
  const h: Array<LatLngLiteral>=[];
  try {
        axios.get('http://localhost:3333/location').then((res)=>{data=res
       res.data.forEach((l: { location_geolocation: { lat: any; len: any; }; })=>{h.push({
       lat:l.location_geolocation.lat,
       lng:l.location_geolocation.len
    })})
    console.log(h);
  });
  
  } catch (error) {
    console.log(error);
  }
  return h;

}