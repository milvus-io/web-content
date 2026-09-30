---
id: configure_etcd.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure etcd for Milvus.
---

# etcd-related Configurations

Related configuration of etcd, used to store Milvus metadata & service discovery.

## `etcd.endpoints`

<table id="etcd.endpoints">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Endpoints used to access etcd service. You can change this parameter as the endpoints of your own etcd cluster.</li>      
        <li>Environment variable: ETCD_ENDPOINTS</li>      
        <li>etcd preferentially acquires valid address from environment variable ETCD_ENDPOINTS when Milvus is started.</li>      </td>
      <td>localhost:2379</td>
    </tr>
  </tbody>
</table>


## `etcd.rootPath`

<table id="etcd.rootPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Root prefix of the key to where Milvus stores data in etcd.</li>      
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>      
        <li>To share an etcd instance among multiple Milvus instances, consider changing this to a different value for each Milvus instance before you start them.</li>      
        <li>Set an easy-to-identify root path for Milvus if etcd service already exists.</li>      
        <li>Changing this for an already running Milvus instance may result in failures to read legacy data.</li>      </td>
      <td>by-dev</td>
    </tr>
  </tbody>
</table>


## `etcd.metaSubPath`

<table id="etcd.metaSubPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-prefix of the key to where Milvus stores metadata-related information in etcd.</li>      
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>      
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>      </td>
      <td>meta</td>
    </tr>
  </tbody>
</table>


## `etcd.kvSubPath`

<table id="etcd.kvSubPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-prefix of the key to where Milvus stores timestamps in etcd.</li>      
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>      
        <li>It is recommended not to change this parameter if there is no specific reason.</li>      </td>
      <td>kv</td>
    </tr>
  </tbody>
</table>


## `etcd.log.level`

<table id="etcd.log.level">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Only supports debug, info, warn, error, panic, or fatal. Default 'info'.      </td>
      <td>info</td>
    </tr>
  </tbody>
</table>


## `etcd.log.path`

<table id="etcd.log.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>path is one of:</li>      
        <li> - "default" as os.Stderr,</li>      
        <li> - "stderr" as os.Stderr,</li>      
        <li> - "stdout" as os.Stdout,</li>      
        <li> - file path to append server logs to.</li>      
        <li>please adjust in embedded Milvus: /tmp/milvus/logs/etcd.log</li>      </td>
      <td>stdout</td>
    </tr>
  </tbody>
</table>


## `etcd.ssl.enabled`

<table id="etcd.ssl.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether to support ETCD secure connection mode      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `etcd.ssl.tlsCert`

<table id="etcd.ssl.tlsCert">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        path to your cert file      </td>
      <td>/path/to/etcd-client.pem</td>
    </tr>
  </tbody>
</table>


## `etcd.ssl.tlsKey`

<table id="etcd.ssl.tlsKey">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        path to your key file      </td>
      <td>/path/to/etcd-client-key.pem</td>
    </tr>
  </tbody>
</table>


## `etcd.ssl.tlsCACert`

<table id="etcd.ssl.tlsCACert">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        path to your CACert file      </td>
      <td>/path/to/ca.pem</td>
    </tr>
  </tbody>
</table>


## `etcd.ssl.tlsMinVersion`

<table id="etcd.ssl.tlsMinVersion">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>TLS min version</li>      
        <li>Optional values: 1.0, 1.1, 1.2, 1.3。</li>      
        <li>We recommend using version 1.2 and above.</li>      </td>
      <td>1.3</td>
    </tr>
  </tbody>
</table>


## `etcd.requestTimeout`

<table id="etcd.requestTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Etcd operation timeout in milliseconds      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>


## `etcd.use.embed`

<table id="etcd.use.embed">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether to enable embedded Etcd (an in-process EtcdServer).      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `etcd.data.dir`

<table id="etcd.data.dir">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Embedded Etcd only. please adjust in embedded Milvus: /tmp/milvus/etcdData/      </td>
      <td>default.etcd</td>
    </tr>
  </tbody>
</table>


## `etcd.auth.enabled`

<table id="etcd.auth.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether to enable authentication      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `etcd.auth.userName`

<table id="etcd.auth.userName">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        username for etcd authentication      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `etcd.auth.password`

<table id="etcd.auth.password">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        password for etcd authentication      </td>
      <td></td>
    </tr>
  </tbody>
</table>


