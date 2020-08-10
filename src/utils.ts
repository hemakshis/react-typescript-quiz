export const shuffleArray = (array: any[]) =>
	[ ...array ].sort(() => .5 - Math.random())