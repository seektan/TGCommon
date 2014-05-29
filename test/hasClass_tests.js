var hasClass_Tests = new YAHOO.tool.TestCase({

    name: "hasClass",
    
    setUp : function () {
		this.div = document.createElement("div");
        this.divId = 'myDiv';
        this.divCls = 'clsB';

        this.div.id = this.divId;
        this.div.className = this.divCls ;
		document.body.appendChild(this.div);
    },

    tearDown : function () {
		document.body.removeChild(this.div);
    },

    testHasClassTrue: function () {
        YAHOO.util.Assert.isTrue( TG('#'+this.divId).hasClass(this.divCls));
    },
    testHasClassMultiTrue: function () {
        this.div.className = ' clsB0 clsB clsB1 ';
        YAHOO.util.Assert.isTrue( TG('#'+this.divId).hasClass('clsB1') );
        YAHOO.util.Assert.isTrue( TG('#'+this.divId).hasClass(' clsB1 ') );
        YAHOO.util.Assert.isTrue( TG('#'+this.divId).hasClass(' clsB0 ') );
    }
});
