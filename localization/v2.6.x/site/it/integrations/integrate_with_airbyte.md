---
id: integrate_with_airbyte.md
summary: >-
  Airbyte è un'infrastruttura open-source per la movimentazione dei dati per la
  creazione di pipeline di estrazione e caricamento (EL). È progettata per
  garantire versatilità, scalabilità e facilità d'uso. Il catalogo di connettori
  di Airbyte viene fornito "out-of-the-box" con oltre 350 connettori
  precostituiti. Questi connettori possono essere utilizzati per iniziare a
  replicare i dati da un'origine a una destinazione in pochi minuti.
title: 'Airbyte: Infrastruttura open source per la movimentazione dei dati'
---
<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">Airbyte: Infrastruttura open source per la movimentazione dei dati<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Airbyte è un'infrastruttura open-source per la movimentazione dei dati per la creazione di pipeline di estrazione e caricamento (EL). È progettata per garantire versatilità, scalabilità e facilità d'uso. Il catalogo di connettori di Airbyte viene fornito "out-of-the-box" con oltre 350 connettori precostituiti. Questi connettori possono essere utilizzati per iniziare a replicare i dati da un'origine a una destinazione in pochi minuti.</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">Componenti principali di Airbyte<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1. Catalogo dei connettori</h3><ul>
<li><strong>Oltre 350 connettori precostituiti</strong>: Il catalogo dei connettori di Airbyte viene fornito "out-of-the-box" con oltre 350 connettori precostituiti. Questi connettori possono essere utilizzati per iniziare a replicare i dati da un'origine a una destinazione in pochi minuti.</li>
<li><strong>Creazione di connettori senza codice</strong>: È possibile estendere facilmente le funzionalità di Airbyte per supportare i propri casi d'uso personalizzati attraverso strumenti <a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">come il No-Code Connector Builder</a>.</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2. La piattaforma</h3><p>La piattaforma di Airbyte fornisce tutti i servizi orizzontali necessari per configurare e scalare le operazioni di movimento dei dati, disponibili come <a href="https://airbyte.com/product/airbyte-cloud">gestiti dal cloud</a> o <a href="https://airbyte.com/product/airbyte-enterprise">autogestiti</a>.</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3. L'interfaccia utente</h3><p>Airbyte dispone di un'interfaccia utente, di <a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">PyAirbyte</a> (libreria Python), di <a href="https://docs.airbyte.com/api-documentation">API</a> e di <a href="https://docs.airbyte.com/terraform-documentation">Terraform Provider</a> per integrarsi con gli strumenti e gli approcci preferiti alla gestione dell'infrastruttura.</p>
<p>Grazie ad Airbyte, gli utenti possono integrare le fonti di dati nel cluster Milvus per la ricerca di similarità.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">Prima di iniziare<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Sono necessari</p>
<ul>
<li>account Zendesk (o un'altra fonte di dati da cui si desidera sincronizzare i dati)</li>
<li>Account Airbyte o istanza locale</li>
<li>Chiave API OpenAI</li>
<li>Cluster Milvus</li>
<li>Python 3.10 installato localmente</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">Configurare il cluster Milvus<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Se avete già installato un cluster K8s per la produzione, potete saltare questo passaggio e procedere direttamente all'<a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">installazione di Milvus Operator</a>. In caso contrario, potete seguire <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">i passi</a> per distribuire un cluster Milvus con Milvus Operator.</p>
<p>Le singole entità (nel nostro caso, i ticket di assistenza e gli articoli della knowledge base) sono memorizzate in una "collezione": dopo aver configurato il cluster, è necessario creare una collezione. Scegliere un nome adatto e impostare la dimensione a 1536 per adattarla alla dimensionalità del vettore generato dal servizio OpenAI embeddings.</p>
<p>Dopo la creazione, registrare le informazioni sull'endpoint e sull'<a href="https://milvus.io/docs/authenticate.md?tab=docker">autenticazione</a>.</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">Impostare la connessione in Airbyte<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>Il nostro database è pronto, spostiamo i dati! Per farlo, dobbiamo configurare una connessione in Airbyte. È possibile registrarsi per un account Airbyte cloud su <a href="https://cloud.airbyte.com">cloud.airbyte.com</a> o avviare un'istanza locale come descritto <a href="https://docs.airbyte.com/using-airbyte/getting-started/">nella documentazione</a>.</p>
<h3 id="Set-Up-Source" class="common-anchor-header">Impostare la sorgente</h3><p>Una volta che la vostra istanza è in funzione, dobbiamo impostare la connessione: fate clic su "Nuova connessione" e scegliete il connettore "Zendesk Support" come sorgente. Dopo aver fatto clic sul pulsante "Prova e salva", Airbyte verificherà se la connessione può essere stabilita.</p>
<p>Sul cloud di Airbyte, è possibile autenticarsi facilmente facendo clic sul pulsante Autentica. Se si utilizza un'istanza Airbyte locale, seguire le indicazioni riportate nella pagina <a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">della documentazione</a>.</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">Impostazione della destinazione</h3><p>Se tutto funziona correttamente, il passo successivo è impostare la destinazione in cui spostare i dati. Qui si sceglie il connettore "Milvus".</p>
<p>Il connettore Milvus svolge tre funzioni:</p>
<ul>
<li><strong>Suddivisione e formattazione</strong> - Suddivide i record Zendesk in testo e metadati. Se il testo è più grande della dimensione specificata, i record vengono suddivisi in più parti che vengono caricate singolarmente nella raccolta. La suddivisione del testo (o chunking) può avvenire, ad esempio, nel caso di ticket di assistenza o articoli di conoscenza di grandi dimensioni. Suddividendo il testo, si può garantire che le ricerche diano sempre risultati utili.</li>
</ul>
<p>Scegliamo una dimensione di 1000 token e i campi di testo corpo, titolo, descrizione e oggetto, poiché questi saranno presenti nei dati che riceveremo da Zendesk.</p>
<ul>
<li><strong>Incorporamento</strong> - L'uso di modelli di apprendimento automatico trasforma i pezzi di testo prodotti dalla parte di elaborazione in incorporazioni vettoriali che possono essere ricercate per somiglianza semantica. Per creare gli embeddings, è necessario fornire la chiave API OpenAI. Airbyte invierà ogni pezzo a OpenAI e aggiungerà il vettore risultante alle entità caricate nel cluster Milvus.</li>
<li><strong>Indicizzazione</strong> - Una volta vettorializzati i pezzi, è possibile caricarli nel database. Per farlo, inserire le informazioni ottenute durante la configurazione del cluster e della collezione in Milvus cluster. <div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_1.png" width="40%"/></div> Facendo clic su "Prova e salva" si verificherà se tutto è allineato correttamente (credenziali valide, la raccolta esiste e ha la stessa dimensionalità vettoriale dell'incorporazione configurata, ecc.)</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">Impostazione del flusso di sincronizzazione dei flussi</h3><p>L'ultimo passo prima che i dati siano pronti a fluire è la selezione dei "flussi" da sincronizzare. Un flusso è una raccolta di record nell'origine. Poiché Zendesk supporta un gran numero di flussi che non sono rilevanti per il nostro caso d'uso, selezioniamo solo "ticket" e "articoli" e disabilitiamo tutti gli altri per risparmiare banda e assicurarci che solo le informazioni rilevanti vengano visualizzate nelle ricerche:<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_2.png" width="40%"/></div> È possibile selezionare i campi da estrarre dall'origine facendo clic sul nome del flusso. La modalità di sincronizzazione "Incrementale | Append + Deduped" significa che le successive esecuzioni della connessione mantengono Zendesk e Milvus sincronizzati, trasferendo però un numero minimo di dati (solo gli articoli e i ticket modificati dall'ultima esecuzione).</p>
<p>Non appena la connessione è stata impostata, Airbyte inizierà a sincronizzare i dati. Possono essere necessari alcuni minuti per apparire nella raccolta di Milvus.</p>
<p>Se si seleziona una frequenza di replica, Airbyte verrà eseguito regolarmente per mantenere la raccolta Milvus aggiornata con le modifiche agli articoli Zendesk e ai problemi appena creati.</p>
<h3 id="Check-flow" class="common-anchor-header">Controllo del flusso</h3><p>È possibile verificare nell'interfaccia del cluster Milvus come sono strutturati i dati nella raccolta navigando nell'area di gioco ed eseguendo una query "Query Data" con un filtro impostato su "_ab_stream == \"tickets\"".<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_3.png" width="40%"/></div> Come si può vedere nella vista del risultato, ogni record proveniente da Zendesk è memorizzato come entità separata in Milvus con tutti i metadati specificati. Il pezzo di testo su cui si basa l'incorporamento è mostrato come proprietà "text" - questo è il testo che è stato incorporato usando OpenAI e sarà quello su cui faremo la ricerca.</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">Creare l'applicazione Streamlit per interrogare la collezione<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>I nostri dati sono pronti: ora dobbiamo creare l'applicazione per utilizzarli. In questo caso, l'applicazione sarà un semplice modulo di supporto per gli utenti che devono inviare casi di assistenza. Quando l'utente preme invio, faremo due cose:</p>
<ul>
<li>Ricerca di ticket simili inviati da utenti della stessa organizzazione.</li>
<li>Ricerca di articoli basati sulla conoscenza che potrebbero essere rilevanti per l'utente.</li>
</ul>
<p>In entrambi i casi, sfrutteremo la ricerca semantica utilizzando gli embeddings di OpenAI. A tal fine, anche la descrizione del problema inserito dall'utente viene incorporata e utilizzata per recuperare entità simili dal cluster Milvus. Se ci sono risultati rilevanti, vengono mostrati sotto il modulo.</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">Configurazione dell'ambiente UI</h3><p>È necessaria un'installazione locale di Python, poiché utilizzeremo Streamlit per implementare l'applicazione.</p>
<p>Per prima cosa, installare Streamlit, la libreria client Milvus e la libreria client OpenAI a livello locale:</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>Per rendere un modulo di supporto di base, creare un file python <code translate="no">basic_support_form.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Per eseguire l'applicazione, utilizzare Streamlit run:</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>Questo renderà un modulo di base:<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_4.png" width="40%"/></div>Il codice di questo esempio è disponibile anche su <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHub</a>.</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">Impostare il servizio di query del backend</h3><p>Quindi, verifichiamo la presenza di ticket aperti esistenti che potrebbero essere rilevanti. Per fare questo, abbiamo incorporato il testo inserito dall'utente con OpenAI, poi abbiamo fatto una ricerca per similarità sulla nostra collezione, filtrando i ticket ancora aperti. Se ce n'è uno con una distanza molto bassa tra il ticket fornito e quello esistente, lo comunichiamo all'utente e non lo inviamo:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">import</span> openai


<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem?&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-keyword">import</span> os
        <span class="hljs-keyword">import</span> pymilvus
        <span class="hljs-keyword">import</span> openai

        org_id = <span class="hljs-number">360033549136</span> <span class="hljs-comment"># TODO Load from customer login data</span>

        pymilvus.connections.connect(uri=os.environ[<span class="hljs-string">&quot;MILVUS_URL&quot;</span>], token=os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>])
        collection = pymilvus.Collection(<span class="hljs-string">&quot;zendesk&quot;</span>)

        embedding = openai.Embedding.create(<span class="hljs-built_in">input</span>=text_val, model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;embedding&#x27;</span>]

        results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">2</span>, output_fields=[<span class="hljs-string">&quot;_id&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>], expr=<span class="hljs-string">f&#x27;status == &quot;new&quot; and organization_id == <span class="hljs-subst">{org_id}</span>&#x27;</span>)

        st.write(results[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> results[<span class="hljs-number">0</span>].distances[<span class="hljs-number">0</span>] &lt; <span class="hljs-number">0.35</span>:
            matching_ticket = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>].entity
            st.write(<span class="hljs-string">f&quot;This case seems very similar to <span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;subject&#x27;</span>)}</span> (id #<span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;_id&#x27;</span>)}</span>). Make sure it has not been submitted before&quot;</span>)
        <span class="hljs-keyword">else</span>:
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            
<button class="copy-code-btn"></button></code></pre>
<p>Qui accadono diverse cose:</p>
<ul>
<li>Viene impostata la connessione al cluster Milvus.</li>
<li>Il servizio OpenAI viene utilizzato per generare un embedding della descrizione inserita dall'utente.</li>
<li>Viene eseguita una ricerca di somiglianza, filtrando i risultati in base allo stato del ticket e all'id dell'organizzazione (poiché solo i ticket aperti della stessa organizzazione sono rilevanti).</li>
<li>Se ci sono risultati e la distanza tra i vettori di incorporamento del ticket esistente e del testo appena inserito è inferiore a una certa soglia, viene segnalato questo fatto.</li>
</ul>
<p>Per eseguire la nuova applicazione, è necessario impostare prima le variabili di ambiente per OpenAI e Milvus:</p>
<pre><code translate="no" class="language-shell">export MILVUS_TOKEN=...
export MILVUS_URL=https://...
export OPENAI_API_KEY=sk-...

streamlit run app.py
<button class="copy-code-btn"></button></code></pre>
<p>Quando si tenta di inviare un ticket già esistente, il risultato sarà questo:<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_5.png" width="40%"/></div> Il codice di questo esempio è disponibile anche su <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub</a>.</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">Mostrare più informazioni rilevanti</h3><p>Come si può vedere nell'output di debug verde nascosto nella versione finale, due ticket corrispondevano alla nostra ricerca (in stato nuovo, dall'organizzazione corrente e vicino al vettore di incorporamento). Tuttavia, il primo (rilevante) si è classificato più in alto del secondo (irrilevante in questa situazione), il che si riflette nel valore di distanza più basso. Questa relazione viene catturata nei vettori di incorporamento senza che le parole vengano direttamente abbinate, come in una normale ricerca full-text.</p>
<p>Per concludere, mostriamo le informazioni utili dopo l'invio del ticket, in modo da fornire all'utente il maggior numero possibile di informazioni rilevanti in anticipo.</p>
<p>A tale scopo, faremo una seconda ricerca dopo l'invio del ticket per recuperare gli articoli della knowledge base che corrispondono maggiormente:</p>
<pre><code translate="no" class="language-python">   ......
   
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># TODO Actually send out the ticket</span>
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            article_results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">5</span>, output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;html_url&quot;</span>], expr=<span class="hljs-string">f&#x27;_ab_stream == &quot;articles&quot;&#x27;</span>)
            st.write(article_results[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(article_results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span>:
                st.write(<span class="hljs-string">&quot;We also found some articles that might help you:&quot;</span>)
                <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> article_results[<span class="hljs-number">0</span>]:
                    <span class="hljs-keyword">if</span> hit.distance &lt; <span class="hljs-number">0.362</span>:
                        st.write(<span class="hljs-string">f&quot;* [<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)}</span>](<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;html_url&#x27;</span>)}</span>)&quot;</span>)

<button class="copy-code-btn"></button></code></pre>
<p>Se non c'è nessun ticket di assistenza aperto con un punteggio di somiglianza elevato, il nuovo ticket viene inviato e gli articoli di conoscenza pertinenti vengono mostrati di seguito:<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_6.png" width="40%"/></div> Il codice di questo esempio è disponibile anche su <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github</a>.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusione<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Anche se l'interfaccia utente mostrata qui non è un vero e proprio modulo di assistenza, ma un esempio per illustrare il caso d'uso, la combinazione di Airbyte e Milvus è molto potente: consente di caricare facilmente il testo da un'ampia varietà di fonti (da database come Postgres ad API come Zendesk o GitHub, fino a fonti completamente personalizzate costruite utilizzando l'SDK o il costruttore di connettori visivi di Airbyte) e di indicizzarlo in forma incorporata in Milvus, un potente motore di ricerca vettoriale in grado di scalare su enormi quantità di dati.</p>
<p>Airbyte e Milvus sono open source e completamente gratuiti da utilizzare sulla vostra infrastruttura, con offerte cloud per scaricare le operazioni, se lo desiderate.</p>
<p>Oltre al classico caso d'uso della ricerca semantica illustrato in questo articolo, l'impostazione generale può essere utilizzata anche per costruire un chat bot in grado di rispondere alle domande utilizzando il metodo RAG (Retrieval Augmented Generation), sistemi di raccomandazione o contribuire a rendere la pubblicità più pertinente ed efficiente.</p>
