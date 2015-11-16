var React = require("react");
var CalendarUtil = require("../utils/CalendarUtil");
var Calendar = require("./Calendar");

var Datepicker = React.createClass({
	getInitialState: function() {
		var monthDays = CalendarUtil.calendar();
		return { monthDays: monthDays };
	},
	render: function() {
		return (<div>
					<Calendar dates={this.state.monthDays} />
				</div>);
	}
})

module.exports = Datepicker;