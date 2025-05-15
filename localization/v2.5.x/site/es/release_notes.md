---
id: release_notes.md
summary: Notas de la versión de Milvus
title: Notas de la versión
---
<h1 id="Release-Notes" class="common-anchor-header">Notas de la versión<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Descubra las novedades de Milvus. Esta página resume las nuevas características, mejoras, problemas conocidos y correcciones de errores de cada versión. Puede encontrar las notas de la versión para cada versión publicada después de la v2.5.0 en esta sección. Le sugerimos que visite regularmente esta página para conocer las actualizaciones.</p>
<h2 id="v2511" class="common-anchor-header">v2.5.11<button data-href="#v2511" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.11</td><td>2.5.8</td><td>2.5.8</td><td>2.5.8</td></tr>
</tbody>
</table>
<p>¡Nos complace anunciar el lanzamiento de Milvus 2.5.11! Esta versión introduce nuevas y potentes funciones, como la capacidad multianalizador y la compatibilidad ampliada con tokenizadores (Jieba, Lindera, ICU, Language Identifier). También hemos introducido varias mejoras, como las actualizaciones dinámicas del grupo de hilos de carga de segmentos y la optimización del filtrado de borrado durante la importación de binlogs. Las principales correcciones de errores se refieren a posibles problemas de caída de segmentos, fallos de búsqueda en BM25 y errores de filtrado de estadísticas JSON.</p>
<p>Le recomendamos que actualice a la versión 2.5.11 para beneficiarse de estas mejoras y correcciones.</p>
<h3 id="Features" class="common-anchor-header">Características</h3><ul>
<li>Se ha añadido la posibilidad de configurar varios analizadores (tokenizadores) para la compatibilidad con varios idiomas y seleccionar el adecuado en función de la instrucción de los datos de entrada<a href="https://github.com/milvus-io/milvus/pull/41444">(#41444</a>).</li>
<li>Mejorada la funcionalidad del analizador BM25<a href="https://github.com/milvus-io/milvus/pull/41456">(#41456</a>).<ul>
<li>Se ha introducido una API <code translate="no">run_analyzer</code> para las ejecuciones en seco con el fin de ayudar a analizar los resultados de la tokenización. Para obtener más información, consulte la <a href="/docs/es/analyzer-overview.md">descripción general del analizador</a>.</li>
<li>Tokenizadores<ul>
<li>Se ha añadido soporte para personalizar los parámetros del tokenizador Jieba.</li>
<li>Se ha añadido compatibilidad con el tokenizador Lindera. Para obtener más información, consulte <a href="/docs/es/lindera-tokenizer.md">Lindera</a>.</li>
<li>Se ha añadido compatibilidad con el tokenizador ICU. Para más información, consulte <a href="/docs/es/icu-tokenizer.md">ICU</a>.</li>
<li>Se ha añadido un tokenizador Language Identifier para la detección de idiomas.</li>
</ul></li>
<li>Filtros<ul>
<li>Ampliación de la compatibilidad lingüística con el filtro integrado de palabras vacías. Para más información, consulte <a href="/docs/es/stop-filter.md">Stop</a>.</li>
<li>Se ha añadido un filtro <code translate="no">remove_punct</code> para eliminar los signos de puntuación. Para más información, consulte <a href="/docs/es/removepunct-filter.md">Eliminar signos de puntuación</a>.</li>
<li>Se ha añadido un filtro <code translate="no">regex</code> para el filtrado de texto basado en patrones. Para más información, consulte <a href="/docs/es/regex-filter.md">Regex</a>.</li>
</ul></li>
</ul></li>
<li>Se ha añadido soporte para modificar la capacidad máxima de los campos de matriz<a href="https://github.com/milvus-io/milvus/pull/41406">(#41406</a>).</li>
<li>Añadido soporte para expresiones de rango binario en índices de ruta JSON<a href="https://github.com/milvus-io/milvus/pull/41317">(#41317</a>).</li>
<li>Se ha añadido compatibilidad con los tipos de coincidencia infijo y sufijo en las estadísticas JSON<a href="https://github.com/milvus-io/milvus/pull/41388">(#41388</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Habilitación de actualizaciones dinámicas del tamaño del grupo de hilos de carga de segmentos<a href="https://github.com/milvus-io/milvus/pull/41549">(nº 41549</a>).</li>
<li>Aceleración del filtrado de borrado durante la importación de binlogs<a href="https://github.com/milvus-io/milvus/pull/41552">(#41552</a>).</li>
<li>Añadidos parámetros de monitorización para el ratio de filtrado de expresiones<a href="https://github.com/milvus-io/milvus/pull/41403">(#41403</a>).</li>
<li>Añadida una opción de configuración para forzar la reconstrucción de índices a la última versión<a href="https://github.com/milvus-io/milvus/pull/41432">(#41432</a>).</li>
<li>Mejorado el mensaje de registro de errores para la política de listas<a href="https://github.com/milvus-io/milvus/pull/41368">(#41368</a>).</li>
<li>Adaptado el tratamiento de los guiones en las cabeceras de metadatos gRPC<a href="https://github.com/milvus-io/milvus/pull/41372">(#41372</a>).</li>
<li>Actualización de la versión de Go a 1.24.1 para solucionar CVE<a href="https://github.com/milvus-io/milvus/pull/41522">(#41522</a>, <a href="https://github.com/milvus-io/milvus/pull/41319">#41319</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Se ha corregido un problema por el que los segmentos podían no eliminarse correctamente al eliminar una partición<a href="https://github.com/milvus-io/milvus/pull/41543">(#41543</a>).</li>
<li>Se ha corregido la inserción masiva para utilizar la lista de campos de entrada del ejecutor de funciones en lugar de la lista de campos del esquema<a href="https://github.com/milvus-io/milvus/pull/41561">(nº 41561</a>).</li>
<li>Corrección de los fallos de búsqueda de BM25 cuando <code translate="no">avgdl</code> (longitud media del documento) es NaN<a href="https://github.com/milvus-io/milvus/pull/41503">(#41503</a>).</li>
<li>Corrección de etiquetas inexactas en las métricas de QueryNode<a href="https://github.com/milvus-io/milvus/pull/41422">(#41422</a>).</li>
<li>Se ha corregido un problema por el que la creación de índices de estadísticas JSON podía fallar si los datos contenían un mapa vacío<a href="https://github.com/milvus-io/milvus/pull/41506">(#41506</a>).</li>
<li>Se ha corregido la API <code translate="no">AlterCollection</code> para que guarde correctamente la fecha y hora de modificación<a href="https://github.com/milvus-io/milvus/pull/41469">(#41469</a>).</li>
<li>Se ha corregido un error de filtrado intermitente en las estadísticas JSON en <code translate="no">ConjunctExpr</code> y se ha mejorado la lógica de cálculo de ranuras de tareas para acelerar la creación de estadísticas JSON<a href="https://github.com/milvus-io/milvus/pull/41458">(#41458</a>).</li>
<li>Corregida una fuga de oráculo IDF en el cálculo de estadísticas BM25<a href="https://github.com/milvus-io/milvus/pull/41426">(#41426</a>).</li>
<li>Se ha garantizado que los temas precreados se comprueben primero durante la validación del número de fragmentos<a href="https://github.com/milvus-io/milvus/pull/41421">(nº 41421</a>).</li>
<li>Se ha corregido un informe erróneo de bloqueo que se producía en las pruebas unitarias<a href="https://github.com/milvus-io/milvus/pull/41377">(#41377</a>).</li>
</ul>
<h2 id="v2510" class="common-anchor-header">v2.5.10<button data-href="#v2510" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 21 de abril de 2025</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.10</td><td>2.5.6</td><td>2.5.8</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Milvus 2.5.10 ofrece un rendimiento mejorado de búsqueda y carga, informes de métricas mejorados y compatibilidad ampliada con SVE para el cálculo acelerado de métricas. Esta versión también incluye múltiples correcciones de errores que aumentan la estabilidad y la corrección. Le animamos a que lo actualice o lo pruebe: ¡sus comentarios son muy valiosos para ayudarnos a hacer Milvus aún mejor!</p>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Ignorar el informe de métricas de índice para índices inexistentes<a href="https://github.com/milvus-io/milvus/pull/41296">(#41296</a>)</li>
<li>Utilizar el modo de escaneo para LIKE incluso cuando existe un índice invertido<a href="https://github.com/milvus-io/milvus/pull/41309">(#41309</a>)</li>
<li>Optimizar el rendimiento de las expresiones LIKE<a href="https://github.com/milvus-io/milvus/pull/41222">(#41222</a>)</li>
<li>Optimizar el formato de índice para mejorar el rendimiento de carga<a href="https://github.com/milvus-io/milvus/pull/41041">(#41041</a>)</li>
<li>RESTful: hacer configurable el tiempo de espera por defecto<a href="https://github.com/milvus-io/milvus/pull/41225">(#41225</a>)</li>
<li>Habilitar el soporte SVE para el cálculo métrico L2 en funciones FP16 / NY<a href="https://github.com/zilliztech/knowhere/pull/1134">(knowhere #1134</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Corregir índice JSON no funciona para filtros de cadena<a href="https://github.com/milvus-io/milvus/pull/41383">(#41383</a>)</li>
<li>Omitir la comprobación de dimensiones para campos no vectoriales en la comprobación previa<a href="https://github.com/milvus-io/milvus/pull/41329">(#41329</a>)</li>
<li>Alterar colección ahora actualiza el esquema correctamente<a href="https://github.com/milvus-io/milvus/pull/41308">(#41308</a>)</li>
<li>Actualización de la versión de knowhere para corregir la versión de macOS<a href="https://github.com/milvus-io/milvus/pull/41315">(#41315</a>)</li>
<li>Evitar el pánico al enumerar los índices antes de completar la inicialización del índice de segmento<a href="https://github.com/milvus-io/milvus/pull/41299">(#41299</a>)</li>
<li>Resolver regresión de rendimiento al cambiar un nivel de registro<a href="https://github.com/milvus-io/milvus/pull/41269">(#41269</a>)</li>
<li>Cerrar el cliente antes de eliminar el cliente trabajador<a href="https://github.com/milvus-io/milvus/pull/41254">(#41254</a>)</li>
</ul>
<h2 id="v259" class="common-anchor-header">v2.5.9<button data-href="#v259" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 11 de abril de 2025</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.9</td><td>2.5.6</td><td>2.5.7</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Nos complace anunciar Milvus 2.5.9, que ofrece un rendimiento mejorado para las estadísticas de claves JSON, capacidades de indexación mejoradas y varias correcciones de errores críticos que refuerzan la estabilidad y el manejo de datos. Le animamos a que actualice o pruebe esta versión y, como siempre, agradecemos enormemente sus comentarios mientras seguimos perfeccionando Milvus.</p>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Soporte para omitir la normalización de la puntuación para el re-ranker ponderado<a href="https://github.com/milvus-io/milvus/pull/40905">(#40905</a>)</li>
<li>Mejorar el rendimiento de la creación de estadísticas clave JSON añadiendo documentos por lotes<a href="https://github.com/milvus-io/milvus/pull/40898">(#40898</a>)</li>
<li>Utilizar <code translate="no">int32</code> al crear índices de matrices para los tipos de elementos <code translate="no">int8</code>/<code translate="no">int16</code> <a href="https://github.com/milvus-io/milvus/pull/41186">(#41186</a>)</li>
<li>Alinear los resultados de la búsqueda de fuerza bruta con el comportamiento del índice JSON para la expresión <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41056">(#41056</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Se ha corregido un problema que provocaba la confusión de traceID si el cliente enviaba un traceID<a href="https://github.com/milvus-io/milvus/pull/41149">(#41149</a>)</li>
<li>Se ha corregido un fallo potencial debido al uso incorrecto de <code translate="no">noexcept</code>, que provocaba fallos de E/S<a href="https://github.com/milvus-io/milvus/pull/41221">(#41221</a>)</li>
<li>Resuelto un bucle de saldo normal infinito que se desencadenaba tras la suspensión del saldo<a href="https://github.com/milvus-io/milvus/pull/41196">(#41196</a>)</li>
<li>Mostrar colecciones ahora admite objetos concedidos a grupos de privilegios personalizados<a href="https://github.com/milvus-io/milvus/pull/41204">(#41204</a>)</li>
<li>Corregido un fallo al recuperar posiciones de canal de réplica<a href="https://github.com/milvus-io/milvus/pull/41189">(#41189</a>)</li>
<li>Se ha corregido una posible fuga de hilos causada por los tiempos de espera de RESTful<a href="https://github.com/milvus-io/milvus/pull/41184">(#41184</a>)</li>
<li>Añadido un mapa de bits claro para el modo de omisión por lotes<a href="https://github.com/milvus-io/milvus/pull/41165">(#41165</a>)</li>
<li>Se ha corregido un problema por el que la eliminación de un tipo de índice fallaba en el almacenamiento remoto en modo local<a href="https://github.com/milvus-io/milvus/pull/41163">(#41163</a>)</li>
<li>Uso de <code translate="no">element_type</code> para los operadores de array <code translate="no">isNull</code> <a href="https://github.com/milvus-io/milvus/pull/41158">(#41158</a>)</li>
<li>Eliminado el restablecimiento de métricas para garantizar la precisión de los informes<a href="https://github.com/milvus-io/milvus/pull/41081">(#41081</a>)</li>
<li>Se ha corregido un error que impedía que los datos de <code translate="no">null</code> se filtraran mediante expresiones de <code translate="no">null</code> <a href="https://github.com/milvus-io/milvus/pull/41135">(#41135</a>)</li>
<li>Ignorado el crecimiento de segmentos sin posición inicial para la política de sellado<a href="https://github.com/milvus-io/milvus/pull/41131">(#41131</a>)</li>
<li>Evitación de la actualización de las solicitudes de búsqueda/consulta originales durante los reintentos<a href="https://github.com/milvus-io/milvus/pull/41127">(nº 41127</a>)</li>
<li>Corregido un fallo de segmentación si <code translate="no">LoadArrowReaderFromRemote</code> se ejecuta en una ruta de excepción<a href="https://github.com/milvus-io/milvus/pull/41071">(#41071</a>)</li>
<li>Solucionados los problemas de balance manual y comprobación de balance<a href="https://github.com/milvus-io/milvus/pull/41038">(#41038</a>)</li>
<li>El esquema validado no es <code translate="no">nil</code> para las estadísticas JSON con lazy <code translate="no">DescribeCollection</code> <a href="https://github.com/milvus-io/milvus/pull/41068">(#41068</a>)</li>
<li>Corregido un error de movimiento del cursor al comparar dos columnas<a href="https://github.com/milvus-io/milvus/pull/41054">(#41054</a>)</li>
<li>Resuelto un fallo al insertar matrices <code translate="no">null</code> y no nulas con mmap creciente abierto<a href="https://github.com/milvus-io/milvus/pull/41052">(#41052</a>)</li>
<li>Solucionado un problema de compilación en arm64<a href="https://github.com/milvus-io/milvus/pull/41058">(#41058</a>)</li>
<li>Añadido un modo de bypass de thread pool para evitar el bloqueo de las operaciones de inserción/carga mediante índices crecientes<a href="https://github.com/milvus-io/milvus/pull/41013">(#41013</a>)</li>
<li>Corregidos errores de formato JSON<a href="https://github.com/milvus-io/milvus/pull/41031">(#41031</a>)</li>
<li>Corregido un error 404 en WebUI cuando <code translate="no">http.enablepprof</code> es false<a href="https://github.com/milvus-io/milvus/pull/41007">(#41007</a>)</li>
</ul>
<h2 id="v258" class="common-anchor-header">v2.5.8<button data-href="#v258" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 1 de abril de 2025</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.8</td><td>2.5.6</td><td>2.5.7</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Nos complace anunciar el lanzamiento de Milvus 2.5.8, que incluye mejoras en las expresiones JSON, la validación UTF-8, el uso de memoria y la lógica de equilibrado. Esta versión también incluye múltiples correcciones de errores importantes para mejorar la concurrencia y el manejo de datos. Le animamos a que actualice o pruebe Milvus y, como siempre, ¡sus comentarios nos ayudan a perfeccionarlo continuamente!</p>
<h3 id="Features" class="common-anchor-header">Características</h3><ul>
<li>Soporte de expresiones JSON <code translate="no">null</code>/<code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41002">(#41002</a>)</li>
<li>Soporte de vectores dispersos de Parquet structs en inserciones masivas<a href="https://github.com/milvus-io/milvus/pull/40874">(#40874</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Equilibrar primero la colección con el mayor número de filas<a href="https://github.com/milvus-io/milvus/pull/40958">(#40958</a>)</li>
<li>Validación de cadenas UTF-8 durante la importación<a href="https://github.com/milvus-io/milvus/pull/40746">(#40746</a>)</li>
<li>Añadir validación UTF-8 para todos los campos VARCHAR<a href="https://github.com/milvus-io/milvus/pull/40993">(#40993</a>)</li>
<li>Evitar la re-consulta si la búsqueda híbrida sólo solicita el PK como campo de salida<a href="https://github.com/milvus-io/milvus/pull/40906">(#40906</a>)</li>
<li>Mejora de las vistas de matriz para optimizar el uso de memoria<a href="https://github.com/milvus-io/milvus/pull/40206">(nº 40206</a>)</li>
<li>Añadir una configuración de intervalo de activación para el auto-equilibrio<a href="https://github.com/milvus-io/milvus/pull/39918">(#39918</a>)</li>
<li>Convertir múltiples expresiones OR en expresiones IN<a href="https://github.com/milvus-io/milvus/pull/40751">(#40751</a>)</li>
<li>Soporte de criterios de compactación manual detallados<a href="https://github.com/milvus-io/milvus/pull/40924">(#40924</a>)</li>
<li>Conservar los tokens sin procesar para el registro de auditoría<a href="https://github.com/milvus-io/milvus/pull/40867">(#40867</a>)</li>
<li>Optimizar el uso del meta mutex de DataCoord<a href="https://github.com/milvus-io/milvus/pull/40753">(#40753</a>)</li>
<li>Introducir suscripciones por lotes en <code translate="no">MsgDispatcher</code> <a href="https://github.com/milvus-io/milvus/pull/40596">(#40596</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Se ha corregido un fallo que afectaba a la entrada nulable y a los tipos de datos mmap crecientes<a href="https://github.com/milvus-io/milvus/pull/40980">(#40980</a>)</li>
<li>Corrección de posibles pérdidas de datos en operaciones de borrado causadas por ID de binlog duplicados<a href="https://github.com/milvus-io/milvus/pull/40985">(#40985</a>),<a href="https://github.com/milvus-io/milvus/pull/40976">(#40976</a>)</li>
<li>Añadidos bloqueos de índice de campo para <code translate="no">GetSegmentsIndexStates</code> para evitar el pánico potencial al insertar mientras se crea la colección<a href="https://github.com/milvus-io/milvus/pull/40969">(#40969</a>)</li>
<li>Corregidos problemas de concurrencia en el registro de consumidores Rocksmq<a href="https://github.com/milvus-io/milvus/pull/40885">(#40885</a>)</li>
<li>Recuperar todos los registros delta hijo para la carga de segmentos<a href="https://github.com/milvus-io/milvus/pull/40957">(#40957</a>)</li>
<li>Corregidos resultados erróneos causados por el uso de índice JSON cuando se especifica <code translate="no">iterative_filter</code> <a href="https://github.com/milvus-io/milvus/pull/40946">(#40946</a>)</li>
<li>Mayor prioridad para la operación <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/40865">(#40865</a>)</li>
<li>Corregido <code translate="no">WithGroupSize</code> al reducir<a href="https://github.com/milvus-io/milvus/pull/40920">(#40920</a>)</li>
<li>Aumentado el número de ranuras proporcionalmente a medida que crece el tamaño del segmento<a href="https://github.com/milvus-io/milvus/pull/40862">(#40862</a>)</li>
<li>Fijado el tiempo de cola de tareas antes de enqueue<a href="https://github.com/milvus-io/milvus/pull/40853">(#40853</a>)</li>
<li>Corregido desequilibrio de canales en DataNodes<a href="https://github.com/milvus-io/milvus/pull/40854">(#40854</a>)</li>
<li>Establecer configuraciones predeterminadas correctas para ranuras de tareas<a href="https://github.com/milvus-io/milvus/pull/40821">(#40821</a>)</li>
<li>Go SDK: Establecer banderas anulables de acuerdo con FieldSchema para la inserción basada en filas<a href="https://github.com/milvus-io/milvus/pull/40962">(#40962</a>)</li>
</ul>
<h2 id="v257" class="common-anchor-header">v2.5.7<button data-href="#v257" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 21 de marzo de 2025</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.7</td><td>2.5.6</td><td>2.5.6</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Nos complace anunciar el lanzamiento de Milvus 2.5.7, que destaca por la recién introducida función JSON Path Index. Esto le permite crear índices invertidos en columnas dinámicas o JSON para mejorar significativamente el rendimiento de las consultas. Además de esta nueva funcionalidad, hemos introducido numerosas mejoras y correcciones de errores para mejorar la fiabilidad, la gestión de errores y la usabilidad. Le animamos a que lo actualice o lo pruebe y, como siempre, agradecemos enormemente sus comentarios mientras seguimos mejorando Milvus.</p>
<h3 id="Features" class="common-anchor-header">Características</h3><ul>
<li><strong>Índice de rutas JSON</strong>: Para responder a las necesidades de los usuarios de esquemas dinámicos, Milvus 2.5.7 introduce la capacidad de crear índices en columnas dinámicas y columnas JSON. Con esta función, puede crear índices invertidos para columnas dinámicas específicas o rutas JSON, evitando así el lento proceso de carga de JSON y mejorando enormemente el rendimiento de las consultas. Para más información, consulte <a href="/docs/es/use-json-fields.md">Campo JSON</a>.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Reordenación de las subexpresiones de las expresiones conjuntas<a href="https://github.com/milvus-io/milvus/pull/40186">(#40186</a>)</li>
<li>Añadir más opciones de configuración para <code translate="no">interimindex</code> para soportar modos refinados<a href="https://github.com/milvus-io/milvus/pull/40429">(#40429</a>)</li>
<li>Utilizar las métricas de contador correctas para los cálculos generales de WA<a href="https://github.com/milvus-io/milvus/pull/40679">(#40679</a>)</li>
<li>Actualizar la configuración de poda de segmentos<a href="https://github.com/milvus-io/milvus/pull/40632">(#40632</a>)</li>
<li>Añadir una política de sellado de canales basada en el bloqueo de L0<a href="https://github.com/milvus-io/milvus/pull/40535">(#40535</a>)</li>
<li>Perfeccionar los metadatos de tareas con bloqueo a nivel de clave<a href="https://github.com/milvus-io/milvus/pull/40353">(#40353</a>)</li>
<li>Eliminar las etiquetas innecesarias de colección y partición de las métricas<a href="https://github.com/milvus-io/milvus/pull/40593">(#40593</a>)</li>
<li>Mejorar los mensajes de error de importación<a href="https://github.com/milvus-io/milvus/pull/40597">(#40597</a>)</li>
<li>Evitar la conversión de trozos de bytes del cuerpo a cadenas en <code translate="no">httpserver</code> <a href="https://github.com/milvus-io/milvus/pull/40414">(#40414</a>)</li>
<li>Registrar la posición inicial de los mensajes de borrado<a href="https://github.com/milvus-io/milvus/pull/40678">(#40678</a>)</li>
<li>Apoyar la recuperación de binlogs de segmentos con la nueva interfaz <code translate="no">GetSegmentsInfo</code> <a href="https://github.com/milvus-io/milvus/pull/40466">(#40466</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Uso de <code translate="no">newInsertDataWithFunctionOutputField</code> al importar archivos binlog<a href="https://github.com/milvus-io/milvus/pull/40742">(#40742</a>)</li>
<li>Se ha corregido un problema por el que las propiedades mmap no se aplicaban al crear una colección<a href="https://github.com/milvus-io/milvus/pull/40515">(#40515</a>)</li>
<li>No eliminar el archivo centroids cuando falla el muestreo; en su lugar, esperar a GC<a href="https://github.com/milvus-io/milvus/pull/40702">(#40702</a>)</li>
<li>Solucionados los problemas de pérdida de mensajes durante la búsqueda<a href="https://github.com/milvus-io/milvus/pull/40736">(#40736</a>)</li>
<li>Eliminados los objetivos de retardo después del despachador principal<a href="https://github.com/milvus-io/milvus/pull/40717">(#40717</a>)</li>
<li>Añadida la entrada clear bitmap para cada bucle batch<a href="https://github.com/milvus-io/milvus/pull/40722">(#40722</a>)</li>
<li>Protegido <code translate="no">GetSegmentIndexes</code> con un RLock<a href="https://github.com/milvus-io/milvus/pull/40720">(#40720</a>)</li>
<li>Evitados los fallos de segmentación causados por la recuperación de conjuntos de datos vectoriales vacíos<a href="https://github.com/milvus-io/milvus/pull/40546">(#40546</a>)</li>
<li>Corregido el filtro "not-equal" del índice JSON<a href="https://github.com/milvus-io/milvus/pull/40648">(#40648</a>)</li>
<li>Corregida la carga de desplazamientos nulos en el índice invertido<a href="https://github.com/milvus-io/milvus/pull/40524">(#40524</a>)</li>
<li>Corregida la lógica de limpieza de basura de las estadísticas de <code translate="no">jsonKey</code> y mejorado el filtro de estadísticas de clave JSON<a href="https://github.com/milvus-io/milvus/pull/40039">(#40039</a>)</li>
<li>Detección de errores de puntero JSON no válido<a href="https://github.com/milvus-io/milvus/pull/40626">(#40626</a>)</li>
<li>RBAC star privilege ahora devuelve vacío al listar políticas<a href="https://github.com/milvus-io/milvus/pull/40557">(#40557</a>)</li>
<li>Evitado el pánico cuando un campo no existe en el esquema en QueryNode<a href="https://github.com/milvus-io/milvus/pull/40542">(#40542</a>)</li>
<li>Se ha solucionado un problema de recopilación de referencias para la búsqueda/consulta<a href="https://github.com/milvus-io/milvus/pull/40550">(nº 40550</a>)</li>
<li>Gestión de filas vacías en vectores dispersos<a href="https://github.com/milvus-io/milvus/pull/40586">(#40586</a>)</li>
<li>Se ha añadido una comprobación de parámetros de tipo/índice duplicados al crear colecciones<a href="https://github.com/milvus-io/milvus/pull/40465">(#40465</a>)</li>
<li>Traslado de <code translate="no">metaHeader</code> al cliente para evitar carreras de datos<a href="https://github.com/milvus-io/milvus/pull/40444">(#40444</a>)</li>
</ul>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 10 de marzo de 2025</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>Nos complace anunciar el lanzamiento de Milvus 2.5.6, que incluye valiosas mejoras en las cadenas de herramientas, el registro, las métricas y el manejo de matrices, así como múltiples correcciones de errores para mejorar la fiabilidad y el rendimiento. Esta actualización incluye una mejor gestión de la concurrencia, tareas de compactación más robustas y otras mejoras clave. Le animamos a que la actualice o la pruebe y, como siempre, agradecemos sus comentarios para ayudarnos a mejorar Milvus continuamente.</p>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Actualización de la cadena de herramientas Go a 1.22.7<a href="https://github.com/milvus-io/milvus/pull/40399">(#40399</a>)</li>
<li>Actualización de la versión Rust a 1.83<a href="https://github.com/milvus-io/milvus/pull/40317">(#40317</a>)</li>
<li>Actualizar la versión Etcd a 3.5.18<a href="https://github.com/milvus-io/milvus/pull/40230">(#40230</a>)</li>
<li>Comprobar sólo el tipo de elemento para matrices no nulas<a href="https://github.com/milvus-io/milvus/pull/40447">(#40447</a>)</li>
<li>Eliminar los registros de depuración en el gestor de grupos de recursos (v2)<a href="https://github.com/milvus-io/milvus/pull/40393">(#40393</a>)</li>
<li>Mejorar el registro para el resolver gRPC<a href="https://github.com/milvus-io/milvus/pull/40338">(#40338</a>)</li>
<li>Añadir más métricas para componentes CGO asíncronos<a href="https://github.com/milvus-io/milvus/pull/40232">(#40232</a>)</li>
<li>Limpieza de la caché de ubicación de fragmentos tras la liberación de una colección<a href="https://github.com/milvus-io/milvus/pull/40228">(#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Corregida la corrupción de arrays causada por ignorar la validez<a href="https://github.com/milvus-io/milvus/pull/40433">(#40433</a>)</li>
<li>Corrección de un problema por el que las expresiones <code translate="no">null</code> no funcionaban para campos JSON<a href="https://github.com/milvus-io/milvus/pull/40457">(#40457</a>)</li>
<li>Se ha corregido un problema por el que se almacenaba un desplazamiento incorrecto al crear Tantivy con un campo anulable<a href="https://github.com/milvus-io/milvus/pull/40453">(#40453</a>).</li>
<li>Se omitía la ejecución de estadísticas para segmentos cero<a href="https://github.com/milvus-io/milvus/pull/40449">(#40449</a>)</li>
<li>Se ha corregido la estimación del tamaño de memoria de las matrices<a href="https://github.com/milvus-io/milvus/pull/40377">(#40377</a>)</li>
<li>Pasar un puntero de mochila para evitar compactaciones múltiples<a href="https://github.com/milvus-io/milvus/pull/40401">(#40401</a>)</li>
<li>Se ha corregido un problema de bloqueo con la inserción masiva<a href="https://github.com/milvus-io/milvus/pull/40304">(#40304</a>)</li>
<li>Se han evitado las fugas del flujo de mensajes terminando correctamente el despachador principal<a href="https://github.com/milvus-io/milvus/pull/40351">(#40351</a>)</li>
<li>Solucionados los problemas de concurrencia para <code translate="no">null</code> offsets<a href="https://github.com/milvus-io/milvus/pull/40363">(#40363</a>),<a href="https://github.com/milvus-io/milvus/pull/40365">(#40365</a>)</li>
<li>Corregido el análisis sintáctico de <code translate="no">import end ts</code> <a href="https://github.com/milvus-io/milvus/pull/40333">(#40333</a>)</li>
<li>Mejora de la gestión de errores y pruebas unitarias para la función <code translate="no">InitMetaCache</code> <a href="https://github.com/milvus-io/milvus/pull/40324">(#40324</a>)</li>
<li>Añadida una comprobación de parámetros duplicados para <code translate="no">CreateIndex</code> <a href="https://github.com/milvus-io/milvus/pull/40330">(#40330</a>)</li>
<li>Resuelto un problema que impedía las tareas de compactación cuando el tamaño superaba el límite máximo<a href="https://github.com/milvus-io/milvus/pull/40350">(#40350</a>)</li>
<li>Corregido el consumo duplicado del flujo para segmentos invisibles<a href="https://github.com/milvus-io/milvus/pull/40318">(#40318</a>)</li>
<li>Cambiada la variable CMake para cambiar a <code translate="no">knowhere-cuvs</code> <a href="https://github.com/milvus-io/milvus/pull/40289">(#40289</a>)</li>
<li>Se ha corregido un problema por el que fallaba la eliminación de propiedades de la base de datos a través de RESTful<a href="https://github.com/milvus-io/milvus/pull/40260">(#40260</a>).</li>
<li>Utilización de un tipo de mensaje diferente para la API <code translate="no">OperatePrivilegeV2</code> <a href="https://github.com/milvus-io/milvus/pull/40193">(#40193</a>)</li>
<li>Corregida una carrera de datos en la caché delta de tareas<a href="https://github.com/milvus-io/milvus/pull/40262">(#40262</a>)</li>
<li>Resuelta una fuga en la caché delta de tareas causada por ID de tareas duplicados<a href="https://github.com/milvus-io/milvus/pull/40184">(#40184</a>)</li>
</ul>
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 26 de febrero de 2025</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.5 aporta mejoras significativas en el número de colecciones y particiones que puede soportar un único cluster. Ahora es totalmente factible ejecutar Milvus con 10.000 colecciones y 100.000 particiones. Esta versión también soluciona varios errores críticos, como la falta de estadísticas de coincidencia y un problema de bloqueo en las consultas multietapa. Además, incluye numerosas mejoras de observabilidad y seguridad. Recomendamos encarecidamente que todos los usuarios que utilicen Milvus 2.5.x se actualicen lo antes posible.</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">Actualización de dependencias</h3><p>Actualizado a ETCD 3.5.18 para corregir varios CVE.</p>
<ul>
<li>[2.5] Actualizado raft to cuvs<a href="https://github.com/milvus-io/milvus/pull/39221">(#39221</a>)</li>
<li>[2.5] Actualizada la versión de Knowhere<a href="https://github.com/milvus-io/milvus/pull/39673">(#39673</a>, <a href="https://github.com/milvus-io/milvus/pull/39574">#39574</a>)</li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">Errores Críticos</h3><ul>
<li>[2.5] Usado el prefijo <code translate="no">text_log</code> para el archivo textmatchindex null offset<a href="https://github.com/milvus-io/milvus/pull/39936">(#39936</a>)</li>
<li>[2.5] Agregado sub-task pool para tareas multi-etapa para evitar deadlock<a href="https://github.com/milvus-io/milvus/pull/40081">(#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>[2.5] Corregido el bloqueo del programador de tareas<a href="https://github.com/milvus-io/milvus/pull/40121">(#40121</a>)</li>
<li>[2.5] Corregida condición de carrera que causaba la creación de múltiples índices idénticos<a href="https://github.com/milvus-io/milvus/pull/40180">(#40180</a>)</li>
<li>[2.5] Solucionado el problema por el que se podían crear colecciones con nombres duplicados<a href="https://github.com/milvus-io/milvus/pull/40147">(#40147</a>)</li>
<li>Corregido fallo de búsqueda de expresión nula<a href="https://github.com/milvus-io/milvus/pull/40128">(#40128</a>)</li>
<li>[2.5] Corregido error por el que fallaba la coincidencia de prefijos cuando había comodines en el prefijo<a href="https://github.com/milvus-io/milvus/pull/40021">(#40021</a>)</li>
<li>Cancelados subcontextos en cascada cuando la petición HTTP finalizaba<a href="https://github.com/milvus-io/milvus/pull/40060">(#40060</a>)</li>
<li>[2.5] Corregida la fuga de caché delta de tarea en la tarea reducir<a href="https://github.com/milvus-io/milvus/pull/40056">(#40056</a>)</li>
<li>[2.5] Corregido pánico de querycoord en caso de esquina<a href="https://github.com/milvus-io/milvus/pull/40058">(#40058</a>)</li>
<li>[2.5] Mejorada la función isbalanced para contar correctamente los pares de comillas<a href="https://github.com/milvus-io/milvus/pull/40002">(#40002</a>)</li>
<li>[2.5] Corregido -1 negativo ejecutando tareas de compactación<a href="https://github.com/milvus-io/milvus/pull/39955">(#39955</a>)</li>
<li>[2.5] Corregido error por el que un segmento puede no transferirse nunca de sellado a lavado<a href="https://github.com/milvus-io/milvus/pull/39996">(#39996</a>)</li>
<li>Omitida la creación del índice de clave primaria al cargar el índice pk<a href="https://github.com/milvus-io/milvus/pull/39922">(#39922</a>)</li>
<li>[2.5] Omitida la creación del índice de texto cuando el segmento era cero después de ordenar<a href="https://github.com/milvus-io/milvus/pull/39969">(#39969</a>)</li>
<li>[2.5] Corregido fallo al buscar en la posición más temprana<a href="https://github.com/milvus-io/milvus/pull/39966">(#39966</a>)</li>
<li>Ignorada la opción de crecimiento perdida en hybridsearch<a href="https://github.com/milvus-io/milvus/pull/39900">(#39900</a>)</li>
<li>[2.5] Corregida la incapacidad de altercollection para modificar el nivel de consistencia<a href="https://github.com/milvus-io/milvus/pull/39902">(#39902</a>)</li>
<li>Corregido fallo de importación debido a recuento de filas 0<a href="https://github.com/milvus-io/milvus/pull/39904">(#39904</a>)</li>
<li>[2.5] Corregido resultado de módulo erróneo para tipo largo<a href="https://github.com/milvus-io/milvus/pull/39802">(#39802</a>)</li>
<li>[2.5] Añadido y utilizado el contexto de vida para el trigger de compactación<a href="https://github.com/milvus-io/milvus/pull/39880">(#39880</a>)</li>
<li>[2.5] Comprobada la liberación de la colección antes de las comprobaciones de destino<a href="https://github.com/milvus-io/milvus/pull/39843">(#39843</a>)</li>
<li>Corregido fallo de parada graceful de Rootcoord y recurso limitado de CI<a href="https://github.com/milvus-io/milvus/pull/39793">(#39793</a>)</li>
<li>[2.5] Eliminada la comprobación del tamaño de las columnas de carga de campos y esquemas<a href="https://github.com/milvus-io/milvus/pull/39834">(#39834</a>, <a href="https://github.com/milvus-io/milvus/pull/39835">#39835</a>)</li>
<li>[2.5] Eliminado el parámetro mmap.enable en el parámetro type al crear índice<a href="https://github.com/milvus-io/milvus/pull/39806">(#39806</a>)</li>
<li>[2.5] No se pasa el nombre del índice al eliminar propiedades<a href="https://github.com/milvus-io/milvus/pull/39679">(#39679</a>)</li>
<li>[2.5] Los segmentos devuelven resultados tanto crecientes como sellados<a href="https://github.com/milvus-io/milvus/pull/39789">(#39789</a>)</li>
<li>[2.5] Corregido problema de mapa concurrente<a href="https://github.com/milvus-io/milvus/pull/39776">(#39776</a>)</li>
<li>[2.5] Resuelto conflicto en prueba de tarea QC<a href="https://github.com/milvus-io/milvus/pull/39797">(#39797</a>)</li>
<li>[2.5] Arreglada carga de colección atascada si ocurría compactación o GC<a href="https://github.com/milvus-io/milvus/pull/39761">(#39761</a>)</li>
<li>[2.5] Arreglada distribución desigual causada por fuga de caché delta de tarea en ejecución<a href="https://github.com/milvus-io/milvus/pull/39759">(#39759</a>)</li>
<li>[2.5] Retorno anticipado al omitir índice pk de carga<a href="https://github.com/milvus-io/milvus/pull/39763">(#39763</a>)</li>
<li>[2.5] Corregido que el usuario root podía listar todas las colecciones incluso cuando <code translate="no">common.security.rootShouldBindRole</code> estaba configurado<a href="https://github.com/milvus-io/milvus/pull/39714">(#39714</a>)</li>
<li>[2.5] Corregida fuga en el diagrama de flujo<a href="https://github.com/milvus-io/milvus/pull/39686">(#39686</a>)</li>
<li>[2.5] Usado el formateador de elementos param para evitar la superposición de setconfig<a href="https://github.com/milvus-io/milvus/pull/39636">(#39636</a>)</li>
<li>[2.5] Comprobado el nombre de privilegio del metastore con el nombre de privilegio "todos"<a href="https://github.com/milvus-io/milvus/pull/39492">(#39492</a>)</li>
<li>[2.5] Añadido limitador de velocidad para RESTful v1<a href="https://github.com/milvus-io/milvus/pull/39555">(#39555</a>)</li>
<li>[2.5] Eliminado el número de partición en el gestor RESTful<a href="https://github.com/milvus-io/milvus/pull/40113">(#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><h4 id="Observability" class="common-anchor-header">Observabilidad</h4><ul>
<li>Añadida métrica de monitorización para recuperar datos sin procesar<a href="https://github.com/milvus-io/milvus/pull/40155">(#40155</a>)</li>
<li>[2.5] Añadida métrica de latencia de vector de obtención y refinado el mensaje de error de límite de solicitud<a href="https://github.com/milvus-io/milvus/pull/40085">(#40085</a>)</li>
<li>[2.5] Añadida métrica para la cola proxy<a href="https://github.com/milvus-io/milvus/pull/40071">(#40071</a>)</li>
<li>Expuestos más datos de métricas<a href="https://github.com/milvus-io/milvus/pull/39466">(#39466</a>)</li>
<li>[2.5] Añadidas métricas para la expresión de análisis sintáctico<a href="https://github.com/milvus-io/milvus/pull/39716">(#39716</a>)</li>
<li>[2.5] Añadido campo de registro DSL para hybridsearch<a href="https://github.com/milvus-io/milvus/pull/39598">(#39598</a>)</li>
<li>[2.5] Omitida la actualización de métricas de índice si el índice fue eliminado<a href="https://github.com/milvus-io/milvus/pull/39572">(#39572</a>)</li>
<li>[2.5] Volcado de información pprof si el progreso de parada del componente finaliza<a href="https://github.com/milvus-io/milvus/pull/39760">(#39760</a>)</li>
<li>[2.5] Añadida API de gestión para comprobar el estado de balance de querycoord<a href="https://github.com/milvus-io/milvus/pull/39909">(#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">Estadísticas/Compactación/Optimización del Programador de Tareas de Índice</h4><ul>
<li>Refinada la política del programador de tareas de índice<a href="https://github.com/milvus-io/milvus/pull/40104">(#40104</a>)</li>
<li>[2.5] Limitada la velocidad de generación de tareas de estadísticas<a href="https://github.com/milvus-io/milvus/pull/39645">(#39645</a>)</li>
<li>Añadida configuración para la programación de la compactación<a href="https://github.com/milvus-io/milvus/pull/39511">(#39511</a>)</li>
<li>[2.5] Comprobada la compactación L0 sólo con el mismo canal cuando se indica<a href="https://github.com/milvus-io/milvus/pull/39543">(#39543</a>)</li>
<li>[2.5] Ajustada la estimación de memoria del cargador de segmentos para índices intermedios<a href="https://github.com/milvus-io/milvus/pull/39509">(#39509</a>)</li>
<li>[2.5] Usados pos ts de inicio para segmento de sellado por política de tiempo de vida<a href="https://github.com/milvus-io/milvus/pull/39994">(#39994</a>)</li>
<li>Eliminada meta tarea cuando la tarea ya no era necesaria<a href="https://github.com/milvus-io/milvus/pull/40146">(#40146</a>)</li>
<li>[2.5] Acelerado el listado de objetos durante la importación de binlog<a href="https://github.com/milvus-io/milvus/pull/40048">(#40048</a>)</li>
<li>Soportada la creación de colecciones con descripción<a href="https://github.com/milvus-io/milvus/pull/40028">(#40028</a>)</li>
<li>[2.5] Exportado el intervalo de tiempo de espera de solicitud de índice en la configuración<a href="https://github.com/milvus-io/milvus/pull/40118">(#40118</a>)</li>
<li>[2.5] Sincronizado el valor por defecto de proxy.maxTaskNum a 1024<a href="https://github.com/milvus-io/milvus/pull/40073">(#40073</a>)</li>
<li>Disminuido el límite de instantáneas de volcado de 10w a 1w<a href="https://github.com/milvus-io/milvus/pull/40102">(#40102</a>)</li>
<li>[2.5] Evitada la copia de string a slice bytes para batch pk existe<a href="https://github.com/milvus-io/milvus/pull/40097">(#40097</a>)</li>
<li>Soportado devolver propiedades configurables al describir índice<a href="https://github.com/milvus-io/milvus/pull/40043">(#40043</a>)</li>
<li>Optimizado el rendimiento de expresiones para ciertos puntos<a href="https://github.com/milvus-io/milvus/pull/39938">(#39938</a>)</li>
<li>[2.5] Optimizado el formato del resultado de getQueryNodeDistribution<a href="https://github.com/milvus-io/milvus/pull/39926">(#39926</a>)</li>
<li>[cp25] Habilitada la observación de la amplificación de escritura<a href="https://github.com/milvus-io/milvus/pull/39743">(#39743</a>)</li>
<li>[2.5] Devolución de resultados top-k al buscar en RESTful v2<a href="https://github.com/milvus-io/milvus/pull/39839">(#39839</a>)</li>
<li>[2.5][GoSDK] Añadido azúcar sintáctico withEnableMatch<a href="https://github.com/milvus-io/milvus/pull/39853">(#39853</a>)</li>
<li>2.5] [2.5] El índice provisional admite diferentes tipos de índice y más tipos de datos (FP16/BF16)<a href="https://github.com/milvus-io/milvus/pull/39180">(#39180</a>)</li>
<li>[GoSDK][2.5] Sincronizados los commits de GoSDK desde la rama master<a href="https://github.com/milvus-io/milvus/pull/39823">(#39823</a>)</li>
<li>Mantenida consistencia de memoria y meta de emisor<a href="https://github.com/milvus-io/milvus/pull/39721">(#39721</a>)</li>
<li>Emisión con notificación basada en eventos<a href="https://github.com/milvus-io/milvus/pull/39550">(#39550</a>)</li>
<li>[2.5] Refinado el mensaje de error para la comprobación de esquemas e índices<a href="https://github.com/milvus-io/milvus/pull/39565">(#39565</a>)</li>
<li>[2.5] Restablecer el tipo de índice automático predeterminado para escalar<a href="https://github.com/milvus-io/milvus/pull/39820">(#39820</a>)</li>
<li>[2.5] Puesta en cola de la tarea de compactación L0 cuando falla la precomprobación<a href="https://github.com/milvus-io/milvus/pull/39871">(#39871</a>)</li>
</ul>
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 23 de enero de 2025</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Nos complace anunciar el lanzamiento de Milvus 2.5.4, que introduce optimizaciones clave del rendimiento y nuevas características como el aislamiento PartitionKey, Sparse Index con DAAT MaxScore y mecanismos de bloqueo mejorados. Un aspecto destacado de esta versión es su compatibilidad con 10.000 colecciones y 1 millón de particiones, lo que marca un hito importante para los casos de uso multiusuario. Esta versión también soluciona varios errores que mejoran la estabilidad y fiabilidad generales; dos de los errores críticos pueden causar la pérdida de datos. Le animamos a que actualice o pruebe esta última versión, ¡y esperamos sus comentarios para ayudarnos a perfeccionar Milvus continuamente!</p>
<h3 id="Features" class="common-anchor-header">Características</h3><ul>
<li>Soporta el aislamiento PartitionKey para mejorar el rendimiento con múltiples claves de partición<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>). Para obtener más información, consulte <a href="/docs/es/use-partition-key.md">Utilizar Partition Key</a>.</li>
<li>Sparse Index ahora soporta DAAT MaxScore <a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015</a>. Para obtener más información, consulte <a href="/docs/es/sparse_vector.md">Vector disperso</a>.</li>
<li>Añade soporte para <code translate="no">is_null</code> en expresión<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)</li>
<li>Se pueden personalizar los privilegios de root<a href="https://github.com/milvus-io/milvus/pull/39324">(#39324</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Soporta 10K colecciones y 1million particiones en un cluster<a href="https://github.com/milvus-io/milvus/pull/37630">(#37630</a>)</li>
<li>Información delta de segmentos en caché para acelerar el Coordinador de consultas<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>Lectura concurrente de metadatos a nivel de colección para acelerar la recuperación en caso de fallo<a href="https://github.com/milvus-io/milvus/pull/38900">(#38900</a>)</li>
<li>Granularidad de bloqueo refinada en QueryNode<a href="https://github.com/milvus-io/milvus/pull/39282">(#39282</a>),<a href="https://github.com/milvus-io/milvus/pull/38907">(#38907</a>)</li>
<li>Estilo unificado mediante el uso de CStatus para gestionar las llamadas a NewCollection CGO<a href="https://github.com/milvus-io/milvus/pull/39303">(#39303</a>)</li>
<li>Se ha omitido la generación del limitador de partición si no se establece ninguna partición<a href="https://github.com/milvus-io/milvus/pull/38911">(#38911</a>)</li>
<li>Se ha añadido más compatibilidad con la API RESTful<a href="https://github.com/milvus-io/milvus/pull/38875">(#38875</a>)<a href="https://github.com/milvus-io/milvus/pull/39425">(#39425</a>)</li>
<li>Eliminación de filtros Bloom innecesarios en QueryNode y DataNode para reducir el uso de memoria<a href="https://github.com/milvus-io/milvus/pull/38913">(#38913</a>)</li>
<li>Aceleración de la carga de datos mediante la aceleración de la generación, programación y ejecución de tareas en QueryCoord<a href="https://github.com/milvus-io/milvus/pull/38905">(#38905</a>)</li>
<li>Reducción del bloqueo en DataCoord para acelerar las operaciones de carga e inserción<a href="https://github.com/milvus-io/milvus/pull/38904">(nº 38904</a>).</li>
<li>Adición de nombres de campo primario en <code translate="no">SearchResult</code> y <code translate="no">QueryResults</code> <a href="https://github.com/milvus-io/milvus/pull/39222">(#39222</a>)</li>
<li>Utilización del tamaño del binlog y del tamaño del índice como estándar de limitación de la cuota de disco<a href="https://github.com/milvus-io/milvus/pull/38844">(#38844</a>)</li>
<li>Optimizado el uso de memoria para la búsqueda de texto completo knowhere/#1011</li>
<li>Añadido control de versiones para índices escalares<a href="https://github.com/milvus-io/milvus/pull/39236">(#39236</a>)</li>
<li>Mejora de la velocidad de obtención de información de colección de RootCoord evitando copias innecesarias<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>)</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">Corrección de errores críticos</h3><ul>
<li>Corregidos fallos de búsqueda para claves primarias con índices<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>Se ha corregido un posible problema de pérdida de datos causado por el reinicio de MixCoord y la descarga simultánea<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>)</li>
<li>Se ha corregido un error de eliminación provocado por una concurrencia incorrecta entre las tareas de estadísticas y la compactación L0 tras reiniciar MixCoord<a href="https://github.com/milvus-io/milvus/pull/39460">(nº 39460</a>).</li>
<li>Se ha corregido la incompatibilidad del índice invertido escalar al actualizar de 2.4 a 2.5<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Solucionados los problemas de consultas lentas causadas por la granularidad de bloqueo grueso durante la carga de múltiples columnas<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>Se ha corregido un problema por el que el uso de alias podía hacer que un iterador recorriera la base de datos incorrecta<a href="https://github.com/milvus-io/milvus/pull/39248">(nº 39248</a>).</li>
<li>Se ha corregido un fallo en la actualización de grupos de recursos al modificar la base de datos<a href="https://github.com/milvus-io/milvus/pull/39356">(nº 39356</a>).</li>
<li>Se ha corregido un problema esporádico por el que el índice tantivy no podía eliminar los archivos de índice durante la liberación<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)</li>
<li>Corregida la lentitud de indexación causada por tener demasiados hilos<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>Se ha solucionado un problema que impedía que se omitieran las comprobaciones de cuota de disco durante la importación masiva<a href="https://github.com/milvus-io/milvus/pull/39319">(nº 39319</a>).</li>
<li>Resueltos los problemas de congelación causados por demasiados consumidores de cola de mensajes limitando la concurrencia<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>)</li>
<li>Corregidos los tiempos de espera de las consultas causados por los reinicios de MixCoord durante las compactaciones a gran escala<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>)</li>
<li>Solucionados los problemas de desequilibrio de canales causados por el tiempo de inactividad de los nodos<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>)</li>
<li>Arreglado un problema que podía provocar que el balance de canales se atascara.<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
<li>Se ha solucionado un problema por el que las comprobaciones de nivel de privilegio de grupos personalizados RBAC resultaban ineficaces<a href="https://github.com/milvus-io/milvus/pull/39224">(#39224</a>)</li>
<li>Corregido un fallo al recuperar el número de filas en índices vacíos<a href="https://github.com/milvus-io/milvus/pull/39210">(#39210</a>)</li>
<li>Corrección de la estimación incorrecta de memoria para segmentos pequeños<a href="https://github.com/milvus-io/milvus/pull/38909">(#38909</a>)</li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 13 de enero de 2025</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.3 ofrece correcciones de errores críticos y mejoras de rendimiento para mejorar la estabilidad general, la fiabilidad y la facilidad de uso. Esta versión perfecciona la gestión de la concurrencia, refuerza la indexación y recuperación de datos y actualiza varios componentes clave para una experiencia de usuario más sólida.</p>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Se ha corregido un problema por el que el uso de un filtro <code translate="no">IN</code> en una clave primaria <code translate="no">VARCHAR</code> podía devolver resultados vacíos.<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
<li>Se ha corregido un problema de concurrencia entre las operaciones de consulta y eliminación que podía dar lugar a resultados incorrectos.<a href="https://github.com/milvus-io/milvus/pull/39054">(#39054</a>)</li>
<li>Se ha corregido un fallo provocado por el filtrado iterativo cuando un <code translate="no">expr</code> estaba vacío en una solicitud de consulta.<a href="https://github.com/milvus-io/milvus/pull/39034">(#39034</a>)</li>
<li>Se ha corregido un problema por el que un error de disco durante la actualización de la configuración provocaba el uso de los ajustes de configuración predeterminados.<a href="https://github.com/milvus-io/milvus/pull/39072">(#39072</a>)</li>
<li>Se ha corregido una posible pérdida de datos eliminados debido a la compactación de agrupaciones.<a href="https://github.com/milvus-io/milvus/pull/39133">(#39133</a>)</li>
<li>Se ha corregido una consulta de coincidencia de texto rota en segmentos de datos crecientes.<a href="https://github.com/milvus-io/milvus/pull/39113">(#39113</a>)</li>
<li>Se han corregido los fallos de recuperación provocados porque el índice no contenía los datos originales para vectores dispersos.<a href="https://github.com/milvus-io/milvus/pull/39146">(#39146</a>)</li>
<li>Se ha corregido una posible condición de carrera de campo de columna causada por la consulta y la carga de datos simultáneas.<a href="https://github.com/milvus-io/milvus/pull/39152">(#39152</a>)</li>
<li>Se han corregido los fallos de inserción masiva cuando los campos nullable o default_value no se incluían en los datos.<a href="https://github.com/milvus-io/milvus/pull/39111">(#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Añadida una API de grupo de recursos para la interfaz RESTful.<a href="https://github.com/milvus-io/milvus/pull/39092">(#39092</a>)</li>
<li>Optimizado el rendimiento de recuperación aprovechando los métodos SIMD del conjunto de bits.<a href="https://github.com/milvus-io/milvus/pull/39041">(#39041</a>)</li>
<li>Utilizado MVCC timestamp como el timestamp de garantía cuando se especifica.<a href="https://github.com/milvus-io/milvus/pull/39019">(#39019</a>)</li>
<li>Añadidas métricas de borrado que faltaban.<a href="https://github.com/milvus-io/milvus/pull/38747">(#38747</a>)</li>
<li>Actualizado Etcd a la versión v3.5.16.<a href="https://github.com/milvus-io/milvus/pull/38969">(#38969</a>)</li>
<li>Creado un nuevo paquete Go para gestionar protos.<a href="https://github.com/milvus-io/milvus/pull/39128">(#39128</a>)</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 3 de enero de 2025</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>Milvus 2.5.2 permite modificar la longitud máxima de las columnas VARCHAR y resuelve varios problemas críticos relacionados con la concurrencia, las caídas de particiones y la gestión de estadísticas BM25 durante la importación. Recomendamos encarecidamente actualizar a esta versión para mejorar la estabilidad y el rendimiento.</p>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Generación de registros de uso de disco sólo cuando la ruta especificada no existe.<a href="https://github.com/milvus-io/milvus/pull/38822">(#38822</a>)</li>
<li>Se ha añadido un parámetro para ajustar la longitud máxima de VARCHAR y se ha restaurado el límite a 65.535.<a href="https://github.com/milvus-io/milvus/pull/38883">(#38883</a>)</li>
<li>Soportada conversión de tipo de parámetro para expresiones.<a href="https://github.com/milvus-io/milvus/pull/38782">(#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Corrección de posibles bloqueos en escenarios de concurrencia.<a href="https://github.com/milvus-io/milvus/pull/38863">(#38863</a>)</li>
<li>Generación del archivo index_null_offset sólo para campos que admiten valores nulos.<a href="https://github.com/milvus-io/milvus/pull/38834">(#38834</a>)</li>
<li>Se ha corregido el uso del plan de recuperación después de liberar en la fase de reducción.<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
<li>Reconocidas expresiones con AND y OR en mayúsculas.<a href="https://github.com/milvus-io/milvus/pull/38928">(#38928</a>)</li>
<li>Permitida la caída exitosa de particiones incluso si la carga falló.<a href="https://github.com/milvus-io/milvus/pull/38874">(#38874</a>)</li>
<li>Arreglados los problemas de registro del archivo de estadísticas BM25 durante la importación.<a href="https://github.com/milvus-io/milvus/pull/38881">(#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 26 de diciembre de 2024</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.1 se centra en una serie de correcciones de errores que abordan la carga de memoria, los listados RBAC, el equilibrio de nodos de consulta y la indexación de segmentos sellados, al tiempo que mejora la interfaz de usuario web y los interceptores. Recomendamos encarecidamente la actualización a 2.5.1 para mejorar la estabilidad y la fiabilidad.</p>
<h3 id="Improvement" class="common-anchor-header">Mejoras</h3><ul>
<li>Actualización de las páginas de recopilación y consulta de la interfaz web.<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Corregidos los problemas de OOM añadiendo un factor de memoria a las estimaciones de carga.<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>Corregida la expansión de grupos de privilegios al listar políticas en RootCoord.<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>Corrección de problemas al listar grupos de privilegios y colecciones.<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>Corregido el balanceador para evitar sobrecargar repetidamente el mismo nodo de consulta.<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>Corregidas tareas de balanceo inesperadas que se activaban tras reiniciar QueryCoord.<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>Corregidas las actualizaciones de configuración de carga que no se aplicaban a las colecciones de carga.<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>Se ha corregido el recuento de cero lecturas durante la importación de datos.<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>Corregida la decodificación Unicode para claves JSON en expresiones.<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>Corregido el nombre del interceptor DB para alterCollectionField en 2.5. <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>Se han corregido los parámetros de índice vacíos para segmentos sellados al utilizar la búsqueda de fuerza bruta BM25.<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 23 de diciembre de 2024</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0 aporta avances significativos para mejorar la facilidad de uso, la escalabilidad y el rendimiento para los usuarios que se ocupan de la búsqueda vectorial y la gestión de datos a gran escala. Con esta versión, Milvus integra nuevas y potentes funciones como la búsqueda basada en términos, la compactación de clústeres para optimizar las consultas y la compatibilidad versátil con métodos de búsqueda vectorial dispersa y densa. Las mejoras en la gestión de clusters, indexación y manejo de datos introducen nuevos niveles de flexibilidad y facilidad de uso, haciendo de Milvus una base de datos vectorial aún más robusta y fácil de usar.</p>
<h3 id="Key-Features" class="common-anchor-header">Características principales</h3><h4 id="Full-Text-Search" class="common-anchor-header">Búsqueda de texto completo</h4><p>Milvus 2.5 es compatible con la búsqueda de texto completo implementada con Sparse-BM25. Esta función es un complemento importante de las potentes capacidades de búsqueda semántica de Milvus, especialmente en situaciones en las que intervienen palabras raras o términos técnicos. En versiones anteriores, Milvus soportaba vectores dispersos para ayudar en escenarios de búsqueda de palabras clave. Estos vectores dispersos se generaban fuera de Milvus mediante modelos neuronales como SPLADEv2/BGE-M3 o modelos estadísticos como el algoritmo BM25.</p>
<p>Desarrollado por <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, Milvus 2.5 incorpora analizadores y extracción de vectores dispersos, ampliando la API de sólo recibir vectores como entrada a aceptar directamente texto. La información estadística de BM25 se actualiza en tiempo real a medida que se introducen los datos, lo que mejora la facilidad de uso y la precisión. Además, los vectores dispersos basados en algoritmos de aproximación al vecino más cercano (RNA) ofrecen un rendimiento más potente que los sistemas estándar de búsqueda por palabras clave.</p>
<p>Para obtener más información, consulte <a href="/docs/es/analyzer-overview.md">Visión general del analizador</a> y <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">WebUI de gestión de clústeres (Beta)</h4><p>Para soportar mejor los datos masivos y las ricas funciones, el sofisticado diseño de Milvus incluye varias dependencias, numerosos roles de nodo, estructuras de datos complejas y mucho más. Estos aspectos pueden plantear retos de uso y mantenimiento.</p>
<p>Milvus 2.5 introduce una WebUI integrada de gestión de clústeres, que reduce la dificultad de mantenimiento del sistema mediante la visualización de la compleja información del entorno de ejecución de Milvus. Esto incluye detalles de bases de datos y colecciones, segmentos, canales, dependencias, estado de salud de los nodos, información de tareas, consultas lentas y más.</p>
<p>Para más detalles, consulte <a href="/docs/es/milvus-webui.md">Milvus WebUI</a>.</p>
<h4 id="Text-Match" class="common-anchor-header">Coincidencia de texto</h4><p>Milvus 2.5 aprovecha los analizadores y la indexación de <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> para el preprocesamiento de texto y la creación de índices, soportando la correspondencia precisa de lenguaje natural de datos de texto basados en términos específicos. Esta función se utiliza principalmente para la búsqueda filtrada para satisfacer condiciones específicas y puede incorporar el filtrado escalar para refinar los resultados de la consulta, permitiendo búsquedas de similitud dentro de vectores que cumplen criterios escalares.</p>
<p>Para obtener más información, consulte <a href="/docs/es/analyzer-overview.md">Visión general del analizador</a> y <a href="/docs/es/keyword-match.md">Coincidencia de texto</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">Índice de mapa de bits</h4><p>Se ha añadido un nuevo índice de datos escalares a la familia Milvus. El índice BitMap utiliza una matriz de bits, de longitud igual al número de filas, para representar la existencia de valores y acelerar las búsquedas.</p>
<p>Tradicionalmente, los índices Bitmap han sido eficaces para campos de baja cardinalidad, que tienen un número modesto de valores distintos; por ejemplo, una columna que contiene información sobre el sexo con sólo dos valores posibles: masculino y femenino.</p>
<p>Para obtener más información, consulte <a href="/docs/es/bitmap.md">Índice de mapa de bits</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Anulable y valor por defecto</h4><p>Milvus permite ahora establecer propiedades anulables y valores por defecto para campos escalares distintos del campo de clave primaria. Para los campos escalares marcados como <code translate="no">nullable=True</code>, los usuarios pueden omitir el campo al insertar datos; el sistema lo tratará como un valor nulo o un valor por defecto (si está establecido) sin lanzar un error.</p>
<p>Los valores por defecto y las propiedades anulables proporcionan una mayor flexibilidad a Milvus. Los usuarios pueden utilizar esta característica para campos con valores inciertos al crear colecciones. También simplifica la migración de datos desde otros sistemas de bases de datos a Milvus, permitiendo el manejo de conjuntos de datos que contienen valores nulos mientras se preserva la configuración original del valor por defecto.</p>
<p>Para más detalles, consulte <a href="/docs/es/nullable-and-default.md">Nullable &amp; Default Value</a>.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">HNSW SQ/PQ/PRQ basado en Faiss</h4><p>Gracias a la estrecha colaboración con la comunidad de Faiss, el algoritmo HNSW de Faiss ha experimentado mejoras significativas tanto en funcionalidad como en rendimiento. Por consideraciones de estabilidad y mantenimiento, Milvus 2.5 ha migrado oficialmente su soporte para HNSW de hnswlib a Faiss.</p>
<p>Basado en Faiss, Milvus 2.5 soporta múltiples métodos de cuantificación en HNSW para satisfacer las necesidades de diferentes escenarios: SQ (Scalar Quantizers), PQ (Product Quantizer), y PRQ (Product Residual Quantizer). SQ y PQ son los más comunes; SQ ofrece un buen rendimiento de consulta y velocidad de construcción, mientras que PQ ofrece una mejor recuperación con la misma relación de compresión. Muchas bases de datos vectoriales suelen utilizar la cuantificación binaria, que es una forma sencilla de cuantificación SQ.</p>
<p>PRQ es una fusión de PQ y AQ (cuantificador aditivo). En comparación con PQ, requiere tiempos de compilación más largos para ofrecer una mejor recuperación, especialmente con tasas de compresión altas, diciendo compresión binaria.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">Compactación en clústeres (Beta)</h4><p>Milvus 2.5 introduce la compactación por agrupamiento para acelerar las búsquedas y reducir los costes en grandes colecciones. Al especificar un campo escalar como clave de agrupación, los datos se redistribuyen por rangos para optimizar el almacenamiento y la recuperación. Actuando como un índice global, esta función permite a Milvus podar eficazmente los datos durante las consultas basándose en metadatos de agrupación, mejorando el rendimiento de la búsqueda cuando se aplican filtros escalares.</p>
<p>Para obtener más información, consulte <a href="/docs/es/clustering-compaction.md">Compactación</a> de <a href="/docs/es/clustering-compaction.md">agrupaciones</a>.</p>
<h3 id="Other-Features" class="common-anchor-header">Otras funciones</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">Nodo de streaming (Beta)</h4><p>Milvus 2.5 introduce un nuevo componente llamado nodo de streaming, que proporciona servicios de registro de escritura en cabeza (WAL). Esto permite a Milvus lograr consenso antes y después de leer y escribir canales, desbloqueando nuevas características, funcionalidades y optimizaciones. Esta característica está desactivada por defecto en Milvus 2.5 y estará disponible oficialmente en la versión 3.0.</p>
<h4 id="IPv6-Support" class="common-anchor-header">Soporte IPv6</h4><p>Milvus es ahora compatible con IPv6, lo que permite una mayor conectividad de red y compatibilidad.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">Importación masiva de CSV</h4><p>Además de los formatos JSON y Parquet, Milvus admite ahora la importación masiva directa de datos en formato CSV.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">Plantillas de expresiones para acelerar las consultas</h4><p>Milvus soporta ahora plantillas de expresiones, mejorando la eficiencia del análisis sintáctico de expresiones, particularmente en escenarios con expresiones complejas.</p>
<p>Para más detalles, consulte <a href="/docs/es/filtering-templating.md">Plantillas de filtros</a>.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">Mejoras en GroupBy</h4><ul>
<li><strong>Tamaño de grupo personalizable</strong>: Se ha añadido la posibilidad de especificar el número de entradas devueltas para cada grupo.</li>
<li><strong>Búsqueda híbrida GroupBy</strong>: Admite la búsqueda híbrida GroupBy basada en varias columnas vectoriales.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">Mejoras del iterador</h4><ul>
<li><strong>Compatibilidad con MVCC</strong>: Ahora los usuarios pueden utilizar iteradores sin verse afectados por cambios posteriores en los datos, como inserciones y eliminaciones, gracias al control de concurrencia multiversión (MVCC).</li>
<li><strong>Cursor persistente</strong>: Milvus soporta ahora un cursor persistente para QueryIterator, permitiendo a los usuarios reanudar la iteración desde la última posición después de un reinicio de Milvus sin necesidad de reiniciar todo el proceso de iteración.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><h4 id="Deletion-Optimization" class="common-anchor-header">Optimización del borrado</h4><p>Mejorada la velocidad y reducido el uso de memoria para borrados a gran escala optimizando el uso de bloqueos y la gestión de memoria.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">Actualización de dependencias</h4><p>Actualizado a ETCD 3.5.16 y Pulsar 3.0.7 LTS, corrigiendo CVEs existentes y mejorando la seguridad. Nota: La actualización a Pulsar 3.x no es compatible con las versiones anteriores 2.x.</p>
<p>Los usuarios que ya dispongan de una implantación de Milvus en funcionamiento deberán actualizar los componentes ETCD y Pulsar antes de poder utilizar las nuevas características y funciones. Para más detalles, consulte <a href="/docs/es/upgrade-pulsar-v3.md">Actualización de Pulsar de 2.x a 3.x</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">Almacenamiento local V2</h4><p>Introdujo un nuevo formato de archivo local en Milvus 2.5, mejorando la eficiencia de carga y consulta para datos escalares, reduciendo la sobrecarga de memoria y sentando las bases para futuras optimizaciones.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">Optimización del análisis sintáctico de expresiones</h4><p>Se ha mejorado el análisis sintáctico de expresiones implementando el almacenamiento en caché para expresiones repetidas, actualizando ANTLR y optimizando el rendimiento de las cláusulas <code translate="no">NOT IN</code>.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">Mejora del rendimiento de la concurrencia de DDL</h4><p>Se ha optimizado el rendimiento de la concurrencia de las operaciones del lenguaje de definición de datos (DDL).</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">Alineación de las funciones de la API RESTful</h4><p>Alineación de las funcionalidades de la API RESTful con otros SDK para mayor coherencia.</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">Actualizaciones de seguridad y configuración</h4><p>Soporte de TLS para asegurar la comunicación entre nodos en entornos más complejos o empresariales. Para obtener más información, consulte <a href="/docs/es/tls.md">Configuración de seguridad</a>.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">Mejoras en el rendimiento de la compactación</h4><p>Se han eliminado las limitaciones de segmentos máximos en la compactación mixta y ahora se da prioridad a los segmentos más pequeños, lo que mejora la eficacia y acelera las consultas en conjuntos de datos grandes o fragmentados.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">Equilibrio de canales basado en la puntuación</h4><p>Se ha introducido una política que equilibra dinámicamente las cargas entre canales, lo que mejora la utilización de los recursos y la estabilidad general en las implantaciones a gran escala.</p>
