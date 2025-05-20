---
id: schema.md
summary: Aprenda a definir un esquema en Milvus.
title: Gestionar esquema
---
<h1 id="Manage-Schema" class="common-anchor-header">Gestionar esquema<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema presenta el esquema en Milvus. El esquema se utiliza para definir las propiedades de una colección y los campos que contiene.</p>
<h2 id="Field-schema" class="common-anchor-header">Esquema de campo<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Un esquema de campo es la definición lógica de un campo. Es lo primero que debe definir antes de definir un <a href="#Collection-schema">esquema de colección</a> y <a href="/docs/es/v2.4.x/manage-collections.md">gestionar colecciones</a>.</p>
<p>Milvus sólo admite un campo de clave primaria en una colección.</p>
<h3 id="Field-schema-properties" class="common-anchor-header">Propiedades del esquema de campo</h3><table class="properties">
    <thead>
    <tr>
        <th>Propiedades</th>
        <th>Descripción</th>
        <th>Nota</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>Nombre del campo de la colección que se va a crear</td>
        <td>Tipo de datos: Cadena.<br/>Obligatorio</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>Tipo de datos del campo</td>
        <td>Obligatorio</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Descripción del campo</td>
        <td>Tipo de datos: String: Cadena.<br/>Opcional</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>Establecer o no el campo como clave primaria</td>
        <td>Tipo de datos: Booleano (<code translate="no">true</code> o <code translate="no">false</code>).<br/>Obligatorio para el campo de clave primaria</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (Obligatorio para el campo de clave primaria)</td>
            <td>Interruptor para activar o desactivar la asignación automática de ID (clave primaria).</td>
            <td><code translate="no">True</code> o <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (Obligatorio para el campo VARCHAR)</td>
            <td>Longitud máxima en bytes de las cadenas que se permite insertar. Tenga en cuenta que los caracteres multibyte (por ejemplo, caracteres Unicode) pueden ocupar más de un byte cada uno, así que asegúrese de que la longitud en bytes de las cadenas insertadas no supera el límite especificado.</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>Dimensión del vector</td>
            <td>Tipo de datos: Entero &isin;[1, 32768].<br/>Obligatorio para un campo vectorial denso. Omitir para un campo vectorial <a href="https://milvus.io/docs/sparse_vector.md">disperso</a>.</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>Si este campo es un campo de clave de partición.</td>
        <td>Tipo de datos: Booleano (<code translate="no">true</code> o <code translate="no">false</code>).</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">Crear un esquema de campo</h3><p>Para reducir la complejidad en las inserciones de datos, Milvus le permite especificar un valor por defecto para cada campo escalar durante la creación del esquema de campo, excluyendo el campo de clave primaria. Esto indica que si deja un campo vacío al insertar datos, se aplicará el valor por defecto que haya especificado para este campo.</p>
<p>Crear un esquema de campo normal:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Crear un esquema de campo con valores de campo por defecto:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">Tipos de datos admitidos</h3><p><code translate="no">DataType</code> define el tipo de datos que contiene un campo. Diferentes campos soportan diferentes tipos de datos.</p>
<ul>
<li><p>El campo clave primaria soporta:</p>
<ul>
<li>INT64: numpy.int64</li>
<li>VARCHAR: VARCHAR</li>
</ul></li>
<li><p>El campo Scalar soporta:</p>
<ul>
<li>BOOL: Boolean (<code translate="no">true</code> o <code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FLOAT: numpy.float32</li>
<li>DOUBLE: numpy.double</li>
<li>VARCHAR: VARCHAR</li>
<li>JSON: <a href="/docs/es/v2.4.x/use-json-fields.md">JSON</a></li>
<li>Array: <a href="/docs/es/v2.4.x/array_data_type.md">Array</a></li>
</ul>
<p>JSON está disponible como tipo de datos compuesto. Un campo JSON se compone de pares clave-valor. Cada clave es una cadena, y un valor puede ser un número, una cadena, un valor booleano, un array o una lista. Para más información, consulta <a href="/docs/es/v2.4.x/use-json-fields.md">JSON: un nuevo tipo de datos</a>.</p></li>
<li><p>Soporta campos vectoriales:</p>
<ul>
<li>BINARY_VECTOR: Almacena datos binarios como una secuencia de 0 y 1. Se utiliza para la representación compacta de características en el procesamiento de imágenes y la recuperación de información.</li>
<li>FLOAT_VECTOR: Almacena números de coma flotante de 32 bits, utilizados habitualmente en computación científica y aprendizaje automático para representar números reales.</li>
<li>FLOAT16_VECTOR: Almacena números de coma flotante de 16 bits de media precisión, utilizados en el aprendizaje profundo y los cálculos de GPU para la eficiencia de la memoria y el ancho de banda.</li>
<li>BFLOAT16_VECTOR: Almacena números de punto flotante de 16 bits con precisión reducida pero el mismo rango de exponentes que Float32, popular en el aprendizaje profundo para reducir los requisitos de memoria y computación sin afectar significativamente a la precisión.</li>
<li>SPARSE_FLOAT_VECTOR: Almacena una lista de elementos distintos de cero y sus índices correspondientes, utilizados para representar vectores dispersos. Para más información, consulte <a href="/docs/es/v2.4.x/sparse_vector.md">Vectores dispersos</a>.</li>
</ul>
<p>Milvus soporta múltiples campos vectoriales en una colección. Para más información, consulte <a href="/docs/es/v2.4.x/multi-vector-search.md">Búsqueda híbrida</a>.</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">Esquema de colección<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Un esquema de colección es la definición lógica de una colección. Normalmente es necesario definir el <a href="#Field-schema">esquema de campo</a> antes de definir un esquema de colección y <a href="/docs/es/v2.4.x/manage-collections.md">gestionar colecciones</a>.</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">Propiedades del esquema de la colección</h3><table class="properties">
    <thead>
    <tr>
        <th>Propiedades</th>
        <th>Descripción</th>
        <th>Nota</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>Campos de la colección a crear</td>
        <td>Obligatorio</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Descripción de la colección</td>
        <td>Tipo de datos: Cadena.<br/>Opcional</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>Nombre de un campo destinado a actuar como clave de partición.</td>
        <td>Tipo: String: Cadena.<br/>Opcional</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>Habilitar o no el esquema dinámico</td>
        <td>Tipo de datos: Booleano (<code translate="no">true</code> o <code translate="no">false</code>).<br/>Opcional, por defecto <code translate="no">False</code>.<br/>Para más detalles sobre el esquema dinámico, consulte <a herf="enable-dynamic-field.md">Esquema dinámico</a> y las guías de usuario para la gestión de colecciones.</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">Crear un esquema de colección</h3><div class="alert note">
  Defina los esquemas de campo antes de definir un esquema de colección.</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Cree una colección con el esquema especificado:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>,connections
conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Puede definir el número de fragmento con <code translate="no">shards_num</code>.</li>
<li>Puede definir el servidor Milvus en el que desea crear una colección especificando el alias en <code translate="no">using</code>.</li>
<li>Puede habilitar la característica de clave <a href="/docs/es/v2.4.x/multi_tenancy.md">de partición</a> en un campo configurando <code translate="no">is_partition_key</code> a <code translate="no">True</code> en el campo si necesita implementar <a href="/docs/es/v2.4.x/multi_tenancy.md">multi-tenancy basado en clave de partición</a>.</li>
<li>Puede habilitar el esquema dinámico configurando <code translate="no">enable_dynamic_field</code> en <code translate="no">True</code> en el esquema de la colección si necesita <a href="/docs/es/v2.4.x/enable-dynamic-field.md">habilitar el campo dinámico</a>.</li>
</ul>
</div>
<p><br/>
También puede crear una colección con <code translate="no">Collection.construct_from_dataframe</code>, que genera automáticamente un esquema de colección a partir de DataFrame y crea una colección.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
    <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;position&quot;</span>: <span class="hljs-string">&quot;test_pos&quot;</span>
})

collection, ins_res = Collection.construct_from_dataframe(
    <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    df,
    primary_field=<span class="hljs-string">&#x27;id&#x27;</span>,
    auto_id=<span class="hljs-literal">False</span>
    )
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">A continuación<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Aprenda a preparar esquemas al <a href="/docs/es/v2.4.x/manage-collections.md">gestionar colecciones</a>.</li>
<li>Más información sobre <a href="/docs/es/v2.4.x/enable-dynamic-field.md">el esquema dinámico</a>.</li>
<li>Más información sobre partition-key en <a href="/docs/es/v2.4.x/multi_tenancy.md">Multi-tenancy</a>.</li>
</ul>
