const axios = require("axios");

const token = process.env.GH_TOKEN;
const publish = async () => {
  const prodRes = await axios.post(
    "https://api.github.com/repos/milvus-io/www.milvus.io/dispatches",
    { event_type: "prod-deploy" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("---- prod deploy -----", prodRes);

  const devRes = await axios.post(
    "https://api.github.com/repos/milvus-io/www.milvus.io/dispatches",
    { event_type: "dev-deploy" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("---- dev deploy -----", devRes);
};

publish();
