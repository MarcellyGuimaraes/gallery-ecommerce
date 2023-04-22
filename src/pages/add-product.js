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

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/products', productData)
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

  return (
    <form>
      {/* TITULO */}
      <div class="mb-6">
        <label
          for="title"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Título
        </label>
        <input
          type="text"
          id="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={productData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* DESCRIÇÃO */}
      <div class="mb-6">
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Descrição
        </label>
        <textarea
          id="description"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={productData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* PREÇO */}
      <div class="mb-6">
        <label
          for="price"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Preço
        </label>
        <input
          type="text"
          id="price"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="R$ 123,00"
          value={productData.price}
          onChange={handleChange}
          required
        />
      </div>

      {/* WHATSAPP */}
      <div class="mb-6">
        <label
          for="whatsapp"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Link para Whatsapp
        </label>
        <input
          type="text"
          id="whatsapp"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={productData.whatsappLink}
          onChange={handleChange}
          required
        />
      </div>

      {/* ATIVO */}
      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            id="active"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          for="active"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Ativo
        </label>
      </div>

      {/* IMAGEM */}
      <div class="mb-6">
        <label
          for="imagem"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Imagem
        </label>
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          id="user_avatar"
          type="file"
        />
        {/* <input
          type="text"
          id="imagem"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        /> */}
      </div>

      <button
        onClick={handleSave}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Adicionar produto
      </button>
    </form>

    //   <form class="md:flex md:items-center mb-6">
    //     <label>
    //       Imagem:
    //       <input
    //         class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
    //         type="text"
    //         name="image"
    //         value={productData.image}
    //         onChange={handleChange}
    //       />
    //     </label>
  )
}
