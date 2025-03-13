---
id: standard-tokenizer.md
title: Standard Tokenizer
summary: >-
  The standard tokenizer in Milvus splits text based on spaces and punctuation
  marks, making it suitable for most languages.
---
<h1 id="Standard-Tokenizer" class="common-anchor-header">Standard Tokenizer<button data-href="#Standard-Tokenizer" class="anchor-icon" translate="no">
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
    </button></h1><p>The <code translate="no">standard</code> tokenizer in Milvus splits text based on spaces and punctuation marks, making it suitable for most languages.</p>
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
    </button></h2><p>To configure an analyzer using the <code translate="no">standard</code> tokenizer, set <code translate="no">tokenizer</code> to <code translate="no">standard</code> in <code translate="no">analyzer_params</code>.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<p>The <code translate="no">standard</code> tokenizer can work in conjunction with one or more filters. For example, the following code defines an analyzer that uses the <code translate="no">standard</code> tokenizer and <code translate="no">lowercase</code> filter:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
</div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;lowercase&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>For simpler setup, you may choose to use the <code translate="no">standard</code> <a href="/docs/standard-analyzer.md">analyzer</a>, which combines the <code translate="no">standard</code> tokenizer with the <code translate="no">lowercase</code><a href="/docs/lowercase-filter.md"> filter</a>.</p>
</div>
<p>After defining <code translate="no">analyzer_params</code>, you can apply them to a <code translate="no">VARCHAR</code> field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to <a href="/docs/analyzer-overview.md#null">Example use</a>.</p>
<h2 id="Example-output" class="common-anchor-header">Example output<button data-href="#Example-output" class="anchor-icon" translate="no">
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
    </button></h2><p>Here’s an example of how the <code translate="no">standard</code> tokenizer processes text:</p>
<p><strong>Original text</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Expected output</strong>:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;The&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;is&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
