---
id: phrase-match.md
title: Corrispondenza di fraseCompatible with Milvus 2.5.17+
summary: >-
  La corrispondenza di frase consente di cercare i documenti che contengono i
  termini della query come frase esatta. Per impostazione predefinita, le parole
  devono apparire nello stesso ordine e direttamente adiacenti l'una all'altra.
  Ad esempio, una query per "robotics machine learning" corrisponde a un testo
  come "...typical robotics machine learning models...", dove le parole
  "robotics", "machine" e "learning" appaiono in sequenza senza altre parole tra
  loro.
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">Corrispondenza di frase<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>La corrispondenza per frase consente di cercare i documenti che contengono i termini della query come una frase esatta. Per impostazione predefinita, le parole devono apparire nello stesso ordine e direttamente adiacenti l'una all'altra. Ad esempio, una query per <strong>"robotics machine learning"</strong> corrisponde a un testo come <em>"...typical robotics machine learning models...",</em> dove le parole <strong>"robotics",</strong> <strong>"machine"</strong> e <strong>"learning"</strong> appaiono in sequenza senza altre parole tra loro.</p>
<p>Tuttavia, negli scenari reali, una corrispondenza rigida delle frasi può essere troppo rigida. Si potrebbe voler abbinare un testo come <em>"...modelli di apprendimento automatico ampiamente adottati nella robotica...".</em> In questo caso, le stesse parole chiave sono presenti ma non affiancate o nell'ordine originale. Per gestire questo problema, la corrispondenza di frasi supporta il parametro <code translate="no">slop</code>, che introduce una certa flessibilità. Il valore <code translate="no">slop</code> definisce quanti spostamenti di posizione sono consentiti tra i termini della frase. Ad esempio, con un <code translate="no">slop</code> di 1, una query per <strong>"machine learning"</strong> può corrispondere a un testo come <em>"...machine deep learning...",</em> dove una parola (<strong>"deep")</strong> separa i termini originali.</p>
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
    </button></h2><p>Grazie alla libreria del motore di ricerca <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, la corrispondenza di frase funziona analizzando le informazioni sulla posizione delle parole all'interno dei documenti. Il diagramma seguente illustra il processo:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
   </span> <span class="img-wrapper"> <span>Flusso di lavoro Phrase Match</span> </span></p>
<ol>
<li><p><strong>Tokenizzazione del documento</strong>: Quando si inseriscono i documenti in Milvus, il testo viene suddiviso in token (singole parole o termini) mediante un analizzatore, con informazioni di posizione registrate per ogni token. Ad esempio, <strong>doc_1</strong> viene tokenizzato in <strong>["macchina" (pos=0), "apprendimento" (pos=1), "boost" (pos=2), "efficienza" (pos=3)]</strong>. Per ulteriori informazioni sugli analizzatori, consultare la sezione <a href="/docs/it/analyzer-overview.md">Panoramica sugli analizzatori</a>.</p></li>
<li><p><strong>Creazione di indici invertiti</strong>: Milvus crea un indice inverso, mappando ogni token al documento o ai documenti in cui compare e alla posizione del token in quei documenti.</p></li>
<li><p><strong>Corrispondenza delle frasi</strong>: quando viene eseguita una query di frasi, Milvus cerca ogni token nell'indice invertito e controlla le loro posizioni per determinare se appaiono nell'ordine e nella prossimità corretti. Il parametro <code translate="no">slop</code> controlla il numero massimo di posizioni consentite tra i token corrispondenti:</p>
<ul>
<li><p><strong>slop = 0</strong> significa che i token devono apparire <strong>nell'ordine esatto e immediatamente adiacenti</strong> (cioè, senza parole aggiuntive in mezzo).</p>
<ul>
<li>Nell'esempio, solo <strong>doc_1</strong> (<strong>"macchina"</strong> a <strong>pos=0</strong>, <strong>"apprendimento"</strong> a <strong>pos=1</strong>) corrisponde esattamente.</li>
</ul></li>
<li><p><strong>slop = 2</strong> consente fino a due posizioni di flessibilità o riarrangiamento tra i token corrispondenti.</p>
<ul>
<li><p>Ciò consente di invertire l'ordine (<strong>"macchina per imparare")</strong> o di avere un piccolo spazio tra i token.</p></li>
<li><p>Di conseguenza, <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>"learning"</strong> a <strong>pos=0</strong>, <strong>"machine"</strong> a <strong>pos=1</strong>) e <strong>doc_3</strong> (<strong>"learning"</strong> a <strong>pos=1</strong>, <strong>"machine"</strong> a <strong>pos=2</strong>) corrispondono tutti.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">Abilitare la corrispondenza di frase<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>La corrispondenza per frase funziona con il tipo di campo <code translate="no">VARCHAR</code>, il tipo di dati stringa di Milvus. Per abilitare la corrispondenza di frase, configurare lo schema della raccolta impostando entrambi i parametri <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code> su <code translate="no">True</code>, in modo simile alla <a href="/docs/it/keyword-match.md">corrispondenza di testo</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Impostare <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>Per abilitare la corrispondenza di frasi per un campo specifico <code translate="no">VARCHAR</code>, impostare entrambi i parametri <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code> su <code translate="no">True</code> quando si definisce lo schema del campo. Questa configurazione indica a Milvus di tokenizzare il testo e di creare un indice invertito con le informazioni posizionali necessarie per una corrispondenza efficiente delle frasi.</p>
<p>Ecco un esempio di definizione dello schema per abilitare la corrispondenza delle frasi:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Opzionale: Configurare un analizzatore<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>L'accuratezza della corrispondenza delle frasi dipende in modo significativo dall'analizzatore utilizzato per la tokenizzazione dei dati di testo. Analizzatori diversi si adattano a lingue e formati di testo diversi, influenzando la tokenizzazione e la precisione posizionale. La selezione di un analizzatore appropriato per il vostro caso d'uso specifico ottimizzerà i risultati della corrispondenza delle frasi.</p>
<p>Per impostazione predefinita, Milvus utilizza l'analizzatore standard, che tokenizza il testo in base agli spazi bianchi e alla punteggiatura, rimuove i token più lunghi di 40 caratteri e converte il testo in minuscolo. Per l'uso predefinito non sono richiesti parametri aggiuntivi. Per ulteriori informazioni, consultare l'<a href="/docs/it/standard-analyzer.md">Analizzatore standard</a>.</p>
<p>Se l'applicazione richiede un analizzatore specifico, è necessario configurarlo con il parametro <code translate="no">analyzer_params</code>. Ad esempio, ecco come configurare l'analizzatore <code translate="no">english</code> per la corrispondenza di frasi nel testo inglese:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus supporta diversi analizzatori adatti a lingue e casi d'uso diversi. Per informazioni dettagliate, consultare la sezione <a href="/docs/it/analyzer-overview.md">Panoramica degli analizzatori</a>.</p>
<h2 id="Use-phrase-match" class="common-anchor-header">Utilizzare la corrispondenza delle frasi<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta attivata la corrispondenza per un campo <code translate="no">VARCHAR</code> nello schema della raccolta, è possibile eseguire corrispondenze di frasi utilizzando l'espressione <code translate="no">PHRASE_MATCH</code>.</p>
<div class="alert note">
<p>L'espressione <code translate="no">PHRASE_MATCH</code> non fa distinzione tra maiuscole e minuscole. Si può usare sia <code translate="no">PHRASE_MATCH</code> che <code translate="no">phrase_match</code>.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">Sintassi dell'espressione PHRASE_MATCH<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare l'espressione <code translate="no">PHRASE_MATCH</code> per specificare il campo, la frase e la flessibilità opzionale (<code translate="no">slop</code>) durante la ricerca. La sintassi è:</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> Il nome del campo <code translate="no">VARCHAR</code> su cui eseguire le corrispondenze di frase.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> La frase esatta da cercare.</p></li>
<li><p><code translate="no">slop</code> (opzionale)<strong>:</strong> Un numero intero che specifica il numero massimo di posizioni consentite nei token di corrispondenza.</p>
<ul>
<li><p><code translate="no">0</code> (predefinito): Corrisponde solo alle frasi esatte. Esempio: Un filtro per <strong>"machine learning"</strong> corrisponderà esattamente a <strong>"machine learning"</strong>, ma non a <strong>"machine boosts learning"</strong> o <strong>"learning machine".</strong></p></li>
<li><p><code translate="no">1</code>: Consente variazioni minime, ad esempio un termine in più o un piccolo spostamento di posizione. Esempio: Un filtro per <strong>"machine learning"</strong> corrisponderà a <strong>"machine boosts learning"</strong> (un token tra <strong>"machine"</strong> e <strong>"learning")</strong> ma non a <strong>"learning machine"</strong> (termini invertiti).</p></li>
<li><p><code translate="no">2</code>: Permette una maggiore flessibilità, includendo l'ordine inverso dei termini o fino a due token tra di essi. Esempio: Un filtro per <strong>"machine learning"</strong> corrisponderà a <strong>"machine learning"</strong> (termini invertiti) o <strong>"machine quickly boosts learning"</strong> (due token tra <strong>"machine"</strong> e <strong>"learning")</strong>.</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Esempio di set di dati<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>Supponiamo di avere una raccolta denominata <strong>tech_articles</strong> contenente le seguenti cinque entità:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"L'apprendimento automatico aumenta l'efficienza dell'analisi dei dati su larga scala".</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"L'apprendimento di un approccio basato sulle macchine è fondamentale per il progresso dell'IA moderna".</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Le architetture delle macchine per l'apprendimento profondo ottimizzano i carichi computazionali"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"Le macchine migliorano rapidamente le prestazioni dei modelli per l'apprendimento continuo".</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"L'apprendimento di algoritmi macchina avanzati espande le capacità dell'IA".</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Query con corrispondenza di frase<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando si utilizza il metodo <code translate="no">query()</code>, <strong>PHRASE_MATCH</strong> agisce come un filtro scalare. Vengono restituiti solo i documenti che contengono la frase specificata (con lo slop consentito).</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Esempio: slop = 0 (corrispondenza esatta)</h4><p>Questo esempio restituisce i documenti che contengono la frase esatta <strong>"machine learning"</strong> senza alcun token aggiuntivo in mezzo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Risultati di corrispondenza attesi:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"L'apprendimento automatico aumenta l'efficienza nell'analisi dei dati su larga scala".</p></td>
   </tr>
</table>
<p>Solo il documento 1 contiene la frase esatta <strong>"machine learning"</strong> nell'ordine specificato senza token aggiuntivi.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Ricerca con corrispondenza di frase<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Nelle operazioni di ricerca, <strong>PHRASE_MATCH</strong> viene utilizzato per filtrare i documenti prima di applicare il ranking di similarità vettoriale. Questo approccio in due fasi restringe dapprima l'insieme dei candidati tramite la corrispondenza testuale e poi li classifica nuovamente in base alle incorporazioni vettoriali.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Esempio: slop = 1</h4><p>Il filtro viene applicato ai documenti che contengono la frase <strong>"learning machine"</strong> con una leggera flessibilità.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Risultati della corrispondenza:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"L'apprendimento di un approccio basato sulle macchine è fondamentale per il progresso dell'IA moderna".</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Le architetture delle macchine per l'apprendimento profondo ottimizzano i carichi computazionali".</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"L'apprendimento di algoritmi macchina avanzati espande le capacità dell'IA".</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Esempio: slop = 2</h4><p>Questo esempio consente uno slop di 2, ovvero sono consentiti fino a due token extra (o termini invertiti) tra le parole <strong>"machine"</strong> e <strong>"learning".</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Risultati della corrispondenza:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"L'apprendimento automatico aumenta l'efficienza nell'analisi dei dati su larga scala".</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Le architetture di macchine per l'apprendimento profondo ottimizzano i carichi computazionali".</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Esempio: slop = 3</h4><p>In questo esempio, uno slop di 3 offre una flessibilità ancora maggiore. Il filtro cerca <strong>"machine learning"</strong> con un massimo di tre posizioni di token tra le parole.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Risultati della corrispondenza:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"L'apprendimento automatico aumenta l'efficienza nell'analisi dei dati su larga scala".</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"L'apprendimento di un approccio basato sulle macchine è fondamentale per il progresso dell'IA moderna".</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Le architetture delle macchine per l'apprendimento profondo ottimizzano i carichi computazionali"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"L'apprendimento di algoritmi macchina avanzati espande le capacità dell'IA".</p></td>
   </tr>
</table>
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
<li><p>L'abilitazione della corrispondenza delle frasi per un campo attiva la creazione di un indice invertito, che consuma risorse di archiviazione. Considerare l'impatto sullo storage quando si decide di abilitare questa funzione, poiché varia in base alle dimensioni del testo, ai token unici e all'analizzatore utilizzato.</p></li>
<li><p>Una volta definito un analizzatore nello schema, le sue impostazioni diventano permanenti per quella raccolta. Se si decide che un analizzatore diverso è più adatto alle proprie esigenze, si può decidere di abbandonare la raccolta esistente e crearne una nuova con la configurazione dell'analizzatore desiderato.</p></li>
<li><p>Le prestazioni della corrispondenza delle frasi dipendono dal modo in cui il testo viene tokenizzato. Prima di applicare un analizzatore all'intera raccolta, utilizzare il metodo <code translate="no">run_analyzer</code> per esaminare il risultato della tokenizzazione. Per ulteriori informazioni, consultare la sezione <a href="/docs/it/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">Panoramica dell'analizzatore</a>.</p></li>
<li><p>Regole di escape nelle espressioni di <code translate="no">filter</code>:</p>
<ul>
<li><p>I caratteri racchiusi tra doppi apici o apici singoli all'interno delle espressioni vengono interpretati come costanti di stringa. Se la costante di stringa include caratteri di escape, i caratteri di escape devono essere rappresentati con una sequenza di escape. Ad esempio, utilizzare <code translate="no">\\</code> per rappresentare <code translate="no">\</code>, <code translate="no">\\t</code> per rappresentare una tabulazione <code translate="no">\t</code> e <code translate="no">\\n</code> per rappresentare una newline.</p></li>
<li><p>Se una costante di stringa è racchiusa da apici singoli, un apice singolo all'interno della costante deve essere rappresentato come <code translate="no">\\'</code> mentre un doppio apice può essere rappresentato come <code translate="no">&quot;</code> o <code translate="no">\\&quot;</code>. Esempio: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Se una costante di stringa è racchiusa da doppi apici, un doppio apice all'interno della costante deve essere rappresentato come <code translate="no">\\&quot;</code> mentre un apice singolo può essere rappresentato come <code translate="no">'</code> o <code translate="no">\\'</code>. Esempio: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
