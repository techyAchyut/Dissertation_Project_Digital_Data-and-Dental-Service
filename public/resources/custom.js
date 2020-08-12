function ajaxRequest(option, cb) {
    return jQuery.ajax(option).done(function(data) {
        cb({data});
    }).fail(function(error) {
        if(!error.responseJSON) {
            error.responseJSON = {};
        }
        cb(error);
    });
}

function sanitize(form) {
    return Object.fromEntries(jQuery(form).serializeArray().map(x => [x.name, x.value]));
}

jQuery(document).on('submit', '#loginForm', function(e) {
    e.preventDefault();
    const form = this;
    ajaxRequest({
        url: form.action,
        data: jQuery(form).serializeArray(),
        method: 'POST'
    }, function(response) {
        processForm(response, form);
        if(response && response.data) {
            Cookie.set('_token', response.data.token, 86400);
            localStorage.setItem('_token', response.data.token);
            location.assign('/admin');
        }
    });
});

function processForm(response, form) {
    jQuery(form).find('.input-required').removeClass('input-required');
    jQuery(form).find('.error-label').removeClass('d-block');
    if(response.data && response.data.message) {
        return alert(response.data.message);
    }
    
    if(response.responseJSON && response.status == 422) {
        const errors = response.responseJSON;
        for (let name in errors) {
            let input = jQuery(form).find('[name="'+ name +'"]');
            let errorLabel = jQuery(form).find('[error-for="'+ name +'"]');
            input.addClass('input-required');
            errorLabel.addClass('d-block').text(errors[name]);
        }
    }
}