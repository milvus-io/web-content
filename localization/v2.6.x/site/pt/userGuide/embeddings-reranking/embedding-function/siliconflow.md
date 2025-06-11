---
id: siliconflow.md
title: SiliconFLowCompatible with Milvus 2.6.x
summary: >-
  Este tópico descreve como configurar e usar as funções de incorporação do
  SiliconFLow no Milvus.
beta: Milvus 2.6.x
---
<h1 id="SiliconFLow" class="common-anchor-header">SiliconFLow<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#SiliconFLow" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico descreve como configurar e usar as funções de incorporação do SiliconFLow no Milvus.</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">Escolher um modelo de incorporação<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus suporta modelos de incorporação fornecidos pelo SiliconFLow. Abaixo estão os modelos de incorporação SiliconFLow atualmente disponíveis para referência rápida:</p>
<table>
   <tr>
     <th><p>Nome do modelo</p></th>
     <th><p>Dimensões</p></th>
     <th><p>Tokens máximos</p></th>
     <th><p>Descrição</p></th>
   </tr>
   <tr>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>Um modelo de incorporação de texto chinês de grandes dimensões, que faz parte da série BGE (BAAI General Embedding).</p></td>
   </tr>
   <tr>
     <td><p>BAAI/bge-large-en-v1.5</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>Um modelo grande de incorporação de texto em inglês, que faz parte da série BGE (BAAI General Embedding).</p></td>
   </tr>
   <tr>
     <td><p>netease-youdao/bce-embedding-base_v1</p></td>
     <td><p>768</p></td>
     <td><p>512</p></td>
     <td><p>Um modelo de incorporação bilingue e multilingue desenvolvido pela NetEase Youdao. O modelo apresenta um excelente desempenho em tarefas de representação e recuperação semântica em chinês e inglês, destacando-se especialmente em cenários multilingues.</p></td>
   </tr>
   <tr>
     <td><p>BAAI/bge-m3</p></td>
     <td><p>1,024</p></td>
     <td><p>8,192</p></td>
     <td><p>Um modelo de incorporação de texto multifuncional, multilingue e multi-granular. Suporta três funções de recuperação comuns: recuperação densa, recuperação multi-vetorial e recuperação esparsa.</p></td>
   </tr>
   <tr>
     <td><p>Pro/BAAI/bge-m3</p></td>
     <td><p>1,024</p></td>
     <td><p>8,192</p></td>
     <td><p>Um modelo de incorporação de texto multifuncional, multilingue e multi-granular. Suporta três funções de recuperação comuns: recuperação densa, recuperação multi-vetorial e recuperação esparsa. O modelo pode processar entradas em mais de 100 idiomas e é capaz de lidar com diferentes granularidades.</p></td>
   </tr>
</table>
<h2 id="Configure-credentials" class="common-anchor-header">Configurar credenciais<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus tem de saber a sua chave da API do SiliconFlow antes de poder pedir incorporações. O Milvus fornece dois métodos para configurar as credenciais:</p>
<ul>
<li><p><strong>Ficheiro de configuração (recomendado):</strong> Armazene a chave da API em <code translate="no">milvus.yaml</code> para que cada reinicialização e nó a pegue automaticamente.</p></li>
<li><p><strong>Variáveis de ambiente:</strong> Injetar a chave no momento da implantação - ideal para o Docker Compose.</p></li>
</ul>
<p>Escolha um dos dois métodos abaixo - o arquivo de configuração é mais fácil de manter em bare-metal e VMs, enquanto a rota env-var se encaixa nos fluxos de trabalho do contêiner.</p>
<div class="alert note">
<p>Se uma chave de API para o mesmo provedor estiver presente no arquivo de configuração e em uma variável de ambiente, o Milvus sempre usa o valor em <code translate="no">milvus.yaml</code> e ignora a variável de ambiente.</p>
</div>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">Opção 1: Ficheiro de configuração</h3><p>Manter as suas chaves API em <code translate="no">milvus.yaml</code>; o Milvus lê-as no arranque e substitui qualquer variável de ambiente para o mesmo fornecedor.</p>
<ol>
<li><p>**Declare as suas chaves em <code translate="no">credential:</code></p>
<p>Pode listar uma ou várias chaves API - dê a cada uma delas uma etiqueta que invente e que referenciará mais tarde.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>Colocar as chaves da API aqui torna-as persistentes através de reinicializações e permite-lhe mudar de chave apenas mudando uma etiqueta.</p></li>
<li><p><strong>Diga ao Milvus qual chave usar para chamadas de serviço</strong></p>
<p>No mesmo ficheiro, aponte o fornecedor SiliconFlow para a etiqueta que pretende utilizar.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">siliconflow:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-comment"># url: https://api.siliconflow.cn/v1/embeddings   # (optional) custom endpoint</span>
<button class="copy-code-btn"></button></code></pre>
<p>Isto associa uma chave específica a cada pedido que o Milvus envia para o ponto final de incorporação do OpenAI.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Opção 2: Variável de ambiente</h3><p>Utilize este método quando executar o Milvus com o Docker Compose e preferir manter os segredos fora dos ficheiros e imagens.</p>
<p>O Milvus recorre à variável de ambiente apenas se não for encontrada nenhuma chave para o fornecedor em <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Variável</p></th>
     <th><p>Necessária</p></th>
     <th><p>Descrição</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_SILICONFLOW_API_KEY</code></p></td>
     <td><p>Sim</p></td>
     <td><p>A sua chave de API SiliconFlow válida.</p></td>
   </tr>
</table>
<p>No seu ficheiro <strong>docker-compose.yaml</strong>, defina a variável de ambiente <code translate="no">MILVUSAI_SILICONFLOW_API_KEY</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the SiliconFlow API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_SILICONFLOW_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_SILICONFLOW_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>O bloco <code translate="no">environment:</code> injecta a chave apenas no contentor do Milvus, deixando o seu SO anfitrião intacto. Para obter detalhes, consulte <a href="/docs/pt/configure-docker.md#Configure-Milvus-with-Docker-Compose">Configurar o Milvus com o Docker Compose</a>.</p>
<h2 id="Use-embedding-function" class="common-anchor-header">Usar a função de incorporação<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois que as credenciais forem configuradas, siga estas etapas para definir e usar funções de incorporação.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Etapa 1: definir campos de esquema</h3><p>Para usar uma função de incorporação, crie uma coleção com um esquema específico. Este esquema deve incluir pelo menos três campos necessários:</p>
<ul>
<li><p>O campo primário que identifica de forma exclusiva cada entidade numa coleção.</p></li>
<li><p>Um campo escalar que armazena os dados brutos a serem incorporados.</p></li>
<li><p>Um campo vetorial reservado para armazenar as incorporações vectoriais que a função irá gerar para o campo escalar.</p></li>
</ul>
<p>O exemplo seguinte define um esquema com um campo escalar <code translate="no">&quot;document&quot;</code> para armazenar dados textuais e um campo vetorial <code translate="no">&quot;dense&quot;</code> para armazenar as incorporações a serem geradas pelo módulo Function. Não se esqueça de definir a dimensão do vetor (<code translate="no">dim</code>) para corresponder ao resultado do modelo de incorporação escolhido.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Create a new schema for the collection</span>
schema = client.create_schema()

<span class="hljs-comment"># Add primary field &quot;id&quot;</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add scalar field &quot;document&quot; for storing textual data</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)

<span class="hljs-comment"># Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Passo 2: Adicionar a função de incorporação ao esquema</h3><p>O módulo Function em Milvus converte automaticamente os dados brutos armazenados num campo escalar em embeddings e armazena-os no campo vetorial explicitamente definido.</p>
<p>O exemplo abaixo adiciona um módulo Function (<code translate="no">siliconflow_embedding</code>) que converte o campo escalar <code translate="no">&quot;document&quot;</code> em embeddings, armazenando os vectores resultantes no campo vetorial <code translate="no">&quot;dense&quot;</code> definido anteriormente.</p>
<p>Depois de ter definido a sua função de incorporação, adicione-a ao seu esquema de coleção. Isto instrui o Milvus a utilizar a função de incorporação especificada para processar e armazenar os embeddings dos seus dados de texto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function specifically for embedding model provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;siliconflow_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                      <span class="hljs-comment"># Provider-specific embedding parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;siliconflow&quot;</span>,                <span class="hljs-comment"># Must be set to &quot;siliconflow&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span>,    <span class="hljs-comment"># Specifies the SiliconFlow embedding model to use</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,          # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;url&quot;: &quot;https://api.siliconflow.cn/v1/embeddings&quot;,  # Defaults to the official endpoint if omitted</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-steps" class="common-anchor-header">Próximos passos<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de configurar a função de incorporação, consulte a <a href="/docs/pt/embedding-function-overview.md">Visão geral da função</a> para obter orientações adicionais sobre a configuração do índice, exemplos de inserção de dados e operações de pesquisa semântica.</p>
