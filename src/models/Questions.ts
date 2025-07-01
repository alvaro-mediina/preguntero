export type Questions = {
    statement: string;
    answers: { letter: string; text: string }[];
    correct_answer: string;
};

export type InitialCardProps = {
  Question: Questions
}

export function parseQuestions(text: string): Questions[] {
  // Dividir por bloques separados por una o más líneas vacías
  const rawBlocks = text.split(/\n\s*\n+/);

  const questions: Questions[] = [];

  for (const block of rawBlocks) {
    // Dividir cada bloque en líneas y filtrar líneas vacías
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);

    let statementLines: string[] = [];
    const answers: { letter: string; text: string }[] = [];
    let correctAnswer = '';

    // Recorrer línea por línea del bloque
    for (const line of lines) {
      // Detectar respuesta: comienza con letra a-e y punto
      const match = line.match(/^([a-e])\.\s*(.*?)(?:\s*✅)?$/i);

      if (match) {
        const letter = match[1].toLowerCase();
        let text = match[2].trim();

        // Si termina con ✅ (respuesta correcta)
        const isCorrect = line.includes('✅');

        if (isCorrect) correctAnswer = letter;

        // Quitar el emoji de texto por si quedó
        text = text.replace('✅', '').trim();

        answers.push({ letter, text });
      } else {
        // No es línea de respuesta, es parte del enunciado
        statementLines.push(line);
      }
    }

    const statement = statementLines.join(' ');

    if (statement && answers.length > 0) {
      questions.push({ statement, answers, correct_answer: correctAnswer });
    }
  }

  return questions;
}