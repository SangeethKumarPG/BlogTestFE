const APIURL = "https://test.spensol.com/posts/";

document.getElementById('addPostBtn').onclick = () => {
    document.getElementById('postModal').classList.add('active');
};

document.getElementById('createPostBtn').onclick = async () => {
    const title = document.getElementById('postTitleInput').value;
    const content = document.getElementById('postContentInput').value;
    
    if (!title.trim() || !content.trim()) {
        return alert('Please fill title and content!');
    }
    
    try {
        const response = await fetch(APIURL, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });
        
        if (response.ok) {
            alert('✅ Post created successfully!');
            document.getElementById('postModal').classList.remove('active');
            document.getElementById('postTitleInput').value = '';
            document.getElementById('postContentInput').value = '';
            location.reload();  
        } else {
            alert('❌ Failed to create post!');
        }
    } catch (error) {
        console.error('POST error:', error);
        alert('❌ Network error!');
    }
};

document.getElementById('closePostModal').onclick = () => {
    document.getElementById('postModal').classList.remove('active');
    document.getElementById('postTitleInput').value = '';
    document.getElementById('postContentInput').value = '';
};

document.getElementById('postModal').onclick = (e) => {
    if (e.target.id === 'postModal') {
        document.getElementById('postModal').classList.remove('active');
    }
};