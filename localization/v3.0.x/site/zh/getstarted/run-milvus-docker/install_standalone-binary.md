---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: 检查 RPM/DEB 软件包的可用性，并选择一种受支持的 Milvus Standalone 安装方法。
title: 使用 RPM/DEB 软件包安装 Milvus Standalone
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">使用 RPM/DEB 软件包安装 Milvus Standalone<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>本页面介绍了 Milvus Standalone 软件包可用性，并提供了使用已发布的发行版资源进行安装的方法链接。</p>
<h2 id="Check-package-availability" class="common-anchor-header">检查软件包可用性<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 3.0.x 版本（包括<a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.3">v3.0.3</a>）仅发布 Docker Compose 配置文件，不提供 RPM 或 DEB 软件包。请勿为这些版本构建 RPM 或 DEB 下载链接；下载命令中包含软件包文件名并不意味着该资源可供下载。</p>
<p>对于其他版本，请在选择软件包安装方法前，先查看其<a href="https://github.com/milvus-io/milvus/releases">Milvus 发布页面的</a> <strong>“资源</strong>”部分。请仅使用该版本中实际列出的、且与您的系统架构相匹配的软件包。</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">使用 Docker 安装 Milvus Standalone<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>对于 v3.0.3，请选择以下安装方法之一：</p>
<ul>
<li><a href="/docs/zh/install_standalone-docker-compose.md">运行 Milvus with Docker Compose (Linux)</a>，以使用随 v3.0.3 发布的 Compose 配置。</li>
<li><a href="/docs/zh/install_standalone-docker.md">在 Docker 中运行 Milvus</a>Standalone<a href="/docs/zh/install_standalone-docker.md">（Linux）</a>，以使用独立安装脚本。运行脚本前请检查其中的镜像标签。</li>
<li><a href="/docs/zh/install_standalone-windows.md">在 Docker 中运行 Milvus（Windows）</a>，以使用基于 WSL 2 后端和 Linux 容器的 Docker Desktop。</li>
</ul>
<p>安装前请<a href="/docs/zh/prerequisite-docker.md">检查硬件和软件要求</a>。实例运行后，请按照<a href="/docs/zh/quickstart.md">《快速入门</a>》<strong>中的“使用现有 Milvus 服务器</strong>”路径操作，连接至<code translate="no">http://localhost:19530</code> 而不是本地<code translate="no">.db</code> 路径，以插入数据并运行搜索。</p>
