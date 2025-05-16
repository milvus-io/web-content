---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Scoprite come aggiornare Milvus standalone con Helm Chart.
title: Aggiornamento di Milvus standalone con i grafici Helm
---
<div class="tab-wrapper"><a href="/docs/it/v2.4.x/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/it/v2.4.x/upgrade_milvus_standalone-helm.md" class='active '>OperatorHelmDocker</a><a href="/docs/it/v2.4.x/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">Aggiornamento di Milvus standalone con i grafici Helm<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida descrive come aggiornare Milvus standalone con i grafici di Milvus Helm.</p>
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
<li>Versione di Helm &gt;= 3.14.0</li>
<li>Versione di Kubernetes &gt;= 1.20.0</li>
</ul>
<div class="alert note">
<p>Dalla versione 4.2.21 del grafico Milvus-Helm, abbiamo introdotto il grafico pulsar-v3.x come dipendenza. Per la retrocompatibilità, aggiornare helm alla versione 3.14 o successiva e assicurarsi di aggiungere l'opzione <code translate="no">--reset-then-reuse-values</code> ogni volta che si utilizza <code translate="no">helm upgrade</code>.</p>
</div>
<h2 id="Check-the-Milvus-version" class="common-anchor-header">Controllare la versione di Milvus<button data-href="#Check-the-Milvus-version" class="anchor-icon" translate="no">
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
    </button></h2><p>Eseguire i seguenti comandi per verificare le nuove versioni di Milvus.</p>
<pre><code translate="no">$ helm repo update
$ helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Il repo di Milvus Helm Charts all'indirizzo <code translate="no">https://milvus-io.github.io/milvus-helm/</code> è stato archiviato ed è possibile ottenere ulteriori aggiornamenti da <code translate="no">https://zilliztech.github.io/milvus-helm/</code> come segue:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>Il repo archiviato è ancora disponibile per i grafici fino alla versione 4.0.31. Per le versioni successive, utilizzare invece il nuovo repo.</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>È possibile scegliere il percorso di aggiornamento per il proprio Milvus come segue:</p>
<div style="display: none;">- Eseguire un aggiornamento continuo](#conduct-a-rolling-upgrade) da Milvus v2.2.3 e versioni successive a v2.4.23.</div>
<ul>
<li><p><a href="#Upgrade-Milvus-using-Helm">Aggiornare Milvus utilizzando Helm</a> per un aggiornamento da una release minore precedente alla v2.2.3 alla v2.4.23.</p></li>
<li><p><a href="#Migrate-the-metadata">Migrare i metadati</a> prima dell'aggiornamento da Milvus v2.1.x a v2.4.23.</p></li>
</ul>
<div style="display:none;">
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
<p>L'aggiornamento continuo richiede che i coordinatori lavorino in modalità active-standby. È possibile utilizzare <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">lo script</a> fornito per configurare i coordinatori in modalità active-standby e avviare l'aggiornamento continuo.</p>
<p>Sulla base delle funzionalità di aggiornamento continuo fornite da Kubernetes, lo script di cui sopra impone un aggiornamento ordinato delle distribuzioni in base alle loro dipendenze. Inoltre, Milvus implementa un meccanismo per garantire che i suoi componenti rimangano compatibili con quelli che dipendono da loro durante l'aggiornamento, riducendo in modo significativo i potenziali tempi di inattività del servizio.</p>
<p>Lo script si applica solo all'aggiornamento di Milvus installato con Helm. La tabella seguente elenca i flag di comando disponibili negli script.</p>
<table>
<thead>
<tr><th>Parametri</th><th>Descrizione</th><th>Valore predefinito</th><th>Richiesto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Nome istanza Milvus</td><td><code translate="no">None</code></td><td>Vero</td></tr>
<tr><td><code translate="no">n</code></td><td>Namespace in cui è installato Milvus</td><td><code translate="no">default</code></td><td>Falso</td></tr>
<tr><td><code translate="no">t</code></td><td>Versione Milvus di destinazione</td><td><code translate="no">None</code></td><td>Vero</td></tr>
<tr><td><code translate="no">w</code></td><td>Nuovo tag immagine di Milvus</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>Vero</td></tr>
<tr><td><code translate="no">o</code></td><td>Operazione</td><td><code translate="no">update</code></td><td>Falso</td></tr>
</tbody>
</table>
<p>Dopo essersi assicurati che tutte le installazioni nella vostra istanza Milvus siano nello stato normale. È possibile eseguire il seguente comando per aggiornare l'istanza Milvus alla versione 2.4.23.</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.<span class="hljs-property">sh</span> -n <span class="hljs-keyword">default</span> -i my-release -o update -t <span class="hljs-number">2.4</span><span class="hljs-number">.23</span> -w <span class="hljs-string">&#x27;milvusdb/milvus:v2.4.23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>Lo script <strong>non si applica</strong> all'istanza Milvus installata con <strong>RocksMQ</strong>.</li>
<li>Lo script codifica l'ordine di aggiornamento delle distribuzioni e non può essere modificato.</li>
<li>Lo script utilizza <code translate="no">kubectl patch</code> per aggiornare le distribuzioni e <code translate="no">kubectl rollout status</code> per controllare il loro stato.</li>
<li>Lo script usa <code translate="no">kubectl patch</code> per aggiornare l'etichetta <code translate="no">app.kubernetes.io/version</code> dei deployment a quella specificata dopo il flag <code translate="no">-t</code> nel comando.</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">Aggiornare Milvus con Helm<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Per aggiornare Milvus da una versione minore precedente alla v2.2.3 alla più recente, eseguire i seguenti comandi:</p>
<pre><code translate="no" class="language-shell">helm repo update
helm upgrade my-release milvus/milvus --reset-then-reuse-values --version=<span class="hljs-number">4.1</span><span class="hljs-number">.24</span> <span class="hljs-comment"># use the helm chart version here</span>
<button class="copy-code-btn"></button></code></pre>
<p>Utilizzare la versione del grafico Helm nel comando precedente. Per i dettagli su come ottenere la versione del grafico di Helm, fare riferimento a <a href="#Check-the-Milvus-version">Controllare la versione di Milvus</a>.</p>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Migrazione dei metadati<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>A partire da Milvus 2.2.0, i metadati sono incompatibili con quelli delle versioni precedenti. Gli esempi seguenti presuppongono un aggiornamento da Milvus 2.1.4 a Milvus 2.2.0.</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1. Controllare la versione di Milvus</h3><p>Eseguire <code translate="no">$ helm list</code> per verificare la versione dell'applicazione Milvus. Si può notare che <code translate="no">APP VERSION</code> è la 2.1.4.</p>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>                <span class="hljs-variable constant_">NAMESPACE</span>   <span class="hljs-variable constant_">REVISION</span>    <span class="hljs-variable constant_">UPDATED</span>                                 <span class="hljs-variable constant_">STATUS</span>      <span class="hljs-variable constant_">CHART</span>           <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>     
my-release          <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span>-<span class="hljs-number">11</span>-<span class="hljs-number">21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>     deployed    milvus-<span class="hljs-number">3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2. Controllare i pod in esecuzione</h3><p>Eseguire <code translate="no">$ kubectl get pods</code> per controllare i pod in esecuzione. Si può vedere il seguente output.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          84s
my-release-milvus-standalone-75c599fffc-6rwlj   1/1     Running   0          84s
my-release-minio-744dd9586f-qngzv               1/1     Running   0          84s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3. Controllare il tag immagine</h3><p>Controllare il tag image per il pod <code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code>. Si può notare che la release del cluster Milvus è la v2.1.4.</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<span class="hljs-meta"># milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4. Migrare i metadati</h3><p>Un cambiamento importante in Milvus 2.2 è la struttura dei metadati degli indici dei segmenti. Pertanto, è necessario utilizzare Helm per migrare i metadati durante l'aggiornamento di Milvus dalla v2.1.x alla v2.2.0. Ecco <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">uno script</a> per migrare i metadati in modo sicuro.</p>
<p>Questo script si applica solo a Milvus installato su un cluster K8s. Se si verifica un errore durante il processo, tornare alla versione precedente con l'operazione di rollback.</p>
<p>La tabella seguente elenca le operazioni che si possono fare per la migrazione dei metadati.</p>
<table>
<thead>
<tr><th>Parametri</th><th>Descrizione</th><th>Valore predefinito</th><th>Richiesto</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Il nome dell'istanza Milvus.</td><td><code translate="no">None</code></td><td>Vero</td></tr>
<tr><td><code translate="no">n</code></td><td>Lo spazio dei nomi in cui è installato Milvus.</td><td><code translate="no">default</code></td><td>Falso</td></tr>
<tr><td><code translate="no">s</code></td><td>La versione di Milvus di origine.</td><td><code translate="no">None</code></td><td>Vero</td></tr>
<tr><td><code translate="no">t</code></td><td>La versione di Milvus di destinazione.</td><td><code translate="no">None</code></td><td>Vero</td></tr>
<tr><td><code translate="no">r</code></td><td>Il percorso principale di Milvus meta.</td><td><code translate="no">by-dev</code></td><td>Falso</td></tr>
<tr><td><code translate="no">w</code></td><td>Il nuovo tag immagine di Milvus.</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>Falso</td></tr>
<tr><td><code translate="no">m</code></td><td>Il tag immagine della migrazione meta.</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>Falso</td></tr>
<tr><td><code translate="no">o</code></td><td>L'operazione di metamigrazione.</td><td><code translate="no">migrate</code></td><td>Falso</td></tr>
<tr><td><code translate="no">d</code></td><td>Se eliminare il pod di migrazione al termine della migrazione.</td><td><code translate="no">false</code></td><td>Falso</td></tr>
<tr><td><code translate="no">c</code></td><td>La classe di archiviazione per il pvc di metamigrazione.</td><td><code translate="no">default storage class</code></td><td>Falso</td></tr>
<tr><td><code translate="no">e</code></td><td>L'enpoint etcd usato da milvus.</td><td><code translate="no">etcd svc installed with milvus</code></td><td>Falso</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1. Migrare i metadati</h4><ol>
<li>Scaricare lo <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">script di migrazione</a>.</li>
<li>Arrestare i componenti di Milvus. Qualsiasi sessione live nell'eccd di Milvus può causare un fallimento della migrazione.</li>
<li>Creare un backup dei metadati Milvus.</li>
<li>Migrare i metadati di Milvus.</li>
<li>Avviare i componenti Milvus con una nuova immagine.</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-2423" class="common-anchor-header">2. Aggiornamento di Milvus dalla v2.1.x alla 2.4.23</h4><p>I comandi seguenti presuppongono l'aggiornamento di Milvus dalla v2.1.4 alla 2.4.23. Modificateli in base alle vostre esigenze.</p>
<ol>
<li><p>Specificare il nome dell'istanza Milvus, la versione Milvus di origine e la versione Milvus di destinazione.</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Specificate lo spazio dei nomi con <code translate="no">-n</code> se Milvus non è installato nello spazio dei nomi predefinito di K8s.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Specificare il percorso della radice con <code translate="no">-r</code> se Milvus è installato con il percorso personalizzato <code translate="no">rootpath</code>.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Specificate il tag dell'immagine con <code translate="no">-w</code> se il vostro Milvus è installato con un <code translate="no">image</code> personalizzato.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -w milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Impostare <code translate="no">-d true</code> se si desidera rimuovere automaticamente il pod di migrazione al termine della migrazione.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -w milvusdb/milvus:v2.4.23 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Se la migrazione non va a buon fine, si può tornare indietro e migrare di nuovo.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -o rollback -w milvusdb/milvus:v2.1.1
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -o migrate -w milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
</ol>
