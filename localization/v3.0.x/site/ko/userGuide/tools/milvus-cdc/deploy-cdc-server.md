---
id: deploy-cdc-server.md
order: 2
summary: 이 가이드는 Milvus-CDC 서버를 배포하는 단계별 프로세스를 제공합니다.
title: CDC 서버 배포
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">CDC 서버 배포<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드는 Milvus-CDC 서버를 배포하는 단계별 프로세스를 제공합니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-CDC 서버를 배포하기 전에 다음 조건이 충족되는지 확인하세요:</p>
<ul>
<li><p><strong>Milvus 인스턴스</strong>: 소스 Milvus와 하나 이상의 대상 Milvus가 모두 배포되어 작동 중이어야 합니다.</p>
<ul>
<li><p>소스 및 대상 Milvus 버전은 모두 2.3.2 이상이어야 하며, 가급적 2.4.x가 좋습니다. 호환성을 보장하기 위해 소스 및 대상 Milvus에 동일한 버전을 사용하는 것이 좋습니다.</p></li>
<li><p>대상 Milvus의 <code translate="no">common.ttMsgEnabled</code> 구성을 <code translate="no">false</code> 으로 설정합니다.</p></li>
<li><p>충돌을 방지하기 위해 소스 및 대상 Milvus를 별개의 메타 및 메시지 저장소 설정으로 구성하세요. 예를 들어, 여러 Milvus 인스턴스에서 동일한 etcd 및 rootPath 구성은 물론 동일한 Pulsar 서비스 및 <code translate="no">chanNamePrefix</code> 을 사용하지 마세요.</p></li>
</ul></li>
<li><p><strong>메타스토어</strong>: Milvus-CDC 메타스토어를 위한 etcd 또는 MySQL 데이터베이스를 준비하세요.</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">단계<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">Milvus-CDC 구성 파일 가져오기</h3><p><a href="https://github.com/zilliztech/milvus-cdc">Milvus-CDC 리</a> 포지토리를 복제하고 <code translate="no">milvus-cdc/server/configs</code> 디렉토리로 이동하여 <code translate="no">cdc.yaml</code> 구성 파일에 액세스합니다.</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">구성 파일 편집</h3><p><code translate="no">milvus-cdc/server/configs</code> 디렉터리에서 <code translate="no">cdc.yaml</code> 파일을 수정하여 Milvus-CDC 메타스토어와 관련된 구성 및 소스 Milvus의 연결 세부 정보를 사용자 지정합니다.</p>
<ul>
<li><p><strong>메타스토어 구성</strong>:</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>: Milvus-CDC의 메타스토어 유형입니다. 가능한 값은 <code translate="no">etcd</code> 또는 <code translate="no">mysql</code> 입니다.</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>: Milvus-CDC의 etcd에 연결하기 위한 주소입니다. <code translate="no">storeType</code> 가 <code translate="no">etcd</code> 로 설정된 경우 필수입니다.</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>: Milvus-CDC 서버의 MySQL 데이터베이스 연결 주소입니다. <code translate="no">storeType</code> 가 <code translate="no">mysql</code> 로 설정된 경우 필수.</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>: Milvus-CDC 메타스토어의 루트 경로. 이 구성을 사용하면 멀티테넌시를 활성화하여 여러 CDC 서비스가 동일한 etcd 또는 MySQL 인스턴스를 활용하면서 서로 다른 루트 경로를 통해 격리할 수 있습니다.</p></li>
</ul>
<p>구성 예시:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># cdc meta data config</span>
<span class="hljs-attr">metaStoreConfig:</span>
  <span class="hljs-comment"># the metastore type, available value: etcd, mysql</span>
  <span class="hljs-attr">storeType:</span> <span class="hljs-string">etcd</span>
  <span class="hljs-comment"># etcd address</span>
  <span class="hljs-attr">etcdEndpoints:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-comment"># mysql connection address</span>
  <span class="hljs-comment"># mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8</span>
  <span class="hljs-comment"># meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">cdc</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>소스 Milvus 구성:</strong></p>
<p>etcd 및 메시지 저장소를 포함한 소스 Milvus의 연결 세부 정보를 지정하여 Milvus-CDC 서버와 소스 Milvus 간의 연결을 설정합니다.</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>: 소스 Milvus의 etcd에 연결하기 위한 주소입니다. 자세한 내용은 <a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">etcd 관련 설정을</a> 참고하세요.</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>: 소스 Milvus가 etcd에 데이터를 저장하는 키의 루트 접두사. 이 값은 Milvus 인스턴스의 배포 방법에 따라 달라질 수 있습니다:</p>
<ul>
<li><p><strong>헬름</strong> 또는 <strong>도커 컴포즈</strong>: 기본값은 <code translate="no">by-dev</code> 입니다.</p></li>
<li><p><strong>연산자</strong>: 기본값은 <code translate="no">&lt;release_name&gt;</code> 입니다.</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>밀버스 리플리케이트 채널 이름, milvus.yaml 파일에서 <code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> 입니다.</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>: 소스 Milvus에 대한 펄서 구성. 소스 Milvus가 메시지 저장소로 Kafka를 사용하는 경우, 모든 Pulsar 관련 구성을 제거하세요. 자세한 내용은 <a href="https://milvus.io/docs/configure_pulsar.md">Pulsar 관련 구성을</a> 참조하세요.</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>: 소스 Milvus의 Kafka 주소. 소스 Milvus가 메시지 저장소로 Kafka를 사용하는 경우 이 구성의 주석 처리를 해제합니다.</p></li>
</ul></li>
</ul>
<p>구성 예시:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.</span>
<span class="hljs-attr">sourceConfig:</span>
  <span class="hljs-comment"># etcd config</span>
  <span class="hljs-attr">etcdAddress:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-attr">etcdRootPath:</span> <span class="hljs-string">by-dev</span>
  <span class="hljs-attr">etcdMetaSubPath:</span> <span class="hljs-string">meta</span>
  <span class="hljs-comment"># default partition name</span>
  <span class="hljs-attr">defaultPartitionName:</span> <span class="hljs-string">_default</span>
  <span class="hljs-comment"># read buffer length, mainly used for buffering if writing data to milvus-target is slow.</span>
  <span class="hljs-attr">readChanLen:</span> <span class="hljs-number">10</span>
  <span class="hljs-attr">replicateChan:</span> <span class="hljs-string">by-dev-replicate-msg</span>
  <span class="hljs-comment"># milvus-source mq config, which is pulsar or kafka</span>
  <span class="hljs-attr">pulsar:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">pulsar://localhost:6650</span>
    <span class="hljs-attr">webAddress:</span> <span class="hljs-string">localhost:80</span>
    <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span>
    <span class="hljs-attr">tenant:</span> <span class="hljs-string">public</span>
    <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
<span class="hljs-comment">#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken</span>
<span class="hljs-comment">#    authParams: token:xxx</span>
<span class="hljs-comment">#  kafka:</span>
<span class="hljs-comment">#    address: 127.0.0.1:9092</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">Milvus-CDC 서버 컴파일</h3><p><code translate="no">cdc.yaml</code> 파일을 저장한 후 <code translate="no">milvus-cdc</code> 디렉토리로 이동하여 다음 명령 중 하나를 실행하여 서버를 컴파일합니다:</p>
<ul>
<li><p>바이너리 파일의 경우</p>
<pre><code translate="no" class="language-bash">make build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Docker 이미지의 경우:</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>Docker 이미지의 경우, 컴파일된 파일을 컨테이너 내의 <code translate="no">/app/server/configs/cdc.yaml</code> 에 마운트합니다.</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">서버 시작</h3><ul>
<li><p>바이너리 사용</p>
<p><code translate="no">milvus-cdc</code> 바이너리가 포함된 디렉토리와 <code translate="no">cdc.yaml</code> 파일이 있는 <code translate="no">configs</code> 디렉토리로 이동한 다음 서버를 시작합니다:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Docker Compose를 사용합니다:</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
