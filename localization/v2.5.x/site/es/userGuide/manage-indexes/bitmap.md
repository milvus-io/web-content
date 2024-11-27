---
id: bitmap.md
title: BITMAP
related_key: bitmap
summary: >-
  La indexación de mapas de bits es una técnica de indexación eficiente diseñada
  para mejorar el rendimiento de las consultas en campos escalares de baja
  cardinalidad.
---
<h1 id="BITMAP​" class="common-anchor-header">BITMAP<button data-href="#BITMAP​" class="anchor-icon" translate="no">
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
    </button></h1><p>La indexación por mapa de bits es una técnica de indexación eficaz diseñada para mejorar el rendimiento de las consultas en campos escalares de baja cardinalidad. La cardinalidad se refiere al número de valores distintos de un campo. Los campos con menos elementos distintos se consideran de baja cardinalidad.</p>
<p>Este tipo de índice ayuda a reducir el tiempo de recuperación de las consultas escalares representando los valores del campo en un formato binario compacto y realizando operaciones bit a bit eficientes sobre ellos. En comparación con otros tipos de índices, los índices de mapa de bits suelen tener una mayor eficiencia de espacio y una mayor velocidad de consulta cuando se trata de campos de baja cardinalidad.</p>
<h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>El término mapa de bits combina dos palabras: <strong>Bit</strong> y <strong>Mapa</strong>. Un bit representa la unidad más pequeña de datos en un ordenador, que sólo puede contener un valor de <strong>0</strong> ó <strong>1</strong>. Un mapa, en este contexto, se refiere al proceso de transformación y organización de los datos según el valor que deba asignarse a 0 y 1.</p>
<p>Un índice de mapa de bits consta de dos componentes principales: mapas de bits y claves. Las claves representan los valores únicos del campo indexado. A cada valor único le corresponde un mapa de bits. La longitud de estos mapas de bits es igual al número de registros de la colección. Cada bit del mapa de bits corresponde a un registro de la colección. Si el valor del campo indexado de un registro coincide con la clave, el bit correspondiente se pone a <strong>1</strong>; en caso contrario, se pone a <strong>0</strong>.</p>
<p>Consideremos una colección de documentos con los campos <strong>Categoría</strong> y <strong>Público</strong>. Queremos recuperar los documentos que pertenecen a la categoría <strong>Técnica</strong> y están abiertos al <strong>Público</strong>. En este caso, las claves de nuestros índices de mapa de bits son <strong>Tech</strong> y <strong>Public</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/bitmap.png" alt="Bitmap indexing" class="doc-image" id="bitmap-indexing" />
   </span> <span class="img-wrapper"> <span>Indexación por mapa de bits</span> </span></p>
<p>Como se muestra en la figura, los índices de mapa de bits para <strong>Categoría</strong> y <strong>Público</strong> son.</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0], que muestra que sólo el primer y el tercer documento pertenecen a la categoría <strong>Tech</strong>.</p></li>
<li><p><strong>Público</strong>: [1, 0, 0, 1, 0], que muestra que sólo los documentos 1º y 4º están abiertos al <strong>Público</strong>.</p></li>
</ul>
<p>Para encontrar los documentos que cumplen ambos criterios, realizamos una operación AND a nivel de bits en estos dos mapas de bits.</p>
<ul>
<li><strong>Tech</strong> AND <strong>Public</strong>: [1, 0, 0, 0, 0]</li>
</ul>
<p>El mapa de bits resultante [1, 0, 0, 0, 0] indica que sólo el primer documento<strong>(ID</strong> <strong>1</strong>) cumple ambos criterios. Utilizando índices de mapa de bits y operaciones bit a bit eficientes, podemos limitar rápidamente el ámbito de búsqueda, eliminando la necesidad de escanear todo el conjunto de datos.</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">Crear un índice de mapa de bits<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Para crear un índice de mapa de bits en Milvus, utilice el método <code translate="no">create_index()</code> y establezca el parámetro <code translate="no">index_type</code> en <code translate="no">&quot;BITMAP&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed​</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created​</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created​</span>
)​
​
client.create_index(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name​</span>
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>En este ejemplo, creamos un índice de mapa de bits en el campo <code translate="no">category</code> de la colección <code translate="no">my_collection</code>. El método <code translate="no">add_index()</code> se utiliza para especificar el nombre del campo, el tipo de índice y el nombre del índice.</p>
<p>Una vez creado el índice de mapa de bits, puede utilizar el parámetro <code translate="no">filter</code> en las operaciones de consulta para realizar un filtrado escalar basado en el campo indexado. Esto permite limitar de forma eficaz los resultados de búsqueda utilizando el índice de mapa de bits. Para obtener más información, consulte <a href="/docs/es/boolean.md">Filtrado de metadatos</a>.</p>
<h2 id="Limits" class="common-anchor-header">Límites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Los índices de mapa de bits sólo se admiten para campos escalares que no sean claves primarias.</p></li>
<li><p>El tipo de datos del campo debe ser uno de los siguientes.</p>
<ul>
<li><p><code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (los elementos deben ser uno de los siguientes: <code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code>)</p></li>
</ul></li>
<li><p>Los índices de mapa de bits no admiten los siguientes tipos de datos.</p>
<ul>
<li><p><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>: Los tipos de coma flotante no son compatibles con la naturaleza binaria de los índices de mapa de bits.</p></li>
<li><p><code translate="no">JSON</code>: Los tipos de datos JSON tienen una estructura compleja que no puede representarse eficazmente mediante índices de mapa de bits.</p></li>
</ul></li>
<li><p>Los índices de mapa de bits no son adecuados para campos con alta cardinalidad (es decir, campos con un gran número de valores distintos).</p>
<ul>
<li><p>Como norma general, los índices de mapa de bits son más eficaces cuando la cardinalidad de un campo es inferior a 500. Cuando la cardinalidad aumenta por encima de este valor, los índices de mapa de bits son más eficaces.</p></li>
<li><p>Cuando la cardinalidad supera este umbral, las ventajas de rendimiento de los índices de mapa de bits disminuyen y la sobrecarga de almacenamiento se vuelve significativa.</p></li>
<li><p>Para campos de cardinalidad alta, considere el uso de técnicas de indexación alternativas, como los índices invertidos, en función de su caso de uso específico y de los requisitos de consulta.</p></li>
</ul></li>
</ul>
