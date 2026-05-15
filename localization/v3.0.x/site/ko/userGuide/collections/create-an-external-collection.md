---
id: create-an-external-collection.md
title: 외부 컬렉션 만들기Compatible with Milvus 3.0.x
summary: >-
  외부 컬렉션은 Milvus에 데이터를 복사하지 않고 외부 스토리지 시스템이나 AWS S3 및 Iceberg와 같은 데이터베이스 테이블에서
  데이터에 액세스하는 Milvus의 데이터 컬렉션 유형입니다. Milvus 쿼리 인터페이스와의 호환성을 유지하면서 데이터 레이크에 대한 쿼리
  레이어 역할을 합니다.
beta: Milvus 3.0.x
---
<h1 id="Create-an-External-Collection" class="common-anchor-header">외부 컬렉션 만들기<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Create-an-External-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>외부 컬렉션은 Milvus에 데이터를 복사하지 않고 외부 스토리지 시스템이나 AWS S3, Iceberg와 같은 데이터베이스 테이블의 데이터에 액세스하는 Milvus의 데이터 컬렉션 유형입니다. Milvus 쿼리 인터페이스와의 호환성을 유지하면서 데이터 레이크에 대한 쿼리 레이어 역할을 합니다.</p>
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
    </button></h2><p>일반적인 AI 데이터 파이프라인에서, 사용자는 이미 AWS S3와 같은 스토리지 시스템에 Parquet 또는 다른 형식으로 데이터를 저장했을 수 있습니다. Milvus가 외부에 저장된 데이터를 사용하려면 일반적으로 사용자는 추출-변환-로드(ETL) 파이프라인을 사용해 데이터를 Milvus의 자체 스토리지로 가져와야 합니다.</p>
<p>이러한 데이터 가져오기 워크플로우는 동기화하기 어려운 중복 데이터를 생성하고 데이터 일관성을 보장하기 위한 엔지니어링 유지 관리 부담을 가중시킵니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/external-collection-bring-data-to-compute.png" alt="Bring data to compute workflow" class="doc-image" id="bring-data-to-compute-workflow" />
   </span> <span class="img-wrapper"> <span>데이터 가져오기를 통한 워크플로우 계산</span> </span></p>
<p>이러한 문제를 해결하기 위해 Milvus는 데이터 동기화 및 ETL 파이프라인에 대한 걱정 없이 Milvus에서 외부에 저장된 데이터에 액세스할 수 있는 외부 컬렉션을 제공합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/external-collection-bring-compute-to-data.png" alt="Bring compute to data workflow" class="doc-image" id="bring-compute-to-data-workflow" />
   </span> <span class="img-wrapper"> <span>데이터 워크플로우에 컴퓨팅 도입</span> </span></p>
<p>외부 컬렉션이 생성되면 데이터에 직접 액세스하여 데이터를 저장하는 동일한 위치에 보관할 수 있습니다. 밀버스는 백그라운드에서 매니페스트 파일을 생성하여 밀버스 메타데이터와 외부 데이터 파일의 행 간의 매핑을 기록합니다. 매니페스트 파일이 준비되면 관리되는 컬렉션에서와 마찬가지로 외부 컬렉션에 인덱스를 만들 수 있습니다.</p>
<p>데이터가 변경되면 1초 미만의 새로 고침을 수동으로 트리거하면 메타데이터가 업데이트되어 Milvus가 항상 최신 상태로 유지됩니다.</p>
<h2 id="Step-1-Create-schema" class="common-anchor-header">1단계: 스키마 만들기<button data-href="#Step-1-Create-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>관리 컬렉션을 만들 때와 마찬가지로 외부 컬렉션을 만들기 전에 스키마도 만들어야 합니다. 그러나 스키마는 관리되는 컬렉션의 스키마와 약간 다릅니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema(
    external_source=<span class="hljs-string">&#x27;s3://s3.&lt;region-id&gt;.amazonaws.com/&lt;bucket&gt;/&#x27;</span>,
    external_spec=<span class="hljs-string">&#x27;{
        &quot;format&quot;: &quot;parquet&quot;,
        &quot;extfs&quot;: {
            ...
        }
    }&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">externalSpec</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
externalSpec.addProperty(<span class="hljs-string">&quot;format&quot;</span>, <span class="hljs-string">&quot;parquet&quot;</span>);
externalSpec.add(<span class="hljs-string">&quot;extfs&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .externalSource(<span class="hljs-string">&quot;s3://s3.&lt;region-id&gt;.amazonaws.com/&lt;bucket&gt;/&quot;</span>)
        .externalSpec(externalSpec)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

schema := entity.NewSchema().
    WithName(<span class="hljs-string">&quot;product_embeddings&quot;</span>).
    WithExternalSource(<span class="hljs-string">&quot;s3://my-bucket/embeddings/&quot;</span>).
    WithExternalSpec(<span class="hljs-string">`{&quot;format&quot;: &quot;parquet&quot;, &quot;extfs&quot;: { ... }}`</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;product_id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;dataType&quot;: &quot;FloatVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: &quot;768&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;product_name&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 512
            }
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>외부 컬렉션의 스키마를 만들려면 소스 데이터 URI, 데이터 형식 및 인증 설정을 지정해야 합니다.</p>
<table>
   <tr>
     <th><p>매개변수 이름</p></th>
     <th><p>매개변수 설명</p></th>
     <th><p>예제 값</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">format</code></p></td>
     <td><p>대상 소스 데이터 파일의 형식입니다.</p></td>
     <td><p><code translate="no">parquet</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">snapshot_id</code></p></td>
     <td><p>유효한 Iceberg 테이블 스냅샷 ID입니다. 이 매개변수는 <code translate="no">format</code> 을 <code translate="no">iceberg_table</code> 으로 설정한 경우에만 적용됩니다.</p></td>
     <td><p><code translate="no">473984310232959286</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs</code></p></td>
     <td><p>문자열화된 JSON 구조의 외부 파일 시스템 설정.</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<p><details summary="Authentication Options"></p>
<p>인증 설정을 설정하는 옵션은 다음과 같습니다:</p>
<h3 id="Use-AWS-AKSK" class="common-anchor-header">AWS AK/SK 사용<button data-href="#Use-AWS-AKSK" class="anchor-icon" translate="no">
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
    </button></h3><p>이 옵션은 자체 호스팅 MinIO 또는 업무용 AK/SK가 있는 시나리오에 적용됩니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;access_key_id&quot;</span><span class="hljs-punctuation">:</span>     <span class="hljs-string">&quot;AKIA..&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;access_key_value&quot;</span><span class="hljs-punctuation">:</span>  <span class="hljs-string">&quot;u4Lh...&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;region&quot;</span><span class="hljs-punctuation">:</span>            <span class="hljs-string">&quot;us-west-2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;cloud_provider&quot;</span><span class="hljs-punctuation">:</span>    <span class="hljs-string">&quot;aws&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_ssl&quot;</span><span class="hljs-punctuation">:</span>           <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_virtual_host&quot;</span><span class="hljs-punctuation">:</span>  <span class="hljs-string">&quot;true&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>매개변수 이름</p></th>
     <th><p>매개변수 설명</p></th>
     <th><p>예제 값</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.access_key_id</code></p></td>
     <td><p>액세스 키 ID</p></td>
     <td><p><code translate="no">AKIA...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.access_key_value</code></p></td>
     <td><p>액세스 키 값</p></td>
     <td><p><code translate="no">u7LH...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>클라우드 지역 ID</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>클라우드 공급자 ID</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>SSL을 사용하여 연결을 설정할지 여부입니다.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_virtual_host</code></p></td>
     <td><p>버킷 액세스를 위해 가상 호스팅을 사용할지 여부입니다.</p><p>자세한 내용은 <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">이 문서를</a> 참조하세요.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<h3 id="Use-AWS-IAM" class="common-anchor-header">AWS IAM 사용<button data-href="#Use-AWS-IAM" class="anchor-icon" translate="no">
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
    </button></h3><p>이 옵션은 Milvus가 EC2 인스턴스 또는 EKS 클러스터에서 실행되는 시나리오에 적용됩니다. 이 경우 AK/SK를 하드코딩할 필요가 없습니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;use_iam&quot;</span><span class="hljs-punctuation">:</span>           <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;iam_endpoint&quot;</span><span class="hljs-punctuation">:</span>      <span class="hljs-string">&quot;https://sts.&lt;region&gt;.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;region&quot;</span><span class="hljs-punctuation">:</span>            <span class="hljs-string">&quot;us-west-2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;cloud_provider&quot;</span><span class="hljs-punctuation">:</span>    <span class="hljs-string">&quot;aws&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_ssl&quot;</span><span class="hljs-punctuation">:</span>           <span class="hljs-string">&quot;true&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>파라미터 이름</p></th>
     <th><p>파라미터 설명</p></th>
     <th><p>예제 값</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_iam</code></p></td>
     <td><p>AWS IAM 사용 여부.</p><p>이 옵션의 경우 <code translate="no">"true"</code> 로 설정합니다.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.iam_endpoint</code></p></td>
     <td><p>유효한 AWS STS 엔드포인트입니다. </p><p>자세한 내용은 <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_region-endpoints.html">이 문서를</a> 참조하세요.</p></td>
     <td><p><code translate="no">https:&ast;//&ast;sts.&lt;region&gt;.amazonaws.com</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>클라우드 리전 ID</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>클라우드 공급자 ID</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>연결 설정에 SSL을 사용할지 여부입니다.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
</table>
<h3 id="Use-Milvus-global-credentials" class="common-anchor-header">Milvus 글로벌 자격 증명 사용<button data-href="#Use-Milvus-global-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>이 옵션은 Milvus 버킷에 외부 데이터를 저장할 때 적용되며, <code translate="no">milvus.yaml</code> 에 지정된 글로벌 MinIO 설정을 사용하여 데이터에 직접 액세스할 수 있습니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;storage_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;remote&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-IAM-Role-ARN" class="common-anchor-header">IAM 역할 ARN 사용<button data-href="#Use-IAM-Role-ARN" class="anchor-icon" translate="no">
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
    </button></h3><p>이 옵션은 조직에서 서로 다른 AWS 계정을 사용하여 Milvus 클러스터와 대상 데이터 파일을 보관하는 버킷을 관리하는 경우에 적용됩니다.</p>
<p>이 경우 버킷 소유자는 다음과 같은 IAM 역할을 만들어야 합니다.</p>
<ul>
<li><p><code translate="no">AmazonS3FullAccess</code> 또는 버킷 액세스에 대한 보다 세분화된 정책을 첨부합니다.</p></li>
<li><p>역할의 신뢰 정책의 조건 필드에 자체 정의된 <code translate="no">sts:ExternalId</code> 을 포함합니다.</p></li>
</ul>
<p>그런 다음 버킷 소유자가 IAM 역할 ARN과 외부 ID를 제공해야 해당 값으로 <code translate="no">sts:AssumeRole</code> 을 호출하여 IAM 역할을 맡을 수 있습니다.</p>
<p>다음은 허용된 권한과 함께 IAM 역할에 첨부할 권한 정책의 예시입니다. 요구 사항에 맞게 이를 조정할 수 있습니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                <span class="hljs-string">&quot;s3:ListBucket&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-string">&quot;s3:GetBucketLocation&quot;</span>
            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::SOURCE-DATA-BUCKET&quot;</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                <span class="hljs-string">&quot;s3:GetObject&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-string">&quot;s3:PutObject&quot;</span><span class="hljs-punctuation">,</span>
                <span class="hljs-string">&quot;s3:DeleteObject&quot;</span>
            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::SOURCE-DATA-BUCKET/*&quot;</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>그리고 IAM 역할과 연결된 신뢰 정책은 해당 역할을 맡을 수 있는 사람을 정의합니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Principal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;AWS&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::ACCOUNT_RUNNING_MILVUS:root&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sts:AssumeRole&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Condition&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;StringEquals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;sts:ExternalId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;YOUR_UNIQUE_EXTERNAL_ID&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>IAM 역할 ARN과 외부 ID를 얻은 후에는 다음과 같이 <code translate="no">external_spec</code> 매개 변수를 설정할 수 있습니다:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;extfs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;cloud_provider&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;aws&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;region&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;us-west-2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;storage_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;remote&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_ssl&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;use_iam&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;role_arn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::306787000000:role/lentitude-bucket-role&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;external_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;YOUR_UNIQUE_EXTERNAL_ID&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;load_frequency&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;900&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>매개 변수 이름</p></th>
     <th><p>매개 변수 설명</p></th>
     <th><p>예제 값</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.cloud_provider</code></p></td>
     <td><p>클라우드 공급자 ID</p></td>
     <td><p><code translate="no">aws</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.region</code></p></td>
     <td><p>클라우드 리전 ID</p></td>
     <td><p><code translate="no">us-west-2</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_ssl</code></p></td>
     <td><p>SSL을 사용하여 연결을 설정할지 여부입니다.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.use_iam</code></p></td>
     <td><p>AWS IAM 사용 여부.</p><p>이 옵션의 경우 <code translate="no">"true"</code> 로 설정합니다.</p></td>
     <td><p><code translate="no">true</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.role_arn</code></p></td>
     <td><p>버킷 소유자로부터 얻은 IAM 역할 ARN입니다.</p></td>
     <td><p><code translate="no">arn:aws:iam::306787000000:role/...</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.external_id</code></p></td>
     <td><p>버킷 소유자로부터 얻은 외부 ID.</p></td>
     <td><p>--</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">extfs.load_frequency</code></p></td>
     <td><p>Milvus가 임시 인증 자격 증명을 검색하는 간격(초)입니다.</p></td>
     <td><p><code translate="no">900</code></p></td>
   </tr>
</table>
<p></details></p>
<h2 id="Step-2-Add-fields" class="common-anchor-header">2단계: 필드 추가<button data-href="#Step-2-Add-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>스키마가 준비되면 다음과 같이 필드를 추가할 수 있습니다:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;product_id&quot;</span>,
    datatype=DataType.INT64,
    <span class="hljs-comment"># highlight-next</span>
    external_field=<span class="hljs-string">&quot;id&quot;</span> <span class="hljs-comment"># field name in the external data file</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;product_name&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
    <span class="hljs-comment"># highlight-next</span>
    external_field=<span class="hljs-string">&quot;name&quot;</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    <span class="hljs-comment"># highlight-next</span>
    external_field=<span class="hljs-string">&quot;vector&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_id&quot;</span>)
        .dataType(DataType.Int64)
        .externalField(<span class="hljs-string">&quot;id&quot;</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_name&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .externalField(<span class="hljs-string">&quot;name&quot;</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .externalField(<span class="hljs-string">&quot;vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

schema = schema.
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;product_id&quot;</span>).
            WithDataType(entity.FieldTypeInt64).
            WithExternalField(<span class="hljs-string">&quot;id&quot;</span>),
    ).
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;product_name&quot;</span>).
            WithDataType(entity.FieldTypeVarChar).
            WithMaxLength(<span class="hljs-number">512</span>).
            WithExternalField(<span class="hljs-string">&quot;name&quot;</span>),
    ).
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
            WithDataType(entity.FieldTypeFloatVector).
            WithDim(<span class="hljs-number">768</span>).
            WithExternalField(<span class="hljs-string">&quot;vector&quot;</span>),
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;externalSource\&quot;: \&quot;volume://my_volume/path/to/a/folder\&quot;,
    \&quot;externalSpec\&quot;: \&quot;{\\\&quot;format\\\&quot;: \\\&quot;parquet\\\&quot;}\&quot;,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Create-a-collection" class="common-anchor-header">3단계: 컬렉션 만들기<button data-href="#Step-3-Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>스키마에 모든 필드를 추가한 후 외부 컬렉션을 만들 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(createReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    client <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey: token
})

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;test_collection&quot;</span>, schema))

<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${PROJECT_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;dbName\&quot;: \&quot;my_database\&quot;,
    \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Create-indexes" class="common-anchor-header">4단계: 인덱스 생성<button data-href="#Step-4-Create-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>관리되는 컬렉션에서와 마찬가지로 외부 컬렉션 열에 대한 인덱스를 만들 수 있습니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="hljs-comment"># Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;product_name&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>
)
client.create_index(
    db_name=<span class="hljs-string">&quot;my_database&quot;</span>,
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForIdField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;product_name&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build();
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();
List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
        .dbName(<span class="hljs-string">&quot;my_database&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .indexParams(indexParams)
        .build();
client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

collectionName := <span class="hljs-string">&quot;test_collection&quot;</span>
indexOptions := []milvusclient.CreateIndexOption{
    milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;embedding&quot;</span>, index.NewAutoIndex(entity.COSINE)),
    milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;product_name&quot;</span>, index.NewAutoIndex(index.AUTOINDEX)),
}
indexTask, err := client.CreateIndex(ctx, indexOptions)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handler err</span>
}
err = indexTask.Await(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handler err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database&quot;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;product_name&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>
})
client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&quot;my_database&quot;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;product_name&quot;,
            &quot;indexName&quot;: &quot;my_id&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${PROJECT_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;dbName\&quot;: \&quot;my_database\&quot;,
    \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Refresh-data" class="common-anchor-header">5단계: 데이터 새로 고침<button data-href="#Step-5-Refresh-data" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션이 준비되면 컬렉션을 새로 고쳐 데이터에 대한 메타데이터와 인덱스를 만듭니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">job_id = client.refresh_external_collection(
    db_name=<span class="hljs-string">&quot;my_database&quot;</span>,
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>
)
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    progress = client.get_refresh_external_collection_progress(job_id=job_id)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{progress.state}</span>: <span class="hljs-subst">{progress.progress}</span>%&quot;</span>)
    <span class="hljs-keyword">if</span> progress.state == <span class="hljs-string">&quot;RefreshCompleted&quot;</span>:
        elapsed = progress.end_time - progress.start_time
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Completed in <span class="hljs-subst">{elapsed}</span>ms&quot;</span>)
        <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">elif</span> progress.state == <span class="hljs-string">&quot;RefreshFailed&quot;</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Failed: <span class="hljs-subst">{progress.reason}</span>&quot;</span>)
        <span class="hljs-keyword">break</span>
    time.sleep(<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.GetRefreshExternalCollectionProgressReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.ListRefreshExternalCollectionJobsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.RefreshExternalCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.GetRefreshExternalCollectionProgressResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.ListRefreshExternalCollectionJobsResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.RefreshExternalCollectionJobInfo;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.RefreshExternalCollectionResp;

<span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-type">GetRefreshExternalCollectionProgressResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.getRefreshExternalCollectionProgress(
            GetRefreshExternalCollectionProgressReq.builder()
                    .jobId(jobId)
                    .build());
    <span class="hljs-type">RefreshExternalCollectionJobInfo</span> <span class="hljs-variable">jobInfo</span> <span class="hljs-operator">=</span> resp.getJobInfo();
    <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;RefreshCompleted&quot;</span>.equals(jobInfo.getState())) {
        <span class="hljs-type">long</span> <span class="hljs-variable">elapsed</span> <span class="hljs-operator">=</span> jobInfo.getEndTime() - jobInfo.getStartTime();
        System.out.printf(<span class="hljs-string">&quot;  Refresh completed in %dms%n&quot;</span>, elapsed);
        <span class="hljs-keyword">break</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;RefreshFailed&quot;</span>.equals(jobInfo.getState())) {
        System.out.printf(<span class="hljs-string">&quot;  Refresh failed: %s%n&quot;</span>, jobInfo.getReason());
    }
    TimeUnit.SECONDS.sleep(<span class="hljs-number">2</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">refreshResult, err := client.RefreshExternalCollection(ctx,
    client.NewRefreshExternalCollectionOption(<span class="hljs-string">&quot;test_collection&quot;</span>))
jobID := refreshResult.JobID
<span class="hljs-keyword">for</span> {
    progress, _ := client.GetRefreshExternalCollectionProgress(ctx,
        client.NewGetRefreshExternalCollectionProgressOption(jobID))
    fmt.Printf(<span class="hljs-string">&quot;State: %s\n&quot;</span>, progress.State)
    <span class="hljs-keyword">if</span> progress.State == entity.RefreshStateCompleted {
        fmt.Println(<span class="hljs-string">&quot;Refresh completed!&quot;</span>)
        <span class="hljs-keyword">break</span>
    }
    <span class="hljs-keyword">if</span> progress.State == entity.RefreshStateFailed {
        fmt.Printf(<span class="hljs-string">&quot;Refresh failed: %s\n&quot;</span>, progress.Reason)
        <span class="hljs-keyword">break</span>
    }
    time.Sleep(<span class="hljs-number">2</span> * time.Second)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${PROJECT_ENDPOINT}</span>/v2/vectordb/jobs/external_collection/refresh&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;dbName\&quot;: \&quot;my_database\&quot;,
    \&quot;collectionName\&quot;: \&quot;test_collection\&quot;,
    \&quot;externalSource\&quot;: \&quot;volume://my_volume/path/to/a/folder\&quot;,
    \&quot;externalSpec\&quot;: \&quot;{\\\&quot;format\\\&quot;: \\\&quot;parquet\\\&quot;}\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>새로 고침 작업은 비동기적이므로 진행 상황을 모니터링하기 위해 반복을 설정해야 합니다.</p>
<div class="alert note">
<ul>
<li><p>새로 고침 작업은 데이터 파일의 메타데이터를 스캔하고 그에 따라 매니페스트 파일을 생성합니다. 일반적으로 150-250ms가 소요됩니다.</p></li>
<li><p>매니페스트 파일은 Milvus의 메타데이터와 외부 파일의 행 간의 매핑을 기록합니다.</p></li>
<li><p>소스 데이터에 업데이트가 있는 경우 수동으로 새로 고침을 다시 호출하여 Milvus를 최신 상태로 유지해야 합니다.</p></li>
<li><p>삽입 없이 모든 활성 메타데이터를 제거해야 하는 새로 고침은 거부됩니다.</p></li>
</ul>
</div>
<h2 id="Follow-ups" class="common-anchor-header">후속 조치<button data-href="#Follow-ups" class="anchor-icon" translate="no">
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
    </button></h2><p>외부 컬렉션을 새로 고친 후에는 관리되는 컬렉션에서와 마찬가지로 컬렉션을 로드 및 해제하고 외부 컬렉션에서 유사성 검색 및 쿼리를 수행할 수 있지만, 온디맨드 컴퓨팅용 데이터베이스의 컬렉션은 검색 및 쿼리를 위해 온디맨드 클러스터에 연결해야 한다는 점을 제외하고는 그렇지 않습니다.</p>
<p>검색, 쿼리, 가져오기 및 하이브리드 검색과 같은 DQL 작업을 수행하기 전에 먼저 세션을 만들어 온디맨드 클러스터의 컴퓨팅 리소스를 연결해야 합니다.</p>
