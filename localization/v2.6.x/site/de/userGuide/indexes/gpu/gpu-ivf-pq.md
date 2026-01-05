---
id: gpu-ivf-pq.md
title: GPU_IVF_PQ
summary: >-
  Der GPU_IVF_PQ-Index baut auf dem IVF_PQ-Konzept auf, indem er Inverted File
  Clustering mit Product Quantization (PQ) kombiniert, das hochdimensionale
  Vektoren in kleinere Unterräume aufteilt und diese für eine effiziente
  Ähnlichkeitssuche quantisiert. GPU_IVF_PQ wurde ausschließlich für
  GPU-Umgebungen entwickelt und nutzt die Parallelverarbeitung, um Berechnungen
  zu beschleunigen und große Vektordaten effektiv zu verarbeiten. Weitere
  Informationen zu den grundlegenden Konzepten finden Sie unter IVF_PQ.
---
<h1 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>Der <strong>GPU_IVF_PQ-Index</strong> baut auf dem <strong>IVF_PQ-Konzept</strong> auf, indem er Inverted File Clustering mit Product Quantization (PQ) kombiniert, das hochdimensionale Vektoren in kleinere Unterräume aufteilt und diese für eine effiziente Ähnlichkeitssuche quantisiert. GPU_IVF_PQ wurde ausschließlich für GPU-Umgebungen entwickelt und nutzt die Parallelverarbeitung, um Berechnungen zu beschleunigen und große Vektordaten effektiv zu verarbeiten. Weitere Informationen zu den grundlegenden Konzepten finden Sie unter <a href="/docs/de/ivf-pq.md">IVF_PQ</a>.</p>
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
    </button></h2><p>Um einen <code translate="no">GPU_IVF_PQ</code> -Index für ein Vektorfeld in Milvus zu erstellen, verwenden Sie die Methode <code translate="no">add_index()</code> und geben Sie die Parameter <code translate="no">index_type</code>, <code translate="no">metric_type</code> und zusätzliche Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. In diesem Beispiel setzen Sie den Wert auf <code translate="no">GPU_IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Unterstützte Werte sind <code translate="no">COSINE</code>, <code translate="no">L2</code> und <code translate="no">IP</code>. Einzelheiten finden Sie unter <a href="/docs/de/metric.md">Metrische Typen</a>.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für den Aufbau des Index.</p>
<ul>
<li><code translate="no">m</code>: Anzahl der Untervektoren, in die der Vektor aufgeteilt werden soll.</li>
</ul>
<p>Weitere Informationen zu den für den Index <code translate="no">GPU_IVF_PQ</code> verfügbaren Parametern finden Sie unter <a href="/docs/de/gpu-ivf-pq.md#Index-building-params">Parameter für den Indexaufbau</a>.</p></li>
</ul>
<p>Sobald die Index-Parameter konfiguriert sind, können Sie den Index erstellen, indem Sie die Methode <code translate="no">create_index()</code> direkt verwenden oder die Index-Parameter in der Methode <code translate="no">create_collection</code> übergeben. Weitere Informationen finden Sie unter <a href="/docs/de/create-collection.md">Sammlung erstellen</a>.</p>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Suche im Index.</p>
<ul>
<li><code translate="no">nprobe</code>: Anzahl der Cluster, nach denen gesucht werden soll.</li>
</ul>
<p>Weitere Suchparameter, die für den Index <code translate="no">GPU_IVF_PQ</code> verfügbar sind, finden Sie unter <a href="/docs/de/gpu-ivf-pq.md#Index-specific-search-params">Indexspezifische Suchparameter</a>.</p></li>
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
    </button></h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">params</code> beim <a href="/docs/de/gpu-ivf-pq.md#Build-index">Aufbau eines Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Die Anzahl der Cluster, die mit dem k-means-Algorithmus während der Indexerstellung erstellt werden.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, 65536]</p>
<p><strong>Standardwert</strong>: <code translate="no">128</code></p></td>
     <td><p>Größere <code translate="no">nlist</code> Werte verbessern die Wiederauffindbarkeit durch die Erstellung von feineren Clustern, erhöhen aber die Indexerstellungszeit. Optimieren Sie den Wert je nach Größe des Datensatzes und der verfügbaren Ressourcen. In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Die Anzahl der Untervektoren (für die Quantisierung), in die jeder hochdimensionale Vektor während des Quantisierungsprozesses unterteilt wird.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, 65536]</p>
<p><strong>Standardwert</strong>: Keine</p></td>
     <td><p>Ein höherer Wert von <code translate="no">m</code> kann die Genauigkeit verbessern, erhöht aber auch die Rechenkomplexität und den Speicherverbrauch. <code translate="no">m</code> muss ein Divisor der Vektordimension<em>(D</em>) sein, um eine korrekte Zerlegung zu gewährleisten. Ein allgemein empfohlener Wert ist <em>m = D/2</em>.</p>
<p>In den meisten Fällen wird empfohlen, einen Wert in diesem Bereich zu wählen: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Die Anzahl der Bits, die verwendet werden, um den Index des Schwerpunkts jedes Untervektors in komprimierter Form darzustellen. Sie bestimmt direkt die Größe jedes Codebuchs. Jedes Codebuch enthält <sup>2nbits</sup> Zentroide. Wenn zum Beispiel <code translate="no">nbits</code> auf 8 eingestellt ist, wird jeder Untervektor durch einen 8-Bit-Schwerpunktindex dargestellt. Dies ermöglicht<sup>28</sup> (256) mögliche Schwerpunkte im Codebuch für diesen Teilvektor.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, 24]</p>
<p><strong>Standardwert</strong>: <code translate="no">8</code></p></td>
     <td><p>Ein höherer Wert von <code translate="no">nbits</code> ermöglicht größere Codebücher, was zu genaueren Darstellungen der ursprünglichen Vektoren führen kann. Allerdings bedeutet dies auch, dass mehr Bits zum Speichern jedes Index verwendet werden, was zu einer geringeren Komprimierung führt. In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs zu wählen: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>Legt fest, ob der Originaldatensatz im GPU-Speicher zwischengespeichert werden soll. Mögliche Werte:</p>
<ul>
<li><p><code translate="no">"true"</code>: Zwischenspeichern des Originaldatensatzes zur Verbesserung der Wiederauffindung durch Verfeinerung der Suchergebnisse.</p></li>
<li><p><code translate="no">"false"</code>: Der Originaldatensatz wird nicht zwischengespeichert, um GPU-Speicher zu sparen.</p></li>
</ul></td>
     <td><p><strong>Typ</strong>: String <strong>Bereich</strong>: [<code translate="no">"true"</code>, <code translate="no">"false"</code>]</p>
<p><strong>Standardwert</strong>: <code translate="no">"false"</code></p></td>
     <td><p>Die Einstellung <code translate="no">"true"</code> verbessert die Wiederauffindbarkeit durch Verfeinerung der Suchergebnisse, verbraucht aber mehr GPU-Speicher. Die Einstellung <code translate="no">"false"</code> spart GPU-Speicher.</p></td>
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
    </button></h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">search_params.params</code> für die <a href="/docs/de/gpu-ivf-pq.md#Search-on-index">Suche im Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Die Anzahl der Cluster, in denen nach Kandidaten gesucht wird.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, <em>nlist</em>]</p>
<p><strong>Standardwert</strong>: <code translate="no">8</code></p></td>
     <td><p>Höhere Werte ermöglichen die Suche nach mehr Clustern, was die Wiederauffindbarkeit durch die Erweiterung des Suchbereichs verbessert, jedoch auf Kosten einer erhöhten Abfragelatenz. Setzen Sie <code translate="no">nprobe</code> proportional zu <code translate="no">nlist</code>, um ein Gleichgewicht zwischen Geschwindigkeit und Genauigkeit herzustellen.</p>
<p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: [1, nlist].</p></td>
   </tr>
</table>
