import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Input,  Button } from 'semantic-ui-react'
//import scriptLoader from 'react-async-script-loader'
// import Search from './search'
//import Autocomplete from 'react-google-autocomplete'
import Autocomplete from './Autocomplete'
import {AddDirection} from './../../actions'
import { Link } from 'react-router-dom'

class Map extends Component {
  
    constructor(props){
        super(props)
        this.map = null
        this.directionsDisplay = null
        this.directionsService = null
        this.state = {
            searchdirection: [
            { location: {},  value: '' },
            { location: {},  value: '' }
            ],
            totaldistance : 0
        }
        
    }

    componentDidMount() {
        this.initmap()
    }

    initmap(){
    
        this.marker = [];
        this.geocoder = new window.google.maps.Geocoder();
        this.directionsService = new window.google.maps.DirectionsService();
        this.directionsDisplay = new window.google.maps.DirectionsRenderer();

        this.map = new window.google.maps.Map(this.refs.map, {
            zoom: 13,
            center: {lat: 13.7839702, lng: 100.5802613},
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        });

        this.directionsDisplay.setMap(this.map)
    }


    adddirection = () => {
        this.setState({searchdirection: this.state.searchdirection.concat(
            { location: {},  value: '' }
        )});
    }

    deletedirection = (e, row) => {
        let direction = this.state.searchdirection
        direction.splice(row, 1)

        this.setState({
            searchdirection: direction
        })
    }

    locationChange = (location, row) => {
        
        let locations = this.state.searchdirection
        locations[row].location = location.geometry.location
        locations[row].value = location.formatted_address

        this.setState({
            searchdirection: locations
        },()=>{
            if(!!this.state.searchdirection[0].value && !!this.state.searchdirection[1].value) {
                this.requestDirections()
            }
        })
        
    }

    requestDirections(){

          
        let waypts = []
        let ways = this.state.searchdirection.slice(1,-1)
        for (var i = 0; i < ways.length; i++) {
            waypts.push({
              location: ways[i].location,
              stopover: true
            });
        }

        let {searchdirection} = this.state

        let lastindex = 0
        for (let i = 0; i < searchdirection.length; i++) {
            if(!!searchdirection[i].value) lastindex = i
        }

        this.directionsService.route({ 
            origin: searchdirection[0].location, 
            destination: searchdirection[lastindex].location, 
            waypoints: waypts,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                
                let sumdistance = 0

                for (var i = 0; i < response.routes[0].legs.length; i++) {
                    sumdistance += +(response.routes[0].legs[i].distance.value / 1000).toFixed(2)
                }

                this.setState({
                    totaldistance: sumdistance
                })

                this.directionsDisplay.setDirections(response);
            }
        });

    }

    Next = () => {
        this.props.dispatch(AddDirection(
            { direction: 
                { routes: this.state.searchdirection, totaldistance: this.state.totaldistance}
            }
        ))
    }

    render() {
        const rows_search = this.state.searchdirection.map((value, key) => 
            <Grid.Column width={16} key={key} style={{'marginBottom':'-22px'}}>

                    <Input fluid labelPosition='right' type='text' placeholder='Amount'>
                        <Button color="blue" icon="marker"/>
                        <Autocomplete 
                            onPlaceSelected={place => this.locationChange(place, key)}
                        />
                        {(key > 1 ? <Button onClick={e => this.deletedirection(e, key)} color="red" icon="delete"/> : '')}
                    </Input>
                
            </Grid.Column> 
        )

    return (
            <Grid>
                <Grid.Column width={16}>
                    <div ref="map" style={{width: '100%',height: '92vh'}}>
                    </div>
                    <Grid style={{position:'absolute',top:'0', width:'100%'}}>
                        {rows_search}
                        <Grid.Column width={16} >
                            <Button onClick={this.adddirection} floated='right' color='black' icon='plus' />
                        </Grid.Column>
                    </Grid>

                    <Grid style={{position:'absolute',bottom:'0', width:'100%'}}>
                        <Grid.Column width={8} >
                            <Button fluid >Total {this.state.totaldistance} KM</Button>
                        </Grid.Column>    
                        <Grid.Column width={8} >
                            <Link to="/directions">
                                <Button color='green' onClick={this.Next} fluid>Next</Button>
                            </Link>
                        </Grid.Column>
                    </Grid>
                    
                </Grid.Column>
            </Grid>
   
        )
    }

}
 
Map = connect()(Map)

export default Map