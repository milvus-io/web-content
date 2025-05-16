---
id: schema.md
summary: Imparare a definire uno schema in Milvus.
title: Gestire gli schemi
---
<h1 id="Manage-Schema" class="common-anchor-header">Gestire gli schemi<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento introduce lo schema in Milvus. Lo schema viene utilizzato per definire le proprietà di una collezione e i campi al suo interno.</p>
<h2 id="Field-schema" class="common-anchor-header">Schema del campo<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Lo schema di un campo è la definizione logica di un campo. È la prima cosa da definire prima di definire uno <a href="#Collection-schema">schema di collezione</a> e di <a href="/docs/it/v2.4.x/manage-collections.md">gestire le collezioni</a>.</p>
<p>Milvus supporta solo un campo chiave primaria in una collezione.</p>
<h3 id="Field-schema-properties" class="common-anchor-header">Proprietà dello schema di campo</h3><table class="properties">
    <thead>
    <tr>
        <th>Proprietà</th>
        <th>Descrizione</th>
        <th>Nota</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>Nome del campo della collezione da creare</td>
        <td>Tipo di dati: Stringa.<br/>Obbligatorio</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>Tipo di dati del campo</td>
        <td>Obbligatorio</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Descrizione del campo</td>
        <td>Tipo di dati: Stringa.<br/>Opzionale</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>Se impostare il campo come chiave primaria o meno</td>
        <td>Tipo di dati: Booleano (<code translate="no">true</code> o <code translate="no">false</code>).<br/>Obbligatorio per il campo chiave primaria</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (Obbligatorio per il campo chiave primaria)</td>
            <td>Interruttore per abilitare o disabilitare l'assegnazione automatica dell'ID (chiave primaria).</td>
            <td><code translate="no">True</code> o <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (Obbligatorio per il campo VARCHAR)</td>
            <td>Lunghezza massima di byte per le stringhe che possono essere inserite. Si noti che i caratteri multibyte (ad esempio, i caratteri Unicode) possono occupare più di un byte ciascuno, quindi assicurarsi che la lunghezza in byte delle stringhe inserite non superi il limite specificato.</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>Dimensione del vettore</td>
            <td>Tipo di dati: Integer &isin;[1, 32768].<br/>Obbligatorio per un campo vettoriale denso. Omettere per un campo <a href="https://milvus.io/docs/sparse_vector.md">vettoriale rado</a>.</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>Se questo campo è un campo a chiave di partizione.</td>
        <td>Tipo di dati: Booleano (<code translate="no">true</code> o <code translate="no">false</code>).</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">Creare uno schema di campo</h3><p>Per ridurre la complessità degli inserimenti di dati, Milvus consente di specificare un valore predefinito per ogni campo scalare durante la creazione dello schema di campo, escluso il campo chiave primaria. Ciò significa che se si lascia un campo vuoto durante l'inserimento dei dati, si applica il valore predefinito specificato per questo campo.</p>
<p>Creare uno schema di campo regolare:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Crea uno schema di campo con valori di campo predefiniti:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">Tipi di dati supportati</h3><p><code translate="no">DataType</code> definisce il tipo di dati che un campo contiene. Campi diversi supportano tipi di dati diversi.</p>
<ul>
<li><p>Il campo chiave primaria supporta:</p>
<ul>
<li>INT64: numpy.int64</li>
<li>VARCHAR: VARCHAR</li>
</ul></li>
<li><p>Il campo scalare supporta:</p>
<ul>
<li>BOOL: booleano (<code translate="no">true</code> o <code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FIATO: numpy.float32</li>
<li>DOPPIO: numpy.double</li>
<li>VARCHAR: VARCHAR</li>
<li>JSON: <a href="/docs/it/v2.4.x/use-json-fields.md">JSON</a></li>
<li>Array: <a href="/docs/it/v2.4.x/array_data_type.md">Array</a></li>
</ul>
<p>È disponibile JSON come tipo di dati composito. Un campo JSON comprende coppie chiave-valore. Ogni chiave è una stringa e il valore può essere un numero, una stringa, un valore booleano, un array o un elenco. Per maggiori dettagli, consultare <a href="/docs/it/v2.4.x/use-json-fields.md">JSON: un nuovo tipo di dati</a>.</p></li>
<li><p>Il campo vettore supporta:</p>
<ul>
<li>BINARY_VECTOR: memorizza dati binari come sequenza di 0 e 1, utilizzati per la rappresentazione compatta delle caratteristiche nell'elaborazione delle immagini e nel recupero delle informazioni.</li>
<li>FLOAT_VECTOR: memorizza numeri a virgola mobile a 32 bit, comunemente usati nell'informatica scientifica e nell'apprendimento automatico per rappresentare i numeri reali.</li>
<li>FLOAT16_VECTOR: memorizza numeri in virgola mobile a mezza precisione a 16 bit, utilizzati nell'apprendimento profondo e nei calcoli su GPU per l'efficienza della memoria e della larghezza di banda.</li>
<li>BFLOAT16_VECTOR: memorizza numeri in virgola mobile a 16 bit con precisione ridotta ma con lo stesso intervallo di esponenti di Float32, utilizzati nel deep learning per ridurre i requisiti di memoria e di calcolo senza impattare significativamente sulla precisione.</li>
<li>SPARSE_FLOAT_VECTOR: memorizza un elenco di elementi non nulli e i loro indici corrispondenti, utilizzati per rappresentare vettori sparsi. Per ulteriori informazioni, consultare <a href="/docs/it/v2.4.x/sparse_vector.md">Vettori sparsi</a>.</li>
</ul>
<p>Milvus supporta campi vettoriali multipli in un insieme. Per ulteriori informazioni, consultare la sezione <a href="/docs/it/v2.4.x/multi-vector-search.md">Ricerca ibrida</a>.</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">Schema della collezione<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Lo schema di una collezione è la definizione logica di una collezione. Di solito è necessario definire lo <a href="#Field-schema">schema dei campi</a> prima di definire uno schema di raccolta e <a href="/docs/it/v2.4.x/manage-collections.md">gestire le raccolte</a>.</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">Proprietà dello schema di raccolta</h3><table class="properties">
    <thead>
    <tr>
        <th>Proprietà</th>
        <th>Descrizione</th>
        <th>Nota</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>Campi della collezione da creare</td>
        <td>Obbligatorio</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Descrizione della collezione</td>
        <td>Tipo di dati: Stringa.<br/>Opzionale</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>Nome di un campo destinato a fungere da chiave di partizione.</td>
        <td>Tipo di dati: Stringa.<br/>Opzionale</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>Se abilitare o meno lo schema dinamico</td>
        <td>Tipo di dati: Booleano (<code translate="no">true</code> o <code translate="no">false</code>).<br/>Opzionale, per impostazione predefinita <code translate="no">False</code>.<br/>Per informazioni dettagliate sullo schema dinamico, consultare <a herf="enable-dynamic-field.md">Schema dinamico</a> e le guide utente per la gestione delle raccolte.</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">Creare uno schema di raccolta</h3><div class="alert note">
  Definire gli schemi dei campi prima di definire uno schema di raccolta.</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Creare una raccolta con lo schema specificato:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>,connections
conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>È possibile definire il numero di shard con <code translate="no">shards_num</code>.</li>
<li>È possibile definire il server Milvus su cui si desidera creare una raccolta specificando l'alias in <code translate="no">using</code>.</li>
<li>È possibile abilitare la funzione di chiave di partizione su un campo impostando <code translate="no">is_partition_key</code> su <code translate="no">True</code> se si desidera implementare la <a href="/docs/it/v2.4.x/multi_tenancy.md">multi-tenancy basata su chiavi di partizione</a>.</li>
<li>È possibile abilitare lo schema dinamico impostando <code translate="no">enable_dynamic_field</code> su <code translate="no">True</code> nello schema della raccolta, se si desidera <a href="/docs/it/v2.4.x/enable-dynamic-field.md">abilitare un campo dinamico</a>.</li>
</ul>
</div>
<p><br/>
Si può anche creare una collezione con <code translate="no">Collection.construct_from_dataframe</code>, che genera automaticamente uno schema di collezione da DataFrame e crea una collezione.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
    <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;position&quot;</span>: <span class="hljs-string">&quot;test_pos&quot;</span>
})

collection, ins_res = Collection.construct_from_dataframe(
    <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    df,
    primary_field=<span class="hljs-string">&#x27;id&#x27;</span>,
    auto_id=<span class="hljs-literal">False</span>
    )
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Cosa succede dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Imparare a preparare lo schema quando si <a href="/docs/it/v2.4.x/manage-collections.md">gestiscono le raccolte</a>.</li>
<li>Per saperne di più sullo <a href="/docs/it/v2.4.x/enable-dynamic-field.md">schema dinamico</a>.</li>
<li>Per saperne di più sulla chiave di partizione in <a href="/docs/it/v2.4.x/multi_tenancy.md">Multi-tenancy</a>.</li>
</ul>
