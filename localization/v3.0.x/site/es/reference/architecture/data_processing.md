---
id: data_processing.md
summary: Infórmate sobre el procedimiento de tratamiento de datos en Milvus.
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
    </button></h1><p>Este artículo ofrece una descripción detallada de la implementación de la inserción de datos, la creación de índices y la consulta de datos en Milvus.</p>
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
    </button></h2><p>En Milvus, puedes elegir el número de fragmentos que utiliza una colección; cada fragmento se asigna a un canal virtual (<em>vchannel</em>). Tal y como se ilustra a continuación, Milvus asigna cada <em>vchannel</em> a un canal físico (<em>pchannel</em>), y cada <em>pchannel</em> está vinculado a un nodo de streaming específico.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/pvchannel_wal.png" alt="VChannel, PChannel, and Streaming Node" class="doc-image" id="vchannel,-pchannel,-and-streaming-node" /> 
   <span>VChannel, PChannel y nodo de streaming</span>
  
 </span></p>
<p>Tras la verificación de los datos, el proxy dividirá el mensaje escrito en varios paquetes de datos de fragmentos según las reglas de enrutamiento de fragmentos especificadas.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" /> 
   <span>Canales 1</span>
  
 </span></p>
<p>A continuación, los datos escritos de un fragmento (<em>vchannel</em>) se envían al nodo de streaming correspondiente del <em>pchannel</em>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" /> 
   <span>Flujo de escritura</span>
  
 </span></p>
<p>El nodo de streaming asigna un Timestamp Oracle (TSO) a cada paquete de datos para establecer un orden total de las operaciones. Realiza comprobaciones de consistencia en la carga útil antes de escribirla en el registro de escritura anticipada (WAL) subyacente. Una vez que los datos se han confirmado de forma duradera en el WAL, se garantiza que no se perderán; incluso en caso de fallo del sistema, el nodo de streaming puede reproducir el WAL para recuperar por completo todas las operaciones pendientes.</p>
<p>Mientras tanto, el nodo de streaming también divide de forma asíncrona las entradas del WAL confirmadas en segmentos discretos. Existen dos tipos de segmentos:</p>
<ul>
<li><strong>Segmento en crecimiento</strong>: cualquier dato que no se haya guardado previamente en el almacenamiento de objetos.</li>
<li><strong>Segmento sellado</strong>: todos los datos se han guardado de forma permanente en el almacenamiento de objetos; los datos del segmento sellado son inmutables.</li>
</ul>
<p>La transición de un segmento en crecimiento a un segmento sellado se denomina «flush». El nodo de streaming activa un «flush» tan pronto como ha ingesto y escrito todas las entradas WAL disponibles para ese segmento —es decir, cuando ya no hay registros pendientes en el registro de escritura anticipada subyacente—, momento en el que el segmento se finaliza y se optimiza para la lectura.</p>
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
    </button></h2><p>La creación de índices la lleva a cabo el nodo de datos. Para evitar la creación frecuente de índices debido a las actualizaciones de datos, una colección en Milvus se divide a su vez en segmentos, cada uno con su propio índice.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" /> 
   <span>Creación de índices</span>
  
 </span></p>
<p>Milvus admite la creación de índices para cada campo vectorial, campo escalar y campo primario. Tanto la entrada como la salida de la creación de índices interactúan con el almacenamiento de objetos: el nodo de datos carga en memoria las instantáneas de registro de un segmento (que se encuentra en el almacenamiento de objetos) para indexarlas, deserializa los datos y metadatos correspondientes para crear el índice, serializa el índice una vez finalizada la creación y lo vuelve a escribir en el almacenamiento de objetos.</p>
<p>La creación de índices implica principalmente operaciones con vectores y matrices y, por lo tanto, requiere un uso intensivo de recursos computacionales y de memoria. Los vectores no pueden indexarse de manera eficiente con los índices tradicionales basados en árboles debido a su naturaleza de alta dimensión, pero sí pueden indexarse con técnicas más consolidadas en este ámbito, como los índices basados en clústeres o en grafos. Independientemente de su tipo, la creación de índices implica cálculos iterativos masivos para vectores a gran escala, como K-means o el recorrido de grafos.</p>
<p>A diferencia de la indexación de datos escalares, la creación de índices vectoriales debe aprovechar al máximo la aceleración SIMD (instrucción única, datos múltiples). Milvus es compatible de forma nativa con conjuntos de instrucciones SIMD, como SSE, AVX2 y AVX512. Dado el «tropiezo» y la naturaleza intensiva en recursos de la creación de índices vectoriales, la elasticidad cobra una importancia crucial para Milvus desde el punto de vista económico. Las futuras versiones de Milvus profundizarán en la computación heterogénea y la computación sin servidor para reducir los costes asociados.</p>
<p>Además, Milvus también admite el filtrado escalar y la consulta de campos primarios. Cuenta con índices integrados para mejorar la eficiencia de las consultas, como los índices de filtro de Bloom, los índices hash, los índices basados en árboles y los índices invertidos, y tiene previsto introducir más índices externos, como los índices de mapa de bits y los índices aproximados.</p>
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
    </button></h2><p>La consulta de datos se refiere al proceso de buscar en una colección especificada <em>los k</em> vectores más cercanos a un vector objetivo o <em>todos</em> los vectores que se encuentren dentro de un rango de distancia especificado respecto a dicho vector. Los vectores se devuelven junto con su clave primaria y sus campos correspondientes.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" /> 
   <span>Consulta de datos</span>
  
 </span></p>
<p>Una colección en Milvus se divide en varios segmentos; el nodo de streaming carga los segmentos en crecimiento y mantiene los datos en tiempo real, mientras que los nodos de consulta cargan los segmentos sellados.</p>
<p>Cuando llega una solicitud de consulta o búsqueda, el proxy difunde la solicitud a todos los nodos de streaming responsables de los fragmentos relacionados para realizar una búsqueda simultánea.</p>
<p>Cuando llega una solicitud de consulta, el proxy solicita simultáneamente a los nodos de streaming que contienen los fragmentos correspondientes que ejecuten la búsqueda.</p>
<p>Cada nodo de streaming genera un plan de consulta, busca en sus datos locales en crecimiento y, simultáneamente, se pone en contacto con los nodos de consulta remotos para recuperar resultados históricos; a continuación, los agrega en un único resultado de fragmento.</p>
<p>Por último, el proxy recopila todos los resultados de los fragmentos, los fusiona en el resultado final y lo devuelve al cliente.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" /> 
   <span>Traspaso</span>
  
 </span></p>
<p>Cuando el segmento en crecimiento de un nodo de streaming se vacía en un segmento sellado —o cuando un nodo de datos completa una compactación—, el coordinador inicia una operación de traspaso para convertir esos datos en crecimiento en datos históricos. A continuación, el coordinador distribuye uniformemente los segmentos sellados entre todos los nodos de consulta, equilibrando el uso de memoria, la carga de la CPU y el recuento de segmentos, y libera cualquier segmento redundante.</p>
<h2 id="Whats-next" class="common-anchor-header">Próximos pasos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Descubre cómo <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">utilizar la base de datos vectorial Milvus para consultas en tiempo real</a>.</li>
<li>Descubre cómo <a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">se insertan y se conservan los datos en Milvus</a>.</li>
<li>Descubre cómo <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">se procesan los datos en Milvus</a>.</li>
</ul>
