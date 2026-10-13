// ─────────────────────────────────────────────────────────────
// Proyectos. Cada objeto genera una tarjeta y una página de caso.
// Capturas: guárdalas en public/projects/<slug>/ y agrégalas a `images`.
// ─────────────────────────────────────────────────────────────
import type { L } from './site';

export type Category = 'defense' | 'offense' | 'crypto';

export interface Project {
  slug: string;
  title: string;
  category: Category;
  status: L;
  repo: string;
  demo?: string;
  summary: L;
  problem: L;
  solution: L;
  highlights: { es: string[]; en: string[] };
  stack: string[];
  flow?: string[]; // pasos de la arquitectura, en orden
  terminal?: string[]; // demo de uso (líneas de consola)
  limits: { es: string[]; en: string[] };
  images: { src: string; alt: L }[];
}

export const categories: Record<Category, L> = {
  defense: { es: 'Defensa', en: 'Defense' },
  offense: { es: 'Ofensiva', en: 'Offense' },
  crypto: { es: 'Criptografía', en: 'Cryptography' },
};

export const projects: Project[] = [
  {
    slug: 'samurai-shield',
    title: 'Samurai Shield Sentinel',
    category: 'defense',
    status: { es: 'Estable', en: 'Stable' },
    repo: 'https://github.com/santix01/Samurai_Shield_Sentinel',
    summary: {
      es: 'Sensor de integridad de archivos para Linux que lee eventos del kernel y avisa al SOC en tiempo real.',
      en: 'File integrity sensor for Linux that reads kernel events and alerts the SOC in real time.',
    },
    problem: {
      es: 'Los monitores de integridad basados en sondeo detectan cambios tarde, y los logs del sistema suelen perder al usuario real cuando alguien escala privilegios con sudo. En un incidente eso significa saber qué cambió, pero no quién lo hizo.',
      en: 'Polling-based integrity monitors detect changes late, and system logs usually lose the real user once someone escalates with sudo. During an incident you know what changed, but not who changed it.',
    },
    solution: {
      es: 'Un agente en Python que se apoya en auditd para registrar las llamadas al sistema sobre rutas protegidas, resuelve el AUID para identificar al usuario original de la sesión y envía cada evento clasificado por gravedad a un canal de Discord que funciona como consola del SOC.',
      en: 'A Python agent built on auditd that records syscalls on protected paths, resolves the AUID to identify the original session user, and sends every event, ranked by severity, to a Discord channel that acts as the SOC console.',
    },
    highlights: {
      es: [
        'Eventos capturados desde el kernel, no por sondeo periódico.',
        'Trazabilidad AUID: identifica al actor real aunque haya usado sudo.',
        'Clasificación por gravedad: creación, modificación y eliminación.',
        'Instalador que sigue la jerarquía FHS y corre como servicio systemd.',
        'Logs locales en JSONL para análisis forense posterior.',
      ],
      en: [
        'Events captured at kernel level, not by periodic polling.',
        'AUID tracing: identifies the real actor even after sudo.',
        'Severity ranking for create, modify and delete events.',
        'FHS-compliant installer that runs as a systemd service.',
        'Local JSONL logs for later forensic analysis.',
      ],
    },
    stack: ['Python', 'auditd', 'systemd', 'Bash', 'Discord Webhooks'],
    flow: ['syscall', 'auditd', 'samurai_agent.py', 'AUID', 'webhook → SOC'],
    limits: {
      es: [
        'Las alertas dependen de la disponibilidad del webhook de Discord.',
        'Pensado para un host; no centraliza múltiples agentes.',
      ],
      en: [
        'Alerts depend on the Discord webhook being reachable.',
        'Built for a single host; it does not aggregate multiple agents.',
      ],
    },
    images: [
      // { src: '/projects/samurai-shield/alerta-creacion.png', alt: { es: 'Alerta de creación con AUID', en: 'Create alert with AUID' } },
      // { src: '/projects/samurai-shield/alerta-eliminacion.png', alt: { es: 'Alerta crítica de eliminación', en: 'Critical delete alert' } },
    ],
  },
  {
    slug: 'cryptostego',
    title: 'Cryptostego',
    category: 'crypto',
    status: { es: 'Estable · con tests', en: 'Stable · tested' },
    repo: 'https://github.com/santix01/cryptostego',
    summary: {
      es: 'CLI que cifra un archivo, lo oculta dentro de una imagen PNG y además detecta imágenes con datos ocultos.',
      en: 'CLI that encrypts a file, hides it inside a PNG image, and also detects images carrying hidden data.',
    },
    problem: {
      es: 'Muchas herramientas de esteganografía esconden texto plano con LSB replacement: cualquiera que extraiga los bits lo lee, y el ataque chi-cuadrado las delata. Quería una herramienta que hiciera ambas cosas bien y que además sirviera para el lado defensivo.',
      en: 'Many steganography tools hide plaintext with LSB replacement: anyone who extracts the bits can read it, and the chi-square attack exposes them. I wanted a tool that gets both parts right and also serves the defensive side.',
    },
    solution: {
      es: 'Primero cifra con ChaCha20-Poly1305 usando una clave derivada con Argon2id, y después oculta el resultado con LSB matching en posiciones elegidas por un PRNG sembrado con la contraseña. El modo detect combina tres técnicas de esteganálisis y entrega un puntaje con explicación.',
      en: 'It first encrypts with ChaCha20-Poly1305 using an Argon2id-derived key, then hides the result with LSB matching at positions chosen by a password-seeded PRNG. The detect mode combines three steganalysis techniques and returns a score with an explanation.',
    },
    highlights: {
      es: [
        'Cifrado autenticado: el header completo viaja como AAD.',
        'Salt y nonce únicos por operación; ninguna primitiva propia.',
        'LSB matching (±1) para evitar la firma del ataque chi-cuadrado.',
        'Esteganálisis: proporción de LSB, chi-cuadrado y entropía por bloques.',
        'Suite de pytest con pruebas de ida y vuelta, contraseña incorrecta y capacidad.',
      ],
      en: [
        'Authenticated encryption: the full header is bound as AAD.',
        'Unique salt and nonce per operation; no home-made primitives.',
        'LSB matching (±1) to avoid the chi-square attack signature.',
        'Steganalysis: LSB ratio, chi-square and block entropy.',
        'pytest suite covering round-trip, wrong password and capacity.',
      ],
    },
    stack: ['Python', 'cryptography (pyca)', 'argon2-cffi', 'Pillow', 'pytest'],
    terminal: [
      '$ cryptostego capacity -i portada.png',
      '$ cryptostego embed -i portada.png -o salida.png -f secreto.txt',
      '$ cryptostego extract -i salida.png -o recuperado.txt',
      '$ cryptostego detect -i salida.png',
    ],
    limits: {
      es: [
        'Convertir la imagen a JPEG destruye el contenido oculto.',
        'Con la imagen original a mano, la diferencia es trivial de ver.',
        'El modo detect es heurístico y educativo, no prueba forense.',
      ],
      en: [
        'Converting the image to JPEG destroys the hidden payload.',
        'With the original image at hand, the difference is trivial to spot.',
        'Detect mode is heuristic and educational, not forensic proof.',
      ],
    },
    images: [],
  },
  {
    slug: 'portswigger-writeups',
    title: 'Web Security Writeups',
    category: 'offense',
    status: { es: 'En progreso', en: 'In progress' },
    repo: 'https://github.com/santix01/PortSwigger-Caido-Writeups',
    summary: {
      es: 'Resoluciones paso a paso de laboratorios de PortSwigger usando Caido como proxy, con explotación y mitigación.',
      en: 'Step-by-step solutions to PortSwigger labs using Caido as the proxy, covering exploitation and mitigation.',
    },
    problem: {
      es: 'Resolver un laboratorio no demuestra que entiendas la vulnerabilidad. Documentarlo obliga a explicar por qué falla la aplicación y cómo se corrige, que es lo que necesita un equipo de desarrollo.',
      en: 'Solving a lab does not prove you understand the vulnerability. Writing it up forces you to explain why the app fails and how to fix it, which is what a development team needs.',
    },
    solution: {
      es: 'Cada writeup sigue la misma estructura: reconocimiento, tráfico interceptado en Caido, explotación y medidas de mitigación, con capturas de cada paso.',
      en: 'Each writeup follows the same structure: recon, traffic intercepted in Caido, exploitation and mitigation, with screenshots of every step.',
    },
    highlights: {
      es: [
        'Lógica de negocio: confianza excesiva en controles del cliente.',
        'Control de acceso e IDOR.',
        'Exposición de información.',
        'Cada caso cierra con recomendaciones de mitigación.',
      ],
      en: [
        'Business logic: excessive trust in client-side controls.',
        'Access control and IDOR.',
        'Information disclosure.',
        'Every case ends with mitigation guidance.',
      ],
    },
    stack: ['Caido', 'Kali Linux', 'HTTP', 'OWASP'],
    limits: { es: [], en: [] },
    images: [],
  },
];
