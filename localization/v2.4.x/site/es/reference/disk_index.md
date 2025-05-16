---
id: disk_index.md
related_key: disk_index
summary: Mecanismo de índice de disco en Milvus.
title: Índice en disco
---
<h1 id="On-disk-Index" class="common-anchor-header">Índice en disco<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Este artículo presenta un algoritmo de indexación en disco llamado DiskANN. Basado en gráficos Vamana, DiskANN permite realizar búsquedas eficaces en grandes conjuntos de datos.</p>
<p>Para mejorar el rendimiento de las consultas, puede <a href="/docs/es/v2.4.x/index-vector-fields.md">especificar un tipo de índice</a> para cada campo vectorial.</p>
<div class="alert note"> 
Actualmente, un campo vectorial sólo admite un tipo de índice. Milvus elimina automáticamente el índice antiguo al cambiar el tipo de índice.</div>
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
    </button></h2><p>Para utilizar DiskANN, tenga en cuenta que</p>
<ul>
<li>DiskANN está desactivado por defecto. Si prefiere el índice en memoria al índice en disco, se recomienda desactivar esta función para obtener un mejor rendimiento.<ul>
<li>Para desactivarla, puede cambiar <code translate="no">queryNode.enableDisk</code> a <code translate="no">false</code> en su archivo de configuración de milvus.</li>
<li>Para habilitarla de nuevo, puede cambiar <code translate="no">queryNode.enableDisk</code> por <code translate="no">true</code>.</li>
</ul></li>
<li>La instancia de Milvus funciona en Ubuntu 18.04.6 o una versión posterior.</li>
<li>La ruta de datos de Milvus debería montarse en un SSD NVMe para un rendimiento completo:<ul>
<li>Para una instancia Milvus Standalone, la ruta de datos debe ser <strong>/var/lib/milvus/data</strong> en el contenedor donde se ejecuta la instancia.</li>
<li>Para una instancia Milvus Cluster, la ruta de datos debe ser <strong>/var/lib/milvus/data</strong> en los contenedores donde se ejecutan los QueryNodes y los IndexNodes.</li>
</ul></li>
</ul>
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
    </button></h2><p>Para utilizar DiskANN, asegúrese de que</p>
<ul>
<li>Utilice sólo vectores flotantes con al menos 1 dimensión en sus datos.</li>
<li>Utilice únicamente la distancia euclidiana (L2), el producto interior (IP) o COSINE para medir la distancia entre vectores.</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">Parámetros de índice y búsqueda<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
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
<li><p>Parámetros de creación de índices</p>
<p>Al crear un índice DiskANN, utilice <code translate="no">DISKANN</code> como tipo de índice. No son necesarios parámetros de índice.</p></li>
<li><p>Parámetros de búsqueda</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>Tamaño de la lista de candidatos, un tamaño mayor ofrece una mayor tasa de recuperación con un rendimiento degradado.</td><td>[topk, int32_max]</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">Configuraciones de Milvus relacionadas con DiskANN<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANN es ajustable. Puede modificar los parámetros relacionados con DiskANN en <code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code> para mejorar su rendimiento.</p>
<pre><code translate="no" class="language-YAML">...
DiskIndex:
  MaxDegree: 56
  SearchListSize: 100
  PQCodeBugetGBRatio: 0.125
  SearchCacheBudgetGBRatio: 0.125
  BeamWidthRatio: 4.0
...
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parámetro</th><th>Descripción</th><th>Rango de valores</th><th>Valor por defecto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>Grado máximo del gráfico Vamana. <br/> Un valor mayor ofrece una mayor tasa de recuperación, pero aumenta el tamaño y el tiempo de construcción del índice.</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>Tamaño de la lista de candidatos. <br/> Un valor mayor incrementa el tiempo empleado en construir el índice pero ofrece una mayor tasa de recuperación. <br/> Ajústalo a un valor menor que <code translate="no">MaxDegree</code> a menos que necesites reducir el tiempo de construcción del índice.</td><td>[1, int32_max]</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>Límite de tamaño del código PQ. <br/> Un valor mayor ofrece una mayor tasa de recuperación, pero aumenta el uso de memoria.</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>Relación entre los números de los nodos almacenados en caché y los datos sin procesar. <br/> Un valor mayor mejora el rendimiento de la creación de índices, pero aumenta el uso de memoria.</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>Relación entre el número máximo de peticiones IO por iteración de búsqueda y el número de CPU.</td><td>[1, max(128 / número de CPU, 16)]</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">Solución de problemas<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
<li><p>¿Cómo solucionar el error <code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code>?</p>
<p>El kernel de Linux proporciona la característica de E/S asíncrona no bloqueante (AIO) que permite a un proceso iniciar múltiples operaciones de E/S simultáneamente sin tener que esperar a que ninguna de ellas se complete. Esto ayuda a aumentar el rendimiento de las aplicaciones que pueden solapar el procesamiento y la E/S.</p>
<p>El rendimiento puede ajustarse utilizando el archivo virtual <code translate="no">/proc/sys/fs/aio-max-nr</code> en el sistema de archivos proc. El parámetro <code translate="no">aio-max-nr</code> determina el número máximo de peticiones concurrentes permitidas.</p>
<p>El valor por defecto de <code translate="no">aio-max-nr</code> es <code translate="no">65535</code>, puede configurarse hasta <code translate="no">10485760</code>.</p></li>
</ul>
