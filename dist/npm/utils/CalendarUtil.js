module.exports = (function () {

	function calendar(date) {
		if (!date) {
			date = new Date();
		}
		date.setDate(1);

		if (date.getDay() > 1 || date.getDay() == 0) {
			if (date.getDay() > 1) {
				date.setDate(2 - date.getDay());
			} else if (date.getDay() == 0) {
				date.setDate(-5);
			}
		}

		var dates = [];
		for (var i = 0; i < 42; i++) {
			var index = Math.floor(i / 7);
			if (!dates[index]) {
				dates[index] = [];
			}
			dates[index].push(new Date(date.getTime() + i * (24 * 60 * 60 * 1000)));
		}

		return dates;
	}

	return {
		calendar: calendar
	};
})();