---
id: schema-hands-on.md
title: Diseño de modelos de datos para búsqueda
summary: >-
  Los sistemas de recuperación de información, también conocidos como motores de
  búsqueda, son esenciales para diversas aplicaciones de IA, como la generación
  aumentada de recuperación (RAG), la búsqueda visual y la recomendación de
  productos. El núcleo de estos sistemas es un modelo de datos cuidadosamente
  diseñado para organizar, indexar y recuperar la información.
---
<h1 id="Data-Model-Design-for-Search" class="common-anchor-header">Diseño de modelos de datos para búsqueda<button data-href="#Data-Model-Design-for-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Los sistemas de recuperación de información, también conocidos como motores de búsqueda, son esenciales para diversas aplicaciones de IA, como la generación aumentada de recuperación (RAG), la búsqueda visual y la recomendación de productos. En el núcleo de estos sistemas se encuentra un modelo de datos cuidadosamente diseñado para organizar, indexar y recuperar la información.</p>
<p>Milvus le permite especificar el modelo de datos de búsqueda mediante un esquema de colección, organizando los datos no estructurados, sus representaciones vectoriales densas o dispersas y los metadatos estructurados. Tanto si trabaja con texto, imágenes u otros tipos de datos, esta guía práctica le ayudará a comprender y aplicar los conceptos clave del esquema para diseñar un modelo de datos de búsqueda en la práctica.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/data-model-anatomy.png" alt="Data Model Anatomy" class="doc-image" id="data-model-anatomy" />
   </span> <span class="img-wrapper"> <span>Anatomía del modelo de datos</span> </span></p>
<h2 id="Data-Model" class="common-anchor-header">Modelo de datos<button data-href="#Data-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>El diseño del modelo de datos de un sistema de búsqueda implica analizar las necesidades empresariales y abstraer la información en un modelo de datos expresado en un esquema. Un esquema bien definido es importante para alinear el modelo de datos con los objetivos empresariales, garantizando la coherencia de los datos y la calidad del servicio.  Además, elegir los tipos de datos y el índice adecuados es importante para alcanzar el objetivo empresarial de forma económica.</p>
<h3 id="Analyzing-Business-Needs" class="common-anchor-header">Análisis de las necesidades empresariales</h3><p>Para responder eficazmente a las necesidades de la empresa hay que empezar por analizar los tipos de consultas que realizarán los usuarios y determinar los métodos de búsqueda más adecuados.</p>
<ul>
<li><p><strong>Consultas de los usuarios:</strong> Identifique los tipos de consultas que se espera que realicen los usuarios. Esto ayuda a garantizar que su esquema es compatible con los casos de uso del mundo real y optimiza el rendimiento de la búsqueda. Por ejemplo</p>
<ul>
<li><p>Recuperar documentos que coincidan con una consulta en lenguaje natural</p></li>
<li><p>Búsqueda de imágenes similares a una imagen de referencia o que coincidan con una descripción de texto</p></li>
<li><p>Búsqueda de productos por atributos como nombre, categoría o marca</p></li>
<li><p>Filtrado de elementos en función de metadatos estructurados (por ejemplo, fecha de publicación, etiquetas, valoraciones).</p></li>
<li><p>Combinación de varios criterios en consultas híbridas (por ejemplo, en la búsqueda visual, teniendo en cuenta la similitud semántica tanto de las imágenes como de sus pies de foto).</p></li>
</ul></li>
<li><p><strong>Métodos de búsqueda:</strong> Elija las técnicas de búsqueda apropiadas que se ajusten a los tipos de consultas que realizarán sus usuarios. Los distintos métodos sirven para diferentes propósitos y a menudo pueden combinarse para obtener resultados más potentes:</p>
<ul>
<li><p><strong>Búsqueda semántica</strong>: Utiliza la similitud de vectores densos para encontrar elementos con significado similar, ideal para datos no estructurados como texto o imágenes.</p></li>
<li><p><strong>Búsqueda de texto completo</strong>: Complementa la búsqueda semántica con la concordancia de palabras clave.  La búsqueda de texto completo puede utilizar el análisis léxico para evitar dividir palabras largas en tokens fragmentados, captando los términos especiales durante la recuperación.</p></li>
<li><p><strong>Filtrado de metadatos</strong>: Además de la búsqueda vectorial, aplica restricciones como intervalos de fechas, categorías o etiquetas.</p></li>
</ul></li>
</ul>
<h3 id="Translates-Business-Requirements-into-a-Search-Data-Model" class="common-anchor-header">Traducir los requisitos empresariales en un modelo de datos de búsqueda</h3><p>El siguiente paso consiste en traducir tus requisitos empresariales en un modelo de datos concreto, identificando los componentes centrales de tu información y sus métodos de búsqueda:</p>
<ul>
<li><p>Defina los datos que necesita almacenar, como el contenido en bruto (texto, imágenes, audio), los metadatos asociados (títulos, etiquetas, autoría) y los atributos contextuales (marcas de tiempo, comportamiento del usuario, etc.).</p></li>
<li><p>Determine los tipos de datos y formatos adecuados para cada elemento. Por ejemplo:</p>
<ul>
<li><p>Descripciones de texto → cadena</p></li>
<li><p>Incrustaciones de imágenes o documentos → vectores densos o dispersos</p></li>
<li><p>Categorías, etiquetas o banderas → cadena, matriz y bool</p></li>
<li><p>Atributos numéricos como precio o calificación → entero o flotante</p></li>
<li><p>Información estructurada como detalles del autor -&gt; json</p></li>
</ul></li>
</ul>
<p>Una definición clara de estos elementos garantiza la coherencia de los datos, la precisión de los resultados de búsqueda y la facilidad de integración con las lógicas de las aplicaciones posteriores.</p>
<h2 id="Schema-Design" class="common-anchor-header">Diseño del esquema<button data-href="#Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>En Milvus, el modelo de datos se expresa a través de un esquema de colección. El diseño de los campos correctos dentro de un esquema de colección es clave para permitir una recuperación eficaz. Cada campo define un tipo particular de datos almacenados en la colección y desempeña un papel distinto en el proceso de búsqueda. A grandes rasgos, Milvus admite dos tipos principales de campos: <strong>campos vectoriales</strong> y <strong>campos escalares</strong>.</p>
<p>Ahora, puede mapear su modelo de datos en un esquema de campos, incluyendo vectores y cualquier campo escalar auxiliar. Asegúrese de que cada campo se correlaciona con los atributos de su modelo de datos, especialmente preste atención a su tipo de vector (denso o spase) y su dimensión.</p>
<h3 id="Vector-Field" class="common-anchor-header">Campo vectorial</h3><p>Los campos vectoriales almacenan incrustaciones de tipos de datos no estructurados como texto, imágenes y audio. Estas incrustaciones pueden ser densas, dispersas o binarias, dependiendo del tipo de datos y del método de recuperación utilizado. Normalmente, los vectores densos se utilizan para la búsqueda semántica, mientras que los vectores dispersos son más adecuados para la búsqueda de texto completo o léxica. Los vectores binarios son útiles cuando el almacenamiento y los recursos informáticos son limitados. Una colección puede contener varios campos vectoriales para permitir estrategias de recuperación multimodales o híbridas. Para obtener una guía detallada sobre este tema, consulte la <a href="/docs/es/multi-vector-search.md">Búsqueda híbrida multivectorial</a>.</p>
<p>Milvus admite los tipos de datos vectoriales: <code translate="no">FLOAT_VECTOR</code> para <a href="/docs/es/dense-vector.md">vectores densos</a>, <code translate="no">SPARSE_FLOAT_VECTOR</code> para <a href="/docs/es/sparse_vector.md">vectores dispersos</a> y <code translate="no">BINARY_VECTOR</code> para <a href="/docs/es/binary-vector.md">vectores binarios</a>.</p>
<h3 id="Scalar-Field" class="common-anchor-header">Campo escalar</h3><p>Los campos escalares almacenan valores primitivos estructurados, comúnmente denominados metadatos, como números, cadenas o fechas. Estos valores pueden devolverse junto con los resultados de la búsqueda vectorial y son esenciales para filtrar y ordenar. Permiten acotar los resultados de la búsqueda en función de atributos específicos, como limitar los documentos a una categoría concreta o a un intervalo de tiempo definido.</p>
<p>Milvus admite tipos escalares como <code translate="no">BOOL</code>, <code translate="no">INT8/16/32/64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code>, <code translate="no">JSON</code>, y <code translate="no">ARRAY</code> para almacenar y filtrar datos no vectoriales. Estos tipos mejoran la precisión y la personalización de las operaciones de búsqueda.</p>
<h2 id="Leverage-Advanced-Features-in-Schema-Design" class="common-anchor-header">Aprovechar las funciones avanzadas en el diseño de esquemas<button data-href="#Leverage-Advanced-Features-in-Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>Al diseñar un esquema, no basta con asignar los datos a los campos utilizando los tipos de datos admitidos. Es esencial conocer a fondo las relaciones entre los campos y las estrategias disponibles para su configuración. Tener en cuenta las características clave durante la fase de diseño garantiza que el esquema no sólo satisfaga los requisitos inmediatos de gestión de datos, sino que también sea escalable y adaptable a las necesidades futuras. Al integrar cuidadosamente estas características, puede construir una arquitectura de datos sólida que maximice las capacidades de Milvus y apoye su estrategia y objetivos de datos más amplios. He aquí un resumen de las características clave que crean un esquema de colección:</p>
<h3 id="Primary-Key" class="common-anchor-header">Clave primaria</h3><p>Un campo de clave primaria es un componente fundamental de un esquema, ya que identifica de forma única a cada entidad dentro de una colección. Es obligatorio definir una clave primaria. Deberá ser un campo escalar de tipo entero o cadena y marcado como <code translate="no">is_primary=True</code>. Opcionalmente, puede activar <code translate="no">auto_id</code> para la clave primaria, a la que se asignan automáticamente números enteros que crecen monolíticamente a medida que se ingestan más datos en la colección.</p>
<p>Para más detalles, consulte <a href="/docs/es/primary-field.md">Campo primario y AutoID</a>.</p>
<h3 id="Partitioning" class="common-anchor-header">Particionamiento</h3><p>Para acelerar la búsqueda, puede activar opcionalmente la partición. Al designar un campo escalar específico para la partición y especificar criterios de filtrado basados en este campo durante las búsquedas, el alcance de la búsqueda puede limitarse eficazmente sólo a las particiones relevantes. Este método mejora significativamente la eficacia de las operaciones de recuperación al reducir el ámbito de búsqueda.</p>
<p>Para más detalles, consulte <a href="/docs/es/use-partition-key.md">Utilizar clave de partición</a>.</p>
<h3 id="Analyzer" class="common-anchor-header">Analizador</h3><p>Un analizador es una herramienta esencial para procesar y transformar datos de texto. Su función principal es convertir el texto bruto en tokens y estructurarlos para su indexación y recuperación. Para ello, tokeniza la cadena, elimina las palabras vacías y convierte las palabras individuales en tokens.</p>
<p>Para más información, consulte la sección <a href="/docs/es/analyzer-overview.md">Descripción general del analizador</a>.</p>
<h3 id="Function" class="common-anchor-header">Función</h3><p>Milvus le permite definir funciones integradas como parte del esquema para derivar automáticamente ciertos campos. Por ejemplo, puede añadir una función BM25 integrada que genere un vector disperso a partir de un campo <code translate="no">VARCHAR</code> para facilitar la búsqueda de texto completo. Estos campos derivados de funciones agilizan el preprocesamiento y garantizan que la colección siga siendo autónoma y esté preparada para las consultas.</p>
<p>Para más información, consulte <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p>
<h2 id="A-Real-World-Example" class="common-anchor-header">Un ejemplo real<button data-href="#A-Real-World-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>En esta sección, describiremos el diseño del esquema y el ejemplo de código para una aplicación de búsqueda de documentos multimedia que se muestra en el diagrama anterior. Este esquema está diseñado para gestionar un conjunto de datos que contiene artículos con datos asignados a los siguientes campos:</p>
<table>
   <tr>
     <th><p><strong>Campo</strong></p></th>
     <th><p><strong>Fuente de datos</strong></p></th>
     <th><p><strong>Utilizado por los métodos de búsqueda</strong></p></th>
     <th><p><strong>Clave primaria</strong></p></th>
     <th><p><strong>Clave de partición</strong></p></th>
     <th><p><strong>Analizador</strong></p></th>
     <th><p><strong>Función Entrada/Salida</strong></p></th>
   </tr>
   <tr>
     <td><p>article_id (<code translate="no">INT64</code>)</p></td>
     <td><p>auto-generado con enabled <code translate="no">auto_id</code></p></td>
     <td><p><a href="/docs/es/get-and-scalar-query.md">Consulta mediante Get</a></p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>título (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>título del artículo</p></td>
     <td><p><a href="/docs/es/keyword-match.md">Coincidencia de texto</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>marca de tiempo (<code translate="no">INT32</code>)</p></td>
     <td><p>fecha de publicación</p></td>
     <td><p><a href="/docs/es/use-partition-key.md">Filtrar por clave de partición</a></p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>texto (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>texto en bruto del artículo</p></td>
     <td><p><a href="/docs/es/multi-vector-search.md">Búsqueda híbrida multivectorial</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>entrada</p></td>
   </tr>
   <tr>
     <td><p>vector_denso_texto (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>vector denso generado por un modelo de incrustación de texto</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/BaGlwzDmyiyVvVk6NurcFclInCd?from=from_parent_docs">Búsqueda básica de vectores</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>text_sparse_vector (<code translate="no">SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>vector disperso autogenerado por una función BM25 integrada</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/RQTRwhOVPiwnwokqr4scAtyfnBf?from=from_parent_docs">Búsqueda de texto completo</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>salida</p></td>
   </tr>
</table>
<p>Si desea más información sobre los esquemas y una guía detallada para añadir distintos tipos de campos, consulte <a href="/docs/es/schema.md">Explicación de los esquemas</a>.</p>
<h3 id="Initialize-schema" class="common-anchor-header">Inicializar el esquema</h3><p>Para empezar, necesitamos crear un esquema vacío. Este paso establece una estructura fundacional para definir el modelo de datos.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create an empty schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">//Skip this step using JavaScript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Skip this step using cURL</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-fields" class="common-anchor-header">Añadir campos</h3><p>Una vez creado el esquema, el siguiente paso es especificar los campos que compondrán sus datos. Cada campo está asociado a sus respectivos tipos de datos y atributos.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, enable_analyzer=<span class="hljs-literal">True</span>, enable_match=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;timestamp&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish date&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">2000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article text content&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;timestamp&quot;</span>)
        .dataType(DataType.Int32)
        .build())
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">2000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;timestamp&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int32</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">2000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish date&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">2000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article text content&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;text dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;text sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;article_id&quot;,
        &quot;dataType&quot;: &quot;Int64&quot;,
        &quot;isPrimary&quot;: true
    },
    {
        &quot;fieldName&quot;: &quot;title&quot;,
        &quot;dataType&quot;: &quot;VarChar&quot;,
        &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 200,
            &quot;enable_analyzer&quot;: true,
            &quot;enable_match&quot;: true
        }
    },
    {
        &quot;fieldName&quot;: &quot;timestamp&quot;,
        &quot;dataType&quot;: &quot;Int32&quot;
    },
    {
       &quot;fieldName&quot;: &quot;text&quot;,
       &quot;dataType&quot;: &quot;VarChar&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 2000,
            &quot;enable_analyzer&quot;: true
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_dense_vector&quot;,
       &quot;dataType&quot;: &quot;FloatVector&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: 768
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_sparse_vector&quot;,
       &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>En este ejemplo, se especifican los siguientes atributos para los campos:</p>
<ul>
<li><p>Clave primaria: el <code translate="no">article_id</code> se utiliza como clave primaria permitiendo la asignación automática de claves primarias para las entidades entrantes.</p></li>
<li><p>Clave de partición: el <code translate="no">timestamp</code> se asigna como clave de partición permitiendo el filtrado por particiones. Puede ser</p></li>
<li><p>Analizador de texto: el analizador de texto se aplica a 2 campos de cadena <code translate="no">title</code> y <code translate="no">text</code> para soportar la coincidencia de texto y la búsqueda de texto completo respectivamente.</p></li>
</ul>
<h3 id="Optional-Add-functions" class="common-anchor-header">(Opcional) Añadir funciones</h3><p>Para mejorar las capacidades de consulta de datos, se pueden incorporar funciones al esquema. Por ejemplo, se puede crear una función para procesar relacionados con campos específicos.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse_vector&quot;</span>],
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">FunctionType</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;text_sparse_vector&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> myFunctions=<span class="hljs-string">&#x27;[
    {
        &quot;name&quot;: &quot;text_bm25&quot;,
        &quot;type&quot;: &quot;BM25&quot;,
        &quot;inputFieldNames&quot;: [&quot;text&quot;],
        &quot;outputFieldNames&quot;: [&quot;text_sparse_vector&quot;],
        &quot;params&quot;: {}
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
    \&quot;functions\&quot;: <span class="hljs-variable">$myFunctions</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Este ejemplo añade una función BM25 incorporada en el esquema, utilizando el campo <code translate="no">text</code> como entrada y almacenando los vectores dispersos resultantes en el campo <code translate="no">text_sparse_vector</code>.</p>
<h2 id="Next-Steps" class="common-anchor-header">Pasos siguientes<button data-href="#Next-Steps" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/es/create-collection.md">Crear colección</a></p></li>
<li><p><a href="/docs/es/alter-collection-field.md">Alterar campo de colección</a></p></li>
</ul>
