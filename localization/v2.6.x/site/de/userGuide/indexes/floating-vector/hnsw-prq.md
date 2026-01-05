---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  HNSW_PRQ nutzt Hierarchical Navigable Small World (HNSW)-Graphen mit Product
  Residual Quantization (PRQ) und bietet eine fortschrittliche
  Vektorindizierungsmethode, mit der Sie den Kompromiss zwischen Indexgröße und
  Genauigkeit fein abstimmen können. PRQ geht über die traditionelle
  Produktquantisierung (PQ) hinaus, indem es einen Schritt der Restquantisierung
  (RQ) einführt, um zusätzliche Informationen zu erfassen, was im Vergleich zu
  rein PQ-basierten Methoden zu einer höheren Genauigkeit oder kompakteren
  Indizes führt. Die zusätzlichen Schritte können jedoch zu einem höheren
  Rechenaufwand bei der Indexerstellung und -suche führen.
---
<h1 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PRQ</strong> nutzt Hierarchical Navigable Small World (HNSW)-Graphen mit Product Residual Quantization (PRQ) und bietet eine fortschrittliche Vektorindizierungsmethode, mit der Sie den Kompromiss zwischen Indexgröße und Genauigkeit fein abstimmen können. PRQ geht über die traditionelle Produktquantisierung (PQ) hinaus, indem es einen Schritt der Restquantisierung (RQ) einführt, um zusätzliche Informationen zu erfassen, was im Vergleich zu rein PQ-basierten Methoden zu einer höheren Genauigkeit oder kompakteren Indizes führt. Die zusätzlichen Schritte können jedoch zu einem höheren Rechenaufwand bei der Indexerstellung und -suche führen.</p>
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
    </button></h2><p>HNSW_PRQ kombiniert zwei Indizierungstechniken: <strong>HSNW</strong> für schnelle graphbasierte Navigation und <strong>PRQ</strong> für effiziente Vektorkompression.</p>
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
    </button></h3><p>HNSW konstruiert einen mehrschichtigen Graphen, bei dem jeder Knoten einem Vektor im Datensatz entspricht. In diesem Graphen sind die Knoten auf der Grundlage ihrer Ähnlichkeit miteinander verbunden, was eine schnelle Durchquerung des Datenraums ermöglicht. Die hierarchische Struktur ermöglicht es dem Suchalgorithmus, die in Frage kommenden Nachbarn einzugrenzen, wodurch der Suchprozess in hochdimensionalen Räumen erheblich beschleunigt wird.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/hnsw.md">HNSW</a>.</p>
<h3 id="PRQ" class="common-anchor-header">PRQ<button data-href="#PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PRQ ist ein mehrstufiges Vektorkompressionsverfahren, das zwei sich ergänzende Techniken kombiniert: PQ und RQ. Durch die Aufteilung eines hochdimensionalen Vektors in kleinere Untervektoren (mittels PQ) und die anschließende Quantisierung der verbleibenden Differenz (mittels RQ) erreicht PRQ eine kompakte und dennoch genaue Darstellung der ursprünglichen Daten.</p>
<p>Die folgende Abbildung zeigt, wie es funktioniert.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" />
   </span> <span class="img-wrapper"> <span>Hnsw Prq</span> </span></p>
<ol>
<li><p><strong>Produktquantisierung (PQ)</strong></p>
<p>In dieser Phase wird der ursprüngliche Vektor in kleinere Untervektoren unterteilt, und jeder Untervektor wird auf den nächstgelegenen Schwerpunkt in einem gelernten Codebuch abgebildet. Diese Zuordnung reduziert die Datengröße erheblich, führt aber zu Rundungsfehlern, da jeder Untervektor durch einen einzigen Schwerpunkt approximiert wird. Weitere Einzelheiten finden Sie unter <a href="/docs/de/ivf-pq.md#PQ">IVF_PQ</a>.</p></li>
<li><p><strong>Restquantisierung (RQ)</strong></p>
<p>Nach der PQ-Phase quantisiert RQ den Rest - die Differenz zwischen dem ursprünglichen Vektor und seiner PQ-basierten Approximation - unter Verwendung zusätzlicher Codebücher. Da dieses Residuum in der Regel sehr viel kleiner ist, kann es präziser kodiert werden, ohne dass der Speicherplatz stark zunimmt.</p>
<p>Der Parameter <code translate="no">nrq</code> bestimmt, wie oft dieses Residuum iterativ quantisiert wird, so dass Sie das Gleichgewicht zwischen Kompressionseffizienz und Genauigkeit fein abstimmen können.</p></li>
<li><p><strong>Endgültige Komprimierungsdarstellung</strong></p>
<p>Sobald RQ die Quantisierung des Residuums abgeschlossen hat, werden die Ganzzahlcodes von PQ und RQ zu einem einzigen komprimierten Index kombiniert. Durch die Erfassung feiner Details, die bei PQ allein möglicherweise nicht berücksichtigt werden, verbessert RQ die Genauigkeit, ohne den Speicherplatz erheblich zu vergrößern. Diese Synergie zwischen PQ und RQ ist das, was PRQ ausmacht.</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ<button data-href="#HNSW-+-PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>Durch die Kombination von HNSW und PRQ behält <strong>HNSW_PRQ</strong> die schnelle graphbasierte Suche von HNSW bei und nutzt gleichzeitig die Vorteile der mehrstufigen Komprimierung von PRQ. Der Arbeitsablauf sieht wie folgt aus:</p>
<ol>
<li><p><strong>Datenkomprimierung:</strong> Jeder Vektor wird zunächst über PQ in eine grobe Darstellung transformiert, und dann werden die Residuen über RQ zur weiteren Verfeinerung quantisiert. Das Ergebnis ist eine Reihe von kompakten Codes, die jeden Vektor repräsentieren.</p></li>
<li><p><strong>Graphische Konstruktion:</strong> Die komprimierten Vektoren (einschließlich der PQ- und RQ-Codes) bilden die Grundlage für den Aufbau des HNSW-Graphen. Da die Daten in einer kompakten Form gespeichert werden, benötigt der Graph weniger Speicherplatz und die Navigation durch ihn wird beschleunigt.</p></li>
<li><p><strong>Abruf von Kandidaten:</strong> Bei der Suche verwendet HNSW die komprimierten Darstellungen, um den Graphen zu durchlaufen und einen Pool von Kandidaten zu finden. Dadurch wird die Anzahl der zu berücksichtigenden Vektoren drastisch reduziert.</p></li>
<li><p><strong>(Optional) Verfeinerung der Ergebnisse:</strong> Die anfänglichen Kandidatenergebnisse können zur Verbesserung der Genauigkeit auf der Grundlage der folgenden Parameter verfeinert werden:</p>
<ul>
<li><p><code translate="no">refine</code>: Legt fest, ob dieser Verfeinerungsschritt aktiviert ist. Wenn er auf <code translate="no">true</code> gesetzt ist, berechnet das System die Abstände unter Verwendung von höherer Genauigkeit oder unkomprimierten Darstellungen neu.</p></li>
<li><p><code translate="no">refine_type</code>: Gibt den Präzisionsgrad der Daten an, die während der Verfeinerung verwendet werden (z. B. SQ6, SQ8, BF16). Eine höhere Genauigkeit wie <code translate="no">FP32</code> kann genauere Ergebnisse liefern, erfordert aber mehr Speicherplatz. Diese muss die Genauigkeit des ursprünglichen komprimierten Datensatzes um <code translate="no">sq_type</code> übersteigen.</p></li>
<li><p><code translate="no">refine_k</code>: Wirkt wie ein Vergrößerungsfaktor. Wenn z. B. Ihr Top <em>k</em> 100 und <code translate="no">refine_k</code> 2 ist, ordnet das System die 200 besten Kandidaten neu und gibt die besten 100 zurück, was die Gesamtgenauigkeit erhöht.</p></li>
</ul></li>
</ol>
<p>Eine vollständige Liste der Parameter und der gültigen Werte finden Sie unter <a href="/docs/de/hnsw-prq.md#Index-params">Indexparametern</a>.</p>
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
    </button></h2><p>Um einen <code translate="no">HNSW_PRQ</code> -Index für ein Vektorfeld in Milvus zu erstellen, verwenden Sie die Methode <code translate="no">add_index()</code> und geben Sie die Parameter <code translate="no">index_type</code>, <code translate="no">metric_type</code> und zusätzliche Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PRQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;nrq&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. In diesem Beispiel setzen Sie den Wert auf <code translate="no">HNSW_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Unterstützte Werte sind <code translate="no">COSINE</code>, <code translate="no">L2</code> und <code translate="no">IP</code>. Einzelheiten finden Sie unter <a href="/docs/de/metric.md">Metrische Typen</a>.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für den Aufbau des Index. Weitere Informationen finden Sie unter <a href="/docs/de/hnsw-prq.md#Index-building-params">Indexerstellungsparameter</a>.</p></li>
</ul>
<p>Sobald die Indexparameter konfiguriert sind, können Sie den Index erstellen, indem Sie die Methode <code translate="no">create_index()</code> direkt verwenden oder die Indexparameter in der Methode <code translate="no">create_collection</code> übergeben. Weitere Informationen finden Sie unter <a href="/docs/de/create-collection.md">Sammlung erstellen</a>.</p>
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
    </button></h2><p>Sobald der Index erstellt und die Entitäten eingefügt sind, können Sie Ähnlichkeitssuchen im Index durchführen.</p>
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
<li><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Suche im Index. Details finden Sie unter <a href="/docs/de/hnsw-prq.md#Index-specific-search-params">Indexspezifische Suchparameter</a>.</li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Index-Parameter<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Abschnitt gibt einen Überblick über die Parameter, die für den Aufbau eines Index und die Durchführung von Suchen im Index verwendet werden.</p>
<h3 id="Index-building-params" class="common-anchor-header">Indexaufbau-Parameter<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">params</code> beim <a href="/docs/de/hnsw-prq.md#Build-index">Aufbau eines Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Maximale Anzahl der Verbindungen （oder Kanten), die jeder Knoten im Graphen haben kann, einschließlich der ausgehenden und eingehenden Kanten. Dieser Parameter wirkt sich direkt auf den Indexaufbau und die Suche aus.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [2, 2048]</p>
<p><strong>Standardwert</strong>: <code translate="no">30</code> (bis zu 30 ausgehende und 30 eingehende Kanten pro Knoten)</p></td>
     <td><p>Ein größerer <code translate="no">M</code> führt im Allgemeinen zu einer <strong>höheren Genauigkeit</strong>, <strong>erhöht</strong> jedoch <strong>den Speicheraufwand</strong> und <strong>verlangsamt sowohl den Indexaufbau als auch die Suche</strong>. <code translate="no">M</code> sollte für Datensätze mit hoher Dimensionalität oder wenn eine hohe Wiederauffindbarkeit entscheidend ist, erhöht werden.</p>
<p>Verringern Sie <code translate="no">M</code>, wenn die Speichernutzung und die Suchgeschwindigkeit im Vordergrund stehen.</p>
<p>In den meisten Fällen empfehlen wir Ihnen, einen Wert innerhalb dieses Bereichs zu wählen: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Anzahl der Nachbarschaftskandidaten, die bei der Indexerstellung für eine Verbindung in Betracht gezogen werden. Für jedes neue Element wird ein größerer Pool von Kandidaten ausgewertet, aber die maximale Anzahl der tatsächlich hergestellten Verbindungen ist immer noch durch <code translate="no">M</code> begrenzt.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, <em>int_max</em>]</p>
<p><strong>Standardwert</strong>: <code translate="no">360</code></p></td>
     <td><p>Ein höherer <code translate="no">efConstruction</code> führt normalerweise zu einem <strong>genaueren Index</strong>, da mehr potenzielle Verbindungen untersucht werden. Dies führt jedoch auch zu einer <strong>längeren Indizierungszeit und einem erhöhten Speicherverbrauch</strong> während des Aufbaus. Erwägen Sie, <code translate="no">efConstruction</code> zu erhöhen, um die Genauigkeit zu verbessern, insbesondere in Szenarien, in denen die Indizierungszeit weniger kritisch ist.</p>
<p>Ziehen Sie eine Verringerung von <code translate="no">efConstruction</code> in Betracht, um den Indexaufbau zu beschleunigen, wenn Ressourcenbeschränkungen ein Problem darstellen.</p>
<p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Die Anzahl der Untervektoren (für die Quantisierung), in die jeder hochdimensionale Vektor während des Quantisierungsprozesses unterteilt wird.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, 65536]</p>
<p><strong>Standardwert</strong>: Keine</p></td>
     <td><p>Ein höherer Wert von <code translate="no">m</code> kann die Genauigkeit verbessern, erhöht aber auch die Rechenkomplexität und den Speicherverbrauch. <code translate="no">m</code> muss ein Divisor der Vektordimension<em>(D</em>) sein, um eine korrekte Zerlegung zu gewährleisten. Ein allgemein empfohlener Wert ist <em>m = D/2</em>.</p>
<p>In den meisten Fällen wird empfohlen, einen Wert in diesem Bereich zu wählen: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Die Anzahl der Bits, die verwendet werden, um den Index des Schwerpunkts jedes Untervektors in komprimierter Form darzustellen. Sie bestimmt direkt die Größe jedes Codebuchs. Jedes Codebuch enthält <sup>2nbits</sup> Zentroide. Wenn zum Beispiel <code translate="no">nbits</code> auf 8 eingestellt ist, wird jeder Untervektor durch einen 8-Bit-Schwerpunktindex dargestellt. Dies ermöglicht<sup>28</sup> (256) mögliche Schwerpunkte im Codebuch für diesen Teilvektor.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, 24]</p>
<p><strong>Standardwert</strong>: <code translate="no">8</code></p></td>
     <td><p>Ein höherer Wert von <code translate="no">nbits</code> ermöglicht größere Codebücher, was zu genaueren Darstellungen der ursprünglichen Vektoren führen kann. Allerdings bedeutet dies auch, dass mehr Bits zum Speichern jedes Index verwendet werden, was zu einer geringeren Komprimierung führt. In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs zu wählen: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>Legt fest, wie viele Restunterquantisierer in der RQ-Stufe verwendet werden. Mit mehr Unterquantisierern wird möglicherweise eine stärkere Komprimierung erreicht, aber es kann zu einem größeren Informationsverlust kommen.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, 16]</p>
<p><strong>Standardwert</strong>: <code translate="no">2</code></p></td>
     <td><p>Ein höherer Wert von <code translate="no">nrq</code> erlaubt zusätzliche Subquantisierungsschritte, was zu einer genaueren Rekonstruktion der ursprünglichen Vektoren führen kann. Allerdings bedeutet dies auch, dass mehr Subquantisierer gespeichert und berechnet werden müssen, was zu einer größeren Indexgröße und einem höheren Rechenaufwand führt.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Ein boolesches Flag, das steuert, ob während der Suche ein Verfeinerungsschritt angewendet wird. Bei der Verfeinerung werden die ursprünglichen Ergebnisse neu geordnet, indem die genauen Abstände zwischen dem Abfragevektor und den Kandidaten berechnet werden.</p></td>
     <td><p><strong>Typ</strong>: Boolean <strong>Bereich</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Standardwert</strong>: <code translate="no">false</code></p></td>
     <td><p>Setzen Sie <code translate="no">true</code>, wenn hohe Genauigkeit wichtig ist und Sie etwas langsamere Suchzeiten tolerieren können. Verwenden Sie <code translate="no">false</code>, wenn Geschwindigkeit eine Priorität ist und ein kleiner Kompromiss bei der Genauigkeit akzeptabel ist.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Bestimmt die Genauigkeit der Daten, die während des Verfeinerungsprozesses verwendet werden. Diese Genauigkeit muss höher sein als die der komprimierten Vektoren (wie durch die Parameter <code translate="no">m</code> und <code translate="no">nbits</code> festgelegt).</p></td>
     <td><p><strong>Typ</strong>: String <strong>Bereich</strong>:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Standardwert</strong>: Keine</p></td>
     <td><p>Verwenden Sie <code translate="no">FP32</code> für maximale Präzision bei höheren Speicherkosten oder <code translate="no">SQ6</code>/<code translate="no">SQ8</code> für eine bessere Komprimierung. <code translate="no">BF16</code> und <code translate="no">FP16</code> bieten eine ausgewogene Alternative.</p></td>
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
    </button></h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">search_params.params</code> für die <a href="/docs/de/hnsw-prq.md#Search-on-index">Suche im Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Steuert die Breite der Suche während der Suche nach den nächsten Nachbarn. Er bestimmt, wie viele Knoten besucht und als potenzielle nächste Nachbarn bewertet werden. 
 Dieser Parameter wirkt sich nur auf den Suchprozess aus und gilt ausschließlich für die unterste Schicht des Graphen.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, <em>int_max</em>]</p>
<p><strong>Standardwert</strong>: <em>limit</em> (TopK nächste Nachbarn, die zurückgegeben werden)</p></td>
     <td><p>Eine größere <code translate="no">ef</code> führt im Allgemeinen zu einer <strong>höheren Suchgenauigkeit</strong>, da mehr potenzielle Nachbarn berücksichtigt werden. Allerdings <strong>erhöht sich</strong> dadurch auch <strong>die Suchzeit</strong>. <code translate="no">ef</code> sollte erhöht werden, wenn eine hohe Wiederfindungsrate entscheidend ist und die Suchgeschwindigkeit weniger wichtig ist.</p>
<p>Ziehen Sie in Erwägung, <code translate="no">ef</code> zu verringern, um schnelleren Suchen den Vorzug zu geben, insbesondere in Szenarien, in denen eine leichte Verringerung der Genauigkeit akzeptabel ist.</p>
<p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs zu wählen: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Der Vergrößerungsfaktor, der steuert, wie viele zusätzliche Kandidaten während der Verfeinerungsphase (Reranking) im Verhältnis zu den angeforderten Top-K-Ergebnissen untersucht werden.</p></td>
     <td><p><strong>Typ</strong>: Float <strong>Bereich</strong>: [1, <em>float_max</em>)</p>
<p><strong>Standardwert</strong>: 1</p></td>
     <td><p>Höhere Werte von <code translate="no">refine_k</code> können die Auffindbarkeit und Genauigkeit verbessern, erhöhen aber auch die Suchzeit und den Ressourcenverbrauch. Ein Wert von 1 bedeutet, dass der Verfeinerungsprozess nur die anfänglichen Top-K-Ergebnisse berücksichtigt.</p></td>
   </tr>
</table>
