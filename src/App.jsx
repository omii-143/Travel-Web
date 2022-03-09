import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";


import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import { getPlacesData, getWeatherData } from './api/index.js'

const App = () => {
    const [places, setPlaces] = useState([]);
    const [cordi, setCordi] = useState({});
    const [bounds, setBounds] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCordi({ lat: latitude, lng: longitude })
        })
    }, []);

    useEffect(() => {
        const filterPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filterPlaces);
    }, [rating]);

    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true)
            getWeatherData(cordi.lat, cordi.lng)
                .then((data) => setWeatherData(data));
            getPlacesData(type, bounds.ne, bounds.sw)
                .then((data) => {
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                    setFilteredPlaces([]);
                    setIsLoading(false);
                });
        }
    }, [type, bounds]);

    const [childClick, setChildClick] = useState({});


    return (
        <>
            <CssBaseline />
            <Header setCordi={setCordi} />
            <Grid container spacing={3} style={{ width: '100%', background: '#F5F5F5' }}>
                <Grid item xs={12} md={4}>
                    <List places={filteredPlaces?.length ? filteredPlaces : places}
                        childClick={childClick}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCordinates={setCordi}
                        setBounds={setBounds}
                        cordinates={cordi}
                        places={filteredPlaces?.length ? filteredPlaces : places}
                        setChildClick={setChildClick}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
};


export default App;
