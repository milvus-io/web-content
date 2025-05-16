---
id: roadmap.md
title: Hoja de ruta de Milvus
related_key: Milvus roadmap
summary: >-
  Milvus es una base de datos vectorial de código abierto creada para potenciar
  aplicaciones de IA. Esta es nuestra hoja de ruta para guiar nuestro
  desarrollo.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Hoja de ruta de Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Bienvenido a la hoja de ruta de Milvus. Acompáñenos en nuestro viaje continuo para mejorar y hacer evolucionar Milvus. Estamos encantados de compartir nuestros logros, planes de futuro y nuestra visión de lo que nos espera. Nuestra hoja de ruta es más que una lista de las próximas funciones: refleja nuestro compromiso con la innovación y nuestra dedicación al trabajo con la comunidad. Le invitamos a profundizar en nuestra hoja de ruta, a darnos su opinión y a ayudarnos a dar forma al futuro de Milvus.</p>
<h2 id="Roadmap" class="common-anchor-header">Hoja de ruta<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
        <tr>
            <th>Categoría</th>
            <th>Milvus 2.4.0 (Recientemente alcanzado)</th>
            <th>Milvus 2.5.0 (Próximamente a mediados del año fiscal 24)</th>
            <th>Futura hoja de ruta (Milvus 3.0 prevista en CY24)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Fácil de usar para desarrolladores de IA</strong><br/> Una<i>pila tecnológica fácil de usar para desarrolladores, mejorada con las últimas innovaciones en IA</i></td>
            <td><strong>Multivectores y búsqueda híbrida</strong><br/><i>Marco para la recuperación y fusión multiplex</i><br/><br/><strong>Aceleración de índices en GPU</strong><br/><i>Soporte para QPS más altos y creación de índices más rápida</i><br/><br/><strong>Biblioteca de modelos en PyMilvus</strong><br/><i>Modelos de incrustación integrados para Milvus</i></td>
            <td><strong>Sparse Vector (GA)</strong><br/><i>Extracción de características locales y búsqueda por palabras clave</i><br/><br/><strong>Milvus Lite (GA)</strong><br/> Una<i>versión ligera y en memoria de Milvus</i><br/><br/><strong>Galería de modelos</strong><i>de</i><strong>incrustación</strong><br/><i>Soporte para incrustaciones de imágenes y multimodales y modelos reranker en bibliotecas de modelos</i></td>
            <td><strong>Entrada y salida de datos originales</strong><br/><i>Compatibilidad con tipos de datos Blob</i><br/><br/><strong>Agrupación de datos</strong><br/><i>Co-localidad de los datos</i><br/><br/><strong>Búsqueda vectorial orientada a escenarios</strong><br/><i>Por ejemplo, búsqueda multiobjetivo y filtrado NN</i><br/><br/><strong>Compatibilidad con incrustación y reranker Endpoint</strong></td>
        </tr>
        <tr>
            <td><strong>Funciones avanzadas</strong><br/><i>Funciones mejoradas de recuperación y gestión de datos</i></td>
            <td><strong>Compatibilidad con tipos de datos FP16 y BF16</strong><br/><i>Estos tipos de datos ML pueden ayudar a reducir el uso de memoria</i><br/><br/><strong>Búsqueda por agrupación</strong><br/><i>Incrustación de división agregada</i><br/><br/><i>Coincidencia difusa e índice invertido</i><br/><i>Compatibilidad con coincidencia difusa e índice invertido para tipos escalares como varchar e int.</i></td>
            <td><strong>Índice invertido para matrices y JSON</strong><br/><i>Indexación para matrices y compatibilidad parcial con JSON</i><br/><br/><strong>Índice</strong> de conjuntos de bits<br/><i>Velocidad de ejecución mejorada y futura agregación de datos</i><br/><br/><strong>Truncar colección</strong><br/><i>Permite la eliminación de datos conservando los metadatos</i><br/><br/><strong>Compatibilidad con valores nulos y predeterminados</strong></td>
            <td><strong>Compatibilidad con más tipos de datos</strong><br/><i>por ejemplo, Datetime, GIS</i><br/><br/><strong>Filtrado avanzado de texto</strong><br/><i>por ejemplo, Match Phrase</i><br/><br/><strong>Deduplicación de claves primarias</strong></td>
        </tr>
        <tr>
            <td><strong>Rentabilidad y arquitectura</strong><br/><i>Sistemas avanzados que hacen hincapié en la estabilidad, la rentabilidad, la escalabilidad y el rendimiento</i></td>
            <td><strong>Soporte para más colecciones/particiones</strong><br/><i>Maneja más de 10.000 colecciones en clusters más pequeños</i><br/><br/><strong>Optimización</strong><strong>Mmap</strong><br/><i>Equilibra el consumo reducido de memoria con la latencia</i><br/><br/><strong>Bulk Insert Optimazation</strong><br/><i>Simplifica la importación de grandes conjuntos de datos</i></td>
            <td><strong>Lazy Load</strong><br/><i>Los datos se cargan bajo demanda mediante operaciones de lectura</i><br/><br/><strong>Compactación mayor</strong><br/><i>Redistribuye los datos en función de la configuración para mejorar el rendimiento de la lectura</i><br/><br/><strong>Mmap para datos crecientes</strong><br/><i>Archivos Mmap para segmentos de datos crecientes</i></td>
            <td><strong>Control de memoria</strong><br/><i>Reduce los problemas de falta de memoria y proporciona una gestión global de la memoria</i><br/><br/><strong>Introducción de LogNode</strong><br/><i>Garantiza la coherencia global y aborda el cuello de botella de un solo punto en la coordinación raíz</i><br/><br/><strong>Formato de almacenamiento V2</strong><br/><i>El diseño de formato universal sienta las bases para el acceso a datos basado en disco</i></td>
        </tr>
        <tr>
            <td><strong>Enterprise Ready</strong><br/><i>Diseñado para satisfacer las necesidades de los entornos de producción empresariales</i></td>
            <td><strong>Milvus CDC</strong><br/><i>Capacidad de replicación de datos</i><br/><br/><strong>Mejora del registro de acceso</strong><br/><i>Registro detallado para auditoría y seguimiento</i></td>
            <td><strong>Nuevo grupo de recursos</strong><br/><i>Gestión de recursos mejorada</i><br/><br/><strong>Gancho de almacenamiento</strong><br/><i>Compatibilidad con el cifrado Bring Your Own Key (BYOK)</i></td>
            <td><strong>Ajuste dinámico del número</strong><i>de ré</i><strong>plicas</strong><br/><i>Facilita los cambios dinámicos del número de réplicas</i><br/><br/><strong>Modificación dinámica del esquema</strong><br/><i>por ejemplo, añadir/eliminar campos, modificar longitudes varchar</i><br/><br/><strong>SDKs de</strong> Rust<strong>y C#</strong>.</td>
        </tr>
    </tbody>
</table>
<ul>
<li>Nuestra hoja de ruta suele estructurarse en tres partes: la versión más reciente, la próxima versión y una visión a medio y largo plazo para el próximo año.</li>
<li>A medida que avanzamos, aprendemos continuamente y en ocasiones ajustamos nuestro enfoque, añadiendo o eliminando elementos según sea necesario.</li>
<li>Estos planes son indicativos y están sujetos a cambios, y pueden variar en función de los servicios de suscripción.</li>
<li>Nos ceñimos firmemente a nuestra hoja de ruta, y nuestras <a href="/docs/es/v2.4.x/release_notes.md">notas de publicación</a> nos sirven de referencia.</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">Cómo contribuir<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
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
    </button></h2><p>Como proyecto de código abierto, Milvus se nutre de las contribuciones de la comunidad. A continuación le indicamos cómo puede formar parte de nuestro viaje.</p>
<h3 id="Share-feedback" class="common-anchor-header">Comparte tus comentarios</h3><ul>
<li><p>Informe de problemas: ¿Ha encontrado un error o tiene alguna sugerencia? Abra una incidencia en nuestra <a href="https://github.com/milvus-io/milvus/issues">página de GitHub</a>.</p></li>
<li><p>Sugerencias de funciones: ¿Tienes ideas para nuevas funciones o mejoras? <a href="https://github.com/milvus-io/milvus/discussions">Nos encantaría escucharlas.</a></p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">Contribuciones al código</h3><ul>
<li><p>Pull requests: Contribuya directamente a nuestra <a href="https://github.com/milvus-io/milvus/pulls">base de código</a>. Ya sea para corregir errores, añadir funciones o mejorar la documentación, sus aportaciones son bienvenidas.</p></li>
<li><p>Guía de desarrollo: Consulte nuestra <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guía del colaborador</a> para conocer las directrices sobre contribuciones al código.</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">Corre la voz</h3><ul>
<li><p>Comparte en las redes sociales: ¿Le gusta Milvus? Comparta sus casos de uso y experiencias en las redes sociales y blogs de tecnología.</p></li>
<li><p>Inclúyanos en GitHub: Muestra tu apoyo destacando nuestro <a href="https://github.com/milvus-io/milvus">repositorio de GitHub</a>.</p></li>
</ul>
