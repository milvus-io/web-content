---
id: lindera-tokenizer.md
title: Lindera
summary: lindera 词法分析器执行基于词典的词形分析。它专为日语和韩语设计——这两种语言中，单词之间没有空格分隔，且语法标记（助词）直接附着在单词上。
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
    </button></h1><p><code translate="no">lindera</code> 词法分析器执行基于词典的形态分析。它专为日语和韩语设计——这两种语言中，单词之间没有空格分隔，且语法标记（助词）直接附着在单词上。</p>
<div class="alert note">
<p><strong>对于中文文本</strong>：虽然<code translate="no">lindera</code> 通过<code translate="no">cc-cedict</code> 词典支持中文，但我们建议改用 <a href="/docs/zh/jieba-tokenizer.md"><code translate="no">jieba</code></a> 分词器。Jieba 专为中文分词设计，能提供更佳的分析结果。</p>
</div>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>日语和韩语属于黏着语：称为助词的语法标记直接附着在名词上，形成多种组合。例如：</p>
<table>
   <tr>
     <th><p>语言</p></th>
     <th><p>词根</p></th>
     <th><p>+ 助词</p></th>
     <th><p>= 组合形式</p></th>
     <th><p>含义</p></th>
   </tr>
   <tr>
     <td><p>韩语</p></td>
     <td><p>首尔 (Seoul)</p></td>
     <td><p>에서</p></td>
     <td><p>在首尔</p></td>
     <td><p>在首尔</p></td>
   </tr>
   <tr>
     <td><p>日语</p></td>
     <td><p>东京 (Tokyo)</p></td>
     <td><p>に</p></td>
     <td><p>东京</p></td>
     <td><p>前往东京</p></td>
   </tr>
</table>
<p><code translate="no">lindera</code> 词法分析器：</p>
<ol>
<li><p><strong>将文本分割</strong>为单个语素（单词和助词）</p></li>
<li><p>根据词典信息为<strong>每个词素标注</strong>词性（POS）</p></li>
<li><p><strong>应用过滤器</strong>以移除不需要的词素（例如助词、标点符号）</p></li>
</ol>
<p>这一两阶段流程——先进行分段，再基于词性（POS）进行过滤——能够精确控制哪些词素会被纳入索引以供搜索。</p>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.6 及更高版本在官方发布版中已预编译了所有词典。</p>
<p><details>
<summary>Milvus 2.5.x：使用词典编译 Milvus</summary></p>
<p>对于 Milvus 2.5.x，您需要在启用特定词典的情况下编译 Milvus。所有词典都必须在编译过程中显式包含。</p>
<p>要启用特定词典，请在编译命令中包含它们：</p>
<pre><code translate="no" class="language-bash">make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ko-dic
<button class="copy-code-btn"></button></code></pre>
<p>可用词典的完整列表：</p>
<table>
   <tr>
     <th><p><strong>词典</strong></p></th>
     <th><p><strong>语言</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p>lindera-ko-dic</p></td>
     <td><p>韩语</p></td>
     <td><p>韩语形态学词典（<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">MeCab Ko-dic</a>）</p></td>
   </tr>
   <tr>
     <td><p>lindera-ipadic</p></td>
     <td><p>日语</p></td>
     <td><p>标准形态学词典（<a href="https://taku910.github.io/mecab/">MeCab IPADIC</a>）</p></td>
   </tr>
   <tr>
     <td><p>lindera-ipadic-neologd</p></td>
     <td><p>日语</p></td>
     <td><p>包含新词和专有名词的扩展词典（<a href="https://github.com/neologd/mecab-ipadic-neologd">IPADIC NEologd</a>）</p></td>
   </tr>
   <tr>
     <td><p>lindera-unidic</p></td>
     <td><p>日语</p></td>
     <td><p>学术标准词典（<a href="https://clrd.ninjal.ac.jp/unidic/">UniDic</a>）</p></td>
   </tr>
   <tr>
     <td><p>lindera-cc-cedict</p></td>
     <td><p>中文</p></td>
     <td><p>社区维护的中英词典 (<a href="https://cc-cedict.org/wiki/">CC-CEDICT</a>)</p></td>
   </tr>
</table>
<p>例如，要启用所有词典：</p>
<pre><code translate="no" class="language-bash">make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ipadic-neologd,lindera-unidic,lindera-ko-dic,lindera-cc-cedict
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h2 id="Configuration" class="common-anchor-header">配置<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>若要使用<code translate="no">lindera</code> 分词器配置分析器，请将<code translate="no">tokenizer.type</code> 设置为<code translate="no">lindera</code> ，通过<code translate="no">dict_kind</code> 选择词典，并可选地应用过滤器。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
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
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>},
        {<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ko-dic&quot;</span>},
        {<span class="hljs-string">&quot;filter&quot;</span>, {{
            {<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;korean_stop_tags&quot;</span>},
            {<span class="hljs-string">&quot;tags&quot;</span>, {<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>}}
        }}}
    }}
};
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span>()
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;lindera&quot;</span>,
        [<span class="hljs-string">&quot;dict_kind&quot;</span>] = <span class="hljs-string">&quot;ko-dic&quot;</span>,
        [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt;
        {
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;kind&quot;</span>] = <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt; { <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span> }
            }
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/common/run_analyzer&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;lindera\&quot;,\&quot;dict_kind\&quot;:\&quot;ko-dic\&quot;,\&quot;filter\&quot;:[{\&quot;kind\&quot;:\&quot;korean_stop_tags\&quot;,\&quot;tags\&quot;:[\&quot;SP\&quot;,\&quot;SSC\&quot;,\&quot;SSO\&quot;,\&quot;SC\&quot;,\&quot;SE\&quot;,\&quot;SF\&quot;,\&quot;JKS\&quot;,\&quot;JKC\&quot;,\&quot;JKG\&quot;,\&quot;JKO\&quot;,\&quot;JKB\&quot;,\&quot;JKV\&quot;,\&quot;JKQ\&quot;,\&quot;JX\&quot;,\&quot;JC\&quot;,\&quot;UNK\&quot;,\&quot;EP\&quot;,\&quot;ETM\&quot;]}]}}&quot;,
    &quot;text&quot;: [&quot;서울에서 맛있는 음식을 먹었습니다&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>分词器的类型。此参数固定为<code translate="no">"lindera"</code> 。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dict_kind</code></p></td>
     <td><p>用于定义词汇表的词典。可能的值：</p><ul><li><p><code translate="no">ko-dic</code>: Korean - 韩语形态学词典（<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">MeCab Ko-dic</a>）</p></li><li><p><code translate="no">ipadic</code>: 日语 - 标准形态学词典（<a href="https://taku910.github.io/mecab/">MeCab IPADIC</a>）</p></li><li><p><code translate="no">ipadic-neologd</code>: 含新词的日语词典（扩展版） - 包含新词和专有名词（<a href="https://github.com/neologd/mecab-ipadic-neologd">IPADIC NEologd</a>）</p></li><li><p><code translate="no">unidic</code>: 日语 UniDic（扩展版）——包含详细语言信息的学术标准词典（<a href="https://clrd.ninjal.ac.jp/unidic/">UniDic</a>）</p></li><li><p><code translate="no">cc-cedict</code>: 普通话（繁体/简体） - 由社区维护的中英词典（<a href="https://cc-cedict.org/wiki/">CC-CEDICT</a>）</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">filter</code></p></td>
     <td><p>分词后需应用的词素化器级过滤器列表。每个过滤器都是一个对象，包含：</p><ul><li><p><code translate="no">kind</code>: 过滤器类型。支持的值：</p><ul><li><p><code translate="no">korean_stop_tags</code>: 移除与指定韩语词性标签匹配的词元。</p></li><li><p><code translate="no">japanese_stop_tags</code>: 移除与指定日语词性标签匹配的词元。</p></li></ul></li><li><p><code translate="no">tags</code>: 需过滤的词性标签列表。可用标签取决于<code translate="no">kind</code>:</p><ul><li><p>对于<code translate="no">korean_stop_tags</code> ：使用精确的标签代码（例如，<code translate="no">JKS</code> 、<code translate="no">JKO</code> 、<code translate="no">SF</code> ）。韩语标签要求精确匹配。基于世宗标签集的完整列表，请参阅<a href="https://docs.rs/lindera/latest/src/lindera/token_filter/korean_stop_tags.rs.html">Lindera韩语停用词标签源代码</a>。</p></li><li><p>对于<code translate="no">japanese_stop_tags</code> ：请使用精确的标签代码（例如，<code translate="no">助詞,格助詞</code> 、<code translate="no">助詞,係助詞</code> 、<code translate="no">助動詞</code> ）。日语标签要求精确匹配。完整的列表（IPADIC）请参<a href="https://github.com/taku910/mecab/blob/master/mecab-ipadic/pos-id.def">见日语词性标签参考</a>。</p></li></ul></li></ul></td>
   </tr>
</table>
<p>定义<code translate="no">analyzer_params</code> 后，您可以在定义Collection模式时将其应用于<code translate="no">VARCHAR</code> 字段。这使Milvus能够使用指定的分析器处理该字段中的文本，从而实现高效的分词和过滤。有关详细信息，请参阅<a href="/docs/zh/analyzer-overview.md#Example-use">使用示例</a>。</p>
<h2 id="Examples" class="common-anchor-header">示例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>在将分析器配置应用到Collection Schema之前，请使用<code translate="no">run_analyzer</code> 方法验证其行为。</p>
<h3 id="Korean-example" class="common-anchor-header">韩语示例<button data-href="#Korean-example" class="anchor-icon" translate="no">
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
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

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
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
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
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
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

texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

_, err = client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
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
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">run_analyzer_req</span> = RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(run_analyzer_req).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>},
        {<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ko-dic&quot;</span>},
        {<span class="hljs-string">&quot;filter&quot;</span>, {{
            {<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;korean_stop_tags&quot;</span>},
            {<span class="hljs-string">&quot;tags&quot;</span>, {<span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span>}}
        }}}
    }}
};

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                                 .<span class="hljs-built_in">WithTexts</span>({<span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>})
                                 .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
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

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">analyzer_params</span>: analyzer_params,
  <span class="hljs-attr">text</span>: sample_text,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span>()
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;lindera&quot;</span>,
        [<span class="hljs-string">&quot;dict_kind&quot;</span>] = <span class="hljs-string">&quot;ko-dic&quot;</span>,
        [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt;
        {
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;kind&quot;</span>] = <span class="hljs-string">&quot;korean_stop_tags&quot;</span>,
                [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt; { <span class="hljs-string">&quot;SP&quot;</span>, <span class="hljs-string">&quot;SSC&quot;</span>, <span class="hljs-string">&quot;SSO&quot;</span>, <span class="hljs-string">&quot;SC&quot;</span>, <span class="hljs-string">&quot;SE&quot;</span>, <span class="hljs-string">&quot;SF&quot;</span>, <span class="hljs-string">&quot;JKS&quot;</span>, <span class="hljs-string">&quot;JKC&quot;</span>, <span class="hljs-string">&quot;JKG&quot;</span>, <span class="hljs-string">&quot;JKO&quot;</span>, <span class="hljs-string">&quot;JKB&quot;</span>, <span class="hljs-string">&quot;JKV&quot;</span>, <span class="hljs-string">&quot;JKQ&quot;</span>, <span class="hljs-string">&quot;JX&quot;</span>, <span class="hljs-string">&quot;JC&quot;</span>, <span class="hljs-string">&quot;UNK&quot;</span>, <span class="hljs-string">&quot;EP&quot;</span>, <span class="hljs-string">&quot;ETM&quot;</span> }
            }
        }
    }
};

<span class="hljs-comment">// Sample Korean text: &quot;서울에서 맛있는 음식을 먹었습니다&quot; (I ate delicious food in Seoul)</span>
<span class="hljs-built_in">string</span> sampleText = <span class="hljs-string">&quot;서울에서 맛있는 음식을 먹었습니다&quot;</span>;

RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = [sampleText]
});

<span class="hljs-keyword">foreach</span> (AnalyzerToken t <span class="hljs-keyword">in</span> result.Results.SelectMany(r =&gt; r.Tokens))
{
    Console.WriteLine(t.Token);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/common/run_analyzer&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;lindera\&quot;,\&quot;dict_kind\&quot;:\&quot;ko-dic\&quot;,\&quot;filter\&quot;:[{\&quot;kind\&quot;:\&quot;korean_stop_tags\&quot;,\&quot;tags\&quot;:[\&quot;SP\&quot;,\&quot;SSC\&quot;,\&quot;SSO\&quot;,\&quot;SC\&quot;,\&quot;SE\&quot;,\&quot;SF\&quot;,\&quot;JKS\&quot;,\&quot;JKC\&quot;,\&quot;JKG\&quot;,\&quot;JKO\&quot;,\&quot;JKB\&quot;,\&quot;JKV\&quot;,\&quot;JKQ\&quot;,\&quot;JX\&quot;,\&quot;JC\&quot;,\&quot;UNK\&quot;,\&quot;EP\&quot;,\&quot;ETM\&quot;]}]}}&quot;,
    &quot;text&quot;: [&quot;서울에서 맛있는 음식을 먹었습니다&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>预期输出</strong>：</p>
<pre><code translate="no" class="language-plaintext">[&#x27;서울&#x27;, &#x27;맛있&#x27;, &#x27;음식&#x27;, &#x27;먹&#x27;, &#x27;습니다&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p>如果不使用 `<code translate="no">korean_stop_tags</code>`，输出中将包含诸如 `<code translate="no">에서</code> `（in）、`<code translate="no">는</code> `（主题标记）和 `<code translate="no">을</code> `（对象标记）等粒子，这些粒子通常对搜索没有帮助。</p>
<h3 id="Japanese-example" class="common-anchor-header">日语示例<button data-href="#Japanese-example" class="anchor-icon" translate="no">
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
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
  put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>);
  put(<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ipadic&quot;</span>);
  put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
          put(<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>);
          put(<span class="hljs-string">&quot;tags&quot;</span>, Arrays.asList(
              <span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>
          ));
      }}
  ));
}});

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
  <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
      <span class="hljs-string">&quot;type&quot;</span>:      <span class="hljs-string">&quot;lindera&quot;</span>,
      <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>,
      <span class="hljs-string">&quot;filter&quot;</span>: []<span class="hljs-keyword">interface</span>{}{
          <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-keyword">interface</span>{}{
              <span class="hljs-string">&quot;kind&quot;</span>: <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
              <span class="hljs-string">&quot;tags&quot;</span>: []<span class="hljs-type">string</span>{
                  <span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>,
              },
          },
      },
  },
}

texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts...).
    WithAnalyzerParams(analyzerParams)

_, err = client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
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
});

<span class="hljs-keyword">let</span> <span class="hljs-variable">run_analyzer_req</span> = RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(run_analyzer_req).<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">results</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>},
        {<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ipadic&quot;</span>},
        {<span class="hljs-string">&quot;filter&quot;</span>, {{
            {<span class="hljs-string">&quot;kind&quot;</span>, <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>},
            {<span class="hljs-string">&quot;tags&quot;</span>, {<span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>}}
        }}}
    }}
};

milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(milvus::<span class="hljs-built_in">RunAnalyzerRequest</span>()
                                 .<span class="hljs-built_in">WithTexts</span>({<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>})
                                 .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
    <span class="hljs-attr">dict_kind</span>: <span class="hljs-string">&quot;ipadic&quot;</span>,
    <span class="hljs-attr">filter</span>: [
      {
        <span class="hljs-attr">kind</span>: <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
        <span class="hljs-attr">tags</span>: [<span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span>],
      },
    ],
  },
};

<span class="hljs-keyword">const</span> sample_text = <span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">analyzer_params</span>: analyzer_params,
  <span class="hljs-attr">text</span>: sample_text,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

MilvusClientV2 client = <span class="hljs-keyword">new</span>(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span>()
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;lindera&quot;</span>,
        [<span class="hljs-string">&quot;dict_kind&quot;</span>] = <span class="hljs-string">&quot;ipadic&quot;</span>,
        [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt;
        {
            <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;kind&quot;</span>] = <span class="hljs-string">&quot;japanese_stop_tags&quot;</span>,
                [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span> List&lt;<span class="hljs-built_in">object</span>&gt; { <span class="hljs-string">&quot;接続詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,一般&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,引用&quot;</span>, <span class="hljs-string">&quot;助詞,格助詞,連語&quot;</span>, <span class="hljs-string">&quot;助詞,係助詞&quot;</span>, <span class="hljs-string">&quot;助詞,終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,接続助詞&quot;</span>, <span class="hljs-string">&quot;助詞,特殊&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞&quot;</span>, <span class="hljs-string">&quot;助詞,副助詞／並立助詞／終助詞&quot;</span>, <span class="hljs-string">&quot;助詞,連体化&quot;</span>, <span class="hljs-string">&quot;助詞,副詞化&quot;</span>, <span class="hljs-string">&quot;助詞,並立助詞&quot;</span>, <span class="hljs-string">&quot;助動詞&quot;</span>, <span class="hljs-string">&quot;記号,一般&quot;</span>, <span class="hljs-string">&quot;記号,読点&quot;</span>, <span class="hljs-string">&quot;記号,句点&quot;</span>, <span class="hljs-string">&quot;記号,空白&quot;</span>, <span class="hljs-string">&quot;記号,括弧閉&quot;</span>, <span class="hljs-string">&quot;記号,括弧開&quot;</span>, <span class="hljs-string">&quot;その他,間投&quot;</span>, <span class="hljs-string">&quot;フィラー&quot;</span>, <span class="hljs-string">&quot;非言語音&quot;</span> }
            }
        }
    }
};

<span class="hljs-comment">// Sample Japanese text: &quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>
<span class="hljs-built_in">string</span> sampleText = <span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;</span>;

RunAnalyzerResp result = <span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = [sampleText]
});

<span class="hljs-keyword">foreach</span> (AnalyzerToken t <span class="hljs-keyword">in</span> result.Results.SelectMany(r =&gt; r.Tokens))
{
    Console.WriteLine(t.Token);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/common/run_analyzer&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;lindera\&quot;,\&quot;dict_kind\&quot;:\&quot;ipadic\&quot;,\&quot;filter\&quot;:[{\&quot;kind\&quot;:\&quot;japanese_stop_tags\&quot;,\&quot;tags\&quot;:[\&quot;接続詞\&quot;,\&quot;助詞,格助詞\&quot;,\&quot;助詞,格助詞,一般\&quot;,\&quot;助詞,格助詞,引用\&quot;,\&quot;助詞,格助詞,連語\&quot;,\&quot;助詞,係助詞\&quot;,\&quot;助詞,終助詞\&quot;,\&quot;助詞,接続助詞\&quot;,\&quot;助詞,特殊\&quot;,\&quot;助詞,副助詞\&quot;,\&quot;助詞,副助詞／並立助詞／終助詞\&quot;,\&quot;助詞,連体化\&quot;,\&quot;助詞,副詞化\&quot;,\&quot;助詞,並立助詞\&quot;,\&quot;助動詞\&quot;,\&quot;記号,一般\&quot;,\&quot;記号,読点\&quot;,\&quot;記号,句点\&quot;,\&quot;記号,空白\&quot;,\&quot;記号,括弧閉\&quot;,\&quot;記号,括弧開\&quot;,\&quot;その他,間投\&quot;,\&quot;フィラー\&quot;,\&quot;非言語音\&quot;]}]}}&quot;,
    &quot;text&quot;: [&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅です&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>预期输出：</strong></p>
<pre><code translate="no" class="language-plaintext">[&#x27;東京&#x27;, &#x27;スカイ&#x27;, &#x27;ツリー&#x27;, &#x27;最寄り駅&#x27;, &#x27;とう&#x27;, &#x27;きょう&#x27;, &#x27;スカイ&#x27;, &#x27;ツリー&#x27;, &#x27;駅&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p>如果不使用<code translate="no">japanese_stop_tags</code> ，输出中将包含诸如<code translate="no">の</code> （所有格）、<code translate="no">は</code> （话题标记）和<code translate="no">です</code> （系动词）等助词。</p>
