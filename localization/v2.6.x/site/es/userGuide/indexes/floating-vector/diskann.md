---
id: diskann.md
title: DISKANN
summary: >-
  En escenarios a gran escala, donde los conjuntos de datos pueden incluir miles
  de millones o incluso billones de vectores, los métodos estándar de indexación
  en memoria (por ejemplo, HNSW, IVF_FLAT) a menudo no consiguen mantener el
  ritmo debido a las limitaciones de memoria. DISKANN ofrece un enfoque basado
  en disco que aborda estos retos manteniendo una alta precisión y velocidad de
  búsqueda cuando el tamaño del conjunto de datos supera la memoria RAM
  disponible.
---
<h1 id="DISKANN" class="common-anchor-header">DISKANN<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>En escenarios a gran escala, donde los conjuntos de datos pueden incluir miles de millones o incluso billones de vectores, los métodos estándar de indexación en memoria (por ejemplo, <a href="/docs/es/hnsw.md">HNSW</a>, <a href="/docs/es/ivf-flat.md">IVF_FLAT</a>) a menudo no consiguen mantener el ritmo debido a las limitaciones de memoria. <strong>DISKANN</strong> ofrece un enfoque basado en disco que aborda estos retos manteniendo una alta precisión y velocidad de búsqueda cuando el tamaño del conjunto de datos supera la memoria RAM disponible.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>DISKANN</strong> combina dos técnicas clave para una búsqueda vectorial eficiente:</p>
<ul>
<li><p><strong>Vamana Graph</strong> - Un índice <strong>basado en disco y en gráficos</strong> que conecta puntos de datos (o vectores) para una navegación eficiente durante la búsqueda.</p></li>
<li><p><strong>Cuantización de productos (PQ)</strong>: método de compresión <strong>en memoria</strong> que reduce el tamaño de los vectores y permite calcular rápidamente distancias aproximadas entre vectores.</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">Construcción de índices</h3><h4 id="Vamana-graph" class="common-anchor-header">Gráfico Vamana</h4><p>El grafo Vamana es fundamental en la estrategia basada en disco de DISKANN. Puede manejar conjuntos de datos muy grandes porque no necesita residir completamente en memoria durante o después de su construcción.</p>
<p>La siguiente figura muestra cómo se construye un grafo Vamana.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
   </span> <span class="img-wrapper"> <span>Diskann</span> </span></p>
<ol>
<li><p><strong>Conexiones aleatorias iniciales:</strong> Cada punto de datos (vector) se representa como un nodo en el grafo. Estos nodos se conectan inicialmente de forma aleatoria, formando una red densa. Normalmente, un nodo comienza con unas 500 aristas (o conexiones) para una conectividad amplia.</p></li>
<li><p><strong>Perfeccionamiento para aumentar la eficiencia:</strong> El grafo aleatorio inicial se somete a un proceso de optimización para hacerlo más eficiente para la búsqueda. Esto implica dos pasos clave:</p>
<ul>
<li><p><strong>Poda de aristas redundantes:</strong> El algoritmo descarta las conexiones innecesarias basándose en las distancias entre nodos. Este paso da prioridad a las aristas de mayor calidad.</p>
<p>El parámetro <code translate="no">max_degree</code> restringe el número máximo de aristas por nodo. A mayor <code translate="no">max_degree</code>, el gráfico es más denso, lo que permite encontrar más vecinos relevantes (mayor recuperación), pero también aumenta el uso de memoria y el tiempo de búsqueda.</p></li>
<li><p><strong>Añadir atajos estratégicos:</strong> Vamana introduce aristas de largo alcance que conectan puntos de datos alejados en el espacio vectorial. Estos atajos permiten que las búsquedas salten rápidamente a través del grafo, evitando los nodos intermedios y acelerando significativamente la navegación.</p>
<p>El parámetro <code translate="no">search_list_size</code> determina la amplitud del proceso de refinamiento del grafo. Un valor más alto de <code translate="no">search_list_size</code> amplía la búsqueda de vecinos durante la construcción y puede mejorar la precisión final, pero aumenta el tiempo de construcción del índice.</p></li>
</ul></li>
</ol>
<p>Para obtener más información sobre el ajuste de parámetros, consulte <a href="/docs/es/diskann.md#diskann-params">Parámetros de DISKANN</a>.</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>DISKANN utiliza <strong>PQ</strong> para comprimir vectores de alta dimensión en representaciones más pequeñas<strong>(códigos PQ</strong>), que se almacenan en memoria para cálculos rápidos de distancias aproximadas.</p>
<p>El parámetro <code translate="no">pq_code_budget_gb_ratio</code> gestiona el espacio de memoria dedicado a almacenar estos códigos PQ. Representa una relación entre el tamaño total de los vectores (en gigabytes) y el espacio asignado para almacenar los códigos PQ. Puede calcular el presupuesto real de códigos PQ (en gigabytes) con esta fórmula:</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>donde</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> es el tamaño total de los vectores (en gigabytes).</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> es una proporción definida por el usuario, que representa la fracción del tamaño total de los datos reservada para los códigos PQ. Este parámetro permite un equilibrio entre la precisión de la búsqueda y los recursos de memoria. Para más información sobre el ajuste de parámetros, consulte <a href="/docs/es/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN configs</a>.</p></li>
</ul>
<p>Para más detalles técnicos sobre el método PQ subyacente, consulte <a href="/docs/es/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQ</a>.</p>
<h3 id="Search-process" class="common-anchor-header">Proceso de búsqueda</h3><p>Una vez construido el índice (el gráfico Vamana en disco y los códigos PQ en memoria), DISKANN realiza las búsquedas RNA de la siguiente manera:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
   </span> <span class="img-wrapper"> <span>Diskann 2</span> </span></p>
<ol>
<li><p><strong>Consulta y punto de entrada:</strong> Se proporciona un vector de consulta para localizar a sus vecinos más cercanos. DISKANN parte de un punto de entrada seleccionado en el gráfico Vamana, a menudo un nodo cercano al centroide global del conjunto de datos. El centroide global representa la media de todos los vectores, lo que ayuda a minimizar la distancia transversal a través del grafo para encontrar los vecinos deseados.</p></li>
<li><p><strong>Exploración de vecinos:</strong> El algoritmo reúne posibles vecinos candidatos (círculos en rojo en la figura) a partir de los bordes del nodo actual, aprovechando los códigos PQ en memoria para aproximar las distancias entre estos candidatos y el vector de consulta. Estos posibles vecinos candidatos son los nodos conectados directamente al punto de entrada seleccionado a través de aristas en el grafo Vamana.</p></li>
<li><p><strong>Selección de nodos para el cálculo preciso de la distancia:</strong> A partir de los resultados aproximados, se selecciona un subconjunto de los vecinos más prometedores (círculos en verde en la figura) para realizar evaluaciones precisas de la distancia utilizando sus vectores originales sin comprimir. Para ello es necesario leer los datos del disco, lo que puede llevar mucho tiempo. DISKANN utiliza dos parámetros para controlar este delicado equilibrio entre precisión y velocidad:</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>: Un coeficiente que controla la amplitud de la búsqueda, determinando cuántos vecinos candidatos se seleccionan en paralelo para explorar sus vecinos. A mayor <code translate="no">beam_width_ratio</code>, la exploración es más amplia, lo que puede aumentar la precisión, pero también el coste computacional y la E/S del disco. La amplitud del haz, o el número de nodos seleccionados, se determina mediante la fórmula: <code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>: La proporción de memoria asignada para almacenar en caché los datos del disco a los que se accede con frecuencia. Este almacenamiento en caché ayuda a minimizar la E/S de disco, haciendo que las búsquedas repetidas sean más rápidas puesto que los datos ya están en memoria.</p></li>
</ul>
<p>Para saber más sobre el ajuste de parámetros, consulte <a href="/docs/es/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN configs</a>.</p></li>
<li><p><strong>Exploración iterativa:</strong> La búsqueda refina iterativamente el conjunto de candidatos, realizando repetidamente evaluaciones aproximadas (utilizando PQ) seguidas de comprobaciones precisas (utilizando vectores originales del disco) hasta que se encuentra un número suficiente de vecinos.</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">Activar DISKANN en Milvus<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Por defecto, <strong>DISKANN</strong> está desactivado en Milvus para dar prioridad a la velocidad de los índices en memoria para conjuntos de datos que caben cómodamente en RAM. Sin embargo, si está trabajando con conjuntos de datos masivos o desea aprovechar la escalabilidad de <strong>DISKANN</strong> y la optimización SSD, puede habilitarlo fácilmente.</p>
<p>He aquí cómo activar DISKANN en Milvus:</p>
<ol>
<li><p><strong>Actualice el archivo de configuración de Milvus</strong></p>
<ol>
<li><p>Localice su archivo de configuración de Milvus<strong>.</strong> (Consulte la documentación de Milvus sobre Configuración para más detalles sobre cómo encontrar este archivo).</p></li>
<li><p>Busque el parámetro <code translate="no">queryNode.enableDisk</code> y establezca su valor en <code translate="no">true</code>:</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>Optimizar el almacenamiento para DISKANN</strong></p></li>
</ol>
<p>Para asegurar el mejor rendimiento con DISKANN, se recomienda almacenar sus datos de Milvus en un SSD NVMe rápido. A continuación se explica cómo hacerlo para las implementaciones de Milvus Standalone y Cluster:</p>
<ul>
<li><p><strong>Milvus Independiente</strong></p>
<ul>
<li><p>Monte el directorio de datos Milvus en un SSD NVMe dentro del contenedor Milvus. Puede hacerlo en el archivo <code translate="no">docker-compose.yml</code> o utilizando otras herramientas de gestión de contenedores.</p></li>
<li><p>Por ejemplo, si su SSD NVMe está montado en <code translate="no">/mnt/nvme</code>, debería actualizar la sección <code translate="no">volumes</code>de su <code translate="no">docker-compose.yml</code> de la siguiente manera:</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Cluster Milvus</strong></p>
<ul>
<li><p>Monte el directorio de datos Milvus en un SSD NVMe en los contenedores QueryNode e IndexNode. Puede lograr esto a través de su configuración de orquestación de contenedores.</p></li>
<li><p>Al montar los datos en un SSD NVMe en ambos tipos de nodo, se garantiza una velocidad rápida de lectura y escritura para las operaciones de búsqueda e indexación.</p></li>
</ul></li>
</ul>
<p>Una vez realizados estos cambios, reinicie su instancia de Milvus para que la configuración surta efecto. Ahora, Milvus aprovechará las capacidades de DISKANN para manejar grandes conjuntos de datos, ofreciendo una búsqueda vectorial eficiente y escalable.</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">Configurar DISKANN<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>Los parámetros de DISKANN pueden configurarse utilizando dos métodos principales:</p>
<ul>
<li><p><strong>Archivo</strong> de configuración de Milvus<strong>:</strong> Ajuste los parámetros de DISKANN a través del archivo de configuración de Milvus. Este método es adecuado para establecer opciones generales de configuración para su instancia de Milvus.</p></li>
<li><p><strong>Milvus SDK:</strong> Ajuste los parámetros de DISKANN utilizando el SDK de Milvus durante la creación de índices o las operaciones de búsqueda. Esto permite un control más granular y ajustes dinámicos de los parámetros basados en casos de uso específicos.</p></li>
</ul>
<div class="alert note">
<p>La configuración realizada por el SDK anula cualquier ajuste definido en el archivo de configuración, ofreciendo flexibilidad y control para aplicaciones y conjuntos de datos específicos.</p>
</div>
<h3 id="Milvus-configuration-file" class="common-anchor-header">Fichero de configuración de Milvus</h3><p>A continuación se muestra un ejemplo de cómo configurar los parámetros de DISKANN en el archivo <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># When enable this configuration, the index parameters defined following will be automatically populated as index parameters, without requiring user input.</span>
  <span class="hljs-attr">DISKANN:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SDK-configuration" class="common-anchor-header">Configuración SDK</h3><p>Este es un ejemplo de cómo configurar los parámetros de DISKANN utilizando Milvus SDK.</p>
<h4 id="Build" class="common-anchor-header">Construir</h4><p>Para construir un índice <code translate="no">DISKANN</code> sobre un campo vectorial en Milvus, utilice el método <code translate="no">add_index()</code>, especificando los parámetros <code translate="no">index_type</code>, <code translate="no">metric_type</code>, y parámetros adicionales para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;DISKANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;max_degree&quot;</span>: <span class="hljs-number">56</span>, <span class="hljs-comment"># Maximum number of connections (edges) each data point can have</span>
        <span class="hljs-string">&quot;search_list_size&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;search_cache_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.10</span>, <span class="hljs-comment"># Amount of memory allocated for caching frequently accessed parts of the graph</span>
        <span class="hljs-string">&quot;pq_code_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Una vez configurados los parámetros del índice, puede crear el índice utilizando el método <code translate="no">create_index()</code> directamente o pasando los parámetros del índice en el método <code translate="no">create_collection</code>. Para más detalles, consulte <a href="/docs/es/create-collection.md">Crear colección</a>.</p>
<h4 id="Search" class="common-anchor-header">Búsqueda</h4><p>Una vez creado el índice e insertadas las entidades, puede realizar búsquedas por similitud en el índice.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;beam_width_ratio&quot;</span>: <span class="hljs-number">4.0</span>, <span class="hljs-comment"># degree of parallelism during search by determining the maximum number of parallel disk I/O requests relative to the number of available CPU cores.</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="DISKANN-params" class="common-anchor-header">Parámetros de DISKANN<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>El ajuste fino de los parámetros de DISKANN le permite adaptar su comportamiento a su conjunto de datos específico y a la carga de trabajo de búsqueda, consiguiendo el equilibrio adecuado entre velocidad, precisión y uso de memoria.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parámetros de creación de índices</h3><p>Estos parámetros influyen en el modo en que se construye el índice DISKANN. Su ajuste puede afectar al tamaño del índice, al tiempo de construcción y a la calidad de la búsqueda.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Controla el número máximo de conexiones (aristas) que puede tener cada punto de datos en el gráfico Vamana.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, 512]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">56</code></p></td>
     <td><p>Los valores más altos crean gráficos más densos, aumentando potencialmente la recuperación (encontrando resultados más relevantes) pero también incrementando el uso de memoria y el tiempo de construcción. 
 En la mayoría de los casos, se recomienda establecer un valor dentro de este rango: [10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>Durante la construcción del índice, este parámetro define el tamaño del grupo de candidatos utilizado cuando se buscan los vecinos más cercanos para cada nodo. Para cada nodo que se añade al grafo, el algoritmo mantiene una lista de los <code translate="no">search_list_size</code> mejores candidatos encontrados hasta el momento. La búsqueda de vecinos se detiene cuando esta lista ya no puede mejorarse. De esta lista final de candidatos, se seleccionan los mejores <code translate="no">max_degree</code> nodos para formar las aristas finales.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">100</code></p></td>
     <td><p>Un valor mayor de <code translate="no">search_list_size</code> aumenta la probabilidad de encontrar los verdaderos vecinos más cercanos de cada nodo, lo que puede dar lugar a un gráfico de mayor calidad y a un mejor rendimiento de la búsqueda (recall). Sin embargo, esto tiene el coste de un tiempo de construcción del índice significativamente mayor. Debe fijarse siempre en un valor mayor o igual que <code translate="no">max_degree</code>.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Controla la cantidad de memoria asignada para almacenar en caché las partes del gráfico a las que se accede con más frecuencia durante la construcción del índice.</p></td>
     <td><p><strong>Tipo</strong>: Float <strong>Rango</strong>: [0.0, 0.3)</p>
<p><strong>Valor por defecto</strong>: <code translate="no">0.10</code></p></td>
     <td><p>Un valor más alto asigna más memoria a la caché, reduciendo significativamente la E/S de disco pero consumiendo más memoria del sistema. Un valor más bajo utiliza menos memoria para el almacenamiento en caché, aumentando potencialmente la necesidad de acceso al disco. En la mayoría de los casos, se recomienda establecer un valor dentro de este rango: [0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Controla el tamaño de los códigos PQ (representaciones comprimidas de los puntos de datos) en comparación con el tamaño de los datos sin comprimir.</p></td>
     <td><p><strong>Tipo</strong>: Flotante <strong>Rango</strong>: (0.0, 0.25]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Una proporción más alta conduce a resultados de búsqueda más precisos al asignar una mayor proporción de memoria para los códigos PQ, almacenando efectivamente más información sobre los vectores originales. Sin embargo, esto requiere más memoria, lo que limita la capacidad para manejar grandes conjuntos de datos. Una proporción menor reduce el uso de memoria pero potencialmente sacrifica la precisión, ya que los códigos PQ más pequeños retienen menos información. Este enfoque es adecuado para situaciones en las que las limitaciones de memoria son un problema, ya que puede permitir la indexación de grandes conjuntos de datos.</p>
<p>En la mayoría de los casos, se recomienda establecer un valor dentro de este intervalo: (0,0625, 0,25].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Parámetros de búsqueda específicos del índice</h3><p>Estos parámetros influyen en el modo en que DISKANN realiza las búsquedas. Su ajuste puede influir en la velocidad de búsqueda, la latencia y el uso de recursos.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Rango de valores</p></th>
     <th><p>Sugerencia de ajuste</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">beam_width_ratio</code></p></td>
     <td><p>Controla el grado de paralelismo durante la búsqueda determinando el número máximo de peticiones de E/S de disco paralelas en relación con el número de núcleos de CPU disponibles.</p></td>
     <td><p><strong>Tipo</strong>: Float <strong>Rango</strong>: [1, max(128 / número de CPU, 16)]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">4.0</code></p></td>
     <td><p>Los valores más altos aumentan el paralelismo, lo que puede acelerar la búsqueda en sistemas con CPUs y SSDs potentes. En la mayoría de los casos, se recomienda establecer un valor dentro de este rango: [1.0, 4.0].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>Durante una operación de búsqueda, este parámetro determina el tamaño de la reserva de candidatos que el algoritmo mantiene mientras recorre el gráfico. Un valor mayor aumenta las posibilidades de encontrar a los verdaderos vecinos más cercanos (mayor recall), pero también aumenta la latencia de la búsqueda.</p></td>
     <td><p><strong>Tipo</strong>: Entero <strong>Rango</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valor por defecto</strong>: <code translate="no">100</code></p></td>
     <td><p>Para obtener un buen equilibrio entre rendimiento y precisión, se recomienda establecer este valor igual o ligeramente superior al número de resultados que desea recuperar (top_k).</p></td>
   </tr>
</table>
