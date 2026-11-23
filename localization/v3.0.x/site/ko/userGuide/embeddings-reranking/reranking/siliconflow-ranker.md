---
id: siliconflow-ranker.md
title: SiliconFlow RankerCompatible with Milvus 2.6.x
summary: >-
  SiliconFlow Ranker는 SiliconFlow의 포괄적인 재순위 지정 모델을 활용하여 의미 기반 재순위 지정을 통해 검색 관련성을
  높입니다. 이 제품은 유연한 문서 분할 기능을 제공하며, 다양한 공급업체의 광범위한 전문 재순위 지정 모델을 지원합니다.
beta: Milvus 2.6.x
---
<h1 id="SiliconFlow-Ranker" class="common-anchor-header">SiliconFlow Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#SiliconFlow-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>SiliconFlow Ranker는 <a href="https://www.siliconflow.com/">SiliconFlow의</a> 포괄적인 재순위 지정 모델을 활용하여 의미 기반 재순위 지정을 통해 검색 관련성을 향상시킵니다. 유연한 문서 분할 기능을 제공하며, 다양한 공급업체의 광범위한 전문 재순위 지정 모델을 지원합니다.</p>
<p>SiliconFlow Ranker는 특히 다음과 같은 기능이 필요한 애플리케이션에 유용합니다:</p>
<ul>
<li><p>긴 문서를 처리하기 위해 중첩 범위를 구성할 수 있는 고급 문서 청크 분할</p></li>
<li><p>BAAI/bge-reranker 시리즈 및 기타 특수 모델을 포함한 다양한 재순위 지정 모델에 대한 접근</p></li>
<li><p>가장 높은 점수를 받은 청크가 문서 점수를 나타내는 유연한 청크 기반 점수 산정</p></li>
<li><p>표준 및 프로 모델 변형을 모두 지원하는 비용 효율적인 재순위 지정</p></li>
</ul>
<h2 id="Prerequisites" class="common-anchor-header">필수 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 SiliconFlow Ranker를 구현하기 전에 다음 사항이 준비되어 있는지 확인하십시오:</p>
<ul>
<li><p>재순위를 지정할 텍스트가 포함된 ‘ <code translate="no">VARCHAR</code> ’ 필드가 있는 Milvus 컬렉션</p></li>
<li><p>재순위 지정 모델에 대한 액세스 권한이 있는 유효한 SiliconFlow API 키. <a href="https://www.siliconflow.com/">SiliconFlow 플랫폼에</a> 가입하여 API 자격 증명을 발급받으십시오. 다음 방법 중 하나를 사용할 수 있습니다:</p>
<ul>
<li><p><code translate="no">SILICONFLOW_API_KEY</code> 환경 변수를 설정하거나,</p></li>
<li><p>랭커 구성에서 API 키를 직접 지정</p></li>
</ul></li>
</ul>
<h2 id="Create-a-SiliconFlow-ranker-function" class="common-anchor-header">SiliconFlow 랭커 함수 생성<button data-href="#Create-a-SiliconFlow-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 애플리케이션에서 SiliconFlow Ranker를 사용하려면, 재순위가 어떻게 작동해야 하는지 지정하는 Function 객체를 생성하십시오. 이 함수는 결과 순위를 향상시키기 위해 Milvus 검색 작업에 전달됩니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Configure SiliconFlow Ranker</span>
siliconflow_ranker = Function(
    name=<span class="hljs-string">&quot;siliconflow_semantic_ranker&quot;</span>,     <span class="hljs-comment"># Unique identifier for your ranker</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],         <span class="hljs-comment"># VARCHAR field containing text to rerank</span>
    function_type=FunctionType.RERANK,      <span class="hljs-comment"># Must be RERANK for reranking functions</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,                <span class="hljs-comment"># Enables model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;siliconflow&quot;</span>,          <span class="hljs-comment"># Specifies SiliconFlow as the service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;BAAI/bge-reranker-v2-m3&quot;</span>, <span class="hljs-comment"># SiliconFlow reranking model to use</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>], <span class="hljs-comment"># Query text for relevance evaluation</span>
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,       <span class="hljs-comment"># Optional: batch size for model service requests (default: 128)</span>
        <span class="hljs-string">&quot;max_chunks_per_doc&quot;</span>: <span class="hljs-number">5</span>,            <span class="hljs-comment"># Optional: max chunks per document for supported models</span>
        <span class="hljs-string">&quot;overlap_tokens&quot;</span>: <span class="hljs-number">50</span>,               <span class="hljs-comment"># Optional: token overlap between chunks for supported models</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;your-siliconflow-api-key&quot; # Optional: if not set, uses SILICONFLOW_API_KEY env var</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                       .functionType(FunctionType.RERANK)
                       .name(<span class="hljs-string">&quot;siliconflow_semantic_ranker&quot;</span>)
                       .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
                       .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;model&quot;</span>)
                       .param(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;siliconflow&quot;</span>)
                       .param(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;BAAI/bge-reranker-v2-m3&quot;</span>)
                       .param(<span class="hljs-string">&quot;queries&quot;</span>, <span class="hljs-string">&quot;[\&quot;renewable energy developments\&quot;]&quot;</span>)
                       .param(<span class="hljs-string">&quot;endpoint&quot;</span>, <span class="hljs-string">&quot;http://localhost:8080&quot;</span>)
                       .param(<span class="hljs-string">&quot;max_client_batch_size&quot;</span>, <span class="hljs-string">&quot;32&quot;</span>)
                       .param(<span class="hljs-string">&quot;max_chunks_per_doc&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>)
                       .param(<span class="hljs-string">&quot;overlap_tokens&quot;</span>, <span class="hljs-string">&quot;50&quot;</span>)
                       .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

ranker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;siliconflow_semantic_ranker&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithInputFields(<span class="hljs-string">&quot;document&quot;</span>).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;model&quot;</span>).
    WithParam(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;siliconflow&quot;</span>).
    WithParam(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;BAAI/bge-reranker-v2-m3&quot;</span>).
    WithParam(<span class="hljs-string">&quot;queries&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;renewable energy developments&quot;</span>}).
    WithParam(<span class="hljs-string">&quot;max_client_batch_size&quot;</span>, <span class="hljs-number">128</span>).
    WithParam(<span class="hljs-string">&quot;max_chunks_per_doc&quot;</span>, <span class="hljs-number">5</span>).
    WithParam(<span class="hljs-string">&quot;overlap_tokens&quot;</span>, <span class="hljs-number">50</span>)

schema := entity.NewSchema().
    WithName(<span class="hljs-string">&quot;your_collection&quot;</span>).
    WithDynamicFieldEnabled(<span class="hljs-literal">false</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">65535</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;dense_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">768</span>))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;your_collection&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;your_collection&quot;,
    &quot;schema&quot;: {
        &quot;autoID&quot;: false,
        &quot;enableDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;document&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 65535
                }
            },
            {
                &quot;fieldName&quot;: &quot;dense_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: 768
                }
            }
        ]
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SiliconFlow-ranker-specific-parameters" class="common-anchor-header">SiliconFlow 랭커 전용 매개변수<button data-href="#SiliconFlow-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 매개변수는 SiliconFlow 랭커에 특화된 것입니다:</p>
<table>
   <tr>
     <th><p><strong>매개변수</strong></p></th>
     <th><p><strong>필수?</strong></p></th>
     <th><p><strong>설명</strong></p></th>
     <th><p><strong>값 / 예시</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>예</p></td>
     <td><p>모델 재순위를 활성화하려면 <code translate="no">"model"</code> 로 설정해야 합니다.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>예</p></td>
     <td><p>재순위 지정에 사용할 모델 서비스 제공자입니다.</p></td>
     <td><p><code translate="no">"siliconflow"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>예</p></td>
     <td><p>SiliconFlow 플랫폼에서 지원되는 모델 중 사용할 SiliconFlow 재순위 지정 모델입니다.</p><p>사용 가능한 재순위 지정 모델 목록은 <a href="https://docs.siliconflow.cn/en/api-reference/rerank/create-rerank">SiliconFlow 문서를</a> 참조하십시오.</p></td>
     <td><p><code translate="no">"BAAI/bge-reranker-v2-m3"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>예</p></td>
     <td><p>재순위 지정 모델이 관련성 점수를 계산하는 데 사용하는 쿼리 문자열 목록입니다. 쿼리 문자열의 수는 검색 작업에 포함된 쿼리 수와 정확히 일치해야 합니다(텍스트 대신 쿼리 벡터를 사용하는 경우에도 마찬가지). 그렇지 않으면 오류가 보고됩니다.</p></td>
     <td><p><em>["검색 쿼리"]</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>아니요</p></td>
     <td><p>모델 서비스가 모든 데이터를 한 번에 처리하지 못할 수 있으므로, 이 설정은 여러 요청에 걸쳐 모델 서비스에 액세스할 때의 배치 크기를 지정합니다.</p></td>
     <td><p><code translate="no">128</code> (기본값)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_chunks_per_doc</code></p></td>
     <td><p>아니요</p></td>
     <td><p>문서 내에서 생성되는 청크의 최대 개수입니다. 긴 문서는 계산을 위해 여러 청크로 나뉘며, 청크 중 가장 높은 점수가 문서의 점수로 채택됩니다. 특정 모델( <code translate="no">BAAI/bge-reranker-v2-m3</code>, <code translate="no">Pro/BAAI/bge-reranker-v2-m3</code>, <code translate="no">netease-youdao/bce-reranker-base_v1</code>)에서만 지원됩니다.</p></td>
     <td><p><code translate="no">5</code>, <code translate="no">10</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">overlap_tokens</code></p></td>
     <td><p>아니요</p></td>
     <td><p>문서를 청크로 분할할 때 인접한 청크 간의 토큰 중복 수입니다. 이를 통해 청크 경계 간 연속성을 보장하여 더 나은 의미적 이해를 돕습니다. 다음 특정 모델에서만 지원됩니다: <code translate="no">BAAI/bge-reranker-v2-m3</code>, <code translate="no">Pro/BAAI/bge-reranker-v2-m3</code> 및 <code translate="no">netease-youdao/bce-reranker-base_v1</code>.</p></td>
     <td><p><code translate="no">50</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>아니요</p></td>
     <td><p>SiliconFlow API 서비스에 액세스하기 위한 인증 자격 증명입니다. 지정하지 않으면 시스템은 <code translate="no">SILICONFLOW_API_KEY</code> 환경 변수를 확인합니다.</p></td>
     <td><p><em>"your-siliconflow-api-key"</em></p></td>
   </tr>
</table>
<p><strong>모델별 기능 지원</strong>: <code translate="no">max_chunks_per_doc</code> 및 <code translate="no">overlap_tokens</code> 매개변수는 특정 모델에서만 지원됩니다. 다른 모델을 사용할 경우, 이러한 매개변수는 무시됩니다.</p>
<div class="alert note">
<p>모든 모델 랭커에서 공통으로 사용되는 일반 매개변수(예: <code translate="no">provider</code>, <code translate="no">queries</code>)에 대해서는 <a href="/docs/ko/model-ranker-overview.md#Create-a-model-ranker">모델 랭커 만들기를</a> 참조하십시오.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">표준 벡터 검색에 적용<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>SiliconFlow Ranker를 표준 벡터 검색에 적용하려면:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with SiliconFlow reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[your_query_vector],  <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=siliconflow_ranker,                  <span class="hljs-comment"># Apply SiliconFlow reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection&quot;</span>)
        .data(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;AI Research Progress&quot;</span>), <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;What is AI&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">functionScore := entity.NewFunctionScore().AddFunction(ranker)

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;your_collection&quot;</span>, <span class="hljs-comment">// collection name</span>
    <span class="hljs-number">5</span>,           <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(yourQueryVector)},
).WithANNSField(<span class="hljs-string">&quot;dense_vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>).
    WithFunctionScore(functionScore).
    WithConsistencyLevel(entity.ClBounded))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

fmt.Println(resultSets)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># The ranker configuration is passed with the search request</span>
<span class="hljs-built_in">export</span> rankerFunction=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;siliconflow_semantic_ranker&quot;,
    &quot;type&quot;: &quot;Rerank&quot;,
    &quot;inputFieldNames&quot;: [
        &quot;document&quot;
    ],
    &quot;outputFieldNames&quot;: [],
    &quot;params&quot;: {
        &quot;reranker&quot;: &quot;model&quot;,
        &quot;provider&quot;: &quot;siliconflow&quot;,
        &quot;model_name&quot;: &quot;BAAI/bge-reranker-v2-m3&quot;,
        &quot;queries&quot;: [
            &quot;renewable energy developments&quot;
        ],
        &quot;max_client_batch_size&quot;: 128,
        &quot;max_chunks_per_doc&quot;: 5,
        &quot;overlap_tokens&quot;: 50
    }
}&#x27;</span>

<span class="hljs-comment"># A query vector matching the collection dimension</span>
<span class="hljs-built_in">export</span> QUERY_VECTOR=$(jq -n <span class="hljs-string">&#x27;[range(768) | 0.01]&#x27;</span>)

request=$(jq -n \
--argjson vec <span class="hljs-string">&quot;<span class="hljs-variable">$QUERY_VECTOR</span>&quot;</span> \
--argjson fn <span class="hljs-string">&quot;<span class="hljs-variable">$rankerFunction</span>&quot;</span> \
<span class="hljs-string">&#x27;{
    collectionName: &quot;your_collection&quot;,
    data: [$vec],
    annsField: &quot;dense_vector&quot;,
    limit: 5,
    outputFields: [&quot;document&quot;],
    consistencyLevel: &quot;Bounded&quot;,
    functionScore: {functions: [$fn]}
}&#x27;</span>)

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;<span class="hljs-variable">$request</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
