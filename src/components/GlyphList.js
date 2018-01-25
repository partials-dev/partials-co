import { h } from 'preact' /** @jsx h */

const glyphs = ['७', '៧', 'ⅶ', '၇', '七', '௭']

export const GlyphListItem = ({ href, text, suffix, index }) => {
  suffix = suffix ? `  (${suffix})` : ''
  const glyph = glyphs[index]
  return (
    <li data-glyph={glyph}>
      <span className="contents">
        <a href={href}>{text}</a>
        {suffix}
      </span>
    </li>
  )
}

const GlyphList = ({ items }) => {
  items = items.map((item, index) => <GlyphListItem {...item} index={index} />)
  return <ol class="glyph-list">{items}</ol>
}

export default GlyphList
