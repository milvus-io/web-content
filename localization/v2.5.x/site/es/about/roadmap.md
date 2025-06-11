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
    </button></h1><p>Bienvenido a la hoja de ruta de Milvus. Acompáñenos en nuestro viaje continuo para mejorar y hacer evolucionar Milvus. Estamos encantados de compartir nuestros logros, planes de futuro y nuestra visión de lo que nos espera. Nuestra hoja de ruta es más que una lista de las próximas funciones: refleja nuestro compromiso con la innovación y nuestra dedicación al trabajo con la comunidad. Le invitamos a profundizar en nuestra hoja de ruta, a darnos su opinión y a ayudar a dar forma al futuro de Milvus.</p>
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
            <th>Milvus 2.5.x (Conseguido en versiones recientes)</th>
            <th>Próxima versión - Milvus 2.6 (mediados de CY25)</th>
            <th>Futura hoja de ruta - Milvus 3.0 (Dentro de 1 año)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Procesamiento de datos no estructurados impulsado por IA</strong><br/><i>Refuerzo de la capacidad de procesar y analizar datos no estructurados utilizando modelos de IA y tecnologías avanzadas</i>.</td>
            <td><i>Búsqueda de texto completo</i><br/><i>Admite la búsqueda de texto completo con Sparse-BM25. La nueva API acepta texto como entrada y genera automáticamente vectores dispersos dentro de Milvus</i><br/><br/><strong>Sparse Vector (GA)</strong><br/><i>Soporta un método eficiente de almacenamiento e indexación para vectores dispersos</i><br/></td>
            <td><strong>Entrada y salida de datos</strong><br/><i>Soporta los principales servicios de modelos para la entrada de texto original</i><br/><br/><strong>Reranker avanzado</strong><br/><i>Soporta rerankers basados en modelos y función de puntuación definida por el usuario</i><br/><br/><strong>Búsqueda</strong> iterativa<br/><i>Revisa el vector de consulta basándose en el etiquetado del usuario</i></td>
            <td><strong>Soporta Tensores</strong><br/><i>Soporta lista de vectores, uso típico como Colbert, Copali y representación de Video</i><br/><br/><strong>Soporta Más Tipos de Datos</strong><br/> e<i>.g. Datetime, Map, GIS</i></td>
        </tr>
        <tr>
            <td><strong>Calidad y rendimiento de la búsqueda</strong><br/><i>Proporcione resultados precisos, relevantes y rápidos optimizando la arquitectura, los algoritmos y las API</i>.</td>
            <td><strong>Función de coincidencia de texto</strong><br/><i>Filtrado rápido de palabras clave/tokens en texto/varchar</i><br/><br/><strong>Mejora de la búsqueda por agrupación</strong><br/><i>Introducción de group_size y soporte de agrupación por en la búsqueda híbrida</i><br/><br/><strong>Índice de mapa de bits e índice invertido</strong><br/><i>Aceleración del filtrado por etiquetas</i></td>
            <td><strong>Comparación avanzada</strong><br/><i>por ejemplo, phrase_match, multi_match </i><br/><br/><strong>Mejora del analizador</strong><br/><i>Mejora del analizador con soporte ampliado del tokenizador y mejor capacidad de observación</i><br/><br/><strong>Filtrado</strong> JSON<br/><i>Optimización de la indexación y el análisis JSON para un procesamiento más rápido</i></td>
            <td><strong>Capacidad de ordenación</strong><br/><i>Ordenación por campos escalares durante la ejecución</i><br/><br/><strong>Soporte de agrupación de datos</strong><br/><i>Co-localidad de datos</i></td>
        </tr>
        <tr>
            <td><strong>Funcionalidad y gestión enriquecidas</strong><br/><i>Funciones de gestión de datos robustas y fáciles de usar para el desarrollador</i></td>
            <td><strong>Admite archivos csv en la importación de datos</strong><br/><i>Bulkinsert admite el formato csv</i><br/><br/><strong>Admite valores nulos y predeterminados</strong><br/><i>Los tipos</i> nulo<i>y predeterminado facilitan la importación de datos de otros DBMS</i><br/><br/><strong>Milvus WebUI (Beta)</strong><br/><i>Herramientas de gestión visual para DBAs</i></td>
            <td><strong>Cambio de esquema</strong><br/><i>p. ej., añadir/eliminar campo, modificar longitud varchar</i><br/><br/><strong>Agregaciones</strong><br/><i>Agregaciones de campos</i> escalares<i>, p. ej., recuento, valor distinto, mínimo, máximo</i><br/><br/><strong>Soporte UDF</strong><br/><i>Función definida por el usuario</i></td>
            <td><strong>Actualización masiva</strong><br/><i>Admite actualizaciones masivas del valor de un campo específico</i><br/><br/><strong>Deduplicación de claves primarias</strong><br/><i>Mediante el índice pk global</i><br/><br/><strong>Versionado y restauración de datos</strong><br/><i>Admite versionado de datos por instantánea</i></td>
        </tr>
        <tr>
            <td><strong>Rentabilidad y arquitectura</strong><br/><i>Sistemas de última generación con estabilidad, rentabilidad y despliegue optimizado.</i></td>
            <td><strong>Optimización de memoria</strong><br/><i>Reducción de OOM y mejora de la carga</i><br/><br/><strong>Compactación en clúster</strong><br/><i>Redistribución de datos basada en la configuración para acelerar el rendimiento de lectura</i><br/><br/><strong>Formato de almacenamiento V2 (Beta)</strong><br/><i>Diseño de formatos universales y base para el acceso a datos basado en disco</i></td>
            <td><strong>Almacenamiento por niveles</strong><br/><i>Admite almacenamiento en caliente y en frío para optimizar costes</i><br/><br/><strong>Stream Node</strong><br/><i>Procesa datos en streaming y simplifica el flujo de escritura incremental</i><br/><br/><strong>MixCoord</strong><br/><i>Fusiona las lógicas de Coord en una sola</i></td>
            <td><strong>Vector Lake</strong><br/><i>Solución offline rentable, conector spark e integración con iceberg</i><br/><br/><strong>Logstore Component</strong><br/><i>Reducir las dependencias de componentes externos como pulsar</i><br/><br/><i>Política de desalojo de</i><strong>datos</strong><br/><i>Los usuarios pueden definir su propia política de desalojo</i></td>
        </tr>
    </tbody>
</table>
<ul>
<li>Nuestra hoja de ruta suele estructurarse en tres partes: la versión más reciente, la próxima versión y una visión a medio y largo plazo para el próximo año.</li>
<li>A medida que avanzamos, aprendemos continuamente y en ocasiones ajustamos nuestro enfoque, añadiendo o eliminando elementos según sea necesario.</li>
<li>Estos planes son indicativos y están sujetos a cambios, y pueden variar en función de los servicios de suscripción.</li>
<li>Nos ceñimos firmemente a nuestra hoja de ruta, y nuestras <a href="/docs/es/v2.5.x/release_notes.md">notas de publicación</a> nos sirven de referencia.</li>
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
<li><p>Sugerencias de funciones: ¿Tienes ideas para nuevas funciones o mejoras? Únete a la conversación en <a href="https://github.com/milvus-io/milvus/discussions/40263">nuestro hilo de debate activo</a>.</p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">Contribuciones al código</h3><ul>
<li><p>Solicitudes de colaboración: Contribuye directamente a nuestro <a href="https://github.com/milvus-io/milvus/pulls">código</a>. Ya sea para corregir errores, añadir funciones o mejorar la documentación, tus aportaciones son bienvenidas.</p></li>
<li><p>Guía de desarrollo: Consulte nuestra <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guía del colaborador</a> para conocer las directrices sobre contribuciones al código.</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">Corre la voz</h3><ul>
<li><p>Comparte en las redes sociales: ¿Le gusta Milvus? Comparta sus casos de uso y experiencias en las redes sociales y blogs de tecnología.</p></li>
<li><p>Inclúyanos en GitHub: Muestra tu apoyo destacando nuestro <a href="https://github.com/milvus-io/milvus">repositorio de G</a>itHub.</p></li>
</ul>
