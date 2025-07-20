import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Posts from './components/Posts/Posts'
import Products from './components/Products/Products'
import Recipes from './components/Recipes/Recipes'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Login from './components/Login/Login'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/products" element={<Products />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
