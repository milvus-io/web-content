---
id: index-explained.md
title: Explicación de los índices
summary: >-
  Un índice es una estructura adicional construida sobre los datos. Su
  estructura interna depende del algoritmo de búsqueda aproximada por vecino más
  próximo que se utilice. Un índice acelera la búsqueda, pero requiere más
  tiempo de preprocesamiento, espacio y memoria RAM durante la búsqueda. Además,
  el uso de un índice suele reducir la tasa de recuperación (aunque el efecto es
  insignificante, sigue siendo importante). Por lo tanto, este artículo explica
  cómo minimizar los costes de utilizar un índice al tiempo que se maximizan los
  beneficios.
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
    </button></h1><p>Un índice es una estructura adicional construida sobre los datos. Su estructura interna depende del algoritmo de búsqueda aproximada por vecino más próximo que se utilice. Un índice acelera la búsqueda, pero requiere más tiempo de preprocesamiento, espacio y memoria RAM durante la búsqueda. Además, el uso de un índice suele reducir la tasa de recuperación (aunque el efecto es insignificante, sigue siendo importante). Por lo tanto, este artículo explica cómo minimizar los costes del uso de un índice y maximizar sus beneficios.</p>
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
    </button></h2><p>En Milvus, los índices son específicos de los campos, y los tipos de índice aplicables varían en función de los tipos de datos de los campos de destino. Como base de datos vectorial profesional, Milvus se centra en mejorar tanto el rendimiento de las búsquedas vectoriales como el filtrado escalar, razón por la cual ofrece varios tipos de índice.</p>
<p>La siguiente tabla muestra la relación entre los tipos de datos de campo y los tipos de índice aplicables.</p>
<table>
   <tr>
     <th><p>Tipo de datos de campo</p></th>
     <th><p>Tipos de índice aplicables</p></th>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT_VECTOR</p></li><li><p>VECTOR_FLOT16</p></li><li><p>BFLOAT16_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>HNSW</p></li><li><p>DISKANN</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BINARY_VECTOR</p></td>
     <td><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>SPARSE_INVERTED_INDEX</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTED (Recomendado)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li>BITMAP (Recomendado)</li><li>INVERTIDO</li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li>INVERTIDO</li><li>STL_SORT</li></ul></td>
   </tr>
   <tr>
     <td><ul><li>FLOAT</li><li>DOUBLE</li></ul></td>
     <td><p>INVERTIDO</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elementos de tipo BOOL, INT8/16/32/64 y VARCHAR)</sup></p></td>
     <td><p>BITMAP (recomendado)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(elementos de tipo BOOL, INT8/16/32/64, FLOAT, DOUBLE y VARCHAR)</sup></p></td>
     <td><p>INVERTIDO</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTIDO</p></td>
   </tr>
</table>
<p>Este artículo se centra en cómo seleccionar los índices vectoriales adecuados. Para los campos escalares, siempre se puede utilizar el tipo de índice recomendado.</p>
<p>La selección de un tipo de índice apropiado para una búsqueda vectorial puede afectar significativamente al rendimiento y al uso de recursos. Al elegir un tipo de índice para un campo vectorial, es esencial tener en cuenta varios factores, como la estructura de datos subyacente, el uso de memoria y los requisitos de rendimiento.</p>
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
    </button></h2><p>Como se muestra en el siguiente diagrama, un tipo de índice en Milvus consta de tres componentes principales, a saber, <strong>estructura de datos</strong>, <strong>cuantificación</strong> y <strong>refinador</strong>. La cuantificación y el refinador son opcionales, pero se utilizan ampliamente debido a un importante equilibrio entre beneficios y costes.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/vector-index-anatomy.png" alt="vector-index-anatomy" class="doc-image" id="vector-index-anatomy" />
   </span> <span class="img-wrapper"> <span>vector-index-anatomy</span> </span></p>
<p>Durante la creación del índice, Milvus combina la estructura de datos elegida y el método de cuantificación para determinar un <strong>índice de expansión</strong> óptimo. En el momento de la consulta, el sistema recupera <code translate="no">topK × expansion rate</code> vectores candidatos, aplica el refinador para recalcular las distancias con mayor precisión y, por último, devuelve los resultados más exactos <code translate="no">topK</code>. Este enfoque híbrido equilibra velocidad y precisión al restringir el refinamiento, que consume muchos recursos, a un subconjunto filtrado de candidatos.</p>
<h3 id="Data-structure" class="common-anchor-header">Estructura de datos</h3><p>La estructura de datos constituye la base del índice. Los tipos más comunes son:</p>
<ul>
<li><p><strong>Archivo invertido (IVF)</strong></p>
<p>Los tipos de índice de la serie IVF permiten a Milvus agrupar vectores en cubos mediante la partición basada en centroides. Generalmente es seguro asumir que todos los vectores en un cubo probablemente estén cerca del vector de consulta si el centroide del cubo está cerca del vector de consulta. Basándose en esta premisa, Milvus explora únicamente las incrustaciones de vectores en aquellos cubos cuyos centroides están cerca del vector de consulta, en lugar de examinar todo el conjunto de datos. Esta estrategia reduce los costes computacionales al tiempo que mantiene una precisión aceptable.</p>
<p>Este tipo de estructura de datos de índice es ideal para conjuntos de datos a gran escala que requieren un rendimiento rápido.</p></li>
<li><p><strong>Estructura gráfica</strong></p>
<p>Una estructura de datos basada en grafos para la búsqueda vectorial, como Hierarchical Navigable Small World<a href="https://arxiv.org/abs/1603.09320">(HNSW</a>), construye un grafo en capas en el que cada vector se conecta con sus vecinos más cercanos. Las consultas recorren esta jerarquía, partiendo de capas superiores gruesas y pasando por capas inferiores, lo que permite una complejidad de búsqueda eficiente en tiempo logarítmico.</p>
<p>Este tipo de estructura de datos de índices destaca en espacios de gran dimensión y en escenarios que exigen consultas de baja latencia.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">Cuantificación</h3><p>La cuantificación reduce la huella de memoria y los costes computacionales mediante una representación más gruesa:</p>
<ul>
<li><p><strong>La cuantificación escalar</strong> (por ejemplo, <strong>SQ8</strong>) permite a Milvus comprimir cada dimensión vectorial en un único byte (8 bits), lo que reduce el uso de memoria en un 75% en comparación con los datos flotantes de 32 bits, al tiempo que se mantiene una precisión razonable.</p></li>
<li><p><strong>La cuantificación de productos</strong><strong>(PQ</strong>) permite a Milvus dividir los vectores en subvectores y codificarlos mediante la agrupación basada en libros de códigos. De este modo se consiguen mayores ratios de compresión (por ejemplo, de 4 a 32 veces) a costa de una reducción marginal de la recuperación, lo que lo hace adecuado para entornos con limitaciones de memoria.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">Refinador</h3><p>La cuantificación tiene pérdidas intrínsecas. Para mantener la tasa de recuperación, la cuantización produce sistemáticamente más candidatos top-K de los necesarios, lo que permite a los refinadores utilizar una mayor precisión para seleccionar los resultados top-K de entre estos candidatos, mejorando la tasa de recuperación.</p>
<p>Por ejemplo, el refinador FP32 opera sobre los candidatos a resultados de búsqueda devueltos por la cuantización recalculando las distancias utilizando la precisión FP32 en lugar de los valores cuantizados.</p>
<p>Esto es fundamental para las aplicaciones que requieren un equilibrio entre la eficiencia de la búsqueda y la precisión, como la búsqueda semántica o los sistemas de recomendación, en los que pequeñas variaciones en la distancia afectan significativamente a la calidad de los resultados.</p>
<h3 id="Summary" class="common-anchor-header">Resumen</h3><p>Esta arquitectura escalonada (filtrado grueso mediante estructuras de datos, cálculo eficiente mediante cuantificación y ajuste de precisión mediante refinamiento) permite a Milvus optimizar el equilibrio entre precisión y rendimiento de forma adaptativa.</p>
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
    </button></h2><p>Al evaluar el rendimiento, es fundamental equilibrar <strong>el tiempo de compilación</strong>, las <strong>consultas por segundo (QPS)</strong> y <strong>la tasa de recuperación</strong>. Las reglas generales son las siguientes:</p>
<ul>
<li><p><strong>Los tipos de índice basados en grafos</strong> suelen superar a <strong>las variantes IVF</strong> en términos de <strong>QPS</strong>.</p></li>
<li><p>Las<strong>variantes IVF</strong> encajan especialmente en los escenarios con <strong>un topK grande (por ejemplo, más de 2.000)</strong>.</p></li>
<li><p><strong>PQ</strong> suele ofrecer un mejor índice de recuperación con índices de compresión similares en comparación con <strong>SQ</strong>, aunque este último proporciona un rendimiento más rápido.</p></li>
<li><p>El uso de discos duros para parte del índice (como en <strong>DiskANN</strong>) ayuda a gestionar grandes conjuntos de datos, pero también introduce posibles cuellos de botella de IOPS.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">Capacidad</h3><p>La capacidad normalmente implica la relación entre el tamaño de los datos y la RAM disponible. Cuando hablemos de capacidad, tenga en cuenta lo siguiente:</p>
<ul>
<li><p>Si una cuarta parte de sus datos brutos cabe en la memoria, considere DiskANN por su latencia estable.</p></li>
<li><p>Si todos sus datos brutos caben en memoria, considere los tipos de índice basados en memoria y mmap.</p></li>
<li><p>Puede utilizar los tipos de índice aplicados a la cuantificación y mmap para intercambiar precisión por la máxima capacidad.</p></li>
</ul>
<div class="alert note">
<p>El mmap no es siempre la solución. Cuando la mayoría de los datos están en disco, DiskANN proporciona una mejor latencia.</p>
</div>
<h3 id="Recall" class="common-anchor-header">Recall</h3><p>El recall suele implicar el ratio de filtrado, que se refiere a los datos que se filtran antes de las búsquedas. Cuando se trata de recall, hay que tener en cuenta lo siguiente:</p>
<ul>
<li><p>Si la relación de filtrado es inferior al 85%, los tipos de índice basados en gráficos superan a las variantes IVF.</p></li>
<li><p>Si el porcentaje de filtrado está entre el 85% y el 95%, utilice variantes IVF.</p></li>
<li><p>Si el ratio de filtrado es superior al 98%, utilice la fuerza bruta (FLAT) para obtener los resultados de búsqueda más precisos.</p></li>
</ul>
<div class="alert note">
<p>Los puntos anteriores no siempre son correctos. Se recomienda ajustar la recuperación con distintos tipos de índice para determinar qué tipo de índice funciona mejor.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Rendimiento</h3><p>El rendimiento de una búsqueda suele implicar el top-K, que se refiere al número de registros que devuelve la búsqueda. En cuanto al rendimiento, hay que tener en cuenta lo siguiente:</p>
<ul>
<li><p>Para una búsqueda con un top-K pequeño (por ejemplo, 2.000) que requiera un alto índice de recuperación, los tipos de índice basados en grafos superan a las variantes IVF.</p></li>
<li><p>Para una búsqueda con un top-K grande (comparado con el número total de incrustaciones vectoriales), las variantes IVF son una mejor opción que los tipos de índice basados en grafos.</p></li>
<li><p>Para una búsqueda con un top-K de tamaño medio y un ratio de filtrado alto, las variantes FIV son mejores opciones.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Matriz de decisión: Elección del tipo de índice más adecuado</h3><p>La siguiente tabla es una matriz de decisión que le servirá de referencia a la hora de elegir un tipo de índice adecuado.</p>
<table>
   <tr>
     <th><p>Escenario</p></th>
     <th><p>Índice recomendado</p></th>
     <th><p>Notas</p></th>
   </tr>
   <tr>
     <td><p>Los datos brutos caben en la memoria</p></td>
     <td><p>HNSW, IVF + Refinamiento</p></td>
     <td><p>Utilizar HNSW para baja<code translate="no">k</code>/alta recuperación.</p></td>
   </tr>
   <tr>
     <td><p>Datos brutos en disco, SSD</p></td>
     <td><p>DiskANN</p></td>
     <td><p>Óptimo para consultas sensibles a la latencia.</p></td>
   </tr>
   <tr>
     <td><p>Datos brutos en disco, RAM limitada</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Equilibra el acceso a la memoria y al disco.</p></td>
   </tr>
   <tr>
     <td><p>Alto ratio de filtrado (&gt;95%)</p></td>
     <td><p>Fuerza bruta (FLAT)</p></td>
     <td><p>Evita la sobrecarga del índice para conjuntos de candidatos diminutos.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">k</code> grande (≥1% del conjunto de datos)</p></td>
     <td><p>FIV</p></td>
     <td><p>La poda de grupos reduce los cálculos.</p></td>
   </tr>
   <tr>
     <td><p>Tasa de recuperación extremadamente alta (&gt;99%)</p></td>
     <td><p>Fuerza bruta (FLAT) + GPU</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">Estimación del consumo de memoria<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
<p>Esta sección se centra en el cálculo del consumo de memoria de un tipo de índice específico e incluye muchos detalles técnicos. Puede saltarse esta sección sin problemas si no se ajusta a sus intereses.</p>
</div>
<p>El consumo de memoria de un índice está influido por su estructura de datos, la tasa de compresión a través de la cuantización y el refinador en uso. En general, los índices basados en grafos suelen tener un mayor consumo de memoria debido a la estructura del grafo (por ejemplo, <strong>HNSW</strong>), lo que suele implicar una notable sobrecarga de espacio por vector. Por el contrario, el IVF y sus variantes son más eficientes en términos de memoria, ya que la sobrecarga de espacio por vector es menor. Sin embargo, técnicas avanzadas como <strong>DiskANN</strong> permiten que partes del índice, como el gráfico o el refinador, residan en disco, lo que reduce la carga de memoria al tiempo que mantiene el rendimiento.</p>
<p>En concreto, el uso de memoria de un índice puede calcularse de la siguiente manera:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">Uso de memoria del índice IVF</h3><p>Los índices IVF equilibran la eficiencia de la memoria con el rendimiento de la búsqueda particionando los datos en clusters. A continuación se muestra un desglose de la memoria utilizada por 1 millón de vectores de 128 dimensiones indexados mediante variantes IVF.</p>
<ol>
<li><p><strong>Calcular la memoria utilizada por los centroides.</strong></p>
<p>Los tipos de índice de la serie IVF permiten a Milvus agrupar vectores en cubos utilizando particiones basadas en centroides. Cada centroide se incluye en el índice en la incrustación de vectores sin procesar. Cuando se dividen los vectores en 2.000 clusters, el uso de memoria se puede calcular de la siguiente manera:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcular la memoria utilizada por las asignaciones de cluster.</strong></p>
<p>Cada incrustación vectorial se asigna a un cluster y se almacena como IDs enteros. Para 2.000 clusters, basta con un número entero de 2 bytes. El uso de memoria puede calcularse del siguiente modo:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcular la compresión causada por la cuantización.</strong></p>
<p>Las variantes de IVF suelen utilizar PQ y SQ8, y el uso de memoria puede calcularse de la siguiente manera:</p>
<ul>
<li><p>Utilizando PQ con 8 subcuantizadores</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Utilización de SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>La siguiente tabla muestra el uso de memoria estimado con diferentes configuraciones:</p>
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
<td><p>IVF-PQ + 10% refinamiento bruto</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB + 51,2 MB</p></td>
<td><p>62,2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (sin refinamiento)</p></td>
<td><p>1,0 MB + 2,0 MB + 128 MB</p></td>
<td><p>131,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (vectores completos sin refinar)</p></td>
<td><p>1,0 MB + 2,0 MB + 512 MB</p></td>
<td><p>515,0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>Calcular la sobrecarga de refinamiento.</strong></p>
<p>Las variantes de FIV suelen combinarse con un refinador para volver a clasificar a los candidatos. Para una búsqueda que recupere los 10 primeros resultados con un índice de expansión de 5, la sobrecarga de refinamiento puede calcularse del siguiente modo:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Uso de memoria de índices basados en gráficos</h3><p>Los índices basados en grafos, como el HNSW, requieren una cantidad significativa de memoria para almacenar tanto la estructura del grafo como las incrustaciones de vectores sin procesar. A continuación se muestra un desglose detallado de la memoria consumida por 1 millón de vectores de 128 dimensiones indexados utilizando el tipo de índice HNSW.</p>
<ol>
<li><p><strong>Calcular la memoria utilizada por la estructura gráfica.</strong></p>
<p>Cada vector en HNSW mantiene conexiones con sus vecinos. Con un grado de grafo (aristas por nodo) de 32, la memoria consumida puede calcularse del siguiente modo:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Calcular la memoria utilizada por los vectores sin comprimir.</strong></p>
<p>La memoria consumida por el almacenamiento de vectores FP32 sin comprimir se puede calcular de la siguiente manera:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>Cuando se utiliza HNSW para indexar el millón de incrustaciones vectoriales de 128 dimensiones, la memoria total en uso sería de <strong>128 MB (gráfico) + 512 MB (vectores) = 640 MB</strong>.</p></li>
<li><p><strong>Calcule la compresión causada por la cuantización.</strong></p>
<p>La cuantización reduce el tamaño de los vectores. Por ejemplo, el uso de PQ con 8 subcuantizadores (8 bytes por vector) produce una compresión drástica. La memoria consumida por las incrustaciones vectoriales comprimidas puede calcularse del siguiente modo:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>De este modo se consigue una tasa de compresión 64 veces superior a la de las incrustaciones vectoriales en bruto, y la memoria total utilizada por el tipo de índice <strong>HNSWPQ</strong> sería de <strong>128 MB (gráfico) + 8 MB (vector comprimido) = 136 MB</strong>.</p></li>
<li><p><strong>Calcular la sobrecarga de refinamiento.</strong></p>
<p>El refinamiento, como la reclasificación con vectores sin procesar, carga temporalmente datos de alta precisión en la memoria. Para una búsqueda que recupere los 10 primeros resultados con una tasa de expansión de 5, la sobrecarga de refinamiento puede calcularse del siguiente modo:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">Otras consideraciones</h3><p>Mientras que los índices IVF y basados en gráficos optimizan el uso de la memoria mediante la cuantificación, los archivos mapeados en memoria (mmap) y DiskANN abordan situaciones en las que los conjuntos de datos superan la memoria de acceso aleatorio (RAM) disponible.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN es un índice basado en el grafo Vamana que conecta puntos de datos para una navegación eficiente durante la búsqueda, al tiempo que aplica PQ para reducir el tamaño de los vectores y permitir un rápido cálculo aproximado de la distancia entre vectores.</p>
<p>El grafo Vamana se almacena en disco, lo que permite a DiskANN manejar grandes conjuntos de datos que, de otro modo, serían demasiado grandes para caber en memoria. Esto es especialmente útil para conjuntos de datos de miles de millones de puntos.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">Archivos mapeados en memoria (mmap)</h4><p>El mapeo de memoria (Mmap) permite el acceso directo en memoria a archivos de gran tamaño en disco, lo que permite a Milvus almacenar índices y datos tanto en memoria como en discos duros. Este enfoque ayuda a optimizar las operaciones de E/S reduciendo la sobrecarga de las llamadas de E/S en función de la frecuencia de acceso, ampliando así la capacidad de almacenamiento de las colecciones sin afectar significativamente al rendimiento de la búsqueda.</p>
<p>En concreto, puede configurar Milvus para que mapee en memoria los datos sin procesar de determinados campos en lugar de cargarlos completamente en memoria. De este modo, puede obtener acceso directo a la memoria de los campos sin preocuparse por los problemas de memoria y ampliar la capacidad de la colección.</p>
