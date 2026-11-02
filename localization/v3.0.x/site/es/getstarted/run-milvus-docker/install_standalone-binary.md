---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: >-
  Comprueba la disponibilidad del paquete RPM/DEB y elige un método de
  instalación de Milvus Standalone compatible.
title: Instalar Milvus Standalone con el paquete RPM/DEB
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">Instalar Milvus Standalone con el paquete RPM/DEB<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>En esta página se explica la disponibilidad de los paquetes de Milvus Standalone y se incluyen enlaces a los métodos de instalación con los recursos de las versiones publicadas.</p>
<h2 id="Check-package-availability" class="common-anchor-header">Comprobar la disponibilidad de los paquetes<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
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
    </button></h2><p>Las versiones de Milvus 3.0.x, incluida <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.3">la v3.0.3</a>, publican archivos de configuración de Docker Compose, pero no paquetes RPM ni DEB. No crees URL de descarga de RPM ni DEB para estas versiones; el hecho de incluir el nombre de un paquete en un comando de descarga no hace que ese recurso esté disponible.</p>
<p>Para otra versión, consulta la sección <strong>«Recursos»</strong> de su <a href="https://github.com/milvus-io/milvus/releases">página de lanzamiento de Milvus</a> antes de elegir un método de instalación de paquetes. Utiliza únicamente un paquete que figure realmente en la lista para esa versión y para la arquitectura de tu sistema.</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">Instalar Milvus Standalone con Docker<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Para la v3.0.3, elige uno de estos métodos de instalación:</p>
<ul>
<li><a href="/docs/es/install_standalone-docker-compose.md">Ejecuta Milvus con Docker Compose (Linux)</a> para utilizar la configuración de Compose publicada con la versión 3.0.3.</li>
<li><a href="/docs/es/install_standalone-docker.md">Ejecuta Milvus en Docker (Linux)</a> para utilizar el script de instalación independiente. Comprueba la etiqueta de la imagen en el script antes de ejecutarlo.</li>
<li><a href="/docs/es/install_standalone-windows.md">Ejecuta Milvus en Docker (Windows)</a> para utilizar Docker Desktop con el backend WSL 2 y contenedores Linux.</li>
</ul>
<p>Comprueba los <a href="/docs/es/prerequisite-docker.md">requisitos de hardware y software</a> antes de la instalación. Una vez que la instancia esté en funcionamiento, sigue la ruta <strong>«Utilizar un servidor Milvus existente»</strong> en <a href="/docs/es/quickstart.md">la Guía de inicio rápido</a>, conectándote a <code translate="no">http://localhost:19530</code> en lugar de a la ruta local <code translate="no">.db</code>, para introducir datos y realizar una búsqueda.</p>
