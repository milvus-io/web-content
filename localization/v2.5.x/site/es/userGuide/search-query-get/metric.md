---
id: metric.md
title: Tipos de métricas
summary: >-
  Las métricas de similitud se utilizan para medir las semejanzas entre
  vectores. La elección de una métrica de distancia adecuada ayuda a mejorar
  significativamente el rendimiento de la clasificación y la agrupación.
---
<h1 id="Metric-Types" class="common-anchor-header">Tipos de métricas<button data-href="#Metric-Types" class="anchor-icon" translate="no">
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
    </button></h1><p>Las métricas de similitud se utilizan para medir las similitudes entre vectores. La elección de una métrica de distancia adecuada ayuda a mejorar significativamente la clasificación y el rendimiento de la agrupación.</p>
<p>Actualmente, Milvus soporta estos tipos de métricas de similitud: Distancia euclidiana (<code translate="no">L2</code>), Producto interior (<code translate="no">IP</code>), Similitud coseno (<code translate="no">COSINE</code>), <code translate="no">JACCARD</code>, <code translate="no">HAMMING</code>, y <code translate="no">BM25</code> (diseñada específicamente para la búsqueda de texto completo en vectores dispersos).</p>
<p>La siguiente tabla resume la correspondencia entre los distintos tipos de campo y sus correspondientes tipos de métrica.</p>
<table>
   <tr>
     <th><p>Tipo de campo</p></th>
     <th><p>Rango de dimensión</p></th>
     <th><p>Tipos métricos admitidos</p></th>
     <th><p>Tipo métrico por defecto</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code> <code translate="no">L2</code>, <code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">SPARSE\_FLOAT\_VECTOR</code></p></td>
     <td><p>No es necesario especificar la dimensión.</p></td>
     <td><p><code translate="no">IP</code>, <code translate="no">BM25</code> (sólo se utiliza para la búsqueda de texto completo)</p></td>
     <td><p><code translate="no">IP</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BINARY_VECTOR</code></p></td>
     <td><p>8-32,768*8</p></td>
     <td><p><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></p></td>
     <td><p><code translate="no">HAMMING</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>Para los campos vectoriales del tipo <code translate="no">SPARSE\_FLOAT\_VECTOR</code>, utilice el tipo métrico <code translate="no">BM25</code> sólo cuando realice la búsqueda de texto completo. Para más información, consulte <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p></li>
<li><p>Para los campos vectoriales del tipo <code translate="no">BINARY_VECTOR</code>, el valor de dimensión (<code translate="no">dim</code>) debe ser múltiplo de 8.</p></li>
</ul>
</div>
<p>La siguiente tabla resume las características de los valores de distancia de similitud de todos los tipos métricos admitidos y su rango de valores.</p>
<table>
   <tr>
     <th><p>Tipo de métrica</p></th>
     <th><p>Características de los valores de distancia de similitud</p></th>
     <th><p>Rango de valores de la distancia de similitud</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>Un valor menor indica una mayor similitud.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>Un valor mayor indica una mayor similitud.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>Un valor mayor indica una mayor similitud.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>Un valor menor indica una mayor similitud.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Un valor menor indica una mayor similitud.</p></td>
     <td><p>[0, dim(vector)]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BM25</code></p></td>
     <td><p>Puntúa la relevancia basándose en la frecuencia de términos, la frecuencia de documentos invertida y la normalización de documentos.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>
<h2 id="Euclidean-distance-L2" class="common-anchor-header">Distancia euclídea (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h2><p>Esencialmente, la distancia euclídea mide la longitud de un segmento que une 2 puntos.</p>
<p>La fórmula de la distancia euclídea es la siguiente:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean-metric.png" alt="Euclidean Metric" class="doc-image" id="euclidean-metric" />
   </span> <span class="img-wrapper"> <span>Métrica euclídea</span> </span></p>
<p>donde <strong>a = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> y <strong>b = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong> son dos puntos en un espacio euclídeo n-dimensional.</p>
<p>Es la métrica de distancia más utilizada y resulta muy útil cuando los datos son continuos.</p>
<div class="alert note">
<p>Milvus sólo calcula el valor antes de aplicar la raíz cuadrada cuando se elige la distancia euclídea como métrica de distancia.</p>
</div>
<h2 id="Inner-product-IP" class="common-anchor-header">Producto interior (PI)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h2><p>La distancia IP entre dos incrustaciones se define como sigue:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP-formula.png" alt="IP Formula" class="doc-image" id="ip-formula" />
   </span> <span class="img-wrapper"> <span>Fórmula IP</span> </span></p>
<p>IP es más útil si necesita comparar datos no normalizados o cuando se preocupa por la magnitud y el ángulo.</p>
<div class="alert note">
<p>Si utiliza IP para calcular similitudes entre incrustaciones, debe normalizar sus incrustaciones. Después de la normalización, el producto interno es igual a la similitud coseno.</p>
</div>
<p>Supongamos que X' se normaliza a partir de la incrustación X:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize-formula.png" alt="Normalize Formula" class="doc-image" id="normalize-formula" />
   </span> <span class="img-wrapper"> <span>Fórmula de normalización</span> </span></p>
<p>La correlación entre las dos incrustaciones es la siguiente:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/correlation-between-embeddings.png" alt="Correlation Between Embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>Correlación entre incrustaciones</span> </span></p>
<h2 id="Cosine-similarity" class="common-anchor-header">Similitud coseno<button data-href="#Cosine-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>La similitud coseno utiliza el coseno del ángulo entre dos conjuntos de vectores para medir su similitud. Puede pensar en los dos conjuntos de vectores como segmentos de línea que parten del mismo punto, como [0,0,...], pero que apuntan en direcciones diferentes.</p>
<p>Para calcular la similitud coseno entre dos conjuntos de vectores <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> y <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, utiliza la siguiente fórmula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine-similarity.png" alt="Cosine Similarity" class="doc-image" id="cosine-similarity" />
   </span> <span class="img-wrapper"> <span>Similitud coseno</span> </span></p>
<p>La semejanza coseno está siempre en el intervalo <strong>[-1, 1]</strong>. Por ejemplo, dos vectores proporcionales tienen una similitud coseno de <strong>1</strong>, dos vectores ortogonales tienen una similitud de <strong>0</strong>, y dos vectores opuestos tienen una similitud de <strong>-1</strong>. Cuanto mayor sea el coseno, menor será el ángulo entre los dos vectores, lo que indica que estos dos vectores son más similares entre sí.</p>
<p>Restando su similitud coseno de 1, se obtiene la distancia coseno entre dos vectores.</p>
<h2 id="JACCARD-distance" class="common-anchor-header">Distancia JACCARD<button data-href="#JACCARD-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>El coeficiente de similitud JACCARD mide la similitud entre dos conjuntos de muestras y se define como la cardinalidad de la intersección de los conjuntos definidos dividida por la cardinalidad de la unión de los mismos. Sólo puede aplicarse a conjuntos de muestras finitos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-similarity-coefficient-formula.png" alt="JACCARD Similarity Coefficient Formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>Fórmula del coeficiente de similitud JACCARD</span> </span></p>
<p>La distancia JACCARD mide la disimilitud entre conjuntos de datos y se obtiene restando a 1 el coeficiente de similitud JACCARD. Para variables binarias, la distancia JACCARD equivale al coeficiente de Tanimoto.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-distance-formula.png" alt="JACCARD Distance Formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>Fórmula de la distancia JACCARD</span> </span></p>
<h2 id="HAMMING-distance" class="common-anchor-header">Distancia HAMMING<button data-href="#HAMMING-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>La distancia HAMMING mide cadenas de datos binarias. La distancia entre dos cadenas de igual longitud es el número de posiciones de bits en las que los bits son diferentes.</p>
<p>Por ejemplo, supongamos que hay dos cadenas, 1101 1001 y 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Dado que contiene dos 1s, la distancia HAMMING, d (11011001, 10011101) = 2.</p>
<h2 id="BM25-similarity" class="common-anchor-header">Similitud BM25<button data-href="#BM25-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>El BM25 es un método de medición de la relevancia de los textos muy utilizado, diseñado específicamente para la <a href="/docs/es/full-text-search.md">búsqueda de textos completos</a>. Combina los tres factores clave siguientes</p>
<ul>
<li><p><strong>Frecuencia de términos (TF):</strong> Mide la frecuencia con la que aparece un término en un documento. Aunque las frecuencias más altas suelen indicar una mayor importancia, BM25 utiliza el parámetro de saturación k_1 para evitar que los términos demasiado frecuentes dominen la puntuación de relevancia.</p></li>
<li><p><strong>Frecuencia inversa del documento (FID):</strong> Refleja la importancia de un término en todo el corpus. Los términos que aparecen en menos documentos reciben un valor IDF más alto, lo que indica una mayor contribución a la relevancia.</p></li>
<li><p><strong>Normalización de la longitud del documento:</strong> Los documentos más largos tienden a puntuar más alto debido a que contienen más términos. BM25 mitiga este sesgo normalizando la longitud de los documentos, y el parámetro b controla la intensidad de esta normalización.</p></li>
</ul>
<p>La puntuación BM25 se calcula de la siguiente manera:</p>
<p>score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}</p>
<p>Descripción de parámetros:</p>
<ul>
<li><p>Q: El texto de consulta proporcionado por el usuario.</p></li>
<li><p>D: El documento evaluado.</p></li>
<li><p>TF(q_i, D): Frecuencia del término, que representa la frecuencia con la que el término q_i aparece en el documento D.</p></li>
<li><p>IDF(q_i): Frecuencia inversa del documento, calculada como</p>
<p>IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5} + 1)</p>
<p>donde N es el número total de documentos del corpus y n(q_i) es el número de documentos que contienen el término q_i.</p></li>
<li><p>|D|: Longitud del documento D (número total de términos).</p></li>
<li><p>avgdl: Longitud media de todos los documentos del corpus.</p></li>
<li><p>k_1: Controla la influencia de la frecuencia de términos en la puntuación. Los valores más altos aumentan la importancia de la frecuencia de los términos. El rango típico es [1,2, 2,0], mientras que Milvus permite un rango de [0, 3].</p></li>
<li><p>b: Controla el grado de normalización de la longitud, que va de 0 a 1. Cuando el valor es 0, no hay normalización. Cuando el valor es 0, no se aplica ninguna normalización; cuando el valor es 1, se aplica la normalización completa.</p></li>
</ul>
