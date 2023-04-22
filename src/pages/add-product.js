import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ProductContext } from '../contexts/ProductContext'

export default function AddProduct() {
  const [productData, setProductData] = useState({
    image: '',
    title: '',
    description: '',
    price: '',
    active: true,
    whatsappLink: '',
    createdAt: new Date().toISOString(),
  })
  const router = useRouter()
  const { addProduct } = useContext(ProductContext)

  const handleChange = (event) => {
    const { name, value } = event.target
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  console.log('Product data: ', productData)

  // const handleSave = async () => {
  //   try {
  //     const response = await axios.post('/api/products', productData)
  //     if (response.status === 201) {
  //       addProduct(productData) // adicionando o novo produto ao contexto
  //       setProductData({
  //         image: '',
  //         title: '',
  //         description: '',
  //         price: '',
  //         active: true,
  //         whatsappLink: '',
  //       })
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleSave = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('image', productData.image)
      formData.append('title', productData.title)
      formData.append('description', productData.description)
      formData.append('price', productData.price)
      formData.append('active', productData.active)
      formData.append('whatsappLink', productData.whatsappLink)
      formData.append('createdAt', productData.createdAt)

      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 201) {
        addProduct(productData) // adicionando o novo produto ao contexto
        setProductData({
          image: '',
          title: '',
          description: '',
          price: '',
          active: true,
          whatsappLink: '',
        })
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log('PRODUCT DATA: ', productData)
  return (
    <form>
      {/* TITULO */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Título
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="title"
          value={productData.title}
          onChange={handleChange}
        />
      </div>

      {/* DESCRIÇÃO */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Descrição
        </label>
        <textarea
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="description"
          value={productData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* PREÇO */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Preço
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="price"
          value={productData.price}
          onChange={handleChange}
        />
      </div>

      {/* WHATSAPP */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Link para Whatsapp
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="whatsappLink"
          value={productData.whatsappLink}
          onChange={handleChange}
        />
      </div>

      {/* ATIVO */}
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            type="checkbox"
            name="active"
            checked={productData.active}
            onChange={handleChange}
          />
        </div>
        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Ativo
        </label>
      </div>

      {/* IMAGEM */}
      <div className="mb-6">
        <label
          htmlFor="imagem"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Imagem
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0]
            setProductData((prevState) => ({
              ...prevState,
              image: file,
            }))
          }}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        {/* <input
          type="text"
          name="image"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        /> */}
      </div>

      <button
        onClick={handleSave}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Adicionar produto
      </button>
    </form>
  )
}
