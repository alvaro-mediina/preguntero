import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold underline mb-4">
        Mi app con Shadcn + Tailwind
      </h1>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </div>
  );
}

export default App;
