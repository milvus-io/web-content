---
id: quickstart_with_attu.md
summary: >-
  O Attu é uma ferramenta de administração tudo-em-um e de código aberto para o
  Milvus. Possui uma interface gráfica do utilizador (GUI) intuitiva, que lhe
  permite interagir facilmente com as suas bases de dados. Com apenas alguns
  cliques, pode visualizar o estado do seu cluster, gerir metadados, efetuar
  consultas de dados e muito mais.
title: Início rápido com o Attu - a interface Web do Milvus
---
<h1 id="Quick-Start-with-Attu-Desktop" class="common-anchor-header">Início rápido com o Attu Desktop<button data-href="#Quick-Start-with-Attu-Desktop" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="1-Introduction" class="common-anchor-header">1. Introdução<button data-href="#1-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu">O Attu</a> é uma ferramenta de administração tudo-em-um e de código aberto para o Milvus. Apresenta uma interface gráfica de utilizador (GUI) intuitiva, permitindo-lhe interagir facilmente com as suas bases de dados. Com apenas alguns cliques, é possível visualizar o status do cluster, gerenciar metadados, realizar consultas de dados e muito mais.</p>
<hr>
<h2 id="2-Install-Desktop-Application" class="common-anchor-header">2. Instalar a aplicação para ambiente de trabalho<button data-href="#2-Install-Desktop-Application" class="anchor-icon" translate="no">
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
    </button></h2><p>Baixe a versão desktop do Attu visitando a <a href="https://github.com/zilliztech/attu/releases">página de Lançamentos do Attu no GitHub</a>. Selecione a versão apropriada para o seu sistema operacional e siga as etapas de instalação.</p>
<h3 id="Note-for-macOS-M-series-chip" class="common-anchor-header">Nota para o macOS (chip da série M):</h3><p>Se encontrar o erro:</p>
<pre><code translate="no">attu.app <span class="hljs-keyword">is</span> damaged <span class="hljs-keyword">and</span> cannot be opened.
<button class="copy-code-btn"></button></code></pre>
<p>Execute o seguinte comando no terminal para contornar esse problema:</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> xattr -rd com.apple.quarantine /Applications/attu.app
<button class="copy-code-btn"></button></code></pre>
<hr>
<h2 id="3-Connect-to-Milvus" class="common-anchor-header">3. Ligar ao Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>O Attu suporta a ligação ao <strong>Milvus Standalone</strong> e ao <strong>Zilliz Cloud</strong>, proporcionando flexibilidade para trabalhar com bases de dados locais ou alojadas na nuvem.</p>
<p>Para utilizar o Milvus Standalone localmente:</p>
<ol>
<li>Inicie o Milvus Standalone seguindo o <a href="https://milvus.io/docs/install_standalone-docker.md">guia de instalação do Milvus</a>.</li>
<li>Abra o Attu e introduza as informações de ligação:<ul>
<li>Endereço do Milvus: O URI do seu servidor Milvus Standalone, por exemplo, http://localhost:19530</li>
<li>Outras definições opcionais: Pode defini-las em função das configurações do seu Milvus ou deixá-las como predefinidas.</li>
</ul></li>
<li>Clique em Connect para aceder à sua base de dados.</li>
</ol>
<blockquote>
<p>Também pode ligar o Milvus totalmente gerido no <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Basta definir os endereços <code translate="no">Milvus Address</code> e <code translate="no">token</code> para o <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint e a chave API</a> da sua instância Zilliz Cloud.</p>
</blockquote>
<ol start="4">
<li>Clique para aceder à sua base de dados.</li>
</ol>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_login_page.png" alt="Attu Login Page" width="80%">
</p>
<hr>
<h2 id="4-Prepare-Data-Create-Collection-and-Insert-Data" class="common-anchor-header">4. Preparar dados, criar coleção e inserir dados<button data-href="#4-Prepare-Data-Create-Collection-and-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="41-Prepare-the-Data" class="common-anchor-header">4.1 Preparar os dados</h3><p>Utilizamos as páginas de FAQ da <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Documentação do Milvus 2.4.x</a> como conjunto de dados para este exemplo.</p>
<h4 id="Download-and-Extract-Data" class="common-anchor-header">Download e extração de dados:</h4><pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<h4 id="Process-Markdown-Files" class="common-anchor-header">Processar arquivos Markdown:</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []
<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()
    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="42-Generate-Embeddings" class="common-anchor-header">4.2 Gerar embeddings</h3><p>Defina um modelo de incorporação para gerar incorporação de texto usando o <code translate="no">milvus_model</code>. Usamos o modelo <code translate="no">DefaultEmbeddingFunction</code> como exemplo, que é um modelo de incorporação pré-treinado e leve.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model <span class="hljs-keyword">as</span> milvus_model

embedding_model = milvus_model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Generate test embedding</span>
test_embedding = embedding_model.encode_queries([<span class="hljs-string">&quot;This is a test&quot;</span>])[<span class="hljs-number">0</span>]
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<h4 id="Output" class="common-anchor-header">Saída:</h4><pre><code translate="no">768
[-0.04836066  0.07163023 -0.01130064 -0.03789345 -0.03320649 -0.01318448
 -0.03041712 -0.02269499 -0.02317863 -0.00426028]
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="43-Create-Collection" class="common-anchor-header">4.3 Criar coleção</h3><p>Ligue-se ao Milvus e crie uma coleção:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;attu_tutorial&quot;</span>

<span class="hljs-comment"># Drop collection if it exists</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection</span>
client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="44-Insert-Data" class="common-anchor-header">4.4 Inserir dados</h3><p>Itere pelas linhas de texto, crie embeddings e insira os dados no Milvus:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
doc_embeddings = embedding_model.encode_documents(text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc_embeddings[i], <span class="hljs-string">&quot;text&quot;</span>: line})

client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="45-Visualize-Data-and-Schema" class="common-anchor-header">4.5 Visualizar dados e esquema</h3><p>Agora podemos visualizar o esquema de dados e as entidades inseridas usando a interface do Attu. O esquema apresenta campos definidos, incluindo um campo <code translate="no">id</code> do tipo <code translate="no">Int64</code> e um campo <code translate="no">vector</code> do tipo <code translate="no">FloatVector(768)</code> com uma métrica <code translate="no">Inner Product (IP)</code>. A coleção é carregada com <strong>72 entidades</strong>.</p>
<p>Além disso, podemos ver os dados inseridos, incluindo ID, incorporação de vectores e campos dinâmicos que armazenam metadados, como conteúdo de texto. A interface suporta a filtragem e a consulta com base em condições especificadas ou em campos dinâmicos.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_1.png" alt="Schema View" width="45%" />
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_2.png" alt="Data View" width="45%" />
</p>
<h2 id="5-Visualizing-Search-Results-and-Relationships" class="common-anchor-header">5. Visualizar resultados de pesquisa e relações<button data-href="#5-Visualizing-Search-Results-and-Relationships" class="anchor-icon" translate="no">
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
    </button></h2><p>O Attu fornece uma interface poderosa para visualizar e explorar relações de dados. Para examinar os pontos de dados inseridos e suas relações de similaridade, siga estas etapas:</p>
<h3 id="51-Perform-a-Search" class="common-anchor-header">5.1 <strong>Realizar uma pesquisa</strong></h3><p>Navegue até a guia <strong>Pesquisa de Vetor</strong> no Attu.</p>
<ol>
<li>Clique no botão <strong>Gerar dados aleatórios</strong> para criar consultas de teste.</li>
<li>Clique em <strong>Pesquisar</strong> para obter resultados com base nos dados gerados.</li>
</ol>
<p>Os resultados são apresentados numa tabela, mostrando IDs, pontuações de similaridade e campos dinâmicos para cada entidade correspondente.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_table.png" alt="Search Results Table" width="80%">
</p>
<hr>
<h3 id="52-Explore-Data-Relationships" class="common-anchor-header">5.2 <strong>Explorar relações de dados</strong></h3><p>Clique no botão <strong>Explorar</strong> no painel de resultados para visualizar as relações entre o vetor de consulta e os resultados da pesquisa em uma <strong>estrutura semelhante a um gráfico de conhecimento</strong>.</p>
<ul>
<li>O <strong>nó central</strong> representa o vetor de pesquisa.</li>
<li>Os <strong>nós ligados</strong> representam os resultados da pesquisa, clicando neles serão apresentadas as informações detalhadas do nó correspondente.</li>
</ul>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_graph.png" alt="Knowledge Graph Visualization" width="80%">
</p>
<hr>
<h3 id="53-Expand-the-Graph" class="common-anchor-header">5.3 <strong>Expandir o gráfico</strong></h3><p>Faça duplo clique em qualquer nó de resultado para expandir as suas ligações. Esta ação revela relações adicionais entre o nó selecionado e outros pontos de dados na coleção, criando um <strong>gráfico de conhecimento maior e interligado</strong>.</p>
<p>Esta vista expandida permite uma exploração mais profunda da forma como os pontos de dados estão relacionados, com base na semelhança dos vectores.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_expanded_searched_graph.png" alt="Expanded Knowledge Graph" width="80%">
</p>
<hr>
<h2 id="6-Conclusion" class="common-anchor-header">6. Conclusão<button data-href="#6-Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>O Attu simplifica a gestão e a visualização dos dados vectoriais armazenados no Milvus. Desde a inserção de dados à execução de consultas e à exploração interactiva, fornece uma interface intuitiva para lidar com tarefas complexas de pesquisa vetorial. Com funcionalidades como o suporte de esquemas dinâmicos, visualizações de pesquisa gráfica e filtros de consulta flexíveis, o Attu permite aos utilizadores analisar eficazmente conjuntos de dados de grande escala.</p>
<p>Ao tirar partido das ferramentas de exploração visual da Attu, os utilizadores podem compreender melhor os seus dados, identificar relações ocultas e tomar decisões baseadas em dados. Comece hoje mesmo a explorar os seus próprios conjuntos de dados com a Attu e o Milvus!</p>
<hr>
