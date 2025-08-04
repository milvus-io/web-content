---
id: vertex-ai.md
title: IA do vérticeCompatible with Milvus 2.6.x
summary: >-
  O Google Cloud Vertex AI é um serviço de elevado desempenho concebido
  especificamente para modelos de incorporação de texto. Este guia explica como
  utilizar o Google Cloud Vertex AI com o Milvus para uma geração eficiente de
  incorporação de texto.
beta: Milvus 2.6.x
---
<h1 id="Vertex-AI" class="common-anchor-header">IA do vértice<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Vertex-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>O Google Cloud <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings">Vertex AI</a> é um serviço de elevado desempenho concebido especificamente para modelos de incorporação de texto. Este guia explica como utilizar o Google Cloud Vertex AI com o Milvus para uma geração eficiente de incorporação de texto.</p>
<p>O Vertex AI suporta vários modelos de incorporação para diferentes casos de utilização:</p>
<ul>
<li><p>gemini-embedding-001 (desempenho topo de gama em tarefas em inglês, multilingues e de código)</p></li>
<li><p>text-embedding-005 (Modelo de incorporação de texto mais recente)</p></li>
<li><p>text-multilingual-embedding-002 (Modelo de incorporação de texto multilingue mais recente)</p></li>
</ul>
<p>Para obter mais informações, consulte <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">Modelos de incorporação de texto do Vertex AI</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Certifique-se de que cumpre estes requisitos antes de configurar o Vertex AI:</p>
<ul>
<li><p><strong>Executar o Milvus versão 2.6 ou superior</strong> - Verifique se a implantação atende ao requisito de versão mínima.</p></li>
<li><p><strong>Criar uma conta de serviço do Google Cloud</strong> - No mínimo, provavelmente precisará de funções como "Usuário do Vertex AI" ou outras funções mais específicas. Para obter detalhes, consulte <a href="https://cloud.google.com/iam/docs/service-accounts-create?_gl=1*1jz33xw*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDIyOTEkajE0JGwwJGgw">Criar contas de serviço</a>.</p></li>
<li><p><strong>Baixe o arquivo de chave JSON da conta de serviço</strong> - armazene com segurança esse arquivo de credenciais no servidor ou no computador local. Para obter detalhes, consulte <a href="https://cloud.google.com/iam/docs/keys-create-delete?_gl=1*ittbs8*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDI0NjMkajYwJGwwJGgw#creating">Criar uma chave de conta de serviço</a>.</p></li>
</ul>
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
    </button></h2><p>Antes que o Milvus possa chamar a Vertex AI, ele precisa acessar a chave JSON da sua conta de serviço do GCP. Oferecemos suporte a dois métodos - escolha um com base nas suas necessidades operacionais e de implantação.</p>
<table>
   <tr>
     <th><p>Opção</p></th>
     <th><p>Prioridade</p></th>
     <th><p>Melhor para</p></th>
   </tr>
   <tr>
     <td><p>Ficheiro de configuração (<code translate="no">milvus.yaml</code>)</p></td>
     <td><p>Alta</p></td>
     <td><p>Definições persistentes em todo o cluster</p></td>
   </tr>
   <tr>
     <td><p>Variáveis de ambiente (<code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>)</p></td>
     <td><p>Baixa</p></td>
     <td><p>Fluxos de trabalho de contentores, testes rápidos</p></td>
   </tr>
</table>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Opção 1: Ficheiro de configuração (recomendado e de maior prioridade)</h3><p>Milvus sempre preferirá credenciais declaradas em <code translate="no">milvus.yaml</code> sobre quaisquer variáveis de ambiente para o mesmo provedor.</p>
<ol>
<li><p>Codificação base64 da sua chave JSON</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> credentials.json | jq . | <span class="hljs-built_in">base64</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Declare as credenciais em <code translate="no">milvus.yaml</code></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp_vertex:</span>                      <span class="hljs-comment"># arbitrary label</span>
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">|
      &lt;YOUR_BASE64_ENCODED_JSON&gt;
</span><button class="copy-code-btn"></button></code></pre></li>
<li><p>Vincular a credencial ao provedor Vertex AI</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp_vertex</span>      <span class="hljs-comment"># must match the label above</span>
        <span class="hljs-attr">url:</span> <span class="hljs-string">&lt;optional:</span> <span class="hljs-string">custom</span> <span class="hljs-string">Vertex</span> <span class="hljs-string">AI</span> <span class="hljs-string">endpoint&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Se mais tarde precisar de rodar as chaves, basta atualizar a cadeia Base64 em <code translate="no">credential_json</code> e reiniciar o Milvus - não são necessárias alterações ao seu ambiente ou contentores.</p>
<p></div></p></li>
</ol>
<h3 id="Option-2-Environment-variables" class="common-anchor-header">Opção 2: variáveis de ambiente</h3><p>Use este método quando preferir injetar segredos no momento da implantação. O Milvus recorre às env-vars apenas se não existir uma entrada correspondente em <code translate="no">milvus.yaml</code>.</p>
<div class="alert note">
<p>As etapas de configuração dependem do seu modo de implantação do Milvus (autônomo vs. cluster distribuído) e da plataforma de orquestração (Docker Compose vs. Kubernetes).</p>
</div>
<div class="filter">
 <a href="#docker">Docker Compose</a> <a href="#helm">Helm</a></div>
<div class="filter-docker">
<div class="alert note">
<p>Para obter o ficheiro de configuração do Milvus<strong>(docker-compose.yaml</strong>), consulte <a href="/docs/pt/configure-docker.md#Download-an-installation-file">Transferir um ficheiro de instalação</a>.</p>
</div>
<ol>
<li><p><strong>Monte a sua chave no contentor</strong></p>
<p>Edite o seu ficheiro <code translate="no">docker-compose.yaml</code> para incluir o mapeamento do volume de credenciais:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-comment"># Map host credential file to container path</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>
<button class="copy-code-btn"></button></code></pre>
<p>Na configuração anterior:</p>
<ul>
<li><p>Utilizar caminhos absolutos para um acesso fiável aos ficheiros (<code translate="no">/home/user/credentials.json</code> e não <code translate="no">~/credentials.json</code>)</p></li>
<li><p>O caminho do contentor tem de terminar com a extensão <code translate="no">.json</code> </p></li>
<li><p><code translate="no">:ro</code> O sinalizador garante acesso somente leitura para segurança</p></li>
</ul></li>
<li><p><strong>Definir variável de ambiente</strong></p>
<p>No mesmo ficheiro <code translate="no">docker-compose.yaml</code>, adicione a variável de ambiente que aponta para o caminho da credencial:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-comment"># Essential for Vertex AI authentication</span>
      <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Aplicar alterações</strong></p>
<p>Reinicie o contentor do Milvus para ativar a configuração:</p>
<pre><code translate="no" class="language-bash">docker-compose down &amp;&amp; docker-compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<div class="filter-helm">
<div class="alert note">
<p>Para obter seu arquivo de configuração do Milvus<strong>(values.yaml</strong>), consulte <a href="/docs/pt/configure-helm.md#Configure-Milvus-via-configuration-file">Configurar o Milvus via arquivo de configuração</a>.</p>
</div>
<ol>
<li><p><strong>Criar um segredo do Kubernetes</strong></p>
<p>Execute isto na sua máquina de controlo (onde <strong>o kubectl</strong> está configurado):</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic vertex-ai-secret \
  --from-file=credentials.json=/path/to/your/credentials.json \
  -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>No comando anterior:</p>
<ul>
<li><p><code translate="no">vertex-ai-secret</code>: Nome para o seu segredo (personalizável)</p></li>
<li><p><code translate="no">/path/to/your/credentials.json</code>: Nome de ficheiro local do seu ficheiro de credenciais GCP</p></li>
<li><p><code translate="no">&lt;your-milvus-namespace&gt;</code>: Espaço de nomes Kubernetes que aloja o Milvus</p></li>
</ul></li>
<li><p><strong>Configurar os valores do Helm</strong></p>
<p>Actualize o seu <code translate="no">values.yaml</code> com base no seu tipo de implementação:</p>
<ul>
<li><p><strong>Para implantação autónoma</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">extraEnv:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Container path</span>
  
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>  <span class="hljs-comment"># Must match Step 1</span>
  
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Must match extraEnv value</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>  <span class="hljs-comment"># Must match secret key name</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Para implantação distribuída (adicionar a cada componente)</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">extraEnv:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
  <span class="hljs-attr">volumes:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>

<span class="hljs-comment"># Repeat same configuration for dataNode, etc.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
<li><p><strong>Aplicar a configuração do Helm</strong></p>
<p>Implemente a configuração actualizada no seu cluster:</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
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
    </button></h2><p>Depois que o Vertex AI estiver configurado, siga estas etapas para definir e usar funções de incorporação.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Etapa 1: definir campos de esquema</h3><p>Para usar uma função de incorporação, crie uma coleção com um esquema específico. Esse esquema deve incluir pelo menos três campos necessários:</p>
<ul>
<li><p>O campo primário que identifica de forma exclusiva cada entidade numa coleção.</p></li>
<li><p>Um campo escalar que armazena os dados brutos a serem incorporados.</p></li>
<li><p>Um campo vetorial reservado para armazenar as incorporações vectoriais que a função irá gerar para o campo escalar.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the output dimension of the model and parameters</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Passo 2: Adicionar a função de incorporação ao esquema</h3><p>O módulo Function do Milvus converte automaticamente os dados brutos armazenados num campo escalar em embeddings e armazena-os no campo vetorial explicitamente definido.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define Vertex AI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;vert_func&quot;</span>,                           <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># Vertex AI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vertexai&quot;</span>,                 <span class="hljs-comment"># Must be set to &quot;vertexai&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-005&quot;</span>,     <span class="hljs-comment"># Required: Specifies the Vertex AI model to use</span>
        <span class="hljs-string">&quot;projectid&quot;</span>: <span class="hljs-string">&quot;your-gcp-project-id&quot;</span>,     <span class="hljs-comment"># Required: Your Google Cloud project ID</span>
        <span class="hljs-comment"># Optional parameters (include these only if necessary):</span>
        <span class="hljs-comment"># &quot;location&quot;: &quot;us-central1&quot;,            # Optional: Vertex AI service region (default us-central1)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;DOC_RETRIEVAL&quot;,              # Optional: Embedding task type (default DOC_RETRIEVAL)</span>
        <span class="hljs-comment"># &quot;dim&quot;: 768                            # Optional: Output vector dimension (1-768)</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>Parâmetro</strong></p></th>
     <th><p><strong>Descrição do parâmetro</strong></p></th>
     <th><p><strong>Necessário?</strong></p></th>
     <th><p><strong>Exemplo Valor</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>O fornecedor do modelo de incorporação. Definido como "vertexai".</p></td>
     <td><p>Sim</p></td>
     <td><p><code translate="no">"vertexai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Especifica qual o modelo de incorporação Vertex AI a utilizar.</p></td>
     <td><p>Sim</p></td>
     <td><p><code translate="no">"text-embedding-005"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">projectid</code></p></td>
     <td><p>O ID do seu projeto Google Cloud.</p></td>
     <td><p>Sim</p></td>
     <td><p><code translate="no">"your-gcp-project-id"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">location</code></p></td>
     <td><p>A região para o serviço Vertex AI. Atualmente, os embeddings do Vertex AI suportam principalmente us-central1. O padrão é us-central1.</p></td>
     <td><p>Não</p></td>
     <td><p><code translate="no">"us-central1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">task</code></p></td>
     <td><p>Especifica o tipo de tarefa de incorporação, afectando os resultados da incorporação. Valores aceites: DOC_RETRIEVAL (predefinição), CODE_RETRIEVAL (apenas 005 suportado), STS (Semantic Textual Similarity).</p></td>
     <td><p>Não</p></td>
     <td><p><code translate="no">"DOC_RETRIEVAL"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>A dimensão dos vectores de incorporação de saída. Aceita números inteiros entre 1 e 768. <strong>Nota:</strong> Se especificado, certifique-se de que a dimensão do campo de vetor no Schema corresponde a este valor.</p></td>
     <td><p>Não</p></td>
     <td><p><code translate="no">768</code></p></td>
   </tr>
</table>
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
    </button></h2><p>Depois de configurar a função de incorporação, consulte a <a href="/docs/pt/embeddings.md">Visão geral da função</a> para obter orientações adicionais sobre a configuração do índice, exemplos de inserção de dados e operações de pesquisa semântica.</p>
