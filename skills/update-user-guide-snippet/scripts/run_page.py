#!/usr/bin/env python3
"""Run the python snippets of a user-guide page against a live Milvus server.

Auto-detects which known collections the page references and seeds them
idempotently, then executes each ```python block in order against a shared
client and reports pass/fail per block.

Usage:
  python3 run_page.py <page.md>                    # auto-seed referenced collections
  python3 run_page.py <page.md> <seed.py> [..]     # also exec extra seed snippets

Exit code is non-zero if any non-empty block fails.
"""
import re
import sys
import traceback

URI = "http://localhost:19530"
TOKEN = "root:Milvus"

KEEP = {"quick_setup"}  # always seeded and left behind (shared fixture)


def _seed_quick_setup(client, DataType):
    if not client.has_collection("quick_setup"):
        s = client.create_schema(auto_id=False, enable_dynamic_field=True)
        s.add_field("id", datatype=DataType.INT64, is_primary=True)
        s.add_field("vector", datatype=DataType.FLOAT_VECTOR, dim=5)
        s.add_field("color", datatype=DataType.VARCHAR, max_length=512)
        ix = client.prepare_index_params()
        ix.add_index("vector", index_type="AUTOINDEX", metric_type="IP")
        client.create_collection("quick_setup", schema=s, index_params=ix)
        colors = ["pink_8682", "red_7025", "orange_6781", "pink_9298", "red_4794",
                  "yellow_4222", "red_9392", "grey_8510", "white_9381", "purple_4976"]
        data = [{"id": i, "vector": [0.3580376395471989, -0.6023495712049978,
                                     0.18414012509913835, -0.26286205330961354,
                                     0.9029438446296592], "color": colors[i]}
                for i in range(10)]
        for j, cid in enumerate([551, 296, 43]):
            data.append({"id": cid, "vector": [0.1 + j * 0.1, 0.2, 0.3, 0.4, 0.5],
                         "color": colors[j]})
        client.insert("quick_setup", data)
        client.flush("quick_setup")
    if not client.has_partition(collection_name="quick_setup", partition_name="partitionA"):
        client.create_partition(collection_name="quick_setup", partition_name="partitionA")
    client.load_collection("quick_setup")


def _seed_my_collection(client, DataType):
    # canonical my_collection used by most search/query pages
    if not client.has_collection("my_collection"):
        s = client.create_schema(auto_id=False, enable_dynamic_field=True)
        s.add_field("id", datatype=DataType.INT64, is_primary=True)
        s.add_field("vector", datatype=DataType.FLOAT_VECTOR, dim=5)
        s.add_field("color", datatype=DataType.VARCHAR, max_length=512)
        s.add_field("likes", datatype=DataType.INT64)
        s.add_field("price", datatype=DataType.DOUBLE)
        s.add_field("rating", datatype=DataType.INT64)
        s.add_field("category", datatype=DataType.VARCHAR, max_length=64)
        s.add_field("docId", datatype=DataType.INT64)
        s.add_field("chunk", datatype=DataType.VARCHAR, max_length=512)
        ix = client.prepare_index_params()
        ix.add_index("vector", index_type="AUTOINDEX", metric_type="COSINE")
        client.create_collection("my_collection", schema=s, index_params=ix)
        import random
        colors = ["red_7025", "pink_8682", "orange_6781", "purple_4976", "yellow_4222",
                  "grey_8510", "white_9381"]
        rows = []
        for i in range(30):
            rows.append({
                "id": i, "vector": [random.random() for _ in range(5)],
                "color": random.choice(colors), "likes": i * 10, "price": i + 0.5,
                "rating": i % 5, "category": "cat" + str(i % 4), "docId": i,
                "chunk": "text chunk " + str(i),
            })
        client.insert("my_collection", rows)
        client.flush("my_collection")
    client.load_collection("my_collection")


def _seed_product_catalog(client, DataType):
    if not client.has_collection("product_catalog"):
        s = client.create_schema(auto_id=False, enable_dynamic_field=True)
        s.add_field("id", datatype=DataType.INT64, is_primary=True)
        s.add_field("embedding", datatype=DataType.FLOAT_VECTOR, dim=5)
        s.add_field("price", datatype=DataType.DOUBLE)
        s.add_field("rating", datatype=DataType.DOUBLE)
        s.add_field("category", datatype=DataType.VARCHAR, max_length=64)
        ix = client.prepare_index_params()
        ix.add_index("embedding", index_type="AUTOINDEX", metric_type="L2")
        client.create_collection("product_catalog", schema=s, index_params=ix)
        client.insert("product_catalog", [
            {"id": i, "embedding": [0.1, 0.2, 0.3, 0.4, 0.5], "price": 10.0 + i,
             "rating": 4.0 + (i % 10) / 10, "category": "cate" + str(i % 5)}
            for i in range(1, 21)])
        client.flush("product_catalog")
    client.load_collection("product_catalog")


def _seed_iterator_collection(client, DataType):
    if not client.has_collection("iterator_collection"):
        s = client.create_schema(auto_id=False, enable_dynamic_field=True)
        s.add_field("id", datatype=DataType.INT64, is_primary=True)
        s.add_field("vector", datatype=DataType.FLOAT_VECTOR, dim=5)
        s.add_field("color", datatype=DataType.VARCHAR, max_length=512)
        ix = client.prepare_index_params()
        ix.add_index("vector", index_type="FLAT", metric_type="L2")
        client.create_collection("iterator_collection", schema=s, index_params=ix)
        client.insert("iterator_collection", [
            {"id": i, "vector": [0.1 * (i % 5), 0.2, 0.3, 0.4, 0.5],
             "color": "color_" + str(i % 7)} for i in range(100)])
        client.flush("iterator_collection")
    client.load_collection("iterator_collection")


def _seed_customer_profiles(client, DataType):
    if not client.has_collection("customer_profiles"):
        s = client.create_schema(auto_id=False, enable_dynamic_field=True)
        s.add_field("id", datatype=DataType.INT64, is_primary=True)
        s.add_field("vector", datatype=DataType.FLOAT_VECTOR, dim=5)
        s.add_field("customer_tier", datatype=DataType.VARCHAR, max_length=64)
        s.add_field("region", datatype=DataType.VARCHAR, max_length=64)
        s.add_field("purchase_amount", datatype=DataType.DOUBLE)
        s.add_field("satisfaction_score", datatype=DataType.INT64)
        s.add_field("last_purchase_date", datatype=DataType.VARCHAR, max_length=64)
        ix = client.prepare_index_params()
        ix.add_index("vector", index_type="AUTOINDEX", metric_type="L2")
        client.create_collection("customer_profiles", schema=s, index_params=ix)
        rows = [{
            "id": i, "vector": [0.1, 0.2, 0.3, 0.4, 0.5],
            "customer_tier": "premium" if i % 5 == 0 else "standard",
            "region": "North America" if i % 2 == 0 else "Europe",
            "purchase_amount": 10.0 + i, "satisfaction_score": i % 5,
            "last_purchase_date": "2024-01-01",
        } for i in range(1, 1001)]
        client.insert("customer_profiles", rows)
        client.flush("customer_profiles")
    client.load_collection("customer_profiles")


def _seed_aliases(client, DataType):
    created = set()
    for name in ("my_collection_1", "my_collection_2"):
        if not client.has_collection(name):
            s = client.create_schema(auto_id=False, enable_dynamic_field=True)
            s.add_field("id", datatype=DataType.INT64, is_primary=True)
            s.add_field("vector", datatype=DataType.FLOAT_VECTOR, dim=5)
            s.add_field("color", datatype=DataType.VARCHAR, max_length=512)
            ix = client.prepare_index_params()
            ix.add_index("vector", index_type="AUTOINDEX", metric_type="COSINE")
            client.create_collection(name, schema=s, index_params=ix)
            client.insert(name, [{"id": i, "vector": [0.1, 0.2, 0.3, 0.4, 0.5],
                                  "color": "c" + str(i)} for i in range(5)])
            client.flush(name)
            created.add(name)
        client.load_collection(name)
    return created


SEEDS = {
    "quick_setup": _seed_quick_setup,
    "my_collection": _seed_my_collection,
    "product_catalog": _seed_product_catalog,
    "iterator_collection": _seed_iterator_collection,
    "customer_profiles": _seed_customer_profiles,
    "my_collection_1": _seed_aliases,
    "my_collection_2": _seed_aliases,
}

# "my_collection" pages with a divergent schema (e.g. my_id/my_vector) create
# the collection themselves — drop the seed first so their create_collection
# succeeds, then skip auto-seeding.
DROP_FIRST = {"my_collection"}


def main():
    page = sys.argv[1]
    md = open(page).read()
    blocks = re.findall(r"```python\n(.*?)```", md, re.S)

    prelude = 'from pymilvus import MilvusClient, DataType\n'
    prelude += f'client = MilvusClient(uri="{URI}", token="{TOKEN}")\n'

    env = {"__name__": "__main__"}
    exec(prelude, env)
    client = env["client"]
    DataType = env["DataType"]

    # DROP_FIRST applies only when the page itself creates `my_collection` with
    # a divergent schema (its snippets call create_collection("my_collection",
    # ...)). Creating a different collection (e.g. `users`) must not trigger it,
    # and search/query-only pages keep the canonical seed.
    page_creates = bool(re.search(r'create_collection\s*\(\s*["\']?my_collection', md))

    # collect referenced collections from the page text
    names = [n for n in SEEDS if re.search(rf"\b{n}\b", md)]
    created = set()
    for n in names:
        existed = client.has_collection(n)
        if n in DROP_FIRST and page_creates:
            # the page creates its own divergent-schema collection: drop any
            # seeded copy and do NOT re-seed here.
            if existed:
                client.drop_collection(n)
            continue
        if not existed and n in SEEDS:
            made = SEEDS[n](client, DataType) or {n}
            created.update(made)

    # extra ad-hoc seed files still supported
    for seedfile in sys.argv[2:]:
        exec(open(seedfile).read(), env)

    ok, fail = [], []
    for i, b in enumerate(blocks):
        if not b.strip():
            ok.append((i, "empty"))
            continue
        try:
            exec(b, env)
            ok.append((i, "OK"))
        except SystemExit:
            # an early exit mid-block truncates the run — treat as a failure
            fail.append((i, "SystemExit"))
            print(f"--- block {i} FAILED (SystemExit) ---")
            print(b[:1200])
        except Exception as e:
            fail.append((i, f"{type(e).__name__}: {e}"))
            print(f"--- block {i} FAILED ---")
            print(b[:1200])
            print(traceback.format_exc()[-1200:])

    # cleanup: drop collections seeded this run (except the shared fixture)
    for n in created:
        if n not in KEEP:
            try:
                if client.has_collection(n):
                    client.drop_collection(n)
            except Exception:
                pass

    print(f"\n=== {page} ===")
    print(f"seeded: {sorted(names)} | blocks: {len(blocks)}, OK: {len(ok)}, FAIL: {len(fail)}")
    for i, msg in fail:
        print(f"  FAIL block {i}: {msg}")

    try:
        client.close()
    except Exception:
        pass
    sys.exit(1 if fail else 0)


if __name__ == "__main__":
    main()
