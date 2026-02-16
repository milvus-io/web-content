---
id: gpu-index-overview.md
title: GPU-Index-Übersicht
summary: >-
  Der Aufbau eines Index mit GPU-Unterstützung in Milvus kann die Suchleistung
  in Szenarien mit hohem Durchsatz und hohem Abruf deutlich verbessern.
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">GPU-Index-Übersicht<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>Der Aufbau eines Index mit GPU-Unterstützung in Milvus kann die Suchleistung in Szenarien mit hohem Durchsatz und hohem Rückruf deutlich verbessern.</p>
<p>Die folgende Abbildung vergleicht den Abfragedurchsatz (Abfragen pro Sekunde) über verschiedene Indexkonfigurationen, Hardwarekonfigurationen, Vektordatensätze (Cohere und OpenAI) und Suchstapelgrößen hinweg. Dabei zeigt sich, dass <code translate="no">GPU_CAGRA</code> durchweg besser abschneidet als andere Methoden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
   </span> <span class="img-wrapper"> <span>GPU-Indexleistung</span> </span></p>
<h2 id="Configure-GPU-memory-pool-for-Milvus" class="common-anchor-header">Konfigurieren Sie den GPU-Speicherpool für Milvus<button data-href="#Configure-GPU-memory-pool-for-Milvus" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Milvus unterstützt einen globalen GPU-Speicherpool und bietet zwei Konfigurationsparameter, <code translate="no">initMemSize</code> und <code translate="no">maxMemSize</code>, in der <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus-Konfigurationsdatei</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># sets the maximum memory usage limit. When the memory usage exceeds initMemSize, Milvus will attempt to expand the memory pool.</span>
<button class="copy-code-btn"></button></code></pre>
<p>Der Standardwert <code translate="no">initMemSize</code> ist normalerweise die Hälfte des GPU-Speichers, wenn Milvus startet, und <code translate="no">maxMemSize</code> ist der Standardwert für den gesamten GPU-Speicher. Die Größe des GPU-Speicherpools ist anfänglich auf <code translate="no">initMemSize</code> eingestellt und wird bei Bedarf automatisch auf <code translate="no">maxMemSize</code> erweitert.</p>
<p>Wenn ein GPU-aktivierter Index angegeben wird, lädt Milvus die Zielsammlungsdaten vor der Suche in den GPU-Speicher, so dass <code translate="no">maxMemSize</code> mindestens die Datengröße sein muss.</p>
<h2 id="Limits" class="common-anchor-header">Begrenzungen<button data-href="#Limits" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li><p>Für <code translate="no">GPU_IVF_FLAT</code> beträgt der Höchstwert für <code translate="no">limit</code> 1.024.</p></li>
<li><p>Für <code translate="no">GPU_IVF_PQ</code> und <code translate="no">GPU_CAGRA</code> ist der Höchstwert für <code translate="no">limit</code> 1.024.</p></li>
<li><p>Während es für <code translate="no">GPU_BRUTE_FORCE</code> keinen festgelegten <code translate="no">limit</code> gibt, wird empfohlen, 4.096 nicht zu überschreiten, um mögliche Leistungsprobleme zu vermeiden.</p></li>
<li><p>Derzeit unterstützen GPU-Indizes nicht den <code translate="no">COSINE</code> Abstand. Wenn der <code translate="no">COSINE</code> Abstand benötigt wird, sollten die Daten zuerst normalisiert werden, und dann kann der innere Produktabstand (IP) als Ersatz verwendet werden.</p></li>
<li><p>Das Laden von OOM-Schutz für GPU-Indizes wird nicht vollständig unterstützt, zu viele Daten können zum Absturz von QueryNode führen.</p></li>
<li><p>GPU-Indizes unterstützen keine Suchfunktionen wie <a href="/docs/de/range-search.md">Bereichssuche</a> und <a href="/docs/de/grouping-search.md">Gruppierungssuche</a>.</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">Unterstützte GPU-Indextypen<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>In der folgenden Tabelle sind die von Milvus unterstützten GPU-Indextypen aufgeführt.</p>
<table>
   <tr>
     <th><p>Index-Typ</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Speicherverwendung</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/de/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>GPU_CAGRA ist ein graphenbasierter Index, der für GPUs optimiert ist. Die Verwendung von GPUs mit Inferenzqualität zur Ausführung der GPU-Version von Milvus kann im Vergleich zur Verwendung teurer GPUs mit Trainingsqualität kostengünstiger sein.</p></td>
     <td><p>Der Speicherbedarf ist etwa 1,8 Mal so hoch wie der der ursprünglichen Vektordaten.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLAT ist der einfachste IVF-Index, und die in jeder Einheit gespeicherten kodierten Daten stimmen mit den Originaldaten überein. Beachten Sie bei der Durchführung von Suchvorgängen, dass Sie für jede Suche in einer GPU_IVF_FLAT-indizierten Sammlung den Top-k-Wert (<code translate="no">limit</code>) auf bis zu 256 einstellen können.</p></td>
     <td><p>Benötigt Speicher, der der Größe der Originaldaten entspricht.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>GPU_IVF_PQ führt ein IVF-Indexclustering durch, bevor das Produkt der Vektoren quantisiert wird. Beachten Sie bei der Durchführung von Suchvorgängen, dass Sie den Top-k-Wert (<code translate="no">limit</code>) für jede Suche in einer GPU_IVF_FLAT-indizierten Sammlung auf bis zu 8.192 einstellen können.</p></td>
     <td><p>Verwendet einen kleineren Speicherbedarf, der von den Einstellungen der Kompressionsparameter abhängt.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/gpu-brute-force.md">GPU_BRUTE_FORCE</a></p></td>
     <td><p>GPU_BRUTE_FORCE ist auf Fälle zugeschnitten, in denen eine extrem hohe Trefferquote entscheidend ist. Sie garantiert eine Trefferquote von 1, indem sie jede Abfrage mit allen Vektoren des Datensatzes vergleicht. Es benötigt nur den metrischen Typ (<code translate="no">metric_type</code>) und top-k (<code translate="no">limit</code>) als Indexaufbau- und Suchparameter.</p></td>
     <td><p>Benötigt einen Speicherplatz, der der Größe der Originaldaten entspricht.</p></td>
   </tr>
</table>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">Konfigurieren Sie die Milvus-Einstellungen für die GPU-Speichersteuerung<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Milvus verwendet einen globalen Grafikspeicher-Pool für die Zuweisung von GPU-Speicher. Er unterstützt zwei Parameter <code translate="no">initMemSize</code> und <code translate="no">maxMemSize</code> in der <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus-Konfigurationsdatei</a>. Die Poolgröße ist anfänglich auf <code translate="no">initMemSize</code> eingestellt und wird automatisch auf <code translate="no">maxMemSize</code> erweitert, wenn diese Grenze überschritten wird.</p>
<p>Der Standardwert <code translate="no">initMemSize</code> ist 1/2 des verfügbaren GPU-Speichers, wenn Milvus startet, und der Standardwert <code translate="no">maxMemSize</code> ist gleich dem gesamten verfügbaren GPU-Speicher.</p>
<p>Bis zu Milvus 2.4.1 verwendet Milvus einen einheitlichen GPU-Speicherpool. Für Versionen vor 2.4.1 wurde empfohlen, beide Werte auf 0 zu setzen.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Ab Milvus 2.4.1 wird der GPU-Speicherpool nur noch für temporäre GPU-Daten während der Suche verwendet. Es wird daher empfohlen, ihn auf 2048 und 4096 zu setzen.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Um zu erfahren, wie man einen GPU-Index erstellt, lesen Sie die spezifische Anleitung für jeden Indextyp.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li><p><strong>Wann ist es sinnvoll, einen GPU-Index zu verwenden?</strong></p>
<p>Ein GPU-Index ist besonders vorteilhaft in Situationen, die einen hohen Durchsatz oder eine hohe Abrufrate erfordern. Bei großen Batches kann der Durchsatz der GPU-Indizierung beispielsweise den der CPU-Indizierung um das 100-fache übertreffen. In Szenarien mit kleineren Stapeln übertrifft die GPU-Indizierung die CPU-Indizierung in Bezug auf die Leistung immer noch deutlich. Darüber hinaus kann die Einbindung einer GPU den Prozess der Indexerstellung erheblich beschleunigen, wenn Daten schnell eingefügt werden müssen.</p></li>
<li><p><strong>Für welche Szenarien sind GPU-Indizes wie GPU_CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT und GPU_BRUTE_FORCE am besten geeignet?</strong></p>
<p><code translate="no">GPU_CAGRA</code> GPU_IVF_PQ und GPU_BRUTE_FORCE-Indizes sind ideal für Szenarien, die eine höhere Leistung erfordern, allerdings um den Preis, dass mehr Speicher verbraucht wird. In Umgebungen, in denen Speicherplatzeinsparung eine Priorität ist, kann der Index <code translate="no">GPU_IVF_PQ</code> dazu beitragen, die Speicheranforderungen zu minimieren, auch wenn dies mit einem höheren Präzisionsverlust einhergeht. Der Index <code translate="no">GPU_IVF_FLAT</code> stellt eine ausgewogene Option dar, die einen Kompromiss zwischen Leistung und Speicherbedarf bietet. Der Index <code translate="no">GPU_BRUTE_FORCE</code> schließlich ist für erschöpfende Suchvorgänge konzipiert und garantiert durch die Durchführung von Traversalsuchen eine Abrufrate von 1.</p></li>
</ul>
