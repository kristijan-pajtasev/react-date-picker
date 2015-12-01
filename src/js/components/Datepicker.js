var DatepickerContainer = require("./DatepickerContainer");

var React = require("react");

var Datepicker = React.createClass({
	getInitialState: function() {
		return {};
	},
	onChange: function(day) {
		if(this.props.isRange) {
			if(!!this.props.onChange) { 
				this.props.onChange({ startDate: this.state.startDate, endDate: this.state.endDate }); 
			}
		} else {
			if(!!this.props.onChange) { this.props.onChange(day); }
		}
	},
	setStartDate: function(day) {
		this.setState({ startDate: day });
		setTimeout(() => {
			this.onChange();
		}, 50);
	},
	setEndDate: function(day) {
		this.setState({ endDate: day });
		setTimeout(() => {
			this.onChange();
		}, 50);
	},
	getDatepicker: function(isRange) {
		if(isRange) {
			return [<DatepickerContainer key={1}
						displayMonth={this.props.displayMonth}
						selectedDate={this.props.selectedDate}
						monthLabels={this.props.monthLabels}
						showControls={this.props.showControls}
						customStyle={this.props.customStyle}
						showDaysLabels={this.props.showDaysLabels}
						daysLabels={this.props.daysLabels}
						isInline={this.props.isInline}
						onChange={this.setStartDate} />,
					<DatepickerContainer key={2}
						displayMonth={this.props.displayMonth}
						selectedDate={this.props.selectedDate}
						monthLabels={this.props.monthLabels}
						showControls={this.props.showControls}
						customStyle={this.props.customStyle}
						showDaysLabels={this.props.showDaysLabels}
						daysLabels={this.props.daysLabels}
						isInline={this.props.isInline}
						onChange={this.setEndDate} />]
		} else {
			return <DatepickerContainer 
						displayMonth={this.props.displayMonth}
						selectedDate={this.props.selectedDate}
						monthLabels={this.props.monthLabels}
						showControls={this.props.showControls}
						customStyle={this.props.customStyle}
						showDaysLabels={this.props.showDaysLabels}
						daysLabels={this.props.daysLabels}
						isInline={this.props.isInline}
						onChange={this.props.onChange} />
		}
	},
	render: function() {
		return (<div>
					{this.getDatepicker(this.props.isRange)}
				</div>);
	}
});

module.exports = Datepicker;