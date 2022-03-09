import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import mapStyles from "./mapStyles";

const Map = ({ cordinates, setCordinates, places, setBounds, setChildClick, weatherData }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');


    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={cordinates}
                center={cordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={(e) => {
                    setCordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ sw: e.marginBounds.sw, ne: e.marginBounds.ne })
                }}
                onChildClick={(child) => setChildClick(child)}>
                {places?.map((place, i) => (
                    <div className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            isDesktop ? (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img className={classes.pointer} src={place.photo ? place.photo.images.large.url : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} alt={place.name} />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            ) : (
                                <LocationOnOutlinedIcon color="secondary" fontSize='large' />
                            )
                        }
                    </div>
                ))}
                {weatherData?.list?.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png}`} />
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
};

export default Map;
