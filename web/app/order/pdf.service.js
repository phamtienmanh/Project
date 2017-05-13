'use strict';

angular.module('shopnxApp')

.factory('PdfService', function(){
  return {
    create: function( docDefs ) {
      return pdfMake.createPdf(docDefs);
    },
    dataUrl: function( pdf, callback ) {
      pdf.getDataUrl(function( result ){
        callback( result );
      });
    },
    base64: function( pdf, callback ) {
      pdf.getBase64(function( result ){
        callback( result );
      });
    },
    open: function( url ) {
      var win = window.open( url, '_blank' );
      win.focus();
    }
  };
});
