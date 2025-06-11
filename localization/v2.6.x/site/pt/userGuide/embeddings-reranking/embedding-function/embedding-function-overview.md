---
id: embedding-function-overview.md
title: Descrição geral da função de incorporaçãoCompatible with Milvus 2.6.x
summary: >-
  O módulo Function no Milvus permite-lhe transformar dados de texto em bruto em
  embeddings vectoriais, chamando automaticamente fornecedores de modelos
  externos (como OpenAI, AWS Bedrock, Google Vertex AI, etc.). Com o módulo
  Function, já não precisa de interagir manualmente com as APIs de incorporação
  - o Milvus trata de todo o processo de envio de pedidos aos fornecedores,
  receção de incorporação e armazenamento nas suas colecções. Para a pesquisa
  semântica, é necessário fornecer apenas dados de consulta em bruto, não um
  vetor de consulta. O Milvus gera o vetor de consulta com o mesmo modelo que
  utilizou para a ingestão, compara-o com os vectores armazenados e devolve os
  resultados mais relevantes.
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">Descrição geral da função de incorporação<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>O módulo Function em Milvus permite transformar dados de texto bruto em embeddings vetoriais chamando automaticamente provedores de modelos externos (como OpenAI, AWS Bedrock, Google Vertex AI, etc.). Com o módulo Function, já não é necessário estabelecer uma interface manual com as APIs de incorporação - o Milvus trata de todo o processo de envio de pedidos aos fornecedores, receção de incorporação e armazenamento nas suas colecções. Para a pesquisa semântica, é necessário fornecer apenas dados de consulta em bruto, não um vetor de consulta. O Milvus gera o vetor de consulta com o mesmo modelo que utilizou para a ingestão, compara-o com os vectores armazenados e devolve os resultados mais relevantes.</p>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Qualquer campo de entrada que o módulo Function incorpore deve sempre conter um valor; se for fornecido um valor nulo, o módulo lançará um erro.</p></li>
<li><p>O módulo Function processa apenas os campos explicitamente definidos no esquema da coleção; não gera incorporações para campos dinâmicos.</p></li>
<li><p>Os campos de entrada a serem incorporados devem ser do tipo <code translate="no">VARCHAR</code>.</p></li>
<li><p>O módulo Function pode incorporar um campo de entrada para:</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>As conversões para <code translate="no">BINARY_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, ou <code translate="no">BFLOAT16_VECTOR</code> não são suportadas.</p></li>
</ul>
<h2 id="Overview" class="common-anchor-header">Descrição geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>O módulo Function transforma o texto em bruto em incorporações vectoriais, chamando um fornecedor de modelos externo à sua escolha. Diferentes provedores suportam diferentes modelos, formatos de incorporação e métodos de autenticação, todos resumidos abaixo.</p>
<h3 id="Supported-model-providers" class="common-anchor-header">Provedores de modelos suportados</h3><table>
   <tr>
     <th><p>Provedor</p></th>
     <th><p>Modelos típicos</p></th>
     <th><p>Tipo de incorporação</p></th>
     <th><p>Método de autenticação</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/openai.md">OpenAI</a></p></td>
     <td><p>incorporação de texto-3-*</p></td>
     <td><p>Densa (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Chave da API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>Baseado na implementação</p></td>
     <td><p>Densa (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Chave de API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/dashscope.md">DashScope</a></p></td>
     <td><p>incorporação de texto-v3</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Chave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/bedrock.md">Pedra angular</a></p></td>
     <td><p>amazon.titan-embeded-text-v2</p></td>
     <td><p>Densa (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Par AK/SK</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/vertex-ai.md">Vértice IA</a></p></td>
     <td><p>texto-embedding-005</p></td>
     <td><p>Densa (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>JSON da conta de serviço GCP</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/voyage-ai.md">IA de viagem</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p>Dense (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>Chave da API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/cohere.md">Coesão</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p>Densa (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>Chave da API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>Densa (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Chave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/hugging-face-tei.md">Cara de abraço</a></p></td>
     <td><p>Qualquer modelo servido por TEI</p></td>
     <td><p>Densa (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Chave API opcional</p></td>
   </tr>
</table>
<h3 id="Workflow" class="common-anchor-header">Fluxo de trabalho</h3><p>O diagrama seguinte mostra como a função funciona em Milvus.</p>
<ol>
<li><p><strong>Texto de entrada</strong>: Os utilizadores inserem dados em bruto (por exemplo, documentos) no Milvus.</p></li>
<li><p><strong>Gerar embeddings</strong>: O módulo Function do Milvus chama automaticamente o fornecedor do modelo configurado para converter os dados em bruto em embeddings vectoriais.</p></li>
<li><p><strong>Armazenar embeddings</strong>: Os embeddings resultantes são armazenados em campos vectoriais explicitamente definidos nas colecções do Milvus.</p></li>
<li><p><strong>Consultar texto</strong>: Os utilizadores submetem consultas de texto ao Milvus.</p></li>
<li><p><strong>Pesquisa semântica</strong>: O Milvus converte internamente as consultas em embeddings vectoriais, efectua pesquisas de semelhança com os embeddings armazenados e obtém os resultados relevantes.</p></li>
<li><p><strong>Devolver resultados</strong>: O Milvus devolve à aplicação os resultados com maior correspondência.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
   </span> <span class="img-wrapper"> <span>Visão geral da função de incorporação</span> </span></p>
<h3 id="Credential-management" class="common-anchor-header">Gestão de credenciais</h3><p>A ligação a APIs de incorporação externas requer credenciais de autenticação (chaves API ou pares de chaves de acesso/secretas). A exposição destas credenciais no código da sua aplicação cria riscos de segurança. O Milvus resolve este problema armazenando as credenciais de forma segura no ficheiro de configuração do Milvus (<code translate="no">milvus.yaml</code>).</p>
<ol>
<li><p><strong>Adicionar credenciais</strong>: No bloco de nível superior <code translate="no">credential:</code>, atribua a cada credencial uma etiqueta única; em seguida, aponte para essa etiqueta no bloco <code translate="no">function:</code>.</p></li>
<li><p><strong>O servidor carrega a configuração</strong>: O Milvus lê o ficheiro YAML, guarda as chaves em bruto na memória e lembra-se apenas das suas etiquetas (por exemplo, <code translate="no">apikey1</code>).</p></li>
<li><p><strong>Chamar a função</strong>: Especificar opcionalmente o argumento <code translate="no">credential</code>.</p>
<ul>
<li><p>Se fornecer um nome de credencial com a definição da função, o Milvus utiliza a credencial especificada.</p></li>
<li><p>Se omitir o argumento, o Milvus recorre automaticamente à credencial configurada para esse fornecedor de modelos em <code translate="no">milvus.yaml</code>.</p>
<p>De qualquer forma, a chave secreta nunca deixa o servidor.</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>Estouro de configuração de credencial</span> </span></p>
<div class="alert note">
<p>Se você implantar o Milvus com o Docker Compose, também poderá injetar os mesmos campos por meio de variáveis de ambiente. Consulte os guias específicos do provedor para obter os nomes exatos das variáveis.</p>
</div>
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
    </button></h2><p>Antes de usar uma função de incorporação com o Milvus, configure as credenciais de acesso.</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration" class="common-anchor-header">Passo 1: Adicionar credenciais à configuração do Milvus</h3><p>No seu ficheiro <code translate="no">milvus.yaml</code>, edite o bloco <code translate="no">credential</code> com entradas para cada fornecedor a que precisa de aceder:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml credential store section</span>
<span class="hljs-comment"># This section defines all your authentication credentials for external embedding providers</span>
<span class="hljs-comment"># Each credential gets a unique name (e.g., aksk1, apikey1) that you&#x27;ll reference elsewhere</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-comment"># For AWS Bedrock or services using access/secret key pairs</span>
  <span class="hljs-comment"># &#x27;aksk1&#x27; is just an example name - you can choose any meaningful identifier</span>
  <span class="hljs-attr">aksk1:</span>                       
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_AK&gt;</span>      
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_SK&gt;</span>  
  
  <span class="hljs-comment"># For OpenAI, Voyage AI, or other API key-based services</span>
  <span class="hljs-comment"># &#x27;apikey1&#x27; is a custom name you choose to identify this credential  </span>
  <span class="hljs-attr">apikey1:</span>                     
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_API_KEY&gt;</span>        
  
  <span class="hljs-comment"># For Google Vertex AI using service account credentials</span>
  <span class="hljs-comment"># &#x27;gcp1&#x27; is an example name for your Google Cloud credentials</span>
  <span class="hljs-attr">gcp1:</span>                        
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">&lt;BASE64_OF_JSON&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Tipo de fornecedor</p></th>
     <th><p>Campos obrigatórios</p></th>
     <th><p>Exemplo de configuração</p></th>
   </tr>
   <tr>
     <td><p>Par AK/SK (AWS Bedrock)</p></td>
     <td><p><code translate="no">access_key_id</code>, <code translate="no">secret_access_key</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     aksk1:    # custom label
         access_key_id: &lt;YOUR_AK&gt;
         secret_access_key: &lt;YOUR_SK&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>Chave de API baseada (OpenAI, Voyage AI, etc.)</p></td>
     <td><p><code translate="no">apikey</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     apikey1:    # custom label
         apikey: &lt;YOUR_API_KEY&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>JSON da conta de serviço GCP (Vertex AI)</p></td>
     <td><p><code translate="no">credential_json</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     gcp1:    # custom label
         credential_json: &lt;BASE64_OF_JSON&gt;
     ...
</code></pre></td>
   </tr>
</table>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">Passo 2: Configurar as definições do fornecedor</h3><p>No mesmo arquivo de configuração, edite o bloco <code translate="no">function</code> para informar ao Milvus qual chave usar para incorporar chamadas de serviço:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para obter mais informações sobre como aplicar a configuração do Milvus, consulte <a href="/docs/pt/dynamic_config.md">Configurar o Milvus on the Fly</a>.</p>
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
    </button></h2><p>Assim que as credenciais estiverem configuradas, siga estes passos para definir e utilizar as funções de incorporação.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Etapa 1: definir campos de esquema</h3><p>Para utilizar uma função de incorporação, crie uma coleção com um esquema específico. Este esquema deve incluir pelo menos três campos necessários:</p>
<ul>
<li><p>O campo primário que identifica de forma exclusiva cada entidade numa coleção.</p></li>
<li><p>Um campo escalar que armazena os dados brutos a serem incorporados.</p></li>
<li><p>Um campo vetorial reservado para armazenar as incorporações vectoriais que a função irá gerar para o campo escalar.</p></li>
</ul>
<p>O exemplo seguinte define um esquema com um campo escalar <code translate="no">&quot;document&quot;</code> para armazenar dados textuais e um campo vetorial <code translate="no">&quot;dense&quot;</code> para armazenar incrustações a serem geradas pelo módulo Function. Não se esqueça de definir a dimensão do vetor (<code translate="no">dim</code>) para corresponder ao resultado do modelo de incorporação escolhido.</p>
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
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
<span class="hljs-comment"># For sparse vector, data type must be SPARSE_FLOAT_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Passo 2: Adicionar a função de incorporação ao esquema</h3><p>O módulo Function em Milvus converte automaticamente os dados brutos armazenados num campo escalar em embeddings e armazena-os no campo vetorial explicitamente definido.</p>
<p>O exemplo abaixo adiciona um módulo Function (<code translate="no">openai_embedding</code>) que converte o campo escalar <code translate="no">&quot;document&quot;</code> em embeddings, armazenando os vectores resultantes no campo vetorial <code translate="no">&quot;dense&quot;</code> definido anteriormente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,                    # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optionally shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;                         # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Exemplo Valor</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Identificador único para a função de incorporação no Milvus.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Tipo de função de incorporação utilizada. Valores possíveis:</p>
<ul>
<li><p><code translate="no">FunctionType.TEXTEMBEDDING</code>: Gera vectores densos que captam o significado semântico do texto.</p></li>
<li><p><code translate="no">FunctionType.BM25</code>: Gera vectores esparsos com base no algoritmo de classificação BM25, que calcula pontuações de relevância utilizando a frequência de termos e a frequência inversa de documentos. Para obter mais informações, consulte <a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a>.</p></li>
</ul></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Campo escalar contendo dados brutos a serem incorporados. Atualmente, este parâmetro aceita apenas um nome de campo.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>Campo vetorial para armazenar as incorporações geradas. Atualmente, este parâmetro aceita apenas um nome de campo.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Dicionário que contém configurações de incorporação. Nota: Os parâmetros em <code translate="no">params</code> variam consoante os fornecedores de modelos de incorporação.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>O fornecedor do modelo de incorporação.</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Especifica qual o modelo de incorporação a utilizar.</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>A etiqueta de uma credencial definida na secção de nível superior <code translate="no">credential:</code> de <code translate="no">milvus.yaml</code>. </p>
<ul>
<li><p>Quando fornecido, o Milvus recupera o par de chaves correspondente ou o token da API e assina o pedido no lado do servidor.</p></li>
<li><p>Quando omitido (<code translate="no">None</code>), o Milvus recorre à credencial explicitamente configurada para o fornecedor do modelo de destino em <code translate="no">milvus.yaml</code>.</p></li>
<li><p>Se a etiqueta for desconhecida ou a chave referenciada estiver em falta, a chamada falha.</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>O número de dimensões para os embeddings de saída. Para os modelos de terceira geração do OpenAI, é possível encurtar o vetor completo para reduzir o custo e a latência sem uma perda significativa de informações semânticas. <strong>Nota:</strong> Se encurtar a dimensão <a href="https://openai.com/blog/new-embedding-models-and-api-updates">do</a> vetor, certifique-se de que o valor <code translate="no">dim</code> especificado no método <code translate="no">add_field</code> do esquema para o campo do vetor corresponde à dimensão de saída final da sua função de incorporação.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>Um identificador de nível de utilizador para acompanhar a utilização da API.</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Para colecções com vários campos escalares que requerem conversão de texto para vetor, adicione funções separadas ao esquema de coleção, assegurando que cada função tem um nome único e um valor <code translate="no">output_field_names</code>.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">Passo 3: Configurar o índice</h3><p>Depois de definir o esquema com os campos necessários e a função incorporada, configure o índice para a sua coleção. Para simplificar este processo, utilize <code translate="no">AUTOINDEX</code> como <code translate="no">index_type</code>, uma opção que permite ao Milvus escolher e configurar o tipo de índice mais adequado com base na estrutura dos seus dados.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">Passo 4: Criar a coleção</h3><p>Crie agora a coleção utilizando o esquema e os parâmetros de índice definidos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">Passo 5: Inserir dados</h3><p>Depois de configurar a coleção e o índice, está pronto para inserir os seus dados brutos. Neste processo, só precisa de fornecer o texto em bruto. O módulo Function que definimos anteriormente gera automaticamente o vetor esparso correspondente para cada entrada de texto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">Etapa 6: Executar pesquisa de vetor</h3><p>Após a inserção dos dados, efectue uma pesquisa semântica utilizando o texto de consulta em bruto. Milvus converte automaticamente a sua consulta num vetor de incorporação, recupera documentos relevantes com base na semelhança e devolve os melhores resultados correspondentes.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.8821347951889038, &#x27;entity&#x27;: {&#x27;document&#x27;: &#x27;Milvus simplifies semantic search through embeddings.&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para obter mais informações sobre operações de pesquisa e consulta, consulte <a href="/docs/pt/single-vector-search.md">Pesquisa</a> e <a href="/docs/pt/get-and-scalar-query.md">consulta</a> <a href="/docs/pt/single-vector-search.md">vetorial básica</a>.</p>
