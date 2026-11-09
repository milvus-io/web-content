---
id: language-identifier.md
title: Identificatore della linguaCompatible with Milvus v2.5.15+
summary: >-
  language_identifier è un tokenizer specializzato progettato per potenziare le
  funzionalità di ricerca testuale di Milvus automatizzando il processo di
  analisi linguistica. La sua funzione principale è quella di rilevare la lingua
  di un campo di testo e quindi applicare dinamicamente l’analizzatore
  preconfigurato più adatto a quella lingua. Ciò risulta particolarmente utile
  per le applicazioni che gestiscono una varietà di lingue, poiché elimina la
  necessità di assegnare manualmente la lingua per ogni singolo input.
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">Identificatore della lingua<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">language_identifier</code> è un tokenizzatore specializzato progettato per migliorare le funzionalità di ricerca testuale di Milvus automatizzando il processo di analisi linguistica. La sua funzione principale è quella di rilevare la lingua di un campo di testo e quindi applicare dinamicamente l'analizzatore preconfigurato più adatto a quella lingua. Ciò risulta particolarmente utile per le applicazioni che gestiscono una varietà di lingue, poiché elimina la necessità di assegnare manualmente la lingua per ogni singolo input.</p>
<p>Indirizzando in modo intelligente i dati testuali verso la pipeline di elaborazione appropriata, l’ <code translate="no">language_identifier</code> semplifica l’acquisizione dei dati multilingue e garantisce una tokenizzazione accurata per le successive operazioni di ricerca e recupero.</p>
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
    </button></h2><p><code translate="no">language_identifier</code> esegue una serie di passaggi per elaborare una stringa di testo, un flusso di lavoro fondamentale affinché gli utenti comprendano come configurarlo correttamente.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" /> 
   <span>Flusso di lavoro per il rilevamento della lingua</span>
  
 </span></p>
<ol>
<li><p><strong>Input:</strong> il flusso di lavoro inizia con una stringa di testo come input.</p></li>
<li><p><strong>Rilevamento della lingua:</strong> questa stringa viene prima trasmessa a un motore di rilevamento della lingua, che tenta di identificarne la lingua. Milvus supporta due motori: <strong>whatlang</strong> e <strong>lingua</strong>.</p></li>
<li><p><strong>Selezione dell’analizzatore:</strong></p>
<ul>
<li><p><strong>Esito positivo:</strong> se la lingua viene rilevata con successo, il sistema verifica se per il nome della lingua rilevata sia configurato un analizzatore corrispondente nel dizionario dell’ <code translate="no">analyzers</code>. Se viene trovata una corrispondenza, il sistema applica l’analizzatore specificato al testo in ingresso. Ad esempio, un testo in “mandarino” rilevato verrebbe indirizzato a un tokenizzatore <code translate="no">jieba</code>.</p></li>
<li><p><strong>Soluzione alternativa:</strong> se il rilevamento fallisce, oppure se una lingua viene rilevata correttamente ma non è stato fornito un analizzatore specifico per essa, il sistema ricorre <strong>per impostazione predefinita</strong> a un <strong>analizzatore</strong> preconfigurato. Si tratta di un punto cruciale da chiarire: l’analizzatore <code translate="no">default</code> funge da soluzione alternativa sia in caso di fallimento del rilevamento sia in caso di assenza di un analizzatore corrispondente.</p></li>
</ul></li>
</ol>
<p>Una volta scelto l’analizzatore appropriato, il testo viene tokenizzato ed elaborato, completando il flusso di lavoro.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">Motori di rilevamento della lingua disponibili<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus offre la possibilità di scegliere tra due motori di rilevamento della lingua:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>La scelta dipende dai requisiti specifici di prestazioni e precisione della vostra applicazione.</p>
<table>
   <tr>
     <th><p>Motore</p></th>
     <th><p>Velocità</p></th>
     <th><p>Precisione</p></th>
     <th><p>Formato di output</p></th>
     <th><p>Ideale per</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>Veloce</p></td>
     <td><p>Adatto alla maggior parte delle lingue</p></td>
     <td><p>Nomi delle lingue (ad es., <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code> , <code translate="no">"Japanese"</code>)</p><p><strong>Riferimento:</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">colonna "Lingua" nella tabella delle lingue supportate</a></p></td>
     <td><p>Applicazioni in tempo reale in cui la velocità è fondamentale</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>Più lento</p></td>
     <td><p>Maggiore precisione, specialmente per i testi brevi</p></td>
     <td><p>Nomi delle lingue in inglese (ad es., <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Riferimento:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Elenco delle lingue supportate</a></p></td>
     <td><p>Applicazioni in cui l’accuratezza è più importante della velocità</p></td>
   </tr>
</table>
<p>Un aspetto fondamentale da considerare è la convenzione di denominazione del motore. Sebbene entrambi i motori restituiscano i nomi delle lingue in inglese, utilizzano termini diversi per alcune lingue (ad es., <code translate="no">whatlang</code> restituisce <code translate="no">Mandarin</code>, mentre <code translate="no">lingua</code> restituisce <code translate="no">Chinese</code>). La chiave dell’analizzatore deve corrispondere esattamente al nome restituito dal motore di rilevamento scelto.</p>
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
    </button></h2><p>Per utilizzare correttamente il tokenizzatore <code translate="no">language_identifier</code>, è necessario seguire i passaggi riportati di seguito per definire e applicare la relativa configurazione.</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">Passaggio 1: Scegliere le lingue e gli analizzatori<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p>Il fulcro della configurazione di <code translate="no">language_identifier</code> consiste nell’adattare gli analizzatori alle lingue specifiche che si intende supportare. Il sistema funziona abbinando la lingua rilevata all’analizzatore corretto, pertanto questo passaggio è fondamentale per un’elaborazione accurata del testo.</p>
<p>Di seguito è riportata una mappatura consigliata delle lingue agli analizzatori Milvus adatti. Questa tabella funge da ponte tra l’output del motore di rilevamento della lingua e lo strumento più adatto allo scopo.</p>
<table>
   <tr>
     <th><p>Lingua (Output del rilevatore)</p></th>
     <th><p>Analizzatore consigliato</p></th>
     <th><p>Descrizione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>Tokenizzazione standard dell’inglese con stemming e filtraggio delle parole vuote.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (tramite whatlang) o <code translate="no">Chinese</code> (tramite lingua)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>Segmentazione delle parole in cinese per testi non delimitati da spazi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>Un tokenizzatore robusto per scritture complesse, compreso il giapponese.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>Una configurazione personalizzata che gestisce gli accenti e i caratteri francesi.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>La corrispondenza è fondamentale:</strong> il nome dell’analizzatore <strong>deve corrispondere esattamente</strong> alla lingua di output del motore di rilevamento. Ad esempio, se si utilizza <code translate="no">whatlang</code>, la chiave per il testo in cinese deve essere <code translate="no">Mandarin</code>.</p></li>
<li><p><strong>Best practice:</strong> la tabella sopra riportata fornisce le configurazioni consigliate per alcune lingue comuni, ma non si tratta di un elenco esaustivo. Per una guida più completa sulla scelta degli analizzatori, consultare la sezione " <a href="/docs/it/choose-the-right-analyzer-for-your-use-case.md">Scegliere l’analizzatore giusto per il proprio caso d’uso</a>".</p></li>
<li><p><strong>Output del rilevatore</strong>: per un elenco completo dei nomi delle lingue restituiti dai motori di rilevamento, consultare <a href="https://github.com/greyblake/whatlang-rs">la tabella delle lingue supportate da Whatlang</a> e <a href="https://github.com/pemistahl/lingua-rs">l’elenco delle lingue supportate da Lingua</a>.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">Passaggio 2: Definire `analyzer_params`<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Per utilizzare il tokenizer <code translate="no">language_identifier</code> in Milvus, creare un dizionario contenente questi componenti chiave:</p>
<p><strong>Componenti obbligatori:</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> set di configurazione – Un dizionario contenente tutte le configurazioni dell’analizzatore, che deve includere:</p>
<ul>
<li><p><code translate="no">default</code> – L’analizzatore di riserva utilizzato quando il rilevamento della lingua fallisce o non viene trovato alcun analizzatore corrispondente</p></li>
<li><p><strong>Analizzatori specifici per lingua</strong> – Ciascuno definito come <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code>, dove:</p>
<ul>
<li><p><code translate="no">analyzer_name</code> corrisponda all’output del motore di rilevamento scelto (ad es., <code translate="no">&quot;English&quot;</code>, <code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> segue il formato standard dei parametri dell’analizzatore (vedere <a href="/docs/it/analyzer-overview.md#Analyzer-types">Panoramica sugli analizzatori</a>)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Componenti opzionali:</strong></p>
<ul>
<li><p><code translate="no">identifier</code> – Specifica quale motore di rilevamento della lingua utilizzare (<code translate="no">whatlang</code> o <code translate="no">lingua</code>). Se non specificato, il valore predefinito è <code translate="no">whatlang</code> </p></li>
<li><p><code translate="no">mapping</code> – Crea alias personalizzati per i tuoi analizzatori, consentendoti di utilizzare nomi descrittivi invece del formato di output esatto del motore di rilevamento</p></li>
</ul>
<p>Il tokenizer funziona rilevando innanzitutto la lingua del testo in ingresso, quindi selezionando l’analizzatore appropriato dalla configurazione. Se il rilevamento fallisce o non esiste un analizzatore corrispondente, ricorre automaticamente all’analizzatore <code translate="no">default</code>.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">Consigliato: corrispondenza diretta dei nomi</h4><p>I nomi degli analizzatori devono corrispondere esattamente all’output del motore di rilevamento della lingua scelto. Questo approccio è più semplice ed evita potenziali confusioni.</p>
<p>Sia per <code translate="no">whatlang</code> che per <code translate="no">lingua</code>, utilizzare i nomi delle lingue come indicato nella rispettiva documentazione:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">lingue supportate da whatlang</a> (utilizzare la colonna<strong>“Lingua</strong>”)</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">lingue supportate da lingua</a></p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);   <span class="hljs-comment">// Must be `language_identifier`</span>
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>);        <span class="hljs-comment">// or `lingua`</span>
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// A set of analyzer configs</span>
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>); <span class="hljs-comment">// fallback if language detection fails</span>
        }});
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;Mandarin&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{ <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
        }});
    }});
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>, <span class="hljs-comment">// Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,            <span class="hljs-comment">// or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{         <span class="hljs-comment">// A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
            },
        },
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment">// Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,       <span class="hljs-comment">// or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {                  <span class="hljs-comment">// A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span> <span class="hljs-comment">// fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {                <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {               <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>}, <span class="hljs-comment">// Must be `language_identifier`</span>
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>},      <span class="hljs-comment">// or `lingua`</span>
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {                  <span class="hljs-comment">// A set of analyzer configs</span>
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}}, <span class="hljs-comment">// fallback if language detection fails</span>
            {<span class="hljs-string">&quot;English&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},       <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            {<span class="hljs-string">&quot;Mandarin&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}}}    <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
        }}
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>, <span class="hljs-comment">// Must be `language_identifier`</span>
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,      <span class="hljs-comment">// or `lingua`</span>
    <span class="hljs-attr">analyzers</span>: {                 <span class="hljs-comment">// A set of analyzer configs</span>
      <span class="hljs-attr">default</span>: {
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,   <span class="hljs-comment">// fallback if language detection fails</span>
      },
      <span class="hljs-title class_">English</span>: {                 <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
      },
      <span class="hljs-title class_">Mandarin</span>: {                <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
      },
    },
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> System.Collections.Generic;

<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>, <span class="hljs-comment">// Must be `language_identifier`</span>
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;whatlang&quot;</span>,      <span class="hljs-comment">// or `lingua`</span>
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// A set of analyzer configs</span>
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span> <span class="hljs-comment">// fallback if language detection fails</span>
            },
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            {
                [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span>
            },
            [<span class="hljs-string">&quot;Mandarin&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Analyzer name that matches whatlang output</span>
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: {
    &quot;type&quot;: &quot;language_identifier&quot;,
    &quot;identifier&quot;: &quot;whatlang&quot;,
    &quot;analyzers&quot;: {
      &quot;default&quot;: {
        &quot;tokenizer&quot;: &quot;standard&quot;
      },
      &quot;English&quot;: {
        &quot;type&quot;: &quot;english&quot;
      },
      &quot;Mandarin&quot;: {
        &quot;tokenizer&quot;: &quot;jieba&quot;
      }
    }
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">Approccio alternativo: nomi personalizzati con mappatura</h4><p>Se si preferisce utilizzare nomi personalizzati per gli analizzatori o è necessario mantenere la compatibilità con le configurazioni esistenti, è possibile utilizzare il parametro <code translate="no">mapping</code>. In questo modo vengono creati degli alias per gli analizzatori: funzioneranno sia i nomi originali del motore di rilevamento sia i nomi personalizzati.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>);
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;english_analyzer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Custom analyzer name</span>
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;chinese_analyzer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Custom analyzer name</span>
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
        }});
    }});
    put(<span class="hljs-string">&quot;mapping&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{  <span class="hljs-comment">// Maps detection output to custom name</span>
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-string">&quot;english_analyzer&quot;</span>);
        put(<span class="hljs-string">&quot;Chinese&quot;</span>, <span class="hljs-string">&quot;chinese_analyzer&quot;</span>);
    }});
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
            },
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{ <span class="hljs-comment">// Maps detection output to custom names</span>
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>,
        },
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment">// Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment">// Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>},
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>},
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}},
            {<span class="hljs-string">&quot;english_analyzer&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},      <span class="hljs-comment">// Custom analyzer name</span>
            {<span class="hljs-string">&quot;chinese_analyzer&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}}}    <span class="hljs-comment">// Custom analyzer name</span>
        }},
        {<span class="hljs-string">&quot;mapping&quot;</span>, {                                          <span class="hljs-comment">// Maps detection output to custom names</span>
            {<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-string">&quot;english_analyzer&quot;</span>},
            {<span class="hljs-string">&quot;Chinese&quot;</span>, <span class="hljs-string">&quot;chinese_analyzer&quot;</span>}
        }}
    }}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
    <span class="hljs-attr">analyzers</span>: {
      <span class="hljs-attr">default</span>: {
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,
      },
      <span class="hljs-attr">english_analyzer</span>: { <span class="hljs-comment">// Custom analyzer name</span>
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
      },
      <span class="hljs-attr">chinese_analyzer</span>: { <span class="hljs-comment">// Custom analyzer name</span>
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
      },
    },
    <span class="hljs-attr">mapping</span>: {            <span class="hljs-comment">// Maps detection output to custom names</span>
      <span class="hljs-title class_">English</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,
      <span class="hljs-title class_">Chinese</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>,
    },
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>,
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;lingua&quot;</span>,
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span>
            },
            [<span class="hljs-string">&quot;english_analyzer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Custom analyzer name</span>
            {
                [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span>
            },
            [<span class="hljs-string">&quot;chinese_analyzer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Custom analyzer name</span>
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        [<span class="hljs-string">&quot;mapping&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; <span class="hljs-comment">// Maps detection output to custom names</span>
        {
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-string">&quot;english_analyzer&quot;</span>,
            [<span class="hljs-string">&quot;Chinese&quot;</span>] = <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: {
    &quot;type&quot;: &quot;language_identifier&quot;,
    &quot;identifier&quot;: &quot;lingua&quot;,
    &quot;analyzers&quot;: {
      &quot;default&quot;: {
        &quot;tokenizer&quot;: &quot;standard&quot;
      },
      &quot;english_analyzer&quot;: {
        &quot;type&quot;: &quot;english&quot;
      },
      &quot;chinese_analyzer&quot;: {
        &quot;tokenizer&quot;: &quot;jieba&quot;
      }
    },
    &quot;mapping&quot;: {
      &quot;English&quot;: &quot;english_analyzer&quot;,
      &quot;Chinese&quot;: &quot;chinese_analyzer&quot;
    }
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver definito ` <code translate="no">analyzer_params</code>`, è possibile applicarli a un campo ` <code translate="no">VARCHAR</code> ` durante la definizione dello schema di raccolta. Ciò consente a Milvus di elaborare il testo in quel campo utilizzando l’analizzatore specificato per una tokenizzazione e un filtraggio efficienti. Per ulteriori dettagli, consultare <a href="/docs/it/analyzer-overview.md#Example-use">Esempio di utilizzo</a>.</p>
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
    </button></h2><p>Di seguito sono riportate alcune configurazioni pronte all’uso per scenari comuni. Ogni esempio include sia il codice di configurazione che quello di verifica, in modo da poter testare immediatamente l’impostazione.</p>
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

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

<span class="hljs-comment"># Chinese text</span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Configuration</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>);
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;Mandarin&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>);
        }});
    }});
}});

<span class="hljs-comment">// English text</span>
List&lt;String&gt; english = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
english.add(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>);
<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">enResp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(english)
        .analyzerParams(analyzerParams)
        .build());

<span class="hljs-comment">// Chinese text</span>
List&lt;String&gt; chinese = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
chinese.add(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>);
<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">cnResp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(chinese)
        .analyzerParams(analyzerParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-comment">// Configuration</span>
analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;default&quot;</span>:  <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>:  <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>},
        },
    },
}

<span class="hljs-comment">// English text</span>
enResult, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>).
        WithAnalyzerParams(analyzerParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">for</span> _, tokens := <span class="hljs-keyword">range</span> enResult {
    fmt.Println(<span class="hljs-string">&quot;English:&quot;</span>, tokens.Tokens)
}

<span class="hljs-comment">// Chinese text</span>
cnResult, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>).
        WithAnalyzerParams(analyzerParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">for</span> _, tokens := <span class="hljs-keyword">range</span> cnResult {
    fmt.Println(<span class="hljs-string">&quot;Chinese:&quot;</span>, tokens.Tokens)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Configuration</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
});

<span class="hljs-comment">// English text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">en_response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params.<span class="hljs-title function_ invoke__">clone</span>())
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Chinese text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">cn_response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Configuration</span>
nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>},
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;whatlang&quot;</span>},
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}},
            {<span class="hljs-string">&quot;English&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},
            {<span class="hljs-string">&quot;Mandarin&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;jieba&quot;</span>}}}
        }}
    }}
};

<span class="hljs-comment">// English text</span>
milvus::RunAnalyzerRequest en_request;
en_request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
en_request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>);
milvus::RunAnalyzerResponse en_response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(en_request, en_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Chinese text</span>
milvus::RunAnalyzerRequest cn_request;
cn_request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
cn_request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span>);
milvus::RunAnalyzerResponse cn_response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(cn_request, cn_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-comment">// Configuration</span>
<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
    <span class="hljs-attr">analyzers</span>: {
      <span class="hljs-attr">default</span>: { <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span> },
      <span class="hljs-title class_">English</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span> },
      <span class="hljs-title class_">Mandarin</span>: { <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;jieba&quot;</span> },
    },
  },
};

<span class="hljs-comment">// English text</span>
<span class="hljs-keyword">const</span> en_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;The Milvus vector database is built for scale!&#x27;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;English:&#x27;</span>, en_result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>)));

<span class="hljs-comment">// Chinese text</span>
<span class="hljs-keyword">const</span> cn_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Milvus 向量数据库专为大规模应用而设计&#x27;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Chinese:&#x27;</span>, cn_result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Configuration</span>
<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>,
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;whatlang&quot;</span>,
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span> },
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span> },
            [<span class="hljs-string">&quot;Mandarin&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;jieba&quot;</span> }
        }
    }
};

<span class="hljs-comment">// English text</span>
<span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span> }
});

<span class="hljs-comment">// Chinese text</span>
<span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;Milvus 向量数据库专为大规模应用而设计&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;language_identifier\&quot;,\&quot;identifier\&quot;:\&quot;whatlang\&quot;,\&quot;analyzers\&quot;:{\&quot;default\&quot;:{\&quot;tokenizer\&quot;:\&quot;standard\&quot;},\&quot;English\&quot;:{\&quot;type\&quot;:\&quot;english\&quot;},\&quot;Mandarin\&quot;:{\&quot;tokenizer\&quot;:\&quot;jieba\&quot;}}}}&quot;,
    &quot;text&quot;: [&quot;The Milvus vector database is built for scale!&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">Lingue europee con normalizzazione degli accenti<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
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
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>);
    put(<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>);
    put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;English&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
        }});
        put(<span class="hljs-string">&quot;French&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
            put(<span class="hljs-string">&quot;filter&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>));
        }});
    }});
}});

<span class="hljs-comment">// Test with accented text</span>
List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>);
<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
            <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>:    []any{<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>},
            },
        },
    },
}

<span class="hljs-comment">// Test with accented text</span>
result, err := client.RunAnalyzer(ctx,
    milvusclient.NewRunAnalyzerOption(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>).
        WithAnalyzerParams(analyzerParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">for</span> _, tokens := <span class="hljs-keyword">range</span> result {
    fmt.Println(<span class="hljs-string">&quot;French:&quot;</span>, tokens.Tokens)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({
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
});

<span class="hljs-comment">// Test with accented text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client.<span class="hljs-title function_ invoke__">run_analyzer</span>(RunAnalyzerRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">texts</span>([<span class="hljs-string">&quot;Café français très délicieux&quot;</span>])
    .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params)
    .<span class="hljs-title function_ invoke__">build</span>()?).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
nlohmann::json analyzer_params = {
    {<span class="hljs-string">&quot;tokenizer&quot;</span>, {
        {<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;language_identifier&quot;</span>},
        {<span class="hljs-string">&quot;identifier&quot;</span>, <span class="hljs-string">&quot;lingua&quot;</span>},
        {<span class="hljs-string">&quot;analyzers&quot;</span>, {
            {<span class="hljs-string">&quot;default&quot;</span>, {{<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>}}},
            {<span class="hljs-string">&quot;English&quot;</span>, {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}}},
            {<span class="hljs-string">&quot;French&quot;</span>, {
                {<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>},
                {<span class="hljs-string">&quot;filter&quot;</span>, {<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>}}
            }}
        }}
    }}
};

<span class="hljs-comment">// Test with accented text</span>
milvus::RunAnalyzerRequest request;
request.<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params);
request.<span class="hljs-built_in">AddText</span>(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>);
milvus::RunAnalyzerResponse response;
status = client-&gt;<span class="hljs-built_in">RunAnalyzer</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
<span class="hljs-keyword">const</span> analyzer_params = {
  <span class="hljs-attr">tokenizer</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
    <span class="hljs-attr">identifier</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
    <span class="hljs-attr">analyzers</span>: {
      <span class="hljs-attr">default</span>: { <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span> },
      <span class="hljs-title class_">English</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span> },
      <span class="hljs-title class_">French</span>: {
        <span class="hljs-attr">tokenizer</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-attr">filter</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>],
      },
    },
  },
};

<span class="hljs-comment">// Test with accented text</span>
<span class="hljs-keyword">const</span> fr_result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">runAnalyzer</span>({
  <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Café français très délicieux&#x27;</span>,
  analyzer_params,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;French:&#x27;</span>, fr_result.<span class="hljs-property">results</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">tokens</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">token</span>)));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Utility;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Utility;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Configuration for French, German, Spanish, etc.</span>
<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
    {
        [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;language_identifier&quot;</span>,
        [<span class="hljs-string">&quot;identifier&quot;</span>] = <span class="hljs-string">&quot;lingua&quot;</span>,
        [<span class="hljs-string">&quot;analyzers&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
        {
            [<span class="hljs-string">&quot;default&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span> },
            [<span class="hljs-string">&quot;English&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span> },
            [<span class="hljs-string">&quot;French&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
            {
                [<span class="hljs-string">&quot;tokenizer&quot;</span>] = <span class="hljs-string">&quot;standard&quot;</span>,
                [<span class="hljs-string">&quot;filter&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span> }
            }
        }
    }
};

<span class="hljs-comment">// Test with accented text</span>
<span class="hljs-keyword">await</span> client.RunAnalyzerAsync(<span class="hljs-keyword">new</span> RunAnalyzerReq
{
    AnalyzerParams = analyzerParams,
    Texts = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;Café français très délicieux&quot;</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/common/run_analyzer&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data-raw <span class="hljs-string">&#x27;{
    &quot;analyzerParams&quot;: &quot;{\&quot;tokenizer\&quot;:{\&quot;type\&quot;:\&quot;language_identifier\&quot;,\&quot;identifier\&quot;:\&quot;lingua\&quot;,\&quot;analyzers\&quot;:{\&quot;default\&quot;:{\&quot;tokenizer\&quot;:\&quot;standard\&quot;},\&quot;English\&quot;:{\&quot;type\&quot;:\&quot;english\&quot;},\&quot;French\&quot;:{\&quot;tokenizer\&quot;:\&quot;standard\&quot;,\&quot;filter\&quot;:[\&quot;lowercase\&quot;,\&quot;asciifolding\&quot;]}}}}&quot;,
    &quot;text&quot;: [&quot;Café français très délicieux&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Output previsto<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><p>L'esempio europeo sopra riportato produce i seguenti token in ordine. Gli oggetti di risposta dell'SDK e la formattazione di stampa variano a seconda del linguaggio; la risposta REST contiene questi token all'indirizzo <code translate="no">data.results[].tokens[].token</code>. La sequenza di token per l'esempio di rilevamento dell'inglese e del cinese dipende dall'analizzatore selezionato dal rilevatore per ciascun input, pertanto non viene riprodotta in questa sede.</p>
<pre><code translate="no" class="language-plaintext">French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Note sull'utilizzo<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Una sola lingua per campo:</strong> opera su un campo come un'unica unità omogenea di testo. È progettato per gestire lingue diverse in record di dati distinti, ad esempio un record contenente una frase in inglese e quello successivo contenente una frase in francese.</p></li>
<li><p><strong>Nessuna stringa multilingue:</strong> <strong>non</strong> è progettato per gestire una singola stringa contenente testo in più lingue. Ad esempio, un singolo campo <code translate="no">VARCHAR</code> contenente sia una frase in inglese che una citazione in giapponese verrà elaborato come se fosse in un'unica lingua.</p></li>
<li><p><strong>Elaborazione della lingua dominante:</strong> in scenari con lingue miste, il motore di rilevamento identificherà probabilmente la lingua dominante e l’analizzatore corrispondente verrà applicato all’intero testo. Ciò comporterà una tokenizzazione scadente o assente per il testo in lingua straniera incorporato.</p></li>
</ul>
