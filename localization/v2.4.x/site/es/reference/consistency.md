---
id: consistency.md
summary: Conozca los cuatro niveles de coherencia de Milvus.
title: Coherencia
---
<h1 id="Consistency" class="common-anchor-header">Consistencia<button data-href="#Consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema presenta los cuatro niveles de consistencia en Milvus y sus escenarios más adecuados. El mecanismo que garantiza la coherencia en Milvus también se trata en este tema.</p>
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
    </button></h2><p>La consistencia en una base de datos distribuida se refiere específicamente a la propiedad que asegura que cada nodo o réplica tiene la misma vista de los datos cuando escribe o lee datos en un momento dado.</p>
<p>Milvus soporta cuatro niveles de consistencia: fuerte, estancamiento limitado, sesión y eventual. El nivel de consistencia por defecto en Milvus es de caducidad limitada.  Puede ajustar fácilmente el nivel de consistencia cuando realice una <a href="/docs/es/v2.4.x/single-vector-search.md">búsqueda monovectorial</a>, una <a href="/docs/es/v2.4.x/multi-vector-search.md">búsqueda híbrida</a> o una <a href="/docs/es/v2.4.x/get-and-scalar-query.md">consulta</a> para que se adapte mejor a su aplicación.</p>
<h2 id="Consistency-levels" class="common-anchor-header">Niveles de consistencia<button data-href="#Consistency-levels" class="anchor-icon" translate="no">
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
    </button></h2><p>Tal y como se define en el teorema <a href="https://en.wikipedia.org/wiki/PACELC_theorem">PACELC</a>, una base de datos distribuida debe establecer un equilibrio entre consistencia, disponibilidad y latencia. Una alta consistencia implica una gran precisión, pero también una alta latencia de búsqueda, mientras que una baja consistencia conlleva una rápida velocidad de búsqueda, pero una cierta pérdida de visibilidad de los datos. Por tanto, distintos niveles de coherencia se adaptan a distintos escenarios.</p>
<p>A continuación se explican las diferencias entre los cuatro niveles de consistencia soportados por Milvus y los escenarios a los que se adaptan.</p>
<h3 id="Strong" class="common-anchor-header">Fuerte</h3><p>Fuerte es el nivel más alto y estricto de consistencia. Garantiza que los usuarios puedan leer la última versión de los datos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Strong.png" alt="Strong consistency" class="doc-image" id="strong-consistency" />
   </span> <span class="img-wrapper"> <span>Consistencia fuerte</span> </span></p>
<p>Según el teorema PACELC, si el nivel de consistencia se establece en fuerte, la latencia aumentará. Por lo tanto, recomendamos elegir una consistencia fuerte durante las pruebas funcionales para garantizar la precisión de los resultados de las pruebas. La consistencia fuerte también es la más adecuada para aplicaciones que exigen una consistencia estricta de los datos a costa de la velocidad de búsqueda. Un ejemplo puede ser un sistema financiero en línea que se ocupe del pago y la facturación de pedidos.</p>
<h3 id="Bounded-staleness" class="common-anchor-header">Estancamiento limitado</h3><p>El estancamiento limitado, como su nombre indica, permite la inconsistencia de los datos durante un cierto periodo de tiempo. Sin embargo, por lo general, los datos son siempre globalmente consistentes fuera de ese periodo de tiempo.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Bounded.png" alt="Bounded staleness consistency" class="doc-image" id="bounded-staleness-consistency" />
   </span> <span class="img-wrapper"> <span>Coherencia de la caducidad limitada</span> </span></p>
<p>El estancamiento limitado es adecuado para escenarios que necesitan controlar la latencia de la búsqueda y pueden aceptar la invisibilidad esporádica de los datos. Por ejemplo, en sistemas de recomendación como los motores de recomendación de vídeos, la invisibilidad de los datos a veces tiene un pequeño impacto en la tasa global de recuperación, pero puede aumentar significativamente el rendimiento del sistema de recomendación.</p>
<h3 id="Session" class="common-anchor-header">Sesión</h3><p>La sesión garantiza que todas las escrituras de datos puedan percibirse inmediatamente en las lecturas durante la misma sesión. En otras palabras, cuando se escriben datos a través de un cliente, los datos recién insertados se convierten instantáneamente en lecturas.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Session.png" alt="Session consistency" class="doc-image" id="session-consistency" />
   </span> <span class="img-wrapper"> <span>Consistencia de sesión</span> </span></p>
<p>Recomendamos elegir sesión como nivel de consistencia para aquellos escenarios en los que la demanda de consistencia de datos en la misma sesión es alta. Un ejemplo puede ser la eliminación de los datos de una entrada de libro del sistema de la biblioteca, y después de confirmar la eliminación y actualizar la página (una sesión diferente), el libro ya no debería ser visible en los resultados de búsqueda.</p>
<h3 id="Eventually" class="common-anchor-header">Eventualmente</h3><p>No hay un orden garantizado de lecturas y escrituras, y las réplicas convergen eventualmente al mismo estado dado que no se realizan más operaciones de escritura. Bajo la consistencia de &quot;eventualmente&quot;, las réplicas comienzan a trabajar en las peticiones de lectura con los últimos valores actualizados. La consistencia eventual es el nivel más débil de los cuatro.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Eventual.png" alt="Eventual consistency" class="doc-image" id="eventual-consistency" />
   </span> <span class="img-wrapper"> <span>Consistencia eventual</span> </span></p>
<p>Sin embargo, según el teorema PACELC, la latencia de búsqueda puede reducirse enormemente sacrificando la consistencia. Por lo tanto, la consistencia eventual es la más adecuada para situaciones en las que no hay una gran demanda de consistencia de datos, pero se requiere un rendimiento de búsqueda ultrarrápido. Un ejemplo puede ser la recuperación de reseñas y valoraciones de productos de Amazon con el nivel eventualmente consistente.</p>
<h2 id="Guarantee-timestamp" class="common-anchor-header">Marca de tiempo de garantía<button data-href="#Guarantee-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus realiza diferentes niveles de consistencia introduciendo el <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">sello de tiempo de garantía</a> (GuaranteeTs).</p>
<p>Un GuaranteeTs sirve para informar a los nodos de consulta que una búsqueda o petición de consulta no se realizará hasta que todos los datos anteriores al GuaranteeTs puedan ser vistos por los nodos de consulta. Cuando se especifica el nivel de consistencia, el nivel de consistencia se asignará a un valor específico de GuaranteeTs. Diferentes valores de GuaranteeTs corresponden a diferentes niveles de consistencia:</p>
<ul>
<li><p><strong>Fuerte</strong>: GuaranteeTs se establece como idéntico a la marca de tiempo más reciente del sistema, y los nodos de consulta esperan hasta que todos los datos anteriores a la marca de tiempo más reciente del sistema puedan ser vistos, antes de procesar la petición de búsqueda o consulta.</p></li>
<li><p><strong>Caducidad limitada</strong>: GuaranteeTs se establece relativamente más pequeña que la marca de tiempo más reciente del sistema, y los nodos de consulta buscan en una vista de datos tolerable y menos actualizada.</p></li>
<li><p><strong>Sesión</strong>: El cliente utiliza la marca de tiempo de la última operación de escritura como GuaranteeTs, de modo que cada cliente pueda al menos recuperar los datos insertados por el mismo cliente.</p></li>
<li><p><strong>Eventualmente</strong>: GuaranteeTs se establece en un valor muy pequeño para omitir la comprobación de coherencia. Los nodos de consulta buscan inmediatamente en la vista de datos existente.</p></li>
</ul>
<p>Consulte <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">Cómo funciona GuaranteeTs</a> para obtener más información sobre el mecanismo que garantiza diferentes niveles de consistencia en Milvus.</p>
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
<li>Aprenda a ajustar el nivel de consistencia cuando<ul>
<li><a href="/docs/es/v2.4.x/single-vector-search.md">realizar una búsqueda de un solo vector</a></li>
<li><a href="/docs/es/v2.4.x/multi-vector-search.md">realizar una búsqueda híbrida</a></li>
<li><a href="/docs/es/v2.4.x/get-and-scalar-query.md">realizar una consulta escalar</a></li>
</ul></li>
</ul>
