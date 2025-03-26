---
id: hpa.md
related_key: scale Milvus cluster with HPA
summary: >-
  Scoprite come configurare l'Horizontal Pod Autoscaling (HPA) per scalare
  dinamicamente un cluster Milvus.
title: Configurare l'autoscaling orizzontale dei pod (HPA) per Milvus
---
<h1 id="Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="common-anchor-header">Configurare l'autoscaling orizzontale dei pod (HPA) per Milvus<button data-href="#Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Horizontal Pod Autoscaling (HPA) è una funzionalità di Kubernetes che regola automaticamente il numero di Pod in una distribuzione in base all'utilizzo delle risorse, come CPU o memoria. In Milvus, HPA può essere applicato a componenti stateless come <code translate="no">proxy</code>, <code translate="no">queryNode</code>, <code translate="no">dataNode</code> e <code translate="no">indexNode</code> per scalare dinamicamente il cluster in risposta alle variazioni del carico di lavoro.</p>
<p>Questa guida spiega come configurare HPA per i componenti Milvus utilizzando Milvus Operator.</p>
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
<li>Un cluster Milvus funzionante distribuito con Milvus Operator.</li>
<li>Accesso a <code translate="no">kubectl</code> per la gestione delle risorse Kubernetes.</li>
<li>Conoscenza dell'architettura Milvus e di Kubernetes HPA.</li>
</ul>
<h2 id="Configure-HPA-with-Milvus-Operator" class="common-anchor-header">Configurazione di HPA con Milvus Operator<button data-href="#Configure-HPA-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Per abilitare HPA in un cluster Milvus gestito da Milvus Operator, seguite i seguenti passaggi:</p>
<ol>
<li><p><strong>Impostare le repliche su -1</strong>:</p>
<p>Nella risorsa personalizzata (CR) di Milvus, impostare il campo <code translate="no">replicas</code> su <code translate="no">-1</code> per il componente che si desidera scalare con HPA. In questo modo si delega il controllo della scala a HPA invece che all'operatore. È possibile modificare direttamente il CR o utilizzare il seguente comando <code translate="no">kubectl patch</code> per passare rapidamente al controllo HPA:</p>
<pre><code translate="no" class="language-bash">kubectl patch milvus &lt;your-release-name&gt; --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;json&#x27;</span> -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;replace&quot;, &quot;path&quot;: &quot;/spec/components/proxy/replicas&quot;, &quot;value&quot;: -1}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sostituite <code translate="no">&lt;your-release-name&gt;</code> con il nome del vostro cluster Milvus.</p>
<p>Per verificare che la modifica sia stata applicata, eseguire il comando:</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> milvus &lt;your-release-name&gt; -o jsonpath=<span class="hljs-string">&#x27;{.spec.components.proxy.replicas}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>L'output atteso dovrebbe essere <code translate="no">-1</code>, a conferma che il componente <code translate="no">proxy</code> è ora sotto il controllo di HPA.</p>
<p>In alternativa, è possibile definirlo nel CR YAML:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: &lt;your-release-name&gt;
spec:
  mode: cluster
  components:
    proxy:
      replicas: -1
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Definire una risorsa HPA</strong>:</p>
<p>Creare una risorsa HPA per indirizzare la distribuzione del componente desiderato. Di seguito è riportato un esempio per il componente <code translate="no">proxy</code>:</p>
<pre><code translate="no" class="language-yaml">apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-release-milvus-proxy-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-release-milvus-proxy
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - <span class="hljs-built_in">type</span>: Resource
      resource:
        name: cpu
        target:
          <span class="hljs-built_in">type</span>: Utilization
          averageUtilization: 60
    - <span class="hljs-built_in">type</span>: Resource
      resource:
        name: memory
        target:
          <span class="hljs-built_in">type</span>: Utilization
          averageUtilization: 60
  behavior:
    scaleUp:
      policies:
        - <span class="hljs-built_in">type</span>: Pods
          value: 1
          periodSeconds: 30
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - <span class="hljs-built_in">type</span>: Pods
          value: 1
          periodSeconds: 60
<button class="copy-code-btn"></button></code></pre>
<p>Sostituire <code translate="no">my-release</code> in <code translate="no">metadata.name</code> e <code translate="no">spec.scaleTargetRef.name</code> con il nome effettivo del cluster Milvus (ad esempio, <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> e <code translate="no">&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
<li><p><strong>Applicare la configurazione HPA</strong>:</p>
<p>Distribuire la risorsa HPA usando il seguente comando:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f hpa.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Per verificare che l'HPA sia stato creato correttamente, eseguire:</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> hpa
<button class="copy-code-btn"></button></code></pre>
<p>Si dovrebbe vedere un output simile a:</p>
<pre><code translate="no">NAME                          REFERENCE                            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
my-release-milvus-proxy-hpa   Deployment/my-release-milvus-proxy   &lt;some&gt;/60%      2         10        2          &lt;time&gt;
<button class="copy-code-btn"></button></code></pre>
<p>I campi <code translate="no">NAME</code> e <code translate="no">REFERENCE</code> rifletteranno il nome del cluster (ad esempio, <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> e <code translate="no">Deployment/&lt;your-release-name&gt;-milvus-proxy</code>).</p></li>
</ol>
<ul>
<li><code translate="no">scaleTargetRef</code>: Specifica l'installazione da scalare (ad esempio, <code translate="no">my-release-milvus-proxy</code>).</li>
<li><code translate="no">minReplicas</code> e <code translate="no">maxReplicas</code>: Imposta l'intervallo di scalatura (da 2 a 10 Pod in questo esempio).</li>
<li><code translate="no">metrics</code>: Configura il ridimensionamento in base all'utilizzo della CPU e della memoria, mirando a un utilizzo medio del 60%.</li>
</ul>
<h2 id="Conclusion" class="common-anchor-header">Conclusione<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>HPA consente a Milvus di adattarsi in modo efficiente a carichi di lavoro variabili. Utilizzando il comando <code translate="no">kubectl patch</code>, è possibile passare rapidamente un componente al controllo HPA senza modificare manualmente l'intero CR. Per maggiori dettagli, consultare la <a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">documentazione</a> di <a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">Kubernetes HPA</a>.</p>
