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
    </button></h1><p>AISAQ ist ein festplattenbasierter Vektorindex, der <a href="/docs/de/diskann.md">DISKANN</a> erweitert, um Datensätze in Milliardengröße mit minimalem DRAM-Footprint zu verarbeiten.</p>
<p>Im Gegensatz zu DISKANN, das komprimierte Vektoren im Speicher hält, wurde AISAQ mit einer "Near-Zero-DRAM-Architektur" entwickelt, was bedeutet, dass alle Datenstrukturen auf SSD gespeichert werden.</p>
<p>AISAQ ermöglicht die Ausführung von Datenbanken mit extrem hohem Umfang unter Verwendung von Standardservern und bietet Betriebsmodi, die ein Gleichgewicht zwischen Leistung und Speicherkosten herstellen.</p>
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
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
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
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">AISAQ-Betriebsmodi<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ bietet zwei Betriebsmodi, um zwei unterschiedliche Anwendungsfälle abzudecken:</p>
<p>Leistungsmodus: Optimiert für Anwendungen, die eine niedrige Latenz und einen hohen Durchsatz in großem Umfang erfordern, wie z. B. die semantische Online-Suche.</p>
<p>Skalierungsmodus: Optimiert für Anwendungen mit weniger strengen Latenzvorgaben, wie z. B. RAG und semantische Offline-Suche, und ermöglicht gleichzeitig eine kosteneffiziente Erweiterung von Datensätzen auf einen extrem hohen Maßstab.</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">AISAQ-Leistungsmodus</h4><p><strong>AISAQ-Performance</strong> erreicht einen "DRAM-Footprint nahe Null", indem PQ-Daten vom Speicher auf die Festplatte verlagert werden, während die IOPS durch Daten-Colocation und Redundanz niedrig gehalten werden.</p>
<ul>
<li><p>Der Rohvektor eines jeden Knotens, die Kantenliste und die PQ-Daten seiner Nachbarn werden zusammen auf der Festplatte gespeichert.</p></li>
<li><p>Dieses Layout stellt sicher, dass der Besuch eines Knotens (z. B. Vektor 0) nur eine einzige Festplatten-E/A erfordert.</p></li>
<li><p>Da die PQ-Daten in der Nähe mehrerer Knoten redundant gespeichert werden, erhöht sich die Größe der Indexdatei beträchtlich, so dass mehr Speicherplatz benötigt wird.</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">AISAQ-Skala-Modus</h4><p><strong>AISAQ-scale</strong> konzentriert sich auf die Reduzierung des Speicherplatzbedarfs bei gleichzeitiger Erfüllung der Leistungsanforderungen der Zielanwendungen.</p>
<p>In diesem Modus:</p>
<ul>
<li><p>Die PQ-Daten werden separat auf der Festplatte gespeichert, ohne Redundanz.</p></li>
<li><p>Dieses Design minimiert die Indexgröße, führt aber zu mehr E/A-Operationen während der Durchquerung des Graphen.</p></li>
<li><p>Um den IOPS-Overhead zu mindern, führt AISAQ zwei Optimierungen ein:</p>
<ul>
<li><p>Ein Rearrange-Algorithmus, der die PQ-Vektoren nach Priorität sortiert, um die Datenlokalität zu verbessern.</p></li>
<li><p>Ein PQ-Cache im DRAM (pq_read_page_cache_size), der häufig genutzte PQ-Daten zwischenspeichert.</p></li>
</ul></li>
</ul>
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
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">AISAQ-Parameter<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ erbt einige Parameter von DISKANN - <code translate="no">max_degree</code>, <code translate="no">search_list_size</code> und <code translate="no">pq_code_budget_gb_ratio</code>.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter für die Indexerstellung<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Diese Parameter beeinflussen, wie der AISAQ-Index aufgebaut wird. Eine Anpassung dieser Parameter kann die Indexgröße, die Aufbauzeit und die Suchqualität beeinflussen.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Steuert die maximale Anzahl von Verbindungen (Kanten), die jeder Datenpunkt im Vamana-Diagramm haben kann.</p></td>
     <td><p><strong>Typ</strong>: Integer</p><p><strong>Bereich</strong>: [1, 512]</p><p><strong>Standardwert</strong>: <code translate="no">56</code></p></td>
     <td><p>Höhere Werte führen zu dichteren Diagrammen, was die Wiederauffindbarkeit erhöht (es werden mehr relevante Ergebnisse gefunden), aber auch den Speicherverbrauch und die Erstellungszeit erhöht. In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs zu wählen: [10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>Während der Indexerstellung definiert dieser Parameter die Größe des Kandidatenpools, der bei der Suche nach den nächsten Nachbarn für jeden Knoten verwendet wird. Für jeden Knoten, der dem Graphen hinzugefügt wird, führt der Algorithmus eine Liste der bisher gefundenen besten Kandidaten in der Größe search_list_size. Die Suche nach Nachbarn endet, wenn diese Liste nicht mehr verbessert werden kann. Aus diesem endgültigen Kandidatenpool werden die Knoten mit dem höchsten Grad ausgewählt, um die endgültigen Kanten zu bilden.</p></td>
     <td><p><strong>Typ</strong>: Integer</p><p><strong>Bereich</strong>: [1, 512]</p><p><strong>Standardwert</strong>: <code translate="no">100</code></p></td>
     <td><p>Eine größere search_list_size erhöht die Wahrscheinlichkeit, die wahren nächsten Nachbarn für jeden Knoten zu finden, was zu einem qualitativ hochwertigeren Graphen und einer besseren Suchleistung (recall) führen kann. Dies geht jedoch auf Kosten einer deutlich längeren Indexerstellungszeit. Er sollte immer auf einen Wert größer oder gleich max_degree gesetzt werden.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Anzahl der PQ-Vektoren, die pro Index-Knoten inline gespeichert werden (wird beim Zugriff auf den Knoten gelesen, um den IO-Aufwand zu verringern)</p></td>
     <td><p><strong>Typ</strong>: Integer</p><p><strong>Bereich</strong>: [0, <em>max_degree</em>]</p><p><strong>Standardwert</strong>: <code translate="no">-1</code></p></td>
     <td><p>Höhere Werte von <code translate="no">inline_pq</code> verbessern die Leistung, erhöhen aber den Speicherplatz.</p><p>Setzen Sie <code translate="no">inline_pq</code>=0 für AISAQ im Skalierungsmodus.</p><p>Setzen Sie <code translate="no">inline_pq</code>=-1, um ungenutzten Platz im Index automatisch mit PQ-Vektoren zu füllen, um AISAQ im Skalierungsmodus weiter zu optimieren.</p><p>Setzen Sie <code translate="no">inline_pq</code><em>=max_degree</em> für AISAQ im Leistungsmodus.</p><p><code translate="no">inline_pq</code> Einstellungen zwischen 0 und <em>max_degree</em> ermöglichen ein einstellbares Gleichgewicht zwischen Leistung und Speicherplatzverbrauch.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Ordnen Sie die Datenstruktur der PQ-Vektoren neu an, um die Datenlokalität zu verbessern und die Festplattenzugriffe während der Suche zu reduzieren (im Leistungsmodus ignoriert).</p></td>
     <td><p><strong>Typ</strong>: Boolean</p><p><strong>Bereich</strong>: [true, false]</p><p><strong>Standardwert</strong>: <code translate="no">true</code></p></td>
     <td><p>Wenn true, werden die IOs während der Suche reduziert, wobei der Speicherbedarf und die Zeit für den Indexaufbau nur geringfügig erhöht werden.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>Anzahl der Kandidaten-Einstiegspunkte, um die Auswahl der Such-Einstiegspunkte zu optimieren.</p></td>
     <td><p><strong>Typ</strong>: Integer</p><p><strong>Bereich</strong>: [0, 1000]</p><p><strong>Standardwert</strong>: <code translate="no">100</code></p></td>
     <td><p>Hohe Werte können die Suchzeit verringern, indem die Suche von einem näheren Einstiegspunkt aus gestartet wird.</p><p>Setzen Sie höhere Werte für große Segmente (z. B. für 10M-Vektoren und darüber verwenden Sie einen Wert von 1000).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Steuert die Größe der PQ-Codes (komprimierte Darstellungen der Datenpunkte) im Vergleich zur Größe der unkomprimierten Daten.</p></td>
     <td><p><strong>Typ</strong>: Fließkomma</p><p><strong>Bereich</strong>: (0.0, 0.25]</p><p><strong>Standardwert</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Ein höheres Verhältnis führt zu genaueren Suchergebnissen, da mehr Informationen über die ursprünglichen Vektoren gespeichert werden, erhöht aber den Rechenaufwand bei der Suche.</p><p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: (0.0417, 0.25].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>Steuert die Größe der PQ-Codes der im Index gespeicherten hochpräzisen Vektoren (die für die Neuordnung verwendet werden) im Vergleich zur Größe der unkomprimierten Daten.</p></td>
     <td><p><strong>Typ</strong>: Fließkomma</p><p><strong>Bereich</strong>: [0, 0.25]</p><p><strong>Standardwert</strong>: <code translate="no">0.25</code></p></td>
     <td><p>Mit dem Standardwert 0,25 werden die Vektoren auf 25 % ihrer ursprünglichen Größe quantisiert (4fache Komprimierung), was den Speicherplatz auf der Festplatte bei relativ geringen Auswirkungen auf die Genauigkeit reduziert.</p><p>Setzen Sie den Wert 0, um Vektoren mit voller Genauigkeit im Festplattenindex zu speichern und neu zu ordnen. Ein größerer Wert bietet eine höhere Wiederfindungsrate, erhöht aber die Festplattennutzung.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Größe des PQ-Vektoren-Caches in DRAM (Bytes). Der PQ-Vektoren-Cache wird beim Laden des Index geladen und während der Suche verwendet, um IOs zu reduzieren (im Leistungsmodus ignoriert).</p></td>
     <td><p><strong>Typ</strong>: Integer</p><p><strong>Bereich</strong>: [0, 1073741824]</p><p><strong>Standardwert</strong>: <code translate="no">0</code></p></td>
     <td><p>Ein größerer Cache verbessert die Abfrageleistung, erhöht aber die DRAM-Nutzung.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Steuert die Menge an DRAM, die für die Zwischenspeicherung von Indexknoten mit häufigem Zugriff verwendet wird.</p><p>Dieser Cache wird beim Laden des Index geladen und während der Suche verwendet, um IOs zu reduzieren.</p></td>
     <td><p><strong>Typ</strong>: Fließkomma</p><p><strong>Bereich</strong>: [0.0, 0.3)</p><p><strong>Standardwert</strong>: <code translate="no">0</code></p></td>
     <td><p>Ein höherer Wert weist mehr Speicher für die Zwischenspeicherung zu, wodurch weniger Festplattenzugriffe erforderlich sind, aber mehr Systemspeicher verbraucht wird. Ein niedrigerer Wert verwendet weniger Speicher für die Zwischenspeicherung und erhöht möglicherweise den Bedarf an Festplattenzugriffen.</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">Index-Such-Parameter<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Diese Parameter beeinflussen, wie AISAQ die Suche durchführt. Ihre Anpassung kann sich auf die Suchgeschwindigkeit, die Latenzzeit und den Ressourcenverbrauch auswirken.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>Während eines Suchvorgangs bestimmt dieser Parameter die Größe des Kandidatenpools, den der Algorithmus beim Durchlaufen des Graphen beibehält. Ein größerer Wert erhöht die Chancen, die wahren nächsten Nachbarn zu finden (höherer Recall), erhöht aber auch die Suchlatenz.</p></td>
     <td><p><strong>Typ</strong>: Integer</p><p><strong>Bereich</strong>: [topk, int32_max]</p><p><strong>Standardwert</strong>: <code translate="no">16</code></p></td>
     <td><p>Um ein gutes Gleichgewicht zwischen Leistung und Genauigkeit zu erreichen, wird empfohlen, diesen Wert gleich oder etwas größer als die Anzahl der abzurufenden Ergebnisse (top_k) zu setzen.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>Steuert den Grad der Parallelität während der Suche, indem die maximale Anzahl der parallelen Festplatten-E/A-Anforderungen zum Lesen der Indexknoten festgelegt wird.</p></td>
     <td><p><strong>Typ</strong>: Integer</p><p><strong>Bereich</strong>: [1, 16]</p><p><strong>Standardwert</strong>: <code translate="no">8</code></p></td>
     <td><p>Höhere Werte erhöhen die Parallelität, was die Suche auf Systemen mit leistungsstarken CPUs und SSDs beschleunigen kann. Ein zu hoher Wert kann jedoch zu einer übermäßigen Beanspruchung der Ressourcen führen.</p><p>In den meisten Fällen empfehlen wir einen Wert von 2.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>Steuert den Grad der Parallelität während der Suche, indem die maximale Anzahl der parallelen Festplatten-E/A-Anforderungen zum Lesen von Gruppen benachbarter PQ-Vektoren festgelegt wird (wird im Leistungsmodus ignoriert).</p></td>
     <td><p><strong>Typ</strong>: Integer</p><p><strong>Bereich</strong>: [1, 4] muss &lt;= <em>beamwidth</em> sein</p><p><strong>Standardwert</strong>: <code translate="no">1</code></p></td>
     <td><p>Höhere Werte erhöhen die Parallelität, was die Suche auf Systemen mit leistungsstarken CPUs und SSDs beschleunigen kann. Ein zu hoher Wert kann jedoch zu einer übermäßigen Ressourcenkonkurrenz führen, da jede benachbarte PQ-Vektorgruppe bis zu max_degree Vektoren enthalten kann.</p><p>In den meisten Fällen wird empfohlen, einen Wert von 1 zu wählen.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>PQ-Lese-Cache-Größe in DRAM pro Such-Thread (Bytes). Hier werden häufig aufgerufene Datenseiten, die PQ-Vektoren enthalten, zwischengespeichert (im Leistungsmodus ignoriert und nur anwendbar, wenn rearrange true ist).</p><p>Der PQ-Lese-Cache-Speicher wird für alle AISAQ-Segmente wiederverwendet.</p></td>
     <td><p><strong>Typ</strong>: Integer</p><p><strong>Bereich</strong>: [0, 33554432]</p><p><strong>Standardwert</strong>: <code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>Ein größerer Cache verbessert die Abfrageleistung, erhöht aber den DRAM-Verbrauch.</p><p>Empfohlene Werte reichen von 2 MiB für kleine Segmente (1 M Vektoren), 5 MiB für mittlere Segmente (50 M Vektoren) und 10 MiB für große Segmente (250 M Vektoren).</p></td>
   </tr>
</table>
