---
id: language-identifier.md
title: Identificatore di linguaCompatible with Milvus v2.5.15+
summary: >-
  L'identificatore_di_lingua è un tokenizzatore specializzato progettato per
  migliorare le capacità di ricerca del testo di Milvus automatizzando il
  processo di analisi della lingua. La sua funzione principale è quella di
  rilevare la lingua di un campo di testo e quindi applicare dinamicamente un
  analizzatore preconfigurato più adatto a quella lingua. Questa funzione è
  particolarmente utile per le applicazioni che gestiscono una varietà di
  lingue, in quanto elimina la necessità di assegnare manualmente la lingua per
  ogni singolo input.
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">Identificatore di lingua<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">language_identifier</code> è un tokenizzatore specializzato progettato per migliorare le capacità di ricerca del testo di Milvus automatizzando il processo di analisi della lingua. La sua funzione principale è quella di rilevare la lingua di un campo di testo e di applicare dinamicamente un analizzatore preconfigurato più adatto a quella lingua. Questa funzione è particolarmente preziosa per le applicazioni che gestiscono una varietà di lingue, in quanto elimina la necessità di assegnare manualmente la lingua per ogni ingresso.</p>
<p>Indirizzando in modo intelligente i dati di testo alla pipeline di elaborazione appropriata, <code translate="no">language_identifier</code> semplifica l'ingestione di dati multilingue e garantisce una tokenizzazione accurata per le successive operazioni di ricerca e recupero.</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">Flusso di lavoro per il rilevamento della lingua<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">language_identifier</code> esegue una serie di passaggi per elaborare una stringa di testo, un flusso di lavoro che è fondamentale per gli utenti per capire come configurarlo correttamente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" />
   </span> <span class="img-wrapper"> <span>Flusso di lavoro per il rilevamento della lingua</span> </span></p>
<ol>
<li><p><strong>Ingresso:</strong> Il flusso di lavoro inizia con una stringa di testo come input.</p></li>
<li><p><strong>Rilevamento della lingua:</strong> Questa stringa viene prima passata a un motore di rilevamento della lingua, che cerca di identificare la lingua. Milvus supporta due motori: <strong>whatlang</strong> e <strong>lingua</strong>.</p></li>
<li><p><strong>Selezione dell'analizzatore:</strong></p>
<ul>
<li><p><strong>Successo:</strong> Se la lingua viene rilevata con successo, il sistema controlla se il nome della lingua rilevata ha un analizzatore corrispondente configurato nel dizionario <code translate="no">analyzers</code>. Se viene trovata una corrispondenza, il sistema applica l'analizzatore specificato al testo in ingresso. Ad esempio, un testo rilevato come "mandarino" viene indirizzato a un tokenizzatore <code translate="no">jieba</code>.</p></li>
<li><p><strong>Fallback:</strong> Se il rilevamento fallisce, o se una lingua viene rilevata con successo ma non è stato fornito un analizzatore specifico per essa, il sistema si affida a un <strong>analizzatore</strong> predefinito preconfigurato. Questo è un punto cruciale di chiarimento: l'analizzatore <code translate="no">default</code> è un ripiego sia per il fallimento del rilevamento che per l'assenza di un analizzatore corrispondente.</p></li>
</ul></li>
</ol>
<p>Dopo aver scelto l'analizzatore appropriato, il testo viene tokenizzato ed elaborato, completando il flusso di lavoro.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">Motori di rilevamento linguistico disponibili<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus offre la possibilità di scegliere tra due motori di rilevamento delle lingue:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>La scelta dipende dalle prestazioni specifiche e dai requisiti di precisione dell'applicazione.</p>
<table>
   <tr>
     <th><p>Motore</p></th>
     <th><p>Velocità</p></th>
     <th><p>Precisione</p></th>
     <th><p>Formato di uscita</p></th>
     <th><p>Migliore per</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>Veloce</p></td>
     <td><p>Buono per la maggior parte delle lingue</p></td>
     <td><p>Nomi delle lingue (ad esempio, <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Riferimento:</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">Colonna Lingua nella tabella delle lingue supportate</a></p></td>
     <td><p>Applicazioni in tempo reale in cui la velocità è fondamentale</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>Più lento</p></td>
     <td><p>Maggiore precisione, soprattutto per i testi brevi</p></td>
     <td><p>Nomi in lingua inglese (ad esempio, <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Riferimento:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Elenco delle lingue supportate</a></p></td>
     <td><p>Applicazioni in cui la precisione è più importante della velocità</p></td>
   </tr>
</table>
<p>Una considerazione fondamentale è la convenzione di denominazione del motore. Entrambi i motori restituiscono nomi di lingue in inglese, ma utilizzano termini diversi per alcune lingue (ad esempio, <code translate="no">whatlang</code> restituisce <code translate="no">Mandarin</code>, mentre <code translate="no">lingua</code> restituisce <code translate="no">Chinese</code>). La chiave dell'analizzatore deve corrispondere esattamente al nome restituito dal motore di rilevamento scelto.</p>
<h2 id="Configuration" class="common-anchor-header">Configurazione<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Per utilizzare correttamente il tokenizer <code translate="no">language_identifier</code>, è necessario eseguire i seguenti passaggi per definire e applicare la sua configurazione.</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">Passo 1: Scegliere le lingue e gli analizzatori<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p>Il fulcro della configurazione di <code translate="no">language_identifier</code> consiste nell'adattare gli analizzatori alle lingue specifiche che si intende supportare. Il sistema funziona abbinando la lingua rilevata all'analizzatore corretto, quindi questa fase è fondamentale per un'elaborazione accurata del testo.</p>
<p>Di seguito è riportata una mappatura consigliata delle lingue con gli analizzatori Milvus adatti. Questa tabella funge da ponte tra l'output del motore di rilevamento della lingua e lo strumento migliore per il lavoro.</p>
<table>
   <tr>
     <th><p>Lingua (output del rilevatore)</p></th>
     <th><p>Analizzatore consigliato</p></th>
     <th><p>Descrizione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>Tokenizzazione dell'inglese standard con stemming e filtro delle stop-word.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (via whatlang) o <code translate="no">Chinese</code> (via lingua)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>Segmentazione delle parole cinesi per testi non delimitati da spazi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>Un robusto tokenizzatore per scritture complesse, tra cui il giapponese.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>Una configurazione personalizzata che gestisce gli accenti e i caratteri francesi.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>La corrispondenza è fondamentale:</strong> Il nome dell'analizzatore <strong>deve corrispondere esattamente</strong> all'output linguistico del motore di rilevamento. Ad esempio, se si utilizza <code translate="no">whatlang</code>, la chiave per il testo cinese deve essere <code translate="no">Mandarin</code>.</p></li>
<li><p><strong>Migliori pratiche:</strong> La tabella precedente fornisce le configurazioni consigliate per alcune lingue comuni, ma non è un elenco esaustivo. Per una guida più completa sulla scelta degli analizzatori, consultare la sezione <a href="/docs/it/choose-the-right-analyzer-for-your-use-case.md">Scegliere l'analizzatore giusto per il caso d'uso</a>.</p></li>
<li><p><strong>Output del rilevatore</strong>: Per un elenco completo dei nomi delle lingue restituite dai motori di rilevamento, consultare la <a href="https://github.com/greyblake/whatlang-rs">tabella delle lingue supportate da Whatlang</a> e l'<a href="https://github.com/pemistahl/lingua-rs">elenco delle lingue supportate da Lingua</a>.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">Passo 2: Definire i parametri dell'analizzatore<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Per utilizzare il tokenizzatore <code translate="no">language_identifier</code> in Milvus, creare un dizionario contenente questi componenti chiave:</p>
<p><strong>Componenti necessari:</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config set - Un dizionario contenente tutte le configurazioni dell'analizzatore, che devono includere:</p>
<ul>
<li><p><code translate="no">default</code> - L'analizzatore di riserva usato quando il rilevamento della lingua fallisce o non viene trovato alcun analizzatore corrispondente.</p></li>
<li><p><strong>Analizzatori specifici per la lingua</strong> - Ciascuno definito come <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code>, dove:</p>
<ul>
<li><p><code translate="no">analyzer_name</code> corrisponde all'output del motore di rilevamento scelto (ad esempio, <code translate="no">&quot;English&quot;</code>, <code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> segue il formato standard dei parametri dell'analizzatore (vedere <a href="/docs/it/analyzer-overview.md#Analyzer-types">Panoramica dell'analizzatore</a>)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Componenti opzionali:</strong></p>
<ul>
<li><p><code translate="no">identifier</code> - Specifica quale motore di rilevamento della lingua utilizzare (<code translate="no">whatlang</code> o <code translate="no">lingua</code>). Se non viene specificato, l'opzione predefinita è <code translate="no">whatlang</code> </p></li>
<li><p><code translate="no">mapping</code> - Crea alias personalizzati per gli analizzatori, consentendo di usare nomi descrittivi invece del formato di output esatto del motore di rilevamento.</p></li>
</ul>
<p>Il tokenizer funziona rilevando prima la lingua del testo in ingresso, quindi selezionando l'analizzatore appropriato dalla configurazione. Se il rilevamento fallisce o se non esiste un analizzatore corrispondente, si passa automaticamente all'analizzatore <code translate="no">default</code>.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">Consigliato: Corrispondenza diretta dei nomi</h4><p>I nomi degli analizzatori devono corrispondere esattamente all'output del motore di rilevamento linguistico scelto. Questo approccio è più semplice ed evita potenziali confusioni.</p>
<p>Sia per <code translate="no">whatlang</code> che per <code translate="no">lingua</code>, utilizzare i nomi delle lingue come indicato nella rispettiva documentazione:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">lingue supportate da whatlang</a> (utilizzare la colonna<strong>"Lingua</strong>")</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">lingua lingue supportate</a></p></li>
</ul>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment"># Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,  <span class="hljs-comment"># or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {  <span class="hljs-comment"># A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>  <span class="hljs-comment"># fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">Approccio alternativo: Nomi personalizzati con mappatura</h4><p>Se si preferisce usare nomi di analizzatori personalizzati o si vuole mantenere la compatibilità con le configurazioni esistenti, si può usare il parametro <code translate="no">mapping</code>. Questo crea degli alias per gli analizzatori: funzioneranno sia i nomi originali del motore di rilevamento che quelli personalizzati.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment"># Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver definito <code translate="no">analyzer_params</code>, è possibile applicarli a un campo <code translate="no">VARCHAR</code> quando si definisce uno schema di raccolta. Questo permette a Milvus di elaborare il testo in quel campo usando l'analizzatore specificato per una tokenizzazione e un filtraggio efficienti. Per i dettagli, si veda l'<a href="/docs/it/analyzer-overview.md#Example-use">esempio di utilizzo</a>.</p>
<h2 id="Examples" class="common-anchor-header">Esempi<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Ecco alcune configurazioni pronte all'uso per scenari comuni. Ogni esempio include sia la configurazione che il codice di verifica, in modo da poter testare immediatamente la configurazione.</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">Rilevamento di inglese e cinese<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Configuration</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
}

<span class="hljs-comment"># Test the configuration</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># English text</span>
result_en = client.run_analyzer(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;English:&quot;</span>, result_en)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># English: [&#x27;The&#x27;, &#x27;Milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;for&#x27;, &#x27;scale&#x27;]</span>

<span class="hljs-comment"># Chinese text  </span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># Chinese: [&#x27;Milvus&#x27;, &#x27;向量&#x27;, &#x27;数据&#x27;, &#x27;据库&#x27;, &#x27;数据库&#x27;, &#x27;专&#x27;, &#x27;为&#x27;, &#x27;大规&#x27;, &#x27;规模&#x27;, &#x27;大规模&#x27;, &#x27;应用&#x27;, &#x27;而&#x27;, &#x27;设计&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">Lingue europee con normalizzazione dell'accento<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>, 
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
}

<span class="hljs-comment"># Test with accented text</span>
result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Note d'uso<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Lingua singola per campo:</strong> Opera su un campo come singola unità omogenea di testo. È progettato per gestire lingue diverse in diversi record di dati, ad esempio un record contenente una frase in inglese e il successivo contenente una frase in francese.</p></li>
<li><p><strong>Non esistono stringhe in lingue miste:</strong> <strong>Non è</strong> progettato per gestire una singola stringa contenente testo in più lingue. Ad esempio, un singolo campo <code translate="no">VARCHAR</code> contenente sia una frase in inglese che una frase in giapponese quotata verrà elaborato come una singola lingua.</p></li>
<li><p><strong>Elaborazione della lingua dominante:</strong> In scenari di lingua mista, il motore di rilevamento probabilmente identificherà la lingua dominante e l'analizzatore corrispondente verrà applicato all'intero testo. Il risultato sarà una tokenizzazione scarsa o assente per il testo straniero incorporato.</p></li>
</ul>
