/*global google*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoCompleteLocation from './autoCompleteLocation';
import ResultList from './resultList';

class Map extends Component {
    componentDidMount() {
        this.initMap();
        this.markers = [];
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
                marker.content = element.LocationName + '<br />' + element.LocationAddress + '<br />' + element.LocationCity + ', ' + element.LocationState;
                marker.key = element.LocationAddress;
                marker.infowindow = this.infowindow;   
                marker.test = this.props.selectLocation;
                marker.addListener('click', function() {     
                    this.test(this.key);
                    this.infowindow.setContent(this.content);
                    this.infowindow.open(this.map, marker);
                   //console.log(this.selectLocation);
                    //this.selectLocation(this.key);
                   //this.map.setCenter(this.position);
                });                              
                bounds.extend(markerCoords);                  
            });
            this.map.fitBounds(bounds); 
        }
    }  

    initMap = () => {
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

function mapStateToProps(state){
    return {
        coordinates: state.coordinates,
        showResult: state.showResult,
        agents: state.results
    };
}

export default connect(mapStateToProps)(Map);