---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Compara los tipos de índices escalares, comprueba la compatibilidad de los
  campos y conoce cómo funciona la selección automática de índices.
title: Índice escalar
---
<h1 id="Scalar-Index" class="common-anchor-header">Índice escalar<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Los índices escalares pueden acelerar <a href="/docs/es/boolean.md">el filtrado</a> en campos no vectoriales. Utiliza esta descripción general para elegir un índice, comprobar la compatibilidad de los campos y comprender la selección automática.</p>
<p>Considera la posibilidad de indexar los campos que se utilizan en filtros frecuentes o lentos. Para cada campo que incluyas en la solicitud de creación de índice, elige una de estas dos opciones:</p>
<ul>
<li><strong>Especificar un tipo de índice:</strong> elige uno que sea compatible con el tipo de datos del campo y con tus filtros.</li>
<li><strong>Utilice « <code translate="no">AUTOINDEX</code> »:</strong> establezc <code translate="no">index_type</code> » en « <code translate="no">AUTOINDEX</code> » para que Milvus elija un tipo. Consulte <a href="#AUTOINDEX-behavior">el comportamiento de AUTOINDEX</a>.</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">Tipos de índice<button data-href="#Index-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>Abre una guía de índices para conocer los filtros, parámetros y pasos de creación compatibles:</p>
<table>
<thead>
<tr><th>Tipo de índice</th><th>Se utiliza para</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/es/inverted.md">INVERTIDO</a></td><td>Filtros de igualdad, pertenencia y rango.</td></tr>
<tr><td><a href="/docs/es/bitmap.md">BITMAP</a></td><td>Campos con pocos valores distintos, como los códigos de estado.</td></tr>
<tr><td><a href="/docs/es/stl-sort.md">STL_SORT</a></td><td>Búsquedas de valores y filtros de rango.</td></tr>
<tr><td><a href="/docs/es/trie.md">TRIE</a></td><td>Búsquedas exactas de cadenas y coincidencia de prefijos en campos de tipo « <code translate="no">VARCHAR</code> ».</td></tr>
<tr><td><a href="/docs/es/ngram.md">NGRAM</a></td><td>Filtros «LIKE» y expresiones regulares compatibles.</td></tr>
<tr><td><a href="/docs/es/rtree.md">RTREE</a></td><td>Filtros espaciales en campos « <code translate="no">GEOMETRY</code> ».</td></tr>
</tbody>
</table>
<p>Consulta la tabla de compatibilidad de campos que aparece a continuación y la compatibilidad con filtros del índice seleccionado antes de crear un índice.</p>
<p><details id="Filter-execution">
<summary><strong>Cómo utilizan los filtros los índices</strong></summary></p>
<p>Un índice solo sirve para expresiones compatibles; el resto de filtros pueden escanear los datos. Las operaciones aritméticas y las comparaciones entre campos no heredan la aceleración de la búsqueda literal. Para combinaciones lógicas y comprobaciones de NULL, consulta <a href="/docs/es/basic-operators.md">Operadores básicos</a>.</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
<h2 id="Supported-field-types" class="common-anchor-header">Tipos de campo compatibles<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>Averigua el tipo de datos de tu campo para ver los índices explícitos compatibles con él. En las filas de matriz, « <code translate="no">ARRAY&lt;T&gt;</code> » significa « <code translate="no">ARRAY</code> » con « <code translate="no">element_type=T</code> »:</p>
<table>
<thead>
<tr><th>Tipo de campo</th><th>Tipos de índices explícitos</th><th>Condiciones</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Los campos booleanos escalares no admiten <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> no está disponible en los campos de clave primaria.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>La opción « <code translate="no">BITMAP</code> » explícita no está disponible.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>, « <code translate="no">BITMAP</code> », « <code translate="no">STL_SORT</code> », « <code translate="no">TRIE</code> », <code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> no está disponible en los campos de clave primaria. Véase <a href="#String-pattern-indexes">«Selección de índices por filtro</a>».</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td>Véase <a href="/docs/es/timestamptz-field.md">el campo TIMESTAMPTZ</a>.</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td>Véase <a href="/docs/es/rtree.md">RTREE</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Véase <a href="/docs/es/array_data_type.md#Array-index-support">«Compatibilidad con índices de matriz</a>».</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>, <code translate="no">ARRAY&lt;INT16&gt;</code>, <code translate="no">ARRAY&lt;INT32&gt;</code>, <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Véase <a href="/docs/es/array_data_type.md#Array-index-support">«Compatibilidad con índices de matriz</a>».</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td>Consulte <a href="/docs/es/array_data_type.md#Array-index-support">«Compatibilidad con índices de matriz</a>».</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Consulte <a href="/docs/es/array_data_type.md#Array-index-support">«Compatibilidad con índices de matriz</a>».</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Depende de la ruta indexada y del tipo de conversión.</td><td>Comprueba <a href="/docs/es/json-indexing.md#Understand-cast-types">la compatibilidad y los requisitos de las rutas JSON</a>.</td></tr>
<tr><td>Subcampos no vectoriales de StructArray</td><td>Depende del tipo de datos del subcampo.</td><td>Indexe los subcampos por separado; los subcampos de « <code translate="no">BOOL</code> » no pueden utilizar « <code translate="no">STL_SORT</code> » explícito. Consulte <a href="/docs/es/index-structarray-fields.md#Create-scalar-indexes">las reglas de los subcampos</a>.</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Ninguno</td><td>Los índices escalares creados por el usuario, incluidos los de tipo « <code translate="no">AUTOINDEX</code> », no están disponibles.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Los índices escalares, incluidos los de tipo « <code translate="no">AUTOINDEX</code> », no admiten campos ARRAY recursivos ni matrices con elementos nulos. Consulte <a href="/docs/es/array_data_type.md#Array-index-support">«Compatibilidad de índices de matriz</a> para filtros de matriz ordinaria» e <a href="/docs/es/index-structarray-fields.md#Create-scalar-indexes">«Índices de campos StructArray»</a> para conocer las reglas de los subcampos.</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>Elige un índice para los filtros VARCHAR</strong></summary></p>
<p>Para un campo ` <code translate="no">VARCHAR</code> `, compare los índices compatibles en función de sus filtros:</p>
<table>
<thead>
<tr><th>Necesidad de filtrado</th><th>Guías y condiciones de los índices</th></tr>
</thead>
<tbody>
<tr><td>Búsquedas exactas de cadenas y prefijos</td><td><a href="/docs/es/trie.md#Queries-accelerated-by-TRIE">TRIE</a>, <a href="/docs/es/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a> o <a href="/docs/es/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>.</td></tr>
<tr><td>Pocos valores de cadena distintos</td><td><a href="/docs/es/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>; los patrones se comparan con los valores indexados.</td></tr>
<tr><td>LIKE o expresiones regulares con literales fijos adecuados</td><td><a href="/docs/es/ngram.md#Queries-accelerated-by-NGRAM">NGRAM</a> en campos « <code translate="no">VARCHAR</code> » o rutas de cadena JSON, sujeto a condiciones de longitud de gram y de nueva comprobación.</td></tr>
<tr><td>Expresiones regulares sin literales fijos utilizables</td><td>La consulta puede escanear datos o evaluar muchos valores indexados; comprueba las condiciones del índice seleccionado.</td></tr>
</tbody>
</table>
<p>Los rangos en <code translate="no">VARCHAR</code> utilizan el orden de las cadenas, incluso cuando estas contienen números. El uso del índice depende de la planificación de la consulta, los literales extraíbles, la cardinalidad y la distribución de los datos. Consulte <a href="/docs/es/pattern-matching.md#Accelerate-pattern-matching-with-indexes">«Coincidencia de patrones»</a> para conocer las reglas de planificación. Para las rutas de cadenas JSON, compruebe los requisitos de ruta y conversión en <a href="/docs/es/json-indexing.md">«Indexación JSON</a>».</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">Comportamiento de AUTOINDEX<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>Establezca « <code translate="no">index_type</code> » en « <code translate="no">AUTOINDEX</code> » en la definición de índice de cada campo seleccionado. Milvus elige un tipo utilizando el tipo de datos y, cuando proceda, el número de valores distintos en cada creación de índice:</p>
<table>
<thead>
<tr><th>Tipo de campo</th><th>Selección predeterminada</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> para menos de 100 valores distintos; en caso contrario, <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">ARRAY</code> con <code translate="no">element_type</code> establecido en <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, o <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> para menos de 100 elementos distintos; en caso contrario, <code translate="no">INVERTED</code>.</td></tr>
<tr><td><code translate="no">JSON</code> Las rutas se convierten a <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> o <code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> por defecto en la versión 3.0. La <a href="/docs/es/json-indexing.md#Index-requirements">configuración opcional de JSON</a> habilita la estrategia de mapa de bits escalar/ordenado mencionada anteriormente.</td></tr>
<tr><td><code translate="no">JSON</code> Las rutas se convierten a <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> o <code translate="no">ARRAY_VARCHAR</code></td><td>Utilice « <code translate="no">INVERTED</code> » explícito; la asignación predeterminada de la versión 3.0.6 rechaza la selección automática para estas conversiones.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>No es compatible.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Para un campo escalar compatible, una definición de índice que omita <code translate="no">index_type</code> también solicita la selección automática. Los campos no incluidos en la solicitud no se indexan.</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>Detalles de la selección</strong></summary></p>
<ul>
<li><strong>Diseños internos:</strong> ` <code translate="no">AUTOINDEX</code> ` puede seleccionar diseños que no están disponibles como opciones explícitas, como la indexación de mapa de bits para ` <code translate="no">FLOAT</code> ` y ` <code translate="no">DOUBLE</code>`. La estrategia basada en la cardinalidad se denomina internamente ` <code translate="no">HYBRID</code> `; no se puede especificar directamente. El índice seleccionado determina qué filtros pueden utilizarlo.</li>
<li><strong>Umbral de cardinalidad:</strong> <a id="Cardinality-threshold"></a>Establece <code translate="no">bitmap_cardinality_limit</code> (rango: 1–1000) para anular el umbral predeterminado. Los valores inferiores a este umbral utilizan mapa de bits; a partir de este umbral, se aplica la estructura de alta cardinalidad del tipo de datos. Las creaciones explícitas de <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> y <code translate="no">BITMAP</code> eluden la selección basada en la cardinalidad e ignoran este umbral.</li>
<li><strong>Anulaciones del administrador:</strong> Modifique las asignaciones de tipos a través de <code translate="no">scalarAutoIndex.params.build</code>. <code translate="no">scalarAutoIndex.enable=false</code> (por defecto) sigue permitiendo <code translate="no">AUTOINDEX</code> explícito; <code translate="no">true</code> también aplica la selección automática a las solicitudes manuales válidas.</li>
</ul>
<p></details></p>
<h2 id="Whats-next" class="common-anchor-header">Próximos pasos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>Elige una guía para tu próxima tarea:</p>
<ul>
<li><strong>Crear un índice:</strong> utiliza la <a href="#Index-types">guía de índices</a> para consultar los parámetros y los ejemplos de creación.</li>
<li><strong>Planifica los recursos:</strong> consulta las recomendaciones sobre memoria para <a href="/docs/es/stl-sort.md#Memory-considerations">STL_SORT</a>, <a href="/docs/es/bitmap.md#Memory-considerations">BITMAP</a>, <a href="/docs/es/inverted.md#Memory-considerations">INVERTED</a> o <a href="/docs/es/ngram.md#Memory-considerations">NGRAM</a>. Compara el uso de memoria, el tiempo de compilación y la latencia de las consultas con datos y filtros representativos.</li>
<li><strong>Configurar la búsqueda de texto:</strong> <a href="/docs/es/keyword-match.md">«Text Match»</a> y <a href="/docs/es/full-text-search.md">«Full Text Search»</a> abarcan el análisis de texto, BM25, <code translate="no">TEXT_MATCH</code> y <code translate="no">PHRASE_MATCH</code>. Un índice escalar <code translate="no">INVERTED</code> no habilita estos mecanismos.</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>Eliminación de índices escalares en versiones anteriores de Milvus</strong></summary></p>
<p>En Milvus v2.6.3 o versiones anteriores, hay que liberar la colección antes de eliminar un índice escalar. A partir de la v2.6.4, se puede eliminar sin necesidad de liberar la colección.</p>
<p></details></p>
