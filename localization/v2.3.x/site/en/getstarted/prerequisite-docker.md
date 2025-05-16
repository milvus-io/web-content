---
id: prerequisite-docker.md
label: Install with Docker Compose
related_key: Docker
summary: Learn the necessary preparations before installing Milvus with Docker Compose.
title: Environment Checklist for Milvus with Docker Compose
---
<h1 id="Environment-Checklist-for-Milvus-with-Docker-Compose" class="common-anchor-header">Environment Checklist for Milvus with Docker Compose<button data-href="#Environment-Checklist-for-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Before you install Milvus, check your hardware and software to see if they meet the requirements.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Hardware requirements<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
<tr><th>Component</th><th>Requirement</th><th>Recommendation</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>Intel 2nd Gen Core CPU or higher</li><li>Apple Silicon</li></ul></td><td><ul><li>Standalone: 4 core or more</li><li>Cluster: 8 core or more</li></ul></td><td></td></tr>
<tr><td>CPU instruction set</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Vector similarity search and index building within Milvus require CPU’s support of single instruction, multiple data (SIMD) extension sets. Ensure that the CPU supports at least one of the SIMD extensions listed. See <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPUs with AVX</a> for more information.</td></tr>
<tr><td>RAM</td><td><ul><li>Standalone: 8G</li><li>Cluster: 32G</li></ul></td><td><ul><li>Standalone: 16G</li><li>Cluster: 128G</li></ul></td><td>The size of RAM depends on the data volume.</td></tr>
<tr><td>Hard drive</td><td>SATA 3.0 SSD or higher</td><td>NVMe SSD or higher</td><td>The size of hard drive depends on the data volume.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">Software requirements<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<tr><th>Operating system</th><th>Software</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14 or later</td><td>Docker Desktop</td><td>Set the Docker virtual machine (VM) to use a minimum of 2 virtual CPUs (vCPUs) and 8 GB of initial memory. Otherwise, installation might fail. <br/>See <a href="https://docs.docker.com/desktop/mac/install/">Install Docker Desktop on Mac</a> for more information.</td></tr>
<tr><td>Linux platforms</td><td><ul><li>Docker 19.03 or later</li><li>Docker Compose 1.25.1 or later</li></ul></td><td>See <a href="https://docs.docker.com/engine/install/">Install Docker Engine</a> and <a href="https://docs.docker.com/compose/install/">Install Docker Compose</a> for more information.</td></tr>
<tr><td>Windows with WSL 2 enabled</td><td>Docker Desktop</td><td>We recommend that you store source code and other data bind-mounted into Linux containers in the Linux file system instead of the Windows file system.<br/>See <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">Install Docker Desktop on Windows with WSL 2 backend</a> for more information.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Software</th><th>Version</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>See <a href="#Additional-disk-requirements">additional disk requirements</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Additional disk requirements</h3><p>Disk performance is critical to etcd. It is highly recommended that you use local NVMe SSDs. Slower disk response may cause frequent cluster elections that will eventually degrade the etcd service.</p>
<p>To test if your disk is qualified, use <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Ideally, your disk should reach over 500  IOPS and below 10ms for the 99th percentile fsync latency. Read the etcd <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">Docs</a> for more detailed requirements.</p>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>If your hardware and software meet the requirements, you can:</p>
<ul>
<li><a href="/docs/v2.3.x/install_standalone-docker.md">Install Milvus standalone with Docker Compose</a></li>
</ul></li>
<li><p>See <a href="/docs/v2.3.x/system_configuration.md">System Configuration</a> for parameters you can set while installing Milvus.</p></li>
</ul>
