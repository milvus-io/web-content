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
    </button></h2><p><strong>Hoja de ruta de Milvus</strong></p>
<p>¡Bienvenido a la hoja de ruta de Milvus!</p>
<p>Estamos introduciendo Milvus en una nueva era: la base de datos multimodal de próxima generación, que abarca <strong>desde los datos estructurados hasta los no estructurados</strong>, <strong>desde la recuperación en tiempo real hasta el análisis fuera de línea</strong>, y <strong>desde el rendimiento de un solo clúster hasta una arquitectura de lago de datos global</strong>.</p>
<p>Esta hoja de ruta describe los objetivos principales de <strong>Milvus v2.6 (en curso)</strong>, <strong>Milvus v3.0 (prevista para finales de 2026)</strong> y <strong>Milvus v3.1 (desarrollo a largo plazo)</strong>, junto con el plan de evolución de <strong>Vector Lake (lago de datos / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (en curso)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Calendario: Mediados de 2025 - Finales de 2025</strong></p>
<p>Enfoque: <strong>Actualización del modelo de datos</strong>, <strong>refactorización de la arquitectura de streaming</strong>, <strong>creación de capacidades de hot/cold tiering</strong> y lanzamiento del <strong>prototipo Vector Lake (v0.1)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">Principales aspectos destacados<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header"><strong>Actualización del modelo de datos</strong></h4><ul>
<li><p>Introducir un tipo de datos unificado <strong>Tensor / StructList</strong> para soportar estructuras de incrustación multivectoriales, permitiendo la compatibilidad con <em>ColBERT</em>, <em>CoLQwen</em>, <em>vídeo</em> y <em>vectores multimodales</em>.</p></li>
<li><p>Añade compatibilidad con <strong>datos geográficos</strong>, incluidos puntos, regiones e indexación espacial (basada en <em>libspatial</em>), para ampliar los casos de uso en LBS y GIS.</p></li>
<li><p>Soporte para <strong>Timestamp con</strong> tipo de datos <strong>Timezone</strong>.</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header"><strong>🔹 Refactorización de la arquitectura StreamNode</strong></h4><ul>
<li><p>Reescribir la tubería de ingestión de streaming para optimizar las escrituras incrementales y el cálculo en tiempo real.</p></li>
<li><p>Mejorar significativamente el rendimiento y la estabilidad de la concurrencia, sentando las bases para el procesamiento unificado en tiempo real y fuera de línea.</p></li>
<li><p>Introducción de un nuevo motor de cola de mensajes: <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header"><strong>Arquitectura de almacenamiento y escalonamiento en caliente/frío (StorageV2</strong>)</h4><ul>
<li><p>Admite formatos de almacenamiento duales: <strong>Parquet</strong> y <strong>Vortex</strong>, mejorando la concurrencia y la eficiencia de la memoria.</p></li>
<li><p>Implemente almacenamiento por niveles con separación automática de datos calientes/fríos y programación inteligente.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>Prototipo de lago vectorial (v0.1)</strong></h4><ul>
<li><p>Integrarse con <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> a través de FFI, permitiendo la evolución de esquemas offline y consultas KNN.</p></li>
<li><p>Proporcionar visualización de datos multimodal y una demo de Spark ETL, estableciendo la arquitectura fundacional del lago de datos.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0 (Prevista para principios de 2026)<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Calendario: Finales de 2025 - Principios de 2026</strong></p>
<p>Enfoque: Mejoras integrales en la <strong>experiencia de búsqueda</strong>, <strong>flexibilidad de esquemas</strong> y <strong>compatibilidad con datos no estructurados</strong>, junto con el lanzamiento de <strong>Vector Lake (v0.2)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">Principales aspectos destacados<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header"><strong>🔹 Revisión de la experiencia de búsqueda</strong></h4><ul>
<li><p>Introducir la búsqueda por similitud <strong>More Like This (MLT)</strong> con soporte para búsquedas con posición o ejemplos negativos.</p></li>
<li><p>Añade funciones de búsqueda semántica como <strong>resaltado</strong> y <strong>potenciación</strong>.</p></li>
<li><p>Admite <strong>diccionarios personalizados</strong> y <strong>tablas de sinónimos</strong>, lo que permite definir reglas léxicas y semánticas en la capa Analyzer.</p></li>
<li><p>Introducir capacidades de <strong>agregación</strong> para las consultas.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header"><strong>Gestión de recursos y multiarrendamiento</strong></h4><ul>
<li><p>Habilitar la eliminación multiarrendatario, las estadísticas y el hot/cold tiering.</p></li>
<li><p>Mejorar el aislamiento de recursos y las estrategias de programación para soportar millones de tablas en un único clúster.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header"><strong>Mejoras de esquemas y claves primarias</strong></h4><ul>
<li><p>Implementación de <strong>la deduplicación global de claves primarias (Global PK Dedup)</strong> para garantizar la coherencia y unicidad de los datos.</p></li>
<li><p>Admite la <strong>gestión flexible de esquemas</strong> (adición/eliminación de columnas, relleno de copias de seguridad).</p></li>
<li><p>Permitir <strong>valores NULL</strong> en campos vectoriales.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header"><strong>Tipos de datos no estructurados ampliados (BLOB / Texto)</strong></h4><ul>
<li><p>Introduce el <strong>tipo</strong> BLOB, que proporciona almacenamiento nativo y referenciación para datos binarios como archivos, imágenes y vídeos.</p></li>
<li><p>Introduce el <strong>tipo TEXTO</strong>, que proporciona capacidades mejoradas de búsqueda de texto completo y basadas en contenido.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header"><strong>Capacidades de nivel empresarial</strong></h4><ul>
<li><p>Admite <strong>copias de seguridad y recuperación basadas en instantáneas</strong>.</p></li>
<li><p>Proporcionar <strong>rastreo de extremo a extremo</strong> y <strong>registro de auditoría</strong>.</p></li>
<li><p>Implementar <strong>alta disponibilidad (HA) activa y en espera</strong> en despliegues multiclúster.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header"><strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>Soporta <strong>almacenamiento TEXT / BLOB</strong> y <strong>gestión de snapshots multi-versión</strong>.</p></li>
<li><p>Integrar Spark para indexación offline, clustering, deduplicación y tareas de reducción dimensional.</p></li>
<li><p>Entregar <strong>demos de consulta en frío ChatPDF y benchmark offline</strong>.</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">Milvus v3.1 (visión a largo plazo)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Calendario: Mediados de 2026</strong></p>
<p>Enfoque: <strong>Funciones definidas por el usuario (UDF)</strong>, <strong>integración de computación distribuida</strong>, <strong>optimización de consultas escalares</strong>, <strong>fragmentación dinámica</strong> y lanzamiento oficial de <strong>Vector Lake (v1.0)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">Principales aspectos destacados<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>UDF y ecosistema de computación distribuida</strong></h4><ul>
<li><p>Soporta <strong>Funciones Definidas por el Usuario (UDFs)</strong>, permitiendo a los desarrolladores inyectar lógica personalizada en los flujos de trabajo de recuperación y computación.</p></li>
<li><p>Profunda integración con <strong>Ray Dataset / Daft</strong> para la ejecución distribuida de UDF y el procesamiento multimodal de datos.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header"><strong>🔹 Consulta escalar y evolución del formato local</strong></h4><ul>
<li><p>Optimizar el rendimiento de filtrado y agregación para campos escalares.</p></li>
<li><p>Mejorar la evaluación de expresiones y la ejecución acelerada por índices.</p></li>
<li><p>Admite <strong>actualizaciones in situ</strong> para formatos de archivo locales.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header"><strong>Capacidades de búsqueda avanzada</strong></h4><ul>
<li><p>Añade las siguientes funciones: Consultas <strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong> y <strong>Fuzzy match</strong>.</p></li>
<li><p>Mejore la recuperación de texto con soporte para:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header"><strong>Separación dinámica y escalabilidad</strong></h4><ul>
<li><p>Habilite <strong>la división automática de shards</strong> y el <strong>equilibrio de carga</strong> para un escalado sin fisuras.</p></li>
<li><p>Mejore la <strong>creación de índices globales</strong> y garantice el <strong>rendimiento de la búsqueda distribuida</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>Profunda integración con <strong>Ray / Daft / PyTorch</strong> para soportar UDFs distribuidos y casos de uso de Context Engineering.</p></li>
<li><p>Proporcionar <strong>demos RAG (Retrieval-Augmented Generation)</strong> <strong>e importación desde tablas Iceberg</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Co-construyendo el futuro de Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
<p>Invitamos cordialmente a todos los miembros de la comunidad a ayudar a dar forma a la base de datos multimodal de próxima generación:</p>
<ul>
<li><p>💬 <strong>Comparta sus comentarios</strong>: Proponer nuevas características o ideas de optimización</p></li>
<li><p>🐛 <strong>Informar de problemas</strong>: Presenta errores a través de GitHub Issues</p></li>
<li><p>🔧 <strong>Contribuir con código</strong>: Envía PRs y ayuda a construir las características principales</p>
<ul>
<li><p><strong>Pull requests</strong>: Contribuye directamente a nuestra <a href="https://github.com/milvus-io/milvus/pulls">base de código</a>. Ya sea corrigiendo errores, añadiendo características o mejorando la documentación, tus contribuciones son bienvenidas.</p></li>
<li><p><strong>Guía de desarrollo</strong>: Consulta nuestra <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guía del colaborador</a> para conocer las directrices sobre las contribuciones al código.</p></li>
</ul></li>
<li><p><strong>⭐ Corre la voz</strong>: Comparte las mejores prácticas y casos de éxito.</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
