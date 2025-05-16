---
id: partition_key.md
related_key: partition_key
summary: Learn how to use the partition key feature.
title: Partition Key
---
<h1 id="Partition-Key" class="common-anchor-header">Partition Key<button data-href="#Partition-Key" class="anchor-icon" translate="no">
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
    </button></h1><p>A partition key is a field that you can specify when creating a collection in Milvus, a new feature that enables faster and more efficient query filtering.</p>
<p>This feature enables Milvus to store entities into different partitions based on their key values. This way, you can group entities with the same key together and avoid scanning irrelevant partitions when filtering by the key field. Partition keys can greatly speed up query performance compared to traditional filtering methods.</p>
<h2 id="Prepare-data" class="common-anchor-header">Prepare data<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>To demonstrate the use of partition keys, we have prepared <a href="https://www.kaggle.com/datasets/nelgiriyewithana/mcdonalds-store-reviews">a dataset from Kaggle</a> containing the reviews of McDonald’s stores across the U.S., among all the fields of which, <code translate="no">store_address</code> will be designated as the partition key.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

df = pd.<span class="hljs-title function_">read_csv</span>(<span class="hljs-string">&#x27;McDonald_s_Reviews.csv&#x27;</span>, encoding=<span class="hljs-string">&quot;cp1252&quot;</span>)
df.<span class="hljs-title function_">to_json</span>(<span class="hljs-string">&#x27;McDonald_s_Reviews.json&#x27;</span>, orient=<span class="hljs-string">&#x27;records&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>The raw dataset is in a CSV file, and the above code changes it to a JSON file. Then, we use <strong>text2vec</strong> to convert the review text to corresponding vectors and save the vectors side by side with the review text in each record.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> text2vec <span class="hljs-keyword">import</span> SentenceModel

model = SentenceModel(<span class="hljs-string">&#x27;shibing624/text2vec-base-multilingual&#x27;</span>)
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;McDonald_s_Reviews.json&#x27;</span>, <span class="hljs-string">&#x27;r&#x27;</span>) <span class="hljs-keyword">as</span> f:
    data = json.load(f)
    
    reviews = [ x[<span class="hljs-string">&#x27;review&#x27;</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> data ]
    review_vectors = model.encode(reviews)

    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(data)):
        data[i][<span class="hljs-string">&#x27;vector&#x27;</span>] = review_vectors[i].tolist()

<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;McDonald_s_Reviews.json&#x27;</span>, <span class="hljs-string">&#x27;w&#x27;</span>) <span class="hljs-keyword">as</span> f:
    json.dump(data, f)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-Collection" class="common-anchor-header">Create Collection<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Once the dataset is ready, we can set up a collection by connecting to Milvus and designing its schema.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType, utility

connections.connect(host=<span class="hljs-string">&#x27;localhost&#x27;</span>, port=<span class="hljs-string">&#x27;19530&#x27;</span>)

<span class="hljs-comment"># reviewer_id,store_name,category,store_address,latitude ,longitude,rating_count,review_time,review,rating</span>

fields = [
    FieldSchema(name=<span class="hljs-string">&#x27;reviewer_id&#x27;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;&quot;</span>, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;store_address&#x27;</span>, dtype=DataType.VARCHAR, description=<span class="hljs-string">&quot;&quot;</span>, max_length=<span class="hljs-number">512</span>, is_partition_key=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;review&#x27;</span>, dtype=DataType.VARCHAR, description=<span class="hljs-string">&quot;&quot;</span>, max_length=<span class="hljs-number">16384</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;vector&#x27;</span>, dtype=DataType.FLOAT_VECTOR, description=<span class="hljs-string">&quot;&quot;</span>, dim=<span class="hljs-number">384</span>, is_index=<span class="hljs-literal">True</span>),
]

schema = CollectionSchema(
    fields=fields, 
    description=<span class="hljs-string">&quot;&quot;</span>, 
    enable_dynamic_field=<span class="hljs-literal">True</span>, 
    <span class="hljs-comment"># The following is an alternative to setting `is_partition_key` in a field schema.</span>
    partition_key_field=<span class="hljs-string">&quot;store_address&quot;</span>
)

collection = Collection(
    name=<span class="hljs-string">&#x27;McDonald_s_Reviews&#x27;</span>,
    schema=schema,
    <span class="hljs-comment"># The number partitions to create are 64 by default. Set it to a proper value that you see fit.</span>
    num_partitions=<span class="hljs-number">100</span>
)

collection.create_index(
    field_name=<span class="hljs-string">&#x27;vector&#x27;</span>, 
    index_params={
        <span class="hljs-comment"># Use your favorite metric type</span>
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
        <span class="hljs-comment"># Use your favirote index type</span>
        <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>, 
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>}
    }, 
    name=<span class="hljs-string">&#x27;vector_idx&#x27;</span>
)
collection.load()

utility.list_collections()

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># [&#x27;McDonald_s_Reviews&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<p>If the above code snippets output the name of the collection, it is ready to accept data from the prepared dataset.</p>
<p>Before that, there are several things you should know more about:</p>
<ul>
<li><p>Enable partition key</p>
<ul>
<li>Use the <code translate="no">is_partition_key</code> setting on a specific field.</li>
<li>Alternatively, specify the <code translate="no">partition_key_field</code> in the collection schema.</li>
</ul></li>
<li><p>Set the number of partitions</p>
<ul>
<li>The <code translate="no">CollectionSchema</code> object has a <code translate="no">num_partitions</code> argument. This determines how many partitions will be created in the collection.</li>
<li>When you set this alongside an enabled partition key, the system creates the specified number of partitions during collection creation. Once set, you cannot modify (add or delete) these partitions.</li>
<li>By default, <code translate="no">num_partitions</code> is set to <code translate="no">64</code>, but you can adjust this according to your needs.</li>
</ul></li>
<li><p>Milvus’s data distribution strategy</p>
<ul>
<li><p>Every entity inserted into Milvus gets hashed. The partition that will store this entity is determined based on its hash value.</p></li>
<li><p>If a search request includes boolean expressions related to the partition key, Milvus will hash that specific partition key to filter and identify the relevant partition. This narrows down the search scope, making searches faster and more efficient.</p></li>
</ul></li>
</ul>
<p>For other possible options for <code translate="no">metric_type</code> and <code translate="no">index_type</code>, please refer to <a href="/docs/v2.3.x/metric.md">Similarity Metrics</a>, <a href="/docs/v2.3.x/index.md">In-memory Index</a> and <a href="/docs/v2.3.x/disk_index.md">On-disk Index</a>.</p>
<h2 id="Insert-Data" class="common-anchor-header">Insert Data<button data-href="#Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>We now need to read the prepared JSON file into memory and insert it directly into the collection as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;McDonald_s_Reviews.json&#x27;</span>, <span class="hljs-string">&#x27;r&#x27;</span>) <span class="hljs-keyword">as</span> f:
    data = json.load(f)
    collection.insert(data)

<span class="hljs-built_in">print</span>(collection.num_entities)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># 33396</span>
<button class="copy-code-btn"></button></code></pre>
<p>Then you can check the number of inserted entities using <code translate="no">collection.num_entities</code>. In this example, the dataset contains over 33000 entities.</p>
<h2 id="Conduct-an-ANN-Search" class="common-anchor-header">Conduct an ANN Search<button data-href="#Conduct-an-ANN-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>To conduct an ANN search using the partition key, you should include either of the following in the boolean expression of the search request:</p>
<ul>
<li><code translate="no">expr='&lt;partition_key&gt;==&quot;xxxx&quot;'</code></li>
<li><code translate="no">expr='&lt;partition_key&gt; in [&quot;xxx&quot;, &quot;xxx&quot;]'</code></li>
</ul>
<p>Do replace <code translate="no">&lt;partition_key&gt;</code> with the name of the field that is designated as the partition key.</p>
<pre><code translate="no" class="language-python">result = collection.search(
    [data[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;vector&#x27;</span>]], 
    anns_field=<span class="hljs-string">&#x27;vector&#x27;</span>, 
    param={<span class="hljs-string">&#x27;nprobe&#x27;</span>: <span class="hljs-number">16</span>}, 
    limit=<span class="hljs-number">10</span>, 
    expr=<span class="hljs-string">f&quot;store_address==&#x27;<span class="hljs-subst">{data[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;store_address&#x27;</span>]}</span>&#x27;&quot;</span>, 
    output_fields=[<span class="hljs-string">&#x27;store_address&#x27;</span>, <span class="hljs-string">&#x27;review&#x27;</span>, <span class="hljs-string">&#x27;rating&#x27;</span>]
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> result:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># id: 1, distance: 0.0, entity: {&#x27;store_address&#x27;: &#x27;13749 US-183 Hwy, Austin, TX 78750, United States&#x27;, &#x27;review&#x27;: &#x27;Why does it look like someone spit on my food?\nI had a normal transaction,  everyone was chill and polite, but now i dont want to eat this. Im trying not to think about what this milky white/clear substance is all over my food, i d*** sure am not coming back.&#x27;, &#x27;rating&#x27;: &#x27;1 star&#x27;}</span>
<span class="hljs-comment"># id: 252, distance: 7.134920597076416, entity: {&#x27;store_address&#x27;: &#x27;13749 US-183 Hwy, Austin, TX 78750, United States&#x27;, &#x27;review&#x27;: &quot;this place has been smelling like a ports potty blew up inside. it&#x27;s really nasty. food was cold and dry. this location doesn&#x27;t seem to care.&quot;, &#x27;rating&#x27;: &#x27;1 star&#x27;}</span>
<span class="hljs-comment"># id: 92, distance: 7.347218990325928, entity: {&#x27;store_address&#x27;: &#x27;13749 US-183 Hwy, Austin, TX 78750, United States&#x27;, &#x27;review&#x27;: &quot;Worst experience! All I asked for was a regular size coffee.I get to the window and was handed a small , I asked the woman if that was a regular to which she rudely said yes I questioned her again two more times then I asked her how many sizes of coffee they had she said small medium and large I asked her which one was the one I was holding and she said it&#x27;s a small that&#x27;s what we charged you for she said, and I told her I asked for a regular which would be a medium but I just drove off. Also asked for 3 splendas and 4 creamers on the side and received 3 regular sugars and 2 creamers. To top it off, coffee was full of coffee grounds to the point I was spitting them out. And as a little plus there was a piece of plastic! Never again!&quot;, &#x27;rating&#x27;: &#x27;1 star&#x27;}</span>
<span class="hljs-comment"># id: 49, distance: 7.584774971008301, entity: {&#x27;store_address&#x27;: &#x27;13749 US-183 Hwy, Austin, TX 78750, United States&#x27;, &#x27;review&#x27;: &#x27;Horrible service worker with a stank attitude for no reason working at the window mute with an attitude mad because she is miserable at work . They mess up the order and then. Found a long hair in my daughters happy meal fries and then the extra fry was missing from her meal and t&#x27;, &#x27;rating&#x27;: &#x27;1 star&#x27;}</span>
<span class="hljs-comment"># id: 190, distance: 7.619668960571289, entity: {&#x27;store_address&#x27;: &#x27;13749 US-183 Hwy, Austin, TX 78750, United States&#x27;, &#x27;review&#x27;: &quot;THESE PEOPLE.. SO I ORDERED A HAPPY MEAL. MEANS YOU GET THE BOX  NOT A BAG. THEY ALWAYS GIVE ME THE BAGS. SO ONE DAY I SAW 4 ROWS OF BOXES. ASKED THEM FOR THE BOX AND THE PEOPLE MAGICALLY COULDN&#x27;T TALK. I CALLED CORPORATE. THE MANGER WRITES ME AN EMAIL SAYING THEY RAN OUT.\nREALLY?? RALLY??? IF I COULD GIVE THIS PLACE NEGATIVE ZERO STARS I WOULD.&quot;, &#x27;rating&#x27;: &#x27;1 star&#x27;}</span>
<span class="hljs-comment"># id: 434, distance: 7.650599479675293, entity: {&#x27;store_address&#x27;: &#x27;13749 US-183 Hwy, Austin, TX 78750, United States&#x27;, &#x27;review&#x27;: &#x27;Fresh food. Surprisingly. ï¿½ï¿½ï¿&#x27;, &#x27;rating&#x27;: &#x27;4 stars&#x27;}</span>
<span class="hljs-comment"># id: 125, distance: 7.705323696136475, entity: {&#x27;store_address&#x27;: &#x27;13749 US-183 Hwy, Austin, TX 78750, United States&#x27;, &#x27;review&#x27;: &#x27;Asked me to wait at spot one. Asked for jelly and was completely ignored. Had to go inside to get it myself. Trash customer service. I blame management for not holding anyone accountable.&#x27;, &#x27;rating&#x27;: &#x27;1 star&#x27;}</span>
<span class="hljs-comment"># id: 97, distance: 7.997112274169922, entity: {&#x27;store_address&#x27;: &#x27;13749 US-183 Hwy, Austin, TX 78750, United States&#x27;, &#x27;review&#x27;: &#x27;When ordering food the employees conveniently forgot to turn off their microphones and were talking mess about all the food we had ordered, this is very unprofessional and honestly uncalled for. When I asked for a receipt they said it was in the bad and it was convenient not in there hold of management to speak ab&#x27;, &#x27;rating&#x27;: &#x27;1 star&#x27;}</span>
<span class="hljs-comment"># id: 22, distance: 8.07274341583252, entity: {&#x27;store_address&#x27;: &#x27;13749 US-183 Hwy, Austin, TX 78750, United States&#x27;, &#x27;review&#x27;: &quot;Meh.. just meh. When I finally get the correct order, it is generally tasty. I&#x27;m a picky eater, and have found ways to navigate the menu to get items I like. Worked in the service industry for years as a server, bartender, and trainer. Taking and fulfilling orders is NOT hard, tedious at times though. I only go here when I see they are not busy, in hope that my order is correct when I go to leave. In the 10 times that I have been here in the past past year, I have only had 1 order that was perfectly correct. Just ONE, not an exaggeration. That one order was just 2 large fries and nothing else. Though I will mention that when I got home and pulled them out of the bag, they were hardly what you&#x27;d call filled, (nor did I enjoy any on the 3 minute drive home) so little so that I even sent a picture and post to McDonald&#x27;s on Facebook, at least the few were hot. The evening staff is very pleasant, but the morning staff leaves a lot to be desired, as well as thinking that they can talk negatively about people in Spanish out in the open which, being a light skinned Puerto Rican, I understand perfectly. I have submitted several complaints and NEVER received a call or email back. I just don&#x27;t go here anymore to avoid the stress of paying money for something that is most likely wrong.&quot;, &#x27;rating&#x27;: &#x27;1 star&#x27;}</span>
<span class="hljs-comment"># id: 174, distance: 8.10897445678711, entity: {&#x27;store_address&#x27;: &#x27;13749 US-183 Hwy, Austin, TX 78750, United States&#x27;, &#x27;review&#x27;: &#x27;Why is it everytime going to a McDonalds  they get ur order wrong?\nNot once\nBut all the Fxxxing time excuse my french\nThen on top they dont like u cause u ask for special request\nWhat is the point of wanting something to eat if u cannt have like u want it\nI guess we all forgatten who really we are working for\nThe customer&#x27;, &#x27;rating&#x27;: &#x27;1 star&#x27;}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Partition-key-based-Multi-tenancy" class="common-anchor-header">Partition-key-based Multi-tenancy<button data-href="#Partition-key-based-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>You can use the partition key feature to achieve multi-tenancy with better search performance.</p>
<p>To do this, you can assign a tenant-specific value as the partition key field for each entity. Then, when you search or query the collection, you can include the partition key field in the boolean expression to filter entities by the tenant-specific value. This way, you can isolate data by tenants and avoid scanning unnecessary partitions.</p>
<p>To learn more about multi-tenancy strategies, read <a href="/docs/v2.3.x/multi_tenancy.md">Multi-tenancy</a> for details.</p>
