---
id: text-highlighter.md
title: Text HighlighterCompatible with Milvus 2.6.8+
summary: >-
  Der Highlighter in Milvus kennzeichnet übereinstimmende Begriffe in
  Textfeldern, indem er sie mit anpassbaren Tags umgibt. Die Hervorhebung
  verdeutlicht, warum ein Dokument übereinstimmt, verbessert die Lesbarkeit der
  Ergebnisse und unterstützt eine umfangreiche Darstellung in Such- und
  RAG-Anwendungen.
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
    </button></h2><p>When you perform a BM25 full text search, you can highlight the <strong>search terms</strong> in the returned result to help explain why a document matches the query. To learn more about BM25 full text search, refer to <a href="/docs/de/full-text-search.md">Full Text Search</a>.</p>
<p>In this scenario, highlighted terms come directly from the search terms used in BM25 full text search. The Highlighter uses these terms to annotate matched text in the final result.</p>
<p>Assume the following content is stored in a text field:</p>
<pre><code translate="no" class="language-plaintext">Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
<button class="copy-code-btn"></button></code></pre>
<p><strong>Highlighter configuration</strong></p>
<p>To highlight search terms in BM25 full text search, create a <code translate="no">LexicalHighlighter</code> and enable search term highlighting for BM25 full text search:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],              <span class="hljs-comment"># Tag inserted before each highlighted term</span>
    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],             <span class="hljs-comment"># Tag inserted after each highlighted term</span>
    highlight_search_text=<span class="hljs-literal">True</span>   <span class="hljs-comment"># Enable search term highlighting for BM25 full text search</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">LexicalHighlighter</span> <span class="hljs-variable">highlighter</span> <span class="hljs-operator">=</span> LexicalHighlighter.builder()
        .preTags(Arrays.asList(<span class="hljs-string">&quot;{&quot;</span>))              <span class="hljs-comment">// Tag inserted before each highlighted term</span>
        .postTags(Arrays.asList(<span class="hljs-string">&quot;}&quot;</span>))             <span class="hljs-comment">// Tag inserted after each highlighted term</span>
        .highlightSearchText(<span class="hljs-literal">true</span>)                <span class="hljs-comment">// Enable search term highlighting for BM25 full text search</span>
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: the highlighter is not yet supported in milvus-sdk-go.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">highlighter</span> = LexicalHighlighter::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">pre_tags</span>([<span class="hljs-string">&quot;{&quot;</span>])            <span class="hljs-comment">// Tag inserted before each highlighted term</span>
    .<span class="hljs-title function_ invoke__">post_tags</span>([<span class="hljs-string">&quot;}&quot;</span>])           <span class="hljs-comment">// Tag inserted after each highlighted term</span>
    .<span class="hljs-title function_ invoke__">highlight_search_text</span>(<span class="hljs-literal">true</span>); <span class="hljs-comment">// Enable search term highlighting for BM25 full text search</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> highlighter = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::LexicalHighlighter&gt;();
highlighter-&gt;<span class="hljs-built_in">WithPreTags</span>({<span class="hljs-string">&quot;{&quot;</span>});             <span class="hljs-comment">// Tag inserted before each highlighted term</span>
highlighter-&gt;<span class="hljs-built_in">WithPostTags</span>({<span class="hljs-string">&quot;}&quot;</span>});            <span class="hljs-comment">// Tag inserted after each highlighted term</span>
highlighter-&gt;<span class="hljs-built_in">WithHighlightSearchText</span>(<span class="hljs-literal">true</span>);  <span class="hljs-comment">// Enable search term highlighting for BM25 full text search</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HighlightType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> highlighter = {
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">HighlightType</span>.<span class="hljs-property">Lexical</span>,
    <span class="hljs-attr">pre_tags</span>: [<span class="hljs-string">&quot;{&quot;</span>],             <span class="hljs-comment">// Tag inserted before each highlighted term</span>
    <span class="hljs-attr">post_tags</span>: [<span class="hljs-string">&quot;}&quot;</span>],            <span class="hljs-comment">// Tag inserted after each highlighted term</span>
    <span class="hljs-attr">highlight_search_text</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enable search term highlighting for BM25 full text search</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> highlighter = <span class="hljs-keyword">new</span> SearchParameters
{
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        [<span class="hljs-string">&quot;pre_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;{\&quot;]&quot;</span>,            <span class="hljs-comment">// Tag inserted before each highlighted term</span>
        [<span class="hljs-string">&quot;post_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;}\&quot;]&quot;</span>,           <span class="hljs-comment">// Tag inserted after each highlighted term</span>
        [<span class="hljs-string">&quot;highlight_search_text&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>   <span class="hljs-comment">// Enable search term highlighting for BM25 full text search</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: the highlighter is not yet supported in the RESTful API.</span>
<button class="copy-code-btn"></button></code></pre>
<p>In this example:</p>
<ul>
<li><p><code translate="no">pre_tags</code> and <code translate="no">post_tags</code> control how highlighted text appears in the output. In this case, matched terms are wrapped by <code translate="no">{}</code> (for example, <code translate="no">{term}</code>). You can also provide multiple tags as a list (for example, <code translate="no">[&quot;&lt;b&gt;&quot;, &quot;&lt;i&gt;&quot;]</code>). When multiple terms are highlighted, tags are applied in order and rotated by match sequence.</p></li>
<li><p><code translate="no">highlight_search_text=True</code> tells Milvus to use the search terms in BM25 full text search as the source of highlighted terms.</p></li>
</ul>
<p>Once the Highlighter object is created, apply its configuration to your BM25 full text search request:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    data=[<span class="hljs-string">&quot;BM25&quot;</span>],      <span class="hljs-comment"># Search term used in BM25 full text search</span>
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">LexicalHighlighter</span> <span class="hljs-variable">highlighter</span> <span class="hljs-operator">=</span> LexicalHighlighter.builder()
        .preTags(Arrays.asList(<span class="hljs-string">&quot;{&quot;</span>))
        .postTags(Arrays.asList(<span class="hljs-string">&quot;}&quot;</span>))
        .highlightSearchText(<span class="hljs-literal">true</span>)
        .build();

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;highlighter_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;BM25&quot;</span>)))  <span class="hljs-comment">// Search term used in BM25 full text search</span>
        .annsField(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)   <span class="hljs-comment">// Pass highlighter config here</span>
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: the highlighter is not yet supported in milvus-sdk-go.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">highlighter</span> = LexicalHighlighter::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">pre_tags</span>([<span class="hljs-string">&quot;{&quot;</span>])
    .<span class="hljs-title function_ invoke__">post_tags</span>([<span class="hljs-string">&quot;}&quot;</span>])
    .<span class="hljs-title function_ invoke__">highlight_search_text</span>(<span class="hljs-literal">true</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;highlighter_demo&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddedText</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;BM25&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()])) <span class="hljs-comment">// Search term</span>
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">highlighter</span>(highlighter)   <span class="hljs-comment">// Pass highlighter config here</span>
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> highlighter = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::LexicalHighlighter&gt;();
highlighter-&gt;<span class="hljs-built_in">WithPreTags</span>({<span class="hljs-string">&quot;{&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithPostTags</span>({<span class="hljs-string">&quot;}&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithHighlightSearchText</span>(<span class="hljs-literal">true</span>);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;highlighter_demo&quot;</span>)
    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>)
    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;BM25&quot;</span>)        <span class="hljs-comment">// Search term used in BM25 full text search</span>
    .<span class="hljs-built_in">WithHighlighter</span>(highlighter);  <span class="hljs-comment">// Pass highlighter config here</span>

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HighlightType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> highlighter = {
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">HighlightType</span>.<span class="hljs-property">Lexical</span>,
    <span class="hljs-attr">pre_tags</span>: [<span class="hljs-string">&quot;{&quot;</span>],
    <span class="hljs-attr">post_tags</span>: [<span class="hljs-string">&quot;}&quot;</span>],
    <span class="hljs-attr">highlight_search_text</span>: <span class="hljs-literal">true</span>,
};

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;highlighter_demo&quot;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;BM25&quot;</span>],             <span class="hljs-comment">// Search term used in BM25 full text search</span>
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>],
    highlighter,                <span class="hljs-comment">// Pass highlighter config here</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> highlighter = <span class="hljs-keyword">new</span> SearchParameters
{
    OutputFields = { <span class="hljs-string">&quot;text&quot;</span> },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        [<span class="hljs-string">&quot;pre_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;{\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;post_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;}\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;highlight_search_text&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>
    }
};

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;highlighter_demo&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;BM25&quot;</span> },   <span class="hljs-comment">// Search term used in BM25 full text search</span>
    MetricType = MetricType.Bm25,
    Limit = <span class="hljs-number">10</span>,
    Parameters = highlighter    <span class="hljs-comment">// Pass highlighter config here</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: the highlighter is not yet supported in the RESTful API.</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Highlighting output</strong></p>
<p>When highlighting is enabled, Milvus returns highlighted text in a dedicated <code translate="no">highlight</code> field of each search result. The <code translate="no">highlight</code> object maps each highlighted field name to an object that contains a <code translate="no">fragments</code> list and a matching <code translate="no">scores</code> list. By default, highlighted output is returned as a fragment starting from the first matched term.</p>
<p>In this example, the search term is <code translate="no">&quot;BM25&quot;</code>, so it is highlighted in the returned result. <code translate="no">fragments</code> holds the highlighted text and <code translate="no">scores</code> holds the corresponding numeric score of each fragment; the score values shown on this page are illustrative.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;fragments&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                <span class="hljs-string">&quot;{BM25} for keyword relevance. Filters can narrow results.&quot;</span>
            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;scores&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.72</span><span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>To control the position, length, and number of returned fragments, see <a href="/docs/de/text-highlighter.md#Fragment-based-highlighting-output">Return highlighted text as fragments</a>.</p>
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
<p>Currently, only the <code translate="no">TEXT_MATCH</code> filtering condition is supported for query term highlighting. To learn more, refer to <a href="/docs/de/keyword-match.md">Text Match</a>.</p>
</div>
<p>In this scenario, highlighted terms come from text-based filtering expressions. Filtering determines which documents match, while the Highlighter annotates the matched text spans.</p>
<p>Assume the following content is stored in a text field:</p>
<pre><code translate="no" class="language-plaintext">This document explains how text filtering works in Milvus.
<button class="copy-code-btn"></button></code></pre>
<p><strong>Highlighter configuration</strong></p>
<p>To highlight query terms used in filtering, create a <code translate="no">LexicalHighlighter</code> and define a <code translate="no">highlight_query</code> that corresponds to the filtering condition:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">LexicalHighlighter</span> <span class="hljs-variable">highlighter</span> <span class="hljs-operator">=</span> LexicalHighlighter.builder()
        .preTags(Arrays.asList(<span class="hljs-string">&quot;{&quot;</span>))              <span class="hljs-comment">// Tag inserted before each highlighted term</span>
        .postTags(Arrays.asList(<span class="hljs-string">&quot;}&quot;</span>))             <span class="hljs-comment">// Tag inserted after each highlighted term</span>
        <span class="hljs-comment">// Text filtering type, target text field, terms to highlight</span>
        .addHighlightQuery(<span class="hljs-keyword">new</span> <span class="hljs-title class_">LexicalHighlighter</span>.HighlightQuery(<span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text filtering&quot;</span>))
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: the highlighter is not yet supported in milvus-sdk-go.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">highlighter</span> = LexicalHighlighter::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">pre_tags</span>([<span class="hljs-string">&quot;{&quot;</span>])            <span class="hljs-comment">// Tag inserted before each highlighted term</span>
    .<span class="hljs-title function_ invoke__">post_tags</span>([<span class="hljs-string">&quot;}&quot;</span>])           <span class="hljs-comment">// Tag inserted after each highlighted term</span>
    <span class="hljs-comment">// Text filtering type, target text field, terms to highlight</span>
    .<span class="hljs-title function_ invoke__">add_highlight_query</span>(
        HighlightQuery::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">query_type</span>(<span class="hljs-string">&quot;TextMatch&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(<span class="hljs-string">&quot;text&quot;</span>)
            .<span class="hljs-title function_ invoke__">text</span>(<span class="hljs-string">&quot;text filtering&quot;</span>),
    );
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> highlighter = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::LexicalHighlighter&gt;();
highlighter-&gt;<span class="hljs-built_in">WithPreTags</span>({<span class="hljs-string">&quot;{&quot;</span>});    <span class="hljs-comment">// Tag inserted before each highlighted term</span>
highlighter-&gt;<span class="hljs-built_in">WithPostTags</span>({<span class="hljs-string">&quot;}&quot;</span>});   <span class="hljs-comment">// Tag inserted after each highlighted term</span>
<span class="hljs-comment">// Text filtering type, target text field, terms to highlight</span>
highlighter-&gt;<span class="hljs-built_in">AddHighlightQuery</span>(<span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text filtering&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HighlightType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> highlighter = {
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">HighlightType</span>.<span class="hljs-property">Lexical</span>,
    <span class="hljs-attr">pre_tags</span>: [<span class="hljs-string">&quot;{&quot;</span>],              <span class="hljs-comment">// Tag inserted before each highlighted term</span>
    <span class="hljs-attr">post_tags</span>: [<span class="hljs-string">&quot;}&quot;</span>],             <span class="hljs-comment">// Tag inserted after each highlighted term</span>
    <span class="hljs-attr">highlight_query</span>: [
        { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-attr">field</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;text filtering&quot;</span> },
    ],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> highlighter = <span class="hljs-keyword">new</span> SearchParameters
{
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        [<span class="hljs-string">&quot;pre_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;{\&quot;]&quot;</span>,                       <span class="hljs-comment">// Tag inserted before each highlighted term</span>
        [<span class="hljs-string">&quot;post_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;}\&quot;]&quot;</span>,                      <span class="hljs-comment">// Tag inserted after each highlighted term</span>
        [<span class="hljs-string">&quot;highlight_query&quot;</span>] = <span class="hljs-string">&quot;[{\&quot;type\&quot;:\&quot;TextMatch\&quot;,\&quot;field\&quot;:\&quot;text\&quot;,\&quot;text\&quot;:\&quot;text filtering\&quot;}]&quot;</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: the highlighter is not yet supported in the RESTful API.</span>
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">pre_tags</code> and <code translate="no">post_tags</code> control how highlighted text appears in the output. In this case, matched terms are wrapped by <code translate="no">{}</code> (for example, <code translate="no">{term}</code>). You can also provide multiple tags as a list (for example, <code translate="no">[&quot;&lt;b&gt;&quot;, &quot;&lt;i&gt;&quot;]</code>). When multiple terms are highlighted, tags are applied in order and rotated by match sequence.</p></li>
<li><p><code translate="no">highlight_query</code> defines which filtering terms should be highlighted.</p></li>
</ul>
<p>Once the Highlighter object is created, apply the same filtering expression and the highlighter configuration to your search request:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(text, &quot;text filtering&quot;)&#x27;</span>,
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">LexicalHighlighter</span> <span class="hljs-variable">highlighter</span> <span class="hljs-operator">=</span> LexicalHighlighter.builder()
        .preTags(Arrays.asList(<span class="hljs-string">&quot;{&quot;</span>))
        .postTags(Arrays.asList(<span class="hljs-string">&quot;}&quot;</span>))
        .addHighlightQuery(<span class="hljs-keyword">new</span> <span class="hljs-title class_">LexicalHighlighter</span>.HighlightQuery(<span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text filtering&quot;</span>))
        .build();

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;highlighter_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;BM25&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .filter(<span class="hljs-string">&quot;TEXT_MATCH(text, \&quot;text filtering\&quot;)&quot;</span>)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)   <span class="hljs-comment">// Pass highlighter config here</span>
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: the highlighter is not yet supported in milvus-sdk-go.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">highlighter</span> = LexicalHighlighter::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">pre_tags</span>([<span class="hljs-string">&quot;{&quot;</span>])
    .<span class="hljs-title function_ invoke__">post_tags</span>([<span class="hljs-string">&quot;}&quot;</span>])
    .<span class="hljs-title function_ invoke__">add_highlight_query</span>(
        HighlightQuery::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">query_type</span>(<span class="hljs-string">&quot;TextMatch&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(<span class="hljs-string">&quot;text&quot;</span>)
            .<span class="hljs-title function_ invoke__">text</span>(<span class="hljs-string">&quot;text filtering&quot;</span>),
    );

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;highlighter_demo&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddedText</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;BM25&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()]))
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">r#&quot;TEXT_MATCH(text, &quot;text filtering&quot;)&quot;#</span>)
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">highlighter</span>(highlighter)   <span class="hljs-comment">// Pass highlighter config here</span>
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> highlighter = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::LexicalHighlighter&gt;();
highlighter-&gt;<span class="hljs-built_in">WithPreTags</span>({<span class="hljs-string">&quot;{&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithPostTags</span>({<span class="hljs-string">&quot;}&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">AddHighlightQuery</span>(<span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text filtering&quot;</span>);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;highlighter_demo&quot;</span>)
    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
    .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">R&quot;(TEXT_MATCH(text, &quot;text filtering&quot;))&quot;</span>)
    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>)
    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;BM25&quot;</span>)
    .<span class="hljs-built_in">WithHighlighter</span>(highlighter);  <span class="hljs-comment">// Pass highlighter config here</span>

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HighlightType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> highlighter = {
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">HighlightType</span>.<span class="hljs-property">Lexical</span>,
    <span class="hljs-attr">pre_tags</span>: [<span class="hljs-string">&quot;{&quot;</span>],
    <span class="hljs-attr">post_tags</span>: [<span class="hljs-string">&quot;}&quot;</span>],
    <span class="hljs-attr">highlight_query</span>: [
        { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-attr">field</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;text filtering&quot;</span> },
    ],
};

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;highlighter_demo&quot;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;BM25&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;TEXT_MATCH(text, &quot;text filtering&quot;)&#x27;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>],
    highlighter,    <span class="hljs-comment">// Pass highlighter config here</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> highlighter = <span class="hljs-keyword">new</span> SearchParameters
{
    OutputFields = { <span class="hljs-string">&quot;text&quot;</span> },
    Expression = <span class="hljs-string">&quot;TEXT_MATCH(text, \&quot;text filtering\&quot;)&quot;</span>,
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        [<span class="hljs-string">&quot;pre_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;{\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;post_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;}\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;highlight_query&quot;</span>] = <span class="hljs-string">&quot;[{\&quot;type\&quot;:\&quot;TextMatch\&quot;,\&quot;field\&quot;:\&quot;text\&quot;,\&quot;text\&quot;:\&quot;text filtering\&quot;}]&quot;</span>
    }
};

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;highlighter_demo&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;BM25&quot;</span> },
    MetricType = MetricType.Bm25,
    Limit = <span class="hljs-number">10</span>,
    Parameters = highlighter    <span class="hljs-comment">// Pass highlighter config here</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: the highlighter is not yet supported in the RESTful API.</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Highlighting output</strong></p>
<p>When query term highlighting is enabled for filtering, Milvus returns highlighted text in a dedicated <code translate="no">highlight</code> field. By default, highlighted output is returned as a fragment starting from the first matched term.</p>
<p>In this example, the first matched term is <code translate="no">&quot;text&quot;</code>, so the returned highlighted text starts from that position:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;fragments&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                <span class="hljs-string">&quot;{text} {filtering} works in Milvus.&quot;</span>
            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;scores&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.72</span><span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>To control the position, length, and number of returned fragments, see <a href="/docs/de/text-highlighter.md#Fragment-based-highlighting-output">Return highlighted text as fragments</a>.</p>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">LexicalHighlighter</span> <span class="hljs-variable">highlighter</span> <span class="hljs-operator">=</span> LexicalHighlighter.builder()
        .preTags(Arrays.asList(<span class="hljs-string">&quot;{&quot;</span>))
        .postTags(Arrays.asList(<span class="hljs-string">&quot;}&quot;</span>))
        .highlightSearchText(<span class="hljs-literal">true</span>)
        .fragmentOffset(<span class="hljs-number">5</span>)      <span class="hljs-comment">// Number of characters to reserve before the first matched term</span>
        .fragmentSize(<span class="hljs-number">60</span>)       <span class="hljs-comment">// Max. length of each fragment to return</span>
        .numOfFragments(<span class="hljs-number">1</span>)      <span class="hljs-comment">// Max. number of fragments to return</span>
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: the highlighter is not yet supported in milvus-sdk-go.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">highlighter</span> = LexicalHighlighter::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">pre_tags</span>([<span class="hljs-string">&quot;{&quot;</span>])
    .<span class="hljs-title function_ invoke__">post_tags</span>([<span class="hljs-string">&quot;}&quot;</span>])
    .<span class="hljs-title function_ invoke__">highlight_search_text</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">fragment_offset</span>(<span class="hljs-number">5</span>)     <span class="hljs-comment">// Number of characters to reserve before the first matched term</span>
    .<span class="hljs-title function_ invoke__">fragment_size</span>(<span class="hljs-number">60</span>)      <span class="hljs-comment">// Max. length of each fragment to return</span>
    .<span class="hljs-title function_ invoke__">num_of_fragments</span>(<span class="hljs-number">1</span>);   <span class="hljs-comment">// Max. number of fragments to return</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> highlighter = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::LexicalHighlighter&gt;();
highlighter-&gt;<span class="hljs-built_in">WithPreTags</span>({<span class="hljs-string">&quot;{&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithPostTags</span>({<span class="hljs-string">&quot;}&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithHighlightSearchText</span>(<span class="hljs-literal">true</span>);
highlighter-&gt;<span class="hljs-built_in">WithFragmentOffset</span>(<span class="hljs-number">5</span>);     <span class="hljs-comment">// Number of characters to reserve before the first matched term</span>
highlighter-&gt;<span class="hljs-built_in">WithFragmentSize</span>(<span class="hljs-number">60</span>);      <span class="hljs-comment">// Max. length of each fragment to return</span>
highlighter-&gt;<span class="hljs-built_in">WithNumOfFragments</span>(<span class="hljs-number">1</span>);     <span class="hljs-comment">// Max. number of fragments to return</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HighlightType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> highlighter = {
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">HighlightType</span>.<span class="hljs-property">Lexical</span>,
    <span class="hljs-attr">pre_tags</span>: [<span class="hljs-string">&quot;{&quot;</span>],
    <span class="hljs-attr">post_tags</span>: [<span class="hljs-string">&quot;}&quot;</span>],
    <span class="hljs-attr">highlight_search_text</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">fragment_offset</span>: <span class="hljs-number">5</span>,     <span class="hljs-comment">// Number of characters to reserve before the first matched term</span>
    <span class="hljs-attr">fragment_size</span>: <span class="hljs-number">60</span>,      <span class="hljs-comment">// Max. length of each fragment to return</span>
    <span class="hljs-attr">num_of_fragments</span>: <span class="hljs-number">1</span>,    <span class="hljs-comment">// Max. number of fragments to return</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> highlighter = <span class="hljs-keyword">new</span> SearchParameters
{
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        [<span class="hljs-string">&quot;pre_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;{\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;post_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;}\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;highlight_search_text&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>,
        [<span class="hljs-string">&quot;fragment_offset&quot;</span>] = <span class="hljs-string">&quot;5&quot;</span>,      <span class="hljs-comment">// Number of characters to reserve before the first matched term</span>
        [<span class="hljs-string">&quot;fragment_size&quot;</span>] = <span class="hljs-string">&quot;60&quot;</span>,       <span class="hljs-comment">// Max. length of each fragment to return</span>
        [<span class="hljs-string">&quot;num_of_fragments&quot;</span>] = <span class="hljs-string">&quot;1&quot;</span>      <span class="hljs-comment">// Max. number of fragments to return</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: the highlighter is not yet supported in the RESTful API.</span>
<button class="copy-code-btn"></button></code></pre>
<p>In this configuration:</p>
<ul>
<li><p><code translate="no">fragment_offset</code> reserves leading context before the first highlighted term.</p></li>
<li><p><code translate="no">fragment_size</code> limits how much text is included in each fragment.</p></li>
<li><p><code translate="no">num_of_fragments</code> controls how many fragments are returned.</p></li>
</ul>
<p>Once the Highlighter object is created, apply the highlighter configuration to your search request:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">results = client.search(
    ...,
    data=[<span class="hljs-string">&quot;BM25&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter <span class="hljs-comment"># Pass highlighter config here</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">LexicalHighlighter</span> <span class="hljs-variable">highlighter</span> <span class="hljs-operator">=</span> LexicalHighlighter.builder()
        .preTags(Arrays.asList(<span class="hljs-string">&quot;{&quot;</span>))
        .postTags(Arrays.asList(<span class="hljs-string">&quot;}&quot;</span>))
        .highlightSearchText(<span class="hljs-literal">true</span>)
        .fragmentOffset(<span class="hljs-number">5</span>)
        .fragmentSize(<span class="hljs-number">60</span>)
        .numOfFragments(<span class="hljs-number">1</span>)
        .build();

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;highlighter_demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;BM25&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)   <span class="hljs-comment">// Pass highlighter config here</span>
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: the highlighter is not yet supported in milvus-sdk-go.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">highlighter</span> = LexicalHighlighter::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">pre_tags</span>([<span class="hljs-string">&quot;{&quot;</span>])
    .<span class="hljs-title function_ invoke__">post_tags</span>([<span class="hljs-string">&quot;}&quot;</span>])
    .<span class="hljs-title function_ invoke__">highlight_search_text</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">fragment_offset</span>(<span class="hljs-number">5</span>)
    .<span class="hljs-title function_ invoke__">fragment_size</span>(<span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">num_of_fragments</span>(<span class="hljs-number">1</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;highlighter_demo&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddedText</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;BM25&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">highlighter</span>(highlighter)   <span class="hljs-comment">// Pass highlighter config here</span>
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> highlighter = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::LexicalHighlighter&gt;();
highlighter-&gt;<span class="hljs-built_in">WithPreTags</span>({<span class="hljs-string">&quot;{&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithPostTags</span>({<span class="hljs-string">&quot;}&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithHighlightSearchText</span>(<span class="hljs-literal">true</span>);
highlighter-&gt;<span class="hljs-built_in">WithFragmentOffset</span>(<span class="hljs-number">5</span>);
highlighter-&gt;<span class="hljs-built_in">WithFragmentSize</span>(<span class="hljs-number">60</span>);
highlighter-&gt;<span class="hljs-built_in">WithNumOfFragments</span>(<span class="hljs-number">1</span>);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;highlighter_demo&quot;</span>)
    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>)
    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;BM25&quot;</span>)
    .<span class="hljs-built_in">WithHighlighter</span>(highlighter);  <span class="hljs-comment">// Pass highlighter config here</span>

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HighlightType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> highlighter = {
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">HighlightType</span>.<span class="hljs-property">Lexical</span>,
    <span class="hljs-attr">pre_tags</span>: [<span class="hljs-string">&quot;{&quot;</span>],
    <span class="hljs-attr">post_tags</span>: [<span class="hljs-string">&quot;}&quot;</span>],
    <span class="hljs-attr">highlight_search_text</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">fragment_offset</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">fragment_size</span>: <span class="hljs-number">60</span>,
    <span class="hljs-attr">num_of_fragments</span>: <span class="hljs-number">1</span>,
};

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;highlighter_demo&quot;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;BM25&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>],
    highlighter,    <span class="hljs-comment">// Pass highlighter config here</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> highlighter = <span class="hljs-keyword">new</span> SearchParameters
{
    OutputFields = { <span class="hljs-string">&quot;text&quot;</span> },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        [<span class="hljs-string">&quot;pre_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;{\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;post_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;}\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;highlight_search_text&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>,
        [<span class="hljs-string">&quot;fragment_offset&quot;</span>] = <span class="hljs-string">&quot;5&quot;</span>,
        [<span class="hljs-string">&quot;fragment_size&quot;</span>] = <span class="hljs-string">&quot;60&quot;</span>,
        [<span class="hljs-string">&quot;num_of_fragments&quot;</span>] = <span class="hljs-string">&quot;1&quot;</span>
    }
};

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;highlighter_demo&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;BM25&quot;</span> },
    MetricType = MetricType.Bm25,
    Limit = <span class="hljs-number">10</span>,
    Parameters = highlighter    <span class="hljs-comment">// Pass highlighter config here</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: the highlighter is not yet supported in the RESTful API.</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Highlighting output</strong></p>
<p>With fragment-based highlighting enabled, Milvus returns highlighted text as fragments in the <code translate="no">fragments</code> list of the field’s <code translate="no">highlight</code> object:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    ...<span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;highlight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;fragments&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                <span class="hljs-string">&quot;Use {BM25} for keyword relevance. Filters can narrow results.&quot;</span>
            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;scores&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.72</span><span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.HasCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
<span class="hljs-type">String</span> <span class="hljs-variable">COLLECTION_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-comment">// Clean up existing collection</span>
<span class="hljs-keyword">if</span> (client.hasCollection(HasCollectionReq.builder().collectionName(COLLECTION_NAME).build())) {
    client.dropCollection(DropCollectionReq.builder().collectionName(COLLECTION_NAME).build());
}

<span class="hljs-comment">// Define schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">2000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)  <span class="hljs-comment">// Required for BM25</span>
        .enableMatch(<span class="hljs-literal">true</span>)     <span class="hljs-comment">// Required for TEXT_MATCH</span>
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());

<span class="hljs-comment">// Add BM25 function</span>
schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse_vector&quot;</span>))
        .build());

<span class="hljs-comment">// Create the collection with the BM25 index</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.BM25)
        .build();

client.createCollection(CreateCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .collectionSchema(schema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

<span class="hljs-comment">// Insert sample documents</span>
List&lt;String&gt; docs = Arrays.asList(
        <span class="hljs-string">&quot;my first test doc&quot;</span>,
        <span class="hljs-string">&quot;my second test doc&quot;</span>,
        <span class="hljs-string">&quot;my first test doc. Milvus is an open-source vector database built for GenAI applications.&quot;</span>,
        <span class="hljs-string">&quot;my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search.&quot;</span>
);
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (String doc : docs) {
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;text&quot;</span>, doc);
    rows.add(row);
}
client.insert(InsertReq.builder().collectionName(COLLECTION_NAME).data(rows).build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">collectionName := <span class="hljs-string">&quot;highlighter_demo&quot;</span>

<span class="hljs-comment">// Clean up existing collection</span>
has, err := client.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<span class="hljs-keyword">if</span> has {
    _ = client.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName))
}

<span class="hljs-comment">// Define schema</span>
schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>).WithIsAutoID(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;text&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">2000</span>).WithEnableAnalyzer(<span class="hljs-literal">true</span>).WithEnableMatch(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;sparse_vector&quot;</span>).WithDataType(entity.FieldTypeSparseVector))

<span class="hljs-comment">// Add BM25 function</span>
schema.WithFunction(entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;sparse_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25))

<span class="hljs-comment">// Create the BM25 index</span>
indexOption := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;sparse_vector&quot;</span>, index.NewSparseInvertedIndex(entity.BM25, <span class="hljs-number">0.05</span>))
indexOption.WithExtraParam(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>)
indexOption.WithExtraParam(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>)
indexOption.WithExtraParam(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
    WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-comment">// Insert sample documents</span>
docs := []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;my first test doc&quot;</span>,
    <span class="hljs-string">&quot;my second test doc&quot;</span>,
    <span class="hljs-string">&quot;my first test doc. Milvus is an open-source vector database built for GenAI applications.&quot;</span>,
    <span class="hljs-string">&quot;my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search.&quot;</span>,
}
_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName).
    WithVarcharColumn(<span class="hljs-string">&quot;text&quot;</span>, docs))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">collection_name</span> = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-comment">// Clean up existing collection</span>
<span class="hljs-keyword">if</span> client
    .<span class="hljs-title function_ invoke__">has_collection</span>(HasCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>().<span class="hljs-title function_ invoke__">collection_name</span>(collection_name).<span class="hljs-title function_ invoke__">build</span>()?)
    .<span class="hljs-keyword">await</span>?
    .<span class="hljs-title function_ invoke__">exists</span>()
{
    client
        .<span class="hljs-title function_ invoke__">drop_collection</span>(DropCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>().<span class="hljs-title function_ invoke__">collection_name</span>(collection_name).<span class="hljs-title function_ invoke__">build</span>()?)
        .<span class="hljs-keyword">await</span>?;
}

<span class="hljs-comment">// Define schema</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;id&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64).<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_ invoke__">auto_id</span>(<span class="hljs-literal">true</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">2000</span>)
            .<span class="hljs-title function_ invoke__">enable_analyzer</span>(<span class="hljs-literal">true</span>)  <span class="hljs-comment">// Required for BM25</span>
            .<span class="hljs-title function_ invoke__">enable_match</span>(<span class="hljs-literal">true</span>),    <span class="hljs-comment">// Required for TEXT_MATCH</span>
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::SparseFloatVector))
    .<span class="hljs-title function_ invoke__">add_function</span>(
        Function::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>)
            .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Bm25)
            .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;sparse_vector&quot;</span>]),
    );

<span class="hljs-comment">// Create the collection with the BM25 index</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">index_param</span> = IndexParam::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::SparseInvertedIndex)
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25)
    .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
        (<span class="hljs-string">&quot;inverted_index_algo&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;bm25_k1&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;1.2&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;bm25_b&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;0.75&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
    ]));

client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">schema</span>(schema)
            .<span class="hljs-title function_ invoke__">index_param</span>(index_param)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Insert sample documents</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">docs</span> = <span class="hljs-built_in">vec!</span>[
    json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;my first test doc&quot;</span>}),
    json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;my second test doc&quot;</span>}),
    json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;my first test doc. Milvus is an open-source vector database built for GenAI applications.&quot;</span>}),
    json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search.&quot;</span>}),
];

client
    .<span class="hljs-title function_ invoke__">insert</span>(
        InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">rows</span>(docs)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-comment">// Clean up existing collection</span>
milvus::HasCollectionResponse has_response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">HasCollection</span>(milvus::<span class="hljs-built_in">HasCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(collection_name), has_response);
<span class="hljs-keyword">if</span> (has_response.<span class="hljs-built_in">Has</span>()) {
    status = client-&gt;<span class="hljs-built_in">DropCollection</span>(milvus::<span class="hljs-built_in">DropCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(collection_name));
}

<span class="hljs-comment">// Define schema</span>
milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">AddField</span>({<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>});
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR)
                    .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">2000</span>)
                    .<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>)   <span class="hljs-comment">// Required for BM25</span>
                    .<span class="hljs-built_in">EnableMatch</span>(<span class="hljs-literal">true</span>));    <span class="hljs-comment">// Required for TEXT_MATCH</span>
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>, milvus::DataType::SPARSE_FLOAT_VECTOR));

<span class="hljs-comment">// Add BM25 function</span>
milvus::FunctionPtr function = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;text_bm25&quot;</span>, milvus::FunctionType::BM25);
function-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;text&quot;</span>);
function-&gt;<span class="hljs-built_in">AddOutputFieldName</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>);
schema-&gt;<span class="hljs-built_in">AddFunction</span>(function);

<span class="hljs-comment">// Create the collection with the BM25 index</span>
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index_param</span><span class="hljs-params">(<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndexType::SPARSE_INVERTED_INDEX, milvus::MetricType::BM25)</span></span>;
index_param.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
index_param.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-string">&quot;1.2&quot;</span>);
index_param.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-string">&quot;0.75&quot;</span>);

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                     .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                                     .<span class="hljs-built_in">WithCollectionSchema</span>(schema)
                                     .<span class="hljs-built_in">AddIndex</span>(std::<span class="hljs-built_in">move</span>(index_param)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Insert sample documents</span>
std::vector&lt;std::string&gt; docs = {
    <span class="hljs-string">&quot;my first test doc&quot;</span>,
    <span class="hljs-string">&quot;my second test doc&quot;</span>,
    <span class="hljs-string">&quot;my first test doc. Milvus is an open-source vector database built for GenAI applications.&quot;</span>,
    <span class="hljs-string">&quot;my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search.&quot;</span>,
};

milvus::EntityRows rows;
<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; doc : docs) {
    rows.<span class="hljs-built_in">push_back</span>({{<span class="hljs-string">&quot;text&quot;</span>, doc}});
}

milvus::InsertResponse insert_response;
status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                            .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                            .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(rows)),
                        insert_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-comment">// Clean up existing collection</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span> })) {
    <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span> });
}

<span class="hljs-comment">// Create the collection with the BM25 function and index</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
    <span class="hljs-attr">schema</span>: [
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">2000</span>, <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span> },
    ],
    <span class="hljs-attr">functions</span>: [
        {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_bm25&quot;</span>,
            <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
            <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;text&quot;</span>],
            <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;sparse_vector&quot;</span>],
        },
    ],
    <span class="hljs-attr">index_params</span>: [
        {
            <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
            <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
            <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
            <span class="hljs-attr">params</span>: { <span class="hljs-attr">inverted_index_algo</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, <span class="hljs-attr">bm25_k1</span>: <span class="hljs-number">1.2</span>, <span class="hljs-attr">bm25_b</span>: <span class="hljs-number">0.75</span> },
        },
    ],
});

<span class="hljs-comment">// Insert sample documents</span>
<span class="hljs-keyword">const</span> docs = [
    <span class="hljs-string">&quot;my first test doc&quot;</span>,
    <span class="hljs-string">&quot;my second test doc&quot;</span>,
    <span class="hljs-string">&quot;my first test doc. Milvus is an open-source vector database built for GenAI applications.&quot;</span>,
    <span class="hljs-string">&quot;my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search.&quot;</span>,
];
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>, <span class="hljs-attr">data</span>: docs.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> ({ text })) });

<span class="hljs-comment">// Helper for search params</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">SEARCH_PARAMS</span> = { <span class="hljs-attr">params</span>: { <span class="hljs-attr">drop_ratio_search</span>: <span class="hljs-number">0.0</span> } };
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">const</span> <span class="hljs-built_in">string</span> collectionName = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-comment">// Clean up existing collection</span>
<span class="hljs-keyword">if</span> ((<span class="hljs-keyword">await</span> client.HasCollectionAsync(<span class="hljs-keyword">new</span> HasCollectionReq { CollectionName = collectionName })).Has)
{
    <span class="hljs-keyword">await</span> client.DropCollectionAsync(<span class="hljs-keyword">new</span> DropCollectionReq { CollectionName = collectionName });
}

<span class="hljs-comment">// Define schema, BM25 function, and index</span>
<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema { Name = collectionName };
schema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;id&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>, autoId: <span class="hljs-literal">true</span>));
schema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;text&quot;</span>, maxLength: <span class="hljs-number">2000</span>, enableAnalyzer: <span class="hljs-literal">true</span>, enableMatch: <span class="hljs-literal">true</span>));
schema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;sparse_vector&quot;</span>, DataType.SparseFloatVector));
schema.Functions.Add(FunctionSchema.CreateBm25(<span class="hljs-string">&quot;text_bm25&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;sparse_vector&quot;</span>));

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = collectionName,
    Schema = schema,
    Indexes = <span class="hljs-keyword">new</span>[] { <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-literal">null</span>, IndexType.SparseInvertedIndex, MetricType.Bm25)
    {
        ExtraParams = { [<span class="hljs-string">&quot;inverted_index_algo&quot;</span>] = <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, [<span class="hljs-string">&quot;bm25_k1&quot;</span>] = <span class="hljs-string">&quot;1.2&quot;</span>, [<span class="hljs-string">&quot;bm25_b&quot;</span>] = <span class="hljs-string">&quot;0.75&quot;</span> }
    } }
});

<span class="hljs-comment">// Insert sample documents</span>
<span class="hljs-built_in">string</span>[] docs =
[
    <span class="hljs-string">&quot;my first test doc&quot;</span>,
    <span class="hljs-string">&quot;my second test doc&quot;</span>,
    <span class="hljs-string">&quot;my first test doc. Milvus is an open-source vector database built for GenAI applications.&quot;</span>,
    <span class="hljs-string">&quot;my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search.&quot;</span>
];
<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = collectionName,
    RowsData = docs.Select(text =&gt; (IDictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;)<span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;text&quot;</span>] = text }).ToList()
});
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
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
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, <span class="hljs-subst">{}</span>).get(&#x27;fragments&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">COLLECTION_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-type">LexicalHighlighter</span> <span class="hljs-variable">highlighter</span> <span class="hljs-operator">=</span> LexicalHighlighter.builder()
        .preTags(Arrays.asList(<span class="hljs-string">&quot;{&quot;</span>))
        .postTags(Arrays.asList(<span class="hljs-string">&quot;}&quot;</span>))
        .highlightSearchText(<span class="hljs-literal">true</span>)  <span class="hljs-comment">// Highlight BM25 query terms</span>
        .build();

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;test&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: the highlighter is not yet supported in milvus-sdk-go.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">collection_name</span> = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">highlighter</span> = LexicalHighlighter::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">pre_tags</span>([<span class="hljs-string">&quot;{&quot;</span>])
    .<span class="hljs-title function_ invoke__">post_tags</span>([<span class="hljs-string">&quot;}&quot;</span>])
    .<span class="hljs-title function_ invoke__">highlight_search_text</span>(<span class="hljs-literal">true</span>); <span class="hljs-comment">// Highlight BM25 query terms</span>

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddedText</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;test&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">highlighter</span>(highlighter)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">auto</span> highlighter = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::LexicalHighlighter&gt;();
highlighter-&gt;<span class="hljs-built_in">WithPreTags</span>({<span class="hljs-string">&quot;{&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithPostTags</span>({<span class="hljs-string">&quot;}&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithHighlightSearchText</span>(<span class="hljs-literal">true</span>);  <span class="hljs-comment">// Highlight BM25 query terms</span>

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>)
    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;test&quot;</span>)
    .<span class="hljs-built_in">WithHighlighter</span>(highlighter);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HighlightType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">const</span> highlighter = {
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">HighlightType</span>.<span class="hljs-property">Lexical</span>,
    <span class="hljs-attr">pre_tags</span>: [<span class="hljs-string">&quot;{&quot;</span>],
    <span class="hljs-attr">post_tags</span>: [<span class="hljs-string">&quot;}&quot;</span>],
    <span class="hljs-attr">highlight_search_text</span>: <span class="hljs-literal">true</span>,
};

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;test&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>],
    highlighter,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">const</span> <span class="hljs-built_in">string</span> collectionName = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">var</span> highlighter = <span class="hljs-keyword">new</span> SearchParameters
{
    OutputFields = { <span class="hljs-string">&quot;text&quot;</span> },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        [<span class="hljs-string">&quot;pre_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;{\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;post_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;}\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;highlight_search_text&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>   <span class="hljs-comment">// Highlight BM25 query terms</span>
    }
};

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;test&quot;</span> },
    MetricType = MetricType.Bm25,
    Limit = <span class="hljs-number">10</span>,
    Parameters = highlighter
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: the highlighter is not yet supported in the RESTful API.</span>
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
<li><p>The <code translate="no">highlight_query</code> parameter adds <code translate="no">&quot;my doc&quot;</code> to the highlight list</p></li>
<li><p>The highlighter wraps all matched terms (<code translate="no">&quot;my&quot;</code>, <code translate="no">&quot;test&quot;</code>, <code translate="no">&quot;doc&quot;</code>) with <code translate="no">{</code> and <code translate="no">}</code></p></li>
</ul>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
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
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, <span class="hljs-subst">{}</span>).get(&#x27;fragments&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">COLLECTION_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-type">LexicalHighlighter</span> <span class="hljs-variable">highlighter</span> <span class="hljs-operator">=</span> LexicalHighlighter.builder()
        .preTags(Arrays.asList(<span class="hljs-string">&quot;{&quot;</span>))
        .postTags(Arrays.asList(<span class="hljs-string">&quot;}&quot;</span>))
        .highlightSearchText(<span class="hljs-literal">true</span>)   <span class="hljs-comment">// Also highlight BM25 term</span>
        <span class="hljs-comment">// Additional TEXT_MATCH terms to highlight</span>
        .addHighlightQuery(<span class="hljs-keyword">new</span> <span class="hljs-title class_">LexicalHighlighter</span>.HighlightQuery(<span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;my doc&quot;</span>))
        .build();

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;test&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: the highlighter is not yet supported in milvus-sdk-go.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">collection_name</span> = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">highlighter</span> = LexicalHighlighter::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">pre_tags</span>([<span class="hljs-string">&quot;{&quot;</span>])
    .<span class="hljs-title function_ invoke__">post_tags</span>([<span class="hljs-string">&quot;}&quot;</span>])
    .<span class="hljs-title function_ invoke__">highlight_search_text</span>(<span class="hljs-literal">true</span>)  <span class="hljs-comment">// Also highlight BM25 term</span>
    <span class="hljs-comment">// Additional TEXT_MATCH terms to highlight</span>
    .<span class="hljs-title function_ invoke__">add_highlight_query</span>(
        HighlightQuery::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">query_type</span>(<span class="hljs-string">&quot;TextMatch&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(<span class="hljs-string">&quot;text&quot;</span>)
            .<span class="hljs-title function_ invoke__">text</span>(<span class="hljs-string">&quot;my doc&quot;</span>),
    );

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddedText</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;test&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">highlighter</span>(highlighter)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">auto</span> highlighter = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::LexicalHighlighter&gt;();
highlighter-&gt;<span class="hljs-built_in">WithPreTags</span>({<span class="hljs-string">&quot;{&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithPostTags</span>({<span class="hljs-string">&quot;}&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithHighlightSearchText</span>(<span class="hljs-literal">true</span>);  <span class="hljs-comment">// Also highlight BM25 term</span>
<span class="hljs-comment">// Additional TEXT_MATCH terms to highlight</span>
highlighter-&gt;<span class="hljs-built_in">AddHighlightQuery</span>(<span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;my doc&quot;</span>);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>)
    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;test&quot;</span>)
    .<span class="hljs-built_in">WithHighlighter</span>(highlighter);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HighlightType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">const</span> highlighter = {
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">HighlightType</span>.<span class="hljs-property">Lexical</span>,
    <span class="hljs-attr">pre_tags</span>: [<span class="hljs-string">&quot;{&quot;</span>],
    <span class="hljs-attr">post_tags</span>: [<span class="hljs-string">&quot;}&quot;</span>],
    <span class="hljs-attr">highlight_search_text</span>: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// Also highlight BM25 term</span>
    <span class="hljs-comment">// Additional TEXT_MATCH terms to highlight</span>
    <span class="hljs-attr">highlight_query</span>: [
        { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;TextMatch&quot;</span>, <span class="hljs-attr">field</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;my doc&quot;</span> },
    ],
};

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;test&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>],
    highlighter,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">const</span> <span class="hljs-built_in">string</span> collectionName = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">var</span> highlighter = <span class="hljs-keyword">new</span> SearchParameters
{
    OutputFields = { <span class="hljs-string">&quot;text&quot;</span> },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        [<span class="hljs-string">&quot;pre_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;{\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;post_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;}\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;highlight_search_text&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>,   <span class="hljs-comment">// Also highlight BM25 term</span>
        [<span class="hljs-string">&quot;highlight_query&quot;</span>] = <span class="hljs-string">&quot;[{\&quot;type\&quot;:\&quot;TextMatch\&quot;,\&quot;field\&quot;:\&quot;text\&quot;,\&quot;text\&quot;:\&quot;my doc\&quot;}]&quot;</span>
    }
};

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;test&quot;</span> },
    MetricType = MetricType.Bm25,
    Limit = <span class="hljs-number">10</span>,
    Parameters = highlighter
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: the highlighter is not yet supported in the RESTful API.</span>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">highlighter = LexicalHighlighter(</span>
<span class="highlighted-comment-line">    pre_tags=[<span class="hljs-string">&quot;{&quot;</span>],</span>
<span class="highlighted-comment-line">    post_tags=[<span class="hljs-string">&quot;}&quot;</span>],</span>
<span class="highlighted-comment-line">    highlight_search_text=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    fragment_offset=<span class="hljs-number">20</span>,  <span class="hljs-comment"># Keep 20 chars before match</span></span>
<span class="highlighted-comment-line">    fragment_size=<span class="hljs-number">60</span>,    <span class="hljs-comment"># Max ~60 chars per fragment</span></span>
<span class="highlighted-comment-line">)</span>

results = client.search(
    collection_name=COLLECTION_NAME,
    data=[<span class="hljs-string">&quot;Milvus&quot;</span>],  <span class="hljs-comment"># Query term to highlight</span>
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    search_params=SEARCH_PARAMS,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
<span class="highlighted-wrapper-line">    highlighter=highlighter,</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(results[<span class="hljs-number">0</span>]):
    frags = hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}).get(<span class="hljs-string">&#x27;text&#x27;</span>, {}).get(<span class="hljs-string">&#x27;fragments&#x27;</span>, [])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Doc <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>: <span class="hljs-subst">{frags}</span>&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">COLLECTION_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-type">LexicalHighlighter</span> <span class="hljs-variable">highlighter</span> <span class="hljs-operator">=</span> LexicalHighlighter.builder()
        .preTags(Arrays.asList(<span class="hljs-string">&quot;{&quot;</span>))
        .postTags(Arrays.asList(<span class="hljs-string">&quot;}&quot;</span>))
        .highlightSearchText(<span class="hljs-literal">true</span>)
        .fragmentOffset(<span class="hljs-number">20</span>)  <span class="hljs-comment">// Keep 20 chars before match</span>
        .fragmentSize(<span class="hljs-number">60</span>)    <span class="hljs-comment">// Max ~60 chars per fragment</span>
        .build();

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;Milvus&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: the highlighter is not yet supported in milvus-sdk-go.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">collection_name</span> = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">highlighter</span> = LexicalHighlighter::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">pre_tags</span>([<span class="hljs-string">&quot;{&quot;</span>])
    .<span class="hljs-title function_ invoke__">post_tags</span>([<span class="hljs-string">&quot;}&quot;</span>])
    .<span class="hljs-title function_ invoke__">highlight_search_text</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">fragment_offset</span>(<span class="hljs-number">20</span>)  <span class="hljs-comment">// Keep 20 chars before match</span>
    .<span class="hljs-title function_ invoke__">fragment_size</span>(<span class="hljs-number">60</span>);   <span class="hljs-comment">// Max ~60 chars per fragment</span>

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddedText</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;Milvus&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()]))  <span class="hljs-comment">// Query term</span>
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">highlighter</span>(highlighter)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">auto</span> highlighter = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::LexicalHighlighter&gt;();
highlighter-&gt;<span class="hljs-built_in">WithPreTags</span>({<span class="hljs-string">&quot;{&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithPostTags</span>({<span class="hljs-string">&quot;}&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithHighlightSearchText</span>(<span class="hljs-literal">true</span>);
highlighter-&gt;<span class="hljs-built_in">WithFragmentOffset</span>(<span class="hljs-number">20</span>);  <span class="hljs-comment">// Keep 20 chars before match</span>
highlighter-&gt;<span class="hljs-built_in">WithFragmentSize</span>(<span class="hljs-number">60</span>);    <span class="hljs-comment">// Max ~60 chars per fragment</span>

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>)
    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;Milvus&quot;</span>)  <span class="hljs-comment">// Query term to highlight</span>
    .<span class="hljs-built_in">WithHighlighter</span>(highlighter);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HighlightType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">const</span> highlighter = {
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">HighlightType</span>.<span class="hljs-property">Lexical</span>,
    <span class="hljs-attr">pre_tags</span>: [<span class="hljs-string">&quot;{&quot;</span>],
    <span class="hljs-attr">post_tags</span>: [<span class="hljs-string">&quot;}&quot;</span>],
    <span class="hljs-attr">highlight_search_text</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">fragment_offset</span>: <span class="hljs-number">20</span>,  <span class="hljs-comment">// Keep 20 chars before match</span>
    <span class="hljs-attr">fragment_size</span>: <span class="hljs-number">60</span>,    <span class="hljs-comment">// Max ~60 chars per fragment</span>
};

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;Milvus&quot;</span>],  <span class="hljs-comment">// Query term to highlight</span>
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>],
    highlighter,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">const</span> <span class="hljs-built_in">string</span> collectionName = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">var</span> highlighter = <span class="hljs-keyword">new</span> SearchParameters
{
    OutputFields = { <span class="hljs-string">&quot;text&quot;</span> },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        [<span class="hljs-string">&quot;pre_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;{\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;post_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;}\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;highlight_search_text&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>,
        [<span class="hljs-string">&quot;fragment_offset&quot;</span>] = <span class="hljs-string">&quot;20&quot;</span>,   <span class="hljs-comment">// Keep 20 chars before match</span>
        [<span class="hljs-string">&quot;fragment_size&quot;</span>] = <span class="hljs-string">&quot;60&quot;</span>      <span class="hljs-comment">// Max ~60 chars per fragment</span>
    }
};

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;Milvus&quot;</span> },   <span class="hljs-comment">// Query term to highlight</span>
    MetricType = MetricType.Bm25,
    Limit = <span class="hljs-number">10</span>,
    Parameters = highlighter
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: the highlighter is not yet supported in the RESTful API.</span>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
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
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;    <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, <span class="hljs-subst">{}</span>).get(&#x27;fragments&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">COLLECTION_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-type">LexicalHighlighter</span> <span class="hljs-variable">highlighter</span> <span class="hljs-operator">=</span> LexicalHighlighter.builder()
        .preTags(Arrays.asList(<span class="hljs-string">&quot;{&quot;</span>))
        .postTags(Arrays.asList(<span class="hljs-string">&quot;}&quot;</span>))
        .highlightSearchText(<span class="hljs-literal">true</span>)
        .build();

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;test&quot;</span>), <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;Milvus&quot;</span>)))  <span class="hljs-comment">// Two queries</span>
        .annsField(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: the highlighter is not yet supported in milvus-sdk-go.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">collection_name</span> = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">highlighter</span> = LexicalHighlighter::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">pre_tags</span>([<span class="hljs-string">&quot;{&quot;</span>])
    .<span class="hljs-title function_ invoke__">post_tags</span>([<span class="hljs-string">&quot;}&quot;</span>])
    .<span class="hljs-title function_ invoke__">highlight_search_text</span>(<span class="hljs-literal">true</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
            <span class="hljs-comment">// Two queries</span>
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddedText</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;test&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;Milvus&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">2</span>)
            .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">highlighter</span>(highlighter)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">auto</span> highlighter = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::LexicalHighlighter&gt;();
highlighter-&gt;<span class="hljs-built_in">WithPreTags</span>({<span class="hljs-string">&quot;{&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithPostTags</span>({<span class="hljs-string">&quot;}&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithHighlightSearchText</span>(<span class="hljs-literal">true</span>);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>)
    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>)
    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;test&quot;</span>)     <span class="hljs-comment">// First query</span>
    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;Milvus&quot;</span>)   <span class="hljs-comment">// Second query</span>
    .<span class="hljs-built_in">WithHighlighter</span>(highlighter);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HighlightType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">const</span> highlighter = {
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">HighlightType</span>.<span class="hljs-property">Lexical</span>,
    <span class="hljs-attr">pre_tags</span>: [<span class="hljs-string">&quot;{&quot;</span>],
    <span class="hljs-attr">post_tags</span>: [<span class="hljs-string">&quot;}&quot;</span>],
    <span class="hljs-attr">highlight_search_text</span>: <span class="hljs-literal">true</span>,
};

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span>],  <span class="hljs-comment">// Two queries</span>
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>],
    highlighter,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">const</span> <span class="hljs-built_in">string</span> collectionName = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">var</span> highlighter = <span class="hljs-keyword">new</span> SearchParameters
{
    OutputFields = { <span class="hljs-string">&quot;text&quot;</span> },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        [<span class="hljs-string">&quot;pre_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;{\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;post_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;}\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;highlight_search_text&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>
    }
};

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-string">&quot;Milvus&quot;</span> },   <span class="hljs-comment">// Two queries</span>
    MetricType = MetricType.Bm25,
    Limit = <span class="hljs-number">2</span>,
    Parameters = highlighter
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: the highlighter is not yet supported in the RESTful API.</span>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
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
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;highlight&#x27;</span>, {}</span>).get(&#x27;text&#x27;, <span class="hljs-subst">{}</span>).get(&#x27;fragments&#x27;, [])}&quot;</span>)
<span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">COLLECTION_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-type">LexicalHighlighter</span> <span class="hljs-variable">highlighter</span> <span class="hljs-operator">=</span> LexicalHighlighter.builder()
        .preTags(Arrays.asList(<span class="hljs-string">&quot;&lt;mark&gt;&quot;</span>))
        .postTags(Arrays.asList(<span class="hljs-string">&quot;&lt;/mark&gt;&quot;</span>))
        .highlightSearchText(<span class="hljs-literal">true</span>)
        .build();

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;test&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .topK(<span class="hljs-number">2</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: the highlighter is not yet supported in milvus-sdk-go.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">collection_name</span> = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">highlighter</span> = LexicalHighlighter::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">pre_tags</span>([<span class="hljs-string">&quot;&lt;mark&gt;&quot;</span>])
    .<span class="hljs-title function_ invoke__">post_tags</span>([<span class="hljs-string">&quot;&lt;/mark&gt;&quot;</span>])
    .<span class="hljs-title function_ invoke__">highlight_search_text</span>(<span class="hljs-literal">true</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">EmbeddedText</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;test&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">2</span>)
            .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">highlighter</span>(highlighter)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">auto</span> highlighter = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::LexicalHighlighter&gt;();
highlighter-&gt;<span class="hljs-built_in">WithPreTags</span>({<span class="hljs-string">&quot;&lt;mark&gt;&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithPostTags</span>({<span class="hljs-string">&quot;&lt;/mark&gt;&quot;</span>});
highlighter-&gt;<span class="hljs-built_in">WithHighlightSearchText</span>(<span class="hljs-literal">true</span>);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
    .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
    .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">2</span>)
    .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>)
    .<span class="hljs-built_in">AddEmbeddedText</span>(<span class="hljs-string">&quot;test&quot;</span>)
    .<span class="hljs-built_in">WithHighlighter</span>(highlighter);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HighlightType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">const</span> highlighter = {
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">HighlightType</span>.<span class="hljs-property">Lexical</span>,
    <span class="hljs-attr">pre_tags</span>: [<span class="hljs-string">&quot;&lt;mark&gt;&quot;</span>],
    <span class="hljs-attr">post_tags</span>: [<span class="hljs-string">&quot;&lt;/mark&gt;&quot;</span>],
    <span class="hljs-attr">highlight_search_text</span>: <span class="hljs-literal">true</span>,
};

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;test&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>],
    highlighter,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">const</span> <span class="hljs-built_in">string</span> collectionName = <span class="hljs-string">&quot;highlighter_demo&quot;</span>;

<span class="hljs-keyword">var</span> highlighter = <span class="hljs-keyword">new</span> SearchParameters
{
    OutputFields = { <span class="hljs-string">&quot;text&quot;</span> },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        [<span class="hljs-string">&quot;pre_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;&lt;mark&gt;\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;post_tags&quot;</span>] = <span class="hljs-string">&quot;[\&quot;&lt;/mark&gt;\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;highlight_search_text&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>
    }
};

<span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;test&quot;</span> },
    MetricType = MetricType.Bm25,
    Limit = <span class="hljs-number">2</span>,
    Parameters = highlighter
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: the highlighter is not yet supported in the RESTful API.</span>
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Expected output</summary></p>
<pre><code translate="no" class="language-plaintext">[&#x27;&lt;mark&gt;test&lt;/mark&gt; doc&#x27;]
[&#x27;&lt;mark&gt;test&lt;/mark&gt; doc&#x27;]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
