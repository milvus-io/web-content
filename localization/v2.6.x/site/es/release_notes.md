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
    </button></h1><p>Descubra las novedades de Milvus. Esta página resume las nuevas características, mejoras, problemas conocidos y correcciones de errores de cada versión. Puede encontrar las notas de la versión para cada versión publicada después de la v2.6.0 en esta sección. Le sugerimos que visite regularmente esta página para conocer las actualizaciones.</p>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 19 de septiembre de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versión de Milvus</th><th style="text-align:left">Versión del SDK de Python</th><th style="text-align:left">Versión del SDK de Node.js</th><th style="text-align:left">Versión del SDK de Java</th><th style="text-align:left">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>¡Nos complace anunciar el lanzamiento de Milvus 2.6.2! Esta actualización introduce nuevas y potentes funciones, importantes mejoras de rendimiento y correcciones críticas que hacen que el sistema sea más estable y esté listo para la producción. Destacan las actualizaciones parciales de campos con upsert, JSON Shredding para acelerar el filtrado dinámico de campos, la indexación NGram para consultas LIKE más rápidas y una evolución de esquemas más flexible en las colecciones existentes. Basada en los comentarios de la comunidad, esta versión ofrece una base más sólida para las implantaciones en el mundo real, y animamos a todos los usuarios a actualizar para aprovechar estas mejoras.</p>
<h3 id="Features" class="common-anchor-header">Características<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Se ha añadido compatibilidad con JSON Shredding para acelerar el filtrado dinámico de campos. Para obtener más información, consulte <a href="/docs/es/json-shredding.md">JSON Shredding</a>.</li>
<li>Se ha añadido compatibilidad con NGRAM Index para acelerar las operaciones similares. Para obtener más información, consulte <a href="/docs/es/ngram.md">NGRAM</a>.</li>
<li>Añadido soporte para actualizaciones parciales de campos con upsert API. Para más detalles, consulte <a href="/docs/es/upsert-entities.md">Upsert Entidades</a>.</li>
<li>Añadido soporte para la función Boost. Para más detalles, consulte <a href="/docs/es/boost-ranker.md">Boost Ranker</a>.</li>
<li>Añadido soporte para agrupar por campos JSON y campos dinámicos<a href="https://github.com/milvus-io/milvus/pull/43203">(#43203</a>)</li>
<li>Añadido soporte para habilitar el esquema dinámico en colecciones existentes<a href="https://github.com/milvus-io/milvus/pull/44151">(#44151</a>)</li>
<li>Añadido soporte para eliminar índices sin liberar colecciones<a href="https://github.com/milvus-io/milvus/pull/42941">(#42941</a>)</li>
</ul>
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
<li>[StorageV2] Cambiado el tamaño del archivo de registro a tamaño comprimido<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>)</li>
<li>[StorageV2] Añadidos campos hijo en la información de carga<a href="https://github.com/milvus-io/milvus/pull/44384">(#44384</a>)</li>
<li>[StorageV2] Añadido soporte para incluir claves de partición y clustering en el grupo de sistemas<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>Eliminado tiempo de espera para tareas de compactación<a href="https://github.com/milvus-io/milvus/pull/44277">(#44277</a>)</li>
<li>[StorageV2] Habilitada la compilación con Azure<a href="https://github.com/milvus-io/milvus/pull/44177">(#44177</a>)</li>
<li>[StorageV2] Utilizada información de grupo para estimar uso de lógica<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] Utilizada la información de división de grupo para estimar el uso<a href="https://github.com/milvus-io/milvus/pull/44338">(#44338</a>)</li>
<li>[StorageV2] Guardados los resultados de los grupos de columnas en la compactación<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] Añadidas configuraciones para política de división basada en tamaño<a href="https://github.com/milvus-io/milvus/pull/44301">(#44301</a>)</li>
<li>[StorageV2] Añadido soporte para política de división basada en esquema y tamaño<a href="https://github.com/milvus-io/milvus/pull/44282">(#44282</a>)</li>
<li>[StorageV2] Añadida política de división configurable<a href="https://github.com/milvus-io/milvus/pull/44258">(#44258</a>)</li>
<li>[CachingLayer] Añadidas más métricas y configuraciones<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)</li>
<li>Añadido soporte para esperar a que todos los índices estén listos antes de cargar segmentos<a href="https://github.com/milvus-io/milvus/pull/44313">(#44313</a>)</li>
<li>Añadida métrica de latencia interna del núcleo para el nodo rescore<a href="https://github.com/milvus-io/milvus/pull/44010">(#44010</a>)</li>
<li>Optimizado el formato del registro de acceso al imprimir parámetros KV<a href="https://github.com/milvus-io/milvus/pull/43742">(#43742</a>)</li>
<li>Añadida configuración para modificar el tamaño del lote de instantáneas de volcado<a href="https://github.com/milvus-io/milvus/pull/44215">(#44215</a>)</li>
<li>Reducción del intervalo de limpieza de la tarea de compactación<a href="https://github.com/milvus-io/milvus/pull/44207">(#44207</a>)</li>
<li>Mejorada la ordenación por fusión para soportar múltiples campos<a href="https://github.com/milvus-io/milvus/pull/44191">(#44191</a>)<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>Añadida la estimación de recursos de carga para el índice por niveles<a href="https://github.com/milvus-io/milvus/pull/44171">(#44171</a>)</li>
<li>Añadida configuración de autoíndice para el caso de deduplicación<a href="https://github.com/milvus-io/milvus/pull/44186">(#44186</a>)</li>
<li>Añadida configuración para permitir caracteres personalizados en los nombres (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>Añadido soporte para cchannel para servicio de streaming<a href="https://github.com/milvus-io/milvus/pull/44143">(#44143</a>)</li>
<li>Añadido mutex y comprobación de rango para proteger los borrados concurrentes<a href="https://github.com/milvus-io/milvus/pull/44128">(#44128</a>)</li>
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
<li>Alineado el comportamiento de las expresiones existe entre fuerza bruta e índice<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>)</li>
<li>Corregido error al renombrar a una colección eliminada<a href="https://github.com/milvus-io/milvus/pull/44436">(#44436</a>)</li>
<li>[StorageV2] Comprobada la longitud de los campos hijo<a href="https://github.com/milvus-io/milvus/pull/44405">(#44405</a>)</li>
<li>[StorageV2] Activado Azure por defecto<a href="https://github.com/milvus-io/milvus/pull/44377">(#44377</a>)</li>
<li>Corregida ruta de carga de compactaciones L0 bajo pooling datanodes<a href="https://github.com/milvus-io/milvus/pull/44374">(#44374</a>)</li>
<li>No se permite renombrar si la encriptación de la base de datos está activada<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>Eliminación de la propiedad dynamicfield.enable<a href="https://github.com/milvus-io/milvus/pull/44335">(#44335</a>)</li>
<li>Tareas marcadas como fallidas cuando el ID preasignado no es válido<a href="https://github.com/milvus-io/milvus/pull/44350">(#44350</a>)</li>
<li>Omisión de comprobaciones MVCC en expresiones de comparación PK<a href="https://github.com/milvus-io/milvus/pull/44353">(#44353</a>)</li>
<li>Corregido error json_contains para estadísticas<a href="https://github.com/milvus-io/milvus/pull/44325">(#44325</a>)</li>
<li>Añadida la comprobación del sistema de archivos de inicialización para el nodo de consulta y el nodo de transmisión<a href="https://github.com/milvus-io/milvus/pull/44360">(#44360</a>)</li>
<li>Arreglado el objetivo de compactación vacío cuando el segmento se recogía de la basura<a href="https://github.com/milvus-io/milvus/pull/44270">(#44270</a>)</li>
<li>Corregida la condición de carrera al inicializar el índice timestamp<a href="https://github.com/milvus-io/milvus/pull/44317">(#44317</a>)</li>
<li>Comprobación de si arraydata es nulo para evitar el pánico<a href="https://github.com/milvus-io/milvus/pull/44332">(#44332</a>)</li>
<li>Corregido error al construir estadísticas JSON para objetos anidados<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>)</li>
<li>Evitado reescritura mmap por múltiples campos JSON<a href="https://github.com/milvus-io/milvus/pull/44299">(#44299</a>)</li>
<li>Formatos de datos válidos unificados<a href="https://github.com/milvus-io/milvus/pull/44296">(#44296</a>)</li>
<li>Ocultadas las credenciales de los proveedores de embedding/reranking en la web UI<a href="https://github.com/milvus-io/milvus/pull/44275">(#44275</a>)</li>
<li>Corregida ruta de statslog bajo pooling datanodes<a href="https://github.com/milvus-io/milvus/pull/44288">(#44288</a>)</li>
<li>Corregida ruta de oráculo IDF<a href="https://github.com/milvus-io/milvus/pull/44266">(#44266</a>)</li>
<li>Utilizado punto de control de instantánea de recuperación si ningún vchannel se está recuperando<a href="https://github.com/milvus-io/milvus/pull/44246">(#44246</a>)</li>
<li>Limitado el número de columnas en las estadísticas JSON<a href="https://github.com/milvus-io/milvus/pull/44233">(#44233</a>)</li>
<li>Índice n-gram de recuento de recursos de carga<a href="https://github.com/milvus-io/milvus/pull/44237">(#44237</a>)</li>
<li>Deducción del tipo de métrica a partir de resultados de búsqueda no vacíos<a href="https://github.com/milvus-io/milvus/pull/44222">(#44222</a>)</li>
<li>Corregida la escritura multi-segmento que sólo escribe un segmento<a href="https://github.com/milvus-io/milvus/pull/44256">(#44256</a>)</li>
<li>Corregida la ordenación por fusión fuera de rango<a href="https://github.com/milvus-io/milvus/pull/44230">(#44230</a>)</li>
<li>Añadida comprobación UTF-8 antes de ejecutar la función BM25<a href="https://github.com/milvus-io/milvus/pull/44220">(#44220</a>)</li>
<li>Reintentada sesión antigua si existe<a href="https://github.com/milvus-io/milvus/pull/44208">(#44208</a>)</li>
<li>Añadido límite de tamaño de búfer Kafka para evitar OOM datanode<a href="https://github.com/milvus-io/milvus/pull/44106">(#44106</a>)</li>
<li>Corregido pánico al extender el rango de bloqueo<a href="https://github.com/milvus-io/milvus/pull/44130">(#44130</a>)</li>
<li>Corregidos los segmentos crecientes que no se vierten al cambiar el esquema<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
<li>[StorageV2] Errores de IO manejados<a href="https://github.com/milvus-io/milvus/pull/44255">(#44255</a>)</li>
<li>Evitado pánico si la ruta del índice Tantivy no existe<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 3 de septiembre de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versión de Milvus</th><th style="text-align:left">Versión del SDK de Python</th><th style="text-align:left">Versión del SDK de Node.js</th><th style="text-align:left">Versión del SDK de Java</th><th style="text-align:left">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nos complace anunciar el lanzamiento de Milvus 2.6.1. Esta versión se basa en los principales avances arquitectónicos de versiones anteriores, ofreciendo mejoras críticas centradas en la estabilidad de la producción, el rendimiento y la robustez operativa. Esta versión responde a los principales comentarios de la comunidad y refuerza el sistema para despliegues a gran escala. Recomendamos encarecidamente a todos los usuarios que actualicen para beneficiarse de un sistema más estable, fiable y con mayor rendimiento.</p>
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
<li>Soporta sistemas de archivos compatibles con POSIX para almacenamiento remoto<a href="https://github.com/milvus-io/milvus/pull/43944">(#43944</a>)</li>
<li>Se introducen renovadores basados en modelos<a href="https://github.com/milvus-io/milvus/pull/43270">(#43270</a>)</li>
<li>Optimiza el rendimiento de las expresiones de comparación en campos de clave primaria<a href="https://github.com/milvus-io/milvus/pull/43154">(#43154</a>)</li>
<li>Recoge doc_id de la lista de contabilización directamente para acelerar la coincidencia de texto<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>Optimiza el rendimiento de las consultas convirtiendo múltiples condiciones != en una única cláusula NOT IN<a href="https://github.com/milvus-io/milvus/pull/43690">(#43690</a>)</li>
<li>Mejora de la gestión de recursos para la capa de caché durante la carga de segmentos<a href="https://github.com/milvus-io/milvus/pull/43846">(nº 43846</a>)</li>
<li>Mejora la estimación de memoria para índices provisionales durante la carga de datos<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)</li>
<li>Posibilidad de configurar el ratio de construcción de los índices intermedios<a href="https://github.com/milvus-io/milvus/pull/43939">(#43939</a>)</li>
<li>Añade un límite de velocidad de escritura configurable al escritor de disco<a href="https://github.com/milvus-io/milvus/pull/43912">(#43912</a>)</li>
<li>Los parámetros de SegCore ahora pueden actualizarse dinámicamente sin reiniciar el servicio Milvus<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>)</li>
<li>Añade métricas de latencia gRPC unificadas para una mejor observabilidad<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>)</li>
<li>Incluye marcas de tiempo de solicitud del cliente en las cabeceras gRPC para simplificar la depuración<a href="https://github.com/milvus-io/milvus/pull/44059">(#44059</a>)</li>
<li>Admite el nivel de registro de seguimiento para segcore<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>Añade un interruptor configurable para ajustar las garantías de consistencia para una mayor disponibilidad<a href="https://github.com/milvus-io/milvus/pull/43874">(#43874</a>)</li>
<li>Implementa un robusto mecanismo de rewatch para manejar los fallos de conexión etcd<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>)</li>
<li>Mejora la lógica interna de comprobación del estado de los nodos<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>Optimiza el acceso a metadatos al listar colecciones<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>Actualiza el cliente Pulsar a la versión oficial v0.15.1 y añade más registros<a href="https://github.com/milvus-io/milvus/pull/43913">(#43913</a>)</li>
<li>Actualiza aws-sdk de 1.9.234 a 1.11.352<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>)</li>
<li>Admite actualizaciones dinámicas de intervalo para componentes de teletipo<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>Mejora la autodetección de los conjuntos de instrucciones ARM SVE para operaciones de conjuntos de bits<a href="https://github.com/milvus-io/milvus/pull/43833">(#43833</a>)</li>
<li>Mejora el mensaje de error cuando falla una coincidencia de texto o frase<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>Se mejora el mensaje de error cuando no coinciden las dimensiones de los vectores<a href="https://github.com/milvus-io/milvus/pull/43835">(#43835</a>)</li>
<li>Se mejora el informe de errores para los tiempos de espera de adición cuando el almacén de objetos no está disponible<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
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
<li>Corrección de un posible problema de falta de memoria<a href="https://github.com/milvus-io/milvus/pull/43756">(</a>OOM) durante la importación de archivos Parquet<a href="https://github.com/milvus-io/milvus/pull/43756">(#43756</a>)</li>
<li>Corrección de un problema por el que los nodos en espera no podían recuperarse si su contrato de arrendamiento expiraba<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>)</li>
<li>Maneja correctamente el estado de reintento de compactación<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)</li>
<li>Corrección de un posible bloqueo entre las solicitudes de lectura continua y la carga de índices que podía impedir la carga de índices<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>)</li>
<li>Corrección de un error que podía provocar fallos en la eliminación de datos en situaciones de gran concurrencia<a href="https://github.com/milvus-io/milvus/pull/43831">(#43831</a>)</li>
<li>Se corrige una posible condición de carrera al cargar índices de texto y JSON<a href="https://github.com/milvus-io/milvus/pull/43811">(nº 43811</a>).</li>
<li>Corrección de una incoherencia en el estado de los nodos que podía producirse tras el reinicio de QueryCoord<a href="https://github.com/milvus-io/milvus/pull/43941">(nº 43941</a>).</li>
<li>Garantiza que un QueryNode "sucio" se limpie correctamente tras un reinicio<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)</li>
<li>Se soluciona un problema por el que el estado de reintento no se gestionaba correctamente para las solicitudes con cargas útiles no vacías<a href="https://github.com/milvus-io/milvus/pull/44068">(nº 44068</a>).</li>
<li>Se soluciona un problema por el que el escritor masivo v2 no utilizaba el nombre de cubo correcto<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>)</li>
<li>Mejora de la seguridad al ocultar los elementos sensibles del punto final RESTful get_configs<a href="https://github.com/milvus-io/milvus/pull/44057">(nº 44057</a>)</li>
<li>Garantiza que las cargas de objetos para woodpecker sean idempotentes durante los reintentos de tiempo de espera<a href="https://github.com/milvus-io/milvus/pull/43947">(#43947</a>)</li>
<li>No permite importar elementos nulos en campos de matriz desde archivos Parquet<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)</li>
<li>Corrige un error por el que la caché de proxy no se invalidaba tras crear un alias de colección<a href="https://github.com/milvus-io/milvus/pull/43854">(#43854</a>)</li>
<li>Mejora del mecanismo interno de descubrimiento de servicios para nodos de streaming<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>)</li>
<li>Corrección de la lógica de grupos de recursos para filtrar correctamente los nodos de streaming<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>)</li>
<li>Añade la etiqueta databaseName a las métricas para evitar conflictos de nomenclatura en entornos con varias bases de datos<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>)</li>
<li>Corrección de un error lógico en la gestión interna del estado de las tareas<a href="https://github.com/milvus-io/milvus/pull/43777">(#43777</a>)</li>
<li>Optimiza el tiempo de inicialización de las métricas internas para evitar posibles pánicos<a href="https://github.com/milvus-io/milvus/pull/43773">(#43773</a>)</li>
<li>Corrección de un posible fallo en el servidor HTTP interno<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 6 de agosto de 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versión de Milvus</th><th style="text-align:left">Versión del SDK de Python</th><th style="text-align:left">Versión del SDK de Node.js</th><th style="text-align:left">Versión del SDK de Java</th><th style="text-align:left">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>¡Milvus 2.6.0 está oficialmente disponible! Partiendo de la base arquitectónica establecida en <a href="#v260-rc1">2.6.0-rc1</a>, esta versión lista para producción aborda numerosos problemas de estabilidad y rendimiento, al tiempo que introduce nuevas y potentes capacidades, como el formato de almacenamiento V2, el procesamiento JSON avanzado y funciones de búsqueda mejoradas. Con amplias correcciones de errores y optimizaciones basadas en los comentarios de la comunidad durante la fase RC, Milvus 2.6.0 está listo para que lo explore y adopte.</p>
<div class="alert warning">
<p>No se admite la actualización directa desde versiones anteriores a la 2.6.0 debido a los cambios arquitectónicos. Siga nuestra <a href="/docs/es/upgrade_milvus_cluster-operator.md">guía de actualización</a>.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">Novedades en 2.6.0 (desde RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">Formato de almacenamiento optimizado v2</h4><p>Para hacer frente a los retos del almacenamiento mixto de datos escalares y vectoriales, especialmente las búsquedas puntuales en datos no estructurados, Milvus 2.6 introduce el Formato de Almacenamiento V2. Este nuevo formato de almacenamiento columnar adaptativo adopta una estrategia de diseño de "fusión de columnas estrechas + independencia de columnas anchas", que resuelve fundamentalmente los cuellos de botella de rendimiento cuando se manejan búsquedas de puntos y recuperaciones de lotes pequeños en bases de datos vectoriales.</p>
<p>El nuevo formato admite ahora un acceso aleatorio eficiente sin amplificación de E/S y logra un aumento del rendimiento de hasta 100 veces en comparación con el formato Parquet vainilla adoptado anteriormente, lo que lo hace ideal para cargas de trabajo de IA que requieren tanto procesamiento analítico como recuperación vectorial precisa. Además, puede reducir el número de archivos hasta en un 98% para cargas de trabajo típicas. El consumo de memoria para la compactación principal se reduce en un 300%, y las operaciones de E/S se optimizan hasta un 80% para las lecturas y más de un 600% para las escrituras.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">Índice plano JSON (beta)</h4><p>Milvus 2.6 introduce el índice plano JSON para gestionar esquemas JSON altamente dinámicos. A diferencia del índice de rutas JSON, que requiere la declaración previa de rutas específicas y sus tipos previstos, el índice plano JSON descubre e indexa automáticamente todas las estructuras anidadas bajo una ruta determinada. Cuando indexa un campo JSON, aplana recursivamente todo el subárbol, creando entradas de índice invertidas para cada par ruta-valor que encuentra, independientemente de la profundidad o el tipo. Este aplanamiento automático hace que JSON Flat Index sea ideal para esquemas en evolución en los que aparecen nuevos campos sin previo aviso. Por ejemplo, si indexa un campo "metadatos", el sistema gestionará automáticamente nuevos campos anidados como "metadatos.version2.features.experimental" a medida que aparezcan en los datos entrantes, sin necesidad de configurar un nuevo índice.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">Recordatorio de las características del núcleo 2.6.0<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Para obtener información detallada sobre los cambios en la arquitectura y las funciones introducidas en 2.6.0-RC, consulte <a href="#v260-rc1">la Nota de la versión 2.6.0-rc1</a>.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">Simplificación de la arquitectura</h4><ul>
<li>Streaming Node (GA) - Gestión centralizada de WAL</li>
<li>WAL nativo con Woodpecker - Eliminación de la dependencia de Kafka/Pulsar</li>
<li>Coordinadores unificados (MixCoord); IndexNode y DataNode fusionados - Reducción de la complejidad de los componentes</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">Búsqueda y análisis</h4><ul>
<li>RaBitQ Cuantificación de 1 bit con alta recuperación</li>
<li>Coincidencia de frases</li>
<li>MinHash LSH para deduplicación</li>
<li>Funciones de clasificación en función del tiempo</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">Experiencia del desarrollador</h4><ul>
<li>Funciones de incrustación para el flujo de trabajo "data-in, data-out</li>
<li>Evolución del esquema en línea</li>
<li>Soporte de vectores INT8</li>
<li>Tokenizadores mejorados para soporte global de idiomas</li>
<li>Capa de caché con carga retardada - Procesamiento de conjuntos de datos mayores que la memoria</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de publicación: 18 de junio de 2025</p>
<table>
<thead>
<tr><th style="text-align:center">Versión de Milvus</th><th style="text-align:center">Versión del SDK de Python</th><th style="text-align:center">Versión del SDK de Node.js</th><th style="text-align:center">Versión del SDK de Java</th><th style="text-align:center">Versión del SDK de Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 introduce una arquitectura simplificada y nativa de la nube diseñada para mejorar la eficiencia operativa, la utilización de recursos y el coste total de propiedad reduciendo la complejidad de la implantación. Esta versión añade nuevas funcionalidades centradas en el rendimiento, la búsqueda y el desarrollo. Entre las funciones clave se incluyen la cuantificación de alta precisión de 1 bit (RaBitQ) y una capa de caché dinámica para mejorar el rendimiento, la detección de casi duplicados con MinHash y la concordancia precisa de frases para la búsqueda avanzada, así como funciones de incrustación automatizadas con modificación de esquemas en línea para mejorar la experiencia del desarrollador.</p>
<div class="alert note">
<p>Esta es una versión preliminar de Milvus 2.6.0. Para probar las últimas funciones, instale esta versión como una nueva implementación. No se admite la actualización de Milvus v2.5.x o anterior a 2.6.0-rc1.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Cambios en la arquitectura<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>Desde la versión 2.6, Milvus introduce cambios arquitectónicos significativos destinados a mejorar el rendimiento, la escalabilidad y la facilidad de uso. Para obtener más información, consulte <a href="/docs/es/architecture_overview.md">Visión general de la arquitectura de Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Nodo de flujo (GA)</h4><p>En versiones anteriores, el proxy escribía los datos de flujo en la WAL y el QueryNode y el DataNode los leían. Esta arquitectura dificultaba la obtención de consenso en el lado de la escritura y requería una lógica compleja en el lado de la lectura. Además, el delegado de consulta se encontraba en el QueryNode, lo que dificultaba la escalabilidad. Milvus 2.5.0 introdujo el Streaming Node, que pasa a ser GA en la versión 2.6.0. Este componente es ahora responsable de todas las operaciones de lectura/escritura de WAL a nivel de disco y también sirve como delegador de consultas, resolviendo los problemas mencionados y permitiendo nuevas optimizaciones.</p>
<p><strong>Aviso importante de actualización</strong>: Streaming Node es un cambio arquitectónico significativo, por lo que no se admite una actualización directa a Milvus 2.6.0-rc1 desde versiones anteriores.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">WAL nativo de Woodpecker</h4><p>Milvus dependía anteriormente de sistemas externos como Kafka o Pulsar para su WAL. Aunque funcionales, estos sistemas añadían una complejidad operativa y una sobrecarga de recursos significativas, especialmente para implementaciones pequeñas y medianas. En Milvus 2.6, estos sistemas se sustituyen por Woodpecker, un sistema de WAL nativo de la nube creado específicamente. Woodpecker está diseñado para el almacenamiento de objetos y admite modos de disco cero basados tanto en almacenamiento local como en almacenamiento de objetos, lo que simplifica las operaciones al tiempo que mejora el rendimiento y la escalabilidad.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">Fusión de DataNode e IndexNode</h4><p>En Milvus 2.6, tareas como la compactación, la importación masiva, la recopilación de estadísticas y la creación de índices se gestionan ahora mediante un programador unificado. La función de persistencia de datos que antes gestionaba el DataNode se ha trasladado al Streaming Node. Para simplificar el despliegue y el mantenimiento, el IndexNode y el DataNode se han fusionado en un único componente DataNode. Este nodo consolidado ejecuta ahora todas estas tareas críticas, reduciendo la complejidad operativa y optimizando la utilización de los recursos.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Fusión de coordinadores en MixCoord</h4><p>El diseño anterior con módulos RootCoord, QueryCoord y DataCoord separados introducía complejidad en la comunicación entre módulos. Para simplificar el diseño del sistema, estos componentes se han fusionado en un único coordinador unificado denominado MixCoord. Esta consolidación reduce la complejidad de la programación distribuida al sustituir la comunicación basada en la red por llamadas a funciones internas, lo que se traduce en un funcionamiento más eficiente del sistema y una simplificación del desarrollo y el mantenimiento.</p>
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">Cuantificación de 1 bit RaBitQ</h4><p>Para manejar conjuntos de datos a gran escala, la cuantización de 1 bit es una técnica eficaz para mejorar la utilización de los recursos y el rendimiento de la búsqueda. Sin embargo, los métodos tradicionales pueden afectar negativamente a la recuperación. En colaboración con los autores de la investigación original, Milvus 2.6 presenta RaBitQ, una solución de cuantización de 1 bit que mantiene una alta precisión de recuperación al tiempo que ofrece las ventajas de recursos y rendimiento de la compresión de 1 bit.</p>
<p>Para más información, consulte <a href="/docs/es/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Mejora de la capacidad JSON</h4><p>Milvus 2.6 mejora su compatibilidad con el tipo de datos JSON con las siguientes mejoras:</p>
<ul>
<li><strong>Rendimiento</strong>: Ahora se admite oficialmente la indexación de rutas JSON, lo que permite la creación de índices invertidos en rutas específicas dentro de objetos JSON (por ejemplo, <code translate="no">meta.user.location</code>). Esto evita el escaneo completo de objetos y mejora la latencia de las consultas con filtros complejos.</li>
<li><strong>Funcionalidad</strong>: Para soportar una lógica de filtrado más compleja, esta versión añade soporte para las funciones <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code>, y <code translate="no">CAST</code>. De cara al futuro, nuestro trabajo sobre el soporte de JSON continúa. Nos complace anunciar que las próximas versiones oficiales incluirán funciones aún más potentes, como <strong>la trituración de JSON</strong> y un <strong>índice JSON FLAT</strong>, diseñado para mejorar drásticamente el rendimiento en datos JSON muy anidados.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Mejora de las funciones de analizador y tokenizador</h4><p>Esta versión mejora significativamente las capacidades de procesamiento de texto con varias actualizaciones de Analyzer y Tokenizer:</p>
<ul>
<li>Está disponible una nueva sintaxis de <a href="/docs/es/analyzer-overview.md#Example-use">Run Analyzer</a> para validar las configuraciones del tokenizador.</li>
<li>Se ha integrado el <a href="/docs/es/lindera-tokenizer.md">tokenizador Lindera</a> para mejorar la compatibilidad con idiomas asiáticos como el japonés y el coreano.</li>
<li>Ahora es posible seleccionar el tokenizador a nivel de fila, con el <a href="/docs/es/icu-tokenizer.md">tokenizador ICU</a> de uso general disponible como alternativa para situaciones multilingües.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Entrada y salida de datos con funciones de incrustación</h4><p>Milvus 2.6 introduce la capacidad "Data-in, Data-Out" que simplifica el desarrollo de aplicaciones de IA al integrarse directamente con modelos de incrustación de terceros (por ejemplo, de OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Ahora los usuarios pueden insertar y consultar datos de texto sin procesar, y Milvus llamará automáticamente al servicio de modelo especificado para convertir el texto en vectores en tiempo real. Esto elimina la necesidad de un proceso de conversión vectorial independiente.</p>
<p>Para más información, consulte <a href="/docs/es/embedding-function-overview.md">Visión general de la función de incrustación</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Coincidencia de frases</h4><p>La concordancia de frases es una función de búsqueda de texto que sólo devuelve resultados cuando la secuencia exacta de palabras de una consulta aparece de forma consecutiva y en el orden correcto dentro de un documento.</p>
<p><strong>Características principales</strong>:</p>
<ul>
<li>Sensible al orden: Las palabras deben aparecer en el mismo orden que en la consulta.</li>
<li>Coincidencia consecutiva: Las palabras deben aparecer una junto a otra, a menos que se utilice un valor de inclinación.</li>
<li>Inclinación (opcional): Un parámetro ajustable que permite un pequeño número de palabras intermedias, lo que permite la concordancia difusa de frases.</li>
</ul>
<p>Para más información, consulte <a href="/docs/es/phrase-match.md">Coincidencia de frases</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">Índice MinHash LSH (Beta)</h4><p>Para abordar la necesidad de deduplicación de datos en el entrenamiento de modelos, Milvus 2.6 añade soporte para índices MINHASH_LSH. Esta característica proporciona un método computacionalmente eficiente y escalable para estimar la similitud de Jaccard entre documentos para identificar casi duplicados. Los usuarios pueden generar firmas MinHash para sus documentos de texto durante el preprocesamiento y utilizar el índice MINHASH_LSH en Milvus para encontrar eficientemente contenido similar en conjuntos de datos a gran escala, mejorando la limpieza de datos y la calidad del modelo.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Funciones de decaimiento en función del tiempo</h4><p>Milvus 2.6 introduce funciones de decaimiento en función del tiempo para abordar situaciones en las que el valor de la información cambia con el tiempo. Durante la reclasificación de resultados, los usuarios pueden aplicar funciones de decaimiento exponencial, gaussiano o lineal basadas en un campo de fecha y hora para ajustar la puntuación de relevancia de un documento. Esto asegura que el contenido más reciente pueda ser priorizado, lo cual es crítico para aplicaciones como fuentes de noticias, comercio electrónico y la memoria de un agente de IA.</p>
<p>Para obtener más información, consulte <a href="/docs/es/decay-ranker-overview.md">Descripción general de Decay Ranker</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Añadir campo para la evolución del esquema en línea</h4><p>Para proporcionar una mayor flexibilidad de esquema, Milvus 2.6 soporta ahora la adición de un nuevo campo escalar al esquema de una colección existente en línea. Esto evita la necesidad de crear una nueva colección y realizar una migración de datos disruptiva cuando cambian los requisitos de la aplicación.</p>
<p>Para obtener más información, consulte <a href="/docs/es/add-fields-to-an-existing-collection.md">Añadir campos a una colección existente</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">Soporte de vectores INT8</h4><p>En respuesta al creciente uso de modelos cuantificados que producen incrustaciones de enteros de 8 bits, Milvus 2.6 añade soporte nativo de tipos de datos para vectores INT8. Esto permite a los usuarios ingerir estos vectores directamente sin descuantificación, ahorrando costes de cálculo, ancho de banda de red y almacenamiento. Esta función es compatible inicialmente con los índices de la familia HNSW.</p>
<p>Para más información, consulte <a href="/docs/es/dense-vector.md">Vector denso</a>.</p>
