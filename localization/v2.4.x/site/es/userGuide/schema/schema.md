---
id: schema.md
title: Explicación del esquema
summary: >-
  Un esquema define la estructura de datos de una colección. Antes de crear una
  colección, es necesario diseñar su esquema. Esta página le ayudará a entender
  el esquema de una colección y a diseñar un esquema de ejemplo por su cuenta.
---
<h1 id="Schema-Explained​" class="common-anchor-header">Explicación del esquema<button data-href="#Schema-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>Un esquema define la estructura de datos de una colección. Antes de crear una colección, es necesario diseñar su esquema. Esta página le ayudará a entender el esquema de una colección y a diseñar un esquema de ejemplo por su cuenta.</p>
<h2 id="Overview​" class="common-anchor-header">Visión general<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>En Zilliz Cloud, un esquema de colección ensambla una tabla en una base de datos relacional, que define cómo Zilliz Cloud organiza los datos en la colección. </p>
<p>Un esquema bien diseñado es esencial, ya que abstrae el modelo de datos y decide si se pueden alcanzar los objetivos de negocio a través de una búsqueda. Además, dado que cada fila de datos insertada en la colección debe seguir el esquema, ayuda a mantener la coherencia de los datos y la calidad a largo plazo. Desde un punto de vista técnico, un esquema bien definido conduce a un almacenamiento de datos de columnas bien organizado y a una estructura de índices más limpia, lo que aumenta el rendimiento de las búsquedas.</p>
<p>Un esquema de colección tiene una clave primaria, un máximo de cuatro campos vectoriales y varios campos escalares. El siguiente diagrama ilustra cómo asignar un artículo a una lista de campos de esquema.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/schema-explained.PNG" alt="Schema design" class="doc-image" id="schema-design" />
   </span> <span class="img-wrapper"> <span>Diseño del esquema</span> </span></p>
<p>El diseño del modelo de datos de un sistema de búsqueda implica analizar las necesidades de la empresa y abstraer la información en un modelo de datos expresado en un esquema. Por ejemplo, la búsqueda de un fragmento de texto debe "indexarse" convirtiendo la cadena literal en un vector mediante "incrustación" y permitiendo la búsqueda vectorial. Más allá de este requisito esencial, puede ser necesario almacenar otras propiedades, como la fecha de publicación y el autor. Estos metadatos permiten refinar las búsquedas semánticas mediante filtrado, devolviendo sólo los textos publicados después de una fecha concreta o por un autor determinado. También puede recuperar estos escalares con el texto principal para mostrar el resultado de la búsqueda en la aplicación. A cada uno de ellos se le debe asignar un identificador único para organizar estas piezas de texto, expresado como un número entero o una cadena. Estos elementos son esenciales para lograr una lógica de búsqueda sofisticada.</p>
<p>Consulte <a href="/docs/es/schema-hands-on.md">Schema Design Hands-On</a> para averiguar cómo hacer un esquema bien diseñado.</p>
<h2 id="Create-Schema​" class="common-anchor-header">Crear esquema<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente fragmento de código demuestra cómo crear un esquema.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>​
​
schema = <span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">create_schema</span>()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = []​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
    &quot;fields&quot;: []​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Primary-Field​" class="common-anchor-header">Añadir campo primario<button data-href="#Add-Primary-Field​" class="anchor-icon" translate="no">
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
    </button></h2><p>El campo primario de una colección identifica de forma única a una entidad. Sólo acepta valores <strong>Int64</strong> o <strong>VarChar</strong>. Los siguientes fragmentos de código muestran cómo añadir el campo primario.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    datatype=DataType.INT64,​
    <span class="hljs-comment"># highlight-start​</span>
    is_primary=<span class="hljs-literal">True</span>,​
    auto_id=<span class="hljs-literal">False</span>,​
    <span class="hljs-comment"># highlight-end​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">DataType</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">AddFieldReq</span>; ​
​
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>)​
        <span class="hljs-comment">// highlight-start​</span>
        .<span class="hljs-title function_">isPrimaryKey</span>(<span class="hljs-literal">true</span>)​
        .<span class="hljs-title function_">autoID</span>(<span class="hljs-literal">false</span>)​
        <span class="hljs-comment">// highlight-end​</span>
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>​
    <span class="hljs-comment">// highlight-end​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_id&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField​
    ]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Al añadir un campo, puede aclarar explícitamente el campo como campo primario estableciendo su propiedad <code translate="no">is_primary</code> a <code translate="no">True</code>. Un campo primario acepta valores <strong>Int64</strong> por defecto. En este caso, el valor del campo primario debe ser entero, similar a <code translate="no">12345</code>. Si eliges utilizar valores <strong>VarChar</strong> en el campo primario, el valor debe ser cadena, similar a <code translate="no">my_entity_1234</code>.</p>
<p>También puede establecer las propiedades <code translate="no">autoId</code> a <code translate="no">True</code> para hacer que Zilliz Cloud asigne automáticamente valores de campo primario al insertar datos.</p>
<p>Para más detalles, consulte <a href="/docs/es/primary-field.md">Campo primario y AutoID</a>.</p>
<h2 id="Add-Vector-Fields​" class="common-anchor-header">Añadir campos vectoriales<button data-href="#Add-Vector-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Los campos vectoriales aceptan varias incrustaciones de vectores dispersos y densos. En Zilliz Cloud, puede añadir cuatro campos vectoriales a una colección. Los siguientes fragmentos de código muestran cómo añadir un campo vectorial.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,​
    datatype=DataType.FLOAT_VECTOR,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    dim=<span class="hljs-number">5</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_vector&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .<span class="hljs-title function_">dimension</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_vector&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 5​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>El parámetro <code translate="no">dim</code> en los fragmentos de código anteriores indica la dimensionalidad de las incrustaciones vectoriales que se incluirán en el campo vectorial. El valor <code translate="no">FLOAT_VECTOR</code> indica que el campo vectorial contiene una lista de números flotantes de 32 bits, que normalmente se usan para representar antilogaritmos. Además, Zilliz Cloud también soporta los siguientes tipos de incrustaciones vectoriales.</p>
<ul>
<li><p><code translate="no">FLOAT16_VECTOR</code></p>
<p>Un campo vectorial de este tipo contiene una lista de números flotantes de 16 bits de media precisión y suele aplicarse a escenarios de aprendizaje profundo o computación basada en GPU con restricciones de memoria o ancho de banda.</p></li>
<li><p><code translate="no">BFLOAT16_VECTOR</code></p>
<p>Un campo vectorial de este tipo contiene una lista de números en coma flotante de 16 bits que tienen una precisión reducida pero el mismo rango de exponentes que Float32. Este tipo de datos se utiliza habitualmente en escenarios de aprendizaje profundo, ya que reduce el uso de memoria sin afectar significativamente a la precisión.</p></li>
<li><p><code translate="no">BINARY_VECTOR</code></p>
<p>Un campo vectorial de este tipo contiene una lista de 0s y 1s. Sirven como características compactas para representar datos en escenarios de procesamiento de imágenes y recuperación de información.</p></li>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
<p>Un campo vectorial de este tipo contiene una lista de números distintos de cero y sus números de secuencia para representar incrustaciones de vectores dispersos.</p></li>
</ul>
<h2 id="Add-Scalar-Fields​" class="common-anchor-header">Añadir campos escalares<button data-href="#Add-Scalar-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>En casos comunes, puede utilizar campos escalares para almacenar los metadatos de las incrustaciones vectoriales almacenadas en Milvus, y realizar búsquedas RNA con filtrado de metadatos para mejorar la corrección de los resultados de la búsqueda. Zilliz Cloud soporta múltiples tipos de campos escalares, incluyendo <strong>VarChar</strong>, <strong>Boolean</strong>, <strong>Int</strong>, Float, <strong>Double</strong>, <strong>Array</strong> y JSON.</p>
<h3 id="Add-String-Fields​" class="common-anchor-header">Añadir campos de cadena</h3><p>En Milvus, puede utilizar campos VarChar para almacenar cadenas. Para más información sobre el campo VarChar, consulte <a href="/docs/es/string.md">Campo String</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,​
    datatype=DataType.VARCHAR,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    max_length=<span class="hljs-number">512</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_varchar&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">512</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> varCharField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_varchar&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 256​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Number-Fields​" class="common-anchor-header">Añadir Campos Numéricos</h3><p>Los tipos de números que Milvus soporta son <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, y <code translate="no">Double</code>. Para más información sobre los campos numéricos, consulte <a href="/docs/es/number.md">Campo numérico</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_int64&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_int64&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_int64&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> int64Field=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_int64&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Boolean-Fields​" class="common-anchor-header">Añadir campos booleanos</h3><p>Milvus soporta campos booleanos. Los siguientes fragmentos de código muestran cómo añadir un campo booleano.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_bool&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">BOOL</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_bool&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_bool&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Boolean</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> boolField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_bool&quot;,​
    &quot;dataType&quot;: &quot;Boolean&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$boolField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-JSON-fields​" class="common-anchor-header">Añadir campos JSON</h3><p>Un campo JSON normalmente almacena datos JSON semiestructurados. Para más información sobre los campos JSON, consulta <a href="/docs/es/use-json-field.md">Campo JSON</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_json&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_json&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_json&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_json&quot;,​
    &quot;dataType&quot;: &quot;JSON&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$boolField</span>,​
        <span class="hljs-variable">$jsonField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Array-Fields​" class="common-anchor-header">Añadir campos array</h3><p>Un campo array almacena una lista de elementos. Los tipos de datos de todos los elementos de un campo array deben ser iguales. Para más información sobre los campos array, consulta <a href="/docs/es/array_data_field.md">Campo Array</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_array&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">ARRAY</span>,​
    element_type=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,​
    max_capacity=<span class="hljs-number">5</span>,​
    max_length=<span class="hljs-number">512</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_array&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>)​
        .<span class="hljs-title function_">elementType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)​
        .<span class="hljs-title function_">maxCapacity</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">512</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_array&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,​
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> arrayField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_array&quot;,​
    &quot;dataType&quot;: &quot;Array&quot;,​
    &quot;elementDataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 512​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$boolField</span>,​
        <span class="hljs-variable">$jsonField</span>,​
        <span class="hljs-variable">$arrayField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p></p>
