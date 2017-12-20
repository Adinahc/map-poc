/*global google*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoCompleteLocation from './autoCompleteLocation';
import ResultList from './resultList';
import {selectLocation} from '../actions/index';
import {bindActionCreators} from 'redux';

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
                marker.selectLocation = this.props.selectLocation;
                marker.addListener('click', function() {     
                    this.infowindow.setContent(this.content);
                    this.infowindow.open(this.map, marker);
                    this.selectLocation(this.key);
                });                              
                bounds.extend(markerCoords);                  
            });
            this.map.fitBounds(bounds); 
        }
        else {
            this.markers.forEach(element => {    
                element.setMap(null);                    
            });                
        }       
    }  

    initMap = () => {
        this.map = new google.maps.Map(this.refs.map, {
            center: this.props.coordinates,
            zoom: 16
        });
        this.infowindow = new google.maps.InfoWindow({
            content: 'asdfsdf'
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

const mapDispatchToProps = dispatch => {
    return (
        bindActionCreators({selectLocation:selectLocation}, dispatch)
    );
}

function mapStateToProps(state){
    return {
        coordinates: state.coordinates,
        showResult: state.showResult,
        agents: state.results
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Map);