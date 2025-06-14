---
id: gpu-index-overview.md
title: Visión general del índice GPU
summary: >-
  La creación de un índice con soporte para GPU en Milvus puede mejorar
  significativamente el rendimiento de la búsqueda en escenarios de alto
  rendimiento y alta recuperación.
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">Visión general del índice GPU<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>La creación de un índice compatible con la GPU en Milvus puede mejorar significativamente el rendimiento de la búsqueda en escenarios de alto rendimiento y alta recuperación.</p>
<p>La siguiente figura compara el rendimiento de las consultas (consultas por segundo) de varias configuraciones de índices en diferentes configuraciones de hardware, conjuntos de datos vectoriales (Cohere y OpenAI) y tamaños de lotes de búsqueda, lo que demuestra que <code translate="no">GPU_CAGRA</code> supera sistemáticamente a otros métodos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
   </span> <span class="img-wrapper"> <span>Rendimiento del índice Gpu</span> </span></p>
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
<li><p>Para <code translate="no">GPU_IVF_FLAT</code>, el valor máximo para <code translate="no">limit</code> es 1.024.</p></li>
<li><p>Para <code translate="no">GPU_IVF_PQ</code> y <code translate="no">GPU_CAGRA</code>, el valor máximo para <code translate="no">limit</code> es 1.024.</p></li>
<li><p><code translate="no">limit</code> Aunque no hay un valor establecido para <code translate="no">GPU_BRUTE_FORCE</code>, se recomienda no superar los 4.096 para evitar posibles problemas de rendimiento.</p></li>
<li><p>Actualmente, los índices GPU no admiten la distancia <code translate="no">COSINE</code>. Si se necesita la distancia <code translate="no">COSINE</code>, los datos deben normalizarse primero y, a continuación, puede utilizarse la distancia de producto interno (IP) como sustituto.</p></li>
<li><p>La carga de la protección OOM para los índices de la GPU no está totalmente soportada, demasiados datos podrían provocar fallos en el QueryNode.</p></li>
<li><p>Los índices GPU no soportan funciones de búsqueda como la <a href="/docs/es/range-search.md">búsqueda por rango</a> y la <a href="/docs/es/grouping-search.md">búsqueda por agrupación</a>.</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">Tipos de índices GPU soportados<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
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
    </button></h2><p>La siguiente tabla enumera los tipos de índice GPU soportados por Milvus.</p>
<table>
   <tr>
     <th><p>Tipo de índice</p></th>
     <th><p>Descripción</p></th>
     <th><p>Uso de memoria</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/es/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>GPU_CAGRA es un índice basado en grafos optimizado para GPUs. El uso de GPUs de grado de inferencia para ejecutar la versión Milvus GPU puede ser más rentable en comparación con el uso de GPUs caras de grado de entrenamiento.</p></td>
     <td><p>El uso de memoria es aproximadamente 1,8 veces superior al de los datos vectoriales originales.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLAT es el índice IVF más básico, y los datos codificados almacenados en cada unidad son coherentes con los datos originales. Al realizar búsquedas, tenga en cuenta que puede establecer el top-k (<code translate="no">limit</code>) hasta 256 para cualquier búsqueda contra una colección indexada en GPU_IVF_FLAT.</p></td>
     <td><p>Requiere una memoria igual al tamaño de los datos originales.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>GPU_IVF_PQ realiza la agrupación de índices IVF antes de cuantificar el producto de vectores. Al realizar búsquedas, tenga en cuenta que puede establecer el top-k (<code translate="no">limit</code>) hasta 8.192 para cualquier búsqueda contra una colección indexada GPU_IVF_FLAT.</p></td>
     <td><p>Utiliza una menor huella de memoria, que depende de la configuración de los parámetros de compresión.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/gpu-brute-force.md">GPU_BRUTE_FORCE</a></p></td>
     <td><p>GPU_BRUTE_FORCE está diseñado para casos en los que es crucial obtener una recuperación extremadamente alta, garantizando una recuperación de 1 al comparar cada consulta con todos los vectores del conjunto de datos. Sólo requiere el tipo de métrica (<code translate="no">metric_type</code>) y top-k (<code translate="no">limit</code>) como parámetros de creación y búsqueda de índices.</p></td>
     <td><p>Requiere una memoria igual al tamaño de los datos originales.</p></td>
   </tr>
</table>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">Configurar los ajustes de Milvus para el control de la memoria de la GPU<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus utiliza un pool de memoria gráfica global para asignar memoria a la GPU. Admite dos parámetros <code translate="no">initMemSize</code> y <code translate="no">maxMemSize</code> en el <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">archivo de configuración de Milvus</a>. El tamaño del pool se establece inicialmente en <code translate="no">initMemSize</code>, y se ampliará automáticamente a <code translate="no">maxMemSize</code> una vez superado este límite.</p>
<p>El valor por defecto <code translate="no">initMemSize</code> es 1/2 de la memoria GPU disponible cuando Milvus se inicia, y el valor por defecto <code translate="no">maxMemSize</code> es igual a toda la memoria GPU disponible.</p>
<p>Hasta Milvus 2.4.1, Milvus utiliza un pool de memoria GPU unificado. Para versiones anteriores a la 2.4.1, se recomendaba poner ambos valores a 0.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>A partir de Milvus 2.4.1, el pool de memoria de la GPU sólo se utiliza para datos temporales de la GPU durante las búsquedas. Por lo tanto, se recomienda establecerla en 2048 y 4096.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Para saber cómo construir un índice GPU, consulte la guía específica para cada tipo de índice.</p>
<h2 id="FAQ" class="common-anchor-header">PREGUNTAS FRECUENTES<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>¿Cuándo es apropiado utilizar un índice GPU?</strong></p>
<p>Un índice de GPU es especialmente beneficioso en situaciones que exigen un alto rendimiento o una alta recuperación. Por ejemplo, cuando se trata de grandes lotes, el rendimiento de la indexación en la GPU puede superar hasta 100 veces el de la indexación en la CPU. En situaciones con lotes más pequeños, los índices de la GPU siguen superando significativamente a los de la CPU en términos de rendimiento. Además, si se requiere una rápida inserción de datos, la incorporación de una GPU puede acelerar sustancialmente el proceso de creación de índices.</p></li>
<li><p><strong>¿En qué escenarios son más adecuados los índices para GPU como GPU_CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT y GPU_BRUTE_FORCE?</strong></p>
<p><code translate="no">GPU_CAGRA</code> Los índices GPU_CAGRA son ideales para escenarios que exigen un mayor rendimiento, aunque a costa de consumir más memoria. Para entornos en los que la conservación de la memoria es una prioridad, el índice <code translate="no">GPU_IVF_PQ</code> puede ayudar a minimizar los requisitos de almacenamiento, aunque esto conlleva una mayor pérdida de precisión. El índice <code translate="no">GPU_IVF_FLAT</code> sirve como opción equilibrada, ofreciendo un compromiso entre rendimiento y consumo de memoria. Por último, el índice <code translate="no">GPU_BRUTE_FORCE</code> está diseñado para operaciones de búsqueda exhaustiva, garantizando una tasa de recuperación de 1 mediante la realización de búsquedas transversales.</p></li>
</ul>
