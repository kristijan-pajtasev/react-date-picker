var React = require("react");

var Calendar = React.createClass({
	getInitialState: function() {
		return {};
	},
	setActive(day, canBeSet) {
		if(canBeSet) {
			this.setState({ selectedDay: day })
		}
	},
	getWeeks: function(weeks) {
		let weekRows = weeks.map((w,i) => { return <li key={i*Math.random()}>{this.getWeek(w)}</li>; } );
		return <ul>{weekRows}</ul>;
	},
	getWeek: function(week) {
		let days = week.map((d,i) => { 

			var classes = [];
			if(d.getMonth() != this.props.selectedMonth) { classes.push("disabled"); }
			if(d == this.state.selectedDay) { classes.push("selected"); }

			return (<li onClick={this.setActive.bind(null, d, classes.indexOf("disabled") < 0)} 
								className={classes.join(" ")} 
								key={Math.random()*i}>{d.getDate()}</li>); } );
		return <ul>{days}</ul>
	},
	render: function() {
		return <div className="calendar">{this.getWeeks(this.props.dates)}</div>;
	}
});

module.exports = Calendar;