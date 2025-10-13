import './App.css';
import { geomanticFigures } from "./data/figures";
import FigureCard from "./components/FigureCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Geomantic Figures</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {geomanticFigures.map((figure) => (
          <FigureCard key={figure.name} name={figure.name} pattern={figure.pattern} />
        ))}
      </div>
    </div>
  );
}

export default App;
