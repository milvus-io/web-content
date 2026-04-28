---
id: snapshots.md
title: InstantáneasCompatible with Milvus 3.0.x
summary: >-
  Utilice instantáneas para capturar los estados de las colecciones en un
  momento dado para realizar reversiones, versiones y pruebas.
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">Instantáneas<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>Una instantánea es una imagen puntual de una colección Milvus, ideal para retrocesos rápidos, versiones y pruebas. Captura el estado de la colección en un momento específico y almacena sólo los metadatos y los archivos de manifiesto, como el esquema, los índices y los archivos de datos vectoriales (binlogs), para un almacenamiento y restauración eficientes.</p>
<div class="alert note">
<p>Las instantáneas son imágenes puntuales y rápidas de los datos, adecuadas para realizar reversiones rápidas o pruebas<strong>(de días a semanas</strong>). Al mismo tiempo, las copias de seguridad son copias independientes y completas que se almacenan por separado para la recuperación de desastres a largo plazo<strong>(de semanas a años</strong>) y para una mejor protección contra fallos totales de almacenamiento.</p>
<p>Para crear copias de seguridad, consulte <a href="/docs/es/milvus_backup_overview.md">Milvus Backup</a>.</p>
</div>
<h2 id="Snapshot-anatomy" class="common-anchor-header">Anatomía de las instantáneas<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus implementa una arquitectura de instantáneas basada en manifiestos para una captura, almacenamiento y restauración eficientes de datos en un momento dado sin duplicar los datos vectoriales reales. La arquitectura separa la gestión de metadatos del almacenamiento de datos físicos, permitiendo instantáneas ligeras que hacen referencia a archivos de segmentos existentes en el almacenamiento de objetos.</p>
<p>Cuando crea una instantánea para una colección, Milvus recopila lo siguiente:</p>
<ul>
<li><p><strong>Metadatos de la instantánea</strong></p>
<p>Proporciona información básica para crear la instantánea, incluido el nombre y la descripción de la instantánea, el ID de la colección de destino y el punto temporal en el que se crea la instantánea.</p></li>
<li><p><strong>Descripción de la colección</strong></p>
<p>Contiene la descripción de la colección de destino, incluida su definición de esquema, información de partición y propiedades.</p></li>
<li><p><strong>Información del índice</strong></p>
<p>Almacena los metadatos del índice y las rutas a los archivos de índice.</p></li>
<li><p><strong>Datos de segmento</strong></p>
<p>Captura los archivos de datos vectoriales (binlogs), los registros de borrado (deltalogs) y los archivos de índice.</p></li>
</ul>
<p>Entre la información anterior, Milvus genera un archivo de manifiesto Apache Avro para cada segmento y almacena los metadatos de la instantánea, la descripción de la colección, la información del índice y las rutas a los archivos de manifiesto en un archivo JSON. El siguiente diagrama ilustra la estructura de carpetas de instantáneas.</p>
<pre><code translate="no" class="language-text">snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
<button class="copy-code-btn"></button></code></pre>
<p>La creación de una instantánea suele tardar milisegundos, y su restauración tarda entre segundos y minutos, dependiendo del volumen de datos.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">Impactos y consideraciones sobre el almacenamiento<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que Milvus hace referencia a un segmento o archivo de índice en una instantánea, no recoge esos archivos de la basura a menos que usted elimine la instantánea. Las instantáneas consumen almacenamiento proporcional al tamaño de las colecciones de destino, y los costes de almacenamiento de objetos se aplican a la retención de instantáneas. En casos extremos, una sola instantánea puede incluso duplicar sus costes de almacenamiento de objetos. Se recomienda</p>
<ul>
<li>Elimine regularmente las instantáneas antiguas para ahorrar almacenamiento.</li>
<li>Utilice nombres y descripciones descriptivos para futuras referencias.</li>
<li>Verifique siempre los resultados de la creación y restauración de instantáneas.</li>
<li>Realice un seguimiento de las marcas de tiempo de creación de instantáneas, el uso de almacenamiento y los ID de trabajo de restauración para la supervisión y la solución de problemas.</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">Límites y restricciones<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Las instantáneas se vuelven inmutables tras su creación.</li>
<li>Sólo puede restaurar una instantánea en una nueva colección dentro del mismo clúster que la original.</li>
<li>Las colecciones restauradas conservan el mismo esquema, número de fragmentos y número de particiones.</li>
<li>Los datos históricos restaurados pueden entrar en conflicto con las políticas TTL. Se recomienda desactivar TTL o ajustar la configuración de TTL antes de crear instantáneas.</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">Más información<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><a href="/docs/es/manage-snapshots.md">Gestión de Instantáneas</a> - crear, listar, restaurar y eliminar instantáneas.</li>
<li><a href="/docs/es/snapshot-use-cases.md">Casos de uso de instantáneas</a> - patrones y flujos de trabajo comunes.</li>
<li><a href="/docs/es/milvus_backup_overview.md">Milvus Backup</a> - copia de seguridad y restauración a largo plazo entre clusters.</li>
</ul>
