import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CustomHeader from './components/CustomHeader';
import TextGenerationPage from './components/TextGenerationPage';
import Statistical from './components/Statistical';
import Categories from './components/Categories';
import CompareCategories from './components/CompareCategories';
import Frequency from './components/Frequency';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [sharedText, setSharedText] = useState('');
  const[textId, setTextId]=useState(''); 

  return (
    <Router>
      {isLoggedIn && <CustomHeader onLogout={() => setLoggedIn(false)} />}

      <Routes>
        <Route path="/login" element={<LoginPage onLogin={() => setLoggedIn(true)} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={!isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/home" />} />

        {isLoggedIn ? (
          <>
            <Route path="/home" element={<TextGenerationPage setSharedText={setSharedText} setTextId={setTextId}/>} /> {/* Prosledite setSharedText */}
            <Route path="/statistics" element={<Statistical sharedText={sharedText} setSharedText={setSharedText} textId={textId} setTextId={setTextId}/>} />
            <Route path="/frek" element={<Frequency sharedText={sharedText} setSharedText={setSharedText} textId={textId} setTextId={setTextId}/>} /> {/* Prosledite sharedText */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/categoriescompare" element={<CompareCategories />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;