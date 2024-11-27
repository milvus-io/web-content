---
id: configure_minio.md
related_key: configure
group: system_configuration.md
summary: Milvus用のminioの設定方法について説明します。
---
<h1 id="minio-related-Configurations" class="common-anchor-header">ミニオ関連設定<button data-href="#minio-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>MinIO/S3/GCSなどの関連設定は、Milvusのデータ永続化を担うS3 APIをサポートしている。</p>
<p>以下の説明では簡単のため、ストレージサービスをMinIO/S3と呼ぶ。</p>
<h2 id="minioaddress" class="common-anchor-header"><code translate="no">minio.address</code><button data-href="#minioaddress" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.address">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>MinIOまたはS3サービスのIPアドレス.</li>      
        <li>環境変数：MINIO_ADDRESS</li>      
        <li>minio.addressとminio.portは、MinIOまたはS3サービスへの有効なアクセスを生成する。</li>      
        <li>MinIOは、Milvus起動時に環境変数MINIO_ADDRESSから有効なIPアドレスを優先的に取得します。</li>      
        <li>デフォルト値はMinIOまたはS3がMilvusと同じネットワーク上で動作している場合に適用されます。</li>      </td>
      <td>ローカルホスト</td>
    </tr>
  </tbody>
</table>
<h2 id="minioport" class="common-anchor-header"><code translate="no">minio.port</code><button data-href="#minioport" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.port">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MinIOまたはS3サービスのポート。      </td>
      <td>9000</td>
    </tr>
  </tbody>
</table>
<h2 id="minioaccessKeyID" class="common-anchor-header"><code translate="no">minio.accessKeyID</code><button data-href="#minioaccessKeyID" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.accessKeyID">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>MinIOまたはS3が、認可されたアクセスのためにユーザーに発行するアクセスキーID。</li>      
        <li>環境変数：MINIO_ACCESS_KEY_ID または minio.accessKeyID</li>      
        <li>minio.accessKeyIDとminio.secretAccessKeyは、MinIOまたはS3サービスにアクセスするためのID認証に使用されます。</li>      
        <li>この設定は、MinIOまたはS3の起動に必要な環境変数MINIO_ACCESS_KEY_IDと同じに設定する必要がある。</li>      
        <li>デフォルト値は、デフォルトのdocker-compose.ymlファイルで起動したMinIOまたはS3サービスに適用される。</li>      </td>
      <td>minioadmin</td>
    </tr>
  </tbody>
</table>
<h2 id="miniosecretAccessKey" class="common-anchor-header"><code translate="no">minio.secretAccessKey</code><button data-href="#miniosecretAccessKey" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.secretAccessKey">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>署名文字列を暗号化し、サーバー上で署名文字列を検証するために使用される秘密鍵。秘密鍵は厳重に保管し、MinIOまたはS3サーバーとユーザーだけがアクセスできるようにする必要がある。</li>      
        <li>環境変数：MINIO_SECRET_ACCESS_KEY または minio.secretAccessKey</li>      
        <li>minio.accessKeyIDとminio.secretAccessKeyは、MinIOまたはS3サービスにアクセスするためのID認証に使用されます。</li>      
        <li>この設定は、MinIOまたはS3の起動に必要な環境変数MINIO_SECRET_ACCESS_KEYと同じに設定する必要がある。</li>      
        <li>デフォルト値は、デフォルトのdocker-compose.ymlファイルで起動したMinIOまたはS3サービスに適用される。</li>      </td>
      <td>minioadmin</td>
    </tr>
  </tbody>
</table>
<h2 id="miniouseSSL" class="common-anchor-header"><code translate="no">minio.useSSL</code><button data-href="#miniouseSSL" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.useSSL">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        SSL経由でMinIOまたはS3サービスにアクセスするかどうかを制御するスイッチ値。      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="miniossltlsCACert" class="common-anchor-header"><code translate="no">minio.ssl.tlsCACert</code><button data-href="#miniossltlsCACert" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.ssl.tlsCACert">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        CACertファイルへのパス      </td>
      <td>/パス/to/public.crt</td>
    </tr>
  </tbody>
</table>
<h2 id="miniobucketName" class="common-anchor-header"><code translate="no">minio.bucketName</code><button data-href="#miniobucketName" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.bucketName">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>MilvusがMinIOまたはS3にデータを保存するバケット名。</li>      
        <li>Milvus 2.0.0では複数のバケットへのデータ保存はサポートしていません。</li>      
        <li>この名前のバケットが存在しない場合は作成されます。バケットが既に存在し、アクセス可能であれば、直接利用されます。そうでない場合はエラーになります。</li>      
        <li>MinIOインスタンスを複数のMilvusインスタンスで共有する場合は、Milvusインスタンスを起動する前に、Milvusインスタンスごとに異なる値に変更することを検討してください。詳細は運用FAQを参照してください。</li>      
        <li>Dockerを使用してローカルでMinIOサービスを起動した場合、データはローカルのDockerに保存されます。十分なストレージ容量を確保してください。</li>      
        <li>バケット名は、1つのMinIOまたはS3インスタンス内でグローバルに一意です。</li>      </td>
      <td>aバケット</td>
    </tr>
  </tbody>
</table>
<h2 id="miniorootPath" class="common-anchor-header"><code translate="no">minio.rootPath</code><button data-href="#miniorootPath" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.rootPath">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>MilvusがMinIOまたはS3にデータを保存するキーのルートプレフィックス。</li>      
        <li>Milvusを初めて起動する前に、このパラメータを変更することを推奨する。</li>      
        <li>MinIOインスタンスを複数のMilvusインスタンスで共有する場合は、Milvusインスタンスごとに異なる値に変更してから起動することを検討してください。詳しくは運用FAQをご覧ください。</li>      
        <li>etcdサービスが既に存在する場合、Milvus用に識別しやすいルートキーのプレフィックスを設定します。</li>      
        <li>既に稼働しているMilvusインスタンスに対してこれを変更すると、レガシーデータの読み込みに失敗する可能性があります。</li>      </td>
      <td>ファイル</td>
    </tr>
  </tbody>
</table>
<h2 id="miniouseIAM" class="common-anchor-header"><code translate="no">minio.useIAM</code><button data-href="#miniouseIAM" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.useIAM">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>アクセスキー/秘密キーの代わりにS3/GCSへのアクセスにIAMロールを使用するかどうか。</li>      
        <li>詳細については</li>      
        <li>aws: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html</li>      
        <li>gcp: https://cloud.google.com/storage/docs/access-control/iam</li>      
        <li>aliyun (ack): https://www.alibabacloud.com/help/en/container-service-for-kubernetes/latest/use-rrsa-to-enforce-access-control</li>      
        <li>aliyun (ecs): https://www.alibabacloud.com/help/en/elastic-compute-service/latest/attach-an-instance-ram-role</li>      </td>
      <td>偽</td>
    </tr>
  </tbody>
</table>
<h2 id="miniocloudProvider" class="common-anchor-header"><code translate="no">minio.cloudProvider</code><button data-href="#miniocloudProvider" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.cloudProvider">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>S3のクラウドプロバイダー。サポートする：「aws"、"gcp"、"aliyun"。</li>      
        <li>aws "は、他のクラウドプロバイダーがS3のAPIをシグネチャv4でサポートしている場合に使用できます。</li>      
        <li>他のクラウドプロバイダーがS3 APIをシグネチャv2でサポートしている場合、"gcp "を使用できます。</li>      
        <li>他のクラウドプロバイダーがバーチャルホスト形式のバケットを使用している場合、"aliyun "を使用することができます。</li>      
        <li>useIAMが有効な場合、今のところ "aws", "gcp", "aliyun "のみがサポートされている。</li>      </td>
      <td>aws</td>
    </tr>
  </tbody>
</table>
<h2 id="minioiamEndpoint" class="common-anchor-header"><code translate="no">minio.iamEndpoint</code><button data-href="#minioiamEndpoint" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.iamEndpoint">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>useIAM が true かつ cloudProvider が "aws" の場合に、IAM ロールの認証情報を取得するためのカスタムエンドポイント。</li>      
        <li>AWSのデフォルトエンドポイントを使いたい場合は空のままにしておく。</li>      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="miniologLevel" class="common-anchor-header"><code translate="no">minio.logLevel</code><button data-href="#miniologLevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.logLevel">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        aws sdkログのログレベル。サポートされるレベル: off、fatal、error、warn、info、debug、trace      </td>
      <td>致命的</td>
    </tr>
  </tbody>
</table>
<h2 id="minioregion" class="common-anchor-header"><code translate="no">minio.region</code><button data-href="#minioregion" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.region">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ミニオ・ストレージ・システムの場所領域を指定する      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="miniouseVirtualHost" class="common-anchor-header"><code translate="no">minio.useVirtualHost</code><button data-href="#miniouseVirtualHost" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.useVirtualHost">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        バケットにバーチャルホストモードを使うかどうか      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="miniorequestTimeoutMs" class="common-anchor-header"><code translate="no">minio.requestTimeoutMs</code><button data-href="#miniorequestTimeoutMs" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.requestTimeoutMs">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        minio リクエストタイムアウト (ミリ秒)      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>
<h2 id="miniolistObjectsMaxKeys" class="common-anchor-header"><code translate="no">minio.listObjectsMaxKeys</code><button data-href="#miniolistObjectsMaxKeys" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.listObjectsMaxKeys">
  <thead>
    <tr>
      <th class="width80">説明</th>
      <th class="width20">デフォルト値</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>minio ListObjects rpc でバッチごとにリクエストされるオブジェクトの最大数、 </li>      
        <li>0 は、デフォルトで oss クライアントを使用することを意味する。</li>      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>
