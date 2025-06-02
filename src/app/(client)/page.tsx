import React from 'react'
import Header from './_components/header'
import About from './_components/about'
import Footer from './_components/footer'
import Hero from './_components/hero'
import NewsLetter from './_components/newsletter'
import Products from './_components/products'
import SpecialProducts from './_components/sepicalProducts'

const HomePage = () => {
  return (
    <>
          <Header />
            <Hero />
            <SpecialProducts />
            <About />
            <Products />
            <NewsLetter />
            <Footer />
          
    </>
  )
}

export default HomePage
