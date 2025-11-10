---
id: geometry-operators.md
title: Operadores geométricosCompatible with Milvus 2.6.4+
summary: >-
  Milvus admite un conjunto de operadores para el filtrado espacial en campos
  GEOMETRÍA, que son esenciales para gestionar y analizar datos geométricos.
  Estos operadores permiten recuperar entidades basándose en las relaciones
  geométricas entre objetos.
beta: Milvus 2.6.4+
---
<h1 id="Geometry-Operators" class="common-anchor-header">Operadores geométricos<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Geometry-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus admite un conjunto de operadores para el filtrado espacial en los campos <code translate="no">GEOMETRY</code>, que son esenciales para gestionar y analizar datos geométricos. Estos operadores permiten recuperar entidades basándose en las relaciones geométricas entre objetos.</p>
<p>Todos los operadores geométricos funcionan tomando dos argumentos geométricos: el nombre del campo <code translate="no">GEOMETRY</code> definido en el esquema de su colección y un objeto geométrico de destino representado en formato <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">Well-Known Text</a> (WKT).</p>
<h2 id="Use-syntax" class="common-anchor-header">Sintaxis de uso<button data-href="#Use-syntax" class="anchor-icon" translate="no">
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
    </button></h2><p>Para filtrar en un campo <code translate="no">GEOMETRY</code>, utilice un operador geométrico en una expresión:</p>
<ul>
<li><p>General: <code translate="no">{operator}(geo_field, '{wkt}')</code></p></li>
<li><p>Basado en la distancia: <code translate="no">ST_DWITHIN(geo_field, '{wkt}', distance)</code></p></li>
</ul>
<p>Donde</p>
<ul>
<li><p><code translate="no">operator</code> es uno de los operadores geométricos admitidos (por ejemplo, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_INTERSECTS</code>). Los nombres de los operadores deben estar en mayúsculas o minúsculas. Para obtener una lista de los operadores admitidos, consulte <a href="/docs/es/geometry-operators.md#Supported-geometry-operators">Operadores de geometría admitidos</a>.</p></li>
<li><p><code translate="no">geo_field</code> es el nombre del campo <code translate="no">GEOMETRY</code>.</p></li>
<li><p><code translate="no">'{wkt}'</code> es la representación WKT de la geometría a consultar.</p></li>
<li><p><code translate="no">distance</code> es el umbral específico de <code translate="no">ST_DWITHIN</code>.</p></li>
</ul>
<p>Para obtener más información sobre los campos <code translate="no">GEOMETRY</code> en Milvus, consulte <a href="/docs/es/geometry-field.md">Campo geométrico</a>.</p>
<h2 id="Supported-geometry-operators" class="common-anchor-header">Operadores de geometría admitidos<button data-href="#Supported-geometry-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>La siguiente tabla enumera los operadores de geometría disponibles en Milvus.</p>
<div class="alert note">
<p>Los nombres de los operadores deben estar <strong>en mayúsculas</strong> o <strong>minúsculas</strong>. No mezcle mayúsculas y minúsculas dentro del mismo nombre de operador.</p>
</div>
<table>
   <tr>
     <th><p>Operador</p></th>
     <th><p>Descripción</p></th>
     <th><p>Ejemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ST_EQUALS(A, B)</code> / <code translate="no">st_equals(A, B)</code></p></td>
     <td><p>Devuelve TRUE si dos geometrías son espacialmente idénticas, lo que significa que tienen el mismo conjunto de puntos y dimensión.</p></td>
     <td><p>¿Son dos geometrías (A y B) exactamente iguales en el espacio?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CONTAINS(A, B)</code> / <code translate="no">st_contains(A, B)</code></p></td>
     <td><p>Devuelve TRUE si la geometría A contiene completamente a la geometría B, teniendo sus interiores al menos un punto en común.</p></td>
     <td><p>¿Contiene un límite urbano (A) a un parque concreto (B)?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CROSSES(A, B)</code> / <code translate="no">st_crosses(A, B)</code></p></td>
     <td><p>Devuelve TRUE si las geometrías A y B se intersecan parcialmente pero no se contienen completamente.</p></td>
     <td><p>¿Se cruzan dos carreteras (A y B) en una intersección?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_INTERSECTS(A, B)</code> / <code translate="no">st_intersects(A, B)</code></p></td>
     <td><p>Devuelve TRUE si las geometrías A y B tienen al menos un punto en común. Se trata de la consulta espacial más general y más utilizada.</p></td>
     <td><p>¿Se cruza una zona de búsqueda (A) con alguna de las ubicaciones de las tiendas (B)?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_OVERLAPS(A, B)</code> / <code translate="no">st_overlaps(A, B)</code></p></td>
     <td><p>Devuelve TRUE si las geometrías A y B tienen la misma dimensión, se solapan parcialmente y ninguna contiene totalmente a la otra.</p></td>
     <td><p>¿Se solapan dos terrenos (A y B)?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_TOUCHES(A, B)</code> / <code translate="no">st_touches(A, B)</code></p></td>
     <td><p>Devuelve TRUE si las geometrías A y B comparten un límite común pero sus interiores no se cruzan.</p></td>
     <td><p>¿Comparten frontera dos propiedades vecinas (A y B)?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_WITHIN(A, B)</code> / <code translate="no">st_within(A, B)</code></p></td>
     <td><p>Devuelve TRUE si la geometría A está completamente contenida dentro de la geometría B, teniendo sus interiores al menos un punto en común. Es la inversa de <code translate="no">ST_Contains(B, A)</code>.</p></td>
     <td><p>¿Se encuentra un punto de interés concreto (A) dentro de un radio de búsqueda definido (B)?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_DWITHIN(A, B, distance)</code> / <code translate="no">st_dwithin(A, B, distance)</code></p></td>
     <td><p>Devuelve TRUE si la distancia entre la geometría A y la geometría B es menor o igual que la distancia especificada.</p><p><strong>Nota</strong>: Actualmente, la geometría B sólo admite puntos. La unidad de distancia es el metro.</p></td>
     <td><p>Encuentra todos los puntos dentro de 5000 metros de un punto específico (B).</p></td>
   </tr>
</table>
<h2 id="STEQUALS--stequals" class="common-anchor-header">ST_EQUALS / st_iguales<button data-href="#STEQUALS--stequals" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">ST_EQUALS</code> devuelve TRUE si dos geometrías son espacialmente idénticas, lo que significa que tienen el mismo conjunto de puntos y dimensión. Esto es útil para verificar si dos objetos geométricos almacenados representan exactamente la misma ubicación y forma.</p>
<p><strong>Ejemplo</strong></p>
<p>Supongamos que desea comprobar si una geometría almacenada (como un punto o un polígono) es exactamente igual a una geometría de destino. Por ejemplo, puede comparar un punto almacenado con un punto de interés específico.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to check if a geometry matches a specific point</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_EQUALS(geo_field, &#x27;POINT(10 20)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCONTAINS--stcontains" class="common-anchor-header">ST_CONTAINS / st_contains<button data-href="#STCONTAINS--stcontains" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">ST_CONTAINS</code> devuelve TRUE si la primera geometría contiene completamente a la segunda. Esto es útil para encontrar puntos dentro de un polígono, o polígonos más pequeños dentro de uno más grande.</p>
<p><strong>Ejemplo</strong></p>
<p>Imagine que dispone de una colección de distritos urbanos y desea encontrar un punto de interés específico, como un restaurante, que se encuentre dentro de los límites de un distrito determinado.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries completely within a specific polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CONTAINS(geo_field, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCROSSES--stcrosses" class="common-anchor-header">ST_CROSSES / st_crosses<button data-href="#STCROSSES--stcrosses" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">ST_CROSSES</code> devuelve <code translate="no">TRUE</code> si la intersección de dos geometrías forma una geometría con una dimensión inferior a las geometrías originales. Esto se aplica típicamente a una línea que cruza un polígono u otra línea.</p>
<p><strong>Ejemplo</strong></p>
<p>Desea encontrar todas las rutas de senderismo (cadenas de líneas) que cruzan una línea límite específica (otra cadena de líneas) o entran en una zona protegida (polígono).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that cross a line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CROSSES(geo_field, &#x27;LINESTRING(5 0, 5 10)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STINTERSECTS--stintersects" class="common-anchor-header">ST_INTERSECTS / st_intersects<button data-href="#STINTERSECTS--stintersects" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">ST_INTERSECTS</code> devuelve <code translate="no">TRUE</code> si dos geometrías tienen algún punto de sus límites o interiores en común. Se trata de un operador de uso general para detectar cualquier forma de solapamiento espacial.</p>
<p><strong>Ejemplo</strong></p>
<p>Si tiene una colección de carreteras y desea encontrar todas las carreteras que cruzan o tocan una cadena de líneas específica que representa una nueva carretera propuesta, puede utilizar <code translate="no">ST_INTERSECTS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that intersect with a specific line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_INTERSECTS(geo_field, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STOVERLAPS--stoverlaps" class="common-anchor-header">ST_OVERLAPS / st_overlaps<button data-href="#STOVERLAPS--stoverlaps" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">ST_OVERLAPS</code> devuelve <code translate="no">TRUE</code> si dos geometrías de la misma dimensión tienen una intersección parcial, donde la intersección en sí tiene la misma dimensión que las geometrías originales, pero no es igual a ninguna de ellas.</p>
<p><strong>Ejemplo</strong></p>
<p>Tiene un conjunto de regiones de venta superpuestas y desea encontrar todas las regiones que se superponen parcialmente con una nueva zona de venta propuesta.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that partially overlap with a polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_OVERLAPS(geo_field, &#x27;POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STTOUCHES--sttouches" class="common-anchor-header">ST_TOQUES / st_touches<button data-href="#STTOUCHES--sttouches" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">ST_TOUCHES</code> devuelve <code translate="no">TRUE</code> si los límites de dos geometrías se tocan, pero sus interiores no se intersecan. Esto es útil para detectar adyacencias.</p>
<p><strong>Ejemplo</strong></p>
<p>Si dispone de un mapa de parcelas inmobiliarias y desea encontrar todas las parcelas que son directamente adyacentes a un parque público sin que se solapen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that only touch a line string at their boundaries.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_TOUCHES(geo_field, &#x27;LINESTRING(0 0, 1 1)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STWITHIN--stwithin" class="common-anchor-header">ST_WITHIN / st_within<button data-href="#STWITHIN--stwithin" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">ST_WITHIN</code> devuelve <code translate="no">TRUE</code> si la primera geometría está completamente dentro del interior o en el límite de la segunda geometría. Es el inverso de <code translate="no">ST_CONTAINS</code>.</p>
<p><strong>Ejemplo</strong></p>
<p>Desea encontrar todas las zonas residenciales pequeñas que se encuentran completamente dentro de una zona de parque designada más grande.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that are completely within a larger polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_WITHIN(geo_field, &#x27;POLYGON((110 38, 115 38, 115 42, 110 42, 110 38))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información sobre cómo utilizar un campo <code translate="no">GEOMETRY</code>, consulte <a href="/docs/es/geometry-field.md">Campo de geometría</a>.</p>
<h2 id="STDWITHIN--stdwithin" class="common-anchor-header">ST_DWITHIN / st_dwithin<button data-href="#STDWITHIN--stdwithin" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador <code translate="no">ST_DWITHIN</code> devuelve <code translate="no">TRUE</code> si la distancia entre la geometría A y la geometría B es menor o igual que un valor especificado (en metros). Actualmente, la geometría B debe ser un punto.</p>
<p><strong>Ejemplo</strong></p>
<p>Supongamos que dispone de una colección de ubicaciones de tiendas y desea encontrar todas las tiendas situadas a menos de 5.000 metros de la ubicación de un cliente concreto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Find all stores within 5000 meters of the point (120 30)</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_DWITHIN(geo_field, &#x27;POINT(120 30)&#x27;, 5000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
