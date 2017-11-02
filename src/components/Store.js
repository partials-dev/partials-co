import { h } from 'preact' /** @jsx h */
import BuyShirtButton from './BuyShirtButton'
import updateTitle from '../updateTitle'

const Store = props => {
  updateTitle('Contact | Partials')
  return (
    <main class="center-contents">
      <div class="center-text">
        <h2>STORE</h2>
        <BuyShirtButton />
      </div>
    </main>
  )
}
export default Store
