import { shuffleArray } from './utils'

export type Question = {
	category: string,
	correct_answer: string,
	difficulty: string,
	incorrect_answers: string[],
	question: string,
	type: string
}

export type QuestionObject = Question & { options: string[] }

export enum Difficulty {
	EASY = "easy",
	MEDIUM = "medium",
	HARD = "hard"
}

export const fetchQuizQuestions = async (
	amount: number, 
	difficulty: Difficulty
): Promise<QuestionObject[]> => {
	const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficult=${difficulty}&type=multiple`
	const data = await (await fetch(endpoint)).json()
	return data.results.map((question: Question) => (
		{
			...question,
			options: shuffleArray([
				...question.incorrect_answers, 
				question.correct_answer
			]),
		}
	))
}