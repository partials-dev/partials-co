import { h } from 'preact' /** @jsx h */

export const GlyphListItem = ({ href, text, suffix }) => {
  suffix = suffix ? `  (${suffix})` : ''
  return (
    <li>
      <span className="contents">
        <a href={href}>{text}</a>
        {suffix}
      </span>
    </li>
  )
}

const GlyphList = ({ items }) => {
  items = items.map(item => <GlyphListItem {...item} />)
  return <ol class="glyph-list">{items}</ol>
}

export default GlyphList
