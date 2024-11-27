---
id: gcs.md
title: Configurar o acesso ao GCS por identidade de carga de trabalho
related_key: 'gcs, storage, workload identity, iam'
summary: Saiba como configurar o gcs com o Workload Identity.
---
<h1 id="Configure-GCS-Access-by-Workload-Identity" class="common-anchor-header">Configurar o acesso ao GCS por identidade de carga de trabalho<button data-href="#Configure-GCS-Access-by-Workload-Identity" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico apresenta como configurar o acesso ao gcs pela Identidade de carga de trabalho quando você instala o Milvus com o helm. Para obter mais detalhes, consulte <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Identidade de carga de trabalho</a>.</p>
<h2 id="Before-you-start" class="common-anchor-header">Antes de começar<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Ative o Workload Identity em clusters e pools de nós usando a CLI do Google Cloud ou o console do Google Cloud. O Workload Identity deve ser ativado no nível do cluster antes que você possa ativar o Workload Identity nos pools de nós.</p>
<h2 id="Configure-applications-to-use-Workload-Identity" class="common-anchor-header">Configurar aplicativos para usar o Workload Identity<button data-href="#Configure-applications-to-use-Workload-Identity" class="anchor-icon" translate="no">
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
<li>Criar bucket.</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud storage buckets create <span class="hljs-attr">gs</span>:<span class="hljs-comment">//milvus-testing-nonprod --project=milvus-testing-nonprod --default-storage-class=STANDARD --location=us-west1 --uniform-bucket-level-access</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Crie uma conta de serviço do Kubernetes para o seu aplicativo usar.</li>
</ul>
<pre><code translate="no" class="language-bash">kubectl create serviceaccount milvus-gcs-access-sa
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Crie uma conta de serviço IAM para seu aplicativo ou use uma conta de serviço IAM existente. Você pode usar qualquer conta de serviço IAM em qualquer projeto da sua organização.</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud iam service-accounts create milvus-gcs-access-sa \
    --project=milvus-testing-nonprod
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Certifique-se de que a sua conta de serviço IAM tem as funções de que necessita. Você pode conceder funções adicionais usando o seguinte comando:</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud projects <span class="hljs-keyword">add</span>-iam-policy-binding milvus-testing-nonprod \
    --member <span class="hljs-string">&quot;serviceAccount:milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com&quot;</span> \
    --role <span class="hljs-string">&quot;roles/storage.admin&quot;</span> \
    --condition=<span class="hljs-string">&#x27;title=milvus-testing-nonprod,expression=resource.service == &quot;storage.googleapis.com&quot; &amp;&amp; resource.name.startsWith(&quot;projects/_/buckets/milvus-testing-nonprod&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Permitir que a conta de serviço do Kubernetes se faça passar pela conta de serviço do IAM adicionando uma associação de política do IAM entre as duas contas de serviço. Essa associação permite que a conta de serviço do Kubernetes atue como a conta de serviço do IAM.</li>
</ul>
<pre><code translate="no" class="language-bash">gcloud iam service-accounts add-iam-policy-binding milvus-gcs-access-sa<span class="hljs-meta">@milvus</span>-testing-nonprod.iam.gserviceaccount.com \
    --role <span class="hljs-string">&quot;roles/iam.workloadIdentityUser&quot;</span> \
    --member <span class="hljs-string">&quot;serviceAccount:milvus-testing-nonprod.svc.id.goog[default/milvus-gcs-access-sa]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Anote a conta de serviço do Kubernetes com o endereço de email da conta de serviço do IAM.</li>
</ul>
<pre><code translate="no" class="language-bash">kubectl annotate serviceaccount milvus-gcs-access-sa \
    --namespace <span class="hljs-keyword">default</span> \
    iam.gke.io/gcp-service-account=milvus-gcs-access-sa<span class="hljs-meta">@milvus</span>-testing-nonprod.iam.gserviceaccount.com
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-Workload-Identity-setup" class="common-anchor-header">Verificar a configuração da Identidade de Carga de Trabalho<button data-href="#Verify-the-Workload-Identity-setup" class="anchor-icon" translate="no">
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
    </button></h2><p>Consulte <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Identidade de Carga de Trabalho</a>. Execute o seguinte comando dentro do Pod:</p>
<pre><code translate="no" class="language-bash">curl -H <span class="hljs-string">&quot;Metadata-Flavor: Google&quot;</span> http://169.254.169.254/computeMetadata/v1/instance/service-accounts/default/email
<button class="copy-code-btn"></button></code></pre>
<p>Se o resultado for <code translate="no">milvus-gcs-access-sa@milvus-testing-nonprod.iam.gserviceaccount.com</code>, está tudo bem.</p>
<h2 id="Deploy-Milvus" class="common-anchor-header">Implantar o Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-bash">helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>o conteúdo do values.yaml:</p>
<pre><code translate="no" class="language-yaml">cluster:
    enabled: <span class="hljs-literal">true</span>

service:
    <span class="hljs-built_in">type</span>: LoadBalancer

minio:
    enabled: <span class="hljs-literal">false</span>

serviceAccount:
    create: <span class="hljs-literal">false</span>
    name: milvus-gcs-access-sa

externalS3:
    enabled: <span class="hljs-literal">true</span>
    host: storage.googleapis.com
    port: 443
    rootPath: milvus/my-release
    bucketName: milvus-testing-nonprod
    cloudProvider: gcp
    useSSL: <span class="hljs-literal">true</span>
    useIAM: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
