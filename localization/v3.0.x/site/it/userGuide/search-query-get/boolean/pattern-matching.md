---
id: pattern-matching.md
title: Corrispondenza dei pattern
summary: >-
  Milvus supporta la corrispondenza dei modelli di stringa con i caratteri jolly
  LIKE e le espressioni regolari RE2. Utilizzate i filtri di pattern per
  abbinare prefissi, suffissi, sottostringhe, codici strutturati, domini e-mail,
  percorsi URL e altri pattern di stringhe in campi VARCHAR, percorsi di
  stringhe JSON o elementi ARRAY.
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
    </button></h1><p>Nelle applicazioni di ricerca agenziale, la ricerca vettoriale e il pattern matching di tipo grep sono spesso complementari. La ricerca vettoriale recupera entità semanticamente rilevanti, mentre la corrispondenza dei pattern restringe i risultati in base a strutture di stringhe esatte, come codici di errore, prefissi di log, domini e-mail, percorsi URL o identificatori.</p>
<p>In Milvus, è possibile esprimere questi vincoli di pattern in filtri scalari con <code translate="no">LIKE</code> per la semplice corrispondenza con caratteri jolly e <code translate="no">=~</code> o <code translate="no">!~</code> per le espressioni regolari <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. È possibile combinare questi filtri con <code translate="no">query</code>, <code translate="no">search</code> o con la ricerca ibrida.</p>
<p>Le espressioni di corrispondenza dei pattern sono scritte nel parametro <code translate="no">filter</code>. Ad esempio, la seguente query corrisponde ai messaggi di log che contengono un codice di errore come <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Gli esempi di questa pagina si concentrano sull'espressione assegnata a <code translate="no">filter</code>. È possibile utilizzare la stessa sintassi dell'espressione di filtro nelle operazioni Milvus che accettano un filtro scalare, come <code translate="no">query</code>, <code translate="no">search</code>, e la ricerca ibrida.</p>
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
    </button></h2><p>La corrispondenza dei modelli è disponibile per i valori stringa.</p>
<table>
<thead>
<tr><th>Obiettivo</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> campo</td><td>Sì</td><td>Sì</td><td>Obiettivo tipico per la corrispondenza dei pattern sui campi stringa.</td></tr>
<tr><td><code translate="no">JSON</code> percorso con tipo di cast <code translate="no">VARCHAR</code> </td><td>Sì</td><td>Sì</td><td>Il valore del percorso JSON deve essere una stringa per le corrispondenze positive. Se si crea un indice sul percorso JSON per l'accelerazione, impostare <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> elemento</td><td>Sì</td><td>Sì</td><td>Corrisponde a un elemento specifico per indice, come <code translate="no">tags[0]</code>. La corrispondenza dei pattern <strong>non</strong> esegue la scansione di tutti gli elementi, ma si applica solo all'elemento all'indice specificato.</td></tr>
<tr><td>Obiettivi numerici, booleani, vettoriali, <code translate="no">TEXT</code>, o altri obiettivi non<code translate="no">VARCHAR</code> </td><td>No</td><td>No</td><td>La corrispondenza dei modelli è disponibile solo per i valori <code translate="no">VARCHAR</code>, i percorsi JSON che si risolvono in stringhe o gli elementi <code translate="no">ARRAY&lt;VARCHAR&gt;</code> indicizzati.</td></tr>
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
    </button></h2><p>Scegliete l'operatore più semplice che esprima lo schema desiderato.</p>
<p>Se si ha bisogno di una corrispondenza esatta di stringhe, si consiglia di usare <code translate="no">==</code> invece della corrispondenza di pattern. Usare <code translate="no">LIKE</code> o regex solo quando il filtro deve corrispondere a uno schema.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Operatore consigliato</th><th>Esempio</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td>Uguaglianza esatta tra stringhe</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Corrispondenza esatta della stringa <code translate="no">active</code>.</td></tr>
<tr><td>Corrispondenza di prefisso semplice</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Corrisponde alle stringhe che iniziano con <code translate="no">Prod</code>.</td></tr>
<tr><td>Corrispondenza a suffisso semplice</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Corrisponde alle stringhe che terminano con <code translate="no">.json</code>.</td></tr>
<tr><td>Corrispondenza semplice contenente</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Corrisponde ai valori che contengono <code translate="no">vector database</code> in qualsiasi punto della stringa.</td></tr>
<tr><td>Corrisponde a un codice strutturato o a un modello a lunghezza fissa</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Corrisponde alle stringhe che contengono <code translate="no">E</code> seguito da quattro cifre, come ad esempio <code translate="no">E1001</code>.</td></tr>
<tr><td>Corrispondenza di pattern senza distinzione tra maiuscole e minuscole</td><td><code translate="no">=~</code> con <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Corrisponde a <code translate="no">error</code>, <code translate="no">ERROR</code>, o ad altre varianti di maiuscole e minuscole.</td></tr>
<tr><td>Escludi valori che corrispondono a un modello regex</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Esclude le stringhe che iniziano con <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>Usare <code translate="no">LIKE</code> per una semplice corrispondenza con i caratteri jolly. Usare la regex quando lo schema necessita di classi di caratteri, ripetizioni, alternanze come <code translate="no">error|failed</code>, ancore o corrispondenza senza distinzione tra maiuscole e minuscole.</p>
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
    </button></h2><p>L'operatore <code translate="no">LIKE</code> serve per una semplice corrispondenza con i caratteri jolly sui valori delle stringhe. Supporta solo i seguenti caratteri jolly:</p>
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
    </button></h3><p>Utilizza la posizione di <code translate="no">%</code> e <code translate="no">_</code> per controllare dove appare il testo fisso nella stringa abbinata.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Schema</th><th>Esempio di filtro</th></tr>
</thead>
<tbody>
<tr><td>Inizia con un prefisso</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Finisce con un suffisso</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Contiene una sottostringa</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Corrisponde a un carattere in una posizione fissa</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">Comportamento della corrispondenza LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Usare <code translate="no">LIKE</code> per le corrispondenze tra prefissi, suffissi, contenuti e caratteri singoli a posizione fissa. <code translate="no">LIKE</code> non supporta le classi di caratteri come <code translate="no">[0-9]</code>, l'alternanza come <code translate="no">error|failed</code>, il conteggio delle ripetizioni come <code translate="no">{4}</code>, le ancore come <code translate="no">^</code> o <code translate="no">$</code>, o i flag non sensibili alle maiuscole come <code translate="no">(?i)</code>. Usare le regex per questi modelli.</p>
<p>Usare <code translate="no">==</code> per l'uguaglianza esatta tra le stringhe. Usare <code translate="no">LIKE</code> solo quando il filtro necessita di una corrispondenza con i caratteri jolly.</p>
<h2 id="Use-regex" class="common-anchor-header">Usare regex<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Usare i filtri regex quando il modello richiede caratteristiche dell'espressione regolare come classi di caratteri, ripetizione, alternanza, ancore o corrispondenza tra maiuscole e minuscole. Milvus applica un'espressione regolare <a href="https://github.com/google/re2/wiki/syntax">RE2</a> a un valore di stringa.</p>
<p>Il lato destro di <code translate="no">=~</code> o <code translate="no">!~</code> deve essere un letterale di stringa.</p>
<table>
<thead>
<tr><th>Operatore</th><th>Significato</th><th>Esempio</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Corrisponde ai valori che soddisfano il modello regex.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Esclude i valori che soddisfano lo schema regex.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">Modelli regex comuni<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Gli esempi seguenti utilizzano la sintassi RE2 comune nelle espressioni di filtro Milvus. Per la sintassi completa delle regex, consultare il riferimento alla <a href="https://github.com/google/re2/wiki/syntax">sintassi RE2</a>.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Schema</th><th>Esempio di filtro</th></tr>
</thead>
<tbody>
<tr><td>Contiene testo letterale</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Inizia con un prefisso</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Finisce con un suffisso</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Corrisponde a una sequenza di cifre</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Corrisponde a un numero fisso di cifre</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Corrisponde a un dominio e-mail</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Corrisponde in modo insensibile alle maiuscole e alle minuscole</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Corrisponde alla stringa completa</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Per abbinare una di più parole, utilizzare l'alternanza con <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quando si abbinano i metacaratteri della regex in modo letterale, è necessario sfuggirli nel modello della regex. Ad esempio, per abbinare un punto letterale (<code translate="no">\.</code> nella regex), scrivere <code translate="no">\\.</code> in una stringa di filtro Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nota: I filtri regex di Milvus seguono la sintassi RE2. Se un modello regex utilizza una sintassi non supportata da RE2 o comunque non valida, Milvus rifiuta l'espressione del filtro. Per informazioni dettagliate sui metacaratteri regex, sui flag e sul comportamento di corrispondenza, consultare il riferimento alla <a href="https://github.com/google/re2/wiki/syntax">sintassi RE2</a>.</p>
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
    </button></h3><p><strong>Corrispondenza delle sottostringhe</strong></p>
<p>La corrispondenza regex di Milvus utilizza la semantica della sottostringa. Non è necessario che il modello corrisponda all'intero valore del campo. Ad esempio, il filtro seguente corrisponde sia a <code translate="no">E1001</code> che a <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per corrispondere all'intero valore del campo, utilizzare le ancore <code translate="no">^</code> e <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Campi VARCHAR nulli</strong></p>
<p>I filtri Regex non corrispondono ai valori nulli. Questo vale sia per <code translate="no">=~</code> che per <code translate="no">!~</code>. Se si vuole escludere un modello regex ma mantenere i valori nulli, aggiungere esplicitamente <code translate="no">OR field IS NULL</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Percorsi JSON</strong></p>
<p>Per i percorsi JSON, i filtri regex si comportano diversamente quando il percorso è mancante, nullo o si risolve in un valore non stringa:</p>
<table>
<thead>
<tr><th>Filtro</th><th>Include valori mancanti/null/non stringhe?</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>No</td><td>Corrisponde solo ai valori stringa che soddisfano il modello regex.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Sì</td><td>Restituisce le entità in cui il percorso è mancante, nullo, non stringa o una stringa che non corrisponde al modello regex.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Accelerare la corrispondenza dei pattern con gli indici<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta diversi tipi di indici sui campi stringa che possono essere usati insieme a <code translate="no">LIKE</code> e ai filtri regex sui campi <code translate="no">VARCHAR</code> o sui percorsi delle stringhe JSON, come <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> e <code translate="no">BITMAP</code>. Il pattern matching può funzionare anche senza indice, ma un indice può migliorare le prestazioni su grandi insiemi di dati.</p>
<p>L'efficacia dell'indice dipende dall'espressione del pattern, dalla capacità di Milvus di estrarre sottostringhe letterali fisse e dalla cardinalità e distribuzione del campo di destinazione. I pattern di tipo prefisso, come <code translate="no">name LIKE &quot;Prod%&quot;</code>, possono beneficiare di strategie di indicizzazione diverse rispetto ai pattern di tipo infisso o suffisso, come <code translate="no">description LIKE &quot;%vector%&quot;</code> o <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Utilizzate la seguente tabella come punto di partenza e fate un benchmark con il vostro carico di lavoro:</p>
<table>
<thead>
<tr><th>Schema o caratteristica dei dati</th><th>Indice da considerare</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td>Contiene sottostringhe letterali fisse, come ad esempio <code translate="no">message =~ &quot;error.*timeout&quot;</code> o . <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Aiuta quando Milvus può estrarre sottostringhe letterali significative dallo schema. Per maggiori dettagli, consultare <a href="/docs/it/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Filtri per stringhe di tipo prefisso, esatto o uguale, specialmente su campi con cardinalità bassa o moderata</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code>, o <code translate="no">BITMAP</code></td><td>Possono essere più efficaci quando il campo ha valori ripetuti o quando il filtro è vicino alla corrispondenza esatta. Per maggiori dettagli, consultare <a href="/docs/it/stl-sort.md">STL_SORT</a>, <a href="/docs/it/inverted.md">INVERTED</a> e <a href="/docs/it/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Modelli Regex senza letterali fissi o modelli dominati da classi di caratteri, token brevi o caratteri jolly</td><td>Eseguire un benchmark prima di affidarsi all'accelerazione dell'indice</td><td>Questi schemi possono fornire una selettività limitata dell'indice e possono ripiegare su scansioni più ampie.</td></tr>
</tbody>
</table>
