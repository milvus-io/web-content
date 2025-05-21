---
id: configure_knowhere.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure knowhere for Milvus.
---

# knowhere-related Configurations

Any configuration related to the knowhere vector search engine

## `knowhere.enable`

<table id="knowhere.enable">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        When enable this configuration, the index parameters defined following will be automatically populated as index parameters, without requiring user input.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `knowhere.DISKANN.build.max_degree`

<table id="knowhere.DISKANN.build.max_degree">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum degree of the Vamana graph      </td>
      <td>56</td>
    </tr>
  </tbody>
</table>


## `knowhere.DISKANN.build.pq_code_budget_gb_ratio`

<table id="knowhere.DISKANN.build.pq_code_budget_gb_ratio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Size limit on the PQ code (compared with raw data)      </td>
      <td>0.125</td>
    </tr>
  </tbody>
</table>


## `knowhere.DISKANN.build.search_cache_budget_gb_ratio`

<table id="knowhere.DISKANN.build.search_cache_budget_gb_ratio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ratio of cached node numbers to raw data      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>


## `knowhere.DISKANN.build.search_list_size`

<table id="knowhere.DISKANN.build.search_list_size">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Size of the candidate list during building graph      </td>
      <td>100</td>
    </tr>
  </tbody>
</table>


## `knowhere.DISKANN.search.beam_width_ratio`

<table id="knowhere.DISKANN.search.beam_width_ratio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ratio between the maximum number of IO requests per search iteration and CPU number      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>


