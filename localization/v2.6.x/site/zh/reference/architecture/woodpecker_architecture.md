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
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - 轻便、免维护</h3><p>MemoryBuffer 模式提供了一种简单、轻量级的部署选项，Woodpecker 会在内存中临时缓冲写入的内容，并定期将其刷新到云对象存储服务。元数据使用<strong>etcd</strong>管理，以确保一致性和协调性。这种模式最适合小规模部署或生产环境中批量繁重的工作负载，它们优先考虑的是简单性而不是性能，尤其是在低写入延迟并不重要的情况下。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>啄木鸟内存模式部署</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - 针对低延迟、高耐用性进行了优化</h3><p>QuorumBuffer 模式专为对延迟敏感的高频率读/写工作负载而设计，既要求实时响应能力，又要求较强的容错能力。在这种模式下，啄木鸟作为一个高速写缓冲器，通过三个副本的法定人数写入，确保了强大的一致性和高可用性。</p>
<p>写入一旦复制到三个节点中的至少两个节点，就被认为是成功的，通常在个位数毫秒内完成，之后数据会异步刷新到云对象存储，以实现长期持久性。这种架构最大限度地减少了节点上的状态，消除了对大型本地磁盘卷的需求，并避免了传统的基于法定人数的系统通常需要的复杂的反熵修复。</p>
<p>因此，对于一致性、可用性和快速恢复至关重要的关键任务生产环境来说，精简、稳健的 WAL 层是理想之选。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>啄木鸟内存模式部署</span> </span></p>
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
    </button></h2><p>啄木鸟的云原生架构简化了部署、减少了维护并提高了可靠性。</p>
<h3 id="Simplified-infrastructure-management" class="common-anchor-header">简化基础设施管理</h3><ul>
<li><strong>无需本地存储管理：</strong>无需管理磁盘卷、RAID 或磁盘故障。</li>
<li><strong>降低硬件依赖性：</strong>无需进行硬件配置和监控；耐用性和可用性由云对象存储处理。</li>
<li><strong>简化容量规划：</strong>云对象存储可自动扩展存储容量，无需手动预测。</li>
</ul>
<h3 id="Simplified-deployment" class="common-anchor-header">简化部署</h3><ul>
<li><strong>内存缓冲模式：</strong>使用最少的资源并与云存储集成，是开发和小规模生产的理想选择。</li>
<li><strong>QuorumBuffer 模式：</strong>提供企业级的可靠性，而不像传统的分布式存储那样复杂。</li>
</ul>
<h2 id="Cost-efficiency-and-resource-optimization" class="common-anchor-header">成本效益和资源优化<button data-href="#Cost-efficiency-and-resource-optimization" class="anchor-icon" translate="no">
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
<li><strong>降低内存使用率：</strong>与传统代理相比，高效缓冲减少了内存需求。</li>
<li><strong>弹性扩展：</strong>即用即付型云存储可避免过度配置。</li>
<li><strong>减少基础设施开销：</strong>更少的组件意味着更低的部署和维护成本。</li>
</ul>
<h3 id="Storage-cost-advantages" class="common-anchor-header">存储成本优势</h3><ul>
<li><strong>分层存储：</strong>自动将数据迁移到具有成本效益的云存储层，以便长期保留。</li>
<li><strong>压缩和重复数据删除：</strong>内置功能无需额外操作符即可降低存储成本。</li>
<li><strong>无复制开销：</strong>耐用性由云存储管理，无需手动复制管理。</li>
</ul>
<h2 id="High-availability-and-disaster-recovery" class="common-anchor-header">高可用性和灾难恢复<button data-href="#High-availability-and-disaster-recovery" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Simplified-fault-tolerance" class="common-anchor-header">简化容错</h3><ul>
<li><strong>云原生耐用性：</strong>利用云提供商的 11-nines（99.999999999%）耐用性保证。</li>
<li><strong>快速恢复：</strong>最小化本地状态可实现快速节点替换和集群恢复。</li>
<li><strong>跨区域弹性：</strong>利用云存储功能支持跨区域复制。</li>
</ul>
<h3 id="Operational-resilience" class="common-anchor-header">操作符弹性</h3><ul>
<li><strong>单点故障更少：</strong>减少组件数量，降低故障风险。</li>
<li><strong>自动故障切换：</strong>云存储冗余简化了故障切换。</li>
<li><strong>简化备份：</strong>集成的云存储可提供自动备份和版本管理。</li>
</ul>
<h2 id="Development-and-operational-experience" class="common-anchor-header">开发和操作符<button data-href="#Development-and-operational-experience" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Improved-development-workflow" class="common-anchor-header">改进开发工作流程</h3><ul>
<li><strong>更快的环境设置：</strong>最小化依赖性，加快开发和测试。</li>
<li><strong>一致的架构：</strong>在开发、暂存和生产过程中采用统一的设计。</li>
<li><strong>云原生集成：</strong>与云服务和容器协调无缝兼容。</li>
</ul>
<h3 id="Enhanced-production-operations" class="common-anchor-header">增强生产操作符</h3><ul>
<li><strong>可预测的性能：</strong>不同部署规模和配置下的结果一致。</li>
<li><strong>简化升级：</strong>无状态设计可实现最短停机时间的滚动更新。</li>
<li><strong>资源可预测性：</strong>与传统消息代理相比，资源使用更稳定。</li>
</ul>
<p>对于支持关键任务 RAG、人工智能 Agents 和低延迟搜索工作负载的向量数据库来说，这些操作符优势是革命性的。从复杂的消息代理堆栈过渡到 Woodpecker 的简化架构，不仅提升了性能，还大大减轻了开发和基础设施团队的操作负担。</p>
<p>随着云基础架构随着 S3 Express One Zone 等创新技术的不断发展，啄木鸟的架构使企业能够自动从这些进步中获益，而无需进行重大操作变更或系统重新设计。</p>
