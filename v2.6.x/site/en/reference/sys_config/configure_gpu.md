---
id: configure_gpu.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure gpu for Milvus.
---

# gpu-related Configurations

#when using GPU indexing, Milvus will utilize a memory pool to avoid frequent memory allocation and deallocation.

#here, you can set the size of the memory occupied by the memory pool, with the unit being MB.

#note that there is a possibility of Milvus crashing when the actual memory demand exceeds the value set by maxMemSize.

#if initMemSize and MaxMemSize both set zero,

#milvus will automatically initialize half of the available GPU memory,

#maxMemSize will the whole available GPU memory.

## `gpu.initMemSize`

<table id="gpu.initMemSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Gpu Memory Pool init size      </td>
      <td>2048</td>
    </tr>
  </tbody>
</table>


## `gpu.maxMemSize`

<table id="gpu.maxMemSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Gpu Memory Pool Max size      </td>
      <td>4096</td>
    </tr>
  </tbody>
</table>


