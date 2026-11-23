---
id: hnsw-pq.md
title: HNSW_PQ
summary: >-
  HNSW_PQ nutzt Hierarchical Navigable Small World (HNSW)-Graphen in Verbindung
  mit Product Quantization (PQ) und schafft so eine fortschrittliche
  Vektorindizierungsmethode, die einen steuerbaren Kompromiss zwischen Größe und
  Genauigkeit bietet. Im Vergleich zu HNSW_SQ liefert dieser Indextyp bei
  gleichem Komprimierungsgrad eine höhere Recall-Rate, allerdings bei geringerer
  Abfragegeschwindigkeit und längerer Indexerstellungszeit.
---
<h1 id="HNSWPQ" class="common-anchor-header">HNSW_PQ<button data-href="#HNSWPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PQ</strong> nutzt Hierarchical Navigable Small World (HNSW)-Graphen in Kombination mit Produktquantisierung (PQ) und schafft so eine fortschrittliche Vektorindizierungsmethode, die einen steuerbaren Kompromiss zwischen Größe und Genauigkeit bietet. Im Vergleich zu <a href="/docs/de/hnsw-sq.md">HNSW_SQ</a> liefert dieser Indextyp bei gleichem Komprimierungsgrad eine höhere Recall-Rate, allerdings bei geringerer Abfragegeschwindigkeit und längerer Indexerstellungszeit.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>HNSW_PQ kombiniert zwei Indizierungstechniken: <strong>HNSW</strong> für schnelle graphbasierte Navigation und <strong>PQ</strong> für effiziente Vektorkomprimierung.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW erstellt einen mehrschichtigen Graphen, in dem jeder Knoten einem Vektor im Datensatz entspricht. In diesem Graphen sind die Knoten entsprechend ihrer Ähnlichkeit miteinander verbunden, was eine schnelle Durchquerung des Datenraums ermöglicht. Die hierarchische Struktur ermöglicht es dem Suchalgorithmus, die Anzahl der in Frage kommenden Nachbarn einzugrenzen, wodurch der Suchprozess in hochdimensionalen Räumen erheblich beschleunigt wird.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/hnsw.md">HNSW</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ<button data-href="#PQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PQ ist eine Vektorkomprimierungstechnik, die hochdimensionale Vektoren in kleinere Teilvektoren zerlegt, die anschließend quantisiert und komprimiert werden. Die Komprimierung reduziert den Speicherbedarf drastisch und beschleunigt die Berechnung von Abständen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/ivf-pq.md#PQ">IVF_PQ</a>.</p>
<h3 id="HNSW-+-PQ" class="common-anchor-header">HNSW + PQ<button data-href="#HNSW-+-PQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_PQ kombiniert die Stärken von HNSW und PQ, um eine effiziente ungefähre Suche nach dem nächsten Nachbarn zu ermöglichen. Es nutzt PQ zur Komprimierung der Daten (wodurch der Speicherbedarf reduziert wird) und erstellt anschließend auf Basis dieser komprimierten Vektoren einen HNSW-Graphen, um eine schnelle Ermittlung von Kandidaten zu ermöglichen. Während der Suche kann der Algorithmus die Kandidaten-Ergebnisse optional anhand von Daten mit höherer Präzision verfeinern, um die Genauigkeit zu verbessern. So funktioniert der Prozess:</p>
<ol>
<li><p><strong>Datenkomprimierung</strong>: PQ teilt jeden Vektor in mehrere Teilvektoren auf und quantisiert diese mithilfe eines Codebuchs aus Zentren, das durch Parameter wie „ <code translate="no">m</code> “ (Anzahl der Teilvektoren) und „ <code translate="no">nbits</code> “ (Bits pro Teilvektor) gesteuert wird.</p></li>
<li><p><strong>Graphenerstellung</strong>: Die komprimierten Vektoren werden anschließend zur Erstellung eines HNSW-Graphs verwendet. Da die Vektoren in komprimierter Form gespeichert sind, ist der resultierende Graph in der Regel kleiner, benötigt weniger Speicherplatz und lässt sich schneller durchlaufen – was den Schritt der Kandidatenauswahl erheblich beschleunigt.</p></li>
<li><p><strong>Kandidatenabruf</strong>: Bei der Ausführung einer Abfrage nutzt der Algorithmus die komprimierten Daten im HNSW-Graphen, um effizient eine Gruppe von Nachbar-Kandidaten zu identifizieren. Diese graphbasierte Suche reduziert die Anzahl der zu berücksichtigenden Vektoren drastisch und verbessert so die Abfragelatenz im Vergleich zu Brute-Force-Suchen.</p></li>
<li><p><strong>(Optional) Ergebnisverfeinerung</strong>: Die anfänglichen Kandidatenergebnisse können auf der Grundlage der folgenden Parameter verfeinert werden, um eine höhere Genauigkeit zu erzielen:</p>
<ul>
<li><p><code translate="no">refine</code>: Legt fest, ob dieser Verfeinerungsschritt aktiviert ist. Bei der Einstellung „ <code translate="no">true</code> “ berechnet das System die Abstände neu, wobei Darstellungen mit höherer Präzision oder unkomprimierte Darstellungen verwendet werden.</p></li>
<li><p><code translate="no">refine_type</code>: Legt die Präzisionsstufe der bei der Verfeinerung verwendeten Daten fest (z. B. SQ6, SQ8, BF16). Eine Wahl mit höherer Präzision wie „ <code translate="no">FP32</code> “ kann genauere Ergebnisse liefern, erfordert jedoch mehr Speicherplatz. Diese muss die Präzision des ursprünglichen komprimierten Datensatzes um „ <code translate="no">sq_type</code> “ übertreffen.</p></li>
<li><p><code translate="no">refine_k</code>: Dient als Vergrößerungsfaktor. Wenn beispielsweise Ihr „top <em>k“</em> 100 und „ <code translate="no">refine_k</code> “ 2 beträgt, führt das System eine Neureihung der 200 besten Kandidaten durch und gibt die besten 100 zurück, wodurch die Gesamtgenauigkeit verbessert wird.</p></li>
</ul></li>
</ol>
<p>Eine vollständige Liste der Parameter und gültigen Werte finden Sie unter <a href="/docs/de/hnsw-sq.md#Index-params">„Index-Parameter</a>“.</p>
<h2 id="Build-index" class="common-anchor-header">Index erstellen<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Um in Milvus einen „ <code translate="no">HNSW_PQ</code> “-Index für ein Vektorfeld zu erstellen, verwenden Sie die Methode „ <code translate="no">add_index()</code> “ und geben Sie dabei „ <code translate="no">index_type</code> “, „ <code translate="no">metric_type</code> “ sowie weitere Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. Setzen Sie den Wert in diesem Beispiel auf „ <code translate="no">HNSW_PQ</code> “.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Zu den unterstützten Werten gehören „ <code translate="no">COSINE</code> “, „ <code translate="no">L2</code> “ und „ <code translate="no">IP</code> “. Weitere Informationen finden Sie unter <a href="/docs/de/metric.md">„Metriktypen</a>“.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Indexerstellung. Weitere Informationen finden Sie unter <a href="/docs/de/hnsw-pq.md#Index-building-params">„Parameter für die Indexerstellung</a>“.</p></li>
</ul>
<p>Sobald die Indexparameter konfiguriert sind, können Sie den Index erstellen, indem Sie die Methode „ <code translate="no">create_index()</code> “ direkt aufrufen oder die Indexparameter an die Methode „ <code translate="no">create_collection</code> “ übergeben. Weitere Informationen finden Sie unter <a href="/docs/de/create-collection.md">„Sammlung erstellen</a>“.</p>
<h2 id="Search-on-index" class="common-anchor-header">Suche im Index<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald der Index erstellt und Entitäten eingefügt wurden, können Sie Ähnlichkeitssuchen im Index durchführen.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
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
<p>In dieser Konfiguration:</p>
<ul>
<li><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Suche im Index. Weitere Informationen finden Sie unter <a href="/docs/de/hnsw-pq.md#Index-specific-search-params">„Indexspezifische Suchparameter</a>“.</li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Indexparameter<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Abschnitt bietet einen Überblick über die Parameter, die zum Erstellen eines Indexes und zum Durchführen von Suchvorgängen im Index verwendet werden.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter zum Erstellen des Index<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgende Tabelle listet die Parameter auf, die in „ <code translate="no">params</code> “ beim <a href="/docs/de/hnsw-pq.md#Build-index">Erstellen eines Indexes</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Empfehlung zur Optimierung</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Maximale Anzahl von Verbindungen (oder Kanten), die jeder Knoten im Graphen haben kann, einschließlich ausgehender und eingehender Kanten.
Dieser Parameter wirkt sich direkt sowohl auf die Indexerstellung als auch auf die Suche aus.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl
 <strong>Bereich</strong>: [2, 2048]</p>
<p><strong>Standardwert</strong>: <code translate="no">30</code> (bis zu 30 ausgehende und 30 eingehende Kanten pro Knoten)</p></td>
     <td><p>Ein größerer Wert für „ <code translate="no">M</code> “ führt im Allgemeinen zu <strong>einer höheren Genauigkeit</strong>, <strong>erhöht</strong> jedoch <strong>den Speicherbedarf</strong> und <strong>verlangsamt sowohl die Indexerstellung als auch die Suche</strong>.
Erwägen Sie eine Erhöhung von „ <code translate="no">M</code> “ für Datensätze mit hoher Dimensionalität oder wenn eine hohe Wiederauffindbarkeit entscheidend ist.</p>
<p>Erwägen Sie eine Verringerung von ` <code translate="no">M</code> `, wenn Speicherverbrauch und Suchgeschwindigkeit im Vordergrund stehen.</p>
<p>In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Anzahl der potenziellen Nachbarn, die bei der Indexerstellung für eine Verbindung in Betracht gezogen werden.
Für jedes neue Element wird ein größerer Pool an Kandidaten ausgewertet, doch die maximale Anzahl der tatsächlich hergestellten Verbindungen wird weiterhin durch ` <code translate="no">M</code>` begrenzt.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl
 <strong>Bereich</strong>: [1, <em>int_max</em>]</p>
<p><strong>Standardwert</strong>: <code translate="no">360</code></p></td>
     <td><p>Ein höherer Wert für „ <code translate="no">efConstruction</code> “ führt in der Regel zu einem <strong>genaueren Index</strong>, da mehr potenzielle Verbindungen untersucht werden. Dies führt jedoch auch zu <strong>einer längeren Indizierungszeit und einem erhöhten Speicherbedarf</strong> während der Erstellung.
Erwägen Sie eine Erhöhung von „ <code translate="no">efConstruction</code> “, um die Genauigkeit zu verbessern, insbesondere in Szenarien, in denen die Indizierungszeit weniger kritisch ist.</p>
<p>Erwägen Sie eine Verringerung von ` <code translate="no">efConstruction</code> `, um die Indexerstellung zu beschleunigen, wenn Ressourcenbeschränkungen eine Rolle spielen.</p>
<p>In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Die Anzahl der Teilvektoren (die für die Quantisierung verwendet werden), in die jeder hochdimensionale Vektor während des Quantisierungsvorgangs unterteilt wird.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl
 <strong>Bereich</strong>: [1, 65536]</p>
<p><strong>Standardwert</strong>: Keine</p></td>
     <td><p>Ein höherer Wert für „ <code translate="no">m</code> “ kann die Genauigkeit verbessern, erhöht jedoch auch die Rechenkomplexität und den Speicherbedarf.
  „ <code translate="no">m</code> “ muss ein Teiler der Vektordimension (<em>D</em>) sein, um eine korrekte Zerlegung zu gewährleisten. Ein häufig empfohlener Wert ist <em>m = D/2</em>.</p>
<p>In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Die Anzahl der Bits, die zur Darstellung des Zentroid-Indexes jedes Teilvektors in komprimierter Form verwendet werden. Sie bestimmt direkt die Größe jedes Codebuchs.
 Jedes Codebuch enthält<sup>2n Bits an</sup> Zentroid-Indizes. Wenn beispielsweise „ <code translate="no">nbits</code> “ auf 8 gesetzt ist, wird jeder Teilvektor durch einen 8-Bit-Zentroid-Index dargestellt. Dies ermöglicht<sup>2⁸</sup> (256) mögliche Zentroide im Codebuch für diesen Teilvektor.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl
 <strong>Bereich</strong>: [1, 24]</p>
<p><strong>Standardwert</strong>: <code translate="no">8</code></p></td>
     <td><p>Ein höherer Wert für „ <code translate="no">nbits</code> “ ermöglicht größere Codebücher, was potenziell zu einer genaueren Darstellung der ursprünglichen Vektoren führt. Dies bedeutet jedoch auch, dass mehr Bits zum Speichern jedes Indexes verwendet werden, was zu einer geringeren Komprimierung führt.
 In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Ein boolesches Flag, das steuert, ob während der Suche ein Verfeinerungsschritt angewendet wird. Bei der Verfeinerung werden die anfänglichen Ergebnisse neu geordnet, indem die exakten Abstände zwischen dem Suchvektor und den Kandidaten berechnet werden.</p></td>
     <td><p><strong>Typ</strong>: Boolesch
 <strong>Bereich</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Standardwert</strong>: <code translate="no">false</code></p></td>
     <td><p>Setzen Sie den Wert auf „ <code translate="no">true</code> “, wenn hohe Genauigkeit unerlässlich ist und Sie etwas längere Suchzeiten in Kauf nehmen können. Verwenden Sie „ <code translate="no">false</code> “, wenn Geschwindigkeit Priorität hat und ein geringfügiger Kompromiss bei der Genauigkeit akzeptabel ist.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Legt die Genauigkeit der Daten fest, die während des Verfeinerungsprozesses verwendet werden.
 Diese Genauigkeit muss höher sein als die der komprimierten Vektoren (wie durch die Parameter „ <code translate="no">m</code> “ und „ <code translate="no">nbits</code> “ festgelegt).</p></td>
     <td><p><strong>Typ</strong>: Zeichenkette
 <strong>Bereich</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Standardwert</strong>: Keiner</p></td>
     <td><p>Verwenden Sie <code translate="no">FP32</code> für maximale Genauigkeit bei höherem Speicherbedarf oder <code translate="no">SQ6</code>/<code translate="no">SQ8</code> für eine bessere Komprimierung. <code translate="no">BF16</code> und <code translate="no">FP16</code> bieten eine ausgewogene Alternative.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Indexspezifische Suchparameter<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgende Tabelle listet die Parameter auf, die in „ <code translate="no">search_params.params</code> “ bei <a href="/docs/de/hnsw-pq.md#Search-on-index">der Suche im Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Optimierungsvorschlag</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Steuert die Suchbreite bei der Suche nach dem nächsten Nachbarn. Er bestimmt, wie viele Knoten besucht und als potenzielle nächste Nachbarn bewertet werden. 
 Dieser Parameter wirkt sich nur auf den Suchvorgang aus und gilt ausschließlich für die unterste Ebene des Graphen.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl
 <strong>Bereich</strong>: [1, <em>int_max</em>]</p>
<p><strong>Standardwert</strong>: <em>limit</em> (anzuzeigende TopK-Nächste-Nachbarn)</p></td>
     <td><p>Ein größerer „ <code translate="no">ef</code> “-Wert führt im Allgemeinen zu <strong>einer höheren Suchgenauigkeit</strong>, da mehr potenzielle Nachbarn berücksichtigt werden. Dies <strong>verlängert</strong> jedoch auch <strong>die Suchzeit</strong>.
Erwägen Sie eine Erhöhung von „ <code translate="no">ef</code> “, wenn es entscheidend ist, einen hohen Recall zu erzielen, und die Suchgeschwindigkeit weniger wichtig ist.</p>
<p>Erwägen Sie eine Verringerung von „ <code translate="no">ef</code> “, um einer schnelleren Suche Vorrang zu geben, insbesondere in Szenarien, in denen eine leichte Verringerung der Genauigkeit akzeptabel ist.</p>
<p>In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Der Vergrößerungsfaktor, der steuert, wie viele zusätzliche Kandidaten während der Verfeinerungsphase (Reranking) im Verhältnis zu den angeforderten Top-K-Ergebnissen geprüft werden.</p></td>
     <td><p><strong>Typ</strong>: Float
 <strong>Bereich</strong>: [1, <em>float_max</em>)</p>
<p><strong>Standardwert</strong>: 1</p></td>
     <td><p>Höhere Werte für „ <code translate="no">refine_k</code> “ können den Recall und die Genauigkeit verbessern, erhöhen jedoch auch die Suchzeit und den Ressourcenverbrauch. Ein Wert von 1 bedeutet, dass der Verfeinerungsprozess nur die ursprünglichen Top-K-Ergebnisse berücksichtigt.</p></td>
   </tr>
</table>
