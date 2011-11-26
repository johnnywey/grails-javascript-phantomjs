phantom.injectJs("core.js");

if (phantom.args.length !== 1) {
    console.log("Usage: phantom_test_runner.js HTML_RUNNER");
    phantom.exit();
} else {
    var htmlrunner = phantom.args[0],
        page = new WebPage();

    page.open(htmlrunner, function(status) {
        if (status === "success") {
            utils.core.waitfor(function() { // wait for this to be true
                return page.evaluate(function() {
                    return typeof(jasmine.testReportResults) !== "undefined";
                });
            }, function() { // once done...
                // Retrieve the result of the tests
                var suitesResults = page.evaluate(function(){
                    return jasmine.testReportResults;
                });

                // Save the result of the tests in files
                for (var i = 0, len = suitesResults.length; i < len; ++i) {
                    try {
                        console.log(suitesResults[i]["xmlbody"]);
                    } catch (e) {
                        console.log(e);
                        console.log("phantomjs> Unable to save result of Suite '"+ suitesResults[i]["xmlfilename"] +"'");
                    }
                }

                // Return the correct exit status. '0' only if all the tests passed
                phantom.exit(page.evaluate(function(){
                    return jasmine.phantomjsXMLReporterPassed ? 0 : 1; //< exit(0) is success, exit(1) is failure
                }));
            }, function() { // or, once it timesout...
                phantom.exit(1);
            });
        } else {
            console.log("phantomjs> Could not load '" + htmlrunner + "'.");
            phantom.exit(1);
        }
    });
}