import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 10,
      label: '10',
    }
  ];

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  

  const name = props.name
  const step = parseInt(props.step)
  const min = parseInt(props.min)
  const max= parseInt(props.max)

  const [value, setValue] = React.useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleSliderChange(newValue, props.type)
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {name}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        step={step}
        marks={marks}
        min={min}
        max={max}
      />
    </div>
  );
}
