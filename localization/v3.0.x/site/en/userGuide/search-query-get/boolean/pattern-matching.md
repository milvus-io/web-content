---
id: pattern-matching.md
title: Pattern Matching
summary: >-
  Milvus supports string pattern matching with LIKE wildcard patterns and RE2
  regular expressions. Use pattern filters to match prefixes, suffixes,
  substrings, structured codes, email domains, URL paths, and other string
  patterns in VARCHAR fields, JSON string paths, or ARRAY elements.
---
<h1 id="Pattern-Matching" class="common-anchor-header">Pattern Matching<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>In agentic search applications, vector search and grep-style pattern matching often complement each other. Vector search retrieves entities that are semantically relevant, while pattern matching narrows those results by exact string structures, such as error codes, log prefixes, email domains, URL paths, or identifiers.</p>
<p>In Milvus, you can express these pattern constraints in scalar filters with <code translate="no">LIKE</code> for simple wildcard matching, and <code translate="no">=~</code> or <code translate="no">!~</code> for <a href="https://github.com/google/re2/wiki/syntax">RE2</a> regular expressions. You can combine these filters with <code translate="no">query</code>, <code translate="no">search</code>, or hybrid search.</p>
<p>Pattern matching expressions are written in the <code translate="no">filter</code> parameter. For example, the following query matches log messages that contain an error code such as <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>The examples on this page focus on the expression assigned to <code translate="no">filter</code>. You can use the same filter expression syntax in Milvus operations that accept a scalar filter, such as <code translate="no">query</code>, <code translate="no">search</code>, and hybrid search.</p>
<h2 id="Supported-field-types" class="common-anchor-header">Supported field types<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Pattern matching is available for string values.</p>
<table>
<thead>
<tr><th>Target</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> field</td><td>Yes</td><td>Yes</td><td>Typical target for pattern matching on string fields.</td></tr>
<tr><td><code translate="no">JSON</code> path with <code translate="no">VARCHAR</code> cast type</td><td>Yes</td><td>Yes</td><td>The JSON path value must be a string for positive matches. If you create an index on the JSON path for acceleration, set <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> element</td><td>Yes</td><td>Yes</td><td>Match a specific element by index, such as <code translate="no">tags[0]</code>. Pattern matching does <strong>not</strong> scan all elements; it only applies to the element at the specified index.</td></tr>
<tr><td>Numeric, Boolean, vector, <code translate="no">TEXT</code>, or other non-<code translate="no">VARCHAR</code> targets</td><td>No</td><td>No</td><td>Pattern matching is available only for <code translate="no">VARCHAR</code> values, JSON paths that resolve to strings, or indexed <code translate="no">ARRAY&lt;VARCHAR&gt;</code> elements.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Choose LIKE or regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Choose the simplest operator that expresses the pattern you need.</p>
<p>If you need an exact string match, we recommend you use <code translate="no">==</code> instead of pattern matching. Use <code translate="no">LIKE</code> or regex only when the filter needs to match a pattern.</p>
<table>
<thead>
<tr><th>Requirement</th><th>Recommended operator</th><th>Example</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>Exact string equality</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Exact match of the string <code translate="no">active</code>.</td></tr>
<tr><td>Simple prefix match</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Matches strings that start with <code translate="no">Prod</code>.</td></tr>
<tr><td>Simple suffix match</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Matches strings that end with <code translate="no">.json</code>.</td></tr>
<tr><td>Simple contains match</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Matches values that contain <code translate="no">vector database</code> anywhere in the string.</td></tr>
<tr><td>Match a structured code or fixed-length pattern</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Matches strings that case-sensitively contain <code translate="no">E</code> followed by four digits, such as <code translate="no">E1001</code>.</td></tr>
<tr><td>Case-insensitive pattern matching</td><td><code translate="no">=~</code> with <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Matches <code translate="no">error</code>, <code translate="no">ERROR</code>, or other case variants.</td></tr>
<tr><td>Exclude values that match a regex pattern</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Excludes strings that start with <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>Use <code translate="no">LIKE</code> for simple wildcard matching. Use regex when the pattern needs character classes, repetition, alternation such as <code translate="no">error|failed</code>, anchors, or case-insensitive matching.</p>
<h2 id="Use-LIKE" class="common-anchor-header">Use LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>The <code translate="no">LIKE</code> operator is for simple wildcard matching on string values. It supports only the following wildcards:</p>
<table>
<thead>
<tr><th>Wildcard</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Matches zero or more characters.</td></tr>
<tr><td><code translate="no">_</code></td><td>Matches exactly one character.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Common LIKE patterns<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Use the position of <code translate="no">%</code> and <code translate="no">_</code> to control where the fixed text appears in the matched string.</p>
<table>
<thead>
<tr><th>Requirement</th><th>Pattern</th><th>Filter example</th></tr>
</thead>
<tbody>
<tr><td>Starts with a prefix</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Ends with a suffix</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Contains a substring</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Matches one character at a fixed position</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">LIKE matching behavior<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Use <code translate="no">LIKE</code> for prefix, suffix, contains, and fixed-position single-character matches. <code translate="no">LIKE</code> does not support character classes such as <code translate="no">[0-9]</code>, alternation such as <code translate="no">error|failed</code>, repeat counts such as <code translate="no">{4}</code>, anchors such as <code translate="no">^</code> or <code translate="no">$</code>, or case-insensitive flags such as <code translate="no">(?i)</code>. Use regex for those patterns.</p>
<p>Use <code translate="no">==</code> for exact full-string equality. Use <code translate="no">LIKE</code> only when the filter needs wildcard matching.</p>
<h2 id="Use-regex" class="common-anchor-header">Use regex<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Use regex filters when the pattern requires regular expression features such as character classes, repetition, alternation, anchors, or case-insensitive matching. Milvus applies an <a href="https://github.com/google/re2/wiki/syntax">RE2</a> regular expression to a string value.</p>
<p>The right side of <code translate="no">=~</code> or <code translate="no">!~</code> must be a string literal.</p>
<table>
<thead>
<tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Matches values that satisfy the regex pattern.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Excludes values that satisfy the regex pattern.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">Common regex patterns<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>The following examples use common RE2 syntax in Milvus filter expressions. For complete regex syntax, refer to the <a href="https://github.com/google/re2/wiki/syntax">RE2 syntax</a> reference.</p>
<table>
<thead>
<tr><th>Requirement</th><th>Pattern</th><th>Filter example</th></tr>
</thead>
<tbody>
<tr><td>Contains literal text</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Starts with a prefix</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Ends with a suffix</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Matches a digit sequence</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Matches a fixed number of digits</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Matches an email domain</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Matches case-insensitively</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Matches the full string</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>To match one of several words, use alternation with <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>When matching regex metacharacters literally, escape them in the regex pattern. For example, to match a literal dot (<code translate="no">\.</code> in regex), write <code translate="no">\\.</code> in a Python filter string:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Note: Milvus regex filters follow RE2 syntax. If a regex pattern uses syntax that RE2 does not support or is otherwise invalid, Milvus rejects the filter expression. For details about regex metacharacters, flags, and matching behavior, refer to the <a href="https://github.com/google/re2/wiki/syntax">RE2 syntax</a> reference.</p>
<h3 id="Matching-behavior" class="common-anchor-header">Matching behavior<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Substring matching</strong></p>
<p>Milvus regex matching uses substring semantics. The pattern does not need to match the entire field value. For example, the following filter matches both <code translate="no">E1001</code> and <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>To match the entire field value, use the <code translate="no">^</code> and <code translate="no">$</code> anchors:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Nullable VARCHAR fields</strong></p>
<p>Regex filters do not match null values. This applies to both <code translate="no">=~</code> and <code translate="no">!~</code>. If you want to exclude a regex pattern but keep null values, explicitly add <code translate="no">OR field IS NULL</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>JSON paths</strong></p>
<p>For JSON paths, regex filters behave differently when the path is missing, null, or resolves to a non-string value:</p>
<table>
<thead>
<tr><th>Filter</th><th>Includes missing/null/non-string values?</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>No</td><td>Matches only string values that satisfy the regex pattern.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Yes</td><td>Returns entities where the path is missing, null, non-string, or a string that does not match the regex pattern.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Accelerate pattern matching with indexes<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supports several index types on string fields that can be used together with <code translate="no">LIKE</code> and regex filters on <code translate="no">VARCHAR</code> fields or JSON string paths, such as <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code>, and <code translate="no">BITMAP</code>. Pattern matching can work without an index, but an index can improve performance on large datasets.</p>
<p>Index effectiveness depends on the pattern expression, whether Milvus can extract fixed literal substrings, and the cardinality and distribution of the target field. Prefix-style patterns such as <code translate="no">name LIKE &quot;Prod%&quot;</code> may benefit from different index strategies than infix or suffix patterns such as <code translate="no">description LIKE &quot;%vector%&quot;</code> or <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Use the following table as a starting point, then benchmark with your own workload:</p>
<table>
<thead>
<tr><th>Pattern or data characteristic</th><th>Index to consider</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td>Contains fixed literal substrings, such as <code translate="no">message =~ &quot;error.*timeout&quot;</code> or <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Helps when Milvus can extract meaningful literal substrings from the pattern. For details, refer to <a href="/docs/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Prefix, exact, or equality-like string filters, especially on fields with low to moderate cardinality</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code>, or <code translate="no">BITMAP</code></td><td>May be more effective when the field has repeated values or when the filter is close to exact matching. For details, refer to <a href="/docs/stl-sort.md">STL_SORT</a>, <a href="/docs/inverted.md">INVERTED</a>, and <a href="/docs/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Regex patterns without fixed literals, or patterns dominated by character classes, short tokens, or wildcards</td><td>Benchmark before relying on index acceleration</td><td>These patterns may provide limited index selectivity and can fall back to broader scans.</td></tr>
</tbody>
</table>
