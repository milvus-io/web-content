---
id: rtree.md
title: RTREECompatible with Milvus 2.6.4+
summary: >-
  L'indice RTREE è una struttura dati ad albero che accelera le query sui campi
  GEOMETRY. Se la tua raccolta memorizza oggetti geometrici quali punti, linee o
  poligoni in formato WKT (Well-known text) e desideri velocizzare il filtraggio
  spaziale, RTREE è la scelta ideale.
beta: Milvus 2.6.4+
---
<h1 id="RTREE" class="common-anchor-header">RTREE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#RTREE" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice " <code translate="no">RTREE</code> " è una struttura dati ad albero che accelera le query sui campi " <code translate="no">GEOMETRY</code> " in Milvus. Se la tua collezione memorizza oggetti geometrici quali punti, linee o poligoni in formato <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">WKT (Well-known text)</a> e desideri accelerare il filtraggio spaziale, " <code translate="no">RTREE</code> " è la scelta ideale.</p>
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
    </button></h2><p>Milvus utilizza un indice « <code translate="no">RTREE</code> » per organizzare e filtrare in modo efficiente i dati geometrici, seguendo un processo in due fasi:</p>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Fase 1: Creazione dell’indice<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Creazione dei nodi foglia:</strong> per ogni oggetto geometrico, viene calcolato <a href="https://en.wikipedia.org/wiki/Minimum_bounding_rectangle">il</a> suo <a href="https://en.wikipedia.org/wiki/Minimum_bounding_rectangle">rettangolo di delimitazione minimo</a> (MBR), ovvero il rettangolo più piccolo che contiene interamente l’oggetto, e viene memorizzato come nodo foglia.</p></li>
<li><p><strong>Raggruppamento in riquadri più grandi:</strong> raggruppare i nodi foglia vicini e racchiudere ciascun gruppo in un nuovo MBR, formando nodi interni. Ad esempio, il gruppo <strong>B</strong> contiene <strong>D</strong> ed <strong>E</strong>; il gruppo <strong>C</strong> contiene <strong>F</strong> e <strong>G</strong>.</p></li>
<li><p><strong>Aggiunta del nodo radice:</strong> si aggiunge un nodo radice il cui MBR copre tutti i gruppi interni, ottenendo una struttura ad albero bilanciata in altezza.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/how-retree-works.png" alt="How Retree Works" class="doc-image" id="how-retree-works" /> 
   <span>Come funziona Retree</span>
  
 </span></p>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">Fase 2: Accelerare le query<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Formare l’MBR della query:</strong> calcolare l’MBR per la geometria della query.</p></li>
<li><p><strong>Potare i rami:</strong> partendo dalla radice, confrontare l’MBR della query con ciascun nodo interno. Saltare tutti i rami il cui MBR non si interseca con l’MBR della query.</p></li>
<li><p><strong>Raccogli i candidati:</strong> scendi nei rami che si intersecano per raccogliere i nodi foglia candidati.</p></li>
<li><p><strong>Corrispondenza esatta:</strong> per ciascun candidato, eseguire un predicato spaziale esatto per determinare le corrispondenze effettive.</p></li>
</ol>
<h2 id="Create-an-RTREE-index" class="common-anchor-header">Creare un indice RTREE<button data-href="#Create-an-RTREE-index" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile creare un indice RTREE ( <code translate="no">RTREE</code> ) su un campo <code translate="no">GEOMETRY</code> definito nello schema della propria collezione.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a GEOMETRY field named &quot;geo&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add RTREE index on the &quot;geo&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;geo&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;RTREE&quot;</span>,      <span class="hljs-comment"># Spatial index for GEOMETRY</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;rtree_geo&quot;</span>,  <span class="hljs-comment"># Optional, name your index</span></span>
<span class="highlighted-comment-line">    params={}                <span class="hljs-comment"># No extra params needed</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;geo&quot;</span>)
        .indexName(<span class="hljs-string">&quot;rtree_geo&quot;</span>)
        .indexType(IndexParam.IndexType.RTREE)
        .build();

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;geo_demo&quot;</span>)
        .indexParams(Collections.singletonList(indexParam))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;geo_demo&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>, index.NewRTreeIndex()).
    WithIndexName(<span class="hljs-string">&quot;rtree_geo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">index_params</span> = <span class="hljs-built_in">vec!</span>[
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;geo&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;rtree_geo&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Rtree),
];

<span class="hljs-keyword">let</span> <span class="hljs-variable">create_index_req</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_params</span>(index_params)
    .<span class="hljs-title function_ invoke__">build</span>()?;

client.<span class="hljs-title function_ invoke__">create_index</span>(create_index_req).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index</span><span class="hljs-params">(<span class="hljs-string">&quot;geo&quot;</span>, <span class="hljs-string">&quot;rtree_geo&quot;</span>, milvus::IndexType::RTREE)</span></span>;

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
                                 .<span class="hljs-built_in">WithIndexes</span>({index}));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;geo&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">RTREE</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;rtree_geo&quot;</span>,
    <span class="hljs-attr">params</span>: {},
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Assume you have defined a GEOMETRY field named &quot;geo&quot; in your collection schema</span>

<span class="hljs-comment">// Prepare index parameters</span>
<span class="hljs-keyword">var</span> indexParam = <span class="hljs-keyword">new</span> IndexParam(
    fieldName: <span class="hljs-string">&quot;geo&quot;</span>,
    indexName: <span class="hljs-string">&quot;rtree_geo&quot;</span>,
    indexType: IndexType.Rtree);

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;geo_demo&quot;</span>,
    Indexes = [indexParam]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;geo_demo&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;geo&quot;,
            &quot;indexName&quot;: &quot;rtree_geo&quot;,
            &quot;indexType&quot;: &quot;RTREE&quot;,
            &quot;params&quot;: {}
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-with-RTREE" class="common-anchor-header">Eseguire una query con RTREE<button data-href="#Query-with-RTREE" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">RTREE</code> È possibile filtrare utilizzando gli operatori geometrici nell'espressione <code translate="no">filter</code>. Quando esiste un indice RTREE sul campo <code translate="no">GEOMETRY</code> di destinazione, Milvus lo utilizza per eliminare automaticamente i candidati. In assenza dell'indice, il filtro ricorre a una scansione completa.</p>
<p>Per un elenco completo degli operatori specifici per la geometria disponibili, consultare <a href="/docs/it/geometry-operators.md">Operatori geometrici</a>.</p>
<h3 id="Example-1-Filter-only" class="common-anchor-header">Esempio 1: Filtra solo<button data-href="#Example-1-Filter-only" class="anchor-icon" translate="no">
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
    </button></h3><p>Trova tutti gli oggetti geometrici all’interno di un dato poligono:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">filter_expr = <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
    limit=<span class="hljs-number">10</span>
)
<span class="hljs-built_in">print</span>(res)   <span class="hljs-comment"># Expected: a list of rows where geo is entirely inside the polygon</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-type">String</span> <span class="hljs-variable">filter_expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;geo_demo&quot;</span>)
        .filter(filter_expr)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>))
        .limit(<span class="hljs-number">10</span>)
        .build());
System.out.println(resp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

filter_expr := <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>

_, err = cli.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;geo_demo&quot;</span>).
    WithFilter(filter_expr).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>).
    WithLimit(<span class="hljs-number">10</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expr</span> = <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_req</span> = QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
    .<span class="hljs-title function_ invoke__">filter</span>(filter_expr)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>])
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">query</span>(query_req).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string&gt;</span></span>

std::string filter_expr = <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>;

milvus::QueryResponse response;
status = client-&gt;<span class="hljs-built_in">Query</span>(milvus::<span class="hljs-built_in">QueryRequest</span>()
                           .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
                           .<span class="hljs-built_in">WithFilter</span>(filter_expr)
                           .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>})
                           .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>),
                       response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter_expr = <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-attr">filter</span>: filter_expr,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;

<span class="hljs-built_in">string</span> filterExpr = <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>;

QueryResp res = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;geo_demo&quot;</span>,
    Expression = filterExpr,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span> },
        Limit = <span class="hljs-number">10</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d @- &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
{
    <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;ST_WITHIN(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>,
    <span class="hljs-string">&quot;outputFields&quot;</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
    <span class="hljs-string">&quot;limit&quot;</span>: 10
}
EOF
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Vector-search-+-spatial-filter" class="common-anchor-header">Esempio 2: Ricerca vettoriale + filtro spaziale<button data-href="#Example-2-Vector-search-+-spatial-filter" class="anchor-icon" translate="no">
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
    </button></h3><p>Trova i vettori più vicini che intersecano anche una linea:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you&#x27;ve also created an index on &quot;vec&quot; and loaded the collection.</span>
query_vec = [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]]
filter_expr = <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>

hits = client.search(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,
    data=query_vec,
    limit=<span class="hljs-number">5</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>]
)
<span class="hljs-built_in">print</span>(hits)  <span class="hljs-comment"># Expected: top-k by vector similarity among rows whose geo intersects the line</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">float</span>[] query_vec = {<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>};
<span class="hljs-type">String</span> <span class="hljs-variable">filter_expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;geo_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(query_vec)))
        .topK(<span class="hljs-number">5</span>)
        .filter(filter_expr)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>))
        .build());
System.out.println(resp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

query_vec := []entity.Vector{entity.FloatVector{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}}
filter_expr := <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>

_, err = cli.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;geo_demo&quot;</span>, <span class="hljs-number">5</span>, query_vec).
    WithFilter(filter_expr).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vec</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1f32</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>];
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_expr</span> = <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">search_req</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vec&quot;</span>)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vec]))
    .<span class="hljs-title function_ invoke__">filter</span>(filter_expr)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>])
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">search</span>(search_req).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string&gt;</span></span>

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vec = {<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>};
std::string filter_expr = <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>;

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                            .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
                            .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">5</span>)
                            .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vec&quot;</span>)
                            .<span class="hljs-built_in">WithFilter</span>(filter_expr)
                            .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>})
                            .<span class="hljs-built_in">AddFloatVector</span>(query_vec),
                        response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vec = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>];
<span class="hljs-keyword">const</span> filter_expr = <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vec&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vec],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">filter</span>: filter_expr,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Assume you&#x27;ve also created an index on &quot;vec&quot; and loaded the collection.</span>
<span class="hljs-keyword">var</span> queryVec = <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> });
<span class="hljs-built_in">string</span> filterExpr = <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>;

SearchResp hits = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;geo_demo&quot;</span>,
    Vectors = [queryVec],
    VectorFieldName = <span class="hljs-string">&quot;vec&quot;</span>,
    MetricType = MetricType.L2,
    Limit = <span class="hljs-number">5</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filterExpr
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d @- &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
{
    <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-string">&quot;annsField&quot;</span>: <span class="hljs-string">&quot;vec&quot;</span>,
    <span class="hljs-string">&quot;data&quot;</span>: [[0.1, 0.2, 0.3, 0.4, 0.5]],
    <span class="hljs-string">&quot;limit&quot;</span>: 5,
    <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>,
    <span class="hljs-string">&quot;outputFields&quot;</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>]
}
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni su come utilizzare un campo " <code translate="no">GEOMETRY</code> ", consultare <a href="/docs/it/geometry-field.md">Campo geometrico</a>.</p>
<h2 id="Drop-an-index" class="common-anchor-header">Eliminare un indice<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
<li><p>A partire <strong>dalla versione 2.6.4</strong> o successive, è possibile eliminare direttamente un indice scalare quando non è più necessario, senza dover prima liberare la collezione.</p></li>
</ul>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;rtree_geo&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;geo_demo&quot;</span>)
        .indexName(<span class="hljs-string">&quot;rtree_geo&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;geo_demo&quot;</span>, <span class="hljs-string">&quot;rtree_geo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">drop_index_req</span> = DropIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;rtree_geo&quot;</span>)
    .<span class="hljs-title function_ invoke__">build</span>()?;

client.<span class="hljs-title function_ invoke__">drop_index</span>(drop_index_req).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropIndex</span>(milvus::<span class="hljs-built_in">DropIndexRequest</span>()
                               .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;geo_demo&quot;</span>)
                               .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;rtree_geo&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;rtree_geo&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">await</span> client.DropIndexAsync(<span class="hljs-keyword">new</span> DropIndexReq
{
    CollectionName = <span class="hljs-string">&quot;geo_demo&quot;</span>, <span class="hljs-comment">// Name of the collection</span>
    IndexName = <span class="hljs-string">&quot;rtree_geo&quot;</span> <span class="hljs-comment">// Name of the index to drop</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;geo_demo&quot;,
    &quot;indexName&quot;: &quot;rtree_geo&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
