import React from "react";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 370,
    border: `2px dashed gray`,
    color: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
});

export default function CustomSelectImg (props) {
  const { inputName, selectImg, isLoading, label } = props;
  const classes = useStyles()

  return (
    <div className={classes.root} onClick={selectImg}> 
      {isLoading ? (
        "Chargement..."
      ):(
        label || `Ajouter ${inputName}`
      )}
    </div>
  )
}