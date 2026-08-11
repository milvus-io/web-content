---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: Milvus Standalone をインストールする前に、必要な準備について確認してください。
title: Milvus Standalone のインストール要件
---
<h1 id="Requirements-for-Installing-Milvus-Standalone" class="common-anchor-header">Milvus Standalone のインストール要件<button data-href="#Requirements-for-Installing-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Standalone インスタンスをインストールする前に、お使いのハードウェアおよびソフトウェアが要件を満たしているか確認してください。</p>
<h2 id="Hardware-requirements" class="common-anchor-header">ハードウェア要件<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
<tr><th>コンポーネント</th><th>要件</th><th>推奨</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>第2世代 Intel Core CPU 以上</li><li>Apple Silicon</li></ul></td><td><ul><li>スタンドアロン：4コア以上</li><li>クラスター：8コア以上</li></ul></td><td></td></tr>
<tr><td>CPU命令セット</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Milvus でのベクトル類似性検索およびインデックス構築には、CPU が単一命令・複数データ (SIMD) 拡張セットをサポートしている必要があります。お使いの CPU が、記載されている SIMD 拡張機能のうち少なくとも 1 つをサポートしていることを確認してください。詳細については、「<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">AVX 対応 CPU</a>」を参照してください。</td></tr>
<tr><td>RAM</td><td><ul><li>スタンドアロン：8G</li><li>クラスタ：32G</li></ul></td><td><ul><li>スタンドアロン：16G</li><li>クラスタ：128G</li></ul></td><td>RAMの容量はデータ量によって異なります。</td></tr>
<tr><td>ハードドライブ</td><td>SATA 3.0 SSD 以上</td><td>NVMe SSD 以上</td><td>ハードドライブの容量は、データ量によって異なります。</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">ソフトウェア要件<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<tr><th>オペレーティングシステム</th><th>ソフトウェア</th><th>注</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14 以降</td><td>Docker Desktop</td><td>Docker 仮想マシン (VM) の設定で、仮想 CPU (vCPU) を 2 つ以上、初期メモリを 8 GB 以上にするようにしてください。そうしないと、インストールに失敗する可能性があります。<br/>詳細については、「<a href="https://docs.docker.com/desktop/mac/install/">Mac への Docker Desktop のインストール</a>」を参照してください。</td></tr>
<tr><td>Linuxプラットフォーム</td><td><ul><li>Docker 19.03 以降</li><li>Docker Compose 1.25.1 以降</li></ul></td><td>詳細については、「<a href="https://docs.docker.com/engine/install/">Docker Engineのインストール</a>」および「<a href="https://docs.docker.com/compose/install/">Docker Composeのインストール</a>」を参照してください。</td></tr>
<tr><td>WSL 2 が有効になっている Windows</td><td>Docker Desktop</td><td>Linux コンテナにバインドマウントされたソースコードやその他のデータは、Windows ファイルシステムではなく、Linux ファイルシステムに保存することをお勧めします。<br/>詳細については、「<a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">WSL 2 バックエンドを使用した Windows への Docker Desktop のインストール</a>」を参照してください。</td></tr>
</tbody>
</table>
<p>Docker スクリプトまたは Docker Compose 構成を使用して Milvus Standalone をインストールすると、以下の依存関係が自動的に取得および設定されます:</p>
<table>
<thead>
<tr><th>ソフトウェア</th><th>バージョン</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td><a href="#Additional-disk-requirements">追加のディスク要件を</a>参照してください。</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>Milvus に同梱</td><td>デフォルトのメッセージキュー（組み込み）。別途インストールするサービスはありません。</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>オプション — メッセージキューを Pulsar に切り替える場合のみ。デフォルトではインストールされません。</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">追加のディスク要件<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>ディスクのパフォーマンスは etcd にとって極めて重要です。ローカルの NVMe SSD を使用することを強く推奨します。ディスクの応答が遅いと、クラスタのエレクトションが頻繁に行われる原因となり、最終的には etcd サービスのパフォーマンスが低下する可能性があります。</p>
<p>ディスクが要件を満たしているかどうかをテストするには、<a href="https://github.com/axboe/fio">fio</a> を使用してください。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>理想的には、etcd専用ディスクのIOPSは500以上、99パーセンタイルのfsyncレイテンシは10ms以下である必要があります。より詳細な要件については、etcd<a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">のドキュメントを</a>参照してください。</p>
<h2 id="Whats-next" class="common-anchor-header">次の手順<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>ハードウェアおよびソフトウェアが上記の要件を満たしている場合は、以下の手順を実行できます。</p>
<ul>
<li><a href="/docs/ja/install_standalone-docker.md">DockerでMilvusを実行する</a></li>
<li><a href="/docs/ja/install_standalone-docker-compose.md">Docker Compose を使用して Milvus を実行する</a></li>
</ul>
