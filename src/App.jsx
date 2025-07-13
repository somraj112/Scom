import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Posts from './components/Posts/Posts'
import About from './components/About/About'
import Contact from './components/Contact/Contact'

function App() {
  return (
    <>
      <BrowserRouter basename="/React-Router-Demo">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
