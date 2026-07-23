---
id: switch-pulsar-woodpecker.md
title: Pulsar と Woodpecker の切り替え
summary: >-
  Helm または Milvus Operator を使用して、Milvus クラスタのメッセージキューを Pulsar と Woodpecker
  の間で切り替えます。
---
<h1 id="Switch-between-Pulsar-and-Woodpecker" class="common-anchor-header">Pulsar と Woodpecker の切り替え<button data-href="#Switch-between-Pulsar-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、<strong>Milvusクラスタの</strong>メッセージキュー（MQ）を、<strong>Pulsar</strong>（組み込みまたは外部）<strong>とWoodpecker</strong>（MinIOバックエンド）の間で双方向に切り替える方法について説明します。一般的なワークフローと前提条件については、<a href="/docs/ja/switch-mq-type.md">「MQタイプの切り替え</a>」を参照してください。</p>
<div class="alert note">
<p><strong>前提条件：</strong>MQの切り替え機能は<strong>、Milvus 3.0以降で</strong>利用可能です。作業を開始する前に、MilvusインスタンスをMilvus 3.0以降にアップグレードしてください。以前のバージョンではこの機能は利用できません。</p>
</div>
<div class="alert warning">
<p>メッセージキューの切り替えは、<strong>リスクの高い操作</strong>です。<strong>ご自身の</strong>デプロイ方法（<strong>Helm を使用する場合</strong>、または<strong>Milvus Operator を使用する場合</strong>）に該当するセクションを選択し、その手順を最初から最後まで順を追って実行してください。Helm コマンドと Operator コマンドを混在させないでください。</p>
</div>
<h2 id="With-Helm" class="common-anchor-header">Helm を使用する場合<button data-href="#With-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Helm" class="common-anchor-header">Pulsar から Woodpecker への切り替え（Helm）<button data-href="#Switch-from-Pulsar-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>ステップ 1: Milvus インスタンスが実行中であることを確認します。</strong>テストコレクションの作成、データの挿入、クエリの実行などを行い、Milvus クラスタが正常に動作していることを確認してください。</p>
<p><strong>ステップ 2: MQ の切り替えを実行します。</strong>MixCoord 管理インターフェースを公開し、switch API を呼び出します:</p>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>別のターミナルで：</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>ステップ 3: 切り替えが完了したことを確認します。</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>切り替えが成功すると、<code translate="no">[mqTypeValue=woodpecker]</code> というログが出力されます。</p>
<p><strong>ステップ 4: (オプション) Pulsar を停止し、クリーンアップを行います。</strong> <strong>組み込みの</strong>Pulsar の場合、Pulsar を無効にして Woodpecker を有効にした後、Pulsar の PVC を削除します:</p>
<pre><code translate="no" class="language-shell">helm upgrade my-release zilliztech/milvus \
  --set image.all.tag=v3.0-beta \
  --set pulsarv3.enabled=false \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl get pvc | grep my-release-pulsarv3
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p><strong>外部</strong>Pulsarの場合は、外部Pulsarインスタンス内のMilvusトピックをクリーンアップします。Milvusトピックは<code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> という形式に従います（例：<code translate="no">by-dev-rootcoord-dml_10_464633776992639586v0</code> ）。</p>
<div class="alert note">
<p>後でPulsarに戻す予定がある場合は、競合を避けるために、まずデータやトピックをクリーンアップしてください。Helmチャートの制限により、現在、<strong>組み込みの</strong>Pulsarインスタンスに戻すことはできません。</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Helm" class="common-anchor-header">Woodpecker から Pulsar への切り替え (Helm)<button data-href="#Switch-from-Woodpecker-to-Pulsar-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>ステップ 1: Milvus インスタンスが実行中であることを確認します。</strong></p>
<p><strong>ステップ 2: 対象の Pulsar 接続を設定し、Milvus を再起動します。</strong>切り替えを行うには、Milvus がすでに Pulsar 接続を認識している必要があるため、<code translate="no">extraConfigFiles</code> 経由で<code translate="no">user.yaml</code> に書き込み、<code translate="no">helm upgrade</code> で適用します（これによりポッドが再起動されます）。Switch MQ 機能を利用するには、<code translate="no">streaming.enabled=true</code> が必要です。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># values.yaml</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: &lt;pulsar addr&gt;
      port: &lt;pulsar port, e.g. 6650&gt;
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release zilliztech/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>すべてのポッドの準備が整うまで待機し、Pulsar アクセス設定が Milvus の設定に反映されていることを確認します。</p>
<p><strong>ステップ 3: MQ スイッチを実行します。</strong></p>
<div class="alert note">
<p>対象のPulsarに、以前の設定からのMilvusトピックが含まれていないことを確認してください。今回がPulsarへの初めての切り替えである場合は、この注意事項をスキップしてください。そうでない場合は、まず同じ名前の残存するMilvusトピックをクリーンアップしてください。</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>別のターミナルで：</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>ステップ 4: 切り替えが完了したことを確認します。</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>切り替えが成功すると、<code translate="no">[mqTypeValue=pulsar]</code> というログが出力されます。</p>
<p><strong>ステップ 5: (オプション) Woodpecker データのクリーンアップを行います。</strong>MinIO/S3 上の Woodpecker データ（<code translate="no">&lt;rootPath&gt;/wp/...</code> 配下、通常は<code translate="no">files/wp/...</code> ）および etcd 内の Woodpecker メタデータ（<code translate="no">etcdctl get woodpecker --prefix</code> ）を削除します。後で Woodpecker に戻す予定がある場合は、まずこれらのファイルをクリーンアップしてください。</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">Milvus Operator を使用する場合<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="common-anchor-header">Pulsar から Woodpecker への切り替え（Milvus Operator）<button data-href="#Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>ステップ 1: Milvus インスタンスが実行中であることを確認します。</strong></p>
<p><strong>ステップ 2: MQ の切り替えを実行します。</strong>MixCoord サービスは外部からアクセスできないため、MixCoord ポッド内部から切り替え API を実行してください:</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>ステップ 3: 切り替えが完了したことを確認します。</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>切り替えが成功すると、<code translate="no">[mqTypeValue=woodpecker]</code> がログに記録されます。</p>
<p><strong>ステップ 4: Operator 内の MQ タイプを更新します。</strong>Operator が切り替えを元に戻さないように、<strong>Operator</strong>が管理する設定を更新します<strong>。</strong> <code translate="no">change_configmap.yaml</code> を作成します:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p><strong>ステップ 5: (オプション) Pulsar を停止し、クリーンアップを行います。</strong> <strong>組み込みの</strong>Pulsar の場合、Pulsar リリースをアンインストールし、その PVC を削除します:</p>
<pre><code translate="no" class="language-shell">helm uninstall my-release-pulsar
kubectl get pvc | grep my-release-pulsar
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p><strong>外部</strong>Pulsarの場合は、Milvusトピックをクリーンアップします（<code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> 形式）。</p>
<div class="alert note">
<p>後でPulsarに戻す予定がある場合は、競合を避けるために、まずデータやトピックをクリーンアップしてください。Helmチャートの制限により、現在、<strong>組み込みの</strong>Pulsarインスタンスに戻すことはできません。</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="common-anchor-header">Woodpecker から Pulsar への切り替え（Milvus Operator）<button data-href="#Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>ステップ 1: Milvus インスタンスが実行中であることを確認します。</strong></p>
<p><strong>ステップ 2: 対象の Pulsar 接続を設定し、Milvus を再起動します。</strong>Pulsar 接続<strong>を</strong>`<code translate="no">spec.config</code> ` に配置し（Operator は `<code translate="no">spec.config</code> ` を `<code translate="no">user.yaml</code>` に変換します）、MQ タイプを設定します。CR を適用すると、新しい構成でポッドが再起動されます。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change_configmap.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">addr&gt;</span>
      <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">port,</span> <span class="hljs-string">e.g.</span> <span class="hljs-number">6650</span><span class="hljs-string">&gt;
  dependencies:
    msgStreamType: pulsar
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p>すべてのポッドが「ready」状態になるのを待ち、Pulsar アクセス設定が Milvus 設定に反映されていることを確認します。</p>
<p><strong>ステップ 3: MQ の切り替えを実行します。</strong></p>
<div class="alert note">
<p>対象のPulsarに、以前の設定からのMilvusトピックが含まれていないことを確認してください。今回がPulsarへの初めての切り替えである場合は、この注意事項をスキップしてください。そうでない場合は、まず同じ名前の残存するMilvusトピックをクリーンアップしてください。</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>ステップ 4: 切り替えが完了したことを確認します。</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>切り替えが成功すると、<code translate="no">[mqTypeValue=pulsar]</code> というログが出力されます。</p>
<p><strong>ステップ 5: (オプション) Woodpecker データのクリーンアップ。</strong>MinIO/S3 上の Woodpecker データ（<code translate="no">&lt;rootPath&gt;/wp/...</code> 配下、通常は<code translate="no">files/wp/...</code> ）および etcd 内の Woodpecker メタデータ（<code translate="no">etcdctl get woodpecker --prefix</code> ）を削除します。後で Woodpecker に切り戻す予定がある場合は、まずこれらのファイルをクリーンアップしてください。</p>
<h2 id="Supported-scenarios" class="common-anchor-header">サポートされるシナリオ<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>ソースMQ</th><th>ターゲットMQ</th><th>Helm</th><th>Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>組み込みPulsar</td><td>Woodpecker (MinIO)</td><td><strong>サポート対象</strong></td><td><strong>サポート対象</strong></td></tr>
<tr><td>外部 Pulsar</td><td>Woodpecker (MinIO)</td><td><strong>対応</strong></td><td><strong>対応</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>External Pulsar</td><td><strong>対応</strong></td><td><strong>対応</strong></td></tr>
<tr><td>Pulsar</td><td>Woodpecker (ローカル)</td><td><strong>サポートされていますが、推奨されません</strong>（すべてのポッドで共有ファイルシステムが必要です）</td><td><strong>未対応</strong></td></tr>
</tbody>
</table>
