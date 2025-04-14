---
id: dense-vector.md
title: Vectores densos
summary: >-
  Los vectores densos son representaciones numéricas de datos muy utilizadas en
  el aprendizaje automático y el análisis de datos. Consisten en matrices con
  números reales, donde la mayoría o todos los elementos son distintos de cero.
  En comparación con los vectores dispersos, los vectores densos contienen más
  información en el mismo nivel dimensional, ya que cada dimensión contiene
  valores significativos. Esta representación puede capturar eficazmente
  patrones y relaciones complejas, facilitando el análisis y procesamiento de
  datos en espacios de alta dimensión. Los vectores densos suelen tener un
  número fijo de dimensiones, que oscila entre unas pocas docenas y varios
  cientos o incluso miles, en función de la aplicación y los requisitos
  específicos.
---
<h1 id="Dense-Vector" class="common-anchor-header">Vectores densos<button data-href="#Dense-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Los vectores densos son representaciones numéricas de datos muy utilizadas en el aprendizaje automático y el análisis de datos. Consisten en matrices con números reales, donde la mayoría o todos los elementos son distintos de cero. En comparación con los vectores dispersos, los vectores densos contienen más información en el mismo nivel dimensional, ya que cada dimensión contiene valores significativos. Esta representación puede capturar eficazmente patrones y relaciones complejas, facilitando el análisis y el procesamiento de datos en espacios de altas dimensiones. Los vectores densos suelen tener un número fijo de dimensiones, que oscila entre unas pocas docenas y varios cientos o incluso miles, en función de la aplicación y los requisitos específicos.</p>
<p>Los vectores densos se utilizan principalmente en escenarios que requieren comprender la semántica de los datos, como la búsqueda semántica y los sistemas de recomendación. En la búsqueda semántica, los vectores densos ayudan a capturar las conexiones subyacentes entre consultas y documentos, mejorando la relevancia de los resultados de búsqueda. En los sistemas de recomendación, ayudan a identificar similitudes entre usuarios y elementos, ofreciendo sugerencias más personalizadas.</p>
<h2 id="Overview" class="common-anchor-header">Resumen<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Los vectores densos suelen representarse como matrices de números en coma flotante con una longitud fija, como <code translate="no">[0.2, 0.7, 0.1, 0.8, 0.3, ..., 0.5]</code>. La dimensionalidad de estos vectores suele oscilar entre cientos y miles, como 128, 256, 768 o 1024. Cada dimensión captura características semánticas específicas de un objeto, haciéndolo aplicable a diversos escenarios mediante cálculos de similitud.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/dense-vector.png" alt="dense-vector" class="doc-image" id="dense-vector" />
   </span> <span class="img-wrapper"> <span>vector denso</span> </span></p>
<p>La imagen anterior ilustra la representación de vectores densos en un espacio 2D. Aunque los vectores densos en aplicaciones reales suelen tener dimensiones mucho mayores, esta ilustración en 2D transmite eficazmente varios conceptos clave:</p>
<ul>
<li><p><strong>Representación multidimensional:</strong> Cada punto representa un objeto conceptual (como <strong>Milvus</strong>, <strong>base de datos vectorial</strong>, <strong>sistema de recuperación</strong>, etc.), cuya posición viene determinada por los valores de sus dimensiones.</p></li>
<li><p><strong>Relaciones semánticas:</strong> Las distancias entre puntos reflejan la similitud semántica entre conceptos. Los puntos más cercanos indican conceptos más relacionados semánticamente.</p></li>
<li><p><strong>Efecto de agrupamiento:</strong> Los conceptos relacionados (como <strong>Milvus</strong>, <strong>base de datos vectorial</strong> y <strong>sistema de recuperación</strong>) se sitúan cerca unos de otros en el espacio, formando un cluster semántico.</p></li>
</ul>
<p>A continuación se muestra un ejemplo de vector denso real que representa el texto <code translate="no">&quot;Milvus is an efficient vector database&quot;</code>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
    <span class="hljs-number">-0.013052909</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">0.020387933</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">-0.007869</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">-0.11111383</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">-0.030188112</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">-0.0053388323</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">0.0010654867</span><span class="hljs-punctuation">,</span>
    <span class="hljs-number">0.072027855</span><span class="hljs-punctuation">,</span>
    <span class="hljs-comment">// ... more dimensions</span>
<span class="hljs-punctuation">]</span>

<button class="copy-code-btn"></button></code></pre>
<p>Los vectores densos pueden generarse utilizando varios modelos de <a href="https://en.wikipedia.org/wiki/Embedding">incrustación</a>, como los modelos CNN (como <a href="https://pytorch.org/hub/pytorch_vision_resnet/">ResNet</a>, <a href="https://pytorch.org/vision/stable/models/vgg.html">VGG</a>) para imágenes y los modelos lingüísticos (como <a href="https://en.wikipedia.org/wiki/BERT_(language_model)">BERT</a>, <a href="https://en.wikipedia.org/wiki/Word2vec">Word2Vec</a>) para texto. Estos modelos transforman los datos brutos en puntos en un espacio de alta dimensión, capturando las características semánticas de los datos. Además, Milvus ofrece métodos prácticos para ayudar a los usuarios a generar y procesar vectores densos, como se detalla en Embeddings.</p>
<p>Una vez vectorizados los datos, pueden almacenarse en Milvus para su gestión y recuperación de vectores. El siguiente diagrama muestra el proceso básico.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/use-dense-vector.png" alt="use-dense-vector" class="doc-image" id="use-dense-vector" />
   </span> <span class="img-wrapper"> <span>uso de vectores densos</span> </span></p>
<div class="alert note">
<p>Además de los vectores densos, Milvus también admite vectores dispersos y vectores binarios. Los vectores dispersos son adecuados para coincidencias precisas basadas en términos específicos, como la búsqueda de palabras clave y la coincidencia de términos, mientras que los vectores binarios se utilizan comúnmente para manejar eficientemente datos binarizados, como la coincidencia de patrones de imágenes y ciertas aplicaciones hash. Para más información, consulte <a href="/docs/es/binary-vector.md">Vectores binarios</a> y <a href="/docs/es/sparse_vector.md">vectores dispersos</a>.</p>
</div>
<h2 id="Use-dense-vectors" class="common-anchor-header">Utilizar vectores densos<button data-href="#Use-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Add-vector-field" class="common-anchor-header">Añadir campo vectorial</h3><p>Para utilizar vectores densos en Milvus, defina primero un campo vectorial para almacenar vectores densos al crear una colección. Este proceso incluye:</p>
<ol>
<li><p>Establecer <code translate="no">datatype</code> en un tipo de datos de vectores densos admitido. Para tipos de datos de vectores densos soportados, ver Tipos de Datos.</p></li>
<li><p>Especificar las dimensiones del vector denso utilizando el parámetro <code translate="no">dim</code>.</p></li>
</ol>
<p>En el siguiente ejemplo, añadimos un campo vectorial llamado <code translate="no">dense_vector</code> para almacenar vectores densos. El tipo de datos del campo es <code translate="no">FLOAT_VECTOR</code>, con una dimensión de <code translate="no">4</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.VarChar)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .maxLength(<span class="hljs-number">100</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

schema.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense_vector&quot;</span>,
  <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
  <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span>,
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;pk&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">100</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">4</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;pk&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;isPrimary&quot;: true,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 100
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;dense_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 4
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Tipos de datos admitidos para campos vectoriales</strong> densos:</p>
<table>
   <tr>
     <th><p>Tipo de datos</p></th>
     <th><p>Descripción</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Almacena números de coma flotante de 32 bits, utilizados habitualmente para representar números reales en cálculos científicos y aprendizaje automático. Ideal para escenarios que requieren alta precisión, como distinguir vectores similares.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>Almacena números de coma flotante de 16 bits y media precisión, utilizados para el aprendizaje profundo y los cálculos de GPU. Ahorra espacio de almacenamiento en escenarios en los que la precisión es menos crítica, como en la fase de recuperación de baja precisión de los sistemas de recomendación.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>Almacena números de coma flotante cerebral de 16 bits (bfloat16), ofreciendo el mismo rango de exponentes que Float32 pero con precisión reducida. Adecuado para escenarios que necesitan procesar grandes volúmenes de vectores rápidamente, como la recuperación de imágenes a gran escala.</p></td>
   </tr>
</table>
<h3 id="Set-index-params-for-vector-field" class="common-anchor-header">Establecer parámetros de índice para el campo vectorial</h3><p>Para acelerar las búsquedas semánticas, es necesario crear un índice para el campo vectorial. La indexación puede mejorar significativamente la eficiencia de la recuperación de datos vectoriales a gran escala.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;dense_vector_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dense_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> indexParams = {
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;dense_vector_index&#x27;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dense_vector&#x27;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
)

index := index.NewAutoIndex(entity.IP)
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_dense_collection&quot;</span>, <span class="hljs-string">&quot;dense_vector&quot;</span>, idx)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;dense_vector&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;dense_vector_index&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>En el ejemplo anterior, se crea un índice denominado <code translate="no">dense_vector_index</code> para el campo <code translate="no">dense_vector</code> utilizando el tipo de índice <code translate="no">AUTOINDEX</code>. El <code translate="no">metric_type</code> se establece en <code translate="no">IP</code>, lo que indica que se utilizará el producto interno como métrica de distancia.</p>
<p>Milvus proporciona varios tipos de índice para una mejor experiencia de búsqueda vectorial. AUTOINDEX es un tipo de índice especial diseñado para suavizar la curva de aprendizaje de la búsqueda vectorial. Hay muchos tipos de índice disponibles para elegir. Para más detalles, consulte xxx.</p>
<p>Milvus soporta otros tipos métricos. Para más información, consulte <a href="/docs/es/metric.md">Tipos métricos</a>.</p>
<h3 id="Create-collection" class="common-anchor-header">Crear colección</h3><p>Una vez completados los ajustes de vectores densos y parámetros de índice, puede crear una colección que contenga vectores densos. El siguiente ejemplo utiliza el método <code translate="no">create_collection</code> para crear una colección llamada <code translate="no">my_dense_collection</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_dense_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_dense_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_dense_collection&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: indexParams
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

err = cli.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(collectionName, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_dense_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Insertar datos</h3><p>Tras crear la colección, utiliza el método <code translate="no">insert</code> para añadir datos que contengan vectores densos. Asegúrate de que la dimensionalidad de los vectores densos que se insertan coincide con el valor <code translate="no">dim</code> definido al añadir el campo de vectores densos.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data = [
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]},
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>]},
]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_dense_collection&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;dense_vector\&quot;: [0.1, 0.2, 0.3, 0.4]}&quot;</span>, JsonObject.class));
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;dense_vector\&quot;: [0.2, 0.3, 0.4, 0.5]}&quot;</span>, JsonObject.class));

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_dense_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
  { <span class="hljs-attr">dense_vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>] },
  { <span class="hljs-attr">dense_vector</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>] },
];

client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_dense_collection&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_dense_collection&quot;</span>).
    WithFloatVectorColumn(<span class="hljs-string">&quot;dense_vector&quot;</span>, <span class="hljs-number">4</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>},
        {<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>},
    }),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;dense_vector&quot;: [0.1, 0.2, 0.3, 0.4]},
        {&quot;dense_vector&quot;: [0.2, 0.3, 0.4, 0.5]}        
    ],
    &quot;collectionName&quot;: &quot;my_dense_collection&quot;
}&#x27;</span>

<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:{&quot;insertCount&quot;:2,&quot;insertIds&quot;:[&quot;453577185629572531&quot;,&quot;453577185629572532&quot;]}}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">Realizar búsqueda por similitud</h3><p>La búsqueda semántica basada en vectores densos es una de las características principales de Milvus, que le permite encontrar rápidamente los datos más similares a un vector de consulta basándose en la distancia entre vectores. Para realizar una búsqueda de similitud, prepare el vector de consulta y los parámetros de búsqueda y, a continuación, llame al método <code translate="no">search</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}

query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_dense_collection&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    search_params=search_params,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172271&#x27;, &#x27;distance&#x27;: 0.7599999904632568, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172271&#x27;}}, {&#x27;id&#x27;: &#x27;453718927992172270&#x27;, &#x27;distance&#x27;: 0.6299999952316284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172270&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;

Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>,<span class="hljs-number">10</span>);

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>});

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchR</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_dense_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .annsField(<span class="hljs-string">&quot;dense_vector&quot;</span>)
        .searchParams(searchParams)
        .topK(<span class="hljs-number">5</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;pk&quot;</span>))
        .build());
        
System.out.println(searchR.getSearchResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536779}, score=0.65, id=453444327741536779), SearchResp.SearchResult(entity={pk=453444327741536778}, score=0.65, id=453444327741536778)]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>];

client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: my_dense_collection,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;pk&#x27;</span>],
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>}

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>)
resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_dense_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,             <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
    
).
WithOutputFields(<span class="hljs-string">&quot;pk&quot;</span>).
WithAnnParam(annParam))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to perform basic ANN search collection: &quot;</span>, err.Error())
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    log.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    log.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    log.Println(<span class="hljs-string">&quot;Pks: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>))
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_dense_collection&quot;,
    &quot;data&quot;: [
        [0.1, 0.2, 0.3, 0.7]
    ],
    &quot;annsField&quot;: &quot;dense_vector&quot;,
    &quot;limit&quot;: 5,
    &quot;searchParams&quot;:{
        &quot;params&quot;:{&quot;nprobe&quot;:10}
    },
    &quot;outputFields&quot;: [&quot;pk&quot;]
}&#x27;</span>

<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:0.55,&quot;id&quot;:&quot;453577185629572532&quot;,&quot;pk&quot;:&quot;453577185629572532&quot;},{&quot;distance&quot;:0.42,&quot;id&quot;:&quot;453577185629572531&quot;,&quot;pk&quot;:&quot;453577185629572531&quot;}]}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información sobre los parámetros de búsqueda de similitud, consulte <a href="/docs/es/single-vector-search.md">Búsqueda básica de RNA</a>.</p>
