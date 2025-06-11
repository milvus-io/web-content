---
id: diskann.md
title: DISKANN
summary: >-
  In großen Szenarien, in denen Datensätze Milliarden oder sogar Billionen von
  Vektoren umfassen können, können standardmäßige speicherinterne
  Indizierungsmethoden (z. B. HNSW, IVF_FLAT) aufgrund von
  Speicherbeschränkungen oft nicht mithalten. DISKANN bietet einen
  plattenbasierten Ansatz, der diese Herausforderungen angeht, indem er eine
  hohe Suchgenauigkeit und -geschwindigkeit beibehält, wenn die Größe des
  Datensatzes den verfügbaren Arbeitsspeicher übersteigt.
---
<h1 id="DISKANN" class="common-anchor-header">DISKANN<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>In großen Szenarien, in denen Datensätze Milliarden oder sogar Billionen von Vektoren umfassen können, können standardmäßige speicherinterne Indizierungsmethoden (z. B. <a href="/docs/de/hnsw.md">HNSW</a>, <a href="/docs/de/ivf-flat.md">IVF_FLAT</a>) aufgrund von Speicherbeschränkungen oft nicht mithalten. <strong>DISKANN</strong> bietet einen plattenbasierten Ansatz, der diese Herausforderungen angeht, indem er eine hohe Suchgenauigkeit und -geschwindigkeit beibehält, wenn die Größe des Datensatzes den verfügbaren Arbeitsspeicher übersteigt.</p>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>DISKANN</strong> kombiniert zwei Schlüsseltechniken für eine effiziente Vektorsuche:</p>
<ul>
<li><p><strong>Vamana Graph</strong> - Ein <strong>festplattenbasierter</strong>, <strong>graphbasierter</strong> Index, der Datenpunkte (oder Vektoren) für eine effiziente Navigation während der Suche miteinander verbindet.</p></li>
<li><p><strong>Produktquantisierung (PQ)</strong> - Eine <strong>speicherinterne</strong> Komprimierungsmethode, die die Größe von Vektoren reduziert und eine schnelle, ungefähre Abstandsberechnung zwischen Vektoren ermöglicht.</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">Index-Konstruktion</h3><h4 id="Vamana-graph" class="common-anchor-header">Vamana-Graph</h4><p>Der Vamana-Graph ist das Herzstück der festplattenbasierten Strategie von DISKANN. Er kann sehr große Datensätze verarbeiten, da er während und nach der Erstellung nicht vollständig im Speicher liegen muss.</p>
<p>Die folgende Abbildung zeigt, wie ein Vamana-Graph aufgebaut ist.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
   </span> <span class="img-wrapper"> <span>Diskann</span> </span></p>
<ol>
<li><p><strong>Anfängliche zufällige Verbindungen:</strong> Jeder Datenpunkt (Vektor) wird als ein Knoten im Graphen dargestellt. Diese Knoten werden anfangs zufällig miteinander verbunden und bilden ein dichtes Netz. Normalerweise hat ein Knoten zu Beginn etwa 500 Kanten (oder Verbindungen), um eine breite Konnektivität zu gewährleisten.</p></li>
<li><p><strong>Verfeinerung für mehr Effizienz:</strong> Der anfängliche Zufallsgraph wird einem Optimierungsprozess unterzogen, um ihn für die Suche effizienter zu machen. Dies umfasst zwei wichtige Schritte:</p>
<ul>
<li><p><strong>Ausschneiden überflüssiger Kanten:</strong> Der Algorithmus verwirft unnötige Verbindungen auf der Grundlage der Entfernungen zwischen den Knoten. Bei diesem Schritt werden Kanten höherer Qualität bevorzugt.</p>
<p>Der Parameter <code translate="no">max_degree</code> schränkt die maximale Anzahl der Kanten pro Knoten ein. Eine höhere <code translate="no">max_degree</code> führt zu einem dichteren Graphen, der potenziell mehr relevante Nachbarn findet (höherer Recall), aber auch den Speicherverbrauch und die Suchzeit erhöht.</p></li>
<li><p><strong>Hinzufügen strategischer Abkürzungen:</strong> Vamana führt weitreichende Kanten ein, die Datenpunkte verbinden, die im Vektorraum weit voneinander entfernt sind. Diese Abkürzungen ermöglichen es der Suche, schnell durch den Graphen zu springen, Zwischenknoten zu umgehen und die Navigation erheblich zu beschleunigen.</p>
<p>Der Parameter <code translate="no">search_list_size</code> bestimmt die Breite des Graphenverfeinerungsprozesses. Eine höhere <code translate="no">search_list_size</code> erweitert die Suche nach Nachbarn während der Konstruktion und kann die endgültige Genauigkeit verbessern, erhöht aber die Zeit für die Indexerstellung.</p></li>
</ul></li>
</ol>
<p>Weitere Informationen zur Parametereinstellung finden Sie unter <a href="/docs/de/diskann.md#diskann-params">DISKANN-Parameter</a>.</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>DISKANN verwendet <strong>PQ</strong>, um hochdimensionale Vektoren in kleinere Darstellungen<strong>(PQ-Codes</strong>) zu komprimieren, die im Speicher für schnelle Näherungsabstandsberechnungen gespeichert werden.</p>
<p>Der Parameter <code translate="no">pq_code_budget_gb_ratio</code> verwaltet den Speicherbedarf für die Speicherung dieser PQ-Codes. Er stellt ein Verhältnis zwischen der Gesamtgröße der Vektoren (in Gigabyte) und dem für die Speicherung der PQ-Codes zugewiesenen Platz dar. Sie können das tatsächliche PQ-Code-Budget (in Gigabyte) mit dieser Formel berechnen:</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>wobei:</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> die Gesamtgröße der Vektoren (in Gigabyte) ist.</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> ist ein benutzerdefiniertes Verhältnis, das den für PQ-Codes reservierten Anteil der Gesamtdatengröße angibt. Mit diesem Parameter kann ein Kompromiss zwischen Suchgenauigkeit und Speicherressourcen gefunden werden. Weitere Informationen zur Parametereinstellung finden Sie unter <a href="/docs/de/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN-Konfigurationen</a>.</p></li>
</ul>
<p>Technische Einzelheiten über die zugrunde liegende PQ-Methode finden Sie unter <a href="/docs/de/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQ</a>.</p>
<h3 id="Search-process" class="common-anchor-header">Suchprozess</h3><p>Sobald der Index (der Vamana-Graph auf der Festplatte und die PQ-Codes im Speicher) aufgebaut ist, führt DISKANN die ANN-Suche wie folgt durch:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
   </span> <span class="img-wrapper"> <span>Diskann 2</span> </span></p>
<ol>
<li><p><strong>Abfrage und Einstiegspunkt:</strong> Ein Abfragevektor wird bereitgestellt, um seine nächsten Nachbarn zu finden. DISKANN beginnt mit einem ausgewählten Einstiegspunkt im Vamana-Graphen, häufig ein Knoten in der Nähe des globalen Schwerpunkts des Datensatzes. Der globale Schwerpunkt stellt den Durchschnitt aller Vektoren dar, was dazu beiträgt, die Traversaldistanz durch den Graphen zu minimieren, um die gewünschten Nachbarn zu finden.</p></li>
<li><p><strong>Erkundung der Nachbarschaft:</strong> Der Algorithmus sammelt potenzielle Nachbarschaftskandidaten (rote Kreise in der Abbildung) an den Kanten des aktuellen Knotens und nutzt speicherinterne PQ-Codes, um die Abstände zwischen diesen Kandidaten und dem Abfragevektor zu approximieren. Diese potenziellen Nachbarschaftskandidaten sind die Knoten, die über Kanten im Vamana-Graphen direkt mit dem ausgewählten Einstiegspunkt verbunden sind.</p></li>
<li><p><strong>Auswahl von Knoten für eine genaue Abstandsberechnung:</strong> Aus den Näherungsergebnissen wird eine Teilmenge der vielversprechendsten Nachbarn (grüne Kreise in der Abbildung) für eine genaue Abstandsberechnung anhand ihrer ursprünglichen, nicht komprimierten Vektoren ausgewählt. Dazu müssen die Daten von der Festplatte gelesen werden, was sehr zeitaufwändig sein kann. DISKANN verwendet zwei Parameter, um dieses empfindliche Gleichgewicht zwischen Genauigkeit und Geschwindigkeit zu steuern:</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>: Ein Verhältnis, das die Breite der Suche steuert und bestimmt, wie viele Nachbarschaftskandidaten parallel ausgewählt werden, um ihre Nachbarn zu untersuchen. Ein größeres <code translate="no">beam_width_ratio</code> führt zu einer breiteren Suche, was zu einer höheren Genauigkeit führen kann, aber auch die Rechenkosten und die Festplatten-E/A erhöht. Die Breite des Suchstrahls, d. h. die Anzahl der ausgewählten Knoten, wird anhand der folgenden Formel bestimmt: <code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>: Der Anteil des Speichers, der für die Zwischenspeicherung häufig abgerufener Festplattendaten zugewiesen wird. Diese Zwischenspeicherung trägt dazu bei, die Festplatten-E/A zu minimieren, wodurch wiederholte Suchvorgänge schneller durchgeführt werden können, da sich die Daten bereits im Speicher befinden.</p></li>
</ul>
<p>Weitere Informationen zur Parametereinstellung finden Sie unter <a href="/docs/de/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN-Konfigurationen</a>.</p></li>
<li><p><strong>Iterative Erkundung:</strong> Die Suche verfeinert iterativ die Menge der Kandidaten, indem sie wiederholt ungefähre Auswertungen (unter Verwendung von PQ) durchführt, gefolgt von präzisen Prüfungen (unter Verwendung der Originalvektoren von der Festplatte), bis eine ausreichende Anzahl von Nachbarn gefunden wurde.</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">Aktivieren von DISKANN in Milvus<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Standardmäßig ist <strong>DISKANN</strong> in Milvus deaktiviert, um der Geschwindigkeit von In-Memory-Indizes für Datensätze, die bequem in den RAM passen, den Vorrang zu geben. Wenn Sie jedoch mit großen Datensätzen arbeiten oder die Skalierbarkeit von <strong>DISKANN</strong> und die SSD-Optimierung nutzen möchten, können Sie DISKANN problemlos aktivieren.</p>
<p>Hier erfahren Sie, wie Sie DISKANN in Milvus aktivieren können:</p>
<ol>
<li><p><strong>Aktualisieren Sie die Milvus-Konfigurationsdatei</strong></p>
<ol>
<li><p>Suchen Sie Ihre Milvus-Konfigurationsdatei<strong>.</strong> (Einzelheiten zum Auffinden dieser Datei finden Sie in der Milvus-Dokumentation zur Konfiguration).</p></li>
<li><p>Suchen Sie den Parameter <code translate="no">queryNode.enableDisk</code> und setzen Sie seinen Wert auf <code translate="no">true</code>:</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>Optimieren Sie den Speicher für DISKANN</strong></p></li>
</ol>
<p>Um die beste Leistung mit DISKANN zu gewährleisten, wird empfohlen, Ihre Milvus-Daten auf einer schnellen NVMe-SSD zu speichern. Im Folgenden wird beschrieben, wie Sie dies sowohl für Milvus Standalone als auch für Cluster-Einsätze tun können:</p>
<ul>
<li><p><strong>Milvus Standalone</strong></p>
<ul>
<li><p>Mounten Sie das Milvus-Datenverzeichnis auf eine NVMe-SSD innerhalb des Milvus-Containers. Sie können dies in der Datei <code translate="no">docker-compose.yml</code> oder mit anderen Container-Management-Tools tun.</p></li>
<li><p>Wenn Ihre NVMe-SSD beispielsweise unter <code translate="no">/mnt/nvme</code> eingehängt ist, aktualisieren Sie den Abschnitt <code translate="no">volumes</code>in der Datei <code translate="no">docker-compose.yml</code> wie folgt:</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Milvus-Cluster</strong></p>
<ul>
<li><p>Hängen Sie das Milvus-Datenverzeichnis sowohl im QueryNode- als auch im IndexNode-Container auf eine NVMe-SSD ein. Sie können dies über Ihre Container-Orchestrierung erreichen.</p></li>
<li><p>Durch das Mounten der Daten auf einer NVMe-SSD in beiden Knotentypen stellen Sie schnelle Lese- und Schreibgeschwindigkeiten für Such- und Indizierungsvorgänge sicher.</p></li>
</ul></li>
</ul>
<p>Sobald Sie diese Änderungen vorgenommen haben, starten Sie Ihre Milvus-Instanz neu, damit die Einstellungen wirksam werden. Jetzt nutzt Milvus die Fähigkeiten von DISKANN, um große Datensätze zu verarbeiten und eine effiziente und skalierbare Vektorsuche zu ermöglichen.</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">DISKANN konfigurieren<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>Die DISKANN-Parameter können mit zwei primären Methoden konfiguriert werden:</p>
<ul>
<li><p><strong>Milvus-Konfigurationsdatei:</strong> Passen Sie die DISKANN-Parameter über die Milvus-Konfigurationsdatei an. Diese Methode ist für die Einstellung allgemeiner Konfigurationsoptionen für Ihre Milvus-Instanz geeignet.</p></li>
<li><p><strong>Milvus SDK:</strong> Feinabstimmung der DISKANN-Parameter mit Hilfe des Milvus SDK während der Indexerstellung oder Suchvorgänge. Dies ermöglicht eine detailliertere Steuerung und dynamische Parameteranpassungen auf der Grundlage spezifischer Anwendungsfälle.</p></li>
</ul>
<div class="alert note">
<p>Die vom SDK vorgenommene Konfiguration setzt alle in der Konfigurationsdatei definierten Einstellungen außer Kraft und bietet somit Flexibilität und Kontrolle für spezifische Anwendungen und Datensätze.</p>
</div>
<h3 id="Milvus-configuration-file" class="common-anchor-header">Milvus-Konfigurationsdatei</h3><p>Hier ein Beispiel für die Einstellung der DISKANN-Parameter in der Datei <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># When enable this configuration, the index parameters defined following will be automatically populated as index parameters, without requiring user input.</span>
  <span class="hljs-attr">DISKANN:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SDK-configuration" class="common-anchor-header">SDK-Konfiguration</h3><p>Hier ein Beispiel für die Einstellung von DISKANN-Parametern mit Milvus SDK.</p>
<h4 id="Build" class="common-anchor-header">Erstellen von</h4><p>Um einen <code translate="no">IVF_FLAT</code> -Index für ein Vektorfeld in Milvus zu erstellen, verwenden Sie die Methode <code translate="no">add_index()</code> und geben Sie die Parameter <code translate="no">index_type</code>, <code translate="no">metric_type</code> und zusätzliche Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;DISKANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;max_degree&quot;</span>: <span class="hljs-number">56</span>, <span class="hljs-comment"># Maximum number of connections (edges) each data point can have</span>
        <span class="hljs-string">&quot;search_list_size&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;search_cache_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.10</span>, <span class="hljs-comment"># Amount of memory allocated for caching frequently accessed parts of the graph</span>
        <span class="hljs-string">&quot;pq_code_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Sobald die Index-Parameter konfiguriert sind, können Sie den Index erstellen, indem Sie die Methode <code translate="no">create_index()</code> direkt verwenden oder die Index-Parameter in der Methode <code translate="no">create_collection</code> übergeben. Einzelheiten finden Sie unter <a href="/docs/de/create-collection.md">Sammlung erstellen</a>.</p>
<h4 id="Search" class="common-anchor-header">Suche</h4><p>Sobald der Index erstellt und die Entitäten eingefügt sind, können Sie Ähnlichkeitssuchen im Index durchführen.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;beam_width_ratio&quot;</span>: <span class="hljs-number">4.0</span>, <span class="hljs-comment"># degree of parallelism during search by determining the maximum number of parallel disk I/O requests relative to the number of available CPU cores.</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="DISKANN-params" class="common-anchor-header">DISKANN-Parameter<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Feinabstimmung der DISKANN-Parameter ermöglicht es Ihnen, das Verhalten von DISKANN an Ihren spezifischen Datensatz und Ihre Suchlast anzupassen und das richtige Gleichgewicht zwischen Geschwindigkeit, Genauigkeit und Speichernutzung zu finden.</p>
<h3 id="Index-building-params" class="common-anchor-header">Indexaufbau-Parameter</h3><p>Diese Parameter beeinflussen, wie der DISKANN-Index aufgebaut wird. Die Anpassung dieser Parameter kann die Indexgröße, die Erstellungszeit und die Suchqualität beeinflussen.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Steuert die maximale Anzahl von Verbindungen (Kanten), die jeder Datenpunkt im Vamana-Diagramm haben kann.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, 512]</p>
<p><strong>Standardwert</strong>: <code translate="no">56</code></p></td>
     <td><p>Höhere Werte führen zu dichteren Graphen, was die Wiederauffindbarkeit erhöht (es werden mehr relevante Ergebnisse gefunden), aber auch den Speicherverbrauch und die Erstellungszeit erhöht. 
 In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs zu wählen: [10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>Bestimmt die Anzahl der Nachbarschaftskandidaten, die für jeden Datenpunkt bei der Erstellung des Diagramms berücksichtigt werden.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, <em>int_max</em>]</p>
<p><strong>Standardwert</strong>: <code translate="no">100</code></p></td>
     <td><p>Größere Werte führen zu umfangreicheren Graphen, was die Suchqualität verbessern kann, aber auch die Erstellungszeit erhöht. 
 In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs zu wählen: [K, 10K].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Steuert die Menge an Speicher, die für die Zwischenspeicherung häufig aufgerufener Teile des Graphen während des Indexaufbaus zugewiesen wird.</p></td>
     <td><p><strong>Typ</strong>: Float <strong>Bereich</strong>: [0.0, 0.3)</p>
<p><strong>Standardwert</strong>: <code translate="no">0.10</code></p></td>
     <td><p>Ein höherer Wert weist mehr Speicher für die Zwischenspeicherung zu, was die Festplatten-E/A erheblich reduziert, aber mehr Systemspeicher verbraucht. Ein niedrigerer Wert verwendet weniger Speicher für die Zwischenspeicherung und erhöht möglicherweise den Bedarf an Festplattenzugriffen. In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: [0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Steuert die Größe der PQ-Codes (komprimierte Darstellungen von Datenpunkten) im Vergleich zur Größe der unkomprimierten Daten.</p></td>
     <td><p><strong>Typ</strong>: Float <strong>Bereich</strong>: (0.0, 0.25]</p>
<p><strong>Standardwert</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Ein höheres Verhältnis führt zu genaueren Suchergebnissen, da ein größerer Anteil des Speichers für PQ-Codes reserviert wird und somit mehr Informationen über die ursprünglichen Vektoren gespeichert werden. Ein geringeres Verhältnis reduziert den Speicherbedarf, kann aber zu Lasten der Genauigkeit gehen, da kleinere PQ-Codes weniger Informationen speichern. Dieser Ansatz eignet sich für Szenarien, in denen Speicherbeschränkungen ein Problem darstellen, und ermöglicht möglicherweise die Indizierung größerer Datensätze.</p>
<p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: (0,0625, 0,25)</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Indexspezifische Suchparameter</h3><p>Diese Parameter beeinflussen, wie DISKANN die Suche durchführt. Ihre Einstellung kann sich auf die Suchgeschwindigkeit, die Latenzzeit und die Ressourcennutzung auswirken.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">beam_width_ratio</code></p></td>
     <td><p>Steuert den Grad der Parallelität während der Suche, indem die maximale Anzahl der parallelen Festplatten-E/A-Anforderungen im Verhältnis zur Anzahl der verfügbaren CPU-Kerne festgelegt wird.</p></td>
     <td><p><strong>Typ</strong>: Float <strong>Bereich</strong>: [1, max(128 / CPU-Anzahl, 16)]</p>
<p><strong>Standardwert</strong>: <code translate="no">4.0</code></p></td>
     <td><p>Höhere Werte erhöhen die Parallelität, was die Suche auf Systemen mit leistungsstarken CPUs und SSDs beschleunigen kann. Ein zu hoher Wert kann jedoch zu übermäßiger Ressourcenkonkurrenz führen. In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs zu wählen: [1.0, 4.0].</p></td>
   </tr>
</table>
