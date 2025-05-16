---
id: integrate_with_llama.md
summary: >-
  This page goes over how to search for the best answer to questions using
  Milvus as the Vector Database and LlamaIndex as the embedding system.
title: ''
---
<h1 id="Documentation-QA-using-LlamaIndex-and-Milvus" class="common-anchor-header">Documentation QA using LlamaIndex and Milvus<button data-href="#Documentation-QA-using-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>With ChatGPT taking the headlines, many companies are wondering how they can take advantage of it for their current products. One big use case that stands out is improving the tedious and limited search functionality of product documentation. Currently, if a user wants to figure out how to use a product, they must comb through all the document pages hoping to come up with an answer. What if we could replace this tedious process with ChatGPT? What if ChatGPT could summarize all the info that is needed and answer any questions that a user might have?  This is where LlamaIndex and Milvus come in.</p>
<p>LlamaIndex and Milvus work together to ingest and retrieve relevant info. LlamaIndex begins by taking in all the different documents you may have and embedding them using OpenAI. Once we have the embeddings we can push them into Milvus along with any relevant text and metadata. When a user wants to ask a question, LlamaIndex will search through Milvus for the closest answers and use ChatGPT to summarize those answers.</p>
<p>For this example, the documentation that we are going to be searching through is the documentation found on the Milvus <a href="/docs/v2.2.x/milvus.io/docs">website</a>.</p>
<p>Let’s get started.</p>
<h2 id="Installing-requirements" class="common-anchor-header">Installing requirements<button data-href="#Installing-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>For this example, we are going to be using <code translate="no">pymilvus</code> to connect to use Milvus and <code translate="no">llama-index</code> to handle the data manipulation and pipelining. This example will also require having an OpenAI API key for embedding generation.</p>
<pre><code translate="no" class="language-shell">pip install pymilvus llama-index
<button class="copy-code-btn"></button></code></pre>
<h2 id="Grabbing-the-data" class="common-anchor-header">Grabbing the data<button data-href="#Grabbing-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>We are going to use <code translate="no">git</code> to pull the Milvus website data. A majority of the documents come in the form of markdown files.</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/milvus-docs
<button class="copy-code-btn"></button></code></pre>
<h2 id="Global-parameters" class="common-anchor-header">Global parameters<button data-href="#Global-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Here, we can find the main arguments that need to be modified for running with your own accounts. Beside each is a description of what it is.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> os <span class="hljs-keyword">import</span> environ

HOST = <span class="hljs-string">&quot;localhost&quot;</span>
PORT = <span class="hljs-string">&quot;19530&quot;</span> 

environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-******&quot;</span> <span class="hljs-comment"># OpenAI API Key</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Consuming-the-knowledge" class="common-anchor-header">Consuming the knowledge<button data-href="#Consuming-the-knowledge" class="anchor-icon" translate="no">
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
    </button></h2><p>Once we have our data on the system, we can proceed to consume it using LlamaIndex and upload it to Milvus. This comes in the form of 2 steps. We begin by loading a markdown reader from <a href="https://llamahub.ai">Llama Hub</a> and converting all our markdowns into documents.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index <span class="hljs-keyword">import</span> download_loader
<span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

<span class="hljs-comment"># Load the markdown reader from the hub</span>
MarkdownReader = download_loader(<span class="hljs-string">&quot;MarkdownReader&quot;</span>)
markdownreader = MarkdownReader()

<span class="hljs-comment"># Grab all markdown files and convert them using the reader</span>
docs = []
<span class="hljs-keyword">for</span> file <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;./milvus-docs/site/en/**/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    docs.extend(markdownreader.load_data(file=file))
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">len</span>(docs))
<button class="copy-code-btn"></button></code></pre>
<p>Once we have our documents formed, we can proceed to push them through into Milvus. This step requires the configs for both Milvus and OpenAI.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index <span class="hljs-keyword">import</span> GPTMilvusIndex

<span class="hljs-comment"># Push all markdown files into Zilliz Cloud</span>
index = GPTMilvusIndex.from_documents(docs, host=HOST, port=PORT, overwrite=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Asking-a-question" class="common-anchor-header">Asking a question<button data-href="#Asking-a-question" class="anchor-icon" translate="no">
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
    </button></h2><p>With our documents loaded into Zilliz Cloud, we can begin asking questions. The questions will be searched against the knowledge base and any relevant documents will be used to generate an answer.</p>
<pre><code translate="no" class="language-python">s = index.query(<span class="hljs-string">&quot;What is a collection?&quot;</span>)
<span class="hljs-built_in">print</span>(s)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># A collection in Milvus is a logical grouping of entities, similar to a table in a relational database management system (RDBMS). It is used to store and manage entities.</span>
<button class="copy-code-btn"></button></code></pre>
<p>We are also able to save our connection information and reload it using <code translate="no">save_to_dict()</code> and <code translate="no">load_from_dict()</code>.</p>
<pre><code translate="no" class="language-python">saved = index.save_to_dict()
<span class="hljs-keyword">del</span> index

index = GPTMilvusIndex.load_from_dict(saved, overwrite = <span class="hljs-literal">False</span>)
s = index.query(<span class="hljs-string">&quot;What communication protocol is used in Pymilvus for commicating with Milvus?&quot;</span>)
<span class="hljs-built_in">print</span>(s)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># The communication protocol used in Pymilvus for communicating with Milvus is gRPC.</span>
<button class="copy-code-btn"></button></code></pre>
