document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', async e => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.postId;
            if (confirm('Are you sure?')) {
                await fetch(`https://test.spensol.com/posts/${id}`, {method: 'DELETE'});
               
            }
        }
    });
});