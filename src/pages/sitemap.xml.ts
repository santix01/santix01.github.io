import { projects } from '../data/projects';

export function GET() {
  const base = 'https://santix01.github.io';
  const paths = ['/', '/en/', ...projects.flatMap((p) => [`/proyectos/${p.slug}/`, `/en/projects/${p.slug}/`])];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
