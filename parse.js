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

const parser = (filePath, fileName) => {
   try {
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const modifiedContent = fileContent
         // this is for links
         .replaceAll(
            /\{% content-ref url="([^"]+)" %\}\s*\[([^\]]+)\]\([^)]+\)\s*\{% endcontent-ref %\}/g,
            "[$2]($1)",
         )
         // this is for blockquotes
         .replaceAll(/\{% hint style="([\w\s]+)" %\}\s*(.*?)\s*\{% endhint %\}/gs, "> $2")

      const newFilePath = `${filePath}.parse.md`
      fs.writeFileSync(newFilePath, modifiedContent, "utf-8")
      //   fs.writeFileSync(filePath, modifiedContent, "utf-8")
      console.log(`Modified file saved: ${filePath}`)
   } catch (error) {
      console.error(`Error converting and saving file: ${error}`)
   }
}

// Main
const main = () => {
   const directoryPath = "."
   const markdownFiles = readAllMarkdownFilesRecursive(directoryPath)
   if (markdownFiles) {
      markdownFiles.forEach((file) => {
         const fileName = path.basename(file.filePath)
         console.log(`File Path: ${fileName}`)
         console.log("-----------------------")
         parser(file.filePath, fileName)
      })
   }
}

main()
