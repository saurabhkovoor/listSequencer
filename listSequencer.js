(function () {
  tinymce.PluginManager.add("listSequencer", function (editor, url) {
    editor.addButton("listSequencer_button", {
      title: "List Sequencer",
      image: url + "/listSequencer.svg",
      tooltip:
        "List Sequencer: Automatically set start values for ordered lists",
      onclick: function () {
        var selectedContent = editor.selection.getContent({ format: "html" });

        var wrapper = document.createElement("div");
        // Add a unique identifier to the selected content
        wrapper.innerHTML =
          '<div id="unique-selected-content">' + selectedContent + "</div>";
        var olElements = wrapper.getElementsByTagName("ol");
        if (olElements.length > 0) {
          setStartAttributes(olElements);
          editor.selection.setContent(wrapper.innerHTML); // Update the content in the editor
          removeEmptyListsNearSelection(); // Remove unwanted empty lists
          unwrapSelectedContent(); // Remove the wrapping div
        } else {
          alert("Your selection does not contain ordered lists or list items.");
        }
      },
    });

    function setStartAttributes(olElements) {
      var startNumber = 1;
      for (var i = 0; i < olElements.length; i++) {
        var olElement = olElements[i];
        var listItem = olElement.querySelector("li");
        if (listItem !== null) {
          olElement.setAttribute("start", startNumber);
          startNumber += olElement.getElementsByTagName("li").length;
        }
      }
    }

    function removeEmptyListsNearSelection() {
      var content = editor.getBody(); // Get the editor's content as a DOM element
      var selectedElement = content.querySelector("#unique-selected-content"); // Use the unique identifier

      if (selectedElement) {
        checkAndRemoveEmptyList(selectedElement.previousElementSibling);
        checkAndRemoveEmptyList(selectedElement.nextElementSibling);
        // selectedElement.removeAttribute("id"); // Remove the identifier after processing
      }
    }

    function unwrapSelectedContent() {
      var content = editor.getBody();
      var selectedElement = content.querySelector("#unique-selected-content");

      if (selectedElement) {
        // Move all children out of the unique div
        while (selectedElement.firstChild) {
          selectedElement.parentNode.insertBefore(
            selectedElement.firstChild,
            selectedElement
          );
        }
        // Remove the now-empty unique div
        selectedElement.parentNode.removeChild(selectedElement);
      }
    }

    function checkAndRemoveEmptyList(element) {
      if (element && element.tagName === "OL" && isListEmpty(element)) {
        element.parentNode.removeChild(element);
      }
    }

    function isListEmpty(olElement) {
      var listItem = olElement.querySelector("li");
      return (
        listItem !== null &&
        listItem.innerHTML.trim() === "" &&
        olElement.children.length === 1
      );
    }
  });
})();
