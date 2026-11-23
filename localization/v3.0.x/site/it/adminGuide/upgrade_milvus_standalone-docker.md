---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Scopri come aggiornare Milvus in modalità standalone con Docker Compose.
title: Aggiornamento di Milvus Standalone con Docker Compose
---
<div class="tab-wrapper"><a href="/docs/it/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/it/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>, Helm, Docker<a href="/docs/it/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Aggiornamento di Milvus Standalone con Docker Compose<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida descrive come aggiornare una distribuzione standalone di Milvus 2.6.x alla versione v3.0.5 con Docker Compose.</p>
<div class="alert note">
<p>Questa procedura è stata verificata utilizzando la configurazione ufficiale di Docker Compose per Milvus 2.6.20 in modalità standalone, con una modifica limitata all’immagine. Il passaggio 2 aggiunge inoltre il servizio di gestione della proprietà della directory dei dati dalla configurazione Compose della versione v3.0.5, che non era stata inclusa nella verifica precedente.</p>
</div>
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
<li>Docker Engine e Docker Compose V2</li>
<li>Una distribuzione standalone esistente di Milvus 2.6.x gestita da Docker Compose</li>
<li>Il file Docker Compose e la configurazione utilizzati per l’implementazione esistente</li>
<li>Un backup aggiornato dei metadati e dei dati persistenti di Milvus</li>
</ul>
<p><strong>Limitazioni relative alla coda dei messaggi</strong>: durante l'aggiornamento a Milvus v3.0.5, è necessario mantenere la coda dei messaggi attualmente in uso. Il passaggio a sistemi di coda dei messaggi diversi durante l'aggiornamento non è supportato. Il supporto per la modifica dei sistemi di coda dei messaggi sarà disponibile nelle versioni future.</p>
<div class="alert warning">
<p>Non sostituire il file Compose attuale né modificare le versioni delle dipendenze nell’ambito di questa procedura. Mantieni l’etcd, l’object storage, la coda dei messaggi, i volumi e la configurazione esistenti. Aggiorna il tag dell’immagine di Milvus e aggiungi il servizio di proprietà della directory dei dati descritto nel Passaggio 2.</p>
<p>Se il file Compose utilizza <code translate="no">minio/minio:RELEASE.2024-12-18T13-15-44Z</code> e Docker non riesce a scaricare questa immagine, sostituirla con <code translate="no">milvusdb/minio:RELEASE.2024-12-18T13-15-44Z</code>, utilizzata dalla configurazione Compose della v3.0.5. Mantenere lo stesso tag di rilascio.</p>
<p>Questa procedura non convalida un downgrade o un rollback che riporti l’immagine di Milvus alla versione 2.6.x. Dopo che la versione v3.0.5 ha scritto i dati, un rollback che riguarda solo l’immagine potrebbe non riuscire a leggere lo stato aggiornato. Se l’aggiornamento fallisce, interrompere le operazioni di scrittura e utilizzare un piano di ripristino che ripristini i metadati precedenti all’aggiornamento e i backup dei dati persistenti. Verificare prima il piano di ripristino in un ambiente non di produzione.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Processo di aggiornamento<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Back-up-the-current-configuration" class="common-anchor-header">Passaggio 1: Eseguire il backup della configurazione corrente<button data-href="#Step-1-Back-up-the-current-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Salvare una copia del file Compose corrente e di eventuali file di configurazione Milvus montati:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cp</span> docker-compose.yml docker-compose-before-upgrade.yml
<button class="copy-code-btn"></button></code></pre>
<p>Verificare che i container attuali siano integri prima di avviare l’aggiornamento:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Update-the-Milvus-image" class="common-anchor-header">Passaggio 2: aggiornare l’immagine Milvus<button data-href="#Step-2-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>Nel file Compose esistente, aggiornare l’immagine del servizio <code translate="no">standalone</code>, sostituire le voci relative a <code translate="no">depends_on</code> con quelle riportate di seguito e aggiungere il servizio <code translate="no">milvus-volume-init</code>. Utilizzare la stessa immagine per entrambi i servizi e montare la stessa directory host che il servizio <code translate="no">standalone</code> monta in <code translate="no">/var/lib/milvus</code>. Mantenere le altre impostazioni del servizio <code translate="no">standalone</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">milvus-volume-init:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;0:0&quot;</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">none</span>
    <span class="hljs-attr">read_only:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">&quot;no&quot;</span>
    <span class="hljs-attr">entrypoint:</span> [<span class="hljs-string">&quot;/bin/sh&quot;</span>, <span class="hljs-string">&quot;-c&quot;</span>]
    <span class="hljs-attr">command:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">|
        set -eu
        uid=&quot;$$(id -u milvus)&quot;
        gid=&quot;$$(id -g milvus)&quot;
        marker=&quot;/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}&quot;
        if [ ! -e &quot;$${marker}&quot; ]; then
          echo &quot;Preparing /var/lib/milvus for $${uid}:$${gid}&quot;
          chown -R &quot;$${uid}:$${gid}&quot; /var/lib/milvus
          touch &quot;$${marker}&quot;
          chown &quot;$${uid}:$${gid}&quot; &quot;$${marker}&quot;
        fi
</span>    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>

  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-attr">milvus-volume-init:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_completed_successfully</span>
      <span class="hljs-attr">etcd:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
      <span class="hljs-attr">minio:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le immagini Milvus v3.0.5 eseguono Milvus come utente non root <code translate="no">milvus</code>, mentre le immagini Milvus 2.6.x non impostano un utente ed eseguono Milvus come <code translate="no">root</code>. Il servizio <code translate="no">milvus-volume-init</code> proviene dalla configurazione Compose v3.0.5. Viene eseguito una volta come <code translate="no">root</code> prima dell’avvio di Milvus e modifica il proprietario di <code translate="no">/var/lib/milvus</code> e dei suoi contenuti assegnandoli all’utente e al gruppo <code translate="no">milvus</code>, in modo che Milvus possa scrivere nei file creati dalla distribuzione 2.6.x. Successivamente scrive un file marcatore <code translate="no">.milvus-volume-owner-&lt;uid&gt;-&lt;gid&gt;</code> in <code translate="no">/var/lib/milvus</code> e non apporta modifiche nelle esecuzioni successive finché il file marcatore è presente. Se in seguito si ripristinano file di proprietà di un utente diverso nella directory dei dati, rimuovere il file di marcatura in modo che il servizio torni a funzionare.</p>
<p>Scaricare l’immagine di destinazione e ricreare il container Milvus. Poiché il servizio <code translate="no">standalone</code> dipende da <code translate="no">milvus-volume-init</code>, Docker Compose esegue <code translate="no">milvus-volume-init</code> fino al completamento prima di avviare il nuovo container Milvus:</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose mantiene in esecuzione i container etcd e object-storage esistenti e riutilizza le directory dei dati configurate. Se è stata modificata la configurazione di una dipendenza, ad esempio l’immagine MinIO, Compose ricrea quel container e mantiene i suoi volumi montati.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Verifica l’aggiornamento<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Controlla lo stato del container e l’immagine utilizzata dal container Milvus:</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p>Verifica che il servizio <code translate="no">standalone</code> sia funzionante, che la sua immagine sia <code translate="no">milvusdb/milvus:v3.0.5</code> e che le collezioni esistenti rimangano interrogabili e ricercabili. Completa questi controlli prima di abilitare qualsiasi funzionalità specifica della versione 3.0.5.</p>
<div class="alert note">
<p>L’aggiornamento a Milvus 3.0 non abilita Storage V3. Dopo aver verificato l’aggiornamento, esamina <a href="/docs/it/storage-v3.md">Storage V3</a> prima di abilitare le funzionalità che dipendono da esso. Una volta che Milvus ha scritto i dati in Storage V3, il downgrade a una versione precedente di Milvus che non è in grado di leggere Storage V3 non è supportato.</p>
</div>
