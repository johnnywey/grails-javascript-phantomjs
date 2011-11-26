### Grails JavaScript Setup Example

This is an empty Grails project with an example of how to hook into Grails events to support JavaScript testing using PhantomJS and Jasmine.

I used Grails version **1.3.7**, PhantomJS version **1.2.0** and Jasmine **1.0.2**.

A few of these are slightly behind the latest versions, so a good starting point would be to update to the latest and greatest and verify the setup still works (I don't believe this would be an issue).

### How it Works
First, try it out: **grails test-app -other**

This command will kick off the _RunJavaScriptTests script in the /scripts directory. This script dispatches to PhantomJS on the command line which not only executes a test wrapped in an HTML document but also exports the result of the test in JUnit XML format in target/test-reports/plain.

There are a few goofy limitations right now, and they are things I'd like to improve soon:

* The test report is only generated in XML which makes it nice for tooling (like Jenkins) but not very useful for nicely viewing in a like the other Grails test reports.
* I'm not currently hooking into the global test status on a failure so the output of a JavaScript failing test will show both a FAILURE (for the Jasmine tests that fail) and a SUCCESS (for the overall Grails testing phase). However, when setup in Jenkins, the build _will_ successfully fail since Jenkins uses the JUnit XML to determine the status of the build rather than relying on Grails console output.

**Enjoy!**