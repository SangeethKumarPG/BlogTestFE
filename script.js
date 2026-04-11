const APIURL = "https://test.spensol.com/posts/";

const modal = document.getElementById('postModal');
const titleInput = document.getElementById('postTitleInput');
const contentInput = document.getElementById('postContentInput');

document.getElementById('addPostBtn').onclick = () => {
    modal.classList.add('active');
};

document.getElementById('createPostBtn').onclick = async () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert('Please fill title and content!');
        return;
    }

    try {
        const response = await fetch(APIURL, { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            alert('Post created successfully!');
            modal.classList.remove('active');
            titleInput.value = '';
            contentInput.value = '';

            setTimeout(() => {
                location.reload();
            }, 300);

        } else {
            const errorText = await response.text();
            alert(`Failed to create post! (${response.status})`);
            console.log("Server error:", errorText);
        }

    } catch (error) {
        console.error('POST error:', error);
        alert('Network error!');
    }
};

document.getElementById('closePostModal').onclick = () => {
    modal.classList.remove('active');
    titleInput.value = '';
    contentInput.value = '';
};

modal.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
};

document.getElementById('deleteBtn').addEventListener('click', async () => {
    const id = prompt('Enter ID to delete:');

    if (!id) return;

    await fetch(`https://test.spensol.com/posts/${id}`, {
        method: 'DELETE'
    });

    alert(`Deleted ID: ${id}`);
});

const editId = document.getElementById('editId');
const editTitle = document.getElementById('editTitle');
const editContent = document.getElementById('editContent');
const editModal = document.getElementById('editModal');

function openEditModal(id = '', title = '', content = '') {
    editId.value = id || '';
    editTitle.value = title || '';
    editContent.value = content || '';
    editModal.classList.add('active');
}

document.getElementById('updateBtn').onclick = async () => {
    const id = editId.value.trim();
    const title = editTitle.value.trim();
    const content = editContent.value.trim();

    if (!id || !title || !content) {
        return alert('Please fill all fields!');
    }

    try {
        const res = await fetch(`${APIURL}${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });

        if (res.ok) {
            alert('Post updated!');
            editModal.classList.remove('active');

            editId.value = '';
            editTitle.value = '';
            editContent.value = '';
        } else {
            alert('Update failed!');
        }

    } catch (err) {
        console.error(err);
        alert('Network error!');
    }
};

document.getElementById('cancelEdit').onclick = () => {
    editModal.classList.remove('active');
};

editModal.onclick = (e) => {
    if (e.target === editModal) {
        editModal.classList.remove('active');
    }
};

/*function to get api*/


document.getElementById("getBlogsBtn").addEventListener("click", getBlogs);

async function getBlogs() {
  try {
    const response = await fetch(APIURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blogs = await response.json();

    const container = document.getElementById("blogContainer");

    // ✅ ONLY clear blog area (NOT whole page)
    container.innerHTML = "";

    blogs.forEach(blog => {
      const blogDiv = document.createElement("div");
      blogDiv.classList.add("blog-post");

      blogDiv.innerHTML = `
        <p><strong>ID:${blog.id} </strong>
        ${blog.title}</p>
        <p>${blog.content}</p>
      `;

      container.appendChild(blogDiv);
    });

  } catch (error) {
    console.error("Error loading blogs:", error);

    document.getElementById("blogContainer").innerHTML =
      "<p>Failed to load blogs.</p>";
  }
}

// Load blogs when page loads
// window.addEventListener("DOMContentLoaded", getBlogs);