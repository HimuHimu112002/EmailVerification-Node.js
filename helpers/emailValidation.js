function emailValidation(email) {
    if(!email){
        return true
        // akhahe true deoyar karon holo jodi email na thake true return korbe then index.js
        // er if er majhe jabe sekhan theke warning dibe
    }   

    if(!email.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
        return true
        // akhahe true deoyar karon holo jodi regex na mile true return korbe then index.js
        // er if er majhe jabe sekhan theke warning dibe
    }
}

module.exports = emailValidation