---
id: text-highlighter.md
title: Text Highlighter
summary: >-
  The Highlighter in Milvus annotates matched terms in text fields by wrapping
  them with customizable tags. Highlighting helps explain why a document
  matches, improves result readability, and supports rich rendering in search
  and RAG applications.
beta: Milvus 2.6.8+
---
<h1 id="Text-Highlighter" class="common-anchor-header">Text Highlighter<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#Text-Highlighter" class="anchor-icon" translate="no">
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
    </button></h1><p>The Highlighter in Milvus annotates matched terms in text fields by wrapping them with customizable tags. Highlighting helps explain why a document matches, improves result readability, and supports rich rendering in search and RAG applications.</p>
<p>Highlighting is executed as a post-processing step on the final search result set. It does not affect candidate retrieval, filtering logic, ranking, or scoring.</p>
<p>The Highlighter provides three independent dimensions of control:</p>
<ul>
<li><p><strong>Which terms are highlighted</strong></p>
<p>You can choose where highlighted terms come from. For example, highlight search terms used in <strong>BM25 full text search</strong>, or query terms specified in <strong>text-based filtering expressions</strong> (such as <code translate="no">TEXT_MATCH</code> conditions).</p></li>
<li><p><strong>How highlighted terms are rendered</strong></p>
<p>You can control how matched terms appear in the highlighting output by configuring the tags inserted before and after each match. For example, use simple markers like <code translate="no">{}</code> or HTML tags such as <code translate="no">&lt;em&gt;&lt;/em&gt;</code> for rich rendering.</p></li>
<li><p><strong>How highlighted text is returned</strong></p>
<p>You can control how highlighted results are returned as fragments, including where fragments start, how long they are, and how many fragments are returned.</p></li>
</ul>
<p>The following sections walk through these scenarios.</p>
<h2 id="Search-term-highlighting-in-BM25-full-text-search" class="common-anchor-header">Search term highlighting in BM25 full text search<button data-href="#Search-term-highlighting-in-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>When you perform a BM25 full text search, you can highlight the <strong>search terms</strong> in the returned result to help explain why a document matches the query. To learn more about BM25 full text search, refer to <a href="/docs/v2.6.x/full-text-search.md">Full Text Search</a>.</p>
<p>In this scenario, highlighted terms come directly from the search terms used in BM25 full text search. The Highlighter uses these terms to annotate matched text in the final result.</p>
<p>Assume the following content is stored in a text field:</p>
<pre><code translate="no" class="language-plaintext">Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
<button class="copy-code-btn"></button></code></pre>
<p><strong>Highlighter configuration</strong></p>
<p>To highlight search terms in BM25 full text search, create a <code translate="no">LexicalHighlighter</code> and enable search term highlighting for BM25 full text search:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],              <span class="hljs-comment"># Tag inserted before each highlighted term</span>
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],             <span class="hljs-comment"># Tag inserted after each highlighted term</span>
    highlight_search_text=<span class="hljs-literal">True</span>   <span class="hljs-comment"># Enable search term highlighting for BM25 full text search</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In this example:</p>
<ul>
<li><p><code translate="no">pre_tags</code> and <code translate="no">post_tags</code> control how highlighted text appears in the output. In this case, matched terms are wrapped by <code translate="no">{}</code> (for example, <code translate="no">{term}</code>). You can also provide multiple tags as a list (for example, <code translate="no">[&quot;&lt;b&gt;&quot;, &quot;&lt;i&gt;&quot;]</code>). When multiple terms are highlighted, tags are applied in order and rotated by match sequence.</p></li>
<li><p><code translate="no">highlight_search_text=True</code> tells Milvus to use the search terms in BM25 full text search as the source of highlighted terms.</p></li>
</ul>
<p>Once the Highlighter object is created, apply its configuration to your BM25 full text search request:</p>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    data=[<span class="hljs-string">&quot;BM25&quot;</span>],      <span class="hljs-comment"># Search term used in BM25 full text search</span>
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Highlighting output</strong></p>
<p>When highlighting is enabled, Milvus returns highlighted text in a dedicated <code translate="no">highlight</code> field. By default, highlighted output is returned as a fragment starting from the first matched term.</p>
<p>In this example, the search term is <code translate="no">&quot;BM25&quot;</code>, so it is highlighted in the returned result:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;{BM25} for keyword relevance. Filters can narrow results.&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>To control the position, length, and number of returned fragments, see <a href="/docs/v2.6.x/text-highlighter.md#Fragment-based-highlighting-output">Return highlighted text as fragments</a>.</p>
<h2 id="Query-term-highlighting-in-filtering" class="common-anchor-header">Query term highlighting in filtering<button data-href="#Query-term-highlighting-in-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>In addition to highlighting search terms, you can highlight terms used in text-based filtering expressions.</p>
<div class="alert note">
<p>Currently, only the <code translate="no">TEXT_MATCH</code> filtering condition is supported for query term highlighting. To learn more, refer to <a href="/docs/v2.6.x/keyword-match.md">Text Match</a>.</p>
</div>
<p>In this scenario, highlighted terms come from text-based filtering expressions. Filtering determines which documents match, while the Highlighter annotates the matched text spans.</p>
<p>Assume the following content is stored in a text field:</p>
<pre><code translate="no" class="language-python">This document explains how text filtering works <span class="hljs-keyword">in</span> Milvus.
<button class="copy-code-btn"></button></code></pre>
<p><strong>Highlighter configuration</strong></p>
<p>To highlight query terms used in filtering, create a <code translate="no">LexicalHighlighter</code> and define a <code translate="no">highlight_query</code> that corresponds to the filtering condition:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],              <span class="hljs-comment"># Tag inserted before each highlighted term</span>
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],             <span class="hljs-comment"># Tag inserted after each highlighted term</span>
    highlight_query=[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;TextMatch&quot;</span>,     <span class="hljs-comment"># Text filtering type</span>
        <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>,         <span class="hljs-comment"># Target text field</span>
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;text filtering&quot;</span> <span class="hljs-comment"># Terms to highlight</span>
    }]
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">pre_tags</code> and <code translate="no">post_tags</code> control how highlighted text appears in the output. In this case, matched terms are wrapped by <code translate="no">{}</code> (for example, <code translate="no">{term}</code>). You can also provide multiple tags as a list (for example, <code translate="no">[&quot;&lt;b&gt;&quot;, &quot;&lt;i&gt;&quot;]</code>). When multiple terms are highlighted, tags are applied in order and rotated by match sequence.</p></li>
<li><p><code translate="no">highlight_query</code> defines which filtering terms should be highlighted.</p></li>
</ul>
<p>Once the Highlighter object is created, apply the same filtering expression and the highlighter configuration to your search request:</p>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(text, &quot;text filtering&quot;)&#x27;</span>,
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Highlighting output</strong></p>
<p>When query term highlighting is enabled for filtering, Milvus returns highlighted text in a dedicated <code translate="no">highlight</code> field. By default, highlighted output is returned as a fragment starting from the first matched term.</p>
<p>In this example, the first matched term is <code translate="no">&quot;text&quot;</code>, so the returned highlighted text starts from that position:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;{text} {filtering} works in Milvus.&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>To control the position, length, and number of returned fragments, see <a href="/docs/v2.6.x/text-highlighter.md#Fragment-based-highlighting-output">Return highlighted text as fragments</a>.</p>
<h2 id="Fragment-based-highlighting-output" class="common-anchor-header">Fragment-based highlighting output<button data-href="#Fragment-based-highlighting-output" class="anchor-icon" translate="no">
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
    </button></h2><p>By default, Milvus returns highlighted text as fragments starting from the first matched term. Fragment-related settings allow you to further control how fragments are returned, without changing which terms are highlighted.</p>
<p>Assume the following content is stored in a text field:</p>
<pre><code translate="no" class="language-plaintext">Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
<button class="copy-code-btn"></button></code></pre>
<p><strong>Highlighter configuration</strong></p>
<p>To control the shape of highlighted fragments, configure fragment-related options in the <code translate="no">LexicalHighlighter</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],
    highlight_search_text=<span class="hljs-literal">True</span>,
    fragment_offset=<span class="hljs-number">5</span>,     <span class="hljs-comment"># Number of characters to reserve before the first matched term</span>
    fragment_size=<span class="hljs-number">60</span>,      <span class="hljs-comment"># Max. length of each fragment to return</span>
    num_of_fragments=<span class="hljs-number">1</span>     <span class="hljs-comment"># Max. number of fragments to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">fragment_offset</code> reserves leading context before the first highlighted term.</p></li>
<li><p><code translate="no">fragment_size</code> limits how much text is included in each fragment.</p></li>
<li><p><code translate="no">num_of_fragments</code> controls how many fragments are returned.</p></li>
</ul>
<p>Once the Highlighter object is created, apply the highlighter configuration to your search request:</p>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    data=[<span class="hljs-string">&quot;BM25&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Highlighting output</strong></p>
<p>With fragment-based highlighting enabled, Milvus returns highlighted text as fragments in the <code translate="no">highlight</code> field:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;Use {BM25} for keyword relevance. Filters can narrow results.&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>In this output:</p>
<ul>
<li><p>The fragment does not start exactly at <code translate="no">{BM25}</code> because <code translate="no">fragment_offset</code> is set.</p></li>
<li><p>Only one fragment is returned because <code translate="no">num_of_fragments</code> is 1.</p></li>
<li><p>The length of the fragment is capped by <code translate="no">fragment_size</code>.</p></li>
</ul>
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">Preparation<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h3><p>Before using the highlighter, ensure your collection is properly configured.</p>
<p>The example below creates a collection that supports BM25 full text search and <code translate="no">TEXT_MATCH</code> queries, then inserts sample documents.</p>
<p><details></p>
<p><summary><strong>Prepare your collection</strong></summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
    DataType,
    Function,
    FunctionType,
    LexicalHighlighter,
)

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;highlighter_demo&quot;</span>

<span class="hljs-comment"># Clean up existing collection</span>
<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

<span class="hljs-comment"># Define schema</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">2000</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Required for BM25</span>
    enable_match=<span class="hljs-literal">True</span>,     <span class="hljs-comment"># Required for TEXT_MATCH</span>
)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="hljs-comment"># Add BM25 function</span>
schema.add_function(Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    function_type=FunctionType.BM25,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;sparse_vector&quot;</span>],
))

<span class="hljs-comment"># Create index</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>, <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>},
)

client.create_collection(collection_name=COLLECTION_NAME, schema=schema, index_params=index_params)

<span class="hljs-comment"># Insert sample documents</span>
docs = [
    <span class="hljs-string">&quot;my first test doc&quot;</span>,
    <span class="hljs-string">&quot;my second test doc&quot;</span>,
    <span class="hljs-string">&quot;my first test doc. Milvus is an open-source vector database built for GenAI applications.&quot;</span>,
    <span class="hljs-string">&quot;my second test doc. Milvus is an open-source vector database that suits AI applications &quot;</span>
    <span class="hljs-string">&quot;of every size from running a demo chatbot to building web-scale search.&quot;</span>,
]
client.insert(collection_name=COLLECTION_NAME, data=[{<span class="hljs-string">&quot;text&quot;</span>: t} <span class="hljs-keyword">for</span> t <span class="hljs-keyword">in</span> docs])
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;✓ Collection created with <span class="hljs-subst">{<span class="hljs-built_in">len</span>(docs)}</span> documents\n&quot;</span>)

<span class="hljs-comment"># Helper for search params</span>
SEARCH_PARAMS = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.0</span>}}

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># ✓ Collection created with 4 documents</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-1-Highlight-search-terms-in-BM25-full-text-search" class="common-anchor-header">Example 1: Highlight search terms in BM25 full text search<button data-href="#Example-1-Highlight-search-terms-in-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h3><p>This example shows how to highlight search terms in BM25 full text search.</p>
<ul>
<li><p>BM25 full text search uses <code translate="no">&quot;test&quot;</code> as the search term</p></li>
<li><p>The highlighter wraps all occurrences of “test” with <code translate="no">{</code> and <code translate="no">}</code> tags</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Highlight BM25 query terms</span></span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Expected output</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;{test} doc&#x27;]
[&#x27;{test} doc&#x27;]
[&#x27;{test} doc. Milvus is an open-source vector database built for GenAI applications.&#x27;]
[&#x27;{test} doc. Milvus is an open-source vector database that suits AI applications of every size from run&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-2-Highlight-query-terms-in-filtering" class="common-anchor-header">Example 2: Highlight query terms in filtering<button data-href="#Example-2-Highlight-query-terms-in-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>This example shows how to highlight terms matched by a <code translate="no">TEXT_MATCH</code> filter.</p>
<ul>
<li><p>BM25 full text search uses <code translate="no">&quot;test&quot;</code> as the query term</p></li>
<li><p>The <code translate="no">queries</code> parameter adds <code translate="no">&quot;my doc&quot;</code> to the highlight list</p></li>
<li><p>The highlighter wraps all matched terms (<code translate="no">&quot;my&quot;</code>, <code translate="no">&quot;test&quot;</code>, <code translate="no">&quot;doc&quot;</code>) with <code translate="no">{</code> and <code translate="no">}</code></p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,   <span class="hljs-comment"># Also highlight BM25 term</span></span>
<span class="highlighted-comment-line">    highlight_query=[                     <span class="hljs-comment"># Additional TEXT_MATCH terms to highlight</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;my doc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Expected output</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;{my} first {test} {doc}&#x27;]
[&#x27;{my} second {test} {doc}&#x27;]
[&#x27;{my} first {test} {doc}. Milvus is an open-source vector database built for GenAI applications.&#x27;]
[&#x27;{my} second {test} {doc}. Milvus is an open-source vector database that suits AI applications of every siz&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-3-Return-highlights-as-fragments" class="common-anchor-header">Example 3: Return highlights as fragments<button data-href="#Example-3-Return-highlights-as-fragments" class="anchor-icon" translate="no">
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
    </button></h3><p>In this example, the query searches for <code translate="no">&quot;Milvus&quot;</code> and returns highlight fragments in the following settings:</p>
<ul>
<li><p><code translate="no">fragment_offset</code> keeps up to 20 characters before the first highlighted span as leading context (default is 0).</p></li>
<li><p><code translate="no">fragment_size</code> limits each fragment to approximately 60 characters (default is 100).</p></li>
<li><p><code translate="no">num_of_fragments</code> limits the number of returned fragments per text value (default is 5).</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    fragment_offset=<span class="hljs-number">20</span>,  <span class="hljs-comment"># Keep 20 chars before match</span></span>
<span class="highlighted-comment-line">    fragment_size=<span class="hljs-number">60</span>,    <span class="hljs-comment"># Max ~60 chars per fragment</span></span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;Milvus&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(results[<span class="hljs-number">0</span>]):
    frags = hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}).get(<span class="hljs-string">&#x27;text&#x27;</span>, [])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Doc <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>: <span class="hljs-subst">{frags}</span>&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Expected output</summary></p>
<pre><code translate="no" class="language-plaintext">Doc 1: [&#x27;my first test doc. {Milvus} is an open-source vector database &#x27;]
Doc 2: [&#x27;my second test doc. {Milvus} is an open-source vector database&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-4-Multi-query-highlighting" class="common-anchor-header">Example 4: Multi-query highlighting<button data-href="#Example-4-Multi-query-highlighting" class="anchor-icon" translate="no">
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
    </button></h3><p>When searching with multiple queries in BM25 full text search, each query’s results are highlighted independently. The first query’s results contain highlights for its search term, and the second query’s results contain highlights for its search term, and so on. Each query uses the same <code translate="no">highlighter</code> configuration but applies it independently.</p>
<p>In the example below:</p>
<ul>
<li><p>First query highlights <code translate="no">&quot;test&quot;</code> in its result set</p></li>
<li><p>Second query highlights <code translate="no">&quot;Milvus&quot;</code> in its result set</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span>],  <span class="hljs-comment"># Two queries</span>
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> nq_idx, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(results):
    query_term = [<span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span>][nq_idx]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Query &#x27;<span class="hljs-subst">{query_term}</span>&#x27;:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;    <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Expected output</summary></p>
<pre><code translate="no" class="language-plaintext">Query &#x27;test&#x27;:
  [&#x27;{test} doc&#x27;]
  [&#x27;{test} doc&#x27;]
Query &#x27;Milvus&#x27;:
  [&#x27;{Milvus} is an open-source vector database built for GenAI applications.&#x27;]
  [&#x27;{Milvus} is an open-source vector database that suits AI applications of every size from running a dem&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Example-5-Custom-HTML-tags" class="common-anchor-header">Example 5: Custom HTML tags<button data-href="#Example-5-Custom-HTML-tags" class="anchor-icon" translate="no">
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
    </button></h3><p>You can use any tags for highlighting, such as HTML-safe tags for web UIs. This is useful when rendering search results in a browser.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;&lt;mark&gt;&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;&lt;/mark&gt;&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;test&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Expected output</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;&lt;mark&gt;test&lt;/mark&gt; doc&#x27;]
[&#x27;&lt;mark&gt;test&lt;/mark&gt; doc&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
