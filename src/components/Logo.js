import { h } from 'preact' /** @jsx h */

const logoStyle = {
  textDecoration: 'none',
  display: 'block',
  minHeight: '45px',
  fontSize: '1.25em',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: '#333333'
}

const regularLettersStyle = {
  fontWeight: '300'
}

const aStyle = {
  fontHeight: '50px',
  transform: 'translate(0, -1px) scale(1,1.1)',
  display: 'inline-block',
  fontWeight: 'lighter'
}

const Logo = () => {
  const parti = <span style={regularLettersStyle}>P a r t i </span>
  const a = <span style={aStyle}>&forall;</span>
  const ls = <span style={regularLettersStyle}> l s</span>

  return <a id='logo' href='/' style={logoStyle}>{parti}{a}{ls}</a>
}
export default Logo
