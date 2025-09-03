---
id: cohere-ranker.md
title: 코히어 랭커Compatible with Milvus 2.6.x
summary: >-
  코히어 랭커는 코히어의 강력한 재랭크 모델을 활용하여 시맨틱 재랭크를 통해 검색 관련성을 향상시킵니다. 강력한 API 인프라와 프로덕션
  환경에 최적화된 성능을 갖춘 엔터프라이즈급 재랭크 기능을 제공합니다.
beta: Milvus 2.6.x
---
<h1 id="Cohere-Ranker" class="common-anchor-header">코히어 랭커<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Cohere-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>코히어 랭커는 <a href="https://cohere.com/">코히어의</a> 강력한 재랭크 모델을 활용하여 시맨틱 재랭크를 통해 검색 관련성을 향상시킵니다. 강력한 API 인프라와 프로덕션 환경에 최적화된 성능을 갖춘 엔터프라이즈급 리랭크 기능을 제공합니다.</p>
<p>코히어 랭커는 특히 다음과 같은 애플리케이션에 유용합니다:</p>
<ul>
<li><p>최첨단 재랭크 모델을 통한 고품질의 의미론적 이해</p></li>
<li><p>프로덕션 워크로드를 위한 엔터프라이즈급 안정성 및 확장성</p></li>
<li><p>다양한 콘텐츠 유형에 걸친 다국어 재랭크 기능</p></li>
<li><p>속도 제한 및 오류 처리 기능이 내장된 일관된 API 성능</p></li>
</ul>
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
    </button></h2><p>Milvus에서 Cohere Ranker를 구현하기 전에 다음 사항을 충족해야 합니다:</p>
<ul>
<li><p>재랭크할 텍스트가 포함된 <code translate="no">VARCHAR</code> 필드가 있는 Milvus 컬렉션</p></li>
<li><p>재랭크 모델에 액세스할 수 있는 유효한 Cohere API 키. <a href="https://dashboard.cohere.com/">Cohere의 플랫폼에</a> 가입하여 API 자격 증명을 받습니다. 다음 중 하나를 선택할 수 있습니다:</p>
<ul>
<li><p><code translate="no">COHERE_API_KEY</code> 환경 변수를 설정하거나</p></li>
<li><p><a href="/docs/ko/cohere-ranker.md#Create-a-Cohere-ranker-function">랭커 구성의</a> <code translate="no">credential</code> 에서 직접 API 키를 지정합니다.</p></li>
</ul></li>
</ul>
<h2 id="Create-a-Cohere-ranker-function" class="common-anchor-header">Cohere 랭커 함수 생성하기<button data-href="#Create-a-Cohere-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스 애플리케이션에서 코히어 랭커를 사용하려면 재랭킹 작동 방식을 지정하는 함수 객체를 생성하세요. 이 함수는 Milvus 검색 작업에 전달되어 결과 순위를 향상시킵니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Configure Cohere Ranker</span>
cohere_ranker = Function(
    name=<span class="hljs-string">&quot;cohere_semantic_ranker&quot;</span>,          <span class="hljs-comment"># Unique identifier for your ranker</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],         <span class="hljs-comment"># VARCHAR field containing text to rerank</span>
    function_type=FunctionType.RERANK,      <span class="hljs-comment"># Must be RERANK for reranking functions</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,                <span class="hljs-comment"># Enables model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;cohere&quot;</span>,               <span class="hljs-comment"># Specifies Cohere as the service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;rerank-english-v3.0&quot;</span>, <span class="hljs-comment"># Cohere rerank model to use</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>], <span class="hljs-comment"># Query text for relevance evaluation</span>
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,       <span class="hljs-comment"># Optional: batch size for model service requests (default: 128)</span>
        <span class="hljs-string">&quot;max_tokens_per_doc&quot;</span>: <span class="hljs-number">4096</span>,         <span class="hljs-comment"># Optional: max tokens per document (default: 4096)</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;your-cohere-api-key&quot; # Optional: authentication credential for Cohere API</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Cohere-ranker-specific-parameters" class="common-anchor-header">Cohere 랭커별 파라미터<button data-href="#Cohere-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 파라미터는 Cohere 랭커에만 해당되는 파라미터입니다:</p>
<table>
   <tr>
     <th><p><strong>파라미터</strong></p></th>
     <th><p><strong>필수?</strong></p></th>
     <th><p><strong>설명</strong></p></th>
     <th><p><strong>값/예시</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>Yes</p></td>
     <td><p>모델 순위 재지정을 사용하려면 <code translate="no">"model"</code> 으로 설정해야 합니다.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>예</p></td>
     <td><p>재랭크에 사용할 모델 서비스 제공업체입니다.</p></td>
     <td><p><code translate="no">"cohere"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>예</p></td>
     <td><p>코히어 플랫폼에서 지원되는 모델 중 사용할 코히어 재랭크 모델입니다. 사용 가능한 재랭크 모델 목록은 <a href="https://docs.cohere.com/docs/rerank">코히어 설명서를</a> 참조하세요.</p></td>
     <td><p><code translate="no">"rerank-english-v3.0"</code>, <code translate="no">"rerank-multilingual-v3.0"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>예</p></td>
     <td><p>재랭크 모델에서 관련성 점수를 계산하는 데 사용하는 쿼리 문자열 목록입니다. 쿼리 문자열의 수는 검색 작업의 쿼리 수와 정확히 일치해야 하며(텍스트 대신 쿼리 벡터를 사용하는 경우에도 마찬가지), 그렇지 않으면 오류가 보고됩니다.</p></td>
     <td><p><em>["검색 쿼리"]</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>No</p></td>
     <td><p>모델 서비스가 모든 데이터를 한 번에 처리하지 못할 수 있으므로 여러 요청에서 모델 서비스에 액세스하기 위한 배치 크기를 설정합니다.</p></td>
     <td><p><code translate="no">128</code> (기본값)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_tokens_per_doc</code></p></td>
     <td><p>No</p></td>
     <td><p>문서당 최대 토큰 수입니다. 긴 문서는 지정된 토큰 수로 자동 잘립니다.</p></td>
     <td><p><code translate="no">4096</code> (기본값)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>아니요</p></td>
     <td><p>Cohere API 서비스에 액세스하기 위한 인증 자격증명. 지정하지 않으면 시스템에서 <code translate="no">COHERE_API_KEY</code> 환경 변수를 찾습니다.</p></td>
     <td><p><em>"your-cohere-api-key"</em></p></td>
   </tr>
</table>
<div class="alert note">
<p>모든 모델 랭커에서 공유되는 일반 파라미터(예: <code translate="no">provider</code>, <code translate="no">queries</code>)는 <a href="/docs/ko/model-ranker-overview.md#Create-a-model-ranker">모델 랭커 만들기를</a> 참조하세요.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">표준 벡터 검색에 적용하기<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>표준 벡터 검색에 코히어 랭커를 적용하려면 다음과 같이 하세요:</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with Cohere reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],  <span class="hljs-comment"># Search queries</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=cohere_ranker,                       <span class="hljs-comment"># Apply Cohere reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-to-hybrid-search" class="common-anchor-header">하이브리드 검색에 적용하기<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>코히어 랭커를 하이브리드 검색과 함께 사용하여 밀도 검색과 희소 검색 방법을 결합할 수도 있습니다:</p>
<div class="multipleCode">
   <a href="#bash">cURL</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-bash">from pymilvus import AnnSearchRequest

<span class="hljs-comment"># Configure dense vector search</span>
dense_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    <span class="hljs-built_in">limit</span>=5
)

<span class="hljs-comment"># Configure sparse vector search  </span>
sparse_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>, 
    param={},
    <span class="hljs-built_in">limit</span>=5
)

<span class="hljs-comment"># Execute hybrid search with Cohere reranking</span>
hybrid_results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    [dense_search, sparse_search],              <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=cohere_ranker,                      <span class="hljs-comment"># Apply Cohere reranking to combined results</span></span>
    <span class="hljs-built_in">limit</span>=5,                                   <span class="hljs-comment"># Final number of results</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
