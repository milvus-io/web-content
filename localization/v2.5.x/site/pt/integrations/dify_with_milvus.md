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
<h2 id="Clone-the-Repository" class="common-anchor-header">Clonar o repositório<button data-href="#Clone-the-Repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Clone o código-fonte do Dify para sua máquina local:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-the-Environment-Variables" class="common-anchor-header">Definir as variáveis de ambiente<button data-href="#Set-the-Environment-Variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Navegue até o diretório Docker no código-fonte do Dify</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Copie o ficheiro de configuração do ambiente</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cp</span> .env.example .<span class="hljs-built_in">env</span>
<button class="copy-code-btn"></button></code></pre>
<p>Alterar o valor <code translate="no">VECTOR_STORE</code> no ficheiro <code translate="no">.env</code> </p>
<pre><code translate="no">VECTOR_STORE=milvus
<button class="copy-code-btn"></button></code></pre>
<p>Alterar a configuração do Milvus no ficheiro <code translate="no">.env</code> </p>
<pre><code translate="no">MILVUS_URI=xxx
MILVUS_TOKEN=xxx
<button class="copy-code-btn"></button></code></pre>
<p>Nesta configuração, utilize o URI externo do servidor, por exemplo,<code translate="no">http://172.16.16.16:19530</code>, como o seu <code translate="no">MILVUS_URI</code>.</p>
<p>Para o <code translate="no">MILVUS_TOKEN</code>, se não tiver definido um token para o seu servidor Milvus, pode defini-lo como uma cadeia vazia como <code translate="no">MILVUS_TOKEN=</code>, caso contrário, tem de o definir como o seu token Milvus. Para mais informações sobre como definir o token no Milvus, pode consultar a <a href="https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password">página de autenticação</a>.</p>
<h2 id="Start-the-Docker-Containers" class="common-anchor-header">Iniciar os contêineres do Docker<button data-href="#Start-the-Docker-Containers" class="anchor-icon" translate="no">
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
    </button></h2><p>Escolha o comando apropriado para iniciar os contentores com base na versão do Docker Compose no seu sistema. Você pode usar o comando <code translate="no">$ docker compose version</code> para verificar a versão e consultar a documentação do Docker para obter mais informações:</p>
<p>Se você tiver o Docker Compose V2, use o seguinte comando:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<p>Se tiver o Docker Compose V1, utilize o seguinte comando:</p>
<pre><code translate="no" class="language-shell">docker-compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Log-in-to-Dify" class="common-anchor-header">Iniciar sessão no Dify<button data-href="#Log-in-to-Dify" class="anchor-icon" translate="no">
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
    </button></h2><p>Abra o seu browser e aceda à página de instalação da Dify e pode definir a sua conta de administrador aqui:<code translate="no">http://localhost/install</code>, e, em seguida, inicie sessão na página principal da Dify para utilização posterior.</p>
<p>Para mais utilização e orientação, consulte a <a href="https://docs.dify.ai/">documentação da Dify</a>.</p>
