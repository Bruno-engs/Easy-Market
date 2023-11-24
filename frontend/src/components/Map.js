import React from 'react'
//import {useSelector} from 'react-redux';
import GoogleMapReact from 'google-map-react'
import Marker from './Marker';
const Map = ({ stores }) => {
    const defaultProps = {
        center: {
            lat: -15.819391380128794,
            lng: -48.082514775944325,
        },
        zoom: 13
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '700px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {stores?.map(p => (
                    <Marker key={p._id} store={p} lat={p.location.lat} lng={p.location.lng} image={p.image} />
                ))}

            </GoogleMapReact>
        </div>
    );

}

export default Map;