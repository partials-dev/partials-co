import { h } from 'preact' /** @jsx h */
import updateTitle from '../updateTitle'
import GlyphList from './GlyphList'

const Biography = () => (
  <section class="biography">
    <div class="heading-container">B I O G R A P H Y</div>
    <header>
      <p>
        Partials, an underground psychedelic-dance act from Athens, Georgia,
        will release their debut EP, Glossolalia, on April 6, 2018. The album
        will be distributed by True Blue Records, a new label helmed by producer
        / engineer Drew Vandenberg (Kishi Bashi, Of Montreal, Toro Y Moi).
        Continuing the tradition of Talking Heads and LCD Soundsystem, Partials
        combines electric and electronic instruments with dance beats and
        catchy, paradoxical vocals.
      </p>
      <p>
        <em>
          Blurs the lines between humanity and technology [...] A fusion of
          vastly different elements, Partials thrive on this dichotomy, an
          artistic liaison that perpetually surprises.
        </em>{' '}
        —{' '}
        <a href="http://clashmusic.com/news/premiere-partials-man-made-machine">
          Clash Magazine
        </a>
      </p>
    </header>
    <hr class="glyph" />
    <div class="left column">
      <p>
        Glossolalia (meaning “speaking in tongues”) is a fitting title for
        Partials’ debut recording. The word has a strong association with the
        otherworldly, conveying the notion of fluid sounds, rhythms and ideas.
        The music on the EP is full of interlocking vocal and instrumental
        harmonies, shifting tempos and an inventive use of language that gives
        the lyrics a flowing, untethered cadence. “People who speak in tongues
        believe it indicates the touch of the creator,” says Partials bass
        player, Thomas Bailey. “Today, all around us, machines are constantly
        speaking in tongues. We wanted to explore how that relates to humanity,
        automation and the space between the two. This is especially interesting
        in the context of machines that have no voices, but the voices we give
        them.”
      </p>
      <p>
        The six musicians in the band - Dane Walsh, keys; guitarist Jeff Porter;
        singer, percussionist Adriana Thomas; sax player and guitarist Ian
        Edwards; drummer Alex Eversbusch and Bailey - have wide ranging tastes.
        They’ve played funk, soul and Afrobeat, before landing on a flavor of
        psychedelic dance music that aims to continue the tradition of Talking
        Heads and LCD Soundsystem, without sounding derivative. “We reference
        the music that influenced the artists we love. We seek what they sought,
        then take it in our own direction,” Bailey says.
      </p>
      <p>
        The sounds on the album were assembled with the help of producer and
        audio engineer Drew Vandenberg. “We recorded demo tracks at our home
        studio, thinking we’d layer up the tracks one at a time, using them as a
        reference,” Bailey explains. “It was an eye-opening experience to try
        and recapture the feeling present on some of those tracks. We’d often
        find something special in a random demo done in our basement, so they
        found their way into the final recording. Drew is an expert at getting
        the most powerful, emotional take you have in you. The six of us are
        very opinionated people, so we had our fair share of debates, but Drew
        would always advocate for what he saw was the best way forward for the
        music.”
      </p>
      <p>
        “Anemoia” refers to the memory of an experience you’ve never had. The
        feeling is mirrored by the ambient, wordless vocals, glistening guitar
        tones and atmospheric synthesizer tones that introduce the song. The
        simple instrumental parts build and intertwine, passing the melody back
        and forth, slowly melding into a single voice. Thomas and Edwards echo
        the articulation of the bubbling guitar and the thump of Eversbusch’s
        bass drum.
      </p>
    </div>
    <div class="right column">
      <p>
        The playful funk of “Man Made Machine” builds slowly, each instrument
        coming in separately to build up a frisky, inescapable groove. Warm bass
        tones and minimal chattering guitar dance around Thomas’s simple
        six-word refrain and, as her soft, sighing vocal unwinds, the lyrics
        morph into phrases that lose meaning, while taking on a greater
        significance. It’s hypnotic glossolalia at its best, goosed along by
        Walsh’s synthesizer alternating between melody, noise and sound
        manipulation.
      </p>
      <p>
        “Polyglot” opens with a muted polyrhythmic groove played on the drums,
        augmented by Thomas’s quiet vocals. On the chorus, she’s joined by a
        simple African rhythm line, played on Porter’s guitar and a dark,
        intense synthesizer pulse that blends the sounds of human and artificial
        glossolalia into a cacophonous crescendo. Another quiet chorus builds
        into a call-and-response between bass synth and looping glossolalia
        melodies. The lyrics describe a narrator fixated on an inability to
        express themselves, making an ironic contrast with the linguistic skill
        suggested by the title. Despite the struggle, the song offers a morsel
        of hope through glossolalia, a tool for connecting with the divine and
        expressing the inexpressible.
      </p>
      <p>
        Glossolalia’s six tunes are catchy and crammed with grace notes and
        lyrical touches that unfold slowly after repeated listening. “For this
        EP, we wrote 22 songs in one month, narrowing it down to the six you
        hear on the album,” Bailey says. “It was exhausting but empowering.
        Every day you wake up and think of nothing but how to make it through
        the current song. But it’s an incredible experience - you learn so
        quickly from your mistakes. We make music that works both for the head
        and the body, songs that are interesting to listen to on headphones in
        your bedroom, or to dance your ass off to at a party. Our live show
        reflects that. We let the songs breathe and work at developing an
        improvisational language that helps us make sure everyone has the same
        expectations going into a song. We embrace weirdness and catchiness with
        equal enthusiasm. Walking that line is what we’re all about.”
      </p>
    </div>
  </section>
)

const newsItems = [
  {
    text: 'Clash Magazine premieres "Man Made Machine"',
    href: 'http://clashmusic.com/news/premiere-partials-man-made-machine',
    suffix: "Jan '18"
  }
]

const News = () => (
  <section class="news">
    <GlyphList items={newsItems} />
  </section>
)

const Images = () => {
  return (
    <section class="images">
      <a href="images/partials-glossolalia-ep-high-res.jpg">
        <img
          alt="Partials - Glossolalia Album Cover, Low Resolution"
          src="images/partials-glossolalia-ep-low-res.jpg"
        />
      </a>
      <a href="images/partials-press-photo-high-res.jpg">
        <img
          alt="The members of Partials dressed preposterously"
          src="images/partials-press-photo-low-res.jpg"
        />
      </a>
    </section>
  )
}

const memberItems = [
  {
    text: 'Alex Eversbusch ⇒ drums',
    href: 'images/busch.jpg'
  },
  {
    text: 'Dane Walsh ⇒ keys',
    href: 'images/dane.jpg'
  },
  {
    text: 'Thomas Bailey ⇒ bass',
    href: 'images/thomas.jpg'
  },
  {
    text: 'Adriana Thomas ⇒ vocals',
    href: 'images/adriana.jpg'
  },
  {
    text: 'Ian Edwards ⇒ guitar',
    href: 'images/ian.jpg'
  },
  {
    text: 'Jeff Porter ⇒ guitar',
    href: 'images/jeff.jpg'
  }
]

const Members = () => (
  <section class="members">
    <GlyphList items={memberItems} />
  </section>
)

const Press = props => {
  updateTitle('Press | Partials')
  return (
    <main class="container press">
      <Biography />
      <hr />
      <News />
      <hr />
      <Images />
      <hr />
      <Members />
    </main>
  )
}

export default Press
