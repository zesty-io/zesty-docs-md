const fs = require("fs")
const path = require("path")

const generateJSONObject = (markdown) => {
   const titleRegex = /# (.+)/
   const titleMatch = markdown.match(titleRegex)

   const descriptionRegex = /description: >-\n\s+([\s\S]+)/
   const descriptionMatch = markdown.match(descriptionRegex)

   const title = titleMatch && titleMatch[1] ? titleMatch[1] : ""
   const description = descriptionMatch && descriptionMatch[1] ? descriptionMatch[1] : ""

   return { title, description }
}
const readParseMdFiles = (directoryPath) => {
   return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (err, files) => {
         if (err) {
            reject(err)
            return
         }

         const parseMdFiles = files.filter((file) => file.endsWith(".parse.md"))
         const fileContents = []

         parseMdFiles.forEach((file) => {
            const filePath = path.join(directoryPath, file)
            const content = fs.readFileSync(filePath, "utf-8")
            const { title, description } = generateJSONObject(content)
            fileContents.push({
               fileName: file,
               title,
               body: content,
               description,
            })
         })

         resolve(fileContents)
      })
   })
}

// Example usage
const directoryPath = "./accounts/guides"

const main = async () => {
   const mdFileArr = await readParseMdFiles(directoryPath)
      .then((fileContents) => {
         return fileContents
      })
      .catch((err) => {
         console.error(err)
      })

   console.log(mdFileArr)
}

main()
