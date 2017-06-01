import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router/match'

export default props => {
  const icon = props.showIcon
    ? <i class='material-icons'>{props.icon}</i>
    : null
  let Tag = Link
  if (props.isExternal) {
    Tag = 'a'
  }
  return (<Tag activeClassName='active' href={props.href}>
    {icon}
    <span class='link-text'>{props.text}</span>
  </Tag>)
}
