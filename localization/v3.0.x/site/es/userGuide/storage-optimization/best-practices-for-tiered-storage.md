---
id: best-practices-for-tiered-storage.md
title: >-
  Mejores prácticas para el almacenamiento por nivelesCompatible with Milvus
  2.6.4+
summary: >-
  Milvus proporciona Almacenamiento por niveles para ayudarle a manejar
  eficientemente datos a gran escala a la vez que equilibra la latencia de las
  consultas, la capacidad y el uso de recursos. Esta guía resume las
  configuraciones recomendadas para cargas de trabajo típicas y explica el
  razonamiento que hay detrás de cada estrategia de ajuste.
beta: Milvus 2.6.4+
---
<h1 id="Best-Practices-for-Tiered-Storage" class="common-anchor-header">Mejores prácticas para el almacenamiento por niveles<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Best-Practices-for-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus proporciona Almacenamiento por niveles para ayudarle a manejar eficientemente datos a gran escala a la vez que equilibra la latencia de las consultas, la capacidad y el uso de recursos. Esta guía resume las configuraciones recomendadas para cargas de trabajo típicas y explica el razonamiento detrás de cada estrategia de ajuste.</p>
<h2 id="Before-you-start" class="common-anchor-header">Antes de empezar<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Milvus v2.6.4 o posterior</p></li>
<li><p>Los QueryNodes deben tener recursos locales dedicados (memoria y disco). Los entornos compartidos pueden distorsionar la estimación de la caché y llevar a una estimación errónea del desalojo.</p></li>
</ul>
<h2 id="Choose-the-right-strategy" class="common-anchor-header">Elija la estrategia adecuada<button data-href="#Choose-the-right-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>El almacenamiento por niveles ofrece estrategias flexibles de carga y almacenamiento en caché que pueden combinarse para adaptarse a su carga de trabajo.</p>
<table>
   <tr>
     <th><p>Objetivo</p></th>
     <th><p>Enfoque recomendado</p></th>
     <th><p>Mecanismo clave</p></th>
   </tr>
   <tr>
     <td><p>Minimizar la latencia de la primera consulta</p></td>
     <td><p>Carga previa de campos críticos</p></td>
     <td><p>Calentamiento</p></td>
   </tr>
   <tr>
     <td><p>Gestión eficaz de datos a gran escala</p></td>
     <td><p>Carga bajo demanda</p></td>
     <td><p>Carga lenta + carga parcial</p></td>
   </tr>
   <tr>
     <td><p>Mantener la estabilidad a largo plazo</p></td>
     <td><p>Evitar el desbordamiento de la caché</p></td>
     <td><p>Desalojo</p></td>
   </tr>
   <tr>
     <td><p>Equilibrar rendimiento y capacidad</p></td>
     <td><p>Combinar precarga y caché dinámica</p></td>
     <td><p>Configuración híbrida</p></td>
   </tr>
</table>
<h2 id="Scenario-1-real-time-low-latency-retrieval" class="common-anchor-header">Escenario 1: recuperación en tiempo real y baja latencia<button data-href="#Scenario-1-real-time-low-latency-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Cuándo utilizarlo</strong></p>
<ul>
<li><p>La latencia de la consulta es crítica (por ejemplo, recomendación en tiempo real o clasificación de búsquedas)</p></li>
<li><p>Se accede con frecuencia a los índices vectoriales centrales y a los filtros escalares.</p></li>
<li><p>El rendimiento constante importa más que la velocidad de arranque</p></li>
</ul>
<p><strong>Configuración recomendada</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># scalar field/index warm-up to eliminate first-time latency</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-comment"># warm-up of vector fields is disabled (if the original vector is not required)</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># vector indexes warm-up to elminate first-time latenct</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-comment"># no expiration time, which avoids frequent reloading</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Justificación</strong></p>
<ul>
<li><p>El calentamiento elimina la latencia de primer golpe para los índices escalares y vectoriales de alta frecuencia.</p></li>
<li><p>El desalojo en segundo plano mantiene estable la presión de la caché sin bloquear las consultas.</p></li>
<li><p>La desactivación del TTL de la caché evita recargas innecesarias para los datos calientes.</p></li>
</ul>
<h2 id="Scenario-2-offline-batch-analysis" class="common-anchor-header">Escenario 2: análisis por lotes fuera de línea<button data-href="#Scenario-2-offline-batch-analysis" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Cuándo utilizarlo</strong></p>
<ul>
<li><p>La tolerancia a la latencia de las consultas es alta</p></li>
<li><p>Las cargas de trabajo implican conjuntos de datos masivos o muchos segmentos</p></li>
<li><p>La capacidad y el rendimiento tienen prioridad sobre la capacidad de respuesta</p></li>
</ul>
<p><strong>Configuración recomendada</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># disable scalar field/index warm-up to speed up loading</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># disable vector field/index warm-up to speed up loading</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">disable</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-comment"># use 1 day expiration to clean unused cache</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Justificación</strong></p>
<ul>
<li><p>Desactivar el calentamiento acelera el arranque cuando se inicializan muchos segmentos.</p></li>
<li><p>Las filigranas más altas permiten un uso más denso de la caché, lo que mejora la capacidad de carga total.</p></li>
<li><p>El TTL de la caché limpia automáticamente los datos no utilizados para liberar espacio local.</p></li>
</ul>
<h2 id="Scenario-3-hybrid-deployment-mixed-online-+-offline" class="common-anchor-header">Escenario 3: despliegue híbrido (mixto online + offline)<button data-href="#Scenario-3-hybrid-deployment-mixed-online-+-offline" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Cuándo utilizarlo</strong></p>
<ul>
<li><p>Un único clúster sirve tanto a cargas de trabajo en línea como analíticas</p></li>
<li><p>Algunas colecciones requieren baja latencia, otras priorizan la capacidad</p></li>
</ul>
<p><strong>Estrategia recomendada</strong></p>
<ul>
<li><p>Aplicar la <strong>configuración en tiempo real</strong> a las colecciones sensibles a la latencia</p></li>
<li><p>Aplicar la <strong>configuración fuera de línea</strong> a las colecciones analíticas o de archivo</p></li>
<li><p>Ajustar los ratios evictableMemoryCacheRatio, cacheTtl y watermark de forma independiente para cada tipo de carga de trabajo</p></li>
</ul>
<p><strong>Justificación</strong></p>
<p>La combinación de configuraciones permite un control detallado de la asignación de recursos.</p>
<p>Las colecciones críticas mantienen garantías de baja latencia, mientras que las colecciones secundarias pueden gestionar más segmentos y volumen de datos.</p>
<h2 id="Additional-tuning-tips" class="common-anchor-header">Consejos adicionales de ajuste<button data-href="#Additional-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p>Aspecto</p></th>
     <th><p>Recomendación</p></th>
     <th><p>Explicación</p></th>
   </tr>
   <tr>
     <td><p><strong>Ámbito de calentamiento</strong></p></td>
     <td><p>Precargue sólo los campos o índices con alta frecuencia de consulta.</p></td>
     <td><p>La precarga innecesaria aumenta el tiempo de carga y el uso de recursos.</p></td>
   </tr>
   <tr>
     <td><p><strong>Ajuste del desalojo</strong></p></td>
     <td><p>Comience con las marcas de agua predeterminadas (75-80%) y ajústelas gradualmente.</p></td>
     <td><p>Un intervalo pequeño provoca un desalojo frecuente; un intervalo grande retrasa la liberación de recursos.</p></td>
   </tr>
   <tr>
     <td><p><strong>TTL de caché</strong></p></td>
     <td><p>Desactivar para conjuntos de datos calientes estables; activar (por ejemplo, 1-3 días) para datos dinámicos.</p></td>
     <td><p>Evita la acumulación de datos obsoletos en la caché y equilibra la sobrecarga de limpieza.</p></td>
   </tr>
   <tr>
     <td><p><strong>Ratio de sobrecompromiso</strong></p></td>
     <td><p>Evite valores superiores a 0,7 a menos que el margen de recursos sea grande.</p></td>
     <td><p>Un sobrecompromiso excesivo puede provocar el colapso de la caché y una latencia inestable.</p></td>
   </tr>
   <tr>
     <td><p><strong>Monitorización</strong></p></td>
     <td><p>Controle la tasa de aciertos de la caché, la utilización de los recursos y la frecuencia de desalojo.</p></td>
     <td><p>Las cargas en frío frecuentes pueden indicar que es necesario ajustar el calentamiento o las filigranas.</p></td>
   </tr>
</table>
