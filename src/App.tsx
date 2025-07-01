import { useState } from "react";
import { type Questions, parseQuestions } from "./models/Questions";
import questionsRaw from "./data/questions.txt?raw";
import InitialCard from "./components/InitialCard";

function App() {
  const [questions] = useState<Questions[]>(() => parseQuestions(questionsRaw));
  
  // Estado para la pregunta actual, índice en el arreglo
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para elegir otra pregunta aleatoria
  const changeQuestion = () => {
    if (questions.length <= 1) return;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * questions.length);
    } while (newIndex === currentIndex);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="flex flex-col justify-center items-center min-w-screen min-h-screen bg-[#2c3e50] p-4 space-y-6">
      <InitialCard Question={questions[currentIndex]} />
      
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
