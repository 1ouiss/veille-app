import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Article from './pages/Article';
import { useEffect } from 'react';
import { useState } from 'react';


function App() {

  const [localStorageArticles, setLocalStorageArticles] = useState([])

  useEffect(() => {
    const articlesLocal = localStorage.getItem('articles')
    if (articlesLocal) {
      setLocalStorageArticles(JSON.parse(articlesLocal))
    }
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home localStorageArticles={localStorageArticles}/>} />
        <Route path=":id" element={<Article localStorageArticles={localStorageArticles} setLocalStorageArticles={setLocalStorageArticles}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
