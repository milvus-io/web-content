---
id: tiered-storage-overview.md
title: Visión general del almacenamiento por nivelesCompatible with Milvus 2.6.4+
summary: >-
  In Milvus, the traditional full-load mode requires each QueryNode to load all
  schema fields and indexes of a segment at initialization, even data that may
  never be accessed. This ensures immediate data availability but often leads to
  wasted resources, including high memory usage, heavy disk activity, and
  significant I/O overhead, especially when handling large-scale datasets.
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">Visión general del almacenamiento por niveles<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>En Milvus, el <strong>modo</strong> tradicional <strong>de carga completa</strong> requiere que cada QueryNode cargue todos los campos del esquema y los índices de un <a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">segmento</a> en la inicialización, incluso los datos a los que puede que nunca se acceda. Esto garantiza la disponibilidad inmediata de los datos, pero a menudo conduce a un desperdicio de recursos, incluyendo un alto uso de memoria, una gran actividad de disco y una sobrecarga significativa de E/S, especialmente cuando se manejan conjuntos de datos a gran escala.</p>
<p><strong>El almacenamiento por niveles</strong> resuelve este problema desvinculando la caché de datos de la carga de segmentos. En lugar de cargar todos los datos a la vez, Milvus introduce una capa de almacenamiento en caché que distingue entre datos calientes (almacenados localmente) y datos fríos (almacenados remotamente). El QueryNode carga ahora sólo metadatos ligeros inicialmente y extrae o desaloja dinámicamente los datos bajo demanda. Esto reduce significativamente el tiempo de carga, optimiza la utilización de los recursos locales y permite a los QueryNodes procesar conjuntos de datos que superan con creces su memoria física o su capacidad de disco.</p>
<p>Puede considerar habilitar el Almacenamiento por Niveles en escenarios como:</p>
<ul>
<li><p>Colecciones que superan la memoria disponible o la capacidad NVMe de un único QueryNode.</p></li>
<li><p>Cargas de trabajo analíticas o por lotes en las que una carga más rápida es más importante que la latencia de la primera consulta</p></li>
<li><p>Cargas de trabajo mixtas que pueden tolerar pérdidas ocasionales de caché para datos a los que se accede con menos frecuencia.</p></li>
</ul>
<div class="alert note">
<p>Para obtener más información sobre segmentos y chunks, consulte <a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">Explicación de los segmentos</a>.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">Cómo funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>El almacenamiento por niveles cambia la forma en que QueryNode gestiona los datos de los segmentos. En lugar de almacenar en caché cada campo e índice en el momento de la carga, QueryNode carga ahora sólo <strong>los metadatos</strong> y utiliza una capa de almacenamiento en caché para recuperar y desalojar los datos dinámicamente.</p>
<div class="alert note">
<p><strong>Los metadatos</strong> incluyen esquemas, definiciones de índices, mapas de trozos, recuentos de filas y referencias a objetos remotos. Estos datos son pequeños, siempre se almacenan en caché y nunca se desalojan.</p>
</div>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">Modo de carga completa frente al modo de almacenamiento por niveles<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Aunque los modos de carga completa y almacenamiento por niveles manejan los mismos datos, difieren en cuándo y cómo QueryNode almacena en caché estos componentes.</p>
<ul>
<li><p><strong>Modo</strong> de<strong>carga completa</strong>: En el momento de la carga, QueryNode almacena en caché todos los datos de la colección, incluidos los metadatos, los datos de campo y los índices, desde el almacenamiento de objetos.</p></li>
<li><p><strong>Modo</strong> de<strong>almacenamiento por niveles</strong>: En el momento de la carga, QueryNode sólo almacena en caché los metadatos. Los datos de campo se extraen bajo demanda con una granularidad de trozos. Los archivos de índice permanecen remotos hasta que la primera consulta los necesita; entonces se obtiene y almacena en caché el índice completo por segmento.</p></li>
</ul>
<p>El siguiente diagrama muestra estas diferencias.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-load-mode-vs-tiered-storage-mode.png" alt="Full Load Mode Vs Tiered Storage Mode" class="doc-image" id="full-load-mode-vs-tiered-storage-mode" />
   </span> <span class="img-wrapper"> <span>Modo de carga completa frente al modo de almacenamiento por niveles</span> </span></p>
<h3 id="QueryNode-loading-workflow" class="common-anchor-header">Flujo de trabajo de carga de QueryNode<button data-href="#QueryNode-loading-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>En el almacenamiento por niveles, el flujo de trabajo consta de tres fases:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-loading-workflow.png" alt="Querynode Loading Workflow" class="doc-image" id="querynode-loading-workflow" />
   </span> <span class="img-wrapper"> <span>Flujo de trabajo de carga de Querynode</span> </span></p>
<h4 id="Lazy-load" class="common-anchor-header">Carga perezosa</h4><p>En la inicialización, Milvus realiza una carga lenta, almacenando en caché sólo <strong>los metadatos</strong> que contienen definiciones de esquemas, información de índices, asignaciones de trozos y recuentos de filas.</p>
<p>En esta fase no se descargan datos de campo ni archivos de índice. De este modo, las colecciones pueden consultarse rápidamente y se minimiza el uso de recursos al inicio.</p>
<p><strong>Ventajas</strong></p>
<ul>
<li><p>Tiempo de carga de las colecciones significativamente más rápido</p></li>
<li><p>Ocupación mínima de memoria y disco</p></li>
<li><p>Permite a los QueryNodes gestionar más segmentos simultáneamente.</p></li>
</ul>
<p><strong>Configuración</strong></p>
<p>Se aplica automáticamente cuando se activa el almacenamiento por niveles. No es necesaria ninguna configuración manual.</p>
<h4 id="Partial-load" class="common-anchor-header">Carga parcial</h4><p>Cuando se inicia una operación de consulta o búsqueda, el QueryNode realiza una carga parcial, obteniendo sólo los segmentos de campos o índices necesarios del almacenamiento de objetos y almacenándolos temporalmente en caché para su reutilización.</p>
<ul>
<li><p><strong>Campos</strong>: Cargados bajo demanda a nivel de <strong>chunk</strong> </p></li>
<li><p><strong>Índices:</strong> Se cargan la primera vez que se accede a ellos a nivel de <strong>segmento</strong>.</p></li>
</ul>
<p><strong>Ventajas</strong></p>
<ul>
<li><p>Reduce la presión sobre la memoria y el disco</p></li>
<li><p>Permite a Milvus consultar grandes conjuntos de datos de forma eficiente</p></li>
<li><p>Equilibra la latencia de la consulta y la eficiencia de los recursos</p></li>
</ul>
<p><strong>Configuración</strong></p>
<p>La carga parcial es el comportamiento por defecto cuando el almacenamiento por niveles está activado. Para minimizar la latencia de primer golpe para los campos o índices críticos, utilice <strong>Warm Up</strong> para precargar los datos antes de las consultas. Consulte <a href="/docs/es/warm-up.md">Warm</a> Up para ver ejemplos de configuración.</p>
<h4 id="Eviction" class="common-anchor-header">Desalojo</h4><p>Para mantener un uso saludable de los recursos, Milvus libera automáticamente los datos en caché no utilizados cuando se alcanzan los umbrales.</p>
<p>El desalojo sigue una política <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">de Uso Menos Reciente (LRU</a> ) y se rige por parámetros configurables:</p>
<ul>
<li><p><strong>Marcas de agua:</strong> Define los umbrales de inicio y fin del desalojo.</p></li>
<li><p><strong>TTL de la caché:</strong> elimina los elementos obsoletos de la caché una vez transcurrido un tiempo determinado.</p></li>
<li><p><strong>Ratio de sobrecompromiso:</strong> Permite la sobresuscripción temporal antes de que se acelere el desalojo</p></li>
</ul>
<p><strong>Ventajas</strong></p>
<ul>
<li><p>Mantiene estable el uso de la caché en todas las cargas de trabajo</p></li>
<li><p>Maximiza la reutilización de la caché y evita las caídas.</p></li>
<li><p>Mantiene un rendimiento predecible a lo largo del tiempo</p></li>
</ul>
<p><strong>Configuración</strong></p>
<p>Habilite y ajuste los parámetros de desalojo en <code translate="no">milvus.yaml</code>. Consulte <a href="/docs/es/eviction.md">Eviction</a> para obtener información detallada sobre la configuración.</p>
<h2 id="Getting-started" class="common-anchor-header">Introducción<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Milvus 2.6.4+</p></li>
<li><p>QueryNodes con memoria y recursos de disco dedicados</p></li>
<li><p>Backend de almacenamiento de objetos (S3, MinIO, etc.)</p></li>
</ul>
<div class="alert warning">
<p>Los recursos de QueryNode no deben compartirse con otras cargas de trabajo. Los recursos compartidos pueden hacer que Tiered Storage evalúe erróneamente la capacidad disponible, provocando fallos.</p>
</div>
<h3 id="Basic-configuration-template" class="common-anchor-header">Plantilla de configuración básica<button data-href="#Basic-configuration-template" class="anchor-icon" translate="no">
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
    </button></h3><p>Edite el archivo de configuración de Milvus (<code translate="no">milvus.yaml</code>) para configurar los ajustes de Tiered Storage:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Warm Up Configuration</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar field data</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar indexes</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>   <span class="hljs-comment"># Don&#x27;t preload vector field data (large)</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload vector indexes</span>
      
      <span class="hljs-comment"># Eviction Configuration</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      
      <span class="hljs-comment"># Memory Watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>   <span class="hljs-comment"># Stop evicting at 75%</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>  <span class="hljs-comment"># Start evicting at 80%</span>
      
      <span class="hljs-comment"># Disk Watermarks  </span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>
      
      <span class="hljs-comment"># Cache TTL (7 days)</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
      
      <span class="hljs-comment"># Overcommit Ratios</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Next-steps" class="common-anchor-header">Pasos siguientes<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Configure Warm Up</strong> - Optimice la precarga para sus patrones de acceso. Consulte <a href="/docs/es/warm-up.md">Warm Up</a>.</p></li>
<li><p><strong>Configure</strong> el<strong>desalojo</strong> - Establezca marcas de agua y TTL apropiados para sus limitaciones de recursos. Consulte <a href="/docs/es/eviction.md">Desalojo</a>.</p></li>
<li><p><strong>Supervisar el rendimiento</strong>: realice un seguimiento de los índices de aciertos de la caché, la frecuencia de desalojo y los patrones de latencia de las consultas.</p></li>
<li><p><strong>Iterar la configuración</strong>: ajuste la configuración en función de las características observadas de la carga de trabajo.</p></li>
</ol>
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
    </button></h2><h3 id="Can-I-change-Tiered-Storage-parameters-at-runtime" class="common-anchor-header">¿Puedo cambiar los parámetros de almacenamiento por niveles en tiempo de ejecución?<button data-href="#Can-I-change-Tiered-Storage-parameters-at-runtime" class="anchor-icon" translate="no">
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
    </button></h3><p>No. Todos los parámetros deben configurarse en <code translate="no">milvus.yaml</code> antes de iniciar Milvus. Los cambios requieren un reinicio para que surtan efecto.</p>
<h3 id="Does-Tiered-Storage-affect-data-durability" class="common-anchor-header">¿Afecta el almacenamiento por niveles a la durabilidad de los datos?<button data-href="#Does-Tiered-Storage-affect-data-durability" class="anchor-icon" translate="no">
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
    </button></h3><p>No. La persistencia de los datos sigue siendo gestionada por el almacenamiento remoto de objetos. El almacenamiento por niveles sólo gestiona el almacenamiento en caché en los QueryNodes.</p>
<h3 id="Will-queries-always-be-faster-with-Tiered-Storage" class="common-anchor-header">¿Serán siempre más rápidas las consultas con el almacenamiento por niveles?<button data-href="#Will-queries-always-be-faster-with-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>No necesariamente. El almacenamiento por niveles reduce el tiempo de carga y el uso de recursos, pero las consultas que tocan datos no almacenados en caché (fríos) pueden experimentar una mayor latencia. Para cargas de trabajo sensibles a la latencia, se recomienda el modo de carga completa.</p>
<h3 id="Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="common-anchor-header">¿Por qué un QueryNode se queda sin recursos incluso con el almacenamiento por niveles activado?<button data-href="#Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="anchor-icon" translate="no">
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
    </button></h3><p>Dos causas comunes:</p>
<ul>
<li><p>El QueryNode fue configurado con muy pocos recursos. Las marcas de agua son relativas a los recursos disponibles, por lo que un aprovisionamiento insuficiente amplifica los errores de cálculo.</p></li>
<li><p>Los recursos del QueryNode se comparten con otras cargas de trabajo, por lo que el almacenamiento por niveles no puede evaluar correctamente la capacidad real disponible.</p></li>
</ul>
<h3 id="Why-do-some-queries-fail-under-high-concurrency" class="common-anchor-header">¿Por qué fallan algunas consultas cuando hay mucha concurrencia?<button data-href="#Why-do-some-queries-fail-under-high-concurrency" class="anchor-icon" translate="no">
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
    </button></h3><p>Si demasiadas consultas acceden a datos calientes al mismo tiempo, es posible que se superen los límites de recursos de QueryNode. Algunos hilos pueden fallar debido a tiempos de espera de reserva de recursos. Si se reintenta cuando la carga disminuye, o si se asignan más recursos, esto puede resolverse.</p>
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">¿Por qué aumenta la latencia de búsqueda/consulta después de activar el almacenamiento por niveles?<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Las posibles causas son:</p>
<ul>
<li><p>Consultas frecuentes a datos fríos, que deben obtenerse del almacenamiento.</p></li>
<li><p>Un ratio de sobrecompromiso demasiado alto, que provoca desalojos frecuentes.</p></li>
<li><p>Marcas de agua demasiado próximas entre sí, que provocan frecuentes desalojos sincrónicos.</p></li>
</ul>
<h3 id="Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="common-anchor-header">¿Puede el almacenamiento por niveles gestionar datos ilimitados sobrecomprometiendo la caché?<button data-href="#Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="anchor-icon" translate="no">
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
    </button></h3><p>No. Los ratios de sobrecompromiso permiten a los nodos de consulta trabajar con más segmentos de los que permite la memoria física, pero unos ratios excesivamente altos pueden provocar desalojos frecuentes, colapsos de la caché o fallos en las consultas.</p>
