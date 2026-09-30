---
id: configure_minio.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure minio for Milvus.
---

# minio-related Configurations

Related configuration of MinIO/S3/GCS or any other service supports S3 API, which is responsible for data persistence for Milvus.

We refer to the storage service as MinIO/S3 in the following description for simplicity.

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
        <li>Environment variable: MINIO_ADDRESS</li>      
        <li>minio.address and minio.port together generate the valid access to MinIO or S3 service.</li>      
        <li>MinIO preferentially acquires the valid IP address from the environment variable MINIO_ADDRESS when Milvus is started.</li>      
        <li>Default value applies when MinIO or S3 is running on the same network with Milvus.</li>      </td>
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
      <td>        Port of MinIO or S3 service.      </td>
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
        <li>Environment variable: MINIO_ACCESS_KEY_ID or minio.accessKeyID</li>      
        <li>minio.accessKeyID and minio.secretAccessKey together are used for identity authentication to access the MinIO or S3 service.</li>      
        <li>This configuration must be set identical to the environment variable MINIO_ACCESS_KEY_ID, which is necessary for starting MinIO or S3.</li>      
        <li>The default value applies to MinIO or S3 service that started with the default docker-compose.yml file.</li>      </td>
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
        <li>Environment variable: MINIO_SECRET_ACCESS_KEY or minio.secretAccessKey</li>      
        <li>minio.accessKeyID and minio.secretAccessKey together are used for identity authentication to access the MinIO or S3 service.</li>      
        <li>This configuration must be set identical to the environment variable MINIO_SECRET_ACCESS_KEY, which is necessary for starting MinIO or S3.</li>      
        <li>The default value applies to MinIO or S3 service that started with the default docker-compose.yml file.</li>      </td>
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
      <td>        Switch value to control if to access the MinIO or S3 service through SSL.      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `minio.ssl.tlsCACert`

<table id="minio.ssl.tlsCACert">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        path to your CACert file      </td>
      <td>/path/to/public.crt</td>
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
        <li>To share an MinIO instance among multiple Milvus instances, consider changing this to a different value for each Milvus instance before you start them. For details, see Operation FAQs.</li>      
        <li>The data will be stored in the local Docker if Docker is used to start the MinIO service locally. Ensure that there is sufficient storage space.</li>      
        <li>A bucket name is globally unique in one MinIO or S3 instance.</li>      </td>
      <td>a-bucket</td>
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
        <li>To share an MinIO instance among multiple Milvus instances, consider changing this to a different value for each Milvus instance before you start them. For details, see Operation FAQs.</li>      
        <li>Set an easy-to-identify root key prefix for Milvus if etcd service already exists.</li>      
        <li>Changing this for an already running Milvus instance may result in failures to read legacy data.</li>      </td>
      <td>files</td>
    </tr>
  </tbody>
</table>


## `minio.useIAM`

<table id="minio.useIAM">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Whether to useIAM role to access S3/GCS instead of access/secret keys</li>      
        <li>For more information, refer to</li>      
        <li>aws: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html</li>      
        <li>gcp: https://cloud.google.com/storage/docs/access-control/iam</li>      
        <li>aliyun (ack): https://www.alibabacloud.com/help/en/container-service-for-kubernetes/latest/use-rrsa-to-enforce-access-control</li>      
        <li>aliyun (ecs): https://www.alibabacloud.com/help/en/elastic-compute-service/latest/attach-an-instance-ram-role</li>      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `minio.cloudProvider`

<table id="minio.cloudProvider">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Cloud Provider of S3. Supports: "aws", "gcp", "aliyun".</li>      
        <li>Cloud Provider of Google Cloud Storage. Supports: "gcpnative".</li>      
        <li>You can use "aws" for other cloud provider supports S3 API with signature v4, e.g.: minio</li>      
        <li>You can use "gcp" for other cloud provider supports S3 API with signature v2</li>      
        <li>You can use "aliyun" for other cloud provider uses virtual host style bucket</li>      
        <li>You can use "gcpnative" for the Google Cloud Platform provider. Uses service account credentials</li>      
        <li>for authentication.</li>      
        <li>When useIAM enabled, only "aws", "gcp", "aliyun" is supported for now</li>      </td>
      <td>aws</td>
    </tr>
  </tbody>
</table>


## `minio.gcpCredentialJSON`

<table id="minio.gcpCredentialJSON">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The JSON content contains the gcs service account credentials.</li>      
        <li>Used only for the "gcpnative" cloud provider.</li>      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `minio.iamEndpoint`

<table id="minio.iamEndpoint">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Custom endpoint for fetch IAM role credentials. when useIAM is true & cloudProvider is "aws".</li>      
        <li>Leave it empty if you want to use AWS default endpoint</li>      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `minio.logLevel`

<table id="minio.logLevel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Log level for aws sdk log. Supported level:  off, fatal, error, warn, info, debug, trace      </td>
      <td>fatal</td>
    </tr>
  </tbody>
</table>


## `minio.region`

<table id="minio.region">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Specify minio storage system location region      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `minio.useVirtualHost`

<table id="minio.useVirtualHost">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether use virtual host mode for bucket      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `minio.requestTimeoutMs`

<table id="minio.requestTimeoutMs">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        minio timeout for request time in milliseconds      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>


## `minio.listObjectsMaxKeys`

<table id="minio.listObjectsMaxKeys">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The maximum number of objects requested per batch in minio ListObjects rpc, </li>      
        <li>0 means using oss client by default, decrease these configration if ListObjects timeout</li>      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>


