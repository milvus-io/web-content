---
id: roadmap.md
title: Hoja de ruta de Milvus
related_key: Milvus roadmap
summary: >-
  Explora la hoja de ruta de Milvus en materia de búsqueda, análisis, evolución
  de esquemas, integración con lagos de datos y rendimiento en las versiones 3.0
  y 3.1.
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
    </button></h1><p>Milvus 3.0 combina la recuperación multivectorial, las consultas de tipo SQL, los esquemas flexibles y el acceso a los datos almacenados en un lago de datos. Las próximas fases se basarán en esos cimientos con consultas más completas, modelos de datos más amplios y mejoras en el rendimiento y la escalabilidad. Esta hoja de ruta describe las prioridades para Milvus de código abierto.</p>
<p>Milvus 3.0 está disponible de forma general a partir de <strong>la versión 3.0.1</strong>. Las funcionalidades lanzadas que se indican a continuación se introdujeron en <strong>la versión 3.0.0</strong>; las funciones en fase de prueba y las capacidades opcionales se identifican donde aparecen. La serie <strong>3.0.x</strong> amplía estas capacidades, mientras que la versión <strong>3.1 tiene como fecha de lanzamiento diciembre de 2026</strong>. Las características previstas y las fechas objetivo pueden cambiar a medida que avanza el desarrollo.</p>
<h2 id="Search-and-retrieval" class="common-anchor-header">Búsqueda y recuperación<button data-href="#Search-and-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>La hoja de ruta de la recuperación se centra en combinar más señales de relevancia dentro de Milvus, desde la coincidencia de texto y las representaciones multivectoriales hasta la reclasificación y las facetas de los resultados de búsqueda.</p>
<p><strong>Disponible en la versión 3.0</strong></p>
<ul>
<li><strong>Recuperación multivectorial:</strong> la búsqueda con StructArray es compatible con Muvera y Lemur, y utiliza « <code translate="no">element_filter</code> » para el filtrado a nivel de elemento. Las políticas de coincidencia incluyen « <code translate="no">MATCH_ANY</code> », « <code translate="no">MATCH_ALL</code> », « <code translate="no">MATCH_LEAST</code> », « <code translate="no">MATCH_MOST</code> » y « <code translate="no">MATCH_EXACT</code> ».</li>
<li><strong>Coincidencia y similitud de texto:</strong> los diccionarios personalizados y los sinónimos adaptan la recuperación de texto a las necesidades de la aplicación. El filtrado mediante expresiones regulares admite la coincidencia de patrones, y MinHash permite la detección de casi duplicados.</li>
<li><strong>Reordenación e inferencia:</strong> Milvus 3.0 introduce un conjunto inicial de capacidades de reordenación de Function Chain, junto con el proveedor de inferencia Hugging Face. El resto de capacidades de Function Chain están previstas para la versión 3.0.x.</li>
<li><strong>Agregación de búsquedas:</strong> la agregación de búsquedas proporciona facetas sobre los resultados de búsqueda.</li>
</ul>
<p><strong>Previsto para la versión 3.0.x</strong></p>
<p>Está previsto que la serie 3.0.x incorpore la coincidencia difusa y las estadísticas globales, y que complete la compatibilidad con Function Chain.</p>
<p><strong>Previsto para la versión 3.1</strong></p>
<p>Los planes incluyen la recuperación basada en Grep, una integración más estrecha de la búsqueda de vecino más cercano aproximado (ANN) y el filtrado mediante la fusión de ANN y filtro, así como mejoras en la recuperación dispersa.</p>
<h2 id="Analytics-and-SQL-style-querying" class="common-anchor-header">Análisis y consultas de tipo SQL<button data-href="#Analytics-and-SQL-style-querying" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus está ampliando su motor de consultas para que las aplicaciones puedan ordenar y agregar datos al mismo tiempo que realizan la recuperación. En la siguiente fase se añadirán uniones, vistas materializadas y cálculos personalizados.</p>
<p><strong>Disponible en la versión 3.0</strong></p>
<p>Las consultas y búsquedas admiten la ordenación mediante « <code translate="no">ORDER BY</code> ». La agregación de consultas añade « <code translate="no">GROUP BY</code> » para calcular estadísticas agrupadas.</p>
<p><strong>Previsto para la versión 3.1</strong></p>
<ul>
<li><strong>Consultas más completas:</strong> introducción de uniones, empezando por las semiuniones, y colecciones de vistas materializadas.</li>
<li><strong>Actualizaciones de datos e integridad:</strong> compatibilidad con actualizaciones in situ y deduplicación de claves primarias durante la ingesta.</li>
<li><strong>Iteración de consultas y semántica JSON:</strong> se añade un iterador de consultas con estado, JSON <code translate="no">GROUP BY</code> y semántica NULL para SQL y JSON.</li>
<li><strong>Cálculos personalizados:</strong> compatibilidad con funciones definidas por el usuario (UDF) en Python.</li>
</ul>
<h2 id="Flexible-schema-and-data-types" class="common-anchor-header">Esquema y tipos de datos flexibles<button data-href="#Flexible-schema-and-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>El trabajo sobre el esquema se centra en la evolución de las colecciones existentes y en representar una gama más amplia de datos. Abarca cambios en los campos, estructuras multivectoriales, texto largo y caducidad de entidades.</p>
<p><strong>Disponible en la versión 3.0</strong></p>
<ul>
<li><strong>Cambios de esquema en línea:</strong> las colecciones existentes admiten la adición de campos en línea, incluidos campos vectoriales y de <code translate="no">Array&lt;Struct&gt;</code>. La eliminación de campos está disponible en <strong>versión preliminar</strong> y puede tener limitaciones.</li>
<li><strong>Relleno de datos existentes:</strong> el relleno externo utiliza el conector Spark. El relleno interno aplica una función BM25 o MinHash a una colección y calcula su resultado sobre los datos existentes.</li>
<li><strong>Datos de texto y multivectoriales:</strong> el tipo « <code translate="no">TEXT</code> » almacena texto largo, mientras que «StructArray» admite la recuperación de interacción tardía a través de <code translate="no">MAX_SIM</code>. « <code translate="no">TEXT</code> » requiere la activación de Storage V3.</li>
<li><strong>Valores NULL y caducidad:</strong> Los campos vectoriales aceptan valores NULL, y el tiempo de vida (TTL) a nivel de entidad controla la caducidad.</li>
</ul>
<p><strong>Previsto para la versión 3.0.x</strong></p>
<p>Las mejoras previstas en el esquema amplían la compatibilidad de StructArray con tipos, valores NULL y la adición y eliminación de campos. También añaden compatibilidad con fórmulas moleculares y filtros « <code translate="no">IS NULL</code> » / « <code translate="no">IS NOT NULL</code> » para campos vectoriales.</p>
<p><strong>Previsto para la versión 3.1</strong></p>
<p>Las próximas ampliaciones del modelo de datos incluyen JSON y Struct anidados, claves primarias compuestas, colecciones sin campos vectoriales y vectores dispersos en StructList.</p>
<h2 id="Lake-integration-and-data-versioning" class="common-anchor-header">Integración con lagos de datos y control de versiones de datos<button data-href="#Lake-integration-and-data-versioning" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus está desarrollando una integración más estrecha con el almacenamiento en «data lake» y el procesamiento por lotes. Las colecciones externas permiten acceder a los datos allí donde se encuentran, mientras que las instantáneas sirven de base para el control de versiones de los datos.</p>
<p><strong>Disponible en la versión 3.0</strong></p>
<ul>
<li><strong>Acceso a datos externos:</strong> External Collection es compatible con datos en formatos Lance, Parquet e Iceberg.</li>
<li><strong>Instantáneas e integración por lotes:</strong> las instantáneas capturan una versión de los datos de la colección, y el conector Spark admite flujos de trabajo por lotes.</li>
<li><strong>Base de almacenamiento:</strong> Storage V3 (Loon) ofrece compatibilidad opcional con Vortex y Lance. Está desactivada por defecto y se habilita a través de <code translate="no">common.storage.useLoonFFI</code>. Tanto las instantáneas como <code translate="no">TEXT</code> dependen de ella.</li>
</ul>
<p><strong>Previsto para la versión 3.0.x</strong></p>
<p>Las mejoras previstas permitirán que una instantánea de recopilación de Milvus sirva como recopilación externa. La compatibilidad con tablas externas también se amplía al desglose de JSON, la adición de campos de función y la eliminación de campos.</p>
<p><strong>Previsto para la versión 3.1</strong></p>
<p>Los planes incluyen índices dispersos y escalares basados en S3, junto con la eliminación mediante importación.</p>
<h2 id="Performance-indexing-and-scale" class="common-anchor-header">Rendimiento, indexación y escalabilidad<button data-href="#Performance-indexing-and-scale" class="anchor-icon" translate="no">
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
    </button></h2><p>La hoja de ruta de rendimiento abarca los índices de recuperación, la ejecución de consultas y el crecimiento del clúster. También aborda la recuperación y las consultas que deben leer datos del almacenamiento de objetos.</p>
<p><strong>Disponible en la versión 3.0</strong></p>
<ul>
<li><strong>Indexación dispersa:</strong> la revisión de los índices dispersos introduce SINDI.</li>
<li><strong>Elección de índices:</strong> el índice de paso directo « <code translate="no">FAISS</code> » acepta cadenas de la fábrica de índices Faiss, con opciones que incluyen SVS, Panorama, PQ, IVFPQ y ScaNN. La indexación DiskANN también está disponible para listas incrustadas (EmbList).</li>
<li><strong>Compactación:</strong> «Force Merge» proporciona un control explícito sobre la fusión de segmentos.</li>
</ul>
<p><strong>Previsto para la versión 3.1</strong></p>
<ul>
<li><strong>Consultas con reconocimiento del almacenamiento:</strong> Se añade el empuje de predicados para Vortex, incluyendo la poda a nivel de página y los índices de omisión.</li>
<li><strong>Crecimiento del clúster y multitenencia:</strong> compatibilidad con la división de fragmentos, claves de fragmentación personalizadas y optimizaciones de multitenencia.</li>
<li><strong>Ejecución de consultas e indexación:</strong> desarrollar QueryView, mejorar la compatibilidad con colecciones amplias, la reducción de resultados en flujo y la compatibilidad con múltiples índices.</li>
<li><strong>Fiabilidad de escritura:</strong> compatibilidad con escrituras idempotentes.</li>
<li><strong>Almacenamiento en caché de objetos:</strong> uso de Talon como caché S3 para mejorar la recuperación ante fallos y el rendimiento de las consultas inactivas.</li>
</ul>
<h2 id="Beyond-31" class="common-anchor-header">Más allá de la versión 3.1<button data-href="#Beyond-31" class="anchor-icon" translate="no">
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
    </button></h2><p>El trabajo a más largo plazo incluye el «viaje en el tiempo» y la reversión de instantáneas. Su alcance y fecha de lanzamiento aún están por confirmar.</p>
<h2 id="Help-shape-the-roadmap" class="common-anchor-header">Ayuda a dar forma a la hoja de ruta<button data-href="#Help-shape-the-roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>Comparte las cargas de trabajo, las limitaciones y las solicitudes de funcionalidades que son importantes para tus aplicaciones en <a href="https://github.com/milvus-io/milvus/discussions">GitHub Discussions</a>. Informa de errores a través de <a href="https://github.com/milvus-io/milvus/issues">GitHub Issues</a>.</p>
<p>Para contribuir con código o documentación, empieza por la <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">Guía del colaborador</a>.</p>
