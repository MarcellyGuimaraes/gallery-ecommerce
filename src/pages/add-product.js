import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const PAGE_TITLE = 'Novo Produto'
export default function AddProduct() {
  const [productData, setProductData] = useState({
    image: '',
    description: '',
    price: '',
    active: true,
    whatsappLink: '',
    createdAt: new Date().toISOString(),
  })
  const router = useRouter()
  const handleChange = (event) => {
    const { name, value } = event.target
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/products', productData)
      if (response.status === 201) {
        const newProductList = [...productList, productData]
        setProductList(newProductList)
        setProductData({
          image: '',
          description: '',
          price: '',
          active: true,
          whatsappLink: '',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form>
      <label>
        Imagem:
        <input
          type="text"
          name="image"
          value={productData.image}
          onChange={handleChange}
        />
      </label>
      <label>
        Descrição:
        <input
          type="text"
          name="description"
          value={productData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Valor:
        <input
          type="text"
          name="price"
          value={productData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Ativo:
        <input
          type="checkbox"
          name="active"
          checked={productData.active}
          onChange={handleChange}
        />
      </label>
      <label>
        Link para o Whatsapp:
        <input
          type="text"
          name="whatsappLink"
          value={productData.whatsappLink}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={handleSave}>
        Salvar
      </button>
    </form>
  )
}
