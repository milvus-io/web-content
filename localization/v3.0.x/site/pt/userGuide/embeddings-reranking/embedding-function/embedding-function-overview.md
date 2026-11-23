---
id: embedding-function-overview.md
title: Visão geral da função de incorporaçãoCompatible with Milvus 2.6.x
summary: >-
  O módulo «Function» do Milvus permite-lhe transformar dados de texto brutos em
  representações vetoriais, recorrendo automaticamente a prestadores de serviços
  de representação externos (como a OpenAI, o AWS Bedrock, o Google Vertex AI,
  etc.). Com o módulo «Function», já não é necessário interagir manualmente com
  as APIs de incorporação — o Milvus trata de todo o processo de envio de
  pedidos aos fornecedores, receção das incorporações e armazenamento das mesmas
  nas suas coleções. Para a pesquisa semântica, basta fornecer apenas os dados
  brutos da consulta, e não um vetor de consulta. O Milvus gera o vetor de
  consulta com o mesmo modelo que utilizou para a ingestão, compara-o com os
  vetores armazenados e devolve os resultados mais relevantes.
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">Visão geral da função de incorporação<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>O módulo «Função» do Milvus permite-lhe transformar dados de texto brutos em representações vetoriais, recorrendo automaticamente a prestadores de serviços de incorporação externos (como a OpenAI, a AWS Bedrock, o Google Vertex AI, etc.). Com o módulo «Função», já não é necessário interagir manualmente com as APIs de incorporação — o Milvus trata de todo o processo de envio de pedidos aos fornecedores, receção das incorporações e armazenamento das mesmas nas suas coleções. Para a pesquisa semântica, basta fornecer apenas os dados brutos da consulta, e não um vetor de consulta. O Milvus gera o vetor de consulta com o mesmo modelo que utilizou para a ingestão, compara-o com os vetores armazenados e devolve os resultados mais relevantes.</p>
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
<li><p>Qualquer campo de entrada que o módulo «Function» incorpore deve conter sempre um valor; se for fornecido um valor nulo, o módulo irá gerar um erro.</p></li>
<li><p>O módulo «Function» processa apenas os campos explicitamente definidos no esquema da coleção; não gera representações para campos dinâmicos.</p></li>
<li><p>Os campos de entrada a incorporar devem ser do tipo « <code translate="no">VARCHAR</code> ».</p></li>
<li><p>O módulo «Function» pode incorporar um campo de entrada para:</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>Não são suportadas conversões para « <code translate="no">BINARY_VECTOR</code> », « <code translate="no">FLOAT16_VECTOR</code> » ou « <code translate="no">BFLOAT16_VECTOR</code> ».</p></li>
</ul>
<h2 id="Supported-embedding-service-providers" class="common-anchor-header">Provedores de serviços de incorporação suportados<button data-href="#Supported-embedding-service-providers" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p>Provedor</p></th>
     <th><p>Modelos típicos</p></th>
     <th><p>Tipo de incorporação</p></th>
     <th><p>Método de autenticação</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/openai.md">OpenAI</a></p></td>
     <td><p>text-embedding-3-*</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>Baseada na implementação</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chave da API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/dashscope.md">DashScope</a></p></td>
     <td><p>text-embedding-v3</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/yandex-cloud.md">Yandex Cloud</a></p></td>
     <td><p>Modelos de vetorização de texto do Yandex Cloud AI Studio</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/bedrock.md">Bedrock</a></p></td>
     <td><p>amazon.titan-embed-text-v2</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Par AK/SK</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/vertex-ai.md">Vertex AI</a></p></td>
     <td><p>text-embedding-005</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Conta de serviço do GCP Credencial JSON</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/voyage-ai.md">Voyage AI</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code></p></td>
     <td><p>Chave de API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/cohere.md">Cohere</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code></p></td>
     <td><p>Chave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/hugging-face-tei.md">Hugging Face TEI</a></p></td>
     <td><p>Qualquer modelo servido pelo TEI</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chave API opcional</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/pt/hugging-face.md">Hugging Face</a></p></td>
     <td><p>Modelos disponibilizados através de <code translate="no">hf-inference</code> para extração de características</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chave de API</p></td>
   </tr>
</table>
<h2 id="How-it-works" class="common-anchor-header">Como funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>O diagrama seguinte mostra como a Função funciona no Milvus.</p>
<ol>
<li><p><strong>Texto de entrada</strong>: os utilizadores inserem dados brutos (por exemplo, documentos) no Milvus.</p></li>
<li><p><strong>Gerar embeddings</strong>: O módulo «Função» no Milvus chama automaticamente o fornecedor de modelos configurado para converter os dados brutos em embeddings vetoriais.</p></li>
<li><p><strong>Armazenamento de embeddings</strong>: As embeddings resultantes são armazenadas em campos vetoriais explicitamente definidos nas coleções do Milvus.</p></li>
<li><p><strong>Texto da consulta</strong>: Os utilizadores enviam consultas de texto ao Milvus.</p></li>
<li><p><strong>Pesquisa semântica</strong>: O Milvus converte internamente as consultas em representações vetoriais, realiza pesquisas de similaridade em relação às representações armazenadas e recupera resultados relevantes.</p></li>
<li><p><strong>Devolução de resultados</strong>: O Milvus devolve os resultados mais relevantes à aplicação.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" /> 
   <span>Visão geral da função de incorporação</span>
  
 </span></p>
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
    </button></h2><p>Antes de utilizar uma função de incorporação com o Milvus, configure as credenciais do serviço de incorporação para o acesso ao Milvus.</p>
<p>O Milvus permite-lhe fornecer as credenciais do serviço de representação de duas formas:</p>
<ul>
<li><p><strong>Ficheiro de configuração</strong> (<code translate="no">milvus.yaml</code>):</p>
<p>O exemplo neste tópico demonstra a <strong>configuração recomendada</strong> utilizando <code translate="no">milvus.yaml</code>.</p></li>
<li><p><strong>Variáveis de ambiente</strong>:</p>
<p>Para obter detalhes sobre a configuração de credenciais através de variáveis de ambiente, consulte a documentação do fornecedor do serviço de incorporação (por exemplo, <a href="/docs/pt/openai.md">OpenAI</a> ou <a href="/docs/pt/azure-openai.md">Azure OpenAI</a>).</p></li>
</ul>
<p>O diagrama seguinte ilustra o processo de configuração de credenciais através do ficheiro de configuração do Milvus (<code translate="no">milvus.yaml</code>) e, em seguida, a chamada da Função no Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" /> 
   <span>Configuração de credenciais no Overflow</span>
  
 </span></p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration-file" class="common-anchor-header">Passo 1: Adicionar credenciais ao ficheiro de configuração do Milvus<button data-href="#Step-1-Add-credentials-to-Milvus-configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>No seu ficheiro <code translate="no">milvus.yaml</code>, edite o bloco <code translate="no">credential</code> com entradas para cada fornecedor ao qual precisa de aceder:</p>
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
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">Passo 2: Configurar as definições do fornecedor<button data-href="#Step-2-Configure-provider-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>No mesmo ficheiro de configuração (<code translate="no">milvus.yaml</code>), edite o bloco <code translate="no">function</code> para indicar ao Milvus qual a chave a utilizar para incorporar chamadas de serviço:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom url</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom url</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para mais informações sobre como aplicar a configuração do Milvus, consulte <a href="/docs/pt/dynamic_config.md">«Configurar o Milvus em tempo real</a>».</p>
<h2 id="Use-embedding-function" class="common-anchor-header">Utilizar a função de incorporação<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de configurar as credenciais no seu ficheiro de configuração do Milvus, siga estes passos para definir e utilizar funções de incorporação.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Passo 1: Definir campos do esquema<button data-href="#Step-1-Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Para utilizar uma função de incorporação, crie uma coleção com um esquema específico. Este esquema deve incluir, pelo menos, três campos obrigatórios:</p>
<ul>
<li><p>O <strong>campo primário</strong> que identifica de forma única cada entidade numa coleção.</p></li>
<li><p>Um <strong>campo escalar</strong> que armazena os dados brutos a serem incorporados.</p></li>
<li><p>Um <strong>campo vetorial</strong> reservado para armazenar as representações vetoriais que a função irá gerar para o campo escalar.</p></li>
</ul>
<p>O exemplo seguinte define um esquema com um campo escalar <code translate="no">&quot;document&quot;</code> para armazenar dados textuais e um campo vetorial <code translate="no">&quot;dense&quot;</code> para armazenar as incorporações a serem geradas pelo módulo «Function». Lembre-se de definir a dimensão do vetor (<code translate="no">dim</code>) de forma a corresponder à saída do modelo de incorporação escolhido.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// Initialize Milvus client</span>
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Create a new schema for the collection</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// Add primary field &quot;id&quot;</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

<span class="hljs-comment">// Add scalar field &quot;document&quot; for storing textual data</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;document&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">9000</span>)
        .build());

<span class="hljs-comment">// Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment">// IMPORTANT: Set dimension to match the exact output dimension of the embedding model.</span>
<span class="hljs-comment">// For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment">// For dense vector, data type can be FloatVector or Int8Vector</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">1536</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Initialize Milvus client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
});

<span class="hljs-comment">// Define the fields of the collection schema</span>
<span class="hljs-keyword">const</span> schema = [
    <span class="hljs-comment">// Primary field &quot;id&quot;</span>
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    <span class="hljs-comment">// Scalar field &quot;document&quot; for storing textual data</span>
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;document&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">9000</span>,
    },
    <span class="hljs-comment">// Vector field &quot;dense&quot; for storing embeddings.</span>
    <span class="hljs-comment">// IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
    <span class="hljs-comment">// For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
    <span class="hljs-comment">// For dense vector, data type can be FloatVector or Int8Vector</span>
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">1536</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

schema := entity.NewSchema().
    WithName(<span class="hljs-string">&quot;demo&quot;</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">9000</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;dense&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">1536</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: false,
    &quot;enableDynamicField&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;document&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 9000
            }
        },
        {
            &quot;fieldName&quot;: &quot;dense&quot;,
            &quot;dataType&quot;: &quot;FloatVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: 1536
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Passo 2: Adicionar a função de embedding ao esquema<button data-href="#Step-2-Add-embedding-function-to-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>O módulo «Function» no Milvus converte automaticamente os dados brutos armazenados num campo escalar em embeddings e armazena-os no campo vetorial explicitamente definido.</p>
<p>O exemplo abaixo adiciona um módulo «Function» (<code translate="no">openai_embedding</code>) que converte o campo escalar « <code translate="no">&quot;document&quot;</code> » em embeddings, armazenando os vetores resultantes no campo vetorial « <code translate="no">&quot;dense&quot;</code> » definido anteriormente.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                  <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING, <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],           <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],             <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                  <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                 <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,            # Optional: Credential label</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,       # Optionally shorten the vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;    # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-comment">// Define embedding function (example: OpenAI provider)</span>
<span class="hljs-type">Function</span> <span class="hljs-variable">textEmbeddingFunction</span> <span class="hljs-operator">=</span> Function.builder()
        .name(<span class="hljs-string">&quot;openai_embedding&quot;</span>)                                <span class="hljs-comment">// Unique identifier for this embedding function</span>
        .functionType(FunctionType.TEXTEMBEDDING)                <span class="hljs-comment">// Type of embedding function</span>
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))  <span class="hljs-comment">// Scalar field to embed</span>
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;dense&quot;</span>))    <span class="hljs-comment">// Vector field to store embeddings</span>
        <span class="hljs-comment">// Provider-specific configuration (highest priority)</span>
        .param(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;openai&quot;</span>)                             <span class="hljs-comment">// Embedding model provider</span>
        .param(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)           <span class="hljs-comment">// Embedding model</span>
        <span class="hljs-comment">// .param(&quot;credential&quot;, &quot;apikey1&quot;)                       // Optional: Credential label</span>
        <span class="hljs-comment">// Optional parameters:</span>
        <span class="hljs-comment">// .param(&quot;dim&quot;, &quot;1536&quot;)                                 // Optionally shorten the vector dimension</span>
        <span class="hljs-comment">// .param(&quot;user&quot;, &quot;user123&quot;)                             // Optional: identifier for API tracking</span>
        .build();

<span class="hljs-comment">// Add the embedding function to your schema</span>
schema.addFunction(textEmbeddingFunction);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Define embedding function (example: OpenAI provider)</span>
<span class="hljs-comment">// Pass these functions to createCollection() together with the schema fields</span>
<span class="hljs-keyword">const</span> functions = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;openai_embedding&quot;</span>,                 <span class="hljs-comment">// Unique identifier for this embedding function</span>
        <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">TEXTEMBEDDING</span>,         <span class="hljs-comment">// Type of embedding function</span>
        <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;document&quot;</span>],          <span class="hljs-comment">// Scalar field to embed</span>
        <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;dense&quot;</span>],            <span class="hljs-comment">// Vector field to store embeddings</span>
        <span class="hljs-attr">params</span>: {                                 <span class="hljs-comment">// Provider-specific configuration (highest priority)</span>
            <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;openai&quot;</span>,                   <span class="hljs-comment">// Embedding model provider</span>
            <span class="hljs-attr">model_name</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>, <span class="hljs-comment">// Embedding model</span>
            <span class="hljs-comment">// credential: &quot;apikey1&quot;,             // Optional: Credential label</span>
            <span class="hljs-comment">// Optional parameters:</span>
            <span class="hljs-comment">// dim: &quot;1536&quot;,                       // Optionally shorten the vector dimension</span>
            <span class="hljs-comment">// user: &quot;user123&quot;,                   // Optional: identifier for API tracking</span>
        },
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

embeddingFunction := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;openai_embedding&quot;</span>).
    WithType(entity.FunctionTypeTextEmbedding).
    WithInputFields(<span class="hljs-string">&quot;document&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;dense&quot;</span>).
    WithParam(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;openai&quot;</span>).
    WithParam(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)

schema.WithFunction(embeddingFunction)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> embeddingFunction=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;openai_embedding&quot;,
    &quot;type&quot;: &quot;TextEmbedding&quot;,
    &quot;inputFieldNames&quot;: [
        &quot;document&quot;
    ],
    &quot;outputFieldNames&quot;: [
        &quot;dense&quot;
    ],
    &quot;params&quot;: {
        &quot;provider&quot;: &quot;openai&quot;,
        &quot;model_name&quot;: &quot;text-embedding-3-small&quot;
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Valor de exemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Identificador único da função de embedding no Milvus.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Tipo de função utilizada. Para a incorporação de texto, defina o valor como <code translate="no">FunctionType.TEXTEMBEDDING</code>.</p><p><strong>Nota</strong>: O Milvus aceita <code translate="no">FunctionType.BM25</code> (para transformação de incorporação esparsa) e <code translate="no">FunctionType.RERANK</code> (para reclassificação) para este parâmetro. Consulte <a href="/docs/pt/decay-ranker-overview.md">a Visão Geral</a> <a href="/docs/pt/full-text-search.md">da Pesquisa de Texto Completo</a> e <a href="/docs/pt/decay-ranker-overview.md">do Decay Ranker</a> para obter mais detalhes.</p></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Campo escalar que contém os dados brutos a serem incorporados. Atualmente, este parâmetro aceita apenas um nome de campo.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>Campo vetorial para armazenar as incorporações geradas. Atualmente, este parâmetro aceita apenas um nome de campo.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Dicionário que contém as configurações de incorporação. Nota: Os parâmetros dentro de « <code translate="no">params</code> » variam consoante os fornecedores de modelos de incorporação.</p></td>
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
     <td><p>A etiqueta de uma credencial definida na secção de nível superior « <code translate="no">credential:</code> » de <code translate="no">milvus.yaml</code>. </p><ul><li><p>Quando fornecida, o Milvus recupera o par de chaves ou o token de API correspondente e assina o pedido no lado do servidor.</p></li><li><p>Quando omitido (<code translate="no">None</code>), o Milvus recorre à credencial explicitamente configurada para o fornecedor do modelo de destino em <code translate="no">milvus.yaml</code>.</p></li><li><p>Se o rótulo for desconhecido ou se a chave referenciada estiver em falta, a chamada falha.</p></li></ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>O número de dimensões para as incorporações de saída. Para os modelos de terceira geração da OpenAI, pode encurtar o vetor completo para reduzir o custo e a latência sem uma perda significativa de informação semântica. Para mais informações, consulte <a href="https://openai.com/blog/new-embedding-models-and-api-updates">a publicação no blogue de anúncios da OpenAI</a>.</p><p><strong>Nota:</strong> Se encurtar a dimensão do vetor, certifique-se de que o valor « <code translate="no">dim</code> » especificado no método « <code translate="no">add_field</code> » do esquema para o campo vetorial corresponde à dimensão final de saída da sua função de incorporação.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>Um identificador ao nível do utilizador para monitorizar a utilização da API.</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Para coleções com vários campos escalares que requerem conversão de texto para vetor, adicione funções separadas ao esquema da coleção, garantindo que cada função tenha um nome e um valor de ` <code translate="no">output_field_names</code> ` únicos.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">Passo 3: Configurar o índice<button data-href="#Step-3-Configure-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Após definir o esquema com os campos necessários e a função incorporada, configure o índice para a sua coleção. Para simplificar este processo, utilize « <code translate="no">AUTOINDEX</code> » como « <code translate="no">index_type</code> », uma opção que permite ao Milvus escolher e configurar o tipo de índice mais adequado com base na estrutura dos seus dados.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-comment">// Prepare index parameters</span>
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-comment">// Add AUTOINDEX to automatically select optimal indexing method</span>
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Prepare index parameters</span>
<span class="hljs-comment">// Add AUTOINDEX to automatically select optimal indexing method</span>
<span class="hljs-keyword">const</span> index_params = [
    {
        <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;dense&quot;</span>,
        <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">COSINE</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;demo&quot;</span>, <span class="hljs-string">&quot;dense&quot;</span>, index.NewAutoIndex(entity.COSINE))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;dense&quot;,
        &quot;indexName&quot;: &quot;dense&quot;,
        &quot;metricType&quot;: &quot;COSINE&quot;,
        &quot;indexType&quot;: &quot;AUTOINDEX&quot;
    }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">Passo 4: Criar a coleção<button data-href="#Step-4-Create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Crie agora a coleção utilizando os parâmetros de esquema e de índice definidos.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Create collection named &quot;demo&quot;</span>
client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create collection named &quot;demo&quot;</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">functions</span>: functions,
    <span class="hljs-attr">index_params</span>: index_params,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;demo&quot;</span>, schema).
    WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;demo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err = loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

request=$(jq -n --argjson schema <span class="hljs-string">&quot;<span class="hljs-variable">$schema</span>&quot;</span> --argjson fn <span class="hljs-string">&quot;<span class="hljs-variable">$embeddingFunction</span>&quot;</span> --argjson indexParams <span class="hljs-string">&quot;<span class="hljs-variable">$indexParams</span>&quot;</span> <span class="hljs-string">&#x27;{
    collectionName: &quot;demo&quot;,
    schema: ($schema + {functions: [$fn]}),
    indexParams: $indexParams
}&#x27;</span>)

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;<span class="hljs-variable">$request</span>&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">Passo 5: Inserir dados<button data-href="#Step-5-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Depois de configurar a sua coleção e o seu índice, está pronto para inserir os seus dados brutos. Neste processo, basta fornecer o texto bruto. O módulo Function que definimos anteriormente gera automaticamente o vetor esparso correspondente para cada entrada de texto.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-comment">// Insert sample documents</span>
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; rows = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;document\&quot;: \&quot;Milvus simplifies semantic search through embeddings.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;document\&quot;: \&quot;Vector embeddings convert text into searchable numeric data.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 3, \&quot;document\&quot;: \&quot;Semantic search helps users find relevant information quickly.\&quot;}&quot;</span>, JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Insert sample documents</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">data</span>: [
        { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">document</span>: <span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">document</span>: <span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">document</span>: <span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span> },
    ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>

_, err = cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;demo&quot;</span>).
    WithColumns(
        column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>}),
        column.NewColumnVarChar(<span class="hljs-string">&quot;document&quot;</span>, []<span class="hljs-type">string</span>{
            <span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>,
            <span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>,
            <span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>,
        }),
    ))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;,
    &quot;data&quot;: [
        {&quot;id&quot;: 1, &quot;document&quot;: &quot;Milvus simplifies semantic search through embeddings.&quot;},
        {&quot;id&quot;: 2, &quot;document&quot;: &quot;Vector embeddings convert text into searchable numeric data.&quot;},
        {&quot;id&quot;: 3, &quot;document&quot;: &quot;Semantic search helps users find relevant information quickly.&quot;}
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">Passo 6: Efetuar pesquisa vetorial<button data-href="#Step-6-Perform-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Após a inserção dos dados, efetue uma pesquisa semântica utilizando o texto bruto da consulta. O Milvus converte automaticamente a sua consulta num vetor de incorporação, recupera documentos relevantes com base na semelhança e devolve os resultados mais pertinentes.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-comment">// Perform semantic search</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>))) <span class="hljs-comment">// Use text query rather than query vector</span>
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)   <span class="hljs-comment">// Use the vector field that stores embeddings</span>
        .limit(<span class="hljs-number">1</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .build());

System.out.println(results.getSearchResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Perform semantic search</span>
<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>], <span class="hljs-comment">// Use text query rather than query vector</span>
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,   <span class="hljs-comment">// Use the vector field that stores embeddings</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>],
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-number">1</span>,
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> _, rs := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, rs.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, rs.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;,
    &quot;data&quot;: [&quot;How does Milvus handle semantic search?&quot;],
    &quot;annsField&quot;: &quot;dense&quot;,
    &quot;limit&quot;: 1,
    &quot;outputFields&quot;: [&quot;document&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para mais informações sobre operações de pesquisa e consulta, consulte <a href="/docs/pt/single-vector-search.md">«Pesquisa</a> e <a href="/docs/pt/get-and-scalar-query.md">consulta</a> <a href="/docs/pt/single-vector-search.md">vetoriais básicas</a> ».</p>
<h2 id="FAQ" class="common-anchor-header">Perguntas frequentes<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-the-difference-between-configuring-credentials-in-milvusyaml-vs-environment-variables" class="common-anchor-header">Qual é a diferença entre configurar credenciais no ficheiro `milvus.yaml` e através de variáveis de ambiente?<button data-href="#Whats-the-difference-between-configuring-credentials-in-milvusyaml-vs-environment-variables" class="anchor-icon" translate="no">
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
    </button></h3><p>Ambos os métodos funcionam, mas a utilização de « <code translate="no">milvus.yaml</code> » é a abordagem recomendada, uma vez que proporciona uma gestão centralizada das credenciais e uma nomenclatura consistente das credenciais em todos os fornecedores. Ao utilizar variáveis de ambiente, os nomes das variáveis variam consoante o fornecedor do serviço de incorporação; por isso, consulte a página dedicada de cada fornecedor para compreender os nomes específicos das variáveis de ambiente necessárias (por exemplo, <a href="/docs/pt/openai.md">OpenAI</a> ou <a href="/docs/pt/azure-openai.md">Azure OpenAI</a>).</p>
<h3 id="What-happens-if-I-dont-specify-a-credential-parameter-in-the-function-definition" class="common-anchor-header">O que acontece se eu não especificar um parâmetro de credencial na definição da função?<button data-href="#What-happens-if-I-dont-specify-a-credential-parameter-in-the-function-definition" class="anchor-icon" translate="no">
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
    </button></h3><p>O Milvus segue esta ordem de resolução de credenciais:</p>
<ol>
<li>Primeiro, procura a credencial predefinida configurada para esse fornecedor no ficheiro « <code translate="no">milvus.yaml</code> »</li>
<li>Se não existir nenhuma credencial predefinida no ficheiro milvus.yaml, recorre às variáveis de ambiente (se estiverem configuradas)</li>
<li>Se nem as credenciais do ficheiro « <code translate="no">milvus.yaml</code> » nem as variáveis de ambiente estiverem configuradas, o Milvus irá gerar um erro</li>
</ol>
<h3 id="How-can-I-verify-that-embeddings-are-being-generated-correctly" class="common-anchor-header">Como posso verificar se as representações estão a ser geradas corretamente?<button data-href="#How-can-I-verify-that-embeddings-are-being-generated-correctly" class="anchor-icon" translate="no">
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
    </button></h3><p>Pode verificar da seguinte forma:</p>
<ol>
<li>Consultar a sua coleção após a inserção para verificar se o campo vetorial contém dados</li>
<li>Verificar se o comprimento do campo vetorial corresponde às dimensões esperadas</li>
<li>Realizar uma pesquisa simples de similaridade para verificar se as representações produzem resultados significativos</li>
</ol>
<h3 id="When-I-perform-a-similarity-search-can-I-use-a-query-vector-rather-than-raw-text" class="common-anchor-header">Quando realizo uma pesquisa de similaridade, posso utilizar um vetor de consulta em vez de texto bruto?<button data-href="#When-I-perform-a-similarity-search-can-I-use-a-query-vector-rather-than-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>Sim, pode utilizar vetores de consulta pré-calculados em vez de texto bruto para a pesquisa de similaridade. Embora o módulo de função converta automaticamente as consultas de texto bruto em representações vetoriais, também pode fornecer diretamente dados vetoriais ao parâmetro « <code translate="no">data</code> » na sua operação de pesquisa. <strong>Nota</strong>: O tamanho da dimensão do vetor de consulta fornecido deve ser consistente com o tamanho da dimensão das representações vetoriais geradas pelo seu módulo de função.</p>
<p><strong>Exemplo</strong>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using raw text (Function module converts automatically)</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>],
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,
    limit=<span class="hljs-number">1</span>
)

<span class="hljs-comment"># Using pre-computed query vector (must match stored vector dimensions)</span>
query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, ...]  <span class="hljs-comment"># Must be same dimension as stored embeddings</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[query_vector],
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,
    limit=<span class="hljs-number">1</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-comment">// Using raw text (Function module converts automatically)</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">textResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)
        .limit(<span class="hljs-number">1</span>)
        .build());

<span class="hljs-comment">// Using pre-computed query vector (must match stored vector dimensions)</span>
<span class="hljs-type">float</span>[] queryVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span> <span class="hljs-comment">/* ... */</span>};  <span class="hljs-comment">// Must be same dimension as stored embeddings</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">vectorResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(queryVector)))
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)
        .limit(<span class="hljs-number">1</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Using raw text (Function module converts automatically)</span>
<span class="hljs-keyword">const</span> textResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">1</span>,
});

<span class="hljs-comment">// Using pre-computed query vector (must match stored vector dimensions)</span>
<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span> <span class="hljs-comment">/* ... */</span>];  <span class="hljs-comment">// Must be same dimension as stored embeddings</span>
<span class="hljs-keyword">const</span> vectorResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">1</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Raw text: the embedding function converts the query automatically</span>
textResults, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-number">1</span>,
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-comment">// Pre-computed vector: yourQueryVector must have the same dimension as the stored embeddings</span>
vectorResults, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-number">1</span>,
    []entity.Vector{entity.FloatVector(yourQueryVector)},
).WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

fmt.Println(textResults, vectorResults)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># Raw text: the embedding function converts the query automatically</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;,
    &quot;data&quot;: [&quot;How does Milvus handle semantic search?&quot;],
    &quot;annsField&quot;: &quot;dense&quot;,
    &quot;limit&quot;: 1
}&#x27;</span>

<span class="hljs-comment"># Pre-computed vector: QUERY_VECTOR is a JSON array with the same dimension as the stored embeddings</span>
request=$(jq -n --argjson vec <span class="hljs-string">&quot;<span class="hljs-variable">$QUERY_VECTOR</span>&quot;</span> <span class="hljs-string">&#x27;{
    collectionName: &quot;demo&quot;,
    data: [$vec],
    annsField: &quot;dense&quot;,
    limit: 1
}&#x27;</span>)

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;<span class="hljs-variable">$request</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
