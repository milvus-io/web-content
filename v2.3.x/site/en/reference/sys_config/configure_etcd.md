---
id: configure_etcd.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure etcd for Milvus.
title: etcd-related Configurations
---

# etcd-related Configurations

This topic introduces the etcd-related configurations of Milvus. etcd is the metadata engine supporting Milvus' metadata storage and access. 

In this section, you can configure etcd endpoints, relevant key prefixes, etc.

<div class="alert note">
To share an etcd instance among multiple Milvus instances, you need to change <code>etcd.rootPath</code> to a unique value for each of the Milvus instances. For details, refer to <a href="operational_faq.md#Can-I-share-an-etcd-instance-among-multiple-Milvus-instances">Operation FAQs</a>.
</div>

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
        <li>Environment variable: <code>ETCD_ENDPOINTS</code></li>
        <li>etcd preferentially acquires valid address from environment variable <code>ETCD_ENDPOINTS</code> when Milvus is started.</li>
      </td>
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
        <li>To share an etcd instance among multiple Milvus instances, consider changing this to a different value for each Milvus instance before you start them. For details, see <a href="operational_faq.md#Can-I-share-an-etcd-instance-among-multiple-Milvus-instances">Operation FAQs</a>.</li>
        <li>Set an easy-to-identify root path for Milvus if etcd service already exists.</li>
        <li>Changing this for an already running Milvus instance may result in failures to read legacy data.</li>
      </td>
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
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
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
        <li>It is recommended not to change this parameter if there is no specific reason.</li>
      </td>
      <td>kv</td>
    </tr>
  </tbody>
</table>


