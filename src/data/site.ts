// ─────────────────────────────────────────────────────────────
// Datos personales. Edita este archivo para actualizar el sitio.
// Todo texto visible tiene versión { es, en }.
// ─────────────────────────────────────────────────────────────

export type L = { es: string; en: string };

export const profile = {
  name: 'Santiago Avendaño López',
  shortName: 'Santiago Avendaño',
  handle: 'santix01',
  role: { es: 'Analista de ciberseguridad', en: 'Cybersecurity analyst' } as L,
  location: { es: 'Boyacá, Colombia · remoto', en: 'Boyacá, Colombia · remote' } as L,
  // Correo público del portafolio. Cámbialo si prefieres uno dedicado.
  email: 'santiagoavendano15@gmail.com',
  // Deja vacío ('') para ocultar el botón. Ej: '/cv/santiago-avendano-cv-es.pdf'
  cv: { es: '', en: '' } as L,
  links: {
    github: 'https://github.com/santix01',
    linkedin: 'https://www.linkedin.com/in/santiago-avenda%C3%B1o-l%C3%B3pez-172253248',
    credly: '', // ej: 'https://www.credly.com/users/tu-usuario'
    htb: '', // ej: 'https://app.hackthebox.com/profile/123456' — vacío = oculto
  },
};

export const about = {
  lead: {
    es: 'Ingeniero electrónico que trabaja en seguridad ofensiva y defensiva: pruebas de penetración, auditoría ISO 27001/27005 e infraestructura.',
    en: 'Electronic engineer working across offensive and defensive security: penetration testing, ISO 27001/27005 auditing and infrastructure.',
  } as L,
  body: {
    es: 'Construyo herramientas para entender cómo fallan los sistemas y documento cada hallazgo para que otros puedan corregirlo. Hoy trabajo como analista en Compu-Plus y me preparo para el OSCP.',
    en: 'I build tools to understand how systems fail and I document every finding so others can fix it. I currently work as an analyst at Compu-Plus and I am preparing for the OSCP.',
  } as L,
  stats: [
    { value: 2, suffix: '+', label: { es: 'años en seguridad', en: 'years in security' } },
    { value: 7, suffix: '', label: { es: 'certificaciones Cisco', en: 'Cisco certifications' } },
    { value: 3, suffix: '', label: { es: 'proyectos publicados', en: 'published projects' } },
  ],
  focus: [
    { es: 'Pentesting web e infraestructura', en: 'Web & infrastructure pentesting' },
    { es: 'Auditoría ISO 27001 / 27005', en: 'ISO 27001 / 27005 auditing' },
    { es: 'Detección y monitoreo en Linux', en: 'Linux detection & monitoring' },
    { es: 'Criptografía aplicada', en: 'Applied cryptography' },
  ] as L[],
};

// Línea de tiempo. Completa `period` con tus fechas reales (ej: '2024 — hoy').
export const experience = [
  {
    period: { es: 'Actual', en: 'Current' },
    title: { es: 'Analista de ciberseguridad', en: 'Cybersecurity analyst' },
    org: 'Compu-Plus',
    text: {
      es: 'Pruebas de penetración, revisión de infraestructura y apoyo en auditorías bajo ISO 27001 y gestión de riesgos ISO 27005.',
      en: 'Penetration testing, infrastructure review and audit support under ISO 27001 and ISO 27005 risk management.',
    },
  },
  {
    period: { es: '— 2026', en: '— 2026' },
    title: { es: 'Apoyo en comunicaciones digitales', en: 'Digital communications support' },
    org: 'Alcaldía de Miraflores',
    text: {
      es: 'Gestión de canales digitales y reportes para la administración municipal.',
      en: 'Managed digital channels and reporting for the municipal administration.',
    },
  },
  {
    period: { es: 'Anterior', en: 'Previous' },
    title: { es: 'Tutor de Python (remoto)', en: 'Python tutor (remote)' },
    org: 'Kodland',
    text: {
      es: 'Enseñanza de programación en Python a estudiantes de forma remota.',
      en: 'Taught Python programming to students remotely.',
    },
  },
];

// Educación. Sin imágenes de diplomas: "soportes disponibles bajo solicitud".
export const education = [
  {
    title: { es: 'Especialización — tesis en ISO 27001 / 27005', en: 'Postgraduate specialization — ISO 27001 / 27005 thesis' },
    org: '', // ← nombre de la institución
    note: { es: 'Calificación de tesis: 4.7 / 5.0', en: 'Thesis grade: 4.7 / 5.0' },
  },
  {
    title: { es: 'Ingeniería Electrónica', en: 'B.Eng. Electronic Engineering' },
    org: 'UPTC — Sogamoso',
    note: { es: '', en: '' },
  },
  {
    title: { es: 'Título técnico', en: 'Technical degree' }, // ← nombre del programa
    org: '', // ← institución
    note: { es: '', en: '' },
  },
];

export const certs = [
  { name: 'Cyber Threat Management', url: 'https://www.credly.com/badges/ef272be6-66fe-4183-a29a-a55381f1ba12/public_url', area: 'defense' },
  { name: 'Network Defense', url: 'https://www.credly.com/badges/3ade7063-af82-43c9-adb6-780a9f1ad269/public_url', area: 'defense' },
  { name: 'Endpoint Security', url: 'https://www.credly.com/badges/b29867c4-7a0f-4b35-baee-87aeb8522425/public_url', area: 'defense' },
  { name: 'Introduction to Cybersecurity', url: 'https://www.credly.com/badges/98f16d13-aee5-4972-afd7-f44de6624da2/public_url', area: 'defense' },
  { name: 'Networking Devices and Initial Configuration', url: 'https://www.credly.com/badges/15007045-41fd-4482-bd81-1ff51dfbef42/public_url', area: 'network' },
  { name: 'Networking Basics', url: 'https://www.credly.com/badges/c295a965-3874-466b-9d5e-32fcfc555930/public_url', area: 'network' },
  { name: 'Digital Awareness', url: 'https://www.credly.com/badges/1efcbfe8-04a3-44f9-9af0-0e7d921be2a1/public_url', area: 'general' },
] as const;

export const inProgress = [
  { name: 'OSCP — OffSec PEN-200', status: { es: 'En preparación', en: 'In preparation' } },
];

// Writeups. Agrega una entrada por laboratorio que documentes.
export const writeups = [
  {
    title: 'Excessive trust in client-side controls',
    platform: 'PortSwigger Web Security Academy',
    category: { es: 'Lógica de negocio', en: 'Business logic' },
    tool: 'Caido',
    text: {
      es: 'Manipulación de una petición POST para alterar el precio de un producto en el carrito, aprovechando que el servidor confiaba en el valor enviado por el cliente.',
      en: 'Tampered with a POST request to change a product price in the cart, abusing a server that trusted client-supplied values.',
    },
    url: 'https://github.com/santix01/PortSwigger-Caido-Writeups/tree/main/Excessive-Trust-Lab',
  },
  {
    title: 'Information disclosure',
    platform: 'PortSwigger Web Security Academy',
    category: { es: 'Exposición de información', en: 'Information disclosure' },
    tool: 'Caido',
    text: {
      es: 'Identificación de datos sensibles expuestos por la aplicación y documentación de su mitigación.',
      en: 'Identified sensitive data exposed by the application and documented its mitigation.',
    },
    url: 'https://github.com/santix01/PortSwigger-Caido-Writeups/tree/main/Information-Disclosure-Lab',
  },
];
