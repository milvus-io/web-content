---
id: integrate_with_airbyte.md
summary: >-
  Airbyte is an open-source data movement infrastructure for building extract
  and load (EL) data pipelines. It is designed for versatility, scalability, and
  ease of use. Airbyte’s connector catalog comes “out-of-the-box” with over 350
  pre-built connectors. These connectors can be used to start replicating data
  from a source to a destination in just a few minutes.
title: 'Airbyte: Open-Source Data Movement Infrastructure'
---
<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">Airbyte: Open-Source Data Movement Infrastructure<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Airbyte is an open-source data movement infrastructure for building extract and load (EL) data pipelines. It is designed for versatility, scalability, and ease of use. Airbyte’s connector catalog comes “out-of-the-box” with over 350 pre-built connectors. These connectors can be used to start replicating data from a source to a destination in just a few minutes.</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">Major Components of Airbyte<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1. Connector Catalog</h3><ul>
<li><strong>350+ Pre-Built Connectors</strong>: Airbyte’s connector catalog comes “out-of-the-box” with over 350 pre-built connectors. These connectors can be used to start replicating data from a source to a destination in just a few minutes.</li>
<li><strong>No-Code Connector Builder</strong>: You can easily extend Airbyte’s functionality to support your custom use cases through tools <a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">like the No-Code Connector Builder</a>.</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2. The Platform</h3><p>Airbyte’s platform provides all the horizontal services required to configure and scale data movement operations, available as <a href="https://airbyte.com/product/airbyte-cloud">cloud-managed</a> or <a href="https://airbyte.com/product/airbyte-enterprise">self-managed</a>.</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3. The User Interface</h3><p>Airbyte features a UI, <a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">PyAirbyte</a> (Python library), <a href="https://docs.airbyte.com/api-documentation">API</a>, and <a href="https://docs.airbyte.com/terraform-documentation">Terraform Provider</a> to integrate with your preferred tooling and approach to infrastructure management.</p>
<p>With the ability of Airbyte, users can integrate data sources into Milvus cluster for similarity search.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">Before You Begin<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>You will need:</p>
<ul>
<li>Zendesk account (or another data source you want to sync data from)</li>
<li>Airbyte account or local instance</li>
<li>OpenAI API key</li>
<li>Milvus cluster</li>
<li>Python 3.10 installed locally</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">Set Up Milvus Cluster<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>If you have already deployed a K8s cluster for production, you can skip this step and proceed directly to <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">deploy Milvus Operator</a>. If not, you can follow <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">the steps</a> to deploy a Milvus cluster with Milvus Operator.</p>
<p>Individual entities (in our case, support tickets and knowledge base articles) are stored in a “collection” — after your cluster is set up, you need to create a collection. Choose a suitable name and set the Dimension to 1536 to match the vector dimensionality generated by the OpenAI embeddings service.</p>
<p>After creation, record the endpoint and <a href="https://milvus.io/docs/authenticate.md?tab=docker">authentication</a> info.</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">Set Up Connection in Airbyte<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>Our database is ready, let’s move some data over! To do this, we need to configure a connection in Airbyte. Either sign up for an Airbyte cloud account at <a href="https://cloud.airbyte.com">cloud.airbyte.com</a> or fire up a local instance as described <a href="https://docs.airbyte.com/using-airbyte/getting-started/">in the documentation</a>.</p>
<h3 id="Set-Up-Source" class="common-anchor-header">Set Up Source</h3><p>Once your instance is running, we need to set up the connection — click “New connection” and pick the “Zendesk Support” connector as the source. After clicking the “Test and Save” button, Airbyte will check whether the connection can be established.</p>
<p>On Airbyte cloud, you can easily authenticate by clicking the Authenticate button. When using a local Airbyte instance, follow the directions outlined on the <a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">documentation</a> page.</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">Set Up Destination</h3><p>If everything is working correctly, the next step is to set up the destination to move data to. Here, pick the “Milvus” connector.</p>
<p>The Milvus connector does three things:</p>
<ul>
<li><strong>Chunking and Formatting</strong> - Split Zendesk records into text and metadata. If the text is larger than the specified chunk size, records are split up into multiple parts that are loaded into the collection individually. The splitting of text (or chunking) can, for example, happen in the case of large support tickets or knowledge articles. By splitting up the text, you can ensure that searches always yield useful results.</li>
</ul>
<p>Let’s go with a chunk size of 1000 tokens and text fields of body, title, description, and subject, as these will be present in the data we will receive from Zendesk.</p>
<ul>
<li><strong>Embedding</strong> - Using Machine Learning models transforms the text chunks produced by the processing part into vector embeddings that you can then search for semantic similarity. To create the embeddings, you must supply the OpenAI API key. Airbyte will send each chunk to OpenAI and add the resulting vector to the entities loaded into your Milvus cluster.</li>
<li><strong>Indexing</strong> - Once you have vectorized the chunks, you can load them into the database. To do so, insert the information you got when setting up your cluster and collection in Milvus cluster. <div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_1.png" width="40%"/></div> Clicking “Test and save” will check whether everything is lined up correctly (valid credentials, collection exists and has the same vector dimensionality as the configured embedding, etc.)</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">Set up stream sync flow</h3><p>The last step before data is ready to flow is selecting which “streams” to sync. A stream is a collection of records in the source. As Zendesk supports a large number of streams that are not relevant to our use case, let’s only select “tickets” and “articles” and disable all others to save bandwidth and make sure only the relevant information will show up in searches:<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_2.png" width="40%"/></div> You can select which fields to extract from the source by clicking the stream name. The “Incremental | Append + Deduped” sync mode means that subsequent connection runs keep Zendesk and Milvus in sync while transferring minimal data (only the articles and tickets that have changed since the last run).</p>
<p>As soon as the connection is set up, Airbyte will start syncing data. It can take a few minutes to appear in your Milvus collection.</p>
<p>If you select a replication frequency, Airbyte will run regularly to keep your Milvus collection up to date with changes to Zendesk articles and newly created issues.</p>
<h3 id="Check-flow" class="common-anchor-header">Check flow</h3><p>You can check in the Milvus cluster UI how the data is structured in the collection by navigating to the playground and executing a “Query Data” query with a filter set to “_ab_stream == \”tickets\””.<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_3.png" width="40%"/></div> As you can see in the Result view, each record coming from Zendesk is stored as separate entities in Milvus with all the specified metadata. The text chunk the embedding is based on is shown as the “text” property — this is the text that got embedded using OpenAI and will be what we will search on.</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">Build Streamlit app querying the collection<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Our data is ready — now we need to build the application to use it. In this case, the application will be a simple support form for users to submit support cases. When the user hits submit, we will do two things:</p>
<ul>
<li>Search for similar tickets submitted by users of the same organization</li>
<li>Search for knowledge-based articles that might be relevant to the user</li>
</ul>
<p>In both cases, we will leverage semantic search using OpenAI embeddings. To do this, the description of the problem the user entered is also embedded and used to retrieve similar entities from the Milvus cluster. If there are relevant results, they are shown below the form.</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">Set up UI environment</h3><p>You will need a local Python installation as we will use Streamlit to implement the application.</p>
<p>First, install Streamlit, the Milvus client library, and the OpenAI client library locally:</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>To render a basic support form, create a python file <code translate="no">basic_support_form.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>To run your application, use Streamlit run:</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>This will render a basic form:<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_4.png" width="40%"/></div>The code for this example can also be found on <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHub</a>.</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">Set up backend query service</h3><p>Next, let’s check for existing open tickets that might be relevant. To do this, we embed the text the user entered using OpenAI, then did a similarity search on our collection, filtering for still open tickets. If there is one with a very low distance between the supplied ticket and the existing ticket, let the user know and don’t submit:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">import</span> openai


<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem?&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-keyword">import</span> os
        <span class="hljs-keyword">import</span> pymilvus
        <span class="hljs-keyword">import</span> openai

        org_id = <span class="hljs-number">360033549136</span> <span class="hljs-comment"># TODO Load from customer login data</span>

        pymilvus.connections.connect(uri=os.environ[<span class="hljs-string">&quot;MILVUS_URL&quot;</span>], token=os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>])
        collection = pymilvus.Collection(<span class="hljs-string">&quot;zendesk&quot;</span>)

        embedding = openai.Embedding.create(<span class="hljs-built_in">input</span>=text_val, model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;embedding&#x27;</span>]

        results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">2</span>, output_fields=[<span class="hljs-string">&quot;_id&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>], expr=<span class="hljs-string">f&#x27;status == &quot;new&quot; and organization_id == <span class="hljs-subst">{org_id}</span>&#x27;</span>)

        st.write(results[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> results[<span class="hljs-number">0</span>].distances[<span class="hljs-number">0</span>] &lt; <span class="hljs-number">0.35</span>:
            matching_ticket = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>].entity
            st.write(<span class="hljs-string">f&quot;This case seems very similar to <span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;subject&#x27;</span>)}</span> (id #<span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;_id&#x27;</span>)}</span>). Make sure it has not been submitted before&quot;</span>)
        <span class="hljs-keyword">else</span>:
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            
<button class="copy-code-btn"></button></code></pre>
<p>Several things are happening here:</p>
<ul>
<li>The connection to the Milvus cluster is set up.</li>
<li>The OpenAI service is used to generate an embedding of the description the user entered.</li>
<li>A similarity search is performed, filtering results by the ticket status and the organization id (as only open tickets of the same organization are relevant).</li>
<li>If there are results and the distance between the embedding vectors of the existing ticket and the newly entered text is below a certain threshold, call out this fact.</li>
</ul>
<p>To run the new app, you need to set the environment variables for OpenAI and Milvus first:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_TOKEN</span>=...
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_URL</span>=<span class="hljs-attr">https</span>:<span class="hljs-comment">//...</span>
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">OPENAI_API_KEY</span>=sk-...

streamlit run app.<span class="hljs-property">py</span>
<button class="copy-code-btn"></button></code></pre>
<p>When trying to submit a ticket that exists already, this is how the result will look:<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_5.png" width="40%"/></div> The code for this example can also be found on <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub</a>.</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">Show more relevant information</h3><p>As you can see in the green debug output hidden in the final version, two tickets matched our search (in status new, from the current organization, and close to the embedding vector). However, the first (relevant) ranked higher than the second (irrelevant in this situation), which is reflected in the lower distance value. This relationship is captured in the embedding vectors without directly matching words, like in a regular full-text search.</p>
<p>To wrap it up, let’s show helpful information after the ticket gets submitted to give the user as much relevant information upfront as possible.</p>
<p>To do this, we are going to do a second search after the ticket gets submitted to fetch the top-matching knowledge base articles:</p>
<pre><code translate="no" class="language-python">   ......
   
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># TODO Actually send out the ticket</span>
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            article_results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">5</span>, output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;html_url&quot;</span>], expr=<span class="hljs-string">f&#x27;_ab_stream == &quot;articles&quot;&#x27;</span>)
            st.write(article_results[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(article_results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span>:
                st.write(<span class="hljs-string">&quot;We also found some articles that might help you:&quot;</span>)
                <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> article_results[<span class="hljs-number">0</span>]:
                    <span class="hljs-keyword">if</span> hit.distance &lt; <span class="hljs-number">0.362</span>:
                        st.write(<span class="hljs-string">f&quot;* [<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)}</span>](<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;html_url&#x27;</span>)}</span>)&quot;</span>)

<button class="copy-code-btn"></button></code></pre>
<p>If there is no open support ticket with a high similarity score, the new ticket gets submitted and relevant knowledge articles are shown below:<div><img translate="no" src="/docs/v2.4.x/assets/airbyte_with_milvus_6.png" width="40%"/></div> The code for this example can also be found on <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github</a>.</p>
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
    </button></h2><p>While the UI shown here is not an actual support form but an example to illustrate the use case, the combination of Airbyte and Milvus is a very powerful one — it makes it easy to load text from a wide variety of sources (from databases like Postgres over APIs like Zendesk or GitHub over to completely custom sources built using Airbyte’s SDK or visual connector builder) and index it in embedded form in Milvus, a powerful vector search engine being able to scale to huge amounts of data.</p>
<p>Airbyte and Milvus are open source and completely free to use on your infrastructure, with cloud offerings to offload operations if desired.</p>
<p>Beyond the classical semantic search use case illustrated in this article, the general setup can also be used to build a question-answering chat bot using the RAG method (Retrieval Augmented Generation), recommender systems, or help make advertising more relevant and efficient.</p>
