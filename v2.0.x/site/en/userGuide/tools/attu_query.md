---
id: attu_query.md
related_key: attu
summary: Learn how to query data using Attu, an intuitive GUI tool for Milvus.
---

# Query Data with Attu

This topic describes how to query data with Attu.

## Query data with advanced filters

1. Click the entry of the collection that you want to query data in, and the corresponding detail page appears.
2. On the **Data Query** tab page, click the **Filter** icon and the **Advanced Filter** dialog box appears.
3. Specify a complicated query condition such as **color > 10 && color < 20** by using the **Field Name** dropdown lists, the **Logic** dropdown lists, the **Value** fields, and the **AND** operator. Then click **Apply** Filter to apply the query condition.

![Query Data](../../../../assets/attu/insight_query1.png "Specify the query condition.")

3. Click **Query** to retrieve all query results that match the query condition.

![Query Data](../../../../assets/attu/insight_query2.png "Retrieve query results.")

## Query data with Time Travel

TBD (Not supported yet)

## Delete data

1. Tick the entities you want to delete and click the **Trash** icon.
2. Type `delete` to confirm the deletion in the **Delete entities** dialog box.
3. Click **Delete** to delete the selected entities.

![Delete Data](../../../../assets/attu/insight_query3.png "Delete selected entities.")

You can perform a query to retrieve the deleted entities. No results will be returned if the deletion is successful.

![Delete Data](../../../../assets/attu/insight_query4.png "No results shown when querying deleted entities.")
