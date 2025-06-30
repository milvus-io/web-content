---
id: binary-vector.md
title: Vectores binarios
summary: >-
  Los vectores binarios son una forma especial de representación de datos que
  convierte los vectores tradicionales de coma flotante de alta dimensión en
  vectores binarios que sólo contienen 0s y 1s. Esta transformación no sólo
  comprime el tamaño del vector, sino que también reduce los costes de
  almacenamiento y cálculo, al tiempo que conserva la información semántica.
  Cuando la precisión de las características no críticas no es esencial, los
  vectores binarios pueden mantener eficazmente la mayor parte de la integridad
  y utilidad de los vectores originales en coma flotante.
---
<h1 id="Binary-Vector" class="common-anchor-header">Vectores binarios<button data-href="#Binary-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Los vectores binarios son una forma especial de representación de datos que convierte los vectores tradicionales de coma flotante de alta dimensión en vectores binarios que sólo contienen 0s y 1s. Esta transformación no sólo comprime el tamaño del vector, sino que también reduce los costes de almacenamiento y cálculo, al tiempo que conserva la información semántica. Cuando la precisión de las características no críticas no es esencial, los vectores binarios pueden mantener eficazmente la mayor parte de la integridad y utilidad de los vectores originales en coma flotante.</p>
<p>Los vectores binarios tienen una amplia gama de aplicaciones, sobre todo en situaciones en las que la eficiencia computacional y la optimización del almacenamiento son cruciales. En los sistemas de IA a gran escala, como los motores de búsqueda o los sistemas de recomendación, el procesamiento en tiempo real de cantidades masivas de datos es clave. Al reducir el tamaño de los vectores, los vectores binarios ayudan a disminuir la latencia y los costes computacionales sin sacrificar significativamente la precisión. Además, los vectores binarios son útiles en entornos con recursos limitados, como los dispositivos móviles y los sistemas integrados, donde la memoria y la capacidad de procesamiento son limitadas. Mediante el uso de vectores binarios, es posible implementar funciones complejas de IA en estos entornos restringidos manteniendo un alto rendimiento.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Los vectores binarios son un método de codificación de objetos complejos (como imágenes, texto o audio) en valores binarios de longitud fija. En Milvus, los vectores binarios se representan típicamente como matrices de bits o matrices de bytes. Por ejemplo, un vector binario de 8 dimensiones puede representarse como <code translate="no">[1, 0, 1, 1, 0, 0, 1, 0]</code>.</p>
<p>El siguiente diagrama muestra cómo los vectores binarios representan la presencia de palabras clave en el contenido de un texto. En este ejemplo, se utiliza un vector binario de 10 dimensiones para representar dos textos diferentes<strong>(Texto 1</strong> y <strong>Texto 2</strong>), donde cada dimensión corresponde a una palabra del vocabulario: 1 indica la presencia de la palabra en el texto, mientras que 0 indica su ausencia.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/binary-vector.png" alt="Binary Vector" class="doc-image" id="binary-vector" />
   </span> <span class="img-wrapper"> <span>Vector binario</span> </span></p>
<p>Los vectores binarios presentan las siguientes características</p>
<ul>
<li><p><strong>Almacenamiento eficiente:</strong> Cada dimensión requiere sólo 1 bit de almacenamiento, lo que reduce significativamente el espacio de almacenamiento.</p></li>
<li><p><strong>Cálculo rápido:</strong> La similitud entre vectores puede calcularse rápidamente utilizando operaciones a nivel de bit como XOR.</p></li>
<li><p><strong>Longitud fija:</strong> La longitud del vector permanece constante independientemente de la longitud del texto original, lo que facilita la indexación y la recuperación.</p></li>
<li><p><strong>Sencillo e intuitivo:</strong> Refleja directamente la presencia de palabras clave, lo que lo hace adecuado para determinadas tareas de recuperación especializadas.</p></li>
</ul>
<p>Los vectores binarios pueden generarse mediante diversos métodos. En el tratamiento de textos, pueden utilizarse vocabularios predefinidos para establecer los bits correspondientes en función de la presencia de palabras. En el tratamiento de imágenes, los algoritmos de hashing perceptual (como <a href="https://en.wikipedia.org/wiki/Perceptual_hashing">pHash</a>) pueden generar características binarias de las imágenes. En las aplicaciones de aprendizaje automático, las salidas de los modelos pueden binarizarse para obtener representaciones vectoriales binarias.</p>
<p>Tras la vectorización binaria, los datos pueden almacenarse en Milvus para su gestión y recuperación de vectores. El diagrama siguiente muestra el proceso básico.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/use-binary-vector.png" alt="Use Binary Vector" class="doc-image" id="use-binary-vector" />
   </span> <span class="img-wrapper"> <span>Utilizar vectores binarios</span> </span></p>
<div class="alert note">
<p>Aunque los vectores binarios destacan en escenarios específicos, tienen limitaciones en su capacidad expresiva, lo que dificulta la captura de relaciones semánticas complejas. Por lo tanto, en escenarios del mundo real, los vectores binarios se utilizan a menudo junto con otros tipos de vectores para equilibrar la eficiencia y la expresividad. Para más información, consulte <a href="/docs/es/dense-vector.md">Vector denso</a> y <a href="/docs/es/sparse_vector.md">Vector disperso</a>.</p>
</div>
<h2 id="Use-binary-vectors" class="common-anchor-header">Utilizar vectores binarios<button data-href="#Use-binary-vectors" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Add-vector-field" class="common-anchor-header">Añadir campo vectorial</h3><p>Para utilizar vectores binarios en Milvus, defina primero un campo vectorial para almacenar vectores binarios al crear una colección. Este proceso incluye:</p>
<ol>
<li><p>Establecer <code translate="no">datatype</code> al tipo de datos de vectores binarios soportado, es decir, <code translate="no">BINARY_VECTOR</code>.</p></li>
<li><p>Especificar las dimensiones del vector utilizando el parámetro <code translate="no">dim</code>. Tenga en cuenta que <code translate="no">dim</code> debe ser múltiplo de 8, ya que los vectores binarios deben convertirse en una matriz de bytes al insertarlos. Cada 8 valores booleanos (0 ó 1) se empaquetarán en 1 byte. Por ejemplo, si <code translate="no">dim=128</code>, se requiere un array de 16 bytes para la inserción.</p></li>
</ol>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)
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
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .dataType(DataType.BinaryVector)
        .dimension(<span class="hljs-number">128</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

schema.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;binary vector&quot;</span>,
  <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,
  <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span>,
});
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

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;pk&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">100</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;binary_vector&quot;</span>).
    WithDataType(entity.FieldTypeBinaryVector).
    WithDim(<span class="hljs-number">128</span>),
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
    &quot;fieldName&quot;: &quot;binary_vector&quot;,
    &quot;dataType&quot;: &quot;BinaryVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 128
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>
    ],
    \&quot;enableDynamicField\&quot;: true
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>En este ejemplo, se añade un campo vectorial llamado <code translate="no">binary_vector</code> para almacenar vectores binarios. El tipo de datos de este campo es <code translate="no">BINARY_VECTOR</code>, con una dimensión de 128.</p>
<h3 id="Set-index-params-for-vector-field" class="common-anchor-header">Establecer parámetros de índice para el campo vectorial</h3><p>Para acelerar las búsquedas, es necesario crear un índice para el campo vectorial binario. La indexación puede mejorar significativamente la eficiencia de recuperación de datos vectoriales a gran escala.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;binary_vector_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
Map&lt;String,Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.HAMMING)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> indexParams = {
  <span class="hljs-attr">indexName</span>: <span class="hljs-string">&quot;binary_vector_index&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,
  <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">HAMMING</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx := index.NewAutoIndex(entity.HAMMING)
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;binary_vector&quot;</span>, idx)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;binary_vector&quot;,
            &quot;metricType&quot;: &quot;HAMMING&quot;,
            &quot;indexName&quot;: &quot;binary_vector_index&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>En el ejemplo anterior, se crea un índice denominado <code translate="no">binary_vector_index</code> para el campo <code translate="no">binary_vector</code>, utilizando el tipo de índice <code translate="no">AUTOINDEX</code>. El <code translate="no">metric_type</code> se establece en <code translate="no">HAMMING</code>, lo que indica que se utiliza la distancia de Hamming para la medición de la similitud.</p>
<p>Milvus proporciona varios tipos de índice para una mejor experiencia de búsqueda vectorial. AUTOINDEX es un tipo de índice especial diseñado para suavizar la curva de aprendizaje de la búsqueda vectorial. Hay muchos tipos de índice disponibles para elegir. Para más detalles, consulte <a href="/docs/es/index-explained.md">Explicación de los índices</a>.</p>
<p>Además, Milvus soporta otras métricas de similitud para vectores binarios. Para más información, consulte <a href="/docs/es/metric.md">Tipos de métricas</a>.</p>
<h3 id="Create-collection" class="common-anchor-header">Crear colección</h3><p>Una vez completados los ajustes de vectores binarios e índices, cree una colección que contenga vectores binarios. El siguiente ejemplo utiliza el método <code translate="no">create_collection</code> para crear una colección llamada <code translate="no">my_collection</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
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
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: indexParams
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Insertar datos</h3><p>Tras crear la colección, utiliza el método <code translate="no">insert</code> para añadir datos que contengan vectores binarios. Ten en cuenta que los vectores binarios deben proporcionarse en forma de matriz de bytes, donde cada byte representa 8 valores booleanos.</p>
<p>Por ejemplo, para un vector binario de 128 dimensiones, se requiere una matriz de 16 bytes (ya que 128 bits ÷ 8 bits/byte = 16 bytes). A continuación se muestra un código de ejemplo para insertar datos:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">convert_bool_list_to_bytes</span>(<span class="hljs-params">bool_list</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(bool_list) % <span class="hljs-number">8</span> != <span class="hljs-number">0</span>:
        <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The length of a boolean list must be a multiple of 8&quot;</span>)

    byte_array = <span class="hljs-built_in">bytearray</span>(<span class="hljs-built_in">len</span>(bool_list) // <span class="hljs-number">8</span>)
    <span class="hljs-keyword">for</span> i, bit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(bool_list):
        <span class="hljs-keyword">if</span> bit == <span class="hljs-number">1</span>:
            index = i // <span class="hljs-number">8</span>
            shift = i % <span class="hljs-number">8</span>
            byte_array[index] |= (<span class="hljs-number">1</span> &lt;&lt; shift)
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">bytes</span>(byte_array)

bool_vectors = [
    [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>,
    [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>,
]

data = [{<span class="hljs-string">&quot;binary_vector&quot;</span>: convert_bool_list_to_bytes(bool_vector) <span class="hljs-keyword">for</span> bool_vector <span class="hljs-keyword">in</span> bool_vectors}]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">byte</span>[] convertBoolArrayToBytes(<span class="hljs-type">boolean</span>[] booleanArray) {
    <span class="hljs-type">byte</span>[] byteArray = <span class="hljs-keyword">new</span> <span class="hljs-title class_">byte</span>[booleanArray.length / Byte.SIZE];
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; booleanArray.length; i++) {
        <span class="hljs-keyword">if</span> (booleanArray[i]) {
            <span class="hljs-type">int</span> <span class="hljs-variable">index</span> <span class="hljs-operator">=</span> i / Byte.SIZE;
            <span class="hljs-type">int</span> <span class="hljs-variable">shift</span> <span class="hljs-operator">=</span> i % Byte.SIZE;
            byteArray[index] |= (<span class="hljs-type">byte</span>) (<span class="hljs-number">1</span> &lt;&lt; shift);
        }
    }

    <span class="hljs-keyword">return</span> byteArray;
}

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
{
    <span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(convertBoolArrayToBytes(boolArray)));
    rows.add(row);
}
{
    <span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(convertBoolArrayToBytes(boolArray)));
    rows.add(row);
}

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] },
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] },
];

client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithBinaryVectorColumn(<span class="hljs-string">&quot;binary_vector&quot;</span>, <span class="hljs-number">128</span>, [][]<span class="hljs-type">byte</span>{
        {<span class="hljs-number">0</span>b10011011, <span class="hljs-number">0</span>b01010100, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>},
        {<span class="hljs-number">0</span>b10011011, <span class="hljs-number">0</span>b01010101, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>},
    }))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">Realizar una búsqueda por similitud</h3><p>La búsqueda por similitud es una de las características principales de Milvus, que le permite encontrar rápidamente los datos más similares a un vector de consulta basándose en la distancia entre vectores. Para realizar una búsqueda por similitud utilizando vectores binarios, prepare el vector de consulta y los parámetros de búsqueda y, a continuación, llame al método <code translate="no">search</code>.</p>
<p>Durante las operaciones de búsqueda, los vectores binarios también deben proporcionarse en forma de matriz de bytes. Asegúrate de que la dimensionalidad del vector de consulta coincide con la dimensión especificada al definir <code translate="no">dim</code> y que cada 8 valores booleanos se convierten en 1 byte.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}

query_bool_list = [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>
query_vector = convert_bool_list_to_bytes(query_bool_list)

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    search_params=search_params,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172268&#x27;, &#x27;distance&#x27;: 10.0, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172268&#x27;}}]&quot;] </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BinaryVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>,<span class="hljs-number">10</span>);

<span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};
<span class="hljs-type">BinaryVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(convertBoolArrayToBytes(boolArray));

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchR</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .annsField(<span class="hljs-string">&quot;binary_vector&quot;</span>)
        .searchParams(searchParams)
        .topK(<span class="hljs-number">5</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;pk&quot;</span>))
        .build());
        
 System.out.println(searchR.getSearchResults());
 
 <span class="hljs-comment">// Output</span>
 <span class="hljs-comment">//</span>
 <span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536775}, score=0.0, id=453444327741536775), SearchResp.SearchResult(entity={pk=453444327741536776}, score=7.0, id=453444327741536776)]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">query_vector = [<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>];

client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;pk&#x27;</span>],
    <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">byte</span>{<span class="hljs-number">0</span>b10011011, <span class="hljs-number">0</span>b01010100, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>}

annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,                      <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.BinaryVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;binary_vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;pk&quot;</span>).
    WithAnnParam(annSearchParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;Pks: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{
        &quot;params&quot;:{&quot;nprobe&quot;:10}
    }&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,
    \&quot;annsField\&quot;: \&quot;binary_vector\&quot;,
    \&quot;limit\&quot;: 5,
    \&quot;searchParams\&quot;:<span class="hljs-variable">$searchParams</span>,
    \&quot;outputFields\&quot;: [\&quot;pk\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información sobre los parámetros de búsqueda de similitudes, consulte <a href="/docs/es/single-vector-search.md">Búsqueda básica de RNA</a>.</p>
