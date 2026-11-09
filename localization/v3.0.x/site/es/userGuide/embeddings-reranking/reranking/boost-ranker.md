---
id: boost-ranker.md
title: Boost RankerCompatible with Milvus v2.6.2+
summary: >-
  En lugar de basarse únicamente en la similitud semántica calculada a partir de
  distancias vectoriales, Boost Rankers te permite influir en los resultados de
  búsqueda de forma significativa. Es ideal para ajustar rápidamente los
  resultados de búsqueda mediante el filtrado de metadatos.
beta: Milvus v2.6.2+
---
<h1 id="Boost-Ranker" class="common-anchor-header">Boost Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>En lugar de basarse únicamente en la similitud semántica calculada a partir de distancias vectoriales, los Boost Rankers te permiten influir en los resultados de búsqueda de forma significativa. Son ideales para ajustar rápidamente los resultados de búsqueda mediante el filtrado de metadatos.</p>
<p>Cuando una consulta de búsqueda incluye una función «Boost Ranker», Milvus utiliza la condición de filtrado opcional dentro de la función para encontrar coincidencias entre los candidatos a resultados de búsqueda y potencia las puntuaciones de dichas coincidencias aplicando la ponderación especificada, lo que ayuda a promover o rebajar la clasificación de las entidades coincidentes en el resultado final.</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">Cuándo utilizar el «Boost Ranker»<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>A diferencia de otros clasificadores que se basan en modelos de codificadores cruzados o algoritmos de fusión, un «Boost Ranker» inyecta directamente reglas opcionales basadas en metadatos en el proceso de clasificación, lo que lo hace más adecuado en los siguientes escenarios.</p>
<table>
   <tr>
     <th><p>Caso de uso</p></th>
     <th><p>Ejemplos</p></th>
     <th><p>Por qué funciona bien Boost Ranker</p></th>
   </tr>
   <tr>
     <td><p>Priorización de contenidos basada en el negocio</p></td>
     <td><ul><li><p>Destacar productos premium en los resultados de búsqueda del comercio electrónico</p></li><li><p>Aumenta la visibilidad del contenido con altos índices de interacción de los usuarios (como visualizaciones, «me gusta» y comparticiones)</p></li><li><p>Priorizar el contenido reciente en aplicaciones de búsqueda en las que el tiempo es un factor clave</p></li><li><p>Priorización de contenidos procedentes de fuentes verificadas o de confianza</p></li><li><p>Potenciar los resultados que coincidan con frases exactas o palabras clave de alta relevancia</p></li></ul></td>
     <td rowspan="2"><p>Sin necesidad de reconstruir índices ni modificar modelos de incrustación vectorial —operaciones que pueden llevar mucho tiempo—, puedes subir o bajar al instante la posición de elementos específicos en los resultados de búsqueda aplicando filtros de metadatos opcionales en tiempo real. Este mecanismo permite clasificaciones de búsqueda flexibles y dinámicas que se adaptan fácilmente a los requisitos empresariales en constante evolución.</p></td>
   </tr>
   <tr>
     <td><p>Reducción estratégica de la posición del contenido</p></td>
     <td><ul><li><p>Reducir la visibilidad de los elementos con poco stock sin eliminarlos por completo</p></li><li><p>Reducir la posición de los contenidos que contengan términos potencialmente objetables sin recurrir a la censura</p></li><li><p>Rebajar la posición de la documentación más antigua, manteniendo su accesibilidad en las búsquedas técnicas</p></li><li><p>Reducir sutilmente la visibilidad de los productos de la competencia en las búsquedas del mercado</p></li><li><p>Disminuir la relevancia del contenido que presenta indicios de menor calidad (como problemas de formato, menor extensión, etc.)</p></li></ul></td>
   </tr>
</table>
<p>También puedes combinar varios Boost Rankers para implementar una estrategia de clasificación basada en ponderaciones más dinámica y sólida.</p>
<h2 id="Mechanism-of-Boost-Ranker" class="common-anchor-header">Mecanismo de «Boost Ranker»<button data-href="#Mechanism-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente diagrama ilustra el flujo de trabajo principal de los «Boost Rankers».</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" /> 
   <span>Mecanismo de Boost Ranker</span>
  
 </span></p>
<p>Al introducir datos, Milvus los distribuye entre segmentos. Durante una búsqueda, cada segmento devuelve un conjunto de candidatos, y Milvus clasifica estos candidatos de todos los segmentos para generar los resultados finales. Cuando una consulta de búsqueda incluye un «Boost Ranker», Milvus lo aplica a los resultados candidatos de cada segmento para evitar una posible pérdida de precisión y mejorar la recuperación.</p>
<p>Antes de finalizar los resultados, Milvus procesa estos candidatos con el «Boost Ranker» de la siguiente manera:</p>
<ol>
<li><p>Aplica la expresión de filtrado opcional especificada en el «Boost Ranker» para identificar las entidades que coinciden con la expresión.</p></li>
<li><p>Aplica la ponderación especificada en el «Boost Ranker» para aumentar las puntuaciones de las entidades identificadas.</p></li>
</ol>
<div class="alert note">
<p>No se puede utilizar el «Boost Ranker» como clasificador en una búsqueda híbrida multivectorial. Sin embargo, sí se puede utilizar como clasificador en cualquiera de sus subconsultas (<code translate="no">AnnSearchRequest</code>).</p>
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
    </button></h2><p>El siguiente ejemplo ilustra el uso de un Boost Ranker en una búsqueda de un solo vector que requiere devolver las cinco entidades más relevantes y añadir ponderaciones a las puntuaciones de las entidades con el tipo de documento «abstract».</p>
<ol>
<li><p><strong>Recopilar los candidatos a resultados de búsqueda en segmentos.</strong></p>
<p>La siguiente tabla parte de la base de que Milvus distribuye las entidades en dos segmentos (<strong>0001</strong> y <strong>0002</strong>), y que cada segmento devuelve cinco candidatos.</p>
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
<td><p>resumen</p></td>
<td><p>0,344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>resumen</p></td>
<td><p>0,456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>cuerpo</p></td>
<td><p>0,578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>título</p></td>
<td><p>0,788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>cuerpo</p></td>
<td><p>0,899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>cuerpo</p></td>
<td><p>0,189</p></td>
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
<td><p>resumen</p></td>
<td><p>0,366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>resumen</p></td>
<td><p>0,444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>resumen</p></td>
<td><p>0,845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>Aplica la expresión de filtrado especificada en Boost Ranker</strong> (<code translate="no">doctype='abstract'</code>).</p>
<p>Tal y como indica el campo « <code translate="no">DocType</code> » de la siguiente tabla, Milvus marcará todas las entidades cuyo valor « <code translate="no">doctype</code> » esté establecido en « <code translate="no">abstract</code> » para su posterior procesamiento.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo de documento</p></th>
<th><p>Puntuación</p></th>
<th><p>Rango</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>cuerpo</p></td>
<td><p>0,578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>título</p></td>
<td><p>0,788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>cuerpo</p></td>
<td><p>0,899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>cuerpo</p></td>
<td><p>0,189</p></td>
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
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>Aplicar la ponderación especificada en el Boost Ranker</strong> (<code translate="no">weight=0.5</code>).</p>
<p>Todas las entidades identificadas en el paso anterior se multiplicarán por la ponderación especificada en el Boost Ranker, lo que dará lugar a cambios en sus posiciones.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo de documento</p></th>
<th><p>Puntuación</p></th>
<th><p>Puntuación ponderada </p><p>(= puntuación × ponderación)</p></th>
<th><p>Puesto</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,344</strong></p></td>
<td><p><strong>0,172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,456</strong></p></td>
<td><p><strong>0,228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>cuerpo</p></td>
<td><p>0,578</p></td>
<td><p>0,578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>título</p></td>
<td><p>0,788</p></td>
<td><p>0,788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>cuerpo</p></td>
<td><p>0,899</p></td>
<td><p>0,899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,366</strong></p></td>
<td><p><strong>0,183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>cuerpo</p></td>
<td><p>0,189</p></td>
<td><p>0,189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,444</strong></p></td>
<td><p><strong>0,222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>cuerpo</p></td>
<td><p>0,265</p></td>
<td><p>0,265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,845</strong></p></td>
<td><p><strong>0,423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0,0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>La ponderación debe ser un número de coma flotante que elijas. En casos como el del ejemplo anterior, en los que una puntuación más baja indica mayor relevancia, utiliza una ponderación inferior a <strong>1</strong>. En caso contrario, utiliza una ponderación superior a <strong>1</strong>.</p>
<p></div></p></li>
<li><p><strong>Agrupa a los candidatos de todos los segmentos en función de las puntuaciones ponderadas para obtener los resultados definitivos.</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Tipo de documento</p></th>
<th><p>Puntuación</p></th>
<th><p>Puntuación ponderada</p></th>
<th><p>Puesto</p></th>
<th><p>segmento</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,344</strong></p></td>
<td><p><strong>0,172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,366</strong></p></td>
<td><p><strong>0,183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>cuerpo</p></td>
<td><p>0,189</p></td>
<td><p>0,189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,444</strong></p></td>
<td><p><strong>0,222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>resumen</strong></p></td>
<td><p><strong>0,456</strong></p></td>
<td><p><strong>0,228</strong></p></td>
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
    </button></h2><p>En esta sección, verás ejemplos de cómo utilizar Boost Ranker para influir en los resultados de una búsqueda de un solo vector.</p>
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
    </button></h3><p>Antes de pasar un Boost Ranker como reordenador de una solicitud de búsqueda, debes definir correctamente el Boost Ranker como función de reordenación de la siguiente manera:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

rerank = Function(
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BoostRanker;

<span class="hljs-type">BoostRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> BoostRanker.builder()
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .filter(<span class="hljs-string">&quot;doctype == \&quot;abstract\&quot;&quot;</span>)
        .weight(<span class="hljs-number">0.5f</span>)
        .randomScoreField(<span class="hljs-string">&quot;id&quot;</span>)
        .randomScoreSeed(<span class="hljs-number">126L</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>).
    WithParam(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126, \&quot;field\&quot;: \&quot;id\&quot;}&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.5&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126, \&quot;field\&quot;: \&quot;id\&quot;}&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.5&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFilter</span>(<span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.5</span>);
<span class="hljs-comment">// Note: SetRandomScoreField()/SetRandomScoreSeed() are not usable as of</span>
<span class="hljs-comment">// milvus-sdk-cpp v3.0.3 - the SDK sends the seed as a string, which the</span>
<span class="hljs-comment">// server rejects (a numeric seed is required).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
      <span class="hljs-attr">field</span>: <span class="hljs-string">&quot;id&quot;</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.5</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> RANKER=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;boost&quot;,
    &quot;type&quot;: &quot;Rerank&quot;,
    &quot;inputFieldNames&quot;: [],
    &quot;outputFieldNames&quot;: [],
    &quot;params&quot;: {
        &quot;reranker&quot;: &quot;boost&quot;,
        &quot;filter&quot;: &quot;doctype == &#x27;</span>\&#x27;<span class="hljs-string">&#x27;abstract&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
        &quot;random_score&quot;: {&quot;seed&quot;: 126, &quot;field&quot;: &quot;id&quot;},
        &quot;weight&quot;: 0.5
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>¿Es</p></th>
     <th><p>¿Obligatorio?</p></th>
     <th><p>Descripción</p></th>
     <th><p>Valor/Ejemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Identificador único de esta función</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Lista de campos vectoriales a los que aplicar la función (debe estar vacía para Boost Ranker)</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sí</p></td>
     <td><p>El tipo de función que se va a invocar; utiliza « <code translate="no">RERANK</code> » para especificar una estrategia de reordenación</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica el tipo del reordenador.</p><p>Debe establecerse en « <code translate="no">boost</code> » para utilizar Boost Ranker.</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica la ponderación que se multiplicará por las puntuaciones de cualquier entidad coincidente en los resultados de búsqueda sin procesar.</p><p>El valor debe ser un número de coma flotante. </p><ul><li><p>Para destacar la importancia de las entidades coincidentes, establécelo en un valor que aumente las puntuaciones.</p></li><li><p>Para restar importancia a las entidades coincidentes, asigne a este parámetro un valor que reduzca sus puntuaciones.</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>No</p></td>
     <td><p>Especifica la expresión de filtro que se utilizará para buscar entidades coincidentes entre los resultados de la búsqueda. Puede ser cualquier expresión de filtro básica válida mencionada en <a href="/docs/es/boolean.md">«Explicación del filtrado</a>».</p><p><strong>Nota</strong>: Utilice únicamente operadores básicos, como <code translate="no">==</code>, <code translate="no">&gt;</code> o <code translate="no">&lt;</code>. El uso de operadores avanzados, como <code translate="no">text_match</code> o <code translate="no">phrase_match</code>, reducirá el rendimiento de la búsqueda.</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>No</p></td>
     <td><p>Especifica la función aleatoria que genera aleatoriamente un valor comprendido entre <code translate="no">0</code> y <code translate="no">1</code>. Tiene los dos argumentos opcionales siguientes:</p><ul><li><p><code translate="no">seed</code> (número) Especifica un valor inicial que se utiliza para poner en marcha un generador de números pseudoaleatorios (PRNG).</p></li><li><p><code translate="no">field</code> (cadena) Especifica el nombre de un campo cuyo valor se utilizará como factor aleatorio en la generación del número aleatorio. Bastará con un campo con valores únicos.</p><p>Se recomienda establecer tanto <code translate="no">seed</code> como <code translate="no">field</code> para garantizar la coherencia entre generaciones mediante el uso de los mismos valores de semilla y de campo.</p></li></ul></td>
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
    </button></h3><p>Una vez que la función Boost Ranker esté lista, puedes hacer referencia a ella en una solicitud de búsqueda. El siguiente ejemplo da por hecho que ya has creado una colección que tiene los siguientes campos: <strong>id</strong>, <strong>vector</strong> y <strong>doctype</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_fields=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=rerank
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954f</span>, <span class="hljs-number">0.447943f</span>, -<span class="hljs-number">0.174938f</span>, -<span class="hljs-number">0.424803f</span>, -<span class="hljs-number">0.864845f</span>})))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
        .topK(<span class="hljs-number">10</span>)
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

resultSet, err := client.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{
    entity.FloatVector{<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>},
}).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doctype&quot;</span>).
    WithFunctionScore(entity.NewFunctionScore().AddFunction(rerank)))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(resultSet)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>)).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doctype&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">rerank</span>(FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank.<span class="hljs-title function_ invoke__">clone</span>()))
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doctype&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-comment">// Connect to the Milvus server</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>
});

<span class="hljs-comment">// Assume you have a collection set up</span>

<span class="hljs-comment">// Conduct a similarity search</span>
<span class="hljs-keyword">const</span> searchResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
  <span class="hljs-attr">data</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;doctype&#x27;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: rerank,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Search results:&#x27;</span>, searchResults);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;doctype&quot;],
    &quot;functionScore&quot;: {
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;filter&quot;: &quot;doctype == &#x27;</span>\&#x27;<span class="hljs-string">&#x27;abstract&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
                    &quot;random_score&quot;: {&quot;seed&quot;: 126, &quot;field&quot;: &quot;id&quot;},
                    &quot;weight&quot;: 0.5
                }
            }
        ]
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">Búsqueda con varios «Boost Rankers»<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>Puede combinar varios «Boost Rankers» en una misma búsqueda para influir en los resultados. Para ello, cree varios «Boost Rankers», haga referencia a ellos en una instancia <strong>de FunctionScore</strong> y utilice <strong>dicha</strong> instancia como clasificador en la solicitud de búsqueda.</p>
<p>El siguiente ejemplo muestra cómo modificar las puntuaciones de todas las entidades identificadas aplicando una ponderación entre <strong>0,8</strong> y <strong>1,2</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
    params={
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_fields=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">fixWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.RERANK)
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>)
        .build();

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">randomWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.RERANK)
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>)
        .param(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>)
        .build();

Map&lt;String, String&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;boost_mode&quot;</span>, <span class="hljs-string">&quot;Multiply&quot;</span>);
params.put(<span class="hljs-string">&quot;function_mode&quot;</span>, <span class="hljs-string">&quot;Sum&quot;</span>);

<span class="hljs-type">FunctionScore</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> FunctionScore.builder()
        .addFunction(fixWeightRanker)
        .addFunction(randomWeightRanker)
        .params(params)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954382375778f</span>, <span class="hljs-number">0.4479436794798608f</span>, -<span class="hljs-number">0.17493894838751745f</span>, -<span class="hljs-number">0.4248030059917294f</span>, -<span class="hljs-number">0.8648452746018911f</span>})))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
        .topK(<span class="hljs-number">10</span>)
        .functionScore(ranker)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

fixWeightRanker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>)

randomWeightRanker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>)

ranker := entity.NewFunctionScore().
    AddFunction(fixWeightRanker).
    AddFunction(randomWeightRanker).
    WithParam(<span class="hljs-string">&quot;boost_mode&quot;</span>, <span class="hljs-string">&quot;Multiply&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function_mode&quot;</span>, <span class="hljs-string">&quot;Sum&quot;</span>)

resultSet, err := client.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{entity.FloatVector{<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>}}).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doctype&quot;</span>).
    WithFunctionScore(ranker))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(resultSet)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>)).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">fix_weight_ranker</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">random_weight_ranker</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_function</span>(fix_weight_ranker)
    .<span class="hljs-title function_ invoke__">add_function</span>(random_weight_ranker)
    .<span class="hljs-title function_ invoke__">params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
        (<span class="hljs-string">&quot;boost_mode&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;Multiply&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;function_mode&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;Sum&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
    ]));

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doctype&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-keyword">auto</span> fix_weight_ranker = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
fix_weight_ranker-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.8</span>);

<span class="hljs-keyword">auto</span> random_weight_ranker = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
random_weight_ranker-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.4</span>);
<span class="hljs-comment">// Note: SetRandomScoreSeed() is not usable as of milvus-sdk-cpp v3.0.3 —</span>
<span class="hljs-comment">// the SDK sends the seed as a string, which the server rejects.</span>

<span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(fix_weight_ranker);
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(random_weight_ranker);

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doctype&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> fix_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.8</span>,
  },
};

<span class="hljs-keyword">const</span> random_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.4</span>,
  },
};

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">functions</span>: [fix_weight_ranker, random_weight_ranker],
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">boost_mode</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
    <span class="hljs-attr">function_mode</span>: <span class="hljs-string">&quot;Sum&quot;</span>,
  },
};

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doctype&quot;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: ranker
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;doctype&quot;],
    &quot;functionScore&quot;: {
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;weight&quot;: 0.8
                }
            },
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;random_score&quot;: {&quot;seed&quot;: 126},
                    &quot;weight&quot;: 0.4
                }
            }
        ],
        &quot;params&quot;: {
            &quot;boost_mode&quot;: &quot;Multiply&quot;,
            &quot;function_mode&quot;: &quot;Sum&quot;
        }
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Concretamente, hay dos «Boost Rankers»: uno aplica una ponderación fija a todas las entidades encontradas, mientras que el otro les asigna una ponderación aleatoria. A continuación, hacemos referencia a estos dos «rankers» en un <strong>«FunctionScore»</strong>, que también define cómo influyen las ponderaciones en las puntuaciones de las entidades encontradas.</p>
<p>La siguiente tabla enumera los parámetros necesarios para crear una instancia <strong>de FunctionScore</strong>.</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>¿Es obligatorio?</p></th>
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
     <td><p>Especifica cómo influyen las ponderaciones indicadas en las puntuaciones de las entidades coincidentes.</p><p>Los valores posibles son:</p><ul><li><p><code translate="no">Multiply</code></p><p>Indica que el valor ponderado es igual a la puntuación original de una entidad coincidente multiplicada por la ponderación especificada. </p><p>Este es el valor por defecto.</p></li><li><p><code translate="no">Sum</code></p><p>Indica que el valor ponderado es igual a la suma de la puntuación original de una entidad coincidente y la ponderación especificada</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>No</p></td>
     <td><p>Especifica cómo se procesan los valores ponderados de los distintos «Boost Rankers».</p><p>Los valores posibles son:</p><ul><li><p><code translate="no">Multiply</code></p><p>Indica que la puntuación final de una entidad coincidente es igual al producto de los valores ponderados de todos los «Boost Rankers».</p><p>Este es el valor por defecto.</p></li><li><p><code translate="no">Sum</code></p><p>Indica que la puntuación final de una entidad coincidente es igual a la suma de los valores ponderados de todos los «Boost Rankers».</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
