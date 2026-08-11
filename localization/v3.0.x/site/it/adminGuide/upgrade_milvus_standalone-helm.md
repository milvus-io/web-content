---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Scopri come aggiornare Milvus in modalità standalone con Helm Chart.
title: Aggiornamento di Milvus Standalone con Helm Chart
---
<div class="tab-wrapper"><a href="/docs/it/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/it/upgrade_milvus_standalone-docker.md" class=''>Operator</a>, Helm, Docker<a href="/docs/it/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">Aggiornamento di Milvus Standalone con Helm Chart<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida descrive come aggiornare la distribuzione standalone di Milvus 2.6.x alla versione v3.0-beta utilizzando Helm.</p>
<div class="alert note">
<p>Questa procedura è stata verificata dal Milvus 2.6.20 al Milvus v3.0-beta con il chart Helm di Milvus 5.0.22. Se si utilizza un'altra versione patch di Milvus 2.6.x o una versione diversa del chart Helm, verificare prima l'aggiornamento in un ambiente non di produzione.</p>
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
<li>Helm 3.14.0 o versioni successive</li>
<li>Una distribuzione Milvus 2.6.x esistente gestita da Helm</li>
<li>I valori Helm utilizzati per l’implementazione esistente</li>
<li>Un backup aggiornato dei metadati e dei dati persistenti di Milvus</li>
</ul>
<p><strong>Limitazioni relative alla coda dei messaggi</strong>: durante l'aggiornamento a Milvus v3.0-beta, è necessario mantenere la coda dei messaggi attualmente in uso. Il passaggio da un sistema di coda dei messaggi a un altro durante l'aggiornamento non è supportato. Il supporto per la modifica dei sistemi di coda dei messaggi sarà disponibile nelle versioni future.</p>
<div class="alert warning">
<p>Non modificare né eseguire il downgrade dell’Helm Chart nell’ambito di questa procedura. Mantieni la versione del Chart già installata per la tua release di Helm. La baseline testata ha mantenuto l’Helm Chart 5.0.22 e ha modificato solo il tag dell’immagine di Milvus in <code translate="no">v3.0-beta</code>.</p>
<p>Questa procedura non convalida un downgrade o un rollback che comporti il ripristino dell’immagine Milvus alla versione 2.6.x. Dopo che la v3.0-beta ha scritto i dati, un rollback che riguarda solo l’immagine potrebbe non riuscire a leggere lo stato aggiornato. Se l’aggiornamento fallisce, interrompere le operazioni di scrittura e utilizzare un piano di ripristino che ripristini i metadati precedenti all’aggiornamento e i backup dei dati persistenti. Verificare prima il piano di ripristino in un ambiente non di produzione.</p>
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
    </button></h2><h3 id="Step-1-Update-the-Helm-repository" class="common-anchor-header">Passaggio 1: aggiornare il repository Helm<button data-href="#Step-1-Update-the-Helm-repository" class="anchor-icon" translate="no">
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
    </button></h3><p>Aggiungere o aggiornare il repository Helm di Milvus:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm --force-update
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Il repository Helm Charts di Milvus all’indirizzo <code translate="no">https://milvus-io.github.io/milvus-helm/</code> è stato archiviato. Utilizzare il nuovo repository <code translate="no">https://zilliztech.github.io/milvus-helm/</code> per le versioni 4.0.31 e successive dei chart.
</div>
<h3 id="Step-2-Upgrade-Milvus" class="common-anchor-header">Passaggio 2: Aggiornamento di Milvus<button data-href="#Step-2-Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Verificare la versione del chart installata per la propria release Helm:</p>
<pre><code translate="no" class="language-bash">helm list --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Nella colonna <code translate="no">CHART</code>, rimuovere il prefisso <code translate="no">milvus-</code> dal valore e utilizzare la versione rimanente come <code translate="no">&lt;current-chart-version&gt;</code>. Quindi eseguire il comando di aggiornamento:</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;release-name&gt; zilliztech/milvus \
  --namespace &lt;namespace&gt; \
  --version &lt;current-chart-version&gt; \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v3.0-beta&quot;</span> \
  --reset-then-reuse-values \
  --<span class="hljs-built_in">wait</span> \
  --<span class="hljs-built_in">timeout</span> 20m
<button class="copy-code-btn"></button></code></pre>
<p>L’opzione ` <code translate="no">--reset-then-reuse-values</code> ` mantiene i valori della release precedente, applicando al contempo la sostituzione esplicita dell’immagine rispetto alle impostazioni predefinite del Chart selezionato.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Verifica dell’aggiornamento<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Controllare la revisione di Helm, lo stato dei pod e le immagini dei container:</p>
<pre><code translate="no" class="language-bash">helm <span class="hljs-built_in">history</span> &lt;release-name&gt; --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Verifica che tutti i carichi di lavoro richiesti siano pronti, che Milvus utilizzi <code translate="no">v3.0-beta</code> e che le tue raccolte esistenti rimangano interrogabili e ricercabili. Completa questi controlli prima di abilitare qualsiasi funzionalità specifica della versione v3.0-beta.</p>
<div class="alert note">
<p>L'aggiornamento a Milvus 3.0 non abilita Storage V3. Dopo aver verificato l'aggiornamento, esamina <a href="/docs/it/storage-v3.md">Storage V3</a> prima di abilitare le funzionalità che dipendono da esso. Una volta che Milvus scrive i dati su Storage V3, il downgrade a una versione precedente di Milvus che non è in grado di leggere Storage V3 non è supportato.</p>
</div>
