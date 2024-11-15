import fs from 'fs/promises';
import path from 'path';
import xml2js from 'xml2js';
import TurndownService from 'turndown';

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

async function convertWordPress(xmlPath) {
  try {
    // Read the WordPress XML file
    const xmlData = await fs.readFile(xmlPath, 'utf-8');
    
    // Parse XML to JSON
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);
    
    // Get all posts
    const posts = result.rss.channel[0].item;
    
    // Create blog directory if it doesn't exist
    await fs.mkdir('src/content/blog', { recursive: true });
    
    // Convert each post
    for (const post of posts) {
      // Only process published posts
      if (post.status?.[0] !== 'publish') continue;
      
      const title = post.title[0];
      const content = post['content:encoded'][0];
      const pubDate = new Date(post.pubDate[0]);
      
      // Convert HTML content to Markdown
      const markdown = turndown.turndown(content);
      
      // Create slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      // Create frontmatter
      const frontmatter = `---
title: '${title.replace(/'/g, "''")}'
description: '${title.replace(/'/g, "''")}'
pubDate: '${pubDate.toISOString().split('T')[0]}'
---

`;

      // Combine frontmatter and content
      const fileContent = frontmatter + markdown;
      
      // Save to file
      await fs.writeFile(
        `src/content/blog/${slug}.md`,
        fileContent,
        'utf-8'
      );
      
      console.log(`Converted: ${title}`);
    }
    
    console.log('Conversion complete!');
  } catch (error) {
    console.error('Error converting WordPress content:', error);
  }
}

// You'll need to provide the path to your WordPress XML file
console.log('Please place your WordPress XML file in the root directory as "wordpress-export.xml"');
console.log('Then run this script again.');

if (fs.access('./wordpress-export.xml').then(() => true).catch(() => false)) {
  await convertWordPress('./wordpress-export.xml');
}