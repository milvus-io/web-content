---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  Saiba como instalar o Milvus em modo autónomo com o Docker Desktop para
  Windows.
title: Executar o Milvus no Docker (Windows)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">Executar o Milvus no Docker (Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><blockquote>
<p>Por predefinição, esta implementação executa <strong>o Woodpecker</strong> (sistema de ficheiros local) como fila de mensagens, pelo que não é necessário qualquer serviço externo de fila de mensagens. Consulte <a href="/docs/pt/woodpecker.md">Woodpecker</a>.</p>
</blockquote>
<p>Esta página demonstra como executar o Milvus no Windows utilizando o Docker Desktop com o backend WSL 2 e contentores Linux.</p>
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
    </button></h2><ul>
<li><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Instale o Docker Desktop</a> e cumpra os requisitos do Windows e de hardware.</li>
<li><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Instale o Subsistema do Windows para Linux 2 (WSL 2)</a>.</li>
<li>Inicie o Docker Desktop, ative a opção <strong>«Utilizar o motor baseado no WSL 2</strong>» e selecione «contentores Linux». Para comandos executados dentro de uma distribuição WSL, ative também essa distribuição em <strong>«Definições»</strong> &gt; <strong>«Recursos»</strong> &gt; <strong>«Integração WSL</strong>». Consulte <a href="https://docs.docker.com/desktop/features/wsl/">Backend WSL 2 do Docker Desktop</a>.</li>
</ul>
<p>Execute as seguintes verificações no PowerShell ou no Prompt de Comando do Windows antes de descarregar os ficheiros do Milvus:</p>
<pre><code translate="no" class="language-powershell">wsl --version
docker info --format &quot;{{.OSType}}&quot;
docker compose version
</code></pre>
<p>O tipo de SO do Docker deve ser « <code translate="no">linux</code> ». Os exemplos do Compose utilizam o plugin « <code translate="no">docker compose</code> » (V2 ou posterior), e não o comando antigo « <code translate="no">docker-compose</code> » V1.</p>
<h2 id="Run-Milvus-in-Docker" class="common-anchor-header">Executar o Milvus no Docker<button data-href="#Run-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Escolha um dos seguintes terminais. Execute os comandos num diretório de trabalho gravável; o script armazena os ficheiros de configuração e o diretório <code translate="no">volumes</code> nesse local.</p>
<p>O script é descarregado a partir do ramo « <code translate="no">master</code> » do Milvus. A etiqueta da imagem do Docker está definida no script e pode diferir da v3.0.3. Para implementar essa versão exata, utilize a configuração do Docker Compose com versão especificada abaixo.</p>
<h3 id="From-PowerShell" class="common-anchor-header">A partir do PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>Descarregue o script e, em seguida, inicie o Milvus:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -OutFile standalone.bat
.\standalone.bat start
</code></pre>
<p>O PowerShell requer o prefixo « <code translate="no">.\</code> » para executar um script a partir do diretório de trabalho.</p>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">A partir do Prompt de Comando do Windows<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize <code translate="no">curl.exe</code> para descarregar o script; <code translate="no">Invoke-WebRequest</code> é um comando do PowerShell e não funciona no Prompt de Comandos:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -o standalone.bat
standalone.bat start
</code></pre>
<p>Após executar qualquer uma das sequências de comandos do Windows:</p>
<ul>
<li>Um contentor Docker denominado <strong>milvus-standalone</strong> fica disponível na porta <strong>19530</strong>.</li>
<li>O etcd incorporado é executado no mesmo contentor na porta <strong>2379</strong>. O seu ficheiro de configuração corresponde ao <strong>«embedEtcd.yaml»</strong> no diretório de trabalho.</li>
<li>O Milvus armazena dados em <strong>volumes/milvus</strong> no diretório de trabalho.</li>
<li>As alterações de configuração devem ser feitas no ficheiro <strong>user.yaml</strong>, no diretório de trabalho. Reinicie o contentor após alterá-las.</li>
</ul>
<p>Verifique o estado da imagem e do contentor em qualquer um dos terminais:</p>
<pre><code translate="no" class="language-powershell">docker inspect --format &quot;{{.Config.Image}}&quot; milvus-standalone
docker ps --filter name=milvus-standalone
</code></pre>
<p>Para parar o Milvus a partir do PowerShell, execute « <code translate="no">.\standalone.bat stop</code> »; a partir do Prompt de Comandos, execute « <code translate="no">standalone.bat stop</code> ». O comando « <code translate="no">delete</code> » remove tanto o contentor como os dados nele armazenados. Faça uma cópia de segurança dos dados antes de o utilizar.</p>
<h3 id="From-WSL-2" class="common-anchor-header">A partir do WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Abra a sua distribuição WSL instalada a partir de um terminal do Windows:</p>
<pre><code translate="no" class="language-powershell">wsl
</code></pre>
<p>No terminal do WSL, descarregue o script Linux e inicie o Milvus uma vez:</p>
<pre><code translate="no" class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Para parar o Milvus, execute « <code translate="no">bash standalone_embed.sh stop</code> ». O comando « <code translate="no">bash standalone_embed.sh delete</code> » remove o contentor, a configuração e os dados; faça uma cópia de segurança dos dados antes de o utilizar.</p>
<h2 id="Run-Milvus-with-Docker-Compose" class="common-anchor-header">Executar o Milvus com o Docker Compose<button data-href="#Run-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize a configuração anexada à versão v3.0.3. Execute apenas a sequência de comandos adequada ao seu terminal.</p>
<h3 id="From-PowerShell" class="common-anchor-header">A partir do PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>Descarregue a configuração e inicie o Milvus:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml&quot; -OutFile docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">A partir do Prompt de Comando do Windows<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>Descarregue a configuração e inicie o Milvus:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml&quot; -o docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-WSL-2" class="common-anchor-header">A partir do WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Abra a sua distribuição WSL e, em seguida, execute os comandos Linux:</p>
<pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml -O docker-compose.yml
docker compose up -d
docker compose ps
<button class="copy-code-btn"></button></code></pre>
<p>A configuração inicia três contentores de execução prolongada: <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> e <strong>milvus-etcd</strong>. Também executa o serviço «one-shot» <code translate="no">milvus-volume-init</code> para preparar a propriedade do diretório de dados. Os seus dados correspondem a <strong>volumes/milvus</strong>, <strong>volumes/minio</strong> e <strong>volumes/etcd</strong> no diretório de trabalho. O MinIO expõe as portas <strong>9000</strong> e <strong>9001</strong>; o Milvus expõe as portas <strong>19530</strong> e <strong>9091</strong>. Para comandos de configuração e de ciclo de vida, consulte <a href="/docs/pt/install_standalone-docker-compose.md">Executar o Milvus com o Docker Compose</a>.</p>
<h2 id="FAQs" class="common-anchor-header">Perguntas frequentes<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error" class="common-anchor-header">Como posso resolver o erro « <code translate="no">Docker Engine stopped</code> »?<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error" class="anchor-icon" translate="no">
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
    </button></h3><p>O Milvus utiliza contentores Linux. Verifique o Docker Desktop e o seu backend WSL 2 antes de tentar novamente a instalação:</p>
<ol>
<li><p>Ative a virtualização de hardware na BIOS/UEFI se <strong>o Gestor de Tarefas</strong> &gt; <strong>Desempenho</strong> indicar que está desativada. Consulte os <a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">requisitos do Docker Desktop para Windows</a>.</p></li>
<li><p>Inicie o Docker Desktop a partir do menu Iniciar do Windows e aguarde até que o seu motor seja executado. Podem ser necessários privilégios de administrador para instalar ou atualizar o WSL ou para modos específicos de instalação do Docker Desktop; estes não são um requisito geral para executar contentores Linux com o backend WSL 2.</p></li>
<li><p>Verifique o WSL a partir de um terminal do Windows. Se for necessária uma atualização, execute o comando de atualização com os privilégios solicitados pelo Windows:</p>
<pre><code translate="no" class="language-powershell">wsl --version
wsl --update
</code></pre></li>
<li><p>Ative a opção <strong>«Utilizar o motor baseado no WSL 2»</strong> no Docker Desktop. Se o menu do Docker apresentar a opção <strong>«Mudar para contentores Linux</strong>», selecione-a. Não mude para contentores Windows para resolver problemas numa imagem Milvus Linux.</p></li>
<li><p>Execute a seguinte verificação no terminal que utiliza para a instalação:</p>
<pre><code translate="no" class="language-powershell">docker info --format &quot;{{.OSType}}&quot;
</code></pre>
<p>Deve devolver « <code translate="no">linux</code> ». Se não conseguir ligar-se ao daemon, siga <a href="https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/">as instruções de resolução de problemas do Docker Desktop</a> antes de voltar a executar o script do Milvus. O simples facto de iniciar o « <code translate="no">com.docker.service</code> » não garante que o motor Linux do WSL 2 esteja a funcionar.</p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="common-anchor-header">Como posso lidar com problemas relacionados com o WSL durante a implementação do Milvus?<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Se tiver encontrado problemas relacionados com o WSL ao executar o Milvus a partir do WSL 2, poderá ser necessário verificar se configurou o Docker Desktop para utilizar o motor baseado no WSL 2, da seguinte forma:</p>
<ol>
<li><p>Certifique-se de que a opção «Utilizar o motor baseado no WSL 2» está marcada em <strong>Definições</strong> &gt; <strong>Geral</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Utilizar o motor baseado no WSL 2 nas definições do Docker Desktop</span>
  
 </span></p></li>
<li><p>Selecione, entre as distribuições WSL 2 instaladas, aquelas nas quais pretende ativar a integração com o Docker, acedendo a: <strong>Definições</strong> &gt; <strong>Recursos</strong> &gt; <strong>Integração WSL</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>Selecionar distribuições WSL 2 nas definições do Docker Desktop</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="common-anchor-header">Como posso resolver os erros relacionados com o volume que aparecem durante o arranque do Milvus, com a mensagem « <code translate="no">Read config failed</code> »?<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="anchor-icon" translate="no">
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
    </button></h3><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>Mensagem de erro «Falha na leitura da configuração» na inicialização do Milvus</span>
  
 </span></p>
<p>Para resolver o erro apresentado durante o arranque do Milvus com a mensagem «Falha ao ler a configuração», é necessário verificar se o volume montado no contentor do Milvus está correto. Se o volume estiver corretamente montado no contentor, pode utilizar o comando <code translate="no">docker exec</code> para aceder ao contentor e listar a pasta <strong>/milvus/configs</strong> da seguinte forma:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Listar ficheiros de configuração do Milvus</span>
  
 </span></p>
<div class="alert note">
<p>O Storage V3 está desativado por predefinição. Ative-o antes de utilizar funcionalidades que dependam dele. Para conhecer os requisitos e as considerações de compatibilidade, consulte <a href="/docs/pt/storage-v3.md">Storage V3</a>.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Próximos passos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de instalar o Milvus no Docker, siga o caminho <strong>«Utilizar um servidor Milvus existente»</strong> no <a href="/docs/pt/quickstart.md">Guia de Início Rápido</a> e ligue o SDK a <code translate="no">http://localhost:19530</code>. Este caminho do servidor não necessita do Milvus Lite; o bloco de ligação local <code translate="no">.db</code> iniciaria uma base de dados local separada em vez de utilizar este contentor.</p>
<p>Também pode:</p>
<ul>
<li><p>Consultar <a href="/docs/pt/quickstart.md">o Guia de Início Rápido</a> para ver o que o Milvus pode fazer.</p></li>
<li><p>Aprender as operações básicas do Milvus:</p>
<ul>
<li><a href="/docs/pt/manage_databases.md">Gerir bases de dados</a></li>
<li><a href="/docs/pt/manage-collections.md">Gerir coleções</a></li>
<li><a href="/docs/pt/manage-partitions.md">Gerir partições</a></li>
<li><a href="/docs/pt/insert-update-delete.md">Inserir, atualizar e eliminar</a></li>
<li><a href="/docs/pt/single-vector-search.md">Pesquisa de vetor único</a></li>
<li><a href="/docs/pt/multi-vector-search.md">Pesquisa híbrida</a></li>
</ul></li>
<li><p>Para implementações com o Compose, siga as instruções em <a href="/docs/pt/upgrade_milvus_standalone-docker.md">«Atualizar o Milvus Standalone com o Docker Compose»</a>; verifique se o procedimento funciona no seu ambiente antes de proceder à atualização.</p></li>
<li><p><a href="/docs/pt/scaleout.md">Dimensiona o teu cluster Milvus</a>.</p></li>
<li><p>Implemente o seu cluster Milvus em nuvens:</p>
<ul>
<li><a href="/docs/pt/eks.md">Amazon EKS</a></li>
<li><a href="/docs/pt/gcp.md">Google Cloud</a></li>
<li><a href="/docs/pt/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/pt/milvus-webui.md">o Milvus WebUI</a>, uma interface web intuitiva para a monitorização e gestão do Milvus.</p></li>
<li><p>Explore <a href="/docs/pt/milvus_backup_overview.md">o Milvus Backup</a>, uma ferramenta de código aberto para cópias de segurança dos dados do Milvus.</p></li>
<li><p>Explore <a href="/docs/pt/birdwatcher_overview.md">o Birdwatcher</a>, uma ferramenta de código aberto para depuração do Milvus e atualizações dinâmicas de configuração.</p></li>
<li><p>Explore <a href="https://github.com/zilliztech/attu">o Attu</a>, uma ferramenta GUI de código aberto para a gestão intuitiva do Milvus.</p></li>
<li><p><a href="/docs/pt/monitor.md">Monitorize o Milvus com o Prometheus</a>.</p></li>
</ul>
