import { h } from 'preact' /** @jsx h */
import updateTitle from '../updateTitle'

const Contact = props => {
  updateTitle('Contact | Partials')
  return (<main>
    <h2></h2>
    <p></p>
  </main>)
}

export default Contact
