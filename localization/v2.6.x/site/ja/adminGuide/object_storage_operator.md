---
id: object_storage_operator.md
title: Milvus Operatorでオブジェクトストレージを設定する
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Milvus Operatorを使用したオブジェクトストレージの設定方法をご紹介します。
---
<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">Milvus Operatorでオブジェクトストレージを設定する<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusでは、インデックスファイルやバイナリログなどの大規模ファイルを永続化するために、オブジェクトストレージとしてMinIOまたはS3を使用します。このトピックでは、Milvus OperatorでMilvusをインストールする際に、オブジェクトストレージの依存関係を設定する方法を紹介します。詳細については、Milvus Operatorリポジトリの「<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Milvus Operatorでオブジェクトストレージを構成する</a>」を参照してください。</p>
<p>このトピックでは、Milvus Operatorをデプロイ済みであることを前提としています。</p>
<div class="alert note">詳細については、<a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Milvus Operatorのデプロイを</a>参照してください。 </div>
<p>Milvus Operatorを使用してMilvusクラスタを起動するには、設定ファイルを指定する必要があります。</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">kubectl</span> <span class="hljs-string">apply</span> <span class="hljs-string">-f</span> <span class="hljs-string">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>サードパーティの依存関係を設定するには、<code translate="no">milvus_cluster_default.yaml</code> のコードテンプレートを編集するだけです。以下のセクションでは、オブジェクト・ストレージ、etcd、Pulsarの設定方法をそれぞれ紹介します。</p>
<h2 id="Configure-object-storage" class="common-anchor-header">オブジェクト・ストレージの構成<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusクラスタは、インデックス・ファイルやバイナリ・ログなどの大規模ファイルを永続化するために、オブジェクト・ストレージとしてMinIOまたはS3を使用します。オブジェクト・ストレージを構成するには、<code translate="no">spec.dependencies.storage</code> の下に必須フィールドを追加します。考えられるオプションは、<code translate="no">external</code> および<code translate="no">inCluster</code> です。</p>
<h3 id="Internal-object-storage" class="common-anchor-header">内部オブジェクトストレージ</h3><p>デフォルトでは、Milvus OperatorはMilvus用のクラスタ内MinIOをデプロイします。以下は、このMinIOを内部オブジェクトストレージとして使用する方法を示す構成例です。</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-comment"># Omit other fields ...</span>
    <span class="hljs-attr">storage:</span>
      <span class="hljs-attr">inCluster:</span>
        <span class="hljs-attr">values:</span>
          <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
          <span class="hljs-attr">resources:</span>
            <span class="hljs-attr">requests:</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">100Mi</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Delete</span> <span class="hljs-comment"># Delete | Retain, default: Retain</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># default: false</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記の構成が適用された後、クラスタ内MinIOはスタンドアロンモードで実行され、メモリは最大100Miに制限されます。以下の点に注意。</p>
<ul>
<li><p><code translate="no">deletionPolicy</code> ］フィールドは、クラスタ内MinIOの削除ポリシーを指定する。デフォルトは<code translate="no">Delete</code> で、代替オプションとして<code translate="no">Retain</code> がある。</p>
<ul>
<li><code translate="no">Delete</code> は、Milvusインスタンスの停止時にクラスタ内オブジェクトストレージが削除されることを示します。</li>
<li><code translate="no">Retain</code> は、Milvusインスタンスの起動時にクラスタ内オブジェクトストレージを依存サービスとして保持することを示します。</li>
</ul></li>
<li><p><code translate="no">pvcDeletion</code> フィールドは、クラスタ内MinIOの削除時にPVC(Persistent Volume Claim)を削除するかどうかを指定します。</p></li>
</ul>
<p><code translate="no">inCluster.values</code> 以下はMilvus Helm Chartのフィールドと同じです<a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">。</a></p>
<h3 id="External-object-storage" class="common-anchor-header">外部オブジェクトストレージ</h3><p>テンプレート YAML ファイルで<code translate="no">external</code> を使用することは、外部オブジェクトストレージサービスを使用することを示します。外部オブジェクトストレージを使用するには、Milvus CRDの<code translate="no">spec.dependencies.storage</code> 、<code translate="no">spec.config.minio</code> のフィールドを適切に設定する必要があります。</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">外部オブジェクトストレージとしてAmazon Web Service (AWS) S3を使用する</h4><ul>
<li><p>AK/SK による AWS S3 アクセスの設定</p>
<p>S3バケットは通常、アクセスキーとアクセスシークレットキーのペアでアクセスできます。それらをKubernetesに格納するための<code translate="no">Secret</code> オブジェクトを以下のように作成します：</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Secret</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-s3-secret</span>
<span class="hljs-attr">type:</span> <span class="hljs-string">Opaque</span>
<span class="hljs-attr">stringData:</span>
  <span class="hljs-attr">accesskey:</span> <span class="hljs-string">&lt;my-access-key&gt;</span>
  <span class="hljs-attr">secretkey:</span> <span class="hljs-string">&lt;my-secret-key&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>次に、外部オブジェクトストレージとしてAWS S3バケットを設定します：</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">minio:</span>
      <span class="hljs-comment"># your bucket name</span>
      <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&lt;my-bucket&gt;</span>
      <span class="hljs-comment"># Optional, config the prefix of the bucket milvus will use</span>
      <span class="hljs-attr">rootPath:</span> <span class="hljs-string">milvus/my-release</span>
      <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">storage:</span>
      <span class="hljs-comment"># enable external object storage</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">S3</span> <span class="hljs-comment"># MinIO | S3</span>
      <span class="hljs-comment"># the endpoint of AWS S3</span>
      <span class="hljs-attr">endpoint:</span> <span class="hljs-string">s3.amazonaws.com:443</span>
      <span class="hljs-comment"># the secret storing the access key and secret key</span>
      <span class="hljs-attr">secretRef:</span> <span class="hljs-string">&quot;my-release-s3-secret&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>AssumeRoleによるAWS S3アクセスの設定</p>
<p>また、Milvusが<a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRoleを</a>使用してAWS S3バケットにアクセスするように設定することで、実際のAK/SKの代わりに一時的な認証情報のみを使用することもできます。</p>
<p>この場合、AWSコンソールでロールを準備し、ARNを取得する必要があります。ARNは通常<code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code> の形式です。</p>
<p>次に、<code translate="no">ServiceAccount</code> オブジェクトを作成し、以下のように Kubernetes に格納する：</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">ServiceAccount</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-sa</span>
  <span class="hljs-attr">annotations:</span>
    <span class="hljs-attr">eks.amazonaws.com/role-arn:</span> <span class="hljs-string">&lt;my-role-arn&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>すべての設定が完了したら、テンプレートYAMLファイルで上記の<code translate="no">ServiceAccount</code> を参照し、<code translate="no">spec.config.minio.useIAM</code> を<code translate="no">true</code> に設定してAssumeRoleを有効にする。</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-comment"># use the above ServiceAccount</span>
    <span class="hljs-attr">serviceAccountName:</span> <span class="hljs-string">my-release-sa</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">minio:</span>
      <span class="hljs-comment"># enable AssumeRole</span>
      <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">storage:</span>
      <span class="hljs-comment"># Omit other fields ...</span>
      <span class="hljs-comment"># <span class="hljs-doctag">Note:</span> you must use regional endpoint here, otherwise the minio client that milvus uses will fail to connect</span>
      <span class="hljs-attr">endpoint:</span> <span class="hljs-string">s3.&lt;my-bucket-region&gt;.amazonaws.com:443</span>
      <span class="hljs-attr">secretRef:</span> <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># we don&#x27;t need to specify the secret here</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">外部オブジェクトストレージとしてGoogle Cloud Storage（GCS）を使用する</h4><p>AWS S3オブジェクトストレージだけが唯一の選択肢ではない。Google Cloudのような他のパブリッククラウドプロバイダーのオブジェクトストレージサービスを使用することもできます。</p>
<ul>
<li><p>AK/SKによるGCSアクセスの設定</p>
<p>設定はAWS S3を使用する場合とほぼ同様である。Kubernetesに認証情報を保存するために、<code translate="no">Secret</code> オブジェクトを作成する必要がある。</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Secret</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-gcp-secret</span>
<span class="hljs-attr">type:</span> <span class="hljs-string">Opaque</span>
<span class="hljs-attr">stringData:</span>
  <span class="hljs-attr">accesskey:</span> <span class="hljs-string">&lt;my-access-key&gt;</span>
  <span class="hljs-attr">secretkey:</span> <span class="hljs-string">&lt;my-secret-key&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>その後、<code translate="no">endpoint</code> を<code translate="no">storage.googleapis.com:443</code> に変更し、<code translate="no">spec.config.minio.cloudProvider</code> を<code translate="no">gcp</code> に設定するだけです：</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">minio:</span>
      <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">gcp</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">storage:</span>
      <span class="hljs-comment"># Omit other fields ...</span>
      <span class="hljs-attr">endpoint:</span> <span class="hljs-string">storage.googleapis.com:443</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>AssumeRoleによるGCSアクセスの設定</p>
<p>AWS S3と同様に、KubernetesクラスタとしてGKEを使用している場合は、<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload Identityを</a>使用して一時的な認証情報でGCSにアクセスすることもできます。</p>
<p><code translate="no">ServiceAccount</code> のアノテーションはAWS EKSとは異なります。ロールARNの代わりにGCPサービスアカウント名を指定する必要があります。</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">ServiceAccount</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-sa</span>
  <span class="hljs-attr">annotations:</span>
    <span class="hljs-attr">iam.gke.io/gcp-service-account:</span> <span class="hljs-string">&lt;my-gcp-service-account-name&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>そして、Milvusインスタンスに上記<code translate="no">ServiceAccount</code> を使用するように設定し、以下のように<code translate="no">spec.config.minio.useIAM</code> を<code translate="no">true</code> に設定することでAssumeRoleを有効にすることができます：</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-comment"># use the above ServiceAccount</span>
    <span class="hljs-attr">serviceAccountName:</span> <span class="hljs-string">my-release-sa</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">minio:</span>
      <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">gcp</span>
      <span class="hljs-comment"># enable AssumeRole</span>
      <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Omit other fields ...  </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operatorを使用して他のMilvus依存関係を設定する方法について説明します：</p>
<ul>
<li><a href="/docs/ja/meta_storage_operator.md">Milvus OperatorによるMeta Storageの設定</a></li>
<li><a href="/docs/ja/message_storage_operator.md">Milvus Operatorによるメッセージストレージの設定</a></li>
</ul>
