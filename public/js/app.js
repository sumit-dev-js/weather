// handle event on the search button
const weatherForm = document.querySelector('form'); // select the form
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

//adding the event listener
weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    msg1.textContent = 'loading...';
    //fetch api , its a browser based api not a js api also not supported by the  node as its  a client side.
    const address = document.querySelector('input').value;
fetch('/weather?address='+ address).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msg1.textContent = data.error;
        }else{
            msg1.textContent = data.address;
            msg2.textContent = data.forecast;
        }
    });
});
});


