---
id: configure_localstorage.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure local storage of Milvus.
title: Local Storage-related Configurations
---

# Local Storage-related Configurations

This topic introduces the local storage-related configurations of Milvus.

Milvus stores the vector data in local storage during search or query to avoid repetitive access to MinIO or S3 service.

Under this section, you can enable local storage, and configure the path, etc.


## `localStorage.path`

<table id="localStorage.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Local path to where vector data are stored during a search or a query to avoid repetitve access to MinIO or S3 service.</li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
        <li>This configuration takes effect only when <code>localStorage.enabled</code> is set as <code>true</code>.</li>
      </td>
      <td>/var/lib/milvus/data</td>
    </tr>
  </tbody>
</table>

## `localStorage.enabled`

<table id="localStorage.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Switch value to control if to enable the local storage of the vector data to avoid repetitve access to MinIO or S3 service.
      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>

