import {combineReducers} from 'redux';
import CoordinatesReducer from './reducer_coordinates';
import ResultsReducer from './reducer_results';
import ShowResultReducer from './reducer_showResult';
import SelectLocationReducer from './reducer_selectLocation';

const rootReducer = combineReducers({
    coordinates: CoordinatesReducer,
    results: ResultsReducer,
    showResult: ShowResultReducer,
    selectLocation: SelectLocationReducer
})

export default rootReducer;