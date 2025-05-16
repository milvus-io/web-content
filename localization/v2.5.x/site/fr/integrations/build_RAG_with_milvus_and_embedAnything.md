---
id: build_RAG_with_milvus_and_embedAnything.md
summary: >-
  Dans ce tutoriel, nous allons montrer comment construire un pipeline de
  Génération Assistée par Récupération (RAG) en utilisant EmbedAnything avec
  Milvus. Plutôt que de se coupler étroitement à une base de données spécifique,
  EmbedAnything utilise un système d'adaptateurs enfichables. Les adaptateurs
  servent d'enveloppes qui définissent comment les embeddings sont formatés,
  indexés et stockés dans le magasin vectoriel cible.
title: Construire RAG avec Milvus et EmbedAnything
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_embedAnything.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_embedAnything.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Building-RAG-with-Milvus-and-EmbedAnything" class="common-anchor-header">Construire RAG avec Milvus et EmbedAnything<button data-href="#Building-RAG-with-Milvus-and-EmbedAnything" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/StarlightSearch/EmbedAnything">EmbedAnything</a> est un pipeline d'intégration ultrarapide et léger construit en Rust qui prend en charge le texte, les PDF, les images, l'audio et bien plus encore.</p>
<p>Dans ce tutoriel, nous allons montrer comment construire un pipeline de Génération Assistée par Récupération (RAG) en utilisant EmbedAnything avec <a href="https://milvus.io">Milvus</a>. Plutôt que de se coupler étroitement à une base de données spécifique, EmbedAnything utilise un système d'<strong>adaptateurs</strong> enfichables - les adaptateurs servent d'enveloppes qui définissent comment les embeddings sont formatés, indexés et stockés dans le magasin vectoriel cible.</p>
<p>En associant EmbedAnything à un adaptateur Milvus, vous pouvez générer des embeddings à partir de divers types de fichiers et les stocker efficacement dans Milvus en quelques lignes de code seulement.</p>
<blockquote>
<p>⚠️ Note : Bien que l'adaptateur de EmbedAnything gère l'insertion dans Milvus, il ne prend pas en charge la recherche dès le départ. Pour construire un pipeline RAG complet, vous devrez également instancier un MilvusClient séparément et mettre en œuvre la logique d'extraction (par exemple, la recherche de similarité sur les vecteurs) dans le cadre de votre application.</p>
</blockquote>
<h2 id="Preparation" class="common-anchor-header">Préparation<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">Dépendances et environnement</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -qU pymilvus openai embed_anything</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si vous utilisez Google Colab, pour activer les dépendances qui viennent d'être installées, vous devrez peut-être <strong>redémarrer le runtime</strong> (cliquez sur le menu "Runtime" en haut de l'écran, et sélectionnez "Restart session" dans le menu déroulant).</p>
</div>
<h3 id="Clone-the-Repository-and-Load-Adapter" class="common-anchor-header">Cloner le référentiel et charger l'adaptateur</h3><p>Ensuite, nous allons cloner le repo <a href="https://github.com/StarlightSearch/EmbedAnything">EmbedAnything</a> et ajouter le répertoire <code translate="no">examples/adapters</code> au chemin Python. C'est là que nous stockons l'implémentation de l'adaptateur Milvus personnalisé, qui permet à EmbedAnything de communiquer avec Milvus pour l'insertion de vecteurs.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> sys

<span class="hljs-comment"># Clone the EmbedAnything repository if not already cloned</span>
![ -d <span class="hljs-string">&quot;EmbedAnything&quot;</span> ] || git clone https://github.com/StarlightSearch/EmbedAnything.git

<span class="hljs-comment"># Add the `examples/adapters` directory to the Python path</span>
sys.path.append(<span class="hljs-string">&quot;EmbedAnything/examples/adapters&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;✅ EmbedAnything cloned and adapter path added.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">✅ EmbedAnything cloned and adapter path added.
</code></pre>
<p>Nous utiliserons OpenAI comme LLM dans ce pipeline RAG. Vous devez préparer la <a href="https://platform.openai.com/docs/quickstart">clé api</a> <code translate="no">OPENAI_API_KEY</code> en tant que variable d'environnement.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>

openai_client = OpenAI()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">Construire RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Initialize-Milvus" class="common-anchor-header">Initialiser Milvus</h3><p>Avant d'intégrer des fichiers, nous devons préparer deux composants qui interagissent avec Milvus :</p>
<ol>
<li><code translate="no">MilvusVectorAdapter</code> - Il s'agit de l'adaptateur Milvus pour EmbedAnything, utilisé <strong>uniquement pour l'ingestion de vecteurs</strong> (c'est-à-dire l'insertion d'embeddings et la création d'index). Il <strong>ne</strong> prend actuellement <strong>pas</strong> en charge les opérations de recherche.</li>
<li><code translate="no">MilvusClient</code> - Il s'agit du client officiel de <code translate="no">pymilvus</code>, qui permet un <strong>accès complet</strong> aux fonctionnalités de Milvus, notamment la recherche vectorielle, le filtrage et la gestion des collections.</li>
</ol>
<p>Pour éviter toute confusion :</p>
<ul>
<li>Considérez <code translate="no">MilvusVectorAdapter</code> comme votre outil de stockage de vecteurs en "écriture seule".</li>
<li>Pensez à <code translate="no">MilvusClient</code> comme votre moteur de "lecture et de recherche" pour effectuer des requêtes et récupérer des documents pour le RAG.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> embed_anything
<span class="hljs-keyword">from</span> embed_anything <span class="hljs-keyword">import</span> (
    WhichModel,
    EmbeddingModel,
)
<span class="hljs-keyword">from</span> milvus_db <span class="hljs-keyword">import</span> MilvusVectorAdapter
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Official Milvus client for full operations</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>, token=<span class="hljs-string">&quot;&quot;</span>)

<span class="hljs-comment"># EmbedAnything adapter for pushing embeddings into Milvus</span>
index_name = <span class="hljs-string">&quot;embed_anything_milvus_collection&quot;</span>
milvus_adapter = MilvusVectorAdapter(
    uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>, token=<span class="hljs-string">&quot;&quot;</span>, collection_name=index_name
)

<span class="hljs-comment"># Delete existing collection if it exists</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(index_name):
    milvus_client.drop_collection(index_name)

<span class="hljs-comment"># Create a new collection with dimension matching the embedding model later used</span>
milvus_adapter.create_index(dimension=<span class="hljs-number">384</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Ok - Milvus DB connection established.
Collection 'embed_anything_milvus_collection' created with index.
</code></pre>
<div class="alert note">
<p>En ce qui concerne l'argument de <code translate="no">MilvusVectorAdapter</code> et <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Définir <code translate="no">uri</code> comme un fichier local, par exemple<code translate="no">./milvus.db</code>, est la méthode la plus pratique, car elle utilise automatiquement <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> pour stocker toutes les données dans ce fichier.</li>
<li>Si vous avez des données à grande échelle, par exemple plus d'un million de vecteurs, vous pouvez configurer un serveur Milvus plus performant sur <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>. Dans cette configuration, veuillez utiliser l'adresse et le port du serveur comme uri, par exemple<code translate="no">http://localhost:19530</code>. Si vous activez la fonction d'authentification sur Milvus, utilisez "<your_username>:<your_password>" comme jeton, sinon ne définissez pas le jeton.</li>
<li>Si vous souhaitez utiliser <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service en nuage entièrement géré pour Milvus, ajustez les valeurs <code translate="no">uri</code> et <code translate="no">token</code>, qui correspondent au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">point de terminaison public et à la clé Api</a> dans Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Initialize-Embedding-Model-and-Embed-PDF-Document" class="common-anchor-header">Initialisation du modèle d'intégration et intégration du document PDF</h3><p>Nous allons maintenant initialiser le modèle d'intégration. Nous utiliserons le modèle <code translate="no">all-MiniLM-L12-v2 model</code> de la bibliothèque sentence-transformers, qui est un modèle léger mais puissant pour générer des embeddings de texte. Il produit des encastrements à 384 dimensions, ce qui correspond à la dimension de notre collection Milvus, fixée à 384. Cet alignement est crucial et assure la compatibilité entre les dimensions vectorielles stockées dans Milvus et celles générées par le modèle.</p>
<p>EmbedAnything prend en charge beaucoup plus de modèles d'intégration. Pour plus de détails, veuillez vous référer à la <a href="https://github.com/StarlightSearch/EmbedAnything">documentation officielle</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the embedding model</span>
model = EmbeddingModel.from_pretrained_hf(
    WhichModel.Bert, model_id=<span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L12-v2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Maintenant, incorporons un fichier PDF. EmbedAnything facilite le traitement des documents PDF (et bien d'autres) et le stockage de leurs incorporations directement dans Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Embed a PDF file</span>
data = embed_anything.embed_file(
    <span class="hljs-string">&quot;./pdf_files/WhatisMilvus.pdf&quot;</span>,
    embedder=model,
    adapter=milvus_adapter,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Converted 12 embeddings for insertion.
Successfully inserted 12 embeddings.
</code></pre>
<h3 id="Retrieve-and-Generate-Response" class="common-anchor-header">Récupérer et générer une réponse</h3><p>Encore une fois, le site <code translate="no">MilvusVectorAdapter</code> d'EmbedAnything est actuellement une abstraction légère pour l'ingestion et l'indexation de vecteurs uniquement. Elle <strong>ne prend pas en charge les</strong> requêtes de recherche ou d'extraction. Par conséquent, pour rechercher des documents pertinents afin de construire notre pipeline RAG, nous devons utiliser directement l'instance <code translate="no">MilvusClient</code> (<code translate="no">milvus_client</code>) pour interroger notre magasin de vecteurs Milvus.</p>
<p>Définir une fonction pour récupérer les documents pertinents de Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_documents</span>(<span class="hljs-params">question, top_k=<span class="hljs-number">3</span></span>):
    query_vector = <span class="hljs-built_in">list</span>(
        embed_anything.embed_query([question], embedder=model)[<span class="hljs-number">0</span>].embedding
    )
    search_res = milvus_client.search(
        collection_name=index_name,
        data=[query_vector],
        limit=top_k,
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    )
    docs = [(res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]]
    <span class="hljs-keyword">return</span> docs
<button class="copy-code-btn"></button></code></pre>
<p>Définir une fonction pour générer une réponse en utilisant les documents récupérés dans le pipeline RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_rag_response</span>(<span class="hljs-params">question</span>):
    retrieved_docs = retrieve_documents(question)
    context = <span class="hljs-string">&quot;\n&quot;</span>.join([<span class="hljs-string">f&quot;Text: <span class="hljs-subst">{doc[<span class="hljs-number">0</span>]}</span>\n&quot;</span> <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> retrieved_docs])
    system_prompt = (
        <span class="hljs-string">&quot;You are an AI assistant. Provide answers based on the given context.&quot;</span>
    )
    user_prompt = <span class="hljs-string">f&quot;&quot;&quot;
    Use the following pieces of information to answer the question. If the information is not in the context, say you don&#x27;t know.
    
    Context:
    <span class="hljs-subst">{context}</span>
    
    Question: <span class="hljs-subst">{question}</span>
    &quot;&quot;&quot;</span>
    response = openai_client.chat.completions.create(
        model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
        messages=[
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: system_prompt},
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt},
        ],
    )
    <span class="hljs-keyword">return</span> response.choices[<span class="hljs-number">0</span>].message.content
<button class="copy-code-btn"></button></code></pre>
<p>Testons le pipeline RAG avec un exemple de question.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How does Milvus search for similar documents?&quot;</span>
answer = generate_rag_response(question)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{question}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Answer: <span class="hljs-subst">{answer}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Question: How does Milvus search for similar documents?
Answer: Milvus searches for similar documents primarily through Approximate Nearest Neighbor (ANN) search, which finds the top K vectors closest to a given query vector. It also supports various other types of searches, such as filtering search under specified conditions, range search within a specified radius, hybrid search based on multiple vector fields, and keyword search based on BM25. Additionally, it can perform reranking to adjust the order of search results based on additional criteria, refining the initial ANN search results.
</code></pre>
