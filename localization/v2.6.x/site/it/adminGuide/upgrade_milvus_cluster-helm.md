---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Scoprite come aggiornare il cluster Milvus con Helm Chart.
title: Aggiornamento del cluster Milvus con Helm Chart
---
<div class="tab-wrapper"><a href="/docs/it/upgrade_milvus_cluster-operator.md" class=''>Milvus</a><a href="/docs/it/upgrade_milvus_cluster-helm.md" class='active '>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">Aggiornamento del cluster Milvus con Helm Chart<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida descrive come aggiornare il cluster Milvus dalla v2.5.x alla v2.6.11 utilizzando Helm Chart.</p>
<h2 id="Before-you-start" class="common-anchor-header">Prima di iniziare<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-new-in-v2611" class="common-anchor-header">Cosa c'è di nuovo nella v2.6.11<button data-href="#Whats-new-in-v2611" class="anchor-icon" translate="no">
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
    </button></h3><p>L'aggiornamento da Milvus 2.5.x a 2.6.11 comporta cambiamenti architetturali significativi:</p>
<ul>
<li><strong>Consolidamento dei coordinatori</strong>: I coordinatori separati legacy (<code translate="no">dataCoord</code>, <code translate="no">queryCoord</code>, <code translate="no">indexCoord</code>) sono stati consolidati in un unico coordinatore. <code translate="no">mixCoord</code></li>
<li><strong>Nuovi componenti</strong>: Introduzione di Streaming Node per una migliore elaborazione dei dati.</li>
<li><strong>Rimozione di componenti</strong>: <code translate="no">indexNode</code> è stato rimosso e consolidato</li>
</ul>
<p>Questo processo di aggiornamento garantisce una corretta migrazione alla nuova architettura. Per ulteriori informazioni sulle modifiche all'architettura, consultare la <a href="/docs/it/architecture_overview.md">Panoramica dell'architettura Milvus</a>.</p>
<h3 id="Requirements" class="common-anchor-header">Requisiti<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Requisiti di sistema:</strong></p>
<ul>
<li>Versione di Helm &gt;= 3.14.0</li>
<li>Versione di Kubernetes &gt;= 1.20.0</li>
<li>Cluster Milvus distribuito tramite Helm Chart</li>
</ul>
<p><strong>Requisiti di compatibilità:</strong></p>
<ul>
<li>Milvus v2.6.0-rc1 <strong>non è compatibile</strong> con la v2.6.11. Gli aggiornamenti diretti dalle release candidate non sono supportati.</li>
<li>Se attualmente si sta eseguendo la v2.6.0-rc1 e si desidera preservare i propri dati, si prega di fare riferimento a <a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">questa guida della comunità</a> per l'assistenza alla migrazione.</li>
<li>Prima di eseguire l'aggiornamento alla versione 2.5.16 o successiva con <code translate="no">mixCoordinator</code> abilitato, <strong>è necessario eseguire l</strong> 'aggiornamento alla versione 2.6.11.</li>
</ul>
<p><strong>Limitazioni della coda di messaggi</strong>: Quando si esegue l'aggiornamento a Milvus v2.6.11, è necessario mantenere l'attuale scelta della coda di messaggi. Il passaggio da un sistema di code di messaggi all'altro durante l'aggiornamento non è supportato. Il supporto per il cambio di sistemi di code di messaggi sarà disponibile nelle versioni future.</p>
<div class="alert note">
Dalla versione 4.2.21 di Milvus Helm chart, è stata introdotta la dipendenza da pulsar-v3.x chart. Per la retrocompatibilità, aggiornare Helm alla versione 3.14 o successiva e assicurarsi di aggiungere l'opzione <code translate="no">--reset-then-reuse-values</code> ogni volta che si utilizza <code translate="no">helm upgrade</code>.</div>
<h2 id="Upgrade-process" class="common-anchor-header">Procedura di aggiornamento<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Upgrade-Helm-Chart" class="common-anchor-header">Passo 1: aggiornamento del grafico Helm<button data-href="#Step-1-Upgrade-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h3><p>Per prima cosa, aggiornate il vostro grafico Milvus Helm alla versione 5.0.0:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Il repo di Milvus Helm Charts <code translate="no">https://milvus-io.github.io/milvus-helm/</code> è stato archiviato. Utilizzare il nuovo repo <code translate="no">https://zilliztech.github.io/milvus-helm/</code> per le versioni del grafico 4.0.31 e successive.</div>
<p>Per verificare la compatibilità della versione dei grafici Helm con le versioni di Milvus:</p>
<pre><code translate="no" class="language-bash">helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<p>Questa guida presuppone l'installazione dell'ultima versione. Se è necessario installare una versione specifica, specificare il parametro <code translate="no">--version</code> di conseguenza.</p>
<h3 id="Step-2-Upgrade-to-v2516-with-mixCoordinator" class="common-anchor-header">Passo 2: Aggiornamento alla versione 2.5.16 con mixCoordinator<button data-href="#Step-2-Upgrade-to-v2516-with-mixCoordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>Verificare se il cluster utilizza attualmente coordinatori separati:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>Se si vedono pod coordinatori separati (<code translate="no">datacoord</code>, <code translate="no">querycoord</code>, <code translate="no">indexcoord</code>), aggiornare alla v2.5.16 e abilitare <code translate="no">mixCoordinator</code>:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.5.16&quot;</span> \
  --<span class="hljs-built_in">set</span> mixCoordinator.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> rootCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> indexCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> queryCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> dataCoordinator.enabled=<span class="hljs-literal">false</span> \
  --reset-then-reuse-values \
  --version=4.2.58
<button class="copy-code-btn"></button></code></pre>
<div class="alert-note">
<p>Se il cluster utilizza già <code translate="no">mixCoordinator</code>, aggiornare semplicemente l'immagine:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.5.16&quot;</span> \
  --reset-then-reuse-values \
  --version=4.2.58
<button class="copy-code-btn"></button></code></pre>
</div>
<p>Attendere il completamento dell'aggiornamento:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Verify all pods are ready</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Upgrade-to-v2611" class="common-anchor-header">Passo 3: Aggiornamento alla v2.6.11<button data-href="#Step-3-Upgrade-to-v2611" class="anchor-icon" translate="no">
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
    </button></h3><p>Una volta che la v2.5.16 funziona con successo con <code translate="no">mixCoordinator</code>, aggiornare alla v2.6.11:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.6.11&quot;</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span> \
  --reset-then-reuse-values \
  --version=5.0.0
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Verifica dell'aggiornamento<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Verificare che il cluster stia eseguendo la nuova versione:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check pod status</span>
kubectl get pods

<span class="hljs-comment"># Verify Helm release</span>
helm list
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriore supporto, consultare la <a href="https://milvus.io/docs">documentazione Milvus</a> o il <a href="https://github.com/milvus-io/milvus/discussions">forum della comunità</a>.</p>
