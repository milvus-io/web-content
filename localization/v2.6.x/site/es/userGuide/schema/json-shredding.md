---
id: json-shredding.md
title: Trituración JSONCompatible with Milvus 2.6.2+
summary: >-
  La trituración de JSON acelera las consultas JSON convirtiendo el
  almacenamiento tradicional basado en filas en almacenamiento columnar
  optimizado. Al tiempo que mantiene la flexibilidad de JSON para el modelado de
  datos, Milvus realiza entre bastidores una optimización columnar que mejora
  drásticamente el acceso y la eficiencia de las consultas.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">Trituración JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON shredding acelera las consultas JSON convirtiendo el almacenamiento tradicional basado en filas en almacenamiento columnar optimizado. Al tiempo que mantiene la flexibilidad de JSON para el modelado de datos, Milvus realiza entre bastidores una optimización columnar que mejora drásticamente el acceso y la eficiencia de las consultas.</p>
<p>La trituración JSON es eficaz para la mayoría de los escenarios de consulta JSON. Los beneficios de rendimiento se vuelven más pronunciados con</p>
<ul>
<li><p><strong>Documentos JSON más grandes y complejos</strong> - Mayores ganancias de rendimiento a medida que aumenta el tamaño del documento.</p></li>
<li><p><strong>Cargas de trabajo de lectura intensiva</strong> - Filtrado, ordenación o búsqueda frecuentes en claves JSON</p></li>
<li><p><strong>Patrones de consulta mixtos</strong>: las consultas a través de diferentes claves JSON se benefician del enfoque de almacenamiento híbrido.</p></li>
</ul>
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
    </button></h2><p>El proceso de trituración de JSON se realiza en tres fases distintas para optimizar los datos y acelerar su recuperación.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">Fase 1: Ingestión y clasificación de claves<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>A medida que se escriben nuevos documentos JSON, Milvus los muestrea y analiza continuamente para construir estadísticas para cada clave JSON. Este análisis incluye el ratio de ocurrencia de la clave y la estabilidad del tipo (si su tipo de datos es consistente en todos los documentos).</p>
<p>Basándose en estas estadísticas, las claves JSON se clasifican en las siguientes categorías para un almacenamiento óptimo.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">Categorías de claves JSON</h4><table>
   <tr>
     <th><p>Tipo de clave</p></th>
     <th><p>Descripción</p></th>
   </tr>
   <tr>
     <td><p>Claves tipificadas</p></td>
     <td><p>Claves que existen en la mayoría de los documentos y siempre tienen el mismo tipo de datos (por ejemplo, todos los enteros o todas las cadenas).</p></td>
   </tr>
   <tr>
     <td><p>Claves dinámicas</p></td>
     <td><p>Claves que aparecen con frecuencia pero tienen un tipo de datos mixto (por ejemplo, a veces una cadena, a veces un entero).</p></td>
   </tr>
   <tr>
     <td><p>Claves compartidas</p></td>
     <td><p>Claves de aparición infrecuente o anidadas que se sitúan por debajo de un umbral de frecuencia configurable<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">Ejemplo de clasificación</h4><p>Considere los datos JSON de ejemplo que contienen las siguientes claves JSON:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>Basándose en estos datos, las claves se clasificarían de la siguiente manera:</p>
<ul>
<li><p><strong>Claves mecanografiadas</strong>: <code translate="no">a</code> y <code translate="no">f</code> (siempre un número entero)</p></li>
<li><p><strong>Claves dinámicas</strong>: <code translate="no">b</code> (cadena mixta/entero)</p></li>
<li><p>Claves<strong>compartidas</strong>: <code translate="no">e</code> (clave que aparece con poca frecuencia)</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">Fase 2: Optimización del almacenamiento<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p>La clasificación de <a href="/docs/es/json-shredding.md#Phase-1-Ingestion--key-classification">la fase 1</a> dicta la disposición del almacenamiento. Milvus utiliza un formato columnar optimizado para las consultas.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
   </span> <span class="img-wrapper"> <span>Flujo de trituración de Json</span> </span></p>
<ul>
<li><p><strong>Columnas trituradas</strong>: Para <strong>las claves</strong> <strong>mecanografiadas</strong> y <strong>dinámicas</strong>, los datos se escriben en columnas dedicadas. Este almacenamiento en columnas permite exploraciones rápidas y directas durante las consultas, ya que Milvus puede leer sólo los datos necesarios para una clave determinada sin procesar todo el documento.</p></li>
<li><p><strong>Columna compartida</strong>: Todas las <strong>claves compar</strong> tidas se almacenan juntas en una única columna binaria JSON compacta. Sobre esta columna se construye un <strong>índice invertido</strong> de claves compartidas. Este índice es crucial para acelerar las consultas sobre claves de baja frecuencia, ya que permite a Milvus podar rápidamente los datos, reduciendo eficazmente el espacio de búsqueda a sólo aquellas filas que contienen la clave especificada.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">Fase 3: Ejecución de consultas<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>La fase final aprovecha la disposición optimizada del almacenamiento para seleccionar de forma inteligente la ruta más rápida para cada predicado de consulta.</p>
<ul>
<li><p><strong>Ruta rápida</strong>: Las consultas sobre claves mecanografiadas/dinámicas (por ejemplo, <code translate="no">json['a'] &lt; 100</code>) acceden directamente a las columnas dedicadas.</p></li>
<li><p><strong>Ruta optimizada</strong>: Las consultas sobre claves compartidas (por ejemplo, <code translate="no">json['e'] = 'rare'</code>) utilizan un índice invertido para localizar rápidamente los documentos relevantes.</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">Activar la trituración de JSON<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>Para activar esta función, defina <code translate="no">common.enabledJSONShredding</code> como <code translate="no">true</code> en el archivo de configuración <code translate="no">milvus.yaml</code>. Los nuevos datos activarán automáticamente el proceso de destrucción.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una vez activada, Milvus comenzará a analizar y reestructurar sus datos JSON en el momento de la ingesta sin ninguna intervención manual adicional.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">Ajuste de parámetros<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>Para la mayoría de los usuarios, una vez activada la destrucción de JSON, la configuración por defecto de los demás parámetros es suficiente. Sin embargo, puede ajustar el comportamiento de la destrucción de JSON utilizando estos parámetros en <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Parámetro Nombre</p></th>
     <th><p>Descripción</p></th>
     <th><p>Valor por defecto</p></th>
     <th><p>Consejo de ajuste</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>Controla si los procesos de construcción y carga de trituración JSON están habilitados.</p></td>
     <td><p>false</p></td>
     <td><p>Debe establecerse en <strong>true</strong> para activar la característica.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>Controla si Milvus utiliza datos triturados para la aceleración.</p></td>
     <td><p>verdadero</p></td>
     <td><p>Se establece en <strong>false</strong> como medida de recuperación si las consultas fallan, volviendo a la ruta de consulta original.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>Determina si Milvus utiliza mmap al cargar datos triturados.</p><p>Para más detalles, consulte <a href="/docs/es/mmap.md">Usar mmap</a>.</p></td>
     <td><p>true</p></td>
     <td><p>Este ajuste está generalmente optimizado para el rendimiento. Ajústelo sólo si tiene necesidades específicas de gestión de memoria o restricciones en su sistema.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>El número máximo de claves JSON que se almacenarán en las columnas trituradas. </p><p>Si el número de claves que aparecen con frecuencia excede este límite, Milvus dará prioridad a las más frecuentes para su destrucción, y el resto de claves se almacenarán en la columna compartida.</p></td>
     <td><p>1024</p></td>
     <td><p>Esto es suficiente para la mayoría de los escenarios. Para JSON con miles de claves que aparecen con frecuencia, puede que necesite aumentar este límite, pero controle el uso del almacenamiento.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>El ratio mínimo de aparición que debe tener una clave JSON para ser considerada para ser triturada en una columna triturada.</p><p>Se considera que una clave aparece con frecuencia si su ratio está por encima de este umbral.</p></td>
     <td><p>0.3</p></td>
     <td><p><strong>Aumenta</strong> (por ejemplo, a 0,5) si el número de claves que cumplen los criterios de trituración supera el límite de <code translate="no">dataCoord.jsonShreddingMaxColumns</code>. Esto hace que el umbral sea más estricto, reduciendo el número de claves que cumplen los criterios para ser trituradas.</p><p><strong>Redúzcalo</strong> (por ejemplo, a 0,1) si desea destruir más claves que aparecen con menos frecuencia que el umbral predeterminado del 30%.</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">Pruebas de rendimiento<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Nuestras pruebas demuestran mejoras significativas del rendimiento en diferentes tipos de claves JSON y patrones de consulta.</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">Entorno y metodología de las pruebas<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
<li><p><strong>Hardware</strong>: clúster de 1 núcleo/8 GB</p></li>
<li><p><strong>Conjunto de datos</strong>: 1 millón de documentos de <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>Tamaño medio del documento</strong>: 478,89 bytes</p></li>
<li><p><strong>Duración de la prueba</strong>: 100 segundos midiendo QPS y latencia</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">Resultados: claves mecanografiadas<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Esta prueba midió el rendimiento al consultar una clave presente en la mayoría de los documentos.</p>
<table>
   <tr>
     <th><p>Expresión de consulta</p></th>
     <th><p>Tipo de valor de clave</p></th>
     <th><p>QPS (sin destrucción)</p></th>
     <th><p>QPS (con destrucción)</p></th>
     <th><p>Aumento del rendimiento</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>Entero</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>Cadena</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">Resultados: claves compartidas<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Esta prueba se centró en la consulta de claves dispersas y anidadas que entran en la categoría de "compartidas".</p>
<table>
   <tr>
     <th><p>Expresión de consulta</p></th>
     <th><p>Tipo de valor de clave</p></th>
     <th><p>QPS (sin destrucción)</p></th>
     <th><p>QPS (con destrucción)</p></th>
     <th><p>Aumento del rendimiento</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Entero anidado</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>Cadena anidada</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">Información clave<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p>Las<strong>consultas clave compartidas</strong> presentan las mejoras más espectaculares (hasta 89 veces más rápidas).</p></li>
<li><p>Las<strong>consultas de claves tipificadas</strong> ofrecen un aumento constante del rendimiento de 15 a 30 veces.</p></li>
<li><p><strong>Todos los tipos de consulta</strong> se benefician de JSON Shredding sin regresiones de rendimiento.</p></li>
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
    </button></h2><ul>
<li><p><strong>¿Cómo puedo comprobar si la trituración de JSON funciona correctamente?</strong></p>
<ol>
<li><p>En primer lugar, compruebe si los datos se han construido utilizando el comando <code translate="no">show segment --format table</code> de la herramienta <a href="/docs/es/birdwatcher_usage_guides.md">Birdwatcher</a>. Si ha funcionado correctamente, la salida contendrá <code translate="no">shredding_data/</code> y <code translate="no">shared_key_index/</code> en el campo <strong>Json Key Stats</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
   </span> <span class="img-wrapper"> <span>Salida de Birdwatcher</span> </span></p></li>
<li><p>A continuación, compruebe que los datos se han cargado ejecutando <code translate="no">show loaded-json-stats</code> en el nodo de consulta. La salida mostrará detalles sobre los datos triturados cargados para cada nodo de consulta.</p></li>
</ol></li>
<li><p><strong>¿Qué ocurre si se produce un error?</strong></p>
<p>Si el proceso de creación o carga falla, puede desactivar rápidamente la función configurando <code translate="no">common.enabledJSONShredding=false</code>. Para borrar las tareas restantes, utilice el comando <code translate="no">remove stats-task &lt;task_id&gt;</code> en <a href="/docs/es/birdwatcher_usage_guides.md">Birdwatcher</a>. Si una consulta falla, configure <code translate="no">common.usingjsonShreddingForQuery=false</code> para volver a la ruta de consulta original, omitiendo los datos triturados.</p></li>
<li><p><strong>¿Cómo elijo entre la trituración JSON y la indexación JSON?</strong></p>
<ul>
<li><p>La<strong>trituración de</strong> JSON es ideal para las claves que aparecen con frecuencia en los documentos, especialmente en el caso de estructuras JSON complejas. Combina las ventajas del almacenamiento en columnas y de la indexación invertida, por lo que es muy adecuado para situaciones de lectura intensiva en las que se consultan muchas claves diferentes. Sin embargo, no se recomienda para documentos JSON muy pequeños, ya que el aumento de rendimiento es mínimo. Cuanto menor sea la proporción del valor de la clave con respecto al tamaño total del documento JSON, mayor será la optimización del rendimiento gracias a la trituración.</p></li>
<li><p><strong>La indexación JSON</strong> es mejor para la optimización específica de consultas basadas en claves y tiene una menor sobrecarga de almacenamiento. Es adecuado para estructuras JSON más simples. Ten en cuenta que la trituración JSON no cubre las consultas sobre claves dentro de matrices, por lo que necesitas un índice JSON para acelerarlas.</p></li>
</ul>
<p>Para obtener más información, consulta <a href="/docs/es/json-field-overview.md#Next-Accelerate-JSON-queries">Visión general de los campos JSON</a>.</p></li>
</ul>
