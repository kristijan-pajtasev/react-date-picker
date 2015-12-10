"use strict";

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
		var _this2 = this;

		var selectedDay = this.state.selectedDay;
		return week.map(function (d, i) {

			var classes = ["day"];
			if (d.getMonth() != _this2.props.dates[2][2].getMonth()) {
				classes.push("disabled");
			}

			if (!!selectedDay && d.getDate() == selectedDay.getDate() && d.getMonth() == selectedDay.getMonth() && d.getFullYear() == selectedDay.getFullYear()) {
				classes.push("selected");
			}

			if (!!_this2.props.minimumDate && _this2.props.minimumDate > d) {
				classes.push("disabled");
			}

			return React.createElement(
				"td",
				{ onClick: _this2.setActive.bind(null, d, classes.indexOf("disabled") < 0),
					className: classes.join(" "), style: _this2.getStyleForClasses(classes),
					key: Math.random() * i },
				d.getDate()
			);
		});
	},
	getStyleForClasses: function getStyleForClasses(classes) {
		var style = {};
		for (var i = 0, length = classes.length; i < length; i++) {
			var klass = classes[i];
			this.mergeStyleForClass(style, this.props.customStyle[klass] || {});
		}
		return style;
	},
	mergeStyleForClass: function mergeStyleForClass(style, styleForClass) {
		var keys = Object.keys(styleForClass);
		for (var i = 0, length = keys.length; i < length; i++) {
			var key = keys[i];
			style[key] = styleForClass[key];
		}
	},
	getCaption: function getCaption(showControls) {
		var prev = '<';
		var next = '>';
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
	getHeader: function getHeader(showHeader) {
		if (showHeader) {
			var days = this.props.daysLabels.map(function (d, i) {
				return React.createElement(
					"th",
					{ className: "dayLabel", key: i },
					d
				);
			});
			return React.createElement(
				"thead",
				null,
				React.createElement(
					"tr",
					null,
					days
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
			this.getHeader(this.props.showDaysLabels),
			this.getCaption(this.props.showControls),
			this.getWeeks(this.props.dates)
		);
	}
});

module.exports = Calendar;