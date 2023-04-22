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

  // função para adicionar um novo produto
  const addProduct = async (productData, imageFile) => {
    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      formData.append('title', productData.title)
      formData.append('description', productData.description)
      formData.append('price', productData.price)
      formData.append('active', productData.active)
      formData.append('whatsappLink', productData.whatsappLink)
      formData.append('createdAt', productData.createdAt)

      const response = await axios.post('/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log('PROD: ', productData)

      if (response.status === 201) {
        const newProduct = {
          ...productData,
          image: response.data.image, // adiciona a URL da imagem ao objeto do produto
        }
        setProducts((prevProducts) => [...prevProducts, newProduct])
      } else {
        console.log('Erro ao adicionar produto')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  )
}
