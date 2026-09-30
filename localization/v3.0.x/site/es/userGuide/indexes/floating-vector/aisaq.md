---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQ es un índice vectorial basado en disco que amplía DISKANN para manejar
  conjuntos de datos a escala de miles de millones sin sobrepasar los límites de
  RAM. A diferencia de DISKANN, que mantiene los vectores comprimidos en
  memoria, AISAQ almacena todos los datos en disco y ofrece dos modos para
  equilibrar el rendimiento y los costes de almacenamiento.
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQ es un índice vectorial basado en disco que amplía <a href="/docs/es/diskann.md">DISKANN</a> para manejar conjuntos de datos a escala de miles de millones con una huella DRAM mínima.</p>
<p>A diferencia de DISKANN, que mantiene los vectores comprimidos en memoria, AISAQ está diseñado con una "arquitectura DRAM casi nula", lo que significa mantener todas las estructuras de datos en SSD.</p>
<p>AISAQ permite ejecutar bases de datos a escala ultraelevada utilizando servidores estándar, al tiempo que ofrece modos de funcionamiento para equilibrar el rendimiento y los costes de almacenamiento.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">Cómo funciona AISAQ<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>El diagrama anterior compara las disposiciones de almacenamiento de <strong>DISKANN</strong>, <strong>AISAQ-Performance</strong> y <strong>AISAQ-Scale</strong>, mostrando cómo se distribuyen los datos (vectores en bruto, listas de aristas y códigos PQ) entre la RAM y el disco.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>Aisaq vs Diskann</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">Fundación: Resumen de DISKANN<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>En DISKANN, los vectores en bruto y las listas de aristas se almacenan en disco, mientras que los vectores comprimidos PQ se guardan en memoria (DRAM).</p>
<p>Cuando DISKANN llega a un nodo (por ejemplo, el <em>vector 0</em>):</p>
<ul>
<li><p>Carga el vector en bruto<strong>(raw_vector_0</strong>) y su lista de aristas<strong>(edgelist_0</strong>) desde el disco.</p></li>
<li><p>La lista de aristas indica qué vecinos visitar a continuación (los nodos 2, 3 y 5 en este ejemplo).</p></li>
<li><p>El vector en bruto se utiliza para calcular la distancia exacta al vector de consulta para la clasificación.</p></li>
<li><p>Los datos PQ en memoria se utilizan para filtrar la distancia aproximada y guiar el siguiente recorrido.</p></li>
</ul>
<p>Dado que los datos PQ ya están almacenados en caché en la DRAM, cada visita a un nodo sólo requiere una E/S de disco, con lo que se consigue una alta velocidad de consulta con un uso moderado de la memoria.</p>
<p>Para una explicación detallada de estos componentes y parámetros, consulte <a href="/docs/es/diskann.md">DISKANN</a>.</p>
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">Modos de funcionamiento de AISAQ<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ ofrece dos modos de funcionamiento para abordar dos casos de uso distintos:</p>
<p>Modo de rendimiento: optimizado para aplicaciones que requieren baja latencia y alto rendimiento a escala, como la búsqueda semántica en línea.</p>
<p>Modo de escala: optimizado para aplicaciones con restricciones de latencia más relajadas, como la búsqueda semántica RAG y fuera de línea, al tiempo que permite una expansión rentable de los conjuntos de datos a escala ultraalta.</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">Modo AISAQ-performance</h4><p><strong>El modo AISAQ-performance</strong> consigue una "huella DRAM casi nula" trasladando los datos PQ de la memoria al disco, al tiempo que mantiene unos IOPS bajos gracias a la colocación y redundancia de los datos.</p>
<ul>
<li><p>El vector bruto de cada nodo, la lista de bordes y los datos PQ de sus vecinos se almacenan juntos en el disco.</p></li>
<li><p>Esta disposición garantiza que visitar un nodo (por ejemplo, el vector 0) sólo requiera una única E/S de disco.</p></li>
<li><p>Dado que los datos PQ se almacenan de forma redundante cerca de varios nodos, el tamaño del archivo de índice aumenta significativamente, consumiendo más espacio en disco.</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">Modo AISAQ-scale</h4><p><strong>AISAQ-scale</strong> se centra en reducir el uso de espacio en disco al tiempo que satisface los requisitos de rendimiento de sus aplicaciones objetivo.</p>
<p>En este modo</p>
<ul>
<li><p>Los datos PQ se almacenan por separado en el disco, sin redundancia.</p></li>
<li><p>Este diseño minimiza el tamaño del índice, pero conlleva más operaciones de E/S durante el recorrido del gráfico.</p></li>
<li><p>Para mitigar la sobrecarga de IOPS, AISAQ introduce dos optimizaciones:</p>
<ul>
<li><p>Un algoritmo de reorganización que ordena los vectores PQ por prioridad para mejorar la localización de los datos.</p></li>
<li><p>Una caché PQ en DRAM (pq_read_page_cache_size) que almacena en caché los datos PQ a los que se accede con frecuencia.</p></li>
</ul></li>
</ul>
<h2 id="Example-configuration" class="common-anchor-header">Ejemplo de configuración<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">Parámetros de AISAQ<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ hereda algunos parámetros de DISKANN - <code translate="no">max_degree</code>, <code translate="no">search_list_size</code>, y <code translate="no">pq_code_budget_gb_ratio</code>.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parámetros de creación de índices<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Estos parámetros influyen en cómo se construye el índice AISAQ. Su ajuste puede afectar al tamaño del índice, al tiempo de construcción y a la calidad de la búsqueda.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Controla el número máximo de conexiones (aristas) que puede tener cada punto de datos en el gráfico Vamana.</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [1, 512]</p><p><strong>Valor por defecto</strong>: <code translate="no">56</code></p></td>
     <td><p>Los valores más altos crean gráficos más densos, aumentando potencialmente la recuperación (encontrando resultados más relevantes) pero también incrementando el uso de memoria y el tiempo de construcción. En la mayoría de los casos, se recomienda establecer un valor dentro de este rango: [10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>Durante la construcción del índice, este parámetro define el tamaño del grupo de candidatos utilizado cuando se buscan los vecinos más cercanos para cada nodo. Para cada nodo que se añade al grafo, el algoritmo mantiene una lista de los mejores candidatos search_list_size encontrados hasta el momento. La búsqueda de vecinos se detiene cuando esta lista ya no puede mejorarse. De esta lista final de candidatos, se seleccionan los nodos con mayor grado_máximo para formar las aristas finales.</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [1, 512]</p><p><strong>Valor por defecto</strong>: <code translate="no">100</code></p></td>
     <td><p>Un tamaño mayor de search_list_size aumenta la probabilidad de encontrar los verdaderos vecinos más cercanos para cada nodo, lo que puede conducir a un gráfico de mayor calidad y un mejor rendimiento de búsqueda (recall). Sin embargo, esto tiene el coste de un tiempo de construcción del índice significativamente mayor. Debe establecerse siempre a un valor mayor o igual que max_degree.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Número de vectores PQ almacenados en línea por nodo del índice (se leen cuando se accede al nodo, para reducir el IO)</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [0, <em>grado_máx</em>]</p><p><strong>Valor por defecto</strong>: <code translate="no">-1</code></p></td>
     <td><p>Los valores más altos de <code translate="no">inline_pq</code> mejoran el rendimiento pero aumentan el espacio en disco.</p><p>Establezca <code translate="no">inline_pq</code>=0 para AISAQ en modo de escala.</p><p>Establezca <code translate="no">inline_pq</code>=-1 para rellenar automáticamente cualquier espacio no utilizado en el índice con vectores PQ para una mayor optimización de AISAQ en modo de escala.</p><p>Establezca <code translate="no">inline_pq</code><em>=grado_máx</em> para AISAQ en modo de rendimiento.</p><p><code translate="no">inline_pq</code> Los ajustes entre 0 y <em>max_degree</em> permiten un equilibrio ajustable entre rendimiento y consumo de espacio en disco.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Reorganizar la estructura de datos de los vectores PQ para mejorar la localidad de los datos y reducir los accesos al disco durante la búsqueda (se ignora en el modo de rendimiento).</p></td>
     <td><p><strong>Tipo</strong>: Booleano</p><p><strong>Rango</strong>: [true, false]</p><p><strong>Valor por defecto</strong>: <code translate="no">true</code></p></td>
     <td><p>Cuando es true, reduce las IOs durante la búsqueda con un incremento menor en memoria y en el tiempo de construcción del índice.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>Número de puntos de entrada candidatos para optimizar la selección del punto de entrada de la búsqueda.</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [0, 1000]</p><p><strong>Valor por defecto</strong>: <code translate="no">100</code></p></td>
     <td><p>Valores altos pueden reducir el tiempo de búsqueda iniciando la búsqueda desde un punto de entrada más cercano.</p><p>Establezca valores más altos para segmentos grandes (por ejemplo, para vectores de 10M y superiores utilice el valor 1000).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Controla el tamaño de los códigos PQ (representaciones comprimidas de los puntos de datos) en comparación con el tamaño de los datos sin comprimir.</p></td>
     <td><p><strong>Tipo</strong>: Float</p><p><strong>Rango</strong>: (0.0, 0.25]</p><p><strong>Valor por defecto</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Una relación más alta conduce a resultados de búsqueda más precisos, almacenando efectivamente más información sobre los vectores originales, pero aumenta la complejidad computacional durante la búsqueda.</p><p>En la mayoría de los casos, se recomienda establecer un valor dentro de este rango: (0,0417, 0,25].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>Controla el tamaño de los códigos PQ de los vectores de alta precisión almacenados en el índice (utilizados para la reclasificación), en comparación con el tamaño de los datos sin comprimir.</p></td>
     <td><p><strong>Tipo</strong>: Float</p><p><strong>Rango</strong>: [0, 0.25]</p><p><strong>Valor por defecto</strong>: <code translate="no">0.25</code></p></td>
     <td><p>Con el valor por defecto de 0,25, los vectores se cuantizarán al 25% de su tamaño original (compresión 4×), reduciendo el espacio en disco con un impacto relativamente mínimo en la precisión.</p><p>Establezca el valor 0 para almacenar los vectores de precisión completa en el índice del disco para volver a clasificarlos. Un valor mayor ofrece una mayor tasa de recuperación, pero aumenta el uso de disco.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Tamaño de la caché de vectores PQ en DRAM (bytes). La caché de vectores PQ se carga durante la carga del índice y se utiliza durante la búsqueda para reducir las IO (se ignora en el modo de rendimiento).</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [0, 1073741824]</p><p><strong>Valor por defecto</strong>: <code translate="no">0</code></p></td>
     <td><p>Una caché más grande mejora el rendimiento de la consulta pero aumenta el uso de DRAM.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Controla la cantidad de DRAM que se utilizará para almacenar en caché los nodos de índice a los que se accede con frecuencia.</p><p>Esta caché se carga durante la carga del índice y se utiliza durante la búsqueda para reducir las IOs.</p></td>
     <td><p><strong>Tipo</strong>: Float</p><p><strong>Rango</strong>: [0.0, 0.3)</p><p><strong>Valor por defecto</strong>: <code translate="no">0</code></p></td>
     <td><p>Un valor más alto asigna más memoria para el almacenamiento en caché, reduciendo los IOs de disco pero consumiendo más memoria del sistema. Un valor más bajo utiliza menos memoria para el almacenamiento en caché, aumentando potencialmente la necesidad de acceso al disco.</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">Parámetros de búsqueda de índices<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Estos parámetros influyen en la forma en que AISAQ realiza las búsquedas. Su ajuste puede influir en la velocidad de búsqueda, la latencia y el uso de recursos.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>Durante una operación de búsqueda, este parámetro determina el tamaño del grupo de candidatos que el algoritmo mantiene mientras recorre el gráfico. Un valor mayor aumenta las posibilidades de encontrar a los verdaderos vecinos más cercanos (mayor recall), pero también aumenta la latencia de la búsqueda.</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [topk, int32_max]</p><p><strong>Valor por defecto</strong>: <code translate="no">16</code></p></td>
     <td><p>Para un buen equilibrio entre rendimiento y precisión, se recomienda establecer este valor igual o ligeramente superior al número de resultados que se desea recuperar (top_k).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>Controla el grado de paralelismo durante la búsqueda determinando el número máximo de peticiones de E/S de disco paralelas para leer los nodos del índice.</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [1, 16]</p><p><strong>Valor por defecto</strong>: <code translate="no">8</code></p></td>
     <td><p>Los valores más altos aumentan el paralelismo, lo que puede acelerar la búsqueda en sistemas con CPUs y SSDs potentes. Sin embargo, un valor demasiado alto puede provocar una excesiva contención de recursos.</p><p>En la mayoría de los casos, se recomienda establecer un valor de 2.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>Controla el grado de paralelismo durante la búsqueda determinando el número máximo de solicitudes de E/S de disco paralelas para leer grupos de vectores PQ vecinos (se ignora en el modo de rendimiento).</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [1, 4] debe ser &lt;= <em>beamwidth</em></p><p><strong>Valor por defecto</strong>: <code translate="no">1</code></p></td>
     <td><p>Los valores más altos aumentan el paralelismo, lo que puede acelerar la búsqueda en sistemas con CPUs y SSDs potentes. Sin embargo, un valor demasiado alto puede provocar una excesiva contención de recursos, ya que cada grupo de vectores PQ vecino puede contener hasta vectores de grado_máximo.</p><p>En la mayoría de los casos, recomendamos establecer un valor de 1.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>Tamaño de caché de lectura PQ en DRAM por hilo de búsqueda (bytes). Almacena en caché las páginas de datos a las que se accede con frecuencia y que contienen vectores PQ (se ignora en el modo de rendimiento y sólo se aplica cuando rearrange es true).</p><p>La memoria caché de lectura PQ se reutiliza en todos los segmentos AISAQ.</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [0, 33554432]</p><p><strong>Valor por defecto</strong>: <code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>Una caché más grande mejora el rendimiento de la consulta pero aumenta el uso de DRAM.</p><p>Los valores recomendados oscilan entre 2 MiB para segmentos pequeños (1 M de vectores), 5 MiB para segmentos medianos (50 M de vectores) y 10 MiB para segmentos grandes (250 M de vectores).</p></td>
   </tr>
</table>
