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
    </button></h1><p>AISAQ es un índice vectorial basado en disco que amplía <a href="/docs/es/diskann.md">DISKANN</a> para manejar conjuntos de datos a escala de miles de millones sin sobrepasar los límites de RAM. A diferencia de DISKANN, que mantiene los vectores comprimidos en memoria, AISAQ almacena todos los datos en disco y ofrece dos modos para equilibrar el rendimiento y los costes de almacenamiento.</p>
<p>Utilice AISAQ cuando su conjunto de datos vectoriales sea demasiado grande para caber cómodamente en RAM, o cuando necesite optimizar los costes de infraestructura cambiando algo de rendimiento de consulta por menores requisitos de memoria.</p>
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
    </button></h2><p>El diagrama anterior compara las disposiciones de almacenamiento de <strong>DISKANN</strong>, <strong>AISAQ-Performance</strong> y <strong>AISAQ-Scale</strong>, mostrando cómo se distribuyen los datos (vectores en bruto, listas de aristas y códigos PQ) entre RAM y disco.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
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
<h3 id="AISAQ-modes" class="common-anchor-header">Modos de AISAQ<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ ofrece dos estrategias de almacenamiento basadas en disco. La diferencia clave es cómo se almacenan los datos comprimidos PQ.</p>
<h4 id="AISAQ-performance" class="common-anchor-header">AISAQ-performance</h4><p><strong>AISAQ-performance</strong> consigue un almacenamiento totalmente basado en disco moviendo los datos PQ de la memoria al disco mientras mantiene IOPS bajos mediante la colocación y redundancia de datos.</p>
<p>En este modo:</p>
<ul>
<li><p>El vector bruto de cada nodo, la lista de aristas y los datos PQ de sus vecinos se almacenan juntos en disco.</p></li>
<li><p>Esta disposición garantiza que visitar un nodo (por ejemplo, el <em>vector 0</em>) sólo requiera una única E/S de disco.</p></li>
<li><p>Sin embargo, como los datos PQ se almacenan de forma redundante cerca de varios nodos, el tamaño del archivo de índice aumenta significativamente, consumiendo más espacio en disco.</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">AISAQ-scale</h4><p><strong>AISAQ-scale</strong> se centra en <em>reducir el uso de espacio en disco</em> manteniendo todos los datos en el disco.</p>
<p>En este modo</p>
<ul>
<li><p>Los datos PQ se almacenan por separado en el disco, sin redundancia.</p></li>
<li><p>Este diseño minimiza el tamaño del índice, pero conlleva más operaciones de E/S durante el recorrido del gráfico.</p></li>
<li><p>Para mitigar la sobrecarga de IOPS, AISAQ introduce dos optimizaciones:</p>
<ul>
<li><p>Una estrategia de reorganización que ordena los vectores PQ por prioridad para mejorar la localización de los datos.</p></li>
<li><p>Una caché PQ en DRAM (pq_cache_size) que almacena en caché los datos PQ a los que se accede con frecuencia.</p></li>
</ul></li>
</ul>
<p>Como resultado, AISAQ-scale consigue una mayor eficiencia de almacenamiento pero un menor rendimiento que DISKANN o AISAQ-Performance.</p>
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
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">Parámetros específicos de AISAQ<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ hereda muchos parámetros de DISKANN. Para evitar redundancias, a continuación sólo se detallan los parámetros específicos de AISAQ. Para las descripciones de parámetros compartidos como <code translate="no">max_degree</code>, <code translate="no">pq_code_budget_gb_ratio</code>, <code translate="no">search_list_size</code> y <code translate="no">beam_width_ratio</code>, consulte <a href="/docs/es/diskann.md#DISKANN-params">DISKANN</a>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Número de vectores PQ almacenados en línea por nodo. Determina la disposición del almacenamiento (modo Rendimiento frente a modo Escala).</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [0, <em>max_grado</em>]</p><p><strong>Valor por defecto</strong>: <code translate="no">-1</code></p></td>
     <td><p>Cuanto más se acerca <code translate="no">inline_pq</code> a <em>max_degree</em>, mejor suele ser el rendimiento, pero el tamaño del archivo de índice aumenta considerablemente.</p><p>Cuando <code translate="no">inline_pq</code> se acerca a 0, el rendimiento disminuye y el tamaño del índice pasa a ser similar al de DISKANN.</p><p><strong>Nota</strong>: Depende en gran medida del rendimiento del disco. Si el rendimiento del disco es bajo, no es aconsejable activar esta opción, ya que el ancho de banda limitado del disco puede convertirse en un cuello de botella y degradar el rendimiento general.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Activa la ordenación de vectores PQ por prioridad para mejorar la localidad de E/S.</p></td>
     <td><p><strong>Tipo</strong>: Booleano</p><p><strong>Rango</strong>: [true, false]</p><p><strong>Valor por defecto</strong>: <code translate="no">false</code></p></td>
     <td><p>Reduce la E/S de la consulta pero aumenta el tiempo de construcción del índice.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Tamaño de la caché PQ en DRAM (bytes).</p></td>
     <td><p><strong>Tipo</strong>: Entero</p><p><strong>Rango</strong>: [0, 1&lt;&lt;30]</p><p><strong>Valor por defecto</strong>: <code translate="no">0</code></p></td>
     <td><p>Una caché más grande mejora el rendimiento de la consulta pero aumenta el uso de DRAM.</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Consideraciones<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>El rendimiento del disco es importante. AISAQ depende en gran medida de los IOPS de SSD; un almacenamiento deficiente puede reducir los QPS.</p></li>
<li><p>El modo AISAQ-performance ≈ latencia DISKANN, pero puede requerir varias veces más espacio en disco.</p></li>
<li><p>El modo AISAQ-escala es adecuado para cargas de trabajo de búsqueda offline o archivo de datos en las que el QPS es menos crítico.</p></li>
</ul>
