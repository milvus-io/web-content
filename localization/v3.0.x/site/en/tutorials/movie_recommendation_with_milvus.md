---
id: movie_recommendation_with_milvus.md
summary: >-
  In this notebook, we will explore how to generate embeddings of movie
  descriptions using OpenAI and leverage those embeddings within Milvus to
  recommend movies that match your preferences. To enhance our search results,
  we will utilize filtering to perform metadata searches. The dataset used in
  this example is sourced from HuggingFace datasets and contains over 8,000
  movie entries, providing a rich pool of options for movie recommendations.
title: Movie Recommendation with Milvus
---
<h1 id="Movie-Recommendation-with-Milvus" class="common-anchor-header">Movie Recommendation with Milvus<button data-href="#Movie-Recommendation-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/tutorials/quickstart/movie_recommendation_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/movie_recommendation_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>In this notebook, we will explore how to generate embeddings of movie descriptions using OpenAI and leverage those embeddings within Milvus to recommend movies that match your preferences. To enhance our search results, we will utilize filtering to perform metadata searches. The dataset used in this example is sourced from HuggingFace datasets and contains over 8,000 movie entries, providing a rich pool of options for movie recommendations.</p>
<h2 id="Dependencies-and-Environment" class="common-anchor-header">Dependencies and Environment<button data-href="#Dependencies-and-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>You can install the dependencies by running the following command:</p>
<pre><code translate="no" class="language-python">$ pip install openai pymilvus datasets tqdm
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If you are using Google Colab, to enable dependencies just installed, you may need to <strong>restart the runtime</strong> (click on the “Runtime” menu at the top of the screen, and select “Restart session” from the dropdown menu).</p>
<p>We will use OpenAI as the LLM in this example. You should prepare the <a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> as an environment variable.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-OpenAI-client-and-Milvus" class="common-anchor-header">Initialize OpenAI client and Milvus<button data-href="#Initialize-OpenAI-client-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Initialize the OpenAI client.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

openai_client = OpenAI()
<button class="copy-code-btn"></button></code></pre>
<p>Set the collection name and dimension for the embeddings.</p>
<pre><code translate="no" class="language-python">COLLECTION_NAME = <span class="hljs-string">&quot;movie_search&quot;</span>
DIMENSION = <span class="hljs-number">1536</span>

BATCH_SIZE = <span class="hljs-number">1000</span>
<button class="copy-code-btn"></button></code></pre>
<p>Connect to Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Database</span>
client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>As for the argument of <code translate="no">url</code> and <code translate="no">token</code>:</p>
<ul>
<li>Setting the <code translate="no">uri</code> as a local file, e.g.<code translate="no">./milvus.db</code>, is the most convenient method, as it automatically utilizes <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> to store all data in this file.</li>
<li>If you have large scale of data, say more than a million vectors, you can set up a more performant Milvus server on <a href="https://milvus.io/docs/quickstart.md">Docker or Kubernetes</a>. In this setup, please use the server address and port as your uri, e.g.<code translate="no">http://localhost:19530</code>. If you enable the authentication feature on Milvus, use “<your_username>:<your_password>” as the token, otherwise don’t set the token.</li>
<li>If you want to use <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, the fully managed cloud service for Milvus, adjust the <code translate="no">uri</code> and <code translate="no">token</code>, which correspond to the <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint and Api key</a> in Zilliz Cloud.</li>
</ul>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Remove collection if it already exists</span>
<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<p>Define the fields for the collection, which include the id, title, type, release year, rating, and description.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

<span class="hljs-comment"># Create collection which includes the id, title, and embedding.</span>

<span class="hljs-comment"># 1. Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># 2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">64000</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;type&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">64000</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;release_year&quot;</span>, datatype=DataType.INT64)
schema.add_field(field_name=<span class="hljs-string">&quot;rating&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">64000</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;description&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">64000</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)

<span class="hljs-comment"># 3. Create collection with the schema</span>
client.create_collection(collection_name=COLLECTION_NAME, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>Create the index on the collection and load it.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create the index on the collection and load it.</span>

<span class="hljs-comment"># 1. Prepare index parameters</span>
index_params = client.prepare_index_params()


<span class="hljs-comment"># 2. Add an index on the embedding field</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, params={}
)


<span class="hljs-comment"># 3. Create index</span>
client.create_index(collection_name=COLLECTION_NAME, index_params=index_params)


<span class="hljs-comment"># 4. Load collection</span>
client.load_collection(collection_name=COLLECTION_NAME, replica_number=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Dataset" class="common-anchor-header">Dataset<button data-href="#Dataset" class="anchor-icon" translate="no">
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
    </button></h2><p>With Milvus up and running we can begin grabbing our data. <code translate="no">Hugging Face Datasets</code> is a hub that holds many different user datasets, and for this example we are using HuggingLearners’s netflix-shows dataset. This dataset contains movies and their metadata pairs for over 8 thousand movies. We are going to embed each description and store it within Milvus along with its title, type, release_year and rating.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset

dataset = load_dataset(<span class="hljs-string">&quot;hugginglearners/netflix-shows&quot;</span>, split=<span class="hljs-string">&quot;train&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-the-Data" class="common-anchor-header">Insert the Data<button data-href="#Insert-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Now that we have our data on our machine we can begin embedding it and inserting it into Milvus. The embedding function takes in text and returns the embeddings in a list format.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_texts</span>(<span class="hljs-params">texts</span>):
    res = openai_client.embeddings.create(<span class="hljs-built_in">input</span>=texts, model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
    <span class="hljs-keyword">return</span> [res_data.embedding <span class="hljs-keyword">for</span> res_data <span class="hljs-keyword">in</span> res.data]
<button class="copy-code-btn"></button></code></pre>
<p>This next step does the actual inserting. We iterate through all the entries and create batches that we insert once we hit our set batch size. After the loop is over we insert the last remaning batch if it exists.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

<span class="hljs-comment"># batch (data to be inserted) is a list of dictionaries</span>
batch = []

<span class="hljs-comment"># Embed and insert in batches</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> tqdm(<span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(dataset))):
    batch.append(
        {
            <span class="hljs-string">&quot;title&quot;</span>: dataset[i][<span class="hljs-string">&quot;title&quot;</span>] <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;&quot;</span>,
            <span class="hljs-string">&quot;type&quot;</span>: dataset[i][<span class="hljs-string">&quot;type&quot;</span>] <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;&quot;</span>,
            <span class="hljs-string">&quot;release_year&quot;</span>: dataset[i][<span class="hljs-string">&quot;release_year&quot;</span>] <span class="hljs-keyword">or</span> -<span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: dataset[i][<span class="hljs-string">&quot;rating&quot;</span>] <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;&quot;</span>,
            <span class="hljs-string">&quot;description&quot;</span>: dataset[i][<span class="hljs-string">&quot;description&quot;</span>] <span class="hljs-keyword">or</span> <span class="hljs-string">&quot;&quot;</span>,
        }
    )

    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(batch) % BATCH_SIZE == <span class="hljs-number">0</span> <span class="hljs-keyword">or</span> i == <span class="hljs-built_in">len</span>(dataset) - <span class="hljs-number">1</span>:
        embeddings = emb_texts([item[<span class="hljs-string">&quot;description&quot;</span>] <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> batch])

        <span class="hljs-keyword">for</span> item, emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(batch, embeddings):
            item[<span class="hljs-string">&quot;embedding&quot;</span>] = emb

        client.insert(collection_name=COLLECTION_NAME, data=batch)
        batch = []
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-the-Database" class="common-anchor-header">Query the Database<button data-href="#Query-the-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>With our data safely inserted into Milvus, we can now perform a query. The query takes in a tuple of the movie description you are searching for and the filter to use. More info about the filter can be found <a href="https://milvus.io/docs/boolean.md">here</a>. The search first prints out your description and filter expression. After that for each result we print the score, title, type, release year, rating and description of the result movies.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap


<span class="hljs-keyword">def</span> <span class="hljs-title function_">query</span>(<span class="hljs-params">query, top_k=<span class="hljs-number">5</span></span>):
    text, expr = query

    res = client.search(
        collection_name=COLLECTION_NAME,
        data=emb_texts(text),
        <span class="hljs-built_in">filter</span>=expr,
        limit=top_k,
        output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;release_year&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>],
        search_params={
            <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
            <span class="hljs-string">&quot;params&quot;</span>: {},
        },
    )

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Description:&quot;</span>, text, <span class="hljs-string">&quot;Expression:&quot;</span>, expr)

    <span class="hljs-keyword">for</span> hit_group <span class="hljs-keyword">in</span> res:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Results:&quot;</span>)
        <span class="hljs-keyword">for</span> rank, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(hit_group, start=<span class="hljs-number">1</span>):
            entity = hit[<span class="hljs-string">&quot;entity&quot;</span>]

            <span class="hljs-built_in">print</span>(
                <span class="hljs-string">f&quot;\tRank: <span class="hljs-subst">{rank}</span> Score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]:}</span> Title: <span class="hljs-subst">{entity.get(<span class="hljs-string">&#x27;title&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>)}</span>&quot;</span>
            )
            <span class="hljs-built_in">print</span>(
                <span class="hljs-string">f&quot;\t\tType: <span class="hljs-subst">{entity.get(<span class="hljs-string">&#x27;type&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>)}</span> &quot;</span>
                <span class="hljs-string">f&quot;Release Year: <span class="hljs-subst">{entity.get(<span class="hljs-string">&#x27;release_year&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>)}</span> &quot;</span>
                <span class="hljs-string">f&quot;Rating: <span class="hljs-subst">{entity.get(<span class="hljs-string">&#x27;rating&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>)}</span>&quot;</span>
            )
            description = entity.get(<span class="hljs-string">&quot;description&quot;</span>, <span class="hljs-string">&quot;&quot;</span>)
            <span class="hljs-built_in">print</span>(textwrap.fill(description, width=<span class="hljs-number">88</span>))
            <span class="hljs-built_in">print</span>()


my_query = (<span class="hljs-string">&quot;movie about a fluffly animal&quot;</span>, <span class="hljs-string">&#x27;release_year &lt; 2019 and rating like &quot;PG%&quot;&#x27;</span>)

query(my_query)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Description: movie about a fluffly animal Expression: release_year &lt; 2019 and rating like &quot;PG%&quot;
Results:
    Rank: 1 Score: 0.42213767766952515 Title: The Adventures of Tintin
        Type: Movie Release Year: 2011 Rating: PG
This 3-D motion capture adapts Georges Remi's classic comic strip about the adventures
of fearless young journalist Tintin and his trusty dog, Snowy.

    Rank: 2 Score: 0.4041026830673218 Title: Hedgehogs
        Type: Movie Release Year: 2016 Rating: PG
When a hedgehog suffering from memory loss forgets his identity, he ends up on a big
city journey with a pigeon to save his habitat from a human threat.

    Rank: 3 Score: 0.3980264663696289 Title: Osmosis Jones
        Type: Movie Release Year: 2001 Rating: PG
Peter and Bobby Farrelly outdo themselves with this partially animated tale about an
out-of-shape 40-year-old man who's the host to various organisms.

    Rank: 4 Score: 0.39479154348373413 Title: The Lamb
        Type: Movie Release Year: 2017 Rating: PG
A big-dreaming donkey escapes his menial existence and befriends some free-spirited
animal pals in this imaginative retelling of the Nativity Story.

    Rank: 5 Score: 0.39370301365852356 Title: Open Season 2
        Type: Movie Release Year: 2008 Rating: PG
Elliot the buck and his forest-dwelling cohorts must rescue their dachshund pal from
some spoiled pets bent on returning him to domesticity.
</code></pre>
