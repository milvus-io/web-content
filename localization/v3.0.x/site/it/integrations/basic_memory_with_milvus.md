---
id: basic_memory_with_milvus.md
summary: >-
  In questo tutorial realizzeremo un piccolo progetto dedicato alla gestione
  della memoria per un team di sviluppo. Registreremo note relative alla cache,
  all'autenticazione, alle distribuzioni e ai backup, per poi recuperare la nota
  corretta tramite la ricerca semantica e ibrida.
title: Creare una memoria semantica del progetto con Basic Memory e Milvus
---
<h1 id="Build-Semantic-Project-Memory-with-Basic-Memory-and-Milvus" class="common-anchor-header">Creare una memoria semantica del progetto con Basic Memory e Milvus<button data-href="#Build-Semantic-Project-Memory-with-Basic-Memory-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/basicmachines-co/basic-memory">Basic Memory</a> conserva le conoscenze relative al progetto in normali file Markdown e le rende disponibili tramite una CLI e un server MCP. Ciò offre a un agente di programmazione uno spazio permanente in cui memorizzare decisioni, runbook e lezioni che dovrebbero sopravvivere oltre una singola conversazione.</p>
<p>In questo tutorial, creeremo un piccolo progetto di memoria per un team di sviluppo applicativo. Registreremo note relative a caching, autenticazione, distribuzioni e backup, per poi recuperare la nota corretta tramite la ricerca semantica e ibrida.</p>
<p><a href="https://milvus.io/">Milvus</a> memorizzerà i vettori ed eseguirà la ricerca per similarità. Basic Memory continuerà a gestire le note Markdown, i metadati del progetto, la ricerca full-text e il manifesto dei vettori in PostgreSQL.</p>
<pre><code translate="no" class="language-text">Markdown notes
      |
      v
Basic Memory CLI / MCP
      |-- PostgreSQL: projects, metadata, full-text search, vector manifest
      |-- OpenAI: embeddings
      `-- Milvus: vector persistence and similarity search
<button class="copy-code-btn"></button></code></pre>
<p>Questo tutorial utilizza Milvus Lite, che viene eseguito localmente in un percorso sul proprio computer. La stessa configurazione di Basic Memory potrà in seguito puntare a Milvus Standalone, Milvus Distributed o Zilliz Cloud.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>È necessario:</p>
<ul>
<li>Python 3.12 o versioni successive</li>
<li><a href="https://docs.astral.sh/uv/"><code translate="no">uv</code></a></li>
<li>Un database PostgreSQL e il relativo URL di connessione <code translate="no">postgresql+asyncpg://...</code> </li>
<li>Una chiave API OpenAI</li>
</ul>
<p>Installare Basic Memory con le sue dipendenze opzionali Milvus da PyPI:</p>
<pre><code translate="no" class="language-bash">uv tool install --python 3.12 <span class="hljs-string">&quot;basic-memory[milvus]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Basic-Memory" class="common-anchor-header">Configurare Basic Memory<button data-href="#Configure-Basic-Memory" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare un'area di lavoro per il tutorial. Mantenere qui la configurazione di Basic Memory e i dati di Milvus Lite rende l'esempio facile da esaminare e rimuovere in seguito.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> -p basic-memory-milvus-demo/notes
<span class="hljs-built_in">cd</span> basic-memory-milvus-demo

<span class="hljs-built_in">export</span> BASIC_MEMORY_CONFIG_DIR=<span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/.basic-memory&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Configurare PostgreSQL come database principale, OpenAI come provider di embedding e Milvus come indice vettoriale:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_DATABASE_BACKEND=postgres
<span class="hljs-built_in">export</span> BASIC_MEMORY_DATABASE_URL=<span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span>

<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED=<span class="hljs-literal">true</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_VECTOR_INDEX=milvus
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/basic-memory-vectors.db&quot;</span>

<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER=openai
<span class="hljs-built_in">export</span> BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL=text-embedding-3-small
<span class="hljs-built_in">export</span> OPENAI_API_KEY=<span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questo caso, <code translate="no">BASIC_MEMORY_MILVUS_URI</code> è un percorso locale, quindi PyMilvus avvia automaticamente Milvus Lite. Non è necessario un server Milvus separato.</p>
<p>Milvus è opzionale in Basic Memory nel suo complesso, ma in questo tutorial è il backend vettoriale selezionato. Attualmente la selezione si applica solo quando il backend del database principale è PostgreSQL. I progetti Basic Memory basati su SQLite utilizzano invece <code translate="no">sqlite-vec</code>.</p>
<h2 id="Create-a-memory-project" class="common-anchor-header">Creare un progetto in memoria<button data-href="#Create-a-memory-project" class="anchor-icon" translate="no">
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
    </button></h2><p>Un progetto Basic Memory associa un nome a una directory contenente note in formato Markdown. Aggiungi la directory del tutorial come progetto e impostala come predefinita:</p>
<pre><code translate="no" class="language-bash">bm project add app-memory <span class="hljs-string">&quot;<span class="hljs-variable">$PWD</span>/notes&quot;</span> --default
<button class="copy-code-btn"></button></code></pre>
<p>Il team dell’applicazione dispone ora di uno spazio di memoria persistente. Riempiamolo con un piccolo catalogo misto. Alcune note saranno rilevanti per le nostre domande successive, mentre altre fungeranno da distrattori realistici.</p>
<h2 id="Record-project-memories" class="common-anchor-header">Registrare le memorie del progetto<button data-href="#Record-project-memories" class="anchor-icon" translate="no">
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
    </button></h2><p>Inizia con la decisione relativa alla cache dell’applicazione:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Caching Strategy&quot;</span> \
  --folder <span class="hljs-string">&quot;engineering&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Caching Strategy</span>

The application caches read-heavy product responses <span class="hljs-keyword">in</span> Redis <span class="hljs-keyword">for</span> five minutes. This avoids repeated database queries and makes repeated requests faster. Cache entries are invalidated immediately after a write.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Registra come vengono gestiti i token di autenticazione:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Authentication Tokens&quot;</span> \
  --folder <span class="hljs-string">&quot;engineering&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Authentication Tokens</span>

JWT access tokens expire after fifteen minutes. Refresh tokens rotate on every use. After suspicious activity, revoke the entire token family and require the user to sign <span class="hljs-keyword">in</span> again.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Aggiungi due runbook operativi:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;Deployment Reliability&quot;</span> \
  --folder <span class="hljs-string">&quot;operations&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Deployment Reliability</span>

Production releases use a canary deployment. Readiness probes must pass before traffic shifts, and the rollout automatically stops when the error rate crosses the agreed threshold.
EOF

bm tool write-note \
  --title <span class="hljs-string">&quot;Database Backups&quot;</span> \
  --folder <span class="hljs-string">&quot;operations&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Database Backups</span>

PostgreSQL uses daily snapshots and continuous write-ahead <span class="hljs-built_in">log</span> archiving. The team runs a restore drill every month and records the recovery point and recovery time.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Infine, aggiungi due note sul prodotto non correlate. Queste rendono l’esercizio di ricerca più rappresentativo rispetto a un catalogo in cui ogni documento è rilevante:</p>
<pre><code translate="no" class="language-bash">bm tool write-note \
  --title <span class="hljs-string">&quot;UI Accessibility&quot;</span> \
  --folder <span class="hljs-string">&quot;product&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># UI Accessibility</span>

The settings screen must support keyboard navigation, visible focus states, sufficient color contrast, and descriptive labels <span class="hljs-keyword">for</span> screen readers.
EOF

bm tool write-note \
  --title <span class="hljs-string">&quot;Content Planning&quot;</span> \
  --folder <span class="hljs-string">&quot;product&quot;</span> \
  --project app-memory &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
<span class="hljs-comment"># Content Planning</span>

The content calendar tracks blog drafts, launch screenshots, reviewers, and publication dates <span class="hljs-keyword">for</span> the next product release.
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Ogni nota rimane un normale file Markdown in <code translate="no">notes/</code>. Basic Memory aggiunge la struttura ricercabile senza sottrarre il controllo al filesystem.</p>
<h2 id="Build-the-search-indexes" class="common-anchor-header">Crea gli indici di ricerca<button data-href="#Build-the-search-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Eseguire una reindicizzazione completa dopo aver aggiunto o modificato in modo sostanziale un gruppo di note:</p>
<pre><code translate="no" class="language-bash">bm reindex --full --project app-memory
<button class="copy-code-btn"></button></code></pre>
<p>Durante questa fase, Basic Memory:</p>
<ol>
<li>Legge e suddivide in blocchi le note Markdown.</li>
<li>Crea l’indice full-text in PostgreSQL.</li>
<li>Invia i segmenti al modello di embedding OpenAI configurato.</li>
<li>Memorizza i vettori risultanti nella collezione Milvus specifica del progetto.</li>
<li>Contrassegna i blocchi archiviati con successo come pronti nel proprio manifesto dei vettori PostgreSQL.</li>
</ol>
<p>Basic Memory utilizza una collezione Milvus deterministica per ogni progetto. Non è necessario creare o denominare la collezione autonomamente.</p>
<h2 id="Retrieve-a-memory-by-meaning" class="common-anchor-header">Recupera una memoria in base al significato<button data-href="#Retrieve-a-memory-by-meaning" class="anchor-icon" translate="no">
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
    </button></h2><p>Supponiamo che un nuovo ingegnere ricordi che l’applicazione dispone di un’ottimizzazione per le richieste ripetute, ma non ricordi che il team l’ha definita “strategia di caching”.</p>
<p>Utilizza la ricerca vettoriale per porre la domanda in linguaggio naturale:</p>
<pre><code translate="no" class="language-bash">bm tool search-notes \
  <span class="hljs-string">&quot;How does the application make repeated requests faster?&quot;</span> \
  --vector \
  --project app-memory \
  --page-size 3 \
  --plain
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">Caching Strategy</code> dovrebbe essere il risultato principale anche se la query non deve necessariamente ripetere il titolo della nota. La ricerca vettoriale incorpora la domanda e chiede a Milvus i blocchi memorizzati più vicini.</p>
<p>I punteggi esatti e i risultati con un posizionamento inferiore possono variare a seconda del modello di embedding e dei contenuti del progetto.</p>
<h2 id="Combine-semantic-and-keyword-signals" class="common-anchor-header">Combina segnali semantici e basati su parole chiave<button data-href="#Combine-semantic-and-keyword-signals" class="anchor-icon" translate="no">
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
    </button></h2><p>Ora immagina di dover rispondere a un incidente di sicurezza. La query contiene termini esatti come « <code translate="no">JWT</code> », ma vogliamo anche un linguaggio concettualmente correlato alla revoca dei token e al nuovo accesso.</p>
<p>Utilizzate la ricerca ibrida:</p>
<pre><code translate="no" class="language-bash">bm tool search-notes \
  <span class="hljs-string">&quot;JWT rotation after suspicious activity&quot;</span> \
  --hybrid \
  --project app-memory \
  --page-size 3 \
  --plain
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">Authentication Tokens</code> dovrebbe essere il risultato principale. Basic Memory combina il recupero full-text di PostgreSQL con il recupero vettoriale di Milvus, privilegiando i contenuti che si distinguono in uno dei due percorsi e, in particolare, quelli individuati da entrambi.</p>
<p>Le tre modalità di ricerca presentano diversi punti di forza:</p>
<table>
<thead>
<tr><th>Modalità</th><th>Flag di comando</th><th>Uso ottimale</th></tr>
</thead>
<tbody>
<tr><td>Testo completo</td><td>Nessun flag di modalità</td><td>Termini esatti, frasi e query con parole chiave booleane</td></tr>
<tr><td>Vettoriale</td><td><code translate="no">--vector</code></td><td>Parafrasi, concetti e domande esplorative</td></tr>
<tr><td>Ibrido</td><td><code translate="no">--hybrid</code></td><td>Ricerca generica che utilizza sia segnali basati su parole chiave che segnali semantici</td></tr>
</tbody>
</table>
<h2 id="Use-another-Milvus-deployment" class="common-anchor-header">Utilizza un'altra installazione di Milvus<button data-href="#Use-another-Milvus-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Il codice dell'applicazione e i comandi di Basic Memory non cambiano quando si supera la capacità di Milvus Lite. Modificare l'URI e, se necessario, fornire un token.</p>
<p>Per un server Milvus:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per Zilliz Cloud:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_URI=<span class="hljs-string">&quot;https://YOUR_CLUSTER_ENDPOINT&quot;</span>
<span class="hljs-built_in">export</span> BASIC_MEMORY_MILVUS_TOKEN=<span class="hljs-string">&quot;YOUR_API_KEY&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Creare una nuova raccolta di destinazione o seguire la procedura di migrazione dell’archivio vettoriale di Basic Memory prima di passare da un backend vettoriale a un altro in un progetto esistente. Quindi ricompilare i vettori:</p>
<pre><code translate="no" class="language-bash">bm reindex --full --project app-memory
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-the-same-memory-through-MCP" class="common-anchor-header">Utilizza la stessa memoria tramite MCP<button data-href="#Use-the-same-memory-through-MCP" class="anchor-icon" translate="no">
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
    </button></h2><p>La CLI è utile per la configurazione, la manutenzione, la creazione di script e la comprensione del flusso di dati. Nel lavoro quotidiano, un client MCP può avviare lo stesso servizio Basic Memory e richiamare direttamente strumenti quali <code translate="no">write_note</code>, <code translate="no">search_notes</code> e <code translate="no">build_context</code>.</p>
<p>Ad esempio, una configurazione MCP di Codex può eseguire il comando installato da <code translate="no">uv tool</code>:</p>
<pre><code translate="no" class="language-toml"><span class="hljs-section">[mcp_servers.basic-memory]</span>
<span class="hljs-attr">command</span> = <span class="hljs-string">&quot;basic-memory&quot;</span>
<span class="hljs-attr">args</span> = [<span class="hljs-string">&quot;mcp&quot;</span>]

<span class="hljs-section">[mcp_servers.basic-memory.env]</span>
<span class="hljs-attr">BASIC_MEMORY_CONFIG_DIR</span> = <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/.basic-memory&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_DATABASE_BACKEND</span> = <span class="hljs-string">&quot;postgres&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_DATABASE_URL</span> = <span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED</span> = <span class="hljs-string">&quot;true&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_VECTOR_INDEX</span> = <span class="hljs-string">&quot;milvus&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_MILVUS_URI</span> = <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/basic-memory-vectors.db&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER</span> = <span class="hljs-string">&quot;openai&quot;</span>
<span class="hljs-attr">BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL</span> = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>
<span class="hljs-attr">OPENAI_API_KEY</span> = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Altri client MCP utilizzano lo stesso eseguibile e gli stessi argomenti in formato JSON:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;basic-memory&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;basic-memory&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;mcp&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;env&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_CONFIG_DIR&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/.basic-memory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_DATABASE_BACKEND&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;postgres&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_DATABASE_URL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_VECTOR_INDEX&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_MILVUS_URI&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/absolute/path/to/basic-memory-milvus-demo/basic-memory-vectors.db&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;openai&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text-embedding-3-small&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;OPENAI_API_KEY&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sk-***********&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Se possibile, conservare le password del database e le chiavi API nella gestione dei segreti del proprio client o nell’ambiente di avvio. Il requisito fondamentale è che il processo MCP riceva la stessa configurazione Basic Memory utilizzata dalla CLI.</p>
<h2 id="What-each-storage-layer-owns" class="common-anchor-header">Cosa appartiene a ciascun livello di archiviazione<button data-href="#What-each-storage-layer-owns" class="anchor-icon" translate="no">
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
    </button></h2><p>Al termine del tutorial, le responsabilità sono state volutamente separate:</p>
<ul>
<li>La directory del progetto contiene le note Markdown originali.</li>
<li>PostgreSQL gestisce i progetti, le entità, i metadati, l’indice full-text e il manifesto vettoriale autorevole di Basic Memory.</li>
<li>OpenAI trasforma i blocchi di note e le domande di ricerca in embedding.</li>
<li>Milvus gestisce la persistenza dei vettori e il recupero del vicino più prossimo.</li>
<li>Basic Memory coordina i livelli e fornisce un'unica interfaccia CLI e MCP.</li>
</ul>
<p>Milvus, quindi, non sostituisce PostgreSQL in questa integrazione. Sostituisce il percorso <code translate="no">pgvector</code> di PostgreSQL per l’archiviazione dei vettori e la ricerca per similarità, mentre il resto delle funzionalità relazionali e full-text di Basic Memory rimangono in PostgreSQL.</p>
