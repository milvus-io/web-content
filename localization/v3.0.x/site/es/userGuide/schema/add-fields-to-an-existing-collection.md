---
id: add-fields-to-an-existing-collection.md
title: Modificar el esquema de una colección
summary: >-
  Modifica un esquema de colección existente añadiendo o eliminando campos
  definidos por el usuario o funciones, junto con sus campos vectoriales
  generados.
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">Modificar el esquema de una colección<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>A medida que una colección pasa de la fase de desarrollo a la de producción, su esquema suele cambiar. Es posible que añadas campos escalares como « <code translate="no">source_uri</code> » o « <code translate="no">review_status</code> » para el filtrado y la lógica de la aplicación, que añadas un nuevo campo vectorial para las incrustaciones generadas por tu aplicación, que añadas una función BM25 y su campo vectorial disperso generado para la búsqueda léxica en el texto existente, o que elimines campos y funciones que ya no se utilicen. La opción «Modificar el esquema de la colección» le permite realizar cambios compatibles en los campos y funciones sin necesidad de volver a crear la colección.</p>
<div class="alert note">
<p>Esta guía aborda los cambios en el esquema de los campos definidos por el usuario y de las funciones con sus campos vectoriales generados en colecciones gestionadas. Para añadir un campo a una colección externa, consulta <a href="/docs/es/alter-external-collection-schema.md">«Modificar el esquema de una colección externa</a>». Para cambios en las propiedades de los campos, como modificar « <code translate="no">max_length</code> » en un campo de « <code translate="no">VARCHAR</code> » o « <code translate="no">max_capacity</code> » en un campo de « <code translate="no">ARRAY</code> », consulta <a href="/docs/es/alter-collection-field.md">«Modificar un campo de la colección</a>». Para el comportamiento dinámico de los campos, consulte <a href="/docs/es/enable-dynamic-field.md">«Campo dinámico</a> » y <a href="/docs/es/modify-collection.md">«Modificar colección</a>».</p>
</div>
<h2 id="Limits" class="common-anchor-header">Límites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Añadir campos definidos por el usuario</strong></p>
<ul>
<li><p>Los campos definidos por el usuario que se añadan deben ser nulos. Establezca <code translate="no">nullable=True</code> al llamar a <code translate="no">add_collection_field()</code>. Para las entidades existentes, el campo añadido es de tipo <code translate="no">NULL</code>, a menos que añada un campo escalar con <code translate="no">default_value</code>.</p></li>
<li><p>La adición de campos escalares definidos por el usuario es compatible con Milvus 2.6.x y versiones posteriores. La adición de campos vectoriales definidos por el usuario es compatible con Milvus 2.6.18 y versiones posteriores.</p></li>
<li><p>La adición de campos StructArray es compatible con Milvus 3.0.0 y versiones posteriores. Los campos StructArray añadidos deben ser nulos.</p></li>
<li><p>Los nombres de los campos deben ser únicos entre los campos de la colección.</p></li>
</ul>
<p><strong>Añadir una función y su campo vectorial generado</strong></p>
<ul>
<li><p>Cada actualización del esquema solo puede añadir una función y un campo vectorial generado.</p></li>
<li><p>La función admitida determina el tipo de campo vectorial generado: « <code translate="no">BM25</code> » genera un campo « <code translate="no">SPARSE_FLOAT_VECTOR</code> », y « <code translate="no">MINHASH</code> » genera un campo « <code translate="no">BINARY_VECTOR</code> ».</p></li>
<li><p>El campo vectorial generado debe ser un campo nuevo. No puede hacer referencia a un campo que ya exista en el esquema de la colección.</p></li>
<li><p>El campo vectorial generado no puede ser nulo.</p></li>
<li><p>Los campos de entrada utilizados por la función deben existir ya en la colección.</p></li>
<li><p>Al añadir una función BM25 o MinHash a una colección existente, la entrada de la función debe ser un campo de tipo « <code translate="no">VARCHAR</code> ». No se admite una entrada de tipo « <code translate="no">TEXT</code> » en este flujo de trabajo, ya que Milvus no puede rellenar retrospectivamente la salida generada para las entidades existentes a partir de ese tipo de entrada.</p></li>
</ul>
<p><strong>Eliminar campos definidos por el usuario</strong></p>
<ul>
<li><p>No se puede eliminar el campo de clave primaria, el campo de clave de partición, el campo de clave de agrupamiento ni el último campo vectorial de una colección.</p></li>
<li><p>Se puede eliminar un campo « <code translate="no">ARRAY&lt;STRUCT&gt;</code> » completo, pero no se puede eliminar un subcampo individual dentro de un campo « <code translate="no">ARRAY&lt;STRUCT&gt;</code> ».</p></li>
<li><p>No se puede eliminar directamente un campo que se utilice como campo de entrada de una función o que se haya generado como campo de salida de una función. Para eliminar un campo de salida de una función, elimine la función que lo genera.</p></li>
</ul>
<p><strong>Eliminar una función y su campo vectorial generado</strong></p>
<ul>
<li><p>En este flujo de trabajo de cambio de esquema, al eliminar una función se eliminan la función, su campo vectorial generado y el índice asociado. Los campos de entrada de la función permanecen en el esquema de la colección.</p></li>
<li><p>La eliminación de una función se rechaza si, al eliminar su campo vectorial generado, la colección quedara sin ningún campo vectorial.</p></li>
</ul>
<div class="alert note">
<p>Para cambios de esquema que no se incluyan en las operaciones de adición y eliminación admitidas, vuelve a crear o migra la colección.</p>
</div>
<p><a id="add-fields-to-an-existing-collection"></a></p>
<h2 id="Add-fields-and-Functions-to-an-existing-collection" class="common-anchor-header">Añadir campos y funciones a una colección existente<button data-href="#Add-fields-and-Functions-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Elige el flujo de trabajo en función de si vas a añadir un campo definido por el usuario o una función que genere un campo vectorial:</p>
<ul>
<li><p><a href="#add-user-defined-scalar-fields--milvus-26x">Añade campos escalares definidos por el usuario</a> cuando necesites nuevos metadatos para el filtrado, el resultado de las consultas o la lógica de la aplicación.</p></li>
<li><p><a href="#add-structarray-fields--milvus-300">Añade campos StructArray</a> cuando necesites un campo de matriz cuyos elementos compartan el mismo esquema Struct.</p></li>
<li><p><a href="#add-user-defined-vector-fields--milvus-2618">Añade campos vectoriales definidos por el usuario</a> cuando tu aplicación genere representaciones y escriba valores vectoriales en Milvus.</p></li>
<li><p><a href="#add-a-function-and-its-generated-vector-field--milvus-30x">Añade una función y su campo vectorial generado</a> cuando Milvus deba generar valores vectoriales a partir de campos existentes, como vectores dispersos BM25 o firmas MinHash a partir de texto.</p></li>
</ul>
<p>En todos los casos, el nombre del nuevo campo no debe existir ya en la colección, y el número total de campos no puede superar el límite de Milvus para el número de campos. Para más detalles, consulta <a href="/docs/es/limitations.md#number-of-resources-in-a-collection">Límites</a> de <a href="/docs/es/limitations.md#number-of-resources-in-a-collection">Milvus</a>.</p>
<h3 id="Add-user-defined-scalar-fields--Milvus-26x" class="common-anchor-header">Añadir campos escalares definidos por el usuario<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice « <code translate="no">add_collection_field()</code> » para añadir un campo escalar definido por el usuario a una colección existente.</p>
<p>Esto difiere del almacenamiento de claves arbitrarias en el campo dinámico: una vez que la actualización del esquema está disponible, el nuevo campo escalar pasa a formar parte del esquema de la colección. Puede insertar o actualizar valores en él, crear índices sobre él cuando sea compatible, utilizarlo en consultas y filtros de búsqueda, y devolverlo en el resultado de una consulta o búsqueda.</p>
<p>Dado que las entidades existentes se insertaron antes de que existiera el nuevo campo, todo campo escalar definido por el usuario que se añada debe ser nulo:</p>
<ul>
<li><p>Si se añade un campo escalar con ` <code translate="no">nullable=True</code> ` y sin ` <code translate="no">default_value</code>`, las entidades existentes devuelven ` <code translate="no">NULL</code> ` para el nuevo campo.</p></li>
<li><p>Si se añade un campo escalar con ` <code translate="no">nullable=True</code> ` y ` <code translate="no">default_value</code>`, las entidades existentes devolverán el valor por defecto en lugar de ` <code translate="no">NULL</code>`.</p></li>
</ul>
<p>Las expresiones de filtro escalares no coinciden con los valores escalares de tipo « <code translate="no">NULL</code> ». Para obtener más información, consulta <a href="/docs/es/nullable-and-default.md">«Campos nulos</a>».</p>
<p><strong>Ejemplo: Añadir un campo escalar nulo</strong></p>
<p>En el siguiente ejemplo se añade un campo escalar nulo <code translate="no">source</code> a una colección existente denominada <code translate="no">product_catalog</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una vez añadido el campo, las entidades que ya existían en la colección devuelven « <code translate="no">NULL</code> » para « <code translate="no">source</code> ». Las nuevas entidades pueden establecer « <code translate="no">source</code> » durante la inserción o la actualización.</p>
<p><strong>Ejemplo: Añadir un campo escalar con un valor por defecto</strong></p>
<p>Si se desea que las entidades existentes devuelvan un valor concreto en lugar de « <code translate="no">NULL</code> », especifique « <code translate="no">default_value</code> » al añadir un campo escalar. El siguiente ejemplo añade un campo « <code translate="no">review_status</code> » y utiliza « <code translate="no">&quot;unreviewed&quot;</code> » como valor por defecto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una vez añadido el campo, las entidades que ya existían en la colección devuelven <code translate="no">&quot;unreviewed&quot;</code> para <code translate="no">review_status</code>. Las nuevas entidades pueden establecer un valor diferente o utilizar el valor por defecto cuando no se proporcione ningún valor.</p>
<h3 id="Add-StructArray-fields--Milvus-300" class="common-anchor-header">Añadir campos StructArray<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields--Milvus-300" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice <code translate="no">add_collection_struct_field()</code> para añadir un campo StructArray que acepte matrices de elementos Struct. Para añadir un campo StructArray, proceda de la siguiente manera:</p>
<ol>
<li><p>Crea un esquema Struct que contenga los subcampos necesarios de los tipos de datos admitidos. Para conocer los tipos de datos aplicables, consulta <a href="/docs/es/array-of-structs.md#Data-types">StructArray</a>.</p></li>
<li><p>Haga referencia al esquema Struct creado anteriormente y establezca la capacidad máxima del campo en <code translate="no">add_collection_struct_field()</code>.</p></li>
<li><p>Establece <code translate="no">nullable=True</code> en la solicitud.</p></li>
</ol>
<p><strong>Ejemplo: Añadir un campo StructArray nulo</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a Struct schema.</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># Add scalar fields to the Struct.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Add vector fields to the Struct with mmap enabled.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una vez añadido el campo StructArray, las entidades que ya existen en la colección devuelven « <code translate="no">NULL</code> » para « <code translate="no">chunks</code> » en todos sus subcampos. Al insertar una nueva entidad, asegúrate de que todos los subcampos sean « <code translate="no">NULL</code> » o tengan valores válidos. Insertar una entidad con algunos subcampos establecidos como « <code translate="no">NULL</code> » y otros con valores válidos da lugar a errores.</p>
<h3 id="Add-user-defined-vector-fields--Milvus-2618+" class="common-anchor-header">Añadir campos vectoriales definidos por el usuario<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields--Milvus-2618+" class="anchor-icon" translate="no">
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
    </button></h3><p>Utiliza <code translate="no">add_collection_field()</code> para añadir un campo vectorial definido por el usuario cuando tu aplicación genere representaciones y escriba valores vectoriales en Milvus.</p>
<p>Todos los campos vectoriales definidos por el usuario que se añadan deben ser nulos. Las entidades existentes tendrán el valor « <code translate="no">NULL</code> » para el nuevo campo vectorial hasta que se escriban valores vectoriales mediante un flujo de trabajo de «upsert» o de «backfill». Las nuevas entidades pueden incluir el campo vectorial durante la inserción. La búsqueda vectorial omite las entidades cuyo valor vectorial sea « <code translate="no">NULL</code> ». Para obtener más información, consulta <a href="/docs/es/nullable-and-default.md">«Campos nulos</a>».</p>
<p><strong>Ejemplo: Añadir un campo vectorial nulo</strong></p>
<p>En el siguiente ejemplo se añade un campo vectorial denso nulo denominado « <code translate="no">embedding_v2</code> » a una colección existente. Establezca « <code translate="no">dim</code> » en la dimensionalidad de las incrustaciones generadas por su aplicación.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una vez añadido el campo, cree un índice en el nuevo campo vectorial antes de realizar búsquedas en él:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Las entidades existentes tienen <code translate="no">NULL</code> para <code translate="no">embedding_v2</code> y se omiten al realizar búsquedas en este campo. Para que las entidades existentes sean buscables mediante <code translate="no">embedding_v2</code>, escriba valores vectoriales no nulos mediante un flujo de trabajo de «upsert» o de «backfill». Las nuevas entidades pueden incluir <code translate="no">embedding_v2</code> durante la inserción.</p>
<p><a id="add-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">Añadir una función y su campo vectorial generado<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice este flujo de trabajo cuando Milvus deba generar un nuevo campo vectorial a partir de datos ya almacenados en una colección existente. La operación añade tres elementos de esquema relacionados:</p>
<ul>
<li><p>Una definición de función que lee a partir de uno o más campos de entrada existentes.</p></li>
<li><p>Un nuevo campo vectorial que almacena la salida de la función.</p></li>
<li><p>Una definición de índice vinculada al nuevo campo vectorial.</p></li>
</ul>
<p>Por ejemplo, una función BM25 lee un campo « <code translate="no">VARCHAR</code> » ya existente y genera un campo « <code translate="no">SPARSE_FLOAT_VECTOR</code> » para la búsqueda léxica. Una función MinHash genera un campo « <code translate="no">BINARY_VECTOR</code> » para la detección de casi duplicados. Este flujo de trabajo no añade ni sustituye el campo de entrada de la función.</p>
<div class="alert note">
<p>Esta función requiere Storage V3. Para obtener instrucciones de activación y consideraciones de compatibilidad, consulte <a href="/docs/es/storage-v3.md">Storage V3</a>.</p>
</div>
<p>Añadir una función y su campo vectorial generado a una colección existente también requiere la compactación de la versión del esquema y la compactación de la versión de almacenamiento. Milvus rechaza la solicitud si alguno de estos ajustes está desactivado. Estos requisitos previos adicionales solo se aplican al modificar una colección existente; la definición de la función en el esquema inicial de la colección no utiliza este flujo de trabajo de relleno de datos existentes.</p>
<p>La función compatible determina el tipo de campo vectorial generado:</p>
<table>
<thead>
<tr><th>Función</th><th>Tipo de campo vectorial generado</th><th>Campo de entrada típico</th><th>Caso de uso típico</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>Un campo « <code translate="no">VARCHAR</code> » con el analizador activado</td><td>Búsqueda léxica y relevancia de palabras clave</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td>Un campo « <code translate="no">VARCHAR</code> »</td><td>Detección de casi duplicados</td></tr>
</tbody>
</table>
<p>Para obtener más información sobre cómo funciona cada función, consulta <a href="/docs/es/bm25-function.md">«Función BM25</a> » y <a href="/docs/es/minhash-function.md">«Función MinHash</a>».</p>
<p>El campo vectorial generado no debe existir ya en la colección y no puede ser nulo. El campo de entrada de la función debe existir ya.</p>
<p><strong>Ejemplo: Añadir una función BM25 y su campo vectorial disperso generado</strong></p>
<p>El siguiente ejemplo añade una función BM25 denominada « <code translate="no">text_bm25</code> » y su campo vectorial disperso generado, denominado « <code translate="no">text_sparse</code> », a una colección existente. La colección debe contar ya con un campo « <code translate="no">VARCHAR</code> » denominado « <code translate="no">text</code> » con el analizador habilitado.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">    index_params=index_params,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>El objeto « <code translate="no">index_params</code> » debe contener exactamente una definición de índice para el nuevo campo de salida de la función. Milvus añade la función, su campo vectorial generado y la definición de índice vinculado en el mismo cambio de esquema. No llames a « <code translate="no">create_index()</code> » por separado después de « <code translate="no">add_function_field()</code> ».</p>
<p>Conceptualmente, esta operación añade las siguientes definiciones de «Function», campo de salida generado e índice vinculado:</p>
<pre><code translate="no" class="language-plaintext">New Function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]

New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

Bound index:
  field_name: &quot;text_sparse&quot;
  index_type: SPARSE_INVERTED_INDEX
  metric_type: BM25
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que la solicitud se ha completado con éxito, <code translate="no">describe_collection()</code> devuelve tanto la nueva función <code translate="no">text_bm25</code> como su campo vectorial generado <code translate="no">text_sparse</code> en el esquema de la colección. Milvus genera la salida de la función para las nuevas entidades a medida que se escriben. En el caso de las entidades existentes, Milvus rellena el campo vectorial generado de forma asíncrona mediante una compactación en segundo plano. La visibilidad del esquema confirma que la actualización del esquema se ha realizado correctamente, pero no indica que el rellenado se haya completado para todas las entidades existentes. Para conocer el flujo de trabajo completo de búsqueda BM25, consulta <a href="/docs/es/full-text-search.md">«Búsqueda de texto completo</a>».</p>
<p>Milvus también admite funciones MinHash y sus campos vectoriales binarios generados para la detección de casi duplicados. Una función MinHash utiliza <code translate="no">FunctionType.MINHASH</code> y escribe en un nuevo campo de salida <code translate="no">BINARY_VECTOR</code>. Para obtener detalles sobre la configuración, consulte <a href="/docs/es/minhash-function.md">«Función MinHash</a>».</p>
<p><a id="drop-fields-from-an-existing-collection"></a></p>
<h2 id="Drop-fields-and-Functions-from-an-existing-collection" class="common-anchor-header">Eliminar campos y funciones de una colección existente<button data-href="#Drop-fields-and-Functions-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede eliminar campos definidos por el usuario directamente cuando ya no formen parte de su modelo de colección. Para eliminar una función y su campo vectorial generado, elimine la función; Milvus eliminará el campo generado y su índice en el mismo cambio de esquema.</p>
<h3 id="Drop-user-defined-fields--Milvus-30x" class="common-anchor-header">Eliminar campos definidos por el usuario<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice « <code translate="no">drop_collection_field()</code> » para eliminar un campo escalar, vectorial o StructArray definido por el usuario que ya no forme parte de su modelo de colección.</p>
<p>Al eliminar un campo, primero se modifican el esquema de la colección y la visibilidad del campo:</p>
<ul>
<li><p>Una vez que se ha ejecutado correctamente « <code translate="no">drop_collection_field()</code> », se actualiza el esquema de la colección: « <code translate="no">describe_collection()</code> » ya no devuelve el campo eliminado, y las consultas o búsquedas ya no pueden devolver dicho campo en « <code translate="no">output_fields</code> » ni utilizarlo en expresiones.</p></li>
<li><p>Los índices creados sobre el campo eliminado se limpian como parte de la actualización del esquema.</p></li>
</ul>
<p>La limpieza del almacenamiento se gestiona por separado de la limpieza del esquema. Para obtener más detalles, consulta <a href="#when-is-storage-space-reclaimed-after-dropping-a-field">¿Cuándo se recupera el espacio de almacenamiento tras eliminar un campo?</a></p>
<p><strong>Ejemplo: Eliminar un campo escalar definido por el usuario</strong></p>
<p>El siguiente ejemplo da por hecho que « <code translate="no">experiment_tag</code> » es un campo escalar definido por el usuario en « <code translate="no">product_catalog</code> » y lo elimina de la colección.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Tras eliminar un campo, puede llamar a ` <code translate="no">describe_collection()</code> ` para comprobar que el campo ya no forma parte del esquema.</p>
<p><strong>Ejemplo: Eliminar un campo StructArray</strong></p>
<p>El siguiente ejemplo parte de la base de que ` <code translate="no">chunks</code> ` es un campo `StructArray` en ` <code translate="no">my_collection</code>` y lo elimina de la colección.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Ejemplo: Eliminar un campo vectorial definido por el usuario</strong></p>
<p>Se puede eliminar un campo vectorial con el mismo método ` <code translate="no">drop_collection_field()</code> `, pero la colección debe seguir conteniendo al menos un campo vectorial tras la eliminación. Esto resulta útil para colecciones que contienen temporalmente varias representaciones vectoriales y que posteriormente se estandarizan en una de ellas.</p>
<p>El siguiente ejemplo parte de la base de que « <code translate="no">image_vector</code> » es un campo vectorial definido por el usuario en « <code translate="no">hybrid_catalog</code> », y de que la colección sigue conservando otro campo vectorial, como « <code translate="no">text_vector</code> ».</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si <code translate="no">image_vector</code> es el último campo vectorial de la colección, la operación de eliminación se rechaza.</p>
<p><a id="drop-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">Eliminar una función y su campo vectorial generado<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice esta operación cuando ya no necesite una función o su campo vectorial generado, como una función BM25 y su campo vectorial disperso generado.</p>
<p>Llame a <code translate="no">drop_function_field()</code> con el nombre de la función. Milvus elimina la función, su campo vectorial generado y el índice asociado, al tiempo que conserva los campos de entrada de la función.</p>
<p><strong>Ejemplo: Eliminar una función BM25 y su campo vectorial disperso generado</strong></p>
<p>En el siguiente ejemplo se supone que « <code translate="no">text_bm25</code> » es una función BM25 en « <code translate="no">product_catalog</code> » y genera un campo de salida vectorial disperso denominado « <code translate="no">text_sparse</code> ».</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que la operación se ha realizado con éxito, <code translate="no">describe_collection()</code> ya no devuelve la función eliminada ni su campo vectorial generado. Los campos de entrada de la función permanecen en el esquema.</p>
<p>Si al eliminar el campo de salida de la función la colección quedara sin ningún campo vectorial, la operación se rechaza.</p>
<h2 id="FAQ" class="common-anchor-header">Preguntas frecuentes<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Which-method-should-I-use-to-add-a-field-or-Function" class="common-anchor-header">¿Qué método debo utilizar para añadir un campo o una función?<button data-href="#Which-method-should-I-use-to-add-a-field-or-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Utiliza <code translate="no">add_collection_field()</code> para añadir un campo escalar o vectorial definido por el usuario.</p>
<p>Utilice ` <code translate="no">add_collection_struct_field()</code> ` para añadir un campo `StructArray` cuando necesite un campo de matriz cuyos elementos compartan el mismo esquema `Struct`.</p>
<p>Utiliza « <code translate="no">add_function_field()</code> » para añadir una función, su campo vectorial generado y la definición del índice vinculado en el mismo cambio de esquema.</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">¿Por qué los campos definidos por el usuario que se añaden deben ser nulos?<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>Las entidades existentes se insertaron antes de que existiera el nuevo campo, por lo que no tienen valores para ese campo. Al establecer ` <code translate="no">nullable=True</code> `, Milvus representa el valor que falta como ` <code translate="no">NULL</code> ` hasta que su aplicación escriba un valor o, en el caso de los campos escalares, hasta que se aplique un valor por defecto.</p>
<p>Esta regla se aplica a los campos escalares definidos por el usuario y a los campos vectoriales definidos por el usuario añadidos con ` <code translate="no">add_collection_field()</code>`, así como a los campos `StructArray` añadidos con ` <code translate="no">add_collection_struct_field()</code>`. No se aplica al campo vectorial generado por una función, que no puede ser nulo.</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">¿Qué ocurre con las entidades existentes después de añadir un campo definido por el usuario?<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>En el caso de un campo escalar definido por el usuario, las entidades existentes devuelven <code translate="no">NULL</code> a menos que se establezca un <code translate="no">default_value</code>. Si se establece un <code translate="no">default_value</code>, las entidades existentes devuelven ese valor por defecto.</p>
<p>En el caso de un campo vectorial definido por el usuario, las entidades existentes tienen el valor « <code translate="no">NULL</code> » para el nuevo campo vectorial. La búsqueda vectorial en el campo añadido omite las entidades cuyo valor vectorial sea « <code translate="no">NULL</code> ». Para que las entidades existentes sean buscables a través del nuevo campo vectorial, escribe valores vectoriales distintos de NULL mediante «upsert» o un flujo de trabajo de rellenado. Las nuevas entidades pueden incluir el nuevo campo vectorial durante la inserción.</p>
<p>En el caso de un campo StructArray, las entidades existentes devuelven « <code translate="no">NULL</code> » para el nuevo campo StructArray en todos sus subcampos. Las nuevas entidades deben proporcionar « <code translate="no">NULL</code> » para todos los subcampos o valores válidos para todos los subcampos.</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">¿Puedo añadir la búsqueda léxica BM25 a una colección existente?<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Sí. Si la colección ya cuenta con un campo « <code translate="no">VARCHAR</code> » con el analizador habilitado, puedes añadir una función BM25 y su campo vectorial disperso generado para la búsqueda léxica. En este flujo de trabajo, Milvus añade la función, el nuevo campo de salida « <code translate="no">SPARSE_FLOAT_VECTOR</code> » y la definición del índice vinculado en el mismo cambio de esquema. No se puede utilizar un campo « <code translate="no">TEXT</code> » ya existente como entrada de BM25 en este flujo de trabajo de cambio de esquema. Para utilizar una entrada de « <code translate="no">TEXT</code> », defina el campo y la función BM25 al crear la colección.</p>
<p>Al llamar a ` <code translate="no">add_function_field()</code>`, proporcione un objeto ` <code translate="no">index_params</code> ` que contenga un índice ` <code translate="no">SPARSE_INVERTED_INDEX</code> ` con ` <code translate="no">metric_type=&quot;BM25&quot;</code> ` para el nuevo campo de salida. Milvus vincula la definición del índice al campo generado como parte del mismo cambio de esquema.</p>
<h3 id="How-do-I-drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">¿Cómo elimino una función y su campo vectorial generado?<button data-href="#How-do-I-drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Llama a <code translate="no">drop_function_field()</code> con el nombre de la función. En este flujo de trabajo de cambio de esquema, Milvus elimina la función, su campo vectorial generado y el índice asociado de forma conjunta, al tiempo que conserva los campos de entrada de la función.</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">¿Tengo que esperar después de modificar el esquema de una colección?<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Normalmente, no es necesario esperar manualmente. Si tu siguiente operación depende del esquema actualizado, puedes llamar primero a ` <code translate="no">describe_collection()</code> ` para confirmar el esquema que Milvus devuelve actualmente.</p>
<p>En una implementación distribuida, puede haber un breve intervalo de propagación mientras los componentes de Milvus actualizan los metadatos de la colección. Si una operación realizada inmediatamente después del cambio de esquema falla con un error relacionado con el esquema, actualiza el esquema y vuelve a intentar la operación.</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">¿Cuándo se recupera el espacio de almacenamiento tras eliminar un campo?<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Al eliminar un campo, este se suprime del esquema actual y deja de ser visible en las consultas y búsquedas normales, pero los datos históricos de dicho campo no se eliminan físicamente del almacenamiento de objetos de forma inmediata.</p>
<p>El espacio de almacenamiento se puede recuperar más tarde durante la compactación. La compactación es un proceso en segundo plano que reorganiza los archivos de datos existentes en archivos nuevos y más compactos. Una vez eliminado un campo, los archivos recién compactados siguen el esquema actual y omiten el campo eliminado. Milvus no garantiza una reducción inmediata ni en un plazo fijo del espacio de almacenamiento tras eliminar un campo.</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">¿Qué ocurre si añado un campo escalar con el mismo nombre que una clave de campo dinámico?<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Si el campo dinámico está habilitado, puedes añadir un campo escalar con el mismo nombre que una clave de campo dinámico existente. El nuevo campo escalar enmascara la clave del campo dinámico en la salida normal de la consulta, pero los datos dinámicos originales se conservan en <code translate="no">$meta</code>.</p>
<p>Por ejemplo, si las entidades existentes almacenan una clave dinámica denominada <code translate="no">source</code> y, posteriormente, se añade un campo escalar denominado <code translate="no">source</code>, la salida normal de <code translate="no">source</code> hará referencia al campo escalar. Para acceder al valor dinámico original, utilice la sintaxis de ruta <code translate="no">$meta</code>, como por ejemplo <code translate="no">$meta[&quot;source&quot;]</code>.</p>
