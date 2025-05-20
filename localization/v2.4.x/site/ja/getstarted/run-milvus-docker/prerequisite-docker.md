---
id: prerequisite-docker.md
label: Docker requirements
related_key: Docker
summary: Docker ComposeでMilvusをインストールする前に必要な準備について説明します。
title: Docker ComposeでMilvusをインストールするための要件
---
<h1 id="Requirements-for-Installing-Milvus-with-Docker-Compose" class="common-anchor-header">Docker ComposeでMilvusをインストールするための要件<button data-href="#Requirements-for-Installing-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusインスタンスをインストールする前に、ハードウェアとソフトウェアが要件を満たしているか確認してください。</p>
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
<tr><th>コンポーネント</th><th>要件</th><th>推奨環境</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>インテル第2世代コアCPU以上</li><li>アップルシリコン</li></ul></td><td><ul><li>スタンドアロン：4コア以上</li><li>クラスタ8コア以上</li></ul></td><td></td></tr>
<tr><td>CPU命令セット</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Milvusのベクトル類似度検索とインデックス作成には、CPUがSIMD(Single Instruction, Multiple Data)拡張セットをサポートしている必要があります。CPUが少なくとも1つのSIMD拡張セットに対応していることを確認してください。詳細は<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">AVXを搭載したCPUを</a>参照してください。</td></tr>
<tr><td>RAM</td><td><ul><li>スタンドアロン: 8G</li><li>クラスタ32G</li></ul></td><td><ul><li>スタンドアロン: 16G</li><li>クラスタ128G</li></ul></td><td>RAMのサイズはデータ容量によって異なります。</td></tr>
<tr><td>ハードドライブ</td><td>SATA 3.0 SSD以上</td><td>NVMe SSD以上</td><td>ハードドライブのサイズはデータ容量によって異なります。</td></tr>
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
<tr><th>オペレーティングシステム</th><th>ソフトウェア</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14以降</td><td>Dockerデスクトップ</td><td>Docker仮想マシン（VM）は、最低2つの仮想CPU（vCPU）と8GBの初期メモリを使用するように設定してください。そうしないとインストールに失敗する可能性があります。<br/>詳細については、<a href="https://docs.docker.com/desktop/mac/install/">MacにDocker Desktopをインストールするを</a>参照してください。</td></tr>
<tr><td>Linuxプラットフォーム</td><td><ul><li>Docker 19.03以降</li><li>Docker Compose 1.25.1以降</li></ul></td><td>詳細は<a href="https://docs.docker.com/engine/install/">Docker Engineのインストールと</a> <a href="https://docs.docker.com/compose/install/">Docker Composeのインストールを</a>参照してください。</td></tr>
<tr><td>WSL 2が有効なWindows</td><td>Dockerデスクトップ</td><td>Linuxコンテナにバインドマウントされたソースコードやその他のデータは、Windowsファイルシステムではなく、Linuxファイルシステムに保存することをお勧めします。<br/>詳細は<a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">Install Docker Desktop on Windows with WSL 2 backend</a>を参照してください。</td></tr>
</tbody>
</table>
<p>Dockerスクリプト、またはDocker Compose設定を使用してMilvus Standaloneをインストールすると、以下の依存関係が自動的に取得され、設定されます：</p>
<table>
<thead>
<tr><th>ソフトウェア</th><th>バージョン</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td><a href="#Additional-disk-requirements">追加ディスク要件を</a>参照。</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>パルサー</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">追加ディスク要件</h3><p>ディスク性能はetcdにとって極めて重要です。ローカルのNVMe SSDを使用することを強く推奨します。ディスクの応答が遅くなると、頻繁にクラスタが選出され、最終的にetcdサービスが低下する可能性があります。</p>
<p>ディスクが適格かどうかをテストするには、<a href="https://github.com/axboe/fio">fioを</a>使用します。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>理想的には、ディスクのIOPSが500以上、fsyncのレイテンシが99パーセンタイルで10ms以下である必要があります。より詳細な要件については、etcd<a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">ドキュメントを</a>お読みください。</p>
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
    </button></h2><p>ハードウェアとソフトウェアが上記の要件を満たしていれば、次のことができます。</p>
<ul>
<li><a href="/docs/ja/v2.4.x/install_standalone-docker.md">DockerでMilvusを実行する。</a></li>
<li><a href="/docs/ja/v2.4.x/install_standalone-docker-compose.md">Docker ComposeでMilvusを実行する</a></li>
</ul>
