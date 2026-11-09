---
id: best-practices-for-array-of-structs.md
title: Data Model Design with an Array of StructsCompatible with Milvus 2.6.4+
summary: >-
  Las aplicaciones modernas de IA, especialmente en el Internet de las cosas
  (IoT) y la conducción autónoma, suelen procesar eventos ricos y estructurados:
  una lectura de un sensor con su marca de tiempo y su vector de incrustación,
  un registro de diagnóstico con un código de error y un fragmento de audio, o
  un segmento de trayecto con la ubicación, la velocidad y el contexto de la
  escena. Esto requiere que la base de datos admita de forma nativa la ingesta y
  la búsqueda de datos anidados.
beta: Milvus 2.6.4+
---
<h1 id="Data-Model-Design-with-an-Array-of-Structs" class="common-anchor-header">Data Model Design with an Array of Structs<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Data-Model-Design-with-an-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h1><p>Modern AI applications, especially in the Internet of Things (IoT) and autonomous driving, typically reason over rich, structured events: a sensor reading with its timestamp and vector embedding, a diagnostic log with an error code and audio snippet, or a trip segment with location, speed, and scene context. These require the database to natively support the ingestion and search of nested data.</p>
<p>Instead of asking the user to convert their atomic structural events into flat data models, Milvus introduces the Array of Structs, where each Struct in the array can hold scalars and vectors, preserving semantic integrity.</p>
<h2 id="Why-Array-of-Structs" class="common-anchor-header">Why Array of Structs<button data-href="#Why-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h2><p>Modern AI applications, from autonomous driving to multimodal retrieval, increasingly rely on nested, heterogeneous data. Traditional flat data models struggle to represent complex relationships like "<strong>one document with many annotated chunks</strong>" or "<strong>one driving scene with multiple observed maneuvers</strong>". This is where the Array of Structs data type in Milvus shines.</p>
<p>An Array of Structs allows you to store an ordered set of structured elements, where each Struct contains its own combination of scalar fields and vector embeddings. This makes it ideal for:</p>
<ul>
<li><p><strong>Hierarchical data</strong>: Parent entities with multiple child records, such as a book with many text chunks, or a video with many annotated frames.</p></li>
<li><p><strong>Multimodal embeddings</strong>: Each Struct can hold multiple vectors, such as text embedding plus image embedding, alongside metadata.</p></li>
<li><p><strong>Temporal or sequential data</strong>: Structs in an Array field naturally represent time-series or step-by-step events.</p></li>
</ul>
<p>Unlike traditional workarounds that store JSON blobs or split data across multiple collections, the Array of Structs provides native schema enforcement, vector indexing, and efficient storage within Milvus.</p>
<h2 id="Schema-design-guidelines" class="common-anchor-header">Schema design guidelines<button data-href="#Schema-design-guidelines" class="anchor-icon" translate="no">
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
    </button></h2><p>In addition to all the guidelines discussed in <a href="/docs/es/schema-hands-on.md">Data Model Design for Search</a>, you should also consider the following things before starting to use an Array of Structs in your data model design.</p>
<h3 id="Define-the-Struct-schema" class="common-anchor-header">Define the Struct schema<button data-href="#Define-the-Struct-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Before adding the Array field to your collection, define the inner Struct schema. Each field in the struct must be explicitly typed, scalar (<strong>VARCHAR</strong>, <strong>INT</strong>, <strong>BOOLEAN</strong>, etc.) or vector (<strong>FLOAT_VECTOR</strong>).</p>
<p>You are advised to keep the Struct schema lean by only including fields you’ll use for retrieval or display. Avoid bloating with unused metadata.</p>
<h3 id="Set-the-max-capacity-thoughtfully" class="common-anchor-header">Set the max capacity thoughtfully<button data-href="#Set-the-max-capacity-thoughtfully" class="anchor-icon" translate="no">
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
    </button></h3><p>Each Array field has an attribute that specifies the maximum number of elements the Array field can hold for each entity. Set this based on your use case’s upper bound. For example, there are 1,000 text chunks per document, or 100 maneuvers per driving scene.</p>
<p>An excessively high value wastes memory, and you’ll need to do some calculations to determine the maximum number of Structs in the Array field.</p>
<h3 id="Index-vector-fields-in-Structs" class="common-anchor-header">Index vector fields in Structs<button data-href="#Index-vector-fields-in-Structs" class="anchor-icon" translate="no">
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
    </button></h3><p>Indexing is mandatory for vector fields, including both the vector fields in a collection and those defined in a Struct. For vector fields in a Struct, you should use <code translate="no">AUTOINDEX</code> or <code translate="no">HNSW</code> as the index type and <code translate="no">MAX_SIM</code> series as the metric type.</p>
<p>For details on all applicable limits, refer to <a href="/docs/es/structarray-limits.md">the limits</a>.</p>
<h2 id="A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="common-anchor-header">A real-world example: Modeling the CoVLA dataset for autonomous driving<button data-href="#A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="anchor-icon" translate="no">
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
    </button></h2><p>The Comprehensive Vision-Language-Action (CoVLA) dataset, introduced by <a href="https://tur.ing/posts/s1QUA1uh">Turing Motors</a> and accepted at the Winter Conference on Applications of Computer Vision (WACV) 2025, provides a rich foundation for training and evaluating Vision-Language-Action (VLA) models in autonomous driving. Each data point, which is usually a video clip, contains not just raw visual input but also structured captions describing:</p>
<ul>
<li><p>The <strong>ego vehicle’s behaviors</strong> (e.g., “Merge left while yielding to oncoming traffic”),</p></li>
<li><p>The <strong>detected objects</strong> present (e.g., leading vehicles, pedestrians, traffic lights), and</p></li>
<li><p>A frame-level <strong>caption</strong> of the scene.</p></li>
</ul>
<p>This hierarchical, multi-modal nature makes it an ideal candidate for the Array of Structs feature. For details on the CoVLA dataset, refer to the <a href="https://turingmotors.github.io/covla-ad/">CoVLA Dataset Website</a>.</p>
<h3 id="Step-1-Map-the-dataset-into-a-collection-schema" class="common-anchor-header">Step 1: Map the dataset into a collection schema<button data-href="#Step-1-Map-the-dataset-into-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>The CoVLA dataset is a large-scale, multimodal driving dataset comprising 10,000 video clips, totaling over 80 hours of footage. It samples frames at a rate of 20Hz and annotates each frame with detailed natural language captions along with information on vehicle states and the coordinates of detected objects.</p>
<p>The dataset structure is as follows:</p>
<pre><code translate="no" class="language-plaintext">├── video_1                                       (VIDEO) # video.mp4
│   ├── video_id                                  (INT)
│   ├── video_url                                 (STRING)
│   ├── frames                                    (ARRAY)
│   │   ├── frame_1                               (STRUCT)
│   │   │   ├── caption                           (STRUCT) # captions.jsonl
│   │   │   │   ├── plain_caption                 (STRING)
│   │   │   │   ├── rich_caption                  (STRING)
│   │   │   │   ├── risk                          (STRING)
│   │   │   │   ├── risk_correct                  (BOOL)
│   │   │   │   ├── risk_yes_rate                 (FLOAT)
│   │   │   │   ├── weather                       (STRING)
│   │   │   │   ├── weather_rate                  (FLOAT)
│   │   │   │   ├── road                          (STRING)
│   │   │   │   ├── road_rate                     (FLOAT)
│   │   │   │   ├── is_tunnel                     (BOOL)
│   │   │   │   ├── is_tunnel_yes_rate            (FLOAT)
│   │   │   │   ├── is_highway                    (BOOL)
│   │   │   │   ├── is_highway_yes_rate           (FLOAT)
│   │   │   │   ├── has_pedestrain                (BOOL)
│   │   │   │   ├── has_pedestrain_yes_rate       (FLOAT)
│   │   │   │   ├── has_carrier_car               (BOOL)
│   │   │   ├── traffic_light                     (STRUCT) # traffic_lights.jsonl
│   │   │   │   ├── index                         (INT)
│   │   │   │   ├── class                         (STRING)
│   │   │   │   ├── bbox                          (LIST&lt;FLOAT&gt;)
│   │   │   ├── front_car                         (STRUCT) # front_cars.jsonl
│   │   │   │   ├── has_lead                      (BOOL)
│   │   │   │   ├── lead_prob                     (FLOAT)
│   │   │   │   ├── lead_x                        (FLOAT)
│   │   │   │   ├── lead_y                        (FLOAT)
│   │   │   │   ├── lead_speed_kmh                (FLOAT)
│   │   │   │   ├── lead_a                        (FLOAT)
│   │   ├── frame_2                               (STRUCT)
│   │   ├── ...                                   (STRUCT)
│   │   ├── frame_n                               (STRUCT)
├── video_2
├── ...
├── video_n
<button class="copy-code-btn"></button></code></pre>
<p>You can find that the structure of the CoVLA dataset is highly hierarchical, dividing the collected data into multiple <code translate="no">.jsonl</code> files, along with the video clips in the <code translate="no">.mp4</code> format.</p>
<p>In Milvus, you can use either a JSON field or an Array-of-Structs field to create nested structures within a collection schema. When vector embeddings are part of the nested format, only an Array-of-Structs field is supported. However, a Struct inside an Array cannot itself contain further nested structures. To store the CoVLA dataset while retaining essential relationships, you need to remove unnecessary hierarchy and flatten the data so it fits the Milvus collection schema.</p>
<p>The diagram below illustrates how we can model this dataset using the schema illustrated in the following schema:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/dataset-model.png" alt="Dataset Model" class="doc-image" id="dataset-model" />
    <span>Dataset Model</span>
  </span>
</p>
<p>The above diagram illustrates the structure of a video clip, which comprises the following fields:</p>
<ul>
<li><p><code translate="no">video_id</code> serves as the primary key and stores the video identifier as a <code translate="no">VARCHAR</code> value.</p></li>
<li><p><code translate="no">states</code> is a raw JSON body that contains the state of the ego vehicle in each frame of the current video.</p></li>
<li><p><code translate="no">captions</code> is an Array of Structs with each Struct having the following fields:</p>
<ul>
<li><p><code translate="no">frame_id</code> identifies a specific frame within the current video.</p></li>
<li><p><code translate="no">plain_caption</code> is a description of the current frame without the ambient environment, such as weather, road condition, etc., and <code translate="no">plain_cap_vector</code> is its corresponding vector embeddings.</p></li>
<li><p><code translate="no">rich_caption</code> is a description of the current frame with the ambient environment, and <code translate="no">rich_cap_vector</code> is its corresponding vector embeddings.</p></li>
<li><p><code translate="no">risk</code> is a description of the risk that the ego vehicle faces in the current frame, and <code translate="no">risk_vector</code> is its corresponding vector embeddings, and</p></li>
<li><p>All the other attributes of the frame, such as <code translate="no">road</code>, <code translate="no">weather</code>, <code translate="no">is_tunnel</code>, <code translate="no">has_pedestrain</code>, etc…</p></li>
</ul></li>
<li><p><code translate="no">traffic_lights</code> is a JSON body that contains all the traffic light signals identified in the current frame.</p></li>
<li><p><code translate="no">front_cars</code> is also an Array of Structs that contains all the leading cars identified in the current frame.</p></li>
</ul>
<h3 id="Step-2-Initialize-the-schemas" class="common-anchor-header">Step 2: Initialize the schemas<button data-href="#Step-2-Initialize-the-schemas" class="anchor-icon" translate="no">
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
    </button></h3><p>To start, we need to initialize the schema for a caption Struct, a front_cars Struct, and the collection.</p>
<p>Initialize the schema for the Caption Struct.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

<span class="hljs-comment"># create the schema for the caption struct</span>
schema_for_caption = client.create_struct_field_schema()

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;frame_id&quot;</span>,
    datatype=DataType.INT64,
    description=<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1024</span>,
    description=<span class="hljs-string">&quot;plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1024</span>,
    description=<span class="hljs-string">&quot;rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1024</span>,
    description=<span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_correct&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether the risk assessment is correct&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_yes_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of risk being present&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;weather&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">50</span>,
    description=<span class="hljs-string">&quot;weather condition&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;weather_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the weather condition&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;road&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">50</span>,
    description=<span class="hljs-string">&quot;road type&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;road_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the road type&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;is_tunnel&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether the road is a tunnel&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the road being a tunnel&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;is_highway&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether the road is a highway&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the road being a highway&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;has_pedestrian&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether there is a pedestrian present&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of pedestrian presence&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;has_carrier_car&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether there is a carrier car present&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonArray;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// create the schema for the caption struct</span>
CreateCollectionReq.<span class="hljs-type">StructFieldSchema</span> <span class="hljs-variable">schemaForCaption</span> <span class="hljs-operator">=</span> CreateCollectionReq.StructFieldSchema.builder()
        .name(<span class="hljs-string">&quot;captions&quot;</span>)
        .description(<span class="hljs-string">&quot;captions for the current video&quot;</span>)
        .maxCapacity(<span class="hljs-number">600</span>)
        .fields(Arrays.asList(
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;frame_id&quot;</span>).dataType(DataType.Int64)
                        .description(<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;plain_caption&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">1024</span>)
                        .description(<span class="hljs-string">&quot;plain description of the ego vehicle&#x27;s behaviors&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;plain_cap_vector&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">768</span>)
                        .description(<span class="hljs-string">&quot;vectors for the plain description of the ego vehicle&#x27;s behaviors&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;rich_caption&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">1024</span>)
                        .description(<span class="hljs-string">&quot;rich description of the ego vehicle&#x27;s behaviors&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;rich_cap_vector&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">768</span>)
                        .description(<span class="hljs-string">&quot;vectors for the rich description of the ego vehicle&#x27;s behaviors&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;risk&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">1024</span>)
                        .description(<span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;risk_vector&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">768</span>)
                        .description(<span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;risk_correct&quot;</span>).dataType(DataType.Bool)
                        .description(<span class="hljs-string">&quot;whether the risk assessment is correct&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;risk_yes_rate&quot;</span>).dataType(DataType.Float)
                        .description(<span class="hljs-string">&quot;probability/confidence of risk being present&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;weather&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">50</span>)
                        .description(<span class="hljs-string">&quot;weather condition&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;weather_rate&quot;</span>).dataType(DataType.Float)
                        .description(<span class="hljs-string">&quot;probability/confidence of the weather condition&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;road&quot;</span>).dataType(DataType.VarChar).maxLength(<span class="hljs-number">50</span>)
                        .description(<span class="hljs-string">&quot;road type&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;road_rate&quot;</span>).dataType(DataType.Float)
                        .description(<span class="hljs-string">&quot;probability/confidence of the road type&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;is_tunnel&quot;</span>).dataType(DataType.Bool)
                        .description(<span class="hljs-string">&quot;whether the road is a tunnel&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>).dataType(DataType.Float)
                        .description(<span class="hljs-string">&quot;probability/confidence of the road being a tunnel&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;is_highway&quot;</span>).dataType(DataType.Bool)
                        .description(<span class="hljs-string">&quot;whether the road is a highway&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>).dataType(DataType.Float)
                        .description(<span class="hljs-string">&quot;probability/confidence of the road being a highway&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;has_pedestrian&quot;</span>).dataType(DataType.Bool)
                        .description(<span class="hljs-string">&quot;whether there is a pedestrian present&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>).dataType(DataType.Float)
                        .description(<span class="hljs-string">&quot;probability/confidence of pedestrian presence&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;has_carrier_car&quot;</span>).dataType(DataType.Bool)
                        .description(<span class="hljs-string">&quot;whether there is a carrier car present&quot;</span>).build()
        ))
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>
    <span class="hljs-string">&quot;encoding/json&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-comment">// create the schema for the caption struct</span>
captionSchema := entity.NewStructSchema().
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;frame_id&quot;</span>).WithDataType(entity.FieldTypeInt64).
        WithDescription(<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;plain_caption&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1024</span>).
        WithDescription(<span class="hljs-string">&quot;plain description of the ego vehicle&#x27;s behaviors&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;plain_cap_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">768</span>).
        WithDescription(<span class="hljs-string">&quot;vectors for the plain description of the ego vehicle&#x27;s behaviors&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;rich_caption&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1024</span>).
        WithDescription(<span class="hljs-string">&quot;rich description of the ego vehicle&#x27;s behaviors&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;rich_cap_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">768</span>).
        WithDescription(<span class="hljs-string">&quot;vectors for the rich description of the ego vehicle&#x27;s behaviors&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;risk&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1024</span>).
        WithDescription(<span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;risk_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">768</span>).
        WithDescription(<span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;risk_correct&quot;</span>).WithDataType(entity.FieldTypeBool).
        WithDescription(<span class="hljs-string">&quot;whether the risk assessment is correct&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;risk_yes_rate&quot;</span>).WithDataType(entity.FieldTypeFloat).
        WithDescription(<span class="hljs-string">&quot;probability/confidence of risk being present&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;weather&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">50</span>).
        WithDescription(<span class="hljs-string">&quot;weather condition&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;weather_rate&quot;</span>).WithDataType(entity.FieldTypeFloat).
        WithDescription(<span class="hljs-string">&quot;probability/confidence of the weather condition&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;road&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">50</span>).
        WithDescription(<span class="hljs-string">&quot;road type&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;road_rate&quot;</span>).WithDataType(entity.FieldTypeFloat).
        WithDescription(<span class="hljs-string">&quot;probability/confidence of the road type&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;is_tunnel&quot;</span>).WithDataType(entity.FieldTypeBool).
        WithDescription(<span class="hljs-string">&quot;whether the road is a tunnel&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>).WithDataType(entity.FieldTypeFloat).
        WithDescription(<span class="hljs-string">&quot;probability/confidence of the road being a tunnel&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;is_highway&quot;</span>).WithDataType(entity.FieldTypeBool).
        WithDescription(<span class="hljs-string">&quot;whether the road is a highway&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>).WithDataType(entity.FieldTypeFloat).
        WithDescription(<span class="hljs-string">&quot;probability/confidence of the road being a highway&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;has_pedestrian&quot;</span>).WithDataType(entity.FieldTypeBool).
        WithDescription(<span class="hljs-string">&quot;whether there is a pedestrian present&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>).WithDataType(entity.FieldTypeFloat).
        WithDescription(<span class="hljs-string">&quot;probability/confidence of pedestrian presence&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;has_carrier_car&quot;</span>).WithDataType(entity.FieldTypeBool).
        WithDescription(<span class="hljs-string">&quot;whether there is a carrier car present&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json;

    <span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
    <span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

    <span class="hljs-comment">// create the schema for the caption struct</span>
    <span class="hljs-keyword">let</span> <span class="hljs-variable">caption_schema</span> = StructFieldSchema::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;captions&quot;</span>)
        .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;captions for the current video&quot;</span>)
        .<span class="hljs-title function_ invoke__">max_capacity</span>(<span class="hljs-number">600</span>)
        .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;frame_id&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;plain_caption&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">1024</span>)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;plain description of the ego vehicle&#x27;s behaviors&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;plain_cap_vector&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector).<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">768</span>)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;vectors for the plain description of the ego vehicle&#x27;s behaviors&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;rich_caption&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">1024</span>)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;rich description of the ego vehicle&#x27;s behaviors&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;rich_cap_vector&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector).<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">768</span>)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;vectors for the rich description of the ego vehicle&#x27;s behaviors&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;risk&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">1024</span>)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;risk_vector&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector).<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">768</span>)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;risk_correct&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Bool)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;whether the risk assessment is correct&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;risk_yes_rate&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;probability/confidence of risk being present&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;weather&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">50</span>)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;weather condition&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;weather_rate&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;probability/confidence of the weather condition&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;road&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">50</span>)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;road type&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;road_rate&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;probability/confidence of the road type&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;is_tunnel&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Bool)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;whether the road is a tunnel&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;probability/confidence of the road being a tunnel&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;is_highway&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Bool)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;whether the road is a highway&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;probability/confidence of the road being a highway&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;has_pedestrian&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Bool)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;whether there is a pedestrian present&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;probability/confidence of pedestrian presence&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;has_carrier_car&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Bool)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;whether there is a carrier car present&quot;</span>))
    ;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// create the schema for the caption struct</span>
milvus::StructFieldSchema schema_for_caption;
schema_for_caption.<span class="hljs-built_in">SetName</span>(<span class="hljs-string">&quot;captions&quot;</span>);
schema_for_caption.<span class="hljs-built_in">SetDescription</span>(<span class="hljs-string">&quot;captions for the current video&quot;</span>);
schema_for_caption.<span class="hljs-built_in">SetMaxCapacity</span>(<span class="hljs-number">600</span>);
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;frame_id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;plain_caption&quot;</span>, milvus::DataType::VARCHAR, <span class="hljs-string">&quot;plain description of the ego vehicle&#x27;s behaviors&quot;</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1024</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;plain_cap_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR, <span class="hljs-string">&quot;vectors for the plain description of the ego vehicle&#x27;s behaviors&quot;</span>).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">768</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;rich_caption&quot;</span>, milvus::DataType::VARCHAR, <span class="hljs-string">&quot;rich description of the ego vehicle&#x27;s behaviors&quot;</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1024</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;rich_cap_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR, <span class="hljs-string">&quot;vectors for the rich description of the ego vehicle&#x27;s behaviors&quot;</span>).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">768</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;risk&quot;</span>, milvus::DataType::VARCHAR, <span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1024</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;risk_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR, <span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span>).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">768</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;risk_correct&quot;</span>, milvus::DataType::BOOL, <span class="hljs-string">&quot;whether the risk assessment is correct&quot;</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;risk_yes_rate&quot;</span>, milvus::DataType::FLOAT, <span class="hljs-string">&quot;probability/confidence of risk being present&quot;</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;weather&quot;</span>, milvus::DataType::VARCHAR, <span class="hljs-string">&quot;weather condition&quot;</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">50</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;weather_rate&quot;</span>, milvus::DataType::FLOAT, <span class="hljs-string">&quot;probability/confidence of the weather condition&quot;</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;road&quot;</span>, milvus::DataType::VARCHAR, <span class="hljs-string">&quot;road type&quot;</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">50</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;road_rate&quot;</span>, milvus::DataType::FLOAT, <span class="hljs-string">&quot;probability/confidence of the road type&quot;</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;is_tunnel&quot;</span>, milvus::DataType::BOOL, <span class="hljs-string">&quot;whether the road is a tunnel&quot;</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>, milvus::DataType::FLOAT, <span class="hljs-string">&quot;probability/confidence of the road being a tunnel&quot;</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;is_highway&quot;</span>, milvus::DataType::BOOL, <span class="hljs-string">&quot;whether the road is a highway&quot;</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>, milvus::DataType::FLOAT, <span class="hljs-string">&quot;probability/confidence of the road being a highway&quot;</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;has_pedestrian&quot;</span>, milvus::DataType::BOOL, <span class="hljs-string">&quot;whether there is a pedestrian present&quot;</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>, milvus::DataType::FLOAT, <span class="hljs-string">&quot;probability/confidence of pedestrian presence&quot;</span>));
    schema_for_caption.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;has_carrier_car&quot;</span>, milvus::DataType::BOOL, <span class="hljs-string">&quot;whether there is a carrier car present&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-comment">// create the schema for the caption struct</span>
<span class="hljs-keyword">const</span> captionStructFields = [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;frame_id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;plain_caption&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">1024</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;plain description of the ego vehicle&#x27;s behaviors&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;plain_cap_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;vectors for the plain description of the ego vehicle&#x27;s behaviors&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;rich_caption&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">1024</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;rich description of the ego vehicle&#x27;s behaviors&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;rich_cap_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;vectors for the rich description of the ego vehicle&#x27;s behaviors&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;risk&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">1024</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;risk_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;risk_correct&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;whether the risk assessment is correct&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;risk_yes_rate&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;probability/confidence of risk being present&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weather&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">50</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;weather condition&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;weather_rate&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;probability/confidence of the weather condition&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;road&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">50</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;road type&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;road_rate&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;probability/confidence of the road type&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;is_tunnel&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;whether the road is a tunnel&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;probability/confidence of the road being a tunnel&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;is_highway&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;whether the road is a highway&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;probability/confidence of the road being a highway&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;has_pedestrian&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;whether there is a pedestrian present&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;probability/confidence of pedestrian presence&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;has_carrier_car&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;whether there is a carrier car present&quot;</span> },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Collections.Generic;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> schemaForCaption = <span class="hljs-keyword">new</span> StructFieldSchema(<span class="hljs-string">&quot;captions&quot;</span>, <span class="hljs-string">&quot;captions for the current video&quot;</span>)
{
    MaxCapacity = <span class="hljs-number">600</span>
};
schemaForCaption.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;frame_id&quot;</span>, DataType.Int64));
schemaForCaption.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;plain_caption&quot;</span>, <span class="hljs-number">1024</span>));
schemaForCaption.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;rich_caption&quot;</span>, <span class="hljs-number">1024</span>));
schemaForCaption.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;risk&quot;</span>, <span class="hljs-number">1024</span>));
schemaForCaption.Fields.Add(FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;plain_cap_vector&quot;</span>, dimension: <span class="hljs-number">768</span>));
schemaForCaption.Fields.Add(FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;rich_cap_vector&quot;</span>, dimension: <span class="hljs-number">768</span>));
schemaForCaption.Fields.Add(FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;risk_vector&quot;</span>, dimension: <span class="hljs-number">768</span>));
schemaForCaption.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;risk_correct&quot;</span>, DataType.Bool));
schemaForCaption.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;is_tunnel&quot;</span>, DataType.Bool));
schemaForCaption.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;is_highway&quot;</span>, DataType.Bool));
schemaForCaption.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;has_pedestrian&quot;</span>, DataType.Bool));
schemaForCaption.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;has_carrier_car&quot;</span>, DataType.Bool));
schemaForCaption.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;risk_yes_rate&quot;</span>, DataType.Float));
schemaForCaption.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;weather_rate&quot;</span>, DataType.Float));
schemaForCaption.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;road_rate&quot;</span>, DataType.Float));
schemaForCaption.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>, DataType.Float));
schemaForCaption.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>, DataType.Float));
schemaForCaption.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>, DataType.Float));
schemaForCaption.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;weather&quot;</span>, <span class="hljs-number">50</span>));
schemaForCaption.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;road&quot;</span>, <span class="hljs-number">50</span>));
<button class="copy-code-btn"></button></code></pre>
<p>Initialize the schema for the Front Car Struct</p>
<div class="alert note">
<p>Although a front car does not involve vector embeddings, you still need to include it as an array of Struct because the data size exceeds the maximum for a JSON field.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
</div>
<pre><code translate="no" class="language-python">schema_for_front_car = client.create_struct_field_schema()

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;frame_id&quot;</span>,
    datatype=DataType.INT64,
    description=<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;has_lead&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether there is a leading vehicle&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_prob&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the leading vehicle&#x27;s presence&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_x&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;x position of the leading vehicle relative to the ego vehicle&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_y&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;y position of the leading vehicle relative to the ego vehicle&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_speed_kmh&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;speed of the leading vehicle in km/h&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_a&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;acceleration of the leading vehicle&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// create the schema for the front car struct</span>
CreateCollectionReq.<span class="hljs-type">StructFieldSchema</span> <span class="hljs-variable">schemaForFrontCar</span> <span class="hljs-operator">=</span> CreateCollectionReq.StructFieldSchema.builder()
        .name(<span class="hljs-string">&quot;front_cars&quot;</span>)
        .description(<span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>)
        .maxCapacity(<span class="hljs-number">600</span>)
        .fields(Arrays.asList(
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;frame_id&quot;</span>).dataType(DataType.Int64)
                        .description(<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;has_lead&quot;</span>).dataType(DataType.Bool)
                        .description(<span class="hljs-string">&quot;whether there is a leading vehicle&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;lead_prob&quot;</span>).dataType(DataType.Float)
                        .description(<span class="hljs-string">&quot;probability/confidence of the leading vehicle&#x27;s presence&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;lead_x&quot;</span>).dataType(DataType.Float)
                        .description(<span class="hljs-string">&quot;x position of the leading vehicle relative to the ego vehicle&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;lead_y&quot;</span>).dataType(DataType.Float)
                        .description(<span class="hljs-string">&quot;y position of the leading vehicle relative to the ego vehicle&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;lead_speed_kmh&quot;</span>).dataType(DataType.Float)
                        .description(<span class="hljs-string">&quot;speed of the leading vehicle in km/h&quot;</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;lead_a&quot;</span>).dataType(DataType.Float)
                        .description(<span class="hljs-string">&quot;acceleration of the leading vehicle&quot;</span>).build()
        ))
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// create the schema for the front car struct</span>
frontCarSchema := entity.NewStructSchema().
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;frame_id&quot;</span>).WithDataType(entity.FieldTypeInt64).
        WithDescription(<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;has_lead&quot;</span>).WithDataType(entity.FieldTypeBool).
        WithDescription(<span class="hljs-string">&quot;whether there is a leading vehicle&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;lead_prob&quot;</span>).WithDataType(entity.FieldTypeFloat).
        WithDescription(<span class="hljs-string">&quot;probability/confidence of the leading vehicle&#x27;s presence&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;lead_x&quot;</span>).WithDataType(entity.FieldTypeFloat).
        WithDescription(<span class="hljs-string">&quot;x position of the leading vehicle relative to the ego vehicle&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;lead_y&quot;</span>).WithDataType(entity.FieldTypeFloat).
        WithDescription(<span class="hljs-string">&quot;y position of the leading vehicle relative to the ego vehicle&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;lead_speed_kmh&quot;</span>).WithDataType(entity.FieldTypeFloat).
        WithDescription(<span class="hljs-string">&quot;speed of the leading vehicle in km/h&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;lead_a&quot;</span>).WithDataType(entity.FieldTypeFloat).
        WithDescription(<span class="hljs-string">&quot;acceleration of the leading vehicle&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// create the schema for the front car struct</span>
    <span class="hljs-keyword">let</span> <span class="hljs-variable">front_car_schema</span> = StructFieldSchema::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;front_cars&quot;</span>)
        .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>)
        .<span class="hljs-title function_ invoke__">max_capacity</span>(<span class="hljs-number">600</span>)
        .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;frame_id&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;has_lead&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Bool)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;whether there is a leading vehicle&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;lead_prob&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;probability/confidence of the leading vehicle&#x27;s presence&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;lead_x&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;x position of the leading vehicle relative to the ego vehicle&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;lead_y&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;y position of the leading vehicle relative to the ego vehicle&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;lead_speed_kmh&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;speed of the leading vehicle in km/h&quot;</span>))
.<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;lead_a&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Float)
            .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;acceleration of the leading vehicle&quot;</span>))
    ;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// create the schema for the front car struct</span>
milvus::StructFieldSchema schema_for_front_car;
schema_for_front_car.<span class="hljs-built_in">SetName</span>(<span class="hljs-string">&quot;front_cars&quot;</span>);
schema_for_front_car.<span class="hljs-built_in">SetDescription</span>(<span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>);
schema_for_front_car.<span class="hljs-built_in">SetMaxCapacity</span>(<span class="hljs-number">600</span>);
    schema_for_front_car.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;frame_id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>));
    schema_for_front_car.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;has_lead&quot;</span>, milvus::DataType::BOOL, <span class="hljs-string">&quot;whether there is a leading vehicle&quot;</span>));
    schema_for_front_car.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;lead_prob&quot;</span>, milvus::DataType::FLOAT, <span class="hljs-string">&quot;probability/confidence of the leading vehicle&#x27;s presence&quot;</span>));
    schema_for_front_car.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;lead_x&quot;</span>, milvus::DataType::FLOAT, <span class="hljs-string">&quot;x position of the leading vehicle relative to the ego vehicle&quot;</span>));
    schema_for_front_car.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;lead_y&quot;</span>, milvus::DataType::FLOAT, <span class="hljs-string">&quot;y position of the leading vehicle relative to the ego vehicle&quot;</span>));
    schema_for_front_car.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;lead_speed_kmh&quot;</span>, milvus::DataType::FLOAT, <span class="hljs-string">&quot;speed of the leading vehicle in km/h&quot;</span>));
    schema_for_front_car.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;lead_a&quot;</span>, milvus::DataType::FLOAT, <span class="hljs-string">&quot;acceleration of the leading vehicle&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// create the schema for the front car struct</span>
<span class="hljs-keyword">const</span> frontCarStructFields = [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;frame_id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;has_lead&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;whether there is a leading vehicle&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;lead_prob&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;probability/confidence of the leading vehicle&#x27;s presence&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;lead_x&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;x position of the leading vehicle relative to the ego vehicle&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;lead_y&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;y position of the leading vehicle relative to the ego vehicle&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;lead_speed_kmh&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;speed of the leading vehicle in km/h&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;lead_a&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;acceleration of the leading vehicle&quot;</span> },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// create the schema for the front car struct</span>
<span class="hljs-keyword">var</span> schemaForFrontCar = <span class="hljs-keyword">new</span> StructFieldSchema(<span class="hljs-string">&quot;front_cars&quot;</span>, <span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>)
{
    MaxCapacity = <span class="hljs-number">600</span>
};
schemaForFrontCar.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;frame_id&quot;</span>, DataType.Int64, description: <span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>));
schemaForFrontCar.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;has_lead&quot;</span>, DataType.Bool, description: <span class="hljs-string">&quot;whether there is a leading vehicle&quot;</span>));
schemaForFrontCar.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;lead_prob&quot;</span>, DataType.Float, description: <span class="hljs-string">&quot;probability/confidence of the leading vehicle&#x27;s presence&quot;</span>));
schemaForFrontCar.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;lead_x&quot;</span>, DataType.Float));
schemaForFrontCar.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;lead_y&quot;</span>, DataType.Float));
schemaForFrontCar.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;lead_speed_kmh&quot;</span>, DataType.Float));
schemaForFrontCar.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;lead_a&quot;</span>, DataType.Float));
<button class="copy-code-btn"></button></code></pre>
<p>Initialize the schema for the collection</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
</div>
<pre><code translate="no" class="language-python">schema = client.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_id&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;primary key&quot;</span>,
    max_length=<span class="hljs-number">16</span>,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">False</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_url&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
    description=<span class="hljs-string">&quot;URL of the video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;captions&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=schema_for_caption,
    max_capacity=<span class="hljs-number">600</span>,
    description=<span class="hljs-string">&quot;captions for the current video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;traffic_lights&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;front_cars&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=schema_for_front_car,
    max_capacity=<span class="hljs-number">600</span>,
    description=<span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .fieldSchemaList(Arrays.asList(
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;video_id&quot;</span>).dataType(DataType.VarChar)
                        .description(<span class="hljs-string">&quot;primary key&quot;</span>).maxLength(<span class="hljs-number">16</span>).isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;video_url&quot;</span>).dataType(DataType.VarChar)
                        .description(<span class="hljs-string">&quot;URL of the video&quot;</span>).maxLength(<span class="hljs-number">512</span>).build(),
                CreateCollectionReq.FieldSchema.builder().name(<span class="hljs-string">&quot;traffic_lights&quot;</span>).dataType(DataType.JSON)
                        .description(<span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>).build()))
        .structFields(Arrays.asList(schemaForCaption, schemaForFrontCar))
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema := entity.NewSchema().
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;video_id&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">16</span>).
        WithIsPrimaryKey(<span class="hljs-literal">true</span>).WithIsAutoID(<span class="hljs-literal">false</span>).WithDescription(<span class="hljs-string">&quot;primary key&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;video_url&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">512</span>).
        WithDescription(<span class="hljs-string">&quot;URL of the video&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;captions&quot;</span>).
        WithDataType(entity.FieldTypeArray).
        WithElementType(entity.FieldTypeStruct).
        WithMaxCapacity(<span class="hljs-number">600</span>).
        WithStructSchema(captionSchema).
        WithDescription(<span class="hljs-string">&quot;captions for the current video&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;traffic_lights&quot;</span>).WithDataType(entity.FieldTypeJSON).
        WithDescription(<span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;front_cars&quot;</span>).
        WithDataType(entity.FieldTypeArray).
        WithElementType(entity.FieldTypeStruct).
        WithMaxCapacity(<span class="hljs-number">600</span>).
        WithStructSchema(frontCarSchema).
        WithDescription(<span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;video_id&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">16</span>)
        .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_ invoke__">auto_id</span>(<span class="hljs-literal">false</span>).<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;primary key&quot;</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;video_url&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar).<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">512</span>)
        .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;URL of the video&quot;</span>))
    .<span class="hljs-title function_ invoke__">add_struct_field</span>(caption_schema)
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;traffic_lights&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Json)
        .<span class="hljs-title function_ invoke__">description</span>(<span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>))
    .<span class="hljs-title function_ invoke__">add_struct_field</span>(front_car_schema);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::CollectionSchema schema;
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;video_id&quot;</span>, milvus::DataType::VARCHAR,
    <span class="hljs-string">&quot;primary key&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">16</span>));
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;video_url&quot;</span>, milvus::DataType::VARCHAR,
    <span class="hljs-string">&quot;URL of the video&quot;</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">512</span>));
schema.<span class="hljs-built_in">AddStructField</span>(schema_for_caption);
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;traffic_lights&quot;</span>, milvus::DataType::JSON,
    <span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>));
schema.<span class="hljs-built_in">AddStructField</span>(schema_for_front_car);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> schema = [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;video_id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;primary key&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;video_url&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
      <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;URL of the video&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;captions&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>, <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Struct</span>, <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">600</span>,
      <span class="hljs-attr">fields</span>: captionStructFields, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;captions for the current video&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;traffic_lights&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;front_cars&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>, <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Struct</span>, <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">600</span>,
      <span class="hljs-attr">fields</span>: frontCarStructFields, <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span> },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    Fields =
    {
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;video_id&quot;</span>, <span class="hljs-number">16</span>, isPrimaryKey: <span class="hljs-literal">true</span>, description: <span class="hljs-string">&quot;primary key&quot;</span>),
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;video_url&quot;</span>, <span class="hljs-number">512</span>, description: <span class="hljs-string">&quot;URL of the video&quot;</span>),
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;traffic_lights&quot;</span>, DataType.Json, description: <span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>)
    },
    StructFields = { schemaForCaption, schemaForFrontCar }
};
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Set-index-parameters" class="common-anchor-header">Step 3: Set index parameters<button data-href="#Step-3-Set-index-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>All vector fields must be indexed. To index the vector fields in an element Struct, you need to use <code translate="no">AUTOINDEX</code> or <code translate="no">HNSW</code> as the index type and the <code translate="no">MAX_SIM</code> series metric type to measure the similarities between embedding lists.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;captions[plain_cap_vector]&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    index_name=<span class="hljs-string">&quot;captions_plain_cap_vector_idx&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;captions[rich_cap_vector]&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    index_name=<span class="hljs-string">&quot;captions_rich_cap_vector_idx&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;captions[risk_vector]&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    index_name=<span class="hljs-string">&quot;captions_risk_vector_idx&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;IndexParam&gt; indexParams = Arrays.asList(
        IndexParam.builder().fieldName(<span class="hljs-string">&quot;captions[plain_cap_vector]&quot;</span>)
                .indexType(IndexParam.IndexType.AUTOINDEX)
                .metricType(IndexParam.MetricType.MAX_SIM_COSINE)
                .indexName(<span class="hljs-string">&quot;captions_plain_cap_vector_idx&quot;</span>)
                .build(),
        IndexParam.builder().fieldName(<span class="hljs-string">&quot;captions[rich_cap_vector]&quot;</span>)
                .indexType(IndexParam.IndexType.AUTOINDEX)
                .metricType(IndexParam.MetricType.MAX_SIM_COSINE)
                .indexName(<span class="hljs-string">&quot;captions_rich_cap_vector_idx&quot;</span>)
                .build(),
        IndexParam.builder().fieldName(<span class="hljs-string">&quot;captions[risk_vector]&quot;</span>)
                .indexType(IndexParam.IndexType.AUTOINDEX)
                .metricType(IndexParam.MetricType.MAX_SIM_COSINE)
                .indexName(<span class="hljs-string">&quot;captions_risk_vector_idx&quot;</span>)
                .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexes := []milvusclient.CreateIndexOption{
    milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;covla_dataset&quot;</span>, <span class="hljs-string">&quot;captions[plain_cap_vector]&quot;</span>, index.NewAutoIndex(entity.MaxSimCosine)).
        WithIndexName(<span class="hljs-string">&quot;captions_plain_cap_vector_idx&quot;</span>),
    milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;covla_dataset&quot;</span>, <span class="hljs-string">&quot;captions[rich_cap_vector]&quot;</span>, index.NewAutoIndex(entity.MaxSimCosine)).
        WithIndexName(<span class="hljs-string">&quot;captions_rich_cap_vector_idx&quot;</span>),
    milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;covla_dataset&quot;</span>, <span class="hljs-string">&quot;captions[risk_vector]&quot;</span>, index.NewAutoIndex(entity.MaxSimCosine)).
        WithIndexName(<span class="hljs-string">&quot;captions_risk_vector_idx&quot;</span>),
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">index_params</span> = <span class="hljs-built_in">vec!</span>[
    IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;captions[plain_cap_vector]&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;captions_plain_cap_vector_idx&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::MaxSimCosine),
    IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;captions[rich_cap_vector]&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;captions_rich_cap_vector_idx&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::MaxSimCosine),
    IndexParam::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;captions[risk_vector]&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;captions_risk_vector_idx&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::MaxSimCosine),
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-function">milvus::IndexDesc <span class="hljs-title">captions_plain_cap_vector_idx</span><span class="hljs-params">(<span class="hljs-string">&quot;captions[plain_cap_vector]&quot;</span>,
    <span class="hljs-string">&quot;captions_plain_cap_vector_idx&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::MAX_SIM_COSINE)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">captions_rich_cap_vector_idx</span><span class="hljs-params">(<span class="hljs-string">&quot;captions[rich_cap_vector]&quot;</span>,
    <span class="hljs-string">&quot;captions_rich_cap_vector_idx&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::MAX_SIM_COSINE)</span></span>;
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">captions_risk_vector_idx</span><span class="hljs-params">(<span class="hljs-string">&quot;captions[risk_vector]&quot;</span>,
    <span class="hljs-string">&quot;captions_risk_vector_idx&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::MAX_SIM_COSINE)</span></span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;captions[plain_cap_vector]&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>, <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;captions_plain_cap_vector_idx&quot;</span> },
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;captions[rich_cap_vector]&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>, <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;captions_rich_cap_vector_idx&quot;</span> },
    { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;captions[risk_vector]&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>, <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;captions_risk_vector_idx&quot;</span> },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp">IndexParam[] indexParams =
[
    <span class="hljs-keyword">new</span>(<span class="hljs-string">&quot;captions[plain_cap_vector]&quot;</span>, <span class="hljs-string">&quot;captions_plain_cap_vector_idx&quot;</span>, IndexType.AutoIndex, MetricType.MaxSimCosine),
    <span class="hljs-keyword">new</span>(<span class="hljs-string">&quot;captions[rich_cap_vector]&quot;</span>, <span class="hljs-string">&quot;captions_rich_cap_vector_idx&quot;</span>, IndexType.AutoIndex, MetricType.MaxSimCosine),
    <span class="hljs-keyword">new</span>(<span class="hljs-string">&quot;captions[risk_vector]&quot;</span>, <span class="hljs-string">&quot;captions_risk_vector_idx&quot;</span>, IndexType.AutoIndex, MetricType.MaxSimCosine)
];
<button class="copy-code-btn"></button></code></pre>
<p>You are advised to enable JSON shredding for JSON fields to accelerate filtering within these fields.</p>
<h3 id="Step-4-Create-a-collection" class="common-anchor-header">Step 4: Create a collection<button data-href="#Step-4-Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Once the schemas and indexes are ready, you can create the target collection as follows:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;covla_dataset&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;covla_dataset&quot;</span>, schema).
        WithIndexOptions(indexes...))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;covla_dataset&quot;</span>)
    .<span class="hljs-title function_ invoke__">schema</span>(schema)
    .<span class="hljs-title function_ invoke__">index_params</span>(index_params)
    .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">create_collection</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::CreateCollectionRequest create_request;
create_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;covla_dataset&quot;</span>);
create_request.<span class="hljs-built_in">WithCollectionSchema</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;(schema));
create_request.<span class="hljs-built_in">WithIndexes</span>({captions_plain_cap_vector_idx, captions_rich_cap_vector_idx, captions_risk_vector_idx});

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(create_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;covla_dataset&quot;</span>,
    schema,
    <span class="hljs-attr">index_params</span>: indexParams,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;covla_dataset&quot;</span>,
    Schema = schema,
    Indexes = indexParams
});
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-the-data" class="common-anchor-header">Step 5: Insert the data<button data-href="#Step-5-Insert-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Turing Motos organizes the CoVLA dataset in multiple files, including raw video clips (<code translate="no">.mp4</code>), states (<code translate="no">states.jsonl</code>), captions (<code translate="no">captions.jsonl</code>), traffic lights (<code translate="no">traffic_lights.jsonl</code>), and front cars (<code translate="no">front_cars.jsonl</code>).</p>
<p>You need to merge the data pieces for each video clip from these files and insert the data. The following is the script to merge the data pieces for a specific video clip. Configure an OpenAI-compatible embedding endpoint and a model that returns 768-dimensional vectors, matching the schema. The file-processing example uses Python; the insertion examples below show the SDK request shapes. Synthetic vectors in the non-Python insertion examples illustrate payload structure and must be replaced with your embeddings for retrieval.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

openai_client = OpenAI(
    base_url=<span class="hljs-string">&#x27;YOUR_EMBEDDING_API_BASE_URL&#x27;</span>,
    api_key=<span class="hljs-string">&#x27;YOUR_EMBEDDING_API_KEY&#x27;</span>,
)

video_id = <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span> <span class="hljs-comment"># represent a single video with 600 frames</span>

<span class="hljs-comment"># get all front car records in the specified video clip</span>
entries = []
front_cars = []
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;data/front_car/{}.jsonl&#x27;</span>.<span class="hljs-built_in">format</span>(video_id), <span class="hljs-string">&#x27;r&#x27;</span>) <span class="hljs-keyword">as</span> f:
    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> f:
        entries.append(json.loads(line))

<span class="hljs-keyword">for</span> entry <span class="hljs-keyword">in</span> entries:
    <span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> entry.items():
        value[<span class="hljs-string">&#x27;frame_id&#x27;</span>] = <span class="hljs-built_in">int</span>(key)
        front_cars.append(value)

<span class="hljs-comment"># get all traffic lights identified in the specified video clip</span>
entries = []
traffic_lights = []
frame_id = <span class="hljs-number">0</span>
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;data/traffic_lights/{}.jsonl&#x27;</span>.<span class="hljs-built_in">format</span>(video_id), <span class="hljs-string">&#x27;r&#x27;</span>) <span class="hljs-keyword">as</span> f:
    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> f:
        entries.append(json.loads(line))

<span class="hljs-keyword">for</span> entry <span class="hljs-keyword">in</span> entries:
    <span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> entry.items():
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> value <span class="hljs-keyword">or</span> (value[<span class="hljs-string">&#x27;index&#x27;</span>] == <span class="hljs-number">1</span> <span class="hljs-keyword">and</span> key != <span class="hljs-string">&#x27;0&#x27;</span>):
            frame_id+=<span class="hljs-number">1</span>

        <span class="hljs-keyword">if</span> value:
            value[<span class="hljs-string">&#x27;frame_id&#x27;</span>] = frame_id
            traffic_lights.append(value)
        <span class="hljs-keyword">else</span>:
            value_dict = {}
            value_dict[<span class="hljs-string">&#x27;frame_id&#x27;</span>] = frame_id
            traffic_lights.append(value_dict)

<span class="hljs-comment"># get all captions generated in the video clip and convert them into vector embeddings</span>
entries = []
captions = []
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;data/captions/{}.jsonl&#x27;</span>.<span class="hljs-built_in">format</span>(video_id), <span class="hljs-string">&#x27;r&#x27;</span>) <span class="hljs-keyword">as</span> f:
    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> f:
        entries.append(json.loads(line))

<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embedding</span>(<span class="hljs-params">text, model=<span class="hljs-string">&quot;YOUR_768_DIMENSION_EMBEDDING_MODEL&quot;</span></span>):
    response = openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=model)
    vector = response.data[<span class="hljs-number">0</span>].embedding
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(vector) != <span class="hljs-number">768</span>:
        <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The configured embedding model must return 768 dimensions&quot;</span>)
    <span class="hljs-keyword">return</span> vector

<span class="hljs-comment"># Add embeddings to each entry</span>
<span class="hljs-keyword">for</span> entry <span class="hljs-keyword">in</span> entries:
    <span class="hljs-comment"># Each entry is a dict with a single key (e.g., &#x27;0&#x27;, &#x27;1&#x27;, ...)</span>
    <span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> entry.items():
        value[<span class="hljs-string">&#x27;frame_id&#x27;</span>] = <span class="hljs-built_in">int</span>(key)  <span class="hljs-comment"># Convert key to integer and assign to frame_id</span>

        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;plain_caption&quot;</span> <span class="hljs-keyword">in</span> value <span class="hljs-keyword">and</span> value[<span class="hljs-string">&quot;plain_caption&quot;</span>]:
            value[<span class="hljs-string">&quot;plain_cap_vector&quot;</span>] = get_embedding(value[<span class="hljs-string">&quot;plain_caption&quot;</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;rich_caption&quot;</span> <span class="hljs-keyword">in</span> value <span class="hljs-keyword">and</span> value[<span class="hljs-string">&quot;rich_caption&quot;</span>]:
            value[<span class="hljs-string">&quot;rich_cap_vector&quot;</span>] = get_embedding(value[<span class="hljs-string">&quot;rich_caption&quot;</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;risk&quot;</span> <span class="hljs-keyword">in</span> value <span class="hljs-keyword">and</span> value[<span class="hljs-string">&quot;risk&quot;</span>]:
            value[<span class="hljs-string">&quot;risk_vector&quot;</span>] = get_embedding(value[<span class="hljs-string">&quot;risk&quot;</span>])

        captions.append(value)

data = {
    <span class="hljs-string">&quot;video_id&quot;</span>: video_id,
    <span class="hljs-string">&quot;video_url&quot;</span>: <span class="hljs-string">&quot;https://your-storage.com/{}&quot;</span>.<span class="hljs-built_in">format</span>(video_id),
    <span class="hljs-string">&quot;captions&quot;</span>: captions,
    <span class="hljs-string">&quot;traffic_lights&quot;</span>: traffic_lights,
    <span class="hljs-string">&quot;front_cars&quot;</span>: front_cars
}
<button class="copy-code-btn"></button></code></pre>
<p>Once you have processed the data accordingly, you can insert it as follows:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
</div>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    data=[data]
)

<span class="hljs-comment"># {&#x27;insert_count&#x27;: 1, &#x27;ids&#x27;: [&#x27;0a0fc7a5db365174&#x27;]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;Float&gt; vector = Collections.nCopies(<span class="hljs-number">768</span>, <span class="hljs-number">0.1f</span>); <span class="hljs-comment">// placeholder vectors</span>

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">data</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
data.addProperty(<span class="hljs-string">&quot;video_id&quot;</span>, <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span>);
data.addProperty(<span class="hljs-string">&quot;video_url&quot;</span>, <span class="hljs-string">&quot;https://your-storage.com/0a0fc7a5db365174&quot;</span>);

<span class="hljs-type">JsonArray</span> <span class="hljs-variable">captions</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">caption</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
caption.addProperty(<span class="hljs-string">&quot;frame_id&quot;</span>, <span class="hljs-number">0</span>);
caption.addProperty(<span class="hljs-string">&quot;plain_caption&quot;</span>, <span class="hljs-string">&quot;Merge left while yielding to oncoming traffic&quot;</span>);
caption.add(<span class="hljs-string">&quot;plain_cap_vector&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>().toJsonTree(vector));
caption.addProperty(<span class="hljs-string">&quot;rich_caption&quot;</span>, <span class="hljs-string">&quot;Merge left while yielding to oncoming traffic on a sunny highway&quot;</span>);
caption.add(<span class="hljs-string">&quot;rich_cap_vector&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>().toJsonTree(vector));
caption.addProperty(<span class="hljs-string">&quot;risk&quot;</span>, <span class="hljs-string">&quot;Potential collision with the leading vehicle&quot;</span>);
caption.add(<span class="hljs-string">&quot;risk_vector&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>().toJsonTree(vector));
caption.addProperty(<span class="hljs-string">&quot;risk_correct&quot;</span>, <span class="hljs-literal">true</span>);
caption.addProperty(<span class="hljs-string">&quot;risk_yes_rate&quot;</span>, <span class="hljs-number">0.8</span>);
caption.addProperty(<span class="hljs-string">&quot;weather&quot;</span>, <span class="hljs-string">&quot;sunny&quot;</span>);
caption.addProperty(<span class="hljs-string">&quot;weather_rate&quot;</span>, <span class="hljs-number">0.9</span>);
caption.addProperty(<span class="hljs-string">&quot;road&quot;</span>, <span class="hljs-string">&quot;highway&quot;</span>);
caption.addProperty(<span class="hljs-string">&quot;road_rate&quot;</span>, <span class="hljs-number">0.7</span>);
caption.addProperty(<span class="hljs-string">&quot;is_tunnel&quot;</span>, <span class="hljs-literal">false</span>);
caption.addProperty(<span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>, <span class="hljs-number">0.1</span>);
caption.addProperty(<span class="hljs-string">&quot;is_highway&quot;</span>, <span class="hljs-literal">true</span>);
caption.addProperty(<span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>, <span class="hljs-number">0.9</span>);
caption.addProperty(<span class="hljs-string">&quot;has_pedestrian&quot;</span>, <span class="hljs-literal">true</span>);
caption.addProperty(<span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>, <span class="hljs-number">0.6</span>);
caption.addProperty(<span class="hljs-string">&quot;has_carrier_car&quot;</span>, <span class="hljs-literal">false</span>);
captions.add(caption);

<span class="hljs-type">JsonArray</span> <span class="hljs-variable">trafficLights</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">trafficLight</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
trafficLight.addProperty(<span class="hljs-string">&quot;index&quot;</span>, <span class="hljs-number">0</span>);
trafficLight.addProperty(<span class="hljs-string">&quot;class&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>);
trafficLight.add(<span class="hljs-string">&quot;bbox&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>().toJsonTree(Arrays.asList(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>)));
trafficLights.add(trafficLight);

<span class="hljs-type">JsonArray</span> <span class="hljs-variable">frontCars</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">frontCar</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
frontCar.addProperty(<span class="hljs-string">&quot;frame_id&quot;</span>, <span class="hljs-number">0</span>);
frontCar.addProperty(<span class="hljs-string">&quot;has_lead&quot;</span>, <span class="hljs-literal">true</span>);
frontCar.addProperty(<span class="hljs-string">&quot;lead_prob&quot;</span>, <span class="hljs-number">0.9</span>);
frontCar.addProperty(<span class="hljs-string">&quot;lead_x&quot;</span>, <span class="hljs-number">1.5</span>);
frontCar.addProperty(<span class="hljs-string">&quot;lead_y&quot;</span>, <span class="hljs-number">0.5</span>);
frontCar.addProperty(<span class="hljs-string">&quot;lead_speed_kmh&quot;</span>, <span class="hljs-number">60.0</span>);
frontCar.addProperty(<span class="hljs-string">&quot;lead_a&quot;</span>, <span class="hljs-number">0.2</span>);
frontCars.add(frontCar);

data.add(<span class="hljs-string">&quot;captions&quot;</span>, captions);
data.add(<span class="hljs-string">&quot;traffic_lights&quot;</span>, trafficLights);
data.add(<span class="hljs-string">&quot;front_cars&quot;</span>, frontCars);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;covla_dataset&quot;</span>)
        .data(Collections.singletonList(data))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">trafficLights, err := json.Marshal([]<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    {<span class="hljs-string">&quot;index&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;class&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;bbox&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>}},
    {<span class="hljs-string">&quot;index&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;class&quot;</span>: <span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;bbox&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>}},
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-comment">// placeholder vectors</span>
vector := <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span></span> []<span class="hljs-type">float32</span> {
    v := <span class="hljs-built_in">make</span>([]<span class="hljs-type">float32</span>, <span class="hljs-number">768</span>)
    <span class="hljs-keyword">for</span> i := <span class="hljs-keyword">range</span> v {
        v[i] = <span class="hljs-number">0.1</span>
    }
    <span class="hljs-keyword">return</span> v
}

ins, err := client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;covla_dataset&quot;</span>).
    WithColumns(
        column.NewColumnVarChar(<span class="hljs-string">&quot;video_id&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span>}),
        column.NewColumnVarChar(<span class="hljs-string">&quot;video_url&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;https://your-storage.com/0a0fc7a5db365174&quot;</span>}),
        column.NewColumnJSONBytes(<span class="hljs-string">&quot;traffic_lights&quot;</span>, [][]<span class="hljs-type">byte</span>{trafficLights}),
    ).
    WithStructArrayColumn(<span class="hljs-string">&quot;captions&quot;</span>, captionSchema, []<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        {
            <span class="hljs-string">&quot;frame_id&quot;</span>:                []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>},
            <span class="hljs-string">&quot;plain_caption&quot;</span>:           []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Merge left while yielding to oncoming traffic&quot;</span>, <span class="hljs-string">&quot;Continue straight on the highway&quot;</span>},
            <span class="hljs-string">&quot;plain_cap_vector&quot;</span>:        [][]<span class="hljs-type">float32</span>{vector(), vector()},
            <span class="hljs-string">&quot;rich_caption&quot;</span>:            []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Merge left on a sunny highway&quot;</span>, <span class="hljs-string">&quot;Continue straight on a sunny highway&quot;</span>},
            <span class="hljs-string">&quot;rich_cap_vector&quot;</span>:         [][]<span class="hljs-type">float32</span>{vector(), vector()},
            <span class="hljs-string">&quot;risk&quot;</span>:                    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Potential collision with the leading vehicle&quot;</span>, <span class="hljs-string">&quot;No immediate risk&quot;</span>},
            <span class="hljs-string">&quot;risk_vector&quot;</span>:             [][]<span class="hljs-type">float32</span>{vector(), vector()},
            <span class="hljs-string">&quot;risk_correct&quot;</span>:            []<span class="hljs-type">bool</span>{<span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>},
            <span class="hljs-string">&quot;risk_yes_rate&quot;</span>:           []<span class="hljs-type">float32</span>{<span class="hljs-number">0.8</span>, <span class="hljs-number">0.1</span>},
            <span class="hljs-string">&quot;weather&quot;</span>:                 []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;sunny&quot;</span>, <span class="hljs-string">&quot;sunny&quot;</span>},
            <span class="hljs-string">&quot;weather_rate&quot;</span>:            []<span class="hljs-type">float32</span>{<span class="hljs-number">0.9</span>, <span class="hljs-number">0.9</span>},
            <span class="hljs-string">&quot;road&quot;</span>:                    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;highway&quot;</span>, <span class="hljs-string">&quot;highway&quot;</span>},
            <span class="hljs-string">&quot;road_rate&quot;</span>:               []<span class="hljs-type">float32</span>{<span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>},
            <span class="hljs-string">&quot;is_tunnel&quot;</span>:               []<span class="hljs-type">bool</span>{<span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>},
            <span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>:      []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.1</span>},
            <span class="hljs-string">&quot;is_highway&quot;</span>:              []<span class="hljs-type">bool</span>{<span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>},
            <span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>:     []<span class="hljs-type">float32</span>{<span class="hljs-number">0.9</span>, <span class="hljs-number">0.9</span>},
            <span class="hljs-string">&quot;has_pedestrian&quot;</span>:          []<span class="hljs-type">bool</span>{<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>},
            <span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">0.6</span>, <span class="hljs-number">0.2</span>},
            <span class="hljs-string">&quot;has_carrier_car&quot;</span>:         []<span class="hljs-type">bool</span>{<span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>},
        },
    }).
    WithStructArrayColumn(<span class="hljs-string">&quot;front_cars&quot;</span>, frontCarSchema, []<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        {
            <span class="hljs-string">&quot;frame_id&quot;</span>:       []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>},
            <span class="hljs-string">&quot;has_lead&quot;</span>:       []<span class="hljs-type">bool</span>{<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>},
            <span class="hljs-string">&quot;lead_prob&quot;</span>:      []<span class="hljs-type">float32</span>{<span class="hljs-number">0.9</span>, <span class="hljs-number">0.0</span>},
            <span class="hljs-string">&quot;lead_x&quot;</span>:         []<span class="hljs-type">float32</span>{<span class="hljs-number">1.5</span>, <span class="hljs-number">0.0</span>},
            <span class="hljs-string">&quot;lead_y&quot;</span>:         []<span class="hljs-type">float32</span>{<span class="hljs-number">0.5</span>, <span class="hljs-number">0.0</span>},
            <span class="hljs-string">&quot;lead_speed_kmh&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">60.0</span>, <span class="hljs-number">0.0</span>},
            <span class="hljs-string">&quot;lead_a&quot;</span>:         []<span class="hljs-type">float32</span>{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.0</span>},
        },
    }))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
fmt.Println(<span class="hljs-string">&quot;insert OK, ids:&quot;</span>, ins.IDs)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;covla_dataset&quot;</span>)
    .<span class="hljs-title function_ invoke__">columns</span>(<span class="hljs-built_in">vec!</span>[
        FieldData::VarChar {
            name: <span class="hljs-string">&quot;video_id&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(),
            values: <span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()],
        },
        FieldData::VarChar {
            name: <span class="hljs-string">&quot;video_url&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(),
            values: <span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;https://your-storage.com/0a0fc7a5db365174&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()],
        },
        FieldData::Json {
            name: <span class="hljs-string">&quot;traffic_lights&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(),
            values: <span class="hljs-built_in">vec!</span>[serde_json::json!([
                {<span class="hljs-string">&quot;index&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;class&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;bbox&quot;</span>: [<span class="hljs-number">1.0</span>, <span class="hljs-number">2.0</span>, <span class="hljs-number">3.0</span>, <span class="hljs-number">4.0</span>]},
                {<span class="hljs-string">&quot;index&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;class&quot;</span>: <span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;bbox&quot;</span>: [<span class="hljs-number">5.0</span>, <span class="hljs-number">6.0</span>, <span class="hljs-number">7.0</span>, <span class="hljs-number">8.0</span>]}
            ])],
        },
        FieldData::Struct {
            name: <span class="hljs-string">&quot;captions&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(),
            values: <span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[
                serde_json::json!({
                    <span class="hljs-string">&quot;frame_id&quot;</span>: <span class="hljs-number">0</span>,
                    <span class="hljs-string">&quot;plain_caption&quot;</span>: <span class="hljs-string">&quot;Merge left while yielding to oncoming traffic&quot;</span>,
                    <span class="hljs-string">&quot;plain_cap_vector&quot;</span>: <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1f32</span>; <span class="hljs-number">768</span>],
                    <span class="hljs-string">&quot;rich_caption&quot;</span>: <span class="hljs-string">&quot;Merge left while yielding to oncoming traffic on a sunny highway&quot;</span>,
                    <span class="hljs-string">&quot;rich_cap_vector&quot;</span>: <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1f32</span>; <span class="hljs-number">768</span>],
                    <span class="hljs-string">&quot;risk&quot;</span>: <span class="hljs-string">&quot;Potential collision with the leading vehicle&quot;</span>,
                    <span class="hljs-string">&quot;risk_vector&quot;</span>: <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1f32</span>; <span class="hljs-number">768</span>],
                    <span class="hljs-string">&quot;risk_correct&quot;</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-string">&quot;risk_yes_rate&quot;</span>: <span class="hljs-number">0.8</span>,
                    <span class="hljs-string">&quot;weather&quot;</span>: <span class="hljs-string">&quot;sunny&quot;</span>,
                    <span class="hljs-string">&quot;weather_rate&quot;</span>: <span class="hljs-number">0.9</span>,
                    <span class="hljs-string">&quot;road&quot;</span>: <span class="hljs-string">&quot;highway&quot;</span>,
                    <span class="hljs-string">&quot;road_rate&quot;</span>: <span class="hljs-number">0.7</span>,
                    <span class="hljs-string">&quot;is_tunnel&quot;</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>: <span class="hljs-number">0.1</span>,
                    <span class="hljs-string">&quot;is_highway&quot;</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>: <span class="hljs-number">0.9</span>,
                    <span class="hljs-string">&quot;has_pedestrian&quot;</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>: <span class="hljs-number">0.6</span>,
                    <span class="hljs-string">&quot;has_carrier_car&quot;</span>: <span class="hljs-literal">false</span>,
                }).<span class="hljs-title function_ invoke__">as_object</span>().<span class="hljs-title function_ invoke__">cloned</span>().<span class="hljs-title function_ invoke__">expect</span>(<span class="hljs-string">&quot;caption object&quot;</span>),
            ]],
        },
        FieldData::Struct {
            name: <span class="hljs-string">&quot;front_cars&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(),
            values: <span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[
                serde_json::json!({
                    <span class="hljs-string">&quot;frame_id&quot;</span>: <span class="hljs-number">0</span>,
                    <span class="hljs-string">&quot;has_lead&quot;</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-string">&quot;lead_prob&quot;</span>: <span class="hljs-number">0.9</span>,
                    <span class="hljs-string">&quot;lead_x&quot;</span>: <span class="hljs-number">1.5</span>,
                    <span class="hljs-string">&quot;lead_y&quot;</span>: <span class="hljs-number">0.5</span>,
                    <span class="hljs-string">&quot;lead_speed_kmh&quot;</span>: <span class="hljs-number">60.0</span>,
                    <span class="hljs-string">&quot;lead_a&quot;</span>: <span class="hljs-number">0.2</span>,
                }).<span class="hljs-title function_ invoke__">as_object</span>().<span class="hljs-title function_ invoke__">cloned</span>().<span class="hljs-title function_ invoke__">expect</span>(<span class="hljs-string">&quot;front car object&quot;</span>),
            ]],
        },
    ])
    .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">insert</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::EntityRows rows = {{
    {<span class="hljs-string">&quot;video_id&quot;</span>, <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span>},
    {<span class="hljs-string">&quot;video_url&quot;</span>, <span class="hljs-string">&quot;https://your-storage.com/0a0fc7a5db365174&quot;</span>},
    {<span class="hljs-string">&quot;captions&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({{
            {<span class="hljs-string">&quot;frame_id&quot;</span>, <span class="hljs-number">0</span>},
            {<span class="hljs-string">&quot;plain_caption&quot;</span>, <span class="hljs-string">&quot;Merge left while yielding to oncoming traffic&quot;</span>},
            {<span class="hljs-string">&quot;plain_cap_vector&quot;</span>, std::<span class="hljs-built_in">vector</span>&lt;<span class="hljs-type">float</span>&gt;(<span class="hljs-number">768</span>, <span class="hljs-number">0.1f</span>)},
            {<span class="hljs-string">&quot;rich_caption&quot;</span>, <span class="hljs-string">&quot;Merge left while yielding to oncoming traffic on a sunny highway&quot;</span>},
            {<span class="hljs-string">&quot;rich_cap_vector&quot;</span>, std::<span class="hljs-built_in">vector</span>&lt;<span class="hljs-type">float</span>&gt;(<span class="hljs-number">768</span>, <span class="hljs-number">0.1f</span>)},
            {<span class="hljs-string">&quot;risk&quot;</span>, <span class="hljs-string">&quot;Potential collision with the leading vehicle&quot;</span>},
            {<span class="hljs-string">&quot;risk_vector&quot;</span>, std::<span class="hljs-built_in">vector</span>&lt;<span class="hljs-type">float</span>&gt;(<span class="hljs-number">768</span>, <span class="hljs-number">0.1f</span>)},
            {<span class="hljs-string">&quot;risk_correct&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;risk_yes_rate&quot;</span>, <span class="hljs-number">0.8</span>},
            {<span class="hljs-string">&quot;weather&quot;</span>, <span class="hljs-string">&quot;sunny&quot;</span>},
            {<span class="hljs-string">&quot;weather_rate&quot;</span>, <span class="hljs-number">0.9</span>},
            {<span class="hljs-string">&quot;road&quot;</span>, <span class="hljs-string">&quot;highway&quot;</span>},
            {<span class="hljs-string">&quot;road_rate&quot;</span>, <span class="hljs-number">0.7</span>},
            {<span class="hljs-string">&quot;is_tunnel&quot;</span>, <span class="hljs-literal">false</span>},
            {<span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>, <span class="hljs-number">0.1</span>},
            {<span class="hljs-string">&quot;is_highway&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>, <span class="hljs-number">0.9</span>},
            {<span class="hljs-string">&quot;has_pedestrian&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>, <span class="hljs-number">0.6</span>},
            {<span class="hljs-string">&quot;has_carrier_car&quot;</span>, <span class="hljs-literal">false</span>}
    }})},
    {<span class="hljs-string">&quot;traffic_lights&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({{
        {<span class="hljs-string">&quot;index&quot;</span>, <span class="hljs-number">0</span>}, {<span class="hljs-string">&quot;class&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>}, {<span class="hljs-string">&quot;bbox&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>}}
    }})},
    {<span class="hljs-string">&quot;front_cars&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({{
            {<span class="hljs-string">&quot;frame_id&quot;</span>, <span class="hljs-number">0</span>},
            {<span class="hljs-string">&quot;has_lead&quot;</span>, <span class="hljs-literal">true</span>},
            {<span class="hljs-string">&quot;lead_prob&quot;</span>, <span class="hljs-number">0.9</span>},
            {<span class="hljs-string">&quot;lead_x&quot;</span>, <span class="hljs-number">1.5</span>},
            {<span class="hljs-string">&quot;lead_y&quot;</span>, <span class="hljs-number">0.5</span>},
            {<span class="hljs-string">&quot;lead_speed_kmh&quot;</span>, <span class="hljs-number">60.0</span>},
            {<span class="hljs-string">&quot;lead_a&quot;</span>, <span class="hljs-number">0.2</span>}
    }})}
}};

milvus::InsertRequest insert_request;
insert_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;covla_dataset&quot;</span>);
insert_request.<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(rows));

milvus::InsertResponse insert_resp;
status = client-&gt;<span class="hljs-built_in">Insert</span>(insert_request, insert_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = {
    <span class="hljs-attr">video_id</span>: <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span>,
    <span class="hljs-attr">video_url</span>: <span class="hljs-string">&quot;https://your-storage.com/0a0fc7a5db365174&quot;</span>,
    <span class="hljs-attr">captions</span>: [
        {
            <span class="hljs-attr">frame_id</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attr">plain_caption</span>: <span class="hljs-string">&quot;Merge left while yielding to oncoming traffic&quot;</span>,
            <span class="hljs-attr">plain_cap_vector</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(<span class="hljs-number">768</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0.1</span>),
            <span class="hljs-attr">rich_caption</span>: <span class="hljs-string">&quot;Merge left while yielding to oncoming traffic on a sunny highway&quot;</span>,
            <span class="hljs-attr">rich_cap_vector</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(<span class="hljs-number">768</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0.1</span>),
            <span class="hljs-attr">risk</span>: <span class="hljs-string">&quot;Potential collision with the leading vehicle&quot;</span>,
            <span class="hljs-attr">risk_vector</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(<span class="hljs-number">768</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0.1</span>),
            <span class="hljs-attr">risk_correct</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">risk_yes_rate</span>: <span class="hljs-number">0.8</span>,
            <span class="hljs-attr">weather</span>: <span class="hljs-string">&quot;sunny&quot;</span>,
            <span class="hljs-attr">weather_rate</span>: <span class="hljs-number">0.9</span>,
            <span class="hljs-attr">road</span>: <span class="hljs-string">&quot;highway&quot;</span>,
            <span class="hljs-attr">road_rate</span>: <span class="hljs-number">0.7</span>,
            <span class="hljs-attr">is_tunnel</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">is_tunnel_yes_rate</span>: <span class="hljs-number">0.1</span>,
            <span class="hljs-attr">is_highway</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">is_highway_yes_rate</span>: <span class="hljs-number">0.9</span>,
            <span class="hljs-attr">has_pedestrian</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">has_pedestrian_yes_rate</span>: <span class="hljs-number">0.6</span>,
            <span class="hljs-attr">has_carrier_car</span>: <span class="hljs-literal">false</span>,
        },
    ],
    <span class="hljs-attr">traffic_lights</span>: [
        { <span class="hljs-attr">index</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">class</span>: <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-attr">bbox</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>] },
        { <span class="hljs-attr">index</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">class</span>: <span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-attr">bbox</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>] },
    ],
    <span class="hljs-attr">front_cars</span>: [
        {
            <span class="hljs-attr">frame_id</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attr">has_lead</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">lead_prob</span>: <span class="hljs-number">0.9</span>,
            <span class="hljs-attr">lead_x</span>: <span class="hljs-number">1.5</span>,
            <span class="hljs-attr">lead_y</span>: <span class="hljs-number">0.5</span>,
            <span class="hljs-attr">lead_speed_kmh</span>: <span class="hljs-number">60</span>,
            <span class="hljs-attr">lead_a</span>: <span class="hljs-number">0.2</span>,
        },
    ],
};

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;covla_dataset&quot;</span>, <span class="hljs-attr">data</span>: [data] });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> vector768 = Enumerable.Repeat(<span class="hljs-number">0.1f</span>, <span class="hljs-number">768</span>).ToArray();

<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;covla_dataset&quot;</span>,
    RowsData =
    [
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;video_id&quot;</span>] = <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span>,
            [<span class="hljs-string">&quot;video_url&quot;</span>] = <span class="hljs-string">&quot;https://your-storage.com/0a0fc7a5db365174&quot;</span>,
            [<span class="hljs-string">&quot;traffic_lights&quot;</span>] = <span class="hljs-keyword">new</span>[]
            {
                <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;index&quot;</span>] = <span class="hljs-number">0</span>, [<span class="hljs-string">&quot;class&quot;</span>] = <span class="hljs-string">&quot;red&quot;</span>, [<span class="hljs-string">&quot;bbox&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">1f</span>, <span class="hljs-number">2f</span>, <span class="hljs-number">3f</span>, <span class="hljs-number">4f</span> } },
                <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;index&quot;</span>] = <span class="hljs-number">1</span>, [<span class="hljs-string">&quot;class&quot;</span>] = <span class="hljs-string">&quot;green&quot;</span>, [<span class="hljs-string">&quot;bbox&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">5f</span>, <span class="hljs-number">6f</span>, <span class="hljs-number">7f</span>, <span class="hljs-number">8f</span> } }
            },
            [<span class="hljs-string">&quot;captions&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">object</span>[]
            {
                <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
                {
                    [<span class="hljs-string">&quot;frame_id&quot;</span>] = <span class="hljs-number">0L</span>,
                    [<span class="hljs-string">&quot;plain_caption&quot;</span>] = <span class="hljs-string">&quot;Merge left while yielding to oncoming traffic&quot;</span>,
                    [<span class="hljs-string">&quot;plain_cap_vector&quot;</span>] = vector768,
                    [<span class="hljs-string">&quot;rich_caption&quot;</span>] = <span class="hljs-string">&quot;Merge left while yielding to oncoming traffic on a sunny highway&quot;</span>,
                    [<span class="hljs-string">&quot;rich_cap_vector&quot;</span>] = vector768,
                    [<span class="hljs-string">&quot;risk&quot;</span>] = <span class="hljs-string">&quot;Potential collision with the leading vehicle&quot;</span>,
                    [<span class="hljs-string">&quot;risk_vector&quot;</span>] = vector768,
                    [<span class="hljs-string">&quot;risk_correct&quot;</span>] = <span class="hljs-literal">true</span>,
                    [<span class="hljs-string">&quot;risk_yes_rate&quot;</span>] = <span class="hljs-number">0.9f</span>,
                    [<span class="hljs-string">&quot;weather&quot;</span>] = <span class="hljs-string">&quot;sunny&quot;</span>,
                    [<span class="hljs-string">&quot;weather_rate&quot;</span>] = <span class="hljs-number">0.9f</span>,
                    [<span class="hljs-string">&quot;road&quot;</span>] = <span class="hljs-string">&quot;highway&quot;</span>,
                    [<span class="hljs-string">&quot;road_rate&quot;</span>] = <span class="hljs-number">0.9f</span>,
                    [<span class="hljs-string">&quot;is_tunnel&quot;</span>] = <span class="hljs-literal">false</span>,
                    [<span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>] = <span class="hljs-number">0.1f</span>,
                    [<span class="hljs-string">&quot;is_highway&quot;</span>] = <span class="hljs-literal">true</span>,
                    [<span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>] = <span class="hljs-number">0.9f</span>,
                    [<span class="hljs-string">&quot;has_pedestrian&quot;</span>] = <span class="hljs-literal">false</span>,
                    [<span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>] = <span class="hljs-number">0.1f</span>,
                    [<span class="hljs-string">&quot;has_carrier_car&quot;</span>] = <span class="hljs-literal">false</span>
                }
            },
            [<span class="hljs-string">&quot;front_cars&quot;</span>] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">object</span>[]
            {
                <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;frame_id&quot;</span>] = <span class="hljs-number">0L</span>, [<span class="hljs-string">&quot;has_lead&quot;</span>] = <span class="hljs-literal">true</span>, [<span class="hljs-string">&quot;lead_prob&quot;</span>] = <span class="hljs-number">0.9f</span>, [<span class="hljs-string">&quot;lead_x&quot;</span>] = <span class="hljs-number">5.5f</span>, [<span class="hljs-string">&quot;lead_y&quot;</span>] = <span class="hljs-number">0f</span>, [<span class="hljs-string">&quot;lead_speed_kmh&quot;</span>] = <span class="hljs-number">40f</span>, [<span class="hljs-string">&quot;lead_a&quot;</span>] = <span class="hljs-number">0f</span> }
            }
        }
    ]
});
<button class="copy-code-btn"></button></code></pre>
