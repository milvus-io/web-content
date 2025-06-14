---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  Milvus consiglia di aggiornare Pulsar alla versione v3 per Milvus v2.5.x.
  Tuttavia, se si preferisce utilizzare Pulsar v2, questo articolo vi guiderà
  attraverso i passaggi per continuare a utilizzare Pulsar v2 con Milvus v2.5.x.
title: Utilizzare Pulsar v2 con Milvus v2.5.x
---

<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">Utilizzare Pulsar v2 con Milvus v2.5.x<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus consiglia di aggiornare Pulsar alla versione v3 per l'esecuzione di Milvus v2.5.x. Per ulteriori informazioni, consultare <a href="/docs/it/v2.5.x/upgrade-pulsar-v3.md">Aggiornamento di Pulsar</a>. Tuttavia, se preferite utilizzare Pulsar v2 con Milvus v2.5.x, questo articolo vi guiderà attraverso la procedura per l'esecuzione di Milvus v2.5.x con Pulsar v2.</p>
<p>Se avete già un'istanza Milvus in esecuzione e volete aggiornarla alla v2.5.x ma continuare a usare Pulsar v2, potete seguire i passaggi di questa pagina.</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">Continuare a usare Pulsar v2 mentre si aggiorna Milvus v2.5.x<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione vi guiderà attraverso i passaggi per continuare a usare Pulsar v2 mentre aggiornate la vostra istanza Milvus in esecuzione a Milvus v2.5.x.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Per gli utenti di Milvus Operator</h3><p>Milvus Operator è compatibile con gli aggiornamenti di Pulsar v2 per impostazione predefinita. È possibile aggiornare l'istanza Milvus alla v2.5.x facendo riferimento a <a href="/docs/it/v2.5.x/upgrade_milvus_cluster-operator.md">Aggiornamento del cluster Milvus con Milvus Operator</a>.</p>
<p>Una volta completato l'aggiornamento, è possibile continuare a utilizzare Pulsar v2 con la propria istanza Milvus.</p>
<h3 id="For-Helm-users" class="common-anchor-header">Per gli utenti di Helm</h3><p>Prima dell'aggiornamento, assicurarsi che</p>
<ul>
<li><p>La versione di Helm sia superiore alla v3.12; si consiglia la versione più recente.</p>
<p>Per ulteriori informazioni, fare riferimento a <a href="https://helm.sh/docs/intro/install/">Installare Helm</a>.</p></li>
<li><p>La versione di Kubernetes sia superiore alla v1.20.</p></li>
</ul>
<p>Le operazioni descritte in questo articolo presuppongono che:</p>
<ul>
<li><p>Milvus sia stato installato nello spazio dei nomi <code translate="no">default</code>.</p></li>
<li><p>Il nome della release di Milvus è <code translate="no">my-release</code>.</p></li>
</ul>
<p>È necessario modificare il file <code translate="no">values.yaml</code> per specificare la versione di Pulsar come v2 prima di aggiornare Milvus. La procedura è la seguente:</p>
<ol>
<li><p>Ottenere il file <code translate="no">values.yaml</code> corrente dell'istanza di Milvus.</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Modificare il file <code translate="no">values.yaml</code> per specificare la versione di Pulsar come v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># ... omit existing values</span>
pulsar:
  enabled: <span class="hljs-literal">true</span>
pulsarv3:
  enabled: <span class="hljs-literal">false</span>
image:
  all:
    repository: milvusdb/milvus
    tag: v2.5.0-beta 
<button class="copy-code-btn"></button></code></pre>
<p>Per <code translate="no">image</code>, cambiare <code translate="no">tag</code> con la versione di Milvus desiderata (ad esempio <code translate="no">v2.5.0-beta</code>).</p></li>
<li><p>Aggiornare il grafico di Milvus Helm.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm</span>
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Aggiornare l'istanza Milvus.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">Creazione di una nuova istanza Milvus con Pulsar v2<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione vi guiderà attraverso le fasi di creazione di una nuova istanza Milvus con Pulsar v2.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Per gli utenti di Milvus Operator</h3><p>Prima di distribuire Milvus v2.5.x, è necessario scaricare e modificare il file Milvus Customer Resource Definition (CRD). Per i dettagli su come installare Milvus usando Milvus Operator, fate riferimento a <a href="/docs/it/v2.5.x/install_cluster-milvusoperator.md">Installare Milvus Cluster con Milvus Operator</a>.</p>
<ol>
<li><p>Scaricare il file CRD.</p>
<pre><code translate="no" class="language-bash">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Modificare il file <code translate="no">milvus_cluster_default.yaml</code> per specificare la versione di Pulsar come v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: milvus.<span class="hljs-property">io</span>/v1beta1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Milvus</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
  <span class="hljs-attr">labels</span>:
    <span class="hljs-attr">app</span>: milvus
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">mode</span>: cluster
  <span class="hljs-attr">dependencies</span>:
    <span class="hljs-attr">pulsar</span>:
      <span class="hljs-attr">inCluster</span>:
        <span class="hljs-attr">chartVersion</span>: pulsar-v2
<button class="copy-code-btn"></button></code></pre>
<p>Per <code translate="no">dependencies</code>, cambiare <code translate="no">pulsar.inCluster.chartVersion</code> in <code translate="no">pulsar-v2</code>.</p></li>
<li><p>Continuare con i passaggi di <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Installare Milvus Cluster con Milvus Operator</a> per distribuire Milvus v2.5.x con Pulsar v2 utilizzando il file CRD modificato.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">Per gli utenti di Helm</h3><p>Prima di distribuire Milvus v2.5.x, è possibile preparare un file <code translate="no">values.yaml</code> o utilizzare i parametri in linea per specificare la versione di Pulsar. Per i dettagli su come installare Milvus usando Helm, fate riferimento a <a href="/docs/it/v2.5.x/install_cluster-helm.md">Installare Milvus Cluster con Helm</a>.</p>
<ul>
<li><p>Usare i parametri inline per specificare la versione di Pulsar come v2.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Usare un file <code translate="no">values.yaml</code> per specificare la versione di Pulsar come v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quindi, distribuire Milvus v2.5.x con Pulsar v2 usando il file <code translate="no">values.yaml</code>.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
