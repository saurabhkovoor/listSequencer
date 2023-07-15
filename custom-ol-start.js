(function() {
    tinymce.PluginManager.add('custom_ol_start', function(editor, url) {
        editor.addButton('custom_ol_start_button', {
            text: 'OL Start',
            icon: false,
            onclick: function() {
                var selectedContent = editor.selection.getContent({ format: 'html' });
                var wrapper = document.createElement('div');
                wrapper.innerHTML = selectedContent;
                var olElements = wrapper.getElementsByTagName('ol');
                if (olElements.length > 0) {
                    setStartAttributes(olElements);
                    editor.selection.setContent(wrapper.innerHTML); // Update editor's content to reflect the changes
                } else {
                    alert('Please select an ordered list or a list item.');
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