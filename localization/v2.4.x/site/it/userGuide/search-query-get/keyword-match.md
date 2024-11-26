---
id: keyword-match.md
summary: >-
  La corrispondenza delle parole chiave in Milvus consente di recuperare
  documenti precisi in base a termini specifici. Questa funzione è utilizzata
  principalmente per la ricerca filtrata per soddisfare condizioni specifiche e
  può incorporare un filtro scalare per affinare i risultati della query,
  consentendo ricerche di somiglianza all'interno di vettori che soddisfano
  criteri scalari.
title: Ricerca per parola chiave
---
<h1 id="Keyword-Match​" class="common-anchor-header">Ricerca per parola chiave<button data-href="#Keyword-Match​" class="anchor-icon" translate="no">
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
    </button></h1><p>La corrispondenza delle parole chiave in Milvus consente di recuperare documenti precisi in base a termini specifici. Questa funzione è utilizzata principalmente per la ricerca filtrata per soddisfare condizioni specifiche e può incorporare un filtro scalare per affinare i risultati della query, consentendo ricerche di similarità all'interno di vettori che soddisfano criteri scalari.</p>
<div class="alert note">
<p>La corrispondenza delle parole chiave si concentra sulla ricerca delle occorrenze esatte dei termini della query, senza assegnare un punteggio alla rilevanza dei documenti abbinati. Se si desidera recuperare i documenti più rilevanti in base al significato semantico e all'importanza dei termini della query, si consiglia di utilizzare la <a href="/docs/it/full-text-search.md">ricerca full text</a>.</p>
</div>
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
    </button></h2><p>Milvus integra <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> per alimentare l'indice inverso e la ricerca per parole chiave. Per ogni inserimento di testo, Milvus lo indicizza seguendo la procedura.</p>
<ol>
<li><p><a href="/docs/it/analyzer-overview.md">Analizzatore</a>: L'analizzatore elabora il testo in ingresso tokenizzandolo in singole parole, o token, e applicando poi i filtri necessari. Ciò consente a Milvus di costruire un indice basato su questi token.</p></li>
<li><p><a href="/docs/it/index-scalar-fields.md">Indicizzazione</a>: Dopo l'analisi del testo, Milvus crea un indice inverso che mappa ogni singolo token con i documenti che lo contengono.</p></li>
</ol>
<p>Quando un utente esegue una corrispondenza di parole chiave, l'indice invertito viene utilizzato per recuperare rapidamente tutti i documenti che le contengono. Questo è molto più veloce della scansione di ogni singolo documento.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/keyword-match.png" alt="Keyword Match" class="doc-image" id="keyword-match" />
   </span> <span class="img-wrapper"> <span>Corrispondenza per parola chiave</span> </span></p>
<h2 id="Enable-keyword-match" class="common-anchor-header">Attivazione della corrispondenza per parole chiave<button data-href="#Enable-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>La corrispondenza per parola chiave funziona sul tipo di campo <code translate="no">VARCHAR</code>, che è essenzialmente il tipo di dati stringa di Milvus. Per abilitare la corrispondenza per parola chiave, impostare sia <code translate="no">enable_analyzer</code> che <code translate="no">enable_match</code> su <code translate="no">True</code> e poi configurare facoltativamente un analizzatore per l'analisi del testo quando si definisce lo schema della raccolta.</p>
<h3 id="Set-enableanalyzer-and-enablematch​" class="common-anchor-header">Impostare <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code></h3><p>Per abilitare la corrispondenza delle parole chiave per un campo specifico <code translate="no">VARCHAR</code>, impostare entrambi i parametri <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code> su <code translate="no">True</code> quando si definisce lo schema del campo. In questo modo Milvus viene istruito a tokenizzare il testo e a creare un indice invertito per il campo specificato, consentendo corrispondenze rapide ed efficienti con le parole chiave.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to enable text analysis for this field​</span>
    enable_match=<span class="hljs-literal">True</span> <span class="hljs-comment"># Whether to enable text match​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer​" class="common-anchor-header">Opzionale: Configurare un analizzatore</h3><p>Le prestazioni e la precisione della corrispondenza delle parole chiave dipendono dall'analizzatore selezionato. Diversi analizzatori sono adatti a varie lingue e strutture di testo, quindi la scelta di quello giusto può avere un impatto significativo sui risultati di ricerca per il vostro caso d'uso specifico.</p>
<p>Per impostazione predefinita, Milvus utilizza l'analizzatore <code translate="no">standard</code>, che tokenizza il testo in base agli spazi bianchi e alla punteggiatura, rimuove i token più lunghi di 40 caratteri e converte il testo in minuscolo. Non sono necessari parametri aggiuntivi per applicare questa impostazione predefinita. Per ulteriori informazioni, consultare <a href="/docs/it/standard-analyzer.md">Standard</a>.</p>
<p>Nei casi in cui sia necessario un analizzatore diverso, è possibile configurarne uno usando il parametro <code translate="no">analyzer_params</code>. Ad esempio, per applicare l'analizzatore <code translate="no">english</code> per l'elaborazione del testo inglese.</p>
<pre><code translate="no" class="language-python">analyzer_params={​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">200</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Milvus offre anche altri analizzatori adatti a lingue e scenari diversi. Per maggiori dettagli, consultare la sezione <a href="/docs/it/analyzer-overview.md">Panoramica</a>.</p>
<h2 id="Use-keyword-match" class="common-anchor-header">Utilizzare la corrispondenza delle parole chiave<button data-href="#Use-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta abilitata la corrispondenza di parole chiave per un campo VARCHAR nello schema della raccolta, è possibile eseguire corrispondenze di parole chiave utilizzando l'espressione <code translate="no">TEXT_MATCH</code>.</p>
<h3 id="TEXTMATCH-expression-syntax​" class="common-anchor-header">Sintassi dell'espressione TEXT_MATCH</h3><p>L'espressione <code translate="no">TEXT_MATCH</code> è usata per specificare il campo e le parole chiave da cercare. La sua sintassi è la seguente.</p>
<pre><code translate="no" class="language-python">TEXT_MATCH(field_name, text)​

<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>: Il nome del campo VARCHAR da cercare.</p></li>
<li><p><code translate="no">text</code>: Le parole chiave da cercare. Più parole chiave possono essere separate da spazi o da altri delimitatori appropriati in base alla lingua e all'analizzatore configurato.</p></li>
</ul>
<p>Per impostazione predefinita, <code translate="no">TEXT_MATCH</code> utilizza la logica di corrispondenza <strong>OR</strong>, ovvero restituisce i documenti che contengono una qualsiasi delle parole chiave specificate. Ad esempio, per cercare documenti contenenti le parole chiave <code translate="no">machine</code> o <code translate="no">deep</code> nel campo <code translate="no">text</code>, utilizzare la seguente espressione.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>È anche possibile combinare più espressioni <code translate="no">TEXT_MATCH</code> utilizzando gli operatori logici per eseguire la corrispondenza <strong>AND</strong>. Ad esempio, per cercare documenti contenenti sia <code translate="no">machine</code> che <code translate="no">deep</code> nel campo <code translate="no">text</code>, utilizzare la seguente espressione.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-keyword-match​" class="common-anchor-header">Ricerca con corrispondenza di parole chiave</h3><p>La corrispondenza per parola chiave può essere utilizzata in combinazione con la ricerca per similarità vettoriale per restringere l'ambito di ricerca e migliorare le prestazioni della ricerca. Filtrando la raccolta con la corrispondenza di parole chiave prima della ricerca per similarità vettoriale, è possibile ridurre il numero di documenti da ricercare, con conseguenti tempi di interrogazione più rapidi.</p>
<p>In questo esempio, l'espressione <code translate="no">filter</code> filtra i risultati della ricerca per includere solo i documenti che corrispondono alle parole chiave specificate <code translate="no">keyword1</code> o <code translate="no">keyword2</code>. La ricerca di similarità vettoriale viene quindi eseguita su questo sottoinsieme filtrato di documenti.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>​
​
<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field​</span>
result = MilvusClient.search(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment"># Your collection name​</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name​</span>
    data=[query_vector], <span class="hljs-comment"># Query vector​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># Max. number of results to return​</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment"># Fields to return​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-keyword-match​" class="common-anchor-header">Query con corrispondenza di parole chiave</h3><p>La corrispondenza di parole chiave può essere utilizzata anche per il filtraggio scalare nelle operazioni di query. Specificando un'espressione <code translate="no">TEXT_MATCH</code> nel parametro <code translate="no">expr</code> del metodo <code translate="no">query()</code>, è possibile recuperare i documenti che corrispondono alle parole chiave indicate.</p>
<p>L'esempio seguente recupera i documenti in cui il campo <code translate="no">text</code> contiene entrambe le parole chiave <code translate="no">keyword1</code> e <code translate="no">keyword2</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>​
​
result = MilvusClient.query(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, ​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><ul>
<li><p>L'abilitazione della corrispondenza delle parole chiave per un campo attiva la creazione di un indice invertito, che consuma risorse di archiviazione. Considerare l'impatto sullo storage quando si decide di abilitare questa funzione, poiché varia in base alla dimensione del testo, ai token unici e all'analizzatore utilizzato.</p></li>
<li><p>Una volta definito un analizzatore nello schema, le sue impostazioni diventano permanenti per quella raccolta. Se si decide che un analizzatore diverso è più adatto alle proprie esigenze, si può decidere di abbandonare la raccolta esistente e crearne una nuova con la configurazione dell'analizzatore desiderato.</p></li>
</ul>
