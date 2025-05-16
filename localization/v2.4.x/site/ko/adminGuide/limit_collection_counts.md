---
id: limit_collection_counts.md
title: 수거 횟수 제한 설정
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">수집 횟수 제한<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 인스턴스는 최대 65,536건의 수집을 허용합니다. 그러나 컬렉션 수가 너무 많으면 성능 문제가 발생할 수 있습니다. 따라서 Milvus 인스턴스에서 생성되는 컬렉션 수를 제한하는 것이 좋습니다.</p>
<p>이 가이드에서는 Milvus 인스턴스에서 컬렉션 수를 제한하는 방법에 대한 지침을 제공합니다.</p>
<p>구성은 Milvus 인스턴스를 설치하는 방식에 따라 다릅니다.</p>
<ul>
<li><p>헬름 차트를 사용하여 설치한 Milvus 인스턴스의 경우</p>
<p><code translate="no">config</code> 섹션 아래의 <code translate="no">values.yaml</code> 파일에 구성을 추가합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/configure-helm.md">헬름 차트로 Milvus 구성을</a> 참조한다.</p></li>
<li><p>Docker Compose를 사용하여 설치한 Milvus 인스턴스의 경우</p>
<p>Milvus 인스턴스를 시작할 때 사용한 <code translate="no">milvus.yaml</code> 파일에 구성을 추가합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/configure-docker.md">Docker Compose로 Milvus 구성을</a> 참조하세요.</p></li>
<li><p>Operator를 사용하여 설치한 Milvus 인스턴스의 경우</p>
<p><code translate="no">Milvus</code> 사용자 지정 리소스의 <code translate="no">spec.components</code> 섹션에 구성을 추가합니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/configure_operator.md">Operator로 Milvus 구성을</a> 참조하세요.</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">구성 옵션<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml">rootCoord:
    maxGeneralCapacity: 65536
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">maxGeneralCapacity</code> 매개 변수는 현재 Milvus 인스턴스가 보유할 수 있는 최대 컬렉션 수를 설정합니다. 기본값은 <code translate="no">65536</code> 입니다.</p>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">컬렉션 수 계산하기<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션에서 여러 개의 샤드와 파티션을 설정할 수 있습니다. 샤드는 여러 데이터 노드에 데이터 쓰기 작업을 분산하는 데 사용되는 논리적 단위입니다. 파티션은 컬렉션 데이터의 하위 집합만 로드하여 데이터 검색 효율성을 높이는 데 사용되는 논리 단위입니다. 현재 Milvus 인스턴스의 컬렉션 수를 계산할 때는 샤드와 파티션도 계산해야 합니다.</p>
<p>예를 들어, 이미 <strong>100개의</strong> 컬렉션을 생성했고, 그 중 <strong>60개</strong> 컬렉션에는 <strong>2개의</strong> 샤드와 <strong>4개의</strong> 파티션이, 나머지 <strong>40개</strong> 컬렉션에는 <strong>1개의</strong> 샤드와 <strong>12개의</strong> 파티션이 있다고 가정해 보겠습니다. 현재 컬렉션 수는 다음과 같이 계산할 수 있습니다:</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>위의 예에서는 기본 한도 중 <strong>960개를</strong> 이미 사용했습니다. 이제 샤드 <strong>4개와</strong> 파티션 <strong>20개로</strong> 구성된 새 컬렉션을 만들려고 하면 총 컬렉션 수가 최대 용량을 초과하므로 다음과 같은 오류 메시지가 표시됩니다:</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the <span class="hljs-built_in">max</span> general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>이 오류를 방지하려면 기존 컬렉션 또는 새 컬렉션의 샤드 또는 파티션 수를 줄이거나 일부 컬렉션을 삭제하거나 <code translate="no">maxGeneralCapacity</code> 값을 늘릴 수 있습니다.</p>
