/*global google*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoCompleteLocation from './autoCompleteLocation';
import ResultList from './resultList';

class Map extends Component {
    componentDidMount() {
        this.initMap();
    }

    componentWillReceiveProps(nextProps) {
        this.map.setCenter(nextProps.coordinates);
        if(nextProps.showResult) {
            var bounds  = new google.maps.LatLngBounds();
            this.props.agents.forEach(element => {
                var markerCoords = {lat: element.Latitude, lng: element.Longitude};
                var marker = new google.maps.Marker({
                    position: markerCoords,
                    map: this.map
                  });
                bounds.extend(markerCoords);                  
            });
            this.map.fitBounds(bounds); 
        }
    }  

    initMap = () => {
        console.log('initmap');
        this.map = new google.maps.Map(this.refs.map, {
            center: this.props.coordinates,
            zoom: 16
        });
    }

    render() {      
        return (
            <div>
            {
                this.props.showAutoCompleteInput==='true' &&
                <AutoCompleteLocation cssClass='locationSearchBox' />
            }                 
                <div ref="map" className='map'>I should be a map!</div>
            {    
                this.props.showResult &&
                <ResultList />
            }
            </div>
        );
    }
};

function loadJS(src)
{
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);  
}

function mapStateToProps(state){
    return {
        coordinates: state.coordinates,
        showResult: state.showResult.showResult,
        agents: state.results
    };
}

export default connect(mapStateToProps)(Map);