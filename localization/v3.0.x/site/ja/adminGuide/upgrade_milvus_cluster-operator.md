---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Milvus Operator を使用して Milvus クラスターをアップグレードする方法について学びましょう。
title: Milvus Operator を使用した Milvus クラスタのアップグレード
---
<div class="tab-wrapper"><a href="/docs/ja/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/ja/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Milvus Operator を使用した Milvus クラスタのアップグレード<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Milvus Operator を使用して Milvus 2.6.x クラスターを v3.0-beta にアップグレードする方法について説明します。</p>
<div class="alert note">
<p>この手順は、Milvus 2.6.20 から Milvus v3.0-beta へのアップグレードについて、Milvus Operator 1.3.0、MixCoord、StreamingNode、Woodpecker、クラスタ内の etcd、およびクラスタ内の MinIO を使用して検証済みです。 これ以外の Milvus 2.6.x パッチリリース、Operator のバージョン、コンポーネントのトポロジー、メッセージキュー、または依存関係の設定を使用している場合は、まず本番環境以外の環境でアップグレードの検証を行ってください。</p>
</div>
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
    </button></h2><ul>
<li>Milvus Operator によって管理される Milvus 2.6.x クラスターを備えた Kubernetes クラスター</li>
<li><code translate="no">kubectl</code> クラスターへのアクセス権</li>
<li>既存のデプロイに使用されている完全な Milvus カスタムリソース (CR) マニフェスト</li>
<li>既存の Milvus Operator で使用されているインストール方法およびマニフェスト</li>
<li>Milvus メタデータおよび永続データの最新のバックアップ</li>
</ul>
<p><strong>メッセージキューの制限事項</strong>：Milvus v3.0-beta へのアップグレード時には、現在のメッセージキューの選択を維持する必要があります。アップグレード中に異なるメッセージキューシステムへ切り替えることはサポートされていません。メッセージキューシステムの変更に対するサポートは、将来のバージョンで提供される予定です。</p>
<div class="alert warning">
<p>このアップグレードには、完全なMilvus CRを適用してください。イメージのみのマージパッチは使用しないでください。Operatorは、省略されたレプリカ数0のコンポーネントフィールドをデフォルト値に設定することがあり、これにより、既存の2.6.xデプロイメントで無効化されていたコンポーネントが再有効化される可能性があります。</p>
<p>この手順では、Milvus イメージを 2.6.x に戻すことによるダウングレードやロールバックの妥当性は検証されません。 v3.0-beta がデータを書き込んだ後、イメージのみのロールバックでは、更新された状態を読み取れない場合があります。アップグレードに失敗した場合は、書き込みを停止し、アップグレード前のメタデータおよび永続データのバックアップを復元するリカバリ計画を使用してください。リカバリ計画は、まず本番環境以外で検証してください。</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">アップグレード手順<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Back-up-the-current-Milvus-CR" class="common-anchor-header">ステップ 1: 現在の Milvus CR をバックアップする<button data-href="#Step-1-Back-up-the-current-Milvus-CR" class="anchor-icon" translate="no">
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
    </button></h3><p>デプロイメントを変更する前に、現在のCRを保存してください:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output yaml &gt; milvus-before-upgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<p>既存のデプロイメントのソースマニフェストをアップグレード用マニフェストとして使用します。サーバー管理のメタデータおよびステータスフィールドを事前に削除せずに、エクスポートされたバックアップファイルを直接適用しないでください。</p>
<h3 id="Step-2-Confirm-the-Milvus-Operator-version" class="common-anchor-header">ステップ 2: Milvus Operator のバージョンを確認する<button data-href="#Step-2-Confirm-the-Milvus-Operator-version" class="anchor-icon" translate="no">
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
    </button></h3><p>インストール済みの Milvus Operator で使用されているイメージを確認します:</p>
<pre><code translate="no" class="language-bash">kubectl get deployments --all-namespaces \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.namespace}{&quot;\t&quot;}{.metadata.name}{&quot;\t&quot;}{range .spec.template.spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span> \
  | grep milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>検証済みのアップグレードでは、Milvus Operatorのバージョンは1.3.0のまま維持されました。サポートポリシーで別途Operatorのアップグレードが求められていない限り、現在Milvus 2.6.xデプロイメントを管理しているOperatorのバージョンを維持してください。 新しいバージョンのOperatorを、テスト済みのバージョンにダウングレードしないでください。Operatorのバージョンを変更する必要がある場合は、既存のインストールと同じHelmまたは<code translate="no">kubectl</code> によるインストール方法、および同じリリース名とネームスペースを使用し、Milvus CRを更新する前にOperatorの変更を検証してください。</p>
<h3 id="Step-3-Update-the-Milvus-image" class="common-anchor-header">ステップ 3: Milvus イメージの更新<button data-href="#Step-3-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>完全な Milvus CR マニフェスト内で、<code translate="no">spec.components.image</code> を対象バージョンに変更してください。現在のモード、コンポーネントのトポロジー、メッセージキュー、etcd、ストレージ、およびその他の依存関係の設定は維持してください。以下の抜粋は確認すべきフィールドを示しています。CR 全体をこの抜粋で置き換えないでください。</p>
<p>対象のCRを適用する前に、<code translate="no">indexNode.replicas</code> が<code translate="no">0</code> であることを確認してください。検証済みのMilvus 2.6.20構成では、すでにこの設定が使用されていました。対象のCRでは、明示的なレプリカ数0の設定を維持してください。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">&lt;instance-name&gt;</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">&lt;namespace&gt;</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0-beta</span>
    <span class="hljs-attr">indexNode:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p>CRマニフェスト全体を適用します：</p>
<pre><code translate="no" class="language-bash">kubectl apply --filename milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-upgrade" class="common-anchor-header">アップグレードの確認<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>CRのステータス、Podのステータス、およびコンテナイメージを確認します:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output jsonpath=<span class="hljs-string">&#x27;{.status.status}{&quot;\t&quot;}{.status.currentImage}{&quot;\n&quot;}&#x27;</span>

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CRが<code translate="no">Healthy</code> を報告していること、すべてのMilvusコンポーネントが<code translate="no">milvusdb/milvus:v3.0-beta</code> を使用していること、IndexNodeポッドが実行されていないこと、および既存のコレクションが引き続きクエリおよび検索可能であることを確認してください。v3.0-beta固有の機能を有効にする前に、これらの確認を完了してください。</p>
