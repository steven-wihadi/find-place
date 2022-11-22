import { useState } from 'react';
import SearchIcon from '../../assets/images/search.png';
import './style.css';

let timeId: any;
interface PropTypes {
  style?: any;
  onClickSearch?: (keyword: string) => void;
  // keyword: string
}

const Input = (props: PropTypes) => {
  const [keyword, setKeyword] = useState('');

  const onChangeInput = (e: any) => {
    setKeyword(e.target.value);

    clearTimeout(timeId);
    timeId = setTimeout(() => {
      if (props?.onClickSearch) {
        props.onClickSearch(e.target.value);
      }
    }, 3000);
  }

  const onClickSearch = () => {
    if (props?.onClickSearch) {
      clearTimeout(timeId);
      props.onClickSearch(keyword);
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
        value={keyword}
        onKeyDown={(e) => onKeydown(e)}
      />
      <button>
        <img src={ SearchIcon } alt='serach-btn-icon' onClick={onClickSearch}/>
      </button>
    </div>
  );
}

export default Input;