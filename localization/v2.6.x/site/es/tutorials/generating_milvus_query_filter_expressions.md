---
id: generating_milvus_query_filter_expressions.md
summary: >-
  En este tutorial, demostraremos cómo utilizar Modelos de Lenguaje Amplio (LLM)
  para generar automáticamente expresiones de filtro Milvus a partir de
  consultas en lenguaje natural. Este enfoque hace que la consulta de bases de
  datos vectoriales sea más accesible al permitir a los usuarios expresar
  condiciones de filtrado complejas en inglés sencillo, que luego se convierten
  a la sintaxis Milvus adecuada.
title: >-
  Generar Expresiones de Filtro de Consulta Milvus con Grandes Modelos de
  Lenguaje
---
<h1 id="Generating-Milvus-Query-Filter-Expressions-with-Large-Language-Models" class="common-anchor-header">Generar Expresiones de Filtro de Consulta Milvus con Grandes Modelos de Lenguaje<button data-href="#Generating-Milvus-Query-Filter-Expressions-with-Large-Language-Models" class="anchor-icon" translate="no">
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
    </button></h1><p>En este tutorial, demostraremos cómo utilizar Modelos de Lenguaje Grande (LLMs) para generar automáticamente expresiones de filtro Milvus a partir de consultas en lenguaje natural. Este enfoque hace que la consulta de bases de datos vectoriales sea más accesible al permitir a los usuarios expresar condiciones de filtrado complejas en inglés sencillo, que luego se convierten a la sintaxis Milvus adecuada.</p>
<p>Milvus admite sofisticadas capacidades de filtrado, entre las que se incluyen:</p>
<ul>
<li><strong>Operadores básicos</strong>: Operadores de comparación como <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code></li>
<li><strong>Operadores booleanos</strong>: Operadores lógicos como <code translate="no">and</code>, <code translate="no">or</code>, <code translate="no">not</code> para condiciones complejas</li>
<li><strong>Operaciones con cadenas</strong>: Comparación de patrones con <code translate="no">like</code> y otras funciones de cadena</li>
<li><strong>Operaciones con matrices</strong>: Trabajo con campos de array utilizando <code translate="no">array_contains</code>, <code translate="no">array_length</code>, etc.</li>
<li><strong>Operaciones JSON</strong>: Consulta de campos JSON con operadores especializados</li>
</ul>
<p>Integrando los LLM con la documentación de Milvus, podemos crear un sistema inteligente que entienda las consultas en lenguaje natural y genere expresiones de filtro sintácticamente correctas. Este tutorial recorrerá el proceso de configuración de este sistema, destacando su eficacia en varios escenarios de filtrado.</p>
<h2 id="Dependencies-and-Environment" class="common-anchor-header">Dependencias y entorno<button data-href="#Dependencies-and-Environment" class="anchor-icon" translate="no">
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
<h2 id="Set-up-environment-variables" class="common-anchor-header">Configurar variables de entorno<button data-href="#Set-up-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Configure sus credenciales de la API de OpenAI para permitir la generación de incrustaciones y la creación de expresiones de filtro basadas en LLM. Sustituya <code translate="no">'your_openai_api_key'</code> por su clave de API de OpenAI real.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> openai

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your_openai_api_key&quot;</span>
api_key = os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>)

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> api_key:
    <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;Please set the OPENAI_API_KEY environment variable!&quot;</span>)

openai.api_key = api_key
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;API key loaded.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-Sample-Collection" class="common-anchor-header">Crear una colección de muestra<button data-href="#Create-a-Sample-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Ahora vamos a crear una colección Milvus de muestra con datos de usuario. Esta colección contendrá tanto campos escalares (para filtrado) como incrustaciones vectoriales (para búsqueda semántica). Utilizaremos el modelo de incrustación de texto de OpenAI para generar representaciones vectoriales de la información del usuario.</p>
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
<h2 id="Print-3-sample-data" class="common-anchor-header">Imprimir 3 datos de muestra<button data-href="#Print-3-sample-data" class="anchor-icon" translate="no">
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
    </button></h2><p>El código anterior crea una colección Milvus con la siguiente estructura:</p>
<ul>
<li><strong>pk</strong>: Campo clave primaria (VARCHAR)</li>
<li><strong>name</strong>: Nombre de usuario (VARCHAR)</li>
<li><strong>age</strong>: Edad del usuario (INT64)</li>
<li><strong>ciudad</strong>: Ciudad del usuario (VARCHAR)</li>
<li><strong>hobby</strong>: Afición del usuario (VARCHAR)</li>
<li><strong>incrustación</strong>: Incrustación vectorial (FLOAT_VECTOR, 1536 dimensiones)</li>
</ul>
<p>Hemos insertado 11 usuarios de muestra con su información personal y generamos incrustaciones para las capacidades de búsqueda semántica. La información de cada usuario se convierte en un texto descriptivo que recoge su nombre, ubicación, edad e intereses antes de ser incrustado. Verifiquemos que nuestra colección se ha creado correctamente y que contiene los datos esperados consultando algunos registros de muestra.</p>
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
<h2 id="Collecting-Milvus-Filter-Expression-Documentation" class="common-anchor-header">Recopilación de documentación de expresiones de filtro Milvus<button data-href="#Collecting-Milvus-Filter-Expression-Documentation" class="anchor-icon" translate="no">
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
    </button></h2><p>Para ayudar al gran modelo de lenguaje a entender mejor la sintaxis de las expresiones de filtrado de Milvus, necesitamos proporcionarle documentación oficial relevante. Utilizaremos la biblioteca <code translate="no">docling</code> para extraer varias páginas clave del sitio web oficial de Milvus.</p>
<p>Estas páginas contienen información detallada sobre:</p>
<ul>
<li><strong>Operadores booleanos</strong>: <code translate="no">and</code>, <code translate="no">or</code>, <code translate="no">not</code> para condiciones lógicas complejas</li>
<li><strong>Operadores básicos</strong>: Operadores de comparación como <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code></li>
<li><strong>Patrones</strong> de<strong>filtrado</strong>: Patrones y sintaxis de filtrado avanzados</li>
<li><strong>Coincidencia de</strong> cadenas: Coincidencia de patrones con <code translate="no">like</code> y otras operaciones con cadenas</li>
</ul>
<p>Esta documentación servirá de base de conocimientos para que nuestro LLM genere expresiones de filtrado precisas.</p>
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
<p>El raspado de la documentación proporciona una cobertura exhaustiva de la sintaxis de los filtros Milvus. Esta base de conocimientos permitirá a nuestro LLM comprender los matices de la construcción de expresiones de filtrado, incluido el uso adecuado de operadores, la referencia a campos y las combinaciones de condiciones complejas.</p>
<h2 id="LLM-Powered-Filter-Generation" class="common-anchor-header">Generación de filtros con LLM<button data-href="#LLM-Powered-Filter-Generation" class="anchor-icon" translate="no">
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
    </button></h2><p>Ahora que tenemos el contexto de la documentación, configuremos el sistema LLM para generar expresiones de filtro. Crearemos una consulta estructurada que combine la documentación extraída con las consultas del usuario para producir expresiones de filtro Milvus sintácticamente correctas.</p>
<p>Nuestro sistema de generación de filtros utiliza un indicador cuidadosamente elaborado que:</p>
<ol>
<li><strong>Proporciona contexto</strong>: Incluye la documentación completa de Milvus como material de referencia</li>
<li><strong>Establece restricciones</strong>: Garantiza que el LLM sólo utilice la sintaxis y las características documentadas.</li>
<li><strong>Exige precisión</strong>: Requiere expresiones sintácticamente correctas</li>
<li><strong>Mantiene el enfoque</strong>: Devuelve sólo la expresión filtrada sin explicaciones</li>
</ol>
<p>Probemos esto con una consulta en lenguaje natural y veamos qué tal funciona el LLM.</p>
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
<p>El LLM ha generado correctamente una expresión de filtro que combina varias condiciones:</p>
<ul>
<li>Comparación de edad mediante <code translate="no">&gt;</code></li>
<li>Comparación de varias ciudades mediante el operador <code translate="no">in</code> </li>
<li>Sintaxis y referencias de campo correctas</li>
</ul>
<p>Esto demuestra el poder de proporcionar un contexto de documentación completo para guiar la generación de filtros LLM.</p>
<h2 id="Test-the-Generated-Filter" class="common-anchor-header">Prueba del filtro generado<button data-href="#Test-the-Generated-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Ahora vamos a probar nuestra expresión de filtro generada utilizándola en una operación de búsqueda Milvus real. Combinaremos la búsqueda semántica con un filtrado preciso para encontrar usuarios que coincidan tanto con la intención de la consulta como con los criterios específicos.</p>
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
<h2 id="Results-Analysis" class="common-anchor-header">Análisis de resultados<button data-href="#Results-Analysis" class="anchor-icon" translate="no">
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
    </button></h2><p>Los resultados de la búsqueda demuestran el éxito de la integración de los filtros generados por LLM con la búsqueda vectorial de Milvus. El filtro identificó correctamente a los usuarios que:</p>
<ul>
<li>Tienen más de 30 años</li>
<li>Viven en Londres, Tokio o Toronto</li>
<li>Coinciden con el contexto semántico de la consulta</li>
</ul>
<p>Este enfoque combina la precisión del filtrado estructurado con la flexibilidad de la entrada en lenguaje natural, lo que hace que las bases de datos vectoriales sean más accesibles para los usuarios que pueden no estar familiarizados con la sintaxis específica de la consulta.</p>
