---
id: array-operators.md
title: Operadores de ARRAY
summary: >-
  Milvus ofrece operadores ARRAY para filtrar campos ARRAY y actualizar
  parcialmente los valores de dichos campos.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">Operadores de ARRAY<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ofrece operadores de ARRAY para filtrar campos de ARRAY y actualizar parcialmente los valores de dichos campos.</p>
<div class="alert note">
<p>Todos los elementos de una matriz deben ser del mismo tipo, y las estructuras anidadas dentro de las matrices se tratan como cadenas de texto simples. Por lo tanto, al trabajar con campos ARRAY, es recomendable evitar anidamientos excesivamente profundos y asegurarse de que las estructuras de datos sean lo más planas posible para obtener un rendimiento óptimo.</p>
</div>
<p>Los operadores de ARRAY en Milvus abarcan dos escenarios de uso:</p>
<ul>
<li><p>Expresiones de filtro para consultas y búsquedas.</p></li>
<li><p>Actualizaciones parciales en solicitudes de « <code translate="no">upsert</code> ».</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">Operadores ARRAY disponibles<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>La siguiente tabla enumera los operadores ARRAY disponibles en Milvus.</p>
<table>
<thead>
<tr><th>Operador</th><th>Uso en</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/es/v2.6.x/array-operators.md#ARRAYCONTAINS">ARRAY_CONTAINS(identificador, expr)</a></td><td>Expresión de filtro</td><td>Comprueba si un elemento específico existe en un campo ARRAY.</td></tr>
<tr><td><a href="/docs/es/v2.6.x/array-operators.md#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(identificador, expr)</a></td><td>Expresión de filtro</td><td>Comprueba si todos los elementos de una lista especificada existen en un campo ARRAY.</td></tr>
<tr><td><a href="/docs/es/v2.6.x/array-operators.md#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(identificador, expr)</a></td><td>Expresión de filtro</td><td>Comprueba si algún elemento de una lista especificada existe en un campo ARRAY.</td></tr>
<tr><td><a href="/docs/es/v2.6.x/array-operators.md#ARRAYLENGTH">ARRAY_LENGTH(identificador)</a></td><td>Expresión de filtro</td><td>Devuelve el número de elementos de un campo ARRAY y puede combinarse con operadores de comparación para filtrar.</td></tr>
<tr><td><a href="/docs/es/v2.6.x/array-operators.md#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> con <code translate="no">field_ops</code></td><td>Añade elementos de carga útil a un campo ARRAY ya existente. Disponible en Milvus v2.6.17 y versiones posteriores.</td></tr>
<tr><td><a href="/docs/es/v2.6.x/array-operators.md#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> con <code translate="no">field_ops</code></td><td>Elimina de un campo ARRAY existente todos los elementos que coincidan con un valor de la carga útil de la solicitud. Disponible en Milvus v2.6.17 y versiones posteriores.</td></tr>
</tbody>
</table>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador « <code translate="no">ARRAY_CONTAINS</code> » comprueba si un elemento específico existe en un campo ARRAY. Resulta útil cuando se desea encontrar entidades en las que un elemento determinado esté presente en el ARRAY.</p>
<p><strong>Ejemplo</strong></p>
<p>Supongamos que tienes un campo de matriz <code translate="no">history_temperatures</code>, que contiene las temperaturas mínimas registradas en diferentes años. Para encontrar todas las entidades en las que la matriz contenga el valor <code translate="no">23</code>, puedes utilizar la siguiente expresión de filtro:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto devolverá todas las entidades en las que el array « <code translate="no">history_temperatures</code> » contenga el valor « <code translate="no">23</code> ».</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador « <code translate="no">ARRAY_CONTAINS_ALL</code> » garantiza que todos los elementos de la lista especificada estén presentes en el campo de matriz. Este operador resulta útil cuando se desea encontrar entidades que contengan varios valores en la matriz.</p>
<p><strong>Ejemplo</strong></p>
<p>Si desea encontrar todas las entidades en las que el array « <code translate="no">history_temperatures</code> » contenga tanto « <code translate="no">23</code> » como « <code translate="no">24</code> », puede utilizar:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto devolverá todas las entidades en las que el array ` <code translate="no">history_temperatures</code> ` contenga ambos valores especificados.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador ` <code translate="no">ARRAY_CONTAINS_ANY</code> ` comprueba si alguno de los elementos de la lista especificada está presente en el campo de matriz. Esto resulta útil cuando se desea encontrar entidades que contengan al menos uno de los valores especificados en la matriz.</p>
<p><strong>Ejemplo</strong></p>
<p>Para encontrar todas las entidades en las que el array ` <code translate="no">history_temperatures</code> ` contenga « <code translate="no">23</code> » o « <code translate="no">24</code> », puedes utilizar:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto devolverá todas las entidades en las que el array ` <code translate="no">history_temperatures</code> ` contenga al menos uno de los valores ` <code translate="no">23</code> ` o ` <code translate="no">24</code>`.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p>La función ` <code translate="no">ARRAY_LENGTH</code> ` devuelve la longitud (número de elementos) de un campo de matriz. Acepta exactamente un parámetro: el identificador del campo de matriz.</p>
<p><strong>Ejemplo</strong></p>
<p>Para encontrar todas las entidades en las que el array « <code translate="no">history_temperatures</code> » tenga menos de 10 elementos:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto devolverá todas las entidades en las que el array « <code translate="no">history_temperatures</code> » tenga menos de 10 elementos.</p>
<h2 id="ARRAYAPPEND--Milvus-2617+" class="common-anchor-header">ARRAY_APPEND<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYAPPEND--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador ` <code translate="no">ARRAY_APPEND</code> ` añade elementos de carga útil a un campo `ARRAY` existente durante una solicitud ` <code translate="no">upsert</code> `. No es una expresión de filtro. Úsalo cuando quieras añadir valores a un array sin consultar primero el valor actual del mismo.</p>
<p>El siguiente ejemplo en Python añade « <code translate="no">&quot;premium&quot;</code> » al campo ARRAY de « <code translate="no">tags</code> » de la entidad cuya clave primaria es « <code translate="no">1</code> »:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Al añadir « <code translate="no">ARRAY_APPEND</code> » a un campo mediante « <code translate="no">field_ops</code> », se habilita la semántica de actualización parcial para ese campo. Para conocer el flujo de trabajo completo, los tipos de elementos admitidos y los límites, consulta <a href="/docs/es/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">«Upsert de campos ARRAY con operadores de actualización parcial</a>».</p>
<h2 id="ARRAYREMOVE--Milvus-2617+" class="common-anchor-header">ARRAY_REMOVE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYREMOVE--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p>El operador « <code translate="no">ARRAY_REMOVE</code> » elimina todos los elementos de un campo ARRAY existente que coincidan con un valor de la carga útil de la solicitud durante una solicitud de « <code translate="no">upsert</code> ». No se trata de una expresión de filtro. Utilízalo cuando desees eliminar valores coincidentes de una matriz sin consultar primero el valor actual de la matriz.</p>
<p>El siguiente ejemplo en Python elimina « <code translate="no">&quot;trial&quot;</code> » del campo ARRAY « <code translate="no">tags</code> » de la entidad cuya clave primaria es « <code translate="no">1</code> »:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Al asociar « <code translate="no">ARRAY_REMOVE</code> » a un campo mediante « <code translate="no">field_ops</code> », se habilita la semántica de actualización parcial para ese campo. Para conocer el flujo de trabajo completo, los tipos de elementos admitidos y los límites, consulta <a href="/docs/es/v2.6.x/upsert-entities.md#Upsert-ARRAY-fields-with-partial-update-operators">«Campos ARRAY de Upsert con operadores de actualización parcial</a>».</p>
