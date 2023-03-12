const users = document.querySelector('.user-list');
const userName = document.querySelector('#user');

const userArr = [];
const getUserData = async () => {
    try {

        const res = await fetch('https://api.github.com/users');
        const data = await res.json();
        
        // if we found the data then loading part hid
        if(data) {
            users.innerHTML = ' ';
        }

        data.map( (user) => {
            const li = document.createElement('li');

            userArr.push(li);

            li.insertAdjacentHTML('afterbegin', 
                ` 
                <div class="user-data">
                    <img src="${user.avatar_url}" alt="${user.avatar_url}">
                    <div>
                        <p>${user.login}</p>
                        <a href="${user.html_url}" target="_blank">Visit profile</a>
                    </div>
                </div>
                `
            )
            users.appendChild(li);
        })

    } catch (err) {
        console.log(err);
    }
}

// search functionalities
userName.addEventListener('input', (e) => {
    const val = e.target.value;
    // console.log(val);

    userArr.filter( (currEle) => {
        currEle.innerText.toLowerCase().includes(val.toLowerCase()) ?
        currEle.classList.remove('hide') :
        currEle.classList.add('hide');
    });
});

getUserData();