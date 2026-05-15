---
id: milvus_cdc_overview.md
summary: Milvus CDC 可将数据更改从一个 Milvus 集群复制到另一个集群，以实现主备灾难恢复。
title: Milvus CDC
---
<h1 id="Milvus-CDC" class="common-anchor-header">Milvus CDC<button data-href="#Milvus-CDC" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus CDC（变更数据捕获）可将数据变更从一个 Milvus 集群复制到另一个。您可以使用 CDC 为 Milvus 构建主备灾难恢复拓扑。</p>
<p>在主备拓扑中，一个群集作为主群集并接受写入。一个或多个备用群集持续接收来自主群集的更改，并可提供读取流量。当主群集不可用或需要维护时，可将服务流量切换到备用群集。</p>
<h2 id="Architecture" class="common-anchor-header">架构<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>典型的拓扑结构包括</p>
<ul>
<li><strong>主群集</strong>：复制的源群集。它接受读取和写入。</li>
<li><strong>备用群集</strong>：复制的目标群集。它接收主群集的更改，并在保持备用群集时只读。</li>
<li><strong>CDC 节点</strong>：从当前主集群向备用集群转发 WAL 更改的 Milvus 组件。在切换或故障切换后可能成为主集群的每个集群上部署 CDC。</li>
<li><strong>复制拓扑</strong>：配置的源到目标关系，如群集-a -&gt; 群集-b。以下是拓扑示意图。<span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" /><span>CDC 工作流程</span> </span></li>
</ul>
<h3 id="Supported-Topologies" class="common-anchor-header">支持的拓扑<button data-href="#Supported-Topologies" class="anchor-icon" translate="no">
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
    </button></h3><p>最常见的 CDC 部署是一主一备：</p>
<pre><code translate="no" class="language-text">Application writes
      |
      v
Primary cluster A  -- CDC replication --&gt;  Standby cluster B
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC 也支持单主多备拓扑结构：</p>
<pre><code translate="no" class="language-text">Primary cluster A  -- CDC replication --&gt;  Standby cluster B
                  \-- CDC replication --&gt;  Standby cluster C
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC 不支持多主或主动-主动部署，即两个或更多集群同时接受写流量。</p>
<h2 id="Primary-and-Standby-Behavior" class="common-anchor-header">主用和备用行为<button data-href="#Primary-and-Standby-Behavior" class="anchor-icon" translate="no">
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
<tr><th>角色</th><th>读取</th><th>写入</th><th>复制行为</th></tr>
</thead>
<tbody>
<tr><td>主用</td><td>是</td><td>是</td><td>向备用群集发送更改</td></tr>
<tr><td>备用</td><td>是</td><td>是</td><td>从主群集接收复制的更改</td></tr>
</tbody>
</table>
<p>备用群集拒绝直接写入请求。这可以防止 "大脑分裂"，并保持复制拓扑的一致性。</p>
<h2 id="Planned-Switchover-vs-Failover" class="common-anchor-header">计划切换与故障切换<button data-href="#Planned-Switchover-vs-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC 提供两种方法将服务流量从当前主集群转移到备用集群。</p>
<table>
<thead>
<tr><th>操作符</th><th>在以下情况下使用</th><th>数据丢失</th><th>预期行为</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="/docs/zh/cdc_switchover.md">切换</a></strong></td><td>当前主运行仍可到达，或正在进行计划维护</td><td>RPO = 0</td><td>角色转换前等待剩余的复制数据</td></tr>
<tr><td><strong><a href="/docs/zh/cdc_failover.md">故障切换</a></strong></td><td>当前主服务器不可用，无法快速恢复</td><td>可能</td><td>立即升级备用，以便恢复写入</td></tr>
</tbody>
</table>
<p>只要当前主服务器仍能响应，就使用切换。只有当恢复可用性比等待原主设备更重要时，才使用故障切换。</p>
<h2 id="CDC-Lag-and-Why-It-Matters" class="common-anchor-header">CDC 滞后及其重要性<button data-href="#CDC-Lag-and-Why-It-Matters" class="anchor-icon" translate="no">
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
    </button></h2><p>CDC 滞后是指已写入主群集但尚未应用到备用群集的数据量。</p>
<p>CDC 滞后会影响两种恢复选项：</p>
<ul>
<li>在切换过程中，较低的 CDC 滞后通常意味着操作符完成得更快。</li>
<li>在故障切换期间，CDC 滞后表示如果原主群集不可用，可能会丢失的数据窗口。</li>
</ul>
<p>应持续监控 CDC 滞后，并将其保持在尽可能低的水平。<a href="/docs/zh/set_up_cdc_replication.md">设置 CDC 复制</a>页面包含一个估算 CDC 滞后的 PromQL 示例。</p>
<h2 id="Limitations" class="common-anchor-header">限制<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC 目前有以下限制：</p>
<ul>
<li>只支持<strong>单主</strong>拓扑。</li>
<li>它<strong>不</strong>支持主动-主动或多主写入。</li>
<li>备用集群可以为读取流量提供服务，但在备用期间拒绝直接写入。</li>
<li>故障切换可能会丢失已写入旧主集群但尚未复制到备用集群的数据。</li>
<li>配置的<code translate="no">pchannels</code> 必须与每个群集的实际通道布局相匹配。</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">常见问题<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-a-standby-cluster-serve-queries" class="common-anchor-header">备用群集可以提供查询服务吗？<button data-href="#Can-a-standby-cluster-serve-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>可以。备用群集可以提供读取流量。在成为主集群之前，它不能接受写入。</p>
<h3 id="Does-Milvus-CDC-support-active-active-writes" class="common-anchor-header">Milvus CDC 是否支持主动-主动写入？<button data-href="#Does-Milvus-CDC-support-active-active-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>不支持。Milvus CDC 是为单主拓扑设计的。同时向多个集群写入会导致大脑分裂和数据分流。</p>
<h3 id="Does-switchover-lose-data" class="common-anchor-header">切换会丢失数据吗？<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>不会。切换等待剩余数据复制完毕后，备用数据才会成为主数据。</p>
<h3 id="Does-failover-lose-data" class="common-anchor-header">故障切换会丢失数据吗？<button data-href="#Does-failover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>会。任何写入旧主设备但尚未复制到备用设备的数据都可能丢失。</p>
<h3 id="How-much-data-can-be-lost-during-failover" class="common-anchor-header">故障切换期间会丢失多少数据？<button data-href="#How-much-data-can-be-lost-during-failover" class="anchor-icon" translate="no">
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
    </button></h3><p>潜在的数据丢失会受到主备不可用时 CDC 滞后的限制。</p>
