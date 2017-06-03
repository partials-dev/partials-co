import { h } from 'preact' /** @jsx h */
import updateTitle from '../updateTitle'

const Contact = props => {
  updateTitle('Contact | Partials')
  return (<main>
    <p>mail@partialsband.com</p>
  </main>)
}

export default Contact
