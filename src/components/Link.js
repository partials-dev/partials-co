import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router/match'

export default props => {
  const icon = props.showIcon
    ? <i class='material-icons'>{props.icon}</i>
    : null
  let Tag = Link
  let target = ''
  if (props.isExternal) {
    Tag = 'a'
    target = '_blank' // open external pages in a new tab
  }
  return (<Tag activeClassName='active' href={props.href} target={target}>
    {icon}
    <span class='link-text'>{props.text}</span>
  </Tag>)
}
