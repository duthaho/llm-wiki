import type { GraphData } from './build-graph.js';

export function generateHtml(data: GraphData): string {
  const jsonData = JSON.stringify(data);
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lịch Sử Việt Nam — Knowledge Graph</title>
  <script src="https://d3js.org/d3.v7.min.js"><\/script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-deep: #0a0a0f;
      --bg-surface: #12121c;
      --bg-elevated: #1a1a28;
      --bg-panel: #141420;
      --border: rgba(195, 163, 105, 0.12);
      --border-active: rgba(195, 163, 105, 0.3);
      --gold: #c3a369;
      --gold-bright: #dfc08a;
      --gold-dim: #8a7544;
      --text-primary: #e8e4dc;
      --text-secondary: #9a9590;
      --text-muted: #5e5a55;
      --person: #e07a5f;
      --concept: #81b29a;
      --dynasty: #b48ead;
      --event: #d4a84b;
      --place: #e6c86e;
      --era: #7da87b;
      --font-display: 'Cormorant Garamond', Georgia, serif;
      --font-body: 'Source Sans 3', system-ui, sans-serif;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: var(--font-body);
      background: var(--bg-deep);
      color: var(--text-primary);
      height: 100vh;
      overflow: hidden;
    }

    /* Subtle canvas grain texture */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
    }

    /* ─── Header ─── */
    .header {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 28px;
      background: linear-gradient(180deg, rgba(18,18,28,0.95) 0%, rgba(10,10,15,0.9) 100%);
      border-bottom: 1px solid var(--border);
      backdrop-filter: blur(12px);
    }

    .header-brand {
      display: flex;
      align-items: baseline;
      gap: 12px;
    }

    .header h1 {
      font-family: var(--font-display);
      font-size: 22px;
      font-weight: 600;
      color: var(--gold);
      letter-spacing: 0.02em;
    }

    .header .subtitle {
      font-size: 11px;
      font-weight: 300;
      color: var(--text-muted);
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    .controls {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .controls select,
    .controls input {
      padding: 8px 14px;
      border-radius: 4px;
      border: 1px solid var(--border);
      background: var(--bg-elevated);
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 300;
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }

    .controls select:focus,
    .controls input:focus {
      border-color: var(--gold-dim);
      box-shadow: 0 0 0 2px rgba(195, 163, 105, 0.08);
    }

    .controls input {
      width: 220px;
    }

    .controls input::placeholder {
      color: var(--text-muted);
      font-style: italic;
    }

    .node-count {
      font-size: 11px;
      color: var(--text-muted);
      font-weight: 300;
      letter-spacing: 0.05em;
    }

    .node-count strong {
      color: var(--gold-dim);
      font-weight: 500;
    }

    /* ─── Main Layout ─── */
    .main {
      position: relative;
      z-index: 1;
      display: flex;
      height: calc(100vh - 57px - 44px);
    }

    /* ─── Graph ─── */
    .graph-container {
      flex: 1;
      position: relative;
      cursor: grab;
      overflow: hidden;
      min-width: 0;
      background: radial-gradient(ellipse at 50% 50%, rgba(195,163,105,0.03) 0%, transparent 70%);
    }
    .graph-container:active { cursor: grabbing; }

    /* ─── Side Panel ─── */
    .side-panel {
      width: 420px;
      min-width: 420px;
      flex-shrink: 0;
      background: var(--bg-panel);
      border-left: 1px solid var(--border);
      overflow-y: auto;
      display: none;
      position: relative;
    }

    .side-panel.open {
      display: flex;
      flex-direction: column;
      animation: panelSlide 0.3s ease-out;
    }

    @keyframes panelSlide {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .panel-header {
      padding: 28px 28px 20px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, rgba(195,163,105,0.04) 0%, transparent 100%);
    }

    .panel-header h2 {
      font-family: var(--font-display);
      font-size: 26px;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.2;
      margin-bottom: 10px;
    }

    .panel-meta {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .type-badge {
      display: inline-block;
      padding: 3px 12px;
      border-radius: 3px;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .era-label {
      font-size: 11px;
      color: var(--text-muted);
      font-style: italic;
    }

    .panel-body {
      flex: 1;
      padding: 24px 28px 40px;
      overflow-y: auto;
    }

    .panel-body .page-content {
      font-size: 15px;
      line-height: 1.85;
      color: var(--text-secondary);
      font-weight: 300;
    }

    .panel-body .page-content h2 {
      font-family: var(--font-display);
      font-size: 18px;
      font-weight: 600;
      color: var(--gold);
      margin-top: 28px;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid var(--border);
      letter-spacing: 0.02em;
    }

    .panel-body .page-content h2:first-child {
      margin-top: 0;
    }

    .panel-body .page-content p {
      margin-bottom: 14px;
    }

    .panel-body .page-content ul {
      padding-left: 18px;
      margin-bottom: 14px;
    }

    .panel-body .page-content li {
      margin-bottom: 6px;
    }

    .panel-body .page-content strong {
      color: var(--text-primary);
      font-weight: 500;
    }

    .panel-body .page-content a.wiki-link {
      color: var(--gold);
      cursor: pointer;
      text-decoration: none;
      border-bottom: 1px solid rgba(195, 163, 105, 0.25);
      transition: border-color 0.2s, color 0.2s;
    }

    .panel-body .page-content a.wiki-link:hover {
      color: var(--gold-bright);
      border-bottom-color: var(--gold-bright);
    }

    .panel-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 28px;
      height: 28px;
      border: 1px solid var(--border);
      border-radius: 4px;
      background: var(--bg-elevated);
      color: var(--text-muted);
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.2s, color 0.2s;
      z-index: 3;
    }

    .panel-close:hover {
      border-color: var(--border-active);
      color: var(--text-primary);
    }

    /* ─── Scrollbar ─── */
    .panel-body::-webkit-scrollbar { width: 5px; }
    .panel-body::-webkit-scrollbar-track { background: transparent; }
    .panel-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
    .panel-body::-webkit-scrollbar-thumb:hover { background: var(--border-active); }

    /* ─── Legend ─── */
    .legend {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      padding: 10px 20px;
      background: linear-gradient(0deg, rgba(10,10,15,0.95) 0%, rgba(18,18,28,0.9) 100%);
      border-top: 1px solid var(--border);
      font-size: 11px;
      font-weight: 300;
      letter-spacing: 0.05em;
      color: var(--text-muted);
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: default;
      transition: color 0.2s;
    }

    .legend-item:hover { color: var(--text-secondary); }

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      box-shadow: 0 0 6px currentColor;
    }

    /* ─── Tooltip ─── */
    .tooltip {
      position: absolute;
      padding: 10px 14px;
      background: var(--bg-elevated);
      border: 1px solid var(--border-active);
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s;
      z-index: 10;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      max-width: 220px;
    }

    .tooltip .tt-title {
      font-family: var(--font-display);
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .tooltip .tt-meta {
      font-size: 10px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* ─── Empty State ─── */
    .empty-hint {
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      color: var(--text-muted);
      font-style: italic;
      pointer-events: none;
      opacity: 0.6;
      letter-spacing: 0.05em;
      animation: fadeHint 4s ease-in-out infinite;
    }

    @keyframes fadeHint {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.7; }
    }

    /* ─── Mobile: side panel as bottom sheet ─── */
    @media (max-width: 768px) {
      .header {
        padding: 10px 14px;
        flex-wrap: wrap;
        gap: 8px;
      }

      .header h1 { font-size: 18px; }
      .header .subtitle { display: none; }

      .controls {
        width: 100%;
        gap: 8px;
      }

      .controls input { flex: 1; width: auto; min-width: 0; }
      .node-count { display: none; }

      .main {
        flex-direction: column;
        height: calc(100vh - 90px - 44px);
      }

      .graph-container {
        flex: 1;
        min-height: 0;
      }

      /* Bottom sheet overlay */
      .side-panel {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        min-width: 0;
        max-height: 60vh;
        border-left: none;
        border-top: 1px solid var(--border-active);
        border-radius: 16px 16px 0 0;
        z-index: 20;
        box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
      }

      .side-panel.open {
        animation: sheetSlide 0.3s ease-out;
      }

      @keyframes sheetSlide {
        from { opacity: 0; transform: translateY(100%); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Drag handle indicator */
      .panel-header::before {
        content: '';
        display: block;
        width: 36px;
        height: 4px;
        background: var(--text-muted);
        border-radius: 2px;
        margin: 0 auto 14px;
        opacity: 0.5;
      }

      .panel-header {
        padding: 14px 20px 14px;
      }

      .panel-header h2 { font-size: 22px; }
      .panel-body { padding: 16px 20px 32px; }
      .panel-body .page-content { font-size: 14px; line-height: 1.75; }

      .panel-close {
        top: 12px;
        right: 12px;
      }

      .legend {
        gap: 12px;
        padding: 8px 12px;
        font-size: 10px;
        flex-wrap: wrap;
      }

      .empty-hint { bottom: 80px; font-size: 11px; }
    }

    /* ─── Small phones ─── */
    @media (max-width: 420px) {
      .header h1 { font-size: 16px; }
      .controls select { font-size: 12px; padding: 6px 8px; }
      .controls input { font-size: 12px; padding: 6px 8px; }

      .side-panel { max-height: 70vh; }
      .panel-header h2 { font-size: 19px; }
      .panel-body .page-content { font-size: 13px; }

      .legend { gap: 8px; font-size: 9px; }
      .legend-dot { width: 6px; height: 6px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-brand">
      <h1>Lịch Sử Việt Nam</h1>
      <span class="subtitle">Knowledge Graph</span>
    </div>
    <div class="controls">
      <span class="node-count"><strong id="nodeCount">0</strong> nodes &middot; <strong id="edgeCount">0</strong> connections</span>
      <select id="typeFilter">
        <option value="all">All types</option>
        <option value="person">Nhân vật</option>
        <option value="concept">Văn hóa</option>
        <option value="dynasty">Triều đại</option>
        <option value="event">Sự kiện</option>
        <option value="place">Địa danh</option>
        <option value="era">Thời kỳ</option>
      </select>
      <input type="text" id="searchBox" placeholder="Tìm kiếm...">
    </div>
  </div>

  <div class="main">
    <div class="graph-container" id="graph">
      <div class="empty-hint">Click a node to explore</div>
    </div>
    <div class="side-panel" id="sidePanel">
      <button class="panel-close" id="panelClose">&times;</button>
      <div class="panel-header">
        <h2 id="pageTitle"></h2>
        <div class="panel-meta">
          <span class="type-badge" id="typeBadge"></span>
          <span class="era-label" id="eraLabel"></span>
        </div>
      </div>
      <div class="panel-body">
        <div class="page-content" id="pageContent"></div>
      </div>
    </div>
  </div>

  <div class="legend">
    <div class="legend-item"><div class="legend-dot" style="color:var(--person);background:var(--person)"></div> Nhân vật</div>
    <div class="legend-item"><div class="legend-dot" style="color:var(--concept);background:var(--concept)"></div> Văn hóa</div>
    <div class="legend-item"><div class="legend-dot" style="color:var(--dynasty);background:var(--dynasty)"></div> Triều đại</div>
    <div class="legend-item"><div class="legend-dot" style="color:var(--event);background:var(--event)"></div> Sự kiện</div>
    <div class="legend-item"><div class="legend-dot" style="color:var(--place);background:var(--place)"></div> Địa danh</div>
    <div class="legend-item"><div class="legend-dot" style="color:var(--era);background:var(--era)"></div> Thời kỳ</div>
  </div>

  <div class="tooltip" id="tooltip"></div>

  <script>
    const WIKI_DATA = ${jsonData};
    const TYPE_COLORS = {
      person: '#e07a5f', concept: '#81b29a', dynasty: '#b48ead',
      event: '#d4a84b', place: '#e6c86e', era: '#7da87b'
    };
    const TYPE_LABELS = {
      person: 'Nhân vật', concept: 'Văn hóa', dynasty: 'Triều đại',
      event: 'Sự kiện', place: 'Địa danh', era: 'Thời kỳ'
    };

    // Stats
    document.getElementById('nodeCount').textContent = WIKI_DATA.nodes.length;
    document.getElementById('edgeCount').textContent = WIKI_DATA.edges.length;

    const container = document.getElementById('graph');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const tooltip = document.getElementById('tooltip');

    // SVG with defs for glow effect
    const svg = d3.select('#graph').append('svg')
      .attr('width', width)
      .attr('height', height);

    // Glow filter
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'blur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'blur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const g = svg.append('g');

    // Zoom
    const zoom = d3.zoom()
      .scaleExtent([0.2, 4])
      .filter((e) => {
        if (e.type === 'wheel') return true;
        if (e.type === 'dblclick') return true;
        if (e.target.tagName === 'circle') return false;
        return true;
      })
      .on('zoom', (e) => g.attr('transform', e.transform));
    svg.call(zoom);

    // Data
    let nodes = WIKI_DATA.nodes.map(d => ({ ...d }));
    let edges = WIKI_DATA.edges.map(d => ({ ...d }));

    // Connection count
    const connCount = {};
    nodes.forEach(n => connCount[n.id] = 0);
    edges.forEach(e => {
      connCount[e.source] = (connCount[e.source] || 0) + 1;
      connCount[e.target] = (connCount[e.target] || 0) + 1;
    });

    // Simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => getRadius(d) + 8));

    function getRadius(d) {
      return Math.max(6, Math.min(24, 5 + (connCount[d.id] || 0) * 2.5));
    }

    // Links — golden threads
    const link = g.append('g')
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('stroke', 'rgba(195, 163, 105, 0.15)')
      .attr('stroke-width', 1);

    // Nodes — bronze circles with glow
    const node = g.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => getRadius(d))
      .attr('fill', d => TYPE_COLORS[d.type] || '#888')
      .attr('stroke', 'rgba(0,0,0,0.4)')
      .attr('stroke-width', 1.5)
      .style('cursor', 'pointer')
      .style('filter', 'url(#glow)')
      .style('transition', 'r 0.3s ease')
      .on('mouseover', function(e, d) {
        d3.select(this)
          .attr('stroke', 'rgba(255,255,255,0.6)')
          .attr('stroke-width', 2.5)
          .attr('r', getRadius(d) + 3);

        tooltip.style.opacity = 1;
        tooltip.innerHTML = '<div class="tt-title">' + d.title + '</div>'
          + '<div class="tt-meta">' + (TYPE_LABELS[d.type] || d.type) + ' &middot; ' + d.era + '</div>';
        tooltip.style.left = (e.pageX + 14) + 'px';
        tooltip.style.top = (e.pageY - 14) + 'px';
      })
      .on('mousemove', function(e) {
        tooltip.style.left = (e.pageX + 14) + 'px';
        tooltip.style.top = (e.pageY - 14) + 'px';
      })
      .on('mouseout', function(e, d) {
        d3.select(this)
          .attr('stroke', 'rgba(0,0,0,0.4)')
          .attr('stroke-width', 1.5)
          .attr('r', getRadius(d));
        tooltip.style.opacity = 0;
      })
      .on('click', function(e, d) {
        e.stopPropagation();
        selectedNode = d.id;
        showPage(d);
        recenter(d);
        // Hide hint
        const hint = document.querySelector('.empty-hint');
        if (hint) hint.style.display = 'none';
      });

    // Labels
    const label = g.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.title)
      .attr('font-family', "'Cormorant Garamond', Georgia, serif")
      .attr('font-size', 11)
      .attr('font-weight', 600)
      .attr('fill', 'rgba(232, 228, 220, 0.7)')
      .attr('text-anchor', 'middle')
      .attr('dy', d => getRadius(d) + 16)
      .style('pointer-events', 'none')
      .style('text-shadow', '0 1px 4px rgba(0,0,0,0.8)');

    let selectedNode = null;

    // Close panel
    function closePanel() {
      document.getElementById('sidePanel').classList.remove('open');
      selectedNode = null;
      resetHighlight();
      requestAnimationFrame(() => {
        svg.attr('width', container.clientWidth).attr('height', container.clientHeight);
      });
    }

    svg.on('click', closePanel);
    document.getElementById('panelClose').addEventListener('click', closePanel);

    function showPage(d) {
      const panel = document.getElementById('sidePanel');
      document.getElementById('pageTitle').textContent = d.title;

      const badge = document.getElementById('typeBadge');
      badge.textContent = TYPE_LABELS[d.type] || d.type;
      badge.style.background = TYPE_COLORS[d.type] || '#888';
      badge.style.color = '#fff';

      document.getElementById('eraLabel').textContent = d.era;

      let html = WIKI_DATA.pages[d.id] || '<p>No content available.</p>';
      html = html.replace(/\\[\\[([^\\]]+)\\]\\]/g, (_, title) => {
        const targetId = title.toLowerCase().replace(/\\s+/g, '-');
        return '<a class="wiki-link" data-target="' + targetId + '" onclick="navigateTo(\\'' + targetId + '\\')">' + title + '</a>';
      });
      document.getElementById('pageContent').innerHTML = html;
      panel.classList.add('open');

      requestAnimationFrame(() => {
        svg.attr('width', container.clientWidth).attr('height', container.clientHeight);
      });
    }

    function recenter(d) {
      const connected = new Set();
      edges.forEach(e => {
        const src = typeof e.source === 'object' ? e.source.id : e.source;
        const tgt = typeof e.target === 'object' ? e.target.id : e.target;
        if (src === d.id) connected.add(tgt);
        if (tgt === d.id) connected.add(src);
      });

      node.transition().duration(400)
        .attr('opacity', n => n.id === d.id || connected.has(n.id) ? 1 : 0.08);
      link.transition().duration(400)
        .attr('stroke', e => {
          const src = typeof e.source === 'object' ? e.source.id : e.source;
          const tgt = typeof e.target === 'object' ? e.target.id : e.target;
          return src === d.id || tgt === d.id ? 'rgba(195, 163, 105, 0.5)' : 'rgba(195, 163, 105, 0.03)';
        })
        .attr('stroke-width', e => {
          const src = typeof e.source === 'object' ? e.source.id : e.source;
          const tgt = typeof e.target === 'object' ? e.target.id : e.target;
          return src === d.id || tgt === d.id ? 2 : 1;
        });
      label.transition().duration(400)
        .attr('opacity', n => n.id === d.id || connected.has(n.id) ? 1 : 0.05);

      simulation
        .force('radial', d3.forceRadial(130, d.x, d.y).strength(n => connected.has(n.id) ? 0.8 : 0))
        .alpha(0.5)
        .restart();

      const transform = d3.zoomIdentity.translate(width / 2 - d.x, height / 2 - d.y);
      svg.transition().duration(600).ease(d3.easeCubicOut).call(zoom.transform, transform);
    }

    function resetHighlight() {
      node.transition().duration(400).attr('opacity', 1);
      link.transition().duration(400)
        .attr('stroke', 'rgba(195, 163, 105, 0.15)')
        .attr('stroke-width', 1);
      label.transition().duration(400).attr('opacity', 0.7);
      simulation.force('radial', null).alpha(0.3).restart();
    }

    window.navigateTo = function(targetId) {
      const target = nodes.find(n => n.id === targetId);
      if (target) {
        selectedNode = target.id;
        showPage(target);
        recenter(target);
      }
    };

    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      node.attr('cx', d => d.x).attr('cy', d => d.y);
      label.attr('x', d => d.x).attr('y', d => d.y);
    });

    // Filter
    document.getElementById('typeFilter').addEventListener('change', (e) => {
      const type = e.target.value;
      node.transition().duration(300)
        .attr('display', d => type === 'all' || d.type === type ? null : 'none');
      label.transition().duration(300)
        .attr('display', d => type === 'all' || d.type === type ? null : 'none');
      link.transition().duration(300)
        .attr('display', e => {
          const src = typeof e.source === 'object' ? e.source : nodes.find(n => n.id === e.source);
          const tgt = typeof e.target === 'object' ? e.target : nodes.find(n => n.id === e.target);
          if (type === 'all') return null;
          return (src && src.type === type) || (tgt && tgt.type === type) ? null : 'none';
        });
    });

    // Search
    document.getElementById('searchBox').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      if (!q) { resetHighlight(); return; }
      const match = nodes.find(n => n.title.toLowerCase().includes(q));
      if (match) {
        recenter(match);
        showPage(match);
      }
    });

    // Resize
    window.addEventListener('resize', () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      svg.attr('width', w).attr('height', h);
      simulation.force('center', d3.forceCenter(w / 2, h / 2)).alpha(0.3).restart();
    });
  <\/script>
</body>
</html>`;
}
