---
id: data_processing.md
summary: Conozca el procedimiento de tratamiento de datos en Milvus.
title: Tratamiento de datos
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
    </button></h2><p>Puede especificar un número de fragmentos para cada colección en Milvus, cada fragmento corresponde a un canal virtual<em>(vchannel</em>). Como muestra la siguiente figura, Milvus asigna a cada vchannel del log broker un canal físico<em>(pchannel</em>). Cualquier solicitud entrante de inserción/eliminación se dirige a los fragmentos basándose en el valor hash de la clave primaria.</p>
<p>La validación de las solicitudes DML se traslada al proxy porque Milvus no tiene transacciones complicadas. El proxy solicitaría una marca de tiempo para cada solicitud de inserción/borrado a TSO (Timestamp Oracle), que es el módulo de tiempo que se coloca con el coordinador raíz. Las marcas de tiempo se utilizan para determinar la secuencia de las solicitudes de datos que se procesan, ya que la marca de tiempo más antigua se sobrescribe con la más reciente. El proxy recupera la información por lotes desde el coordinador de datos, incluidos los segmentos de las entidades y las claves primarias, para aumentar el rendimiento global y evitar sobrecargar el nodo central.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/channels_1.jpg" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>Canales 1</span> </span></p>
<p>Tanto las operaciones DML (lenguaje de manipulación de datos) como las operaciones DDL (lenguaje de definición de datos) se escriben en la secuencia de registro, pero a las operaciones DDL sólo se les asigna un canal debido a su baja frecuencia de aparición.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/channels_2.jpg" alt="Channels 2" class="doc-image" id="channels-2" />
   </span> <span class="img-wrapper"> <span>Canales 2</span> </span></p>
<p><em>Los vcanales</em> se mantienen en los nodos del corredor de registro subyacente. Cada canal es físicamente indivisible y está disponible para cualquier nodo, pero sólo para uno. Cuando la tasa de ingestión de datos alcanza el cuello de botella, hay que tener en cuenta dos cosas: Si el nodo log broker está sobrecargado y necesita ser escalado, y si hay suficientes shards para asegurar el balance de carga para cada nodo.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/write_log_sequence.jpg" alt="Write log sequence" class="doc-image" id="write-log-sequence" />
   </span> <span class="img-wrapper"> <span>Secuencia de escritura de registros</span> </span></p>
<p>El diagrama anterior resume los cuatro componentes que intervienen en el proceso de escritura de la secuencia de registros: proxy, corredor de registros, nodo de datos y almacenamiento de objetos. El proceso implica cuatro tareas: validación de las solicitudes DML, publicación-suscripción de la secuencia de registro, conversión de registro de flujo a instantáneas de registro y persistencia de las instantáneas de registro. Las cuatro tareas están desacopladas entre sí para garantizar que cada una de ellas sea gestionada por su tipo de nodo correspondiente. Los nodos del mismo tipo son iguales y pueden escalarse de forma elástica e independiente para acomodar distintas cargas de datos, en particular datos de flujo masivo y muy fluctuantes.</p>
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
    </button></h2><p>La creación de índices la realiza el nodo de índices. Para evitar la creación frecuente de índices para las actualizaciones de datos, una colección en Milvus se divide en segmentos, cada uno con su propio índice.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/index_building.jpg" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>Creación de índices</span> </span></p>
<p>Milvus permite crear índices para cada campo vectorial, campo escalar y campo primario. Tanto la entrada como la salida de la creación de índices se relacionan con el almacenamiento de objetos: El nodo de índice carga las instantáneas de registro a indexar desde un segmento (que está en el almacenamiento de objetos) a la memoria, deserializa los datos y metadatos correspondientes para construir el índice, serializa el índice cuando se completa la construcción del índice y lo vuelve a escribir en el almacenamiento de objetos.</p>
<p>La creación de índices implica principalmente operaciones vectoriales y matriciales, por lo que requiere muchos cálculos y memoria. Los vectores no pueden indexarse eficientemente con los índices tradicionales basados en árboles debido a su naturaleza altamente dimensional, pero pueden indexarse con técnicas más maduras en este tema, como los índices basados en clusters o grafos. Independientemente de su tipo, la construcción de índices implica cálculos iterativos masivos para vectores a gran escala, como Kmeans o graph traverse.</p>
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
    </button></h2><p>Por consulta de datos se entiende el proceso de buscar en una colección determinada <em>el</em> número <em>k</em> de vectores más cercanos a un vector objetivo o <em>todos los</em> vectores que se encuentren dentro de un intervalo de distancia especificado con respecto al vector. Los vectores se devuelven junto con su clave primaria y sus campos correspondientes.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>Consulta de datos</span> </span></p>
<p>Una colección en Milvus se divide en múltiples segmentos, y los nodos de consulta cargan índices por segmento. Cuando llega una solicitud de búsqueda, se transmite a todos los nodos de consulta para realizar una búsqueda simultánea. A continuación, cada nodo poda los segmentos locales, busca los vectores que cumplen los criterios y reduce y devuelve los resultados de la búsqueda.</p>
<p>Los nodos de consulta son independientes entre sí en una consulta de datos. Cada nodo es responsable únicamente de dos tareas: Cargar o liberar segmentos siguiendo las instrucciones de la coordenada de consulta; realizar una búsqueda dentro de los segmentos locales. Y el proxy es responsable de reducir los resultados de búsqueda de cada nodo de consulta y devolver los resultados finales al cliente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/handoff.jpg" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>Traspaso</span> </span></p>
<p>Existen dos tipos de segmentos: segmentos crecientes (para datos incrementales) y segmentos sellados (para datos históricos). Los nodos de consulta se suscriben a vchannel para recibir actualizaciones recientes (datos incrementales) como segmentos crecientes. Cuando un segmento creciente alcanza un umbral predefinido, el coordinador de datos lo sella y comienza la construcción del índice. A continuación, una operación de <em>transferencia</em> iniciada por el coordinador de consultas convierte los datos incrementales en datos históricos. El coordinador de consultas distribuirá los segmentos sellados de forma uniforme entre todos los nodos de consulta en función del uso de memoria, la sobrecarga de la CPU y el número de segmentos.</p>
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
<li>Aprenda a <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">utilizar la base de datos vectorial Milvus para realizar consultas en tiempo real</a>.</li>
<li>Conozca la <a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">inserción y persistencia de datos en Milvus</a>.</li>
<li>Aprenda cómo <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">se procesan los datos en Milvus</a>.</li>
</ul>
