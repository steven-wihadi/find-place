import { useState } from "react";
import PlaceList, { Place } from "../../components/placeList";
import SearchBar from "../../components/searchBar";
import API from "../../services/apiService";

interface PropTypes {
  onClickPlace?: (place: Place) => void;
}

const AutoCompleteSearchBar = (props: PropTypes) => {
  const inputStyle = { position: 'absolute', top: '8px', left: '52px', zIndex: '999' };
  const [isFetch, setIsFetch] = useState(false);
  const [placeList, setPlaceList] = useState([]);

  const onClickSearch = (keyword) => {
    setIsFetch(true);
    const link = `https://api.locationiq.com/v1/autocomplete?key=pk.9b254bf7cb5be233afb04532d9b825b8&q=${keyword}`;
    API.get(link).then(res => {
      const result = [];
      if (res.status === 200) {
        const data = res.data;
        data.forEach((place, index) => {
          result.push({
            display_place: place.display_place,
            display_address: place.display_address,
            lon: place.lon,
            lat: place.lat,
            place_id: `${place.place_id}--${index}`
          });
        });

        setPlaceList(result);
        setIsFetch(false);
      }
    }, err => {
      setIsFetch(false);
      setPlaceList([]);
    });
  }

  const toogleClickPlace = (place) => {
    if (props.onClickPlace) {
      props.onClickPlace(place);
    }
  }

  return (
    <>
      <SearchBar style={ inputStyle } onClickSearch={ onClickSearch }/>
      { placeList.length !== 0 &&
        <PlaceList places={ placeList } isFetch={ isFetch } onClickPlace={ toogleClickPlace }/>
      }
    </>
  );
}

export default AutoCompleteSearchBar;