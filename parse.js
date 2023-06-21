const fs = require("fs")
const path = require("path")

const readAllMarkdownFilesRecursive = (directoryPath) => {
   try {
      const files = fs.readdirSync(directoryPath)
      const markdownFiles = []

      for (const file of files) {
         const filePath = path.join(directoryPath, file)
         const fileStat = fs.statSync(filePath)

         if (fileStat.isDirectory()) {
            const subdirectoryMarkdownFiles = readAllMarkdownFilesRecursive(filePath)
            markdownFiles.push(...subdirectoryMarkdownFiles)
         } else if (path.extname(file) === ".md") {
            const fileContent = fs.readFileSync(filePath, "utf-8")
            markdownFiles.push({ filePath, content: fileContent })
         }
      }

      return markdownFiles
   } catch (error) {
      console.error(`Error reading directory: ${error}`)
      return null
   }
}

// Example usage
const directoryPath = "."
const markdownFiles = readAllMarkdownFilesRecursive(directoryPath)
if (markdownFiles) {
   markdownFiles.forEach((file) => {
      console.log(`File Path: ${file.filePath}`)
      //   console.log(`Content: ${file.content}`)
      console.log("-----------------------")
   })
}
