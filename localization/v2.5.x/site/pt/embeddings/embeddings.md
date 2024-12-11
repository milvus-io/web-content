---
id: embeddings.md
order: 1
summary: Saiba como gerar embeddings para os seus dados.
title: Visão geral da incorporação
---
<h1 id="Embedding-Overview" class="common-anchor-header">Visão geral da incorporação<button data-href="#Embedding-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>A incorporação é um conceito de aprendizagem automática para mapear dados num espaço de elevada dimensão, onde dados de semântica semelhante são colocados próximos uns dos outros. Sendo normalmente uma Rede Neuronal Profunda do BERT ou de outras famílias de Transformadores, o modelo de incorporação pode representar eficazmente a semântica de texto, imagens e outros tipos de dados com uma série de números conhecidos como vectores. Uma caraterística fundamental destes modelos é que a distância matemática entre vectores no espaço de elevada dimensão pode indicar a semelhança da semântica do texto ou das imagens originais. Esta propriedade abre muitas aplicações de recuperação de informação, como os motores de pesquisa da Web, como o Google e o Bing, a pesquisa de produtos e as recomendações em sítios de comércio eletrónico, e o paradigma recentemente popular da Geração Aumentada de Recuperação (RAG) na IA generativa.</p>
<p>Existem duas categorias principais de embeddings, cada uma produzindo um tipo diferente de vetor:</p>
<ul>
<li><p><strong>Incorporação densa</strong>: A maioria dos modelos de incorporação representa a informação como um vetor de vírgula flutuante de centenas a milhares de dimensões. O resultado é designado por vectores "densos", uma vez que a maioria das dimensões tem valores diferentes de zero. Por exemplo, o popular modelo de incorporação de fonte aberta BAAI/bge-base-en-v1.5 produz vectores de 768 números de vírgula flutuante (vetor flutuante de 768 dimensões).</p></li>
<li><p><strong>Incorporação esparsa</strong>: Em contrapartida, os vectores de saída das incorporações esparsas têm a maior parte das dimensões igual a zero, nomeadamente os vectores "esparsos". Estes vectores têm frequentemente dimensões muito mais elevadas (dezenas de milhares ou mais), o que é determinado pela dimensão do vocabulário de símbolos. Os vectores esparsos podem ser gerados por redes neurais profundas ou pela análise estatística de corpora de texto. Devido à sua interpretabilidade e às melhores capacidades de generalização observadas fora do domínio, as incorporações esparsas são cada vez mais adoptadas pelos programadores como um complemento às incorporações densas.</p></li>
</ul>
<p>Milvus é uma base de dados vetorial concebida para a gestão, armazenamento e recuperação de dados vectoriais. Ao integrar os principais modelos de incorporação e <a href="https://milvus.io/docs/rerankers-overview.md">classificação</a>, pode facilmente transformar o texto original em vectores pesquisáveis ou classificar os resultados utilizando modelos poderosos para obter resultados mais precisos para RAG. Esta integração simplifica a transformação de texto e elimina a necessidade de componentes adicionais de incorporação ou classificação, optimizando assim o desenvolvimento e a validação de RAG.</p>
<p>Para criar embeddings em ação, consulte <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb">Utilizar o modelo do PyMilvus para gerar embeddings de texto</a>.</p>
<table>
<thead>
<tr><th>Função de incorporação</th><th>Tipo de função</th><th>API ou código aberto</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/OpenAIEmbeddingFunction/OpenAIEmbeddingFunction.md">openai</a></td><td>Densa</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/SentenceTransformerEmbeddingFunction/SentenceTransformerEmbeddingFunction.md">transformador de frases</a></td><td>Denso</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/SpladeEmbeddingFunction/SpladeEmbeddingFunction.md">Splade</a></td><td>Esparso</td><td>De fonte aberta</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/BGEM3EmbeddingFunction/BGEM3EmbeddingFunction.md">bge-m3</a></td><td>Híbrido</td><td>De fonte aberta</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/VoyageEmbeddingFunction/VoyageEmbeddingFunction.md">voyageai</a></td><td>Densa</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/JinaEmbeddingFunction/JinaEmbeddingFunction.md">jina</a></td><td>Densa</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/CohereEmbeddingFunction/CohereEmbeddingFunction.md">cohere</a></td><td>Densa</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/InstructorEmbeddingFunction/InstructorEmbeddingFunction.md">Instrutor</a></td><td>Densa</td><td>Código aberto</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/MistralAIEmbeddingFunction/MistralAIEmbeddingFunction.md">IA Mistral</a></td><td>Densa</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/NomicEmbeddingFunction/NomicEmbeddingFunction.md">Nomic</a></td><td>Densa</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/MGTEEmbeddingFunction/MGTEEmbeddingFunction.md">mGTE</a></td><td>Híbrida</td><td>De fonte aberta</td></tr>
</tbody>
</table>
<h2 id="Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="common-anchor-header">Exemplo 1: Utilizar a função de incorporação predefinida para gerar vectores densos<button data-href="#Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>Para usar funções de incorporação com Milvus, primeiro instale a biblioteca cliente PyMilvus com o subpacote <code translate="no">model</code> que envolve todos os utilitários para a geração de incorporação.</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>O subpacote <code translate="no">model</code> suporta vários modelos de incorporação, desde <a href="https://milvus.io/docs/embed-with-openai.md">OpenAI</a>, <a href="https://milvus.io/docs/embed-with-sentence-transform.md">Sentence Transformers</a>, <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a>, até modelos pré-treinados <a href="https://milvus.io/docs/embed-with-splade.md">SPLADE</a>. Por uma questão de simplicidade, este exemplo utiliza o <code translate="no">DefaultEmbeddingFunction</code> que é um modelo de transformador de frases <strong>totalmente MiniLM-L6-v2</strong>, o modelo tem cerca de 70MB e será descarregado durante a primeira utilização:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># This will download &quot;all-MiniLM-L6-v2&quot;, a light weight model.</span>
ef = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Data from which embeddings are to be generated </span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>O resultado esperado é semelhante ao seguinte:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">-3.09392996e-02</span>, <span class="hljs-number">-1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       <span class="hljs-number">-4.86349640e-03</span>, <span class="hljs-number">-3.12581174e-02</span>, <span class="hljs-number">-3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       <span class="hljs-number">-4.61330153e-02</span>, <span class="hljs-number">-4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       <span class="hljs-number">-4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, <span class="hljs-number">-5.36676683e-02</span>],
      dtype=<span class="hljs-type">float32</span>)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="common-anchor-header">Exemplo 2: Gerar vectores densos e esparsos numa única chamada com o modelo BGE M3<button data-href="#Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Neste exemplo, utilizamos o modelo híbrido <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a> para incorporar texto em vectores densos e esparsos e utilizá-los para obter documentos relevantes. Os passos gerais são os seguintes:</p>
<ol>
<li><p>Incorporar o texto como vectores densos e esparsos utilizando o modelo BGE-M3;</p></li>
<li><p>Criar uma coleção Milvus para armazenar os vectores densos e esparsos;</p></li>
<li><p>Inserir os dados no Milvus;</p></li>
<li><p>Pesquisar e inspecionar o resultado.</p></li>
</ol>
<p>Primeiro, precisamos de instalar as dependências necessárias.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.<span class="hljs-property">model</span>.<span class="hljs-property">hybrid</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">BGEM3EmbeddingFunction</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    utility,
    <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>,
    <span class="hljs-title class_">Collection</span>, <span class="hljs-title class_">AnnSearchRequest</span>, <span class="hljs-title class_">RRFRanker</span>, connections,
)
<button class="copy-code-btn"></button></code></pre>
<p>Utilizar o BGE M3 para codificar documentos e consultas para recuperação por incorporação.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Who started AI research?&quot;</span>

<span class="hljs-comment"># BGE-M3 model can embed texts as dense and sparse vectors.</span>
<span class="hljs-comment"># It is included in the optional `model` module in pymilvus, to install it,</span>
<span class="hljs-comment"># simply run &quot;pip install pymilvus[model]&quot;.</span>

bge_m3_ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)

docs_embeddings = bge_m3_ef(docs)
query_embeddings = bge_m3_ef([query])
<button class="copy-code-btn"></button></code></pre>
