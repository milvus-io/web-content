---
id: configure_minio.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure MinIO for Milvus.
title: ''
---
<h1 id="MinIO-related-Configurations" class="common-anchor-header">MinIO-related Configurations<button data-href="#MinIO-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic introduces the MinIO-related configurations of Milvus.</p>
<p>Milvus supports MinIO and Amazon S3 as the storage engine for data persistence of insert log files and index files. Whereas MinIO is the de facto standard for S3 compatibility, you can configure S3 parameters directly under MinIO section.</p>
<p>In this section, you can configure MinIO or S3 address, relevant access keys, etc.</p>
<div class="alert note">
To share a MinIO instance among multiple Milvus instances, you need to change <code translate="no">minio.bucketName</code> or <code translate="no">minio.rootPath</code> to a unique value for each of the Milvus instances. For details, refer to <a href="/docs/v2.2.x/operational_faq.md#Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances">Operation FAQs</a>.
</div>
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
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>IP address of MinIO or S3 service.</li>
        <li>Environment variable: <code translate="no">MINIO_ADDRESS</code></li>
        <li><code translate="no">minio.address</code> and <code translate="no">minio.port</code> together generate the valid access to MinIO or S3 service.</li>
        <li>MinIO preferentially acquires the valid IP address from the environment variable <code translate="no">MINIO_ADDRESS</code> when Milvus is started.</li>
        <li>Default value applies when MinIO or S3 is running on the same network with Milvus.</li>
        <li>Milvus 2.0 does not support secure access to MinIO or S3 service. Future releases will support secure access to MinIO.</li>
      </td>
      <td>localhost</td>
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
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Port of MinIO or S3 service.</li>
        <li>Environment variable: <code translate="no">MINIO_ADDRESS</code></li>
        <li><code translate="no">minio.address</code> and <code translate="no">minio.port</code> together generate the valid access to MinIO or S3 service.</li>
        <li>MinIO preferentially acquires the valid port from the environment variable <code translate="no">MINIO_ADDRESS</code> when Milvus is started.</li>
      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Access key ID that MinIO or S3 issues to user for authorized access.</li>
        <li>Environment variable: <code translate="no">MINIO_ACCESS_KEY</code> or <code translate="no">minio.accessKeyID</code></li>
        <li><code translate="no">minio.accessKeyID</code> and <code translate="no">minio.secretAccessKey</code> together are used for identity authentication to access the MinIO or S3 service.</li>
        <li>This configuration must be set identical to the environment variable <code translate="no">MINIO_ACCESS_KEY</code>, which is necessary for starting MinIO or S3.</li>
        <li>The default value applies to MinIO or S3 service that started with the default <b>docker-compose.yml</b> file.</li>
      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Secret key used to encrypt the signature string and verify the signature string on server. It must be kept strictly confidential and accessible only to the MinIO or S3 server and users.</li>
        <li>Environment variable: <code translate="no">MINIO_SECRET_KEY</code> or <code translate="no">minio.secretAccessKey</code></li>
        <li><code translate="no">minio.accessKeyID</code> and <code translate="no">minio.secretAccessKey</code> together are used for identity authentication to access the MinIO or S3 service.</li>
        <li>This configuration must be set identical to the environment variable <code translate="no">MINIO_SECRET_KEY</code>, which is necessary for starting MinIO or S3.</li>
        <li>The default value applies to MinIO or S3 service that started with the default <b>docker-compose.yml</b> file.</li>
      </td>
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
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Switch value to control if to access the MinIO or S3 service through SSL.</li>
        <li>Milvus 2.0.0 does not support secure access to MinIO or S3 service. Future releases will support secure access to MinIO.</li>
      </td>
      <td>false</td>
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
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Name of the bucket where Milvus stores data in MinIO or S3.</li>
        <li>Milvus 2.0.0 does not support storing data in multiple buckets.</li>
        <li>Bucket with this name will be created if it does not exist. If the bucket already exists and is accessible, it will be used directly. Otherwise, there will be an error.</li>
        <li>To share an MinIO instance among multiple Milvus instances, consider changing this to a different value for each Milvus instance before you start them. For details, see <a href="/docs/v2.2.x/operational_faq.md#Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances">Operation FAQs</a>.</li>
        <li>The data will be stored in the local Docker if Docker is used to start the MinIO service locally. Ensure that there is sufficient storage space.</li>
        <li>A bucket name is globally unique in one MinIO or S3 instance.</li>
      </td>
      <td>"a-bucket"</td>
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
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Root prefix of the key to where Milvus stores data in MinIO or S3.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
        <li>To share an MinIO instance among multiple Milvus instances, consider changing this to a different value for each Milvus instance before you start them. For details, see <a href="/docs/v2.2.x/operational_faq.md#Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances">Operation FAQs</a>.</li>
        <li>Set an easy-to-identify root key prefix for Milvus if etcd service already exists.</li>
        <li>Changing this for an already running Milvus instance may result in failures to read legacy data.</li>
      </td>
      <td>files</td>
    </tr>
  </tbody>
</table>
