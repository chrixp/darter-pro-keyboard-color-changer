# Keyboard color changer for Darter Pro

## Give write permission to color and brightness

```
sudo chmod a+rw/sys/class/leds/system76_acpi::kbd_backlight/color
sudo chmod a+rw/sys/class/leds/system76_acpi::kbd_backlight/color
```

## Install

```
yarn
yarn package
```

The final application is in `./release`