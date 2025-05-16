---
id: metric.md
summary: >-
  Milvus admite diversas métricas de similitud, como la distancia euclidiana, el
  producto interior, Jaccard, etc.
title: Métricas de similitud
---
<h1 id="Similarity-Metrics" class="common-anchor-header">Métricas de similitud<button data-href="#Similarity-Metrics" class="anchor-icon" translate="no">
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
    </button></h1><p>En Milvus, las métricas de similitud se utilizan para medir las similitudes entre vectores. La elección de una buena métrica de distancia ayuda a mejorar significativamente el rendimiento de la clasificación y la agrupación.</p>
<p>La siguiente tabla muestra cómo estas métricas de similitud ampliamente utilizadas se ajustan a varias formas de datos de entrada e índices de Milvus. Actualmente, Milvus admite varios tipos de datos, incluyendo incrustaciones de punto flotante (a menudo conocidas como vectores de punto flotante o vectores densos), incrustaciones binarias (también conocidas como vectores binarios) e incrustaciones dispersas (también conocidas como vectores dispersos).</p>
<div class="filter">
 <a href="#sparse">Incrustaciones</a> <a href="#binary">en</a> <a href="#floating">coma flotante</a> <a href="#binary">Incrustaciones binarias</a> <a href="#sparse">Incrustaciones dispersas</a></div>
<div class="filter-floating table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Tipos métricos</th>
    <th class="tg-0pky">Tipos de índices</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Distancia euclidiana (L2)</li><li>Producto interior (IP)</li><li>Similitud coseno (COSINE)</li></td>
    <td class="tg-0pky" rowspan="2"><ul><li>FLAT</li><li>IVF_FLAT</li><li>IVF_SQ8</li><li>IVF_PQ</li><li>GPU_IVF_FLAT</li><li>GPU_IVF_PQ</li><li>HNSW</li><li>DISKANN</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Tipos de métricas</th>
    <th class="tg-0pky">Tipos de índices</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"><ul><li>Jaccard</li><li>Hamming</li></ul></td>
    <td class="tg-0pky"><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper" markdown="block">
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="width: 204px;">Tipos métricos</th>
    <th class="tg-0pky">Tipos de índices</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">IP</td>
    <td class="tg-0pky"><ul><li>SPARSE_INVERTED_INDEX</li><li>SPARSE_WAND</li></ul></td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Euclidean-distance-L2" class="common-anchor-header">Distancia euclídea (L2)</h3><p>Esencialmente, la distancia euclídea mide la longitud de un segmento que une 2 puntos.</p>
<p>La fórmula de la distancia euclídea es la siguiente</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/euclidean_metric.png" alt="euclidean" class="doc-image" id="euclidean" />
   </span> <span class="img-wrapper"> <span>euclídea</span> </span></p>
<p>donde <strong>a</strong> = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>) y <strong>b</strong> = (<sub>b0</sub>, <sub>b0</sub>,..., <sub>bn-1</sub>) son dos puntos en un espacio euclídeo de n dimensiones.</p>
<p>Es la métrica de distancia más utilizada y resulta muy útil cuando los datos son continuos.</p>
<div class="alert note">
Milvus sólo cacula el valor antes de aplicar la raíz cuadrada cuando se elige la distancia euclídea como métrica de distancia.</div>
<h3 id="Inner-product-IP" class="common-anchor-header">Producto interior (PI)</h3><p>La distancia IP entre dos incrustaciones vectoriales se definen de la siguiente manera:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IP_formula.png" alt="ip" class="doc-image" id="ip" />
   </span> <span class="img-wrapper"> <span>ip</span> </span></p>
<p>El PI es más útil si necesita comparar datos no normalizados o cuando le importan la magnitud y el ángulo.</p>
<div class="alert note">
<p>Si se aplica la métrica de distancia IP a incrustaciones normalizadas, el resultado será equivalente al cálculo de la similitud coseno entre las incrustaciones.</p>
</div>
<p>Supongamos que X' se normaliza a partir de la incrustación X:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalize_formula.png" alt="normalize" class="doc-image" id="normalize" />
   </span> <span class="img-wrapper"> <span>normalizar</span> </span></p>
<p>La correlación entre las dos incrustaciones es la siguiente</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/normalization_formula.png" alt="normalization" class="doc-image" id="normalization" />
   </span> <span class="img-wrapper"> <span>normalización</span> </span></p>
<h3 id="Cosine-Similarity" class="common-anchor-header">Similitud coseno</h3><p>La similitud coseno utiliza el coseno del ángulo entre dos conjuntos de vectores para medir su similitud. Puede pensar en los dos conjuntos de vectores como dos segmentos de línea que parten del mismo origen ([0,0,...]) pero apuntan en direcciones diferentes.</p>
<p>Para calcular la similitud coseno entre dos conjuntos de vectores <strong>A = (<sub>a0</sub>, <sub>a1</sub>,...,<sub>an-1</sub>)</strong> y <strong>B = (<sub>b0</sub>, <sub>b1</sub>,..., <sub>bn-1</sub>)</strong>, utiliza la siguiente fórmula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cosine_similarity.png" alt="cosine_similarity" class="doc-image" id="cosine_similarity" />
   </span> <span class="img-wrapper"> <span>similitud_coseno</span> </span></p>
<p>La semejanza coseno está siempre en el intervalo <strong>[-1, 1]</strong>. Por ejemplo, dos vectores proporcionales tienen una similitud coseno de <strong>1</strong>, dos vectores ortogonales tienen una similitud de <strong>0</strong>, y dos vectores opuestos tienen una similitud de <strong>-1</strong>. Cuanto mayor sea el coseno, menor será el ángulo entre dos vectores, lo que indica que estos dos vectores son más similares entre sí.</p>
<p>Restando su similitud coseno de 1, se obtiene la distancia coseno entre dos vectores.</p>
<h3 id="Jaccard-distance" class="common-anchor-header">Distancia de Jaccard</h3><p>El coeficiente de similitud de Jaccard mide la similitud entre dos conjuntos de muestras y se define como la cardinalidad de la intersección de los conjuntos definidos dividida por la cardinalidad de la unión de los mismos. Sólo puede aplicarse a conjuntos muestrales finitos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_coeff.png" alt="Jaccard similarity coefficient" class="doc-image" id="jaccard-similarity-coefficient" />
   </span> <span class="img-wrapper"> <span>Coeficiente de similitud de Jaccard</span> </span></p>
<p>La distancia de Jaccard mide la disimilitud entre conjuntos de datos y se obtiene restando a 1 el coeficiente de similitud de Jaccard. Para variables binarias, la distancia de Jaccard es equivalente al coeficiente de Tanimoto.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaccard_dist.png" alt="Jaccard distance" class="doc-image" id="jaccard-distance" />
   </span> <span class="img-wrapper"> <span>Distancia de Jaccard</span> </span></p>
<h3 id="Hamming-distance" class="common-anchor-header">Distancia Hamming</h3><p>La distancia de Hamming mide cadenas de datos binarias. La distancia entre dos cadenas de igual longitud es el número de posiciones de bits en las que los bits son diferentes.</p>
<p>Por ejemplo, supongamos que hay dos cadenas, 1101 1001 y 1001 1101.</p>
<p>11011001 ⊕ 10011101 = 01000100. Como contiene dos 1, la distancia de Hamming, d (11011001, 10011101) = 2.</p>
<h3 id="Structural-Similarity" class="common-anchor-header">Similitud estructural</h3><p>Cuando una estructura química forma parte de una estructura química mayor, la primera se denomina subestructura y la segunda, superestructura. Por ejemplo, el etanol es una subestructura del ácido acético, y el ácido acético es una superestructura del etanol.</p>
<p>La similitud estructural se utiliza para determinar si dos fórmulas químicas son similares entre sí en el sentido de que una es la superestructura o la subestructura de la otra.</p>
<p>Para determinar si A es una superestructura de B, utilice la siguiente fórmula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/superstructure.png" alt="superstructure" class="doc-image" id="superstructure" />
   </span> <span class="img-wrapper"> <span>superestructura</span> </span></p>
<p>Donde:</p>
<ul>
<li>A es la representación binaria de una fórmula química que se desea recuperar</li>
<li>B es la representación binaria de una fórmula química en la base de datos</li>
</ul>
<p>Si devuelve <code translate="no">0</code>, <strong>A</strong> no es una superestructura de <strong>B</strong>. En caso contrario, el resultado es el contrario.</p>
<p>Para determinar si A es una subestructura de B, utilice la siguiente fórmula:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/substructure.png" alt="substructure" class="doc-image" id="substructure" />
   </span> <span class="img-wrapper"> <span>subestructura</span> </span></p>
<p>Donde:</p>
<ul>
<li>A es la representación binaria de una fórmula química a recuperar</li>
<li>B es la representación binaria de una fórmula química en la base de datos</li>
</ul>
<p>Si devuelve <code translate="no">0</code>, <strong>A</strong> no es una subestructura de <strong>B</strong>. En caso contrario, el resultado es el contrario.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<summary><font color="#4fc4f9">¿Por qué el resultado top1 de una búsqueda vectorial no es el propio vector buscado, si el tipo de</font></summary>métrica es producto interior? Esto ocurre si no se han normalizado los vectores al utilizar producto interior como métrica de distancia.</details>
<details>
<summary><font color="#4fc4f9">¿Qué es la normalización? ¿Por qué es necesaria la normalización?</font></summary></p>
<p>La normalización se refiere al proceso de convertir una incrustación (vector) para que su norma sea igual a 1. Si utiliza el producto interno para calcular las similitudes entre incrustaciones, debe normalizar sus incrustaciones. Después de la normalización, el producto interior es igual a la similitud coseno.</p>
<p>
Para más información, consulte <a href="https://en.wikipedia.org/wiki/Unit_vector">Wikipedia</a>.</p>
</details>
<details>
<summary><font color="#4fc4f9">¿Por qué obtengo resultados diferentes utilizando la distancia euclídea (L2) y el producto interior (PI) como métrica de distancia?</font></summary>Compruebe si los vectores están normalizados. Si no es así, primero debe normalizar los vectores. En teoría, las similitudes calculadas mediante L2 son diferentes de las calculadas mediante IP si los vectores no están normalizados.</details>
<h2 id="Whats-next" class="common-anchor-header">Más información<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Aprenda más sobre los <a href="/docs/es/v2.4.x/index.md">tipos de índice</a> soportados en Milvus.</li>
</ul>
