---
id: reranking.md
summary: >-
  Este tema aborda el proceso de reordenación, explicando su importancia y la
  aplicación de dos métodos de reordenación.
title: Reordenación
---
<h1 id="Reranking" class="common-anchor-header">Reordenación<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus permite capacidades de búsqueda híbrida utilizando la API <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md">hybrid_search()</a>, incorporando sofisticadas estrategias de reordenación para refinar los resultados de búsqueda de múltiples instancias de <code translate="no">AnnSearchRequest</code>. Este tema cubre el proceso de reordenación, explicando su significado y la implementación de diferentes estrategias de reordenación en Milvus.</p>
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
    </button></h2><p>La siguiente figura ilustra la ejecución de una búsqueda híbrida en Milvus y destaca el papel de la reordenación en el proceso.</p>
<p><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/multi-vector-rerank.png" alt="reranking_process" width="300"/></p>
<p>La reordenación en la búsqueda híbrida es un paso crucial que consolida los resultados de varios campos vectoriales, garantizando que el resultado final sea relevante y esté correctamente priorizado. Actualmente, Milvus ofrece estas estrategias de reordenación:</p>
<ul>
<li><p><code translate="no">WeightedRanker</code>: Este enfoque fusiona resultados calculando una media ponderada de puntuaciones (o distancias vectoriales) de diferentes búsquedas vectoriales. Asigna pesos en función de la importancia de cada campo vectorial.</p></li>
<li><p><code translate="no">RRFRanker</code>: Esta estrategia combina los resultados en función de sus clasificaciones en diferentes columnas de vectores.</p></li>
</ul>
<h2 id="Weighted-Scoring-WeightedRanker" class="common-anchor-header">Puntuación ponderada (WeightedRanker)<button data-href="#Weighted-Scoring-WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>La estrategia <code translate="no">WeightedRanker</code> asigna diferentes pesos a los resultados de cada ruta de recuperación de vectores en función de la importancia de cada campo vectorial. Esta estrategia de reordenación se aplica cuando la importancia de cada campo vectorial varía, lo que permite destacar ciertos campos vectoriales sobre otros asignándoles pesos más altos. Por ejemplo, en una búsqueda multimodal, la descripción del texto podría considerarse más importante que la distribución del color en las imágenes.</p>
<p>El proceso básico de WeightedRanker es el siguiente:</p>
<ul>
<li><p><strong>Recopilar puntuaciones durante la recuperación</strong>: Recoge los resultados y sus puntuaciones de diferentes rutas de recuperación de vectores.</p></li>
<li><p><strong>Normalización de puntuaciones</strong>: Normalizar las puntuaciones de cada ruta a un rango [0,1], donde los valores más cercanos a 1 indican mayor relevancia. Esta normalización es crucial debido a que las distribuciones de las puntuaciones varían según los distintos tipos de métricas. Por ejemplo, la distancia para IP oscila entre [-∞,+∞], mientras que la distancia para L2 oscila entre [0,+∞]. Milvus emplea la función <code translate="no">arctan</code>, transformando los valores al rango [0,1] para proporcionar una base estandarizada para los diferentes tipos de métrica.</p>
<p><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/arctan.png" alt="arctan-function" width="300"/></p></li>
<li><p><strong>Asignación de pesos</strong>: Asigna un peso <code translate="no">w𝑖</code> a cada ruta de recuperación de vectores. Los usuarios especifican las ponderaciones, que reflejan la fiabilidad, precisión u otras métricas pertinentes de la fuente de datos. Cada peso oscila entre [0,1].</p></li>
<li><p><strong>Fusión de puntuaciones</strong>: Calcula una media ponderada de las puntuaciones normalizadas para obtener la puntuación final. A continuación, se ordenan los resultados en función de estas puntuaciones de mayor a menor para generar los resultados finales ordenados.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x//assets/weighted-reranker.png" alt="weighted-reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>weighted-reranker</span> </span></p>
<p>Para utilizar esta estrategia, aplique una instancia de <code translate="no">WeightedRanker</code> y establezca los valores de ponderación pasando un número variable de argumentos numéricos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.7</span>) 
<button class="copy-code-btn"></button></code></pre>
<p>Tenga en cuenta que:</p>
<ul>
<li><p>Cada valor de peso va de 0 (menos importante) a 1 (más importante), influyendo en la puntuación final agregada.</p></li>
<li><p>El número total de valores de peso proporcionados en <code translate="no">WeightedRanker</code> debe ser igual al número de instancias de <code translate="no">AnnSearchRequest</code> que haya creado anteriormente.</p></li>
<li><p>Cabe señalar que, debido a las diferentes medidas de los distintos tipos de métricas, normalizamos las distancias de los resultados de recall para que se sitúen en el intervalo [0,1], donde 0 significa diferente y 1 similar. La puntuación final será la suma de los valores de ponderación y las distancias.</p></li>
</ul>
<h2 id="Reciprocal-Rank-Fusion-RRFRanker" class="common-anchor-header">Fusión por rango recíproco (RRFRanker)<button data-href="#Reciprocal-Rank-Fusion-RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>RRF es un método de fusión de datos que combina listas de clasificación basadas en la recíproca de sus rangos. Es una forma eficaz de equilibrar la influencia de cada campo vectorial, especialmente cuando no existe una clara precedencia de importancia. Esta estrategia se suele utilizar cuando se quiere dar la misma consideración a todos los campos vectoriales o cuando hay incertidumbre sobre la importancia relativa de cada campo.</p>
<p>El proceso básico de la RRF es el siguiente:</p>
<ul>
<li><p><strong>Recopilación de clasificaciones durante la recuperación</strong>: Los recuperadores de múltiples campos vectoriales recuperan y ordenan los resultados.</p></li>
<li><p><strong>Fusión de rankings</strong>: El algoritmo RRF pondera y combina las clasificaciones de cada recuperador. La fórmula es la siguiente</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x//assets/rrf-ranker.png" alt="rrf-ranker" class="doc-image" id="rrf-ranker" />
   </span> <span class="img-wrapper"> <span>rrf-ranker</span> </span></p>
<p>Aquí, 𝑁 representa el número de rutas de recuperación diferentes, rank𝑖(𝑑) es la posición en el ranking del documento recuperado 𝑑 por el 𝑖º recuperador, y 𝑘 es un parámetro de suavizado, normalmente fijado en 60.</p></li>
<li><p><strong>Clasificación exhaustiva</strong>: Reordena los resultados recuperados basándose en las puntuaciones combinadas para producir los resultados finales.</p></li>
</ul>
<p>Para utilizar esta estrategia, aplique una instancia de <code translate="no">RRFRanker</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

<span class="hljs-comment"># Default k value is 60</span>
ranker = RRFRanker()

<span class="hljs-comment"># Or specify k value</span>
ranker = RRFRanker(k=<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<p>RRF permite equilibrar la influencia entre campos sin especificar pesos explícitos. Las mejores coincidencias acordadas por varios campos tendrán prioridad en la clasificación final.</p>
