const landingReducer = (state, action: any) => {
  switch(action.type) {
    case 'ADD_TO_CURRENT_SEARCH':
      const temp = JSON.parse(JSON.stringify(state.currentSearch));
      temp.push(action.place);
      return {
        ...state,
        currentSearch: temp
      };
    case 'SET_LON_LAT':
      return {
        ...state,
        lon: action.lon,
        lat: action.lat
      }
  }
}

export default landingReducer;