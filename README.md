# React Datepicker Component

## This component is in progress. Do not use yet.

## Installing 

### npm

#### In package.json
```
"react-date-picker-component": "a.b.c"
```

#### CLI
```
npm install react-date-picker-component
```

## Usage

```
var Datepicker = require("react-date-picker-component");

ReactDOM.render(<Datepicker />, document.getElementById("component"));
```

### Getting value
To retreive selected date you need to pass onChange function which will be triggered each time
some date is selected-

```
function onChangeCallback(selectedDay) { /* some work */ }
ReactDOM.render(<Datepicker onChange={onChangeCallback} />, document.getElementById("component"));
```

### Initial date
For initial selected date pass date object as selectedDate parameter.
```
var date = new Date();
ReactDOM.render(<Datepicker selectedDate={date} />, document.getElementById("component"));
```

### Initialy displayed month
If you want some month initialy displayed but not selecting some day, you can pass any day from that month
as date object as displayMonth prop.
```
var date = new Date();
ReactDOM.render(<Datepicker displayMonth={date} />, document.getElementById("component"));
```

### Localization
For month names localization, you can pass monthLabels property.

```
var labels = [...];
ReactDOM.render(<Datepicker monthLabels={labels} />, document.getElementById("component"));
```

## Styling
For now there is no styling by using npm, but will be added in next few days.
Current default styling can be taken from github repository from dist folder,
or under src/less folder LESS version (will be refactored for easy changing colors, 
font sizes, paddings...).