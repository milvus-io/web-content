---
id: index.md
related_key: index
summary: Mecanismo de índice en Milvus.
title: Índice en memoria
---

<h1 id="In-memory-Index" class="common-anchor-header">Índice en memoria<button data-href="#In-memory-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema enumera varios tipos de índices en memoria que Milvus soporta, los escenarios que mejor se adaptan a cada uno de ellos y los parámetros que los usuarios pueden configurar para lograr un mejor rendimiento de búsqueda. Para índices en disco, consulte <strong><a href="/docs/es/v2.5.x/disk_index.md">Índice en disco</a></strong>.</p>
<p>La indexación es el proceso de organización eficiente de los datos, y desempeña un papel fundamental en la utilidad de la búsqueda de similitudes al acelerar drásticamente las consultas que consumen mucho tiempo en grandes conjuntos de datos.</p>
<p>Para mejorar el rendimiento de las consultas, puede <a href="/docs/es/v2.5.x/index-vector-fields.md">especificar un tipo de índice</a> para cada campo vectorial.</p>
<div class="alert note">
Actualmente, un campo vectorial sólo admite un tipo de índice. Milvus elimina automáticamente el índice antiguo al cambiar el tipo de índice.</div>
<h2 id="ANNS-vector-indexes" class="common-anchor-header">Índices vectoriales ANNS<button data-href="#ANNS-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>La mayoría de los tipos de índices vectoriales soportados por Milvus utilizan algoritmos de búsqueda aproximada de vecinos más cercanos (ANNS). En comparación con la recuperación exacta, que suele llevar mucho tiempo, la idea central de ANNS ya no se limita a devolver el resultado más exacto, sino que sólo busca los vecinos del objetivo. El ANNS mejora la eficiencia de la recuperación sacrificando la precisión dentro de un rango aceptable.</p>
<p>Según los métodos de implementación, el índice vectorial ANNS puede clasificarse en cuatro tipos: Basado en árbol, Basado en grafo, Basado en hash y Basado en cuantificación.</p>
<h2 id="Indexes-supported-in-Milvus" class="common-anchor-header">Índices admitidos en Milvus<button data-href="#Indexes-supported-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus admite varios tipos de índices, que se clasifican por el tipo de incrustaciones vectoriales que manejan: <strong>incrustaciones de coma flotante</strong> (también conocidas como vectores de coma flotante o vectores densos), <strong>incrustaciones binarias</strong> (también conocidas como vectores binarios) e <strong>incrustaciones dispersas</strong> (también conocidas como vectores dispersos).</p>
<div class="filter">
 <a href="#sparse">Incrustaciones</a> <a href="#floating">en coma flotante</a> <a href="#binary">Incrustaciones binarias</a> <a href="#sparse">Incrustaciones dispersas</a></div>
<div class="filter-floating">
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">Índices para incrustaciones de coma flotante</h3><p>En el caso de las incrustaciones de coma flotante de 128 dimensiones (vectores), el almacenamiento que ocupan es de 128 * el tamaño de float = 512 bytes. Y las <a href="/docs/es/v2.5.x/metric.md">métricas de distancia</a> utilizadas para las incrustaciones en coma flotante son la distancia euclidiana (<code translate="no">L2</code>) y el producto interior (<code translate="no">IP</code>).</p>
<p>Estos tipos de índices incluyen <code translate="no">FLAT</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_PQ</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code>, y <code translate="no">SCANN</code> para búsquedas RNA basadas en CPU.</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">Índices para incrustaciones binarias</h3><p>Para las incrustaciones binarias de 128 dimensiones, el almacenamiento que ocupan es de 128 / 8 = 16 bytes. Y las métricas de distancia utilizadas para las incrustaciones binarias son <code translate="no">JACCARD</code> y <code translate="no">HAMMING</code>.</p>
<p>Este tipo de índices incluye <code translate="no">BIN_FLAT</code> y <code translate="no">BIN_IVF_FLAT</code>.</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">Índices para incrustaciones dispersas</h3><p>Los índices para incrustaciones dispersas sólo admiten las métricas <code translate="no">IP</code> y <code translate="no">BM25</code> (para búsqueda de texto completo).</p>
<p>Tipo de índice admitido para incrustaciones dispersas: <code translate="no">SPARSE_INVERTED_INDEX</code>.</p>
<div class="alert note">
<p>A partir de Milvus 2.5.4, <code translate="no">SPARSE_WAND</code> queda obsoleto. En su lugar, se recomienda utilizar <code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> por equivalencia y manteniendo la compatibilidad. Para más información, consulte <a href="/docs/es/v2.5.x/sparse_vector.md#Set-index-params-for-vector-field">Vector disperso</a>.</p>
</div>
</div>
<div class="filter-floating table-wrapper">
<table id="floating">
<thead>
  <tr>
    <th>Índice admitido</th>
    <th>Clasificación</th>
    <th>Escenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>PLANO</td>
    <td>NO DISPONIBLE</td>
    <td>
      <ul>
        <li>Conjunto de datos relativamente pequeño</li>
        <li>Requiere una tasa de recuperación del 100</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_FLAT</td>
    <td>N/A</td>
    <td>
      <ul>
        <li>Consulta de alta velocidad</li>
        <li>Requiere una tasa de recuperación lo más alta posible</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>Índice basado en la cuantificación</td>
    <td>
      <ul>
        <li>Consulta de muy alta velocidad</li>
        <li>Recursos de memoria limitados</li>
        <li>Acepta un compromiso menor en la tasa de recuperación</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>IVF_PQ</td>
    <td>Índice basado en cuantificación</td>
    <td>
      <ul>
        <li>Consulta de alta velocidad</li>
        <li>Recursos de memoria limitados</li>
        <li>Acepta un compromiso menor en la tasa de recuperación</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>Índice basado en gráficos</td>
    <td>
      <ul>
        <li>Consulta muy rápida</li>
        <li>Requiere una tasa de recuperación lo más alta posible</li>
        <li>Grandes recursos de memoria</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW_SQ</td>
    <td>Índice basado en la cuantificación</td>
    <td>
      <ul>
        <li>Consulta a muy alta velocidad</li>
        <li>Recursos de memoria limitados</li>
        <li>Acepta un compromiso menor en la tasa de recuperación</li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>HNSW_PQ</td>
    <td>Índice basado en cuantificación</td>
    <td>
      <ul>
        <li>Velocidad de consulta media</li>
        <li>Recursos de memoria muy limitados</li>
        <li>Acepta un compromiso menor en la tasa de recuperación</li>
      </ul>
    </td>
  </tr>
    </tr>
    <tr>
    <td>HNSW_PRQ</td>
    <td>Índice basado en cuantificación</td>
    <td>
      <ul>
        <li>Velocidad de consulta media</li>
        <li>Recursos de memoria muy limitados</li>
        <li>Acepta un compromiso menor en la tasa de recuperación</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>Índice basado en la cuantificación</td>
    <td>
      <ul>
        <li>Consulta muy rápida</li>
        <li>Requiere un índice de recuperación lo más alto posible</li>
        <li>Grandes recursos de memoria</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper">
<table id="binary">
<thead>
  <tr>
    <th>Índice compatible</th>
    <th>Clasificación</th>
    <th>Escenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>Índice basado en la cuantificación</td>
    <td><ul>
      <li>Depende de conjuntos de datos relativamente pequeños.</li>
      <li>Requiere una precisión perfecta.</li>
      <li>No se aplica compresión.</li>
      <li>Garantiza resultados de búsqueda exactos.</li>
    </ul></td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>Índice basado en la cuantificación</td>
    <td><ul>
      <li>Consulta de alta velocidad</li>
      <li>Requiere un índice de recuperación lo más alto posible</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper">
<table id="sparse">
<thead>
  <tr>
    <th>Índice compatible</th>
    <th>Clasificación</th>
    <th>Escenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>ÍNDICE_ESPARCIDO_INVERTIDO</td>
    <td>Índice invertido</td>
    <td><ul>
      <li>Depende de conjuntos de datos relativamente pequeños.</li>
      <li>Requiere una tasa de recuperación del 100%.</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">FLAT</h3><p>Para aplicaciones de búsqueda de similitud vectorial que requieren una precisión perfecta y dependen de conjuntos de datos relativamente pequeños (a escala de millones), el índice FLAT es una buena elección. FLAT no comprime los vectores y es el único índice que puede garantizar resultados de búsqueda exactos. Los resultados de FLAT también pueden utilizarse como punto de comparación para los resultados producidos por otros índices que tienen menos del 100% de recuperación.</p>
<p>FLAT es preciso porque adopta un enfoque exhaustivo de la búsqueda, lo que significa que, para cada consulta, la entrada objetivo se compara con todos los conjuntos de vectores de un conjunto de datos. Esto hace que FLAT sea el índice más lento de nuestra lista y poco adecuado para consultar datos vectoriales masivos. No se requieren parámetros para el índice FLAT en Milvus, y su uso no requiere la creación de índices adicionales.</p>
<ul>
<li><p>Parámetros de búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[Opcional] La métrica de distancia elegida.</td><td>Véase <a href="/docs/es/v2.5.x/metric.md">Métricas admitidas</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT</h3><p>IVF_FLAT divide los datos vectoriales en unidades de clúster <code translate="no">nlist</code> y, a continuación, compara las distancias entre el vector de entrada objetivo y el centro de cada clúster. Dependiendo del número de clusters que el sistema esté configurado para consultar (<code translate="no">nprobe</code>), los resultados de la búsqueda de similitud se devuelven basados en comparaciones entre la entrada objetivo y los vectores en el cluster(s) más similar(es) solamente - reduciendo drásticamente el tiempo de consulta.</p>
<p>Ajustando <code translate="no">nprobe</code>, se puede encontrar un equilibrio ideal entre precisión y velocidad para un escenario determinado. Los resultados de la <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">prueba de rendimiento de IVF_FLAT</a> demuestran que el tiempo de consulta aumenta bruscamente a medida que aumentan tanto el número de vectores de entrada objetivo (<code translate="no">nq</code>), como el número de clusters a buscar (<code translate="no">nprobe</code>).</p>
<p>IVF_FLAT es el índice IVF más básico, y los datos codificados almacenados en cada unidad son coherentes con los datos originales.</p>
<ul>
<li><p>Parámetros de construcción del índice</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de clúster</td><td>[1, 65536]</td><td>128</td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Rango de búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Gama</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Número máximo de cubos que no devuelven ningún resultado de búsqueda.<br/>Este es un parámetro de búsqueda por rango y termina el proceso de búsqueda cuando el número de cubos vacíos consecutivos alcanza el valor especificado.<br/>Aumentar este valor puede mejorar la tasa de recuperación a costa de aumentar el tiempo de búsqueda.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8</h3><p>IVF_FLAT no realiza ninguna compresión, por lo que los archivos de índice que produce tienen aproximadamente el mismo tamaño que los datos vectoriales originales sin indexar. Por ejemplo, si el conjunto de datos SIFT 1B original tiene 476 GB, sus archivos de índice IVF_FLAT serán ligeramente más pequeños (~470 GB). Cargar todos los archivos de índice en memoria consumirá 470 GB de almacenamiento.</p>
<p>Cuando los recursos de disco, CPU o memoria GPU son limitados, IVF_SQ8 es una mejor opción que IVF_FLAT. Este tipo de índice puede convertir cada FLOAT (4 bytes) a UINT8 (1 byte) realizando una Cuantización Escalar (SQ). Esto reduce el consumo de memoria de disco, CPU y GPU en un 70-75%. Para el conjunto de datos SIFT 1B, los archivos de índice IVF_SQ8 requieren sólo 140 GB de almacenamiento.</p>
<ul>
<li><p>Parámetros de creación de índices</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de clúster</td><td>[1, 65536]</td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Rango de búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Gama</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Número máximo de buckets que no devuelven ningún resultado de búsqueda.<br/>Este es un parámetro de búsqueda por rango y termina el proceso de búsqueda cuando el número de buckets vacíos consecutivos alcanza el valor especificado.<br/>Aumentar este valor puede mejorar la tasa de recuperación a costa de aumentar el tiempo de búsqueda.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFPQ" class="common-anchor-header">IVF_PQ</h3><p><code translate="no">PQ</code> (Cuantización de productos) descompone uniformemente el espacio vectorial original de alta dimensión en productos cartesianos de <code translate="no">m</code> espacios vectoriales de baja dimensión y, a continuación, cuantiza los espacios vectoriales de baja dimensión descompuestos. En lugar de calcular las distancias entre el vector objetivo y el centro de todas las unidades, la cuantización de productos permite calcular las distancias entre el vector objetivo y el centro de agrupación de cada espacio de baja dimensión y reduce en gran medida la complejidad temporal y espacial del algoritmo.</p>
<p>IVF_PQ realiza la agrupación de índices IVF antes de cuantificar el producto de vectores. Su archivo de índices es aún más pequeño que IVF_SQ8, pero también provoca una pérdida de precisión durante la búsqueda de vectores.</p>
<div class="alert note">
<p>Los parámetros de construcción del índice y los parámetros de búsqueda varían con la distribución Milvus. Seleccione primero su distribución de Milvus.</p>
</div>
<ul>
<li><p>Parámetros de creación de índices</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de cluster</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">m</code></td><td>Número de factores de cuantificación del producto</td><td><code translate="no">dim mod m == 0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Opcional] Número de bits en los que se almacena cada vector de baja dimensión.</td><td>[1, 64] (8 por defecto)</td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Búsqueda por rangos</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Gama</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Número máximo de buckets que no devuelven ningún resultado de búsqueda.<br/>Este es un parámetro de búsqueda por rango y termina el proceso de búsqueda cuando el número de buckets vacíos consecutivos alcanza el valor especificado.<br/>Aumentar este valor puede mejorar la tasa de recuperación a costa de aumentar el tiempo de búsqueda.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="SCANN" class="common-anchor-header">SCANN</h3><p>ScaNN (Scalable Nearest Neighbors) es similar a IVF_PQ en términos de agrupación de vectores y cuantificación de productos. Lo que los diferencia radica en los detalles de implementación de la cuantificación del producto y el uso de SIMD (Single-Instruction / Multi-data) para un cálculo eficiente.</p>
<ul>
<li><p>Parámetros de creación de índices</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de clúster</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">with_raw_data</code></td><td>Si se incluyen los datos brutos en el índice</td><td><code translate="no">True</code> o <code translate="no">False</code>. Por defecto <code translate="no">True</code>.</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>A diferencia de IVF_PQ, los valores por defecto se aplican a <code translate="no">m</code> y <code translate="no">nbits</code> para optimizar el rendimiento.</p>
  </div>
</li>
<li><p>Parámetros de búsqueda</p>
<ul>
<li><p>Búsqueda común</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td></td></tr>
<tr><td><code translate="no">reorder_k</code></td><td>Número de unidades candidatas a consultar</td><td>[<code translate="no">top_k</code>, ∞]</td><td><code translate="no">top_k</code></td></tr>
</tbody>
</table>
</li>
<li><p>Búsqueda por rangos</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Gama</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Número máximo de cubos que no devuelven ningún resultado de búsqueda.<br/>Este es un parámetro de búsqueda por rango y termina el proceso de búsqueda cuando el número de cubos vacíos consecutivos alcanza el valor especificado.<br/>Aumentar este valor puede mejorar la tasa de recuperación a costa de aumentar el tiempo de búsqueda.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW (Hierarchical Navigable Small World Graph) es un algoritmo de indexación basado en grafos. Construye una estructura de navegación multicapa para una imagen de acuerdo con ciertas reglas. En esta estructura, las capas superiores son más dispersas y las distancias entre nodos son más lejanas; las capas inferiores son más densas y las distancias entre nodos son más cercanas. La búsqueda parte de la capa superior, encuentra el nodo más cercano al objetivo en esta capa y, a continuación, entra en la capa siguiente para iniciar otra búsqueda. Tras varias iteraciones, puede acercarse rápidamente a la posición del objetivo.</p>
<p>Para mejorar el rendimiento, HNSW limita el grado máximo de los nodos en cada capa del gráfico a <code translate="no">M</code>. Además, puede utilizar <code translate="no">efConstruction</code> (al construir el índice) o <code translate="no">ef</code> (al buscar objetivos) para especificar un rango de búsqueda.</p>
<ul>
<li><p>Parámetros de creación de índices</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor predeterminado</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M define el número máximo de conexiones salientes en el gráfico. M más alto conduce a una mayor precisión/tiempo de ejecución a ef/efConstrucción fija.</td><td>[2, 2048]</td><td>Ninguno</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction controla el equilibrio entre velocidad de búsqueda de índices y velocidad de construcción. Aumentar el parámetro efConstruction puede mejorar la calidad del índice, pero también tiende a alargar el tiempo de indexación.</td><td>[1, int_max]</td><td>Ninguno</td></tr>
</tbody>
</table>
</li>
<li><p>Parámetros de búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parámetro que controla la relación entre tiempo de búsqueda y precisión. Cuanto mayor sea <code translate="no">ef</code>, más precisa será la búsqueda, pero más lenta.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Ninguno</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWSQ" class="common-anchor-header">HNSW_SQ</h3><p>La cuantificación escalar (SQ) es una técnica utilizada para discretizar datos de coma flotante en un conjunto finito de valores basados en su magnitud. Por ejemplo, <strong>SQ6</strong> representa la cuantización en (2^6 = 64) valores discretos, donde cada número de punto flotante se codifica utilizando 6 bits. Del mismo modo, <strong>SQ8</strong> cuantiza los datos en (2^8 = 256) valores discretos, donde cada número de coma flotante se representa con 8 bits. Esta cuantización reduce la huella de memoria al tiempo que preserva la estructura esencial de los datos para un procesamiento eficiente.</p>
<p>Combinado con SQ, HNSW_SQ ofrece un equilibrio controlable entre el tamaño del índice y la precisión, manteniendo un alto rendimiento de consulta por segundo (QPS). En comparación con el HNSW estándar, supone un modesto aumento del tiempo de construcción del índice.</p>
<ul>
<li><p>Parámetros de construcción de índices</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M define el número máximo de conexiones salientes en el gráfico. M más alto conduce a una mayor precisión/tiempo de ejecución a ef/efConstrucción fija.</td><td>[2, 2048]</td><td>Ninguno</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction controla el equilibrio entre velocidad de búsqueda de índices y velocidad de construcción. Aumentar el parámetro efConstruction puede mejorar la calidad del índice, pero también tiende a alargar el tiempo de indexación.</td><td>[1, int_max]</td><td>Ninguno</td></tr>
<tr><td><code translate="no">sq_type</code></td><td>Tipo de cuantificador escalar.</td><td><code translate="no">SQ6</code>,<code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code></td><td><code translate="no">SQ8</code></td></tr>
<tr><td><code translate="no">refine</code></td><td>Si los datos refinados se reservan durante la construcción del índice.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Tipo de datos del índice refinado.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Ninguno</td></tr>
</tbody>
</table>
</li>
<li><p>Parámetros de búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parámetro que controla la relación entre tiempo de búsqueda y precisión. Cuanto mayor sea <code translate="no">ef</code>, más precisa será la búsqueda, pero más lenta.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Ninguno</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>El factor de ampliación de refine en comparación con <em>k</em>.</td><td>[1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPQ" class="common-anchor-header">HNSW_PQ</h3><p>La idea básica de PQ es dividir el vector en <code translate="no">m</code> subvectores, cada uno de los cuales encontrará <em>2^{nbits}</em> centroides basados en kmeans, y cada subvector seleccionará el centroide más cercano como su subvector aproximado. A continuación, registramos todos los centroides, de modo que cada subvector puede codificarse como <code translate="no">nbits</code>, y un vector flotante de longitud <code translate="no">dim</code> puede codificarse como <em>m ⋅ nbits</em> bits.</p>
<p>Combinado con PQ, HNSW_PQ ofrece un compromiso controlable entre el tamaño del índice y la precisión, pero tiene un valor QPS más bajo y una tasa de recuperación más alta que HNSW_SQ para la misma tasa de compresión. En comparación con HNSW_SQ, se tarda más en construir el índice.</p>
<ul>
<li><p>Parámetros de creación de índices</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M define el número máximo de conexiones salientes en el gráfico. M más alto conduce a una mayor precisión/tiempo de ejecución a ef/efConstrucción fija.</td><td>[2, 2048]</td><td>Ninguno</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction controla el equilibrio entre velocidad de búsqueda de índices y velocidad de construcción. Aumentar el parámetro efConstruction puede mejorar la calidad del índice, pero también tiende a alargar el tiempo de indexación.</td><td>[1, int_max]</td><td>Ninguno</td></tr>
<tr><td><code translate="no">m</code></td><td>Número de grupos de subvectores en los que dividir el vector.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>El número de bits en los que se cuantiza cada grupo de subvectores.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">refine</code></td><td>Si se reservan datos refinados durante la construcción del índice.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>El tipo de datos del índice refinado.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Ninguno</td></tr>
</tbody>
</table>
</li>
<li><p>Parámetros de búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parámetro que controla la relación entre tiempo de búsqueda y precisión. Cuanto mayor sea <code translate="no">ef</code>, más precisa será la búsqueda, pero más lenta.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Ninguno</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>El factor de ampliación de refine en comparación con <em>k</em>.</td><td>[1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ</h3><p>PRQ es similar a PQ, y también divide el vector en grupos <code translate="no">m</code>. Cada subvector se codificará como <code translate="no">nbits</code>. Tras completar una cuantización pq, calculará el residuo entre el vector y el vector cuantizado pq, y aplicará la cuantización pq al vector residual. Se realizarán un total de <code translate="no">nrq</code> cuantizaciones pq completas, por lo que un vector flotante de longitud <code translate="no">dim</code> se codificará como <em>m ⋅ nbits ⋅ nrq</em> bits.</p>
<p>Combinado con un cuantificador residual de producto (PRQ), HNSW_PRQ ofrece un equilibrio aún más controlable entre el tamaño del índice y la precisión. Tiene un valor QPS casi equivalente y una tasa de recuperación más alta que HNSW_PQ para la misma tasa de compresión. En comparación con HNSW_PQ, el tiempo de construcción del índice puede aumentar varias veces.</p>
<ul>
<li><p>Parámetros de creación de índices</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M define el número máximo de conexiones salientes en el gráfico. M más alto conduce a una mayor precisión/tiempo de ejecución a ef/efConstrucción fija.</td><td>[2, 2048]</td><td>Ninguno</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction controla el equilibrio entre velocidad de búsqueda de índices y velocidad de construcción. Aumentar el parámetro efConstruction puede mejorar la calidad del índice, pero también tiende a alargar el tiempo de indexación.</td><td>[1, int_max]</td><td>Ninguno</td></tr>
<tr><td><code translate="no">m</code></td><td>Número de grupos de subvectores en los que dividir el vector.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>El número de bits en los que se cuantiza cada grupo de subvectores.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">nrq</code></td><td>El número de subcuantizadores residuales.</td><td>[1, 16]</td><td>2</td></tr>
<tr><td><code translate="no">refine</code></td><td>Si los datos refinados se reservan durante la construcción del índice.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>El tipo de datos del índice refinado.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Ninguno</td></tr>
</tbody>
</table>
</li>
<li><p>Parámetros de búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Parámetro que controla la relación entre tiempo de búsqueda y precisión. Cuanto mayor sea <code translate="no">ef</code>, más precisa será la búsqueda, pero más lenta.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Ninguno</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>El factor de ampliación de refine en comparación con <em>k</em>.</td><td>[1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT</h3><p>Este índice es exactamente igual que FLAT, salvo que sólo puede utilizarse para incrustaciones binarias.</p>
<p>Para aplicaciones de búsqueda de similitud vectorial que requieran una precisión perfecta y dependan de conjuntos de datos relativamente pequeños (a escala de millones), el índice BIN_FLAT es una buena elección. BIN_FLAT no comprime los vectores y es el único índice que puede garantizar resultados de búsqueda exactos. Los resultados de BIN_FLAT también pueden utilizarse como punto de comparación para los resultados producidos por otros índices que tienen menos del 100% de recuperación.</p>
<p>BIN_FLAT es preciso porque adopta un enfoque exhaustivo de la búsqueda, lo que significa que para cada consulta la entrada objetivo se compara con vectores de un conjunto de datos. Esto hace que BIN_FLAT sea el índice más lento de nuestra lista y poco adecuado para consultar datos vectoriales masivos. No hay parámetros para el índice BIN_FLAT en Milvus, y su uso no requiere entrenamiento de datos ni almacenamiento adicional.</p>
<ul>
<li><p>Parámetros de búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[Opcional] La métrica de distancia elegida.</td><td>Véase <a href="/docs/es/v2.5.x/metric.md">Métricas admitidas</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT</h3><p>Este índice es exactamente igual que IVF_FLAT, salvo que sólo puede utilizarse para incrustaciones binarias.</p>
<p>BIN_IVF_FLAT divide los datos vectoriales en unidades de clúster <code translate="no">nlist</code> y, a continuación, compara las distancias entre el vector de entrada objetivo y el centro de cada clúster. Dependiendo del número de clústeres que el sistema consulte (<code translate="no">nprobe</code>), los resultados de la búsqueda de similitud se basan en comparaciones entre la entrada de destino y los vectores del clúster o clústeres más similares, lo que reduce drásticamente el tiempo de consulta.</p>
<p>Ajustando <code translate="no">nprobe</code>, se puede encontrar un equilibrio ideal entre precisión y velocidad para un escenario determinado. El tiempo de consulta aumenta bruscamente a medida que aumentan tanto el número de vectores de entrada objetivo (<code translate="no">nq</code>), como el número de clusters a buscar (<code translate="no">nprobe</code>).</p>
<p>BIN_IVF_FLAT es el índice BIN_IVF más básico, y los datos codificados almacenados en cada unidad son coherentes con los datos originales.</p>
<ul>
<li><p>Parámetros de construcción del índice</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Número de unidades de clúster</td><td>[1, 65536]</td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>Número de unidades a consultar</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Búsqueda por rangos</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Gama</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Número máximo de buckets que no devuelven ningún resultado de búsqueda.<br/>Este es un parámetro de búsqueda por rango y termina el proceso de búsqueda cuando el número de buckets vacíos consecutivos alcanza el valor especificado.<br/>Aumentar este valor puede mejorar la tasa de recuperación a costa de aumentar el tiempo de búsqueda.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
</div>
<div class="filter-sparse">
<h3 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX</h3><p>Cada dimensión mantiene una lista de vectores que tienen un valor distinto de cero en esa dimensión. Durante la búsqueda, Milvus itera por cada dimensión del vector de consulta y calcula las puntuaciones de los vectores que tienen valores distintos de cero en esas dimensiones.</p>
<ul>
<li><p>Parámetros de creación de índices</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">inverted_index_algo</code></td><td>El algoritmo utilizado para construir y consultar el índice. Para más detalles, consulte <a href="/docs/es/v2.5.x/sparse_vector.md#Set-index-params-for-vector-field">Vector disperso</a>.</td><td><code translate="no">DAAT_MAXSCORE</code> (por defecto), <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code></td></tr>
<tr><td><code translate="no">bm25_k1</code></td><td>Controla la saturación de la frecuencia de términos. Los valores más altos aumentan la importancia de las frecuencias de términos en la clasificación de documentos.</td><td>[1.2, 2.0]</td></tr>
<tr><td><code translate="no">bm25_b</code></td><td>Controla el grado de normalización de la longitud del documento. El valor predeterminado es 0,75.</td><td>[0, 1]</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>El parámetro <code translate="no">drop_ratio_build</code> está obsoleto desde Milvus v2.5.4, que aún puede aceptarse durante la construcción del índice, pero ya no tendrá efecto real sobre el índice.</p>
  </div>
</li>
<li><p>Parámetros de búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>Proporción de valores vectoriales pequeños que se excluyen durante el proceso de búsqueda. Esta opción permite afinar el proceso de búsqueda especificando la proporción de los valores más pequeños del vector de consulta que deben ignorarse. Ayuda a equilibrar la precisión y el rendimiento de la búsqueda. Cuanto menor sea el valor establecido para <code translate="no">drop_ratio_search</code>, menos contribuirán estos valores pequeños a la puntuación final. Al ignorar algunos valores pequeños, se puede mejorar el rendimiento de la búsqueda con un impacto mínimo en la precisión.</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">¿Cuál es la diferencia entre el índice FLAT y el índice IVF_FLAT?</font></summary></p>
<p>El índice IVF_FLAT divide un espacio vectorial en <code translate="no">nlist</code> clusters. Si mantiene el valor por defecto de <code translate="no">nlist</code> como 16384, Milvus compara las distancias entre el vector objetivo y los centros de todos los 16384 clusters para obtener <code translate="no">nprobe</code> clusters más cercanos. Luego Milvus compara las distancias entre el vector objetivo y los vectores en los clusters seleccionados para obtener los vectores más cercanos. A diferencia de IVF_FLAT, FLAT compara directamente las distancias entre el vector objetivo y todos y cada uno de los vectores.</p>
<p>
Por lo tanto, cuando el número total de vectores es aproximadamente igual a <code translate="no">nlist</code>, IVF_FLAT y FLAT tienen poca diferencia en la forma de cálculo requerida y en el rendimiento de la búsqueda. Pero a medida que el número de vectores crece hasta dos veces, tres veces o n veces <code translate="no">nlist</code>, el índice IVF_FLAT empieza a mostrar ventajas cada vez mayores.</p>
<p>
Consulte <a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">Cómo elegir un índice en Milvus</a> para obtener más información.</p>
</details>
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Obtenga más información sobre <a href="/docs/es/v2.5.x/metric.md">las métricas de similitud</a> admitidas en Milvus.</li>
</ul>
