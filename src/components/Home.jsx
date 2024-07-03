import React, { useState, useEffect } from 'react'
import Product from './Product'
import { helpHttp } from '../helpers/helpHttp'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // Get products
  useEffect(() => {
    const api = helpHttp()
    setLoading(true)
    api.get('https://fakestoreapi.com/products').then(res => {
      setProducts(res)
      setLoading(false)
    }).catch(err => {
      const statusText = err.statusText || 'No es posible cargar los productos'
      setError(statusText)
      setLoading(false)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <>
      {loading && <p className='bg-gray-900 text-white text-center'>Cargando</p>}
      {error && <p className='bg-gray-900 text-red-500'>{error}</p>}
      <section className='bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12'>
        <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
          <div className='mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4'>
            {products.map(product => <Product product={product} key={product.id} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
