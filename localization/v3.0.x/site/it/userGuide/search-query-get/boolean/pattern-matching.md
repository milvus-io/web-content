---
id: pattern-matching.md
title: Corrispondenza dei pattern
summary: >-
  Milvus supporta la corrispondenza di pattern di stringhe con i caratteri jolly
  LIKE e le espressioni regolari RE2. È possibile utilizzare i filtri di pattern
  per individuare prefissi, suffissi, sottostringhe, codici strutturati, domini
  e-mail, percorsi URL e altri pattern di stringhe nei campi VARCHAR, nei
  percorsi delle stringhe JSON o negli elementi ARRAY.
---
<h1 id="Pattern-Matching" class="common-anchor-header">Corrispondenza dei pattern<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>Nelle applicazioni di ricerca agentica, la ricerca vettoriale e la corrispondenza dei modelli in stile grep spesso si integrano a vicenda. La ricerca vettoriale recupera le entità semanticamente rilevanti, mentre la corrispondenza dei modelli restringe tali risultati in base a strutture di stringhe esatte, quali codici di errore, prefissi di log, domini e-mail, percorsi URL o identificatori.</p>
<p>In Milvus, è possibile esprimere questi vincoli di pattern nei filtri scalari utilizzando <code translate="no">LIKE</code> per una semplice corrispondenza con caratteri jolly e <code translate="no">=~</code> o <code translate="no">!~</code> per le espressioni regolari <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. È possibile combinare questi filtri con <code translate="no">query</code>, <code translate="no">search</code> o la ricerca ibrida.</p>
<div class="alert note">
<p>Questa pagina descrive la corrispondenza dei pattern nelle espressioni dei filtri scalari utilizzate da <code translate="no">query</code>, <code translate="no">search</code> e dalla ricerca ibrida. Queste espressioni valutano i valori dei campi e non modificano i token prodotti da un analizzatore. Per filtrare i token durante l’analisi del testo, consultare <a href="/docs/it/regex-filter.md">Filtro dell’analizzatore Regex</a>.</p>
</div>
<p>Le espressioni di corrispondenza dei pattern vengono scritte nel parametro ` <code translate="no">filter</code> `. Ad esempio, la seguente query individua i messaggi di log che contengono un codice di errore come ` <code translate="no">E1001</code>`:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;log_events&quot;</span>)
<span class="highlighted-wrapper-line">        .filter(<span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>)</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

res, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;log_events&quot;</span>).
<span class="highlighted-wrapper-line">    WithFilter(<span class="hljs-string">`message =~ &quot;E[0-9]{4}&quot;`</span>).</span>
    WithOutputFields(<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>);

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">main</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span> });

  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;log_events&#x27;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-string">&#x27;severity&#x27;</span>],
  });
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
}

<span class="hljs-title function_">main</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(error);
  process.<span class="hljs-property">exitCode</span> = <span class="hljs-number">1</span>;
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;log_events&quot;,
    &quot;filter&quot;: &quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;,
    &quot;outputFields&quot;: [&quot;message&quot;, &quot;severity&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Gli esempi in questa pagina si concentrano sull’espressione assegnata a ` <code translate="no">filter</code>`. È possibile utilizzare la stessa sintassi dell’espressione di filtro nelle operazioni di Milvus che accettano un filtro scalare, come ` <code translate="no">query</code>`, ` <code translate="no">search</code>` e la ricerca ibrida.</p>
<h2 id="Supported-field-types" class="common-anchor-header">Tipi di campo supportati<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>La corrispondenza dei pattern è disponibile per i valori stringa.</p>
<table>
<thead>
<tr><th>Destinazione</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> campo</td><td>Sì</td><td>Sì</td><td>Destinazione tipica per la corrispondenza di pattern nei campi stringa.</td></tr>
<tr><td><code translate="no">JSON</code> percorso con tipo di conversione " <code translate="no">VARCHAR</code> "</td><td>Sì</td><td>Sì</td><td>Il valore del percorso JSON deve essere una stringa per ottenere corrispondenze positive. Se si crea un indice sul percorso JSON per l'accelerazione, impostare <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> elemento</td><td>Sì</td><td>Sì</td><td>Corrisponde a un elemento specifico in base all'indice, ad esempio <code translate="no">tags[0]</code>. La corrispondenza del pattern <strong>non</strong> esegue la scansione di tutti gli elementi; si applica solo all'elemento all'indice specificato.</td></tr>
<tr><td>Destinazioni numeriche, booleane, vettoriali, <code translate="no">TEXT</code> o altre non<code translate="no">VARCHAR</code> </td><td>No</td><td>No</td><td>La corrispondenza con il pattern è disponibile solo per i valori di tipo " <code translate="no">VARCHAR</code> ", i percorsi JSON che si risolvono in stringhe o gli elementi " <code translate="no">ARRAY&lt;VARCHAR&gt;</code> " indicizzati.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Scegliere LIKE o regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Scegli l’operatore più semplice che esprima il modello di cui hai bisogno.</p>
<p>Se hai bisogno di una corrispondenza esatta della stringa, ti consigliamo di utilizzare <code translate="no">==</code> invece della corrispondenza dei pattern. Usa <code translate="no">LIKE</code> o regex solo quando il filtro deve corrispondere a un pattern.</p>
<table>
<thead>
<tr><th>Requisiti</th><th>Operatore consigliato</th><th>Esempio</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td>Uguaglianza esatta della stringa</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Corrispondenza esatta della stringa <code translate="no">active</code>.</td></tr>
<tr><td>Corrispondenza semplice del prefisso</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Corrisponde alle stringhe che iniziano con <code translate="no">Prod</code>.</td></tr>
<tr><td>Corrispondenza semplice del suffisso</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Corrisponde alle stringhe che terminano con <code translate="no">.json</code>.</td></tr>
<tr><td>Corrispondenza semplice "contiene"</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Trova i valori che contengono <code translate="no">vector database</code> in qualsiasi punto della stringa.</td></tr>
<tr><td>Corrispondenza di un codice strutturato o di un modello a lunghezza fissa</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Trova stringhe che, distinguendo tra maiuscole e minuscole, contengono <code translate="no">E</code> seguito da quattro cifre, come ad esempio <code translate="no">E1001</code>.</td></tr>
<tr><td>Corrispondenza di pattern senza distinzione tra maiuscole e minuscole</td><td><code translate="no">=~</code> con <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Trova <code translate="no">error</code>, <code translate="no">ERROR</code> o altre varianti con maiuscole e minuscole.</td></tr>
<tr><td>Escludi i valori che corrispondono a un modello regex</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Esclude le stringhe che iniziano con <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>Utilizza <code translate="no">LIKE</code> per una semplice corrispondenza con caratteri jolly. Utilizza regex quando il modello richiede classi di caratteri, ripetizioni, alternanze come <code translate="no">error|failed</code>, ancore o corrispondenze senza distinzione tra maiuscole e minuscole.</p>
<h2 id="Use-LIKE" class="common-anchor-header">Utilizzare LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>L'operatore <code translate="no">LIKE</code> serve per semplici corrispondenze con caratteri jolly sui valori stringa. Supporta solo i seguenti caratteri jolly:</p>
<table>
<thead>
<tr><th>Carattere jolly</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Corrisponde a zero o più caratteri.</td></tr>
<tr><td><code translate="no">_</code></td><td>Corrisponde esattamente a un carattere.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Modelli LIKE comuni<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizza la posizione di <code translate="no">%</code> e <code translate="no">_</code> per controllare dove appare il testo fisso nella stringa corrispondente.</p>
<table>
<thead>
<tr><th>Requisiti</th><th>Modello</th><th>Esempio di filtro</th></tr>
</thead>
<tbody>
<tr><td>Inizia con un prefisso</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Termina con un suffisso</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Contiene una sottostringa</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Corrisponde a un carattere in una posizione fissa</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">Comportamento di corrispondenza LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare <code translate="no">LIKE</code> per le corrispondenze di prefisso, suffisso, contenuto e singolo carattere in posizione fissa. <code translate="no">LIKE</code> non supporta classi di caratteri come <code translate="no">[0-9]</code>, alternanze come <code translate="no">error|failed</code>, conteggi di ripetizioni come <code translate="no">{4}</code>, ancore come <code translate="no">^</code> o <code translate="no">$</code>, né flag di ignoranza maiuscole/minuscole come <code translate="no">(?i)</code>. Per tali pattern, utilizzare le espressioni regolari (regex).</p>
<p>Utilizza <code translate="no">==</code> per l'uguaglianza esatta dell'intera stringa. Utilizza <code translate="no">LIKE</code> solo quando il filtro richiede la corrispondenza con caratteri jolly.</p>
<h3 id="Escaping-wildcards-in-a-LIKE-pattern" class="common-anchor-header">Escape dei caratteri jolly in un modello LIKE<button data-href="#Escaping-wildcards-in-a-LIKE-pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>Nei modelli <code translate="no">LIKE</code>, <code translate="no">%</code> corrisponde a zero o più caratteri e <code translate="no">_</code> corrisponde esattamente a un carattere. Per trovare una corrispondenza letterale con <code translate="no">%</code>, <code translate="no">_</code> o <code translate="no">\</code>, esca il carattere con una barra rovesciata (<code translate="no">\</code>):</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> corrisponde al valore letterale <code translate="no">%</code>.</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> corrisponde ai valori che iniziano con un carattere letterale <code translate="no">_</code>.</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> corrisponde ai valori che iniziano con una barra rovesciata letterale.</li>
</ul>
<p>I letterali di stringa grezzi, scritti come <code translate="no">r&quot;...&quot;</code> o <code translate="no">r'...'</code>, mantengono le barre rovesciate tali e quali nelle espressioni dei filtri di Milvus. Sono consigliati per <code translate="no">LIKE</code> e per i pattern regex che contengono barre rovesciate. Senza una stringa grezza, i normali letterali di stringa elaborano comunque le sequenze di escape prima che il pattern venga valutato, quindi potrebbero essere necessarie più barre rovesciate.</p>
<h2 id="Use-regex" class="common-anchor-header">Utilizzare le espressioni regolari<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare i filtri regex quando il pattern richiede funzionalità delle espressioni regolari quali classi di caratteri, ripetizioni, alternanze, ancore o corrispondenze che non distinguono tra maiuscole e minuscole. Milvus applica un’espressione regolare <a href="https://github.com/google/re2/wiki/syntax">RE2</a> a un valore stringa.</p>
<p>Il lato destro di <code translate="no">=~</code> o <code translate="no">!~</code> deve essere un letterale stringa.</p>
<table>
<thead>
<tr><th>Operatore</th><th>Significato</th><th>Esempio</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Corrisponde ai valori che soddisfano il modello di espressione regolare.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Esclude i valori che soddisfano il pattern regex.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Use-raw-string-literals" class="common-anchor-header">Utilizzare stringhe letterali "raw"<button data-href="#Use-raw-string-literals" class="anchor-icon" translate="no">
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
    </button></h3><p>I letterali stringa grezzi sono consigliati per i modelli regex che contengono barre rovesciate. In una stringa grezza, scritta come <code translate="no">r&quot;...&quot;</code> o <code translate="no">r'...'</code>, le barre rovesciate vengono passate al motore regex alla lettera. Ciò evita l'escape aggiuntivo richiesto dai normali letterali stringa.</p>
<p>Ad esempio:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">r&#x27;filename =~ r&quot;\.json$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;filename =~ r\&quot;\\.json$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`filename =~ r&quot;\.json$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;filename =~ r&quot;\\.json$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;filename =~ r&quot;\.json$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo pattern trova corrispondenza con stringhe che terminano con <code translate="no">.json</code>, come ad esempio <code translate="no">report.json</code>.</p>
<p>Senza una stringa raw nell’espressione del filtro Milvus, le normali stringhe letterali elaborano le sequenze di escape prima che il pattern regex venga valutato. I caratteri letterali sottoposti a escape potrebbero quindi richiedere ulteriori backslash nella stringa del linguaggio host.</p>
<h3 id="Common-regex-patterns" class="common-anchor-header">Modelli di espressioni regolari comuni<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Gli esempi seguenti utilizzano la sintassi RE2 comune nelle espressioni dei filtri di Milvus. Per la sintassi completa delle espressioni regolari, consultare il riferimento <a href="https://github.com/google/re2/wiki/syntax">alla sintassi RE2</a>.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Modello</th><th>Esempio di filtro</th></tr>
</thead>
<tbody>
<tr><td>Contiene testo letterale</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Inizia con un prefisso</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Termina con un suffisso</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Corrisponde a una sequenza di cifre</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Corrisponde a un numero fisso di cifre</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Corrisponde a un dominio di posta elettronica</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Corrisponde senza distinzione tra maiuscole e minuscole</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Corrisponde alla stringa completa</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Per trovare una delle diverse parole, usa l'alternanza con <code translate="no">|</code>:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message =~ \&quot;error|failed|timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message =~ &quot;error|failed|timeout&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quando si effettuano corrispondenze letterali con i metacaratteri delle espressioni regolari, è necessario precederli con il carattere di escape nel pattern dell’espressione regolare. Ad esempio, per trovare un punto letterale (<code translate="no">\.</code> nell’espressione regolare), scrivere <code translate="no">\\.</code> in una stringa sorgente Python, Java, Go o Node.js:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;email =~ \&quot;@gmail\\.com$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`email =~ &quot;@gmail\\.com$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nota: i filtri regex di Milvus seguono la sintassi RE2. Se un pattern regex utilizza una sintassi non supportata da RE2 o è altrimenti non valido, Milvus rifiuta l’espressione del filtro. Per i dettagli sui metacaratteri regex, i flag e il comportamento di corrispondenza, consultare il riferimento <a href="https://github.com/google/re2/wiki/syntax">alla sintassi RE2</a>.</p>
<h3 id="Matching-behavior" class="common-anchor-header">Comportamento di corrispondenza<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Corrispondenza di sottostringhe</strong></p>
<p>La corrispondenza delle espressioni regolari di Milvus utilizza la semantica delle sottostringhe. Il modello non deve necessariamente corrispondere all’intero valore del campo. Ad esempio, il seguente filtro corrisponde sia a <code translate="no">E1001</code> che a <code translate="no">failed with E1001 after retry</code>:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message =~ &quot;E[0-9]{4}&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per trovare corrispondenze con l’intero valore del campo, utilizzare gli ancoraggi <code translate="no">^</code> e <code translate="no">$</code>:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;code =~ \&quot;^E[0-9]{4}$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
filter := <span class="hljs-string">`code =~ &quot;^E[0-9]{4}$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
filter=<span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Campi VARCHAR nullabili</strong></p>
<p>I filtri regex non individuano i valori nulli. Ciò vale sia per ` <code translate="no">=~</code> ` che per ` <code translate="no">!~</code>`. Se si desidera escludere un pattern regex ma mantenere i valori nulli, aggiungere esplicitamente ` <code translate="no">OR field IS NULL</code>`:</p>
<div class="multipleCode">
 <a href="#python">Python</a>
 <a href="#java"> Java</a>
 <a href="#go"> Go</a>
 <a href="#javascript"> Node.js</a>
 <a href="#bash"> cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot; OR message IS NULL&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message !~ &quot;^DEBUG&quot; OR message IS NULL`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Percorsi JSON</strong></p>
<p>Per i percorsi JSON, i filtri regex si comportano in modo diverso quando il percorso è assente, nullo o si risolve in un valore non stringa:</p>
<table>
<thead>
<tr><th>Filtro</th><th>Include valori mancanti/null/non stringa?</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>No</td><td>Corrisponde solo ai valori stringa che soddisfano il modello regex.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Sì</td><td>Restituisce le entità il cui percorso è mancante, nullo, non di tipo stringa o una stringa che non corrisponde al pattern regex.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Accelerare la corrispondenza dei modelli con gli indici<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta diversi tipi di indici sui campi stringa che possono essere utilizzati insieme a filtri " <code translate="no">LIKE</code> " e filtri regex su campi " <code translate="no">VARCHAR</code> " o percorsi stringa JSON, come <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> e <code translate="no">BITMAP</code>. La corrispondenza dei pattern può funzionare senza un indice, ma un indice può migliorare le prestazioni su set di dati di grandi dimensioni.</p>
<p>L'efficacia dell'indice dipende dall'espressione del pattern, dalla capacità di Milvus di estrarre sottostringhe letterali fisse, nonché dalla cardinalità e dalla distribuzione del campo di destinazione. I pattern di tipo prefisso, come <code translate="no">name LIKE &quot;Prod%&quot;</code>, possono trarre vantaggio da strategie di indicizzazione diverse rispetto ai pattern di tipo infisso o suffisso, come <code translate="no">description LIKE &quot;%vector%&quot;</code> o <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Utilizzate la tabella seguente come punto di partenza, quindi effettuate un benchmark con il vostro carico di lavoro:</p>
<table>
<thead>
<tr><th>Modello o caratteristica dei dati</th><th>Indice da prendere in considerazione</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td>Contiene sottostringhe letterali fisse, come <code translate="no">message =~ &quot;error.*timeout&quot;</code> oppure <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Utile quando Milvus è in grado di estrarre sottostringhe letterali significative dal modello. Per ulteriori dettagli, consultare <a href="/docs/it/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Filtri di stringa con prefisso, esatti o di tipo "uguaglianza", specialmente su campi con cardinalità da bassa a moderata</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> o <code translate="no">BITMAP</code></td><td>Possono risultare più efficaci quando il campo presenta valori ripetuti o quando il filtro si avvicina alla corrispondenza esatta. Per i dettagli, fare riferimento a <a href="/docs/it/stl-sort.md">STL_SORT</a>, <a href="/docs/it/inverted.md">INVERTED</a> e <a href="/docs/it/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Modelli Regex senza letterali fissi, o modelli dominati da classi di caratteri, token brevi o caratteri jolly</td><td>Eseguire test di benchmark prima di fare affidamento sull’accelerazione tramite indice</td><td>Questi pattern potrebbero fornire una selettività dell’indice limitata e ricorrere a scansioni più estese.</td></tr>
</tbody>
</table>
