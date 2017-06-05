import { h } from 'preact' /** @jsx h */

const Show = props => {
  return <ol class='show-details normal-spacing'>
    <li class='date'>
      {props.date}
    </li>
    <li class='location'>
      {props.location}
    </li>
    <li class='venue'>
      {props.venue}
    </li>
    <li class='link'>
      <a href={props.link} class='button'>Details</a>
    </li>
  </ol>
}

export default Show
