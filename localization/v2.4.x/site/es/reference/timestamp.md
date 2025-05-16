---
id: timestamp.md
title: Marca de tiempo en Milvus
summary: >-
  Conozca el concepto de marca de tiempo y los cuatro parámetros principales
  relacionados con la marca de tiempo en la base de datos vectorial Milvus.
---
<h1 id="Timestamp" class="common-anchor-header">Sello de tiempo<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema explica el concepto de marca de tiempo e introduce los cuatro parámetros principales relacionados con la marca de tiempo en la base de datos vectorial Milvus.</p>
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
    </button></h2><p>Milvus es una base de datos vectorial que puede buscar y consultar vectores convertidos a partir de datos no estructurados. Al realizar una operación de lenguaje de manipulación de datos (DML), incluidas la <a href="https://milvus.io/docs/v2.1.x/data_processing.md">inserción y la eliminación de datos</a>, Milvus asigna marcas de tiempo a las entidades implicadas en la operación. Por lo tanto, todas las entidades en Milvus tienen un atributo de marca de tiempo. Y los lotes de entidades en la misma operación DML comparten el mismo valor de marca de tiempo.</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">Parámetros de marca de tiempo<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Varios parámetros relacionados con la marca de tiempo intervienen cuando se realiza una búsqueda o consulta de similitud vectorial en Milvus.</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> es un tipo de marca de tiempo que se utiliza para garantizar que todas las actualizaciones de datos realizadas por operaciones DML antes de <code translate="no">Guarantee_timestamp</code> sean visibles cuando se realiza una búsqueda o consulta de similitud vectorial. Por ejemplo, si ha insertado un lote de datos a las 15:00 horas, otro lote a las 17:00 horas, y el valor de <code translate="no">Guarantee_timestamp</code> se establece como 18:00 horas durante una búsqueda de similitud de vectores. Esto significa que los dos lotes de datos insertados a las 15:00 y a las 17:00, respectivamente, deben participar en la búsqueda.</p>
<p>Si no se configura <code translate="no">Guarantee_timestamp</code>, Milvus toma automáticamente el momento en que se realiza la solicitud de búsqueda. Por lo tanto, la búsqueda se realiza en una vista de datos con todas las actualizaciones de datos mediante operaciones DML antes de la búsqueda.</p>
<p>Para ahorrarle la molestia de entender el <a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSO</a> dentro de Milvus, como usuario, no tiene que configurar directamente el parámetro <code translate="no">Guarantee_timestamp</code>. Sólo tiene que elegir el <a href="https://milvus.io/docs/v2.1.x/consistency.md">nivel de consistencia</a> y Milvus gestionará automáticamente el parámetro <code translate="no">Guarantee_timestamp</code> por usted. Cada nivel de consistencia corresponde a un determinado valor de <code translate="no">Guarantee_timestamp</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
   </span> <span class="img-wrapper"> <span>Guarantee_Timestamp</span>. </span></p>
<h4 id="Example" class="common-anchor-header">Ejemplo</h4><p>Como se muestra en la ilustración anterior, el valor de <code translate="no">Guarantee_timestamp</code> se establece como <code translate="no">2021-08-26T18:15:00</code> (para simplificar, la marca de tiempo en este ejemplo está representada por el tiempo físico). Al realizar una búsqueda o consulta, se buscan o consultan todos los datos anteriores a 2021-08-26T18:15:00.</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> es un tipo de marca de tiempo generada y gestionada automáticamente por los nodos de consulta en Milvus. Se utiliza para indicar qué operaciones DML ejecutan los nodos de consulta.</p>
<p>Los datos gestionados por los nodos de consulta pueden clasificarse en dos tipos:</p>
<ul>
<li><p>Datos históricos (o también llamados datos por lotes)</p></li>
<li><p>Datos incrementales (o también llamados datos de flujo).</p></li>
</ul>
<p>En Milvus, es necesario cargar los datos antes de realizar una búsqueda o consulta. Por lo tanto, los datos por lotes de una colección son cargados por el nodo de consulta antes de que se realice una solicitud de búsqueda o consulta. Sin embargo, los datos de flujo se insertan o eliminan de Milvus sobre la marcha, lo que requiere que el nodo de consulta mantenga una línea de tiempo de las operaciones DML y las solicitudes de búsqueda o consulta. Como resultado, los nodos de consulta utilizan <code translate="no">Service_timestamp</code> para mantener dicha línea de tiempo. <code translate="no">Service_timestamp</code> puede verse como el punto de tiempo en el que ciertos datos son visibles, ya que los nodos de consulta pueden asegurarse de que todas las operaciones DML anteriores a <code translate="no">Service_timestamp</code> se han completado.</p>
<p>Cuando se recibe una solicitud de búsqueda o consulta, un nodo de consulta compara los valores de <code translate="no">Service_timestamp</code> y <code translate="no">Guarantee_timestamp</code>. Existen principalmente dos escenarios.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
   </span> <span class="img-wrapper"> <span>Service_Timestamp</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Escenario 1: <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Como se muestra en la figura 1, el valor de <code translate="no">Guarantee_timestamp</code> se establece como <code translate="no">2021-08-26T18:15:00</code>. Cuando el valor de <code translate="no">Service_timestamp</code> crece hasta <code translate="no">2021-08-26T18:15:01</code>, esto significa que todas las operaciones DML anteriores a este momento son ejecutadas y completadas por el nodo de consulta, incluyendo aquellas operaciones DML anteriores al momento indicado por <code translate="no">Guarantee_timestamp</code>. Como resultado, la petición de búsqueda o consulta puede ejecutarse inmediatamente.</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Escenario 2: <code translate="no">Service_timestamp</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Como se muestra en la figura 2, el valor de <code translate="no">Guarantee_timestamp</code> se establece como <code translate="no">2021-08-26T18:15:00</code>, y el valor actual de <code translate="no">Service_timestamp</code> es sólo <code translate="no">2021-08-26T18:14:55</code>. Esto significa que sólo las operaciones DML anteriores a <code translate="no">2021-08-26T18:14:55</code> se ejecutan y completan, dejando parte de las operaciones DML posteriores a este punto temporal pero anteriores a <code translate="no">Guarantee_timestamp</code> sin finalizar. Si la búsqueda o consulta se ejecuta en este punto, algunos de los datos requeridos son invisibles y no están disponibles todavía, afectando seriamente a la precisión de los resultados de la búsqueda o consulta. Por lo tanto, el nodo de consulta debe posponer la solicitud de búsqueda o consulta hasta que se completen las operaciones DML anteriores a <code translate="no">guarantee_timestamp</code> (es decir, cuando <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>Técnicamente hablando, <code translate="no">Graceful_time</code> no es una marca de tiempo, sino más bien un período de tiempo (por ejemplo, 100 ms). Sin embargo, merece la pena mencionar <code translate="no">Graceful_time</code> porque está estrechamente relacionado con <code translate="no">Guarantee_timestamp</code> y <code translate="no">Service_timestamp</code>. <code translate="no">Graceful_time</code> es un parámetro configurable en el archivo de configuración de Milvus. Se utiliza para indicar el periodo de tiempo que se puede tolerar antes de que ciertos datos se hagan visibles. En resumen, se pueden tolerar operaciones DML no completadas durante <code translate="no">Graceful_time</code>.</p>
<p>Cuando hay una solicitud de búsqueda o consulta entrante, puede haber dos escenarios.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
   </span> <span class="img-wrapper"> <span>Graceful_Time</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Escenario 1: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Como se muestra en la figura 1, el valor de <code translate="no">Guarantee_timestamp</code> se establece como <code translate="no">2021-08-26T18:15:01</code>, y <code translate="no">Graceful_time</code> como <code translate="no">2s</code>. El valor de <code translate="no">Service_timestamp</code> se amplía a <code translate="no">2021-08-26T18:15:00</code>. Aunque el valor de <code translate="no">Service_timestamp</code> sigue siendo menor que el de <code translate="no">Guarantee_timestamp</code> y no se completan todas las operaciones DML antes de <code translate="no">2021-08-26T18:15:01</code>, se tolera un periodo de 2 segundos de invisibilidad de datos, como indica el valor de <code translate="no">Graceful_time</code>. Por lo tanto, la solicitud de búsqueda o consulta entrante puede ejecutarse inmediatamente.</p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Escenario 2: <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Como se muestra en la figura 2 , el valor de <code translate="no">Guarantee_timestamp</code> se establece como <code translate="no">2021-08-26T18:15:01</code>, y <code translate="no">Graceful_time</code> como <code translate="no">2s</code>. El valor actual de <code translate="no">Service_timestamp</code> es sólo <code translate="no">2021-08-26T18:14:54</code>. Esto significa que las operaciones DML esperadas aún no se han completado e incluso teniendo en cuenta los 2 segundos de tiempo de gracia, la invisibilidad de los datos sigue siendo intolerable. Por lo tanto, el nodo de consulta debe aplazar la solicitud de búsqueda o consulta hasta que se completen determinadas solicitudes DML (es decir, cuando <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
<h2 id="Whats-next" class="common-anchor-header">A continuación<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Aprenda cómo <a href="/docs/es/v2.4.x/consistency.md">la marca de tiempo de garantía permite la consistencia ajustable en Milvus</a></li>
</ul>
