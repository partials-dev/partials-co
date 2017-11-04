import nbsp from '../nbsp'

// const Links = [
//   { href: '/shows', icon: 'event', text: nbsp('s h o w s') },
//   { href: 'https://partialsmusic.bandcamp.com/', icon: 'shopping_cart', text: nbsp('s t o r e'), isExternal: true },
//   { href: 'https://www.sonicbids.com/band/partials/', icon: 'email', text: nbsp('p r e s s'), isExternal: true },
//   { href: '/contact', icon: 'music_note', text: nbsp('c o n t a c t') }
// ]

const Links = [
  { href: '/shows', icon: 'event', text: nbsp('shows') },
  {
    href: '/store',
    text: nbsp('store'),
    isExternal: false
  },
  {
    href: 'https://www.sonicbids.com/band/partials/',
    text: nbsp('press'),
    isExternal: true
  },
  {
    href: '/contact',
    text: nbsp('contact')
  }
]

export default Links
