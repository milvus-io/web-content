---
id: mmap.md
summary: MMap을 사용하면 단일 노드에서 더 많은 데이터를 사용할 수 있습니다.
title: MMap 지원 데이터 스토리지
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">MMap 지원 데이터 스토리지<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서는 메모리 매핑 파일을 사용하면 파일 내용을 메모리에 직접 매핑할 수 있습니다. 이 기능은 특히 사용 가능한 메모리가 부족하지만 완전한 데이터 로딩이 불가능한 상황에서 메모리 효율성을 향상시킵니다. 이 최적화 메커니즘은 특정 한도까지 성능을 보장하면서 데이터 용량을 늘릴 수 있지만, 데이터 양이 메모리를 너무 많이 초과하면 검색 및 쿼리 성능이 심각하게 저하될 수 있으므로 이 기능을 적절하게 켜거나 끄도록 선택하세요.</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">메모리 매핑 구성<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.4부터는 배포 전에 정적 구성 파일을 유연하게 조정하여 전체 클러스터의 기본 메모리 매핑 설정을 구성할 수 있습니다. 또한, 클러스터와 인덱스 수준 모두에서 메모리 매핑 설정을 미세 조정하기 위해 매개변수를 동적으로 변경할 수 있는 옵션도 있습니다. 향후 업데이트에서는 필드 수준 구성을 포함하도록 메모리 매핑 기능을 확장할 예정입니다.</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">클러스터 배포 전: 전역 구성</h3><p>클러스터를 배포하기 전에 <strong>클러스터 수준</strong> 설정으로 전체 클러스터에 메모리 매핑을 적용합니다. 이렇게 하면 모든 새 개체가 자동으로 이러한 구성을 따르게 됩니다. 이러한 설정을 수정하려면 클러스터를 다시 시작해야 적용된다는 점에 유의하세요.</p>
<p>클러스터의 메모리 매핑 설정을 조정하려면 <code translate="no">configs/milvus.yaml</code> 파일을 편집하세요. 이 파일에서 기본적으로 메모리 매핑을 사용할지 여부를 지정하고 메모리 매핑된 파일을 저장할 디렉터리 경로를 결정할 수 있습니다. 경로(<code translate="no">mmapDirPath</code>)를 지정하지 않으면 시스템은 기본적으로 메모리 매핑된 파일을 <code translate="no">{localStorage.path}/mmap</code> 에 저장합니다. 자세한 내용은 <a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">로컬 저장소 관련 구성을</a> 참조하세요.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    <span class="hljs-comment"># Set memory mapping property for whole cluster</span>
    mmapEnabled: false | true
    <span class="hljs-comment"># Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. </span>
    mmapDirPath: <span class="hljs-built_in">any</span>/valid/path 
....
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">2.4.10</code> 이후 구성 <code translate="no">queryNode.mmap.mmapEnabled</code> 은 아래 4개의 개별 필드로 분할되며, 모든 기본값은 <code translate="no">false</code> 입니다:</p>
<ul>
<li><code translate="no">queryNode.mmap.vectorField</code>는 벡터 데이터가 mmap인지 여부를 제어합니다;</li>
<li><code translate="no">queryNode.mmap.vectorIndex</code>는 벡터 인덱스가 mmap인지 여부를 제어합니다;</li>
<li><code translate="no">queryNode.mmap.scalarField</code>는 스칼라 데이터가 mmap인지 여부를 제어합니다;</li>
<li><code translate="no">queryNode.mmap.scalarIndex</code>는 스칼라 인덱스가 mmap인지 여부를 제어합니다;</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    vectorField: false <span class="hljs-comment"># Enable mmap for loading vector data</span>
    vectorIndex: false <span class="hljs-comment"># Enable mmap for loading vector index</span>
    scalarField: false <span class="hljs-comment"># Enable mmap for loading scalar data</span>
    scalarIndex: false <span class="hljs-comment"># Enable mmap for loading scalar index</span>
....
<button class="copy-code-btn"></button></code></pre>
<p>또한 벡터 인덱스와 벡터 데이터 mmap만 컬렉션에 대해 개별적으로 켜고 끌 수 있지만 다른 것들은 켜고 끌 수 없습니다.</p>
<p>호환성: 원래 구성 <code translate="no">queryNode.mmap.mmapEnabled</code> 이 <code translate="no">true</code> 으로 설정되어 있는 경우 새로 추가된 구성은 현재 <code translate="no">true</code> 으로 설정됩니다. <code translate="no">queryNode.mmap.mmapEnabled</code> 이 <code translate="no">false</code> 으로 설정된 경우 , 새 구성이 <code translate="no">true</code> 으로 설정된 경우 최종 값은 <code translate="no">true</code> 이 됩니다.</p>
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">클러스터 운영 중: 동적 구성</h3><p>클러스터 런타임 중에 컬렉션 또는 인덱스 수준에서 메모리 매핑 설정을 동적으로 조정할 수 있습니다.</p>
<p><strong>컬렉션 수준에서</strong> 메모리 매핑은 기본 키, 타임스탬프, 행 ID를 제외한 컬렉션 내의 인덱싱되지 않은 모든 원시 데이터에 적용됩니다. 이 접근 방식은 특히 대규모 데이터 세트의 포괄적인 관리에 적합합니다.</p>
<p>컬렉션 내에서 메모리 매핑 설정을 동적으로 조정하려면 <code translate="no">set_properties()</code> 방법을 활용하세요. 여기에서 필요에 따라 <code translate="no">True</code> 또는 <code translate="no">False</code> 사이에서 <code translate="no">mmap.enabled</code> 을 전환할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p>컬렉션 내의 메모리 매핑 설정인 <code translate="no">2.4.10</code> 이후에는 <code translate="no">add_field</code> 방법을 활용하세요. 여기에서 필요에 따라 <code translate="no">True</code> 또는 <code translate="no">False</code> 사이에서 <code translate="no">mmap_enabled</code> 을 전환할 수 있습니다.</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, mmap_enabled=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p><strong>인덱스 수준</strong> 설정의 경우 다른 데이터 유형에 영향을 주지 않고 벡터 인덱스에 메모리 매핑을 특별히 적용할 수 있습니다. 이 기능은 벡터 검색에 최적화된 성능이 필요한 컬렉션에 매우 유용합니다.</p>
<p>컬렉션 내의 인덱스에 대해 메모리 매핑을 활성화 또는 비활성화하려면 <code translate="no">alter_index()</code> 메서드를 호출하여 <code translate="no">index_name</code> 에 대상 인덱스 이름을 지정하고 <code translate="no">mmap.enabled</code> 를 <code translate="no">True</code> 또는 <code translate="no">False</code> 로 설정합니다.</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">다양한 배포에서 저장 경로 사용자 지정<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>메모리 매핑된 파일은 기본적으로 <code translate="no">localStorage.path</code> 내의 <code translate="no">/mmap</code> 디렉터리로 설정된다. 다음은 다양한 배포 방법에서 이 설정을 사용자 정의하는 방법이다:</p>
<ul>
<li>헬름 차트를 사용하여 설치한 Milvus의 경우:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># new-values.yaml</span>
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: <span class="hljs-literal">true</span>
           mmapDirPath: any/valid/path
        
helm upgrade &lt;milvus-release&gt; --reuse-values -f new-values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>밀버스 오퍼레이터를 사용하여 설치한 밀버스의 경우:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># patch.yaml</span>
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: <span class="hljs-literal">true</span>
        mmapDirPath: any/valid/path
      
 kubectl patch milvus &lt;milvus-name&gt; --patch-file patch.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>도커를 사용하여 설치한 Milvus의 경우:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">제한<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>로드된 컬렉션에 대해서는 메모리 매핑을 활성화할 수 없으므로 메모리 매핑을 활성화하기 전에 컬렉션이 릴리스되었는지 확인하세요.</p></li>
<li><p>DiskANN 또는 GPU 클래스 인덱스에는 메모리 매핑이 지원되지 않습니다.</p></li>
</ul>
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
    </button></h2><ul>
<li><p><strong>어떤 시나리오에서 메모리 매핑을 활성화하는 것이 좋나요? 이 기능을 활성화하면 어떤 장단점이 있나요?</strong></p>
<p>메모리 매핑은 메모리가 제한되어 있거나 성능 요구 사항이 보통인 경우에 사용하는 것이 좋습니다. 이 기능을 활성화하면 데이터 로딩 용량이 증가합니다. 예를 들어 CPU 2개와 8GB 메모리로 구성된 경우 메모리 매핑을 활성화하면 활성화하지 않을 때보다 최대 4배 더 많은 데이터를 로드할 수 있습니다. 성능에 미치는 영향은 다양합니다:</p>
<ul>
<li><p>메모리가 충분한 경우 예상되는 성능은 메모리만 사용할 때와 비슷합니다.</p></li>
<li><p>메모리가 부족하면 예상 성능이 저하될 수 있습니다.</p></li>
</ul></li>
<li><p><strong>컬렉션 수준과 인덱스 수준 구성의 관계는 무엇인가요?</strong></p>
<p>컬렉션 수준과 인덱스 수준은 포괄적인 관계가 아니며, 컬렉션 수준은 원본 데이터의 MMAP 사용 여부를 제어하는 반면 인덱스 수준은 벡터 인덱스 전용입니다.</p></li>
<li><p><strong>메모리 매핑에 권장되는 인덱스 유형이 있나요?</strong></p>
<p>예, mmap 활성화에는 HNSW가 권장됩니다. 이전에 HNSW, IVF_FLAT, IVF_PQ/SQ 시리즈 인덱스를 테스트한 결과, IVF 시리즈 인덱스의 성능은 심각하게 떨어졌지만 HNSW 인덱스의 경우 mmap을 켜도 성능 하락은 예상 범위 내에 있었습니다.</p></li>
<li><p><strong>메모리 매핑에는 어떤 종류의 로컬 스토리지가 필요하나요?</strong></p>
<p>고품질 디스크가 성능을 향상시키며, NVMe 드라이브가 선호되는 옵션입니다.</p></li>
<li><p><strong>스칼라 데이터를 메모리 매핑할 수 있나요?</strong></p>
<p>메모리 매핑은 스칼라 데이터에 적용할 수 있지만, 스칼라 필드에 구축된 인덱스에는 적용되지 않습니다.</p></li>
<li><p><strong>여러 수준에서 메모리 매핑 구성의 우선 순위는 어떻게 결정되나요?</strong></p>
<p>Milvus에서 메모리 매핑 구성이 여러 수준에 걸쳐 명시적으로 정의된 경우, 인덱스 수준과 컬렉션 수준 구성이 가장 높은 우선순위를 공유하고 그 다음으로는 클러스터 수준 구성이 그 뒤를 따릅니다.</p></li>
<li><p><strong>Milvus 2.3에서 업그레이드하면서 메모리 매핑 디렉터리 경로를 구성한 경우 어떻게 되나요?</strong></p>
<p>Milvus 2.3에서 업그레이드하면서 메모리 매핑 디렉터리 경로(<code translate="no">mmapDirPath</code>)를 구성한 경우 해당 구성이 유지되며 메모리 매핑 활성화 기본 설정(<code translate="no">mmapEnabled</code>)은 <code translate="no">true</code> 이 됩니다. 메타데이터를 마이그레이션하여 기존 메모리 매핑 파일의 구성을 동기화하는 것이 중요합니다. 자세한 내용은 <a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">메타데이터 마이그레이션을</a> 참조하세요.</p></li>
</ul>
