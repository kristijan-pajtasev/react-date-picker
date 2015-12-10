"use strict";

var DatepickerContainer = require("./DatepickerContainer");

var React = require("react");

var Datepicker = React.createClass({
	displayName: "Datepicker",

	getInitialState: function getInitialState() {
		return {};
	},
	onChange: function onChange(day) {
		if (this.props.isRange) {
			if (!!this.props.onChange) {
				this.props.onChange({ startDate: this.state.startDate, endDate: this.state.endDate });
			}
		} else {
			if (!!this.props.onChange) {
				this.props.onChange(day);
			}
		}
	},
	setStartDate: function setStartDate(day) {
		var _this = this;

		this.setState({ startDate: day });
		setTimeout(function () {
			_this.onChange();
		}, 50);
	},
	setEndDate: function setEndDate(day) {
		var _this2 = this;

		this.setState({ endDate: day });
		setTimeout(function () {
			_this2.onChange();
		}, 50);
	},
	getDatepicker: function getDatepicker(isRange) {
		if (isRange) {
			return [React.createElement(DatepickerContainer, { key: 1,
				displayMonth: this.props.displayMonth,
				selectedDate: this.props.selectedDate,
				monthLabels: this.props.monthLabels,
				showControls: this.props.showControls,
				customStyle: this.props.customStyle,
				showDaysLabels: this.props.showDaysLabels,
				daysLabels: this.props.daysLabels,
				isInline: this.props.isInline,
				onChange: this.setStartDate }), React.createElement(DatepickerContainer, { key: 2,
				displayMonth: this.props.displayMonth,
				selectedDate: this.props.selectedDate,
				monthLabels: this.props.monthLabels,
				showControls: this.props.showControls,
				customStyle: this.props.customStyle,
				showDaysLabels: this.props.showDaysLabels,
				daysLabels: this.props.daysLabels,
				isInline: this.props.isInline,
				onChange: this.setEndDate })];
		} else {
			return React.createElement(DatepickerContainer, {
				displayMonth: this.props.displayMonth,
				selectedDate: this.props.selectedDate,
				monthLabels: this.props.monthLabels,
				showControls: this.props.showControls,
				customStyle: this.props.customStyle,
				showDaysLabels: this.props.showDaysLabels,
				daysLabels: this.props.daysLabels,
				isInline: this.props.isInline,
				onChange: this.props.onChange });
		}
	},
	render: function render() {
		return React.createElement(
			"div",
			null,
			this.getDatepicker(this.props.isRange)
		);
	}
});

module.exports = Datepicker;