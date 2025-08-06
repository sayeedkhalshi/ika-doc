const fs = require("fs");
const path = require("path");

/**
 * Recursively traverse directory and rename .md files.
 */
function renameMarkdownFiles(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            renameMarkdownFiles(fullPath);
        } else if (stat.isFile() && path.extname(file) === ".md") {
            const newFileName = file.toLowerCase().replace(/\s+/g, "-");

            if (newFileName !== file) {
                const newFullPath = path.join(dir, newFileName);
                fs.renameSync(fullPath, newFullPath);
                console.log(`Renamed: ${file} → ${newFileName}`);
            }
        }
    });
}

// Start in the current directory
renameMarkdownFiles(process.cwd());
