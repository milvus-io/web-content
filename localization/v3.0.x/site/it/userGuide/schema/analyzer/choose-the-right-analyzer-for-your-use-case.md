---
id: choose-the-right-analyzer-for-your-use-case.md
title: Scegli l'analizzatore più adatto al tuo caso d'uso
summary: Note
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">Scegli l'analizzatore più adatto al tuo caso d'uso<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert note">
<p>Questa guida si concentra sugli aspetti pratici del processo decisionale per la scelta dell'analizzatore. Per i dettagli tecnici sui componenti dell'analizzatore e su come aggiungere i parametri dell'analizzatore, consultare <a href="/docs/it/analyzer-overview.md">la Panoramica sull'analizzatore</a>.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">Comprendere gli analizzatori in 2 minuti<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus, un analizzatore elabora il testo memorizzato in questo campo per renderlo ricercabile in base a caratteristiche quali <a href="/docs/it/full-text-search.md">la ricerca full-text</a> (BM25), <a href="/docs/it/phrase-match.md">la corrispondenza di frasi</a> o <a href="/docs/it/keyword-match.md">la corrispondenza di testo</a>. Consideralo come un elaboratore di testo che trasforma i tuoi contenuti grezzi in token ricercabili.</p>
<p>Un analizzatore opera in una semplice pipeline a due fasi:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" /> 
   <span>Flusso di lavoro dell’analizzatore</span>
  
 </span></p>
<ol>
<li><p><strong>Tokenizzazione (obbligatoria):</strong> questa fase iniziale applica un <strong>tokenizzatore</strong> per suddividere una stringa continua di testo in unità discrete e significative chiamate token. Il metodo di tokenizzazione può variare in modo significativo a seconda della lingua e del tipo di contenuto.</p></li>
<li><p><strong>Filtraggio dei token (facoltativo):</strong> dopo la tokenizzazione, vengono applicati <strong>dei filtri</strong> per modificare, rimuovere o perfezionare i token. Queste operazioni possono includere la conversione di tutti i token in minuscolo, la rimozione di parole comuni prive di significato (come le stopword) o la riduzione delle parole alla loro forma radice (stemming).</p></li>
</ol>
<p><strong>Esempio</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">Perché la scelta dell’analizzatore è importante<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>La scelta di un analizzatore errato può rendere i documenti rilevanti non ricercabili o restituire risultati irrilevanti.</p>
<p>La tabella seguente riassume i problemi comuni causati da una selezione impropria dell’analizzatore e fornisce soluzioni concrete per diagnosticare i problemi di ricerca.</p>
<table>
   <tr>
     <th><p>Problema</p></th>
     <th><p>Sintomo</p></th>
     <th><p>Esempio (Input e Output)</p></th>
     <th><p>Causa (analizzatore non corretto)</p></th>
     <th><p>Soluzione (analizzatore corretto)</p></th>
   </tr>
   <tr>
     <td><p>Tokenizzazione eccessiva</p></td>
     <td><p>Le ricerche testuali di termini tecnici, identificatori o URL non riescono a individuare documenti pertinenti.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/it/standard-analyzer.md"><code translate="no">standard</code></a> analizzatore</p></td>
     <td><p>Utilizzare un <a href="/docs/it/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizer; combinarlo con un <a href="/docs/it/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filtro.</p></td>
   </tr>
   <tr>
     <td><p>Tokenizzazione insufficiente</p></td>
     <td><p>La ricerca di una componente di una frase composta da più parole non restituisce documenti contenenti la frase completa.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>Analizzatore con un <a href="/docs/it/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizer</p></td>
     <td><p>Utilizzare un <a href="/docs/it/standard-tokenizer.md"><code translate="no">standard</code></a> tokenizer per effettuare la suddivisione in base alla punteggiatura e agli spazi; utilizzare un filtro <a href="/docs/it/regex-filter.md">regex</a> personalizzato.</p></td>
   </tr>
   <tr>
     <td><p>Discrepanze linguistiche</p></td>
     <td><p>I risultati della ricerca per una lingua specifica non hanno senso o sono inesistenti.</p></td>
     <td><p>Testo in cinese: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (un unico token)</p></td>
     <td><p><a href="/docs/it/english-analyzer.md"><code translate="no">english</code></a> analizzatore</p></td>
     <td><p>Utilizzare un analizzatore specifico per la lingua, come <a href="/docs/it/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
   <tr>
     <td><p>Incompatibilità del metodo di immissione</p></td>
     <td><p>Gli utenti digitano in pinyin, ma il testo indicizzato utilizza caratteri cinesi.</p></td>
     <td><p>Testo cinese: <code translate="no">"足球"</code>; testo della query: <code translate="no">"zuqiu"</code></p></td>
     <td><p>Analizzatore che genera solo token di caratteri cinesi</p></td>
     <td><p>Utilizzare un analizzatore personalizzato con il <a href="/docs/it/jieba-tokenizer.md"><code translate="no">jieba</code></a> tokenizer e <a href="/docs/it/pinyin-filter.md"><code translate="no">pinyin</code></a> filtro.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">Prima domanda: è necessario scegliere un analizzatore?<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Per molti casi d'uso, non è necessario fare nulla di particolare. Verifichiamo se il tuo caso rientra tra questi.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">Comportamento predefinito: analizzatore " <code translate="no">standard</code> "<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Se non si specifica un analizzatore quando si utilizzano funzionalità di recupero del testo come la ricerca full-text, Milvus utilizza automaticamente l’ <a href="/docs/it/standard-analyzer.md"><code translate="no">standard</code></a> analizzatore.</p>
<p>L'analizzatore <code translate="no">standard</code>:</p>
<ul>
<li><p>Suddivide il testo in base agli spazi e ai segni di punteggiatura</p></li>
<li><p>Converte tutti i token in minuscolo</p></li>
<li><p>Rimuove un insieme predefinito di stop word comuni in inglese e la maggior parte dei segni di punteggiatura</p></li>
</ul>
<p><strong>Esempio di trasformazione</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">Criteri decisionali: una verifica rapida<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizza questa tabella per determinare rapidamente se l'analizzatore predefinito " <code translate="no">standard</code> " soddisfa le tue esigenze. In caso contrario, dovrai scegliere un percorso diverso.</p>
<table>
   <tr>
     <th><p>Il tuo contenuto</p></th>
     <th><p>L'analizzatore standard va bene?</p></th>
     <th><p>Perché</p></th>
     <th><p>Cosa ti serve</p></th>
   </tr>
   <tr>
     <td><p>Post di blog in inglese</p></td>
     <td><p>✅ Sì</p></td>
     <td><p>Il comportamento predefinito è sufficiente.</p></td>
     <td><p>Utilizza l'impostazione predefinita (non è necessaria alcuna configurazione).</p></td>
   </tr>
   <tr>
     <td><p>Documenti in cinese</p></td>
     <td><p>❌ No</p></td>
     <td><p>Le parole in cinese non contengono spazi e verranno trattate come un unico token.</p></td>
     <td><p>Utilizzare un <a href="/docs/it/chinese-analyzer.md"><code translate="no">chinese</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>Documenti in arabo</p></td>
     <td><p>❌ No</p></td>
     <td><p>Il testo arabo può includere varianti di lettere, segni diacritici, Tatweel, cifre arabo-indiane e parole vuote arabe comuni che richiedono una gestione specifica per la lingua.</p></td>
     <td><p>Utilizza un <a href="/docs/it/arabic-analyzer.md"><code translate="no">arabic</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>Documenti in thailandese</p></td>
     <td><p>❌ No</p></td>
     <td><p>Il testo in thailandese di solito non utilizza spazi tra le parole, pertanto richiede una segmentazione delle parole specifica per la lingua.</p></td>
     <td><p>Utilizza un <a href="/docs/it/thai-analyzer.md"><code translate="no">thai</code></a> .</p></td>
   </tr>
   <tr>
     <td><p>Documentazione tecnica</p></td>
     <td><p>❌ No</p></td>
     <td><p>La punteggiatura viene rimossa da termini come <code translate="no">C++</code>.</p></td>
     <td><p>Crea un analizzatore personalizzato con un <a href="/docs/it/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizer e un <a href="/docs/it/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filtro.</p></td>
   </tr>
   <tr>
     <td><p>Lingue con testi separati da spazi, come il francese o lo spagnolo</p></td>
     <td><p>⚠️ Forse</p></td>
     <td><p>i caratteri accentati (<code translate="no">café</code> vs. <code translate="no">cafe</code>) potrebbero non corrispondere.</p></td>
     <td><p>Si consiglia di utilizzare un analizzatore personalizzato con il <a href="/docs/it/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> per ottenere risultati migliori.</p></td>
   </tr>
   <tr>
     <td><p>Lingue multilingue o sconosciute</p></td>
     <td><p>❌ No</p></td>
     <td><p>L'analizzatore <code translate="no">standard</code> non dispone della logica specifica per la lingua necessaria per gestire diversi set di caratteri e regole di tokenizzazione.</p></td>
     <td><p>Utilizzare un analizzatore personalizzato con il <a href="/docs/it/icu-tokenizer.md"><code translate="no">icu</code></a> tokenizer per una tokenizzazione compatibile con Unicode. </p><p>In alternativa, si consiglia di configurare <a href="/docs/it/multi-language-analyzers.md">analizzatori multilingue</a> o un <a href="/docs/it/language-identifier.md">identificatore di lingua</a> per una gestione più precisa dei contenuti multilingue.</p></td>
   </tr>
</table>
<p>Se l'analizzatore predefinito " <code translate="no">standard</code> " non soddisfa le vostre esigenze, è necessario implementarne uno diverso. Sono disponibili due opzioni:</p>
<ul>
<li><p><a href="/docs/it/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">Utilizzare un analizzatore integrato</a> oppure</p></li>
<li><p><a href="/docs/it/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">crearne uno personalizzato</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">Opzione A: Utilizzare gli analizzatori integrati<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli analizzatori integrati sono soluzioni preconfigurate per le lingue più comuni. Rappresentano il modo più semplice per iniziare quando l’analizzatore standard predefinito non è perfettamente adatto.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">Analizzatori integrati disponibili<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>Analizzatore</p></th>
     <th><p>Linguaggio supportato</p></th>
     <th><p>Componenti</p></th>
     <th><p>Note</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>La maggior parte delle lingue in cui le parole sono separate da spazi (inglese, francese, tedesco, spagnolo, ecc.)</p></td>
     <td><ul><li><p>Tokenizzatore: <code translate="no">standard</code></p></li><li><p>Filtri: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>Analizzatore generico per l'elaborazione iniziale del testo. Per scenari monolingui, gli analizzatori specifici per lingua (come <code translate="no">english</code>) offrono prestazioni migliori.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>Dedicato all'inglese, che applica lo stemming e la rimozione delle parole vuote per una migliore corrispondenza semantica in inglese</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">standard</code></p></li><li><p>Filtri: <code translate="no">lowercase</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Consigliato per contenuti esclusivamente in inglese rispetto a <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>Cinese</p></td>
     <td><ul><li><p>Tokenizzatore: <code translate="no">jieba</code></p></li><li><p>Filtri: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>Attualmente utilizza per impostazione predefinita il dizionario del cinese semplificato.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/arabic-analyzer.md"><code translate="no">arabic</code></a></p></td>
     <td><p>Arabo</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">standard</code></p></li><li><p>Filtri: <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">arabic_normalization</code>, <code translate="no">stemmer</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Consigliato per i testi in arabo rispetto a <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/thai-analyzer.md"><code translate="no">thai</code></a></p></td>
     <td><p>Thai</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">thai</code></p></li><li><p>Filtri: <code translate="no">lowercase</code>, <code translate="no">decimaldigit</code>, <code translate="no">stop</code></p></li></ul></td>
     <td><p>Consigliato per i testi in thailandese rispetto a <code translate="no">standard</code> o alla tokenizzazione basata sugli spazi.</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">Esempio di implementazione<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>Per utilizzare un analizzatore integrato, è sufficiente specificarne il tipo in <code translate="no">analyzer_params</code> durante la definizione dello schema del campo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using built-in English analyzer</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Per informazioni dettagliate sull'utilizzo, consultare <a href="/docs/it/full-text-search.md">Ricerca full-text</a>, <a href="/docs/it/keyword-match.md">Corrispondenza di testo</a> o <a href="/docs/it/phrase-match.md">Corrispondenza di frasi</a>.</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">Percorso B: Creazione di un analizzatore personalizzato<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando <a href="/docs/it/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">le opzioni integrate</a> non soddisfano le proprie esigenze, è possibile creare un analizzatore personalizzato combinando un tokenizzatore con una serie di filtri. Ciò consente di avere il pieno controllo sulla pipeline di elaborazione del testo.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">Passaggio 1: Seleziona il tokenizer in base alla lingua<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>Scegli il tokenizer in base alla lingua principale dei tuoi contenuti:</p>
<h4 id="Western-languages" class="common-anchor-header">Lingue occidentali</h4><p>Per le lingue con spazi separatori, sono disponibili le seguenti opzioni:</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>Come funziona</p></th>
     <th><p>Ideale per</p></th>
     <th><p>Esempi</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Suddivide il testo in base agli spazi e ai segni di punteggiatura</p></td>
     <td><p>Testo generico, punteggiatura mista</p></td>
     <td><ul><li><p>Input: <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>Output: <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>Suddivide solo in base ai caratteri di spazio</p></td>
     <td><p>Contenuto pre-elaborato, testo formattato dall'utente</p></td>
     <td><ul><li><p>Input: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>Risultato: <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">Lingue dell'Asia orientale</h4><p>Le lingue che non utilizzano gli spazi in modo coerente tra le parole richiedono tokenizzatori specializzati per una corretta segmentazione delle parole:</p>
<h5 id="Chinese" class="common-anchor-header">Cinese</h5><table>
   <tr>
     <th><p>Tokenizzatore</p></th>
     <th><p>Come funziona</p></th>
     <th><p>Ideale per</p></th>
     <th><p>Esempi</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>Segmentazione basata su dizionario cinese con algoritmo intelligente</p></td>
     <td><p><strong>Consigliato per i contenuti in cinese</strong>: combina il dizionario con algoritmi intelligenti, progettati specificamente per il cinese</p></td>
     <td><ul><li><p>Input: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>Output: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>Analisi morfologica basata esclusivamente sul dizionario con dizionario cinese (<a href="https://cc-cedict.org/wiki/">cc-cedict</a>)</p></td>
     <td><p>Rispetto a <code translate="no">jieba</code>, elabora il testo cinese in modo più generico</p></td>
     <td><ul><li><p>Input: <code translate="no">"机器学习算法"</code></p></li><li><p>Output: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Thai" class="common-anchor-header">Thailandese</h5><p>Per la maggior parte dei testi in thailandese, utilizzare l' <a href="/docs/it/thai-analyzer.md"><code translate="no">thai</code></a> . Utilizzare il <a href="/docs/it/thai-tokenizer.md"><code translate="no">thai</code></a> solo quando è necessario creare una pipeline di analizzatori personalizzata.</p>
<table>
   <tr>
     <th><p>Tokenizzatore</p></th>
     <th><p>Come funziona</p></th>
     <th><p>Ideale per</p></th>
     <th><p>Esempi</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/thai-tokenizer.md"><code translate="no">thai</code></a></p></td>
     <td><p>Segmenta il testo in lingua thailandese in token di parole ed elimina gli spazi bianchi e i segmenti composti esclusivamente da segni di punteggiatura</p></td>
     <td><p>Pipeline di analisi personalizzate per testi in thailandese o misti (thailandese/inglese)</p></td>
     <td><ul><li><p>Input: <code translate="no">"สวัสดี! ทดสอบ, ระบบ Milvus"</code></p></li><li><p>Output: <code translate="no">['สวัสดี', 'ทดสอบ', 'ระบบ', 'Milvus']</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">Giapponese e coreano</h5><table>
   <tr>
     <th><p>Lingua</p></th>
     <th><p>Tokenizzatore</p></th>
     <th><p>Opzioni del dizionario</p></th>
     <th><p>Ideale per</p></th>
     <th><p>Esempi</p></th>
   </tr>
   <tr>
     <td><p>Giapponese</p></td>
     <td><p><a href="/docs/it/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipadic</a> (uso generale), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipadic-neologd</a> (termini moderni), <a href="https://clrd.ninjal.ac.jp/unidic/">unidic</a> (accademico)</p></td>
     <td><p>Analisi morfologica con gestione dei nomi propri</p></td>
     <td><ul><li><p>Input: <code translate="no">"東京都渋谷区"</code></p></li><li><p>Output: <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>Coreano</p></td>
     <td><p><a href="/docs/it/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>Analisi morfologica coreana</p></td>
     <td><ul><li><p>Input: <code translate="no">"안녕하세요"</code></p></li><li><p>Output: <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">Lingue multilingue o sconosciute</h4><p>Per contenuti in cui le lingue sono imprevedibili o mescolate all'interno dei documenti:</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>Come funziona</p></th>
     <th><p>Ideale per</p></th>
     <th><p>Esempi</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Tokenizzazione compatibile con Unicode (International Components for Unicode)</p></td>
     <td><p>Scritture miste, lingue sconosciute o quando è sufficiente una tokenizzazione semplice</p></td>
     <td><ul><li><p>Input: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>Output: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>Quando utilizzare icu</strong>:</p>
<ul>
<li><p>Lingue miste in cui l'identificazione della lingua è impraticabile.</p></li>
<li><p>Non si desidera l'overhead degli <a href="/docs/it/multi-language-analyzers.md">analizzatori multilingue</a> o <a href="/docs/it/language-identifier.md">dell'identificatore di lingua</a>.</p></li>
<li><p>Il contenuto presenta una lingua principale con sporadiche parole straniere che incidono in misura minima sul significato complessivo (ad esempio, un testo in inglese con sporadici nomi di marchi o termini tecnici in giapponese o francese).</p></li>
</ul>
<p><strong>Approcci alternativi</strong>: per una gestione più precisa dei contenuti multilingue, si consiglia di utilizzare analizzatori multilingue o l’identificatore di lingua. Per ulteriori dettagli, consultare <a href="/docs/it/multi-language-analyzers.md">Analizzatori multilingue</a> o <a href="/docs/it/language-identifier.md">Identificatore di lingua</a>.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">Fase 2: Aggiungere filtri per la precisione<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>Dopo <a href="/docs/it/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">aver selezionato il tokenizer</a>, applicare i filtri in base alle specifiche esigenze di ricerca e alle caratteristiche dei contenuti.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">Filtri di uso comune</h4><p>Questi filtri sono essenziali per la maggior parte delle configurazioni linguistiche con separazione tramite spazi (inglese, francese, tedesco, spagnolo, ecc.) e migliorano significativamente la qualità della ricerca:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Come funziona</p></th>
     <th><p>Quando utilizzarlo</p></th>
     <th><p>Esempi</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>Converti tutti i token in minuscolo</p></td>
     <td><p>Universale: si applica a tutte le lingue che distinguono tra maiuscole e minuscole</p></td>
     <td><ul><li><p>Input: <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>Risultato: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>Ridurre le parole alla loro forma di base</p></td>
     <td><p>Lingue con flessioni delle parole (inglese, francese, tedesco, ecc.)</p></td>
     <td><p>Per l'inglese:</p><ul><li><p>Input: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>Risultato: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>Rimuovere le parole comuni prive di significato</p></td>
     <td><p>La maggior parte delle lingue - particolarmente efficace per le lingue con separazione spaziale</p></td>
     <td><ul><li><p>Input: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>Risultato: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Per le lingue dell'Asia orientale (cinese, giapponese, coreano, ecc.), concentrarsi invece su <a href="/docs/it/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">filtri specifici per ciascuna lingua</a>. Queste lingue utilizzano in genere approcci diversi per l'elaborazione del testo e potrebbero non trarre benefici significativi dallo stemming.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">Filtri di normalizzazione del testo</h4><p>Questi filtri standardizzano le variazioni del testo per migliorare la coerenza delle corrispondenze:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Come funziona</p></th>
     <th><p>Quando utilizzarlo</p></th>
     <th><p>Esempi</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>Converte i caratteri accentati nei loro equivalenti ASCII</p></td>
     <td><p>Contenuti internazionali, contenuti generati dagli utenti</p></td>
     <td><ul><li><p>Input: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>Output: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">Filtraggio dei token</h4><p>Controlla quali token vengono conservati in base al contenuto o alla lunghezza dei caratteri:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Come funziona</p></th>
     <th><p>Quando utilizzarlo</p></th>
     <th><p>Esempi</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>Rimuovi i token di punteggiatura isolati</p></td>
     <td><p>Pulizia dell'output generato dai tokenizzatori <code translate="no">jieba</code>, <code translate="no">lindera</code> e <code translate="no">icu</code>, che restituiscono i segni di punteggiatura come singoli token</p></td>
     <td><ul><li><p>Input: <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>Output: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>Mantenere solo lettere e numeri</p></td>
     <td><p>Contenuti tecnici, elaborazione del testo pulito</p></td>
     <td><ul><li><p>Input: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>Risultato: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>Rimuovere i token al di fuori dell'intervallo di lunghezza specificato</p></td>
     <td><p>Filtrare il rumore (token eccessivamente lunghi)</p></td>
     <td><ul><li><p>Input: <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>Risultato: <code translate="no">[['a'], ['very'], []]</code> (se <strong>max=10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>Filtraggio personalizzato basato su modelli</p></td>
     <td><p>Requisiti specifici per i token in base al dominio</p></td>
     <td><ul><li><p>Input: <code translate="no">["test123", "prod456"]</code></p></li><li><p>Output: <code translate="no">[[], ['prod456']]</code> (se <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">Filtri specifici per lingua</h4><p>Questi filtri gestiscono caratteristiche specifiche della lingua:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Lingua</p></th>
     <th><p>Come funziona</p></th>
     <th><p>Esempi</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>Tedesco</p></td>
     <td><p>Suddividere le parole composte in parti ricercabili</p></td>
     <td><ul><li><p>Input: <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>Risultato: <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>Cinese</p></td>
     <td><p>Mantiene i caratteri cinesi + i caratteri alfanumerici</p></td>
     <td><ul><li><p>Input: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>Risultato: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>Cinese</p></td>
     <td><p>Mantiene solo i caratteri cinesi</p></td>
     <td><ul><li><p>Input: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>Risultato: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/pinyin-filter.md"><code translate="no">pinyin</code></a></p></td>
     <td><p>Cinese</p></td>
     <td><p>Genera forme di token in pinyin per i token cinesi</p></td>
     <td><ul><li><p>Input: <code translate="no">["中文"]</code></p></li><li><p>Output: <code translate="no">[['中文', 'zhong', 'wen']]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">Passaggio 3: Combinazione e implementazione<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>Per creare un analizzatore personalizzato, è necessario definire il tokenizzatore e un elenco di filtri nel dizionario ` <code translate="no">analyzer_params</code> `. I filtri vengono applicati nell'ordine in cui sono elencati.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: A custom analyzer for technical content</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;alphanumonly&quot;</span>]
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">Finale: Testare con <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Verifica sempre la configurazione prima di applicarla a una raccolta:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>Problemi comuni da verificare:</p>
<ul>
<li><p><strong>Tokenizzazione eccessiva</strong>: i termini tecnici vengono suddivisi in modo errato</p></li>
<li><p><strong>Tokenizzazione</strong> insufficiente: frasi non separate correttamente</p></li>
<li><p><strong>Token mancanti</strong>: termini importanti che vengono filtrati</p></li>
</ul>
<p>Per informazioni dettagliate sull'utilizzo, consultare <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>.</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">Configurazioni consigliate in base al caso d'uso<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione fornisce le configurazioni consigliate per il tokenizzatore e il filtro nei casi d'uso più comuni quando si lavora con gli analizzatori in Milvus. Scegli la combinazione che meglio si adatta al tuo tipo di contenuto e alle tue esigenze di ricerca.</p>
<div class="alert note">
<p>Prima di applicare un analizzatore alla propria raccolta, si consiglia di utilizzare <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> per testare e verificare le prestazioni dell’analisi del testo.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">Lingue con accenti (francese, spagnolo, tedesco, ecc.)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizza un tokenizer <code translate="no">standard</code> con conversione in minuscolo, stemming specifico per la lingua e rimozione delle stopword. Questa configurazione funziona anche per altre lingue europee modificando i parametri <code translate="no">language</code> e <code translate="no">stop_words</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># French example</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>, 
        <span class="hljs-string">&quot;asciifolding&quot;</span>,  <span class="hljs-comment"># Handle accent marks</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;french&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_french_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># For other languages, modify the language parameter:</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;spanish&quot; for Spanish</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;german&quot; for German</span>
<span class="hljs-comment"># &quot;stop_words&quot;: [&quot;_spanish_&quot;] or [&quot;_german_&quot;] accordingly</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="English-content" class="common-anchor-header">Contenuti in inglese<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Per l'elaborazione di testi in inglese con filtraggio completo. È inoltre possibile utilizzare l'analizzatore integrato <a href="/docs/it/english-analyzer.md"><code translate="no">english</code></a> :</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chinese-content" class="common-anchor-header">Contenuti in cinese<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare il tokenizer <code translate="no">jieba</code> e applicare un filtro dei caratteri per mantenere solo i caratteri cinesi, le lettere latine e le cifre.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Per il cinese semplificato, <code translate="no">cnalphanumonly</code> rimuove tutti i token tranne i caratteri cinesi, il testo alfanumerico e le cifre. Ciò impedisce che la punteggiatura influisca sulla qualità della ricerca.</p>
</div>
<p>Se gli utenti possono effettuare ricerche nel testo cinese digitando il pinyin, utilizzare un analizzatore personalizzato con il tokenizzatore <code translate="no">jieba</code> e il <a href="/docs/it/pinyin-filter.md"><code translate="no">pinyin</code></a> filtro al posto dell’analizzatore <code translate="no">chinese</code> integrato.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;pinyin&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Japanese-content" class="common-anchor-header">Contenuti in giapponese<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare il tokenizzatore <code translate="no">lindera</code> con il dizionario giapponese e i filtri per eliminare la punteggiatura e controllare la lunghezza dei token:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>  <span class="hljs-comment"># Options: ipadic, ipadic-neologd, unidic</span>
    },
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;removepunct&quot;</span>,  <span class="hljs-comment"># Remove standalone punctuation</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
            <span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">20</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Korean-content" class="common-anchor-header">Contenuti in coreano<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Analogamente al giapponese, utilizzare il tokenizer <code translate="no">lindera</code> con il dizionario coreano:</p>
<pre><code translate="no" class="language-json">analyzer_params = <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tokenizer&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lindera&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;dict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ko-dic&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;removepunct&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;length&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;min&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;max&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">Contenuti misti o multilingue<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando si lavora con contenuti che abbracciano più lingue o utilizzano sistemi di scrittura in modo imprevedibile, iniziare con l’analizzatore <code translate="no">icu</code>. Questo analizzatore compatibile con Unicode gestisce efficacemente sistemi di scrittura e simboli misti.</p>
<p><strong>Configurazione multilingue di base (senza stemming)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Elaborazione multilingue avanzata</strong>:</p>
<p>Per un controllo migliore sul comportamento dei token nelle diverse lingue:</p>
<ul>
<li><p>Utilizza una configurazione <strong>dell'analizzatore multilingue</strong>. Per ulteriori dettagli, consulta <a href="/docs/it/multi-language-analyzers.md">Analizzatori multilingue</a>.</p></li>
<li><p>Implementa un <strong>identificatore di lingua</strong> nei tuoi contenuti. Per ulteriori dettagli, consulta <a href="/docs/it/language-identifier.md">Identificatore di lingua</a>.</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">Integrazione con le funzionalità di recupero del testo<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver selezionato l'analizzatore, è possibile integrarlo con le funzionalità di recupero del testo fornite da Milvus.</p>
<ul>
<li><p><strong>Ricerca full-text</strong></p>
<p>Gli analizzatori influenzano direttamente la ricerca full-text basata su BM25 attraverso la generazione di vettori sparsi. Utilizza lo stesso analizzatore sia per l’indicizzazione che per l’interrogazione per garantire una tokenizzazione coerente. Gli analizzatori specifici per lingua forniscono generalmente un punteggio BM25 migliore rispetto a quelli generici. Per i dettagli sull’implementazione, consulta <a href="/docs/it/full-text-search.md">Ricerca full-text</a>.</p></li>
<li><p><strong>Corrispondenza testuale</strong></p>
<p>Le operazioni di corrispondenza testuale eseguono la corrispondenza esatta dei token tra le query e i contenuti indicizzati in base all’output dell’analizzatore. Per i dettagli sull’implementazione, consultare la sezione <a href="/docs/it/keyword-match.md">Corrispondenza testuale</a>.</p></li>
<li><p><strong>Corrispondenza di frasi</strong></p>
<p>La corrispondenza delle frasi richiede una tokenizzazione coerente nelle espressioni composte da più parole per mantenere i confini delle frasi e il significato. Per i dettagli sull'implementazione, consultare la sezione <a href="/docs/it/phrase-match.md">"Corrispondenza delle frasi"</a>.</p></li>
</ul>
