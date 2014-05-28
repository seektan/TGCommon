var addClass_Tests = new YAHOO.tool.TestCase({

    name: "addClass",
    
    setUp : function () {
		this.div = document.createElement("div");
		this.divId = 'myDiv';
		this.div.setAttribute('id', this.divId);
		document.body.appendChild(this.div);
    },

    tearDown : function () {
		document.body.removeChild(this.div);
    },

    testAddClassSingle: function () {
		TG('#'+this.divId).addClass('my-div');
        YAHOO.util.Assert.isTrue( TG('#'+this.divId).hasClass('my-div') );
    },
    
	testAddClassDouble: function () {
		TG('#'+this.divId).addClass('my-div');
		TG('#'+this.divId).addClass('my-div');
        YAHOO.util.Assert.areEqual( "my-div", TG('#'+this.divId)[0].getAttribute('class'), "One class expected" );
    }
});
