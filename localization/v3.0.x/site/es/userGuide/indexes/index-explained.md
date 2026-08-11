---
id: index-explained.md
title: Explicación de los índices
summary: >-
  Un índice es una estructura adicional que se crea sobre los datos. Su
  estructura interna depende del algoritmo de búsqueda de vecinos más cercanos
  que se utilice. Un índice agiliza la búsqueda, pero conlleva un gasto
  adicional de tiempo de preprocesamiento, espacio y memoria RAM durante la
  búsqueda. Además, el uso de un índice suele reducir la tasa de recuperación
  (aunque el efecto es insignificante, sigue siendo relevante). Por lo tanto,
  este artículo explica cómo minimizar los costes derivados del uso de un índice
  y, al mismo tiempo, maximizar sus beneficios.
---
<h1 id="Index-Explained" class="common-anchor-header">Explicación de los índices<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Un índice es una estructura adicional creada a partir de los datos. Su estructura interna depende del algoritmo de búsqueda del vecino más cercano que se utilice. Un índice agiliza la búsqueda, pero conlleva un mayor consumo de tiempo de preprocesamiento, espacio y memoria RAM durante la búsqueda. Además, el uso de un índice suele reducir la tasa de recuperación (aunque el efecto es insignificante, sigue siendo relevante). Por lo tanto, este artículo explica cómo minimizar los costes del uso de un índice y, al mismo tiempo, maximizar sus beneficios.</p>
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
    </button></h2><p>En Milvus, los índices son específicos para cada campo, y los tipos de índice aplicables varían en función de los tipos de datos de los campos de destino. Como base de datos vectorial profesional, Milvus se centra en mejorar tanto el rendimiento de las búsquedas vectoriales como el filtrado escalar, por lo que ofrece varios tipos de índice.</p>
<p>La siguiente tabla muestra la relación de correspondencia entre los tipos de datos de los campos y los tipos de índice aplicables.</p>
<table>
   <tr>
     <th><p>Tipo de datos del campo</p></th>
     <th><p>Tipos de índice aplicables</p></th>
   </tr>
   <tr>
     <td><p>FLOAT_VECTOR</p></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>FAISS</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_FUERZA BRUTA</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li><li><p>INT8_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_FUERZA BRUTA</p></li></ul></td>
   </tr>
   <tr>
     <td><p>VECTOR_BINARIO</p></td>
     <td><ul><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>MINHASH_LSH</p></li><li><p>FAISS</p></li></ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>ÍNDICE_INVERTIDO_DISPARSE</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTIDO (recomendado)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li><p>BITMAP (Recomendado)</p></li><li><p>INVERTIDO</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li><p>INVERTIDO</p></li><li><p>STL_SORT</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT</p></li><li><p>DOBLE</p></li></ul></td>
     <td><p>INVERTIDO</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elementos de los tipos BOOL, INT8/16/32/64 y VARCHAR)</sup></p></td>
     <td><p>BITMAP (recomendado)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elementos de los tipos BOOL, INT8/16/32/64, FLOAT, DOUBLE y VARCHAR)</sup></p></td>
     <td><p>INVERTIDO</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTIDO</p></td>
   </tr>
</table>
<p>Este artículo se centra en cómo seleccionar los índices vectoriales adecuados. Para los campos escalares, siempre se puede utilizar el tipo de índice recomendado.</p>
<p>La selección de un tipo de índice adecuado para una búsqueda vectorial puede influir significativamente en el rendimiento y el uso de recursos. A la hora de elegir un tipo de índice para un campo vectorial, es fundamental tener en cuenta diversos factores, como la estructura de datos subyacente, el uso de memoria y los requisitos de rendimiento.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">Anatomía de un índice vectorial<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Tal y como se muestra en el diagrama siguiente, un tipo de índice en Milvus consta de tres componentes principales: <strong>la estructura de datos</strong>, <strong>la cuantificación</strong> y <strong>el refinador</strong>. La cuantificación y el refinador son opcionales, pero se utilizan ampliamente debido a su excelente relación entre beneficios y costes.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" /> 
   <span>Anatomía del índice vectorial</span>
  
 </span></p>
<p>Durante la creación del índice, Milvus combina la estructura de datos y el método de cuantificación elegidos para determinar una <strong>tasa de expansión</strong> óptima. En el momento de la consulta, el sistema recupera un <code translate="no">topK × expansion rate</code> e de vectores candidatos, aplica el refinador para recalcular las distancias con mayor precisión y, finalmente, devuelve los resultados más precisos <code translate="no">topK</code>. Este enfoque híbrido equilibra la velocidad y la precisión al restringir el refinamiento, que consume muchos recursos, a un subconjunto filtrado de candidatos.</p>
<h3 id="Data-structure" class="common-anchor-header">Estructura de datos<button data-href="#Data-structure" class="anchor-icon" translate="no">
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
    </button></h3><p>La estructura de datos constituye la capa fundamental del índice. Entre los tipos más comunes se incluyen:</p>
<ul>
<li><p><strong>Archivo invertido (IVF)</strong></p>
<p>Los tipos de índice de la serie IVF permiten a Milvus agrupar vectores en compartimentos mediante una partición basada en centroides. Por lo general, es seguro suponer que todos los vectores de un compartimento probablemente estén cerca del vector de consulta si el centroide del compartimento está cerca de dicho vector. Partiendo de esta premisa, Milvus solo analiza las representaciones vectoriales de aquellos compartimentos cuyos centroides se encuentran cerca del vector de consulta, en lugar de examinar todo el conjunto de datos. Esta estrategia reduce los costes computacionales al tiempo que mantiene una precisión aceptable.</p>
<p>Este tipo de estructura de datos de índice es ideal para conjuntos de datos a gran escala que requieren un rendimiento rápido.</p></li>
<li><p><strong>Estructura basada en grafos</strong></p>
<p>Una estructura de datos basada en grafos para la búsqueda vectorial, como Hierarchical Navigable Small World (<a href="https://arxiv.org/abs/1603.09320">HNSW</a>), construye un grafo en capas en el que cada vector se conecta con sus vecinos más cercanos. Las consultas navegan por esta jerarquía, partiendo de las capas superiores más generales y pasando a las capas inferiores, lo que permite una complejidad de búsqueda eficiente en tiempo logarítmico.</p>
<p>Este tipo de estructura de datos de índice destaca en espacios de alta dimensión y en escenarios que exigen consultas de baja latencia.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">Cuantificación<button data-href="#Quantization" class="anchor-icon" translate="no">
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
    </button></h3><p>La cuantificación reduce el consumo de memoria y los costes computacionales mediante una representación más simplificada:</p>
<ul>
<li><p><strong>La cuantización escalar</strong> (por ejemplo, <strong>SQ8</strong>) permite a Milvus comprimir cada dimensión del vector en un solo byte (8 bits), lo que reduce el uso de memoria en un 75 % en comparación con los números flotantes de 32 bits, al tiempo que se conserva una precisión razonable.</p></li>
<li><p><strong>La cuantización de productos</strong> (<strong>PQ</strong>) permite a Milvus dividir los vectores en subvectores y codificarlos mediante agrupamiento basado en un libro de códigos. De este modo se consiguen mayores ratios de compresión (p. ej., de 4 a 32 veces) a costa de una reducción marginal de la recuperación, lo que la hace adecuada para entornos con limitaciones de memoria.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">Refinador<button data-href="#Refiner" class="anchor-icon" translate="no">
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
    </button></h3><p>La cuantificación conlleva pérdidas inherentes. Para mantener la tasa de recuperación, la cuantificación genera sistemáticamente más candidatos «top-K» de los necesarios, lo que permite a los refinadores utilizar una mayor precisión para seleccionar posteriormente los resultados «top-K» entre estos candidatos, mejorando así la tasa de recuperación.</p>
<p>Por ejemplo, el refinador FP32 opera sobre los candidatos a resultados de búsqueda devueltos por la cuantificación, recalculando las distancias con precisión FP32 en lugar de utilizar los valores cuantificados.</p>
<p>Esto resulta fundamental para aplicaciones que requieren un equilibrio entre la eficiencia de la búsqueda y la precisión, como la búsqueda semántica o los sistemas de recomendación, en los que pequeñas variaciones en la distancia afectan significativamente a la calidad de los resultados.</p>
<h3 id="Summary" class="common-anchor-header">Resumen<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h3><p>Esta arquitectura por niveles —filtrado grueso mediante estructuras de datos, cálculo eficiente a través de la cuantificación y ajuste de la precisión mediante el refinamiento— permite a Milvus optimizar de forma adaptativa el equilibrio entre precisión y rendimiento.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">Compromisos de rendimiento<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>A la hora de evaluar el rendimiento, es fundamental equilibrar <strong>el tiempo de creación</strong>, <strong>las consultas por segundo (QPS)</strong> y <strong>la tasa de recuperación</strong>. Las reglas generales son las siguientes:</p>
<ul>
<li><p><strong>Los tipos de índice basados en grafos</strong> suelen superar a <strong>las variantes IVF</strong> en términos de <strong>QPS</strong>.</p></li>
<li><p><strong>Las variantes IVF</strong> se adaptan especialmente bien a escenarios con <strong>un topK elevado (por ejemplo, superior a 2.000)</strong>.</p></li>
<li><p><strong>PQ</strong> suele ofrecer una mejor tasa de recuperación con tasas de compresión similares en comparación con <strong>SQ</strong>, aunque este último proporciona un rendimiento más rápido.</p></li>
<li><p>El uso de discos duros para parte del índice (como en <strong>DiskANN</strong>) ayuda a gestionar grandes conjuntos de datos, pero también introduce posibles cuellos de botella en las IOPS.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">Capacidad<button data-href="#Capacity" class="anchor-icon" translate="no">
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
    </button></h3><p>La capacidad suele implicar la relación entre el tamaño de los datos y la RAM disponible. A la hora de abordar la capacidad, ten en cuenta lo siguiente:</p>
<ul>
<li><p>Si una cuarta parte de los datos sin procesar cabe en la memoria, plantéate utilizar DiskANN por su latencia estable.</p></li>
<li><p>Si todos los datos sin procesar caben en la memoria, plantéate utilizar tipos de índice basados en memoria y mmap.</p></li>
<li><p>Puede utilizar los tipos de índice con cuantificación aplicada y mmap para sacrificar precisión a cambio de la máxima capacidad.</p></li>
</ul>
<div class="alert note">
<p>Mmap no siempre es la solución. Cuando la mayor parte de los datos se encuentra en el disco, DiskANN ofrece una mejor latencia.</p>
</div>
<h3 id="Recall" class="common-anchor-header">Recuperación<button data-href="#Recall" class="anchor-icon" translate="no">
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
    </button></h3><p>La recuperación suele estar relacionada con la tasa de filtrado, que se refiere a los datos que se descartan antes de las búsquedas. A la hora de abordar la recuperación, ten en cuenta lo siguiente:</p>
<ul>
<li><p>Si la tasa de filtrado es inferior al 85 %, los tipos de índice basados en grafos superan a las variantes de IVF.</p></li>
<li><p>Si la tasa de filtrado está entre el 85 % y el 95 %, utiliza variantes de IVF.</p></li>
<li><p>Si la tasa de filtrado es superior al 98 %, utiliza Brute-Force (FLAT) para obtener los resultados de búsqueda más precisos.</p></li>
</ul>
<div class="alert note">
<p>Los puntos anteriores no siempre son correctos. Se recomienda ajustar la recuperación con diferentes tipos de índice para determinar cuál funciona mejor.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Rendimiento<button data-href="#Performance" class="anchor-icon" translate="no">
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
    </button></h3><p>El rendimiento de una búsqueda suele estar relacionado con el «top-K», que se refiere al número de registros que devuelve la búsqueda. A la hora de evaluar el rendimiento, ten en cuenta lo siguiente:</p>
<ul>
<li><p>Para una búsqueda con un «top-K» reducido (por ejemplo, 2 000) que requiera una alta tasa de recuperación, los tipos de índice basados en grafos superan a las variantes de IVF.</p></li>
<li><p>Para una búsqueda con un «top-K» elevado (en comparación con el número total de incrustaciones vectoriales), las variantes de IVF son una mejor opción que los tipos de índice basados en grafos.</p></li>
<li><p>Para una búsqueda con un «top-K» de tamaño medio y una alta tasa de filtrado, las variantes de IVF son la mejor opción.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Matriz de decisión: elección del tipo de índice más adecuado<button data-href="#Decision-Matrix-Choosing-the-most-appropriate-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>La siguiente tabla es una matriz de decisión a la que puede recurrir a la hora de elegir un tipo de índice adecuado.</p>
<table>
   <tr>
     <th><p>Escenario</p></th>
     <th><p>Índice recomendado</p></th>
     <th><p>Notas</p></th>
   </tr>
   <tr>
     <td><p>Los datos sin procesar caben en la memoria</p></td>
     <td><p>HNSW, IVF + Refinamiento</p></td>
     <td><p>Utiliza HNSW para un bajo<code translate="no">k</code> o y un alto recall.</p></td>
   </tr>
   <tr>
     <td><p>Datos sin procesar en disco, SSD</p></td>
     <td><p>DiskANN</p></td>
     <td><p>Óptimo para consultas sensibles a la latencia.</p></td>
   </tr>
   <tr>
     <td><p>Datos sin procesar en disco, RAM limitada</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Equilibra el acceso a la memoria y al disco.</p></td>
   </tr>
   <tr>
     <td><p>Alta tasa de filtrado (&gt;95 %)</p></td>
     <td><p>Fuerza bruta (FLAT)</p></td>
     <td><p>Evita la sobrecarga del índice para conjuntos de candidatos muy pequeños.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">k</code> e grande (≥1 % del conjunto de datos)</p></td>
     <td><p>IVF</p></td>
     <td><p>La poda de clústeres reduce la carga computacional.</p></td>
   </tr>
   <tr>
     <td><p>Tasa de recuperación extremadamente alta (&gt;99 %)</p></td>
     <td><p>Fuerza bruta (FLAT) + GPU</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">Estimación del uso de memoria<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>Esta sección se centra en el cálculo del consumo de memoria de un tipo de índice específico e incluye numerosos detalles técnicos. Puedes saltarte esta sección sin problema si no te interesa.</p>
</div>
<p>El consumo de memoria de un índice viene determinado por su estructura de datos, la tasa de compresión mediante cuantificación y el refinador utilizado. En términos generales, los índices basados en grafos suelen tener una mayor huella de memoria debido a la estructura del grafo (p. ej., <strong>HNSW</strong>), lo que normalmente implica una sobrecarga notable por espacio vectorial. Por el contrario, IVF y sus variantes son más eficientes en cuanto a memoria, ya que la sobrecarga por espacio vectorial es menor. Sin embargo, técnicas avanzadas como <strong>DiskANN</strong> permiten que partes del índice, como el grafo o el refinador, residan en el disco, lo que reduce la carga de memoria sin perder rendimiento.</p>
<p>Concretamente, el uso de memoria de un índice se puede calcular de la siguiente manera:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">Uso de memoria de los índices IVF<button data-href="#IVF-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>Los índices IVF equilibran la eficiencia de memoria con el rendimiento de la búsqueda mediante la partición de los datos en clústeres. A continuación se muestra un desglose de la memoria utilizada por un millón de vectores de 128 dimensiones indexados mediante variantes de IVF.</p>
<ol>
<li><p><strong>Cálculo de la memoria utilizada por los centroides.</strong></p>
<p>Los tipos de índice de la serie IVF permiten a Milvus agrupar vectores en compartimentos mediante una partición basada en centroides. Cada centroide se incluye en el índice en forma de incrustación vectorial sin procesar. Al dividir los vectores en 2.000 clústeres, el uso de memoria se puede calcular de la siguiente manera:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcular la memoria utilizada por las asignaciones a clústeres.</strong></p>
<p>Cada incrustación de vector se asigna a un clúster y se almacena como un identificador entero. Para 2.000 clústeres, basta con un entero de 2 bytes. El uso de memoria se puede calcular de la siguiente manera:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcular la compresión provocada por la cuantificación.</strong></p>
<p>Las variantes de IVF suelen utilizar PQ y SQ8, y el consumo de memoria se puede estimar de la siguiente manera:</p>
<ul>
<li><p>Uso de PQ con 8 subcuantificadores</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Utilizando SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>La siguiente tabla recoge el consumo de memoria estimado con diferentes configuraciones:</p>
<p><table>
<tr>
<th><p>Configuración</p></th>
<th><p>Estimación de memoria</p></th>
<th><p>Memoria total</p></th>
</tr>
<tr>
<td><p>IVF-PQ (sin refinamiento)</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB</p></td>
<td><p>11,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10 % de refinamiento bruto</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB + 51,2 MB</p></td>
<td><p>62,2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (sin refinamiento)</p></td>
<td><p>1,0 MB + 2,0 MB + 128 MB</p></td>
<td><p>131,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (vectores sin procesar completos)</p></td>
<td><p>1,0 MB + 2,0 MB + 512 MB</p></td>
<td><p>515,0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>Calcular la sobrecarga del refinamiento.</strong></p>
<p>Las variantes de IVF suelen combinarse con un refinador para volver a clasificar los candidatos. Para una búsqueda que recupere los 10 primeros resultados con una tasa de expansión de 5, la sobrecarga de refinamiento puede estimarse de la siguiente manera:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Uso de memoria de los índices basados en grafos<button data-href="#Graph-based-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>Los tipos de índice basados en grafos, como HNSW, requieren una cantidad significativa de memoria para almacenar tanto la estructura del grafo como las incrustaciones vectoriales sin procesar. A continuación se muestra un desglose detallado de la memoria consumida por 1 millón de vectores de 128 dimensiones indexados utilizando el tipo de índice HNSW.</p>
<ol>
<li><p><strong>Cálculo de la memoria utilizada por la estructura del grafo.</strong></p>
<p>Cada vector en HNSW mantiene conexiones con sus vecinos. Con un grado del grafo (aristas por nodo) de 32, la memoria consumida se puede calcular de la siguiente manera:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcular la memoria utilizada por las representaciones vectoriales sin procesar.</strong></p>
<p>La memoria consumida al almacenar vectores FP32 sin comprimir se puede calcular de la siguiente manera:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>Al utilizar HNSW para indexar el millón de representaciones vectoriales de 128 dimensiones, la memoria total en uso sería de <strong>128 MB (grafo) + 512 MB (vectores) = 640 MB</strong>.</p></li>
<li><p><strong>Calcular la compresión provocada por la cuantificación.</strong></p>
<p>La cuantificación reduce el tamaño de los vectores. Por ejemplo, el uso de PQ con 8 subcuantificadores (8 bytes por vector) da lugar a una compresión drástica. La memoria consumida por las representaciones vectoriales comprimidas se puede calcular de la siguiente manera:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>Esto supone una tasa de compresión de 64 veces en comparación con las representaciones vectoriales sin procesar, y la memoria total utilizada por el tipo de índice <strong>HNSWPQ</strong> sería de <strong>128 MB (grafo) + 8 MB (vector comprimido) = 136 MB</strong>.</p></li>
<li><p><strong>Calcular la sobrecarga del refinamiento.</strong></p>
<p>El refinamiento, como la reordenación con vectores sin procesar, carga temporalmente datos de alta precisión en la memoria. Para una búsqueda que recupere los 10 primeros resultados con una tasa de expansión de 5, la sobrecarga de refinamiento puede estimarse de la siguiente manera:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">Otras consideraciones<button data-href="#Other-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>Mientras que los índices IVF y basados en grafos optimizan el uso de la memoria mediante la cuantificación, los archivos mapeados en memoria (mmap) y DiskANN abordan situaciones en las que los conjuntos de datos superan la memoria de acceso aleatorio (RAM) disponible.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN es un índice basado en el grafo de Vamana que conecta puntos de datos para permitir una navegación eficiente durante la búsqueda, al tiempo que aplica PQ para reducir el tamaño de los vectores y permitir un cálculo rápido y aproximado de la distancia entre ellos.</p>
<p>El grafo de Vamana se almacena en disco, lo que permite a DiskANN gestionar grandes conjuntos de datos que, de otro modo, serían demasiado grandes para caber en la memoria. Esto resulta especialmente útil para conjuntos de datos de miles de millones de puntos.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">Archivos mapeados en memoria (mmap)</h4><p>El mapeo de memoria (mmap) permite el acceso directo a la memoria de archivos de gran tamaño en el disco, lo que permite a Milvus almacenar índices y datos tanto en la memoria como en los discos duros. Este enfoque ayuda a optimizar las operaciones de E/S al reducir la sobrecarga de las llamadas de E/S en función de la frecuencia de acceso, ampliando así la capacidad de almacenamiento de las colecciones sin afectar significativamente al rendimiento de la búsqueda.</p>
<p>En concreto, puedes configurar Milvus para que asigne a memoria los datos sin procesar de determinados campos, en lugar de cargarlos íntegramente en la memoria. De este modo, puedes obtener acceso directo a la memoria de dichos campos sin preocuparte por problemas de memoria y ampliar la capacidad de la colección.</p>
