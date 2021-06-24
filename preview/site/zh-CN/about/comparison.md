---
id: comparison.md
title: Milvus 2.0 新增功能
---
# Milvus 2.0 vs. 1.x

<table class="demo">
	<thead>
	<tr>
		<th>&nbsp;</th>
		<th>Milvus 1.x</th>
		<th>Milvus 2.0</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<th>架构</th>
		<td>共享存储</td>
		<td>云原生</td>
	</tr>
	<tr>
		<th>可扩展性</th>
		<td>1 - 32 个读节点，1 个写节点</td>
		<td>500+ 个节点</td>
	</tr>
  	<tr>
		<th>持久性</th>
		<td><li>本地磁盘</li><li>网络文件系统 (NFS)</li></td>
		<td><li>对象存储 (OSS)</li><li>分布式文件系统 (DFS)</li></td>
	</tr>
  	<tr>
		<th>可用性</th>
		<td>99%</td>
		<td>99.9%</td>
	</tr>
	<tr>
		<th>数据一致性</th>
		<td>最终一致</td>
		<td>多种一致性<li>Strong</li><li>Bounded Staleness</li><li>Session</li><li>Consistent prefix</li></td>
	</tr>
	<tr>
		<th>数据类型支持</th>
		<td>向量数据</td>
		<td><li>向量数据</li><li>标量数据</li><li>字符串与文本 (开发中)</li></td>
	</tr>
	<tr>
		<th>基本操作</th>
		<td><li>插入数据</li><li>删除数据</li><li>相似最邻近（ANN）搜索</li></td>
		<td><li>插入数据</li><li>删除数据 (开发中)</li><li>数据查询</li><li>相似最邻近（ANN）搜索</li><li>基于半径的最近邻算法（RNN） (开发中)</li></td>
	</tr>
	<tr>
		<th>高级功能</th>
		<td><li>Mishards</li><li>Milvus DM 数据迁移工具</li></td>
		<td><li>标量字段过滤</li><li>Time Travel</li><li>多云/地域部署</li><li>数据管理工具</li></td>
	</tr>
	<tr>
		<th>索引类型</th>
		<td><li>Faiss</li><li>Annoy</li><li>Hnswlib</li><li>RNSG</li></td>
		<td><li>Faiss</li><li>Annoy</li><li>Hnswlib</li><li>RNSG</li><li>ScaNN (开发中)</li><li>On-disk index (开发中)</li></td>
	</tr>
	<tr>
		<th>SDK</th>
		<td><li>Python</li><li>Java</li><li>Go</li><li>RESTful</li><li>C++</li></td>
		<td><li>Python</li><li>Go (开发中)</li><li>RESTful (开发中)</li><li>C++ (开发中)</li></td>
	</tr>
	<tr>
		<th>当前状态</th>
		<td>长期支持（LTS）版本</td>
		<td>预览版本。预计 2021 年 8 月发布稳定版本。</td>
	</tr>
	</tbody>
</table>
