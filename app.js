const titles = chapterTitles;
const descriptions=['Seeing the whole person.','Curiosity before certainty.','Capacity, context and hidden effort.','The protection we learn.','Autonomy in everyday life.','Making space for competing needs.','Understanding what sits beneath.','Taking needs seriously, earlier.','From impact to repair.','Giving children room to be children.','Building a sustainable shared life.'];
const symbols = ['rainbow','lantern','hourglass','guardian','umbrella','bridge','roots','sprout','bowl','nest','cottage'];
function icon(kind) {
  // Frame the painted landmark itself so map and index share the same details.
  const landmarks = {
    rainbow: { crop: [100, 75, 225, 220], detail: 'Flowering gate and rainbow' },
    lantern: { crop: [445, 55, 155, 205], detail: 'Amber lantern and ancient tree' },
    hourglass: { crop: [800, 75, 190, 220], detail: 'Golden hourglass and mossy shrine' },
    guardian: { crop: [670, 315, 300, 275], detail: 'Guardian tree and glowing hollow doorway' },
    umbrella: { crop: [225, 325, 320, 240], detail: 'Giant leaf, dewdrops and mossy seat' },
    bridge: { crop: [5, 565, 290, 200], detail: 'Wooden bridge and turquoise stream' },
    roots: { crop: [345, 585, 375, 230], detail: 'Ancient roots, mushrooms and hidden sprites' },
    sprout: { crop: [785, 745, 230, 195], detail: 'Young plants and golden watering can' },
    bowl: { crop: [330, 825, 270, 225], detail: 'Gold-seamed bowl fountain and flowers' },
    nest: { crop: [15, 1085, 285, 220], detail: 'Woven nest, birds and little sprites' },
    cottage: { crop: [545, 1060, 435, 305], detail: 'Moss-roofed cottage and glowing windows' }
  };
  const landmark = landmarks[kind];
  return '<span class="chapter-icon" data-landmark="' + kind + '" title="' + landmark.detail + '">'
    + '<svg viewBox="' + landmark.crop.join(' ') + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<image href="forest-painted-v2.png" width="1024" height="1536"/>'
    + '</svg></span>';
}
function spriteFur() {
  const tufts = [];
  for (let i = 0; i < 76; i++) {
    const angle = i * Math.PI * 2 / 76;
    const length = 2.5 + (i * 7 % 11) * .42;
    const radius = 20 + (i % 4) * .55;
    const x = 32 + Math.cos(angle) * radius;
    const y = 35 + Math.sin(angle) * radius;
    const tipX = 32 + Math.cos(angle + Math.sin(i * 2) * .025) * (radius + length);
    const tipY = 35 + Math.sin(angle + Math.sin(i * 2) * .025) * (radius + length);
    const bendX = x + Math.cos(angle + .3) * length * .7;
    const bendY = y + Math.sin(angle + .3) * length * .7;
    tufts.push('<path d="M'+x.toFixed(2)+' '+y.toFixed(2)+' Q'+bendX.toFixed(2)+' '+bendY.toFixed(2)+' '+tipX.toFixed(2)+' '+tipY.toFixed(2)+'" stroke="'+(i % 3 === 0 ? '#42494a' : '#252831')+'" stroke-width="'+(i % 3 === 0 ? '.65' : '1.15')+'" stroke-linecap="round" fill="none"/>');
  }
  return '<g class="sprite-fur">'+tufts.join('')+'</g>';
}
const mapTitles = ['The whole picture','Curiosity & understanding','Capacity & context','Our protectors','Demands & autonomy','Competing needs','Different roots','Before the crisis','Accountability & repair','What children carry','A life that makes room'];
document.querySelector('#chapters').innerHTML=titles.map((title,i)=>'<a class="chapter" href="#chapter-'+(i+1)+'" aria-label="Chapter '+(i+1)+'. '+title+'">'+icon(symbols[i])+'<small>'+(i+1)+'</small><h3><span class="map-title">'+mapTitles[i]+'</span><span class="full-title">'+title+'</span></h3><p>'+descriptions[i]+'</p><span class="chapter-sprite" aria-hidden="true"><svg viewBox="0 0 64 70"><ellipse cx="32" cy="65" rx="17" ry="3" fill="#28402b" opacity=".25"/><g class="sprite-body">'+spriteFur()+'<path d="m12 31-5-4 6-1-3-7 7 3 1-8 5 5 4-8 4 6 6-7 2 8 8-4-1 8 8-1-4 6 7 3-6 4 5 6-7 1 2 8-7-2-2 7-6-4-5 7-4-6-6 4-2-7-7 1 2-7-7-2 5-5-5-5z" fill="#252831" stroke="#151a23" stroke-width="1.3" stroke-linejoin="round"/><ellipse cx="32" cy="35" rx="21" ry="21" fill="#252831"/><path d="m15 22 3-2m-5 9 2-1m4-9 2-1m28 8 2 1m-5 23 2-1m-31-2 2 2m6 3 2 1" stroke="#49504d" stroke-width=".7" opacity=".6" stroke-linecap="round"/><path d="m15 48-6 7m38-7 7 6m-29 3-3 6m15-6 4 6" stroke="#20252d" stroke-width="2.5" stroke-linecap="round"/><g class="sprite-eyes"><circle cx="23" cy="31" r="10" fill="#fffdf5"/><circle cx="43" cy="31" r="10" fill="#fffdf5"/><g class="sprite-pupils"><circle cx="25" cy="31" r="3.4" fill="#101318"/><circle cx="45" cy="31" r="3.4" fill="#101318"/></g></g></g><circle class="sprite-spark spark-one" cx="5" cy="12" r="2" fill="#ffe3a0"/><circle class="sprite-spark spark-two" cx="59" cy="21" r="2.2" fill="#ffe3a0"/></svg></span></a>').join('');
const dialog = document.querySelector('#reader');
let current = 0;
let origin = null;

function escapeHtml(text) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function inline(text) {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function renderMarkdown(text) {
  return text.split(/\r?\n\s*\r?\n/).filter(block => block.trim()).map(block => {
    const heading = block.match(/^(#{2,3}) (.+)$/);
    if (heading) return '<h3>' + inline(heading[2]) + '</h3>';
    const lines = block.split(/\r?\n/);
    if (lines.every(line => line.startsWith('- '))) {
      return '<ul>' + lines.map(line => '<li>' + inline(line.slice(2)) + '</li>').join('') + '</ul>';
    }
    return '<p>' + inline(lines.join(' ')) + '</p>';
  }).join('');
}

function openChapter(number) {
  if (!Number.isInteger(number) || number < 0 || number > titles.length) return;
  current = number;
  const isIntroduction = number === 0;
  const title = isIntroduction ? 'Introduction' : titles[number - 1];
  const text = isIntroduction ? introductionText : chapterTexts[number - 1];
  const part = isIntroduction ? 'The Neurodivergence Companion' : chapterParts[number - 1];
  document.querySelector('#reader-label').textContent = isIntroduction
    ? 'THE NEURODIVERGENCE COMPANION · INTRODUCTION'
    : 'THE NEURODIVERGENCE COMPANION · CHAPTER ' + number;
  const body = document.querySelector('#reader-body');
  body.innerHTML = '<p class="reader-part">' + escapeHtml(part) + '</p>'
    + '<h2 tabindex="-1">' + escapeHtml(title) + '</h2>' + renderMarkdown(text);
  const previous = document.querySelector('#previous');
  const next = document.querySelector('#next');
  previous.disabled = isIntroduction;
  previous.textContent = number === 1 ? 'Introduction' : 'Previous chapter';
  next.disabled = number === titles.length;
  next.textContent = isIntroduction ? 'Begin Chapter 1' : 'Next chapter';
  dialog.setAttribute('aria-label', title);
  if (!dialog.open) {
    origin = document.activeElement;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  body.querySelector('h2').focus({ preventScroll: true });
  dialog.scrollTop = 0;
}

function readHash() {
  if (location.hash === '#introduction' || location.hash === '#about') {
    openChapter(0);
    return;
  }
  const match = location.hash.match(/^#chapter-(\d+)$/);
  if (match) openChapter(Number(match[1]));
}

window.addEventListener('hashchange', readHash);
readHash();
document.querySelector('#close').onclick = () => dialog.close();
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  history.replaceState(null, '', '#journey');
  origin?.focus();
});
document.querySelector('#previous').onclick = () => {
  location.hash = current === 1 ? 'introduction' : 'chapter-' + (current - 1);
};
document.querySelector('#next').onclick = () => {
  location.hash = 'chapter-' + (current + 1);
};
document.querySelector('#view').onclick = function () {
  const list = document.querySelector('#landscape').classList.toggle('list-mode');
  this.textContent = list ? 'Landscape view' : 'List view';
  this.setAttribute('aria-pressed', String(list));
};