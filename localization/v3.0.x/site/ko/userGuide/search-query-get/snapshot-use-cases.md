---
id: snapshot-use-cases.md
title: 스냅샷 사용 사례Compatible with Milvus 3.0.x
summary: 이 가이드에서는 스냅샷의 일반적인 사용 사례를 확인할 수 있습니다.
beta: Milvus 3.0.x
---
<h1 id="Snapshot-Use-Cases" class="common-anchor-header">스냅샷 사용 사례<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshot-Use-Cases" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 스냅샷의 일반적인 사용 사례를 확인할 수 있습니다.</p>
<h2 id="Data-backup-and-restoration" class="common-anchor-header">데이터 백업 및 복원<button data-href="#Data-backup-and-restoration" class="anchor-icon" translate="no">
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
    </button></h2><p>스냅샷은 특정 시점의 데이터를 빠르게 캡처한 것으로, 신속한 롤백이나 테스트(수일에서 수주)에 적합합니다. 반면, 백업은 독립적이고 완전한 복사본으로, 장기적인 재해 복구(수주에서 수년) 및 전체 스토리지 장애에 대한 보다 강력한 보호를 위해 별도로 저장됩니다.</p>
<p>다음 표에서는 스냅샷과 백업을 비교합니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>백업</p></th>
     <th><p>스냅샷</p></th>
   </tr>
   <tr>
     <td><p>백업 생성</p></td>
     <td><p>모든 데이터 파일을 복사합니다(시간이 많이 소요됨)</p></td>
     <td><p>메타데이터만 생성(밀리초 단위)</p></td>
   </tr>
   <tr>
     <td><p>복원</p></td>
     <td><p>데이터를 가져오고 인덱스를 재구축합니다</p></td>
     <td><p>기존 데이터 및 인덱스 파일만 복사</p></td>
   </tr>
   <tr>
     <td><p>성능</p></td>
     <td><p>느리고 리소스 소모가 큼</p></td>
     <td><p>빠르고 가볍습니다(몇 초에서 몇 분 소요)</p></td>
   </tr>
   <tr>
     <td><p>시스템에 미치는 영향</p></td>
     <td><p>I/O 및 CPU 사용량이 높음</p></td>
     <td><p>영향 최소화</p></td>
   </tr>
</table>
<p>스냅샷 생성은 일반적으로 밀리초 정도 소요되며, 복원은 데이터 양에 따라 몇 초에서 몇 분 정도 걸립니다.</p>
<p>스냅샷 제한, 제약 조건 및 시스템에 미치는 영향에 대한 자세한 내용은 <a href="/docs/ko/snapshots.md">스냅샷을</a> 참조하십시오.</p>
<h2 id="Data-processing-with-external-collections" class="common-anchor-header">외부 컬렉션을 사용한 데이터 처리<button data-href="#Data-processing-with-external-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>스냅샷은 분석 또는 검증 워크로드를 위한 안정적이고 특정 시점의 소스를 제공할 수 있습니다. Milvus 스냅샷의 경우, 스냅샷 파일을 일반 Spark 입력으로 직접 읽는 대신 ' <code translate="no">milvus-table</code> ' 외부 컬렉션 형식을 사용하십시오. Milvus 스냅샷에는 컬렉션 메타데이터, 세그먼트 매니페스트, 삭제 로그 및 기본 키 통계가 저장되므로, Milvus는 올바른 스키마와 삭제 세미오틱스를 유지하기 위해 스냅샷 메타데이터 JSON과 <code translate="no">milvus-table</code> 리더가 필요합니다.</p>
<p>이 워크플로는 스냅샷 데이터에 대해 쿼리 가능한 외부 컬렉션을 생성합니다. 주요 열 데이터는 스냅샷 소스에서 계속 참조되며, 새로 고침(refresh) 단계에서는 소스 StorageV3 매니페스트를 대상 외부 세그먼트로 매핑합니다.</p>
<h3 id="Step-1-Get-the-snapshot-metadata-path" class="common-anchor-header">1단계: 스냅샷 메타데이터 경로 확인<button data-href="#Step-1-Get-the-snapshot-metadata-path" class="anchor-icon" translate="no">
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
    </button></h3><p>일반 Milvus 컬렉션에서 스냅샷을 생성하거나 선택한 다음, 해당 스냅샷을 설명하여 오브젝트 스토리지 위치를 확인합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

snapshot_info = client.describe_snapshot(
    snapshot_name=<span class="hljs-string">&quot;analytics_snapshot_20260321&quot;</span>,
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

external_source = <span class="hljs-string">f&quot;s3://bucket/<span class="hljs-subst">{snapshot_info.s3_location}</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Create-and-refresh-a-milvus-table-external-collection" class="common-anchor-header">2단계: <code translate="no">milvus-table</code> 외부 컬렉션 생성 및 새로 고침<button data-href="#Step-2-Create-and-refresh-a-milvus-table-external-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>스키마가 스냅샷 소스 컬렉션과 일치하는 외부 컬렉션을 생성합니다. ‘ <code translate="no">external_spec.format</code> ’을 ‘ <code translate="no">&quot;milvus-table&quot;</code> ’로 설정하고, 각 대상 데이터 필드의 ‘ <code translate="no">external_field</code> ’을 해당 소스 필드 이름으로 설정합니다.</p>
<pre><code translate="no" class="language-python">schema = client.create_schema(
    external_source=external_source,
    external_spec=<span class="hljs-string">&quot;&quot;&quot;{
        &quot;format&quot;: &quot;milvus-table&quot;,
        &quot;extfs&quot;: {
            &quot;cloud_provider&quot;: &quot;aws&quot;,
            &quot;region&quot;: &quot;us-west-2&quot;,
            &quot;access_key_id&quot;: &quot;YOUR_ACCESS_KEY&quot;,
            &quot;access_key_value&quot;: &quot;YOUR_SECRET_KEY&quot;
        }
    }&quot;&quot;&quot;</span>,
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    external_field=<span class="hljs-string">&quot;id&quot;</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    external_field=<span class="hljs-string">&quot;embedding&quot;</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>,
    schema=schema,
)

job_id = client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>갱신이 완료된 후에는 인덱스를 생성하고, 외부 컬렉션을 로드하며, 스냅샷 기반 뷰에 대해 검색 또는 쿼리 작업을 실행할 수 있습니다.</p>
