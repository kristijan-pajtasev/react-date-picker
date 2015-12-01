var DatepickerContainer = require("./DatepickerContainer");

var React = require("react");

var Datepicker = React.createClass({
	displayName: "Datepicker",

	onChange: function onChange(day) {
		if (!!this.props.onChange) {
			this.props.onChange(day);
		}
	},
	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(DatepickerContainer, {
				displayMonth: this.props.displayMonth,
				selectedDate: this.props.selectedDate,
				monthLabels: this.props.monthLabels,
				showControls: this.props.showControls,
				customStyle: this.props.customStyle,
				showDaysLabels: this.props.showDaysLabels,
				daysLabels: this.props.daysLabels,
				isInline: this.props.isInline,
				onChange: this.props.onChange
			})
		);
	}
});

module.exports = Datepicker;