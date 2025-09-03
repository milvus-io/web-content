---
id: decay-ranker-overview.md
title: Visión general de Decay RankerCompatible with Milvus 2.6.x
summary: >-
  En la búsqueda vectorial tradicional, los resultados se clasifican únicamente
  por similitud vectorial, es decir, por la coincidencia de los vectores en el
  espacio matemático. Pero en las aplicaciones del mundo real, lo que hace que
  un contenido sea realmente relevante a menudo depende de algo más que la
  similitud semántica.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Visión general de Decay Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>En la búsqueda vectorial tradicional, los resultados se clasifican únicamente por similitud vectorial, es decir, por la coincidencia de los vectores en el espacio matemático. Pero en las aplicaciones del mundo real, lo que hace que un contenido sea realmente relevante a menudo depende de algo más que de la similitud semántica.</p>
<p>Considere estas situaciones cotidianas:</p>
<ul>
<li><p>Una búsqueda de noticias en la que el artículo de ayer debería estar mejor clasificado que un artículo similar de hace tres años.</p></li>
<li><p>Un buscador de restaurantes que da prioridad a los locales situados a 5 minutos de distancia frente a los que requieren un trayecto de 30 minutos en coche.</p></li>
<li><p>Una plataforma de comercio electrónico que potencie los productos de moda aunque sean ligeramente menos similares a la consulta de búsqueda.</p></li>
</ul>
<p>Todos estos escenarios comparten una necesidad común: equilibrar la similitud vectorial con otros factores numéricos como el tiempo, la distancia o la popularidad.</p>
<p>Los clasificadores de decrecimiento de Milvus responden a esta necesidad ajustando las clasificaciones de búsqueda en función de los valores de los campos numéricos. Le permiten equilibrar la similitud vectorial con la "frescura", la "cercanía" u otras propiedades numéricas de sus datos, creando experiencias de búsqueda más intuitivas y contextualmente relevantes.</p>
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
<li><p>La clasificación por decaimiento no puede utilizarse con búsquedas agrupadas.</p></li>
<li><p>El campo utilizado para la clasificación por decaimiento debe ser numérico (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, o <code translate="no">DOUBLE</code>).</p></li>
<li><p>Cada clasificador sólo puede utilizar un campo numérico.</p></li>
<li><p><strong>Coherencia de la unidad de tiempo</strong>: Al utilizar la clasificación por tiempo, las unidades de los parámetros <code translate="no">origin</code>, <code translate="no">scale</code> y <code translate="no">offset</code> deben coincidir con las unidades utilizadas en los datos de la colección:</p>
<ul>
<li>Si su colección almacena las marcas de tiempo en <strong>segundos</strong>, utilice segundos para todos los parámetros.</li>
<li>Si su colección almacena marcas de tiempo en <strong>milisegundos</strong>, utilice milisegundos para todos los parámetros.</li>
<li>Si su colección almacena las marcas de tiempo en <strong>microsegundos</strong>, utilice microsegundos para todos los parámetros.</li>
</ul></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Funcionamiento<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>La clasificación por decaimiento mejora la búsqueda vectorial tradicional incorporando factores numéricos como el tiempo o la distancia geográfica en el proceso de clasificación. El proceso completo sigue las siguientes etapas</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">Etapa 1: Calcular las puntuaciones de similitud normalizadas<button data-href="#Stage-1-Calculate-normalized-similarity-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>En primer lugar, Milvus calcula y normaliza las puntuaciones de similitud de los vectores para garantizar una comparación coherente:</p>
<ul>
<li><p>Para las métricas de distancia <strong>L2</strong> y <strong>JACCARD</strong> (donde los valores más bajos indican mayor similitud):</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>Esto transforma las distancias en puntuaciones de similitud entre 0-1, donde mayor es mejor.</p></li>
<li><p>Para las métricas <strong>IP</strong>, <strong>COSINE</strong> y <strong>BM25</strong> (donde las puntuaciones más altas ya indican mejores coincidencias): Las puntuaciones se utilizan directamente sin normalización.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">Etapa 2: Calcular las puntuaciones de decaimiento<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>A continuación, Milvus calcula una puntuación de descomposición basada en el valor numérico del campo (como la marca de tiempo o la distancia) utilizando el clasificador de descomposición seleccionado:</p>
<ul>
<li><p>Cada decay ranker transforma los valores numéricos brutos en puntuaciones de relevancia normalizadas entre 0-1</p></li>
<li><p>La puntuación de descomposición representa la relevancia de un elemento en función de su "distancia" respecto al punto ideal.</p></li>
</ul>
<p>La fórmula de cálculo específica varía en función del tipo de clasificador. Para más detalles sobre cómo calcular una puntuación de descomposición, consulte las páginas dedicadas a la descomposición <a href="/docs/es/gaussian-decay.md#Formula">gaussiana</a>, la <a href="/docs/es/exponential-decay.md#Formula">descomposición exponencial</a> y <a href="/docs/es/linear-decay.md#Formula">la descomposición lineal</a>.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">Etapa 3: Calcular las puntuaciones finales<button data-href="#Stage-3-Compute-final-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Por último, Milvus combina la puntuación de similitud normalizada y la puntuación de decaimiento para producir la puntuación de clasificación final:</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>En los casos de búsqueda híbrida (que combina múltiples campos vectoriales), Milvus toma la máxima puntuación de similitud normalizada entre las peticiones de búsqueda:</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Por ejemplo, si un artículo de investigación obtiene una puntuación de 0,82 a partir de la similitud vectorial y de 0,91 a partir de la recuperación de texto basada en BM25 en una búsqueda híbrida, Milvus utiliza 0,91 como puntuación de similitud base antes de aplicar el factor de decaimiento.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">Decay ranking en acción<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>Veamos la clasificación por decaimiento en un escenario práctico: la búsqueda de <strong>"artículos de investigación sobre inteligencia artificial"</strong> con un decaimiento basado en el tiempo:</p>
<div class="alert note">
<p>En este ejemplo, las puntuaciones reflejan cómo disminuye la relevancia con el tiempo: los artículos más recientes reciben puntuaciones cercanas a 1,0 y los más antiguos, puntuaciones más bajas. Estos valores se calculan utilizando un clasificador de decaimiento específico. Para más detalles, consulte <a href="/docs/es/decay-ranker-overview.md#Choose-the-right-decay-ranker">Elegir el clasificador de deterioro adecuado</a>.</p>
</div>
<table>
   <tr>
     <th><p>Artículo</p></th>
     <th><p>Vector de similitud</p></th>
     <th><p>Puntuación de similitud normalizada</p></th>
     <th><p>Fecha de publicación</p></th>
     <th><p>Decaimiento</p></th>
     <th><p>Puntuación final</p></th>
     <th><p>Clasificación final</p></th>
   </tr>
   <tr>
     <td><p>Artículo A</p></td>
     <td><p>Alto</p></td>
     <td><p>0.85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Hace 2 semanas</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Papel B</p></td>
     <td><p>Muy alto</p></td>
     <td><p>0.92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Hace 6 meses</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>Papel C</p></td>
     <td><p>Medio</p></td>
     <td><p>0.75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Hace 1 día</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Papel D</p></td>
     <td><p>Medio-Alto</p></td>
     <td><p>0,76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>hace 3 semanas</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>Sin la reordenación por decaimiento, el documento B ocuparía el primer lugar en función de la similitud vectorial pura (0,92). Sin embargo, si se aplica la reordenación por decaimiento:</p>
<ul>
<li><p>El artículo C salta a la posición nº 1 a pesar de su similitud media porque es muy reciente (publicado ayer).</p></li>
<li><p>El artículo B cae a la posición 3 a pesar de su excelente similitud porque es relativamente antiguo.</p></li>
<li><p>El artículo D utiliza la distancia L2 (donde menor es mejor), por lo que su puntuación se normaliza de 1,2 a 0,76 antes de aplicar el decaimiento.</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">Elija el clasificador correcto<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus ofrece distintos clasificadores de decaimiento - <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code>, cada uno diseñado para casos de uso específicos:</p>
<table>
   <tr>
     <th><p>Decay Ranker</p></th>
     <th><p>Características</p></th>
     <th><p>Casos de uso ideales</p></th>
     <th><p>Ejemplo</p></th>
   </tr>
   <tr>
     <td><p>Gaussiano (<code translate="no">gauss</code>)</p></td>
     <td><p>Declive gradual de sensación natural que se extiende moderadamente</p></td>
     <td><ul>
<li><p>Búsquedas generales que requieren resultados equilibrados</p></li>
<li><p>Aplicaciones en las que los usuarios tienen un sentido intuitivo de la distancia</p></li>
<li><p>Cuando una distancia moderada no debería penalizar gravemente los resultados</p></li>
</ul></td>
     <td><p>En una búsqueda de restaurantes, los locales de calidad situados a 3 km de distancia siguen siendo localizables, aunque con una clasificación inferior a las opciones cercanas</p></td>
   </tr>
   <tr>
     <td><p>Exponencial (<code translate="no">exp</code>)</p></td>
     <td><p>Disminuye rápidamente al principio, pero mantiene una larga cola</p></td>
     <td><ul>
<li><p>Noticias en las que la actualidad es fundamental</p></li>
<li><p>Redes sociales, donde debe dominar el contenido fresco</p></li>
<li><p>Cuando se prefiere la proximidad, pero los artículos excepcionalmente distantes deben permanecer visibles</p></li>
</ul></td>
     <td><p>En una aplicación de noticias, las historias de ayer se clasifican mucho mejor que el contenido de hace una semana, pero los artículos antiguos de gran relevancia pueden seguir apareciendo.</p></td>
   </tr>
   <tr>
     <td><p>Lineal (<code translate="no">linear</code>)</p></td>
     <td><p>Descenso constante y predecible con un límite claro.</p></td>
     <td><ul>
<li><p>Aplicaciones con límites naturales</p></li>
<li><p>Servicios con límites de distancia</p></li>
<li><p>Contenido con fechas de caducidad o umbrales claros</p></li>
</ul></td>
     <td><p>En un buscador de eventos, los eventos más allá de una ventana futura de dos semanas simplemente no aparecen en absoluto</p></td>
   </tr>
</table>
<p>Para obtener información detallada sobre cómo calcula las puntuaciones cada clasificador de decaimiento y los patrones de decaimiento específicos, consulte la documentación dedicada:</p>
<ul>
<li><p><a href="/docs/es/gaussian-decay.md">Decaimiento gaussiano</a></p></li>
<li><p><a href="/docs/es/exponential-decay.md">Decaimiento exponencial</a></p></li>
<li><p><a href="/docs/es/linear-decay.md">Decaimiento lineal</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">Ejemplo de aplicación<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>Los clasificadores de decaimiento pueden aplicarse tanto a la búsqueda vectorial estándar como a las operaciones de búsqueda híbrida en Milvus. A continuación se muestran los fragmentos de código clave para implementar esta función.</p>
<div class="alert note">
<p>Antes de utilizar las funciones de decaimiento, primero debe crear una colección con los campos numéricos apropiados (como marcas de tiempo, distancias, etc.) que se utilizarán para los cálculos de decaimiento. Para ver ejemplos de trabajo completos que incluyan la configuración de la colección, la definición del esquema y la inserción de datos, consulte <a href="/docs/es/tutorial-implement-a-time-based-ranking-in-milvus.md">Tutorial: Implementar la clasificación basada en el tiempo en Milvus</a>.</p>
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
    </button></h3><p>Para implementar la clasificación por decaimiento, defina primero un objeto <code translate="no">Function</code> con la configuración adecuada:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
decay_ranker = Function(
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
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>¿Es necesario?</p></th>
     <th><p>Descripción</p></th>
     <th><p>Valor/Ejemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Identificador de la función utilizada al ejecutar búsquedas. Elija un nombre descriptivo relevante para su caso de uso.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Campo numérico para el cálculo de la puntuación del decaimiento. Determina qué atributo de datos se utilizará para calcular la descomposición (por ejemplo, marcas de tiempo para la descomposición basada en el tiempo, coordenadas para la descomposición basada en la ubicación). 
 Debe ser un campo de su colección que contenga valores numéricos relevantes. Admite INT8/16/32/64, FLOAT, DOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica el tipo de función que se está creando. Debe establecerse en <code translate="no">RERANK</code> para todos los clasificadores de descomposición.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica el método de clasificación que se va a utilizar. Debe establecerse en <code translate="no">"decay"</code> para habilitar la funcionalidad de clasificación por decaimiento.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica el clasificador matemático que se aplicará. Consulte la sección <a href="/docs/es/decay-ranker-overview.md#Choose-the-right-decay-ranker">Elegir el clasificador de decaimiento adecuado</a> para obtener orientación sobre la selección de la función adecuada.</p></td>
     <td><p><code translate="no">"gauss"</code> <code translate="no">"exp"</code> o <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Punto de referencia a partir del cual se calcula la puntuación del deterioro. Los ítems en este valor reciben la máxima puntuación de relevancia. Para el deterioro basado en el tiempo, la unidad de tiempo debe coincidir con sus datos de recopilación.</p></td>
     <td><ul>
<li>Para marcas de tiempo: hora actual (por ejemplo, <code translate="no">int(time.time())</code>)</li>
<li>Para la geolocalización: coordenadas actuales del usuario</li>
</ul></td>
   </tr>
   <tr>
          <td><p><code translate="no">params.scale</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Distancia o tiempo en el que la relevancia desciende hasta el valor <code translate="no">decay</code>. Controla la rapidez con la que disminuye la relevancia. Para el decaimiento basado en el tiempo, la unidad de tiempo debe coincidir con sus datos de recopilación. Los valores más grandes crean un decaimiento más gradual de la relevancia; los valores más pequeños crean un decaimiento más pronunciado.</p></td>
     <td><ul>
<li>Para el tiempo: periodo en segundos (por ejemplo, <code translate="no">7 * 24 * 60 * 60</code> durante 7 días)</li>
<li>Para la distancia: metros (por ejemplo, <code translate="no">5000</code> para 5km)</li>
</ul></td>
   </tr>
   <tr>
          <td><p><code translate="no">params.offset</code></p></td>
     <td><p>Sin</p></td>
     <td><p>Crea una "zona de no decaimiento" alrededor de <code translate="no">origin</code> en la que los artículos mantienen la puntuación completa (puntuación de decaimiento = 1,0). Los artículos dentro de este rango de <code translate="no">origin</code> mantienen la relevancia máxima. Para el decaimiento basado en el tiempo, la unidad de tiempo debe coincidir con los datos de su colección.</p></td>
     <td><ul>
<li>Para el tiempo: periodo en segundos (por ejemplo, <code translate="no">24 * 60 * 60</code> durante 1 día)</li>
<li>Para la distancia: metros (por ejemplo, <code translate="no">500</code> para 500m)</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>No</p></td>
     <td><p>Valor de puntuación en la distancia <code translate="no">scale</code>, controla la inclinación de la curva. Los valores más bajos crean curvas de descenso más pronunciadas; los valores más altos crean curvas de descenso más graduales. Debe estar entre 0 y 1.</p></td>
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
    </button></h3><p>Después de definir su clasificador de decaimiento, puede aplicarlo durante las operaciones de búsqueda pasándolo al parámetro <code translate="no">ranker</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Aplicar a la búsqueda híbrida<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Los decay rankers también pueden aplicarse a operaciones de búsqueda híbrida que combinan múltiples campos vectoriales:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;search query&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Same decay ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>En la búsqueda híbrida, Milvus encuentra primero la máxima puntuación de similitud de todos los campos vectoriales y, a continuación, aplica el factor de decaimiento a esa puntuación.</p>
