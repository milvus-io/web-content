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
    </button></h1><p>Descubra las novedades de Milvus. Esta página resume las nuevas características, mejoras, problemas conocidos y correcciones de errores de cada versión. Puede encontrar las notas de la versión para cada versión publicada después de la v2.4.0 en esta sección. Le sugerimos que visite regularmente esta página para conocer las actualizaciones.</p>
<h2 id="v2415" class="common-anchor-header">v2.4.15<button data-href="#v2415" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 5 de noviembre de 2024</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.15</td><td>2.4.9</td><td>2.4.8</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.15 fue una versión crítica de corrección de errores centrada en mejorar la estabilidad, el rendimiento y la compatibilidad del sistema. Esta versión solucionó un importante problema de bloqueo que podía producirse durante las caídas de QueryNode e introdujo actualizaciones de compatibilidad para la herramienta de copia de seguridad con la función de base de datos. Además, Milvus 2.4.15 mejoró el rendimiento y la estabilidad del borrado mediante importantes optimizaciones en la gestión de L0. <strong>Se recomienda encarecidamente actualizar a la versión 2.4.15</strong> para beneficiarse de estas mejoras críticas.</p>
<h3 id="Critical-bug-fixes" class="common-anchor-header">Corrección de errores críticos</h3><ul>
<li>Se ha resuelto un problema de bloqueo si el QueryNode se bloqueaba durante la inicialización del cliente de fragmentos<a href="https://github.com/milvus-io/milvus/pull/37354">(#37354</a>).</li>
<li>Se ha revertido la mejora de soporte de bases de datos para la inserción masiva<a href="https://github.com/milvus-io/milvus/pull/37421">(#37421</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Se ha corregido un error por el que algunas expresiones no analizaban correctamente los valores<a href="https://github.com/milvus-io/milvus/pull/37342">(#37342</a>).</li>
<li>Se ha mejorado el proxy para que vuelva a intentar obtener el líder de fragmentos en colecciones descargadas<a href="https://github.com/milvus-io/milvus/pull/37326">(nº 37326</a>).</li>
<li>Se ha corregido un problema por el que el valor métrico del recuento de filas L0 estaba siempre vacío<a href="https://github.com/milvus-io/milvus/pull/37307">(nº 37307</a>).</li>
<li>Se ha omitido marcar el tiempo de espera de compactación para escenarios de compactación mixtos y L0<a href="https://github.com/milvus-io/milvus/pull/37194">(#37194</a>).</li>
<li>Rectificada la lógica de contención de OffsetOrderedArray<a href="https://github.com/milvus-io/milvus/pull/37309">(#37309</a>).</li>
<li>Añadida una comprobación de recursos al cargar registros delta<a href="https://github.com/milvus-io/milvus/pull/37263">(#37263</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Movida la lógica L0 fuera del bloqueo delta para un mejor rendimiento<a href="https://github.com/milvus-io/milvus/pull/37340">(#37340</a>).</li>
<li>Liberación de segmentos crecientes compactados si están presentes en la lista de abandonos<a href="https://github.com/milvus-io/milvus/pull/37266">(#37266</a>).</li>
<li>Introducido middleware para monitorizar las estadísticas RPC de entrada/salida RESTful V2<a href="https://github.com/milvus-io/milvus/pull/37224">(#37224</a>, <a href="https://github.com/milvus-io/milvus/pull/37440">#37440</a>).</li>
</ul>
<h2 id="v2414" class="common-anchor-header">v2.4.14<button data-href="#v2414" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de publicación: 31 de octubre de 2024</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.14</td><td>2.4.9</td><td>2.4.7</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.14 soluciona un problema crítico de la versión 2.4.13 que podía causar la pérdida de información de recolección después de la recolección de basura <code translate="no">snapshotKV</code>. También corrige un par de fugas de recursos. Además, esta versión incluye numerosas mejoras centradas en aumentar la estabilidad de las operaciones de borrado a gran escala y el rendimiento de la compactación.</p>
<h3 id="Features" class="common-anchor-header">Características</h3><ul>
<li>Caché de trozos en modo memoria compatible<a href="https://github.com/milvus-io/milvus/pull/35836">(#35836</a>)</li>
<li>Soporte de db para bulkinsert<a href="https://github.com/milvus-io/milvus/pull/37017">(#37017</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Optimización de la eliminación/compactación<ul>
<li>Ejecución paralela de compactaciones l0<a href="https://github.com/milvus-io/milvus/pull/36985">(#36985</a>)</li>
<li>Batched forward delete cuando se utiliza direct forward<a href="https://github.com/milvus-io/milvus/pull/37107">(#37107</a>)</li>
<li>Omisión de la carga de datos delta en delegater al utilizar remoteload<a href="https://github.com/milvus-io/milvus/pull/37112">(#37112</a>)</li>
<li>Reenvío directo delta excluyendo segmentos l0<a href="https://github.com/milvus-io/milvus/pull/36914">(#36914</a>)</li>
<li>Añadida priorización de tareas de compactación en DataCoord<a href="https://github.com/milvus-io/milvus/pull/36979">(#36979</a>)</li>
<li>Seguimiento de tasas de borrado complejas<a href="https://github.com/milvus-io/milvus/pull/36958">(#36958</a>)</li>
</ul></li>
<li>Refactorizado CreateCollection en RESTFul API<a href="https://github.com/milvus-io/milvus/pull/36885">(#36885</a>)</li>
<li>Fusión de múltiples operaciones "and" y "or" en una única operación<a href="https://github.com/milvus-io/milvus/pull/36973">(#36973</a>)</li>
<li>Funcionamiento de la carga de salto para todas las ramas<a href="https://github.com/milvus-io/milvus/pull/37161">(#37161</a>)</li>
<li>Actualizada la dependencia de Minio para soportar EKS Pod Identities<a href="https://github.com/milvus-io/milvus/pull/37089">(#37089</a>)</li>
<li>Opciones de importación ordenadas<a href="https://github.com/milvus-io/milvus/pull/37078">(#37078</a>)</li>
<li>Limitado el número máximo de trabajos de importación<a href="https://github.com/milvus-io/milvus/pull/36892">(#36892</a>)</li>
<li>Preasignación de datos para evitar la reasignación de memoria<a href="https://github.com/milvus-io/milvus/pull/37044">(#37044</a>)</li>
<li>Evitado que DataNode cargue el bf<a href="https://github.com/milvus-io/milvus/pull/37027">(#37027</a>)</li>
<li>Evitado limitar las operaciones ddl repetidamente<a href="https://github.com/milvus-io/milvus/pull/37011">(#37011</a>)</li>
<li>Hizo el elemento de configuración <code translate="no">datanode.import.maxconcurrenttasknum</code> dinámicamente ajustable<a href="https://github.com/milvus-io/milvus/pull/37103">(#37103</a>)</li>
<li>Utilizado <code translate="no">queryNode.mmap.growingMmapEnabled</code> para controlar el comportamiento del índice intermedio<a href="https://github.com/milvus-io/milvus/pull/36391">(#36391</a>)</li>
<li>Rellenados los campos <code translate="no">Level</code> y <code translate="no">StartPosition</code> en segmentLoadInfo de segmento creciente<a href="https://github.com/milvus-io/milvus/pull/36911">(#36911</a>)</li>
<li>Forzado a detener los mensajes de buffer cuando se recibe el mensaje de drop collection<a href="https://github.com/milvus-io/milvus/pull/36917">(#36917</a>)</li>
<li>Añadidas métricas para la información del búfer de eliminación de querynode<a href="https://github.com/milvus-io/milvus/pull/37097">(#37097</a>)</li>
<li>Añadida etiqueta de nombre de colección para alguna métrica<a href="https://github.com/milvus-io/milvus/pull/37159">(#37159</a>)</li>
<li>Utilizado middleware para observar RESTful v2 in/out rpc stats<a href="https://github.com/milvus-io/milvus/pull/37224">(#37224</a>)</li>
<li>Cambiado el tamaño del pool de memoria por defecto de la GPU<a href="https://github.com/milvus-io/milvus/pull/36969">(#36969</a>)</li>
<li>Actualizada la versión de Knowhere a 2.3.12<a href="https://github.com/milvus-io/milvus/pull/37132">(#37132</a>)</li>
<li>Permitido borrar datos cuando se agota la cuota de disco<a href="https://github.com/milvus-io/milvus/pull/37139">(#37139</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Corregida la información de recolección que no podía ser recuperada desde metakv luego de reiniciar si todas las instantáneas eran recolectadas de la basura<a href="https://github.com/milvus-io/milvus/pull/36950">(#36950</a>)</li>
<li>Corregido el código de error rpc para evitar reintentos inválidos en el cliente<a href="https://github.com/milvus-io/milvus/pull/37025">(#37025</a>)</li>
<li>Ignorado error db no encontrado en el centro de cuotas<a href="https://github.com/milvus-io/milvus/pull/36850">(#36850</a>)</li>
<li>Corregida fuga de goroutine en QueryNode al usar pool de borrado singleton<a href="https://github.com/milvus-io/milvus/pull/37225">(#37225</a>)</li>
<li>Corregida fuga de colección en querynode<a href="https://github.com/milvus-io/milvus/pull/37079">(#37079</a>)</li>
<li>Corregida la fuga de la tarea de compactación de clustering<a href="https://github.com/milvus-io/milvus/pull/36803">(#36803</a>)</li>
<li>Prohibido renombrar una colección que tenía un alias<a href="https://github.com/milvus-io/milvus/pull/37208">(#37208</a>)</li>
<li>Asegurarse de que el alias se almacena en caché<a href="https://github.com/milvus-io/milvus/pull/36808">(#36808</a>)</li>
<li>La búsqueda/consulta podría haber fallado durante la actualización de la caché del delegador<a href="https://github.com/milvus-io/milvus/pull/37174">(#37174</a>)</li>
<li>Excluida la compactación l0 cuando se ejecutaba la agrupación<a href="https://github.com/milvus-io/milvus/pull/37142">(#37142</a>)</li>
<li>Meta de colección referenciada al cargar sólo meta de segmento l0<a href="https://github.com/milvus-io/milvus/pull/37179">(#37179</a>)</li>
<li>Delegador podría haber quedado inservible después de reiniciar querycoord<a href="https://github.com/milvus-io/milvus/pull/37100">(#37100</a>)</li>
<li>La partición de liberación dinámica podría haber fallado en la búsqueda/consulta<a href="https://github.com/milvus-io/milvus/pull/37099">(#37099</a>)</li>
<li>Rectificado el valor de la cuota de recuento de filas del búfer de borrado<a href="https://github.com/milvus-io/milvus/pull/37068">(nº 37068</a>)</li>
<li>Se pasaba la lista de campos completa cuando estaba activada la carga parcial<a href="https://github.com/milvus-io/milvus/pull/37063">(nº 37063</a>)</li>
<li>Pánico en el nodo de consulta durante el envío de rpc al trabajador<a href="https://github.com/milvus-io/milvus/pull/36988">(#36988</a>)</li>
<li>Datacoord se atascaba al detener el progreso<a href="https://github.com/milvus-io/milvus/pull/36961">(#36961</a>)</li>
<li>Se ha corregido el acceso fuera de límites en el segmento creciente cuando los datos brutos se sustituían por un índice provisional<a href="https://github.com/milvus-io/milvus/pull/36938">(#36938</a>)</li>
<li>Rootcoord se atascaba en el progreso de parada graceful<a href="https://github.com/milvus-io/milvus/pull/36881">(#36881</a>)</li>
</ul>
<h2 id="v2413-hotfix" class="common-anchor-header">v2.4.13-hotfix<button data-href="#v2413-hotfix" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de publicación: 17 de octubre de 2024</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.13-hotfix</td><td>2.4.8</td><td>2.4.5</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus v2.4.13-hotfix soluciona un problema crítico específico de v2.4.13, donde Milvus puede fallar al recuperar la información de recolección después de un reinicio si todas las instantáneas de MetaKV fueron recolectadas como basura<a href="https://github.com/milvus-io/milvus/pull/36933">(#36933</a>). <strong>Se recomienda a los usuarios que actualmente ejecutan la versión 2.4.13 que actualicen a la versión 2.4.13-hotfix lo antes posible para evitar posibles interrupciones</strong>.</p>
<h3 id="Critical-fixes" class="common-anchor-header">Correcciones críticas</h3><ul>
<li>Cargar la clave original si la marca de tiempo es MaxTimestamp<a href="https://github.com/milvus-io/milvus/pull/36935">(#36935</a>)</li>
</ul>
<h2 id="Deprecated-v2413" class="common-anchor-header">[Obsoleto] v2.4.13<button data-href="#Deprecated-v2413" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de publicación: 12 de octubre de 2024</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.13</td><td>2.4.8</td><td>2.4.5</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.13 introduce la carga dinámica de réplicas, permitiendo a los usuarios ajustar el número de réplicas de la colección sin necesidad de liberar y recargar la colección. Esta versión también soluciona varios errores críticos relacionados con la importación masiva, el análisis sintáctico de expresiones, el equilibrio de carga y la recuperación de fallos. Además, se han introducido mejoras significativas en el uso de los recursos MMAP y en el rendimiento de las importaciones, mejorando la eficiencia general del sistema. Recomendamos encarecidamente la actualización a esta versión para mejorar el rendimiento y la estabilidad.</p>
<h3 id="Features" class="common-anchor-header">Características</h3><ul>
<li>Ajuste dinámico de réplicas para colecciones cargadas<a href="https://github.com/milvus-io/milvus/pull/36417">(#36417</a>)</li>
<li>MMAP de vectores dispersos en tipos de segmento crecientes<a href="https://github.com/milvus-io/milvus/pull/36565">(#36565</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Corrección de un problema de rendimiento de descarga<a href="https://github.com/milvus-io/milvus/pull/36741">(#36741</a>)</li>
<li>Corrección de un error con expresiones JSON en &quot;[]&quot;<a href="https://github.com/milvus-io/milvus/pull/36722">(#36722</a>)</li>
<li>Eliminación de vecinos si el destino compacto no está indexado<a href="https://github.com/milvus-io/milvus/pull/36694">(#36694</a>)</li>
<li>Mejora del rendimiento de Rocksmq cuando el canal está lleno<a href="https://github.com/milvus-io/milvus/pull/36618">(#36618</a>)</li>
<li>Se ha solucionado un problema por el que no se diferían los errores durante el desempaquetado<a href="https://github.com/milvus-io/milvus/pull/36665">(#36665</a>)</li>
<li>Resuelto un escape de memoria para segmentos importados en el gestor de segmentos<a href="https://github.com/milvus-io/milvus/pull/36631">(#36631</a>)</li>
<li>Se han omitido comprobaciones de estado innecesarias para nodos de consulta en el proxy<a href="https://github.com/milvus-io/milvus/pull/36553">(nº 36553</a>).</li>
<li>Solucionado un problema de desbordamiento con expresiones de términos<a href="https://github.com/milvus-io/milvus/pull/36534">(#36534</a>)</li>
<li>Registro del ID de nodo antes de asignar tareas para evitar la asignación incorrecta de tareas<a href="https://github.com/milvus-io/milvus/pull/36493">(#36493</a>)</li>
<li>Resueltos los problemas de carrera de datos en la compactación de clustering<a href="https://github.com/milvus-io/milvus/pull/36499">(#36499</a>)</li>
<li>Se ha añadido una comprobación de la longitud máxima de la matriz de cadenas tras la coincidencia de tipos<a href="https://github.com/milvus-io/milvus/pull/36497">(nº 36497</a>).</li>
<li>Resueltas las condiciones de carrera en modo mixto o autónomo<a href="https://github.com/milvus-io/milvus/pull/36459">(#36459</a>)</li>
<li>Corrección del desequilibrio de segmentos tras operaciones repetidas de carga y liberación<a href="https://github.com/milvus-io/milvus/pull/36543">(#36543</a>)</li>
<li>Corregido un caso donde los segmentos no podían ser movidos desde un nodo de parada<a href="https://github.com/milvus-io/milvus/pull/36475">(#36475</a>)</li>
<li>Actualizada la información de segmento correctamente incluso si faltaban algunos segmentos<a href="https://github.com/milvus-io/milvus/pull/36729">(#36729</a>)</li>
<li>Se ha evitado que las transacciones etcd excedan el límite máximo en la instantánea KV<a href="https://github.com/milvus-io/milvus/pull/36773">(#36773</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Mejorada la estimación de recursos MMAP:<ul>
<li>Mejorado el código relacionado con MMAP en column.h<a href="https://github.com/milvus-io/milvus/pull/36521">(#36521</a>)</li>
<li>Mejora de la estimación de recursos al cargar colecciones<a href="https://github.com/milvus-io/milvus/pull/36728">(#36728</a>)</li>
</ul></li>
<li>Mejoras de rendimiento:<ul>
<li>Mejora de la eficiencia de análisis de expresiones mediante la conversión de Unicode a ASCII<a href="https://github.com/milvus-io/milvus/pull/36676">(#36676</a>)</li>
<li>Habilitada la producción paralela de mensajes para múltiples temas<a href="https://github.com/milvus-io/milvus/pull/36462">(#36462</a>)</li>
<li>Reducción de la sobrecarga de la CPU al calcular el tamaño del archivo de índice<a href="https://github.com/milvus-io/milvus/pull/36580">(#36580</a>)</li>
<li>Obtención del tipo de mensaje de la cabecera para minimizar el desmarcado<a href="https://github.com/milvus-io/milvus/pull/36454">(#36454</a>)</li>
<li>Optimizada la política de selección de réplicas basada en la carga de trabajo<a href="https://github.com/milvus-io/milvus/pull/36384">(#36384</a>)</li>
</ul></li>
<li>Dividir los mensajes de la tarea de eliminación para ajustarlos a los límites de tamaño máximo de los mensajes<a href="https://github.com/milvus-io/milvus/pull/36574">(#36574</a>)</li>
<li>Añadida nueva URL RESTful para describir las tareas de importación<a href="https://github.com/milvus-io/milvus/pull/36754">(#36754</a>)</li>
<li>Optimización de la programación de importaciones y adición de una métrica de coste temporal<a href="https://github.com/milvus-io/milvus/pull/36684">(#36684</a>)</li>
<li>Añadido registro de informe de balance para el balanceador del coordinador de consultas<a href="https://github.com/milvus-io/milvus/pull/36749">(#36749</a>)</li>
<li>Cambio al uso de la configuración común de GC<a href="https://github.com/milvus-io/milvus/pull/36670">(#36670</a>)</li>
<li>Añadido interruptor de política de reenvío de flujo para el delegador<a href="https://github.com/milvus-io/milvus/pull/36712">(#36712</a>)</li>
<li>Habilitada la compactación manual para colecciones sin índices<a href="https://github.com/milvus-io/milvus/pull/36581">(#36581</a>)</li>
<li>Habilitado el equilibrio de carga en nodos de consulta con capacidades de memoria variables<a href="https://github.com/milvus-io/milvus/pull/36625">(#36625</a>)</li>
<li>Caso unificado para etiquetas de entrada utilizando metrics.label<a href="https://github.com/milvus-io/milvus/pull/36616">(#36616</a>)</li>
<li>Se han hecho idempotentes las operaciones de canal/segmento de transferencia<a href="https://github.com/milvus-io/milvus/pull/36552">(#36552</a>)</li>
<li>Añadidas métricas para supervisar el rendimiento de importación y el recuento de filas importadas<a href="https://github.com/milvus-io/milvus/pull/36588">(#36588</a>)</li>
<li>Prevención de la creación de múltiples objetos de temporizador en los objetivos<a href="https://github.com/milvus-io/milvus/pull/36573">(#36573</a>)</li>
<li>Actualizada la versión de expresiones y el formato de respuesta HTTP para expresiones<a href="https://github.com/milvus-io/milvus/pull/36467">(#36467</a>)</li>
<li>Mejorada la recogida de basura en la instantánea KV<a href="https://github.com/milvus-io/milvus/pull/36793">(#36793</a>)</li>
<li>Añadido soporte para ejecutar métodos con parámetros de contexto<a href="https://github.com/milvus-io/milvus/pull/36798">(#36798</a>)</li>
</ul>
<h2 id="v2412" class="common-anchor-header">v2.4.12<button data-href="#v2412" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de publicación: 26 de septiembre de 2024</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.12</td><td>2.4.7</td><td>2.4.4</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.12 introduce mejoras significativas y correcciones de errores críticos. Esta versión soluciona los problemas de duplicación de datos y mejora la velocidad de recuperación de fallos, especialmente cuando se manejan grandes cantidades de borrados. Sin embargo, persiste un problema conocido por el que la recuperación de fallos puede ser lenta cuando se borran grandes cantidades de datos. Estamos trabajando activamente para resolver este problema.</p>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Se ha implementado una parada graceful para el gestor de flowgraph<a href="https://github.com/milvus-io/milvus/pull/36358">(#36358</a>)</li>
<li>Desactivada la comprobación de índices para campos vectoriales no cargados<a href="https://github.com/milvus-io/milvus/pull/36280">(#36280</a>)</li>
<li>Se han filtrado los registros borrados no exitosos durante la carga delta<a href="https://github.com/milvus-io/milvus/pull/36272">(#36272</a>)</li>
<li>Mejorada la gestión de errores para excepciones std::stoi<a href="https://github.com/milvus-io/milvus/pull/36296">(#36296</a>)</li>
<li>No se permiten palabras clave como nombres de campo o nombres de campo dinámicos<a href="https://github.com/milvus-io/milvus/pull/36108">(#36108</a>)</li>
<li>Añadidas métricas para borrar entradas en segmentos L0<a href="https://github.com/milvus-io/milvus/pull/36227">(#36227</a>)</li>
<li>Implementada la política de reenvío de L0 para soportar la carga remota<a href="https://github.com/milvus-io/milvus/pull/36208">(#36208</a>)</li>
<li>Añadida comprobación de carga de campo RNA en proxy<a href="https://github.com/milvus-io/milvus/pull/36194">(#36194</a>)</li>
<li>Habilitado el soporte de filas dispersas vacías<a href="https://github.com/milvus-io/milvus/pull/36061">(#36061</a>)</li>
<li>Corregida una vulnerabilidad de seguridad<a href="https://github.com/milvus-io/milvus/pull/36156">(#36156</a>)</li>
<li>Implementado un gestor de estadísticas para las métricas de tamaño de solicitud/respuesta<a href="https://github.com/milvus-io/milvus/pull/36118">(#36118</a>)</li>
<li>Se ha corregido la estimación del tamaño de las matrices de datos codificadas<a href="https://github.com/milvus-io/milvus/pull/36379">(#36379</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Resueltos errores de tipo de métrica para colecciones con dos campos vectoriales<a href="https://github.com/milvus-io/milvus/pull/36473">(#36473</a>)</li>
<li>Corregidos los problemas de almacenamiento en búferes largos que provocaban fallos en la recepción de colas de mensajes<a href="https://github.com/milvus-io/milvus/pull/36425">(#36425</a>)</li>
<li>Se ha implementado la devolución adecuada de compactación a segmentos tras la división<a href="https://github.com/milvus-io/milvus/pull/36429">(nº 36429</a>).</li>
<li>Resueltos los problemas de carrera de datos con la goroutina de comprobación de ID de nodo<a href="https://github.com/milvus-io/milvus/pull/36377">(#36377</a>)</li>
<li>Eliminada la comprobación del tipo de elemento<a href="https://github.com/milvus-io/milvus/pull/36324">(#36324</a>)</li>
<li>Solucionados los problemas de acceso concurrente para segmentos crecientes y sellados<a href="https://github.com/milvus-io/milvus/pull/36288">(#36288</a>)</li>
<li>Implementación de bloqueo de estado futuro<a href="https://github.com/milvus-io/milvus/pull/36333">(#36333</a>)</li>
<li>Corregido el uso de offset en HybridSearch<a href="https://github.com/milvus-io/milvus/pull/36287">(#36287</a>, <a href="https://github.com/milvus-io/milvus/pull/36253">#36253</a>)</li>
<li>Resuelto el segmento sucio/canal de fugas en QueryNode<a href="https://github.com/milvus-io/milvus/pull/36259">(#36259</a>)</li>
<li>Corregida la duplicación de claves primarias<a href="https://github.com/milvus-io/milvus/pull/36274">(#36274</a>)</li>
<li>Ajuste del tipo de métrica en las solicitudes de búsqueda<a href="https://github.com/milvus-io/milvus/pull/36279">(#36279</a>)</li>
<li>Corregido el problema de eliminación de la métrica stored_index_files_size<a href="https://github.com/milvus-io/milvus/pull/36161">(#36161</a>)</li>
<li>Se ha corregido el comportamiento del grupo de privilegios de lectura y escritura para el acceso global a la API<a href="https://github.com/milvus-io/milvus/pull/36145">(#36145</a>)</li>
</ul>
<h2 id="v2411" class="common-anchor-header">v2.4.11<button data-href="#v2411" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de publicación: 11 de septiembre de 2024</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.11</td><td>2.4.6</td><td>2.4.3</td><td>2.4.8</td></tr>
</tbody>
</table>
<p>Milvus 2.4.11 es una versión de corrección de errores que aborda múltiples problemas críticos relacionados con el índice trie MARISA, la compactación y las operaciones de carga. Esta versión introduce nuevas funciones para visualizar expresiones y mejorar la estabilidad de borrado. Recomendamos a todos los usuarios de la serie 2.4.x que actualicen a esta versión para beneficiarse de estas mejoras y correcciones.</p>
<h3 id="Features" class="common-anchor-header">Características</h3><ul>
<li>Añadida vista estática para expresiones en 2.4<a href="https://github.com/milvus-io/milvus/pull/35954">(#35954</a>)</li>
<li>Implementación de la lógica de cuotas relacionadas con el búfer de borrado<a href="https://github.com/milvus-io/milvus/pull/35997">(#35997</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Resuelto el problema de operación de rango de índice Trie para comparaciones GreaterThan y GreaterThanEqual<a href="https://github.com/milvus-io/milvus/pull/36126">(#36126</a>)</li>
<li>Corrección del uso de <code translate="no">marisa_label_order</code> en la construcción de índices Trie<a href="https://github.com/milvus-io/milvus/pull/36060">(#36060</a>)</li>
<li>Mejora de la comprobación de valores para <code translate="no">trie.predictive_search</code> <a href="https://github.com/milvus-io/milvus/pull/35999">(#35999</a>)</li>
<li>Habilitado el soporte de expresiones aritméticas binarias en índices invertidos<a href="https://github.com/milvus-io/milvus/pull/36097">(#36097</a>)</li>
<li>Corregido fallo de segmento causado por Skipindex<a href="https://github.com/milvus-io/milvus/pull/35908">(#35908</a>)</li>
<li>Resuelta la fuga de memoria en la meta caché del proxy<a href="https://github.com/milvus-io/milvus/pull/36076">(#36076</a>)</li>
<li>Cambio de nombre de la ruta del archivo mmap para evitar conflictos de directorio<a href="https://github.com/milvus-io/milvus/pull/35975">(#35975</a>)</li>
<li>Se ha mejorado el registro y la limpieza de las tareas fallidas o que agotan el tiempo de espera en la compactación mixta<a href="https://github.com/milvus-io/milvus/pull/35967">(#35967</a>).</li>
<li>Se ha solucionado el bloqueo lógico durante un uso elevado de memoria por parte del delegador<a href="https://github.com/milvus-io/milvus/pull/36066">(#36066</a>)</li>
<li>Implementación de la creación de segmentos vacíos cuando la compactación elimina todas las inserciones<a href="https://github.com/milvus-io/milvus/pull/36045">(nº 36045</a>)</li>
<li>Corregida la población de la lista de campos de carga de la información de carga de la versión antigua en 2.4<a href="https://github.com/milvus-io/milvus/pull/36018">(#36018</a>)</li>
<li>Corregida la lógica de actualización de la configuración de rastreo en 2.4<a href="https://github.com/milvus-io/milvus/pull/35998">(#35998</a>)</li>
<li>Resueltos los fallos de solicitud de búsqueda/consulta durante la liberación de particiones dinámicas<a href="https://github.com/milvus-io/milvus/pull/36019">(#36019</a>)</li>
<li>Se ha evitado la anulación de los parámetros de reserva<a href="https://github.com/milvus-io/milvus/pull/36006">(#36006</a>)</li>
<li>Asegurado el registro correcto de los grupos de privilegios para la validación<a href="https://github.com/milvus-io/milvus/pull/35938">(#35938</a>)</li>
<li>Se ha evitado la limpieza errónea de nodos limitadores de base de datos<a href="https://github.com/milvus-io/milvus/pull/35992">(#35992</a>)</li>
<li>Solucionado el problema de las réplicas que no participan en las consultas tras la recuperación de fallos<a href="https://github.com/milvus-io/milvus/pull/35925">(#35925</a>)</li>
<li>Resuelta carrera de datos en escritor de compactación de clustering<a href="https://github.com/milvus-io/milvus/pull/35958">(#35958</a>)</li>
<li>Corregida la referencia a variables tras una operación de movimiento<a href="https://github.com/milvus-io/milvus/pull/35904">(#35904</a>)</li>
<li>Implementación de la comprobación del comportamiento de carga de omisión de clave de agrupación<a href="https://github.com/milvus-io/milvus/pull/35899">(#35899</a>)</li>
<li>Asegurado el inicio único de los observadores querycoord en 2.4<a href="https://github.com/milvus-io/milvus/pull/35817">(#35817</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Actualizada la versión de Milvus &amp; proto a 2.4.11<a href="https://github.com/milvus-io/milvus/pull/36069">(#36069</a>)</li>
<li>Se ha corregido la pérdida de memoria en las pruebas unitarias y se ha habilitado la opción use_asan para las compilaciones unittest<a href="https://github.com/milvus-io/milvus/pull/35857">(#35857</a>)</li>
<li>Ajustados los límites de l0segmentsrowcount a valores más apropiados<a href="https://github.com/milvus-io/milvus/pull/36015">(#36015</a>)</li>
<li>Modificado el factor de estimación de memoria deltalog a uno<a href="https://github.com/milvus-io/milvus/pull/36035">(#36035</a>)</li>
<li>Implementación de slicesetequal para las comparaciones de listas de campos de carga<a href="https://github.com/milvus-io/milvus/pull/36062">(#36062</a>)</li>
<li>Reducida la frecuencia de registro para operaciones de borrado<a href="https://github.com/milvus-io/milvus/pull/35981">(#35981</a>)</li>
<li>Actualizada la versión de etcd a 3.5.14<a href="https://github.com/milvus-io/milvus/pull/35977">(#35977</a>)</li>
<li>Optimizada la reducción mmap-rss después del calentamiento<a href="https://github.com/milvus-io/milvus/pull/35965">(#35965</a>)</li>
<li>Eliminado el periodo de enfriamiento en el limitador de velocidad para peticiones de lectura<a href="https://github.com/milvus-io/milvus/pull/35936">(#35936</a>)</li>
<li>Mejorada la comprobación de campos de carga para colecciones previamente cargadas<a href="https://github.com/milvus-io/milvus/pull/35910">(#35910</a>)</li>
<li>Añadido soporte para eliminar roles relacionados con listas de privilegios en 2.4<a href="https://github.com/milvus-io/milvus/pull/35863">(#35863</a>)</li>
<li>Implementación de reglas depguard para prohibir el uso de bibliotecas proto obsoletas<a href="https://github.com/milvus-io/milvus/pull/35818">(#35818</a>)</li>
</ul>
<h3 id="Others" class="common-anchor-header">Otros</h3><ul>
<li>Actualizada la versión de Knowhere<a href="https://github.com/milvus-io/milvus/pull/36067">(#36067</a>)</li>
</ul>
<h2 id="v2410" class="common-anchor-header">v2.4.10<button data-href="#v2410" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 30 de agosto de 2024</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión Python SDK</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.10</td><td>2.4.6</td><td>2.4.3</td><td>2.4.6</td></tr>
</tbody>
</table>
<p>Milvus 2.4.10 introduce mejoras significativas en funcionalidad y estabilidad. Las características clave incluyen soporte para operaciones upsert en colecciones habilitadas para AutoID, capacidades de carga parcial de colecciones y varias configuraciones de mapa de memoria (MMAP) para optimizar el uso de memoria. Esta versión también soluciona varios errores que provocaban pánicos, volcados de memoria y fugas de recursos. Recomendamos la actualización para aprovechar al máximo estas mejoras.</p>
<h3 id="Features" class="common-anchor-header">Características</h3><ul>
<li><strong>Upsert con identificación automática</strong>: Soporte para operaciones upsert con generación automática de ID<a href="https://github.com/milvus-io/milvus/pull/34633">(#34633</a>)</li>
<li><strong>Carga parcial de campos de una colección</strong> [Beta Preview]: Permite cargar campos específicos de una colección<a href="https://github.com/milvus-io/milvus/pull/35696">(#35696</a>)</li>
<li><strong>Mejoras RBAC</strong>:<ul>
<li>Añadido soporte de mensajes RBAC para la Captura de Datos de Cambios (CDC)<a href="https://github.com/milvus-io/milvus/pull/35562">(#35562</a>)</li>
<li>Introducción de grupos de privilegios de sólo lectura/escritura/admin para simplificar el proceso de concesión de RBAC<a href="https://github.com/milvus-io/milvus/pull/35543">(#35543</a>)</li>
<li>Nueva API para realizar copias de seguridad y restaurar configuraciones RBAC<a href="https://github.com/milvus-io/milvus/pull/35513">(#35513</a>)</li>
<li>Actualizar caché de proxy después de restaurar metadatos RBAC<a href="https://github.com/milvus-io/milvus/pull/35636">(#35636</a>)</li>
</ul></li>
<li><strong>Configuración MMAP mejorada</strong>: Más opciones de configuración general para controlar el comportamiento de MMAP<a href="https://github.com/milvus-io/milvus/pull/35609">(#35609</a>)</li>
<li><strong>Restricciones de acceso a bases de datos</strong>: Nuevas propiedades para restringir el acceso de lectura a bases de datos<a href="https://github.com/milvus-io/milvus/pull/35754">(#35754</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Corregido el problema de que el cliente Arrow Go no devuelve error<a href="https://github.com/milvus-io/milvus/pull/35820">(#35820</a>)</li>
<li>Corregida la limitación de velocidad imprecisa<a href="https://github.com/milvus-io/milvus/pull/35700">(#35700</a>)</li>
<li>Resuelto el pánico del proxy tras fallos de la API relacionados con la importación<a href="https://github.com/milvus-io/milvus/pull/35559">(#35559</a>)</li>
<li>Corregidos posibles borrados erróneos durante los puntos de comprobación del canal GC<a href="https://github.com/milvus-io/milvus/pull/35708">(#35708</a>)</li>
<li>Solucionado el pánico debido a segmentos de importación candidatos vacíos<a href="https://github.com/milvus-io/milvus/pull/35674">(#35674</a>)</li>
<li>Corrección de la asignación de memoria mmap<a href="https://github.com/milvus-io/milvus/pull/35726">(#35726</a>)</li>
<li>Asegurado canal adecuado viendo para las actualizaciones de 2.2 a 2.4<a href="https://github.com/milvus-io/milvus/pull/35695">(#35695</a>)</li>
<li>Corregida la función de liberación de canal de DataNode unwatching<a href="https://github.com/milvus-io/milvus/pull/35657">(#35657</a>)</li>
<li>Corregido el recuento de particiones en los metadatos RootCoord<a href="https://github.com/milvus-io/milvus/pull/35601">(#35601</a>)</li>
<li>Resueltos los problemas con las actualizaciones de configuración dinámica para ciertos parámetros<a href="https://github.com/milvus-io/milvus/pull/35637">(#35637</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><h4 id="Performance" class="common-anchor-header">Rendimiento</h4><ul>
<li>Optimización de la recuperación en campos dinámicos<a href="https://github.com/milvus-io/milvus/pull/35602">(#35602</a>)</li>
<li>Mejora del rendimiento del conjunto de bits para AVX512<a href="https://github.com/milvus-io/milvus/pull/35480">(#35480</a>)</li>
<li>Nueva lectura del valor tras la inicialización de <code translate="no">once</code> para mejorar la eficiencia<a href="https://github.com/milvus-io/milvus/pull/35643">(#35643</a>)</li>
</ul>
<h4 id="Rolling-upgrade-improvements" class="common-anchor-header">Mejoras en la actualización continua</h4><ul>
<li>Marcado de nodo de consulta como sólo lectura después de suspenderlo<a href="https://github.com/milvus-io/milvus/pull/35586">(#35586</a>)</li>
<li>Evitar la coexistencia del coordinador antiguo con el nuevo nodo/proxy<a href="https://github.com/milvus-io/milvus/pull/35760">(#35760</a>)</li>
</ul>
<h4 id="Others" class="common-anchor-header">Otros</h4><ul>
<li>Optimizado el proceso de construcción del núcleo de Milvus<a href="https://github.com/milvus-io/milvus/pull/35660">(#35660</a>)</li>
<li>Actualización a protobuf-go v2<a href="https://github.com/milvus-io/milvus/pull/35555">(#35555</a>)</li>
<li>Rastreo mejorado con codificación de cadena hexadecimal para traceid y spanid<a href="https://github.com/milvus-io/milvus/pull/35568">(#35568</a>)</li>
<li>Añadidas métricas de número de segmento para el gancho de consulta<a href="https://github.com/milvus-io/milvus/pull/35619">(#35619</a>)</li>
<li>Mejora de la compatibilidad con el SDK antiguo para la función de configuración de parámetros de carga<a href="https://github.com/milvus-io/milvus/pull/35573">(#35573</a>)</li>
<li>Añadido soporte para HTTP v1/v2 throttling<a href="https://github.com/milvus-io/milvus/pull/35504">(#35504</a>)</li>
<li>Corregida la estimación de memoria de índice<a href="https://github.com/milvus-io/milvus/pull/35670">(#35670</a>)</li>
<li>Posibilidad de escribir varios segmentos en el compactador de mezcla para evitar la generación de segmentos grandes<a href="https://github.com/milvus-io/milvus/pull/35648">(#35648</a>)</li>
</ul>
<h2 id="v249" class="common-anchor-header">v2.4.9<button data-href="#v249" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 20 de agosto de 2024</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.9</td><td>2.4.5</td><td>2.4.3</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus v2.4.9 soluciona un problema crítico que podía devolver resultados inferiores al límite (topk) en algunos casos e incluye varias mejoras clave para aumentar el rendimiento y la usabilidad de la plataforma.</p>
<h3 id="Critical-fixes" class="common-anchor-header">Correcciones críticas</h3><ul>
<li>Excluido el segmento l0 de la instantánea legible<a href="https://github.com/milvus-io/milvus/pull/35510">(#35510</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Eliminada la creación duplicada de ayudantes de esquema en el proxy<a href="https://github.com/milvus-io/milvus/pull/35502">(#35502</a>).</li>
<li>Añadido soporte para compilar Milvus en Ubuntu 20.04<a href="https://github.com/milvus-io/milvus/pull/35457">(#35457</a>).</li>
<li>Optimizado el uso de bloqueos y evitado la doble descarga del escritor de búferes de clustering<a href="https://github.com/milvus-io/milvus/pull/35490">(#35490</a>).</li>
<li>Eliminado el registro inválido<a href="https://github.com/milvus-io/milvus/pull/35473">(#35473</a>).</li>
<li>Añadida una guía de usuario de compactación de clustering<a href="https://github.com/milvus-io/milvus/pull/35428">(#35428</a>).</li>
<li>Añadido soporte para campos dinámicos en el schema helper<a href="https://github.com/milvus-io/milvus/pull/35469">(#35469</a>).</li>
<li>Añadida la sección msgchannel en el YAML generado<a href="https://github.com/milvus-io/milvus/pull/35466">(#35466</a>).</li>
</ul>
<h2 id="v248" class="common-anchor-header">v2.4.8<button data-href="#v248" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de publicación: 14 de agosto de 2024</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.8</td><td>2.4.5</td><td>2.4.3</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus 2.4.8 introdujo varias mejoras significativas en el rendimiento y la estabilidad del sistema. La característica más notable fue la implementación de la compactación de agrupaciones, un mecanismo que mejora la eficiencia de las búsquedas y consultas mediante la redistribución de los datos en grandes colecciones basándose en una clave de agrupación designada, lo que reduce la cantidad de datos escaneados. La compactación también se desacopló del DataNode shard, permitiendo que cualquier DataNode realizara la compactación de forma independiente, lo que mejoró la tolerancia a fallos, la estabilidad, el rendimiento y la escalabilidad. Además, se ha refactorizado la interfaz entre los componentes Go y C++ para utilizar llamadas CGO asíncronas, lo que ha permitido resolver problemas como los tiempos de espera de sesión, y se han realizado otras optimizaciones de rendimiento basadas en la creación de perfiles. También se han actualizado las dependencias de la aplicación para solucionar vulnerabilidades de seguridad conocidas. Además, esta versión incluye numerosas optimizaciones de rendimiento y correcciones de errores críticos.</p>
<h3 id="Features" class="common-anchor-header">Características</h3><ul>
<li>Se ha implementado la compactación de agrupaciones, que permite redistribuir los datos en función de una clave de agrupación designada para mejorar la eficacia de las consultas<a href="https://github.com/milvus-io/milvus/pull/34326">(#34326</a>),<a href="https://github.com/milvus-io/milvus/pull/34363">(#34363</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Implementación de capacidades de búsqueda y recuperación asíncronas en CGO.<a href="https://github.com/milvus-io/milvus/pull/34200">(#34200</a>)</li>
<li>Separación del proceso de compactación del Shard DataNode para mejorar la modularidad del sistema.<a href="https://github.com/milvus-io/milvus/pull/34157">(#34157</a>)</li>
<li>Añadido soporte para la agrupación de clientes en QueryNode dentro del proxy/delegador para mejorar el rendimiento.<a href="https://github.com/milvus-io/milvus/pull/35195">(#35195</a>)</li>
<li>Sonic integrado para minimizar la sobrecarga de la CPU durante JSON marshaling y unmarshaling en Gin y RestfulV1 manejadores.<a href="https://github.com/milvus-io/milvus/pull/35018">(#35018</a>)</li>
<li>Se ha introducido una caché en memoria para optimizar la recuperación de resultados de autenticación.<a href="https://github.com/milvus-io/milvus/pull/35272">(#35272</a>)</li>
<li>Modificado el tipo de métrica por defecto para autoindex.<a href="https://github.com/milvus-io/milvus/pull/34277">[#34277</a>, <a href="https://github.com/milvus-io/milvus/pull/34479">#34479</a>]</li>
<li>Se ha refactorizado el formato de memoria en tiempo de ejecución para las columnas variables, lo que ha permitido reducir el uso de memoria.<a href="https://github.com/milvus-io/milvus/pull/34367">[#34367</a>, <a href="https://github.com/milvus-io/milvus/pull/35012">#35012</a>, <a href="https://github.com/milvus-io/milvus/pull/35041">#35041</a>]</li>
<li>Refactorizados los procesos de compactación para permitir el almacenamiento persistente de datos.<a href="https://github.com/milvus-io/milvus/pull/34268">(#34268</a>)</li>
<li>Habilitado el soporte de archivos mapeados en memoria para segmentos crecientes, mejorando la gestión de memoria.<a href="https://github.com/milvus-io/milvus/pull/34110">(#34110</a>)</li>
<li>Mejorados los registros de acceso añadiendo soporte RESTful API, registrando niveles de consistencia y distinguiendo entre errores de sistema y de usuario.<a href="https://github.com/milvus-io/milvus/pull/34295">[#34295</a>, <a href="https://github.com/milvus-io/milvus/pull/34352">#34352</a>, <a href="https://github.com/milvus-io/milvus/pull/34396">#34396</a>]</li>
<li>Utilizado el nuevo parámetro <code translate="no">range_search_k</code> en Knowhere para acelerar las búsquedas de rango.<a href="https://github.com/milvus-io/milvus/pull/34709">(#34709</a>)</li>
<li>Aplicados filtros Bloom bloqueados para mejorar la velocidad de construcción de filtros y consultas.<a href="https://github.com/milvus-io/milvus/pull/34377">[#34377</a>, <a href="https://github.com/milvus-io/milvus/pull/34922">#34922</a>]</li>
<li>Mejoras en el Uso de Memoria:<ul>
<li>Espacio preasignado para los buffers de inserción de DataNode.<a href="https://github.com/milvus-io/milvus/pull/34205">(#34205</a>)</li>
<li>Espacio preasignado <code translate="no">FieldData</code> para operaciones de reducción.<a href="https://github.com/milvus-io/milvus/pull/34254">(#34254</a>)</li>
<li>Registros liberados en el códec de borrado para evitar fugas de memoria.<a href="https://github.com/milvus-io/milvus/pull/34506">(#34506</a>)</li>
<li>Controlado el nivel de concurrencia del gestor de archivos de disco durante la carga de archivos.<a href="https://github.com/milvus-io/milvus/pull/35282">(#35282</a>)</li>
<li>Optimizada la lógica de recolección de basura en tiempo de ejecución de Go para la liberación oportuna de memoria.<a href="https://github.com/milvus-io/milvus/pull/34950">(#34950</a>)</li>
<li>Implementada una nueva política de sellado para segmentos crecientes.<a href="https://github.com/milvus-io/milvus/pull/34779">(#34779</a>)</li>
</ul></li>
<li>Mejoras en DataCoord:<ul>
<li>Reducción del uso de CPU.<a href="https://github.com/milvus-io/milvus/pull/34231">[#34231</a>, <a href="https://github.com/milvus-io/milvus/pull/34309">#34309</a>]</li>
<li>Implementada una lógica de salida de la recolección de basura más rápida.<a href="https://github.com/milvus-io/milvus/pull/35051">(#35051</a>)</li>
<li>Mejorados los algoritmos de programación de nodos trabajadores.<a href="https://github.com/milvus-io/milvus/pull/34382">(#34382</a>)</li>
<li>Mejorado el algoritmo de control de tamaño de segmento específicamente para operaciones de importación.<a href="https://github.com/milvus-io/milvus/pull/35149">(#35149</a>)</li>
</ul></li>
<li>Mejoras en el algoritmo de equilibrio de carga:<ul>
<li>Reducido el factor de sobrecarga de memoria en el delegador.<a href="https://github.com/milvus-io/milvus/pull/35164">(#35164</a>)</li>
<li>Asignado un tamaño de memoria fijo para el delegador.<a href="https://github.com/milvus-io/milvus/pull/34600">(#34600</a>)</li>
<li>Evitada la asignación excesiva de segmentos y canales para nuevos nodos de consulta.<a href="https://github.com/milvus-io/milvus/pull/34245">(#34245</a>)</li>
<li>Reducido el número de tareas por ciclo de programación por parte del Coordinador de Consultas mientras se incrementa la frecuencia de programación.<a href="https://github.com/milvus-io/milvus/pull/34987">(#34987</a>)</li>
<li>Mejorado el algoritmo de equilibrio de canales en el DataNode.<a href="https://github.com/milvus-io/milvus/pull/35033">(#35033</a>)</li>
</ul></li>
<li>Métricas del sistema ampliadas: Se han añadido nuevas métricas en varios componentes para supervisar aspectos específicos, como:<ul>
<li>Estado de escritura forzada.<a href="https://github.com/milvus-io/milvus/pull/34989">(#34989</a>)</li>
<li>Latencia de la cola.<a href="https://github.com/milvus-io/milvus/pull/34788">(#34788</a>)</li>
<li>Cuota de disco.<a href="https://github.com/milvus-io/milvus/pull/35306">(#35306</a>)</li>
<li>Tiempo de ejecución de tareas.<a href="https://github.com/milvus-io/milvus/pull/35141">(#35141</a>)</li>
<li>Tamaño del binlog.<a href="https://github.com/milvus-io/milvus/pull/35235">(#35235</a>)</li>
<li>Tasa de inserción.<a href="https://github.com/milvus-io/milvus/pull/35188">(#35188</a>)</li>
<li>Nivel alto de memoria.<a href="https://github.com/milvus-io/milvus/pull/35188">(#35188</a>)</li>
<li>Métricas de la API RESTful.<a href="https://github.com/milvus-io/milvus/pull/35083">(#35083</a>)</li>
<li>Latencia de búsqueda.<a href="https://github.com/milvus-io/milvus/pull/34783">(#34783</a>)</li>
</ul></li>
</ul>
<h3 id="Changes" class="common-anchor-header">Cambios en</h3><ul>
<li><p>Para los usuarios de código abierto, esta versión cambia los tipos de métrica en AutoIndex para <code translate="no">FloatVector</code> y <code translate="no">BinaryVector</code> a <code translate="no">Cosine</code> y <code translate="no">Hamming</code>, respectivamente.</p></li>
<li><p>Versiones<strong>corregidas de dependencias de terceros</strong>:</p>
<ul>
<li>Esta versión introduce versiones fijas para ciertas bibliotecas de dependencias de terceros, mejorando significativamente la gestión de la cadena de suministro de software de Milvus.</li>
<li>Al aislar el proyecto de los cambios aguas arriba, protege las compilaciones diarias de posibles interrupciones.</li>
<li>La actualización garantiza la estabilidad alojando exclusivamente paquetes validados de C++ de terceros en JFrog Cloud y utilizando Conan Recipe Revisions (RREV).</li>
<li>Este enfoque mitiga el riesgo de romper los cambios de las actualizaciones en ConanCenter.</li>
<li>Los desarrolladores que utilicen Ubuntu 22.04 se beneficiarán inmediatamente de estos cambios. Sin embargo, es posible que los desarrolladores de otros sistemas operativos deban actualizar su versión de <code translate="no">glibc</code> para evitar problemas de compatibilidad.</li>
</ul></li>
</ul>
<h3 id="Critical-bug-fixes" class="common-anchor-header">Corrección de errores críticos</h3><ul>
<li>Se ha corregido un problema por el que se perdían datos de borrado debido a que se omitían segmentos durante la compactación L0.<a href="https://github.com/milvus-io/milvus/pull/33980">[#33980</a>, <a href="https://github.com/milvus-io/milvus/pull/34363">#34363</a>]</li>
<li>Rectificado un problema por el que los mensajes de borrado no se reenviaban debido a un manejo incorrecto del ámbito de los datos.<a href="https://github.com/milvus-io/milvus/pull/35313">(#35313</a>)</li>
<li>Resuelta una excepción SIGBUS que se producía debido al uso incorrecto de <code translate="no">mmap</code>.<a href="https://github.com/milvus-io/milvus/pull/34455">[#34455</a>, <a href="https://github.com/milvus-io/milvus/pull/34530">#34530</a>]</li>
<li>Corregidos fallos causados por expresiones de búsqueda ilegales.<a href="https://github.com/milvus-io/milvus/pull/35307">(#35307</a>)</li>
<li>Corregido un problema en el que la vigilancia de DataNode fallaba debido a un ajuste incorrecto del tiempo de espera en el contexto de vigilancia.<a href="https://github.com/milvus-io/milvus/pull/35017">(#35017</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Se han corregido vulnerabilidades de seguridad mediante la actualización de ciertas dependencias.<a href="https://github.com/milvus-io/milvus/pull/33927">[#33927</a>, <a href="https://github.com/milvus-io/milvus/pull/34693">#34693</a>]</li>
<li>Corregido un error de análisis provocado por expresiones excesivamente largas.<a href="https://github.com/milvus-io/milvus/pull/34957">(#34957</a>)</li>
<li>Resuelta una fuga de memoria que se producía durante el análisis del plan de consultas.<a href="https://github.com/milvus-io/milvus/pull/34932">(#34932</a>)</li>
<li>Solucionado un problema por el que las modificaciones dinámicas del nivel de registro no surtían efecto.<a href="https://github.com/milvus-io/milvus/pull/34777">(#34777</a>)</li>
<li>Se ha resuelto un problema por el que las consultas de agrupar por sobre datos crecientes fallaban debido a desplazamientos de segmento no inicializados.<a href="https://github.com/milvus-io/milvus/pull/34750">(#34750</a>)</li>
<li>Se ha corregido la configuración de los parámetros de búsqueda al utilizar el iterador Knowhere.<a href="https://github.com/milvus-io/milvus/pull/34732">(#34732</a>)</li>
<li>Revisada la lógica para comprobar el estado de la carga de particiones.<a href="https://github.com/milvus-io/milvus/pull/34305">(#34305</a>)</li>
<li>Se corrigió un problema donde las actualizaciones de caché de privilegios fallaban debido a errores de solicitud no manejados.<a href="https://github.com/milvus-io/milvus/pull/34697">(#34697</a>)</li>
<li>Resuelto un fallo en la recuperación de colecciones cargadas tras el reinicio de QueryCoord.<a href="https://github.com/milvus-io/milvus/pull/35211">(#35211</a>)</li>
<li>Solucionado un problema de idempotencia de carga eliminando la validación innecesaria de parámetros de índice.<a href="https://github.com/milvus-io/milvus/pull/35179">(#35179</a>)</li>
<li>Asegurado <code translate="no">compressBinlog</code> se ejecuta para permitir <code translate="no">reloadFromKV</code> para llenar correctamente <code translate="no">logID</code> de binlog después de DataCoord reinicia.<a href="https://github.com/milvus-io/milvus/pull/34062">(#34062</a>)</li>
<li>Se ha corregido un problema por el que los metadatos de recogida no se eliminaban después de la recogida de basura en DataCoord.<a href="https://github.com/milvus-io/milvus/pull/34884">(#34884</a>)</li>
<li>Se ha resuelto una fuga de memoria en SegmentManager dentro de DataCoord mediante la eliminación de segmentos lavados generados a través de importaciones.<a href="https://github.com/milvus-io/milvus/pull/34651">(#34651</a>)</li>
<li>Se ha solucionado un problema de pánico cuando se desactivaba la compactación y se eliminaba una colección.<a href="https://github.com/milvus-io/milvus/pull/34206">(#34206</a>)</li>
<li>Se ha corregido un problema de falta de memoria en DataNode mejorando el algoritmo de estimación del uso de memoria.<a href="https://github.com/milvus-io/milvus/pull/34203">(#34203</a>)</li>
<li>Se ha evitado el uso de memoria en ráfagas cuando varias solicitudes de recuperación de vectores fallan en la caché mediante la implementación de singleflight para la caché de trozos.<a href="https://github.com/milvus-io/milvus/pull/34283">(#34283</a>)</li>
<li>Capturado <code translate="no">ErrKeyNotFound</code> durante las operaciones CAS (Compare and Swap) en la configuración.<a href="https://github.com/milvus-io/milvus/pull/34489">(#34489</a>)</li>
<li>Se ha solucionado un problema por el que fallaban las actualizaciones de la configuración debido al uso erróneo del valor formateado en una operación CAS.<a href="https://github.com/milvus-io/milvus/pull/34373">(#34373</a>)</li>
</ul>
<h3 id="Miscellaneous" class="common-anchor-header">Varios</h3><ul>
<li>Añadido soporte para el exportador OTLP HTTP, mejorando las capacidades de observación y monitorización.<a href="https://github.com/milvus-io/milvus/pull/35073">[#35073</a>, <a href="https://github.com/milvus-io/milvus/pull/35299">#35299</a>]</li>
<li>Mejorada la funcionalidad de la base de datos introduciendo propiedades como "max collections" y "disk quota", que ahora pueden ser modificadas dinámicamente.<a href="https://github.com/milvus-io/milvus/pull/34511">[#34511</a>, <a href="https://github.com/milvus-io/milvus/pull/34386">#34386</a>]</li>
<li>Añadidas capacidades de rastreo para procesos de compactación L0 dentro de DataNode para mejorar el diagnóstico y la monitorización.<a href="https://github.com/milvus-io/milvus/pull/33898">(#33898</a>)</li>
<li>Introducida configuración de cuota para el número de entradas de segmento L0 por colección, permitiendo un mejor control sobre las tasas de borrado mediante la aplicación de backpressure.<a href="https://github.com/milvus-io/milvus/pull/34837">(#34837</a>)</li>
<li>Se ha ampliado el mecanismo de limitación de velocidad de las operaciones de inserción para cubrir también las operaciones de inserción ascendente, lo que garantiza un rendimiento constante con cargas elevadas.<a href="https://github.com/milvus-io/milvus/pull/34616">(#34616</a>)</li>
<li>Implementado un pool dinámico de CGO para llamadas proxy CGO, optimizando el uso de recursos y el rendimiento.<a href="https://github.com/milvus-io/milvus/pull/34842">(#34842</a>)</li>
<li>Habilitada la opción de compilación DiskAnn para los sistemas operativos Ubuntu, Rocky y Amazon, mejorando la compatibilidad y el rendimiento en estas plataformas.<a href="https://github.com/milvus-io/milvus/pull/34244">(#34244</a>)</li>
<li>Actualizado Conan a la versión 1.64.1, asegurando la compatibilidad con las últimas características y mejoras.<a href="https://github.com/milvus-io/milvus/pull/35216">(#35216</a>)</li>
<li>Actualización de Knowhere a la versión 2.3.7, con mejoras de rendimiento y nuevas funciones.<a href="https://github.com/milvus-io/milvus/pull/34709">(#34709</a>)</li>
<li>Corregida la revisión de paquetes específicos de terceros para asegurar construcciones consistentes y reducir el riesgo de cambios inesperados.<a href="https://github.com/milvus-io/milvus/pull/35316">(#35316</a>)</li>
</ul>
<h2 id="v246" class="common-anchor-header">v2.4.6<button data-href="#v246" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 16 de julio de 2024</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.6</td><td>2.4.4</td><td>2.4.2</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus v2.4.6 es una versión de corrección de errores que soluciona problemas críticos como pánicos, fugas de memoria y pérdida de datos durante los borrados. También introduce varias optimizaciones, incluidas mejoras en las métricas de supervisión, la actualización de la versión Go a 1.21 y la mejora de la experiencia de usuario para las consultas RESTful count(*).</p>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Mejora de la facilidad de uso de las consultas RESTful API<a href="https://github.com/milvus-io/milvus/pull/34444">(#34444</a>).</li>
<li>Actualizada la versión Go de 1.20 a 1.21<a href="https://github.com/milvus-io/milvus/pull/33940">(#33940</a>).</li>
<li>Optimizado el cubo métrico histograma para granularidad más fina en bucketing<a href="https://github.com/milvus-io/milvus/pull/34592">(#34592</a>).</li>
<li>Actualizada la versión de dependencia de Pulsar de 2.8.2 a 2.9.5. Se recomienda actualizar Pulsar a 2.9.5 desde Milvus 2.4.6.</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Se ha corregido un problema por el que la API GetReplicas devolvía un estado nulo<a href="https://github.com/milvus-io/milvus/pull/34019">(#34019</a>).</li>
<li>Se ha corregido un problema por el que las consultas podían devolver registros eliminados<a href="https://github.com/milvus-io/milvus/pull/34502">(#34502</a>).</li>
<li>Se ha resuelto un problema por el que IndexNode se bloqueaba durante la detención debido a un control incorrecto del tiempo de vida<a href="https://github.com/milvus-io/milvus/pull/34559">(#34559</a>).</li>
<li>Corregida una fuga de memoria de objetos oráculo de clave primaria cuando un trabajador está desconectado<a href="https://github.com/milvus-io/milvus/pull/34020">(#34020</a>).</li>
<li>Corregido ChannelManagerImplV2 para notificar al Nodo correcto, solucionando problemas de captura de parámetros en el cierre de bucle<a href="https://github.com/milvus-io/milvus/pull/34004">(#34004</a>).</li>
<li>Se ha corregido una carrera de lectura-escritura de datos en ImportTask segmentsInfo implementando una copia profunda<a href="https://github.com/milvus-io/milvus/pull/34126">(#34126</a>).</li>
<li>Corregida la información de versión para la opción de configuración "legacyVersionWithoutRPCWatch" para evitar errores durante las actualizaciones continuas<a href="https://github.com/milvus-io/milvus/pull/34185">(#34185</a>).</li>
<li>Corregida la métrica para el número de particiones cargadas<a href="https://github.com/milvus-io/milvus/pull/34195">(#34195</a>).</li>
<li>Se ha pasado la configuración de <code translate="no">otlpSecure</code> al configurar el seguimiento de segcore<a href="https://github.com/milvus-io/milvus/pull/34210">(#34210</a>).</li>
<li>Solucionado un problema por el que las propiedades de DataCoord se sobrescribían por error<a href="https://github.com/milvus-io/milvus/pull/34240">(#34240</a>).</li>
<li>Resuelto un problema de pérdida de datos causado por la fusión errónea de dos flujos de mensajes recién creados<a href="https://github.com/milvus-io/milvus/pull/34563">(#34563</a>).</li>
<li>Corregido un pánico causado por msgstream intentando consumir un pchannel inválido<a href="https://github.com/milvus-io/milvus/pull/34230">(#34230</a>).</li>
<li>Se ha solucionado un problema por el que las importaciones podían generar archivos huérfanos<a href="https://github.com/milvus-io/milvus/pull/34071">(nº 34071</a>).</li>
<li>Se han corregido los resultados de consulta incompletos debidos a claves primarias duplicadas en un segmento<a href="https://github.com/milvus-io/milvus/pull/34302">(nº 34302</a>).</li>
<li>Resuelto un problema de segmentos sellados faltantes en la compactación L0<a href="https://github.com/milvus-io/milvus/pull/34566">(#34566</a>).</li>
<li>Corregido el problema de datos sucios en el canal-cp meta generado después de la recolección de basura<a href="https://github.com/milvus-io/milvus/pull/34609">(#34609</a>).</li>
<li>Corregida la métrica donde database_num era 0 después de reiniciar RootCoord<a href="https://github.com/milvus-io/milvus/pull/34010">(#34010</a>).</li>
<li>Corregida una fuga de memoria en SegmentManager en DataCoord al eliminar los segmentos flushed generados a través de la importación<a href="https://github.com/milvus-io/milvus/pull/34652">(#34652</a>).</li>
<li>Asegurado compressBinlog para llenar binlogs' logID después de DataCoord reinicia, asegurando la correcta recarga de KV<a href="https://github.com/milvus-io/milvus/pull/34064">(#34064</a>).</li>
</ul>
<h2 id="v245" class="common-anchor-header">v2.4.5<button data-href="#v245" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 18 de junio de 2024</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión Java SDK</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.5</td><td>2.4.4</td><td>2.4.1</td><td>2.4.3</td></tr>
</tbody>
</table>
<p>El lanzamiento de Milvus 2.4.5 introduce varias mejoras y correcciones de errores para mejorar el rendimiento, la estabilidad y la funcionalidad. Milvus 2.4.5 simplifica la búsqueda de vectores dispersos, float16 y bfloat16 con autoindexación, acelera las búsquedas, eliminaciones y compactaciones con las optimizaciones del filtro Bloom y aborda la gestión de datos mediante tiempos de carga más rápidos y compatibilidad con la importación de segmentos L0. También introduce el índice HNSW disperso para la búsqueda eficiente de datos dispersos de alta dimensión, mejora la API RESTful con soporte de vectores flotantes dispersos y corrige errores críticos para mejorar la estabilidad.</p>
<h3 id="New-Features" class="common-anchor-header">Novedades</h3><ul>
<li>Se ha añadido compatibilidad con rbac a la API de descripción/alteración de bases de datos<a href="https://github.com/milvus-io/milvus/pull/33804">(nº 33804</a>).</li>
<li>Soporte de la creación del índice HNSW para vectores dispersos<a href="https://github.com/milvus-io/milvus/pull/33653">(#33653</a>, <a href="https://github.com/milvus-io/milvus/pull/33662">#33662</a>)</li>
<li>Posibilidad de crear el índice de disco para vectores binarios<a href="https://github.com/milvus-io/milvus/pull/33575">(#33575</a>)</li>
<li>Soporte de vectores dispersos en RESTful v2<a href="https://github.com/milvus-io/milvus/pull/33555">(#33555</a>)</li>
<li>Añadir /management/stop RESTful api para detener un componente<a href="https://github.com/milvus-io/milvus/pull/33799">(#33799</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Fijar el valor por defecto de maxPartitionNum en 1024<a href="https://github.com/milvus-io/milvus/pull/33950">(#33950</a>)</li>
<li>Habilitado el restablecimiento forzado de la conexión en caso de error de indisponibilidad<a href="https://github.com/milvus-io/milvus/pull/33910">(#33910</a>)</li>
<li>Habilitado limitador de tasa de descarga de nivel de colección<a href="https://github.com/milvus-io/milvus/pull/33864">(#33864</a>)</li>
<li>Ejecutado bloom filter aplicar en paralelo para acelerar segmento predecir<a href="https://github.com/milvus-io/milvus/pull/33793">(#33793</a>)</li>
<li>Utilizado fastjson lib para unmarshal borrar registro para acelerar json.Unmarshal<a href="https://github.com/milvus-io/milvus/pull/33802">(#33802</a>)</li>
<li>Utilización de BatchPkExist para reducir el coste de la llamada a la función bloom filter<a href="https://github.com/milvus-io/milvus/pull/33752">(#33752</a>)</li>
<li>Acelerada la carga de colecciones pequeñas<a href="https://github.com/milvus-io/milvus/pull/33746">(#33746</a>)</li>
<li>Soportada la importación de datos de borrado al segmento L0 (<a href="https://github.com/milvus-io/milvus/pull/33712">#33712</a>)</li>
<li>Se han omitido las tareas de compactación de marcas para evitar que se ejecute la misma tarea una y otra vez<a href="https://github.com/milvus-io/milvus/pull/33833">(#33833</a>)</li>
<li>Los vectores float16 y bfloat16 se tratan como BinaryVector en la inserción masiva de numpy (<a href="https://github.com/milvus-io/milvus/pull/33788">#33788</a>)</li>
<li>Añadido el indicador includeCurrentMsg para el método seek<a href="https://github.com/milvus-io/milvus/pull/33743">(#33743</a>)</li>
<li>Añadido mergeInterval, targetBufSize, maxTolerantLagof msgdispatcher a las configuraciones<a href="https://github.com/milvus-io/milvus/pull/33680">(#33680</a>)</li>
<li>Mejorado GetVectorByID de vector disperso<a href="https://github.com/milvus-io/milvus/pull/33652">(#33652</a>)</li>
<li>Se ha eliminado StringPrimarykey para reducir el coste innecesario de las copias y las llamadas a funciones (<a href="https://github.com/milvus-io/milvus/pull/33649">#33649</a>)</li>
<li>Añadida la asignación de autoíndices para tipos de datos binarios/esparcidos<a href="https://github.com/milvus-io/milvus/pull/33625">(#33625</a>)</li>
<li>Optimizado algunos caché para reducir el uso de memoria<a href="https://github.com/milvus-io/milvus/pull/33560">(#33560</a>)</li>
<li>Interfaz de ejecución abstraída para la tarea de importación/preimportación (<a href="https://github.com/milvus-io/milvus/pull/33607">#33607</a>)</li>
<li>Utilizado mapa pk a timestamp en inserción de búfer para reducir causas bf<a href="https://github.com/milvus-io/milvus/pull/33582">(#33582</a>)</li>
<li>Evitar meta operaciones redundantes de importación (<a href="https://github.com/milvus-io/milvus/pull/33519">#33519</a>)</li>
<li>Mejora de los registros mediante el registro de mejor información de cuota de disco, añadiendo la bandera UseDefaultConsistency, eliminando registros innecesarios<a href="https://github.com/milvus-io/milvus/pull/33597">(#33597</a>, <a href="https://github.com/milvus-io/milvus/pull/33644">#33644</a>, <a href="https://github.com/milvus-io/milvus/pull/33670">#33670</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Corregido un error que impedía a queryHook reconocer el tipo de vector<a href="https://github.com/milvus-io/milvus/pull/33911">(#33911</a>)</li>
<li>Impedido el uso capturado iteración variable partitionID<a href="https://github.com/milvus-io/milvus/pull/33970">(#33970</a>)</li>
<li>Se ha corregido un error que podía provocar que Milvus no pudiera crear AutoIndex en vectores binarios y dispersos<a href="https://github.com/milvus-io/milvus/pull/33867">(#33867</a>)</li>
<li>Se ha corregido un error que podía provocar que indexnode volviera a intentar crear el índice en parámetros de índice no válidos de todos los <a href="https://github.com/milvus-io/milvus/pull/33878"> vectores（#33878</a>)</li>
<li>Corregido el error que cuando las cargas y liberaciones ocurren concurrentemente puede bloquear el Servidor<a href="https://github.com/milvus-io/milvus/pull/33699">(#33699</a>)</li>
<li>Mejorada la consistencia de la caché para los valores de configuración<a href="https://github.com/milvus-io/milvus/pull/33797">(#33797</a>)</li>
<li>Evitada la posible pérdida de datos durante la eliminación<a href="https://github.com/milvus-io/milvus/pull/33821">(#33821</a>)</li>
<li>Se ha garantizado que el campo DroppedAt (fecha y hora probable de eliminación) se establezca tras la eliminación de colecciones<a href="https://github.com/milvus-io/milvus/pull/33767">(#33767</a>)</li>
<li>Se ha solucionado un problema que podía hacer que Milvus manejara incorrectamente los tamaños de datos de vectores binarios<a href="https://github.com/milvus-io/milvus/pull/33751">(#33751</a>)</li>
<li>Se ha evitado que las credenciales sensibles de Kafka se registren en texto sin formato<a href="https://github.com/milvus-io/milvus/pull/33694">(#33694</a>, <a href="https://github.com/milvus-io/milvus/pull/33747">#33747</a>)</li>
<li>Se ha garantizado que Milvus pueda importar correctamente datos con múltiples campos vectoriales.<a href="https://github.com/milvus-io/milvus/pull/33724">(#33724</a>)</li>
<li>Se ha mejorado la fiabilidad de la importación comprobando si existe un trabajo de importación antes de comenzar.<a href="https://github.com/milvus-io/milvus/pull/33673">(#33673</a>)</li>
<li>Mejorado el manejo del índice HNSW disperso (funcionalidad interna)<a href="https://github.com/milvus-io/milvus/pull/33714">(#33714</a>)</li>
<li>Se ha limpiado la memoria vectorial para evitar fugas de memoria<a href="https://github.com/milvus-io/milvus/pull/33708">(#33708</a>)</li>
<li>Asegurado un calentamiento asíncrono más suave arreglando un problema de bloqueo de estado.<a href="https://github.com/milvus-io/milvus/pull/33687">(#33687</a>)</li>
<li>Se ha corregido un error que podía provocar la pérdida de resultados en los iteradores de consulta.<a href="https://github.com/milvus-io/milvus/pull/33506">(#33506</a>)</li>
<li>Se ha corregido un error que podía provocar que el tamaño del segmento de importación fuera desigual. (<a href="https://github.com/milvus-io/milvus/pull/33634">#33634</a>)</li>
<li>Se ha corregido la gestión incorrecta del tamaño de los datos para los tipos bf16, fp16 y vector binario<a href="https://github.com/milvus-io/milvus/pull/33488">(#33488</a>)</li>
<li>Se ha mejorado la estabilidad solucionando posibles problemas con el compactador L0<a href="https://github.com/milvus-io/milvus/pull/33564">(#33564</a>)</li>
<li>Se ha garantizado que las actualizaciones de configuración dinámica se reflejen correctamente en la caché.<a href="https://github.com/milvus-io/milvus/pull/33590">(#33590</a>)</li>
<li>Se ha mejorado la precisión de la métrica RootCoordQuotaStates (<a href="https://github.com/milvus-io/milvus/pull/33601">#33601</a>)</li>
<li>Garantizada la información precisa del número de entidades cargadas en la métrica<a href="https://github.com/milvus-io/milvus/pull/33522">(#33522</a>)</li>
<li>Se ha proporcionado información más completa en los registros de excepciones. <a href="https://github.com/milvus-io/milvus/pull/33396">(#33396</a>)</li>
<li>Optimizada la canalización de consultas eliminando el comprobador de grupos innecesario<a href="https://github.com/milvus-io/milvus/pull/33485">(#33485</a>)</li>
<li>Utilización de la ruta de almacenamiento local para una comprobación más precisa de la capacidad de disco en el nodo de índice.<a href="https://github.com/milvus-io/milvus/pull/33505">(#33505</a>)</li>
<li>Se ha corregido la posibilidad de que hasMoreResult devuelva false cuando el número de aciertos supera el límite<a href="https://github.com/milvus-io/milvus/pull/33642">(#33642</a>)</li>
<li>Retraso en la carga de bfs en el delegador para evitar que los bfs se carguen una y otra vez cuando el trabajador no tiene más memoria<a href="https://github.com/milvus-io/milvus/pull/33650">(#33650</a>)- Corregido un error por el que queryHook no podía reconocer el tipo de vector<a href="https://github.com/milvus-io/milvus/pull/33911">(#33911</a>)</li>
<li>Impedido el uso capturado iteración variable partitionID<a href="https://github.com/milvus-io/milvus/pull/33970">(#33970</a>)</li>
<li>Corregido un error que puede provocar que Milvus sea incapaz de crear AutoIndex en vectores binarios y dispersos<a href="https://github.com/milvus-io/milvus/pull/33867">(#33867</a>)</li>
<li>Se ha corregido un error que podía provocar que indexnode volviera a intentar crear el índice en parámetros de índice no válidos de todos los <a href="https://github.com/milvus-io/milvus/pull/33878"> vectores（#33878</a>)</li>
<li>Corregido el error que cuando las cargas y liberaciones ocurren concurrentemente puede bloquear el Servidor<a href="https://github.com/milvus-io/milvus/pull/33699">(#33699</a>)</li>
<li>Mejorada la consistencia de la caché para los valores de configuración<a href="https://github.com/milvus-io/milvus/pull/33797">(#33797</a>)</li>
<li>Se ha evitado la posible pérdida de datos durante la eliminación<a href="https://github.com/milvus-io/milvus/pull/33821">(#33821</a>)</li>
<li>Se ha garantizado que el campo DroppedAt (fecha y hora probable de eliminación) se establezca tras la eliminación de colecciones<a href="https://github.com/milvus-io/milvus/pull/33767">(#33767</a>)</li>
<li>Se ha solucionado un problema que podía hacer que Milvus manejara incorrectamente los tamaños de datos de vectores binarios<a href="https://github.com/milvus-io/milvus/pull/33751">(#33751</a>)</li>
<li>Se ha evitado que las credenciales sensibles de Kafka se registren en texto sin formato<a href="https://github.com/milvus-io/milvus/pull/33694">(#33694</a>, <a href="https://github.com/milvus-io/milvus/pull/33747">#33747</a>)</li>
<li>Se ha garantizado que Milvus pueda importar correctamente datos con múltiples campos vectoriales.<a href="https://github.com/milvus-io/milvus/pull/33724">(#33724</a>)</li>
<li>Se ha mejorado la fiabilidad de la importación comprobando si existe un trabajo de importación antes de comenzar.<a href="https://github.com/milvus-io/milvus/pull/33673">(#33673</a>)</li>
<li>Mejorado el manejo del índice HNSW disperso (funcionalidad interna)<a href="https://github.com/milvus-io/milvus/pull/33714">(#33714</a>)</li>
<li>Se ha limpiado la memoria vectorial para evitar fugas de memoria<a href="https://github.com/milvus-io/milvus/pull/33708">(#33708</a>)</li>
<li>Asegurado un calentamiento asíncrono más suave arreglando un problema de bloqueo de estado.<a href="https://github.com/milvus-io/milvus/pull/33687">(#33687</a>)</li>
<li>Se ha corregido un error que podía causar la pérdida de resultados en los iteradores de consulta.<a href="https://github.com/milvus-io/milvus/pull/33506">(#33506</a>)</li>
<li>Se ha corregido un error que podía provocar que el tamaño del segmento de importación fuera desigual. (<a href="https://github.com/milvus-io/milvus/pull/33634">#33634</a>)</li>
<li>Se ha corregido la gestión incorrecta del tamaño de los datos para los tipos bf16, fp16 y vector binario<a href="https://github.com/milvus-io/milvus/pull/33488">(#33488</a>)</li>
<li>Se ha mejorado la estabilidad solucionando posibles problemas con el compactador L0<a href="https://github.com/milvus-io/milvus/pull/33564">(#33564</a>)</li>
<li>Se ha garantizado que las actualizaciones de configuración dinámica se reflejen correctamente en la caché.<a href="https://github.com/milvus-io/milvus/pull/33590">(#33590</a>)</li>
<li>Se ha mejorado la precisión de la métrica RootCoordQuotaStates (<a href="https://github.com/milvus-io/milvus/pull/33601">#33601</a>)</li>
<li>Garantizada la información precisa del número de entidades cargadas en la métrica<a href="https://github.com/milvus-io/milvus/pull/33522">(#33522</a>)</li>
<li>Se ha proporcionado información más completa en los registros de excepciones. <a href="https://github.com/milvus-io/milvus/pull/33396">(#33396</a>)</li>
<li>Optimizada la canalización de consultas eliminando el comprobador de grupos innecesario<a href="https://github.com/milvus-io/milvus/pull/33485">(#33485</a>)</li>
<li>Utilización de la ruta de almacenamiento local para una comprobación más precisa de la capacidad de disco en el nodo de índice.<a href="https://github.com/milvus-io/milvus/pull/33505">(#33505</a>)</li>
<li>Se ha corregido la posibilidad de que hasMoreResult devuelva false cuando el número de aciertos supera el límite<a href="https://github.com/milvus-io/milvus/pull/33642">(#33642</a>)</li>
<li>Retraso en la carga de bfs en el delegador para evitar que los bfs se carguen una y otra vez cuando el trabajador no tiene más memoria<a href="https://github.com/milvus-io/milvus/pull/33650">(#33650</a>)</li>
</ul>
<h2 id="v244" class="common-anchor-header">v2.4.4<button data-href="#v244" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 31 de mayo de 2024</p>
<table>
<thead>
<tr><th>Versión de Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.4</td><td>2.4.3</td><td>2.4.1</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>Milvus v2.4.4 incluye varias correcciones de errores críticos y mejoras destinadas a aumentar el rendimiento y la estabilidad. En particular, hemos <strong>resuelto un problema crítico por el que los registros de estadísticas de inserción masiva se recopilaban incorrectamente</strong>, lo que podía afectar a la integridad de los datos. <strong>Recomendamos encarecidamente a todos los usuarios de la versión 2.4 que actualicen a esta versión para beneficiarse de estas correcciones.</strong></p>
<p><strong>Si utiliza la inserción masiva, actualice a la versión 2.4.4 lo antes posible para garantizar la integridad de los datos.</strong></p>
<h3 id="Critical-bug-fixes" class="common-anchor-header">Corrección de errores críticos</h3><ul>
<li>Se ha rellenado el ID del registro de estadísticas y se ha validado su exactitud<a href="https://github.com/milvus-io/milvus/pull/33478">(#33478</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Conjunto de bits actualizado para ARM SVE<a href="https://github.com/milvus-io/milvus/pull/33440">(#33440</a>)</li>
<li>Habilitada la compilación Milvus con GCC-13<a href="https://github.com/milvus-io/milvus/pull/33441">(#33441</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Se mostraban colecciones vacías cuando se concedían todos los privilegios<a href="https://github.com/milvus-io/milvus/pull/33454">(#33454</a>)</li>
<li>Asegurado CMake descargas e instalaciones para la plataforma actual, no sólo x86_64<a href="https://github.com/milvus-io/milvus/pull/33439">(#33439</a>)</li>
</ul>
<h2 id="v243" class="common-anchor-header">v2.4.3<button data-href="#v243" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 29 de mayo de 2024</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.3</td><td>2.4.3</td><td>2.4.1</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>La versión 2.4.3 de Milvus introdujo una serie de funciones, mejoras y correcciones de errores para aumentar el rendimiento y la fiabilidad. Entre las mejoras más destacadas se encuentran la compatibilidad con la inserción masiva de vectores flotantes dispersos y la aceleración optimizada del filtro bloom. Las mejoras abarcaron diversas áreas, desde las actualizaciones dinámicas de la configuración hasta la optimización del uso de la memoria. Las correcciones de errores abordaron problemas críticos como situaciones de pánico y garantizaron un funcionamiento más fluido del sistema. Esta versión subraya el compromiso constante de Milvus de mejorar la funcionalidad, optimizar el rendimiento y ofrecer una experiencia de usuario sólida.</p>
<h3 id="Features" class="common-anchor-header">Características</h3><ul>
<li>Soporte de inserción masiva de vectores flotantes dispersos para binlog/json/parquet<a href="https://github.com/milvus-io/milvus/pull/32649">(#32649</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Implementación del canal de vigilancia Datacoord/node basado en RPC<a href="https://github.com/milvus-io/milvus/pull/32036">(#32036</a>)</li>
<li>Optimizado el filtro bloom para acelerar el filtrado de borrado<a href="https://github.com/milvus-io/milvus/pull/32642">(#32642</a>, <a href="https://github.com/milvus-io/milvus/pull/33329">#33329</a>, <a href="https://github.com/milvus-io/milvus/pull/33284">#33284</a>)</li>
<li>Carga de datos sin procesar a través de mmap si el índice escalar no tiene datos sin procesar<a href="https://github.com/milvus-io/milvus/pull/33317">(#33317</a>)</li>
<li>Sincronización de la configuración de milvus con milvus.yaml<a href="https://github.com/milvus-io/milvus/pull/33322">(#33322</a>, <a href="https://github.com/milvus-io/milvus/pull/32920">#32920</a>, <a href="https://github.com/milvus-io/milvus/pull/32857">#32857</a>, <a href="https://github.com/milvus-io/milvus/pull/32946">#32946</a>)</li>
<li>Actualizada la versión de knowhere<a href="https://github.com/milvus-io/milvus/pull/33310">(#33310</a>, <a href="https://github.com/milvus-io/milvus/pull/32931">#32931</a>, <a href="https://github.com/milvus-io/milvus/pull/33043">#33043</a>)</li>
<li>Habilitada la actualización dinámica de la política del equilibrador en QueryCoord<a href="https://github.com/milvus-io/milvus/pull/33272">(#33272</a>)</li>
<li>Utilizado un registrador pre-construido en el búfer de escritura para minimizar la asignación del registrador<a href="https://github.com/milvus-io/milvus/pull/33304">(#33304</a>)</li>
<li>Mejorada la comprobación de parámetros<a href="https://github.com/milvus-io/milvus/pull/32777">(#32777</a>, <a href="https://github.com/milvus-io/milvus/pull/33271">#33271</a>, <a href="https://github.com/milvus-io/milvus/pull/33218">#33218</a>)</li>
<li>Añadido un parámetro para ignorar IDs de mensajes incorrectos en el punto de control<a href="https://github.com/milvus-io/milvus/pull/33249">(#33249</a>)</li>
<li>Añadida configuración para controlar la gestión de fallos de inicialización para plugins<a href="https://github.com/milvus-io/milvus/pull/32680">(#32680</a>)</li>
<li>Se agregó una configuración de consistencia de cómputo de puntaje para knowhere<a href="https://github.com/milvus-io/milvus/pull/32997">(#32997</a>)</li>
<li>Introducida una opción de configuración para controlar la inicialización de los permisos de roles públicos<a href="https://github.com/milvus-io/milvus/pull/33174">(#33174</a>)</li>
<li>Optimizado el uso de memoria al leer campos<a href="https://github.com/milvus-io/milvus/pull/33196">(#33196</a>)</li>
<li>Implementación refinada de Channel Manager v2<a href="https://github.com/milvus-io/milvus/pull/33172">(#33172</a>, <a href="https://github.com/milvus-io/milvus/pull/33121">#33121</a>, <a href="https://github.com/milvus-io/milvus/pull/33014">#33014</a>)</li>
<li>Añadida la función de seguimiento del tamaño de los datos en memoria para binlog<a href="https://github.com/milvus-io/milvus/pull/33025">(#33025</a>)</li>
<li>Añadidas métricas para el tamaño de los archivos de índice de segmentos<a href="https://github.com/milvus-io/milvus/pull/32979">(#32979</a>, <a href="https://github.com/milvus-io/milvus/pull/33305">#33305</a>)</li>
<li>Sustitución de Delete por DeletePartialMatch para eliminar las métricas<a href="https://github.com/milvus-io/milvus/pull/33029">(#33029</a>)</li>
<li>Obtención del tamaño de los datos relacionados según el tipo de segmento<a href="https://github.com/milvus-io/milvus/pull/33017">(#33017</a>)</li>
<li>Limpiada la información del nodo del canal en el metaalmacén<a href="https://github.com/milvus-io/milvus/pull/32988">(#32988</a>)</li>
<li>Eliminado rootcoord de datanode broker<a href="https://github.com/milvus-io/milvus/pull/32818">(#32818</a>)</li>
<li>Habilitada la carga por lotes<a href="https://github.com/milvus-io/milvus/pull/32788">(#32788</a>)</li>
<li>Cambiado el número de partición por defecto a 16 cuando se utiliza la clave de partición<a href="https://github.com/milvus-io/milvus/pull/32950">(#32950</a>)</li>
<li>Mejora del rendimiento de reducción en consultas top-k muy grandes<a href="https://github.com/milvus-io/milvus/pull/32871">(#32871</a>)</li>
<li>Utilizada la capacidad de TestLocations para acelerar la escritura y la compactación<a href="https://github.com/milvus-io/milvus/pull/32948">(#32948</a>)</li>
<li>Optimización del conjunto de analizadores de planes para evitar el reciclaje innecesario<a href="https://github.com/milvus-io/milvus/pull/32869">(#32869</a>)</li>
<li>Mejora de la velocidad de carga<a href="https://github.com/milvus-io/milvus/pull/32898">(#32898</a>)</li>
<li>Utilización del nivel de coherencia predeterminado de recogida para restv2<a href="https://github.com/milvus-io/milvus/pull/32956">(#32956</a>)</li>
<li>Añadida respuesta de costes para la API rest<a href="https://github.com/milvus-io/milvus/pull/32620">(#32620</a>)</li>
<li>Habilitada la política de equilibrio exclusivo de canales<a href="https://github.com/milvus-io/milvus/pull/32911">(#32911</a>)</li>
<li>API describedatabase expuesta en proxy<a href="https://github.com/milvus-io/milvus/pull/32732">(#32732</a>)</li>
<li>Utilización del mapeo coll2replica al obtener RG por colección<a href="https://github.com/milvus-io/milvus/pull/32892">(#32892</a>)</li>
<li>Añadido más rastreo para búsqueda y consulta<a href="https://github.com/milvus-io/milvus/pull/32734">(#32734</a>)</li>
<li>Soporte de configuración dinámica para el rastreo de opentelemetría<a href="https://github.com/milvus-io/milvus/pull/32169">(#32169</a>)</li>
<li>Se ha evitado la iteración sobre los resultados del canal al actualizar la vista de líder<a href="https://github.com/milvus-io/milvus/pull/32887">(#32887</a>)</li>
<li>Optimización de la gestión de las compensaciones vectoriales para parquet<a href="https://github.com/milvus-io/milvus/pull/32822">(#32822</a>)</li>
<li>Mejorado el filtrado de segmentos de datacoord con la recopilación<a href="https://github.com/milvus-io/milvus/pull/32831">(#32831</a>)</li>
<li>Ajustado el nivel de registro y la frecuencia<a href="https://github.com/milvus-io/milvus/pull/33042">(#33042</a>, <a href="https://github.com/milvus-io/milvus/pull/32838">#32838</a>, <a href="https://github.com/milvus-io/milvus/pull/33337">#33337</a>)</li>
<li>Posibilidad de detener el equilibrio después de suspenderlo<a href="https://github.com/milvus-io/milvus/pull/32812">(#32812</a>)</li>
<li>Actualizada la caché del líder del shard cuando cambia la ubicación del líder<a href="https://github.com/milvus-io/milvus/pull/32470">(#32470</a>)</li>
<li>Eliminados API y campos obsoletos<a href="https://github.com/milvus-io/milvus/pull/32808">(#32808</a>, <a href="https://github.com/milvus-io/milvus/pull/32704">#32704</a>)</li>
<li>Añadido metautil.channel para convertir cadena comparar a int<a href="https://github.com/milvus-io/milvus/pull/32749">(#32749</a>)</li>
<li>Añadida información de tipo para el mensaje de error del escritor de carga útil y el registro cuando querynode encuentra una nueva colección<a href="https://github.com/milvus-io/milvus/pull/32522">(#32522</a>)</li>
<li>Comprobación del número de partición al crear una colección con clave de partición<a href="https://github.com/milvus-io/milvus/pull/32670">(#32670</a>)</li>
<li>Se ha eliminado el segmento l0 heredado si falla la vigilancia<a href="https://github.com/milvus-io/milvus/pull/32725">(#32725</a>)</li>
<li>Mejorada la impresión del tipo de solicitud<a href="https://github.com/milvus-io/milvus/pull/33319">(#33319</a>)</li>
<li>Comprobación de que los datos de campo de matriz eran nulos antes de obtener el tipo<a href="https://github.com/milvus-io/milvus/pull/33311">(nº 33311</a>)</li>
<li>Devolución de error cuando fallaba la operación de inicio de nodo Delete/AddNode<a href="https://github.com/milvus-io/milvus/pull/33258">(#33258</a>)</li>
<li>Permitir la actualización del ID de servidor de datanode<a href="https://github.com/milvus-io/milvus/pull/31597">(#31597</a>)</li>
<li>Limpieza unificada de métricas querynode en la versión de colección<a href="https://github.com/milvus-io/milvus/pull/32805">(#32805</a>)</li>
<li>Corregida la versión incorrecta de la configuración del índice automático escalar<a href="https://github.com/milvus-io/milvus/pull/32795">(#32795</a>)</li>
<li>Refinada la comprobación de parámetros de índice para crear/alterar índice<a href="https://github.com/milvus-io/milvus/pull/32712">(#32712</a>)</li>
<li>Eliminada la recuperación de réplicas redundantes<a href="https://github.com/milvus-io/milvus/pull/32985">(#32985</a>)</li>
<li>Habilitada la meta tabla de canales para escribir más de 200k segmentos<a href="https://github.com/milvus-io/milvus/pull/33300">(#33300</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Corregido pánico cuando la base de datos no existía en el interceptor de límite de tasa<a href="https://github.com/milvus-io/milvus/pull/33308">(#33308</a>)</li>
<li>Corregido fallo en la recogida de métricas quotacenter debido a parámetros incorrectos<a href="https://github.com/milvus-io/milvus/pull/33399">(#33399</a>)</li>
<li>Corregido pánico si processactivestandby devolvía un error<a href="https://github.com/milvus-io/milvus/pull/33372">(#33372</a>)</li>
<li>Corregido truncamiento de resultados de búsqueda en restful v2 cuando nq &gt; 1<a href="https://github.com/milvus-io/milvus/pull/33363">(#33363</a>)</li>
<li>Añadido campo de nombre de base de datos para operaciones de rol en restful v2<a href="https://github.com/milvus-io/milvus/pull/33291">(#33291</a>)</li>
<li>Arreglado el límite de velocidad global que no funcionaba<a href="https://github.com/milvus-io/milvus/pull/33336">(#33336</a>)</li>
<li>Arreglado pánico causado por fallo de construcción de índice<a href="https://github.com/milvus-io/milvus/pull/33314">(#33314</a>)</li>
<li>Añadida validación para vector disperso en segcore para asegurar legalidad<a href="https://github.com/milvus-io/milvus/pull/33312">(#33312</a>)</li>
<li>Eliminada tarea de syncmgr después de la finalización de la tarea<a href="https://github.com/milvus-io/milvus/pull/33303">(#33303</a>)</li>
<li>Corregido fallo de filtrado de clave de partición durante la importación de datos<a href="https://github.com/milvus-io/milvus/pull/33277">(#33277</a>)</li>
<li>Corregida la imposibilidad de generar traceID al utilizar el exportador noop<a href="https://github.com/milvus-io/milvus/pull/33208">(#33208</a>)</li>
<li>Mejorada la recuperación de resultados de consultas<a href="https://github.com/milvus-io/milvus/pull/33179">(#33179</a>)</li>
<li>Se ha eliminado el punto de control de canal marcado para evitar la fuga de métricas de retraso de punto de control<a href="https://github.com/milvus-io/milvus/pull/33201">(#33201</a>)</li>
<li>Corregido el atasco del nodo de consulta durante la detención del progreso<a href="https://github.com/milvus-io/milvus/pull/33154">(#33154</a>)</li>
<li>Corrección de la falta de segmentos en la respuesta de descarga<a href="https://github.com/milvus-io/milvus/pull/33061">(#33061</a>)</li>
<li>Operación de envío idempotente<a href="https://github.com/milvus-io/milvus/pull/33053">(#33053</a>)</li>
<li>Asignación de un nuevo segmento para cada lote en el lector de flujo<a href="https://github.com/milvus-io/milvus/pull/33360">(#33360</a>)</li>
<li>Eliminado el nodo fuera de línea del grupo de recursos después de reiniciar QueryCoord<a href="https://github.com/milvus-io/milvus/pull/33233">(#33233</a>)</li>
<li>Eliminado compactador l0 en completedCompactor<a href="https://github.com/milvus-io/milvus/pull/33216">(#33216</a>)</li>
<li>Restablecido el valor de cuota al inicializar el limitador<a href="https://github.com/milvus-io/milvus/pull/33152">(#33152</a>)</li>
<li>Solucionado problema por el que se superaba el límite de etcd<a href="https://github.com/milvus-io/milvus/pull/33041">(#33041</a>)</li>
<li>Resuelta la superación del límite de transacciones etcd debido a demasiados campos<a href="https://github.com/milvus-io/milvus/pull/33040">(#33040</a>)</li>
<li>Eliminada la reentrada de RLock en GetNumRowsOfPartition<a href="https://github.com/milvus-io/milvus/pull/33045">(#33045</a>)</li>
<li>Iniciado LeaderCacheObserver antes de SyncAll<a href="https://github.com/milvus-io/milvus/pull/33035">(#33035</a>)</li>
<li>Habilitado el equilibrio del canal de espera liberado<a href="https://github.com/milvus-io/milvus/pull/32986">(#32986</a>)</li>
<li>Inicializado el registrador de acceso antes de la inicialización del servidor<a href="https://github.com/milvus-io/milvus/pull/32976">(#32976</a>)</li>
<li>Compactador capaz de borrar segmentos vacíos<a href="https://github.com/milvus-io/milvus/pull/32821">(#32821</a>)</li>
<li>Completado el número de entrada deltalog y el rango de tiempo en las compactaciones l0<a href="https://github.com/milvus-io/milvus/pull/33004">(#33004</a>)</li>
<li>Corregido el fallo del proxy debido a una carrera de datos en la caché del líder de fragmentos<a href="https://github.com/milvus-io/milvus/pull/32971">(#32971</a>)</li>
<li>Corregida unidad de tiempo para métrica de índice de carga<a href="https://github.com/milvus-io/milvus/pull/32935">(#32935</a>)</li>
<li>Se ha solucionado el problema por el que no se podía liberar correctamente un segmento en un nodo de consulta detenido<a href="https://github.com/milvus-io/milvus/pull/32929">(nº 32929</a>).</li>
<li>Corregida la estimación de recursos de índice<a href="https://github.com/milvus-io/milvus/pull/32842">(#32842</a>)</li>
<li>Fijar punto de control de canal en posición delta<a href="https://github.com/milvus-io/milvus/pull/32878">(#32878</a>)</li>
<li>Syncmgr bloquea la clave antes de devolver el futuro<a href="https://github.com/milvus-io/milvus/pull/32865">(#32865</a>)</li>
<li>Asegurarse de que el índice invertido tenga sólo un segmento<a href="https://github.com/milvus-io/milvus/pull/32858">(#32858</a>)</li>
<li>Corregido el disparo de compactación eligiendo dos segmentos idénticos<a href="https://github.com/milvus-io/milvus/pull/32800">(#32800</a>)</li>
<li>Se ha solucionado el problema por el que no se podía especificar el nombre de la partición en la importación de binlog<a href="https://github.com/milvus-io/milvus/pull/32730">(#32730</a>, <a href="https://github.com/milvus-io/milvus/pull/33027">#33027</a>)</li>
<li>Columna dinámica opcional en la importación de parquet<a href="https://github.com/milvus-io/milvus/pull/32738">(#32738</a>)</li>
<li>Omisión de la comprobación del ID automático al insertar datos<a href="https://github.com/milvus-io/milvus/pull/32775">(nº 32775</a>)</li>
<li>Validación del número de filas para insertar datos de campo con el esquema<a href="https://github.com/milvus-io/milvus/pull/32770">(#32770</a>)</li>
<li>Añadido Wrapper y Keepalive para CTraceContext IDs<a href="https://github.com/milvus-io/milvus/pull/32746">(#32746</a>)</li>
<li>Solucionado el problema por el que no se encontraba el nombre de la base de datos en el metaobjeto datacoord<a href="https://github.com/milvus-io/milvus/pull/33412">(nº 33412</a>)</li>
<li>Sincronizado el segmento abandonado para la partición abandonada<a href="https://github.com/milvus-io/milvus/pull/33332">(#33332</a>)</li>
<li>Corregido fallo en la recogida de métricas de quotaCenter debido a parámetros incorrectos<a href="https://github.com/milvus-io/milvus/pull/33399">(#33399</a>)</li>
</ul>
<h2 id="v241" class="common-anchor-header">v2.4.1<button data-href="#v241" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 6 de mayo de 2024</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Java</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.1</td><td>2.4.1</td><td>2.4.0</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>La versión 2.4.1 de Milvus aporta numerosas mejoras y correcciones de errores que pretenden aumentar el rendimiento, la observabilidad y la estabilidad del software. Estas mejoras incluyen una API declarativa de grupos de recursos, una funcionalidad de inserción masiva mejorada que admite los tipos de datos vectoriales Float16/BFloat16, un mecanismo refinado de recogida de basura (GC) que reduce las operaciones de lista para el almacenamiento de objetos y otros cambios relacionados con la optimización del rendimiento. Además, se han corregido errores de compilación, coincidencias difusas fallidas en caracteres de nueva línea, tipos de datos de parámetros incorrectos para interfaces RESTful y errores de BulkInsert en archivos numpy cuando los campos dinámicos están activados.</p>
<h3 id="Breaking-changes" class="common-anchor-header">Cambios de última hora</h3><ul>
<li>Discontinuado el soporte para eliminar con una expresión de filtro vacía.<a href="https://github.com/milvus-io/milvus/pull/32472">(#32472</a>)</li>
</ul>
<h3 id="Features" class="common-anchor-header">Características</h3><ul>
<li>Añadido soporte para los tipos de datos vectoriales Float16/BFloat16 en la inserción masiva<a href="https://github.com/milvus-io/milvus/pull/32157">(#32157</a>)</li>
<li>Mejora del vector flotante disperso para admitir la búsqueda de iteradores por fuerza bruta y la búsqueda de rangos<a href="https://github.com/milvus-io/milvus/pull/32635">(#32635</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Añadida la api declarativa de grupo de recursos<a href="https://github.com/milvus-io/milvus/pull/31930">(#31930</a>, <a href="https://github.com/milvus-io/milvus/pull/32297">#32297</a>, <a href="https://github.com/milvus-io/milvus/pull/32536">#32536</a>, <a href="https://github.com/milvus-io/milvus/pull/32666">#32666</a>)</li>
<li>Reescrito el observador de colección en QueryCoord para que sea impulsado por tareas<a href="https://github.com/milvus-io/milvus/pull/32441">(#32441</a>)</li>
<li>Refactorizado la estructura de datos utilizada en el SyncManager de DataNode para reducir el uso de memoria y evitar errores<a href="https://github.com/milvus-io/milvus/pull/32673">(#32673</a>)</li>
<li>Revisada la implementación de la recolección de basura para minimizar las operaciones de lista asociadas con el almacenamiento de objetos<a href="https://github.com/milvus-io/milvus/pull/31740">(#31740</a>)</li>
<li>Reducción del uso de cpu cuando el número de colecciones es alto<a href="https://github.com/milvus-io/milvus/pull/32245">(#32245</a>)</li>
<li>Mejora de la gestión de milvus.yaml mediante la generación automática de elementos de configuración relevantes en el archivo milvus.yaml a través de código<a href="https://github.com/milvus-io/milvus/pull/31832">(#31832</a>, <a href="https://github.com/milvus-io/milvus/pull/32357">#32357</a>)</li>
<li>Mejorado el rendimiento de la consulta mediante la recuperación de los datos después de realizar la reducción local<a href="https://github.com/milvus-io/milvus/pull/32346">(#32346</a>)</li>
<li>Añadida la opción WithBlock para la creación de clientes etcd<a href="https://github.com/milvus-io/milvus/pull/32641">(#32641</a>)</li>
<li>Utilizado client_request_id especificado por el cliente como el TraceID si el cliente lo proporciona<a href="https://github.com/milvus-io/milvus/pull/32264">(#32264</a>)</li>
<li>Añadida la etiqueta db a las métricas para las operaciones de borrado e inserción masiva<a href="https://github.com/milvus-io/milvus/pull/32611">(#32611</a>)</li>
<li>Añadida lógica para omitir la verificación a través de la configuración para las columnas AutoID y PartitionKey<a href="https://github.com/milvus-io/milvus/pull/32592">(#32592</a>)</li>
<li>Mejora de los errores relacionados con la autenticación<a href="https://github.com/milvus-io/milvus/pull/32253">(nº 32253</a>)</li>
<li>Mejora de los registros de errores de AllocSegmentID en DataCoord<a href="https://github.com/milvus-io/milvus/pull/32351">(nº 32351</a>, <a href="https://github.com/milvus-io/milvus/pull/32335"> 32351</a>)</li>
<li>Eliminación de métricas duplicadas<a href="https://github.com/milvus-io/milvus/pull/32380">(#32380</a>, <a href="https://github.com/milvus-io/milvus/pull/32308">#32308</a>) y limpieza de métricas no utilizadas<a href="https://github.com/milvus-io/milvus/pull/32404">(#32404</a>, <a href="https://github.com/milvus-io/milvus/pull/32515">#32515</a>)</li>
<li>Se ha añadido una opción de configuración para controlar si se activa o no la función partitionKey<a href="https://github.com/milvus-io/milvus/pull/32433">(#32433</a>).</li>
<li>Añadida una opción de configuración para controlar la cantidad máxima de datos que se pueden insertar en una única solicitud<a href="https://github.com/milvus-io/milvus/pull/32433">(#32433</a>)</li>
<li>Paralelización de la operación applyDelete a nivel de segmento para acelerar el procesamiento de mensajes Delete por parte del Delegator<a href="https://github.com/milvus-io/milvus/pull/32291">(#32291</a>)</li>
<li>Utilización de índices<a href="https://github.com/milvus-io/milvus/pull/32232">(#32232</a>, <a href="https://github.com/milvus-io/milvus/pull/32505">#32505</a>, <a href="https://github.com/milvus-io/milvus/pull/32533">#32533</a>, <a href="https://github.com/milvus-io/milvus/pull/32595">#32595</a>) y caché de adición<a href="https://github.com/milvus-io/milvus/pull/32580">(#32580</a>) para acelerar las operaciones de filtrado frecuentes en QueryCoord.</li>
<li>Reestructurada la estructura de datos<a href="https://github.com/milvus-io/milvus/pull/32273">(#32273</a>) y refactorizado el código<a href="https://github.com/milvus-io/milvus/pull/32389">(#32389</a>) para acelerar las operaciones frecuentes en DataCoord.</li>
<li>Eliminado openblas de conan<a href="https://github.com/milvus-io/milvus/pull/32002">(#32002</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Corregido build milvus en rockylinux8<a href="https://github.com/milvus-io/milvus/pull/32619">(#32619</a>)</li>
<li>Corregidos errores de compilación para SVE en ARM<a href="https://github.com/milvus-io/milvus/pull/32463">(#32463</a>, <a href="https://github.com/milvus-io/milvus/pull/32270">#32270</a>)</li>
<li>Corregido el problema de crash en imágenes GPU basadas en ARM<a href="https://github.com/milvus-io/milvus/pull/31980">(#31980</a>)</li>
<li>Corregida la consulta regex que no puede manejar texto con nueva línea<a href="https://github.com/milvus-io/milvus/pull/32569">(#32569</a>)</li>
<li>Corregida la búsqueda que obtenía un resultado vacío cuando GetShardLeaders devolvía una lista de nodos vacía<a href="https://github.com/milvus-io/milvus/pull/32685">(#32685</a>)</li>
<li>Corregido el error que provocaba BulkInsert al encontrar campos dinámicos en archivos numpy<a href="https://github.com/milvus-io/milvus/pull/32596">(#32596</a>)</li>
<li>Corregidos errores relacionados con la interfaz RESTFulV2, incluyendo una importante corrección que permite que los parámetros numéricos en las peticiones acepten entrada numérica en lugar de tipo cadena<a href="https://github.com/milvus-io/milvus/pull/32485">(#32485</a>, <a href="https://github.com/milvus-io/milvus/pull/32355">#32355</a>)</li>
<li>Se ha corregido la pérdida de memoria en el proxy mediante la eliminación de la observación del evento de configuración en el limitador de velocidad<a href="https://github.com/milvus-io/milvus/pull/32313">(nº 32313</a>).</li>
<li>Se ha solucionado el problema por el que el limitador de velocidad informa incorrectamente de que no se puede encontrar la partición cuando no se especifica partitionName<a href="https://github.com/milvus-io/milvus/pull/32647">(#32647</a>)</li>
<li>Añadida la detección entre los casos de Colección en estado de recuperación y no cargada en el tipo de error.<a href="https://github.com/milvus-io/milvus/pull/32447">(#32447</a>)</li>
<li>Corregida la métrica negativa de entidades num consultables<a href="https://github.com/milvus-io/milvus/pull/32361">(#32361</a>)</li>
</ul>
<h2 id="v240" class="common-anchor-header">v2.4.0<button data-href="#v240" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de lanzamiento: 17 de abril de 2024</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th><th>Versión del SDK de Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.0</td><td>2.4.0</td><td>2.4.0</td></tr>
</tbody>
</table>
<p>Nos complace anunciar el lanzamiento oficial de Milvus 2.4.0. Partiendo de la sólida base de la versión 2.4.0-rc.1, nos hemos centrado en solucionar los errores críticos notificados por nuestros usuarios, preservando al mismo tiempo la funcionalidad existente. Además, Milvus 2.4.0 introduce una serie de optimizaciones destinadas a aumentar el rendimiento del sistema, mejorar la observabilidad mediante la incorporación de varias métricas y racionalizar el código base para aumentar la simplicidad.</p>
<h3 id="Improvements" class="common-anchor-header">Mejoras</h3><ul>
<li>Compatibilidad con conexiones TLS MinIO<a href="https://github.com/milvus-io/milvus/pull/31396">(#31396</a>, <a href="https://github.com/milvus-io/milvus/pull/31618">#31618</a>)</li>
<li>Soporte de AutoIndex para campos escalares<a href="https://github.com/milvus-io/milvus/pull/31593">(#31593</a>)</li>
<li>Refactorización de búsqueda híbrida para rutas de ejecución consistentes con búsqueda regular<a href="https://github.com/milvus-io/milvus/pull/31742">(#31742</a>, <a href="https://github.com/milvus-io/milvus/pull/32178">#32178</a>)</li>
<li>Filtrado acelerado mediante la refactorización de bitset y bitset_view<a href="https://github.com/milvus-io/milvus/pull/31592">(#31592</a>, <a href="https://github.com/milvus-io/milvus/pull/31754">#31754</a>, <a href="https://github.com/milvus-io/milvus/pull/32139">#32139</a>)</li>
<li>Las tareas de importación permiten ahora esperar a la finalización del índice de datos<a href="https://github.com/milvus-io/milvus/pull/31733">(#31733</a>)</li>
<li>Mejora de la compatibilidad de las importaciones<a href="https://github.com/milvus-io/milvus/pull/32121">(nº 32121</a>), la programación de tareas<a href="https://github.com/milvus-io/milvus/pull/31475">(nº 31475</a>) y los límites de tamaño y número de archivos importados<a href="https://github.com/milvus-io/milvus/pull/31542">(nº 31542</a>).</li>
<li>Esfuerzos de simplificación del código, incluida la normalización de la interfaz para la comprobación de tipos<a href="https://github.com/milvus-io/milvus/pull/31945">(#31945</a>, <a href="https://github.com/milvus-io/milvus/pull/31857">#31857</a>), eliminación de código y métricas obsoletos<a href="https://github.com/milvus-io/milvus/pull/32079">(#32079</a>, <a href="https://github.com/milvus-io/milvus/pull/32134">#32134</a>, <a href="https://github.com/milvus-io/milvus/pull/31535">#31535</a>, <a href="https://github.com/milvus-io/milvus/pull/32211">#32211</a>, <a href="https://github.com/milvus-io/milvus/pull/31935">#31935</a>) y normalización de nombres de constantes<a href="https://github.com/milvus-io/milvus/pull/31515">(#31515</a>).</li>
<li>Nuevas métricas para la latencia del punto de control del canal de destino actual de QueryCoord<a href="https://github.com/milvus-io/milvus/pull/31420">(#31420</a>)</li>
<li>Nueva etiqueta db para métricas comunes<a href="https://github.com/milvus-io/milvus/pull/32024">(#32024</a>)</li>
<li>Nuevas métricas relativas al recuento de entidades eliminadas, indexadas y cargadas, con la inclusión de etiquetas como collectionName y dbName<a href="https://github.com/milvus-io/milvus/pull/31861">(#31861</a>)</li>
<li>Mejoras en la gestión de errores para tipos de vectores no coincidentes<a href="https://github.com/milvus-io/milvus/pull/31766">(nº 31766</a>)</li>
<li>Soporte para lanzar errores en lugar de bloquearse cuando el índice no se puede construir<a href="https://github.com/milvus-io/milvus/pull/31845">(#31845</a>)</li>
<li>Soporte para invalidar la meta caché de la base de datos al eliminar bases de datos<a href="https://github.com/milvus-io/milvus/pull/32092">(#32092</a>)</li>
<li>Refactorización de la interfaz para la distribución de canales<a href="https://github.com/milvus-io/milvus/pull/31814">(#31814</a>) y la gestión de vistas de líderes<a href="https://github.com/milvus-io/milvus/pull/32127">(#32127</a>)</li>
<li>Refactorización de la interfaz del gestor de distribución de canales<a href="https://github.com/milvus-io/milvus/pull/31814">(#31814</a>) y refactorización de la interfaz del gestor de vistas de líderes<a href="https://github.com/milvus-io/milvus/pull/32127">(#32127</a>)</li>
<li>Procesamiento por lotes<a href="https://github.com/milvus-io/milvus/pull/31632">(#31632</a>), adición de información de mapeo<a href="https://github.com/milvus-io/milvus/pull/32234">(#32234</a>, <a href="https://github.com/milvus-io/milvus/pull/32249">#32249</a>), y evitar el uso de bloqueo<a href="https://github.com/milvus-io/milvus/pull/31787">(#31787</a>) para acelerar las operaciones invocadas con frecuencia</li>
</ul>
<h3 id="Breaking-Changes" class="common-anchor-header">Cambios de última hora</h3><ul>
<li>Discontinuación de la búsqueda de agrupamiento en vectores binarios<a href="https://github.com/milvus-io/milvus/pull/31735">(#31735</a>)</li>
<li>Discontinuación de la búsqueda agrupada con búsqueda híbrida<a href="https://github.com/milvus-io/milvus/pull/31812">(#31812</a>)</li>
<li>Interrupción del índice HNSW en vectores binarios<a href="https://github.com/milvus-io/milvus/pull/31883">(#31883</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Corrección de errores</h3><ul>
<li>Mejora del tipo de datos y de las comprobaciones de valores en las consultas e inserciones para evitar fallos<a href="https://github.com/milvus-io/milvus/pull/31478">(#31478</a>, <a href="https://github.com/milvus-io/milvus/pull/31653">#31653</a>, <a href="https://github.com/milvus-io/milvus/pull/31698">#31698</a>, <a href="https://github.com/milvus-io/milvus/pull/31842">#31842</a>, <a href="https://github.com/milvus-io/milvus/pull/32042">#32042</a>, <a href="https://github.com/milvus-io/milvus/pull/32251">#32251</a>, <a href="https://github.com/milvus-io/milvus/pull/32204">#32204</a>)</li>
<li>Corrección de errores de la API RESTful<a href="https://github.com/milvus-io/milvus/pull/32160">(#32160</a>)</li>
<li>Mejora de la predicción del uso de recursos del índice invertido<a href="https://github.com/milvus-io/milvus/pull/31641">(#31641</a>)</li>
<li>Resolución de problemas de conexión con etcd cuando la autorización está activada<a href="https://github.com/milvus-io/milvus/pull/31668">(#31668</a>)</li>
<li>Actualización de seguridad para el servidor nats<a href="https://github.com/milvus-io/milvus/pull/32023">(#32023</a>)</li>
<li>Almacenamiento de archivos de índices invertidos en una ruta de almacenamiento local de QueryNode en lugar de /tmp<a href="https://github.com/milvus-io/milvus/pull/32210">(#32210</a>)</li>
<li>Corrección de las fugas de memoria de datacoord en collectionInfo<a href="https://github.com/milvus-io/milvus/pull/32243">(#32243</a>)</li>
<li>Corrección de errores relacionados con fp16/bf16 que podían causar pánico en el sistema<a href="https://github.com/milvus-io/milvus/pull/31677">(#31677</a>, <a href="https://github.com/milvus-io/milvus/pull/31841">#31841</a>, <a href="https://github.com/milvus-io/milvus/pull/32196">#32196</a>)</li>
<li>Se han resuelto los problemas por los que la búsqueda agrupada no devolvía suficientes resultados<a href="https://github.com/milvus-io/milvus/pull/32151">(#32151</a>)</li>
<li>Ajuste de la búsqueda con iteradores para gestionar los desplazamientos en el paso Reducir de forma más eficaz y garantizar resultados adecuados con "reduceStopForBest" activado<a href="https://github.com/milvus-io/milvus/pull/32088">(#32088</a>)</li>
</ul>
<h2 id="v240-rc1" class="common-anchor-header">v2.4.0-rc.1<button data-href="#v240-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha de publicación: 20 de marzo de 2024</p>
<table>
<thead>
<tr><th>Versión Milvus</th><th>Versión del SDK de Python</th></tr>
</thead>
<tbody>
<tr><td>2.4.0-rc.1</td><td>2.4.0</td></tr>
</tbody>
</table>
<p>Esta versión introduce varias funciones basadas en escenarios:</p>
<ul>
<li><p><strong>Nuevo índice de GPU - CAGRA</strong>: Gracias a la contribución de NVIDIA, este nuevo índice de GPU ofrece una mejora de rendimiento de 10x, especialmente para búsquedas por lotes. Para más detalles, consulta <a href="/docs/es/gpu_index.md">Índice GPU</a>.</p></li>
<li><p><strong>Búsqueda</strong><strong>multivectorial</strong> e <strong>híbrida</strong>: Esta función permite almacenar incrustaciones vectoriales de múltiples modelos y realizar búsquedas híbridas. Para obtener más información, consulte <a href="/docs/es/multi-vector-search.md">Búsqueda híbrida</a>.</p></li>
<li><p><strong>Vectores dispersos</strong>: Ideales para la interpretación y el análisis de palabras clave, los vectores dispersos son ahora compatibles con el procesamiento en su colección. Para obtener más información, consulte <a href="/docs/es/sparse_vector.md">Vectores dispersos</a>.</p></li>
<li><p><strong>Búsqueda</strong> por<strong>agrupación</strong>: La agrupación por categorías mejora la recuperación a nivel de documento para aplicaciones de generación mejorada de recuperación (RAG). Para obtener más información, consulte <a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">Búsqueda por agrupación</a>.</p></li>
<li><p><strong>Índice invertido</strong> y <strong>concordancia difusa</strong>: Estas funciones mejoran la recuperación de palabras clave para campos escalares. Para obtener más información, consulte <a href="/docs/es/index-scalar-fields.md">Índice</a> de <a href="/docs/es/index-scalar-fields.md">campos escalares</a> y <a href="/docs/es/single-vector-search.md#filtered-search">búsqueda filtrada</a>.</p></li>
</ul>
<h3 id="New-Features" class="common-anchor-header">Nuevas funciones</h3><h4 id="GPU-Index---CAGRA" class="common-anchor-header">Índice GPU - CAGRA</h4><p>Queremos expresar nuestro más sincero agradecimiento al equipo de NVIDIA por su inestimable contribución a CAGRA, un índice de grafos basado en la GPU (SoTA) de última generación que puede utilizarse online.</p>
<p>A diferencia de índices anteriores basados en la GPU, CAGRA demuestra una superioridad abrumadora incluso en consultas de lotes pequeños, un área en la que tradicionalmente destacan los índices basados en la CPU. Además, el rendimiento de CAGRA en consultas de grandes lotes y la velocidad de construcción de índices, dominios en los que los índices de GPU ya brillan, es realmente incomparable.</p>
<p>El código de ejemplo se encuentra en <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_gpu_cagra.py">example_gpu_cagra.py</a>.</p>
<h4 id="Sparse-Vector-Beta" class="common-anchor-header">Vector disperso (Beta)</h4><p>En esta versión, introducimos un nuevo tipo de campo vectorial denominado vector disperso. Los vectores dispersos son diferentes de sus homólogos densos, ya que tienden a tener varias magnitudes mayor número de dimensiones con sólo un puñado de ser distinto de cero. Esta característica ofrece una mejor interpretabilidad debido a su naturaleza basada en términos y puede ser más eficaz en determinados dominios. Los modelos dispersos aprendidos, como SPLADEv2/BGE-M3, han demostrado ser muy útiles para tareas comunes de clasificación de primera etapa. El principal caso de uso de esta nueva función de Milvus es permitir una búsqueda semántica aproximada eficiente del vecino más próximo sobre vectores dispersos generados por modelos neuronales como SPLADEv2/BGE-M3 y modelos estadísticos como el algoritmo BM25. Milvus soporta ahora un almacenamiento, indexación y búsqueda eficaces y de alto rendimiento (MIPS, Maximum Inner Product Search) de vectores dispersos.</p>
<p>Encontrará código de ejemplo en <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/hello_sparse.py">hello_sparse.py</a>.</p>
<h4 id="Multi-Embedding---Hybrid-Search" class="common-anchor-header">Multiincrustación y búsqueda híbrida</h4><p>El soporte multivectorial es la piedra angular de las aplicaciones que requieren el procesamiento de datos multimodelo o una mezcla de vectores densos y dispersos. Con el soporte multivectorial, ahora puede:</p>
<ul>
<li>Almacenar incrustaciones vectoriales generadas para muestras de texto, imagen o audio no estructuradas a partir de múltiples modelos.</li>
<li>Realizar búsquedas RNA que incluyan múltiples vectores de cada entidad.</li>
<li>Personalizar las estrategias de búsqueda asignando pesos a los distintos modelos de incrustación.</li>
<li>Experimente con varios modelos de incrustación para encontrar la combinación óptima de modelos.</li>
</ul>
<p>El soporte multivectorial permite almacenar, indexar y aplicar estrategias de reordenación a múltiples campos vectoriales de distintos tipos, como FLOAT_VECTOR y SPARSE_FLOAT_VECTOR, en una colección. Actualmente existen dos estrategias de reordenación: <strong>Reciprocal Rank Fusion (RRF)</strong> y <strong>Average Weighted Scoring</strong>. Ambas estrategias combinan los resultados de búsqueda de distintos campos vectoriales en un conjunto de resultados unificado. La primera estrategia da prioridad a las entidades que aparecen sistemáticamente en los resultados de búsqueda de diferentes campos vectoriales, mientras que la otra estrategia asigna pesos a los resultados de búsqueda de cada campo vectorial para determinar su importancia en el conjunto de resultados final.</p>
<p>El código de ejemplo se encuentra en <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/hybrid_search.py">hybrid_search.py</a>.</p>
<h4 id="Inverted-Index-and-Fuzzy-Match" class="common-anchor-header">Índice invertido y coincidencia difusa</h4><p>En versiones anteriores de Milvus, se utilizaban índices de búsqueda binaria basados en memoria e índices Marisa Trie para la indexación de campos escalares. Sin embargo, estos métodos consumían mucha memoria. La última versión de Milvus emplea ahora el índice invertido basado en Tantivy, que puede aplicarse a todos los tipos de datos numéricos y de cadena. Este nuevo índice mejora drásticamente el rendimiento de las consultas escalares, reduciendo diez veces la consulta de palabras clave en cadenas. Además, el índice invertido consume menos memoria, gracias a optimizaciones adicionales en la compresión de datos y al mecanismo de almacenamiento en mapa de memoria (MMap) de la estructura de indexación interna.</p>
<p>Esta versión también admite coincidencias difusas en el filtrado escalar mediante prefijos, infijos y sufijos.</p>
<p>Encontrará código de ejemplo en <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/inverted_index_example.py">inverted_index_example.py</a> y <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/fuzzy_match.py">fuzzy_match.py</a>.</p>
<h4 id="Grouping-Search" class="common-anchor-header">Agrupación de búsquedas</h4><p>Ahora puede agrupar los resultados de la búsqueda por los valores de un campo escalar específico. Esto ayuda a las aplicaciones RAG a implementar la recuperación a nivel de documento. Considere una colección de documentos, cada documento se divide en varios pasajes. Cada pasaje está representado por un vector incrustado y pertenece a un documento. Para encontrar los documentos más relevantes en lugar de pasajes dispersos, puede incluir el argumento group_by_field en la operación search() para agrupar los resultados por el ID del documento.</p>
<p>Puede encontrar código de ejemplo en <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_group_by.py">example_group_by.py</a>.</p>
<h4 id="Float16-and-BFloat--Vector-DataType" class="common-anchor-header">Tipos de datos vectoriales Float16 y BFloat</h4><p>El aprendizaje automático y las redes neuronales utilizan a menudo tipos de datos de media precisión, como Float16 y BFloat. Aunque estos tipos de datos pueden mejorar la eficiencia de las consultas y reducir el uso de memoria, tienen como contrapartida una menor precisión. Con esta versión, Milvus soporta ahora estos tipos de datos para campos vectoriales.</p>
<p>Se puede encontrar código de ejemplo en <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/float16_example.py">float16_example.py</a> y <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/bfloat16_example.py">bfloat16_example.py</a>.</p>
<h3 id="Upgraded-Architecture" class="common-anchor-header">Arquitectura actualizada</h3><h4 id="L0-Segment" class="common-anchor-header">Segmento L0</h4><p>Esta versión incluye un nuevo segmento denominado Segmento L0, diseñado para registrar los datos eliminados. Este segmento compacta periódicamente los registros borrados almacenados y los divide en segmentos sellados, reduciendo el número de lavados de datos necesarios para borrados pequeños y dejando una pequeña huella de almacenamiento. Con este mecanismo, Milvus separa completamente las compactaciones de datos de los volcados de datos, mejorando el rendimiento de las operaciones de borrado y upsert.</p>
<h4 id="Refactored-BulkInsert" class="common-anchor-header">BulkInsert refactorizado</h4><p>Esta versión también introduce una lógica de inserción masiva mejorada. Esto le permite importar varios archivos en una única solicitud de inserción masiva. Con la versión modificada, tanto el rendimiento como la estabilidad de la inserción masiva han experimentado mejoras significativas. También se ha mejorado la experiencia del usuario, como la limitación de velocidad ajustada y los mensajes de error más fáciles de usar. Además, puede acceder fácilmente a los puntos finales de inserción masiva a través de la API RESTful de Milvus.</p>
<h4 id="Memory-mapped-Storage" class="common-anchor-header">Almacenamiento en memoria</h4><p>Milvus utiliza almacenamiento en mapa de memoria (MMap) para optimizar el uso de la memoria. En lugar de cargar el contenido del archivo directamente en la memoria, este mecanismo mapea el contenido del archivo en la memoria. Este enfoque tiene como contrapartida una degradación del rendimiento.  Al activar MMap para una colección indexada en HNSW en un host con 2 CPU y 8 GB de RAM, puede cargar 4 veces más datos con menos de un 10% de degradación del rendimiento.</p>
<p>Además, esta versión también permite un control dinámico y detallado de MMap sin necesidad de reiniciar Milvus.</p>
<p>Para más detalles, consulte <a href="/docs/es/mmap.md">Almacenamiento MMap</a>.</p>
<h3 id="Others" class="common-anchor-header">Otros</h3><h4 id="Milvus-CDC" class="common-anchor-header">Milvus-CDC</h4><p>Milvus-CDC es una herramienta complementaria fácil de usar para capturar y sincronizar datos incrementales entre instancias de Milvus, lo que permite una copia de seguridad incremental y una recuperación de desastres sencillas. En esta versión, Milvus-CDC ha mejorado su estabilidad y su funcionalidad de captura de datos de cambios (CDC) está ahora disponible de forma general.</p>
<p>Para obtener más información sobre Milvus-CDC, consulte <a href="https://github.com/zilliztech/milvus-cdc">el repositorio GitHub</a> y la <a href="/docs/es/milvus-cdc-overview.md">descripción general de Milvus-CDC</a>.</p>
<h4 id="Refined-MilvusClient-Interfaces" class="common-anchor-header">Interfaces MilvusClient perfeccionadas</h4><p>MilvusClient es una alternativa fácil de usar al módulo ORM. Adopta un enfoque puramente funcional para simplificar las interacciones con el servidor. En lugar de mantener un pool de conexiones, cada MilvusClient establece una conexión gRPC con el servidor. El módulo MilvusClient ha implementado la mayoría de las funcionalidades del módulo ORM. Para saber más sobre el módulo MilvusClient, visite <a href="https://github.com/milvus-io/pymilvus">pymilvus</a> y los <a href="/api-reference/pymilvus/v2.4.x/About.md">documentos de referencia</a>.</p>
