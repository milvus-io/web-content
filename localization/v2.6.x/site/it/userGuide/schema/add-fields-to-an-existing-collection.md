---
id: add-fields-to-an-existing-collection.md
title: Aggiungere campi a una raccolta esistenteCompatible with Milvus 2.6.x
summary: >-
  Milvus consente di aggiungere dinamicamente nuovi campi alle raccolte
  esistenti, facilitando l'evoluzione dello schema dei dati in base alle
  esigenze dell'applicazione. Questa guida mostra come aggiungere campi in
  diversi scenari utilizzando esempi pratici.
beta: Milvus 2.6.x
---
<h1 id="Add-Fields-to-an-Existing-Collection" class="common-anchor-header">Aggiungere campi a una raccolta esistente<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-Fields-to-an-Existing-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus consente di aggiungere dinamicamente nuovi campi alle raccolte esistenti, facilitando l'evoluzione dello schema dei dati in base alle esigenze dell'applicazione. Questa guida mostra come aggiungere campi in diversi scenari, utilizzando esempi pratici.</p>
<h2 id="Considerations" class="common-anchor-header">Considerazioni<button data-href="#Considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di aggiungere campi alla vostra collezione, tenete a mente questi punti importanti:</p>
<ul>
<li><p>È possibile aggiungere campi scalari (<code translate="no">INT64</code>, <code translate="no">VARCHAR</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, ecc.). I campi vettoriali non possono essere aggiunti a collezioni esistenti.</p></li>
<li><p>I nuovi campi devono essere nullable (nullable=True), in modo da poter ospitare entità esistenti che non hanno valori per il nuovo campo.</p></li>
<li><p>L'aggiunta di campi alle raccolte caricate aumenta l'utilizzo della memoria.</p></li>
<li><p>C'è un limite massimo di campi per collezione. Per maggiori dettagli, consultare <a href="/docs/it/limitations.md#Number-of-resources-in-a-collection">Limiti di Milvus</a>.</p></li>
<li><p>I nomi dei campi devono essere unici tra i campi statici.</p></li>
<li><p>Non è possibile aggiungere un campo <code translate="no">$meta</code> per abilitare la funzionalità di campo dinamico per collezioni che non sono state originariamente create con <code translate="no">enable_dynamic_field=True</code>.</p></li>
</ul>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa guida presuppone che si disponga di:</p>
<ul>
<li><p>Un'istanza Milvus in esecuzione</p></li>
<li><p>L'SDK Milvus installato</p></li>
<li><p>Una raccolta esistente</p></li>
</ul>
<div class="alert note">
<p>Per la creazione della collezione e le operazioni di base, consultare la sezione <a href="/docs/it/create-collection.md">Crea collezione</a>.</p>
</div>
<h2 id="Basic-usage" class="common-anchor-header">Utilizzo di base<button data-href="#Basic-usage" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Scenario-1-Quickly-add-nullable-fields" class="common-anchor-header">Scenario 1: Aggiungere rapidamente campi nullable<button data-href="#Scenario-1-Quickly-add-nullable-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Il modo più semplice per estendere la raccolta è aggiungere campi nullable. Questo è perfetto quando si ha bisogno di aggiungere rapidamente nuovi attributi ai dati.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a nullable field to an existing collection</span>
<span class="hljs-comment"># This operation:</span>
<span class="hljs-comment"># - Returns almost immediately (non-blocking)</span>
<span class="hljs-comment"># - Makes the field available for use with minimal delay</span>
<span class="hljs-comment"># - Sets NULL for all existing entities</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    field_name=<span class="hljs-string">&quot;created_timestamp&quot;</span>,  <span class="hljs-comment"># Name of the new field to add</span>
    data_type=DataType.INT64,        <span class="hljs-comment"># Data type must be a scalar type</span>
    nullable=<span class="hljs-literal">True</span>                    <span class="hljs-comment"># Must be True for added fields</span>
    <span class="hljs-comment"># Allows NULL values for existing entities</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-to-expect" class="common-anchor-header">Cosa aspettarsi</h3><ul>
<li><p>Le<strong>entità esistenti</strong> avranno NULL per il nuovo campo</p></li>
<li><p>Le<strong>nuove entità</strong> possono avere valori NULL o effettivi</p></li>
<li><p><strong>La disponibilità del campo</strong> avviene quasi immediatamente, con un ritardo minimo dovuto alla sincronizzazione interna dello schema.</p></li>
<li><p><strong>Interrogabile immediatamente</strong> dopo il breve periodo di sincronizzazione.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query result</span>
{
    <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, 
    <span class="hljs-string">&#x27;created_timestamp&#x27;</span>: <span class="hljs-literal">None</span>  <span class="hljs-comment"># New field shows NULL for existing entities</span>
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Scenario-2-Add-fields-with-default-values" class="common-anchor-header">Scenario 2: Aggiunta di campi con valori predefiniti<button data-href="#Scenario-2-Add-fields-with-default-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si desidera che le entità esistenti abbiano un valore iniziale significativo invece di NULL, specificare i valori predefiniti.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a field with default value</span>
<span class="hljs-comment"># This operation:</span>
<span class="hljs-comment"># - Sets the default value for all existing entities</span>
<span class="hljs-comment"># - Makes the field available with minimal delay</span>
<span class="hljs-comment"># - Maintains data consistency with the default value</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    field_name=<span class="hljs-string">&quot;priority_level&quot;</span>,     <span class="hljs-comment"># Name of the new field</span>
    data_type=DataType.VARCHAR,      <span class="hljs-comment"># String type field</span>
    max_length=<span class="hljs-number">20</span>,                   <span class="hljs-comment"># Maximum string length</span>
    nullable=<span class="hljs-literal">True</span>,                   <span class="hljs-comment"># Required for added fields</span>
    default_value=<span class="hljs-string">&quot;standard&quot;</span>         <span class="hljs-comment"># Value assigned to existing entities</span>
    <span class="hljs-comment"># Also used for new entities if no value provided</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-to-expect" class="common-anchor-header">Cosa aspettarsi</h3><ul>
<li><p>Le<strong>entità esistenti</strong> avranno il valore predefinito (<code translate="no">&quot;standard&quot;</code>) per il nuovo campo aggiunto.</p></li>
<li><p>Le<strong>nuove entità</strong> possono sovrascrivere il valore predefinito o utilizzarlo se non viene fornito alcun valore</p></li>
<li><p><strong>La disponibilità del campo</strong> avviene quasi immediatamente con un ritardo minimo</p></li>
<li><p><strong>Interrogabile subito</strong> dopo il breve periodo di sincronizzazione</p></li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Example query result</span>
{
    <span class="hljs-string">&#x27;id&#x27;</span>: 1,
    <span class="hljs-string">&#x27;priority_level&#x27;</span>: <span class="hljs-string">&#x27;standard&#x27;</span>  <span class="hljs-comment"># Shows default value for existing entities</span>
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="FAQ" class="common-anchor-header">DOMANDE FREQUENTI<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-I-enable-dynamic-schema-functionality-by-adding-a-meta-field" class="common-anchor-header">Posso abilitare la funzionalità di schema dinamico aggiungendo un campo <code translate="no">$meta</code>?</h3><p>No, non è possibile utilizzare <code translate="no">add_collection_field</code> per aggiungere un campo <code translate="no">$meta</code> per abilitare la funzionalità di campo dinamico. Lo schema dinamico deve essere abilitato al momento della creazione della collezione, impostando <code translate="no">enable_dynamic_field=True</code> nello schema.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># ❌ This is NOT supported</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;existing_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;$meta&quot;</span>,
    data_type=DataType.JSON  <span class="hljs-comment"># This operation will fail</span>
)

<span class="hljs-comment"># ✅ Dynamic field must be enabled during collection creation</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    dimension=<span class="hljs-number">5</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-happens-when-I-add-a-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">Cosa succede quando si aggiunge un campo con lo stesso nome di una chiave di campo dinamico?</h3><p>Quando la collezione è abilitata alla funzione di campo dinamico (esiste<code translate="no">$meta</code> ), è possibile aggiungere campi statici che hanno lo stesso nome delle chiavi di campo dinamiche esistenti. Il nuovo campo statico maschererà la chiave del campo dinamico, ma i dati dinamici originali saranno conservati.</p>
<p><strong>Scenario di esempio:</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Original collection with dynamic field enabled</span>
<span class="hljs-comment"># Insert data with dynamic field keys</span>
data = [{
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, ...],
    <span class="hljs-string">&quot;extra_info&quot;</span>: <span class="hljs-string">&quot;this is a dynamic field key&quot;</span>,  <span class="hljs-comment"># Dynamic field key as string</span>
    <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">99.5</span>                                 <span class="hljs-comment"># Another dynamic field key</span>
}]
client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=data)

<span class="hljs-comment"># Add static field with same name as existing dynamic field key</span>
client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    field_name=<span class="hljs-string">&quot;extra_info&quot;</span>,         <span class="hljs-comment"># Same name as dynamic field key</span>
    data_type=DataType.INT64,        <span class="hljs-comment"># Data type can differ from dynamic field key</span>
    nullable=<span class="hljs-literal">True</span>                    <span class="hljs-comment"># Must be True for added fields</span>
)

<span class="hljs-comment"># Insert new data after adding static field</span>
new_data = [{
    <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, ...],
    <span class="hljs-string">&quot;extra_info&quot;</span>: <span class="hljs-number">100</span>,               <span class="hljs-comment"># Now must use INT64 type (static field)</span>
    <span class="hljs-string">&quot;score&quot;</span>: <span class="hljs-number">88.0</span>                    <span class="hljs-comment"># Still a dynamic field key</span>
}]
client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=new_data)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Cosa aspettarsi:</strong></p>
<ul>
<li><p>Le<strong>entità esistenti</strong> avranno NULL per il nuovo campo statico. <code translate="no">extra_info</code></p></li>
<li><p>Le<strong>nuove entità</strong> devono utilizzare il tipo di dati del campo statico (<code translate="no">INT64</code>).</p></li>
<li><p>I<strong>valori originali delle chiavi dei campi dinamici</strong> sono conservati e accessibili tramite la sintassi di <code translate="no">$meta</code>.</p></li>
<li><p><strong>Il campo statico maschera la chiave del campo dinamico</strong> nelle normali interrogazioni.</p></li>
</ul>
<p><strong>Accesso ai valori statici e dinamici:</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. Query static field only (dynamic field key is masked)</span>
results = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id == 1&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;extra_info&quot;</span>]
)
<span class="hljs-comment"># Returns: {&quot;id&quot;: 1, &quot;extra_info&quot;: None}  # NULL for existing entity</span>

<span class="hljs-comment"># 2. Query both static and original dynamic values</span>
results = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, 
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id == 1&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;extra_info&quot;</span>, <span class="hljs-string">&quot;$meta[&#x27;extra_info&#x27;]&quot;</span>]
)
<span class="hljs-comment"># Returns: {</span>
<span class="hljs-comment">#     &quot;id&quot;: 1,</span>
<span class="hljs-comment">#     &quot;extra_info&quot;: None,                           # Static field value (NULL)</span>
<span class="hljs-comment">#     &quot;$meta[&#x27;extra_info&#x27;]&quot;: &quot;this is a dynamic field key&quot;  # Original dynamic value</span>
<span class="hljs-comment"># }</span>

<span class="hljs-comment"># 3. Query new entity with static field value</span>
results = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id == 2&quot;</span>, 
    output_fields=[<span class="hljs-string">&quot;extra_info&quot;</span>]
)
<span class="hljs-comment"># Returns: {&quot;id&quot;: 2, &quot;extra_info&quot;: 100}  # Static field value</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="How-long-does-it-take-for-a-new-field-to-become-available" class="common-anchor-header">Quanto tempo ci vuole perché un nuovo campo sia disponibile?</h3><p>I campi aggiunti diventano disponibili quasi immediatamente, ma può esserci un breve ritardo dovuto alla trasmissione delle modifiche interne allo schema nel cluster Milvus. Questa sincronizzazione assicura che tutti i nodi siano a conoscenza dell'aggiornamento dello schema prima di elaborare le query che coinvolgono il nuovo campo.</p>
