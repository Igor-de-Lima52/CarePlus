function openModal() { document.getElementById('routeModal').classList.add('open'); }
        function closeModal() { document.getElementById('routeModal').classList.remove('open'); }
        document.getElementById('routeModal').addEventListener('click', function (e) {
            if (e.target === this) closeModal();
        });