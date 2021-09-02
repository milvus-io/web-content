---
id: configuration_cluster-basic.md
label: 基本配置
order: 0
group: cluster_sys
---
# 分布式版 Milvus 系统配置

分布式版 Milvus 通过系统配置项控制系统运行。所有配置项均可在服务启动前在相应配置文件中手动设置。各配置项的默认值可以直接投入使用。

<div class="alert note">
所有参数设置在 Milvus 启动时生效。
</div>

<div class="tab-wrapper"><a href="configuration_cluster-basic.md" class='active '>基本配置</a><a href="configuration_cluster-advanced.md" class=''>高级配置</a></div>


入门级用户只需要通过更改以下两个配置使 Milvus 初步适应测试/开发/生产环境。

## 日志配置

日志配置用于控制系统的日志输出。Milvus 的服务过程中会产生丰富的日志，默认配置下 Milvus 会将日志输出到标准输出（stdout）和标准错误输出（stderr），日志会记录 `debug` 及以上级别的内容。 你可以在 [**milvus.yaml**](https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml) 中设置这些参数。

<table id="casual_user">
<thead>
  <tr>     
    <th class="width20">参数</th>     
    <th class="width70">说明</th>     
    <th class="width10">默认值</th>   
  </tr>
</thead>
<tbody>
  <tr>     
    <td><code>log.level</code></td>
    <td>
      <details>
       <summary>日志记录等级</summary>
        <li>
           你可以将该参数设置为 <code>debug</code>、<code>info</code>、<code>warn</code>、<code>error</code>、<code>panic</code> 或  <code>fatal</code>.
        </li> 
        <li>
           我们建议在测试和开发环境中使用 <code>debug</code> 级别，生产环境中使用 <code>info</code> 级别。
         </li>
      </details>
    </td>     
    <td><code>debug</code></td>
  </tr>
  <tr>     
    <td><code>log.file.rootPath</code></td>
    <td>
      <details>
       <summary>日志文件根路径</summary>
        <li>
           该参数默认值为空，表示将日志输出到标准输出（stdout）和标准错误输出（stderr）。
        </li>
        <li>
           如果将该参数设定为有效本地的路径，Milvus 会将日志文件存储在此路径。
        </li>
        <li>
           请将该参数设定为具备写入权限的路径，推荐使用 <b>/tmp/milvus</b>.
         </li>
      </details>
    </td>     
    <td>""</td>
  </tr>
</tbody>
</table>

