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
			if (d.getMonth() != _this.props.dates[2][2].getMonth()) {
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
					className: classes.join(" "), style: _this.getStyleForClasses(classes),
					key: Math.random() * i },
				d.getDate()
			);
		});
	},
	getStyleForClasses: function getStyleForClasses(classes) {
		var style = {};
		if (classes.indexOf("day") >= 0) {
			var dayStyle = this.props.customStyle.day || {};
			var keys = Object.keys(dayStyle);
			for (var i = 0, _length = keys.length; i < _length; i++) {
				var _key = keys[i];
				style[_key] = dayStyle[_key];
			}
		}
		if (classes.indexOf("selected") >= 0) {
			var selectedStyle = this.props.customStyle.selected || {};
			var keys = Object.keys(selectedStyle);
			for (var i = 0, _length2 = keys.length; i < _length2; i++) {
				var _key2 = keys[i];
				style[_key2] = selectedStyle[_key2];
			}
		}
		if (classes.indexOf("disabled") >= 0) {
			var disabledStyle = this.props.customStyle.disabled || {};
			var keys = Object.keys(disabledStyle);
			for (var i = 0, _length3 = keys.length; i < _length3; i++) {
				var _key3 = keys[i];
				style[_key3] = disabledStyle[_key3];
			}
		}
		return style;
	},
	getHeader: function getHeader(showControls) {
		var prev = "<";
		var next = ">";
		if (showControls) {
			return React.createElement(
				"caption",
				{ className: "controls", style: this.props.customStyle.controls || {} },
				React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "prev", onClick: this.props.changeYear.bind(null, -1),
							style: this.props.customStyle.prev || {} },
						prev
					),
					"Year: ",
					this.state.selectedDay.getFullYear(),
					React.createElement(
						"div",
						{ className: "next", onClick: this.props.changeYear.bind(null, 1),
							style: this.props.customStyle.next || {} },
						next
					)
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "prev", onClick: this.props.changeMonth.bind(null, -1),
							style: this.props.dates[2][2].prev || {} },
						prev
					),
					"Month: ",
					this.props.dates[2][2].getMonth() + 1,
					React.createElement(
						"div",
						{ className: "next", onClick: this.props.changeMonth.bind(null, 1),
							style: this.props.customStyle.next || {} },
						next
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
			{ className: "calendar", style: this.props.customStyle.calendar || {} },
			this.getHeader(this.props.showControls),
			this.getWeeks(this.props.dates)
		);
	}
});

module.exports = Calendar;