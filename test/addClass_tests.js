var addClass_Tests = new YAHOO.tool.TestCase({

    name: "addClass",
    
    setUp : function () {
		this.div = document.createElement("div");
		this.divId = 'myDiv';
        this.div.id = this.divId;
		document.body.appendChild(this.div);
    },

    tearDown : function () {
		document.body.removeChild(this.div);
    },

    testAddClassSingle: function () {
		TG('#'+this.divId).addClass('my-div');
        YAHOO.util.Assert.isTrue( TG('#'+this.divId).hasClass('my-div') );

        //try to add some space
		TG('#'+this.divId).addClass(' clsA');
        YAHOO.util.Assert.isTrue( TG('#'+this.divId).hasClass('clsA') );

		TG('#'+this.divId).addClass(' clsA ');
        YAHOO.util.Assert.isTrue( TG('#'+this.divId).hasClass(' clsA') );
    },
    
	testAddClassDouble: function () {
        //add same cls
		TG('#'+this.divId).addClass('my-div');
		TG('#'+this.divId).addClass('my-div');
        YAHOO.util.Assert.areEqual( "my-div", TG('#'+this.divId)[0].className, "One class expected" );
    }
});
