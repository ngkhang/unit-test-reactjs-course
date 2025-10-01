/**
 * Author: TrungQuanDev: https://youtube.com/@trungquandev
 *
 * Order an array of objects based on another array & return new Ordered Array
 * If the key is not found in the orderArray, it will be placed at the end of the returned array.
 * The originalArray will not be modified.
 *
 * @param {*} originalArray
 * @param {*} orderArray
 * @param {*} key = Key to order
 * @return new Ordered Array
 */

export const mapOrder = (
	originalArray: any[],
	orderArray: any[],
	key: string
) => {
	if (!originalArray || !orderArray || !key) return [];
	return [...originalArray].sort((a, b) => {
		const indexA = orderArray.indexOf(a[key]);
		const indexB = orderArray.indexOf(b[key]);
		return (
			(indexA === -1 ? Infinity : indexA) -
			(indexB === -1 ? Infinity : indexB)
		);
	});
};
