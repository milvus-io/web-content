---
id: coordinator_ha.md
summary: Milvus 코디네이터가 활동 대기 상태로 근무하게 된 동기와 절차에 대해 알아보세요.
title: 코디네이터 HA
---
<h1 id="Coordinator-HA" class="common-anchor-header">코디네이터 HA<button data-href="#Coordinator-HA" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="/docs/ko/v2.4.x/architecture_overview.md">밀버스 아키텍처에서</a> 볼 수 있듯이, 밀버스는 많은 구성 요소로 이루어져 있으며 분산된 방식으로 작동합니다. 모든 구성 요소 중에서 Milvus는 노드의 <a href="/docs/ko/v2.4.x/scaleout.md">스케일업과 스케일아웃을</a> 통해 작업자의 고가용성을 보장하며, 코디네이터는 체인에서 유일하게 약한 연결 고리입니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>2.2.3 릴리스에서 Milvus는 코디네이터가 활성-대기 모드에서 작동하도록 고가용성을 구현하여 서비스 불가를 초래할 수 있는 단일 장애 지점(SPoF)을 완화합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/coordinator_ha.png" alt="Coordinator HA" class="doc-image" id="coordinator-ha" />
   </span> <span class="img-wrapper"> <span>코디네이터 HA</span> </span></p>
<p>위 그림은 활성-대기 모드에서 코디네이터가 작동하는 방식을 보여줍니다. 한 쌍의 코디네이터가 시작되면 서버 ID를 사용하여 etcd에 등록하고 활성 역할을 놓고 경쟁합니다. etcd로부터 활성 역할을 임대하는 데 성공한 코디네이터가 서비스를 시작하고, 쌍의 다른 코디네이터는 대기 상태로 남아 활성 역할을 지켜보다가 활성 코디네이터가 죽으면 서비스를 제공할 준비를 합니다.</p>
<h2 id="Enable-coordinator-HA" class="common-anchor-header">코디네이터 HA 사용<button data-href="#Enable-coordinator-HA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="With-Helm" class="common-anchor-header">헬름 사용</h3><p>여러 코디네이터를 시작하고 활성-대기 모드에서 작동하도록 하려면 <code translate="no">values.yaml</code> 파일을 다음과 같이 변경해야 한다.</p>
<ul>
<li><code translate="no">xxxCoordinator.replicas</code> 을 <code translate="no">2</code> 으로 설정한다.</li>
<li><code translate="no">xxxCoordinator.activeStandby.enabled</code> 을 <code translate="no">true</code> 으로 설정한다.</li>
</ul>
<p>다음 코드 스니펫은 RootCoord를 예로 사용한다. 다른 유형의 코디네이터에 대해서도 동일하게 수행할 수 있습니다.</p>
<pre><code translate="no" class="language-yaml">rootCoordinator:
  enabled: true
  <span class="hljs-comment"># You can set the number of replicas greater than 1 only if you also need to set activeStandby.enabled to true.</span>
  replicas: <span class="hljs-number">2</span>  <span class="hljs-comment"># Otherwise, remove this configuration item.</span>
  resources: {}
  nodeSelector: {}
  affinity: {}
  tolerations: []
  extraEnv: []
  heaptrack:
    enabled: false
  profiling:
    enabled: false  <span class="hljs-comment"># Enable live profiling</span>
  activeStandby:
    enabled: true  <span class="hljs-comment"># Set this to true to have RootCoordinators work in active-standby mode.</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="With-Docker" class="common-anchor-header">Docker 사용</h3><p>여러 코디네이터를 시작하고 활성-대기 모드에서 작동하도록 하려면 Milvus 클러스터를 시작하는 데 사용하는 <code translate="no">docker-compose</code> 파일에 몇 가지 정의를 추가하면 됩니다.</p>
<p>다음 코드 스니펫은 RootCoord를 예로 사용합니다. 다른 유형의 코디네이터에도 동일한 작업을 수행할 수 있습니다.</p>
<pre><code translate="no" class="language-yaml">  rootcoord:
    container_name: milvus-rootcoord
    image: milvusdb/milvus:v2<span class="hljs-number">.2</span><span class="hljs-number">.3</span>
    command: [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;rootcoord&quot;</span>]
    environment:
      ETCD_ENDPOINTS: etcd:<span class="hljs-number">2379</span>
      MINIO_ADDRESS: minio:<span class="hljs-number">9000</span>
      PULSAR_ADDRESS: pulsar://pulsar:<span class="hljs-number">6650</span>
      ROOT_COORD_ADDRESS: rootcoord:<span class="hljs-number">53100</span>
      <span class="hljs-comment"># add ROOT_COORD_ENABLE_ACTIVE_STANDBY to enable active standby</span>
      ROOT_COORD_ENABLE_ACTIVE_STANDBY: true
    depends_on:
      - <span class="hljs-string">&quot;etcd&quot;</span>
      - <span class="hljs-string">&quot;pulsar&quot;</span>
      - <span class="hljs-string">&quot;minio&quot;</span>

<span class="hljs-comment">#   add the following to have RootCoords work in active-standby mode</span>
<span class="hljs-comment">#   rootcoord-1:</span>
<span class="hljs-comment">#    container_name: milvus-rootcoord-1</span>
<span class="hljs-comment">#    image: milvusdb/milvus:v2.2.3</span>
<span class="hljs-comment">#    command: [&quot;milvus&quot;, &quot;run&quot;, &quot;rootcoord&quot;]</span>
<span class="hljs-comment">#    environment:</span>
<span class="hljs-comment">#      ETCD_ENDPOINTS: etcd:2379</span>
<span class="hljs-comment">#      MINIO_ADDRESS: minio:9000</span>
<span class="hljs-comment">#      PULSAR_ADDRESS: pulsar://pulsar:6650</span>
<span class="hljs-comment">#      ROOT_COORD_ADDRESS: rootcoord-1:53100</span>
<span class="hljs-comment">#      # add ROOT_COORD_ENABLE_ACTIVE_STANDBY to enable active standby</span>
<span class="hljs-comment">#      ROOT_COORD_ENABLE_ACTIVE_STANDBY: true</span>
<span class="hljs-comment">#    depends_on:</span>
<span class="hljs-comment">#      - &quot;etcd&quot;</span>
<span class="hljs-comment">#      - &quot;pulsar&quot;</span>
<span class="hljs-comment">#      - &quot;minio&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="With-MacLinux-shell" class="common-anchor-header">Mac/Linux 셸 사용</h3><p>여러 코디네이터를 시작하고 활성-대기 모드에서 작동하도록 하려면 다음과 같이 하세요.</p>
<ol>
<li><p>Milvus 소스 코드를 로컬 드라이브에 다운로드하고 다음과 같이 <a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">소스 코드에서 Milvus 클러스터를 시작합니다</a>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> ./scripts/start_cluster.sh
<button class="copy-code-btn"></button></code></pre>
<p>이 단계가 끝나면 Milvus는 각 유형의 코디네이터를 하나만 사용하여 실행됩니다.</p></li>
<li><p><code translate="no">milvus.yaml</code> 을 업데이트하여 각 유형의 코디네이터의 포트 번호를 변경합니다. 다음은 <strong>rootCoord를</strong> 예로 사용합니다.</p>
<pre><code translate="no" class="language-yaml">rootCoord:
  address: localhost
  port: <span class="hljs-number">53100</span> <span class="hljs-comment"># change to 53001</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>대기 코디네이터를 시작합니다.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">nohup</span> ./bin/milvus run rootcoord &gt; /tmp/rootcoord2.<span class="hljs-built_in">log</span> 2&gt;&amp;1 &amp;
<button class="copy-code-btn"></button></code></pre>
<p>이 단계가 끝나면 다음 명령을 실행하여 두 개의 코디네이터 프로세스가 존재하는지 확인합니다.</p>
<pre><code translate="no" class="language-shell">ps aux|grep milvus
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷해야 합니다.</p>
<pre><code translate="no" class="language-shell">&gt; ps aux|grep milvus
root        12813   0.7 0.2 410709648   82432   ??  S   5:18PM  0:33.28 ./bin/milvus run rootcoord
root        12816   0.5 0.2 409487968   62352   ??  S   5:18PM  0:22.69 ./bin/milvus run proxy
root        17739   0.1 0.3 410289872   91792 s003  SN  6:01PM  0:00.30 ./bin/milvus run rootcoord
...
<button class="copy-code-btn"></button></code></pre>
<p>그리고 대기 코디네이터는 다음과 같이 10초마다 로그 항목을 출력합니다:</p>
<pre><code translate="no" class="language-shell">[INFO] [sessionutil/session_util.go:649] [<span class="hljs-string">&quot;serverName: rootcoord is in STANDBY ...&quot;</span>]
<button class="copy-code-btn"></button></code></pre></li>
<li><p>활성 코디네이터를 한 쌍에서 종료하고 대기 코디네이터의 동작을 관찰합니다.</p>
<p>대기 코디네이터가 활성 코디네이터의 역할을 인수하는 데 60초가 걸리는 것을 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-shell">[2022/09/21 11:58:33.855 +08:00] [DEBUG] [sessionutil/session_util.go:677] [<span class="hljs-string">&quot;watch the ACTIVE key&quot;</span>] [DELETE=<span class="hljs-string">&quot;key:\&quot;by-dev/meta/session/rootcoord\&quot; mod_revision:167 &quot;</span>]
[2022/09/21 11:58:33.856 +08:00] [DEBUG] [sessionutil/session_util.go:677] [<span class="hljs-string">&quot;watch the ACTIVE key&quot;</span>] [DELETE=<span class="hljs-string">&quot;key:\&quot;by-dev/meta/session/rootcoord-15\&quot; mod_revision:167 &quot;</span>]
[2022/09/21 11:58:33.856 +08:00] [INFO] [sessionutil/session_util.go:683] [<span class="hljs-string">&quot;stop watching ACTIVE key&quot;</span>]
[2022/09/21 11:58:33.856 +08:00] [INFO] [sessionutil/session_util.go:655] [<span class="hljs-string">&quot;start retrying to register as ACTIVE service...&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [INFO] [sessionutil/session_util.go:641] [<span class="hljs-string">&quot;register ACTIVE service successfully&quot;</span>] [ServerID=19]
[2022/09/21 11:58:33.859 +08:00] [INFO] [sessionutil/session_util.go:690] [<span class="hljs-string">&quot;quit STANDBY mode, this node will become ACTIVE&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [INFO] [rootcoord/root_coord.go:638] [<span class="hljs-string">&quot;rootcoord switch from standby to active, activating&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [INFO] [rootcoord/root_coord.go:306] [<span class="hljs-string">&quot;RootCoord Register Finished&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [DEBUG] [rootcoord/service.go:148] [<span class="hljs-string">&quot;RootCoord start done ...&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [DEBUG] [components/root_coord.go:58] [<span class="hljs-string">&quot;RootCoord successfully started&quot;</span>]
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Related-configuration-items" class="common-anchor-header">관련 구성 항목<button data-href="#Related-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>코디네이터 HA는 기본적으로 비활성화되어 있습니다. Milvus 구성 파일에서 다음 항목을 변경하여 이 기능을 수동으로 활성화할 수 있습니다.</p>
<ul>
<li><a href="/docs/ko/v2.4.x/configure_rootcoord.md#rootCoordactiveStandbyenabled">rootCoord.activeStandby.enabled</a></li>
<li><a href="/docs/ko/v2.4.x/configure_querycoord.md#queryCoordactiveStandbyenabled">queryCoord.activeStandby.enabled</a></li>
<li><a href="/docs/ko/v2.4.x/configure_datacoord.md#dataCoordactiveStandbyenabled">dataCoord.activeStandby.enabled</a></li>
</ul>
<h2 id="Limits" class="common-anchor-header">제한 사항<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>현재 활성 서비스와 대기 서비스 간에는 강력한 일관성이 보장되지 않습니다. 따라서 대기 코디네이터는 활성 역할을 인수하면서 메타데이터를 다시 로드해야 합니다.</p>
<p>Etcd는 현재 세션의 시간이 초과된 후에만 임대를 해제합니다. 세션 시간 제한은 기본값이 60초입니다. 따라서 활성 코디네이터가 사망한 시점과 대기 코디네이터가 활성 역할을 인수하는 시점 사이에는 60초의 간격이 있습니다.</p>
