---
id: configure_common.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure common parameters of Milvus.
title: Common Configurations
---

# Common Configurations

This topic introduces the common configurations of Milvus.

Under this section, you can configure the default names of partition and index, and the Time Travel (data retention) span of Milvus.

## `common.defaultPartitionName`

<table id="common.defaultPartitionName">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name of the default partition when a collection is created.</td>
      <td>"_default"</td>
    </tr>
  </tbody>
</table>

## `common.defaultIndexName`

<table id="common.defaultPartitionName">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name of the index when it is created with name unspecified.</td>
      <td>"_default_idx"</td>
    </tr>
  </tbody>
</table>

## `common.retentionDuration`

<table id="common.retentionDuration">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The retention duration of the deleted data allowed for Time Travel.</li>
        <li>Unit: Second</li>
      </td>
      <td>432000</td>
    </tr>
  </tbody>
</table>

## `common.ttMsgEnabled`

<table id="common.ttMsgEnabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Whether to disable the internal time messaging mechanism for the system. If disabled (set to `false`), the system will not allow DML operations, including insertion, deletion, queries, and searches. This helps Milvus-CDC synchronize incremental data.</td>
      <td>false</td>
    </tr>
  </tbody>
</table>