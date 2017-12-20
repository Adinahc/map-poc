/*global google*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeCoordinates,showResult} from '../actions/index';
import {bindActionCreators} from 'redux';

class AutoCompleteLocation  extends Component {
    constructor(props) {
        super(props);
        this.state = { predictions: [] };
        this.autocomplete = null;
        this.event = null;    
        this.predictions = null;   
        this.address = '';
    }

    componentDidMount() {
        this.autocomplete = new google.maps.places.Autocomplete(this.refs.input);
        this.autoCompleteService = new google.maps.places.AutocompleteService();
        this.event = this.autocomplete.addListener('place_changed', this.onSelected.bind(this));       
    }

    onChange(e) {
        if(e.target.value) {
            this.autoCompleteService.getPlacePredictions({input: e.target.value}, (predictions, status) => {
                this.predictions = predictions;      
          });
        }
    }

    onKeyDown(e) {
        //detect if user hit enter
        if(e.keyCode === 13)
        {       
            if(this.predictions)
            {
                this.address = this.predictions[0].description;   
                this.refs.input.value = this.address; 
                this.autocomplete.selectedPlace =  this.predictions[0];
                console.log(this.predictions[0]);
                
                //console.log(this.autocomplete.selectedPlace);
                //google.maps.event.trigger(this.autocomplete, 'place_changed');
            }
        }
    }

    createAndSetCoords(geometry) {
        var coords = {
            lat: geometry.location.lat(),
            lng: geometry.location.lng()
        }
        this.props.changeCoordinates(coords);  
    }

    onSelected(e) {
        var selectedPlace = this.autocomplete.getPlace();
        if(selectedPlace.geometry) {
            this.createAndSetCoords(selectedPlace.geometry);
        }
    }

    onClick() {
        this.props.showResult();
    }

    render(){   
        return (
        <div className={this.props.cssClass}>     
            <input ref="input" size='100' onChange={this.onChange.bind(this)} onKeyDown={this.onKeyDown.bind(this)} />
            <button onClick={this.onClick.bind(this)} >Search</button>
        </div>
    );}
};

const mapStateToProps = (state) => {
    return {
        coordinates: state.coordinates
    };
}

const mapDispatchToProps = dispatch => {
    return(
        //Passing new coords to all reducers
        bindActionCreators({changeCoordinates:changeCoordinates, showResult:showResult}, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteLocation);