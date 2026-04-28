---
id: synonym-filter.md
title: Sinonimo
summary: >-
  Usare il filtro dei sinonimi per riscrivere i token con un dizionario dei
  sinonimi durante l'analisi del testo.
---
<h1 id="Synonym" class="common-anchor-header">Sinonimo<button data-href="#Synonym" class="anchor-icon" translate="no">
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
    </button></h1><p>Il filtro <code translate="no">synonym</code> riscrive i token in base a un dizionario di sinonimi, in modo che i termini correlati corrispondano durante la ricerca. Supporta due modalità di funzionamento e due modi di fornire il dizionario:</p>
<ul>
<li><p><strong>Modalità di funzionamento</strong> - la modalità <code translate="no">expand</code> conserva il token originale ed emette sinonimi aggiuntivi accanto ad esso; la modalità di normalizzazione (<code translate="no">expand: false</code>) riscrive i token in una forma canonica.</p></li>
<li><p><strong>Sorgenti dei dizionari</strong> - I dizionari di piccole dimensioni possono essere inseriti nella configurazione del filtro tramite l'array <code translate="no">synonyms</code>; i dizionari di grandi dimensioni devono essere memorizzati come <a href="/docs/it/manage-file-resources.md">risorse di file</a> e referenziati tramite <code translate="no">synonyms_file</code>.</p></li>
</ul>
<h2 id="Dictionary-format" class="common-anchor-header">Formato del dizionario<button data-href="#Dictionary-format" class="anchor-icon" translate="no">
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
    </button></h2><p>Un dizionario dei sinonimi è un documento di testo semplice (o un array inline) in cui ogni riga definisce una regola. Sono supportate due forme di regole.</p>
<h3 id="Mapping-rule" class="common-anchor-header">Regola di mappatura<button data-href="#Mapping-rule" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-plaintext">fast, quick =&gt; speedy
<button class="copy-code-btn"></button></code></pre>
<p>I token a sinistra (<code translate="no">fast</code>, <code translate="no">quick</code>) si riscrivono ai token a destra (<code translate="no">speedy</code>). Sono ammessi più target:</p>
<pre><code translate="no" class="language-plaintext">small, little =&gt; tiny, compact
<button class="copy-code-btn"></button></code></pre>
<p>Con <code translate="no">expand: true</code>, i token originali vengono mantenuti insieme ai target:</p>
<ul>
<li><p>Ingresso <code translate="no">fast</code> con <code translate="no">expand: true</code> → <code translate="no">fast</code>, <code translate="no">speedy</code></p></li>
<li><p>Ingresso <code translate="no">fast</code> con <code translate="no">expand: false</code> → <code translate="no">speedy</code></p></li>
</ul>
<h3 id="Equivalence-group" class="common-anchor-header">Gruppo di equivalenza<button data-href="#Equivalence-group" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-plaintext">happy, joyful, cheerful
<button class="copy-code-btn"></button></code></pre>
<p>Tutti i token elencati sono considerati equivalenti:</p>
<ul>
<li><p>Con <code translate="no">expand: true</code>, ogni occorrenza di un qualsiasi token del gruppo emette ogni token del gruppo. Input <code translate="no">happy</code> → <code translate="no">happy</code>, <code translate="no">joyful</code>, <code translate="no">cheerful</code>.</p></li>
<li><p>Con <code translate="no">expand: false</code>, ogni occorrenza viene riscritta al primo token del gruppo. Ingresso <code translate="no">joyful</code> → <code translate="no">happy</code>; l'ingresso <code translate="no">happy</code> è già il primo token e non viene modificato.</p></li>
</ul>
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
    </button></h2><p>Il filtro <code translate="no">synonym</code> è un filtro personalizzato. Specifica <code translate="no">&quot;type&quot;: &quot;synonym&quot;</code> insieme ad almeno uno degli elementi <code translate="no">synonyms</code> (inline) o <code translate="no">synonyms_file</code> (external), oltre a un flag <code translate="no">expand</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
            <span class="hljs-string">&quot;synonyms&quot;</span>: [                       <span class="hljs-comment"># inline rules (optional)</span>
                <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
                <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
            ],
            <span class="hljs-string">&quot;synonyms_file&quot;</span>: {                  <span class="hljs-comment"># external rules (optional)</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
                <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;en_synonyms&quot;</span>,
                <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;synonyms.txt&quot;</span>,
            },
            <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
        }
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>Il filtro <code translate="no">synonym</code> accetta i seguenti parametri.</p>
<table>
   <tr>
     <th><p><strong>Parametro</strong></p></th>
     <th><p><strong>Descrizione</strong></p></th>
     <th><p><strong>Predefinito</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">synonyms</code></p></td>
     <td><p>Un array inline di stringhe di regole. Ogni stringa utilizza il formato del dizionario descritto sopra. Adatto per piccoli dizionari (fino a poche decine di regole).</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">synonyms_file</code></p></td>
     <td><p>Un riferimento a una <a href="/docs/it/manage-file-resources.md">risorsa file</a> che memorizza le regole dei sinonimi, una per riga. Da usare per dizionari più grandi. Vedere <a href="/docs/it/synonym-filter.md#External-dictionary-file">File dizionario esterno</a> di seguito.</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">expand</code></p></td>
     <td><p>Un flag booleano che controlla l'applicazione delle regole. true conserva il token originale ed emette i sinonimi accanto ad esso; false riscrive i token nella loro forma canonica (il lato destro di una mappatura o il primo token di un gruppo di equivalenza).</p></td>
     <td><p>falso</p></td>
   </tr>
</table>
<p>È possibile specificare <code translate="no">synonyms</code>, <code translate="no">synonyms_file</code>, o entrambi. Quando entrambi sono presenti, il filtro fonde le due fonti. Il filtro opera sui token prodotti dal tokenizer; deve quindi essere combinato con un tokenizer come quello <a href="/docs/it/standard-tokenizer.md">standard</a>.</p>
<h3 id="External-dictionary-file" class="common-anchor-header">File dizionario esterno<button data-href="#External-dictionary-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Per i dizionari di dimensioni di produzione, registrare il file come risorsa file remota e fare riferimento ad esso da <code translate="no">synonyms_file</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Register the file once, then reference it from any analyzer that needs it.</span>
client.add_file_resource(
    name=<span class="hljs-string">&quot;en_synonyms&quot;</span>,
    path=<span class="hljs-string">&quot;file/synonyms.txt&quot;</span>,     <span class="hljs-comment"># full S3 object key, including rootPath</span>
)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms_file&quot;</span>: {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
            <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;en_synonyms&quot;</span>,
            <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;synonyms.txt&quot;</span>,
        },
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
    }],
}
<button class="copy-code-btn"></button></code></pre>
<p>Vedere Gestione delle risorse di file per il flusso di lavoro completo (caricare, registrare, elencare, rimuovere) e per il modulo alternativo <code translate="no">&quot;type&quot;: &quot;local&quot;</code>.</p>
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
    </button></h2><p>Prima di applicare l'analizzatore a uno schema di raccolta, verificarne il comportamento con <code translate="no">run_analyzer</code>. Gli esempi seguenti utilizzano l'array inline <code translate="no">synonyms</code> per brevità; sostituirlo con <code translate="no">synonyms_file</code> per dizionari più grandi.</p>
<h3 id="expand-true--keep-the-original-add-synonyms" class="common-anchor-header"><code translate="no">expand: true</code> - mantenere l'originale, aggiungere sinonimi<button data-href="#expand-true--keep-the-original-add-synonyms" class="anchor-icon" translate="no">
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

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms&quot;</span>: [
            <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
            <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
        ],
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
    }],
}

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;a fast car&quot;</span>], analyzer_params))
<span class="hljs-comment"># → [[&#x27;a&#x27;, &#x27;fast&#x27;, &#x27;speedy&#x27;, &#x27;car&#x27;]]</span>

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;i am happy today&quot;</span>], analyzer_params))
<span class="hljs-comment"># → [[&#x27;i&#x27;, &#x27;am&#x27;, &#x27;happy&#x27;, &#x27;joyful&#x27;, &#x27;cheerful&#x27;, &#x27;today&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sia <code translate="no">fast</code> che <code translate="no">happy</code> vengono conservati; i loro sinonimi vengono emessi insieme.</p>
<h3 id="expand-false--rewrite-to-canonical-form" class="common-anchor-header"><code translate="no">expand: false</code> - riscrivere in forma canonica<button data-href="#expand-false--rewrite-to-canonical-form" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params_norm = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms&quot;</span>: [
            <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
            <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
        ],
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">False</span>,
    }],
}

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;a fast car&quot;</span>], analyzer_params_norm))
<span class="hljs-comment"># → [[&#x27;a&#x27;, &#x27;speedy&#x27;, &#x27;car&#x27;]]</span>

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;i am happy today&quot;</span>], analyzer_params_norm))
<span class="hljs-comment"># → [[&#x27;i&#x27;, &#x27;am&#x27;, &#x27;happy&#x27;, &#x27;today&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<p>La regola di mappatura riscrive <code translate="no">fast</code> in <code translate="no">speedy</code>. Il gruppo di equivalenza lascia <code translate="no">happy</code> invariato perché è il primo token del gruppo; un input contenente <code translate="no">joyful</code> o <code translate="no">cheerful</code> sarebbe stato riscritto in <code translate="no">happy</code>.</p>
