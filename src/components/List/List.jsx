import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from './styles';

const List = ({ places, childClick, isLoading, type, setType, rating, setRating }) => {

    const classes = useStyles();

    const [elRef, setElRef] = useState([]);

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRef[i] || createRef());
        setElRef(refs);
    }, [places])
    return (
        <div className={classes.container}>
            <Typography variant='h4'>
                Restaurants, Hotels & Attractions around you
            </Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(e) => { setType(e.target.value) }}>
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(e) => { setRating(e.target.value) }}>
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, ind) => (
                            <Grid
                                item key={ind}
                                xs={12}>
                                <PlaceDetails place={place}
                                    selected={Number(childClick) === ind}
                                    refProp={elRef[ind]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    );
};

export default List;
