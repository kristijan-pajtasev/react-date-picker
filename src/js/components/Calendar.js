var React = require("react"); 

var Calendar = React.createClass({
	getInitialState: function() {
		var state = {};
		if(this.props.selectedDay) {
			state.selectedDay = this.props.selectedDay
		} 
		return state;
	},
	setActive(day, canBeSet) {
		if(canBeSet) {
			this.setState({ selectedDay: day });
			this.props.onChange(day);
		}
	},
	getWeeks: function(weeks) {
		let weekRows = weeks.map((w,i) => { return <tr className="week" key={i*Math.random()}>{this.getWeek(w)}</tr>; } );
		return <tbody>{weekRows}</tbody>;
	},
	getWeek: function(week) {
		var selectedDay = this.state.selectedDay;
		return week.map((d,i) => { 

			var classes = ["day"];
			if(d.getMonth() != this.props.selectedMonth) { classes.push("disabled"); }

			if(!!selectedDay && (d.getDate() == selectedDay.getDate() &&
				d.getMonth() == selectedDay.getMonth() &&
				d.getFullYear() == selectedDay.getFullYear())) { classes.push("selected"); }

			if(!!this.props.minimumDate && this.props.minimumDate>d) {
				classes.push("disabled");
			}

			return (<td onClick={this.setActive.bind(null, d, classes.indexOf("disabled") < 0)} 
								className={classes.join(" ")} 
								key={Math.random()*i}>{d.getDate()}</td>); } );
	},
	getHeader: function(showControls) {
		let prev = '<';
		let next = '>';
		if(showControls) {  
			return (<caption className="controls">
						<div>
							<div className="prev" onClick={this.props.changeYear.bind(null, -1)}>{prev}</div>
							Year: {this.state.selectedDay.getFullYear()}
							<div className="next" onClick={this.props.changeYear.bind(null, 1)}>{next}</div>
						</div>

						<div>
							<div className="prev" onClick={this.props.changeMonth.bind(null, -1)}>{prev}</div>
							Month: {this.state.selectedDay.getMonth() + 1}
							<div className="next" onClick={this.props.changeMonth.bind(null, 1)}>{next}</div>
						</div>
					</caption>);
		} else {
			return null;
		}
	},
	render: function() {
		return <table className="calendar">{this.getHeader(this.props.showControls)}{this.getWeeks(this.props.dates)}</table>;
	}
});

module.exports = Calendar;