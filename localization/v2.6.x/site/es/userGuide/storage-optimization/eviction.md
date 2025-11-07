---
id: eviction.md
title: DesalojoCompatible with Milvus 2.6.4+
summary: >-
  El desalojo gestiona los recursos de caché de cada QueryNode en Milvus. Cuando
  está activado, elimina automáticamente los datos almacenados en caché una vez
  que se alcanzan los umbrales de recursos, lo que garantiza un rendimiento
  estable y evita el agotamiento de la memoria o el disco.
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">Desalojo<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>El desalojo gestiona los recursos de caché de cada QueryNode en Milvus. Cuando está activado, elimina automáticamente los datos almacenados en caché una vez que se alcanzan los umbrales de recursos, garantizando un rendimiento estable y evitando el agotamiento de la memoria o del disco.</p>
<p>El desalojo utiliza una política <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">de uso menos reciente (LRU</a> ) para recuperar espacio en la caché. Los metadatos siempre se almacenan en caché y nunca se desalojan, ya que son esenciales para la planificación de consultas y suelen ser pequeños.</p>
<div class="alert note">
<p>El desalojo debe activarse explícitamente. Sin configuración, los datos almacenados en caché seguirán acumulándose hasta que se agoten los recursos.</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">Tipos de desalojo<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus admite dos modos de desalojo complementarios<strong>(sync</strong> y <strong>async</strong>) que funcionan conjuntamente para una gestión óptima de los recursos:</p>
<table>
   <tr>
     <th><p>Async</p></th>
     <th><p>Desalojo Sync</p></th>
     <th><p>Desalojo asíncrono</p></th>
   </tr>
   <tr>
     <td><p>Disparador</p></td>
     <td><p>Se produce durante la consulta o búsqueda cuando el uso de memoria o disco supera los límites internos.</p></td>
     <td><p>Activado por un subproceso en segundo plano cuando el uso supera la marca de agua alta o cuando los datos almacenados en caché alcanzan su tiempo de vida (TTL).</p></td>
   </tr>
   <tr>
     <td><p>Comportamiento</p></td>
     <td><p>Las operaciones de consulta o búsqueda se detienen temporalmente mientras el QueryNode recupera espacio en la caché. El desalojo continúa hasta que el uso cae por debajo de la marca de agua baja o se produce un tiempo de espera. Si se alcanza el tiempo de espera y no se pueden recuperar datos suficientes, la consulta o búsqueda puede fallar.</p></td>
     <td><p>Se ejecuta periódicamente en segundo plano, desalojando proactivamente los datos almacenados en caché cuando el uso supera la marca de agua alta o cuando los datos caducan en función del TTL. El desalojo continúa hasta que el uso cae por debajo de la marca de agua baja. Las consultas no se bloquean.</p></td>
   </tr>
   <tr>
     <td><p>Lo mejor para</p></td>
     <td><p>Cargas de trabajo que pueden tolerar breves picos de latencia o pausas temporales durante picos de uso. Útil cuando el desalojo asíncrono no puede recuperar espacio con suficiente rapidez.</p></td>
     <td><p>Cargas de trabajo sensibles a la latencia que requieren un rendimiento de consulta suave y predecible. Ideal para la gestión proactiva de recursos.</p></td>
   </tr>
   <tr>
     <td><p>Precauciones</p></td>
     <td><p>Puede provocar breves retrasos en las consultas o tiempos de espera si no se dispone de suficientes datos desalojables.</p></td>
     <td><p>Requiere un ajuste adecuado de las marcas de agua altas/bajas y de los TTL. Ligera sobrecarga del subproceso en segundo plano.</p></td>
   </tr>
   <tr>
     <td><p>Configuración</p></td>
     <td><p>Activado a través de <code translate="no">evictionEnabled: true</code></p></td>
     <td><p>Habilitado a través de <code translate="no">backgroundEvictionEnabled: true</code> (requiere <code translate="no">evictionEnabled: true</code> al mismo tiempo)</p></td>
   </tr>
</table>
<p><strong>Configuración recomendada</strong>:</p>
<ul>
<li><p>Ambos modos de desalojo pueden habilitarse juntos para un equilibrio óptimo, siempre que su carga de trabajo se beneficie del almacenamiento por niveles y pueda tolerar la latencia de obtención relacionada con el desalojo.</p></li>
<li><p>Para pruebas de rendimiento o escenarios de latencia crítica, considere deshabilitar el desalojo por completo para evitar la sobrecarga de búsqueda en la red después del desalojo.</p></li>
</ul>
<div class="alert note">
<p>Para los campos e índices desalojables, la unidad de desalojo coincide con la granularidad de carga: los campos escalares/vectoriales se desalojan por trozo y los índices escalares/vectoriales se desalojan por segmento.</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">Activar la evicción<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p>Configure el desalojo en <code translate="no">queryNode.segcore.tieredStorage</code> en <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Tipo</p></th>
     <th><p>Valores</p></th>
     <th><p>Descripción</p></th>
     <th><p>Caso de uso recomendado</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Interruptor maestro para la estrategia de desalojo. Por defecto <code translate="no">false</code>. Activa el modo de desalojo sincronizado.</p></td>
     <td><p>Siempre se establece en <code translate="no">true</code> en Almacenamiento por niveles.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>Ejecuta el desalojo de forma asíncrona en segundo plano. Requiere <code translate="no">evictionEnabled: true</code>. Por defecto <code translate="no">false</code>.</p></td>
     <td><p>Utilice <code translate="no">true</code> para un rendimiento de consulta más fluido; reduce la frecuencia de desalojo sincronizado.</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">Configurar marcas de agua<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Las marcas de agua definen cuándo comienza y termina el desalojo de la caché, tanto para la memoria como para el disco. Cada tipo de recurso tiene dos umbrales:</p>
<ul>
<li><p><strong>Marca de agua alta</strong>: El desalojo comienza cuando el uso supera este valor.</p></li>
<li><p><strong>Marca de agua baja</strong>: El desalojo continúa hasta que el uso cae por debajo de este valor.</p></li>
</ul>
<div class="alert note">
<p>Esta configuración sólo tiene efecto cuando <a href="/docs/es/eviction.md#Enable-eviction">el desalojo está activado</a>.</p>
</div>
<p><strong>Ejemplo YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Tipo</p></th>
     <th><p>Rango</p></th>
     <th><p>Descripción</p></th>
     <th><p>Caso de uso recomendado</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Nivel de uso de memoria donde se detiene el desalojo.</p></td>
     <td><p>Empieza en <code translate="no">0.75</code>. Bájalo ligeramente si la memoria del QueryNode es limitada.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Nivel de uso de memoria donde comienza el desalojo asíncrono.</p></td>
     <td><p>Empieza en <code translate="no">0.8</code>. Mantén una distancia razonable desde la marca de agua baja (por ejemplo, 0.05-0.10) para evitar disparos frecuentes.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Nivel de uso de disco donde se detiene el desalojo.</p></td>
     <td><p>Empieza en <code translate="no">0.75</code>. Ajústalo a la baja si la E/S de disco es limitada.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>float</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>Nivel de uso de disco donde comienza la evicción asíncrona.</p></td>
     <td><p>Empieza en <code translate="no">0.8</code>. Mantenga un intervalo razonable desde la marca de agua baja (por ejemplo, 0,05-0,10) para evitar disparos frecuentes.</p></td>
   </tr>
</table>
<p><strong>Mejores prácticas</strong>:</p>
<ul>
<li><p>No establezca marcas de agua altas o bajas por encima de ~0,80 para dejar espacio para el uso estático de QueryNode y las ráfagas de tiempo de consulta.</p></li>
<li><p>Evite grandes espacios entre las marcas de agua alta y baja; los grandes espacios prolongan cada ciclo de desalojo y pueden añadir latencia.</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">Configurar el TTL de la caché<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>El tiempo de vida de la caché (TTL)</strong> elimina automáticamente los datos almacenados en caché después de una duración determinada, incluso si no se alcanzan los umbrales de recursos. Funciona junto con el desalojo LRU para evitar que los datos obsoletos ocupen la caché indefinidamente.</p>
<div class="alert note">
<p>Cache TTL requiere <code translate="no">backgroundEvictionEnabled: true</code>, ya que se ejecuta en el mismo hilo de fondo.</p>
</div>
<p><strong>Ejemplo YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Tipo</p></th>
     <th><p>Unidad</p></th>
     <th><p>Descripción</p></th>
     <th><p>Caso de uso recomendado</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>entero</p></td>
     <td><p>segundos</p></td>
     <td><p>Duración antes de que caduquen los datos almacenados en caché. Los elementos caducados se eliminan en segundo plano.</p></td>
     <td><p>Utilice un TTL corto (horas) para datos muy dinámicos; utilice un TTL largo (días) para conjuntos de datos estables. Establezca 0 para desactivar la caducidad basada en el tiempo.</p></td>
   </tr>
</table>
