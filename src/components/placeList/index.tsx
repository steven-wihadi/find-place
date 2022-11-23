import { PlaceView } from '../../@core/entity/map.entity';
import './style.css';

interface PropTypes {
  listTitle?: string;
  places: PlaceView[];
  isFetch: boolean;
  onClickPlace?: (place: PlaceView) => void;
};

const PlaceList = (props: PropTypes) => {

  const toogleClickPlace = (place: PlaceView) => {
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