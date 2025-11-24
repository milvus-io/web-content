---
id: choose-the-right-analyzer-for-your-use-case.md
title: Choose the Right Analyzer for Your Use Case
summary: Notes
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">Choose the Right Analyzer for Your Use Case<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<p>This guide focuses on practical decision-making for analyzer selection. For technical details about analyzer components and how to add analyzer parameters, refer to <a href="/docs/analyzer-overview.md">Analyzer Overview</a>.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">Understand analyzers in 2 minutes<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus, an analyzer processes the text stored in this field to make it searchable for features like <a href="/docs/full-text-search.md">full text search</a> (BM25), <a href="/docs/phrase-match.md">phrase match</a>, or <a href="/docs/keyword-match.md">text match</a>. Think of it as a text processor that transforms your raw content into searchable tokens.</p>
<p>An analyzer works in a simple, two-stage pipeline:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" />
    <span>Analyzer Workflow</span>
  </span>
</p>
<ol>
<li><p><strong>Tokenization (required):</strong> This initial stage applies a <strong>tokenizer</strong> to break a continuous string of text into discrete, meaningful units called tokens. The tokenization method can vary significantly depending on the language and content type.</p></li>
<li><p><strong>Token filtering (optional):</strong> After tokenization, <strong>filters</strong> are applied to modify, remove, or refine the tokens. These operations can include converting all tokens to lowercase, removing common meaningless words (such as stopwords), or reducing words to their root form (stemming).</p></li>
</ol>
<p><strong>Example</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">Why the choice of analyzer matters<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>Choosing the wrong analyzer can make relevant documents unsearchable or return irrelevant results.</p>
<p>The following table summarizes common problems caused by improper analyzer selection and provides actionable solutions for diagnosing search issues.</p>
<table>
   <tr>
     <th><p>Problem</p></th>
     <th><p>Symptom</p></th>
     <th><p>Example (Input &amp; Output)</p></th>
     <th><p>Cause (Bad Analyzer)</p></th>
     <th><p>Solution (Good Analyzer)</p></th>
   </tr>
   <tr>
     <td><p>Over-tokenization</p></td>
     <td><p>Text queries for technical terms, identifiers, or URLs fail to find relevant documents.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/standard-analyzer.md"><code translate="no">standard</code></a> analyzer</p></td>
     <td><p>Use a <a href="/docs/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizer; combine with an <a href="/docs/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filter.</p></td>
   </tr>
   <tr>
     <td><p>Under-tokenization</p></td>
     <td><p>Search for a component of a multi-word phrase fails to return documents containing the full phrase.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>Analyzer with a <a href="/docs/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizer</p></td>
     <td><p>Use a <a href="/docs/standard-tokenizer.md"><code translate="no">standard</code></a> tokenizer to split on punctuation and spaces; use a custom <a href="/docs/regex-filter.md">regex</a> filter.</p></td>
   </tr>
   <tr>
     <td><p>Language Mismatches</p></td>
     <td><p>Search results for a specific language are nonsensical or nonexistent.</p></td>
     <td><p>Chinese text: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (one token)</p></td>
     <td><p><a href="/docs/english-analyzer.md"><code translate="no">english</code></a> analyzer</p></td>
     <td><p>Use a language-specific analyzer, such as <a href="/docs/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">First question: Do you need to choose an analyzer?<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>For many use cases, you don’t need to do anything special. Let’s determine if you’re one of them.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">Default behavior: <code translate="no">standard</code> analyzer<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>If you don’t specify an analyzer when using text retrieval features like full text search, Milvus automatically uses the <a href="/docs/standard-analyzer.md"><code translate="no">standard</code></a> analyzer.</p>
<p>The <code translate="no">standard</code> analyzer:</p>
<ul>
<li><p>Splits text on spaces and punctuation</p></li>
<li><p>Converts all tokens to lowercase</p></li>
<li><p>Removes a built-in set of common English stop words and most punctuation</p></li>
</ul>
<p><strong>Example transformation</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">Decision criteria: A quick check<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>Use this table to quickly determine if the default <code translate="no">standard</code> analyzer meets your needs. If it doesn’t, you’ll need to choose a different path.</p>
<table>
   <tr>
     <th><p>Your Content</p></th>
     <th><p>Standard Analyzer OK?</p></th>
     <th><p>Why</p></th>
     <th><p>What You Need</p></th>
   </tr>
   <tr>
     <td><p>English blog posts</p></td>
     <td><p>✅ Yes</p></td>
     <td><p>Default behavior is sufficient.</p></td>
     <td><p>Use the default (no configuration needed).</p></td>
   </tr>
   <tr>
     <td><p>Chinese documents</p></td>
     <td><p>❌ No</p></td>
     <td><p>Chinese words have no spaces and will be treated as one token.</p></td>
     <td><p>Use a built-in <a href="/docs/chinese-analyzer.md"><code translate="no">chinese</code></a> analyzer.</p></td>
   </tr>
   <tr>
     <td><p>Technical documentation</p></td>
     <td><p>❌ No</p></td>
     <td><p>Punctuation is stripped from terms like <code translate="no">C++</code>.</p></td>
     <td><p>Create a custom analyzer with a <a href="/docs/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizer and an <a href="/docs/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filter.</p></td>
   </tr>
   <tr>
     <td><p>Space-separated languages such as French/Spanish text</p></td>
     <td><p>⚠️ Maybe</p></td>
     <td><p>Accented characters (<code translate="no">café</code> vs. <code translate="no">cafe</code>) may not match.</p></td>
     <td><p>A custom analyzer with the <a href="/docs/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> is recommended for better results.</p></td>
   </tr>
   <tr>
     <td><p>Multilingual or unknown languages</p></td>
     <td><p>❌ No</p></td>
     <td><p>The <code translate="no">standard</code> analyzer lacks the language-specific logic needed to handle different character sets and tokenization rules.</p></td>
     <td><p>Use a custom analyzer with the <a href="/docs/icu-tokenizer.md"><code translate="no">icu</code></a> tokenizer for unicode-aware tokenization. </p><p>Alternatively, consider configuring <a href="/docs/multi-language-analyzers.md">multi-language analyzers</a> or a <a href="/docs/language-identifier.md">language identifier</a> for more precise handling of multilingual content.</p></td>
   </tr>
</table>
<p>If the default <code translate="no">standard</code> analyzer cannot meet your requirements, you need to implement a different one. You have two paths:</p>
<ul>
<li><p><a href="/docs/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">Using a built-in analyzer</a> or</p></li>
<li><p><a href="/docs/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">Creating a custom one</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">Path A: Use built-in analyzers<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>Built-in analyzers are pre-configured solutions for common languages. They are the easiest way to get started when the default standard analyzer isn’t a perfect fit.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">Available built-in analyzers<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
     <th><p>Analyzer</p></th>
     <th><p>Language Support</p></th>
     <th><p>Components</p></th>
     <th><p>Notes</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Most space-separated languages (English, French, German, Spanish, etc.)</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">standard</code></p></li><li><p>Filters: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>General-purpose analyzer for initial text processing. For monolingual scenarios, language-specific analyzers (like <code translate="no">english</code>) provide better performance.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>Dedicated to English, which applies stemming and stop word removal for better English semantic matching</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">standard</code></p></li><li><p>Filters: <code translate="no">lowercase</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Recommended for English-only content over <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>Chinese</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">jieba</code></p></li><li><p>Filters: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>Currently uses Simplified Chinese dictionary by default.</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">Implementation example<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>To use a built-in analyzer, simply specify its type in the <code translate="no">analyzer_params</code> when defining your field schema.</p>
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
<p>For detailed usage, refer to <a href="/docs/full-text-search.md">Full Text Search</a>, <a href="/docs/keyword-match.md">Text Match</a>, or <a href="/docs/phrase-match.md">Phrase Match</a>.</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">Path B: Create a custom analyzer<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>When <a href="/docs/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">built-in options</a> don’t meet your needs, you can create a custom analyzer by combining a tokenizer with a set of filters. This gives you full control over the text processing pipeline.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">Step 1: Select the tokenizer based on language<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>Choose your tokenizer based on your content’s primary language:</p>
<h4 id="Western-languages" class="common-anchor-header">Western languages</h4><p>For space-separated languages, you have these options:</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>How It Works</p></th>
     <th><p>Best For</p></th>
     <th><p>Examples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Splits text based on spaces and punctuation marks</p></td>
     <td><p>General text, mixed punctuation</p></td>
     <td><ul><li><p>Input: <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>Output: <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>Splits only on whitespace characters</p></td>
     <td><p>Pre-processed content, user-formatted text</p></td>
     <td><ul><li><p>Input: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>Output: <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">East Asian languages</h4><p>Dictionary-based languages require specialized tokenizers for proper word segmentation:</p>
<h5 id="Chinese" class="common-anchor-header">Chinese</h5><table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>How It Works</p></th>
     <th><p>Best For</p></th>
     <th><p>Examples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>Chinese dictionary-based segmentation with intelligent algorithm</p></td>
     <td><p><strong>Recommended for Chinese content</strong> - combines dictionary with intelligent algorithms, specifically designed for Chinese</p></td>
     <td><ul><li><p>Input: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>Output: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>Pure dictionary-based morphological analysis with Chinese dictionary (<a href="https://cc-cedict.org/wiki/">cc-cedict</a>)</p></td>
     <td><p>Compared to <code translate="no">jieba</code>, processes Chinese text in a more generic manner</p></td>
     <td><ul><li><p>Input: <code translate="no">"机器学习算法"</code></p></li><li><p>Output: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">Japanese and Korean</h5><table>
   <tr>
     <th><p>Language</p></th>
     <th><p>Tokenizer</p></th>
     <th><p>Dictionary Options</p></th>
     <th><p>Best For</p></th>
     <th><p>Examples</p></th>
   </tr>
   <tr>
     <td><p>Japanese</p></td>
     <td><p><a href="/docs/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (general-purpose), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (modern terms), <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (academic)</p></td>
     <td><p>Morphological analysis with proper noun handling</p></td>
     <td><ul><li><p>Input: <code translate="no">"東京都渋谷区"</code></p></li><li><p>Output: <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>Korean</p></td>
     <td><p><a href="/docs/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>Korean morphological analysis</p></td>
     <td><ul><li><p>Input: <code translate="no">"안녕하세요"</code></p></li><li><p>Output: <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">Multilingual or unknown languages</h4><p>For content where languages are unpredictable or mixed within documents:</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>How It Works</p></th>
     <th><p>Best For</p></th>
     <th><p>Examples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Unicode-aware tokenization (International Components for Unicode)</p></td>
     <td><p>Mixed scripts, unknown languages, or when simple tokenization is sufficient</p></td>
     <td><ul><li><p>Input: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>Output: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>When to use icu</strong>:</p>
<ul>
<li><p>Mixed languages where language identification is impractical.</p></li>
<li><p>You don’t want the overhead of <a href="/docs/multi-language-analyzers.md">multi-language analyzers</a> or the <a href="/docs/language-identifier.md">language identifier</a>.</p></li>
<li><p>Content has a primary language with occasional foreign words that contribute little to the overall meaning (e.g., English text with sporadic brand names or technical terms in Japanese or French).</p></li>
</ul>
<p><strong>Alternative approaches</strong>: For more precise handling of multilingual content, consider using multi-language analyzers or the language identifier. For details, refer to <a href="/docs/multi-language-analyzers.md">Multi-language Analyzers</a> or <a href="/docs/language-identifier.md">Language Identifier</a>.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">Step 2: Add filters for precision<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>After <a href="/docs/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">selecting your tokenizer</a>, apply filters based on your specific search requirements and content characteristics.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">Commonly used filters</h4><p>These filters are essential for most space-separated language configurations (English, French, German, Spanish, etc.) and significantly improve search quality:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>How It Works</p></th>
     <th><p>When to Use</p></th>
     <th><p>Examples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>Convert all tokens to lowercase</p></td>
     <td><p>Universal - applies to all languages with case distinctions</p></td>
     <td><ul><li><p>Input: <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>Output: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>Reduce words to their root form</p></td>
     <td><p>Languages with word inflections (English, French, German, etc.)</p></td>
     <td><p>For English:</p><ul><li><p>Input: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>Output: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>Remove common meaningless words</p></td>
     <td><p>Most languages - particularly effective for space-separated languages</p></td>
     <td><ul><li><p>Input: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>Output: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>For East Asian languages (Chinese, Japanese, Korean, etc.), focus on <a href="/docs/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">language-specific filters</a> instead. These languages typically use different approaches for text processing and may not benefit significantly from stemming.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">Text normalization filters</h4><p>These filters standardize text variations to improve matching consistency:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>How It Works</p></th>
     <th><p>When to Use</p></th>
     <th><p>Examples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>Convert accented characters to ASCII equivalents</p></td>
     <td><p>International content, user-generated content</p></td>
     <td><ul><li><p>Input: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>Output: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">Token filtering</h4><p>Control which tokens are preserved based on character content or length:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>How It Works</p></th>
     <th><p>When to Use</p></th>
     <th><p>Examples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>Remove standalone punctuation tokens</p></td>
     <td><p>Clean output from <code translate="no">jieba</code>, <code translate="no">lindera</code>, <code translate="no">icu</code> tokenizers, which will return punctuations as single tokens</p></td>
     <td><ul><li><p>Input: <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>Output: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>Keep only letters and numbers</p></td>
     <td><p>Technical content, clean text processing</p></td>
     <td><ul><li><p>Input: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>Output: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>Remove tokens outside specified length range</p></td>
     <td><p>Filter noise (exccessively long tokens)</p></td>
     <td><ul><li><p>Input: <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>Output: <code translate="no">[['a'], ['very'], []]</code> (if <strong>max=10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>Custom pattern-based filtering</p></td>
     <td><p>Domain-specific token requirements</p></td>
     <td><ul><li><p>Input: <code translate="no">["test123", "prod456"]</code></p></li><li><p>Output: <code translate="no">[[], ['prod456']]</code> (if <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">Language-specific filters</h4><p>These filters handle specific language characteristics:</p>
<table>
   <tr>
     <th><p>Filter</p></th>
     <th><p>Language</p></th>
     <th><p>How It Works</p></th>
     <th><p>Examples</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>German</p></td>
     <td><p>Splits compound words into searchable components</p></td>
     <td><ul><li><p>Input: <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>Output: <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>Chinese</p></td>
     <td><p>Keeps Chinese characters + alphanumeric</p></td>
     <td><ul><li><p>Input: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>Output: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>Chinese</p></td>
     <td><p>Keeps only Chinese characters</p></td>
     <td><ul><li><p>Input: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>Output: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">Step 3: Combine and implement<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>To create your custom analyzer, you define the tokenizer and a list of filters in the <code translate="no">analyzer_params</code> dictionary. The filters are applied in the order they are listed.</p>
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
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">Final: Test with <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Always validate your configuration before applying to a collection:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>Common issues to check:</p>
<ul>
<li><p><strong>Over-tokenization</strong>: Technical terms being split incorrectly</p></li>
<li><p><strong>Under-tokenization</strong>: Phrases not being separated properly</p></li>
<li><p><strong>Missing tokens</strong>: Important terms being filtered out</p></li>
</ul>
<p>For detailed usage, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>.</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">Recommended configurations by use case<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>This section provides recommended tokenizer and filter configurations for common use cases when working with analyzers in Milvus. Choose the combination that best matches your content type and search requirements.</p>
<div class="alert note">
<p>Before applying an analyzer to your collection, we recommend you use <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> to test and validate text analysis performance.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">Languages with accent marks (French, Spanish, German, etc.)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>Use a <code translate="no">standard</code> tokenizer with lowercase conversion, language-specific stemming, and stopword removal. This configuration also works for other European languages by modifying the <code translate="no">language</code> and <code translate="no">stop_words</code> parameters.</p>
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
<h3 id="English-content" class="common-anchor-header">English content<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>For English text processing with comprehensive filtering. You can also use the built-in <a href="/docs/english-analyzer.md"><code translate="no">english</code></a> analyzer:</p>
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
<h3 id="Chinese-content" class="common-anchor-header">Chinese content<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Use the <code translate="no">jieba</code> tokenizer and apply a character filter to retain only Chinese characters, Latin letters, and digits.</p>
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
<p>For Simplified Chinese, <code translate="no">cnalphanumonly</code> removes all tokens except Chinese characters, alphanumeric text, and digits. This prevents punctuation from affecting search quality.</p>
</div>
<h3 id="Japanese-content" class="common-anchor-header">Japanese content<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Use the <code translate="no">lindera</code> tokenizer with Japanese dictionary and filters to clean punctuation and control token length:</p>
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
<h3 id="Korean-content" class="common-anchor-header">Korean content<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Similar to Japanese, using <code translate="no">lindera</code> tokenizer with Korean dictionary:</p>
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
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">Mixed or multilingual content<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>When working with content that spans multiple languages or uses scripts unpredictably, start with the <code translate="no">icu</code> analyzer. This Unicode-aware analyzer handles mixed scripts and symbols effectively.</p>
<p><strong>Basic multilingual configuration (no stemming)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Advanced multilingual processing</strong>:</p>
<p>For better control over token behavior across different languages:</p>
<ul>
<li><p>Use a <strong>multi-language analyzer</strong> configuration. For details, refer to <a href="/docs/multi-language-analyzers.md">Multi-language Analyzers</a>.</p></li>
<li><p>Implement a <strong>language identifier</strong> on your content. For details, refer to <a href="/docs/language-identifier.md">Language Identifier</a>.</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">Integrate with text retrieval features<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>After selecting your analyzer, you can integrate it with text retrieval features provided by Milvus.</p>
<ul>
<li><p><strong>Full text search</strong></p>
<p>Analyzers directly impact BM25-based full text search through sparse vector generation. Use the same analyzer for both indexing and querying to ensure consistent tokenization. Language-specific analyzers generally provide better BM25 scoring than generic ones. For implementation details, refer to <a href="/docs/full-text-search.md">Full Text Search</a>.</p></li>
<li><p><strong>Text match</strong></p>
<p>Text match operations perform exact token matching between queries and indexed content based on your analyzer output. For implementation details, refer to <a href="/docs/keyword-match.md">Text Match</a>.</p></li>
<li><p><strong>Phrase match</strong></p>
<p>Phrase match requires consistent tokenization across multi-word expressions to maintain phrase boundaries and meaning. For implementation details, refer to <a href="/docs/phrase-match.md">Phrase Match</a>.</p></li>
</ul>
