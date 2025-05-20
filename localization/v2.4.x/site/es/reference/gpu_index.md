---
id: gpu_index.md
related_key: gpu_index
summary: Mecanismo de índice GPU en Milvus.
title: Índice GPU
---
<h1 id="GPU-Index" class="common-anchor-header">Índice GPU<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus admite varios tipos de índice de GPU para acelerar el rendimiento y la eficiencia de la búsqueda, especialmente en escenarios de alto rendimiento y alta recuperación. Este tema proporciona una visión general de los tipos de índice GPU soportados por Milvus, sus casos de uso adecuados y sus características de rendimiento. Para obtener información sobre la creación de índices con GPU, consulte <a href="/docs/es/v2.4.x/index-with-gpu.md">Índice con GPU</a>.</p>
<p>Es importante tener en cuenta que el uso de un índice GPU no necesariamente reduce la latencia en comparación con el uso de un índice CPU. Si quieres maximizar al máximo el rendimiento, necesitarás una presión de petición extremadamente alta o un gran número de vectores de consulta.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
   </span> <span class="img-wrapper"> <span>rendimiento</span> </span></p>
<p>La compatibilidad de Milvus con la GPU la aporta el equipo Nvidia <a href="https://rapids.ai/">RAPIDS</a>. Los siguientes son los tipos de índice GPU actualmente soportados por Milvus.</p>
<h2 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_CAGRA es un índice basado en grafos optimizado para GPUs. El uso de GPUs de grado inferencia para ejecutar la versión Milvus GPU puede ser más rentable en comparación con el uso de costosas GPUs de grado entrenamiento.</p>
<ul>
<li><p>Parámetros de construcción del índice</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Valor predeterminado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>Afecta a la recuperación y al tiempo de construcción al determinar el grado del gráfico antes de la poda. Los valores recomendados son <code translate="no">32</code> o <code translate="no">64</code>.</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>Afecta al rendimiento de la búsqueda y a la recuperación estableciendo el grado del gráfico después de la poda. Una mayor diferencia entre estos dos grados se traduce en un mayor tiempo de construcción. Su valor debe ser menor que el valor de <strong>intermediate_graph_degree</strong>.</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>Selecciona el algoritmo de generación del grafo antes de la poda. Valores posibles:</br><code translate="no">IVF_PQ</code>: Ofrece mayor calidad pero menor tiempo de construcción.</br> <code translate="no">NN_DESCENT</code> Ofrece una construcción más rápida con una recuperación potencialmente menor.</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Decide si almacenar en caché el conjunto de datos original en la memoria de la GPU. Valores posibles:</br><code translate="no">“true”</code>: Almacena en caché el conjunto de datos original para mejorar la recuperación al refinar los resultados de búsqueda.</br> <code translate="no">“false”</code> No almacena en caché el conjunto de datos original para ahorrar memoria de la GPU.</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>Parámetros de búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>Determina el tamaño de los resultados intermedios guardados durante la búsqueda. Un valor mayor puede mejorar la recuperación a expensas del rendimiento de la búsqueda. Debe ser al menos igual al valor final top-k (límite) y suele ser una potencia de 2 (por ejemplo, 16, 32, 64, 128).</td><td>Vacío</td></tr>
<tr><td><code translate="no">search_width</code></td><td>Especifica el número de puntos de entrada en el gráfico CAGRA durante la búsqueda. Aumentar este valor puede mejorar la recuperación, pero puede afectar al rendimiento de la búsqueda (por ejemplo, 1, 2, 4, 8, 16, 32).</td><td>Vacío</td></tr>
<tr><td><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></td><td>Controla el proceso de iteración de la búsqueda. Por defecto, se establecen en <code translate="no">0</code>, y CAGRA determina automáticamente el número de iteraciones basándose en <code translate="no">itopk_size</code> y <code translate="no">search_width</code>. Ajustar estos valores manualmente puede ayudar a equilibrar el rendimiento y la precisión.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>Especifica el número de subprocesos CUDA utilizados para calcular la distancia métrica en la GPU. Los valores comunes son una potencia de 2 hasta 32 (por ejemplo, 2, 4, 8, 16, 32). Tiene un impacto menor en el rendimiento de la búsqueda. El valor por defecto es <code translate="no">0</code>, donde Milvus selecciona automáticamente <code translate="no">team_size</code> basándose en la dimensión del vector.</td><td><code translate="no">0</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>Límites de búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Rango</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= 1024</td></tr>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=max((<code translate="no">itopk_size</code> + 31)// 32, <code translate="no">search_width</code>) * 32</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h2><p>De forma similar a <a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a>, GPU_IVF_FLAT también divide los datos vectoriales en unidades de clúster <code translate="no">nlist</code> y, a continuación, compara las distancias entre el vector de entrada objetivo y el centro de cada clúster. Dependiendo del número de clusters que el sistema consulte (<code translate="no">nprobe</code>), los resultados de la búsqueda de similitud se basan en comparaciones entre el vector de entrada objetivo y los vectores del cluster o clusters más similares, lo que reduce drásticamente el tiempo de consulta.</p>
<p>Ajustando <code translate="no">nprobe</code>, se puede encontrar un equilibrio ideal entre precisión y velocidad para un escenario determinado. Los resultados de la <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">prueba de rendimiento de IVF_FLAT</a> demuestran que el tiempo de consulta aumenta bruscamente a medida que aumentan tanto el número de vectores de entrada objetivo (<code translate="no">nq</code>), como el número de clusters a buscar (<code translate="no">nprobe</code>).</p>
<p>GPU_IVF_FLAT es el índice IVF más básico, y los datos codificados almacenados en cada unidad son coherentes con los datos originales.</p>
<p>Al realizar búsquedas, tenga en cuenta que puede establecer el top-K hasta 256 para cualquier búsqueda contra una colección indexada en GPU_IVF_FLAT.</p>
<ul>
<li><p>Parámetros de creación de índices</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor predeterminado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de clúster</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Decide si se almacena en caché el conjunto de datos original en la memoria de la GPU. Valores posibles:</br><code translate="no">“true”</code>: Almacena en caché el conjunto de datos original para mejorar la recuperación refinando los resultados de búsqueda.</br> <code translate="no">“false”</code> No almacena en caché el conjunto de datos original para ahorrar memoria de la GPU.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Parámetros de búsqueda</p>
<ul>
<li><p>Búsqueda común</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Límites de la búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Rango</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= <code translate="no">2048</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">PQ</code> (Cuantización de producto) descompone uniformemente el espacio vectorial original de alta dimensión en productos cartesianos de <code translate="no">m</code> espacios vectoriales de baja dimensión y, a continuación, cuantiza los espacios vectoriales de baja dimensión descompuestos. En lugar de calcular las distancias entre el vector objetivo y el centro de todas las unidades, la cuantización de productos permite calcular las distancias entre el vector objetivo y el centro de agrupación de cada espacio de baja dimensión y reduce en gran medida la complejidad temporal y espacial del algoritmo.</p>
<p>IVF_PQ realiza la agrupación de índices IVF antes de cuantificar el producto de vectores. Su archivo de índices es aún más pequeño que IVF_SQ8, pero también provoca una pérdida de precisión durante la búsqueda de vectores.</p>
<div class="alert note">
<p>Los parámetros de construcción del índice y los parámetros de búsqueda varían según la distribución Milvus. Seleccione primero su distribución Milvus.</p>
<p>Cuando realice búsquedas, tenga en cuenta que puede establecer el top-K hasta 8192 para cualquier búsqueda contra una colección indexada GPU_IVF_FLAT.</p>
</div>
<ul>
<li><p>Parámetros de creación de índices</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor predeterminado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de clúster</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>Número de factores de cuantificación del producto,</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Opcional] Número de bits en los que se almacena cada vector de baja dimensión.</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Decide si se almacena en caché el conjunto de datos original en la memoria de la GPU. Valores posibles:</br><code translate="no">“true”</code>: Almacena en caché el conjunto de datos original para mejorar la recuperación refinando los resultados de búsqueda.</br> <code translate="no">“false”</code> No almacena en caché el conjunto de datos original para ahorrar memoria de la GPU.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Parámetros de búsqueda</p>
<ul>
<li><p>Búsqueda común</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Límites de la búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Rango</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= <code translate="no">1024</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUBRUTEFORCE" class="common-anchor-header">GPU_BRUTE_FORCE<button data-href="#GPUBRUTEFORCE" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_BRUTE_FORCE está diseñado para casos en los que es crucial una recuperación extremadamente alta, garantizando una recuperación de 1 al comparar cada consulta con todos los vectores del conjunto de datos. Sólo requiere el tipo de métrica (<code translate="no">metric_type</code>) y top-k (<code translate="no">limit</code>) como parámetros de creación y búsqueda de índices.</p>
<p>Para GPU_BRUTE_FORCE, no se requieren parámetros adicionales de creación de índices ni de búsqueda.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusión<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Actualmente, Milvus carga todos los índices en la memoria de la GPU para realizar operaciones de búsqueda eficientes. La cantidad de datos que pueden cargarse depende del tamaño de la memoria de la GPU:</p>
<ul>
<li><strong>GPU_CAGRA</strong>: el uso de memoria es aproximadamente 1,8 veces el de los datos vectoriales originales.</li>
<li><strong>GPU_IVF_FLAT</strong> y <strong>GPU_BRUTE_FORCE</strong>: Requiere una memoria igual al tamaño de los datos originales.</li>
<li><strong>GPU_IVF_PQ</strong>: Utiliza un espacio de memoria menor, que depende de la configuración de los parámetros de compresión.</li>
</ul>
