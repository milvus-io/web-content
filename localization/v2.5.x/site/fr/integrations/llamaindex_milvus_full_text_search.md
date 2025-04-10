---
id: llamaindex_milvus_full_text_search.md
title: Utilisation de la recherche plein texte avec LlamaIndex et Milvus
related_key: LlamaIndex
summary: >-
  Dans ce tutoriel, vous apprendrez à utiliser LlamaIndex et Milvus pour
  construire un système RAG utilisant la recherche plein texte et la recherche
  hybride. Nous commencerons par mettre en œuvre la recherche en texte intégral
  seule, puis nous l'améliorerons en intégrant la recherche sémantique pour
  obtenir des résultats plus complets.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">Utilisation de la recherche plein texte avec LlamaIndex et Milvus<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>La<strong>recherche plein texte</strong> utilise la correspondance exacte des mots-clés, en s'appuyant souvent sur des algorithmes tels que BM25 pour classer les documents en fonction de leur pertinence. Dans les systèmes <strong>RAG (Retrieval-Augmented Generation)</strong>, cette méthode permet d'extraire du texte pertinent afin d'améliorer les réponses générées par l'IA.</p>
<p>Parallèlement, la <strong>recherche sémantique</strong> interprète le sens du contexte pour fournir des résultats plus larges. La combinaison des deux approches crée une <strong>recherche hybride</strong> qui améliore la recherche d'informations, en particulier dans les cas où une seule méthode ne suffit pas.</p>
<p>Avec l'approche Sparse-BM25 de <a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a>, le texte brut est automatiquement converti en vecteurs épars. Cela élimine la nécessité de générer manuellement des vecteurs épars et permet une stratégie de recherche hybride qui équilibre la compréhension sémantique et la pertinence des mots clés.</p>
<p>Dans ce tutoriel, vous apprendrez à utiliser LlamaIndex et Milvus pour construire un système RAG utilisant la recherche plein texte et la recherche hybride. Nous commencerons par mettre en œuvre la recherche en texte intégral seule, puis nous l'améliorerons en intégrant la recherche sémantique pour obtenir des résultats plus complets.</p>
<blockquote>
<p>Avant de poursuivre ce tutoriel, assurez-vous d'être familier avec la <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">recherche plein texte</a> et les <a href="https://milvus.io/docs/integrate_with_llamaindex.md">bases de l'utilisation de Milvus dans LlamaIndex</a>.</p>
</blockquote>
<h2 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Installer les dépendances</strong></p>
<p>Avant de commencer, assurez-vous que les dépendances suivantes sont installées :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Si vous utilisez Google Colab, il se peut que vous deviez <strong>redémarrer le runtime</strong> (Naviguez vers le menu "Runtime" en haut de l'interface, et sélectionnez "Restart session" dans le menu déroulant).</p>
</blockquote>
</div>
<p><strong>Configurer les comptes</strong></p>
<p>Ce tutoriel utilise OpenAI pour l'intégration de texte et la génération de réponses. Vous devez préparer la <a href="https://platform.openai.com/api-keys">clé API OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour utiliser le magasin de vecteurs Milvus, indiquez votre serveur Milvus <code translate="no">URI</code> (et éventuellement <code translate="no">TOKEN</code>). Pour démarrer un serveur Milvus, vous pouvez le configurer en suivant le <a href="https://milvus.io/docs/install-overview.md">guide d'installation Milvus</a> ou simplement en essayant gratuitement <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a>.</p>
<blockquote>
<p>La recherche en texte intégral est actuellement prise en charge dans Milvus Standalone, Milvus Distributed et Zilliz Cloud, mais pas encore dans Milvus Lite (prévu pour une mise en œuvre future). Contactez support@zilliz.com pour plus d'informations.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Télécharger des données d'exemple</strong></p>
<p>Exécutez les commandes suivantes pour télécharger des exemples de documents dans le répertoire "data/paul_graham" :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$wget</span> <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">--2025-03-27 07:49:01--  https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.108.133, 185.199.109.133, 185.199.110.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.108.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 75042 (73K) [text/plain]
Saving to: ‘data/paul_graham/paul_graham_essay.txt’

data/paul_graham/pa 100%[===================&gt;]  73.28K  --.-KB/s    in 0.07s   

2025-03-27 07:49:01 (1.01 MB/s) - ‘data/paul_graham/paul_graham_essay.txt’ saved [75042/75042]
</code></pre>
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">RAG avec recherche en texte intégral<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>L'intégration de la recherche plein texte dans un système RAG permet d'équilibrer la recherche sémantique et la recherche précise et prévisible par mot-clé. Vous pouvez également choisir de n'utiliser que la recherche plein texte, bien qu'il soit recommandé de combiner la recherche plein texte avec la recherche sémantique pour obtenir de meilleurs résultats de recherche. À des fins de démonstration, nous présenterons ici la recherche en texte intégral seule et la recherche hybride.</p>
<p>Pour commencer, utilisez <code translate="no">SimpleDirectoryReaderLoad</code> pour charger l'essai "What I Worked On" de Paul Graham :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: 16b7942f-bf1a-4197-85e1-f31d51ea25a9
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">Recherche plein texte avec BM25</h3><p>Le site <code translate="no">MilvusVectorStore</code> de LlamaIndex prend en charge la recherche plein texte, ce qui permet une recherche efficace par mot-clé. En utilisant une fonction intégrée comme <code translate="no">sparse_embedding_function</code>, il applique la notation BM25 pour classer les résultats de la recherche.</p>
<p>Dans cette section, nous allons montrer comment mettre en œuvre un système RAG utilisant BM25 pour la recherche en texte intégral.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings

<span class="hljs-comment"># Skip dense embedding model</span>
Settings.embed_model = <span class="hljs-literal">None</span>

<span class="hljs-comment"># Build Milvus vector store creating a new collection</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    enable_dense=<span class="hljs-literal">False</span>,
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Only enable sparse to demo full text search</span>
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Store documents in Milvus</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Embeddings have been explicitly disabled. Using MockEmbedding.
</code></pre>
<p>Le code ci-dessus insère des documents d'exemple dans Milvus et construit un index pour permettre le classement BM25 pour la recherche en texte intégral. Il désactive l'intégration dense et utilise <code translate="no">BM25BuiltInFunction</code> avec les paramètres par défaut.</p>
<p>Vous pouvez spécifier les champs d'entrée et de sortie dans les paramètres <code translate="no">BM25BuiltInFunction</code>:</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: Le champ texte d'entrée (par défaut : "text"). Il indique le champ de texte auquel l'algorithme BM25 s'applique. Modifiez ce paramètre si vous utilisez votre propre collection avec un nom de champ de texte différent.</li>
<li><code translate="no">output_field_names (str)</code>: Le champ dans lequel les sorties de cette fonction BM25 sont stockées (par défaut : "sparse_embedding").</li>
</ul>
<p>Une fois le magasin de vecteurs configuré, vous pouvez effectuer des recherches en texte intégral à l'aide de Milvus avec le mode de requête "sparse" ou "text_search" :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;sparse&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. They learned about the importance of growth
rate as the ultimate test of a startup, the value of building stores for users to understand retail
and software usability, and the significance of being the &quot;entry level&quot; option in a market.
Additionally, they discovered the accidental success of making Viaweb inexpensive, the challenges of
hiring too many people, and the relief felt when the company was acquired by Yahoo.
</code></pre>
<h4 id="Customize-text-analyzer" class="common-anchor-header">Personnaliser l'analyseur de texte</h4><p>Les analyseurs jouent un rôle essentiel dans la recherche en texte intégral en décomposant les phrases en tokens et en effectuant un traitement lexical, tel que le stemming et la suppression des mots vides. Ils sont généralement spécifiques à une langue. Pour plus de détails, voir le <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Guide de l'analyseur Milvus</a>.</p>
<p>Milvus prend en charge deux types d'analyseurs : Les <strong>analyseurs intégrés</strong> et les <strong>analyseurs personnalisés</strong>. Par défaut, le site <code translate="no">BM25BuiltInFunction</code> utilise l'analyseur intégré standard, qui génère des jetons dans le texte en fonction de la ponctuation.</p>
<p>Pour utiliser un autre analyseur ou personnaliser l'analyseur existant, vous pouvez donner une valeur à l'argument <code translate="no">analyzer_params</code>:</p>
<pre><code translate="no" class="language-python">bm25_function = BM25BuiltInFunction(
    analyzer_params={
        <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom cap size of a single token</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom stopwords</span>
        ],
    },
    enable_match=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">Recherche hybride avec Reranker</h3><p>Un système de recherche hybride combine la recherche sémantique et la recherche en texte intégral, optimisant ainsi les performances de recherche dans un système RAG.</p>
<p>L'exemple suivant utilise l'intégration OpenAI pour la recherche sémantique et BM25 pour la recherche en texte intégral :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index over the documnts</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    <span class="hljs-comment"># enable_dense=True,  # enable_dense defaults to True</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># hybrid_ranker=&quot;RRFRanker&quot;,  # hybrid_ranker defaults to &quot;RRFRanker&quot;</span>
    <span class="hljs-comment"># hybrid_ranker_params={},  # hybrid_ranker_params defaults to {}</span>
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=<span class="hljs-string">&quot;default&quot;</span>,  <span class="hljs-comment"># &quot;default&quot; will use OpenAI embedding</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Fonctionnement</strong></p>
<p>Cette approche stocke les documents dans une collection Milvus avec les deux champs vectoriels :</p>
<ul>
<li><code translate="no">embedding</code>: les encastrements denses générés par le modèle d'encastrement d'OpenAI pour la recherche sémantique.</li>
<li><code translate="no">sparse_embedding</code>: les encastrements épars calculés à l'aide de BM25BuiltInFunction pour la recherche en texte intégral.</li>
</ul>
<p>En outre, nous avons appliqué une stratégie de reranking en utilisant "RRFRanker" avec ses paramètres par défaut. Pour personnaliser le reranker, vous pouvez configurer <code translate="no">hybrid_ranker</code> et <code translate="no">hybrid_ranker_params</code> en suivant le <a href="https://milvus.io/docs/reranking.md">Milvus Reranking Guide.</a></p>
<p>Testons maintenant le système RAG avec un exemple de requête :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. These included the importance of
understanding growth rate as the ultimate test of a startup, the impact of hiring too many people,
the challenges of being at the mercy of investors, and the relief experienced when Yahoo bought the
company. Additionally, the author learned about the significance of user feedback, the value of
building stores for users, and the realization that growth rate is crucial for the long-term success
of a startup.
</code></pre>
<p>Cette approche hybride garantit des réponses plus précises et contextuelles dans un système RAG en tirant parti de la recherche sémantique et de la recherche par mot-clé.</p>
