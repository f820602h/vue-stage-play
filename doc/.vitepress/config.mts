import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vue-stage-play/",

  head: [
    ['link', { rel: 'icon', href: './logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'max.lee' }],
    ['meta', { property: 'og:image', content: "https://f820602h.github.io/vue-stage-play/ogImage.png" }],
    ['meta', { property: 'og:url', content: "https://f820602h.github.io/vue-stage-play/" }],
    ['meta', { property: 'og:title', content: 'Vue Stage Play' }],
    ['meta', { property: 'og:description', content: 'Designing a guided tour for your website with vue components, much like directing a stage play' }],
  ],

  title: "Vue Stage Play",
  description: "Designing a guided tour for your website with vue components, much like directing a stage play",

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  
  themeConfig: {
    logo: './logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'API Reference', link: '/stage-play-spotlight' },
      { text: 'Examples', link: '/basic-example' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Register Components Globally', link: '/register-components-globally' },
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: '&ltStagePlaySpotlight /&gt;', link: '/stage-play-spotlight' },
          { text: '&ltStagePlayScene /&gt;', link: '/stage-play-scene' },
          { text: 'useStagePlay', link: '/use-stage-play' },
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Basic Example', link: '/basic-example' },
          { text: 'Voice Over Placement', link: '/voice-over-placement' },
          { text: 'Voice Over Customizing', link: '/voice-over-customizing' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/f820602h/vue-stage-play' }
    ]
  }
})
