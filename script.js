document.addEventListener('DOMContentLoaded', function() {
    const capsuleForm = document.getElementById('capsule-form');
    const capsuleList = document.getElementById('capsules');

    capsuleForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const message = document.getElementById('message').value;
        const date = document.getElementById('date').value;
        const mediaFile = document.getElementById('media').files[0];

        const newCapsule = { message, date, mediaFileName: mediaFile ? mediaFile.name : null };

        appendCapsule(newCapsule);

        capsuleForm.reset();
    });

    function appendCapsule(capsule) {
        const li = document.createElement('li');
        li.textContent = `Message: ${capsule.message}, Date: ${capsule.date}`;

        if (capsule.mediaFileName) {
            li.textContent += `, ${capsule.mediaFileName} uploaded`;
        }

        capsuleList.appendChild(li);
    }
});
