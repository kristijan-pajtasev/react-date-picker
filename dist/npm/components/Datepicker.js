var React = require("react");
var CalendarUtil = require("../utils/CalendarUtil");
var Calendar = require("./Calendar");

var Datepicker = React.createClass({
	displayName: "Datepicker",

	getInitialState: function getInitialState() {
		var date = new Date();
		var selectedMonth = date.getMonth();
		var selectedYear = date.getFullYear();
		var monthDays = CalendarUtil.calendar(new Date(date.getTime()));

		return {
			monthDays: monthDays,
			selectedYear: selectedYear,
			selectedMonth: selectedMonth,
			selectedDay: undefined
		};
	},
	changeMonth: function changeMonth(direction) {
		var month = this.state.selectedMonth;
		var year = this.state.selectedYear;
		if (direction == 1) {
			month += 1;
			if (month > 11) {
				month %= 12;
				year += 1;
			}
		}
		if (direction == -1) {
			month -= 1;
			if (month < 0) {
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
	changeYear: function changeYear(direction) {
		var year = this.state.selectedYear + direction;
		var month = this.state.selectedMonth;
		var newState = {
			selectedMonth: month,
			selectedYear: year,
			monthDays: CalendarUtil.calendar(new Date(year, month))
		};
		this.setState(newState);
	},
	onChange: function onChange(day) {
		this.setState({ selectedDay: day });
		if (!!this.props.onChange) {
			this.props.onChange(selectedDay);
		}
	},
	render: function render() {
		var selectedDateLabel = "DD/MM/YYYY";
		if (!!this.state.selectedDay) {
			selectedDateLabel = this.state.selectedDay.getDate() + "/" + (this.state.selectedMonth + 1) + "/" + this.state.selectedYear;
		}
		return React.createElement(
			"div",
			{ className: "datepicker" },
			React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					null,
					selectedDateLabel
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"button",
						{ onClick: this.changeYear.bind(null, -1) },
						"prev"
					),
					"Year: ",
					this.state.selectedYear,
					React.createElement(
						"button",
						{ onClick: this.changeYear.bind(null, 1) },
						"next"
					)
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"button",
						{ onClick: this.changeMonth.bind(null, -1) },
						"prev"
					),
					"Month: ",
					this.state.selectedMonth + 1,
					React.createElement(
						"button",
						{ onClick: this.changeMonth.bind(null, 1) },
						"next"
					)
				)
			),
			React.createElement(Calendar, { onChange: this.onChange, selectedDay: this.state.selectedDay, dates: this.state.monthDays, selectedMonth: this.state.selectedMonth })
		);
	}
});

module.exports = Datepicker;