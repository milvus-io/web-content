---
id: search_with_svs_vamana.md
summary: >-
  Creare e effettuare ricerche negli indici grafici SVS Vamana in memoria in
  Milvus tramite il passthrough degli indici FAISS, con compressione opzionale
  LeanVec o LVQ su CPU Intel.
title: Ricerca con SVS Vamana e Milvus
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">Ricerca con SVS Vamana e Milvus<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">SVS</a> (Scalable Vector Search) è la libreria di ricerca vettoriale ad alte prestazioni di Intel che implementa l'algoritmo grafico Vamana. In Milvus, è possibile accedere a SVS Vamana tramite il <a href="https://milvus.io/docs/faiss.md">passthrough dell’indice FAISS</a>: impostare ` <code translate="no">index_type</code> ` su ` <code translate="no">FAISS</code> ` e fornire una stringa ` <code translate="no">SVSVamana</code> ` per la creazione dell’indice; in questo modo, Milvus costruisce ed esegue la ricerca nell’indice tramite l’integrazione SVS di FAISS.</p>
<p>Vamana è la struttura a grafo utilizzata anche da <a href="https://milvus.io/docs/diskann.md">DISKANN</a>, ma SVS Vamana mantiene l’intero grafo in memoria. È inoltre in grado di comprimere i vettori con <strong>LeanVec</strong> o <strong>LVQ</strong>, il che riduce l’utilizzo di memoria e accelera la ricerca, pur raggiungendo un recall molto elevato.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 o versioni successive, compilato dal codice sorgente con SVS abilitato</li>
<li>PyMilvus 3.0.0 o versioni successive</li>
<li>Una CPU Intel se si utilizza un'archivi <code translate="no">LVQ*</code> o <code translate="no">LeanVec*</code>; le archivi <code translate="no">FP32</code>, <code translate="no">FP16</code> e <code translate="no">SQ8</code> funzionano su qualsiasi piattaforma</li>
<li>Familiarità con <a href="https://milvus.io/docs/faiss.md">le stringhe delle factory di indicizzazione FAISS</a></li>
</ul>
<div class="alert note">
<p>SVS non è incluso nella build predefinita di Milvus. Per utilizzare le stringhe " <code translate="no">SVSVamana</code> ", compilare Milvus dal codice sorgente con <code translate="no">make USE_SVS=ON</code>. In una build senza SVS, la creazione dell'indice fallisce perché Faiss non riconosce la stringa della factory.</p>
</div>
<p>La compressione LVQ e LeanVec funziona solo su CPU Intel e risulta più veloce su CPU con AVX-512. Su altre CPU, la creazione dell’indice fallisce per le stringhe di fabbrica <code translate="no">LVQ*</code> e <code translate="no">LeanVec*</code>.</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">Come funziona SVS Vamana<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">Grafo di Vamana<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>SVS Vamana costruisce un grafico di prossimità a singolo strato. Ogni vettore è un nodo, mentre gli archi collegano i vettori che potrebbero essere vicini. Per costruire il grafico, SVS esegue le seguenti operazioni per ogni nodo <strong>x</strong>:</p>
<ol>
<li><p><strong>Ricerca avida</strong>: SVS esplora il grafo costruito fino a quel momento, mantenendo un elenco di candidati di dimensione <code translate="no">construction_window_size</code>.</p></li>
<li><p><strong>Potatura dei vicini</strong>: i nodi visitati diventano vicini candidati per <strong>x</strong>. SVS li considera in ordine crescente di distanza da <strong>x</strong>. Un candidato <code translate="no">c</code> viene saltato se un vicino più prossimo <code translate="no">n</code>, già mantenuto, soddisfa la condizione <code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code>. Ciò consente di mantenere gli archi a lungo raggio ed eliminare quelli ridondanti a corto raggio, permettendo così alla ricerca di saltare da un punto all’altro del grafo anziché percorrerlo un vicino più prossimo alla volta. La potatura termina una volta raggiunto il grado del grafo.</p></li>
<li><p><strong>Archi inversi</strong>: per ogni nuovo vicino di <strong>x</strong>, SVS aggiunge un arco inverso che torna a <strong>x</strong> e pota l’elenco degli archi di quel vicino se supera il grado del grafo.</p></li>
</ol>
<p>La potatura avviene in due passaggi: prima con ` <code translate="no">alpha = 1</code>`, poi con il valore configurato di ` <code translate="no">alpha</code>`. Un grado del grafo più elevato e un valore di ` <code translate="no">construction_window_size</code> ` producono un grafo più denso e di qualità superiore, ma richiedono più memoria e più tempo per la costruzione.</p>
<p>Durante la ricerca, SVS percorre il grafo in modo avido, mantenendo nella ` <code translate="no">search_window_size</code> ` i candidati più vicini individuati fino a quel momento. Esplora sempre il candidato più vicino non ancora visitato. La ricerca termina quando ogni vicino del nodo corrente risulta più distante dalla query rispetto al candidato peggiore presente nella finestra. Un valore più elevato di ` <code translate="no">search_window_size</code> ` esplora una porzione maggiore del grafo, aumentando il richiamo ma anche la latenza.</p>
<h3 id="LeanVec-compression" class="common-anchor-header">Compressione LeanVec<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://openreview.net/forum?id=wczqrpOrIc">LeanVec</a> riduce sia il numero di dimensioni per vettore sia il numero di bit per dimensione. Un indice LeanVec conserva due rappresentazioni di ciascun vettore:</p>
<ul>
<li><p><strong>Primaria (dimensionalità ridotta)</strong>: una proiezione lineare del vettore su un numero minore di dimensioni. La ricerca sul grafo viene eseguita su questo set di dati primario, quindi la maggior parte dei calcoli di distanza avviene nello spazio a dimensionalità inferiore. Ciò riduce sia i requisiti di calcolo che quelli di larghezza di banda della memoria. Per impostazione predefinita, la dimensionalità ridotta è pari alla metà di quella originale (<code translate="no">dim / 2</code>).</p></li>
<li><p><strong>Secondaria (dimensionalità completa)</strong>: il vettore nella sua dimensionalità originale. SVS riclassifica i candidati restituiti dalla ricerca grafica primaria rispetto a questo set di dati secondario per recuperare l’accuratezza persa a causa della riduzione della dimensionalità.</p></li>
</ul>
<p>Entrambe le rappresentazioni sono quantizzate con <a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">LVQ</a> (Locally-adaptive Vector Quantization). La componente di archiviazione della stringa predefinita seleziona la codifica. Ad esempio, <code translate="no">LeanVec4x8</code> utilizza 4 bit per dimensione per il set di dati primario e 8 bit per dimensione per il set di dati secondario. Anche la fase di riclassificazione non legge mai un vettore a piena precisione.</p>
<p>Per impostazione predefinita, LeanVec apprende proiezioni separate per i vettori indicizzati e per le query, al fine di supportare query provenienti da una distribuzione diversa rispetto a quella dei vettori indicizzati (out-of-distribution, o OOD). Ciò funziona particolarmente bene per carichi di lavoro cross-modali come il recupero da testo a immagine, e funziona bene anche quando le query provengono dalla stessa distribuzione dei vettori indicizzati. Milvus non supporta ancora un modo per passare le query per il calcolo delle proiezioni, quindi attualmente vengono utilizzati solo i vettori di base. L’addestramento OOD aumenta i tempi di compilazione. Per velocizzare la compilazione a scapito delle prestazioni delle query, impostare ` <code translate="no">ood_training</code> ` su ` <code translate="no">False</code>`.</p>
<h3 id="LVQ-compression" class="common-anchor-header">Compressione LVQ<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>Per i set di dati con meno di circa 512 dimensioni, saltare la riduzione della dimensionalità e comprimere solo con la quantizzazione LVQ può dare risultati migliori. Come LeanVec, un indice LVQ conserva una rappresentazione primaria per la ricerca veloce e una rappresentazione residua per il re-ranking. Ad esempio, <code translate="no">LVQ4x4</code> utilizza 4 bit per la rappresentazione primaria e 4 bit per quella residua. <code translate="no">LVQ4x0</code> e <code translate="no">LVQ8x0</code> saltano il re-ranking, il che accelera le query se il loro recall è sufficientemente buono per il proprio carico di lavoro.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">Scegliere una stringa predefinita<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>Le stringhe predefinite di SVS Vamana hanno la forma <code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code>, dove <code translate="no">&lt;degree&gt;</code> è il numero massimo di archi per nodo nel grafo.</p>
<table>
<thead>
<tr><th>Stringa predefinita</th><th>Archiviazione</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>Vettori non compressi.</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>Numeri in virgola mobile a 16 bit</td><td>Metà della memoria vettoriale di <code translate="no">FP32</code>, con una perdita di precisione minima.</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>Quantizzazione scalare a 8 bit</td><td>Un quarto della memoria vettoriale di <code translate="no">FP32</code>.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>, <code translate="no">LVQ8x0</code></td><td>LVQ primario, senza residui</td><td>Solo CPU Intel. Nessun riordino.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>, <code translate="no">LVQ4x8</code></td><td>LVQ primario e residuale</td><td>Solo CPU Intel.</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>, <code translate="no">LeanVec4x8</code>, <code translate="no">LeanVec8x8</code></td><td>LeanVec primario e secondario</td><td>solo CPU Intel. Aggiungere il suffisso <code translate="no">_&lt;dim&gt;</code> per impostare la dimensionalità ridotta. Ad esempio, <code translate="no">LeanVec4x8_128</code> riduce il set di dati primario a 128 dimensioni. Senza il suffisso, la dimensionalità ridotta è <code translate="no">dim / 2</code>.</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> è un buon punto di partenza. Da lì:</p>
<ul>
<li><p>Per <strong>un recall più elevato</strong> a scapito di un certo consumo di memoria, aumentare la dimensionalità di LeanVec con il suffisso <code translate="no">_&lt;dim&gt;</code>.</p></li>
<li><p>Per <strong>ridurre l’ingombro</strong> a scapito di un certo recall, diminuire la dimensionalità di LeanVec.</p></li>
<li><p>Per vettori a bassa dimensionalità, provare <code translate="no">LVQ8</code>.</p></li>
<li><p><strong>Su CPU non Intel</strong>, utilizzare <code translate="no">FP16</code> o <code translate="no">SQ8</code>.</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">Creare l’indice<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>L'esempio seguente crea un indice SVS Vamana con grado del grafo pari a 64 e compressione LeanVec. Espandi il blocco di configurazione ed eseguilo prima di creare l'indice.</p>
<p><details></p>
<p><summary>Preparare la raccolta</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;svs_vamana_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Impostare <code translate="no">index_type</code> su <code translate="no">FAISS</code> e utilizzare <code translate="no">faiss_index_name</code> per selezionare la ricetta SVS Vamana.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;svs_vamana_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># SVSVamana64 -&gt; Vamana graph degree 64</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># LeanVec4x8  -&gt; 4-bit primary, 8-bit secondary</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># _128        -&gt; LeanVec dim 128 (omit the suffix for dim / 2)</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;SVSVamana64,LeanVec4x8_128&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;construction_window_size&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># build-time search width</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;ood_training&quot;</span>: <span class="hljs-literal">True</span>,             <span class="hljs-comment"># OOD on (default)</span></span>
<span class="highlighted-comment-line">    },</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-the-index" class="common-anchor-header">Eseguire la ricerca nell’indice<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> controlla il compromesso tra recall e latenza, così come fa <code translate="no">ef</code> per <a href="https://milvus.io/docs/hnsw.md">HNSW</a>. Impostare <code translate="no">search_buffer_capacity</code> su un valore almeno uguale a quello di . Il valore predefinito dell’indice per entrambi è 10 e SVS rifiuta una ricerca il cui <code translate="no">search_window_size</code> sia maggiore del proprio <code translate="no">search_buffer_capacity</code>.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_window_size&quot;</span>: <span class="hljs-number">100</span>,      <span class="hljs-comment"># wider = higher recall, lower QPS</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_buffer_capacity&quot;</span>: <span class="hljs-number">100</span>,  <span class="hljs-comment"># must be &gt;= search_window_size</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

res = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Se <code translate="no">limit</code> è maggiore di <code translate="no">search_window_size</code>, SVS estende la finestra a <code translate="no">limit</code> per quella ricerca.</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">Parametri di SVS Vamana<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>I seguenti parametri di creazione vanno inseriti in <code translate="no">params</code> in <code translate="no">add_index()</code>, accanto a <code translate="no">faiss_index_name</code>. Non è possibile modificarli dopo la creazione dell’indice.</p>
<table>
<thead>
<tr><th>Parametro</th><th>Valore predefinito</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>Dimensione dell’elenco dei candidati utilizzato per individuare i vicini di ciascun nodo durante la costruzione del grafo. Valori più elevati migliorano la qualità del grafo e il recall, ma richiedono più tempo per la costruzione. Impostarlo almeno al grado del grafo. 200 è una scelta comune.</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> per <code translate="no">L2</code>, <code translate="no">0.95</code> per <code translate="no">IP</code> e <code translate="no">COSINE</code></td><td>Intensità di potatura. I valori più lontani da 1 effettuano una potatura più aggressiva, privilegiando i bordi a lungo raggio rispetto a quelli ridondanti a corto raggio. Utilizzare valori superiori a 1 per <code translate="no">L2</code> e inferiori a 1 per <code translate="no">IP</code> e <code translate="no">COSINE</code>. Mantenere l’impostazione predefinita a meno che non sia stato misurato un valore migliore sui propri dati.</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>Grado nella stringa predefinita oppure <code translate="no">32</code></td><td>Numero massimo di archi per nodo. Sovrascrive il grado specificato nella stringa predefinita. Valori compresi nell’intervallo [32, 128] sono adatti alla maggior parte dei carichi di lavoro. Valori più elevati possono aumentare il richiamo, ma richiedono più memoria e tempi di costruzione più lunghi.</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>Grado del grafo meno 4</td><td>Numero di archi che un nodo mantiene dopo il potatura una volta superato il grado del grafo.</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>Numero massimo di candidati considerati durante la potatura dei vicini di un nodo. Dovrebbe essere maggiore di <code translate="no">construction_window_size</code>.</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>Indica se la potatura prende in considerazione tutti i nodi visitati durante la ricerca di costruzione, non solo i candidati finali.</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> suffisso della stringa predefinita o <code translate="no">dim / 2</code></td><td>solo per LeanVec. Dimensionalità ridotta del set di dati primario. Sovrascrive il suffisso della stringa predefinita. Valori più bassi riducono l’utilizzo di memoria e velocizzano la ricerca nel grafo, ma diminuiscono il recall.</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> per LeanVec</td><td>Solo per LeanVec. Indica se apprendere proiezioni separate per i vettori indicizzati e le query. Impostare <code translate="no">False</code> per compilazioni più veloci. L’impostazione di <code translate="no">True</code> per qualsiasi factory diversa da LeanVec non funziona.</td></tr>
</tbody>
</table>
<p>I seguenti parametri di ricerca vanno inseriti in ` <code translate="no">search_params.params</code>`. È anche possibile impostarli come parametri di creazione, il che modifica i valori predefiniti utilizzati dall’indice per le ricerche in cui non sono stati specificati.</p>
<table>
<thead>
<tr><th>Parametro</th><th>Predefinito</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>Numero di candidati più vicini conservati durante la traversata del grafico. Valori più elevati aumentano il recall e la latenza.</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>Capacità del buffer di ricerca. Deve essere maggiore o uguale a <code translate="no">search_window_size</code>. Nella maggior parte dei casi, impostarlo pari a <code translate="no">search_window_size</code>. Per LeanVec, provare 1,5 volte <code translate="no">search_window_size</code>.</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">Ulteriori informazioni<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>Leggi la documentazione di riferimento <a href="https://milvus.io/docs/faiss.md">sul passthrough dell’indice FAISS</a> per il contratto generale factory-string, i limiti e la gestione degli errori.</li>
<li>Confronta con l’implementazione su disco di Vamana in <a href="https://milvus.io/docs/diskann.md">DISKANN</a>.</li>
<li>Consulta il <a href="https://github.com/intel/ScalableVectorSearch">repository SVS</a> per i dettagli sulla compilazione, l’ottimizzazione delle prestazioni e l’API C++ sottostante.</li>
</ul>
