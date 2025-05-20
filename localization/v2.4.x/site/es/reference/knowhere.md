---
id: knowhere.md
summary: Infórmese sobre Knowhere en Milvus.
title: Knowhere
---
<h1 id="Knowhere" class="common-anchor-header">Knowhere<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema presenta Knowhere, el motor central de ejecución vectorial de Milvus.</p>
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
    </button></h2><p>Knowhere es el motor central de ejecución vectorial de Milvus, que incorpora varias bibliotecas de búsqueda de similitud vectorial, incluyendo <a href="https://github.com/facebookresearch/faiss">Faiss</a>, <a href="https://github.com/nmslib/hnswlib">Hnswlib</a> y <a href="https://github.com/spotify/annoy">Annoy</a>. Knowhere también está diseñado para soportar computación heterogénea. Controla en qué hardware (CPU o GPU) ejecutar la creación de índices y las peticiones de búsqueda. Así es como Knowhere obtiene su nombre - sabiendo dónde ejecutar las operaciones. Más tipos de hardware incluyendo DPU y TPU serán soportados en futuras versiones.</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">Knowhere en la arquitectura Milvus<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>La siguiente figura ilustra la posición de Knowhere en la arquitectura Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
   </span> <span class="img-wrapper"> <span>Knowhere</span> </span></p>
<p>La capa inferior es el hardware del sistema. Encima se encuentran las bibliotecas de índices de terceros. En la capa superior, Knowhere interactúa con el nodo de índice y el nodo de consulta a través de CGO, que permite que los paquetes Go llamen al código C.</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">Ventajas de Knowhere<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>Las siguientes son las ventajas de Knowhere sobre Faiss.</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">Soporte para BitsetView</h4><p>Milvus introduce un mecanismo de conjunto de bits para realizar el &quot;borrado suave&quot;. Un vector borrado suavemente aún existe en la base de datos pero no será computado durante una búsqueda o consulta de similitud de vectores.</p>
<p>Cada bit de un conjunto de bits corresponde a un vector indexado. Si un vector está marcado con un "1" en el conjunto de bits, significa que se ha eliminado de forma suave y no participará en la búsqueda de vectores. El parámetro bitset se aplica a todas las API de consulta de índice Faiss expuestas en Knowhere, incluidos los índices de CPU y GPU.</p>
<p>Para obtener más información sobre el mecanismo de bitset, consulte <a href="/docs/es/v2.4.x/bitset.md">bitset</a>.</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">Soporte para múltiples métricas de similitud para indexar vectores binarios</h4><p>Knowhere soporta <a href="/docs/es/v2.4.x/metric.md#Hamming-distance">Hamming</a>, <a href="/docs/es/v2.4.x/metric.md#Jaccard-distance">Jaccard</a>, <a href="/docs/es/v2.4.x/metric.md#Tanimoto-distance">Tanimoto</a>, <a href="/docs/es/v2.4.x/metric.md#Superstructure">Superestructura</a> y <a href="/docs/es/v2.4.x/metric.md#Substructure">Subestructura</a>. Jaccard y Tanimoto pueden utilizarse para medir la similitud entre dos conjuntos de muestras mientras que Superstructure y Substructure pueden utilizarse para medir la similitud de estructuras químicas.</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">Compatibilidad con el conjunto de instrucciones AVX512</h4><p>Además de <a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a>, <a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">SSE4.2</a> y <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">AVX2</a>, los conjuntos de instrucciones ya soportados por Faiss, Knowhere también soporta <a href="https://en.wikipedia.org/wiki/AVX-512">AVX512</a>, que puede <a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">mejorar el rendimiento de la creación de índices y consultas entre un 20% y un 30%</a> en comparación con AVX2.</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">Selección automática de instrucciones SIMD</h4><p>Knowhere soporta la invocación automática de las instrucciones SIMD adecuadas (por ejemplo, SIMD SSE, AVX, AVX2 y AVX512) en cualquier procesador de CPU (tanto en plataformas locales como en la nube), por lo que los usuarios no necesitan especificar manualmente la bandera SIMD (por ejemplo, "-msse4") durante la compilación.</p>
<p>Knowhere se construye mediante la refactorización del código base de Faiss. Las funciones comunes (por ejemplo, el cálculo de similitudes) que dependen de las aceleraciones SIMD se eliminan. Luego, para cada función, se implementan cuatro versiones (es decir, SSE, AVX, AVX2, AVX512) y cada una se coloca en un archivo fuente separado. A continuación, los archivos fuente se compilan individualmente con el indicador SIMD correspondiente. Por lo tanto, en tiempo de ejecución, Knowhere puede elegir automáticamente las instrucciones SIMD más adecuadas basándose en las banderas actuales de la CPU y, a continuación, enlazar los punteros de función correctos utilizando hooking.</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">Otras optimizaciones de rendimiento</h4><p>Lea <a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">Milvus: Un Sistema de Administración de Datos Vectoriales Hecho a Medida</a> para más información sobre la optimización del rendimiento de Knowhere.</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">Estructura del código Knowhere<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>La computación en Milvus involucra principalmente operaciones vectoriales y escalares. Knowhere sólo maneja las operaciones de indexación de vectores.</p>
<p>Un índice es una estructura de datos independiente de los datos vectoriales originales. Generalmente, la indexación requiere cuatro pasos: crear un índice, entrenar datos, insertar datos y construir un índice. En algunas aplicaciones de IA, el entrenamiento de los conjuntos de datos se separa de la búsqueda de vectores. Los datos de los conjuntos de datos se entrenan primero y luego se insertan en una base de datos vectorial como Milvus para la búsqueda de similitudes. Por ejemplo, los conjuntos de datos abiertos sift1M y sift1B diferencian los datos para entrenamiento y los datos para pruebas.</p>
<p>Sin embargo, en Knowhere, los datos para el entrenamiento y para la búsqueda son los mismos. Knowhere entrena todos los datos en un <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">segmento</a> y luego inserta todos los datos entrenados y construye un índice para ellos.</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>Clase base</h4><p><code translate="no">DataObj</code> es la clase base de todas las estructuras de datos en Knowhere. <code translate="no">Size()</code> es el único método virtual en <code translate="no">DataObj</code>. La clase Index hereda de <code translate="no">DataObj</code> con un campo llamado &quot;size_&quot;. La clase Index también tiene dos métodos virtuales - <code translate="no">Serialize()</code> y <code translate="no">Load()</code>. La clase <code translate="no">VecIndex</code> derivada de <code translate="no">Index</code> es la clase base virtual para todos los índices vectoriales. <code translate="no">VecIndex</code> proporciona métodos que incluyen <code translate="no">Train()</code>, <code translate="no">Query()</code>, <code translate="no">GetStatistics()</code>, y <code translate="no">ClearStatistics()</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
   </span> <span class="img-wrapper"> <span>clase base</span> </span></p>
<p>Algunos otros tipos de índices aparecen a la derecha en la figura anterior.</p>
<ul>
<li><p>El índice Faiss tiene dos clases base: <code translate="no">FaissBaseIndex</code> para todos los índices sobre vectores en coma flotante, y <code translate="no">FaissBaseBinaryIndex</code> para todos los índices sobre vectores binarios.</p></li>
<li><p><code translate="no">GPUIndex</code> es la clase base para todos los índices GPU de Faiss.</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> es la clase base para todos los índices de desarrollo propio. Dado que en un archivo de índice sólo se almacenan los ID de los vectores, el tamaño del archivo para vectores de 128 dimensiones puede reducirse en 2 órdenes de magnitud.</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>Búsqueda por fuerza bruta</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
   </span> <span class="img-wrapper"> <span>IDMAP</span> </span></p>
<p>Técnicamente hablando, <code translate="no">IDMAP</code> no es un índice, sino que se utiliza para la búsqueda por fuerza bruta. Cuando se insertan vectores en la base de datos, no es necesario ni el entrenamiento de los datos ni la construcción de índices. Las búsquedas se realizarán directamente sobre los datos vectoriales insertados.</p>
<p>Sin embargo, por coherencia del código, <code translate="no">IDMAP</code> también hereda de la clase <code translate="no">VecIndex</code> con todas sus interfaces virtuales. El uso de <code translate="no">IDMAP</code> es el mismo que el de otros índices.</p>
<h4 id="IVF-indices" class="common-anchor-header">Índices IVF</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
   </span> <span class="img-wrapper"> <span>IVF</span> </span></p>
<p>Los índices IVF (archivo invertido) son los más utilizados. La clase <code translate="no">IVF</code> se deriva de <code translate="no">VecIndex</code> y <code translate="no">FaissBaseIndex</code>, y se extiende a <code translate="no">IVFSQ</code> y <code translate="no">IVFPQ</code>. <code translate="no">GPUIVF</code> se deriva de <code translate="no">GPUIndex</code> y <code translate="no">IVF</code>. A continuación, <code translate="no">GPUIVF</code> se amplía a <code translate="no">GPUIVFSQ</code> y <code translate="no">GPUIVFPQ</code>.</p>
<p><code translate="no">IVFSQHybrid</code> es un índice híbrido de desarrollo propio. Un cuantificador grueso se ejecuta en la GPU mientras que la búsqueda en el cubo se realiza en la CPU. Este tipo de índice puede reducir el número de copias de memoria entre la CPU y la GPU aprovechando la potencia de cálculo de la GPU. <code translate="no">IVFSQHybrid</code> tiene la misma tasa de recuperación que <code translate="no">GPUIVFSQ</code> pero ofrece un mejor rendimiento.</p>
<p>La estructura de clases base de los índices binarios es relativamente más sencilla. <code translate="no">BinaryIDMAP</code> y <code translate="no">BinaryIVF</code> derivan de <code translate="no">FaissBaseBinaryIndex</code> y <code translate="no">VecIndex</code>.</p>
<h4 id="Third-party-indices" class="common-anchor-header">Índices de terceros</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/third_party_index.png" alt="third-party indices" class="doc-image" id="third-party-indices" />
   </span> <span class="img-wrapper"> <span>índices de terceros</span> </span></p>
<p>Actualmente, sólo se admiten dos tipos de índices de terceros aparte de Faiss: el índice basado en árboles <code translate="no">Annoy</code>, y el índice basado en gráficos <code translate="no">HNSW</code>. Estos dos índices de terceros, comunes y de uso frecuente, se derivan de <code translate="no">VecIndex</code>.</p>
<h2 id="Adding-indices-to-Knowhere" class="common-anchor-header">Añadir índices a Knowhere<button data-href="#Adding-indices-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>Si desea añadir nuevos índices a Knowhere, primero puede hacer referencia a los índices existentes:</p>
<ul>
<li><p>Para añadir índices basados en cuantización, consulte <code translate="no">IVF_FLAT</code>.</p></li>
<li><p>Para añadir índices basados en gráficos, consulte <code translate="no">HNSW</code>.</p></li>
<li><p>Para añadir índices basados en árboles, consulte <code translate="no">Annoy</code>.</p></li>
</ul>
<p>Después de referirse al índice existente, puede seguir los siguientes pasos para agregar un nuevo índice a Knowhere.</p>
<ol>
<li><p>Añada el nombre del nuevo índice en <code translate="no">IndexEnum</code>. El tipo de datos es cadena.</p></li>
<li><p>Agregue la comprobación de validación de datos en el nuevo índice en el archivo <code translate="no">ConfAdapter.cpp</code>. La comprobación de validación es principalmente para validar los parámetros para la formación de datos y consulta.</p></li>
<li><p>Cree un nuevo archivo para el nuevo índice. La clase base del nuevo índice debe incluir <code translate="no">VecIndex</code>, y la interfaz virtual necesaria de <code translate="no">VecIndex</code>.</p></li>
<li><p>Añade la lógica de construcción del nuevo índice en <code translate="no">VecIndexFactory::CreateVecIndex()</code>.</p></li>
<li><p>Añade la prueba unitaria en el directorio <code translate="no">unittest</code>.</p></li>
</ol>
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
    </button></h2><p>Después de aprender cómo funciona Knowhere en Milvus, es posible que también desee:</p>
<ul>
<li><p>Aprender sobre los <a href="/docs/es/v2.4.x/index.md">distintos tipos de índices que soporta Milvus</a>.</p></li>
<li><p>Aprender sobre <a href="/docs/es/v2.4.x/bitset.md">el mecanismo de conjuntos de bits</a>.</p></li>
<li><p>Comprender <a href="/docs/es/v2.4.x/data_processing.md">cómo se procesan los datos</a> en Milvus.</p></li>
</ul>
