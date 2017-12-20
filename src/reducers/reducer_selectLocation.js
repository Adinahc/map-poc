function selectLocation(state, action) {
    switch (action.type) {
        case 'SELECT_LOCATION':
            state = { 
                selectedKey: action.selectedKey
            };
            break;     
        default:
            state = { 
                selectedKey: null
            };
      }
      return state;
  }
  
  export default selectLocation;