---
id: milvus_backup_overview.md
summary: >-
  Milvus-Backup es una herramienta que permite a los usuarios realizar copias de
  seguridad y restaurar los datos de Milvus.
title: Copia de seguridad de Milvus
---
<h1 id="Milvus-Backup" class="common-anchor-header">Copia de seguridad de Milvus<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup es una herramienta que permite a los usuarios realizar copias de seguridad y restaurar los datos de Milvus. Proporciona tanto CLI como API para adaptarse a diferentes escenarios de aplicación.</p>
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
    </button></h2><p>Antes de empezar a utilizar Milvus Backup, asegúrese de que</p>
<ul>
<li>El sistema operativo es CentOS 7.5+ o Ubuntu LTS 18.04+,</li>
<li>La versión de Go es 1.20.2 o posterior.</li>
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_backup_architecture.png" alt="Milvus Backup architecture" class="doc-image" id="milvus-backup-architecture" />
   </span> <span class="img-wrapper"> <span>Arquitectura de Milvus Backup</span> </span></p>
<p>Milvus Backup facilita la copia de seguridad y la restauración de metadatos, segmentos y datos en todas las instancias de Milvus. Proporciona interfaces northbound, como CLI, API y módulo Go basado en gRPC, para la manipulación flexible de los procesos de copia de seguridad y restauración.</p>
<p>Milvus Backup lee los metadatos y segmentos de la colección de la instancia Milvus de origen para crear una copia de seguridad. A continuación, copia los datos de la colección de la ruta raíz de la instancia Milvus de origen y guarda los datos copiados en la ruta raíz de la copia de seguridad.</p>
<p>Para restaurar a partir de una copia de seguridad, Milvus Backup crea una nueva colección en la instancia de Milvus de destino basándose en los metadatos de la colección y en la información de los segmentos de la copia de seguridad. A continuación, copia los datos de la copia de seguridad de la ruta raíz de la copia de seguridad a la ruta raíz de la instancia de destino.</p>
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
    </button></h2><p>La siguiente tabla enumera las compatibilidades de copia de seguridad y restauración entre diferentes versiones de Milvus desde Milvus Backup v0.5.7.</p>
<table>
<thead>
<tr><th>Copia de seguridad ↓ / Restauración → Copia de seguridad.</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>No</td><td>No</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Milvus v2.3.x</td><td>No</td><td>No</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Milvus v2.4.x</td><td>No</td><td>No</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Milvus v2.5.x</td><td>No</td><td>No</td><td>No</td><td>Sí</td></tr>
</tbody>
</table>
<h2 id="Latest-release" class="common-anchor-header">Última versión<button data-href="#Latest-release" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.7">v0.5.7</a></li>
</ul>
