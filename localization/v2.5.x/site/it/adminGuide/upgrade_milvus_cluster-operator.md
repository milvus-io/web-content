---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Scoprite come aggiornare il cluster Milvus con Milvus Operator.
title: Aggiornamento del cluster Milvus con Milvus Operator
---
<div class="tab-wrapper"><a href="/docs/it/v2.5.x/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/it/v2.5.x/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Aggiornamento del cluster Milvus con Milvus Operator<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida descrive come aggiornare il cluster Milvus con Milvus operator.</p>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">Aggiornare l'operatore Milvus<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Eseguite il seguente comando per aggiornare la versione del vostro Milvus Operator alla v1.2.0.</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> zilliztech-milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update zilliztech-milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> zilliztech-milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una volta aggiornato l'operatore Milvus alla versione più recente, avete le seguenti possibilità:</p>
<ul>
<li>Per aggiornare Milvus dalla versione 2.2.3 o successive alla versione 2.5.13, è possibile <a href="#Conduct-a-rolling-upgrade">eseguire un aggiornamento continuo</a>.</li>
<li>Per aggiornare Milvus da una release minore precedente alla v2.2.3 alla 2.5.13, si consiglia di <a href="#Upgrade-Milvus-by-changing-its-image">aggiornare Milvus cambiando la versione dell'immagine</a>.</li>
<li>Per aggiornare Milvus dalla v2.1.x alla 2.5.13, è necessario <a href="#Migrate-the-metadata">migrare i metadati</a> prima dell'aggiornamento effettivo.</li>
</ul>
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">Eseguire un aggiornamento continuo<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>A partire da Milvus 2.2.3, è possibile configurare i coordinatori di Milvus per lavorare in modalità active-standby e abilitare la funzione di aggiornamento continuo per loro, in modo che Milvus possa rispondere alle richieste in arrivo durante gli aggiornamenti dei coordinatori. Nelle versioni precedenti, i coordinatori dovevano essere rimossi e poi creati durante un aggiornamento, il che poteva comportare alcuni tempi di inattività del servizio.</p>
<p>Basandosi sulle funzionalità di aggiornamento continuo fornite da Kubernetes, il gestore di Milvus impone un aggiornamento ordinato delle distribuzioni in base alle loro dipendenze. Inoltre, Milvus implementa un meccanismo per garantire che i suoi componenti rimangano compatibili con quelli che dipendono da loro durante l'aggiornamento, riducendo in modo significativo il potenziale downtime del servizio.</p>
<p>La funzione di aggiornamento continuo è disattivata per impostazione predefinita. È necessario abilitarla esplicitamente attraverso un file di configurazione.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">rollingUpgrade</span> <span class="hljs-comment"># Default value, can be omitted</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.13</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questo file di configurazione, impostare <code translate="no">spec.components.enableRollingUpdate</code> su <code translate="no">true</code> e <code translate="no">spec.components.image</code> sulla versione di Milvus desiderata.</p>
<p>Per impostazione predefinita, Milvus esegue l'aggiornamento continuo dei coordinatori in modo ordinato, sostituendo le immagini dei pod dei coordinatori una dopo l'altra. Per ridurre il tempo di aggiornamento, si può impostare <code translate="no">spec.components.imageUpdateMode</code> su <code translate="no">all</code>, in modo che Milvus sostituisca tutte le immagini dei pod nello stesso momento.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">all</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.13</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si può impostare <code translate="no">spec.components.imageUpdateMode</code> su <code translate="no">rollingDowngrade</code> per far sì che Milvus sostituisca le immagini dei pod coordinatori con una versione inferiore.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">rollingDowngrade</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:&lt;some-old-version&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Salvare quindi la configurazione in un file YAML (ad esempio, <code translate="no">milvusupgrade.yaml</code>) e applicare il file di configurazione alla propria istanza Milvus come segue:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Aggiornare Milvus cambiando la sua immagine<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>In casi normali, si può semplicemente aggiornare Milvus alla versione più recente cambiando la sua immagine. Tuttavia, si noti che l'aggiornamento di Milvus in questo modo comporta un certo tempo di inattività.</p>
<p>Comporre un file di configurazione come segue e salvarlo come <strong>milvusupgrade.yaml</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">components:</span>
   <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.13</span>
<button class="copy-code-btn"></button></code></pre>
<p>Eseguire quindi quanto segue per eseguire l'aggiornamento:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Migrare i metadati<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>A partire da Milvus 2.2.0, i metadati sono incompatibili con quelli delle versioni precedenti. I seguenti esempi presuppongono un aggiornamento da Milvus 2.1.4 a Milvus 2.5.13.</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1. Creare un file <code translate="no">.yaml</code> per la migrazione dei metadati</h3><p>Creare un file di migrazione dei metadati. Il seguente è un esempio. È necessario specificare i file <code translate="no">name</code>, <code translate="no">sourceVersion</code> e <code translate="no">targetVersion</code> nel file di configurazione. L'esempio seguente imposta <code translate="no">name</code> su <code translate="no">my-release-upgrade</code>, <code translate="no">sourceVersion</code> su <code translate="no">v2.1.4</code> e <code translate="no">targetVersion</code> su <code translate="no">v2.5.13</code>. Ciò significa che il cluster Milvus sarà aggiornato dalla v2.1.4 alla v2.5.13.</p>
<pre><code translate="no"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">MilvusUpgrade</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-upgrade</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">milvus:</span>
    <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">sourceVersion:</span> <span class="hljs-string">&quot;v2.1.4&quot;</span>
  <span class="hljs-attr">targetVersion:</span> <span class="hljs-string">&quot;v2.5.13&quot;</span>
  <span class="hljs-comment"># below are some omit default values:</span>
  <span class="hljs-comment"># targetImage: &quot;milvusdb/milvus:v2.5.13&quot;</span>
  <span class="hljs-comment"># toolImage: &quot;milvusdb/meta-migration:v2.2.0&quot;</span>
  <span class="hljs-comment"># operation: upgrade</span>
  <span class="hljs-comment"># rollbackIfFailed: true</span>
  <span class="hljs-comment"># backupPVC: &quot;&quot;</span>
  <span class="hljs-comment"># maxRetry: 3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2. Applicare la nuova configurazione</h3><p>Eseguite il seguente comando per creare la nuova configurazione.</p>
<pre><code translate="no">$ kubectl <span class="hljs-built_in">create</span> -f https://github.com/zilliztech/milvus-operator/blob/main/<span class="hljs-built_in">config</span>/samples/beta/milvusupgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3. Controllare lo stato della migrazione dei metadati</h3><p>Eseguire il seguente comando per verificare lo stato della migrazione dei metadati.</p>
<pre><code translate="no">kubectl <span class="hljs-keyword">describe</span> milvus <span class="hljs-keyword">release</span><span class="hljs-operator">-</span>name
<button class="copy-code-btn"></button></code></pre>
<p>Lo stato di <code translate="no">ready</code> nell'output significa che la migrazione dei metadati è riuscita.</p>
<p>In alternativa, è possibile eseguire <code translate="no">kubectl get pod</code> per controllare tutti i pod. Se tutti i pod sono <code translate="no">ready</code>, la migrazione dei metadati è riuscita.</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4. Eliminazione <code translate="no">my-release-upgrade</code></h3><p>Quando l'aggiornamento è riuscito, cancellare <code translate="no">my-release-upgrade</code> nel file YAML.</p>
