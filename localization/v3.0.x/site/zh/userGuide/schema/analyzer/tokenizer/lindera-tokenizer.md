---
id: lindera-tokenizer.md
title: Lindera
summary: lindera tokenizer 可进行基于词典的词形分析。它专为日语和韩语设计，在这两种语言中，单词之间没有空格分隔，语法标记（微粒）直接附着在单词上。
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
    </button></h1><p><code translate="no">lindera</code> tokenizer 可进行基于词典的形态分析。它专为日语和韩语设计，在这两种语言中，单词不以空格分隔，语法标记（微粒）直接附加在单词上。</p>
<div class="alert note">
<p><strong>适用于中文文本</strong>：虽然<code translate="no">lindera</code> 通过<code translate="no">cc-cedict</code> 词典支持中文，但我们建议使用 <a href="/docs/zh/jieba-tokenizer.md"><code translate="no">jieba</code></a>tokenizer 代替。Jieba 专为中文分词而设计，能提供更好的效果。</p>
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
    </button></h2><p>日语和韩语是聚合语言：被称为 "微粒 "的语法标记直接附着在名词上，形成许多组合。例如</p>
<table>
   <tr>
     <th><p>语言</p></th>
     <th><p>词根</p></th>
     <th><p>+ 词缀</p></th>
     <th><p>= 组合形式</p></th>
     <th><p>意义</p></th>
   </tr>
   <tr>
     <td><p>韩语</p></td>
     <td><p>首尔</p></td>
     <td><p>首尔</p></td>
     <td><p>首尔</p></td>
     <td><p>在首尔</p></td>
   </tr>
   <tr>
     <td><p>日本</p></td>
     <td><p>东京</p></td>
     <td><p>に</p></td>
     <td><p>东京に</p></td>
     <td><p>前往东京</p></td>
   </tr>
</table>
<p><code translate="no">lindera</code> tokenizer：</p>
<ol>
<li><p><strong>将文本分割</strong>成单个词素（单词和微粒）</p></li>
<li><p>用词典中的语音部分 (POS) 信息<strong>标记每个标记符</strong></p></li>
<li><p><strong>应用过滤器</strong>去除不需要的标记符（如微粒、标点符号等）</p></li>
</ol>
<p>这个两阶段的过程--先进行分词，再进行基于 POS 的过滤--可以精确控制哪些标记符被编入索引以进行搜索。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<p><strong>Milvus 2.6 以上用户</strong>：您可以跳过本节。所有词典都已预编译并包含在正式版本中。</p>
</div>
<p>对于 Milvus 2.5.x，您需要在启用特定词典的情况下编译 Milvus。编译时必须明确包含所有词典。</p>
<p>要启用特定词典，请在编译命令中包含这些词典：</p>
<pre><code translate="no" class="language-bash">make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ko-dic
<button class="copy-code-btn"></button></code></pre>
<p>可用词典的完整列表：</p>
<table>
   <tr>
     <th><p><strong>词典</strong></p></th>
     <th><p><strong>语言</strong></p></th>
     <th><p><strong>语言</strong></p></th>
   </tr>
   <tr>
     <td><p>lindera-ko-dic</p></td>
     <td><p>韩语</p></td>
     <td><p>韩语形态词典<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">（MeCab Ko-dic）</a></p></td>
   </tr>
   <tr>
     <td><p>lindera-ipadic</p></td>
     <td><p>日语</p></td>
     <td><p>标准形态词典<a href="https://taku910.github.io/mecab/">（MeCab IPADIC）</a></p></td>
   </tr>
   <tr>
     <td><p>lindera-ipadic-neologd</p></td>
     <td><p>日语</p></td>
     <td><p>包含新词和专有名词的扩展词典<a href="https://github.com/neologd/mecab-ipadic-neologd">（IPADIC NEologd）</a></p></td>
   </tr>
   <tr>
     <td><p>lindera-unidic</p></td>
     <td><p>日语</p></td>
     <td><p>学术标准词典<a href="https://clrd.ninjal.ac.jp/unidic/">(UniDic</a>)</p></td>
   </tr>
   <tr>
     <td><p>lindera-cc-cedict</p></td>
     <td><p>日语</p></td>
     <td><p>社区维护的汉英词典<a href="https://cc-cedict.org/wiki/">(CC-CEDICT</a>)</p></td>
   </tr>
</table>
<p>例如，启用所有词典：</p>
<pre><code translate="no" class="language-bash">make milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ipadic-neologd,lindera-unidic,lindera-ko-dic,lindera-cc-cedict
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>要配置使用<code translate="no">lindera</code> 标记符号生成器的分析器，请将<code translate="no">tokenizer.type</code> 设置为<code translate="no">lindera</code> ，选择<code translate="no">dict_kind</code> 的字典，并可选择应用过滤器。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
     <th><p>参数</p></th>
     <th><p>参数</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>标记符类型。固定为<code translate="no">"lindera"</code> 。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dict_kind</code></p></td>
     <td><p>用于定义词汇的字典。可能的值：</p><ul><li><p><code translate="no">ko-dic</code>:韩语 - 韩语形态词典<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">（MeCab Ko-dic）</a></p></li><li><p><code translate="no">ipadic</code>:日语 - 标准形态词典<a href="https://taku910.github.io/mecab/">(MeCab IPADIC</a>)</p></li><li><p><code translate="no">ipadic-neologd</code>:日语新词词典（扩展）- 包括新词和专有名词<a href="https://github.com/neologd/mecab-ipadic-neologd">(IPADIC NEologd</a>)</p></li><li><p><code translate="no">unidic</code>:日语 UniDic（扩展）- 包含详细语言信息的学术标准词典<a href="https://clrd.ninjal.ac.jp/unidic/">(UniDic</a>)</p></li><li><p><code translate="no">cc-cedict</code>:中文普通话（繁体/简体） - 社区维护的汉英词典<a href="https://cc-cedict.org/wiki/">(CC-CEDICT</a>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">filter</code></p></td>
     <td><p>在分段后应用的标记符号级过滤器列表。每个过滤器都是一个对象，具有</p><ul><li><p><code translate="no">kind</code>:过滤器类型。支持的值：</p><ul><li><p><code translate="no">korean_stop_tags</code>:移除与指定的韩国 POS 标记相匹配的标记。</p></li><li><p><code translate="no">japanese_stop_tags</code>:移除与指定日语 POS 标记匹配的词组。</p></li></ul></li><li><p><code translate="no">tags</code>:要过滤掉的 POS 标记列表。可用标记取决于<code translate="no">kind</code> ：</p><ul><li><p>对于<code translate="no">korean_stop_tags</code> ：使用精确的标记代码（如<code translate="no">JKS</code>,<code translate="no">JKO</code>,<code translate="no">SF</code> ）。韩语标记需要精确匹配。有关基于世宗标记集的完整列表，请参阅<a href="https://docs.rs/lindera/latest/src/lindera/token_filter/korean_stop_tags.rs.html">Lindera Korean stop tags source</a>。</p></li><li><p>对于<code translate="no">japanese_stop_tags</code> ：使用精确的标记代码（如<code translate="no">助詞,格助詞</code>,<code translate="no">助詞,係助詞</code>,<code translate="no">助動詞</code> ）。日语标记需要精确匹配。有关完整列表 (IPADIC)，请参阅<a href="https://github.com/taku910/mecab/blob/master/mecab-ipadic/pos-id.def">日语 POS 标记参考</a>。</p></li></ul></li></ul></td>
   </tr>
</table>
<p>定义<code translate="no">analyzer_params</code> 后，可以在定义 Collections Schema 时将它们应用到<code translate="no">VARCHAR</code> 字段。这样，Milvus 就能使用指定的分析器处理该字段中的文本，以实现高效的标记化和过滤。有关详情，请参阅<a href="/docs/zh/analyzer-overview.md#Example-use">示例使用</a>。</p>
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
    </button></h2><p>在将分析器配置应用到 Collections 模式之前，请使用<code translate="no">run_analyzer</code> 方法验证其行为。</p>
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
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<p><strong>预期输出</strong>：</p>
<pre><code translate="no" class="language-plaintext">[&#x27;서울&#x27;, &#x27;맛있&#x27;, &#x27;음식&#x27;, &#x27;먹&#x27;, &#x27;습니다&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p>如果没有<code translate="no">korean_stop_tags</code> ，输出将包括<code translate="no">에서</code> (in)、<code translate="no">는</code> (主题标记) 和<code translate="no">을</code> (对象标记) 等微粒，这些微粒通常对搜索无用。</p>
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
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
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
<p><strong>预期输出：</strong></p>
<pre><code translate="no" class="language-plaintext">[&#x27;東京&#x27;, &#x27;スカイ&#x27;, &#x27;ツリー&#x27;, &#x27;最寄り駅&#x27;, &#x27;とう&#x27;, &#x27;きょう&#x27;, &#x27;スカイ&#x27;, &#x27;ツリー&#x27;, &#x27;駅&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p>如果没有<code translate="no">japanese_stop_tags</code> ，输出将包括<code translate="no">の</code> （所有格）、<code translate="no">は</code> （主题标记）和<code translate="no">です</code> （共轭词）等语素。</p>
