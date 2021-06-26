
// add ... to long string
export function truncateString(str : string, maxSize : number) {
	// return (str.length > maxSize) ? `${str.substr(0, maxSize-1)}&hellip;` : str;
	return (str.length > maxSize) ? `${str.substr(0, maxSize-1)}...` : str;
}

export function numberWithCommas(x : number) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}