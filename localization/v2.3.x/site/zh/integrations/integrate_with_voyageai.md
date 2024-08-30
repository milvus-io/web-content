---
id: integrate_with_voyageai.md
summary: This page discusses vector database integration with VoyageAI's embedding API.
title: Similarity Search with Milvus and VoyageAI
---
<h1 id="Similarity-Search-with-Milvus-and-VoyageAI" class="common-anchor-header">Similarity Search with Milvus and VoyageAI<button data-href="#Similarity-Search-with-Milvus-and-VoyageAI" class="anchor-icon" translate="no">
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
    </button></h1><p>This page discusses vector database integration with VoyageAI’s embedding API.</p>
<p>We’ll showcase how <a href="https://docs.voyageai.com/docs/embeddings">VoyageAI’s Embedding API</a> can be used with our vector database to search across book titles. Many existing book search solutions (such as those used by public libraries, for example) rely on keyword matching rather than a semantic understanding of what the title is actually about. Using a trained model to represent the input data is known as <em>semantic search</em>, and can be expanded to a variety of different text-based use cases, including anomaly detection and document search.</p>
<h2 id="Getting-started" class="common-anchor-header">Getting started<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
    </button></h2><p>The only prerequisite you’ll need here is an API key from the <a href="https://dash.voyageai.com/api-keys">VoyageAI website</a>. Be sure you have already <a href="https://milvus.io/docs/install_standalone-docker.md">started up a Milvus instance</a>.</p>
<p>We’ll also prepare the data that we’re going to use for this example. You can grab the book titles <a href="https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks">here</a>. Let’s create a function to load book titles from our CSV.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> csv
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> voyageai
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">Collection</span>, utility
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Extract the book titles</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">csv_load</span>(<span class="hljs-params">file</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file, newline=<span class="hljs-string">&#x27;&#x27;</span>) <span class="hljs-keyword">as</span> f:
        reader=csv.reader(f, delimiter=<span class="hljs-string">&#x27;,&#x27;</span>)
        <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> reader:
            <span class="hljs-keyword">yield</span> row[<span class="hljs-number">1</span>]
<button class="copy-code-btn"></button></code></pre>
<p>With this, we’re ready to move on to generating embeddings.</p>
<h2 id="Searching-book-titles-with-VoyageAI--Milvus" class="common-anchor-header">Searching book titles with VoyageAI &amp; Milvus<button data-href="#Searching-book-titles-with-VoyageAI--Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Here we can find the main parameters that need to be modified for running with your own accounts. Beside each is a description of what it is.</p>
<pre><code translate="no" class="language-python">FILE = <span class="hljs-string">&#x27;./content/books.csv&#x27;</span>  <span class="hljs-comment"># Download it from https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks and save it in the folder that holds your script.</span>
COLLECTION_NAME = <span class="hljs-string">&#x27;title_db&#x27;</span>  <span class="hljs-comment"># Collection name</span>
DIMENSION = <span class="hljs-number">1024</span>  <span class="hljs-comment"># Embeddings size</span>
COUNT = <span class="hljs-number">100</span>  <span class="hljs-comment"># How many titles to embed and insert.</span>
MILVUS_HOST = <span class="hljs-string">&#x27;localhost&#x27;</span>  <span class="hljs-comment"># Milvus server URI</span>
MILVUS_PORT = <span class="hljs-string">&#x27;19530&#x27;</span>
MODEL_NAME = <span class="hljs-string">&#x27;voyage-law-2&#x27;</span>  <span class="hljs-comment"># Which model to use, please check https://docs.voyageai.com/docs/embeddings for available models</span>
client = voyageai.Client(api_key=<span class="hljs-string">&quot;YOUR_VOYAGEAI_API_KEY&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Then we need to connect to Milvus vector database to store and search the vector embeddings. Within Milvus, we need to create a collection and set up the index. For more information on how to use Milvus, look <a href="https://milvus.io/docs/example_code.md">here</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect to Milvus</span>
connections.connect(host=MILVUS_HOST, port=MILVUS_PORT)

<span class="hljs-comment"># Remove collection if it already exists</span>
<span class="hljs-keyword">if</span> utility.has_collection(COLLECTION_NAME):
    utility.drop_collection(COLLECTION_NAME)

<span class="hljs-comment"># Create collection which includes the id, title, and embedding.</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&#x27;id&#x27;</span>, dtype=DataType.INT64, descrition=<span class="hljs-string">&#x27;Ids&#x27;</span>, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;title&#x27;</span>, dtype=DataType.VARCHAR, description=<span class="hljs-string">&#x27;Title texts&#x27;</span>, max_length=<span class="hljs-number">200</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;embedding&#x27;</span>, dtype=DataType.FLOAT_VECTOR, description=<span class="hljs-string">&#x27;Embedding vectors&#x27;</span>, dim=DIMENSION)
]
schema = CollectionSchema(fields=fields, description=<span class="hljs-string">&#x27;Title collection&#x27;</span>)
collection = Collection(name=COLLECTION_NAME, schema=schema)

<span class="hljs-comment"># Create an index for the collection.</span>
<span class="hljs-comment"># Create an index for the collection.</span>
index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;IVF_FLAT&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {<span class="hljs-string">&#x27;nlist&#x27;</span>: <span class="hljs-number">1024</span>}
}
collection.create_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Once we have the collection setup we need to start inserting our data. This is in three steps: reading the data, embedding the titles, and inserting into Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Extract embedding from text using VoyageAI</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed</span>(<span class="hljs-params">text</span>):
    response = client.embed(
        texts=[text],
        model=MODEL_NAME,
        truncation=<span class="hljs-literal">False</span>
    )
    <span class="hljs-keyword">return</span> response.embeddings[<span class="hljs-number">0</span>]


<span class="hljs-comment"># Insert each title and its embedding</span>
<span class="hljs-keyword">for</span> idx, text <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(random.sample(<span class="hljs-built_in">sorted</span>(csv_load(FILE)), k=COUNT)):  <span class="hljs-comment"># Load COUNT amount of random values from dataset</span>
    ins=[[idx], [text], [embed(text)]]  <span class="hljs-comment"># Insert the title id, the title text, and the title embedding vector</span>
    collection.insert(ins)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load the collection into memory for searching</span>
collection.load()

<span class="hljs-comment"># Search the database based on input text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>(<span class="hljs-params">text</span>):
    <span class="hljs-comment"># Search parameters for the index</span>
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>
    }

    results=collection.search(
        data=[embed(text)],  <span class="hljs-comment"># Embeded search value</span>
        anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,  <span class="hljs-comment"># Search across embeddings</span>
        param=search_params,
        limit=<span class="hljs-number">5</span>,  <span class="hljs-comment"># Limit to five results per search</span>
        output_fields=[<span class="hljs-string">&#x27;title&#x27;</span>]  <span class="hljs-comment"># Include title field in result</span>
    )

    ret=[]
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
        row=[]
        row.extend([hit.<span class="hljs-built_in">id</span>, hit.score, hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)])  <span class="hljs-comment"># Get the id, distance, and title for the results</span>
        ret.append(row)
    <span class="hljs-keyword">return</span> ret

search_terms=[<span class="hljs-string">&#x27;self-improvement&#x27;</span>, <span class="hljs-string">&#x27;landscape&#x27;</span>]

<span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> search_terms:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;Search term:&#x27;</span>, x)
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> search(x):
        <span class="hljs-built_in">print</span>(result)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>You should see the following as the output:</p>
<pre><code translate="no">Search term: self-improvement
[<span class="hljs-meta">39, 0.4663320779800415, <span class="hljs-string">&quot;Tomorrow&#x27;s Promise&quot;</span></span>]
[<span class="hljs-meta">1, 0.4680519700050354, <span class="hljs-string">&quot;A Writer&#x27;s Workbook: Daily Exercises for the Writing Life&quot;</span></span>]
[<span class="hljs-meta">45, 0.46855345368385315, &#x27;The Pragmatic Programmer: From Journeyman to Master&#x27;</span>]
[<span class="hljs-meta">70, 0.47063353657722473, &#x27;Saturday&#x27;</span>]
[<span class="hljs-meta">28, 0.4742085337638855, &#x27;Marvels&#x27;</span>]

Search term: landscape
[<span class="hljs-meta">70, 0.1867476850748062, &#x27;Saturday&#x27;</span>]
[<span class="hljs-meta">28, 0.38813990354537964, &#x27;Marvels&#x27;</span>]
[<span class="hljs-meta">11, 0.4200461506843567, &#x27;Henry V&#x27;</span>]
[<span class="hljs-meta">83, 0.4219294786453247, &#x27;Checkpoint&#x27;</span>]
[<span class="hljs-meta">19, 0.42225468158721924, &#x27;Beach Music&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
