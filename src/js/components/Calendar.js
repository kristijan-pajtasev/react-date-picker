var React = require("react");

var Calendar = React.createClass({
	getWeeks: function(weeks) {
		let weekRows = weeks.map((w,i) => { return <li key={i*Math.random()}>{this.getWeek(w)}</li>; } );

		return <ul>{weekRows}</ul>
		// for(let i = 0, length = weeks.length; i < length; i++) {
		// 	return <ul><li>hello</li></ul>
		// 	// return this.getWeek(weeks[i]);
		// }
	},
	getWeek: function(week) {
		let days = week.map((d,i) => { return <li key={Math.random()*i}>{d.getDate()}</li>; } );
		return <ul>{days}</ul>
	},
	render: function() {
		return <div>{this.getWeeks(this.props.dates)}</div>;
	}
});

module.exports = Calendar;