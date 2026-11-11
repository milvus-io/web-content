---
id: milvus_backup_overview.md
summary: >-
  Milvus Backup ofrece flujos de trabajo mediante la interfaz de línea de
  comandos (CLI) y la API HTTP para realizar copias de seguridad y restaurar
  datos de Milvus.
title: Milvus Backup
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus Backup<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup realiza copias de seguridad de las colecciones de Milvus y las restaura en la misma instancia o en otra. Ofrece una interfaz de línea de comandos (CLI) y una API HTTP.</p>
<p>Milvus Backup <strong>0.6.0</strong> incorpora copias de seguridad de instantáneas para Milvus 3.0, un esquema de configuración v2 con versiones y ajustes preestablecidos específicos para crear copias de seguridad. La compatibilidad oficial con la copia de seguridad y la restauración para Milvus 3.0 comienza con <strong>la versión Milvus 3.0.1</strong>.</p>
<h2 id="Choose-your-guide" class="common-anchor-header">Elige tu guía<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup tiene su propia versión de lanzamiento, independiente de la versión del servidor Milvus. Las guías actuales abarcan la serie 0.6.x; la sección de Backup 0.5.x conserva los flujos de trabajo anteriores. Las etiquetas del título de la página identifican la serie de Backup aplicable. Las instrucciones de instalación y los ejemplos utilizan una versión específica validada. Comprueba por separado la compatibilidad entre el servidor Milvus de origen y el de destino.</p>
<table>
<thead>
<tr><th>Tu tarea</th><th>Guía</th></tr>
</thead>
<tbody>
<tr><td>Seguir utilizando Backup 0.5.x</td><td><a href="/docs/es/milvus_backup_cli.md">Comandos</a> y <a href="/docs/es/milvus_backup_api.md">API HTTP</a> de la versión<a href="/docs/es/milvus_backup_cli.md">0.5.x</a>, con ejemplos basados en la versión 0.5.16</td></tr>
<tr><td>Actualizar una instalación existente de Backup</td><td><a href="/docs/es/milvus_backup_upgrade.md">Actualizar de la versión 0.5.x a la 0.6.x</a></td></tr>
<tr><td>Instalar y utilizar Backup 0.6.x</td><td><a href="/docs/es/milvus_backup_0_6_cli.md">comandos y configuración</a>, o <a href="/docs/es/milvus_backup_0_6_api.md">API HTTP</a></td></tr>
<tr><td>Realizar una copia de seguridad y restaurar una instantánea en Milvus 3.0.1 o posterior</td><td><a href="/docs/es/snapshot-backup-and-restore.md">Copia de seguridad y restauración de instantáneas en una misma instancia</a></td></tr>
</tbody>
</table>
<p>Las guías existentes <a href="/docs/es/single-instance-backup-and-restore.md">sobre la misma instancia</a>, <a href="/docs/es/shared-bucket-backup-and-restore.md">el depósito compartido</a>, <a href="/docs/es/cross-bucket-backup-and-restore.md">entre depósitos</a> y <a href="/docs/es/multi-storage-backup-and-restore.md">entre almacenamientos</a> conservan la configuración y los comandos de la versión 0.5.16. Sus ejemplos no cambian de versión cuando se publica una nueva versión de Backup.</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Utiliza un binario de Backup y ejemplos de configuración de la misma versión. La <a href="/docs/es/milvus_backup_cli.md#Obtain-Milvus-Backup">guía 0.5.x</a> se basa en la versión 0.5.16; la <a href="/docs/es/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">guía actual</a> se basa en la versión 0.6.0.</li>
<li>Proporcione acceso de red a Milvus, a su almacenamiento y al destino de la copia de seguridad. Las operaciones de instantáneas también requieren que el servidor Milvus pueda acceder al almacén de copias de seguridad.</li>
<li>Comprueba la compatibilidad del servidor a continuación. Go solo es necesario cuando se compila desde el código fuente: versión 1.25 o posterior para Backup 0.5.16, y 1.26 o posterior para 0.6.0.</li>
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup components" class="doc-image" id="milvus-backup-components" /> 
   <span>Componentes de Milvus Backup</span>
  
 </span></p>
<p>Milvus Backup coordina los metadatos de las colecciones y las copias de seguridad de los datos entre la instancia de Milvus y el almacenamiento de copias de seguridad. En la versión 0.6.0 de Backup, el formato seleccionado determina cómo se exportan y restauran los datos de las colecciones:</p>
<table>
<thead>
<tr><th>Formato</th><th>Comportamiento de copia de seguridad y restauración</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>Milvus exporta un paquete de instantáneas de la colección. Milvus Backup registra la información del paquete, y la restauración importa el paquete a través de Milvus. El servidor gestiona la estructura de datos resultante.</td></tr>
<tr><td><code translate="no">binlog</code></td><td>Milvus Backup copia los archivos de datos y los metadatos de la colección; a continuación, recrea las colecciones e importa los datos de la copia de seguridad durante la restauración.</td></tr>
<tr><td><code translate="no">auto</code></td><td>Selecciona el formato en función de las características compatibles con el servidor. En Milvus 3.0, selecciona «instantánea».</td></tr>
</tbody>
</table>
<p>Un directorio de copia de seguridad contiene metadatos y los archivos requeridos por su formato. Conserva el directorio completo al archivarlo o moverlo. No des por sentado que una copia de seguridad de instantánea utiliza la estructura del directorio binlog.</p>
<p>En la versión 0.6.0, los ajustes preestablecidos de « <code translate="no">create --for</code> » configuran opciones específicas para cada finalidad: « <code translate="no">clone</code> » mantiene el formato elegido, mientras que « <code translate="no">archive</code> » y « <code translate="no">secondary</code> » requieren binlog. Un servidor secundario también requiere una topología de replicación configurada; la migración ordinaria entre instancias no requiere un servidor secundario. Véase <a href="/docs/es/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">«Elegir un formato de copia de seguridad o una finalidad</a>».</p>
<p>La versión 0.6.0 de Backup omite las colecciones externas durante la copia de seguridad. El hecho de que una tarea se haya completado con éxito no implica que se hayan incluido los datos de las colecciones externas.</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">Matriz de compatibilidad<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Backup 0.6.0 no requiere actualizar todas las instalaciones de Milvus a la versión 3.0.</strong> Es compatible con flujos de trabajo de binlog en las versiones compatibles de Milvus 2.x. La compatibilidad oficial con copias de seguridad y restauraciones para la línea Milvus 3.0 comienza con <strong>Milvus 3.0.1</strong>; el ejemplo de instantánea utiliza esa línea.</p>
<p><a href="/docs/es/milvus_backup_upgrade.md">La guía de actualización</a> se ha validado con Backup 0.5.16 y 0.6.0 en Milvus 2.6.11, incluida la restauración de una copia de seguridad de la versión 0.5.16 mediante la versión 0.6.0. Esta combinación probada no amplía la matriz que figura a continuación.</p>
<p>Las versiones de origen y destino de Milvus deben formar un par compatible. El mero hecho de que la versión de destino sea más reciente no garantiza la compatibilidad. La siguiente matriz de compatibilidad histórica abarca Milvus 2.x, tal y como se documenta desde Milvus Backup 0.5.7; no establece la compatibilidad para la migración de 2.x a 3.0.</p>
<table>
<thead>
<tr><th>Copia de seguridad desde ↓ / Restauración a →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>No</td><td>No</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Milvus v2.3.x</td><td>No</td><td>No</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Milvus v2.4.x</td><td>No</td><td>No</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Milvus v2.5.x</td><td>No</td><td>No</td><td>No</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Milvus v2.6.x</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Sí</td></tr>
</tbody>
</table>
<p>Antes de realizar una migración entre versiones, comprueba la versión de origen, la versión de destino y el formato de copia de seguridad con la <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">documentación de la versión de Backup</a>. Estas guías no amplían la matriz heredada a combinaciones que no figuran en la lista.</p>
<h2 id="Release-notes" class="common-anchor-header">Notas de la versión<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0</a></li>
</ul>
