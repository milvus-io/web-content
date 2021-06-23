---
id: configuration_cluster.md
title: Milvus Cluster System Configuration
---
# System Configurations

Milvus cluster maintains many system variables that configure the operation. All configurations can be set manually in the **.yaml** file before server startup. Each system configuration has a default value, which can be used directly.


## For Beginners

If you are an entry-level user of a Milvus Cluster, you only need to change the following two configurations to primarily adapt Milvus to your test / development / production environment.

### Log Configurations

This session configures the system log output. Using Milvus generates a collection of logs. By default, Milvus uses logs to record information at `debug` or even higher level for standard output (stdout) and standard error (stderr).

<table id="casual_user">
  <tr>     
    <th>Configuration</th>     
    <th>Description</th>     
    <th>Default Value</th>   
  </tr>
  <tr>     
    <td><code>log.level</code></td>
    <td>
      <details>
       <summary>Log level in Milvus</summary>
        <li>
           You can configure this parameter as <code>debug</code>, <code>info</code>, <code>warn</code>, <code>error</code>, <code>panic</code>, or <code>fatal</code>.
        </li> 
        <li>
           We recommend using <code>debug</code> level under test and development environments, and <code>info</code> level in production environment.
         </li>
      </details>
    </td>     
    <td><code>debug</code></td>
  </tr>
  <tr>     
    <td><code>log.file.rootPath</code></td>
    <td>
      <details>
       <summary>Root path to the log files</summary>
        <li>
           The default value is set empty, indicating to output log files to standard output (stdout) and standard error (stderr).
        </li>
        <li>
           If this parameter is set to a valid local path, Milvus log will be written and stored in this path.
        </li>
        <li>
           Set this parameter as the path that you have permission to write. We recommend using <b>/tmp/milvus</b>.
         </li>
      </details>
    </td>     
    <td>""</td>
  </tr>
</table>



## For Database / Server Administrators

If you are an administrator of a Milvus cluster, you may access the following configurations to maintain the cluster operation.

### etcd Configurations

etcd is the metadata engine supporting Milvus' metadata storage and access. 

> You do not need to change the configurations if you use the default **docker-compose.yml** for third-party services.

<table id="etcd">
	<tr>
		<th>Configuration</th>
		<th>Description</th>
		<th>Default Value</th>
	</tr>
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
</table>

### MinIO Configurations

MinIO is the storage engine supporting Milvus' data persistence for insert log files and index files. 

> You do not need to change the configurations if you use the default **docker-compose.yml** for third-party services.

<table id="minio">
	<tr>
		<th>Configuration</th>
		<th>Description</th>
		<th>Default Value</th>
	</tr>
  <tr>
		<td><code>minio.address</code></td>
		<td><details>
       <summary>IP address of MinIO</summary>
       <li>Environment variable: <code>MINIO_ADDRESS</code></li>
       <li>Access MinIO service with <code>minio.address</code>. <code>minio.address</code> and <code>minio.port</code> together generates the valid address to MinIO.</li>
       <li>MinIO preferentially acquires the valid address from the environment variable <code>MINIO_ADDRESS</code> when Milvus is booted up.</li>
      <li>Default value applies when MinIO and Milvus are running on the same network.</li>
      <li>Milvus 2.0 uses non-secure mode to access MinIO. Upcoming Milvus versions will support secure access to MinIO.</li>
      </details></td>
		<td>localhost</td>
	</tr>
  <tr>
		<td><code>minio.port</code></td>
		<td><details>
       <summary>Port of MinIO</summary>
       <li>Environment variable: <code>MINIO_ADDRESS</code></li>
       <li>Access MinIO service with <code>minio.address</code>. <code>minio.address</code> and <code>minio.port</code> together generates the valid address to MinIO.</li>
       <li>MinIO preferentially acquires the valid address from the environment variable <code>MINIO_ADDRESS</code> when Milvus is booted up.</li>
      </details></td>
		<td>9000</td>
	</tr>
  <tr>
		<td><code>minio.AccessKeyID</code></td>
		<td><details>
       <summary>MinIO key ID for authorized user access</summary>
       <li>Environment variable: <code>MINIO_ACCESS_KEY</code></li>
       <li>Access key ID that MinIO issued to authorized users. <code>minio.accessKeyID</code> and <code>minio.secretAccessKey</code> together is used for identity authentication to access the MinIO service.</li>
       <li>This configuration must be set identical to the environment variable <code>MINIO_ACCESS_KEY</code>, which is necessary for booting MinIO. The default value applies to the MinIO service that booted with the default <b>docker-compose.yml</b> provided by Milvus.</li>
      </details></td>
		<td>minioadmin</td>
	</tr>
  <tr>
		<td><code>minio.secretAccessKey</code></td>
		<td><details>
       <summary>MinIO encryption string</summary>
       <li>Environment variable: <code>MINIO_SECRET_KEY</code></li>
       <li>Secret key used to encrypt the signature string and verify the signature string on server. It must be kept strictly confidential and accessible only to the MinIO server and users.</li>
       <li>This configuration must be set identical to the environment variable <code>MINIO_SECRET_KEY</code>, which is necessary for booting MinIO. The default value applies to the MinIO service that booted with the default <b>docker-compose.yml</b> provided by Milvus.</li>
      </details></td>
		<td>minioadmin</td>
	</tr>
</table>

### Pulsar Configurations

Pulsar is the underlying engine supporting Milvus' reliable storage and pub/sub of log streams.

> You do not need to change the configurations if you use the default **docker-compose.yml** for third-party services.

<table id="pulsar">
	<tr>
		<th>Configuration</th>
		<th>Description</th>
		<th>Default Value</th>
	</tr>
  <tr>
		<td><code>pulsar.address</code></td>
		<td><details>
       <summary>IP address of Pulsar</summary>
       <li>Environment variable: <code>PULSAR_ADDRESS</code></li>
       <li>Access Pulsar service with <code>pulsar.address</code>. <code>pulsar.address</code> and <code>pulsar.port</code> together generates the valid address to Pulsar. Pulsar preferentially acquires the valid address from the environment variable <code>PULSAR_ADDRESS</code> when Milvus is booted up.</li>
       <li>The default value applies when Pulsar and Milvus are running on the same network.</li>
       <li>Format: <code>pulsar://localhost:8888</code></li>
      </details></td>
		<td>localhost</td>
	</tr>
  <tr>
		<td><code>pulsar.port</code></td>
		<td><details>
       <summary>Port of Pulsar</summary>
       <li>Environment variable: <code>PULSAR_ADDRESS</code></li>
       <li>Access Pulsar service with <code>pulsar.port</code>. <code>pulsar.address</code> and <code>pulsar.port</code> together generates the valid address to Pulsar. Pulsar preferentially acquires the valid address from the environment variable <code>PULSAR_ADDRESS</code> when Milvus is booted up.</li>
       <li>Format: <code>pulsar://localhost:8888</code></li>
      </details></td>
		<td>6650</td>
	</tr>
</table>

### Server Address Configurations

This session configures the IP address and port of the monitor request from Milvus service.


<table id="server_address">
	<tr>
		<th>Configuration</th>
		<th>Description</th>
		<th>Default Value</th>
	</tr>
  <tr>
		<td><code>rootCoord.address</code></td>
		<td><details>
       <summary>TCP/IP address of root coordinator</summary>
       <li>Environment variable: <code>ROOT_COORD_ADDRESS</code></li>
       <li>Environment variable <code>rootCoord_ADDRESS</code> overrides this value.</li>
       <li>If you set this parameter as <code>0.0.0.0</code>, rootCoord monitors all IPv4 addresses.</li>
       <li>This parameter takes effect only after being configured at startup of Milvus.</li>
      </details></td>
		<td>localhost</td>
	</tr>
  <tr>
		<td><code>rootCoord.port</code></td>
		<td><details>
       <summary>TCP port of root coordinator</summary>
       <li>Environment variable: <code>ROOT_COORD_ADDRESS</code></li>
       <li>This parameter takes effect only after being configured at startup of Milvus.</li>
      </details></td>
		<td>53100</td>
	</tr>
  <tr>
		<td><code>proxy.port</code></td>
		<td><details>
       <summary>TCP port for monitoring Milvus</summary>
       <li>This parameter takes effect only after being configured at the startup of Milvus.</li>
      </details></td>
		<td>19530</td>
	</tr>
  <tr>
		<td><code>queryCoord.address</code></td>
		<td><details>
       <summary>TCP/IP address of query coordinator</summary>
       <li>Environment variable: <code>QUERY_COORD_ADDRESS</code></li>
       <li>Environment variable <code>QUERY_COORD_ADDRESS</code> overrides this value.</li>
       <li>If you set this parameter as <code>0.0.0.0</code>, query coordinator monitors all IPv4 addresses.</li>
       <li>This parameter takes effect only after being configured at startup of Milvus.</li>
      </details></td>
		<td>localhost</td>
	</tr>
  <tr>
		<td><code>queryCoord.port</code></td>
		<td><details>
       <summary>TCP port of query coordinator</summary>
       <li>Environment variable: <code>QUERY_COORD_ADDRESS</code></li>
       <li>This parameter takes effect only after being configured at startup of Milvus.</li>
      </details></td>
		<td>19531</td>
	</tr>
  <tr>
		<td><code>queryNode.port</code></td>
		<td><details>
       <summary>TCP port of query node</summary>
       <li>This parameter takes effect only after being configured at startup of Milvus.</li>
      </details></td>
		<td>21123</td>
	</tr>
  <tr>
		<td><code>indexCoord.address</code></td>
		<td><details>
       <summary>TCP/IP address of index coordinator</summary>
       <li>This parameter takes effect only after being configured at startup of Milvus.</li>
      </details></td>
		<td>localhost</td>
	</tr>
  <tr>
		<td><code>indexCoord.port</code></td>
		<td><details>
       <summary>TCP port of index coordinator</summary>
       <li>This parameter takes effect only after being configured at startup of Milvus.</li>
      </details></td>
		<td>31000</td>
	</tr>
  <tr>
		<td><code>indexNode.port</code></td>
		<td><details>
       <summary>TCP port of index node</summary>
       <li>This parameter takes effect only after being configured at startup of Milvus.</li>
      </details></td>
		<td>21121</td>
	</tr>
  <tr>
		<td><code>dataCoord.address</code></td>
		<td><details>
       <summary>TCP/IP address of data coordinator</summary>
       <li>This parameter takes effect only after being configured at startup of Milvus.</li>
      </details></td>
		<td>localhost</td>
	</tr>
  <tr>
		<td><code>dataCoord.port</code></td>
		<td><details>
       <summary>TCP port of data coordinator</summary>
       <li>This parameter takes effect only after being configured at startup of Milvus.</li>
      </details></td>
		<td>13333</td>
	</tr>
  <tr>
		<td><code>dataNode.port</code></td>
		<td><details>
       <summary>TCP port of data node</summary>
       <li>This parameter takes effect only after being configured at startup of Milvus.</li>
      </details></td>
		<td>21124</td>
	</tr>
</table>

### System Behavior Configurations

This session configures the system behaviors of Milvus.

<table id="system_behavior">
	<tr>
		<th>Configuration</th>
		<th>Description</th>
		<th>Default Value</th>
	</tr>
  <tr>
		<td><code>queryNode.gracefulTime</code></td>
		<td><details>
       <summary>Minimum time before the newly inserted data can be searched</summary>
       <li>Unit: ms</li>
       <li>Milvus executes this query command directly when the search message timestamp is ahead of the query node system time.</li>
       <li>When the <code>search</code> message timestamp is behind the query node system time, the search message waits for the query node system time to advance until the time difference between them is less than the value set in <code>queryNode.gracefulTime</code>, and then Milvus executes the query demand.</li>
      </details></td>
		<td>5000</td>
	</tr>
  <tr>
		<td><code>RootCoord.minSegmentSizeToEnableIndex</code></td>
		<td><details>
       <summary>The minimum row count in a segment required for creating index</summary>
       <li>This parameter specifies the minimum row count in a log file required for creating segment index.</li>
      </details></td>
		<td>1024</td>
	</tr>
  <tr>
		<td><code>datacoord.segment.size</code></td>
		<td><details>
       <summary>Maximum size of a segment</summary>
       <li><code>datacoord.segment.size</code> and <code>dataCoord.segment.sizeFactor</code> together determine if a segment can be sealed. Generally, the segment size ranges from 384 MB to 512 MB.</li>
      </details></td>
		<td>512</td>
	</tr>
  <tr>
		<td><code>datacoord.segment.sizeFactor</code></td>
		<td><details>
       <summary>Maximum proportion of a segment’s actual size comparing to <code>datacooord.segment.size</code></summary>
       <li>When actual proportion is greater than the set value, the corresponding segment can be sealed.</li>
      </details></td>
		<td>0.75</td>
	</tr>
  <tr>
		<td><code>datacoord.segment.IDAssignExpiration</code></td>
		<td><details>
       <summary>Time before the expiration of a valid vector ID</summary>
       <li>Unit: ms</li>
       <li>ID that data coord assigned to a vector expires. By default, a vector ID is valid for 2000 ms. The expired ID are not reusable.</li>
      </details></td>
		<td>2000</td>
	</tr>
  <tr>
		<td><code>datanode.flush.insertBufSize</code></td>
		<td><details>
       <summary>Maximum number of buffered <code>insert</code> requests in memory</summary>
       <li>Data node packs all buffered data into a binlog file and stores the file in MinIO/S3 when the row count of the data in memory exceeds this value.</li>
       <li>Setting this parameter is associated with the data size. If it is set too small, the system stores data in small size too frequently. If it is set too large, the system's demand for memory will increase.</li>
       <li>The default value applies to most scenarios. For a 128-dimensions floating-point vector, 32000 rows of data generate a binlog file of approximately 16 MB.</li>
      </details></td>
		<td>32000</td>
	</tr>
</table>


