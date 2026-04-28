---
id: abs.md
title: تكوين الوصول إلى تخزين Blob Storage حسب هوية حمل العمل
related_key: 'blob storage, workload identity, iam'
summary: تعرف على كيفية تكوين Blob Storage باستخدام هوية حمل العمل.
---
<h1 id="Configure-Blob-Storage-Access-by-Workload-Identity" class="common-anchor-header">تكوين الوصول إلى تخزين Blob Storage حسب هوية حمل العمل<button data-href="#Configure-Blob-Storage-Access-by-Workload-Identity" class="anchor-icon" translate="no">
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
    </button></h1><p>يقدم هذا الموضوع كيفية تكوين الوصول إلى Azure Blob Storage حسب هوية حمل العمل عند تثبيت Milvus مع Helm. لمزيد من التفاصيل، راجع <a href="https://azure.github.io/azure-workload-identity/docs/introduction.html">هوية حمل العمل</a>.</p>
<h2 id="Configure-applications-to-use-Workload-Identity" class="common-anchor-header">تكوين التطبيقات لاستخدام هوية حمل العمل<button data-href="#Configure-applications-to-use-Workload-Identity" class="anchor-icon" translate="no">
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
<li>تعيين env.</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> RESOURCE_GROUP=<span class="hljs-string">&quot;&lt;your resource group&gt;&quot;</span>
<span class="hljs-built_in">export</span> AKS_CLUSTER=<span class="hljs-string">&quot;&lt;your aks cluster name&gt;&quot;</span> 
<span class="hljs-built_in">export</span> SUB_ID=<span class="hljs-string">&quot;&lt;your Subscription ID&gt;&quot;</span>
<span class="hljs-built_in">export</span> USER_ASSIGNED_IDENTITY_NAME=<span class="hljs-string">&quot;workload-identity&quot;</span>
<span class="hljs-built_in">export</span> SERVICE_ACCOUNT_NAME=<span class="hljs-string">&quot;milvus-abs-access-sa&quot;</span>
<span class="hljs-built_in">export</span> STORAGE_ACCOUNT_NAME=<span class="hljs-string">&quot;milvustesting1&quot;</span>
<span class="hljs-built_in">export</span> CONTAINER_NAME=<span class="hljs-string">&quot;testmilvus&quot;</span>
<span class="hljs-built_in">export</span> LOCATION=<span class="hljs-string">&quot;&lt;your location&gt;&quot;</span>
<span class="hljs-built_in">export</span> SERVICE_ACCOUNT_NAMESPACE=<span class="hljs-string">&quot;default&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>قم بتحديث مجموعة AKS مع مُصدر OIDC وهوية حمل العمل.</li>
</ul>
<pre><code translate="no" class="language-bash">az aks update -g <span class="hljs-variable">${RESOURCE_GROUP}</span> -n <span class="hljs-variable">${AKS_CLUSTER}</span> --enable-oidc-issuer --enable-workload-identity
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>احصل على عنوان URL لمصدر OIDC.</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> SERVICE_ACCOUNT_ISSUER=<span class="hljs-string">&quot;<span class="hljs-subst">$(az aks show --resource-group ${RESOURCE_GROUP} --name ${AKS_CLUSTER} --query &#x27;oidcIssuerProfile.issuerUrl&#x27; -otsv)</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>إنشاء حساب تخزين وحاوية.</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account create -n <span class="hljs-variable">${STORAGE_ACCOUNT_NAME}</span> -g <span class="hljs-variable">${RESOURCE_GROUP}</span> -l <span class="hljs-variable">$LOCATION</span> --sku Standard_LRS --min-tls-version TLS1_2
az storage container create -n <span class="hljs-variable">${CONTAINER_NAME}</span> --account-name <span class="hljs-variable">${STORAGE_ACCOUNT_NAME}</span>

<button class="copy-code-btn"></button></code></pre>
<ul>
<li>إنشاء هوية مُدارة معيّنة من قبل المستخدم وتعيين الدور.</li>
</ul>
<pre><code translate="no" class="language-bash">az identity create --name <span class="hljs-string">&quot;<span class="hljs-variable">${USER_ASSIGNED_IDENTITY_NAME}</span>&quot;</span> --resource-group <span class="hljs-string">&quot;<span class="hljs-variable">${RESOURCE_GROUP}</span>&quot;</span>
<span class="hljs-built_in">export</span> USER_ASSIGNED_IDENTITY_CLIENT_ID=<span class="hljs-string">&quot;<span class="hljs-subst">$(az identity show --name <span class="hljs-string">&quot;<span class="hljs-variable">${USER_ASSIGNED_IDENTITY_NAME}</span>&quot;</span> --resource-group <span class="hljs-string">&quot;<span class="hljs-variable">${RESOURCE_GROUP}</span>&quot;</span> --query &#x27;clientId&#x27; -otsv)</span>&quot;</span>
<span class="hljs-built_in">export</span> USER_ASSIGNED_IDENTITY_OBJECT_ID=<span class="hljs-string">&quot;<span class="hljs-subst">$(az identity show --name <span class="hljs-string">&quot;<span class="hljs-variable">${USER_ASSIGNED_IDENTITY_NAME}</span>&quot;</span> --resource-group <span class="hljs-string">&quot;<span class="hljs-variable">${RESOURCE_GROUP}</span>&quot;</span> --query &#x27;principalId&#x27; -otsv)</span>&quot;</span>
az role assignment create --role <span class="hljs-string">&quot;Storage Blob Data Contributor&quot;</span> --assignee <span class="hljs-string">&quot;<span class="hljs-variable">${USER_ASSIGNED_IDENTITY_OBJECT_ID}</span>&quot;</span> --scope <span class="hljs-string">&quot;/subscriptions/<span class="hljs-variable">${SUB_ID}</span>/resourceGroups/<span class="hljs-variable">${RESOURCE_GROUP}</span>/providers/Microsoft.Storage/storageAccounts/<span class="hljs-variable">${STORAGE_ACCOUNT_NAME}</span>&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<ul>
<li>إنشاء حساب خدمة.</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    azure.workload.identity/client-id: ${USER_ASSIGNED_IDENTITY_CLIENT_ID}
  name: ${SERVICE_ACCOUNT_NAME}
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>إنشاء بيانات اعتماد الهوية الموحدة بين الهوية ومُصدر حساب الخدمة والموضوع.</li>
</ul>
<pre><code translate="no" class="language-bash">az identity federated-credential create \
  --name <span class="hljs-string">&quot;kubernetes-federated-credential&quot;</span> \
  --identity-name <span class="hljs-string">&quot;<span class="hljs-variable">${USER_ASSIGNED_IDENTITY_NAME}</span>&quot;</span> \
  --resource-group <span class="hljs-string">&quot;<span class="hljs-variable">${RESOURCE_GROUP}</span>&quot;</span> \
  --issuer <span class="hljs-string">&quot;<span class="hljs-variable">${SERVICE_ACCOUNT_ISSUER}</span>&quot;</span> \
  --subject <span class="hljs-string">&quot;system:serviceaccount:<span class="hljs-variable">${SERVICE_ACCOUNT_NAMESPACE}</span>:<span class="hljs-variable">${SERVICE_ACCOUNT_NAME}</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Milvus" class="common-anchor-header">نشر ميلفوس<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
<p>محتويات القيم.yaml:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">cluster:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>

<span class="hljs-attr">service:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">LoadBalancer</span>

<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    common:
      storageType: remote
</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>

<span class="hljs-attr">labels:</span>
  <span class="hljs-attr">azure.workload.identity/use:</span> <span class="hljs-string">&quot;true&quot;</span>

<span class="hljs-attr">serviceAccount:</span>
  <span class="hljs-attr">create:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-abs-access-sa</span> <span class="hljs-comment"># SERVICE_ACCOUNT_NAME</span>

<span class="hljs-attr">externalS3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">host:</span> <span class="hljs-string">core.windows.net</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">443</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">testmilvus</span> <span class="hljs-comment"># CONTAINER_NAME</span>
  <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">azure</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">accessKey:</span> <span class="hljs-string">&quot;milvustesting1&quot;</span> <span class="hljs-comment"># STORAGE_ACCOUNT_NAME</span>
  <span class="hljs-attr">secretKey:</span> <span class="hljs-string">&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
