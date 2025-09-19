---
id: language-identifier.md
title: 语言识别器Compatible with Milvus v2.5.15+
summary: >-
  语言识别器（language_identifier）是一个专门的标记器，旨在通过自动语言分析过程来增强 Milvus
  的文本搜索功能。它的主要功能是检测文本字段的语言，然后动态应用最适合该语言的预配置分析器。这对于处理多种语言的应用程序来说尤为重要，因为它消除了按输入手动分配语言的需要。
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">语言识别器<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">language_identifier</code> 是一个专门的标记符号器，旨在通过自动语言分析过程来增强 Milvus 的文本搜索功能。它的主要功能是检测文本字段的语言，然后动态应用最适合该语言的预配置分析器。这对于处理多种语言的应用程序来说尤为重要，因为它消除了根据每次输入手动分配语言的需要。</p>
<p>通过智能地将文本数据路由到适当的处理管道，<code translate="no">language_identifier</code> 可简化多语言数据的摄取，并确保为后续搜索和检索操作提供准确的标记化。</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">语言检测工作流程<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">language_identifier</code> 执行一系列步骤来处理文本字符串，这个工作流程对于用户了解如何正确配置至关重要。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" />
   </span> <span class="img-wrapper"> <span>语言检测工作流程</span> </span></p>
<ol>
<li><p><strong>输入：</strong>工作流程以文本字符串作为输入开始。</p></li>
<li><p><strong>语言检测：</strong>首先将该字符串传递给语言检测引擎，尝试识别语言。Milvus 支持两种引擎：<strong>Whatlang</strong>和<strong>lingua</strong>。</p></li>
<li><p><strong>分析器选择：</strong></p>
<ul>
<li><p><strong>成功：</strong>如果语言检测成功，系统会检查检测到的语言名称是否在<code translate="no">analyzers</code> 字典中配置了相应的分析器。如果找到匹配，系统就会将指定的分析器应用于输入文本。例如，检测到的 "普通话 "文本将被路由到<code translate="no">jieba</code> 标记器。</p></li>
<li><p><strong>回退：</strong>如果检测失败，或者如果成功检测到一种语言，但您没有为其提供特定的分析器，系统会默认使用预先配置的<strong>默认分析器</strong>。这是需要说明的关键点；<code translate="no">default</code> 分析仪是检测失败和没有匹配分析仪时的后备选择。</p></li>
</ul></li>
</ol>
<p>选择合适的分析器后，文本将被标记化并处理，从而完成工作流程。</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">可用的语言检测引擎<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供两种语言检测引擎供选择：</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>选择取决于您应用程序的具体性能和准确性要求。</p>
<table>
   <tr>
     <th><p>引擎</p></th>
     <th><p>速度</p></th>
     <th><p>精确度</p></th>
     <th><p>输出格式</p></th>
     <th><p>最适合</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>快速</p></td>
     <td><p>适合大多数语言</p></td>
     <td><p>语言名称（如<code translate="no">"English"</code>,<code translate="no">"Mandarin"</code>,<code translate="no">"Japanese"</code>)</p><p><strong>参考：</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">支持语言表中的语言栏</a></p></td>
     <td><p>速度至关重要的实时应用</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>较慢</p></td>
     <td><p>精度更高，尤其是短文本</p></td>
     <td><p>英文名称（如<code translate="no">"English"</code>,<code translate="no">"Chinese"</code>,<code translate="no">"Japanese"</code>)</p><p><strong>参考：</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">支持的语言列表</a></p></td>
     <td><p>精度比速度更重要的应用</p></td>
   </tr>
</table>
<p>一个重要的考虑因素是引擎的命名约定。虽然两个引擎都以英文返回语言名称，但它们对某些语言使用不同的术语（例如，<code translate="no">whatlang</code> 返回<code translate="no">Mandarin</code> ，而<code translate="no">lingua</code> 返回<code translate="no">Chinese</code> ）。分析仪的关键字必须与所选检测引擎返回的名称完全匹配。</p>
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
    </button></h2><p>要正确使用<code translate="no">language_identifier</code> 标记符号生成器，必须采取以下步骤来定义和应用其配置。</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">第 1 步：选择语言和分析器<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p>设置<code translate="no">language_identifier</code> 的核心是根据计划支持的特定语言定制分析器。系统的工作原理是将检测到的语言与正确的分析器相匹配，因此这一步对于准确处理文本至关重要。</p>
<p>下面是推荐的语言与 Milvus 分析器的映射表。该表是连接语言检测引擎输出和最佳工具的桥梁。</p>
<table>
   <tr>
     <th><p>语言（检测器输出）</p></th>
     <th><p>推荐分析器</p></th>
     <th><p>语言</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>标准英语标记化，带词干和停止词过滤。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (通过 whatlang）或<code translate="no">Chinese</code> （通过 lingua）</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>针对非空间分隔文本的中文分词。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>适用于复杂脚本（包括日文）的强大标记化器。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>,<code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>可处理法语重音和字符的自定义配置。</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>匹配是关键：</strong>分析器的名称<strong>必须与</strong>检测引擎的语言输出<strong>完全匹配</strong>。例如，如果使用<code translate="no">whatlang</code> ，则中文文本的密钥必须是<code translate="no">Mandarin</code> 。</p></li>
<li><p><strong>最佳实践：</strong>上表提供了几种常见语言的推荐配置，但并非详尽无遗。有关选择分析仪的更全面指南，请参阅<a href="/docs/zh/choose-the-right-analyzer-for-your-use-case.md">为您的用例选择正确的分析仪</a>。</p></li>
<li><p><strong>检测器输出</strong>：有关检测引擎返回的语言名称的完整列表，请参阅<a href="https://github.com/greyblake/whatlang-rs">Whatlang 支持的语言表</a>和<a href="https://github.com/pemistahl/lingua-rs">Lingua 支持的语言列表</a>。</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">第 2 步：定义分析器参数<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>要在 Milvus 中使用<code translate="no">language_identifier</code> 标记器，请创建一个包含这些关键组件的字典：</p>
<p><strong>必备组件：</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config set - 包含所有分析器配置的字典，其中必须包括</p>
<ul>
<li><p><code translate="no">default</code> - 语言检测失败或找不到匹配分析器时使用的后备分析器</p></li>
<li><p><strong>特定语言分析器</strong>- 每个<strong>分析器</strong>定义为<code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code> ，其中：</p>
<ul>
<li><p><code translate="no">analyzer_name</code> 与您选择的检测引擎输出相匹配（如<code translate="no">&quot;English&quot;</code>,<code translate="no">&quot;Japanese&quot;</code> ）。</p></li>
<li><p><code translate="no">analyzer_config</code> 遵循标准分析器参数格式（请参阅<a href="/docs/zh/analyzer-overview.md#Analyzer-types">分析器概述）</a></p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>可选组件：</strong></p>
<ul>
<li><p><code translate="no">identifier</code> - 指定要使用的语言检测引擎（<code translate="no">whatlang</code> 或<code translate="no">lingua</code> ）。如果未指定，默认为<code translate="no">whatlang</code> </p></li>
<li><p><code translate="no">mapping</code> - 为您的分析器创建自定义别名，允许您使用描述性名称，而不是检测引擎的精确输出格式。</p></li>
</ul>
<p>标记器的工作原理是首先检测输入文本的语言，然后从配置中选择合适的分析器。如果检测失败或没有匹配的分析器，它会自动返回到<code translate="no">default</code> 分析器。</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">推荐使用：直接名称匹配</h4><p>分析器名称应与所选语言检测引擎的输出完全匹配。这种方法比较简单，可以避免潜在的混淆。</p>
<p>对于<code translate="no">whatlang</code> 和<code translate="no">lingua</code> ，请使用各自文档中显示的语言名称：</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">whatlang 支持的语言</a>（使用<strong>"语言</strong>"列）</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">lingua 支持的语言</a></p></li>
</ul>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment"># Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,  <span class="hljs-comment"># or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {  <span class="hljs-comment"># A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>  <span class="hljs-comment"># fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">替代方法：带有映射的自定义名称</h4><p>如果喜欢使用自定义分析器名称，或需要保持与现有配置的兼容性，可以使用<code translate="no">mapping</code> 参数。这将为您的分析器创建别名--原始检测引擎名称和自定义名称均可使用。</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment"># Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>定义<code translate="no">analyzer_params</code> 后，您可以在定义 Collections Schema 时将它们应用到<code translate="no">VARCHAR</code> 字段。这样，Milvus 就能使用指定的分析器处理该字段中的文本，从而实现高效的标记化和过滤。有关详情，请参阅<a href="/docs/zh/analyzer-overview.md#Example-use">示例使用</a>。</p>
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
    </button></h2><p>下面是一些常见情况下的即用配置。每个示例都包含配置和验证代码，因此您可以立即对设置进行测试。</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">英语和中文检测<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Configuration</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
}

<span class="hljs-comment"># Test the configuration</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># English text</span>
result_en = client.run_analyzer(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;English:&quot;</span>, result_en)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># English: [&#x27;The&#x27;, &#x27;Milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;for&#x27;, &#x27;scale&#x27;]</span>

<span class="hljs-comment"># Chinese text  </span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># Chinese: [&#x27;Milvus&#x27;, &#x27;向量&#x27;, &#x27;数据&#x27;, &#x27;据库&#x27;, &#x27;数据库&#x27;, &#x27;专&#x27;, &#x27;为&#x27;, &#x27;大规&#x27;, &#x27;规模&#x27;, &#x27;大规模&#x27;, &#x27;应用&#x27;, &#x27;而&#x27;, &#x27;设计&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">带重音规范化的欧洲语言<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>, 
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
}

<span class="hljs-comment"># Test with accented text</span>
result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">使用说明<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>每个字段使用一种语言：</strong>它将字段作为单一、同质的文本单元进行操作符。其设计目的是处理不同数据记录中的不同语言，例如一条记录包含英语句子，而另一条记录包含法语句子。</p></li>
<li><p><strong>无混合语言字符串：</strong>它<strong>不能</strong>处理包含多种语言文本的单一字符串。例如，包含英语句子和日语短语的<code translate="no">VARCHAR</code> 字段将作为单一语言处理。</p></li>
<li><p><strong>主导语言处理：</strong>在混合语言情况下，检测引擎可能会识别主要语言，并将相应的分析器应用于整个文本。这将导致嵌入的外文文本标记化效果不佳或没有标记化。</p></li>
</ul>
