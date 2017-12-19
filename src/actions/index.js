export function changeCoordinates(coordinates) {
	return {
		coords: coordinates,
		type: 'UPDATE_COORDINATES'
	};
}

export function showResult() {
	return {
		type: 'SHOW_RESULT'
	};
}

export function hideResult() {
	return {
		type: 'HIDE_RESULT'
	};
}