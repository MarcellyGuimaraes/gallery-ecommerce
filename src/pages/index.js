import { useState } from 'react'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import axios from 'axios'

export default function Home({ products }) {
  const [productData, setProductData] = useState({
    image: '',
    description: '',
    price: '',
    active: true,
    whatsappLink: '',
    createdAt: new Date().toISOString(),
  })
  const [productList, setProductList] = useState(products)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setProductData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
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
    <main>
      <Header />
      <div className="mx-auto mt-32 mb-5 grid w-fit grid-cols-1 justify-center justify-items-center gap-y-20 gap-x-14 md:grid-cols-2 lg:grid-cols-4">
        {productList.map((product, index) => (
          <ProductCard
            key={index}
            img={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            active={product.active ? 'Ativo' : 'Inativo'}
            whatsapp={product.whatsappLink}
          />
        ))}
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const response = await axios.get('http://localhost:3000/api/products')
  return {
    props: {
      products: response.data.products,
    },
  }
}
