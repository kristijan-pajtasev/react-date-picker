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
				"tr",
				{ className: "week", key: i * Math.random() },
				_this.getWeek(w)
			);
		});
		return React.createElement(
			"tbody",
			null,
			weekRows
		);
	},
	getWeek: function getWeek(week) {
		var _this = this;

		var selectedDay = this.state.selectedDay;
		return week.map(function (d, i) {

			var classes = ["day"];
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
				"td",
				{ onClick: _this.setActive.bind(null, d, classes.indexOf("disabled") < 0),
					className: classes.join(" "),
					key: Math.random() * i },
				d.getDate()
			);
		});
	},
	getHeader: function getHeader(hasControls) {
		hasControls = true;
		if (hasControls) {
			return React.createElement(
				"caption",
				{ className: "controls" },
				React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "prev", onClick: this.props.changeYear.bind(null, -1) },
						"prev"
					),
					"Year: ",
					this.state.selectedDay.getFullYear(),
					React.createElement(
						"div",
						{ className: "next", onClick: this.props.changeYear.bind(null, 1) },
						"next"
					)
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "prev", onClick: this.props.changeMonth.bind(null, -1) },
						"prev"
					),
					"Month: ",
					this.state.selectedDay.getMonth() + 1,
					React.createElement(
						"div",
						{ className: "next", onClick: this.props.changeMonth.bind(null, 1) },
						"next"
					)
				)
			);
		} else {
			return null;
		}
	},
	render: function render() {
		return React.createElement(
			"table",
			{ className: "calendar" },
			this.getHeader(),
			this.getWeeks(this.props.dates)
		);
	}
});

module.exports = Calendar;