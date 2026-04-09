
  await refreshPosts();
  
  document.addEventListener('click', async e => {
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.dataset.postId;
      if (confirm('Are you sure?  this action cannot be undone')) {
        await fetch(`https://test.spensol.com/posts/${id}`, {method: 'DELETE'});
        await refreshPosts();
      }
    }
  });
