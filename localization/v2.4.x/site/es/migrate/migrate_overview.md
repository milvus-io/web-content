---
id: migrate_overview.md
summary: >-
  Este artículo proporciona una visión general de la herramienta
  Milvus-migration, incluyendo las migraciones soportadas, características y
  arquitectura.
title: Visión general de la migración a Milvus
---
<h1 id="Milvus-Migration-Overview" class="common-anchor-header">Visión general de la migración de Milvus<button data-href="#Milvus-Migration-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Reconociendo las diversas necesidades de la base de usuarios, Milvus ha ampliado sus herramientas de migración no sólo para facilitar las actualizaciones desde versiones anteriores de Milvus 1.x, sino también para permitir la integración perfecta de datos de otros sistemas como <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html">Elasticsearch</a> y <a href="https://github.com/facebookresearch/faiss">Faiss</a>. El proyecto <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> está diseñado para salvar las distancias entre estos variados entornos de datos y los últimos avances de la tecnología Milvus, garantizando que pueda aprovechar las funciones mejoradas y el rendimiento sin problemas.</p>
<h2 id="Supported-migrations" class="common-anchor-header">Migraciones compatibles<button data-href="#Supported-migrations" class="anchor-icon" translate="no">
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
    </button></h2><p>La herramienta <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> admite una variedad de rutas de migración para adaptarse a las diferentes necesidades de los usuarios:</p>
<ul>
<li><a href="/docs/es/v2.4.x/es2m.md">Elasticsearch a Milvus 2.x</a>: Permite a los usuarios migrar datos desde entornos Elasticsearch para aprovechar las capacidades de búsqueda vectorial optimizada de Milvus.</li>
<li><a href="/docs/es/v2.4.x/f2m.md">Faiss a Milvus 2.x</a>: Proporcionando soporte experimental para transferir datos desde Faiss, una biblioteca popular para la búsqueda eficiente de similitudes.</li>
<li><a href="/docs/es/v2.4.x/m2m.md">Milvus 1.x a Milvus 2.x</a>: Garantizar que los datos de las versiones anteriores se transfieran sin problemas al marco más reciente.</li>
<li><a href="/docs/es/v2.4.x/from-m2x.md">Milvus 2.3.x a Milvus 2.3.x o superior</a>: Proporcionar una ruta de migración única para los usuarios que ya han migrado a 2.3.x.</li>
</ul>
<h2 id="Features" class="common-anchor-header">Características<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-migration está diseñado con características robustas para manejar diversos escenarios de migración:</p>
<ul>
<li>Múltiples métodos de interacción: Puede realizar migraciones a través de una interfaz de línea de comandos o a través de una API Restful, con flexibilidad en la forma en que se ejecutan las migraciones.</li>
<li>Compatibilidad con varios formatos de archivo y almacenamiento en la nube: La herramienta <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> puede manejar datos almacenados en archivos locales, así como en soluciones de almacenamiento en la nube como S3, OSS y GCP, garantizando una amplia compatibilidad.</li>
<li>Manejo de tipos de datos: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> es capaz de tratar tanto datos vectoriales como campos escalares, lo que la convierte en una opción versátil para diferentes necesidades de migración de datos.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Arquitectura<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>La arquitectura de <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> está estratégicamente diseñada para facilitar procesos eficientes de flujo, análisis sintáctico y escritura de datos, permitiendo una sólida capacidad de migración a través de diversas fuentes de datos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-migration-architecture.jpeg" alt="Milvus-migration architecture" class="doc-image" id="milvus-migration-architecture" />
   </span> <span class="img-wrapper"> <span>Arquitectura de Milvus-migration</span> </span></p>
<p>En la figura anterior</p>
<ul>
<li><strong>Fuente de datos</strong>: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> admite múltiples fuentes de datos, incluyendo Elasticsearch a través de la <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">API de desplazamiento</a>, archivos de datos de almacenamiento local o en la nube, y bases de datos Milvus 1.x. Se accede a ellas y se leen de forma racionalizada para iniciar el proceso de migración.</li>
<li><strong>Canalización de flujos</strong>:<ul>
<li><strong>Proceso de análisis sintáctico</strong>: Los datos de las fuentes se analizan según su formato. Por ejemplo, para una fuente de datos de Elasticsearch, se emplea un analizador de formato de Elasticsearch, mientras que otros formatos utilizan los analizadores respectivos. Este paso es crucial para transformar los datos sin procesar en un formato estructurado que pueda ser procesado posteriormente.</li>
<li><strong>Proceso de conversión</strong>: Tras el análisis sintáctico, los datos se someten a un proceso de conversión en el que se filtran los campos, se convierten los tipos de datos y se ajustan los nombres de las tablas de acuerdo con el esquema Milvus 2.x de destino. Esto garantiza que los datos se ajustan a la estructura y los tipos esperados en Milvus.</li>
</ul></li>
<li><strong>Escritura y carga de datos</strong>:<ul>
<li><strong>Escritura de datos</strong>: Los datos procesados se escriben en archivos intermedios JSON o NumPy, listos para ser cargados en Milvus 2.x.</li>
<li><strong>Cargar datos</strong>: Los datos se cargan finalmente en Milvus 2.x utilizando la operación <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">BulkInsert</a>, que escribe de forma eficiente grandes volúmenes de datos en los sistemas de almacenamiento de Milvus, ya sean basados en la nube o en almacenes de archivos.</li>
</ul></li>
</ul>
<h2 id="Future-plans" class="common-anchor-header">Planes de futuro<button data-href="#Future-plans" class="anchor-icon" translate="no">
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
    </button></h2><p>El equipo de desarrollo se ha comprometido a mejorar <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> con características como las siguientes:</p>
<ul>
<li><strong>Soporte para más fuentes de datos</strong>: Planes para ampliar el soporte a bases de datos y sistemas de archivos adicionales, como Pinecone, Chroma, Qdrant. Si necesita soporte para una fuente de datos específica, envíe su solicitud a través de este <a href="https://github.com/zilliztech/milvus-migration/issues">enlace de incidencia de GitHub</a>.</li>
<li><strong>Simplificación de comandos</strong>: Esfuerzos para simplificar el proceso de comandos para una ejecución más fácil.</li>
<li><strong>SPI parser</strong> / <strong>convertir</strong>: La arquitectura espera incluir herramientas de interfaz de proveedor de servicios (SPI) tanto para el análisis sintáctico como para la conversión. Estas herramientas permiten implementaciones personalizadas que los usuarios pueden conectar al proceso de migración para gestionar formatos de datos específicos o reglas de conversión.</li>
<li><strong>Reanudación del punto de control</strong>: Permite que las migraciones se reanuden desde el último punto de control para mejorar la fiabilidad y la eficacia en caso de interrupciones. Se crearán puntos de guardado para garantizar la integridad de los datos y se almacenarán en bases de datos como SQLite o MySQL para seguir el progreso del proceso de migración.</li>
</ul>
