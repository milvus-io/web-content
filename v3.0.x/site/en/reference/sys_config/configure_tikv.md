---
id: configure_tikv.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure tikv for Milvus.
---

# tikv-related Configurations

Related configuration of tikv, used to store Milvus metadata.

Notice that when TiKV is enabled for metastore, you still need to have etcd for service discovery.

TiKV is a good option when the metadata size requires better horizontal scalability.

## `tikv.endpoints`

<table id="tikv.endpoints">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Note that the default pd port of tikv is 2379, which conflicts with etcd.      </td>
      <td>127.0.0.1:2389</td>
    </tr>
  </tbody>
</table>


## `tikv.rootPath`

<table id="tikv.rootPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The root path where data is stored in tikv      </td>
      <td>by-dev</td>
    </tr>
  </tbody>
</table>


## `tikv.metaSubPath`

<table id="tikv.metaSubPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        metaRootPath = rootPath + '/' + metaSubPath      </td>
      <td>meta</td>
    </tr>
  </tbody>
</table>


## `tikv.kvSubPath`

<table id="tikv.kvSubPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        kvRootPath = rootPath + '/' + kvSubPath      </td>
      <td>kv</td>
    </tr>
  </tbody>
</table>


## `tikv.requestTimeout`

<table id="tikv.requestTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        ms, tikv request timeout      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>


## `tikv.snapshotScanSize`

<table id="tikv.snapshotScanSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        batch size of tikv snapshot scan      </td>
      <td>256</td>
    </tr>
  </tbody>
</table>


## `tikv.ssl.enabled`

<table id="tikv.ssl.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Whether to support TiKV secure connection mode      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `tikv.ssl.tlsCert`

<table id="tikv.ssl.tlsCert">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        path to your cert file      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `tikv.ssl.tlsKey`

<table id="tikv.ssl.tlsKey">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        path to your key file      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `tikv.ssl.tlsCACert`

<table id="tikv.ssl.tlsCACert">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        path to your CACert file      </td>
      <td></td>
    </tr>
  </tbody>
</table>


