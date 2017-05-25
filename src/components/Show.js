import { h } from 'preact' /** @jsx h */

const Show = props =>
  <ol class='show-details'>
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
      <a href={props.link}>Details</a>
    </li>
  </ol>

export default Show
