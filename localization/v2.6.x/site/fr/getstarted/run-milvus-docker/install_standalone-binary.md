---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: >-
  Apprenez à installer Milvus de manière autonome avec un paquetage RPM/DEB
  préconstruit.
title: Installation de Milvus Standalone avec un package RPM/DEB
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">Installation de Milvus Standalone avec un package RPM/DEB<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page explique comment installer Milvus standalone avec un paquetage RPM/DEB préconstruit.</p>
<h2 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Vous avez déjà installé libstdc++ 8.5.0 ou une version ultérieure.</li>
<li><a href="/docs/fr/prerequisite-docker.md">Vérifiez la configuration matérielle et logicielle requise</a> avant de procéder à l'installation.</li>
</ul>
<h2 id="Download-the-RPMDEB-Package" class="common-anchor-header">Télécharger le paquetage RPM/DEB<button data-href="#Download-the-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez télécharger le paquetage RPM/DEB correspondant à l'architecture de votre système à partir de la <a href="https://github.com/milvus-io/milvus/releases/tag/v2.6.4">page Milvus Releases</a>.</p>
<ul>
<li>Pour x86_64/amd64, téléchargez le paquet <strong>milvus_2.6.0-1_amd64.deb</strong> ou <strong>milvus_2.6.0-1_amd64.rpm</strong>.</li>
<li>Pour ARM64, téléchargez le paquet <strong>milvus_2.6.0-1_arm64.deb</strong> ou <strong>milvus_2.6.0-1_arm64.rpm</strong>.</li>
</ul>
<p>La commande suivante suppose que vous allez exécuter Milvus Standalone sur une machine x86_64/amd64.</p>
<pre><code translate="no" class="language-shell">wget https://github.com/milvus-io/milvus/releases/download/v2.6.4/milvus_2.6.0-1_amd64.rpm -O milvus_2.6.0-1_amd64.rpm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-the-RPMDEB-Package" class="common-anchor-header">Installation du paquetage RPM/DEB<button data-href="#Install-the-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour installer le paquetage RPM/DEB, vous pouvez utiliser le gestionnaire de paquetages de votre système.</p>
<p>Pour les systèmes basés sur RPM (tels que CentOS, Fedora et RHEL), utilisez la commande <code translate="no">yum</code> pour installer le paquetage.</p>
<pre><code translate="no" class="language-shell">yum install -y ./milvus_2.6.0-1_amd64.rpm
rpm -qa| grep milvus
<button class="copy-code-btn"></button></code></pre>
<p>Pour les systèmes basés sur DEB (tels qu'Ubuntu et Debian), utilisez la commande <code translate="no">apt</code> pour installer le paquet.</p>
<pre><code translate="no" class="language-shell">apt install -y  ./milvus_2.6.0-1_amd64.deb
dpkg -l | grep milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus-Standalone" class="common-anchor-header">Démarrer Milvus Standalone<button data-href="#Start-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois l'installation terminée, Milvus est installé en tant que service systemd et peut être démarré à l'aide de la commande suivante :</p>
<pre><code translate="no" class="language-shell">systemctl start milvus
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez vérifier l'état du service Milvus à l'aide de la commande suivante :</p>
<pre><code translate="no" class="language-shell">systemctl status milvus
<button class="copy-code-btn"></button></code></pre>
<p>Si Milvus fonctionne correctement, vous devriez obtenir le résultat suivant :</p>
<pre><code translate="no"><span class="hljs-string">●</span> <span class="hljs-string">milvus.service</span> <span class="hljs-bullet">-</span> <span class="hljs-string">Milvus</span> <span class="hljs-string">Standalone</span> <span class="hljs-string">Server</span>
   <span class="hljs-attr">Loaded:</span> <span class="hljs-string">loaded</span> <span class="hljs-string">(/lib/systemd/system/milvus.service;</span> <span class="hljs-string">enabled;</span> <span class="hljs-attr">vendor preset:</span> <span class="hljs-string">enabled)</span>
   <span class="hljs-attr">Active:</span> <span class="hljs-string">active</span> <span class="hljs-string">(running)</span> <span class="hljs-string">since</span> <span class="hljs-string">Fri</span> <span class="hljs-number">2025-08-10 10:30:00 </span><span class="hljs-string">UTC;</span> <span class="hljs-string">5s</span> <span class="hljs-string">ago</span>
 <span class="hljs-attr">Main PID:</span> <span class="hljs-number">1044122</span> <span class="hljs-string">(milvus)</span>
    <span class="hljs-attr">Tasks: 10 (limit:</span> <span class="hljs-number">4915</span><span class="hljs-string">)</span>
   <span class="hljs-attr">CGroup:</span> <span class="hljs-string">/system.slice/milvus.service</span>
           <span class="hljs-string">└─1044122</span> <span class="hljs-string">/usr/bin/milvus</span> <span class="hljs-string">run</span> <span class="hljs-string">standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>Vous trouverez le binaire Milvus à l'adresse <code translate="no">/usr/bin/milvus</code>, le fichier de service systemd à l'adresse <code translate="no">/lib/systemd/system/milvus.service</code>, et les dépendances à l'adresse <code translate="no">/usr/lib/milvus/</code>.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Facultatif) Mise à jour des configurations Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez modifier les configurations Milvus dans le fichier <code translate="no">/etc/milvus/configs/milvus.yaml</code>. Par exemple, pour modifier la ms <code translate="no">proxy.healthCheckTimeout</code> en <code translate="no">1000</code>, vous pouvez rechercher le paramètre cible et le modifier en conséquence. Pour les éléments de configuration applicables, voir <a href="/docs/fr/system_configuration.md">Configuration du système</a>.</p>
<h2 id="Stop-Milvus-Standalone" class="common-anchor-header">Arrêt de Milvus Standalone<button data-href="#Stop-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour arrêter Milvus Standalone, vous pouvez utiliser la commande suivante :</p>
<pre><code translate="no" class="language-shell">systemctl stop milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus-Standalone" class="common-anchor-header">Désinstaller Milvus Standalone<button data-href="#Uninstall-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour désinstaller Milvus Standalone, vous pouvez utiliser la commande suivante :</p>
<p>Pour les systèmes basés sur RPM :</p>
<pre><code translate="no" class="language-shell">rpm -e milvus
<button class="copy-code-btn"></button></code></pre>
<p>Pour les systèmes basés sur DEB :</p>
<pre><code translate="no" class="language-shell">apt remove milvus
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Après avoir installé Milvus Standalone, vous pouvez :</p>
<ul>
<li><p>Consulter <a href="/docs/fr/quickstart.md">Quickstart</a> pour voir ce que Milvus peut faire.</p></li>
<li><p>Apprendre les opérations de base de Milvus :</p>
<ul>
<li><a href="/docs/fr/manage_databases.md">Gérer les bases de données</a></li>
<li><a href="/docs/fr/manage-collections.md">Gérer les collections</a></li>
<li><a href="/docs/fr/manage-partitions.md">Gérer les partitions</a></li>
<li><a href="/docs/fr/insert-update-delete.md">Insérer, surinsérer et supprimer</a></li>
<li><a href="/docs/fr/single-vector-search.md">Recherche à vecteur unique</a></li>
<li><a href="/docs/fr/multi-vector-search.md">Recherche hybride</a></li>
</ul></li>
<li><p><a href="/docs/fr/upgrade_milvus_cluster-helm.md">Mise à niveau de Milvus à l'aide de Helm Chart</a>.</p></li>
<li><p><a href="/docs/fr/scaleout.md">Faire évoluer votre cluster Milvus</a>.</p></li>
<li><p>Déployer votre cluster Milvus sur des clouds :</p>
<ul>
<li><a href="/docs/fr/eks.md">Amazon EKS</a></li>
<li><a href="/docs/fr/gcp.md">Google Cloud</a></li>
<li><a href="/docs/fr/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Découvrez <a href="/docs/fr/milvus-webui.md">Milvus WebUI</a>, une interface web intuitive pour l'observabilité et la gestion de Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/milvus_backup_overview.md">Milvus Backup</a>, un outil open-source pour les sauvegardes de données Milvus.</p></li>
<li><p>Découvrez <a href="/docs/fr/birdwatcher_overview.md">Birdwatcher</a>, un outil open-source pour le débogage de Milvus et les mises à jour dynamiques de la configuration.</p></li>
<li><p>Découvrez <a href="https://github.com/zilliztech/attu">Attu</a>, un outil GUI open-source pour la gestion intuitive de Milvus.</p></li>
<li><p><a href="/docs/fr/monitor.md">Surveiller Milvus avec Prometheus</a>.</p></li>
</ul>
