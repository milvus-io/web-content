---
id: quickstart.md
summary: Comece a utilizar o Milvus.
title: Introdução rápida
---
<h1 id="Quickstart-with-Milvus-Lite" class="common-anchor-header">Introdução rápida ao Milvus Lite<button data-href="#Quickstart-with-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/tutorials/quickstart/quickstart.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/quickstart.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Os vetores, o formato de dados de saída dos modelos de redes neurais, podem codificar informações de forma eficaz e desempenham um papel fundamental em aplicações de IA, tais como bases de conhecimento, pesquisa semântica, Retrieval Augmented Generation (RAG) e muito mais.</p>
<p>O Milvus é uma base de dados de vetores de código aberto adequada para aplicações de IA de qualquer dimensão, desde a execução de um chatbot de demonstração no Jupyter Notebook até à criação de um sistema de pesquisa à escala da Web que atenda milhares de milhões de utilizadores. Neste guia, iremos orientá-lo sobre como configurar o Milvus localmente em poucos minutos e utilizar a biblioteca cliente Python para gerar, armazenar e pesquisar vetores.</p>
<h2 id="Install-Milvus" class="common-anchor-header">Instalar o Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Neste guia, utilizamos o Milvus Lite, uma biblioteca Python incluída em <code translate="no">pymilvus</code> que pode ser incorporada na aplicação cliente. O Milvus também suporta a implementação no <a href="https://milvus.io/docs/install_standalone-docker.md">Docker</a> e no <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a> para casos de utilização em produção.</p>
<p>Antes de começar, certifique-se de que tem o Python 3.8 ou superior disponível no ambiente local. Instale o <code translate="no">pymilvus</code>, que contém tanto a biblioteca cliente Python como o Milvus Lite:</p>
<pre><code translate="no" class="language-python">$ pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Se estiver a utilizar o Google Colab, para ativar as dependências que acabou de instalar, poderá ser necessário <strong>reiniciar o ambiente de execução</strong>. (Clique no menu «Runtime» na parte superior do ecrã e selecione «Restart session» no menu suspenso).</p>
</blockquote>
</div>
<h2 id="Set-Up-Vector-Database" class="common-anchor-header">Configurar a base de dados vetorial<button data-href="#Set-Up-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Para criar uma base de dados vetorial Milvus local, basta instanciar um ` <code translate="no">MilvusClient</code> `, especificando um nome de ficheiro para armazenar todos os dados, como «milvus_demo.db».</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-Collection" class="common-anchor-header">Criar uma coleção<button data-href="#Create-a-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>No Milvus, precisamos de uma coleção para armazenar vetores e os seus metadados associados. Pode pensar nela como uma tabela nas bases de dados SQL tradicionais. Ao criar uma coleção, pode definir parâmetros de esquema e de índice para configurar especificações vetoriais, tais como dimensionalidade, tipos de índice e métricas de distância. Existem também conceitos complexos para otimizar o índice com vista ao desempenho da pesquisa de vetores. Por agora, vamos concentrar-nos apenas no básico e utilizar as predefinições sempre que possível. No mínimo, só precisa de definir o nome da coleção e a dimensão do campo vetorial da coleção.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> client.has_collection(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>):
    client.drop_collection(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">768</span>,  <span class="hljs-comment"># The vectors we will use in this demo has 768 dimensions</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Na configuração acima,</p>
<ul>
<li>A chave primária e os campos vetoriais utilizam os seus nomes predefinidos («id» e «vector»).</li>
<li>O tipo de métrica (definição de distância vetorial) está definido para o seu valor predefinido (<a href="https://milvus.io/docs/metric.md#Cosine-Similarity">COSINE</a>).</li>
<li>O campo da chave primária aceita números inteiros e não é incrementado automaticamente (ou seja, não utiliza <a href="https://milvus.io/docs/schema.md">a funcionalidade de identificação automática</a>).
Em alternativa, pode definir formalmente o esquema da coleção seguindo estas <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">instruções</a>.</li>
</ul>
<h2 id="Prepare-Data" class="common-anchor-header">Preparar os dados<button data-href="#Prepare-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Neste guia, utilizamos vetores para realizar pesquisas semânticas em texto. Precisamos de gerar vetores para o texto através do download de modelos de embedding. Isto pode ser feito facilmente utilizando as funções utilitárias da biblioteca <code translate="no">pymilvus[model]</code>.</p>
<h2 id="Represent-text-with-vectors" class="common-anchor-header">Representar texto com vetores<button data-href="#Represent-text-with-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>Primeiro, instale a biblioteca de modelos. Este pacote inclui ferramentas essenciais de ML, como o PyTorch. O download do pacote pode demorar algum tempo se o seu ambiente local nunca tiver instalado o PyTorch.</p>
<pre><code translate="no" class="language-python">$ pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Gerar embeddings vetoriais com o modelo predefinido. O Milvus espera que os dados sejam inseridos organizados como uma lista de dicionários, em que cada dicionário representa um registo de dados, denominado «entidade».</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># If connection to https://huggingface.co/ failed, uncomment the following path</span>
<span class="hljs-comment"># import os</span>
<span class="hljs-comment"># os.environ[&#x27;HF_ENDPOINT&#x27;] = &#x27;https://hf-mirror.com&#x27;</span>

<span class="hljs-comment"># This will download a small embedding model &quot;paraphrase-albert-small-v2&quot; (~50MB).</span>
embedding_fn = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

vectors = embedding_fn.encode_documents(docs)
<span class="hljs-comment"># The output vector has 768 dimensions, matching the collection that we just created.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, embedding_fn.dim, vectors[<span class="hljs-number">0</span>].shape)  <span class="hljs-comment"># Dim: 768 (768,)</span>

<span class="hljs-comment"># Each entity has id, vector representation, raw text, and a subject label that we use</span>
<span class="hljs-comment"># to demo metadata filtering later.</span>
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors))
]

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data has&quot;</span>, <span class="hljs-built_in">len</span>(data), <span class="hljs-string">&quot;entities, each with fields: &quot;</span>, data[<span class="hljs-number">0</span>].keys())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Vector dim:&quot;</span>, <span class="hljs-built_in">len</span>(data[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;vector&quot;</span>]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dim: <span class="hljs-number">768</span> (<span class="hljs-number">768</span>,)
Data has <span class="hljs-number">3</span> entities, <span class="hljs-keyword">each</span> <span class="hljs-keyword">with</span> fields:  dict_keys([<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;subject&#x27;</span>])
Vector dim: <span class="hljs-number">768</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Alternatively-Use-fake-representation-with-random-vectors" class="common-anchor-header">[Alternativamente] Utilize uma representação fictícia com vetores aleatórios<button data-href="#Alternatively-Use-fake-representation-with-random-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>Se não conseguiu descarregar o modelo devido a problemas de rede, como solução alternativa, pode utilizar vetores aleatórios para representar o texto e, assim, concluir o exemplo. Tenha apenas em atenção que o resultado da pesquisa não refletirá a semelhança semântica, uma vez que os vetores são fictícios.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<span class="hljs-comment"># Use fake representation with random vectors (768 dimension).</span>
vectors = [[random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">768</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> docs]
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors))
]

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data has&quot;</span>, <span class="hljs-built_in">len</span>(data), <span class="hljs-string">&quot;entities, each with fields: &quot;</span>, data[<span class="hljs-number">0</span>].keys())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Vector dim:&quot;</span>, <span class="hljs-built_in">len</span>(data[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;vector&quot;</span>]))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Data has <span class="hljs-number">3</span> entities, <span class="hljs-keyword">each</span> <span class="hljs-keyword">with</span> fields:  dict_keys([<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;subject&#x27;</span>])
Vector dim: <span class="hljs-number">768</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-Data" class="common-anchor-header">Inserir dados<button data-href="#Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Vamos inserir os dados na coleção:</p>
<pre><code translate="no" class="language-python">res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{<span class="hljs-string">&#x27;insert_count&#x27;</span>: 3, <span class="hljs-string">&#x27;ids&#x27;</span>: [0, 1, 2], <span class="hljs-string">&#x27;cost&#x27;</span>: 0}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Semantic-Search" class="common-anchor-header">Pesquisa semântica<button data-href="#Semantic-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Agora podemos efetuar pesquisas semânticas representando o texto da consulta de pesquisa como um vetor e realizar uma pesquisa de semelhança de vetores no Milvus.</p>
<h3 id="Vector-search" class="common-anchor-header">Pesquisa vetorial<button data-href="#Vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>O Milvus aceita uma ou várias solicitações de pesquisa vetorial ao mesmo tempo. O valor da variável `query_vectors` é uma lista de vetores, em que cada vetor é uma matriz de números de tipo float.</p>
<pre><code translate="no" class="language-python">query_vectors = embedding_fn.encode_queries([<span class="hljs-string">&quot;Who is Alan Turing?&quot;</span>])
<span class="hljs-comment"># If you don&#x27;t have the embedding function you can use a fake vector to finish the demo:</span>
<span class="hljs-comment"># query_vectors = [ [ random.uniform(-1, 1) for _ in range(768) ] ]</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,  <span class="hljs-comment"># target collection</span>
    data=query_vectors,  <span class="hljs-comment"># query vectors</span>
    limit=<span class="hljs-number">2</span>,  <span class="hljs-comment"># number of returned entities</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],  <span class="hljs-comment"># specifies fields to be returned</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-keyword">data</span>: [<span class="hljs-string">&quot;[{&#x27;id&#x27;: 2, &#x27;distance&#x27;: 0.5859944820404053, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Born in Maida Vale, London, Turing was raised in southern England.&#x27;, &#x27;subject&#x27;: &#x27;history&#x27;}}, {&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.5118255615234375, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Alan Turing was the first person to conduct substantial research in AI.&#x27;, &#x27;subject&#x27;: &#x27;history&#x27;}}]&quot;</span>] , extra_info: {<span class="hljs-string">&#x27;cost&#x27;</span>: <span class="hljs-number">0</span>}
<button class="copy-code-btn"></button></code></pre>
<p>O resultado é uma lista de resultados, cada um correspondendo a uma consulta de pesquisa vetorial. Cada consulta contém uma lista de resultados, em que cada resultado contém a chave primária da entidade, a distância em relação ao vetor de consulta e os detalhes da entidade com o parâmetro « <code translate="no">output_fields</code> » especificado.</p>
<h2 id="Vector-Search-with-Metadata-Filtering" class="common-anchor-header">Pesquisa vetorial com filtragem de metadados<button data-href="#Vector-Search-with-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>Também é possível realizar uma pesquisa vetorial tendo em conta os valores dos metadados (denominados campos «escalares» no Milvus, uma vez que «escalar» se refere a dados não vetoriais). Isto é feito através de uma expressão de filtro que especifica determinados critérios. Vejamos como pesquisar e filtrar com o campo « <code translate="no">subject</code> » no exemplo seguinte.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert more docs in another subject.</span>
docs = [
    <span class="hljs-string">&quot;Machine learning has been used for drug design.&quot;</span>,
    <span class="hljs-string">&quot;Computational synthesis with AI algorithms predicts molecular properties.&quot;</span>,
    <span class="hljs-string">&quot;DDR1 is involved in cancers and fibrosis.&quot;</span>,
]
vectors = embedding_fn.encode_documents(docs)
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span> + i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;biology&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors))
]

client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)

<span class="hljs-comment"># This will exclude any text in &quot;history&quot; subject despite close to the query vector.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=embedding_fn.encode_queries([<span class="hljs-string">&quot;tell me AI related information&quot;</span>]),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;biology&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-keyword">data</span>: [<span class="hljs-string">&quot;[{&#x27;id&#x27;: 4, &#x27;distance&#x27;: 0.27030569314956665, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Computational synthesis with AI algorithms predicts molecular properties.&#x27;, &#x27;subject&#x27;: &#x27;biology&#x27;}}, {&#x27;id&#x27;: 3, &#x27;distance&#x27;: 0.16425910592079163, &#x27;entity&#x27;: {&#x27;text&#x27;: &#x27;Machine learning has been used for drug design.&#x27;, &#x27;subject&#x27;: &#x27;biology&#x27;}}]&quot;</span>] , extra_info: {<span class="hljs-string">&#x27;cost&#x27;</span>: <span class="hljs-number">0</span>}
<button class="copy-code-btn"></button></code></pre>
<p>Por predefinição, os campos escalares não são indexados. Se precisar de realizar uma pesquisa filtrada por metadados num conjunto de dados de grande dimensão, pode considerar a utilização de um esquema fixo e também ativar o <a href="https://milvus.io/docs/scalar_index.md">índice</a> para melhorar o desempenho da pesquisa.</p>
<p>Para além da pesquisa vetorial, também pode realizar outros tipos de pesquisas:</p>
<h3 id="Query" class="common-anchor-header">Consulta<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h3><p>Uma consulta (query()) é uma operação que recupera todas as entidades que correspondem a um critério, como uma <a href="https://milvus.io/docs/boolean.md">expressão de filtro</a> ou a correspondência com determinados IDs.</p>
<p>Por exemplo, recuperar todas as entidades cujo campo escalar tenha um valor específico:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Recuperar entidades diretamente pela chave primária:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    ids=[<span class="hljs-number">0</span>, <span class="hljs-number">2</span>],
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-Entities" class="common-anchor-header">Eliminar entidades<button data-href="#Delete-Entities" class="anchor-icon" translate="no">
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
    </button></h2><p>Se pretender eliminar dados, pode eliminar entidades especificando a chave primária ou eliminar todas as entidades que correspondam a uma determinada expressão de filtro.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Delete entities by primary key</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">0</span>, <span class="hljs-number">2</span>])

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete entities by a filter expression</span>
res = client.delete(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;biology&#x27;&quot;</span>,
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[<span class="hljs-meta">0, 2</span>]
[<span class="hljs-meta">3, 4, 5</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Existing-Data" class="common-anchor-header">Carregar dados existentes<button data-href="#Load-Existing-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma vez que todos os dados do Milvus Lite são armazenados num ficheiro local, pode carregar todos os dados na memória mesmo após o programa terminar, criando uma coleção de dados ( <code translate="no">MilvusClient</code> ) a partir do ficheiro existente. Por exemplo, isto irá recuperar as coleções do ficheiro «milvus_demo.db» e continuar a escrever dados nesse ficheiro.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-the-collection" class="common-anchor-header">Eliminar a coleção<button data-href="#Drop-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Se pretender eliminar todos os dados de uma coleção, pode eliminar a coleção com</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Drop collection</span>
client.drop_collection(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Learn-More" class="common-anchor-header">Saiba mais<button data-href="#Learn-More" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus Lite é excelente para dar os primeiros passos com um programa Python local. Se tiver dados em grande escala ou pretender utilizar o Milvus em produção, pode informar-se sobre como implementar o Milvus no <a href="https://milvus.io/docs/install_standalone-docker.md">Docker</a> e <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">no Kubernetes</a>. Todos os modos de implementação do Milvus partilham a mesma API, pelo que o seu código do lado do cliente não precisa de sofrer grandes alterações se mudar para outro modo de implementação. Basta especificar a <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md">URI e o token</a> de um servidor Milvus implementado em qualquer lugar:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Para migrar dados do Milvus Lite para o Milvus implementado no Docker ou no Kubernetes, consulte <a href="https://github.com/milvus-io/milvus-lite?tab=readme-ov-file#migrating-data-from-milvus-lite">«Migrar dados do Milvus Lite</a>».</p>
<p>O Milvus disponibiliza APIs REST e gRPC, com bibliotecas de cliente em linguagens como <a href="https://milvus.io/docs/install-pymilvus.md">Python</a>, <a href="https://milvus.io/docs/install-java.md">Java</a>, <a href="https://milvus.io/docs/install-go.md">Go</a>, C# e <a href="https://milvus.io/docs/install-node.md">Node.js.</a></p>
<p>No que diz respeito ao desenho de esquemas, o Milvus suporta um desenho flexível, onde pode definir os campos e os seus tipos de dados, incluindo campos vetoriais. Também pode definir o tipo de índice e os parâmetros para cada campo. Para mais informações, consulte <a href="https://milvus.io/docs/schema-hands-on.md">«Desenho do modelo de dados para pesquisa</a>».</p>
<h2 id="Milvus-for-AI-Agents" class="common-anchor-header">Milvus para agentes de IA<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h2><p>Se estiver a utilizar assistentes de codificação de IA, como o Claude Code ou o Cursor, pode instalar <a href="https://github.com/zilliztech/milvus-skill">o Milvus Skill</a> para ajudar as suas ferramentas de IA a escrever código Milvus correto.</p>
<p>Para mais ferramentas de agentes, incluindo servidores MCP e prompts selecionados, consulte <a href="/docs/pt/milvus_for_agents.md">Milvus para Agentes de IA</a>.</p>
