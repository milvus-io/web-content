---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQ ist ein festplattenbasierter Vektorindex, der DISKANN erweitert, um
  Datensätze in Milliardenhöhe zu verarbeiten, ohne die Grenzen des RAM zu
  überschreiten. Im Gegensatz zu DISKANN, das komprimierte Vektoren im Speicher
  hält, speichert AISAQ alle Daten auf der Festplatte und bietet zwei Modi, um
  Leistung und Speicherkosten auszugleichen.
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQ ist ein festplattenbasierter Vektorindex, der <a href="/docs/de/diskann.md">DISKANN</a> erweitert, um Datensätze in Milliardenhöhe zu verarbeiten, ohne die Grenzen des RAM zu überschreiten. Im Gegensatz zu DISKANN, das komprimierte Vektoren im Speicher hält, speichert AISAQ alle Daten auf der Festplatte und bietet zwei Modi, um Leistung und Speicherkosten auszugleichen.</p>
<p>Verwenden Sie AISAQ, wenn Ihr Vektordatensatz zu groß ist, um bequem in den Arbeitsspeicher zu passen, oder wenn Sie die Infrastrukturkosten optimieren müssen, indem Sie etwas Abfrageleistung gegen geringere Speicheranforderungen eintauschen.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">Wie AISAQ funktioniert<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Das obige Diagramm vergleicht die Speicherlayouts von <strong>DISKANN</strong>, <strong>AISAQ-Performance</strong> und <strong>AISAQ-Scale</strong> und zeigt, wie die Daten (Rohvektoren, Kantenlisten und PQ-Codes) zwischen RAM und Festplatte verteilt werden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>Aisaq vs. Diskann</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">Grundlage: DISKANN-Zusammenfassung<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei DISKANN werden die Rohvektoren und Kantenlisten auf der Festplatte gespeichert, während die PQ-komprimierten Vektoren im Speicher (DRAM) aufbewahrt werden.</p>
<p>Wenn DISKANN einen Knoten (z.B. <em>Vektor 0</em>) ansteuert:</p>
<ul>
<li><p>Er lädt den Rohvektor<strong>(raw_vector_0</strong>) und seine Kantenliste<strong>(edgelist_0</strong>) von der Festplatte.</p></li>
<li><p>Die Kantenliste gibt an, welche Nachbarn als nächstes besucht werden sollen (in diesem Beispiel die Knoten 2, 3 und 5).</p></li>
<li><p>Der Rohvektor wird verwendet, um den genauen Abstand zum Abfragevektor für die Rangfolge zu berechnen.</p></li>
<li><p>Die PQ-Daten im Speicher werden für die ungefähre Abstandsfilterung verwendet, um den nächsten Durchlauf zu steuern.</p></li>
</ul>
<p>Da die PQ-Daten bereits im DRAM zwischengespeichert sind, ist für jeden Knotenbesuch nur eine Festplatten-E/A erforderlich, wodurch eine hohe Abfragegeschwindigkeit bei moderater Speichernutzung erreicht wird.</p>
<p>Eine ausführliche Erläuterung dieser Komponenten und Parameter finden Sie unter <a href="/docs/de/diskann.md">DISKANN</a>.</p>
<h3 id="AISAQ-modes" class="common-anchor-header">AISAQ-Betriebsarten<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ bietet zwei plattenbasierte Speicherstrategien. Der Hauptunterschied besteht darin, wie die PQ-komprimierten Daten gespeichert werden.</p>
<h4 id="AISAQ-performance" class="common-anchor-header">AISAQ-Leistung</h4><p><strong>AISAQ-Performance</strong> erreicht eine vollständig plattenbasierte Speicherung, indem PQ-Daten vom Speicher auf die Platte verlagert werden, während die IOPS durch Datenkolokation und Redundanz niedrig gehalten werden.</p>
<p>In diesem Modus:</p>
<ul>
<li><p>Der Rohvektor eines jeden Knotens, die Kantenliste und die PQ-Daten seiner Nachbarn werden zusammen auf der Festplatte gespeichert.</p></li>
<li><p>Dieses Layout stellt sicher, dass der Besuch eines Knotens (z. B. <em>Vektor 0</em>) weiterhin nur eine einzige Festplatten-E/A erfordert.</p></li>
<li><p>Da jedoch die PQ-Daten in der Nähe mehrerer Knoten redundant gespeichert werden, erhöht sich die Größe der Indexdatei beträchtlich, wodurch mehr Speicherplatz benötigt wird.</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">AISAQ-Skala</h4><p><strong>AISAQ-scale</strong> konzentriert sich auf die <em>Reduzierung des Speicherplatzbedarfs</em>, wobei alle Daten auf der Festplatte verbleiben.</p>
<p>In diesem Modus:</p>
<ul>
<li><p>Die PQ-Daten werden separat auf der Festplatte gespeichert, ohne Redundanz.</p></li>
<li><p>Dieses Design minimiert die Indexgröße, führt aber zu mehr E/A-Vorgängen während der Diagrammdurchquerung.</p></li>
<li><p>Um den IOPS-Overhead zu mindern, führt AISAQ zwei Optimierungen ein:</p>
<ul>
<li><p>Eine Rearrange-Strategie, die PQ-Vektoren nach Priorität sortiert, um die Datenlokalität zu verbessern.</p></li>
<li><p>Ein PQ-Cache im DRAM (pq_cache_size), der häufig genutzte PQ-Daten zwischenspeichert.</p></li>
</ul></li>
</ul>
<p>Infolgedessen erreicht AISAQ-scale eine bessere Speichereffizienz, aber eine geringere Leistung als DISKANN oder AISAQ-Performance.</p>
<h2 id="Example-configuration" class="common-anchor-header">Beispielhafte Konfiguration<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">AISAQ-spezifische Parameter<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ erbt viele Parameter von DISKANN. Um Redundanz zu vermeiden, werden im Folgenden nur die AISAQ-spezifischen Parameter beschrieben. Beschreibungen der gemeinsamen Parameter wie <code translate="no">max_degree</code>, <code translate="no">pq_code_budget_gb_ratio</code>, <code translate="no">search_list_size</code> und <code translate="no">beam_width_ratio</code> finden Sie unter <a href="/docs/de/diskann.md#DISKANN-params">DISKANN</a>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Anzahl der inline gespeicherten PQ-Vektoren pro Knoten. Bestimmt das Speicherlayout (Performance vs. Scale-Modus).</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl</p><p><strong>Bereich</strong>: [0, <em>max_degree</em>]</p><p><strong>Standardwert</strong>: <code translate="no">-1</code></p></td>
     <td><p>Je näher <code translate="no">inline_pq</code> an <em>max_degree</em> liegt, desto besser ist tendenziell die Leistung, aber die Größe der Indexdatei nimmt deutlich zu.</p><p>Wenn <code translate="no">inline_pq</code> sich 0 nähert, nimmt die Leistung ab, und die Indexgröße wird ähnlich wie bei DISKANN.</p><p><strong>Hinweis</strong>: Dies hängt stark von der Festplattenleistung ab. Wenn die Festplattenleistung schlecht ist, ist es nicht ratsam, diese Option zu aktivieren, da die begrenzte Festplattenbandbreite zu einem Engpass werden und die Gesamtleistung beeinträchtigen kann.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Aktiviert die Sortierung der PQ-Vektoren nach Priorität, um die E/A-Lokalität zu verbessern.</p></td>
     <td><p><strong>Typ</strong>: Boolean</p><p><strong>Bereich</strong>: [true, false]</p><p><strong>Standardwert</strong>: <code translate="no">false</code></p></td>
     <td><p>Reduziert die Abfrage-E/A, erhöht aber die Indexaufbauzeit.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>PQ-Cache-Größe in DRAM (Bytes).</p></td>
     <td><p><strong>Typ</strong>: Integer</p><p><strong>Bereich</strong>: [0, 1&lt;&lt;30]</p><p><strong>Standardwert</strong>: <code translate="no">0</code></p></td>
     <td><p>Ein größerer Cache verbessert die Abfrageleistung, erhöht aber den DRAM-Verbrauch.</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Erwägungen<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Die Festplattenleistung ist wichtig. AISAQ hängt stark von SSD IOPS ab; schlechter Speicher kann QPS reduzieren.</p></li>
<li><p>AISAQ-Performance-Modus ≈ DISKANN-Latenz, kann aber ein Mehrfaches an Speicherplatz erfordern.</p></li>
<li><p>Der AISAQ-Skalierungsmodus eignet sich für Offline-Such- oder Datenarchivierungsarbeitslasten, bei denen QPS weniger wichtig ist.</p></li>
</ul>
