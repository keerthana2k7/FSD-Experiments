import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Categories from './components/Categories';
import Search from './components/Search';
import About from './components/About';
import PostDetail from './components/PostDetail';

function App() {
  const [page, setPage] = React.useState("home");
  const [selectedPost, setSelectedPost] = React.useState(null);

  return (
    <Router>
      <Nav setPage={setPage} />
      <Routes>
        <Route path="/" element={<Home openPost={setSelectedPost} />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<PostDetail post={selectedPost} />} />        
      </Routes>
    </Router>
  );
}
