import React, { createContext, useContext, useState } from 'react';

export const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [showResults, setShowResults] = useState(false);

  return (
    <AnalysisContext.Provider value={{ selectedCategories, setSelectedCategories, selectedCriteria, setSelectedCriteria, showResults, setShowResults }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);


