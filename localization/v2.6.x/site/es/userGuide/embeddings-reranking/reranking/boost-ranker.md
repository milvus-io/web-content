---
id: boost-ranker.md
title: Clasificador BoostCompatible with Milvus v2.6.2+
summary: >-
  En lugar de basarse únicamente en la similitud semántica calculada a partir de
  distancias vectoriales, Boost Rankers permite influir en los resultados de
  búsqueda de forma significativa. Es ideal para ajustar rápidamente los
  resultados de búsqueda mediante el filtrado de metadatos.
beta: Milvus v2.6.2+
---
<h1 id="Boost-Ranker" class="common-anchor-header">Clasificador Boost<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>En lugar de basarse únicamente en la similitud semántica calculada a partir de distancias vectoriales, los Boost Rankers permiten influir en los resultados de búsqueda de forma significativa. Es ideal para ajustar rápidamente los resultados de búsqueda mediante el filtrado de metadatos.</p>
<p>Cuando una solicitud de búsqueda incluye una función Boost Ranker, Milvus utiliza la condición de filtrado opcional dentro de la función para encontrar coincidencias entre los candidatos a resultados de búsqueda y aumenta las puntuaciones de esas coincidencias aplicando el peso especificado, ayudando a promover o degradar las clasificaciones de las entidades coincidentes en el resultado final.</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">Cuándo utilizar Boost Ranker<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>A diferencia de otros clasificadores que se basan en modelos de codificación cruzada o algoritmos de fusión, un Boost Ranker inyecta directamente reglas opcionales basadas en metadatos en el proceso de clasificación, lo que lo hace más adecuado en los siguientes escenarios.</p>
<table>
   <tr>
     <th><p>Casos de uso</p></th>
     <th><p>Ejemplos</p></th>
     <th><p>Por qué funciona bien Boost Ranker</p></th>
   </tr>
   <tr>
     <td><p>Priorización de contenidos en función del negocio</p></td>
     <td><ul><li><p>Destacar los productos premium en los resultados de búsqueda de comercio electrónico</p></li><li><p>Aumentar la visibilidad del contenido con métricas de alta participación de los usuarios (como vistas, me gusta y compartidos)</p></li><li><p>Elevar el contenido reciente en aplicaciones de búsqueda sensibles al tiempo</p></li><li><p>Dar prioridad al contenido de fuentes verificadas o de confianza</p></li><li><p>Potenciación de los resultados que coinciden con frases exactas o palabras clave de gran relevancia</p></li></ul></td>
     <td rowspan="2"><p>Sin necesidad de reconstruir índices o modificar modelos de incrustación de vectores -operaciones que pueden llevar mucho tiempo-, puede promover o degradar instantáneamente elementos específicos en los resultados de búsqueda aplicando filtros de metadatos opcionales en tiempo real. Este mecanismo permite clasificaciones de búsqueda flexibles y dinámicas que se adaptan fácilmente a la evolución de los requisitos empresariales.</p></td>
   </tr>
   <tr>
     <td><p>Desclasificación estratégica de contenidos</p></td>
     <td><ul><li><p>Reducir la prominencia de los artículos con bajo inventario sin eliminarlos por completo</p></li><li><p>Reducir el rango de los contenidos con términos potencialmente censurables sin censurarlos</p></li><li><p>Degradar la documentación más antigua pero manteniéndola accesible en las búsquedas técnicas</p></li><li><p>Reducir sutilmente la visibilidad de los productos de la competencia en las búsquedas de mercado.</p></li><li><p>Disminuir la relevancia de los contenidos con indicios de menor calidad (como problemas de formato, menor extensión, etc.)</p></li></ul></td>
   </tr>
</table>
<p>También puede combinar varios Boost Rankers para aplicar una estrategia de clasificación basada en el peso más dinámica y sólida.</p>
<h2 id="Mechanism-of-Boost-Ranker" class="common-anchor-header">Mecanismo del Boost Ranker<button data-href="#Mechanism-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente diagrama ilustra el flujo de trabajo principal de los Boost Rankers.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" />
   </span> <span class="img-wrapper"> <span>Mecanismo de Boost Ranker</span> </span></p>
<p>Cuando se insertan datos, Milvus los distribuye en segmentos. Durante una búsqueda, cada segmento devuelve un conjunto de candidatos, y Milvus clasifica estos candidatos de todos los segmentos para producir los resultados finales. Cuando una solicitud de búsqueda incluye un Boost Ranker, Milvus lo aplica a los resultados de los candidatos de cada segmento para evitar posibles pérdidas de precisión y mejorar la recuperación.</p>
<p>Antes de finalizar los resultados, Milvus procesa estos candidatos con el Boost Ranker como sigue:</p>
<ol>
<li><p>Aplica la expresión de filtrado opcional especificada en el Boost Ranker para identificar las entidades que coinciden con la expresión.</p></li>
<li><p>Aplica el peso especificado en el Boost Ranker para aumentar la puntuación de las entidades identificadas.</p></li>
</ol>
<div class="alert note">
<p>No se puede utilizar Boost Ranker como clasificador en una búsqueda híbrida multivectorial. Sin embargo, puede utilizarlo como clasificador en cualquiera de sus subbúsquedas (<code translate="no">AnnSearchRequest</code>).</p>
</div>
<h2 id="Examples-of-Boost-Ranker" class="common-anchor-header">Ejemplos de Boost Ranker<button data-href="#Examples-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo ilustra el uso de un Boost Ranker en una búsqueda monovectorial que requiere devolver las cinco entidades más relevantes y añadir pesos a las puntuaciones de las entidades con el tipo doc abstracto.</p>
<ol>
<li><p><strong>Recoger los candidatos a resultados de búsqueda en segmentos.</strong></p>
<p>La siguiente tabla supone que Milvus distribuye las entidades en dos segmentos<strong>(0001</strong> y <strong>0002</strong>), y que cada segmento devuelve cinco candidatos.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo de documento</p></th>
<th><p>Puntuación</p></th>
<th><p>Rango</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>abstracto</p></td>
<td><p>0.344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>abstracto</p></td>
<td><p>0.456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>cuerpo</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>título</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>cuerpo</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>cuerpo</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>cuerpo</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>561</p></td>
<td><p>abstracto</p></td>
<td><p>0.366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>abstracto</p></td>
<td><p>0.444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>abstracto</p></td>
<td><p>0.845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>Aplique la expresión de filtrado especificada en el Boost Ranker</strong> (<code translate="no">doctype='abstract'</code>).</p>
<p>Como se indica en el campo <code translate="no">DocType</code> de la siguiente tabla, Milvus marcará todas las entidades con su <code translate="no">doctype</code> ajustado a <code translate="no">abstract</code> para su posterior procesamiento.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo de documento</p></th>
<th><p>Puntuación</p></th>
<th><p>Clasificación</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>cuerpo</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>título</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>cuerpo</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>cuerpo</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>cuerpo</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>Aplicar el peso especificado en el Boost Ranker</strong> (<code translate="no">weight=0.5</code>).</p>
<p>Todas las entidades identificadas en el paso anterior se multiplicarán por el peso especificado en el Boost Ranker, dando lugar a cambios en sus rangos.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo de documento</p></th>
<th><p>Puntuación</p></th>
<th><p>Puntuación ponderada </p><p>(= puntuación x peso)</p></th>
<th><p>Clasificación</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>cuerpo</p></td>
<td><p>0.578</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>título</p></td>
<td><p>0.788</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>cuerpo</p></td>
<td><p>0.899</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>cuerpo</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>cuerpo</p></td>
<td><p>0.265</p></td>
<td><p>0.265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>0.423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>La ponderación debe ser un número de coma flotante que usted elija. En casos como el del ejemplo anterior, en el que una puntuación menor indica mayor relevancia, utilice una ponderación menor que <strong>1</strong>. En caso contrario, utilice una ponderación mayor que <strong>1</strong>.</p>
<p></div></p></li>
<li><p><strong>Agregue los candidatos de todos los segmentos basándose en las puntuaciones ponderadas para finalizar los resultados.</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo de documento</p></th>
<th><p>Puntuación</p></th>
<th><p>Puntuación ponderada</p></th>
<th><p>Clasificación</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>cuerpo</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstracto</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
</table></p></li>
</ol>
<h2 id="Usage-of-Boost-Ranker" class="common-anchor-header">Uso de Boost Ranker<button data-href="#Usage-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>En esta sección, verás ejemplos de cómo utilizar Boost Ranker para influir en los resultados de una búsqueda monovectorial.</p>
<h3 id="Create-a-Boost-Ranker" class="common-anchor-header">Crear un Boost Ranker<button data-href="#Create-a-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Antes de pasar un Boost Ranker como reranker de una petición de búsqueda, debes definir correctamente el Boost Ranker como función reranking de la siguiente manera:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: { 
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;id&quot;</span>
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.5</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Obligatorio</p></th>
     <th><p>Descripción</p></th>
     <th><p>Valor/Ejemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Identificador único para esta función</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Lista de campos vectoriales a los que aplicar la función (debe estar vacía para RRF Ranker)</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Tipo de función a invocar; utilice <code translate="no">RERANK</code> para especificar una estrategia de reordenación</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica el tipo de reranker.</p><p>Debe establecerse en <code translate="no">boost</code> para utilizar Boost Ranker.</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica la ponderación que se multiplicará por las puntuaciones de las entidades coincidentes en los resultados de búsqueda sin procesar.</p><p>El valor debe ser un número de coma flotante. </p><ul><li><p>Para resaltar la importancia de las entidades coincidentes, establezca un valor que aumente las puntuaciones.</p></li><li><p>Para degradar las entidades coincidentes, asigne a este parámetro un valor que disminuya sus puntuaciones.</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>No</p></td>
     <td><p>Especifica la expresión de filtro que se utilizará para emparejar entidades entre las entidades de los resultados de búsqueda. Puede ser cualquier expresión de filtro básica válida mencionada en <a href="/docs/es/boolean.md">Explicación del filtrado</a>.</p><p><strong>Nota</strong>: Utilice únicamente operadores básicos, como <code translate="no">==</code>, <code translate="no">&gt;</code> o <code translate="no">&lt;</code>. El uso de operadores avanzados, como <code translate="no">text_match</code> o <code translate="no">phrase_match</code>, degradará el rendimiento de la búsqueda.</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>No</p></td>
     <td><p>Especifica la función aleatoria que genera un valor entre <code translate="no">0</code> y <code translate="no">1</code> de forma aleatoria. Tiene los dos argumentos opcionales siguientes:</p><ul><li><p><code translate="no">seed</code> (número) Especifica un valor inicial utilizado para iniciar un generador de números pseudoaleatorios (PRNG).</p></li><li><p><code translate="no">field</code> (cadena) Especifica el nombre de un campo cuyo valor se utilizará como factor aleatorio en la generación del número aleatorio. Un campo con valores únicos será suficiente.</p><p>Se recomienda definir <code translate="no">seed</code> y <code translate="no">field</code> para garantizar la coherencia entre generaciones utilizando los mismos valores de semilla y campo.</p></li></ul></td>
     <td><p><code translate="no">{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>
<h3 id="Search-with-a-single-Boost-Ranker" class="common-anchor-header">Búsqueda con un único Boost Ranker<button data-href="#Search-with-a-single-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Una vez que la función Boost Ranker está lista, puede hacer referencia a ella en una petición de búsqueda. El siguiente ejemplo asume que ya has creado una colección que tiene los siguientes campos: <strong>id</strong>, <strong>vector</strong> y <strong>doctype</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">Búsqueda con varios Boost Rankers<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>Puede combinar varios Boost Rankers en una única búsqueda para influir en los resultados de la misma. Para ello, cree varios Boost Rankers, haga referencia a ellos en una instancia de <strong>FunctionScore</strong> y utilice la instancia de <strong>FunctionScore</strong> como clasificador en la solicitud de búsqueda.</p>
<p>El siguiente ejemplo muestra cómo modificar las puntuaciones de todas las entidades identificadas aplicando un peso entre <strong>0,8</strong> y <strong>1,2</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType, FunctionScore

<span class="hljs-comment"># Create a Boost Ranker with a fixed weight</span>
fix_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.8</span>
    }
)

<span class="hljs-comment"># Create a Boost Ranker with a randomly generated weight between 0 and 0.4</span>
random_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: {
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.4</span>
    }
)

<span class="hljs-comment"># Create a Function Score</span>
ranker = FunctionScore(
    functions=[
        fix_weight_ranker, 
        random_weight_ranker
    ],
    params: {
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<p>En concreto, hay dos Boost Rankers: uno aplica un peso fijo a todas las entidades encontradas, mientras que el otro les asigna un peso aleatorio. A continuación, referenciamos estos dos rankers en una <strong>FunctionScore</strong>, que también define cómo influyen los pesos en las puntuaciones de las entidades encontradas.</p>
<p>La siguiente tabla enumera los parámetros necesarios para crear una instancia de <strong>FunctionScore</strong>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>¿Necesario?</p></th>
     <th><p>Descripción</p></th>
     <th><p>Valor/Ejemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">functions</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica los nombres de los clasificadores de destino en una lista.</p></td>
     <td><p><code translate="no">["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.boost_mode</code></p></td>
     <td><p>No</p></td>
     <td><p>Especifica cómo influyen las ponderaciones especificadas en las puntuaciones de las entidades coincidentes.</p><p>Los valores posibles son:</p><ul><li><p><code translate="no">Multiple</code></p><p>Indica que el valor ponderado es igual a la puntuación original de una entidad coincidente multiplicada por el peso especificado. </p><p>Este es el valor por defecto.</p></li><li><p><code translate="no">Sum</code></p><p>Indica que el valor ponderado es igual a la suma de la puntuación original de una entidad coincidente y el peso especificado.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>Sin</p></td>
     <td><p>Especifica cómo se procesan los valores ponderados de varios Boost Rankers.</p><p>Los valores posibles son:</p><ul><li><p><code translate="no">Multiplify</code></p><p>Indica que la puntuación final de una entidad coincidente es igual al producto de los valores ponderados de todos los Boost Rankers.</p><p>Este es el valor por defecto.</p></li><li><p><code translate="no">Sum</code></p><p>Indica que la puntuación final de una entidad coincidente es igual a la suma de los valores ponderados de todos los Boost Rankers.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
