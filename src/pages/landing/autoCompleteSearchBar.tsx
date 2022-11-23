import { useState } from "react";
import { PlaceView } from "../../@core/entity/map.entity";
import PlaceList from "../../components/placeList";
import SearchBar from "../../components/searchBar";
import LandingPageUsecaseImpl from "./landing.usecase.impl";

interface PropTypes {
  onClickPlace?: (place: PlaceView, isCurrent: boolean) => void;
  currentSearch: PlaceView[];
}
let isCurrent;

const AutoCompleteSearchBar = (props: PropTypes) => {
  const usecase = new LandingPageUsecaseImpl();
  const inputStyle = { position: 'absolute', top: '8px', left: '52px', zIndex: '999' };
  const [listTitle, setListTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [placeList, setPlaceList] = useState([]);
  const [isFetch, setIsFetch] = useState(false);

  const fetch = (keyword) => {
    usecase.getMapAutoComplete({ keyword }).then(res => {
      setPlaceList([...res]);
      setIsFetch(false);
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