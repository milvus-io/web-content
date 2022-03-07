---
id: configure_etcd.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure etcd for Milvus.
---

# etcd 相关配置



当前主题介绍 Milvus 中 etcd 的相关配置。

etcd 是支持 Milvus 元数据存储和访问的元数据引擎。

在本节中，你可以配置 etcd 端点、相关键前缀等。

## `etcd.endpoints`

<table id="etcd.endpoints">
  <thead>
    <tr>
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>用以访问 etcd 服务的端点。你可以将此参数更改为你自己的 etcd 集群的端点。</li>
        <li>环境变量： <code>ETCD_ENDPOINTS</code></li>
        <li>当 Milvus 启动时，etcd 优先从环境变量 <code>ETCD_ENDPOINTS</code> 获取有效地址。</li>
      </td>
      <td>localhost:2379</td>
    </tr>
  </tbody>
</table>


## `etcd.rootPath`

<table id="etcd.rootPath">
  <thead>
    <tr>
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Milvus 在 etcd 中存储数据的键的根前缀。</li>
        <li>注意：使用 Milvus 一段时间后更改此参数会影响对旧数据的访问。</li>
        <li>建议在首次启动 Milvus 之前更改此参数。</li>
        <li>如果 etcd 服务已经存在，则为 Milvus 设置一个易于识别的前缀。</li>
      </td>
      <td>by-dev</td>
    </tr>
  </tbody>
</table>

## `etcd.metaSubPath`

<table id="etcd.metaSubPath">
  <thead>
    <tr>
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Milvus 在 etcd 中存储元数据相关信息的键的次前缀。</li>
        <li>注意：使用 Milvus 一段时间后更改此参数会影响对旧数据的访问。</li>
        <li>建议在首次启动 Milvus 之前更改此参数。</li>
      </td>
      <td>meta</td>
    </tr>
  </tbody>
</table>


## `etcd.kvSubPath`

<table id="etcd.kvSubPath">
  <thead>
    <tr>
      <th class="width80">描述</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Milvus 在 etcd 中存储时间戳的键的次前缀。</li>
        <li>注意：使用 Milvus 一段时间后更改此参数会影响对旧数据的访问。</li>
        <li>如无特殊原因，建议不要更改此参数。</li>
      </td>
      <td>kv</td>
    </tr>
  </tbody>
</table>

