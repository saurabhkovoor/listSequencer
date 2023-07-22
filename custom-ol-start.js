(function() {
    tinymce.PluginManager.add('custom_ol_start', function(editor, url) {
        editor.addButton('custom_ol_start_button', {
            title: 'Set start number for ordered list',
            icon: 'sharpen',
            tooltip: 'Automatically set start values for ordered lists',
            onclick: function() {
                var selectedContent = editor.selection.getContent({ format: 'html' });
                var wrapper = document.createElement('div');
                wrapper.innerHTML = selectedContent;
                var olElements = wrapper.getElementsByTagName('ol');
                if (olElements.length > 0) {
                    setStartAttributes(olElements);
                    editor.selection.setContent(wrapper.innerHTML);
                } else {
                    alert('Your selection does not contain ordered lists or list items.');
                }
            }
        });

        function setStartAttributes(olElements) {
            var startNumber = 1;
            for (var i = 0; i < olElements.length; i++) {
                var olElement = olElements[i];
                var listItem = olElement.querySelector('li');
                if (listItem !== null) {
                    olElement.setAttribute('start', startNumber);
                    startNumber += olElement.getElementsByTagName('li').length;
                }
            }
        }
    });
})();;