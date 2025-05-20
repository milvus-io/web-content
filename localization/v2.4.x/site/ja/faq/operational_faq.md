---
id: operational_faq.md
summary: Milvusでの業務に関するよくある質問と回答をご覧いただけます。
title: 運用に関するFAQ
---
<h1 id="Operational-FAQ" class="common-anchor-header">運用に関するFAQ<button data-href="#Operational-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="What-if-I-failed-to-pull-the-Milvus-Docker-image-from-Docker-Hub" class="common-anchor-header">Docker HubからのMilvus Dockerイメージのpullに失敗した場合は？</h4><p>Docker HubからのMilvus Dockerイメージの引き抜きに失敗した場合は、他のレジストリミラーを追加してみてください。</p>
<p>中国本土のユーザは、<strong>/etc.docker/daemon.jsonの</strong>registry-mirrors配列に "https://registry.docker-cn.com "というURLを追加することができます。</p>
<pre><code translate="no">{
  <span class="hljs-string">&quot;registry-mirrors&quot;</span>: [<span class="hljs-string">&quot;https://registry.docker-cn.com&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Is-Docker-the-only-way-to-install-and-run-Milvus" class="common-anchor-header">Milvusをインストールし、実行する唯一の方法はDockerですか？</h4><p>DockerはMilvusの効率的なデプロイ方法ですが、唯一の方法ではありません。ソースコードからMilvusをデプロイすることもできます。これにはUbuntu (18.04以上) または CentOS (7以上) が必要です。詳しくは<a href="https://github.com/milvus-io/milvus#build-milvus-from-source-code">Milvusをソースコードからビルドするを</a>ご覧ください。</p>
<h4 id="What-are-the-main-factors-affecting-recall" class="common-anchor-header">再現率に影響を与える主な要因は何ですか?</h4><p>検索結果は主にインデックスタイプと検索パラメータに影響されます。</p>
<p>FLATインデックスの場合、Milvusはコレクション内を網羅的にスキャンし、100%の検索結果を返します。</p>
<p>IVFインデックスでは、nprobeパラメータがコレクション内の検索範囲を決定します。nprobeを増加させると、検索されるベクトルの割合が増加し、リコールが増加しますが、クエリ性能は低下します。</p>
<p>HNSWインデックスでは、efパラメータがグラフ検索の幅を決定する。efを増加させると、グラフ上で検索されるポイント数が増加し、リコールも増加しますが、クエリ性能は低下します。</p>
<p>詳細については、<a href="https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">ベクトル・インデックスを</a>参照してください。</p>
<h4 id="Why-did-my-changes-to-the-configuration-files-not-take-effect" class="common-anchor-header">設定ファイルを変更しても反映されません。</h4><p>Milvusは実行中の設定ファイルの変更をサポートしていません。設定ファイルの変更を有効にするには、Milvus Dockerを再起動する必要があります。</p>
<h4 id="How-do-I-know-if-Milvus-has-started-successfully" class="common-anchor-header">Milvusが正常に起動したかどうかはどのように確認できますか？</h4><p>Docker Composeを使用してMilvusを起動した場合、<code translate="no">docker ps</code> 、実行中のDockerコンテナ数を確認し、Milvusのサービスが正常に起動したかどうかを確認してください。</p>
<p>Milvusスタンドアロンの場合、少なくとも3つのDockerコンテナが動作していることが確認できるはずです。1つはMilvusサービス、残りの2つはetcd管理とストレージサービスです。詳細については、<a href="/docs/ja/v2.4.x/install_standalone-docker.md">Milvusスタンドアロンのインストールを</a>参照してください。</p>
<h4 id="Why-is-the-time-in-the-log-files-different-from-the-system-time" class="common-anchor-header">ログファイルの時刻がシステム時刻と異なるのはなぜですか？</h4><p>時間の違いは通常、ホストマシンが協定世界時(UTC)を使用していないことが原因です。</p>
<p>Dockerイメージ内のログファイルはデフォルトでUTCを使用しています。ホストマシンがUTCを使用していない場合、この問題が発生する可能性があります。</p>
<h4 id="How-do-I-know-if-my-CPU-supports-Milvus" class="common-anchor-header">自分のCPUがMilvusに対応しているかどうかは、どうすれば分かりますか？</h4><p>Milvusの演算処理は、CPUがSIMD(Single Instruction, Multiple Data)拡張命令セットをサポートしているかどうかに依存します。お使いのCPUがSIMD拡張命令セットに対応しているかどうかは、Milvusのインデックス構築およびベクトル類似検索において非常に重要です。CPUが以下のSIMD命令セットの少なくとも1つをサポートしていることを確認してください：</p>
<ul>
<li>SSE4.2</li>
<li>AVX</li>
<li>AVX2</li>
<li>AVX512</li>
</ul>
<p>lscpuコマンドを実行し、CPUが上記のSIMD命令セットをサポートしているか確認してください：</p>
<pre><code translate="no">$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-does-Milvus-return-illegal-instruction-during-startup" class="common-anchor-header">Milvusが起動中に<code translate="no">illegal instruction</code> 。</h4><p>MilvusはCPUがSIMD命令セットをサポートしている必要があります：SSE4.2、AVX、AVX2、またはAVX512です。Milvusが正常に動作するためには、CPUがこれらのうち少なくとも1つをサポートしている必要があります。起動時に返される<code translate="no">illegal instruction</code> のエラーは、CPUが上記4つの命令セットのいずれにも対応していないことを示唆しています。</p>
<p><a href="/docs/ja/v2.4.x/prerequisite-docker.md">CPUのSIMD命令セット対応</a>状況をご覧ください。</p>
<h4 id="Can-I-install-Milvus-on-Windows" class="common-anchor-header">MilvusをWindowsにインストールできますか？</h4><p>MilvusをWindowsにインストールするには、ソースコードからコンパイルする方法とバイナリパッケージからコンパイルする方法があります。</p>
<p>WindowsにMilvusをインストールする方法については「<a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">WindowsでMilvusを動かす</a>」を参照してください。</p>
<h4 id="I-got-an-error-when-installing-pymilvus-on-Windows-What-shall-I-do" class="common-anchor-header">Windowsにpymilvusをインストールする際にエラーが発生しました。どうすればよいですか？</h4><p>WindowsにPyMilvusをインストールすることは推奨されません。しかし、WindowsにPyMilvusをインストールしなければならないのにエラーが出る場合は、<a href="https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html">Conda</a>環境にインストールしてみてください。Conda環境にPyMilvusをインストールする方法については、<a href="/docs/ja/v2.4.x/install-pymilvus.md">Milvus SDKのインストールを</a>参照してください。</p>
<h4 id="Can-I-deploy-Milvus-when-disconnected-from-the-Internet" class="common-anchor-header">Milvusはインターネットに接続していない状態でもデプロイできますか？</h4><p>Milvusはオフライン環境でインストールすることができます。詳細は<a href="/docs/ja/v2.4.x/install_offline-helm.md">Milvusのオフラインインストールを</a>参照してください。</p>
<h4 id="Where-can-I-find-the-logs-generated-by-Milvus" class="common-anchor-header">Milvusが生成したログはどこにありますか?</h4><p>Milvusのログはデフォルトでstout(標準出力)とstderr(標準エラー)に出力されますが、本番環境ではログを永続ボリュームにリダイレクトすることを強く推奨します。そのためには、<strong>milvus.yamlの</strong> <code translate="no">log.file.rootPath</code> 。また、milvusを<code translate="no">milvus-helm</code> チャートでデプロイする場合、<code translate="no">--set log.persistence.enabled=true</code> を使ってログの永続化を有効にする必要があります。</p>
<p>設定を変更していない場合は、kubectl logs &lt;pod-name&gt;やdocker logs CONTAINERを使ってもログを見つけることができます。</p>
<h4 id="Can-I-create-index-for-a-segment-before-inserting-data-into-it" class="common-anchor-header">セグメントにデータを挿入する前にインデックスを作成できますか？</h4><p>はい、できます。しかし、各セグメントにインデックスを作成する前に、256MBを超えない範囲でまとめてデータを挿入することをお勧めします。</p>
<h4 id="Can-I-share-an-etcd-instance-among-multiple-Milvus-instances" class="common-anchor-header">複数のMilvusインスタンス間でetcdインスタンスを共有できますか？</h4><p>複数のMilvusインスタンス間でetcdインスタンスを共有することは可能です。そのためには、Milvusインスタンスを起動する前に、各Milvusインスタンスの設定ファイルで<code translate="no">etcd.rootPath</code> を別々の値に変更する必要があります。</p>
<h4 id="Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances" class="common-anchor-header">複数のMilvusインスタンス間でPulsarインスタンスを共有できますか？</h4><p>はい、複数のMilvusインスタンス間でPulsarインスタンスを共有することができます。そのためには</p>
<ul>
<li>Pulsarインスタンスでマルチ・テナントが有効になっている場合は、Milvusインスタンスごとに個別のテナントまたはネームスペースを割り当てることを検討してください。そのためには、Milvusインスタンスを起動する前に、Milvusインスタンスの設定ファイル内の<code translate="no">pulsar.tenant</code> または<code translate="no">pulsar.namespace</code> をそれぞれ固有の値に変更する必要があります。</li>
<li>Pulsarインスタンスでマルチテナントを有効にする予定がない場合は、Milvusインスタンスを起動する前に、Milvusインスタンスの構成ファイル内の<code translate="no">msgChannel.chanNamePrefix.cluster</code> 。</li>
</ul>
<h4 id="Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances" class="common-anchor-header">複数のMilvusインスタンス間でMinIOインスタンスを共有できますか？</h4><p>はい、複数のMilvusインスタンス間でMinIOインスタンスを共有することができます。そのためには、Milvusインスタンスを起動する前に、それぞれのMilvusインスタンスの設定ファイルで、<code translate="no">minio.rootPath</code> を一意な値に変更する必要があります。</p>
<h4 id="How-do-I-handle-the-error-message-pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345" class="common-anchor-header">エラーメッセージ<code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code> の対処方法は?</h4><p>エラーメッセージ<code translate="no">Illegal uri [example.db]</code> は、この接続タイプをサポートしていない以前のバージョンのPyMilvusを使ってMilvus Liteに接続しようとしていることを示しています。この問題を解決するには、インストールしたPyMilvusを、Milvus Liteへの接続がサポートされているバージョン2.4.2以上にアップグレードしてください。</p>
<p>PyMilvus は以下のコマンドでアップグレードできます：</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-am-I-getting-fewer-results-than-the-limit-I-set-in-my-searchquery" class="common-anchor-header">検索/クエリで設定した<code translate="no">limit</code> より少ない結果しか得られないのはなぜですか？</h4><p>指定した<code translate="no">limit</code> より少ない結果しか得られない理由はいくつかあります：</p>
<ul>
<li><p><strong>データが限られている</strong>：限られたデータ： コレクションには、要求した制限を満たすのに十分なエンティティがない可能性があります。コレクション内のエンティティの総数が制限を下回ると、当然、結果の数も少なくなります。</p></li>
<li><p><strong>主キーの重複</strong>：Milvusは、検索中に主キーの重複に遭遇した場合、特定のエンティティを優先します。この動作は検索タイプによって異なります：</p></li>
<li><p><strong>クエリ (完全一致)：</strong>ANN検索：Milvusは、同じPKを持つエンティティであっても、最も高い類似度スコアを持つエンティティを選択します。 この優先順位付けにより、重複する主キーが多いコレクションでは、ユニークな検索結果が制限数より少なくなる可能性があります。</p></li>
<li><p><strong>不十分な一致</strong>：検索フィルタリング式が厳しすぎるため、類似度のしきい値を満たすエンティティが少なくなっている可能性があります。検索に設定する条件が厳しすぎると、一致するエンティティが少なくなり、期待される結果よりも少なくなります。</p></li>
</ul>
<h4 id="MilvusClientmilvusdemodb-gives-an-error-ModuleNotFoundError-No-module-named-milvuslite-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">MilvusClient(&quot;milvus_demo.db&quot;) gives an error: ModuleNotFoundError: No module named 'milvus_lite'</code>.このエラーの原因と解決方法を教えてください。</h4><p>このエラーはMilvus LiteをWindowsプラットフォームで使用しようとした場合に発生します。Milvus Liteは主にLinux環境向けに設計されており、Windowsをネイティブサポートしていない可能性があります。</p>
<p>解決策としては、Linux環境を利用することです：</p>
<ul>
<li>Linuxベースのオペレーティングシステムまたは仮想マシンを使用してMilvus Liteを実行してください。</li>
<li>この方法により、ライブラリの依存関係や機能との互換性を確保することができます。</li>
</ul>
<h4 id="What-are-the-length-exceeds-max-length-errors-in-Milvus-and-how-can-they-be-understood-and-addressed" class="common-anchor-header">Milvusの "length exceeds max length "エラーとは何ですか？</h4><p>Milvusの "Length exceeds max length "エラーは、データ要素のサイズがコレクションまたはフィールドの最大許容サイズを超えた場合に発生します。以下はその例と説明です：</p>
<ul>
<li><p>JSONフィールドエラー<code translate="no">&lt;MilvusException: (code=1100, message=the length (398324) of json field (metadata) exceeds max length (65536): expected=valid length json string, actual=length exceeds max length: invalid parameter)&gt;</code></p></li>
<li><p>文字列長エラー：<code translate="no">&lt;ParamError: (code=1, message=invalid input, length of string exceeds max length. length: 74238, max length: 60535)&gt;</code></p></li>
<li><p>VarChar フィールドエラー：<code translate="no">&lt;MilvusException: (code=1100, message=the length (60540) of 0th VarChar paragraph exceeds max length (0)%!(EXTRA int64=60535): invalid parameter)&gt;</code></p></li>
</ul>
<p>これらのエラーを理解し、対処する：</p>
<ul>
<li>Pythonの<code translate="no">len(str)</code> はバイト数ではなく文字数を表すことを理解してください。</li>
<li>VARCHARやJSONのような文字列ベースのデータ型では、<code translate="no">len(bytes(str, encoding='utf-8'))</code> 、Milvusが &quot;max-length &quot;に使用している実際のサイズをバイト単位で判断してください。</li>
</ul>
<p>Pythonでの例</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Python Example: result of len() str cannot be used as &quot;max-length&quot; in Milvus </span>
<span class="hljs-meta">&gt;&gt;&gt; </span>s = <span class="hljs-string">&quot;你好，世界！&quot;</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(s) <span class="hljs-comment"># Number of characters of s.</span>
<span class="hljs-number">6</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(<span class="hljs-built_in">bytes</span>(s, <span class="hljs-string">&quot;utf-8&quot;</span>)) <span class="hljs-comment"># Size in bytes of s, max-length in Milvus.</span>
<span class="hljs-number">18</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Still-have-questions" class="common-anchor-header">まだ質問がありますか？</h4><p>できます：</p>
<ul>
<li>GitHubで<a href="https://github.com/milvus-io/milvus/issues">Milvusを</a>チェックしてください。自由に質問したり、アイデアを共有したり、他の人を助けたりしてください。</li>
<li>私たちの<a href="https://discord.com/invite/8uyFbECzPX">Discordサーバーに</a>参加して、サポートを探したり、私たちのオープンソースコミュニティに参加してください。</li>
</ul>
