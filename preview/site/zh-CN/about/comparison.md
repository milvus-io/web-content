---
id: comparison.md
title: Milvus 2.0 新增功能
---
# Milvus 2.0 新增功能

随着新需求的出现，Milvus 2.0 横空出世，与此同时 Milvus 之前版本将逐渐淡出视野。为获得最佳使用体验，我们强烈建议启用最新版本的 Milvus。

## 设计理念
围绕以下三个理念，我们重新定义下一代云原生向量数据库：

**云原生优先：** 我们认为，只有存储计算分离的架构才能发挥云的弹性，实现按需扩容的模式。另一个值得注意是 Milvus 2.0 采取了 **读写分离、实时离线分离、计算瓶颈/内存瓶颈/IO瓶颈分离** 的微服务化设计模式，这有助于我们面对复杂的工作负载选择最佳的资源配比。

**日志即数据（log as data）：** Milvus 引入消息存储作为系统的骨架，数据的插入修改只通过消息存储交互，执行节点通过 **订阅消息流（publish/subscribe）** 来执行数据库的增删改查操作。这一设计的优势在于降低了系统的复杂度，将数据库关键的持久化和闪回等能力都下钻到存储层；另一方面，日志订阅机制提供了极大的灵活性，为系统未来的拓展奠定了基础。

**批流一体：** Milvus 2.0 实现了 Kappa+ 流式处理架构，增量数据和离线数据一体化处理。相比 Kappa 架构，Milvus 引入对日志流的批量计算将日志快照和构建索引存入对象存储，这大大提高了故障恢复速度和查询效率。为了将无界的流式数据拆分成有界的窗口，Milvus 采用 watermark 机制，通过写入时间（也可以是事件发生时间）将数据切分为多个小的处理单元（message pack），并维护了一条时间轴便于用户基于某个时间点进行查询。

## 功能亮点
Milvus 2.0 作为一款开源分布式向量数据库产品，始终将产品的易用性放在系统设计的第一优先级。一款数据库的使用成本不仅包含了运行态的资源消耗成本，也包含了运维成本和接入学习成本。Milvus 新版本支持了大量降低用户使用成本的功能。

#### 持续可用
实现数据的可靠存储和可持续的服务是对数据库产品的基本要求。我们的理念是 Fail cheap, fail small, fail often。Fail cheap 指的是 Milvus 采取的存储计算分离架构，节点失败恢复的处理十分简单，且代价很低。Fail small 指的是 Milvus 采取分而治之的思想，每个协调服务仅处理读/写/增量/历史数据中的一个部分，设计被大大简化。Fail often 指的是混沌测试的引入，通过故障注入模拟硬件异常、依赖失效等场景，加速问题在测试环境被发现的概率。

#### 向量/标量混合查询
为了解决结构化数据和非结构化数据的割裂问题，Milvus 2.0 支持标量存储和向量标量混合查询。混合查询帮助用户找出符合过滤表达式的近似邻，目前 Milvus 支持等于、大于、小于等关系运算以及 NOT、AND、OR 、IN 等逻辑运算。

#### 多一致性
Milvus 2.0 是基于消息存储构建的分布式数据库，遵循 PACELC 定理所定义的，必须在一致性和可用性/延迟之间进行取舍。绝大多数 Milvus 场景在生产中不应过分关注数据一致性的问题，原因是接受少量数据不可见对整体召回率(Recall)的影响极小，但对于性能的提升帮助很大。尽管如此，我们认为强一致性(Strong)、有界一致性(Bounded Staleness)、会话一致性(Session) 等一致性保障语义依然有其独特的应用场景。比如，在功能测试场景下，用户可能期待使用强一致语义保证测试结果的正确性，因此Milvus支持请求级别的可调一致性级别。

#### 时间旅行
数据工程师经常会因为脏数据、代码逻辑等问题需要回滚数据。传统的数据库通常通过快照方式来实现数据回滚，有时甚至需要重新训练，带来高昂的额外开销和维护成本。Milvus 对所有数据增删操作维护了一条时间轴，用户查询时可以指定时间戳以获取某个时间点之前的数据视图。基于 Time Travel，Milvus 还可以很轻量地实现备份和数据克隆功能。

#### ORM Python SDK：
对象关系映射（object relational mapping，ORM）技术使用户更加关注于业务模型而非底层的数据模型，便于开发者维护表、字段与程序之间的关联关系。为了弥补 AI 算法概念验证（Proof of concept）到实际生产部署之间的缺口，我们设计了 Milvus ORM API，而其背后的实现可以是通过嵌入式的 library、单机部署、分布式集群，也可能是云服务。通过统一的 API 提供一致的使用体验，避免云端两侧重复开发、测试与上线效果不一致等问题。

![ORM_Python_SDK](../../../assets/python_orm.png)

#### 丰富的周边支持：
- **Milvus Insight** 是 Milvus 图形化管理界面，包含了集群状态可视化、元数据管理、数据查询等实用功能。Milvus Insight 源码也会作为独立项目开源，期待有更多感兴趣的人加入共同建设。

- 支持基于 helm 和 docker-compose 的一键部署。

- Milvus 2.0 使用开源时序数据库 Prometheus 存储性能和监控数据，同时依赖 Grafana 进行指标展示。


## Milvus 2.0：性能更优、功能更强

<table class="demo">
	<thead>
	<tr>
		<th>&nbsp;</th>
		<th>Milvus 2.0</th>
		<th>Milvus 1.x</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<th>架构</th>
		<td>云原生</td>
		<td>共享存储</td>
	</tr>
	<tr>
		<th>可扩展性</th>
		<td>500+ 个节点</td>
		<td>1 - 32 个读节点，1 个写节点</td>
	</tr>
  	<tr>
		<th>持久性</th>
		<td><li>对象存储 (OSS)</li><li>分布式文件系统 (DFS)</li></td>
		<td><li>本地磁盘</li><li>网络文件系统 (NFS)</li></td>
	</tr>
  	<tr>
		<th>可用性</th>
		<td>99.9%</td>
		<td>99%</td>
	</tr>
	<tr>
		<th>数据一致性</th>
		<td>多种一致性<li>Strong</li><li>Bounded Staleness</li><li>Session</li><li>Consistent prefix</li></td>
		<td>最终一致</td>
	</tr>
	<tr>
		<th>数据类型支持</th>
		<td><li>向量数据</li><li>标量数据</li><li>字符串与文本 (开发中)</li></td>
		<td>向量数据</td>
	</tr>
	<tr>
		<th>基本操作</th>
		<td><li>插入数据</li><li>删除数据 (开发中)</li><li>数据查询</li><li>相似最邻近（ANN）搜索</li><li>基于半径的最近邻算法（RNN） (开发中)</li></td>
		<td><li>插入数据</li><li>删除数据</li><li>相似最邻近（ANN）搜索</li></td>
	</tr>
	<tr>
		<th>高级功能</th>
		<td><li>标量字段过滤</li><li>Time Travel</li><li>多云/地域部署</li><li>数据管理工具</li></td>
		<td><li>Mishards</li><li>Milvus DM 数据迁移工具</li></td>
	</tr>
	<tr>
		<th>索引类型</th>
		<td><li>Faiss</li><li>Annoy</li><li>Hnswlib</li><li>RNSG</li><li>ScaNN (开发中)</li><li>On-disk index (开发中)</li></td>
		<td><li>Faiss</li><li>Annoy</li><li>Hnswlib</li><li>RNSG</li></td>
	</tr>
	<tr>
		<th>SDK</th>
		<td><li>Python</li><li>Go (开发中)</li><li>RESTful (开发中)</li><li>C++ (开发中)</li></td>
		<td><li>Python</li><li>Java</li><li>Go</li><li>RESTful</li><li>C++</li></td>
	</tr>
	<tr>
		<th>当前状态</th>
		<td>预览版本。预计 2021 年 8 月发布稳定版本。</td>
		<td>长期支持（LTS）版本</td>
	</tr>
	</tbody>
</table>
