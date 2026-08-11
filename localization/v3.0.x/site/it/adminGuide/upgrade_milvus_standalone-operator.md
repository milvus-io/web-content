---
id: upgrade_milvus_standalone-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Scopri come aggiornare Milvus standalone con Milvus Operator.
title: Aggiornamento di Milvus Standalone con Milvus Operator
---
<div class="tab-wrapper"><a href="/docs/it/upgrade_milvus_standalone-operator.md" class='active '>Milvus</a><a href="/docs/it/upgrade_milvus_standalone-docker.md" class=''>Operator</a>, Helm, Docker<a href="/docs/it/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Milvus-Operator" class="common-anchor-header">Aggiornamento di Milvus Standalone con Milvus Operator<button data-href="#Upgrade-Milvus-Standalone-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida descrive come aggiornare una distribuzione standalone di Milvus 2.6.x alla versione v3.0-beta utilizzando Milvus Operator.</p>
<div class="alert note">
<p>Questa procedura è stata verificata dal passaggio da Milvus 2.6.20 a Milvus v3.0-beta con Milvus Operator 1.3.0, Woodpecker, etcd all'interno del cluster e MinIO all'interno del cluster. Se si utilizza un’altra versione patch di Milvus 2.6.x, una versione diversa di Operator, una coda di messaggi o una configurazione delle dipendenze diversa, verificare prima l’aggiornamento in un ambiente non di produzione.</p>
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
<li>Un cluster Kubernetes con una distribuzione standalone di Milvus 2.6.x gestita da Milvus Operator</li>
<li><code translate="no">kubectl</code> accesso al cluster</li>
<li>Il manifesto completo della risorsa personalizzata (CR) di Milvus utilizzato per la distribuzione esistente</li>
<li>Il metodo di installazione e i manifest utilizzati per l’attuale Milvus Operator</li>
<li>Un backup aggiornato dei metadati e dei dati persistenti di Milvus</li>
</ul>
<p><strong>Limiti della coda dei messaggi</strong>: durante l’aggiornamento a Milvus v3.0-beta, è necessario mantenere la coda dei messaggi attualmente in uso. Il passaggio a sistemi di code dei messaggi diversi durante l’aggiornamento non è supportato. Il supporto per la modifica dei sistemi di code dei messaggi sarà disponibile nelle versioni future.</p>
<div class="alert warning">
<p>Questa procedura non convalida un downgrade o un rollback che comporti il ripristino dell’immagine di Milvus alla versione 2.6.x. Dopo che la versione v3.0-beta ha scritto i dati, un rollback che riguarda solo l’immagine potrebbe non riuscire a leggere lo stato aggiornato. Se l’aggiornamento fallisce, interrompere le operazioni di scrittura e utilizzare un piano di ripristino che ripristini i backup dei metadati e dei dati persistenti precedenti all’aggiornamento. Verificare prima il piano di ripristino in un ambiente non di produzione.</p>
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
    </button></h2><h3 id="Step-1-Back-up-the-current-Milvus-CR" class="common-anchor-header">Passaggio 1: Eseguire il backup del CR Milvus corrente<button data-href="#Step-1-Back-up-the-current-Milvus-CR" class="anchor-icon" translate="no">
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
    </button></h3><p>Salvare il CR corrente prima di modificare la distribuzione:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output yaml &gt; milvus-before-upgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Utilizzare il manifesto di origine della distribuzione esistente come manifesto di aggiornamento. Non applicare direttamente il file di backup esportato senza aver prima rimosso i metadati gestiti dal server e i campi di stato.</p>
<h3 id="Step-2-Confirm-the-Milvus-Operator-version" class="common-anchor-header">Passaggio 2: Verifica della versione di Milvus Operator<button data-href="#Step-2-Confirm-the-Milvus-Operator-version" class="anchor-icon" translate="no">
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
    </button></h3><p>Verificare l'immagine utilizzata da Milvus Operator installato:</p>
<pre><code translate="no" class="language-bash">kubectl get deployments --all-namespaces \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.namespace}{&quot;\t&quot;}{.metadata.name}{&quot;\t&quot;}{range .spec.template.spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span> \
  | grep milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>L'aggiornamento convalidato ha mantenuto Milvus Operator alla versione 1.3.0. Mantenere la versione di Operator che attualmente gestisce la distribuzione di Milvus 2.6.x, a meno che la politica di supporto non richieda un aggiornamento separato di Operator. Non effettuare il downgrade di un Operator più recente alla versione testata. Se è necessario modificare la versione dell’Operator, utilizzare lo stesso metodo di installazione (Helm o <code translate="no">kubectl</code> ) e lo stesso nome di release e namespace dell’installazione esistente, quindi convalidare la modifica dell’Operator prima di aggiornare il CR di Milvus.</p>
<h3 id="Step-3-Update-the-Milvus-image" class="common-anchor-header">Passaggio 3: aggiornare l’immagine di Milvus<button data-href="#Step-3-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>Nel manifesto CR completo di Milvus, modificare solo <code translate="no">spec.components.image</code>. Mantenere la modalità esistente, le impostazioni dei componenti, la coda dei messaggi, etcd, lo storage e le altre impostazioni delle dipendenze. Il seguente estratto mostra il campo da modificare; non sostituire il CR completo con questo estratto.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">&lt;instance-name&gt;</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">&lt;namespace&gt;</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0-beta</span>
<button class="copy-code-btn"></button></code></pre>
<p>Applicare il manifesto CR completo:</p>
<pre><code translate="no" class="language-bash">kubectl apply --filename milvus.yaml
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Controllare lo stato del CR, lo stato dei pod e le immagini dei container:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output jsonpath=<span class="hljs-string">&#x27;{.status.status}{&quot;\t&quot;}{.status.currentImage}{&quot;\n&quot;}&#x27;</span>

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Verificare che il CR di Milvus riporti ` <code translate="no">Healthy</code>`, che l'immagine corrente sia ` <code translate="no">milvusdb/milvus:v3.0-beta</code>` e che le raccolte esistenti rimangano interrogabili e ricercabili. Completare questi controlli prima di abilitare qualsiasi funzionalità specifica della versione v3.0-beta.</p>
