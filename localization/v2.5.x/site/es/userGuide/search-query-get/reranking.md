---
id: reranking.md
title: Nueva clasificación
summary: >-
  La búsqueda híbrida consigue resultados más precisos mediante múltiples
  búsquedas simultáneas de RNA. Las búsquedas múltiples devuelven varios
  conjuntos de resultados, que requieren una estrategia de reordenación para
  ayudar a combinar y reordenar los resultados y devolver un único conjunto de
  resultados. Esta guía presentará las estrategias de reordenación que admite
  Milvus y proporcionará consejos para seleccionar la estrategia de reordenación
  adecuada.
---

<h1 id="Reranking" class="common-anchor-header">Nueva clasificación<button data-href="#Reranking" class="anchor-icon" translate="no">
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
    </button></h1><p>La búsqueda híbrida consigue resultados más precisos mediante múltiples búsquedas simultáneas de RNA. Las búsquedas múltiples devuelven varios conjuntos de resultados, que requieren una estrategia de reordenación para ayudar a combinar y reordenar los resultados y devolver un único conjunto de resultados. En esta guía se presentan las estrategias de reordenación compatibles con Milvus y se ofrecen consejos para seleccionar la estrategia de reordenación adecuada.</p>
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
    </button></h2><p>El siguiente diagrama muestra el flujo de trabajo principal de una búsqueda híbrida en una aplicación de búsqueda multimodal. En el diagrama, una ruta es la búsqueda RNA básica en textos y la otra es la búsqueda RNA básica en imágenes. Cada ruta genera un conjunto de resultados basados en la puntuación de similitud del texto y la imagen respectivamente<strong>(Límite 1</strong> y <strong>Límite 2</strong>). A continuación, se aplica una estrategia de reordenación para reordenar los dos conjuntos de resultados en función de una norma unificada y, por último, fusionar los dos conjuntos de resultados en un conjunto final de resultados de búsqueda, <strong>Limit(final)</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/multi-vector-rerank.png" alt="Multi Vector Rerank" class="doc-image" id="multi-vector-rerank" />
   </span> <span class="img-wrapper"> <span>Reranking multivectorial</span> </span></p>
<p>En la búsqueda híbrida, el reordenamiento es un paso crucial que integra los resultados de múltiples búsquedas vectoriales para garantizar que el resultado final sea el más relevante y preciso. Actualmente, Milvus admite las dos estrategias de reordenación siguientes:</p>
<ul>
<li><p><strong><a href="/docs/es/v2.5.x/reranking.md#WeightedRanker">WeightedRanker</a></strong>: Esta estrategia fusiona los resultados calculando una puntuación ponderada de puntuaciones (o distancias) de diferentes búsquedas vectoriales. Las ponderaciones se asignan en función de la importancia de cada campo vectorial, lo que permite personalizarlas según las prioridades específicas de cada caso de uso.</p></li>
<li><p><strong><a href="/docs/es/v2.5.x/reranking.md#RRFRanker">RRFRanker</a> (Reciprocal Rank Fusion Ranker)</strong>: Esta estrategia combina los resultados basándose en la clasificación. Utiliza un método que equilibra los rangos de los resultados de diferentes búsquedas, lo que a menudo conduce a una integración más justa y eficaz de diversos tipos o modalidades de datos.</p></li>
</ul>
<h2 id="WeightedRanker" class="common-anchor-header">WeightedRanker<button data-href="#WeightedRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>La estrategia WeightedRanker asigna diferentes pesos a los resultados de cada ruta de búsqueda vectorial en función de su importancia.</p>
<h3 id="Mechanism-of-WeightedRanker" class="common-anchor-header">Mecanismo de WeightedRanker</h3><p>El flujo de trabajo principal de la estrategia WeightedRanker es el siguiente:</p>
<ol>
<li><p><strong>Recopilar puntuaciones de búsqueda</strong>: Recopila los resultados y puntuaciones de cada ruta de búsqueda vectorial (puntuación_1, puntuación_2).</p></li>
<li><p><strong>Normalización de puntuaciones</strong>: Cada búsqueda puede utilizar diferentes métricas de similitud, lo que resulta en distribuciones de puntuación variadas. Por ejemplo, si se utiliza el producto interior (PI) como tipo de similitud, las puntuaciones pueden oscilar entre [-∞,+∞], mientras que si se utiliza la distancia euclídea (L2), las puntuaciones oscilan entre [0,+∞]. Dado que los rangos de puntuación de las distintas búsquedas varían y no pueden compararse directamente, es necesario normalizar las puntuaciones de cada ruta de búsqueda. Normalmente, se aplica la función <code translate="no">arctan</code> para transformar las puntuaciones en un rango entre [0, 1] (puntuación_1_normalizada, puntuación_2_normalizada). Las puntuaciones más cercanas a 1 indican una mayor similitud.</p></li>
<li><p><strong>Asignar pesos</strong>: En función de la importancia asignada a los distintos campos vectoriales, se asignan pesos<strong>(wi</strong>) a las puntuaciones normalizadas (puntuación_1_normalizada, puntuación_2_normalizada). Los pesos de cada ruta deben oscilar entre [0,1]. Las puntuaciones ponderadas resultantes son puntuación_1_ponderada y puntuación_2_ponderada.</p></li>
<li><p><strong>Fusionar puntuaciones</strong>: Las puntuaciones ponderadas (puntuación_1_ponderada, puntuación_2_ponderada) se ordenan de mayor a menor para producir un conjunto final de puntuaciones (puntuación_final).</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/weighted-reranker.png" alt="Weighted Reranker" class="doc-image" id="weighted-reranker" />
   </span> <span class="img-wrapper"> <span>Reranker ponderado</span> </span></p>
<h3 id="Example-of-WeightedRanker" class="common-anchor-header">Ejemplo de WeightedRanker</h3><p>Este ejemplo muestra una búsqueda híbrida multimodal (topK=5) que incluye imágenes y texto e ilustra cómo la estrategia WeightedRanker reordena los resultados de dos búsquedas RNA.</p>
<ul>
<li>Resultados de la búsqueda RNA en imágenes （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Puntuación (imagen)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.8</p></td>
   </tr>
</table>
<ul>
<li>Resultados de la búsqueda RNA en los textos （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Puntuación (texto)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.91</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.87</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.82</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>0.78</p></td>
   </tr>
</table>
<ul>
<li>Utilice WeightedRanker para asignar ponderaciones a los resultados de la búsqueda de imágenes y de texto. Supongamos que la ponderación para la búsqueda RNA de imagen es 0,6 y la ponderación para la búsqueda de texto es 0,4.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Puntuación (imagen)</strong></p></th>
     <th><p><strong>Puntuación (texto)</strong></p></th>
     <th><p><strong>Puntuación ponderada</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
     <td><p>0.87</p></td>
     <td><p>0.6×0.92+0.4×0.87=0.90</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
     <td><p>0,88</p></td>
     <td><p>0.6×0.88+0.4×0=0.528</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.85+0.4×0=0.51</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
     <td><p>0.91</p></td>
     <td><p>0.6×0.83+0.4×0.91=0.86</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.80</p></td>
     <td><p>0.82</p></td>
     <td><p>0.6×0.80+0.4×0.82=0.81</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>No en la imagen</p></td>
     <td><p>0.85</p></td>
     <td><p>0.6×0+0.4×0.85=0.34</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>No en la imagen</p></td>
     <td><p>0.78</p></td>
     <td><p>0.6×0+0.4×0.78=0.312</p></td>
   </tr>
</table>
<ul>
<li>Los resultados finales después de reranking（topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>Clasificación</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Puntuación final</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.90</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>198</p></td>
     <td><p>0.86</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>175</p></td>
     <td><p>0.81</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>203</p></td>
     <td><p>0.528</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>150</p></td>
     <td><p>0.51</p></td>
   </tr>
</table>
<h3 id="Usage-of-WeightedRanker" class="common-anchor-header">Uso de WeightedRanker</h3><p>Cuando se utiliza la estrategia WeightedRanker, es necesario introducir valores de ponderación. El número de valores de ponderación a introducir debe corresponder al número de peticiones de búsqueda de RNA básicas en la búsqueda híbrida. Los valores de ponderación deben estar comprendidos en el intervalo [0,1], y los valores más próximos a 1 indican mayor importancia.</p>
<p>Por ejemplo, supongamos que en una búsqueda híbrida hay dos peticiones básicas de búsqueda RNA: búsqueda de texto y búsqueda de imágenes. Si la búsqueda de texto se considera más importante, se le asignará un peso mayor.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker

rerank= WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;

<span class="hljs-type">WeightedRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

reranker := milvusclient.NewWeightedReranker([]<span class="hljs-type">float64</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;ws&quot;,
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RRFRanker" class="common-anchor-header">RRFRanker<button data-href="#RRFRanker" class="anchor-icon" translate="no">
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
    </button></h2><p>Reciprocal Rank Fusion (RRF) es un método de fusión de datos que combina listas clasificadas basándose en la recíproca de sus clasificaciones. Esta estrategia de reordenación equilibra eficazmente la importancia de cada ruta de búsqueda vectorial.</p>
<h3 id="Mechanism-of-RRFRanker" class="common-anchor-header">Mecanismo de RRFRanker</h3><p>El flujo de trabajo principal de la estrategia RRFRanker es el siguiente:</p>
<ol>
<li><p><strong>Recopilación de clasificaciones de búsqueda</strong>: Recopila las clasificaciones de los resultados de cada ruta de búsqueda vectorial (rank_1, rank_2).</p></li>
<li><p><strong>Combinar clasificaciones</strong>: Convertir los rankings de cada camino (rank_rrf_1, rank_rrf_2) según una fórmula .</p>
<p>En la fórmula de cálculo interviene <em>N</em>, que representa el número de recuperaciones. <em>ranki</em><em>(d</em>) es la posición en la clasificación del documento <em>d</em> generada por el recuperador <em>i(th)</em>. <em>k</em> es un parámetro de suavizado que suele fijarse en 60.</p></li>
<li><p><strong>Clasificación agregada</strong>: Vuelve a clasificar los resultados de la búsqueda basándose en las clasificaciones combinadas para producir los resultados finales.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/RRF-reranker.png" alt="RRF Reranker" class="doc-image" id="rrf-reranker" />
   </span> <span class="img-wrapper"> <span>RRF Reranker</span> </span></p>
<h3 id="Example-of-RRFRanker" class="common-anchor-header">Ejemplo de RRFRanker</h3><p>Este ejemplo muestra una búsqueda híbrida (topK=5) en vectores dispersos y densos e ilustra cómo la estrategia RRFRanker vuelve a clasificar los resultados de dos búsquedas RNA.</p>
<ul>
<li>Resultados de la búsqueda RNA en vectores dispersos de textos （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Rango (disperso)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>Resultados de la búsqueda RNA en vectores densos de textos （topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Rango (denso)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>5</p></td>
   </tr>
</table>
<ul>
<li>Utilice RRF para reordenar las clasificaciones de los dos conjuntos de resultados de búsqueda. Suponga que el parámetro de suavizado <code translate="no">k</code> está fijado en 60.</li>
</ul>
<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Puntuación (dispersa)</strong></p></th>
     <th><p><strong>Puntuación (densa)</strong></p></th>
     <th><p><strong>Puntuación final</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
     <td><p>2</p></td>
     <td><p>1/(60+1)+1/(60+2) = 0.01639</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
     <td><p>1</p></td>
     <td><p>1/(60+4)+1/(60+1) = 0.01593</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
     <td><p>4</p></td>
     <td><p>1/(60+5)+1/(60+4) = 0.01554</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+2) = 0.01613</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>N/A</p></td>
     <td><p>3</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>N/A</p></td>
     <td><p>5</p></td>
     <td><p>1/(60+5) = 0.01554</p></td>
   </tr>
</table>
<ul>
<li>Los resultados finales tras la reordenación（topK=5)：</li>
</ul>
<table>
   <tr>
     <th><p><strong>Clasificación</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Puntuación final</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.01639</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>203</p></td>
     <td><p>0.01613</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>198</p></td>
     <td><p>0.01593</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>150</p></td>
     <td><p>0.01587</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>110</p></td>
     <td><p>0.01587</p></td>
   </tr>
</table>
<h3 id="Usage-of-RRFRanker" class="common-anchor-header">Uso de RRFRanker</h3><p>Cuando se utiliza la estrategia RRF reranking, es necesario configurar el parámetro <code translate="no">k</code>. Se trata de un parámetro de suavizado que puede alterar eficazmente los pesos relativos de la búsqueda de texto completo frente a la búsqueda vectorial. El valor por defecto de este parámetro es 60, y puede ajustarse dentro de un rango de (0, 16384). El valor debe ser un número de coma flotante. El valor recomendado está entre [10, 100]. Aunque <code translate="no">k=60</code> es una opción habitual, el valor óptimo de <code translate="no">k</code> puede variar en función de sus aplicaciones y conjuntos de datos específicos. Recomendamos probar y ajustar este parámetro en función de su caso de uso específico para lograr el mejor rendimiento.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

ranker = RRFRanker(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;

<span class="hljs-type">RRFRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">reranker := milvusclient.NewRRFReranker().WithK(<span class="hljs-number">100</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;rerank&quot;</span>: {
    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;rrf&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;k&quot;</span>: 100
    }
}
<span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{
        &quot;strategy&quot;: &quot;rrf&quot;,
        &quot;params&quot;: {&quot;k&quot;: 100}
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Select-the-right-reranking-strategy" class="common-anchor-header">Seleccionar la estrategia de reordenación adecuada<button data-href="#Select-the-right-reranking-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>A la hora de elegir una estrategia de reranking, hay que tener en cuenta si se hace hincapié en una o varias búsquedas básicas de RNA en los campos vectoriales.</p>
<ul>
<li><p><strong>WeightedRanker</strong>: Esta estrategia se recomienda si necesita que los resultados hagan hincapié en un campo vectorial concreto. El WeightedRanker permite asignar pesos más altos a determinados campos vectoriales, enfatizándolos más. Por ejemplo, en las búsquedas multimodales, las descripciones textuales de una imagen podrían considerarse más importantes que los colores de esta imagen.</p></li>
<li><p><strong>RRFRanker (Reciprocal Rank Fusion Ranker)</strong>: Esta estrategia se recomienda cuando no hay un énfasis específico. El RRF puede equilibrar eficazmente la importancia de cada campo vectorial.</p></li>
</ul>
