---
id: roadmap.md
title: Hoja de ruta de Milvus
related_key: Milvus roadmap
summary: >-
  Milvus es una base de datos vectorial de código abierto diseñada para impulsar
  aplicaciones de inteligencia artificial. A continuación, te presentamos
  nuestra hoja de ruta, que servirá de guía para nuestro desarrollo.
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 Hacia la base de datos multimodal y el lago de datos de próxima generación<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
<p>Estamos llevando a Milvus hacia una nueva era —la base de datos multimodal de próxima generación— que abarca <strong>desde datos estructurados hasta datos no estructurados</strong>, <strong>desde la recuperación en tiempo real hasta el análisis offline</strong>, y <strong>desde el rendimiento de un único clúster hasta una arquitectura de lago de datos global</strong>.</p>
<p>Esta hoja de ruta describe los objetivos principales de <strong>Milvus v2.6 (en desarrollo)</strong>, <strong>Milvus v3.0 (prevista para finales de 2026)</strong> y <strong>Milvus v3.1 (desarrollo a largo plazo)</strong>, junto con el plan de evolución de <strong>Vector Lake (lago de datos / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (en desarrollo)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Plazo: mediados de 2025 – finales de 2025</strong></p>
<p>Enfoque: <strong>Actualizar el modelo de datos</strong>, <strong>refactorizar la arquitectura de streaming</strong>, <strong>desarrollar capacidades de almacenamiento por niveles (hot/cold)</strong> y lanzar el <strong>prototipo de Vector Lake (v0.1)</strong>.</p>
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹 <strong>Actualización del modelo de datos</strong></h4><ul>
<li><p>Introducción de un tipo de datos unificado <strong>Tensor / StructList</strong> para admitir estructuras de incrustación multivectorial, lo que permite la compatibilidad con <em>ColBERT</em>, <em>CoLQwen</em>, <em>vídeo</em> y <em>vectores multimodales</em>.</p></li>
<li><p>Se añade compatibilidad <strong>con datos geográficos</strong>, incluidos puntos, regiones e indexación espacial (basada en <em>libspatial</em>), para ampliar los casos de uso en LBS y SIG.</p></li>
<li><p>Compatibilidad con el tipo de datos <strong>«Timestamp with Timezone</strong> ».</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹 <strong>Reestructuración de la arquitectura de StreamNode</strong></h4><ul>
<li><p>Reescritura del canal de ingestión de streaming para optimizar las escrituras incrementales y el cálculo en tiempo real.</p></li>
<li><p>Mejora significativa del rendimiento y la estabilidad de la concurrencia, sentando las bases para un procesamiento unificado en tiempo real y fuera de línea.</p></li>
<li><p>Introducción de un nuevo motor de colas de mensajes: <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹 <strong>Arquitectura de almacenamiento y niveles «caliente»/«frío» (StorageV2)</strong></h4><ul>
<li><p>Compatibilidad con dos formatos de almacenamiento: <strong>Parquet</strong> y <strong>Vortex</strong>, lo que mejora la concurrencia y la eficiencia de la memoria.</p></li>
<li><p>Implementar un almacenamiento por niveles con separación automática de datos «calientes» y «fríos» y programación inteligente.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>Prototipo de Vector Lake (v0.1)</strong></h4><ul>
<li><p>Integración con <strong>Spark</strong>, <strong>DuckDB</strong> y <strong>DataFusion</strong> a través de FFI, lo que permite la evolución del esquema sin conexión y las consultas KNN.</p></li>
<li><p>Ofrece visualización de datos multimodal y una demostración de ETL con Spark, estableciendo la arquitectura básica del lago de datos.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0 (previsto para principios de 2026)<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Calendario: finales de 2025 – principios de 2026</strong></p>
<p>Enfoque: mejoras integrales en <strong>la experiencia de búsqueda</strong>, <strong>la flexibilidad de los esquemas</strong> y <strong>la compatibilidad con datos no estructurados</strong>, junto con el lanzamiento de <strong>Vector Lake (v0.2)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Aspectos más destacados<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹 <strong>Renovación de la experiencia de búsqueda</strong></h4><ul>
<li><p>Introducción de la búsqueda por similitud <strong>«Más como este» (MLT)</strong>, con soporte para búsquedas con posición o ejemplos negativos.</p></li>
<li><p>Se añaden capacidades de búsqueda semántica, como <strong>el resaltado</strong> y <strong>el refuerzo</strong>.</p></li>
<li><p>Compatibilidad con <strong>diccionarios personalizados</strong> y <strong>tablas de sinónimos</strong>, lo que permite definir reglas léxicas y semánticas en la capa del analizador.</p></li>
<li><p>Introducción de capacidades de <strong>agregación</strong> para las consultas.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>Multitenencia y gestión de recursos</strong></h4><ul>
<li><p>Habilitar la eliminación multitenant, las estadísticas y la clasificación en niveles «calientes» y «fríos».</p></li>
<li><p>Mejorar el aislamiento de recursos y las estrategias de programación para dar soporte a millones de tablas en un único clúster.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header">🔹 <strong>Mejoras en el esquema y la clave primaria</strong></h4><ul>
<li><p>Implementar <strong>la deduplicación global de claves primarias (Global PK Dedup)</strong> para garantizar la coherencia y la unicidad de los datos.</p></li>
<li><p>Admite <strong>una gestión flexible de esquemas</strong> (adición/eliminación de columnas, relleno de copias de seguridad).</p></li>
<li><p>Permitir <strong>valores NULL</strong> en campos vectoriales.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹 <strong>Ampliación de los tipos de datos no estructurados (BLOB / Texto)</strong></h4><ul>
<li><p>Introducción del <strong>tipo BLOB</strong>, que proporciona almacenamiento y referencias nativas para datos binarios, como archivos, imágenes y vídeos.</p></li>
<li><p>Introducir <strong>el tipo TEXT</strong>, que ofrece capacidades mejoradas de búsqueda de texto completo y basada en el contenido.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹 <strong>Funcionalidades de nivel empresarial</strong></h4><ul>
<li><p>Compatibilidad con <strong>copias de seguridad y recuperación basadas en instantáneas</strong>.</p></li>
<li><p>Ofrece <strong>seguimiento de extremo a extremo</strong> y <strong>registro de auditoría</strong>.</p></li>
<li><p>Implementación de <strong>alta disponibilidad (HA)</strong> en modo <strong>activo-en espera</strong> en implementaciones con varios clústeres.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>Admite <strong>el almacenamiento de TEXT/BLOB</strong> y <strong>la gestión de instantáneas multiversión</strong>.</p></li>
<li><p>Integra Spark para tareas de indexación sin conexión, agrupación en clústeres, deduplicación y reducción de dimensionalidad.</p></li>
<li><p>Ofrecer <strong>demostraciones de consultas en frío y pruebas de rendimiento sin conexión de ChatPDF</strong>.</p></li>
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
    </button></h2><p><strong>Plazo: mediados de 2026</strong></p>
<p>Enfoque: <strong>Funciones definidas por el usuario (UDF)</strong>, <strong>integración de la computación distribuida</strong>, <strong>optimización de consultas escalares</strong>, <strong>fragmentación dinámica</strong> y el lanzamiento oficial de <strong>Vector Lake (v1.0)</strong>.</p>
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>Ecosistema de UDF y computación distribuida</strong></h4><ul>
<li><p>Compatibilidad con <strong>funciones definidas por el usuario (UDF)</strong>, lo que permite a los desarrolladores incorporar lógica personalizada en los flujos de trabajo de recuperación y cálculo.</p></li>
<li><p>Integración profunda con <strong>Ray Dataset / Daft</strong> para la ejecución distribuida de UDF y el procesamiento de datos multimodales.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header">🔹 <strong>Evolución de las consultas escalares y el formato local</strong></h4><ul>
<li><p>Optimización del rendimiento del filtrado y la agregación para campos escalares.</p></li>
<li><p>Mejora la evaluación de expresiones y la ejecución acelerada por índices.</p></li>
<li><p>Compatibilidad con <strong>actualizaciones in situ</strong> para formatos de archivo locales.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>Funcionalidades de búsqueda avanzadas</strong></h4><ul>
<li><p>Añade las siguientes funciones: consultas <strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong> y <strong>de coincidencia aproximada</strong>.</p></li>
<li><p>Mejora la recuperación de texto con soporte para:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 <strong>Segmentación dinámica y escalabilidad</strong></h4><ul>
<li><p>Habilitar <strong>la división automática de fragmentos</strong> y <strong>el equilibrio de carga</strong> para un escalado fluido.</p></li>
<li><p>Mejora <strong>la creación de índices globales</strong> y garantiza <strong>el rendimiento de la búsqueda distribuida</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>Integración profunda con <strong>Ray, Daft y PyTorch</strong> para admitir funciones definidas por el usuario (UDF) distribuidas y casos de uso de ingeniería de contexto.</p></li>
<li><p>Ofrece <strong>demostraciones de RAG (generación aumentada por recuperación)</strong> <strong>e importación desde tablas de Iceberg</strong>.</p></li>
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
    </button></h2><p>Milvus es un proyecto de código abierto impulsado por una comunidad global de desarrolladores.</p>
<p>Invitamos cordialmente a todos los miembros de la comunidad a que nos ayuden a dar forma a la base de datos multimodal de próxima generación:</p>
<ul>
<li><p>💬 <strong>Comparte tus comentarios</strong>: propone nuevas funcionalidades o ideas de optimización</p></li>
<li><p>🐛 <strong>Informar de problemas</strong>: notificar errores a través de GitHub Issues</p></li>
<li><p>🔧 <strong>Aporta código</strong>: envía pull requests y ayuda a desarrollar las funciones principales</p>
<ul>
<li><p><strong>Solicitudes de incorporación de cambios</strong>: contribuye directamente a nuestro <a href="https://github.com/milvus-io/milvus/pulls">código fuente</a>. Ya sea corrigiendo errores, añadiendo funcionalidades o mejorando la documentación, tus contribuciones son bienvenidas.</p></li>
<li><p><strong>Guía de desarrollo</strong>: Consulta nuestra <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guía para colaboradores</a> para conocer las directrices sobre las contribuciones de código.</p></li>
</ul></li>
<li><p>⭐ <strong>Corre la voz</strong>: comparte buenas prácticas e historias de éxito</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
