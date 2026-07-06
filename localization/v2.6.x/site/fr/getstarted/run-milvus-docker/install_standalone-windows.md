---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  Découvrez comment installer Milvus en mode autonome avec Docker Desktop pour
  Windows.
title: Exécuter Milvus dans Docker (Linux)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">Exécuter Milvus dans Docker (Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page explique comment exécuter Milvus sous Windows à l'aide de Docker Desktop pour Windows.​</p>
<h2 id="Prerequisites​" class="common-anchor-header">Prérequis​<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Installez Docker Desktop</a>.</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Installez le sous-système Windows pour Linux 2 (WSL 2)</a>.​</p></li>
<li><p>Installez Python 3.8 ou une version ultérieure.</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">Exécuter Milvus dans Docker​<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus fournit un script d'installation permettant de l'installer en tant que conteneur Docker. Une fois Docker Desktop installé sur Microsoft Windows, vous pouvez accéder à l'interface CLI de Docker depuis PowerShell ou l'invite de commande Windows en mode <strong>administrateur</strong>, ainsi que depuis WSL 2. ​</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Depuis PowerShell ou l'invite de commande Windows​<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><p>Si vous êtes plus à l'aise avec PowerShell ou l'invite de commande Windows, la commande à utiliser est la suivante.</p>
<ol>
<li><p>Ouvrez Docker Desktop en mode administrateur en cliquant avec le bouton droit de la souris et en sélectionnant « <strong>Exécuter en tant qu’administrateur</strong> ».​</p></li>
<li><p>Téléchargez le script d’installation et enregistrez-le sous le nom « <code translate="no">standalone.bat</code> ».​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;Invoke-WebRequest https://raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/scripts/standalone_embed.bat -OutFile standalone.bat​

</code></pre></li>
<li><p>Exécutez le script téléchargé pour démarrer Milvus en tant que conteneur Docker.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;standalone.bat start​
Wait for Milvus starting...​
Start successfully.​
To change the default Milvus configuration, edit user.yaml and restart the service.​

</code></pre>
<p>Une fois le script d'installation exécuté :​</p>
<ul>
<li><p>Un conteneur Docker nommé <strong>milvus-standalone</strong> a été lancé sur le port <strong>19530</strong>.​</p></li>
<li><p>Un embed etcd est installé avec Milvus dans le même conteneur et est accessible sur le port <strong>2379</strong>. Son fichier de configuration est mappé vers <strong>embedEtcd.yaml</strong> dans le dossier actuel.​</p></li>
<li><p>Le volume de données Milvus est mappé vers <strong>volumes/milvus</strong> dans le dossier actuel.​</p></li>
</ul>
<p>Vous pouvez utiliser les commandes suivantes pour gérer le conteneur Milvus et les données stockées.​</p>
<pre><code translate="no" class="language-powershell"># Stop Milvus​
C:\&gt;standalone.bat stop​
Stop successfully.​
​
# Delete Milvus container​
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. # Container has been removed.​
Delete successfully. # Data has been removed.​

</code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">Depuis WSL 2​<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>Si vous préférez démarrer Milvus à l'aide de commandes Linux et de scripts shell sous Windows, assurez-vous d'avoir déjà installé WSL 2. Pour plus de détails sur l'installation de WSL 2, vous pouvez consulter cet <a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">article Microsoft</a>.​</p>
<ol>
<li><p>Lancez WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>Téléchargez le script d'installation​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Lancez Milvus en tant que conteneur Docker.</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the default Milvus configuration, add your settings to the user.yaml file and <span class="hljs-keyword">then</span> restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez utiliser les commandes suivantes pour gérer le conteneur Milvus et les données stockées.​</p>
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
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Exécutez Milvus avec Docker Compose​<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois Docker Desktop installé sous Microsoft Windows, vous pouvez accéder à l'interface CLI de Docker depuis PowerShell ou l'invite de commande Windows en mode <strong>administrateur</strong>. Vous pouvez exécuter Docker Compose dans PowerShell, l'invite de commande Windows ou WSL 2 pour démarrer Milvus.</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Depuis PowerShell ou l'invite de commande Windows​<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p>Ouvrez Docker Desktop en mode administrateur en cliquant avec le bouton droit de la souris et en sélectionnant « <strong>Exécuter en tant qu’administrateur</strong> ».​</p></li>
<li><p>Exécutez les commandes suivantes dans PowerShell ou l’invite de commande Windows pour télécharger le fichier de configuration Docker Compose de Milvus Standalone et démarrer Milvus.</p>
<pre><code translate="no" class="language-powershell"># Download the configuration file and rename it as docker-compose.yml​
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.6.19/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
# Start Milvus​
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

</code></pre>
<p>En fonction de votre connexion réseau, le téléchargement des images pour l’installation de Milvus peut prendre un certain temps. Une fois que les conteneurs nommés <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> et <strong>milvus-etcd</strong> sont opérationnels, vous pouvez constater que ​</p>
<ul>
<li><p>le conteneur <strong>milvus-etcd</strong> n’expose aucun port vers l’hôte et mappe ses données vers le répertoire <strong>volumes/etcd</strong> du dossier actuel.</p></li>
<li><p>Le conteneur <strong>milvus-minio</strong> expose localement les ports <strong>9090</strong> et <strong>9091</strong> avec les identifiants d’authentification par défaut et mappe ses données vers le répertoire <strong>volumes/minio</strong> du dossier actuel.</p></li>
<li><p>Le conteneur <strong>milvus-standalone</strong> expose localement les ports <strong>19530</strong> avec les paramètres par défaut et mappe ses données vers <strong>le répertoire volumes/milvus</strong> du dossier actuel.​</p></li>
</ul></li>
</ol>
<p>Vous pouvez également utiliser la version Linux des commandes Docker Compose si WSL 2 est installé.​</p>
<h3 id="From-WSL-2​" class="common-anchor-header">Depuis WSL 2​<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>La procédure est similaire à celle consistant à utiliser Docker Compose pour installer Milvus sur des systèmes Linux.​</p>
<ol>
<li><p>Lancez WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>Téléchargez le fichier de configuration de Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.19/milvus-standalone-docker-compose.yml -O docker-compose.yml​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Lancez Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d​</span>
​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">FAQ​<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">Comment résoudre l'erreur « <code translate="no">Docker Engine stopped</code> » ?​<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="anchor-icon" translate="no">
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
    </button></h3><p>Une fois Docker Desktop installé sous Windows, vous pouvez rencontrer l'erreur « <code translate="no">Docker Engine stopped</code> » si votre ordinateur n'est pas correctement configuré. Dans ce cas, vous devrez peut-être effectuer les vérifications suivantes :​</p>
<ol>
<li><p>Vérifiez si la virtualisation est activée.​</p>
<p>Vous pouvez vérifier si la virtualisation est activée en consultant l’onglet <strong>« Performances</strong> » du <strong>Gestionnaire des tâches</strong>.​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" /> 
   <span>La virtualisation dans le Gestionnaire des tâches</span>
  
 </span></p>
<p>Si la virtualisation est désactivée, vous devrez peut-être vérifier les paramètres du BIOS de votre carte mère. La procédure pour activer la virtualisation dans les paramètres du BIOS varie selon les fabricants de cartes mères. Pour les cartes mères ASUS, par exemple, vous pouvez consulter <a href="https://www.asus.com/support/faq/1043786/">cet article</a> sur l’activation de la virtualisation.​</p>
<p>Vous devez ensuite redémarrer votre ordinateur et activer Hyper-V. Pour plus de détails, consultez cet <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">article Microsoft</a>.​</p></li>
<li><p>Vérifiez si le service Docker Desktop a été démarré.​</p>
<p>Vous pouvez exécuter la commande suivante pour démarrer le service Docker Desktop.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker for Windows Service service is starting.​
The Docker for Windows Service service was started successfully.​

</code></pre></li>
<li><p>Vérifiez si WSL a été correctement installé.​</p>
<p>Vous pouvez exécuter la commande suivante pour installer ou mettre à jour WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking for updates.​
The most recent version of Windows Subsystem for Linux is already installed.​

</code></pre></li>
<li><p>Vérifiez si le démon Docker a été démarré.</p>
<p>Vous devez vous rendre dans le répertoire d'installation de Docker Desktop et exécuter la commande « <code translate="no">.\DockerCli.exe -SwitchDaemon</code> » pour démarrer le démon Docker.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd &quot;C:\Program Files\Docker\Docker&quot;​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post &quot;http://ipc/engine/switch&quot;: open \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

</code></pre></li>
<li><p>Vérifiez que vous avez bien lancé Docker Desktop en mode <strong>administrateur</strong>.​</p>
<p>Assurez-vous d’avoir lancé Docker Desktop en mode administrateur. Pour ce faire, cliquez avec le bouton droit sur <strong>Docker Desktop</strong> et sélectionnez « <strong>Exécuter en tant qu’administrateur</strong> ».​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" /> 
   <span>Lancer Docker Desktop en tant qu’administrateur</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">Comment résoudre les problèmes liés à WSL lors du déploiement de Milvus ?​<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="anchor-icon" translate="no">
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
    </button></h3><p>Si vous avez rencontré des problèmes liés à WSL lors de l’exécution de Milvus depuis WSL 2, vous devrez peut-être vérifier si vous avez configuré Docker Desktop pour utiliser le moteur basé sur WSL 2 comme suit :​</p>
<ol>
<li><p>Assurez-vous que l’option « Utiliser le moteur basé sur WSL 2 » est cochée dans <strong>Paramètres</strong> &gt; <strong>Général</strong>. ​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Utiliser le moteur basé sur WSL 2 dans les paramètres de Docker Desktop</span>
  
 </span></p></li>
<li><p>Sélectionnez, parmi vos distributions WSL 2 installées, celles sur lesquelles vous souhaitez activer l’intégration Docker en accédant à : <strong>Paramètres</strong> &gt; <strong>Ressources</strong> &gt; <strong>Intégration WSL</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>Sélectionner les distributions WSL 2 dans les paramètres de Docker Desktop</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">Comment puis-je résoudre les erreurs liées au volume qui s’affichent au démarrage de Milvus et indiquent « <code translate="no">Read config failed</code> » ?​<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="anchor-icon" translate="no">
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
  
   <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>Message d’erreur « Read config failed » au démarrage de Milvus</span>
  
 </span></p>
<p>Pour résoudre l’erreur « Échec de la lecture de la configuration » qui s’affiche au démarrage de Milvus, vous devez vérifier si le volume monté dans le conteneur Milvus est correct. Si le volume est correctement monté dans le conteneur, vous pouvez utiliser la commande <code translate="no">docker exec</code> pour accéder au conteneur et lister le dossier <strong>/milvus/configs</strong> comme suit :​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Afficher les fichiers de configuration de Milvus</span>
  
 </span></p>
<p>​</p>
<h2 id="Whats-next" class="common-anchor-header">Et ensuite ?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois Milvus installé dans Docker, vous pouvez :</p>
<ul>
<li><p>Consulter <a href="/docs/fr/v2.6.x/quickstart.md">le guide de démarrage rapide</a> pour découvrir les fonctionnalités de Milvus.</p></li>
<li><p>Apprendre les opérations de base de Milvus :</p>
<ul>
<li><a href="/docs/fr/v2.6.x/manage_databases.md">Gérer les bases de données</a></li>
<li><a href="/docs/fr/v2.6.x/manage-collections.md">Gérer les collections</a></li>
<li><a href="/docs/fr/v2.6.x/manage-partitions.md">Gérer les partitions</a></li>
<li><a href="/docs/fr/v2.6.x/insert-update-delete.md">Insérer, mettre à jour ou supprimer</a></li>
<li><a href="/docs/fr/v2.6.x/single-vector-search.md">Recherche sur un seul vecteur</a></li>
<li><a href="/docs/fr/v2.6.x/multi-vector-search.md">Recherche hybride</a></li>
</ul></li>
<li><p><a href="/docs/fr/v2.6.x/upgrade_milvus_cluster-helm.md">Mettre à niveau Milvus à l'aide d'un Helm Chart</a>.</p></li>
<li><p><a href="/docs/fr/v2.6.x/scaleout.md">Faites évoluer votre cluster Milvus</a>.</p></li>
<li><p>Déployez votre cluster Milvus sur le cloud :</p>
<ul>
<li><a href="/docs/fr/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/fr/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/fr/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Découvrez <a href="/docs/fr/v2.6.x/milvus-webui.md">Milvus WebUI</a>, une interface web intuitive pour la surveillance et la gestion de Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>, un outil open source dédié aux sauvegardes de données Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/v2.6.x/birdwatcher_overview.md">Birdwatcher</a>, un outil open source permettant le débogage de Milvus et la mise à jour dynamique des configurations.</p></li>
<li><p>Découvrez <a href="https://github.com/zilliztech/attu">Attu</a>, un outil GUI open source permettant une gestion intuitive de Milvus.</p></li>
<li><p><a href="/docs/fr/v2.6.x/monitor.md">Surveillez Milvus avec Prometheus</a>.</p></li>
</ul>
