var React = require("react");

var Calendar = React.createClass({
	displayName: "Calendar",

	getInitialState: function getInitialState() {
		var state = {};
		if (this.props.selectedDay) {
			state.selectedDay = this.props.selectedDay;
		}
		return state;
	},
	setActive: function setActive(day, canBeSet) {
		if (canBeSet) {
			this.setState({ selectedDay: day });
			this.props.onChange(day);
		}
	},
	getWeeks: function getWeeks(weeks) {
		var _this = this;

		var weekRows = weeks.map(function (w, i) {
			return React.createElement(
				"li",
				{ key: i * Math.random() },
				_this.getWeek(w)
			);
		});
		return React.createElement(
			"ul",
			null,
			weekRows
		);
	},
	getWeek: function getWeek(week) {
		var _this = this;

		var selectedDay = this.state.selectedDay;
		var days = week.map(function (d, i) {

			var classes = [];
			if (d.getMonth() != _this.props.selectedMonth) {
				classes.push("disabled");
			}

			if (!!selectedDay && (d.getDate() == selectedDay.getDate() && d.getMonth() == selectedDay.getMonth() && d.getFullYear() == selectedDay.getFullYear())) {
				classes.push("selected");
			}

			if (!!_this.props.minimumDate && _this.props.minimumDate > d) {
				classes.push("disabled");
			}

			return React.createElement(
				"li",
				{ onClick: _this.setActive.bind(null, d, classes.indexOf("disabled") < 0),
					className: classes.join(" "),
					key: Math.random() * i },
				d.getDate()
			);
		});
		return React.createElement(
			"ul",
			null,
			days
		);
	},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "calendar" },
			this.getWeeks(this.props.dates)
		);
	}
});

module.exports = Calendar;