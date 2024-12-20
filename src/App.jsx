import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header/Header'
import NewsFeed from "./components/NewsFeed/NewsFeed";
import NewsDetails from './components/NewsDetails/NewsDetails';

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/news/:id" element={<NewsDetails />} />
      </Routes>
    </Router>
  );
}

export default App
