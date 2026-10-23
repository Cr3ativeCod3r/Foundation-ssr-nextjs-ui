/**
 * SEO helpers — plain text from Strapi blocks, FAQ extraction and schema.org JSON-LD.
 * Structured data helps search engines and AI assistants (ChatGPT, Perplexity, Gemini)
 * understand who publishes the content and which questions an article answers.
 */

import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type { NewsItem } from '@/types/news';

export const SITE_URL = 'https://chorobymozgu.pl';
export const SITE_NAME = 'Choroby Mózgu';
export const ORG_NAME = 'Fundacja Chorób Mózgu';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const ORG_SAME_AS = [
  'https://www.facebook.com/fundacjachorobmozgu',
  'https://www.youtube.com/@fundacjachorobmozgu',
  'https://www.linkedin.com/company/fundacja-chor%C3%B3b-m%C3%B3zgu/',
];

/** Disease categories → Wikipedia entity, so assistants can match the page to the condition */
export const CONDITIONS: Record<string, { name: string; sameAs: string }> = {
  alzheimer: { name: 'Choroba Alzheimera', sameAs: 'https://pl.wikipedia.org/wiki/Choroba_Alzheimera' },
  'drzenie-samoistne': { name: 'Drżenie samoistne', sameAs: 'https://pl.wikipedia.org/wiki/Drżenie_samoistne' },
  migrena: { name: 'Migrena', sameAs: 'https://pl.wikipedia.org/wiki/Migrena' },
  padaczka: { name: 'Padaczka', sameAs: 'https://pl.wikipedia.org/wiki/Padaczka' },
  parkinson: { name: 'Choroba Parkinsona', sameAs: 'https://pl.wikipedia.org/wiki/Choroba_Parkinsona' },
  spastycznosc: { name: 'Spastyczność', sameAs: 'https://pl.wikipedia.org/wiki/Spastyczność' },
  'stwardnienie-rozsiane': { name: 'Stwardnienie rozsiane', sameAs: 'https://pl.wikipedia.org/wiki/Stwardnienie_rozsiane' },
  'udar-mozgu': { name: 'Udar mózgu', sameAs: 'https://pl.wikipedia.org/wiki/Udar_mózgu' },
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  aktualnosci: 'Aktualności Fundacji Chorób Mózgu: wydarzenia, kampanie społeczne i nowości z neurologii w Polsce.',
  projekty: 'Projekty Fundacji Chorób Mózgu: edukacja pacjentów, kampanie i działania na rzecz osób z chorobami mózgu.',
};

export function categoryDescription(slug: string, name: string): string {
  if (CATEGORY_DESCRIPTIONS[slug]) return CATEGORY_DESCRIPTIONS[slug];
  const condition = CONDITIONS[slug]?.name ?? name;
  return `${condition} – objawy, przyczyny, diagnostyka i leczenie. Rzetelne artykuły i materiały wideo z udziałem neurologów, przygotowane przez Fundację Chorób Mózgu.`;
}

export function absoluteUrl(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** Strapi uploads are relative to the API host */
export function mediaAbsoluteUrl(url: string): string {
  if (!url) return '';
  if (/^https?:\/\//.test(url)) return url;
  return `${process.env.NEXT_PUBLIC_DOMAIN_URL ?? 'https://api.chorobymozgu.pl'}${url}`;
}

/* ═══════════════════════════════════════════════════
   Blocks → text
   ═══════════════════════════════════════════════════ */

type Node = { type?: string; text?: string; bold?: boolean; level?: number; children?: Node[] };

function nodeText(node: Node): string {
  if (typeof node.text === 'string') return node.text;
  return (node.children ?? []).map(nodeText).join(node.type === 'list' ? '\n' : '');
}

function normalize(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function blocksToText(content: BlocksContent | null | undefined): string {
  if (!Array.isArray(content)) return '';
  return (content as Node[]).map((b) => normalize(nodeText(b))).filter(Boolean).join('\n');
}

export function truncate(text: string, max: number): string {
  const clean = normalize(text);
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 0 ? cut.lastIndexOf(' ') : cut.length)}…`;
}

/** Meta description: CMS description, otherwise the first real paragraph */
export function postDescription(post: Pick<NewsItem, 'description' | 'content' | 'header'>): string {
  if (post.description?.trim()) return truncate(post.description, 300);
  const first = (Array.isArray(post.content) ? (post.content as Node[]) : [])
    .filter((b) => b.type === 'paragraph')
    .map((b) => normalize(nodeText(b)))
    .find((t) => t.length > 80);
  return truncate(first || post.header, 160);
}

/* ═══════════════════════════════════════════════════
   FAQ extraction
   ═══════════════════════════════════════════════════ */

export interface FaqItem {
  question: string;
  answer: string;
}

/** A section title phrased as a question: a heading, or a short standalone paragraph ending with "?" */
function isQuestion(block: Node, text: string): boolean {
  if (!text.endsWith('?') || text.length < 12 || text.length > 200) return false;
  if (block.type === 'heading') return true;
  return block.type === 'paragraph' && !/^[-•–]/.test(text);
}

/**
 * Builds Q&A pairs from the article itself: every question-shaped section title becomes a
 * question and the text below it (until the next section) its answer. The FAQ data therefore
 * always matches content visible on the page, as required by Google and Bing.
 */
export function extractFaq(content: BlocksContent | null | undefined, title?: string): FaqItem[] {
  if (!Array.isArray(content)) return [];
  const items: FaqItem[] = [];
  let current: { question: string; parts: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    const answer = truncate(current.parts.join(' '), 1200);
    if (answer.length >= 40) items.push({ question: current.question, answer });
    current = null;
  };

  for (const block of content as Node[]) {
    const text = normalize(nodeText(block));
    if (!text) continue;

    if (isQuestion(block, text)) {
      flush();
      if (title && normalize(title) === text) continue;
      current = { question: text, parts: [] };
    } else if (block.type === 'heading') {
      flush();
    } else if (current) {
      current.parts.push(text.replace(/^[-•–]\s*/, ''));
    }
  }
  flush();

  return items.slice(0, 10);
}

/* ═══════════════════════════════════════════════════
   JSON-LD builders
   ═══════════════════════════════════════════════════ */

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NGO',
        '@id': ORG_ID,
        name: ORG_NAME,
        alternateName: ['ChorobyMózgu.pl', 'Choroby Mózgu'],
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/img/logo.png` },
        email: 'fundacjachorobmozgu@gmail.com',
        description:
          'Fundacja Chorób Mózgu prowadzi portal chorobymozgu.pl z rzetelną, konsultowaną z neurologami wiedzą o chorobach mózgu: chorobie Alzheimera, Parkinsona, migrenie, padaczce, stwardnieniu rozsianym, udarze mózgu, spastyczności i drżeniu samoistnym.',
        areaServed: { '@type': 'Country', name: 'Polska' },
        knowsAbout: Object.values(CONDITIONS).map((c) => ({ '@type': 'MedicalCondition', name: c.name, sameAs: c.sameAs })),
        sameAs: ORG_SAME_AS,
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        alternateName: 'ChorobyMózgu.pl',
        url: SITE_URL,
        inLanguage: 'pl-PL',
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

function youtubeId(link: string | null | undefined): string | null {
  if (!link) return null;
  const match = link.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return match ? match[1] : null;
}

export function postJsonLd(post: NewsItem, url: string) {
  const description = postDescription(post);
  const image = post.imageUrl ? mediaAbsoluteUrl(post.imageUrl) : `${SITE_URL}/img/og-default.jpg`;
  const condition = CONDITIONS[post.category.slug];
  const categoryUrl = `${SITE_URL}/${post.category.slug}`;
  const faq = extractFaq(post.content, post.header);
  const videoId = youtubeId(post.yt_link);
  const isOrgAuthor = !post.author?.name || /fundacj/i.test(post.author.name);

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'MedicalWebPage',
      '@id': `${url}#webpage`,
      url,
      name: post.header,
      description,
      inLanguage: 'pl-PL',
      isPartOf: { '@id': WEBSITE_ID },
      breadcrumb: { '@id': `${url}#breadcrumb` },
      primaryImageOfPage: image,
      audience: { '@type': 'PeopleAudience', audienceType: 'Pacjenci, opiekunowie i rodziny' },
      ...(condition && { about: { '@type': 'MedicalCondition', name: condition.name, sameAs: condition.sameAs } }),
      ...(faq.length > 0 && { hasPart: { '@id': `${url}#faq` } }),
      datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
    },
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: truncate(post.header, 110),
      description,
      image,
      url,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      inLanguage: 'pl-PL',
      articleSection: post.category.name,
      ...(post.tags.length > 0 && { keywords: post.tags.join(', ') }),
      author: isOrgAuthor
        ? { '@id': ORG_ID }
        : { '@type': 'Person', name: post.author.name, worksFor: { '@id': ORG_ID } },
      publisher: { '@id': ORG_ID },
      ...(condition && { about: { '@type': 'MedicalCondition', name: condition.name, sameAs: condition.sameAs } }),
      ...(videoId && {
        video: {
          '@type': 'VideoObject',
          name: post.header,
          description,
          thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          uploadDate: post.createdAt,
          contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
        },
      }),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: post.category.name, item: categoryUrl },
        { '@type': 'ListItem', position: 3, name: post.header, item: url },
      ],
    },
  ];

  if (faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      inLanguage: 'pl-PL',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function categoryJsonLd(
  category: { slug: string; name: string },
  posts: Pick<NewsItem, 'header' | 'slug'>[],
) {
  const url = `${SITE_URL}/${category.slug}`;
  const condition = CONDITIONS[category.slug];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: category.name,
        description: categoryDescription(category.slug, category.name),
        inLanguage: 'pl-PL',
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORG_ID },
        ...(condition && { about: { '@type': 'MedicalCondition', name: condition.name, sameAs: condition.sameAs } }),
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: posts.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.header,
            url: `${url}/${p.slug}`,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: category.name, item: url },
        ],
      },
    ],
  };
}

/** Serialized JSON-LD for a <script type="application/ld+json"> tag; content comes from our own CMS */
export function jsonLdHtml(data: object): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}
