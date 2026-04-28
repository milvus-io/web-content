---
id: openshift.md
title: 在 OpenShift 上部署 Milvus 集群
related_key: cluster
summary: 瞭解如何在 OpenShift 上部署 Milvus 群集。
---
<h1 id="Deploy-a-Milvus-Cluster-on-OpenShift" class="common-anchor-header">在 OpenShift 上部署 Milvus 集群<button data-href="#Deploy-a-Milvus-Cluster-on-OpenShift" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題提供如何在 OpenShift 上部署 Milvus 的逐步指南。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在開始部署程序之前，請確保您擁有</p>
<ul>
<li>正在執行的 OpenShift 叢集。</li>
<li>具有足夠權限的 OpenShift 叢集存取權限 (<code translate="no">cluster-admin</code> 角色或同等權限)。</li>
<li>存取 OpenShift Container Platform 網頁主控台。</li>
</ul>
<h2 id="Step-1-Install-Cert-Manager" class="common-anchor-header">步驟 1：安裝 Cert Manager<button data-href="#Step-1-Install-Cert-Manager" class="anchor-icon" translate="no">
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
    </button></h2><p>管理 Milvus Operator 的 TLS 憑證需要 Cert Manager。</p>
<ol>
<li><p>為您的 OpenShift 版本尋找合適的 Cert-manager 版本：<a href="https://cert-manager.io/docs/releases/">Cert Manager 版本</a>。</p></li>
<li><p>按照官方指南安裝 Cert Manager：<a href="https://cert-manager.io/docs/installation/">安裝 Cert Manager</a>。</p></li>
<li><p>驗證您的 Cert Manager 是否正常運作：</p>
<ol>
<li><p>在 openshift 主控台中，導覽到<strong>Workloads</strong>&gt;<strong>Pods</strong>。選擇專案<strong>cert-manager</strong>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/openshift-cert-manager-1.png" alt="cert-manager-1" class="doc-image" id="cert-manager-1" />
   </span> <span class="img-wrapper"> <span>cert-manager-1</span> </span></p></li>
<li><p>確保所有 Pod 已準備就緒。例如，下圖顯示 Pod 仍在啟動中。等到所有這些 Pod 都準備就緒。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/openshift-cert-manager-2.png" alt="cert-manager-2" class="doc-image" id="cert-manager-2" />
   </span> <span class="img-wrapper"> <span>cert-manager-2</span> </span></p></li>
</ol></li>
</ol>
<h2 id="Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="common-anchor-header">步驟 2：為 Milvus Operator 簽發自簽憑證<button data-href="#Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>確保您以<code translate="no">kubeadmin</code> 或同等權限登入。</p>
<ol>
<li><p>建立下列名為<code translate="no">milvus-operator-certificate.yaml</code> 的清單檔案：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-operator-certificate.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">cert-manager.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Certificate</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-operator-serving-cert</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus-operator</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dnsNames:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">milvus-operator-webhook-service.milvus-operator.svc</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">milvus-operator-webhook-service.milvus-operator.svc.cluster.local</span>
  <span class="hljs-attr">issuerRef:</span>
    <span class="hljs-attr">kind:</span> <span class="hljs-string">Issuer</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-operator-selfsigned-issuer</span>
  <span class="hljs-attr">secretName:</span> <span class="hljs-string">milvus-operator-webhook-cert</span>
<span class="hljs-meta">---</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">cert-manager.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Issuer</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-operator-selfsigned-issuer</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus-operator</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">selfSigned:</span> {}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>應用該檔案：</p>
<pre><code translate="no" class="language-shell">kubectl apply -f milvus-operator-certificate.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-3-Install-Milvus-Operator" class="common-anchor-header">步驟 3: 安裝 Milvus Operator<button data-href="#Step-3-Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>現在您可以開始安裝 Milvus Operator。建議使用 Helm 安裝 Milvus Operator，以簡化設定過程。</p>
<ol>
<li><p>新增 Milvus Operator Helm 套件庫：</p>
<pre><code translate="no" class="language-shell">helm repo add milvus-operator https://zilliztech.github.io/milvus-operator/
helm repo update milvus-operator
<button class="copy-code-btn"></button></code></pre></li>
<li><p>安裝 Milvus Operator：</p>
<pre><code translate="no" class="language-shell">helm -n milvus-operator upgrade --install --create-namespace milvus-operator milvus-operator/milvus-operator
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-4-Deploy-Milvus" class="common-anchor-header">步驟 4：部署 Milvus<button data-href="#Step-4-Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>按照 Milvus 文檔網站的其餘指南進行：<a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">部署 Milvus</a>。</p>
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
    </button></h2><p>如果您想學習如何在其他雲上部署 Milvus：</p>
<ul>
<li><a href="/docs/zh-hant/eks.md">使用 Kubernetes 在 AWS 上部署 Milvus 叢集</a></li>
<li><a href="/docs/zh-hant/azure.md">使用 Kubernetes 在 Azure 上部署 Milvus 叢集</a></li>
<li><a href="/docs/zh-hant/gcp.md">使用 Kubernetes 在 GCP 上部署 Milvus 叢集</a></li>
</ul>
