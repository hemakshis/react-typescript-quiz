import React from 'react'
import { AnswerObject } from '../App'
// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.style'

type Props = {
	question: string,
	options: string[],
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
	userAnswer: AnswerObject | undefined,
	questionNumber: number,
	totalQuestions: number,
}

const QuestionCard: React.FC<Props> = ({ 
	question, 
	options, 
	callback, 
	userAnswer, 
	questionNumber, 
	totalQuestions
}) => (
	<Wrapper>
		<p className="number">
			Question: {questionNumber} / {totalQuestions}
		</p>
		<p dangerouslySetInnerHTML={{ __html: question }}></p>
		<div>
			{
				options.map(option => (
					<ButtonWrapper 
						key={option}
						correct={userAnswer?.correctAnswer === option}
						userClicked={userAnswer?.answer === option}
					>
						<button disabled={!!userAnswer} value={option} onClick={callback}>
							<span dangerouslySetInnerHTML={{ __html: option }}></span>
						</button>
					</ButtonWrapper>
				))
			}
		</div>
	</Wrapper>
)

export default QuestionCard