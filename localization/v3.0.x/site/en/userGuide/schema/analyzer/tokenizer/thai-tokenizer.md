---
id: thai-tokenizer.md
title: Thai
summary: >-
  The thai tokenizer segments Thai text into word tokens and filters out
  whitespace and punctuation-only segments.
beta: Milvus 3.0.0+
---
<h1 id="Thai" class="common-anchor-header">Thai<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Thai" class="anchor-icon" translate="no">
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
    </button></h1><p>The <code translate="no">thai</code> tokenizer segments Thai text into word tokens without relying on spaces. Use this tokenizer when you need to build a custom analyzer pipeline for Thai or mixed Thai/English text.</p>
<h2 id="Configuration" class="common-anchor-header">Configuration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
<p>For Thai text, use the built-in <a href="/docs/thai-analyzer.md"><code translate="no">thai</code></a> analyzer in most cases. The built-in analyzer includes this tokenizer together with lowercasing, decimal digit normalization, and Thai stop-word removal. Use the <code translate="no">thai</code> tokenizer directly only when you need to build a custom analyzer pipeline.</p>
</div>
<p>To configure an analyzer using the <code translate="no">thai</code> tokenizer, set <code translate="no">tokenizer</code> to <code translate="no">thai</code> in <code translate="no">analyzer_params</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>The <code translate="no">thai</code> tokenizer has no configurable parameters.</p>
<p>The tokenizer can work with one or more filters. For example, the following configuration uses the <code translate="no">thai</code> tokenizer with the <a href="/docs/lowercase-filter.md"><code translate="no">lowercase</code></a> and <a href="/docs/decimaldigit-filter.md"><code translate="no">decimaldigit</code></a> filters:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        <span class="hljs-string">&quot;decimaldigit&quot;</span>,
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>This custom pipeline is not equivalent to the built-in <code translate="no">thai</code> analyzer because it does not include the built-in <code translate="no">_thai_</code> stop-word dictionary. For the complete predefined pipeline, use <code translate="no">{&quot;type&quot;: &quot;thai&quot;}</code>.</p>
<p>The tokenizer applies the following behavior:</p>
<ul>
<li><strong>Thai segmentation</strong>: Segments Thai text into word tokens without relying on whitespace.</li>
<li><strong>Whitespace and punctuation filtering</strong>: Filters out whitespace and punctuation-only segments. This differs from the <a href="/docs/icu-tokenizer.md"><code translate="no">icu</code></a> tokenizer, which can preserve punctuation and spaces as tokens.</li>
<li><strong>Mixed-script text</strong>: Emits Latin word tokens in mixed Thai/English text.</li>
<li><strong>Tokenizer only</strong>: Does not lowercase tokens, normalize Unicode digits, or remove stop words. Add filters or use the built-in <a href="/docs/thai-analyzer.md"><code translate="no">thai</code></a> analyzer for those steps.</li>
<li><strong>Position semantics</strong>: Uses character-based token positions that include skipped whitespace and punctuation, which keeps phrase and proximity matching behavior consistent with other non-Latin tokenizers.</li>
</ul>
<p>After defining <code translate="no">analyzer_params</code>, you can apply the analyzer to a <code translate="no">VARCHAR</code> field when defining a collection schema. For details, refer to <a href="/docs/analyzer-overview.md#Example-use">Example use</a>.</p>
<h2 id="Examples" class="common-anchor-header">Examples<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Before applying the analyzer configuration to your collection schema, verify its behavior using the <code translate="no">run_analyzer</code> method.</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">Analyzer configuration<button data-href="#Analyzer-configuration" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">Verification using <code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sample_text = <span class="hljs-string">&quot;สวัสดี! ทดสอบ, ระบบ Milvus ๑๒๓&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Expected output<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;สวัสดี&#x27;</span>, <span class="hljs-string">&#x27;ทดสอบ&#x27;</span>, <span class="hljs-string">&#x27;ระบบ&#x27;</span>, <span class="hljs-string">&#x27;Milvus&#x27;</span>, <span class="hljs-string">&#x27;๑๒๓&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
