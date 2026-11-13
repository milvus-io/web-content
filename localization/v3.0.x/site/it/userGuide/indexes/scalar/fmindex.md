---
id: fmindex.md
title: FMINDEX
summary: >-
  L'indice FMINDEX è un indice esatto a livello di byte per sottostringhe nei
  campi VARCHAR. Risponde alle query LIKE con ancoraggio — corrispondenza di
  prefisso, infisso e suffisso — senza necessità di ricontrollare i candidati,
  rendendolo ideale per la ricerca di sottostringhe in testi lunghi.
---
<h1 id="FMINDEX" class="common-anchor-header">FMINDEX<button data-href="#FMINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice " <code translate="no">FMINDEX</code> " in Milvus è un indice esatto a livello di byte per sottostringhe relativo ai campi " <code translate="no">VARCHAR</code> ". Risponde alle query " <code translate="no">LIKE</code> " con ancoraggio, con corrispondenza di prefisso, infisso o suffisso, e restituisce corrispondenze esatte senza una verifica incrociata dei candidati.</p>
<p>Utilizzare l’indice <code translate="no">FMINDEX</code> se si eseguono frequentemente filtri di sottostringa, ad esempio:</p>
<ul>
<li><p><code translate="no">title LIKE &quot;vector%&quot;</code> (prefisso)</p></li>
<li><p><code translate="no">title LIKE &quot;%database&quot;</code> (suffisso)</p></li>
<li><p><code translate="no">title LIKE &quot;%vector database%&quot;</code> (infisso / sottostringa)</p></li>
</ul>
<p>A differenza di ` <code translate="no">NGRAM</code>`, che restringe i candidati e poi effettua una nuova verifica, ` <code translate="no">FMINDEX</code> ` è in grado di risolvere modelli di prefisso, suffisso e infisso ancorati direttamente dall’indice.</p>
<h2 id="Supported-data-types" class="common-anchor-header">Tipi di dati supportati<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
<li><code translate="no">VARCHAR</code> campi. Per ulteriori dettagli, consultare <a href="/docs/it/string.md">Campo stringa</a>.</li>
</ul>
<p><code translate="no">FMINDEX</code> È supportato solo sui campi di tipo ` <code translate="no">VARCHAR</code> `. Non supporta i campi di tipo ` <code translate="no">JSON</code> ` né i percorsi ` <code translate="no">JSON</code> ` convertiti in ` <code translate="no">VARCHAR</code>`.</p>
<h2 id="How-it-works" class="common-anchor-header">Come funziona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">FMINDEX</code> È un indice FM full-text, una struttura compressa costruita a partire dalla trasformazione di Burrows-Wheeler (BWT) dei valori dei campi concatenati, insieme a un array di suffissi campionati e a un albero wavelet per le query di rango. Questo layout supporta <em>la ricerca a ritroso</em>: dato un pattern, Milvus lo percorre dall’ultimo carattere al primo per trovare l’intervallo esatto di entità il cui testo contiene il pattern.</p>
<p>Al momento della query, Milvus utilizza l’indice per:</p>
<ol>
<li><p><strong>Individuare le corrispondenze</strong> per il letterale ancorato estratto da un pattern di tipo « <code translate="no">LIKE</code> ».</p></li>
<li><p><strong>Restituire gli ID esatti delle entità</strong> per i letterali prefissi, suffissi e infissi senza ricontrollare i valori originali.</p></li>
</ol>
<p>Per i pattern con più letterali non adiacenti ( <code translate="no">LIKE</code> generale) o espressioni regolari complesse, l’operazione « <code translate="no">FMINDEX</code> » può produrre candidati che Milvus verifica successivamente confrontandoli con i valori originali.</p>
<h2 id="Create-an-FMINDEX-index" class="common-anchor-header">Creare un indice FMINDEX<button data-href="#Create-an-FMINDEX-index" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile creare un indice <code translate="no">FMINDEX</code> su un campo <code translate="no">VARCHAR</code>. Entrambi i parametri di compilazione sono opzionali; lasciarli non impostati per utilizzare i valori predefiniti del server.</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Valori consentiti</th><th>Predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fm_sa_sample_rate</code></td><td>Frequenza di campionamento dell'array dei suffissi. Bilancia la dimensione dell'indice con la latenza di localizzazione; non influisce sulle query di solo conteggio.</td><td>Numero intero compreso tra 4 e 256</td><td>8</td></tr>
<tr><td><code translate="no">fm_block_bytes</code></td><td>Granularità dei blocchi della directory di classificazione in byte. Blocchi più grandi riducono le dimensioni della directory residente.</td><td>8, 16, 32, 64 o 128</td><td>64</td></tr>
</tbody>
</table>
<p>L'esempio seguente mostra come creare un indice " <code translate="no">FMINDEX</code> " su un campo " <code translate="no">VARCHAR</code> ":</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add FMINDEX index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,           <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FMINDEX&quot;</span>,        <span class="hljs-comment"># Index type is FMINDEX</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;fmindex_index&quot;</span>,  <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    fm_sa_sample_rate=<span class="hljs-number">8</span>,         <span class="hljs-comment"># Optional: suffix-array sampling rate (4-256, default 8)</span></span>
<span class="highlighted-comment-line">    fm_block_bytes=<span class="hljs-number">64</span>            <span class="hljs-comment"># Optional: block granularity in bytes (8/16/32/64/128, default 64)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;log_catalog&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;fm_sa_sample_rate&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>);
params.put(<span class="hljs-string">&quot;fm_block_bytes&quot;</span>, <span class="hljs-string">&quot;64&quot;</span>);

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;log_catalog&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;text&quot;</span>).indexType(IndexParam.IndexType.FMINDEX)
                        .indexName(<span class="hljs-string">&quot;fmindex_index&quot;</span>)
                        .extraParams(params)
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

idx := index.NewFMIndex().WithSaSampleRate(<span class="hljs-number">8</span>).WithBlockBytes(<span class="hljs-number">64</span>)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;log_catalog&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, idx).WithIndexName(<span class="hljs-string">&quot;fmindex_index&quot;</span>))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to create index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">fmindex_index</span><span class="hljs-params">(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;fmindex_index&quot;</span>, milvus::IndexType::FMINDEX)</span></span>;
fmindex_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;fm_sa_sample_rate&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>);
fmindex_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;fm_block_bytes&quot;</span>, <span class="hljs-string">&quot;64&quot;</span>);

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;log_catalog&quot;</span>)
        .<span class="hljs-built_in">AddIndex</span>(fmindex_index));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;log_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;FMINDEX&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;fmindex_index&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">fm_sa_sample_rate</span>: <span class="hljs-number">8</span>, <span class="hljs-attr">fm_block_bytes</span>: <span class="hljs-number">64</span> },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;log_catalog&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;text&quot;,
            &quot;indexName&quot;: &quot;fmindex_index&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;FMINDEX&quot;,
                &quot;fm_sa_sample_rate&quot;: 8,
                &quot;fm_block_bytes&quot;: 64
            }
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Queries-accelerated-by-FMINDEX" class="common-anchor-header">Le query accelerate da FMINDEX<button data-href="#Queries-accelerated-by-FMINDEX" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">FMINDEX</code> <code translate="no">VARCHAR</code> accelera i seguenti modelli di filtro su un campo . I letterali di prefisso, suffisso e infisso ancorati vengono risolti esattamente dall’indice; i modelli generici e regex producono candidati che Milvus verifica rispetto ai valori originali. <code translate="no">LIKE</code> </p>
<ul>
<li><p><strong>Corrispondenza prefisso</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;vector%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Corrispondenza del suffisso</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Corrispondenza infissa / sottostringa</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%vector database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>LIKE generico (candidati)</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;a%b_c&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Espressioni regolari (candidati)</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Per ulteriori informazioni sulla sintassi delle espressioni di filtro, consultare la sezione " <a href="/docs/it/pattern-matching.md">Corrispondenza dei pattern</a>".</p>
<h2 id="Drop-an-index" class="common-anchor-header">Eliminazione di un indice<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare il metodo ` <code translate="no">drop_index()</code> ` per rimuovere un indice esistente da una collezione.</p>
<div class="alert note">
<ul>
<li><p>Nella <strong>versione 2.6.3</strong> o precedenti, è necessario liberare la collezione prima di eliminare un indice scalare.</p></li>
<li><p>A partire <strong>dalla versione 2.6.4</strong> o successive, è possibile eliminare direttamente un indice scalare una volta che non è più necessario, senza dover prima liberare la collezione.</p></li>
</ul>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;log_catalog&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;fmindex_index&quot;</span>       <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;log_catalog&quot;</span>)
        .indexName(<span class="hljs-string">&quot;fmindex_index&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;log_catalog&quot;</span>, <span class="hljs-string">&quot;fmindex_index&quot;</span>))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">DropIndex</span>(milvus::<span class="hljs-built_in">DropIndexRequest</span>()
        .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;log_catalog&quot;</span>)
        .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;fmindex_index&quot;</span>));

<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;log_catalog&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;fmindex_index&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;log_catalog&quot;,
    &quot;indexName&quot;: &quot;fmindex_index&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Note sull'utilizzo<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Tipi di campo:</strong> funziona solo con i campi di tipo ` <code translate="no">VARCHAR</code> `. Per ulteriori informazioni sui tipi di dati, consultare <a href="/docs/it/string.md">Campo stringa</a>.</p></li>
<li><p><strong>Compatibilità delle versioni:</strong> l’ <code translate="no">FMINDEX</code> richiede la versione 5 o successiva del motore di indici scalari.</p></li>
<li><p><strong>Disponibilità dell’SDK:</strong> l’SDK Rust v2 non include ancora il tipo di indice “ <code translate="no">FMINDEX</code> ”.</p></li>
<li><p><strong>Corrispondenza esatta:</strong> i letterali di <code translate="no">LIKE</code> con prefisso, suffisso e infisso ancorati restituiscono corrispondenze esatte senza ricontrollo dei candidati.</p></li>
<li><p><strong>Candidati:</strong> i modelli generici di " <code translate="no">LIKE</code> " e le espressioni regolari possono produrre candidati che Milvus verifica rispetto ai valori originali. Quando un modello fornisce un filtraggio poco utile o è troppo oneroso da risolvere, Milvus può invece eseguire la scansione del campo.</p></li>
<li><p><strong>Immutabilità:</strong> i valori di tipo ` <code translate="no">fm_sa_sample_rate</code> ` e ` <code translate="no">fm_block_bytes</code> ` non possono essere modificati in loco; per modificarli è necessario ricostruire l’indice.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Migliori pratiche<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p>Utilizzare <code translate="no">FMINDEX</code> per la ricerca esatta di sottostringhe in campi <code translate="no">VARCHAR</code> lunghi, specialmente quando la ricontrollo dei candidati <code translate="no">NGRAM</code> è onerosa.</p></li>
<li><p>Mantenere il valore predefinito di <code translate="no">fm_block_bytes</code> a 64 per la maggior parte dei carichi di lavoro; aumentarlo per ridurre la directory residente quando la memoria è limitata.</p></li>
<li><p>Un valore più basso di <code translate="no">fm_sa_sample_rate</code> migliora la latenza di locate a scapito di un indice più grande; aumentarlo per ridurre le dimensioni dell’indice quando le query sono prevalentemente di solo conteggio.</p></li>
</ul>
