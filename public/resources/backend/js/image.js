$(document).on('click', '.loadImageModal', function (e) {
    e.preventDefault();
    $('#imageModalBody').addLoader();
    const self = $(this),
        table = self.attr('data-table'),
        table_id = self.attr('data-id');
    ajaxRequest({
        url: '/admin/images/' + table + '/' + table_id,
        method: 'post'
    }, function (response) {
        processForm(response, document);
        if (response.data) {
            setTimeout(() => processImages(response.data, { table, table_id }), 1500);
        }
    });
});

function processImages(data, { table_id, table }) {
    const target = $('#imageModalBody').empty();
    $.each(data, function (i, image) {
        target.append(`<div data-id="${image.id}" ${image.main ? 'class="main-image"' : ''} style="display:inline-block;max-width: 48%;padding-left: 5px;" data-toggle="modal" data-target="#md-footer-primary-preview">
                    <img class="img-responsive" src="${ image.path}" />
                </div>`);
    });
    target.append(`<form id="my-awesome-dropzone" action="/admin/images/upload" class="dropzone xs-p-10" enctype="multipart/form-data">
                <input type="hidden" name="table_name" value="${ table}">
                <input type="hidden" name="table_id" value="${ table_id}">
                <div class="dz-message">
                <div class="icon" style="width: 60px;height:60px;"><span class="mdi mdi-cloud-upload" style="font-size:20px;"></span></div>
                <span class="note" style="font-size: 13px;">(Choose or drag a file here)</span>
                <div class="dropzone-mobile-trigger needsclick"></div>
                </div>
            </form>`);
    $('#my-awesome-dropzone').dropzone();
}

$(document).on('click', '[data-target="#md-footer-primary-preview"]', function (e) {
    const self = $(this),
        image = self.attr('data-id');

    $('#md-footer-primary-preview').find('.removeImage,.makeMainImage').attr('data-id', image);
});

$(document).on('click', '.makeMainImage', function (e) {
    ajaxRequest({
        url: '/admin/image/' + $(this).attr('data-id') + '/makeMainImage',
        method: 'post'
    }, function (response) {
        if(response.data) {
            toastr.success('Image updated as main image.', 'Complete');
        } else {
            toastr.error(response.responseJSON.message, response.responseJSON.title);
        }
    });
});
$(document).on('click', '.removeImage', function (e) {
    ajaxRequest({
        url: '/admin/image/' + $(this).attr('data-id') + '/removeImage',
        method: 'post'
    }, function (response) {
        if(response.data) {
            toastr.success('Image successfully removed.', 'Complete');
        } else {
            toastr.error(response.responseJSON.message, response.responseJSON.title);
        }
    });
});

var toastr = {
    modal: (message, title, className, icon = 'check') => `<div tabindex="-1" role="dialog" style="" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="text-center">
              <div class="text-${ className }"><span class="modal-main-icon mdi mdi-${ icon }"></span></div>
              ${title ? `<h3>${title}</h3>` : ''}
              <p>${message}</p>
            </div>
          </div>
          <div class="modal-footer">
            <div class="text-center"> <button type="button" data-dismiss="modal" class="btn btn-default">Close</button> </div>
          </div>
        </div>
      </div>
    </div>`,
    error(message, title = null) {
        $(this.modal(message, title, 'danger', 'info-outline')).appendTo('body').modal({backdrop:false});
    },
    success(message, title = null) {
        $(this.modal(message, title, 'success', 'check')).appendTo('body').modal({backdrop:false});
    }
}

function showModal({url, method = 'GET'}) {
    ajaxRequest({url, method}, response => {
        if(response.data) {
            $('#md-modal-main').html(response.data).modal('show');
        } else {
            toastr.error(response.responseJSON.message || 'Something went wrong.', 'Error');
        }
    });
}

$(document).on('click', '[data-modal-route]', function(e) {
    showModal({
        url: $(this).attr('data-modal-route')
    });
});

function serialize(form) {
    return $(form).serializeArray();
}

function processModal() {
    $('.modal.show').modal('hide');
}

$(document).on('submit', '#hospitalCreate', function(e) {
    e.preventDefault();
    const form = this;
    ajaxRequest({
        url: form.action,
        method: 'POST',
        data: serialize(form)
    }, response => {
        if(response.data) {
            processModal();
            setTimeout(() => location.reload(), 1000);
        } else {
            processForm(response, form);
        }
    });
});

$(document).on('submit', '#hospitalUpdate', function(e) {
    e.preventDefault();
    const form = this;
    ajaxRequest({
        url: form.action,
        method: 'POST',
        data: serialize(form)
    }, response => {
        if(response.data) {
            processModal();
            setTimeout(() => location.reload(), 1000);
        } else {
            processForm(response, form);
        }
    });
});