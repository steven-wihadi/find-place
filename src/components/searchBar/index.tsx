import SearchIcon from '../../assets/images/search.png';
import './style.css';

let timeId: any;
interface PropTypes {
  style?: any;
  onClickSearch?: () => void;
  onChange?: (event: string) => void;
  debounceSearch?: (event: string) => void;
  keyword: string
}

const Input = (props: PropTypes) => {

  const onChangeInput = (e: any) => {
    if (props.onChange) {
      props.onChange(e);
    }

    clearTimeout(timeId);
    timeId = setTimeout(() => {
      if (props?.debounceSearch && e.target.value !== '' && e.target.value !== ' ') {
        props.debounceSearch(e);
      }
    }, 3000);
  }

  const onClickSearch = () => {
    if (props?.onClickSearch) {
      clearTimeout(timeId);
      props.onClickSearch();
    }
  }

  const onKeydown = (e: any) => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  }

  return (
    <div className="search-bar-wrapper" style={ props?.style }>
      <input
        type='text'
        placeholder='Search a location...'
        onChange={(e) => onChangeInput(e)}
        value={ props.keyword }
        onKeyDown={(e) => onKeydown(e)}
      />
      <button>
        <img src={ SearchIcon } alt='serach-btn-icon' onClick={ onClickSearch }/>
      </button>
    </div>
  );
}

export default Input;