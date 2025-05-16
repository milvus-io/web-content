---
id: openshift.md
title: 在 OpenShift 上部署 Milvus 群集
related_key: cluster
summary: 了解如何在 OpenShift 上部署 Milvus 集群。
---
<h1 id="Deploy-a-Milvus-Cluster-on-OpenShift" class="common-anchor-header">在 OpenShift 上部署 Milvus 群集<button data-href="#Deploy-a-Milvus-Cluster-on-OpenShift" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题将逐步介绍如何在 OpenShift 上部署 Milvus。</p>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在开始部署过程之前，请确保您拥有</p>
<ul>
<li>运行中的 OpenShift 群集。</li>
<li>具有足够权限的 OpenShift 群集访问权限（<code translate="no">cluster-admin</code> 角色或同等权限）。</li>
<li>访问 OpenShift 容器平台 Web 控制台。</li>
</ul>
<h2 id="Step-1-Install-Cert-Manager" class="common-anchor-header">第 1 步：安装 Cert Manager<button data-href="#Step-1-Install-Cert-Manager" class="anchor-icon" translate="no">
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
    </button></h2><p>管理 Milvus Operator 的 TLS 证书需要 Cert Manager。</p>
<ol>
<li><p>为您的 OpenShift 版本查找合适的 Cert 管理器版本：<a href="https://cert-manager.io/docs/releases/">Cert Manager Releases</a>。</p></li>
<li><p>按照官方指南安装 Cert Manager：<a href="https://cert-manager.io/docs/installation/">安装证书管理器</a>。</p></li>
<li><p>验证证书管理器是否正常工作：</p>
<ol>
<li><p>在 openshift 控制台中，导航至<strong>Workloads</strong>&gt;<strong>Pods</strong>。选择项目<strong>cert-manager</strong>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/openshift-cert-manager-1.png" alt="cert-manager-1" class="doc-image" id="cert-manager-1" />
   </span> <span class="img-wrapper"> <span>cert-manager-1</span> </span></p></li>
<li><p>确保所有 pod 已准备就绪。例如，下图显示 pod 仍在启动中。请等待所有 pod 准备就绪。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/openshift-cert-manager-2.png" alt="cert-manager-2" class="doc-image" id="cert-manager-2" />
   </span> <span class="img-wrapper"> <span>证书管理器-2</span> </span></p></li>
</ol></li>
</ol>
<h2 id="Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="common-anchor-header">步骤 2：为 Milvus Operator 签发自签名证书<button data-href="#Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>确保以<code translate="no">kubeadmin</code> 或同等权限登录。</p>
<ol>
<li><p>创建以下名为<code translate="no">milvus-operator-certificate.yaml</code> 的清单文件：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-operator-certificate.yaml</span>
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: milvus-operator-serving-cert
  namespace: milvus-operator
spec:
  dnsNames:
  - milvus-operator-webhook-service.milvus-operator.svc
  - milvus-operator-webhook-service.milvus-operator.svc.cluster.local
  issuerRef:
    kind: Issuer
    name: milvus-operator-selfsigned-issuer
  secretName: milvus-operator-webhook-cert
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: milvus-operator-selfsigned-issuer
  namespace: milvus-operator
spec:
  selfSigned: {}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>应用该文件：</p>
<pre><code translate="no" class="language-shell">kubectl apply -f milvus-<span class="hljs-keyword">operator</span>-certificate.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-3-Install-Milvus-Operator" class="common-anchor-header">第 3 步：安装 Milvus 操作符<button data-href="#Step-3-Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>现在可以开始安装 Milvus Operator。建议使用 Helm 安装 Milvus Operator，以简化配置过程。</p>
<ol>
<li><p>添加 Milvus Operator Helm 资源库：</p>
<pre><code translate="no" class="language-shell">helm repo <span class="hljs-keyword">add</span> milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>安装 Milvus Operator：</p>
<pre><code translate="no" class="language-shell">helm -n milvus-operator upgrade --install --create-namespace milvus-operator milvus-operator/milvus-operator
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-4-Deploy-Milvus" class="common-anchor-header">第 4 步：部署 Milvus<button data-href="#Step-4-Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>按照 Milvus 文档网站上的其余指南进行操作：<a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">部署 Milvus</a>。</p>
<h2 id="Whats-Next" class="common-anchor-header">下一步<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
    </button></h2><p>如果你想了解如何在其他云上部署 Milvus：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/eks.md">使用 Kubernetes 在 AWS 上部署 Milvus 群集</a></li>
<li><a href="/docs/zh/v2.4.x/azure.md">使用 Kubernetes 在 Azure 上部署 Milvus 群集</a></li>
<li><a href="/docs/zh/v2.4.x/gcp.md">使用 Kubernetes 在 GCP 上部署 Milvus 群集</a></li>
</ul>
