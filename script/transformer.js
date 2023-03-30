const fs = require("fs");
const axios = require("axios");
const algoliasearch = require("algoliasearch");

const getMainCollection = async () => {
  const POSTMAN_JSON_DATA = [
    "https://raw.githubusercontent.com/zesty-io/zesty-org/master/Postman%20Collections/instances-api.json",
    "https://raw.githubusercontent.com/zesty-io/zesty-org/master/Postman%20Collections/auth-api.json",
    "https://raw.githubusercontent.com/zesty-io/zesty-org/master/Postman%20Collections/accounts-api.json",
  ];
  const mainCollection = [];
  const getPostmanData = async () => {
    for (const url of POSTMAN_JSON_DATA) {
      await axios.get(url).then((e) => {
        mainCollection.push(e.data);
      });
    }
  };

  await getPostmanData();
  return mainCollection;
};

const main = async () => {
  const data = await getMainCollection();
  const jsonData = JSON.stringify(data);
  // Write the JSON data to a file
  fs.writeFile(
    "Postman Collections/docs.data.json",
    jsonData,
    "utf8",
    (err) => {
      if (err) {
        console.error(err, 123);
      } else {
        console.log("Data written to file");
      }
    }
  );

  await addToAlgolia();
};

main();

const APPID = process.env.ALGOLIA_APPID;
const APIKEY = process.env.ALGOLIA_APIKEY;
const INDEX = process.env.ALGOLIA_ZESTY_ORG_INDEX;
const GITBOOK_API_KEY = process.env.GITBOOK_API_KEY;

const addToAlgolia = async (req) => {
  const client = algoliasearch(APPID, APIKEY);
  const index = client.initIndex(INDEX);

  const gitBookPages = await getGitBookPages();

  const objects = await flattenPages(gitBookPages.data.pages);

  // generate algolia
  await index
    .replaceAllObjects(objects, {
      autoGenerateObjectIDIfNotExist: true,
    })
    .then(({ objectIDs }) => {
      console.log(objectIDs);
    })
    .catch((err) => {
      console.log(err);
    });

  const gitbookTreeData = generateNavigationTree(objects);

  fs.writeFile(
    "Gitbook Data/gitbook.data.json",
    JSON.stringify(gitbookTreeData),
    "utf8",
    (err) => {
      if (err) {
        console.error(err, 123);
      } else {
        console.log("Data written to file");
      }
    }
  );
};

/**
 * It makes a request to the GitBook API, and returns the response
 * @returns An array of objects
 */
const getGitBookPages = async () => {
  const resp = await axios
    .get("https://api.gitbook.com/v1/spaces/JxtEGD7RBfgH2ooihKIa/content", {
      headers: {
        Authorization: `Bearer ${GITBOOK_API_KEY}`,
      },
    })
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });

  return resp;
};

/**
 * It takes a list of pages, and returns a list of pages with the category and service fields added
 * @param pages - The pages object from the API response.
 * @returns An array of objects.
 */

const flattenPages = async (pages) => {
  let flattened = [];
  for (const page of pages) {
    const categoryMatcher = /^\/[^\/]+\/([^\/]+)\//;
    const serviceMatcher = /^\/([^\/]+)\/[^\/]+\//;

    const category = categoryMatcher.exec(`/${page.path}/`);
    const service = serviceMatcher.exec(`/${page.path}/`);

    const content = await getPageContent(page.path);

    flattened.push({
      objectId: page.id,
      name: page.title,
      url: `/${page.path}`,
      description: page.description,
      category: category ? category[1] : `${page.path}`,
      service: service ? service[1] : ``,
      content,
    });

    if (page.pages && page.pages.length > 0) {
      const subPages = await flattenPages(page.pages);
      flattened.push(...subPages);
    }
  }
  return flattened;
};

/**
@description this will generate the navigation tree structure that can be used to render the docs navigation
 */
const generateNavigationTree = (flattenedPages) => {
  return flattenedPages.reduce((acc, item) => {
    const { url, name, objectId, content, category, service } = item;
    const urlArr = url.split("/").filter((item) => item !== "");
    const urlArrLength = urlArr.length;
    let tempAcc = acc;
    urlArr.forEach((item, index) => {
      if (index === urlArrLength - 1) {
        tempAcc.push({
          name,
          url,
          objectId,
          item: [],
          content,
          category,
          service,
        });
      } else {
        const foundItem = tempAcc.find((item) => item.name === urlArr[index]);
        if (foundItem) {
          tempAcc = foundItem.item;
        } else {
          tempAcc.push({
            name: urlArr[index],
            url: `/${urlArr.slice(0, index + 1).join("/")}`,
            item: [],
            content,
            category,
            service,
          });
          tempAcc = tempAcc[tempAcc.length - 1].item;
        }
      }
    });
    return acc;
  }, []);
};

/**
 * It fetches the content of a markdown file from the Zesty.io docs repository, and if it can't find
 * the file, it fetches the content of the parent directory's README.md file
 * @param path - the path to the file you want to fetch
 * @returns a promise.
 */

const getPageContent = (path) => {
  console.log("=============================================");

  // Fetch Content
  return axios
    .get(
      `https://raw.githubusercontent.com/zesty-io/zesty-docs/main/${path}.md`
    )
    .then((resp) => {
      console.log("resp", resp.status);
      consoleLogs(resp, path);

      // If the file doesn't exist, fetch the parent directory's README.md file
      if (resp.status === 200) {
        return resp.data;
      }
    })
    .catch(async (err) => {
      consoleLogs(err, path);
      return await getParentContent(path);
    });
};

const getParentContent = async (path) => {
  return axios
    .get(
      `https://raw.githubusercontent.com/zesty-io/zesty-docs/main/${path}/README.md`
    )
    .then((resp) => {
      consoleLogs(resp, `${path}/README`);
      return resp.data;
    })
    .catch((err) => {
      consoleLogs(err, `${path}/README`);
    });
};

/**
 * It logs the status of the response to the console
 * @param resp - The response from the request
 * @param path - The path to the file you want to get from the repo.
 * @returns A function that takes in two parameters, resp and path.
 */
const consoleLogs = (resp, path) => {
  if (resp.status === 200) {
    console.log(
      "\x1b[32m%s\x1b[0m",
      `✅  Success - https://raw.githubusercontent.com/zesty-io/zesty-docs/main/${path}.md`
    );
  } else {
    if (path.includes("README")) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        `🚫  Failed - https://raw.githubusercontent.com/zesty-io/zesty-docs/main/${path}.md`
      );
      console.log(
        "\x1b[31m%s\x1b[0m",
        `❗️ Please check the endpoint and make sure it's returning a raw markdown content from github`
      );

      return;
    }

    console.log(
      "\x1b[31m%s\x1b[0m",
      `🚫  Failed - https://raw.githubusercontent.com/zesty-io/zesty-docs/main/${path}.md`
    );

    console.log(
      "\x1b[36m%s\x1b[0m",
      `🔄  Retrying Using - https://raw.githubusercontent.com/zesty-io/zesty-docs/main/${path}/README.md`
    );
  }
};
