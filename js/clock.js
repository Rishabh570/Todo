import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

let time = observable({
	value: new Date()
});

setInterval(() => {
	time.value = new Date();
}, 1000);

export const Clock = observer(() => {
	const timeValue = time.value;

	const hours = timeValue.getHours();
	const minutes = timeValue.getMinutes();
	const seconds = timeValue.getSeconds();

	return (
		<h3 >
			{`${hours}:${minutes}:${seconds}`}
		</h3>

		);
})
