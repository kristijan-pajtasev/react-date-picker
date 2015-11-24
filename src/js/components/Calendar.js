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
			if(d.getMonth() != this.props.dates[2][2].getMonth()) { 
				classes.push("disabled"); 
			}

			if(!!selectedDay && (d.getDate() == selectedDay.getDate() &&
				d.getMonth() == selectedDay.getMonth() &&
				d.getFullYear() == selectedDay.getFullYear())) { 
				classes.push("selected");
			}

			if(!!this.props.minimumDate && this.props.minimumDate>d) {
				classes.push("disabled");
			}

			return (<td onClick={this.setActive.bind(null, d, classes.indexOf("disabled") < 0)} 
								className={classes.join(" ")} style={this.getStyleForClasses(classes)}
								key={Math.random()*i}>{d.getDate()}</td>);  
		} );
	},
	getStyleForClasses: function(classes) {
		let style = {}
		if(classes.indexOf('day') >= 0) {
			let dayStyle = this.props.customStyle.day || {};
			let keys = Object.keys(dayStyle);
			for(let i = 0, length = keys.length; i < length; i++) {
				let key = keys[i];
				style[key] = dayStyle[key]
			}
		}
		if(classes.indexOf('selected') >= 0) {
			let selectedStyle = this.props.customStyle.selected || {};
			let keys = Object.keys(selectedStyle);
			for(let i = 0, length = keys.length; i < length; i++) {
				let key = keys[i];
				style[key] = selectedStyle[key]
			}
		} 
		if(classes.indexOf('disabled') >= 0) {
			let disabledStyle = this.props.customStyle.disabled || {};
			let keys = Object.keys(disabledStyle);
			for(let i = 0, length = keys.length; i < length; i++) {
				let key = keys[i];
				style[key] = disabledStyle[key]
			}
		} 
		return style;
	},
	getCaption: function(showControls) {
		let prev = '<';
		let next = '>';
		if(showControls) {  
			return (<caption className="controls" style={this.props.customStyle.controls || {}}>
						<div>
							<div className="prev" onClick={this.props.changeYear.bind(null, -1)}
								 style={this.props.customStyle.prev || {}}>{prev}</div>
							Year: {this.state.selectedDay.getFullYear()}
							<div className="next" onClick={this.props.changeYear.bind(null, 1)}
								 style={this.props.customStyle.next || {}}>{next}</div>
						</div>

						<div>
							<div className="prev" onClick={this.props.changeMonth.bind(null, -1)}
								 style={this.props.dates[2][2].prev || {}}>{prev}</div>
							Month: {this.props.dates[2][2].getMonth() + 1}
							<div className="next" onClick={this.props.changeMonth.bind(null, 1)}
								 style={this.props.customStyle.next || {}}>{next}</div>
						</div>
					</caption>);
		} else {
			return null;
		}
	},
	getHeader: function(showHeader) {
		if(showHeader) {
			var days = 
				this.props.daysLabels
					.map((d, i) => <th className="dayLabel" key={i}>{d}</th>)
			return (
				<thead>
					<tr>
						{days}
					</tr>
				</thead>
			)
		} else {
			return null;
		}
	},
	render: function() {
		return (<table className="calendar" style={this.props.customStyle.calendar || {}}>
					{this.getHeader(this.props.showDaysLabels)}
					{this.getCaption(this.props.showControls)}{this.getWeeks(this.props.dates)}
				</table>);
	}
});

module.exports = Calendar;