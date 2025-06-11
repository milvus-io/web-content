---
id: configure_minio.md
related_key: configure
group: system_configuration.md
summary: 了解如何为 Milvus 配置 minio。
---
<h1 id="minio-related-Configurations" class="common-anchor-header">MinIO 相关配置<button data-href="#minio-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>MinIO/S3/GCS 或任何其他服务的相关配置都支持 S3 API，它负责 Milvus 的数据持久化。</p>
<p>为简单起见，我们在以下描述中将存储服务称为 MinIO/S3。</p>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>MinIO 或 S3 服务的 IP 地址。</li>      
        <li>环境变量：MINIO_ADDRESS</li>      
        <li>minio.address 和 minio.port 共同生成对 MinIO 或 S3 服务的有效访问。</li>      
        <li>启动 Milvus 时，MinIO 优先从环境变量 MINIO_ADDRESS 获取有效 IP 地址。</li>      
        <li>默认值适用于 MinIO 或 S3 与 Milvus 在同一网络上运行的情况。</li>      </td>
      <td>本地主机</td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MinIO 或 S3 服务的端口。      </td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>MinIO 或 S3 向用户发放的授权访问密钥 ID。</li>      
        <li>环境变量：MINIO_ACCESS_KEY_ID 或 minio.accessKeyID</li>      
        <li>minio.accessKeyID 和 minio.secretAccessKey 一起用于身份验证，以访问 MinIO 或 S3 服务。</li>      
        <li>此配置的设置必须与环境变量 MINIO_ACCESS_KEY_ID 相同，因为 MINIO_ACCESS_KEY_ID 是启动 MinIO 或 S3 所必需的。</li>      
        <li>默认值适用于使用默认 docker-compose.yml 文件启动的 MinIO 或 S3 服务。</li>      </td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>用于加密签名字符串和在服务器上验证签名字符串的密钥。它必须严格保密，只有 MinIO 或 S3 服务器和用户可以访问。</li>      
        <li>环境变量：MINIO_SECRET_ACCESS_KEY 或 minio.secretAccessKey</li>      
        <li>minio.accessKeyID 和 minio.secretAccessKey 一起用于身份验证，以访问 MinIO 或 S3 服务。</li>      
        <li>此配置的设置必须与环境变量 MINIO_SECRET_ACCESS_KEY 相同，这是启动 MinIO 或 S3 所必需的。</li>      
        <li>默认值适用于使用默认 docker-compose.yml 文件启动的 MinIO 或 S3 服务。</li>      </td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        控制是否通过 SSL 访问 MinIO 或 S3 服务的开关值。      </td>
      <td>假</td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        CACert 文件的路径      </td>
      <td>/path/to/public.crt</td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Milvus 在 MinIO 或 S3 中存储数据的存储桶名称。</li>      
        <li>Milvus 2.0.0 不支持在多个存储桶中存储数据。</li>      
        <li>如果不存在，将创建具有此名称的存储桶。如果数据桶已经存在并且可以访问，则会直接使用。否则，将出现错误。</li>      
        <li>要在多个 Milvus 实例之间共享一个 MinIO 实例，可以考虑在启动它们之前，为每个 Milvus 实例将此更改为不同的值。有关详细信息，请参阅操作常见问题。</li>      
        <li>如果使用 Docker 在本地启动 MinIO 服务，数据将存储在本地 Docker 中。确保有足够的存储空间。</li>      
        <li>在一个 MinIO 或 S3 实例中，存储桶名称是全局唯一的。</li>      </td>
      <td>存储桶</td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Milvus 在 MinIO 或 S3 中存储数据的 key 的根前缀。</li>      
        <li>建议在首次启动 Milvus 前更改此参数。</li>      
        <li>若要在多个 Milvus 实例之间共享 MinIO 实例，请考虑在启动 Milvus 实例之前将其更改为每个实例的不同值。有关详细信息，请参阅操作常见问题。</li>      
        <li>如果已经存在 etcd 服务，为 Milvus 设置一个易于识别的根密钥前缀。</li>      
        <li>为已运行的 Milvus 实例更改此值可能会导致读取遗留数据失败。</li>      </td>
      <td>文件</td>
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
      <th class="width80">文件</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>是否使用 IAM 角色访问 S3/GCS，而不是访问/密钥</li>      
        <li>有关详细信息，请参阅</li>      
        <li>aws: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html</li>      
        <li>gcp: https://cloud.google.com/storage/docs/access-control/iam</li>      
        <li>aliyun (ack): https://www.alibabacloud.com/help/en/container-service-for-kubernetes/latest/use-rrsa-to-enforce-access-control</li>      
        <li>aliyun (ecs): https://www.alibabacloud.com/help/en/elastic-compute-service/latest/attach-an-instance-ram-role</li>      </td>
      <td>错误</td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>S3 的云提供商。支持"AWS"、"GCP"、"阿里云"。</li>      
        <li>Google 云存储的云提供商。支持"gcpnative"。</li>      
        <li>如果其他云提供商支持签名为 v4 的 S3 API，则可使用 "aws"，例如：minio。</li>      
        <li>如果其他云提供商支持签名为 v2 的 S3 API，则可使用 "gcp"。</li>      
        <li>如果其他云提供商使用虚拟主机风格的存储桶，您可以使用 "aliyun"。</li>      
        <li>谷歌云平台提供商可使用 "gcpnative"。使用服务帐户凭据</li>      
        <li>进行身份验证。</li>      
        <li>启用 useIAM 后，目前只支持 "aws"、"gcp "和 "aliyun"。</li>      </td>
      <td>aws</td>
    </tr>
  </tbody>
</table>
<h2 id="miniogcpCredentialJSON" class="common-anchor-header"><code translate="no">minio.gcpCredentialJSON</code><button data-href="#miniogcpCredentialJSON" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.gcpCredentialJSON">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>JSON 内容包含 gcs 服务账户凭据。</li>      
        <li>仅用于 "gcpnative "云提供商。</li>      </td>
      <td></td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>当 useIAM 为 true 且云提供商为 "aws "时，用于获取 IAM 角色凭据的自定义端点。</li>      
        <li>如果要使用 AWS 默认端点，请将其留空。</li>      </td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        aws sdk 日志的日志级别。支持的级别：关闭、致命、错误、警告、信息、调试、跟踪      </td>
      <td>致命</td>
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
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        指定 minio 存储系统位置区域      </td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        是否为存储桶使用虚拟主机模式      </td>
      <td>假</td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        请求时间的 minio 超时（毫秒      </td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>minio ListObjects rpc 中每批请求的最大对象数、 </li>      
        <li>0 表示默认使用 oss 客户端，如果 ListObjects 超时，则减少这些配置。</li>      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>
