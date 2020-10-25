import React from 'react';
import { withStyles } from '@material-ui/styles';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import styles from './styles';

function ArticleCard(props) {
  const { classes, children, updateImage, handleScale, scale, handleRotate } = props;

  return (
    <div className={classes.root}>
      <div className={classes.imageWrapper1}>
        <div className={classes.imageWrapper2}>
         {children}
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.zoom}>
          <p 
            variant="body1"
            color="textSecondary"
            className={classes.zoomLabel}
          >
            Zoom
          </p>

          {/* <PrettoSlider 
            defaultValue={scale}
            onChange={handleScale}
            aria-labelledby="pretto slider"
            step={0.01}
            min={0.1}
            max={2}
          /> */}

          <InputRange
            minValue={0.1}
            maxValue={2}
            step={0.01}
            value={scale}
            onChange={handleScale} 
          />
        </div>

        <div className={classes.rotate}>
          <p 
            noWrap 
            variant="body1"
            color="textSecondary"
            className={classes.rotateLabel}
          >
            Rotation
          </p>
          <div>
            <button size="small" onClick={() => handleRotate('left')}>A gauche</button>
            <button size="small" onClick={() => handleRotate('right')}>A droite</button>
          </div>
        </div>

        <div className={classes.buttonWrapper}>
          <button 
            className={classes.button}
            id="image"
            fullWidth
            variant="outlined" 
            color="primary" 
            onClick={updateImage}
            size="small"
          >
            Modifier l'image
          </button>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(ArticleCard);
