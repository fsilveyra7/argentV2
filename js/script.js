
// --START-- GENERATE PDF FROM FROM

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
window.generate = function generate() {
  // Retrieve the values of the input fields
  var nameValue = document.getElementById('name').value;
  var emailValue = document.getElementById('email').value;
  var phoneValue = document.getElementById('phone').value;
  var info1Value = document.getElementById('info1').value;
  var cableSizeValue = document.getElementById('cableSize').value;
  var cableLengthValue = document.getElementById('cableLength').value;
  
  let totalPriceValue;
  console.log(cableSizeValue);
  switch (cableSizeValue) {
    case "1/4":
      totalPriceValue = cableLengthValue * 25;
      break;
    case "3/8":
      totalPriceValue = cableLengthValue * 37.5;
      break;
    case "1/2":
      totalPriceValue = cableLengthValue * 50;
      break;
    case "3/4":
      totalPriceValue = cableLengthValue * 75;
      break;
    case "1":
      totalPriceValue = cableLengthValue * 100;
      break;
    default:
      console.error("Invalid option selected lol");
      return;
  }

  loadFile(
      "files/quote-template.docx",
      function (error, content) {
          if (error) {
              throw error;
          }
          var zip = new PizZip(content);
          var doc = new window.docxtemplater(zip, {
              paragraphLoop: true,
              linebreaks: true,
          });

          // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
          doc.render({
              name: nameValue,
              email: emailValue,
              phone: phoneValue,
              info1: info1Value,
              cableSize: cableSizeValue,
              cableLength: cableLengthValue,
              totalPrice: totalPriceValue,
          });

          var blob = doc.getZip().generate({
              type: "blob",
              mimeType:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              // compression: DEFLATE adds a compression step.
              // For a 50MB output document, expect 500ms additional CPU time
              compression: "DEFLATE",
          });
          // Output the document using Data-URI
          saveAs(blob, "quote-filled.docx");
      }
  );
};

// --END-- GENERATE PDF FROM FROM