---
id: azure.md
title: KubernetesでMilvusをMicrosoft Azureに展開する
related_key: cluster
summary: Azure上にMilvusクラスタをデプロイする方法をご紹介します。
---
<h1 id="Deploy-Milvus-on-Azure-with-AKS" class="common-anchor-header">AKSを使用してAzure上にMilvusをデプロイする<button data-href="#Deploy-Milvus-on-Azure-with-AKS" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、<a href="https://azure.microsoft.com/en-us/services/kubernetes-service/#overview">Azure Kubernetes Service</a>(AKS) と<a href="https://portal.azure.com">Azure ポータルを</a>使用してクラスタをプロビジョニングおよび作成する方法について説明します。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Azureプロジェクトが適切にセットアップされ、使用するリソースにアクセスできることを確認してください。アクセス権限が不明な場合は、管理者に問い合わせてください。</p>
<h2 id="Software-requirements" class="common-anchor-header">ソフトウェアの要件<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<li><a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli#install">Azure CLI</a></li>
<li><a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a></li>
<li><a href="https://helm.sh/docs/intro/install/">Helm</a></li>
</ul>
<p>Azure CLI、kubectl、Helm がプリインストールされている<a href="https://learn.microsoft.com/en-us/azure/cloud-shell/overview">Cloud Shell を</a>利用することもできます。</p>
<div class="alert note">Azure CLIをインストールしたら、正しく認証されていることを確認してください。 </div>
<h2 id="Provision-a-Kubernetes-cluster" class="common-anchor-header">Kubernetesクラスタのプロビジョニング<button data-href="#Provision-a-Kubernetes-cluster" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Azureポータルにログオンします。</li>
<li>Azureポータルのメニューまたは<strong>ホーム</strong>画面で、<strong>Create a resourceを</strong>選択します。</li>
<li><strong>Containers</strong>&gt;<strong>Kubernetes Serviceを</strong>選択します。</li>
<li><strong>Basics］</strong>ページで、以下のオプションを設定します：</li>
</ol>
<ul>
<li><p><strong>プロジェクトの詳細</strong>：</p>
<ul>
<li><p><strong>サブスクリプション</strong>：プロジェクトの詳細：サブスクリプション：どのサブスクリプションを使用するかについては、組織のAzure管理者にお問い合わせください。</p>
<ul>
<li><strong>リソースグループ</strong>：どのリソース グループを使用するかについては、組織の Azure 管理者にお問い合わせください。</li>
</ul></li>
</ul></li>
<li><p><strong>クラスタの詳細</strong>：</p>
<ul>
<li><p><strong>Kubernetes クラスタ名</strong>: クラスタ名を入力します。</p></li>
<li><p><strong>リージョン</strong>：リージョンを選択します。</p></li>
<li><p><strong>アベイラビリティゾーン</strong>：必要に応じて<a href="https://docs.microsoft.com/en-us/azure/aks/availability-zones#overview-of-availability-zones-for-aks-clusters">アベイラビリティゾーンを</a>選択します。本番クラスタの場合は、複数のアベイラビリティゾーンを選択することをお勧めします。</p></li>
</ul></li>
<li><p><strong>プライマリ・ノード・プール</strong>：</p>
<ul>
<li><p><strong>ノード・サイズ</strong>：最小16GBのRAMを持つVMを選択することを推奨しますが、必要に応じて仮想マシンのサイズを選択できます。</p></li>
<li><p><strong>スケール方法</strong>：スケール方法を選択します。</p></li>
<li><p><strong>ノード数の範囲</strong>：ノード数の範囲を選択します。</p></li>
</ul></li>
<li><p><strong>ノードプール</strong>：</p>
<ul>
<li><p><strong>仮想ノードを有効にします</strong>：仮想ノードを有効にするチェックボックスを選択します。</p></li>
<li><p><strong>仮想マシンのスケールセットを有効にする</strong>：<code translate="no">enabled</code> を選択することをお勧めします。</p></li>
</ul></li>
<li><p><strong>ネットワーキング</strong></p>
<ul>
<li><p><strong>ネットワークの構成</strong>：<code translate="no">Kubenet</code> を選択することをお勧めします。</p></li>
<li><p><strong>DNS名のプレフィックス</strong>：DNS名のプレフィックスを入力します。</p></li>
<li><p><strong>トラフィックルーティング</strong>：</p>
<ul>
<li><p><strong>ロードバランサー</strong>：<code translate="no">Standard</code>.</p></li>
<li><p><strong>HTTPアプリケーションルーティング</strong>：必須ではありません。</p></li>
</ul></li>
</ul></li>
</ul>
<ol start="5">
<li>オプションを設定したら、<strong>[Review + create</strong>]をクリックし、検証が完了したら<strong>[Create]を</strong>クリックします。クラスタの作成には数分かかります。</li>
</ol>
<h2 id="Connect-to-the-cluster" class="common-anchor-header">クラスタへの接続<button data-href="#Connect-to-the-cluster" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Kubernetes servicesで作成したクラスタに移動し、クリックします。</li>
<li>左側のナビゲーションペインで、<code translate="no">Overview</code> をクリックします。</li>
<li>表示される<strong>[Overview]</strong>ページで、[<strong>Connect]</strong>をクリックしてリソースグループとサブスクリプションを表示します。</li>
</ol>
<h2 id="Set-a-subscription-and-credentials" class="common-anchor-header">サブスクリプションと認証情報の設定<button data-href="#Set-a-subscription-and-credentials" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">Azure Cloud Shell を使用して、以下の手順を実行できます。</div>
<ol>
<li>次のコマンドを実行して、サブスクリプションを設定します。</li>
</ol>
<pre><code translate="no" class="language-shell">az account <span class="hljs-built_in">set</span> --subscription EXAMPLE-SUBSCRIPTION-ID
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>以下のコマンドを実行して資格情報をダウンロードし、それを使用するように Kubernetes CLI を設定します。</li>
</ol>
<pre><code translate="no" class="language-shell">az aks <span class="hljs-keyword">get</span>-credentials --resource-<span class="hljs-keyword">group</span> YOUR-RESOURCE-GROUP --name YOUR-CLUSTER-NAME
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
以下の手順には同じシェルを使用します。別のシェルに切り替えた場合は、前述のコマンドを再度実行します。</div>
<h2 id="Using-Azure-Blob-Storage-as-external-object-storage" class="common-anchor-header">Azure Blob Storageを外部オブジェクトストレージとして使用する<button data-href="#Using-Azure-Blob-Storage-as-external-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Azure Blob Storageは、AWS Simple Storage Service（S3）のAzure版です。</p>
<ul>
<li>ストレージアカウントとコンテナを作成する。</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account create -n milvustesting1 -g MyResourceGroup -l eastus --sku Standard_LRS --<span class="hljs-built_in">min</span>-tls-version TLS1_2
az storage container create -n testmilvus --account-name milvustesting1
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>シークレットキーを取得し、最初の値を使用する</li>
</ul>
<pre><code translate="no" class="language-bash">az storage account keys list --account-name milvustesting2
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>values.yamlを追加する</li>
</ul>
<pre><code translate="no" class="language-yaml">cluster:
  enabled: <span class="hljs-literal">true</span>

service:
  <span class="hljs-built_in">type</span>: LoadBalancer

extraConfigFiles:
  user.yaml: |+
    common:
      storageType: remote

minio:
  enabled: <span class="hljs-literal">false</span>

externalS3:
  enabled: <span class="hljs-literal">true</span>
  host: core.windows.net
  port: 443
  rootPath: my-release
  bucketName: testmilvus <span class="hljs-comment"># the storage account container name</span>
  cloudProvider: azure
  useSSL: <span class="hljs-literal">true</span>
  accessKey: <span class="hljs-string">&quot;milvustesting1&quot;</span> <span class="hljs-comment"># the storage account name</span>
  secretKey: <span class="hljs-string">&quot;&lt;secret-key&gt;&quot;</span> 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Milvus" class="common-anchor-header">Milvusのデプロイ<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>これでKubernetesクラスタの準備は整った。さっそくMilvusをデプロイしてみよう。</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
helm install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>前述のコマンドで、Milvus Helmチャートのリポジトリをローカルに追加し、最新のチャートを取得するようにリポジトリを更新する。そして、Milvusインスタンスをインストールし、<strong>my-releaseと</strong>名付ける。</p>
<p>コンフィグ<code translate="no">service.type</code> 。これはレイヤ4ロードバランサを通してMilvusインスタンスを公開することを示している。</p>
<h2 id="Verify-the-deployment" class="common-anchor-header">デプロイの確認<button data-href="#Verify-the-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>すべてのPodが起動したら、以下のコマンドを実行して外部IPアドレスを取得する。</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> services|grep my-release-milvus|grep LoadBalancer|awk <span class="hljs-string">&#x27;{print $4}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hello-Milvus" class="common-anchor-header">Hello Milvus<button data-href="#Hello-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/v2.3.x/example_code.md">Hello Milvusを</a>参考に、hostの値を外部IPアドレスに変更してコードを実行してください。</p>
<h2 id="Whats-next" class="common-anchor-header">次のページ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusを他のクラウドにデプロイする方法を学びたい場合は、以下のリンクを参照してください：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/eks.md">Kubernetesを使ったAWSへのMilvusクラスタのデプロイ</a></li>
<li><a href="/docs/ja/v2.4.x/gcp.md">KubernetesでGCPにMilvusクラスタをデプロイする</a></li>
</ul>
