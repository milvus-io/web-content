---
id: generating_milvus_query_filter_expressions.md
summary: >-
  In diesem Tutorial wird gezeigt, wie man Large Language Models (LLMs)
  verwendet, um automatisch Milvus-Filterausdrücke aus natürlichsprachlichen
  Abfragen zu erzeugen. Dieser Ansatz macht die Abfrage von Vektordatenbanken
  zugänglicher, da Benutzer komplexe Filterbedingungen in einfachem Englisch
  ausdrücken können, die dann in die richtige Milvus-Syntax umgewandelt werden.
title: Generierung von Milvus-Abfragefilterausdrücken mit großen Sprachmodellen
---
<h1 id="Generating-Milvus-Query-Filter-Expressions-with-Large-Language-Models" class="common-anchor-header">Generierung von Milvus-Abfragefilterausdrücken mit großen Sprachmodellen<button data-href="#Generating-Milvus-Query-Filter-Expressions-with-Large-Language-Models" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Tutorial wird gezeigt, wie man Large Language Models (LLMs) verwendet, um automatisch Milvus-Filterausdrücke aus natürlichsprachlichen Abfragen zu generieren. Dieser Ansatz macht die Abfrage von Vektordatenbanken zugänglicher, da Benutzer komplexe Filterbedingungen in einfachem Englisch ausdrücken können, die dann in die richtige Milvus-Syntax umgewandelt werden.</p>
<p>Milvus unterstützt ausgefeilte Filterfunktionen, darunter:</p>
<ul>
<li><strong>Grundlegende Operatoren</strong>: Vergleichsoperatoren wie <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code></li>
<li><strong>Boolesche Operatoren</strong>: Logische Operatoren wie <code translate="no">and</code>, <code translate="no">or</code>, <code translate="no">not</code> für komplexe Bedingungen</li>
<li><strong>String-Operationen</strong>: Mustervergleich mit <code translate="no">like</code> und anderen String-Funktionen</li>
<li><strong>Array-Operationen</strong>: Arbeiten mit Array-Feldern mit <code translate="no">array_contains</code>, <code translate="no">array_length</code>, etc.</li>
<li><strong>JSON-Operationen</strong>: Abfrage von JSON-Feldern mit spezialisierten Operatoren</li>
</ul>
<p>Durch die Integration von LLMs mit der Milvus-Dokumentation können wir ein intelligentes System schaffen, das natürlichsprachliche Abfragen versteht und syntaktisch korrekte Filterausdrücke erzeugt. Dieses Tutorial führt durch den Prozess der Einrichtung dieses Systems und zeigt seine Effektivität in verschiedenen Filterszenarien auf.</p>
<h2 id="Dependencies-and-Environment" class="common-anchor-header">Abhängigkeiten und Umgebung<button data-href="#Dependencies-and-Environment" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests docling beautifulsoup4</span>
print(&quot;Environment setup complete!&quot;)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-environment-variables" class="common-anchor-header">Einrichten von Umgebungsvariablen<button data-href="#Set-up-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Konfigurieren Sie Ihre OpenAI-API-Zugangsdaten, um die Einbettungsgenerierung und die LLM-basierte Erstellung von Filterausdrücken zu ermöglichen. Ersetzen Sie <code translate="no">'your_openai_api_key'</code> durch Ihren tatsächlichen OpenAI-API-Schlüssel.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> openai

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your_openai_api_key&quot;</span>
api_key = os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>)

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> api_key:
    <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;Please set the OPENAI_API_KEY environment variable!&quot;</span>)

openai.api_key = api_key
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;API key loaded.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-Sample-Collection" class="common-anchor-header">Erstellen Sie eine Beispielsammlung<button data-href="#Create-a-Sample-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Lassen Sie uns nun eine Milvus-Beispielsammlung mit Benutzerdaten erstellen. Diese Sammlung wird sowohl skalare Felder (für die Filterung) als auch Vektoreinbettungen (für die semantische Suche) enthalten. Wir werden OpenAIs Text-Einbettungsmodell verwenden, um Vektordarstellungen von Benutzerinformationen zu erzeugen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">import</span> uuid

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
openai_client = OpenAI(api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>))
embedding_model = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>
embedding_dim = <span class="hljs-number">1536</span>

fields = [
    FieldSchema(
        name=<span class="hljs-string">&quot;pk&quot;</span>,
        dtype=DataType.VARCHAR,
        is_primary=<span class="hljs-literal">True</span>,
        auto_id=<span class="hljs-literal">False</span>,
        max_length=<span class="hljs-number">100</span>,
    ),
    FieldSchema(name=<span class="hljs-string">&quot;name&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">128</span>),
    FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64),
    FieldSchema(name=<span class="hljs-string">&quot;city&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">128</span>),
    FieldSchema(name=<span class="hljs-string">&quot;hobby&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">128</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=embedding_dim),
]
schema = CollectionSchema(fields=fields, description=<span class="hljs-string">&quot;User data embedding example&quot;</span>)
collection_name = <span class="hljs-string">&quot;user_data_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)
<span class="hljs-comment"># Strong consistency waits for all loads to complete, adding latency with large datasets</span>
<span class="hljs-comment"># client.create_collection(</span>
<span class="hljs-comment">#     collection_name=collection_name, schema=schema, consistency_level=&quot;Strong&quot;</span>
<span class="hljs-comment"># )</span>
client.create_collection(collection_name=collection_name, schema=schema)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
)
client.create_index(collection_name=collection_name, index_params=index_params)

data_to_insert = [
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;John&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">23</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Shanghai&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Drinking coffee&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Alice&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">29</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;New York&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Reading books&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Bob&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">31</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;London&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Playing chess&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Eve&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">27</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Paris&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Painting&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Charlie&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">35</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Tokyo&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Cycling&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Grace&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">22</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Berlin&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Photography&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;David&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">40</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Toronto&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Watching movies&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Helen&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Sydney&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Cooking&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Frank&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">28</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Beijing&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Hiking&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Ivy&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">26</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Seoul&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Dancing&quot;</span>},
    {<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Tom&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">33</span>, <span class="hljs-string">&quot;city&quot;</span>: <span class="hljs-string">&quot;Madrid&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>: <span class="hljs-string">&quot;Writing&quot;</span>},
]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embeddings</span>(<span class="hljs-params">texts</span>):
    <span class="hljs-keyword">return</span> [
        rec.embedding
        <span class="hljs-keyword">for</span> rec <span class="hljs-keyword">in</span> openai_client.embeddings.create(
            <span class="hljs-built_in">input</span>=texts, model=embedding_model, dimensions=embedding_dim
        ).data
    ]


texts = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{item[<span class="hljs-string">&#x27;name&#x27;</span>]}</span> from <span class="hljs-subst">{item[<span class="hljs-string">&#x27;city&#x27;</span>]}</span> is <span class="hljs-subst">{item[<span class="hljs-string">&#x27;age&#x27;</span>]}</span> years old and likes <span class="hljs-subst">{item[<span class="hljs-string">&#x27;hobby&#x27;</span>]}</span>.&quot;</span>
    <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> data_to_insert
]
embeddings = get_embeddings(texts)

insert_data = []
<span class="hljs-keyword">for</span> item, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(data_to_insert, embeddings):
    item_with_embedding = {
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-built_in">str</span>(uuid.uuid4()),
        <span class="hljs-string">&quot;name&quot;</span>: item[<span class="hljs-string">&quot;name&quot;</span>],
        <span class="hljs-string">&quot;age&quot;</span>: item[<span class="hljs-string">&quot;age&quot;</span>],
        <span class="hljs-string">&quot;city&quot;</span>: item[<span class="hljs-string">&quot;city&quot;</span>],
        <span class="hljs-string">&quot;hobby&quot;</span>: item[<span class="hljs-string">&quot;hobby&quot;</span>],
        <span class="hljs-string">&quot;embedding&quot;</span>: embedding,
    }
    insert_data.append(item_with_embedding)

client.insert(collection_name=collection_name, data=insert_data)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; has been created and data has been inserted.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Print-3-sample-data" class="common-anchor-header">Drucken von 3 Beispieldaten<button data-href="#Print-3-sample-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Der obige Code erzeugt eine Milvus-Sammlung mit der folgenden Struktur:</p>
<ul>
<li><strong>pk</strong>: Primärschlüsselfeld (VARCHAR)</li>
<li><strong>name</strong>: Nutzername (VARCHAR)</li>
<li><strong>Alter</strong>: Alter des Benutzers (INT64)</li>
<li><strong>Stadt</strong>: Ort des Benutzers (VARCHAR)</li>
<li><strong>Hobby</strong>: Benutzer Hobby (VARCHAR)</li>
<li><strong>Einbettung</strong>: Vektoreinbettung (FLOAT_VECTOR, 1536 Dimensionen)</li>
</ul>
<p>Wir haben 11 Beispielbenutzer mit ihren persönlichen Informationen eingefügt und generieren Einbettungen für semantische Suchfunktionen. Die Informationen jedes Benutzers werden in einen beschreibenden Text umgewandelt, der den Namen, den Ort, das Alter und die Interessen erfasst, bevor sie eingebettet werden. Überprüfen wir, ob unsere Sammlung erfolgreich erstellt wurde und die erwarteten Daten enthält, indem wir ein paar Beispieldatensätze abfragen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;user_data_collection&quot;</span>

client.load_collection(collection_name=collection_name)

result = client.query(
    collection_name=collection_name,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)

<span class="hljs-keyword">for</span> record <span class="hljs-keyword">in</span> result:
    <span class="hljs-built_in">print</span>(record)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Collecting-Milvus-Filter-Expression-Documentation" class="common-anchor-header">Sammeln der Milvus-Filterausdruck-Dokumentation<button data-href="#Collecting-Milvus-Filter-Expression-Documentation" class="anchor-icon" translate="no">
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
    </button></h2><p>Damit das große Sprachmodell die Syntax der Milvus-Filterausdrücke besser verstehen kann, müssen wir es mit der entsprechenden offiziellen Dokumentation versorgen. Wir werden die Bibliothek <code translate="no">docling</code> verwenden, um mehrere Schlüsselseiten von der offiziellen Milvus-Website zu scrapen.</p>
<p>Diese Seiten enthalten detaillierte Informationen über:</p>
<ul>
<li><strong>Boolesche Operatoren</strong>: <code translate="no">and</code>, <code translate="no">or</code>, <code translate="no">not</code> für komplexe logische Bedingungen</li>
<li><strong>Grundlegende Operatoren</strong>: Vergleichsoperatoren wie <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code></li>
<li><strong>Filterungsvorlagen</strong>: Erweiterte Filtermuster und Syntax</li>
<li><strong>String-Matching</strong>: Mustervergleich mit <code translate="no">like</code> und anderen String-Operationen</li>
</ul>
<p>Diese Dokumentation dient als Wissensbasis für unseren LLM, um genaue Filterausdrücke zu erzeugen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> docling
<span class="hljs-keyword">from</span> docling.document_converter <span class="hljs-keyword">import</span> DocumentConverter

converter = DocumentConverter()
docs = [
    converter.convert(url)
    <span class="hljs-keyword">for</span> url <span class="hljs-keyword">in</span> [
        <span class="hljs-string">&quot;https://milvus.io/docs/boolean.md&quot;</span>,
        <span class="hljs-string">&quot;https://milvus.io/docs/basic-operators.md&quot;</span>,
        <span class="hljs-string">&quot;https://milvus.io/docs/filtering-templating.md&quot;</span>,
    ]
]

<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs[:<span class="hljs-number">3</span>]:
    <span class="hljs-built_in">print</span>(doc.document.export_to_markdown())
<button class="copy-code-btn"></button></code></pre>
<p>Das Scraping der Dokumentation bietet eine umfassende Abdeckung der Milvus-Filtersyntax. Diese Wissensbasis wird unseren LLM in die Lage versetzen, die Feinheiten der Konstruktion von Filterausdrücken zu verstehen, einschließlich der richtigen Verwendung von Operatoren, Feldreferenzen und komplexen Bedingungskombinationen.</p>
<h2 id="LLM-Powered-Filter-Generation" class="common-anchor-header">LLM-gestützte Filtergenerierung<button data-href="#LLM-Powered-Filter-Generation" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem wir nun den Dokumentationskontext haben, wollen wir das LLM-System so einrichten, dass es Filterausdrücke generiert. Wir werden eine strukturierte Eingabeaufforderung erstellen, die die gescrapte Dokumentation mit Benutzerabfragen kombiniert, um syntaktisch korrekte Milvus-Filterausdrücke zu erzeugen.</p>
<p>Unser System zur Filtergenerierung verwendet eine sorgfältig ausgearbeitete Eingabeaufforderung, die:</p>
<ol>
<li><strong>Kontext bereitstellt</strong>: Die komplette Milvus-Dokumentation als Referenzmaterial einbezieht</li>
<li><strong>Beschränkungen festlegt</strong>: Sicherstellt, dass der LLM nur dokumentierte Syntax und Funktionen verwendet</li>
<li><strong>Genauigkeit erzwingt</strong>: Erfordert syntaktisch korrekte Ausdrücke</li>
<li><strong>Behält den Fokus</strong> bei: Gibt nur den Filterausdruck ohne Erklärungen zurück</li>
</ol>
<p>Lassen Sie uns dies mit einer Abfrage in natürlicher Sprache testen und sehen, wie gut der LLM funktioniert.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display, Markdown

context = <span class="hljs-string">&quot;\n&quot;</span>.join([doc.document.export_to_markdown() <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs])

prompt = <span class="hljs-string">f&quot;&quot;&quot;
You are an expert Milvus vector database engineer. Your task is to convert a user&#x27;s natural language query into a valid Milvus filter expression, using the provided Milvus documentation as your knowledge base.

Follow these rules strictly:
1. Only use the provided documents as your source of knowledge.
2. Ensure the generated filter expression is syntactically correct.
3. If there isn&#x27;t enough information in the documents to create an expression, state that directly.
4. Only return the final filter expression. Do not include any explanations or extra text.

---
**Milvus Documentation Context:**
<span class="hljs-subst">{context}</span>

---
**User Query:**
<span class="hljs-subst">{user_query}</span>

---
**Filter Expression:**
&quot;&quot;&quot;</span>

client = OpenAI()


<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_filter_expr</span>(<span class="hljs-params">user_query</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Generates a Milvus filter expression from a user query using GPT-4o-mini.
    &quot;&quot;&quot;</span>
    completion = client.chat.completions.create(
        model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
        messages=[
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: prompt},
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_query},
        ],
        temperature=<span class="hljs-number">0.0</span>,
    )
    <span class="hljs-keyword">return</span> completion.choices[<span class="hljs-number">0</span>].message.content


user_query = <span class="hljs-string">&quot;Find people older than 30 who live in London, Tokyo, or Toronto&quot;</span>

filter_expr = generate_filter_expr(user_query)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Generated filter expression: <span class="hljs-subst">{filter_expr}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Der LLM hat erfolgreich einen Filterausdruck generiert, der mehrere Bedingungen kombiniert:</p>
<ul>
<li>Altersvergleich mit <code translate="no">&gt;</code></li>
<li>Abgleich mehrerer Städte mit dem Operator <code translate="no">in</code> </li>
<li>Korrekte Feldreferenzierung und Syntax</li>
</ul>
<p>Dies demonstriert die Stärke der Bereitstellung eines umfassenden Dokumentationskontextes, um die LLM-Filtergenerierung anzuleiten.</p>
<h2 id="Test-the-Generated-Filter" class="common-anchor-header">Testen Sie den generierten Filter<button data-href="#Test-the-Generated-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Lassen Sie uns nun unseren generierten Filterausdruck testen, indem wir ihn in einem tatsächlichen Milvus-Suchvorgang verwenden. Wir werden die semantische Suche mit einer präzisen Filterung kombinieren, um Benutzer zu finden, die sowohl der Abfrageabsicht als auch den spezifischen Kriterien entsprechen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">import</span> os

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
openai_client = OpenAI(api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>))

clean_filter = (
    filter_expr.replace(<span class="hljs-string">&quot;```&quot;</span>, <span class="hljs-string">&quot;&quot;</span>).replace(<span class="hljs-string">&#x27;filter=&quot;&#x27;</span>, <span class="hljs-string">&quot;&quot;</span>).replace(<span class="hljs-string">&#x27;&quot;&#x27;</span>, <span class="hljs-string">&quot;&quot;</span>).strip()
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Using filter: <span class="hljs-subst">{clean_filter}</span>&quot;</span>)

query_embedding = (
    openai_client.embeddings.create(
        <span class="hljs-built_in">input</span>=[user_query], model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>, dimensions=<span class="hljs-number">1536</span>
    )
    .data[<span class="hljs-number">0</span>]
    .embedding
)

search_results = client.search(
    collection_name=<span class="hljs-string">&quot;user_data_collection&quot;</span>,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,
    <span class="hljs-built_in">filter</span>=clean_filter,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>, <span class="hljs-string">&quot;hobby&quot;</span>],
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    },
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search results:&quot;</span>)
<span class="hljs-keyword">for</span> i, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(search_results):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Query <span class="hljs-subst">{i}</span>:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  - <span class="hljs-subst">{hit}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Results-Analysis" class="common-anchor-header">Analyse der Ergebnisse<button data-href="#Results-Analysis" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Suchergebnisse zeigen die erfolgreiche Integration von LLM-generierten Filtern mit der Milvus-Vektorsuche. Der Filter identifizierte korrekt Benutzer, die:</p>
<ul>
<li>älter als 30 Jahre sind</li>
<li>in London, Tokio oder Toronto leben</li>
<li>mit dem semantischen Kontext der Suchanfrage übereinstimmen</li>
</ul>
<p>Dieser Ansatz kombiniert die Präzision strukturierter Filter mit der Flexibilität natürlichsprachlicher Eingaben und macht Vektordatenbanken auch für Nutzer zugänglich, die mit der spezifischen Abfragesyntax nicht vertraut sind.</p>
