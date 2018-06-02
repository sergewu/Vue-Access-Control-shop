import { uploadimg } from '../../api/shop';

const images_upload_handler = function (blobInfo, success, failure) {
  var xhr, formData;
  xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('POST', uploadimg);
  xhr.onload = function () {
    var json;

    if (xhr.status != 200) {
      failure('HTTP Error: ' + xhr.status);
      return;
    }
    json = JSON.parse(xhr.responseText);

    if (!json || typeof json.location != 'string') {
      failure('Invalid JSON: ' + xhr.responseText);
      return;
    }
    success(json.location);
  };
  formData = new FormData();
  formData.append('file', blobInfo.blob());
  formData.append('mid', '66');
  xhr.send(formData);
}

export default images_upload_handler