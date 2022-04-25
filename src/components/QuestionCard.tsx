import { FunctionComponent } from "react";
import { AnswerObject } from '../App';

type Props = {
        question:string;
        answers:string[];
        callback:(e: React.MouseEvent<HTMLButtonElement>) => void;
        userAnswer:AnswerObject | undefined;
        questionNr:number;
        totalQuestion:number;
}
const QuestionCard : FunctionComponent <Props> = ({question,answers,callback,questionNr,totalQuestion,userAnswer})=>(
    <div>
        <p className="number">
            Question: {questionNr} / {totalQuestion}
        </p>
        <p dangerouslySetInnerHTML={{__html:question}} />
        <div>
            {answers.map(answer=>(
                <div key={answer}>
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html:answer}} />
                    </button>
                </div>
            ))}
        </div>
    </div>
) 
export default QuestionCard;