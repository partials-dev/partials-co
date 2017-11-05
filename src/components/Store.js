import Preact, { h } from 'preact' /** @jsx h */
import Client from 'shopify-buy'
import updateTitle from '../updateTitle'
import Product from './Product'

const accessToken = process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN
const appId = process.env.REACT_APP_SHOPIFY_APP_ID
const domain = process.env.REACT_APP_SHOPIFY_DOMAIN

const shopClient = Client.buildClient({
  accessToken,
  appId,
  domain
})

class ProductList extends Preact.Component {
  constructor () {
    super()
    this.state = { products: [] }
  }
  componentDidMount () {
    shopClient.fetchAllProducts().then(products => {
      debugger
      this.setState({ products })
    })
  }
  render () {
    if (this.state.products.length === 0) {
      return 'Loading...'
    }
    const products = this.state.products.map(p => <Product product={p} />)
    return <div>
      {products}
    </div>
  }
}

class Store extends Preact.Component {
  render() {
    updateTitle('Store | Partials')
    return (
      <main class="center-contents">
        <div class="center-text">
          <h2>STORE</h2>
          <ProductList />
        </div>
      </main>
    )
  }
}
export default Store
