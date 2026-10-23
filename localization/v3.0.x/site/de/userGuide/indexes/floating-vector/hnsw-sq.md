---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ kombiniert Hierarchical Navigable Small World (HNSW)-Graphen mit
  skalarer Quantisierung (SQ) und schafft so eine fortschrittliche Methode zur
  Vektorindizierung, die einen steuerbaren Kompromiss zwischen Größe und
  Genauigkeit bietet. Im Vergleich zu Standard-HNSW gewährleistet dieser
  Indextyp eine hohe Abfragegeschwindigkeit, während die Indexerstellungszeit
  nur geringfügig zunimmt.
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_SQ</strong> kombiniert Hierarchical Navigable Small World (HNSW)-Graphen mit Skalarquantisierung (SQ) und schafft so eine fortschrittliche Vektorindizierungsmethode, die einen steuerbaren Kompromiss zwischen Größe und Genauigkeit bietet. Im Vergleich zu Standard <a href="/docs/de/hnsw.md">-HNSW</a> gewährleistet dieser Indextyp eine hohe Abfragegeschwindigkeit, während die Indexerstellungszeit geringfügig zunimmt.</p>
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
    </button></h2><p>HNSW_SQ kombiniert zwei Indizierungstechniken: <strong>HNSW</strong> für schnelle graphbasierte Navigation und <strong>SQ</strong> für effiziente Vektorkomprimierung.</p>
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
    </button></h3><p>HNSW erstellt einen mehrschichtigen Graphen, in dem jeder Knoten einem Vektor im Datensatz entspricht. In diesem Graphen sind die Knoten anhand ihrer Ähnlichkeit miteinander verbunden, was eine schnelle Durchquerung des Datenraums ermöglicht. Die hierarchische Struktur ermöglicht es dem Suchalgorithmus, die Anzahl der in Frage kommenden Nachbarn einzugrenzen, was den Suchprozess in hochdimensionalen Räumen erheblich beschleunigt.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQ ist eine Methode zur Komprimierung von Vektoren, bei der diese mit weniger Bits dargestellt werden. Beispiel:</p>
<ul>
<li><p><strong>SQ8</strong> verwendet 8 Bit und ordnet Werte 256 Stufen zu.  Weitere Informationen finden Sie unter <a href="/docs/de/ivf-sq8.md#SQ8">IVF_SQ8</a>.</p></li>
<li><p><strong>SQ6</strong> verwendet 6 Bits zur Darstellung jedes Gleitkommawerts, was zu 64 diskreten Stufen führt.</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" /> 
   <span>Hnsw Sq</span>
  
 </span></p>
<p>Diese Verringerung der Genauigkeit reduziert den Speicherbedarf erheblich und beschleunigt die Berechnung, während die wesentliche Struktur der Daten erhalten bleibt.</p>
<h3 id="SQ4U" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U" class="anchor-icon" translate="no">
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
    </button></h3><p>Für Szenarien, die extreme Abfragegeschwindigkeit und minimalen Speicherbedarf erfordern, führt Milvus „ <code translate="no">SQ4U</code> “ ein, eine 4-Bit-Uniform-Skalarkwantisierung. Dabei handelt es sich um eine aggressive Form der Skalarkwantisierung, die den Gleitkommawert jeder Dimension in eine <strong>4-Bit-Ganzzahl</strong> ohne Vorzeichen komprimiert.</p>
<p>Das „U“ in SQ4U steht für „Uniform“ (gleichmäßig). Im Gegensatz zur nicht-gleichmäßigen Skalarquantisierung, bei der Minimal- und Maximalwerte typischerweise für jede Dimension unabhängig voneinander berechnet werden (dimensionale Quantisierung), wendet SQ4U eine <strong>globale gleichmäßige Quantisierungsstrategie</strong> an:</p>
<ol>
<li><p><strong>Globale Statistik</strong>: Das System berechnet einen <strong>einzigen</strong> Minimalwert <code translate="no">vmin</code> und einen <strong>einzigen</strong> Wertebereich <code translate="no">vdiff</code>, der für <strong>alle Dimensionen</strong> des Vektors (oder des gesamten Vektorsegments) gilt.</p></li>
<li><p><strong>Einheitliche Zuordnung</strong>: Der globale Wertebereich wird in 16 gleiche Intervalle unterteilt. Jeder Gleitkommawert im Vektor wird – unabhängig davon, zu welcher Dimension er gehört – mithilfe dieser gemeinsamen Parameter auf eine 4-Bit-Ganzzahl (0–15) abgebildet.</p></li>
</ol>
<p><strong>Leistungsvorteile:</strong></p>
<ul>
<li><p><strong>8-fache Kompressionsrate:</strong> Reduziert die Größe um das 8-Fache im Vergleich zu „ <code translate="no">FP32</code> “ und um das 2-Fache im Vergleich zu „ <code translate="no">SQ8</code> “, wodurch der Druck auf die Speicherbandbreite – oft der Engpass bei der Vektorsuche – deutlich verringert wird.</p></li>
<li><p><strong>SIMD-Optimierung:</strong> Die kompakte Struktur ermöglicht es modernen CPUs (AVX2/AVX-512), mehr Dimensionen pro Takt zu verarbeiten. Entscheidend ist, dass durch die Verwendung globaler Parameter das Laden variierender Skalierungs- und Offset-Werte während der Abstandsberechnung entfällt, wodurch die Befehlspipeline vollständig ausgelastet bleibt.</p></li>
<li><p><strong>Cache-Effizienz:</strong> Kleinere Vektorgrößen bedeuten, dass mehr Daten in den CPU-Cache passen, wodurch die durch Speicherzugriffe verursachte Latenz reduziert wird.</p></li>
</ul>
<div class="alert note">
<p>Aufgrund der gemeinsamen Nutzung globaler Parameter erzielt SQ4U die beste Leistung bei normalisierten Daten oder Datensätzen mit konsistenten Werteverteilungen über alle Dimensionen hinweg.</p>
</div>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_SQ kombiniert die Stärken von HNSW und SQ, um eine effiziente annähernde Suche nach dem nächsten Nachbarn zu ermöglichen. So funktioniert der Prozess:</p>
<ol>
<li><p><strong>Datenkomprimierung:</strong> SQ komprimiert die Vektoren mithilfe der „ <code translate="no">sq_type</code> “ (z. B. SQ6 oder SQ8), wodurch der Speicherbedarf reduziert wird. Diese Komprimierung kann zwar die Genauigkeit verringern, ermöglicht es dem System jedoch, größere Datensätze zu verarbeiten.</p></li>
<li><p><strong>Graphenerstellung:</strong> Die komprimierten Vektoren werden zum Aufbau eines HNSW-Graphs verwendet. Da die Daten komprimiert sind, ist der resultierende Graph kleiner und lässt sich schneller durchsuchen.</p></li>
<li><p><strong>Abruf von Kandidaten:</strong> Wenn ein Abfragevektor bereitgestellt wird, nutzt der Algorithmus die komprimierten Daten, um schnell eine Gruppe potenzieller Nachbarn aus dem HNSW-Graphen zu identifizieren.</p></li>
<li><p><strong>(Optional) Ergebnisverfeinerung:</strong> Die anfänglichen Kandidatenergebnisse können zur Verbesserung der Genauigkeit anhand der folgenden Parameter verfeinert werden:</p>
<ul>
<li><p><code translate="no">refine</code>: Legt fest, ob dieser Verfeinerungsschritt aktiviert ist. Bei der Einstellung „ <code translate="no">true</code> “ berechnet das System die Abstände neu, wobei Darstellungen mit höherer Präzision oder unkomprimierte Darstellungen verwendet werden.</p></li>
<li><p><code translate="no">refine_type</code>: Legt die Präzisionsstufe der bei der Verfeinerung verwendeten Daten fest (z. B. SQ6, SQ8, BF16). Eine Wahl mit höherer Präzision wie „ <code translate="no">FP32</code> “ kann genauere Ergebnisse liefern, erfordert jedoch mehr Speicherplatz. Diese muss die Präzision des ursprünglichen komprimierten Datensatzes, die durch „ <code translate="no">sq_type</code> “ festgelegt ist, übersteigen.</p></li>
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
    </button></h2><p>Um in Milvus einen „ <code translate="no">HNSW_SQ</code> “-Index für ein Vektorfeld zu erstellen, verwenden Sie die Methode „ <code translate="no">add_index()</code> “ und geben Sie dabei „ <code translate="no">index_type</code> “, „ <code translate="no">metric_type</code> “ sowie weitere Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. Setzen Sie den Wert in diesem Beispiel auf „ <code translate="no">HNSW_SQ</code> “.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Zu den unterstützten Werten gehören „ <code translate="no">COSINE</code> “, „ <code translate="no">L2</code> “ und „ <code translate="no">IP</code> “. Weitere Informationen finden Sie unter <a href="/docs/de/metric.md">„Metriktypen</a>“.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Erstellung des Index. Weitere Informationen finden Sie unter <a href="/docs/de/hnsw-sq.md#Index-building-params">„Parameter für die Indexerstellung</a>“.</p></li>
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
<li><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Suche im Index. Weitere Informationen finden Sie unter <a href="/docs/de/hnsw-sq.md#Index-specific-search-params">„Indexspezifische Suchparameter</a>“.</li>
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
    </button></h3><p>Die folgende Tabelle listet die Parameter auf, die bei <a href="/docs/de/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">der Erstellung eines Indexes</a> in „ <code translate="no">params</code> “ konfiguriert werden können.</p>
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
     <td><p>Maximale Anzahl von Verbindungen (oder Kanten), die jeder Knoten im Graphen haben kann, einschließlich ausgehender und eingehender Kanten.</p><p>Dieser Parameter wirkt sich direkt sowohl auf die Indexerstellung als auch auf die Suche aus.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl</p><p><strong>Bereich</strong>: [2, 2048]</p><p><strong>Standardwert</strong>: <code translate="no">30</code> (bis zu 30 ausgehende und 30 eingehende Kanten pro Knoten)</p></td>
     <td><p>Ein größerer Wert für „ <code translate="no">M</code> “ führt im Allgemeinen zu <strong>einer höheren Genauigkeit</strong>, <strong>erhöht</strong> jedoch <strong>den Speicherbedarf</strong> und <strong>verlangsamt sowohl die Indexerstellung als auch die Suche</strong>.</p><p>Erhöhen Sie den Wert von „ <code translate="no">M</code> “ bei Datensätzen mit hoher Dimensionalität oder wenn ein hoher Recall entscheidend ist.</p><p>Erwägen Sie eine Verringerung von „ <code translate="no">M</code> “, wenn Speicherverbrauch und Suchgeschwindigkeit im Vordergrund stehen.</p><p>In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Anzahl der potenziellen Nachbarn, die bei der Indexerstellung für eine Verbindung in Betracht gezogen werden.</p><p>Für jedes neue Element wird ein größerer Pool an Kandidaten ausgewertet, doch die maximale Anzahl der tatsächlich hergestellten Verbindungen wird weiterhin durch ` <code translate="no">M</code>` begrenzt.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl</p><p><strong>Bereich</strong>: [1, <em>int_max</em>]</p><p><strong>Standardwert</strong>: <code translate="no">360</code></p></td>
     <td><p>Ein höherer Wert für „ <code translate="no">efConstruction</code> “ führt in der Regel zu einem <strong>genaueren Index</strong>, da mehr potenzielle Verbindungen untersucht werden. Dies führt jedoch auch zu <strong>einer längeren Indizierungszeit und einem erhöhten Speicherbedarf</strong> während der Erstellung.</p><p>Erwägen Sie eine Erhöhung von ` <code translate="no">efConstruction</code> `, um die Genauigkeit zu verbessern, insbesondere in Szenarien, in denen die Indizierungszeit weniger kritisch ist.</p><p>Erwägen Sie eine Verringerung von „ <code translate="no">efConstruction</code> “, um die Indexerstellung zu beschleunigen, wenn Ressourcenbeschränkungen eine Rolle spielen.</p><p>In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>Legt die skalare Quantisierungsmethode für die Komprimierung von Vektoren fest. Jede Option bietet ein anderes Gleichgewicht zwischen Komprimierung und Genauigkeit:</p><ul><li><p><code translate="no">SQ4U</code>: Kodiert Vektoren mithilfe einer einheitlichen 4-Bit-Quantisierung. Dieser Modus bietet die höchste Geschwindigkeit und Komprimierung.</p></li><li><p><code translate="no">SQ6</code>: Kodiert Vektoren mit 6-Bit-Ganzzahlen.</p></li><li><p><code translate="no">SQ8</code>: Kodiert Vektoren mit 8-Bit-Ganzzahlen.</p></li><li><p><code translate="no">BF16</code>: Verwendet das Bfloat16-Format.</p></li><li><p><code translate="no">FP16</code>: Verwendet das standardmäßige 16-Bit-Gleitkommaformat.</p></li></ul></td>
     <td><p><strong>Typ</strong>: Zeichenfolge</p><p><strong>Bereich</strong>: [ <code translate="no">SQ4U</code>, <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p><p><strong>Standardwert</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>Die Wahl von <code translate="no">sq_type</code> hängt von den spezifischen Anforderungen der Anwendung ab. <code translate="no">SQ4U</code> wird für maximale Geschwindigkeit und Speichereffizienz gewählt. <code translate="no">SQ6</code> oder <code translate="no">SQ8</code> könnten für eine ausgewogene Leistung geeignet sein. Ist hingegen Genauigkeit von größter Bedeutung, könnten <code translate="no">BF16</code> oder <code translate="no">FP16</code> vorzuziehen sein.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Ein boolesches Flag, das steuert, ob während der Suche ein Verfeinerungsschritt angewendet wird. Bei der Verfeinerung werden die ursprünglichen Ergebnisse neu geordnet, indem die exakten Abstände zwischen dem Abfragevektor und den Kandidaten berechnet werden.</p></td>
     <td><p><strong>Typ</strong>: Boolesch</p><p><strong>Bereich</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p><p><strong>Standardwert</strong>: <code translate="no">false</code></p></td>
     <td><p>Setzen Sie den Wert auf „ <code translate="no">true</code> “, wenn hohe Genauigkeit unerlässlich ist und Sie etwas längere Suchzeiten in Kauf nehmen können. Verwenden Sie „ <code translate="no">false</code> “, wenn Geschwindigkeit Priorität hat und ein geringfügiger Kompromiss bei der Genauigkeit akzeptabel ist.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Legt die Genauigkeit der für die Verfeinerung verwendeten Daten fest.</p><p>Diese Genauigkeit muss höher sein als die der komprimierten Vektoren (wie durch ` <code translate="no">sq_type</code>` festgelegt) und wirkt sich sowohl auf die Genauigkeit der neu sortierten Vektoren als auch auf deren Speicherbedarf aus.</p></td>
     <td><p><strong>Typ</strong>: Zeichenfolge</p><p><strong>Bereich</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p><p><strong>Standardwert</strong>: Keine</p></td>
     <td><p>Verwenden Sie „ <code translate="no">FP32</code> “ für maximale Genauigkeit bei höherem Speicherbedarf oder „ <code translate="no">SQ6</code> “ bzw. „<code translate="no">SQ8</code> “ für eine bessere Komprimierung. „ <code translate="no">BF16</code> “ und „ <code translate="no">FP16</code> “ bieten eine ausgewogene Alternative.</p></td>
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
    </button></h3><p>Die folgende Tabelle listet die Parameter auf, die bei <a href="/docs/de/hnsw-sq.md#Search-on-index">der Suche im Index</a> unter „ <code translate="no">search_params.params</code> “ konfiguriert werden können. Die Servereinstellungen können die Standardwerte für Parameter überschreiben, die Sie weglassen.</p>
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
     <td><p>Steuert die Suchbreite bei der Suche nach dem nächsten Nachbarn. Er bestimmt, wie viele Knoten besucht und als potenzielle nächste Nachbarn bewertet werden. </p><p>Dieser Parameter wirkt sich nur auf den Suchvorgang aus und gilt ausschließlich für die unterste Ebene des Graphen.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl</p><p><strong>Bereich</strong>: [1, <em>int_max</em>]</p><p><strong>Standardwert</strong>: <code translate="no">max(limit, 16)</code> für die gewöhnliche kNN-Suche; <code translate="no">512</code> für die Bereichssuche.</p><p>Bei der gewöhnlichen kNN-Suche muss ein expliziter Wert für „ <code translate="no">ef</code> “ größer oder gleich „ <code translate="no">limit</code> “ sein (die Anzahl der zurückzugebenden nächsten Nachbarn).</p></td>
     <td><p>Ein größerer Wert für „ <code translate="no">ef</code> “ führt im Allgemeinen zu <strong>einer höheren Suchgenauigkeit</strong>, da mehr potenzielle Nachbarn berücksichtigt werden. Dies <strong>verlängert</strong> jedoch auch <strong>die Suchzeit</strong>.</p><p>Erwägen Sie eine Erhöhung von ` <code translate="no">ef</code> `, wenn das Erreichen eines hohen Recall-Werts entscheidend ist und die Suchgeschwindigkeit weniger wichtig ist.</p><p>Erwägen Sie eine Verringerung von „ <code translate="no">ef</code> “, um schnellere Suchvorgänge zu priorisieren, insbesondere in Szenarien, in denen eine leichte Verringerung der Genauigkeit akzeptabel ist.</p><p>In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Der Vergrößerungsfaktor, der steuert, wie viele zusätzliche Kandidaten während der Verfeinerungsphase im Verhältnis zu den angeforderten Top-K-Ergebnissen geprüft werden.</p></td>
     <td><p><strong>Typ</strong>: Float</p><p><strong>Bereich</strong>: [1, <em>float_max</em>)</p><p><strong>Standardwert</strong>: 1</p></td>
     <td><p>Höhere Werte für „ <code translate="no">refine_k</code> “ können den Recall und die Genauigkeit verbessern, erhöhen jedoch auch die Suchzeit und den Ressourcenverbrauch. Ein Wert von 1 bedeutet, dass der Verfeinerungsprozess nur die ursprünglichen Top-K-Ergebnisse berücksichtigt.</p></td>
   </tr>
</table>
