---
id: text.md
title: Campo de textoCompatible with Milvus 3.0.x
summary: >-
  TEXT es un tipo de campo escalar que permite almacenar texto de documentos,
  fragmentos y otros contenidos de texto extenso en Milvus.
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">Campo de texto<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>En las aplicaciones de búsqueda con IA, la búsqueda vectorial ayuda a encontrar entidades semánticamente similares, pero la aplicación a menudo también necesita el texto original de cada coincidencia. Un modelo de lenguaje grande (LLM) o un agente puede utilizar ese texto como contexto para leer, citar, resumir o incluir el resultado en una solicitud.</p>
<p>Milvus proporciona el tipo de campo escalar « <code translate="no">TEXT</code> » para almacenar texto fuente extenso directamente con las entidades. Entre los valores típicos se incluyen pasajes, documentos largos, cuerpos de artículos, tickets y registros. A diferencia de « <code translate="no">VARCHAR</code> », que requiere una longitud máxima fija de bytes ( <code translate="no">max_length</code>), « <code translate="no">TEXT</code> » no exige establecer una longitud máxima de bytes en el esquema de la colección.</p>
<p>Para definir un campo « <code translate="no">TEXT</code> », establezca « <code translate="no">datatype</code> » en « <code translate="no">DataType.TEXT</code> ».</p>
<div class="alert note">
<p>Esta función requiere Storage V3. Para obtener instrucciones de activación y consideraciones de compatibilidad, consulta <a href="/docs/es/storage-v3.md">Storage V3</a>.</p>
</div>
<p><a href="/docs/es/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a> El valor por defecto es « <code translate="no">false</code> », lo que significa que Storage V3 está desactivado de forma predeterminada. Antes de crear una colección que contenga un campo « <code translate="no">TEXT</code> », establezca este parámetro en « <code translate="no">true</code> »; de lo contrario, Milvus rechazará el esquema de la colección.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Una vez definido el campo, cada entidad puede incluir un valor de cadena en dicho campo. Los valores de « <code translate="no">TEXT</code> » se insertan como cualquier otro campo escalar y se devuelven en los resultados de consultas o búsquedas al incluir el campo en « <code translate="no">output_fields</code> ».</p>
<div class="alert note">
<p><code translate="no">TEXT</code> Los campos admiten valores nulos. Para habilitar esta función, establezc <code translate="no">nullable</code> en <code translate="no">True</code>. Para obtener más detalles, consulte <a href="/docs/es/nullable-and-default.md">«Campo nulo</a>».</p>
</div>
<h2 id="Limits" class="common-anchor-header">Restricciones<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>Un campo « <code translate="no">TEXT</code> » no puede ser un campo primario, una clave de partición ni una clave de agrupamiento.</li>
<li><code translate="no">TEXT</code> No se puede utilizar como tipo de elemento de un campo « <code translate="no">ARRAY</code> », incluido un subcampo escalar en un « <code translate="no">StructArray</code> ».</li>
<li>En Milvus 3.0.0, los campos « <code translate="no">TEXT</code> » no admiten valores por defecto.</li>
<li>En Milvus 3.0.0, los campos « <code translate="no">TEXT</code> » no son compatibles con colecciones externas.</li>
<li>Los usuarios no pueden crear un índice escalar en un campo « <code translate="no">TEXT</code> ». Cuando se utiliza « <code translate="no">enable_match=True</code> », Milvus crea un índice de texto gestionado por el sistema para la coincidencia de texto. Este índice interno no es un índice escalar creado por el usuario.</li>
<li>Los operadores de filtro escalar generales no se pueden aplicar directamente a un campo « <code translate="no">TEXT</code> ». Entre ellos se incluyen operadores de comparación como « <code translate="no">==</code> » y « <code translate="no">!=</code> », operadores de rango como « <code translate="no">&gt;</code> », « <code translate="no">&gt;=</code> », « <code translate="no">&lt;</code> » y « <code translate="no">&lt;=</code> », así como « <code translate="no">IN</code> », « <code translate="no">LIKE</code> », operadores de expresiones regulares (<code translate="no">=~</code> y <code translate="no">!~</code>) y « <code translate="no">IS NULL</code> » o « <code translate="no">IS NOT NULL</code><a href="/docs/es/keyword-match.md"></a> ». Para filtrar por términos analizados, defina el campo con « <code translate="no">enable_analyzer=True</code> » y « <code translate="no">enable_match=True</code> », y utilice <a href="/docs/es/keyword-match.md">«<code translate="no">TEXT_MATCH</code> » o « <code translate="no">TEXT_MATCH_FUZZY</code></a> ». Para la recuperación de texto completo ordenada por relevancia, utilice BM25.</li>
<li>En Milvus 3.0.0, es necesario definir una función BM25 o MinHash que utilice un campo « <code translate="no">TEXT</code> » como entrada al crear la colección. No se puede añadir posteriormente mediante <code translate="no">add_function_field</code> o <code translate="no">AlterCollectionSchema</code>, ni siquiera si la colección existente está vacía, ya que Milvus no puede completar retrospectivamente la salida de la función a partir de los valores almacenados en « <code translate="no">TEXT</code> ». Para añadir dicha «Function» a una colección existente, utilice un campo de entrada « <code translate="no">VARCHAR</code> » o vuelva a crear la colección incluyendo la «Function» en su esquema. Para obtener más detalles sobre cómo añadir una «Function» y su campo vectorial generado, consulte <a href="/docs/es/add-fields-to-an-existing-collection.md#add-a-function-and-its-generated-vector-field--milvus-30x">«Alter Collection Schema</a>».</li>
<li>Las funciones de incrustación de texto también deben definirse al crear la colección. Milvus 3.0.0 no admite su adición en tiempo de ejecución.</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">Elija TEXT o VARCHAR<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> y « <code translate="no">VARCHAR</code> » almacenan valores de cadena, pero satisfacen necesidades de aplicación diferentes. Utiliza « <code translate="no">VARCHAR</code> » para metadatos breves y delimitados que identifican, categorizan o filtran entidades. Utiliza « <code translate="no">TEXT</code> » para contenido de origen más extenso que proporcione a un LLM o a un agente suficiente contexto para leer, citar, resumir o crear una indicación.</p>
<table>
<thead>
<tr><th>Aspecto</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>Ideal para</td><td>Metadatos breves utilizados para identificar, categorizar o filtrar entidades, como <code translate="no">title</code>, <code translate="no">tag</code>, <code translate="no">category</code> o <code translate="no">external_id</code>.</td><td>Contenido de origen más extenso utilizado por flujos de trabajo de modelos de lenguaje grande (LLM) o de agentes, como <code translate="no">content</code>, <code translate="no">passage</code>, <code translate="no">article_body</code> o <code translate="no">log_message</code>.</td></tr>
<tr><td>Configuración de longitud</td><td>Requiere <code translate="no">max_length</code>, que define el número máximo de bytes que puede almacenar el campo. El valor máximo es <code translate="no">65,535</code> bytes. Si un valor puede superar este límite, utilice <code translate="no">TEXT</code>.</td><td>No requiere <code translate="no">max_length</code>, por lo que el esquema no necesita un límite fijo de bytes para el valor de texto.</td></tr>
<tr><td>Comportamiento de almacenamiento</td><td>Almacena cada valor dentro del límite de bytes configurado para el campo ( <code translate="no">max_length</code>).</td><td>Utiliza la selección automática de almacenamiento para valores de texto más grandes. Para obtener más información, consulta <a href="#how-milvus-stores-large-text-values">«Cómo almacena Milvus los valores TEXT de gran tamaño</a>».</td></tr>
<tr><td>Compatibilidad con campos primarios</td><td>Se puede utilizar como campo primario.</td><td>No se puede utilizar como campo primario.</td></tr>
<tr><td>Filtrado</td><td>Se utiliza para metadatos de cadenas cortas que deben aparecer en expresiones de filtro, como <code translate="no">category == &quot;news&quot;</code> o <code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code>.</td><td>No admite operadores de filtro escalares generales. Utilice operadores de texto con coincidencia habilitada para el filtrado de términos analizados, o BM25 para la recuperación de texto completo clasificada por relevancia.</td></tr>
</tbody>
</table>
<p>Para obtener más información sobre los campos « <code translate="no">VARCHAR</code> », consulte <a href="/docs/es/string.md">el campo VarChar</a>.</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">Cómo almacena Milvus los valores TEXT de gran tamaño<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>Expandir para ver cómo funciona</summary></p>
<p>Al insertar una entidad, la cadena que se proporciona para un campo « <code translate="no">TEXT</code> » es el valor « <code translate="no">TEXT</code> ». Milvus compara el tamaño de ese valor con <a href="/docs/es/configure_datanode.md#dataNodetextinlineThreshold">«dataNode.text.inlineThreshold»</a>, que por defecto es de <code translate="no">65,536</code> bytes, y a continuación elige una de las dos rutas de almacenamiento interno.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" /> 
   <span>Almacenamiento de texto de gran tamaño</span>
  
 </span></p>
<ul>
<li><strong>Almacenamiento en línea</strong>: si el valor de « <code translate="no">TEXT</code> » es menor que « <code translate="no">dataNode.text.inlineThreshold</code> », Milvus almacena el valor de texto original directamente en los datos del campo « <code translate="no">TEXT</code> ».</li>
<li><strong>Almacenamiento LOB</strong>: si un valor de « <code translate="no">TEXT</code> » es mayor o igual que « <code translate="no">dataNode.text.inlineThreshold</code> », Milvus trata el valor como un objeto de gran tamaño y almacena el texto original por separado en un almacenamiento de objetos, como MinIO. El campo « <code translate="no">TEXT</code> » almacena una referencia interna al texto almacenado por separado. Cuando se solicita el campo « <code translate="no">TEXT</code> » en los resultados de una consulta o búsqueda, Milvus utiliza la referencia para recuperar y devolver el texto original.</li>
</ul>
<p>Esta selección de almacenamiento es interna. La inserción, consulta y búsqueda en el campo « <code translate="no">TEXT</code> » se realizan de la misma manera, independientemente de la ruta de almacenamiento que utilice Milvus. Para ajustar el umbral o el comportamiento relacionado con el almacenamiento, la compactación y la recolección de basura, consulta <a href="/docs/es/configure_datanode.md">las configuraciones relacionadas con dataNode</a> y <a href="/docs/es/configure_datacoord.md">las configuraciones relacionadas con dataCoord</a>.</p>
<p>Si su implementación utiliza almacenamiento de objetos, los valores grandes de « <code translate="no">TEXT</code> » pueden aparecer como objetos gestionados por Milvus en rutas como <code translate="no">lobs/...</code>. Estos objetos son detalles de implementación y no deben moverse, copiarse ni eliminarse manualmente. Tras eliminar entidades, suprimir particiones o compactar datos, el uso del almacenamiento de objetos puede reducirse solo después de que la recolección de basura de Milvus elimine los datos de objetos grandes sin referencias una vez transcurrido su periodo de seguridad.</p>
<p></details></p>
<p>Un uso habitual de <code translate="no">TEXT</code> es la búsqueda de texto completo con BM25. En este patrón, el campo <code translate="no">TEXT</code> almacena el contenido original de la fuente, y BM25 analiza el texto y genera vectores dispersos para clasificar las coincidencias basadas en palabras clave. Los resultados de la búsqueda pueden devolver entonces el valor <code translate="no">TEXT</code> coincidente como contexto para flujos de trabajo de LLM o de agentes. El siguiente ejemplo muestra cómo utilizar un campo « <code translate="no">TEXT</code> » como campo de entrada para BM25. Para obtener más información sobre los conceptos y las opciones de consulta de la búsqueda de texto completo, consulta <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">Paso 1: Crear una colección con un campo TEXT<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo crea una colección con un campo « <code translate="no">TEXT</code> » para el contenido de origen y un campo de vectores dispersos para los vectores dispersos generados por BM25. La función BM25 convierte el texto tokenizado de « <code translate="no">content</code> » en vectores dispersos almacenados en « <code translate="no">sparse</code> ».</p>
<p>Para la búsqueda de texto completo con BM25, el campo de entrada « <code translate="no">TEXT</code> » debe estar configurado en « <code translate="no">enable_analyzer=True</code> ».</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">Paso 2: Crear un índice de vectores dispersos<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Crea un índice en el campo de vectores dispersos generado por la función BM25. El tipo de métrica debe establecerse en <code translate="no">BM25</code>.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">Paso 3: Insertar datos de TEXTO<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Inserta el texto directamente en el campo « <code translate="no">TEXT</code> ». No introduzcas valores en el campo « <code translate="no">sparse</code> ». Milvus genera los vectores dispersos internamente aplicando la función BM25 a « <code translate="no">content</code> ».</p>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">Paso 4: Realizar una búsqueda de texto completo con BM25<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilice el texto de la consulta sin procesar como datos de búsqueda y realice la búsqueda en el campo de vectores dispersos. Milvus convierte el texto de la consulta en un vector disperso, clasifica los resultados con BM25 y devuelve el campo « <code translate="no">TEXT</code> » solicitado en « <code translate="no">output_fields</code> ».</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">Paso 5: Leer los valores TEXT devueltos<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Cada resultado de la búsqueda incluye la puntuación BM25 y el valor original de « <code translate="no">TEXT</code> ».</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información sobre las funciones de BM25, los índices de vectores dispersos y la sintaxis de consulta para la búsqueda de texto completo, consulte <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p>
