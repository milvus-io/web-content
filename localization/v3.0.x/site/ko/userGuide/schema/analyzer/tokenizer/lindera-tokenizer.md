---
id: lindera-tokenizer.md
title: Lindera
summary: >-
  린데라 토큰화기는 사전 기반의 형태소 분석을 수행합니다. 단어가 띄어쓰기로 구분되지 않고 문법 마커(입자)가 단어에 직접 붙어 있는 일본어와
  한국어를 위해 설계되었습니다.
---
<h1 id="Lindera" class="common-anchor-header">Lindera<button data-href="#Lindera" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">lindera</code> 토큰화 도구는 사전 기반의 형태소 분석을 수행합니다. 단어가 띄어쓰기로 구분되지 않고 문법 마커(입자)가 단어에 직접 붙어 있는 일본어와 한국어를 위해 설계되었습니다.</p>
<div class="alert note">
<p><strong>중국어 텍스트의 경우</strong>: <code translate="no">lindera</code> 에서는 <code translate="no">cc-cedict</code> 사전을 통해 중국어를 지원하지만, 중국어 텍스트의 경우에는 <a href="/docs/ko/jieba-tokenizer.md"><code translate="no">jieba</code></a> 토큰화기를 사용하는 것이 좋습니다. Jieba는 중국어 단어 세분화를 위해 특별히 설계되었으며 더 나은 결과를 제공합니다.</p>
</div>
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
    </button></h2><p>일본어와 한국어는 입자라는 문법적 마커가 명사에 직접 붙어 수많은 조합을 형성하는 응집 언어입니다. 예를 들어</p>
<table>
   <tr>
     <th><p>언어</p></th>
     <th><p>어근 단어</p></th>
     <th><p>+ 입자</p></th>
     <th><p>= 결합 형태</p></th>
     <th><p>의미</p></th>
   </tr>
   <tr>
     <td><p>한국어</p></td>
     <td><p>서울 (서울)</p></td>
     <td><p>에서</p></td>
     <td><p>서울에서</p></td>
     <td><p>서울에서</p></td>
   </tr>
   <tr>
     <td><p>일본어</p></td>
     <td><p>東京 (도쿄)</p></td>
     <td><p>に</p></td>
     <td><p>東京に</p></td>
     <td><p>도쿄로</p></td>
   </tr>
</table>
<p><code translate="no">lindera</code> 토큰화기:</p>
<ol>
<li><p><strong>텍스트를</strong> 개별 형태소(단어와 입자)로<strong>분할합니다</strong>.</p></li>
<li><p>사전의 품사(POS) 정보로<strong>각 토큰에 태그를 지정합니다</strong>.</p></li>
<li><p><strong>필터를 적용하여</strong> 원치 않는 토큰(예: 입자, 문장부호)을 제거합니다.</p></li>
</ol>
<p>이 2단계 프로세스(세분화 후 POS 기반 필터링)를 통해 검색을 위해 색인되는 토큰을 정밀하게 제어할 수 있습니다.</p>
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
    </button></h2><div class="alert note">
<p><strong>Milvus 2.6 이상 사용자</strong>: 이 섹션은 건너뛸 수 있습니다. 모든 사전은 사전 컴파일되어 공식 릴리스에 포함되어 있습니다.</p>
</div>
<p>Milvus 2.5.x의 경우 특정 사전을 활성화한 상태에서 Milvus를 컴파일해야 합니다. 컴파일 시 모든 사전을 명시적으로 포함해야 합니다.</p>
<p>특정 사전을 활성화하려면 컴파일 명령에 해당 사전을 포함하세요:</p>
<pre><code translate="no" class="language-bash">make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ko-dic
<button class="copy-code-btn"></button></code></pre>
<p>사용 가능한 사전의 전체 목록</p>
<table>
   <tr>
     <th><p><strong>사전</strong></p></th>
     <th><p><strong>언어</strong></p></th>
     <th><p><strong>설명</strong></p></th>
   </tr>
   <tr>
     <td><p>lindera-ko-dic</p></td>
     <td><p>한국어</p></td>
     <td><p>한국어 형태소 사전<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">(MeCab Ko-dic)</a></p></td>
   </tr>
   <tr>
     <td><p>lindera-ipadic</p></td>
     <td><p>일본어</p></td>
     <td><p>표준 형태소 사전<a href="https://taku910.github.io/mecab/">(MeCab IPADIC</a>)</p></td>
   </tr>
   <tr>
     <td><p>린데라-아이패드-네오로그드</p></td>
     <td><p>일본어</p></td>
     <td><p>신조어와 고유명사가 포함된 확장 사전<a href="https://github.com/neologd/mecab-ipadic-neologd">(IPADIC NEologd)</a></p></td>
   </tr>
   <tr>
     <td><p>린데라-유니딕</p></td>
     <td><p>일본어</p></td>
     <td><p>학술 표준 사전<a href="https://clrd.ninjal.ac.jp/unidic/">(UniDic</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-cc-cedict</p></td>
     <td><p>중국어</p></td>
     <td><p>커뮤니티 관리형 중국어-영어 사전<a href="https://cc-cedict.org/wiki/">(CC-CEDICT</a>)</p></td>
   </tr>
</table>
<p>예를 들어 모든 사전을 사용하도록 설정합니다:</p>
<pre><code translate="no" class="language-bash">make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ipadic-neologd,lindera-unidic,lindera-ko-dic,lindera-cc-cedict
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configuration" class="common-anchor-header">구성<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lindera</code> 토큰화기를 사용하여 분석기를 구성하려면 <code translate="no">tokenizer.type</code> 을 <code translate="no">lindera</code> 으로 설정하고 <code translate="no">dict_kind</code> 으로 사전을 선택한 다음 선택적으로 필터를 적용합니다.</p>
<div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();                                 
  analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
      put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>);                                                           
      put(<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ko-dic&quot;</span>);                                 
      put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
              put(<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;korean_stop_tags&quot;</span>);
              put(<span class="hljs-string">&quot;tags&quot;</span>, Arrays.asList(
                  <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>,
                  <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>,
                  <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>
              ));
          }}
      ));
  }});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{                                             
      <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{     
          <span class="hljs-string">&quot;type&quot;</span>:      <span class="hljs-string">&quot;lindera&quot;</span>,                                                       
          <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,                                  
          <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">interface</span>{}{                                                      
              <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{                             
                  <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                  <span class="hljs-string">&quot;tags&quot;</span>: []<span class="hljs-type">string</span>{
                      <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>,
                      <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>,
                      <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>,
                  },
              },
          },
      },
  }
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>토큰화기의 유형입니다. <code translate="no">"lindera"</code> 로 고정되어 있습니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dict_kind</code></p></td>
     <td><p>어휘를 정의하는 데 사용되는 사전입니다. 가능한 값은</p><ul><li><p><code translate="no">ko-dic</code>: 한국어 - 한국어 형태소 사전<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">(MeCab Ko-dic)</a></p></li><li><p><code translate="no">ipadic</code>: 일본어 - 표준 형태소 사전<a href="https://taku910.github.io/mecab/">(MeCab IPADIC</a>)</p></li><li><p><code translate="no">ipadic-neologd</code>: 일본어 신조어 사전 (확장) - 신조어와 고유명사 포함<a href="https://github.com/neologd/mecab-ipadic-neologd">(IPADIC NEologd</a>)</p></li><li><p><code translate="no">unidic</code>: 일본어 유니딕 (확장) - 자세한 언어 정보를 담은 학술 표준 사전<a href="https://clrd.ninjal.ac.jp/unidic/">(UniDic</a>)</p></li><li><p><code translate="no">cc-cedict</code>: 중국어(번체/간체) - 커뮤니티에서 관리하는 중국어-영어 사전<a href="https://cc-cedict.org/wiki/">(CC-CEDICT</a>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">filter</code></p></td>
     <td><p>세분화 후 적용할 토큰화 수준 필터 목록입니다. 각 필터는 객체입니다:</p><ul><li><p><code translate="no">kind</code>: 필터 유형입니다. 지원되는 값:</p><ul><li><p><code translate="no">korean_stop_tags</code>: 지정된 한국어 POS 태그와 일치하는 토큰을 제거합니다.</p></li><li><p><code translate="no">japanese_stop_tags</code>: 지정된 일본어 POS 태그와 일치하는 토큰을 제거합니다.</p></li></ul></li><li><p><code translate="no">tags</code>: 필터링할 POS 태그 목록입니다. 사용 가능한 태그는 <code translate="no">kind</code> 에 따라 다릅니다:</p><ul><li><p><code translate="no">korean_stop_tags</code>: 정확한 태그 코드를 사용합니다(예: <code translate="no">JKS</code>, <code translate="no">JKO</code>, <code translate="no">SF</code>). 한글 태그는 정확히 일치해야 합니다. 세종 태그 세트를 기준으로 한 전체 목록은 <a href="https://docs.rs/lindera/latest/src/lindera/token_filter/korean_stop_tags.rs.html">린데라 한국어 정지 태그 소스를</a> 참조하세요.</p></li><li><p><code translate="no">japanese_stop_tags</code> 의 경우: 정확한 태그 코드를 사용하세요(예: <code translate="no">助詞,格助詞</code>, <code translate="no">助詞,係助詞</code>, <code translate="no">助動詞</code>). 일본어 태그는 정확히 일치해야 합니다. 전체 목록(IPADIC)은 <a href="https://github.com/taku910/mecab/blob/master/mecab-ipadic/pos-id.def">일본어 POS 태그 참조를</a> 참조하십시오.</p></li></ul></li></ul></td>
   </tr>
</table>
<p><code translate="no">analyzer_params</code> 를 정의한 후 컬렉션 스키마를 정의할 때 <code translate="no">VARCHAR</code> 필드에 적용할 수 있습니다. 이렇게 하면 Milvus가 효율적인 토큰화 및 필터링을 위해 지정된 분석기를 사용하여 해당 필드의 텍스트를 처리할 수 있습니다. 자세한 내용은 <a href="/docs/ko/analyzer-overview.md#Example-use">사용 예시를</a> 참조하세요.</p>
<h2 id="Examples" class="common-anchor-header">예제<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>수집 스키마에 분석기 구성을 적용하기 전에 <code translate="no">run_analyzer</code> 메서드를 사용하여 그 동작을 확인하세요.</p>
<h3 id="Korean-example" class="common-anchor-header">한국어 예제<button data-href="#Korean-example" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>]
            }
        ]
    }
}

<span class="hljs-comment"># Sample Korean text: &quot;서울에서 맛있는 음식을 먹었습니다&quot; (I ate delicious food in Seoul)</span>
sample_text = <span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();                                                                          
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
  put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>);                                                                                                    
  put(<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ko-dic&quot;</span>);                                 
  put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
          put(<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;korean_stop_tags&quot;</span>);
          put(<span class="hljs-string">&quot;tags&quot;</span>, Arrays.asList(
              <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>,
              <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>,
              <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>
          ));
      }}
  ));
}});

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;encoding/json&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
  <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
      <span class="hljs-string">&quot;type&quot;</span>:      <span class="hljs-string">&quot;lindera&quot;</span>,
      <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
      <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">interface</span>{}{
          <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
              <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
              <span class="hljs-string">&quot;tags&quot;</span>: []<span class="hljs-type">string</span>{
                  <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>,
                  <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>,
                  <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>,
              },
          },
      },
  },
}

bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">uri</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
});

<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
    <span class="hljs-attr">dict_kind</span>: <span class="hljs-string">&quot;ko-dic&quot;</span>,
    <span class="hljs-attr">filter</span>: [
      {
        <span class="hljs-attr">kind</span>: <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
        <span class="hljs-attr">tags</span>: [
          <span class="hljs-string">&quot;SP&quot;</span>,
          <span class="hljs-string">&quot;SSC&quot;</span>,
          <span class="hljs-string">&quot;SSO&quot;</span>,
          <span class="hljs-string">&quot;SC&quot;</span>,
          <span class="hljs-string">&quot;SE&quot;</span>,
          <span class="hljs-string">&quot;SF&quot;</span>,
          <span class="hljs-string">&quot;JKS&quot;</span>,
          <span class="hljs-string">&quot;JKC&quot;</span>,
          <span class="hljs-string">&quot;JKG&quot;</span>,
          <span class="hljs-string">&quot;JKO&quot;</span>,
          <span class="hljs-string">&quot;JKB&quot;</span>,
          <span class="hljs-string">&quot;JKV&quot;</span>,
          <span class="hljs-string">&quot;JKQ&quot;</span>,
          <span class="hljs-string">&quot;JX&quot;</span>,
          <span class="hljs-string">&quot;JC&quot;</span>,
          <span class="hljs-string">&quot;UNK&quot;</span>,
          <span class="hljs-string">&quot;EP&quot;</span>,
          <span class="hljs-string">&quot;ETM&quot;</span>,
        ],
      },
    ],
  },
};

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>(sample_text, analyzer_params);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result);

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>예상 출력</strong>:</p>
<pre><code translate="no" class="language-plaintext">[&#x27;서울&#x27;, &#x27;맛있&#x27;, &#x27;음식&#x27;, &#x27;먹&#x27;, &#x27;습니다&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">korean_stop_tags</code> 이 없으면 출력에는 일반적으로 검색에 유용하지 않은 <code translate="no">에서</code> (in), <code translate="no">는</code> (토픽 마커), <code translate="no">을</code> (객체 마커)와 같은 입자가 포함됩니다.</p>
<h3 id="Japanese-example" class="common-anchor-header">일본어 예제<button data-href="#Japanese-example" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">파이썬</a> <a href="#java">자바</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>]
            }
        ]
    }
}

<span class="hljs-comment"># Sample Japanese text: &quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>
sample_text = <span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">uri</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
});

<span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            {
                <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
                <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>]
            }
        ]
    }
}

<span class="hljs-comment">// Sample Japanese text: &quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>
<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">run_analyzer</span>(sample_text, analyzer_params);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>예상 출력:</strong></p>
<pre><code translate="no" class="language-plaintext">[&#x27;東京&#x27;, &#x27;スカイ&#x27;, &#x27;ツリー&#x27;, &#x27;最寄り駅&#x27;, &#x27;とう&#x27;, &#x27;きょう&#x27;, &#x27;スカイ&#x27;, &#x27;ツリー&#x27;, &#x27;駅&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">japanese_stop_tags</code> 이 없으면 출력에는 <code translate="no">の</code> (소유격), <code translate="no">は</code> (토픽 마커), <code translate="no">です</code> (코퓰러)와 같은 입자가 포함됩니다.</p>
