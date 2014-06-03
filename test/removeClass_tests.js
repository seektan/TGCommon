var removeClass_Tests = new YAHOO.tool.TestCase({

    name: "removeClass",
    
    setUp : function () {
		this.div = document.createElement("div");
		this.divId = 'myDiv';
		this.divCls = 'clsForRemove';
        this.div.id = this.divId;
        this.div.className = this.divCls;

		document.body.appendChild(this.div);
    },

    tearDown : function () {
		document.body.removeChild(this.div);
    },

    testRemoveClassSingle: function () {
        var el = TG('#' + this.divId);

        el.removeClass(this.divCls);
        YAHOO.util.Assert.areEqual( "", el[0].className, "class shoule be cleared" );

        el[0].className = 'clsR1 clsR2 clsR3';
        el.removeClass('clsR2');
        YAHOO.util.Assert.areEqual( "clsR1 clsR3", el[0].className);
    }
    
});
