---
id: analyzer-overview.md
title: Analyzer Overview​
summary: >-
  In text processing, an analyzer is a crucial component that converts raw text
  into a structured, searchable format. Each analyzer typically consists of two
  core elements: tokenizer and filter. Together, they transform input text into
  tokens, refine these tokens, and prepare them for efficient indexing and
  retrieval.​
---
<h1 id="Analyzer-Overview​" class="common-anchor-header">Analyzer Overview​<button data-href="#Analyzer-Overview​" class="anchor-icon" translate="no">
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
    </button></h1><p>In text processing, an <strong>analyzer</strong> is a crucial component that converts raw text into a structured, searchable format. Each analyzer typically consists of two core elements: <strong>tokenizer</strong> and <strong>filter</strong>. Together, they transform input text into tokens, refine these tokens, and prepare them for efficient indexing and retrieval.​</p>
<p>In Milvus, analyzers are configured during collection creation when you add <code translate="no">VARCHAR</code> fields to the collection schema. Tokens produced by an analyzer can be used to build an index for keyword matching or converted into sparse embeddings for full text search. For more information, refer to <a href="/docs/keyword-match.md">​Keyword Match</a> or <a href="/docs/full-text-search.md">​Full Text Search</a>.​</p>
<div class="alert note">
<p>The use of analyzers may impact performance:​</p>
<ul>
<li><p><strong>Full text search:</strong> For full text search, DataNode and <strong>QueryNode</strong> channels consume data more slowly because they must wait for tokenization to complete. As a result, newly ingested data takes longer to become available for search.​</p></li>
<li><p><strong>Keyword match:</strong> For keyword matching, index creation is also slower since tokenization needs to finish before an index can be built.​</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer​" class="common-anchor-header">Anatomy of an analyzer​<button data-href="#Anatomy-of-an-analyzer​" class="anchor-icon" translate="no">
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
    </button></h2><p>An analyzer in Milvus consists of exactly one <strong>tokenizer</strong> and <strong>zero or more</strong> filters.​</p>
<ul>
<li><p><strong>Tokenizer</strong>: The tokenizer breaks input text into discrete units called tokens. These tokens could be words or phrases, depending on the tokenizer type.​</p></li>
<li><p><strong>Filters</strong>: Filters can be applied to tokens to further refine them, for example, by making them lowercase or removing common words.​</p></li>
</ul>
<p>The workflow below shows how an analyzer processes text.​</p>
<p><img translate="no" src="/docs/v2.5.x/assets/analyzer-overview.png" alt="analyzer-overview" width="400"/></p>
<h2 id="Analyzer-types​" class="common-anchor-header">Analyzer types​<button data-href="#Analyzer-types​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus provides two types of analyzers to meet different text processing needs:​</p>
<ul>
<li><p><strong>Built-in analyzer</strong>: These are predefined configurations that cover common text processing tasks with minimal setup. Built-in analyzers are ideal for general-purpose searches, as they require no complex configuration.​</p></li>
<li><p><strong>Custom analyzer</strong>: For more advanced requirements, custom analyzers allow you to define your own configuration by specifying both the tokenizer and zero or more filters. This level of customization is especially useful for specialized use cases where precise control over text processing is needed.​</p></li>
</ul>
<div class="alert note">
<p>If you omit analyzer configurations during collection creation, Milvus uses the <code translate="no">standard</code> analyzer for all text processing by default. For details, refer to <a href="/docs/standard-analyzer.md">​Standard</a>.​</p>
</div>
<h3 id="Built-in-analyzer​" class="common-anchor-header">Built-in analyzer​</h3><p>Built-in analyzers in Milvus are pre-configured with specific tokenizers and filters, allowing you to use them immediately without needing to define these components yourself. Each built-in analyzer serves as a template that includes a preset tokenizer and filters, with optional parameters for customization.​</p>
<p>For example, to use the <code translate="no">standard</code> built-in analyzer, simply specify its name <code translate="no">standard</code> as the <code translate="no">type</code> and optionally include extra configurations specific to this analyzer type, such as <code translate="no">stop_words</code>:​</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer​</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<p>The configuration of the <code translate="no">standard</code> built-in analyzer above is equivalent to setting up a custom analyzer with the following parameters, where <code translate="no">tokenizer</code> and <code translate="no">filter</code> options are explicitly defined to achieve the same functionality:</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]​
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre>
<p>Milvus offers the following built-in analyzers, each of which can be used directly by specifying their name as the <code translate="no">type</code> parameter:​</p>
<ul>
<li><p><code translate="no">standard</code>: Suitable for general-purpose text processing, applying standard tokenization and lowercase filtering.​</p></li>
<li><p><code translate="no">english</code>: Optimized for English-language text, with support for English stop words.​</p></li>
<li><p><code translate="no">chinese</code>: Specialized for processing Chinese text, including tokenization adapted for Chinese language structures.​</p></li>
</ul>
<h3 id="Custom-analyzer​" class="common-anchor-header">Custom analyzer​</h3><p>For more advanced text processing, custom analyzers in Milvus allow you to build a tailored text-handling pipeline by specifying both a <strong>tokenizer</strong> and filters. This setup is ideal for specialized use cases where precise control is required.​</p>
<h4 id="Tokenizer​" class="common-anchor-header">Tokenizer​</h4><p>The <strong>tokenizer</strong> is a <strong>mandatory</strong> component for a custom analyzer, which initiates the analyzer pipeline by breaking down input text into discrete units or <strong>tokens</strong>. Tokenization follows specific rules, such as splitting by whitespace or punctuation, depending on the tokenizer type. This process allows for more precise and independent handling of each word or phrase.​</p>
<p>For example, a tokenizer would convert text <code translate="no">&quot;Vector Database Built for Scale&quot;</code> into separate tokens:​</p>
<pre><code translate="no" class="language-Plain Text">[<span class="hljs-string">&quot;Vector&quot;</span>, <span class="hljs-string">&quot;Database&quot;</span>, <span class="hljs-string">&quot;Built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;Scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Example of specifying a tokenizer</strong>:​</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filter​" class="common-anchor-header">Filter​</h4><p><strong>Filters</strong> are <strong>optional</strong> components working on the tokens produced by the tokenizer, transforming or refining them as needed. For example, after applying a <code translate="no">lowercase</code> filter to the tokenized terms <code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code>, the result might be:​</p>
<pre><code translate="no" class="language-SQL">[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p>Filters in a custom analyzer can be either <strong>built-in</strong> or <strong>custom</strong>, depending on configuration needs.​</p>
<ul>
<li><p><strong>Built-in filters</strong>: Pre-configured by Milvus, requiring minimal setup. You can use these filters out-of-the-box by specifying their names. The filters below are built-in for direct use:​</p>
<ul>
<li><p><code translate="no">lowercase</code>: Converts text to lowercase, ensuring case-insensitive matching. For details, refer to <a href="/docs/lowercase-filter.md">​Lowercase</a>.​</p></li>
<li><p><code translate="no">asciifolding</code>: Converts non-ASCII characters to ASCII equivalents, simplifying multilingual text handling. For details, refer to <a href="/docs/ascii-folding-filter.md">​ASCII folding</a>.​</p></li>
<li><p><code translate="no">alphanumonly</code>: Retains only alphanumeric characters by removing others. For details, refer to <a href="/docs/alphanumonly-filter.md">​Alphanumonly</a>.​</p></li>
<li><p><code translate="no">cnalphanumonly</code>: Removes tokens that contain any characters other than Chinese characters, English letters, or digits. For details, refer to <a href="/docs/cnalphanumonly-filter.md">​Cnalphanumonly</a>.​</p></li>
<li><p><code translate="no">cncharonly</code>: Removes tokens that contain any non-Chinese characters. For details, refer to <a href="/docs/cncharonly-filter.md">​Cncharonly</a>.​</p></li>
</ul>
<p><strong>Example of using a built-in filter:</strong>​</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase​</span>
}​
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Custom filters</strong>: Custom filters allow for specialized configurations. You can define a custom filter by choosing a valid filter type (<code translate="no">filter.type</code>) and adding specific settings for each filter type. Examples of filter types that support customization:​</p>
<ul>
<li><p><code translate="no">stop</code>: Removes specified common words by setting a list of stop words (e.g., <code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code>). For details, refer to <a href="/docs/stop-filter.md">​Stop</a>.​</p></li>
<li><p><code translate="no">length</code>: Excludes tokens based on length criteria, such as setting a maximum token length. For details, refer to <a href="/docs/length-filter.md">​Length</a>.​</p></li>
<li><p><code translate="no">stemmer</code>: Reduces words to their root forms for more flexible matching. For details, refer to <a href="/docs/stemmer-filter.md">​Stemmer</a>.​</p></li>
</ul>
<p><strong>Example of configuring a custom filter:</strong>​</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type​</span>
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Example-use​" class="common-anchor-header">Example use​<button data-href="#Example-use​" class="anchor-icon" translate="no">
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
    </button></h2><p>In this example, we define a collection schema with a vector field for embeddings and two <code translate="no">VARCHAR</code> fields for text processing capabilities. Each <code translate="no">VARCHAR</code> field is configured with its own analyzer settings to handle different processing needs.​</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
<span class="hljs-comment"># Set up a Milvus client​</span>
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
<span class="hljs-comment"># Add fields to schema​</span>
​
<span class="hljs-comment"># Use a built-in analyzer​</span>
analyzer_params_built_in = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title_en`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_built_in,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Configure a custom analyzer​</span>
analyzer_params_custom = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-comment"># Built-in filter​</span>
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>​
        },​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]​
        }​
    ]​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_custom,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Add vector field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​
<span class="hljs-comment"># Add primary field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
​
<span class="hljs-comment"># Set up index params for vector field​</span>
index_params = client.prepare_index_params()​
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)​
​
<span class="hljs-comment"># Create collection with defined schema​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​
<button class="copy-code-btn"></button></code></pre>
<p>​</p>
