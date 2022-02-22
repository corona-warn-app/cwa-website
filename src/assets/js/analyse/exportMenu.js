import $ from 'jquery';

const exportMenu = ".analyseBoard-export-layer"
const exportLink = ".analyseBoard-export.btn-link"

$(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
		$(exportMenu).hide();
    }
});

$(document).on('click', exportLink, function(e) {
	$(this).nextAll(exportMenu).first().toggle();
})

$(exportLink).on('mouseenter', function(e) {
	$(this).nextAll(exportMenu).first().show();
});

export default null;