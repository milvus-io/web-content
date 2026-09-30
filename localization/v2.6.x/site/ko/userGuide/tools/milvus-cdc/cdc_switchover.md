---
id: cdc_switchover.md
summary: Milvus CDC를 사용하여 주 클러스터와 대기 클러스터 간에 계획된 전환을 수행하는 방법을 알아보세요.
title: 전환
---
<h1 id="Switchover" class="common-anchor-header">전환<button data-href="#Switchover" class="anchor-icon" translate="no">
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
    </button></h1><p>전환은 데이터 손실 없이 기본-대기 방향을 변경합니다. 현재 기본 클러스터에 계속 연결할 수 있거나 유지 관리를 위해 트래픽을 이동해야 할 때 이 기능을 사용하세요.</p>
<p>이 가이드에서는 현재 토폴로지를 가정합니다:</p>
<pre><code translate="no" class="language-text">cluster-a (primary)  -&gt;  cluster-b (standby)
<button class="copy-code-btn"></button></code></pre>
<p>전환 후 토폴로지는 다음과 같습니다:</p>
<pre><code translate="no" class="language-text">cluster-b (primary)  -&gt;  cluster-a (standby)
<button class="copy-code-btn"></button></code></pre>
<h2 id="When-to-Use-Switchover" class="common-anchor-header">전환 사용 시기<button data-href="#When-to-Use-Switchover" class="anchor-icon" translate="no">
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
    </button></h2><p>전환 사용 시기</p>
<ul>
<li>현재 기본 토폴로지에서 유지 관리를 수행하는 경우.</li>
<li>프라이머리는 부분적으로 성능이 저하되었지만 여전히 요청에 응답할 수 있습니다.</li>
<li>RPO = 0이 필요하며 데이터 손실을 허용할 수 없습니다.</li>
</ul>
<p>기본 계정을 완전히 사용할 수 없는 경우에는 전환을 사용하지 마세요. 이 경우 <a href="/docs/ko/v2.6.x/cdc_failover.md">장애 조치를</a> 사용하세요.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">시작하기 전에<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>시작하기 전에 다음 사항을 확인하세요:</p>
<ul>
<li>두 클러스터 모두 연결할 수 있습니다.</li>
<li>CDC 복제가 정상입니다.</li>
<li>CDC 지연이 복구 시간 목표에 비해 충분히 낮습니다.</li>
<li>역할 변경 중에 애플리케이션 쓰기를 일시 중지하거나 다시 시도할 수 있습니다.</li>
<li>새 토폴로지 구성을 준비했습니다.</li>
</ul>
<p>전환 시 데이터 손실은 없지만 작업 시간은 복제해야 할 데이터의 양에 따라 달라집니다.</p>
<h2 id="Build-the-New-Topology" class="common-anchor-header">새 토폴로지 구축<button data-href="#Build-the-New-Topology" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">cluster-b</code> 이 소스가 되고 <code translate="no">cluster-a</code> 이 대상이 되는 전체 교체 구성을 만듭니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># If you followed Set Up CDC Replication, cluster A is the original source cluster,</span>
<span class="hljs-comment"># and cluster B is the original target cluster.</span>
cluster_a_id = source_cluster_id
cluster_a_addr = source_cluster_addr
cluster_a_client_addr = source_client_addr
cluster_a_token = source_cluster_token
cluster_a_pchannels = source_cluster_pchannels

cluster_b_id = target_cluster_id
cluster_b_addr = target_cluster_addr
cluster_b_client_addr = target_client_addr
cluster_b_token = target_cluster_token
cluster_b_pchannels = target_cluster_pchannels

switchover_config = {
    <span class="hljs-string">&quot;clusters&quot;</span>: [
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: cluster_a_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: cluster_a_addr,
                <span class="hljs-string">&quot;token&quot;</span>: cluster_a_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: cluster_a_pchannels,
        },
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: cluster_b_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: cluster_b_addr,
                <span class="hljs-string">&quot;token&quot;</span>: cluster_b_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: cluster_b_pchannels,
        },
    ],
    <span class="hljs-string">&quot;cross_cluster_topology&quot;</span>: [
        {
            <span class="hljs-string">&quot;source_cluster_id&quot;</span>: cluster_b_id,
            <span class="hljs-string">&quot;target_cluster_id&quot;</span>: cluster_a_id,
        }
    ],
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-the-New-Topology" class="common-anchor-header">새 토폴로지 적용<button data-href="#Apply-the-New-Topology" class="anchor-icon" translate="no">
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
    </button></h2><p>두 클러스터에 동일한 구성을 적용합니다. 요청을 먼저 현재 프라이머리로 보낸 다음 대기 상태로 보냅니다. 나중에 다시 전환하는 경우 <code translate="no">cluster-b</code> 이 현재 기본값이므로 순서를 반대로 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client_a = MilvusClient(uri=cluster_a_client_addr, token=cluster_a_token)
client_b = MilvusClient(uri=cluster_b_client_addr, token=cluster_b_token)

<span class="hljs-keyword">try</span>:
    client_a.update_replicate_configuration(**switchover_config)
    client_b.update_replicate_configuration(**switchover_config)
<span class="hljs-keyword">finally</span>:
    client_a.close()
    client_b.close()
<button class="copy-code-btn"></button></code></pre>
<p>이전 프라이머리는 대기 상태로 강등되고 새 쓰기를 거부합니다. 이전 대기 상태는 남은 복제된 데이터를 기다렸다가 스스로를 프라이머리로 승격시킨 다음 쓰기를 수락합니다.</p>
<p>일시적인 네트워크 또는 서비스 오류로 인해 요청이 실패하면 동일한 구성으로 다시 시도하세요.</p>
<h2 id="Redirect-Application-Traffic" class="common-anchor-header">애플리케이션 트래픽 리디렉션<button data-href="#Redirect-Application-Traffic" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">cluster-b</code> 이 기본이 된 후</p>
<ol>
<li>쓰기 트래픽을 <code translate="no">cluster-b</code> 으로 리디렉션합니다.</li>
<li><code translate="no">cluster-b</code> 에서 읽기 및 쓰기가 성공하는지 확인합니다.</li>
<li><code translate="no">cluster-a</code> 에서 더 이상 애플리케이션 쓰기가 수신되지 않는지 확인합니다.</li>
<li><code translate="no">cluster-b</code> 에서 <code translate="no">cluster-a</code> 으로의 복제를 계속 모니터링합니다.</li>
</ol>
<h2 id="Verify-the-Result" class="common-anchor-header">결과 확인<button data-href="#Verify-the-Result" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">cluster-b</code> 이 새 기본 계정으로 사용 중이고 데이터가 일관되게 유지되는지 확인합니다. 일반적인 확인 사항은 다음과 같습니다:</p>
<ul>
<li>중요한 컬렉션의 행 수를 비교합니다.</li>
<li>두 클러스터에서 알려진 기본 키를 쿼리합니다.</li>
<li>새 기본 및 이전 대기에서 대표 검색을 실행합니다.</li>
<li><code translate="no">cluster-b</code> 에 작은 쓰기를 실행하고 <code translate="no">cluster-a</code> 에 복제되었는지 확인합니다.</li>
</ul>
<h2 id="Switch-Back" class="common-anchor-header">다시 전환하기<button data-href="#Switch-Back" class="anchor-icon" translate="no">
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
    </button></h2><p>나중에 다시 전환하려면 원래 토폴로지를 다시 적용합니다:</p>
<pre><code translate="no" class="language-text">cluster-a -&gt; cluster-b
<button class="copy-code-btn"></button></code></pre>
<p>동일한 전환 플로우를 사용합니다. 다시 전환하기 전에 현재 프라이머리에 연결할 수 있고 복제가 정상인지 확인하세요.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Does-switchover-lose-data" class="common-anchor-header">전환하면 데이터가 손실되나요?<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요. 전환은 대기 상태가 기본 상태가 되기 전에 나머지 데이터가 복제될 때까지 기다립니다.</p>
<h3 id="Do-I-need-to-stop-application-writes" class="common-anchor-header">애플리케이션 쓰기를 중지해야 하나요?<button data-href="#Do-I-need-to-stop-application-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>역할 변경 중에는 쓰기를 일시 중지하거나 쓰기를 다시 시도할 수 있도록 설정해야 합니다. 강등된 후 이전 프라이머리로 전송된 쓰기는 거부됩니다.</p>
<h3 id="Why-does-switchover-take-longer-than-expected" class="common-anchor-header">전환이 예상보다 오래 걸리는 이유는 무엇인가요?<button data-href="#Why-does-switchover-take-longer-than-expected" class="anchor-icon" translate="no">
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
    </button></h3><p>가장 일반적인 이유는 CDC 지연 때문입니다. 새 기본값은 남은 데이터를 수신해야 RPO = 0으로 안전하게 인계할 수 있습니다.</p>
<h3 id="Can-I-retry-a-failed-switchover-request" class="common-anchor-header">실패한 전환 요청을 다시 시도할 수 있나요?<button data-href="#Can-I-retry-a-failed-switchover-request" class="anchor-icon" translate="no">
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
    </button></h3><p>예. 동일한 대상 토폴로지로 다시 시도하세요.</p>
<h3 id="What-happens-to-the-old-primary" class="common-anchor-header">이전 기본값은 어떻게 되나요?<button data-href="#What-happens-to-the-old-primary" class="anchor-icon" translate="no">
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
    </button></h3><p>이전 프라이머리는 대기 상태가 됩니다. 더 이상 애플리케이션 쓰기를 받을 수 없습니다.</p>
