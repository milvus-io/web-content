---
id: video_search_with_twelvelabs_and_milvus.md
summary: >-
  Learn how to create a semantic video search application by integrating Twelve
  Labs' Embed API for generating multimodal embeddings with Milvus. It covers
  the entire process from setting up the development environment to implementing
  advanced features like hybrid search and temporal video analysis, providing a
  comprehensive foundation for building sophisticated video content analysis and
  retrieval systems.
title: >-
  Advanced Video Search: Leveraging Twelve Labs and Milvus for Semantic
  Retrieval
---
<h1 id="Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="common-anchor-header">Advanced Video Search: Leveraging Twelve Labs and Milvus for Semantic Retrieval<button data-href="#Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction" class="common-anchor-header">Introduction<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Welcome to this comprehensive tutorial on implementing semantic video search using <a href="https://docs.twelvelabs.io/docs/create-embeddings">Twelve Labs Embed API</a> and Milvus. In this guide, we’ll explore how to harness the power of <a href="https://www.twelvelabs.io/blog/multimodal-embeddings">Twelve Labs’ advanced multimodal embeddings</a> and <a href="https://milvus.io/intro">Milvus’ efficient vector database</a> to create a robust video search solution. By integrating these technologies, developers can unlock new possibilities in video content analysis, enabling applications such as content-based video retrieval, recommendation systems, and sophisticated search engines that understand the nuances of video data.</p>
<p>This tutorial will walk you through the entire process, from setting up your development environment to implementing a functional semantic video search application. We’ll cover key concepts such as generating multimodal embeddings from videos, storing them efficiently in Milvus, and performing similarity searches to retrieve relevant content. Whether you’re building a video analytics platform, a content discovery tool, or enhancing your existing applications with video search capabilities, this guide will provide you with the knowledge and practical steps to leverage the combined strengths of Twelve Labs and Milvus in your projects.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Before we begin, ensure you have the following:</p>
<p>A Twelve Labs API key (sign up at https://api.twelvelabs.io if you don’t have one)
Python 3.7 or later installed on your system</p>
<h2 id="Setting-Up-the-Development-Environment" class="common-anchor-header">Setting Up the Development Environment<button data-href="#Setting-Up-the-Development-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Create a new directory for your project and navigate to it:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> video-search-tutorial
<span class="hljs-built_in">cd</span> video-search-tutorial
<button class="copy-code-btn"></button></code></pre>
<p>Set up a virtual environment (optional but recommended):</p>
<pre><code translate="no" class="language-shell">python -m venv venv
<span class="hljs-built_in">source</span> venv/bin/activate  <span class="hljs-comment"># On Windows, use `venv\Scripts\activate`</span>
<button class="copy-code-btn"></button></code></pre>
<p>Install the required Python libraries:</p>
<pre><code translate="no" class="language-shell">pip install twelvelabs pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>Create a new Python file for your project:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">touch</span> video_search.py
<button class="copy-code-btn"></button></code></pre>
<p>This video_search.py file will be the main script we use for the tutorial. Next, set up your Twelve Labs API key as an environment variable for security:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">TWELVE_LABS_API_KEY</span>=<span class="hljs-string">&#x27;your_api_key_here&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-Milvus" class="common-anchor-header">Connecting to Milvus<button data-href="#Connecting-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>To establish a connection with Milvus, we’ll use the MilvusClient class. This approach simplifies the connection process and allows us to work with a local file-based Milvus instance, which is perfect for our tutorial.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Initialize the Milvus client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_twelvelabs_demo.db&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Successfully connected to Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>This code creates a new Milvus client instance that will store all data in a file named milvus_twelvelabs_demo.db. This file-based approach is ideal for development and testing purposes.</p>
<h2 id="Creating-a-Milvus-Collection-for-Video-Embeddings" class="common-anchor-header">Creating a Milvus Collection for Video Embeddings<button data-href="#Creating-a-Milvus-Collection-for-Video-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Now that we’re connected to Milvus, let’s create a collection to store our video embeddings and associated metadata. We’ll define the collection schema and create the collection if it doesn’t already exist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the collection name</span>
collection_name = <span class="hljs-string">&quot;twelvelabs_demo_collection&quot;</span>

<span class="hljs-comment"># Check if the collection already exists and drop it if it does</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=collection_name):
    milvus_client.drop_collection(collection_name=collection_name)

<span class="hljs-comment"># Create the collection</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">1024</span>  <span class="hljs-comment"># The dimension of the Twelve Labs embeddings</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; created successfully&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>In this code, we first check if the collection already exists and drop it if it does. This ensures we start with a clean slate. We create the collection with a dimension of 1024, which matches the output dimension of Twelve Labs’ embeddings.</p>
<h2 id="Generating-Embeddings-with-Twelve-Labs-Embed-API" class="common-anchor-header">Generating Embeddings with Twelve Labs Embed API<button data-href="#Generating-Embeddings-with-Twelve-Labs-Embed-API" class="anchor-icon" translate="no">
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
    </button></h2><p>To generate embeddings for our videos using the Twelve Labs Embed API, we’ll use the Twelve Labs Python SDK. This process involves creating an embedding task, waiting for its completion, and retrieving the results. Here’s how to implement this:</p>
<p>First, ensure you have the Twelve Labs SDK installed and import the necessary modules:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> twelvelabs <span class="hljs-keyword">import</span> TwelveLabs
<span class="hljs-keyword">from</span> twelvelabs.models.embed <span class="hljs-keyword">import</span> EmbeddingsTask
<span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Retrieve the API key from environment variables</span>
TWELVE_LABS_API_KEY = os.getenv(<span class="hljs-string">&#x27;TWELVE_LABS_API_KEY&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-the-Twelve-Labs-client" class="common-anchor-header">Initialize the Twelve Labs client:<button data-href="#Initialize-the-Twelve-Labs-client" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">twelvelabs_client = TwelveLabs(api_key=TWELVE_LABS_API_KEY)
<button class="copy-code-btn"></button></code></pre>
<p>Create a function to generate embeddings for a given video URL:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_embedding</span>(<span class="hljs-params">video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Generate embeddings for a given video URL using the Twelve Labs API.

    This function creates an embedding task for the specified video URL using
    the Marengo-retrieval-2.6 engine. It monitors the task progress and waits
    for completion. Once done, it retrieves the task result and extracts the
    embeddings along with their associated metadata.

    Args:
        video_url (str): The URL of the video to generate embeddings for.

    Returns:
        tuple: A tuple containing two elements:
            1. list: A list of dictionaries, where each dictionary contains:
                - &#x27;embedding&#x27;: The embedding vector as a list of floats.
                - &#x27;start_offset_sec&#x27;: The start time of the segment in seconds.
                - &#x27;end_offset_sec&#x27;: The end time of the segment in seconds.
                - &#x27;embedding_scope&#x27;: The scope of the embedding (e.g., &#x27;shot&#x27;, &#x27;scene&#x27;).
            2. EmbeddingsTaskResult: The complete task result object from Twelve Labs API.

    Raises:
        Any exceptions raised by the Twelve Labs API during task creation,
        execution, or retrieval.
    &quot;&quot;&quot;</span>

    <span class="hljs-comment"># Create an embedding task</span>
    task = twelvelabs_client.embed.task.create(
        engine_name=<span class="hljs-string">&quot;Marengo-retrieval-2.6&quot;</span>,
        video_url=video_url
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Created task: id=<span class="hljs-subst">{task.<span class="hljs-built_in">id</span>}</span> engine_name=<span class="hljs-subst">{task.engine_name}</span> status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Define a callback function to monitor task progress</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">on_task_update</span>(<span class="hljs-params">task: EmbeddingsTask</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Wait for the task to complete</span>
    status = task.wait_for_done(
        sleep_interval=<span class="hljs-number">2</span>,
        callback=on_task_update
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding done: <span class="hljs-subst">{status}</span>&quot;</span>)

    <span class="hljs-comment"># Retrieve the task result</span>
    task_result = twelvelabs_client.embed.task.retrieve(task.<span class="hljs-built_in">id</span>)

    <span class="hljs-comment"># Extract and return the embeddings</span>
    embeddings = []
    <span class="hljs-keyword">for</span> v <span class="hljs-keyword">in</span> task_result.video_embeddings:
        embeddings.append({
            <span class="hljs-string">&#x27;embedding&#x27;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&#x27;start_offset_sec&#x27;</span>: v.start_offset_sec,
            <span class="hljs-string">&#x27;end_offset_sec&#x27;</span>: v.end_offset_sec,
            <span class="hljs-string">&#x27;embedding_scope&#x27;</span>: v.embedding_scope
        })
    
    <span class="hljs-keyword">return</span> embeddings, task_result
<button class="copy-code-btn"></button></code></pre>
<p>Use the function to generate embeddings for your videos:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example usage</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Generate embeddings for the video</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Generated <span class="hljs-subst">{<span class="hljs-built_in">len</span>(embeddings)}</span> embeddings for the video&quot;</span>)
<span class="hljs-keyword">for</span> i, emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embeddings):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Scope: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding_scope&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time range: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Embedding vector (first 5 values): <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding&#x27;</span>][:<span class="hljs-number">5</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>This implementation allows you to generate embeddings for any video URL using the Twelve Labs Embed API. The generate_embedding function handles the entire process, from creating the task to retrieving the results. It returns a list of dictionaries, each containing an embedding vector along with its metadata (time range and scope).Remember to handle potential errors, such as network issues or API limits, in a production environment. You might also want to implement retries or more robust error handling depending on your specific use case.</p>
<h2 id="Inserting-Embeddings-into-Milvus" class="common-anchor-header">Inserting Embeddings into Milvus<button data-href="#Inserting-Embeddings-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>After generating embeddings using the Twelve Labs Embed API, the next step is to insert these embeddings along with their metadata into our Milvus collection. This process allows us to store and index our video embeddings for efficient similarity search later.</p>
<p>Here’s how to insert the embeddings into Milvus:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_embeddings</span>(<span class="hljs-params">milvus_client, collection_name, task_result, video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Insert embeddings into the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to insert into.
        task_result (EmbeddingsTaskResult): The task result containing video embeddings.
        video_url (str): The URL of the video associated with the embeddings.

    Returns:
        MutationResult: The result of the insert operation.

    This function takes the video embeddings from the task result and inserts them
    into the specified Milvus collection. Each embedding is stored with additional
    metadata including its scope, start and end times, and the associated video URL.
    &quot;&quot;&quot;</span>
    data = []

    <span class="hljs-keyword">for</span> i, v <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(task_result.video_embeddings):
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: i,
            <span class="hljs-string">&quot;vector&quot;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&quot;embedding_scope&quot;</span>: v.embedding_scope,
            <span class="hljs-string">&quot;start_offset_sec&quot;</span>: v.start_offset_sec,
            <span class="hljs-string">&quot;end_offset_sec&quot;</span>: v.end_offset_sec,
            <span class="hljs-string">&quot;video_url&quot;</span>: video_url
        })

    insert_result = milvus_client.insert(collection_name=collection_name, data=data)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(data)}</span> embeddings into Milvus&quot;</span>)
    <span class="hljs-keyword">return</span> insert_result

<span class="hljs-comment"># Usage example</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Assuming this function exists from previous step</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-comment"># Insert embeddings into the Milvus collection</span>
insert_result = insert_embeddings(milvus_client, collection_name, task_result, video_url)
<span class="hljs-built_in">print</span>(insert_result)
<button class="copy-code-btn"></button></code></pre>
<p>This function prepares the data for insertion, including all relevant metadata such as the embedding vector, time range, and the source video URL. It then uses the Milvus client to insert this data into the specified collection.</p>
<h2 id="Performing-Similarity-Search" class="common-anchor-header">Performing Similarity Search<button data-href="#Performing-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Once we have our embeddings stored in Milvus, we can perform similarity searches to find the most relevant video segments based on a query vector. Here’s how to implement this functionality:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">perform_similarity_search</span>(<span class="hljs-params">milvus_client, collection_name, query_vector, limit=<span class="hljs-number">5</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Perform a similarity search on the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to search in.
        query_vector (list): The query vector to search for similar embeddings.
        limit (int, optional): The maximum number of results to return. Defaults to 5.

    Returns:
        list: A list of search results, where each result is a dictionary containing
              the matched entity&#x27;s metadata and similarity score.

    This function searches the specified Milvus collection for embeddings similar to
    the given query vector. It returns the top matching results, including metadata
    such as the embedding scope, time range, and associated video URL for each match.
    &quot;&quot;&quot;</span>
    search_results = milvus_client.search(
        collection_name=collection_name,
        data=[query_vector],
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;embedding_scope&quot;</span>, <span class="hljs-string">&quot;start_offset_sec&quot;</span>, <span class="hljs-string">&quot;end_offset_sec&quot;</span>, <span class="hljs-string">&quot;video_url&quot;</span>]
    )

    <span class="hljs-keyword">return</span> search_results
    
<span class="hljs-comment"># define the query vector</span>
<span class="hljs-comment"># We use the embedding inserted previously as an example. In practice, you can replace it with any video embedding you want to query.</span>
query_vector = task_result.video_embeddings[<span class="hljs-number">0</span>].embedding.<span class="hljs-built_in">float</span>

<span class="hljs-comment"># Perform a similarity search on the Milvus collection</span>
search_results = perform_similarity_search(milvus_client, collection_name, query_vector)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search Results:&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(search_results[<span class="hljs-number">0</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Result <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Video URL: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;video_url&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time Range: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Similarity Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>This implementation does the following:</p>
<ol>
<li>Defines a function perform_similarity_search that takes a query vector and searches for similar embeddings in the Milvus collection.</li>
<li>Uses the Milvus client’s search method to find the most similar vectors.</li>
<li>Specifies the output fields we want to retrieve, including metadata about the matching video segments.</li>
<li>Provides an example of how to use this function with a query video, first generating its embedding and then using it to search.</li>
<li>Prints the search results, including relevant metadata and similarity scores.</li>
</ol>
<p>By implementing these functions, you’ve created a complete workflow for storing video embeddings in Milvus and performing similarity searches. This setup allows for efficient retrieval of similar video content based on the multimodal embeddings generated by Twelve Labs’ Embed API.</p>
<h2 id="Optimizing-Performance" class="common-anchor-header">Optimizing Performance<button data-href="#Optimizing-Performance" class="anchor-icon" translate="no">
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
    </button></h2><p>Alright, let’s take this app to the next level! When dealing with large-scale video collections, <strong>performance is key</strong>. To optimize, we should implement <a href="https://milvus.io/docs/v2.3.x/bulk_insert.md">batch processing for embedding generation and insertion into Milvus</a>. This way, we can handle multiple videos simultaneously, significantly reducing overall processing time. Additionally, we could leverage <a href="https://milvus.io/docs/v2.2.x/partition_key.md">Milvus’ partitioning feature</a> to organize our data more efficiently, perhaps by video categories or time periods. This would speed up queries by allowing us to search only relevant partitions.</p>
<p>Another optimization trick is to <strong>use caching mechanisms for frequently accessed embeddings or search results</strong>. This could dramatically improve response times for popular queries. Don’t forget to <a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">fine-tune Milvus’ index parameters</a> based on your specific dataset and query patterns - a little tweaking here can go a long way in boosting search performance.</p>
<h2 id="Advanced-Features" class="common-anchor-header">Advanced Features<button data-href="#Advanced-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Now, let’s add some cool features to make our app stand out! We could implement <strong>a hybrid search that combines text and video queries</strong>. As a matter of fact, <a href="https://docs.twelvelabs.io/docs/create-text-embeddings">Twelve Labs Embed API can also generate text embeddings for your text queries</a>. Imagine allowing users to input both a text description and a sample video clip - we’d generate embeddings for both and perform a weighted search in Milvus. This would give us super precise results.</p>
<p>Another awesome addition would be <strong>temporal search within videos</strong>. <a href="https://docs.twelvelabs.io/docs/create-video-embeddings#customize-your-embeddings">We could break down long videos into smaller segments, each with its own embedding</a>. This way, users could find specific moments within videos, not just entire clips. And hey, why not throw in some basic video analytics? We could use the embeddings to cluster similar video segments, detect trends, or even identify outliers in large video collections.</p>
<h2 id="Error-Handling-and-Logging" class="common-anchor-header">Error Handling and Logging<button data-href="#Error-Handling-and-Logging" class="anchor-icon" translate="no">
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
    </button></h2><p>Let’s face it, things can go wrong, and when they do, we need to be prepared. <strong>Implementing robust error handling is crucial</strong>. We should <a href="https://softwareengineering.stackexchange.com/questions/64180/good-use-of-try-catch-blocks">wrap our API calls and database operations in try-except blocks</a>, providing informative error messages to users when something fails. For network-related issues, <a href="https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-retries-exponential-backoff">implementing retries with exponential backoff</a> can help handle temporary glitches gracefully.</p>
<p><strong>As for logging, it’s our best friend for debugging and monitoring</strong>. We should use <a href="https://blog.sentry.io/logging-in-python-a-developers-guide/">Python’s logging module</a> to track important events, errors, and performance metrics throughout our application. Let’s set up different log levels - DEBUG for development, INFO for general operation, and ERROR for critical issues. And don’t forget to implement log rotation to manage file sizes. With proper logging in place, we’ll be able to quickly identify and resolve issues, ensuring our video search app runs smoothly even as it scales up.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusion<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Congratulations! You’ve now built a powerful semantic video search application using Twelve Labs’ Embed API and Milvus. This integration allows you to process, store, and retrieve video content with unprecedented accuracy and efficiency. By leveraging multimodal embeddings, you’ve created a system that understands the nuances of video data, opening up exciting possibilities for content discovery, recommendation systems, and advanced video analytics.</p>
<p>As you continue to develop and refine your application, remember that the combination of Twelve Labs’ advanced embedding generation and Milvus’ scalable vector storage provides a robust foundation for tackling even more complex video understanding challenges. We encourage you to experiment with the advanced features discussed and push the boundaries of what’s possible in video search and analysis.</p>
