---
id: partition_key.md
related_key: partition_key
summary: Learn how to use the partition key feature.
---

# Partition Key

A partition key is a field that you can specify when creating a collection in Milvus, a new feature that enables faster and more efficient query filtering.

This feature enables Milvus to store entities into different partitions based on their key values. This way, you can group entities with the same key together and avoid scanning irrelevant partitions when filtering by the key field. Partition keys can greatly speed up query performance compared to traditional filtering methods.

## Prepare data

To demonstrate the use of partition keys, we have prepared [a dataset from Kaggle](https://www.kaggle.com/datasets/nelgiriyewithana/mcdonalds-store-reviews) containing the reviews of McDonald's stores across the U.S., among all the fields of which, `store_address` will be designated as the partition key.

```python
import pandas as pd

df = pd.read_csv('McDonald_s_Reviews.csv', encoding="cp1252")
df.to_json('McDonald_s_Reviews.json', orient='records')
```

The raw dataset is in a CSV file, and the above code changes it to a JSON file. Then, we use **text2vec** to convert the review text to corresponding vectors and save the vectors side by side with the review text in each record.

```python
import json
from text2vec import SentenceModel

model = SentenceModel('shibing624/text2vec-base-multilingual')
with open('McDonald_s_Reviews.json', 'r') as f:
    data = json.load(f)
    
    reviews = [ x['review'] for x in data ]
    review_vectors = model.encode(reviews)

    for i in range(len(data)):
        data[i]['vector'] = review_vectors[i].tolist()

with open('McDonald_s_Reviews.json', 'w') as f:
    json.dump(data, f)
```

## Create Collection

Once the dataset is ready, we can set up a collection by connecting to Milvus and designing its schema.

```python
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType, utility

connections.connect(host='localhost', port='19530')

# reviewer_id,store_name,category,store_address,latitude ,longitude,rating_count,review_time,review,rating

fields = [
    FieldSchema(name='reviewer_id', dtype=DataType.INT64, description="", is_primary=True),
    FieldSchema(name='store_address', dtype=DataType.VARCHAR, description="", max_length=512, is_partition_key=True),
    FieldSchema(name='review', dtype=DataType.VARCHAR, description="", max_length=16384),
    FieldSchema(name='vector', dtype=DataType.FLOAT_VECTOR, description="", dim=384, is_index=True),
]

schema = CollectionSchema(fields=fields, description="", enable_dynamic_field=True)

collection = Collection(name='McDonald_s_Reviews', schema=schema )
collection.create_index(
    field_name='vector', 
    index_params={
        # Use your favorite metric type
        "metric_type": "L2", 
        # Use your favirote index type
        "index_type": "IVF_FLAT", 
        "params": {"nlist": 128}
    }, 
    name='vector_idx'
)
collection.load()

utility.list_collections()

# Output
# ['McDonald_s_Reviews']
```

If the above code snippets output the name of the collection, it is ready to accept data from the prepared dataset.

For other possible options for `metric_type` and `index_type`, please refer to [Similarity Metrics](metric.md), [In-memory Index](index.md) and [On-disk Index](disk_index.md).

## Insert Data

We now need to read the prepared JSON file into memory and insert it directly into the collection as follows:

```python
with open('McDonald_s_Reviews.json', 'r') as f:
    data = json.load(f)
    collection.insert(data)

print(collection.num_entities)

# Output
# 33396
```

Then you can check the number of inserted entities using `collection.num_entities`. In this example, the dataset contains over 33000 entities.

## Conduct an ANN Search

To conduct an ANN search using the partition key, you should include either of the following in the boolean expression of the search request:

- `expr='<partition_key>=="xxxx"'`
- `expr='<partition_key> in ["xxx", "xxx"]'`

Do replace `<partition_key>` with the name of the field that is designated as the partition key.

```python
result = collection.search(
    [data[0]['vector']], 
    anns_field='vector', 
    param={'nprobe': 16}, 
    limit=10, 
    expr=f"store_address=='{data[0]['store_address']}'", 
    output_fields=['store_address', 'review', 'rating']
)

for hits in result:
    for hit in hits:
        print(hit)

# Output
# id: 1, distance: 0.0, entity: {'store_address': '13749 US-183 Hwy, Austin, TX 78750, United States', 'review': 'Why does it look like someone spit on my food?\nI had a normal transaction,  everyone was chill and polite, but now i dont want to eat this. Im trying not to think about what this milky white/clear substance is all over my food, i d*** sure am not coming back.', 'rating': '1 star'}
# id: 252, distance: 7.134920597076416, entity: {'store_address': '13749 US-183 Hwy, Austin, TX 78750, United States', 'review': "this place has been smelling like a ports potty blew up inside. it's really nasty. food was cold and dry. this location doesn't seem to care.", 'rating': '1 star'}
# id: 92, distance: 7.347218990325928, entity: {'store_address': '13749 US-183 Hwy, Austin, TX 78750, United States', 'review': "Worst experience! All I asked for was a regular size coffee.I get to the window and was handed a small , I asked the woman if that was a regular to which she rudely said yes I questioned her again two more times then I asked her how many sizes of coffee they had she said small medium and large I asked her which one was the one I was holding and she said it's a small that's what we charged you for she said, and I told her I asked for a regular which would be a medium but I just drove off. Also asked for 3 splendas and 4 creamers on the side and received 3 regular sugars and 2 creamers. To top it off, coffee was full of coffee grounds to the point I was spitting them out. And as a little plus there was a piece of plastic! Never again!", 'rating': '1 star'}
# id: 49, distance: 7.584774971008301, entity: {'store_address': '13749 US-183 Hwy, Austin, TX 78750, United States', 'review': 'Horrible service worker with a stank attitude for no reason working at the window mute with an attitude mad because she is miserable at work . They mess up the order and then. Found a long hair in my daughters happy meal fries and then the extra fry was missing from her meal and t', 'rating': '1 star'}
# id: 190, distance: 7.619668960571289, entity: {'store_address': '13749 US-183 Hwy, Austin, TX 78750, United States', 'review': "THESE PEOPLE.. SO I ORDERED A HAPPY MEAL. MEANS YOU GET THE BOX  NOT A BAG. THEY ALWAYS GIVE ME THE BAGS. SO ONE DAY I SAW 4 ROWS OF BOXES. ASKED THEM FOR THE BOX AND THE PEOPLE MAGICALLY COULDN'T TALK. I CALLED CORPORATE. THE MANGER WRITES ME AN EMAIL SAYING THEY RAN OUT.\nREALLY?? RALLY??? IF I COULD GIVE THIS PLACE NEGATIVE ZERO STARS I WOULD.", 'rating': '1 star'}
# id: 434, distance: 7.650599479675293, entity: {'store_address': '13749 US-183 Hwy, Austin, TX 78750, United States', 'review': 'Fresh food. Surprisingly. ï¿½ï¿½ï¿', 'rating': '4 stars'}
# id: 125, distance: 7.705323696136475, entity: {'store_address': '13749 US-183 Hwy, Austin, TX 78750, United States', 'review': 'Asked me to wait at spot one. Asked for jelly and was completely ignored. Had to go inside to get it myself. Trash customer service. I blame management for not holding anyone accountable.', 'rating': '1 star'}
# id: 97, distance: 7.997112274169922, entity: {'store_address': '13749 US-183 Hwy, Austin, TX 78750, United States', 'review': 'When ordering food the employees conveniently forgot to turn off their microphones and were talking mess about all the food we had ordered, this is very unprofessional and honestly uncalled for. When I asked for a receipt they said it was in the bad and it was convenient not in there hold of management to speak ab', 'rating': '1 star'}
# id: 22, distance: 8.07274341583252, entity: {'store_address': '13749 US-183 Hwy, Austin, TX 78750, United States', 'review': "Meh.. just meh. When I finally get the correct order, it is generally tasty. I'm a picky eater, and have found ways to navigate the menu to get items I like. Worked in the service industry for years as a server, bartender, and trainer. Taking and fulfilling orders is NOT hard, tedious at times though. I only go here when I see they are not busy, in hope that my order is correct when I go to leave. In the 10 times that I have been here in the past past year, I have only had 1 order that was perfectly correct. Just ONE, not an exaggeration. That one order was just 2 large fries and nothing else. Though I will mention that when I got home and pulled them out of the bag, they were hardly what you'd call filled, (nor did I enjoy any on the 3 minute drive home) so little so that I even sent a picture and post to McDonald's on Facebook, at least the few were hot. The evening staff is very pleasant, but the morning staff leaves a lot to be desired, as well as thinking that they can talk negatively about people in Spanish out in the open which, being a light skinned Puerto Rican, I understand perfectly. I have submitted several complaints and NEVER received a call or email back. I just don't go here anymore to avoid the stress of paying money for something that is most likely wrong.", 'rating': '1 star'}
# id: 174, distance: 8.10897445678711, entity: {'store_address': '13749 US-183 Hwy, Austin, TX 78750, United States', 'review': 'Why is it everytime going to a McDonalds  they get ur order wrong?\nNot once\nBut all the Fxxxing time excuse my french\nThen on top they dont like u cause u ask for special request\nWhat is the point of wanting something to eat if u cannt have like u want it\nI guess we all forgatten who really we are working for\nThe customer', 'rating': '1 star'}
```

## Partition-key-based Multi-tenancy

You can use the partition key feature to achieve multi-tenancy with better search performance. 

To do this, you can assign a tenant-specific value as the partition key field for each entity. Then, when you search or query the collection, you can include the partition key field in the boolean expression to filter entities by the tenant-specific value. This way, you can isolate data by tenants and avoid scanning unnecessary partitions.

To learn more about multi-tenancy strategies, read [Multi-tenancy](multi_tenancy.md) for details.
