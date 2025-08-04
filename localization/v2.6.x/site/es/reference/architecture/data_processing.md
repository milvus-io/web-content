---
id: data_processing.md
summary: Conozca el procedimiento de tratamiento de datos en Milvus.
title: Procesamiento de datos
---
<h1 id="Data-Processing" class="common-anchor-header">Procesamiento de datos<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>Este artículo proporciona una descripción detallada de la implementación de la inserción de datos, la creación de índices y la consulta de datos en Milvus.</p>
<h2 id="Data-insertion" class="common-anchor-header">Inserción de datos<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede elegir cuántos fragmentos utiliza una colección en Milvus: cada fragmento se asigna a un canal virtual<em>(vchannel</em>). Como se ilustra a continuación, Milvus asigna cada <em>vchannel</em> a un canal físico<em>(pchannel</em>), y cada <em>pchannel</em> está vinculado a un Streaming Node específico.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/pvchannel_wal.png" alt="VChannel PChannel and StreamingNode" class="doc-image" id="vchannel-pchannel-and-streamingnode" />
   </span> <span class="img-wrapper"> <span>VChannel PChannel y StreamingNode</span> </span></p>
<p>Tras la verificación de los datos, el proxy dividirá el mensaje escrito en varios paquetes de datos de shards de acuerdo con las reglas de enrutamiento de shards especificadas.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>Canales 1</span> </span></p>
<p>A continuación, los datos escritos de un shard<em>(vchannel</em>) se envían al Streaming Node correspondiente de <em>pchannel</em>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" />
   </span> <span class="img-wrapper"> <span>flujo de escritura</span> </span></p>
<p>El Nodo de Streaming asigna un Timestamp Oracle (TSO) a cada paquete de datos para establecer un orden total de las operaciones. Realiza comprobaciones de coherencia en la carga útil antes de escribirla en el registro de escritura anticipada (WAL) subyacente. Una vez que los datos se consignan de forma duradera en el WAL, se garantiza que no se pierdan: incluso en caso de fallo, el nodo de transmisión puede reproducir el WAL para recuperar todas las operaciones pendientes.</p>
<p>Mientras tanto, el StreamingNode también trocea asíncronamente las entradas de la WAL en segmentos discretos. Hay dos tipos de segmentos:</p>
<ul>
<li><strong>Segmento creciente</strong>: cualquier dato que no haya sido prescrito en el almacenamiento de objetos.</li>
<li>Segmento<strong>sellado</strong>: todos los datos han sido persistidos en el almacenamiento de objetos, los datos del segmento sellado son inmutables.</li>
</ul>
<p>La transición de un segmento creciente a un segmento sellado se denomina descarga. El Nodo de Flujo desencadena un vaciado tan pronto como ha ingestado y escrito todas las entradas WAL disponibles para ese segmento -es decir, cuando no hay más registros pendientes en el registro de escritura anticipada subyacente-, momento en el que el segmento se finaliza y se optimiza para la lectura.</p>
<h2 id="Index-building" class="common-anchor-header">Creación de índices<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>La creación de índices se realiza en el nodo de datos. Para evitar la creación frecuente de índices para las actualizaciones de datos, una colección en Milvus se divide en segmentos, cada uno con su propio índice.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>Creación de índices</span> </span></p>
<p>Milvus soporta la construcción de índices para cada campo vectorial, campo escalar y campo primario. Tanto la entrada como la salida de la creación de índices se relacionan con el almacenamiento de objetos: El nodo de datos carga las instantáneas del registro a indexar desde un segmento (que está en el almacenamiento de objetos) a la memoria, deserializa los datos y metadatos correspondientes para construir el índice, serializa el índice cuando se completa la construcción del índice y lo escribe de nuevo en el almacenamiento de objetos.</p>
<p>La creación de índices implica principalmente operaciones vectoriales y matriciales, por lo que requiere muchos cálculos y memoria. Los vectores no pueden indexarse eficientemente con índices tradicionales basados en árboles debido a su naturaleza altamente dimensional, pero pueden indexarse con técnicas más maduras en este tema, como los índices basados en clusters o grafos. Independientemente de su tipo, la construcción de índices implica cálculos iterativos masivos para vectores a gran escala, como Kmeans o graph traverse.</p>
<p>A diferencia de la indexación de datos escalares, la creación de índices vectoriales debe aprovechar al máximo la aceleración SIMD (instrucción única, datos múltiples). Milvus tiene soporte innato para conjuntos de instrucciones SIMD, por ejemplo, SSE, AVX2 y AVX512. Dado el "hipo" y la naturaleza intensiva en recursos de la creación de índices vectoriales, la elasticidad adquiere una importancia crucial para Milvus en términos económicos. Las futuras versiones de Milvus profundizarán en la computación heterogénea y la computación sin servidor para reducir los costes asociados.</p>
<p>Además, Milvus también admite el filtrado escalar y la consulta de campos primarios. Tiene índices incorporados para mejorar la eficiencia de la consulta, por ejemplo, índices de filtro Bloom, índices hash, índices basados en árboles e índices invertidos, y planea introducir más índices externos, por ejemplo, índices de mapa de bits e índices aproximados.</p>
<h2 id="Data-query" class="common-anchor-header">Consulta de datos<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Por consulta de datos se entiende el proceso de buscar en una colección determinada el número <em>k</em> de vectores más cercanos a un vector objetivo o <em>todos los</em> vectores que se encuentren dentro de un intervalo de distancia especificado con respecto al vector. Los vectores se devuelven junto con su clave primaria y sus campos correspondientes.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>Consulta de datos</span> </span></p>
<p>Una colección en Milvus se divide en múltiples segmentos; el Nodo de Flujo carga segmentos crecientes y mantiene los datos en tiempo real, mientras que los Nodos de Consulta cargan segmentos sellados.</p>
<p>Cuando llega una solicitud de consulta/búsqueda, el proxy transmite la solicitud a todos los nodos de transmisión responsables de los fragmentos relacionados para la búsqueda concurrente.</p>
<p>Cuando llega una petición de consulta, el proxy solicita de forma concurrente a los Streaming Nodes que tienen los shards correspondientes que ejecuten la búsqueda.</p>
<p>Cada Streaming Node genera un plan de consulta, busca en sus datos locales crecientes y contacta simultáneamente con los Query Nodes remotos para recuperar los resultados históricos, luego los agrega en un único resultado de shard.</p>
<p>Por último, el proxy recopila todos los resultados de los fragmentos, los fusiona en el resultado final y lo devuelve al cliente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>Traspaso</span> </span></p>
<p>Cuando el segmento creciente de un nodo de flujo se vuelca en un segmento sellado, o cuando un nodo de datos completa una compactación, el coordinador inicia una operación de transferencia para convertir los datos crecientes en datos históricos. A continuación, el Coordinador distribuye uniformemente los segmentos sellados entre todos los Nodos de Consulta, equilibrando el uso de memoria, la sobrecarga de la CPU y el recuento de segmentos, y libera cualquier segmento redundante.</p>
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Aprenda a <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">utilizar la base de datos vectorial Milvus para realizar consultas en tiempo real</a>.</li>
<li>Aprenda sobre la <a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">inserción y persistencia de datos en Milvus</a>.</li>
<li>Aprenda cómo <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">se procesan los datos en Milvus</a>.</li>
</ul>
