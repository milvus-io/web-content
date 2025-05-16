---
id: meta_storage_operator.md
title: Configurar o Meta Storage com o Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Saiba como configurar o meta-armazenamento com o Milvus Operator.
---
<h1 id="Configure-Meta-Storage-with-Milvus-Operator" class="common-anchor-header">Configurar o armazenamento de metadados com o Milvus Operator<button data-href="#Configure-Meta-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus usa o etcd para armazenar metadados. Este tópico apresenta como configurar a dependência do metarmazenamento quando você instala o Milvus com o Milvus Operator. Para obter mais detalhes, consulte <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">Configurar o Meta Storage com o Milvus Operator</a> no repositório do Milvus Operator.</p>
<p>Este tópico pressupõe que você tenha implantado o Milvus Operator.</p>
<div class="alert note">Consulte <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Implantar o Milvus Operator</a> para obter mais informações. </div>
<p>É necessário especificar um ficheiro de configuração para utilizar o Milvus Operator para iniciar um cluster Milvus.</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Só é necessário editar o modelo de código em <code translate="no">milvus_cluster_default.yaml</code> para configurar dependências de terceiros. As secções seguintes apresentam como configurar o armazenamento de objectos, etcd, e Pulsar respetivamente.</p>
<h2 id="Configure-etcd" class="common-anchor-header">Configurar o etcd<button data-href="#Configure-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p>Adicione os campos obrigatórios em <code translate="no">spec.dependencies.etcd</code> para configurar o etcd.</p>
<p><code translate="no">etcd</code> suporta <code translate="no">external</code> e <code translate="no">inCluster</code>.</p>
<p>Os campos usados para configurar um serviço etcd externo incluem:</p>
<ul>
<li><code translate="no">external</code>: Um valor <code translate="no">true</code> indica que o Milvus usa um serviço etcd externo.</li>
<li><code translate="no">endpoints</code>: Os endpoints do etcd.</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">etcd externo</h3><h4 id="Example" class="common-anchor-header">externo</h4><p>O exemplo a seguir configura um serviço etcd externo.</p>
<pre><code translate="no" class="language-YAML">kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies: <span class="hljs-comment"># Optional</span>
    etcd: <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external etcd as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new etcd inside the same kubernetes cluster for milvus.</span>
      external: true <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external etcd endpoints if external=true</span>
      endpoints:
      - <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>:<span class="hljs-number">2379</span>
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-etcd" class="common-anchor-header">etcd interno</h3><p><code translate="no">inCluster</code> indica que quando um cluster Milvus é iniciado, um serviço etcd é iniciado automaticamente no cluster.</p>
<h4 id="Example" class="common-anchor-header">Exemplo</h4><p>O exemplo a seguir configura um serviço etcd interno.</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    etcd:
      inCluster:
        values:
          replicaCount: 5
          resources:
            limits: 
              cpu: <span class="hljs-string">&#x27;4&#x27;</span>
              memory: 8Gi
            requests:
              cpu: 200m
              memory: 512Mi
  components: {}
  config: {}              
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">O exemplo anterior especifica o número de réplicas como <code translate="no">5</code> e limita os recursos de computação para o etcd.</div>
<div class="alert note">Encontre os itens de configuração completos para configurar um serviço etcd interno em <a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yaml</a>. Adicione itens de configuração conforme necessário em <code translate="no">etcd.inCluster.values</code>, conforme mostrado no exemplo anterior.</div>
<p>Supondo que o arquivo de configuração tenha o nome <code translate="no">milvuscluster.yaml</code>, execute o seguinte comando para aplicar a configuração.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
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
<li><a href="/docs/pt/v2.4.x/object_storage_operator.md">Configurar o armazenamento de objectos com o Milvus Operator</a></li>
<li><a href="/docs/pt/v2.4.x/message_storage_operator.md">Configurar o armazenamento de mensagens com o Milvus Operator</a></li>
</ul>
