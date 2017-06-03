import { h } from 'preact' /** @jsx h */
import updateTitle from '../updateTitle'

const Glossolalia = props => {
  updateTitle('Glossolalia | Partials')
  return (<main>
    <h2>Glossolalia</h2>
    <p>We made it with our bare hands. :) :) :)</p>
  </main>)
}

export default Glossolalia
