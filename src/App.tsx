import React, { useState, useEffect, ChangeEvent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ColorPicker from 'material-ui-color-picker';
import Slider from '@material-ui/core/Slider';
import { writeFileSync, readFileSync } from 'fs';
import DogeImage from '../assets/icons/doge.jpg';
import './App.global.css';

const colorPath = '/sys/class/leds/system76_acpi::kbd_backlight/color';
const brightnessPath =
  '/sys/class/leds/system76_acpi::kbd_backlight/brightness';

const ColorPickerContainer = () => {
  const [color, setColor] = useState('');
  const [brightness, setBrightness] = useState(0);

  useEffect(() => {
    const initialColor = readFileSync(colorPath).toString();
    setColor(`#${initialColor}`);

    const initialBrightness = parseInt(readFileSync(brightnessPath).toString());
    setBrightness(initialBrightness);
  }, []);

  const changeKeyBoardColor = (inColor: string) => {
    if (inColor && inColor.length === 7) {
      setColor(inColor);
      writeFileSync(colorPath, inColor.slice(1));
    }
  };

  const changeKeyboardBrightness = (event: any, inBrightness: number) => {
    setBrightness(inBrightness);
    writeFileSync(brightnessPath, brightness.toString());
  };
  return (
    <div className="flex-col">
      <img className="logo" src={DogeImage} alt="logo" />
      <div className="flex-row">
        <div className="flex-col with-margin with-border">
          <h1>Change Color</h1>
          <ColorPicker
            name="color"
            defaultValue="Click here to change color"
            value={color}
            onChange={changeKeyBoardColor}
          />
        </div>
        <div className="flex-col with-margin with-border">
          <h1>Change Brightness</h1>
          <Slider
            valueLabelDisplay="auto"
            value={brightness}
            min={0}
            step={10}
            onChange={changeKeyboardBrightness}
            max={255}
          />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={ColorPickerContainer} />
      </Switch>
    </Router>
  );
}
