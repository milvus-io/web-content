---
id: llama_stack_with_milvus.md
title: Construire RAG avec Llama Stack avec Milvus
related_key: Llama Stack
summary: >-
  Ce tutoriel présente comment construire un serveur Llama Stack configuré avec
  Milvus, vous permettant d'importer vos données privées pour servir de base de
  connaissances. Nous effectuerons ensuite des requêtes sur le serveur, créant
  ainsi une application RAG complète.
---
<h1 id="Build-RAG-with-Llama-Stack-with-Milvus" class="common-anchor-header">Construire RAG avec Llama Stack avec Milvus<button data-href="#Build-RAG-with-Llama-Stack-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/meta-llama/llama-stack/tree/main">Llama Stack</a> est une approche orientée service, API-first, pour la création d'applications d'IA de production. Elle fournit une pile universelle qui permet aux développeurs de développer n'importe où, de déployer n'importe où et d'utiliser des blocs de construction prêts pour la production avec une véritable indépendance vis-à-vis des fournisseurs. La pile Llama se concentre sur les modèles Llama de Meta, la composabilité, l'aptitude à la production et un écosystème de partenaires.</p>
<p>Dans ce tutoriel, nous allons vous présenter comment construire un serveur Llama Stack configuré avec Milvus, vous permettant d'importer vos données privées pour servir de base de connaissances. Nous effectuerons ensuite des requêtes sur le serveur, créant ainsi une application RAG complète.</p>
<h2 id="Preparing-the-Environment" class="common-anchor-header">Préparation de l'environnement<button data-href="#Preparing-the-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Il y a plusieurs façons de démarrer le serveur Llama Stack, comme <a href="https://llama-stack.readthedocs.io/en/latest/distributions/importing_as_library.html">une bibliothèque</a>, en <a href="https://llama-stack.readthedocs.io/en/latest/distributions/building_distro.html">construisant une distribution</a>, etc. Pour chaque composant de la pile Llama, différents fournisseurs peuvent également être choisis. Il existe donc de nombreuses façons de lancer le serveur Llama Stack.</p>
<p>Ce tutoriel utilise la configuration suivante comme exemple pour démarrer le service. Si vous souhaitez le démarrer d'une autre manière, veuillez vous référer à <a href="https://llama-stack.readthedocs.io/en/latest/distributions/index.html">Démarrer un serveur Llama Stack</a>.</p>
<ul>
<li>Nous utilisons Conda pour construire une distribution personnalisée avec la configuration Milvus.</li>
<li>Nous utilisons <a href="https://llama-stack.readthedocs.io/en/latest/distributions/self_hosted_distro/together.html#via-conda">Together AI</a> comme fournisseur LLM.</li>
<li>Nous utilisons le modèle par défaut <code translate="no">all-MiniLM-L6-v2</code> comme modèle d'intégration.</li>
</ul>
<div class="alert note">
<p>Ce tutoriel se réfère principalement au guide d'installation officiel de la <a href="https://llama-stack.readthedocs.io/en/latest/index.html">documentation Llama Stack</a>. Si vous trouvez des parties obsolètes dans ce tutoriel, vous pouvez suivre en priorité le guide officiel et créer un problème pour nous.</p>
</div>
<h2 id="Start-Llama-Stack-Server" class="common-anchor-header">Démarrer le serveur Llama Stack<button data-href="#Start-Llama-Stack-Server" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-the-Environment" class="common-anchor-header">Préparer l'environnement</h3><p>Comme nous devons utiliser Together AI comme service LLM, nous devons d'abord nous connecter au site web officiel pour demander une <a href="https://api.together.xyz/settings/api-keys">clé API</a> et définir la clé API <code translate="no">TOGETHER_API_KEY</code> comme variable d'environnement.</p>
<p>Cloner le code source de Llama Stack</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/meta-llama/llama-stack.git
$ <span class="hljs-built_in">cd</span> llama-stack
<button class="copy-code-btn"></button></code></pre>
<p>Créer un environnement conda et installer les dépendances</p>
<pre><code translate="no" class="language-bash">$ conda create -n stack python=3.10
$ conda activate stack

$ pip install -e .
<button class="copy-code-btn"></button></code></pre>
<p>Modifiez le contenu de <code translate="no">llama_stack/llama_stack/template/together/run.yaml</code>, en remplaçant la section vector_io par la configuration Milvus appropriée. Par exemple, ajoutez :</p>
<pre><code translate="no" class="language-yaml">vector_io:
- provider_id: milvus
  provider_type: inline::milvus
  config:
    db_path: ~/.llama/distributions/together/milvus_store.db

<span class="hljs-comment">#  - provider_id: milvus</span>
<span class="hljs-comment">#    provider_type: remote::milvus</span>
<span class="hljs-comment">#    config:</span>
<span class="hljs-comment">#      uri: http://localhost:19530</span>
<span class="hljs-comment">#      token: root:Milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dans Llama Stack, Milvus peut être configuré de deux manières : la configuration locale, qui est <code translate="no">inline::milvus</code>, et la configuration à distance, qui est <code translate="no">remote::milvus</code>.</p>
<ul>
<li><p>La méthode la plus simple est la configuration locale, qui nécessite de définir <code translate="no">db_path</code>, un chemin pour le stockage local des fichiers <a href="https://milvus.io/docs/quickstart.md">Milvus-Lite</a>.</p></li>
<li><p>La configuration à distance est adaptée au stockage de grandes quantités de données.</p>
<ul>
<li>Si vous disposez d'une grande quantité de données, vous pouvez configurer un serveur Milvus performant sur <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>. Dans cette configuration, veuillez utiliser l'URI du serveur, par exemple <code translate="no">http://localhost:19530</code>, comme votre <code translate="no">uri</code>. L'adresse <code translate="no">token</code> par défaut est <code translate="no">root:Milvus</code>.</li>
<li>Si vous souhaitez utiliser <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service cloud entièrement géré pour Milvus, ajustez les adresses <code translate="no">uri</code> et <code translate="no">token</code>, qui correspondent au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">point de terminaison public et à la clé API</a> dans Zilliz Cloud.</li>
</ul></li>
</ul>
<h3 id="Build-distribution-from-the-template" class="common-anchor-header">Construire la distribution à partir du modèle</h3><p>Exécutez la commande suivante pour créer la distribution :</p>
<pre><code translate="no" class="language-bash">$ llama stack build --template together --image-<span class="hljs-built_in">type</span> conda
<button class="copy-code-btn"></button></code></pre>
<p>Un fichier sera généré à l'adresse <code translate="no">~/.llama/distributions/together/together-run.yaml</code>. Ensuite, exécutez cette commande pour démarrer le serveur :</p>
<pre><code translate="no" class="language-bash">$ llama stack run --image-type conda ~<span class="hljs-regexp">/.llama/</span>distributions/together/together-run.<span class="hljs-property">yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si tout se passe bien, vous devriez voir le serveur Llama Stack s'exécuter avec succès sur le port 8321.</p>
<h2 id="Perform-RAG-from-client" class="common-anchor-header">Exécuter le RAG à partir du client<button data-href="#Perform-RAG-from-client" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez démarré le serveur, vous pouvez écrire le code client pour y accéder. Voici un exemple de code :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> uuid
<span class="hljs-keyword">from</span> llama_stack_client.types <span class="hljs-keyword">import</span> Document
<span class="hljs-keyword">from</span> llama_stack_client.lib.agents.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> llama_stack_client.types.agent_create_params <span class="hljs-keyword">import</span> AgentConfig

<span class="hljs-comment"># See https://www.together.ai/models for all available models</span>
INFERENCE_MODEL = <span class="hljs-string">&quot;meta-llama/Llama-3.3-70B-Instruct-Turbo&quot;</span>
LLAMA_STACK_PORT = <span class="hljs-number">8321</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_http_client</span>():
    <span class="hljs-keyword">from</span> llama_stack_client <span class="hljs-keyword">import</span> LlamaStackClient

    <span class="hljs-keyword">return</span> LlamaStackClient(
        base_url=<span class="hljs-string">f&quot;http://localhost:<span class="hljs-subst">{LLAMA_STACK_PORT}</span>&quot;</span>  <span class="hljs-comment"># Your Llama Stack Server URL</span>
    )


client = create_http_client()

<span class="hljs-comment"># Documents to be used for RAG</span>
urls = [<span class="hljs-string">&quot;chat.rst&quot;</span>, <span class="hljs-string">&quot;llama3.rst&quot;</span>, <span class="hljs-string">&quot;memory_optimizations.rst&quot;</span>, <span class="hljs-string">&quot;lora_finetune.rst&quot;</span>]
documents = [
    Document(
        document_id=<span class="hljs-string">f&quot;num-<span class="hljs-subst">{i}</span>&quot;</span>,
        content=<span class="hljs-string">f&quot;https://raw.githubusercontent.com/pytorch/torchtune/main/docs/source/tutorials/<span class="hljs-subst">{url}</span>&quot;</span>,
        mime_type=<span class="hljs-string">&quot;text/plain&quot;</span>,
        metadata={},
    )
    <span class="hljs-keyword">for</span> i, url <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(urls)
]

<span class="hljs-comment"># Register a vector database</span>
vector_db_id = <span class="hljs-string">f&quot;test-vector-db-<span class="hljs-subst">{uuid.uuid4().<span class="hljs-built_in">hex</span>}</span>&quot;</span>
client.vector_dbs.register(
    vector_db_id=vector_db_id,
    embedding_model=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>,
    embedding_dimension=<span class="hljs-number">384</span>,
    provider_id=<span class="hljs-string">&quot;milvus&quot;</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;inserting...&quot;</span>)
<span class="hljs-comment"># Insert the documents into the vector database</span>
client.tool_runtime.rag_tool.insert(
    documents=documents, vector_db_id=vector_db_id, chunk_size_in_tokens=<span class="hljs-number">1024</span>,
)

agent_config = AgentConfig(
    model=INFERENCE_MODEL,
    <span class="hljs-comment"># Define instructions for the agent ( aka system prompt)</span>
    instructions=<span class="hljs-string">&quot;You are a helpful assistant&quot;</span>,
    enable_session_persistence=<span class="hljs-literal">False</span>,
    <span class="hljs-comment"># Define tools available to the agent</span>
    toolgroups=[{<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;builtin::rag&quot;</span>, <span class="hljs-string">&quot;args&quot;</span>: {<span class="hljs-string">&quot;vector_db_ids&quot;</span>: [vector_db_id]}}],
)

rag_agent = Agent(client, agent_config)
session_id = rag_agent.create_session(<span class="hljs-string">&quot;test-session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;finish init agent...&quot;</span>)
user_prompt = (
    <span class="hljs-string">&quot;What are the top 5 topics that were explained? Only list succinct bullet points.&quot;</span>
)

<span class="hljs-comment"># Get the final answer from the agent</span>
response = rag_agent.create_turn(
    messages=[{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt}],
    session_id=session_id,
    stream=<span class="hljs-literal">False</span>,
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Response: &quot;</span>)
<span class="hljs-built_in">print</span>(response.output_message.content)
<button class="copy-code-btn"></button></code></pre>
<p>Exécutez ce code pour effectuer la requête RAG. Si tout fonctionne correctement, la sortie devrait ressembler à ceci :</p>
<pre><code translate="no" class="language-log">inserting...
finish init agent...
Response: 
* Fine-Tuning Llama3 with Chat Data
* Evaluating fine-tuned Llama3-8B models with EleutherAI&#x27;s Eval Harness
* Generating text with our fine-tuned Llama3 model
* Faster generation via quantization
* Fine-tuning on a custom chat dataset
<button class="copy-code-btn"></button></code></pre>
