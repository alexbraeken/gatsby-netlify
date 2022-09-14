import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
  root: {
    color: '#f5821e',
    height: 2,
    padding: '15px 0',
    marginTop: '1.3em'
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 12px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

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



export default function RangeSlider(props) {
  const classes = useStyles();
  

  const name = props.name
  const step = parseInt(props.step)
  const min = parseInt(props.min)
  const max= parseInt(props.max)
  const values = [parseInt(props.low), parseInt(props.high)]

  const [value, setValue] = React.useState(values);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleSliderChange(newValue, props.type)
  };

  function valuetext(value) {
    return `${value}`
  }

  return (
    <div className={classes.root}>
      <p id="range-slider" className="label">
        {name}
      </p>
      <IOSSlider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        step={step}
        marks={props.marks || marks}
        min={min}
        max={max}
      />
    </div>
  );
}
