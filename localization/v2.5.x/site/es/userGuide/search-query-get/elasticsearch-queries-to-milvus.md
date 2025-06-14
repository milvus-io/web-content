---
id: elasticsearch-queries-to-milvus.md
title: Consultas de Elasticsearch a Milvus
summary: >-
  Elasticsearch, basado en Apache Lucene, es uno de los principales motores de
  búsqueda de código abierto. Sin embargo, se enfrenta a retos en las
  aplicaciones modernas de IA, como los altos costes de actualización, el bajo
  rendimiento en tiempo real, la gestión ineficiente de fragmentos, un diseño no
  nativo de la nube y una demanda excesiva de recursos. Como base de datos
  vectorial nativa de la nube, Milvus supera estos problemas con almacenamiento
  y computación desacoplados, indexación eficiente para datos de alta dimensión
  e integración perfecta con infraestructuras modernas. Ofrece un rendimiento y
  una escalabilidad superiores para cargas de trabajo de IA.
---

<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">Consultas de Elasticsearch a Milvus<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Elasticsearch, basado en Apache Lucene, es uno de los principales motores de búsqueda de código abierto. Sin embargo, se enfrenta a retos en las aplicaciones modernas de IA, como los altos costes de actualización, el bajo rendimiento en tiempo real, la gestión ineficaz de fragmentos, un diseño no nativo de la nube y una demanda excesiva de recursos. Como base de datos vectorial nativa de la nube, Milvus supera estos problemas con almacenamiento y computación desacoplados, indexación eficiente para datos de alta dimensión e integración perfecta con infraestructuras modernas. Ofrece un rendimiento y una escalabilidad superiores para cargas de trabajo de IA.</p>
<p>Este artículo tiene como objetivo facilitar la migración de su base de código de Elasticsearch a Milvus, proporcionando varios ejemplos de conversión de consultas en el medio.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>En Elasticsearch, las operaciones en el contexto de consulta generan puntuaciones de relevancia, mientras que las del contexto de filtro no. Del mismo modo, las búsquedas Milvus producen puntuaciones de similitud, mientras que sus consultas de tipo filtro no lo hacen. Al migrar su base de código de Elasticsearch a Milvus, el principio clave es convertir los campos utilizados en el contexto de consulta de Elasticsearch en campos vectoriales para permitir la generación de puntuaciones de similitud.</p>
<p>La siguiente tabla describe algunos patrones de consulta de Elasticsearch y sus correspondientes equivalentes en Milvus.</p>
<table>
   <tr>
     <th><p>Consultas Elasticsearch</p></th>
     <th><p>Equivalentes en Milvus</p></th>
     <th><p>Observaciones</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Consultas de texto completo</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/v2.5.x/elasticsearch-queries-to-milvus.md#Match-query">Consulta de coincidencia</a></p></td>
     <td><p>Búsqueda de texto completo</p></td>
     <td><p>Ambas ofrecen funciones similares.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Consultas a nivel de término</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/v2.5.x/elasticsearch-queries-to-milvus.md#IDs">ID</a></p></td>
     <td><p><code translate="no">in</code> operador</p></td>
     <td rowspan="6"><p>Ambos proporcionan el mismo o similar conjunto de capacidades cuando estas consultas Elasticsearch se utilizan en el contexto de filtro.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/v2.5.x/elasticsearch-queries-to-milvus.md#Prefix-query">Consulta de prefijo</a></p></td>
     <td><p><code translate="no">like</code> operador</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/v2.5.x/elasticsearch-queries-to-milvus.md#Range-query">Consulta de rango</a></p></td>
     <td><p>Operadores de comparación como <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, y <code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/v2.5.x/elasticsearch-queries-to-milvus.md#Term-query">Consulta de términos</a></p></td>
     <td><p>Operadores de comparación como <code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/v2.5.x/elasticsearch-queries-to-milvus.md#Terms-query">Consulta de términos</a></p></td>
     <td><p><code translate="no">in</code> operador</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/v2.5.x/elasticsearch-queries-to-milvus.md#Wildcard-query">Consulta con comodín</a></p></td>
     <td><p><code translate="no">like</code> operador</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/v2.5.x/elasticsearch-queries-to-milvus.md#Boolean-query">Consulta booleana</a></p></td>
     <td><p>Operadores lógicos como <code translate="no">AND</code></p></td>
     <td><p>Ambos ofrecen funciones similares cuando se utilizan en el contexto de un filtro.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Consultas vectoriales</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/v2.5.x/elasticsearch-queries-to-milvus.md#Knn-query">Consulta kNN</a></p></td>
     <td><p>Búsqueda</p></td>
     <td><p>Milvus proporciona capacidades de búsqueda vectorial más avanzadas.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/v2.5.x/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">Fusión recíproca de rangos</a></p></td>
     <td><p>Búsqueda híbrida</p></td>
     <td><p>Milvus admite múltiples estrategias de reordenación.</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">Consultas de texto completo<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>En Elasticsearch, las consultas de texto completo permiten buscar en campos de texto analizados, como el cuerpo de un correo electrónico. La cadena de consulta se procesa utilizando el mismo analizador que se aplicó al campo durante la indexación.</p>
<h3 id="Match-query" class="common-anchor-header">Consulta de coincidencia</h3><p>En Elasticsearch, una consulta de coincidencia devuelve documentos que coinciden con un texto, número, fecha o valor booleano proporcionado. El texto proporcionado se analiza antes de realizar la coincidencia.</p>
<p>A continuación se muestra un ejemplo de solicitud de búsqueda en Elasticsearch con una consulta de coincidencia.</p>
<pre><code translate="no" class="language-bash">resp = client.search(
    query={
        <span class="hljs-string">&quot;match&quot;</span>: {
            <span class="hljs-string">&quot;message&quot;</span>: {
                <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;this is a test&quot;</span>
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>

<p>Milvus proporciona la misma capacidad a través de la función de búsqueda de texto completo. Puede convertir la consulta de Elasticsearch anterior en Milvus de la siguiente manera:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>En el ejemplo anterior, <code translate="no">message_sparse</code> es un campo vectorial disperso derivado de un campo VarChar llamado <code translate="no">message</code>. Milvus utiliza el modelo de incrustación BM25 para convertir los valores del campo <code translate="no">message</code> en incrustaciones de vectores dispersos y los almacena en el campo <code translate="no">message_sparse</code>. Al recibir la petición de búsqueda, Milvus incrusta la carga útil de la consulta en texto plano utilizando el mismo modelo BM25 y realiza una búsqueda de vectores dispersos y devuelve los campos <code translate="no">id</code> y <code translate="no">message</code> especificados en el parámetro <code translate="no">output_fields</code> junto con las puntuaciones de similitud correspondientes.</p>
<p>Para utilizar esta funcionalidad, debe activar el analizador en el campo <code translate="no">message</code> y definir una función para derivar el campo <code translate="no">message_sparse</code> a partir de él. Para obtener instrucciones detalladas sobre cómo habilitar el analizador y crear la función derivada en Milvus, consulte <a href="/docs/es/v2.5.x/full-text-search.md">Búsqueda de texto completo</a>.</p>
<h2 id="Term-level-queries" class="common-anchor-header">Consultas a nivel de término<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>En Elasticsearch, las consultas a nivel de término se utilizan para encontrar documentos basados en valores exactos en datos estructurados, como intervalos de fechas, direcciones IP, precios o ID de productos. Esta sección describe los posibles equivalentes de algunas consultas a nivel de término de Elasticsearch en Milvus. Todos los ejemplos de esta sección están adaptados para operar dentro del contexto del filtro para alinearse con las capacidades de Milvus.</p>
<h3 id="IDs" class="common-anchor-header">IDs</h3><p>En Elasticsearch, puede encontrar documentos basándose en sus IDs en el contexto de filtrado como se indica a continuación:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;ids&quot;</span>: {
                    <span class="hljs-string">&quot;values&quot;</span>: [
                        <span class="hljs-string">&quot;1&quot;</span>,
                        <span class="hljs-string">&quot;4&quot;</span>,
                        <span class="hljs-string">&quot;100&quot;</span>
                    ]
                }            
            }
        }
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>En Milvus, también puede encontrar entidades basadas en sus IDs como sigue:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the filter parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [1, 4, 100]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-comment"># Use the ids parameter</span>
res = client.query(
collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
ids=[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">100</span>],
output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>

<p>Puede encontrar el ejemplo de Elasticsearch en <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">esta página</a>. Para más detalles sobre las peticiones query y get así como las expresiones de filtrado en Milvus, consulte <a href="/docs/es/v2.5.x/get-and-scalar-query.md">Consulta</a> y <a href="/docs/es/v2.5.x/filtering">filtrado</a>.</p>
<h3 id="Prefix-query" class="common-anchor-header">Consulta de prefijo</h3><p>En Elasticsearch, puede encontrar documentos que contengan un prefijo específico en un campo proporcionado en el contexto de filtrado de la siguiente manera:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                 <span class="hljs-string">&quot;prefix&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki&quot;</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>

<p>En Milvus, puede encontrar las entidades cuyos valores comienzan con el prefijo especificado de la siguiente manera:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Puede encontrar el ejemplo de Elasticsearch en <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">esta página</a>. Para más detalles sobre el operador <code translate="no">like</code> en Milvus, consulte <a href="/docs/es/v2.5.x/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">Uso </a><a href="/docs/es/v2.5.x/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> de</a><code translate="no">LIKE</code><a href="/docs/es/v2.5.x/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> para la concordancia de patrones</a>.</p>
<h3 id="Range-query" class="common-anchor-header">Consulta de rango</h3><p>En Elasticsearch, puede encontrar documentos que contengan términos dentro de un rango proporcionado como sigue:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;range&quot;</span>: {
                    <span class="hljs-string">&quot;age&quot;</span>: {
                        <span class="hljs-string">&quot;gte&quot;</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">&quot;lte&quot;</span>: <span class="hljs-number">20</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>

<p>En Milvus, puede encontrar las entidades cuyos valores en un campo específico están dentro de un rango proporcionado de la siguiente manera:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Puede encontrar el ejemplo de Elasticsearch en <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">esta página</a>. Para más detalles sobre los operadores de comparación en Milvus, consulte <a href="/docs/es/v2.5.x/basic-operators.md#Comparison-operators">Operadores de comparación</a>.</p>
<h3 id="Term-query" class="common-anchor-header">Consulta de términos</h3><p>En Elasticsearch, puede encontrar documentos que contengan un término <strong>exacto</strong> en un campo proporcionado como sigue:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;status&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;retired&quot;</span>
                    }
                }            
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>

<p>En Milvus, puede encontrar las entidades cuyos valores en el campo especificado son exactamente el término especificado como sigue:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use ==</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status==&quot;retired&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(status, &quot;retired&quot;)&#x27;</span>,
output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>

<p>Puede encontrar el ejemplo de Elasticsearch en <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">esta página</a>. Para más detalles sobre los operadores de comparación en Milvus, consulte <a href="/docs/es/v2.5.x/basic-operators.md#Comparison-operators">Operadores de comparación</a>.</p>
<h3 id="Terms-query" class="common-anchor-header">Consulta de términos</h3><p>En Elasticsearch, puede encontrar documentos que contengan uno o más términos <strong>exactos</strong> en un campo proporcionado de la siguiente manera:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;terms&quot;</span>: {
                    <span class="hljs-string">&quot;degree&quot;</span>: [
                        <span class="hljs-string">&quot;graduate&quot;</span>,
                        <span class="hljs-string">&quot;post-graduate&quot;</span>
                    ]
                }        
            }
        }
    }
)

<button class="copy-code-btn"></button></code></pre>

<p>Milvus no tiene una equivalencia completa de éste. Sin embargo, puede encontrar las entidades cuyos valores en el campo especificado sean uno de los términos especificados de la siguiente manera:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use in</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;degree in [&quot;graduate&quot;, &quot;post-graduate&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(degree, &quot;graduate post-graduate&quot;)&#x27;</span>,
output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>

<p>Puede encontrar el ejemplo de Elasticsearch en <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">esta página</a>. Para más detalles sobre los operadores de rango en Milvus, consulte <a href="/docs/es/v2.5.x/basic-operators.md#Range-operators">Operadores de rango</a>.</p>
<h3 id="Wildcard-query" class="common-anchor-header">Consulta comodín</h3><p>En Elasticsearch, puede encontrar documentos que contengan términos que coincidan con un patrón comodín de la siguiente manera:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;wildcard&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki*y&quot;</span>
                    }
                }          
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>

<p>Milvus no admite comodines en sus condiciones de filtrado. Sin embargo, puede utilizar el operador <code translate="no">like</code> para conseguir un efecto similar como se indica a continuación:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Puede encontrar el ejemplo de Elasticsearch en <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">esta página</a>. Para más detalles sobre los operadores de rango en Milvus, consulte <a href="/docs/es/v2.5.x/basic-operators.md#Range-operators">Operadores de rango</a>.</p>
<h2 id="Boolean-query" class="common-anchor-header">Consulta booleana<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>En Elasticsearch, una consulta booleana es una consulta que busca documentos que coincidan con combinaciones booleanas de otras consultas.</p>
<p>El siguiente ejemplo está adaptado de un ejemplo en la documentación de Elasticsearch en <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">esta página</a>. La consulta devolverá usuarios con <code translate="no">kimchy</code> en sus nombres con una etiqueta <code translate="no">production</code>.</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;kimchy&quot;</span>
                }
            },
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>
                }
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>

<p>En Milvus, puede hacer algo similar de la siguiente manera:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> =

res = client.query(
collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>

<p>El ejemplo anterior supone que tiene un campo <code translate="no">user</code> del tipo <strong>VarChar</strong> y un campo <code translate="no">tags</code> del tipo <strong>Array</strong>, en la colección de destino. La consulta devolverá los usuarios con <code translate="no">kimchy</code> en sus nombres con una etiqueta <code translate="no">production</code>.</p>
<h2 id="Vector-queries" class="common-anchor-header">Consultas vectoriales<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>En Elasticsearch, las consultas vectoriales son consultas especializadas que trabajan sobre campos vectoriales para realizar búsquedas semánticas de forma eficiente.</p>
<h3 id="Knn-query" class="common-anchor-header">Consulta Knn</h3><p>Elasticsearch admite tanto consultas kNN aproximadas como consultas kNN exactas de fuerza bruta. Puede encontrar los <em>k</em> vectores más cercanos a un vector de consulta de cualquiera de las dos formas, medidos por una métrica de similitud, como se indica a continuación:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    index=<span class="hljs-string">&quot;my-image-index&quot;</span>,
    size=<span class="hljs-number">3</span>,
    query={
        <span class="hljs-string">&quot;knn&quot;</span>: {
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;image-vector&quot;</span>,
            <span class="hljs-string">&quot;query_vector&quot;</span>: [
                -<span class="hljs-number">5</span>,
                <span class="hljs-number">9</span>,
                -<span class="hljs-number">12</span>
            ],
            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">10</span>
        }
    },
)

<button class="copy-code-btn"></button></code></pre>

<p>Milvus, como base de datos especializada en vectores, utiliza tipos de índice para optimizar las búsquedas de vectores. Normalmente, da prioridad a la búsqueda aproximada del vecino más cercano (kNN) para datos vectoriales de alta dimensión. Aunque la búsqueda kNN de fuerza bruta con el tipo de índice FLAT ofrece resultados precisos, consume mucho tiempo y recursos. Por el contrario, la búsqueda RNA con AUTOINDEX u otros tipos de índice equilibra velocidad y precisión, ofreciendo un rendimiento significativamente más rápido y más eficiente en recursos que kNN.</p>
<p>Una equivalencia similar a la consulta vectorial anterior en Mlivus es la siguiente:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Puede encontrar el ejemplo de Elasticsearch en <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">esta página</a>. Para más detalles sobre las búsquedas ANN en Milvus, lea <a href="/docs/es/v2.5.x/single-vector-search.md">Búsqueda ANN básica</a>.</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">Fusión de rango recíproco</h3><p>Elasticsearch proporciona la Fusión de Rango Recíproco (RRF) para combinar múltiples conjuntos de resultados con diferentes indicadores de relevancia en un único conjunto de resultados clasificados.</p>
<p>El siguiente ejemplo muestra la combinación de una búsqueda tradicional basada en términos con una búsqueda vectorial k-nearest neighbors (kNN) para mejorar la relevancia de la búsqueda:</p>
<pre><code translate="no" class="language-python">client.search(
    index=<span class="hljs-string">&quot;my_index&quot;</span>,
    size=<span class="hljs-number">10</span>,
    query={
        <span class="hljs-string">&quot;retriever&quot;</span>: {
            <span class="hljs-string">&quot;rrf&quot;</span>: {
                <span class="hljs-string">&quot;retrievers&quot;</span>: [
                    {
                        <span class="hljs-string">&quot;standard&quot;</span>: {
                            <span class="hljs-string">&quot;query&quot;</span>: {
                                <span class="hljs-string">&quot;term&quot;</span>: {
                                    <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;shoes&quot;</span>
                                }
                            }
                        }
                    },
                    {
                        <span class="hljs-string">&quot;knn&quot;</span>: {
                            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
                            <span class="hljs-string">&quot;query_vector&quot;</span>: [<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>],  <span class="hljs-comment"># Example vector; replace with your actual query vector</span>
                            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">50</span>,
                            <span class="hljs-string">&quot;num_candidates&quot;</span>: <span class="hljs-number">100</span>
                        }
                    }
                ],
                <span class="hljs-string">&quot;rank_window_size&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;rank_constant&quot;</span>: <span class="hljs-number">20</span>
            }
        }
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>En este ejemplo, RRF combina los resultados de dos recuperadores:</p>
<ul>
<li><p>Una búsqueda estándar basada en términos de documentos que contengan el término <code translate="no">&quot;shoes&quot;</code> en el campo <code translate="no">text</code>.</p></li>
<li><p>Una búsqueda kNN en el campo <code translate="no">vector</code> utilizando el vector de consulta proporcionado.</p></li>
</ul>
<p>Cada recuperador aporta hasta 50 coincidencias principales, que RRF vuelve a clasificar, y devuelve los 10 resultados finales más importantes.</p>
<p>En Milvus, puede conseguir una búsqueda híbrida similar combinando búsquedas en múltiples campos vectoriales, aplicando una estrategia de renumeración y recuperando los resultados top-K de la lista combinada. Milvus admite las estrategias RRF y weighted reranker. Para más detalles, consulte <a href="/docs/es/v2.5.x/reranking.md">Reranking</a>.</p>
<p>Lo siguiente es una equivalencia no estricta del ejemplo anterior de Elasticsearch en Milvus.</p>
<pre><code translate="no" class="language-python">search_params_dense = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}, 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">100</span>
}

req_dense = ANNSearchRequest(\*\*search_params_dense)

search_params_sparse = {
<span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;shoes&quot;</span>],
<span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
<span class="hljs-string">&quot;param&quot;</span>: {
<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}
}
}

req_sparse = ANNSearchRequest(\*\*search_params_sparse)

res = client.hybrid_search(
collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
reqs=[req_dense, req_sparse],
reranker=RRFRanker(),
limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>

<p>Este ejemplo demuestra una búsqueda híbrida en Milvus que combina:</p>
<ol>
<li><p><strong>Búsqueda vectorial densa</strong>: Uso de la métrica del producto interior (PI) con <code translate="no">nprobe</code> establecido en 10 para la búsqueda aproximada del vecino más cercano (RNA) en el campo <code translate="no">vector</code>.</p></li>
<li><p><strong>Búsqueda de vectores dispersos</strong>: Utilizando la métrica de similitud BM25 con un parámetro <code translate="no">drop_ratio_search</code> de 0,2 en el campo <code translate="no">text_sparse</code>.</p></li>
</ol>
<p>Los resultados de estas búsquedas se ejecutan por separado, se combinan y se vuelven a clasificar utilizando el clasificador Reciprocal Rank Fusion (RRF). La búsqueda híbrida devuelve las 10 entidades más importantes de la lista reordenada.</p>
<p>A diferencia del clasificador RRF de Elasticsearch, que combina resultados de consultas estándar basadas en texto y búsquedas kNN, Milvus combina resultados de búsquedas de vectores dispersos y densos, proporcionando una capacidad de búsqueda híbrida única optimizada para datos multimodales.</p>
<h2 id="Recap" class="common-anchor-header">Recapitulación<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>En este artículo, hemos cubierto las conversiones de consultas típicas de Elasticsearch a sus equivalentes en Milvus, incluyendo consultas a nivel de término, consultas booleanas, consultas de texto completo y consultas vectoriales. Si tiene más preguntas sobre la conversión de otras consultas de Elasticsearch, no dude en ponerse en contacto con nosotros.</p>
