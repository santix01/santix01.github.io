# santix01.github.io

Portafolio personal de Santiago Avendaño López. Astro + GSAP + Lenis, bilingüe (ES/EN), publicado en GitHub Pages.

## Publicarlo (una sola vez)

1. En GitHub crea un repositorio público llamado exactamente **`santix01.github.io`**.
2. Sube esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "Portafolio inicial"
   git branch -M main
   git remote add origin https://github.com/santix01/santix01.github.io.git
   git push -u origin main
   ```
3. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Espera 1–2 minutos (pestaña **Actions**) y abre https://santix01.github.io

Pulso y Soroban siguen funcionando en `/pulso` y `/soroban` porque viven en sus propios repos.

## Editar contenido (sin tocar diseño)

| Qué | Archivo |
|---|---|
| Perfil, experiencia, educación, certificaciones, writeups, links | `src/data/site.ts` |
| Proyectos (tarjetas + página de cada caso) | `src/data/projects.ts` |
| Textos de la interfaz en ES/EN | `src/i18n/ui.ts` |

Cada texto tiene versión `{ es: '...', en: '...' }`. Haz commit y el sitio se actualiza solo.

### Agregar capturas a un proyecto
1. Guarda las imágenes en `public/projects/<slug>/` (ej. `public/projects/samurai-shield/alerta.png`).
2. En `src/data/projects.ts`, dentro de `images`, agrega:
   ```ts
   { src: '/projects/samurai-shield/alerta.png', alt: { es: 'Alerta de creación', en: 'Create alert' } },
   ```
   Revisa antes que no se vean IPs reales, dominios de clientes, tokens ni webhooks.

### Agregar un proyecto nuevo
Copia un objeto completo en `projects.ts`, cambia `slug`, textos y `repo`. La página `/proyectos/<slug>/` y `/en/projects/<slug>/` se crean solas, y también aparece en la terminal (`ls`, `cat`, `open`).

### Agregar el CV
Pon los PDF en `public/cv/` y en `site.ts`:
```ts
cv: { es: '/cv/santiago-avendano-cv-es.pdf', en: '/cv/santiago-avendano-cv-en.pdf' },
```

### Pendientes para completar
- `site.ts → education`: institución de la especialización y nombre/institución del título técnico.
- `site.ts → experience`: fechas reales en `period`.
- `site.ts → links.htb` y `links.credly` si quieres mostrarlos (vacío = oculto).

## Probar en tu computador
```bash
npm install
npm run dev      # http://localhost:4321
```

## Seguridad incluida
- `/.well-known/security.txt` (RFC 9116) — renueva `Expires` antes de octubre de 2027.
- Content-Security-Policy por meta (GitHub Pages no permite cabeceras propias): solo scripts propios, sin terceros.
- Fuentes servidas desde el propio sitio: sin Google Fonts ni rastreadores.
- La terminal arma su salida con nodos DOM, sin `innerHTML`.
