includeTargets << new File("${basedir}/scripts/_RunJavaScriptTests.groovy")

eventTestPhaseEnd = { phase ->
    if (phase == "other") {
        runJsTests()
    }
}