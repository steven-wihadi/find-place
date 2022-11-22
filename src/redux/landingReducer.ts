const initialState = {
  currentSearch: [],
  lon: '',
  lat: '',
};

const landingReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case 'ADD_TO_CURRENT_SEARCH':
      const temp = JSON.parse(JSON.stringify(initialState.currentSearch));
      temp.push(action.place);
      return {
        ...state,
        currentSearch: temp
      };
    case 'SET_LON_LAT':
      console.log('action: ', action);
      return {
        ...state,
        lon: action.lon,
        lat: action.lat
      }
  }
}

export default landingReducer;