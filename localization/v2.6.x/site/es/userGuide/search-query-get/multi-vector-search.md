---
id: multi-vector-search.md
title: Búsqueda híbrida multivectorial
summary: >-
  En muchas aplicaciones, un objeto puede buscarse mediante un rico conjunto de
  información, como el título y la descripción, o con múltiples modalidades,
  como texto, imágenes y audio. Por ejemplo, un tuit con un fragmento de texto y
  una imagen se buscará si el texto o la imagen coinciden con la semántica de la
  consulta de búsqueda. La búsqueda híbrida mejora la experiencia de búsqueda
  combinando búsquedas en estos diversos campos. Milvus lo soporta permitiendo
  la búsqueda en múltiples campos vectoriales, realizando simultáneamente varias
  búsquedas de Vecino más Cercano Aproximado (RNA). La búsqueda híbrida
  multivectorial es especialmente útil si desea buscar tanto texto como
  imágenes, varios campos de texto que describan el mismo objeto o vectores
  densos y dispersos para mejorar la calidad de la búsqueda.
---
<h1 id="Multi-Vector-Hybrid-Search" class="common-anchor-header">Búsqueda híbrida multivectorial<button data-href="#Multi-Vector-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>En muchas aplicaciones, un objeto puede buscarse mediante un rico conjunto de información, como el título y la descripción, o con múltiples modalidades, como texto, imágenes y audio. Por ejemplo, un tuit con un fragmento de texto y una imagen se buscará si el texto o la imagen coinciden con la semántica de la consulta de búsqueda. La búsqueda híbrida mejora la experiencia de búsqueda combinando búsquedas en estos diversos campos. Milvus lo soporta permitiendo la búsqueda en múltiples campos vectoriales, realizando simultáneamente varias búsquedas de Vecino más Cercano Aproximado (RNA). La búsqueda híbrida multivectorial es especialmente útil si desea buscar tanto texto como imágenes, varios campos de texto que describan el mismo objeto o vectores densos y dispersos para mejorar la calidad de la búsqueda.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hybrid-search-workflow.png" alt="Hybrid Search Workflow" class="doc-image" id="hybrid-search-workflow" />
   </span> <span class="img-wrapper"> <span>Flujo de trabajo de la búsqueda híbrida</span> </span></p>
<p>La búsqueda híbrida multivectorial integra diferentes métodos de búsqueda o abarca incrustaciones de varias modalidades:</p>
<ul>
<li><p><strong>Búsqueda</strong> de<strong>vectores dispersos-densos</strong>: Los <a href="/docs/es/dense-vector.md">vectores densos</a> son excelentes para captar las relaciones semánticas, mientras que <a href="/docs/es/sparse_vector.md">los vectores</a> dispersos son muy eficaces para la concordancia precisa de palabras clave. La búsqueda híbrida combina estos enfoques para proporcionar tanto una amplia comprensión conceptual como la relevancia exacta de los términos, mejorando así los resultados de las búsquedas. Al aprovechar los puntos fuertes de cada método, la búsqueda híbrida supera las limitaciones de los enfoques individuales y ofrece un mejor rendimiento para consultas complejas. Aquí encontrará una <a href="/docs/es/full_text_search_with_milvus.md">guía</a> más detallada sobre la recuperación híbrida que combina la búsqueda semántica con la búsqueda de texto completo.</p></li>
<li><p><strong>Búsqueda vectorial multimodal</strong>: La búsqueda vectorial multimodal es una potente técnica que permite buscar en varios tipos de datos, como texto, imágenes, audio y otros. La principal ventaja de este enfoque es su capacidad para unificar diferentes modalidades en una experiencia de búsqueda fluida y cohesionada. Por ejemplo, en la búsqueda de productos, un usuario puede introducir una consulta de texto para encontrar productos descritos con texto e imágenes. Al combinar estas modalidades mediante un método de búsqueda híbrido, se puede mejorar la precisión de la búsqueda o enriquecer los resultados de la misma.</p></li>
</ul>
<h2 id="Example" class="common-anchor-header">Ejemplo<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h2><p>Consideremos un caso de uso real en el que cada producto incluye una descripción de texto y una imagen. A partir de los datos disponibles, podemos realizar tres tipos de búsqueda:</p>
<ul>
<li><p><strong>Búsqueda semántica de texto:</strong> Se trata de consultar la descripción textual del producto utilizando vectores densos. Los vectores de texto pueden generarse utilizando modelos como <a href="https://zilliz.com/learn/explore-colbert-token-level-embedding-and-ranking-model-for-similarity-search?_gl=1*d243m9*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.#A-Quick-Recap-of-BERT">BERT</a> y <a href="https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI?_gl=1*d243m9*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.">Transformers</a> o servicios como <a href="https://zilliz.com/learn/guide-to-using-openai-text-embedding-models">OpenAI</a>.</p></li>
<li><p><strong>Búsqueda de texto completo</strong>: En este caso, consultamos la descripción textual del producto utilizando una coincidencia de palabras clave con vectores dispersos. Para ello se pueden utilizar algoritmos como <a href="https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus">BM25</a> o modelos de incrustación dispersa como <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings?_gl=1*1cde1oq*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.#BGE-M3">BGE-M3</a> o <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings?_gl=1*ov2die*_gcl_au*MjcyNTAwMzUyLjE3NDMxMzE1MjY.*_ga*MTQ3OTI4MDc5My4xNzQzMTMxNTI2*_ga_KKMVYG8YF2*MTc0NTkwODU0Mi45NC4xLjE3NDU5MDg4MzcuMC4wLjA.#SPLADE">SPLADE</a>.</p></li>
<li><p><strong>Búsqueda multimodal de imágenes:</strong> Este método consulta la imagen utilizando una consulta de texto con vectores densos. Las incrustaciones de imágenes pueden generarse con modelos como <a href="https://zilliz.com/learn/exploring-openai-clip-the-future-of-multimodal-ai-learning">CLIP</a>.</p></li>
</ul>
<p>Esta guía le guiará a través de un ejemplo de búsqueda híbrida multimodal que combina los métodos de búsqueda anteriores, dada la descripción de texto sin procesar y las incrustaciones de imagen de los productos. Demostraremos cómo almacenar datos multivectoriales y realizar búsquedas híbridas con una estrategia de reordenación.</p>
<h2 id="Create-a-collection-with-multiple-vector-fields" class="common-anchor-header">Crear una colección con múltiples campos vectoriales<button data-href="#Create-a-collection-with-multiple-vector-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>El proceso de creación de una colección implica tres pasos clave: definir el esquema de la colección, configurar los parámetros del índice y crear la colección.</p>
<h3 id="Define-schema" class="common-anchor-header">Definir el esquema<button data-href="#Define-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Para la búsqueda híbrida multivectorial, debemos definir múltiples campos vectoriales dentro de un esquema de colección. Para obtener más información sobre los límites del número de campos vectoriales permitidos en una colección, consulte <a href="https://zilliverse.feishu.cn/wiki/PuxkwMWvbiHxvTkHsVkcMZP9n5f#E5yxdHM16okh57xV3WKcTJsYn0f">Límites de Zilliz Cloud</a>.  Sin embargo, si es necesario, puede ajustar el <a href="/docs/es/configure_proxy.md#proxymaxVectorFieldNum"><code translate="no">proxy.maxVectorFieldNum</code></a> para incluir hasta 10 campos vectoriales en una colección según sea necesario.</p>
<p>Este ejemplo incorpora los siguientes campos al esquema:</p>
<ul>
<li><p><code translate="no">id</code>: Sirve como clave primaria para almacenar IDs de texto. Este campo es del tipo de datos <code translate="no">INT64</code>.</p></li>
<li><p><code translate="no">text</code>: Sirve para almacenar contenido textual. Este campo es del tipo de datos <code translate="no">VARCHAR</code> con una longitud máxima de 1000 bytes. La opción <code translate="no">enable_analyzer</code> se establece en <code translate="no">True</code> para facilitar la búsqueda de texto completo.</p></li>
<li><p><code translate="no">text_dense</code>: Se utiliza para almacenar vectores densos de los textos. Este campo es del tipo de datos <code translate="no">FLOAT_VECTOR</code> con una dimensión vectorial de 768.</p></li>
<li><p><code translate="no">text_sparse</code>: Se utiliza para almacenar vectores dispersos de los textos. Este campo es del tipo <code translate="no">SPARSE_FLOAT_VECTOR</code>.</p></li>
<li><p><code translate="no">image_dense</code>: Se utiliza para almacenar vectores densos de imágenes de productos. Este campo es del tipo <code translate="no">FLOAT_VETOR</code> con una dimensión vectorial de 512.</p></li>
</ul>
<p>Dado que utilizaremos el algoritmo integrado BM25 para realizar una búsqueda de texto completo en el campo de texto, es necesario añadir el Milvus <code translate="no">Function</code> al esquema. Para más detalles, consulte <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient, DataType, Function, FunctionType
)

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Init schema with auto_id disabled</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;product id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;raw text of product description&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense embedding&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse embedding auto-generated by the built-in BM25 function&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;image_dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">512</span>, description=<span class="hljs-string">&quot;image dense embedding&quot;</span>)

<span class="hljs-comment"># Add function to schema</span>
bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)
schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;image_dense&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">512</span>)
        .build());

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse&quot;</span>).
    WithType(entity.FunctionTypeBM25)

schema := entity.NewSchema()

schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">1000</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;image_dense&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">512</span>),
).WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SPARSE_FLOAT_VECTOR</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;image_dense&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">512</span>
    }
];

<span class="hljs-comment">// define function</span>
<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_bm25_emb&quot;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;text bm25 function&quot;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;text&quot;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;text_sparse&quot;</span>],
      <span class="hljs-attr">params</span>: {},
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> bm25Function=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;text_bm25_emb&quot;,
    &quot;type&quot;: &quot;BM25&quot;,
    &quot;inputFieldNames&quot;: [&quot;text&quot;],
    &quot;outputFieldNames&quot;: [&quot;text_sparse&quot;],
    &quot;params&quot;: {}
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: false,
        &quot;functions&quot;: [$bm25Function],
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;text_dense&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;768&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;text_sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            },
            {
                &quot;fieldName&quot;: &quot;image_dense&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;512&quot;
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-index" class="common-anchor-header">Crear índice<button data-href="#Create-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Tras definir el esquema de la colección, el siguiente paso es configurar los índices vectoriales y especificar las métricas de similitud. En el ejemplo dado:</p>
<ul>
<li><p><code translate="no">text_dense_index</code>: se crea un índice de tipo <code translate="no">AUTOINDEX</code> con tipo de métrica <code translate="no">IP</code> para el campo vectorial texto denso.</p></li>
<li><p><code translate="no">text_sparse_index</code>se utiliza un índice del tipo<code translate="no">SPARSE_INVERTED_INDEX</code>con el tipo métrico <code translate="no">BM25</code> para el campo vectorial de texto disperso.</p></li>
<li><p><code translate="no">image_dense_index</code>un índice de tipo <code translate="no">AUTOINDEX</code> con tipo métrico <code translate="no">IP</code> se crea para el campo vectorial denso de imagen.</p></li>
</ul>
<p>Puede elegir otros tipos de índice según sea necesario para adaptarse mejor a sus necesidades y tipos de datos. Para más información sobre los tipos de índice soportados, consulta la documentación sobre <a href="/docs/es/index-vector-fields.md">tipos de índice disponibles</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_dense&quot;</span>,
    index_name=<span class="hljs-string">&quot;text_dense_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_name=<span class="hljs-string">&quot;text_sparse_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># or &quot;DAAT_WAND&quot; or &quot;TAAT_NAIVE&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_dense&quot;</span>,
    index_name=<span class="hljs-string">&quot;image_dense_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

Map&lt;String, Object&gt; denseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForTextDense</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense&quot;</span>)
        .indexName(<span class="hljs-string">&quot;text_dense_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build();

Map&lt;String, Object&gt; sparseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
sparseParams.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForTextSparse</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .indexName(<span class="hljs-string">&quot;text_sparse_index&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.BM25)
        .extraParams(sparseParams)
        .build();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForImageDense</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_dense&quot;</span>)
        .indexName(<span class="hljs-string">&quot;image_dense_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForTextDense);
indexParams.add(indexParamForTextSparse);
indexParams.add(indexParamForImageDense);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOption1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;text_dense&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.IP)))
indexOption2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;text_sparse&quot;</span>,
    index.NewSparseInvertedIndex(entity.BM25, <span class="hljs-number">0.2</span>))
indexOption3 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;image_dense&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.IP)))
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text_dense&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;text_dense_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
},{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;text_sparse_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IndexType.SPARSE_INVERTED_INDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">inverted_index_algo</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, 
    }
},{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_dense&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;image_dense_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;text_dense&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;text_dense_index&quot;,
            &quot;indexType&quot;:&quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;text_sparse&quot;,
            &quot;metricType&quot;: &quot;BM25&quot;,
            &quot;indexName&quot;: &quot;text_sparse_index&quot;,
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;,
            &quot;params&quot;:{&quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;}
        },
        {
            &quot;fieldName&quot;: &quot;image_dense&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;image_dense_index&quot;,
            &quot;indexType&quot;:&quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-collection" class="common-anchor-header">Crear colección<button data-href="#Create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Crea una colección llamada <code translate="no">demo</code> con el esquema de colección y los índices configurados en los dos pasos anteriores.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption1, indexOption2))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">index_params</span>: index_params,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">Insertar datos<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta sección inserta datos en la colección <code translate="no">my_collection</code> basándose en el esquema definido anteriormente. Durante la inserción, asegúrate de que todos los campos, excepto aquellos con valores autogenerados, reciben datos en el formato correcto. En este ejemplo</p>
<ul>
<li><p><code translate="no">id</code>un número entero que representa el ID del producto</p></li>
<li><p><code translate="no">text</code>una cadena que contiene la descripción del producto</p></li>
<li><p><code translate="no">text_dense</code>una lista de 768 valores de coma flotante que representan la incrustación densa de la descripción del texto</p></li>
<li><p><code translate="no">image_dense</code>una lista de 512 valores en coma flotante que representan la incrustación densa de la imagen del producto.</p></li>
</ul>
<p>Puede utilizar el mismo modelo o modelos diferentes para generar incrustaciones densas para cada campo. En este ejemplo, las dos incrustaciones densas tienen dimensiones diferentes, lo que sugiere que fueron generadas por modelos diferentes. Cuando defina cada búsqueda más adelante, asegúrese de utilizar el modelo correspondiente para generar la incrustación de consulta adecuada.</p>
<p>Dado que este ejemplo utiliza la función BM25 incorporada para generar incrustaciones dispersas a partir del campo de texto, no es necesario que proporcione vectores dispersos manualmente. Sin embargo, si opta por no utilizar BM25, deberá precalcular y proporcionar los vectores dispersos usted mismo.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Generate example vectors</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_dense_vector</span>(<span class="hljs-params">dim</span>):
    <span class="hljs-keyword">return</span> [random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)]

data=[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>,
        <span class="hljs-string">&quot;text_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">768</span>),
        <span class="hljs-string">&quot;image_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">512</span>)
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>,
        <span class="hljs-string">&quot;text_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">768</span>),
        <span class="hljs-string">&quot;image_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">512</span>)
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>,
        <span class="hljs-string">&quot;text_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">768</span>),
        <span class="hljs-string">&quot;image_dense&quot;</span>: generate_dense_vector(<span class="hljs-number">512</span>)
    }
]

res = client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">0</span>);
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>);
row1.add(<span class="hljs-string">&quot;text_dense&quot;</span>, gson.toJsonTree(text_dense1));
row1.add(<span class="hljs-string">&quot;image_dense&quot;</span>, gson.toJsonTree(image_dense));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>);
row2.add(<span class="hljs-string">&quot;text_dense&quot;</span>, gson.toJsonTree(text_dense2));
row2.add(<span class="hljs-string">&quot;image_dense&quot;</span>, gson.toJsonTree(image_dense2));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>);
row3.add(<span class="hljs-string">&quot;text_dense&quot;</span>, gson.toJsonTree(dense3));
row3.add(<span class="hljs-string">&quot;image_dense&quot;</span>, gson.toJsonTree(sparse3));

List&lt;JsonObject&gt; data = Arrays.asList(row1, row2, row3);
<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>}).
    WithVarcharColumn(<span class="hljs-string">&quot;text&quot;</span>, []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span>,
        <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span>,
        <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span>,
    }).
    WithFloatVectorColumn(<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-number">768</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, ...},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, ...},
    }).
    WithFloatVectorColumn(<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-number">512</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.6366019600530924</span>, <span class="hljs-number">-0.09323198122475052</span>, ...},
        {<span class="hljs-number">0.6414180010301553</span>, <span class="hljs-number">0.8976979978567611</span>, ...},
        {<span class="hljs-number">-0.6901259768402174</span>, <span class="hljs-number">0.6100500332193755</span>, ...},
    }).
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">var</span> data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Red cotton t-shirt with round neck&quot;</span> , <span class="hljs-attr">text_dense</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...], <span class="hljs-attr">image_dense</span>: [<span class="hljs-number">0.6366019600530924</span>, -<span class="hljs-number">0.09323198122475052</span>, ...]},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Wireless noise-cancelling over-ear headphones&quot;</span> , <span class="hljs-attr">text_dense</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, ...], <span class="hljs-attr">image_dense</span>: [<span class="hljs-number">0.6414180010301553</span>, <span class="hljs-number">0.8976979978567611</span>, ...]},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Stainless steel water bottle, 500ml&quot;</span> , <span class="hljs-attr">text_dense</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, ...], <span class="hljs-attr">image_dense</span>: [-<span class="hljs-number">0.6901259768402174</span>, <span class="hljs-number">0.6100500332193755</span>, ...]}
]

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 0, &quot;text&quot;: &quot;Red cotton t-shirt with round neck&quot; , &quot;text_dense&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...], &quot;image_dense&quot;: [0.6366019600530924, -0.09323198122475052, ...]},
        {&quot;id&quot;: 1, &quot;text&quot;: &quot;Wireless noise-cancelling over-ear headphones&quot; , &quot;text_dense&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, ...], &quot;image_dense&quot;: [0.6414180010301553, 0.8976979978567611, ...]},
        {&quot;id&quot;: 2, &quot;text&quot;: &quot;Stainless steel water bottle, 500ml&quot; , &quot;text_dense&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, ...], &quot;image_dense&quot;: [-0.6901259768402174, 0.6100500332193755, ...]}
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-Hybrid-Search" class="common-anchor-header">Realizar una búsqueda híbrida<button data-href="#Perform-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Create-multiple-AnnSearchRequest-instances" class="common-anchor-header">Paso 1: Crear varias instancias de AnnSearchRequest<button data-href="#Step-1-Create-multiple-AnnSearchRequest-instances" class="anchor-icon" translate="no">
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
    </button></h3><p>La Búsqueda Híbrida se implementa creando múltiples <code translate="no">AnnSearchRequest</code> en la función <code translate="no">hybrid_search()</code>, donde cada <code translate="no">AnnSearchRequest</code> representa una petición de búsqueda ANN básica para un campo vectorial específico. Por lo tanto, antes de realizar una Búsqueda Híbrida, es necesario crear un <code translate="no">AnnSearchRequest</code> para cada campo vectorial.</p>
<p>Además, configurando el parámetro <code translate="no">expr</code> en un <code translate="no">AnnSearchRequest</code>, puede establecer las condiciones de filtrado para su búsqueda híbrida. Consulte <a href="/docs/es/boolean.md">Explicación de la</a> <a href="/docs/es/filtered-search.md">búsqueda filtrada</a> y <a href="/docs/es/boolean.md">el filtrado</a>.</p>
<div class="alert note">
<p>En la búsqueda híbrida, cada <code translate="no">AnnSearchRequest</code> sólo admite un dato de consulta.</p>
</div>
<p>Para demostrar las capacidades de varios campos vectoriales de búsqueda, construiremos tres peticiones de búsqueda <code translate="no">AnnSearchRequest</code> utilizando una consulta de ejemplo. También utilizaremos sus vectores densos precalculados para este proceso. Las peticiones de búsqueda se centrarán en los siguientes campos vectoriales</p>
<ul>
<li><p><code translate="no">text_dense</code> para la búsqueda semántica de texto, que permite la comprensión contextual y la recuperación basada en el significado más que en la coincidencia directa de palabras clave.</p></li>
<li><p><code translate="no">text_sparse</code>Búsqueda de texto completo o por palabras clave, centrada en coincidencias exactas de palabras o frases dentro del texto.</p></li>
<li><p><code translate="no">image_dense</code>para la búsqueda multimodal texto-imagen, para recuperar imágenes de productos relevantes basadas en el contenido semántico de la consulta.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

query_text = <span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>
query_dense_vector = generate_dense_vector(<span class="hljs-number">768</span>)
query_multimodal_vector = generate_dense_vector(<span class="hljs-number">512</span>)

<span class="hljs-comment"># text semantic search (dense)</span>
search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_dense_vector],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># full-text search (sparse)</span>
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_text],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># text-to-image search (multimodal)</span>
search_param_3 = {
    <span class="hljs-string">&quot;data&quot;</span>: [query_multimodal_vector],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;image_dense&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
request_3 = AnnSearchRequest(**search_param_3)

reqs = [request_1, request_2, request_3]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.SparseFloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">float</span>[] queryDense = <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.0475336798f</span>,  <span class="hljs-number">0.0521207601f</span>,  <span class="hljs-number">0.0904406682f</span>, ...};
<span class="hljs-type">float</span>[] queryMultimodal = <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.0158298651f</span>, <span class="hljs-number">0.5264158340f</span>, ...}

List&lt;BaseVector&gt; queryTexts = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>);)
List&lt;BaseVector&gt; queryDenseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(queryDense));
List&lt;BaseVector&gt; queryMultimodalVectors = Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(queryMultimodal));

List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_dense&quot;</span>)
        .vectors(queryDenseVectors)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .vectors(queryTexts)
        .params(<span class="hljs-string">&quot;{\&quot;drop_ratio_search\&quot;: 0.2}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;image_dense&quot;</span>)
        .vectors(queryMultimodalVectors)
        .params(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryText := entity.Text({<span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>})
queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...}
queryMultimodalVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.015829865178701663</span>, <span class="hljs-number">0.5264158340734488</span>, ...}

request1 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_dense&quot;</span>, <span class="hljs-number">2</span>, entity.FloatVector(queryVector)).
    WithAnnParam(index.NewIvfAnnParam(<span class="hljs-number">10</span>))

annParam := index.NewSparseAnnParam()
annParam.WithDropRatio(<span class="hljs-number">0.2</span>)
request2 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-number">2</span>, queryText).
    WithAnnParam(annParam)

request3 := milvusclient.NewAnnRequest(<span class="hljs-string">&quot;image_dense&quot;</span>, <span class="hljs-number">2</span>, entity.FloatVector(queryMultimodalVector)).
    WithAnnParam(index.NewIvfAnnParam(<span class="hljs-number">10</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_text = <span class="hljs-string">&quot;white headphones, quiet and comfortable&quot;</span>
<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...]
<span class="hljs-keyword">const</span> query_multimodal_vector = [<span class="hljs-number">0.015829865178701663</span>, <span class="hljs-number">0.5264158340734488</span>, ...]

<span class="hljs-keyword">const</span> search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_vector, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_dense&quot;</span>, 
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">const</span> search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_text, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>, 
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}

<span class="hljs-keyword">const</span> search_param_3 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_multimodal_vector, 
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;image_dense&quot;</span>, 
    <span class="hljs-string">&quot;param&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> req=<span class="hljs-string">&#x27;[
    {
        &quot;data&quot;: [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...]],
        &quot;annsField&quot;: &quot;text_dense&quot;,
        &quot;params&quot;: {&quot;nprobe&quot;: 10},
        &quot;limit&quot;: 2
    },
    {
        &quot;data&quot;: [&quot;white headphones, quiet and comfortable&quot;],
        &quot;annsField&quot;: &quot;text_sparse&quot;,
        &quot;params&quot;: {&quot;drop_ratio_search&quot;: 0.2},
        &quot;limit&quot;: 2
    },
    {
        &quot;data&quot;: [[0.015829865178701663, 0.5264158340734488, ...]],
        &quot;annsField&quot;: &quot;image_dense&quot;,
        &quot;params&quot;: {&quot;nprobe&quot;: 10},
        &quot;limit&quot;: 2
    }
 ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dado que el parámetro <code translate="no">limit</code> se establece en 2, cada <code translate="no">AnnSearchRequest</code> devuelve 2 resultados de búsqueda. En este ejemplo, se crean 3 instancias de <code translate="no">AnnSearchRequest</code>, lo que da un total de 6 resultados de búsqueda.</p>
<h3 id="Step-2-Configure-a-reranking-strategy" class="common-anchor-header">Paso 2: Configurar una estrategia de reordenación<button data-href="#Step-2-Configure-a-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h3><p>Para fusionar y reordenar los conjuntos de resultados de búsqueda de RNA, es esencial seleccionar una estrategia de reordenación adecuada. Milvus ofrece varios tipos de estrategias de reordenación. Para más detalles sobre estos mecanismos de reordenación, consulte <a href="/docs/es/weighted-ranker.md">Weighted Ranker</a> o <a href="/docs/es/rrf-ranker.md">RRF Ranker</a>.</p>
<p>En este ejemplo, dado que no hay un énfasis particular en consultas de búsqueda específicas, procederemos con la estrategia RRFRanker.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">ranker = Function(
    name=<span class="hljs-string">&quot;rrf&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>, 
        <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>  <span class="hljs-comment"># Optional</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-type">Function</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> Function.builder()
        .name(<span class="hljs-string">&quot;rrf&quot;</span>)
        .functionType(FunctionType.RERANK)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>)
        .param(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;100&quot;</span>)
        .build()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;rrf&#x27;</span>,
  <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">params</span>: {
      <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>, 
      <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
)

ranker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;rrf&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;rrf&quot;</span>).
    WithParam(<span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;100&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Restful</span>
<span class="hljs-built_in">export</span> functionScore=<span class="hljs-string">&#x27;{
    &quot;functions&quot;: [
        {
            &quot;name&quot;: &quot;rrf&quot;,
            &quot;type&quot;: &quot;Rerank&quot;,
            &quot;inputFieldNames&quot;: [],
            &quot;params&quot;: {
                &quot;reranker&quot;: &quot;rrf&quot;,
                &quot;k&quot;: 100
            }
        }
    ]
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">Paso 3: Realizar una búsqueda híbrida<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Antes de iniciar una búsqueda híbrida, asegúrese de que la colección está cargada. Si algún campo vectorial de la colección carece de índice o no está cargado en memoria, se producirá un error al ejecutar el método Búsqueda híbrida.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=reqs,
    ranker=ranker,
    limit=<span class="hljs-number">2</span>
)
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .searchRequests(searchRequests)
        .ranker(reranker)
        .topK(<span class="hljs-number">2</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-number">2</span>,
    request1,
    request2,
    request3,
).WithReranker(reranker))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
})

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">RRFRanker</span>, <span class="hljs-title class_">WeightedRanker</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [search_param_1, search_param_2, search_param_3],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">rerank</span>: rerank
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/hybrid_search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;search\&quot;: <span class="hljs-variable">${req}</span>,
    \&quot;rerank\&quot;: {
        \&quot;strategy\&quot;:\&quot;rrf\&quot;,
        \&quot;params\&quot;: <span class="hljs-variable">${rerank}</span>
    },
    \&quot;limit\&quot;: 2
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación se muestra el resultado:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 1, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 2, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<p>Con el parámetro <code translate="no">limit=2</code> especificado para la Búsqueda Híbrida, Milvus ordenará los seis resultados obtenidos de las tres búsquedas. Finalmente, devolverá sólo los dos resultados más similares.</p>
