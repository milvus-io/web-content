---
id: force-merge.md
title: Compactación Force MergeCompatible with Milvus 3.0.x
summary: >-
  Utilice la compactación de fusión forzada para consolidar segmentos pequeños y
  mejorar el rendimiento de las consultas y la eficiencia del almacenamiento.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Compactación Force Merge<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Force Merge está diseñado para consolidar segmentos pequeños y fragmentados en menos segmentos y más grandes para mejorar el rendimiento de las consultas y la eficiencia del almacenamiento. En esta guía se explica cómo utilizar la compactación de fusión forzada.</p>
<div class="alert note">
<p>Esta función se encuentra en fase de vista previa pública. No la utilice en entornos de producción.</p>
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
    </button></h2><p>La <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">compactación</a> estándar mantiene el tamaño de los segmentos cerca de los valores configurados en <code translate="no">maxSize</code> mediante fusiones múltiples, pero puede dejar fragmentos de tamaño medio que no se pueden seguir fusionando sin superar los límites. Por ejemplo, como se ilustra a continuación, si una colección tiene cinco segmentos de 2 MB y <code translate="no">maxSize</code> es de 3 MB, la fusión de dos segmentos cualquiera superaría el límite, por lo que la compactación estándar no puede reducir más el recuento de segmentos y el diseño fragmentado permanece.</p>
<p>Forzar fusión añade un parámetro <code translate="no">target_size</code> y permite reorganizar los segmentos hacia el tamaño deseado dentro de una tolerancia ajustada siempre que sea posible. Como se ilustra a continuación, si el <code translate="no">target_size</code> especificado es de 4 MB, los cinco segmentos pequeños de 2 MB se pueden fusionar en menos segmentos más grandes. Esto reduce el número excesivo de segmentos, admite objetivos mayores que la configuración predeterminada de <code translate="no">maxSize</code> y, cuando el objetivo es muy grande, permite al sistema elegir un tamaño de salida y un número de segmentos prácticos para el hardware y la topología de QueryNode actuales.</p>
<p>Para saber qué método de compactación utilizar, consulte <a href="#faq">las preguntas frecuentes</a>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
   </span> <span class="img-wrapper"> <span>R8eow3kaqhktokblcmocnvxmnee</span> </span></p>
<p>La compactación de fusión forzada amplía la API <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API con un parámetro <code translate="no">target_size</code>. Es totalmente compatible con versiones anteriores: las llamadas de compactación existentes sin <code translate="no">target_size</code> siguen funcionando como antes.</p>
<p>La fusión forzada funciona de forma asíncrona. No bloquea las operaciones de búsqueda o consulta, aunque consume recursos de E/S y memoria durante la ejecución.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Uso de la compactación forzada<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
<li><p>Milvus versión 2.6.15 o posterior</p></li>
<li><p>pymilvus 2.6.13 o posterior</p></li>
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
    </button></h3><p>Los siguientes parámetros de configuración controlan el comportamiento de Force Merge. Establézcalos en el fichero de configuración de Milvus o mediante variables de entorno.</p>
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
     <td><p>512</p></td>
     <td><p>Tamaño máximo del segmento por defecto en MB. Se utiliza como destino cuando <code translate="no">target_size</code> es 0 o se omite. También sirve como valor mínimo permitido para <code translate="no">target_size</code> explícito.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Umbral de recuento de segmentos para la selección del algoritmo. Cuando el número de segmentos supera este valor, Milvus utiliza un algoritmo codicioso más rápido para la planificación de la fusión.</p><ul><li><p><strong>Algoritmo estándar</strong> (utilizado cuando el recuento de segmentos es &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): produce resultados de fusión más óptimos pero tarda más en calcularse.</p></li><li><p><strong>Algoritmo codicioso</strong> (utilizado cuando el recuento de segmentos &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): completa la planificación mucho más rápido a costa de una agrupación de segmentos ligeramente menos óptima.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>La memoria DataNode se divide por este factor para calcular el tamaño de segmento más grande que el sistema puede permitir.</p><ul><li><p>Un valor mayor asigna menos memoria a la fusión pero deja más para otras operaciones del DataNode, mejorando la estabilidad del nodo.</p></li><li><p>Un valor menor permite fusiones más grandes pero aumenta la presión sobre la memoria.</p></li><li><p>Por ejemplo, con el factor por defecto de 4.0 y un DataNode con 16 GB de memoria, el presupuesto de fusión es de 4 GB. Esto significa que el tamaño total de los segmentos que se fusionan en una sola operación no puede superar los 4 GB.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>La memoria mínima del QueryNode se divide por este factor. Se utiliza durante el cálculo automático del tamaño (<code translate="no">target_size=max_int64</code>) para garantizar que los QueryNodes puedan cargar los segmentos fusionados.</p><ul><li><p>Un valor mayor produce segmentos más pequeños que son más fáciles de cargar para los QueryNodes.</p></li><li><p>Un valor menor permite segmentos más grandes pero puede causar fallos de carga en QueryNodes con memoria limitada.</p></li><li><p>Por ejemplo, con el factor por defecto de 4.0 y el QueryNode más pequeño con 16 GB de memoria, el tamaño objetivo autocalculado no superará los 4 GB. Esto evita que Force Merge produzca segmentos tan grandes que los QueryNodes no puedan cargarlos.</p></li></ul></td>
   </tr>
</table>
<p>Para aplicar los cambios anteriores a su cluster Milvus, por favor siga los pasos en <a href="/docs/es/configure-helm.md#Configure-Milvus-via-configuration-file">Configurar Milvus con Helm</a> y <a href="/docs/es/configure_operator.md">Configurar Milvus con Milvus Operators</a>.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Activar la compactación Force Merge<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Puede activar la compactación Force Merge llamando a <code translate="no">compact()</code> con el parámetro <code translate="no">target_size</code>. Para más detalles sobre el parámetro, véase <a href="#parameter-reference">Referencia de parámetros</a> más abajo.</p>
<p>Existen tres modos de compactación por combinación forzada:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
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
<p>A continuación se muestran ejemplos de cómo utilizar cada modo de compactación forzada.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Por defecto (compactación estándar)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">Tamaño objetivo explícito</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
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
<h4 id="Parameter-reference" class="common-anchor-header">Referencia de parámetros</h4><p>En la tabla siguiente se explican los parámetros.</p>
<table>
   <tr>
     <th><p><strong>Parámetro</strong></p></th>
     <th><p><strong>Tipo</strong></p></th>
     <th><p><strong>Descripción</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Obligatorio. El nombre de la colección a compactar.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Opcional. El tamaño del segmento objetivo en MB. Hay 3 opciones de valor del parámetro:</p><ul><li><p><strong>0 u omitido</strong>: Utiliza el <code translate="no">dataCoord.segment.maxSize</code> configurado (por defecto: 512 MB). Equivale a la compactación estándar.</p></li><li><p><strong>Valor explícito</strong>: Fusiona segmentos hasta aproximadamente el tamaño especificado en MB (ej. 2048). Debe ser mayor o igual que el configurado <code translate="no">dataCoord.segment.maxSize</code>.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: Calcula automáticamente el tamaño óptimo basándose en la distribución actual de segmentos y en los recursos disponibles del nodo.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Si el <code translate="no">target_size</code> especificado es menor que el <code translate="no">dataCoord.segment.maxSize</code> configurado, la solicitud se rechaza con un error.</p>
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
    </button></h3><p>La compactación Force Merge se ejecuta de forma asíncrona. Utilice el ID de trabajo devuelto para comprobar el progreso:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><ul>
<li><p><strong>No utilice la compactación Force Merge en entornos de producción.</strong></p></li>
<li><p><strong>Utilice el modo de cálculo de tamaño automático para la mayoría de los casos.</strong> Configurar <code translate="no">target_size</code> en <code translate="no">max_int64</code> permite a Milvus analizar su distribución de segmentos y recursos de nodos para determinar el mejor tamaño. Este es el enfoque recomendado a menos que tenga requisitos específicos de tamaño.</p></li>
<li><p><strong>Considere la compensación de rendimiento.</strong> Forzar la compactación por fusión es una operación que consume muchos recursos. Lee, combina y reescribe datos de segmentos. Prográmela durante periodos de poco tráfico para minimizar el impacto en la latencia de la consulta.</p></li>
<li><p><strong>Controle el recuento de segmentos antes y después.</strong> Utilice <code translate="no">get_compaction_state()</code> y <code translate="no">list_persistent_segments</code> para verificar que la compactación ha producido menos segmentos y más grandes de lo esperado.</p></li>
</ul>
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
    </button></h2><p><strong>¿En qué se diferencia Force Merge de la compactación estándar?</strong></p>
<p>Estos dos tipos de operaciones de compactación tienen propósitos diferentes.</p>
<ul>
<li><p>La compactación estándar (targetSize=0 u omitida) es una ruta de limpieza incremental de máximo esfuerzo.</p></li>
<li><p>La fusión forzada (targetSize&gt;0) es una ruta de reempaquetado a nivel de colección para producir menos segmentos, más grandes y cercanos al objetivo.</p></li>
</ul>
<p>La diferencia clave es la forma de la fusión: la compactación estándar es efectivamente m → 1 por tarea, mientras que la fusión forzada es m → n a través de entradas agrupadas. Esta es la razón por la que la fusión forzada puede resolver disposiciones de segmentos que la compactación estándar no puede. La siguiente tabla compara los dos tipos de operaciones.</p>
<table>
   <tr>
     <th><p><strong>Dimensión</strong></p></th>
     <th><p><strong>Compactación estándar (por defecto)</strong></p></th>
     <th><p><strong>Fusión forzada</strong></p></th>
   </tr>
   <tr>
     <td><p>Activador API</p></td>
     <td><p>targetSize=0 (o no fijado), sin indicador Major/L0</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>Objetivo principal</p></td>
     <td><p>Limpieza incremental de fragmentos obvios; mantenimiento rutinario</p></td>
     <td><p>Consolidación de toda la colección para búsqueda y equilibrio</p></td>
   </tr>
   <tr>
     <td><p>Origen del tamaño del segmento</p></td>
     <td><p>DataCoord.segment.maxSize fijo (configuración del servidor)</p></td>
     <td><p>TargetSize del usuario, luego limitado por maxSafeSize</p></td>
   </tr>
   <tr>
     <td><p>Validez de los parámetros</p></td>
     <td><p>Sin ajuste del tamaño del usuario</p></td>
     <td><p>User targetSize debe ser &gt;= dataCoord.segment.maxSize; en caso contrario, se rechaza.</p></td>
   </tr>
   <tr>
     <td><p>Límite superior de seguridad</p></td>
     <td><p>Sólo límite de configuración</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (independiente sin agrupación: se reduce a la mitad)</p></td>
   </tr>
   <tr>
     <td><p>Forma de fusión</p></td>
     <td><p>m → 1 por tarea, salida &lt;= configMaxSize</p></td>
     <td><p>m → n, salidas cercanas a targetSize</p></td>
   </tr>
   <tr>
     <td><p>Comportamiento del segmento medio</p></td>
     <td><p>Puede atascarse permanentemente (por ejemplo, dos segmentos del 60% no pueden convertirse legalmente en un segmento del 120%)</p></td>
     <td><p>Reempaquetar + dividir funciona; no hay patrón "atascado en el 60%</p></td>
   </tr>
   <tr>
     <td><p>Capacidad de aplanamiento de la colección</p></td>
     <td><p>Limitada; las ejecuciones repetidas pueden dejar muchos segmentos medios.</p></td>
     <td><p>Fuerte; diseñado para reducir el número de segmentos y aumentar la plenitud</p></td>
   </tr>
   <tr>
     <td><p>Conocimiento de la topología</p></td>
     <td><p>Ninguna</p></td>
     <td><p>Sí; utiliza QueryNode/replica/disposición en fragmentos</p></td>
   </tr>
   <tr>
     <td><p>Ajuste del paralelismo de lectura</p></td>
     <td><p>Ninguno</p></td>
     <td><p>Ajusta el recuento de salida utilizando queryNodeCount / (replicas × shards) cuando es válido</p></td>
   </tr>
   <tr>
     <td><p>Caso de uso típico</p></td>
     <td><p>Limpieza diaria de alto volumen tras escrituras/borrados</p></td>
     <td><p>Preparación de pruebas, optimización de búsquedas, alineación de paralelismo de carga</p></td>
   </tr>
   <tr>
     <td><p>Alcance esperado</p></td>
     <td><p>No se espera un reempaquetado completo de la colección</p></td>
     <td><p>Destinado a resultados de reempaquetado a nivel de colección</p></td>
   </tr>
</table>
<p><strong>Guía de selección:</strong></p>
<ul>
<li><p>Elija la compactación estándar para una limpieza incremental de bajo riesgo.</p></li>
<li><p>Elija la fusión forzada cuando desee explícitamente remodelar la colección en menos segmentos de mayor tamaño alineados con el comportamiento de búsqueda y carga.</p></li>
</ul>
<p><strong>¿En qué se diferencia la fusión forzada de la compactación por agrupación?</strong></p>
<p>La<a href="/docs/es/clustering-compaction.md">compactación</a> por agrupación (<code translate="no">is_clustering=True</code>) reorganiza los datos dentro de los segmentos basándose en una clave de agrupación para mejorar la poda de búsqueda. La combinación forzada (<code translate="no">target_size=N</code>) optimiza el tamaño de los segmentos sin cambiar la distribución de los datos. Sirven para diferentes propósitos y pueden utilizarse conjuntamente: ejecute primero la compactación por agrupación para organizar los datos y, a continuación, Force Merge para consolidar los segmentos resultantes.</p>
<p><strong>¿Puedo ejecutar Force Merge en una colección que se está consultando?</strong></p>
<p>Sí. La combinación forzada se ejecuta de forma asíncrona y no bloquea las consultas. Sin embargo, consume recursos de DataNode y de E/S de disco, por lo que la latencia de las consultas puede aumentar durante la compactación. Para obtener mejores resultados, programe la Fusión forzada durante periodos de poco tráfico.</p>
<p><strong>¿Qué ocurre si establezco un target_size inferior a maxSize?</strong></p>
<p>La solicitud se rechaza con un error. El tamaño objetivo debe ser mayor o igual que el configurado en <code translate="no">dataCoord.segment.maxSize</code>.</p>
