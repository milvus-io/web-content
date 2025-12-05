---
id: benchmark.md
summary: Conozca el resultado de referencia de Milvus.
title: Informe de pruebas comparativas de Milvus 2.2
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">Informe de pruebas comparativas de Milvus 2.2<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>Este informe muestra los principales resultados de las pruebas de Milvus 2.2.0. Su objetivo es proporcionar una imagen del rendimiento de búsqueda de Milvus 2.2.0, especialmente en la capacidad de ampliación y reducción.</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>Recientemente hemos realizado una prueba comparativa con Milvus 2.2.3 y hemos obtenido los siguientes resultados clave:</p>
    <ul>
      <li>Una reducción de 2,5 veces en la latencia de búsqueda</li>
      <li>Aumento de 4,5 veces en QPS</li>
      <li>Búsqueda de similitudes a escala de miles de millones con escasa degradación del rendimiento</li>
      <li>Escalabilidad lineal al utilizar múltiples réplicas</li>
    </ul>
    <p>Para más detalles, consulte <a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">este artículo técnico</a> y el <a href="https://github.com/zilliztech/VectorDBBench">código de prueba de referencia relacionado</a>. </p>
  </div>
</div>
<h2 id="Summary" class="common-anchor-header">Resumen<button data-href="#Summary" class="anchor-icon" translate="no">
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
<li>En comparación con Milvus 2.1, el QPS de Milvus 2.2.0 aumenta más de un 48% en modo clúster y más de un 75% en modo autónomo.</li>
<li>Milvus 2.2.0 tiene una impresionante capacidad de ampliación y reducción:<ul>
<li>QPS aumenta linealmente cuando se amplían los núcleos de CPU de 8 a 32.</li>
<li>QPS aumenta linealmente cuando se amplían las réplicas Querynode de 1 a 8.</li>
</ul></li>
</ul>
<h2 id="Terminology" class="common-anchor-header">Terminología<button data-href="#Terminology" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary>Haz clic para ver los detalles de los términos utilizados en la prueba</summary>
<table class="terminology">
<thead>
<tr>
<th>Término</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td>nq</td>
<td>Número de vectores que se buscan en una petición de búsqueda</td>
</tr>
<tr>
<td>topk</td>
<td>Número de los vectores más cercanos que se recuperarán para cada vector (en nq) en una petición de búsqueda</td>
</tr>
<tr>
<td>ef</td>
<td>Parámetro de búsqueda específico <a href="https://milvus.io/docs/v2.2.x/index.md">del índice HNSW</a></td>
</tr>
<tr>
<td>RT</td>
<td>Tiempo de respuesta desde el envío de la solicitud hasta la recepción de la respuesta</td>
</tr>
<tr>
<td>QPS</td>
<td>Número de solicitudes de búsqueda procesadas con éxito por segundo</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">Entorno de prueba<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Todas las pruebas se realizan en los siguientes entornos.</p>
<h3 id="Hardware-environment" class="common-anchor-header">Entorno de hardware</h3><table>
<thead>
<tr><th>Hardware</th><th>Especificación</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td>CPU Intel® Xeon® Gold 6226R a 2,90 GHz</td></tr>
<tr><td>Memoria</td><td>16*32 GB RDIMM, 3200 MT/s</td></tr>
<tr><td>SSD</td><td>SATA 6 Gbps</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">Entorno de software</h3><table>
<thead>
<tr><th>Software</th><th>Versión</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td>v2.2.0</td></tr>
<tr><td>Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">Esquema de despliegue</h3><ul>
<li>Las instancias de Milvus (independientes o en clúster) se despliegan a través de <a href="https://milvus.io/docs/install_standalone-helm.md">Helm</a> en un clúster Kubernetes basado en máquinas físicas o virtuales.</li>
<li>Las diferentes pruebas simplemente varían en el número de núcleos de CPU, el tamaño de la memoria y el número de réplicas (nodos trabajadores), que sólo se aplica a los clústeres Milvus.</li>
<li>Las configuraciones no especificadas son idénticas a <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">las configuraciones por defecto</a>.</li>
<li>Las dependencias de Milvus (MinIO, Pulsar y Etcd) almacenan los datos en el SSD local de cada nodo.</li>
<li>Las peticiones de búsqueda se envían a las instancias Milvus a través de <a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">Milvus GO SDK</a>.</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">Conjuntos de datos</h3><p>La prueba utiliza el conjunto de datos de código abierto SIFT (128 dimensiones) de <a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks</a>.</p>
<h2 id="Test-pipeline" class="common-anchor-header">Proceso de prueba<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Inicie una instancia de Milvus mediante Helm con las configuraciones de servidor respectivas que se indican en cada prueba.</li>
<li>Conéctese a la instancia de Milvus mediante Milvus GO SDK y obtenga los resultados de las pruebas correspondientes.</li>
<li>Cree una colección.</li>
<li>Inserte 1 millón de vectores SIFT. Cree un índice HNSW y configure los parámetros del índice estableciendo <code translate="no">M</code> en <code translate="no">8</code> y <code translate="no">efConstruction</code> en <code translate="no">200</code>.</li>
<li>Cargue la colección.</li>
<li>Busque con diferentes números concurrentes con los parámetros de búsqueda <code translate="no">nq=1, topk=1, ef=64</code>, la duración de cada concurrencia es de al menos 1 hora.</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">Resultados de la prueba<button data-href="#Test-results" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-220-vs-Milvus-210" class="common-anchor-header">Milvus 2.2.0 v.s. Milvus 2.1.0</h3><h4 id="Cluster" class="common-anchor-header">Clúster</h4><p><details>
<summary><b>Configuraciones de servidor (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code></details></p>
<p><strong>Rendimiento de la búsqueda</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fallo/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>6904</td><td>59</td><td>28</td><td>0</td></tr>
<tr><td>2.2.0</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/cluster_search_performance_210_vs_220.png" alt="Cluster search performance" class="doc-image" id="cluster-search-performance" />
   </span> <span class="img-wrapper"> <span>Rendimiento de la búsqueda en clúster</span> </span></p>
<h4 id="Standalone" class="common-anchor-header">Independiente</h4><p><details>
<summary><b>Configuraciones de servidor (autónomo)</b></summary><code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code></details></p>
<p><strong>Rendimiento de búsqueda</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fallo/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>4287</td><td>104</td><td>76</td><td>0</td></tr>
<tr><td>2.2.0</td><td>7522</td><td>127</td><td>79</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/standalone_search_performance_210_vs_220.png" alt="Standalone search performance" class="doc-image" id="standalone-search-performance" />
   </span> <span class="img-wrapper"> <span>Rendimiento de la búsqueda autónoma</span> </span></p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">Milvus 2.2.0 Ampliación</h3><p>Amplíe los núcleos de CPU en un Querynode para comprobar la capacidad de ampliación.</p>
<p><details>
<summary><b>Configuraciones de servidor (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code></details></p>
<p><strong>Rendimiento de búsqueda</strong></p>
<table>
<thead>
<tr><th>Núcleos CPU</th><th>Número concurrente</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fallo/s</th></tr>
</thead>
<tbody>
<tr><td>8</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>12</td><td>300</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
<tr><td>16</td><td>600</td><td>14135</td><td>85</td><td>42</td><td>0</td></tr>
<tr><td>32</td><td>600</td><td>20281</td><td>63</td><td>28</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/search_performance_by_querynode_cpu_cores.png" alt="Search performance by Querynode CPU cores" class="doc-image" id="search-performance-by-querynode-cpu-cores" />
   </span> <span class="img-wrapper"> <span>Rendimiento de búsqueda por núcleos de CPU Querynode</span> </span></p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">Milvus 2.2.0 Ampliación</h3><p>Expanda más réplicas con más Querynodes para comprobar la capacidad de escalado.</p>
<div class="alert note">
<p>Nota: el número de Querynodes es igual a <code translate="no">replica_number</code> cuando se carga la colección.</p>
</div>
<p><details>
<summary><b>Configuraciones de servidor (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code></details></p>
<table>
<thead>
<tr><th>Réplicas</th><th>Número concurrente</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fallo/s</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>2</td><td>500</td><td>15903</td><td>105</td><td>27</td><td>0</td></tr>
<tr><td>4</td><td>800</td><td>19281</td><td>109</td><td>40</td><td>0</td></tr>
<tr><td>8</td><td>1200</td><td>30655</td><td>93</td><td>38</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/search_performance_by_querynode_replicas.png" alt="Search performance by Querynode replicas" class="doc-image" id="search-performance-by-querynode-replicas" />
   </span> <span class="img-wrapper"> <span>Rendimiento de la búsqueda por réplicas de Querynode</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Intente realizar las pruebas de referencia de Milvus 2.2.0 por su cuenta consultando <a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">esta</a> guía, con la salvedad de que debería utilizar en su lugar Milvus 2.2 y Pymilvus 2.2 en esta guía.</li>
</ul>
