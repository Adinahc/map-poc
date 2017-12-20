function showResult(state, action) {
    switch (action.type) {
        case 'SHOW_RESULT':
            return true;
        case 'HIDE_RESULT':
            return false;     
        case 'SELECT_LOCATION':
            return true;
        default:
            return false;
      }
  }
  
  export default showResult;