var TestRunner = YAHOO.tool.TestRunner; 


TestRunner.add(hasClass_Tests);
TestRunner.add(addClass_Tests);
TestRunner.add(removeClass_Tests);


function handleTestFail(data){
    YAHOO.log(data.error.message, "error", data.testCase.name +'.'+ data.testName);
}

TestRunner.subscribe(TestRunner.TEST_FAIL_EVENT, handleTestFail);

var myContainer = document.body.appendChild(document.createElement("div"));
var myLogReader = new YAHOO.widget.LogReader(myContainer); // Logger View


TestRunner.run(); // run
