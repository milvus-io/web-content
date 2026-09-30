---
id: gpu-cagra.md
title: GPU_CAGRA
summary: >-
  Der GPU_CAGRA-Index ist ein graphbasierter Index, der für GPUs optimiert ist.
  Der Einsatz von GPUs für die Inferenz zur Ausführung der Milvus-GPU-Version
  kann kostengünstiger sein als die Verwendung teurer GPUs für das Training.
---
<h1 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h1><p>Der <strong>GPU_CAGRA-Index</strong> ist ein für GPUs optimierter, graphbasierter Index. Die Verwendung von GPUs für die Inferenz zur Ausführung der Milvus-GPU-Version kann kostengünstiger sein als der Einsatz teurer GPUs für das Training.</p>
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
    </button></h2><p>Um in Milvus einen „ <code translate="no">GPU_CAGRA</code> “-Index für ein Vektorfeld zu erstellen, verwenden Sie die Methode „ <code translate="no">add_index()</code> “ und geben Sie dabei die Parameter „ <code translate="no">index_type</code> “, „ <code translate="no">metric_type</code> “ sowie weitere Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_CAGRA&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;intermediate_graph_degree&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Affects recall and build time by determining the graph’s degree before pruning</span>
        <span class="hljs-string">&quot;graph_degree&quot;</span>: <span class="hljs-number">32</span>, <span class="hljs-comment"># Affets search performance and recall by setting the graph’s degree after pruning</span>
        <span class="hljs-string">&quot;build_algo&quot;</span>: <span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Selects the graph generation algorithm before pruning</span>
        <span class="hljs-string">&quot;cache_dataset_on_device&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>, <span class="hljs-comment"># Decides whether to cache the original dataset in GPU memory</span>
        <span class="hljs-string">&quot;adapt_for_cpu&quot;</span>: <span class="hljs-string">&quot;false&quot;</span>, <span class="hljs-comment"># Decides whether to use GPU for index-building and CPU for search</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. Setzen Sie den Wert in diesem Beispiel auf „ <code translate="no">GPU_CAGRA</code> “.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Weitere Informationen finden Sie unter <a href="/docs/de/v2.6.x/metric.md">„Metriktypen</a>“.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Erstellung des Index. Weitere Informationen zu den für den „ <code translate="no">GPU_CAGRA</code> “-Index verfügbaren Erstellungsparametern finden Sie unter <a href="/docs/de/v2.6.x/gpu-cagra.md#Index-building-params">„Index-Erstellungsparameter</a>“.</p></li>
</ul>
<p>Sobald die Indexparameter konfiguriert sind, können Sie den Index erstellen, indem Sie die Methode „ <code translate="no">create_index()</code> “ direkt aufrufen oder die Indexparameter an die Methode „ <code translate="no">create_collection</code> “ übergeben. Weitere Informationen finden Sie unter <a href="/docs/de/v2.6.x/create-collection.md">„Sammlung erstellen</a>“.</p>
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
    </button></h2><p>Sobald der Index erstellt und die Entitäten eingefügt wurden, können Sie Ähnlichkeitssuchen im Index durchführen.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-comment"># Determines the size of intermediate results kept during the search</span>
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Specifies the number of entry points into the CAGRA graph during the search</span>
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
<li><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Suche im Index. Weitere Informationen zu den für den „ <code translate="no">GPU_CAGRA</code> “-Index verfügbaren Suchparametern finden Sie unter <a href="/docs/de/v2.6.x/gpu-cagra.md#Index-specific-search-params">„Indexspezifische Suchparameter</a>“.</li>
</ul>
<h2 id="Enable-CPU-search-at-load-time--Milvus-264+" class="common-anchor-header">CPU-Suche beim Laden aktivieren<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Enable-CPU-search-at-load-time--Milvus-264+" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die CPU-Suche beim Laden dynamisch zu aktivieren, bearbeiten Sie die folgende Konfiguration in „ <code translate="no">milvus.yaml</code> “:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">GPU_CAGRA:</span>
    <span class="hljs-attr">load:</span> 
      <span class="hljs-attr">adapt_for_cpu:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Verhalten</strong></p>
<ul>
<li><p>Wenn „ <code translate="no">load.adapt_for_cpu</code> “ auf „ <code translate="no">true</code> “ gesetzt ist, konvertiert Milvus den <strong>GPU_CAGRA-Index</strong> während des Ladens in ein CPU-ausführbares Format (HNSW-ähnlich).</p></li>
<li><p>Nachfolgende Suchvorgänge werden auf der CPU ausgeführt, auch wenn der Index ursprünglich für die GPU erstellt wurde.</p></li>
<li><p>Wird der Parameter weggelassen oder auf „false“ gesetzt, verbleibt der Index auf der GPU und Suchvorgänge werden auf der GPU ausgeführt.</p></li>
</ul>
<div class="alert note">
<p>Verwenden Sie die CPU-Anpassung zur Ladezeit in hybriden oder kostenorientierten Umgebungen, in denen GPU-Ressourcen für den Indexaufbau reserviert sind, Suchvorgänge jedoch auf der CPU ausgeführt werden.</p>
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
    </button></h2><p>Dieser Abschnitt bietet einen Überblick über die Parameter, die zum Erstellen eines Indexes und zur Durchführung von Suchvorgängen auf dem Index verwendet werden.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter für den Indexaufbau<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgende Tabelle listet die Parameter auf, die in „ <code translate="no">params</code> “ beim <a href="/docs/de/v2.6.x/gpu-cagra.md#Build-index">Erstellen eines Indexes</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Standardwert</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">intermediate_graph_degree</code></p></td>
     <td><p>Beeinflusst den Recall und die Erstellungszeit, indem der Grad des Graphen vor dem Pruning festgelegt wird. Empfohlene Werte sind „ <code translate="no">32</code> “ oder „ <code translate="no">64</code> “.</p></td>
     <td><p><code translate="no">128</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">graph_degree</code></p></td>
     <td><p>Beeinflusst die Suchleistung und den Recall, indem der Grad des Graphen nach dem Pruning festgelegt wird. Ein größerer Unterschied zwischen diesen beiden Graden führt zu einer längeren Erstellungszeit. Der Wert muss kleiner sein als der Wert von „ <code translate="no">intermediate_graph_degree</code> “.</p></td>
     <td><p><code translate="no">64</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">build_algo</code></p></td>
     <td><p>Wählt den Algorithmus zur Graphgenerierung vor dem Pruning aus. Mögliche Werte:</p><ul><li><p><code translate="no">IVF_PQ</code>: Bietet eine höhere Qualität, führt jedoch zu einer längeren Erstellungszeit.</p></li><li><p><code translate="no">NN_DESCENT</code>: Bietet eine schnellere Erstellung bei möglicherweise geringerer Wiederauffindungsrate.</p></li></ul></td>
     <td><p><code translate="no">IVF_PQ</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>Legt fest, ob der ursprüngliche Datensatz im GPU-Speicher zwischengespeichert werden soll. Mögliche Werte:</p><ul><li><p><code translate="no">"true"</code>: Speichert den ursprünglichen Datensatz im Cache, um den Recall durch Verfeinerung der Suchergebnisse zu verbessern.</p></li><li><p><code translate="no">"false"</code>: Speichert den ursprünglichen Datensatz nicht im Cache, um GPU-Speicher zu sparen.</p></li></ul></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">adapt_for_cpu</code></p></td>
     <td><p>Legt fest, ob die GPU für die Indizierung und die CPU für die Suche verwendet werden soll.</p><p>Wenn dieser Parameter auf „ <code translate="no">"true"</code> “ gesetzt wird, muss der Parameter „ <code translate="no">ef</code> “ in den Suchanfragen vorhanden sein.</p></td>
     <td><p><code translate="no">"false"</code></p></td>
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
    </button></h3><p>Die folgende Tabelle listet die Parameter auf, die bei <a href="/docs/de/v2.6.x/gpu-cagra.md#Search-on-index">der Suche im Index</a> unter „ <code translate="no">search_params.params</code> “ konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Standardwert</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">itopk_size</code></p></td>
     <td><p>Legt die Größe der Zwischenergebnisse fest, die während der Suche beibehalten werden. Ein höherer Wert kann den Wiederauffindungsgrad verbessern, geht jedoch zu Lasten der Suchleistung. Er sollte mindestens dem endgültigen „Top-k“-Wert (Limit) entsprechen und ist in der Regel eine Potenz von 2 (z. B. 16, 32, 64, 128).</p></td>
     <td><p>Leer</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_width</code></p></td>
     <td><p>Gibt die Anzahl der Einstiegspunkte in den CAGRA-Graphen während der Suche an. Eine Erhöhung dieses Werts kann den Recall verbessern, kann sich jedoch auf die Suchleistung auswirken (z. B. 1, 2, 4, 8, 16, 32).</p></td>
     <td><p>Leer</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_random_samplings</code></p></td>
     <td><p>Steuert, in welchem Umfang CAGRA bei der Auswahl der anfänglichen Einstiegspunkte für die Graphensuche Zufallsstichproben durchführt. Ein größerer Wert gibt CAGRA mehr Chancen, von besseren Punkten auszugehen, was den Recall verbessert, jedoch auf Kosten einer erhöhten Suchlatenz geht. Der Wert muss mindestens „ <code translate="no">1</code> “ betragen. Verfügbar ab Milvus 2.6.20+.</p></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></p></td>
     <td><p>Steuert den Suchiterationsprozess. Standardmäßig sind sie auf „ <code translate="no">0</code> “ gesetzt, und CAGRA bestimmt die Anzahl der Iterationen automatisch auf der Grundlage von „ <code translate="no">itopk_size</code> “ und „ <code translate="no">search_width</code> “. Eine manuelle Anpassung dieser Werte kann helfen, ein Gleichgewicht zwischen Leistung und Genauigkeit herzustellen.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">team_size</code></p></td>
     <td><p>Legt die Anzahl der CUDA-Threads fest, die zur Berechnung des metrischen Abstands auf der GPU verwendet werden. Übliche Werte sind Potenzen von 2 bis einschließlich 32 (z. B. 2, 4, 8, 16, 32). Dies hat einen geringen Einfluss auf die Suchleistung. Der Standardwert ist „ <code translate="no">0</code> “, wobei Milvus den „ <code translate="no">team_size</code> “ automatisch basierend auf der Vektordimension auswählt.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Legt den Kompromiss zwischen Abfragezeit und Genauigkeit fest. Ein höherer Wert für „ <code translate="no">ef</code> “ führt zu einer genaueren, aber langsameren Suche.</p><p>Dieser Parameter ist obligatorisch, wenn Sie beim Erstellen des Indexes „ <code translate="no">adapt_for_cpu</code> “ auf „ <code translate="no">true</code> “ setzen.</p></td>
     <td><p><code translate="no">[top_k, int_max]</code></p></td>
   </tr>
</table>
