import { useState } from "react";
import PlaceList, { Place } from "../../components/placeList";
import SearchBar from "../../components/searchBar";
import API from "../../services/apiService";

interface PropTypes {
  onClickPlace?: (place: Place, isCurrent: boolean) => void;
  currentSearch: Place[];
}
let isCurrent;

const AutoCompleteSearchBar = (props: PropTypes) => {
  const inputStyle = { position: 'absolute', top: '8px', left: '52px', zIndex: '999' };
  const [isFetch, setIsFetch] = useState(false);
  const [placeList, setPlaceList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [listTitle, setListTitle] = useState('');

  const fetch = (query) => {
    const link = `https://api.locationiq.com/v1/autocomplete?key=pk.9b254bf7cb5be233afb04532d9b825b8&q=${query}`;
    API.get(link).then(res => {
      const result = [];
      if (res.status === 200) {
        const data = res.data;
        data.forEach(place => {
          result.push({
            display_place: place.display_place,
            display_address: place.display_address,
            lon: place.lon,
            lat: place.lat,
            place_id: `${place.place_id}--${new Date().getTime()}`
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

  const onClickSearch = () => {
    setIsFetch(true);
    fetch(keyword);
  }

  const debounceSearch = (e) => {
    if (!isCurrent) {
      fetch(e.target.value);
    }
  }

  const onChange = (e) => {
    setKeyword(e.target.value);
    if (!e.target.value) {
      setPlaceList([...props.currentSearch]);
    }
    isCurrent = !e.target.value ? true : false;
    setListTitle(!e.target.value ? 'Previously on search:' : 'Search result:');
  }

  const toogleClickPlace = (place) => {
    setKeyword(place.display_place);
    if (props.onClickPlace) {
      props.onClickPlace(place, isCurrent);
    }
  }

  return (
    <>
      <SearchBar
        style={ inputStyle }
        keyword={ keyword }
        onChange={(e) => onChange(e)}
        onClickSearch={ onClickSearch }
        debounceSearch={(e) => debounceSearch(e)}
      />
      { placeList.length !== 0 &&
        <PlaceList
          listTitle={ listTitle }
          places={ placeList }
          isFetch={ isFetch }
          onClickPlace={ toogleClickPlace }
        />
      }
    </>
  );
}

export default AutoCompleteSearchBar;