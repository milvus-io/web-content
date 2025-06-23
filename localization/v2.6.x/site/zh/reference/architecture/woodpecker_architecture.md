---
id: woodpecker_architecture.md
title: 啄木鸟
summary: 啄木鸟是 Milvus 2.6 中的一个云原生 WAL 系统。它采用零磁盘架构和两种部署模式，可在对象存储上提供高吞吐量、低操作符开销和无缝可扩展性。
---
<h1 id="Woodpecker" class="common-anchor-header">啄木鸟<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 2.6 中，Woodpecker 使用专门构建的云原生先写日志（WAL）系统取代了 Kafka 和 Pulsar。Woodpecker 专为对象存储而设计，可简化操作、最大化吞吐量并轻松扩展。</p>
<p>啄木鸟的设计目标</p>
<ul>
<li><p>云环境中的最高吞吐量</p></li>
<li><p>持久、仅附加日志记录，实现可靠恢复</p></li>
<li><p>操作符最少，无需本地磁盘或外部代理</p></li>
</ul>
<h2 id="Zero-disk-architecture" class="common-anchor-header">零磁盘架构<button data-href="#Zero-disk-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker 的核心创新是其零磁盘架构：</p>
<ul>
<li>所有日志数据都存储在云对象存储（如亚马逊 S3、谷歌云存储或阿里巴巴操作系统）</li>
<li>通过分布式键值存储<strong>（</strong>如<strong>etcd）</strong>管理元数据</li>
<li>核心操作不依赖本地磁盘</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_layers.png" alt="woodpecker layers" class="doc-image" id="woodpecker-layers" />
   </span> <span class="img-wrapper"> <span>啄木鸟层</span> </span></p>
<h2 id="Architecture-components" class="common-anchor-header">架构组件<button data-href="#Architecture-components" class="anchor-icon" translate="no">
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
    </button></h2><p>标准的 Woodpecker 部署包括以下组件：</p>
<ul>
<li><strong>客户端</strong>：用于发出读写请求的接口层</li>
<li><strong>日志存储</strong>：管理高速写缓冲、异步上传到存储和日志压缩</li>
<li><strong>存储后端</strong>：支持可扩展的低成本存储服务，如 S3、GCS 和 EFS 等文件系统</li>
<li><strong>Etcd</strong>：跨分布式节点存储元数据并协调日志状态</li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">部署模式<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>啄木鸟提供两种部署模式，以满足您的特定需求：</p>
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - 轻便、免维护</h3><p>MemoryBuffer 模式提供了一种简单、轻量级的部署选项，Woodpecker 在内存中临时缓冲写入的内容，并定期将其刷新到云对象存储服务。元数据使用<strong>etcd</strong>管理，以确保一致性和协调性。这种模式最适合小规模部署或生产环境中批量繁重的工作负载，它们优先考虑的是简单性而不是性能，尤其是在低写入延迟并不重要的情况下。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>啄木鸟内存模式部署</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - 针对低延迟、高耐用性进行了优化</h3><p>QuorumBuffer 模式专为对延迟敏感的高频率读/写工作负载而设计，既要求实时响应，又要求较强的容错能力。在这种模式下，啄木鸟作为一个高速写缓冲器，通过三个副本的法定人数写入，确保了强大的一致性和高可用性。</p>
<p>写入一旦复制到三个节点中的至少两个，即被视为成功，通常在个位数毫秒内完成，之后数据会异步刷新到云对象存储，以获得长期持久性。这种架构最大限度地减少了节点上的状态，消除了对大型本地磁盘卷的需求，并避免了传统的基于法定人数的系统通常需要的复杂的反熵修复。</p>
<p>因此，对于一致性、可用性和快速恢复至关重要的关键任务生产环境来说，精简、稳健的 WAL 层是理想之选。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_quorumbuffer_mode_deployment.png" alt="woodpecker quorum mode deployment" class="doc-image" id="woodpecker-quorum-mode-deployment" />
   </span> <span class="img-wrapper"> <span>啄木鸟法定人数模式部署</span> </span></p>
<h2 id="Performance-benchmarks" class="common-anchor-header">性能基准<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>我们运行了全面的基准测试，以评估 Woodpecker 在单节点、单客户端、单日志流设置下的性能。与 Kafka 和 Pulsar 相比，结果令人印象深刻：</p>
<table>
<thead>
<tr><th>系统</th><th>卡夫卡</th><th>脉冲星</th><th>WP Minio</th><th>WP Local</th><th>WP S3</th></tr>
</thead>
<tbody>
<tr><td>吞吐量</td><td>每秒 129.96MB</td><td>107MB/s</td><td>71MB/s</td><td>450MB/s</td><td>750MB/s</td></tr>
<tr><td>延迟</td><td>58 毫秒</td><td>35 毫秒</td><td>184 毫秒</td><td>1.8ms</td><td>166ms</td></tr>
</tbody>
</table>
<p>我们在测试机上测量了不同存储后端理论吞吐量的极限，以供参考：</p>
<ul>
<li>MinIO: ~110 MB/s</li>
<li>本地文件系统：600-750 MB/s</li>
<li>亚马逊 S3（单个 EC2 实例）：高达 1.1 GB/s</li>
</ul>
<p>值得注意的是，啄木鸟对每个后端都持续实现了最大可能吞吐量的 60-80%，这对于中间件来说是一个非凡的效率水平。</p>
<h3 id="Key-performance-insights" class="common-anchor-header">关键性能洞察</h3><ul>
<li>本地文件系统模式：啄木鸟实现了 450 MB/s 的速度，比 Kafka 快 3.5 倍，比 Pulsar 快 4.2 倍，超低延迟仅为 1.8 毫秒，是高性能单节点部署的理想选择。</li>
<li>云存储模式（S3）：当直接写入 S3 时，啄木鸟的速度达到 750 MB/s（约为 S3 理论极限的 68%），比 Kafka 高 5.8 倍，比 Pulsar 高 7 倍。虽然延迟较高（166 毫秒），但这种设置为面向批处理的工作负载提供了出色的吞吐量。</li>
<li>对象存储模式（MinIO）：即使使用 MinIO，啄木鸟的吞吐量也达到了 71 MB/s，约为 MinIO 容量的 65%。这一性能可与 Kafka 和 Pulsar 相媲美，但对资源的要求要低得多。</li>
</ul>
<p>Woodpecker 特别针对并发、大容量写入进行了优化，在这种情况下，保持顺序至关重要。这些结果仅反映了开发的早期阶段--I/O 合并、智能缓冲和预取方面的持续优化有望使性能更接近理论极限。</p>
<h2 id="Operational-benefits" class="common-anchor-header">操作符优势<button data-href="#Operational-benefits" class="anchor-icon" translate="no">
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
    </button></h2><p>啄木鸟的云原生架构具有显著的操作优势：</p>
<ul>
<li><strong>零本地存储管理</strong>：消除磁盘卷管理、RAID 配置和硬件故障</li>
<li><strong>自动扩展</strong>：存储随云对象存储扩展，无需容量规划</li>
<li><strong>成本效益</strong>：随用随付存储，自动分层和压缩</li>
<li><strong>高可用性</strong>：利用云提供商的 11-9 级耐用性和快速恢复功能</li>
<li><strong>简化部署</strong>：两种部署模式（MemoryBuffer/QuorumBuffer）可满足不同的操作符需求</li>
<li><strong>开发人员友好</strong>型：环境设置更快，所有环境的架构保持一致</li>
</ul>
<p>这些优势使 Woodpecker 对关键任务 RAG、人工智能 Agents 和低延迟搜索工作负载特别有价值，在这些负载中，操作符的简易性与性能同等重要。</p>
