---
id: search_with_svs_vamana.md
summary: >-
  Crea y realiza búsquedas en índices de grafos SVS Vamana en memoria en Milvus
  a través del paso de índice FAISS, con compresión opcional LeanVec o LVQ en
  CPUs Intel.
title: Búsqueda con SVS Vamana y Milvus
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">Búsqueda con SVS Vamana y Milvus<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">SVS</a> (Scalable Vector Search) es la biblioteca de búsqueda vectorial de alto rendimiento de Intel que implementa el algoritmo de grafos Vamana. En Milvus, se accede a SVS Vamana a través del <a href="https://milvus.io/docs/faiss.md">paso de índice de FAISS</a>: configura <code translate="no">index_type</code> en <code translate="no">FAISS</code> y proporciona una cadena de fábrica de índices <code translate="no">SVSVamana</code>, y Milvus crea y busca en el índice a través de la integración de SVS de FAISS.</p>
<p>Vamana es la estructura de grafos que también utiliza <a href="https://milvus.io/docs/diskann.md">DISKANN</a>, pero SVS Vamana mantiene todo el grafo en memoria. También puede comprimir vectores con <strong>LeanVec</strong> o <strong>LVQ</strong>, lo que reduce el uso de memoria y acelera la búsqueda sin dejar de alcanzar una recuperación muy alta.</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 o posterior, compilado desde el código fuente con SVS habilitado</li>
<li>PyMilvus 3.0.0 o posterior</li>
<li>Una CPU Intel si se utiliza un almacenamient <code translate="no">LVQ*</code> o o <code translate="no">LeanVec*</code>; los almacenamientos <code translate="no">FP32</code>, <code translate="no">FP16</code> y <code translate="no">SQ8</code> funcionan en cualquier plataforma</li>
<li>Conocimiento de <a href="https://milvus.io/docs/faiss.md">las cadenas de la fábrica de índices de FAISS</a></li>
</ul>
<div class="alert note">
<p>SVS no está incluido en la compilación predeterminada de Milvus. Para utilizar las fábricas « <code translate="no">SVSVamana</code> », compila Milvus desde el código fuente con « <code translate="no">make USE_SVS=ON</code> ». En una compilación sin SVS, la creación del índice falla porque Faiss no reconoce la cadena de la fábrica.</p>
</div>
<p>La compresión LVQ y LeanVec solo funciona en CPU Intel, y es más rápida en CPU con AVX-512. En otras CPU, la creación del índice falla para las cadenas de fábrica <code translate="no">LVQ*</code> y <code translate="no">LeanVec*</code>.</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">Cómo funciona SVS Vamana<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">Grafo de Vamana<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>SVS Vamana construye un grafo de proximidad de una sola capa. Cada vector es un nodo, y las aristas conectan vectores que probablemente sean vecinos cercanos. Para construir el grafo, SVS realiza lo siguiente para cada nodo <strong>x</strong>:</p>
<ol>
<li><p><strong>Búsqueda codiciosa</strong>: SVS recorre el grafo construido hasta el momento, manteniendo una lista de candidatos de tamaño <code translate="no">construction_window_size</code>.</p></li>
<li><p><strong>Poda de vecinos</strong>: Los nodos visitados se convierten en vecinos candidatos para <strong>x</strong>. SVS los considera en orden de distancia creciente respecto a <strong>x</strong>. Se omite un candidato <code translate="no">c</code> si un vecino más cercano <code translate="no">n</code> que ya se ha conservado cumple <code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code>. Esto mantiene los enlaces de largo alcance y elimina los redundantes de corto alcance, de modo que la búsqueda puede saltar por el grafo en lugar de recorrerlo un vecino más cercano cada vez. La poda se detiene una vez que se alcanza el grado del grafo.</p></li>
<li><p><strong>Aristas inversas</strong>: para cada nuevo vecino de <strong>x</strong>, SVS añade una arista inversa que vuelve a <strong>x</strong> y poda la lista de aristas de ese vecino si supera el grado del grafo.</p></li>
</ol>
<p>La poda se realiza en dos pasadas: primero con <code translate="no">alpha = 1</code> y, a continuación, con el valor configurado de <code translate="no">alpha</code>. Un grado de grafo mayor y un valor de <code translate="no">construction_window_size</code> más alto producen un grafo más denso y de mayor calidad, pero consumen más memoria y tardan más en construirse.</p>
<p>En el momento de la búsqueda, SVS recorre el grafo de forma «glotona», conservando en la « <code translate="no">search_window_size</code> » los candidatos más cercanos vistos hasta el momento. A continuación, siempre explora el candidato más cercano que aún no se ha visitado. La búsqueda finaliza cuando todos los vecinos del nodo actual se encuentran más lejos de la consulta que el peor candidato de la ventana. Un valor mayor de « <code translate="no">search_window_size</code> » explora una mayor parte del grafo, lo que aumenta la recuperación pero también la latencia.</p>
<h3 id="LeanVec-compression" class="common-anchor-header">Compresión LeanVec<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://openreview.net/forum?id=wczqrpOrIc">LeanVec</a> reduce tanto el número de dimensiones por vector como el número de bits por dimensión. Un índice LeanVec mantiene dos representaciones de cada vector:</p>
<ul>
<li><p><strong>Primaria (dimensionalidad reducida)</strong>: una proyección lineal del vector a un número menor de dimensiones. La búsqueda en el grafo se realiza sobre este conjunto de datos primario, por lo que la mayoría de los cálculos de distancia tienen lugar en el espacio de menor dimensionalidad. Esto reduce tanto los requisitos de computación como los de ancho de banda de memoria. Por defecto, la dimensionalidad reducida es la mitad de la dimensionalidad original (<code translate="no">dim / 2</code>).</p></li>
<li><p><strong>Secundaria (dimensionalidad completa)</strong>: el vector en su dimensionalidad original. SVS vuelve a clasificar los candidatos devueltos por la búsqueda en el grafo primario en función de este conjunto de datos secundario para recuperar la precisión perdida debido a la reducción de dimensionalidad.</p></li>
</ul>
<p>Ambas representaciones se cuantifican mediante <a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">LVQ</a> (cuantificación vectorial localmente adaptativa). El componente de almacenamiento de la cadena predeterminada selecciona la codificación. Por ejemplo, <code translate="no">LeanVec4x8</code> utiliza 4 bits por dimensión para el conjunto de datos primario y 8 bits por dimensión para el conjunto de datos secundario. Ni siquiera en la etapa de reordenación se lee nunca un vector de precisión completa.</p>
<p>Por defecto, LeanVec aprende proyecciones independientes para los vectores indexados y para las consultas, con el fin de admitir consultas que provengan de una distribución diferente a la de los vectores indexados (fuera de distribución, u OOD). Esto funciona especialmente bien para cargas de trabajo multimodales, como la recuperación de texto a imagen, y también funciona bien cuando las consultas proceden de la misma distribución que los vectores indexados. Milvus aún no admite una forma de pasar consultas para calcular proyecciones, por lo que actualmente solo se utilizan los vectores base. El entrenamiento OOD aumenta el tiempo de compilación. Para acelerar la compilación a costa de un ligero descenso en el rendimiento de las consultas, configura « <code translate="no">ood_training</code> » en « <code translate="no">False</code> ».</p>
<h3 id="LVQ-compression" class="common-anchor-header">Compresión LVQ<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>Para conjuntos de datos con menos de unas 512 dimensiones, puede resultar más eficaz omitir la reducción de dimensionalidad y comprimir únicamente mediante cuantificación LVQ. Al igual que LeanVec, un índice LVQ mantiene una representación principal para la búsqueda rápida y una representación residual para la reordenación. Por ejemplo, <code translate="no">LVQ4x4</code> utiliza 4 bits para la representación principal y 4 bits para la residual. <code translate="no">LVQ4x0</code> y <code translate="no">LVQ8x0</code> omiten la reordenación, lo que acelera las consultas si su recuperación es lo suficientemente buena para su carga de trabajo.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">Elige una cadena de fábrica<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>Las cadenas de fábrica de SVS Vamana tienen la forma <code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code>, donde <code translate="no">&lt;degree&gt;</code> es el número máximo de aristas por nodo en el grafo.</p>
<table>
<thead>
<tr><th>Cadena de fábrica</th><th>Almacenamiento</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>Vectores sin comprimir.</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>Números flotantes de 16 bits</td><td>La mitad de la memoria de vectores de <code translate="no">FP32</code>, con una pérdida mínima de precisión.</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>Cuantización escalar de 8 bits</td><td>Una cuarta parte de la memoria vectorial de <code translate="no">FP32</code>.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>, <code translate="no">LVQ8x0</code></td><td>LVQ primario, sin residual</td><td>Solo CPUs Intel. Sin reordenación.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>, <code translate="no">LVQ4x8</code></td><td>LVQ primario y residual</td><td>Solo CPU Intel.</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>, <code translate="no">LeanVec4x8</code>, <code translate="no">LeanVec8x8</code></td><td>LeanVec primario y secundario</td><td>solo en CPU Intel. Añade el sufijo « <code translate="no">_&lt;dim&gt;</code> » para establecer la dimensionalidad reducida. Por ejemplo, « <code translate="no">LeanVec4x8_128</code> » reduce el conjunto de datos primario a 128 dimensiones. Sin el sufijo, la dimensionalidad reducida es « <code translate="no">dim / 2</code> ».</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> es un buen punto de partida. A partir de ahí:</p>
<ul>
<li><p>Para obtener <strong>una mayor recuperación</strong> a costa de un mayor consumo de memoria, aumenta la dimensionalidad de LeanVec con el sufijo « <code translate="no">_&lt;dim&gt;</code> ».</p></li>
<li><p>Para <strong>reducir el espacio ocupado</strong> a costa de una menor recuperación, disminuya la dimensionalidad de LeanVec.</p></li>
<li><p>Para vectores de baja dimensionalidad, prueba con « <code translate="no">LVQ8</code> ».</p></li>
<li><p><strong>En CPU que no sean de Intel</strong>, utiliza <code translate="no">FP16</code> o <code translate="no">SQ8</code>.</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">Crea el índice<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo crea un índice SVS Vamana con un grado de grafo de 64 y compresión LeanVec. Expande el bloque de configuración y ejecútalo antes de crear el índice.</p>
<p><details></p>
<p><summary>Prepara la colección</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;svs_vamana_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Establece <code translate="no">index_type</code> en <code translate="no">FAISS</code> y utiliza <code translate="no">faiss_index_name</code> para seleccionar la receta de SVS Vamana.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;svs_vamana_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># SVSVamana64 -&gt; Vamana graph degree 64</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># LeanVec4x8  -&gt; 4-bit primary, 8-bit secondary</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># _128        -&gt; LeanVec dim 128 (omit the suffix for dim / 2)</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;SVSVamana64,LeanVec4x8_128&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;construction_window_size&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># build-time search width</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;ood_training&quot;</span>: <span class="hljs-literal">True</span>,             <span class="hljs-comment"># OOD on (default)</span></span>
<span class="highlighted-comment-line">    },</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-the-index" class="common-anchor-header">Buscar en el índice<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> controla el equilibrio entre la recuperación y la latencia, al igual que lo hace « <code translate="no">ef</code> » para <a href="https://milvus.io/docs/hnsw.md">HNSW</a>. Establece « <code translate="no">search_buffer_capacity</code> » al menos en el mismo valor. El valor predeterminado del índice para ambos es 10, y SVS rechaza una búsqueda cuyo « <code translate="no">search_window_size</code> » sea mayor que su « <code translate="no">search_buffer_capacity</code> ».</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_window_size&quot;</span>: <span class="hljs-number">100</span>,      <span class="hljs-comment"># wider = higher recall, lower QPS</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_buffer_capacity&quot;</span>: <span class="hljs-number">100</span>,  <span class="hljs-comment"># must be &gt;= search_window_size</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

res = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Si <code translate="no">limit</code> es mayor que <code translate="no">search_window_size</code>, SVS amplía la ventana a <code translate="no">limit</code> para esa búsqueda.</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">Parámetros de SVS Vamana<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Los siguientes parámetros de compilación se incluyen en <code translate="no">params</code> en <code translate="no">add_index()</code>, junto a <code translate="no">faiss_index_name</code>. No se pueden modificar una vez creado el índice.</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Valor por defecto</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>Tamaño de la lista de candidatos utilizada para encontrar los vecinos de cada nodo durante la construcción del grafo. Los valores más altos mejoran la calidad del grafo y la recuperación, pero la construcción tarda más tiempo. Establece este valor al menos en el grado del grafo. 200 es una opción habitual.</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> para <code translate="no">L2</code>, <code translate="no">0.95</code> para <code translate="no">IP</code> y <code translate="no">COSINE</code></td><td>Intensidad de poda. Los valores más alejados de 1 realizan una poda más agresiva, favoreciendo los arcos de largo alcance frente a los redundantes de corto alcance. Utiliza valores superiores a 1 para « <code translate="no">L2</code> » e inferiores a 1 para « <code translate="no">IP</code> » y « <code translate="no">COSINE</code> ». Mantén el valor por defecto a menos que hayas medido un valor mejor en tus datos.</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>Grado en la cadena predeterminada o <code translate="no">32</code></td><td>Número máximo de aristas por nodo. Anula el grado de la cadena predeterminada. Los valores en el rango [32, 128] se adaptan a la mayoría de las cargas de trabajo. Los valores más altos pueden aumentar la recuperación, pero consumen más memoria y tardan más en generarse.</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>Grado del grafo menos 4</td><td>Número de aristas que conserva un nodo tras la poda una vez que supera el grado del grafo.</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>Número máximo de candidatos que se tienen en cuenta al podar los vecinos de un nodo. Debe ser mayor que <code translate="no">construction_window_size</code>.</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>Indica si la poda tiene en cuenta todos los nodos visitados durante la búsqueda de construcción, y no solo los candidatos finales.</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> Sufijo de cadena predeterminado o <code translate="no">dim / 2</code></td><td>solo para LeanVec. Dimensionalidad reducida del conjunto de datos principal. Anula el sufijo de cadena predeterminado. Los valores más pequeños reducen el uso de memoria y aceleran la búsqueda en el grafo, pero disminuyen la recuperación.</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> para LeanVec</td><td>Solo para LeanVec. Indica si se deben aprender proyecciones separadas para los vectores indexados y las consultas. Establece <code translate="no">False</code> para compilaciones más rápidas. Establecer <code translate="no">True</code> para cualquier fábrica que no sea LeanVec da error.</td></tr>
</tbody>
</table>
<p>Los siguientes parámetros de búsqueda se incluyen en ` <code translate="no">search_params.params</code>`. También puedes configurarlos como parámetros de compilación, lo que modifica los valores predeterminados que utiliza el índice para las búsquedas en las que no se hayan establecido.</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Valor por defecto</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>Número de candidatos más cercanos que se conservan al recorrer el grafo. Los valores más altos aumentan la recuperación y la latencia.</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>Capacidad del búfer de búsqueda. Debe ser mayor o igual que <code translate="no">search_window_size</code>. En la mayoría de los casos, configúralo igual a <code translate="no">search_window_size</code>. Para LeanVec, prueba con 1,5 veces <code translate="no">search_window_size</code>.</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">Más información<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>Lee la referencia <a href="https://milvus.io/docs/faiss.md">sobre el paso de índices de FAISS</a> para conocer el contrato general de cadenas de fábrica, los límites y la gestión de errores.</li>
<li>Compáralo con la implementación de Vamana en disco de <a href="https://milvus.io/docs/diskann.md">DISKANN</a>.</li>
<li>Consulta el <a href="https://github.com/intel/ScalableVectorSearch">repositorio de SVS</a> para obtener detalles sobre la compilación, el ajuste del rendimiento y la API de C++ subyacente.</li>
</ul>
