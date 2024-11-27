---
id: configure_etcd.md
related_key: configure
group: system_configuration.md
summary: Milvus用のetcdの設定方法について説明します。
---
<h1 id="etcd-related-Configurations" class="common-anchor-header">etcd関連設定<button data-href="#etcd-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusのメタデータの保存とサービスディスカバリに使用されるetcdの関連設定。</p>
<h2 id="etcdendpoints" class="common-anchor-header"><code translate="no">etcd.endpoints</code><button data-href="#etcdendpoints" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.endpoints">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>etcdサービスにアクセスするためのエンドポイント。このパラメータはetcdクラスタのエンドポイントとして変更することができます。</li>      
        <li>環境変数ETCD_ENDPOINTS</li>      
        <li>etcdはMilvus起動時に環境変数ETCD_ENDPOINTSから有効なアドレスを優先的に取得します。</li>      </td>
      <td>localhost:2379</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdrootPath" class="common-anchor-header"><code translate="no">etcd.rootPath</code><button data-href="#etcdrootPath" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.rootPath">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Milvusがetcdにデータを保存するキーのルート接頭辞。</li>      
        <li>Milvusを初めて起動する前にこのパラメータを変更することをお勧めします。</li>      
        <li>複数のMilvusインスタンス間でetcdインスタンスを共有する場合は、Milvusインスタンスを起動する前に、各Milvusインスタンスごとに異なる値に変更することを検討してください。</li>      
        <li>etcdサービスが既に存在する場合、Milvusのルートパスをわかりやすく設定する。</li>      
        <li>既に稼働しているMilvusインスタンスに対してこれを変更すると、レガシーデータの読み込みに失敗する可能性があります。</li>      </td>
      <td>バイデブ</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdmetaSubPath" class="common-anchor-header"><code translate="no">etcd.metaSubPath</code><button data-href="#etcdmetaSubPath" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.metaSubPath">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Milvusがetcdのメタデータ関連情報を保存するキーのサブプレフィックス。</li>      
        <li>注意Milvusを一定期間使用した後にこのパラメータを変更すると、古いデータへのアクセスに影響します。</li>      
        <li>Milvusを初めて起動する前にこのパラメータを変更することをお勧めします。</li>      </td>
      <td>メタ</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdkvSubPath" class="common-anchor-header"><code translate="no">etcd.kvSubPath</code><button data-href="#etcdkvSubPath" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.kvSubPath">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Milvusがetcdにタイムスタンプを保存するキーのサブプレフィックス。</li>      
        <li>注意Milvusを一定期間使用した後にこのパラメータを変更すると、古いデータへのアクセスに影響します。</li>      
        <li>特に理由がない場合は、このパラメータを変更しないことをお勧めします。</li>      </td>
      <td>kv</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdloglevel" class="common-anchor-header"><code translate="no">etcd.log.level</code><button data-href="#etcdloglevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.log.level">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        debug、info、warn、error、panic、fatal のみサポート。デフォルトは「info」である。      </td>
      <td>info</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdlogpath" class="common-anchor-header"><code translate="no">etcd.log.path</code><button data-href="#etcdlogpath" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.log.path">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>パスは以下のいずれか：</li>      
        <li>- "default "をos.Stderrとして指定します、</li>      
        <li>- "stderr "をos.Stderrとする、</li>      
        <li>- "stdout "をos.Stdoutとします、</li>      
        <li>- サーバログを追加するファイルパス。</li>      
        <li>組み込みMilvusで調整してください: /tmp/milvus/logs/etcd.log</li>      </td>
      <td>標準出力</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdsslenabled" class="common-anchor-header"><code translate="no">etcd.ssl.enabled</code><button data-href="#etcdsslenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.ssl.enabled">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ETCDセキュア接続モードをサポートするかどうか      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdssltlsCert" class="common-anchor-header"><code translate="no">etcd.ssl.tlsCert</code><button data-href="#etcdssltlsCert" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.ssl.tlsCert">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        証明書ファイルへのパス      </td>
      <td>/パス/to/etcd-client.pem</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdssltlsKey" class="common-anchor-header"><code translate="no">etcd.ssl.tlsKey</code><button data-href="#etcdssltlsKey" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.ssl.tlsKey">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        鍵ファイルへのパス      </td>
      <td>/パス/to/etcd-client-key.pem</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdssltlsCACert" class="common-anchor-header"><code translate="no">etcd.ssl.tlsCACert</code><button data-href="#etcdssltlsCACert" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.ssl.tlsCACert">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        CACertファイルへのパス      </td>
      <td>/パス/to/ca.pem</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdssltlsMinVersion" class="common-anchor-header"><code translate="no">etcd.ssl.tlsMinVersion</code><button data-href="#etcdssltlsMinVersion" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.ssl.tlsMinVersion">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>TLS最小バージョン</li>      
        <li>オプションの値：1.0, 1.1, 1.2, 1.3。</li>      
        <li>バージョン1.2以上の使用を推奨。</li>      </td>
      <td>1.3</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdrequestTimeout" class="common-anchor-header"><code translate="no">etcd.requestTimeout</code><button data-href="#etcdrequestTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.requestTimeout">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Etcd 操作タイムアウト（ミリ秒単位      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>
<h2 id="etcduseembed" class="common-anchor-header"><code translate="no">etcd.use.embed</code><button data-href="#etcduseembed" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.use.embed">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        組み込み Etcd（プロセス内 EtcdServer）を有効にするかどうか。      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="etcddatadir" class="common-anchor-header"><code translate="no">etcd.data.dir</code><button data-href="#etcddatadir" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.data.dir">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        組み込みEtcdのみ。組み込みMilvusで調整してください: /tmp/milvus/etcdData/      </td>
      <td>デフォルトetcd</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdauthenabled" class="common-anchor-header"><code translate="no">etcd.auth.enabled</code><button data-href="#etcdauthenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.auth.enabled">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        認証を有効にするかどうか      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdauthuserName" class="common-anchor-header"><code translate="no">etcd.auth.userName</code><button data-href="#etcdauthuserName" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.auth.userName">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        etcd 認証用のユーザー名      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="etcdauthpassword" class="common-anchor-header"><code translate="no">etcd.auth.password</code><button data-href="#etcdauthpassword" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.auth.password">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        etcd 認証用パスワード      </td>
      <td></td>
    </tr>
  </tbody>
</table>
