---
id: UserGuide
title: Milvus User Guide
sidebar_label: Milvus User Guide
---

# Milvus User Guide

## Preface

### Overview
Milvus is a full-winged, reliable feature vector database that supports indexing large scale high-dimension vectors in seconds. About Milvus benefits and values, please visit [Product Benefits](https://github.com/milvus-io/docs/blob/dev/zh-CN/MilvusHighlights).

This guide introduces configuring and managing Milvus, helping you get a deeper understanding of Milvus charateristics and features.

If you need customer support, you may contact us by email: support@zilliz.com.

For more detailed knowledge about Milvus and feature vector database, go to [Feature Vector Database Introduction](https://github.com/milvus-io/docs/blob/dev/zh-CN/MilvusIntro.md).

### Statement
The documentation is for reference only. All content in the documentation doesn't constitue as any explicite or implicite guarantee.

### Key concepts
- Feature vector database

- Milvus file


### Conventions used in this guide

| Convention       |    Description                                |
|-----------|-----------------------------------------|
| bold      | Bold type indicates headlines, or content that needs to be emphasized.    |
| italic    | Italic type indicates file paths, file names, UI strings, or placeholder variables for which you supply particular values. |
| Consolas  | Consolas type indicates code examples within a paragraph |
| Note      | Note is a supplimentary explanation to an action or a logic.          |


## Quick start
For how to install Milvus and run an example program, you may read: [Milvus Quick Start](https://github.com/milvus-io/docs/blob/dev/zh-CN/QuickStart.md).


## Configuring Milvus

### Milvus file introduction
After you have successfully started Milvus server, you can see a Milvus file under the path *home/$USER/milvus*, which contains the following child files:

- *milvus/db* (database storage)
- *milvus/logs* (log storage)
- *milvus/conf* (configuration file)
    - *server_config.yaml* (service configuration file)
    - *log_config.conf* (log configuration file)
- *milvus/test* (test scripts)

### Configuring Milvus service

Follow these procedures to configure Milvus service:

1. Follow the path *home/$USER/milvus/conf*, and open Milvus service configuration file *server_config.yaml*.

2. Modify the parameters in the file.

   1) Click file *server_config*, and configure service parameters.
   
     | Parameter            | Description                          | Reference value           |
     |----------------|-----------------------------------|-------------------|
     | address        | The IP address that Milvus server monitors      | 0.0.0.0           |
     | port           | The port that Milvus server monitors, default is 19530 | 1025 ~ 65534 |            
     | gpu_index      | Current GPU, default is 0          | 0 ~ GPU number ~1                |
     | mode           | Milvus deployment method                    | single / cluster |            
                                                                                                                     
   2）Click file *db_config*, and configure database parameters.
   
     | Parameter               | Description                            | Reference value    |
     |-------------------|-------------------------------------|----------|
     | db_path           | Directory of Milvus database files            |    ？    |
     | db_backend_url    | Meta database URI                         | http://127.0.0.1  |
     | index_building_threshold | index building trigger value       |  1024（MB）  |

   3）Click file *metric_config*, and configure monitor parameters.
   
     |Parameter               |  Description                             | Reference value     |
     |-------------------|-------------------------------------|----------|
     | is_startup        | Select if or not to turn on the monitoring system          | on / off |
     | collector         | Connected monitoring system               | Prometheus             |
     | collect_type      | Data collecting type of Prometheus     |   pull / push          |
     | port              | Port to visit Prometheus       | 8080                   |
     | push_gateway_ip_address | IP address of push gateway   | 127.0.0.1             |
     | push_gateway_port       | Port of push gateway   |  9091                 |

   4）Click file *cache_config*, and configure the parameter.
   
     |  Parameter                | Description                             | Reference value     |
     |-------------------|-------------------------------------|----------|
     | cpu_cache_capacity |用于cache的内存量，默认值为16GB       |  0 ~ 机器内存总量 |

3. Restart Milvus Docker.

   ```
   $ docker restart <container id>
   ```


## Creating a table 
> Note：All the following actions are executed in Python. For other languages, Milvus supports RESTful and RPC.

### Prerequisites
When you have finished the installation and basic configuration of Milvus, you may go on and create a table to insert data into. Before that, ensure you have：

1. Imported pymilvus.

   ```python
   # Import pymilvus
   >>> from milvus import Milvus, Prepare, IndexType, Status

   ```
2. Connected Milvus to your local server.

   ```
   # Connect Milvus to server
   >>> milvus = Milvus()
   >>> milvus.connect(host='SERVER-HOST', port='SERVER-PORT')
   Status(message='connected!', code=0)

   ```
### Creating a table
This section shows you how to create a table in Milvus. To make it easier to understand, all task procedures are based on an example of  Table test01 creation. Here are all related parameters. You can set parameter values to your needs.

|  Parameter  |  Description  |  Type   |  Reference value   |
| ------------| --------------| --------| ---------|
| table_name  | Name of the table you want to create (table name is made of numbers, letters and _)| String | 'table name' |
| dimension   | Vector dimensions | Integer | 0 < dimension <= 10000, usually set to 128, 256 or 518
| index_type  |2 types of indexing methods: 1. `FLAT` - 精确向量索引类型；2. `INVALID` - 基于K-means的向量索引，精度有损失，但搜索速度更快；|IndexType|FLAT / IVFLAT / INVALID(default)|

> 注意：如果没有GPU，将index_type设置成`IVFLAT`，系统将报错。

1. Prepare table parameters.
  
   ```
   # Prepare param
   >>> param = {'table_name'='test01', 'dimension'=256, 'index_type'=IndexType.FLAT}
   ```
   
2. Create Table test01.

   ```
   # Create a table
   >>> milvus.create_table(param)
   Status(message='Table test01 created!', code=0)
   ```
   
3. Confirm the information of the table just created.
   ```
   # Confirm table info.
   >>> status, table = milvus.describe_table('test01')
   >>> status
   Status(message='Describe table successfully!')
   >>> table
   TableSchema(table_name='test01',dimension=256, index_type=1, store_raw_vector=False)
   
   ```                        


## Inporting vectors
When you have successfully tables in Milvus, you can start inserting data into the table. Of course, one prerequisite of this step is that you already have proper multi-dimensional vectors. Before importing vectors to the table, get familiar with the related parameters:

|Parameter|Description|Type|Reference value|
|---------|-----------|----|-----|
|table_name| Name of the table you want to create (table name is made of numbers, letters and _)| String| 'table name'|
|records| A list of vectors to insert into the table. Vector value should be a float (decimal), with the same dimension as that of the table |2-dimension type|[[0.1, 0.2, ...], ...]

Following the above mentioned example, below content demonstrates how to insert 20 256-dimensional vectors(represented by "records" in the code) into Table test01:

```
# Import vectors
>>> status, ids = milvus.add_vectors(table_name='test01', records=vectors)
>>> status
Status(code=0, message='Success')
>>> ids  # 20 ids returned
23455321135511233
12245748929023489
...
```


## Searching with Milvus
Now, you have inserted vectors into Table test01, you can start searching with Milvus. In addition, you are allowed not only to search multiple data sets, and also to search within a specific range. Before the search, familiarize yourself with seach related parameters:

|Parameter|Description|Type|Reference value|
|---------|-----------|----|-----|
|table_name|Name of the table you want to create (table name is made of numbers, letters and _)|String|'table name'|
|top_k| Top k most similar results of target vector| Integer | 0 < top_k <= 10000|
|query_records| A list of vectors to insert into the table. Vector value should be a float (decimal), with the same dimension as that of the table |2-dimension type | [[0.1, 0.2, ...], ...] |
|query_ranges (optional)| Search range, for example you can search within a specific date range. The default value is 'None' (no range), meaning to search the entire database|list[tuple]|[('2019-01-01', '2019-01-02'), ...]|

> Note: Currently, only date range is supported in query_ranges. The date format is 'yyyy-mm-dd'. The date range [2019.1.1, 2019.1.3) contains 2019.1.1 and 2019.1.3.

Suppose you want to search the top 10 most similar vectors of 5 256-dimensional vectors (represented by "query_records" in below codes), you may: 

   ```
   # Search 5 vectors
   >>> status, results = milvus.search_vectors(table_name='test01', query_records=q_records, top_k=10)
   >>> status
   Status(message='Search vectors successfully!', code=0)
   >>> results # Searched top_k vectors
   [[QueryResult(id=1561709418638204004, score=62.554189514479866), ..., ],
   [QueryResult(id=1561709418638204018, score=59.801433231755965), ..., ],
   ...
   ]
   ```
 

## Deleting a table
You may delete a table in Milvus when necessary. For example, to delete Table test01, you only need to: 

```
# Delete table
>>> milvus.delete_table(table_name='test01')
Status(message='Delete table successfully!', code=0)
```


## Searching a table

### Searching table name
You can search all table names by this: 

```python
>>> status, tables = milvus.show_tables()
>>> status
Status(message='Show tables successfully!', code=0)
>>> tables
['test01', 'others', ...]
```

### Searching table information
Follow this to search the information of a particular table:

```python
>>> status, table = milvus.describe_table('test01')
>>> status
Status(message='Describe table successfully!')
>>> table
TableSchema(table_name='test01',dimension=256, index_type=1, store_raw_vector=False)
```

### Checking if a table exists
To check if a table exists in Milvus, simply do this:

```python
>>> milvus.has_table(table_name='test01')
True
```
> Note: If the table you searched is no longer available, *False* will be returned instead of *True*.


> Note: If you want to learn more detailed operations in Milvus, you may read [Milvus Python SDK](https://pypi.org/project/pymilvus) and [Examples](https://github.com/milvus-io/pymilvus/blob/master/examples/example.py)。



## Monitoring and Alarm
### Monitoring introduction
A database monitoring system helps you track database performace and corresponds to unexpected emergency issues. With Milvus, you can use the monitoring system build on [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/). Here is how the Milvus monitor works:

Milvus server collects data > Collected data is imported to Prometheus > Monitoring items are displayed in Grafana-supported dashboard


### Installing and configuring monitor

1. Install Prometheus and Grafana.

   - [Installing Prometheus Server](https://github.com/prometheus/prometheus#install)

   - [Installing Grafana](http://docs.grafana.org)

2. Make certain configurations in Prometheus.

   1) Open configuration file *prometheus.yml* under Prometheus root path, and update file *alerting*, *rule_files* and *scrape_configs* as follows:
   
      ```yaml
      # my global config
      global:
        scrape_interval:     15s # Set the scrape interval to every 1 seconds. Default is every 1 minute.
        evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
        # scrape_timeout is set to the global default (10s).

      # Alertmanager configuration
      alerting:
        alertmanagers:
        - static_configs:
          - targets: ['localhost:9093']

      # Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
      rule_files:
         - "serverdown.yml" # add alerting rules

      # A scrape configuration containing exactly one endpoint to scrape:
      # Here it's Prometheus itself.
      scrape_configs:
        # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
        - job_name: 'prometheus'

          # metrics_path defaults to '/metrics'
          # scheme defaults to 'http'.

          static_configs:
          - targets: ['localhost:9090']
  
  	   # scrape metrics of server
        - job_name: 'milvus_server'
          scrape_interval: 1s
          static_configs:
          - targets: ['localhost:8080']
    
  	      # under development
        - job_name: 'pushgateway'
          static_configs:
          - targets: ['localhost:9091']
      ```
   
   2) Create a file *serverdown.yml* under Prometheus root path, with these rules: 

      ```yaml
      groups:
      - name: milvus
        rules:
          - alert: MilvusServerDown
            expr: up{job="milvus_server"}
            for: 1s
            labels:
              serverity: page
      ```

3. Configuring Grafana

   1) Open the terminal and run this command: 
   
      ```
      $ docker run -i -p 3000:3000 grafana/grafana
      ```
   
   2) Log in to Grafana website (localhost:3000), and in *data source type*, choose *Prometheus*.
   
      ![image-20190620191640605](assets/datasource.png)
   
   3) Change URL to Prometheus server address http://localhost:9090, and in *ACCESS*, choose *Browser*. Then click *Save & Test*.
   
      ![image-20190620191702697](assets/settings.png)
   
   4) On the top left corner of the page, click *New dashboard*.
      ![image-20190620191721734](assets/dashboard.png)
   
   5）Click *Import dashboard* in the right box.
   
      ![image-20190620191747161](assets/importdashboard.png)
   
   6) Download json configuration file, and import it into the system.
   
      ![image-20190620191802408](assets/importjson.png)

   When it succeeded, the monitor dashboard will be displayed.
   
   ![image-20190620134549612](assets/prometheus.png)


### Monitoring items
On the GUI dashboard of Milvus monitoring system, you can check these monitoring items to track real time performace of your database.


|    Monitoring item       |      Description                       |
|----------------|----------------------------------|
| **System parameters**    |                                  |
| GPU utilization ratio      |    Ratio of used GPU to total GPU             |
| GPU usage      |    real-time used GPU                  |
| CPU utilization ratio       |     Ratio of used CPU to total CPU                   |
| CPU usage      |     real-time used CPU                    |
| Internet IO          |    Internet IO read/write speed (per second)          |
| Disk read & write speed     |    Disk read & write speed                   | 
| **Milvus parameters**  |                                  |
| Data inserting speed     |         Total amount of data inserted per seconds     |
| Data file total number     |       Total number of files in Milvus      |
| Data size       | Total amount of data stored in Milvus                 |
| QPM (Query per minute)    |  Number of queries completed in every minute          |
| Search response time     |      Response time of a search               |
| Vector indexing time  |    Indexing time of a single vector         |
| Connected client number          |  Number of clients currently connected to Milvus  |
| Running time        |   Normal running time of Milvus server (in minutes)    |
| Cache utilization ratio  |    Ratio of used cache to total cache                   |

### Configuring monitoring frequency
The default Milvus monitoring frequency is 1 time/second. If you want to change it, you may read [Monitoring configuration](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).


### Configuring alarm rules
The Milvus alarm system works on Alertmanager, which receives alarm messages from Prometheus once abnormalities occur. The alarm architecture looks like this: 

![Monitoring](assets/Monitoring.png)

You can set various rules for Milvus alarm. An example might be when the server is down, an email will be sent instantly to a specified user. You may proceed as follows:

   1) Create a file *milvus.yml* under Alertmanager root path.

      ```
      global:
        resolve_timeout: 1m
        smtp_smarthost: 'smtp.163.com:25' # smtp server config
        smtp_from: '×××@163.com'          # sender mail account
        smtp_auth_username: '×××@163.com' # sender mail account
        smtp_auth_password: '××××××××'    # sender mail password
        smtp_hello: '163.com'             # sender mail suffix
        smtp_require_tls: false
      route:
        group_by: ['alertname']
        receiver: default

      receivers:
        - name: 'default'
          email_configs:
          - to: '××××@××.com'             # receiver mail address
      ```
   
   2) Start Alertmanager by setting --config.file to *milvus.yml*.

      ```
      ./alertmanager --config.file=milvus.yml
      ```
> Note: To learn more about configuration of alarm rules, go to [Alarm Configration](https://prometheus.io/docs/alerting/configuration/#configuration-file).



## Application scenarios
### Typical use cases

Milvus database can be used to build intelligent systems in most AI appication scenarios:

- Image search
  Reverse image search. Detailed application such as image indexing of human face, cars & products, and face recognitiona payment, etc.

- Video processing
  Real-time human face indexing and track pursuit. 

- Natural language analysis
  Semantics-based text indexing/suggestion, and text similarity search. 

- Voiceprint recognition and audio indexing 

- Dupicate cleaner by file fingerprint


### Applicatation architecture
The application architecture of Milvus as a feature vector database is as follows:

![MilvusTypicalUsage](/Users/zilliz/Documents/MilvusTypicalUsage.png)

Irrelational data (images/videos/texts/audios) are transformed to feature vectors by feature extraction models, and saved to Milvus database. When you input a target vector, it is saved  to the current vector collection, and the search begins, until the most similar vectors are matched, and their IDs returned. 

### Scenario - Milvus human face search

#### Requirements

- Sensitive group alarm

Sensitive group library contains human face features of sensitive group. All human faces captured by the camera are to be compared to those in the library. Once a similar face is matched, an alarm is sent to the system. 

- One person one file

A human face captured by camera will be compared to those in the library to find the corresponding file containing all the information of the person.

- Face image indexing

For those face images that have no match in the library, they will be saved in the history library for several months, as reference for future case tracking. 

#### System application architecture:

![FacialSearch](/Users/zilliz/Documents/FacialSearch.png)

- **Face capture device**: When human face images are captured by the camera, they are sent to feature vector collection devices.

- **Feature extraction service**: The human face imgaes are futhered transformed and represented by 512-dimensional feature vectors by deep learing models.

- **Application**：

  - Black list alarm: If a human face within the sensitive group library is found, an alarm is sent.
  - Face recognition search: Search for personal information file based on face ID. 
  - Track pursuit replay: By searching a human face image, the history track pursuit of the person will be displayed.

- **Libraries**：

  - Sensitive group library

    - Vector library with million datasets 
    - High requirements on search precision and speed (QPS >= 1000) 
    - Batch search supported 
    
  - Human face library

    - Vector library with billions of human face feature vectors
    - High indexing speed with a QPS of 1000
    - Batch search supported

  - History library

    - Vector library with 0.2 billion new human face data
    - Keeps 90 days' face vectors (about 18 billion)
    - Batch search supported 
    
  - Information library

    - Relational database with MySQL storage
    - Mainly keeps ID-based personal information files

- **Basic architecture**: 
  - Milvus for vector storage
  - MySQL for relational data storage
  - Minio for irrelational data storage
  


## Troubleshooting
- What if connecting to server failed?
  If connection to server failed, you can check the logs in Docker logs, and confirm that connected server is started, or server address and port are correct.


