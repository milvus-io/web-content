---
id: milvus_hybrid_search_retriever.md
summary: >-
  Ce carnet montre comment utiliser les fonctionnalités liées à la base de
  données vectorielles Milvus.
title: Récupérateur de recherche hybride Milvus
---
<h1 id="Milvus-Hybrid-Search-Retriever" class="common-anchor-header">Récupérateur de recherche hybride Milvus<button data-href="#Milvus-Hybrid-Search-Retriever" class="anchor-icon" translate="no">
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
    </button></h1><p>La recherche hybride combine les forces de différents paradigmes de recherche pour améliorer la précision et la robustesse de la recherche. Elle exploite les capacités de la recherche vectorielle dense et de la recherche vectorielle éparse, ainsi que les combinaisons de plusieurs stratégies de recherche vectorielle dense, garantissant une recherche complète et précise pour diverses requêtes.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Ce diagramme illustre le scénario de recherche hybride le plus courant, à savoir la recherche hybride dense + sparse. Dans ce cas, les candidats sont recherchés en utilisant à la fois la similarité des vecteurs sémantiques et la correspondance précise des mots-clés. Les résultats de ces méthodes sont fusionnés, reclassés et transmis à un LLM pour générer la réponse finale. Cette approche équilibre la précision et la compréhension sémantique, ce qui la rend très efficace pour divers scénarios d'interrogation.</p>
<p>Outre la recherche hybride dense + clairsemée, les stratégies hybrides peuvent également combiner plusieurs modèles de vecteurs denses. Par exemple, un modèle de vecteur dense peut se spécialiser dans la capture des nuances sémantiques, tandis qu'un autre se concentre sur les enchâssements contextuels ou les représentations spécifiques à un domaine. En fusionnant les résultats de ces modèles et en les reclassant, ce type de recherche hybride garantit un processus de recherche plus nuancé et plus sensible au contexte.</p>
<p>L'intégration de LangChain Milvus fournit un moyen flexible d'implémenter la recherche hybride, elle supporte n'importe quel nombre de champs vectoriels, et n'importe quel modèle d'intégration dense ou éparse personnalisé, ce qui permet à LangChain Milvus de s'adapter de manière flexible à divers scénarios d'utilisation de la recherche hybride, tout en étant compatible avec d'autres capacités de LangChain.</p>
<p>Dans ce tutoriel, nous commencerons par le cas le plus courant dense + sparse, puis nous présenterons un certain nombre d'approches générales d'utilisation de la recherche hybride.</p>
<div class="alert note">
<p>Le <a href="https://api.python.langchain.com/en/latest/milvus/retrievers/langchain_milvus.retrievers.milvus_hybrid_search.MilvusCollectionHybridSearchRetriever.html">MilvusCollectionHybridSearchRetriever</a>, qui est une autre implémentation de la recherche hybride avec Milvus et LangChain, est <strong>sur le point d'être obsolète</strong>. Veuillez utiliser l'approche décrite dans ce document pour mettre en œuvre la recherche hybride, car elle est plus flexible et compatible avec LangChain.</p>
</div>
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
    </button></h2><p>Avant d'exécuter ce notebook, assurez-vous que les dépendances suivantes sont installées :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4 pymilvus[model] <span class="hljs-comment">#langchain-voyageai</span></span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si vous utilisez Google Colab, pour activer les dépendances qui viennent d'être installées, vous devrez peut-être <strong>redémarrer le runtime</strong> (cliquez sur le menu "Runtime" en haut de l'écran, et sélectionnez "Restart session" dans le menu déroulant).</p>
</div>
<p>Nous utiliserons les modèles d'OpenAI. Vous devez préparer les variables d'environnement <code translate="no">OPENAI_API_KEY</code> à partir d'<a href="https://platform.openai.com/docs/quickstart">OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Spécifiez votre serveur Milvus <code translate="no">URI</code> (et éventuellement <code translate="no">TOKEN</code>). Pour savoir comment installer et démarrer le serveur Milvus, suivez ce <a href="https://milvus.io/docs/install_standalone-docker-compose.md">guide</a>.</p>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Préparez quelques documents d'exemple, qui sont des résumés d'histoires fictives classées par thème ou par genre.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

docs = [
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Whispering Walls&#x27; by Ava Moreno, a young journalist named Sophia uncovers a decades-old conspiracy hidden within the crumbling walls of an ancient mansion, where the whispers of the past threaten to destroy her own sanity.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Mystery&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Last Refuge&#x27; by Ethan Blackwood, a group of survivors must band together to escape a post-apocalyptic wasteland, where the last remnants of humanity cling to life in a desperate bid for survival.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Post-Apocalyptic&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Memory Thief&#x27; by Lila Rose, a charismatic thief with the ability to steal and manipulate memories is hired by a mysterious client to pull off a daring heist, but soon finds themselves trapped in a web of deceit and betrayal.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Heist/Thriller&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The City of Echoes&#x27; by Julian Saint Clair, a brilliant detective must navigate a labyrinthine metropolis where time is currency, and the rich can live forever, but at a terrible cost to the poor.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Science Fiction&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Starlight Serenade&#x27; by Ruby Flynn, a shy astronomer discovers a mysterious melody emanating from a distant star, which leads her on a journey to uncover the secrets of the universe and her own heart.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Science Fiction/Romance&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Shadow Weaver&#x27; by Piper Redding, a young orphan discovers she has the ability to weave powerful illusions, but soon finds herself at the center of a deadly game of cat and mouse between rival factions vying for control of the mystical arts.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Fantasy&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Lost Expedition&#x27; by Caspian Grey, a team of explorers ventures into the heart of the Amazon rainforest in search of a lost city, but soon finds themselves hunted by a ruthless treasure hunter and the treacherous jungle itself.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Adventure&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Clockwork Kingdom&#x27; by Augusta Wynter, a brilliant inventor discovers a hidden world of clockwork machines and ancient magic, where a rebellion is brewing against the tyrannical ruler of the land.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Steampunk/Fantasy&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Phantom Pilgrim&#x27; by Rowan Welles, a charismatic smuggler is hired by a mysterious organization to transport a valuable artifact across a war-torn continent, but soon finds themselves pursued by deadly assassins and rival factions.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Adventure/Thriller&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Dreamwalker&#x27;s Journey&#x27; by Lyra Snow, a young dreamwalker discovers she has the ability to enter people&#x27;s dreams, but soon finds herself trapped in a surreal world of nightmares and illusions, where the boundaries between reality and fantasy blur.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Fantasy&quot;</span>},
    ),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Dense-embedding-+-Sparse-embedding" class="common-anchor-header">Encastrement dense + Encastrement clairsemé<button data-href="#Dense-embedding-+-Sparse-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Option-1Recommended-dense-embedding-+-Milvus-BM25-built-in-function" class="common-anchor-header">Option 1 (recommandée) : incorporation dense + fonction intégrée Milvus BM25</h3><p>Utilisez l'intégration dense + la fonction intégrée Milvus BM25 pour assembler l'instance de magasin de vecteurs de recherche hybride.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus, BM25BuiltInFunction
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),  <span class="hljs-comment"># output_field_names=&quot;sparse&quot;),</span>
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Si vous utilisez <code translate="no">BM25BuiltInFunction</code>, veuillez noter que la recherche en texte intégral est disponible dans Milvus Standalone et Milvus Distributed, mais pas dans Milvus Lite, bien qu'elle figure sur la feuille de route en vue d'une inclusion future. Elle sera également bientôt disponible dans Zilliz Cloud (Milvus entièrement géré). Veuillez contacter <a href="mailto:support@zilliz.com">support@zilliz.com</a> pour plus d'informations.</li>
</ul>
</div>
<p>Dans le code ci-dessus, nous définissons une instance de <code translate="no">BM25BuiltInFunction</code> et la passons à l'objet <code translate="no">Milvus</code>. <code translate="no">BM25BuiltInFunction</code> est une classe enveloppante légère pour <a href="https://milvus.io/docs/manage-collections.md#Function"><code translate="no">Function</code></a> dans Milvus. Nous pouvons l'utiliser avec <code translate="no">OpenAIEmbeddings</code> pour initialiser une instance de magasin de vecteurs Milvus à recherche hybride dense + éparse.</p>
<p><code translate="no">BM25BuiltInFunction</code> Milvus n'exige pas du client qu'il transmette un corpus ou une formation, tout est traité automatiquement au niveau du serveur Milvus, de sorte que les utilisateurs n'ont pas besoin de se préoccuper d'un vocabulaire ou d'un corpus. En outre, les utilisateurs peuvent également personnaliser l'<a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">analyseur</a> pour mettre en œuvre le traitement de texte personnalisé dans la BM25.</p>
<p>Pour plus d'informations sur <code translate="no">BM25BuiltInFunction</code>, veuillez vous référer à <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Full-Text-Search</a> et <a href="https://milvus.io/docs/full_text_search_with_langchain.md">Using Full-Text Search with LangChain and Milvus</a>.</p>
<h3 id="Option-2-Use-dense-and-customized-LangChain-sparse-embedding" class="common-anchor-header">Option 2 : Utiliser l'intégration dense et personnalisée de LangChain (sparse embedding)</h3><p>Vous pouvez hériter de la classe <code translate="no">BaseSparseEmbedding</code> à partir de <code translate="no">langchain_milvus.utils.sparse</code> et mettre en œuvre les méthodes <code translate="no">embed_query</code> et <code translate="no">embed_documents</code> pour personnaliser le processus d'incorporation éparse. Cela vous permet de personnaliser n'importe quelle méthode d'incorporation éparse basée sur les statistiques de fréquence des termes (par exemple <a href="https://milvus.io/docs/embed-with-bm25.md#BM25">BM25</a>) ou les réseaux neuronaux (par exemple <a href="https://milvus.io/docs/embed-with-splade.md#SPLADE">SPADE</a>).</p>
<p>Voici un exemple :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">Dict</span>, <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> langchain_milvus.utils.sparse <span class="hljs-keyword">import</span> BaseSparseEmbedding


<span class="hljs-keyword">class</span> <span class="hljs-title class_">MyCustomEmbedding</span>(<span class="hljs-title class_ inherited__">BaseSparseEmbedding</span>):  <span class="hljs-comment"># inherit from BaseSparseEmbedding</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, model_path</span>): ...  <span class="hljs-comment"># code to init or load model</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_query</span>(<span class="hljs-params">self, query: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">int</span>, <span class="hljs-built_in">float</span>]:
        ...  <span class="hljs-comment"># code to embed query</span>
        <span class="hljs-keyword">return</span> {  <span class="hljs-comment"># fake embedding result</span>
            <span class="hljs-number">1</span>: <span class="hljs-number">0.1</span>,
            <span class="hljs-number">2</span>: <span class="hljs-number">0.2</span>,
            <span class="hljs-number">3</span>: <span class="hljs-number">0.3</span>,
            <span class="hljs-comment"># ...</span>
        }

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_documents</span>(<span class="hljs-params">self, texts: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-type">Dict</span>[<span class="hljs-built_in">int</span>, <span class="hljs-built_in">float</span>]]:
        ...  <span class="hljs-comment"># code to embed documents</span>
        <span class="hljs-keyword">return</span> [  <span class="hljs-comment"># fake embedding results</span>
            {
                <span class="hljs-number">1</span>: <span class="hljs-number">0.1</span>,
                <span class="hljs-number">2</span>: <span class="hljs-number">0.2</span>,
                <span class="hljs-number">3</span>: <span class="hljs-number">0.3</span>,
                <span class="hljs-comment"># ...</span>
            }
        ] * <span class="hljs-built_in">len</span>(texts)
<button class="copy-code-btn"></button></code></pre>
<p>Nous avons une classe de démonstration <code translate="no">BM25SparseEmbedding</code> héritée de <code translate="no">BaseSparseEmbedding</code> dans <code translate="no">langchain_milvus.utils.sparse</code>. Vous pouvez la passer dans la liste d'intégration d'initialisation de l'instance du magasin de vecteurs Milvus, tout comme d'autres classes d'intégration dense langchain.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># BM25SparseEmbedding is inherited from BaseSparseEmbedding</span>
<span class="hljs-keyword">from</span> langchain_milvus.utils.sparse <span class="hljs-keyword">import</span> BM25SparseEmbedding

embedding1 = OpenAIEmbeddings()

corpus = [doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs]
embedding2 = BM25SparseEmbedding(
    corpus=corpus
)  <span class="hljs-comment"># pass in corpus to initialize the statistics</span>

vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Bien qu'il s'agisse d'une façon d'utiliser BM25, elle exige que les utilisateurs gèrent le corpus pour obtenir des statistiques sur la fréquence des termes. Nous recommandons d'utiliser plutôt la fonction intégrée de BM25 (Option 1), car elle gère tout du côté du serveur Milvus. Les utilisateurs n'ont donc pas à se préoccuper de la gestion du corpus ou de la formation d'un vocabulaire. Pour plus d'informations, veuillez vous référer à la section <a href="https://milvus.io/docs/full_text_search_with_langchain.md">Utilisation de la recherche plein texte avec LangChain et Milvus</a>.</p>
<h2 id="Define-multiple-arbitrary-vector-fields" class="common-anchor-header">Définir plusieurs champs vectoriels arbitraires<button data-href="#Define-multiple-arbitrary-vector-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Lors de l'initialisation du magasin de vecteurs Milvus, vous pouvez transmettre la liste des embeddings (et, à l'avenir, la liste des fonctions intégrées) pour mettre en œuvre la recherche multi-voies, puis classer ces candidats. Voici un exemple :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># from langchain_voyageai import VoyageAIEmbeddings</span>

embedding1 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)
embedding2 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-large&quot;</span>)
<span class="hljs-comment"># embedding3 = VoyageAIEmbeddings(model=&quot;voyage-3&quot;)  # You can also use embedding from other embedding model providers, e.g VoyageAIEmbeddings</span>


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],  <span class="hljs-comment"># embedding3],</span>
    builtin_function=BM25BuiltInFunction(output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>),
    <span class="hljs-comment"># `sparse` is the output field name of BM25BuiltInFunction, and `dense1` and `dense2` are the output field names of embedding1 and embedding2</span>
    vector_field=[<span class="hljs-string">&quot;dense1&quot;</span>, <span class="hljs-string">&quot;dense2&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['dense1', 'dense2', 'sparse']
</code></pre>
<p>Dans cet exemple, nous avons trois champs de vecteurs. Parmi eux, <code translate="no">sparse</code> est utilisé comme champ de sortie pour <code translate="no">BM25BuiltInFunction</code>, tandis que les deux autres, <code translate="no">dense1</code> et <code translate="no">dense2</code>, sont automatiquement assignés comme champs de sortie pour les deux modèles <code translate="no">OpenAIEmbeddings</code> (en fonction de l'ordre).</p>
<h3 id="Specify-the-index-params-for-multi-vector-fields" class="common-anchor-header">Spécifier les paramètres d'index pour les champs multi-vecteurs</h3><p>Par défaut, les types d'index de chaque champ vectoriel sont automatiquement déterminés par le type d'intégration ou de fonction intégrée. Cependant, vous pouvez également spécifier le type d'index pour chaque champ vectoriel afin d'optimiser les performances de la recherche.</p>
<pre><code translate="no" class="language-python">dense_index_param_1 = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
}
dense_index_param_2 = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
}
sparse_index_param = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
}

vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],
    builtin_function=BM25BuiltInFunction(output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>),
    index_params=[dense_index_param_1, dense_index_param_2, sparse_index_param],
    vector_field=[<span class="hljs-string">&quot;dense1&quot;</span>, <span class="hljs-string">&quot;dense2&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['dense1', 'dense2', 'sparse']
</code></pre>
<div class="alert note">
<p>Veillez à ce que l'ordre de la liste des paramètres d'index soit cohérent avec l'ordre de <code translate="no">vectorstore.vector_fields</code> afin d'éviter toute confusion.</p>
</div>
<h3 id="Rerank-the-candidates" class="common-anchor-header">Reclasser les candidats</h3><p>Après la première étape de la recherche, nous devons reclasser les candidats pour obtenir un meilleur résultat. Vous pouvez choisir <a href="https://milvus.io/docs/reranking.md#Weighted-Scoring-WeightedRanker">WeightedRanker</a> ou <a href="https://milvus.io/docs/reranking.md#Reciprocal-Rank-Fusion-RRFRanker">RRFRanker</a> en fonction de vos besoins. Vous pouvez vous référer au <a href="https://milvus.io/docs/reranking.md#Reranking">Reranking</a> pour plus d'informations.</p>
<p>Voici un exemple de reclassement pondéré :</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)

query = <span class="hljs-string">&quot;What are the novels Lila has written and what are their contents?&quot;</span>

vectorstore.similarity_search(
    query, k=<span class="hljs-number">1</span>, ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>, ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.6</span>, <span class="hljs-number">0.4</span>]}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 454646931479252186, 'category': 'Heist/Thriller'}, page_content=&quot;In 'The Memory Thief' by Lila Rose, a charismatic thief with the ability to steal and manipulate memories is hired by a mysterious client to pull off a daring heist, but soon finds themselves trapped in a web of deceit and betrayal.&quot;)]
</code></pre>
<p>Voici un exemple de reclassement RRF :</p>
<pre><code translate="no" class="language-python">vectorstore.similarity_search(query, k=<span class="hljs-number">1</span>, ranker_type=<span class="hljs-string">&quot;rrf&quot;</span>, ranker_params={<span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'category': 'Heist/Thriller', 'pk': 454646931479252186}, page_content=&quot;In 'The Memory Thief' by Lila Rose, a charismatic thief with the ability to steal and manipulate memories is hired by a mysterious client to pull off a daring heist, but soon finds themselves trapped in a web of deceit and betrayal.&quot;)]
</code></pre>
<p>Si vous ne fournissez aucun paramètre concernant le reranking, la stratégie de reranking pondéré moyen est utilisée par défaut.</p>
<h2 id="Using-Hybrid-Search-and-Reranking-in-RAG" class="common-anchor-header">Utilisation de la recherche hybride et du reclassement dans RAG<button data-href="#Using-Hybrid-Search-and-Reranking-in-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans le scénario de RAG, l'approche la plus répandue pour la recherche hybride est la recherche dense + sparse, suivie du reranking. L'exemple suivant montre un code simple de bout en bout.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">Préparation des données</h3><p>Nous utilisons le Langchain WebBaseLoader pour charger les documents à partir de sources web et les diviser en morceaux à l'aide du RecursiveCharacterTextSplitter.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> bs4
<span class="hljs-keyword">from</span> langchain_community.document_loaders <span class="hljs-keyword">import</span> WebBaseLoader
<span class="hljs-keyword">from</span> langchain_text_splitters <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter

<span class="hljs-comment"># Create a WebBaseLoader instance to load documents from web sources</span>
loader = WebBaseLoader(
    web_paths=(
        <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-06-23-agent/&quot;</span>,
        <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/&quot;</span>,
    ),
    bs_kwargs=<span class="hljs-built_in">dict</span>(
        parse_only=bs4.SoupStrainer(
            class_=(<span class="hljs-string">&quot;post-content&quot;</span>, <span class="hljs-string">&quot;post-title&quot;</span>, <span class="hljs-string">&quot;post-header&quot;</span>)
        )
    ),
)
<span class="hljs-comment"># Load documents from web sources using the loader</span>
documents = loader.load()
<span class="hljs-comment"># Initialize a RecursiveCharacterTextSplitter for splitting text into chunks</span>
text_splitter = RecursiveCharacterTextSplitter(chunk_size=<span class="hljs-number">2000</span>, chunk_overlap=<span class="hljs-number">200</span>)

<span class="hljs-comment"># Split the documents into chunks using the text_splitter</span>
docs = text_splitter.split_documents(documents)

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
docs[<span class="hljs-number">1</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document(metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/'}, page_content='Fig. 1. Overview of a LLM-powered autonomous agent system.\nComponent One: Planning#\nA complicated task usually involves many steps. An agent needs to know what they are and plan ahead.\nTask Decomposition#\nChain of thought (CoT; Wei et al. 2022) has become a standard prompting technique for enhancing model performance on complex tasks. The model is instructed to “think step by step” to utilize more test-time computation to decompose hard tasks into smaller and simpler steps. CoT transforms big tasks into multiple manageable tasks and shed lights into an interpretation of the model’s thinking process.\nTree of Thoughts (Yao et al. 2023) extends CoT by exploring multiple reasoning possibilities at each step. It first decomposes the problem into multiple thought steps and generates multiple thoughts per step, creating a tree structure. The search process can be BFS (breadth-first search) or DFS (depth-first search) with each state evaluated by a classifier (via a prompt) or majority vote.\nTask decomposition can be done (1) by LLM with simple prompting like &quot;Steps for XYZ.\\n1.&quot;, &quot;What are the subgoals for achieving XYZ?&quot;, (2) by using task-specific instructions; e.g. &quot;Write a story outline.&quot; for writing a novel, or (3) with human inputs.\nAnother quite distinct approach, LLM+P (Liu et al. 2023), involves relying on an external classical planner to do long-horizon planning. This approach utilizes the Planning Domain Definition Language (PDDL) as an intermediate interface to describe the planning problem. In this process, LLM (1) translates the problem into “Problem PDDL”, then (2) requests a classical planner to generate a PDDL plan based on an existing “Domain PDDL”, and finally (3) translates the PDDL plan back into natural language. Essentially, the planning step is outsourced to an external tool, assuming the availability of domain-specific PDDL and a suitable planner which is common in certain robotic setups but not in many other domains.\nSelf-Reflection#')
</code></pre>
<h3 id="Load-the-document-into-Milvus-vector-store" class="common-anchor-header">Chargement du document dans le magasin vectoriel Milvus</h3><p>Comme dans l'introduction ci-dessus, nous initialisons et chargeons les documents préparés dans le magasin de vecteurs Milvus, qui contient deux champs de vecteurs : <code translate="no">dense</code> est pour l'intégration OpenAI et <code translate="no">sparse</code> est pour la fonction BM25.</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-RAG-chain" class="common-anchor-header">Construction de la chaîne RAG</h3><p>Nous préparons l'instance LLM et l'invite, puis nous les combinons dans un pipeline RAG à l'aide du LangChain Expression Language.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.runnables <span class="hljs-keyword">import</span> RunnablePassthrough
<span class="hljs-keyword">from</span> langchain_core.prompts <span class="hljs-keyword">import</span> PromptTemplate
<span class="hljs-keyword">from</span> langchain_core.output_parsers <span class="hljs-keyword">import</span> StrOutputParser
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI

<span class="hljs-comment"># Initialize the OpenAI language model for response generation</span>
llm = ChatOpenAI(model_name=<span class="hljs-string">&quot;gpt-4o&quot;</span>, temperature=<span class="hljs-number">0</span>)

<span class="hljs-comment"># Define the prompt template for generating AI responses</span>
PROMPT_TEMPLATE = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant, and provides answers to questions by using fact based and statistical information when possible.
Use the following pieces of information to provide a concise answer to the question enclosed in &lt;question&gt; tags.
If you don&#x27;t know the answer, just say that you don&#x27;t know, don&#x27;t try to make up an answer.
&lt;context&gt;
{context}
&lt;/context&gt;

&lt;question&gt;
{question}
&lt;/question&gt;

The response should be specific and use statistics or numbers when possible.

Assistant:&quot;&quot;&quot;</span>

<span class="hljs-comment"># Create a PromptTemplate instance with the defined template and input variables</span>
prompt = PromptTemplate(
    template=PROMPT_TEMPLATE, input_variables=[<span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>]
)
<span class="hljs-comment"># Convert the vector store to a retriever</span>
retriever = vectorstore.as_retriever()


<span class="hljs-comment"># Define a function to format the retrieved documents</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">format_docs</span>(<span class="hljs-params">docs</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs)
<button class="copy-code-btn"></button></code></pre>
<p>Utilisez le LCEL (LangChain Expression Language) pour construire une chaîne RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the RAG (Retrieval-Augmented Generation) chain for AI response generation</span>
rag_chain = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever | format_docs, <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

<span class="hljs-comment"># rag_chain.get_graph().print_ascii()</span>
<button class="copy-code-btn"></button></code></pre>
<p>Invoquer la chaîne RAG avec une question spécifique et récupérer la réponse.</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What is PAL and PoT?&quot;</span>
res = rag_chain.invoke(query)
res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'PAL (Program-aided Language models) and PoT (Program of Thoughts prompting) are approaches that involve using language models to generate programming language statements to solve natural language reasoning problems. This method offloads the solution step to a runtime, such as a Python interpreter, allowing for complex computation and reasoning to be handled externally. PAL and PoT rely on language models with strong coding skills to effectively perform these tasks.'
</code></pre>
<p>Nous vous félicitons ! Vous avez construit une chaîne RAG hybride (vecteur dense + fonction bm25 clairsemée) alimentée par Milvus et LangChain.</p>
