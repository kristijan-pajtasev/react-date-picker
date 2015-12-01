var React = require("react");
var CalendarUtil = require("../utils/CalendarUtil");
var Calendar = require("./Calendar");

var DatepickerContainer = React.createClass({
	getInitialState: function() {
		var date = this.props.displayMonth || this.props.selectedDate || new Date();
		var selectedDate = this.props.selectedDate || new Date();
		var selectedMonth = selectedDate.getMonth();
		var selectedYear = selectedDate.getFullYear();
		var monthDays = CalendarUtil.calendar(new Date(date.getTime()));
		var months = this.props.monthLabels || ["January", "February", "March", "April", "May", 
						"June", "July", "August", "September", "October", 
						"November", "December"];
		var minimumDate = this.props.minimumDate;
		if(!!minimumDate) {
			minimumDate.setHours(0);
			minimumDate.setMinutes(0);
			minimumDate.setSeconds(0);
			minimumDate.setMilliseconds(0);
		}
		var showControls = this.props.showControls != undefined ? this.props.showControls : true;
		var customStyle = this.props.customStyle || {};

		var showDaysLabels = this.props.showDaysLabels !== undefined ? this.props.showDaysLabels : true;
		var daysLabels = this.props.daysLabels || 
			["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", 
			"Saturday", "Sunday"];
		var isInline = this.props.isInline ? true : false;

		return {
				monthDays: monthDays,
				selectedYear: selectedYear,
				selectedMonth: selectedMonth,
				selectedDay: selectedDate,
				monthLabels: months,
				minimumDate: minimumDate,
				showControls: showControls,
				customStyle: customStyle,
				showDaysLabels: showDaysLabels,
				daysLabels: daysLabels,
				isInline: isInline,
				display: isInline ? false : true
			 	};
	},
	changeMonth: function(direction) {
		var month = this.state.monthDays[2][2].getMonth();
		var year = this.state.selectedYear;	
		if(direction == 1) {
			month += 1;
			if(month > 11) {
				month %= 12;
				year += 1;
			}
		}
		if(direction == -1) {
			month -= 1;
			if(month < 0) {
				month += 12;
				year -= 1;
			}
		}
		
		var newState = {
				selectedMonth: month,
				selectedYear: year,
				monthDays: CalendarUtil.calendar(new Date(year, month))
			 	};
		this.setState(newState);
	},
	changeYear: function(direction) {
		var year = this.state.monthDays[2][2].getFullYear() + direction;
		var month = this.state.selectedMonth;
		var newState = {
				selectedMonth: month,
				selectedYear: year,
				monthDays: CalendarUtil.calendar(new Date(year, month))
			 	};
		this.setState(newState);
	},
	onChange: function(day) {
		var display = this.state.isInline ? false : true;
		this.setState({ selectedDay: day, display: display });
		if(!!this.props.onChange) { this.props.onChange(day); }
	},
	getCalendar: function(display) {
		if(display) {
			return	<Calendar style={display}
				changeMonth={this.changeMonth} customStyle={this.state.customStyle}
				changeYear={this.changeYear} showControls={this.state.showControls}
				showDaysLabels={this.state.showDaysLabels} daysLabels={this.state.daysLabels}
				minimumDate={this.state.minimumDate} onChange={this.onChange} 
				selectedDay={this.state.selectedDay} 
				dates={this.state.monthDays} selectedMonth={this.state.selectedMonth} />
		} else {
			return null;
		}
	},
	toggleVisibility: function() {
		if(this.state.isInline) {
			this.setState({display: !this.state.display});
		}
	},
	render: function() {
		var selectedDateLabel = 'DD/MM/YYYY'; 
		if(!!this.state.selectedDay) {
			selectedDateLabel = this.state.selectedDay.getDate() + "/" +
								(this.state.selectedMonth + 1) + "/" +
								this.state.selectedYear;
		}
		var inlineStyle = null;
		if(this.state.isInline) { 
			inlineStyle = "label.header~.calendar { position: absolute; width: 100%; height: auto; " 
				+ "left: 0; top: 100%;}"
		}

		return (<div className="datepicker" style={this.state.customStyle.datepicker || {}}>
					<style type="text/css">{inlineStyle}</style>
					<label onClick={this.toggleVisibility} 
						className={this.state.isInline ? "header inline" : "header"} 
						style={this.state.customStyle.header || {}}> 
						{selectedDateLabel}
					</label>
					{this.getCalendar(this.state.display)}
				</div>);
	}
})

module.exports = DatepickerContainer;  