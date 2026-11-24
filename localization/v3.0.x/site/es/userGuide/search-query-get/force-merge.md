---
id: force-merge.md
title: Compactación con fusión forzadaCompatible with Milvus 3.0.x
summary: >-
  Utiliza la compactación mediante fusión forzada para consolidar segmentos
  pequeños y mejorar el rendimiento de las consultas y la eficiencia del
  almacenamiento.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Compactación con fusión forzada<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>La fusión forzada está diseñada para consolidar segmentos pequeños y fragmentados en otros menos numerosos y de mayor tamaño, con el fin de mejorar el rendimiento de las consultas y la eficiencia del almacenamiento. En esta guía se explica cómo utilizar la compactación por fusión forzada.</p>
<div class="alert note">
<p>Esta característica se encuentra en versión preliminar pública. No la utilices en entornos de producción.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">maxSize</code> L <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">a compactación</a> estándar mantiene el tamaño de los segmentos cerca del valor configurado en « <code translate="no">maxSize</code> » mediante fusiones de muchos a uno, pero aún así puede dejar fragmentos de tamaño medio que no se pueden fusionar más sin superar los límites. Por ejemplo, tal y como se ilustra a continuación, si una colección tiene cinco segmentos de 2 MB y el « » es de 3 MB, la fusión de dos segmentos cualesquiera superaría el límite, por lo que la compactación estándar no puede reducir aún más el número de segmentos y se mantiene la estructura fragmentada.</p>
<p>La fusión forzada añade un parámetro « <code translate="no">target_size</code> » y permite reorganizar los segmentos hasta alcanzar el tamaño deseado dentro de una tolerancia ajustada, siempre que sea posible. Como se ilustra a continuación, si el « <code translate="no">target_size</code> » especificado es de 4 MB, los cinco segmentos pequeños de 2 MB se pueden fusionar aún más en un número menor de segmentos más grandes. Esto reduce el exceso de segmentos, admite objetivos mayores que la configuración predeterminada de « <code translate="no">maxSize</code> » y, cuando el objetivo es muy grande, permite que el sistema elija un tamaño de salida y un número de segmentos prácticos para el hardware actual y la topología de QueryNode.</p>
<p>Para saber qué método de compactación debe utilizarse, consulte <a href="#faq">las preguntas frecuentes</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" /> 
   <span>R8eow3kaqhktokblcmocnvxmnee</span>
  
 </span></p>
<p>La compactación de fusión forzada amplía la <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API con un parámetro « <code translate="no">target_size</code> ». Es totalmente compatible con versiones anteriores: las llamadas de compactación existentes sin « <code translate="no">target_size</code> » siguen funcionando como antes.</p>
<p>La compactación por fusión forzada funciona de forma asíncrona. No bloquea las operaciones de búsqueda ni de consulta, aunque consume recursos de E/S y memoria durante su ejecución.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Uso de la compactación con fusión forzada<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
<li><p>Milvus versión 3.0 o posterior</p></li>
<li><p>PyMilvus 3.0 o posterior</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">Configuración global<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Los siguientes parámetros de configuración controlan el comportamiento de «Force Merge». Configúralos en el archivo de configuración de Milvus o mediante variables de entorno.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Valor por defecto</p></th>
     <th><p>Descripción</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>1024</p></td>
     <td><p>Tamaño máximo predeterminado de un segmento en MB. Se utiliza como valor de destino cuando ` <code translate="no">target_size</code> ` es 0 o se omite. También sirve como valor mínimo permitido para la opción explícita ` <code translate="no">target_size</code>`.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Umbral del número de segmentos para la selección del algoritmo. Cuando el número de segmentos supera este valor, Milvus utiliza un algoritmo codicioso más rápido para la planificación de la fusión.</p><ul><li><p><strong>Algoritmo estándar</strong> (utilizado cuando el número de segmentos es ≤ <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): produce resultados de fusión más óptimos, pero tarda más en calcularse.</p></li><li><p><strong>Algoritmo codicioso</strong> (utilizado cuando el número de segmentos &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): completa la planificación mucho más rápido a costa de una agrupación de segmentos ligeramente menos óptima.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>La memoria de DataNode se divide por este factor para calcular el tamaño máximo de segmento que el sistema puede permitir.</p><ul><li><p>Un valor mayor asigna menos memoria a la fusión, pero deja más para otras operaciones de DataNode, lo que mejora la estabilidad del nodo.</p></li><li><p>Un valor menor permite fusiones más grandes, pero aumenta la presión sobre la memoria.</p></li><li><p>Por ejemplo, con el factor predeterminado de 4,0 y un DataNode con 16 GB de memoria, el presupuesto de fusión es de 4 GB. Esto significa que el tamaño total de los segmentos que se fusionan en una sola operación no puede superar los 4 GB.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4,0</p></td>
     <td><p>La memoria mínima de un QueryNode se divide por este factor. Se utiliza durante el cálculo automático del tamaño (<code translate="no">target_size=max_int64</code>) para garantizar que los segmentos fusionados puedan ser cargados por los QueryNodes.</p><ul><li><p>Un valor mayor produce segmentos más pequeños que los QueryNodes pueden cargar más fácilmente.</p></li><li><p>Un valor menor permite segmentos más grandes, pero puede provocar errores de carga en los QueryNodes con memoria limitada.</p></li><li><p>Por ejemplo, con el factor predeterminado de 4,0 y el QueryNode más pequeño con 16 GB de memoria, el tamaño objetivo calculado automáticamente no superará los 4 GB. Esto evita que «Force Merge» genere segmentos tan grandes que los QueryNodes no puedan cargarlos.</p></li></ul></td>
   </tr>
</table>
<p>Para aplicar los cambios anteriores a tu clúster de Milvus, sigue los pasos descritos en <a href="/docs/es/configure-helm.md#Configure-Milvus-via-configuration-file">«Configurar Milvus con Helm</a> » y <a href="/docs/es/configure_operator.md">«Configurar Milvus con Milvus Operators</a>».</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Activar la compactación de Force Merge<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>La compactación «Force Merge» se activa llamando a ` <code translate="no">compact()</code> ` con el parámetro ` <code translate="no">target_size</code> `. Para obtener más detalles sobre los parámetros, consulta <a href="#parameter-reference">la «Referencia de parámetros»</a> más abajo.</p>
<p>Hay tres modos de compactación «Force Merge» disponibles:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 1024 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>A continuación se muestran ejemplos que ilustran cómo utilizar cada modo de compactación por fusión forzada.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Predeterminado (compactación estándar)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 1024 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">Tamaño de destino explícito</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">Cálculo automático del tamaño</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">Referencia de parámetros</h4><p>La siguiente tabla explica los parámetros.</p>
<table>
   <tr>
     <th><p><strong>Parámetro</strong></p></th>
     <th><p><strong>Tipo</strong></p></th>
     <th><p><strong>Descripción</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Obligatorio. El nombre de la colección que se va a compactar.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Opcional. El tamaño del segmento de destino en MB. Hay tres opciones para el valor de este parámetro:</p><ul><li><p><strong>0 u omitido</strong>: utiliza el valor configurado en « <code translate="no">dataCoord.segment.maxSize</code> » (por defecto: 1024 MB). Equivalente a la compactación estándar.</p></li><li><p><strong>Valor explícito</strong>: fusiona los segmentos hasta alcanzar aproximadamente el tamaño especificado en MB (p. ej., 2048). Debe ser mayor o igual que el valor de « <code translate="no">dataCoord.segment.maxSize</code> » configurado.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: calcula automáticamente el tamaño óptimo en función de la distribución actual de los segmentos y de los recursos disponibles del nodo.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Si el valor de « <code translate="no">target_size</code> » especificado es menor que el valor configurado de « <code translate="no">dataCoord.segment.maxSize</code> », la solicitud se rechaza con un error.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">Comprobar el progreso de la compactación<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>La compactación «Force Merge» se ejecuta de forma asíncrona. Utilice el ID de trabajo devuelto para comprobar el progreso:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">Prácticas recomendadas<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>No utilices la compactación de fusión forzada en entornos de producción.</strong></p></li>
<li><p><strong>Utiliza el modo de cálculo automático del tamaño en la mayoría de los casos.</strong> Al establecer <code translate="no">target_size</code> en <code translate="no">max_int64</code>, Milvus analiza la distribución de tus segmentos y los recursos de los nodos para determinar el tamaño óptimo. Este es el enfoque recomendado, a menos que tengas requisitos específicos de dimensionamiento.</p></li>
<li><p><strong>Ten en cuenta la relación entre rendimiento y recursos.</strong> La compactación «Force Merge» es una operación que consume muchos recursos. Lee, fusiona y reescribe los datos de los segmentos. Programala durante períodos de poco tráfico para minimizar el impacto en la latencia de las consultas.</p></li>
<li><p><strong>Supervisa el número de segmentos antes y después.</strong> Utiliza <code translate="no">get_compaction_state()</code> y <code translate="no">list_persistent_segments</code> para comprobar que la compactación ha generado menos segmentos, pero de mayor tamaño, tal y como se esperaba.</p></li>
</ul>
<p><a id="faq"></a></p>
<h2 id="FAQ" class="common-anchor-header">Preguntas frecuentes<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>¿En qué se diferencia la compactación «Force Merge» de la compactación estándar?</strong></p>
<p>Estos dos tipos de operaciones de compactación tienen fines distintos.</p>
<ul>
<li><p>La compactación estándar (targetSize=0 u omitido) es una ruta de limpieza incremental en la que se hace todo lo posible.</p></li>
<li><p>La «fusión forzada» (targetSize &gt; 0) es una ruta de reempaquetado a nivel de colección para generar segmentos más numerosos, más grandes y cercanos al tamaño objetivo.</p></li>
</ul>
<p>La diferencia clave radica en la forma de la fusión: la compactación estándar es, en la práctica, m → 1 por tarea, mientras que la fusión forzada es m → n entre entradas agrupadas. Por eso, la fusión forzada puede resolver distribuciones de segmentos que la compactación estándar no puede. La siguiente tabla compara los dos tipos de operaciones.</p>
<table>
   <tr>
     <th><p><strong>Dimensión</strong></p></th>
     <th><p><strong>Compactación estándar (por defecto)</strong></p></th>
     <th><p><strong>Fusión forzada</strong></p></th>
   </tr>
   <tr>
     <td><p>Desencadenante de la API</p></td>
     <td><p>targetSize=0 (o sin definir), sin indicador Major/L0</p></td>
     <td><p>targetSize &gt; 0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>Objetivo principal</p></td>
     <td><p>Limpieza incremental de fragmentos evidentes; mantenimiento rutinario</p></td>
     <td><p>Consolidación en toda la colección para la búsqueda y el equilibrio</p></td>
   </tr>
   <tr>
     <td><p>Fuente del tamaño del segmento</p></td>
     <td><p>Tamaño máximo fijo de dataCoord.segment.maxSize (configuración del servidor)</p></td>
     <td><p>Valor «targetSize» del usuario, limitado posteriormente por «maxSafeSize» por motivos de seguridad</p></td>
   </tr>
   <tr>
     <td><p>Validez de los parámetros</p></td>
     <td><p>No se permite el ajuste del tamaño por parte del usuario</p></td>
     <td><p>El valor targetSize del usuario debe ser ≥ a dataCoord.segment.maxSize; de lo contrario, se rechaza</p></td>
   </tr>
   <tr>
     <td><p>Límite superior de seguridad</p></td>
     <td><p>Solo límite de configuración</p></td>
     <td><p>maxSafeSize = min(memoria de QueryNode, memoria de DataNode) / factor de memoria (en modo autónomo sin agrupación: se reduce a la mitad)</p></td>
   </tr>
   <tr>
     <td><p>Forma de fusión</p></td>
     <td><p>m → 1 por tarea, salida ≤ configMaxSize</p></td>
     <td><p>m → n, salidas cercanas a targetSize</p></td>
   </tr>
   <tr>
     <td><p>Comportamiento de los segmentos medios</p></td>
     <td><p>Puede quedarse atascado de forma permanente (por ejemplo, dos segmentos del 60 % no pueden convertirse legítimamente en un único segmento del 120 %)</p></td>
     <td><p>Funciona el reempaquetado + división; no se produce el patrón de «atascamiento al 60 %»</p></td>
   </tr>
   <tr>
     <td><p>Capacidad de aplanamiento de la colección</p></td>
     <td><p>Limitada; las ejecuciones repetidas pueden seguir dejando muchos segmentos medianos</p></td>
     <td><p>Sólida; diseñada para reducir el número de segmentos y aumentar el grado de llenado</p></td>
   </tr>
   <tr>
     <td><p>Reconocimiento de la topología</p></td>
     <td><p>Ninguna</p></td>
     <td><p>Sí; utiliza la disposición de QueryNode/réplica/fragmento</p></td>
   </tr>
   <tr>
     <td><p>Ajuste del paralelismo de la ruta de lectura</p></td>
     <td><p>Ninguno</p></td>
     <td><p>Ajusta el recuento de resultados utilizando queryNodeCount / (réplicas × fragmentos) cuando sea válido</p></td>
   </tr>
   <tr>
     <td><p>Caso de uso típico</p></td>
     <td><p>Limpieza diaria con alta rotación tras operaciones de escritura/eliminación</p></td>
     <td><p>Preparación de pruebas de rendimiento, optimización de búsquedas, alineación del paralelismo de carga</p></td>
   </tr>
   <tr>
     <td><p>Expectativas de alcance</p></td>
     <td><p>No se espera un reempaquetado de toda la colección</p></td>
     <td><p>Diseñado para obtener un resultado de reempaquetado a nivel de colección</p></td>
   </tr>
</table>
<p><strong>Orientación para la selección:</strong></p>
<ul>
<li><p>Elige la compactación estándar para una limpieza incremental de bajo riesgo.</p></li>
<li><p>Elige la fusión forzada cuando desees explícitamente reestructurar la colección en segmentos más grandes y menos numerosos, alineados con el comportamiento de búsqueda y carga.</p></li>
</ul>
<p><strong>¿En qué se diferencia la «fusión forzada» de la compactación por agrupamiento?</strong></p>
<p>La compactación por clústeres (<code translate="no">is_clustering=True</code>) reorganiza los datos dentro de los segmentos basándose en una clave de agrupación para mejorar la poda de la búsqueda. La fusión forzada (<code translate="no">target_size=N</code>) optimiza el tamaño de los segmentos sin modificar la distribución de los datos. Ambas tienen fines distintos y pueden utilizarse conjuntamente: primero se ejecuta la compactación por clústeres para organizar los datos y, a continuación, la fusión forzada para consolidar los segmentos resultantes.</p>
<p><strong>¿Puedo ejecutar «Force Merge» en una colección que se está consultando?</strong></p>
<p>Sí. «Force Merge» se ejecuta de forma asíncrona y no bloquea las consultas. Sin embargo, consume recursos de DataNode y de E/S de disco, por lo que la latencia de las consultas puede aumentar durante la compactación. Programa «Force Merge» durante los periodos de poco tráfico para obtener los mejores resultados.</p>
<p><strong>¿Qué ocurre si establezco un `target_size` menor que `maxSize`?</strong></p>
<p>La solicitud se rechaza con un error. El tamaño objetivo debe ser mayor o igual que el valor configurado en « <code translate="no">dataCoord.segment.maxSize</code> ».</p>
