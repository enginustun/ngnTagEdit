ngnTagEdit
======================
ngnTagEdit is simple tag editor for managing tags.

Requirements
======================
  jquery  
  bootstrap
  
Initialize
======================
  ```html
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/tag-edit.css" rel="stylesheet" />
    <script src="js/jquery-1.11.2.js"></script>
    <script src="js/tag-edit.js"></script>
  ```

Usage
======================
  HTML
  ```html
    <div class="input-group wsms-line">
        <span class="input-group-addon">Tags</span>
        <div class="form-control input-container wsi-tags-container">
            <span class="wsi-tags">
            </span>
            <input id="WSITags" type="text" class="" placeholder="enter new tag" />
        </div>
    </div>  
  ```


JS
  ```js
  $('#WSITags').ngnTagEdit(); 
  ```
  Initialize tag editor.
  
  ```js
  $('#WSITags').ngnTagEdit('getTags') 
  ```
  Returns tags as string array.
  
  ```js
  $('#WSITags').ngnTagEdit('setTags', ['this','is','set','example']); 
  ```
  Tags are set as the given array.
  
  ```js
  $('#WSITags').ngnTagEdit('clearTags');
  ```
  Clear all tags.
