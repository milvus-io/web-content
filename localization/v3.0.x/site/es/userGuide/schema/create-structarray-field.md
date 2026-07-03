---
id: create-structarray-field.md
title: Crear un campo StructArray
summary: >-
  Crea un campo StructArray cuando una entidad deba contener una lista ordenada
  de elementos estructurados. Un campo StructArray es un campo Array cuyo tipo
  de elemento es Struct. Cada elemento Struct sigue el mismo esquema y puede
  contener subcampos escalares, subcampos vectoriales o ambos.
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">Crear un campo StructArray<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Crea un campo StructArray cuando una entidad deba contener una lista ordenada de elementos estructurados. Un campo StructArray es un campo Array cuyo tipo de elemento es Struct. Cada elemento Struct sigue el mismo esquema y puede contener subcampos escalares, subcampos vectoriales o ambos.</p>
<p>En esta página se explica cómo definir un esquema Struct, añadirlo como campo StructArray, seleccionar subcampos para su posterior búsqueda y filtrado, y comprender las reglas del esquema que se aplican antes de insertar o indexar datos.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Antes de empezar<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta página utiliza una colección denominada « <code translate="no">tech_articles</code> ». Cada entidad representa un artículo técnico, y el campo « <code translate="no">chunks</code> » almacena datos a nivel de fragmento como elementos Struct.</p>
<table>
<thead>
<tr><th>Campo</th><th>Tipo</th><th>Finalidad</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>Clave primaria del artículo.</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>Título del artículo.</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>Categoría a nivel de artículo.</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Campo vectorial a nivel de artículo, que se utilizará más adelante en los ejemplos de búsqueda híbrida.</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>Campo StructArray que almacena texto a nivel de fragmento, metadatos e incrustaciones.</td></tr>
</tbody>
</table>
<p>El campo StructArray « <code translate="no">chunks</code> » contiene los siguientes subcampos.</p>
<table>
<thead>
<tr><th>Subcampo</th><th>Tipo</th><th>Finalidad</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>Texto del fragmento.</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>Nombre de la sección, como « <code translate="no">index</code> », « <code translate="no">search</code> » o « <code translate="no">filter</code> ».</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>Número de página o posición lógica del fragmento.</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>Puntuación a nivel de fragmento utilizada en el filtrado escalar y en los ejemplos de rango.</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>Si el fragmento contiene código.</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Subcampo vectorial para la búsqueda en EmbeddingList con métricas de <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Subcampo vectorial para la búsqueda a nivel de elemento con métricas vectoriales habituales.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Un campo vectorial o un subcampo vectorial solo admite un índice. Si necesitas tanto la búsqueda en EmbeddingList como la búsqueda a nivel de elemento, define dos subcampos vectoriales independientes. En este ejemplo, « <code translate="no">chunks[emb_list_vector]</code> » se utiliza para la búsqueda en EmbeddingList, y « <code translate="no">chunks[emb]</code> » para la búsqueda a nivel de elemento.</p>
</div>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">Tipos de datos admitidos para los subcampos<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Un campo StructArray almacena un valor de matriz para cada subcampo Struct. Al definir un esquema Struct, elija los tipos de subcampo de entre las familias escalares y vectoriales compatibles.</p>
<table>
<thead>
<tr><th>Tipo físico de subcampo Struct</th><th>Compatibilidad</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.BOOL</code> ».</td></tr>
<tr><td><code translate="no">Array</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.INT8</code> », « <code translate="no">DataType.INT16</code> », « <code translate="no">DataType.INT32</code> » o « <code translate="no">DataType.INT64</code> ».</td></tr>
<tr><td><code translate="no">Array</code></td><td>Compatible</td><td>Defina el subcampo como <code translate="no">DataType.FLOAT</code> o <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Compatible</td><td>Defina el subcampo como <code translate="no">DataType.VARCHAR</code> y establezca <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatible</td><td>Defina el subcampo como <code translate="no">DataType.FLOAT_VECTOR</code> y establezca <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.FLOAT16_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.BFLOAT16_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.INT8_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatible</td><td>Defina el subcampo como « <code translate="no">DataType.BINARY_VECTOR</code> » y establezca « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>No compatible</td><td>Los subcampos de vectores dispersos no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>No compatible</td><td>Utilice « <code translate="no">VARCHAR</code> », no « <code translate="no">String</code> ».</td></tr>
<tr><td><code translate="no">Array</code></td><td>No compatible</td><td>Los subcampos JSON no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>No compatible</td><td>Los subcampos de geometría y las funciones SIG no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>No compatible</td><td>Los subcampos de texto no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>No compatible</td><td>Los subcampos «timestamptz» y las expresiones específicas de tiempo no son compatibles con los campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> o <code translate="no">ArrayOfStruct</code></td><td>No compatible</td><td>Un campo StructArray no puede contener matrices anidadas, matrices vectoriales anidadas, campos Struct anidados ni campos Array-of-Struct anidados.</td></tr>
</tbody>
</table>
<p>Para obtener información sobre la compatibilidad específica de cada versión, el comportamiento de los valores nulos y otras restricciones, consulta <a href="/docs/es/structarray-limits.md">Restricciones de StructArray</a>.</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">Crear una colección con un campo StructArray<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Para crear un campo StructArray, defina primero el esquema Struct que utiliza cada elemento. A continuación, añada un campo Array y establezca su tipo de elemento en Struct.</p>
<ol>
<li><p>Crea el esquema de la colección.</p></li>
<li><p>Añade campos a nivel de colección, como la clave principal y los campos a nivel de artículo.</p></li>
<li><p>Crea un esquema Struct para los elementos almacenados dentro del campo StructArray.</p></li>
<li><p>Añade subcampos escalares y vectoriales al esquema Struct.</p></li>
<li><p>Añade un campo «Array» con « <code translate="no">element_type=DataType.STRUCT</code> ».</p></li>
<li><p>Establece ` <code translate="no">struct_schema</code> ` en el esquema `Struct`.</p></li>
<li><p>Establece « <code translate="no">max_capacity</code> » para limitar el número de elementos Struct que cada entidad puede almacenar en el campo.</p></li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">Comprender las rutas de los campos StructArray<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez creado un campo StructArray, haz referencia a sus subcampos utilizando la sintaxis de ruta « <code translate="no">structArray[subfield]</code> ». Utiliza esta sintaxis al crear índices, buscar subcampos vectoriales, generar subcampos de salida o crear filtros escalares.</p>
<table>
<thead>
<tr><th>Ruta</th><th>Significado</th><th>Uso habitual</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td>El subcampo « <code translate="no">text</code> » dentro de cada elemento Struct.</td><td>Campo de salida o filtrado escalar.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>La etiqueta de sección de cada fragmento.</td><td>Filtrado escalar.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>La puntuación de calidad a nivel de fragmento.</td><td>Filtrado escalar o índice escalar.</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>El subcampo vectorial utilizado como lista de incrustación.</td><td>Búsqueda en EmbeddingList con « <code translate="no">MAX_SIM*</code> ».</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>El subcampo vectorial utilizado por cada elemento de Struct de forma independiente.</td><td>Búsqueda vectorial a nivel de elemento.</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">Hacer que un campo StructArray sea nulo<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x admite campos StructArray nulos. Un campo StructArray nulo permite que una entidad almacene valores de tipo « <code translate="no">null</code> » para todo el campo StructArray.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Advertencia
Los campos StructArray nulos solo están disponibles en Milvus v3.0.x. En el caso de un campo StructArray nulo, una entidad puede proporcionar un valor StructArray válido o establecer todo el campo como ` <code translate="no">null</code>`. Al insertar un valor StructArray válido, todos los subcampos deben ser nulos o tener valores válidos. La inserción de una entidad con algunos subcampos establecidos en nulo y otros en valores válidos da lugar a un error. Para más detalles, consulta <a href="/docs/es/structarray-limits.md">Límites de StructArray</a>.</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">Añadir un campo StructArray a una colección existente<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x permite añadir un campo StructArray a una colección existente. El campo StructArray añadido debe ser nulo, ya que las entidades que ya existen en la colección no tienen valores para el nuevo campo.</p>
<p>Para añadir un campo StructArray a una colección existente, defina primero el esquema Struct. A continuación, llame a ` <code translate="no">add_collection_struct_field()</code> ` y establezca ` <code translate="no">nullable=True</code>`.</p>
<pre><code translate="no" class="language-python">chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Una vez añadido el campo StructArray, las entidades existentes devuelven ` <code translate="no">null</code> ` para el nuevo campo en todos sus subcampos.</p>
<p>Una vez creado un campo StructArray, no se pueden añadir nuevos subcampos a ese campo StructArray ya existente. Si más adelante necesitas atributos de elemento adicionales, llama a ` <code translate="no">drop_collection_field()</code> ` para eliminar el campo StructArray y, a continuación, añade un nuevo campo StructArray con el esquema Struct actualizado.</p>
<pre><code translate="no" class="language-python">client.drop_collection_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=updated_chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Schema-rules" class="common-anchor-header">Reglas del esquema<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Regla</th><th>Explicación</th></tr>
</thead>
<tbody>
<tr><td>Struct se utiliza como tipo de elemento Array.</td><td>Crea un campo StructArray como un campo Array con ` <code translate="no">element_type=STRUCT</code>`. No crees Struct como un campo de colección de nivel superior.</td></tr>
<tr><td>Todos los elementos comparten un mismo esquema.</td><td>Cada elemento «Struct» del mismo campo «StructArray» sigue el esquema «Struct» definido para ese campo.</td></tr>
<tr><td><code translate="no">max_capacity</code> Es obligatorio.</td><td>Limita el número de elementos Struct que cada entidad puede almacenar en el campo StructArray.</td></tr>
<tr><td>Solo se permiten los tipos de subcampos compatibles.</td><td>Utilice los tipos de subcampos escalares y vectoriales compatibles con StructArray. No defina subcampos JSON, Geometry, Text, Timestamptz, SparseFloatVector ni subcampos Struct / Array anidados.</td></tr>
<tr><td>Los subcampos vectoriales necesitan índices antes de la búsqueda.</td><td>Cree índices en rutas como <code translate="no">chunks[emb_list_vector]</code> o <code translate="no">chunks[emb]</code> antes de ejecutar una búsqueda vectorial.</td></tr>
<tr><td>Cada subcampo vectorial tiene un índice.</td><td>Si necesitas tanto la búsqueda en EmbeddingList como la búsqueda a nivel de elemento, crea dos subcampos vectoriales independientes.</td></tr>
<tr><td>Los subcampos StructArray existentes son fijos.</td><td>Una vez creado un campo StructArray, no se pueden añadir más subcampos a ese mismo campo StructArray.</td></tr>
<tr><td>No se admiten funciones dentro de Struct.</td><td>No definas funciones para campos o subcampos dentro de un campo StructArray.</td></tr>
<tr><td>Los subcampos escalares deben ajustarse a las necesidades de filtrado.</td><td>Añade campos como « <code translate="no">section</code> », « <code translate="no">quality_score</code> » o « <code translate="no">has_code</code> » solo cuando necesites filtrarlos, agruparlos o mostrarlos posteriormente.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Errores comunes<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Crear « <code translate="no">DataType.STRUCT</code> » como un campo de colección de nivel superior en lugar de utilizarlo como tipo de elemento de un campo «Array».</p></li>
<li><p>Olvidarse de establecer « <code translate="no">max_capacity</code> » en el campo «StructArray».</p></li>
<li><p>Definir tipos de subcampos no admitidos, como JSON, Geometry, Text, Timestamptz, SparseFloatVector, Array anidado, Struct anidado o Array-of-Struct.</p></li>
<li><p>Utilizar « <code translate="no">String</code> » como tipo de subcampo. Utiliza « <code translate="no">VARCHAR</code> » y establece « <code translate="no">max_length</code> ».</p></li>
<li><p>Utilizar un único subcampo vectorial tanto para la búsqueda en EmbeddingList como para la búsqueda a nivel de elemento.</p></li>
<li><p>Añadir únicamente subcampos vectoriales y omitir los subcampos escalares necesarios para el filtrado, como <code translate="no">section</code>, <code translate="no">quality_score</code> o <code translate="no">has_code</code>.</p></li>
<li><p>Tratar los subcampos vectoriales como entradas de predicados escalares de tipo <code translate="no">$[...]</code>. Utilizar los subcampos vectoriales para la búsqueda vectorial y los subcampos escalares para los predicados escalares.</p></li>
<li><p>Suponer que se pueden añadir nuevos subcampos a un campo StructArray ya existente una vez creado dicho campo.</p></li>
<li><p>Utilizar <code translate="no">chunks.emb</code> o <code translate="no">chunks.emb_list_vector</code> en lugar de la sintaxis de ruta requerida <code translate="no">chunks[emb]</code> o <code translate="no">chunks[emb_list_vector]</code>.</p></li>
<li><p>Tratar el comportamiento de los StructArray nulos como si estuviera disponible en todas las versiones de destino.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Próximos pasos<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Para insertar datos anidados en el campo StructArray, consulta <a href="/docs/es/insert-data-into-structarray-fields.md">Insertar datos en campos StructArray</a>.</p></li>
<li><p>Para crear índices vectoriales y escalares, consulta <a href="/docs/es/index-structarray-fields.md">«Indexar campos StructArray</a>».</p></li>
<li><p>Para buscar en los subcampos vectoriales de StructArray, consulta «Búsqueda vectorial básica con StructArray».</p></li>
<li><p>Para consultar los tipos de datos admitidos, el comportamiento de los valores nulos y las limitaciones específicas de cada versión, consulta <a href="/docs/es/structarray-limits.md">«Límites de StructArray</a>».</p></li>
</ol>
