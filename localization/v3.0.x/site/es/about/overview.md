---
id: overview.md
title: ¿Qué es Milvus?
related_key: Milvus Overview
summary: >-
  Milvus es una base de datos vectorial de alto rendimiento y gran escalabilidad
  que funciona de manera eficiente en una amplia variedad de entornos, desde un
  ordenador portátil hasta sistemas distribuidos a gran escala. Está disponible
  tanto como software de código abierto como servicio en la nube.
---
<h1 id="What-is-Milvus" class="common-anchor-header">¿Qué es el Milvus?<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><span>Milvus <span style="display: inline-block; vertical-align: middle;">
<audio id="milvus-audio" style="display: none;">
<source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
</audio>
<span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.6.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span></span> es un ave rapaz del género Milvus, perteneciente a la familia de los halcones Accipitridae, famosa por su velocidad en vuelo, su aguda visión y su notable capacidad de adaptación.</p>
<style>
  audio::-webkit-media-controls {
    display: none !important;
  }
</style>
<p>Zilliz adopta el nombre de Milvus para su base de datos vectorial de código abierto, de alto rendimiento y altamente escalable, que funciona de manera eficiente en una amplia gama de entornos, desde un ordenador portátil hasta sistemas distribuidos a gran escala. Está disponible tanto como software de código abierto como servicio en la nube.</p>
<p>Desarrollada por Zilliz y que pronto será cedida a la LF AI &amp; Data Foundation, dependiente de la Linux Foundation, Milvus se ha convertido en uno de los proyectos de bases de datos vectoriales de código abierto más importantes del mundo. Se distribuye bajo la licencia Apache 2.0, y la mayoría de los colaboradores son expertos de la comunidad de computación de alto rendimiento (HPC), especializados en la creación de sistemas a gran escala y en la optimización de código adaptado al hardware. Entre los colaboradores principales se encuentran profesionales de Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba y Microsoft.</p>
<p>Curiosamente, todos los proyectos de código abierto de Zilliz llevan el nombre de un pájaro, una convención de nomenclatura que simboliza la libertad, la visión de futuro y la evolución ágil de la tecnología.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">Datos no estructurados, representaciones vectoriales y Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Los datos no estructurados, como el texto, las imágenes y el audio, varían en formato y contienen una rica semántica subyacente, lo que dificulta su análisis. Para gestionar esta complejidad, se utilizan representaciones para convertir los datos no estructurados en vectores numéricos que capturan sus características esenciales. A continuación, estos vectores se almacenan en una base de datos vectorial, lo que permite realizar búsquedas y análisis rápidos y escalables.</p>
<p>Milvus ofrece sólidas capacidades de modelado de datos, lo que te permite organizar tus datos no estructurados o multimodales en colecciones estructuradas. Admite una amplia gama de tipos de datos para el modelado de diferentes atributos, incluidos los tipos numéricos y de caracteres habituales, diversos tipos de vectores, matrices, conjuntos y JSON, lo que te ahorra el esfuerzo de mantener múltiples sistemas de bases de datos.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" /> 
   <span>Datos no estructurados, representaciones vectoriales y Milvus</span>
  
 </span></p>
<p>Milvus ofrece tres modos de implementación que abarcan una amplia gama de escalas de datos, desde la creación de prototipos locales en Jupyter Notebooks hasta clústeres masivos de Kubernetes que gestionan decenas de miles de millones de vectores:</p>
<ul>
<li>Milvus Lite es una biblioteca de Python que se puede integrar fácilmente en tus aplicaciones. Al ser una versión ligera de Milvus, resulta ideal para la creación rápida de prototipos en Jupyter Notebooks o para ejecutarse en dispositivos periféricos con recursos limitados. <a href="/docs/es/milvus_lite.md">Más información</a>.</li>
<li>Milvus Standalone es una implementación de servidor en una sola máquina, con todos los componentes agrupados en una única imagen de Docker para facilitar la implementación. <a href="/docs/es/install_standalone-docker.md">Más información</a>.</li>
<li>Milvus Distributed se puede implementar en clústeres de Kubernetes y cuenta con una arquitectura nativa de la nube diseñada para escenarios a escala de miles de millones o incluso mayores. Esta arquitectura garantiza la redundancia en los componentes críticos. <a href="/docs/es/install_cluster-milvusoperator.md">Más información</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">¿Qué hace que Milvus sea tan rápido?<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus se diseñó desde el primer momento para ser un sistema de base de datos vectorial altamente eficiente. En la mayoría de los casos, Milvus supera en rendimiento a otras bases de datos vectoriales entre 2 y 5 veces (véanse los resultados de VectorDBBench). Este alto rendimiento es el resultado de varias decisiones de diseño clave:</p>
<p><strong>Optimización adaptada al hardware</strong>: Para que Milvus se adapte a diversos entornos de hardware, hemos optimizado su rendimiento específicamente para numerosas arquitecturas y plataformas de hardware, entre las que se incluyen AVX512, SIMD, GPU y SSD NVMe.</p>
<p><strong>Algoritmos de búsqueda avanzados</strong>: Milvus admite una amplia gama de algoritmos de indexación y búsqueda tanto en memoria como en disco, entre los que se incluyen IVF, HNSW, DiskANN y otros, todos ellos profundamente optimizados. En comparación con implementaciones populares como FAISS y HNSWLib, Milvus ofrece un rendimiento entre un 30 % y un 70 % superior.</p>
<p><strong>Motor de búsqueda en C++</strong>: Más del 80 % del rendimiento de una base de datos vectorial viene determinado por su motor de búsqueda. Milvus utiliza C++ para este componente crítico debido al alto rendimiento del lenguaje, su optimización de bajo nivel y su eficiente gestión de recursos. Y lo que es más importante, Milvus integra numerosas optimizaciones de código adaptadas al hardware, que van desde la vectorización a nivel de ensamblador hasta la paralelización y la programación multihilo, para aprovechar al máximo las capacidades del hardware.</p>
<p><strong>Orientada a columnas</strong>: Milvus es un sistema de base de datos vectorial orientado a columnas. Las principales ventajas provienen de los patrones de acceso a los datos. Al realizar consultas, una base de datos orientada a columnas lee únicamente los campos específicos implicados en la consulta, en lugar de filas completas, lo que reduce considerablemente la cantidad de datos a los que se accede. Además, las operaciones sobre datos basados en columnas pueden vectorizarse fácilmente, lo que permite aplicar las operaciones a columnas enteras de una sola vez, mejorando aún más el rendimiento.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">¿Qué hace que Milvus sea tan escalable?<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>En 2022, Milvus admitía vectores a escala de miles de millones y, en 2023, se amplió a decenas de miles de millones con una estabilidad constante, impulsando escenarios a gran escala para más de 300 grandes empresas, entre las que se incluyen Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection, etc.</p>
<p>La arquitectura de sistema nativa de la nube y altamente desacoplada de Milvus garantiza que el sistema pueda expandirse continuamente a medida que crecen los datos:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" /> 
   <span>Arquitectura de sistema altamente desacoplada de Milvus</span>
  
 </span></p>
<p>Milvus es, en sí mismo, totalmente «stateless», por lo que puede escalarse fácilmente con la ayuda de Kubernetes o de nubes públicas. Además, los componentes de Milvus están bien desacoplados, y las tres tareas más críticas —búsqueda, inserción de datos e indexación/compactación— están diseñadas como procesos fácilmente paralelizables, con la lógica compleja separada. Esto garantiza que los correspondientes nodos de consulta, de datos y de índice puedan escalar tanto vertical como horizontalmente de forma independiente, optimizando el rendimiento y la rentabilidad.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Tipos de búsquedas compatibles con Milvus<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus admite diversos tipos de funciones de búsqueda para satisfacer las necesidades de diferentes casos de uso:</p>
<ul>
<li><a href="/docs/es/single-vector-search.md#Basic-search">Búsqueda ANN</a>: encuentra los K vectores más cercanos a tu vector de consulta.</li>
<li><a href="/docs/es/single-vector-search.md#Filtered-search">Búsqueda con filtrado</a>: realiza una búsqueda ANN bajo condiciones de filtrado especificadas.</li>
<li><a href="/docs/es/single-vector-search.md#Range-search">Búsqueda por rango</a>: encuentra vectores dentro de un radio especificado respecto al vector de consulta.</li>
<li><a href="/docs/es/multi-vector-search.md">Búsqueda híbrida</a>: realiza una búsqueda ANN basada en múltiples campos vectoriales.</li>
<li><a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>: búsqueda de texto completo basada en BM25.</li>
<li><a href="/docs/es/weighted-ranker.md">Reordenación</a>: Ajusta el orden de los resultados de la búsqueda basándose en criterios adicionales o en un algoritmo secundario, refinando los resultados iniciales de la búsqueda ANN.</li>
<li><a href="/docs/es/get-and-scalar-query.md#Get-Entities-by-ID">Recuperación</a>: Recupera datos mediante sus claves primarias.</li>
<li><a href="/docs/es/get-and-scalar-query.md#Use-Basic-Operators">Consulta</a>: recupera datos mediante expresiones específicas.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Conjunto completo de funciones<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>Además de las funciones de búsqueda clave mencionadas anteriormente, Milvus también ofrece un conjunto de funciones implementadas en torno a las búsquedas de la red neuronal artificial (ANN) para que puedas aprovechar al máximo sus capacidades.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API y SDK<button data-href="#API-and-SDK" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/api-reference/restful/v2.6.x/About.md">API RESTful</a> (oficial)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/About.md">PyMilvus</a> (SDK de Python) (oficial)</li>
<li><a href="https://milvus.io/api-reference/go/v2.6.x/About.md">SDK de Go</a> (oficial)</li>
<li><a href="https://milvus.io/api-reference/java/v2.6.x/About.md">SDK de Java</a> (oficial)</li>
<li>SDK para<a href="https://milvus.io/api-reference/node/v2.6.x/About.md">Node.js</a> (JavaScript) (oficial)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (aportado por Microsoft)</li>
<li><a href="https://milvus.io/api-reference/cpp/v2.6.x/About.md">SDK de C++</a> (oficial)</li>
<li>SDK de Rust (en desarrollo)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Tipos de datos avanzados<button data-href="#Advanced-Data-Types" class="anchor-icon" translate="no">
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
    </button></h3><p>Además de los tipos de datos primitivos, Milvus admite diversos tipos de datos avanzados y sus respectivas métricas de distancia aplicables.</p>
<ul>
<li><a href="/docs/es/sparse_vector.md">Vectores dispersos</a></li>
<li><a href="/docs/es/index-vector-fields.md">Vectores binarios</a></li>
<li><a href="/docs/es/use-json-fields.md">Compatibilidad con JSON</a></li>
<li><a href="/docs/es/array_data_type.md">Compatibilidad con matrices</a></li>
<li><a href="/docs/es/geometry-field.md">Geolocalización</a></li>
<li>Texto (en desarrollo)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">¿Por qué Milvus?<button data-href="#Why-Milvus" class="anchor-icon" translate="no">
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
<li><p><strong>Alto rendimiento a gran escala y alta disponibilidad</strong></p>
<p>Milvus cuenta con una <a href="/docs/es/architecture_overview.md">arquitectura distribuida</a> que separa <a href="/docs/es/data_processing.md#Data-query">la computación</a> del <a href="/docs/es/data_processing.md#Data-insertion">almacenamiento</a>. Milvus puede escalar horizontalmente y adaptarse a diversos patrones de tráfico, logrando un rendimiento óptimo al aumentar de forma independiente los nodos de consulta para cargas de trabajo con gran volumen de lecturas y los nodos de datos para cargas de trabajo con gran volumen de escrituras. Los microservicios sin estado en K8s permiten <a href="/docs/es/coordinator_ha.md#Coordinator-HA">una rápida recuperación</a> ante fallos, lo que garantiza una alta disponibilidad. La compatibilidad con <a href="/docs/es/replica.md">réplicas</a> mejora aún más la tolerancia a fallos y el rendimiento al cargar segmentos de datos en múltiples nodos de consulta. Consulta <a href="https://zilliz.com/vector-database-benchmark-tool">la prueba de rendimiento</a> para comparar el rendimiento.</p></li>
<li><p><strong>Compatibilidad con diversos tipos de índices vectoriales y aceleración por hardware</strong></p>
<p>Milvus separa el sistema del motor de búsqueda vectorial principal, lo que le permite admitir todos los principales tipos de índices vectoriales optimizados para diferentes escenarios, incluidos HNSW, IVF, FLAT (fuerza bruta), SCANN y DiskANN, con variaciones <a href="/docs/es/index-explained.md">basadas en la cuantificación</a> y <a href="/docs/es/mmap.md">mmap</a>. Milvus optimiza la búsqueda vectorial para funciones avanzadas como <a href="/docs/es/boolean.md">el filtrado de metadatos</a> y <a href="/docs/es/range-search.md">la búsqueda por rango</a>. Además, Milvus implementa aceleración por hardware para mejorar el rendimiento de la búsqueda vectorial y admite la indexación por GPU, como <a href="/docs/es/gpu-cagra.md">CAGRA</a> de NVIDIA.</p></li>
<li><p><strong>Multitenencia flexible y almacenamiento «caliente»/«frío»</strong></p>
<p>Milvus admite <a href="/docs/es/multi_tenancy.md#Multi-tenancy-strategies">la multitenencia</a> mediante el aislamiento a nivel de base de datos, colección, partición o clave de partición. Estas estrategias flexibles permiten que un único clúster gestione desde cientos hasta millones de usuarios, al tiempo que garantizan un rendimiento de búsqueda optimizado y un control de acceso flexible. Milvus mejora la rentabilidad gracias al almacenamiento «caliente» y «frío». Los datos «calientes», a los que se accede con frecuencia, pueden almacenarse en memoria o en SSD para obtener un mejor rendimiento, mientras que los datos «fríos», a los que se accede con menos frecuencia, se guardan en un almacenamiento más lento y económico. Este mecanismo puede reducir significativamente los costes al tiempo que mantiene un alto rendimiento para las tareas críticas.</p></li>
<li><p><strong>Vector disperso para la búsqueda de texto completo y la búsqueda híbrida</strong></p>
<p>Además de la búsqueda semántica mediante vectores densos, Milvus también admite de forma nativa <a href="/docs/es/full-text-search.md">la búsqueda de texto completo</a> con BM25, así como incrustaciones dispersas aprendidas, como SPLADE y BGE-M3. Los usuarios pueden almacenar vectores dispersos y vectores densos en la misma colección, y definir funciones para reordenar los resultados de múltiples solicitudes de búsqueda. Véanse ejemplos de <a href="/docs/es/full_text_search_with_milvus.md">búsqueda híbrida con búsqueda semántica + búsqueda de texto completo</a>.</p></li>
<li><p><strong>Seguridad de los datos y control de acceso detallado</strong></p>
<p>Milvus garantiza la seguridad de los datos mediante la implementación de <a href="/docs/es/authenticate.md">la autenticación obligatoria de usuarios</a>, <a href="/docs/es/tls.md">el cifrado TLS</a> y <a href="/docs/es/rbac.md">el control de acceso basado en roles (RBAC)</a>. La autenticación de usuarios garantiza que solo los usuarios autorizados con credenciales válidas puedan acceder a la base de datos, mientras que el cifrado TLS protege todas las comunicaciones dentro de la red. Además, el RBAC permite un control de acceso detallado mediante la asignación de permisos específicos a los usuarios en función de sus roles. Estas características convierten a Milvus en una opción sólida y segura para aplicaciones empresariales, ya que protege los datos confidenciales frente al acceso no autorizado y posibles brechas de seguridad.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">Integraciones de IA<button data-href="#AI-Integrations" class="anchor-icon" translate="no">
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
<li><p>Integraciones de modelos de incrustación
Los modelos de incrustación convierten los datos no estructurados en su representación numérica en un espacio de datos de alta dimensión, de modo que puedas almacenarlos en Milvus. Actualmente, PyMilvus, el SDK de Python, integra varios modelos de incrustación para que puedas preparar rápidamente tus datos en incrustaciones vectoriales. Para más detalles, consulta <a href="/docs/es/embeddings.md">la Descripción general de la incrustación</a>.</p></li>
<li><p>Integraciones de modelos de reordenación
En el ámbito de la recuperación de información y la IA generativa, un reordenador es una herramienta esencial que optimiza el orden de los resultados de las búsquedas iniciales. PyMilvus también integra varios modelos de reordenación para optimizar el orden de los resultados devueltos tras las búsquedas iniciales. Para más detalles, consulte <a href="/docs/es/rerankers-overview.md">la Descripción general de los reordenadores</a>.</p></li>
<li><p>Integraciones con LangChain y otras herramientas de IA
En la era de la IA generativa, herramientas como LangChain están despertando un gran interés entre los desarrolladores de aplicaciones. Como componente central, Milvus suele actuar como almacén de vectores en este tipo de herramientas. Para saber cómo integrar Milvus en tus herramientas de IA favoritas, consulta nuestras <a href="/docs/es/integrate_with_openai.md">Integraciones</a> y <a href="/docs/es/build-rag-with-milvus.md">tutoriales</a>.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Herramientas y ecosistema<button data-href="#Tools-and-Ecosystem" class="anchor-icon" translate="no">
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
<li><p>Attu
Attu es una interfaz gráfica de usuario (GUI) intuitiva y «todo en uno» que le ayuda a gestionar Milvus y los datos que almacena. Para obtener más información, consulte el repositorio <a href="https://github.com/zilliztech/attu">de Attu</a>.</p></li>
<li><p>Birdwatcher
Birdwatcher es una herramienta de depuración para Milvus. Al utilizarla para conectarte a etcd, puedes comprobar el estado de tu sistema Milvus o configurarlo sobre la marcha. Para más detalles, consulta <a href="/docs/es/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Integraciones con Prometheus y Grafana
Prometheus es un conjunto de herramientas de código abierto para la monitorización y las alertas de sistemas en Kubernetes. Grafana es una plataforma de visualización de código abierto que puede conectarse con todas las fuentes de datos. Puedes utilizar Prometheus y Grafana como proveedores de servicios de monitorización para supervisar visualmente el rendimiento de Milvus distribuido. Para más detalles, consulta <a href="/docs/es/monitor.md">«Implementación de servicios de monitorización</a>».</p></li>
<li><p>Milvus Backup
Milvus Backup es una herramienta que permite a los usuarios realizar copias de seguridad y restaurar datos de Milvus. Proporciona tanto una interfaz de línea de comandos (CLI) como una API para adaptarse a diferentes escenarios de aplicación. Para obtener más información, consulta <a href="/docs/es/milvus_backup_overview.md">«Milvus Backup</a>».</p></li>
<li><p>Milvus Capture Data Change (CDC)
Milvus CDC puede replicar los cambios en los datos de un clúster de Milvus a otro para la recuperación ante desastres en modo primario-secundario. Para más detalles, consulta <a href="/docs/es/milvus_cdc_overview.md">«Milvus CDC</a>».</p></li>
<li><p>Conectores de Milvus
Milvus ha desarrollado un conjunto de conectores para que puedas integrar Milvus a la perfección con herramientas de terceros, como Apache Spark. Actualmente, puedes utilizar nuestro conector Spark para enviar tus datos de Milvus a Apache Spark con el fin de procesarlos mediante aprendizaje automático. Para obtener más información, consulta <a href="/docs/es/integrate_with_spark.md">«Conector Spark-Milvus</a>».</p></li>
<li><p>Servicios de transmisión vectorial (VTS)
Milvus ofrece un conjunto de herramientas para que puedas transferir tus datos entre una instancia de Milvus y diversas fuentes de datos, entre las que se incluyen clústeres de Zilliz, Elasticsearch, Postgres (PgVector) y otra instancia de Milvus. Para obtener más información, consulta <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
