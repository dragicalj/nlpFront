import React, { useState } from 'react';
import { FaUpload, FaPaperPlane,FaChartBar  } from 'react-icons/fa';
import './TextGenerationPage.css';

const TextGenerationPage = ({ showStatisticalAnalysis }) => {
  const [uploadedText, setUploadedText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [entropyResult, setEntropyResult] = useState('');
  const [shannonsEntropyResult, setShannonsEntropyResult] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const text = await readFile(file);
        setUploadedText(text);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleChatGPTInteraction = () => {
    // ChatGPT interaction logic
    setTimeout(() => {
      setGeneratedText("Hello! How can I assist you today?");
    }, 1000);
  };

  const handleSendMessage = () => {
    setUserMessage('');
    handleChatGPTInteraction();
  };

  const calculateEntropy = (text) => {
    setEntropyResult('8.062');
  };

  const calculateShannonsEntropy = (text) => {
    // Shannon's entropy calculation logic
    setShannonsEntropyResult('0.805');
  };
 

  const [showGraph, setShowGraph] = useState(false); // State to control graph visibility

  const handleDrawZipfGraph = () => {
    setShowGraph(true); // Toggle graph visibility
  };

  // Example data for the Zipf distribution graph
  const graphData = [
    { word: 'the', frequency: 80 },
    { word: 'and', frequency: 40 },
    { word: 'to', frequency: 20 },
    { word: 'of', frequency: 8 },
    { word: 'or', frequency: 3 },
    { word: '.', frequency: 3 },
    { word: 'a', frequency: 3 },
    { word: 'this', frequency: 3 },
  ];

  const barWidth = 20; // Width of each bar
    const maxFrequency = Math.max(...graphData.map(item => item.frequency)) + 5; // Calculate max frequency and add some padding

  return (
    <div className="text-generation-page">
      <div className="left-section">
        <div className="text-editor">
          <textarea value={uploadedText} readOnly />
        </div>
      </div>
      <div className="right-section">
        {showStatisticalAnalysis ? (
          <div className="statistical-analysis-container">
           <div className="statistical-analysis">
              <div className="calculation-section">
                <button onClick={() => calculateEntropy(uploadedText)}>Calculate the entropy of the text</button>
                <span className="result-field" >{entropyResult}</span>
              </div>
              <div className="calculation-section">
                <button onClick={() => calculateShannonsEntropy(uploadedText)}>Calculate Shannon's entropy</button>
                <span className="result-field">{shannonsEntropyResult}</span>
              </div>
            </div>

            <div className="zipf-section">
              <button onClick={handleDrawZipfGraph}>
                <FaChartBar />
                Draw Zipf Distribution Graph
              </button>
              {showGraph && (
                <div className="graph-container">
                <svg viewBox={`0 0 ${graphData.length * barWidth} ${maxFrequency + 10}`} className="graph-placeholder">
                    {/* Draw bars */}
                    {graphData.map((item, index) => (
                      <rect 
                        key={index} 
                        x={index * barWidth + 10} 
                        y={maxFrequency - item.frequency} 
                        width={barWidth - 2}
                        height={item.frequency} 
                        fill="#007bff"
                      />
                    ))}
                    {/* X-axis */}
                    <line x1="0" y1={maxFrequency} x2={graphData.length * barWidth} y2={maxFrequency} stroke="black"/>
                    {/* Y-axis */}
                    <line x1="10" y1="0" x2="10" y2={maxFrequency} stroke="black"/>
                    {/* X-axis labels */}
                    {graphData.map((item, index) => (
                      <text
                        key={index}
                        x={index * barWidth + 10}
                        y={maxFrequency + 10}
                        fontSize="5"
                        textAnchor="middle"
                      >
                        {item.word}
                      </text>
                    ))}
                    {/* Y-axis labels (frequency scale) */}
                    {/* Adjust as needed for your scale */}
                    <text x="5" y={maxFrequency / 2} fontSize="5" textAnchor="end">{maxFrequency / 2}</text>
                    <text x="5" y={maxFrequency} fontSize="5" textAnchor="end">{maxFrequency}</text>
                  </svg>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="upload-section">
              <label className="upload-label" htmlFor="fileInput">
                <FaUpload className="upload-icon" />
                Click to Upload
              </label>
              <input type="file" id="fileInput" accept=".txt" onChange={handleFileUpload} />
            </div>
            <div className="chat-container">
              <div className="chat-history">
                <div className="message user-message">User: {userMessage}</div>
                <div className="message chatgpt-message">ChatGPT: {generatedText}</div>
              </div>
              <div className="user-input">
                <textarea placeholder="Type your message..." value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
                <button onClick={handleSendMessage}>
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TextGenerationPage;