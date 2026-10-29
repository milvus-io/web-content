---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: >-
  Check RPM/DEB package availability and choose a supported Milvus Standalone
  installation method.
title: Install Milvus Standalone with RPM/DEB Package
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">Install Milvus Standalone with RPM/DEB Package<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>This page explains package availability for Milvus Standalone and links to installation methods with published release assets.</p>
<h2 id="Check-package-availability" class="common-anchor-header">Check package availability<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 3.0.x releases, including <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.3">v3.0.3</a>, publish Docker Compose configuration files but no RPM or DEB packages. Do not construct RPM or DEB download URLs for these releases; a package filename in a download command does not make that asset available.</p>
<p>For another release, check the <strong>Assets</strong> section of its <a href="https://github.com/milvus-io/milvus/releases">Milvus release page</a> before choosing a package installation method. Use only a package actually listed for that release and your system architecture.</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">Install Milvus Standalone with Docker<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>For v3.0.3, choose one of these installation methods:</p>
<ul>
<li><a href="/docs/install_standalone-docker-compose.md">Run Milvus with Docker Compose (Linux)</a> to use the Compose configuration published with v3.0.3.</li>
<li><a href="/docs/install_standalone-docker.md">Run Milvus in Docker (Linux)</a> to use the standalone installation script. Check the image tag in the script before running it.</li>
<li><a href="/docs/install_standalone-windows.md">Run Milvus in Docker (Windows)</a> to use Docker Desktop with the WSL 2 backend and Linux containers.</li>
</ul>
<p>Check the <a href="/docs/prerequisite-docker.md">hardware and software requirements</a> before installation. After the instance is running, follow the <strong>Use an existing Milvus server</strong> path in <a href="/docs/quickstart.md">Quickstart</a>, connecting to <code translate="no">http://localhost:19530</code> instead of a local <code translate="no">.db</code> path, to insert data and run a search.</p>
