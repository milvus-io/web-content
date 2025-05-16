---
id: meta_storage_operator.md
title: 使用 Milvus Operator 配置元存储
related_key: "minio, s3, storage, etcd, pulsar"
summary: 了解如何使用 Milvus Operator 配置元存储。
---

<h1 id="Configure-Meta-Storage-with-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator 配置元数据存储<button data-href="#Configure-Meta-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 使用 etcd 来存储元数据。本主题介绍如何在使用 Milvus Operator 安装 Milvus 时配置元存储依赖关系。有关详细信息，请参阅<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">Milvus Operator 存储</a>库中的<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">配置 Milvus Operator 的元存储</a>。</p>
<p>本主题假定您已部署 Milvus Operator。</p>
<div class="alert note">有关详细信息，请参阅<a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">部署 Milvus Operator</a>。 </div>
<p>您需要指定使用 Milvus Operator 启动 Milvus 群集的配置文件。</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>您只需编辑<code translate="no">milvus_cluster_default.yaml</code> 中的代码模板，即可配置第三方依赖关系。下文将分别介绍如何配置对象存储、etcd 和 Pulsar。</p>
<h2 id="Configure-etcd" class="common-anchor-header">配置 etcd<button data-href="#Configure-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">spec.dependencies.etcd</code> 下添加配置 etcd 的必填字段。</p>
<p><code translate="no">etcd</code> 支持 和 。<code translate="no">external</code> <code translate="no">inCluster</code></p>
<p>用于配置外部 etcd 服务的字段包括</p>
<ul>
<li><code translate="no">external</code>:<code translate="no">true</code> 值表示 Milvus 使用外部 etcd 服务。</li>
<li><code translate="no">endpoints</code>:etcd 的端点。</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">外部 etcd</h3><h4 id="Example" class="common-anchor-header">示例</h4><p>下面的示例配置了外部 etcd 服务。</p>
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
<h3 id="Internal-etcd" class="common-anchor-header">内部 etcd</h3><p><code translate="no">inCluster</code> 表示 Milvus 集群启动时，etcd 服务会在集群中自动启动。</p>
<h4 id="Example" class="common-anchor-header">示例</h4><p>下面的示例配置了内部 etcd 服务。</p>
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
<div class="alert note">上例将副本数量指定为<code translate="no">5</code> ，并限制了 etcd 的计算资源。</div>
<div class="alert note">在<a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yaml</a> 中查找配置内部 etcd 服务的完整配置项。如上例所示，根据需要在<code translate="no">etcd.inCluster.values</code> 下添加配置项。</div>
<p>假设配置文件名为<code translate="no">milvuscluster.yaml</code> ，请运行以下命令应用配置。</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>了解如何使用 Milvus Operator 配置其他 Milvus 依赖项：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/object_storage_operator.md">使用 Milvus Operator 配置对象存储</a></li>
<li><a href="/docs/zh/v2.4.x/message_storage_operator.md">使用 Milvus Operator 配置消息存储</a></li>
</ul>
