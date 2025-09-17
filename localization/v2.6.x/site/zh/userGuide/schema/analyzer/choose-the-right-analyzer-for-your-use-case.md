---
id: choose-the-right-analyzer-for-your-use-case.md
title: 根据使用案例选择正确的分析仪
summary: 说明
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">根据使用案例选择正确的分析仪<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert note">
<p>本指南侧重于分析仪选择的实际决策。有关分析仪组件和如何添加分析仪参数的技术细节，请参阅<a href="/docs/zh/analyzer-overview.md">分析仪概述</a>。</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">在 2 分钟内了解分析仪<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，分析器处理存储在该字段中的文本，使其可用于<a href="/docs/zh/full-text-search.md">全文搜索</a>(BM25)、<a href="/docs/zh/phrase-match.md">短语匹配</a>或<a href="/docs/zh/keyword-match.md">文本匹配</a>等功能的搜索。可以把它想象成一个文本处理器，把原始内容转换成可搜索的标记。</p>
<p>分析器通过一个简单的两阶段管道工作：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" />
   </span> <span class="img-wrapper"> <span>分析器工作流程</span> </span></p>
<ol>
<li><p><strong>标记化（必需）：</strong>初始阶段应用<strong>标记化器</strong>，将连续的文本字符串分解成离散的、有意义的单元（称为标记）。标记化方法会因语言和内容类型的不同而有很大差异。</p></li>
<li><p><strong>标记过滤（可选）：</strong>标记化之后，应用<strong>过滤器</strong>来修改、删除或完善标记。这些操作可包括将所有标记符转换为小写、删除常见的无意义词（如停止词）或将词还原为词根形式（词干化）。</p></li>
</ol>
<p><strong>举例说明</strong>：</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">为什么选择分析器很重要<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>选择错误的分析器会导致相关文档无法搜索或返回不相关的结果。</p>
<p>下表总结了分析器选择不当导致的常见问题，并提供了诊断搜索问题的可行解决方案。</p>
<table>
   <tr>
     <th><p>问题</p></th>
     <th><p>症状</p></th>
     <th><p>示例（输入和输出）</p></th>
     <th><p>原因（坏分析仪）</p></th>
     <th><p>解决方案（好的分析仪）</p></th>
   </tr>
   <tr>
     <td><p>过度标示</p></td>
     <td><p>技术术语、标识符或 URL 的文本查询无法找到相关文档。</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> →<code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> →<code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/zh/standard-analyzer.md"><code translate="no">standard</code></a>分析器</p></td>
     <td><p>使用 <a href="/docs/zh/whitespace-tokenizer.md"><code translate="no">whitespace</code></a>标记符；与 <a href="/docs/zh/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a>过滤器。</p></td>
   </tr>
   <tr>
     <td><p>标记不足</p></td>
     <td><p>搜索多词短语的一个组成部分时，无法返回包含完整短语的文档。</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> →<code translate="no">['state-of-the-art']</code></p></td>
     <td><p>带有 <a href="/docs/zh/whitespace-tokenizer.md"><code translate="no">whitespace</code></a>标记化器</p></td>
     <td><p>使用 <a href="/docs/zh/standard-tokenizer.md"><code translate="no">standard</code></a>标记符来分割标点符号和空格；使用自定义<a href="/docs/zh/regex-filter.md">regex</a>过滤器。</p></td>
   </tr>
   <tr>
     <td><p>语言不匹配</p></td>
     <td><p>特定语言的搜索结果不合理或不存在。</p></td>
     <td><p>中文文本： <code translate="no">"机器学习"</code> →<code translate="no">['机器学习']</code> （一个标记）</p></td>
     <td><p><a href="/docs/zh/english-analyzer.md"><code translate="no">english</code></a>分析器</p></td>
     <td><p>使用特定语言的分析器，如 <a href="/docs/zh/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">第一个问题需要选择分析器吗？<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>对于许多用例，您不需要做任何特别的事情。让我们来判断您是否属于这种情况。</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">默认行为：<code translate="no">standard</code> 分析器<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>如果在使用全文检索等文本检索功能时没有指定分析器，Milvus 会自动使用 <a href="/docs/zh/standard-analyzer.md"><code translate="no">standard</code></a>分析器。</p>
<p><code translate="no">standard</code> 分析器：</p>
<ul>
<li><p>根据空格和标点符号分割文本</p></li>
<li><p>将所有标记转换为小写字母</p></li>
<li><p>删除一组内置的常用英文停顿词和大部分标点符号</p></li>
</ul>
<p><strong>转换示例</strong>：</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">判定标准：快速检查<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>使用本表可快速确定<code translate="no">standard</code> 默认分析器是否满足您的需求。如果不符合，则需要选择其他路径。</p>
<table>
   <tr>
     <th><p>您的内容</p></th>
     <th><p>标准分析仪可以吗？</p></th>
     <th><p>为什么</p></th>
     <th><p>您的需求</p></th>
   </tr>
   <tr>
     <td><p>英文博客文章</p></td>
     <td><p>✅ 是</p></td>
     <td><p>默认行为即可。</p></td>
     <td><p>使用默认行为（无需配置）。</p></td>
   </tr>
   <tr>
     <td><p>中文文档</p></td>
     <td><p>❌ 否</p></td>
     <td><p>中文单词没有空格，将被视为一个标记。</p></td>
     <td><p>使用内置 <a href="/docs/zh/chinese-analyzer.md"><code translate="no">chinese</code></a>分析器。</p></td>
   </tr>
   <tr>
     <td><p>技术文档</p></td>
     <td><p>❌否</p></td>
     <td><p>标点符号会从<code translate="no">C++</code> 等术语中去除。</p></td>
     <td><p>创建带有 <a href="/docs/zh/whitespace-tokenizer.md"><code translate="no">whitespace</code></a>标记符和 <a href="/docs/zh/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a>过滤器。</p></td>
   </tr>
   <tr>
     <td><p>空格分隔语言，如法语/西班牙语文本</p></td>
     <td><p>⚠️ 可能</p></td>
     <td><p>重音字符 (<code translate="no">café</code> 与<code translate="no">cafe</code>) 可能不匹配。</p></td>
     <td><p>建议使用带有 <a href="/docs/zh/ascii-folding-filter.md"><code translate="no">asciifolding</code></a>的自定义分析器可获得更好的结果。</p></td>
   </tr>
   <tr>
     <td><p>多语种或未知语言</p></td>
     <td><p>❌ 否</p></td>
     <td><p><code translate="no">standard</code> 分析仪缺乏处理不同字符集和标记化规则所需的特定语言逻辑。</p></td>
     <td><p>使用带有 <a href="/docs/zh/icu-tokenizer.md"><code translate="no">icu</code></a>标记化器进行单编码标记化。 </p><p>或者，考虑配置<a href="/docs/zh/multi-language-analyzers.md">多语言分析器</a>或<a href="/docs/zh/language-identifier.md">语言标识符</a>，以便更精确地处理多语言内容。</p></td>
   </tr>
</table>
<p>如果默认的<code translate="no">standard</code> 分析器不能满足您的要求，您就需要实施一个不同的分析器。您有两种选择：</p>
<ul>
<li><p><a href="/docs/zh/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">使用内置分析器</a>或</p></li>
<li><p><a href="/docs/zh/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">创建自定义分析器</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">路径 A：使用内置分析器<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>内置分析器是为常用语言预先配置的解决方案。当默认的标准分析器不适合时，它们是最简单的入门方法。</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">可用的内置分析器<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>分析器</p></th>
     <th><p>语言支持</p></th>
     <th><p>组件</p></th>
     <th><p>注释</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>大多数空格分隔语言（英语、法语、德语、西班牙语等）</p></td>
     <td><ul><li><p>分词器<code translate="no">standard</code></p></li><li><p>过滤器：<code translate="no">lowercase</code></p></li></ul></td>
     <td><p>用于初始文本处理的通用分析器。对于单语场景，特定语言分析器（如<code translate="no">english</code> ）可提供更好的性能。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>专用于英语，可应用词干和停顿词去除，以实现更好的英语语义匹配</p></td>
     <td><ul><li><p>分词器：<code translate="no">standard</code></p></li><li><p>过滤器<code translate="no">lowercase</code>,<code translate="no">stemmer</code> 、<code translate="no">stop</code></p></li></ul></td>
     <td><p>推荐用于纯英文内容，超过<code translate="no">standard</code> 。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>中文</p></td>
     <td><ul><li><p>Tokenizer：<code translate="no">jieba</code></p></li><li><p>过滤器：<code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>目前默认使用简体中文字典。</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">实施示例<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>要使用内置分析器，只需在定义字段模式时在<code translate="no">analyzer_params</code> 中指定其类型即可。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using built-in English analyzer</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>有关详细用法，请参阅<a href="/docs/zh/full-text-search.md">全文搜索</a>、<a href="/docs/zh/keyword-match.md">文本匹配</a>或<a href="/docs/zh/phrase-match.md">短语匹配</a>。</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">路径 B：创建自定义分析器<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>当<a href="/docs/zh/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">内置选项</a>无法满足您的需求时，您可以通过将标记符与一组过滤器相结合来创建自定义分析器。这样就可以完全控制文本处理管道。</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">第 1 步：根据语言选择标记符<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>根据内容的主要语言选择标记符：</p>
<h4 id="Western-languages" class="common-anchor-header">西方语言</h4><p>对于空格分隔的语言，您有以下选项：</p>
<table>
   <tr>
     <th><p>标记符</p></th>
     <th><p>如何使用</p></th>
     <th><p>最适合</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>根据空格和标点符号分割文本</p></td>
     <td><p>一般文本，混合标点符号</p></td>
     <td><ul><li><p>输入：<code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>输出：<code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>仅根据空白字符分割</p></td>
     <td><p>预处理内容、用户格式文本</p></td>
     <td><ul><li><p>输入： 输出<code translate="no">"user_id = get_user_data()"</code></p></li><li><p>输出<code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">东亚语言</h4><p>以字典为基础的语言需要专门的标记化器来正确分词：</p>
<h5 id="Chinese" class="common-anchor-header">中文</h5><table>
   <tr>
     <th><p>分词器</p></th>
     <th><p>工作原理</p></th>
     <th><p>最适合</p></th>
     <th><p>实例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>基于词典的中文智能分词算法</p></td>
     <td><p><strong>推荐用于中文内容</strong>--结合词典和智能算法，专为中文设计</p></td>
     <td><ul><li><p>输入<code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>输出：<code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>基于中文词典的纯词典形态分析<a href="https://cc-cedict.org/wiki/">(cc-cedict</a>)</p></td>
     <td><p>与<code translate="no">jieba</code> 相比，以更通用的方式处理中文文本</p></td>
     <td><ul><li><p>输入：输出<code translate="no">"机器学习算法"</code></p></li><li><p>输出：<code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">日语和韩语</h5><table>
   <tr>
     <th><p>语言</p></th>
     <th><p>分词器</p></th>
     <th><p>词典选项</p></th>
     <th><p>最适合</p></th>
     <th><p>例子</p></th>
   </tr>
   <tr>
     <td><p>日语</p></td>
     <td><p><a href="/docs/zh/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a>（通用）、ipadic-<a href="https://github.com/neologd/mecab-ipadic-neologd">neologd</a>（现代术语）、<a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a>（学术术语）</p></td>
     <td><p>处理专有名词的词形分析</p></td>
     <td><ul><li><p>输入<code translate="no">"東京都渋谷区"</code></p></li><li><p>输出：<code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>韩语</p></td>
     <td><p><a href="/docs/zh/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>韩语形态分析</p></td>
     <td><ul><li><p>输入<code translate="no">"안녕하세요"</code></p></li><li><p>输出<code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">多语言或未知语言</h4><p>适用于文档中语言不可预测或混合的内容：</p>
<table>
   <tr>
     <th><p>分词器</p></th>
     <th><p>工作原理</p></th>
     <th><p>最适合</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>识别统一码的标记化（统一码国际组件）</p></td>
     <td><p>混合脚本、未知语言，或只需简单的标记化即可</p></td>
     <td><ul><li><p>输入<code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>输出<code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>何时使用 icu</strong>：</p>
<ul>
<li><p>语言识别不切实际的混合语言。</p></li>
<li><p>您不需要<a href="/docs/zh/multi-language-analyzers.md">多语言分析器</a>或<a href="/docs/zh/language-identifier.md">语言识别器</a>的开销。</p></li>
<li><p>内容以一种语言为主，偶尔出现对整体意义影响不大的外来词（例如，英文文本中偶尔出现日文或法文的品牌名称或技术术语）。</p></li>
</ul>
<p><strong>其他方法</strong>：要更精确地处理多语言内容，可考虑使用多语言分析器或语言识别器。详情请参阅<a href="/docs/zh/multi-language-analyzers.md">多语言分析器</a>或<a href="/docs/zh/language-identifier.md">语言标识符</a>。</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">第 2 步：添加过滤器以提高精确度<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/zh/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">选择标记符后</a>，根据具体的搜索要求和内容特征应用过滤器。</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">常用过滤器</h4><p>这些过滤器对于大多数空格分隔的语言配置（英语、法语、德语、西班牙语等）至关重要，可显著提高搜索质量：</p>
<table>
   <tr>
     <th><p>过滤器</p></th>
     <th><p>如何使用</p></th>
     <th><p>何时使用</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>将所有标记转换为小写</p></td>
     <td><p>通用 - 适用于所有有大小写区分的语言</p></td>
     <td><ul><li><p>输入<code translate="no">["Apple", "iPhone"]</code></p></li><li><p>输出：<code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>将单词还原为词根形式</p></td>
     <td><p>有词性变化的语言（英语、法语、德语等）</p></td>
     <td><p>英语</p><ul><li><p>输入<code translate="no">["running", "runs", "ran"]</code></p></li><li><p>输出：<code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>删除常见的无意义词语</p></td>
     <td><p>大多数语言--对空格分隔的语言尤其有效</p></td>
     <td><ul><li><p>输入：<code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>输出：<code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>对于东亚语言（中文、日文、韩文等），应将重点放在<a href="/docs/zh/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">特定语言过滤器</a>上。这些语言通常使用不同的文本处理方法，可能不会从词干处理中明显受益。</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">文本规范化过滤器</h4><p>这些筛选器可将文本变化标准化，以提高匹配的一致性：</p>
<table>
   <tr>
     <th><p>过滤器</p></th>
     <th><p>如何使用</p></th>
     <th><p>何时使用</p></th>
     <th><p>举例说明</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>将重音字符转换为 ASCII 对应字符</p></td>
     <td><p>国际内容、用户生成的内容</p></td>
     <td><ul><li><p>输入<code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>输出<code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">标记过滤</h4><p>根据字符内容或长度控制保留哪些标记：</p>
<table>
   <tr>
     <th><p>过滤</p></th>
     <th><p>工作原理</p></th>
     <th><p>何时使用</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>删除独立的标点符号</p></td>
     <td><p>清除<code translate="no">jieba</code>,<code translate="no">lindera</code>,<code translate="no">icu</code> 标记化器的输出，这些标记化器会将标点符号作为单个标记返回</p></td>
     <td><ul><li><p>输入<code translate="no">["Hello", "!", "world"]</code></p></li><li><p>输出：<code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>只保留字母和数字</p></td>
     <td><p>技术内容，纯文本处理</p></td>
     <td><ul><li><p>输入： 输出： 只保留字母和数字<code translate="no">["user123", "test@email.com"]</code></p></li><li><p>输出：<code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>删除指定长度范围之外的标记</p></td>
     <td><p>过滤噪音（过长标记符）</p></td>
     <td><ul><li><p>输入<code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>输出： <code translate="no">[['a'], ['very'], []]</code> (如果<strong>max=10）</strong></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>基于模式的自定义过滤</p></td>
     <td><p>特定领域的标记要求</p></td>
     <td><ul><li><p>输入<code translate="no">["test123", "prod456"]</code></p></li><li><p>输出： <code translate="no">[[], ['prod456']]</code> (如果<strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">特定语言过滤器</h4><p>这些过滤器可处理特定的语言特点：</p>
<table>
   <tr>
     <th><p>过滤器</p></th>
     <th><p>语言</p></th>
     <th><p>工作原理</p></th>
     <th><p>举例说明</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>德语</p></td>
     <td><p>将复合词拆分成可搜索的成分</p></td>
     <td><ul><li><p>输入：<code translate="no">["dampfschifffahrt"]</code></p></li><li><p>输出：<code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>中文</p></td>
     <td><p>保留汉字 + 字母数字</p></td>
     <td><ul><li><p>输入：<code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>输出<code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>中文</p></td>
     <td><p>只保留汉字</p></td>
     <td><ul><li><p>输入：<code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>输出： 中文<code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">步骤 3：组合并执行<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>要创建自定义分析器，您需要在<code translate="no">analyzer_params</code> 字典中定义标记符和过滤器列表。筛选器将按照列出的顺序应用。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: A custom analyzer for technical content</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;alphanumonly&quot;</span>]
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">最后：测试<code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>在应用到 Collections 之前，请务必验证您的配置：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>需要检查的常见问题：</p>
<ul>
<li><p><strong>过度标示</strong>：技术术语被错误分割</p></li>
<li><p><strong>标示不足</strong>：短语未正确分隔</p></li>
<li><p><strong>缺失标记</strong>：重要术语被过滤掉</p></li>
</ul>
<p>有关详细用法，请参阅<a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>。</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">按用例推荐的配置<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>本节为在 Milvus 中使用分析器时的常见用例提供了推荐的标记符和过滤器配置。请选择最符合您的内容类型和搜索要求的组合。</p>
<div class="alert note">
<p>在将分析器应用到 Collections 之前，我们建议您使用 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a>来测试和验证文本分析性能。</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">带重音符号的语言（法语、西班牙语、德语等）<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>使用带有小写转换、特定语言词干和停止词去除功能的<code translate="no">standard</code> 标记器。通过修改<code translate="no">language</code> 和<code translate="no">stop_words</code> 参数，此配置也适用于其他欧洲语言。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># French example</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>, 
        <span class="hljs-string">&quot;asciifolding&quot;</span>,  <span class="hljs-comment"># Handle accent marks</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;french&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_french_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># For other languages, modify the language parameter:</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;spanish&quot; for Spanish</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;german&quot; for German</span>
<span class="hljs-comment"># &quot;stop_words&quot;: [&quot;_spanish_&quot;] or [&quot;_german_&quot;] accordingly</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="English-content" class="common-anchor-header">英文内容<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>用于英语文本处理和综合过滤。您还可以使用内置的 <a href="/docs/zh/english-analyzer.md"><code translate="no">english</code></a>分析器：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chinese-content" class="common-anchor-header">中文内容<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">jieba</code> 标记器并应用字符过滤器，只保留汉字、拉丁字母和数字。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>对于简体中文，<code translate="no">cnalphanumonly</code> 删除除汉字、字母数字文本和数字以外的所有标记。这样可以防止标点符号影响搜索质量。</p>
</div>
<h3 id="Japanese-content" class="common-anchor-header">日语内容<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">lindera</code> 标记器和日语词典及过滤器来清除标点符号并控制标记长度：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>  <span class="hljs-comment"># Options: ipadic, ipadic-neologd, unidic</span>
    },
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;removepunct&quot;</span>,  <span class="hljs-comment"># Remove standalone punctuation</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
            <span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">20</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Korean-content" class="common-anchor-header">韩文内容<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>与日语类似，使用<code translate="no">lindera</code> 标记符和韩语词典：</p>
<pre><code translate="no" class="language-json">analyzer_params = <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tokenizer&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lindera&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;dict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ko-dic&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;removepunct&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;length&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;min&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;max&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">混合或多语言内容<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>在处理跨多种语言或不可预测地使用脚本的内容时，可从<code translate="no">icu</code> 分析器开始。这种识别 Unicode 的分析器能有效处理混合脚本和符号。</p>
<p><strong>基本多语言配置（无词干）</strong>：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>高级多语言处理</strong>：</p>
<p>为了更好地控制不同语言的标记行为：</p>
<ul>
<li><p>使用<strong>多语言分析仪</strong>配置。详情请参阅<a href="/docs/zh/multi-language-analyzers.md">多语言分析器</a>。</p></li>
<li><p>在内容中使用<strong>语言标识符</strong>。详情请参阅<a href="/docs/zh/language-identifier.md">语言标识符</a>。</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">与文本检索功能集成<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>选择分析器后，您可以将其与 Milvus 提供的文本检索功能集成。</p>
<ul>
<li><p><strong>全文检索</strong></p>
<p>分析器通过生成稀疏向量直接影响基于 BM25 的全文检索。索引和查询使用相同的分析器，以确保标记化的一致性。与通用分析器相比，特定语言分析器通常能提供更好的 BM25 评分。有关实施细节，请参阅<a href="/docs/zh/full-text-search.md">全文搜索</a>。</p></li>
<li><p><strong>文本匹配</strong></p>
<p>文本匹配操作根据您的分析器输出在查询和索引内容之间执行精确的标记匹配。有关实施细节，请参阅<a href="/docs/zh/keyword-match.md">文本匹配</a>。</p></li>
<li><p><strong>短语匹配</strong></p>
<p>短语匹配要求对多词表达式进行一致的标记化，以保持短语的边界和含义。有关实施细节，请参阅<a href="/docs/zh/phrase-match.md">短语匹配</a>。</p></li>
</ul>
