// Load topics dynamically
fetch('topics.json')
  .then(res => res.json())
  .then(topics => {
    const nav = document.getElementById('topics-list');
    nav.innerHTML = topics.map(topic =>
      `<section>
        <h2>${topic.name}</h2>
        <ul>
          ${topic.posts.map(post =>
            `<li>
              <a href="#" data-topic="${topic.slug}" data-file="${post.file}">
                ${post.title}
              </a>
            </li>`
          ).join('')}
        </ul>
      </section>`
    ).join('');

    // Add click listeners to load post
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const topic = link.getAttribute('data-topic');
        const file = link.getAttribute('data-file');
        loadPost(topic, file);
      });
    });
  });

// Markdown loader (basic)
function loadPost(topic, file) {
  fetch(`topics/${topic}/${file}`)
    .then(response => response.text())
    .then(markdown => {
      const html = markdown
        .replace(/^# (.*$)/gim, '<h2>$1</h2>')
        .replace(/^## (.*$)/gim, '<h3>$1</h3>')
        .replace(/^### (.*$)/gim, '<h4>$1</h4>')
        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
        .replace(/\*(.*)\*/gim, '<i>$1</i>')
        .replace(/\n$/gim, '<br />');
      document.getElementById('blog-post').innerHTML = html;
    });
}
