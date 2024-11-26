---
id: english-analyzer.md
title: English Analyzer
related_key: 'english, analyzer'
summary: >-
  The `english` analyzer in Milvus is designed to process English text, applying
  language-specific rules for tokenization and filtering.​
---
<h1 id="English​" class="common-anchor-header">English​<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>The <code translate="no">english</code> analyzer in Milvus is designed to process English text, applying language-specific rules for tokenization and filtering.​</p>
<h3 id="Definition​" class="common-anchor-header">Definition​</h3><p>The <code translate="no">english</code> analyzer uses the following components:​</p>
<ul>
<li><p><strong>Tokenizer</strong>: Uses the <a href="/docs/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a> to split text into discrete word units.​</p></li>
<li><p>Filters: Includes multiple filters for comprehensive text processing:​</p>
<ul>
<li><p><a href="/docs/lowercase-filter.md"><code translate="no">lowercase</code></a>: Converts all tokens to lowercase, enabling case-insensitive searches.​</p></li>
<li><p><a href="/docs/stemmer-filter.md"><code translate="no">stemmer</code></a>: Reduces words to their root form to support broader matching (e.g., “running” becomes “run”).​</p></li>
<li><p><a href="/docs/stop-filter.md"><code translate="no">stop_words</code></a>: Removes common English stop words to focus on key terms in text.​</p></li>
</ul></li>
</ul>
<p>The functionality of the <code translate="no">english</code> analyzer is equivalent to the following custom analyzer configuration:​</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,​
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
        }，{​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: <span class="hljs-string">&quot;_english_&quot;</span>,​
        }​
    ]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">Configuration​</h3><p>To apply the <code translate="no">english</code> analyzer to a field, simply set <code translate="no">type</code> to <code translate="no">english</code> in <code translate="no">analyzer_params</code>, and include optional parameters as needed.​</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p>The <code translate="no">english</code> analyzer accepts the following optional parameters: ​</p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">Parameter​</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">Description​</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code>​</p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">An array containing a list of stop words, which will be removed from tokenization. Defaults to <code translate="no">_english_</code>, a built-in set of common English stop words.​</p>
</td></tr></tbody></table>
<p>Example configuration with custom stop words:​</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p>After defining <code translate="no">analyzer_params</code>, you can apply them to a <code translate="no">VARCHAR</code> field when defining a collection schema. This allows Milvus to process the text in that field using the specified analyzer for efficient tokenization and filtering. For details, refer to <a href="/docs/analyzer-overview.md#Example-use">Example use</a>.​</p>
<h3 id="Example-output​" class="common-anchor-header">Example output​</h3><p>Here’s how the <code translate="no">english</code> analyzer processes text.​</p>
<p><strong>Original text</strong>:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Expected output</strong>:​</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
