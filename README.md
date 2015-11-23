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

### Show/hide controls
If you want to hide controls for changing year or month just add showControls property
with value of false. By default this property is true.
```
ReactDOM.render(<Datepicker showControls={false} />, document.getElementById("component"));
```

### Minimum date
You can define minimum possible date by passing minimumDate flag.

```
var minumumDate = new Date();
ReactDOM.render(<Datepicker minimumDate={minimumDate} />, document.getElementById("component"));
```

### Localization
For month names localization, you can pass monthLabels property.

```
var labels = [...];
ReactDOM.render(<Datepicker monthLabels={labels} />, document.getElementById("component"));
```

## Styling
Currently there are three ways of styling for date picker. You can use default which can be downloaded from 
github in CSS or SASS format. This is not recomended because it is just some default format. You can add custom 
style to directive as parameter or write your CSS. Last two methodes are described before. 

### Structure
Whole component is in div element with class datepicker. Inside there are two elements in first depth level. 
Div with class header where is displayed selected date in format DD/MM/YYY. Next is table with class calendar. 
Inside we have caption with class controls which contains two divs (one for month changing and one for year 
changing) with two more elements. Moving into past element with class prev and into future with class next. 
Each week is table row with class week. Each day has class day. If day is not possible to be clicked it has 
class disabled, and selected day has class selected.

### Styling as component parameter
To add some style to part of component you can pass JSON object for styling as customStyle property.
Using classes as keys you choose which part will have which style. Important thing is that React uses 
camel case for property names so in you styling definition you will not have font-weight but fontWeight. 

```
var customStyle = {
	header: {
		"color": "blue",
		"fontWeight": "bold"
	}
}
ReactDOM.render(<Datepicker customStyle={customStyle} />, document.getElementById("component"));
```

### Styling as CSS
You can use this structure and usual CSS selectors for styling this component. So for styling day 
element you can use .day selector or .day.selected for selected day. This is recomended usage 
because like this you can use different pseudoselectors like :hover and you can use media queries.
