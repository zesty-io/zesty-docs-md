const fs = require("fs")
const path = require("path")

const genereateId = (name) => {
   return name + Math.random()
}
const readAllMarkdownFilesRecursive = (directoryPath) => {
   try {
      const files = fs.readdirSync(directoryPath)
      const markdownFiles = []

      for (const file of files) {
         const filePath = path.join(directoryPath, file)
         const fileStat = fs.statSync(filePath)

         if (fileStat.isDirectory()) {
            if (file === ".git" || file === ".gitbook" || file === ".github") {
               continue
            }

            const res = filePath.split("/").at(-1)
            console.log(res)
            const subdirectoryMarkdownFiles = readAllMarkdownFilesRecursive(filePath)
            markdownFiles.push(...subdirectoryMarkdownFiles)
         } else if (file.endsWith(".parse.md")) {
            const fileContent = fs.readFileSync(filePath, "utf-8")
            const dir = filePath.split("/").filter((e) => !e.endsWith(".md"))
            // console.log(res, 444)
            markdownFiles.push({ filePath, dir, parentName: dir.at(-1) })
         }
      }

      return markdownFiles
   } catch (error) {
      console.error(`Error reading directory: ${error}`)
      return null
   }
}

function traverseFolderStructure(folderPath) {
   const result = []

   function traverse(folderPath, parent) {
      const files = fs.readdirSync(folderPath)

      files.forEach((file) => {
         const filePath = path.join(folderPath, file)
         const stats = fs.statSync(filePath)

         if (stats.isDirectory()) {
            const current = {
               parentName: parent,
               currentName: file,
            }
            result.push(current)
            traverse(filePath, file)
         }
      })
   }

   traverse(folderPath, null)

   return result
}
module.exports = { readAllMarkdownFilesRecursive, traverseFolderStructure }
