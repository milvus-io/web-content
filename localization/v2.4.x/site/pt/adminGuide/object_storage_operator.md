---
id: object_storage_operator.md
title: Configurar o armazenamento de objectos com o Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Saiba como configurar o armazenamento de objectos com o Milvus Operator.
---
<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">Configurar o armazenamento de objectos com o Milvus Operator<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus usa o MinIO ou o S3 como armazenamento de objetos para manter arquivos de grande escala, como arquivos de índice e logs binários. Este tópico apresenta como configurar as dependências de armazenamento de objetos quando você instala o Milvus com o Milvus Operator. Para obter mais detalhes, consulte <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Configurar o armazenamento de objetos com o Milvus Operator</a> no repositório do Milvus Operator.</p>
<p>Este tópico pressupõe que você implantou o Milvus Operator.</p>
<div class="alert note">Consulte <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Implantar o Milvus Operator</a> para obter mais informações. </div>
<p>É necessário especificar um arquivo de configuração para usar o Milvus Operator para iniciar um cluster do Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Só é necessário editar o modelo de código em <code translate="no">milvus_cluster_default.yaml</code> para configurar dependências de terceiros. As secções seguintes apresentam como configurar o armazenamento de objectos, etcd, e Pulsar respetivamente.</p>
<h2 id="Configure-object-storage" class="common-anchor-header">Configurar o armazenamento de objetos<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Um cluster Milvus usa MinIO ou S3 como armazenamento de objetos para persistir arquivos de grande escala, como arquivos de índice e logs binários. Adicione os campos obrigatórios em <code translate="no">spec.dependencies.storage</code> para configurar o armazenamento de objectos, as opções possíveis são <code translate="no">external</code> e <code translate="no">inCluster</code>.</p>
<h3 id="Internal-object-storage" class="common-anchor-header">Armazenamento interno de objectos</h3><p>Por defeito, o Milvus Operator implementa um MinIO no cluster para o Milvus. Segue-se um exemplo de configuração para demonstrar como utilizar este MinIO como um armazenamento de objectos interno.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    <span class="hljs-comment"># Omit other fields ...</span>
    storage:
      inCluster:
        values:
          mode: standalone
          resources:
            requests:
              memory: 100Mi
        deletionPolicy: Delete <span class="hljs-comment"># Delete | Retain, default: Retain</span>
        pvcDeletion: true <span class="hljs-comment"># default: false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Após a aplicação da configuração acima, o MinIO no cluster será executado em modo autónomo com um limite de memória de até 100Mi. Note que</p>
<ul>
<li><p>O campo <code translate="no">deletionPolicy</code> especifica a política de eliminação do MinIO em cluster. A predefinição é <code translate="no">Delete</code> e tem <code translate="no">Retain</code> como opção alternativa.</p>
<ul>
<li><code translate="no">Delete</code> indica que o armazenamento de objectos em cluster é eliminado quando pára a instância do Milvus.</li>
<li><code translate="no">Retain</code> indica que o armazenamento de objectos no cluster é mantido como serviço de dependência para arranques posteriores da instância do Milvus.</li>
</ul></li>
<li><p>O campo <code translate="no">pvcDeletion</code> especifica se o PVC (Persistent Volume Claim) deve ser excluído quando o MinIO no cluster for excluído.</p></li>
</ul>
<p>Os campos em <code translate="no">inCluster.values</code> são os mesmos que os do Milvus Helm Chart, e pode encontrá-los <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">aqui</a>.</p>
<h3 id="External-object-storage" class="common-anchor-header">Armazenamento de objectos externos</h3><p>A utilização de <code translate="no">external</code> no ficheiro YAML do modelo indica a utilização de um serviço de armazenamento de objectos externo. Para utilizar um armazenamento de objectos externo, é necessário definir corretamente os campos em <code translate="no">spec.dependencies.storage</code> e <code translate="no">spec.config.minio</code> no Milvus CRD.</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">Utilizar o Amazon Web Service (AWS) S3 como armazenamento externo de objectos</h4><ul>
<li><p>Configurar o acesso ao AWS S3 por AK/SK</p>
<p>Um bucket S3 pode normalmente ser acedido por um par de uma chave de acesso e uma chave secreta de acesso. Você pode criar um objeto <code translate="no">Secret</code> para armazená-los no seu Kubernetes da seguinte forma:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-s3-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, você pode configurar um bucket do AWS S3 como o armazenamento de objeto externo:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      <span class="hljs-comment"># your bucket name</span>
      bucketName: &lt;my-bucket&gt;
      <span class="hljs-comment"># Optional, config the prefix of the bucket milvus will use</span>
      rootPath: milvus/my-release
      useSSL: true
  dependencies:
    storage:
      <span class="hljs-comment"># enable external object storage</span>
      external: true
      <span class="hljs-built_in">type</span>: S3 <span class="hljs-comment"># MinIO | S3</span>
      <span class="hljs-comment"># the endpoint of AWS S3</span>
      endpoint: s3.amazonaws.com:<span class="hljs-number">443</span>
      <span class="hljs-comment"># the secret storing the access key and secret key</span>
      secretRef: <span class="hljs-string">&quot;my-release-s3-secret&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Configurar o acesso ao AWS S3 por AssumeRole</p>
<p>Como alternativa, você pode fazer com que o Milvus acesse seu bucket do AWS S3 usando <a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRole</a>, para que apenas credenciais temporárias sejam envolvidas em vez de seu AK/SK real.</p>
<p>Se preferir, tem de preparar uma função na sua consola AWS e obter o seu ARN, que tem normalmente a forma de <code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code>.</p>
<p>Em seguida, crie um objeto <code translate="no">ServiceAccount</code> para armazená-lo em seu Kubernetes da seguinte maneira:</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    eks.amazonaws.com/role-arn: &lt;my-role-arn&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Depois de tudo pronto, faça referência ao <code translate="no">ServiceAccount</code> acima no arquivo YAML do modelo e defina <code translate="no">spec.config.minio.useIAM</code> para <code translate="no">true</code> para habilitar AssumeRole.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      <span class="hljs-comment"># Note: you must use regional endpoint here, otherwise the minio client that milvus uses will fail to connect</span>
      endpoint: s3.&lt;my-bucket-region&gt;.amazonaws.com:<span class="hljs-number">443</span>
      secretRef: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># we don&#x27;t need to specify the secret here</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">Usar o Google Cloud Storage (GCS) como armazenamento de objeto externo</h4><p>O armazenamento de objetos do AWS S3 não é a única opção. Você também pode usar o serviço de armazenamento de objetos de outros provedores de nuvem pública, como o Google Cloud.</p>
<ul>
<li><p>Configurar o acesso ao GCS por AK/SK</p>
<p>A configuração é, em grande parte, semelhante à da utilização do AWS S3. Você ainda precisa criar um objeto <code translate="no">Secret</code> para armazenar suas credenciais no seu Kubernetes.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-gcp-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Depois, só precisa de alterar <code translate="no">endpoint</code> para <code translate="no">storage.googleapis.com:443</code> e definir <code translate="no">spec.config.minio.cloudProvider</code> para <code translate="no">gcp</code> como se segue:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      cloudProvider: gcp
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      endpoint: storage.googleapis.com:<span class="hljs-number">443</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Configurar o acesso ao GCS por AssumeRole</p>
<p>Semelhante ao AWS S3, você também pode usar o <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload Identity</a> para acessar o GCS com credenciais temporárias se estiver usando o GKE como seu cluster do Kubernetes.</p>
<p>A anotação do <code translate="no">ServiceAccount</code> é diferente da do AWS EKS. Tem de especificar o nome da conta de serviço GCP em vez da função ARN.</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    iam.gke.io/gcp-service-account: &lt;my-gcp-service-account-name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, pode configurar a sua instância Milvus para utilizar o <code translate="no">ServiceAccount</code> acima e ativar o AssumeRole definindo <code translate="no">spec.config.minio.useIAM</code> para <code translate="no">true</code> da seguinte forma:</p>
<pre><code translate="no" class="language-YAML">labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      cloudProvider: gcp
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...  </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">O que vem a seguir<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Saiba como configurar outras dependências do Milvus com o Milvus Operator:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/meta_storage_operator.md">Configurar o Meta Storage com o Milvus Operator</a></li>
<li><a href="/docs/pt/v2.4.x/message_storage_operator.md">Configurar o armazenamento de mensagens com o Milvus Operator</a></li>
</ul>
