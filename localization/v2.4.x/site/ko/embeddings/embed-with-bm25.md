---
id: embed-with-bm25.md
order: 5
summary: BM25는 정보 검색에서 문서와 주어진 검색 쿼리의 관련성을 추정하는 데 사용되는 순위 기능입니다.
title: BM25
---
<h1 id="BM25" class="common-anchor-header">BM25<button data-href="#BM25" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://en.wikipedia.org/wiki/Okapi_BM25">BM25는</a> 정보 검색에서 주어진 검색어에 대한 문서의 관련성을 추정하는 데 사용되는 순위 기능입니다. 이 기능은 문서 길이 정규화와 용어 빈도 포화도를 통합하여 기본 용어 빈도 접근 방식을 개선합니다. BM25는 문서를 용어 중요도 점수의 벡터로 표현하여 희소 임베딩을 생성할 수 있으므로 희소 벡터 공간에서 효율적으로 검색하고 순위를 매길 수 있습니다.</p>
<p>Milvus는 <strong>BM25EmbeddingFunction</strong> 클래스를 사용해 BM25 모델과 통합합니다. 이 클래스는 임베딩 계산을 처리하고 인덱싱 및 검색을 위해 Milvus와 호환되는 형식으로 반환합니다. 이 프로세스의 핵심은 토큰화를 위한 분석기를 구축하는 것입니다.</p>
<p>이 기능을 사용하려면 필요한 종속성을 설치하세요:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>토큰화 분석기를 쉽게 만들 수 있도록 Milvus는 텍스트의 언어만 지정하면 되는 기본 분석기를 제공합니다.</p>
<p><strong>예시</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.sparse.bm25.tokenizers <span class="hljs-keyword">import</span> build_default_analyzer
<span class="hljs-keyword">from</span> pymilvus.model.sparse <span class="hljs-keyword">import</span> BM25EmbeddingFunction

<span class="hljs-comment"># there are some built-in analyzers for several languages, now we use &#x27;en&#x27; for English.</span>
analyzer = build_default_analyzer(language=<span class="hljs-string">&quot;en&quot;</span>)

corpus = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># analyzer can tokenize the text into tokens</span>
tokens = analyzer(corpus[<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;tokens:&quot;</span>, tokens)
<button class="copy-code-btn"></button></code></pre>
<p><strong>매개변수</strong>:</p>
<ul>
<li><p><strong>언어</strong><em>(문자열</em>)</p>
<p>토큰화할 텍스트의 언어입니다. 유효한 옵션은 <strong>en</strong> (영어), <strong>de</strong> (독일어), <strong>fr</strong> (프랑스어), <strong>ru</strong> (러시아어), <strong>sp</strong> (스페인어), <strong>it</strong> (이탈리아어), <strong>pt</strong> (포르투갈어), <strong>zh</strong> (중국어), <strong>jp</strong> (일본어), <strong>kr</strong> (한국어)입니다.</p></li>
</ul>
<p>예상 출력은 다음과 유사합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-attr">tokens</span>: [<span class="hljs-string">&#x27;artifici&#x27;</span>, <span class="hljs-string">&#x27;intellig&#x27;</span>, <span class="hljs-string">&#x27;found&#x27;</span>, <span class="hljs-string">&#x27;academ&#x27;</span>, <span class="hljs-string">&#x27;disciplin&#x27;</span>, <span class="hljs-string">&#x27;1956&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
<p>BM25 알고리즘은 먼저 내장된 분석기를 사용하여 텍스트를 토큰으로 분해하여 처리합니다 <strong>(</strong>예: <strong>'artifici',</strong> <strong>'intellig</strong>', <strong>'academ'</strong> 등의 영어 토큰에서 볼 수 있듯이 <strong>).</strong> 그런 다음 이러한 토큰에 대한 통계를 수집하여 문서 전체에서 토큰의 빈도와 분포를 평가합니다. BM25의 핵심은 중요도에 따라 각 토큰의 관련성 점수를 계산하는 것으로, 희귀한 토큰일수록 더 높은 점수를 받습니다. 이 간결한 프로세스를 통해 쿼리와의 관련성에 따라 문서의 순위를 효과적으로 매길 수 있습니다.</p>
<p>말뭉치에 대한 통계를 수집하려면 <strong>fit()</strong> 메서드를 사용합니다:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the analyzer to instantiate the BM25EmbeddingFunction</span>
bm25_ef = BM25EmbeddingFunction(analyzer)

<span class="hljs-comment"># Fit the model on the corpus to get the statstics of the corpus</span>
bm25_ef.fit(corpus)
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 <strong>encode_documents()</strong> 를 사용하여 문서에 대한 임베딩을 만듭니다:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;The field of artificial intelligence was established as an academic subject in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the pioneer in conducting significant research in artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;Originating in Maida Vale, London, Turing grew up in the southern regions of England.&quot;</span>,
    <span class="hljs-string">&quot;In 1956, artificial intelligence emerged as a scholarly field.&quot;</span>,
    <span class="hljs-string">&quot;Turing, originally from Maida Vale, London, was brought up in the south of England.&quot;</span>
]

<span class="hljs-comment"># Create embeddings for the documents</span>
docs_embeddings = bm25_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse dim:&quot;</span>, bm25_ef.dim, <span class="hljs-built_in">list</span>(docs_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 비슷합니다:</p>
<pre><code translate="no" class="language-python">Embeddings:   (0, 0)        1.0208816705336425
  (0, 1)        1.0208816705336425
  (0, 3)        1.0208816705336425
...
  (4, 16)        0.9606986899563318
  (4, 17)        0.9606986899563318
  (4, 20)        0.9606986899563318
Sparse dim: 21 (1, 21)
<button class="copy-code-btn"></button></code></pre>
<p>쿼리에 대한 임베딩을 만들려면 <strong>encode_queries()</strong> 메서드를 사용합니다:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = bm25_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse dim:&quot;</span>, bm25_ef.dim, <span class="hljs-built_in">list</span>(query_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 다음과 비슷합니다:</p>
<pre><code translate="no" class="language-python">Embeddings:   (0, 0)        0.5108256237659907
  (0, 1)        0.5108256237659907
  (0, 2)        0.5108256237659907
  (1, 6)        0.5108256237659907
  (1, 7)        0.11554389108992644
  (1, 14)        0.5108256237659907
Sparse dim: 21 (1, 21)
<button class="copy-code-btn"></button></code></pre>
<p><strong>참고:</strong></p>
<p><strong>BM25EmbeddingFunction을</strong> 사용할 때, <strong>encoding_queries()</strong> 및 <strong>encoding_documents()</strong> 연산은 수학적으로 상호 교환할 수 없다는 점에 유의하세요. 따라서 구현된 <strong>bm25_ef(text)를</strong> 사용할 수 없습니다.</p>
