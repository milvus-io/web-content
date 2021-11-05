---
id: configuration_standalone-advanced.md
title: Milvus Standalone System Configurations
label: Advanced Configurations
order: 1
group: standalone_sys
summary: Learn about basic and advanced Milvus standalone configurations.
---

# Milvus Standalone System Configurations

Milvus standalone maintains many system variables that configure the operation. All configurations can be set manually before server startup. Each configuration has a default value, which can be used directly.

<div class="alert note">
All parameters take effect only after being configured at the startup of Milvus.
</div>

<div class="tab-wrapper"><a href="configuration_standalone-basic.md" class=''>Basic Configurations</a><a href="configuration_standalone-advanced.md" class='active '>Advanced Configurations</a></div>





If you are an administrator of Milvus, you may access the following configurations to maintain the system operation.

## etcd Configurations

etcd is the metadata engine supporting Milvus' metadata storage and access. You can set these configurations in [**milvus.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml).


> You do not need to change this session if you use the default [**milvus-standalone-docker-compose.yml**](https://github.com/milvus-io/milvus/releases/download/v2.0.0-rc8/milvus-standalone-docker-compose.yml) for third-party services.

<table id="etcd">
<thead>
  <tr>     
    <th class="width20">Configuration</th>     
    <th class="width70">Description</th>     
    <th class="width10">Default Value</th>   
  </tr>
</thead>
<tbody>
	<tr>
		<td><code>etcd.endpoints</code></td>
		<td><details>
       <summary>Endpoints of etcd</summary>
       <li>Environment variable: <code>ETCD_ENDPOINTS</code></li>
       <li>Access etcd service with <code>etcd.endpoints</code>.</li>
       <li>etcd preferentially acquires valid address from environment variable <code>ETCD_ENDPOINTS</code> when Milvus is booted up.</li>
       <li>You can change this parameter as the endpoints of your own etcd cluster.</li>
      </details></td>
		<td>localhost:2379</td>
	</tr>
	<tr>
		<td><code>etcd.rootPath</code></td>
		<td><details>
       <summary>Root of key prefix to etcd</summary>
       <li>Milvus stores data in etcd with this root key prefix.</li>
       <li>Be careful with changing this configuration if you have used Milvus for a period of time. Changes to this configuration will affect your access to old data.</li>
       <li>We recommend changing this configuration before using Milvus for the first time.</li>
       <li>Set an easy-to-identify root key prefix for Milvus if etcd already exists. We recommend setting it as "<b>milvus-root</b>".</li>
      </details></td>
		<td>"by-dev"</td>
	</tr>
</tbody>
</table>


## MinIO/S3 Configurations

Milvus supports MinIO and Amazon S3 as the storage engine for data persistence of insert log files and index files. Whereas MinIO is the de facto standard for S3 compatibility, you can configure S3 parameters directly under `MinIO` section. You can set these configurations in **milvus.yaml** under **milvus/configs** directory.

> You do not need to change this session if you use the default [**milvus-standalone-docker-compose.yml**](https://github.com/milvus-io/milvus/releases/download/v2.0.0-rc8/milvus-standalone-docker-compose.yml) for third-party services.

<table id="minio">
<thead>
  <tr>     
    <th class="width20">Configuration</th>     
    <th class="width70">Description</th>     
    <th class="width10">Default Value</th>   
  </tr>
</thead>
<tbody>
  <tr>
<td><code>minio.address</code></td>
<td><details>
       <summary>IP address of MinIO/S3</summary>
       <li>Environment variable: <code>MINIO_ADDRESS</code></li>
       <li>Access MinIO/S3 service with <code>minio.address</code>. <code>minio.address</code> and <code>minio.port</code> together generate the valid access to MinIO/S3.</li>
       <li>MinIO preferentially acquires the valid address from the environment variable <code>MINIO_ADDRESS</code> when Milvus is booted up.</li>
       <li>Default value applies when MinIO/S3 and Milvus are running on the same network.</li>
       <li>Milvus 2.0 uses non-secure mode to access MinIO. Upcoming Milvus versions will support secure access to MinIO.</li>
      </details></td>
<td>localhost</td>
</tr>
<tr>
		<td><code>minio.port</code></td>
		<td><details>
       <summary>Port of MinIO/S3</summary>
       <li>Environment variable: <code>MINIO_ADDRESS</code></li>
       <li>Access MinIO/S3 service with <code>minio.address</code>. <code>minio.address</code> and <code>minio.port</code> together generate the valid access to MinIO/S3.</li>
       <li>MinIO preferentially acquires the valid port from the environment variable <code>MINIO_ADDRESS</code> when Milvus is booted up.</li>
      </details></td>
		<td>9000</td>
	</tr>
  <tr>
		<td><code>minio.AccessKeyID</code></td>
		<td><details>
       <summary>MinIO/S3 key ID for authorized user access</summary>
       <li>Environment variable: <code>MINIO_ACCESS_KEY</code></li>
       <li>Access key ID that MinIO/S3 issues to authorized users. <code>minio.accessKeyID</code> and <code>minio.secretAccessKey</code> together are used for identity authentication to access the MinIO/S3 service.</li>
       <li>This configuration must be set identical to the environment variable <code>MINIO_ACCESS_KEY</code>, which is necessary for booting up MinIO/S3. The default value applies to the MinIO/S3 service that boots up with the default <b>docker-compose.yml</b> provided by Milvus.</li>
      </details></td>
		<td>minioadmin</td>
	</tr>
  <tr>
		<td><code>minio.secretAccessKey</code></td>
		<td><details>
       <summary>MinIO/S3 encryption string</summary>
       <li>Environment variable: <code>MINIO_SECRET_KEY</code></li>
       <li>Secret key used to encrypt the signature string and verify the signature string on server. It must be kept strictly confidential and accessible only to the MinIO/S3 server and users.</li>
       <li>This configuration must be set identical to the environment variable <code>MINIO_SECRET_KEY</code>, which is necessary for booting up MinIO/S3. The default value applies to the MinIO/S3 service that boots up with the default <b>docker-compose.yml</b> provided by Milvus.</li>
      </details></td>
		<td>minioadmin</td>
	</tr>
</tbody>
</table>




## Server Address Configurations

This session configures the IP address and port of the monitor request from Milvus. You can set these configurations in [**milvus.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml).

<table id="server_address">
<thead>
  <tr>     
    <th class="width20">Configuration</th>     
    <th class="width70">Description</th>     
    <th class="width10">Default Value</th>   
  </tr>
</thead>
<tbody>
  <tr>
		<td><code>proxy.port</code></td>
		<td>TCP port for monitoring Milvus</td>
		<td>19530</td>
	</tr>
</tbody>
</table>


## System Behavior Configurations

This session configures the system behaviors of Milvus. You can set these configurations in [**milvus.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml), [**root_coord.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/advanced/root_coord.yaml), [**data_coord.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/advanced/data_coord.yaml), and [**data_node.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/advanced/data_node.yaml).

<table id="system_behavior">
<thead>
  <tr>     
    <th class="width20">Configuration</th>     
    <th class="width70">Description</th>     
    <th class="width10">Default Value</th>   
  </tr>
</thead>
<tbody>
  <tr>
		<td><code>queryNode.gracefulTime</code></td>
		<td><details>
       <summary>Minimum time before the newly inserted data can be searched</summary>
       <li>Unit: ms</li>
       <li>Milvus executes this query command directly when the search message timestamp is earlier the query node system time.</li>
       <li>When the <code>search</code> message timestamp is later than the query node system time, the search message waits for the query node system time to advance until the time difference between them is less than the value set in <code>queryNode.gracefulTime</code>, and then Milvus executes the query demand.</li>
      </details></td>
		<td>1000</td>
	</tr>
  <tr>
		<td><code>rootcoord.minSegmentSizeToEnableIndex</code></td>
		<td><details>
       <summary>The minimum row count in a segment required for creating index</summary>
       <li>This parameter specifies the minimum row count in a log file required for creating segment index.</li>
      </details></td>
		<td>1024</td>
	</tr>
  <tr>
		<td><code>datacoord.segment.maxSize</code></td>
		<td><details>
       <summary>Maximum size of a segment</summary>
       <li>Unit: MB</li>
       <li><code>datacoord.segment.maxSize</code> and <code>datacoord.segment.sealProportion</code> together determine if a segment can be sealed. Generally, the segment size ranges from 384 MB to 512 MB.</li>
      </details></td>
		<td>512</td>
	</tr>
  <tr>
		<td><code>datacoord.segment.sealProportion</code></td>
		<td><details>
       <summary>Maximum proportion of a segment’s actual size comparing to <code>datacoord.segment.maxSize</code></summary>
       <li>When actual proportion is greater than the set value, the corresponding segment can be sealed.</li>
      </details></td>
		<td>0.75</td>
	</tr>
  <tr>
		<td><code>dataNode.flush.insertBufSize</code></td>
		<td><details>
       <summary>Maximum row count of a segment buffered in memory</summary>
       <li>Data node packs all buffered data into a binlog file and stores the file in MinIO/S3 when the row count of the data in memory exceeds this value.</li>
       <li>Setting this parameter is associated with the data size. If it is set too small, the system stores data in small size too frequently. If it is set too large, the system's demand for memory will increase.</li>
       <li>The default value applies to most scenarios. For a 128-dimensions floating-point vector, 32000 rows of data generate a binlog file of approximately 16 MB.</li>
      </details></td>
		<td>32000</td>
	</tr>
</tbody>
</table>
