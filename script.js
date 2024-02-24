document.addEventListener('DOMContentLoaded', function() {
    const capsuleForm = document.getElementById('capsule-form');
    const capsuleList = document.getElementById('capsules');

    capsuleForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const message = document.getElementById('message').value;
        const date = document.getElementById('date').value;
        const mediaFile = document.getElementById('media').files[0];

        const newCapsule = { message, date, mediaFileName: mediaFile ? mediaFile.name : null };

        saveCapsule(newCapsule);
        appendCapsule(newCapsule);

        capsuleForm.reset();
    });

    function saveCapsule(capsule) {
        // Simulate saving capsule to JSON data
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                data.capsules.push(capsule);
                return data;
            })
            .then(updatedData => {
                fetch('data.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                });
            });

        if (capsule.mediaFileName) {
            const formData = new FormData();
            formData.append('media', capsule.mediaFile);

            fetch(`upload.php?filename=${capsule.mediaFileName}`, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error uploading file.');
                }
            })
            .catch(error => console.error(error));
        }
    }

    function appendCapsule(capsule) {
        const li = document.createElement('li');
        li.textContent = `Message: ${capsule.message}, Date: ${capsule.date}`;

        if (capsule.mediaFileName) {
            li.textContent += `, ${capsule.mediaFileName} uploaded`;
        }

        capsuleList.appendChild(li);
    }
});
