const fs = require("fs")
const path = require("path")
const axios = require("axios")
require("dotenv").config()

const DIRECTORY_PATH = "."
const contentModelZUID = process.env.contentModelZUID
const TOKEN = process.env.TOKEN
const instanceZUID = process.env.instanceZUID
const initailParentZUID = process.env.parentZUID

const URL = `https://${instanceZUID}.api.stage.zesty.io/v1/content/models/${contentModelZUID}/items`

// PROD REFERENCE
// cosnt url = https://8-aaeffee09b-7w6v22.api.zesty.io/v1/content/models/6-e092db91a5-rgfcx2/items
// const sampleprod = {
//    data: {
//       title: "test2",
//       description: "test2",
//       body: "test2",
//    },
//    web: {
//       canonicalTagMode: 1,
//       parentZUID: "7-be90ddf1e2-4btss7",
//       metaLinkText: "test2",
//       metaTitle: "test2",
//       pathPart: "test2",
//       metaDescription: "test2",
//    },
//    meta: {
//       langID: 1,
//       contentModelZUID: "6-e092db91a5-rgfcx2",
//    },
// }

const headers = {
   "Content-Type": "application/json",
   Authorization: `Bearer ${TOKEN}`,
}
function extractDescription(input) {
   const regex = /description:\s*>-\s*([\s\S]*?)\s*---/
   const match = input.match(regex)

   if (match && match.length >= 2) {
      return match[1].trim()
   }

   return ""
}
// create content

const postData = async ({ title, body, description, parentZUID = "" }) => {
   if (!parentZUID) {
      parentZUID = initailParentZUID
   }
   const payload = {
      data: {
         title,
         description,
         body,
      },
      web: {
         canonicalTagMode: 1,
         parentZUID,
         metaLinkText: title,
         metaTitle: title,
         pathPart: title,
      },
      meta: {
         langID: 1,
         contentModelZUID,
      },
   }

   await axios
      .post(URL, payload, {
         headers: headers,
      })
      .then((response) => {
         console.log(response.data)
      })
      .catch((error) => {
         console.log(error.response.data)
      })
}
const generateJSONObject = (markdown) => {
   const titleRegex = /# (.+)/
   const titleMatch = markdown.match(titleRegex)

   const title = titleMatch && titleMatch[1] ? titleMatch[1] : ""
   const description = extractDescription(markdown)
   // const body = markdown

   return { title, description, body: "" }
}

const mdFolders = []
const readAllMarkdownFilesRecursive = (directoryPath) => {
   try {
      const files = fs.readdirSync(directoryPath)
      const markdownFiles = []

      for (const file of files) {
         const filePath = path.join(directoryPath, file)
         const fileStat = fs.statSync(filePath)

         if (fileStat.isDirectory()) {
            if (
               file === ".git" ||
               file === ".gitbook" ||
               file === ".github" ||
               file === "Gitbook Data" ||
               file === "Postman Collections" ||
               file === "node_modules" ||
               file === "script" ||
               file === "utils"
            ) {
               continue
            }
            // console.log(filePath)

            const res = filePath?.split("/").at(-1)
            mdFolders.push(res)
            const subdirectoryMarkdownFiles = readAllMarkdownFilesRecursive(filePath)
            markdownFiles.push(...subdirectoryMarkdownFiles)
         } else if (file.endsWith(".parse.md")) {
            const fileContent = fs.readFileSync(filePath, "utf-8")
            const data = generateJSONObject(fileContent)
            const dir = filePath.split("/").filter((e) => !e.endsWith(".md"))
            markdownFiles.push({ filePath, dir, parentName: dir.at(-1), data })
         }
      }

      return markdownFiles
   } catch (error) {
      console.error(`Error reading directory: ${error}`)
      return null
   }
}

const getAllModels = async () => {
   return await axios
      .get(`https://${instanceZUID}.api.stage.zesty.io/v1/content/models`, {
         headers: headers,
      })
      .then((response) => {
         return response.data.data
      })
      .catch((error) => {
         console.log(error)
      })
}
const main = async () => {
   const mdFilesArr = readAllMarkdownFilesRecursive(DIRECTORY_PATH)
   const res = mdFolders.map((e) => {
      return postData({ title: e, body: e, description: e })
   })
   await Promise.all(res)
   const allModels = await getAllModels()

   // console.log(allModels, 44)
   const updatedArr2 = mdFilesArr.map((item) => {
      const matchingObj = allModels.find((obj) => {
         return obj.name === item.parentName
      })

      if (matchingObj) {
         return { ...item, parentZUID: matchingObj.ZUID }
      }
      return item
   })

   // console.log(updatedArr2)

   const res2 = updatedArr2.map((e) => {
      return postData({
         title: e.data.title,
         body: e.data.body,
         description: e.data.description,
         parentZUID: e.data.parentZUID,
      })
   })
   // console.log(updatedArr2, allModels, 44)
}

main()
