import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  // Define o estado inicial como um array vazio
  const [products, setProducts] = useState([])

  async function loadProducts() {
    try {
      const response = await axios.get('/api/products') // Substitua pela URL da sua rota API
      const data = response.data.products
      setProducts(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadProducts()
  }, []) // Chama a função loadProducts apenas uma vez, quando o componente é montado

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct])
  }

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  )
}
