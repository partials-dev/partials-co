import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router/match'

export default props => {
  let Tag = Link
  let target = ''
  if (props.isExternal) {
    Tag = 'a'
    target = '_blank' // open external pages in a new tab
  }
  return (<Tag activeClassName='active' class='center-contents' href={props.href} target={target}>
    <span class='link-text'>{props.text}</span>
  </Tag>)
}
