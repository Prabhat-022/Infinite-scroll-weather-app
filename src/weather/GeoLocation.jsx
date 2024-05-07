
import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = (props) => {
    const handleMapClick = (mapProps, map, clickEvent) => {
        const { latLng } = clickEvent;
        
        const latitude = latLng.lat();
        const longitude = latLng.lng();

        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
    };

    return (
        <Map
            google={props.google}
            zoom={14}
            onClick={handleMapClick}
            initialCenter={{
                lat: 37.7749,
                lng: -122.4194
            }}
        />
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyADBvIhhM5QfXhQvzA7uxmIXbL6mgPvGXQ'
})(MapContainer);
