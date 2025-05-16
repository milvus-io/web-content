---
id: prerequisite-docker.md
label: Docker requirements
related_key: Docker
summary: 了解使用 Docker Compose 安装 Milvus 之前的必要准备工作。
title: 使用 Docker Compose 安装 Milvus 的要求
---
<h1 id="Requirements-for-Installing-Milvus-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 安装 Milvus 的要求<button data-href="#Requirements-for-Installing-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>在安装 Milvus 实例之前，请检查您的硬件和软件是否符合要求。</p>
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
<tr><th>组件</th><th>要求</th><th>建议</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>中央处理器</td><td><ul><li>英特尔第二代酷睿处理器或更高版本</li><li>苹果硅</li></ul></td><td><ul><li>独立：4 核或更高</li><li>集群：8 核或更多</li></ul></td><td></td></tr>
<tr><td>CPU 指令集</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Milvus 中的向量相似性搜索和索引建立需要 CPU 支持单指令、多数据（SIMD）扩展集。确保 CPU 至少支持所列 SIMD 扩展之一。有关详细信息，请参阅<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">带 AVX 的 CPU</a>。</td></tr>
<tr><td>内存</td><td><ul><li>单机：8G</li><li>集群：32G</li></ul></td><td><ul><li>单机：16G</li><li>集群： 128G128G</li></ul></td><td>内存大小取决于数据量。</td></tr>
<tr><td>硬盘</td><td>SATA 3.0 固态硬盘或更高版本</td><td>NVMe SSD 或更高版本</td><td>硬盘大小取决于数据量。</td></tr>
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
<tr><th>操作系统</th><th>软件</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14 或更高版本</td><td>Docker 桌面</td><td>将 Docker 虚拟机 (VM) 设置为至少使用 2 个虚拟 CPU (vCPU) 和 8 GB 初始内存。否则，安装可能会失败。<br/>更多信息，请参阅<a href="https://docs.docker.com/desktop/mac/install/">在 Mac 上安装 Docker Desktop</a>。</td></tr>
<tr><td>Linux 平台</td><td><ul><li>Docker 19.03 或更高版本</li><li>Docker Compose 1.25.1 或更高版本</li></ul></td><td>更多信息，请参阅<a href="https://docs.docker.com/engine/install/">安装 Docker Engine</a>和<a href="https://docs.docker.com/compose/install/">安装 Docker Compose</a>。</td></tr>
<tr><td>已启用 WSL 2 的 Windows</td><td>Docker 桌面</td><td><br/>我们建议您将绑定挂载到 Linux 容器中的源代码和其他数据存储在 Linux 文件系统中，而不是 Windows 文件系统中。更多信息，请参见<a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">在 Windows 上安装带有 WSL 2 后端的 Docker Desktop</a>。</td></tr>
</tbody>
</table>
<p>使用 Docker 脚本或 Docker Compose 配置安装 Milvus Standalone 时，将自动获取并配置以下依赖项：</p>
<table>
<thead>
<tr><th>软件</th><th>版本</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>请参阅<a href="#Additional-disk-requirements">其他磁盘要求</a>。</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>脉冲星</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">其他磁盘要求</h3><p>磁盘性能对 etcd 至关重要。强烈建议使用本地 NVMe SSD。较慢的磁盘响应速度可能会导致频繁的群集选举，最终降低 etcd 服务的性能。</p>
<p>要测试磁盘是否合格，请使用<a href="https://github.com/axboe/fio">fio</a>。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>理想情况下，磁盘应达到 500 IOPS 以上，第 99 百分位数 fsync 延迟应低于 10 毫秒。阅读 etcd<a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">文档</a>，了解更多详细要求。</p>
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
    </button></h2><p>如果您的硬件和软件符合上述要求，您可以</p>
<ul>
<li><a href="/docs/zh/v2.4.x/install_standalone-docker.md">在 Docker 中运行 Milvus</a></li>
<li><a href="/docs/zh/v2.4.x/install_standalone-docker-compose.md">使用 Docker Compose 运行 Milvus</a></li>
</ul>
