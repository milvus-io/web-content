---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  Saiba como instalar o Milvus de forma autónoma com o Docker Desktop para
  Windows.
title: Executar o Milvus no Docker (Linux)
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
    </button></h1><p>Esta página demonstra como executar o Milvus no Windows usando o Docker Desktop para Windows.</p>
<h2 id="Prerequisites​" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Instalar o Docker Desktop</a>.</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Instalar o Subsistema Windows para Linux 2 (WSL 2)</a>.</p></li>
<li><p>Instalar o Python 3.8+.</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">Executar o Milvus no Docker<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus fornece um script de instalação para instalá-lo como um contêiner do Docker. Depois de instalar o Docker Desktop no Microsoft Windows, pode aceder ao Docker CLI a partir do PowerShell ou do Windows Command Prompt em modo <strong>de administrador</strong> e do WSL 2. </p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">A partir do PowerShell ou do prompt de comando do Windows</h3><p>Se estiver mais familiarizado com o PowerShell ou o Prompt de Comando do Windows, o prompt de comando é o seguinte.</p>
<ol>
<li><p>Abra o Docker Desktop no modo de administrador clicando com o botão direito do rato e selecionando <strong>Executar como administrador</strong>.</p></li>
<li><p>Descarregue o script de instalação e guarde-o como <code translate="no">standalone.bat</code>.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;<span class="hljs-title class_">Invoke</span>-<span class="hljs-title class_">WebRequest</span> <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/milvus-io/milvus/blob/master/scripts/standalone_embed.bat -OutFile standalone.bat​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Execute o script descarregado para iniciar o Milvus como um contentor Docker.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;standalone.<span class="hljs-property">bat</span> start​
<span class="hljs-title class_">Wait</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Milvus</span> starting...​
<span class="hljs-title class_">Start</span> successfully.​
<span class="hljs-title class_">To</span> change the <span class="hljs-keyword">default</span> <span class="hljs-title class_">Milvus</span> configuration, edit user.<span class="hljs-property">yaml</span> and restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>Depois de executar o script de instalação.</p>
<ul>
<li><p>Um contentor Docker chamado <strong>milvus-standalone</strong> foi iniciado na porta <strong>19530</strong>.</p></li>
<li><p>Um etcd incorporado é instalado juntamente com o Milvus no mesmo contentor e serve na porta <strong>2379</strong>. O seu ficheiro de configuração é mapeado para <strong>embedEtcd.yaml</strong> na pasta atual.</p></li>
<li><p>O volume de dados do Milvus é mapeado para <strong>volumes/milvus</strong> na pasta atual.</p></li>
</ul>
<p>Pode utilizar os seguintes comandos para gerir o contentor Milvus e os dados armazenados.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-comment"># Stop Milvus​</span>
C:\&gt;standalone.bat stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus container​</span>
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. <span class="hljs-comment"># Container has been removed.​</span>
Delete successfully. <span class="hljs-comment"># Data has been removed.​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">A partir do WSL 2</h3><p>Se preferir iniciar o Milvus utilizando comandos Linux e scripts shell no Windows, certifique-se de que já instalou o comando WSL 2. Para obter detalhes sobre como instalar o comando WSL 2, pode consultar este <a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">artigo da Microsoft</a>.</p>
<ol>
<li><p>Iniciar o WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Descarregar o script de instalação</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicie o Milvus como um contentor docker.</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the <span class="hljs-literal">default</span> Milvus configuration, <span class="hljs-keyword">add</span> your settings to the user.yaml file <span class="hljs-keyword">and</span> then restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>Pode utilizar os seguintes comandos para gerir o contentor do Milvus e os dados armazenados.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Stop Milvus​</span>
$ bash standalone_embed.sh stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus data​</span>
$ bash standalone_embed.sh stop​
Delete Milvus container successfully.​
Delete successfully.​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Executar o Milvus com o Docker Compose<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de ter instalado o Docker Desktop no Microsoft Windows, pode aceder ao Docker CLI a partir do PowerShell ou do Prompt de Comando do Windows em modo <strong>de administrador</strong>. É possível executar o Docker Compose no PowerShell, no Prompt de Comando do Windows ou no WSL 2 para iniciar o Milvus.</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">No PowerShell ou no prompt de comando do Windows</h3><ol>
<li><p>Abra o Docker Desktop no modo de administrador clicando com o botão direito do rato e selecionando <strong>Executar como administrador</strong>.</p></li>
<li><p>Execute os seguintes comandos no PowerShell ou no prompt de comando do Windows para baixar o arquivo de configuração do Docker Compose para o Milvus Standalone e iniciar o Milvus.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-comment"># Download the configuration file and rename it as docker-compose.yml​</span>
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.4.15/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
<span class="hljs-comment"># Start Milvus​</span>
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dependendo da sua ligação de rede, a transferência de imagens para a instalação do Milvus pode demorar algum tempo. Assim que os contentores com os nomes <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> e <strong>milvus-etcd</strong> estiverem a funcionar, pode verificar que</p>
<ul>
<li><p>O contentor <strong>milvus-etcd</strong> não expõe quaisquer portas ao anfitrião e mapeia os seus dados para <strong>volumes/etcd</strong> na pasta atual.</p></li>
<li><p>O contentor <strong>milvus-minio</strong> serve as portas <strong>9090</strong> e <strong>9091</strong> localmente com as credenciais de autenticação predefinidas e mapeia os seus dados para <strong>volumes/minio</strong> na pasta atual.</p></li>
<li><p>O contentor <strong>milvus-standalone</strong> serve as portas <strong>19530</strong> localmente com as predefinições e mapeia os seus dados para <strong>volumes/milvus</strong> na pasta atual.</p></li>
</ul></li>
</ol>
<p>Também pode chamar a versão Linux dos comandos do Docker Compose se tiver a WSL 2 instalada.</p>
<h3 id="From-WSL-2​" class="common-anchor-header">A partir da WSL 2</h3><p>O procedimento é semelhante ao uso do Docker Compose para instalar o Milvus em sistemas Linux.</p>
<ol>
<li><p>Inicie o WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Baixe o arquivo de configuração do Milvus.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.17/milvus-standalone-docker-compose.yml -O docker-compose.yml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicie o Milvus.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d​
​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">Perguntas frequentes<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">Como posso lidar com o erro <code translate="no">Docker Engine stopped</code>?</h3><p>Depois de instalar o Docker Desktop no Windows, poderá encontrar o erro <code translate="no">Docker Engine stopped</code> se o seu computador não estiver configurado corretamente. Nesse caso, pode ser necessário fazer as seguintes verificações.</p>
<ol>
<li><p>Verificar se a virtualização está activada.</p>
<p>Pode verificar se a virtualização está activada consultando o separador <strong>Desempenho</strong> no Gestor <strong>de Tarefas</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" />
   </span> <span class="img-wrapper"> <span>Virtualização no Gerenciador de Tarefas</span> </span></p>
<p>Se a virtualização estiver desactivada, poderá ser necessário verificar as definições da BIOS do firmware da placa-mãe. A maneira de ativar a virtualização nas configurações do BIOS varia de acordo com os fornecedores de placas-mãe. Para a placa-mãe ASUS, por exemplo, pode consultar <a href="https://www.asus.com/support/faq/1043786/">este artigo</a> sobre como ativar a virtualização.</p>
<p>Em seguida, é necessário reiniciar o computador e ativar o Hyper-V. Para obter detalhes, consulte este <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">artigo da Microsoft</a>.</p></li>
<li><p>Verifique se o Docker Desktop Service foi iniciado.</p>
<p>Pode executar o seguinte comando para iniciar o Docker Desktop Service.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker <span class="hljs-keyword">for</span> Windows Service service <span class="hljs-keyword">is</span> starting.​
The Docker <span class="hljs-keyword">for</span> Windows Service service was started successfully.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verifique se o WSL foi instalado corretamente.</p>
<p>Pode executar o seguinte comando para instalar ou atualizar o comando WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking <span class="hljs-keyword">for</span> updates.​
The most recent version of Windows Subsystem <span class="hljs-keyword">for</span> Linux <span class="hljs-keyword">is</span> already installed.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verifique se o Docker Daemon foi iniciado.</p>
<p>É necessário ir ao diretório de instalação do Docker Desktop e executar <code translate="no">.\DockerCli.exe -SwitchDaemon</code> para iniciar o Docker Daemon.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd <span class="hljs-string">&quot;C:\Program Files\Docker\Docker&quot;</span>​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post <span class="hljs-string">&quot;http://ipc/engine/switch&quot;</span>: <span class="hljs-built_in">open</span> \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verifique se iniciou o Docker Desktop no modo <strong>de administrador</strong>.</p>
<p>Certifique-se de que iniciou o Docker Desktop no modo de administrador. Para o fazer, clique com o botão direito do rato no <strong>Docker Desktop</strong> e selecione <strong>Executar como administrador</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" />
   </span> <span class="img-wrapper"> <span>Iniciar o Docker Desktop como administrador</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">Como posso lidar com problemas relacionados com a WSL durante a implementação do Milvus?</h3><p>Se encontrou problemas relacionados com a WSL enquanto executava o Milvus a partir da WSL 2, poderá ter de verificar se configurou o Docker Desktop para utilizar o motor baseado na WSL 2 da seguinte forma.</p>
<ol>
<li><p>Certifique-se de que a opção "Usar o mecanismo baseado na WSL 2" está marcada em <strong>Configurações</strong> &gt; <strong>Geral</strong>. </p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Usar o mecanismo baseado em WSL 2 em Configurações do Docker Desktop</span> </span></p></li>
<li><p>Selecione, de entre as distribuições WSL 2 instaladas, aquela em que pretende ativar a integração do Docker, acedendo a: <strong>Configurações</strong> &gt; <strong>Recursos</strong> &gt; <strong>Integração WSL</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Selecione as distribuições WSL 2 nas definições do ambiente de trabalho Docker</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">Como posso lidar com os erros relacionados com o volume apresentados durante o arranque do Milvus que lê <code translate="no">Read config failed</code>?</h3><p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" />
   </span> <span class="img-wrapper"> <span>Aviso de erro de falha de configuração de leitura no arranque do Milvus</span> </span></p>
<p>Para lidar com o erro apresentado durante o arranque do Milvus que diz "Read config failed" (Falha na leitura da configuração), é necessário verificar se o volume montado no contentor do Milvus está correto. Se o volume estiver corretamente montado no contentor, pode utilizar o comando <code translate="no">docker exec</code> para entrar no contentor e listar a pasta <strong>/milvus/configs</strong> da seguinte forma.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" />
   </span> <span class="img-wrapper"> <span>Listar ficheiros de configuração do Milvus</span> </span></p>
<p></p>
