import React, { Fragment } from 'react'
import {makeStyles} from "@material-ui/styles"

import loaderGif from '../../assets/images/loader.gif'

const useStyles = makeStyles({
    loadingCls: {
        width: "70px",
        height: "60px",
        backgroundRepeat: "no-repeat",
        margin: "0 auto",
        backgroundImage:`url(${loaderGif})`
    }
})

export default function Loader() {
    const classes = useStyles()

    return (
        <Fragment>
           <div className={classes.loadingCls}></div>
        </Fragment>
    )
}
