---
id: ivf-flat.md
title: IVF_FLAT
summary: >-
  Der IVF_FLAT-Index ist ein Indizierungsalgorithmus, der die Suchleistung für
  Fließkomma-Vektoren verbessern kann.
---
<h1 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p>Der <strong>IVF_FLAT-Index</strong> ist ein Indizierungsalgorithmus, der die Suchleistung für Fließkomma-Vektoren verbessern kann.</p>
<p>Dieser Indextyp ist ideal für große Datensätze, die schnelle Abfrageantworten und hohe Genauigkeit erfordern, vor allem, wenn das Clustering Ihres Datensatzes den Suchraum verkleinern kann und ausreichend Speicher für die Speicherung von Clusterdaten zur Verfügung steht.</p>
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
    </button></h2><p>Der Begriff <strong>IVF_FLAT</strong> steht für <strong>Inverted File Flat</strong>, was den zweistufigen Ansatz für die Indizierung und Suche nach Fließkomma-Vektoren umschreibt:</p>
<ul>
<li><p><strong>Inverted File (IVF):</strong> Bezieht sich auf das Clustering des Vektorraums in handhabbare Regionen unter Verwendung von <a href="https://en.wikipedia.org/wiki/K-means_clustering">k-means clustering</a>. Jeder Cluster wird durch einen <strong>Zentroid</strong> repräsentiert, der als Referenzpunkt für die Vektoren innerhalb des Clusters dient.</p></li>
<li><p><strong>Flach:</strong> Gibt an, dass die Vektoren innerhalb jedes Clusters in ihrer ursprünglichen Form (flache Struktur) gespeichert werden, ohne Komprimierung oder Quantisierung, um präzise Abstandsberechnungen zu ermöglichen.</p></li>
</ul>
<p>Die folgende Abbildung zeigt, wie dies funktioniert:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/IVF-FLAT-workflow.png" alt="IVF FLAT Workflow" class="doc-image" id="ivf-flat-workflow" />
   </span> <span class="img-wrapper"> <span>IVF FLAT Arbeitsablauf</span> </span></p>
<p>Diese Indizierungsmethode beschleunigt den Suchprozess, hat aber einen potenziellen Nachteil: Der Kandidat, der als der nächstgelegene zur Einbettung der Anfrage gefunden wurde, ist möglicherweise nicht der exakt nächstgelegene. Dies kann der Fall sein, wenn die nächstgelegene Einbettung zur Abfrageeinbettung in einem anderen Cluster liegt als demjenigen, der auf der Grundlage des nächstgelegenen Schwerpunkts ausgewählt wurde (siehe Visualisierung unten).</p>
<p>Um dieses Problem zu lösen, bietet <strong>IVF_FLAT</strong> zwei Hyperparameter, die wir einstellen können:</p>
<ul>
<li><p><code translate="no">nlist</code>: Gibt die Anzahl der Partitionen an, die mit dem k-means-Algorithmus erstellt werden sollen.</p></li>
<li><p><code translate="no">nprobe</code>: Legt die Anzahl der Partitionen fest, die bei der Suche nach Kandidaten berücksichtigt werden sollen.</p></li>
</ul>
<p>Wenn wir nun <code translate="no">nprobe</code> auf 3 statt auf 1 setzen, erhalten wir das folgende Ergebnis:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/IVF-FLAT-workflow-2.png" alt="IVF FLAT Workflow 2" class="doc-image" id="ivf-flat-workflow-2" />
   </span> <span class="img-wrapper"> <span>IVF FLAT Workflow 2</span> </span></p>
<p>Wenn Sie den Wert <code translate="no">nprobe</code> erhöhen, können Sie mehr Partitionen in die Suche einbeziehen, was dazu beitragen kann, dass die der Abfrage am nächsten liegende Einbettung nicht übersehen wird, selbst wenn sie sich in einer anderen Partition befindet. Dies hat jedoch den Nachteil, dass sich die Suchzeit erhöht, da mehr Kandidaten evaluiert werden müssen. Weitere Informationen zur Einstellung der Indexparameter finden Sie unter <a href="/docs/de/ivf-flat.md#Index-params">Indexparameter</a>.</p>
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
    </button></h2><p>Um einen <code translate="no">IVF_FLAT</code> -Index für ein Vektorfeld in Milvus zu erstellen, verwenden Sie die Methode <code translate="no">add_index()</code> und geben Sie die Parameter <code translate="no">index_type</code>, <code translate="no">metric_type</code> und zusätzliche Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters for the index</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. In diesem Beispiel setzen Sie den Wert auf <code translate="no">IVF_FLAT</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Unterstützte Werte sind <code translate="no">COSINE</code>, <code translate="no">L2</code> und <code translate="no">IP</code>. Einzelheiten finden Sie unter <a href="/docs/de/metric.md">Metrische Typen</a>.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für den Aufbau des Index.</p>
<ul>
<li><code translate="no">nlist</code>: Anzahl der Cluster zur Unterteilung des Datensatzes.</li>
</ul>
<p>Weitere Informationen zu den für den Index <code translate="no">IVF_FLAT</code> verfügbaren Erstellungsparametern finden Sie unter <a href="/docs/de/ivf-flat.md#Index-building-params">Indexerstellungsparameter</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
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
<p>Weitere Suchparameter, die für den Index <code translate="no">IVF_FLAT</code> verfügbar sind, finden Sie unter <a href="/docs/de/ivf-flat.md#Index-specific-search-params">Indexspezifische Suchparameter</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Indexaufbau-Parameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">params</code> beim <a href="/docs/de/ivf-flat.md#Build-index">Aufbau eines Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Die Anzahl der Cluster, die mit dem k-means-Algorithmus während des Indexaufbaus erstellt werden. Jeder Cluster, der durch einen Zentroid dargestellt wird, speichert eine Liste von Vektoren. Durch Erhöhen dieses Parameters wird die Anzahl der Vektoren in jedem Cluster reduziert, wodurch kleinere, konzentriertere Partitionen entstehen.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, 65536]</p><p><strong>Standardwert</strong>: <code translate="no">128</code></p></td>
     <td><p>Größere <code translate="no">nlist</code> Werte verbessern die Wiederauffindbarkeit durch die Erstellung von feineren Clustern, erhöhen aber die Indexerstellungszeit. Optimieren Sie den Wert anhand der Größe des Datensatzes und der verfügbaren Ressourcen. In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Indexspezifische Suchparameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">search_params.params</code> für die <a href="/docs/de/ivf-flat.md#Search-on-index">Suche im Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Die Anzahl der Cluster, in denen nach Kandidaten gesucht wird. Höhere Werte erlauben es, mehr Cluster zu durchsuchen, was die Wiederauffindbarkeit durch Erweiterung des Suchbereichs verbessert, allerdings auf Kosten einer erhöhten Abfragelatenz.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, <em>nlist</em>]</p><p><strong>Standardwert</strong>: <code translate="no">8</code></p></td>
     <td><p>Eine Erhöhung dieses Wertes verbessert die Auffindbarkeit, kann aber die Suche verlangsamen. Stellen Sie <code translate="no">nprobe</code> proportional zu <code translate="no">nlist</code> ein, um Geschwindigkeit und Genauigkeit auszugleichen.</p><p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs einzustellen: [1, nlist].</p></td>
   </tr>
</table>
