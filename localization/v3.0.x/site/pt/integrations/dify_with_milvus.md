---
id: dify_with_milvus.md
summary: >-
  Neste tutorial, vamos mostrar-lhe como implementar o Dify com o Milvus, para
  permitir uma recuperação eficiente e o motor RAG.
title: Implantação do Dify com o Milvus
---
<h1 id="Deploying-Dify-with-Milvus" class="common-anchor-header">Implantação do Dify com o Milvus<button data-href="#Deploying-Dify-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://dify.ai/">O Dify</a> é uma plataforma de código aberto projetada para simplificar a criação de aplicativos de IA, combinando o Backend-as-a-Service com LLMOps. Ele oferece suporte aos LLMs principais, oferece uma interface de orquestração rápida e intuitiva, mecanismos RAG de alta qualidade e uma estrutura de agente de IA flexível. Com fluxos de trabalho de baixo código, interfaces fáceis de usar e APIs, o Dify permite que desenvolvedores e usuários não técnicos se concentrem na criação de soluções de IA inovadoras e reais sem lidar com a complexidade.</p>
<p>Neste tutorial, mostraremos como implantar o Dify com o Milvus, para permitir a recuperação eficiente e o mecanismo RAG.</p>
<div class="alert note">
<p>Esta documentação é baseada principalmente na <a href="https://docs.dify.ai/">documentação</a> oficial <a href="https://docs.dify.ai/">da Dify</a>. Se encontrar algum conteúdo desatualizado ou inconsistente, dê prioridade à documentação oficial e sinta-se à vontade para nos colocar uma questão.</p>
</div>
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
    </button></h2><h3 id="Clone-the-Repository" class="common-anchor-header">Clonar o repositório</h3><p>Clone o código-fonte do Dify para sua máquina local:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Environment-Configuration" class="common-anchor-header">Preparar a configuração do ambiente</h3><p>Navegue até o diretório Docker no código-fonte do Dify</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Copiar o arquivo de configuração do ambiente</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deployment-Options" class="common-anchor-header">Opções de implantação<button data-href="#Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h2><p>Você pode implantar o Dify com o Milvus usando duas abordagens diferentes. Escolha a que melhor se adapta às suas necessidades:</p>
<h2 id="Option-1-Using-Milvus-with-Docker" class="common-anchor-header">Opção 1: Usando o Milvus com o Docker<button data-href="#Option-1-Using-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta opção executa contentores Milvus juntamente com o Dify na sua máquina local utilizando o Docker Compose.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Configurar as variáveis de ambiente</h3><p>Edite o arquivo <code translate="no">.env</code> com a seguinte configuração do Milvus:</p>
<pre><code translate="no">VECTOR_STORE=milvus
MILVUS_URI=http://host.docker.internal:19530
MILVUS_TOKEN=
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>O <code translate="no">MILVUS_URI</code> utiliza <code translate="no">host.docker.internal:19530</code> que permite que os contentores Docker acedam ao Milvus em execução na máquina anfitriã através da rede interna do Docker.</li>
<li><code translate="no">MILVUS_TOKEN</code> pode ser deixado vazio para implantações locais do Milvus.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Iniciar os contentores Docker</h3><p>Inicie os contentores com o perfil <code translate="no">milvus</code> para incluir os serviços Milvus:</p>
<pre><code translate="no" class="language-shell">docker compose --profile milvus up -d
<button class="copy-code-btn"></button></code></pre>
<p>Este comando iniciará o serviço Dify juntamente com os contentores <code translate="no">milvus-standalone</code>, <code translate="no">etcd</code> e <code translate="no">minio</code>.</p>
<h2 id="Option-2-Using-Zilliz-Cloud" class="common-anchor-header">Opção 2: Utilizar a Nuvem Zilliz<button data-href="#Option-2-Using-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta opção liga a Dify a um serviço Milvus gerido na Nuvem Zilliz.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Configurar as variáveis de ambiente</h3><p>Edite o ficheiro <code translate="no">.env</code> com os seus detalhes de ligação ao Zilliz Cloud:</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<span class="hljs-attr">MILVUS_URI</span>=YOUR_ZILLIZ_CLOUD_ENDPOINT
<span class="hljs-attr">MILVUS_TOKEN</span>=YOUR_ZILLIZ_CLOUD_API_KEY
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Substitua <code translate="no">YOUR_ZILLIZ_CLOUD_ENDPOINT</code> pelo seu <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">ponto de extremidade público</a> da Zilliz Cloud.</li>
<li>Substitua <code translate="no">YOUR_ZILLIZ_CLOUD_API_KEY</code> pela sua <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">chave de API</a> do Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Iniciar os contêineres do Docker</h3><p>Inicie apenas os contentores Dify sem o perfil Milvus:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-Dify" class="common-anchor-header">Aceder à Dify<button data-href="#Accessing-Dify" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Log-in-to-Dify" class="common-anchor-header">Iniciar sessão na Dify</h3><p>Abra o seu browser e vá para a página de instalação da Dify, e pode definir a sua conta de administrador aqui:<code translate="no">http://localhost/install</code>, e depois inicie sessão na página principal da Dify para utilização posterior.</p>
<p>Para obter mais informações sobre a utilização e orientação, consulte a <a href="https://docs.dify.ai/">documentação da Dify</a>.</p>
