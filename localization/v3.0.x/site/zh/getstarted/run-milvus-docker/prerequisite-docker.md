---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: 了解安装 Milvus Standalone 之前需要做的准备工作。
title: 安装 Milvus Standalone 的要求
---
<h1 id="Requirements-for-Installing-Milvus-Standalone" class="common-anchor-header">安装 Milvus Standalone 的要求<button data-href="#Requirements-for-Installing-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>在安装 Milvus Standalone 实例之前，请检查您的硬件和软件是否符合要求。</p>
<h2 id="Hardware-requirements" class="common-anchor-header">硬件要求<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>组件</th><th>要求</th><th>建议</th><th>注</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>英特尔第二代酷睿处理器或更高版本</li><li>Apple Silicon</li></ul></td><td><ul><li>独立模式：4核或以上</li><li>集群：8 核或以上</li></ul></td><td></td></tr>
<tr><td>CPU 指令集</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>在 Milvus 中进行向量相似性搜索和索引构建需要 CPU 支持单指令多数据（SIMD）扩展集。请确保 CPU 至少支持所列出的其中一种 SIMD 扩展。有关更多信息，请参阅<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">支持 AVX 的 CPU</a>。</td></tr>
<tr><td>内存</td><td><ul><li>独立服务器：8G</li><li>集群：32G</li></ul></td><td><ul><li>独立部署：16G</li><li>集群：128G</li></ul></td><td>RAM的大小取决于数据量。</td></tr>
<tr><td>硬盘</td><td>SATA 3.0 SSD 或更高版本</td><td>NVMe SSD 或更高版本</td><td>硬盘容量取决于数据量。</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">软件要求<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>操作系统</th><th>软件</th><th>注</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14 或更高版本</td><td>Docker Desktop</td><td>请将 Docker 虚拟机 (VM) 设置为至少使用 2 个虚拟 CPU (vCPU) 和 8 GB 的初始内存。否则，安装可能会失败。<br/>有关更多信息，请参阅《<a href="https://docs.docker.com/desktop/mac/install/">在 Mac 上安装 Docker Desktop</a>》。</td></tr>
<tr><td>Linux 平台</td><td><ul><li>Docker 19.03 或更高版本</li><li>Docker Compose 1.25.1 或更高版本</li></ul></td><td>有关更多信息，请参阅<a href="https://docs.docker.com/engine/install/">《安装 Docker Engine</a>》和《<a href="https://docs.docker.com/compose/install/">安装 Docker Compose</a>》。</td></tr>
<tr><td>已启用 WSL 2 的 Windows</td><td>Docker Desktop</td><td>建议将源代码及其他通过绑定挂载方式放入 Linux 容器中的数据存储在 Linux 文件系统中，而非 Windows 文件系统中。<br/>有关更多信息，请参阅《<a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">在采用 WSL 2 后端的 Windows 上安装 Docker Desktop</a>》。</td></tr>
</tbody>
</table>
<p>当使用 Docker 脚本或 Docker Compose 配置安装 Milvus Standalone 时，系统将自动获取并配置以下依赖项：</p>
<table>
<thead>
<tr><th>软件</th><th>版本</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>请参阅<a href="#Additional-disk-requirements">其他磁盘要求</a>。</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>随 Milvus 捆绑提供</td><td>默认消息队列（嵌入式）；无需安装单独的服务。</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>可选 — 仅当您将消息队列切换为 Pulsar 时才需要；默认不安装。</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">额外的磁盘要求<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>磁盘性能对 etcd 至关重要。强烈建议您使用本地 NVMe SSD。磁盘响应速度过慢可能会导致集群选举频繁发生，最终导致 etcd 服务性能下降。</p>
<p>要测试您的磁盘是否符合要求，请使用<a href="https://github.com/axboe/fio">fio</a>。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>理想情况下，专用于 etcd 的磁盘应达到 500 IOPS 以上，且第 99 百分位 fsync 延迟应低于 10 毫秒。请查阅 etcd<a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">文档</a>以了解更详细的要求。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>如果您的硬件和软件满足上述要求，您可以</p>
<ul>
<li><a href="/docs/zh/install_standalone-docker.md">在 Docker 中运行 Milvus</a></li>
<li><a href="/docs/zh/install_standalone-docker-compose.md">使用 Docker Compose 运行 Milvus</a></li>
</ul>
