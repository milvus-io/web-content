---
id: configure_indexcoord.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure indexCoord for Milvus.
---

# indexCoord-related Configurations



## `indexCoord.segment.minSegmentNumRowsToEnableIndex`

<table id="indexCoord.segment.minSegmentNumRowsToEnableIndex">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        It's a threshold. When the segment num rows is less than this value, the segment will not be indexed      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>


