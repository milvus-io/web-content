---
id: choose-the-right-analyzer-for-your-use-case.md
title: 根据您的应用场景选择合适的分析器
summary: 注释
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">根据您的应用场景选择合适的分析器<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<p>本指南侧重于分析仪选型的实际决策。有关分析仪组件的技术细节以及如何添加分析仪参数，请参阅《<a href="/docs/zh/analyzer-overview.md">分析仪概述</a>》。</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">2 分钟了解分析器<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，分析器会处理存储在此字段中的文本，使其可用于<a href="/docs/zh/full-text-search.md">全文检索</a>（BM25）、<a href="/docs/zh/phrase-match.md">短语匹配</a>或<a href="/docs/zh/keyword-match.md">文本匹配</a>等功能。您可以将其视为一种文本处理器，将原始内容转换为可检索的令牌。</p>
<p>分析器的处理流程遵循简单的两阶段管道：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" /> 
   <span>分析器工作流</span>
  
 </span></p>
<ol>
<li><p><strong>分词（必选）：</strong>此初始阶段应用<strong>分词器</strong>，将连续的文本字符串拆分为离散且有意义的单元，即分词。分词方法会因语言和内容类型而存在显著差异。</p></li>
<li><p><strong>词元过滤（可选）：</strong>词元化完成后，会应用<strong>过滤器</strong>来修改、删除或优化词元。这些操作可能包括将所有词元转换为小写、移除常见的无意义词（如停用词），或将单词还原为词干形式（词干化）。</p></li>
</ol>
<p><strong>示例</strong>：</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">为何分析器的选择至关重要<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>选择错误的分析器可能会导致相关文档无法被检索，或返回不相关的结果。</p>
<p>下表总结了因分析器选择不当而导致的常见问题，并提供了用于诊断搜索问题的切实可行的解决方案。</p>
<table>
   <tr>
     <th><p>问题</p></th>
     <th><p>症状</p></th>
     <th><p>示例（输入与输出）</p></th>
     <th><p>原因（分析器不合适）</p></th>
     <th><p>解决方案（合适的分析器）</p></th>
   </tr>
   <tr>
     <td><p>过度分词</p></td>
     <td><p>针对技术术语、标识符或URL的文本查询无法找到相关文档。</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> →<code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> →<code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/zh/standard-analyzer.md"><code translate="no">standard</code></a> 分析器</p></td>
     <td><p>使用 <a href="/docs/zh/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> 分词器；并配合使用 <a href="/docs/zh/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> 过滤器。</p></td>
   </tr>
   <tr>
     <td><p>分词不足</p></td>
     <td><p>搜索多词短语中的某个组成部分时，无法返回包含该完整短语的文档。</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> →<code translate="no">['state-of-the-art']</code></p></td>
     <td><p>使用 <a href="/docs/zh/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> 分词器</p></td>
     <td><p>使用一个 <a href="/docs/zh/standard-tokenizer.md"><code translate="no">standard</code></a> 分词器按标点符号和空格进行分割；使用自定义<a href="/docs/zh/regex-filter.md">正则表达式</a>过滤器。</p></td>
   </tr>
   <tr>
     <td><p>语言不匹配</p></td>
     <td><p>特定语言的搜索结果毫无意义或根本不存在。</p></td>
     <td><p>中文文本：<code translate="no">"机器学习"</code> →<code translate="no">['机器学习']</code> （一个词元）</p></td>
     <td><p><a href="/docs/zh/english-analyzer.md"><code translate="no">english</code></a> 分析器</p></td>
     <td><p>使用特定语言的分析器，例如 <a href="/docs/zh/chinese-analyzer.md"><code translate="no">chinese</code></a>。</p></td>
   </tr>
   <tr>
     <td><p>输入法不匹配</p></td>
     <td><p>用户输入拼音，但索引文本使用汉字。</p></td>
     <td><p>中文文本：<code translate="no">"足球"</code> ；查询文本：<code translate="no">"zuqiu"</code></p></td>
     <td><p>仅输出汉字分词的分析器</p></td>
     <td><p>使用自定义分析器，并配置 <a href="/docs/zh/jieba-tokenizer.md"><code translate="no">jieba</code></a> 分词器和 <a href="/docs/zh/pinyin-filter.md"><code translate="no">pinyin</code></a> 过滤器。</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">第一个问题：您需要选择分析器吗？<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>对于许多用例，您无需进行任何特殊操作。让我们确定您的情况是否属于其中之一。</p>
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
    </button></h3><p>如果您在使用全文检索等功能时未指定分析器，Milvus 会自动使用 <a href="/docs/zh/standard-analyzer.md"><code translate="no">standard</code></a> 分析器。</p>
<p><code translate="no">standard</code> 分析器：</p>
<ul>
<li><p>根据空格和标点符号分割文本</p></li>
<li><p>将所有词元转换为小写</p></li>
<li><p>移除一组内置的常见英语停用词以及大部分标点符号</p></li>
</ul>
<p><strong>转换示例</strong>：</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">决策标准：快速检查<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>请参考此表快速判断默认的<code translate="no">standard</code> 分析器是否满足您的需求。若不满足，则需选择其他方案。</p>
<table>
   <tr>
     <th><p>您的内容</p></th>
     <th><p>标准分析器适用吗？</p></th>
     <th><p>原因</p></th>
     <th><p>您的需求</p></th>
   </tr>
   <tr>
     <td><p>英文博客文章</p></td>
     <td><p>✅ 是</p></td>
     <td><p>默认行为已足够。</p></td>
     <td><p>使用默认设置（无需配置）。</p></td>
   </tr>
   <tr>
     <td><p>中文文档</p></td>
     <td><p>❌ 否</p></td>
     <td><p>中文单词没有空格，将被视为一个词元。</p></td>
     <td><p>使用内置的 <a href="/docs/zh/chinese-analyzer.md"><code translate="no">chinese</code></a> 词法分析器。</p></td>
   </tr>
   <tr>
     <td><p>阿拉伯语文档</p></td>
     <td><p>❌ 不</p></td>
     <td><p>阿拉伯语文本可能包含字母变体、发音符号、Tatweel、阿拉伯-印度数字以及常见的阿拉伯语停用词，这些都需要针对该语言进行特殊处理。</p></td>
     <td><p>使用内置的 <a href="/docs/zh/arabic-analyzer.md"><code translate="no">arabic</code></a> 分析器。</p></td>
   </tr>
   <tr>
     <td><p>泰语文档</p></td>
     <td><p>❌ 不</p></td>
     <td><p>泰语文本通常不在单词之间使用空格，因此需要针对该语言的词分词处理。</p></td>
     <td><p>使用内置的 <a href="/docs/zh/thai-analyzer.md"><code translate="no">thai</code></a> 分析器。</p></td>
   </tr>
   <tr>
     <td><p>技术文档</p></td>
     <td><p>❌ 否</p></td>
     <td><p>诸如<code translate="no">C++</code> 之类的术语中的标点符号会被去除。</p></td>
     <td><p>使用 <a href="/docs/zh/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> 分词器和 <a href="/docs/zh/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> 过滤器。</p></td>
   </tr>
   <tr>
     <td><p>以空格分隔的语言，例如法语/西班牙语文本</p></td>
     <td><p>⚠️ 可能</p></td>
     <td><p>带重音的字符（<code translate="no">café</code> 与<code translate="no">cafe</code> ）可能无法匹配。</p></td>
     <td><p>建议使用带有 <a href="/docs/zh/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> 的自定义分析器可获得更佳效果。</p></td>
   </tr>
   <tr>
     <td><p>多语言或未知语言</p></td>
     <td><p>❌ 不支持</p></td>
     <td><p><code translate="no">standard</code> 分析器缺乏处理不同字符集和分词规则所需的特定语言逻辑。</p></td>
     <td><p>请使用带有 <a href="/docs/zh/icu-tokenizer.md"><code translate="no">icu</code></a> 令牌化器配合使用，以实现支持 Unicode 的令牌化。 </p><p>或者，可考虑配置<a href="/docs/zh/multi-language-analyzers.md">多语言分析器</a>或<a href="/docs/zh/language-identifier.md">语言标识符</a>，以更精确地处理多语言内容。</p></td>
   </tr>
</table>
<p>如果默认的<code translate="no">standard</code> 分析器无法满足您的需求，则需要实现一个不同的分析器。您有两种途径：</p>
<ul>
<li><p><a href="/docs/zh/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">使用内置分析器</a>，或者</p></li>
<li><p><a href="/docs/zh/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">创建自定义分析器</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">方案 A：使用内置分析器<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>内置分析器是针对常见语言的预配置解决方案。当默认标准分析器无法完全满足需求时，这是最简便的入门方式。</p>
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
     <th><p>支持的语言</p></th>
     <th><p>组件</p></th>
     <th><p>备注</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>大多数以空格分隔的语言（英语、法语、德语、西班牙语等）</p></td>
     <td><ul><li><p>分词器：<code translate="no">standard</code></p></li><li><p>过滤器：<code translate="no">lowercase</code></p></li></ul></td>
     <td><p>用于初始文本处理的通用分析器。在单语种场景下，特定语言的分析器（如<code translate="no">english</code> ）能提供更好的性能。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>专为英语设计，通过词干提取和停用词过滤，以实现更精准的英语语义匹配</p></td>
     <td><ul><li><p>分词器：<code translate="no">standard</code></p></li><li><p>过滤器：<code translate="no">lowercase</code> 、<code translate="no">stemmer</code> 、<code translate="no">stop</code></p></li></ul></td>
     <td><p>对于纯英语内容，建议优先使用此分析器而非<code translate="no">standard</code> 。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>中文</p></td>
     <td><ul><li><p>分词器：<code translate="no">jieba</code></p></li><li><p>过滤器：<code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>当前默认使用简体中文词典。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/arabic-analyzer.md"><code translate="no">arabic</code></a></p></td>
     <td><p>阿拉伯语</p></td>
     <td><ul><li><p>分词器：<code translate="no">standard</code></p></li><li><p>过滤器：<code translate="no">lowercase</code> 、<code translate="no">decimaldigit</code> 、<code translate="no">arabic_normalization</code> 、<code translate="no">stemmer</code> 、<code translate="no">stop</code></p></li></ul></td>
     <td><p>对于阿拉伯语文本，建议优先使用<code translate="no">standard</code> 而非 。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/thai-analyzer.md"><code translate="no">thai</code></a></p></td>
     <td><p>泰语</p></td>
     <td><ul><li><p>分词器：<code translate="no">thai</code></p></li><li><p>过滤器：<code translate="no">lowercase</code> 、<code translate="no">decimaldigit</code> 、<code translate="no">stop</code></p></li></ul></td>
     <td><p>对于泰语文本，推荐使用<code translate="no">standard</code> ，而非基于空格的分词。</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">实现示例<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>要使用内置分析器，只需在定义字段Schema时，在<code translate="no">analyzer_params</code> 中指定其类型即可。</p>
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
<p>有关详细用法，请参阅<a href="/docs/zh/full-text-search.md">“全文搜索”</a>、<a href="/docs/zh/keyword-match.md">“文本匹配</a>”或<a href="/docs/zh/phrase-match.md">“短语匹配</a>”。</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">方案 B：创建自定义分析器<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>当<a href="/docs/zh/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">内置选项</a>无法满足您的需求时，您可以通过将分词器与一组过滤器组合来创建自定义分析器。这使您能够完全控制文本处理流程。</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">步骤 1：根据语言选择分词器<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>请根据内容的主要语言选择分词器：</p>
<h4 id="Western-languages" class="common-anchor-header">西方语言</h4><p>对于以空格分隔的语言，您有以下选项：</p>
<table>
   <tr>
     <th><p>分词器</p></th>
     <th><p>工作原理</p></th>
     <th><p>最适合</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>根据空格和标点符号分割文本</p></td>
     <td><p>普通文本、混合标点</p></td>
     <td><ul><li><p>输入：<code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>输出：<code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>仅按空白字符分割</p></td>
     <td><p>预处理内容、用户格式化的文本</p></td>
     <td><ul><li><p>输入：<code translate="no">"user_id = get_user_data()"</code></p></li><li><p>输出：<code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">东亚语言</h4><p>在词与词之间未始终使用空格的语言，需要专用分词器才能进行正确的词分隔：</p>
<h5 id="Chinese" class="common-anchor-header">中文</h5><table>
   <tr>
     <th><p>分词器</p></th>
     <th><p>工作原理</p></th>
     <th><p>最适合</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>基于中文词典且采用智能算法的分词</p></td>
     <td><p><strong>推荐用于中文内容</strong>——结合词典与智能算法，专为中文设计</p></td>
     <td><ul><li><p>输入：<code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>输出：<code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>基于中文词典（<a href="https://cc-cedict.org/wiki/">cc-cedict</a>）的纯词典形态分析</p></td>
     <td><p>与<code translate="no">jieba</code> 相比，以更通用方式处理中文文本</p></td>
     <td><ul><li><p>输入：<code translate="no">"机器学习算法"</code></p></li><li><p>输出：<code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Thai" class="common-anchor-header">泰语</h5><p>对于大多数泰语文本，请使用内置的 <a href="/docs/zh/thai-analyzer.md"><code translate="no">thai</code></a> 分析器。仅当需要构建自定义分析器管道时，才使用独立的 <a href="/docs/zh/thai-tokenizer.md"><code translate="no">thai</code></a> 分词器仅在需要构建自定义分析器管道时使用。</p>
<table>
   <tr>
     <th><p>分词器</p></th>
     <th><p>工作原理</p></th>
     <th><p>最适合</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/thai-tokenizer.md"><code translate="no">thai</code></a></p></td>
     <td><p>将泰语文本分割为单词令牌，并过滤掉仅包含空格和标点符号的片段</p></td>
     <td><p>适用于泰语或泰语/英语混合文本的自定义分析器管道</p></td>
     <td><ul><li><p>输入：<code translate="no">"สวัสดี! ทดสอบ, ระบบ Milvus"</code></p></li><li><p>输出：<code translate="no">['สวัสดี', 'ทดสอบ', 'ระบบ', 'Milvus']</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">日语和韩语</h5><table>
   <tr>
     <th><p>语言</p></th>
     <th><p>分词器</p></th>
     <th><p>词典选项</p></th>
     <th><p>最适合</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p>日语</p></td>
     <td><p><a href="/docs/zh/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a>（通用型）、<a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a>（现代术语）、<a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a>（学术型）</p></td>
     <td><p>支持专有名词处理的形态分析</p></td>
     <td><ul><li><p>输入：<code translate="no">"東京都渋谷区"</code></p></li><li><p>输出：<code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>韩语</p></td>
     <td><p><a href="/docs/zh/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>韩语形态分析</p></td>
     <td><ul><li><p>输入：<code translate="no">"안녕하세요"</code></p></li><li><p>输出：<code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">多语言或未知语言</h4><p>针对文档内语言无法预测或混合的情况：</p>
<table>
   <tr>
     <th><p>分词器</p></th>
     <th><p>工作原理</p></th>
     <th><p>最适合</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>支持 Unicode 的分词（Unicode 国际组件）</p></td>
     <td><p>混合脚本、未知语言，或仅需简单分词的情况</p></td>
     <td><ul><li><p>输入：<code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>输出：<code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>何时使用 ICU</strong>：</p>
<ul>
<li><p>在无法进行语言识别的混合语言场景中。</p></li>
<li><p>您希望避免<a href="/docs/zh/multi-language-analyzers.md">多语言分析器</a>或<a href="/docs/zh/language-identifier.md">语言标识符</a>带来的额外开销。</p></li>
<li><p>内容以某种主要语言为主，其中偶尔出现对整体含义影响较小的外来词（例如，英文文本中零星出现日语或法语的品牌名称或技术术语）。</p></li>
</ul>
<p><strong>替代方案</strong>：若需更精确地处理多语言内容，请考虑使用多语言分析器或语言标识符。详情请参阅《<a href="/docs/zh/multi-language-analyzers.md">多语言分析器</a>》或《<a href="/docs/zh/language-identifier.md">语言标识符》</a>。</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">步骤 2：添加过滤器以提高精确度<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/zh/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">选择分词器</a>后，请根据具体的搜索需求和内容特征应用过滤器。</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">常用过滤器</h4><p>这些过滤器对于大多数以空格分隔的语言配置（英语、法语、德语、西班牙语等）至关重要，并能显著提高搜索质量：</p>
<table>
   <tr>
     <th><p>过滤器</p></th>
     <th><p>作用原理</p></th>
     <th><p>适用场景</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>将所有词元转换为小写</p></td>
     <td><p>通用——适用于所有区分大小写的语言</p></td>
     <td><ul><li><p>输入：<code translate="no">["Apple", "iPhone"]</code></p></li><li><p>输出：<code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>将单词还原为词根形式</p></td>
     <td><p>具有词形变格的语言（英语、法语、德语等）</p></td>
     <td><p>以英语为例：</p><ul><li><p>输入：<code translate="no">["running", "runs", "ran"]</code></p></li><li><p>输出：<code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>去除常见的无意义词</p></td>
     <td><p>大多数语言——对以空格分隔的语言特别有效</p></td>
     <td><ul><li><p>输入：<code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>输出：<code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>对于东亚语言（中文、日语、韩语等），应重点采用<a href="/docs/zh/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">针对该语言的特定过滤器</a>。这些语言通常采用不同的文本处理方法，词干提取可能对其帮助不大。</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">文本规范化过滤器</h4><p>这些过滤器通过规范化文本变体来提高匹配的一致性：</p>
<table>
   <tr>
     <th><p>过滤器</p></th>
     <th><p>工作原理</p></th>
     <th><p>适用场景</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>将带重音的字符转换为 ASCII 等效字符</p></td>
     <td><p>国际内容、用户生成内容</p></td>
     <td><ul><li><p>输入：<code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>输出：<code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">令牌过滤</h4><p>根据字符内容或长度控制保留哪些令牌：</p>
<table>
   <tr>
     <th><p>过滤</p></th>
     <th><p>工作原理</p></th>
     <th><p>何时使用</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>移除孤立的标点符号词</p></td>
     <td><p>清理由<code translate="no">jieba</code> 、<code translate="no">lindera</code> 、<code translate="no">icu</code> 这些分词器生成的输出结果，这些分词器会将标点符号作为单个词元返回</p></td>
     <td><ul><li><p>输入：<code translate="no">["Hello", "!", "world"]</code></p></li><li><p>输出：<code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>仅保留字母和数字</p></td>
     <td><p>技术内容，文本清理处理</p></td>
     <td><ul><li><p>输入：<code translate="no">["user123", "test@email.com"]</code></p></li><li><p>输出：<code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>移除超出指定长度范围的令牌</p></td>
     <td><p>过滤噪声（过长的令牌）</p></td>
     <td><ul><li><p>输入：<code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>输出：<code translate="no">[['a'], ['very'], []]</code> （若<strong>max=10</strong>）</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>基于自定义模式的过滤</p></td>
     <td><p>特定领域的令牌要求</p></td>
     <td><ul><li><p>输入：<code translate="no">["test123", "prod456"]</code></p></li><li><p>输出：<code translate="no">[[], ['prod456']]</code> （若<strong>expr="^prod"</strong>）</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">特定语言的过滤器</h4><p>这些过滤器处理特定语言的特征：</p>
<table>
   <tr>
     <th><p>过滤器</p></th>
     <th><p>语言</p></th>
     <th><p>工作原理</p></th>
     <th><p>示例</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>德语</p></td>
     <td><p>将复合词拆分为可搜索的组成部分</p></td>
     <td><ul><li><p>输入：<code translate="no">["dampfschifffahrt"]</code></p></li><li><p>输出：<code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>中文</p></td>
     <td><p>保留汉字和字母数字</p></td>
     <td><ul><li><p>输入：<code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>输出：<code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>中文</p></td>
     <td><p>仅保留汉字</p></td>
     <td><ul><li><p>输入：<code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>输出：<code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/pinyin-filter.md"><code translate="no">pinyin</code></a></p></td>
     <td><p>中文</p></td>
     <td><p>将中文词元转换为拼音词元</p></td>
     <td><ul><li><p>输入：<code translate="no">["中文"]</code></p></li><li><p>输出：<code translate="no">[['中文', 'zhong', 'wen']]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">步骤 3：组合与实现<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>要创建自定义分析器，您需要在<code translate="no">analyzer_params</code> 字典中定义分词器和一组过滤器。过滤器将按其列出的顺序应用。</p>
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
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">最后：使用<code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>在将配置应用于 Collection 之前，请务必验证配置：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>需检查的常见问题：</p>
<ul>
<li><p><strong>过度分词</strong>：技术术语被错误拆分</p></li>
<li><p><strong>分词不足</strong>：短语未被正确拆分</p></li>
<li><p><strong>缺失分词</strong>：重要术语被过滤掉</p></li>
</ul>
<p>有关详细用法，请参阅<a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>。</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">按使用场景推荐的配置<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>本节针对在 Milvus 中使用分析器时的常见用例，提供了推荐的分词器和过滤器配置。请选择最符合您的内容类型和搜索需求的组合。</p>
<div class="alert note">
<p>在将分析器应用于您的 Collection 之前，我们建议您使用 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> 进行测试并验证文本分析性能。</p>
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
    </button></h3><p>请使用<code translate="no">standard</code> 分词器，并启用小写转换、特定语言的词干提取以及停用词过滤。通过修改<code translate="no">language</code> 和<code translate="no">stop_words</code> 参数，此配置同样适用于其他欧洲语言。</p>
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
<h3 id="English-content" class="common-anchor-header">英语内容<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>用于对英语文本进行处理并实施全面过滤。您还可以使用内置的 <a href="/docs/zh/english-analyzer.md"><code translate="no">english</code></a> 分析器：</p>
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
    </button></h3><p>使用<code translate="no">jieba</code> 分词器，并应用字符过滤器，仅保留汉字、拉丁字母和数字。</p>
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
<p>对于简体中文，<code translate="no">cnalphanumonly</code> 会移除除汉字、字母数字文本和数字以外的所有词元。这可防止标点符号影响搜索质量。</p>
</div>
<p>如果用户可能通过输入拼音来搜索中文文本，请使用自定义分析器，其中包含<code translate="no">jieba</code> 分词器以及 <a href="/docs/zh/pinyin-filter.md"><code translate="no">pinyin</code></a> 过滤器，而非内置的<code translate="no">chinese</code> 分析器。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>请使用配备日语词典和过滤器的<code translate="no">lindera</code> 分词器，以清理标点符号并控制词元长度：</p>
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
<h3 id="Korean-content" class="common-anchor-header">韩语内容<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>与日语类似，使用<code translate="no">lindera</code> 分词器并配合韩语词典：</p>
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
    </button></h3><p>处理涉及多种语言或使用方式难以预料的字符集的内容时，请优先使用<code translate="no">icu</code> 分析器。该分析器支持Unicode，可有效处理混合字符集和符号。</p>
<p><strong>基本多语言配置（不进行词干提取）</strong>：</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>高级多语言处理</strong>：</p>
<p>若需更好地控制不同语言下的分词行为：</p>
<ul>
<li><p>请使用<strong>多语言分析器</strong>配置。有关详细信息，请参阅《<a href="/docs/zh/multi-language-analyzers.md">多语言分析器</a>》。</p></li>
<li><p>在您的内容中实现<strong>语言标识符</strong>。有关详细信息，请参阅《<a href="/docs/zh/language-identifier.md">语言标识符</a>》。</p></li>
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
<li><p><strong>全文搜索</strong></p>
<p>分析器通过生成稀疏向量，直接影响基于BM25的全文搜索。请在索引和查询中使用相同的分析器，以确保分词的一致性。特定语言的分析器通常比通用分析器能提供更好的BM25评分。有关实现的详细信息，请参阅《<a href="/docs/zh/full-text-search.md">全文搜索</a>》。</p></li>
<li><p><strong>文本匹配</strong></p>
<p>文本匹配操作基于分析器的输出结果，在查询与索引内容之间执行精确的词元匹配。有关实现细节，请参阅《<a href="/docs/zh/keyword-match.md">文本匹配</a>》。</p></li>
<li><p><strong>短语匹配</strong></p>
<p>短语匹配要求对多词表达式进行一致的分词处理，以保持短语边界和语义。有关实现细节，请参阅《<a href="/docs/zh/phrase-match.md">短语匹配</a>》。</p></li>
</ul>
