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
<li><p>text-embedding-005 (modelo de incorporação de texto mais recente)</p></li>
<li><p>text-multilingual-embedding-002 (modelo de incorporação de texto multilingue mais recente)</p></li>
</ul>
<p>Para mais pormenores, consulte a <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">referência dos modelos de incorporação de texto do Vertex AI</a>.</p>
<h2 id="Vertex-AI-deployment" class="common-anchor-header">Implantação do Vertex AI<button data-href="#Vertex-AI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de configurar o Milvus com a função Vertex AI, tem de configurar a sua instância do Milvus para utilizar as credenciais da sua conta de serviço Google Cloud. O Milvus suporta duas abordagens de implantação principais:</p>
<h3 id="Standard-deployment-Docker-Compose" class="common-anchor-header">Implementação padrão (Docker Compose)</h3><p>No seu ficheiro docker-compose.yaml, tem de montar o ficheiro de credenciais e definir a variável de ambiente <code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the credential file path inside the container</span>
    <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-comment"># ... other mounts ...</span>
    <span class="hljs-comment"># Mount the credential file from the host to the specified path inside the container</span>
    <span class="hljs-comment"># Replace /path/to/your/credentials.json with the actual path</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Milvus-Helm-Chart-deployment-Kubernetes" class="common-anchor-header">Implantação do Milvus Helm Chart (Kubernetes)</h3><p>Para ambientes Kubernetes, recomenda-se a utilização de um Kubernetes Secret para armazenar o ficheiro de credenciais:</p>
<ol>
<li><p><strong>Criar segredo</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">create</span> <span class="hljs-string">secret</span> <span class="hljs-string">generic</span> <span class="hljs-string">vertex-ai-secret</span> <span class="hljs-string">\</span>
  <span class="hljs-string">--from-file=credentials.json=/path/to/your/credentials.json</span> <span class="hljs-string">\</span>
  <span class="hljs-string">-n</span> <span class="hljs-string">&lt;your-milvus-namespace&gt;</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Configurar values.yaml</strong></p>
<p>Adicione o seguinte nas secções standalone ou proxy/dataNode:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraEnv:</span>
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

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Configuration-in-Milvus" class="common-anchor-header">Configuração em Milvus<button data-href="#Configuration-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de implantar suas credenciais do Vertex AI, você precisará configurar a função de incorporação. O Milvus oferece suporte a vários métodos para configurar credenciais de autenticação para o Vertex AI, aplicados na seguinte ordem de precedência:</p>
<ul>
<li><p><strong>Ficheiro de configuração do Milvus (milvus.yaml)</strong> - Prioridade mais elevada</p></li>
<li><p><strong>Variáveis de ambiente</strong> - prioridade mais baixa</p></li>
</ul>
<p><strong>Arquivo de configuração do Milvus (milvus.yaml)</strong></p>
<p>Para configurações persistentes em todo o cluster, os dados json da credencial podem ser codificados no formato base64 e, em seguida, definidos no arquivo milvus.yaml.<code translate="no">cat credentials.json|jq .|base64</code>substitua <code translate="no">credentials.json</code> pelo caminho do arquivo de credencial</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp1:</span>
    <span class="hljs-attr">credential_json:</span>  <span class="hljs-comment"># base64 based gcp credential data</span>

<span class="hljs-comment"># Any configuration related to functions</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span>  <span class="hljs-string">gcp1</span> <span class="hljs-comment"># The name in the crendential configuration item</span>
        <span class="hljs-attr">url:</span>  <span class="hljs-comment"># Your VertexAI embedding url</span>

<button class="copy-code-btn"></button></code></pre>
<p><strong>Variáveis de ambiente</strong></p>
<p>As variáveis de ambiente oferecem um método de configuração alternativo, geralmente usado ao configurar ambientes de contêiner em implantações do Docker Compose ou do Kubernetes.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Example (typically set in docker-compose.yaml or Kubernetes manifest)</span>
<span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the credential file path inside the container</span>
    <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
    
<span class="hljs-comment">#Add the following under the standalone or proxy/dataNode sections in values.yaml:    </span>
<span class="hljs-attr">extraEnv:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
    <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>    
    
<button class="copy-code-btn"></button></code></pre>
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
     <td><p>A região para o serviço do Vertex AI. Atualmente, os embeddings do Vertex AI suportam principalmente us-central1. O padrão é us-central1.</p></td>
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
