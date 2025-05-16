---
id: chunk_cache.md
title: 청크 캐시 구성
summary: ''
---
<h1 id="Configure-Chunk-Cache" class="common-anchor-header">청크 캐시 구성<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h1><p>청크 캐시 메커니즘을 통해 Milvus는 데이터가 필요하기 전에 쿼리 노드의 로컬 하드 디스크에 있는 캐시에 데이터를 미리 로드할 수 있습니다. 이 메커니즘은 디스크에서 메모리로 데이터를 로드하는 데 걸리는 시간을 줄여 벡터 검색 성능을 크게 향상시킵니다.</p>
<h2 id="Background" class="common-anchor-header">배경<button data-href="#Background" class="anchor-icon" translate="no">
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
    </button></h2><p>벡터를 검색하기 위해 쿼리를 수행하기 전에 Milvus는 데이터를 객체 저장소에서 쿼리 노드의 로컬 하드 디스크에 있는 메모리 캐시로 로드해야 합니다. 이 과정은 시간이 많이 걸리는 프로세스입니다. 모든 데이터가 로드되기 전에 Milvus는 일부 벡터 검색 요청에 지연으로 응답할 수 있습니다.</p>
<p>쿼리 성능을 개선하기 위해 Milvus는 개체 스토리지에서 로컬 하드 디스크의 캐시에 데이터가 필요하기 전에 미리 로드하는 청크 캐시 메커니즘을 제공합니다. 쿼리 요청이 수신되면 세그코어는 먼저 데이터가 오브젝트 스토리지가 아닌 캐시에 있는지 확인합니다. 데이터가 캐시에 있으면 세그코어는 캐시에서 데이터를 빠르게 검색하여 결과를 클라이언트에 반환할 수 있습니다.</p>
<h2 id="Configure-Chunk-Cache" class="common-anchor-header">청크 캐시 구성<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h2><p>이 가이드는 Milvus 인스턴스에 대한 청크 캐시 메커니즘을 구성하는 방법에 대한 지침을 제공합니다. 구성은 Milvus 인스턴스를 설치하는 방식에 따라 다릅니다.</p>
<ul>
<li><p>헬름 차트를 사용하여 설치한 Milvus 인스턴스의 경우</p>
<p><code translate="no">config</code> 섹션 아래의 <code translate="no">values.yaml</code> 파일에 구성을 추가한다. 자세한 내용은 <a href="/docs/ko/v2.4.x/configure-helm.md">헬름 차트로 Milvus 구성을</a> 참조한다.</p></li>
<li><p>Docker Compose를 사용하여 설치한 Milvus 인스턴스의 경우</p>
<p>Milvus 인스턴스를 시작할 때 사용한 <code translate="no">milvus.yaml</code> 파일에 구성을 추가합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/configure-docker.md">Docker Compose로 Milvus 구성을</a> 참조하세요.</p></li>
<li><p>Operator를 사용하여 설치한 Milvus 인스턴스의 경우</p>
<p><code translate="no">Milvus</code> 사용자 지정 리소스의 <code translate="no">spec.components</code> 섹션에 구성을 추가합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/configure_operator.md">Operator로 Milvus 구성을</a> 참조하세요.</p></li>
</ul>
<h3 id="Configuration-options" class="common-anchor-header">구성 옵션</h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode</span>:
    <span class="hljs-attr">cache</span>:
        <span class="hljs-attr">warmup</span>: <span class="hljs-keyword">async</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">warmup</code> 매개 변수는 Milvus가 개체 스토리지의 데이터를 쿼리 노드의 로컬 하드 디스크에 있는 캐시에 미리 로드할지 여부를 결정합니다. 이 매개변수의 기본값은 <code translate="no">disable</code> 입니다. 가능한 옵션은 다음과 같습니다:</p>
<ul>
<li><code translate="no">async</code>: Milvus는 백그라운드에서 비동기식으로 데이터를 미리 로드하므로 컬렉션 로드에 걸리는 시간에 영향을 미치지 않습니다. 그러나 로드 프로세스가 완료된 후 짧은 시간 동안 벡터를 검색할 때 사용자가 지연을 경험할 수 있습니다.  이 옵션이 기본값입니다.</li>
<li><code translate="no">sync</code>: Milvus는 데이터를 동기식으로 미리 로드하므로 컬렉션을 로드하는 데 걸리는 시간에 영향을 줄 수 있습니다. 그러나 사용자는 로드 프로세스가 완료된 후 지연 없이 즉시 쿼리를 수행할 수 있습니다.</li>
<li><code translate="no">disable</code>: Milvus는 메모리 캐시에 데이터를 미리 로드하지 않습니다.</li>
</ul>
<p>청크 캐시 설정은 컬렉션에 새 데이터가 삽입되거나 컬렉션 인덱스가 다시 빌드될 때에도 적용됩니다.</p>
<h3 id="FAQ" class="common-anchor-header">FAQ</h3><ul>
<li><p><strong>청크 캐시 메커니즘이 올바르게 작동하는지 확인하려면 어떻게 해야 하나요?</strong></p>
<p>컬렉션을 로드한 후 검색 또는 쿼리 요청의 지연 시간을 확인하는 것이 좋습니다. 지연 시간이 예상보다 상당히 길면(예: 몇 초) 청크 캐시 메커니즘이 여전히 작동 중인 것일 수 있습니다.</p>
<p>쿼리 지연 시간이 오랫동안 높게 유지되는 경우. 개체 스토리지의 처리량을 확인하여 청크 캐시가 계속 작동 중인지 확인할 수 있습니다. 정상적인 경우, 작동 중인 청크 캐시는 오브젝트 스토리지에서 높은 처리량을 생성합니다. 또는 <code translate="no">sync</code> 모드에서 청크 캐시를 사용해 볼 수도 있습니다.</p></li>
</ul>
