'use client'
import { use, useState } from "react";
import { questions } from "../../questions";

const page = () => {

  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [text, setText] = useState<string>();
  const question = questions[currentPage];

  const onSubmit = () => {
    if (selectedAnswer == question.correct)
      setCorrectCount(correctCount+1);
    else 
      setText(`Wrong answer. Correct is: ${question.items[question.correct]}`);

    setIsSubmitted(true);
  }

  return (
    <>
      <h1>{question.question} ({currentPage + 1}/{questions.length}) {correctCount}</h1>
      {question.items.map((i, index) => {
        return (
          <div key={index} onClick={() => setSelectedAnswer(index)}>
            <input checked={selectedAnswer == index} type="checkbox" id={`index-${index}`} name={`index-${index}`} />
            <label htmlFor={`index-${index}`}>{i}</label>
          </div>
        )
      })}
      {selectedAnswer != undefined && !isSubmitted && <button onClick={onSubmit}>Submit</button>}
      {text && <span>{text}</span>}
      {isSubmitted && <button onClick={() => {
        setCurrentPage(currentPage + 1);
        setSelectedAnswer(undefined);
        setText(undefined);
        setIsSubmitted(false);
      }}>Next page</button>}
    </>
  )
}
export default page;