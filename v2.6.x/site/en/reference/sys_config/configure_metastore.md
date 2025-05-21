---
id: configure_metastore.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure metastore for Milvus.
---

# metastore-related Configurations



## `metastore.type`

<table id="metastore.type">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Default value: etcd, Valid values: [etcd, tikv]      </td>
      <td>etcd</td>
    </tr>
  </tbody>
</table>


## `metastore.snapshot.ttl`

<table id="metastore.snapshot.ttl">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        snapshot ttl in seconds      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>


## `metastore.snapshot.reserveTime`

<table id="metastore.snapshot.reserveTime">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        snapshot reserve time in seconds      </td>
      <td>3600</td>
    </tr>
  </tbody>
</table>


