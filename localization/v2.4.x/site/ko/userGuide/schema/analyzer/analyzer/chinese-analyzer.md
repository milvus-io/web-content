---
id: chinese-analyzer.md
title: 중국어 분석기
related_key: 'chinese, analyzer'
summary: '''중국어'' 분석기는 중국어 텍스트를 처리하도록 특별히 설계되어 효과적인 세분화 및 토큰화를 제공합니다.'
---
<h1 id="Chinese​" class="common-anchor-header">중국어<button data-href="#Chinese​" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">chinese</code> 분석기는 중국어 텍스트를 처리하도록 특별히 설계되어 효과적인 세분화 및 토큰화를 제공합니다.</p>
<h3 id="Definition​" class="common-anchor-header">정의</h3><p><code translate="no">chinese</code> 분석기는 다음으로 구성됩니다.</p>
<ul>
<li><p><strong>토큰화 도구</strong>: <code translate="no">jieba</code> 토큰화기를 사용하여 어휘와 문맥에 따라 중국어 텍스트를 토큰으로 분할합니다. 자세한 내용은 <a href="/docs/ko/jieba-tokenizer.md">Jieba를</a> 참조하세요.</p></li>
<li><p><strong>필터</strong>: <code translate="no">cnalphanumonly</code> 필터를 사용하여 중국어 이외의 문자가 포함된 토큰을 제거합니다. 자세한 내용은 <a href="/docs/ko/cnalphanumonly-filter.md">한자만을</a> 참조하세요.</p></li>
</ul>
<p><code translate="no">chinese</code> 분석기의 기능은 다음 사용자 지정 분석기 구성과 동일합니다.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">구성</h3><p><code translate="no">chinese</code> 분석기를 필드에 적용하려면 <code translate="no">analyzer_params</code> 에서 <code translate="no">type</code> 을 <code translate="no">chinese</code> 로 설정하면 됩니다.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">chinese</code> 분석기는 선택적 매개 변수를 허용하지 않습니다.</p>
</div>
<h3 id="Example-output​" class="common-anchor-header">출력 예시</h3><p>다음은 <code translate="no">chinese</code> 분석기가 텍스트를 처리하는 방식입니다.</p>
<p><strong>원본 텍스트</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;Milvus 是一个高性能、可扩展的向量数据库！&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>예상 출력입니다</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;Milvus&quot;</span>, <span class="hljs-string">&quot;是&quot;</span>, <span class="hljs-string">&quot;一个&quot;</span>, <span class="hljs-string">&quot;高性&quot;</span>, <span class="hljs-string">&quot;性能&quot;</span>, <span class="hljs-string">&quot;高性能&quot;</span>, <span class="hljs-string">&quot;可&quot;</span>, <span class="hljs-string">&quot;扩展&quot;</span>, <span class="hljs-string">&quot;的&quot;</span>, <span class="hljs-string">&quot;向量&quot;</span>, <span class="hljs-string">&quot;数据&quot;</span>, <span class="hljs-string">&quot;据库&quot;</span>, <span class="hljs-string">&quot;数据库&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
