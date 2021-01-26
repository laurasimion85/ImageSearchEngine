
$(function(){
    const apiUrl = 'https://pixabay.com/api/';
    const form = $('.form');
    const input = $('.form-search');
    const gallery = $('.gallery');
    const button = $('.form-search-btn');

    form.on('submit', event => {
        event.preventDefault();
        button.attr('disabled', 'true');
        button.addClass('loading');
        const query = input.val();
        input.val("");
        loadImages(query);
    });
    function loadImages(searchQuery) {
        $.ajax({
            url : apiUrl,
            data : {
                q : searchQuery,
                key : "13801580-b3521fec25a5cb23417804631"
            }
        }).done(function(result) {
            button.removeAttr('disabled');
            button.removeClass('loading');
            insertContent(result.hits);
        }).fail(function(error){
            console.log(error);
        })
    }

    function insertContent(images) {
        gallery.empty();
        images.forEach(image => {
            const {largeImageURL, webformatURL} = image;
            const imageElement = $(`<a data-fancybox="gallery" href="${largeImageURL}" class="gallery-element" >
                                            <img class="gallery-img" src="${webformatURL}" alt="" >
                                        </a>`);
            gallery.append(imageElement);
        });
    }
});