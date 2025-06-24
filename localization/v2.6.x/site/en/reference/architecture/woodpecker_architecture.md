---
id: woodpecker_architecture.md
title: Woodpecker
summary: >-
  Woodpecker is a cloud-native WAL system in Milvus 2.6. With a zero-disk
  architecture and two deployment modes, it delivers high throughput, low
  operational overhead, and seamless scalability on object storage.
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus 2.6, Woodpecker replaces Kafka and Pulsar with a purpose-built, cloud-native write-ahead log (WAL) system. Engineered for object storage, Woodpecker simplifies operations, maximizes throughput, and scales effortlessly.</p>
<p>Woodpecker’s design goals:</p>
<ul>
<li><p>Highest throughput in cloud environments</p></li>
<li><p>Durable, append-only logging for reliable recovery</p></li>
<li><p>Minimal operational overhead with no local disks or external brokers</p></li>
</ul>
<h2 id="Zero-disk-architecture" class="common-anchor-header">Zero-disk architecture<button data-href="#Zero-disk-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker’s core innovation is its zero-disk architecture:</p>
<ul>
<li>All log data stored in cloud object storage (such as Amazon S3, Google Cloud Storage, or Alibaba OS)</li>
<li>Metadata managed through distributed key-value stores like <strong>etcd</strong></li>
<li>No local disk dependencies for core operations</li>
</ul>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/woodpecker_layers.png" alt="woodpecker layers" class="doc-image" id="woodpecker-layers" />
    <span>woodpecker layers</span>
  </span>
</p>
<h2 id="Architecture-components" class="common-anchor-header">Architecture components<button data-href="#Architecture-components" class="anchor-icon" translate="no">
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
    </button></h2><p>A standard Woodpecker deployment includes the following components:</p>
<ul>
<li><strong>Client</strong>: Interface layer for issuing read and write requests</li>
<li><strong>LogStore</strong>: Manages high-speed write buffering, asynchronous uploads to storage, and log compaction</li>
<li><strong>Storage backend</strong>: Supports scalable, low-cost storage services such as S3, GCS, and file systems like EFS</li>
<li><strong>Etcd</strong>: Stores metadata and coordinates log state across distributed nodes</li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">Deployment modes<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker offers two deployment modes to match your specific needs:</p>
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - Lightweight and maintenance-free</h3><p>MemoryBuffer mode provides a simple and lightweight deployment option where Woodpecker’s embedded client temporarily buffers incoming writes in memory and periodically flushes them to a cloud object storage service. In this mode, the memory buffer is embedded directly into the client, enabling efficient batching before flushing to S3. Metadata is managed using <strong>etcd</strong> to ensure consistency and coordination. This mode is best suited for batch-heavy workloads in smaller-scale deployments or production environments that prioritize simplicity over performance, especially when low write latency is not critical.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
    <span>woodpecker memory mode deployment</span>
  </span>
</p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - Optimized for low-latency, high-durability</h3><p>QuorumBuffer mode is designed for latency-sensitive, high-frequency read/write workloads requiring both real-time responsiveness and strong fault tolerance. In this mode, Woodpecker’s client interacts with a three-replica quorum system to provide high-speed write buffering, ensuring strong consistency and high availability through distributed consensus.</p>
<p>A write is considered successful once the client successfully replicates data to at least two of the three quorum nodes, typically completing within single-digit milliseconds, after which the data is asynchronously flushed to cloud object storage for long-term durability. This architecture minimizes on-node state, eliminates the need for large local disk volumes, and avoids complex anti-entropy repairs often required in traditional quorum-based systems.</p>
<p>The result is a streamlined, robust WAL layer ideal for mission-critical production environments where consistency, availability, and fast recovery are essential.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/woodpecker_quorumbuffer_mode_deployment.png" alt="woodpecker quorum mode deployment" class="doc-image" id="woodpecker-quorum-mode-deployment" />
    <span>woodpecker quorum mode deployment</span>
  </span>
</p>
<h2 id="Performance-benchmarks" class="common-anchor-header">Performance benchmarks<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>We ran comprehensive benchmarks to evaluate Woodpecker’s performance in a single-node, single-client, single-log-stream setup. The results were impressive when compared to Kafka and Pulsar:</p>
<table>
<thead>
<tr><th>System</th><th>Kafka</th><th>Pulsar</th><th>WP Minio</th><th>WP Local</th><th>WP S3</th></tr>
</thead>
<tbody>
<tr><td>Throughput</td><td>129.96MB/s</td><td>107MB/s</td><td>71MB/s</td><td>450MB/s</td><td>750MB/s</td></tr>
<tr><td>latency</td><td>58ms</td><td>35ms</td><td>184ms</td><td>1.8ms</td><td>166ms</td></tr>
</tbody>
</table>
<p>For context, we measured the theoretical throughput limits of different storage backends on our test machine:</p>
<ul>
<li>MinIO: ~110 MB/s</li>
<li>Local file system: 600–750 MB/s</li>
<li>Amazon S3 (single EC2 instance): up to 1.1 GB/s</li>
</ul>
<p>Remarkably, Woodpecker consistently achieved 60-80% of the maximum possible throughput for each backend—an exceptional efficiency level for middleware.</p>
<h3 id="Key-performance-insights" class="common-anchor-header">Key performance insights</h3><ul>
<li>Local File System Mode: Woodpecker achieved 450 MB/s—3.5× faster than Kafka and 4.2× faster than Pulsar—with ultra-low latency at just 1.8 ms, making it ideal for high-performance single-node deployments.</li>
<li>Cloud Storage Mode (S3): When writing directly to S3, Woodpecker reached 750 MB/s (about 68% of S3’s theoretical limit), 5.8× higher than Kafka and 7× higher than Pulsar. While latency is higher (166 ms), this setup provides exceptional throughput for batch-oriented workloads.</li>
<li>Object Storage Mode (MinIO): Even with MinIO, Woodpecker achieved 71 MB/s—around 65% of MinIO’s capacity. This performance is comparable to Kafka and Pulsar but with significantly lower resource requirements.</li>
</ul>
<p>Woodpecker is particularly optimized for concurrent, high-volume writes where maintaining order is critical. And these results only reflect the early stages of development—ongoing optimizations in I/O merging, intelligent buffering, and prefetching are expected to push performance even closer to theoretical limits.</p>
<h2 id="Operational-benefits" class="common-anchor-header">Operational benefits<button data-href="#Operational-benefits" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker’s cloud-native architecture delivers significant operational advantages:</p>
<ul>
<li><strong>Zero local storage management</strong>: Eliminates disk volume management, RAID configuration, and hardware failures</li>
<li><strong>Automatic scaling</strong>: Storage scales with cloud object storage without capacity planning</li>
<li><strong>Cost efficiency</strong>: Pay-as-you-go storage with automatic tiering and compression</li>
<li><strong>High availability</strong>: Leverages cloud providers’ 11-nines durability with fast recovery</li>
<li><strong>Simplified deployment</strong>: Two deployment modes (MemoryBuffer/QuorumBuffer) match different operational needs</li>
<li><strong>Developer-friendly</strong>: Faster environment setup and consistent architecture across all environments</li>
</ul>
<p>These advantages make Woodpecker particularly valuable for mission-critical RAG, AI agents, and low-latency search workloads where operational simplicity is as important as performance.</p>
