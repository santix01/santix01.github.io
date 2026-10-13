// Terminal interactiva del hero. Sin innerHTML con datos del usuario: todo se arma con nodos.

interface TermData {
  lang: 'es' | 'en';
  user: string; host: string; boot: string; home: string; alt: string; cv: string; email: string;
  whoami: string[]; help: string[]; certs: string[]; skills: string[];
  projects: { slug: string; title: string; cat: string; summary: string; stack: string; repo: string; href: string }[];
  links: { github: string; linkedin: string };
  msg: Record<string, string>;
}

type Part = string | { text: string; cls?: string; href?: string };

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function initTerminal(root: HTMLElement) {
  const d: TermData = JSON.parse(root.dataset.terminal || '{}');
  const screen = root.querySelector<HTMLElement>('.term__screen')!;
  const form = root.querySelector<HTMLFormElement>('.term__form')!;
  const input = root.querySelector<HTMLInputElement>('.term__input')!;
  const history: string[] = [];
  let hIndex = -1;

  const line = (parts: Part[] | string, cls = 'out') => {
    const el = document.createElement('div');
    el.className = `ln ${cls}`;
    for (const p of typeof parts === 'string' ? [parts] : parts) {
      if (typeof p === 'string') { el.append(p); continue; }
      const node = p.href ? document.createElement('a') : document.createElement('span');
      if (p.href && node instanceof HTMLAnchorElement) {
        node.href = p.href;
        if (/^https?:/.test(p.href)) { node.target = '_blank'; node.rel = 'noopener'; }
      }
      if (p.cls) node.className = p.cls;
      node.textContent = p.text;
      el.append(node);
    }
    screen.append(el);
    screen.scrollTop = screen.scrollHeight;
    return el;
  };

  const echo = (cmd: string) => {
    const el = line([{ text: `${d.user}@${d.host}`, cls: 'u' }, ':', { text: '~', cls: 'p' }, '$ '], 'cmd');
    el.append(cmd);
    return el;
  };

  const findProject = (arg: string) => {
    const q = arg.toLowerCase().replace(/[^a-z0-9-]/g, '');
    return d.projects.find((p) => p.slug === q || p.slug.startsWith(q) || p.title.toLowerCase().replace(/\s+/g, '-').startsWith(q));
  };

  const commands: Record<string, (args: string[]) => void> = {
    help: () => d.help.forEach((h) => line(h)),
    whoami: () => d.whoami.forEach((w, i) => line(w, i === 0 ? 'out hl' : 'out')),
    ls: () => {
      d.projects.forEach((p) => line([{ text: p.slug.padEnd(22), cls: 'hl' }, p.cat]));
    },
    cat: ([arg]) => {
      if (!arg) return void line(`${d.msg.usage}: cat <${d.lang === 'es' ? 'proyecto' : 'project'}>`, 'err');
      const p = findProject(arg);
      if (!p) return void line(d.msg.noProject, 'err');
      line(p.title, 'out hl');
      line(p.summary);
      line(`stack: ${p.stack}`);
      line(['repo: ', { text: p.repo.replace('https://', ''), href: p.repo }]);
      line(['→ ', { text: `open ${p.slug}`, href: p.href }]);
    },
    open: ([arg]) => {
      if (!arg) return void line(`${d.msg.usage}: open <${d.lang === 'es' ? 'proyecto' : 'project'}>`, 'err');
      const p = findProject(arg);
      if (!p) return void line(d.msg.noProject, 'err');
      line(`${d.msg.opening} ${p.title}…`);
      setTimeout(() => (window.location.href = p.href), 350);
    },
    certs: () => {
      line('Cisco Networking Academy', 'out hl');
      d.certs.forEach((c) => line(`  ✓ ${c}`));
    },
    skills: () => d.skills.forEach((s) => line(`  • ${s}`)),
    contact: () => {
      line(['email     ', { text: d.email, href: `mailto:${d.email}` }]);
      line(['github    ', { text: d.links.github.replace('https://', ''), href: d.links.github }]);
      line(['linkedin  ', { text: 'linkedin.com/in/santiago-avendaño-lópez', href: d.links.linkedin }]);
    },
    cv: () => {
      if (!d.cv) return void line(d.msg.noCv);
      line([{ text: d.cv.split('/').pop() || 'cv.pdf', href: d.cv }]);
      window.open(d.cv, '_blank', 'noopener');
    },
    lang: () => {
      line(d.msg.switching);
      setTimeout(() => (window.location.href = d.alt), 350);
    },
    clear: () => { screen.textContent = ''; },
    history: () => history.forEach((h, i) => line(`${String(i + 1).padStart(4)}  ${h}`)),
    sudo: () => line(d.msg.sudo, 'err'),
    rm: () => line(d.msg.rm, 'err'),
    pwd: () => line(`/home/${d.user}`),
    date: () => line(new Date().toString()),
    echo: (args) => line(args.join(' ')),
    exit: () => line(d.lang === 'es' ? 'No hay a dónde ir. Quédate un rato.' : 'Nowhere to go. Stay a while.'),
  };
  const aliases: Record<string, string> = {
    contacto: 'contact', proyectos: 'ls', projects: 'ls', dir: 'ls', ayuda: 'help', '?': 'help', cls: 'clear', man: 'help',
  };

  const run = (raw: string) => {
    const cmdline = raw.trim();
    echo(cmdline);
    if (!cmdline) return;
    history.push(cmdline);
    hIndex = history.length;
    let [name, ...args] = cmdline.split(/\s+/);
    name = name.toLowerCase();
    if (name === 'ls' && args[0]) args = []; // `ls proyectos` también lista
    const fn = commands[aliases[name] ?? name];
    if (fn) fn(args);
    else line(`${name}: ${d.msg.notFound}. ${d.msg.hintHelp}`, 'err');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    run(input.value);
    input.value = '';
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      hIndex = Math.max(0, hIndex - 1);
      input.value = history[hIndex] ?? '';
    } else if (e.key === 'ArrowDown' && history.length) {
      e.preventDefault();
      hIndex = Math.min(history.length, hIndex + 1);
      input.value = history[hIndex] ?? '';
    } else if (e.key === 'Tab') {
      const [name, arg] = input.value.split(/\s+/);
      if (arg !== undefined) {
        const p = findProject(arg);
        if (p) { e.preventDefault(); input.value = `${name} ${p.slug}`; }
      } else if (name) {
        const match = Object.keys(commands).find((c) => c.startsWith(name.toLowerCase()));
        if (match) { e.preventDefault(); input.value = `${match} `; }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      screen.textContent = '';
    }
  });

  // Clic en la pantalla enfoca el input, salvo que se esté seleccionando texto o abriendo un link.
  screen.addEventListener('mouseup', (e) => {
    if ((e.target as HTMLElement).closest('a')) return;
    if (!window.getSelection()?.toString()) input.focus({ preventScroll: true });
  });

  // Arranque: escribe `whoami` como si alguien lo tecleara.
  const boot = async () => {
    if (reduced()) { run(d.boot); return; }
    const el = echo('');
    await sleep(700);
    for (const ch of d.boot) {
      el.append(ch);
      await sleep(85 + Math.random() * 70);
    }
    await sleep(250);
    el.remove();
    run(d.boot);
  };
  boot();
}
