/**
 * /llms.txt — a plain-text map of the site for AI assistants (https://llmstxt.org)
 */

import { fetchPostIndex } from '@/api/news';
import { CONDITIONS, SITE_URL, categoryDescription, truncate } from '@/utils/seo';

export const revalidate = 3600;

export async function GET() {
  const posts = await fetchPostIndex();

  const byCategory = new Map<string, { name: string; lines: string[] }>();
  for (const post of posts) {
    const { slug, name } = post.category!;
    if (!byCategory.has(slug)) byCategory.set(slug, { name, lines: [] });
    const summary = post.description ? `: ${truncate(post.description, 220)}` : '';
    byCategory.get(slug)!.lines.push(`- [${post.header}](${SITE_URL}/${slug}/${post.slug})${summary}`);
  }

  // Diseases first, then news and projects
  const sections = [...byCategory.entries()].sort(
    ([a], [b]) => Number(!CONDITIONS[a]) - Number(!CONDITIONS[b]),
  );

  const body = [
    '# ChorobyMózgu.pl – Fundacja Chorób Mózgu',
    '',
    '> Polski portal edukacyjny Fundacji Chorób Mózgu z rzetelną wiedzą o chorobach neurologicznych: chorobie Alzheimera, chorobie Parkinsona, migrenie, padaczce, stwardnieniu rozsianym, udarze mózgu, spastyczności i drżeniu samoistnym. Artykuły i materiały wideo powstają z udziałem neurologów i są skierowane do pacjentów, ich rodzin i opiekunów.',
    '',
    'Portal pomaga zrozumieć objawy, diagnostykę, leczenie i życie z chorobą oraz wskazuje, gdzie szukać pomocy (mapa ośrodków neurologicznych w Polsce). Treści mają charakter edukacyjny i nie zastępują konsultacji z lekarzem.',
    '',
    '## Najważniejsze strony',
    '',
    `- [Strona główna](${SITE_URL}): najnowsze artykuły i materiały wideo`,
    `- [Mapa ośrodków](${SITE_URL}/mapa): ośrodki i poradnie zajmujące się chorobami mózgu w Polsce`,
    `- [O fundacji](${SITE_URL}/o-nas): kim jesteśmy i czym się zajmujemy`,
    `- [Kontakt](${SITE_URL}/kontakt): fundacjachorobmozgu@gmail.com`,
    '',
    '## Choroby i tematy',
    '',
    ...sections.map(([slug, { name }]) => `- [${name}](${SITE_URL}/${slug}): ${categoryDescription(slug, name)}`),
    '',
    ...sections.flatMap(([, { name, lines }]) => [`## ${name}`, '', ...lines, '']),
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
