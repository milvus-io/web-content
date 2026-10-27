---
id: ivf-rabitq-fastscan.md
title: IVF_RABITQ_FASTSCANCompatible with Milvus 3.0.x
summary: >-
  IVF_RABITQ_FASTSCAN kombiniert IVF, RaBitQ-Binärquantisierung und
  SIMD-Batch-Scanning, um eine speichereffiziente Vektorsuche mit hohem
  Durchsatz zu ermöglichen.
beta: Milvus 3.0.x
---
<h1 id="IVFRABITQFASTSCAN" class="common-anchor-header">IVF_RABITQ_FASTSCAN<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#IVFRABITQFASTSCAN" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">IVF_RABITQ_FASTSCAN</code> kombiniert IVF-Partitionierung, RaBitQ-Binärquantisierung und FastScan-Batch-Verarbeitung. Es speichert Ein-Bit-RaBitQ-Codes für Datenbankvektoren und verarbeitet die Codes in SIMD-freundlichen Blöcken von jeweils 32 Datenbankvektoren. Damit eignet es sich besonders für Workloads mit hohem Durchsatz und begrenzten Speicherkapazitäten, bei denen annähernde Ergebnisse akzeptabel sind.</p>
<p>Wählen Sie „ <code translate="no">IVF_RABITQ_FASTSCAN</code> “ anstelle von <a href="/docs/de/ivf-rabitq.md">„IVF_RABITQ“</a>, wenn bei Suchvorgängen viele Kandidaten durchgesucht werden und der Durchsatz das vorrangige Ziel ist. Die Einrichtungskosten pro Abfrage bei FastScan werden über die gepackten Codeblöcke verteilt, sodass es in der Regel für große Datensätze oder lange IVF-Listen vorteilhafter ist. Für kleine Sammlungen oder Suchvorgänge, bei denen nur wenige Kandidaten geprüft werden, sollten Sie stattdessen „ <code translate="no">IVF_RABITQ</code> “ verwenden. Es unterstützt zudem konfigurierbare Abfragequantisierung, weitere Verfeinerungstypen und Iteratoren.</p>
<h2 id="How-it-works" class="common-anchor-header">So funktioniert es<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">IVF_RABITQ_FASTSCAN</code> Es werden die folgenden Phasen durchlaufen:</p>
<ol>
<li><strong>IVF-Partitionierung</strong>: IVF gruppiert Vektoren in „ <code translate="no">nlist</code> “-Cluster und durchsucht die am nächsten liegenden Cluster von „ <code translate="no">nprobe</code> “.</li>
<li><strong>RaBitQ-Kodierung</strong>: Jeder Vektorresidualwert wird als RaBitQ-Code mit einem Bit pro Dimension kodiert.</li>
<li><strong>FastScan</strong>: Der Index bündelt Codes für eine cachefreundliche SIMD-Batch-Verarbeitung. Er wertet in jedem Batch 32 Datenbankvektoren aus.</li>
<li><strong>Optionale Verfeinerung</strong>: Wenn diese Option aktiviert ist, bewertet ein FP32-Refiner die Kandidaten neu, bevor Milvus die endgültigen Ergebnisse zurückgibt.</li>
</ol>
<p>Der zugrunde liegende Faiss-Index ist <code translate="no">IndexIVFRaBitQFastScan</code>. Knowhere umhüllt ihn mit einer zufälligen Rotationstransformation und fügt optional einen FP32-Verfeinerer hinzu.</p>
<p>FastScan führt vor dem Scannen der gepackten Codeblöcke Vorbereitungsarbeiten pro Abfrage durch, wie beispielsweise das Erstellen und Quantisieren abfragebezogener Nachschlagetabellen. Führen Sie Benchmarks sowohl für <code translate="no">IVF_RABITQ</code> als auch für <code translate="no">IVF_RABITQ_FASTSCAN</code> mit Ihren Daten und Suchparametern durch.</p>
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
    </button></h2><p>Um einen „ <code translate="no">IVF_RABITQ_FASTSCAN</code> “-Index für ein Vektorfeld in Milvus zu erstellen, verwenden Sie die Methode „ <code translate="no">add_index()</code> “ und geben Sie dabei „ <code translate="no">index_type</code> “, „ <code translate="no">metric_type</code> “ sowie weitere Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ_FASTSCAN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;FP32&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. Setzen Sie den Wert in diesem Beispiel auf „ <code translate="no">IVF_RABITQ_FASTSCAN</code> “.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Zu den unterstützten Werten gehören „ <code translate="no">COSINE</code> “, „ <code translate="no">L2</code> “ und „ <code translate="no">IP</code> “. Weitere Informationen finden Sie unter <a href="/docs/de/metric.md">„Metriktypen</a>“.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Indexerstellung. Weitere Informationen finden Sie unter <a href="/docs/de/ivf-rabitq-fastscan.md#Index-building-params">„Parameter für die Indexerstellung</a>“.</p></li>
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
<p>Legen Sie „ <code translate="no">nprobe</code> “ fest, um zu steuern, wie viele IVF-Cluster durchsucht werden. Wenn der Index mit Verfeinerung erstellt wurde, verwenden Sie „ <code translate="no">refine_k</code> “, um den an den FP32-Refiner übergebenen Kandidatenpool zu steuern.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your Milvus server address</span>

search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Suche im Index. Weitere Informationen finden Sie unter <a href="/docs/de/ivf-rabitq-fastscan.md#Index-specific-search-params">„Indexspezifische Suchparameter</a>“.</li>
</ul>
<div class="alert note">
<p>Im Gegensatz zu „ <code translate="no">IVF_RABITQ</code> “ akzeptiert „ <code translate="no">IVF_RABITQ_FASTSCAN</code> “ den Suchparameter „ <code translate="no">rbq_bits_query</code> “ nicht. FastScan verwendet intern immer eine 8-Bit-Abfragequantisierung, lassen Sie daher „ <code translate="no">rbq_bits_query</code> “ weg oder setzen Sie den Wert auf „ <code translate="no">0</code> “; größere Werte werden abgelehnt.</p>
</div>
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
    </button></h2><p>Dieser Abschnitt bietet einen Überblick über die Parameter, die zum Erstellen eines Indexes und zur Durchführung von Suchvorgängen im Index verwendet werden.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter zum Erstellen eines Index<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgende Tabelle listet die Parameter auf, die in „ <code translate="no">params</code> “ beim <a href="/docs/de/ivf-rabitq-fastscan.md#Build-index">Erstellen eines Indexes</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Optimierungsvorschlag</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Die Anzahl der Cluster, die während der Indexerstellung mithilfe des k-Means-Algorithmus erstellt werden sollen. Jeder Cluster, der durch einen Schwerpunkt repräsentiert wird, speichert eine Liste von Vektoren. Durch Erhöhen dieses Parameters wird die Anzahl der Vektoren in jedem Cluster verringert, wodurch kleinere, gezieltere Partitionen entstehen.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl<br><strong>Bereich</strong>: [1, 65536]<br><strong>Standardwert</strong>: <code translate="no">128</code></p></td>
     <td><p>Größere Werte für „ <code translate="no">nlist</code> “ verbessern den Recall durch die Bildung feinerer Cluster, verlängern jedoch die Indexerstellungszeit. Optimieren Sie den Wert entsprechend der Datensatzgröße und den verfügbaren Ressourcen. In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Aktiviert den Verfeinerungsprozess und speichert die verfeinerten Daten. „ <code translate="no">IVF_RABITQ_FASTSCAN</code> “ unterstützt ausschließlich die Verfeinerung im FP32-Format.</p></td>
     <td><p><strong>Typ</strong>: Boolesch<br><strong>Bereich</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]<br><strong>Standardwert</strong>: <code translate="no">false</code></p></td>
     <td><p>Setzen Sie den Wert auf „ <code translate="no">true</code> “, wenn eine Recall-Rate von 0,9+ erforderlich ist. Die Aktivierung der Verfeinerung verbessert die Genauigkeit, erhöht jedoch den Speicherbedarf und die Dauer der Indexerstellung.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Definiert die Datendarstellung, die für die Verfeinerung verwendet wird, wenn „ <code translate="no">refine</code> “ aktiviert ist. Nur erforderlich, wenn „ <code translate="no">refine</code> “ auf „ <code translate="no">true</code> “ gesetzt ist.</p></td>
     <td><p><strong>Typ</strong>: Zeichenfolge<br><strong>Bereich</strong>: [<code translate="no">FP32</code>, <code translate="no">FLAT</code>]<br><strong>Standardwert</strong>: Keiner</p></td>
     <td><p><code translate="no">IVF_RABITQ_FASTSCAN</code> unterstützt ausschließlich die Verfeinerung nach FP32, und „ <code translate="no">FLAT</code> “ ist identisch mit „ <code translate="no">FP32</code> “. Bei der Wertübereinstimmung wird die Groß-/Kleinschreibung nicht berücksichtigt.</p></td>
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
    </button></h3><p>Die folgende Tabelle listet die Parameter auf, die bei <a href="/docs/de/ivf-rabitq-fastscan.md#Search-on-index">der Suche im Index</a> unter <code translate="no">search_params.params</code> konfiguriert werden können.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Optimierungsvorschlag</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Die Anzahl der Cluster, in denen nach Kandidaten gesucht werden soll. Höhere Werte ermöglichen die Suche in mehr Clustern, was den Recall durch Erweiterung des Suchbereichs verbessert, jedoch auf Kosten einer erhöhten Abfragelatenz geht.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl<br><strong>Bereich</strong>: [1, <em>nlist</em>]<br><strong>Standardwert</strong>: <code translate="no">8</code></p></td>
     <td><p>Eine Erhöhung dieses Werts verbessert den Recall, kann jedoch die Suche verlangsamen. Stellen Sie „ <code translate="no">nprobe</code> “ proportional zu „ <code translate="no">nlist</code> “ ein, um Geschwindigkeit und Genauigkeit in Einklang zu bringen. In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [1, <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Der Verfeinerungsprozess nutzt eine qualitativ hochwertigere Quantisierung, um die benötigte Anzahl nächstgelegener Nachbarn aus einem <code translate="no">refine_k</code> -mal größeren Pool von Kandidaten auszuwählen, die mit IVF_RABITQ_FASTSCAN ermittelt wurden. Hat keine Auswirkung, wenn die Verfeinerung deaktiviert ist.</p></td>
     <td><p><strong>Typ</strong>: Float<br><strong>Bereich</strong>: [1, <em>float_max</em>)<br><strong>Standardwert</strong>: <code translate="no">1</code></p></td>
     <td><p>Höhere Werte für „ <code translate="no">refine_k</code> “ verringern die QPS, erhöhen jedoch die Recall-Rate. Beginnen Sie mit „ <code translate="no">1</code> “ und testen Sie die Werte „ <code translate="no">2</code> “, „ <code translate="no">3</code> “, „ <code translate="no">4</code> “ und „ <code translate="no">5</code> “, um den optimalen Kompromiss zwischen QPS und Recall für Ihren Datensatz zu finden.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>Legt fest, ob eine zusätzliche skalare Quantisierung eines Abfragevektors angewendet wird. <strong>Wird bei „ <code translate="no">IVF_RABITQ_FASTSCAN</code> “ nicht unterstützt</strong>: Der Index verwendet intern immer eine 8-Bit-Abfragequantisierung. Lassen Sie diesen Parameter weg oder setzen Sie ihn auf „ <code translate="no">0</code> “; Werte größer als „ <code translate="no">0</code> “ werden abgelehnt.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl<br><strong>Bereich</strong>: [0, 0]<br><strong>Standardwert</strong>: <code translate="no">0</code></p></td>
     <td><p>Nicht festlegen. Verwenden Sie für eine konfigurierbare Abfragequantisierung stattdessen <a href="/docs/de/ivf-rabitq.md">IVF_RABITQ</a>.</p></td>
   </tr>
</table>
<h2 id="Limitations" class="common-anchor-header">Einschränkungen<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li>FastScan verwendet eine feste 1-Bit-RaBitQ-Datenbankkodierung und eine 8-Bit-Abfragequantisierung. „ <code translate="no">rbq_bits_query</code> “ muss weggelassen oder auf „ <code translate="no">0</code> “ gesetzt werden.</li>
<li>Es wird nur eine Verfeinerung nach FP32 (entspricht „ <code translate="no">FLAT</code> “) unterstützt.</li>
<li>Iteratoren werden nicht unterstützt.</li>
<li>Dies ist ein CPU-Index. Er läuft nicht auf der GPU.</li>
<li>Die tatsächliche Leistung hängt von der SIMD-Unterstützung der CPU, der Vektordimension, <code translate="no">nlist</code>, <code translate="no">nprobe</code> sowie der Datenverteilung ab. Führen Sie vor der Bereitstellung in der Produktion einen Benchmark mit Ihrer Arbeitslast durch.</li>
</ul>
<p>Informationen zur RaBitQ-Variante ohne FastScan und deren zusätzlichen Verfeinerungsoptionen finden Sie unter <a href="/docs/de/ivf-rabitq.md">IVF_RABITQ</a>.</p>
