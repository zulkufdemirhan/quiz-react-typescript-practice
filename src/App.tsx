import React, { useState } from 'react'
import QuestionCard from './components/QuestionCard'
import { fetchQuizQuestions } from './API';
import { QuestionsState, Difficulty } from './API';



export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
};
const TOTAL_QUESTIONS=10;

export default function App() {
    // !--------------------------------------------------------
    // Burada belirlediğimiz stateleri props olarak questioncard ' a gidecek.

    const [loading,setLoading] = useState(false);
    const [questions,setQuestions] = useState<QuestionsState[]>([]);
    const [number,setNumber] = useState(0);
    const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
    const [score,setScore] = useState(0);
    const [gameOver,setGameOver] = useState(true);
    console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))
    // !--------------------------------------------------------
    // it will be async function because we gonna make the api call .
    
    const startTrivia = async ()=>{
        setLoading(true);
        setGameOver(false);
        const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
        );
        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);

    }
    
    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            // User's answer
            const answer = e.currentTarget.value;
            // Check answer against correct answer
            const correct = questions[number].correct_answer === answer;
            // Add score if answer is correct
            if (correct) setScore((prev) => prev + 1);
            // Save the answer in the array for user answers
            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            };
            setUserAnswers((prev) => [...prev, answerObject]);
        }
    }
    const nextQuestion = () => {
             // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
        setGameOver(true);
    } else {
        setNumber(nextQ);
    }
    }

return (
    <div>

        <h1>React Quiz</h1>

            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className='start' onClick={startTrivia}>
                Start
            </button>
            ) : null}

    {/* -------------------------------------------------------- */}

            {!gameOver ? <p className='score'>Score: {score}</p> : null}
            {loading ? <p>Loading Questions...</p> : null}
            {!loading && !gameOver && (
            <QuestionCard
                questionNr={number + 1}
                totalQuestion={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
            />
            )}

     {/* !-------------------------------------------------------- */}

            {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
            <button className='next' onClick={nextQuestion}>
                Next Question
            </button>
            ) : null}
            
    </div>
)
}