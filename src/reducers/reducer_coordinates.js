function coordinates(state, action) {
  switch (action.type) {
    case 'UPDATE_COORDINATES':
        state = { 
            lat: parseFloat(action.coords.lat),
            lng: parseFloat(action.coords.lng) 
        };
        break;
    case 'SHOW_RESULT':
        state = state;
        break;    
    default:
        state = { 
            lat: parseFloat(13.7563),
            lng: parseFloat(100.5018) 
        };
    }
    return state;
}

export default coordinates;