import { createRouter, createWebHistory, type RouteMeta, type RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    canonical?: string
    ogTitle?: string
    ogDescription?: string
    ogUrl?: string
    ogImage?: string
  }
}

const SITE = 'https://luisapitabejarano.com'
const OG_IMAGE =
  'https://res.cloudinary.com/dkosgkjpq/image/upload/w_1200,h_630,c_fill,g_face,q_auto,f_auto/luisa-pita/luisa-11.jpg'

const BRAND_TITLE =
  'Luisa Pita Bejarano | Comunidad anual de transformación corporal para mujeres'
const BRAND_DESC =
  'Coach de mujeres ocupadas y dueñas de negocio. Un año entero junto a Luisa para transformar tu cuerpo y tu vida. Comunidad anual cerrada — preventa VIP por invitación.'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: BRAND_TITLE,
      description: BRAND_DESC,
      canonical: `${SITE}/`,
      ogTitle: BRAND_TITLE,
      ogDescription: BRAND_DESC,
      ogUrl: `${SITE}/`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/politicas-privacidad',
    name: 'privacy-policy',
    component: () => import('@/views/PrivacyPolicyView.vue'),
    meta: {
      title: 'Políticas de Privacidad | Luisa Pita Bejarano',
      description:
        'Cómo Luisa Pita Bejarano trata los datos personales recogidos en luisapitabejarano.com.',
      canonical: `${SITE}/politicas-privacidad`,
      ogTitle: 'Políticas de Privacidad | Luisa Pita Bejarano',
      ogDescription: 'Tratamiento y protección de datos personales en luisapitabejarano.com.',
      ogUrl: `${SITE}/politicas-privacidad`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  {
    path: '/aviso-legal',
    name: 'legal-notice',
    component: () => import('@/views/LegalNoticeView.vue'),
    meta: {
      title: 'Aviso Legal | Luisa Pita Bejarano',
      description: 'Términos de uso del sitio luisapitabejarano.com.',
      canonical: `${SITE}/aviso-legal`,
      ogTitle: 'Aviso Legal | Luisa Pita Bejarano',
      ogDescription: 'Términos de uso del sitio luisapitabejarano.com.',
      ogUrl: `${SITE}/aviso-legal`,
      ogImage: OG_IMAGE,
    } satisfies RouteMeta,
  },
  // 404 → home
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'instant' }),
})

// ── SEO dinámico por ruta ──────────────────────────────────────────────────────
const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.name = name
    document.head.appendChild(el)
  }
  el.content = content
}

const setOgMeta = (property: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.content = content
}

const setCanonical = (href: string) => {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

router.afterEach((to) => {
  const meta = to.meta
  document.title = meta.title ?? BRAND_TITLE
  setMeta('description', meta.description ?? BRAND_DESC)
  setOgMeta('og:title', meta.ogTitle ?? meta.title ?? BRAND_TITLE)
  setOgMeta('og:description', meta.ogDescription ?? meta.description ?? BRAND_DESC)
  setOgMeta('og:url', meta.ogUrl ?? SITE)
  setOgMeta('og:image', meta.ogImage ?? OG_IMAGE)
  setOgMeta('twitter:title', meta.ogTitle ?? meta.title ?? BRAND_TITLE)
  setOgMeta('twitter:description', meta.ogDescription ?? meta.description ?? BRAND_DESC)
  setOgMeta('twitter:image', meta.ogImage ?? OG_IMAGE)
  setCanonical(meta.canonical ?? SITE)
})

export default router
