---
id: inverted.md
title: INVERTITO
summary: >-
  L'indice INVERTED di Milvus è stato progettato per accelerare le query di
  filtro su campi scalari e campi JSON strutturati. Grazie alla mappatura dei
  termini ai documenti o ai record che li contengono, gli indici invertiti
  migliorano notevolmente le prestazioni delle query rispetto alle ricerche
  brute-force.
---
<h1 id="INVERTED" class="common-anchor-header">INVERTITO<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice <code translate="no">INVERTED</code> di Milvus è stato progettato per accelerare le query di filtro sia su campi scalari che su campi JSON strutturati. Mappando i termini ai documenti o ai record che li contengono, gli indici invertiti migliorano notevolmente le prestazioni delle query rispetto alle ricerche brute-force.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Basato su <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, Milvus implementa l'indicizzazione invertita per accelerare le query di filtraggio, soprattutto per i dati testuali. Ecco come funziona:</p>
<ol>
<li><p><strong>Tokenizzare i dati</strong>: Milvus prende i dati grezzi - in questo esempio, due frasi:</p>
<ul>
<li><p><strong>"Milvus è un database vettoriale cloud-native".</strong></p></li>
<li><p><strong>"Milvus è molto bravo nelle prestazioni".</strong></p></li>
</ul>
<p>e le scompone in parole uniche (ad esempio, <em>Milvus</em>, <em>è</em>, <em>cloud-nativo</em>, <em>vettoriale</em>, <em>database</em>, <em>molto</em>, <em>bene</em>, <em>a</em>, <em>prestazioni</em>).</p></li>
<li><p><strong>Costruire il dizionario dei termini</strong>: Queste parole uniche vengono memorizzate in un elenco ordinato chiamato <strong>Dizionario dei termini</strong>. Questo dizionario consente a Milvus di verificare rapidamente l'esistenza di una parola e di individuarne la posizione nell'indice.</p></li>
<li><p><strong>Creare l'elenco invertito</strong>: Per ogni parola del Dizionario dei termini, Milvus conserva un <strong>Elenco invertito</strong> che mostra quali documenti contengono quella parola. Ad esempio, <strong>"Milvus"</strong> compare in entrambe le frasi, quindi l'elenco invertito indica gli ID di entrambi i documenti.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
   </span> <span class="img-wrapper"> <span>Invertito</span> </span></p>
<p>Poiché il dizionario è ordinato, il filtraggio basato sui termini può essere gestito in modo efficiente. Invece di analizzare tutti i documenti, Milvus si limita a cercare il termine nel dizionario e a recuperarne l'elenco invertito, velocizzando notevolmente le ricerche e i filtri su grandi insiemi di dati.</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">Indicizzare un campo scalare regolare<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Per i campi scalari come <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong> e <strong>ARRAY</strong>, la creazione di un indice invertito è semplice. Utilizzare il metodo <code translate="no">create_index()</code> con il parametro <code translate="no">index_type</code> impostato su <code translate="no">&quot;INVERTED&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">Indicizzare un campo JSON<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus estende le sue capacità di indicizzazione ai campi JSON, consentendo di filtrare in modo efficiente su dati annidati o strutturati memorizzati in una singola colonna. A differenza dei campi scalari, per indicizzare un campo JSON è necessario fornire due parametri aggiuntivi:</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong> Specifica la chiave annidata da indicizzare.</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong> Definisce il tipo di dati (ad esempio, <code translate="no">&quot;varchar&quot;</code>, <code translate="no">&quot;double&quot;</code>, o <code translate="no">&quot;bool&quot;</code>) in cui il valore JSON estratto verrà convertito.</p></li>
</ul>
<p>Ad esempio, si consideri un campo JSON denominato <code translate="no">metadata</code> con la seguente struttura:</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>Per creare indici invertiti su percorsi JSON specifici, è possibile utilizzare il seguente approccio:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Esempio Valore</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Nome del campo JSON nello schema.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Tipo di indice da creare; attualmente solo <code translate="no">INVERTED</code> è supportato per l'indicizzazione dei percorsi JSON.</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(Facoltativo) Un nome di indice personalizzato. Specificare nomi diversi se si creano più indici sullo stesso campo JSON.</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>Specifica quale percorso JSON indicizzare. Si può puntare su chiavi annidate, su posizioni di array o su entrambi (ad esempio, <code translate="no">metadata["product_info"]["category"]</code> o <code translate="no">metadata["tags"][0]</code>). Se il percorso manca o l'elemento dell'array non esiste per una determinata riga, quella riga viene semplicemente saltata durante l'indicizzazione e non viene lanciato alcun errore.</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>Tipo di dati in cui Milvus trasformerà i valori JSON estratti durante la creazione dell'indice. Valori validi:</p>
<ul>
<li><p><code translate="no">"bool"</code> o <code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> o <code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> o <code translate="no">"VARCHAR"</code></p>
<p><strong>Nota</strong>: Per i valori interi, Milvus utilizza internamente double per l'indice. I numeri interi di dimensioni superiori a 2^53 perdono precisione. Se il cast fallisce (a causa di una mancata corrispondenza di tipo), non viene lanciato alcun errore e il valore di quella riga non viene indicizzato.</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">Considerazioni sull'indicizzazione di JSON<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
<li><p><strong>Logica di filtraggio</strong>:</p>
<ul>
<li><p>Se si <strong>crea un indice di tipo doppio</strong> (<code translate="no">json_cast_type=&quot;double&quot;</code>), solo le condizioni di filtro di tipo numerico possono utilizzare l'indice. Se il filtro confronta un indice doppio con una condizione non numerica, Milvus ricorre alla ricerca bruta.</p></li>
<li><p>Se si <strong>crea un indice di tipo varchar</strong> (<code translate="no">json_cast_type=&quot;varchar&quot;</code>), solo le condizioni di filtro di tipo stringa possono utilizzare l'indice. Altrimenti, Milvus ricorre alla forza bruta.</p></li>
<li><p>L'indicizzazione<strong>booleana</strong> si comporta in modo simile a quella di tipo varchar.</p></li>
</ul></li>
<li><p><strong>Espressioni di termine</strong>:</p>
<ul>
<li>È possibile utilizzare <code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code>. Tuttavia, l'indice funziona solo per i valori scalari memorizzati in quel percorso. Se <code translate="no">json[&quot;field&quot;]</code> è un array, la query ricade nella forza bruta (l'indicizzazione di tipo array non è ancora supportata).</li>
</ul></li>
<li><p><strong>Precisione numerica</strong>:</p>
<ul>
<li>Internamente, Milvus indicizza tutti i campi numerici come doppi. Se un valore numerico supera <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2532^{53}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53</span></span></span></span></span></span></span></span></span></span></span></span>, perde precisione e le query su questi valori fuori range potrebbero non corrispondere esattamente.</li>
</ul></li>
<li><p><strong>Integrità dei dati</strong>:</p>
<ul>
<li>Milvus non analizza né trasforma le chiavi JSON al di là del casting specificato. Se i dati di origine sono incoerenti (ad esempio, alcune righe memorizzano una stringa per la chiave <code translate="no">&quot;k&quot;</code> mentre altre memorizzano un numero), alcune righe non saranno indicizzate.</li>
</ul></li>
</ul>
