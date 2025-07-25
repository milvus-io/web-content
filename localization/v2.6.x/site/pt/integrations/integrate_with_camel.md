---
id: integrate_with_camel.md
summary: >-
  Este guia demonstra como construir um sistema RAG (Retrieval-Augmented
  Generation) utilizando CAMEL e Milvus.
title: Geração Aumentada por Recuperação (RAG) com Milvus e Camel
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-Camel" class="common-anchor-header">Geração Aumentada por Recuperação (RAG) com Milvus e Camel<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-Camel" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_camel.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_camel.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Este guia demonstra como construir um sistema RAG (Retrieval-Augmented Generation) utilizando o CAMEL e o Milvus.</p>
<p>O sistema RAG combina um sistema de recuperação com um modelo generativo para gerar novo texto com base num determinado pedido. O sistema começa por recuperar documentos relevantes de um corpus utilizando o Milvus e, em seguida, utiliza um modelo generativo para gerar novo texto com base nos documentos recuperados.</p>
<p><a href="https://www.camel-ai.org/">CAMEL</a> é uma estrutura multi-agente. <a href="https://milvus.io/">O Milvus</a> é a base de dados vetorial de código aberto mais avançada do mundo, criada para alimentar a pesquisa de semelhanças de incorporação e as aplicações de IA.</p>
<p>Neste caderno, mostramos a utilização do módulo CAMEL Retrieve tanto de forma personalizada como de forma automática. Também mostraremos como combinar <code translate="no">AutoRetriever</code> com <code translate="no">ChatAgent</code>, e ainda combinar <code translate="no">AutoRetriever</code> com <code translate="no">RolePlaying</code> usando <code translate="no">Function Calling</code>.</p>
<p>4 partes principais incluídas:</p>
<ul>
<li>RAG personalizado</li>
<li>RAG automático</li>
<li>Agente único com RAG automático</li>
<li>Interpretação de papéis com o Auto RAG</li>
</ul>
<h2 id="Load-Data" class="common-anchor-header">Carregar dados<button data-href="#Load-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Vamos primeiro carregar o documento CAMEL de https://arxiv.org/pdf/2303.17760.pdf. Estes serão os nossos dados de exemplo locais.</p>
<pre><code translate="no" class="language-python">$ pip install -U <span class="hljs-string">&quot;camel-ai[all]&quot;</span> pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se estiver a utilizar o Google Colab, para ativar as dependências acabadas de instalar, poderá ter de <strong>reiniciar o tempo de execução</strong> (clique no menu "Tempo de execução" na parte superior do ecrã e selecione "Reiniciar sessão" no menu pendente).</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> requests

os.makedirs(<span class="hljs-string">&quot;local_data&quot;</span>, exist_ok=<span class="hljs-literal">True</span>)

url = <span class="hljs-string">&quot;https://arxiv.org/pdf/2303.17760.pdf&quot;</span>
response = requests.get(url)
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;local_data/camel paper.pdf&quot;</span>, <span class="hljs-string">&quot;wb&quot;</span>) <span class="hljs-keyword">as</span> file:
    file.write(response.content)
<button class="copy-code-btn"></button></code></pre>
<h2 id="1-Customized-RAG" class="common-anchor-header">1. RAG personalizado<button data-href="#1-Customized-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>Nesta secção, vamos definir o nosso pipeline RAG personalizado, vamos utilizar <code translate="no">VectorRetriever</code> como exemplo. Vamos definir <code translate="no">OpenAIEmbedding</code> como o modelo de incorporação e <code translate="no">MilvusStorage</code> como o armazenamento para ele.</p>
<p>Para definir a incorporação do OpenAI, precisamos definir o <code translate="no">OPENAI_API_KEY</code> abaixo.</p>
<pre><code translate="no" class="language-python">os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;Your Key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Importar e definir a instância de incorporação:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> camel.embeddings <span class="hljs-keyword">import</span> OpenAIEmbedding

embedding_instance = OpenAIEmbedding()
<button class="copy-code-btn"></button></code></pre>
<p>Importar e definir a instância de armazenamento do vetor:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> camel.storages <span class="hljs-keyword">import</span> MilvusStorage

storage_instance = MilvusStorage(
    vector_dim=embedding_instance.get_output_dim(),
    url_and_api_key=(
        <span class="hljs-string">&quot;./milvus_demo.db&quot;</span>,  <span class="hljs-comment"># Your Milvus connection URI</span>
        <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># Your Milvus token</span>
    ),
    collection_name=<span class="hljs-string">&quot;camel_paper&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Para o <code translate="no">url_and_api_key</code>:</p>
<ul>
<li>A utilização de um ficheiro local, por exemplo,<code translate="no">./milvus.db</code>, como URI de ligação do Milvus é o método mais conveniente, uma vez que utiliza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a> para armazenar todos os dados neste ficheiro.</li>
<li>Se tiver uma grande escala de dados, pode configurar um servidor Milvus mais eficiente em <a href="https://milvus.io/docs/quickstart.md">docker ou kubernetes</a>. Nesta configuração, utilize o uri do servidor, por exemplo,<code translate="no">http://localhost:19530</code>, como o seu url.</li>
<li>Se pretender utilizar <a href="https://zilliz.com/cloud">o Zilliz Cloud</a>, o serviço de nuvem totalmente gerido para o Milvus, ajuste o uri e o token de ligação, que correspondem ao <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint e</a> à <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">chave Api</a> no Zilliz Cloud.</li>
</ul>
</div>
<p>Importar e definir a instância do retriever:</p>
<p>Por defeito, o <code translate="no">similarity_threshold</code> está definido para 0,75. Pode alterá-lo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> camel.retrievers <span class="hljs-keyword">import</span> VectorRetriever

vector_retriever = VectorRetriever(
    embedding_model=embedding_instance, storage=storage_instance
)
<button class="copy-code-btn"></button></code></pre>
<p>Utilizamos o <code translate="no">Unstructured Module</code> integrado para dividir o conteúdo em pequenos pedaços, o conteúdo será dividido automaticamente com a sua função <code translate="no">chunk_by_title</code>, o carácter máximo para cada pedaço é de 500 caracteres, que é um comprimento adequado para <code translate="no">OpenAIEmbedding</code>. Todo o texto nos pedaços será incorporado e armazenado na instância de armazenamento vetorial, o que levará algum tempo, por favor aguarde.</p>
<pre><code translate="no" class="language-python">vector_retriever.process(content_input_path=<span class="hljs-string">&quot;local_data/camel paper.pdf&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[nltk_data] Downloading package punkt to /root/nltk_data...
[nltk_data]   Unzipping tokenizers/punkt.zip.
[nltk_data] Downloading package averaged_perceptron_tagger to
[nltk_data]     /root/nltk_data...
[nltk_data]   Unzipping taggers/averaged_perceptron_tagger.zip.
</code></pre>
<p>Agora podemos obter informações do armazenamento vetorial através de uma consulta. Por predefinição, será devolvido o conteúdo de texto do primeiro bloco com a pontuação de semelhança de cosseno mais elevada, e a pontuação de semelhança deve ser superior a 0,75 para garantir que o conteúdo recuperado é relevante para a consulta. Também é possível alterar o valor de <code translate="no">top_k</code>.</p>
<p>A lista de cadeias de caracteres devolvida inclui:</p>
<ul>
<li>pontuação de similaridade</li>
<li>caminho do conteúdo</li>
<li>metadados</li>
<li>texto</li>
</ul>
<pre><code translate="no" class="language-python">retrieved_info = vector_retriever.query(query=<span class="hljs-string">&quot;What is CAMEL?&quot;</span>, top_k=<span class="hljs-number">1</span>)
<span class="hljs-built_in">print</span>(retrieved_info)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{'similarity score': '0.8321675658226013', 'content path': 'local_data/camel paper.pdf', 'metadata': {'last_modified': '2024-04-19T14:40:00', 'filetype': 'application/pdf', 'page_number': 45}, 'text': 'CAMEL Data and Code License The intended purpose and licensing of CAMEL is solely for research use. The source code is licensed under Apache 2.0. The datasets are licensed under CC BY NC 4.0, which permits only non-commercial usage. It is advised that any models trained using the dataset should not be utilized for anything other than research purposes.\n\n45'}]
</code></pre>
<p>Vamos tentar uma consulta irrelevante:</p>
<pre><code translate="no" class="language-python">retrieved_info_irrelevant = vector_retriever.query(
    query=<span class="hljs-string">&quot;Compared with dumpling and rice, which should I take for dinner?&quot;</span>, top_k=<span class="hljs-number">1</span>
)

<span class="hljs-built_in">print</span>(retrieved_info_irrelevant)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{'text': 'No suitable information retrieved from local_data/camel paper.pdf                 with similarity_threshold = 0.75.'}]
</code></pre>
<h2 id="2-Auto-RAG" class="common-anchor-header">2. RAG automático<button data-href="#2-Auto-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>Nesta secção, vamos executar o <code translate="no">AutoRetriever</code> com as definições predefinidas. Utiliza <code translate="no">OpenAIEmbedding</code> como modelo de incorporação predefinido e <code translate="no">Milvus</code> como armazenamento vetorial predefinido.</p>
<p>O que você precisa fazer é:</p>
<ul>
<li>Definir os caminhos de entrada do conteúdo, que podem ser caminhos locais ou URLs remotos</li>
<li>Definir o URL remoto e a chave da API para o Milvus</li>
<li>Fornecer uma consulta</li>
</ul>
<p>O pipeline Auto RAG criará colecções para os caminhos de entrada de conteúdos indicados. O nome da coleção será definido automaticamente com base no nome do caminho de entrada de conteúdos e, se a coleção existir, será feita a recuperação diretamente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> camel.retrievers <span class="hljs-keyword">import</span> AutoRetriever
<span class="hljs-keyword">from</span> camel.types <span class="hljs-keyword">import</span> StorageType

auto_retriever = AutoRetriever(
    url_and_api_key=(
        <span class="hljs-string">&quot;./milvus_demo.db&quot;</span>,  <span class="hljs-comment"># Your Milvus connection URI</span>
        <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># Your Milvus token</span>
    ),
    storage_type=StorageType.MILVUS,
    embedding_model=embedding_instance,
)

retrieved_info = auto_retriever.run_vector_retriever(
    query=<span class="hljs-string">&quot;What is CAMEL-AI&quot;</span>,
    content_input_paths=[
        <span class="hljs-string">&quot;local_data/camel paper.pdf&quot;</span>,  <span class="hljs-comment"># example local path</span>
        <span class="hljs-string">&quot;https://www.camel-ai.org/&quot;</span>,  <span class="hljs-comment"># example remote url</span>
    ],
    top_k=<span class="hljs-number">1</span>,
    return_detailed_info=<span class="hljs-literal">True</span>,
)

<span class="hljs-built_in">print</span>(retrieved_info)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Original Query:
{What is CAMEL-AI}
Retrieved Context:
{'similarity score': '0.8252888321876526', 'content path': 'local_data/camel paper.pdf', 'metadata': {'last_modified': '2024-04-19T14:40:00', 'filetype': 'application/pdf', 'page_number': 7}, 'text': ' Section 3.2, to simulate assistant-user cooperation. For our analysis, we set our attention on AI Society setting. We also gathered conversational data, named CAMEL AI Society and CAMEL Code datasets and problem-solution pairs data named CAMEL Math and CAMEL Science and analyzed and evaluated their quality. Moreover, we will discuss potential extensions of our framework and highlight both the risks and opportunities that future AI society might present.'}
{'similarity score': '0.8378663659095764', 'content path': 'https://www.camel-ai.org/', 'metadata': {'filetype': 'text/html', 'languages': ['eng'], 'page_number': 1, 'url': 'https://www.camel-ai.org/', 'link_urls': ['#h.3f4tphhd9pn8', 'https://join.slack.com/t/camel-ai/shared_invite/zt-2g7xc41gy-_7rcrNNAArIP6sLQqldkqQ', 'https://discord.gg/CNcNpquyDc'], 'link_texts': [None, None, None], 'emphasized_text_contents': ['Mission', 'CAMEL-AI.org', 'is an open-source community dedicated to the study of autonomous and communicative agents. We believe that studying these agents on a large scale offers valuable insights into their behaviors, capabilities, and potential risks. To facilitate research in this field, we provide, implement, and support various types of agents, tasks, prompts, models, datasets, and simulated environments.', 'Join us via', 'Slack', 'Discord', 'or'], 'emphasized_text_tags': ['span', 'span', 'span', 'span', 'span', 'span', 'span']}, 'text': 'Mission\n\nCAMEL-AI.org is an open-source community dedicated to the study of autonomous and communicative agents. We believe that studying these agents on a large scale offers valuable insights into their behaviors, capabilities, and potential risks. To facilitate research in this field, we provide, implement, and support various types of agents, tasks, prompts, models, datasets, and simulated environments.\n\nJoin us via\n\nSlack\n\nDiscord\n\nor'}
</code></pre>
<h2 id="3-Single-Agent-with-Auto-RAG" class="common-anchor-header">3. Agente único com RAG automático<button data-href="#3-Single-Agent-with-Auto-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>Nesta secção, mostraremos como combinar o <code translate="no">AutoRetriever</code> com um <code translate="no">ChatAgent</code>.</p>
<p>Vamos definir uma função de agente, nesta função podemos obter a resposta fornecendo uma consulta a este agente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> camel.agents <span class="hljs-keyword">import</span> ChatAgent
<span class="hljs-keyword">from</span> camel.messages <span class="hljs-keyword">import</span> BaseMessage
<span class="hljs-keyword">from</span> camel.types <span class="hljs-keyword">import</span> RoleType
<span class="hljs-keyword">from</span> camel.retrievers <span class="hljs-keyword">import</span> AutoRetriever
<span class="hljs-keyword">from</span> camel.types <span class="hljs-keyword">import</span> StorageType


<span class="hljs-keyword">def</span> <span class="hljs-title function_">single_agent</span>(<span class="hljs-params">query: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    <span class="hljs-comment"># Set agent role</span>
    assistant_sys_msg = BaseMessage(
        role_name=<span class="hljs-string">&quot;Assistant&quot;</span>,
        role_type=RoleType.ASSISTANT,
        meta_dict=<span class="hljs-literal">None</span>,
        content=<span class="hljs-string">&quot;&quot;&quot;You are a helpful assistant to answer question,
         I will give you the Original Query and Retrieved Context,
        answer the Original Query based on the Retrieved Context,
        if you can&#x27;t answer the question just say I don&#x27;t know.&quot;&quot;&quot;</span>,
    )

    <span class="hljs-comment"># Add auto retriever</span>
    auto_retriever = AutoRetriever(
        url_and_api_key=(
            <span class="hljs-string">&quot;./milvus_demo.db&quot;</span>,  <span class="hljs-comment"># Your Milvus connection URI</span>
            <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># Your Milvus token</span>
        ),
        storage_type=StorageType.MILVUS,
        embedding_model=embedding_instance,
    )

    retrieved_info = auto_retriever.run_vector_retriever(
        query=query,
        content_input_paths=[
            <span class="hljs-string">&quot;local_data/camel paper.pdf&quot;</span>,  <span class="hljs-comment"># example local path</span>
            <span class="hljs-string">&quot;https://www.camel-ai.org/&quot;</span>,  <span class="hljs-comment"># example remote url</span>
        ],
        <span class="hljs-comment"># vector_storage_local_path=&quot;storage_default_run&quot;,</span>
        top_k=<span class="hljs-number">1</span>,
        return_detailed_info=<span class="hljs-literal">True</span>,
    )

    <span class="hljs-comment"># Pass the retrieved infomation to agent</span>
    user_msg = BaseMessage.make_user_message(role_name=<span class="hljs-string">&quot;User&quot;</span>, content=retrieved_info)
    agent = ChatAgent(assistant_sys_msg)

    <span class="hljs-comment"># Get response</span>
    assistant_response = agent.step(user_msg)
    <span class="hljs-keyword">return</span> assistant_response.msg.content


<span class="hljs-built_in">print</span>(single_agent(<span class="hljs-string">&quot;What is CAMEL-AI&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">CAMEL-AI is an open-source community dedicated to the study of autonomous and communicative agents. It provides, implements, and supports various types of agents, tasks, prompts, models, datasets, and simulated environments to facilitate research in this field.
</code></pre>
<h2 id="4-Role-playing-with-Auto-RAG" class="common-anchor-header">4. Interpretação de papéis com o Auto RAG<button data-href="#4-Role-playing-with-Auto-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>Nesta secção, mostraremos como combinar o <code translate="no">RETRIEVAL_FUNCS</code> com o <code translate="no">RolePlaying</code> aplicando o <code translate="no">Function Calling</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> colorama <span class="hljs-keyword">import</span> Fore

<span class="hljs-keyword">from</span> camel.agents.chat_agent <span class="hljs-keyword">import</span> FunctionCallingRecord
<span class="hljs-keyword">from</span> camel.configs <span class="hljs-keyword">import</span> ChatGPTConfig
<span class="hljs-keyword">from</span> camel.functions <span class="hljs-keyword">import</span> (
    MATH_FUNCS,
    RETRIEVAL_FUNCS,
)
<span class="hljs-keyword">from</span> camel.societies <span class="hljs-keyword">import</span> RolePlaying
<span class="hljs-keyword">from</span> camel.types <span class="hljs-keyword">import</span> ModelType
<span class="hljs-keyword">from</span> camel.utils <span class="hljs-keyword">import</span> print_text_animated


<span class="hljs-keyword">def</span> <span class="hljs-title function_">role_playing_with_rag</span>(<span class="hljs-params">
    task_prompt, model_type=ModelType.GPT_4O, chat_turn_limit=<span class="hljs-number">10</span>
</span>) -&gt; <span class="hljs-literal">None</span>:
    task_prompt = task_prompt

    user_model_config = ChatGPTConfig(temperature=<span class="hljs-number">0.0</span>)

    function_list = [
        *MATH_FUNCS,
        *RETRIEVAL_FUNCS,
    ]
    assistant_model_config = ChatGPTConfig(
        tools=function_list,
        temperature=<span class="hljs-number">0.0</span>,
    )

    role_play_session = RolePlaying(
        assistant_role_name=<span class="hljs-string">&quot;Searcher&quot;</span>,
        user_role_name=<span class="hljs-string">&quot;Professor&quot;</span>,
        assistant_agent_kwargs=<span class="hljs-built_in">dict</span>(
            model_type=model_type,
            model_config=assistant_model_config,
            tools=function_list,
        ),
        user_agent_kwargs=<span class="hljs-built_in">dict</span>(
            model_type=model_type,
            model_config=user_model_config,
        ),
        task_prompt=task_prompt,
        with_task_specify=<span class="hljs-literal">False</span>,
    )

    <span class="hljs-built_in">print</span>(
        Fore.GREEN
        + <span class="hljs-string">f&quot;AI Assistant sys message:\n<span class="hljs-subst">{role_play_session.assistant_sys_msg}</span>\n&quot;</span>
    )
    <span class="hljs-built_in">print</span>(Fore.BLUE + <span class="hljs-string">f&quot;AI User sys message:\n<span class="hljs-subst">{role_play_session.user_sys_msg}</span>\n&quot;</span>)

    <span class="hljs-built_in">print</span>(Fore.YELLOW + <span class="hljs-string">f&quot;Original task prompt:\n<span class="hljs-subst">{task_prompt}</span>\n&quot;</span>)
    <span class="hljs-built_in">print</span>(
        Fore.CYAN
        + <span class="hljs-string">f&quot;Specified task prompt:\n<span class="hljs-subst">{role_play_session.specified_task_prompt}</span>\n&quot;</span>
    )
    <span class="hljs-built_in">print</span>(Fore.RED + <span class="hljs-string">f&quot;Final task prompt:\n<span class="hljs-subst">{role_play_session.task_prompt}</span>\n&quot;</span>)

    n = <span class="hljs-number">0</span>
    input_msg = role_play_session.init_chat()
    <span class="hljs-keyword">while</span> n &lt; chat_turn_limit:
        n += <span class="hljs-number">1</span>
        assistant_response, user_response = role_play_session.step(input_msg)

        <span class="hljs-keyword">if</span> assistant_response.terminated:
            <span class="hljs-built_in">print</span>(
                Fore.GREEN
                + (
                    <span class="hljs-string">&quot;AI Assistant terminated. Reason: &quot;</span>
                    <span class="hljs-string">f&quot;<span class="hljs-subst">{assistant_response.info[<span class="hljs-string">&#x27;termination_reasons&#x27;</span>]}</span>.&quot;</span>
                )
            )
            <span class="hljs-keyword">break</span>
        <span class="hljs-keyword">if</span> user_response.terminated:
            <span class="hljs-built_in">print</span>(
                Fore.GREEN
                + (
                    <span class="hljs-string">&quot;AI User terminated. &quot;</span>
                    <span class="hljs-string">f&quot;Reason: <span class="hljs-subst">{user_response.info[<span class="hljs-string">&#x27;termination_reasons&#x27;</span>]}</span>.&quot;</span>
                )
            )
            <span class="hljs-keyword">break</span>

        <span class="hljs-comment"># Print output from the user</span>
        print_text_animated(Fore.BLUE + <span class="hljs-string">f&quot;AI User:\n\n<span class="hljs-subst">{user_response.msg.content}</span>\n&quot;</span>)

        <span class="hljs-comment"># Print output from the assistant, including any function</span>
        <span class="hljs-comment"># execution information</span>
        print_text_animated(Fore.GREEN + <span class="hljs-string">&quot;AI Assistant:&quot;</span>)
        tool_calls: <span class="hljs-type">List</span>[FunctionCallingRecord] = assistant_response.info[<span class="hljs-string">&quot;tool_calls&quot;</span>]
        <span class="hljs-keyword">for</span> func_record <span class="hljs-keyword">in</span> tool_calls:
            print_text_animated(<span class="hljs-string">f&quot;<span class="hljs-subst">{func_record}</span>&quot;</span>)
        print_text_animated(<span class="hljs-string">f&quot;<span class="hljs-subst">{assistant_response.msg.content}</span>\n&quot;</span>)

        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;CAMEL_TASK_DONE&quot;</span> <span class="hljs-keyword">in</span> user_response.msg.content:
            <span class="hljs-keyword">break</span>

        input_msg = assistant_response.msg
<button class="copy-code-btn"></button></code></pre>
<p>Execute a representação de papéis com a função de recuperação definida:</p>
<pre><code translate="no" class="language-python">role_playing_with_rag(
    task_prompt=<span class="hljs-string">&quot;&quot;&quot;What is the main termination reasons for AI Society
                   dataset, how many number of messages did camel decided to
                   limit, what&#x27;s the value plus 100? You should refer to the
                   content in path camel/local_data/camel paper.pdf&quot;&quot;&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">AI Assistant sys message:
BaseMessage(role_name='Searcher', role_type=&lt;RoleType.ASSISTANT: 'assistant'&gt;, meta_dict={'task': &quot;What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?&quot;, 'assistant_role': 'Searcher', 'user_role': 'Professor'}, content=&quot;===== RULES OF ASSISTANT =====\nNever forget you are a Searcher and I am a Professor. Never flip roles! Never instruct me!\nWe share a common interest in collaborating to successfully complete a task.\nYou must help me to complete the task.\nHere is the task: What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?. Never forget our task!\nI must instruct you based on your expertise and my needs to complete the task.\n\nI must give you one instruction at a time.\nYou must write a specific solution that appropriately solves the requested instruction and explain your solutions.\nYou must decline my instruction honestly if you cannot perform the instruction due to physical, moral, legal reasons or your capability and explain the reasons.\nUnless I say the task is completed, you should always start with:\n\nSolution: &lt;YOUR_SOLUTION&gt;\n\n&lt;YOUR_SOLUTION&gt; should be very specific, include detailed explanations and provide preferable detailed implementations and examples and lists for task-solving.\nAlways end &lt;YOUR_SOLUTION&gt; with: Next request.&quot;)

AI User sys message:
BaseMessage(role_name='Professor', role_type=&lt;RoleType.USER: 'user'&gt;, meta_dict={'task': &quot;What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?&quot;, 'assistant_role': 'Searcher', 'user_role': 'Professor'}, content='===== RULES OF USER =====\nNever forget you are a Professor and I am a Searcher. Never flip roles! You will always instruct me.\nWe share a common interest in collaborating to successfully complete a task.\nI must help you to complete the task.\nHere is the task: What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what\'s the value plus 100?. Never forget our task!\nYou must instruct me based on my expertise and your needs to solve the task ONLY in the following two ways:\n\n1. Instruct with a necessary input:\nInstruction: &lt;YOUR_INSTRUCTION&gt;\nInput: &lt;YOUR_INPUT&gt;\n\n2. Instruct without any input:\nInstruction: &lt;YOUR_INSTRUCTION&gt;\nInput: None\n\nThe &quot;Instruction&quot; describes a task or question. The paired &quot;Input&quot; provides further context or information for the requested &quot;Instruction&quot;.\n\nYou must give me one instruction at a time.\nI must write a response that appropriately solves the requested instruction.\nI must decline your instruction honestly if I cannot perform the instruction due to physical, moral, legal reasons or my capability and explain the reasons.\nYou should instruct me not ask me questions.\nNow you must start to instruct me using the two ways described above.\nDo not add anything else other than your instruction and the optional corresponding input!\nKeep giving me instructions and necessary inputs until you think the task is completed.\nWhen the task is completed, you must only reply with a single word &lt;CAMEL_TASK_DONE&gt;.\nNever say &lt;CAMEL_TASK_DONE&gt; unless my responses have solved your task.')

Original task prompt:
What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?

Specified task prompt:
None

Final task prompt:
What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?



AI User:

Instruction: Provide a summary of the main termination reasons in the AI Society dataset.
Input: None


AI Assistant:

Function Execution: local_retriever
    Args: {'query': 'main termination reasons for AI Society dataset'}
    Result: Original Query:
{main termination reasons for AI Society dataset}
Retrieved Context:
Next we examine the conversation termination reasons for both AI Society and Code datasets. As can be seen in Figure 8, the main termination reasons for AI Society dataset is Assistant Instruct whereas for Code it is Token Limit. The latter is expected as the since responses that contain code tend to be long. It is also interesting to note that in both datasets, the termination due to Maximum Number of Messages is low indicating that the limit of 40 maximum messages is reasonable. Our decision t

Solution: The main termination reason for the AI Society dataset is &quot;Assistant Instruct.&quot; This indicates that conversations in the AI Society dataset typically end when the assistant is instructed to terminate the conversation.

Next request.


AI User:

Instruction: Identify the number of messages that the camel decided to limit in the context provided.
Input: None


AI Assistant:

Solution: The context provided from the local retriever indicates that the camel decided to limit the number of messages to a maximum of 40 messages. This is mentioned in the retrieved context where it states that the termination due to Maximum Number of Messages is low, indicating that the limit of 40 maximum messages is reasonable.

Next request.


AI User:

Instruction: Calculate the value of the message limit plus 100.
Input: None


AI Assistant:

Function Execution: add
    Args: {'a': 40, 'b': 100}
    Result: 140

Solution: The value of the message limit plus 100 is 140.

Next request.


AI User:

CAMEL_TASK_DONE


AI Assistant:

Solution: Understood, the task is completed.

Next request.
</code></pre>
