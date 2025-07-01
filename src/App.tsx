import { useState } from "react";
import { type Questions, parseQuestions } from "./models/Questions";
import questionsRaw from "./data/questions.txt?raw";
import InitialCard from "./components/InitialCard";

function App() {

  const [questions] = useState<Questions[]>(()=> parseQuestions(questionsRaw))
  
  console.log(questions.length)

  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen bg-[#2c3e50]">
      <InitialCard Question={questions[0]}/>
    </div>
  );
}

export default App;
