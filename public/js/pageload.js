(function () {
    function measureLoadTime() {
        const startTime = window.performance.now();
        
        window.addEventListener('load', () => {
            const loadTime = window.performance.now() - startTime;
            displayLoadStatistics(loadTime);
        });
        // window.addEventListener('load', () => {
            
        //     const serverProcessingTime = parseInt(
        //         document.head.querySelector('X-Server-Processing-Time').innerText
        //     );
        //     const domContentLoadedTime = startTime - window.performance.now();
        //     const totalTime = serverProcessingTime + domContentLoadedTime;
        //     displayLoadStatistics(totalTime);
        //     // footerElement.innerText = `Total Processing Time: ${totalTime}ms (Server: ${serverProcessingTime}ms, DOM Generation: ${domContentLoadedTime}ms)`;
        // });
        // window.addEventListener('load', () => {
        //     const serverProcessingTimeElement = document.head.querySelector('meta[name="X-Server-Processing-Time"]');
        //     if (serverProcessingTimeElement) {
        //       const serverProcessingTime = parseInt(serverProcessingTimeElement.content);
        //       const domContentLoadedTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        //       const totalTime = serverProcessingTime + domContentLoadedTime;
        //       displayLoadStatistics(totalTime);
        //     } else {
        //       console.error('Не удалось найти элемент X-Server-Processing-Time');
        //     }
        // });
    }

    function formatTime(milliseconds) {
        const seconds = (milliseconds).toFixed(0);
        return `${seconds} мс`;
    }

    function displayLoadStatistics(loadTime) {
        const formattedLoadTime = formatTime(loadTime);
    
        const footerPageLoadtime = document.querySelector('.footer__page-loadtime');
        footerPageLoadtime.textContent += `на клиенте: ${formattedLoadTime}`;
    }
    

    measureLoadTime();
})();