import React, { useState } from 'react';
import { FaChartBar } from 'react-icons/fa'; // Importing a chart icon
import TextGenerationPage from './TextGenerationPage';
import './App.css';
import CustomHeader from './components/CustomHeader';
import {Flex} from '@chakra-ui/react';
import Stati from './components/Stati'; // Import your Statistics component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fr from './components/Fr';



function App() {
  const [showStatisticalAnalysis, setShowStatisticalAnalysis] = useState(false);

  return (
    <Flex flexDir='column' h='100%'>
      <Router>
            <CustomHeader />
              <Routes>
                <Route path="/statistics" element={<Stati />} />
                <Route path="/frek" element={<Fr />} />
                <Route path="/" element={<TextGenerationPage />} />
              </Routes>
      </Router>
    </Flex>
  );
}

export default App;