import { useState } from "react";
import { type Questions, parseQuestions } from "./models/Questions";
import questionsRaw from "./data/questions.txt?raw";
import InitialCard from "./components/InitialCard";
import { shuffle } from "./utils/Utils";

function App() {
  const [questions] = useState<Questions[]>(() => parseQuestions(questionsRaw));
  // Estado para la pregunta actual, índice en el arreglo
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingIndex, setRemainingIndex] = useState<number[]>(shuffle([...Array(questions.length).keys()]));

  // Función para elegir otra pregunta aleatoria
  const changeQuestion = () => {
    let nextRemaining = remainingIndex;

    // Si ya se mostraron todas, remezclo
    if (nextRemaining.length === 0) {
      nextRemaining = shuffle([...Array(questions.length).keys()]);
    }

    // Elijo un índice aleatorio dentro de los que quedan
    const randPos = Math.floor(Math.random() * nextRemaining.length);
    const nextIndex = nextRemaining[randPos];

    // Quito ese índice del arreglo
    const newRemaining = [...nextRemaining];
    newRemaining.splice(randPos, 1); // elimina 1 elemento en la posición randPos

    //Seteo el índice que queda y el siguiente
    setCurrentIndex(nextIndex);
    setRemainingIndex(newRemaining);
  };

  return (
    <div className="flex flex-col justify-center items-center min-w-screen min-h-screen bg-[#2c3e50] p-4 space-y-6">
      <InitialCard key={currentIndex} Question={questions[currentIndex]} />
      
      <button
        onClick={changeQuestion}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold w-64"
      >
        Nueva Pregunta
      </button>
    </div>
  );
}

export default App;
