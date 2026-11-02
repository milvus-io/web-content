---
id: decay-ranker-overview.md
title: Descripción general de Decay RankerCompatible with Milvus 2.6.x
summary: >-
  En la búsqueda vectorial tradicional, los resultados se clasifican únicamente
  en función de la similitud vectorial, es decir, del grado de coincidencia
  entre los vectores en el espacio matemático. Sin embargo, en las aplicaciones
  del mundo real, lo que hace que un contenido sea realmente relevante suele
  depender de algo más que la mera similitud semántica.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Descripción general de Decay Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>En la búsqueda vectorial tradicional, los resultados se clasifican únicamente en función de la similitud vectorial, es decir, del grado de coincidencia entre los vectores en el espacio matemático. Sin embargo, en las aplicaciones del mundo real, lo que hace que un contenido sea verdaderamente relevante suele depender de algo más que la mera similitud semántica.</p>
<p>Pensemos en estas situaciones cotidianas:</p>
<ul>
<li><p>Una búsqueda de noticias en la que un artículo de ayer debería aparecer mejor posicionado que un artículo similar de hace tres años</p></li>
<li><p>Un buscador de restaurantes que da prioridad a los locales situados a 5 minutos de distancia frente a los que requieren un trayecto de 30 minutos en coche</p></li>
<li><p>Una plataforma de comercio electrónico que destaca los productos de moda incluso cuando son ligeramente menos similares a la consulta de búsqueda</p></li>
</ul>
<p>Todas estas situaciones comparten una necesidad común: equilibrar la similitud vectorial con otros factores numéricos como el tiempo, la distancia o la popularidad.</p>
<p>Los clasificadores de decaimiento de Milvus abordan esta necesidad ajustando los rankings de búsqueda en función de los valores de los campos numéricos. Te permiten equilibrar la similitud vectorial con la «frescura», la «proximidad» u otras propiedades numéricas de tus datos, creando experiencias de búsqueda más intuitivas y contextualmente relevantes.</p>
<h2 id="Usage-notes" class="common-anchor-header">Notas de uso<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p>La clasificación decreciente no se puede utilizar con búsquedas agrupadas.</p></li>
<li><p>El campo utilizado para la clasificación decreciente debe ser numérico (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code> o <code translate="no">DOUBLE</code>).</p></li>
<li><p>Cada clasificador de decaimiento solo puede utilizar un campo numérico.</p></li>
<li><p><strong>Coherencia de las unidades de tiempo</strong>: al utilizar la clasificación por decaimiento basada en el tiempo, las unidades de los parámetros <code translate="no">origin</code>, <code translate="no">scale</code> y <code translate="no">offset</code> deben coincidir con las unidades utilizadas en los datos de su colección:</p>
<ul>
<li><p>Si su colección almacena marcas de tiempo en <strong>segundos</strong>, utilice segundos para todos los parámetros</p></li>
<li><p>Si su colección almacena marcas de tiempo en <strong>milisegundos</strong>, utilice milisegundos para todos los parámetros</p></li>
<li><p>Si su colección almacena marcas de tiempo en <strong>microsegundos</strong>, utilice microsegundos para todos los parámetros</p></li>
</ul></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Cómo funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>La clasificación por decaimiento mejora la búsqueda vectorial tradicional al incorporar factores numéricos, como el tiempo o la distancia geográfica, en el proceso de clasificación. El proceso completo sigue estas etapas:</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">Etapa 1: Cálculo de puntuaciones de similitud normalizadas<button data-href="#Stage-1-Calculate-normalized-similarity-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>En primer lugar, Milvus calcula y normaliza las puntuaciones de similitud vectorial para garantizar una comparación coherente:</p>
<ul>
<li><p>Para las métricas de distancia <strong>L2</strong> y <strong>JACCARD</strong> (en las que los valores más bajos indican una mayor similitud):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>Esto transforma las distancias en puntuaciones de similitud comprendidas entre 0 y 1, donde cuanto mayor sea el valor, mejor.</p></li>
<li><p>Para las métricas <strong>IP</strong>, <strong>COSINE</strong> y <strong>BM25</strong> (en las que unas puntuaciones más altas ya indican mejores coincidencias): Las puntuaciones se utilizan directamente sin normalización.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">Etapa 2: Cálculo de las puntuaciones de decaimiento<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>A continuación, Milvus calcula una puntuación de decaimiento basada en el valor numérico del campo (como la marca de tiempo o la distancia) utilizando el clasificador de decaimiento seleccionado:</p>
<ul>
<li><p>Cada clasificador de decaimiento transforma los valores numéricos brutos en puntuaciones de relevancia normalizadas entre 0 y 1</p></li>
<li><p>La puntuación de decaimiento representa la relevancia de un elemento en función de su «distancia» respecto al punto ideal</p></li>
</ul>
<p>La fórmula de cálculo específica varía en función del tipo de clasificador de decaimiento. Para obtener más detalles sobre cómo calcular una puntuación de decaimiento, consulta las páginas dedicadas al <a href="/docs/es/gaussian-decay.md#Formula">decaimiento gaussiano</a>, al <a href="/docs/es/exponential-decay.md#Formula">decaimiento exponencial</a> y <a href="/docs/es/linear-decay.md#Formula">al decaimiento lineal</a>.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">Etapa 3: Cálculo de las puntuaciones finales<button data-href="#Stage-3-Compute-final-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Por último, Milvus combina la puntuación de similitud normalizada y la puntuación de decaimiento para obtener la puntuación de clasificación final:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>En los casos de búsqueda híbrida (que combina varios campos vectoriales), Milvus toma la puntuación de similitud normalizada máxima entre las solicitudes de búsqueda:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Por ejemplo, si un artículo de investigación obtiene una puntuación de 0,82 en similitud vectorial y de 0,91 en la recuperación de texto basada en BM25 en una búsqueda híbrida, Milvus utiliza 0,91 como puntuación de similitud base antes de aplicar el factor de decaimiento.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">La clasificación con decaimiento en la práctica<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>Veamos cómo funciona la clasificación por decaimiento en un escenario práctico: la búsqueda de <strong>«artículos de investigación sobre IA»</strong> con decaimiento basado en el tiempo:</p>
<div class="alert note">
<p>En este ejemplo, las puntuaciones de decaimiento reflejan cómo la relevancia disminuye con el tiempo: los artículos más recientes reciben puntuaciones más cercanas a 1,0, mientras que los más antiguos reciben puntuaciones más bajas. Estos valores se calculan utilizando un clasificador de decaimiento específico. Para más detalles, consulta <a href="/docs/es/decay-ranker-overview.md#Choose-the-right-decay-ranker">«Elegir el clasificador de decaimiento adecuado</a>».</p>
</div>
<table>
   <tr>
     <th><p>Artículo</p></th>
     <th><p>Similaridad vectorial</p></th>
     <th><p>Puntuación de similitud normalizada</p></th>
     <th><p>Fecha de publicación</p></th>
     <th><p>Puntuación de decaimiento</p></th>
     <th><p>Puntuación final</p></th>
     <th><p>Clasificación final</p></th>
   </tr>
   <tr>
     <td><p>Artículo A</p></td>
     <td><p>Alta</p></td>
     <td><p>0,85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Hace 2 semanas</p></td>
     <td><p>0,80</p></td>
     <td><p>0,68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Papel B</p></td>
     <td><p>Muy alto</p></td>
     <td><p>0,92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Hace 6 meses</p></td>
     <td><p>0,45</p></td>
     <td><p>0,41</p></td>
     <td>4</td>
   </tr>
   <tr>
     <td><p>Papel C</p></td>
     <td><p>Medio</p></td>
     <td><p>0,75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Hace 1 día</p></td>
     <td><p>0,98</p></td>
     <td><p>0,74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Papel D</p></td>
     <td><p>Medio-alto</p></td>
     <td><p>0,76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Hace 3 semanas</p></td>
     <td><p>0,70</p></td>
     <td><p>0,53</p></td>
     <td>3</td>
   </tr>
</table>
<p>Sin la reordenación por decaimiento, el artículo B ocuparía el primer puesto basándose únicamente en la similitud vectorial (0,92). Sin embargo, al aplicar la reordenación por decaimiento:</p>
<ul>
<li><p>El artículo C salta al puesto n.º 1 a pesar de tener una similitud media, ya que es muy reciente (se publicó ayer)</p></li>
<li><p>El artículo B cae a la cuarta posición a pesar de su excelente similitud, ya que es relativamente antiguo</p></li>
<li><p>El artículo D utiliza la similitud COSINE, por lo que su puntuación de 0,76 se utiliza directamente antes de aplicar la atenuación</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">Elige el clasificador de decaimiento adecuado<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus ofrece distintos clasificadores con decaimiento: <code translate="no">gauss</code>, <code translate="no">exp</code> y <code translate="no">linear</code>, cada uno diseñado para casos de uso específicos:</p>
<table>
   <tr>
     <th><p>Clasificador de decaimiento</p></th>
     <th><p>Características</p></th>
     <th><p>Casos de uso ideales</p></th>
     <th><p>Ejemplo de escenario</p></th>
   </tr>
   <tr>
     <td><p>Gaussiano (<code translate="no">gauss</code>)</p></td>
     <td><p>Descenso gradual y natural que se extiende de forma moderada</p></td>
     <td><ul><li><p>Búsquedas generales que requieren resultados equilibrados</p></li><li><p>Aplicaciones en las que los usuarios tienen una percepción intuitiva de la distancia</p></li><li><p>Cuando una distancia moderada no debe penalizar en exceso los resultados</p></li></ul></td>
     <td><p>En una búsqueda de restaurantes, los locales de calidad situados a 3 km siguen siendo visibles, aunque aparecen en posiciones inferiores a las opciones más cercanas</p></td>
   </tr>
   <tr>
     <td><p>Exponencial (<code translate="no">exp</code>)</p></td>
     <td><p>Disminuye rápidamente al principio, pero mantiene una cola larga</p></td>
     <td><ul><li><p>Flujos de noticias en los que la actualidad es fundamental</p></li><li><p>Redes sociales en las que debe predominar el contenido reciente</p></li><li><p>Cuando se da prioridad a la proximidad, pero deben seguir siendo visibles los elementos lejanos que destaquen</p></li></ul></td>
     <td><p>En una aplicación de noticias, las noticias de ayer ocupan un lugar mucho más destacado que el contenido de hace una semana, pero los artículos antiguos muy relevantes pueden seguir apareciendo</p></td>
   </tr>
   <tr>
     <td><p>Lineal (<code translate="no">linear</code>)</p></td>
     <td><p>Descenso constante y predecible con un límite claro</p></td>
     <td><ul><li><p>Aplicaciones con límites naturales</p></li><li><p>Servicios con límites de distancia</p></li><li><p>Contenido con fechas de caducidad o umbrales claros</p></li></ul></td>
     <td><p>En un buscador de eventos, los eventos que se celebren más allá de un plazo de dos semanas simplemente no aparecen</p></td>
   </tr>
</table>
<p>Para obtener información detallada sobre cómo cada clasificador de decaimiento calcula las puntuaciones y los patrones de disminución específicos, consulta la documentación específica:</p>
<ul>
<li><p><a href="/docs/es/gaussian-decay.md">Decaimiento gaussiano</a></p></li>
<li><p><a href="/docs/es/exponential-decay.md">Decaimiento exponencial</a></p></li>
<li><p><a href="/docs/es/linear-decay.md">Decaimiento lineal</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">Ejemplo de implementación<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>Los clasificadores de decaimiento se pueden aplicar tanto a la búsqueda vectorial estándar como a las operaciones de búsqueda híbrida en Milvus. A continuación se muestran los fragmentos de código clave para implementar esta función.</p>
<div class="alert note">
<p>Antes de utilizar las funciones de decaimiento, debes crear primero una colección con los campos numéricos adecuados (como marcas de tiempo, distancias, etc.) que se utilizarán para los cálculos de decaimiento. Para ver ejemplos completos que incluyen la configuración de la colección, la definición del esquema y la inserción de datos, consulta <a href="/docs/es/tutorial-implement-a-time-based-ranking-in-milvus.md">el tutorial: «Implementar una clasificación basada en el tiempo en Milvus</a>».</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Crear un clasificador de decaimiento<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Para implementar la clasificación con decaimiento, defina primero un objeto ` <code translate="no">Function</code> ` con la configuración adecuada:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> datetime

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
rerank = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).timestamp()),    <span class="hljs-comment"># Reference point (seconds)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds (must match collection data unit)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone (must match collection data unit)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;
<span class="hljs-keyword">import</span> java.time.ZoneId;
<span class="hljs-keyword">import</span> java.time.ZonedDateTime;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">zdt</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ZoneId.systemDefault());

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;timestamp&quot;</span>))
        .function(<span class="hljs-string">&quot;gauss&quot;</span>)
        .origin(zdt.toInstant().getEpochSecond())
        .scale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .offset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .decay(<span class="hljs-number">0.5</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;time_decay&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function&quot;</span>, <span class="hljs-string">&quot;gauss&quot;</span>).
    WithParam(<span class="hljs-string">&quot;origin&quot;</span>, <span class="hljs-number">1735689600</span>).
    WithParam(<span class="hljs-string">&quot;scale&quot;</span>, <span class="hljs-number">7</span>*<span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;offset&quot;</span>, <span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;decay&quot;</span>, <span class="hljs-number">0.5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = DecayRerank::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">function</span>(Function::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;timestamp&quot;</span>])
        .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
        .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>))
    .<span class="hljs-title function_ invoke__">decay_function</span>(<span class="hljs-string">&quot;gauss&quot;</span>)
    .<span class="hljs-title function_ invoke__">origin</span>(<span class="hljs-number">1735689600</span>)
    .<span class="hljs-title function_ invoke__">scale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">offset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">decay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::DecayRerank&gt;(<span class="hljs-string">&quot;time_decay&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;timestamp&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFunction</span>(<span class="hljs-string">&quot;gauss&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetOrigin</span>(<span class="hljs-number">1735689600</span>);
rerank-&gt;<span class="hljs-built_in">SetScale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetOffset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetDecay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;time_decay&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">UTC</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">0</span>, <span class="hljs-number">15</span>) / <span class="hljs-number">1000</span>),
    <span class="hljs-attr">scale</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create a decay function for timestamp-based decay</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> DecayRerank(<span class="hljs-string">&quot;time_decay&quot;</span>)     <span class="hljs-comment">// Function identifier</span>
    .WithInputField(<span class="hljs-string">&quot;timestamp&quot;</span>)                <span class="hljs-comment">// Numeric field to use for decay</span>
    .WithFunction(<span class="hljs-string">&quot;gauss&quot;</span>)                       <span class="hljs-comment">// Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
    .WithOrigin(<span class="hljs-keyword">new</span> DateTimeOffset(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, TimeSpan.Zero).ToUnixTimeSeconds()) <span class="hljs-comment">// Reference point (seconds)</span>
    .WithScale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                 <span class="hljs-comment">// 7 days in seconds (must match collection data unit)</span>
    .WithOffset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                    <span class="hljs-comment">// 1 day no-decay zone (must match collection data unit)</span>
    .WithDecay(<span class="hljs-number">0.5f</span>);                            <span class="hljs-comment">// Half score at scale distance</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>¿Es obligatorio?</p></th>
     <th><p>Descripción</p></th>
     <th><p>Valor/Ejemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Identificador de tu función que se utiliza al realizar búsquedas. Elige un nombre descriptivo y relevante para tu caso de uso.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Campo numérico para el cálculo de la puntuación de caducidad. Determina qué atributo de datos se utilizará para calcular la caducidad (por ejemplo, marcas de tiempo para la caducidad basada en el tiempo, coordenadas para la caducidad basada en la ubicación). </p><p>Debe ser un campo de su colección que contenga valores numéricos relevantes. Admite los tipos INT8/16/32/64, FLOAT y DOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica el tipo de función que se está creando.</p><p>Debe establecerse en « <code translate="no">RERANK</code> » para todos los clasificadores de decaimiento.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica el método de reordenación que se va a utilizar.</p><p>Debe establecerse en « <code translate="no">"decay"</code> » para habilitar la funcionalidad de clasificación por decaimiento.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica qué clasificador de decaimiento matemático se debe aplicar. Determina la forma de la curva de disminución de la relevancia.</p><p>Consulte la sección <a href="/docs/es/decay-ranker-overview.md#Choose-the-right-decay-ranker">«Elegir el clasificador de decaimiento adecuado</a> » para obtener orientación sobre cómo seleccionar la función apropiada.</p></td>
     <td><p><code translate="no">"gauss"</code>, « <code translate="no">"exp"</code> » o <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Punto de referencia a partir del cual se calcula la puntuación de decaimiento. Los elementos con este valor reciben la puntuación máxima de relevancia.</p><p>En el caso de la disminución basada en el tiempo, la unidad de tiempo debe coincidir con los datos de su colección.</p></td>
     <td><ul><li><p>Para marcas de tiempo: hora actual (p. ej., <code translate="no">int(time.time())</code>)</p></li><li><p>Para la geolocalización: coordenadas actuales del usuario</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Distancia o tiempo a partir del cual la relevancia desciende hasta el valor <code translate="no">decay</code>. Controla la rapidez con la que disminuye la relevancia.</p><p>En el caso de la disminución basada en el tiempo, la unidad de tiempo debe coincidir con los datos de su colección.</p><p>Los valores más altos provocan una disminución más gradual de la relevancia; los valores más bajos, una disminución más pronunciada.</p></td>
     <td><ul><li><p>Para el tiempo: periodo en segundos (p. ej., <code translate="no">7 * 24 * 60 * 60</code> para 7 días)</p></li><li><p>Para la distancia: metros (p. ej., <code translate="no">5000</code> para 5 km)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>No</p></td>
     <td><p>Crea una «zona sin decaimiento» alrededor del <code translate="no">origin</code> en la que los elementos mantienen la puntuación máxima (puntuación de decaimiento = 1,0).</p><p>Para la pérdida de relevancia basada en el tiempo, la unidad de tiempo debe coincidir con los datos de tu colección.</p><p>Los elementos dentro de este rango de <code translate="no">origin</code> mantienen la máxima relevancia.</p></td>
     <td><ul><li><p>Para el tiempo: periodo en segundos (p. ej., <code translate="no">24 * 60 * 60</code> durante 1 día)</p></li><li><p>Para la distancia: metros (p. ej., <code translate="no">500</code> para 500 m)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>No</p></td>
     <td><p>El valor de la puntuación en la distancia « <code translate="no">scale</code> » controla la pendiente de la curva. Los valores más bajos crean curvas de descenso más pronunciadas; los valores más altos crean curvas de descenso más graduales.</p><p>Debe estar entre 0 y 1.</p></td>
     <td><p><code translate="no">0.5</code> (por defecto)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Aplicar a la búsqueda vectorial estándar<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Tras definir tu clasificador de decaimiento, puedes aplicarlo durante las operaciones de búsqueda pasándolo al parámetro « <code translate="no">ranker</code> »:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=rerank,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

functionScore := entity.NewFunctionScore().AddFunction(rerank)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    collection_name, <span class="hljs-comment">// collection name</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit</span>
    []entity.Vector{your_query_vector}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;vector_field&quot;</span>).
    WithFunctionScore(functionScore).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank);
<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[your_query_vector]))
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>])
    .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;document&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;timestamp&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(your_query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector_field&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Use the decay function in standard vector search</span>
SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    Vectors = [yourQueryVector], <span class="hljs-comment">// Replace with your query vector</span>
    VectorFieldName = <span class="hljs-string">&quot;vector_field&quot;</span>,
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span> },  <span class="hljs-comment">// Include the decay field in outputs to see values</span>
        FunctionScoreReranker = rerank,              <span class="hljs-comment">// Apply the decay ranker here</span>
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
