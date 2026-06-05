---
id: pattern-matching.md
title: Comparación de patrones
summary: >-
  Milvus admite la coincidencia de patrones de cadenas con patrones comodín LIKE
  y expresiones regulares RE2. Utilice filtros de patrones para hacer coincidir
  prefijos, sufijos, subcadenas, códigos estructurados, dominios de correo
  electrónico, rutas URL y otros patrones de cadenas en campos VARCHAR, rutas de
  cadenas JSON o elementos ARRAY.
---
<h1 id="Pattern-Matching" class="common-anchor-header">Comparación de patrones<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>En las aplicaciones de búsqueda agéntica, la búsqueda vectorial y la concordancia de patrones tipo grep suelen complementarse. La búsqueda vectorial recupera entidades que son semánticamente relevantes, mientras que la concordancia de patrones reduce esos resultados por estructuras de cadena exactas, como códigos de error, prefijos de registro, dominios de correo electrónico, rutas URL o identificadores.</p>
<p>En Milvus, puede expresar estas restricciones de patrones en filtros escalares con <code translate="no">LIKE</code> para una simple coincidencia de comodines, y <code translate="no">=~</code> o <code translate="no">!~</code> para expresiones regulares <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. Puede combinar estos filtros con <code translate="no">query</code>, <code translate="no">search</code>, o búsqueda híbrida.</p>
<p>Las expresiones de coincidencia de patrones se escriben en el parámetro <code translate="no">filter</code>. Por ejemplo, la siguiente consulta busca mensajes de registro que contengan un código de error como <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Los ejemplos de esta página se centran en la expresión asignada a <code translate="no">filter</code>. Puede utilizar la misma sintaxis de expresión de filtro en las operaciones Milvus que aceptan un filtro escalar, como <code translate="no">query</code>, <code translate="no">search</code>, y la búsqueda híbrida.</p>
<h2 id="Supported-field-types" class="common-anchor-header">Tipos de campo admitidos<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>La concordancia de patrones está disponible para valores de cadena.</p>
<table>
<thead>
<tr><th>Objetivo</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> campo</td><td>Sí</td><td>Sí</td><td>Objetivo típico para la concordancia de patrones en campos de cadena.</td></tr>
<tr><td><code translate="no">JSON</code> path con <code translate="no">VARCHAR</code> cast type</td><td>Sí</td><td>Sí</td><td>El valor de la ruta JSON debe ser una cadena para coincidencias positivas. Si crea un índice en la ruta JSON para la aceleración, defina <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> elemento</td><td>Sí</td><td>Sí</td><td>Coincide con un elemento específico por índice, como <code translate="no">tags[0]</code>. La coincidencia de patrones <strong>no</strong> explora todos los elementos; sólo se aplica al elemento en el índice especificado.</td></tr>
<tr><td>Objetivos numéricos, booleanos, vectoriales, <code translate="no">TEXT</code>, u otros no<code translate="no">VARCHAR</code> </td><td>No</td><td>No</td><td>La concordancia de patrones sólo está disponible para valores <code translate="no">VARCHAR</code>, rutas JSON que se resuelven en cadenas o elementos indexados <code translate="no">ARRAY&lt;VARCHAR&gt;</code>.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Elija LIKE o regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Elija el operador más sencillo que exprese el patrón que necesita.</p>
<p>Si necesita una coincidencia de cadena exacta, le recomendamos que utilice <code translate="no">==</code> en lugar de la coincidencia de patrones. Utilice <code translate="no">LIKE</code> o regex sólo cuando el filtro deba coincidir con un patrón.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Operador recomendado</th><th>Ejemplo</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td>Igualdad exacta de cadena</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Igualdad exacta de la cadena <code translate="no">active</code>.</td></tr>
<tr><td>Coincidencia de prefijo simple</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Coincide con cadenas que empiecen por <code translate="no">Prod</code>.</td></tr>
<tr><td>Coincidencia de sufijo simple</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Coincide con las cadenas que terminan en <code translate="no">.json</code>.</td></tr>
<tr><td>Coincidencia simple de contenido</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Coincide con valores que contengan <code translate="no">vector database</code> en cualquier parte de la cadena.</td></tr>
<tr><td>Coincide con un código estructurado o un patrón de longitud fija</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Coincide con cadenas que distinguen entre mayúsculas y minúsculas y contienen <code translate="no">E</code> seguido de cuatro dígitos, como <code translate="no">E1001</code>.</td></tr>
<tr><td>Coincidencia de patrones sin distinción entre mayúsculas y minúsculas</td><td><code translate="no">=~</code> con <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Coincide con <code translate="no">error</code>, <code translate="no">ERROR</code> u otras variantes de mayúsculas y minúsculas.</td></tr>
<tr><td>Excluir valores que coincidan con un patrón regex</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Excluye cadenas que empiecen por <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>Utilice <code translate="no">LIKE</code> para coincidencias simples con comodines. Utilice regex cuando el patrón necesite clases de caracteres, repetición, alternancia como <code translate="no">error|failed</code>, anclas o coincidencia insensible a mayúsculas y minúsculas.</p>
<h2 id="Use-LIKE" class="common-anchor-header">Utilice LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">LIKE</code> se utiliza para la búsqueda simple de comodines en valores de cadena. Sólo admite los siguientes comodines:</p>
<table>
<thead>
<tr><th>Comodín</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Coincide con cero o más caracteres.</td></tr>
<tr><td><code translate="no">_</code></td><td>Coincide exactamente con un carácter.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Patrones LIKE comunes<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice la posición de <code translate="no">%</code> y <code translate="no">_</code> para controlar dónde aparece el texto fijo en la cadena coincidente.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Patrón</th><th>Ejemplo de filtro</th></tr>
</thead>
<tbody>
<tr><td>Empieza por un prefijo</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Termina con un sufijo</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Contiene una subcadena</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Coincide con un carácter en una posición fija</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">Comportamiento de las coincidencias LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice <code translate="no">LIKE</code> para las coincidencias de prefijo, sufijo, contenido y posición fija de un solo carácter. <code translate="no">LIKE</code> no admite clases de caracteres como <code translate="no">[0-9]</code>, alternancia como <code translate="no">error|failed</code>, recuentos de repetición como <code translate="no">{4}</code>, anclas como <code translate="no">^</code> o <code translate="no">$</code>, o indicadores que no distinguen mayúsculas de minúsculas como <code translate="no">(?i)</code>. Utilice regex para esos patrones.</p>
<p>Utilice <code translate="no">==</code> para la igualdad exacta de la cadena completa. Utilice <code translate="no">LIKE</code> sólo cuando el filtro necesite coincidencias con comodines.</p>
<h2 id="Use-regex" class="common-anchor-header">Utilizar regex<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilice filtros regex cuando el patrón requiera características de expresión regular como clases de caracteres, repetición, alternancia, anclas o coincidencia sin distinción entre mayúsculas y minúsculas. Milvus aplica una expresión regular <a href="https://github.com/google/re2/wiki/syntax">RE2</a> a un valor de cadena.</p>
<p>El lado derecho de <code translate="no">=~</code> o <code translate="no">!~</code> debe ser un literal de cadena.</p>
<table>
<thead>
<tr><th>Operador</th><th>Significado</th><th>Ejemplo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Coincide con los valores que satisfacen el patrón regex.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Excluye los valores que cumplen el patrón regex.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">Patrones regex comunes<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Los siguientes ejemplos utilizan la sintaxis RE2 común en las expresiones de filtro de Milvus. Para conocer la sintaxis regex completa, consulte la referencia de <a href="https://github.com/google/re2/wiki/syntax">sintaxis RE2</a>.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Patrón</th><th>Ejemplo de filtro</th></tr>
</thead>
<tbody>
<tr><td>Contiene texto literal</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Empieza por un prefijo</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Termina con un sufijo</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Coincide con una secuencia de dígitos</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Coincide con un número fijo de dígitos</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Coincide con un dominio de correo electrónico</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>No distingue entre mayúsculas y minúsculas</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Coincide con la cadena completa</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Para que coincida con una de varias palabras, utilice la alternancia con <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para que coincidan literalmente con metacaracteres regex, escápelos en el patrón regex. Por ejemplo, para que coincida con un punto literal (<code translate="no">\.</code> en regex), escriba <code translate="no">\\.</code> en una cadena de filtro Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nota: Los filtros regex de Milvus siguen la sintaxis RE2. Si un patrón regex utiliza una sintaxis que RE2 no admite o no es válida, Milvus rechaza la expresión del filtro. Para más detalles sobre metacaracteres regex, indicadores y comportamiento de coincidencia, consulte la referencia de <a href="https://github.com/google/re2/wiki/syntax">sintaxis RE2</a>.</p>
<h3 id="Matching-behavior" class="common-anchor-header">Comportamiento de las coincidencias<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Coincidencia de subcadenas</strong></p>
<p>La concordancia regex de Milvus utiliza la semántica de subcadena. No es necesario que el patrón coincida con todo el valor del campo. Por ejemplo, el siguiente filtro coincide tanto con <code translate="no">E1001</code> como con <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para que coincida con todo el valor del campo, utilice las anclas <code translate="no">^</code> y <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Campos VARCHAR anulables</strong></p>
<p>Los filtros Regex no coinciden con valores nulos. Esto se aplica tanto a <code translate="no">=~</code> como a <code translate="no">!~</code>. Si desea excluir un patrón regex pero mantener los valores nulos, añada explícitamente <code translate="no">OR field IS NULL</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Rutas JSON</strong></p>
<p>En el caso de las rutas JSON, los filtros regex se comportan de forma diferente cuando la ruta no existe, es nula o se resuelve con un valor que no es una cadena:</p>
<table>
<thead>
<tr><th>Filtro</th><th>¿Incluye valores omitidos/nulos/no de cadena?</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>No</td><td>Sólo coincide con los valores de cadena que satisfacen el patrón regex.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Sí</td><td>Devuelve las entidades en las que falta la ruta, es nula, no es una cadena o es una cadena que no coincide con el patrón regex.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Acelerar la coincidencia de patrones con índices<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus admite varios tipos de índices en campos de cadena que pueden utilizarse junto con <code translate="no">LIKE</code> y filtros regex en campos <code translate="no">VARCHAR</code> o rutas de cadena JSON, como <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> y <code translate="no">BITMAP</code>. La concordancia de patrones puede funcionar sin índice, pero un índice puede mejorar el rendimiento en grandes conjuntos de datos.</p>
<p>La eficacia del índice depende de la expresión del patrón, de si Milvus puede extraer subcadenas literales fijas y de la cardinalidad y distribución del campo de destino. Los patrones de tipo prefijo, como <code translate="no">name LIKE &quot;Prod%&quot;</code>, pueden beneficiarse de diferentes estrategias de indexación que los patrones infijos o sufijos, como <code translate="no">description LIKE &quot;%vector%&quot;</code> o <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Utilice la siguiente tabla como punto de partida y, a continuación, realice pruebas comparativas con su propia carga de trabajo:</p>
<table>
<thead>
<tr><th>Patrón o característica de datos</th><th>Índice a considerar</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td>Contiene subcadenas literales fijas, como <code translate="no">message =~ &quot;error.*timeout&quot;</code> o <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Ayuda cuando Milvus puede extraer subcadenas literales significativas del patrón. Para más detalles, consulte <a href="/docs/es/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Filtros de cadena tipo prefijo, exactos o de igualdad, especialmente en campos con cardinalidad de baja a moderada</td><td><code translate="no">STL_SORT</code> <code translate="no">INVERTED</code>, o <code translate="no">BITMAP</code></td><td>Pueden ser más eficaces cuando el campo tiene valores repetidos o cuando el filtro se aproxima a la coincidencia exacta. Para obtener más información, consulte <a href="/docs/es/stl-sort.md">STL_SORT</a>, <a href="/docs/es/inverted.md">INVERTED</a> y <a href="/docs/es/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Patrones Regex sin literales fijos, o patrones dominados por clases de caracteres, tokens cortos o comodines</td><td>Realice pruebas antes de confiar en la aceleración de índices</td><td>Estos patrones pueden proporcionar una selectividad de índice limitada y pueden retroceder a exploraciones más amplias.</td></tr>
</tbody>
</table>
