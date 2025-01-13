'use client'
import { use, useEffect, useState } from "react";
import { questions } from "../../questions";

const page = () => {

  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [text, setText] = useState<string>();
  const [shuffled, setShuffled] = useState<any[]>(shuffleArray(questions));
  const [shuffledQuestions, setShuffledQuestions] = useState<string[]>([]);
  
  const question = shuffled[currentPage];

  useEffect(() => {
    setShuffledQuestions(shuffleArray(shuffled[currentPage].items));
  }, [currentPage])

  const onSubmit = () => {
    if (selectedAnswer == undefined) return;

    if (shuffledQuestions[selectedAnswer] == question.items[question.correct])
      setCorrectCount(correctCount+1);
    else 
      setText(`Wrong answer. Correct is: ${question.items[question.correct]}`);

    setIsSubmitted(true);
  }

  function shuffleArray(array: any[]) {
    let newArray = [...array];
    
    for (let i = newArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
    }
    return newArray;
}
  

  if (isSubmitted && currentPage == questions.length - 1)
    return (
      <>
        <span>Score {correctCount / questions.length * 100}</span>
        <button onClick={() => {
          setShuffled(shuffleArray(questions));
          setCurrentPage(0);
          setIsSubmitted(false);
        }}>Start again</button>
      </>
    )

  return (
    <>
      <h1>{question.question} ({currentPage + 1}/{questions.length}) {correctCount}</h1>
      {shuffledQuestions.map((i, index) => {
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