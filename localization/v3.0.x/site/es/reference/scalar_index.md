---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Los índices escalares aceleran el filtrado en campos no vectoriales. En esta
  referencia se explica cómo Milvus selecciona los índices escalares, qué tipos
  de índice se pueden especificar y los tipos de datos que admite cada índice.
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
    </button></h1><p>Los índices escalares aceleran el filtrado en campos no vectoriales, como categorías, precios, marcas de tiempo y ubicaciones. Cuando una expresión de filtro restringe una búsqueda, un índice escalar permite a Milvus localizar las entidades que coinciden sin necesidad de escanear el campo.</p>
<p>Si no estás seguro de qué índice elegir, utiliza <code translate="no">AUTOINDEX</code>. Especifica un tipo de índice manualmente solo cuando necesites un comportamiento concreto.</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">Elección de un índice escalar<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>La siguiente tabla enumera el índice que Milvus selecciona por defecto al utilizar « <code translate="no">AUTOINDEX</code> », junto con los tipos de índice que puede especificar manualmente para cada tipo de datos.</p>
<table>
<thead>
<tr><th>Tipo de datos</th><th>Valor predeterminado de AUTOINDEX</th><th>Tipos de índice manuales</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code>, <code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> con un escalar tipado o una conversión de matriz</td><td><code translate="no">HYBRID</code></td><td>Depende de <code translate="no">json_cast_type</code>; véase <a href="#JSON-field-indexing">la indexación de campos JSON</a>.</td></tr>
<tr><td><code translate="no">JSON</code> con <code translate="no">json_cast_type=&quot;JSON&quot;</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> a través de <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>No compatible</td><td>Ninguno</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> es una estrategia interna, no un tipo que se pueda especificar directamente. Consulte <a href="#How-AUTOINDEX-selects">Cómo selecciona AUTOINDEX</a>.</p>
<p>Se aplican las siguientes restricciones:</p>
<ul>
<li><strong>Claves primarias:</strong> « <code translate="no">BITMAP</code> » no está disponible en campos de clave primaria.</li>
<li><strong>Matrices:</strong> Las matrices recursivas y las matrices con elementos nulos no admiten la indexación escalar, incluida la indexación « <code translate="no">AUTOINDEX</code> ». Las matrices ordinarias admiten elementos booleanos, enteros, de coma flotante y VARCHAR.</li>
<li><strong>Matrices de estructuras:</strong> indexe los subcampos escalares individualmente. Su compatibilidad puede diferir de la de las matrices ordinarias; por ejemplo, un subcampo de estructura booleano no admite <code translate="no">STL_SORT</code> explícito.</li>
<li><strong>TEXT:</strong> Los índices escalares creados por el usuario, incluido <code translate="no">AUTOINDEX</code>, no están disponibles. El análisis de texto y la búsqueda BM25 utilizan mecanismos independientes.</li>
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
    </button></h2><table>
<thead>
<tr><th>Tipo de índice</th><th>Para qué sirve</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Filtros de igualdad, pertenencia y rango de uso general.</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Campos con pocos valores distintos; filtrado bit a bit compacto.</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Búsquedas de valores ordenados y filtrado por rango.</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Igualdad de cadenas y coincidencia de prefijos.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>LIKE y expresiones regulares en cadenas mediante la reducción de candidatos.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Coincidencia exacta de prefijos, sufijos y subcadenas infijas.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>Filtrado espacial en campos GEOMETRY.</td></tr>
</tbody>
</table>
<p>Para ver ejemplos de creación, parámetros de índice y consultas admitidas, consulta <a href="/docs/es/bitmap.md">BITMAP</a>, <a href="/docs/es/inverted.md">INVERTED</a>, <a href="/docs/es/ngram.md">NGRAM</a>, <a href="/docs/es/stl-sort.md">STL_SORT</a>, <a href="/docs/es/trie.md">TRIE</a>, <a href="/docs/es/fmindex.md">FMINDEX</a> y <a href="/docs/es/rtree.md">RTREE</a>.</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">Cómo selecciona AUTOINDEX<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p>Con « <code translate="no">AUTOINDEX</code> », Milvus selecciona un índice basándose en el tipo de campo, la configuración del servidor y, para algunos campos, el número de valores distintos (cardinalidad). Las selecciones predeterminadas se enumeran en <a href="#Choosing-a-scalar-index">«Elección de un índice escalar</a>».</p>
<p>Para la mayoría de los campos, « <code translate="no">AUTOINDEX</code> » utiliza una estrategia interna de « <code translate="no">HYBRID</code> » que elige un índice en función de la cardinalidad:</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> cuando una compilación contiene menos de 100 valores distintos.</li>
<li><strong><code translate="no">STL_SORT</code></strong> cuando una compilación contiene 100 o más valores distintos.</li>
</ul>
<p>Los índices de matriz utilizan una política de compatibilidad independiente: su rama de alta cardinalidad utiliza « <code translate="no">STL_SORT</code> » cuando el clúster lo admite y, en caso contrario, « <code translate="no">INVERTED</code> ». Véase <a href="#Version-compatibility">«Compatibilidad entre versiones</a>».</p>
<p><code translate="no">HYBRID</code> Es de uso interno únicamente; no se puede especificar directamente. Una selección interna también puede utilizar un índice que no esté disponible como opción explícita para ese campo, como la indexación de mapa de bits para valores de punto flotante.</p>
<blockquote>
<p>Estas selecciones son predeterminadas. Los administradores pueden modificarlas a través de <code translate="no">scalarAutoIndex.params.build</code>. La configuración <code translate="no">scalarAutoIndex.enable</code> tiene como valor predeterminado <code translate="no">false</code>, lo que sigue permitiendo la selección explícita <code translate="no">AUTOINDEX</code> cuando se omite el tipo de índice; al establecerla en <code translate="no">true</code>, también se aplica la selección automática a las solicitudes manuales que, de otro modo, serían válidas.</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">Indexación de campos JSON<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>Para indexar valores JSON, especifica <code translate="no">json_cast_type</code> para indicar el tipo de valores que se van a indexar. Este parámetro es obligatorio tanto para la indexación automática como para la manual. Utiliza <code translate="no">json_path</code> para identificar la ruta; si se omite, Milvus utiliza el nombre de campo proporcionado en la solicitud.</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>Valor predeterminado de AUTOINDEX</th><th>Tipos de indexación manual</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p>La conversión « <code translate="no">JSON</code> » selecciona la indexación JSON completa en lugar de un índice de ruta escalar tipado, y cambia el valor predeterminado de « <code translate="no">AUTOINDEX</code> » de « <code translate="no">HYBRID</code> » a « <code translate="no">INVERTED</code> ».</p>
<p>El conversor opcional ` <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> ` convierte los valores de cadena para una conversión ` <code translate="no">DOUBLE</code> `. No se puede utilizar con otros tipos de conversión. Ni ` <code translate="no">TRIE</code> ` ni ` <code translate="no">FMINDEX</code> ` admiten campos JSON.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Predicados compatibles<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Las siguientes tablas muestran qué predicados puede ayudar a evaluar cada índice. <strong>La compatibilidad con un índice no garantiza que Milvus lo utilice en todas las consultas.</strong> Milvus puede escanear los datos de los campos cuando el índice no sea adecuado para una expresión o patrón concretos.</p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">Comparaciones y pertenencia<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>La igualdad y la pertenencia incluyen <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">in</code> y <code translate="no">not in</code>. Las comparaciones de rango incluyen <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code>, <code translate="no">&gt;=</code> y expresiones como <code translate="no">10 &lt;= price &lt; 50</code>.</p>
<table>
<thead>
<tr><th>Tipo de índice</th><th>Tipos de datos de los campos</th><th>Predicados admitidos por el índice</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>Igualdad y pertenencia</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>Enteros, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Igualdad, pertenencia y rangos</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>Igualdad y pertenencia</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Números enteros, <code translate="no">VARCHAR</code></td><td>Igualdad, pertenencia e intervalos</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Números enteros, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">TIMESTAMPTZ</code>, <code translate="no">VARCHAR</code></td><td>Igualdad, pertenencia y rangos</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>Igualdad, pertenencia e intervalos; la evaluación de intervalos puede recorrer varias cadenas indexadas</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>Solo patrones de cadena; no se permite la búsqueda directa de igualdad, pertenencia o intervalos</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>Solo patrones de cadena; no se permite la búsqueda directa de igualdad, pertenencia o intervalos</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>Predicados espaciales, enumerados a continuación</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>Tipos escalares admitidos</td><td>Depende del índice seleccionado. Las selecciones internas de « <code translate="no">HYBRID</code> » utilizan las capacidades de su índice de mapa de bits, ordenado o invertido.</td></tr>
</tbody>
</table>
<p>Los rangos VARCHAR comparan valores de cadena en lugar de interpretarlos como números. La tabla describe únicamente comparaciones con valores literales; esto no implica que las expresiones aritméticas o las comparaciones entre dos campos se beneficien de la misma aceleración del índice.</p>
<h3 id="String-patterns" class="common-anchor-header">Patrones de cadena<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Esta tabla se aplica a los campos VARCHAR. Para las rutas de cadena JSON, utiliza un índice y una conversión « <code translate="no">VARCHAR</code> » compatibles con la tabla de indexación JSON; se aplica el comportamiento de cadena correspondiente.</p>
<ul>
<li><strong>Sí:</strong> el índice devuelve coincidencias exactas.</li>
<li><strong>Comprobación de valores indexados:</strong> Milvus evalúa el patrón con respecto a las cadenas almacenadas en el índice, lo que puede requerir examinar muchas cadenas distintas.</li>
<li><strong>Candidatos:</strong> el índice reduce las posibles coincidencias y, a continuación, Milvus comprueba los valores originales.</li>
<li><strong>Escaneo:</strong> El índice no satisface el predicado; Milvus utiliza otra ruta válida o escanea el campo.</li>
</ul>
<table>
<thead>
<tr><th>Tipo de índice</th><th>Prefijo <code translate="no">like &quot;abc%&quot;</code></th><th>Sufijo <code translate="no">like &quot;%abc&quot;</code></th><th>Subcadena <code translate="no">like &quot;%abc%&quot;</code></th><th>LIKE general <code translate="no">like &quot;a%b_c&quot;</code></th><th>Expresión regular <code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Sí</td><td>Escanear</td><td>Escaneo</td><td>Sí</td><td>Escanear</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Comprobar valores indexados</td><td>Comprobar valores indexados</td><td>Comprobar valores indexados</td><td>Comprobar valores indexados</td><td>Comprobar los valores indexados</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Sí</td><td>Comprobar valores indexados</td><td>Comprobar valores indexados</td><td>Comprobar valores indexados</td><td>Comprobar valores indexados</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Sí</td><td>Comprobar valores indexados</td><td>Comprobar valores indexados</td><td>Comprobar valores indexados</td><td>Comprobar valores indexados</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Candidatos</td><td>Candidatos</td><td>Candidatos; coincidencia exacta con un literal dentro del rango de longitud de gram configurado</td><td>Candidatos</td><td>Candidatos</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Sí</td><td>Sí</td><td>Sí</td><td>Candidatos</td><td>Candidatos</td></tr>
</tbody>
</table>
<p>Estas entradas describen el operador tras la planificación de la consulta. Milvus puede simplificar un patrón LIKE literal a una igualdad, y una expresión regular simple con anclaje a una igualdad, una coincidencia de prefijo o de sufijo; por ejemplo, <code translate="no">name =~ &quot;^abc$&quot;</code> se convierte en una prueba de igualdad y sigue la tabla de igualdad.</p>
<p><code translate="no">INVERTED</code> trata las formas simples de sufijo y subcadena como escaneos, aunque los patrones LIKE más complejos puedan utilizar el índice. « <code translate="no">NGRAM</code> » requiere un texto literal de al menos <code translate="no">min_gram</code> caracteres de longitud; el LIKE general requiere que cada fragmento literal no vacío cumpla ese mínimo, y la aceleración de expresiones regulares depende de la extracción de literales adecuados. De lo contrario, Milvus realiza un escaneo de los datos. « <code translate="no">FMINDEX</code> » también puede optar por un escaneo cuando un patrón proporciona poco filtrado útil o resulta demasiado costoso de resolver a través del índice.</p>
<p>Se trata de predicados de valor de cadena. Las funciones basadas en tokens, como <code translate="no">TEXT_MATCH</code> y <code translate="no">PHRASE_MATCH</code>, utilizan la indexación de coincidencia de texto configurada a través de las propiedades de los campos; la elección de un índice escalar <code translate="no">INVERTED</code> no habilita dichas funciones.</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">Predicados de matriz, JSON y espaciales<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Tipo de índice</th><th>Tipo de datos o conversión</th><th>Predicados que pueden utilizar el índice</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> o una selección válida de <code translate="no">AUTOINDEX</code> </td><td>Matrices ordinarias con tipos de elementos compatibles</td><td><code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_CONTAINS_ALL</code></td><td>Coincide con los elementos independientemente de su posición. Se siguen aplicando las restricciones de índice y tipo.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>Matrices ordinarias de valores booleanos, enteros o VARCHAR</td><td><code translate="no">==</code> de todo el array y <code translate="no">!=</code></td><td>Se pueden utilizar candidatos de índice seguidos de comprobaciones de las matrices originales. Las matrices de punto flotante recurren al escaneo; los índices de mapa de bits no sirven para esta ruta de candidatos.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> o una selección válida de <code translate="no">AUTOINDEX</code> </td><td>Rutas JSON convertidas a <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> o <code translate="no">VARCHAR</code></td><td>Comparaciones y pertenencia adecuadas al tipo de conversión</td><td>La ruta indexada y la conversión deben coincidir con la consulta. Los patrones de cadena siguen la tabla anterior.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Rutas JSON convertidas a <code translate="no">VARCHAR</code></td><td>patrones LIKE y expresiones regulares</td><td>Utiliza las mismas reglas de elegibilidad de patrones que los índices VARCHAR NGRAM.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> o una selección válida de <code translate="no">AUTOINDEX</code> </td><td>Rutas JSON convertidas a <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> o <code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ANY</code>, <code translate="no">JSON_CONTAINS_ALL</code></td><td>Requiere tipos de elementos compatibles. Los operandos de tipos mixtos o de matrices anidadas pueden recurrir al escaneo.</td></tr>
<tr><td><code translate="no">INVERTED</code> con conversión <code translate="no">JSON</code></td><td>Índice JSON completo</td><td>Comparaciones y pertenencia en rutas escalares compatibles; patrones de cadena compatibles; contención JSON en rutas de matriz compatibles</td><td>Las rutas de cadena siguen un comportamiento INVERTIDO. La contención de matrices requiere tipos de elementos compatibles.</td></tr>
<tr><td>Índices de rutas JSON e índices JSON completos</td><td>Rutas JSON indexadas</td><td><code translate="no">exists</code></td><td>Comprueba si la ruta existe, lo cual es diferente a comprobar su valor o si todo el campo es nulo.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>, <code translate="no">ST_INTERSECTS</code>, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_WITHIN</code>, <code translate="no">ST_TOUCHES</code>, <code translate="no">ST_OVERLAPS</code>, <code translate="no">ST_CROSSES</code>, <code translate="no">ST_DWITHIN</code></td><td>Utiliza cajas delimitadoras para encontrar candidatos y, a continuación, comprueba la relación espacial exacta. <code translate="no">ST_ISVALID</code> no utiliza RTREE.</td></tr>
</tbody>
</table>
<p>La compatibilidad con la contención de matrices no implica la búsqueda en el índice de un elemento en una posición específica, como en <code translate="no">values[0]</code>, ni de la longitud de la matriz. La igualdad de toda la matriz también debe comprobar el orden y la longitud, algo que la pertenencia de un elemento por sí sola no puede establecer.</p>
<p><code translate="no">IS NULL</code> y <code translate="no">IS NOT NULL</code> utilizan información de validez y no requieren un tipo de índice escalar concreto. Se pueden combinar predicados con <code translate="no">and</code>, <code translate="no">or</code> y <code translate="no">not</code>; cada parte puede utilizar su propia ruta de ejecución válida.</p>
<h2 id="Version-compatibility" class="common-anchor-header">Compatibilidad entre versiones<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>La mayoría de los índices escalares — <code translate="no">BITMAP</code>, <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code> y <code translate="no">NGRAM</code> sobre campos escalares ordinarios— no tienen requisitos de versión. Los requisitos que se indican a continuación se aplican únicamente a las combinaciones más recientes: índices sobre campos de matriz, índices de ruta JSON y <code translate="no">FMINDEX</code>.</p>
<p>Estos requisitos utilizan los números de versión del motor de índices escalares, un contador interno de capacidades distinto de los números de versión del software Milvus.</p>
<table>
<thead>
<tr><th>Capacidad</th><th>Requisito</th></tr>
</thead>
<tbody>
<tr><td>Explícito <code translate="no">FMINDEX</code></td><td>Versión 5 o posterior del motor de índices escalares</td></tr>
<tr><td><code translate="no">STL_SORT</code> o explícito en matrices ordinarias</td><td>Motor de índices escalares versión 3 o posterior, con la función de ordenación de matrices activada</td></tr>
<tr><td><code translate="no">HYBRID</code> Selección de « <code translate="no">STL_SORT</code> » para matrices ordinarias</td><td>Motor de índices escalares versión 5 o posterior, con la compatibilidad con la ordenación de matrices habilitada</td></tr>
<tr><td><code translate="no">BITMAP</code>, « <code translate="no">STL_SORT</code> » o « <code translate="no">HYBRID</code> » en rutas escalares JSON</td><td>Motor de índices escalares versión 4 o posterior</td></tr>
<tr><td><code translate="no">STL_SORT</code> o « <code translate="no">HYBRID</code> » en rutas de matriz JSON tipadas</td><td>Motor de índices escalares versión 3 o posterior, con la compatibilidad con la ordenación de matrices habilitada</td></tr>
</tbody>
</table>
<p>Si no se cumple un requisito de compatibilidad con matrices o JSON, las solicitudes automáticas afectadas pueden recurrir a <code translate="no">INVERTED</code>, y las solicitudes explícitas para combinaciones no compatibles fallarán. Para matrices ordinarias <code translate="no">HYBRID</code>, la rama de alta cardinalidad sigue utilizando <code translate="no">INVERTED</code> hasta que la indexación ordenada esté disponible.</p>
<h2 id="Performance-considerations" class="common-anchor-header">Consideraciones sobre el rendimiento<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>El rendimiento de los índices depende de la distribución de los datos y de los filtros que utilice su aplicación. La cardinalidad, la longitud de las cadenas, la longitud de los arreglos y el número de entidades coincidentes pueden afectar al uso de memoria y a la latencia de las consultas. Compare los índices utilizando datos representativos y expresiones de filtro, y mida conjuntamente el uso de memoria, el tiempo de creación y la latencia de las consultas.</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">Estimación de los requisitos de memoria<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Las siguientes fórmulas ofrecen una idea aproximada de la memoria que necesita un índice escalar tras la carga, con la asignación de memoria desactivada. Las fórmulas de <code translate="no">STL_SORT</code> asumen campos escalares normales sin valores nulos.</p>
<ul>
<li><code translate="no">N</code>: número de entidades.</li>
<li><code translate="no">D</code>: número de valores distintos.</li>
<li><code translate="no">l</code>: longitud media de las cadenas distintas, en <strong>bytes</strong>.</li>
<li><code translate="no">S</code>: tamaño del índice creado antes de la compresión de almacenamiento, en <strong>bytes</strong>.</li>
</ul>
<table>
<thead>
<tr><th>Tipo de índice</th><th>Estimación aproximada de memoria en bytes</th><th>Intuición</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> en <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code> o <code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>Aproximadamente 12 bytes por entidad.</td></tr>
<tr><td><code translate="no">STL_SORT</code> en <code translate="no">INT64</code>, <code translate="no">DOUBLE</code> o <code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>Unos 20 bytes por entidad para valores más grandes.</td></tr>
<tr><td><code translate="no">STL_SORT</code> en <code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>Las cadenas repetidas comparten almacenamiento, por lo que un menor número de cadenas distintas suele suponer un menor consumo de memoria.</td></tr>
<tr><td><code translate="no">BITMAP</code>, utilizando mapas de bits densos</td><td><code translate="no">(D + 1) * N / 8</code></td><td>Cada valor distinto necesita aproximadamente un bit por entidad, más un mapa de bits para realizar un seguimiento de las entidades válidas.</td></tr>
<tr><td><code translate="no">INVERTED</code> o <code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>Empieza con aproximadamente el tamaño del índice creado.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>Reserva aproximadamente el doble del tamaño del índice creado.</td></tr>
</tbody>
</table>
<p>Divide el resultado entre <code translate="no">1024 * 1024</code> para convertir los bytes a <strong>MiB</strong>. Por ejemplo, un índice « <code translate="no">STL_SORT</code> » con un millón de valores « <code translate="no">INT64</code> » no nulos necesita aproximadamente <strong>19 MiB</strong> para sus estructuras de datos principales. Para los campos VARCHAR en los que cada cadena es única, la estimación se simplifica a <code translate="no">(l + 24) * N</code>; un millón de cadenas únicas con un promedio de 32 bytes da aproximadamente <strong>53 MiB</strong>.</p>
<p>La fórmula BITMAP describe el almacenamiento denso de mapas de bits; habilitar la caché de desplazamiento opcional añade aproximadamente <code translate="no">8 * N</code> bytes en un sistema de 64 bits. Para <code translate="no">INVERTED</code>, <code translate="no">NGRAM</code> y <code translate="no">FMINDEX</code>, crea un índice sobre datos representativos para obtener <code translate="no">S</code>: el tamaño de los datos sin procesar no sustituye al tamaño del índice creado. Para <code translate="no">AUTOINDEX</code>, utilice la fórmula correspondiente al índice realmente seleccionado y aplique las estimaciones por segmento; a continuación, súmelas entre todos los segmentos cargados y las réplicas.</p>
<p>Se trata de cifras de planificación aproximadas, no de límites de memoria. No tienen en cuenta la memoria temporal utilizada durante la creación, la carga y las consultas, y son más sensibles a los valores distintos y a la distribución de los datos en los índices de cadena y de mapa de bits que en los índices numéricos <code translate="no">STL_SORT</code>. No se garantiza un porcentaje fijo de precisión. El mapeo de memoria, los formatos de índice más antiguos, las matrices y los campos JSON requieren una medición por separado. Antes de dimensionar una implementación, comprueba el uso real de memoria con datos y consultas representativos, y deja un margen para el uso máximo.</p>
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
    </button></h2><ul>
<li>Para ver ejemplos de creación y configuración de índices, consulte <a href="/docs/es/bitmap.md">BITMAP</a>, <a href="/docs/es/inverted.md">INVERTED</a>, <a href="/docs/es/ngram.md">NGRAM</a>, <a href="/docs/es/stl-sort.md">STL_SORT</a>, <a href="/docs/es/trie.md">TRIE</a>, <a href="/docs/es/fmindex.md">FMINDEX</a> y <a href="/docs/es/rtree.md">RTREE</a>.</li>
<li>Para ver las definiciones de campos y los esquemas de colecciones, consulta <a href="/docs/es/schema.md">«Explicación</a> de <a href="/docs/es/schema.md">los esquemas</a>».</li>
</ul>
