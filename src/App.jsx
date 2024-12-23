import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header'
import React, { Suspense } from "react";

const NewsFeed = React.lazy(() => import("./page/NewsFeed"));
const NewsDetails = React.lazy(() => import("./page/NewsDetails"));

function App() {

  return (
    <Router>
      <Header/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<NewsFeed />} />
          <Route path="/news/:id" element={<NewsDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App
