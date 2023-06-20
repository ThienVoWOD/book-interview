exports.Request = class {
	constructor(body) {
		this.body = body;
	}
};

exports.Response = class {
	constructor() {
	}

	send(data) {
		this.data = data;
		return this;
	}

	status(httpStatus) {
		this.httpStatus = httpStatus;
		return this;
	}

	json(data) {
		this.data = data;
		return this;
	}

	async resolve() {
		let time = 0;
		let interval;
		return new Promise((resolve, reject) => {
			interval = setInterval(() => {
				if (this.data) {
					clearInterval(interval);
					resolve(this.data);
				}
				time += 100;
				if (time > 100 * 30) {
					clearInterval(interval);
					reject(`http time out after ${100 * 30} microseconds` );
				}
			}, 100);
		})
	}
}