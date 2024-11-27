---
id: full-text-search.md
title: Pesquisa de texto integral
related_key: 'full, text, search'
summary: >-
  A pesquisa de texto integral é uma funcionalidade que recupera documentos que
  contêm termos ou frases específicos em conjuntos de dados de texto,
  classificando depois os resultados com base na relevância.
---
<h1 id="Full-Text-Search​" class="common-anchor-header">Pesquisa de texto integral<button data-href="#Full-Text-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>A pesquisa de texto integral é uma funcionalidade que recupera documentos que contêm termos ou frases específicos em conjuntos de dados de texto, classificando depois os resultados com base na relevância. Esta funcionalidade ultrapassa as limitações da pesquisa semântica, que pode ignorar termos precisos, garantindo que recebe os resultados mais exactos e contextualmente relevantes. Além disso, simplifica as pesquisas vectoriais ao aceitar a entrada de texto em bruto, convertendo automaticamente os seus dados de texto em embeddings esparsos sem a necessidade de gerar manualmente embeddings vectoriais.</p>
<p>Utilizando o algoritmo BM25 para pontuação de relevância, esta funcionalidade é particularmente valiosa em cenários de geração aumentada de recuperação (RAG), onde dá prioridade a documentos que correspondem a termos de pesquisa específicos.</p>
<div class="alert note">
<p>Ao integrar a pesquisa de texto integral com a pesquisa de vectores densos baseada em semântica, pode melhorar a precisão e a relevância dos resultados de pesquisa. Para obter mais informações, consulte <a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida</a>.</p>
</div>
<h2 id="Overview​" class="common-anchor-header">Visão geral<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>A pesquisa de texto integral simplifica o processo de pesquisa baseado em texto, eliminando a necessidade de incorporação manual. Esta funcionalidade funciona através do seguinte fluxo de trabalho.</p>
<ol>
<li><p><strong>Entrada de texto</strong>: Insere documentos de texto em bruto ou fornece texto de consulta sem qualquer necessidade de incorporação manual.</p></li>
<li><p><strong>Análise de texto</strong>: O Milvus utiliza um analisador para transformar o texto de entrada em termos individuais e pesquisáveis.</p></li>
<li><p><strong>Processamento de funções</strong>: A função incorporada recebe os termos tokenizados e converte-os em representações vectoriais esparsas.</p></li>
<li><p><strong>Armazenamento de colecções</strong>: O Milvus armazena estas representações esparsas numa coleção para uma recuperação eficiente.</p></li>
<li><p><strong>Pontuação BM25</strong>: Durante uma pesquisa, o Milvus aplica o algoritmo BM25 para calcular as pontuações dos documentos armazenados e classifica os resultados correspondentes com base na relevância para o texto da consulta.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/full-text-search.png" alt="Full text search" class="doc-image" id="full-text-search" />
   </span> <span class="img-wrapper"> <span>Pesquisa de texto integral</span> </span></p>
<p>Para utilizar a pesquisa de texto integral, siga estes passos principais.</p>
<ol>
<li><p><a href="#Create-a-collection-for-full-text-search">Criar uma coleção</a>: Configure uma coleção com os campos necessários e defina uma função para converter o texto em bruto em embeddings esparsos.</p></li>
<li><p><a href="#Insert-text-data">Inserir dados</a>: Ingerir os seus documentos de texto em bruto na coleção.</p></li>
<li><p><a href="#Perform-full-text-search">Efetuar pesquisas</a>: Utilize textos de consulta para pesquisar na sua coleção e obter resultados relevantes.</p></li>
</ol>
<h2 id="Create-a-collection-for-full-text-search​" class="common-anchor-header">Criar uma coleção para pesquisa de texto integral<button data-href="#Create-a-collection-for-full-text-search​" class="anchor-icon" translate="no">
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
    </button></h2><p>Para ativar a pesquisa de texto integral, crie uma coleção com um esquema específico. Este esquema deve incluir três campos necessários.</p>
<ul>
<li><p>O campo primário que identifica de forma única cada entidade numa coleção.</p></li>
<li><p>Um campo <code translate="no">VARCHAR</code> que armazena documentos de texto em bruto, com o atributo <code translate="no">enable_analyzer</code> definido como <code translate="no">True</code>. Isto permite que o Milvus tokenize o texto em termos específicos para processamento de funções.</p></li>
<li><p>Um campo <code translate="no">SPARSE_FLOAT_VECTOR</code> reservado para armazenar embeddings esparsos que o Milvus irá gerar automaticamente para o campo <code translate="no">VARCHAR</code>.</p></li>
</ul>
<h3 id="Define-the-collection-schema" class="common-anchor-header">Definir o esquema da coleção</h3><p>Em primeiro lugar, crie o esquema e adicione os campos necessários.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType​
​
schema = MilvusClient.create_schema()​
​
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​

<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração.</p>
<ul>
<li><p><code translate="no">id</code>: serve de chave primária e é gerado automaticamente com <code translate="no">auto_id=True</code>.</p></li>
<li><p><code translate="no">text</code>: armazena os seus dados de texto em bruto para operações de pesquisa de texto completo. O tipo de dados deve ser <code translate="no">VARCHAR</code>, uma vez que <code translate="no">VARCHAR</code> é o tipo de dados de cadeia de caracteres do Milvus para armazenamento de texto. Defina <code translate="no">enable_analyzer=True</code> para permitir que o Milvus tokenize o texto. Por defeito, o Milvus utiliza o <a href="/docs/pt/standard-analyzer.md">analisador padrão</a> para a análise de texto. Para configurar um analisador diferente, consulte <a href="/docs/pt/analyzer-overview.md">Visão geral</a>.</p></li>
<li><p><code translate="no">sparse</code>Campo vetorial: um campo vetorial reservado para armazenar as incorporações esparsas geradas internamente para operações de pesquisa de texto completo. O tipo de dados deve ser <code translate="no">SPARSE_FLOAT_VECTOR</code>.</p></li>
</ul>
<p>Agora, defina uma função que converta o seu texto em representações vectoriais esparsas e, em seguida, adicione-a ao esquema.</p>
<pre><code translate="no" class="language-python">bm25_function = Function(​
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name​</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data​</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings​</span>
    function_type=FunctionType.BM25,​
)​
​
schema.add_function(bm25_function)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="EfAfdS3iXoAULPxQ3mwckzTrnUb"><thead><tr><th data-block-token="O3sLd5KNXou4Egxq6XVcoNiJnMW" colspan="1" rowspan="1"><p data-block-token="QRttdgJBpo2hEuxb438c7eOgn2f">Parâmetro</p>
</th><th data-block-token="SMGGduN8zo3cgXxVnwZcW0UAnbA" colspan="1" rowspan="1"><p data-block-token="LY39dA2eOoyVUUxvKwlcyyjdn3e">Descrição</p>
</th></tr></thead><tbody><tr><td data-block-token="Pbj3dPvuno3x6kxnCsWcTb3knag" colspan="1" rowspan="1"><p data-block-token="EeHOdxCjloFUAGxuY1CcScCTnDe"><code translate="no">name</code></p>
<p data-block-token="FzAJdVbrzozmTdxwy4fcJQkQnlh"></p>
</td><td data-block-token="VJWydnWHJoV66jx6oEPcH9lGnvh" colspan="1" rowspan="1"><p data-block-token="Clg3dWrJpo39lfxSWjVcbE7GnYm">O nome da função. Esta função converte o seu texto em bruto do campo <code translate="no">text</code> em vectores pesquisáveis que serão armazenados no campo <code translate="no">sparse</code>.</p>
</td></tr><tr><td data-block-token="ShPJdlvMQoXnSHxIQ1GcoyegnEb" colspan="1" rowspan="1"><p data-block-token="HFT1dYVCioUj4PxnNSVcYIBInNh"><code translate="no">input_field_names</code></p>
</td><td data-block-token="YiZCdrUaaovWnrxef29cmpQFn9c" colspan="1" rowspan="1"><p data-block-token="YFVOd29cUovDpXx7L2zcJK37n1g">O nome do campo <code translate="no">VARCHAR</code> que requer conversão de texto para vetor esparso. Para <code translate="no">FunctionType.BM25</code>, este parâmetro aceita apenas um nome de campo.</p>
</td></tr><tr><td data-block-token="QpcMdDoXfo62aNxQfoyc2E6lneg" colspan="1" rowspan="1"><p data-block-token="D1LkdH1KIojwKDx14HUcHdDJnPh"><code translate="no">output_field_names</code></p>
</td><td data-block-token="TrvodS2xDoF6UhxeFNScRg86nuf" colspan="1" rowspan="1"><p data-block-token="CO6bdbNhQo9ZprxlGdecjs9RnEf">O nome do campo onde os vectores esparsos gerados internamente serão armazenados. Para <code translate="no">FunctionType.BM25</code>, este parâmetro aceita apenas um nome de campo.</p>
</td></tr><tr><td data-block-token="UvgkdWp5RoXa0QxL3CKcoEZVnIf" colspan="1" rowspan="1"><p data-block-token="PWZSd2E48oWB2QxqVoVcMHGxn7c"><code translate="no">function_type</code></p>
</td><td data-block-token="VdcmdmiiWoy0nex8a29clnslnQg" colspan="1" rowspan="1"><p data-block-token="Q2eSdvOqeoNa6dxcGjcc2LKinDg">O tipo da função a utilizar. Defina o valor como <code translate="no">FunctionType.BM25</code>.</p>
</td></tr></tbody></table>
<div class="alert note">
<p>Para colecções com vários campos <code translate="no">VARCHAR</code> que requerem conversão de texto em vetor esparso, adicione funções separadas ao esquema de coleção, assegurando que cada função tem um nome único e um valor <code translate="no">output_field_names</code>.</p>
</div>
<h3 id="Configure-the-index" class="common-anchor-header">Configurar o índice</h3><p>Depois de definir o esquema com os campos necessários e a função incorporada, configure o índice para a sua coleção. Para simplificar este processo, utilize <code translate="no">AUTOINDEX</code> como <code translate="no">index_type</code>, uma opção que permite ao Milvus escolher e configurar o tipo de índice mais adequado com base na estrutura dos seus dados.</p>
<pre><code translate="no" class="language-python">index_params = <span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, ​
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="XEoodLxOFoukWJx9aLXcH46snXc"><thead><tr><th data-block-token="PfGNdbuq9o9PEWxzAWecWWoInUf" colspan="1" rowspan="1"><p data-block-token="KX1VdsOJCoO0Exxhg8acsduwncd">Parâmetro</p>
</th><th data-block-token="VNwBdAyWKoPktSxYaBtcn5rKnNb" colspan="1" rowspan="1"><p data-block-token="Oo1PduIsxo4HcMx2NRmcxvAMnld">Descrição</p>
</th></tr></thead><tbody><tr><td data-block-token="UxxWdkIBPoSbjOx7MO8csiFEn5d" colspan="1" rowspan="1"><p data-block-token="NYODddTbmoYoBrxPQ8ectvGxnPe"><code translate="no">field_name</code></p>
</td><td data-block-token="L2ZGdkB2voKhmsx8ezecoPxmnVf" colspan="1" rowspan="1"><p data-block-token="Y16fdZ6hPoXVlgxSTQjctsTonac">O nome do campo vetorial a indexar. Para a pesquisa de texto integral, este deve ser o campo que armazena os vectores esparsos gerados. Neste exemplo, defina o valor para <code translate="no">sparse</code>.</p>
</td></tr><tr><td data-block-token="Wn1rdzso5o8AmqxqxiqccBpCnD4" colspan="1" rowspan="1"><p data-block-token="WLDrdOzSXoiKEOxoDREctDounRf"><code translate="no">index_type</code></p>
</td><td data-block-token="I9TpdLWlXozM3Hx2Z9mcWvDHnNc" colspan="1" rowspan="1"><p data-block-token="Q3cgdK7OTo3kzXxQ1Y2cSarZned">O tipo de índice a criar. <code translate="no">AUTOINDEX</code> permite ao Milvus otimizar automaticamente as definições do índice. Se precisar de mais controlo sobre as definições do índice, pode escolher entre vários tipos de índices disponíveis para vectores esparsos no Milvus. Para mais informações, consulte <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Índices suportados no Milvus</a>.</p>
</td></tr><tr><td data-block-token="KJfgdQmD1odMgdxkG6uczBYknQh" colspan="1" rowspan="1"><p data-block-token="XVCsdz9Ulo93A2xavPtcF9Bvnec"><code translate="no">metric_type</code></p>
</td><td data-block-token="S3NHds6MTodtrsxRILIc8E1wngh" colspan="1" rowspan="1"><p data-block-token="G9i7dPczzoyJRHxyXbecrWBBn0d">O valor deste parâmetro deve ser definido como <code translate="no">BM25</code> especificamente para a funcionalidade de pesquisa de texto completo.</p>
</td></tr></tbody></table>
<h3 id="Create-the-collection​" class="common-anchor-header">Criar a coleção</h3><p>Crie agora a coleção utilizando o esquema e os parâmetros de índice definidos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    schema=schema, ​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-text-data" class="common-anchor-header">Inserir dados de texto<button data-href="#Insert-text-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de configurar a coleção e o índice, está pronto para inserir dados de texto. Neste processo, só precisa de fornecer o texto em bruto. A função incorporada que definimos anteriormente gera automaticamente o vetor esparso correspondente para cada entrada de texto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">insert</span>(<span class="hljs-string">&#x27;demo&#x27;</span>, [​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Artificial intelligence was founded as an academic discipline in 1956.&#x27;</span>},​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Alan Turing was the first person to conduct substantial research in AI.&#x27;</span>},​
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Born in Maida Vale, London, Turing was raised in southern England.&#x27;</span>},​
])​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-full-text-search" class="common-anchor-header">Efetuar uma pesquisa de texto completo<button data-href="#Perform-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma vez inseridos os dados na sua coleção, pode efetuar pesquisas de texto completo utilizando consultas de texto em bruto. Milvus converte automaticamente a sua consulta num vetor esparso e classifica os resultados de pesquisa correspondentes utilizando o algoritmo BM25, e depois devolve os resultados topK (<code translate="no">limit</code>).</p>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&#x27;params&#x27;</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: 0.6},​
}​
​
MilvusClient.search(​
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, ​
    data=[<span class="hljs-string">&#x27;Who started AI research?&#x27;</span>],​
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,​
    <span class="hljs-built_in">limit</span>=3,​
    search_params=search_params​
)​

<button class="copy-code-btn"></button></code></pre>
<table data-block-token="M37Zdx7XdoYN41xdKtfcHcJpnqh"><thead><tr><th data-block-token="UhTwdxk3Mo5eLjxff0PcL1CHn8b" colspan="1" rowspan="1"><p data-block-token="OwUXdMhOgoRxjzx5t9ecKR9Zn6J">Parâmetro</p>
</th><th data-block-token="GM88dTMzTof30QxS9O2cVyrnnJd" colspan="1" rowspan="1"><p data-block-token="Nlp5dAJY8or40nxV6auc20XHnjh">Descrição</p>
</th></tr></thead><tbody><tr><td data-block-token="QpGIdQ2m0oogCvxColKcNWnYnUc" colspan="1" rowspan="1"><p data-block-token="TkffdBxkKo2hVvx9gGucca46nic"><code translate="no">search_params</code></p>
</td><td data-block-token="HYemdqt6Dow9tvxOcYScmYdPn8e" colspan="1" rowspan="1"><p data-block-token="JiIOdJrBcoGIQ4xrqYycMdjnn7g">Um dicionário que contém parâmetros de pesquisa.</p>
</td></tr><tr><td data-block-token="DJDgdH5WUoZQxkxmLzQcXqcXnQh" colspan="1" rowspan="1"><p data-block-token="LKWbdw498o9mtRxm9gDcg28FnQd"><code translate="no">params.drop_ratio_search</code></p>
</td><td data-block-token="SEJ7d5y18otFTOxy7gLcvLYRnfb" colspan="1" rowspan="1"><p data-block-token="MnladDjOGoUphGxrZzXchD0anzf">Proporção de termos de baixa frequência a ignorar durante a pesquisa. Para mais informações, consulte <a href="/docs/pt/sparse_vector.md">Vetor esparso</a>.</p>
</td></tr><tr><td data-block-token="XPPYdAYUPoASg5xuIYmcyxqHnPe" colspan="1" rowspan="1"><p data-block-token="T90ndG7H0okLa4xa1wzcHQmEnEg"><code translate="no">data</code></p>
</td><td data-block-token="NMhsduxr1oUESPx2J8YcA8csnA1" colspan="1" rowspan="1"><p data-block-token="ZmEQdkdGtofQsAx9YXNcsnlHnYe">O texto bruto da consulta.</p>
</td></tr><tr><td data-block-token="O4OVdL9BIollH1xORz3czhInnSh" colspan="1" rowspan="1"><p data-block-token="CYdGd82dRopaWrxfJ9ycWQQnnPc"><code translate="no">anns_field</code></p>
</td><td data-block-token="MsKIdxGj6oWeBExoFurcxWCnnGh" colspan="1" rowspan="1"><p data-block-token="RsMDdgo0roTSBuxYwm6cGw3inZd">O nome do campo que contém os vectores esparsos gerados internamente.</p>
</td></tr><tr><td data-block-token="G0ewd9TQ1o1RQRxZA9ucMO9tnBK" colspan="1" rowspan="1"><p data-block-token="JOyTdUmLIo5aV0x4ChOcLiDQnLh"><code translate="no">limit</code></p>
</td><td data-block-token="H21hdYGZQoQe5FxYnwCch58qn0g" colspan="1" rowspan="1"><p data-block-token="ATKidHgXoo7c7dxM7cgcE46engb">Número máximo de correspondências de topo a devolver.</p>
</td></tr></tbody></table>
<p></p>
