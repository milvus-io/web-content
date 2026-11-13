---
id: fmindex.md
title: FMINDEX
summary: >-
  El índice FMINDEX es un índice de subcadenas exacto a nivel de byte para
  campos VARCHAR. Responde a consultas LIKE con anclaje —coincidencia de
  prefijos, infijos y sufijos— sin necesidad de volver a comprobar los
  candidatos, lo que lo hace ideal para la búsqueda de subcadenas en textos
  largos.
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
    </button></h1><p>El índice « <code translate="no">FMINDEX</code> » de Milvus es un índice de subcadenas exacto a nivel de byte para campos de tipo « <code translate="no">VARCHAR</code> ». Responde a consultas « <code translate="no">LIKE</code> » ancladas con coincidencia de prefijo, infijo o sufijo, y devuelve coincidencias exactas sin necesidad de volver a comprobar los candidatos.</p>
<p>Utiliza el índice « <code translate="no">FMINDEX</code> » si ejecutas con frecuencia filtros de subcadenas, como por ejemplo:</p>
<ul>
<li><p><code translate="no">title LIKE &quot;vector%&quot;</code> (prefijo)</p></li>
<li><p><code translate="no">title LIKE &quot;%database&quot;</code> (sufijo)</p></li>
<li><p><code translate="no">title LIKE &quot;%vector database%&quot;</code> (infijo / subcadena)</p></li>
</ul>
<p>A diferencia de « <code translate="no">NGRAM</code> », que reduce la lista de candidatos y luego vuelve a comprobarlos, « <code translate="no">FMINDEX</code> » puede resolver patrones de prefijo, sufijo e infijo anclados directamente desde el índice.</p>
<h2 id="Supported-data-types" class="common-anchor-header">Tipos de datos admitidos<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
<li><code translate="no">VARCHAR</code> campos. Para más detalles, consulta <a href="/docs/es/string.md">«Campo de cadena</a>».</li>
</ul>
<p><code translate="no">FMINDEX</code> Solo es compatible con los campos de tipo « <code translate="no">VARCHAR</code> ». No es compatible con los campos de tipo « <code translate="no">JSON</code> » ni con las rutas de tipo « <code translate="no">JSON</code> » convertidas a « <code translate="no">VARCHAR</code> ».</p>
<h2 id="How-it-works" class="common-anchor-header">Cómo funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">FMINDEX</code> Se trata de un índice FM de texto completo, una estructura comprimida construida a partir de la transformada de Burrows-Wheeler (BWT) de los valores de campo concatenados, junto con una matriz de sufijos muestreada y un árbol de ondículas para consultas de rango. Esta estructura admite <em>la búsqueda hacia atrás</em>: dado un patrón, Milvus recorre el patrón desde su último carácter hasta el primero para encontrar el rango exacto de entidades cuyo texto contenga el patrón.</p>
<p>En el momento de la consulta, Milvus utiliza el índice para:</p>
<ol>
<li><p><strong>Localizar coincidencias</strong> para el literal anclado extraído de un patrón « <code translate="no">LIKE</code> ».</p></li>
<li><p><strong>Devolver los ID exactos de las entidades</strong> para literales de prefijo, sufijo e infijo sin volver a comprobar los valores originales.</p></li>
</ol>
<p>En el caso de patrones con varios literales no adyacentes ( <code translate="no">LIKE</code> general) o expresiones regulares complejas, <code translate="no">FMINDEX</code> puede generar candidatos que Milvus verifica posteriormente comparándolos con los valores originales.</p>
<h2 id="Create-an-FMINDEX-index" class="common-anchor-header">Crear un índice FMINDEX<button data-href="#Create-an-FMINDEX-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede crear un índice « <code translate="no">FMINDEX</code> » en un campo « <code translate="no">VARCHAR</code> ». Ambos parámetros de compilación son opcionales; déjelos sin definir para que se utilicen los valores predeterminados del servidor.</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Valores permitidos</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fm_sa_sample_rate</code></td><td>Frecuencia de muestreo de la matriz de sufijos. Equilibra el tamaño del índice con la latencia de la búsqueda; no afecta a las consultas de solo recuento.</td><td>Número entero entre 4 y 256</td><td>8</td></tr>
<tr><td><code translate="no">fm_block_bytes</code></td><td>Granularidad de los bloques del directorio de clasificación en bytes. Los bloques más grandes reducen el tamaño del directorio residente.</td><td>8, 16, 32, 64 o 128</td><td>64</td></tr>
</tbody>
</table>
<p>El siguiente ejemplo muestra cómo crear un índice « <code translate="no">FMINDEX</code> » en un campo « <code translate="no">VARCHAR</code> »:</p>
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
<h2 id="Queries-accelerated-by-FMINDEX" class="common-anchor-header">Consultas aceleradas por FMINDEX<button data-href="#Queries-accelerated-by-FMINDEX" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">FMINDEX</code> <code translate="no">VARCHAR</code> acelera los siguientes patrones de filtro en un campo « ». Los literales de prefijo, sufijo e infijo anclados se resuelven exactamente a partir del índice; los patrones generales de « » y expresiones regulares producen candidatos que Milvus verifica comparándolos con los valores originales. <code translate="no">LIKE</code> </p>
<ul>
<li><p><strong>Coincidencia de prefijo</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;vector%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Coincidencia de sufijo</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Coincidencia de infijo/subcadena</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%vector database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>LIKE general (candidatos)</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;a%b_c&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Expresión regular (candidatos)</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Para obtener más información sobre la sintaxis de las expresiones de filtro, consulta <a href="/docs/es/pattern-matching.md">«Coincidencia de patrones</a>».</p>
<h2 id="Drop-an-index" class="common-anchor-header">Eliminar un índice<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilice el método ` <code translate="no">drop_index()</code> ` para eliminar un índice existente de una colección.</p>
<div class="alert note">
<ul>
<li><p>En <strong>la versión 2.6.3</strong> o anteriores, debes liberar la colección antes de eliminar un índice escalar.</p></li>
<li><p>A partir de <strong>la versión 2.6.4</strong> o posteriores, puedes eliminar un índice escalar directamente una vez que ya no sea necesario, sin necesidad de liberar primero la colección.</p></li>
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
<h2 id="Usage-notes" class="common-anchor-header">Notas de uso<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Tipos de campo:</strong> solo funciona con campos de tipo « <code translate="no">VARCHAR</code> ». Para obtener más información sobre los tipos de datos, consulta <a href="/docs/es/string.md">«Campo de cadena</a>».</p></li>
<li><p><strong>Compatibilidad de versiones:</strong> « <code translate="no">FMINDEX</code> » requiere la versión 5 o posterior del motor de índices escalares.</p></li>
<li><p><strong>Disponibilidad del SDK:</strong> El SDK de Rust v2 aún no incluye el tipo de índice « <code translate="no">FMINDEX</code> ».</p></li>
<li><p><strong>Coincidencia exacta:</strong> Los literales de « <code translate="no">LIKE</code> » con prefijo, sufijo e infijo anclados devuelven coincidencias exactas sin necesidad de volver a comprobar los candidatos.</p></li>
<li><p><strong>Candidatos:</strong> Los patrones generales de « <code translate="no">LIKE</code> » y de expresiones regulares pueden generar candidatos que Milvus verifica comparándolos con los valores originales. Cuando un patrón ofrece un filtrado poco útil o su resolución resulta demasiado costosa, Milvus puede optar por escanear el campo en su lugar.</p></li>
<li><p><strong>Inmutabilidad:</strong> Los valores de « <code translate="no">fm_sa_sample_rate</code> » y « <code translate="no">fm_block_bytes</code> » no se pueden modificar in situ; para ajustarlos, hay que reconstruir el índice.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Prácticas recomendadas<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p>Utiliza <code translate="no">FMINDEX</code> para la búsqueda exacta de subcadenas en campos largos de <code translate="no">VARCHAR</code>, especialmente cuando <code translate="no">NGRAM</code> la reverificación de candidatos resulta costosa.</p></li>
<li><p>Mantenga el valor predeterminado de « <code translate="no">fm_block_bytes</code> » en 64 para la mayoría de las cargas de trabajo; auméntelo para reducir el directorio residente cuando la memoria sea escasa.</p></li>
<li><p>Reducir <code translate="no">fm_sa_sample_rate</code> mejora la latencia de la búsqueda con «locate» a costa de un índice más grande; auméntalo para reducir el tamaño del índice cuando las consultas sean principalmente de recuento.</p></li>
</ul>
