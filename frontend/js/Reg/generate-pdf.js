// function generatePDF() {
//     const element = document.getElementsByTagName("html");
//     var opt = {
//       margin: 0,
//       filename: "build-tank-guide.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
//       pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
//     };
//     html2pdf().set(opt).from(element).save();
//   }
  
  
setTimeout(function(){
    window.print();
    window.close();
},1000);

