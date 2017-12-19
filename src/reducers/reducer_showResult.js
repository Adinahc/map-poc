function showResult(state, action) {
    switch (action.type) {
        case 'SHOW_RESULT':
            state = { 
                showResult: true
            };
            break;
        case 'HIDE_RESULT':
            state = { 
                showResult: false
            };
            break;         
      default:
            state = { 
                showResult: false
            };
      }
      return state;
  }
  
  export default showResult;