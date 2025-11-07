---
id: timestamptz-field.md
title: Campo TIMESTAMPTZCompatible with Milvus 2.6.4+
summary: >-
  Le applicazioni che tengono traccia dell'ora da una regione all'altra, come i
  sistemi di e-commerce, gli strumenti di collaborazione o la registrazione
  distribuita, hanno bisogno di una gestione precisa dei timestamp con i fusi
  orari. Il tipo di dati TIMESTAMPTZ di Milvus offre questa possibilità,
  memorizzando i timestamp con il fuso orario associato.
beta: Milvus 2.6.4+
---
<h1 id="TIMESTAMPTZ-Field" class="common-anchor-header">Campo TIMESTAMPTZ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#TIMESTAMPTZ-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Le applicazioni che tengono traccia dell'ora da una regione all'altra, come i sistemi di e-commerce, gli strumenti di collaborazione o la registrazione distribuita, hanno bisogno di una gestione precisa dei timestamp con i fusi orari. Il tipo di dati <code translate="no">TIMESTAMPTZ</code> di Milvus offre questa possibilità, memorizzando i timestamp con il fuso orario associato.</p>
<h2 id="What-is-a-TIMESTAMPTZ-field" class="common-anchor-header">Che cos'è un campo TIMESTAMPTZ?<button data-href="#What-is-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Un campo <code translate="no">TIMESTAMPTZ</code> è un tipo di dati definito dallo schema (<code translate="no">DataType.TIMESTAMPTZ</code>) in Milvus che memorizza timestamp con fusi orari espliciti:</p>
<ul>
<li><p><strong>Formato di input accettato</strong>: Stringhe <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> con un offset di fuso orario (ad esempio, <code translate="no">&quot;2025-05-01T23:59:59+08:00&quot;</code> rappresenta le 11:59:59 PM in UTC+08:00).</p></li>
<li><p><strong>Memorizzazione interna</strong>: Tutti i valori di <code translate="no">TIMESTAMPTZ</code> sono normalizzati e memorizzati in <a href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time">tempo universale coordinato</a> (UTC).</p></li>
<li><p><strong>Confronto e filtraggio</strong>: Tutte le operazioni di filtraggio e ordinamento vengono eseguite in UTC, garantendo risultati coerenti e prevedibili in diversi fusi orari.</p></li>
</ul>
<div class="alert note">
<ul>
<li><p>È possibile impostare <code translate="no">nullable=True</code> per i campi <code translate="no">TIMESTAMPTZ</code> in modo da consentire valori mancanti.</p></li>
<li><p>È possibile specificare un valore di timestamp predefinito utilizzando l'attributo <code translate="no">default_value</code> nel formato <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>.</p></li>
</ul>
<p>Per maggiori dettagli, vedere <a href="/docs/it/nullable-and-default.md">Nullable e Default</a>.</p>
</div>
<h2 id="Basic-operations" class="common-anchor-header">Operazioni di base<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Il flusso di lavoro di base per l'utilizzo di un campo <code translate="no">TIMESTAMPTZ</code> rispecchia gli altri campi scalari di Milvus: definire il campo → inserire i dati → interrogare/filtrare.</p>
<h3 id="Step-1-Define-a-TIMESTAMPTZ-field" class="common-anchor-header">Passo 1: Definire un campo TIMESTAMPTZ<button data-href="#Step-1-Define-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Per utilizzare un campo <code translate="no">TIMESTAMPTZ</code>, è necessario definirlo esplicitamente nello schema della raccolta durante la creazione della stessa. L'esempio seguente mostra come creare una collezione con un campo <code translate="no">tsz</code> di tipo <code translate="no">DataType.TIMESTAMPTZ</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> datetime
<span class="hljs-keyword">import</span> pytz

server_address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
collection_name = <span class="hljs-string">&quot;timestamptz_test123&quot;</span>

client = MilvusClient(uri=server_address)

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema()
<span class="hljs-comment"># Add a primary key field</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="hljs-comment"># Add a TIMESTAMPTZ field that allows null values</span>
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;tsz&quot;</span>, DataType.TIMESTAMPTZ, nullable=<span class="hljs-literal">True</span>)</span>
<span class="hljs-comment"># Add a vector field</span>
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)

client.create_collection(collection_name, schema=schema, consistency_level=<span class="hljs-string">&quot;Session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; with a TimestampTz field created successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-data" class="common-anchor-header">Passo 2: Inserire i dati<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Inserire entità contenenti stringhe ISO 8601 con offset di fuso orario.</p>
<p>L'esempio seguente inserisce 8.193 righe di dati di esempio nella raccolta. Ogni riga include</p>
<ul>
<li><p>un ID univoco</p></li>
<li><p>un timestamp che tiene conto del fuso orario (ora di Shanghai)</p></li>
<li><p>un semplice vettore a 4 dimensioni</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data_size = <span class="hljs-number">8193</span>

<span class="hljs-comment"># Get the Asia/Shanghai time zone using the pytz library</span>
<span class="hljs-comment"># You can use any valid IANA time zone identifier such as:</span>
<span class="hljs-comment">#   &quot;Asia/Tokyo&quot;, &quot;America/New_York&quot;, &quot;Europe/London&quot;, &quot;UTC&quot;, etc.</span>
<span class="hljs-comment"># To view all available values:</span>
<span class="hljs-comment">#   import pytz; print(pytz.all_timezones)</span>
<span class="hljs-comment"># Reference:</span>
<span class="hljs-comment">#   IANA database – https://www.iana.org/time-zones</span>
<span class="hljs-comment">#   Wikipedia – https://en.wikipedia.org/wiki/List_of_tz_database_time_zones</span>
shanghai_tz = pytz.timezone(<span class="hljs-string">&quot;Asia/Shanghai&quot;</span>)

data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i + <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;tsz&quot;</span>: shanghai_tz.localize(
            datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>) + datetime.timedelta(days=i)
        ).isoformat(),
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-built_in">float</span>(i) / <span class="hljs-number">10</span> <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">4</span>)],
    }
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(data_size)
]

client.insert(collection_name, data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data inserted successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">Passo 3: operazioni di filtraggio<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">TIMESTAMPTZ</code> supporta i confronti scalari, l'aritmetica degli intervalli e l'estrazione delle componenti temporali.</p>
<p>Prima di poter eseguire operazioni di filtraggio sui campi di <code translate="no">TIMESTAMPTZ</code>, assicurarsi che:</p>
<ul>
<li><p>Sia stato creato un indice su ciascun campo vettoriale.</p></li>
<li><p>L'insieme sia stato caricato in memoria.</p></li>
</ul>
<p><details></p>
<p><summary>Mostra un esempio di codice</summary></p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index on vector field</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vec&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;vec_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
client.create_index(collection_name, index_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Index created successfully.&quot;</span>)

<span class="hljs-comment"># Load the collection</span>
client.load_collection(collection_name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; loaded successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h4 id="Query-with-timestamp-filtering" class="common-anchor-header">Query con filtraggio del timestamp</h4><p>Utilizzare operatori aritmetici come <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;=</code>. Per un elenco completo degli operatori aritmetici disponibili in Milvus, consultare <a href="/docs/it/basic-operators.md#Arithmetic-Operators">Operatori aritmetici</a>.</p>
<p>L'esempio seguente filtra le entità con timestamp (<code translate="no">tsz</code>) che non sono uguali a <strong>2025-01-03T00:00:00+08:00</strong>:</p>
<div class="multipleCode">
   <a href="#bash">cURL</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Query for entities where tsz is not equal to &#x27;2025-01-03T00:00:00+08:00&#x27;</span>
<span class="highlighted-wrapper-line"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name=collection_name,
    filter=<span class="hljs-built_in">expr</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
    <span class="hljs-built_in">limit</span>=10
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: &#x27;2024-12-31T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: &#x27;2025-01-01T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;tsz&#x27;: &#x27;2025-01-03T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 5, &#x27;tsz&#x27;: &#x27;2025-01-04T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 6, &#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 7, &#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 8, &#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 9, &#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 10, &#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 11, &#x27;tsz&#x27;: &#x27;2025-01-10T16:00:00Z&#x27;}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nell'esempio precedente,</p>
<ul>
<li><p><code translate="no">tsz</code> è il nome del campo <code translate="no">TIMESTAMPTZ</code> definito nello schema.</p></li>
<li><p><code translate="no">ISO '2025-01-03T00:00:00+08:00'</code> è un letterale di timestamp nel formato <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>, compreso l'offset del fuso orario.</p></li>
<li><p><code translate="no">!=</code> confronta il valore del campo con tale letterale. Altri operatori supportati sono <code translate="no">==</code>, <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code> e <code translate="no">&gt;=</code>.</p></li>
</ul>
<h4 id="Interval-operations" class="common-anchor-header">Operazioni sugli intervalli</h4><p>È possibile eseguire operazioni aritmetiche sui campi <code translate="no">TIMESTAMPTZ</code> utilizzando i valori <strong>INTERVALLO</strong> nel <a href="https://en.wikipedia.org/wiki/ISO_8601#Durations">formato di durata ISO 8601</a>. Ciò consente di aggiungere o sottrarre durate, come giorni, ore o minuti, da un timestamp quando si filtrano i dati.</p>
<p>Ad esempio, la query seguente filtra le entità in cui il timestamp (<code translate="no">tsz</code>) più zero giorni <strong>non è uguale</strong> a <strong>2025-01-03T00:00:00+08:00</strong>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="highlighted-wrapper-line">expr = <span class="hljs-string">&quot;tsz + INTERVAL &#x27;P0D&#x27; != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name, 
    <span class="hljs-built_in">filter</span>=expr, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>], 
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: &#x27;2024-12-31T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: &#x27;2025-01-01T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;tsz&#x27;: &#x27;2025-01-03T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 5, &#x27;tsz&#x27;: &#x27;2025-01-04T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 6, &#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 7, &#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 8, &#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 9, &#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 10, &#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 11, &#x27;tsz&#x27;: &#x27;2025-01-10T16:00:00Z&#x27;}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">INTERVAL</code> I valori seguono la <a href="https://www.w3.org/TR/xmlschema-2/#duration">sintassi</a> di <a href="https://www.w3.org/TR/xmlschema-2/#duration">durata ISO 8601</a>. Ad esempio:</p>
<ul>
<li><p><code translate="no">P1D</code> → 1 giorno</p></li>
<li><p><code translate="no">PT3H</code> → 3 ore</p></li>
<li><p><code translate="no">P2DT6H</code> → 2 giorni e 6 ore</p></li>
</ul>
<p>È possibile utilizzare l'aritmetica di <code translate="no">INTERVAL</code> direttamente nelle espressioni di filtro, come ad esempio:</p>
<ul>
<li><p><code translate="no">tsz + INTERVAL 'P3D'</code> → Aggiunge 3 giorni</p></li>
<li><p><code translate="no">tsz - INTERVAL 'PT2H'</code> → Sottrae 2 ore</p></li>
</ul>
</div>
<h4 id="Extract-timestamp-elements" class="common-anchor-header">Estrarre gli elementi del timestamp</h4><p>È possibile estrarre componenti specifici dai campi <code translate="no">TIMESTAMPTZ</code>, come l'anno, il mese o il giorno, utilizzando il parametro <code translate="no">time_fields</code> nella query o nella ricerca.</p>
<p>L'esempio seguente estrae gli elementi <code translate="no">year</code>, <code translate="no">month</code> e <code translate="no">day</code> da ciascun campo <code translate="no">TIMESTAMPTZ</code> nei risultati della query:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">results = client.query(
    collection_name,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id &lt;= 10&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
<span class="highlighted-wrapper-line">    time_fields=<span class="hljs-string">&quot;year, month, day&quot;</span>,</span>
    limit=<span class="hljs-number">2</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: [2024, 12, 31]}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: [2025, 1, 1]}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Elementi supportati per l'estrazione</strong></p>
<table>
   <tr>
     <th><p>Elemento</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Esempio di output</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">year</code></p></td>
     <td><p>Componente dell'anno</p></td>
     <td><p><code translate="no">2025</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">month</code></p></td>
     <td><p>Numero del mese</p></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">day</code></p></td>
     <td><p>Giorno del mese</p></td>
     <td><p><code translate="no">3</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hour</code></p></td>
     <td><p>Ora (0-23)</p></td>
     <td><p><code translate="no">14</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">minute</code></p></td>
     <td><p>Minuti</p></td>
     <td><p><code translate="no">30</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">second</code></p></td>
     <td><p>Secondo</p></td>
     <td><p><code translate="no">5</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">microsecond</code></p></td>
     <td><p>Microsecondo</p></td>
     <td><p><code translate="no">123456</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>Il parametro <code translate="no">time_fields</code> è una stringa separata da virgole (ad esempio, <code translate="no">&quot;year, month, day&quot;</code>).</p></li>
<li><p>Il risultato viene restituito come un array di componenti estratti (ad esempio, <code translate="no">[2024, 12, 31]</code>).</p></li>
</ul>
</div>
<h4 id="Search-with-timestamp-filtering" class="common-anchor-header">Ricerca con filtraggio del timestamp</h4><p>È possibile combinare il filtraggio di <code translate="no">TIMESTAMPTZ</code> con la ricerca di similarità vettoriale per restringere i risultati sia in base al tempo che alla similarità.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define a time-based filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;tsz &gt; ISO &#x27;2025-01-05T00:00:00+08:00&#x27;&quot;</span>

res = client.search(
    collection_name=collection_name,             <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]],                  <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                                      <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                                <span class="hljs-comment"># Filter expression using TIMESTAMPTZ</span></span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],  <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search result: &quot;</span>, res)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Search result:  data: [[{&#x27;id&#x27;: 10, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;, &#x27;id&#x27;: 10}}, {&#x27;id&#x27;: 9, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;, &#x27;id&#x27;: 9}}, {&#x27;id&#x27;: 8, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;, &#x27;id&#x27;: 8}}, {&#x27;id&#x27;: 7, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;, &#x27;id&#x27;: 7}}, {&#x27;id&#x27;: 6, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;, &#x27;id&#x27;: 6}}]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se la raccolta ha due o più campi vettoriali, è possibile eseguire operazioni di ricerca ibride con il filtraggio del timestamp. Per maggiori dettagli, consultare la sezione <a href="/docs/it/multi-vector-search.md">Ricerca ibrida multivettoriale</a>.</p>
</div>
<h2 id="Advanced-usage" class="common-anchor-header">Uso avanzato<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Per un uso avanzato, è possibile gestire i fusi orari a diversi livelli (ad esempio, database, collezione o query) o accelerare le query sui campi <code translate="no">TIMESTAMPTZ</code> usando gli indici.</p>
<h3 id="Manage-time-zones-at-different-levels" class="common-anchor-header">Gestione dei fusi orari a diversi livelli<button data-href="#Manage-time-zones-at-different-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>È possibile controllare il fuso orario per i campi di <code translate="no">TIMESTAMPTZ</code> a livello di <strong>database</strong>, <strong>raccolta</strong> o <strong>query/ricerca</strong>.</p>
<table>
   <tr>
     <th><p>Livello</p></th>
     <th><p>Parametro</p></th>
     <th><p>Ambito</p></th>
     <th><p>Priorità</p></th>
   </tr>
   <tr>
     <td><p>Database</p></td>
     <td><p><code translate="no">database.timezone</code></p></td>
     <td><p>Predefinito per tutte le raccolte del database</p></td>
     <td><p>Più basso</p></td>
   </tr>
   <tr>
     <td><p>Collezione</p></td>
     <td><p><code translate="no">collection.timezone</code></p></td>
     <td><p>Sovrascrive l'impostazione predefinita del fuso orario del database per quella raccolta</p></td>
     <td><p>Media</p></td>
   </tr>
   <tr>
     <td><p>Query/ricerca/ricerca ibrida</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>Sovrascrittura temporanea per un'operazione specifica</p></td>
     <td><p>Massima</p></td>
   </tr>
</table>
<p>Per istruzioni passo-passo ed esempi di codice, consultare le pagine dedicate:</p>
<ul>
<li><p><a href="/docs/it/modify-collection.md#Example-6-Set-collection-time-zone">Modifica della collezione</a></p></li>
<li><p><a href="/docs/it/manage_databases.md#Manage-database-properties">Database</a></p></li>
<li><p><a href="/docs/it/get-and-scalar-query.md#Temporarily-set-a-timezone-for-a-query">Interrogazione</a></p></li>
<li><p><a href="/docs/it/single-vector-search.md#Temporarily-set-a-timezone-for-a-search">Ricerca vettoriale di base</a></p></li>
<li><p><a href="/docs/it/multi-vector-search.md">Ricerca ibrida multivettoriale</a></p></li>
</ul>
<h3 id="Accelerate-queries" class="common-anchor-header">Accelerare le query<button data-href="#Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Per impostazione predefinita, le query sui campi <code translate="no">TIMESTAMPTZ</code> senza indice eseguono una scansione completa di tutte le righe, che può essere lenta su grandi insiemi di dati. Per accelerare le query sui timestamp, creare un indice <code translate="no">STL_SORT</code> sul campo <code translate="no">TIMESTAMPTZ</code>.</p>
<p>Per i dettagli, consultare <a href="https://zilliverse.feishu.cn/wiki/YBYmwvx68iMKFRknytJccwk0nPf">STL_SORT</a>.</p>
