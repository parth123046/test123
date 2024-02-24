document.addEventListener('DOMContentLoaded', function() {
    const capsuleForm = document.getElementById('capsule-form');
    const capsuleList = document.getElementById('capsules');

    // Load capsules from local storage when the page loads
    loadCapsules();

    capsuleForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const message = document.getElementById('message').value;
        const date = document.getElementById('date').value;
        const mediaFile = document.getElementById('media').files[0];

        const newCapsule = { message, date, mediaFileName: mediaFile ? mediaFile.name : null };

        appendCapsule(newCapsule);
        saveCapsule(newCapsule);

        capsuleForm.reset();
    });

    function loadCapsules() {
        const capsules = JSON.parse(localStorage.getItem('timeCapsules')) || [];
        capsules.forEach(capsule => {
            appendCapsule(capsule);
        });
    }

    function saveCapsule(capsule) {
        const capsules = JSON.parse(localStorage.getItem('timeCapsules')) || [];
        capsules.push(capsule);
        localStorage.setItem('timeCapsules', JSON.stringify(capsules));
    }

    function appendCapsule(capsule) {
        const li = document.createElement('li');
        li.innerHTML = `
            <p>Message: ${capsule.message}</p>
            <p>Date: ${capsule.date}</p>
            ${capsule.mediaFileName ? `<p>Media: ${capsule.mediaFileName}</p>` : ''}
        `;
        capsuleList.appendChild(li);
    }
});
