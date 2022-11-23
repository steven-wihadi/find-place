import './style.css';

export interface Place {
  place_id: string;
  display_place?: string;
  display_address?: string;
  lon: string;
  lat: string;
}

interface PropTypes {
  listTitle?: string;
  places: Place[];
  isFetch: boolean;
  onClickPlace?: (place: Place) => void;
};

const PlaceList = (props: PropTypes) => {

  const toogleClickPlace = (place: Place) => {
    if (props.onClickPlace) {
      props.onClickPlace(place);
    }
  }

  return (
    <div className="place-list-wrapper">
      { props.listTitle &&
        <span className='list-title'><strong>{ props.listTitle }</strong></span>
      }
      
      <div className='item-wrapper'>
        { !props.isFetch &&
          props?.places.map(place =>
            <div className="list-item" key={ place.place_id } onClick={() => toogleClickPlace(place)}>
              <strong>{ place. display_place} <span>{ place.display_address }</span></strong>
            </div>
          )
        }

        { props.isFetch &&
          <strong>Loading...</strong>
        }
      </div>
    </div>
  );
}

export default PlaceList;