'use strict';

var app = angular.module('exampleApp', ['JSONedit']);

function MainViewCtrl($scope, $filter) {

    // example JSON
    
    
    

 /*   $scope.jsonData = {
        Name: "Joe", "Last Name": "Miller", Address: {Street: "Neverland 42"}, Hobbies: ["doing stuff", "dreaming"]
    };
*/
    $scope.$watch('jsonData', function(json) {
        $scope.jsonString = $filter('json')(json);
    }, true);
    $scope.$watch('jsonString', function(json) {
        try {
            $scope.jsonData = JSON.parse(json);
            $scope.wellFormed = true;
        } catch(e) {
            $scope.wellFormed = false;
        }
    }, true);
    $scope.$watch('inputString', function(json) {
        try {
            var aggobj = {
        all : {
            analyzer: "syn_standard_analyzer",
            search_analyzer: "syn_whitespace_analyzer"},
  properties: {

  }
};
              //  $scope.flist = ["accountingdate","division","ponumber","invoicedate","invoiceid","polinenumber","paymentdate","checknbr","voucherlineamt","invoicelinenum","voucherprice","contractnbr","productcode","productdescription","vendornumber","vendorname","vendortype","vendorclass","masterformatcode","masterformatdescr"];
                var fsettings = {
                    string: {
                    type: "string",
                        null_value: "null",
                        analyzer: "syn_keyword_analyzer",
                    index: "not_analyzed",
                    include_in_all: true,
                },
                    date : {
                    type: "date",
                        null_value: "null",
                    index: "not_analyzed",
                    include_in_all: false,
                    format: "MM/dd/yy",
                    ignore_malformed: true
                },
                    float: {
                    type: "float",
                    index: "no",
                    include_in_all: false,
                }
                };
                var fname = "";
                        var item = [];
                        var flist = [];
                    var reg = new RegExp('[ \t]{1,}','g');
                        flist= json.split("\n");
                            for (var i = 0; i < flist.length; i++) {

                    item = flist[i].replace(reg,',').split(',');
                        aggobj.properties[item[0]] = fsettings[item[1]];
                                
                };


                $scope.jsonData = aggobj;
            $scope.readSuccess = true;
        } catch(e) {
            $scope.readSuccess = false;
        }
    }, true);
}
