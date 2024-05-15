import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
export function MapsTeste() {
  const position = { lat: 51.505, lng: -0.09 }
  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      ,
    </>
  )
}

// https://react-leaflet.js.org/

// import React, { useCallback, useMemo, useState } from 'react'
// import {
//   GoogleMap,
//   Marker,
//   LoadScript,
//   StandaloneSearchBox,
//   DirectionsService,
//   DirectionsRenderer,
// } from '@react-google-maps/api'
// // import { REACT_APP_GOOGLE_API_KEY } from '../App'
// import './MapPage.css'

// export interface MapPageProps {}

// export function MapPage() {
//   const [map, setMap] = React.useState<google.maps.Map>()
//   const [searchBoxA, setSearchBoxA] = useState<google.maps.places.SearchBox>()
//   const [searchBoxB, setSearchBoxB] = useState<google.maps.places.SearchBox>()
//   const [pointA, setPointA] = useState<google.maps.LatLngLiteral>()
//   const [pointB, setPointB] = useState<google.maps.LatLngLiteral>()

//   const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null)
//   const [destination, setDestination] =
//     useState<google.maps.LatLngLiteral | null>(null)

//   const [response, setResponse] =
//     useState<google.maps.DistanceMatrixResponse | null>(null)

//   const position = {
//     lat: -27.590824,
//     lng: -48.551262,
//   }

//   const onMapLoad = (map: google.maps.Map) => {
//     setMap(map)
//   }

//   const onLoadA = (ref: google.maps.places.SearchBox) => {
//     setSearchBoxA(ref)
//   }

//   const onLoadB = (ref: google.maps.places.SearchBox) => {
//     setSearchBoxB(ref)
//   }

//   const onPlacesChangedA = () => {
//     const places = searchBoxA!.getPlaces()
//     console.log(places)
//     const place = places![0]
//     const location = {
//       lat: place?.geometry?.location?.lat() || 0,
//       lng: place?.geometry?.location?.lng() || 0,
//     }
//     setPointA(location)
//     setOrigin(null)
//     setDestination(null)
//     setResponse(null)
//     map?.panTo(location)
//   }

//   const onPlacesChangedB = () => {
//     const places = searchBoxB!.getPlaces()
//     console.log(places)
//     const place = places![0]
//     const location = {
//       lat: place?.geometry?.location?.lat() || 0,
//       lng: place?.geometry?.location?.lng() || 0,
//     }
//     setPointB(location)
//     setOrigin(null)
//     setDestination(null)
//     setResponse(null)
//     map?.panTo(location)
//   }

//   const traceRoute = () => {
//     if (pointA && pointB) {
//       setOrigin(pointA)
//       setDestination(pointB)
//     }
//   }

//   const directionsServiceOptions =
//     // @ts-ignore
//     useMemo<google.maps.DirectionsRequest>(() => {
//       return {
//         origin,
//         destination,
//         travelMode: 'DRIVING',
//       }
//     }, [origin, destination])

//   const directionsCallback = useCallback((res) => {
//     if (res !== null && res.status === 'OK') {
//       setResponse(res)
//     } else {
//       console.log(res)
//     }
//   }, [])

//   const directionsRendererOptions = useMemo<any>(() => {
//     return {
//       directions: response,
//     }
//   }, [response])

//   return (
//     <div className="map">
//       <LoadScript
//         googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}
//         libraries={['places']}
//       >
//         <GoogleMap
//           onLoad={onMapLoad}
//           mapContainerStyle={{ width: '100%', height: '100%' }}
//           center={position}
//           zoom={15}
//         >
//           <div className="address">
//             <StandaloneSearchBox
//               onLoad={onLoadA}
//               onPlacesChanged={onPlacesChangedA}
//             >
//               <input
//                 className="addressField"
//                 placeholder="Digite o endereço inicial"
//               />
//             </StandaloneSearchBox>
//             <StandaloneSearchBox
//               onLoad={onLoadB}
//               onPlacesChanged={onPlacesChangedB}
//             >
//               <input
//                 className="addressField"
//                 placeholder="Digite o endereço final"
//               />
//             </StandaloneSearchBox>
//             <button onClick={traceRoute}>Traçar rota</button>
//           </div>

//           {!response && pointA && <Marker position={pointA} />}
//           {!response && pointB && <Marker position={pointB} />}

//           {origin && destination && (
//             <DirectionsService
//               options={directionsServiceOptions}
//               callback={directionsCallback}
//             />
//           )}

//           {response && directionsRendererOptions && (
//             <DirectionsRenderer options={directionsRendererOptions} />
//           )}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   )
// }
