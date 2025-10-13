import logo from './logo.svg';
import './App.css';
import { geomanticFigures } from "./data/figures";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-amber-100 to-amber-300">
      <h1 className="text-4xl font-bold text-amber-800 mb-4">
        EarthOracle
      </h1>
      <p className="text-lg text-amber-900">
        Tailwind is working!
      </p>
    </div>
  );
}

export default App;
