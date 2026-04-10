const APIURL = "https://test.spensol.com/posts/";


document.getElementById('openModalBtn').onclick = function () {
    document.getElementById('editModal').classList.add('active');
};



document.getElementById('updateBtn').onclick = async function () {

    const id = document.getElementById('editId').value.trim();
    const title = document.getElementById('editTitle').value.trim();
    const content = document.getElementById('editContent').value.trim();

    if (!id || !title || !content) {
        alert('Please fill all fields!');
        return;
    }

    try {
        console.log("Updating Post ID:", id);

        const response = await fetch(`${APIURL}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        });

        if (response.ok) {
            alert('✏️ Post updated successfully!');

            
            document.getElementById('editModal').classList.remove('active');

        
            document.getElementById('editId').value = '';
            document.getElementById('editTitle').value = '';
            document.getElementById('editContent').value = '';

        } else {
            alert( `Update failed! Status: ${response.status}`);
        }

    } catch (error) {
        console.error('PUT Error:', error);
        alert('Network error!');
    }
};



document.getElementById('cancelEdit').onclick = function () {
    document.getElementById('editModal').classList.remove('active');
};



document.getElementById('editModal').onclick = function (e) {
    if (e.target.id === 'editModal') {
        document.getElementById('editModal').classList.remove('active');
    }
};