---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: >-
  Scoprite come installare Milvus standalone con un pacchetto RPM/DEB
  precostituito.
title: Installare Milvus standalone con un pacchetto RPM/DEB
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">Installare Milvus standalone con un pacchetto RPM/DEB<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina illustra come installare Milvus standalone con un pacchetto RPM/DEB precostituito.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Avete già installato libstdc++ 8.5.0 o una versione successiva.</li>
<li><a href="/docs/it/prerequisite-docker.md">Controllare i requisiti hardware e software</a> prima dell'installazione.</li>
</ul>
<h2 id="Download-the-RPMDEB-Package" class="common-anchor-header">Scaricare il pacchetto RPM/DEB<button data-href="#Download-the-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile scaricare il pacchetto RPM/DEB in base all'architettura del sistema dalla pagina [Milvus Releases] (https://github.com/milvus-io/milvus/releases/tag/v{{ var.milvus_release_version }}).</p>
<ul>
<li>Per x86_64/amd64, scaricare il pacchetto <strong>{{ var.milvus_deb_amd64 }}</strong> o <strong>{{ var.milvus_rpm_amd64 }}</strong>.</li>
<li>Per ARM64, scaricare il pacchetto <strong>{{ var.milvus_deb_arm64 }}</strong> o <strong>{{ var.milvus_rpm_arm64 }}</strong>.</li>
</ul>
<p>Il comando seguente presuppone che Milvus Standalone venga eseguito su una macchina x86_64/amd64.</p>
<pre><code translate="no" class="language-shell">wget https://github.com/milvus-io/milvus/releases/download/v{{ var.milvus_release_version }}/{{ var.milvus_rpm_amd64 }} -O {{ var.milvus_rpm_amd64 }}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-the-RPMDEB-Package" class="common-anchor-header">Installare il pacchetto RPM/DEB<button data-href="#Install-the-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h2><p>Per installare il pacchetto RPM/DEB, potete usare il gestore di pacchetti del vostro sistema.</p>
<p>Per i sistemi basati su RPM (come CentOS, Fedora e RHEL), utilizzare il comando <code translate="no">yum</code> per installare il pacchetto.</p>
<pre><code translate="no" class="language-shell">yum install -y ./milvus_2.6.0-1_amd64.rpm
rpm -qa| grep milvus
<button class="copy-code-btn"></button></code></pre>
<p>Per i sistemi basati su DEB (come Ubuntu e Debian), usare il comando <code translate="no">apt</code> per installare il pacchetto.</p>
<pre><code translate="no" class="language-shell">apt install -y  ./milvus_2.6.0-1_amd64.rpm
dpkg -l | grep milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus-Standalone" class="common-anchor-header">Avviare Milvus Standalone<button data-href="#Start-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Al termine dell'installazione, Milvus è installato come servizio systemd e può essere avviato con il seguente comando:</p>
<pre><code translate="no" class="language-shell">systemctl start milvus
<button class="copy-code-btn"></button></code></pre>
<p>È possibile verificare lo stato del servizio Milvus con il seguente comando:</p>
<pre><code translate="no" class="language-shell">systemctl status milvus
<button class="copy-code-btn"></button></code></pre>
<p>Se Milvus è in esecuzione con successo, si dovrebbe vedere il seguente output:</p>
<pre><code translate="no"><span class="hljs-string">●</span> <span class="hljs-string">milvus.service</span> <span class="hljs-bullet">-</span> <span class="hljs-string">Milvus</span> <span class="hljs-string">Standalone</span> <span class="hljs-string">Server</span>
   <span class="hljs-attr">Loaded:</span> <span class="hljs-string">loaded</span> <span class="hljs-string">(/lib/systemd/system/milvus.service;</span> <span class="hljs-string">enabled;</span> <span class="hljs-attr">vendor preset:</span> <span class="hljs-string">enabled)</span>
   <span class="hljs-attr">Active:</span> <span class="hljs-string">active</span> <span class="hljs-string">(running)</span> <span class="hljs-string">since</span> <span class="hljs-string">Fri</span> <span class="hljs-number">2025-08-10 10:30:00 </span><span class="hljs-string">UTC;</span> <span class="hljs-string">5s</span> <span class="hljs-string">ago</span>
 <span class="hljs-attr">Main PID:</span> <span class="hljs-number">1044122</span> <span class="hljs-string">(milvus)</span>
    <span class="hljs-attr">Tasks: 10 (limit:</span> <span class="hljs-number">4915</span><span class="hljs-string">)</span>
   <span class="hljs-attr">CGroup:</span> <span class="hljs-string">/system.slice/milvus.service</span>
           <span class="hljs-string">└─1044122</span> <span class="hljs-string">/usr/bin/milvus</span> <span class="hljs-string">run</span> <span class="hljs-string">standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il binario di Milvus si trova all'indirizzo <code translate="no">/usr/bin/milvus</code>, il file del servizio systemd all'indirizzo <code translate="no">/lib/systemd/system/milvus.service</code> e le dipendenze all'indirizzo <code translate="no">/usr/lib/milvus/</code>.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Opzionale) Aggiornare le configurazioni di Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile modificare le configurazioni di Milvus nel file <code translate="no">/etc/milvus/configs/milvus.yaml</code>. Ad esempio, per cambiare i ms da <code translate="no">proxy.healthCheckTimeout</code> a <code translate="no">1000</code>, si può cercare il parametro di destinazione e modificarlo di conseguenza. Per le voci di configurazione applicabili, fare riferimento a <a href="/docs/it/system_configuration.md">Configurazione del sistema</a>.</p>
<h2 id="Stop-Milvus-Standalone" class="common-anchor-header">Arresto di Milvus Standalone<button data-href="#Stop-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Per arrestare Milvus Standalone, si può usare il seguente comando:</p>
<pre><code translate="no" class="language-shell">systemctl stop milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus-Standalone" class="common-anchor-header">Disinstalla Milvus Standalone<button data-href="#Uninstall-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Per disinstallare Milvus Standalone, si può usare il seguente comando:</p>
<p>Per i sistemi basati su RPM:</p>
<pre><code translate="no" class="language-shell">rpm -e milvus
<button class="copy-code-btn"></button></code></pre>
<p>Per i sistemi basati su DEB:</p>
<pre><code translate="no" class="language-shell">apt remove milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Cosa fare dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver installato Milvus Standalone, è possibile:</p>
<ul>
<li><p>Controllare <a href="/docs/it/quickstart.md">Quickstart</a> per vedere cosa può fare Milvus.</p></li>
<li><p>Imparare le operazioni di base di Milvus:</p>
<ul>
<li><a href="/docs/it/manage_databases.md">Gestire i database</a></li>
<li><a href="/docs/it/manage-collections.md">Gestire le collezioni</a></li>
<li><a href="/docs/it/manage-partitions.md">Gestire le partizioni</a></li>
<li><a href="/docs/it/insert-update-delete.md">Inserire, inserire ed eliminare</a></li>
<li><a href="/docs/it/single-vector-search.md">Ricerca a vettore singolo</a></li>
<li><a href="/docs/it/multi-vector-search.md">Ricerca ibrida</a></li>
</ul></li>
<li><p><a href="/docs/it/upgrade_milvus_cluster-helm.md">Aggiornare Milvus usando Helm Chart</a>.</p></li>
<li><p><a href="/docs/it/scaleout.md">Scalare il cluster Milvus</a>.</p></li>
<li><p>Distribuire il cluster Milvus su cloud:</p>
<ul>
<li><a href="/docs/it/eks.md">Amazon EKS</a></li>
<li><a href="/docs/it/gcp.md">Google Cloud</a></li>
<li><a href="/docs/it/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Esplorate <a href="/docs/it/milvus-webui.md">Milvus WebUI</a>, un'interfaccia web intuitiva per l'osservabilità e la gestione di Milvus.</p></li>
<li><p>Esplorate <a href="/docs/it/milvus_backup_overview.md">Milvus Backup</a>, uno strumento open-source per il backup dei dati Milvus.</p></li>
<li><p>Esplorate <a href="/docs/it/birdwatcher_overview.md">Birdwatcher</a>, uno strumento open-source per il debug di Milvus e gli aggiornamenti dinamici della configurazione.</p></li>
<li><p>Esplorate <a href="https://github.com/zilliztech/attu">Attu</a>, uno strumento open-source per la gestione intuitiva di Milvus.</p></li>
<li><p><a href="/docs/it/monitor.md">Monitorate Milvus con Prometheus</a>.</p></li>
</ul>
