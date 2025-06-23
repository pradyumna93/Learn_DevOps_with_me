// Fetch and render the Markdown blog post
fetch('posts/first-devops-steps.md')
  .then(response => response.text())
  .then(markdown => {
    // Simple Markdown to HTML (basic for demo)
    const html = markdown
      .replace(/^# (.*$)/gim, '<h2>$1</h2>')
      .replace(/^## (.*$)/gim, '<h3>$1</h3>')
      .replace(/^### (.*$)/gim, '<h4>$1</h4>')
      .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')
      .replace(/\n$/gim, '<br />');
    document.getElementById('blog-post').innerHTML = html;
  });
