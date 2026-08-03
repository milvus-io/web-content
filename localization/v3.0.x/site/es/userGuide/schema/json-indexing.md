---
id: json-indexing.md
title: Indexación de JSON
summary: >-
  Los campos JSON ofrecen una forma flexible de almacenar metadatos
  estructurados en Milvus. Sin indexación, las consultas en campos JSON
  requieren escaneos completos de la colección, lo que ralentiza el proceso a
  medida que crece el conjunto de datos. La indexación JSON crea índices en
  rutas específicas dentro de los datos JSON, de modo que las consultas de
  igualdad, de rango y otras consultas de filtrado en esas rutas se ejecutan
  rápidamente.
---
<h1 id="JSON-Indexing" class="common-anchor-header">Indexación de JSON<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>Los campos JSON ofrecen una forma flexible de almacenar metadatos estructurados en Milvus. Sin indexación, las consultas en campos JSON requieren escaneos completos de la colección, lo que ralentiza el proceso a medida que crece el conjunto de datos. La indexación JSON crea un índice en una ruta específica dentro de los datos JSON, de modo que las consultas de igualdad, rango y otros filtros en esa ruta se ejecutan rápidamente.</p>
<p>La indexación JSON es ideal para:</p>
<ul>
<li><p>Esquemas estructurados con claves conocidas y consistentes</p></li>
<li><p>Consultas de igualdad, « <code translate="no">IN</code> », de rango y de coincidencia de texto en rutas JSON específicas</p></li>
<li><p>Escenarios en los que se necesita un control preciso sobre qué claves se indexan</p></li>
</ul>
<p>Para documentos JSON complejos con patrones de consulta diversos, plantéate utilizar el <a href="/docs/es/json-shredding.md">«JSON Shredding»</a> como alternativa.</p>
<h2 id="Index-type-overview" class="common-anchor-header">Descripción general de los tipos de índice<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus ofrece cuatro tipos de índice para rutas JSON. Cada uno de ellos se adapta a un patrón de consulta diferente.</p>
<p>Antes de elegir un tipo de índice, identifica el <strong>tipo de conversión</strong> de la ruta JSON. El tipo de conversión determina cómo interpreta Milvus el valor en esa ruta y qué tipos de índice están disponibles.</p>
<h3 id="Understand-cast-types" class="common-anchor-header">Comprender los tipos de conversión<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> es el tipo de datos que se utiliza para interpretar e indexar el valor en <code translate="no">json_path</code>. Es diferente del tipo de esquema del campo: el campo sigue siendo un campo « <code translate="no">JSON</code> », pero cada ruta indexada se trata como un tipo específico de escalar, matriz u objeto JSON.</p>
<p>Elija el tipo de conversión que se ajuste a los valores almacenados en la ruta. Para comprobar si un tipo de conversión es compatible con un tipo de índice específico, consulte <a href="/docs/es/json-indexing.md#compatibility-reference">la Referencia de compatibilidad</a>.</p>
<table>
<thead>
<tr><th>Tipo de conversión</th><th>Úsalo cuando el valor de la ruta sea…</th><th>Valor de ejemplo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Un valor booleano</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Un valor numérico</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Un valor de cadena</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Una matriz de valores booleanos</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Un array de valores numéricos</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Un array de valores de cadena</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>Un objeto JSON completo o un subobjeto. La indexación de objetos JSON completos ha quedado obsoleta a partir de Milvus 3.0.0.</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>Si los valores de una misma ruta tienen tipos incompatibles, solo se indexan los valores que coinciden con el tipo de conversión. Por ejemplo, si <code translate="no">metadata[&quot;price&quot;]</code> contiene tanto <code translate="no">99.99</code> como <code translate="no">&quot;99.99&quot;</code>, un índice del tipo de conversión <code translate="no">DOUBLE</code> incluirá el valor numérico y omitirá el valor de cadena. Para convertir valores de cadena durante la indexación, utiliza <code translate="no">json_cast_function</code>; consulta <a href="/docs/es/json-indexing.md#example-5-convert-data-type-at-index-time">el Ejemplo 5: Convertir el tipo de datos en el momento de la indexación</a>.</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">Elige un tipo de índice<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Una vez elegido el tipo de conversión, elija el tipo de índice según su patrón de consulta.</p>
<table>
<thead>
<tr><th>Patrón de consulta</th><th>Tipo de índice recomendado</th><th>Requisitos del tipo de conversión</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td>Filtros mixtos de igualdad y de rango sobre valores escalares</td><td><code translate="no">AUTOINDEX</code></td><td>Utilice « <code translate="no">BOOL</code> », « <code translate="no">DOUBLE</code> » o « <code translate="no">VARCHAR</code> ».</td><td>Permite que Milvus elija la estructura interna del índice en función de la cardinalidad de los valores.</td></tr>
<tr><td>Filtros sobre valores dentro de matrices JSON</td><td><code translate="no">INVERTED</code></td><td>Utilice <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> o <code translate="no">ARRAY_VARCHAR</code>.</td><td>Obligatorio para todos los tipos de conversión de matrices.</td></tr>
<tr><td>Indexación de objetos completos o subobjetos (obsoleto)</td><td><code translate="no">INVERTED</code> o <code translate="no">AUTOINDEX</code> (solo por compatibilidad)</td><td>Utilice <code translate="no">JSON</code>.</td><td>Compatible por motivos de compatibilidad. Para nuevas cargas de trabajo, cree índices específicos de ruta o considere el uso de <a href="/docs/es/json-shredding.md">JSON Shredding</a>.</td></tr>
<tr><td>Filtros de rango sobre números o cadenas ordenables</td><td><code translate="no">STL_SORT</code> o <code translate="no">AUTOINDEX</code></td><td>Utilice <code translate="no">DOUBLE</code> o <code translate="no">VARCHAR</code>.</td><td>Utilice <code translate="no">STL_SORT</code> para forzar un diseño ordenado; utilice <code translate="no">AUTOINDEX</code> cuando desee una selección automática.</td></tr>
<tr><td>Filtros de igualdad o de « <code translate="no">IN</code> » en valores de baja cardinalidad</td><td><code translate="no">BITMAP</code> o <code translate="no">AUTOINDEX</code></td><td>Utilice <code translate="no">BOOL</code> o <code translate="no">VARCHAR</code>.</td><td>Utiliza « <code translate="no">BITMAP</code> » para forzar una disposición de mapa de bits. Para valores numéricos, utiliza « <code translate="no">AUTOINDEX</code> » o « <code translate="no">STL_SORT</code> ».</td></tr>
</tbody>
</table>
<p>En caso de duda, empieza con <code translate="no">AUTOINDEX</code> para rutas escalares. Utiliza <code translate="no">INVERTED</code> de forma explícita para tipos de conversión de matriz y consultas de coincidencia de texto. La indexación JSON de objetos completos con <code translate="no">INVERTED</code> o <code translate="no">AUTOINDEX</code> sigue siendo compatible, pero queda obsoleta a partir de Milvus 3.0.0.</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> depende del « <code translate="no">json_cast_type</code> » que se especifique. En Milvus 3.0, « <code translate="no">AUTOINDEX</code> » ya no se resuelve siempre como « <code translate="no">INVERTED</code> » para los índices de ruta JSON.</p>
<table>
<thead>
<tr><th>Comportamiento de la conversión de tipo</th><th><code translate="no">AUTOINDEX</code> comportamiento</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Elige entre <code translate="no">BITMAP</code> y <code translate="no">STL_SORT</code> en función de la cardinalidad del valor.</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, <code translate="no">ARRAY_VARCHAR</code></td><td>No es compatible. Utiliza « <code translate="no">INVERTED</code> » explícitamente como tipo de índice.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Utiliza <code translate="no">INVERTED</code> para la indexación de objetos completos o subobjetos. Este modo queda obsoleto a partir de Milvus 3.0.0.</td></tr>
</tbody>
</table>
<p>Para los tipos de conversión escalar (<code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> y <code translate="no">VARCHAR</code>), <code translate="no">AUTOINDEX</code> es el punto de partida recomendado cuando se desea que Milvus elija la estructura interna del índice. Durante la creación del índice, Milvus mide la <strong>cardinalidad</strong> de los valores en la ruta JSON. La cardinalidad se refiere al número de valores distintos en esa ruta.</p>
<p>En función de la cardinalidad, Milvus elige una de estas dos estructuras internas:</p>
<ul>
<li><p><strong>Baja cardinalidad</strong>: los valores se repiten con frecuencia, como <code translate="no">metadata[&quot;in_stock&quot;]</code> junto con <code translate="no">true</code> y <code translate="no">false</code>, o <code translate="no">metadata[&quot;status&quot;]</code> con un pequeño conjunto de cadenas de estado. Milvus crea internamente un índice de tipo « <code translate="no">BITMAP</code> » para agilizar los filtros de igualdad y de « <code translate="no">IN</code> ».</p></li>
<li><p><strong>Alta cardinalidad</strong>: la mayoría de los valores son distintos, como <code translate="no">metadata[&quot;price&quot;]</code>, <code translate="no">metadata[&quot;created_at&quot;]</code> o <code translate="no">metadata[&quot;product_id&quot;]</code>. Milvus crea internamente un índice <code translate="no">STL_SORT</code> para filtros de rango rápidos, como <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> y <code translate="no">&lt;=</code>.</p></li>
</ul>
<p>El umbral predeterminado de « <code translate="no">BITMAP</code> » frente a «<code translate="no">STL_SORT</code> » es de <strong>100 valores distintos</strong>. Puedes ajustar este umbral con « <code translate="no">bitmap_cardinality_limit</code> »; consulta <a href="/docs/es/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">«¿Cómo ajusto el umbral de BITMAP frente a STL_SORT de AUTOINDEX?</a>».</p>
<div class="alert note">
<p><strong>Cambio de comportamiento en Milvus 3.0</strong>. En versiones anteriores, <code translate="no">AUTOINDEX</code> en rutas JSON siempre creaba un índice <code translate="no">INVERTED</code>. A partir de Milvus 3.0, <code translate="no">AUTOINDEX</code> elige entre <code translate="no">BITMAP</code> y <code translate="no">STL_SORT</code> para los tipos de conversión escalares. Para <code translate="no">JSON</code>, <code translate="no">AUTOINDEX</code> sigue utilizando <code translate="no">INVERTED</code>, aunque la indexación JSON de objetos completos está en desuso. Para los tipos de conversión de matriz y las consultas de coincidencia de texto, especifica <code translate="no">INVERTED</code> de forma explícita.</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> es la opción más adecuada cuando se necesitan consultas de coincidencia de texto o indexación de matrices. También sigue estando disponible para la indexación de objetos JSON completos, que ha quedado obsoleta.</p>
<p>Especifica <code translate="no">INVERTED</code> de forma explícita cuando:</p>
<ul>
<li><p>Necesites indexar valores dentro de matrices JSON.</p></li>
<li><p>Mantenga un índice existente sobre un objeto JSON completo o un subobjeto y desee hacer explícito el comportamiento de « <code translate="no">INVERTED</code> ».</p></li>
<li><p>Desea un único tipo de índice que gestione consultas de igualdad, « <code translate="no">IN</code> », de rango, de coincidencia de texto y de matriz. La compatibilidad con objetos completos sigue estando disponible por motivos de compatibilidad, a costa de un mayor tamaño del índice.</p></li>
</ul>
<p>Para los índices existentes sobre objetos JSON completos (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), puede seguir utilizando <code translate="no">INVERTED</code> o <code translate="no">AUTOINDEX</code>. <code translate="no">AUTOINDEX</code> utiliza <code translate="no">INVERTED</code> para este tipo de conversión. Ya no se recomienda la indexación de objetos JSON completos para nuevas cargas de trabajo.</p>
<p>Para obtener más información, consulta <a href="/docs/es/inverted.md">INVERTED</a>.</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> almacena los valores de una ruta JSON en orden clasificado. Está optimizado para filtros de rango sobre valores numéricos o valores de cadena clasificables.</p>
<p><code translate="no">STL_SORT</code> Solo admite los tipos de conversión <code translate="no">DOUBLE</code> y <code translate="no">VARCHAR</code>. Úsalo cuando:</p>
<ul>
<li><p>Sus filtros comparen valores con <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> o <code translate="no">&lt;=</code>.</p></li>
<li><p>Los valores indexados tengan una cardinalidad elevada, como precios, marcas de tiempo, identificadores o códigos ordenables.</p></li>
<li><p>Deseas forzar un diseño ordenado en lugar de dejar que <code translate="no">AUTOINDEX</code> elija.</p></li>
</ul>
<p><code translate="no">STL_SORT</code> No admite los tipos de conversión <code translate="no">BOOL</code>, <code translate="no">ARRAY_*</code> ni <code translate="no">JSON</code>. Utiliza <code translate="no">INVERTED</code> para las matrices. Los índices de objetos completos existentes pueden seguir utilizando <code translate="no">INVERTED</code> o <code translate="no">AUTOINDEX</code>, pero la indexación JSON de objetos completos está en desuso.</p>
<p>Para más detalles, consulte <a href="/docs/es/stl-sort.md">STL_SORT</a>.</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> crea un mapa de bits compacto para cada valor distinto en una ruta JSON. Está optimizado para filtros de igualdad y de « <code translate="no">IN</code> » en valores que se repiten con frecuencia.</p>
<p><code translate="no">BITMAP</code> Solo admite los tipos de conversión « <code translate="no">BOOL</code> » y « <code translate="no">VARCHAR</code> ». Úsalo cuando:</p>
<ul>
<li><p>Sus filtros utilicen « <code translate="no">==</code> » o « <code translate="no">IN</code> ».</p></li>
<li><p>Los valores indexados tengan una cardinalidad baja, como valores booleanos, valores de estado o un conjunto reducido de categorías.</p></li>
<li><p>Desees forzar un diseño de mapa de bits en lugar de dejar que <code translate="no">AUTOINDEX</code> elija.</p></li>
</ul>
<p><code translate="no">BITMAP</code> No admite los tipos de conversión « <code translate="no">DOUBLE</code> », « <code translate="no">ARRAY_*</code> » ni « <code translate="no">JSON</code> ». Para valores numéricos, utilice en su lugar « <code translate="no">AUTOINDEX</code> », « <code translate="no">STL_SORT</code> » o « <code translate="no">INVERTED</code> ».</p>
<p>Para obtener más información, consulte <a href="/docs/es/bitmap.md">BITMAP</a>.</p>
<h3 id="Compatibility-reference" class="common-anchor-header">Referencia de compatibilidad<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice la siguiente matriz como referencia rápida para las combinaciones de « <code translate="no">(cast type, index type)</code> » compatibles.</p>
<table>
<thead>
<tr><th>Tipo de conversión</th><th>Descripción</th><th>Valor de ejemplo</th><th>AUTOINDEX</th><th>INVERTIDO</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Valores booleanos (<code translate="no">true</code>/<code translate="no">false</code>).</td><td><code translate="no">true</code></td><td>Sí</td><td>Sí</td><td>No</td><td>Sí</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Valores numéricos (enteros o decimales).</td><td><code translate="no">99.99</code></td><td>Sí</td><td>Sí</td><td>Sí</td><td>No</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Valores de cadena.</td><td><code translate="no">&quot;electronics&quot;</code></td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Matriz de valores booleanos.</td><td><code translate="no">[true, false]</code></td><td>No</td><td>Sí</td><td>No</td><td>No</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Matriz de números.</td><td><code translate="no">[1.2, 3.14]</code></td><td>No</td><td>Sí</td><td>No</td><td>No</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Matriz de cadenas.</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>No</td><td>Sí</td><td>No</td><td>No</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Un objeto JSON completo o un subobjeto con inferencia automática de tipos y aplanamiento. Obsoleto a partir de Milvus 3.0.0.</td><td>cualquier objeto anidado</td><td>Sí (obsoleto)</td><td>Sí (obsoleto)</td><td>No</td><td>No</td></tr>
</tbody>
</table>
<p>En el caso de las celdas marcadas como « <code translate="no">No</code> », Milvus rechaza la solicitud en el momento de la creación del índice. Para los tipos de conversión de matrices, utiliza explícitamente « <code translate="no">INVERTED</code> » (<code translate="no">AUTOINDEX</code> no cubre las matrices).</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">Crear un índice JSON<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>En esta sección se explica cómo indexar datos JSON con diferentes estructuras. Todos los ejemplos utilizan la estructura de muestra que se muestra a continuación y dan por hecho que ya dispone de una colección que incluye un campo « <code translate="no">JSON</code> » denominado « <code translate="no">metadata</code> ».</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">Estructura JSON de ejemplo<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">Configuración básica<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>Los ejemplos siguientes dan por hecho que dispone de un « <code translate="no">MilvusClient</code> » denominado « <code translate="no">client</code> » conectado a su implementación de Milvus, y de una colección que ya incluye un campo « <code translate="no">JSON</code> » denominado « <code translate="no">metadata</code> ». Si necesita configurarlos desde cero, expanda el bloque siguiente.</p>
<p><details></p>
<p><summary>Conéctate y crea una colección de ejemplo</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Prepara un objeto `index-params` para recopilar las definiciones de índice añadidas en los ejemplos siguientes:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>Cada uno de los ejemplos siguientes muestra una llamada a ` <code translate="no">index_params.add_index(...)</code> `. Elige los que se ajusten a tus datos y llámalos en el mismo objeto ` <code translate="no">index_params</code> `. A continuación, aplica todo en una única llamada a ` <code translate="no">client.create_index(...)</code> ` al final. Para obtener más detalles, consulta <a href="/docs/es/json-indexing.md#apply-the-index">«Aplicar el índice</a>».</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">Ejemplo 1: Indexar una clave de nivel superior con AUTOINDEX<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>Indexe el campo <code translate="no">category</code> para filtrar rápidamente por categoría de producto. Con <code translate="no">AUTOINDEX</code>, Milvus selecciona <code translate="no">BITMAP</code> o <code translate="no">STL_SORT</code> en función del número de categorías distintas que existan en sus datos.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">Ejemplo 2: Indexar una clave anidada<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Indexa el campo « <code translate="no">email</code> », profundamente anidado, para la búsqueda de contactos de proveedores. El parámetro « <code translate="no">json_path</code> » admite cualquier profundidad de notación entre corchetes.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">Ejemplo 3: Consultas de rango con STL_SORT<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>Cuando sepa que sus consultas en una ruta estarán dominadas por comparaciones de rango (<code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code>), seleccione directamente « <code translate="no">STL_SORT</code> ». Esto evita la medición de cardinalidad y crea el diseño ordenado de forma inmediata.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Tras la indexación, las consultas de rango como <code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code> utilizan la búsqueda binaria en lugar de un escaneo completo.</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">Ejemplo 4: Consultas de igualdad con BITMAP<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>Para claves de baja cardinalidad, como códigos de estado, valores booleanos o cadenas tipo enumeración, elige directamente <code translate="no">BITMAP</code>. Las consultas de igualdad y del tipo <code translate="no">IN</code> se convierten en operaciones de mapa de bits.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> También resulta muy adecuado para campos como una columna de tipo « <code translate="no">status</code> » con unos pocos valores de cadena distintos.</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">Ejemplo 5: Convertir el tipo de datos al crear el índice<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>Cuando los datos numéricos se almacenan por error como cadenas, utiliza « <code translate="no">STRING_TO_DOUBLE</code> » para convertir el valor en un número durante la creación del índice.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Si la conversión falla para una fila (por ejemplo, una cadena no numérica como « <code translate="no">&quot;invalid&quot;</code> »), esa fila se omite durante la indexación.</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">Ejemplo 6: Indexar objetos JSON completos<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert warning">
<p>A partir de Milvus 3.0.0, la indexación de objetos JSON completos (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), también conocida como indexación plana de JSON, ha quedado obsoleta. Los índices existentes y las nuevas solicitudes de creación de índices siguen siendo compatibles, pero este modo ya no se recomienda para nuevas cargas de trabajo. Crea índices de ruta JSON para rutas de consulta conocidas. Para documentos JSON complejos o en evolución con patrones de consulta amplios, considere el uso de <a href="/docs/es/json-shredding.md">«JSON Shredding</a>». El «JSON Shredding» no acelera los valores dentro de las matrices; utilice índices de ruta JSON con tipos de conversión de matriz para esas consultas.</p>
</div>
<p>Para las cargas de trabajo existentes compatibles, al establecer « <code translate="no">json_cast_type=&quot;JSON&quot;</code> » se indexa la estructura completa en la ruta indicada. Milvus aplana los objetos anidados en rutas e infiere automáticamente el tipo de cada valor. Todas las claves bajo la ruta pasan a ser buscables.</p>
<p><code translate="no">AUTOINDEX</code> Utiliza de forma transparente « <code translate="no">INVERTED</code> » para el tipo de conversión « <code translate="no">JSON</code> », ya que el aplanamiento y la inferencia de tipos son capacidades del índice invertido.</p>
<p>Indexar todo el objeto ` <code translate="no">metadata</code> `:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>O indexar un subobjeto, como toda la información de « <code translate="no">supplier</code> »:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>La indexación de objetos completos aumenta el tamaño del índice. Para nuevas cargas de trabajo con documentos profundamente anidados y patrones de consulta diversos, utiliza índices específicos de ruta o considera el uso de <a href="/docs/es/json-shredding.md">JSON Shredding</a>.</p>
<h3 id="Apply-the-index" class="common-anchor-header">Aplicar el índice<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Una vez añadidos todos los parámetros del índice, aplícalos a tu colección:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Las creaciones de índices se ejecutan de forma asíncrona. Utiliza <code translate="no">client.describe_index(...)</code> para comprobar el estado de creación de un índice específico. El campo « <code translate="no">state</code> » muestra « <code translate="no">Finished</code> » una vez finalizada la creación, y « <code translate="no">total_rows</code> », « <code translate="no">indexed_rows</code> » y « <code translate="no">pending_index_rows</code> » muestran el progreso a lo largo del proceso.</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Respuesta de ejemplo:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que <code translate="no">state</code> indique <code translate="no">Finished</code>, las consultas realizadas en la ruta indexada utilizarán automáticamente el nuevo índice.</p>
<p>Para las entradas de <code translate="no">AUTOINDEX</code>, el campo <code translate="no">index_type</code> de esta respuesta se muestra como <code translate="no">AUTOINDEX</code>. Actualmente, Milvus no revela qué estructura subyacente (<code translate="no">BITMAP</code> o <code translate="no">STL_SORT</code>) se eligió en el momento de la compilación. Considera esta elección como una optimización interna: las consultas de igualdad, <code translate="no">IN</code> y de rango sobre la ruta funcionarán independientemente de la estructura seleccionada.</p>
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">¿Cómo elijo entre AUTOINDEX y un tipo de índice explícito?<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Empieza con <code translate="no">AUTOINDEX</code>. Este tipo selecciona el diseño adecuado en función de la cardinalidad de tus datos y cubre la mayoría de las consultas de igualdad, <code translate="no">IN</code>, y de rango sobre rutas JSON. Elige un tipo explícito cuando:</p>
<ul>
<li><p>Conozcas tu patrón de consulta (por ejemplo, si siempre utilizas consultas de rango, utiliza <code translate="no">STL_SORT</code>, y si siempre realizas consultas de igualdad sobre valores de baja cardinalidad, utiliza <code translate="no">BITMAP</code>) y quieras omitir la medición de la cardinalidad.</p></li>
<li><p>Necesites consultas de coincidencia de texto o de subcadenas. Utiliza <code translate="no">INVERTED</code>.</p></li>
<li><p>Estás indexando tipos de conversión de matriz. Utiliza <code translate="no">INVERTED</code> de forma explícita.</p></li>
<li><p>Estás manteniendo un índice JSON de objeto completo ya existente. Tanto <code translate="no">INVERTED</code> como <code translate="no">AUTOINDEX</code> siguen siendo compatibles por motivos de compatibilidad, pero la indexación JSON de objeto completo queda obsoleta a partir de Milvus 3.0.0.</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">¿Qué ocurre si la expresión de filtro de una consulta utiliza un tipo diferente al tipo de conversión del índice?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Si tu expresión de filtro utiliza un tipo diferente al <code translate="no">json_cast_type</code> del índice, Milvus no utilizará el índice y podría recurrir a un escaneo por fuerza bruta más lento si los datos lo permiten. Para obtener el mejor rendimiento, alinea siempre tu expresión de filtro con el tipo de conversión del índice. Por ejemplo, si se crea un índice numérico con ` <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>`, solo las condiciones de filtro numéricas aprovecharán el índice.</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">¿Qué ocurre si una clave JSON tiene tipos de datos inconsistentes entre diferentes entidades?<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>Los tipos inconsistentes pueden dar lugar a <strong>una indexación parcial</strong>. Por ejemplo, si <code translate="no">metadata[&quot;price&quot;]</code> se almacena tanto como número (<code translate="no">99.99</code>) como cadena (<code translate="no">&quot;99.99&quot;</code>) y se crea un índice con <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>, solo se indexarán los valores numéricos. Las entradas en forma de cadena se omitirán y no aparecerán en los resultados del filtro. Utiliza <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> para convertir las cadenas en números en el momento de la indexación, o corrige los datos de origen para que todas las entradas tengan el mismo tipo.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">¿Puedo crear varios índices sobre la misma clave JSON?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>No. Milvus permite como máximo un índice por cada par « <code translate="no">(field, json_path)</code> », independientemente del tipo de conversión o del tipo de índice. No se puede crear a la vez un índice « <code translate="no">INVERTED</code> » y un índice « <code translate="no">BITMAP</code> » en la misma ruta, ni dos índices en la misma ruta con tipos de conversión diferentes. Sin embargo, sí se puede crear un índice sobre todo el objeto JSON y otro índice independiente sobre una clave anidada dentro de ese objeto, ya que se trata de rutas diferentes.</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">¿Cómo se ajusta el umbral BITMAP frente a STL_SORT de AUTOINDEX?<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>Por defecto, <code translate="no">AUTOINDEX</code> elige <code translate="no">BITMAP</code> cuando los valores indexados tienen <strong>100 o menos valores distintos</strong> y <code translate="no">STL_SORT</code> en los demás casos. Puedes anular este umbral añadiendo <code translate="no">&quot;bitmap_cardinality_limit&quot;</code> a los parámetros de tu índice (rango: 1-1000):</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>La mayoría de los usuarios no necesitan ajustar este valor. Auméntalo si tienes un campo de cardinalidad moderada que prefieras que se represente mediante mapa de bits; redúcelo para que <code translate="no">AUTOINDEX</code> se utilice antes que <code translate="no">STL_SORT</code>. La configuración se ignora cuando se especifica explícitamente <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> o <code translate="no">BITMAP</code>.</p>
