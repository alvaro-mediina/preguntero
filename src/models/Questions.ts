export type Questions = {
    statement: string;
    answers: { letter: string; text: string }[];
    correct_answer: string;
};

export type InitialCardProps = {
  Question: Questions
}

export function parseQuestions(text: string): Questions[] {
  const rawBlocks = text.split(/\n\s*\n/);

  const questions: Questions[] = [];

  for (const block of rawBlocks) {
    const lines = block
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    if (lines.length === 0) continue;

    let statementLines: string[] = [];
    const answers: { letter: string; text: string }[] = [];
    let correctAnswer = '';

    const vfAnswers = ['verdadero', 'falso'];

    for (const line of lines) {
      // Revisar si línea es opción letra a-e
      const letterMatch = line.match(/^([a-e])\.\s*(.*?)(\s*✅)?$/i);
      if (letterMatch) {
        const letter = letterMatch[1].toLowerCase();
        const text = letterMatch[2].trim();
        const isCorrect = Boolean(letterMatch[3]);
        if (isCorrect) correctAnswer = letter;
        answers.push({ letter, text });
        continue;
      }

      // Revisar si línea es Verdadero/Falso
      const lowerLine = line.toLowerCase();
      if (vfAnswers.some(vf => lowerLine.startsWith(vf))) {
        const letter = lowerLine.startsWith('verdadero') ? 'v' : 'f';
        // Quitar el emoji de correcto si está
        const text = line.replace(/✅/g, '').trim();
        const isCorrect = line.includes('✅');
        if (isCorrect) correctAnswer = letter;
        answers.push({ letter, text });
        continue;
      }

      // Si no es respuesta, es parte del enunciado
      statementLines.push(line);
    }

    const statement = statementLines.join(' ');

    if (statement && answers.length > 0 && correctAnswer) {
      questions.push({ statement, answers, correct_answer: correctAnswer });
    } else {
      console.warn("Bloque inválido omitido:\n", block);
    }
  }

  return questions;
}