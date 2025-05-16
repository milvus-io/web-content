---
id: full_text_search_with_langchain.md
summary: >-
  Ce tutoriel montre comment utiliser LangChain et Milvus pour mettre en œuvre
  la recherche plein texte dans votre application.
title: Utilisation de la recherche plein texte avec LangChain et Milvus
---
<h1 id="Using-Full-Text-Search-with-LangChain-and-Milvus" class="common-anchor-header">Utilisation de la recherche plein texte avec LangChain et Milvus<button data-href="#Using-Full-Text-Search-with-LangChain-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/langchain/full_text_search_with_langchain.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/langchain/full_text_search_with_langchain.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>La<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">recherche plein texte</a> est une méthode traditionnelle qui permet de récupérer des documents en faisant correspondre des mots-clés ou des phrases spécifiques dans le texte. Elle classe les résultats sur la base de scores de pertinence calculés à partir de facteurs tels que la fréquence des termes. Alors que la recherche sémantique permet de mieux comprendre le sens et le contexte, la recherche en texte intégral excelle dans la correspondance précise des mots-clés, ce qui en fait un complément utile à la recherche sémantique. L'algorithme BM25 est largement utilisé pour le classement dans la recherche plein texte et joue un rôle clé dans la génération améliorée par la recherche (RAG).</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a> introduit des capacités natives de recherche en texte intégral à l'aide de l'algorithme BM25. Cette approche convertit le texte en vecteurs épars qui représentent les scores BM25. Il suffit de saisir du texte brut pour que Milvus génère et stocke automatiquement les vecteurs épars, sans qu'il soit nécessaire de procéder à une génération manuelle de l'intégration éparse.</p>
<p>L'intégration de LangChain à Milvus a également introduit cette fonctionnalité, simplifiant le processus d'incorporation de la recherche plein texte dans les applications RAG. En combinant la recherche en texte intégral avec la recherche sémantique à l'aide de vecteurs denses, vous pouvez obtenir une approche hybride qui exploite à la fois le contexte sémantique des encastrements denses et la pertinence précise des mots clés grâce à la correspondance des mots. Cette intégration améliore la précision, la pertinence et l'expérience utilisateur des systèmes de recherche.</p>
<p>Ce tutoriel montre comment utiliser LangChain et Milvus pour mettre en œuvre la recherche en texte intégral dans votre application.</p>
<div class="alert note">
<ul>
<li>La recherche plein texte est actuellement disponible dans Milvus Standalone, Milvus Distributed et Zilliz Cloud, bien qu'elle ne soit pas encore prise en charge dans Milvus Lite (qui prévoit cette fonctionnalité pour une mise en œuvre future). Contactez support@zilliz.com pour plus d'informations.</li>
<li>Avant de poursuivre ce tutoriel, assurez-vous d'avoir une compréhension de base de la <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">recherche en texte intégral</a> et de l'<a href="https://milvus.io/docs/basic_usage_langchain.md">utilisation de base</a> de l'intégration LangChain Milvus.</li>
</ul>
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
    </button></h2><p>Avant d'exécuter ce bloc-notes, assurez-vous que les dépendances suivantes sont installées :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4 <span class="hljs-comment">#langchain-voyageai</span></span>
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
<p>Préparez quelques documents d'exemples :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

docs = [
    Document(page_content=<span class="hljs-string">&quot;I like this apple&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;fruit&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;I like swimming&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;sport&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;I like dogs&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;pets&quot;</span>}),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialization-with-BM25-Function" class="common-anchor-header">Initialisation avec la fonction BM25<button data-href="#Initialization-with-BM25-Function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Hybrid-Search" class="common-anchor-header">Recherche hybride</h3><p>Pour la recherche en texte intégral, Milvus VectorStore accepte un paramètre <code translate="no">builtin_function</code>. Ce paramètre permet de transmettre une instance de <code translate="no">BM25BuiltInFunction</code>, ce qui est différent de la recherche sémantique qui transmet généralement des enchâssements denses à <code translate="no">VectorStore</code>,</p>
<p>Voici un exemple simple de recherche hybride dans Milvus avec OpenAI dense embedding pour la recherche sémantique et BM25 pour la recherche en texte intégral :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus, BM25BuiltInFunction
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    <span class="hljs-comment"># `dense` is for OpenAI embeddings, `sparse` is the output field of BM25 function</span>
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans le code ci-dessus, nous définissons une instance de <code translate="no">BM25BuiltInFunction</code> et la transmettons à l'objet <code translate="no">Milvus</code>. <code translate="no">BM25BuiltInFunction</code> est une classe enveloppante légère pour la recherche sémantique dans Milvus. <a href="https://milvus.io/docs/manage-collections.md#Function"><code translate="no">Function</code></a> dans Milvus.</p>
<p>Vous pouvez spécifier les champs d'entrée et de sortie de cette fonction dans les paramètres de l'objet <code translate="no">BM25BuiltInFunction</code>:</p>
<ul>
<li><code translate="no">input_field_names</code> (str) : Le nom du champ d'entrée, par défaut <code translate="no">text</code>. Il indique le champ que cette fonction lit en entrée.</li>
<li><code translate="no">output_field_names</code> (str) : Le nom du champ de sortie, par défaut <code translate="no">sparse</code>. Il indique le champ dans lequel cette fonction émet le résultat calculé.</li>
</ul>
<p>Notez que dans les paramètres d'initialisation de Milvus mentionnés ci-dessus, nous spécifions également <code translate="no">vector_field=[&quot;dense&quot;, &quot;sparse&quot;]</code>. Étant donné que le champ <code translate="no">sparse</code> est considéré comme le champ de sortie défini par <code translate="no">BM25BuiltInFunction</code>, l'autre champ <code translate="no">dense</code> sera automatiquement attribué au champ de sortie d'OpenAIEmbeddings.</p>
<p>Dans la pratique, en particulier lors de la combinaison de plusieurs embeddings ou fonctions, nous recommandons de spécifier explicitement les champs d'entrée et de sortie pour chaque fonction afin d'éviter toute ambiguïté.</p>
<p>Dans l'exemple suivant, nous spécifions explicitement les champs d'entrée et de sortie de <code translate="no">BM25BuiltInFunction</code>, ce qui permet de savoir clairement à quel champ s'adresse la fonction intégrée.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># from langchain_voyageai import VoyageAIEmbeddings</span>

embedding1 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)
embedding2 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-large&quot;</span>)
<span class="hljs-comment"># embedding2 = VoyageAIEmbeddings(model=&quot;voyage-3&quot;)  # You can also use embedding from other embedding model providers, e.g VoyageAIEmbeddings</span>


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],
    builtin_function=BM25BuiltInFunction(
        input_field_names=<span class="hljs-string">&quot;text&quot;</span>, output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>
    ),
    text_field=<span class="hljs-string">&quot;text&quot;</span>,  <span class="hljs-comment"># `text` is the input field name of BM25BuiltInFunction</span>
    <span class="hljs-comment"># `sparse` is the output field name of BM25BuiltInFunction, and `dense1` and `dense2` are the output field names of embedding1 and embedding2</span>
    vector_field=[<span class="hljs-string">&quot;dense1&quot;</span>, <span class="hljs-string">&quot;dense2&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['dense1', 'dense2', 'sparse']
</code></pre>
<p>Dans cet exemple, nous avons trois champs vectoriels. Parmi eux, <code translate="no">sparse</code> est utilisé comme champ de sortie pour <code translate="no">BM25BuiltInFunction</code>, tandis que les deux autres, <code translate="no">dense1</code> et <code translate="no">dense2</code>, sont automatiquement affectés comme champs de sortie pour les deux modèles <code translate="no">OpenAIEmbeddings</code> (en fonction de l'ordre).</p>
<p>De cette manière, vous pouvez définir plusieurs champs de vecteurs et leur attribuer différentes combinaisons d'embeddings ou de fonctions, afin de mettre en œuvre la recherche hybride.</p>
<p>Lors de la recherche hybride, il suffit de transmettre le texte de la requête et de définir éventuellement les paramètres topK et reranker. L'instance <code translate="no">vectorstore</code> traitera automatiquement les intégrations vectorielles et les fonctions intégrées et utilisera finalement un reranker pour affiner les résultats. Les détails de l'implémentation sous-jacente du processus de recherche sont cachés à l'utilisateur.</p>
<pre><code translate="no" class="language-python">vectorstore.similarity_search(
    <span class="hljs-string">&quot;Do I like apples?&quot;</span>, k=<span class="hljs-number">1</span>
)  <span class="hljs-comment"># , ranker_type=&quot;weighted&quot;, ranker_params={&quot;weights&quot;:[0.3, 0.3, 0.4]})</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'category': 'fruit', 'pk': 454646931479251897}, page_content='I like this apple')]
</code></pre>
<p>Pour plus d'informations sur la recherche hybride, vous pouvez consulter l'<a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">introduction à la recherche hybride</a> et ce <a href="https://milvus.io/docs/milvus_hybrid_search_retriever.md">tutoriel sur la recherche hybride LangChain Milvus</a>.</p>
<h3 id="BM25-search-without-embedding" class="common-anchor-header">Recherche BM25 sans intégration</h3><p>Si vous souhaitez effectuer uniquement une recherche en texte intégral avec la fonction BM25 sans utiliser de recherche sémantique basée sur l'intégration, vous pouvez régler le paramètre d'intégration sur <code translate="no">None</code> et ne conserver que le site <code translate="no">builtin_function</code> spécifié comme instance de la fonction BM25. Le champ vectoriel n'a qu'un champ "clairsemé". Par exemple, le champ vectoriel n'a qu'un champ "clairsemé" :</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=<span class="hljs-literal">None</span>,
    builtin_function=BM25BuiltInFunction(
        output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>,
    ),
    vector_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['sparse']
</code></pre>
<h2 id="Customize-analyzer" class="common-anchor-header">Personnaliser l'analyseur<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Les analyseurs sont essentiels dans la recherche en texte intégral car ils décomposent la phrase en tokens et effectuent des analyses lexicales telles que le stemming et l'élimination des mots vides. Les analyseurs sont généralement spécifiques à une langue. Vous pouvez consulter <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">ce guide</a> pour en savoir plus sur les analyseurs dans Milvus.</p>
<p>Milvus prend en charge deux types d'analyseurs : Les <strong>analyseurs intégrés</strong> et les <strong>analyseurs personnalisés</strong>. Par défaut, le site <code translate="no">BM25BuiltInFunction</code> utilise l'<a href="https://milvus.io/docs/standard-analyzer.md">analyseur intégré standard</a>, qui est l'analyseur le plus basique et qui symbolise le texte avec la ponctuation.</p>
<p>Si vous souhaitez utiliser un analyseur différent ou personnaliser l'analyseur, vous pouvez passer le paramètre <code translate="no">analyzer_params</code> dans l'initialisation de <code translate="no">BM25BuiltInFunction</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom filter</span>
    ],
}


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(
        output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>,
        enable_match=<span class="hljs-literal">True</span>,
        analyzer_params=analyzer_params_custom,
    ),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Nous pouvons examiner le schéma de la collection Milvus et nous assurer que l'analyseur personnalisé est correctement configuré.</p>
<pre><code translate="no" class="language-python">vectorstore.col.schema
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': True, 'description': '', 'fields': [{'name': 'text', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase', {'type': 'length', 'max': 40}, {'type': 'stop', 'stop_words': ['of', 'to']}]}}}, {'name': 'pk', 'description': '', 'type': &lt;DataType.INT64: 5&gt;, 'is_primary': True, 'auto_id': True}, {'name': 'dense', 'description': '', 'type': &lt;DataType.FLOAT_VECTOR: 101&gt;, 'params': {'dim': 1536}}, {'name': 'sparse', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}, {'name': 'category', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535}}], 'enable_dynamic_field': False, 'functions': [{'name': 'bm25_function_de368e79', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['text'], 'output_field_names': ['sparse'], 'params': {}}]}
</code></pre>
<p>Pour plus de détails sur les concepts, par exemple <code translate="no">analyzer</code>, <code translate="no">tokenizer</code>, <code translate="no">filter</code>, <code translate="no">enable_match</code>, <code translate="no">analyzer_params</code>, veuillez vous référer à la <a href="https://milvus.io/docs/analyzer-overview.md">documentation de l'analyseur</a>.</p>
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
    </button></h2><p>Nous avons appris à utiliser la fonction de base intégrée BM25 dans LangChain et Milvus. Nous allons maintenant présenter une implémentation optimisée de RAG avec la recherche et le reclassement hybrides.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Ce diagramme illustre le processus de recherche et de reclassement hybride, qui combine la fonction BM25 pour la recherche par mots-clés et la recherche vectorielle pour la recherche sémantique. Les résultats des deux méthodes sont fusionnés, reclassés et transmis à un LLM pour générer la réponse finale.</p>
<p>La recherche hybride équilibre la précision et la compréhension sémantique, améliorant la précision et la robustesse pour diverses requêtes. Elle récupère les candidats à l'aide de la recherche plein texte BM25 et de la recherche vectorielle, garantissant ainsi une récupération sémantique, contextuelle et précise.</p>
<p>Commençons par un exemple.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">Préparer les données</h3><p>Nous utilisons le Langchain WebBaseLoader pour charger des documents à partir de sources web et les découper en morceaux à l'aide du RecursiveCharacterTextSplitter.</p>
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
<h3 id="Load-the-document-into-Milvus-vector-store" class="common-anchor-header">Charger le document dans le magasin vectoriel Milvus</h3><p>Comme dans l'introduction ci-dessus, nous initialisons et chargeons les documents préparés dans le magasin de vecteurs Milvus, qui contient deux champs de vecteurs : <code translate="no">dense</code> est pour l'intégration OpenAI et <code translate="no">sparse</code> est pour la fonction BM25.</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
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
<pre><code translate="no">'PAL (Program-aided Language models) and PoT (Program of Thoughts prompting) are approaches that involve using language models to generate programming language statements to solve natural language reasoning problems. This method offloads the solution step to a runtime, such as a Python interpreter, allowing for complex computation and reasoning to be handled externally. PAL and PoT rely on language models with strong coding skills to effectively generate and execute these programming statements.'
</code></pre>
<p>Nous vous félicitons ! Vous avez construit une chaîne RAG hybride (vecteur dense + fonction bm25 clairsemée) alimentée par Milvus et LangChain.</p>
