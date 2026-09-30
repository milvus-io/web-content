---
id: roadmap.md
title: Hoja de ruta de Milvus
related_key: Milvus roadmap
summary: >-
  Milvus es una base de datos vectorial de código abierto diseñada para impulsar
  aplicaciones de inteligencia artificial. A continuación, presentamos nuestra
  hoja de ruta, que servirá de guía para nuestro desarrollo.
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="common-anchor-header">🌌 Hacia la base de datos multimodal de próxima generación y Vector Lakebase<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Hoja de ruta del producto Milvus</strong></p>
<p>¡Bienvenidos a la hoja de ruta de Milvus!</p>
<p>Estamos llevando a Milvus hacia una nueva era —la base de datos multimodal de próxima generación— <strong>que abarca desde datos estructurados hasta datos no estructurados, desde la recuperación en tiempo real hasta el análisis offline, y desde el rendimiento de un único clúster hasta</strong> <strong>una arquitectura</strong> <strong>global</strong> <strong>de Vector Lakebase.</strong></p>
<p>Esta hoja de ruta describe los objetivos principales de <strong>Milvus v3.0 (beta pública)</strong> y <strong>Milvus v3.1 (desarrollo a largo plazo)</strong>, junto con el plan de evolución de <strong>Zilliz Vector Lakebase</strong>.</p>
<h2 id="🌠-Milvus-v30-Public-Beta" class="common-anchor-header">🌠 Milvus v3.0 (beta pública)<button data-href="#🌠-Milvus-v30-Public-Beta" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Beta pública: mayo de 2026</strong></p>
<p>Enfoque: Crear un <strong>motor de consultas nativo semántico</strong> con clasificación, agregación y recuperación multivectorial integradas en el propio motor, así como la <strong>base nativa de lago de datos de Zilliz Vector Lakebase</strong>, de modo que el procesamiento acceda a los datos sin necesidad de migración.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Aspectos destacados<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Schema--Data-Type-Evolution" class="common-anchor-header">🔹 <strong>Evolución del esquema y los tipos de datos</strong></h4><ul>
<li>Admite ALTER COLLECTION ADD COLUMN y DROP COLUMN en tiempo de ejecución sin necesidad de reconstruir índices ni interrumpir el servicio.</li>
<li>Ofrece <strong>dos vías de retroalimentación</strong> para las nuevas columnas: externa a través de Spark Connector e interna con vectores dispersos BM25 generados automáticamente en el momento de la escritura.</li>
<li>Introducción de <strong>TEXT</strong> como tipo de datos de primera clase que almacena el texto original junto con vectores, con soporte para BM25 y coincidencia de texto.</li>
</ul>
<h4 id="🔹-Query-Execution-Overhaul" class="common-anchor-header">🔹 <strong>Revisión de la ejecución</strong> de <strong>consultas</strong> </h4><ul>
<li>Incorporación de <strong>«Order By»</strong> en el motor con ordenación por segmento y ordenación por fusión entre los nodos de consulta.</li>
<li>Añade <strong>la agregación</strong> <strong>de consultas</strong> al estilo SQL (GROUP BY con COUNT, SUM, AVG, MIN, MAX) calculada en el núcleo.</li>
<li>Introducción de <strong>facetas de búsqueda</strong> sobre los resultados de ANN con estadísticas por bucket y subfacetas anidadas del lado del servidor.</li>
<li>Compatibilidad con <strong>diccionarios personalizados</strong> y tablas de sinónimos registrados en el clúster para mejorar la recuperación de CJK y de dominios específicos.</li>
</ul>
<h4 id="🔹-Multi-Vector--Late-Interaction-Support" class="common-anchor-header">🔹 <strong>Compatibilidad con multivectores e interacción tardía</strong></h4><ul>
<li>Introducción de <strong>StructList</strong> para representar una entidad como una única fila con múltiples vectores, con soporte nativo para la interacción tardía (ColBERT, ColPali) a través de MAX_SIM.</li>
<li>Compatibilidad con <strong>la búsqueda a nivel de elemento y de entidad</strong> en los campos de StructList, con políticas de coincidencia configurables para los resultados a nivel de entidad.</li>
<li>Se añaden tres <strong>estrategias de recuperación multivectorial</strong>: TokenANN (exhaustiva), Muvera (basada en proyección, sin entrenamiento) y Lemur (compresión aprendida).</li>
</ul>
<h4 id="🔹-Retrieval--Index-Overhaul" class="common-anchor-header">🔹 <strong>Revisión de la recuperación y el índice</strong></h4><ul>
<li>Revisión del <strong>índice invertido disperso</strong> con compresión por bloques, cuantificación de pesos y un formato persistente; introducción de <strong>SINDI</strong> como algoritmo predeterminado de índice invertido disperso.</li>
<li>Ampliar la cobertura del índice con toda la <strong>familia Faiss</strong> (SVS, Panorama, PQ, IVFPQ, ScaNN) y <strong>MinHash DIDO</strong> para la detección de casi duplicados.</li>
<li>Compatibilidad con <strong>campos vectoriales nulos</strong> para incrustaciones asíncronas y modalidades ausentes, con filtrado automático en el momento de la búsqueda.</li>
</ul>
<h4 id="🔹-Vector-Lakebase-Storage--Compute-Architecture" class="common-anchor-header">🔹 <strong>Arquitectura de almacenamiento y computación vectorial de Lakebase</strong></h4><ul>
<li>Introducción de <strong>External Collection</strong> para indexar y consultar datos en S3, GCS y Azure in situ, con compatibilidad con los formatos de tabla Lance, Parquet, Iceberg y Vortex.</li>
<li>Se añade <strong>Vortex</strong>, un formato columnar abierto, y <strong>Loon (Storage V3)</strong>, una capa de almacenamiento de formato mixto para lecturas puntuales eficientes desde el almacenamiento de objetos.</li>
<li>Compatibilidad con <strong>instantáneas puntuales</strong> con aislamiento de tipo MVCC para el procesamiento por lotes, mientras el servicio continúa escribiendo.</li>
<li>Se integra como <strong>Spark DataSource v2</strong> para leer y escribir en Milvus directamente en los flujos de trabajo de Spark, Databricks y EMR.</li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1 (visión a largo plazo)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Calendario: finales de 2026 y más allá</strong></p>
<p>Enfoque: <strong>inteligencia de almacenamiento</strong>, <strong>integridad de la ruta de escritura</strong>, <strong>extensibilidad de la computación</strong> y <strong>mayor</strong> <strong>interoperabilidad</strong> <strong>con Vector Lakebase</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Aspectos destacados<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Storage--Write-Path" class="common-anchor-header">🔹 <strong>Almacenamiento y ruta de escritura</strong></h4><ul>
<li>Añadir <strong>la aplicación de predicados</strong> con poda de índices de página y filtros Bloom en la capa de almacenamiento.</li>
<li>Implementar <strong>la deduplicación por clave primaria</strong> en la ingesta para evitar duplicados en el momento de la escritura.</li>
</ul>
<h4 id="🔹-Compute--Elasticity" class="common-anchor-header">🔹 <strong>Computación y elasticidad</strong></h4><ul>
<li>Compatibilidad con <strong>funciones definidas por el usuario (UDF)</strong> para ejecutar lógica personalizada en el motor, en el plano de datos.</li>
<li>Habilitar <strong>la división de fragmentos</strong> para volver a dividirlos a medida que crecen los datos, con soporte para claves de fragmentación personalizadas.</li>
</ul>
<h4 id="🔹-Spark--Vector-Lakebase-Expansion" class="common-anchor-header">🔹 <strong>Expansión</strong> de <strong>Spark y</strong> <strong>Vector Lakebase</strong> </h4><ul>
<li>Ampliar el conector de Spark con una biblioteca más completa de <strong>operadores por lotes nativos</strong>.</li>
<li>Añade capacidades <strong>de formato de tabla</strong>, incluyendo «time-travel», evolución de esquemas y reversión de instantáneas.</li>
<li>Ampliar la interoperabilidad de Vector Lakebase con <strong>índices externos actualizados mediante CDC</strong>, compatibilidad con Apache Paimon y formatos de datos adicionales.</li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Construyendo juntos el futuro de Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus es un proyecto de código abierto impulsado por una comunidad global de desarrolladores. Invitamos a todos los miembros de la comunidad a ayudar a dar forma a la base de datos multimodal de próxima generación:</p>
<ul>
<li><p>💬 <strong>Comparte tus comentarios</strong>: propone nuevas funcionalidades o ideas de optimización en <a href="https://github.com/milvus-io/milvus/discussions">GitHub Discussions</a>.</p></li>
<li><p>🐛 <strong>Informa de problemas</strong>: envía informes de errores a través de <a href="https://github.com/milvus-io/milvus/issues">GitHub Issues</a>.</p></li>
<li><p>🔧 <strong>Aporta código</strong>: envía pull requests y ayuda a desarrollar las funcionalidades principales.</p>
<ul>
<li><strong>Solicitudes de incorporación de cambios</strong>: contribuye directamente a nuestro <a href="https://github.com/milvus-io/milvus/pulls">código fuente</a>. Ya sea corrigiendo errores, añadiendo funcionalidades o mejorando la documentación, tus contribuciones son bienvenidas.</li>
<li><strong>Guía de desarrollo</strong>: Consulta nuestra <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">Guía para colaboradores</a> para conocer las directrices sobre las contribuciones de código.</li>
</ul></li>
<li><p>🗣️ <strong>Únete a la conversación</strong>: Haz preguntas y conoce a los mantenedores en <a href="https://milvus.io/discord">Discord</a>, en <a href="https://meetings.hubspot.com/chloe-williams1/milvus-meeting">las horas de atención de Milvus</a> o en <a href="https://milvus.io/community">todos los canales de la comunidad</a>.</p></li>
<li><p>⭐ <strong>Corre la voz</strong>: comparte buenas prácticas e historias de éxito, y sigue a Milvus en <a href="https://twitter.com/milvusio">X</a>, <a href="https://www.linkedin.com/company/the-milvus-project/">LinkedIn</a> y <a href="https://www.youtube.com/c/MilvusVectorDatabase">YouTube</a>.</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
