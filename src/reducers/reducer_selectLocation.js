function selectLocation(state, action) {
    switch (action.type) {
        case 'SELECT_LOCATION':
            return action.selectedKey;    
        default:
            return null;
      }
  }
  
  export default selectLocation;