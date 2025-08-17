// Get current path and redirect to pages folder
        const currentPath = window.location.pathname;
        const fileName = currentPath.split('/').pop();
        
        if (fileName && fileName !== 'index.html') {
            window.location.href = './pages/' + fileName;
        } else {
            window.location.href = './index.html';
        }