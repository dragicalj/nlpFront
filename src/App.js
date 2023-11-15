import React, { useState } from 'react';
import { FaChartBar } from 'react-icons/fa'; // Importing a chart icon
import TextGenerationPage from './TextGenerationPage';
import './App.css';

function App() {
  const [showStatisticalAnalysis, setShowStatisticalAnalysis] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <div className="app-header-content">
          <FaChartBar className="app-logo" /> {/* Chart icon as a logo */}
          <h1>Quantitative text analysis</h1>
        </div>
        <nav>
          <ul className="nav-list">
            <li><a href="#tokenization">Tokenization</a></li>
            <li><a href="#tokenFrequency">Token Frequency Analysis</a></li>
            <li>
              <a href="#/" onClick={(e) => {
                e.preventDefault();
                setShowStatisticalAnalysis(prevState => !prevState);
              }}>
                Statistical Text Analysis
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <TextGenerationPage showStatisticalAnalysis={showStatisticalAnalysis} />
      </main>
    </div>
  );
}

export default App;
