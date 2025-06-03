---
id: schema-hands-on.md
title: Conceção de modelos de dados para pesquisa
summary: >-
  Os sistemas de recuperação de informação, também conhecidos como motores de
  pesquisa, são essenciais para várias aplicações de IA, como a geração
  aumentada por recuperação (RAG), a pesquisa visual e a recomendação de
  produtos. No centro destes sistemas está um modelo de dados cuidadosamente
  concebido para organizar, indexar e recuperar a informação.
---
<h1 id="Data-Model-Design-for-Search" class="common-anchor-header">Conceção de modelos de dados para pesquisa<button data-href="#Data-Model-Design-for-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Os sistemas de recuperação de informação, também conhecidos como motores de pesquisa, são essenciais para várias aplicações de IA, como a geração aumentada por recuperação (RAG), a pesquisa visual e a recomendação de produtos. No centro destes sistemas está um modelo de dados cuidadosamente concebido para organizar, indexar e recuperar a informação.</p>
<p>Milvus permite-lhe especificar o modelo de dados de pesquisa através de um esquema de coleção, organizando dados não estruturados, as suas representações vectoriais densas ou esparsas, e metadados estruturados. Quer esteja a trabalhar com texto, imagens ou outros tipos de dados, este guia prático ajudá-lo-á a compreender e a aplicar os principais conceitos de esquema para conceber um modelo de dados de pesquisa na prática.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/data-model-anatomy.png" alt="Data Model Anatomy" class="doc-image" id="data-model-anatomy" />
   </span> <span class="img-wrapper"> <span>Anatomia do modelo de dados</span> </span></p>
<h2 id="Data-Model" class="common-anchor-header">Modelo de dados<button data-href="#Data-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>O design do modelo de dados de um sistema de pesquisa envolve a análise das necessidades do negócio e a abstração da informação num modelo de dados expresso por um esquema. Um esquema bem definido é importante para alinhar o modelo de dados com os objectivos comerciais, garantindo a consistência dos dados e a qualidade do serviço.  Além disso, a escolha de tipos de dados e índices adequados é importante para atingir o objetivo comercial de forma económica.</p>
<h3 id="Analyzing-Business-Needs" class="common-anchor-header">Analisar as necessidades da empresa</h3><p>A resposta eficaz às necessidades da empresa começa com a análise dos tipos de consultas que os utilizadores irão efetuar e com a determinação dos métodos de pesquisa mais adequados.</p>
<ul>
<li><p><strong>Consultas do utilizador:</strong> Identificar os tipos de consultas que se espera que os utilizadores efectuem. Isto ajuda a garantir que o esquema suporta casos de utilização reais e optimiza o desempenho da pesquisa. Estas podem incluir:</p>
<ul>
<li><p>Recuperar documentos que correspondam a uma consulta de linguagem natural</p></li>
<li><p>Encontrar imagens semelhantes a uma imagem de referência ou que correspondam a uma descrição de texto</p></li>
<li><p>Pesquisa de produtos por atributos como nome, categoria ou marca</p></li>
<li><p>Filtragem de itens com base em metadados estruturados (por exemplo, data de publicação, etiquetas, classificações)</p></li>
<li><p>Combinação de vários critérios em consultas híbridas (por exemplo, na pesquisa visual, considerando a semelhança semântica das imagens e das suas legendas)</p></li>
</ul></li>
<li><p><strong>Métodos de pesquisa:</strong> Escolha as técnicas de pesquisa adequadas que se alinham com os tipos de consultas que os seus utilizadores irão realizar. Diferentes métodos servem diferentes objectivos e podem frequentemente ser combinados para obter resultados mais poderosos:</p>
<ul>
<li><p><strong>Pesquisa semântica</strong>: Utiliza a semelhança de vectores densos para encontrar itens com significado semelhante, ideal para dados não estruturados como texto ou imagens.</p></li>
<li><p><strong>Pesquisa de texto completo</strong>: Complementa a pesquisa semântica com correspondência de palavras-chave.  A pesquisa de texto completo pode utilizar a análise léxica para evitar a quebra de palavras longas em tokens fragmentados, captando os termos especiais durante a recuperação.</p></li>
<li><p><strong>Filtragem de metadados</strong>: No topo da pesquisa vetorial, aplicando restrições como intervalos de datas, categorias ou etiquetas.</p></li>
</ul></li>
</ul>
<h3 id="Translates-Business-Requirements-into-a-Search-Data-Model" class="common-anchor-header">Traduzir os requisitos comerciais num modelo de dados de pesquisa</h3><p>O próximo passo é traduzir os seus requisitos comerciais num modelo de dados concreto, identificando os principais componentes da sua informação e os respectivos métodos de pesquisa:</p>
<ul>
<li><p>Definir os dados que precisa de armazenar, tais como conteúdo em bruto (texto, imagens, áudio), metadados associados (títulos, etiquetas, autoria) e atributos contextuais (carimbos de data/hora, comportamento do utilizador, etc.)</p></li>
<li><p>Determine os tipos e formatos de dados adequados para cada elemento. Por exemplo:</p>
<ul>
<li><p>Descrições de texto → string</p></li>
<li><p>Embeddings de imagens ou documentos → vectores densos ou esparsos</p></li>
<li><p>Categorias, etiquetas ou bandeiras → cadeia de caracteres, matriz e bool</p></li>
<li><p>Atributos numéricos como preço ou classificação → integer ou float</p></li>
<li><p>Informação estruturada, como detalhes do autor -&gt; json</p></li>
</ul></li>
</ul>
<p>Uma definição clara destes elementos garante a consistência dos dados, resultados de pesquisa exactos e facilidade de integração com lógicas de aplicação a jusante.</p>
<h2 id="Schema-Design" class="common-anchor-header">Conceção do esquema<button data-href="#Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>No Milvus, o modelo de dados é expresso através de um esquema de coleção. A conceção dos campos certos dentro de um esquema de coleção é fundamental para permitir uma recuperação eficaz. Cada campo define um tipo específico de dados armazenados na coleção e desempenha um papel distinto no processo de pesquisa. Em termos gerais, Milvus suporta dois tipos principais de campos: <strong>campos</strong> <strong>vectoriais</strong> e <strong>campos escalares</strong>.</p>
<p>Agora, pode mapear o seu modelo de dados para um esquema de campos, incluindo vectores e quaisquer campos escalares auxiliares. Certifique-se de que cada campo está correlacionado com os atributos do seu modelo de dados, prestando especial atenção ao seu tipo de vetor (denso ou spase) e à sua dimensão.</p>
<h3 id="Vector-Field" class="common-anchor-header">Campo vetorial</h3><p>Os campos vectoriais armazenam embeddings para tipos de dados não estruturados, como texto, imagens e áudio. Esses embeddings podem ser densos, esparsos ou binários, dependendo do tipo de dados e do método de recuperação utilizado. Normalmente, os vectores densos são utilizados para a pesquisa semântica, enquanto os vectores esparsos são mais adequados para a correspondência de texto completo ou lexical. Os vectores binários são úteis quando os recursos de armazenamento e computacionais são limitados. Uma coleção pode conter vários campos vectoriais para permitir estratégias de recuperação multimodais ou híbridas. Para um guia detalhado sobre este tema, consulte a <a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida multi-vetorial</a>.</p>
<p>O Milvus suporta os tipos de dados vectoriais: <code translate="no">FLOAT_VECTOR</code> para <a href="/docs/pt/dense-vector.md">Vetor Denso</a>, <code translate="no">SPARSE_FLOAT_VECTOR</code> para <a href="/docs/pt/sparse_vector.md">Vetor Esparso</a> e <code translate="no">BINARY_VECTOR</code> para <a href="/docs/pt/binary-vector.md">Vetor Binário</a></p>
<h3 id="Scalar-Field" class="common-anchor-header">Campo escalar</h3><p>Os campos escalares armazenam valores primitivos e estruturados - geralmente chamados de metadados - como números, cadeias de caracteres ou datas. Esses valores podem ser retornados juntamente com os resultados da pesquisa vetorial e são essenciais para filtragem e classificação. Permitem-lhe limitar os resultados da pesquisa com base em atributos específicos, como limitar os documentos a uma determinada categoria ou a um intervalo de tempo definido.</p>
<p>Milvus suporta tipos escalares como <code translate="no">BOOL</code>, <code translate="no">INT8/16/32/64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code>, <code translate="no">JSON</code>, e <code translate="no">ARRAY</code> para armazenar e filtrar dados não vectoriais. Estes tipos aumentam a precisão e a personalização das operações de pesquisa.</p>
<h2 id="Leverage-Advanced-Features-in-Schema-Design" class="common-anchor-header">Tirar partido de funcionalidades avançadas na conceção de esquemas<button data-href="#Leverage-Advanced-Features-in-Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao conceber um esquema, não basta mapear os dados para os campos utilizando os tipos de dados suportados. É essencial ter um conhecimento profundo das relações entre campos e das estratégias disponíveis para configuração. Ter em mente as principais caraterísticas durante a fase de conceção garante que o esquema não só satisfaz os requisitos imediatos de tratamento de dados, como também é escalável e adaptável a necessidades futuras. Ao integrar cuidadosamente estas caraterísticas, pode construir uma arquitetura de dados forte que maximiza as capacidades do Milvus e apoia a sua estratégia e objectivos de dados mais amplos. Aqui está uma visão geral das principais caraterísticas que criam um esquema de coleção:</p>
<h3 id="Primary-Key" class="common-anchor-header">Chave primária</h3><p>Um campo de chave primária é um componente fundamental de um esquema, uma vez que identifica de forma única cada entidade dentro de uma coleção. A definição de uma chave primária é obrigatória. Deve ser um campo escalar de tipo inteiro ou de cadeia de caracteres e marcado como <code translate="no">is_primary=True</code>. Opcionalmente, pode ativar <code translate="no">auto_id</code> para a chave primária, à qual são atribuídos automaticamente números inteiros que crescem monoliticamente à medida que mais dados são ingeridos na coleção.</p>
<p>Para obter mais detalhes, consulte <a href="/docs/pt/primary-field.md">Campo primário e AutoID</a>.</p>
<h3 id="Partitioning" class="common-anchor-header">Particionamento</h3><p>Para acelerar a pesquisa, pode opcionalmente ativar o particionamento. Ao designar um campo escalar específico para o particionamento e ao especificar critérios de filtragem com base neste campo durante as pesquisas, o âmbito da pesquisa pode ser efetivamente limitado apenas às partições relevantes. Este método aumenta significativamente a eficiência das operações de recuperação, reduzindo o domínio de pesquisa.</p>
<p>Para mais pormenores, consulte <a href="/docs/pt/use-partition-key.md">Utilizar chave de partição</a>.</p>
<h3 id="Analyzer" class="common-anchor-header">Analisador</h3><p>Um analisador é uma ferramenta essencial para o processamento e transformação de dados de texto. A sua principal função é converter texto em bruto em tokens e estruturá-los para indexação e recuperação. Fá-lo através da tokenização da cadeia de caracteres, eliminando as palavras de paragem e transformando as palavras individuais em tokens.</p>
<p>Para obter mais detalhes, consulte <a href="/docs/pt/analyzer-overview.md">Visão geral do analisador</a>.</p>
<h3 id="Function" class="common-anchor-header">Funções</h3><p>O Milvus permite-lhe definir funções incorporadas como parte do esquema para derivar automaticamente determinados campos. Por exemplo, pode adicionar uma função BM25 integrada que gera um vetor esparso a partir de um campo <code translate="no">VARCHAR</code> para suportar a pesquisa de texto integral. Estes campos derivados de funções simplificam o pré-processamento e asseguram que a coleção permanece autónoma e pronta a ser consultada.</p>
<p>Para mais pormenores, consulte <a href="/docs/pt/full-text-search.md">Pesquisa de texto integral</a>.</p>
<h2 id="A-Real-World-Example" class="common-anchor-header">Um exemplo do mundo real<button data-href="#A-Real-World-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>Nesta secção, vamos delinear a conceção do esquema e o exemplo de código para uma aplicação de pesquisa de documentos multimédia mostrada no diagrama acima. Este esquema foi concebido para gerir um conjunto de dados que contém artigos com mapeamento de dados para os seguintes campos:</p>
<table>
   <tr>
     <th><p><strong>Campo</strong></p></th>
     <th><p><strong>Fonte de dados</strong></p></th>
     <th><p><strong>Utilizado pelos métodos de pesquisa</strong></p></th>
     <th><p><strong>Chave primária</strong></p></th>
     <th><p><strong>Chave de partição</strong></p></th>
     <th><p><strong>Analisador</strong></p></th>
     <th><p><strong>Função de entrada/saída</strong></p></th>
   </tr>
   <tr>
     <td><p>article_id (<code translate="no">INT64</code>)</p></td>
     <td><p>gerado automaticamente com a opção activada <code translate="no">auto_id</code></p></td>
     <td><p><a href="/docs/pt/get-and-scalar-query.md">Consulta utilizando Get</a></p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>título (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>título do artigo</p></td>
     <td><p><a href="/docs/pt/keyword-match.md">Correspondência de texto</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>carimbo de data/hora (<code translate="no">INT32</code>)</p></td>
     <td><p>data de publicação</p></td>
     <td><p><a href="/docs/pt/use-partition-key.md">Filtrar por chave de partição</a></p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>texto (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>texto em bruto do artigo</p></td>
     <td><p><a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida multi-vetorial</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>entrada</p></td>
   </tr>
   <tr>
     <td><p>text_dense_vector (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>vetor denso gerado por um modelo de incorporação de texto</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/BaGlwzDmyiyVvVk6NurcFclInCd?from=from_parent_docs">Pesquisa básica de vectores</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>text_sparse_vector (<code translate="no">SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>vetor esparso gerado automaticamente por uma função BM25 incorporada</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/RQTRwhOVPiwnwokqr4scAtyfnBf?from=from_parent_docs">Pesquisa de texto completo</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>saída</p></td>
   </tr>
</table>
<p>Para mais informações sobre esquemas e orientações pormenorizadas sobre a adição de vários tipos de campos, consulte <a href="/docs/pt/schema.md">Schema Explained</a>.</p>
<h3 id="Initialize-schema" class="common-anchor-header">Inicializar o esquema</h3><p>Para começar, precisamos de criar um esquema vazio. Esta etapa estabelece uma estrutura básica para definir o modelo de dados.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create an empty schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">//Skip this step using JavaScript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Skip this step using cURL</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-fields" class="common-anchor-header">Adicionar campos</h3><p>Depois que o esquema é criado, a próxima etapa é especificar os campos que incluirão seus dados. Cada campo está associado aos seus respectivos tipos de dados e atributos.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, enable_analyzer=<span class="hljs-literal">True</span>, enable_match=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;timestamp&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish date&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">2000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article text content&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;timestamp&quot;</span>)
        .dataType(DataType.Int32)
        .build())
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">2000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;timestamp&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int32</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">2000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish date&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">2000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article text content&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;text dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;text sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;article_id&quot;,
        &quot;dataType&quot;: &quot;Int64&quot;,
        &quot;isPrimary&quot;: true
    },
    {
        &quot;fieldName&quot;: &quot;title&quot;,
        &quot;dataType&quot;: &quot;VarChar&quot;,
        &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 200,
            &quot;enable_analyzer&quot;: true,
            &quot;enable_match&quot;: true
        }
    },
    {
        &quot;fieldName&quot;: &quot;timestamp&quot;,
        &quot;dataType&quot;: &quot;Int32&quot;
    },
    {
       &quot;fieldName&quot;: &quot;text&quot;,
       &quot;dataType&quot;: &quot;VarChar&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 2000,
            &quot;enable_analyzer&quot;: true
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_dense_vector&quot;,
       &quot;dataType&quot;: &quot;FloatVector&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: 768
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_sparse_vector&quot;,
       &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Neste exemplo, os seguintes atributos são especificados para os campos:</p>
<ul>
<li><p>Chave primária: o <code translate="no">article_id</code> é usado como chave primária, permitindo a atribuição automática de chaves primárias para entidades de entrada.</p></li>
<li><p>Chave de partição: o <code translate="no">timestamp</code> é atribuído como uma chave de partição que permite a filtragem por partições. Esta pode ser</p></li>
<li><p>Analisador de texto: o analisador de texto é aplicado a 2 campos de cadeia <code translate="no">title</code> e <code translate="no">text</code> para suportar a correspondência de texto e a pesquisa de texto completo, respetivamente.</p></li>
</ul>
<h3 id="Optional-Add-functions" class="common-anchor-header">(Opcional) Adicionar funções</h3><p>Para melhorar as capacidades de consulta de dados, podem ser incorporadas funções no esquema. Por exemplo, pode ser criada uma função para processar dados relacionados com campos específicos.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse_vector&quot;</span>],
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">FunctionType</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;text_sparse_vector&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> myFunctions=<span class="hljs-string">&#x27;[
    {
        &quot;name&quot;: &quot;text_bm25&quot;,
        &quot;type&quot;: &quot;BM25&quot;,
        &quot;inputFieldNames&quot;: [&quot;text&quot;],
        &quot;outputFieldNames&quot;: [&quot;text_sparse_vector&quot;],
        &quot;params&quot;: {}
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
    \&quot;functions\&quot;: <span class="hljs-variable">$myFunctions</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Este exemplo adiciona uma função BM25 incorporada no schema, utilizando o campo <code translate="no">text</code> como entrada e armazenando os vectores esparsos resultantes no campo <code translate="no">text_sparse_vector</code>.</p>
<h2 id="Next-Steps" class="common-anchor-header">Próximas etapas<button data-href="#Next-Steps" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><a href="/docs/pt/create-collection.md">Criar coleção</a></p></li>
<li><p><a href="/docs/pt/alter-collection-field.md">Alterar campo da coleção</a></p></li>
</ul>
