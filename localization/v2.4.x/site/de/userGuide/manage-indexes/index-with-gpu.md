---
id: index-with-gpu.md
order: 3
summary: >-
  Diese Anleitung erklärt, wie man einen Index mit GPU-Unterstützung in Milvus
  erstellt, um die Suchleistung zu verbessern.
title: Index mit GPU
---
<h1 id="Index-with-GPU" class="common-anchor-header">Index mit GPU<button data-href="#Index-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieser Leitfaden beschreibt die Schritte zur Erstellung eines Indexes mit GPU-Unterstützung in Milvus, der die Suchleistung in Szenarien mit hohem Durchsatz und hohem Abruf erheblich verbessern kann. Einzelheiten zu den von Milvus unterstützten GPU-Indexen finden Sie unter <a href="/docs/de/v2.4.x/gpu_index.md">GPU-Index</a>.</p>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">Konfigurieren Sie die Milvus-Einstellungen für die GPU-Speichersteuerung<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus verwendet einen globalen Grafikspeicherpool, um GPU-Speicher zuzuweisen.</p>
<p>Es unterstützt zwei Parameter <code translate="no">initMemSize</code> und <code translate="no">maxMemSize</code> in der <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus-Konfigurationsdatei</a>. Die Poolgröße ist anfänglich auf <code translate="no">initMemSize</code> eingestellt und wird automatisch auf <code translate="no">maxMemSize</code> erweitert, wenn diese Grenze überschritten wird.</p>
<p>Der Standardwert <code translate="no">initMemSize</code> ist 1/2 des verfügbaren GPU-Speichers, wenn Milvus startet, und der Standardwert <code translate="no">maxMemSize</code> ist gleich dem gesamten verfügbaren GPU-Speicher.</p>
<p>Bis zu Milvus 2.4.1 (einschließlich Version 2.4.1) verwendete Milvus einen einheitlichen GPU-Speicherpool. Für Versionen vor 2.4.1 (einschließlich Version 2.4.1) wurde empfohlen, beide Werte auf 0 zu setzen.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Ab Milvus 2.4.1 wird der GPU-Speicherpool nur noch für temporäre GPU-Daten während der Suche verwendet. Es wird daher empfohlen, ihn auf 2048 und 4096 zu setzen.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-an-index" class="common-anchor-header">Einen Index erstellen<button data-href="#Build-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgenden Beispiele zeigen, wie man GPU-Indizes verschiedener Typen erstellt.</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">Vorbereiten der Indexparameter</h3><p>Beim Einrichten von GPU-Indexparametern müssen <strong>index_type</strong>, <strong>metric_type</strong> und <strong>params</strong> definiert werden:</p>
<ul>
<li><p><strong>index_type</strong><em>(string</em>): Der Typ des Index, der zur Beschleunigung der Vektorsuche verwendet wird. Gültige Optionen sind <strong>GPU_CAGRA</strong>, <strong>GPU_IVF_FLAT</strong>, <strong>GPU_IVF_PQ</strong> und <strong>GPU_BRUTE_FORCE</strong>.</p></li>
<li><p><strong>metric_type</strong><em>(Zeichenfolge</em>): Der Typ der Metrik, die zur Messung der Ähnlichkeit von Vektoren verwendet wird. Gültige Optionen sind <strong>IP</strong> und <strong>L2</strong>.</p></li>
<li><p><strong>params</strong><em>(dict</em>): Die indexspezifischen Bauparameter. Die gültigen Optionen für diesen Parameter hängen vom Indextyp ab.</p></li>
</ul>
<p>Hier sind Beispielkonfigurationen für verschiedene Indextypen:</p>
<ul>
<li><p><strong>GPU_CAGRA-Index</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_CAGRA&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&#x27;intermediate_graph_degree&#x27;</span>: <span class="hljs-number">64</span>,
        <span class="hljs-string">&#x27;graph_degree&#x27;</span>: <span class="hljs-number">32</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Mögliche Optionen für <strong>params</strong> sind:</p>
<ul>
<li><p><strong>intermediate_graph_degree</strong><em>(int</em>): Beeinflusst den Abruf und die Erstellungszeit, indem der Grad des Graphen vor dem Pruning bestimmt wird. Empfohlene Werte sind <strong>32</strong> oder <strong>64</strong>.</p></li>
<li><p><strong>graph_degree</strong><em>(int</em>): Beeinflusst die Suchleistung und die Wiederauffindbarkeit, indem der Grad des Graphen nach dem Pruning festgelegt wird. Normalerweise beträgt er die Hälfte des <strong>intermediate_graph_degree</strong>. Ein größerer Unterschied zwischen diesen beiden Graden führt zu einer längeren Erstellungszeit. Sein Wert muss kleiner sein als der Wert von <strong>intermediate_graph_degree</strong>.</p></li>
<li><p><strong>build_algo</strong><em>(String</em>): Wählt den Algorithmus zur Graphenerzeugung vor dem Pruning. Mögliche Optionen:</p>
<ul>
<li><p><strong>IVF_PQ</strong>: Bietet eine höhere Qualität, aber eine langsamere Erstellungszeit.</p></li>
<li><p><strong>NN_DESCENT</strong>: Bietet einen schnelleren Aufbau mit potenziell geringerer Wiedererkennung.</p></li>
</ul></li>
<li><p><strong>cache_dataset_on_device</strong><em>(string</em>, <strong>"true"</strong> | <strong>"false")</strong>: Legt fest, ob der Originaldatensatz im GPU-Speicher zwischengespeichert werden soll. Die Einstellung <strong>"true"</strong> erhöht die Wiederauffindbarkeit durch Verfeinerung der Suchergebnisse, während die Einstellung <strong>"false"</strong> den GPU-Speicher schont.</p></li>
</ul></li>
<li><p><strong>GPU_IVF_FLAT</strong> oder <strong>GPU_IVF_PQ</strong> Index</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Or GPU_IVF_PQ</span>
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Die <strong>params-Optionen</strong> sind identisch mit denen, die in <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong> und <strong><a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong> verwendet werden.</p></li>
<li><p><strong>GPU_BRUTE_FORCE</strong> index</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>Es sind keine zusätzlichen <strong>Parameterkonfigurationen</strong> erforderlich.</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">Index erstellen</h3><p>Nach der Konfiguration der Index-Parameter in <strong>index_params</strong>, rufen Sie die <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a> Methode auf, um den Index zu erstellen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">Suche<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie Ihren GPU-Index erstellt haben, müssen Sie im nächsten Schritt die Suchparameter vorbereiten, bevor Sie eine Suche durchführen können.</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">Vorbereiten der Suchparameter</h3><p>Nachfolgend finden Sie Beispielkonfigurationen für verschiedene Indextypen:</p>
<ul>
<li><p><strong>GPU_BRUTE_FORCE-Index</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>Es sind keine zusätzlichen <strong>Parameter-Konfigurationen</strong> erforderlich.</p></li>
<li><p><strong>GPU_CAGRA-Index</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;min_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;max_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;team_size&quot;</span>: <span class="hljs-number">0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Die wichtigsten Suchparameter sind:</p>
<ul>
<li><p><strong>itopk_size</strong>: Bestimmt die Größe der Zwischenergebnisse, die während der Suche gespeichert werden. Ein größerer Wert kann die Wiederauffindbarkeit auf Kosten der Suchleistung verbessern. Er sollte mindestens gleich dem endgültigen Top-k-Wert<strong>(Grenzwert</strong>) sein und ist in der Regel eine Potenz von 2 (z. B. 16, 32, 64, 128).</p></li>
<li><p><strong>search_width</strong>: Gibt die Anzahl der Einstiegspunkte in den CAGRA-Graphen während der Suche an. Eine Erhöhung dieses Wertes kann die Wiederauffindbarkeit verbessern, kann aber die Suchleistung beeinträchtigen.</p></li>
<li><p><strong>min_iterations</strong> / <strong>max_iterations</strong>: Diese Parameter steuern den Iterationsprozess der Suche. Standardmäßig sind sie auf <strong>0</strong> gesetzt, und CAGRA bestimmt die Anzahl der Iterationen automatisch anhand von <strong>itopk_size</strong> und <strong>search_width</strong>. Eine manuelle Anpassung dieser Werte kann helfen, Leistung und Genauigkeit auszugleichen.</p></li>
<li><p><strong>team_size</strong>: Gibt die Anzahl der CUDA-Threads an, die für die Berechnung des metrischen Abstands auf der GPU verwendet werden. Übliche Werte sind eine Potenz von 2 bis zu 32 (z. B. 2, 4, 8, 16, 32). Er hat einen geringen Einfluss auf die Suchleistung. Der Standardwert ist <strong>0</strong>, wobei Milvus die <strong>team_size</strong> automatisch auf der Grundlage der Vektordimension auswählt.</p></li>
</ul></li>
<li><p><strong>GPU_IVF_FLAT-</strong> oder <strong>GPU_IVF_PQ-Index</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>Die Suchparameter für diese beiden Indextypen sind ähnlich wie die für <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> und <a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong> verwendeten. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/search.md#Prepare-search-parameters">Durchführen einer Vektorähnlichkeitssuche</a>.</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">Durchführen einer Suche</h3><p>Verwenden Sie die <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a> Methode, um eine Vektorähnlichkeitssuche im GPU-Index durchzuführen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load data into memory</span>
collection.load()

collection.search(
    data=[[query_vector]], <span class="hljs-comment"># Your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field</span>
    param=search_params,
    limit=<span class="hljs-number">100</span> <span class="hljs-comment"># Number of the results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Grenzen<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei der Verwendung von GPU-Indizes müssen bestimmte Einschränkungen beachtet werden:</p>
<ul>
<li><p>Für <strong>GPU_IVF_FLAT</strong> beträgt der Höchstwert für <strong>limit</strong> 1024.</p></li>
<li><p>Für <strong>GPU_IVF_PQ</strong> und <strong>GPU_CAGRA</strong> ist der Höchstwert für <strong>limit</strong> 1024.</p></li>
<li><p>Für <strong>GPU_BRUTE_FORCE</strong> gibt es zwar keinen festen <strong>Grenzwert</strong>, es wird jedoch empfohlen, 4096 nicht zu überschreiten, um mögliche Leistungsprobleme zu vermeiden.</p></li>
<li><p>Derzeit unterstützen GPU-Indizes keinen COSINE-Abstand. Wenn der COSINE-Abstand erforderlich ist, sollten die Daten zunächst normalisiert werden, und dann kann der Innenproduktabstand (IP) als Ersatz verwendet werden.</p></li>
<li><p>Das Laden von OOM-Schutz für GPU-Indizes wird nicht vollständig unterstützt, zu viele Daten können zum Absturz von QueryNode führen.</p></li>
<li><p>GPU-Indizes unterstützen keine Suchfunktionen wie <a href="https://milvus.io/docs/single-vector-search.md#Range-search">Bereichssuche</a> und <a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">Gruppierungssuche</a>.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Wann ist es sinnvoll, einen GPU-Index zu verwenden?</strong></p>
<p>Ein GPU-Index ist besonders vorteilhaft in Situationen, die einen hohen Durchsatz oder eine hohe Wiederauffindung erfordern. Bei großen Stapeln kann der Durchsatz der GPU-Indizierung beispielsweise den der CPU-Indizierung um das 100-fache übertreffen. In Szenarien mit kleineren Stapeln übertrifft die GPU-Indizierung die CPU-Indizierung in Bezug auf die Leistung immer noch deutlich. Darüber hinaus kann der Einsatz eines Grafikprozessors den Prozess der Indexerstellung erheblich beschleunigen, wenn Daten schnell eingefügt werden müssen.</p></li>
<li><p><strong>Für welche Szenarien sind GPU-Indizes wie CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT und GPU_BRUTE_FORCE am besten geeignet?</strong></p>
<p>CAGRA-Indizes sind ideal für Szenarien, die eine höhere Leistung erfordern, auch wenn dies mit einem höheren Speicherbedarf einhergeht. In Umgebungen, in denen Speicherplatzeinsparung Priorität hat, kann der <strong>GPU_IVF_PQ-Index</strong> dazu beitragen, die Speicheranforderungen zu minimieren, auch wenn dies mit einem höheren Präzisionsverlust einhergeht. Der <strong>GPU_IVF_FLAT-Index</strong> stellt eine ausgewogene Option dar, die einen Kompromiss zwischen Leistung und Speicherbedarf bietet. Der <strong>GPU_BRUTE_FORCE-Index</strong> schließlich ist für erschöpfende Suchvorgänge konzipiert und garantiert durch die Durchführung von Traversalsuchen eine Abrufrate von 1.</p></li>
</ul>
