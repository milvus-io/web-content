---
id: pattern-matching.md
title: Corrispondenza dei pattern
summary: >-
  Milvus supporta la corrispondenza di pattern di stringhe con i caratteri jolly
  LIKE e le espressioni regolari RE2. Utilizza i filtri di pattern per
  individuare prefissi, suffissi, sottostringhe, codici strutturati, domini
  e-mail, percorsi URL e altri pattern di stringhe nei campi VARCHAR, nei
  percorsi di stringhe JSON o negli elementi ARRAY.
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
    </button></h1><p>Nelle applicazioni di ricerca agentica, la ricerca vettoriale e la corrispondenza dei pattern in stile grep spesso si integrano a vicenda. La ricerca vettoriale recupera le entità semanticamente rilevanti, mentre la corrispondenza dei pattern restringe tali risultati in base a strutture di stringhe esatte, quali codici di errore, prefissi di log, domini e-mail, percorsi URL o identificatori.</p>
<p>In Milvus, è possibile esprimere questi vincoli di pattern in filtri scalari utilizzando <code translate="no">LIKE</code> per la semplice corrispondenza con caratteri jolly e <code translate="no">=~</code> o <code translate="no">!~</code> per le espressioni regolari <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. È possibile combinare questi filtri con <code translate="no">query</code>, <code translate="no">search</code> o la ricerca ibrida.</p>
<p>Le espressioni di corrispondenza dei pattern vengono scritte nel parametro <code translate="no">filter</code>. Ad esempio, la seguente query individua i messaggi di log che contengono un codice di errore come <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Gli esempi riportati in questa pagina si concentrano sull’espressione assegnata a ` <code translate="no">filter</code>`. È possibile utilizzare la stessa sintassi delle espressioni di filtro nelle operazioni di Milvus che accettano un filtro scalare, come ` <code translate="no">query</code>`, ` <code translate="no">search</code>` e la ricerca ibrida.</p>
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
    </button></h2><p>La corrispondenza dei pattern è disponibile per i valori di tipo stringa.</p>
<table>
<thead>
<tr><th>Destinazione</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> campo</td><td>Sì</td><td>Sì</td><td>Destinazione tipica per la corrispondenza dei pattern nei campi stringa.</td></tr>
<tr><td><code translate="no">JSON</code> percorso con tipo di conversione " <code translate="no">VARCHAR</code> "</td><td>Sì</td><td>Sì</td><td>Il valore del percorso JSON deve essere una stringa per ottenere corrispondenze positive. Se si crea un indice sul percorso JSON per l'accelerazione, impostare <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> elemento</td><td>Sì</td><td>Sì</td><td>Corrisponde a un elemento specifico in base all'indice, ad esempio <code translate="no">tags[0]</code>. La corrispondenza del pattern <strong>non</strong> esegue la scansione di tutti gli elementi; si applica solo all'elemento all'indice specificato.</td></tr>
<tr><td>Destinazioni numeriche, booleane, vettoriali, <code translate="no">TEXT</code> o altre destinazioni non<code translate="no">VARCHAR</code> </td><td>No</td><td>No</td><td>La corrispondenza con il pattern è disponibile solo per i valori di tipo " <code translate="no">VARCHAR</code> ", i percorsi JSON che si risolvono in stringhe o gli elementi " <code translate="no">ARRAY&lt;VARCHAR&gt;</code> " indicizzati.</td></tr>
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
<p>Se hai bisogno di una corrispondenza esatta della stringa, ti consigliamo di utilizzare <code translate="no">==</code> invece del pattern matching. Usa <code translate="no">LIKE</code> o regex solo quando il filtro deve corrispondere a un pattern.</p>
<table>
<thead>
<tr><th>Requisiti</th><th>Operatore consigliato</th><th>Esempio</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td>Uguaglianza esatta della stringa</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Corrispondenza esatta della stringa <code translate="no">active</code>.</td></tr>
<tr><td>Corrispondenza semplice del prefisso</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Corrisponde alle stringhe che iniziano con <code translate="no">Prod</code>.</td></tr>
<tr><td>Corrispondenza semplice del suffisso</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Corrisponde alle stringhe che terminano con <code translate="no">.json</code>.</td></tr>
<tr><td>Corrispondenza semplice "contiene"</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Trova i valori che contengono <code translate="no">vector database</code> in qualsiasi punto della stringa.</td></tr>
<tr><td>Corrispondenza di un codice strutturato o di un modello a lunghezza fissa</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Trova stringhe che, distinguendo tra maiuscole e minuscole, contengono <code translate="no">E</code> seguito da quattro cifre, ad esempio <code translate="no">E1001</code>.</td></tr>
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
    </button></h2><p>L'operatore <code translate="no">LIKE</code> serve per semplici corrispondenze con caratteri jolly su valori di stringa. Supporta solo i seguenti caratteri jolly:</p>
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
    </button></h3><p>Utilizzare <code translate="no">LIKE</code> per le corrispondenze di prefisso, suffisso, contenuto e singolo carattere in posizione fissa. <code translate="no">LIKE</code> non supporta classi di caratteri come <code translate="no">[0-9]</code>, alternanze come <code translate="no">error|failed</code>, conteggi di ripetizioni come <code translate="no">{4}</code>, ancore come <code translate="no">^</code> o <code translate="no">$</code>, né flag di ignoranza maiuscole/minuscole come <code translate="no">(?i)</code>. Per tali pattern, utilizzare regex.</p>
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
    </button></h3><p>Nei modelli <code translate="no">LIKE</code>, <code translate="no">%</code> corrisponde a zero o più caratteri e <code translate="no">_</code> corrisponde esattamente a un carattere. Per trovare corrispondenze letterali con <code translate="no">%</code>, <code translate="no">_</code> o <code translate="no">\</code>, si deve effettuare l'escape del carattere con una barra rovesciata (<code translate="no">\</code>):</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> corrisponde al valore letterale <code translate="no">%</code>.</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> corrisponde ai valori che iniziano con il carattere letterale <code translate="no">_</code>.</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> corrisponde ai valori che iniziano con una barra rovesciata letterale.</li>
</ul>
<p>I letterali di stringa grezzi, scritti come <code translate="no">r&quot;...&quot;</code> o <code translate="no">r'...'</code>, mantengono le barre rovesciate tali e quali nelle espressioni dei filtri di Milvus. Sono consigliati per <code translate="no">LIKE</code> e per i pattern regex che contengono barre rovesciate. Senza una stringa grezza, i normali letterali di stringa elaborano comunque le sequenze di escape prima che il pattern venga valutato, quindi potrebbero essere necessarie più barre rovesciate.</p>
<h2 id="Use-regex--Milvus-30x" class="common-anchor-header">Utilizzare le espressioni regolari<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare i filtri regex quando il pattern richiede funzionalità delle espressioni regolari quali classi di caratteri, ripetizioni, alternanze, ancore o corrispondenze che non distinguono tra maiuscole e minuscole. Milvus applica un'espressione regolare <a href="https://github.com/google/re2/wiki/syntax">RE2</a> a un valore stringa.</p>
<p>Il lato destro di <code translate="no">=~</code> o <code translate="no">!~</code> deve essere un letterale stringa.</p>
<table>
<thead>
<tr><th>Operatore</th><th>Significato</th><th>Esempio</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Trova i valori che soddisfano il modello regex.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Esclude i valori che soddisfano il modello regex.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ r&quot;\d{4}-\d{2}-\d{2}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo corrisponde a stringhe che contengono un valore simile a una data, come <code translate="no">2026-07-01</code>.</p>
<p>Senza una stringa raw, le stringhe letterali ordinarie elaborano le sequenze di escape prima che il pattern regex venga valutato, quindi pattern come <code translate="no">\d</code>, <code translate="no">\s</code> o caratteri letterali con escape potrebbero richiedere ulteriori barre rovesciate.</p>
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
<tr><td>Corrisponde a un dominio e-mail</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Corrisponde senza distinzione tra maiuscole e minuscole</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Corrisponde alla stringa completa</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Per trovare una delle diverse parole, usa l'alternanza con <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quando si effettuano corrispondenze letterali con i metacaratteri delle espressioni regolari, è necessario precederli con il carattere di escape nel pattern dell’espressione regolare. Ad esempio, per trovare un punto letterale (<code translate="no">\.</code> nell’espressione regolare), scrivere <code translate="no">\\.</code> in una stringa di filtro Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nota: i filtri regex di Milvus seguono la sintassi RE2. Se un modello regex utilizza una sintassi non supportata da RE2 o è altrimenti non valido, Milvus rifiuta l’espressione del filtro. Per i dettagli sui metacaratteri regex, i flag e il comportamento di corrispondenza, consultare il riferimento <a href="https://github.com/google/re2/wiki/syntax">alla sintassi RE2</a>.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per trovare corrispondenze con l’intero valore del campo, utilizzare gli ancoraggi <code translate="no">^</code> e <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Campi VARCHAR nullabili</strong></p>
<p>I filtri Regex non individuano i valori nulli. Ciò vale sia per <code translate="no">=~</code> che per <code translate="no">!~</code>. Se si desidera escludere un pattern Regex ma mantenere i valori nulli, aggiungere esplicitamente <code translate="no">OR field IS NULL</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Percorsi JSON</strong></p>
<p>Per i percorsi JSON, i filtri regex si comportano in modo diverso quando il percorso è mancante, nullo o si risolve in un valore non stringa:</p>
<table>
<thead>
<tr><th>Filtro</th><th>Include valori mancanti/null/non stringa?</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>No</td><td>Corrisponde solo ai valori stringa che soddisfano il modello regex.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Sì</td><td>Restituisce le entità in cui il percorso è mancante, nullo, non di tipo stringa o una stringa che non corrisponde al modello regex.</td></tr>
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
    </button></h2><p>Milvus supporta diversi tipi di indici sui campi stringa che possono essere utilizzati insieme a filtri " <code translate="no">LIKE</code> " e filtri regex su campi " <code translate="no">VARCHAR</code> " o percorsi stringa JSON, come <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> e <code translate="no">BITMAP</code>. La corrispondenza dei pattern può funzionare senza un indice, ma un indice può migliorare le prestazioni su set di dati di grandi dimensioni.</p>
<p>L'efficacia dell'indice dipende dall'espressione del pattern, dalla capacità di Milvus di estrarre sottostringhe letterali fisse, nonché dalla cardinalità e dalla distribuzione del campo di destinazione. I pattern di tipo prefisso, come <code translate="no">name LIKE &quot;Prod%&quot;</code>, possono trarre vantaggio da strategie di indicizzazione diverse rispetto ai pattern di tipo infisso o suffisso, come <code translate="no">description LIKE &quot;%vector%&quot;</code> o <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Utilizzate la tabella seguente come punto di partenza, quindi effettuate un benchmark con il vostro carico di lavoro:</p>
<table>
<thead>
<tr><th>Modello o caratteristica dei dati</th><th>Indice da prendere in considerazione</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td>Contiene sottostringhe letterali fisse, come <code translate="no">message =~ &quot;error.*timeout&quot;</code> o <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Utile quando Milvus è in grado di estrarre sottostringhe letterali significative dal modello. Per ulteriori dettagli, consultare <a href="/docs/it/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Filtri di stringa con prefisso, esatti o di tipo "uguaglianza", specialmente su campi con cardinalità da bassa a moderata</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> o <code translate="no">BITMAP</code></td><td>Possono risultare più efficaci quando il campo presenta valori ripetuti o quando il filtro si avvicina alla corrispondenza esatta. Per i dettagli, fare riferimento a <a href="/docs/it/stl-sort.md">STL_SORT</a>, <a href="/docs/it/inverted.md">INVERTED</a> e <a href="/docs/it/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Modelli Regex senza letterali fissi, o modelli dominati da classi di caratteri, token brevi o caratteri jolly</td><td>Eseguire un benchmark prima di fare affidamento sull’accelerazione tramite indice</td><td>Questi modelli potrebbero fornire una selettività dell’indice limitata e ricorrere a scansioni più ampie.</td></tr>
</tbody>
</table>
