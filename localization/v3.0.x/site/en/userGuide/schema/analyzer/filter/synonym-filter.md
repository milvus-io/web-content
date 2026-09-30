---
id: synonym-filter.md
title: Synonym
summary: >-
  Use the synonym filter to rewrite tokens with a synonym dictionary during text
  analysis.
---
<h1 id="Synonym" class="common-anchor-header">Synonym<button data-href="#Synonym" class="anchor-icon" translate="no">
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
    </button></h1><p>The <code translate="no">synonym</code> filter rewrites tokens according to a synonym dictionary, so that related terms match during search. It supports two modes of operation and two ways of supplying the dictionary:</p>
<ul>
<li><p><strong>Operation modes</strong> — <code translate="no">expand</code> mode preserves the original token and emits additional synonyms alongside it; normalization mode (<code translate="no">expand: false</code>) rewrites tokens to a canonical form.</p></li>
<li><p><strong>Dictionary sources</strong> — small dictionaries can be inlined into the filter configuration via the <code translate="no">synonyms</code> array; large dictionaries should be stored as a <a href="/docs/manage-file-resources.md">file resource</a> and referenced via <code translate="no">synonyms_file</code>.</p></li>
</ul>
<h2 id="Dictionary-format" class="common-anchor-header">Dictionary format<button data-href="#Dictionary-format" class="anchor-icon" translate="no">
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
    </button></h2><p>A synonym dictionary is a plain-text document (or inline array) in which each line defines one rule. Two rule forms are supported.</p>
<h3 id="Mapping-rule" class="common-anchor-header">Mapping rule<button data-href="#Mapping-rule" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-plaintext">fast, quick =&gt; speedy
<button class="copy-code-btn"></button></code></pre>
<p>The tokens on the left (<code translate="no">fast</code>, <code translate="no">quick</code>) rewrite to the tokens on the right (<code translate="no">speedy</code>). Multiple targets are allowed:</p>
<pre><code translate="no" class="language-plaintext">small, little =&gt; tiny, compact
<button class="copy-code-btn"></button></code></pre>
<p>With <code translate="no">expand: true</code>, the original tokens are kept alongside the targets:</p>
<ul>
<li><p>Input <code translate="no">fast</code> with <code translate="no">expand: true</code> → <code translate="no">fast</code>, <code translate="no">speedy</code></p></li>
<li><p>Input <code translate="no">fast</code> with <code translate="no">expand: false</code> → <code translate="no">speedy</code></p></li>
</ul>
<h3 id="Equivalence-group" class="common-anchor-header">Equivalence group<button data-href="#Equivalence-group" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-plaintext">happy, joyful, cheerful
<button class="copy-code-btn"></button></code></pre>
<p>All listed tokens are considered equivalent:</p>
<ul>
<li><p>With <code translate="no">expand: true</code>, any occurrence of any token in the group emits every token in the group. Input <code translate="no">happy</code> → <code translate="no">happy</code>, <code translate="no">joyful</code>, <code translate="no">cheerful</code>.</p></li>
<li><p>With <code translate="no">expand: false</code>, every occurrence is rewritten to the first token in the group. Input <code translate="no">joyful</code> → <code translate="no">happy</code>; input <code translate="no">happy</code> is already the first token and is unchanged.</p></li>
</ul>
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
    </button></h2><p>The <code translate="no">synonym</code> filter is a custom filter. Specify <code translate="no">&quot;type&quot;: &quot;synonym&quot;</code> along with at least one of <code translate="no">synonyms</code> (inline) or <code translate="no">synonyms_file</code> (external), plus an <code translate="no">expand</code> flag.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
            <span class="hljs-string">&quot;synonyms&quot;</span>: [                       <span class="hljs-comment"># inline rules (optional)</span>
                <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
                <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
            ],
            <span class="hljs-string">&quot;synonyms_file&quot;</span>: {                  <span class="hljs-comment"># external rules (optional)</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
                <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;en_synonyms&quot;</span>,
                <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;synonyms.txt&quot;</span>,
            },
            <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
        }
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>The <code translate="no">synonym</code> filter accepts the following parameters.</p>
<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Default</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">synonyms</code></p></td>
     <td><p>An inline array of rule strings. Each string uses the dictionary format described above. Suitable for small dictionaries (up to a few dozen rules).</p></td>
     <td><p>—</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">synonyms_file</code></p></td>
     <td><p>A reference to a <a href="/docs/manage-file-resources.md">file resource</a> that stores synonym rules, one per line. Use for larger dictionaries. See <a href="/docs/synonym-filter.md#External-dictionary-file">External dictionary file</a> below.</p></td>
     <td><p>—</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">expand</code></p></td>
     <td><p>A boolean flag that controls how rules apply. true preserves the original token and emits synonyms alongside it; false rewrites tokens to their canonical form (the right-hand side of a mapping, or the first token of an equivalence group).</p></td>
     <td><p>false</p></td>
   </tr>
</table>
<p>You can specify <code translate="no">synonyms</code>, <code translate="no">synonyms_file</code>, or both. When both are present, the filter merges the two sources. The filter operates on tokens produced by the tokenizer; it must therefore be combined with a tokenizer such as the <a href="/docs/standard-tokenizer.md">standard</a> tokenizer.</p>
<h3 id="External-dictionary-file" class="common-anchor-header">External dictionary file<button data-href="#External-dictionary-file" class="anchor-icon" translate="no">
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
    </button></h3><p>For production-sized dictionaries, register the file as a remote file resource and reference it from <code translate="no">synonyms_file</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Register the file once, then reference it from any analyzer that needs it.</span>
client.add_file_resource(
    name=<span class="hljs-string">&quot;en_synonyms&quot;</span>,
    path=<span class="hljs-string">&quot;file/synonyms.txt&quot;</span>,     <span class="hljs-comment"># full S3 object key, including rootPath</span>
)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms_file&quot;</span>: {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
            <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;en_synonyms&quot;</span>,
            <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;synonyms.txt&quot;</span>,
        },
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
    }],
}
<button class="copy-code-btn"></button></code></pre>
<p>See Manage File Resources for the full workflow (upload, register, list, remove) and for the alternative <code translate="no">&quot;type&quot;: &quot;local&quot;</code> form.</p>
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
    </button></h2><p>Before applying the analyzer to a collection schema, verify its behavior with <code translate="no">run_analyzer</code>. The following examples use the inline <code translate="no">synonyms</code> array for brevity; replace with <code translate="no">synonyms_file</code> for larger dictionaries.</p>
<h3 id="expand-true--keep-the-original-add-synonyms" class="common-anchor-header"><code translate="no">expand: true</code> — keep the original, add synonyms<button data-href="#expand-true--keep-the-original-add-synonyms" class="anchor-icon" translate="no">
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

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms&quot;</span>: [
            <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
            <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
        ],
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
    }],
}

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;a fast car&quot;</span>], analyzer_params))
<span class="hljs-comment"># → [[&#x27;a&#x27;, &#x27;fast&#x27;, &#x27;speedy&#x27;, &#x27;car&#x27;]]</span>

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;i am happy today&quot;</span>], analyzer_params))
<span class="hljs-comment"># → [[&#x27;i&#x27;, &#x27;am&#x27;, &#x27;happy&#x27;, &#x27;joyful&#x27;, &#x27;cheerful&#x27;, &#x27;today&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Both <code translate="no">fast</code> and <code translate="no">happy</code> are preserved; their synonyms are emitted alongside.</p>
<h3 id="expand-false--rewrite-to-canonical-form" class="common-anchor-header"><code translate="no">expand: false</code> — rewrite to canonical form<button data-href="#expand-false--rewrite-to-canonical-form" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params_norm = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms&quot;</span>: [
            <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
            <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
        ],
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">False</span>,
    }],
}

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;a fast car&quot;</span>], analyzer_params_norm))
<span class="hljs-comment"># → [[&#x27;a&#x27;, &#x27;speedy&#x27;, &#x27;car&#x27;]]</span>

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;i am happy today&quot;</span>], analyzer_params_norm))
<span class="hljs-comment"># → [[&#x27;i&#x27;, &#x27;am&#x27;, &#x27;happy&#x27;, &#x27;today&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<p>The mapping rule rewrites <code translate="no">fast</code> to <code translate="no">speedy</code>. The equivalence group leaves <code translate="no">happy</code> unchanged because it is the first token of the group; an input containing <code translate="no">joyful</code> or <code translate="no">cheerful</code> would have been rewritten to <code translate="no">happy</code>.</p>
