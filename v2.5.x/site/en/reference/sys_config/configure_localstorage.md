---
id: configure_localstorage.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure localStorage for Milvus.
---

# localStorage-related Configurations



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
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>      </td>
      <td>/var/lib/milvus/data/</td>
    </tr>
  </tbody>
</table>


