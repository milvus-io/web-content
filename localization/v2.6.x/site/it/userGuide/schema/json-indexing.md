---
id: json-indexing.md
title: Indicizzazione JSON
summary: >-
  I campi JSON rappresentano un modo flessibile per memorizzare metadati
  strutturati in Milvus. Senza indicizzazione, le interrogazioni sui campi JSON
  richiedono la scansione dell'intera collezione, che diventa lenta con la
  crescita del set di dati. L'indicizzazione JSON consente di effettuare
  ricerche rapide creando indici all'interno dei dati JSON.
---
<h1 id="JSON-Indexing" class="common-anchor-header">Indicizzazione JSON<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>I campi JSON offrono un modo flessibile per memorizzare metadati strutturati in Milvus. Senza indicizzazione, le interrogazioni sui campi JSON richiedono la scansione dell'intera collezione, che diventa lenta con la crescita del set di dati. L'indicizzazione JSON consente di effettuare ricerche rapide creando indici all'interno dei dati JSON.</p>
<p>L'indicizzazione JSON è ideale per:</p>
<ul>
<li><p>Schemi strutturati con chiavi coerenti e note</p></li>
<li><p>Query di uguaglianza e di intervallo su percorsi JSON specifici</p></li>
<li><p>scenari in cui è necessario un controllo preciso sulle chiavi indicizzate</p></li>
<li><p>Accelerazione efficiente in termini di storage di query mirate</p></li>
</ul>
<div class="alert note">
<p>Per documenti JSON complessi con schemi di query diversi, considerate l'alternativa di <a href="/docs/it/json-shredding.md">JSON Shredding</a>.</p>
</div>
<h2 id="JSON-indexing-syntax" class="common-anchor-header">Sintassi dell'indicizzazione JSON<button data-href="#JSON-indexing-syntax" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si crea un indice JSON, si specifica:</p>
<ul>
<li><p><strong>Percorso JSON</strong>: La posizione esatta dei dati che si desidera indicizzare.</p></li>
<li><p><strong>Tipo di cast dei dati</strong>: Come interpretare e memorizzare i valori indicizzati</p></li>
<li><p><strong>Conversione di tipo opzionale</strong>: Trasformare i dati durante l'indicizzazione, se necessario</p></li>
</ul>
<p>Ecco la sintassi per indicizzare un campo JSON:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;&lt;json_field_name&gt;&quot;</span>,  <span class="hljs-comment"># Name of the JSON field</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Must be AUTOINDEX or INVERTED</span>
    index_name=<span class="hljs-string">&quot;&lt;unique_index_name&gt;&quot;</span>,  <span class="hljs-comment"># Index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;&lt;path_to_json_key&gt;&quot;</span>,  <span class="hljs-comment"># Specific key to be indexed within JSON data</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;&lt;data_type&gt;&quot;</span>,  <span class="hljs-comment"># Data type to use when interpreting and indexing the value</span>
        <span class="hljs-comment"># &quot;json_cast_function&quot;: &quot;&lt;cast_function&gt;&quot;  # Optional: convert key values into a target type at index time</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore / Esempio</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Il nome del campo JSON nello schema della raccolta.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Deve essere <code translate="no">"AUTOINDEX"</code> o <code translate="no">"INVERTED"</code> per l'indicizzazione JSON.</p></td>
     <td><p><code translate="no">"AUTOINDEX"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>Identificatore univoco per questo indice.</p></td>
     <td><p><code translate="no">"category_index"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_path</code></p></td>
     <td><p>Il percorso della chiave che si vuole indicizzare nell'oggetto JSON.</p></td>
     <td><ul><li><p>Chiave di primo livello: <code translate="no">'metadata["category"]'</code></p></li><li><p>Chiave annidata: <code translate="no">'metadata["supplier"]["contact"]["email"]'</code></p></li><li><p>Intero oggetto JSON: <code translate="no">"metadata"</code></p></li><li><p>Sotto-oggetto: <code translate="no">'metadata["supplier"]'</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_cast_type</code></p></td>
     <td><p>Il tipo di dati da usare per interpretare e indicizzare il valore. Deve corrispondere al tipo di dati effettivo della chiave.</p><p>Per un elenco dei tipi di cast disponibili, vedere <a href="/docs/it/json-indexing.md#Supported-cast-types">Tipi di cast supportati</a><a href="/docs/it/json-indexing.md#Supported-cast-types"> di seguito</a>.</p></td>
     <td><p><code translate="no">"VARCHAR"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json_cast_function</code></p></td>
     <td><p><strong>(Facoltativo)</strong> Converte i valori originali della chiave in un tipo di destinazione al momento dell'indicizzazione. Questa configurazione è necessaria solo quando i valori delle chiavi sono memorizzati in un formato errato e si desidera convertire il tipo di dati durante l'indicizzazione.</p><p>Per un elenco delle funzioni di cast disponibili, vedere <a href="/docs/it/json-indexing.md#Supported-cast-functions">Funzioni di cast supportate di seguito</a>.</p></td>
     <td><p><code translate="no">"STRING_TO_DOUBLE"</code></p></td>
   </tr>
</table>
<h3 id="Supported-cast-types" class="common-anchor-header">Tipi di cast supportati<button data-href="#Supported-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus supporta i seguenti tipi di dati per il casting al momento dell'indicizzazione. Questi tipi garantiscono la corretta interpretazione dei dati per un filtraggio efficiente.</p>
<table>
   <tr>
     <th><p>Tipo di cast</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Esempio di valore JSON</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">BOOL</code> / <code translate="no">bool</code></p></td>
     <td><p>Utilizzato per indicizzare valori booleani, consentendo query che filtrano su condizioni di vero/falso.</p></td>
     <td><p><code translate="no">true</code>, <code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">DOUBLE</code> / <code translate="no">double</code></p></td>
     <td><p>Utilizzato per i valori numerici, compresi i numeri interi e a virgola mobile. Consente di filtrare in base a intervalli o uguaglianze (ad esempio, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">==</code>).</p></td>
     <td><p><code translate="no">42</code>, <code translate="no">99.99</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">VARCHAR</code> / <code translate="no">varchar</code></p></td>
     <td><p>Utilizzato per indicizzare valori stringa, comune per i dati basati sul testo come nomi, categorie o ID.</p></td>
     <td><p><code translate="no">"electronics"</code>, <code translate="no">"BrandA"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_BOOL</code> / <code translate="no">array_bool</code></p></td>
     <td><p>Utilizzato per indicizzare un array di valori booleani.</p></td>
     <td><p><code translate="no">[true, false, true]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_DOUBLE</code> / <code translate="no">array_double</code></p></td>
     <td><p>Utilizzato per indicizzare una matrice di valori numerici.</p></td>
     <td><p><code translate="no">[1.2, 3.14, 42]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ARRAY_VARCHAR</code> / <code translate="no">array_varchar</code></p></td>
     <td><p>Utilizzato per indicizzare un array di stringhe, ideale per un elenco di tag o parole chiave.</p></td>
     <td><p><code translate="no">["tag1", "tag2", "tag3"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JSON</code> / <code translate="no">json</code></p></td>
     <td><p>Interi oggetti o sotto-oggetti JSON con inferenza automatica del tipo e appiattimento.</p><p>L'indicizzazione di interi oggetti JSON aumenta le dimensioni dell'indice. Per scenari con molte chiavi, considerare la <a href="/docs/it/json-shredding.md">triturazione JSON</a>.</p></td>
     <td><p>Qualsiasi oggetto JSON</p></td>
   </tr>
</table>
<div class="alert note">
<p>Per un'indicizzazione ottimale, gli array devono contenere elementi dello stesso tipo. Per ulteriori informazioni, consultare <a href="/docs/it/array_data_type.md">Campo array</a>.</p>
</div>
<h3 id="Supported-cast-functions" class="common-anchor-header">Funzioni di cast supportate<button data-href="#Supported-cast-functions" class="anchor-icon" translate="no">
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
    </button></h3><p>Se la chiave del campo JSON contiene valori in un formato non corretto (ad esempio, numeri memorizzati come stringhe), è possibile passare una funzione di cast all'argomento <code translate="no">json_cast_function</code> per convertire questi valori al momento dell'indicizzazione.</p>
<p>Le funzioni di cast non fanno distinzione tra maiuscole e minuscole. Sono supportate le seguenti funzioni:</p>
<table>
   <tr>
     <th><p>Funzione di fusione</p></th>
     <th><p>Converte da → a</p></th>
     <th><p>Caso d'uso</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">STRING_TO_DOUBLE</code> / <code translate="no">string_to_double</code></p></td>
     <td><p>Stringa → Numerico (doppio)</p></td>
     <td><p>Convertire <code translate="no">"99.99"</code> in <code translate="no">99.99</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Se la conversione fallisce (ad esempio, stringa non numerica), il valore viene saltato e non indicizzato.</p>
</div>
<h2 id="Create-JSON-indexes" class="common-anchor-header">Creare indici JSON<button data-href="#Create-JSON-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione mostra come creare indici su diversi tipi di dati JSON utilizzando esempi pratici. Tutti gli esempi utilizzano la struttura JSON di esempio mostrata di seguito e presuppongono che sia già stata stabilita una connessione a <strong>MilvusClient</strong> con uno schema di raccolta correttamente definito.</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">Struttura JSON di esempio<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> 
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">Impostazione di base<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>Prima di creare indici JSON, preparare i parametri dell'indice:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index params</span>
index_params = MilvusClient.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-1-Index-a-simple-JSON-key" class="common-anchor-header">Esempio 1: indicizzare una semplice chiave JSON<button data-href="#Example-1-Index-a-simple-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Creare un indice sul campo <code translate="no">category</code> per consentire un filtraggio rapido per categoria di prodotto:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">Esempio 2: indicizzare una chiave annidata<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Creare un indice sul campo <code translate="no">email</code> profondamente annidato per la ricerca dei contatti dei fornitori:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the nested key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the nested JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Convert-data-type-at-index-time" class="common-anchor-header">Esempio 3: Convertire il tipo di dati al momento dell'indice<button data-href="#Example-3-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>A volte i dati numerici vengono erroneamente memorizzati come stringhe. Utilizzare la funzione di cast di <code translate="no">STRING_TO_DOUBLE</code> per convertirli e indicizzarli correttamente:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Convert string numbers to double for indexing</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-comment"># Data cast type</span>
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span> <span class="hljs-comment"># Cast function; case insensitive</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Importante</strong>: se la conversione fallisce per un documento (ad esempio, una stringa non numerica come <code translate="no">&quot;invalid&quot;</code>), il valore di quel documento sarà escluso dall'indice e non apparirà nei risultati filtrati.</p>
<h3 id="Example-4-Index-entire-objects" class="common-anchor-header">Esempio 4: indicizzare interi oggetti<button data-href="#Example-4-Index-entire-objects" class="anchor-icon" translate="no">
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
    </button></h3><p>Indicizzare l'intero oggetto JSON per consentire interrogazioni su qualsiasi campo al suo interno. Quando si utilizza <code translate="no">json_cast_type=&quot;JSON&quot;</code>, il sistema automaticamente:</p>
<ul>
<li><p><strong>Appiattisce la struttura JSON</strong>: Gli oggetti annidati vengono convertiti in percorsi piatti per un'indicizzazione efficiente.</p></li>
<li><p><strong>Inferire i tipi di dati</strong>: Ogni valore viene automaticamente classificato come numerico, stringa, booleano o data in base al suo contenuto.</p></li>
<li><p><strong>Crea una copertura completa</strong>: Tutte le chiavi e i percorsi annidati all'interno dell'oggetto diventano ricercabili.</p></li>
</ul>
<p>Per la <a href="/docs/it/json-indexing.md#Sample-JSON-structure">struttura JSON di esempio</a> qui sopra, indicizzare l'intero oggetto <code translate="no">metadata</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the entire JSON object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>È anche possibile indicizzare solo una parte della struttura JSON, ad esempio tutte le informazioni di <code translate="no">supplier</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index a sub-object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, 
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-index-configuration" class="common-anchor-header">Applicare la configurazione dell'indice<button data-href="#Apply-index-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Dopo aver definito tutti i parametri dell'indice, applicarli alla raccolta:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Apply all index configurations to the collection</span>
MilvusClient.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Una volta completata l'indicizzazione, le query sui campi JSON utilizzeranno automaticamente gli indici per ottenere prestazioni più veloci.</p>
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
    </button></h2><h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">Cosa succede se l'espressione del filtro di una query utilizza un tipo diverso dal tipo di cast indicizzato?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Se l'espressione del filtro utilizza un tipo diverso da quello dell'indice <code translate="no">json_cast_type</code>, Milvus non utilizzerà l'indice e potrà tornare a una scansione bruta più lenta, se i dati lo consentono. Per ottenere prestazioni ottimali, allineare sempre l'espressione del filtro al tipo di cast dell'indice. Ad esempio, se un indice numerico viene creato con <code translate="no">json_cast_type=&quot;double&quot;</code>, solo le condizioni di filtro numeriche sfrutteranno l'indice.</p>
<h3 id="When-creating-a-JSON-index-what-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">Quando si crea un indice JSON, cosa succede se una chiave JSON ha tipi di dati incoerenti tra le diverse entità?<button data-href="#When-creating-a-JSON-index-what-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>I tipi incoerenti possono portare a un'<strong>indicizzazione parziale</strong>. Ad esempio, se un campo <code translate="no">metadata[&quot;price&quot;]</code> è memorizzato sia come numero (<code translate="no">99.99</code>) che come stringa (<code translate="no">&quot;99.99&quot;</code>) e si crea un indice con <code translate="no">json_cast_type=&quot;double&quot;</code>, solo i valori numerici saranno indicizzati. Le voci in forma di stringa verranno saltate e non appariranno nei risultati dei filtri.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">È possibile creare più indici sulla stessa chiave JSON?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>No, ogni chiave JSON supporta un solo indice. È necessario scegliere un singolo <code translate="no">json_cast_type</code> che corrisponda ai dati. Tuttavia, è possibile creare un indice sull'intero oggetto JSON e un indice su una chiave nidificata all'interno di tale oggetto.</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">Un campo JSON supporta l'impostazione di un valore predefinito?<button data-href="#Does-a-JSON-field-support-setting-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>No, i campi JSON non supportano valori predefiniti. Tuttavia, è possibile impostare <code translate="no">nullable=True</code> quando si definisce il campo per consentire l'inserimento di voci vuote. Per ulteriori informazioni, consultare <a href="/docs/it/nullable-and-default.md">Nullable e Default</a>.</p>
