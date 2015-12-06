# React Datepicker Component

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
some date is selected.

```
function onChangeCallback(selectedDay) { /* some work */ }
ReactDOM.render(<Datepicker onChange={onChangeCallback} />, document.getElementById("component"));
```

### Date range
If you want to have date range option just pass parameter isRange with value true. Then in the on change
function you will receive object with properties startDate and endDate.

```
var isRange = true;
ReactDOM.render(<Datepicker isRange={isRange} />, document.getElementById("component"));
```

### Inline calendar
If you want to have inline calendar, one when you see just date and calendar is displayed bellow after
you click on it, just pass isInline parameter with value true.

```
var isInline = true;
ReactDOM.render(<Datepicker isInline={isInline} />, document.getElementById("component"));
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
For week days names you can pass daysLabels property with array of strings representing 
days names as value. 
```
var labels = ["monday", "tuesday",...];
ReactDOM.render(<Datepicker daysLabels={labels} />, document.getElementById("component"));
```

### Week days names
Week names are enabled by default. If you want to remove them pass showDaysLabels 
property with value false. Names are in table head element, each one in th element with 
class dayLabel.

```
ReactDOM.render(<Datepicker showDaysLabels={false} />, document.getElementById("component"));
```

## Styling
Currently there are three ways of styling for date picker. You can use default which can be downloaded from 
github in CSS or SASS format. This is not recomended because it is just some default format. You can add custom 
style to directive as parameter or write your CSS. Last two methodes are described belowe. 

### Structure
Whole component is in div element with class datepicker. Inside there are two elements in first depth level. 
Div with class header where is displayed selected date in format DD/MM/YYY. Next is table with class calendar. 
Inside we have caption with class controls which contains two divs (one for month changing and one for year 
changing) with two more elements. Moving into past element with class prev and into future with class next. 
Each week is table row with class week. Each day has class day. If day is not possible to be clicked it has 
class disabled, and selected day has class selected. Week days names are in thead element. Each label is th 
element and they are inside of one tr element. Each th element has dayLabel class.

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

## Note

This component is ready to use as npm module or as script which can be also find in 
github repository. However, if you do find any issues, please do contact me. Also if you are using 
it I would appreciate if you could let me know how it is working for you.