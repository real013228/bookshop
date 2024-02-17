let inputBx = document.querySelector('#inputBx');
        let list = document.querySelector('#list');

        window.addEventListener('load', function() {
            loadItemsFromLocalStorage();
        });

        inputBx.addEventListener("keyup", function(event) {
            if (event.key == "Enter") {
                addItem(this.value);
                this.value = "";
                saveItemsToLocalStorage();
            }
        });

        let addItem = (inputBxValue) => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `${inputBxValue}<i></i>`;

            listItem.addEventListener("click", function() {
                this.classList.toggle('done');
                saveItemsToLocalStorage();
            });

            listItem.querySelector("i").addEventListener("click", function(){
                listItem.remove();
                saveItemsToLocalStorage();
            });

            list.appendChild(listItem);
        };

        let saveItemsToLocalStorage = () => {
            let items = [];
            document.querySelectorAll('#list li').forEach(item => {
                items.push({
                    text: item.textContent,
                    done: item.classList.contains('done')
                });
            });
            localStorage.setItem('items', JSON.stringify(items));
        };

        let loadItemsFromLocalStorage = () => {
            let items = localStorage.getItem('items');
            if (items) {
                items = JSON.parse(items);
                items.forEach(item => {
                    let listItem = document.createElement("li");
                    listItem.innerHTML = `${item.text}<i></i>`;
                    if (item.done) {
                        listItem.classList.add('done');
                    }

                    listItem.addEventListener("click", function() {
                        this.classList.toggle('done');
                        saveItemsToLocalStorage();
                    });

                    listItem.querySelector("i").addEventListener("click", function(){
                        listItem.remove();
                        saveItemsToLocalStorage();
                    });

                    list.appendChild(listItem);
                });
            }
        };