---
id: embed-with-jina.md
order: 8
summary: >-
  이 문서에서는 JinaEmbeddingFunction을 사용하여 Jina AI 임베딩 모델을 사용하여 문서와 쿼리를 인코딩하는 방법을
  설명합니다.
title: Jina AI - 임베드
---
<h1 id="Jina-AI" class="common-anchor-header">Jina AI<button data-href="#Jina-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Jina AI의 임베딩 모델은 텍스트 입력을 숫자 표현으로 변환하여 텍스트의 의미를 파악할 수 있는 고성능 텍스트 임베딩 모델입니다. 이러한 모델은 고밀도 검색, 의미론적 텍스트 유사성, 다국어 이해와 같은 애플리케이션에서 탁월한 성능을 발휘합니다.</p>
<p>Milvus는 <code translate="no">JinaEmbeddingFunction</code> 클래스를 통해 Jina AI의 임베딩 모델과 통합됩니다. 이 클래스는 Jina AI 임베딩 모델을 사용하여 문서와 쿼리를 인코딩하고 임베딩을 Milvus 인덱싱과 호환되는 고밀도 벡터로 반환하는 메서드를 제공합니다. 이 기능을 활용하려면 <a href="https://jina.ai/embeddings/">Jina AI에서</a> API 키를 받으세요.</p>
<p>이 기능을 사용하려면 필요한 종속성을 설치하세요:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 <code translate="no">JinaEmbeddingFunction</code> 을 인스턴스화합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;jina-embeddings-v2-base-en&quot;</span>, <span class="hljs-comment"># Defaults to `jina-embeddings-v2-base-en`</span>
    api_key=JINAAI_API_KEY <span class="hljs-comment"># Provide your Jina AI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>매개변수</strong></p>
<ul>
<li><p><code translate="no">model_name</code> <em>(문자열</em>)</p>
<p>인코딩에 사용할 Jina AI 임베딩 모델의 이름입니다. 예를 들어 <code translate="no">jina-embeddings-v2-base-en</code>, <code translate="no">jina-embeddings-v2-small-en</code> 등과 같이 사용 가능한 Jina AI 임베딩 모델 이름 중 하나를 지정할 수 있습니다. 이 파라미터를 지정하지 않으면 <code translate="no">jina-embeddings-v2-base-en</code> 이 사용됩니다. 사용 가능한 모델 목록은 <a href="https://jina.ai/embeddings">Jina 임베딩을</a> 참조하세요.</p></li>
<li><p><code translate="no">api_key</code> <em>(문자열</em>)</p>
<p>Jina AI API에 액세스하기 위한 API 키입니다.</p></li>
</ul>
<p>문서용 임베딩을 만들려면 <code translate="no">encode_documents()</code> 메서드를 사용합니다:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = jina_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, jina_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 유사합니다:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-4.88487840e-01, -4.28095880e-01,  4.90086500e-01, -1.63274320e-01,
        3.43437800e-01,  3.21476880e-01,  2.83173790e-02, -3.10403670e-01,
        4.76985040e-01, -1.77410420e-01, -3.84803180e-01, -2.19224200e-01,
       -2.52898000e-01,  6.62411900e-02, -8.58173100e-01,  1.05221800e+00,
...
       -2.04462400e-01,  7.14229800e-01, -1.66823000e-01,  8.72551440e-01,
        5.53560140e-01,  8.92506300e-01, -2.39408610e-01, -4.22413560e-01,
       -3.19551350e-01,  5.59153850e-01,  2.44338100e-01, -8.60452100e-01])]
Dim: 768 (768,)
<button class="copy-code-btn"></button></code></pre>
<p>쿼리에 대한 임베딩을 만들려면 <code translate="no">encode_queries()</code> 메서드를 사용합니다:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = jina_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, jina_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 유사합니다:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-5.99164660e-01, -3.49827350e-01,  8.22405160e-01, -1.18632730e-01,
        5.78107540e-01,  1.09789170e-01,  2.91604200e-01, -3.29306450e-01,
        2.93779640e-01, -2.17880800e-01, -6.84535440e-01, -3.79752000e-01,
       -3.47541800e-01,  9.20846100e-02, -6.13804400e-01,  6.31312800e-01,
...
       -1.84993740e-02,  9.38629150e-01,  2.74858470e-02,  1.09396360e+00,
        3.96270750e-01,  7.44445800e-01, -1.95404050e-01, -6.08383200e-01,
       -3.75076300e-01,  3.87512200e-01,  8.11889650e-01, -3.76407620e-01])]
Dim 768 (768,)
<button class="copy-code-btn"></button></code></pre>