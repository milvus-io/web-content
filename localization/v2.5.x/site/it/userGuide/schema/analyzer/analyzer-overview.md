---
id: analyzer-overview.md
title: Panoramica sull'analizzatore
summary: >-
  Nell'elaborazione del testo, un analizzatore è un componente cruciale che
  converte il testo grezzo in un formato strutturato e ricercabile. Ogni
  analizzatore è tipicamente composto da due elementi fondamentali: tokenizer e
  filtro. Insieme, trasformano il testo in ingresso in token, li raffinano e li
  preparano per un'indicizzazione e un recupero efficienti.
---
<h1 id="Analyzer-Overview" class="common-anchor-header">Panoramica sull'analizzatore<button data-href="#Analyzer-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Nell'elaborazione del testo, un <strong>analizzatore</strong> è un componente cruciale che converte il testo grezzo in un formato strutturato e ricercabile. Ogni analizzatore è generalmente composto da due elementi fondamentali: <strong>tokenizer</strong> e <strong>filtro</strong>. Insieme, trasformano il testo in ingresso in token, li raffinano e li preparano per un'indicizzazione e un recupero efficienti.</p>
<p>In Milvus, gli analizzatori vengono configurati durante la creazione della raccolta, quando si aggiungono i campi <code translate="no">VARCHAR</code> allo schema della raccolta. I token prodotti da un analizzatore possono essere usati per costruire un indice per la corrispondenza con le parole chiave o convertiti in embedding sparsi per la ricerca full text. Per ulteriori informazioni, consultare la sezione <a href="/docs/it/keyword-match.md">Corrispondenza di testo</a> o <a href="/docs/it/full-text-search.md">Ricerca a testo completo</a>.</p>
<div class="alert note">
<p>L'uso degli analizzatori può influire sulle prestazioni:</p>
<ul>
<li><p><strong>Ricerca a testo completo:</strong> Per la ricerca full text, i canali <strong>DataNode</strong> e <strong>QueryNode</strong> consumano i dati più lentamente perché devono attendere il completamento della tokenizzazione. Di conseguenza, i dati appena ingeriti impiegano più tempo per diventare disponibili per la ricerca.</p></li>
<li><p><strong>Corrispondenza di parole chiave:</strong> Per la corrispondenza delle parole chiave, anche la creazione dell'indice è più lenta, poiché la tokenizzazione deve essere completata prima di poter costruire un indice.</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer" class="common-anchor-header">Anatomia di un analizzatore<button data-href="#Anatomy-of-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Un analizzatore in Milvus è composto esattamente da un <strong>tokenizer</strong> e da <strong>zero o più</strong> filtri.</p>
<ul>
<li><p><strong>Tokenizzatore</strong>: Il tokenizer spezza il testo in ingresso in unità discrete chiamate tokens. Questi token possono essere parole o frasi, a seconda del tipo di tokenizer.</p></li>
<li><p><strong>Filtri</strong>: I filtri possono essere applicati ai token per affinarli ulteriormente, ad esempio rendendoli minuscoli o rimuovendo parole comuni.</p></li>
</ul>
<div class="alert note">
<p>I tokenizzatori supportano solo il formato UTF-8. Il supporto per altri formati sarà aggiunto nelle versioni future.</p>
</div>
<p>Il flusso di lavoro sottostante mostra come un analizzatore elabora il testo.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/analyzer-process-workflow.png" alt="analyzer-process-workflow" class="doc-image" id="analyzer-process-workflow" />
   </span> <span class="img-wrapper"> <span>analizzatore-processo-flusso di lavoro</span> </span></p>
<h2 id="Analyzer-types" class="common-anchor-header">Tipi di analizzatori<button data-href="#Analyzer-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus offre due tipi di analizzatori per soddisfare le diverse esigenze di elaborazione del testo:</p>
<ul>
<li><p><strong>Analizzatore integrato</strong>: Si tratta di configurazioni predefinite che coprono le attività comuni di elaborazione del testo con una configurazione minima. Gli analizzatori integrati sono ideali per le ricerche generiche, in quanto non richiedono una configurazione complessa.</p></li>
<li><p><strong>Analizzatore personalizzato</strong>: Per i requisiti più avanzati, gli analizzatori personalizzati consentono di definire la propria configurazione specificando sia il tokenizer che zero o più filtri. Questo livello di personalizzazione è particolarmente utile per casi d'uso specializzati in cui è necessario un controllo preciso sull'elaborazione del testo.</p></li>
</ul>
<div class="alert note">
<p>Se si omettono le configurazioni dell'analizzatore durante la creazione della raccolta, Milvus utilizza l'analizzatore <code translate="no">standard</code> per l'elaborazione del testo. Per maggiori dettagli, consultare <a href="/docs/it/standard-analyzer.md">Standard</a>.</p>
</div>
<h3 id="Built-in-analyzer" class="common-anchor-header">Analizzatore integrato</h3><p>Gli analizzatori integrati in Milvus sono preconfigurati con tokenizer e filtri specifici, consentendo di utilizzarli immediatamente senza doverli definire personalmente. Ogni analizzatore integrato è un modello che include un tokenizer e dei filtri preimpostati, con parametri opzionali per la personalizzazione.</p>
<p>Per esempio, per usare l'analizzatore incorporato <code translate="no">standard</code>, basta specificare il nome <code translate="no">standard</code> come <code translate="no">type</code> e includere facoltativamente configurazioni aggiuntive specifiche per questo tipo di analizzatore, come <code translate="no">stop_words</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;stop_words&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Uses the standard built-in analyzer</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment">// Defines a list of common words (stop words) to exclude from tokenization</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>La configurazione dell'analizzatore integrato <code translate="no">standard</code> di cui sopra è equivalente all'impostazione di un <a href="/docs/it/analyzer-overview.md#null">analizzatore personalizzato</a> con i seguenti parametri, dove le opzioni <code translate="no">tokenizer</code> e <code translate="no">filter</code> sono definite esplicitamente per ottenere funzionalità simili:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>,
        <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt;() {{
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;stop_words&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
                }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]
        }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [
       &quot;lowercase&quot;,
       {
            &quot;type&quot;: &quot;stop&quot;,
            &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
       }
   ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus offre i seguenti analizzatori integrati, ciascuno progettato per specifiche esigenze di elaborazione del testo:</p>
<ul>
<li><p><code translate="no">standard</code>: Adatto per l'elaborazione di testi generici, applicando la tokenizzazione standard e il filtraggio delle minuscole.</p></li>
<li><p><code translate="no">english</code>: Ottimizzato per i testi in lingua inglese, con supporto per le stop words inglesi.</p></li>
<li><p><code translate="no">chinese</code>: Specializzato per l'elaborazione del testo cinese, con tokenizzazione adattata alle strutture della lingua cinese.</p></li>
</ul>
<p>Per un elenco degli analizzatori incorporati e delle relative impostazioni personalizzabili, consultare <a href="/docs/it/built-in-analyzers">Riferimento agli analizzatori incorporati</a>.</p>
<h3 id="Custom-analyzer" class="common-anchor-header">Analizzatore personalizzato</h3><p>Per un'elaborazione del testo più avanzata, gli analizzatori personalizzati di Milvus consentono di costruire una pipeline di trattamento del testo su misura, specificando un <strong>tokenizzatore</strong> e dei <strong>filtri</strong>. Questa configurazione è ideale per casi d'uso particolari che richiedono un controllo preciso.</p>
<h4 id="Tokenizer" class="common-anchor-header">Tokenizzatore</h4><p>Il <strong>tokenizer</strong> è un componente <strong>obbligatorio</strong> per un analizzatore personalizzato, che avvia la pipeline di analisi scomponendo il testo in ingresso in unità discrete o <strong>token</strong>. La tokenizzazione segue regole specifiche, come la suddivisione per spazi bianchi o punteggiatura, a seconda del tipo di tokenizzatore. Questo processo consente una gestione più precisa e indipendente di ogni parola o frase.</p>
<p>Ad esempio, un tokenizer converte il testo <code translate="no">&quot;Vector Database Built for Scale&quot;</code> in token separati:</p>
<pre><code translate="no" class="language-plaintext">[<span class="hljs-string">&quot;Vector&quot;</span>, <span class="hljs-string">&quot;Database&quot;</span>, <span class="hljs-string">&quot;Built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;Scale&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<p><strong>Esempio di specificazione di un tokenizer</strong>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;whitespace&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;whitespace&quot;
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per un elenco dei tokenizer disponibili, fare riferimento a <a href="/docs/it/tokenizers">Tokenizer Reference</a>.</p>
<h4 id="Filter" class="common-anchor-header">Filtro</h4><p>I<strong>filtri</strong> sono componenti <strong>opzionali</strong> che lavorano sui token prodotti dal tokenizer, trasformandoli o raffinandoli come necessario. Ad esempio, dopo aver applicato un filtro <code translate="no">lowercase</code> ai termini tokenizzati <code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code>, il risultato potrebbe essere:</p>
<pre><code translate="no" class="language-sql">[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<p>I filtri di un analizzatore personalizzato possono essere <strong>integrati</strong> o <strong>personalizzati</strong>, a seconda delle esigenze di configurazione.</p>
<ul>
<li><p><strong>Filtri integrati</strong>: Preconfigurati da Milvus, richiedono una configurazione minima. È possibile utilizzare questi filtri immediatamente, specificando i loro nomi. I filtri seguenti sono integrati per l'uso diretto:</p>
<ul>
<li><p><code translate="no">lowercase</code>: Converte il testo in minuscolo, garantendo una corrispondenza senza distinzione tra maiuscole e minuscole. Per maggiori dettagli, consultare <a href="/docs/it/lowercase-filter.md">Minuscole</a>.</p></li>
<li><p><code translate="no">asciifolding</code>: Converte i caratteri non ASCII in equivalenti ASCII, semplificando la gestione del testo multilingue. Per ulteriori informazioni, consultare la sezione <a href="/docs/it/ascii-folding-filter.md">Piegatura ASCII</a>.</p></li>
<li><p><code translate="no">alphanumonly</code>: Conserva solo i caratteri alfanumerici eliminando gli altri. Per maggiori dettagli, vedere <a href="/docs/it/alphanumonly-filter.md">Solo alfanumerici</a>.</p></li>
<li><p><code translate="no">cnalphanumonly</code>: Rimuove i token che contengono caratteri diversi da quelli cinesi, lettere inglesi o cifre. Per i dettagli, fare riferimento a <a href="/docs/it/cnalphanumonly-filter.md">Cnalphanumonly</a>.</p></li>
<li><p><code translate="no">cncharonly</code>: Rimuove i token che contengono caratteri non cinesi. Per i dettagli, fare riferimento a <a href="/docs/it/cncharonly-filter.md">Cncharonly</a>.</p></li>
</ul>
<p><strong>Esempio di utilizzo di un filtro integrato:</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a><a href="#java">Java</a><a href="#javascript">NodeJS</a><a href="#bash">cURL</a></div></p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;lowercase&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment">// Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment">// Optional: Built-in filter that converts text to lowercase</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [&quot;lowercase&quot;]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filtri personalizzati</strong>: I filtri personalizzati consentono configurazioni specifiche. È possibile definire un filtro personalizzato scegliendo un tipo di filtro valido (<code translate="no">filter.type</code>) e aggiungendo impostazioni specifiche per ogni tipo di filtro. Esempi di tipi di filtro che supportano la personalizzazione:</p>
<ul>
<li><p><code translate="no">stop</code>: Rimuove le parole comuni specificate impostando un elenco di parole di arresto (ad esempio, <code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code>). Per ulteriori informazioni, consultare <a href="/docs/it/stop-filter.md">Stop</a>.</p></li>
<li><p><code translate="no">length</code>: Esclude i token in base a criteri di lunghezza, come l'impostazione di una lunghezza massima dei token. Per i dettagli, vedere <a href="/docs/it/length-filter.md">Lunghezza</a>.</p></li>
<li><p><code translate="no">stemmer</code>: Riduce le parole alla loro forma radicale per una corrispondenza più flessibile. Per ulteriori informazioni, vedere <a href="/docs/it/stemmer-filter.md">Stemmer</a>.</p></li>
</ul>
<p><strong>Esempio di configurazione di un filtro personalizzato:</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a><a href="#java">Java</a><a href="#javascript">NodeJS</a><a href="#bash">cURL</a></div></p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>,
        <span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt;() {{
            <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
            <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;stop_words&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
        }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, // Mandatory: Specifies tokenizer
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, // Specifies <span class="hljs-string">&#x27;stop&#x27;</span> <span class="hljs-keyword">as</span> the <span class="hljs-built_in">filter</span> <span class="hljs-built_in">type</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], // Customizes stop words <span class="hljs-keyword">for</span> this <span class="hljs-built_in">filter</span> <span class="hljs-built_in">type</span>
        }
    ]
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> analyzerParams=<span class="hljs-string">&#x27;{
       &quot;type&quot;: &quot;standard&quot;,
       &quot;filter&quot;:  [
       {
            &quot;type&quot;: &quot;stop&quot;,
            &quot;stop_words&quot;: [&quot;a&quot;, &quot;an&quot;, &quot;for&quot;]
       }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per un elenco dei tipi di filtro disponibili e dei loro parametri specifici, consultare la sezione <a href="/docs/it/filters">Riferimento ai filtri</a>.</p></li>
</ul>
<h2 id="Example-use" class="common-anchor-header">Esempio di utilizzo<button data-href="#Example-use" class="anchor-icon" translate="no">
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
    </button></h2><p>In questo esempio, definiamo uno schema di raccolta con un campo vettoriale per le incorporazioni e due campi <code translate="no">VARCHAR</code> per le capacità di elaborazione del testo. Ogni campo <code translate="no">VARCHAR</code> è configurato con le proprie impostazioni di analizzatore per gestire le diverse esigenze di elaborazione.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add fields to schema</span>

<span class="hljs-comment"># Use a built-in analyzer</span>
analyzer_params_built_in = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add VARCHAR field `title_en`</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>, 
    datatype=DataType.VARCHAR, 
    max_length=<span class="hljs-number">1000</span>, 
    enable_analyzer=<span class="hljs-literal">True</span>,
    analyzer_params=analyzer_params_built_in,
    enable_match=<span class="hljs-literal">True</span>, 
)

<span class="hljs-comment"># Configure a custom analyzer</span>
analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-comment"># Built-in filter</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-comment"># Custom filter</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Custom filter</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Add VARCHAR field `title`</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>, 
    datatype=DataType.VARCHAR, 
    max_length=<span class="hljs-number">1000</span>, 
    enable_analyzer=<span class="hljs-literal">True</span>,
    analyzer_params=analyzer_params_custom,
    enable_match=<span class="hljs-literal">True</span>, 
)

<span class="hljs-comment"># Add vector field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)
<span class="hljs-comment"># Add primary field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set up index params for vector field</span>
index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)

<span class="hljs-comment"># Create collection with defined schema</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">client</span>.<span class="hljs-property">ConnectConfig</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">client</span>.<span class="hljs-property">MilvusClientV2</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">DataType</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">AddFieldReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">CreateCollectionReq</span>;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-title class_">ConnectConfig</span> config = <span class="hljs-title class_">ConnectConfig</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_">build</span>();
<span class="hljs-title class_">MilvusClientV2</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<span class="hljs-comment">// Create schema</span>
<span class="hljs-title class_">CreateCollectionReq</span>.<span class="hljs-property">CollectionSchema</span> schema = <span class="hljs-title class_">CreateCollectionReq</span>.<span class="hljs-property">CollectionSchema</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">enableDynamicField</span>(<span class="hljs-literal">false</span>)
        .<span class="hljs-title function_">build</span>();

<span class="hljs-comment">// Add fields to schema</span>
<span class="hljs-comment">// Use a built-in analyzer</span>
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParamsBuiltin = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParamsBuiltin.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
<span class="hljs-comment">// Add VARCHAR field `title_en`</span>
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;title_en&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">1000</span>)
        .<span class="hljs-title function_">enableAnalyzer</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">analyzerParams</span>(analyzerParamsBuiltin)
        .<span class="hljs-title function_">enableMatch</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">build</span>());

<span class="hljs-comment">// Configure a custom analyzer</span>
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;filter&quot;</span>,
        <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;lowercase&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt;() {{
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;length&quot;</span>);
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;max&quot;</span>, <span class="hljs-number">40</span>);
                }},
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt;() {{
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;stop&quot;</span>);
                    <span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;stop_words&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>));
                }}
        )
);
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;title&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">1000</span>)
        .<span class="hljs-title function_">enableAnalyzer</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">analyzerParams</span>(analyzerParams)
        .<span class="hljs-title function_">enableMatch</span>(<span class="hljs-literal">true</span>) <span class="hljs-comment">// must enable this if you use TextMatch</span>
        .<span class="hljs-title function_">build</span>());

<span class="hljs-comment">// Add vector field</span>
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>)
        .<span class="hljs-title function_">dimension</span>(<span class="hljs-number">3</span>)
        .<span class="hljs-title function_">build</span>());
<span class="hljs-comment">// Add primary field</span>
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;id&quot;</span>)
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>)
        .<span class="hljs-title function_">isPrimaryKey</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">autoID</span>(<span class="hljs-literal">true</span>)
        .<span class="hljs-title function_">build</span>());

<span class="hljs-comment">// Set up index params for vector field</span>
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>)
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">COSINE</span>)
        .<span class="hljs-title function_">build</span>());

<span class="hljs-comment">// Create collection with defined schema</span>
<span class="hljs-title class_">CreateCollectionReq</span> requestCreate = <span class="hljs-title class_">CreateCollectionReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)
        .<span class="hljs-title function_">collectionSchema</span>(schema)
        .<span class="hljs-title function_">indexParams</span>(indexes)
        .<span class="hljs-title function_">build</span>();
client.<span class="hljs-title function_">createCollection</span>(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { MilvusClient, DataType } from <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Set up a Milvus client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-built_in">new</span> MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);
<span class="hljs-comment">// Use a built-in analyzer for VARCHAR field `title_en`</span>
<span class="hljs-keyword">const</span> analyzerParamsBuiltIn = {
  <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;english&quot;</span>,
};

<span class="hljs-comment">// Configure a custom analyzer for VARCHAR field `title`</span>
<span class="hljs-keyword">const</span> analyzerParamsCustom = {
  tokenizer: <span class="hljs-string">&quot;standard&quot;</span>,
  filter: [
    <span class="hljs-string">&quot;lowercase&quot;</span>,
    {
      <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;length&quot;</span>,
      max: <span class="hljs-number">40</span>,
    },
    {
      <span class="hljs-keyword">type</span>: <span class="hljs-string">&quot;stop&quot;</span>,
      stop_words: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>],
    },
  ],
};

<span class="hljs-comment">// Create schema</span>
<span class="hljs-keyword">const</span> schema = {
  auto_id: <span class="hljs-literal">true</span>,
  fields: [
    {
      name: <span class="hljs-string">&quot;id&quot;</span>,
      <span class="hljs-keyword">type</span>: DataType.INT64,
      is_primary: <span class="hljs-literal">true</span>,
    },
    {
      name: <span class="hljs-string">&quot;title_en&quot;</span>,
      data_type: DataType.VARCHAR,
      max_length: <span class="hljs-number">1000</span>,
      enable_analyzer: <span class="hljs-literal">true</span>,
      analyzer_params: analyzerParamsBuiltIn,
      enable_match: <span class="hljs-literal">true</span>,
    },
    {
      name: <span class="hljs-string">&quot;title&quot;</span>,
      data_type: DataType.VARCHAR,
      max_length: <span class="hljs-number">1000</span>,
      enable_analyzer: <span class="hljs-literal">true</span>,
      analyzer_params: analyzerParamsCustom,
      enable_match: <span class="hljs-literal">true</span>,
    },
    {
      name: <span class="hljs-string">&quot;embedding&quot;</span>,
      data_type: DataType.FLOAT_VECTOR,
      dim: <span class="hljs-number">4</span>,
    },
  ],
};

<span class="hljs-comment">// Set up index params for vector field</span>
<span class="hljs-keyword">const</span> indexParams = [
  {
    name: <span class="hljs-string">&quot;embedding&quot;</span>,
    metric_type: <span class="hljs-string">&quot;COSINE&quot;</span>,
    index_type: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  },
];

<span class="hljs-comment">// Create collection with defined schema</span>
await client.createCollection({
  collection_name: <span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
  schema: schema,
  index_params: indexParams,
});

console.log(<span class="hljs-string">&quot;Collection created successfully!&quot;</span>);

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;title_en&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true,
                    &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;english&quot;}
                }
            },
            {
                &quot;fieldName&quot;: &quot;title&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true,
                    &quot;analyzer_params&quot;: {
                        &quot;tokenizer&quot;: &quot;standard&quot;,
                        &quot;filter&quot;:[
                            &quot;lowercase&quot;,
                            {
                                &quot;type&quot;:&quot;length&quot;,
                                &quot;max&quot;:40
                            },
                            {
                                &quot;type&quot;:&quot;stop&quot;,
                                &quot;stop_words&quot;:[&quot;of&quot;,&quot;to&quot;]
                            }
                        ]
                    }
                }
            },
            {
                &quot;fieldName&quot;: &quot;embedding&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;:3
                }
            }
        ]
    }&#x27;</span>
    
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;YOUR_COLLECTION_NAME\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
