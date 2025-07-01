import type { InitialCardProps } from "@/models/Questions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";

function InitialCard({ Question }: InitialCardProps) {
    const { statement, answers, correct_answer } = Question;

    const [selected, setSelected] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string>("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected) {
            setError("SELECCIONE ALGO");
            setSubmitted(false);
        } else {
            setError("");
            setSubmitted(true);
        }
    };

    useEffect(() => {
        setSelected(null);
        setSubmitted(false);
        setError("");
    }, [Question]);


    return (
    <div className="flex-col">
        <Card className="h-auto flex
                        flex-col
                        justify-center
                        items-center
                        bg-transparent
                        border-[#58d68d]
                        border-4
                        p-4
                        ">
        <CardHeader className="flex justify-center items-center gap-2">
            <span className="text-2xl leading-none">💡</span>
            <CardTitle className="text-2xl text-white">Preguntero</CardTitle>
            <span className="text-2xl leading-none">🧪</span>
        </CardHeader>
        <CardContent className="text-white w-full">
            <p className="font-bold mb-4">{statement}</p>

            <form onSubmit={onSubmit} className="space-y-4">
            <RadioGroup
                value={selected ?? undefined}
                onValueChange={(val) => {
                setSelected(val);
                setSubmitted(false);
                setError("");    
                }}
                name="respuesta"
                className="flex flex-col space-y-2"
            >
                {answers.map(({ letter, text }) => (
                <div key={`${letter}-${text}`} className="flex items-center space-x-3">
                        <RadioGroupItem
                            value={letter}
                            id={`answer-${letter}`}
                            className="w-5 h-5 rounded-full border-2
                                    border-gray-300 cursor-pointer
                                    focus:outline-none focus:ring-2 focus:ring-green-400
                                    data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label htmlFor={`answer-${letter}`} className="cursor-pointer select-none font-normal">
                        {letter}. {text}
                    </Label>
                </div>
                ))}
            </RadioGroup>

            <button
                type="submit"
                disabled={!selected}
                        className="w-full py-2 rounded bg-green-600 text-white
                                hover:bg-green-700 transition disabled:opacity-50
                                disabled:cursor-not-allowed"
            >
                Contestar
            </button>
            </form>
            
        </CardContent>
        </Card>
        <div className="w-full flex justify-center">    
            {error && (
                <p className="mt-4 font-bold text-red-500">{error}</p>
            )}
            
            {submitted && (
            <div className="mt-4 font-bold">
                {selected === correct_answer ? (
                <p className="text-green-400">¡Respuesta correcta! ✅</p>
                ) : (
                <div className="flex flex-col">
                    <p className="flex justify-center text-red-400">Respuesta incorrecta ❌</p>
                    <p className="text-yellow-300 mt-1">
                    La respuesta correcta es: <strong>{correct_answer}. {answers.find(a => a.letter === correct_answer)?.text}</strong>
                    </p>
                </div>
                )}
            </div>
            )}
        </div>
    </div>
)}

export default InitialCard;
