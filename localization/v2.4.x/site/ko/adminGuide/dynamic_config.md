---
id: dynamic_config.md
related_key: configure
summary: Milvus의 동적 구성에 대해 알아보세요.
title: 즉석에서 Milvus 구성
---
<h1 id="Configure-Milvus-on-the-Fly" class="common-anchor-header">즉석에서 Milvus 구성하기<button data-href="#Configure-Milvus-on-the-Fly" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서는 일부 구성을 즉석에서 변경할 수 있습니다.</p>
<h2 id="Before-you-start" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 사항을 확인해야 합니다.</p>
<ul>
<li>Birdwatcher가 설치되어 있습니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/birdwatcher_install_guides.md">Birdwatcher 설치를</a> 참조하세요,</li>
<li>etcdctl이 설치되어 있습니다. 자세한 내용은 <a href="https://etcd.io/docs/v3.5/dev-guide/interacting_v3/">etcd와 상호 작용하기를</a> 참조하세요.</li>
<li>Python 클라이언트와 같은 다른 etcd 클라이언트가 설치되어 있습니다.</li>
</ul>
<div class="alert note">
<ul>
<li>이 가이드의 예제에서는 <code translate="no">proxy.minPasswordLength</code> 값을 <code translate="no">8</code> 으로 변경합니다. <a href="/docs/ko/v2.4.x/dynamic_config.md#Applicable-configuration-items">해당</a> 키를 <a href="/docs/ko/v2.4.x/dynamic_config.md#Applicable-configuration-items">적용 가능한 구성 항목에</a> 나열된 해당 키로 바꿀 수 있습니다.</li>
<li>이 가이드의 예제에서는 Milvus의 루트 경로가 <code translate="no">by-dev</code> 로 가정합니다. 모든 구성은 <code translate="no">by-dev/config</code> 경로 아래에 나열됩니다. Milvus 루트 경로는 설치 방식에 따라 다릅니다. 헬름 차트를 사용하여 설치한 인스턴스의 경우 기본 루트 경로는 <code translate="no">by-dev</code> 이다. 루트 경로를 모르는 경우 <a href="/docs/ko/v2.4.x/birdwatcher_usage_guides.md#Connect-to-etcd">etcd에 연결을</a> 참조한다.</li>
</ul>
</div>
<h2 id="Change-configurations" class="common-anchor-header">구성 변경하기<button data-href="#Change-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 <code translate="no">proxy.minPasswordLength</code> 는 기본적으로 <code translate="no">6</code> 로 설정되어 있다. 이 값을 변경하려면 다음과 같이 하면 됩니다:</p>
<pre><code translate="no" class="language-shell">$ etcdctl put by-dev/config/proxy/minPasswordLength 8
<span class="hljs-comment"># or</span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,set config-etcd --key by-dev/config/proxy/minPasswordLength --value 8&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음과 같이 구성을 확인할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> <span class="hljs-keyword">by</span>-dev/config/proxy/minPasswordLength
<button class="copy-code-btn"></button></code></pre>
<h2 id="Roll-back-configurations" class="common-anchor-header">구성 롤백<button data-href="#Roll-back-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서는 변경된 값이 더 이상 적용되지 않는 경우 구성을 롤백할 수도 있습니다.</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">del</span> by-dev/config/proxy/minPasswordLength 
<span class="hljs-comment"># or </span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,remove config-etcd --key by-dev/config/proxy/minPasswordLength&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 다음과 같이 구성을 확인할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> <span class="hljs-keyword">by</span>-dev/config/proxy/minPasswordLength
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-configurations" class="common-anchor-header">구성 보기<button data-href="#View-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>특정 설정 항목의 값을 보는 대신 모든 항목을 나열할 수도 있습니다.</p>
<pre><code translate="no" class="language-shell">$ etcdctl <span class="hljs-keyword">get</span> --prefix <span class="hljs-keyword">by</span>-dev/config
<span class="hljs-meta"># or</span>
$ birdwatcher -olc <span class="hljs-string">&quot;#connect --etcd 127.0.0.1:2379 --rootPath=by-dev,show config-etcd&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>특정 노드의 구성을 보려면 다음과 같이 하세요:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --etcd ip:port 
Milvus(by-dev) &gt; show session          <span class="hljs-comment"># List all nodes with their server ID</span>
Milvus(by-dev) &gt; visit querycoord <span class="hljs-number">1</span>    <span class="hljs-comment"># Visit a node by server ID</span>
QueryCoord-<span class="hljs-number">1</span>(ip:port) &gt; configuration  <span class="hljs-comment"># List the configuration of the node</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Applicable-configuration-items" class="common-anchor-header">적용 가능한 구성 항목<button data-href="#Applicable-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>현재 다음과 같은 구성 항목을 즉시 변경할 수 있습니다.</p>
<table>
<thead>
<tr><th>구성 항목</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td>pulsar.maxMessageSize</td><td>5242880</td></tr>
<tr><td>common.retentionDuration</td><td>86400</td></tr>
<tr><td>common.entityExpiration</td><td>-1</td></tr>
<tr><td>common.gracefulTime</td><td>5000</td></tr>
<tr><td>common.gracefulStopTimeout</td><td>30</td></tr>
<tr><td>quotaAndLimits.ddl.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.indexRate.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.flushRate.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.compactionRate.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.dml.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.dql.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limits.collection.maxNum</td><td>64</td></tr>
<tr><td>quotaAndLimits.limitWriting.forceDeny</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.enabled</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</td><td>9223372036854775807</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.enabled</td><td>TRUE</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</td><td>0.85</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</td><td>0.95</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</td><td>0.85</td></tr>
<tr><td>quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</td><td>0.95</td></tr>
<tr><td>쿼터 및 제한 제한 쓰기.디스크 보호.활성화됨</td><td>TRUE</td></tr>
<tr><td>quotaAndLimits.limitWriting.diskProtection.diskQuota</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.forceDeny</td><td>FALSE</td></tr>
<tr><td>쿼터 및 제한 제한 읽기.큐 보호 활성화</td><td>FALSE</td></tr>
<tr><td>쿼터 및 제한 제한 읽기.큐 보호.nqInQueueThreshold</td><td>9223372036854775807</td></tr>
<tr><td>쿼터 및 제한 제한 읽기.큐 보호.큐 지연 임계값</td><td>+INF</td></tr>
<tr><td>쿼터 및 제한 제한 읽기.결과 보호.활성화됨</td><td>FALSE</td></tr>
<tr><td>quotaAndLimits.limitReading.resultProtection.maxReadResultRate</td><td>+INF</td></tr>
<tr><td>quotaAndLimits.limitReading.coolOffSpeed</td><td>0.9</td></tr>
<tr><td>autoIndex.enable</td><td>FALSE</td></tr>
<tr><td>autoIndex.params.build</td><td>""</td></tr>
<tr><td>autoIndex.params.extra</td><td>""</td></tr>
<tr><td>autoIndex.params.search</td><td>""</td></tr>
<tr><td>proxy.maxNameLength</td><td>255</td></tr>
<tr><td>proxy.max사용자 이름 길이</td><td>32</td></tr>
<tr><td>proxy.minPasswordLength</td><td>6</td></tr>
<tr><td>proxy.maxPasswordLength</td><td>256</td></tr>
<tr><td>proxy.maxFieldNum</td><td>64</td></tr>
<tr><td>proxy.maxShardNum</td><td>256</td></tr>
<tr><td>proxy.maxDimension</td><td>32768</td></tr>
<tr><td>proxy.maxUserNum</td><td>100</td></tr>
<tr><td>proxy.maxRoleNum</td><td>10</td></tr>
<tr><td>쿼리노드.활성화 디스크</td><td>TRUE</td></tr>
<tr><td>dataCoord.segment.diskSegmentMaxSize</td><td>2048</td></tr>
<tr><td>dataCoord.compaction.enableAutoCompaction</td><td>TRUE</td></tr>
</tbody>
</table>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/ko/v2.4.x/system_configuration.md">시스템 구성에</a> 대해 자세히 알아보세요.</li>
<li><a href="/docs/ko/v2.4.x/configure_operator.md">Milvus Operator</a>, <a href="/docs/ko/v2.4.x/configure-helm.md">Helm 차트</a> 및 <a href="/docs/ko/v2.4.x/configure-docker.md">Docker를</a> 사용하여 설치된 Milvus를 구성하는 방법을 알아보세요.</li>
</ul>
