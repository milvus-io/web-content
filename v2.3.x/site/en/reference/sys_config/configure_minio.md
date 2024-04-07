---
id: configure_minio.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure MinIO for Milvus.
title: MinIO-related Configurations
---

# MinIO-related Configurations

This topic introduces the MinIO-related configurations of Milvus.

Milvus supports MinIO and Amazon S3 as the storage engine for data persistence of insert log files and index files. Whereas MinIO is the de facto standard for S3 compatibility, you can configure S3 parameters directly under MinIO section.

In this section, you can configure MinIO or S3 address, relevant access keys, etc.

<div class="alert note">
To share a MinIO instance among multiple Milvus instances, you need to change <code>minio.bucketName</code> or <code>minio.rootPath</code> to a unique value for each of the Milvus instances. For details, refer to <a href="operational_faq.md#Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances">Operation FAQs</a>.
</div>

## `minio.address`

<table id="minio.address">
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
        <li>Environment variable: <code>MINIO_ADDRESS</code></li>
        <li><code>minio.address</code> and <code>minio.port</code> together generate the valid access to MinIO or S3 service.</li>
        <li>MinIO preferentially acquires the valid IP address from the environment variable <code>MINIO_ADDRESS</code> when Milvus is started.</li>
        <li>Default value applies when MinIO or S3 is running on the same network with Milvus.</li>
        <li>Milvus 2.0 does not support secure access to MinIO or S3 service. Future releases will support secure access to MinIO.</li>
      </td>
      <td>localhost</td>
    </tr>
  </tbody>
</table>


## `minio.port`

<table id="minio.port">
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
        <li>Environment variable: <code>MINIO_ADDRESS</code></li>
        <li><code>minio.address</code> and <code>minio.port</code> together generate the valid access to MinIO or S3 service.</li>
        <li>MinIO preferentially acquires the valid port from the environment variable <code>MINIO_ADDRESS</code> when Milvus is started.</li>
      </td>
      <td>9000</td>
    </tr>
  </tbody>
</table>

## `minio.accessKeyID`

<table id="minio.accessKeyID">
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
        <li>Environment variable: <code>MINIO_ACCESS_KEY_ID</code> or <code>minio.accessKeyID</code></li>
        <li><code>minio.accessKeyID</code> and <code>minio.secretAccessKey</code> together are used for identity authentication to access the MinIO or S3 service.</li>
        <li>This configuration must be set identical to the environment variable <code>MINIO_ACCESS_KEY_ID</code>, which is necessary for starting MinIO or S3.</li>
        <li>The default value applies to MinIO or S3 service that started with the default <b>docker-compose.yml</b> file.</li>
      </td>
      <td>minioadmin</td>
    </tr>
  </tbody>
</table>


## `minio.secretAccessKey`

<table id="minio.secretAccessKey">
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
        <li>Environment variable: <code>MINIO_SECRET_ACCESS_KEY</code> or <code>minio.secretAccessKey</code></li>
        <li><code>minio.accessKeyID</code> and <code>minio.secretAccessKey</code> together are used for identity authentication to access the MinIO or S3 service.</li>
        <li>This configuration must be set identical to the environment variable <code>MINIO_SECRET_ACCESS_KEY</code>, which is necessary for starting MinIO or S3.</li>
        <li>The default value applies to MinIO or S3 service that started with the default <b>docker-compose.yml</b> file.</li>
      </td>
      <td>minioadmin</td>
    </tr>
  </tbody>
</table>

## `minio.useSSL`

<table id="minio.useSSL">
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
      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `minio.bucketName`

<table id="minio.bucketName">
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
        <li>To share an MinIO instance among multiple Milvus instances, consider changing this to a different value for each Milvus instance before you start them. For details, see <a href="operational_faq.md#Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances">Operation FAQs</a>.</li>
        <li>The data will be stored in the local Docker if Docker is used to start the MinIO service locally. Ensure that there is sufficient storage space.</li>
        <li>A bucket name is globally unique in one MinIO or S3 instance.</li>
      </td>
      <td>"a-bucket"</td>
    </tr>
  </tbody>
</table>


## `minio.rootPath`

<table id="minio.rootPath">
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
        <li>To share an MinIO instance among multiple Milvus instances, consider changing this to a different value for each Milvus instance before you start them. For details, see <a href="operational_faq.md#Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances">Operation FAQs</a>.</li>
        <li>Set an easy-to-identify root key prefix for Milvus if etcd service already exists.</li>
        <li>Changing this for an already running Milvus instance may result in failures to read legacy data.</li>
      </td>
      <td>files</td>
    </tr>
  </tbody>
</table>
