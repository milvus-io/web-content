---
id: build_RAG_with_milvus_and_feast.md
summary: >-
  In questa esercitazione, costruiremo una pipeline Retrieval-Augmented
  Generation (RAG) utilizzando Feast e Milvus. Feast è un archivio di funzioni
  open-source che semplifica la gestione delle funzioni per l'apprendimento
  automatico, consentendo l'archiviazione e il recupero efficiente di dati
  strutturati sia per l'addestramento che per l'inferenza in tempo reale. Milvus
  è un database vettoriale ad alte prestazioni progettato per una rapida ricerca
  di similarità, che lo rende ideale per il recupero di documenti rilevanti nei
  flussi di lavoro RAG.
title: Costruire RAG con Milvus e Feast
---
<h1 id="Build-RAG-with-Milvus-and-Feast" class="common-anchor-header">Costruire RAG con Milvus e Feast<button data-href="#Build-RAG-with-Milvus-and-Feast" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_feast.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_feast.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>In questa esercitazione, costruiremo una pipeline Retrieval-Augmented Generation (RAG) utilizzando <a href="https://github.com/feast-dev/feast">Feast</a> e <a href="https://milvus.io/">Milvus</a>. Feast è un archivio di funzioni open-source che semplifica la gestione delle funzioni per l'apprendimento automatico, consentendo l'archiviazione e il recupero efficiente di dati strutturati sia per l'addestramento che per l'inferenza in tempo reale. Milvus è un database vettoriale ad alte prestazioni progettato per una rapida ricerca di similarità, che lo rende ideale per il recupero di documenti rilevanti nei flussi di lavoro RAG.</p>
<p>In sostanza, utilizzeremo Feast per iniettare documenti e dati strutturati (cioè caratteristiche) nel contesto di un LLM (Large Language Model) per alimentare un'applicazione RAG (Retrieval Augmented Generation) con Milvus come database vettoriale online.</p>
<h1 id="Why-Feast" class="common-anchor-header">Perché Feast?<button data-href="#Why-Feast" class="anchor-icon" translate="no">
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
    </button></h1><p>Feast risolve diversi problemi comuni in questo flusso:</p>
<ol>
<li><strong>Recupero online:</strong> Al momento dell'inferenza, gli LLM hanno spesso bisogno di accedere a dati che non sono immediatamente disponibili e che devono essere precalcolati da altre fonti di dati.<ul>
<li>Feast gestisce il deployment su una serie di archivi online (ad esempio Milvus, DynamoDB, Redis, Google Cloud Datastore) e garantisce che le caratteristiche necessarie siano sempre <em>disponibili</em> e <em>appena calcolate</em> al momento dell'inferenza.</li>
</ul></li>
<li><strong>Ricerca vettoriale:</strong> Feast supporta la ricerca per similarità vettoriale, facilmente configurabile in modo dichiarativo, in modo che gli utenti possano concentrarsi sulle loro applicazioni. Milvus offre potenti ed efficienti funzionalità di ricerca per similarità vettoriale.</li>
<li><strong>Dati strutturati più ricchi:</strong> Oltre alla ricerca vettoriale, gli utenti possono interrogare campi strutturati standard da iniettare nel contesto LLM per migliorare l'esperienza dell'utente.</li>
<li><strong>Feature/Contesto e versioning:</strong> I diversi team di un'organizzazione spesso non sono in grado di riutilizzare i dati tra i vari progetti e servizi, con conseguente duplicazione della logica applicativa. I modelli hanno dipendenze dai dati che devono essere modificate, ad esempio quando si eseguono test A/B su versioni di modelli/prompt.<ul>
<li>Feast consente di scoprire e collaborare con documenti e funzionalità precedentemente utilizzati e permette la versioning di set di dati.</li>
</ul></li>
</ol>
<p>Si tratta di:</p>
<ol>
<li>Implementare un feature store locale con un <strong>archivio offline di file Parquet</strong> e un <strong>archivio online Milvus</strong>.</li>
<li>Scrivere/materializzare i dati (cioè i valori delle caratteristiche) dall'archivio offline (un file Parquet) all'archivio online (Milvus).</li>
<li>Servire le caratteristiche utilizzando l'SDK Feast con le funzionalità di ricerca vettoriale di Milvus.</li>
<li>Iniettare il documento nel contesto dell'LLM per rispondere alle domande.</li>
</ol>
<div class="alert note">
<p>Questo tutorial si basa sulla guida ufficiale all'integrazione di Milvus, disponibile nel <a href="https://github.com/feast-dev/feast/blob/master/examples/rag/milvus-quickstart.ipynb">repository di Feast</a>. Sebbene ci sforziamo di mantenere questo tutorial aggiornato, se doveste riscontrare delle discrepanze, fate riferimento alla guida ufficiale e sentitevi liberi di aprire un problema nel nostro repository per gli aggiornamenti necessari.</p>
</div>
<h2 id="Preparation" class="common-anchor-header">Preparazione<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies" class="common-anchor-header">Dipendenze</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install <span class="hljs-string">&#x27;feast[milvus]&#x27;</span> openai -U -q</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se si utilizza Google Colab, per abilitare le dipendenze appena installate potrebbe essere necessario <strong>riavviare il runtime</strong> (fare clic sul menu "Runtime" nella parte superiore dello schermo e selezionare "Riavvia sessione" dal menu a discesa).</p>
</div>
<p>Utilizzeremo OpenAI come provider LLM. È possibile accedere al suo sito web ufficiale e preparare <a href="https://platform.openai.com/api-keys">OPENAI_API_KEY</a> come variabile d'ambiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-**************&quot;</span>

llm_client = OpenAI(
    api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-Data" class="common-anchor-header">Preparare i dati<button data-href="#Prepare-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzeremo come esempio i dati contenuti nella seguente cartella:<br>
<a href="https://github.com/feast-dev/feast/tree/master/examples/rag/feature_repo">Feast RAG Feature Repo</a></p>
<p>Dopo aver scaricato i dati, troverete i seguenti file:</p>
<pre><code translate="no" class="language-bash">feature_repo/
│── data/                  <span class="hljs-comment"># Contains pre-processed Wikipedia city data in Parquet format</span>
│── example_repo.py        <span class="hljs-comment"># Defines feature views and entities for the city data</span>
│── feature_store.yaml     <span class="hljs-comment"># Configures Milvus and feature store settings</span>
│── test_workflow.py       <span class="hljs-comment"># Example workflow for Feast operations</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Key-Configuration-Files" class="common-anchor-header">File di configurazione delle chiavi</h3><h4 id="1-featurestoreyaml" class="common-anchor-header">1. feature_store.yaml</h4><p>Questo file configura l'infrastruttura del Feature Store:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">project:</span> <span class="hljs-string">rag</span>
<span class="hljs-attr">provider:</span> <span class="hljs-string">local</span>
<span class="hljs-attr">registry:</span> <span class="hljs-string">data/registry.db</span>

<span class="hljs-attr">online_store:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">milvus</span>            <span class="hljs-comment"># Uses Milvus for vector storage</span>
  <span class="hljs-attr">path:</span> <span class="hljs-string">data/online_store.db</span>
  <span class="hljs-attr">vector_enabled:</span> <span class="hljs-literal">true</span>    <span class="hljs-comment"># Enables vector similarity search</span>
  <span class="hljs-attr">embedding_dim:</span> <span class="hljs-number">384</span>      <span class="hljs-comment"># Dimension of our embeddings</span>
  <span class="hljs-attr">index_type:</span> <span class="hljs-string">&quot;FLAT&quot;</span>      <span class="hljs-comment"># Vector index type</span>
  <span class="hljs-attr">metric_type:</span> <span class="hljs-string">&quot;COSINE&quot;</span>   <span class="hljs-comment"># Similarity metric</span>

<span class="hljs-attr">offline_store:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">file</span>              <span class="hljs-comment"># Uses file-based offline storage</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questa configurazione stabilisce che:</p>
<ul>
<li>Milvus come archivio online per il recupero rapido dei vettori</li>
<li>Archiviazione offline basata su file per l'elaborazione dei dati storici</li>
<li>Capacità di ricerca vettoriale con similarità COSINE</li>
</ul>
<h4 id="2-examplerepopy" class="common-anchor-header">2. esempio_repo.py</h4><p>Contiene le definizioni delle caratteristiche per i dati delle città, tra cui:</p>
<ul>
<li>Definizioni di entità per le città</li>
<li>Viste delle caratteristiche per le informazioni sulla città e le incorporazioni</li>
<li>Specifiche dello schema per il database vettoriale</li>
</ul>
<h4 id="3-Data-Directory" class="common-anchor-header">3. Elenco dei dati</h4><p>Contiene i dati preelaborati delle città di Wikipedia con:</p>
<ul>
<li>Descrizioni e sommari delle città</li>
<li>Incorporamenti precalcolati (vettori a 384 dimensioni)</li>
<li>Metadati associati, come nomi di città e stati.</li>
</ul>
<p>Questi file lavorano insieme per creare un archivio di caratteristiche che combina le capacità di ricerca vettoriale di Milvus con la gestione delle caratteristiche di Feast, consentendo un recupero efficiente delle informazioni rilevanti sulle città per la nostra applicazione RAG.</p>
<h2 id="Inspect-the-Data" class="common-anchor-header">Ispezione dei dati<button data-href="#Inspect-the-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>I dati grezzi delle caratteristiche che abbiamo in questa demo sono memorizzati in un file parquet locale. Il set di dati è costituito da sommari di Wikipedia di diverse città. Per prima cosa, esaminiamo i dati.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

df = pd.read_parquet(
    <span class="hljs-string">&quot;/path/to/feature_repo/data/city_wikipedia_summaries_with_embeddings.parquet&quot;</span>
)
df[<span class="hljs-string">&quot;vector&quot;</span>] = df[<span class="hljs-string">&quot;vector&quot;</span>].apply(<span class="hljs-keyword">lambda</span> x: x.tolist())
embedding_length = <span class="hljs-built_in">len</span>(df[<span class="hljs-string">&quot;vector&quot;</span>][<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;embedding length = <span class="hljs-subst">{embedding_length}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">embedding length = 384
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display

display(df.head())
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { vertical-align: middle; }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>voce_id</th>
      <th>data_ora_evento</th>
      <th>stato</th>
      <th>wiki_riassunto</th>
      <th>pezzi_di_frase</th>
      <th>vettore</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>[0.1465730518102646, -0.07317650318145752, 0.0...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>La città comprende cinque distretti, ognuno dei quali...</td>
      <td>[0.05218901485204697, -0.08449874818325043, 0....</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>2</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>New York è un centro mondiale della finanza e del com...</td>
      <td>[0.06769222766160965, -0.07371102273464203, -0...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>3</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>La città di New York è l'epicentro del mondo ...</td>
      <td>[0.12095861881971359, -0.04279915615916252, 0....</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>4</td>
      <td>2025-01-09 13:36:59.280589</td>
      <td>New York, New York</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>Con una popolazione stimata di 8.335 abitanti nel 2022,...</td>
      <td>[0.17943550646305084, -0.09458263963460922, 0....</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Register-Feature-Definitions-and-Deploy-the-Feature-Store" class="common-anchor-header">Registrare le definizioni delle funzioni e distribuire il Feature Store<button data-href="#Register-Feature-Definitions-and-Deploy-the-Feature-Store" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver scaricato <code translate="no">feature_repo</code>, è necessario eseguire <code translate="no">feast apply</code> per registrare le feature view e le entità definite in <code translate="no">example_repo.py</code> e impostare <strong>Milvus</strong> come tabelle del negozio online.</p>
<p>Assicurarsi di essersi collegati alla directory <code translate="no">feature_repo</code> prima di eseguire il comando.</p>
<pre><code translate="no" class="language-bash">feast apply
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Features-into-Milvus" class="common-anchor-header">Caricare le caratteristiche in Milvus<button data-href="#Load-Features-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Ora carichiamo le caratteristiche in Milvus. Questa fase prevede la serializzazione dei valori delle caratteristiche dall'archivio offline e la loro scrittura in Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime
<span class="hljs-keyword">from</span> feast <span class="hljs-keyword">import</span> FeatureStore
<span class="hljs-keyword">import</span> warnings

warnings.filterwarnings(<span class="hljs-string">&quot;ignore&quot;</span>)

store = FeatureStore(repo_path=<span class="hljs-string">&quot;/path/to/feature_repo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">store.write_to_online_store(feature_view_name=<span class="hljs-string">&quot;city_embeddings&quot;</span>, df=df)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Connecting to Milvus in local mode using /Users/jinhonglin/Desktop/feature_repo/data/online_store.db
</code></pre>
<p>Si noti che ora ci sono <code translate="no">online_store.db</code> e <code translate="no">registry.db</code>, che memorizzano rispettivamente le caratteristiche materializzate e le informazioni sullo schema. Possiamo dare un'occhiata al file <code translate="no">online_store.db</code>.</p>
<pre><code translate="no" class="language-python">pymilvus_client = store._provider._online_store._connect(store.config)
COLLECTION_NAME = pymilvus_client.list_collections()[<span class="hljs-number">0</span>]

milvus_query_result = pymilvus_client.query(
    collection_name=COLLECTION_NAME,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;item_id == &#x27;0&#x27;&quot;</span>,
)
pd.DataFrame(milvus_query_result[<span class="hljs-number">0</span>]).head()
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { vertical-align: middle; }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>item_id_pk</th>
      <th>creato_ts</th>
      <th>evento_ts</th>
      <th>articolo_id</th>
      <th>pezzi_di_frase</th>
      <th>stato</th>
      <th>vettore</th>
      <th>wiki_sommario</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>New York, New York</td>
      <td>0.146573</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>New York, New York</td>
      <td>-0.073177</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>New York, New York</td>
      <td>0.052114</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>New York, New York</td>
      <td>0.033187</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0100000002000000070000006974656d5f696404000000...</td>
      <td>0</td>
      <td>1736447819280589</td>
      <td>0</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>New York, New York</td>
      <td>0.012013</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Build-RAG" class="common-anchor-header">Costruire RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Embedding-a-Query-Using-PyTorch-and-Sentence-Transformers" class="common-anchor-header">1. Incorporare una query usando PyTorch e i trasformatori di frasi</h3><p>Durante l'inferenza (ad esempio, quando un utente invia un messaggio di chat) è necessario incorporare il testo in ingresso. Questa operazione può essere considerata come una trasformazione dei dati in ingresso. In questo esempio, lo faremo con un piccolo trasformatore di frasi di Hugging Face.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">import</span> torch.nn.functional <span class="hljs-keyword">as</span> F
<span class="hljs-keyword">from</span> feast <span class="hljs-keyword">import</span> FeatureStore
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, FieldSchema
<span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoTokenizer, AutoModel
<span class="hljs-keyword">from</span> example_repo <span class="hljs-keyword">import</span> city_embeddings_feature_view, item

TOKENIZER = <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>
MODEL = <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">mean_pooling</span>(<span class="hljs-params">model_output, attention_mask</span>):
    token_embeddings = model_output[
        <span class="hljs-number">0</span>
    ]  <span class="hljs-comment"># First element of model_output contains all token embeddings</span>
    input_mask_expanded = (
        attention_mask.unsqueeze(-<span class="hljs-number">1</span>).expand(token_embeddings.size()).<span class="hljs-built_in">float</span>()
    )
    <span class="hljs-keyword">return</span> torch.<span class="hljs-built_in">sum</span>(token_embeddings * input_mask_expanded, <span class="hljs-number">1</span>) / torch.clamp(
        input_mask_expanded.<span class="hljs-built_in">sum</span>(<span class="hljs-number">1</span>), <span class="hljs-built_in">min</span>=<span class="hljs-number">1e-9</span>
    )


<span class="hljs-keyword">def</span> <span class="hljs-title function_">run_model</span>(<span class="hljs-params">sentences, tokenizer, model</span>):
    encoded_input = tokenizer(
        sentences, padding=<span class="hljs-literal">True</span>, truncation=<span class="hljs-literal">True</span>, return_tensors=<span class="hljs-string">&quot;pt&quot;</span>
    )
    <span class="hljs-comment"># Compute token embeddings</span>
    <span class="hljs-keyword">with</span> torch.no_grad():
        model_output = model(**encoded_input)

    sentence_embeddings = mean_pooling(model_output, encoded_input[<span class="hljs-string">&quot;attention_mask&quot;</span>])
    sentence_embeddings = F.normalize(sentence_embeddings, p=<span class="hljs-number">2</span>, dim=<span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> sentence_embeddings
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Fetching-Real-time-Vectors-and-Data-for-Online-Inference" class="common-anchor-header">2. Recuperare vettori e dati in tempo reale per l'inferenza online</h3><p>Una volta trasformata la query in un embedding, il passo successivo consiste nel recuperare i documenti rilevanti dall'archivio vettoriale. Al momento dell'inferenza, sfruttiamo la ricerca di somiglianza vettoriale per trovare gli incorporamenti di documenti più rilevanti memorizzati nell'archivio di caratteristiche online, utilizzando <code translate="no">retrieve_online_documents_v2()</code>. Questi vettori di caratteristiche possono essere inseriti nel contesto dell'LLM.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;Which city has the largest population in New York?&quot;</span>

tokenizer = AutoTokenizer.from_pretrained(TOKENIZER)
model = AutoModel.from_pretrained(MODEL)
query_embedding = run_model(question, tokenizer, model)
query = query_embedding.detach().cpu().numpy().tolist()[<span class="hljs-number">0</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display

<span class="hljs-comment"># Retrieve top k documents</span>
context_data = store.retrieve_online_documents_v2(
    features=[
        <span class="hljs-string">&quot;city_embeddings:vector&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:item_id&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:state&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:sentence_chunks&quot;</span>,
        <span class="hljs-string">&quot;city_embeddings:wiki_summary&quot;</span>,
    ],
    query=query,
    top_k=<span class="hljs-number">3</span>,
    distance_metric=<span class="hljs-string">&quot;COSINE&quot;</span>,
).to_df()
display(context_data)
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { vertical-align: middle; }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>vettore</th>
      <th>elemento_id</th>
      <th>stato</th>
      <th>pezzi_di_frase</th>
      <th>wiki_riassunto</th>
      <th>distanza</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>0</td>
      <td>New York, New York</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>0.743023</td>
    </tr>
    <tr>
      <th>1</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>6</td>
      <td>New York, New York</td>
      <td>New York è la città geografica e demografica...</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>0.739733</td>
    </tr>
    <tr>
      <th>2</th>
      <td>[0.15548758208751678, -0.08017724752426147, -0...</td>
      <td>7</td>
      <td>New York, New York</td>
      <td>Con oltre 20,1 milioni di abitanti nel suo metr...</td>
      <td>New York, spesso chiamata New York City o semplicemente...</td>
      <td>0.728218</td>
    </tr>
  </tbody>
</table>
</div>
<h3 id="3-Formatting-Retrieved-Documents-for-RAG-Context" class="common-anchor-header">3. Formattazione dei documenti recuperati per il contesto RAG</h3><p>Dopo aver recuperato i documenti rilevanti, è necessario formattare i dati in un contesto strutturato che possa essere utilizzato in modo efficiente nelle applicazioni a valle. Questa fase garantisce che le informazioni estratte siano pulite, organizzate e pronte per essere integrate nella pipeline RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_documents</span>(<span class="hljs-params">context_df</span>):
    output_context = <span class="hljs-string">&quot;&quot;</span>
    unique_documents = context_df.drop_duplicates().apply(
        <span class="hljs-keyword">lambda</span> x: <span class="hljs-string">&quot;City &amp; State = {&quot;</span>
        + x[<span class="hljs-string">&quot;state&quot;</span>]
        + <span class="hljs-string">&quot;}\nSummary = {&quot;</span>
        + x[<span class="hljs-string">&quot;wiki_summary&quot;</span>].strip()
        + <span class="hljs-string">&quot;}&quot;</span>,
        axis=<span class="hljs-number">1</span>,
    )
    <span class="hljs-keyword">for</span> i, document_text <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(unique_documents):
        output_context += <span class="hljs-string">f&quot;****START DOCUMENT <span class="hljs-subst">{i}</span>****\n<span class="hljs-subst">{document_text.strip()}</span>\n****END DOCUMENT <span class="hljs-subst">{i}</span>****&quot;</span>
    <span class="hljs-keyword">return</span> output_context


RAG_CONTEXT = format_documents(context_data[[<span class="hljs-string">&quot;state&quot;</span>, <span class="hljs-string">&quot;wiki_summary&quot;</span>]])
<span class="hljs-built_in">print</span>(RAG_CONTEXT)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">****START DOCUMENT 0****
City &amp; State = {New York, New York}
Summary = {New York, often called New York City or simply NYC, is the most populous city in the United States, located at the southern tip of New York State on one of the world's largest natural harbors. The city comprises five boroughs, each of which is coextensive with a respective county. New York is a global center of finance and commerce, culture and technology, entertainment and media, academics and scientific output, and the arts and fashion, and, as home to the headquarters of the United Nations, is an important center for international diplomacy. New York City is the epicenter of the world's principal metropolitan economy.
With an estimated population in 2022 of 8,335,897 distributed over 300.46 square miles (778.2 km2), the city is the most densely populated major city in the United States. New York has more than double the population of Los Angeles, the nation's second-most populous city. New York is the geographical and demographic center of both the Northeast megalopolis and the New York metropolitan area, the largest metropolitan area in the U.S. by both population and urban area. With more than 20.1 million people in its metropolitan statistical area and 23.5 million in its combined statistical area as of 2020, New York City is one of the world's most populous megacities. The city and its metropolitan area are the premier gateway for legal immigration to the United States. As many as 800 languages are spoken in New York, making it the most linguistically diverse city in the world. In 2021, the city was home to nearly 3.1 million residents born outside the U.S., the largest foreign-born population of any city in the world.
New York City traces its origins to Fort Amsterdam and a trading post founded on the southern tip of Manhattan Island by Dutch colonists in approximately 1624. The settlement was named New Amsterdam (Dutch: Nieuw Amsterdam) in 1626 and was chartered as a city in 1653. The city came under English control in 1664 and was temporarily renamed New York after King Charles II granted the lands to his brother, the Duke of York. before being permanently renamed New York in November 1674. New York City was the capital of the United States from 1785 until 1790. The modern city was formed by the 1898 consolidation of its five boroughs: Manhattan, Brooklyn, Queens, The Bronx, and Staten Island, and has been the largest U.S. city ever since.
Anchored by Wall Street in the Financial District of Lower Manhattan, New York City has been called both the world's premier financial and fintech center and the most economically powerful city in the world. As of 2022, the New York metropolitan area is the largest metropolitan economy in the world with a gross metropolitan product of over US$2.16 trillion. If the New York metropolitan area were its own country, it would have the tenth-largest economy in the world. The city is home to the world's two largest stock exchanges by market capitalization of their listed companies: the New York Stock Exchange and Nasdaq. New York City is an established safe haven for global investors. As of 2023, New York City is the most expensive city in the world for expatriates to live. New York City is home to the highest number of billionaires, individuals of ultra-high net worth (greater than US$30 million), and millionaires of any city in the world.}
****END DOCUMENT 0****
</code></pre>
<h3 id="4-Generating-Responses-Using-Retrieved-Context" class="common-anchor-header">4. Generare risposte utilizzando il contesto recuperato</h3><p>Ora che abbiamo formattato i documenti recuperati, possiamo integrarli in un prompt strutturato per la generazione delle risposte. Questa fase garantisce che l'assistente si basi solo sulle informazioni recuperate ed eviti di generare risposte allucinanti.</p>
<pre><code translate="no" class="language-python">FULL_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
You are an assistant for answering questions about states. You will be provided documentation from Wikipedia. Provide a conversational answer.
If you don&#x27;t know the answer, just say &quot;I do not know.&quot; Don&#x27;t make up an answer.

Here are document(s) you should use when answer the users question:
<span class="hljs-subst">{RAG_CONTEXT}</span>
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: FULL_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: question},
    ],
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>.join([c.message.content <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> response.choices]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The city with the largest population in New York is New York City itself, often referred to as NYC. It is the most populous city in the United States, with an estimated population of about 8.3 million in 2022.
</code></pre>
