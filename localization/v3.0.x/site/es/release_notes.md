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
    </button></h1><p>¡Descubre las novedades de Milvus! En esta página se resumen las nuevas funciones, las mejoras, los problemas conocidos y las correcciones de errores de cada versión. Te recomendamos que visites esta página con regularidad para estar al tanto de las actualizaciones.</p>
<h2 id="v302" class="common-anchor-header">v3.0.2<button data-href="#v302" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 20 de septiembre de 2026</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th><th>Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.2</td><td>3.0.2</td><td>3.0.6</td><td>3.0.10</td><td>3.0.2</td></tr>
</tbody>
</table>
<p>¡Nos complace anunciar el lanzamiento de Milvus v3.0.2! Esta versión se centra en el rendimiento de las búsquedas y consultas —eliminando la contienda en las rutas más transitadas en las búsquedas filtradas, las agrupaciones y la creación de índices—, junto con una mayor compatibilidad con colecciones externas y Storage V2, y un amplio conjunto de correcciones de estabilidad en las áreas de transmisión, compactación y gestión de índices.</p>
<h3 id="Improvements" class="common-anchor-header">Mejoras<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Se ha optimizado el filtrado ARRAY fusionando los predicados «contains» encadenados en una única expresión « <code translate="no">ContainsAny</code> » / «<code translate="no">ContainsAll</code> » en el planificador de consultas (<a href="https://github.com/milvus-io/milvus/pull/52365">#52365</a>)</li>
<li>Se ha añadido compatibilidad con puntos finales personalizados compatibles con S3 en colecciones externas mediante la opción « <code translate="no">extfs.endpoint_url</code> », con validación de configuraciones de puntos finales inseguras o conflictivas (<a href="https://github.com/milvus-io/milvus/pull/52814">#52814</a>)</li>
<li>Se han unificado los filtros de pertenencia Bloom y Roaring en una única expresión <code translate="no">membership_match</code>, con la correspondiente compatibilidad del cliente Go para crear y consultar ambos tipos de filtro (<a href="https://github.com/milvus-io/milvus/pull/53019">#53019</a>)</li>
<li>Se ha reducido la amplificación de escritura durante la creación de índices basados en Tantivy, lo que disminuye la E/S de disco para los índices de coincidencia de texto, NGRAM y estadísticas de claves JSON (<a href="https://github.com/milvus-io/milvus/pull/53057">#53057</a>)</li>
<li>Se ha añadido un control de admisión en los puntos finales DQL RESTful v2 que devuelve un código de estado HTTP 429 con « <code translate="no">Retry-After</code> » antes de la decodificación de la solicitud cuando la cola de consultas del proxy está llena (<a href="https://github.com/milvus-io/milvus/pull/53111">#53111</a>)</li>
<li>Se ha reducido un punto crítico de recuento de referencias atómico en la ruta de evaluación de filtros escalares que representaba aproximadamente el 48 % del tiempo de CPU de las hojas en las búsquedas, lo que ha mejorado el rendimiento de las búsquedas filtradas (<a href="https://github.com/milvus-io/milvus/pull/53167">#53167</a>)</li>
<li>Se ha mejorado la escalabilidad del grupo de subprocesos de almacenamiento sustituyendo la implementación personalizada por « <code translate="no">folly::CPUThreadPoolExecutor</code> » y restableciendo el escalado elástico de los trabajadores (<a href="https://github.com/milvus-io/milvus/pull/53184">#53184</a>)</li>
<li>Se ha mejorado la coincidencia de los registros de acceso REST, de modo que los formateadores se comparan con la ruta de la URL analizada, y los métodos configurados ahora se aplican a las solicitudes que llevan parámetros de consulta (<a href="https://github.com/milvus-io/milvus/pull/53147">#53147</a>)</li>
<li>Se ha añadido compatibilidad con la difusión idempotente, de modo que las solicitudes reintentadas ya no crean tareas duplicadas, siendo <code translate="no">BulkImport</code> el primero en adoptarla (<a href="https://github.com/milvus-io/milvus/pull/53228">#53228</a>)</li>
<li>Se han añadido caracteres configurables de separación de frases para el tokenizador Lindera, lo que permite que las entradas del diccionario de usuario que contengan signos de puntuación se coincidan como un único token (<a href="https://github.com/milvus-io/milvus/pull/53287">#53287</a>)</li>
<li>Se ha añadido un control de versión del clúster que habilita automáticamente la materialización de funciones «write-before» solo después de que todos los nodos hayan finalizado la actualización, evitando así la inconsistencia por versiones mixtas durante las actualizaciones progresivas (<a href="https://github.com/milvus-io/milvus/pull/53261">#53261</a>)</li>
<li>Se ha actualizado Woodpecker a la versión v0.1.42, corrigiendo los fallos de recuperación de WAL en segmentos vacíos finalizados y mejorando la estabilidad y las métricas de la ruta de anexión (<a href="https://github.com/milvus-io/milvus/pull/53295">#53295</a>).</li>
<li>Se ha reducido la sobrecarga atómica y de recuento de referencias por fragmento en la ruta principal de búsqueda y consulta, fijando una instantánea del segmento sellado una vez por solicitud (<a href="https://github.com/milvus-io/milvus/pull/53301">#53301</a>)</li>
<li>Se ha mejorado la latencia de las actualizaciones parciales sustituyendo las esperas de TimeTick por un bloqueo optimista basado en instantáneas, y se ha perfeccionado el manejo de AutoID para que se conserven las claves primarias existentes y los ID devueltos mantengan el orden de entrada (<a href="https://github.com/milvus-io/milvus/pull/53337">#53337</a>).</li>
<li>Se ha reducido la construcción redundante de vistas de filas al agrupar resultados de búsqueda por campos VARCHAR o JSON en segmentos sellados, lo que reduce la sobrecarga de las búsquedas agrupadas (<a href="https://github.com/milvus-io/milvus/pull/53500">#53500</a>)</li>
<li>Se ha añadido una API de cumplimiento que informa de la convergencia de la configuración de carga a nivel global y por grupo de recursos, abarcando la operatividad de las réplicas, la visibilidad de las consultas, los recursos residuales y la ubicación del WAL (n.<a href="https://github.com/milvus-io/milvus/pull/53517">º 53517</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcciones de errores<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Se ha corregido un problema por el que las consultas podían devolver resultados incorrectos después de eliminar y volver a añadir un campo de matriz de estructuras (<a href="https://github.com/milvus-io/milvus/pull/52921">#52921</a>)</li>
<li>Se han corregido los errores de autenticación SASL/SCRAM-SHA-256 al conectarse a brokers de Apache Kafka 4.x mediante la actualización de librdkafka a la versión 2.6.1 (<a href="https://github.com/milvus-io/milvus/pull/53086">#53086</a>)</li>
<li>Se ha corregido un problema por el que todos los canales de una réplica se asignaban a un único nodo de consulta, lo que provocaba repetidas interrupciones por falta de memoria y dejaba la réplica inoperativa (<a href="https://github.com/milvus-io/milvus/pull/53094">#53094</a>)</li>
<li>Se ha corregido el «fencing» repetido de WAL que bloqueaba las escrituras en un PChannel durante 45-60 segundos cada pocos minutos bajo una ingesta sostenida (<a href="https://github.com/milvus-io/milvus/pull/53118">#53118</a>)</li>
<li>Se ha corregido un error por el que la compactación de Storage V2 eliminaba rutas de grupo físicas válidas, lo que podía desalinear los índices de columnas empaquetadas en los segmentos compactados (<a href="https://github.com/milvus-io/milvus/pull/53202">#53202</a>)</li>
<li>Se ha corregido un error por el que los registros de compactación mostraban claves de cifrado de la colección y credenciales de almacenamiento de objetos (<a href="https://github.com/milvus-io/milvus/pull/53226">#53226</a>).</li>
<li>Se ha corregido un problema con alias de desplazamiento de matrices de estructuras obsoletas que podían mostrar datos incorrectos tras la reapertura de un segmento sellado (<a href="https://github.com/milvus-io/milvus/pull/53154">#53154</a>)</li>
<li>Se ha corregido un error por el que la sincronización de recursos de archivo se ejecutaba antes de que se añadiera ningún recurso, lo que podía borrar los archivos locales del nodo al inicio o al registrar el nodo (<a href="https://github.com/milvus-io/milvus/pull/53170">#53170</a>)</li>
<li>Se ha corregido un problema por el que un fragmento de binlog incompleto podía tratarse de forma silenciosa como si se hubiera leído por completo, con el riesgo de que faltaran datos en los resultados de las consultas y la compactación (<a href="https://github.com/milvus-io/milvus/pull/53263">#53263</a>)</li>
<li>Se ha corregido un problema por el que el almacenamiento de los segmentos eliminados nunca se recuperaba para colecciones sin ningún índice activo (<a href="https://github.com/milvus-io/milvus/pull/53252">#53252</a>)</li>
<li>Se ha corregido una estimación inexacta de los recursos al cargar índices vectoriales dispersos, lo que podía provocar un manejo incorrecto de los datos sin procesar y advertencias repetidas en QueryNode (<a href="https://github.com/milvus-io/milvus/pull/53249">#53249</a>)</li>
<li>Se ha corregido un problema por el que un nodo de streaming congelado fuera del grupo de recursos principal podía descongelarse inesperadamente durante el reequilibrio (<a href="https://github.com/milvus-io/milvus/pull/53229">#53229</a>)</li>
<li>Se ha corregido un error de conexión a Google Cloud Storage cuando las credenciales de GCP (IAM y HMAC) no se habían registrado antes de la comprobación previa del gestor de fragmentos (<a href="https://github.com/milvus-io/milvus/pull/53288">#53288</a>)</li>
<li>Se ha corregido un problema por el que los registros de C++ se escribían inesperadamente en el directorio « <code translate="no">/tmp</code> » en lugar de reenviarse a la salida de registros unificada (<a href="https://github.com/milvus-io/milvus/pull/53293">#53293</a>)</li>
<li>Se ha corregido un error por el que las confirmaciones de relleno fallaban con un error HTTP 500 cuando un resultado de Spark abarcaba varias particiones (<a href="https://github.com/milvus-io/milvus/pull/53346">#53346</a>)</li>
<li>Se ha corregido una fuga de memoria en DataNode en la que una tarea de creación de índices o de análisis cancelada nunca liberaba la memoria nativa del objeto que ya había creado (<a href="https://github.com/milvus-io/milvus/pull/53348">#53348</a>)</li>
<li>Se ha corregido un problema por el que la importación de binlog fallaba cuando un campo vectorial nulo no tenía archivos binlog (<a href="https://github.com/milvus-io/milvus/pull/53363">#53363</a>)</li>
<li>Se han corregido campos de salida incompletos o incorrectos cuando las solicitudes de búsqueda y consulta leían datos de tablas externas (<a href="https://github.com/milvus-io/milvus/pull/53372">#53372</a>, <a href="https://github.com/milvus-io/milvus/pull/53385">#53385</a>)</li>
<li>Se han corregido las filas de vectores dispersos y los ID de partición duplicados en las solicitudes REST, además de problemas de propiedad y limpieza de memoria que podían provocar fallos o fugas cuando las consultas finalizaban prematuramente (<a href="https://github.com/milvus-io/milvus/pull/53402">#53402</a>)</li>
<li>Se ha corregido un problema por el que una compactación que informaba de su finalización sin una carga útil de resultados podía provocar un fallo de DataCoord o dejar la tarea de compactación atascada en lugar de reintentarse correctamente (<a href="https://github.com/milvus-io/milvus/pull/53443">#53443</a>)</li>
<li>Se ha corregido un problema por el que se perdían las propiedades de los archivos de datos externos al crear manifiestos de segmentos, lo que provocaba que las colecciones externas perdieran los metadatos de los archivos de origen (<a href="https://github.com/milvus-io/milvus/pull/53444">#53444</a>)</li>
<li>Se ha corregido un fallo de QueryNode que podía producirse al gestionar solicitudes de tipo « <code translate="no">count(*)</code> » en el nivel de registro de depuración, especialmente durante las actualizaciones progresivas (<a href="https://github.com/milvus-io/milvus/pull/53474">#53474</a>)</li>
<li>Se ha corregido un problema por el que las tareas de creación de índices y estadísticas seguían consumiendo recursos de los trabajadores después de que su segmento, índice o colección se hubieran eliminado, y se ha mejorado la limpieza de los archivos de índice huérfanos (<a href="https://github.com/milvus-io/milvus/pull/53515">#53515</a>)</li>
<li>Se ha corregido la gestión de las rutas de almacenamiento local para que los datos escritos por diferentes componentes siempre se guarden donde los lectores y la recolección de basura esperan, con una actualización automática para las implementaciones locales existentes (<a href="https://github.com/milvus-io/milvus/pull/53530">#53530</a>)</li>
<li>Se ha corregido el problema por el que las tareas de creación de índices reintentaban indefinidamente cuando un segmento contenía documentos JSON mal formados; ahora, dichas creaciones fallan rápidamente en lugar de consumir recursos de los trabajadores indefinidamente (<a href="https://github.com/milvus-io/milvus/pull/53531">#53531</a>)</li>
<li>Se ha corregido el problema de las restauraciones simultáneas de instantáneas dirigidas a la misma colección: ahora las restauraciones se serializan y una restauración a un destino ya existente se rechaza con un error claro del tipo «ya existe en la base de datos», en lugar de provocar conflictos de acceso o fugas de recursos (<a href="https://github.com/milvus-io/milvus/pull/53586">#53586</a>).</li>
<li>Se ha corregido la corrupción de las claves de cifrado binario en las interfaces de almacenamiento y la desalineación de los cursores en los lectores empaquetados de Storage V2 proyectados mediante la actualización de milvus-storage (<a href="https://github.com/milvus-io/milvus/pull/53569">#53569</a>)</li>
</ul>
<h2 id="v301" class="common-anchor-header">v3.0.1<button data-href="#v301" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 9 de septiembre de 2026</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th><th>Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.1</td><td>3.0.1</td><td>3.0.5</td><td>3.0.9</td><td>3.0.1</td></tr>
</tbody>
</table>
<p>¡Nos complace anunciar el lanzamiento de Milvus v3.0.1! Esta versión incorpora la gestión de instantáneas REST v2, capacidades ampliadas de reordenación y compatibilidad con el campo TEXT en el cliente Go y la API RESTful, además de mejoras de rendimiento y correcciones relacionadas con Storage V3, la consistencia de los datos y la seguridad.</p>
<h3 id="Features-improvements" class="common-anchor-header">Mejoras en las funcionalidades<button data-href="#Features-improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Se han añadido API REST v2 para la gestión nativa de instantáneas en el ámbito de la colección y la restauración asíncrona (<a href="https://github.com/milvus-io/milvus/pull/52118">#52118</a>, <a href="https://github.com/milvus-io/milvus/pull/52172">#52172</a>)</li>
<li>Se ha añadido un umbral configurable para el recuento de resultados con el fin de controlar la selección de la ruta de salida de «Take» para operaciones de búsqueda y consulta (<a href="https://github.com/milvus-io/milvus/pull/52437">#52437</a>)</li>
<li>Se ha añadido compatibilidad con campos TEXT en el cliente Go y la API RESTful (<a href="https://github.com/milvus-io/milvus/pull/52450">#52450</a>)</li>
<li>Se han añadido tasas de IOPS de lectura iniciales y máximas configurables para las tablas externas (<a href="https://github.com/milvus-io/milvus/pull/52503">#52503</a>)</li>
<li>Se ha añadido una configuración opcional para que los trabajos de actualización de colecciones externas esperen hasta que todos los segmentos estén indexados antes de informar de la finalización, sin retrasar la publicación de datos (<a href="https://github.com/milvus-io/milvus/pull/52712">#52712</a>)</li>
<li>Se ha añadido compatibilidad con la reordenación L1 a las cadenas de funciones de búsqueda (<a href="https://github.com/milvus-io/milvus/pull/52745">#52745</a>)</li>
<li>Se ha añadido la reordenación ponderada de RRF con ponderaciones opcionales por solicitud ANN en FunctionScore, REST, la búsqueda híbrida heredada y el cliente Go (<a href="https://github.com/milvus-io/milvus/pull/52891">#52891</a>, <a href="https://github.com/milvus-io/milvus/pull/52926">#52926</a>)</li>
</ul>
<h3 id="Stability-improvements" class="common-anchor-header">Mejoras de estabilidad<button data-href="#Stability-improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Se ha mejorado la seguridad de la memoria en los índices y cachés RTree de geometría, así como el tratamiento de consultas WKB no analizables y de geometría vacía (<a href="https://github.com/milvus-io/milvus/pull/51312">#51312</a>)</li>
<li>Se ha mejorado la gestión de la memoria restaurando la asignación de memoria transitoria en todo el proceso y corrigiendo las estimaciones de memoria para la carga simultánea de campos de Storage V2/V3 y la carga de índices escalares V3 (<a href="https://github.com/milvus-io/milvus/pull/51405">#51405</a>)</li>
<li>Reducción de los cuellos de botella en la descarga y del uso de memoria durante la creación de índices de colecciones externas mediante la paralelización de las lecturas y la transmisión de datos vectoriales sin procesar al disco (<a href="https://github.com/milvus-io/milvus/pull/51651">#51651</a>)</li>
<li>Se ha mejorado el rendimiento de Woodpecker para cargas de trabajo de lotes pequeños y alta concurrencia mediante la agrupación en lotes de las adiciones de los clientes y la exposición de los ajustes de sincronización (<a href="https://github.com/milvus-io/milvus/pull/51810">#51810</a>)</li>
<li>Se ha mejorado la propiedad del lector de registros y la consistencia a lo largo de su ciclo de vida, el manejo de blobs vacíos y la notificación de errores de lectura en las rutas de almacenamiento y compactación (<a href="https://github.com/milvus-io/milvus/pull/51891">#51891</a>)</li>
<li>Se ha mejorado la eficiencia de la sonda de hash de agrupación mediante un canal entrelazado de cuatro vías y medidas de protección contra colisiones y límites de re-hash (<a href="https://github.com/milvus-io/milvus/pull/51977">#51977</a>)</li>
<li>Reducción de la sobrecarga de procesamiento de inserciones al omitir el análisis del cuerpo de la inserción en el WAL para colecciones sin campos de salida BM25 o MinHash (<a href="https://github.com/milvus-io/milvus/pull/51986">#51986</a>)</li>
<li>Se ha mejorado la notificación de fallos de almacenamiento y la gestión de reintentos conservando las clasificaciones de errores transitorios y permanentes en todas las capas de ejecución (<a href="https://github.com/milvus-io/milvus/pull/51990">#51990</a>)</li>
<li>Se ha mejorado el rendimiento de las consultas espaciales al habilitar de forma predeterminada la división en niveles gruesos y refinados de GIS y la fusión de predicados en la misma columna (<a href="https://github.com/milvus-io/milvus/pull/52008">#52008</a>)</li>
<li>Se ha mejorado la programación de tareas de indexación de texto y fragmentación de JSON mediante un control de admisión basado en una cola de trabajo compartida y una prioridad de envío alterna (<a href="https://github.com/milvus-io/milvus/pull/52010">#52010</a>)</li>
<li>Se ha añadido compatibilidad con mmap para las asignaciones de desplazamiento de segmentos sellados, con opciones de carga específicas y contabilidad de recursos de disco (<a href="https://github.com/milvus-io/milvus/pull/52035">#52035</a>)</li>
<li>Se ha optimizado la carga de datos de Storage V2 mediante la ejecución bajo demanda de estimaciones de memoria por fragmentos por columna (<a href="https://github.com/milvus-io/milvus/pull/52037">#52037</a>)</li>
<li>Se ha añadido compatibilidad con AutoIndex del lado del servidor para índices vinculados a campos de salida de nuevas funciones, lo que permite que las solicitudes add_function_field omitan los parámetros de índice o especifiquen AUTOINDEX (<a href="https://github.com/milvus-io/milvus/pull/52109">#52109</a>)</li>
<li>Se han reducido las cargas útiles de los informes de distribución de QueryNode mediante la generación incremental de informes con un informe completo como alternativa, y se han reducido las asignaciones de memoria durante la recopilación de métricas (<a href="https://github.com/milvus-io/milvus/pull/52111">#52111</a>, <a href="https://github.com/milvus-io/milvus/pull/52119">#52119</a>)</li>
<li>Se ha mejorado la solidez del hash de contraseñas aumentando el coste de bcrypt de 4 a 10; para actualizar los hashes existentes es necesaria la rotación de credenciales (<a href="https://github.com/milvus-io/milvus/pull/52145">#52145</a>)</li>
<li>Se ha reducido la decodificación redundante durante las importaciones de Parquet leyendo únicamente las columnas de hoja necesarias para los subcampos de las matrices de estructuras (<a href="https://github.com/milvus-io/milvus/pull/52224">#52224</a>)</li>
<li>Se ha mejorado la agrupación de fusiones forzadas mediante una planificación basada en el tamaño en varias rondas y se ha dejado de utilizar la configuración heredada del umbral de planificación (<a href="https://github.com/milvus-io/milvus/pull/52242">#52242</a>).</li>
<li>Se ha actualizado cgosymbolizer para evitar que los procesos de Milvus que se ejecutan como PID 1 se cuelguen tras fallos nativos (<a href="https://github.com/milvus-io/milvus/pull/52299">#52299</a>)</li>
<li>Se ha mejorado la validación del recuento de filas para las entradas de resaltado semántico (<a href="https://github.com/milvus-io/milvus/pull/52409">#52409</a>)</li>
<li>Se ha mejorado el control de reintentos de importación con un retardo configurable para los reintentos de escritura (<a href="https://github.com/milvus-io/milvus/pull/52414">#52414</a>, <a href="https://github.com/milvus-io/milvus/pull/52415">#52415</a>, <a href="https://github.com/milvus-io/milvus/pull/52427">#52427</a>)</li>
<li>Se ha mejorado la gestión del ciclo de vida de las tareas de análisis mediante la recuperación de versiones de estadísticas obsoletas y la persistencia de los estados finales (<a href="https://github.com/milvus-io/milvus/pull/52416">#52416</a>, <a href="https://github.com/milvus-io/milvus/pull/52417">#52417</a>)</li>
<li>Se ha mejorado la coordinación del ciclo de vida de los segmentos mediante la espera de la liberación del segmento tras los tiempos de espera de bloqueo (<a href="https://github.com/milvus-io/milvus/pull/52422">#52422</a>)</li>
<li>Se ha mejorado la clasificación del almacenamiento para la compactación de datos mediante una fusión de k vías (<a href="https://github.com/milvus-io/milvus/pull/52429">#52429</a>)</li>
<li>Se ha reducido la expansión del búfer de validez de los campos nulos conservando las máscaras empaquetadas en el acceso a fragmentos, la evaluación de expresiones y las estadísticas JSON (<a href="https://github.com/milvus-io/milvus/pull/52451">#52451</a>)</li>
<li>Se ha mejorado la protección de credenciales confidenciales, claves de API, hash de contraseñas RBAC y detalles de fuentes de recopilación externas, evitando su exposición en registros o mensajes de error (<a href="https://github.com/milvus-io/milvus/pull/52487">#52487</a>, <a href="https://github.com/milvus-io/milvus/pull/52664">#52664</a>, <a href="https://github.com/milvus-io/milvus/pull/52710">#52710</a>)</li>
<li>Se ha mejorado el control de concurrencia de actualizaciones parciales mediante la validación CAS optimista y reintentos seguros para los conflictos admisibles (<a href="https://github.com/milvus-io/milvus/pull/52495">#52495</a>)</li>
<li>Se ha mejorado la estabilidad de las instantáneas de lectura de segmentos en crecimiento y la gestión de la vida útil de las instantáneas de esquemas (<a href="https://github.com/milvus-io/milvus/pull/52572">#52572</a>)</li>
<li>Reducción de los escaneos redundantes de metadatos de autorización durante las copias de seguridad (<a href="https://github.com/milvus-io/milvus/pull/52612">#52612</a>)</li>
<li>Se ha mejorado la asignación de ID de vectores nulos trasladándola a la capa de índices, unificando la gestión de los ID lógicos y admitiendo asignaciones respaldadas por mmap para índices sellados (<a href="https://github.com/milvus-io/milvus/pull/52657">#52657</a>)</li>
<li>Se ha mejorado la sincronización entre la compilación JIT de Sonic y la carga de complementos de Go en las compilaciones para CPU y GPU (<a href="https://github.com/milvus-io/milvus/pull/52738">#52738</a>)</li>
<li>Se ha mejorado la resolución de canales de la ruta de escritura del proxy a través de la caché de metadatos, lo que elimina las llamadas RPC redundantes al coordinador y mejora la clasificación de errores (<a href="https://github.com/milvus-io/milvus/pull/52739">#52739</a>)</li>
<li>Se ha reducido el tiempo de cálculo de la recuperación de aproximadamente 3,08 segundos a 18,5 milisegundos con topk=100 000 en la prueba de rendimiento indicada (<a href="https://github.com/milvus-io/milvus/pull/52763">#52763</a>)</li>
<li>Se ha optimizado el filtrado de campos nulos reutilizando mapas de bits de validez, reduciendo el almacenamiento redundante de desplazamientos nulos y acelerando las copias de conjuntos de bits (<a href="https://github.com/milvus-io/milvus/pull/52801">#52801</a>, <a href="https://github.com/milvus-io/milvus/pull/52823">#52823</a>, <a href="https://github.com/milvus-io/milvus/pull/52825">#52825</a>)</li>
<li>Se han mejorado los índices escalares híbridos en subcampos de estructuras anidadas mediante el uso de STL_SORT cuando el recuento de elementos distintos alcanza el límite de cardinalidad del mapa de bits (<a href="https://github.com/milvus-io/milvus/pull/52849">#52849</a>)</li>
<li>Se ha mejorado la eficiencia del filtrado de ID de segmentos en la caché de metadatos (<a href="https://github.com/milvus-io/milvus/pull/52855">#52855</a>)</li>
<li>Se han reducido las asignaciones de memoria en las funciones auxiliares de hash (<a href="https://github.com/milvus-io/milvus/pull/52857">#52857</a>).</li>
<li>Se ha optimizado la ordenación de los resultados de reordenación fusionados eliminando las consultas al mapa por cada comparación (<a href="https://github.com/milvus-io/milvus/pull/52885">#52885</a>)</li>
<li>Se ha mejorado la seguridad de la memoria al gestionar valores predeterminados de JSON y vistas de cadenas no terminadas en NUL (<a href="https://github.com/milvus-io/milvus/pull/52906">#52906</a>)</li>
<li>Se han mejorado los tiempos de compilación en C++ mediante la compilación unificada con ámbito, se ha mejorado el almacenamiento en caché del compilador y se ha reducido el trabajo de compilación redundante (<a href="https://github.com/milvus-io/milvus/pull/52995">#52995</a>)</li>
<li>Se ha mejorado la cobertura y la actualidad de las métricas del sistema de archivos mediante la recopilación de métricas de los sistemas de archivos almacenados en caché en el momento del rastreo, conservando al mismo tiempo los nombres y etiquetas de las métricas existentes (<a href="https://github.com/milvus-io/milvus/pull/53026">#53026</a>)</li>
<li>Se ha añadido el parámetro «growingBuildThreadRate», que se puede actualizar, para configurar el número de subprocesos por segmento creciente durante la compilación del índice provisional, conservando al mismo tiempo el valor predeterminado de un solo subproceso (<a href="https://github.com/milvus-io/milvus/pull/53033">#53033</a>)</li>
<li>Se ha añadido compatibilidad con la reescritura de datos de campo mmap a la versión 3.0 mediante un backport, con la opción queryNode.mmap.writeback desactivada por defecto (<a href="https://github.com/milvus-io/milvus/pull/53079">#53079</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Se han corregido resultados incorrectos y una validación inconsistente de predicados en consultas JSON, ARRAY y TIMESTAMPTZ, incluyendo predicados de tipos mixtos, comparaciones de números grandes y filtrado a través de varios lotes (<a href="https://github.com/milvus-io/milvus/pull/51775">#51775</a>)</li>
<li>Se ha corregido la inconsistencia en la actualización de datos durante las actualizaciones paralelas de colecciones externas cuando los archivos de origen de un segmento abarcaban varias tareas (<a href="https://github.com/milvus-io/milvus/pull/51893">#51893</a>)</li>
<li>Se ha corregido el hecho de que las expresiones MATCH aceptaran predicados que no operaban a nivel de elemento (<a href="https://github.com/milvus-io/milvus/pull/51940">#51940</a>)</li>
<li>Se ha corregido el error por el que las búsquedas sin coincidencias fallaban con un error de tipo de ID no compatible (<a href="https://github.com/milvus-io/milvus/pull/51999">#51999</a>).</li>
<li>Se ha corregido el bloqueo de Milvus autónomo durante el apagado añadiendo un tiempo de espera de migración configurable con un valor predeterminado de 10 segundos (<a href="https://github.com/milvus-io/milvus/pull/52027">#52027</a>)</li>
<li>Se ha corregido un error por el que las solicitudes de incrustación de tablas externas utilizaban una identidad de clúster incorrecta cuando los trabajadores de DataNode se compartían entre clústeres de servicio (<a href="https://github.com/milvus-io/milvus/pull/52042">#52042</a>)</li>
<li>Se ha corregido un problema que impedía actualizar integration_id y model_deployment_id para las funciones TextEmbedding (<a href="https://github.com/milvus-io/milvus/pull/52081">#52081</a>)</li>
<li>Se ha corregido el hecho de que las respuestas HTTP JSON omitieran el estado explícito «ok=false» para los segmentos de rellenado fallidos (<a href="https://github.com/milvus-io/milvus/pull/52082">#52082</a>)</li>
<li>Se ha corregido el error en las cargas de objetos MinIO que fallaban con el código HTTP 400 XAmzContentChecksumMismatch al reintentarse tras tiempos de espera de transporte o de baja velocidad (<a href="https://github.com/milvus-io/milvus/pull/52128">#52128</a>, <a href="https://github.com/milvus-io/milvus/pull/52194">#52194</a>)</li>
<li>Se ha corregido el bloqueo del equilibrio de segmentos entre QueryNodes cuando el servicio de streaming estaba habilitado (<a href="https://github.com/milvus-io/milvus/pull/52147">#52147</a>, <a href="https://github.com/milvus-io/milvus/pull/52169">#52169</a>)</li>
<li>Se ha corregido la pérdida silenciosa de datos durante la compactación mixta cuando no se podían reconstruir los registros retenidos (<a href="https://github.com/milvus-io/milvus/pull/52200">#52200</a>)</li>
<li>Se ha corregido un error por el que las restauraciones de instantáneas perdían la configuración de las colecciones y, de forma inesperada, se establecían por defecto en «consistencia fuerte» (<a href="https://github.com/milvus-io/milvus/pull/52206">#52206</a>)</li>
<li>Se ha corregido un error por el que las eliminaciones en streaming omitían los segmentos sellados recién cargados, lo que permitía que los datos eliminados siguieran siendo consultables (<a href="https://github.com/milvus-io/milvus/pull/52218">#52218</a>)</li>
<li>Se ha corregido un error por el que los índices anidados no se creaban correctamente para datos vacíos (<a href="https://github.com/milvus-io/milvus/pull/52247">#52247</a>)</li>
<li>Se han corregido los interbloqueos al cambiar al servicio de streaming que dejaban las operaciones en espera indefinidamente (<a href="https://github.com/milvus-io/milvus/pull/52292">#52292</a>)</li>
<li>Se ha corregido el uso de valores predeterminados de geometría incorrectos durante la compactación y la reconstrucción de registros, así como el marcado incorrecto como nulos de los valores de geometría rellenados por defecto en las importaciones de Parquet (<a href="https://github.com/milvus-io/milvus/pull/52350">#52350</a>)</li>
<li>Se ha corregido el rechazo de segmentos V3 válidos durante la compactación y la recuperación tras un reinicio de DataCoord (<a href="https://github.com/milvus-io/milvus/pull/52383">#52383</a>, <a href="https://github.com/milvus-io/milvus/pull/52389">#52389</a>, <a href="https://github.com/milvus-io/milvus/pull/52390">#52390</a>, <a href="https://github.com/milvus-io/milvus/pull/52391">#52391</a>, <a href="https://github.com/milvus-io/milvus/pull/52392">#52392</a>, <a href="https://github.com/milvus-io/milvus/pull/52393">#52393</a>)</li>
<li>Se han corregido los errores de carga de segmentos debidos a la falta de metadatos de versión al utilizar índices escalares híbridos en subcampos de matriz VARCHAR en estructuras (<a href="https://github.com/milvus-io/milvus/pull/52385">#52385</a>)</li>
<li>Se ha corregido el fallo en la actualización de las columnas externas al reabrir un manifiesto actualizado (<a href="https://github.com/milvus-io/milvus/pull/52397">#52397</a>)</li>
<li>Se ha corregido el tratamiento incorrecto de la zona horaria en búsquedas con condiciones dependientes del tiempo (<a href="https://github.com/milvus-io/milvus/pull/52407">#52407</a>)</li>
<li>Se ha corregido el tratamiento incorrecto de las entradas ArrayOfVector en las solicitudes de búsqueda (<a href="https://github.com/milvus-io/milvus/pull/52408">#52408</a>)</li>
<li>Se ha corregido el fallo en las inserciones que no rechazaban las filas que superaban el límite de tamaño admitido (<a href="https://github.com/milvus-io/milvus/pull/52426">#52426</a>)</li>
<li>Se ha corregido el problema por el que los índices provisionales ignoraban la versión de índice de destino configurada (<a href="https://github.com/milvus-io/milvus/pull/52449">#52449</a>)</li>
<li>Se ha corregido el error por el que las consultas que utilizaban «order_by» no devolvían campos de salida de vectores densos (<a href="https://github.com/milvus-io/milvus/pull/52504">#52504</a>, <a href="https://github.com/milvus-io/milvus/pull/52606">#52606</a>)</li>
<li>Se ha corregido el problema por el que los privilegios revocados seguían vigentes tras ser eliminados de un grupo de privilegios (<a href="https://github.com/milvus-io/milvus/pull/52554">#52554</a>)</li>
<li>Se ha corregido el recuento incorrecto de archivos binlog y las etiquetas de formato de almacenamiento para los segmentos de Storage V3 tras el reinicio de DataCoord (<a href="https://github.com/milvus-io/milvus/pull/52571">#52571</a>, <a href="https://github.com/milvus-io/milvus/pull/52578">#52578</a>)</li>
<li>Se ha corregido el bloqueo de las restauraciones de instantáneas externas debido a comprobaciones poco fiables de la versión de los trabajadores o a reintentos repetidos de trabajadores no compatibles hasta que se agotaba el tiempo de espera (<a href="https://github.com/milvus-io/milvus/pull/52639">#52639</a>)</li>
<li>Se ha corregido el error de carga de segmentos para índices HYBRID en subcampos de matrices de estructuras con archivos STLSORT heredados de la versión 3.0.0, sin necesidad de reindexar (<a href="https://github.com/milvus-io/milvus/pull/52643">#52643</a>)</li>
<li>Se han corregido los bloqueos al procesar búferes de datos Arrow C de longitud cero (<a href="https://github.com/milvus-io/milvus/pull/52652">#52652</a>)</li>
<li>Se ha corregido un error en la gestión de fallos al cargar o reabrir segmentos de Storage V3 tras errores en el manifiesto, conservando el estado actual del segmento para realizar reintentos seguros (n.<a href="https://github.com/milvus-io/milvus/pull/52678">º 52678</a>)</li>
<li>Se han corregido los errores de consulta cuando los filtros de elementos ARRAY encontraban lotes completos de NULL o matrices vacías antes de los elementos posteriores (<a href="https://github.com/milvus-io/milvus/pull/52720">#52720</a>)</li>
<li>Se han corregido los trabajos de relleno que confirmaban incrustaciones obsoletas tras un cambio en el esquema de la colección (<a href="https://github.com/milvus-io/milvus/pull/52789">#52789</a>)</li>
<li>Se ha corregido el problema por el que los campos ausentes en los registros de Storage V3 se devolvían como NULL en lugar de sus valores predeterminados declarados (<a href="https://github.com/milvus-io/milvus/pull/52790">#52790</a>, <a href="https://github.com/milvus-io/milvus/pull/52807">#52807</a>, <a href="https://github.com/milvus-io/milvus/pull/52888">#52888</a>)</li>
<li>Se han corregido los errores de copia del lado del servidor que impedían la restauración de instantáneas de Storage V3 en GCS con credenciales de IAM/OAuth, incluidas las copias de objetos de más de 5 GiB (<a href="https://github.com/milvus-io/milvus/pull/52792">#52792</a>)</li>
<li>Se ha corregido el acceso no autenticado a través de llamadas gRPC en streaming en el puerto del proxy externo (<a href="https://github.com/milvus-io/milvus/pull/52854">#52854</a>)</li>
<li>Se ha corregido la pérdida de las marcas de tiempo de confirmación originales de los datos tras la compactación en clúster (<a href="https://github.com/milvus-io/milvus/pull/52859">#52859</a>)</li>
<li>Se han corregido los bloqueos de los nodos de streaming causados por fallos repetidos en el vaciado tras añadir un campo TEXT a colecciones con segmentos existentes de Storage V2 (n.<a href="https://github.com/milvus-io/milvus/pull/52897">º 52897</a>).</li>
<li>Se ha corregido el problema por el que las filas caducadas en segmentos de Storage V3 no activaban la compactación basada en el campo TTL y permanecían almacenadas hasta que se cumplía otra condición de compactación (<a href="https://github.com/milvus-io/milvus/pull/52931">#52931</a>)</li>
<li>Se ha corregido la inconsistencia en las claves primarias generadas automáticamente entre las colecciones de origen y destino durante las importaciones replicadas mediante CDC (n.<a href="https://github.com/milvus-io/milvus/pull/52941">º 52941</a>).</li>
<li>Se ha corregido la pérdida de escrituras simultáneas durante la migración del backend de WAL (<a href="https://github.com/milvus-io/milvus/pull/52947">#52947</a>, <a href="https://github.com/milvus-io/milvus/pull/52951">#52951</a>, <a href="https://github.com/milvus-io/milvus/pull/52955">#52955</a>)</li>
<li>Se ha corregido el problema por el que los índices HYBRID anidados, reconstruidos o compactados con datos de alta cardinalidad, se volvían ilegibles tras revertir a una versión anterior (<a href="https://github.com/milvus-io/milvus/pull/52959">#52959</a>)</li>
<li>Se ha corregido el tratamiento de los elementos nulos en filas de vectores densos externos, aceptando filas nulas totalmente nulas y añadiendo un tratamiento configurable de las filas parcialmente nulas (<a href="https://github.com/milvus-io/milvus/pull/52968">#52968</a>)</li>
<li>Se ha corregido el recuento incorrecto de filas de segmentos V3 y los fallos repetidos de compactación por ordenación tras la conmutación por error de un nodo de streaming (<a href="https://github.com/milvus-io/milvus/pull/52970">#52970</a>)</li>
<li>Se ha corregido el problema por el que las consultas que combinaban condiciones de rango con «OR» omitían registros en el límite inferior inclusivo (<a href="https://github.com/milvus-io/milvus/pull/52998">#52998</a>)</li>
<li>Se ha corregido un error en las búsquedas por clave primaria que impedía conservar el orden de ID solicitado (<a href="https://github.com/milvus-io/milvus/pull/52999">#52999</a>)</li>
<li>Se ha corregido un problema por el que añadir un campo TEXT tras habilitar Storage V3 impedía la carga de segmentos de Storage V2 existentes en crecimiento, lo que interrumpía las operaciones de vaciado, ordenación e indexación (<a href="https://github.com/milvus-io/milvus/pull/53002">#53002</a>)</li>
<li>Se ha corregido un problema por el que las instantáneas incluían segmentos de Storage V3 no confirmados, lo que provocaba que las restauraciones se marcaran como exitosas aunque los segmentos restaurados no se pudieran cargar (<a href="https://github.com/milvus-io/milvus/pull/53022">#53022</a>, <a href="https://github.com/milvus-io/milvus/pull/53039">#53039</a>)</li>
<li>Se ha corregido un error por el que los índices de texto de Storage V3 no se cargaban cuando sus archivos se almacenaban en directorios anidados de tareas o versiones (<a href="https://github.com/milvus-io/milvus/pull/53062">#53062</a>)</li>
</ul>
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 29 de julio de 2026</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th><th>Versión del SDK de Java</th><th>Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>¡Ya está disponible oficialmente Milvus 3.0.0! Basándose en la arquitectura «lake-native» introducida en <a href="https://milvus.io/docs/release_notes.md#v30-beta">la versión 3.0-beta</a>, esta versión completa lo que la beta inició: External Collection abarca más flujos de trabajo de «lakehouse»; el esquema admite la adición, el rellenado y la eliminación en línea; el índice disperso se ha reconstruido en torno a SINDI; StructArray y la búsqueda por facetas completan el motor de recuperación; el paso directo de FAISS y TEXT amplían las opciones de índice y modalidad; y Woodpecker se ejecuta como un servicio independiente.</p>
<p>Mira el vídeo a continuación para obtener más información sobre Milvus 3.0 y participa en la sesión de preguntas y respuestas (AMA) con los responsables del mantenimiento del núcleo:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>Si eres nuevo en la línea 3.0, la sección «Resumen de las características principales de la versión 3.0» que aparece a continuación resume las capacidades introducidas en la versión 3.0-beta; las <a href="https://milvus.io/docs/release_notes.md#v30-beta">notas de la versión 3.0-beta</a> contienen la información completa.</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">Novedades de la versión 3.0.0 (desde la 3.0-beta)<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">Colección externa: flujos de trabajo de «lakehouse» más completos</h4><p>La versión 3.0-beta introdujo la «Colección externa»: permite hacer referencia a archivos de «lakehouse» in situ, crear índices y realizar búsquedas en ellos sin copiar los datos a Milvus. Esta versión amplía esta funcionalidad hacia flujos de trabajo completos de recuperación en «lakehouse». Los campos externos ahora pueden alimentar campos de salida de funciones, como vectores dispersos BM25, firmas MinHash e incrustaciones de texto, de modo que los campos de recuperación de texto y derivados de modelos se crean dentro de Milvus sin copiar la tabla de origen. Refresh también admite la evolución aditiva de esquemas: cuando la tabla externa incorpora nuevas columnas, Milvus actualiza los segmentos afectados en lugar de reconstruir la colección.</p>
<p>Esta versión también añade un formato externo « <code translate="no">milvus-table</code> » que trata los metadatos de Milvus Snapshot y los manifiestos de Storage V3 como una fuente externa, de modo que una instantánea de la colección puede servirla como tabla externa: los sistemas de procesamiento por lotes y de servicio obtienen una vista compartida, respaldada por el manifiesto, de los mismos datos.</p>
<p>Para obtener más información, consulta <a href="/docs/es/create-an-external-collection.md">«Crear una colección externa</a> y <a href="/docs/es/snapshots.md">instantáneas</a>».</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">Esquema flexible: añadir, rellenar y eliminar columnas en línea</h4><p>Los esquemas no permanecen estáticos en producción —los modelos incrustados se sustituyen, las características se actualizan, los campos quedan obsoletos— y esto solía implicar reconstrucciones completas de la colección con tiempo de inactividad o escrituras duplicadas. La versión 3.0.0 cierra el círculo: se pueden añadir, rellenar y eliminar columnas mientras continúa el servicio.</p>
<p>El rellenado funciona en ambas direcciones. El rellenado externo gestiona valores calculados fuera de Milvus: añade una columna, realiza una instantánea de la colección como punto de partida coherente, ejecuta el trabajo sin conexión, vuelve a escribir los valores y Milvus indexa la nueva columna de forma incremental; así, una actualización del modelo de incrustación en cientos de millones de filas se convierte en una ruta activa sin tiempo de inactividad. El rellenado interno cubre los valores derivados del núcleo: al asociar una función BM25 o MinHash a una colección existente, su campo de salida se calcula automáticamente a partir de los datos existentes.</p>
<p>Para obtener más información, consulta <a href="/docs/es/add-fields-to-an-existing-collection.md">«Añadir campos a una colección existente</a>».</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">Revisión del índice disperso: SINDI, Block-Max WAND y Block-Max MaxScore</h4><p>Milvus 3.0 actualiza el índice de vectores dispersos en todos los aspectos. Introduce nuevos algoritmos de búsqueda <a href="https://arxiv.org/abs/2509.08395">—SINDI</a>, Block-Max WAND y Block-Max MaxScore— junto con la compresión de listas invertidas, la cuantificación configurable y la selección del algoritmo de búsqueda por carga de trabajo. También se han optimizado la carga mediante mmap, la serialización y la puntuación BM25, lo que reduce el almacenamiento del índice y la sobrecarga de carga para la búsqueda de vectores dispersos y de texto completo a gran escala. En pruebas de rendimiento internas, el índice BM25 comprimido es aproximadamente tres veces más pequeño que el índice disperso 2.6 con una recuperación comparable, y SINDI alcanza hasta unas 10 veces el QPS de MaxScore en incrustaciones dispersas aprendidas. Una vez habilitada la nueva versión del índice (véanse las notas sobre compatibilidad y comportamiento), SINDI es la opción predeterminada para la búsqueda de IP dispersa, y MaxScore es la opción predeterminada para BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">Cobertura de StructArray</h4><p>StructArray ahora admite valores nulos, índices de mapa de bits, la adición dinámica de campos en colecciones activas y la actualización parcial de campos de estructura mediante «upsert», con la correspondiente cobertura de REST e importación masiva.</p>
<p>La búsqueda a nivel de elemento añade la búsqueda híbrida a través de subcampos vectoriales con colapso configurable por entidad (variantes «max», «sum», «avg» y «top-k»), además de la búsqueda por rango y la agrupación dentro de la misma. El filtrado anidado abarca los predicados « <code translate="no">element_filter</code> », los cuantificadores « <code translate="no">MATCH_ANY</code> », « <code translate="no">MATCH_ALL</code> », « <code translate="no">MATCH_LEAST</code> », « <code translate="no">MATCH_MOST</code> » y « <code translate="no">MATCH_EXACT</code> », el acceso posicional a subcampos como « <code translate="no">tags[0][name]</code> » y « <code translate="no">array_length()</code> » en la columna de estructura.</p>
<p>Para obtener más información, consulta <a href="/docs/es/array-of-structs.md">StructArray</a> y <a href="/docs/es/struct-array-operators.md">Operadores</a> de <a href="/docs/es/struct-array-operators.md">StructArray</a>.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">Agregación de búsquedas y búsqueda por facetas</h4><p>La agregación de consultas de la versión beta calcula estadísticas exactas sobre los datos filtrados; la versión 3.0.0 añade la faceta a la ruta de búsqueda. Especifica un campo de faceta en el momento de la búsqueda y Milvus devuelve los valores de faceta principales, cada uno representado por su miembro que mejor se ajusta en la clasificación ANN y anotado con agregados como COUNT y AVG — la barra lateral de búsqueda por facetas (marca, rango de precios, atributos) en una sola solicitud, en lugar de realizar una recuperación excesiva y el recuento en el lado del cliente.</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">Reordenación mediante la cadena de funciones</h4><p>La reordenación de la clasificación ahora se puede componer a través de la API de la cadena de funciones, que ejecuta un flujo ordenado y tipado como parte de una única solicitud de búsqueda. Una cadena puede combinar la reevaluación temprana L0 en QueryNode con la reordenación L2 posterior a la reducción en Proxy, lo que permite la transformación y combinación de puntuaciones, la reordenación basada en modelos, la clasificación y la eliminación de candidatos sin necesidad de orquestación del lado del cliente. Esta versión también añade la puntuación nativa de XGBoost para la reordenación de L0 utilizando modelos UBJ registrados como FileResources, junto con los proveedores de inferencia de Hugging Face para la incrustación de texto gestionada por el servidor y la reordenación por similitud de frases.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">Campos de texto largo TEXT</h4><p>Los campos TEXT convierten el texto largo en contenido de primera clase, al eliminar los límites de longitud del lado del almacenamiento: admiten <code translate="no">text_match</code>, <code translate="no">phrase_match</code> y BM25. Los valores inferiores a 64 KB permanecen en línea; los valores más grandes se almacenan en archivos LOB a nivel de partición en formato Vortex, y la columna solo almacena referencias <code translate="no">(file_id, offset)</code>. Los archivos LOB se comparten entre segmentos, por lo que la compactación mueve las referencias en lugar de reescribir el texto. Para RAG, esto significa recuperar vectores y texto fuente del mismo almacén en una sola operación de E/S, sin necesidad de utilizar un almacén de blobs externo.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">Pasar el índice FAISS</h4><p>Un nuevo tipo de índice « <code translate="no">FAISS</code> » acepta cadenas arbitrarias de la fábrica de índices Faiss a través del parámetro « <code translate="no">faiss_index_name</code> » — <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> — con los parámetros de búsqueda pasados directamente, de modo que las recetas de Faiss se reproducen directamente en Milvus.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Compatibilidad con los formatos Vortex y Lance</h4><p>La capa de almacenamiento incorpora dos formatos columnares abiertos: Vortex como formato interno de próxima generación —codificaciones adaptativas (diccionario, RLE, empaquetado de bits, compresión específica para números flotantes), descompresión sin copia, optimizado para cargas de trabajo mixtas de vectores y escalares— y Lance, junto con Parquet, para el intercambio en un ecosistema abierto. Vortex está destinado a convertirse en el formato interno por defecto, con la aplicación de filtros y una variante local previstas en la hoja de ruta.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Implementación autónoma de Woodpecker</h4><p>Woodpecker, el WAL que constituye el núcleo de la ruta de escritura en tiempo real, ahora puede implementarse como un servicio independiente en lugar de integrarse en otros nodos —escalabilidad independiente, aislamiento de fallos y observabilidad, como cualquier otro microservicio—. Esto es especialmente importante para clústeres de gran tamaño y cargas de trabajo con un alto volumen de escritura.</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Resumen de las características principales de la versión 3.0<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>Las características que se indican a continuación se introdujeron en la <a href="https://milvus.io/docs/release_notes.md#v30-beta">versión 3.0-beta</a> y forman parte de la 3.0.0; consulta las notas de la versión beta para obtener la información completa.</p>
<ul>
<li><strong>Colección externa</strong>: consulta de datos de lakehouse (Parquet, Lance, Iceberg, Vortex) in situ: sin copias, de solo lectura, sincronizados mediante actualización incremental.</li>
<li><strong>Instantánea</strong>: vistas de recopilación de solo lectura en un momento determinado por referencia de segmento, con un almacenamiento marginal prácticamente nulo.</li>
<li><strong>Almacenamiento V3 (Loon)</strong>: almacenamiento columnar basado en manifiestos en almacenamiento de objetos; la base para Snapshot y Colección externa.</li>
<li><strong>Consulta/Búsqueda ORDER BY</strong>: ordenación de varios campos del lado del servidor con ASC/DESC por campo.</li>
<li><strong>Agregación de consultas</strong>: COUNT / SUM / AVG / MIN / MAX con agrupación, evaluadas en el lado del servidor.</li>
<li><strong>EmbList + DiskANN</strong>: indexación multivectorial en disco para listas de incrustación StructArray, con vías de aceleración como Muvera y Lemur.</li>
<li><strong>Función MinHash (doc-in, doc-out)</strong>: firmas MinHash del lado del servidor, además de « <code translate="no">MINHASH_LSH</code> » para la detección de casi duplicados.</li>
<li><strong>Vectores nulos</strong> — NULL en los seis tipos de vectores; la búsqueda omite las filas NULL, y AddField se extiende a los campos vectoriales.</li>
<li><strong>TTL de entidad</strong> — caducidad por fila controlada por un campo TIMESTAMPTZ.</li>
<li><strong>FileResource</strong>: diccionarios, listas de sinónimos y listas de palabras vacías gestionados por el clúster para analizadores, BM25 y Text Match.</li>
<li><strong>Fusión forzada</strong>: compactación de segmentos activada por un operador, en modo síncrono o asíncrono.</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">Notas sobre compatibilidad y comportamiento<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Storage V3 (Loon) está desactivado por defecto.</strong> Las funciones que dependen de él —como Snapshot y los campos TEXT— requieren activarlo manualmente a través de <code translate="no">common.storage.useLoonFFI</code>. Storage V3 se activará por defecto en una versión posterior.</li>
<li><strong>Se garantiza la compatibilidad y la reversión de la versión 2.6 a la 3.0</strong>: una implementación de la versión 3.0 se puede revertir a la 2.6. Sin embargo, una vez que se habiliten o utilicen funciones que modifiquen el formato de datos serializados (por ejemplo, Storage V3), ya no será posible revertir la actualización.</li>
<li><strong>Las nuevas versiones de índice son opcionales por el momento.</strong> Los algoritmos de índice recién introducidos requieren aumentar manualmente la versión de índice de destino (<code translate="no">dataCoord.targetVecIndexVersion</code> a 10, <code translate="no">dataCoord.targetScalarIndexVersion</code> a 4) antes de que surtan efecto; en una versión posterior se habilitarán de forma predeterminada.</li>
<li><strong>Las imágenes de GPU pasan a CUDA 12.9</strong> y ya no conservan la compatibilidad con las GPU de Ubuntu 20.04.</li>
</ul>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 9 de mayo de 2026</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta amplía la base de datos vectorial de Milvus con una nueva integración en el ecosistema de Open Lake: la función «External Collection» permite a Milvus consultar tablas externas de Open Lake sin copia, y Spark puede leer las colecciones de Milvus directamente a través de Snapshot. Esta versión también ofrece una recuperación más completa, un esquema más expresivo, una personalización más profunda de la búsqueda de texto, controles más precisos sobre el ciclo de vida de los datos y los modelos, y más controles por parte del operador. Milvus 3.0 es el núcleo central de Zilliz Lakebase, que impulsa su servicio unificado, el descubrimiento y el procesamiento por lotes.</p>
<h3 id="Key-Features" class="common-anchor-header">Características principales<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Colección externa</h4><p>En los flujos de datos típicos de IA, ya existen terabytes de representaciones y metadatos en el almacenamiento de objetos en forma de tablas Parquet, Lance o Iceberg. Copiar esos datos a Milvus duplica el coste de almacenamiento, añade un flujo ETL que debe mantenerse sincronizado y aleja la gobernanza de los datos del cliente.</p>
<p>La recopilación externa elimina la necesidad de copiar. Una recopilación de Milvus puede hacer referencia a los archivos allí donde ya se encuentran, y Milvus solo gestiona el esquema, los índices y la ejecución de consultas. Una actualización incremental mantiene la colección alineada con los archivos subyacentes. Los clientes cuyos datos no pueden salir del lago de datos —como los equipos de finanzas y sanidad— pueden realizar búsquedas vectoriales en esos datos allí donde se encuentran. Un único conjunto de datos residente en el lago de datos también puede servirse desde varias instancias de Milvus a la vez.</p>
<p>Para obtener más información, consulta <a href="/docs/es/create-an-external-collection.md">«Crear una colección externa</a>».</p>
<h4 id="Snapshot" class="common-anchor-header">Instantánea</h4><p>La entrega de datos y el descubrimiento por lotes suelen necesitar la misma colección al mismo tiempo. La evaluación de modelos A/B, la deduplicación a gran escala, la validación de datos retrospectivos y la reversión de versiones requieren una vista estable de la colección mientras siguen produciéndose escrituras.</p>
<p>La instantánea crea una vista de una colección en un momento determinado y de solo lectura haciendo referencia a segmentos existentes en lugar de copiar datos, por lo que el coste marginal de almacenamiento es prácticamente nulo. Los trabajos por lotes pueden leer desde la instantánea bajo aislamiento de tipo MVCC mientras la colección activa sigue aceptando escrituras.</p>
<p>Para obtener más información, consulta <a href="/docs/es/snapshots.md">«Instantáneas</a>», <a href="/docs/es/manage-snapshots.md">«Gestión de instantáneas</a>» y <a href="/docs/es/snapshot-use-cases.md">«Casos de uso de instantáneas</a>».</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Ordenación en consultas y búsquedas</h4><p>La búsqueda y las consultas admiten ahora la ordenación por varios campos, con la ordenación delegada al núcleo de Milvus y la configuración de « <code translate="no">ASC</code> » / « <code translate="no">DESC</code> » por campo. Esto resuelve una deficiencia habitual en producción: la ordenación «Top-K» basada únicamente en la distancia a menudo no se ajusta a las necesidades empresariales cuando el elemento más similar no es el más barato, el más reciente ni el más popular.</p>
<p>Las aplicaciones ya no tienen que recuperar resultados en exceso y volver a ordenarlos en el cliente para expresar una clasificación compuesta.</p>
<p>Para obtener más información, consulta <a href="/docs/es/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">«Ordenar resultados de búsqueda por campos escalares</a> » y <a href="/docs/es/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">«Ordenar resultados de consulta</a>».</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agregación de consultas</h4><p>La generación de estadísticas de distribución por inquilino, recuentos de completitud de campos o el progreso del despliegue de versiones a partir de una colección de Milvus solía requerir la recuperación de las entidades coincidentes en el cliente y su agregación allí. Milvus 3.0 integra la agregación escalar de estilo SQL en el núcleo. Una llamada de consulta admite expresiones de agregación de tipo « <code translate="no">group_by_fields</code> » y « <code translate="no">output_fields</code> », incluyendo « <code translate="no">count(*)</code> », « <code translate="no">count(&lt;field&gt;)</code> », « <code translate="no">sum(&lt;field&gt;)</code> », « <code translate="no">avg(&lt;field&gt;)</code> », « <code translate="no">min(&lt;field&gt;)</code> » y « <code translate="no">max(&lt;field&gt;)</code> ». La agregación se evalúa en el lado del servidor tras el filtrado.</p>
<p>Para obtener más información, consulte <a href="/docs/es/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">«Agregar resultados de consultas</a>».</p>
<h4 id="Null-Vector" class="common-anchor-header">Vector nulo</h4><p>Las representaciones suelen generarse de forma asíncrona, por lo que una entidad puede llegar antes que su vector. Los datos multimodales también presentan lagunas naturales, como un vídeo sin subtítulos o un producto sin imagen. Las versiones anteriores no ofrecían una solución adecuada: las aplicaciones retrasaban la escritura hasta que el vector estuviera listo o introducían un vector provisional, y ambas opciones perjudicaban la calidad de la recuperación.</p>
<p>Milvus 3.0 admite el valor NULL en los campos vectoriales de los seis tipos de vectores. La búsqueda omite automáticamente los vectores NULL, la calidad de la recuperación no se ve afectada y los vectores NULL prácticamente no ocupan espacio de almacenamiento. La función « <code translate="no">AddField</code> » también se extiende a los campos vectoriales con este cambio: con <code translate="no">nullable=True</code>, una colección existente puede ampliar sus campos vectoriales en línea sin necesidad de reconstruirla.</p>
<p>Para obtener más información, consulta <a href="/docs/es/nullable-and-default.md">«Campos nulos</a>».</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Diccionario personalizado y diccionario de sinónimos</h4><p>Los tokenizadores predeterminados no siempre cumplen los requisitos de calidad de búsqueda en producción. El chino, los ámbitos verticales como la medicina, el derecho y la química, y los corpus multilingües pueden beneficiarse sustancialmente de los diccionarios personalizados y las tablas de sinónimos. Hasta ahora, estos recursos se gestionaban principalmente mediante reescrituras de consultas del lado de la aplicación.</p>
<p>Milvus 3.0 incorpora un mecanismo FileResource para registrar diccionarios personalizados de tokenizadores, listas de sinónimos, listas de palabras vacías y reglas de descomposición de compuestos. Una vez registrado, se puede hacer referencia a un recurso desde cualquier tokenizador o filtro, y surte efecto en BM25, los analizadores y Text Match. Ahora es posible versionar y gestionar de forma centralizada los diccionarios y los sinónimos, en lugar de tenerlos dispersos por el código de la aplicación.</p>
<p>Para obtener más información, consulta <a href="/docs/es/manage-file-resources.md">«Gestionar recursos de archivo</a>».</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL de entidades</h4><p>El TTL a nivel de colección y de partición resulta demasiado general para muchos escenarios de ciclo de vida y cumplimiento normativo. Los distintos inquilinos dentro de una misma colección suelen tener reglas de retención diferentes, y es posible que las entidades individuales deban caducar según un calendario que no coincida con el del resto de la colección.</p>
<p>Milvus 3.0 admite el TTL por entidad. Basta con declarar un campo « <code translate="no">TIMESTAMPTZ</code> » en el esquema, marcarlo como campo de TTL mediante una propiedad de la colección, y Milvus recuperará automáticamente las entidades caducadas. Esto cubre las solicitudes del «derecho al olvido», la caducidad de los datos de sesión y el historial de conversaciones delimitado sin necesidad de limpieza por parte de la aplicación.</p>
<p>Para obtener más información, consulta <a href="/docs/es/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">«Establecer el TTL a nivel de entidad</a>».</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 añadió el índice « <code translate="no">MINHASH_LSH</code> » para la detección de casi duplicados basada en conjuntos, pero las aplicaciones aún tenían que calcular las firmas MinHash antes de escribir los datos en Milvus.</p>
<p>Milvus 3.0 incorpora una función MinHash del lado del servidor. Basta con declarar un campo de entrada « <code translate="no">VARCHAR</code> » y un campo de salida « <code translate="no">BINARY_VECTOR</code> » en el esquema, asociar una función « <code translate="no">FunctionType.MINHASH</code> », y Milvus calculará las firmas durante la inserción, la inserción masiva y la búsqueda. Junto con <code translate="no">MINHASH_LSH</code>, esto permite flujos de trabajo de deduplicación para grandes conjuntos de datos, la generación de huellas digitales y la detección de plagio dentro de Milvus.</p>
<p>Para obtener más información, consulta la <a href="/docs/es/minhash-function.md">función MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>La suposición de «una entidad = un vector» ya no se ajusta a la recuperación de información moderna. Los documentos largos se dividen en muchos fragmentos, los modelos de interacción tardía como ColBERT emiten un vector por token y las entidades multimodales pueden tener varias vistas.</p>
<p>EmbList almacena una lista de vectores de longitud variable por entidad, con <code translate="no">DISKANN</code> como índice en disco. La ruta de disco mantiene bajo control el uso de la RAM cuando el corpus supera los límites de memoria. EmbList + <code translate="no">DISKANN</code> es la primera variante de la familia más amplia de StructList en esta versión RC. El resto de la familia, incluido el filtrado de StructList y la aceleración multivectorial de Muvera / Lemur, está previsto para la versión oficial 3.0.</p>
<p>Para obtener más información, consulta <a href="/docs/es/search-with-embedding-lists.md">«Búsqueda con listas</a> de <a href="/docs/es/search-with-embedding-lists.md">incrustación</a>».</p>
<h4 id="Force-Merge" class="common-anchor-header">Fusión forzada</h4><p>Las cargas de trabajo en producción acumulan fragmentación de segmentos con el tiempo, lo que provoca fluctuaciones en la latencia de las consultas y un aumento del almacenamiento.</p>
<p>Milvus 3.0 añade la capacidad de activar la compactación de segmentos de forma explícita durante las franjas horarias de menor actividad, tanto en modo síncrono como asíncrono.</p>
<p>Para obtener más información, consulta <a href="/docs/es/force-merge.md">«Compactación</a> de <a href="/docs/es/force-merge.md">fusión forzada</a>».</p>
<h4 id="Storage-V3" class="common-anchor-header">Almacenamiento V3</h4><p>Milvus 3.0 introduce «Almacenamiento V3», un motor de almacenamiento columnar basado en manifiestos en el que los datos y los metadatos residen en un almacenamiento de objetos compatible con S3. Cada versión del conjunto de datos se captura como una instantánea de manifiesto inmutable, un archivo codificado en Avro que registra qué grupos de columnas, registros delta y estadísticas componen el conjunto de datos.</p>
<p>Los manifiestos son archivos Avro compactos, y los registros delta registran las eliminaciones a nivel de entidad sin reescribir los archivos de datos. Esto mantiene baja la sobrecarga de metadatos a medida que crecen los conjuntos de datos. El manifiesto también desacopla el seguimiento de metadatos de la ruta de consulta, lo que permite que una colección gestione más segmentos sin degradar el rendimiento de las consultas.</p>
<p>Dado que los estados se almacenan en el almacenamiento de objetos, el conjunto de datos es autodescriptivo: cualquier lector con acceso a la ruta de almacenamiento puede descubrirlo e interpretarlo sin necesidad de un catálogo central. Esta propiedad sustenta las integraciones con External Collection, Snapshot y futuros lagos de datos.</p>
