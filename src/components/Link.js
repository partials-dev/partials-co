import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router/match'

export default props => {
  let Tag = Link
  let target = ''
  let rel = ''
  if (props.isExternal) {
    Tag = 'a'
    target = '_blank' // open external pages in a new tab
    // Using target="_blank" without rel="noopener noreferrer" is a security
    // risk: see https://mathiasbynens.github.io/rel-noopener
    rel = 'noopener noreferrer'
  }
  return (<Tag activeClassName='active' class='center-contents' href={props.href} target={target} rel={rel}>
    <span class='link-text'>{props.text}</span>
  </Tag>)
}
