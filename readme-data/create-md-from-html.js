const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); // npm install cheerio

// Directory where HTML files are located
const htmlDir = path.join(__dirname, 'htmls');

// Read all HTML files in the directory
fs.readdir(htmlDir, (err, files) => {
  if (err) {
    console.error('Error reading HTML directory:', err);
    return;
  }

  // Initialize markdown content
  let markdownContent = '';

  // Process each HTML file
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const filePath = path.join(htmlDir, file);
      const htmlContent = fs.readFileSync(filePath, 'utf-8');

      // Load HTML content into Cheerio
      const $ = cheerio.load(htmlContent);

      // Extract body content
      const bodyContent = $('body').html();

      // Add Markdown section
      markdownContent += `# ${path.parse(file).name}\n\n${bodyContent}\n\n---\n\n`;
    }
  });

  // Write markdown content to file
  const outputFilePath = path.join(__dirname, 'README.md');
  fs.writeFileSync(outputFilePath, markdownContent, 'utf-8');

  console.log('Markdown file created successfully:', outputFilePath);
});
