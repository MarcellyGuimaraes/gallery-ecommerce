const fs = require('fs')

const products = [
  {
    image: '/images/cadarco-led.jpeg',
    title: 'Cadarço LED Luminoso ABS',
    description: 'Description test 1',
    price: 'R$ 100,00',
    active: true,
    whatsappLink: 'https://wa.me/123456789',
  },
  {
    image: '/images/f88-tws-bluetooth-esportivo.jpeg',
    title: 'Produto 2',
    description: 'Description test 2',
    price: 'R$ 200,00',
    active: false,
    whatsappLink: 'https://wa.me/123456789',
  },
  {
    image: '/images/fone-estereo-ossea-sem-fio.jpeg',
    title: 'Produto 3',
    description: 'Description test 3',
    price: 'R$ 300,00',
    active: true,
    whatsappLink: 'https://wa.me/123456789',
  },
  {
    image: '/images/k20-fone-bluetooth.jpeg',
    title: 'Produto 4',
    description: 'Description test 4',
    price: 'R$ 400,00',
    active: false,
    whatsappLink: 'https://wa.me/123456789',
  },
  {
    image: '/images/mini-auto-falante-led.jpeg',
    title: 'Produto 5',
    description: 'Description test 5',
    price: 'R$ 500,00',
    active: true,
    whatsappLink: 'https://wa.me/123456789',
  },
]

function addTestProducts() {
  fs.writeFileSync('data.json', JSON.stringify({ products }))
}

module.exports = {
  addTestProducts,
}
