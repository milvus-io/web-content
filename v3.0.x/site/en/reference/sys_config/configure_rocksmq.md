---
id: configure_rocksmq.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure rocksmq for Milvus.
---

# rocksmq-related Configurations

If you want to enable kafka, needs to comment the pulsar configs

kafka:

  brokerList: localhost:9092

  saslUsername: 

  saslPassword: 

  saslMechanisms: 

  securityProtocol: 

  ssl:

    enabled: false # whether to enable ssl mode

    tlsCert:  # path to client's public key (PEM) used for authentication

    tlsKey:  # path to client's private key (PEM) used for authentication

    tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

    tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any

  readTimeout: 10



## `rocksmq.path`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefix of the key to where Milvus stores data in RocksMQ.</li>      
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>      
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>      
        <li>Set an easy-to-identify root key prefix for Milvus if etcd service already exists.</li>      </td>
      <td>/var/lib/milvus/rdb_data</td>
    </tr>
  </tbody>
</table>


## `rocksmq.lrucacheratio`

<table id="rocksmq.lrucacheratio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        rocksdb cache memory ratio      </td>
      <td>0.06</td>
    </tr>
  </tbody>
</table>


## `rocksmq.rocksmqPageSize`

<table id="rocksmq.rocksmqPageSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of messages in each page in RocksMQ. Messages in RocksMQ are checked and cleared (when expired) in batch based on this parameters. Unit: Byte.      </td>
      <td>67108864</td>
    </tr>
  </tbody>
</table>


## `rocksmq.retentionTimeInMinutes`

<table id="rocksmq.retentionTimeInMinutes">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum retention time of acked messages in RocksMQ. Acked messages in RocksMQ are retained for the specified period of time and then cleared. Unit: Minute.      </td>
      <td>4320</td>
    </tr>
  </tbody>
</table>


## `rocksmq.retentionSizeInMB`

<table id="rocksmq.retentionSizeInMB">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum retention size of acked messages of each topic in RocksMQ. Acked messages in each topic are cleared if their size exceed this parameter. Unit: MB.      </td>
      <td>8192</td>
    </tr>
  </tbody>
</table>


## `rocksmq.compactionInterval`

<table id="rocksmq.compactionInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Time interval to trigger rocksdb compaction to remove deleted data. Unit: Second      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>


## `rocksmq.compressionTypes`

<table id="rocksmq.compressionTypes">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        compaction compression type, only support use 0,7. 0 means not compress, 7 will use zstd. Length of types means num of rocksdb level.      </td>
      <td>0,0,7,7,7</td>
    </tr>
  </tbody>
</table>


