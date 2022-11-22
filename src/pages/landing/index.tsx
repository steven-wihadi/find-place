import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MarkerPin from '../../assets/images/map-pin.png';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AutoCompleteSearchBar from './autoCompleteSearchBar';
import { useReducer } from 'react';
import landingReducer from '../../redux/landingReducer';

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

const LandingPage = () => {
  const initialState = {
    currentSearch: [],
    lon: '51.505',
    lat: '-0.09',
  };
  const [landingState, dispatch] = useReducer(landingReducer, initialState);

  const onClickPlace = (place, isCurrent) => {
    dispatch({ type: 'SET_LON_LAT', lon: place.lon, lat: place.lat });

    if (!isCurrent) {
      dispatch({ type: 'ADD_TO_CURRENT_SEARCH', place });
    }
  }

  return (
    <div>
      <AutoCompleteSearchBar currentSearch={ landingState.currentSearch } onClickPlace={(place, isCurrent) => onClickPlace(place, isCurrent) } />
      <MapContainer
        style={{ height: "100vh", width: "100%" }}
        key={JSON.stringify([Number(landingState.lon), Number(landingState.lat)])}
        center={[Number(landingState.lon), Number(landingState.lat)]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <ChangeMapView coords={[Number(landingState.lon), Number(landingState.lat)]}/> 
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[Number(landingState.lon), Number(landingState.lat)]}
          icon={new Icon({iconUrl: MarkerPin, iconSize: [41, 41], iconAnchor: [12, 41]})}
        >
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LandingPage;
