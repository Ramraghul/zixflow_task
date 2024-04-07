import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core';


//Style;
const useStyles = makeStyles((theme) => ({
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    },
}));

//Loader Component;
function Loading() {
    const classes = useStyles();
    return (
        <div className={classes.loadingContainer}>
            <CircularProgress />
        </div>
    )
}

//Loading Export;
export default Loading