---
id: pattern-matching.md
title: Coincidencia de patrones
summary: >-
  Milvus admite la coincidencia de patrones de cadenas con patrones comodín LIKE
  y expresiones regulares RE2. Utiliza filtros de patrones para buscar
  coincidencias en prefijos, sufijos, subcadenas, códigos estructurados,
  dominios de correo electrónico, rutas de URL y otros patrones de cadenas en
  campos VARCHAR, rutas de cadenas JSON o elementos ARRAY.
---
<h1 id="Pattern-Matching" class="common-anchor-header">Coincidencia de patrones<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>En las aplicaciones de búsqueda agentiva, la búsqueda vectorial y la coincidencia de patrones al estilo «grep» suelen complementarse entre sí. La búsqueda vectorial recupera entidades que son semánticamente relevantes, mientras que la coincidencia de patrones filtra esos resultados según estructuras de cadenas exactas, como códigos de error, prefijos de registros, dominios de correo electrónico, rutas de URL o identificadores.</p>
<p>En Milvus, puedes expresar estas restricciones de patrones en filtros escalares con « <code translate="no">LIKE</code> » para la coincidencia simple con comodines, y « <code translate="no">=~</code> » o « <code translate="no">!~</code> » para expresiones regulares <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. Puedes combinar estos filtros con « <code translate="no">query</code> », « <code translate="no">search</code> » o la búsqueda híbrida.</p>
<p>Las expresiones de coincidencia de patrones se escriben en el parámetro <code translate="no">filter</code>. Por ejemplo, la siguiente consulta busca mensajes de registro que contengan un código de error como <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Los ejemplos de esta página se centran en la expresión asignada a <code translate="no">filter</code>. Puede utilizar la misma sintaxis de expresión de filtro en las operaciones de Milvus que aceptan un filtro escalar, como <code translate="no">query</code>, <code translate="no">search</code> y la búsqueda híbrida.</p>
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
    </button></h2><p>La coincidencia de patrones está disponible para valores de cadena.</p>
<table>
<thead>
<tr><th>Objetivo</th><th><code translate="no">LIKE</code></th><th>Expresión regular <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> campo</td><td>Sí</td><td>Sí</td><td>Objetivo típico para la coincidencia de patrones en campos de cadena.</td></tr>
<tr><td><code translate="no">JSON</code> ruta con tipo de conversión « <code translate="no">VARCHAR</code> »</td><td>Sí</td><td>Sí</td><td>El valor de la ruta JSON debe ser una cadena para que las coincidencias sean positivas. Si creas un índice en la ruta JSON para acelerar el proceso, establece <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> elemento</td><td>Sí</td><td>Sí</td><td>Coincide con un elemento específico por índice, como <code translate="no">tags[0]</code>. La coincidencia de patrones <strong>no</strong> analiza todos los elementos; solo se aplica al elemento del índice especificado.</td></tr>
<tr><td>Objetivos numéricos, booleanos, vectoriales, « <code translate="no">TEXT</code> » u otros no «<code translate="no">VARCHAR</code> »</td><td>No</td><td>No</td><td>La coincidencia de patrones solo está disponible para valores de tipo « <code translate="no">VARCHAR</code> », rutas JSON que se resuelven en cadenas o elementos indexados de tipo « <code translate="no">ARRAY&lt;VARCHAR&gt;</code> ».</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Elige «LIKE» o una expresión regular<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Elige el operador más sencillo que exprese el patrón que necesitas.</p>
<p>Si necesitas una coincidencia exacta de cadena, te recomendamos que utilices « <code translate="no">==</code> » en lugar de la coincidencia de patrones. Utiliza « <code translate="no">LIKE</code> » o «regex» solo cuando el filtro tenga que coincidir con un patrón.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Operador recomendado</th><th>Ejemplo</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td>Igualdad exacta de la cadena</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Coincidencia exacta de la cadena « <code translate="no">active</code> ».</td></tr>
<tr><td>Coincidencia simple de prefijo</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Coincide con cadenas que empiezan por « <code translate="no">Prod</code> ».</td></tr>
<tr><td>Coincidencia simple de sufijo</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Coincide con cadenas que terminan en « <code translate="no">.json</code> ».</td></tr>
<tr><td>Coincidencia simple «contiene»</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Coincide con valores que contengan <code translate="no">vector database</code> en cualquier parte de la cadena.</td></tr>
<tr><td>Búsqueda de un código estructurado o un patrón de longitud fija</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Coincide con cadenas que contengan, distinguiendo entre mayúsculas y minúsculas, « <code translate="no">E</code> » seguido de cuatro dígitos, como « <code translate="no">E1001</code> ».</td></tr>
<tr><td>Coincidencia de patrones sin distinción entre mayúsculas y minúsculas</td><td><code translate="no">=~</code> con <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Coincide con « <code translate="no">error</code> », « <code translate="no">ERROR</code> » u otras variantes con mayúsculas y minúsculas.</td></tr>
<tr><td>Excluir valores que coincidan con un patrón de expresión regular</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Excluye las cadenas que comienzan por <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>Utiliza « <code translate="no">LIKE</code> » para una coincidencia sencilla con comodines. Utiliza expresiones regulares cuando el patrón requiera clases de caracteres, repeticiones, alternativas como « <code translate="no">error|failed</code> », anclajes o coincidencias que no distingan entre mayúsculas y minúsculas.</p>
<h2 id="Use-LIKE" class="common-anchor-header">Utilizar LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">LIKE</code> sirve para la coincidencia simple con comodines en valores de cadena. Solo admite los siguientes comodines:</p>
<table>
<thead>
<tr><th>Comodín</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Coincide con cero o más caracteres.</td></tr>
<tr><td><code translate="no">_</code></td><td>Coincide con exactamente un carácter.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Patrones LIKE habituales<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Utiliza la posición de « <code translate="no">%</code> » y « <code translate="no">_</code> » para controlar dónde aparece el texto fijo en la cadena coincidente.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Patrón</th><th>Ejemplo de filtro</th></tr>
</thead>
<tbody>
<tr><td>Empieza con un prefijo</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Termina con un sufijo</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Contiene una subcadena</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Coincide con un carácter en una posición fija</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">Comportamiento de coincidencia LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Utiliza « <code translate="no">LIKE</code> » para coincidencias de prefijo, sufijo, contenido y un solo carácter en una posición fija. « <code translate="no">LIKE</code> » no admite clases de caracteres como « <code translate="no">[0-9]</code> », alternancias como « <code translate="no">error|failed</code> », recuentos de repeticiones como « <code translate="no">{4}</code> », anclajes como « <code translate="no">^</code> » o « <code translate="no">$</code> », ni indicadores de no distinción entre mayúsculas y minúsculas como « <code translate="no">(?i)</code> ». Utiliza expresiones regulares para esos patrones.</p>
<p>Utiliza « <code translate="no">==</code> » para la igualdad exacta de una cadena completa. Utiliza « <code translate="no">LIKE</code> » solo cuando el filtro necesite una coincidencia con comodines.</p>
<h3 id="Escaping-wildcards-in-a-LIKE-pattern" class="common-anchor-header">Escapar los comodines en un patrón LIKE<button data-href="#Escaping-wildcards-in-a-LIKE-pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>En los patrones « <code translate="no">LIKE</code> », « <code translate="no">%</code> » coincide con cero o más caracteres y « <code translate="no">_</code> » coincide exactamente con un carácter. Para que coincidan literalmente « <code translate="no">%</code> », « <code translate="no">_</code> » o « <code translate="no">\</code> », escapa el carácter con una barra invertida (<code translate="no">\</code>):</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> coincide con el valor literal « <code translate="no">%</code> ».</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> coincide con valores que empiezan por el carácter literal « <code translate="no">_</code> ».</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> coincide con valores que empiezan por una barra invertida literal.</li>
</ul>
<p>Los literales de cadena sin procesar, escritos como <code translate="no">r&quot;...&quot;</code> o <code translate="no">r'...'</code>, conservan las barras invertidas tal cual en las expresiones de filtro de Milvus. Se recomiendan para <code translate="no">LIKE</code> y patrones de expresiones regulares que contengan barras invertidas. Sin una cadena sin procesar, los literales de cadena normales siguen procesando las secuencias de escape antes de que se evalúe el patrón, por lo que pueden ser necesarias más barras invertidas.</p>
<h2 id="Use-regex--Milvus-30x" class="common-anchor-header">Utiliza expresiones regulares<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilice filtros de expresiones regulares cuando el patrón requiera características de expresiones regulares, como clases de caracteres, repetición, alternancia, anclajes o coincidencia sin distinción entre mayúsculas y minúsculas. Milvus aplica una expresión regular <a href="https://github.com/google/re2/wiki/syntax">RE2</a> a un valor de cadena.</p>
<p>El lado derecho de « <code translate="no">=~</code> » o « <code translate="no">!~</code> » debe ser un literal de cadena.</p>
<table>
<thead>
<tr><th>Operador</th><th>Significado</th><th>Ejemplo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Coincide con los valores que satisfacen el patrón de expresión regular.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Excluye los valores que cumplen el patrón de expresión regular.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Use-raw-string-literals" class="common-anchor-header">Utiliza literales de cadena sin formato<button data-href="#Use-raw-string-literals" class="anchor-icon" translate="no">
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
    </button></h3><p>Se recomienda utilizar literales de cadena sin formato para los patrones de expresiones regulares que contengan barras invertidas. En una cadena sin formato, escrita como <code translate="no">r&quot;...&quot;</code> o <code translate="no">r'...'</code>, las barras invertidas se pasan tal cual al motor de expresiones regulares. Esto evita el escape adicional que requieren los literales de cadena normales.</p>
<p>Por ejemplo:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ r&quot;\d{4}-\d{2}-\d{2}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto coincide con cadenas que contienen un valor similar a una fecha, como <code translate="no">2026-07-01</code>.</p>
<p>Sin una cadena sin formato, los literales de cadena normales procesan las secuencias de escape antes de que se evalúe el patrón de expresión regular, por lo que patrones como <code translate="no">\d</code>, <code translate="no">\s</code> o caracteres literales escapados pueden requerir barras invertidas adicionales.</p>
<h3 id="Common-regex-patterns" class="common-anchor-header">Patrones de expresiones regulares comunes<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Los siguientes ejemplos utilizan la sintaxis RE2 habitual en las expresiones de filtro de Milvus. Para conocer la sintaxis completa de expresiones regulares, consulta la referencia <a href="https://github.com/google/re2/wiki/syntax">de sintaxis RE2</a>.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Patrón</th><th>Ejemplo de filtro</th></tr>
</thead>
<tbody>
<tr><td>Contiene texto literal</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Empieza con un prefijo</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Termina con un sufijo</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Coincide con una secuencia de dígitos</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Coincide con un número fijo de dígitos</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Coincide con un dominio de correo electrónico</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Coincide sin distinguir entre mayúsculas y minúsculas</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Coincide con la cadena completa</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Para buscar una de varias palabras, utiliza la alternancia con « <code translate="no">|</code> »:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Al buscar metacaracteres de expresiones regulares de forma literal, escápalos en el patrón de expresión regular. Por ejemplo, para buscar un punto literal (<code translate="no">\.</code> en una expresión regular), escribe <code translate="no">\\.</code> en una cadena de filtro de Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nota: Los filtros de expresiones regulares de Milvus siguen la sintaxis RE2. Si un patrón de expresión regular utiliza una sintaxis que RE2 no admite o que no es válida por cualquier otro motivo, Milvus rechaza la expresión del filtro. Para obtener más detalles sobre los metacaracteres de expresiones regulares, los indicadores y el comportamiento de coincidencia, consulta la referencia <a href="https://github.com/google/re2/wiki/syntax">de sintaxis RE2</a>.</p>
<h3 id="Matching-behavior" class="common-anchor-header">Comportamiento de coincidencia<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
<p>La coincidencia de expresiones regulares de Milvus utiliza la semántica de subcadenas. No es necesario que el patrón coincida con el valor completo del campo. Por ejemplo, el siguiente filtro coincide tanto con <code translate="no">E1001</code> como con <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para coincidir con el valor completo del campo, utilice los anclajes <code translate="no">^</code> y <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Campos VARCHAR nulos</strong></p>
<p>Los filtros de expresiones regulares no coinciden con valores nulos. Esto se aplica tanto a « <code translate="no">=~</code> » como a « <code translate="no">!~</code> ». Si desea excluir un patrón de expresión regular pero conservar los valores nulos, añada explícitamente « <code translate="no">OR field IS NULL</code> »:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Rutas JSON</strong></p>
<p>En el caso de las rutas JSON, los filtros de expresiones regulares se comportan de forma diferente cuando la ruta falta, es nula o se resuelve en un valor que no es una cadena:</p>
<table>
<thead>
<tr><th>Filtro</th><th>¿Incluye valores que faltan, nulos o que no son cadenas?</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>No</td><td>Solo coincide con valores de cadena que satisfagan el patrón de expresión regular.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Sí</td><td>Devuelve entidades en las que la ruta falta, es nula, no es una cadena o es una cadena que no coincide con el patrón de expresión regular.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Acelera la coincidencia de patrones con índices<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus admite varios tipos de índices en campos de cadena que pueden utilizarse junto con filtros de « <code translate="no">LIKE</code> » y de expresiones regulares en campos « <code translate="no">VARCHAR</code> » o rutas de cadena JSON, como <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> y <code translate="no">BITMAP</code>. La coincidencia de patrones puede funcionar sin un índice, pero un índice puede mejorar el rendimiento en conjuntos de datos de gran tamaño.</p>
<p>La eficacia del índice depende de la expresión del patrón, de si Milvus puede extraer subcadenas literales fijas, y de la cardinalidad y la distribución del campo de destino. Los patrones de tipo prefijo, como <code translate="no">name LIKE &quot;Prod%&quot;</code>, pueden beneficiarse de estrategias de indexación diferentes a las de los patrones de tipo infijo o sufijo, como <code translate="no">description LIKE &quot;%vector%&quot;</code> o <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Utilice la siguiente tabla como punto de partida y, a continuación, realice pruebas de rendimiento con su propia carga de trabajo:</p>
<table>
<thead>
<tr><th>Patrón o característica de los datos</th><th>Índice a tener en cuenta</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td>Contiene subcadenas literales fijas, como <code translate="no">message =~ &quot;error.*timeout&quot;</code> o <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Resulta útil cuando Milvus puede extraer subcadenas literales significativas del patrón. Para más detalles, consulta <a href="/docs/es/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Filtros de cadenas de tipo prefijo, exactos o de igualdad, especialmente en campos con cardinalidad baja o moderada</td><td><code translate="no">STL_SORT</code>, « <code translate="no">INVERTED</code> » o <code translate="no">BITMAP</code></td><td>Pueden resultar más eficaces cuando el campo tiene valores repetidos o cuando el filtro se aproxima a una coincidencia exacta. Para más detalles, consulta <a href="/docs/es/stl-sort.md">STL_SORT</a>, <a href="/docs/es/inverted.md">INVERTED</a> y <a href="/docs/es/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Patrones Regex sin literales fijos, o patrones dominados por clases de caracteres, tokens cortos o comodines</td><td>Realice pruebas de rendimiento antes de confiar en la aceleración por índice</td><td>Estos patrones pueden ofrecer una selectividad de índice limitada y pueden recurrir a exploraciones más amplias.</td></tr>
</tbody>
</table>
