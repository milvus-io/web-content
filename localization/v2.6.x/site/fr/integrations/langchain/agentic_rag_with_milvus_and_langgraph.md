---
id: agentic_rag_with_milvus_and_langgraph.md
summary: >-
  Ce guide montre comment construire un système RAG (Retrieval-Augmented
  Generation) avancé en utilisant LangGraph et Milvus. Contrairement aux
  systèmes RAG traditionnels qui se contentent de récupérer et de générer, les
  systèmes RAG agentiques peuvent prendre des décisions intelligentes sur le
  moment de récupérer l'information, sur la manière de traiter les documents non
  pertinents et sur le moment de réécrire les requêtes pour obtenir de meilleurs
  résultats.
title: RAG agentique avec Milvus et LangGraph
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langchain/agentic_rag_with_milvus_and_langgraph.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langchain/agentic_rag_with_milvus_and_langgraph.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Agentic-RAG-with-Milvus-and-LangGraph" class="common-anchor-header">RAG agentique avec Milvus et LangGraph<button data-href="#Agentic-RAG-with-Milvus-and-LangGraph" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide montre comment construire un système RAG (Retrieval-Augmented Generation) avancé en utilisant LangGraph et Milvus. Contrairement aux systèmes RAG traditionnels qui se contentent de récupérer et de générer, les systèmes RAG agentiques peuvent prendre des décisions intelligentes sur le moment où il convient de récupérer des informations, sur la manière de traiter les documents non pertinents et sur le moment où il convient de réécrire les requêtes pour obtenir de meilleurs résultats.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/agentic_rag_with_langgraph_architecture.png" alt="Architecture of an agentic RAG system using LangGraph and Milvus" class="doc-image" id="architecture-of-an-agentic-rag-system-using-langgraph-and-milvus" />
   </span> <span class="img-wrapper"> <span>Architecture d'un système de RAG agentique utilisant LangGraph et Milvus</span> </span></p>
<p><a href="https://langchain-ai.github.io/langgraph/">LangGraph</a> est une bibliothèque permettant de construire des applications multi-acteurs avec des LLM, construite au-dessus de LangChain. <a href="https://milvus.io/">Milvus</a> est la base de données vectorielles open-source la plus avancée au monde, construite pour alimenter les applications de recherche de similarité et d'IA.</p>
<p>Dans ce tutoriel, nous allons construire un système RAG agentique qui peut :</p>
<ul>
<li>Décider de récupérer des documents ou de répondre directement à des requêtes simples</li>
<li>Classer les documents récupérés en fonction de leur pertinence</li>
<li>Réécrire les questions lorsque les documents récupérés ne sont pas pertinents</li>
<li>Générer des réponses de haute qualité basées sur un contexte pertinent</li>
</ul>
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
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade langchain langchain-core langchain-community langchain-text-splitters langgraph langchain-milvus milvus-lite langchain-openai bs4</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Si vous utilisez Google Colab, pour activer les dépendances qui viennent d'être installées, vous devrez peut-être <strong>redémarrer le runtime</strong> (cliquez sur le menu "Runtime" en haut de l'écran, et sélectionnez "Restart session" dans le menu déroulant).</p>
</blockquote>
<p>Nous utiliserons les modèles d'OpenAI. Vous devez préparer la <a href="https://platform.openai.com/docs/quickstart">clé api</a> <code translate="no">OPENAI_API_KEY</code> comme variable d'environnement.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-data" class="common-anchor-header">Préparer les données<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous utilisons le Langchain <a href="https://python.langchain.com/docs/integrations/document_loaders/web_base/">WebBaseLoader</a> pour charger les documents des <a href="https://lilianweng.github.io/">articles du blog de Lilian Weng</a> et les découper en morceaux à l'aide du <a href="https://python.langchain.com/docs/how_to/recursive_text_splitter/">RecursiveCharacterTextSplitter</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_community.document_loaders <span class="hljs-keyword">import</span> WebBaseLoader
<span class="hljs-keyword">from</span> langchain_text_splitters <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter

<span class="hljs-comment"># Load blog posts about AI topics</span>
urls = [
    <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-06-23-agent/&quot;</span>,
    <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/&quot;</span>,
    <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-10-25-adv-attack-llm/&quot;</span>,
]

<span class="hljs-comment"># Load documents</span>
docs = [WebBaseLoader(url).load() <span class="hljs-keyword">for</span> url <span class="hljs-keyword">in</span> urls]
docs_list = [item <span class="hljs-keyword">for</span> sublist <span class="hljs-keyword">in</span> docs <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> sublist]

<span class="hljs-comment"># Split documents into chunks</span>
text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    chunk_size=<span class="hljs-number">1000</span>, chunk_overlap=<span class="hljs-number">200</span>
)
doc_splits = text_splitter.split_documents(docs_list)

<span class="hljs-comment"># Let&#x27;s see how many document chunks we have</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Total document chunks: <span class="hljs-subst">{<span class="hljs-built_in">len</span>(doc_splits)}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">USER_AGENT environment variable not set, consider setting it to identify your requests.


Total document chunks: 47
</code></pre>
<h2 id="Create-a-retriever-tool-with-Milvus" class="common-anchor-header">Créer un outil de récupération avec Milvus<button data-href="#Create-a-retriever-tool-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous allons maintenant créer un magasin de vecteurs en utilisant Milvus pour indexer nos morceaux de documents et créer un outil de récupération que notre agent peut utiliser.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings
<span class="hljs-keyword">from</span> langchain.tools.retriever <span class="hljs-keyword">import</span> create_retriever_tool

<span class="hljs-comment"># Initialize embeddings</span>
embeddings = OpenAIEmbeddings()

<span class="hljs-comment"># Create Milvus vector store</span>
vectorstore = Milvus.from_documents(
    documents=doc_splits,
    embedding=embeddings,
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus_agentic_rag.db&quot;</span>,
    },
    drop_old=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Create retriever</span>
retriever = vectorstore.as_retriever(search_kwargs={<span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">3</span>})

<span class="hljs-comment"># Create retriever tool</span>
retriever_tool = create_retriever_tool(
    retriever,
    <span class="hljs-string">&quot;retrieve_blog_posts&quot;</span>,
    <span class="hljs-string">&quot;Search and return information about AI agents, prompt engineering, and adversarial attacks on LLMs from Lilian Weng&#x27;s blog posts.&quot;</span>,
)

<span class="hljs-comment"># Test the retriever tool</span>
<span class="hljs-built_in">print</span>(retriever_tool.invoke({<span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;What is Tree of Thought strategy?&quot;</span>})[:<span class="hljs-number">1000</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-10-23 15:03:26,670 [DEBUG][_create_connection]: Created new connection using: 0591f8d30be84e7e9b12ad3fc2a63650 (async_milvus_client.py:599)


How Self-Ask works with external search queries.(Image source: Press et al. 2022).


Tree of Thoughts (Yao et al. 2023) extends CoT by exploring multiple reasoning possibilities at each step. It first decomposes the problem into multiple thought steps and generates multiple thoughts per step, essentially creating a tree structure. The search process can be BFS or DFS while each state is evaluated by a classifier (via a prompt) or majority vote.



How Self-Ask works with external search queries.(Image source: Yao et al. 2022).

Automatic Prompt Design#
Prompt is a sequence of prefix tokens that increase the probability of getting  desired output given input. Therefore we can treat them as trainable parameters and optimize them directly on the embedding space via gradient descent, such as AutoPrompt (Shin et al., 2020, Prefix-Tuning (Li &amp; Liang (2021)), P-tuning (Liu et al. 2021) and Prompt-Tuning (Lester et al. 2021). This section in my “Controllable Neural Text Generation” post has a 
</code></pre>
<blockquote>
<p>Pour le <code translate="no">connection_args</code>:</p>
<ul>
<li>Définir <code translate="no">uri</code> comme un fichier local, par exemple<code translate="no">./milvus_agentic_rag.db</code>, est la méthode la plus pratique, car elle utilise automatiquement <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> pour stocker toutes les données dans ce fichier.</li>
<li>Si vous avez des données à grande échelle, vous pouvez configurer un serveur Milvus plus performant sur <a href="https://milvus.io/docs/quickstart.md">docker ou kubernetes</a>. Dans cette configuration, veuillez utiliser l'uri du serveur, par exemple<code translate="no">http://localhost:19530</code>, comme votre <code translate="no">uri</code>.</li>
<li>Si vous souhaitez utiliser <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service cloud entièrement géré pour Milvus, ajustez les adresses <code translate="no">uri</code> et <code translate="no">token</code>, qui correspondent au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">point de terminaison public et à la clé Api</a> dans Zilliz Cloud.</li>
</ul>
</blockquote>
<h2 id="Build-the-agentic-RAG-graph" class="common-anchor-header">Construire le graphe RAG agentique<button data-href="#Build-the-agentic-RAG-graph" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Define-the-graph-state" class="common-anchor-header">Définir l'état du graphe<button data-href="#Define-the-graph-state" class="anchor-icon" translate="no">
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
    </button></h3><p>Nous utiliserons LangGraph's <code translate="no">MessagesState</code> qui maintient une liste de messages dans la conversation.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langgraph.graph <span class="hljs-keyword">import</span> MessagesState
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI

<span class="hljs-comment"># Initialize the language model</span>
llm = ChatOpenAI(model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>, temperature=<span class="hljs-number">0</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Node-1-Generate-query-or-respond" class="common-anchor-header">Nœud 1 : Générer une requête ou répondre<button data-href="#Node-1-Generate-query-or-respond" class="anchor-icon" translate="no">
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
    </button></h3><p>Ce nœud décide s'il faut utiliser l'outil de recherche d'informations ou répondre directement à l'utilisateur.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_query_or_respond</span>(<span class="hljs-params">state: MessagesState</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Decide whether to retrieve information or respond directly.

    Args:
        state: Current graph state with messages

    Returns:
        Updated state with the model&#x27;s response
    &quot;&quot;&quot;</span>
    response = llm.bind_tools([retriever_tool]).invoke(state[<span class="hljs-string">&quot;messages&quot;</span>])
    <span class="hljs-keyword">return</span> {<span class="hljs-string">&quot;messages&quot;</span>: [response]}


<span class="hljs-comment"># Test with a simple greeting</span>
test_state = {<span class="hljs-string">&quot;messages&quot;</span>: [{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Hello!&quot;</span>}]}
result = generate_query_or_respond(test_state)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Response to greeting:&quot;</span>, result[<span class="hljs-string">&quot;messages&quot;</span>][-<span class="hljs-number">1</span>].content)

<span class="hljs-comment"># Test with a question that needs retrieval</span>
test_state = {
    <span class="hljs-string">&quot;messages&quot;</span>: [
        {
            <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
            <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;What is Chain of Thought prompting and how does it work?&quot;</span>,
        }
    ]
}
result = generate_query_or_respond(test_state)
<span class="hljs-keyword">if</span> <span class="hljs-built_in">hasattr</span>(result[<span class="hljs-string">&quot;messages&quot;</span>][-<span class="hljs-number">1</span>], <span class="hljs-string">&quot;tool_calls&quot;</span>) <span class="hljs-keyword">and</span> result[<span class="hljs-string">&quot;messages&quot;</span>][-<span class="hljs-number">1</span>].tool_calls:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Model decided to use retrieval tool&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Tool call:&quot;</span>, result[<span class="hljs-string">&quot;messages&quot;</span>][-<span class="hljs-number">1</span>].tool_calls[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Response to greeting: Hello! How can I assist you today?
Model decided to use retrieval tool
Tool call: {'name': 'retrieve_blog_posts', 'args': {'query': 'Chain of Thought prompting'}, 'id': 'call_UI804LXgqZ3Y7qFvdsWFuKZH', 'type': 'tool_call'}
</code></pre>
<h3 id="Node-2-Grade-documents" class="common-anchor-header">Nœud 2 : Classer les documents<button data-href="#Node-2-Grade-documents" class="anchor-icon" translate="no">
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
    </button></h3><p>Ce nœud évalue si les documents récupérés sont pertinents par rapport à la question de l'utilisateur.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pydantic <span class="hljs-keyword">import</span> BaseModel, Field
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">Literal</span>


<span class="hljs-keyword">class</span> <span class="hljs-title class_">GradeDocuments</span>(<span class="hljs-title class_ inherited__">BaseModel</span>):
    <span class="hljs-string">&quot;&quot;&quot;Binary score for relevance check on retrieved documents.&quot;&quot;&quot;</span>

    binary_score: <span class="hljs-built_in">str</span> = Field(
        description=<span class="hljs-string">&quot;Documents are relevant to the question, &#x27;yes&#x27; or &#x27;no&#x27;&quot;</span>
    )


<span class="hljs-keyword">def</span> <span class="hljs-title function_">grade_documents</span>(<span class="hljs-params">state: MessagesState</span>) -&gt; <span class="hljs-type">Literal</span>[<span class="hljs-string">&quot;generate&quot;</span>, <span class="hljs-string">&quot;rewrite&quot;</span>]:
    <span class="hljs-string">&quot;&quot;&quot;
    Determines whether the retrieved documents are relevant to the question.

    Args:
        state: Current graph state with messages

    Returns:
        Decision to generate answer or rewrite question
    &quot;&quot;&quot;</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;---CHECK DOCUMENT RELEVANCE TO QUESTION---&quot;</span>)

    <span class="hljs-comment"># Get the question and retrieved documents</span>
    question = state[<span class="hljs-string">&quot;messages&quot;</span>][<span class="hljs-number">0</span>].content
    docs = state[<span class="hljs-string">&quot;messages&quot;</span>][-<span class="hljs-number">1</span>].content

    <span class="hljs-comment"># Create structured LLM grader</span>
    structured_llm_grader = llm.with_structured_output(GradeDocuments)

    <span class="hljs-comment"># Grade prompt</span>
    grade_prompt = <span class="hljs-string">f&quot;&quot;&quot;You are a grader assessing relevance of a retrieved document to a user question.
    
    Retrieved document:
    <span class="hljs-subst">{docs}</span>
    
    User question:
    <span class="hljs-subst">{question}</span>
    
    If the document contains keyword(s) or semantic meaning related to the user question, grade it as relevant.
    Give a binary score &#x27;yes&#x27; or &#x27;no&#x27; to indicate whether the document is relevant to the question.&quot;&quot;&quot;</span>

    score = structured_llm_grader.invoke(
        [{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: grade_prompt}]
    ).binary_score

    <span class="hljs-keyword">if</span> score == <span class="hljs-string">&quot;yes&quot;</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;---DECISION: DOCS RELEVANT---&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;generate&quot;</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;---DECISION: DOCS NOT RELEVANT---&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;rewrite&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Node-3-Rewrite-question" class="common-anchor-header">Nœud 3 : Réécrire la question<button data-href="#Node-3-Rewrite-question" class="anchor-icon" translate="no">
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
    </button></h3><p>Si les documents ne sont pas pertinents, ce nœud réécrit la question pour améliorer les résultats de la recherche.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">rewrite_question</span>(<span class="hljs-params">state: MessagesState</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Transform the query to produce a better question.

    Args:
        state: Current graph state with messages

    Returns:
        Updated state with rewritten question
    &quot;&quot;&quot;</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;---TRANSFORM QUERY---&quot;</span>)

    question = state[<span class="hljs-string">&quot;messages&quot;</span>][<span class="hljs-number">0</span>].content

    rewrite_prompt = <span class="hljs-string">f&quot;&quot;&quot;You are an expert at query expansion and transformation.
    
    Look at the input question and try to reason about the underlying semantic intent / meaning.
    
    Here is the initial question:
    <span class="hljs-subst">{question}</span>
    
    Formulate an improved question that will retrieve better documents from a vector database:&quot;&quot;&quot;</span>

    response = llm.invoke([{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: rewrite_prompt}])

    <span class="hljs-keyword">return</span> {<span class="hljs-string">&quot;messages&quot;</span>: [{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: response.content}]}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Node-4-Generate-answer" class="common-anchor-header">Nœud 4 : Générer la réponse<button data-href="#Node-4-Generate-answer" class="anchor-icon" translate="no">
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
    </button></h3><p>Ce nœud génère la réponse finale sur la base des documents pertinents retrouvés.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate</span>(<span class="hljs-params">state: MessagesState</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Generate answer based on retrieved documents.

    Args:
        state: Current graph state with messages

    Returns:
        Updated state with generated answer
    &quot;&quot;&quot;</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;---GENERATE ANSWER---&quot;</span>)

    question = state[<span class="hljs-string">&quot;messages&quot;</span>][<span class="hljs-number">0</span>].content
    docs = state[<span class="hljs-string">&quot;messages&quot;</span>][-<span class="hljs-number">1</span>].content

    <span class="hljs-comment"># RAG generation prompt</span>
    rag_prompt = <span class="hljs-string">f&quot;&quot;&quot;You are an assistant for question-answering tasks.
    
    Use the following pieces of retrieved context to answer the question.
    
    If you don&#x27;t know the answer, just say that you don&#x27;t know.
    
    Use three sentences maximum and keep the answer concise.
    
    Question: <span class="hljs-subst">{question}</span>
    
    Context: <span class="hljs-subst">{docs}</span>
    
    Answer:&quot;&quot;&quot;</span>

    response = llm.invoke([{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: rag_prompt}])

    <span class="hljs-keyword">return</span> {<span class="hljs-string">&quot;messages&quot;</span>: [response]}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Assemble-the-graph" class="common-anchor-header">Assembler le graphe<button data-href="#Assemble-the-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>Nous allons maintenant relier tous les nœuds entre eux pour créer notre flux de travail RAG agentique.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langgraph.graph <span class="hljs-keyword">import</span> StateGraph, START, END
<span class="hljs-keyword">from</span> langgraph.prebuilt <span class="hljs-keyword">import</span> ToolNode, tools_condition

<span class="hljs-comment"># Create the graph</span>
workflow = StateGraph(MessagesState)

<span class="hljs-comment"># Add nodes</span>
workflow.add_node(<span class="hljs-string">&quot;generate_query_or_respond&quot;</span>, generate_query_or_respond)
workflow.add_node(<span class="hljs-string">&quot;retrieve&quot;</span>, ToolNode([retriever_tool]))
workflow.add_node(<span class="hljs-string">&quot;rewrite&quot;</span>, rewrite_question)
workflow.add_node(<span class="hljs-string">&quot;generate&quot;</span>, generate)

<span class="hljs-comment"># Add edges</span>
workflow.add_edge(START, <span class="hljs-string">&quot;generate_query_or_respond&quot;</span>)

<span class="hljs-comment"># Conditional edge: decide whether to retrieve or end</span>
workflow.add_conditional_edges(
    <span class="hljs-string">&quot;generate_query_or_respond&quot;</span>,
    tools_condition,
    {
        <span class="hljs-string">&quot;tools&quot;</span>: <span class="hljs-string">&quot;retrieve&quot;</span>,  <span class="hljs-comment"># If tool call, go to retrieve</span>
        END: END,  <span class="hljs-comment"># If no tool call, end (direct response)</span>
    },
)

<span class="hljs-comment"># Conditional edge: grade documents</span>
workflow.add_conditional_edges(
    <span class="hljs-string">&quot;retrieve&quot;</span>,
    grade_documents,
    {
        <span class="hljs-string">&quot;generate&quot;</span>: <span class="hljs-string">&quot;generate&quot;</span>,  <span class="hljs-comment"># If relevant, generate answer</span>
        <span class="hljs-string">&quot;rewrite&quot;</span>: <span class="hljs-string">&quot;rewrite&quot;</span>,  <span class="hljs-comment"># If not relevant, rewrite question</span>
    },
)

<span class="hljs-comment"># After rewriting, try to generate query again</span>
workflow.add_edge(<span class="hljs-string">&quot;rewrite&quot;</span>, <span class="hljs-string">&quot;generate_query_or_respond&quot;</span>)

<span class="hljs-comment"># After generating answer, end</span>
workflow.add_edge(<span class="hljs-string">&quot;generate&quot;</span>, END)

<span class="hljs-comment"># Compile the graph</span>
graph = workflow.<span class="hljs-built_in">compile</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Visualisons la structure du graphe pour comprendre le flux de travail :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> Image, display

<span class="hljs-comment"># Visualize the graph</span>
display(Image(graph.get_graph().draw_mermaid_png()))
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/agentic_rag_with_milvus_and_langgraph_21_0.png" alt="png" class="doc-image" id="png" />
   </span> <span class="img-wrapper"> <span>png</span> </span></p>
<h2 id="Run-the-agentic-RAG-system" class="common-anchor-header">Exécuter le système RAG agentique<button data-href="#Run-the-agentic-RAG-system" class="anchor-icon" translate="no">
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
    </button></h2><p>Testons maintenant notre système RAG agentique avec différents types de requêtes.</p>
<h3 id="Test-1-Simple-greeting-no-retrieval-needed" class="common-anchor-header">Test 1 : Simple message d'accueil (aucune recherche nécessaire)<button data-href="#Test-1-Simple-greeting-no-retrieval-needed" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">inputs = {<span class="hljs-string">&quot;messages&quot;</span>: [{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Hello! How are you?&quot;</span>}]}

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;=&quot;</span> * <span class="hljs-number">50</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Test 1: Simple greeting&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;=&quot;</span> * <span class="hljs-number">50</span>)

<span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> graph.stream(inputs):
    <span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> output.items():
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Node &#x27;<span class="hljs-subst">{key}</span>&#x27;:&quot;</span>)
        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;messages&quot;</span> <span class="hljs-keyword">in</span> value:
            value[<span class="hljs-string">&quot;messages&quot;</span>][-<span class="hljs-number">1</span>].pretty_print()
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">==================================================
Test 1: Simple greeting
==================================================
Node 'generate_query_or_respond':
==================================[1m Ai Message [0m==================================

Hello! I'm just a program, so I don't have feelings, but I'm here and ready to help you. How can I assist you today?
</code></pre>
<h3 id="Test-2-Question-requiring-retrieval" class="common-anchor-header">Test 2 : Question nécessitant une recherche<button data-href="#Test-2-Question-requiring-retrieval" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">inputs = {
    <span class="hljs-string">&quot;messages&quot;</span>: [
        {
            <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
            <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;What are the main components and building blocks of an AI agent system?&quot;</span>,
        }
    ]
}

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;=&quot;</span> * <span class="hljs-number">50</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Test 2: Question requiring retrieval&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;=&quot;</span> * <span class="hljs-number">50</span>)

<span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> graph.stream(inputs):
    <span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> output.items():
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Node &#x27;<span class="hljs-subst">{key}</span>&#x27;:&quot;</span>)
        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;messages&quot;</span> <span class="hljs-keyword">in</span> value:
            <span class="hljs-built_in">print</span>(value[<span class="hljs-string">&quot;messages&quot;</span>][-<span class="hljs-number">1</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span> * <span class="hljs-number">50</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">==================================================
Test 2: Question requiring retrieval
==================================================
Node 'generate_query_or_respond':
content='' additional_kwargs={'tool_calls': [{'id': 'call_HJXekNMWmnlgp9EcJlD5Tpvk', 'function': {'arguments': '{&quot;query&quot;:&quot;AI agent system components building blocks&quot;}', 'name': 'retrieve_blog_posts'}, 'type': 'function'}], 'refusal': None} response_metadata={'token_usage': {'completion_tokens': 20, 'prompt_tokens': 89, 'total_tokens': 109, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_560af6e559', 'id': 'chatcmpl-CTjEx6R7mmeyEBX9EnOSlUGtvPL9L', 'service_tier': 'default', 'finish_reason': 'tool_calls', 'logprobs': None} id='run--954ed7ac-d780-4c7d-925f-3ffe959804b9-0' tool_calls=[{'name': 'retrieve_blog_posts', 'args': {'query': 'AI agent system components building blocks'}, 'id': 'call_HJXekNMWmnlgp9EcJlD5Tpvk', 'type': 'tool_call'}] usage_metadata={'input_tokens': 89, 'output_tokens': 20, 'total_tokens': 109, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}
--------------------------------------------------
---CHECK DOCUMENT RELEVANCE TO QUESTION---
---DECISION: DOCS RELEVANT---
Node 'retrieve':
content='LLM Powered Autonomous Agents | Lil\'Log\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nLil\'Log\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n|\n\n\n\n\n\n\nPosts\n\n\n\n\nArchive\n\n\n\n\nSearch\n\n\n\n\nTags\n\n\n\n\nFAQ\n\n\n\n\n\n\n\n\n\n      LLM Powered Autonomous Agents\n    \nDate: June 23, 2023  |  Estimated Reading Time: 31 min  |  Author: Lilian Weng\n\n\n \n\n\nTable of Contents\n\n\n\nAgent System Overview\n\nComponent One: Planning\n\nTask Decomposition\n\nSelf-Reflection\n\n\nComponent Two: Memory\n\nTypes of Memory\n\nMaximum Inner Product Search (MIPS)\n\n\nComponent Three: Tool Use\n\nCase Studies\n\nScientific Discovery Agent\n\nGenerative Agents Simulation\n\nProof-of-Concept Examples\n\n\nChallenges\n\nCitation\n\nReferences\n\n\n\n\n\nBuilding agents with LLM (large language model) as its core controller is a cool concept. Several proof-of-concepts demos, such as AutoGPT, GPT-Engineer and BabyAGI, serve as inspiring examples. The potentiality of LLM extends beyond generating well-written copies, stories, essays and programs; it can be framed as a powerful general problem solver.\nAgent System Overview#\nIn a LLM-powered autonomous agent system, LLM functions as the agent’s brain, complemented by several key components:\n\nPlanning\n\nSubgoal and decomposition: The agent breaks down large tasks into smaller, manageable subgoals, enabling efficient handling of complex tasks.\nReflection and refinement: The agent can do self-criticism and self-reflection over past actions, learn from mistakes and refine them for future steps, thereby improving the quality of final results.\n\n\nMemory\n\nShort-term memory: I would consider all the in-context learning (See Prompt Engineering) as utilizing short-term memory of the model to learn.\nLong-term memory: This provides the agent with the capability to retain and recall (infinite) information over extended periods, often by leveraging an external vector store and fast retrieval.\n\n\nTool use\n\nThe agent learns to call external APIs for extra information that is missing from the model weights (often hard to change after pre-training), including current information, code execution capability, access to proprietary information sources and more.\n\n\n\n\n\nOverview of a LLM-powered autonomous agent system.\n\n}\n]\nChallenges#\nAfter going through key ideas and demos of building LLM-centered agents, I start to see a couple common limitations:\n\nMemory\n\nShort-term memory: I would consider all the in-context learning (See Prompt Engineering) as utilizing short-term memory of the model to learn.\nLong-term memory: This provides the agent with the capability to retain and recall (infinite) information over extended periods, often by leveraging an external vector store and fast retrieval.\n\n\nTool use\n\nThe agent learns to call external APIs for extra information that is missing from the model weights (often hard to change after pre-training), including current information, code execution capability, access to proprietary information sources and more.\n\n\n\n\n\nOverview of a LLM-powered autonomous agent system.\n\nComponent One: Planning#\nA complicated task usually involves many steps. An agent needs to know what they are and plan ahead.\nTask Decomposition#\nChain of thought (CoT; Wei et al. 2022) has become a standard prompting technique for enhancing model performance on complex tasks. The model is instructed to “think step by step” to utilize more test-time computation to decompose hard tasks into smaller and simpler steps. CoT transforms big tasks into multiple manageable tasks and shed lights into an interpretation of the model’s thinking process.\nTree of Thoughts (Yao et al. 2023) extends CoT by exploring multiple reasoning possibilities at each step. It first decomposes the problem into multiple thought steps and generates multiple thoughts per step, creating a tree structure. The search process can be BFS (breadth-first search) or DFS (depth-first search) with each state evaluated by a classifier (via a prompt) or majority vote.\nTask decomposition can be done (1) by LLM with simple prompting like &quot;Steps for XYZ.\\n1.&quot;, &quot;What are the subgoals for achieving XYZ?&quot;, (2) by using task-specific instructions; e.g. &quot;Write a story outline.&quot; for writing a novel, or (3) with human inputs.\nAnother quite distinct approach, LLM+P (Liu et al. 2023), involves relying on an external classical planner to do long-horizon planning. This approach utilizes the Planning Domain Definition Language (PDDL) as an intermediate interface to describe the planning problem. In this process, LLM (1) translates the problem into “Problem PDDL”, then (2) requests a classical planner to generate a PDDL plan based on an existing “Domain PDDL”, and finally (3) translates the PDDL plan back into natural language. Essentially, the planning step is outsourced to an external tool, assuming the availability of domain-specific PDDL and a suitable planner which is common in certain robotic setups but not in many other domains.\nSelf-Reflection#\nSelf-reflection is a vital aspect that allows autonomous agents to improve iteratively by refining past action decisions and correcting previous mistakes. It plays a crucial role in real-world tasks where trial and error are inevitable.\nReAct (Yao et al. 2023) integrates reasoning and acting within LLM by extending the action space to be a combination of task-specific discrete actions and the language space. The former enables LLM to interact with the environment (e.g. use Wikipedia search API), while the latter prompting LLM to generate reasoning traces in natural language.\nThe ReAct prompt template incorporates explicit steps for LLM to think, roughly formatted as:\nThought: ...\nAction: ...\nObservation: ...\n... (Repeated many times)\n\n\nExamples of reasoning trajectories for knowledge-intensive tasks (e.g. HotpotQA, FEVER) and decision-making tasks (e.g. AlfWorld Env, WebShop). (Image source: Yao et al. 2023).\n\nIn both experiments on knowledge-intensive tasks and decision-making tasks, ReAct works better than the Act-only baseline where Thought: … step is removed.\nReflexion (Shinn &amp; Labash 2023) is a framework to equip agents with dynamic memory and self-reflection capabilities to improve reasoning skills. Reflexion has a standard RL setup, in which the reward model provides a simple binary reward and the action space follows the setup in ReAct where the task-specific action space is augmented with language to enable complex reasoning steps. After each action $a_t$, the agent computes a heuristic $h_t$ and optionally may decide to reset the environment to start a new trial depending on the self-reflection results.\n\n\nIllustration of the Reflexion framework. (Image source: Shinn &amp; Labash, 2023)' name='retrieve_blog_posts' id='4c4669e8-334d-4e53-ae76-e5d09ab2ac2e' tool_call_id='call_HJXekNMWmnlgp9EcJlD5Tpvk'
--------------------------------------------------
---GENERATE ANSWER---
Node 'generate':
content='The main components of an AI agent system include planning, memory, and tool use. Planning involves task decomposition and self-reflection to manage complex tasks effectively. Memory encompasses both short-term and long-term capabilities, while tool use allows the agent to access external APIs for additional information and functionalities.' additional_kwargs={'refusal': None} response_metadata={'token_usage': {'completion_tokens': 57, 'prompt_tokens': 1418, 'total_tokens': 1475, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_560af6e559', 'id': 'chatcmpl-CTjF1AqlJii7yqnIC3TcL41gM3elg', 'service_tier': 'default', 'finish_reason': 'stop', 'logprobs': None} id='run--10e8cfc1-5671-49a5-8b6c-b6b6ebc68492-0' usage_metadata={'input_tokens': 1418, 'output_tokens': 57, 'total_tokens': 1475, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}
--------------------------------------------------
</code></pre>
<h3 id="Test-3-Question-that-might-trigger-rewrite" class="common-anchor-header">Test 3 : Question susceptible de déclencher une réécriture<button data-href="#Test-3-Question-that-might-trigger-rewrite" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">inputs = {
    <span class="hljs-string">&quot;messages&quot;</span>: [
        {
            <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
            <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;How do we defend against potential risks in AI systems?&quot;</span>,
        }
    ]
}

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;=&quot;</span> * <span class="hljs-number">50</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Test 3: Question that might need rewriting&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;=&quot;</span> * <span class="hljs-number">50</span>)

<span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> graph.stream(inputs):
    <span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> output.items():
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Node &#x27;<span class="hljs-subst">{key}</span>&#x27;:&quot;</span>)
        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;messages&quot;</span> <span class="hljs-keyword">in</span> value:
            <span class="hljs-built_in">print</span>(value[<span class="hljs-string">&quot;messages&quot;</span>][-<span class="hljs-number">1</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span> * <span class="hljs-number">50</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">==================================================
Test 3: Question that might need rewriting
==================================================
Node 'generate_query_or_respond':
content='' additional_kwargs={'tool_calls': [{'id': 'call_9N22LV1M3IGDR8t3DaWplR0n', 'function': {'arguments': '{&quot;query&quot;:&quot;defend against risks in AI systems&quot;}', 'name': 'retrieve_blog_posts'}, 'type': 'function'}], 'refusal': None} response_metadata={'token_usage': {'completion_tokens': 21, 'prompt_tokens': 86, 'total_tokens': 107, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_560af6e559', 'id': 'chatcmpl-CTjF3askTBa5upgmWx2ftdwogs6JU', 'service_tier': 'default', 'finish_reason': 'tool_calls', 'logprobs': None} id='run--1dcefc0d-acb2-4771-8b27-484a56ab32be-0' tool_calls=[{'name': 'retrieve_blog_posts', 'args': {'query': 'defend against risks in AI systems'}, 'id': 'call_9N22LV1M3IGDR8t3DaWplR0n', 'type': 'tool_call'}] usage_metadata={'input_tokens': 86, 'output_tokens': 21, 'total_tokens': 107, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}
--------------------------------------------------
---CHECK DOCUMENT RELEVANCE TO QUESTION---
---DECISION: DOCS NOT RELEVANT---
Node 'retrieve':
content=&quot;Nlp\nLanguage-Model\nSafety\nAdversarial Attacks\nRobustness\nRedteam\n\n\n\n« \n\nThinking about High-Quality Human Data\n\n\n »\n\nLLM Powered Autonomous Agents\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n© 2025 Lil'Log\n\n        Powered by\n        Hugo &amp;\n        PaperMod\n\nThe adversarial writing interface, composed of (Top Left) a list of top five predictions by the model, (Bottom Right) User questions with words highlighted according to word importance. (Image source: Wallace et al. 2019)\n\nIn an experiment where human trainers are instructed to find failure cases for a safety classifier on violent content, Ziegler et al. (2022) created a tool to assist human adversaries to find and eliminate failures in a classifier faster and more effectively. Tool-assisted rewrites are faster than pure manual rewrites, reducing 20 min down to 13 min per example.\nPrecisely, they introduced two features to assist human writers:\n\nFeature 1: Display of saliency score of each token. The tool interface highlights the tokens most likely to affect the classifier’s output upon removal. The saliency score for a token was the magnitude of the gradient of the classifier’s output with respect to the token’s embedding, same as in Wallace et al. (2019)\nFeature 2: Token substitution and insertion. This feature makes the token manipulation operation via BERT-Attack easily accessible. The token updates then get reviewed by human writers. Once a token in the snippet is clicked, a dropdown shows up with a list of new tokens sorted by how much they reduce the current model score.\n\n\n\nUI for humans to do tool-assisted adversarial attack on a classifier. Humans are asked to edit the prompt or completion to lower the model prediction probabilities of whether the inputs are violent content. (Image source: Ziegler et al. 2022)\n\nBot-Adversarial Dialogue (BAD; Xu et al. 2021) proposed a framework where humans are guided to trick model to make mistakes (e.g. output unsafe content). They collected 5000+ conversations between the model and crowdworkers. Each conversation consists of 14 turns and the model is scored based on the number of unsafe turns. Their work resulted in a BAD dataset (Tensorflow dataset), containing ~2500 dialogues labeled with offensiveness. The red-teaming dataset from Anthropic contains close to 40k adversarial attacks, collected from human red teamers having conversations with LLMs (Ganguli, et al. 2022). They found RLHF models are harder to be attacked as they scale up. Human expert red-teaming is commonly used for all safety preparedness work for big model releases at OpenAI, such as GPT-4 and DALL-E 3.\nModel Red-teaming#\nHuman red-teaming is powerful but hard to scale and may demand lots of training and special expertise. Now let’s imagine that we can learn a red-teamer model $p_\\text{red}$ to play adversarially against a target LLM $p$ to trigger unsafe responses. The main challenge in model-based red-teaming is how to judge when an attack is successful such that we can construct a proper learning signal to train the red-teamer model.\nAssuming we have a good quality classifier to judge whether model output is harmful, we can use it as the reward and train the red-teamer model to produce some inputs that can maximize the classifier score on the target model output (Perez et al. 2022). Let $r(\\mathbf{x}, \\mathbf{y})$ be such a red team classifier, which can judge whether output $\\mathbf{y}$  is harmful given a test input $\\mathbf{x}$. Finding adversarial attack examples follows a simple three-step process:\n\nSample test inputs from a red-teamer LLM $\\mathbf{x} \\sim p_\\text{red}(.)$.\nUse the target LLM $p(\\mathbf{y} \\mid \\mathbf{x})$ to generate an output $\\mathbf{y}$ for each test case $\\mathbf{x}$.\nIdentify a subset of test cases leading to harmful output according to the classifier $r(\\mathbf{x}, \\mathbf{y})$.\n\nThey experimented with several ways for sampling from the red team model or further training the red team model to be more effective,\n\nNlp\nLanguage-Model\nAgent\nSteerability\nPrompting\n\n\n\n« \n\nAdversarial Attacks on LLMs\n\n\n »\n\nPrompt Engineering\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n© 2025 Lil'Log\n\n        Powered by\n        Hugo &amp;\n        PaperMod&quot; name='retrieve_blog_posts' id='e6f8b6e2-45c7-4103-bb1d-9a404658ab3b' tool_call_id='call_9N22LV1M3IGDR8t3DaWplR0n'
--------------------------------------------------
---TRANSFORM QUERY---
Node 'rewrite':
{'role': 'user', 'content': 'To improve the question for better retrieval of relevant documents from a vector database, we can expand on the specific aspects of defending against risks in AI systems. This includes identifying types of risks, strategies for mitigation, and best practices. \n\nAn improved question could be:\n\n&quot;What are the best practices and strategies for mitigating risks associated with AI systems, including ethical concerns, security vulnerabilities, and operational challenges?&quot; \n\nThis formulation is more specific and likely to yield documents that address various dimensions of risk management in AI.'}
--------------------------------------------------
Node 'generate_query_or_respond':
content='' additional_kwargs={'tool_calls': [{'id': 'call_RUetsoG9a1qkxBf3MOqV37Nx', 'function': {'arguments': '{&quot;query&quot;:&quot;best practices strategies mitigating risks AI systems ethical concerns security vulnerabilities operational challenges&quot;}', 'name': 'retrieve_blog_posts'}, 'type': 'function'}], 'refusal': None} response_metadata={'token_usage': {'completion_tokens': 27, 'prompt_tokens': 1150, 'total_tokens': 1177, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_560af6e559', 'id': 'chatcmpl-CTjF8a9gSsBmV5v0ckOoaqQzgXnPe', 'service_tier': 'default', 'finish_reason': 'tool_calls', 'logprobs': None} id='run--091b7992-a65c-4659-9c12-68e5bed8dd25-0' tool_calls=[{'name': 'retrieve_blog_posts', 'args': {'query': 'best practices strategies mitigating risks AI systems ethical concerns security vulnerabilities operational challenges'}, 'id': 'call_RUetsoG9a1qkxBf3MOqV37Nx', 'type': 'tool_call'}] usage_metadata={'input_tokens': 1150, 'output_tokens': 27, 'total_tokens': 1177, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}
--------------------------------------------------
---CHECK DOCUMENT RELEVANCE TO QUESTION---
---DECISION: DOCS RELEVANT---
Node 'retrieve':
content=&quot;}\n]\nChallenges#\nAfter going through key ideas and demos of building LLM-centered agents, I start to see a couple common limitations:\n\nNlp\nLanguage-Model\nSafety\nAdversarial Attacks\nRobustness\nRedteam\n\n\n\n« \n\nThinking about High-Quality Human Data\n\n\n »\n\nLLM Powered Autonomous Agents\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n© 2025 Lil'Log\n\n        Powered by\n        Hugo &amp;\n        PaperMod\n\nThe adversarial writing interface, composed of (Top Left) a list of top five predictions by the model, (Bottom Right) User questions with words highlighted according to word importance. (Image source: Wallace et al. 2019)\n\nIn an experiment where human trainers are instructed to find failure cases for a safety classifier on violent content, Ziegler et al. (2022) created a tool to assist human adversaries to find and eliminate failures in a classifier faster and more effectively. Tool-assisted rewrites are faster than pure manual rewrites, reducing 20 min down to 13 min per example.\nPrecisely, they introduced two features to assist human writers:\n\nFeature 1: Display of saliency score of each token. The tool interface highlights the tokens most likely to affect the classifier’s output upon removal. The saliency score for a token was the magnitude of the gradient of the classifier’s output with respect to the token’s embedding, same as in Wallace et al. (2019)\nFeature 2: Token substitution and insertion. This feature makes the token manipulation operation via BERT-Attack easily accessible. The token updates then get reviewed by human writers. Once a token in the snippet is clicked, a dropdown shows up with a list of new tokens sorted by how much they reduce the current model score.\n\n\n\nUI for humans to do tool-assisted adversarial attack on a classifier. Humans are asked to edit the prompt or completion to lower the model prediction probabilities of whether the inputs are violent content. (Image source: Ziegler et al. 2022)\n\nBot-Adversarial Dialogue (BAD; Xu et al. 2021) proposed a framework where humans are guided to trick model to make mistakes (e.g. output unsafe content). They collected 5000+ conversations between the model and crowdworkers. Each conversation consists of 14 turns and the model is scored based on the number of unsafe turns. Their work resulted in a BAD dataset (Tensorflow dataset), containing ~2500 dialogues labeled with offensiveness. The red-teaming dataset from Anthropic contains close to 40k adversarial attacks, collected from human red teamers having conversations with LLMs (Ganguli, et al. 2022). They found RLHF models are harder to be attacked as they scale up. Human expert red-teaming is commonly used for all safety preparedness work for big model releases at OpenAI, such as GPT-4 and DALL-E 3.\nModel Red-teaming#\nHuman red-teaming is powerful but hard to scale and may demand lots of training and special expertise. Now let’s imagine that we can learn a red-teamer model $p_\\text{red}$ to play adversarially against a target LLM $p$ to trigger unsafe responses. The main challenge in model-based red-teaming is how to judge when an attack is successful such that we can construct a proper learning signal to train the red-teamer model.\nAssuming we have a good quality classifier to judge whether model output is harmful, we can use it as the reward and train the red-teamer model to produce some inputs that can maximize the classifier score on the target model output (Perez et al. 2022). Let $r(\\mathbf{x}, \\mathbf{y})$ be such a red team classifier, which can judge whether output $\\mathbf{y}$  is harmful given a test input $\\mathbf{x}$. Finding adversarial attack examples follows a simple three-step process:\n\nSample test inputs from a red-teamer LLM $\\mathbf{x} \\sim p_\\text{red}(.)$.\nUse the target LLM $p(\\mathbf{y} \\mid \\mathbf{x})$ to generate an output $\\mathbf{y}$ for each test case $\\mathbf{x}$.\nIdentify a subset of test cases leading to harmful output according to the classifier $r(\\mathbf{x}, \\mathbf{y})$.\n\nThey experimented with several ways for sampling from the red team model or further training the red team model to be more effective,&quot; name='retrieve_blog_posts' id='837e68db-243a-4124-b68f-f00dab8473d6' tool_call_id='call_RUetsoG9a1qkxBf3MOqV37Nx'
--------------------------------------------------
---GENERATE ANSWER---
Node 'generate':
content='To defend against potential risks in AI systems, we can employ human red-teaming to identify and mitigate unsafe outputs through adversarial testing. This involves using tools that assist human trainers in finding failure cases and employing classifiers to judge harmful outputs. Additionally, training red-teamer models can help automate the process of generating adversarial inputs to improve system robustness.' additional_kwargs={'refusal': None} response_metadata={'token_usage': {'completion_tokens': 69, 'prompt_tokens': 988, 'total_tokens': 1057, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-mini-2024-07-18', 'system_fingerprint': 'fp_560af6e559', 'id': 'chatcmpl-CTjFAhtrJfiBetBCYUeDD1llfGRoG', 'service_tier': 'default', 'finish_reason': 'stop', 'logprobs': None} id='run--7da130b2-fe12-47ce-9daa-9209d2f18a8e-0' usage_metadata={'input_tokens': 988, 'output_tokens': 69, 'total_tokens': 1057, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}}
--------------------------------------------------
</code></pre>
<h2 id="Summary" class="common-anchor-header">Résumé<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans ce tutoriel, nous avons construit un système de RAG agentique utilisant LangGraph et Milvus qui peut décider intelligemment quand récupérer l'information, évaluer la pertinence des documents et réécrire les requêtes pour obtenir de meilleurs résultats. Cette approche offre des avantages significatifs par rapport aux systèmes RAG traditionnels, notamment une meilleure expérience utilisateur grâce à un routage intelligent, des réponses de meilleure qualité grâce à l'évaluation des documents et une récupération améliorée grâce à la réécriture des requêtes. Vous pouvez étendre ce système en ajoutant une logique de classement plus sophistiquée, en mettant en œuvre des stratégies de recherche multiples ou en incorporant des outils et des sources de données supplémentaires.</p>
