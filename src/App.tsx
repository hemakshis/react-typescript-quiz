import React, { useState } from 'react'
import { fetchQuizQuestions } from './Api'
// Components
import QuestionCard from './components/QuestionCard'
// Types
import { Difficulty, QuestionObject } from './Api'
// Styles
import { GlobalStyle, Wrapper } from './App.styles'

const TOTAL_QUESTIONS: number = 10
export type AnswerObject = {
	question: string,
	answer: string,
	correct: boolean,
	correctAnswer: string
}

const App = () => {

	const [loading, setLoading] = useState<boolean>(false)
	const [questions, setQuestions] = useState<QuestionObject[]>([])
	const [questionNumber, setQuestionNumber] = useState<number>(0)
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
	const [score, setScore] = useState<number>(0)
	const [gameOver, setGameOver] = useState<boolean>(true)

	const startTrivia = async () => {
		// Reset defaults
		setLoading(true)
		setGameOver(false)
		setScore(0)
		setUserAnswers([])
		setQuestionNumber(0)

		const newQuestions = await fetchQuizQuestions(
			TOTAL_QUESTIONS, 
			Difficulty.EASY
		)
		setQuestions(newQuestions)
		setLoading(false)
	}

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			// User's answer
			const usersAnswer = e.currentTarget.value
			// Check answer
			const correct = questions[questionNumber].correct_answer === usersAnswer
			// Add score if answer is correct
			if (correct) 
				setScore(prev => prev + 1)
			// Save answer in the array for user's answers
			const answerObject: AnswerObject = {
				question: questions[questionNumber].question,
				answer: usersAnswer,
				correct,
				correctAnswer: questions[questionNumber].correct_answer
			}

			setUserAnswers(prev => [ ...prev, answerObject ])
		}
	}

	const nextQuestion = () => {
		// Move on to the next question if not the last question
		const nextQuestionNumber: number = questionNumber + 1
		if (nextQuestionNumber === TOTAL_QUESTIONS)
			setGameOver(true)
		else
			setQuestionNumber(nextQuestionNumber)
	}

	return (
		<>
			<GlobalStyle />
			<Wrapper>
				<h1>REACT TYPESCRIPT QUIZ</h1>
				{
					(gameOver || userAnswers.length === TOTAL_QUESTIONS) && 
						<button className="start" onClick={startTrivia}>
							Start
						</button>	
				}
				{ !gameOver && <p className="score">Score: { score }</p> }
				{ loading && <p>Loading Questions...</p> }
				{ 
					!loading && 
					!gameOver && 
					<QuestionCard
						question={questions[questionNumber].question}
						options={questions[questionNumber].options}
						userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
						callback={checkAnswer}
						questionNumber={questionNumber+1}
						totalQuestions={TOTAL_QUESTIONS}
					/>
				}
				{
					!loading && 
					!gameOver && 
					(userAnswers.length === questionNumber + 1) && 
					(questionNumber !== TOTAL_QUESTIONS - 1) &&
					<button className="next" onClick={nextQuestion}>
						Next Question
					</button>
				}
			</Wrapper>
		</>
	)
}

export default App
