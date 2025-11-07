---
id: warm-up.md
title: CalentamientoCompatible with Milvus 2.6.4+
summary: >-
  En Milvus, Warm Up complementa el almacenamiento por niveles aliviando la
  latencia de primer impacto que se produce cuando se accede a datos fríos por
  primera vez. Una vez configurado, Warm Up precarga tipos seleccionados de
  campos o índices en la caché antes de que un segmento sea consultable,
  garantizando que los datos a los que se accede con frecuencia estén
  disponibles inmediatamente después de la carga.
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">Calentamiento<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p>En Milvus, <strong>Warm</strong> Up complementa el almacenamiento por niveles aliviando la latencia de primer impacto que se produce cuando se accede a datos fríos por primera vez. Una vez configurado, Warm Up precarga tipos seleccionados de campos o índices en la caché antes de que un segmento sea consultable, garantizando que los datos a los que se accede con frecuencia estén disponibles inmediatamente después de la carga.</p>
<h2 id="Why-warm-up" class="common-anchor-header">Por qué Warm Up<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/es/tiered-storage-overview.md#Phase-1-Lazy-load">La carga lenta</a> en el almacenamiento por niveles mejora la eficiencia al cargar inicialmente sólo los metadatos. Sin embargo, esto puede causar latencia en la primera consulta a datos fríos, ya que los trozos o índices requeridos deben obtenerse del almacenamiento de objetos.</p>
<p><strong>Warm Up</strong> resuelve este problema almacenando proactivamente en caché los datos críticos durante la inicialización del segmento.</p>
<p>Es especialmente beneficioso cuando:</p>
<ul>
<li><p>Determinados índices escalares se utilizan con frecuencia en condiciones de filtro.</p></li>
<li><p>Los índices vectoriales son esenciales para el rendimiento de la búsqueda y deben estar listos inmediatamente.</p></li>
<li><p>La latencia de arranque en frío tras el reinicio del QueryNode o la carga de un nuevo segmento es inaceptable.</p></li>
</ul>
<p>Por el contrario, <strong>no se recomienda</strong> Warm Up para los campos o índices que se consultan con poca frecuencia. Desactivar Warm Up acorta el tiempo de carga del segmento y conserva espacio en la caché, lo que resulta ideal para campos vectoriales grandes o campos escalares no críticos.</p>
<h2 id="Configuration" class="common-anchor-header">Configuración<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>El calentamiento se controla en <code translate="no">queryNode.segcore.tieredStorage.warmup</code> en <code translate="no">milvus.yaml</code>. Puede configurarlo por separado para campos escalares, índices escalares, campos vectoriales e índices vectoriales. Cada objetivo admite dos modos:</p>
<table>
   <tr>
     <th><p>Modo</p></th>
     <th><p>Descripción</p></th>
     <th><p>Escenario típico</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>Carga previa antes de que el segmento pueda consultarse. El tiempo de carga aumenta ligeramente, pero la primera consulta no incurre en latencia.</p></td>
     <td><p>Utilícelo para datos críticos para el rendimiento que deben estar disponibles inmediatamente, como índices escalares de alta frecuencia o índices vectoriales clave utilizados en la búsqueda.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>Omitir la carga previa. El segmento se puede consultar más rápidamente, pero la primera consulta puede activar la carga bajo demanda.</p></td>
     <td><p>Utilícelo para datos de acceso poco frecuente o de gran tamaño, como campos vectoriales sin procesar o campos escalares no críticos.</p></td>
   </tr>
</table>
<p><strong>Ejemplo YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - `sync`: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - `disable`: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to `sync`, except for vector field which defaults to `disable`.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Valores</p></th>
     <th><p>Descripción</p></th>
     <th><p>Caso de uso recomendado</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controla si se precargan los datos de los campos escalares.</p></td>
     <td><p>Utilice <code translate="no">sync</code> sólo si los campos escalares son pequeños y se accede a ellos con frecuencia en los filtros. En caso contrario, <code translate="no">disable</code> para reducir el tiempo de carga.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controla si se precargan los índices escalares.</p></td>
     <td><p>Utilice <code translate="no">sync</code> para índices escalares implicados en condiciones de filtro frecuentes o consultas de rango.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controla si se precargan los datos de campos vectoriales.</p></td>
     <td><p>Generalmente <code translate="no">disable</code> para evitar un uso excesivo de la caché. Active <code translate="no">sync</code> sólo cuando los vectores sin procesar deban recuperarse inmediatamente después de la búsqueda (por ejemplo, resultados de similitud con recuperación de vectores).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Controla si se precargan los índices de vectores.</p></td>
     <td><p>Utilice <code translate="no">sync</code> para los índices vectoriales que son críticos para la latencia de la búsqueda. En cargas de trabajo por lotes o de baja frecuencia, <code translate="no">disable</code> para una preparación más rápida de los segmentos.</p></td>
   </tr>
</table>
<h2 id="Best-practices" class="common-anchor-header">Mejores prácticas<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>El calentamiento sólo afecta a la carga inicial. Si los datos almacenados en caché son desalojados posteriormente, la siguiente consulta los recargará bajo demanda.</p>
<ul>
<li><p>Evite utilizar en exceso <code translate="no">sync</code>. Precargar demasiados campos aumenta el tiempo de carga y la presión sobre la caché.</p></li>
<li><p>Empiece de forma conservadora: active Warm Up sólo para los campos e índices a los que se accede con frecuencia.</p></li>
<li><p>Supervise la latencia de la consulta y las métricas de la caché y, a continuación, amplíe la precarga según sea necesario.</p></li>
<li><p>Para cargas de trabajo mixtas, aplique <code translate="no">sync</code> a las colecciones sensibles al rendimiento y <code translate="no">disable</code> a las orientadas a la capacidad.</p></li>
</ul>
