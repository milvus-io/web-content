---
id: inverted.md
title: INVERTIDO
summary: >-
  El índice INVERTIDO de Milvus está diseñado para acelerar las consultas de
  filtrado tanto en campos escalares como en campos JSON estructurados. Al
  asignar términos a los documentos o registros que los contienen, los índices
  invertidos mejoran enormemente el rendimiento de las consultas en comparación
  con las búsquedas de fuerza bruta.
---
<h1 id="INVERTED" class="common-anchor-header">INVERTIDO<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>El índice <code translate="no">INVERTED</code> de Milvus está diseñado para acelerar las consultas de filtrado tanto en campos escalares como en campos JSON estructurados. Al asignar términos a los documentos o registros que los contienen, los índices invertidos mejoran enormemente el rendimiento de las consultas en comparación con las búsquedas de fuerza bruta.</p>
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
    </button></h2><p>Desarrollado por <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, Milvus implementa la indexación invertida para acelerar las consultas de filtrado, especialmente para datos textuales. Funciona de la siguiente manera</p>
<ol>
<li><p><strong>Tokenizar los datos</strong>: Milvus toma sus datos sin procesar (en este ejemplo, dos frases):</p>
<ul>
<li><p><strong>"Milvus es una base de datos vectorial nativa de la nube".</strong></p></li>
<li><p><strong>"Milvus es muy bueno en rendimiento".</strong></p></li>
</ul>
<p>y las descompone en palabras únicas (por ejemplo, <em>Milvus</em>, <em>es</em>, <em>nativa, en, la, nube</em>, <em>vectorial</em>, <em>base, de, datos</em>, <em>muy</em>, <em>buena</em>, <em>en</em>, <em>rendimiento</em>).</p></li>
<li><p><strong>Construir el diccionario de términos</strong>: Estas palabras únicas se almacenan en una lista ordenada llamada <strong>Diccionario</strong> de <strong>Términos</strong>. Este diccionario permite a Milvus comprobar rápidamente si una palabra existe y localizar su posición en el índice.</p></li>
<li><p><strong>Crear la lista invertida</strong>: Para cada palabra del Diccionario de Términos, Milvus mantiene una <strong>Lista</strong> Invertida que muestra qué documentos contienen esa palabra. Por ejemplo, <strong>"Milvus"</strong> aparece en ambas frases, por lo que su lista invertida señala los ID de ambos documentos.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
   </span> <span class="img-wrapper"> <span>Invertida</span> </span></p>
<p>Dado que el diccionario está ordenado, el filtrado basado en términos puede manejarse de forma eficiente. En lugar de escanear todos los documentos, Milvus sólo busca el término en el diccionario y recupera su lista invertida, lo que acelera significativamente las búsquedas y los filtros en grandes conjuntos de datos.</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">Indexar un campo escalar normal<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Para campos escalares como <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong> y <strong>ARRAY</strong>, crear un índice invertido es sencillo. Utilice el método <code translate="no">create_index()</code> con el parámetro <code translate="no">index_type</code> ajustado a <code translate="no">&quot;INVERTED&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">Indexar un campo JSON<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus extiende sus capacidades de indexación a los campos JSON, permitiéndole filtrar eficientemente sobre datos anidados o estructurados almacenados dentro de una única columna. A diferencia de los campos escalares, al indexar un campo JSON debe proporcionar dos parámetros adicionales:</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong> Especifica la clave anidada a indexar.</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong> Define el tipo de datos (por ejemplo, <code translate="no">&quot;varchar&quot;</code>, <code translate="no">&quot;double&quot;</code> o <code translate="no">&quot;bool&quot;</code>) al que se asignará el valor JSON extraído.</p></li>
</ul>
<p>Por ejemplo, considere un campo JSON denominado <code translate="no">metadata</code> con la siguiente estructura:</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>Para crear índices invertidos en rutas JSON específicas, puede utilizar el siguiente enfoque:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Ejemplo Valor</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Nombre del campo JSON en su esquema.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Tipo de índice a crear; actualmente sólo se admite <code translate="no">INVERTED</code> para la indexación de rutas JSON.</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(Opcional) Un nombre de índice personalizado. Especifique nombres diferentes si crea varios índices en el mismo campo JSON.</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>Especifica qué ruta JSON indexar. Puede apuntar a claves anidadas, posiciones de matrices, o ambas (por ejemplo, <code translate="no">metadata["product_info"]["category"]</code> o <code translate="no">metadata["tags"][0]</code>). Si falta la ruta o el elemento de matriz no existe para una fila en particular, esa fila simplemente se omite durante la indexación, y no se arroja ningún error.</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>Tipo de datos al que Milvus convertirá los valores JSON extraídos cuando construya el índice. Valores válidos:</p>
<ul>
<li><p><code translate="no">"bool"</code> o <code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> o <code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> o <code translate="no">"VARCHAR"</code></p>
<p><strong>Nota</strong>: Para valores enteros, Milvus utiliza internamente double para el índice. Los enteros grandes por encima de 2^53 pierden precisión. Si la conversión falla (debido a un desajuste de tipo), no se lanza ningún error, y el valor de esa fila no se indexa.</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">Consideraciones sobre la indexación JSON<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
<li><p><strong>Lógica de filtrado</strong>:</p>
<ul>
<li><p>Si <strong>crea un índice de tipo doble</strong> (<code translate="no">json_cast_type=&quot;double&quot;</code>), sólo las condiciones de filtro de tipo numérico pueden utilizar el índice. Si el filtro compara un índice doble con una condición no numérica, Milvus vuelve a la búsqueda por fuerza bruta.</p></li>
<li><p>Si <strong>crea un índice de tipo varchar</strong> (<code translate="no">json_cast_type=&quot;varchar&quot;</code>), sólo las condiciones de filtro de tipo cadena pueden utilizar el índice. En caso contrario, Milvus vuelve a la fuerza bruta.</p></li>
<li><p>La indexación<strong>booleana</strong> se comporta de forma similar a la de tipo varchar.</p></li>
</ul></li>
<li><p><strong>Expresiones de términos</strong>:</p>
<ul>
<li>Puede utilizar <code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code>. Sin embargo, el índice sólo funciona para valores escalares almacenados en esa ruta. Si <code translate="no">json[&quot;field&quot;]</code> es una matriz, la consulta vuelve a la fuerza bruta (aún no se admite la indexación de tipo matriz).</li>
</ul></li>
<li><p><strong>Precisión numérica</strong>:</p>
<ul>
<li>Internamente, Milvus indexa todos los campos numéricos como dobles. Si un valor numérico supera <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2532^{53}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53</span></span></span></span></span></span></span></span></span></span></span></span>, pierde precisión, y las consultas sobre esos valores fuera de rango pueden no coincidir exactamente.</li>
</ul></li>
<li><p><strong>Integridad de los datos</strong>:</p>
<ul>
<li>Milvus no analiza ni transforma claves JSON más allá de su reparto especificado. Si los datos de origen son inconsistentes (por ejemplo, algunas filas almacenan una cadena para la clave <code translate="no">&quot;k&quot;</code> mientras que otras almacenan un número), algunas filas no serán indexadas.</li>
</ul></li>
</ul>
