---
id: switch_milvus_standalone_mq_type-operator.md
summary: Milvus 스탠드얼론의 메시지 대기열 유형을 전환하는 방법을 알아보세요.
title: Milvus 독립 실행형에 대한 MQ 유형 전환하기
---
<h1 id="Switch-MQ-Type-for-Milvus-Standalone" class="common-anchor-header">Milvus 독립 실행형에 대한 MQ 유형 전환하기<button data-href="#Switch-MQ-Type-for-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 기존 Milvus 독립 실행형 배포의 메시지 큐(MQ) 유형을 전환하는 방법에 대해 설명합니다. Milvus는 다운타임 없이 온라인 MQ 전환을 지원합니다.</p>
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
    </button></h2><ul>
<li><a href="/docs/ko/v2.6.x/install_standalone-docker.md">Docker</a> 또는 <a href="/docs/ko/v2.6.x/install_standalone-docker-compose.md">Docker Compose를</a> 통해 설치된 실행 중인 Milvus 독립 실행형 인스턴스.</li>
<li>Milvus 인스턴스가 이 스위치 MQ 기능을 지원하는 최신 버전으로 업그레이드되었습니다.</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">일반 워크플로<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>MQ 유형 전환을 위한 일반적인 워크플로우는 다음과 같습니다:</p>
<ol>
<li>Milvus 인스턴스가 제대로 실행되고 있는지 확인합니다.</li>
<li>소스 MQ 유형과 대상 MQ 유형을 확인합니다.</li>
<li><code translate="no">mqType</code> 값을 변경하지 않고 대상 MQ의 액세스 설정을 Milvus 구성으로 구성합니다.</li>
<li>WAL 변경 API를 호출하여 전환을 트리거합니다.</li>
<li>로그를 모니터링하여 전환이 성공적으로 완료되었는지 확인합니다.</li>
</ol>
<div class="alert note">
<p>전환하기 전에 대상 MQ에 현재 Milvus 인스턴스에서 사용하는 것과 이름이 같은 토픽이 포함되어 있지 않은지 확인하세요. 토픽 이름이 충돌하면 예기치 않은 동작이 발생할 수 있으므로 대상 MQ 서비스를 이전에 다른 Milvus 인스턴스에서 사용한 적이 있는 경우 특히 중요합니다.</p>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker-Local-Storage" class="common-anchor-header">RocksMQ에서 Woodpecker(로컬 스토리지)로 전환하기<button data-href="#Switch-from-RocksMQ-to-Woodpecker-Local-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>이 절차는 기본적으로 RocksMQ를 사용하는 <strong>Milvus 독립 실행형 Docker</strong> 배포에 적용됩니다.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">1단계: Milvus 인스턴스가 실행 중인지 확인<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 독립 실행형 Docker 인스턴스가 제대로 실행되고 있는지 확인합니다. 테스트 컬렉션을 만들고, 데이터를 삽입하고, 쿼리를 실행하여 이를 확인할 수 있습니다.</p>
<h3 id="Step-2-Configure-Woodpecker-with-local-storage" class="common-anchor-header">2단계: 로컬 스토리지로 Woodpecker 구성하기<button data-href="#Step-2-Configure-Woodpecker-with-local-storage" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">mqType</code> 값을 변경하지 <strong>않고</strong> Woodpecker 설정을 추가하도록 Milvus 구성을 업데이트합니다. 다음 내용으로 <code translate="no">user.yaml</code> 파일을 만들거나 업데이트합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">local</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 Milvus 인스턴스를 다시 시작하여 구성을 적용합니다:</p>
<pre><code translate="no" class="language-shell">bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">3단계: MQ 스위치 실행하기<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 명령을 실행하여 우드페커로 전환을 트리거합니다:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">&lt;mixcoord_addr&gt;</code> 을 MixCoord 서비스의 실제 주소로 바꿉니다(기본적으로 독립형 배포의 경우 <code translate="no">localhost</code> ).</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">4단계: 전환이 완료되었는지 확인<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>전환 프로세스가 자동으로 완료됩니다. Milvus 로그에서 다음 주요 메시지를 모니터링하여 전환이 완료되었는지 확인합니다:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>위의 로그 메시지에서 <code translate="no">&lt;MQ1&gt;</code> 는 소스 MQ 유형(<code translate="no">rocksmq</code>)이고 <code translate="no">&lt;MQ2&gt;</code> 는 대상 MQ 유형(<code translate="no">woodpecker</code>)입니다.</p>
<ul>
<li>첫 번째 메시지는 소스에서 대상으로의 WAL 전환이 완료되었음을 나타냅니다.</li>
<li>두 번째 메시지는 모든 물리적 채널이 전환되었음을 나타냅니다.</li>
<li>세 번째 메시지는 <code translate="no">mq.type</code> 구성이 etcd에서 업데이트되었음을 나타냅니다.</li>
</ul>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker-MinIO-Storage" class="common-anchor-header">RocksMQ에서 Woodpecker(MinIO 스토리지)로 전환하기<button data-href="#Switch-from-RocksMQ-to-Woodpecker-MinIO-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>이 절차는 <strong>Milvus 독립형 Docker Compose</strong> 배포에 적용됩니다.</p>
<div class="alert note">
<p>Milvus v2.6부터 기본 <code translate="no">docker-compose.yaml</code> 은 이미 <code translate="no">mqType</code> 을 Woodpecker로 선언합니다. 기본 구성을 수정하거나 v2.5에서 업그레이드하지 않았다면 이 절차가 필요하지 않을 수 있습니다.</p>
</div>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">1단계: Milvus 인스턴스가 실행 중인지 확인하기<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 독립 실행형 Docker Compose 인스턴스가 제대로 실행되고 있는지 확인합니다.</p>
<h3 id="Step-2-Optional-Verify-Woodpecker-configuration" class="common-anchor-header">2단계: (선택 사항) Woodpecker 구성 확인<button data-href="#Step-2-Optional-Verify-Woodpecker-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>기본 Milvus 구성에서는 이미 Woodpecker 스토리지 유형이 MinIO로 설정되어 있으므로 대부분의 경우 추가 구성이 필요하지 않습니다.</p>
<p>그러나 이전에 Woodpecker 구성을 사용자 지정한 경우에는 <code translate="no">woodpecker.storage.type</code> 이 <code translate="no">minio</code> 으로 설정되어 있는지 확인해야 합니다. 다음 내용으로 <code translate="no">user.yaml</code> 파일을 만들거나 업데이트합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 Milvus 인스턴스를 다시 시작하여 구성을 적용합니다:</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">3단계: MQ 스위치 실행하기<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 명령을 실행하여 우드페커로 전환을 트리거합니다:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">&lt;mixcoord_addr&gt;</code> 을 MixCoord 서비스의 실제 주소로 바꿉니다(기본적으로 독립형 배포의 경우 <code translate="no">localhost</code> ).</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">4단계: 전환이 완료되었는지 확인<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>전환 프로세스가 자동으로 완료됩니다. Milvus 로그에서 다음 주요 메시지를 모니터링하여 전환이 완료되었는지 확인합니다:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>위의 로그 메시지에서 <code translate="no">&lt;MQ1&gt;</code> 는 소스 MQ 유형(<code translate="no">rocksmq</code>)이고 <code translate="no">&lt;MQ2&gt;</code> 는 대상 MQ 유형(<code translate="no">woodpecker</code>)입니다.</p>
<ul>
<li>첫 번째 메시지는 소스에서 대상으로의 WAL 전환이 완료되었음을 나타냅니다.</li>
<li>두 번째 메시지는 모든 물리적 채널이 전환되었음을 나타냅니다.</li>
<li>세 번째 메시지는 <code translate="no">mq.type</code> 구성이 etcd에서 업데이트되었음을 나타냅니다.</li>
</ul>
</div>
