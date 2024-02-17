(function () {
    function measureLoadTime() {
        const startTime = window.performance.now();
        
        window.addEventListener('load', () => {
            const loadTime = window.performance.now() - startTime;
            displayLoadStatistics(loadTime);
        });
    }

    function formatTime(milliseconds) {
        const seconds = (milliseconds / 1000).toFixed(3);
        return `${seconds} сек`;
    }

    function displayLoadStatistics(loadTime) {
        const formattedLoadTime = formatTime(loadTime);

        const footer = document.createElement('footer');
        footer.innerHTML = `<p>Время загрузки страницы: ${formattedLoadTime}</p>`;
        
        document.body.appendChild(footer);
    }

    measureLoadTime();
})();