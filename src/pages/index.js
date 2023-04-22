import { ProductContext } from '@/contexts/ProductContext'
import { useContext } from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'

export default function HomeContext() {
  const { products } = useContext(ProductContext)
  return (
    <main>
      <Header />
      {!products ? (
        <p>Carregando produtos...</p>
      ) : (
        <div className="mx-auto mt-32 mb-5 grid w-fit grid-cols-1 justify-center justify-items-center gap-y-20 gap-x-14 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
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
      )}
    </main>
  )
}
