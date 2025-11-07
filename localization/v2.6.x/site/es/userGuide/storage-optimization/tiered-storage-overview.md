---
id: tiered-storage-overview.md
title: Visión general del almacenamiento por nivelesCompatible with Milvus 2.6.4+
summary: >-
  En Milvus, el modo tradicional de carga completa requiere que cada QueryNode
  cargue todos los campos de datos e índices de un segmento en la
  inicialización, incluso los datos a los que puede que nunca se acceda. Esto
  garantiza la disponibilidad inmediata de los datos, pero a menudo conduce a un
  desperdicio de recursos, incluyendo un alto uso de memoria, una gran actividad
  de disco y una sobrecarga significativa de E/S, especialmente cuando se
  manejan conjuntos de datos a gran escala.
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
    </button></h1><p>En Milvus, el modo tradicional <em>de carga completa</em> requiere que cada QueryNode cargue todos los campos de datos e índices de un <a href="/docs/es/glossary.md#Segment">segmento</a> en la inicialización, incluso los datos a los que puede que nunca se acceda. Esto garantiza la disponibilidad inmediata de los datos, pero a menudo conduce a un desperdicio de recursos, incluyendo un alto uso de memoria, una gran actividad de disco y una sobrecarga significativa de E/S, especialmente cuando se manejan conjuntos de datos a gran escala.</p>
<p><em>El almacenamiento por niveles</em> resuelve este problema desvinculando la caché de datos de la carga de segmentos. En lugar de cargar todos los datos a la vez, Milvus introduce una capa de almacenamiento en caché que distingue entre datos calientes (almacenados localmente) y datos fríos (almacenados remotamente). El QueryNode carga ahora sólo <em>metadatos</em> ligeros inicialmente y extrae o desaloja dinámicamente los datos de campo bajo demanda. Esto reduce significativamente el tiempo de carga, optimiza la utilización de los recursos locales y permite a los QueryNodes procesar conjuntos de datos que superan con creces su memoria física o su capacidad de disco.</p>
<p>Considere la posibilidad de habilitar el almacenamiento por niveles en escenarios como:</p>
<ul>
<li><p>Colecciones que superan la memoria disponible o la capacidad NVMe de un único QueryNode.</p></li>
<li><p>Cargas de trabajo analíticas o por lotes en las que una carga más rápida es más importante que la latencia de la primera consulta</p></li>
<li><p>Cargas de trabajo mixtas que pueden tolerar pérdidas ocasionales de caché para datos a los que se accede con menos frecuencia.</p></li>
</ul>
<div class="alert note">
<ul>
<li><p><em>Los metadatos</em> incluyen esquemas, definiciones de índices, mapas de trozos, recuentos de filas y referencias a objetos remotos. Este tipo de datos es pequeño, siempre se almacena en caché y nunca se desaloja.</p></li>
<li><p>Para más información sobre segmentos y chunks, consulte <a href="/docs/es/glossary.md#Segment">Segmento</a>.</p></li>
</ul>
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
    </button></h2><p>El almacenamiento por niveles cambia la forma en que QueryNode gestiona los datos de segmentos. En lugar de almacenar en caché cada campo e índice en el momento de la carga, QueryNode carga ahora sólo los metadatos y utiliza una capa de almacenamiento en caché para obtener y desalojar los datos dinámicamente.</p>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">Modo de carga completa frente a modo de almacenamiento por niveles<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Aunque los modos de carga completa y almacenamiento por niveles manejan los mismos datos, difieren en <em>cuándo</em> y <em>cómo</em> QueryNode almacena en caché estos componentes.</p>
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
    </button></h3><p>Bajo Almacenamiento por niveles, el flujo de trabajo tiene estas fases:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-load-workflow.png" alt="Querynode Load Workflow" class="doc-image" id="querynode-load-workflow" />
   </span> <span class="img-wrapper"> <span>Flujo de trabajo de carga de Querynode</span> </span></p>
<h4 id="Phase-1-Lazy-load" class="common-anchor-header">Fase 1: Carga perezosa</h4><p>En la inicialización, Milvus realiza una carga lenta, almacenando en caché sólo los metadatos a nivel de segmento, como las definiciones de esquema, la información de índice y las asignaciones de trozos.</p>
<p>En esta fase no se almacenan en caché datos de campo reales ni archivos de índice. De este modo, las colecciones pueden consultarse casi inmediatamente después de iniciarse, con un consumo mínimo de memoria y disco.</p>
<p>Dado que los datos de campo y los archivos de índice permanecen en almacenamiento remoto hasta que se accede a ellos por primera vez, la <em>primera consulta</em> puede experimentar una latencia adicional, ya que los datos necesarios deben obtenerse bajo demanda. Para mitigar este efecto en los campos o índices críticos, puede utilizar la estrategia <a href="/docs/es/tiered-storage-overview.md#Phase-2-Warm-up">Warm Up (Calentamiento</a> ) para precargarlos de forma proactiva antes de que el segmento pueda consultarse.</p>
<p><strong>Configuración</strong></p>
<p>Se aplica automáticamente cuando el almacenamiento por niveles está activado. No es necesaria ninguna configuración manual.</p>
<h4 id="Phase-2-Warm-up" class="common-anchor-header">Fase 2: Calentamiento</h4><p>Para reducir la latencia de primer golpe introducida por <a href="/docs/es/tiered-storage-overview.md#Phase-1-Lazy-load">la carga lenta</a>, Milvus proporciona un mecanismo de <em>Calentamiento</em>.</p>
<p>Antes de que un segmento sea consultable, Milvus puede recuperar y almacenar en caché de forma proactiva campos o índices específicos del almacenamiento de objetos, asegurando que la primera consulta alcance directamente los datos almacenados en caché en lugar de activar la carga bajo demanda.</p>
<p>Durante el calentamiento, los campos se precargarán a nivel de trozo, mientras que los índices se precargarán a nivel de segmento.</p>
<p><strong>Configuración</strong></p>
<p>La configuración del calentamiento se define en la sección Almacenamiento por niveles de <code translate="no">milvus.yaml</code>. Puede activar o desactivar la precarga para cada tipo de campo o índice y especificar la estrategia preferida. Consulte <a href="/docs/es/warm-up.md">Warm Up</a> para obtener configuraciones detalladas.</p>
<h4 id="Phase-3-Partial-load" class="common-anchor-header">Fase 3: Carga parcial</h4><p>Una vez que comienzan las consultas o búsquedas, el QueryNode realiza una <em>carga parcial</em>, obteniendo sólo los fragmentos de datos o archivos de índice necesarios del almacenamiento de objetos.</p>
<ul>
<li><p><strong>Campos</strong>: Cargados bajo demanda a <strong>nivel de chunk</strong>. Sólo se obtienen los trozos de datos que coinciden con las condiciones de consulta actuales, minimizando el uso de E/S y memoria.</p></li>
<li><p><strong>Índices</strong>: Se cargan bajo demanda a nivel de <strong>segmento</strong>. Los archivos de índices deben obtenerse como unidades completas y no pueden dividirse en trozos.</p></li>
</ul>
<p><strong>Configuración</strong></p>
<p>La carga parcial se aplica automáticamente cuando el almacenamiento por niveles está activado. No es necesaria ninguna configuración manual. Para minimizar la latencia de primer golpe para datos críticos, combínelo con <a href="/docs/es/warm-up.md">Warm Up</a>.</p>
<h4 id="Phase-4-Eviction" class="common-anchor-header">Fase 4: Desalojo</h4><p>Para mantener un uso saludable de los recursos, Milvus libera automáticamente los datos en caché no utilizados cuando se alcanzan umbrales específicos.</p>
<p>El desalojo sigue una política <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">de Uso Menos Reciente (LRU</a> ), asegurando que los datos a los que se accede con poca frecuencia se eliminan primero mientras que los datos activos permanecen en la caché.</p>
<p>El desalojo se rige por los siguientes elementos configurables:</p>
<ul>
<li><p><strong>Marcas de agua</strong>: Define umbrales de memoria o disco que activan y detienen el desalojo.</p></li>
<li><p><strong>TTL</strong> de la caché: elimina los datos obsoletos de la caché tras un periodo de inactividad definido.</p></li>
</ul>
<p><strong>Configuración</strong></p>
<p>Habilite y ajuste los parámetros de desalojo en <strong>milvus.yaml</strong>. Consulte <a href="/docs/es/eviction.md">Evicción</a> para una configuración detallada.</p>
<h2 id="Getting-started" class="common-anchor-header">Primeros pasos<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
<p>Para resolver este problema, le recomendamos que asigne recursos dedicados a los QueryNodes.</p>
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
<li><p>Marcas de agua colocadas demasiado cerca, lo que provoca frecuentes desalojos sincrónicos.</p></li>
</ul>
