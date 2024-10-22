---
id: integrate_with_jina.md
summary: >-
  Este guia demonstra como utilizar Jina embeddings e Milvus para efetuar
  tarefas de pesquisa e recuperação de semelhanças.
title: Integrar o Milvus com o Jina
---
<h1 id="Integrate-Milvus-with-Jina-AI" class="common-anchor-header">Integrar o Milvus com o Jina AI<button data-href="#Integrate-Milvus-with-Jina-AI" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_with_Jina.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_with_Jina.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Este guia demonstra como utilizar os embeddings do Jina AI e o Milvus para realizar tarefas de pesquisa e recuperação por semelhança.</p>
<h2 id="Who-is-Jina-AI" class="common-anchor-header">Quem é a Jina AI<button data-href="#Who-is-Jina-AI" class="anchor-icon" translate="no">
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
    </button></h2><p>A Jina AI, fundada em 2020 em Berlim, é uma empresa pioneira de IA focada em revolucionar o futuro da inteligência artificial através da sua base de pesquisa. Especializada em IA multimodal, a Jina AI tem como objetivo capacitar as empresas e os programadores para aproveitarem o poder dos dados multimodais para a criação de valor e poupança de custos através do seu conjunto integrado de componentes, incluindo embeddings, rerankers, prompt ops e infraestrutura central. Os embeddings de ponta da Jina AI apresentam um desempenho de topo, com um modelo de comprimento de token 8192 ideal para uma representação de dados abrangente. Oferecendo suporte multilingue e integração perfeita com plataformas líderes como a OpenAI, estes embeddings facilitam as aplicações multilingues.</p>
<h2 id="Milvus-and-Jina-AIs-Embedding" class="common-anchor-header">Incorporação de Milvus e Jina AI<button data-href="#Milvus-and-Jina-AIs-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>Para armazenar e pesquisar estes embeddings de forma eficiente em termos de velocidade e escala, é necessária uma infraestrutura específica concebida para o efeito. O Milvus é uma base de dados vetorial avançada de código aberto amplamente conhecida, capaz de tratar dados vectoriais em grande escala. O Milvus permite uma pesquisa rápida e precisa de vectores (embedding) de acordo com várias métricas. A sua escalabilidade permite o tratamento sem problemas de volumes maciços de dados de imagem, garantindo operações de pesquisa de elevado desempenho, mesmo quando os conjuntos de dados aumentam.</p>
<h2 id="Examples" class="common-anchor-header">Exemplos<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Os embeddings do Jina foram integrados na biblioteca de modelos do PyMilvus. Agora, vamos demonstrar exemplos de código para mostrar como utilizar os embeddings Jina em ação.</p>
<p>Antes de começarmos, precisamos de instalar a biblioteca de modelos para o PyMilvus.</p>
<pre><code translate="no" class="language-python">$ pip install -U pymilvus
$ pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se estiver a utilizar o Google Colab, para ativar as dependências acabadas de instalar, poderá ter de <strong>reiniciar o tempo de execução</strong>. (Clique no menu "Runtime" (Tempo de execução) na parte superior do ecrã e selecione "Restart session" (Reiniciar sessão) no menu pendente).</p>
</div>
<h2 id="General-Purpose-Embedding" class="common-anchor-header">Incorporação de objetivo geral<button data-href="#General-Purpose-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>O modelo de incorporação principal do Jina AI destaca-se na compreensão de texto detalhado, tornando-o ideal para pesquisa semântica, classificação de conteúdo, suportando assim análise avançada de sentimentos, resumo de texto e sistemas de recomendação personalizados.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
ef = JinaEmbeddingFunction(
    <span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, 
    jina_api_key,
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>,
    dimensions=<span class="hljs-number">1024</span>
)

query = <span class="hljs-string">&quot;what is information retrieval?&quot;</span>
doc = <span class="hljs-string">&quot;Information retrieval is the process of finding relevant information from a large collection of data or documents.&quot;</span>

qvecs = ef.encode_queries([query])  <span class="hljs-comment"># This method uses `retrieval.query` as the task</span>
dvecs = ef.encode_documents([doc])  <span class="hljs-comment"># This method uses `retrieval.passage` as the task</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Bilingual-Embeddings" class="common-anchor-header">Embeddings bilingues<button data-href="#Bilingual-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Os modelos bilingues da Jina AI melhoram as plataformas multilingues, o suporte global e a descoberta de conteúdos multilingues. Concebidos para traduções alemão-inglês e chinês-inglês, promovem a compreensão entre diversos grupos linguísticos, simplificando as interações entre línguas.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.<span class="hljs-property">model</span>.<span class="hljs-property">dense</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">JinaEmbeddingFunction</span>

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
ef = <span class="hljs-title class_">JinaEmbeddingFunction</span>(<span class="hljs-string">&quot;jina-embeddings-v2-base-de&quot;</span>, jina_api_key)

query = <span class="hljs-string">&quot;what is information retrieval?&quot;</span>
doc = <span class="hljs-string">&quot;Information Retrieval ist der Prozess, relevante Informationen aus einer großen Sammlung von Daten oder Dokumenten zu finden.&quot;</span>

qvecs = ef.<span class="hljs-title function_">encode_queries</span>([query])
dvecs = ef.<span class="hljs-title function_">encode_documents</span>([doc])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Code-Embeddings" class="common-anchor-header">Incorporação de código<button data-href="#Code-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>O modelo de incorporação de código da Jina AI fornece capacidade de pesquisa através de código e documentação. Suporta o inglês e 30 linguagens de programação populares que podem ser utilizadas para melhorar a navegação no código, simplificar a revisão do código e a assistência automatizada à documentação.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
ef = JinaEmbeddingFunction(<span class="hljs-string">&quot;jina-embeddings-v2-base-code&quot;</span>, jina_api_key)

<span class="hljs-comment"># Case1: Enhanced Code Navigation</span>
<span class="hljs-comment"># query: text description of the functionality</span>
<span class="hljs-comment"># document: relevant code snippet</span>

query = <span class="hljs-string">&quot;function to calculate average in Python.&quot;</span>
doc = <span class="hljs-string">&quot;&quot;&quot;
def calculate_average(numbers):
    total = sum(numbers)
    count = len(numbers)
    return total / count
&quot;&quot;&quot;</span>

<span class="hljs-comment"># Case2: Streamlined Code Review</span>
<span class="hljs-comment"># query: text description of the programming concept</span>
<span class="hljs-comment"># document: relevante code snippet or PR</span>

query = <span class="hljs-string">&quot;pull quest related to Collection&quot;</span>
doc = <span class="hljs-string">&quot;fix:[restful v2] parameters of create collection ...&quot;</span>

<span class="hljs-comment"># Case3: Automatic Documentation Assistance</span>
<span class="hljs-comment"># query: code snippet you need explanation</span>
<span class="hljs-comment"># document: relevante document or DocsString</span>

query = <span class="hljs-string">&quot;What is Collection in Milvus&quot;</span>
doc = <span class="hljs-string">&quot;&quot;&quot;
In Milvus, you store your vector embeddings in collections. All vector embeddings within a collection share the same dimensionality and distance metric for measuring similarity.
Milvus collections support dynamic fields (i.e., fields not pre-defined in the schema) and automatic incrementation of primary keys.
&quot;&quot;&quot;</span>

qvecs = ef.encode_queries([query])
dvecs = ef.encode_documents([doc])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Semantic-Search-with-Jina--Milvus" class="common-anchor-header">Pesquisa semântica com Jina e Milvus<button data-href="#Semantic-Search-with-Jina--Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Com a poderosa função de incorporação de vectores, podemos combinar as incorporações obtidas através da utilização dos modelos de IA Jina com a base de dados de vectores Milvus Lite para efetuar a pesquisa semântica.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
DIMENSION = <span class="hljs-number">1024</span>  <span class="hljs-comment"># `jina-embeddings-v3` supports flexible embedding sizes (32, 64, 128, 256, 512, 768, 1024), allowing for truncating embeddings to fit your application. </span>
ef = JinaEmbeddingFunction(
    <span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, 
    jina_api_key,
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>,
    dimensions=DIMENSION,
)


doc = [
    <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
    <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
    <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>,
]

dvecs = ef.encode_documents(doc) <span class="hljs-comment"># This method uses `retrieval.passage` as the task</span>

data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: dvecs[i], <span class="hljs-string">&quot;text&quot;</span>: doc[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(dvecs))
]

milvus_client = MilvusClient(<span class="hljs-string">&quot;./milvus_jina_demo.db&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;demo_collection&quot;</span>  <span class="hljs-comment"># Milvus collection name</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(collection_name=COLLECTION_NAME, dimension=DIMENSION)

res = milvus_client.insert(collection_name=COLLECTION_NAME, data=data)

<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&quot;insert_count&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Quanto ao argumento de <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Definir o <code translate="no">uri</code> como um ficheiro local, por exemplo,<code translate="no">./milvus.db</code>, é o método mais conveniente, uma vez que utiliza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">o Milvus Lite</a> para armazenar todos os dados neste ficheiro.</li>
<li>Se tiver uma grande escala de dados, pode configurar um servidor Milvus mais eficiente em <a href="https://milvus.io/docs/quickstart.md">docker ou kubernetes</a>. Nesta configuração, utilize o uri do servidor, por exemplo,<code translate="no">http://localhost:19530</code>, como o seu <code translate="no">uri</code>.</li>
<li>Se pretender utilizar <a href="https://zilliz.com/cloud">o Zilliz Cloud</a>, o serviço de nuvem totalmente gerido para o Milvus, ajuste os endereços <code translate="no">uri</code> e <code translate="no">token</code>, que correspondem ao <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint e</a> à <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">chave Api</a> no Zilliz Cloud.</li>
</ul>
</div>
<p>Com todos os dados na base de dados vetorial do Milvus, podemos agora efetuar uma pesquisa semântica gerando uma incorporação vetorial para a consulta e realizar uma pesquisa vetorial.</p>
<pre><code translate="no" class="language-python">queries = <span class="hljs-string">&quot;What event in 1956 marked the official birth of artificial intelligence as a discipline?&quot;</span>
qvecs = ef.encode_queries([queries]) <span class="hljs-comment"># This method uses `retrieval.query` as the task</span>

res = milvus_client.search(
    collection_name=COLLECTION_NAME,  <span class="hljs-comment"># target collection</span>
    data=[qvecs[<span class="hljs-number">0</span>]],  <span class="hljs-comment"># query vectors</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># number of returned entities</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],  <span class="hljs-comment"># specifies fields to be returned</span>
)[<span class="hljs-number">0</span>]

<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 1, 'distance': 0.8802614808082581, 'entity': {'text': &quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.&quot;, 'subject': 'history'}}
</code></pre>
<h2 id="Jina-Reranker" class="common-anchor-header">Jina Reranker<button data-href="#Jina-Reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Jina Ai também fornece rerankers para melhorar ainda mais a qualidade da recuperação após a pesquisa usando embeddings.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.<span class="hljs-property">model</span>.<span class="hljs-property">reranker</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">JinaRerankFunction</span>

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>

rf = <span class="hljs-title class_">JinaRerankFunction</span>(<span class="hljs-string">&quot;jina-reranker-v1-base-en&quot;</span>, jina_api_key)

query = <span class="hljs-string">&quot;What event in 1956 marked the official birth of artificial intelligence as a discipline?&quot;</span>

documents = [
    <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
    <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
    <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>,
]

<span class="hljs-title function_">rf</span>(query, documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[RerankResult(text=&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.&quot;, score=0.9370958209037781, index=1),
 RerankResult(text='The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.', score=0.35420963168144226, index=3),
 RerankResult(text=&quot;In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;, score=0.3498658835887909, index=0),
 RerankResult(text='In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.', score=0.2728956639766693, index=2)]
</code></pre>
