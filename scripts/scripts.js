$(document).ready(function () {
  document.getElementById("loading").style.display = "none";
});

const load = (style) => {
  let showHide = (document.getElementById(
    "loading"
  ).style.display = `${style}`);
  console.log(showHide);
};

var links = ["black-lab.jpg", "dog-blanket.jpg"];
function generateZIP() {
  //   document.getElementById("loading").style.display = "block";
  load("block");
  var zip = new JSZip();
  var count = 0;
  var zipFilename = `project_images_${Date.now()}.zip`;

  links.forEach(function (url, i) {
    var filename = links[i];
    filename = filename.replace(/[\/\*\|\:\<\>\?\"\\]/gi, "");
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if (err) {
        throw err;
      }
      zip.file(filename, data, { binary: true });
      count++;
      if (count == links.length) {
        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, zipFilename);
        });
        load("none");
        // document.getElementById("loading").style.display = "none";
      }
    });
  });
}
